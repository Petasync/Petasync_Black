import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Scissors, Sparkles, Heart, Award, Clock, Star, Menu, X, Calendar, Phone, Mail, MapPin, Instagram, Facebook, Users, Palette, Droplets, Crown } from "lucide-react";
import { useState, Suspense } from "react";
import { ProductBottles } from "@/components/3d/ProductBottles";

const theme = {
  primary: "#FF1493",
  secondary: "#000000",
  accent: "#FFD700",
  background: "#FFF5F8",
  text: "#1A1A1A",
};

const AnimatedSphere = () => {
  return (
    <Sphere args={[1, 100, 200]} scale={2.2}>
      <MeshDistortMaterial
        color={theme.primary}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
      />
    </Sphere>
  );
};

const FriseurExtended = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("alle");
  const [selectedService, setSelectedService] = useState("damenschnitt");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const services = [
    {
      icon: Scissors,
      title: "Haarschnitte",
      description: "Präzise Schnitte für jeden Typ",
      price: "ab 45€",
      duration: "45-60 Min",
      category: "styling",
      features: ["Beratung", "Waschen & Schneiden", "Föhnen & Styling"]
    },
    {
      icon: Palette,
      title: "Colorationen",
      description: "Professionelle Haarfarbe",
      price: "ab 65€",
      duration: "90-120 Min",
      category: "color",
      features: ["Farbberatung", "Premium Produkte", "Glanz-Treatment"]
    },
    {
      icon: Sparkles,
      title: "Strähnchen",
      description: "Natürliche Highlights",
      price: "ab 85€",
      duration: "120-150 Min",
      category: "color",
      features: ["Folien oder Balayage", "Tönung", "Pflege-Kur"]
    },
    {
      icon: Heart,
      title: "Hochzeitsfrisuren",
      description: "Ihr perfekter Tag",
      price: "ab 120€",
      duration: "90 Min",
      category: "special",
      features: ["Probe-Styling", "Am Hochzeitstag", "Accessoires-Beratung"]
    },
    {
      icon: Droplets,
      title: "Dauerwelle",
      description: "Langanhaltende Locken",
      price: "ab 75€",
      duration: "120 Min",
      category: "styling",
      features: ["Beratung", "Schonende Produkte", "Styling-Tipps"]
    },
    {
      icon: Crown,
      title: "Premium Treatments",
      description: "Luxus für Ihr Haar",
      price: "ab 95€",
      duration: "60 Min",
      category: "special",
      features: ["Keratin Treatment", "Botox Treatment", "Olaplex Kur"]
    },
  ];

  const team = [
    {
      name: "Sophia Müller",
      role: "Salon-Inhaberin & Master Stylist",
      specialty: "Colorations-Expertin",
      experience: "15 Jahre",
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400",
      awards: ["L'Oréal Color Trophy", "Top Stylist 2023"],
      instagram: "@sophia.hair"
    },
    {
      name: "Elena Schmidt",
      role: "Senior Stylist",
      specialty: "Hochzeitsfrisuren",
      experience: "10 Jahre",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      awards: ["Bridal Hair Specialist"],
      instagram: "@elena.bridal"
    },
    {
      name: "Laura Weber",
      role: "Stylist",
      specialty: "Schnitt & Styling",
      experience: "8 Jahre",
      image: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=400",
      awards: ["Creative Cut Award"],
      instagram: "@laura.cuts"
    },
    {
      name: "Marie Fischer",
      role: "Junior Stylist",
      specialty: "Trends & Fashion",
      experience: "5 Jahre",
      image: "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=400",
      awards: ["Young Talent 2024"],
      instagram: "@marie.trends"
    },
  ];

  const packages = [
    {
      name: "Basic Beauty",
      price: "45€",
      duration: "45 Min",
      features: [
        "Waschen & Schneiden",
        "Föhnen",
        "Basic Styling",
        "Pflegeprodukt-Probe"
      ]
    },
    {
      name: "Premium Style",
      price: "89€",
      duration: "90 Min",
      popular: true,
      features: [
        "Beratung & Analyse",
        "Waschen mit Kopfmassage",
        "Schneiden & Styling",
        "Glanz-Treatment",
        "Premium Pflegeprodukte",
        "Styling-Tipps für Zuhause"
      ]
    },
    {
      name: "Luxury Experience",
      price: "149€",
      duration: "150 Min",
      features: [
        "Individuelle Beratung",
        "Luxus Kopfmassage",
        "Schnitt & Color",
        "Olaplex Treatment",
        "Professional Styling",
        "Getränke & Snacks",
        "Home-Care Set",
        "10% auf nächsten Besuch"
      ]
    },
  ];

  const testimonials = [
    {
      name: "Anna Weber",
      text: "Sophia ist eine absolute Künstlerin! Meine Hochzeitsfrisur war traumhaft und hat den ganzen Tag perfekt gehalten.",
      rating: 5,
      service: "Hochzeitsfrisur",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
    },
    {
      name: "Julia Hoffmann",
      text: "Endlich habe ich meinen perfekten Friseur gefunden. Elena versteht genau, was ich möchte und setzt es perfekt um!",
      rating: 5,
      service: "Coloration",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100"
    },
    {
      name: "Sarah Klein",
      text: "Das Team ist super freundlich und die Atmosphäre im Salon ist einfach toll. Ich fühle mich jedes Mal wie eine Königin!",
      rating: 5,
      service: "Styling",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100"
    },
    {
      name: "Lisa Bauer",
      text: "Die Colorations-Beratung war ausführlich und das Ergebnis ist fantastisch! Genau die Farbe, die ich mir gewünscht habe.",
      rating: 5,
      service: "Strähnchen",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100"
    },
  ];

  const faqItems = [
    {
      question: "Wie lange im Voraus sollte ich einen Termin buchen?",
      answer: "Für normale Termine empfehlen wir 1-2 Wochen Vorlaufzeit. Für Hochzeitsfrisuren oder besondere Anlässe sollten Sie mindestens 4-6 Wochen im Voraus buchen."
    },
    {
      question: "Welche Produkte verwendet ihr?",
      answer: "Wir arbeiten ausschließlich mit Premium-Marken wie L'Oréal Professionnel, Olaplex, Kerastase und Wella. Alle Produkte sind professionell und schonend für Haar und Kopfhaut."
    },
    {
      question: "Bietet ihr auch Beratungen an?",
      answer: "Ja! Jeder Service beginnt mit einer ausführlichen Beratung. Wir analysieren Ihre Haarstruktur, besprechen Ihre Wünsche und geben professionelle Empfehlungen."
    },
    {
      question: "Kann ich Gutscheine kaufen?",
      answer: "Selbstverständlich! Gutscheine sind in jedem Wert erhältlich und 2 Jahre gültig. Perfekt als Geschenk für Geburtstage, Weihnachten oder besondere Anlässe."
    },
    {
      question: "Was ist eure Stornierungspolitik?",
      answer: "Bitte stornieren Sie Termine mindestens 24 Stunden im Voraus. Bei kurzfristigen Absagen oder Nichterscheinen behalten wir uns vor, 50% des Servicepreises zu berechnen."
    },
    {
      question: "Macht ihr auch Hausbesuche?",
      answer: "Ja, für Hochzeiten und besondere Events bieten wir Mobile Services an. Kontaktieren Sie uns für Details und Preise."
    },
  ];

  const blogPosts = [
    {
      title: "Die 5 größten Haartrends 2025",
      excerpt: "Von Curtain Bangs bis zu Glazed Donut Hair - entdecken Sie die angesagten Trends des Jahres.",
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400",
      date: "15. Dez 2024",
      category: "Trends"
    },
    {
      title: "Richtige Haarpflege im Winter",
      excerpt: "So schützen Sie Ihr Haar vor Kälte, trockener Heizungsluft und anderen Winter-Strapazen.",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400",
      date: "10. Dez 2024",
      category: "Pflege"
    },
    {
      title: "Balayage vs. Highlights: Der Unterschied",
      excerpt: "Welche Färbetechnik passt zu Ihnen? Wir erklären die Vor- und Nachteile beider Methoden.",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400",
      date: "5. Dez 2024",
      category: "Color"
    },
  ];

  const filteredServices = selectedCategory === "alle"
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-2xl font-bold"
              style={{ color: theme.primary }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Scissors className="inline mr-2" />
              Salon Élégance
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">
              <a href="#services" className="hover:text-pink-600 transition-colors">Services</a>
              <a href="#team" className="hover:text-pink-600 transition-colors">Team</a>
              <a href="#preise" className="hover:text-pink-600 transition-colors">Preise</a>
              <a href="#galerie" className="hover:text-pink-600 transition-colors">Galerie</a>
              <a href="#kontakt" className="hover:text-pink-600 transition-colors">Kontakt</a>
              <Button style={{ backgroundColor: theme.primary }}>
                <Calendar className="mr-2 h-4 w-4" />
                Termin buchen
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
              <a href="#services" className="hover:text-pink-600 transition-colors">Services</a>
              <a href="#team" className="hover:text-pink-600 transition-colors">Team</a>
              <a href="#preise" className="hover:text-pink-600 transition-colors">Preise</a>
              <a href="#galerie" className="hover:text-pink-600 transition-colors">Galerie</a>
              <a href="#kontakt" className="hover:text-pink-600 transition-colors">Kontakt</a>
              <Button style={{ backgroundColor: theme.primary }} className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Termin buchen
              </Button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100" />}>
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <AnimatedSphere />
              <OrbitControls enableZoom={false} autoRotate />
            </Canvas>
          </Suspense>
        </motion.div>

        <div className="container mx-auto text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-pink-100 rounded-full">
              <span style={{ color: theme.primary }} className="font-semibold">
                ⭐ Bestes Friseursalon 2024 - Kundenwahl
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Ihr Haar verdient
              <span style={{ color: theme.primary }}> das Beste</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-600">
              Professionelle Haarpflege, kreatives Styling und individuelle Beratung
              in entspannter Wohlfühl-Atmosphäre
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" style={{ backgroundColor: theme.primary }} className="text-lg px-8">
                <Calendar className="mr-2" />
                Online Termin buchen
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-pink-600 text-pink-600 hover:bg-pink-50">
                <Phone className="mr-2" />
                0123 456789
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-pink-100">Jahre Erfahrung</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">2000+</div>
              <div className="text-pink-100">Zufriedene Kunden</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-pink-100">Weiterempfehlung</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-pink-100">Awards gewonnen</div>
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
              Von klassischen Haarschnitten bis zu luxuriösen Treatments -
              entdecken Sie unser vielfältiges Angebot
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["alle", "styling", "color", "special"].map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                style={selectedCategory === cat ? { backgroundColor: theme.primary } : {}}
                className={selectedCategory !== cat ? "border-pink-300 text-pink-600 hover:bg-pink-50" : ""}
              >
                {cat === "alle" ? "Alle Services" :
                 cat === "styling" ? "Styling" :
                 cat === "color" ? "Coloration" : "Spezial"}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-pink-100">
                  <CardHeader>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${theme.primary}15` }}
                    >
                      <service.icon size={32} style={{ color: theme.primary }} />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold" style={{ color: theme.primary }}>
                        {service.price}
                      </span>
                      <span className="text-gray-600 flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {service.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <Star className="mr-2 h-4 w-4" style={{ color: theme.accent }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-6"
                      style={{ backgroundColor: theme.primary }}
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

      {/* Team Section */}
      <section id="team" className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Unser <span style={{ color: theme.primary }}>Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leidenschaftliche Stylisten mit jahrelanger Erfahrung und
              einem Auge für Details
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
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-pink-100">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        {member.awards.map((award, idx) => (
                          <Award key={idx} className="h-4 w-4" style={{ color: theme.accent }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-base">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Sparkles className="mr-2 h-4 w-4" style={{ color: theme.primary }} />
                        {member.specialty}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="mr-2 h-4 w-4" style={{ color: theme.primary }} />
                        {member.experience} Erfahrung
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Instagram className="mr-2 h-4 w-4" style={{ color: theme.primary }} />
                        {member.instagram}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {member.awards.map((award, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${theme.accent}20`, color: theme.text }}
                        >
                          {award}
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

      {/* 3D Product Showcase */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Premium <span style={{ color: theme.primary }}>Pflegeprodukte</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wir verwenden ausschließlich hochwertige Markenprodukte für perfekte Ergebnisse
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ProductBottles />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              { icon: Sparkles, title: "Olaplex", desc: "Schonende Behandlung für gesundes Haar" },
              { icon: Heart, title: "Kérastase", desc: "Luxus-Pflege für jeden Haartyp" },
              { icon: Crown, title: "L'Oréal Pro", desc: "Professionelle Color-Excellence" }
            ].map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="text-center p-6 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50"
              >
                <product.icon className="w-12 h-12 mx-auto mb-4" style={{ color: theme.primary }} />
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-gray-600">{product.desc}</p>
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
              Unsere <span style={{ color: theme.primary }}>Pakete</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wählen Sie das perfekte Paket für Ihre Bedürfnisse -
              von schnell und effizient bis hin zum Luxus-Erlebnis
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
                <Card className={`h-full ${pkg.popular ? 'ring-4 ring-pink-500 shadow-2xl scale-105' : 'hover:shadow-xl'} transition-all duration-300 border-pink-100`}>
                  {pkg.popular && (
                    <div
                      className="text-center py-2 text-white font-semibold"
                      style={{ backgroundColor: theme.primary }}
                    >
                      ⭐ BELIEBTESTES PAKET
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
                          <Star className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: theme.accent }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      style={pkg.popular ? { backgroundColor: theme.primary } : {}}
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Paket buchen
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Was unsere <span style={{ color: theme.primary }}>Kundinnen</span> sagen
            </h2>
            <p className="text-xl text-gray-600">
              Über 2000 zufriedene Kunden vertrauen auf unsere Expertise
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
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-pink-100">
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
              Alles, was Sie über unseren Salon wissen müssen
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
                <Card className="hover:shadow-lg transition-shadow border-pink-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start">
                      <Sparkles className="mr-2 flex-shrink-0 mt-1" style={{ color: theme.primary }} />
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
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Beauty <span style={{ color: theme.primary }}>Blog</span>
            </h2>
            <p className="text-xl text-gray-600">
              Tipps, Trends und Inspiration für Ihr Haar
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
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-pink-100">
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
                    <CardTitle className="text-xl hover:text-pink-600 transition-colors cursor-pointer">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
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
              Termin <span style={{ color: theme.primary }}>buchen</span>
            </h2>
            <p className="text-xl text-gray-600">
              Wir freuen uns auf Ihren Besuch!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-pink-100">
                <CardHeader>
                  <CardTitle>Kontaktformular</CardTitle>
                  <CardDescription>
                    Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen
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
                    <div>
                      <label className="block text-sm font-medium mb-2">Gewünschter Service</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                      >
                        <option value="damenschnitt">Damenschnitt</option>
                        <option value="herrenschnitt">Herrenschnitt</option>
                        <option value="coloration">Coloration</option>
                        <option value="straehnchen">Strähnchen</option>
                        <option value="hochzeit">Hochzeitsfrisur</option>
                        <option value="treatment">Premium Treatment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Wunschtermin</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nachricht</label>
                      <Textarea
                        placeholder="Haben Sie besondere Wünsche oder Fragen?"
                        rows={4}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      style={{ backgroundColor: theme.primary }}
                    >
                      Termin anfragen
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
              <Card className="border-pink-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2" style={{ color: theme.primary }} />
                    Adresse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Salon Élégance<br />
                    Hauptstraße 123<br />
                    80331 München
                  </p>
                </CardContent>
              </Card>

              <Card className="border-pink-100">
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
                      <span className="font-semibold">9:00 - 19:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samstag:</span>
                      <span className="font-semibold">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sonntag:</span>
                      <span className="font-semibold">Geschlossen</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-pink-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2" style={{ color: theme.primary }} />
                    Kontakt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="mr-3 h-5 w-5" style={{ color: theme.primary }} />
                    <span>0123 456 789</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="mr-3 h-5 w-5" style={{ color: theme.primary }} />
                    <span>info@salon-elegance.de</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Instagram className="mr-3 h-5 w-5" style={{ color: theme.primary }} />
                    <span>@salon.elegance</span>
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: theme.primary }} className="text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2" />
                    Gutschein verschenken
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Verschenken Sie Schönheit! Unsere Gutscheine sind 2 Jahre gültig
                    und in jedem Wert erhältlich.
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full"
                    style={{ backgroundColor: 'white', color: theme.primary }}
                  >
                    Gutschein kaufen
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
                <Scissors size={24} style={{ color: theme.primary }} />
                <span className="text-xl font-bold">Salon Élégance</span>
              </div>
              <p className="text-gray-400 mb-4">
                Ihr Premium-Friseursalon in München. Professionell, kreativ, individuell.
              </p>
              <div className="flex gap-4">
                <Instagram className="cursor-pointer hover:text-pink-400 transition-colors" />
                <Facebook className="cursor-pointer hover:text-pink-400 transition-colors" />
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4" style={{ color: theme.primary }}>Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Haarschnitte</li>
                <li className="hover:text-white cursor-pointer transition-colors">Colorationen</li>
                <li className="hover:text-white cursor-pointer transition-colors">Hochzeitsfrisuren</li>
                <li className="hover:text-white cursor-pointer transition-colors">Treatments</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4" style={{ color: theme.primary }}>Kontakt</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Hauptstraße 123</li>
                <li>80331 München</li>
                <li>Tel: 0123 456 789</li>
                <li>info@salon-elegance.de</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4" style={{ color: theme.primary }}>Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Erhalten Sie Beauty-Tipps und exklusive Angebote!
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
            <p>&copy; 2024 Salon Élégance. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FriseurExtended;
