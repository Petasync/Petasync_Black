import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Server, Shield, Headphones, Globe, Laptop, ArrowRight, CheckCircle2, Phone, Clock, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import geschaeftskundenHero from "@/assets/geschaeftskunden-hero.png";

const services = [
  {
    icon: Server,
    title: "IT-Infrastruktur",
    description: "Planung, Einrichtung und Wartung Ihrer gesamten IT-Infrastruktur.",
    features: ["Server-Management", "Netzwerk-Setup", "Cloud-Lösungen", "Backup-Systeme"]
  },
  {
    icon: Shield,
    title: "IT-Sicherheit",
    description: "Umfassender Schutz für Ihre Unternehmensdaten und Systeme.",
    features: ["Firewall-Konfiguration", "Endpoint-Security", "Sicherheits-Audits", "Mitarbeiter-Schulung"]
  },
  {
    icon: Headphones,
    title: "IT-Support",
    description: "Zuverlässiger Support für Ihr Unternehmen – vor Ort oder remote.",
    features: ["Helpdesk-Service", "Remote-Support", "Vor-Ort-Service", "Wartungsverträge"]
  },
  {
    icon: Globe,
    title: "Webdesign & Hosting",
    description: "Professionelle Websites und zuverlässiges Hosting für Ihr Unternehmen.",
    features: ["Responsive Websites", "SEO-Optimierung", "Managed Hosting", "E-Mail-Lösungen"]
  },
  {
    icon: Laptop,
    title: "Hardware-Service",
    description: "Beschaffung, Einrichtung und Reparatur von Geschäfts-Hardware.",
    features: ["PC-Beschaffung", "Laptop-Reparatur", "Drucker-Service", "Leih-PC Service"]
  },
  {
    icon: Users,
    title: "Beratung & Planung",
    description: "Strategische IT-Beratung für nachhaltiges Unternehmenswachstum.",
    features: ["IT-Strategie", "Digitalisierung", "Prozessoptimierung", "Kostensenkung"]
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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="flex items-start gap-6">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
          <service.icon className="w-6 h-6 text-foreground" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
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

export default function Geschaeftskunden() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: advantagesRef, isRevealed: advantagesRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={geschaeftskundenHero} 
            alt="" 
            className="w-full h-full object-cover opacity-40"
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
          <div className="max-w-3xl">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-6 block">
              Für Unternehmen
            </span>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT-Lösungen für{" "}
              <span className="gradient-text">Ihr Unternehmen</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Professionelle IT-Betreuung für kleine und mittlere Unternehmen in der Region. 
              Persönlich, zuverlässig und immer erreichbar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Services Section */}
      <section className="section-padding relative">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="container-tight relative">
          <div className="mb-16">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Leistungen
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Unsere Leistungen für Unternehmen
            </h2>
          </div>

          <div>
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        
        <div className="container-tight relative">
          <div className="divider-glow mb-20" />
          
          <div className="mb-16">
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
                className="group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
                  <advantage.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{advantage.description}</p>
              </div>
            ))}
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
                  Unser USP
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
                    "Im Wartungsvertrag oft inklusive"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <Laptop className="w-32 h-32 text-primary" />
                  <div className="absolute -top-2 -right-2 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                    24h
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
