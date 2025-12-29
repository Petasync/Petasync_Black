import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Wrench, Shield, Clock, Phone, MapPin, Calculator, Calendar, AlertCircle } from "lucide-react";

const theme = { primary: "#C41E3A", secondary: "#1C1C1C", accent: "#FFB81C", background: "#ECECEC", text: "#2B2B2B" };

const services = [
  { icon: Wrench, title: "Inspektion & Wartung", desc: "Regelmäßige Wartung für lange Lebensdauer" },
  { icon: Car, title: "Reparaturen", desc: "Schnelle und professionelle Reparaturen" },
  { icon: Shield, title: "TÜV & AU", desc: "Prüfungen und Vorbereitungen" },
];

export default function AutowerkstattTemplate() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Notdienst Banner */}
      <div className="bg-gradient-to-r py-3 text-white text-center font-bold text-sm" style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.accent})` }}>
        <div className="flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>24/7 NOTDIENST: 0800 111 222 333</span>
        </div>
      </div>

      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-8 h-8" style={{ color: theme.primary }} />
            <span className="text-2xl font-bold">AutoService Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm uppercase tracking-wide font-medium">
            <a href="#leistungen">Leistungen</a>
            <a href="#preise">Preise</a>
            <a href="#kontakt">Kontakt</a>
            <Button style={{ backgroundColor: theme.primary, color: "white" }}>
              <Calendar className="mr-2 h-4 w-4" />Termin buchen
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ backgroundColor: theme.secondary }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&h=1080&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="text-white">
              <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight uppercase">
                Ihre Werkstatt<br />
                <span style={{ color: theme.accent }}>Ihres Vertrauens</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Professioneller KFZ-Service für alle Marken.<br />Seit über 30 Jahren in Ihrer Nähe.
              </p>
              <div className="flex gap-4">
                <Button size="lg" style={{ backgroundColor: theme.primary, color: "white" }}>
                  <Calculator className="mr-2" />Kostenrechner
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  Online Termin
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="leistungen" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 uppercase" style={{ color: theme.primary }}>Unsere Leistungen</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 bg-white rounded-lg shadow-lg"
              >
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: `${theme.primary}15` }}>
                  <service.icon className="w-8 h-8" style={{ color: theme.primary }} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: theme.secondary, color: "white" }}>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 uppercase">Marken</h2>
          <p className="text-lg mb-12 opacity-80">Wir arbeiten mit allen gängigen Herstellern</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {["VW", "BMW", "Audi", "Mercedes", "Opel", "Ford"].map((brand, i) => (
              <div key={i} className="aspect-square bg-white/10 rounded-lg flex items-center justify-center text-2xl font-bold">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="preise" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 uppercase" style={{ color: theme.primary }}>Service-Pakete</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Inspektion Klein", price: "ab 149€", features: ["Ölwechsel", "Filter", "Sichtprüfung"] },
              { name: "Inspektion Groß", price: "ab 299€", features: ["Alle Klein-Features", "Bremsflüssigkeit", "Zündkerzen"], popular: true },
              { name: "TÜV-Paket", price: "ab 89€", features: ["Vorbereitung", "Mängelbeseitigung", "TÜV-Gebühr"] },
            ].map((pkg, i) => (
              <div
                key={i}
                className={`p-6 rounded-lg border-2 ${pkg.popular ? 'shadow-2xl' : 'shadow-lg'}`}
                style={{
                  borderColor: pkg.popular ? theme.primary : '#ddd',
                  backgroundColor: pkg.popular ? `${theme.primary}05` : 'white',
                }}
              >
                {pkg.popular && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: theme.accent, color: theme.secondary }}>
                    BELIEBT
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold mb-6" style={{ color: theme.primary }}>{pkg.price}</div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" style={{ backgroundColor: pkg.popular ? theme.primary : 'transparent', color: pkg.popular ? 'white' : theme.primary, border: `2px solid ${theme.primary}` }}>
                  Anfragen
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="py-20" style={{ backgroundColor: theme.primary, color: "white" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold mb-6">Kontakt & Öffnungszeiten</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6" />
                  <div>
                    <p className="font-bold">Telefon</p>
                    <p>0911 123 456 78</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6" />
                  <div>
                    <p className="font-bold">Adresse</p>
                    <p>Industriestraße 99, 90411 Nürnberg</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6" />
                  <div>
                    <p className="font-bold">Öffnungszeiten</p>
                    <p>Mo-Fr: 7:30 - 18:00 Uhr<br />Sa: 9:00 - 13:00 Uhr</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg" style={{ color: theme.text }}>
              <h3 className="text-2xl font-bold mb-6">Anfrage senden</h3>
              <form className="space-y-4">
                <Input placeholder="Ihr Name" />
                <Input type="email" placeholder="Ihre E-Mail" />
                <Input type="tel" placeholder="Ihre Telefonnummer" />
                <select className="w-full p-3 border rounded-lg">
                  <option>Service auswählen...</option>
                  <option>Inspektion</option>
                  <option>Reparatur</option>
                  <option>TÜV</option>
                </select>
                <Button className="w-full" style={{ backgroundColor: theme.primary, color: "white" }}>
                  Anfrage senden
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12" style={{ backgroundColor: theme.secondary, color: "white" }}>
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2024 AutoService Pro. Alle Rechte vorbehalten.</p>
          <div className="flex justify-center gap-6 text-sm opacity-70">
            <a href="#">Impressum</a>
            <a href="#">Datenschutz</a>
            <a href="#">AGB</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
