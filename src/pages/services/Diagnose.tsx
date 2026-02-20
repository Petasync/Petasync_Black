import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, ArrowRight, CheckCircle2, Phone, Thermometer, HardDrive, Activity, AlertCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";

const diagnosticServices = [
  {
    icon: HardDrive,
    title: "Hardware-Diagnose",
    description: "Vollständiger Check aller Hardware-Komponenten wie RAM, Festplatte, Mainboard und Netzteil.",
  },
  {
    icon: Activity,
    title: "Software-Analyse",
    description: "Überprüfung des Betriebssystems, Treiber und installierter Programme auf Fehler.",
  },
  {
    icon: Thermometer,
    title: "Temperatur-Check",
    description: "Messung der CPU- und GPU-Temperaturen zur Erkennung von Überhitzungsproblemen.",
  },
  {
    icon: AlertCircle,
    title: "Fehlerprotokoll",
    description: "Detaillierte Auswertung aller System-Logs und Fehlermeldungen.",
  },
];

const packages = [
  {
    name: "Express-Diagnose",
    price: "KOSTENLOS",
    description: "Bei Reparaturauftrag",
    features: [
      "Hardware-Fehleranalyse",
      "Software-Check",
      "Kurzer Fehlerbericht",
      "Reparatur-Empfehlung"
    ],
    highlight: true
  },
  {
    name: "Standard-Diagnose",
    price: "19€",
    description: "Ohne Reparaturauftrag",
    features: [
      "Alles aus Express",
      "Detaillierter schriftlicher Bericht",
      "Anrechenbar bei späterer Reparatur",
      "Kostenvoranschlag inklusive"
    ],
    highlight: false
  },
  {
    name: "Premium-Diagnose",
    price: "39€",
    description: "Umfassende Analyse",
    features: [
      "Alles aus Standard",
      "Leistungstest (Benchmark)",
      "Temperaturmessung unter Last",
      "Ausführlicher Optimierungsplan"
    ],
    highlight: false
  }
];

const process = [
  { step: "1", title: "Termin", description: "Anruf oder online buchen" },
  { step: "2", title: "Analyse", description: "Gründliche Fehlersuche" },
  { step: "3", title: "Bericht", description: "Klare Ergebnisse & Preise" },
  { step: "4", title: "Entscheidung", description: "Sie entscheiden über Reparatur" },
];

export default function Diagnose() {
  useSEO(SEO_PAGES.diagnose);
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: packagesRef, isRevealed: packagesRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: processRef, isRevealed: processRevealed } = useScrollReveal();

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
              <Link to="/privatkunden" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privatkunden
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">Diagnose</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Computer{" "}
              <span className="gradient-text">Diagnose</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Wir finden das Problem schnell und zuverlässig. Kostenlose Diagnose bei jedem Reparaturauftrag.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Termin vereinbaren
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

      {/* Packages Section */}
      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />

        <div
          ref={packagesRef}
          className={cn(
            "container-tight relative transition-all duration-1000",
            packagesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Unsere Diagnose-Pakete</h2>
            <p className="text-muted-foreground">Transparente Preise – Sie entscheiden</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={cn(
                  "relative p-8 rounded-2xl border transition-all hover:scale-105",
                  pkg.highlight
                    ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30"
                    : "bg-white/5 border-white/10"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Empfohlen
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold gradient-text mb-2">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>

                <div className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={cn(
                    "w-full mt-8 rounded-full",
                    pkg.highlight ? "bg-primary hover:bg-primary/90" : "bg-white/10 hover:bg-white/20"
                  )}
                  asChild
                >
                  <Link to="/kontakt">Jetzt buchen</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we check */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />

          <div
            ref={servicesRef}
            className={cn(
              "transition-all duration-1000",
              servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Was wir prüfen</h2>
              <p className="text-muted-foreground">Umfassende Analyse aller Komponenten</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {diagnosticServices.map((service, index) => (
                <div
                  key={service.title}
                  className="group py-8 border-b border-white/5 last:border-0"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              <h2 className="text-4xl font-bold gradient-text mb-4">So funktioniert's</h2>
              <p className="text-muted-foreground">Transparent und unkompliziert</p>
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
              <Search className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Kostenlose Diagnose sichern
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Bei jedem Reparaturauftrag führen wir die Diagnose kostenlos durch. Vereinbaren Sie jetzt einen Termin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt">
                    Termin vereinbaren
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
        </div>
      </section>
    </Layout>
  );
}
