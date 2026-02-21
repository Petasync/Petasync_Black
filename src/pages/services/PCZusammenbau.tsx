import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrench, ArrowRight, CheckCircle2, Phone, Briefcase, Gamepad2, Monitor, Clapperboard, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import { RelatedServices } from "@/components/RelatedServices";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";

const buildTypes = [
  { icon: Briefcase, title: "Office-PC", description: "Perfekt für Büroarbeit, Internet und E-Mails.", price: "ab 349€" },
  { icon: Gamepad2, title: "Gaming-PC", description: "Leistungsstarke Systeme für flüssiges Gaming.", price: "ab 699€" },
  { icon: Clapperboard, title: "Content Creation", description: "Für Video-Editing, Streaming und 3D-Rendering.", price: "ab 999€" },
  { icon: Monitor, title: "Workstation", description: "High-End für professionelle Anwendungen.", price: "ab 1.299€" },
];

const packages = [
  {
    name: "Zusammenbau Basic",
    price: "69€",
    description: "Nur Zusammenbau",
    features: ["Hardware einbauen", "Kabel-Management", "Boot-Test", "BIOS-Setup", "Garantie auf Arbeit"],
    highlight: false
  },
  {
    name: "Zusammenbau Premium",
    price: "99€",
    description: "Mit Software-Setup",
    features: ["Alles aus Basic", "Windows 11 installieren", "Alle Treiber installieren", "Windows-Updates", "Leistungsoptimierung"],
    highlight: true
  },
  {
    name: "Komplett-Service",
    price: "ab 349€",
    description: "Beratung + PC + Aufbau",
    features: ["Persönliche Beratung", "Hardware-Auswahl", "Bester Preis für Komponenten", "Professioneller Zusammenbau", "12 Monate Garantie"],
    highlight: false
  }
];

const includedServices = [
  "Persönliche Beratung & Konfiguration",
  "Qualitätskomponenten mit Garantie",
  "Professioneller Zusammenbau",
  "Windows 11 Installation",
  "Alle Treiber & Updates installiert",
  "Kabel-Management für saubere Optik",
  "Funktionstest & Qualitätskontrolle",
  "12 Monate Garantie auf Arbeit"
];

export default function PCZusammenbau() {
  useSEO(SEO_PAGES.pcZusammenbau);
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: packagesRef, isRevealed: packagesRevealed } = useScrollReveal();
  const { ref: typesRef, isRevealed: typesRevealed } = useScrollReveal();
  const { ref: includedRef, isRevealed: includedRevealed } = useScrollReveal();

  return (
    <Layout>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <Suspense fallback={null}><Floating3DScene variant="default" className="opacity-30" /></Suspense>
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div ref={heroRef} className={cn("container-tight relative z-10 py-32 transition-all duration-1000", heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <Link to="/privatkunden" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privatkunden</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">PC-Zusammenbau</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              PC{" "}<span className="gradient-text">Zusammenbau</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Ihr Wunsch-PC professionell zusammengebaut. Gaming, Office oder Workstation – individuell nach Ihren Anforderungen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">PC konfigurieren<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="tel:+491637117198"><Phone className="mr-2 h-4 w-4" />Beratung</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
        <div ref={packagesRef} className={cn("container-tight relative transition-all duration-1000", packagesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Zusammenbau-Pakete</h2>
            <p className="text-muted-foreground">Wählen Sie Ihr Service-Level</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={pkg.name} className={cn("relative p-8 rounded-2xl border transition-all hover:scale-105", pkg.highlight ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30" : "bg-white/5 border-white/10")} style={{ transitionDelay: `${index * 100}ms` }}>
                {pkg.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">Beliebt</div>}
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
                <Button className={cn("w-full mt-8 rounded-full", pkg.highlight ? "bg-primary hover:bg-primary/90" : "bg-white/10 hover:bg-white/20")} asChild>
                  <Link to="/kontakt">Jetzt buchen</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div ref={typesRef} className={cn("transition-all duration-1000", typesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Komplett-PCs</h2>
              <p className="text-muted-foreground">Beratung + Hardware + Zusammenbau</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {buildTypes.map((type, index) => (
                <div key={type.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{type.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{type.description}</p>
                  <div className="text-primary font-semibold">{type.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div ref={includedRef} className={cn("grid lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000", includedRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Was ist{" "}<span className="gradient-text">inklusive?</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Bei unserem Komplett-Service erhalten Sie nicht nur einen zusammengebauten PC, sondern ein komplett eingerichtetes, einsatzbereites System.
              </p>
            </div>
            <div className="space-y-4">
              {includedServices.map((service, index) => (
                <div key={index} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedServices services={[
        { title: "PC-Aufrüstung", href: "/services/pc-aufruestung", price: "ab 25€", icon: Wrench },
        { title: "PC Reinigung", href: "/services/pc-reinigung", price: "ab 25€", icon: Sparkles },
      ]} />

      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="relative text-center">
              <Wrench className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Bereit für Ihren Wunsch-PC?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Vereinbaren Sie ein kostenloses Beratungsgespräch. Wir konfigurieren Ihren PC nach Ihren Wünschen und Budget.
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">Kostenlose Beratung<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
