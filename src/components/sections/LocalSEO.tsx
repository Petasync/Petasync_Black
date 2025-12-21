import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const serviceAreas = [
  { city: "Ansbach", description: "Kreisstadt Mittelfranken" },
  { city: "Oberasbach", description: "Landkreis Fürth" },
  { city: "Nürnberg", description: "Metropolregion" },
  { city: "Fürth", description: "Großstadt Mittelfranken" },
  { city: "Erlangen", description: "Universitätsstadt" },
];

export function LocalSEO() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Einsatzgebiet</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6">
                IT-Service in{" "}
                <span className="gradient-text">Ihrer Nähe</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Als lokaler IT-Dienstleister sind wir schnell bei Ihnen. 
                Ob Vor-Ort-Service oder Abholung – wir kommen zu Ihnen nach Hause 
                oder in Ihr Büro.
              </p>
            </div>

            {/* Service Areas */}
            <div className="space-y-3">
              {serviceAreas.map((area) => (
                <div
                  key={area.city}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{area.city}</h4>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              + weitere Orte im Umkreis von ca. 50 km
            </p>
          </div>

          {/* Contact Card */}
          <div className="glass-strong rounded-3xl p-8 lg:p-10">
            <h3 className="text-2xl font-display font-bold mb-2">Schnell erreichbar</h3>
            <p className="text-muted-foreground mb-8">
              Kontaktieren Sie uns für eine kostenlose Erstberatung
            </p>

            <div className="space-y-6">
              <a
                href="tel:+491637117198"
                className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p className="font-semibold group-hover:text-primary transition-colors">+49 163 711 7198</p>
                </div>
              </a>

              <a
                href="mailto:service@petasync.de"
                className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Mail className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-Mail</p>
                  <p className="font-semibold group-hover:text-primary transition-colors">service@petasync.de</p>
                </div>
              </a>

              <Button size="lg" className="w-full gradient-bg border-0 hover:opacity-90" asChild>
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
