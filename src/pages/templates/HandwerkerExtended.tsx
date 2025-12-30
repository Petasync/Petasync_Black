import { useState, useEffect, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Hammer, Wrench, Drill, Phone, Mail, MapPin, Clock, Star, Award,
  CheckCircle, ArrowRight, Calendar, Calculator, MessageCircle, Menu, X,
  Zap, Shield, Users, TrendingUp, Facebook, Instagram, Linkedin, Youtube,
  Home, Briefcase, FileText, HelpCircle, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RotatingToolbox, FloatingTools } from "@/components/3d/HandwerkerModels";

const theme = {
  primary: "#FF6B35",
  secondary: "#2D3142",
  accent: "#F4B860",
  background: "#F8F9FA",
  text: "#1A1A1A",
};

const services = [
  { icon: Zap, title: "Elektro-Installationen", desc: "Professionelle Elektroarbeiten für Neu- und Altbau", price: "ab 89€/h", image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop", url: "/templates/handwerker/elektro-installationen" },
  { icon: Wrench, title: "Sanitär & Heizung", desc: "Rohrinstallation, Reparaturen und Wartung", price: "ab 79€/h", image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop", url: "/templates/handwerker/sanitaer-heizung" },
  { icon: Hammer, title: "Schreiner-Arbeiten", desc: "Maßanfertigungen aus Holz für jeden Raum", price: "ab 75€/h", image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&h=400&fit=crop", url: "/templates/handwerker/schreiner-arbeiten" },
  { icon: Drill, title: "Maler-Arbeiten", desc: "Innen- und Außenanstriche in Top-Qualität", price: "ab 49€/h", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop", url: "/templates/handwerker/maler-arbeiten" },
  { icon: Home, title: "Renovierungen", desc: "Komplette Badsanierung bis Dachausbau", price: "auf Anfrage", image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&h=400&fit=crop", url: "/templates/handwerker/renovierungen" },
  { icon: Shield, title: "Wartung & Service", desc: "Regelmäßige Inspektionen für Ihre Immobilie", price: "ab 120€", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop", url: "/templates/handwerker/wartung-service" },
];

const projects = [
  { title: "Komplette Badsanierung", category: "Sanitär", before: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop", after: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop", duration: "3 Wochen" },
  { title: "Moderne Küchen-Installation", category: "Schreiner", before: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&h=400&fit=crop", after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop", duration: "2 Wochen" },
  { title: "Smarthome Elektro-System", category: "Elektriker", before: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop", after: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop", duration: "1 Woche" },
  { title: "Fassaden-Neugestaltung", category: "Maler", before: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&h=400&fit=crop", after: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop", duration: "4 Wochen" },
  { title: "Dachboden-Ausbau", category: "Renovierung", before: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&h=400&fit=crop", after: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop", duration: "6 Wochen" },
  { title: "Heizungssystem-Modernisierung", category: "Heizung", before: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop", after: "https://images.unsplash.com/photo-1635655051020-4adda46cc2c7?w=600&h=400&fit=crop", duration: "2 Wochen" },
];

const team = [
  { name: "Thomas Müller", role: "Geschäftsführer & Meister", specialty: "Elektrotechnik", experience: "25 Jahre", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop", certifications: ["Elektromeister", "Energieberater"] },
  { name: "Stefan Weber", role: "Sanitärmeister", specialty: "Bad & Heizung", experience: "18 Jahre", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop", certifications: ["Installateur-Meister", "Gas-Wasser"] },
  { name: "Michael Schmidt", role: "Schreinermeister", specialty: "Möbelbau", experience: "20 Jahre", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop", certifications: ["Tischlermeister", "Restaurator"] },
  { name: "Andreas Koch", role: "Malermeister", specialty: "Fassaden", experience: "15 Jahre", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop", certifications: ["Malermeister", "Lackierer"] },
  { name: "Lisa Hoffmann", role: "Büroleitung", specialty: "Kundenbetreuung", experience: "10 Jahre", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop", certifications: ["Kauffrau", "Projektmanagement"] },
  { name: "Marco Bauer", role: "Geselle", specialty: "Renovierung", experience: "8 Jahre", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop", certifications: ["Trockenbauer", "Bodenleger"] },
];

const testimonials = [
  { name: "Familie Schmidt", role: "Badsanierung", text: "Absolut professionelle Arbeit! Von der Planung bis zur Umsetzung alles perfekt. Unser neues Bad ist ein Traum geworden.", rating: 5, project: "Komplette Badsanierung", date: "Dezember 2023", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop" },
  { name: "Markus Weber GmbH", role: "Geschäftskunde", text: "Seit 5 Jahren unser Partner für alle Elektroarbeiten. Zuverlässig, pünktlich und faire Preise. Absolute Empfehlung!", rating: 5, project: "Wartungsvertrag", date: "seit 2018", image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop" },
  { name: "Anna Hoffmann", role: "Küchen-Installation", text: "Die neue Küche wurde perfekt eingebaut. Sehr saubere Arbeit und tolle Beratung. Danke an das ganze Team!", rating: 5, project: "Küchen-Montage", date: "November 2023", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop" },
  { name: "Peter Krause", role: "Fassaden-Anstrich", text: "Notdienst innerhalb von 30 Minuten vor Ort gewesen! Professionell und schnell. Kann ich nur empfehlen.", rating: 5, project: "Notdienst Wasserrohrbruch", date: "Oktober 2023", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop" },
];

const faqs = [
  { question: "Bieten Sie auch Notdienst an?", answer: "Ja! Unser 24/7 Notdienst ist rund um die Uhr erreichbar unter 0800 123 4567. Wir sind in der Regel innerhalb von 30-60 Minuten vor Ort." },
  { question: "Wie lange im Voraus muss ich einen Termin buchen?", answer: "Für normale Aufträge empfehlen wir eine Vorlaufzeit von 1-2 Wochen. Dringende Reparaturen können oft innerhalb von 2-3 Tagen durchgeführt werden." },
  { question: "Erstellen Sie kostenlose Kostenvoranschläge?", answer: "Ja, alle Kostenvoranschläge sind bei uns kostenlos und unverbindlich. Nach einem Vor-Ort-Termin erhalten Sie ein detailliertes Angebot." },
  { question: "Welche Zahlungsmöglichkeiten gibt es?", answer: "Wir akzeptieren Barzahlung, EC-Karte, Überweisung und nach Absprache auch Ratenzahlung für größere Projekte." },
  { question: "Haben Sie eine Garantie auf Ihre Arbeiten?", answer: "Selbstverständlich! Wir geben 2 Jahre Gewährleistung auf alle unsere Handwerksleistungen. Bei verwendeten Materialien gilt die Herstellergarantie." },
  { question: "Arbeiten Sie auch für Geschäftskunden?", answer: "Ja, wir betreuen sowohl Privat- als auch Geschäftskunden. Für Firmen bieten wir auch Wartungsverträge an." },
];

const blogPosts = [
  { title: "10 Tipps für die perfekte Badsanierung", excerpt: "Was Sie bei der Planung Ihres neuen Badezimmers beachten sollten...", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop", date: "15. Dez 2023", category: "Renovierung" },
  { title: "Smarthome: Elektro-Installation der Zukunft", excerpt: "Moderne Elektrotechnik für mehr Komfort und Energieeffizienz...", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop", date: "08. Dez 2023", category: "Elektro" },
  { title: "Heizkosten sparen: Moderne Heizsysteme im Vergleich", excerpt: "Welche Heizung passt zu Ihrem Zuhause? Unser Ratgeber...", image: "https://images.unsplash.com/photo-1635655051020-4adda46cc2c7?w=600&h=400&fit=crop", date: "01. Dez 2023", category: "Heizung" },
];

export default function HandwerkerTemplateExtended() {
  const [showNotdienst, setShowNotdienst] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Notdienst Banner */}
      {showNotdienst && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3 text-center text-white shadow-lg"
          style={{ backgroundColor: theme.primary }}
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 mx-auto">
              <Phone className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-bold">24/7 Notdienst: 0800 123 4567 | Innerhalb 30 Min vor Ort!</span>
            </div>
            <button onClick={() => setShowNotdienst(false)} className="text-white hover:opacity-80">
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
          borderColor: `${theme.secondary}20`,
          top: showNotdienst ? "48px" : "0",
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hammer className="w-8 h-8" style={{ color: theme.primary }} />
            <span className="text-xl font-bold" style={{ color: theme.secondary }}>
              Handwerk Pro
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium hover:opacity-80 transition">Leistungen</a>
            <a href="#projekte" className="text-sm font-medium hover:opacity-80 transition">Projekte</a>
            <a href="#team" className="text-sm font-medium hover:opacity-80 transition">Team</a>
            <a href="#preise" className="text-sm font-medium hover:opacity-80 transition">Preise</a>
            <a href="#bewertungen" className="text-sm font-medium hover:opacity-80 transition">Bewertungen</a>
            <a href="#faq" className="text-sm font-medium hover:opacity-80 transition">FAQ</a>
            <a href="#blog" className="text-sm font-medium hover:opacity-80 transition">Blog</a>
            <a href="#kontakt" className="text-sm font-medium hover:opacity-80 transition">Kontakt</a>
            <Button className="rounded-full font-bold" style={{ backgroundColor: theme.primary, color: "white" }}>
              <Calendar className="mr-2 h-4 w-4" />
              Termin buchen
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
            {["Services", "Projekte", "Team", "Preise", "Bewertungen", "FAQ", "Blog", "Kontakt"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-sm font-medium hover:opacity-80 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="w-full rounded-full font-bold" style={{ backgroundColor: theme.primary }}>
              Termin buchen
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
              background: `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.primary} 100%)`,
              opacity: 0.9,
            }}
          />
        </motion.div>

        {/* 3D Scene */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Suspense fallback={null}>
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} />
              <RotatingToolbox />
              <FloatingTools />
            </Canvas>
          </Suspense>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: theme.accent, color: theme.text }}
            >
              <Award className="inline w-4 h-4 mr-2" />
              Meisterbetrieb seit 1998
            </motion.span>

            <h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              PROFESSIONELLES HANDWERK<br />AUS IHRER REGION
            </h1>

            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Elektro • Sanitär • Schreiner • Maler<br />
              Ihr zuverlässiger Partner für alle Handwerksleistungen
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full font-bold text-lg px-8"
                style={{ backgroundColor: theme.accent, color: theme.text }}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Jetzt Termin vereinbaren
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full font-bold text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-gray-900"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Kostenrechner
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-80">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">TÜV-zertifiziert</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">500+ Projekte</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" style={{ color: theme.accent }} />
                <span className="text-sm">4.9/5 Bewertung</span>
              </div>
            </div>
          </motion.div>
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

      {/* Services Section - Erweitert */}
      <section id="services" className="py-20 relative">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Alles aus einer Hand</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Von der Beratung bis zur Umsetzung – wir bieten professionelle Handwerksleistungen in allen Bereichen
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
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: theme.primary }}>
                      {service.price}
                    </span>
                    <Link to={service.url}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="group/btn"
                        style={{ color: theme.primary }}
                      >
                        Mehr erfahren
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "25+", label: "Jahre Erfahrung", icon: Award },
              { number: "500+", label: "Abgeschlossene Projekte", icon: CheckCircle },
              { number: "98%", label: "Zufriedene Kunden", icon: Users },
              { number: "24/7", label: "Notdienst verfügbar", icon: Clock },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4" style={{ color: theme.accent }} />
                <div className="text-5xl font-bold mb-2" style={{ color: theme.accent }}>
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Vorher/Nachher */}
      <section id="projekte" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.primary }}>
              Unsere Referenzen
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Projekte die überzeugen</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sehen Sie selbst: Vorher-Nachher Bilder unserer erfolgreich umgesetzten Projekte
            </p>
          </motion.div>

          <Tabs defaultValue="0" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
              {projects.map((project, index) => (
                <TabsTrigger key={index} value={String(index)} className="text-xs md:text-sm">
                  {project.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {projects.map((project, index) => (
              <TabsContent key={index} value={String(index)}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Before */}
                    <div className="relative group">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.before}
                          alt="Vorher"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white font-bold rounded-full">
                        VORHER
                      </div>
                    </div>

                    {/* After */}
                    <div className="relative group">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.after}
                          alt="Nachher"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute top-4 left-4 px-4 py-2 text-white font-bold rounded-full" style={{ backgroundColor: theme.primary }}>
                        NACHHER
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: `${theme.accent}30`, color: theme.secondary }}>
                        {project.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Dauer: {project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" style={{ color: theme.primary }} />
                        <span>Erfolgreich abgeschlossen</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full font-bold" style={{ backgroundColor: theme.primary }}>
              <Briefcase className="mr-2 h-5 w-5" />
              Alle Projekte ansehen
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20" style={{ backgroundColor: theme.background }}>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Die Experten hinter Ihrer Zufriedenheit</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lernen Sie unser erfahrenes Team kennen – Meister ihres Fachs mit Leidenschaft fürs Handwerk
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
                    <Wrench className="w-4 h-4" style={{ color: theme.primary }} />
                    <span className="text-sm font-semibold">{member.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4" style={{ color: theme.accent }} />
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

      {/* Pricing Section */}
      <section id="preise" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.primary }}>
              Transparente Preise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Faire Stundensätze ohne versteckte Kosten</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Alle Preise inkl. MwSt. | Kostenloser Kostenvoranschlag | Keine Anfahrtskosten im Umkreis von 30km
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Standard", price: "49€", period: "pro Stunde", features: ["Maler-Arbeiten", "Kleinreparaturen", "Montagearbeiten", "Beratung inklusive"], popular: false },
              { name: "Premium", price: "79€", period: "pro Stunde", features: ["Sanitär & Heizung", "Schreiner-Arbeiten", "Fliesen-Arbeiten", "Material-Beschaffung", "2 Jahre Garantie"], popular: true },
              { name: "Meister", price: "89€", period: "pro Stunde", features: ["Elektro-Installation", "Komplexe Projekte", "Notdienst-Service", "Planung & Beratung", "5 Jahre Garantie", "Zertifizierung"], popular: false },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "bg-white rounded-2xl p-8 shadow-lg relative",
                  plan.popular && "ring-4 scale-105"
                )}
                style={plan.popular ? { ringColor: theme.primary } : {}}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-white font-bold text-sm"
                    style={{ backgroundColor: theme.primary }}
                  >
                    BELIEBTESTE
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-end justify-center gap-2">
                    <span className="text-5xl font-bold" style={{ color: theme.primary }}>
                      {plan.price}
                    </span>
                    <span className="text-gray-600 mb-2">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: theme.primary }} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full rounded-full font-bold"
                  style={plan.popular ? { backgroundColor: theme.primary } : { backgroundColor: theme.secondary }}
                >
                  Jetzt anfragen
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Größere Projekte? Wir erstellen Ihnen gerne ein individuelles Festpreisangebot!
            </p>
            <Button size="lg" variant="outline" className="rounded-full font-bold">
              <Calculator className="mr-2 h-5 w-5" />
              Kostenrechner starten
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="bewertungen" className="py-20" style={{ backgroundColor: theme.background }}>
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
                <Star key={i} className="w-8 h-8 fill-current" style={{ color: theme.accent }} />
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
                        <Star key={i} className="w-4 h-4 fill-current" style={{ color: theme.accent }} />
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
              Alle 127 Bewertungen lesen
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Hier finden Sie Antworten</h2>
            <p className="text-lg text-gray-600">
              Noch Fragen? Rufen Sie uns an oder schreiben Sie uns eine Nachricht!
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
            <p className="text-gray-600 mb-4">Ihre Frage war nicht dabei?</p>
            <Button size="lg" className="rounded-full font-bold" style={{ backgroundColor: theme.primary }}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Persönliche Beratung anfragen
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20" style={{ backgroundColor: theme.background }}>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Wissenswertes aus dem Handwerk</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tipps, Trends und Expertenwissen für Ihr Zuhause
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
                  <h3 className="text-xl font-bold mb-3 group-hover:text-opacity-80" style={{ color: theme.secondary }}>
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
              Zum Blog
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.primary }}>
              Kontakt aufnehmen
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Lassen Sie uns sprechen</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kostenlose Beratung & unverbindliches Angebot in 24 Stunden
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
              <h3 className="text-2xl font-bold mb-6">Anfrage senden</h3>
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
                  <label className="block text-sm font-semibold mb-2">Service</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
                    <option>Bitte auswählen...</option>
                    <option>Elektro-Installationen</option>
                    <option>Sanitär & Heizung</option>
                    <option>Schreiner-Arbeiten</option>
                    <option>Maler-Arbeiten</option>
                    <option>Renovierung</option>
                    <option>Wartung & Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Ihre Nachricht *</label>
                  <Textarea
                    placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full font-bold"
                  style={{ backgroundColor: theme.primary }}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Anfrage absenden
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  * Pflichtfelder | Wir antworten innerhalb von 24 Stunden
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
                      <p className="text-sm text-gray-600">Mo-Fr: 7:00 - 18:00 Uhr</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary }}>
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">24/7 Notdienst</div>
                      <a href="tel:+498001234567" className="text-lg hover:opacity-80" style={{ color: theme.primary }}>
                        0800 123 4567
                      </a>
                      <p className="text-sm text-gray-600">Rund um die Uhr erreichbar</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary }}>
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">E-Mail</div>
                      <a href="mailto:info@handwerk-pro.de" className="hover:opacity-80" style={{ color: theme.primary }}>
                        info@handwerk-pro.de
                      </a>
                      <p className="text-sm text-gray-600">Antwort innerhalb 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary }}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Adresse</div>
                      <p className="text-gray-700">
                        Musterstraße 123<br />
                        12345 Musterstadt<br />
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
                    { day: "Montag - Freitag", hours: "7:00 - 18:00 Uhr" },
                    { day: "Samstag", hours: "8:00 - 14:00 Uhr" },
                    { day: "Sonntag", hours: "Notdienst verfügbar" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="font-semibold">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
                <Zap className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Notfall?</h3>
                <p className="mb-4 opacity-90">
                  Bei Wasserrohrbruch, Stromausfall oder anderen Notfällen sind wir 24/7 für Sie da!
                </p>
                <Button
                  size="lg"
                  className="w-full bg-white text-orange-600 hover:bg-gray-100 rounded-full font-bold"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Notdienst anrufen
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hammer className="w-8 h-8" style={{ color: theme.primary }} />
                <span className="text-xl font-bold">Handwerk Pro</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Ihr zuverlässiger Meisterbetrieb für alle Handwerksleistungen seit 1998.
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
                    style={{ backgroundColor: theme.primary }}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Leistungen</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Elektro-Installationen", "Sanitär & Heizung", "Schreiner-Arbeiten", "Maler-Arbeiten", "Renovierungen", "Wartung & Service"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: theme.primary }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Über uns", "Unser Team", "Karriere", "Referenzen", "Blog", "Kontakt"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: theme.primary }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">
                Bleiben Sie informiert über Tipps, Angebote und Neuigkeiten!
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Ihre E-Mail"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button style={{ backgroundColor: theme.primary }}>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>© 2024 Handwerk Pro. Alle Rechte vorbehalten.</p>
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
