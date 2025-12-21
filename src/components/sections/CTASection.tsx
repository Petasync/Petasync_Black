import { Link } from "react-router-dom";
import { ArrowRight, Phone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export function CTASection() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Large radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-white/[0.03] rounded-full blur-[150px]" />

      <div className="container-tight relative">
        {/* Divider */}
        <div className="divider-glow mb-20" />

        <div 
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto transition-all duration-1000",
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
            Bereit für IT ohne Kopfschmerzen?
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed">
            Lassen Sie uns gemeinsam Ihre IT-Herausforderungen lösen. 
            <span className="text-foreground"> Kostenlose Erstberatung – unverbindlich und ohne Risiko.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="h-14 px-8 text-base bg-foreground text-background hover:bg-foreground/90 rounded-full"
            >
              <Link to="/kontakt">
                <Phone className="w-4 h-4 mr-2" />
                Jetzt Kontakt aufnehmen
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="h-14 px-8 text-base text-muted-foreground hover:text-foreground hover:bg-transparent"
            >
              <Link to="/privatkunden#leih-pc">
                <Monitor className="w-4 h-4 mr-2" />
                Leih-PC Service
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-muted-foreground">
            <span>Kostenlose Beratung</span>
            <span>Transparente Preise</span>
            <span>Vor-Ort-Service</span>
          </div>
        </div>
      </div>
    </section>
  );
}
