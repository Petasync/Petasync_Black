import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Monitor, Wrench, HardDrive, Shield, Wifi, Laptop, ArrowRight, CheckCircle2, Phone, Cpu, Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import privatkundenHero from "@/assets/privatkunden-hero.png";

const services = [
  {
    icon: Monitor,
    title: "PC & Laptop Reparatur",
    description: "Schnelle Diagnose und professionelle Reparatur aller gängigen Marken und Modelle.",
    features: ["Hardware-Diagnose", "Display-Austausch", "Tastatur-Reparatur", "Akku-Wechsel"],
    href: "/services/pc-reparatur"
  },
  {
    icon: HardDrive,
    title: "Datenrettung",
    description: "Professionelle Wiederherstellung Ihrer wertvollen Daten von defekten Speichermedien.",
    features: ["Festplatten-Recovery", "SSD-Datenrettung", "USB-Stick Rettung", "Backup-Lösungen"],
    href: "/services/pc-reparatur"
  },
  {
    icon: Shield,
    title: "Virenentfernung & IT-Sicherheit",
    description: "Gründliche Entfernung von Schadsoftware und Einrichtung eines effektiven Schutzes.",
    features: ["Malware-Entfernung", "Ransomware-Hilfe", "Sicherheits-Setup", "Präventions-Beratung"],
    href: "/services/it-sicherheit"
  },
  {
    icon: Wrench,
    title: "PC-Aufrüstung",
    description: "Mehr Leistung für Ihren Computer durch gezielte Hardware-Upgrades.",
    features: ["RAM-Erweiterung", "SSD-Upgrade", "Grafikkarten-Einbau", "Prozessor-Wechsel"],
    href: "/services/pc-reparatur"
  },
  {
    icon: Wifi,
    title: "Netzwerk & WLAN",
    description: "Einrichtung und Optimierung Ihres Heimnetzwerks für beste Verbindung.",
    features: ["Router-Setup", "WLAN-Optimierung", "Netzwerk-Sicherheit", "Smart Home Integration"],
    href: "/services/netzwerk"
  },
  {
    icon: Cpu,
    title: "PC Zusammenbau",
    description: "Wir bauen Ihren Wunsch-PC nach Ihren Anforderungen zusammen – ob Gaming, Office oder Workstation.",
    features: ["Individuelle Konfiguration", "Qualitäts-Komponenten", "Windows-Installation", "Garantie auf Arbeit"],
    href: "/services/pc-reparatur",
    price: "ab 79€"
  },
  {
    icon: Search,
    title: "Diagnose",
    description: "Professionelle Fehleranalyse Ihres Computers – wir finden das Problem schnell und zuverlässig.",
    features: ["Hardware-Check", "Software-Analyse", "Fehlerprotokoll", "Reparatur-Empfehlung"],
    href: "/services/pc-reparatur",
    highlight: true,
    price: "Kostenlos bei Auftrag"
  },
  {
    icon: Laptop,
    title: "Leih-PC Service",
    description: "Während Ihr Gerät repariert wird, arbeiten Sie einfach mit unserem Leihgerät weiter.",
    features: ["Kostenloser Leih-PC", "Datenübertragung", "Schnelle Verfügbarkeit", "Keine Ausfallzeit"],
    href: "/services/leih-pc",
    highlight: true
  }
];

const benefits = [
  "Persönliche Beratung vor Ort",
  "Transparente Festpreise",
  "Kostenloser Leih-PC bei jeder Reparatur",
  "Keine versteckten Kosten",
  "Schnelle Bearbeitung",
  "Hausbesuch möglich"
];

export default function Privatkunden() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
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
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-6 block">
              Für Privatpersonen
            </span>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-Service für{" "}
              <span className="gradient-text">Ihr Zuhause</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Professionelle Hilfe bei allen Computer-Problemen. Persönlich, zuverlässig und mit 
              kostenlosem Leih-PC während jeder Reparatur.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      {/* Services Section - Alternating Layout */}
      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="container-tight relative">
          <div className="mb-16 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Leistungen
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Unsere Services für Sie
            </h2>
          </div>

          <div 
            ref={servicesRef}
            className={cn(
              "space-y-24 transition-all duration-1000",
              servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {services.map((service, index) => (
              <div 
                key={index}
                className={cn(
                  "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center",
                  index % 2 === 1 && "lg:flex-row-reverse"
                )}
              >
                {/* Content - alternates sides */}
                <div className={cn(index % 2 === 1 && "lg:order-2")}>
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                    service.highlight 
                      ? "bg-primary/20 text-primary" 
                      : "bg-white/5 text-foreground"
                  )}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{service.title}</h3>
                    {service.price && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-medium">
                        {service.price}
                      </span>
                    )}
                    {service.highlight && !service.price && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                        Inklusive
                      </span>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground group" asChild>
                    <Link to={service.href}>
                      Mehr erfahren
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>

                {/* Visual element */}
                <div className={cn(
                  "relative aspect-square max-w-md mx-auto lg:max-w-none",
                  index % 2 === 1 && "lg:order-1"
                )}>
                  <div className={cn(
                    "absolute inset-0 rounded-3xl",
                    service.highlight 
                      ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20" 
                      : "bg-gradient-to-br from-white/5 to-transparent border border-white/5"
                  )} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <service.icon className={cn(
                      "w-24 h-24",
                      service.highlight ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Right aligned */}
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
            <div className="lg:order-2 text-right">
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
            
            <div className="lg:order-1 space-y-4">
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

      {/* CTA Section - Centered */}
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
