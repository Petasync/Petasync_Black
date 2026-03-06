import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Star, Building2, Globe, Shield, Wrench, CheckCircle2, Laptop, Clock, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";

const serviceAreas = [
  {
    icon: Wrench,
    category: "PC-Reparatur",
    title: "Hardware- & Software-Reparatur",
    description: "Ob defektes Mainboard, Virenbefall oder langsamer PC – wir diagnostizieren das Problem und reparieren es zum fairen Stundenpreis von 39€/h.",
    highlights: ["Diagnose kostenlos bei Reparatur", "Kostenloser Leih-PC während der Reparatur", "Hardware-Ersatz nach Kostenvoranschlag"],
  },
  {
    icon: Building2,
    category: "Managed Services",
    title: "IT-Betreuung für Unternehmen",
    description: "Regelmäßige Wartung, automatisierte Backups und ein fester Ansprechpartner – damit Ihre IT einfach funktioniert, ohne dass Sie sich darum kümmern müssen.",
    highlights: ["Monatlicher Vor-Ort-Support", "Automatisierte Backups", "Fester persönlicher IT-Ansprechpartner"],
  },
  {
    icon: Globe,
    category: "Webdesign",
    title: "Professionelle Websites",
    description: "Moderne, schnelle Websites für lokale Betriebe – von Handwerkern bis Restaurants. Inklusive SEO-Optimierung und Google Business Einrichtung.",
    highlights: ["Responsive Design für alle Geräte", "SEO-optimiert für lokale Suche", "Laufende Betreuung möglich"],
  },
  {
    icon: Shield,
    category: "IT-Sicherheit",
    title: "Datensicherung & Notfall-Hilfe",
    description: "Datenrettung, Virenentfernung, Backup-Einrichtung und Sicherheitskonzepte – damit Ihre Daten geschützt sind und im Notfall schnell wiederhergestellt werden.",
    highlights: ["Datenrettung bei Festplattendefekt", "Automatische Backup-Lösungen", "Sicherheitskonzepte für Unternehmen"],
  },
];

const promises = [
  { icon: Heart, title: "Ehrliche Diagnose", description: "Wir empfehlen keine Reparatur, wenn ein Neukauf sinnvoller wäre." },
  { icon: Laptop, title: "Kostenloser Leih-PC", description: "Damit Sie während der Reparatur nie ohne Computer dastehen." },
  { icon: Clock, title: "Schnelle Reaktion", description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen." },
  { icon: CheckCircle2, title: "Faire Preise", description: "Transparenter Stundensatz. Keine versteckten Kosten." },
];

export default function Referenzen() {
  useSEO({
    title: "Unsere Leistungen & Versprechen | Petasync IT-Service",
    description: "Erfahren Sie, wie Petasync Ihnen helfen kann: PC-Reparatur, IT-Betreuung, Webdesign und Datensicherung – ehrlich, fair und persönlich.",
  });

  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: promisesRef, isRevealed: promisesRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div ref={heroRef} className={cn("container-tight relative z-10 transition-all duration-1000", heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              So können wir{" "}<span className="gradient-text">Ihnen helfen</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Von der PC-Reparatur bis zur IT-Betreuung – hier sehen Sie, was wir für Sie tun können und worauf Sie sich verlassen dürfen.
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div ref={servicesRef} className={cn("transition-all duration-1000", servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Unsere Leistungsbereiche</h2>
              <p className="text-muted-foreground">Was wir konkret für Sie tun können</p>
            </div>

            <div className="space-y-12">
              {serviceAreas.map((area, index) => (
                <div key={index} className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <area.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{area.category}</span>
                      <h3 className="text-2xl font-bold text-foreground mt-2">{area.title}</h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{area.description}</p>

                  <div className="grid sm:grid-cols-3 gap-3">
                    {area.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div ref={promisesRef} className={cn("transition-all duration-1000", promisesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Unser Versprechen</h2>
              <p className="text-muted-foreground">Darauf können Sie sich verlassen</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {promises.map((promise, index) => (
                <div key={index} className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <promise.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">{promise.title}</h3>
                  <p className="text-muted-foreground text-sm">{promise.description}</p>
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
              <Star className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Überzeugen Sie sich selbst</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Die Erstberatung ist kostenlos. Schildern Sie uns Ihr Anliegen – wir finden die passende Lösung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt">Kostenlos beraten lassen<ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                  <a href="tel:+491637117198"><Phone className="mr-2 h-4 w-4" />Anrufen</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
