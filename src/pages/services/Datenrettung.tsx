import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Database, ArrowRight, CheckCircle2, Phone, HardDrive, Smartphone, SdCard, Server } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const dataRecoveryTypes = [
  {
    icon: HardDrive,
    title: "Festplatten (HDD/SSD)",
    description: "Rettung von Daten defekter interner und externer Festplatten.",
  },
  {
    icon: SdCard,
    title: "USB-Sticks & SD-Karten",
    description: "Wiederherstellung von Daten von defekten Speicherkarten und USB-Sticks.",
  },
  {
    icon: Smartphone,
    title: "Smartphone & Tablet",
    description: "Datenrettung von Android und iOS Geräten.",
  },
  {
    icon: Server,
    title: "RAID-Systeme",
    description: "Professionelle Rettung von RAID-Verbünden und NAS-Systemen.",
  },
];

const packages = [
  {
    name: "Express-Analyse",
    price: "39€",
    description: "Schnellcheck ob rettbar",
    features: [
      "Datenträger-Diagnose",
      "Rettungswahrscheinlichkeit",
      "Kostenvoranschlag",
      "Wird bei Auftrag angerechnet"
    ],
    highlight: false
  },
  {
    name: "Standard-Rettung",
    price: "ab 89€",
    description: "Logische Fehler",
    features: [
      "Gelöschte Dateien wiederherstellen",
      "Formatierte Laufwerke",
      "Beschädigte Partitionen",
      "Software-Fehler",
      "Bis 500GB Daten"
    ],
    highlight: true
  },
  {
    name: "Premium-Rettung",
    price: "ab 199€",
    description: "Physische Schäden",
    features: [
      "Alles aus Standard",
      "Hardware-Defekte",
      "Beschädigte Sektoren",
      "Elektronik-Schäden",
      "Professionelle Labor-Analyse"
    ],
    highlight: false
  }
];

export default function Datenrettung() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: packagesRef, isRevealed: packagesRevealed } = useScrollReveal();
  const { ref: typesRef, isRevealed: typesRevealed } = useScrollReveal();

  return (
    <Layout>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <Suspense fallback={null}>
          <Floating3DScene variant="default" className="opacity-30" />
        </Suspense>
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div ref={heroRef} className={cn("container-tight relative z-10 py-32 transition-all duration-1000", heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <Link to="/privatkunden" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privatkunden</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">Datenrettung</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Professionelle{" "}
              <span className="gradient-text">Datenrettung</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Verlorene Daten? Defekte Festplatte? Wir retten Ihre wertvollen Dateien professionell und zuverlässig.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">Daten retten<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="tel:+491637117198"><Phone className="mr-2 h-4 w-4" />Notfall-Hotline</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
        <div ref={packagesRef} className={cn("container-tight relative transition-all duration-1000", packagesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Datenrettungs-Pakete</h2>
            <p className="text-muted-foreground">Je nach Schadensart und Aufwand</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={pkg.name} className={cn("relative p-8 rounded-2xl border transition-all hover:scale-105", pkg.highlight ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30" : "bg-white/5 border-white/10")} style={{ transitionDelay: `${index * 100}ms` }}>
                {pkg.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">Häufigste Wahl</div>}
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
                  <Link to="/kontakt">Jetzt anfragen</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm">Backup-System einrichten: <span className="text-primary font-semibold">45€</span></p>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div ref={typesRef} className={cn("transition-all duration-1000", typesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Was wir retten</h2>
              <p className="text-muted-foreground">Von allen Speichermedien</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {dataRecoveryTypes.map((type, index) => (
                <div key={type.title} className="group py-8 border-b border-white/5 last:border-0" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <type.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{type.title}</h3>
                      <p className="text-muted-foreground">{type.description}</p>
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
              <Database className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Daten verloren?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Kontaktieren Sie uns sofort. Je schneller wir handeln, desto höher die Rettungschance.
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">Notfall-Kontakt<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
