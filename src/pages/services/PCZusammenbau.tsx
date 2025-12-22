import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cpu, ArrowRight, CheckCircle2, Phone, Gamepad2, Briefcase, Monitor, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense, useEffect } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const pcTypes = [
  {
    icon: Gamepad2,
    title: "Gaming-PC",
    description: "Leistungsstarke Systeme für flüssiges Gaming in 1080p, 1440p oder 4K.",
    features: ["Aktuelle Grafikkarten", "Schnelle SSDs", "RGB-Beleuchtung", "Leise Kühlung"],
  },
  {
    icon: Briefcase,
    title: "Office & Home-Office",
    description: "Zuverlässige Rechner für Büroarbeit, Video-Calls und Multitasking.",
    features: ["Energieeffizient", "Leise Lüfter", "Genug Leistung", "Gutes Preis-Leistung"],
  },
  {
    icon: Monitor,
    title: "Multimedia-PC",
    description: "Perfekt für Foto- und Videobearbeitung, Streaming und mehr.",
    features: ["Viel RAM", "Schnelle CPU", "Große SSDs", "Farbechter Monitor"],
  },
  {
    icon: Zap,
    title: "Workstation",
    description: "Professionelle Systeme für anspruchsvolle Anwendungen und 3D-Rendering.",
    features: ["High-End Komponenten", "ECC-Speicher möglich", "Profi-Grafikkarten", "Maximale Leistung"],
  },
];

const process = [
  { step: "1", title: "Beratung", description: "Wir besprechen Ihre Anforderungen und Ihr Budget" },
  { step: "2", title: "Konfiguration", description: "Wir stellen die optimalen Komponenten zusammen" },
  { step: "3", title: "Zusammenbau", description: "Professioneller Einbau und Kabelmanagement" },
  { step: "4", title: "Installation", description: "Windows, Treiber und gewünschte Software" },
];

const benefits = [
  "Individuelle Beratung für Ihre Anforderungen",
  "Optimales Preis-Leistungs-Verhältnis",
  "Professioneller Zusammenbau",
  "Sauberes Kabelmanagement",
  "Windows Installation inklusive",
  "Garantie auf die Arbeit",
];

export default function PCZusammenbau() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: typesRef, isRevealed: typesRevealed } = useScrollReveal();
  const { ref: processRef, isRevealed: processRevealed } = useScrollReveal();

  useEffect(() => {
    document.title = "PC Zusammenbau Service in Ansbach & Nürnberg | PetaSync";
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
              <span className="text-sm text-foreground">PC-Zusammenbau</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Ihr Wunsch-PC{" "}
              <span className="gradient-text">vom Profi gebaut</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Ob Gaming-Monster oder leiser Office-PC – wir bauen Ihren Computer
              nach Ihren Wünschen zusammen. Inklusive Windows-Installation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  PC konfigurieren lassen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="tel:+491637117198">
                  <Phone className="mr-2 h-4 w-4" />
                  Beratung anrufen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PC Types Grid */}
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
            <h2 className="text-4xl font-bold gradient-text mb-4">Welcher PC-Typ sind Sie?</h2>
            <p className="text-muted-foreground">Wir bauen jeden PC – genau nach Ihren Anforderungen</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pcTypes.map((type, index) => (
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

                <div className="flex flex-wrap gap-2">
                  {type.features.map((feature, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                </div>
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
              <p className="text-muted-foreground">Von der Beratung zum fertigen PC</p>
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

      {/* Benefits & CTA */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Ihre Vorteile
                </h2>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center lg:text-left">
                <Cpu className="w-16 h-16 text-primary mb-6 mx-auto lg:mx-0" />
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Bereit für Ihren Traum-PC?
                </h3>
                <p className="text-muted-foreground mb-8">
                  Kontaktieren Sie uns für eine kostenlose Beratung. Wir finden die perfekte Konfiguration für Sie.
                </p>
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt">
                    Jetzt beraten lassen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
