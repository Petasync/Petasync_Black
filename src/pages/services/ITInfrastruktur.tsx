import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Server, Check, ArrowRight, Cloud, Database, Network, HardDrive, Shield, Cog } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const services = [
  {
    icon: Server,
    title: "Server-Management",
    description: "Installation, Konfiguration und Wartung Ihrer Server – vor Ort oder in der Cloud.",
    features: ["Windows & Linux Server", "Virtualisierung", "Server-Monitoring", "Updates & Patches"]
  },
  {
    icon: Network,
    title: "Netzwerk-Setup",
    description: "Professionelle Netzwerkinfrastruktur für reibungslosen Datenaustausch.",
    features: ["Strukturierte Verkabelung", "WLAN-Ausleuchtung", "VPN-Lösungen", "Firewall-Konfiguration"]
  },
  {
    icon: Cloud,
    title: "Cloud-Lösungen",
    description: "Migration und Management Ihrer IT in die Cloud – flexibel und skalierbar.",
    features: ["Microsoft 365", "Azure & AWS", "Cloud-Backup", "Hybrid Cloud"]
  },
  {
    icon: Database,
    title: "Backup & Recovery",
    description: "Zuverlässige Datensicherung und schnelle Wiederherstellung im Ernstfall.",
    features: ["Automatische Backups", "Offsite-Sicherung", "Disaster Recovery", "Datenrettung"]
  }
];

const benefits = [
  "Keine teuren IT-Abteilung nötig",
  "Fixkosten statt Überraschungen",
  "Proaktive Wartung & Monitoring",
  "Schnelle Reaktionszeiten",
  "Lokaler Ansprechpartner",
  "Leih-PC bei Reparaturen inklusive"
];

export default function ITInfrastruktur() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();

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
              <Server className="w-4 h-4" />
              Für Unternehmen
            </span>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-[1.1]">
              IT-Infrastruktur{" "}
              <span className="gradient-text">für Ihr Unternehmen</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Planung, Einrichtung und Wartung Ihrer gesamten IT-Infrastruktur – 
              Server, Netzwerk, Cloud und Backup aus einer Hand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Beratung anfragen
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

      {/* Services */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
              Unsere Infrastruktur-Leistungen
            </h2>
          </div>
          
          <div 
            ref={servicesRef}
            className={cn(
              "grid md:grid-cols-2 gap-8 transition-all duration-1000",
              servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {services.map((service, index) => (
              <div 
                key={index} 
                className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
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

      {/* Benefits */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ihre Vorteile mit{" "}
                <span className="gradient-text">Petasync</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Wir kümmern uns um Ihre IT, damit Sie sich auf Ihr Kerngeschäft konzentrieren können.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl" />
              <div className="relative p-8 rounded-2xl border border-white/10 bg-background/50 backdrop-blur text-center">
                <Cog className="w-20 h-20 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Managed IT Services</h3>
                <p className="text-muted-foreground">
                  Von der Planung über die Installation bis zur Wartung – 
                  wir betreuen Ihre IT-Infrastruktur vollständig und proaktiv.
                </p>
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
                IT-Check für Ihr Unternehmen
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Wir analysieren Ihre aktuelle IT-Situation und zeigen Optimierungspotenziale auf – 
                kostenlos und unverbindlich.
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Kostenlosen IT-Check anfragen
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
