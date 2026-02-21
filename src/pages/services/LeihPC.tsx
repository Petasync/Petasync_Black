import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Laptop, ArrowRight, CheckCircle2, Phone, Clock, Shield, Zap, DollarSign, Monitor, Cpu } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import { RelatedServices } from "@/components/RelatedServices";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";

const benefits = [
  {
    icon: DollarSign,
    title: "Komplett kostenlos",
    description: "Kein Leihgebühr, keine versteckten Kosten.",
  },
  {
    icon: Clock,
    title: "Sofort verfügbar",
    description: "Überbrücken Sie die Reparaturzeit ohne Wartezeit.",
  },
  {
    icon: Zap,
    title: "Schnelle Einrichtung",
    description: "Datenübertragung und Setup inklusive.",
  },
  {
    icon: Shield,
    title: "Sichere Daten",
    description: "Ihre Daten werden nach Rückgabe sicher gelöscht.",
  },
];

const faq = [
  { 
    question: "Wie lange kann ich den Leih-PC behalten?",
    answer: "Sie können den Leih-PC so lange nutzen, wie die Reparatur Ihres Gerätes dauert – ohne zusätzliche Kosten."
  },
  { 
    question: "Welche Geräte stehen zur Verfügung?",
    answer: "Wir haben Laptops und Desktop-PCs mit Windows vorinstalliert. Alle Geräte sind leistungsfähig genug für Office-Arbeiten."
  },
  { 
    question: "Werden meine Daten übertragen?",
    answer: "Ja, auf Wunsch übertragen wir Ihre wichtigsten Daten und richten den Leih-PC so ein, dass Sie sofort weiterarbeiten können."
  },
];

export default function LeihPC() {
  useSEO(SEO_PAGES.leihPc);
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: benefitsRef, isRevealed: benefitsRevealed } = useScrollReveal();
  const { ref: faqRef, isRevealed: faqRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        
        <Suspense fallback={null}>
          <Floating3DScene variant="minimal" className="opacity-30" />
        </Suspense>
        
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-32 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <Link to="/privatkunden" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privatkunden
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm text-foreground">Leih-PC</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
                Leih-PC{" "}
                <span className="gradient-text">Service</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
                Unser einzigartiges Angebot: Arbeiten Sie während der Reparatur einfach mit 
                unserem Leihgerät weiter – komplett kostenlos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt">
                    Leih-PC anfragen
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
            
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <Laptop className="w-64 h-64 text-foreground/10" />
                <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-foreground text-background flex flex-col items-center justify-center font-bold">
                  <span className="text-2xl">0€</span>
                  <span className="text-xs">Leihgebühr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          
          <div 
            ref={benefitsRef}
            className={cn(
              "transition-all duration-1000",
              benefitsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Ihre Vorteile</h2>
              <p className="text-muted-foreground">Keine Ausfallzeit, keine Kosten</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className="text-center"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding relative">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        
        <div className="container-tight relative">
          <div 
            ref={faqRef}
            className={cn(
              "max-w-2xl mx-auto transition-all duration-1000",
              faqRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Häufige Fragen</h2>
            </div>
            
            <div className="space-y-6">
              {faq.map((item, index) => (
                <div key={index} className="py-6 border-b border-white/5 last:border-0">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedServices services={[
        { title: "PC-Reparatur", href: "/services/pc-reparatur", price: "ab 29€", icon: Monitor },
        { title: "PC Zusammenbau", href: "/services/pc-zusammenbau", price: "ab 69€", icon: Cpu },
      ]} />

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-tight text-center">
          <h2 className="text-4xl font-bold gradient-text mb-6">
            Reparatur + Leih-PC anfragen
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Kontaktieren Sie uns für eine kostenlose Beratung.
          </p>
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
            <Link to="/kontakt">
              Kontakt aufnehmen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
