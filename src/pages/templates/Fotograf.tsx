import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Instagram, Heart, Briefcase, Users, Mail } from "lucide-react";

const theme = { primary: "#000000", secondary: "#FFFFFF", accent: "#FF6B6B", background: "#F5F5F5", text: "#2C2C2C" };

const portfolio = [
  { category: "Hochzeit", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop" },
  { category: "Portrait", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&h=800&fit=crop" },
  { category: "Events", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=800&fit=crop" },
  { category: "Business", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=800&fit=crop" },
];

export default function FotografTemplate() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-6 h-6" />
            <span className="text-xl font-serif">Anna Müller</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#portfolio">Portfolio</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center pt-20" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&h=1080&fit=crop)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/40" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-serif mb-6">Anna Müller</h1>
          <p className="text-2xl mb-8">Wedding & Portrait Photography</p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100">Meine Arbeit entdecken</Button>
        </motion.div>
      </section>

      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif text-center mb-16">Portfolio</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {portfolio.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} whileHover={{ scale: 1.05 }} className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg">
                <img src={item.image} alt={item.category} className="w-full transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white text-lg font-serif">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop" alt="Anna" className="rounded-lg shadow-2xl" />
          <div>
            <h2 className="text-4xl font-serif mb-6">Über mich</h2>
            <p className="mb-4">Hallo! Ich bin Anna, leidenschaftliche Fotografin aus München. Seit über 10 Jahren halte ich die schönsten Momente des Lebens fest.</p>
            <p className="mb-6">Meine Spezialität sind emotionale Hochzeitsreportagen und authentische Portraits. Ich liebe es, die Einzigartigkeit jedes Menschen einzufangen.</p>
            <Button style={{ backgroundColor: theme.accent }}>Buchungsanfrage</Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-serif text-center mb-16">Services & Pakete</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Hochzeit", price: "ab 1.500€", features: ["Ganztags-Begleitung", "300+ Bilder", "Online-Galerie"] },
              { icon: Users, title: "Portrait", price: "ab 250€", features: ["1h Shooting", "20 bearbeitete Bilder", "Location-Beratung"] },
              { icon: Briefcase, title: "Business", price: "ab 400€", features: ["Firmenportraits", "Eventfotografie", "Schnelle Lieferung"] },
            ].map((pkg, i) => (
              <div key={i} className="p-8 border rounded-lg hover:shadow-lg transition-shadow">
                <pkg.icon className="w-12 h-12 mb-4" style={{ color: theme.accent }} />
                <h3 className="text-2xl font-serif mb-2">{pkg.title}</h3>
                <div className="text-3xl font-light mb-6">{pkg.price}</div>
                <ul className="space-y-2 mb-6 text-sm text-gray-600">
                  {pkg.features.map((f, j) => <li key={j}>✓ {f}</li>)}
                </ul>
                <Button variant="outline" className="w-full">Anfragen</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-4xl font-serif mb-6">Let's work together</h2>
          <p className="mb-8 text-lg">Ich freue mich auf Ihre Anfrage!</p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Mail className="w-5 h-5" /></a>
          </div>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100">Kontakt aufnehmen</Button>
        </div>
      </section>

      <footer className="py-8 bg-black text-white/60 text-center text-sm">
        <p>© 2024 Anna Müller Photography</p>
      </footer>
    </div>
  );
}
