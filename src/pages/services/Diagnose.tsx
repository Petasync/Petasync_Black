import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, ArrowRight, CheckCircle2, Phone, AlertTriangle, HardDrive, Cpu, ThermometerSun } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense, useEffect } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const problems = [
  {
    icon: AlertTriangle,
    title: "PC startet nicht",
    description: "Ihr Computer zeigt keine Reaktion oder bleibt beim Hochfahren hängen.",
  },
  {
    icon: HardDrive,
    title: "Langsamer PC",
    description: "Ihr Rechner ist extrem langsam geworden und Programme hängen.",
  },
  {
    icon: Cpu,
    title: "Bluescreens",
    description: "Häufige Abstürze mit blauem Bildschirm und Fehlermeldungen.",
  },
  {
    icon: ThermometerSun,
    title: "Überhitzung",
    description: "Der PC wird heiß, Lüfter laufen laut oder er schaltet sich ab.",
  },
];

const benefits = [
  "Kostenlose Fehleranalyse",
  "Transparenter Kostenvoranschlag vor Reparatur",
  "Keine versteckten Kosten",
  "Ehrliche Beratung – auch wenn Reparatur sich nicht lohnt",
  "Sie entscheiden, ob repariert wird",
  "Kostenloser Leih-PC während der Reparatur",
];

export default function Diagnose() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: problemsRef, isRevealed: problemsRevealed } = useScrollReveal();
  const { ref: benefitsRef, isRevealed: benefitsRevealed } = useScrollReveal();

  useEffect(() => {
    document.title = "Kostenlose PC Diagnose in Ansbach & Nürnberg | PetaSync";
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
              <span className="text-sm text-foreground">Kostenlose Diagnose</span>
            </div>

            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary font-semibold">Kostenlos</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              PC-Diagnose{" "}
              <span className="gradient-text">gratis</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Ihr PC macht Probleme? Wir finden heraus, was los ist – kostenlos und unverbindlich.
              Sie zahlen nur, wenn Sie uns mit der Reparatur beauftragen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Diagnose anfragen
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

      {/* Common Problems */}
      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />

        <div
          ref={problemsRef}
          className={cn(
            "container-tight relative transition-all duration-1000",
            problemsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Typische PC-Probleme</h2>
            <p className="text-muted-foreground">Diese und viele weitere Probleme diagnostizieren wir kostenlos</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {problems.map((problem, index) => (
              <div
                key={problem.title}
                className="group py-8 border-b border-white/5 last:border-0"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <problem.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{problem.title}</h3>
                    <p className="text-muted-foreground">{problem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-tight">
          <div className="divider-glow mb-16" />

          <div
            ref={benefitsRef}
            className={cn(
              "grid lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000",
              benefitsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div>
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Ihre Vorteile
              </span>
              <h2 className="text-4xl font-bold mb-6">
                Warum kostenlose{" "}
                <span className="gradient-text">Diagnose?</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wir glauben an Transparenz. Bevor Sie Geld ausgeben, sollen Sie wissen,
                was genau das Problem ist und was die Reparatur kostet. So können Sie
                eine informierte Entscheidung treffen.
              </p>
            </div>

            <div className="space-y-4">
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

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative text-center">
              <Search className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                PC-Problem? Lassen Sie uns schauen.
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Bringen Sie Ihr Gerät vorbei oder wir kommen zu Ihnen. Die Diagnose ist immer kostenlos.
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
