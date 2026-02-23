import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Shield, Clock, Laptop, ArrowRight, CheckCircle2, Phone, Server, Globe, FileSearch } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import geschaeftskundenHero from "@/assets/geschaeftskunden-hero.png";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";

interface Feature {
  label: string;
  starter: string;
  business: string;
  enterprise: string;
}

const features: Feature[] = [
  { label: "Mitarbeiter", starter: "1–5", business: "5–15", enterprise: "15+" },
  { label: "Support-Stunden", starter: "3h/Monat", business: "8h/Monat", enterprise: "Unlimitiert" },
  { label: "Reaktionszeit", starter: "24h", business: "4h", enterprise: "2h (SLA)" },
  { label: "Remote-Support", starter: "check", business: "check", enterprise: "check" },
  { label: "Vor-Ort-Support", starter: "Nach Bedarf", business: "2x/Monat inkl.", enterprise: "Unlimitiert" },
  { label: "Monitoring", starter: "Basis", business: "Erweitert", enterprise: "24/7" },
  { label: "Backup-Management", starter: "dash", business: "check", enterprise: "check" },
  { label: "Leih-PC", starter: "check", business: "check", enterprise: "check" },
  { label: "Managed Workplace", starter: "dash", business: "+35€/User", enterprise: "Inklusive" },
  { label: "Dedizierter Kontakt", starter: "dash", business: "dash", enterprise: "check" },
];

const packages = [
  {
    name: "Starter",
    price: "149",
    priceNote: "/Monat",
    target: "1–5 Mitarbeiter",
    description: "Grundlegende IT-Betreuung für kleine Teams",
    highlights: [
      "3h Support pro Monat",
      "Remote & Vor-Ort nach Bedarf",
      "Basis-Monitoring",
      "Kostenloser Leih-PC",
      "Ticket-System",
    ],
  },
  {
    name: "Business",
    price: "349",
    priceNote: "/Monat",
    target: "5–15 Mitarbeiter",
    description: "Vollständige IT-Betreuung für wachsende Unternehmen",
    highlight: true,
    highlights: [
      "8h Support pro Monat",
      "Vor-Ort-Support 2x/Monat inkl.",
      "Server & Netzwerk-Monitoring",
      "Backup-Management",
      "4h Reaktionszeit",
      "Cloud-Dienste Setup",
    ],
  },
  {
    name: "Enterprise",
    price: "699",
    priceNote: "/Monat",
    target: "15+ Mitarbeiter",
    description: "Premium-IT mit dediziertem Ansprechpartner",
    highlights: [
      "Unlimitierter Support",
      "Unlimitiert Vor-Ort-Besuche",
      "24/7 Monitoring",
      "Dedizierter Ansprechpartner",
      "SLA mit 2h Reaktionszeit",
      "Security-Audits & Quartals-Checks",
    ],
  },
];

const addOns = [
  {
    icon: Server,
    title: "Netzwerk-Setup",
    price: "599€",
    description: "Bis 10 Arbeitsplätze, inkl. WLAN",
  },
  {
    icon: Globe,
    title: "Cloud-Migration",
    price: "490€",
    description: "Office 365, bis 10 User",
  },
  {
    icon: Shield,
    title: "Security-Audit",
    price: "899€",
    description: "Vollständige Sicherheitsanalyse",
  },
  {
    icon: FileSearch,
    title: "DSGVO-Beratung",
    price: "599€",
    description: "Beratung & Dokumentation",
  },
];

const advantages = [
  {
    icon: Clock,
    title: "Schnelle Reaktionszeit",
    description: "Bei Störungen sind wir schnell vor Ort oder remote erreichbar."
  },
  {
    icon: Shield,
    title: "Proaktive Wartung",
    description: "Wir erkennen Probleme, bevor sie zu Ausfällen führen."
  },
  {
    icon: Laptop,
    title: "Leih-PC Service",
    description: "Ihre Mitarbeiter arbeiten weiter, während wir Geräte reparieren."
  },
  {
    icon: Building2,
    title: "Lokaler Partner",
    description: "Wir sind in der Region und kennen die Bedürfnisse lokaler Unternehmen."
  }
];

