import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Check, ArrowRight, Infinity, ShoppingCart, Plug, Gauge, HeadphonesIcon, Code2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const features = [
  "Komplett individuelles Design & Entwicklung",
  "Unbegrenzte Seitenzahl",
  "E-Commerce / Online-Shop möglich",
  "Premium SEO-Paket mit Strategie",
  "Maximale Performance-Optimierung",
  "API-Integrationen nach Bedarf",
  "Multi-Sprach-Unterstützung möglich",
  "Custom Funktionen & Features",
  "12 Monate Premium-Support",
  "Monatliche Wartung & Updates",
  "Hosting-Management inklusive",
  "Priorisierter Support-Kanal"
];

const capabilities = [
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Vollwertiger Online-Shop mit Zahlungsintegration, Warenwirtschaft und Bestellverwaltung."
  },
  {
    icon: Plug,
    title: "API-Integrationen",
    description: "Anbindung an CRM, ERP, Buchhaltung oder andere Systeme Ihres Unternehmens."
  },
  {
    icon: Gauge,
    title: "Performance",
    description: "Optimierung für maximale Geschwindigkeit und beste Google-Bewertungen."
  },
  {
    icon: Code2,
    title: "Custom Features",
    description: "Individuelle Funktionen wie Buchungssysteme, Kundenportale oder Konfiguratoren."
  },
  {
    icon: HeadphonesIcon,
    title: "12 Monate Support",
    description: "Priorisierter Support mit schnellen Reaktionszeiten und direktem Ansprechpartner."
  },
  {
    icon: Infinity,
    title: "Unbegrenzt",
    description: "Keine Limits bei Seiten, Funktionen oder Erweiterungen – alles ist möglich."
  }
];

export default function WebsiteEnterprise() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: capabilitiesRef, isRevealed: capabilitiesRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-background" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-24 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm text-accent bg-accent/20 px-3 py-1 rounded-full mb-6">
              <Crown className="w-4 h-4" />
              Premium Solution
            </span>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-[1.1]">
              Website{" "}
              <span className="gradient-text">Enterprise</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Maßgeschneiderte Lösungen für anspruchsvolle Projekte. E-Commerce, 
              individuelle Funktionen, API-Integrationen – alles ist möglich.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Projekt besprechen
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

      {/* Capabilities */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
              Enterprise Möglichkeiten
            </h2>
            <p className="text-muted-foreground mt-4">Alles was Ihr Unternehmen braucht</p>
          </div>
          
          <div 
            ref={capabilitiesRef}
            className={cn(
              "grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000",
              capabilitiesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {capabilities.map((cap, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl border border-white/10 hover:border-accent/20 bg-gradient-to-br from-white/[0.02] to-transparent transition-all"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <cap.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{cap.title}</h3>
                <p className="text-sm text-muted-foreground">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative p-8 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
                <Crown className="w-16 h-16 text-accent mb-6" />
                <h3 className="text-2xl font-bold mb-4">Für anspruchsvolle Projekte</h3>
                <p className="text-muted-foreground mb-6">
                  Das Enterprise-Paket ist für Unternehmen, die keine Kompromisse eingehen. 
                  Individuelle Entwicklung, maximale Flexibilität und langfristiger Support.
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <span className="text-muted-foreground">Typische Projektbeispiele:</span>
                  <div className="flex flex-wrap gap-2">
                    {["Online-Shop", "Kundenportal", "Buchungsplattform", "Konfigurator", "Mitgliederbereich"].map((item, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Leistungsumfang
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Alles im Enterprise-Paket
              </h2>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-primary/5 to-transparent" />
            <div className="absolute inset-0 border border-accent/20 rounded-3xl" />
            
            <div className="relative">
              <Crown className="w-12 h-12 text-accent mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ihr Projekt verdient das Beste
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Lassen Sie uns Ihr Enterprise-Projekt besprechen. 
                Wir erstellen eine individuelle Lösung, die genau zu Ihren Anforderungen passt.
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Projekt besprechen
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
