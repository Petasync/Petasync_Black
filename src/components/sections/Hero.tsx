import { Link } from "react-router-dom";
import { ArrowRight, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3DScene } from "@/components/3d/Hero3DScene";
import { Suspense } from "react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Radial light from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-white/[0.03] rounded-full blur-[150px]" />

      {/* 3D Scene */}
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      }>
        <Hero3DScene />
      </Suspense>

      {/* Content overlay */}
      <div className="container-tight relative z-10">
        <div className="max-w-3xl">
          {/* Badge - minimal */}
          <div className="inline-flex items-center gap-3 mb-10 animate-fade-in">
            <span className="text-sm text-muted-foreground tracking-wide">
              IT-Service • Ansbach & Nürnberg
            </span>
          </div>

          {/* Main headline - Linear style gradient text */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 animate-fade-in-up">
            <span className="gradient-text">IT-Service</span>
            <br />
            <span className="gradient-text">der Zukunft</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Professionelle IT-Lösungen für Privat- und Geschäftskunden. 
            Persönlich, schnell und zuverlässig.
          </p>

          {/* USP Highlight - no border, just subtle background */}
          <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-white/[0.03] mb-12 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-foreground" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground text-sm">Leih-PC Service</p>
              <p className="text-xs text-muted-foreground">Weiterarbeiten während der Reparatur</p>
            </div>
          </div>

          {/* CTAs - clean white button */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Button 
              size="lg" 
              asChild 
              className="h-12 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full"
            >
              <Link to="/kontakt">
                Kostenlose Beratung
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              asChild 
              className="h-12 px-6 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-transparent"
            >
              <Link to="/privatkunden">
                Services entdecken
                <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators - minimal */}
          <div className="flex flex-wrap gap-8 mt-16 animate-fade-in" style={{ animationDelay: "500ms" }}>
            {[
              "Schnelle Reaktion",
              "Faire Preise",
              "Vor-Ort-Service",
            ].map((item) => (
              <span key={item} className="text-sm text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-20" />
      
      {/* Scroll indicator - minimal */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-fade-in" style={{ animationDelay: "800ms" }}>
        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5">
          <div className="w-0.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
