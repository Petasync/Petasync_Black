import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, ArrowRight, Phone, Lock, Eye, AlertTriangle, FileCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const services = [
  {
    icon: AlertTriangle,
    title: "Virenentfernung",
    description: "Gründliche Entfernung von Viren, Trojanern und anderer Schadsoftware.",
  },
  {
    icon: Lock,
    title: "Firewall-Setup",
    description: "Einrichtung und Konfiguration von Firewalls für optimalen Schutz.",
  },
  {
    icon: Eye,
    title: "Sicherheits-Check",
    description: "Umfassende Analyse Ihrer Systeme auf Sicherheitslücken.",
  },
  {
    icon: FileCheck,
    title: "Backup-Lösungen",
    description: "Sichere Datensicherung, damit nichts verloren geht.",
  },
];

const threats = [
  "Ransomware & Erpressungstrojaner",
  "Phishing & Social Engineering",
  "Datenlecks & Identitätsdiebstahl",
  "Veraltete Software & Sicherheitslücken",
];

export default function ITSicherheit() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: threatsRef, isRevealed: threatsRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        
        <Suspense fallback={null}>
          <Floating3DScene variant="dense" className="opacity-30" />
        </Suspense>
        
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-32 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <Link to="/privatkunden" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privatkunden
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">IT-Sicherheit</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-{" "}
              <span className="gradient-text">Sicherheit</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Schützen Sie Ihre Daten und Geräte vor Cyber-Bedrohungen. 
              Virenentfernung, Firewall-Setup und umfassende Sicherheitslösungen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Sicherheits-Check anfragen
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

      {/* Services */}
      <section className="section-padding relative">
        <div 
          ref={servicesRef}
          className={cn(
            "container-tight transition-all duration-1000",
            servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="flex items-start gap-6"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threats */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          
          <div 
            ref={threatsRef}
            className={cn(
              "grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000",
              threatsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Schutz vor{" "}
                <span className="gradient-text">Bedrohungen</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Cyber-Bedrohungen werden immer ausgefeilter. Wir helfen Ihnen, 
                Ihre Geräte und Daten effektiv zu schützen.
              </p>
            </div>
            
            <div className="space-y-4">
              {threats.map((threat, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0"
                >
                  <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{threat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-tight text-center">
          <h2 className="text-4xl font-bold gradient-text mb-6">
            Jetzt Sicherheit erhöhen
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Lassen Sie Ihre Systeme von unseren Experten prüfen.
          </p>
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
            <Link to="/kontakt">
              Beratung anfragen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
