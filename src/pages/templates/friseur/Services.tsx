import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Scissors, ChevronRight, Calendar, Clock, Euro, Star, Sparkles, Heart,
  Palette, Crown, Users, Phone, Mail, MapPin
} from "lucide-react";

const theme = {
  primary: "#FF1493",
  secondary: "#000000",
  accent: "#FFD700",
  background: "#FFF5F8",
  text: "#1A1A1A",
};

const services = [
  { icon: Scissors, title: "Damenschnitt", price: "ab 45€", duration: "45 Min", desc: "Perfekter Schnitt für jeden Typ" },
  { icon: Scissors, title: "Herrenschnitt", price: "ab 35€", duration: "30 Min", desc: "Klassisch oder modern" },
  { icon: Palette, title: "Coloration", price: "ab 65€", duration: "90 Min", desc: "Vollständige Haarfarbe" },
  { icon: Sparkles, title: "Strähnchen", price: "ab 85€", duration: "120 Min", desc: "Balayage oder Folien" },
  { icon: Heart, title: "Hochzeitsfrisur", price: "ab 120€", duration: "90 Min", desc: "Inkl. Probe-Styling" },
  { icon: Crown, title: "Keratin Treatment", price: "ab 95€", duration: "90 Min", desc: "Glättung & Pflege" },
  { icon: Sparkles, title: "Dauerwelle", price: "ab 75€", duration: "120 Min", desc: "Langanhaltende Locken" },
  { icon: Heart, title: "Brautstyling Paket", price: "ab 180€", duration: "150 Min", desc: "Komplett-Service" },
];

export default function FriseurServices() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/templates/friseur" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
              <Scissors className="inline" />
              Salon Élégance
            </Link>

            <div className="hidden md:flex gap-6 items-center">
              <Link to="/templates/friseur/services" className="font-semibold" style={{ color: theme.accent }}>Services</Link>
              <Link to="/templates/friseur/preise" className="hover:text-pink-600 transition-colors">Preise</Link>
              <Link to="/templates/friseur/team" className="hover:text-pink-600 transition-colors">Team</Link>
              <Link to="/templates/friseur/galerie" className="hover:text-pink-600 transition-colors">Galerie</Link>
              <Link to="/templates/friseur/buchung" className="hover:text-pink-600 transition-colors">Online-Buchung</Link>
              <Button style={{ backgroundColor: theme.primary }}>
                <Calendar className="mr-2 h-4 w-4" />
                Termin
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/templates/friseur" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Services</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white shadow-sm">
              <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
              <span className="text-sm font-semibold">Premium Services</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Unsere <span style={{ color: theme.primary }}>Services</span>
            </h1>
            <p className="text-lg opacity-80">
              Von klassischen Schnitten bis zu luxuriösen Treatments -
              wir verwenden nur die besten Produkte für perfekte Ergebnisse
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-pink-100 group">
                  <CardHeader>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${theme.primary}15` }}
                    >
                      <service.icon size={32} style={{ color: theme.primary }} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-sm text-gray-600">{service.desc}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-pink-100">
                      <div>
                        <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                          {service.price}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {service.duration}
                        </div>
                      </div>
                      <Star className="w-8 h-8" style={{ color: theme.accent }} />
                    </div>
                    <Button className="w-full" style={{ backgroundColor: theme.primary }}>
                      Buchen
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Warum <span style={{ color: theme.primary }}>Salon Élégance?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Erfahrene Stylisten", desc: "Über 50 Jahre kombinierte Erfahrung" },
              { icon: Sparkles, title: "Premium Produkte", desc: "Nur Markenprodukte: Olaplex, Kérastase, L'Oréal Pro" },
              { icon: Heart, title: "Individuelle Beratung", desc: "Jeder Kunde ist einzigartig - wir beraten persönlich" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="text-center h-full border-pink-100">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20` }}>
                      <item.icon className="w-8 h-8" style={{ color: theme.primary }} />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit für Ihre Transformation?</h2>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Buchen Sie jetzt Ihren Termin online und freuen Sie sich auf ein einzigartiges Salon-Erlebnis
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/templates/friseur/buchung">
              <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.primary }}>
                <Calendar className="mr-2" />
                Online buchen
              </Button>
            </Link>
            <Link to="/templates/friseur/preise">
              <Button size="lg" variant="outline" className="rounded-full border-pink-300 text-pink-600">
                Alle Preise ansehen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="py-12 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-white text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-2" style={{ color: theme.primary }} />
              <div className="font-semibold mb-1">Telefon</div>
              <a href="tel:0123456789" className="hover:text-pink-400 transition">0123 456 789</a>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 mb-2" style={{ color: theme.primary }} />
              <div className="font-semibold mb-1">E-Mail</div>
              <a href="mailto:info@salon-elegance.de" className="hover:text-pink-400 transition">info@salon-elegance.de</a>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 mb-2" style={{ color: theme.primary }} />
              <div className="font-semibold mb-1">Adresse</div>
              <div>Hauptstraße 123, 80331 München</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
