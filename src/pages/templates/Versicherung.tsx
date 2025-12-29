import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Users,
  TrendingUp,
  Heart,
  Home,
  Car,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Award,
  CheckCircle,
  ArrowRight,
  Calculator,
  Download,
  Clock,
} from "lucide-react";

// Versicherungsberater Theme Colors
const theme = {
  primary: "#1E3A8A",
  secondary: "#D4AF37",
  accent: "#3B82F6",
  background: "#FFFFFF",
  text: "#1F2937",
};

const services = [
  { icon: Heart, title: "Krankenversicherung", desc: "Beste medizinische Versorgung" },
  { icon: Home, title: "Hausrat & Gebäude", desc: "Umfassender Schutz für Ihr Zuhause" },
  { icon: Car, title: "KFZ-Versicherung", desc: "Sicher unterwegs" },
  { icon: Briefcase, title: "Berufsunfähigkeit", desc: "Absicherung Ihrer Arbeitskraft" },
  { icon: TrendingUp, title: "Altersvorsorge", desc: "Sorgenfrei im Alter" },
  { icon: Shield, title: "Haftpflicht", desc: "Rundum geschützt" },
];

const stats = [
  { value: "10,000+", label: "Zufriedene Kunden" },
  { value: "25+", label: "Jahre Erfahrung" },
  { value: "50+", label: "Versicherer-Partner" },
  { value: "98%", label: "Kundenzufriedenheit" },
];

export default function VersicherungTemplate() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b bg-white/90">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8" style={{ color: theme.primary }} />
            <span className="text-xl font-bold" style={{ color: theme.primary }}>
              VersicherPro
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#leistungen" className="text-sm font-medium hover:opacity-80">Leistungen</a>
            <a href="#ueber-uns" className="text-sm font-medium hover:opacity-80">Über uns</a>
            <a href="#rechner" className="text-sm font-medium hover:opacity-80">Rechner</a>
            <a href="#kontakt" className="text-sm font-medium hover:opacity-80">Kontakt</a>
            <Button style={{ backgroundColor: theme.secondary, color: theme.text }}>
              Beratung anfragen
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
          }}
        >
          {/* 3D Shield Animation Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="w-96 h-96" />
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Ihre Zukunft.<br />Sicher versichert.
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Persönliche Beratung für alle Lebenssituationen.
                Unabhängig, kompetent und immer an Ihrer Seite.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-gray-100"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Versicherung berechnen
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10"
                >
                  Beratungstermin
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              {/* Placeholder for 3D visualization */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ backgroundColor: `${theme.primary}05` }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2" style={{ color: theme.primary }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="leistungen" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.secondary }}>
              Unsere Leistungen
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Rundum gut versichert
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Von der Krankenversicherung bis zur Altersvorsorge –
              wir finden die optimale Lösung für Sie.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-6 rounded-xl bg-white shadow-lg border hover:shadow-2xl transition-all"
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <service.icon className="w-7 h-7" style={{ color: theme.primary }} />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy/Timeline Section */}
      <section id="ueber-uns" className="py-20" style={{ backgroundColor: `${theme.primary}05` }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Seit 1998 Ihr vertrauensvoller Partner
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              { year: "1998", title: "Gründung", desc: "Start als unabhängiger Versicherungsberater" },
              { year: "2005", title: "Expansion", desc: "Eröffnung weiterer Standorte" },
              { year: "2015", title: "Digitalisierung", desc: "Launch der Online-Beratung" },
              { year: "2024", title: "Heute", desc: "Über 10.000 zufriedene Kunden" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 mb-8"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {index + 1}
                  </div>
                  {index < 3 && <div className="w-0.5 h-16 bg-gray-300 mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <span className="text-sm font-bold" style={{ color: theme.secondary }}>
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator/Tools Section */}
      <section id="rechner" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Versicherungsbedarf berechnen</h2>
              <p className="text-gray-600">
                Nutzen Sie unsere kostenlosen Rechner-Tools
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Calculator, title: "Beitragsrechner" },
                { icon: Download, title: "Ratgeber-PDFs" },
                { icon: Shield, title: "Deckungsprüfung" },
              ].map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl bg-white shadow-lg text-center cursor-pointer"
                >
                  <tool.icon className="w-12 h-12 mx-auto mb-4" style={{ color: theme.primary }} />
                  <h3 className="font-bold">{tool.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20" style={{ backgroundColor: theme.primary, color: "white" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Jetzt beraten lassen
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Vereinbaren Sie einen kostenlosen Beratungstermin.
                Wir freuen uns auf Sie!
              </p>

              <div className="space-y-4">
                {[
                  { icon: Phone, label: "Telefon", value: "0800 987 6543" },
                  { icon: Mail, label: "E-Mail", value: "info@versicherpro.de" },
                  { icon: MapPin, label: "Adresse", value: "Finanzstraße 45, 10115 Berlin" },
                  { icon: Clock, label: "Öffnungszeiten", value: "Mo-Fr: 9-18 Uhr" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <contact.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">{contact.label}</p>
                      <p className="font-bold">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl text-gray-900"
            >
              <h3 className="text-2xl font-bold mb-6">Kontaktformular</h3>
              <form className="space-y-4">
                <Input placeholder="Ihr Name" />
                <Input type="email" placeholder="Ihre E-Mail" />
                <Input type="tel" placeholder="Ihre Telefonnummer" />
                <select className="w-full p-3 border rounded-lg">
                  <option>Beratungsthema wählen...</option>
                  <option>Krankenversicherung</option>
                  <option>Altersvorsorge</option>
                  <option>KFZ-Versicherung</option>
                  <option>Sonstiges</option>
                </select>
                <Button
                  className="w-full"
                  style={{ backgroundColor: theme.secondary, color: theme.text }}
                >
                  Anfrage senden
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6" style={{ color: theme.secondary }} />
                <span className="text-xl font-bold">VersicherPro</span>
              </div>
              <p className="text-sm opacity-70">
                Ihr unabhängiger Versicherungsberater seit 1998
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Versicherungen</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li>Krankenversicherung</li>
                <li>Altersvorsorge</li>
                <li>KFZ-Versicherung</li>
                <li>Haftpflicht</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Service</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li>Beratung</li>
                <li>Schadenmeldung</li>
                <li>Downloads</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li>Impressum</li>
                <li>Datenschutz</li>
                <li>AGB</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm opacity-60">
            <p>© 2024 VersicherPro. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
