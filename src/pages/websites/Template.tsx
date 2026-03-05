import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Check, ArrowRight, Clock, Palette, Globe, Smartphone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";

const features = [
  "Fertige Design-Vorlage aus unserer Sammlung",
  "Ihre Texte & Bilder werden eingesetzt",
  "Bis zu 5 Seiten (Startseite, Über uns, Leistungen, Kontakt, Impressum)",
  "Mobile-optimiert (Responsive Design)",
  "Kontaktformular mit E-Mail-Benachrichtigung",
  "SSL-Zertifikat inklusive",
  "Basis-SEO (Meta-Tags, Seitentitel)",
  "Google Maps Integration",
  "Social Media Links"
];

const process = [
  {
    icon: Palette,
    title: "Template auswählen",
    description: "Wählen Sie aus unserer Sammlung professioneller Templates das passende Design für Ihr Unternehmen."
  },
  {
    icon: FileText,
    title: "Inhalte liefern",
    description: "Sie stellen uns Ihre Texte, Bilder und Logo zur Verfügung. Wir helfen bei der Strukturierung."
  },
  {
    icon: Globe,
    title: "Anpassung & Setup",
    description: "Wir passen das Template mit Ihren Inhalten an und richten alles technisch ein."
  },
  {
    icon: Smartphone,
    title: "Live in 5-7 Tagen",
    description: "Nach Ihrer Freigabe geht Ihre Website online – schneller geht's kaum!"
  }
];

const templates = [
  "Handwerk & Dienstleistung",
  "Gastronomie & Café",
  "Praxis & Gesundheit",
  "Einzelhandel & Geschäft",
  "Beratung & Coaching",
  "Fotografie & Kreativ"
];

export default function WebsiteTemplate() {
  useSEO(SEO_PAGES.websiteTemplate);
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: processRef, isRevealed: processRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-24 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm text-accent bg-accent/10 px-3 py-1 rounded-full mb-6">
              <Clock className="w-4 h-4" />
              Schnellste Option
            </span>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-[1.1]">
              Website aus{" "}
              <span className="gradient-text">Template</span>
            </h1>
            
            <div className="mb-6">
              <span className="text-5xl font-bold">490€</span>
              <span className="text-xl text-muted-foreground ml-2">einmalig</span>
            </div>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Professionell aussehen ohne großes Budget? Unsere Template-Websites basieren auf
              bewährten Designs und werden mit Ihren Inhalten individualisiert – schnell, günstig, effektiv.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Template-Paket buchen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <Link to="/websites">
                  Alle Pakete ansehen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Was ist im Template-Paket enthalten?
              </h2>
              <p className="text-muted-foreground mb-8">
                Alles was Sie für einen professionellen Start im Internet brauchen – 
                ohne versteckte Kosten.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl" />
              <div className="relative p-8 rounded-2xl border border-white/10 bg-background/50 backdrop-blur">
                <h3 className="text-xl font-semibold mb-4">Verfügbare Branchen-Templates</h3>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((template, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-primary" />
                      <span>{template}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  ... und viele weitere. Fragen Sie nach Ihrem passenden Template!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
              So einfach geht's
            </h2>
            <p className="text-muted-foreground mt-4">In nur 4 Schritten zu Ihrer Website</p>
          </div>
          
          <div 
            ref={processRef}
            className={cn(
              "grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000",
              processRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {process.map((step, index) => (
              <div key={index} className="text-center" style={{ transitionDelay: `${index * 100}ms` }}>
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
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Interesse geweckt?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Lassen Sie sich unverbindlich beraten. Wir zeigen Ihnen passende Templates 
                für Ihre Branche und erstellen ein individuelles Angebot.
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Kostenloses Erstgespräch
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
