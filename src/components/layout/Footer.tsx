import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";

const serviceLinks = [
  { name: "PC Reparatur", href: "/privatkunden" },
  { name: "Leih-PC Service", href: "/privatkunden#leih-pc" },
  { name: "Netzwerk & WLAN", href: "/privatkunden" },
  { name: "IT für Unternehmen", href: "/geschaeftskunden" },
  { name: "Webdesign", href: "/websites" },
];

const infoLinks = [
  { name: "FAQ", href: "/faq" },
  { name: "Kontakt", href: "/kontakt" },
  { name: "Impressum", href: "/impressum" },
  { name: "Datenschutz", href: "/datenschutz" },
];

const serviceAreas = [
  "Ansbach", "Oberasbach", "Nürnberg", "Fürth", "Erlangen"
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      {/* Main Footer */}
      <div className="container-tight section-padding relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl text-foreground">
                Peta<span className="gradient-text-colored">sync</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ihr lokaler IT-Partner für Privat- und Geschäftskunden. 
              Professioneller IT-Service mit persönlicher Beratung.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+491637117198"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                onClick={trackPhoneClick}
              >
                <Phone className="w-4 h-4" />
                <span>+49 163 711 7198</span>
              </a>
              <a
                href="mailto:service@petasync.de"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                onClick={trackEmailClick}
              >
                <Mail className="w-4 h-4" />
                <span>service@petasync.de</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Mobil vor Ort – Ansbach / Oberasbach</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Informationen</h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Area - Local SEO */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Einsatzgebiet</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Öffnungszeiten</p>
                <p>Mo - Fr: 08:00 - 20:00 Uhr</p>
                <p>Sa: 10:00 - 18:00 Uhr</p>
                <p>So: Geschlossen</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.08]">
        <div className="container-tight py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Petasync. Alle Rechte vorbehalten.</p>
            <p>IT-Service für Ansbach, Nürnberg, Fürth und Umgebung</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
