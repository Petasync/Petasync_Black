import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Monitor, ArrowRight, CheckCircle2, Phone, Shield, Clock, BarChart3, RefreshCw, Headphones, Server } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense, useEffect } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const services = [
  {
    icon: Monitor,
    title: "24/7 Systemüberwachung",
    description: "Wir überwachen Ihre Server und Workstations rund um die Uhr. Probleme werden erkannt, bevor sie zu Ausfällen führen.",
  },
  {
    icon: Shield,
    title: "Sicherheits-Management",
    description: "Automatische Updates, Virenscans und Firewall-Überwachung. Ihre Systeme sind immer auf dem neuesten Stand.",
  },
  {
    icon: RefreshCw,
    title: "Automatische Backups",
    description: "Tägliche Datensicherung mit regelmäßigen Wiederherstellungstests. Ihre Daten sind sicher – garantiert.",
  },
  {
    icon: Headphones,
    title: "Priorisierter Support",
    description: "Schnellere Reaktionszeiten und direkter Zugang zu unserem Support-Team. Sie werden bevorzugt behandelt.",
  },
];

const included = [
  "Monatliches Reporting über Systemzustand",
  "Proaktive Wartung und Updates",
  "Remote-Support inklusive",
  "Regelmäßige Sicherheits-Audits",
  "Persönlicher Ansprechpartner",
  "Dokumentation Ihrer IT-Infrastruktur",
  "Quartalsweise Strategy-Reviews",
  "Notfall-Support außerhalb der Geschäftszeiten",
];

const comparison = [
  { feature: "Reaktive Problemlösung", traditional: true, managed: true },
  { feature: "Proaktive Überwachung", traditional: false, managed: true },
  { feature: "Automatische Updates", traditional: false, managed: true },
  { feature: "Backup-Management", traditional: false, managed: true },
  { feature: "Monatlicher Report", traditional: false, managed: true },
  { feature: "Fester Ansprechpartner", traditional: false, managed: true },
  { feature: "Planbare IT-Kosten", traditional: false, managed: true },
];

export default function ManagedIT() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: comparisonRef, isRevealed: comparisonRevealed } = useScrollReveal();

  useEffect(() => {
    document.title = "Managed IT Services für Unternehmen | 24/7 Überwachung | PetaSync";
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
              <Link to="/geschaeftskunden" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Geschäftskunden
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">Managed IT</span>
            </div>

            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary font-semibold">Rundum-Betreuung</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-Betreuung{" "}
              <span className="gradient-text">ohne Sorgen</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Konzentrieren Sie sich auf Ihr Geschäft – wir kümmern uns um Ihre IT.
              Proaktive Überwachung, automatische Updates und schneller Support inklusive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Beratung vereinbaren
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

      {/* Services Grid */}
      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />

        <div
          ref={servicesRef}
          className={cn(
            "container-tight relative transition-all duration-1000",
            servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Was ist enthalten?</h2>
            <p className="text-muted-foreground">Alles, was Ihre IT am Laufen hält</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group py-8 border-b border-white/5 last:border-0"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
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
      </section>

      {/* Comparison */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />

          <div
            ref={comparisonRef}
            className={cn(
              "transition-all duration-1000",
              comparisonRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Managed IT vs. Klassischer Support</h2>
              <p className="text-muted-foreground">Warum proaktiv besser ist als reaktiv</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm font-medium">
                <div></div>
                <div className="text-center text-muted-foreground">Klassisch</div>
                <div className="text-center text-primary">Managed IT</div>
              </div>

              {comparison.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 py-4 border-b border-white/5 items-center"
                >
                  <div className="text-sm text-foreground">{item.feature}</div>
                  <div className="text-center">
                    {item.traditional ? (
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                  <div className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Included Features */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Alles inklusive
              </span>
              <h2 className="text-4xl font-bold mb-6">
                Volle Transparenz,{" "}
                <span className="gradient-text">planbare Kosten</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mit Managed IT haben Sie einen festen monatlichen Betrag für Ihre
                IT-Betreuung. Keine Überraschungen, keine versteckten Kosten.
                Sie wissen genau, was Sie erwartet.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {included.map((item, index) => (
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

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative text-center">
              <Server className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Bereit für sorgenfreie IT?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Lassen Sie uns über Ihre Anforderungen sprechen. Wir erstellen
                ein individuelles Angebot für Ihr Unternehmen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt">
                    Jetzt anfragen
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
        </div>
      </section>
    </Layout>
  );
}
