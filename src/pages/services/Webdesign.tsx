import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, ArrowRight, Phone, Palette, Code, Search, Smartphone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const services = [
  {
    icon: Palette,
    title: "Design",
    description: "Modernes, individuelles Design das zu Ihrer Marke passt.",
  },
  {
    icon: Code,
    title: "Entwicklung",
    description: "Schnelle, sichere Websites mit modernster Technologie.",
  },
  {
    icon: Smartphone,
    title: "Responsive",
    description: "Perfekte Darstellung auf allen Geräten.",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Optimiert für Google und bessere Sichtbarkeit.",
  },
];

const packages = [
  {
    name: "Visitenkarte",
    description: "Die perfekte Einstiegslösung",
    features: ["1-5 Seiten", "Responsive Design", "Kontaktformular", "SEO-Basics"],
  },
  {
    name: "Business",
    description: "Für wachsende Unternehmen",
    features: ["5-15 Seiten", "CMS-System", "Blog-Funktion", "Google Analytics"],
    highlight: true,
  },
  {
    name: "Shop",
    description: "Verkaufen Sie online",
    features: ["E-Commerce", "Zahlungsintegration", "Produktverwaltung", "Bestellsystem"],
  },
];

export default function Webdesign() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: packagesRef, isRevealed: packagesRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        
        <Suspense fallback={null}>
          <Floating3DScene variant="default" className="opacity-30" />
        </Suspense>
        
        <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-32 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-sm text-foreground">Services</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">Webdesign</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Web{" "}
              <span className="gradient-text">design</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Moderne, schnelle Websites die Kunden überzeugen. 
              Von der Visitenkarte bis zum Online-Shop.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Projekt anfragen
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          
          <div 
            ref={packagesRef}
            className={cn(
              "transition-all duration-1000",
              packagesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Unsere Pakete</h2>
              <p className="text-muted-foreground">Für jeden Bedarf die passende Lösung</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div 
                  key={pkg.name}
                  className={cn(
                    "relative p-8 rounded-2xl transition-all",
                    pkg.highlight 
                      ? "bg-white/[0.03] border border-white/10" 
                      : "bg-transparent"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-foreground text-background text-xs font-medium rounded-full">
                      Beliebt
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-muted-foreground mb-6">{pkg.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={pkg.highlight ? "default" : "outline"} 
                    className={cn(
                      "w-full rounded-full",
                      pkg.highlight 
                        ? "bg-foreground text-background hover:bg-foreground/90" 
                        : "border-white/20 hover:bg-white/5"
                    )}
                    asChild
                  >
                    <Link to="/kontakt">Anfragen</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-tight text-center">
          <Globe className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold gradient-text mb-6">
            Ihre neue Website wartet
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Lassen Sie uns über Ihr Webprojekt sprechen.
          </p>
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
            <Link to="/kontakt">
              Kostenlose Beratung
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
