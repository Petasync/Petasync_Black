import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, ArrowRight, Phone, Server, Shield, Headphones, Users, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";

const services = [
  {
    icon: Server,
    title: "IT-Infrastruktur",
    description: "Server, Netzwerk, Cloud – wir planen und betreuen Ihre gesamte IT.",
    features: ["Server-Management", "Cloud-Migration", "Netzwerk-Design"],
  },
  {
    icon: Shield,
    title: "IT-Sicherheit",
    description: "Umfassender Schutz für Ihre Unternehmensdaten.",
    features: ["Firewall", "Endpoint-Security", "Backup-Lösungen"],
  },
  {
    icon: Headphones,
    title: "IT-Support",
    description: "Zuverlässiger Support – vor Ort oder remote.",
    features: ["Helpdesk", "Wartungsverträge", "24/7 Notfall-Service"],
  },
  {
    icon: Users,
    title: "Beratung",
    description: "Strategische IT-Beratung für Ihr Wachstum.",
    features: ["Digitalisierung", "Prozessoptimierung", "IT-Strategie"],
  },
];

const benefits = [
  "Persönlicher Ansprechpartner",
  "Flexible Wartungsverträge",
  "Kurze Reaktionszeiten",
  "Transparente Kosten",
  "Leih-PC Service inklusive",
  "Regionale Nähe",
];

export default function ITBusiness() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: benefitsRef, isRevealed: benefitsRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        
        <Suspense fallback={null}>
          <Floating3DScene variant="dense" className="opacity-30" />
        </Suspense>
        
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-32 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-sm text-foreground">Geschäftskunden</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              IT für{" "}
              <span className="gradient-text">Unternehmen</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Professionelle IT-Betreuung für Ihr Unternehmen. Von der Infrastruktur 
              bis zum Support – alles aus einer Hand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Beratungsgespräch
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
                className="group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <service.icon className="w-7 h-7 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
                <div className="ml-20 flex flex-wrap gap-3">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 rounded-full bg-white/5 text-muted-foreground">
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
          
          <div 
            ref={benefitsRef}
            className={cn(
              "grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000",
              benefitsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Warum Unternehmen{" "}
                <span className="gradient-text">PetaSync wählen</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Als regionaler IT-Partner verstehen wir die Anforderungen lokaler Unternehmen 
                und bieten persönlichen Service statt anonymer Hotlines.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 py-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-tight text-center">
          <Building2 className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold gradient-text mb-6">
            Ihr IT-Partner in der Region
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Lassen Sie uns über die IT-Anforderungen Ihres Unternehmens sprechen.
          </p>
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
            <Link to="/kontakt">
              Kostenloses Erstgespräch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
