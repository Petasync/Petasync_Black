import { Link } from "react-router-dom";
import { Monitor, Wrench, Wifi, Building2, Globe, ArrowRight, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Wrench,
    title: "PC & Laptop Reparatur",
    description: "Hardware-Defekte, Software-Probleme, Virenentfernung – wir bringen Ihren Computer wieder zum Laufen.",
    href: "/services/pc-reparatur",
  },
  {
    icon: Monitor,
    title: "Leih-PC Service",
    description: "Keine Ausfallzeit! Nutzen Sie während der Reparatur kostenlos eines unserer Leihgeräte.",
    href: "/services/leih-pc",
    highlight: true,
  },
  {
    icon: Shield,
    title: "IT-Sicherheit",
    description: "Virenschutz, Datensicherung und Schutz vor Cyber-Bedrohungen für Ihre Geräte.",
    href: "/services/it-sicherheit",
  },
  {
    icon: Wifi,
    title: "Netzwerk & WLAN",
    description: "Einrichtung, Optimierung und Absicherung Ihres Heimnetzwerks für stabiles Internet.",
    href: "/services/netzwerk",
  },
  {
    icon: Building2,
    title: "IT für Unternehmen",
    description: "Professionelle IT-Infrastruktur, Wartungsverträge und Support für Ihr Unternehmen.",
    href: "/services/it-business",
  },
  {
    icon: Globe,
    title: "Webdesign",
    description: "Moderne, responsive Websites die Kunden überzeugen – von der Visitenkarte bis zum Shop.",
    href: "/services/webdesign",
  },
];

export function Services() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal();

  return (
    <section className="section-padding relative">
      {/* Subtle radial light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] radial-light" />
      
      <div className="container-tight relative">
        {/* Divider line with glow */}
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
            Services
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            IT-Lösungen für jeden Bedarf
          </h2>
          <p className="text-muted-foreground text-lg">
            Von der schnellen Reparatur bis zur langfristigen IT-Betreuung.
          </p>
        </div>

        {/* Services Grid - NO BORDERS */}
        <div 
          ref={gridRef}
          className={cn(
            "grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 stagger-children",
            gridRevealed ? "revealed" : ""
          )}
        >
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="group relative"
            >
              {/* Subtle highlight glow for featured item */}
              {service.highlight && (
                <div className="absolute -inset-8 bg-white/[0.02] rounded-3xl -z-10" />
              )}
              
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300",
                service.highlight ? "bg-white/10" : "bg-white/5",
                "group-hover:bg-white/10"
              )}>
                <service.icon className="w-5 h-5 text-foreground" />
              </div>

              <h3 className="font-semibold text-foreground text-lg mb-3 flex items-center gap-3">
                {service.title}
                {service.highlight && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground font-medium uppercase tracking-wider">
                    USP
                  </span>
                )}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                <span>Mehr erfahren</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
