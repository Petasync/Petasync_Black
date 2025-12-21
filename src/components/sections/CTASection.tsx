import { Link } from "react-router-dom";
import { ArrowRight, Phone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export function CTASection() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container-tight relative">
        <div 
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto transition-all duration-700",
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Bereit für IT ohne <span className="gradient-text-colored">Kopfschmerzen</span>?
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
            Lassen Sie uns gemeinsam Ihre IT-Herausforderungen lösen. 
            <span className="text-foreground font-medium"> Kostenlose Erstberatung – unverbindlich und ohne Risiko.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="h-14 px-8 text-base gradient-bg border-0 btn-glow hover:opacity-90"
            >
              <Link to="/kontakt">
                <Phone className="w-5 h-5 mr-2" />
                Jetzt Kontakt aufnehmen
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-14 px-8 text-base border-white/10 hover:bg-white/5"
            >
              <Link to="/privatkunden#leih-pc">
                <Monitor className="w-5 h-5 mr-2" />
                Leih-PC Service
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> Kostenlose Beratung
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> Transparente Preise
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> Vor-Ort-Service
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
