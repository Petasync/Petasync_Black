import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Headphones, ArrowRight, CheckCircle2, Phone, Clock, Zap, MapPin, Users, Monitor, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense, useEffect } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const supportTypes = [
  {
    icon: Monitor,
    title: "Remote-Support",
    description: "Schnelle Hilfe per Fernzugriff. In wenigen Minuten sind wir auf Ihrem System.",
    price: "ab 79€/Std",
  },
  {
    icon: MapPin,
    title: "Vor-Ort-Support",
    description: "Persönlicher Service direkt in Ihrem Unternehmen. Für komplexe Probleme.",
    price: "ab 99€/Std",
  },
  {
    icon: Clock,
    title: "Express-Support",
    description: "Garantierte Reaktionszeit unter 2 Stunden für kritische Systeme.",
    price: "Auf Anfrage",
  },
];

const services = [
  "Workstation- und Server-Support",
  "Netzwerk-Fehlerbehebung",
  "Software-Installation und Updates",
  "Drucker- und Peripherie-Support",
  "E-Mail und Microsoft 365 Hilfe",
  "Backup-Wiederherstellung",
  "Virenentfernung und Sicherheit",
  "Benutzer-Schulungen",
];

const process = [
  { step: "1", title: "Kontakt", description: "Rufen Sie an oder senden Sie ein Ticket" },
  { step: "2", title: "Analyse", description: "Wir erfassen das Problem und priorisieren" },
  { step: "3", title: "Lösung", description: "Remote oder vor Ort – wir beheben das Problem" },
  { step: "4", title: "Dokumentation", description: "Alles wird für Sie dokumentiert" },
];

const advantages = [
  {
    icon: Zap,
    title: "Schnelle Reaktion",
    description: "Durchschnittliche Reaktionszeit unter 30 Minuten bei Remote-Support."
  },
  {
    icon: Users,
    title: "Erfahrenes Team",
    description: "Zertifizierte Techniker mit jahrelanger Erfahrung in Unternehmens-IT."
  },
  {
    icon: Shield,
    title: "Sichere Verbindung",
    description: "Verschlüsselte Remote-Verbindungen nach höchsten Sicherheitsstandards."
  },
  {
    icon: Clock,
    title: "Flexible Zeiten",
    description: "Support auch außerhalb der Geschäftszeiten nach Vereinbarung."
  },
];

export default function BusinessSupport() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: typesRef, isRevealed: typesRevealed } = useScrollReveal();
  const { ref: processRef, isRevealed: processRevealed } = useScrollReveal();

  useEffect(() => {
    document.title = "IT-Support für Unternehmen | Remote & Vor-Ort | PetaSync";
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />

        <Suspense fallback={null}>
          <Floating3DScene variant="default" className="opacity-30" />
        </Suspense>

        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-32 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <Link to="/geschaeftskunden" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Geschäftskunden
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">IT-Support</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-Support für{" "}
              <span className="gradient-text">Ihr Unternehmen</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Schnelle Hilfe, wenn Sie sie brauchen. Remote oder vor Ort –
              wir lösen Ihre IT-Probleme professionell und zuverlässig.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <a href="tel:+491637117198">
                  <Phone className="mr-2 h-4 w-4" />
                  Support anrufen
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <Link to="/kontakt">
                  Ticket erstellen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Types */}
      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />

        <div
          ref={typesRef}
          className={cn(
            "container-tight relative transition-all duration-1000",
            typesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Support-Optionen</h2>
            <p className="text-muted-foreground">Flexibel nach Ihrem Bedarf</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportTypes.map((type, index) => (
              <div
                key={type.title}
                className="group p-8 rounded-2xl border border-white/5 hover:border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent transition-all"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  <type.icon className="w-6 h-6 text-foreground" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">{type.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{type.description}</p>

                <div className="text-lg font-bold text-primary">{type.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Unser Support
              </span>
              <h2 className="text-4xl font-bold mb-6">
                Wobei wir{" "}
                <span className="gradient-text">helfen</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Von einfachen Software-Fragen bis zu komplexen Server-Problemen –
                unser erfahrenes Team unterstützt Sie bei allen IT-Herausforderungen.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 py-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={advantage.title}
                className="text-center group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4 mx-auto group-hover:bg-white/10 transition-colors">
                  <advantage.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{advantage.title}</h3>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />

          <div
            ref={processRef}
            className={cn(
              "transition-all duration-1000",
              processRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">So läuft's ab</h2>
              <p className="text-muted-foreground">Von der Anfrage zur Lösung</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <div key={item.step} className="text-center" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="text-4xl font-bold text-primary/30 mb-4">{item.step}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative text-center">
              <Headphones className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                IT-Problem? Wir helfen!
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Rufen Sie jetzt an oder erstellen Sie ein Support-Ticket.
                Wir melden uns schnellstmöglich bei Ihnen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <a href="tel:+491637117198">
                    <Phone className="mr-2 h-4 w-4" />
                    +49 163 711 7198
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                  <a href="mailto:support@petasync.de">
                    support@petasync.de
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
