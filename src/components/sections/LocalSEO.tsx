import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const serviceAreas = [
  "Ansbach",
  "Oberasbach", 
  "Nürnberg",
  "Fürth",
  "Erlangen",
];

export function LocalSEO() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Radial light bottom left */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-white/[0.02] rounded-full blur-[120px]" />
      
      <div className="container-tight relative">
        {/* Divider */}
        <div className="divider-glow mb-20" />

        <div 
          ref={ref}
          className={cn(
            "grid lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000",
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {/* Content */}
          <div className="space-y-10">
            <div>
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Einsatzgebiet
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
                IT-Service in Ihrer Nähe
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Als lokaler IT-Dienstleister sind wir schnell bei Ihnen. 
                Ob Vor-Ort-Service oder Abholung – wir kommen zu Ihnen.
              </p>
            </div>

            {/* Service Areas - minimal */}
            <div className="flex flex-wrap gap-3">
              {serviceAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-sm">{area}</span>
                </div>
              ))}
              <span className="text-sm text-muted-foreground">+ weitere Orte</span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground">Schnell erreichbar</h3>

            <div className="space-y-4">
              <a
                href="tel:+491637117198"
                className="group flex items-center gap-5 py-4 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-0.5">Telefon</p>
                  <p className="font-medium text-foreground group-hover:text-white transition-colors">
                    +49 163 711 7198
                  </p>
                </div>
              </a>

              <a
                href="mailto:service@petasync.de"
                className="group flex items-center gap-5 py-4 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-0.5">E-Mail</p>
                  <p className="font-medium text-foreground group-hover:text-white transition-colors">
                    service@petasync.de
                  </p>
                </div>
              </a>

              <Button 
                size="lg" 
                className="w-full mt-6 bg-foreground text-background hover:bg-foreground/90 rounded-full" 
                asChild
              >
                <Link to="/kontakt">
                  Termin vereinbaren
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
