import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Search, MapPin, Bed, Bath, Square, TrendingUp, Phone, Mail } from "lucide-react";

const theme = { primary: "#2C3E50", secondary: "#ECF0F1", accent: "#C9B037", background: "#FFFFFF", text: "#34495E" };

const properties = [
  { title: "Moderne Villa am See", type: "Villa", price: "1.250.000 €", beds: 5, baths: 3, sqm: 280, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop" },
  { title: "City Penthouse", type: "Penthouse", price: "890.000 €", beds: 3, baths: 2, sqm: 180, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop" },
  { title: "Charmantes Stadthaus", type: "Reihenhaus", price: "650.000 €", beds: 4, baths: 2, sqm: 220, image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop" },
];

export default function ImmobilienTemplate() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-7 h-7" style={{ color: theme.primary }} />
            <span className="text-2xl font-light tracking-wide" style={{ color: theme.primary }}>LuxuryEstate</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#properties">Immobilien</a>
            <a href="#services">Services</a>
            <a href="#about">Über uns</a>
            <Button style={{ backgroundColor: theme.accent, color: "white" }}>Kontakt</Button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[80vh] flex items-center" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.text} 100%)` }}>
        <div className="container mx-auto px-4 py-32 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-light mb-6 leading-tight">Ihr Traumhaus<br />wartet auf Sie</h1>
            <p className="text-xl mb-8 opacity-90">Exklusive Immobilien in besten Lagen</p>
            <div className="bg-white p-4 rounded-lg flex gap-4">
              <Input placeholder="Standort, PLZ..." className="flex-1" />
              <select className="p-3 border rounded-lg">
                <option>Kaufen</option>
                <option>Mieten</option>
              </select>
              <Button style={{ backgroundColor: theme.accent, color: "white" }}>
                <Search className="mr-2 h-4 w-4" />Suchen
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="properties" className="py-20" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-16" style={{ color: theme.primary }}>Aktuelle Angebote</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {properties.map((prop, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img src={prop.image} alt={prop.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <span className="text-xs uppercase tracking-wide mb-2 block" style={{ color: theme.accent }}>{prop.type}</span>
                  <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
                  <div className="text-2xl font-light mb-4" style={{ color: theme.primary }}>{prop.price}</div>
                  <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1"><Bed className="w-4 h-4" />{prop.beds}</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4" />{prop.baths}</span>
                    <span className="flex items-center gap-1"><Square className="w-4 h-4" />{prop.sqm}m²</span>
                  </div>
                  <Button variant="outline" className="w-full" style={{ borderColor: theme.primary, color: theme.primary }}>Details ansehen</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-4xl font-light mb-12" style={{ color: theme.primary }}>Unsere Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Home, title: "Immobilienkauf", desc: "Finden Sie Ihr Traumhaus" },
              { icon: TrendingUp, title: "Verkauf", desc: "Maximaler Preis für Ihre Immobilie" },
              { icon: MapPin, title: "Vermietung", desc: "Zuverlässige Mieter finden" },
            ].map((service, i) => (
              <div key={i} className="p-6">
                <service.icon className="w-12 h-12 mx-auto mb-4" style={{ color: theme.accent }} />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p className="mb-4">© 2024 LuxuryEstate. Alle Rechte vorbehalten.</p>
          <div className="flex justify-center gap-6">
            <a href="#">Impressum</a>
            <a href="#">Datenschutz</a>
            <a href="#">AGB</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
