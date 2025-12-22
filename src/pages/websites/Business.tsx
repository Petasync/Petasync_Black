import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Check, ArrowRight, Star, Zap, BarChart3, Edit3, Search, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const features = [
  "Premium individuelles Design",
  "Bis zu 10 Seiten nach Ihren Wünschen",
  "Content Management System (CMS)",
  "Blog-Funktion inklusive",
  "Erweiterte SEO-Optimierung",
  "Google Analytics & Search Console",
  "Performance-Optimierung",
  "Cookie-Banner (DSGVO)",
  "3 Monate technischer Support",
  "Social Media Integration",
  "Newsletter-Anbindung möglich",
  "Schulung für CMS-Bedienung"
];

const highlights = [
  {
    icon: Edit3,
    title: "CMS-System",
    description: "Bearbeiten Sie Texte und Bilder selbst – ohne technische Kenntnisse."
  },
  {
    icon: BarChart3,
    title: "Blog & News",
    description: "Halten Sie Ihre Kunden mit aktuellen Beiträgen auf dem Laufenden."
  },
  {
    icon: Search,
    title: "Premium SEO",
    description: "Bessere Sichtbarkeit bei Google durch umfassende Optimierung."
  },
  {
    icon: Users,
    title: "3 Monate Support",
    description: "Wir stehen Ihnen nach dem Launch weiter zur Seite."
  }
];

export default function WebsiteBusiness() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: highlightsRef, isRevealed: highlightsRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-24 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm text-primary bg-primary/20 px-3 py-1 rounded-full mb-6">
              <Star className="w-4 h-4" />
              Beliebteste Option
            </span>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-[1.1]">
              Website{" "}
              <span className="gradient-text">Business</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Für wachsende Unternehmen, die mehr wollen: CMS-System, Blog-Funktion und 
              erweiterte SEO – alles für Ihren professionellen Online-Auftritt.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Jetzt anfragen
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

      {/* Highlights */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div 
            ref={highlightsRef}
            className={cn(
              "grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000",
              highlightsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {highlights.map((highlight, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <highlight.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Leistungsumfang
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Alles im Business-Paket
              </h2>
              <p className="text-muted-foreground mb-8">
                Das komplette Paket für professionelle Unternehmen mit Wachstumsambitionen.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-xl" />
              <div className="relative p-8 rounded-2xl border border-primary/20 bg-background/80 backdrop-blur">
                <Building2 className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Ideal für wachsende Unternehmen</h3>
                <p className="text-muted-foreground mb-6">
                  Das Business-Paket ist perfekt für Unternehmen, die mehr Kontrolle über ihre 
                  Website haben möchten und regelmäßig Inhalte aktualisieren.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Selbst Inhalte bearbeiten
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Blogartikel veröffentlichen
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Besseres Google-Ranking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/5" />
            <div className="absolute inset-0 border border-primary/20 rounded-3xl" />
            
            <div className="relative">
              <Star className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Bereit für mehr?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Das Business-Paket ist unsere beliebteste Option. 
                Lassen Sie uns besprechen, wie wir Ihr Unternehmen online voranbringen.
              </p>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Beratungsgespräch vereinbaren
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
