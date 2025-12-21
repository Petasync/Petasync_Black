import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Monitor, Wrench, HardDrive, Shield, Wifi, Laptop, ChevronRight, CheckCircle2, Phone } from "lucide-react";

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

export default function Privatkunden() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-900 via-tech-800 to-primary/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6">
              <Monitor className="w-4 h-4" />
              <span className="text-sm font-medium">Für Privatpersonen</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              IT-Service für{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tech-400">
                Ihr Zuhause
              </span>
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Professionelle Hilfe bei allen Computer-Problemen. Persönlich, zuverlässig und mit 
              kostenlosem Leih-PC während der Reparatur.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/kontakt">
                  Termin vereinbaren
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
              Unsere Services für Sie
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Von der schnellen Reparatur bis zur kompletten Neueinrichtung – wir helfen Ihnen bei allen IT-Fragen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                  service.highlight 
                    ? "bg-gradient-to-br from-primary/10 to-tech-500/10 border-primary/30 hover:border-primary/50" 
                    : "bg-card border-border hover:border-primary/30"
                }`}
              >
                {service.highlight && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Unser USP
                  </div>
                )}
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  service.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                }`}>
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

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Warum Privatkunden uns{" "}
                <span className="text-primary">vertrauen</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Wir verstehen, dass Ihr Computer ein wichtiger Teil Ihres Alltags ist. 
                Deshalb bieten wir schnellen, zuverlässigen Service ohne kompliziertes Fachchinesisch.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-tech-500/20 border border-primary/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <Laptop className="w-24 h-24 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Leih-PC inklusive</h3>
                  <p className="text-muted-foreground">
                    Arbeiten Sie während der Reparatur einfach mit unserem Leihgerät weiter.
                  </p>
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
            Bereit für professionelle IT-Hilfe?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns noch heute für eine kostenlose Erstberatung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/kontakt">
                Kostenloses Erstgespräch
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <a href="https://wa.me/4915678123456" target="_blank" rel="noopener noreferrer">
                WhatsApp schreiben
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
