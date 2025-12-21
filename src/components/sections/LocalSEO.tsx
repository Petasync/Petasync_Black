import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const serviceAreas = [
  { city: "Ansbach", description: "Kreisstadt" },
  { city: "Oberasbach", description: "Landkreis Fürth" },
  { city: "Nürnberg", description: "Metropolregion" },
  { city: "Fürth", description: "Großstadt" },
  { city: "Erlangen", description: "Universitätsstadt" },
];

export function LocalSEO() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
      
      <div className="container-tight relative">
        <div 
          ref={ref}
          className={cn(
            "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700",
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-sm font-medium text-primary mb-4">Einsatzgebiet</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                IT-Service in <span className="gradient-text-colored">Ihrer Nähe</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Als lokaler IT-Dienstleister sind wir schnell bei Ihnen. 
                Ob Vor-Ort-Service oder Abholung – wir kommen zu Ihnen.
              </p>
            </div>

            {/* Service Areas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {serviceAreas.map((area) => (
                <div
                  key={area.city}
                  className="glass-subtle rounded-xl p-4 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{area.city}</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">{area.description}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              + weitere Orte im Umkreis
            </p>
          </div>

          {/* Contact Card */}
          <div className="card-depth p-8 lg:p-10">
            <h3 className="text-2xl font-bold mb-2">Schnell erreichbar</h3>
            <p className="text-muted-foreground mb-8">
              Kontaktieren Sie uns für eine kostenlose Erstberatung
            </p>

            <div className="space-y-4">
              <a
                href="tel:+491637117198"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center glow-subtle">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    +49 163 711 7198
                  </p>
                </div>
              </a>

              <a
                href="mailto:service@petasync.de"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-Mail</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    service@petasync.de
                  </p>
                </div>
              </a>

              <Button 
                size="lg" 
                className="w-full gradient-bg border-0 btn-glow hover:opacity-90 mt-4" 
                asChild
              >
                <Link to="/kontakt">
                  Termin vereinbaren
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
