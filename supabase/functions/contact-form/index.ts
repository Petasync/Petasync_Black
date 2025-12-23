import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

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

// Generate HTML email for customer confirmation
function generateCustomerEmail(data: ContactFormData): string {
  const customerTypeName = data.customerType === "privat" ? "Privatkunde" : "Geschäftskunde";

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vielen Dank für Ihre Anfrage - Petasync</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a; color: #ffffff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%); border-radius: 16px; overflow: hidden; border: 1px solid #2a2a2a;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #2a2a2a;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">
                PETASYNC
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #888888; letter-spacing: 2px;">
                IT-SERVICE & SUPPORT
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; color: #ffffff;">
                Vielen Dank für Ihre Anfrage!
              </h2>

              <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                Hallo ${data.name},
              </p>

              <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden –
                <strong style="color: #ffffff;">in der Regel innerhalb von 24 Stunden</strong>.
              </p>

              <!-- Summary Box -->
              <table role="presentation" style="width: 100%; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #333333; margin: 30px 0;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="margin: 0 0 20px; font-size: 16px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                      Ihre Anfrage im Überblick
                    </h3>

                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px; width: 120px;">Kundentyp:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${customerTypeName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px;">Betreff:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${data.subject}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px; vertical-align: top;">Nachricht:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; line-height: 1.5;">${data.message.replace(/\n/g, "<br>")}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <h3 style="margin: 30px 0 20px; font-size: 18px; color: #ffffff;">
                So geht es weiter:
              </h3>

              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation">
                      <tr>
                        <td style="width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: bold; font-size: 14px;">1</span>
                        </td>
                        <td style="padding-left: 16px; color: #cccccc; font-size: 15px;">
                          Wir prüfen Ihre Anfrage und analysieren Ihr Anliegen
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation">
                      <tr>
                        <td style="width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: bold; font-size: 14px;">2</span>
                        </td>
                        <td style="padding-left: 16px; color: #cccccc; font-size: 15px;">
                          Wir melden uns per E-Mail oder Telefon bei Ihnen
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation">
                      <tr>
                        <td style="width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: bold; font-size: 14px;">3</span>
                        </td>
                        <td style="padding-left: 16px; color: #cccccc; font-size: 15px;">
                          Gemeinsam finden wir die beste Lösung für Sie
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Urgent Contact -->
              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%); border-radius: 12px; margin: 30px 0;">
                <tr>
                  <td style="padding: 25px; text-align: center;">
                    <p style="margin: 0 0 15px; font-size: 15px; color: #93c5fd;">
                      <strong>Dringend?</strong> Rufen Sie uns direkt an:
                    </p>
                    <a href="tel:+491637117198" style="display: inline-block; font-size: 22px; font-weight: 700; color: #ffffff; text-decoration: none;">
                      +49 163 711 7198
                    </a>
                    <p style="margin: 10px 0 0; font-size: 13px; color: #64748b;">
                      Mo-Fr: 09:00 - 19:00 Uhr
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #0a0a0a; border-top: 1px solid #2a2a2a;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 10px; font-size: 14px; color: #ffffff; font-weight: 600;">
                      Petasync
                    </p>
                    <p style="margin: 0 0 5px; font-size: 13px; color: #888888;">
                      IT-Service & PC-Reparatur
                    </p>
                    <p style="margin: 0 0 15px; font-size: 13px; color: #888888;">
                      Ansbach • Nürnberg • Fürth • Erlangen
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #666666;">
                      <a href="mailto:service@petasync.de" style="color: #3b82f6; text-decoration: none;">service@petasync.de</a>
                      &nbsp;•&nbsp;
                      <a href="https://petasync.de" style="color: #3b82f6; text-decoration: none;">petasync.de</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Generate notification email for Petasync admin
function generateAdminNotificationEmail(data: ContactFormData): string {
  const customerTypeName = data.customerType === "privat" ? "Privatkunde" : "Geschäftskunde";

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Neue Kontaktanfrage</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="padding: 30px; background: #1a1a1a; color: #ffffff;">
        <h1 style="margin: 0; font-size: 20px;">Neue Kontaktanfrage</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <table style="width: 100%;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>E-Mail:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Telefon:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.phone || "Nicht angegeben"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Kundentyp:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${customerTypeName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Betreff:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.subject}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; vertical-align: top;"><strong>Nachricht:</strong></td>
            <td style="padding: 10px 0; white-space: pre-wrap;">${data.message}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Send email via Hetzner SMTP
async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const smtpHost = Deno.env.get("SMTP_HOST");
  const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "587");
  const smtpUser = Deno.env.get("SMTP_USER");
  const smtpPass = Deno.env.get("SMTP_PASS");
  const smtpFrom = Deno.env.get("SMTP_FROM") || "noreply@petasync.de";

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("SMTP configuration incomplete");
    return false;
  }

  try {
    const client = new SMTPClient({
      connection: {
        hostname: smtpHost,
        port: smtpPort,
        tls: true,
        auth: {
          username: smtpUser,
          password: smtpPass,
        },
      },
    });

    await client.send({
      from: `Petasync <${smtpFrom}>`,
      to: to,
      subject: subject,
      html: html,
    });

    await client.close();
    return true;
  } catch (error) {
    console.error("SMTP error:", error);
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

    // Send confirmation email to customer
    const customerEmailSent = await sendEmail(
      data.email,
      `Ihre Anfrage bei Petasync: ${data.subject}`,
      generateCustomerEmail(data)
    );

    // Send notification email to admin
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "service@petasync.de";
    await sendEmail(
      adminEmail,
      `Neue Kontaktanfrage: ${data.subject}`,
      generateAdminNotificationEmail(data)
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Anfrage erfolgreich gesendet.",
        emailSent: customerEmailSent
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
