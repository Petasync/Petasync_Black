import { Link } from "react-router-dom";
import { Monitor, CheckCircle2, ArrowRight, Clock, Laptop, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container-tight relative">
        <div 
          ref={ref}
          className={cn(
            "relative transition-all duration-700",
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Card */}
          <div className="relative glass-strong rounded-2xl p-8 md:p-12">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Visual */}
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-square max-w-sm mx-auto">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-primary/20 blur-[60px] scale-75" />
                  
                  {/* Main Visual */}
                  <div className="absolute inset-4 glass rounded-2xl flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-20 h-20 mx-auto rounded-xl bg-primary flex items-center justify-center mb-4">
                        <Monitor className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-1">Leih-PC</h3>
                      <p className="text-sm text-muted-foreground">Ihr Ersatzgerät</p>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-2 -right-2 glass rounded-lg p-3 animate-float">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 glass rounded-lg px-3 py-2 animate-float" style={{ animationDelay: "1s" }}>
                    <span className="text-xs font-medium">Sofort verfügbar</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Unser USP
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Weiterarbeiten mit unserem{" "}
                  <span className="gradient-text-colored">Leih-PC Service</span>
                </h2>
                
                <p className="text-muted-foreground">
                  Ihr Computer ist zur Reparatur – aber Ihre Arbeit muss weitergehen? 
                  Mit unserem Leih-PC Service überbrücken Sie die Reparaturzeit ohne Produktivitätsverlust.
                </p>

                {/* Benefits */}
                <div className="space-y-3">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit.title}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{benefit.title}</h4>
                        <p className="text-xs text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3 pt-2">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link to="/kontakt">
                      Leih-PC anfragen
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="border-white/10 hover:bg-white/5">
                    <Link to="/privatkunden">
                      Alle Services
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
