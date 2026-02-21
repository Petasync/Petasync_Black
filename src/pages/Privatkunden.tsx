import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Monitor, Shield, Wifi, ArrowRight, CheckCircle2, Phone, Laptop } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import privatkundenHero from "@/assets/privatkunden-hero.png";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Package {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  packages: Package[];
}

const categories: Category[] = [
  {
    id: "pc-service",
    label: "PC-Service",
    icon: Monitor,
    packages: [
      {
        name: "Schnell-Check",
        price: "49",
        priceNote: "einmalig",
        description: "Diagnose & Grundpflege",
        features: [
          "Hardware- & Software-Diagnose",
          "PC-Reinigung innen & außen",
          "Leistungs-Check & Optimierung",
          "Kostenloser Leih-PC",
        ],
      },
      {
        name: "Reparatur Komplett",
        price: "99",
        priceNote: "einmalig",
        description: "Unser beliebtestes Paket",
        features: [
          "Diagnose & Fehleranalyse",
          "Software-Reparatur & Updates",
          "Reinigung & Optimierung",
          "Kostenloser Leih-PC",
          "Hardware-Teile nach Kostenvoranschlag",
        ],
        highlight: true,
      },
      {
        name: "Rundum-Sorglos",
        price: "149",
        priceNote: "einmalig",
        description: "Komplett-Service mit Nachsorge",
        features: [
          "Alles aus Reparatur Komplett",
          "Sicherheits-Setup & Antivirus",
          "Backup-Einrichtung",
          "30 Tage Nachsorge inklusive",
          "Kostenloser Leih-PC",
        ],
      },
    ],
  },
  {
    id: "daten-sicherheit",
    label: "Daten & Sicherheit",
    icon: Shield,
    packages: [
      {
        name: "Sicherheits-Basics",
        price: "59",
        priceNote: "einmalig",
        description: "Virenschutz & Grundsicherung",
        features: [
          "Virenscan & Entfernung",
          "Antivirus-Installation",
          "Browser-Sicherheit",
          "Firewall-Konfiguration",
        ],
      },
      {
        name: "Daten-Rettung",
        price: "129",
        priceNote: "einmalig",
        description: "Professionelle Datenwiederherstellung",
        features: [
          "Analyse & Datenrettung",
          "Bis 500 GB (logisch)",
          "Backup-Einrichtung",
          "Datenträger-Prüfung",
          "Kostenvoranschlag bei Hardware-Defekt",
        ],
        highlight: true,
      },
      {
        name: "Komplett-Schutz",
        price: "199",
        priceNote: "einmalig",
        description: "Maximaler Schutz für Ihre Daten",
        features: [
          "Alles aus Daten-Rettung",
          "VPN-Einrichtung",
          "Passwort-Manager Setup",
          "Verschlüsselung",
          "1h Sicherheits-Schulung",
        ],
      },
    ],
  },
  {
    id: "pc-netzwerk",
    label: "Neuer PC & Netzwerk",
    icon: Wifi,
    packages: [
      {
        name: "WLAN-Fit",
        price: "79",
        priceNote: "einmalig",
        description: "Optimales Heimnetzwerk",
        features: [
          "Router-Check & Optimierung",
          "WLAN-Abdeckung verbessern",
          "Sicherheits-Setup",
          "Geräte einbinden",
        ],
      },
      {
        name: "PC nach Maß",
        price: "99",
        priceNote: "+ Hardware",
        description: "Ihr Wunsch-PC, professionell gebaut",
        features: [
          "Persönliche Beratung",
          "Zusammenbau & Verkabelung",
          "Windows-Installation & Treiber",
          "Test & Übergabe",
          "12 Monate Garantie",
        ],
        highlight: true,
      },
      {
        name: "Heim-Komplett",
        price: "199",
        priceNote: "+ Hardware",
        description: "PC + Netzwerk aus einer Hand",
        features: [
          "PC-Zusammenbau nach Wunsch",
          "Netzwerk-Setup & WLAN",
          "Smart Home Basics",
          "Sicherheits-Einrichtung",
          "1h Einweisung",
        ],
      },
    ],
  },
];

const benefits = [
  "Persönliche Beratung vor Ort",
  "Transparente Festpreise",
  "Kostenloser Leih-PC bei jeder Reparatur",
  "Keine versteckten Kosten",
  "Schnelle Bearbeitung",
  "Hausbesuch möglich"
];

export default function Privatkunden() {
  useSEO(SEO_PAGES.privatkunden);
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: benefitsRef, isRevealed: benefitsRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={privatkundenHero}
            alt="IT-Service für Privatkunden"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>

        <Suspense fallback={null}>
          <Floating3DScene variant="default" className="opacity-40" />
        </Suspense>

        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-32 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-6 block">
              Für Privatpersonen
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-Service für{" "}
              <span className="gradient-text">Ihr Zuhause</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Professionelle Hilfe bei allen Computer-Problemen. Persönlich, zuverlässig und mit
              kostenlosem Leih-PC während jeder Reparatur.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  PC-Problem melden
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

      {/* Packages Section - Tabbed Categories */}
      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />

        <div className="container-tight relative">
          <div className="mb-16 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Festpreise
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              Unsere Pakete für Sie
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wählen Sie Ihre Kategorie und das passende Paket – alle Preise sind Festpreise, keine versteckten Kosten.
            </p>
          </div>

          {/* Leih-PC Banner */}
          <div className="flex items-center justify-center gap-3 mb-12 py-3 px-6 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto">
            <Laptop className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Kostenloser Leih-PC bei jeder Reparatur inklusive
            </span>
          </div>

          <div
            ref={servicesRef}
            className={cn(
              "transition-all duration-1000",
              servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <Tabs defaultValue="pc-service" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-white/5 p-1 rounded-xl h-auto">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="flex items-center gap-2 py-3 px-4 text-sm data-[state=active]:bg-white/10 data-[state=active]:text-foreground rounded-lg transition-all"
                  >
                    <cat.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cat.label}</span>
                    <span className="sm:hidden text-xs">{cat.label.split(" ")[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid md:grid-cols-3 gap-6">
                    {category.packages.map((pkg, index) => (
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
                          <h3 className="text-xl font-bold text-foreground mb-1">{pkg.name}</h3>
                          <p className="text-sm text-muted-foreground">{pkg.description}</p>
                        </div>

                        <div className="mb-6">
                          <span className="text-4xl font-bold text-foreground">{pkg.price}€</span>
                          <span className="text-sm text-muted-foreground ml-2">{pkg.priceNote}</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                          {pkg.features.map((feature, idx) => (
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
                          <Link to={`/kontakt?service=${encodeURIComponent(pkg.name)}`}>
                            {pkg.name} buchen
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />

        <div className="container-tight relative">
          <div className="divider-glow mb-20" />

          <div
            ref={benefitsRef}
            className={cn(
              "grid lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000",
              benefitsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="lg:order-2 text-right">
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Vorteile
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Warum Privatkunden uns{" "}
                <span className="gradient-text">vertrauen</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wir verstehen, dass Ihr Computer ein wichtiger Teil Ihres Alltags ist.
                Deshalb bieten wir schnellen, zuverlässigen Service ohne kompliziertes Fachchinesisch.
              </p>
            </div>

            <div className="lg:order-1 space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
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
              Bereit für professionelle IT-Hilfe?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Schildern Sie uns Ihr Problem – wir finden die Lösung. Kostenlose Erstberatung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Kostenloses Erstgespräch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="https://wa.me/491637117198" target="_blank" rel="noopener noreferrer">
                  WhatsApp schreiben
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
