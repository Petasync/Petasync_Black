import { Link } from "react-router-dom";
import { Monitor, Wrench, Wifi, Building2, Globe, ArrowRight, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Wrench,
    title: "PC & Laptop Reparatur",
    description: "Hardware-Defekte, Software-Probleme, Virenentfernung – wir bringen Ihren Computer wieder zum Laufen.",
    href: "/privatkunden",
    accent: false,
  },
  {
    icon: Monitor,
    title: "Leih-PC Service",
    description: "Keine Ausfallzeit! Nutzen Sie während der Reparatur kostenlos eines unserer Leihgeräte.",
    href: "/privatkunden#leih-pc",
    accent: true,
  },
  {
    icon: Shield,
    title: "IT-Sicherheit",
    description: "Virenschutz, Datensicherung und Schutz vor Cyber-Bedrohungen für Ihre Geräte.",
    href: "/privatkunden",
    accent: false,
  },
  {
    icon: Wifi,
    title: "Netzwerk & WLAN",
    description: "Einrichtung, Optimierung und Absicherung Ihres Heimnetzwerks für stabiles Internet.",
    href: "/privatkunden",
    accent: false,
  },
  {
    icon: Building2,
    title: "IT für Unternehmen",
    description: "Professionelle IT-Infrastruktur, Wartungsverträge und Support für Ihr Unternehmen.",
    href: "/geschaeftskunden",
    accent: false,
  },
  {
    icon: Globe,
    title: "Webdesign",
    description: "Moderne, responsive Websites die Kunden überzeugen – von der Visitenkarte bis zum Shop.",
    href: "/websites",
    accent: "green" as const,
  },
];

export function Services() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal();

  return (
    <section className="section-padding relative">
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
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            IT-Lösungen für jeden Bedarf
          </h2>
          <p className="text-muted-foreground">
            Von der schnellen Reparatur bis zur langfristigen IT-Betreuung.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={gridRef}
          className={cn(
            "grid md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children",
            gridRevealed ? "revealed" : ""
          )}
        >
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className={cn(
                "group card-interactive p-6 hover:scale-[1.02] transition-all duration-300",
                service.accent === true && "border-primary/30",
                service.accent === "green" && "border-accent/30"
              )}
            >
              {service.accent === true && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}
              
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300",
                service.accent === true ? "bg-primary" : 
                service.accent === "green" ? "bg-accent" : "bg-white/10",
                "group-hover:scale-110"
              )}>
                <service.icon className={cn(
                  "w-5 h-5",
                  service.accent ? "text-white" : "text-foreground"
                )} />
              </div>

              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                {service.title}
                {service.accent === true && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium uppercase tracking-wider">
                    USP
                  </span>
                )}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>

              <div className="flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Mehr erfahren</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
