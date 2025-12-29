import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Scissors, Sparkles, Clock, MapPin, Phone, Calendar, Instagram } from "lucide-react";

const theme = { primary: "#E91E63", secondary: "#212121", accent: "#FFD700", background: "#FAFAFA", text: "#333333" };

const services = [
  { name: "Damenhaarschnitt", price: "45€", duration: "60 min" },
  { name: "Herrenhaarschnitt", price: "30€", duration: "30 min" },
  { name: "Färben & Strähnen", price: "ab 75€", duration: "120 min" },
  { name: "Balayage", price: "ab 120€", duration: "180 min" },
];

const team = [
  { name: "Lisa", role: "Salonleitung", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=500&fit=crop" },
  { name: "Sophie", role: "Colorist", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop" },
  { name: "Maria", role: "Stylist", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop" },
];

export default function FriseurTemplate() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-7 h-7" style={{ color: theme.primary }} />
            <span className="text-2xl font-bold">Salon Chérie</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <Button style={{ backgroundColor: theme.primary, color: "white" }}>
              <Calendar className="mr-2 h-4 w-4" />Online Termin
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[90vh] flex items-center" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}>
        <div className="container mx-auto px-4 py-32 relative z-10 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Sparkles className="w-16 h-16 mx-auto mb-6" style={{ color: theme.accent }} />
            <h1 className="text-6xl md:text-7xl font-bold mb-6">Ihr Traum-Look<br />beginnt hier</h1>
            <p className="text-xl mb-8 opacity-90">Professionelles Hair-Styling & Color im Herzen von München</p>
            <Button size="lg" style={{ backgroundColor: theme.accent, color: theme.secondary }}>
              <Calendar className="mr-2" />Jetzt Termin buchen
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: theme.primary }}>Unsere Services</h2>
          <div className="space-y-4">
            {services.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center justify-between p-6 bg-white rounded-lg shadow">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" />{service.duration}
                  </p>
                </div>
                <div className="text-2xl font-bold" style={{ color: theme.primary }}>{service.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: theme.primary }}>Unser Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img src={member.image} alt={member.name} className="w-full h-96 object-cover" />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm" style={{ color: theme.primary }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: theme.primary, color: "white" }}>
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">Bereit für Ihren neuen Look?</h2>
          <p className="text-lg mb-8 opacity-90">Buchen Sie jetzt Ihren Termin online</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>089 123 456 78</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Maximilianstraße 12, München</span>
            </div>
          </div>
          <Button size="lg" style={{ backgroundColor: theme.accent, color: theme.secondary }}>
            <Calendar className="mr-2" />Online Termin buchen
          </Button>
        </div>
      </section>

      <footer className="py-8 bg-black text-white text-center">
        <p className="text-sm opacity-60">© 2024 Salon Chérie. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}
