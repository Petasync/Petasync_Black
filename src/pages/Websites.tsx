import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Palette, 
  Smartphone, 
  Search, 
  Zap, 
  ArrowRight,
  Check,
  Code,
  Layers,
  Rocket
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import websitesHero from "@/assets/websites-hero.png";

const webServices = [
  {
    icon: Globe,
    title: "Professionelle Websites",
    description: "Maßgeschneiderte Webauftritte, die Ihr Unternehmen perfekt repräsentieren und Kunden überzeugen.",
    features: ["Individuelles Design", "Responsive Layout", "CMS Integration", "SSL-Zertifikat"]
  },
  {
    icon: Palette,
    title: "Modernes Webdesign",
    description: "Zeitgemäßes, benutzerfreundliches Design, das Ihre Markenidentität widerspiegelt.",
    features: ["UI/UX Design", "Markenkonformes Design", "Animationen", "Bildbearbeitung"]
  },
  {
    icon: Smartphone,
    title: "Mobile-First Entwicklung",
    description: "Optimale Darstellung auf allen Geräten - vom Smartphone bis zum Desktop.",
    features: ["Responsive Design", "Touch-optimiert", "Schnelle Ladezeiten", "PWA-fähig"]
  },
  {
    icon: Search,
    title: "SEO-Optimierung",
    description: "Bessere Sichtbarkeit bei Google durch professionelle Suchmaschinenoptimierung.",
    features: ["Lokale SEO", "On-Page SEO", "Technisches SEO", "Google My Business"]
  }
];

const packages = [
  {
    name: "Starter",
    description: "Ideal für Selbstständige und kleine Unternehmen",
    features: [
      "Bis zu 5 Seiten",
      "Responsive Design",
      "Kontaktformular",
      "Basis SEO",
      "SSL-Zertifikat",
      "1 Monat Support"
    ],
    highlight: false
  },
  {
    name: "Business",
    description: "Für wachsende Unternehmen mit mehr Anforderungen",
    features: [
      "Bis zu 10 Seiten",
      "Premium Design",
      "CMS (Content Management)",
      "Erweiterte SEO",
      "Google Analytics",
      "Blog-Funktion",
      "3 Monate Support"
    ],
    highlight: true
  },
  {
    name: "Enterprise",
    description: "Individuelle Lösungen für anspruchsvolle Projekte",
    features: [
      "Unbegrenzte Seiten",
      "Individuelles Design",
      "E-Commerce möglich",
      "Premium SEO Paket",
      "Performance-Optimierung",
      "API-Integrationen",
      "12 Monate Support"
    ],
    highlight: false
  }
];

const processSteps = [
  {
    icon: Layers,
    title: "Beratung & Konzept",
    description: "Wir besprechen Ihre Anforderungen und erstellen ein maßgeschneidertes Konzept."
  },
  {
    icon: Palette,
    title: "Design & Entwicklung",
    description: "Ihr Webauftritt wird nach modernsten Standards designt und entwickelt."
  },
  {
    icon: Code,
    title: "Test & Optimierung",
    description: "Umfangreiche Tests auf allen Geräten und Performance-Optimierung."
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description: "Veröffentlichung Ihrer Website und fortlaufender Support."
  }
];

export default function Websites() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: packagesRef, isRevealed: packagesRevealed } = useScrollReveal();
  const { ref: processRef, isRevealed: processRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={websitesHero} 
            alt="" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-32 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-6 block">
              Webdesign & Entwicklung
            </span>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Ihre professionelle{" "}
              <span className="gradient-text">Website</span>{" "}
              aus der Region
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Wir erstellen moderne, schnelle und suchmaschinenoptimierte Websites 
              für Unternehmen in Dietenhofen, Ansbach, Nürnberg und Umgebung.
            </p>
            
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
              <Link to="/kontakt">
                Kostenloses Erstgespräch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding relative">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="container-tight relative">
          <div className="mb-16 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Leistungen
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Unsere Webdesign-Leistungen
            </h2>
          </div>

          <div 
            ref={servicesRef}
            className={cn(
              "grid md:grid-cols-2 gap-8 transition-all duration-1000",
              servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {webServices.map((service, index) => (
              <div
                key={index}
                className="group py-8"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  <service.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {service.features.map((feature, i) => (
                    <span key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-primary" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-20" />
          
          <div className="mb-16 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Pakete
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Website-Pakete
            </h2>
            <p className="text-muted-foreground mt-4">
              Transparente Leistungen – individuelle Preise auf Anfrage.
            </p>
          </div>

          <div 
            ref={packagesRef}
            className={cn(
              "grid md:grid-cols-3 gap-8 transition-all duration-1000",
              packagesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={cn(
                  "relative py-10 px-8 rounded-3xl transition-all",
                  pkg.highlight 
                    ? "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20" 
                    : "border border-white/5 hover:border-white/10"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-8 text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-medium">
                    Beliebt
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {pkg.description}
                </p>
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className={cn(
                    "w-full rounded-full",
                    pkg.highlight 
                      ? "bg-foreground text-background hover:bg-foreground/90" 
                      : "bg-white/5 hover:bg-white/10 border border-white/10"
                  )}
                  asChild
                >
                  <Link to="/kontakt">Anfragen</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding relative">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        
        <div className="container-tight relative">
          <div className="divider-glow mb-20" />
          
          <div className="mb-16 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Prozess
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              So entsteht Ihre Website
            </h2>
          </div>

          <div 
            ref={processRef}
            className={cn(
              "grid sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000",
              processRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
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
              <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Bereit für Ihre neue Website?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Lassen Sie uns gemeinsam Ihren professionellen Webauftritt gestalten. 
                Kostenloses Erstgespräch – unverbindlich und persönlich.
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Jetzt Kontakt aufnehmen
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
