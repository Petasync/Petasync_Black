import { Link } from "react-router-dom";
import { ArrowRight, Monitor, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3DScene } from "@/components/3d/Hero3DScene";
import { Suspense } from "react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-50" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] opacity-30" />

      {/* 3D Scene */}
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Hero3DScene />
      </Suspense>

      {/* Content overlay */}
      <div className="container-tight relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <div className="relative">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              IT-Service • Ansbach & Nürnberg
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
            <span className="text-foreground">IT-Service</span>
            <br />
            <span className="text-foreground">der </span>
            <span className="gradient-text-colored">Zukunft</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Professionelle IT-Lösungen für Privat- und Geschäftskunden. 
            Persönlich, schnell und zuverlässig.
          </p>

          {/* USP Highlight */}
          <div className="inline-flex items-center gap-4 px-5 py-3 rounded-xl glass border-primary/20 mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground text-sm">Leih-PC Service</p>
              <p className="text-xs text-muted-foreground">Weiterarbeiten während der Reparatur</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Button 
              size="lg" 
              asChild 
              className="h-12 px-6 text-sm font-medium bg-primary hover:bg-primary/90 text-white"
            >
              <Link to="/kontakt">
                Kostenlose Beratung
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="h-12 px-6 text-sm font-medium border-white/10 hover:bg-white/5"
            >
              <Link to="/privatkunden">
                Services entdecken
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 mt-12 animate-fade-in" style={{ animationDelay: "500ms" }}>
            {[
              { label: "Schnelle Reaktion" },
              { label: "Faire Preise" },
              { label: "Vor-Ort-Service" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-fade-in" style={{ animationDelay: "800ms" }}>
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}
