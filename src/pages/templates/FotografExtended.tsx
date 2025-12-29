import { useState, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera, Image, Award, Star, Menu, X, Calendar, Phone, Mail, MapPin,
  Heart, Download, ArrowRight, CheckCircle, Users, TrendingUp, Play,
  Facebook, Instagram, Youtube, ChevronRight, MessageCircle, Aperture, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CameraModel, PolaroidFrame } from "@/components/3d/FotografModels";

const theme = {
  primary: "#000000",
  secondary: "#FFFFFF",
  accent: "#FFD700",
  background: "#FAFAFA",
  text: "#1A1A1A",
};

const categories = {
  hochzeit: [
    { image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop", title: "Romantische Zeremonie" },
    { image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=800&fit=crop", title: "Emotionale Momente" },
    { image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=800&fit=crop", title: "Traumhafte Details" },
    { image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop", title: "Unvergessliche Feier" },
  ],
  portrait: [
    { image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop", title: "Business Portraits" },
    { image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop", title: "Fashion Shooting" },
    { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop", title: "Charakterporträts" },
    { image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop", title: "Lifestyle Shots" },
  ],
  events: [
    { image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=800&fit=crop", title: "Firmenevents" },
    { image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=800&fit=crop", title: "Konzerte" },
    { image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=800&fit=crop", title: "Konferenzen" },
    { image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=600&h=800&fit=crop", title: "Partys" },
  ],
};

const packages = [
  { name: "Basic", price: "499€", features: ["2 Stunden Shooting", "50 bearbeitete Bilder", "Online-Galerie", "Nutzungsrechte"], popular: false },
  { name: "Premium", price: "999€", features: ["4 Stunden Shooting", "150 bearbeitete Bilder", "Online-Galerie", "Alle Nutzungsrechte", "Fotobuch", "USB-Stick"], popular: true },
  { name: "Deluxe", price: "1.999€", features: ["Ganztags Shooting", "300+ bearbeitete Bilder", "Premium Online-Galerie", "Kommerzielle Rechte", "2x Fotobuch", "Video-Highlights"], popular: false },
];

const testimonials = [
  { name: "Laura & Thomas", text: "Unsere Hochzeitsfotos sind atemberaubend! Jedes Bild erzählt unsere Geschichte perfekt. Wir könnten nicht glücklicher sein!", rating: 5, event: "Hochzeit", date: "September 2023" },
  { name: "Dr. Michael Weber", text: "Professionelle Business-Portraits für unser Team. Exzellente Qualität und sehr angenehmes Shooting!", rating: 5, event: "Business Shooting", date: "Oktober 2023" },
  { name: "Sarah M.", text: "Fashion-Shooting der Extraklasse! Die Bilder sind kreativ, scharf und perfekt bearbeitet. Absolute Empfehlung!", rating: 5, event: "Fashion", date: "November 2023" },
  { name: "TechCorp GmbH", text: "Event-Fotografie auf höchstem Niveau. Alle wichtigen Momente wurden eingefangen. Top Service!", rating: 5, event: "Firmenevent", date: "Dezember 2023" },
];

export default function FotografTemplateExtended() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"hochzeit" | "portrait" | "events">("hochzeit");
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b" style={{ backgroundColor: `${theme.secondary}f5` }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="w-8 h-8" style={{ color: theme.primary }} />
            <div>
              <div className="text-2xl font-light">LensArt</div>
              <div className="text-xs tracking-widest" style={{ color: theme.accent }}>PHOTOGRAPHY</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm">
            <a href="#portfolio" className="hover:opacity-80 transition">Portfolio</a>
            <a href="#services" className="hover:opacity-80 transition">Services</a>
            <a href="#pakete" className="hover:opacity-80 transition">Pakete</a>
            <a href="#bewertungen" className="hover:opacity-80 transition">Bewertungen</a>
            <a href="#kontakt" className="hover:opacity-80 transition">Kontakt</a>
            <Button className="rounded-full font-semibold" style={{ backgroundColor: theme.primary, color: theme.secondary }}>
              <Calendar className="mr-2 h-4 w-4" />
              Termin buchen
            </Button>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="lg:hidden pb-4 px-4 space-y-3">
            {["Portfolio", "Services", "Pakete", "Bewertungen", "Kontakt"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <Button className="w-full rounded-full font-semibold" style={{ backgroundColor: theme.primary }}>Termin buchen</Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <motion.div style={{ opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&h=1080&fit=crop')" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `${theme.primary}80` }} />
        </motion.div>

        <div className="absolute inset-0 opacity-10">
          <Suspense fallback={null}>
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} />
              <CameraModel />
              <PolaroidFrame />
            </Canvas>
          </Suspense>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl text-white">
            <motion.span className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: theme.accent, color: theme.primary }}>
              <Award className="inline w-4 h-4 mr-2" />
              Award-winning Photography
            </motion.span>

            <h1 className="text-5xl md:text-8xl font-light mb-6 leading-tight">
              Momente die<br />
              <span className="font-bold italic">ewig bleiben</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Professionelle Fotografie für Hochzeiten, Events & Portraits<br />
              Kreativ • Emotional • Unvergesslich
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full font-semibold text-lg px-8" style={{ backgroundColor: theme.accent, color: theme.primary }}>
                <Eye className="mr-2 h-5 w-5" />
                Portfolio ansehen
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-semibold text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-gray-900">
                <Play className="mr-2 h-5 w-5" />
                Showreel
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">
              {[
                { number: "500+", label: "Shootings" },
                { number: "15+", label: "Jahre Erfahrung" },
                { number: "4.9", label: "⭐ Rating" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold" style={{ color: theme.accent }}>{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Portfolio
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">Meine <span className="font-bold italic">Arbeit</span></h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Jedes Bild erzählt eine einzigartige Geschichte
            </p>
          </motion.div>

          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 max-w-md mx-auto">
              <TabsTrigger value="hochzeit">Hochzeit</TabsTrigger>
              <TabsTrigger value="portrait">Portrait</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            {(Object.keys(categories) as Array<keyof typeof categories>).map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categories[category].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer"
                    >
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="rounded-full font-semibold">
              <Image className="mr-2 h-5 w-5" />
              Komplettes Portfolio ansehen
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20" style={{ backgroundColor: theme.primary, color: theme.secondary }}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Services
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">Was ich <span className="font-bold italic">anbiete</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Hochzeitsfotografie", desc: "Emotionale Momente Ihres besonderen Tages", price: "ab 1.499€" },
              { icon: Camera, title: "Portrait Shooting", desc: "Business, Fashion oder privat", price: "ab 299€" },
              { icon: Users, title: "Event Fotografie", desc: "Firmenfeiern, Konzerte, Konferenzen", price: "ab 499€" },
              { icon: Aperture, title: "Produkt Fotografie", desc: "Professionelle Produktbilder für E-Commerce", price: "ab 199€" },
              { icon: Star, title: "Fashion Shooting", desc: "Lookbooks und Kataloge für Designer", price: "auf Anfrage" },
              { icon: TrendingUp, title: "Business Portraits", desc: "Mitarbeiterfotos und Corporate Images", price: "ab 399€" },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-2 rounded-2xl p-8 hover:scale-105 transition-transform"
                style={{ borderColor: theme.accent }}
              >
                <service.icon className="w-12 h-12 mb-4" style={{ color: theme.accent }} />
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="opacity-80 mb-4">{service.desc}</p>
                <div className="text-xl font-bold" style={{ color: theme.accent }}>{service.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pakete" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Pakete
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">Transparente <span className="font-bold italic">Preise</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "border-2 rounded-2xl p-8 relative",
                  pkg.popular && "scale-105 shadow-2xl"
                )}
                style={{ borderColor: pkg.popular ? theme.accent : `${theme.primary}20` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: theme.accent, color: theme.primary }}>
                    Beliebt
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                  <div className="text-5xl font-bold mb-2" style={{ color: theme.primary }}>{pkg.price}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: theme.accent }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full rounded-full font-semibold" style={{ backgroundColor: pkg.popular ? theme.primary : `${theme.primary}`, color: theme.secondary }}>
                  Paket wählen
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="bewertungen" className="py-20" style={{ backgroundColor: theme.background }}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Bewertungen
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">Was meine <span className="font-bold italic">Kunden</span> sagen</h2>
            <div className="flex items-center justify-center gap-2 text-2xl mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-current" style={{ color: theme.accent }} />
              ))}
              <span className="ml-4">4.9 / 5.0</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: theme.accent }} />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm" style={{ color: theme.accent }}>{testimonial.event}</p>
                  </div>
                  <span className="text-sm opacity-60">{testimonial.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Kontakt
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">Lass uns <span className="font-bold italic">reden</span></h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Termin anfragen</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Vorname *" required />
                  <Input placeholder="Nachname *" required />
                </div>
                <Input type="email" placeholder="E-Mail *" required />
                <Input type="tel" placeholder="Telefon *" required />
                <select className="w-full px-4 py-3 border rounded-lg">
                  <option>Art des Shootings...</option>
                  <option>Hochzeit</option>
                  <option>Portrait</option>
                  <option>Event</option>
                  <option>Business</option>
                  <option>Produkt</option>
                </select>
                <Input type="date" placeholder="Wunschtermin" />
                <Textarea placeholder="Beschreibe dein Shooting..." rows={4} />
                <Button type="submit" size="lg" className="w-full rounded-full font-semibold" style={{ backgroundColor: theme.primary }}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Anfrage senden
                </Button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Kontakt</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.accent }}>
                      <Phone className="w-6 h-6" style={{ color: theme.primary }} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Telefon</div>
                      <a href="tel:+491234567890" className="text-lg hover:opacity-80" style={{ color: theme.accent }}>
                        +49 123 456 7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.accent }}>
                      <Mail className="w-6 h-6" style={{ color: theme.primary }} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">E-Mail</div>
                      <a href="mailto:info@lensart.de" className="hover:opacity-80" style={{ color: theme.accent }}>
                        info@lensart.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.accent }}>
                      <MapPin className="w-6 h-6" style={{ color: theme.primary }} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Studio</div>
                      <p className="opacity-80">
                        Foto-Straße 123<br />
                        80331 München
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-8" style={{ backgroundColor: theme.primary, color: theme.secondary }}>
                <Award className="w-12 h-12 mb-4" style={{ color: theme.accent }} />
                <h3 className="text-2xl font-bold mb-2">Gutscheine</h3>
                <p className="mb-4 opacity-90">
                  Verschenke unvergessliche Erinnerungen!
                </p>
                <Button size="lg" className="w-full rounded-full font-semibold" style={{ backgroundColor: theme.accent, color: theme.primary }}>
                  Gutschein kaufen
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: theme.primary, color: theme.secondary }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-8 h-8" style={{ color: theme.accent }} />
                <span className="text-xl font-light">LensArt</span>
              </div>
              <p className="text-sm opacity-80 mb-4">
                Professionelle Fotografie seit 2008
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: theme.accent }}>
                    <Icon className="w-5 h-5" style={{ color: theme.primary }} />
                  </a>
                ))}
              </div>
            </div>

            {["Services", "Portfolio", "Info"].map((heading, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4">{heading}</h4>
                <ul className="space-y-2 text-sm opacity-80">
                  {["Hochzeit", "Portrait", "Event", "Business"].map((item, j) => (
                    <li key={j}>
                      <a href="#" className="hover:opacity-100 transition flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" style={{ color: theme.accent }} />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-sm opacity-80 mb-4">
                Fotografie-Tipps & Angebote
              </p>
              <div className="flex gap-2">
                <Input type="email" placeholder="E-Mail" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                <Button style={{ backgroundColor: theme.accent, color: theme.primary }}>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
              <p>© 2024 LensArt Photography. Alle Rechte vorbehalten.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:opacity-100 transition">Impressum</a>
                <a href="#" className="hover:opacity-100 transition">Datenschutz</a>
                <a href="#" className="hover:opacity-100 transition">AGB</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
