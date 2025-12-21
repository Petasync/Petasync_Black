import { Link } from "react-router-dom";
import { ArrowRight, Monitor, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMouseParallax } from "@/hooks/useScrollReveal";

export function Hero() {
  const floatingRef1 = useMouseParallax(15);
  const floatingRef2 = useMouseParallax(25);
  const floatingRef3 = useMouseParallax(10);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-60" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] opacity-40" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] opacity-30" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      {/* Video placeholder - user can add video later */}
      <div className="absolute inset-0 opacity-0 pointer-events-none">
        {/* 
          Video-Platzhalter: Füge hier dein Artlist-Video ein
          <video autoPlay muted loop playsInline className="video-background">
            <source src="/your-video.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay" />
        */}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          ref={floatingRef1}
          className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full border border-primary/20 animate-spin-slow opacity-20"
        />
        <div 
          ref={floatingRef2}
          className="absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full border border-secondary/20 animate-spin-slow opacity-15"
          style={{ animationDirection: "reverse", animationDuration: "30s" }}
        />
        <div 
          ref={floatingRef3}
          className="absolute top-[40%] left-[15%] w-32 h-32 rounded-full bg-accent/5 blur-xl animate-float"
        />
      </div>

      <div className="container-tight relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle mb-8 animate-fade-in">
            <div className="relative">
              <Sparkles className="w-4 h-4 text-primary" />
              <div className="absolute inset-0 animate-pulse-ring">
                <Sparkles className="w-4 h-4 text-primary/50" />
              </div>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              IT-Service für Ansbach & Nürnberg
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
            <span className="text-foreground">IT-Service der </span>
            <span className="relative">
              <span className="gradient-text-colored">Zukunft</span>
              <span className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-2xl -z-10" />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Professionelle IT-Lösungen für Privat- und Geschäftskunden. 
            Von der PC-Reparatur bis zur kompletten IT-Infrastruktur – 
            <span className="text-foreground font-medium"> persönlich, schnell und zuverlässig.</span>
          </p>

          {/* USP Highlight - Leih-PC */}
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl glass mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center glow-subtle">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Leih-PC Service</p>
              <p className="text-sm text-muted-foreground">Weiterarbeiten während der Reparatur</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Button 
              size="lg" 
              asChild 
              className="h-14 px-8 text-base gradient-bg border-0 btn-glow hover:opacity-90 transition-all"
            >
              <Link to="/kontakt">
                Kostenlose Beratung
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="h-14 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Link to="/privatkunden">
                Services entdecken
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in" style={{ animationDelay: "500ms" }}>
            {[
              { label: "Schnelle Reaktion", icon: "⚡" },
              { label: "Faire Preise", icon: "✓" },
              { label: "Vor-Ort-Service", icon: "📍" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating cards */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {/* Card 1 - Top right */}
          <div 
            className="absolute top-[20%] right-[5%] card-depth p-5 max-w-[240px] animate-float"
            style={{ animationDelay: "0s" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white text-lg">🔧</span>
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">PC Reparatur</p>
                <p className="text-xs text-muted-foreground">Hardware & Software</p>
              </div>
            </div>
          </div>

          {/* Card 2 - Bottom left */}
          <div 
            className="absolute bottom-[25%] left-[5%] card-depth p-5 max-w-[240px] animate-float-delayed"
            style={{ animationDelay: "2s" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-white text-lg">🛡️</span>
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">IT-Sicherheit</p>
                <p className="text-xs text-muted-foreground">Schutz & Backup</p>
              </div>
            </div>
          </div>

          {/* Card 3 - Center right */}
          <div 
            className="absolute top-[50%] right-[2%] card-depth p-5 max-w-[220px] animate-float"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-white text-lg">💻</span>
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">Leih-PC</p>
                <p className="text-xs text-muted-foreground">Unser USP</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
