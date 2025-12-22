import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrench, ArrowRight, CheckCircle2, Phone, MemoryStick, HardDrive, Cpu, Fan } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense, useEffect } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const upgrades = [
  {
    icon: HardDrive,
    title: "SSD-Upgrade",
    description: "Der effektivste Weg zu einem schnelleren PC. Bis zu 10x schnellere Ladezeiten.",
    benefits: ["Schnellerer Start", "Flüssigere Programme", "Weniger Wartezeit"],
  },
  {
    icon: MemoryStick,
    title: "RAM-Erweiterung",
    description: "Mehr Arbeitsspeicher für besseres Multitasking und schnellere Anwendungen.",
    benefits: ["Mehr Programme parallel", "Flüssigere Arbeit", "Zukunftssicher"],
  },
  {
    icon: Cpu,
    title: "Grafikkarten-Upgrade",
    description: "Neue Grafikkarte für bessere Gaming-Performance oder Videobearbeitung.",
    benefits: ["Höhere FPS", "Bessere Grafik", "4K-fähig"],
  },
  {
    icon: Fan,
    title: "Kühlung & Reinigung",
    description: "Neue Wärmeleitpaste, bessere Lüfter und gründliche Reinigung.",
    benefits: ["Leiserer Betrieb", "Keine Überhitzung", "Längere Lebensdauer"],
  },
];

const reasons = [
  "Deutlich günstiger als ein neuer PC",
  "Bestehende Daten bleiben erhalten",
  "Umweltfreundlicher als Neukauf",
  "Schnelle Umsetzung",
  "Professionelle Beratung",
  "Garantie auf die Arbeit",
];

export default function Aufruestung() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: upgradesRef, isRevealed: upgradesRevealed } = useScrollReveal();
  const { ref: reasonsRef, isRevealed: reasonsRevealed } = useScrollReveal();

  useEffect(() => {
    document.title = "PC Aufrüstung in Ansbach & Nürnberg | SSD, RAM, Grafikkarte | PetaSync";
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
              <Link to="/privatkunden" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privatkunden
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">PC-Aufrüstung</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              PC zu langsam?{" "}
              <span className="gradient-text">Aufrüsten statt wegwerfen</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Ihr PC ist träge geworden? Oft reicht ein gezieltes Upgrade, um ihn
              wieder fit zu machen. Günstiger und nachhaltiger als ein Neukauf.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Upgrade-Beratung anfragen
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

      {/* Upgrade Options */}
      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />

        <div
          ref={upgradesRef}
          className={cn(
            "container-tight relative transition-all duration-1000",
            upgradesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Beliebte Upgrades</h2>
            <p className="text-muted-foreground">Die effektivsten Wege zu mehr Performance</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {upgrades.map((upgrade, index) => (
              <div
                key={upgrade.title}
                className="group p-8 rounded-2xl border border-white/5 hover:border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent transition-all"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  <upgrade.icon className="w-6 h-6 text-foreground" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">{upgrade.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{upgrade.description}</p>

                <div className="space-y-2">
                  {upgrade.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Upgrade */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-tight">
          <div className="divider-glow mb-16" />

          <div
            ref={reasonsRef}
            className={cn(
              "grid lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000",
              reasonsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div>
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Warum Aufrüsten?
              </span>
              <h2 className="text-4xl font-bold mb-6">
                Vorteile gegenüber{" "}
                <span className="gradient-text">Neukauf</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ein neuer PC kostet schnell 500€ oder mehr. Oft lässt sich mit einem
                SSD-Upgrade für unter 100€ eine dramatische Verbesserung erreichen.
                Wir beraten Sie ehrlich, was sich lohnt – und was nicht.
              </p>
            </div>

            <div className="space-y-4">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{reason}</span>
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
              <Wrench className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Kostenlose Upgrade-Beratung
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Wir prüfen Ihren PC und sagen Ihnen ehrlich, welche Upgrades Sinn machen
                und welches Budget Sie einplanen sollten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt">
                    Beratung anfragen
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
