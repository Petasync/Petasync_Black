import { Link } from "react-router-dom";
import { ArrowRight, Zap, Clock, Users, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    label: "Schnell",
    value: "24h",
    description: "Express-Reparatur"
  },
  {
    icon: Clock,
    label: "Erreichbar",
    value: "7 Tage",
    description: "die Woche"
  },
  {
    icon: Users,
    label: "Zufrieden",
    value: "500+",
    description: "Kunden betreut"
  },
  {
    icon: Star,
    label: "Bewertet",
    value: "5.0",
    description: "Google Bewertung"
  },
];

const quickLinks = [
  { label: "PC-Reparatur", href: "/services/pc-reparatur" },
  { label: "Netzwerk", href: "/services/netzwerk" },
  { label: "IT-Sicherheit", href: "/services/it-sicherheit" },
  { label: "Leih-PC", href: "/services/leih-pc" },
];

export function FeaturesShowcase() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="section-padding relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] radial-light" />
      
      <div className="container-tight relative">
        <div className="divider-glow mb-16" />
        
        <div 
          ref={ref}
          className={cn(
            "transition-all duration-1000",
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20">
            {features.map((feature, index) => (
              <div 
                key={feature.label}
                className="text-center lg:text-left transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 mb-4">
                  <feature.icon className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  {feature.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {feature.description}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-sm text-muted-foreground hover:text-foreground transition-all"
              >
                {link.label}
                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
