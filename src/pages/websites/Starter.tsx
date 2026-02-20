import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Palette, Check, ArrowRight, Sparkles, Code, Layers, Rocket } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";

const features = [
  "Individuelles, maßgeschneidertes Design",
  "Bis zu 5 Seiten nach Ihren Wünschen",
  "Vollständig responsive (alle Geräte)",
  "Modernes Kontaktformular",
  "Basis-SEO Optimierung",
  "SSL-Zertifikat inklusive",
  "1 Monat technischer Support",
  "Google Analytics Integration",
  "Cookie-Banner (DSGVO-konform)",
  "Einweisung in die Bedienung"
];

const idealFor = [
  "Selbstständige & Freelancer",
  "Kleine Unternehmen",
  "Lokale Dienstleister",
  "Handwerksbetriebe",
  "Berater & Coaches",
  "Praxen & Therapeuten"
];

const process = [
  {
    icon: Sparkles,
    title: "Briefing",
    description: "Wir besprechen Ihre Wünsche, Zielgruppe und Anforderungen im Detail."
  },
  {
    icon: Palette,
    title: "Design",
    description: "Wir erstellen ein individuelles Design, das zu Ihrer Marke passt."
  },
  {
    icon: Code,
    title: "Entwicklung",
    description: "Umsetzung mit modernsten Technologien für beste Performance."
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Nach Ihrer Freigabe geht die Website live – wir kümmern uns um alles."
  }
];

export default function WebsiteStarter() {
  useSEO(SEO_PAGES.websiteStarter);
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: processRef, isRevealed: processRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-24 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full mb-6">
              <Palette className="w-4 h-4" />
              Individuelles Design
            </span>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-[1.1]">
              Website{" "}
              <span className="gradient-text">Starter</span>
            </h1>
            
            <div className="mb-6">
              <span className="text-5xl font-bold">990€</span>
              <span className="text-xl text-muted-foreground ml-2">einmalig</span>
            </div>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Ihr individueller Webauftritt – maßgeschneidert für Ihr Unternehmen.
              Perfekt für den professionellen Start im Internet mit einem Design, das zu Ihnen passt.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Starter-Paket buchen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <Link to="/websites">
                  Alle Pakete ansehen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Ideal For */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Alles im Starter-Paket
              </h2>
              <p className="text-muted-foreground mb-8">
                Ein vollwertiger, professioneller Webauftritt – individuell für Sie gestaltet.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl" />
              <div className="relative p-8 rounded-2xl border border-white/10 bg-background/50 backdrop-blur">
                <h3 className="text-xl font-semibold mb-4">Ideal für</h3>
                <div className="grid gap-3">
                  {idealFor.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Layers className="w-5 h-5 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
              Unser Prozess
            </h2>
            <p className="text-muted-foreground mt-4">Von der Idee bis zur fertigen Website</p>
          </div>
          
          <div 
            ref={processRef}
            className={cn(
              "grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000",
              processRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {process.map((step, index) => (
              <div key={index} className="text-center" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-foreground" />
                </div>
                <span className="text-sm text-primary font-medium mb-2 block">Schritt {index + 1}</span>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Bereit für Ihre Website?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Lassen Sie uns gemeinsam Ihren individuellen Webauftritt gestalten. 
                Kostenloses Erstgespräch – unverbindlich und persönlich.
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Jetzt Projekt starten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
