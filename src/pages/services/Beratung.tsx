import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Check, ArrowRight, Lightbulb, TrendingUp, Target, Workflow, BarChart3, Coins } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const consultingPackages = [
  {
    name: "IT-Strategie Workshop",
    price: "499€/Tag",
    description: "Ganztägiger Workshop",
    features: ["Ist-Analyse", "Zieldefinition", "Maßnahmenplanung", "Schriftliche Roadmap"]
  },
  {
    name: "Digitalisierungs-Beratung",
    price: "89€/h",
    description: "Stundenweise Beratung",
    features: ["Prozessanalyse", "Software-Auswahl", "Digitale Transformation", "Change Management"]
  },
  {
    name: "Security-Audit",
    price: "ab 799€",
    description: "Sicherheitsanalyse",
    features: ["Schwachstellen-Analyse", "Penetration-Test", "Sicherheits-Report", "Handlungsempfehlungen"]
  },
  {
    name: "DSGVO-Beratung",
    price: "ab 599€",
    description: "Datenschutz-Compliance",
    features: ["DSGVO-Check", "Dokumentation", "Prozesse anpassen", "Mitarbeiter-Schulung"]
  }
];

const consultingAreas = [
  {
    icon: Target,
    title: "IT-Strategie",
    description: "Entwicklung einer IT-Roadmap, die Ihre Geschäftsziele unterstützt.",
    features: ["Ist-Analyse", "Zieldefinition", "Maßnahmenplanung", "Umsetzungsbegleitung"],
    price: "499€/Tag"
  },
  {
    icon: Workflow,
    title: "Digitalisierung",
    description: "Optimierung Ihrer Geschäftsprozesse durch moderne IT-Lösungen.",
    features: ["Prozessanalyse", "Software-Auswahl", "Schnittstellen", "Change Management"],
    price: "89€/h"
  },
  {
    icon: Coins,
    title: "Kostensenkung",
    description: "Identifikation von Einsparpotenzialen in Ihrer IT-Landschaft.",
    features: ["Lizenzoptimierung", "Cloud-Migration", "Konsolidierung", "Outsourcing-Analyse"],
    price: "89€/h"
  },
  {
    icon: BarChart3,
    title: "IT-Audit",
    description: "Umfassende Analyse Ihrer IT-Infrastruktur mit konkreten Handlungsempfehlungen.",
    features: ["Sicherheitscheck", "Performance-Analyse", "Dokumentation", "Priorisierung"],
    price: "ab 799€"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Erstgespräch",
    description: "Wir lernen Ihr Unternehmen und Ihre Herausforderungen kennen."
  },
  {
    step: "02",
    title: "Analyse",
    description: "Wir analysieren Ihre aktuelle IT-Situation und Prozesse."
  },
  {
    step: "03",
    title: "Konzept",
    description: "Wir entwickeln ein maßgeschneidertes Lösungskonzept."
  },
  {
    step: "04",
    title: "Umsetzung",
    description: "Wir begleiten Sie bei der Implementierung und Optimierung."
  }
];

export default function Beratung() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: areasRef, isRevealed: areasRevealed } = useScrollReveal();
  const { ref: processRef, isRevealed: processRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <Suspense fallback={null}>
          <Floating3DScene variant="minimal" className="opacity-30" />
        </Suspense>
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
              <Lightbulb className="w-4 h-4" />
              Strategische Beratung
            </span>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-[1.1]">
              IT-Beratung{" "}
              <span className="gradient-text">& Planung</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Strategische IT-Beratung für nachhaltiges Unternehmenswachstum. 
              Wir helfen Ihnen, die richtigen Entscheidungen für Ihre IT zu treffen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Beratungsgespräch anfragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <Link to="/geschaeftskunden">
                  Alle Business-Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Areas */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
              Beratungsschwerpunkte
            </h2>
          </div>
          
          <div 
            ref={areasRef}
            className={cn(
              "grid md:grid-cols-2 gap-8 transition-all duration-1000",
              areasRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {consultingAreas.map((area, index) => (
              <div 
                key={index} 
                className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <area.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
                <p className="text-muted-foreground mb-4">{area.description}</p>
                <div className="flex flex-wrap gap-2">
                  {area.features.map((feature, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
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
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Unser{" "}
              <span className="gradient-text">Beratungsprozess</span>
            </h2>
          </div>
          
          <div 
            ref={processRef}
            className={cn(
              "grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000",
              processRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="relative text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl font-bold text-white/5 mb-4">{step.step}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl" />
              <div className="relative p-8 rounded-2xl border border-white/10 bg-background/50 backdrop-blur text-center">
                <TrendingUp className="w-20 h-20 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Wachstum durch IT</h3>
                <p className="text-muted-foreground">
                  Die richtige IT-Strategie ist der Schlüssel zu effizienteren Prozessen, 
                  zufriedeneren Mitarbeitern und nachhaltigem Unternehmenswachstum.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Warum{" "}
                <span className="gradient-text">Petasync?</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Als lokaler Partner verstehen wir die Bedürfnisse kleiner und mittlerer Unternehmen.
              </p>
              
              <div className="space-y-4">
                {[
                  "Praxisnahe Beratung ohne Buzzword-Bingo",
                  "Fokus auf umsetzbare Maßnahmen",
                  "Herstellerunabhängige Empfehlungen",
                  "Begleitung von der Idee bis zur Umsetzung",
                  "Verständliche Kommunikation auf Augenhöhe",
                  "Langfristige Partnerschaft statt Einmal-Projekt"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
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
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Lassen Sie uns über Ihre IT sprechen
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Unverbindliches Erstgespräch – wir analysieren gemeinsam Ihre IT-Situation 
                und zeigen Potenziale auf.
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Kostenloses Erstgespräch
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
