import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, MapPin, Heart, Shield, Clock, Users, Zap, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";

const values = [
  {
    icon: Heart,
    title: "Ehrlichkeit",
    description: "Transparente Preise, ehrliche Diagnosen. Wir empfehlen keine Reparatur, wenn ein Neukauf sinnvoller ist.",
  },
  {
    icon: Zap,
    title: "Geschwindigkeit",
    description: "24h Reaktionszeit. Kostenloser Leih-PC, damit Sie keine Sekunde ohne Computer sind.",
  },
  {
    icon: Shield,
    title: "Qualität",
    description: "Jede Reparatur wird sorgfältig geprüft. Wir geben nur funktionierende Geräte zurück.",
  },
  {
    icon: Users,
    title: "Persönlichkeit",
    description: "Kein Call-Center, kein Ticket-System. Sie sprechen immer mit einem echten Techniker.",
  },
];

const milestones = [
  { year: "Start", text: "Gründung von Petasync mit der Vision: IT-Service, wie er sein sollte – persönlich, fair und zuverlässig." },
  { year: "Idee", text: "Einführung des kostenlosen Leih-PC-Service – damit niemand ohne Computer dastehen muss." },
  { year: "Wachstum", text: "Erweiterung auf Geschäftskunden mit Managed Services. IT-Betreuung für lokale Unternehmen." },
  { year: "Webdesign", text: "Aufbau des Webdesign-Arms. Professionelle Websites für lokale Betriebe – von Handwerkern bis Restaurants." },
  { year: "Heute", text: "500+ zufriedene Kunden, 5.0 Google-Bewertung, Servicegebiet über Mittelfranken." },
];

const stats = [
  { value: "500+", label: "Zufriedene Kunden" },
  { value: "5.0", label: "Google-Bewertung" },
  { value: "50km", label: "Serviceradius" },
  { value: "24h", label: "Reaktionszeit" },
];

export default function UeberUns() {
  useSEO({
    title: "Über uns – Petasync IT-Service | Ihr lokaler IT-Partner",
    description: "Lernen Sie Petasync kennen: Ihr persönlicher IT-Partner in Ansbach und Mittelfranken. Ehrlicher Service, faire Preise, kostenloser Leih-PC. Das sind wir.",
  });

  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: storyRef, isRevealed: storyRevealed } = useScrollReveal();
  const { ref: valuesRef, isRevealed: valuesRevealed } = useScrollReveal();
  const { ref: milestonesRef, isRevealed: milestonesRevealed } = useScrollReveal();
  const { ref: statsRef, isRevealed: statsRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div ref={heroRef} className={cn("container-tight relative z-10 py-32 transition-all duration-1000", heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Über{" "}<span className="gradient-text">Petasync</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Wir sind kein anonymer IT-Konzern. Wir sind Ihr persönlicher IT-Partner aus der Region – mit echtem Vor-Ort-Service und dem Anspruch, IT-Service besser zu machen.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/[0.08]">
        <div ref={statsRef} className={cn("container-tight transition-all duration-1000", statsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div ref={storyRef} className={cn("grid lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000", storyRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Warum{" "}<span className="gradient-text">Petasync</span>?
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Petasync ist entstanden, weil IT-Service in der Region oft entweder zu teuer, zu langsam oder zu unpersönlich war. Wir wollten einen IT-Service schaffen, bei dem der Mensch im Mittelpunkt steht – nicht die Rechnung.
                </p>
                <p>
                  Unser Versprechen: Faire Preise, ehrliche Diagnosen und ein kostenloser Leih-PC, damit Sie während der Reparatur nie ohne Computer dastehen. Kein anderer IT-Service in der Region bietet das.
                </p>
                <p>
                  Heute betreuen wir über 500 Privat- und Geschäftskunden in Ansbach, Nürnberg, Fürth, Erlangen und ganz Mittelfranken. Vom PC-Problem des Studenten bis zur IT-Infrastruktur des Mittelständlers – wir sind da.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Petasync IT-Service</p>
                    <p className="text-sm text-muted-foreground">Ansbach & Mittelfranken</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Dietenhofen / Oberasbach (mobil in ganz Mittelfranken)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+49 163 711 7198</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Mo-Fr 8-20 Uhr, Sa 10-18 Uhr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div ref={valuesRef} className={cn("transition-all duration-1000", valuesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Unsere Werte</h2>
              <p className="text-muted-foreground">Was uns antreibt – jeden Tag</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={value.title} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div ref={milestonesRef} className={cn("max-w-3xl mx-auto transition-all duration-1000", milestonesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Unsere Reise</h2>
              <p className="text-muted-foreground">Von der Idee zum IT-Partner der Region</p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-bold text-primary">{milestone.year}</span>
                  </div>
                  <div className="relative pb-8">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary" />
                    {index < milestones.length - 1 && (
                      <div className="absolute left-1.5 top-5 w-px h-full bg-white/10" />
                    )}
                    <p className="text-muted-foreground pl-8">{milestone.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Was uns{" "}<span className="gradient-text">unterscheidet</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In einer Branche voller versteckter Kosten und unverständlicher Fachbegriffe setzen wir auf Klarheit.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Kostenloser Leih-PC – einzigartig in der Region",
                "Keine versteckten Kosten – Festpreise oder transparenter Stundensatz",
                "Kostenlose Diagnose bei Reparaturauftrag",
                "Persönlicher Techniker – kein Call-Center",
                "Vor-Ort-Service in ganz Mittelfranken",
                "5.0 Google-Bewertung – 100% zufriedene Kunden",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
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
              <Users className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Lernen Sie uns kennen</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Ob PC-Problem, IT-Beratung oder Webprojekt – sprechen Sie mit uns. Die Erstberatung ist immer kostenlos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt">Kontakt aufnehmen<ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                  <a href="tel:+491637117198"><Phone className="mr-2 h-4 w-4" />0163 711 7198</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
