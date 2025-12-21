import { MapPin, Clock, Shield, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const reasons = [
  {
    icon: MapPin,
    title: "Lokal vor Ort",
    description: "Persönlicher Service in Ansbach, Nürnberg und Umgebung.",
    accent: false,
  },
  {
    icon: Clock,
    title: "Schnelle Hilfe",
    description: "Kurze Reaktionszeiten und flexible Terminvergabe.",
    accent: true,
  },
  {
    icon: Shield,
    title: "Transparente Preise",
    description: "Keine versteckten Kosten. Festpreis vorab.",
    accent: false,
  },
  {
    icon: Zap,
    title: "Moderne Lösungen",
    description: "Aktuelle Technologien für nachhaltige IT-Lösungen.",
    accent: false,
  },
];

export function WhyUs() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: cardsRef, isRevealed: cardsRevealed } = useScrollReveal();

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
      <div className="container-tight relative">
        {/* Header */}
        <div 
          ref={headerRef}
          className={cn(
            "text-center max-w-2xl mx-auto mb-16 transition-all duration-700",
            headerRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wider uppercase">
            Warum Petasync
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            IT-Service mit{" "}
            <span className="gradient-text-colored">Handschlag-Qualität</span>
          </h2>
          <p className="text-muted-foreground">
            Persönlicher Service von Menschen, die ihre Arbeit lieben.
          </p>
        </div>

        {/* Cards */}
        <div 
          ref={cardsRef}
          className={cn(
            "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children",
            cardsRevealed ? "revealed" : ""
          )}
        >
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className={cn(
                "card-interactive p-6 text-center transition-all duration-300 hover:scale-[1.02]",
                reason.accent && "border-primary/20"
              )}
            >
              {reason.accent && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}
              
              <div className={cn(
                "w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center",
                reason.accent ? "bg-primary" : "bg-white/10"
              )}>
                <reason.icon className={cn(
                  "w-6 h-6",
                  reason.accent ? "text-white" : "text-foreground"
                )} />
              </div>

              <h3 className="font-semibold text-foreground mb-2">
                {reason.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
