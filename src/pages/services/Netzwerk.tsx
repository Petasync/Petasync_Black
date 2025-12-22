import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wifi, ArrowRight, Phone, Router, Signal, Home, Settings } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const services = [
  {
    icon: Router,
    title: "Router-Einrichtung",
    description: "Professionelle Konfiguration Ihres Routers für optimale Leistung und Sicherheit.",
  },
  {
    icon: Signal,
    title: "WLAN-Optimierung",
    description: "Analyse und Verbesserung der WLAN-Abdeckung in Ihrem Zuhause oder Büro.",
  },
  {
    icon: Home,
    title: "Smart Home",
    description: "Integration und Vernetzung Ihrer Smart-Home-Geräte.",
  },
  {
    icon: Settings,
    title: "Netzwerk-Sicherheit",
    description: "Absicherung Ihres Netzwerks gegen unbefugten Zugriff.",
  },
];

const problems = [
  { problem: "Langsames WLAN", solution: "Kanaloptimierung & Mesh-Systeme" },
  { problem: "Verbindungsabbrüche", solution: "Stabile Konfiguration & Hardware-Check" },
  { problem: "Schlechte Reichweite", solution: "Repeater oder Mesh-System" },
  { problem: "Unsicheres Netzwerk", solution: "WPA3 & Gastnetzwerk" },
];

export default function Netzwerk() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: problemsRef, isRevealed: problemsRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        
        <Suspense fallback={null}>
          <Floating3DScene variant="default" className="opacity-30" />
        </Suspense>
        
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
        
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
              <span className="text-sm text-foreground">Netzwerk</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Netzwerk &{" "}
              <span className="gradient-text">WLAN</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Stabiles Internet in jedem Winkel. Router-Einrichtung, WLAN-Optimierung 
              und Smart-Home-Integration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Beratung anfragen
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
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="group py-8 border-b border-white/5"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <service.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems & Solutions */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          
          <div 
            ref={problemsRef}
            className={cn(
              "transition-all duration-1000",
              problemsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Typische Probleme – Unsere Lösungen</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {problems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-6 py-6 px-6 rounded-2xl bg-white/[0.02] border border-white/5"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-20 text-center">
                    <Wifi className="w-8 h-8 text-primary mx-auto mb-2" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Problem</p>
                    <p className="text-foreground font-medium mb-2">{item.problem}</p>
                    <p className="text-sm text-muted-foreground mb-1">Lösung</p>
                    <p className="text-primary">{item.solution}</p>
                  </div>
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
            Stabiles WLAN für Ihr Zuhause
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Wir analysieren und optimieren Ihr Netzwerk.
          </p>
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
            <Link to="/kontakt">
              Termin vereinbaren
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