export default function Geschaeftskunden() {
  useSEO(SEO_PAGES.geschaeftskunden);
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: packagesRef, isRevealed: packagesRevealed } = useScrollReveal();
  const { ref: addOnsRef, isRevealed: addOnsRevealed } = useScrollReveal();
  const { ref: advantagesRef, isRevealed: advantagesRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={geschaeftskundenHero}
            alt="IT-Service für Geschäftskunden"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>

        <Suspense fallback={null}>
          <Floating3DScene variant="dense" className="opacity-40" />
        </Suspense>

        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

        <div
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-32 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-6 block">
              Für Unternehmen
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-Betreuung für{" "}
              <span className="gradient-text">Ihr Unternehmen</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Drei klare Pakete statt komplizierter Einzelleistungen.
              Monatliche Flatrate, persönlicher Ansprechpartner, keine versteckten Kosten.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  IT-Check anfragen (kostenlos)
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="tel:+491637117198">
                  <Phone className="mr-2 h-4 w-4" />
                  Jetzt anrufen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section - 3 Tier Cards */}
      <section className="section-padding relative">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />

        <div className="container-tight relative">
          <div className="mb-16 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Monatliche Pakete
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              Wählen Sie Ihr IT-Paket
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Alle Pakete beinhalten Leih-PC-Service, Ticket-System und persönlichen Support. Monatlich kündbar.
            </p>
          </div>

          <div
            ref={packagesRef}
            className={cn(
              "grid md:grid-cols-3 gap-6 mb-16 transition-all duration-1000",
              packagesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={cn(
                  "relative rounded-2xl p-8 transition-all hover:scale-[1.02]",
                  pkg.highlight
                    ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30"
                    : "bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10"
                )}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1 rounded-full bg-primary text-primary-foreground">
                    Beliebt
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-1">{pkg.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-medium">
                    {pkg.target}
                  </span>
                  <p className="text-sm text-muted-foreground mt-2">{pkg.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{pkg.price}€</span>
                  <span className="text-sm text-muted-foreground ml-1">{pkg.priceNote}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.highlights.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full rounded-full",
                    pkg.highlight
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-white/10 text-foreground hover:bg-white/20"
                  )}
                  asChild
                >
                  <Link to={`/kontakt?service=${encodeURIComponent(`IT-Betreuung ${pkg.name}`)}`}>
                    {pkg.name} anfragen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table (Desktop) */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="grid grid-cols-4 gap-0">
              {/* Header */}
              <div className="p-4 border-b border-white/10 font-medium text-muted-foreground text-sm">
                Leistung
              </div>
              {["Starter", "Business", "Enterprise"].map((name, i) => (
                <div
                  key={name}
                  className={cn(
                    "p-4 border-b border-white/10 text-center font-semibold text-sm",
                    i === 1 && "bg-primary/5"
                  )}
                >
                  {name}
                </div>
              ))}

              {/* Rows */}
              {features.map((feature, index) => (
                <>
                  <div
                    key={`label-${index}`}
                    className="p-4 border-b border-white/5 text-sm text-muted-foreground"
                  >
                    {feature.label}
                  </div>
                  {(["starter", "business", "enterprise"] as const).map((tier, i) => {
                    const value = feature[tier];
                    return (
                      <div
                        key={`${tier}-${index}`}
                        className={cn(
                          "p-4 border-b border-white/5 text-center text-sm",
                          i === 1 && "bg-primary/5"
                        )}
                      >
                        {value === "check" ? (
                          <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
                        ) : value === "dash" ? (
                          <span className="text-muted-foreground/40">—</span>
                        ) : (
                          <span className="text-foreground">{value}</span>
                        )}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add-on Modules */}
      <section className="section-padding relative">
        <div className="container-tight relative">
          <div className="divider-glow mb-20" />

          <div className="mb-12 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Einmalige Projekte
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Zusatzmodule mit{" "}
              <span className="gradient-text">Festpreis</span>
            </h2>
          </div>

          <div
            ref={addOnsRef}
            className={cn(
              "grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000",
              addOnsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-white/10 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                  <addon.icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{addon.title}</h3>
                <span className="text-sm font-medium text-primary">{addon.price}</span>
                <p className="text-sm text-muted-foreground mt-2">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />

        <div className="container-tight relative">
          <div className="divider-glow mb-20" />

          <div className="mb-16 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Vorteile
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Ihre Vorteile mit{" "}
              <span className="gradient-text">Petasync</span>
            </h2>
          </div>

          <div
            ref={advantagesRef}
            className={cn(
              "grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000",
              advantagesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="text-center group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-5 mx-auto group-hover:bg-white/10 transition-colors">
                  <advantage.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leih-PC Highlight */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 lg:text-right">
                <span className="text-sm text-primary tracking-widest uppercase mb-4 block">
                  Immer inklusive
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Leih-PC Service für Unternehmen
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Kein Produktivitätsverlust durch defekte Hardware: Wir stellen Ihren Mitarbeitern
                  während der Reparatur Leihgeräte zur Verfügung – inklusive Datenübertragung.
                </p>

                <div className="space-y-3">
                  {[
                    "Sofortige Verfügbarkeit von Ersatzgeräten",
                    "Professionelle Datenübertragung",
                    "Keine Unterbrechung der Geschäftsprozesse",
                    "Bei jeder Reparatur inklusive"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 lg:flex-row-reverse">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:order-1 flex justify-center">
                <div className="relative">
                  <Laptop className="w-32 h-32 text-primary" />
                  <div className="absolute -top-2 -right-2 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                    0€
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-20" />

          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Lassen Sie uns über Ihre IT sprechen
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Unverbindliches Beratungsgespräch – wir analysieren Ihren Bedarf und erstellen ein maßgeschneidertes Angebot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Kostenlosen IT-Check anfragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="mailto:info@petasync.de">
                  E-Mail schreiben
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
