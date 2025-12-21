import { MapPin, Clock, Shield, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const reasons = [
  {
    icon: MapPin,
    title: "Lokal vor Ort",
    description: "Persönlicher Service in Ansbach, Nürnberg und Umgebung.",
  },
  {
    icon: Clock,
    title: "Schnelle Hilfe",
    description: "Kurze Reaktionszeiten und flexible Terminvergabe.",
  },
  {
    icon: Shield,
    title: "Transparente Preise",
    description: "Keine versteckten Kosten. Festpreis vorab.",
  },
  {
    icon: Zap,
    title: "Moderne Lösungen",
    description: "Aktuelle Technologien für nachhaltige IT-Lösungen.",
  },
];

export function WhyUs() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: cardsRef, isRevealed: cardsRevealed } = useScrollReveal();

  return (
    <section className="section-padding relative">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container-tight relative">
        {/* Divider */}
        <div className="divider-glow mb-20" />

        {/* Header */}
        <div 
          ref={headerRef}
          className={cn(
            "text-center max-w-2xl mx-auto mb-20 transition-all duration-1000",
            headerRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="text-sm text-muted-foreground tracking-widest uppercase mb-6 block">
            Warum Petasync
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
            IT-Service mit Handschlag-Qualität
          </h2>
          <p className="text-muted-foreground text-lg">
            Persönlicher Service von Menschen, die ihre Arbeit lieben.
          </p>
        </div>

        {/* Cards - NO BORDERS */}
        <div 
          ref={cardsRef}
          className={cn(
            "grid sm:grid-cols-2 lg:grid-cols-4 gap-12 stagger-children",
            cardsRevealed ? "revealed" : ""
          )}
        >
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 mx-auto mb-6 flex items-center justify-center">
                <reason.icon className="w-6 h-6 text-foreground" />
              </div>

              <h3 className="font-semibold text-foreground text-lg mb-3">
                {reason.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
