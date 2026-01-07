import { Link } from "react-router-dom";
import { ArrowRight, Laptop, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense, lazy } from "react";
import { trackCTAClick } from "@/lib/analytics";

// Lazy load 3D scene for better initial page load
const Hero3DScene = lazy(() => import("@/components/3d/Hero3DScene").then(mod => ({ default: mod.Hero3DScene })));

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
      <div className="container-tight relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
          {/* Badge - minimal */}
          <div className="inline-flex items-center gap-3 mb-8 animate-fade-in">
            <span className="text-sm text-muted-foreground tracking-wide">
              IT-Service • Ansbach & Nürnberg
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
            <span className="gradient-text">Professioneller</span>
            <br />
            <span className="gradient-text">IT-Service</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed animate-fade-in-up mx-auto lg:mx-0" style={{ animationDelay: "100ms" }}>
            Für Privat- und Geschäftskunden. Reparatur, Netzwerk, Webdesign – 
            alles aus einer Hand. Inkl. kostenlosem Leih-PC.
          </p>

          {/* Key benefits inline */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mb-8 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            {[
              "Leih-PC inklusive",
              "Vor-Ort-Service",
              "Faire Festpreise"
            ].map((benefit) => (
              <span key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {benefit}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <Button
              size="lg"
              asChild
              className="h-12 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full"
            >
              <Link to="/kontakt" onClick={() => trackCTAClick('Kostenlose Beratung', 'Hero Section Primary')}>
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
              <Link to="/privatkunden" onClick={() => trackCTAClick('Für Privatkunden', 'Hero Section Secondary')}>
                Für Privatkunden
                <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-12 animate-fade-in" style={{ animationDelay: "400ms" }}>
            {[
              "24h Express",
              "500+ Kunden",
              "5.0 ★ Google",
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
