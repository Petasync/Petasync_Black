import { Link } from "react-router-dom";
import { Monitor, Wrench, Wifi, Building2, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Wrench,
    title: "PC & Laptop Reparatur",
    description: "Hardware-Defekte, Software-Probleme, Virenentfernung – wir bringen Ihren Computer wieder zum Laufen.",
    href: "/privatkunden",
    color: "primary",
  },
  {
    icon: Monitor,
    title: "Leih-PC Service",
    description: "Keine Ausfallzeit! Nutzen Sie während der Reparatur kostenlos eines unserer Leihgeräte.",
    href: "/privatkunden#leih-pc",
    color: "accent",
    featured: true,
  },
  {
    icon: Wifi,
    title: "Netzwerk & WLAN",
    description: "Einrichtung, Optimierung und Absicherung Ihres Heimnetzwerks für stabiles Internet überall.",
    href: "/privatkunden",
    color: "secondary",
  },
  {
    icon: Building2,
    title: "IT für Unternehmen",
    description: "Professionelle IT-Infrastruktur, Wartungsverträge und Support für Ihr Unternehmen.",
    href: "/geschaeftskunden",
    color: "primary",
  },
  {
    icon: Globe,
    title: "Webdesign",
    description: "Moderne, responsive Websites die Kunden überzeugen – von der Visitenkarte bis zum Onlineshop.",
    href: "/websites",
    color: "secondary",
  },
];

const colorVariants = {
  primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  secondary: "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground",
  accent: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
};

export function Services() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Unsere Services</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6">
            IT-Lösungen für jeden Bedarf
          </h2>
          <p className="text-lg text-muted-foreground">
            Von der schnellen Problemlösung bis zur langfristigen IT-Betreuung – 
            wir bieten maßgeschneiderte Lösungen für Privatkunden und Unternehmen.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className={`group relative glass rounded-2xl p-6 hover:shadow-tech-lg transition-all duration-300 hover:-translate-y-1 ${
                service.featured ? "md:col-span-2 lg:col-span-1 ring-2 ring-accent/20" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {service.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  Unser USP
                </div>
              )}
              
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${colorVariants[service.color as keyof typeof colorVariants]}`}>
                <service.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-display font-semibold mt-6 mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="flex items-center text-sm font-medium text-primary">
                <span>Mehr erfahren</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/kontakt">
              Individuelle Anfrage stellen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
