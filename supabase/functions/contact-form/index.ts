import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  customerType: "privat" | "geschaeft";
  turnstileToken: string;
}

// Verify Cloudflare Turnstile token
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY not configured");
    return false;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
      remoteip: ip,
    }),
  });

  const result = await response.json();
  return result.success === true;
}

// Send emails via PHP script on Hetzner
async function sendEmails(data: ContactFormData): Promise<boolean> {
  const apiEmailUrl = Deno.env.get("API_EMAIL_URL");
  const apiEmailSecret = Deno.env.get("API_EMAIL_SECRET");

  if (!apiEmailUrl || !apiEmailSecret) {
    console.error("API_EMAIL_URL or API_EMAIL_SECRET not configured");
    return false;
  }

  try {
    const response = await fetch(apiEmailUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Secret": apiEmailSecret,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        subject: data.subject,
        message: data.message,
        customerType: data.customerType,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Email API error:", error);
      return false;
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("Email API error:", error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactFormData = await req.json();
    const clientIp = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "";

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message || !data.turnstileToken) {
      return new Response(
        JSON.stringify({ error: "Alle Pflichtfelder müssen ausgefüllt werden." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify Turnstile token
    const isValidToken = await verifyTurnstile(data.turnstileToken, clientIp);
    if (!isValidToken) {
      return new Response(
        JSON.stringify({ error: "Bot-Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Map customerType to inquiry_type enum
    const inquiryType = data.customerType === "geschaeft" ? "business" : "privat";

    // Save inquiry to database
    const { error: dbError } = await supabase.from("inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      inquiry_type: inquiryType,
      source: "website",
      status: "neu",
      priority: "normal",
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Fehler beim Speichern der Anfrage." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send emails via PHP script on Hetzner
    const emailsSent = await sendEmails(data);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Anfrage erfolgreich gesendet.",
        emailsSent: emailsSent
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Ein unerwarteter Fehler ist aufgetreten." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
