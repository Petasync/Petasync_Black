import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, ArrowRight, CheckCircle2, Phone, Cpu, MemoryStick, HardDrive as HardDriveIcon, Gamepad2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";

const upgradeServices = [
  { icon: HardDriveIcon, title: "SSD-Upgrade", description: "Windows auf SSD umziehen für drastisch schnelleren PC.", price: "45€ + SSD" },
  { icon: MemoryStick, title: "RAM-Erweiterung", description: "Mehr Arbeitsspeicher für flüssiges Multitasking.", price: "25€ + RAM" },
  { icon: Gamepad2, title: "Grafikkarten-Einbau", description: "Leistungsstarke GPU für Gaming und Grafikarbeiten.", price: "29€ + GPU" },
  { icon: Cpu, title: "CPU-Wechsel", description: "Prozessor-Upgrade inkl. Wärmeleitpaste.", price: "59€ + CPU" },
];

const packages = [
  {
    name: "Office-Upgrade",
    price: "ab 249€",
    description: "Für schnelles Arbeiten",
    features: ["500GB SSD + Installation", "8GB RAM Upgrade", "Windows-Umzug", "Alle Treiber & Updates", "Leistungstest"],
    highlight: false
  },
  {
    name: "Gaming-Upgrade",
    price: "ab 449€",
    description: "Für Gaming-Leistung",
    features: ["1TB SSD + Installation", "16GB RAM Upgrade", "Mittelklasse-GPU", "Windows optimieren", "Benchmark-Tests"],
    highlight: true
  },
  {
    name: "Premium-Upgrade",
    price: "ab 699€",
    description: "Maximum Performance",
    features: ["2TB NVMe SSD", "32GB High-End RAM", "High-End Grafikkarte", "CPU-Upgrade möglich", "Komplett-Optimierung"],
    highlight: false
  }
];

export default function PCAufruestung() {
  useSEO(SEO_PAGES.pcAufruestung);
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: packagesRef, isRevealed: packagesRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();

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
              <span className="text-sm text-foreground">PC-Aufrüstung</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              PC{" "}<span className="gradient-text">Aufrüstung</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Mehr Leistung für Ihren PC. Professionelle Hardware-Upgrades für Gaming, Office oder Workstation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">Upgrade anfragen<ArrowRight className="ml-2 h-4 w-4" /></Link>
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
            <h2 className="text-4xl font-bold gradient-text mb-4">Upgrade-Pakete</h2>
            <p className="text-muted-foreground">Komplett-Pakete inkl. Hardware & Einbau</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={pkg.name} className={cn("relative p-8 rounded-2xl border transition-all hover:scale-105", pkg.highlight ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30" : "bg-white/5 border-white/10")} style={{ transitionDelay: `${index * 100}ms` }}>
                {pkg.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">Bestseller</div>}
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
                  <Link to="/kontakt">Jetzt konfigurieren</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div ref={servicesRef} className={cn("transition-all duration-1000", servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Einzelne Upgrades</h2>
              <p className="text-muted-foreground">Arbeitszeit + Hardware nach Wunsch</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {upgradeServices.map((service, index) => (
                <div key={service.title} className="group py-8 border-b border-white/5 last:border-0" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                        <span className="text-sm text-primary font-medium whitespace-nowrap">{service.price}</span>
                      </div>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="relative text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Bereit für mehr Leistung?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Wir beraten Sie kostenlos, welches Upgrade sich für Ihren PC lohnt.
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
