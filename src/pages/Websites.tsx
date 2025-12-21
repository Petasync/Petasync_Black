import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Palette, 
  Smartphone, 
  Search, 
  Zap, 
  Shield, 
  ArrowRight,
  Check,
  Code,
  Layers,
  Rocket
} from "lucide-react";

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

const Websites = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-900/20 via-background to-tech-800/10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-tech-500/10 rounded-full blur-3xl" />
        
        <div className="container-tight relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Webdesign & Entwicklung
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Ihre professionelle <span className="text-gradient">Website</span> aus der Region
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Wir erstellen moderne, schnelle und suchmaschinenoptimierte Websites 
              für Unternehmen in Dietenhofen, Ansbach, Nürnberg und Umgebung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-bg border-0 gap-2" asChild>
                <Link to="/kontakt">
                  Kostenloses Erstgespräch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Unsere <span className="text-gradient">Webdesign-Leistungen</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Von der ersten Idee bis zur fertigen Website – alles aus einer Hand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {webServices.map((service, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl p-8 hover:shadow-tech-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Website-<span className="text-gradient">Pakete</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparente Leistungen – individuelle Preise auf Anfrage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 transition-all duration-300 ${
                  pkg.highlight 
                    ? "gradient-bg text-primary-foreground scale-105 shadow-glow" 
                    : "glass-strong hover:shadow-tech-lg"
                }`}
              >
                <h3 className="text-2xl font-display font-bold mb-2">{pkg.name}</h3>
                <p className={`text-sm mb-6 ${pkg.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 ${pkg.highlight ? "text-primary-foreground" : "text-primary"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${pkg.highlight ? "bg-background text-foreground hover:bg-background/90" : ""}`}
                  variant={pkg.highlight ? "secondary" : "default"}
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
      <section className="py-20 bg-muted/30">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              So entsteht Ihre <span className="text-gradient">Website</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-sm text-primary font-medium mb-2">Schritt {index + 1}</div>
                <h3 className="text-lg font-display font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-tight">
          <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
            <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Bereit für Ihre neue Website?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Lassen Sie uns gemeinsam Ihren professionellen Webauftritt gestalten. 
              Kostenloses Erstgespräch – unverbindlich und persönlich.
            </p>
            <Button size="lg" className="gradient-bg border-0 gap-2" asChild>
              <Link to="/kontakt">
                Jetzt Kontakt aufnehmen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Websites;
