import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Headphones, ArrowRight, CheckCircle2, Phone, Clock, Zap, Shield, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";

const packages = [
  {
    name: "Basic Support",
    price: "99€/Monat",
    description: "Für kleine Teams",
    features: [
      "Telefon & E-Mail Support",
      "Mo-Fr 9-17 Uhr",
      "2 Stunden Remote-Support inkl.",
      "Reaktionszeit: 24h",
      "Ticket-System Zugang"
    ],
    highlight: false
  },
  {
    name: "Business Support",
    price: "199€/Monat",
    description: "Für wachsende Unternehmen",
    features: [
      "Alles aus Basic",
      "Mo-Fr 8-18 Uhr",
      "5 Stunden Remote-Support inkl.",
      "Reaktionszeit: 4h",
      "Prio-Behandlung",
      "Monatlicher Status-Report"
    ],
    highlight: true
  },
  {
    name: "Premium Support",
    price: "399€/Monat",
    description: "24/7 Enterprise-Support",
    features: [
      "Alles aus Business",
      "24/7 Erreichbarkeit",
      "10 Stunden Remote-Support inkl.",
      "SLA: 2h Reaktionszeit",
      "Dedizierter Ansprechpartner",
      "Proaktives Monitoring",
      "Quartalsweise Vor-Ort-Checks"
    ],
    highlight: false
  }
];

const hourlyRates = [
  { title: "Remote-Support", price: "50€/h", description: "Fernwartung via TeamViewer/AnyDesk" },
  { title: "Vor-Ort-Service", price: "75€/h", description: "Bei Ihnen im Büro (zzgl. Anfahrt)" },
  { title: "Notfall-Service", price: "120€/h", description: "Außerhalb Geschäftszeiten" }
];

const benefits = [
  "Schnelle Reaktionszeiten",
  "Erfahrene Techniker",
  "Remote & Vor-Ort",
  "Transparente Abrechnung",
  "Ticket-System",
  "Keine versteckten Kosten"
];

export default function ITSupport() {
  useSEO(SEO_PAGES.itSupport);
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: packagesRef, isRevealed: packagesRevealed } = useScrollReveal();
  const { ref: ratesRef, isRevealed: ratesRevealed } = useScrollReveal();
  const { ref: benefitsRef, isRevealed: benefitsRevealed } = useScrollReveal();

  return (
    <Layout>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <Suspense fallback={null}><Floating3DScene variant="dense" className="opacity-30" /></Suspense>
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div ref={heroRef} className={cn("container-tight relative z-10 py-32 transition-all duration-1000", heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <Link to="/geschaeftskunden" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Geschäftskunden</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">IT-Support</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-Support & <span className="gradient-text">Helpdesk</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Zuverlässiger IT-Support für Ihr Unternehmen. Remote und vor Ort – damit Ihre IT immer läuft.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">Support anfragen<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="tel:+491637117198"><Phone className="mr-2 h-4 w-4" />Jetzt anrufen</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
        <div ref={packagesRef} className={cn("container-tight relative transition-all duration-1000", packagesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Support-Pakete</h2>
            <p className="text-muted-foreground">Monatliche Flatrates mit inkludierten Stunden</p>
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
          <div ref={ratesRef} className={cn("transition-all duration-1000", ratesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Stundensätze</h2>
              <p className="text-muted-foreground">Flexible Abrechnung ohne Vertragsbindung</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {hourlyRates.map((rate, index) => (
                <div key={rate.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-center" style={{ transitionDelay: `${index * 100}ms` }}>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{rate.title}</h3>
                  <div className="text-3xl font-bold gradient-text mb-3">{rate.price}</div>
                  <p className="text-sm text-muted-foreground">{rate.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div ref={benefitsRef} className={cn("grid lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000", benefitsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Warum unser <span className="gradient-text">IT-Support?</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Schnell, kompetent und zuverlässig. Wir lösen Ihre IT-Probleme, bevor sie zum Problem werden.
              </p>
            </div>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
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
              <Headphones className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Brauchen Sie sofort Hilfe?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Unser Support-Team ist für Sie da. Rufen Sie an oder schreiben Sie uns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <a href="tel:+491637117198"><Phone className="mr-2 h-4 w-4" />+49 163 711 7198</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                  <Link to="/kontakt">Ticket erstellen</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
