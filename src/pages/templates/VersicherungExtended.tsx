import { useState, useEffect, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield, Users, TrendingUp, Heart, Home, Car, Briefcase, Phone, Mail, MapPin,
  Award, CheckCircle, ArrowRight, Calculator, Download, Clock, Star, Menu, X,
  FileText, Zap, Target, BarChart, Facebook, Instagram, Linkedin, Youtube,
  ChevronRight, MessageCircle, Calendar, HelpCircle, BadgeCheck, Percent
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProtectionShield, NetworkNodes } from "@/components/3d/VersicherungModels";

const theme = {
  primary: "#1E3A8A",
  secondary: "#D4AF37",
  accent: "#3B82F6",
  background: "#F8FAFC",
  text: "#1F2937",
};

const services = [
  { icon: Heart, title: "Krankenversicherung", desc: "Beste medizinische Versorgung für Sie und Ihre Familie", price: "ab 189€/Monat", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop", benefits: ["Freie Arztwahl", "Weltweit geschützt", "Zahnzusatz"] },
  { icon: Home, title: "Hausrat & Gebäude", desc: "Umfassender Schutz für Ihr Zuhause und Eigentum", price: "ab 8€/Monat", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop", benefits: ["Bis 100.000€", "Elementarschäden", "Fahrraddiebstahl"] },
  { icon: Car, title: "KFZ-Versicherung", desc: "Rundum sorglos im Straßenverkehr unterwegs", price: "ab 39€/Monat", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop", benefits: ["Vollkasko", "Schutzbrief", "Rabattschutz"] },
  { icon: Briefcase, title: "Berufsunfähigkeit", desc: "Sichern Sie Ihre Arbeitskraft und Ihr Einkommen", price: "ab 45€/Monat", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", benefits: ["Bis zu 3.000€", "Weltweiter Schutz", "Nachversicherung"] },
  { icon: TrendingUp, title: "Altersvorsorge", desc: "Genießen Sie einen sorgenfreien Ruhestand", price: "ab 100€/Monat", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop", benefits: ["Garantierte Rente", "Flexibel", "Steuervorteile"] },
  { icon: Shield, title: "Privathaftpflicht", desc: "Schutz vor existenzbedrohenden Schadensersatzforderungen", price: "ab 5€/Monat", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop", benefits: ["10 Mio. Schutz", "Deliktunfähige", "Mietsachschäden"] },
];

const team = [
  { name: "Dr. Michael Weber", role: "Geschäftsführer & Senior-Berater", specialty: "Altersvorsorge & Vermögen", experience: "30 Jahre", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop", certifications: ["Versicherungsfachwirt", "Finanzberater"] },
  { name: "Sandra Hoffmann", role: "Bereichsleiterin Privatkunden", specialty: "Kranken- & Lebensversicherung", experience: "18 Jahre", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop", certifications: ["Versicherungsmaklerin", "Gesundheitsberaterin"] },
  { name: "Thomas Becker", role: "Experte Gewerbekunden", specialty: "Betriebliche Versicherungen", experience: "22 Jahre", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop", certifications: ["Versicherungskaufmann", "Risikomanager"] },
  { name: "Julia Schneider", role: "KFZ-Versicherungs-Expertin", specialty: "Auto & Mobilität", experience: "12 Jahre", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop", certifications: ["KFZ-Sachverständige", "Schadenexpertin"] },
  { name: "Martin Koch", role: "Finanzberater", specialty: "Vorsorge & Investments", experience: "15 Jahre", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop", certifications: ["Finanzfachwirt", "Anlageberater"] },
  { name: "Anna Müller", role: "Kundenbetreuung", specialty: "Service & Bestandsverwaltung", experience: "8 Jahre", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop", certifications: ["Versicherungskauffrau", "Servicemanagement"] },
];

const testimonials = [
  { name: "Familie Schmidt", role: "Privatkunden", text: "Die Beratung war ausgezeichnet! Herr Weber hat uns eine perfekte Altersvorsorge-Lösung zusammengestellt. Wir fühlen uns rundum abgesichert.", rating: 5, project: "Altersvorsorge-Paket", date: "Januar 2024", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=200&fit=crop" },
  { name: "Klaus Bergmann", role: "Geschäftskunde", text: "Professionelle Absicherung unseres Unternehmens. Schnelle Schadensabwicklung und faire Konditionen. Seit 10 Jahren treuer Kunde!", rating: 5, project: "Betriebshaftpflicht", date: "seit 2014", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop" },
  { name: "Lisa Hoffmann", role: "Berufsunfähigkeit", text: "Nach meinem Unfall war VersicherPro sofort für mich da. Die BU-Rente wurde problemlos ausgezahlt. Danke für die Unterstützung!", rating: 5, project: "BU-Versicherung", date: "November 2023", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop" },
  { name: "Peter Krause", role: "KFZ-Versicherung", text: "Bester Service! Nach meinem Autounfall wurde alles schnell und unkompliziert geregelt. Ersatzwagen am gleichen Tag!", rating: 5, project: "Vollkasko-Schaden", date: "Dezember 2023", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=200&fit=crop" },
];

const faqs = [
  { question: "Wie finde ich die richtige Versicherung für mich?", answer: "In einem kostenlosen Beratungsgespräch analysieren wir Ihre persönliche Situation, Ihre Bedürfnisse und Ihr Budget. Basierend darauf erstellen wir ein maßgeschneidertes Versicherungskonzept mit den besten Tarifen aus über 150 Versicherern." },
  { question: "Was kostet die Beratung?", answer: "Unsere Erstberatung ist vollkommen kostenlos und unverbindlich. Als unabhängige Versicherungsmakler erhalten wir Provision von den Versicherern, sodass für Sie keine Beratungskosten anfallen." },
  { question: "Wie schnell erhalte ich im Schadensfall Hilfe?", answer: "Im Schadensfall sind wir sofort für Sie da! Rufen Sie uns an oder nutzen Sie unser 24/7 Online-Portal. Wir kümmern uns um die komplette Schadensabwicklung mit der Versicherung." },
  { question: "Kann ich bestehende Versicherungen überprüfen lassen?", answer: "Ja, absolut! Wir bieten einen kostenlosen Versicherungscheck an. Dabei prüfen wir Ihre bestehenden Verträge auf Lücken, Überschneidungen und Einsparpotenziale." },
  { question: "Welche Versicherungen sind wirklich wichtig?", answer: "Unverzichtbar sind: Privathaftpflicht, Krankenversicherung und Berufsunfähigkeit. Je nach Lebenssituation kommen Hausrat, KFZ und Altersvorsorge hinzu. Wir beraten Sie individuell." },
  { question: "Wie kann ich meine Versicherungen wechseln?", answer: "Wir übernehmen den kompletten Wechselprozess für Sie - von der Kündigung beim alten Anbieter bis zum Neuabschluss. Sie müssen sich um nichts kümmern!" },
];

const blogPosts = [
  { title: "10 Versicherungen die jeder braucht", excerpt: "Welche Versicherungen sind wirklich wichtig? Unser Guide für optimalen Schutz...", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop", date: "10. Jan 2024", category: "Ratgeber" },
  { title: "So sparen Sie bei der KFZ-Versicherung", excerpt: "Mit diesen Tipps senken Sie Ihren Beitrag um bis zu 40%...", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop", date: "05. Jan 2024", category: "Auto" },
  { title: "Altersvorsorge: Je früher, desto besser", excerpt: "Warum Sie bereits mit 25 Jahren an die Rente denken sollten...", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop", date: "28. Dez 2023", category: "Vorsorge" },
];

const partners = [
  "Allianz", "Generali", "AXA", "ERGO", "HDI", "Zurich", "R+V", "HUK-COBURG",
  "Debeka", "Signal Iduna", "Württembergische", "Basler", "Continentale", "LVM"
];

export default function VersicherungTemplateExtended() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Top Banner */}
      {showBanner && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3 text-center text-white shadow-lg"
          style={{ backgroundColor: theme.secondary }}
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 mx-auto">
              <BadgeCheck className="w-4 h-4" />
              <span className="text-sm font-bold">Kostenloser Versicherungscheck | Jetzt Termin vereinbaren!</span>
            </div>
            <button onClick={() => setShowBanner(false)} className="text-white hover:opacity-80">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav
        className="sticky z-40 px-4 py-4 backdrop-blur-lg border-b"
        style={{
          backgroundColor: `${theme.background}95`,
          borderColor: `${theme.primary}20`,
          top: showBanner ? "48px" : "0",
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8" style={{ color: theme.primary }} />
            <span className="text-xl font-bold" style={{ color: theme.primary }}>
              VersicherPro
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#leistungen" className="text-sm font-medium hover:opacity-80 transition">Leistungen</a>
            <a href="#vorteile" className="text-sm font-medium hover:opacity-80 transition">Vorteile</a>
            <a href="#team" className="text-sm font-medium hover:opacity-80 transition">Team</a>
            <a href="#rechner" className="text-sm font-medium hover:opacity-80 transition">Rechner</a>
            <a href="#bewertungen" className="text-sm font-medium hover:opacity-80 transition">Bewertungen</a>
            <a href="#faq" className="text-sm font-medium hover:opacity-80 transition">FAQ</a>
            <a href="#kontakt" className="text-sm font-medium hover:opacity-80 transition">Kontakt</a>
            <Button className="rounded-full font-bold" style={{ backgroundColor: theme.secondary, color: theme.text }}>
              <Calendar className="mr-2 h-4 w-4" />
              Beratung anfragen
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: theme.primary }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="lg:hidden mt-4 pb-4 space-y-3"
          >
            {["Leistungen", "Vorteile", "Team", "Rechner", "Bewertungen", "FAQ", "Kontakt"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-sm font-medium hover:opacity-80 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="w-full rounded-full font-bold" style={{ backgroundColor: theme.secondary, color: theme.text }}>
              Beratung anfragen
            </Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section with 3D */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
              opacity: 0.95,
            }}
          />
        </motion.div>

        {/* 3D Scene */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Suspense fallback={null}>
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} />
              <ProtectionShield />
              <NetworkNodes />
            </Canvas>
          </Suspense>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full mb-6 text-sm font-bold"
                style={{ backgroundColor: theme.secondary, color: theme.text }}
              >
                <Award className="inline w-4 h-4 mr-2" />
                Ausgezeichneter Service seit 1999
              </motion.span>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                IHR SCHUTZ IST<br />UNSERE MISSION
              </h1>

              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Unabhängige Beratung • Maßgeschneiderte Lösungen • 150+ Versicherer
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="rounded-full font-bold text-lg px-8"
                  style={{ backgroundColor: theme.secondary, color: theme.text }}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Beitragsrechner
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full font-bold text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Gratis Ratgeber
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap items-center gap-8 opacity-90">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5" />
                  <span className="text-sm">TÜV-zertifiziert</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">15.000+ Kunden</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" style={{ color: theme.secondary }} />
                  <span className="text-sm">4.9/5 Bewertung</span>
                </div>
              </div>
            </motion.div>

            {/* Calculator Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: theme.primary }}>
                Kostenlos Beitrag berechnen
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Versicherungsart</label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary">
                    <option>Bitte auswählen...</option>
                    <option>Krankenversicherung</option>
                    <option>KFZ-Versicherung</option>
                    <option>Hausratversicherung</option>
                    <option>Berufsunfähigkeit</option>
                    <option>Altersvorsorge</option>
                    <option>Haftpflicht</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Geburtsdatum</label>
                  <Input type="date" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Postleitzahl</label>
                  <Input placeholder="12345" />
                </div>
                <Button
                  className="w-full rounded-full font-bold"
                  size="lg"
                  style={{ backgroundColor: theme.primary }}
                >
                  Jetzt berechnen
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  100% kostenlos • Keine Verpflichtung • Sofort Ergebnis
                </p>
              </form>
            </motion.div>
          </div>
        </div>

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
      </section>

      {/* Partner Logos Section */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold text-gray-600 mb-6">
            Wir vergleichen für Sie über 150 Versicherer
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {partners.slice(0, 8).map((partner, index) => (
              <div key={index} className="text-lg font-bold text-gray-700">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20" style={{ backgroundColor: theme.primary }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "25+", label: "Jahre Erfahrung", icon: Award },
              { number: "15.000+", label: "Zufriedene Kunden", icon: Users },
              { number: "150+", label: "Versicherer-Partner", icon: Target },
              { number: "98%", label: "Weiterempfehlung", icon: TrendingUp },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4" style={{ color: theme.secondary }} />
                <div className="text-5xl font-bold mb-2" style={{ color: theme.secondary }}>
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
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
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.primary }}>
              Unsere Leistungen
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Umfassender Schutz für alle Lebenslagen</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Von der Krankenversicherung bis zur Altersvorsorge – wir finden die optimale Lösung für Sie
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: `${theme.accent}20`, color: theme.primary }}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: theme.primary }}>
                      {service.price}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="group/btn"
                      style={{ color: theme.primary }}
                    >
                      Mehr erfahren
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full font-bold" style={{ backgroundColor: theme.secondary, color: theme.text }}>
              <Calculator className="mr-2 h-5 w-5" />
              Alle Tarife vergleichen
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="vorteile" className="py-20" style={{ backgroundColor: theme.background }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.primary }}>
              Warum VersicherPro
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ihre Vorteile auf einen Blick</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BadgeCheck, title: "Unabhängig", desc: "Zugang zu über 150 Versicherern – wir finden die beste Lösung für Sie, nicht für uns" },
              { icon: Percent, title: "Bis zu 40% sparen", desc: "Durch unseren Vergleich sparen Sie durchschnittlich 40% gegenüber Direktabschlüssen" },
              { icon: Clock, title: "Schneller Service", desc: "24/7 Online-Portal, persönliche Betreuung und schnelle Schadensabwicklung" },
              { icon: Shield, title: "Lebenslanger Schutz", desc: "Wir begleiten Sie ein Leben lang und passen Ihren Schutz an Ihre Lebenssituation an" },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <benefit.icon className="w-8 h-8" style={{ color: theme.primary }} />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.primary }}>
              Unser Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Experten mit Herz und Verstand</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lernen Sie unsere Versicherungs-Profis kennen – Ihr persönlicher Ansprechpartner für alle Fragen
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4" style={{ color: theme.primary }} />
                    <span className="text-sm font-semibold">{member.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4" style={{ color: theme.secondary }} />
                    <span className="text-sm text-gray-600">{member.experience} Erfahrung</span>
                  </div>
                  <div className="space-y-2">
                    {member.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2"
                        style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
                      >
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="rechner" className="py-20" style={{ backgroundColor: theme.background }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <Calculator className="w-16 h-16 mx-auto mb-4" style={{ color: theme.primary }} />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Beitragsrechner</h2>
              <p className="text-lg text-gray-600">
                Berechnen Sie in 2 Minuten, wie viel Sie bei Ihrer Versicherung sparen können
              </p>
            </div>

            <Tabs defaultValue="kfz" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="kfz">KFZ</TabsTrigger>
                <TabsTrigger value="kranken">Kranken</TabsTrigger>
                <TabsTrigger value="hausrat">Hausrat</TabsTrigger>
              </TabsList>

              <TabsContent value="kfz" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Fahrzeugtyp</label>
                    <select className="w-full px-4 py-3 border rounded-lg">
                      <option>PKW</option>
                      <option>Motorrad</option>
                      <option>Transporter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Erstzulassung</label>
                    <Input type="month" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Kennzeichen/PLZ</label>
                  <Input placeholder="12345" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Schadensfreiheitsklasse</label>
                  <select className="w-full px-4 py-3 border rounded-lg">
                    <option>SF 0 (Neuling)</option>
                    <option>SF 1</option>
                    <option>SF 5</option>
                    <option>SF 10</option>
                    <option>SF 20+</option>
                  </select>
                </div>
                <Button className="w-full rounded-full font-bold" size="lg" style={{ backgroundColor: theme.primary }}>
                  Jetzt berechnen & bis zu 850€ sparen
                </Button>
              </TabsContent>

              <TabsContent value="kranken" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Geburtsdatum</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Berufsstatus</label>
                    <select className="w-full px-4 py-3 border rounded-lg">
                      <option>Angestellt</option>
                      <option>Selbstständig</option>
                      <option>Beamter</option>
                      <option>Student</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Gewünschte Leistungen</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Chefarztbehandlung</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Einbettzimmer</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Zahnzusatzversicherung</span>
                    </label>
                  </div>
                </div>
                <Button className="w-full rounded-full font-bold" size="lg" style={{ backgroundColor: theme.primary }}>
                  Tarife vergleichen
                </Button>
              </TabsContent>

              <TabsContent value="hausrat" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Wohnfläche (m²)</label>
                    <Input type="number" placeholder="85" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Postleitzahl</label>
                    <Input placeholder="12345" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Versicherungssumme</label>
                  <select className="w-full px-4 py-3 border rounded-lg">
                    <option>50.000 €</option>
                    <option>75.000 €</option>
                    <option>100.000 €</option>
                    <option>150.000 €</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Zusatzleistungen</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Fahrraddiebstahl (bis 3.000€)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Elementarschäden</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span className="text-sm">Glasbruch</span>
                    </label>
                  </div>
                </div>
                <Button className="w-full rounded-full font-bold" size="lg" style={{ backgroundColor: theme.primary }}>
                  Angebot anfordern
                </Button>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="bewertungen" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.primary }}>
              Kundenstimmen
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Das sagen unsere Kunden</h2>
            <div className="flex items-center justify-center gap-2 text-2xl">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-current" style={{ color: theme.secondary }} />
              ))}
              <span className="ml-4 text-gray-600">4.9 / 5.0</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <img src={testimonial.image} alt={testimonial.project} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" style={{ color: theme.secondary }} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-semibold" style={{ color: theme.primary }}>
                    {testimonial.project}
                  </span>
                  <span>{testimonial.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="rounded-full font-bold">
              <Star className="mr-2 h-5 w-5" />
              Alle 2.347 Bewertungen lesen
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20" style={{ backgroundColor: theme.background }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.primary }}>
              Häufige Fragen
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Antworten auf Ihre Fragen</h2>
            <p className="text-lg text-gray-600">
              Hier finden Sie die wichtigsten Informationen rund um Versicherungen
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl px-6 shadow-md border-none"
                >
                  <AccordionTrigger className="text-left font-bold hover:no-underline py-6">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: theme.primary }} />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6 pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Weitere Fragen? Wir helfen Ihnen gerne weiter!</p>
            <Button size="lg" className="rounded-full font-bold" style={{ backgroundColor: theme.primary }}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Persönliche Beratung anfragen
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.primary }}>
              Ratgeber & News
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Aktuelles aus der Versicherungswelt</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bleiben Sie informiert mit unseren Expertentipps und Neuigkeiten
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: theme.primary }}>
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-opacity-80" style={{ color: theme.text }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Button variant="ghost" size="sm" className="group/btn p-0" style={{ color: theme.primary }}>
                    Weiterlesen
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="rounded-full font-bold">
              <FileText className="mr-2 h-5 w-5" />
              Zum Ratgeber
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20" style={{ backgroundColor: theme.background }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.primary }}>
              Kontakt
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Vereinbaren Sie Ihre kostenlose Beratung</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Persönlich, telefonisch oder per Video-Call – wie es für Sie am besten passt
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-6">Beratung anfragen</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Vorname *</label>
                    <Input placeholder="Max" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nachname *</label>
                    <Input placeholder="Mustermann" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">E-Mail *</label>
                  <Input type="email" placeholder="max@beispiel.de" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Telefon *</label>
                  <Input type="tel" placeholder="+49 123 456789" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Interesse an</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
                    <option>Bitte auswählen...</option>
                    <option>Krankenversicherung</option>
                    <option>KFZ-Versicherung</option>
                    <option>Hausratversicherung</option>
                    <option>Berufsunfähigkeit</option>
                    <option>Altersvorsorge</option>
                    <option>Haftpflichtversicherung</option>
                    <option>Komplettberatung</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Ihre Nachricht</label>
                  <Textarea
                    placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full font-bold"
                  style={{ backgroundColor: theme.primary }}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Jetzt Termin vereinbaren
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  * Pflichtfelder | Wir melden uns innerhalb von 24 Stunden
                </p>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Kontaktinformationen</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary }}>
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Telefon</div>
                      <a href="tel:+491234567890" className="text-lg hover:opacity-80" style={{ color: theme.primary }}>
                        +49 123 456 7890
                      </a>
                      <p className="text-sm text-gray-600">Mo-Fr: 8:00 - 19:00 Uhr | Sa: 9:00 - 14:00 Uhr</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary }}>
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">E-Mail</div>
                      <a href="mailto:beratung@versicherpro.de" className="hover:opacity-80" style={{ color: theme.primary }}>
                        beratung@versicherpro.de
                      </a>
                      <p className="text-sm text-gray-600">Antwort innerhalb 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary }}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Hauptsitz</div>
                      <p className="text-gray-700">
                        Musterstraße 456<br />
                        10115 Berlin<br />
                        Deutschland
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Öffnungszeiten</h3>
                <div className="space-y-3">
                  {[
                    { day: "Montag - Freitag", hours: "8:00 - 19:00 Uhr" },
                    { day: "Samstag", hours: "9:00 - 14:00 Uhr" },
                    { day: "Sonntag", hours: "Geschlossen" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="font-semibold">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Termine auch außerhalb der Öffnungszeiten nach Vereinbarung möglich
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-8 text-white">
                <Shield className="w-12 h-12 mb-4" style={{ color: theme.secondary }} />
                <h3 className="text-2xl font-bold mb-2">Kostenloser Versicherungscheck</h3>
                <p className="mb-4 opacity-90">
                  Lassen Sie Ihre bestehenden Versicherungen kostenlos prüfen und sparen Sie bares Geld!
                </p>
                <Button
                  size="lg"
                  className="w-full rounded-full font-bold"
                  style={{ backgroundColor: theme.secondary, color: theme.text }}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Jetzt Check anfordern
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white" style={{ backgroundColor: theme.primary }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8" style={{ color: theme.secondary }} />
                <span className="text-xl font-bold">VersicherPro</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Ihr unabhängiger Versicherungsmakler mit über 25 Jahren Erfahrung.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: theme.secondary }}
                  >
                    <social.icon className="w-5 h-5" style={{ color: theme.primary }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Versicherungen</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {["Krankenversicherung", "KFZ-Versicherung", "Hausratversicherung", "Berufsunfähigkeit", "Altersvorsorge", "Haftpflicht"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: theme.secondary }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {["Über uns", "Unser Team", "Karriere", "Partner", "Ratgeber", "Kontakt"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: theme.secondary }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-sm text-gray-300 mb-4">
                Monatliche Tipps & Neuigkeiten direkt in Ihr Postfach!
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Ihre E-Mail"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button style={{ backgroundColor: theme.secondary, color: theme.primary }}>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
              <p>© 2024 VersicherPro. Alle Rechte vorbehalten.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition">Impressum</a>
                <a href="#" className="hover:text-white transition">Datenschutz</a>
                <a href="#" className="hover:text-white transition">AGB</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
