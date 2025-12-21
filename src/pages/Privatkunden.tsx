import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Monitor, Wrench, HardDrive, Shield, Wifi, Laptop, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import privatkundenHero from "@/assets/privatkunden-hero.png";
import serviceRepair from "@/assets/service-repair.png";

const services = [
  {
    icon: Monitor,
    title: "PC & Laptop Reparatur",
    description: "Schnelle Diagnose und professionelle Reparatur aller gängigen Marken und Modelle.",
    features: ["Hardware-Diagnose", "Display-Austausch", "Tastatur-Reparatur", "Akku-Wechsel"]
  },
  {
    icon: HardDrive,
    title: "Datenrettung",
    description: "Professionelle Wiederherstellung Ihrer wertvollen Daten von defekten Speichermedien.",
    features: ["Festplatten-Recovery", "SSD-Datenrettung", "USB-Stick Rettung", "Backup-Lösungen"]
  },
  {
    icon: Shield,
    title: "Virenentfernung",
    description: "Gründliche Entfernung von Schadsoftware und Einrichtung eines effektiven Schutzes.",
    features: ["Malware-Entfernung", "Ransomware-Hilfe", "Sicherheits-Setup", "Präventions-Beratung"]
  },
  {
    icon: Wrench,
    title: "PC-Aufrüstung",
    description: "Mehr Leistung für Ihren Computer durch gezielte Hardware-Upgrades.",
    features: ["RAM-Erweiterung", "SSD-Upgrade", "Grafikkarten-Einbau", "Prozessor-Wechsel"]
  },
  {
    icon: Wifi,
    title: "Netzwerk & WLAN",
    description: "Einrichtung und Optimierung Ihres Heimnetzwerks für beste Verbindung.",
    features: ["Router-Setup", "WLAN-Optimierung", "Netzwerk-Sicherheit", "Smart Home Integration"]
  },
  {
    icon: Laptop,
    title: "Leih-PC Service",
    description: "Während Ihr Gerät repariert wird, arbeiten Sie einfach mit unserem Leihgerät weiter.",
    features: ["Kostenloser Leih-PC", "Datenübertragung", "Schnelle Verfügbarkeit", "Keine Ausfallzeit"],
    highlight: true
  }
];

const benefits = [
  "Persönliche Beratung vor Ort",
  "Transparente Festpreise",
  "Kostenloser Leih-PC während der Reparatur",
  "Keine versteckten Kosten",
  "Schnelle Bearbeitung",
  "Hausbesuch möglich"
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, isRevealed } = useScrollReveal();
  
  return (
    <div 
      ref={ref}
      className={cn(
        "group relative py-8 transition-all duration-700",
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="flex items-start gap-6">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
          service.highlight 
            ? "bg-primary/20 text-primary" 
            : "bg-white/5 text-foreground group-hover:bg-white/10"
        )}>
          <service.icon className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
            {service.highlight && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                USP
              </span>
            )}
          </div>
          <p className="text-muted-foreground mb-4">{service.description}</p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {service.features.map((feature, idx) => (
              <span key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Privatkunden() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: benefitsRef, isRevealed: benefitsRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={privatkundenHero} 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        
        {/* 3D Scene */}
        <Suspense fallback={null}>
          <Floating3DScene variant="default" className="opacity-40" />
        </Suspense>
        
        {/* Radial light */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-32 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-6 block">
              Für Privatpersonen
            </span>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-Service für{" "}
              <span className="gradient-text">Ihr Zuhause</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Professionelle Hilfe bei allen Computer-Problemen. Persönlich, zuverlässig und mit 
              kostenlosem Leih-PC während der Reparatur.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Termin vereinbaren
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

      {/* Services Section */}
      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="container-tight relative">
          <div className="mb-16">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Leistungen
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Unsere Services für Sie
            </h2>
          </div>

          <div>
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        
        <div className="container-tight relative">
          <div className="divider-glow mb-20" />
          
          <div 
            ref={benefitsRef}
            className={cn(
              "grid lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000",
              benefitsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div>
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Vorteile
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Warum Privatkunden uns{" "}
                <span className="gradient-text">vertrauen</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wir verstehen, dass Ihr Computer ein wichtiger Teil Ihres Alltags ist. 
                Deshalb bieten wir schnellen, zuverlässigen Service ohne kompliziertes Fachchinesisch.
              </p>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leih-PC Highlight */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            
            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm text-primary tracking-widest uppercase mb-4 block">
                  Einzigartig
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Leih-PC inklusive
                </h2>
                <p className="text-muted-foreground text-lg">
                  Arbeiten Sie während der Reparatur einfach mit unserem Leihgerät weiter. 
                  Kostenlos und unkompliziert.
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <Laptop className="w-32 h-32 text-primary" />
                  <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                    0€
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-20" />
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Bereit für professionelle IT-Hilfe?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Kontaktieren Sie uns noch heute für eine kostenlose Erstberatung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Kostenloses Erstgespräch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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
    </Layout>
  );
}
