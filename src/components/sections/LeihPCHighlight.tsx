import { Link } from "react-router-dom";
import { Monitor, ArrowRight, Clock, Laptop, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import laptopImage from "@/assets/laptop-float.png";

const benefits = [
  {
    icon: Clock,
    title: "Keine Ausfallzeit",
    description: "Arbeiten Sie nahtlos weiter während wir Ihren PC reparieren",
  },
  {
    icon: Laptop,
    title: "Vorkonfiguriert",
    description: "Sofort einsatzbereit mit allen wichtigen Programmen",
  },
  {
    icon: Shield,
    title: "Kostenlos inklusive",
    description: "Bei jeder Reparatur ab 2 Werktagen Dauer",
  },
];

export function LeihPCHighlight() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section id="leih-pc" className="section-padding relative overflow-hidden">
      {/* Radial light from center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white/[0.02] rounded-full blur-[150px]" />

      <div className="container-tight relative">
        <div 
          ref={ref}
          className={cn(
            "transition-all duration-1000",
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {/* Divider */}
          <div className="divider-glow mb-20" />

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-white/[0.03] blur-[80px] scale-75 rounded-full" />
                
                {/* Image with depth */}
                <img 
                  src={laptopImage} 
                  alt="Leih-PC Service" 
                  className="relative w-full h-full object-contain image-float-shadow"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                  Unser USP
                </span>
                
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
                  Leih-PC Service
                </h2>
                
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ihr Computer ist zur Reparatur – aber Ihre Arbeit muss weitergehen? 
                  Mit unserem Leih-PC Service überbrücken Sie die Reparaturzeit ohne Produktivitätsverlust.
                </p>
              </div>

              {/* Benefits - no boxes */}
              <div className="space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex gap-4 pt-4">
                <Button asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-full">
                  <Link to="/kontakt">
                    Leih-PC anfragen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground hover:bg-transparent">
                  <Link to="/privatkunden">
                    Alle Services
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
