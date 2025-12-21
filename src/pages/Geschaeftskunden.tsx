import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Server, Shield, Headphones, Globe, Laptop, ChevronRight, CheckCircle2, Phone, Clock, Users } from "lucide-react";

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

export default function Geschaeftskunden() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-900 via-tech-800 to-primary/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Für Unternehmen</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              IT-Lösungen für{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tech-400">
                Ihr Unternehmen
              </span>
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Professionelle IT-Betreuung für kleine und mittlere Unternehmen in der Region. 
              Persönlich, zuverlässig und immer erreichbar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/kontakt">
                  Beratungsgespräch vereinbaren
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <a href="tel:+4915678123456">
                  <Phone className="mr-2 h-5 w-5" />
                  Jetzt anrufen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Unsere Leistungen für Unternehmen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Von der IT-Infrastruktur bis zum täglichen Support – wir sind Ihr zuverlässiger IT-Partner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ihre Vorteile mit{" "}
              <span className="text-primary">Petasync</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wir verstehen die Herausforderungen kleiner und mittlerer Unternehmen und bieten passgenaue Lösungen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-card border border-border">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  <advantage.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leih-PC Highlight */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-tech-500/10 border border-primary/20 p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                  Unser USP
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Leih-PC Service für Unternehmen
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Kein Produktivitätsverlust durch defekte Hardware: Wir stellen Ihren Mitarbeitern 
                  während der Reparatur Leihgeräte zur Verfügung – inklusive Datenübertragung.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Sofortige Verfügbarkeit von Ersatzgeräten",
                    "Professionelle Datenübertragung",
                    "Keine Unterbrechung der Geschäftsprozesse",
                    "Im Wartungsvertrag oft inklusive"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/kontakt">
                    Mehr erfahren
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-tech-500/20 flex items-center justify-center">
                    <Laptop className="w-32 h-32 text-primary" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    24h
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-tech-900 via-tech-800 to-primary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Lassen Sie uns über Ihre IT sprechen
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Unverbindliches Beratungsgespräch – wir analysieren Ihren Bedarf und erstellen ein maßgeschneidertes Angebot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/kontakt">
                Kostenlose Erstberatung
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <a href="mailto:info@petasync.de">
                E-Mail schreiben
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
