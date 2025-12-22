import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Headphones, ArrowRight, CheckCircle2, Phone, Clock, Shield, Zap, Euro } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense, useEffect } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const features = [
  {
    icon: Zap,
    title: "Sofortige Hilfe",
    description: "In wenigen Minuten sind wir auf Ihrem PC – ohne Anfahrt und Wartezeit.",
  },
  {
    icon: Euro,
    title: "Günstig",
    description: "Ab 19€ für 30 Minuten. Keine Anfahrtskosten, kein Mindestauftragswert.",
  },
  {
    icon: Shield,
    title: "Sicher",
    description: "Sie sehen jederzeit, was wir tun. Die Verbindung wird verschlüsselt.",
  },
  {
    icon: Clock,
    title: "Flexibel",
    description: "Auch außerhalb der Geschäftszeiten nach Absprache möglich.",
  },
];

const canHelp = [
  "Software-Installation und Updates",
  "Virenentfernung und Sicherheitscheck",
  "Windows-Probleme beheben",
  "Drucker und Scanner einrichten",
  "E-Mail Konfiguration",
  "Langsamen PC optimieren",
  "Programme konfigurieren",
  "Backup einrichten",
];

const process = [
  { step: "1", title: "Kontakt", description: "Rufen Sie an oder schreiben Sie uns Ihr Problem" },
  { step: "2", title: "Verbindung", description: "Wir senden Ihnen einen sicheren Link" },
  { step: "3", title: "Zuschauen", description: "Sie sehen alles, was wir auf Ihrem PC machen" },
  { step: "4", title: "Fertig", description: "Problem gelöst, Sie zahlen nur die Zeit" },
];

export default function Fernwartung() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: featuresRef, isRevealed: featuresRevealed } = useScrollReveal();
  const { ref: processRef, isRevealed: processRevealed } = useScrollReveal();

  useEffect(() => {
    document.title = "Fernwartung & Remote-Support ab 19€ | PetaSync Ansbach";
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
              <span className="text-sm text-foreground">Fernwartung</span>
            </div>

            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary font-semibold">Ab 19€ / 30 Min</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              PC-Hilfe{" "}
              <span className="gradient-text">direkt zu Ihnen</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Schnelle Hilfe ohne Wartezeit: Wir verbinden uns sicher auf Ihren PC
              und lösen das Problem – während Sie zuschauen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <a href="tel:+491637117198">
                  <Phone className="mr-2 h-4 w-4" />
                  Jetzt Hilfe holen
                </a>
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

      {/* Features */}
      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />

        <div
          ref={featuresRef}
          className={cn(
            "container-tight relative transition-all duration-1000",
            featuresRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4 mx-auto group-hover:bg-white/10 transition-colors">
                  <feature.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we can help with */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Per Fernwartung lösbar
              </span>
              <h2 className="text-4xl font-bold mb-6">
                Dabei können wir{" "}
                <span className="gradient-text">helfen</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Viele PC-Probleme lassen sich schnell und einfach per Fernwartung lösen.
                Das spart Zeit und Geld – keine Anfahrt, kein Warten auf einen Termin.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {canHelp.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 py-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
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
              <h2 className="text-4xl font-bold gradient-text mb-4">So einfach geht's</h2>
              <p className="text-muted-foreground">In wenigen Minuten zur Problemlösung</p>
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
                PC-Problem? Wir helfen sofort!
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Rufen Sie an und schildern Sie Ihr Problem. In wenigen Minuten
                sind wir auf Ihrem Bildschirm und helfen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <a href="tel:+491637117198">
                    <Phone className="mr-2 h-4 w-4" />
                    +49 163 711 7198
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                  <Link to="/kontakt">
                    Kontaktformular
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
