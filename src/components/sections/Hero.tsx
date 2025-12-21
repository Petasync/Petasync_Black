import { Link } from "react-router-dom";
import { ArrowRight, Monitor, Shield, Clock, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container-tight relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">IT-Service für Ansbach & Nürnberg</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight animate-fade-in-up">
              Ihr lokaler{" "}
              <span className="gradient-text">IT-Partner</span>{" "}
              für alle Fälle
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl animate-fade-in-up delay-100">
              Professioneller IT-Service für Privat- und Geschäftskunden. 
              Von der PC-Reparatur bis zur kompletten IT-Infrastruktur – 
              persönlich, schnell und zuverlässig.
            </p>

            {/* USP Highlight - Leih-PC */}
            <div className="glass rounded-2xl p-4 inline-flex items-center gap-4 animate-fade-in-up delay-200">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                <Monitor className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Leih-PC Service</p>
                <p className="text-sm text-muted-foreground">Weiterarbeiten während der Reparatur</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <Button size="lg" asChild className="gradient-bg border-0 hover:opacity-90 text-base h-12 px-8">
                <Link to="/kontakt">
                  Kostenlose Beratung
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base h-12 px-8">
                <Link to="/privatkunden">
                  Services entdecken
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4 animate-fade-in-up delay-400">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>Schnelle Reaktionszeit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>Faire Preise</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wrench className="w-4 h-4 text-primary" />
                <span>Vor-Ort-Service</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:h-[600px] animate-fade-in delay-200">
            {/* Floating Cards */}
            <div className="absolute top-0 right-0 glass rounded-2xl p-6 animate-float shadow-tech-lg max-w-[280px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">PC Reparatur</p>
                  <p className="text-xs text-muted-foreground">Hardware & Software</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Professionelle Diagnose und schnelle Reparatur Ihres Computers.</p>
            </div>

            <div className="absolute bottom-0 left-0 glass rounded-2xl p-6 animate-float shadow-tech-lg max-w-[280px]" style={{ animationDelay: "2s" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">IT-Sicherheit</p>
                  <p className="text-xs text-muted-foreground">Schutz & Backup</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Virenschutz, Datensicherung und sichere Passwörter.</p>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-6 animate-float shadow-tech-lg max-w-[280px]" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Leih-PC</p>
                  <p className="text-xs text-muted-foreground">Unser USP</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Keine Ausfallzeit – arbeiten Sie weiter mit unserem Leihgerät!</p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full gradient-bg opacity-60 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-6 h-6 rounded-full bg-secondary opacity-40 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-3/4 right-1/3 w-3 h-3 rounded-full bg-accent opacity-50 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
