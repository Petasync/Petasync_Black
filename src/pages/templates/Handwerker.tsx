import { useState, useEffect, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Hammer,
  Wrench,
  Drill,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
  Calendar,
  Calculator,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Handwerker Theme Colors
const theme = {
  primary: "#FF6B35",
  secondary: "#2D3142",
  accent: "#F4B860",
  background: "#F8F9FA",
  text: "#1A1A1A",
};

const services = [
  {
    icon: Hammer,
    title: "Reparaturen",
    description: "Schnelle und zuverlässige Reparaturen aller Art",
  },
  {
    icon: Wrench,
    title: "Wartung",
    description: "Regelmäßige Wartung für lange Lebensdauer",
  },
  {
    icon: Drill,
    title: "Montage",
    description: "Professionelle Montage-Arbeiten",
  },
];

const projects = [
  {
    title: "Badezimmer-Sanierung",
    category: "Klempner",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop",
  },
  {
    title: "Elektro-Installation",
    category: "Elektriker",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop",
  },
  {
    title: "Küchen-Möbel",
    category: "Schreiner",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
  },
  {
    title: "Fassaden-Anstrich",
    category: "Maler",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop",
  },
];

const testimonials = [
  {
    name: "Thomas Schmidt",
    role: "Privatkunde",
    text: "Sehr professionelle Arbeit! Pünktlich, sauber und präzise. Absolute Empfehlung!",
    rating: 5,
  },
  {
    name: "Maria Weber",
    role: "Geschäftskunde",
    text: "Kompetente Beratung und faire Preise. Arbeitet seit Jahren mit uns zusammen.",
    rating: 5,
  },
  {
    name: "Michael Bauer",
    role: "Privatkunde",
    text: "Notdienst war innerhalb von 30 Minuten da. Sehr zuverlässig!",
    rating: 5,
  },
];

export default function HandwerkerTemplate() {
  const [showNotdienst, setShowNotdienst] = useState(true);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Notdienst Banner - Sticky */}
      {showNotdienst && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3 text-center text-white shadow-lg"
          style={{ backgroundColor: theme.primary }}
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-bold">24/7 Notdienst: 0800 123 4567</span>
            </div>
            <button
              onClick={() => setShowNotdienst(false)}
              className="text-white hover:opacity-80"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav
        className="sticky top-0 z-40 px-4 py-4 backdrop-blur-lg border-b"
        style={{
          backgroundColor: `${theme.background}95`,
          borderColor: `${theme.secondary}20`,
          marginTop: showNotdienst ? "48px" : "0",
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hammer className="w-8 h-8" style={{ color: theme.primary }} />
            <span className="text-xl font-bold" style={{ color: theme.secondary }}>
              Handwerk Pro
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium hover:opacity-80">
              Leistungen
            </a>
            <a href="#projekte" className="text-sm font-medium hover:opacity-80">
              Projekte
            </a>
            <a href="#team" className="text-sm font-medium hover:opacity-80">
              Team
            </a>
            <a href="#kontakt" className="text-sm font-medium hover:opacity-80">
              Kontakt
            </a>
            <Button
              className="rounded-full font-bold"
              style={{ backgroundColor: theme.primary, color: "white" }}
            >
              Termin buchen
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Video Placeholder */}
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.primary} 100%)`,
              opacity: 0.9,
            }}
          />
          {/* Animated Tool Icons */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: Math.random() * 100 + "%", rotate: 0 }}
                animate={{
                  y: "120vh",
                  rotate: 360,
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "linear",
                }}
                className="absolute opacity-10"
              >
                {i % 3 === 0 ? (
                  <Hammer className="w-16 h-16 text-white" />
                ) : i % 3 === 1 ? (
                  <Wrench className="w-16 h-16 text-white" />
                ) : (
                  <Drill className="w-16 h-16 text-white" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              WIR PACKEN AN!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 opacity-90"
            >
              Ihr zuverlässiger Partner für Elektro, Sanitär, Schreiner & Maler-Arbeiten
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button
                size="lg"
                className="rounded-full font-bold text-lg px-8"
                style={{ backgroundColor: theme.accent, color: theme.text }}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Termin vereinbaren
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full font-bold text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-gray-900"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Kostenrechner
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-white rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span
              className="text-sm font-bold tracking-widest uppercase mb-4 block"
              style={{ color: theme.primary }}
            >
              Unsere Leistungen
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Alles aus einer Hand
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Von der Beratung bis zur Umsetzung – wir bieten Ihnen professionelle
              Handwerksleistungen in allen Bereichen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${theme.primary}20` }}
                >
                  <service.icon className="w-8 h-8" style={{ color: theme.primary }} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button
                  variant="ghost"
                  className="group"
                  style={{ color: theme.primary }}
                >
                  Mehr erfahren
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio/Projects Section */}
      <section id="projekte" className="py-20" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 text-white"
          >
            <span
              className="text-sm font-bold tracking-widest uppercase mb-4 block"
              style={{ color: theme.accent }}
            >
              Referenzen
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Unsere Projekte
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Überzeugen Sie sich von unserer Qualität – eine Auswahl unserer
              erfolgreich abgeschlossenen Projekte.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <span
                    className="text-xs font-bold mb-2"
                    style={{ color: theme.accent }}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span
              className="text-sm font-bold tracking-widest uppercase mb-4 block"
              style={{ color: theme.primary }}
            >
              Kundenmeinungen
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Das sagen unsere Kunden
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-current"
                      style={{ color: theme.accent }}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20" style={{ backgroundColor: `${theme.primary}10` }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Kontaktieren Sie uns
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Haben Sie Fragen oder benötigen Sie ein Angebot?
                Wir sind für Sie da!
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold">Telefon</p>
                    <p className="text-gray-600">0800 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold">E-Mail</p>
                    <p className="text-gray-600">info@handwerk-pro.de</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold">Adresse</p>
                    <p className="text-gray-600">Musterstraße 123, 12345 Musterstadt</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6">Anfrage senden</h3>
              <form className="space-y-4">
                <Input placeholder="Ihr Name" />
                <Input type="email" placeholder="Ihre E-Mail" />
                <Input type="tel" placeholder="Ihre Telefonnummer" />
                <Textarea placeholder="Ihre Nachricht" rows={4} />
                <Button
                  className="w-full rounded-full font-bold"
                  style={{ backgroundColor: theme.primary, color: "white" }}
                >
                  Nachricht senden
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: theme.secondary, color: "white" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hammer className="w-6 h-6" style={{ color: theme.accent }} />
                <span className="text-xl font-bold">Handwerk Pro</span>
              </div>
              <p className="text-sm opacity-80">
                Ihr zuverlässiger Partner für alle Handwerksarbeiten.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Leistungen</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Elektro-Arbeiten</li>
                <li>Sanitär-Arbeiten</li>
                <li>Schreiner-Arbeiten</li>
                <li>Maler-Arbeiten</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Über uns</li>
                <li>Team</li>
                <li>Karriere</li>
                <li>Kontakt</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Impressum</li>
                <li>Datenschutz</li>
                <li>AGB</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm opacity-60">
            <p>© 2024 Handwerk Pro. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/4980012345667"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50"
        style={{ backgroundColor: "#25D366" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </motion.a>
    </div>
  );
}
