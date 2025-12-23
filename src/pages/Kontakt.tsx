import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, Suspense, useCallback } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { Turnstile } from "@/components/Turnstile";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import kontaktHero from "@/assets/kontakt-hero.png";

// API URL for contact form - uses relative path for same-domain or full URL for production
const CONTACT_API_URL = import.meta.env.PROD
  ? "https://petasync.de/api/contact-email.php"
  : "/api/contact-email.php";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    value: "+49 163 711 7198",
    href: "tel:+491637117198",
    description: "Mo-Fr: 09:00 - 19:00 Uhr"
  },
  {
    icon: Mail,
    title: "E-Mail",
    value: "service@petasync.de",
    href: "mailto:service@petasync.de",
    description: "Antwort innerhalb von 24h"
  },
  {
    icon: MapPin,
    title: "Standort",
    value: "Mobil vor Ort",
    href: null,
    description: "Ansbach, Oberasbach, Nürnberg, Fürth, Erlangen"
  },
  {
    icon: Clock,
    title: "Öffnungszeiten",
    value: "Mo-Fr: 09:00 - 19:00",
    href: null,
    description: "Sa & So: Geschlossen"
  }
];

export default function Kontakt() {
  const { toast } = useToast();
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: formRef, isRevealed: formRevealed } = useScrollReveal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    customerType: "privat"
  });

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      toast({
        title: "Bot-Schutz erforderlich",
        description: "Bitte bestätigen Sie, dass Sie kein Roboter sind.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          subject: formData.subject,
          message: formData.message,
          customerType: formData.customerType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fehler beim Senden der Nachricht");
      }

      toast({
        title: "Nachricht gesendet!",
        description: "Wir haben Ihnen eine Bestätigungs-E-Mail geschickt und melden uns schnellstmöglich bei Ihnen.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        customerType: "privat"
      });
      setTurnstileToken(null);
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={kontaktHero} 
            alt="" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        
        {/* 3D Scene */}
        <Suspense fallback={null}>
          <Floating3DScene variant="minimal" className="opacity-40" />
        </Suspense>
        
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-24 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-6 block">
              Kontakt
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Kontaktieren Sie{" "}
              <span className="gradient-text">uns</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Wir freuen uns auf Ihre Anfrage. Rufen Sie an, schreiben Sie uns oder nutzen Sie das Kontaktformular.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="group py-6"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
                  <info.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                {info.href ? (
                  <a 
                    href={info.href}
                    className="text-primary hover:text-primary/80 font-medium block mb-1 transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-foreground font-medium mb-1">{info.value}</p>
                )}
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding relative">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        
        <div className="container-tight relative">
          <div className="divider-glow mb-20" />
          
          <div 
            ref={formRef}
            className={cn(
              "grid lg:grid-cols-2 gap-16 lg:gap-24 transition-all duration-1000",
              formRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Schreiben Sie uns</h2>
              <p className="text-muted-foreground mb-8">
                Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ihr Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 focus:border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ihre@email.de"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 focus:border-white/20"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Ihre Telefonnummer"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 focus:border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerType">Kundentyp</Label>
                    <select
                      id="customerType"
                      name="customerType"
                      value={formData.customerType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="privat" className="bg-background">Privatkunde</option>
                      <option value="geschaeft" className="bg-background">Geschäftskunde</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Betreff *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Worum geht es?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 focus:border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Nachricht *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 focus:border-white/20"
                  />
                </div>

                {/* Cloudflare Turnstile Bot Protection */}
                <div className="flex justify-center">
                  <Turnstile
                    onVerify={handleTurnstileVerify}
                    onExpire={handleTurnstileExpire}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full"
                  disabled={isSubmitting || !turnstileToken}
                >
                  {isSubmitting ? (
                    "Wird gesendet..."
                  ) : (
                    <>
                      Nachricht senden
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Quick Contact Options */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Schneller Kontakt</h2>
                <p className="text-muted-foreground">
                  Für dringende Anliegen erreichen Sie uns auch direkt per Telefon oder WhatsApp.
                </p>
              </div>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/491637117198"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 py-6 border-b border-white/5 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <MessageCircle className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">WhatsApp</h3>
                  <p className="text-muted-foreground">Schnelle Antwort – meist innerhalb von Minuten</p>
                </div>
              </a>

              {/* Phone */}
              <a 
                href="tel:+491637117198"
                className="group flex items-center gap-5 py-6 border-b border-white/5 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Telefon</h3>
                  <p className="text-muted-foreground">+49 163 711 7198 (Mo-Fr: 09-19 Uhr)</p>
                </div>
              </a>

              {/* Service Area */}
              <div className="py-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Unser Einsatzgebiet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Wir sind in der gesamten Region für Sie da – vor Ort oder per Remote-Support.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Ansbach", "Oberasbach", "Nürnberg", "Fürth", "Erlangen"].map((city) => (
                    <span 
                      key={city}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <MapPin className="w-3 h-3" />
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-4 py-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Schnelle Reaktionszeit</p>
                  <p className="text-sm text-muted-foreground">Wir antworten in der Regel innerhalb von 24 Stunden</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
