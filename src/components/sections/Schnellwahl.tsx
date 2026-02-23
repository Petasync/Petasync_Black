import { Link } from "react-router-dom";
import { Monitor, Building2, Globe, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const cards = [
  {
    icon: Monitor,
    title: "Privatperson",
    subtitle: "PC kaputt oder langsam?",
    price: "Festpreise ab 49€",
    href: "/privatkunden",
    cta: "Pakete ansehen",
  },
  {
    icon: Building2,
    title: "Unternehmen",
    subtitle: "IT läuft nicht rund?",
    price: "Ab 149€/Monat",
    href: "/geschaeftskunden",
    cta: "Pakete ansehen",
  },
  {
    icon: Globe,
    title: "Website",
    subtitle: "Online präsent werden?",
    price: "Ab 490€ einmalig",
    href: "/websites",
    cta: "Pakete ansehen",
  },
];

export function Schnellwahl() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="section-padding relative">
      <div className="container-tight relative">
        <div className="divider-glow mb-16" />

        <div className="text-center mb-12">
          <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
            Schnellwahl
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Was suchen{" "}
            <span className="gradient-text">Sie?</span>
          </h2>
        </div>

        <div
          ref={ref}
          className={cn(
            "grid md:grid-cols-3 gap-6 transition-all duration-1000",
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.href}
              className="group relative p-8 rounded-2xl border border-white/5 hover:border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent transition-all hover:scale-[1.02]"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <card.icon className="w-7 h-7 text-foreground" />
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground mb-4">{card.subtitle}</p>

              <span className="text-sm font-medium text-primary block mb-6">
                {card.price}
              </span>

              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {card.cta}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
