import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Headphones, Check, ArrowRight, MonitorSmartphone, Clock, Users, Wrench, Phone, FileText } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const supportTypes = [
  {
    icon: MonitorSmartphone,
    title: "Remote-Support",
    description: "Schnelle Hilfe per Fernwartung – in den meisten Fällen sind wir in Minuten verbunden.",
    features: ["Sofortige Verfügbarkeit", "Keine Wartezeit", "Bildschirmübertragung", "Sichere Verbindung"]
  },
  {
    icon: Wrench,
    title: "Vor-Ort-Service",
    description: "Wenn Remote nicht reicht: Wir kommen zu Ihnen ins Unternehmen.",
    features: ["Hardware-Probleme", "Netzwerk-Installation", "Server-Wartung", "Geräte-Setup"]
  },
  {
    icon: FileText,
    title: "Wartungsverträge",
    description: "Planbare Kosten und priorisierter Support durch einen Wartungsvertrag.",
    features: ["Monatliche Pauschale", "Priorisierte Bearbeitung", "Proaktive Wartung", "Rabattierte Stunden"]
  },
  {
    icon: Users,
    title: "Helpdesk-Service",
    description: "Ein zentraler Ansprechpartner für alle IT-Fragen Ihrer Mitarbeiter.",
    features: ["Ticket-System", "Dokumentation", "Wissensdatenbank", "Schulungen"]
  }
];

const slaFeatures = [
  { time: "< 4 Std.", label: "Reaktionszeit (Prio 1)", description: "Bei kritischen Ausfällen" },
  { time: "< 8 Std.", label: "Reaktionszeit (Standard)", description: "Normale Anfragen" },
  { time: "Mo-Fr", label: "Erreichbarkeit", description: "8:00 - 18:00 Uhr" },
  { time: "0€", label: "Leih-PC", description: "Bei jeder Reparatur inklusive" }
];

export default function ITSupport() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: typesRef, isRevealed: typesRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
        <Suspense fallback={null}>
          <Floating3DScene variant="minimal" className="opacity-30" />
        </Suspense>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-24 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm text-accent bg-accent/10 px-3 py-1 rounded-full mb-6">
              <Headphones className="w-4 h-4" />
              Immer für Sie da
            </span>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-[1.1]">
              IT-Support{" "}
              <span className="gradient-text">für Ihr Unternehmen</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Zuverlässiger IT-Support, wenn Sie ihn brauchen – per Fernwartung oder vor Ort. 
              Schnell, kompetent und persönlich.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Support anfragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="tel:+491637117198">
                  <Phone className="mr-2 h-4 w-4" />
                  Direkt anrufen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SLA Overview */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {slaFeatures.map((sla, index) => (
              <div key={index} className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="text-3xl font-bold text-primary mb-2">{sla.time}</div>
                <div className="font-semibold mb-1">{sla.label}</div>
                <div className="text-sm text-muted-foreground">{sla.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Types */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
              Unsere Support-Leistungen
            </h2>
          </div>
          
          <div 
            ref={typesRef}
            className={cn(
              "grid md:grid-cols-2 gap-8 transition-all duration-1000",
              typesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {supportTypes.map((type, index) => (
              <div 
                key={index} 
                className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <type.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{type.title}</h3>
                <p className="text-muted-foreground mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.features.map((feature, i) => (
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

      {/* Wartungsvertrag Highlight */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            
            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm text-accent tracking-widest uppercase mb-4 block">
                  Empfohlen
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Wartungsvertrag für Unternehmen
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Planbare IT-Kosten, priorisierter Support und proaktive Wartung – 
                  alles in einem monatlichen Paket.
                </p>
                
                <div className="space-y-3">
                  {[
                    "Monatliche Pauschale statt Überraschungen",
                    "Priorisierte Bearbeitung Ihrer Anfragen",
                    "Regelmäßige Systemprüfungen",
                    "Rabattierte Stundensätze für Zusatzarbeiten",
                    "Persönlicher Ansprechpartner"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <Clock className="w-32 h-32 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text">
              IT-Probleme? Wir helfen!
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Rufen Sie uns an oder schreiben Sie uns – 
              wir finden gemeinsam die beste Lösung für Ihr Unternehmen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Kontakt aufnehmen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="tel:+491637117198">
                  <Phone className="mr-2 h-4 w-4" />
                  +49 163 711 7198
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
