import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Server, Shield, Headphones, Globe, Laptop, ArrowRight, CheckCircle2, Phone, Clock, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import geschaeftskundenHero from "@/assets/geschaeftskunden-hero.png";

const services = [
  {
    icon: Server,
    title: "IT-Infrastruktur",
    description: "Planung, Einrichtung und Wartung Ihrer gesamten IT-Infrastruktur.",
    features: ["Server-Management", "Netzwerk-Setup", "Cloud-Lösungen", "Backup-Systeme"],
    href: "/services/it-business"
  },
  {
    icon: Shield,
    title: "IT-Sicherheit",
    description: "Umfassender Schutz für Ihre Unternehmensdaten und Systeme.",
    features: ["Firewall-Konfiguration", "Endpoint-Security", "Sicherheits-Audits", "Mitarbeiter-Schulung"],
    href: "/services/it-sicherheit"
  },
  {
    icon: Headphones,
    title: "IT-Support",
    description: "Zuverlässiger Support für Ihr Unternehmen – vor Ort oder remote.",
    features: ["Helpdesk-Service", "Remote-Support", "Vor-Ort-Service", "Wartungsverträge"],
    href: "/services/it-business"
  },
  {
    icon: Globe,
    title: "Webdesign & Hosting",
    description: "Professionelle Websites und zuverlässiges Hosting für Ihr Unternehmen.",
    features: ["Responsive Websites", "SEO-Optimierung", "Managed Hosting", "E-Mail-Lösungen"],
    href: "/websites"
  },
  {
    icon: Laptop,
    title: "Hardware-Service",
    description: "Beschaffung, Einrichtung und Reparatur von Geschäfts-Hardware.",
    features: ["PC-Beschaffung", "Laptop-Reparatur", "Drucker-Service", "Leih-PC Service"],
    href: "/services/pc-reparatur"
  },
  {
    icon: Users,
    title: "Beratung & Planung",
    description: "Strategische IT-Beratung für nachhaltiges Unternehmenswachstum.",
    features: ["IT-Strategie", "Digitalisierung", "Prozessoptimierung", "Kostensenkung"],
    href: "/services/it-business"
  }
];

const advantages = [
  {
    icon: Clock,
    title: "Schnelle Reaktionszeit",
    description: "Bei Störungen sind wir schnell vor Ort oder remote erreichbar."
  },
  {
    icon: Shield,
    title: "Proaktive Wartung",
    description: "Wir erkennen Probleme, bevor sie zu Ausfällen führen."
  },
  {
    icon: Laptop,
    title: "Leih-PC Service",
    description: "Ihre Mitarbeiter arbeiten weiter, während wir Geräte reparieren."
  },
  {
    icon: Building2,
    title: "Lokaler Partner",
    description: "Wir sind in der Region und kennen die Bedürfnisse lokaler Unternehmen."
  }
];

export default function Geschaeftskunden() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: advantagesRef, isRevealed: advantagesRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section - Centered */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={geschaeftskundenHero} 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        
        {/* 3D Scene */}
        <Suspense fallback={null}>
          <Floating3DScene variant="dense" className="opacity-40" />
        </Suspense>
        
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
              Für Unternehmen
            </span>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-Lösungen für{" "}
              <span className="gradient-text">Ihr Unternehmen</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Professionelle IT-Betreuung für kleine und mittlere Unternehmen in der Region. 
              Persönlich, zuverlässig und immer erreichbar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Beratungsgespräch vereinbaren
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

      {/* Services Section - Card Grid */}
      <section className="section-padding relative">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="container-tight relative">
          <div className="mb-16 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Leistungen
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Unsere Leistungen für Unternehmen
            </h2>
          </div>

          <div 
            ref={servicesRef}
            className={cn(
              "grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000",
              servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.href}
                className="group relative p-8 rounded-2xl border border-white/5 hover:border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent transition-all hover:scale-[1.02]"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  <service.icon className="w-6 h-6 text-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 2 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                      +{service.features.length - 2}
                    </span>
                  )}
                </div>
                
                <ArrowRight className="absolute top-8 right-8 w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section - Centered Grid */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        
        <div className="container-tight relative">
          <div className="divider-glow mb-20" />
          
          <div className="mb-16 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Vorteile
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Ihre Vorteile mit{" "}
              <span className="gradient-text">Petasync</span>
            </h2>
          </div>
          
          <div 
            ref={advantagesRef}
            className={cn(
              "grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000",
              advantagesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {advantages.map((advantage, index) => (
              <div 
                key={index} 
                className="text-center group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-5 mx-auto group-hover:bg-white/10 transition-colors">
                  <advantage.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leih-PC Highlight - Alternating */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            
            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 lg:text-right">
                <span className="text-sm text-primary tracking-widest uppercase mb-4 block">
                  Immer inklusive
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Leih-PC Service für Unternehmen
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Kein Produktivitätsverlust durch defekte Hardware: Wir stellen Ihren Mitarbeitern 
                  während der Reparatur Leihgeräte zur Verfügung – inklusive Datenübertragung.
                </p>
                
                <div className="space-y-3">
                  {[
                    "Sofortige Verfügbarkeit von Ersatzgeräten",
                    "Professionelle Datenübertragung",
                    "Keine Unterbrechung der Geschäftsprozesse",
                    "Bei jeder Reparatur inklusive"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 lg:flex-row-reverse">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:order-1 flex justify-center">
                <div className="relative">
                  <Laptop className="w-32 h-32 text-primary" />
                  <div className="absolute -top-2 -right-2 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
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
              Lassen Sie uns über Ihre IT sprechen
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Unverbindliches Beratungsgespräch – wir analysieren Ihren Bedarf und erstellen ein maßgeschneidertes Angebot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Kostenlose Erstberatung
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="mailto:info@petasync.de">
                  E-Mail schreiben
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
