import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UtensilsCrossed,
  Wine,
  Clock,
  MapPin,
  Phone,
  Star,
  Calendar,
  ChefHat,
  Award,
  Instagram,
} from "lucide-react";

const theme = {
  primary: "#8B1538",
  secondary: "#F4E4C1",
  accent: "#D4AF37",
  background: "#1A1A1A",
  text: "#F8F8F8",
};

const menuCategories = [
  { name: "Vorspeisen", items: ["Carpaccio vom Rind", "Burrata", "Vitello Tonnato"] },
  { name: "Hauptgerichte", items: ["Dry Aged Ribeye", "Wolfsbarsch", "Tagliatelle al Tartufo"] },
  { name: "Desserts", items: ["Tiramisu", "Panna Cotta", "Schokoladenkuchen"] },
];

const signatureDishes = [
  {
    name: "Dry Aged Ribeye Steak",
    desc: "400g Premium-Rind, 30 Tage gereift",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
  },
  {
    name: "Frischer Hummer",
    desc: "Aus nachhaltigem Fang, gegrillt",
    image: "https://images.unsplash.com/photo-1559737558-2f5a70c4e0a5?w=600&h=400&fit=crop",
  },
  {
    name: "Hausgemachte Pasta",
    desc: "Täglich frisch zubereitet",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop",
  },
];

export default function RestaurantTemplate() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/80 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-7 h-7" style={{ color: theme.accent }} />
            <span className="text-2xl font-serif" style={{ color: theme.secondary }}>
              La Maison
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#menu" className="hover:opacity-80 transition-opacity">Menü</a>
            <a href="#chef" className="hover:opacity-80 transition-opacity">Chef</a>
            <a href="#galerie" className="hover:opacity-80 transition-opacity">Galerie</a>
            <a href="#kontakt" className="hover:opacity-80 transition-opacity">Kontakt</a>
            <Button style={{ backgroundColor: theme.accent, color: theme.background }}>
              <Calendar className="mr-2 h-4 w-4" />
              Reservieren
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: `${theme.primary}80` }} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <UtensilsCrossed className="w-20 h-20 mx-auto mb-6" style={{ color: theme.accent }} />
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-serif mb-6" style={{ color: theme.secondary }}>
            La Maison
          </h1>
          <p className="text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Französische Haute Cuisine im Herzen der Stadt
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              style={{ backgroundColor: theme.accent, color: theme.background }}
            >
              Tisch reservieren
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 text-white hover:bg-white/10"
              style={{ borderColor: theme.secondary }}
            >
              Menü ansehen
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2" style={{ borderColor: theme.secondary }}>
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: theme.secondary }} />
          </div>
        </motion.div>
      </section>

      {/* Signature Dishes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Signature Dishes
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Unsere Spezialitäten
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {signatureDishes.map((dish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <h3 className="text-2xl font-serif mb-2">{dish.name}</h3>
                <p className="opacity-70">{dish.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20" style={{ backgroundColor: `${theme.primary}20` }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Speisekarte</h2>
            <p className="opacity-70">Saisonale Gerichte, täglich frisch zubereitet</p>
          </motion.div>

          <div className="space-y-12">
            {menuCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-serif mb-6 pb-2 border-b" style={{ borderColor: theme.accent }}>
                  {category.name}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-baseline">
                      <span className="text-lg">{item}</span>
                      <div className="flex-1 mx-4 border-b border-dotted opacity-30" />
                      <span className="font-serif" style={{ color: theme.accent }}>€€€</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-2"
              style={{ borderColor: theme.accent, color: theme.accent }}
            >
              Komplette Speisekarte (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section id="chef" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=800&fit=crop"
                alt="Chef"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ChefHat className="w-12 h-12 mb-4" style={{ color: theme.accent }} />
              <h2 className="text-4xl font-serif mb-4">Chef Philippe Dubois</h2>
              <p className="text-lg mb-4 opacity-80">
                Mit über 20 Jahren Erfahrung in der französischen Haute Cuisine
                vereint Chef Philippe klassische Techniken mit modernen Interpretationen.
              </p>
              <p className="mb-6 opacity-70">
                Ausgebildet in Lyon und Paris, bringt er die authentische französische
                Kochkunst nach Deutschland. Seine Leidenschaft für lokale, saisonale
                Zutaten spiegelt sich in jedem Gericht wider.
              </p>
              <div className="flex gap-4">
                <Award className="w-6 h-6" style={{ color: theme.accent }} />
                <div>
                  <p className="font-bold">2 Michelin Sterne</p>
                  <p className="text-sm opacity-70">Ausgezeichnet seit 2020</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reservation/Contact */}
      <section id="kontakt" className="py-20" style={{ backgroundColor: theme.primary }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif mb-6">Reservierung</h2>
              <p className="mb-8 opacity-90">
                Sichern Sie sich Ihren Tisch in unserem Restaurant.
                Wir freuen uns auf Ihren Besuch!
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6" style={{ color: theme.accent }} />
                  <div>
                    <p className="font-bold">Telefon</p>
                    <p>+49 30 1234567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6" style={{ color: theme.accent }} />
                  <div>
                    <p className="font-bold">Adresse</p>
                    <p>Gourmetstraße 12, 10117 Berlin</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6" style={{ color: theme.accent }} />
                  <div>
                    <p className="font-bold">Öffnungszeiten</p>
                    <p>Di-Sa: 18:00 - 23:00 Uhr</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl"
              style={{ backgroundColor: theme.secondary, color: theme.background }}
            >
              <h3 className="text-2xl font-serif mb-6">Online Reservieren</h3>
              <form className="space-y-4">
                <Input placeholder="Name" className="bg-white" />
                <Input type="email" placeholder="E-Mail" className="bg-white" />
                <Input type="tel" placeholder="Telefon" className="bg-white" />
                <Input type="date" className="bg-white" />
                <select className="w-full p-3 border rounded-lg">
                  <option>Anzahl Personen</option>
                  <option>2 Personen</option>
                  <option>4 Personen</option>
                  <option>6+ Personen</option>
                </select>
                <Button
                  className="w-full"
                  style={{ backgroundColor: theme.primary, color: theme.text }}
                >
                  Tisch reservieren
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <UtensilsCrossed className="w-8 h-8 mx-auto mb-4" style={{ color: theme.accent }} />
          <p className="text-2xl font-serif mb-2" style={{ color: theme.secondary }}>La Maison</p>
          <p className="text-sm opacity-60 mb-6">Französische Haute Cuisine</p>
          <div className="flex justify-center gap-6 text-sm opacity-60">
            <a href="#" className="hover:opacity-100">Impressum</a>
            <a href="#" className="hover:opacity-100">Datenschutz</a>
            <a href="#" className="hover:opacity-100">AGB</a>
          </div>
          <p className="text-sm opacity-40 mt-6">© 2024 La Maison. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
