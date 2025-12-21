import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    value: "+49 156 78123456",
    href: "tel:+4915678123456",
    description: "Mo-Fr: 8:00 - 18:00 Uhr"
  },
  {
    icon: Mail,
    title: "E-Mail",
    value: "info@petasync.de",
    href: "mailto:info@petasync.de",
    description: "Antwort innerhalb von 24h"
  },
  {
    icon: MapPin,
    title: "Standort",
    value: "Dietenhofen & Umgebung",
    href: null,
    description: "Ansbach, Nürnberg, Neustadt, Oberasbach"
  },
  {
    icon: Clock,
    title: "Öffnungszeiten",
    value: "Mo-Fr: 8:00 - 18:00",
    href: null,
    description: "Termine nach Vereinbarung auch Sa"
  }
];

export default function Kontakt() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    customerType: "privat"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Nachricht gesendet!",
      description: "Wir melden uns schnellstmöglich bei Ihnen.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      customerType: "privat"
    });
    setIsSubmitting(false);
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
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-900 via-tech-800 to-primary/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Kontaktieren Sie{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tech-400">
                uns
              </span>
            </h1>
            <p className="text-xl text-white/70">
              Wir freuen uns auf Ihre Anfrage. Rufen Sie an, schreiben Sie uns oder nutzen Sie das Kontaktformular.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-20 relative z-20">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl border border-border p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <info.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                {info.href ? (
                  <a 
                    href={info.href}
                    className="text-primary hover:underline font-medium block mb-1"
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

      {/* Contact Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Schreiben Sie uns</h2>
              <p className="text-muted-foreground mb-6">
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerType">Kundentyp</Label>
                    <select
                      id="customerType"
                      name="customerType"
                      value={formData.customerType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="privat">Privatkunde</option>
                      <option value="geschaeft">Geschäftskunde</option>
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
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Wird gesendet..."
                  ) : (
                    <>
                      Nachricht senden
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Quick Contact Options */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Schneller Kontakt</h2>
                <p className="text-muted-foreground">
                  Für dringende Anliegen erreichen Sie uns auch direkt per Telefon oder WhatsApp.
                </p>
              </div>

              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/4915678123456"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 hover:border-green-500/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">WhatsApp</h3>
                    <p className="text-muted-foreground">Schnelle Antwort – meist innerhalb von Minuten</p>
                  </div>
                </div>
              </a>

              {/* Phone Card */}
              <a 
                href="tel:+4915678123456"
                className="block p-6 rounded-xl bg-gradient-to-br from-primary/10 to-tech-500/10 border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Telefon</h3>
                    <p className="text-muted-foreground">+49 156 78123456 (Mo-Fr: 8-18 Uhr)</p>
                  </div>
                </div>
              </a>

              {/* Service Area Info */}
              <div className="p-6 rounded-xl bg-muted/50 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Unser Einsatzgebiet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Wir sind in der gesamten Region für Sie da – vor Ort oder per Remote-Support.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Dietenhofen", "Ansbach", "Nürnberg", "Neustadt a.d. Aisch", "Oberasbach"].map((city) => (
                    <span 
                      key={city}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
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
