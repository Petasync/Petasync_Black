import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, MeshDistortMaterial } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wrench, Car, Settings, Zap, Shield, Clock, Menu, X, Phone, Mail, MapPin, Award, CheckCircle2, Star, Users, Gauge, Cog } from "lucide-react";
import { useState, Suspense } from "react";

const theme = {
  primary: "#DC2626",
  secondary: "#1F2937",
  accent: "#FBBF24",
  background: "#FFFFFF",
  text: "#111827",
};

const AnimatedCar = () => {
  return (
    <Box args={[2, 1, 1]} scale={1.5}>
      <MeshDistortMaterial
        color={theme.primary}
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
      />
    </Box>
  );
};

const AutowerkstattExtended = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("alle");
  const [selectedCarType, setSelectedCarType] = useState("pkw");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const services = [
    {
      icon: Wrench,
      title: "Inspektion & Wartung",
      description: "Regelmäßige Checks nach Herstellervorgaben",
      price: "ab 149€",
      duration: "2-3 Std",
      category: "wartung",
      features: ["Ölwechsel", "Filterwechsel", "Bremsencheck", "Flüssigkeiten auffüllen"]
    },
    {
      icon: Settings,
      title: "Motor & Getriebe",
      description: "Reparatur und Überholung",
      price: "ab 299€",
      duration: "variabel",
      category: "reparatur",
      features: ["Diagnose", "Reparatur", "Austausch", "Garantie"]
    },
    {
      icon: Shield,
      title: "Bremsen & Fahrwerk",
      description: "Sicherheit für Sie und Ihr Auto",
      price: "ab 179€",
      duration: "2-4 Std",
      category: "reparatur",
      features: ["Bremsscheiben", "Bremsbeläge", "Stoßdämpfer", "Spureinstellung"]
    },
    {
      icon: Zap,
      title: "Elektrik & Elektronik",
      description: "Moderne Fahrzeugelektronik",
      price: "ab 89€",
      duration: "1-3 Std",
      category: "elektronik",
      features: ["Fehlerdiagnose", "Software-Update", "Batterietest", "Lichteinstellung"]
    },
    {
      icon: Car,
      title: "Karosserie & Lack",
      description: "Unfallreparatur und Lackierung",
      price: "ab 399€",
      duration: "variabel",
      category: "karosserie",
      features: ["Dellen entfernen", "Lackierung", "Politur", "Versicherungsabwicklung"]
    },
    {
      icon: Gauge,
      title: "TÜV & AU",
      description: "Hauptuntersuchung und Abgastest",
      price: "ab 119€",
      duration: "1-2 Std",
      category: "pruefung",
      features: ["HU vorbereiten", "Abgasuntersuchung", "TÜV-Termin", "Mängelbeseitigung"]
    },
    {
      icon: Cog,
      title: "Klimaservice",
      description: "Klimaanlage warten und befüllen",
      price: "ab 69€",
      duration: "1 Std",
      category: "wartung",
      features: ["Dichtheitsprüfung", "Desinfektion", "Kältemittel auffüllen", "Filterreinigung"]
    },
    {
      icon: Award,
      title: "Tuning & Performance",
      description: "Leistungssteigerung für Ihr Fahrzeug",
      price: "ab 499€",
      duration: "variabel",
      category: "tuning",
      features: ["Chiptuning", "Sportauspuff", "Sportfahrwerk", "TÜV-Abnahme"]
    },
  ];

  const team = [
    {
      name: "Michael Schneider",
      role: "Werkstattleiter & Kfz-Meister",
      specialty: "Motor & Getriebe",
      experience: "20 Jahre",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      certifications: ["Kfz-Meister", "Bosch Service", "Mercedes Spezialist"]
    },
    {
      name: "Thomas Wagner",
      role: "Kfz-Mechatroniker",
      specialty: "Elektronik & Diagnose",
      experience: "15 Jahre",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      certifications: ["Mechatroniker", "HV-Technik", "BMW zertifiziert"]
    },
    {
      name: "Stefan Koch",
      role: "Karosserie & Lackierer",
      specialty: "Unfallreparatur",
      experience: "12 Jahre",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      certifications: ["Lackierer-Meister", "Smart Repair", "Glasurit Partner"]
    },
    {
      name: "Daniel Becker",
      role: "Kfz-Mechatroniker",
      specialty: "Bremsen & Fahrwerk",
      experience: "10 Jahre",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      certifications: ["TÜV-Prüfer", "Fahrwerk-Spezialist", "VW zertifiziert"]
    },
  ];

  const packages = [
    {
      name: "Basic Check",
      price: "89€",
      duration: "1 Std",
      features: [
        "Sichtprüfung",
        "Ölstand prüfen",
        "Reifendruck prüfen",
        "Beleuchtung testen",
        "Batterie testen"
      ]
    },
    {
      name: "Service Paket",
      price: "249€",
      duration: "3 Std",
      popular: true,
      features: [
        "Ölwechsel inkl. Filter",
        "Luftfilter wechseln",
        "Innenraumfilter wechseln",
        "Alle Flüssigkeiten prüfen",
        "Bremsen prüfen",
        "Fahrwerk prüfen",
        "Elektronik-Diagnose",
        "Kostenlose Wagenwäsche"
      ]
    },
    {
      name: "Premium Service",
      price: "449€",
      duration: "5 Std",
      features: [
        "Komplett-Service",
        "Alle Filter wechseln",
        "Bremsflüssigkeit wechseln",
        "Klimaservice",
        "Zahnriemen prüfen",
        "Detaillierte Diagnose",
        "TÜV-Vorbereitung",
        "Innen- & Außenreinigung",
        "1 Jahr Mobilitätsgarantie"
      ]
    },
  ];

  const testimonials = [
    {
      name: "Markus Weber",
      text: "Schneller und zuverlässiger Service. Das Team hat mein Auto top in Schuss gebracht. Preis-Leistung stimmt!",
      rating: 5,
      service: "Inspektion",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100"
    },
    {
      name: "Andreas Schmidt",
      text: "Beste Werkstatt in der Region! Ehrliche Beratung, faire Preise und top Arbeit. Kann ich nur empfehlen!",
      rating: 5,
      service: "Motor-Reparatur",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100"
    },
    {
      name: "Peter Müller",
      text: "Nach einem Unfall wurde mein Auto perfekt repariert. Die Versicherungsabwicklung lief problemlos.",
      rating: 5,
      service: "Unfallreparatur",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
    },
    {
      name: "Thomas Klein",
      text: "Kompetente Beratung beim Chiptuning. Mehr Leistung, weniger Verbrauch - genau wie versprochen!",
      rating: 5,
      service: "Tuning",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
  ];

  const faqItems = [
    {
      question: "Wie oft sollte ich mein Auto zur Inspektion bringen?",
      answer: "Die Intervalle hängen vom Hersteller ab. In der Regel empfehlen wir eine Inspektion alle 15.000-30.000 km oder einmal jährlich. Schauen Sie in Ihr Serviceheft oder fragen Sie uns - wir beraten Sie gerne!"
    },
    {
      question: "Kann ich während der Reparatur ein Ersatzfahrzeug bekommen?",
      answer: "Ja! Wir bieten Leihwagen zu fairen Konditionen an. Bei größeren Reparaturen oder wenn Ihr Auto länger als einen Tag bei uns ist, arrangieren wir gerne ein Ersatzfahrzeug für Sie."
    },
    {
      question: "Verliere ich meine Herstellergarantie bei freien Werkstätten?",
      answer: "Nein! Seit der EU-Verordnung können Sie Ihr Auto auch bei freien Werkstätten warten lassen, ohne die Garantie zu verlieren. Wichtig ist nur, dass Originalteile verwendet und Herstellervorgaben eingehalten werden - was wir selbstverständlich tun."
    },
    {
      question: "Macht ihr auch TÜV?",
      answer: "Ja, wir bereiten Ihr Fahrzeug optimal auf die HU vor und haben einen TÜV-Prüfer direkt vor Ort. Sie bekommen bei uns alles aus einer Hand - von der Vorbereitung bis zur Plakette."
    },
    {
      question: "Bietet ihr auch einen Hol- und Bringservice an?",
      answer: "Ja! Innerhalb von 20 km holen wir Ihr Fahrzeug kostenlos ab und bringen es nach der Reparatur wieder zurück. Perfekt für alle, die wenig Zeit haben oder deren Auto nicht mehr fahrtüchtig ist."
    },
    {
      question: "Was kostet eine Fehlerdiagnose?",
      answer: "Die Computer-Diagnose kostet bei uns 49€. Sollten Sie die Reparatur bei uns durchführen lassen, wird dieser Betrag selbstverständlich angerechnet."
    },
  ];

  const blogPosts = [
    {
      title: "Winterreifen: Wann ist der richtige Zeitpunkt?",
      excerpt: "Die O-bis-O-Regel und weitere Tipps für den Reifenwechsel im Herbst.",
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400",
      date: "20. Dez 2024",
      category: "Tipps"
    },
    {
      title: "5 Anzeichen, dass Ihre Bremsen geprüft werden sollten",
      excerpt: "Diese Warnsignale sollten Sie nicht ignorieren - Ihre Sicherheit steht an erster Stelle.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
      date: "15. Dez 2024",
      category: "Sicherheit"
    },
    {
      title: "Chiptuning: Mehr Leistung, mehr Fahrspaß",
      excerpt: "Was Sie über Chiptuning wissen sollten - von Leistungssteigerung bis TÜV-Abnahme.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400",
      date: "10. Dez 2024",
      category: "Tuning"
    },
  ];

  const filteredServices = selectedCategory === "alle"
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-2xl font-bold flex items-center gap-2"
              style={{ color: theme.primary }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Wrench className="inline" />
              Auto-Werkstatt Pro
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">
              <a href="#services" className="hover:text-red-600 transition-colors font-medium">Services</a>
              <a href="#team" className="hover:text-red-600 transition-colors font-medium">Team</a>
              <a href="#preise" className="hover:text-red-600 transition-colors font-medium">Preise</a>
              <a href="#kontakt" className="hover:text-red-600 transition-colors font-medium">Kontakt</a>
              <Button style={{ backgroundColor: theme.primary }}>
                <Phone className="mr-2 h-4 w-4" />
                0800 123 456
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 flex flex-col gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <a href="#services" className="hover:text-red-600 transition-colors">Services</a>
              <a href="#team" className="hover:text-red-600 transition-colors">Team</a>
              <a href="#preise" className="hover:text-red-600 transition-colors">Preise</a>
              <a href="#kontakt" className="hover:text-red-600 transition-colors">Kontakt</a>
              <Button style={{ backgroundColor: theme.primary }} className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Jetzt anrufen
              </Button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Emergency Banner */}
      <div style={{ backgroundColor: theme.accent }} className="py-2 mt-16 text-center font-semibold text-gray-900">
        <Clock className="inline mr-2 h-4 w-4" />
        Pannenhilfe 24/7 verfügbar: 0800 123 456
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-8 px-4 relative overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-red-50 to-yellow-50" />}>
            <Canvas>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <AnimatedCar />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </Suspense>
        </motion.div>

        <div className="container mx-auto text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-red-100 rounded-full">
              <Award style={{ color: theme.primary }} />
              <span style={{ color: theme.primary }} className="font-semibold">
                Top Werkstatt 2024 - ADAC Bewertung 5/5
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Ihre Kfz-Werkstatt
              <span style={{ color: theme.primary }}> mit Herz</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600">
              Professionelle Reparatur, Wartung und Service für alle Fahrzeugmarken.
              Faire Preise, ehrliche Beratung, schneller Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" style={{ backgroundColor: theme.primary }} className="text-lg px-8">
                <Phone className="mr-2" />
                Termin vereinbaren
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-red-600 text-red-600 hover:bg-red-50">
                <Car className="mr-2" />
                Kostenvoranschlag
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-red-100">Jahre Erfahrung</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">5.000+</div>
              <div className="text-red-100">Reparierte Fahrzeuge</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-red-100">Kundenzufriedenheit</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-red-100">Pannenhilfe</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Unsere <span style={{ color: theme.primary }}>Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Von Inspektion bis Tuning - wir kümmern uns um Ihr Fahrzeug
              mit modernster Technik und viel Erfahrung
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["alle", "wartung", "reparatur", "elektronik", "karosserie", "pruefung", "tuning"].map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                style={selectedCategory === cat ? { backgroundColor: theme.primary } : {}}
                className={selectedCategory !== cat ? "border-red-300 text-red-600 hover:bg-red-50" : ""}
              >
                {cat === "alle" ? "Alle Services" :
                 cat === "wartung" ? "Wartung" :
                 cat === "reparatur" ? "Reparatur" :
                 cat === "elektronik" ? "Elektronik" :
                 cat === "karosserie" ? "Karosserie" :
                 cat === "pruefung" ? "TÜV & Prüfung" : "Tuning"}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-red-100">
                  <CardHeader>
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${theme.primary}15` }}
                    >
                      <service.icon size={28} style={{ color: theme.primary }} />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="text-sm">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xl font-bold" style={{ color: theme.primary }}>
                        {service.price}
                      </span>
                      <span className="text-gray-600 text-sm flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {service.duration}
                      </span>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle2 className="mr-2 h-3 w-3 flex-shrink-0" style={{ color: theme.accent }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      size="sm"
                      style={{ backgroundColor: theme.primary }}
                    >
                      Anfragen
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Unser <span style={{ color: theme.primary }}>Experten-Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hochqualifizierte Kfz-Mechatroniker und Meister mit Leidenschaft für Autos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-red-100">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {member.experience}
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-base">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center text-gray-600">
                        <Award className="mr-2 h-4 w-4" style={{ color: theme.primary }} />
                        {member.specialty}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {member.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${theme.accent}30`, color: theme.text }}
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="preise" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Service <span style={{ color: theme.primary }}>Pakete</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparente Preise, faire Konditionen - wählen Sie das passende Paket für Ihr Auto
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${pkg.popular ? 'ring-4 ring-red-500 shadow-2xl scale-105' : 'hover:shadow-xl'} transition-all duration-300 border-red-100`}>
                  {pkg.popular && (
                    <div
                      className="text-center py-2 text-white font-semibold"
                      style={{ backgroundColor: theme.primary }}
                    >
                      ⭐ EMPFOHLEN
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                    <div className="text-5xl font-bold my-4" style={{ color: theme.primary }}>
                      {pkg.price}
                    </div>
                    <CardDescription className="text-base flex items-center justify-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {pkg.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: theme.accent }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      style={pkg.popular ? { backgroundColor: theme.primary } : {}}
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Termin buchen
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Das sagen unsere <span style={{ color: theme.primary }}>Kunden</span>
            </h2>
            <p className="text-xl text-gray-600">
              Über 5.000 zufriedene Autobesitzer vertrauen uns
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-red-100">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.service}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" style={{ color: theme.accent }} />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Häufige <span style={{ color: theme.primary }}>Fragen</span>
            </h2>
            <p className="text-xl text-gray-600">
              Alles, was Sie über unsere Werkstatt wissen müssen
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow border-red-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start">
                      <Wrench className="mr-2 flex-shrink-0 mt-1" style={{ color: theme.primary }} />
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Auto <span style={{ color: theme.primary }}>Ratgeber</span>
            </h2>
            <p className="text-xl text-gray-600">
              Nützliche Tipps rund um Ihr Fahrzeug
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-red-100">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs px-3 py-1 rounded-full font-semibold"
                        style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
                      >
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <CardTitle className="text-xl hover:text-red-600 transition-colors cursor-pointer">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                      Weiterlesen →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Termin <span style={{ color: theme.primary }}>vereinbaren</span>
            </h2>
            <p className="text-xl text-gray-600">
              Wir sind für Sie da - telefonisch, per E-Mail oder vor Ort
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-red-100">
                <CardHeader>
                  <CardTitle>Termin-Anfrage</CardTitle>
                  <CardDescription>
                    Schildern Sie uns Ihr Anliegen und wir melden uns schnellstmöglich
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <Input placeholder="Ihr Name" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">E-Mail *</label>
                      <Input type="email" placeholder="ihre@email.de" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Telefon</label>
                      <Input type="tel" placeholder="0123 456789" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Fahrzeugmarke</label>
                        <Input placeholder="z.B. VW, BMW" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Modell</label>
                        <Input placeholder="z.B. Golf, 3er" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Service</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={selectedCarType}
                        onChange={(e) => setSelectedCarType(e.target.value)}
                      >
                        <option value="inspektion">Inspektion</option>
                        <option value="reparatur">Reparatur</option>
                        <option value="tuev">TÜV</option>
                        <option value="diagnose">Fehlerdiagnose</option>
                        <option value="bremsen">Bremsenservice</option>
                        <option value="klima">Klimaservice</option>
                        <option value="sonstiges">Sonstiges</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Wunschtermin</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Beschreibung</label>
                      <Textarea
                        placeholder="Beschreiben Sie bitte Ihr Anliegen oder Problem..."
                        rows={4}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      style={{ backgroundColor: theme.primary }}
                    >
                      Anfrage senden
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2" style={{ color: theme.primary }} />
                    Standort
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Auto-Werkstatt Pro<br />
                    Industriestraße 45<br />
                    70565 Stuttgart
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2" style={{ color: theme.primary }} />
                    Öffnungszeiten
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Montag - Freitag:</span>
                      <span className="font-semibold">7:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samstag:</span>
                      <span className="font-semibold">8:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sonntag:</span>
                      <span className="font-semibold">Geschlossen</span>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between text-red-600 font-semibold">
                        <span>Pannendienst:</span>
                        <span>24/7</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2" style={{ color: theme.primary }} />
                    Kontakt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="mr-3 h-5 w-5" style={{ color: theme.primary }} />
                    <span>0711 123 456</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Zap className="mr-3 h-5 w-5" style={{ color: theme.primary }} />
                    <span>0800 123 456 (Pannendienst)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="mr-3 h-5 w-5" style={{ color: theme.primary }} />
                    <span>service@autowerkstatt-pro.de</span>
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: theme.primary }} className="text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="mr-2" />
                    Leihwagen-Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Während Ihr Auto bei uns ist, stellen wir Ihnen gerne ein
                    Ersatzfahrzeug zur Verfügung!
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full"
                    style={{ backgroundColor: 'white', color: theme.primary }}
                  >
                    Leihwagen anfragen
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: theme.secondary }} className="text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wrench size={24} style={{ color: theme.primary }} />
                <span className="text-xl font-bold">Auto-Werkstatt Pro</span>
              </div>
              <p className="text-gray-400 mb-4">
                Ihre zuverlässige Kfz-Werkstatt in Stuttgart. Qualität, Service und
                faire Preise seit über 20 Jahren.
              </p>
              <div className="flex gap-4">
                <Award className="cursor-pointer hover:text-red-400 transition-colors" />
                <Users className="cursor-pointer hover:text-red-400 transition-colors" />
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4" style={{ color: theme.primary }}>Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Inspektion</li>
                <li className="hover:text-white cursor-pointer transition-colors">Reparaturen</li>
                <li className="hover:text-white cursor-pointer transition-colors">TÜV & AU</li>
                <li className="hover:text-white cursor-pointer transition-colors">Karosserie</li>
                <li className="hover:text-white cursor-pointer transition-colors">Tuning</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4" style={{ color: theme.primary }}>Kontakt</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Industriestraße 45</li>
                <li>70565 Stuttgart</li>
                <li>Tel: 0711 123 456</li>
                <li>Panne: 0800 123 456</li>
                <li>service@autowerkstatt-pro.de</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4" style={{ color: theme.primary }}>Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Auto-Tipps und exklusive Angebote direkt in Ihr Postfach!
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Ihre E-Mail"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button style={{ backgroundColor: theme.primary }}>
                  →
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Auto-Werkstatt Pro. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AutowerkstattExtended;
