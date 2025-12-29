import { useState, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home, Search, MapPin, Bed, Bath, Square, TrendingUp, Phone, Mail, Award,
  CheckCircle, Star, Menu, X, Calendar, Heart, MessageCircle, Download,
  Building, Key, ArrowRight, Euro, Users, ChevronRight, Filter, Maximize,
  Facebook, Instagram, Linkedin, Youtube, Clock, Target, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HouseModel, FloatingPropertyCard } from "@/components/3d/ImmobilienModels";

const theme = {
  primary: "#2C3E50",
  secondary: "#ECF0F1",
  accent: "#C9B037",
  background: "#FFFFFF",
  text: "#34495E",
};

const properties = [
  { title: "Luxusvilla am See", type: "Villa", price: "2.450.000 €", beds: 6, baths: 4, sqm: 380, location: "Starnberg", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop", features: ["Pool", "Seeblick", "Garten"] },
  { title: "Penthouse City", type: "Penthouse", price: "1.890.000 €", beds: 4, baths: 3, sqm: 220, location: "München", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop", features: ["Dachterrasse", "Panorama", "Luxus"] },
  { title: "Moderne Stadtvilla", type: "Villa", price: "1.650.000 €", beds: 5, baths: 3, sqm: 280, location: "Grünwald", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop", features: ["Neubau", "Smart Home", "Garage"] },
  { title: "Einfamilienhaus", type: "Haus", price: "850.000 €", beds: 4, baths: 2, sqm: 180, location: "Pasing", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop", features: ["Garten", "Ruhig", "Familie"] },
  { title: "Design Loft", type: "Loft", price: "720.000 €", beds: 2, baths: 2, sqm: 140, location: "Schwabing", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop", features: ["Industrial", "Zentral", "Modern"] },
  { title: "Chalet Alpen", type: "Chalet", price: "3.200.000 €", beds: 7, baths: 5, sqm: 450, location: "Garmisch", image: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=600&h=400&fit=crop", features: ["Bergblick", "Sauna", "Luxus"] },
];

const team = [
  { name: "Dr. Michael Lehmann", role: "Geschäftsführer", specialty: "Luxusimmobilien", experience: "25 Jahre", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop", sales: "500+ Mio €" },
  { name: "Sandra Weber", role: "Senior Maklerin", specialty: "Villen & Penthouse", experience: "18 Jahre", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop", sales: "250+ Mio €" },
  { name: "Thomas Koch", role: "Immobilienexperte", specialty: "Gewerbe & Investment", experience: "20 Jahre", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop", sales: "400+ Mio €" },
  { name: "Julia Hoffmann", role: "Maklerin", specialty: "Einfamilienhäuser", experience: "12 Jahre", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop", sales: "180+ Mio €" },
];

const testimonials = [
  { name: "Familie Schmidt", text: "Der Verkauf unserer Villa verlief reibungslos und professionell. Herr Lehmann hat einen exzellenten Käufer gefunden. Absolut empfehlenswert!", rating: 5, property: "Villa Starnberg", date: "Dezember 2023" },
  { name: "Klaus Bergmann", text: "Traumhaftes Penthouse gefunden! Die Beratung war erstklassig und alle Verhandlungen wurden perfekt geführt.", rating: 5, property: "Penthouse München", date: "November 2023" },
  { name: "Anna Weber", text: "Professionelle Betreuung von A-Z. Frau Weber hat uns geholfen, unser Traumhaus zu finden. Vielen Dank!", rating: 5, property: "Einfamilienhaus", date: "Oktober 2023" },
  { name: "Peter Krause GmbH", text: "Beste Beratung für Gewerbeimmobilien. Herr Koch ist ein absoluter Profi mit exzellentem Netzwerk.", rating: 5, property: "Bürogebäude", date: "seit 2020" },
];

export default function ImmobilienTemplateExtended() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b bg-white/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Home className="w-7 h-7" style={{ color: theme.accent }} />
            <div>
              <div className="text-2xl font-light tracking-wide" style={{ color: theme.primary }}>LuxuryEstate</div>
              <div className="text-xs tracking-widest" style={{ color: theme.accent }}>PREMIUM IMMOBILIEN</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm">
            <a href="#immobilien" className="hover:opacity-80 transition">Immobilien</a>
            <a href="#services" className="hover:opacity-80 transition">Services</a>
            <a href="#team" className="hover:opacity-80 transition">Team</a>
            <a href="#bewertungen" className="hover:opacity-80 transition">Bewertungen</a>
            <a href="#kontakt" className="hover:opacity-80 transition">Kontakt</a>
            <Button className="rounded-full font-semibold" style={{ backgroundColor: theme.accent, color: "white" }}>
              <Calendar className="mr-2 h-4 w-4" />
              Beratung
            </Button>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: theme.primary }}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="lg:hidden pb-4 px-4 space-y-3">
            {["Immobilien", "Services", "Team", "Bewertungen", "Kontakt"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <Button className="w-full rounded-full font-semibold" style={{ backgroundColor: theme.accent }}>Beratung</Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop')" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${theme.primary}f0 0%, ${theme.text}cc 100%)` }} />
        </motion.div>

        <div className="absolute inset-0 opacity-10">
          <Suspense fallback={null}>
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} />
              <HouseModel />
              <FloatingPropertyCard />
            </Canvas>
          </Suspense>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl text-white">
            <motion.span className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: theme.accent, color: "white" }}>
              <Award className="inline w-4 h-4 mr-2" />
              Premium Immobilienmakler seit 1995
            </motion.span>

            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
              Ihr Traumhaus<br />
              <span className="font-bold" style={{ color: theme.accent }}>Wartet auf Sie</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Exklusive Immobilien in besten Lagen • Persönliche Beratung • Diskrete Abwicklung
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full font-semibold text-lg px-8" style={{ backgroundColor: theme.accent, color: "white" }}>
                <Search className="mr-2 h-5 w-5" />
                Immobilien durchsuchen
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-semibold text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-gray-900">
                <Download className="mr-2 h-5 w-5" />
                Marktbericht 2024
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">
              {[
                { number: "1.200+", label: "Verkaufte Objekte" },
                { number: "2 Mrd €", label: "Transaktionsvolumen" },
                { number: "98%", label: "Zufriedene Kunden" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold" style={{ color: theme.accent }}>{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="immobilien" className="py-20" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Aktuelle Angebote
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">Exklusive <span className="font-bold">Immobilien</span></h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Handverlesene Premium-Objekte in den besten Lagen Münchens und Umgebung
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition">
                      <Heart className="w-5 h-5" style={{ color: theme.primary }} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs font-semibold text-white mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {property.location}
                    </div>
                    <div className="text-2xl font-bold text-white">{property.price}</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}>
                      {property.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: theme.primary }}>{property.title}</h3>

                  <div className="flex items-center gap-4 text-sm mb-4" style={{ color: theme.text }}>
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      {property.beds}
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      {property.baths}
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      {property.sqm}m²
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.features.map((feature, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-100" style={{ color: theme.text }}>
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button className="w-full rounded-full font-semibold" variant="outline" style={{ borderColor: theme.accent, color: theme.accent }}>
                    Details ansehen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full font-semibold" style={{ backgroundColor: theme.primary }}>
              <Building className="mr-2 h-5 w-5" />
              Alle 247 Objekte ansehen
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Unsere Services
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">Rundum-Service für <span className="font-bold">Ihre Immobilie</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Search, title: "Immobiliensuche", desc: "Persönliche Beratung und Zugang zu exklusiven Off-Market Objekten" },
              { icon: TrendingUp, title: "Verkauf", desc: "Professionelle Vermarktung mit maximaler Diskretion und Verkaufspreis" },
              { icon: Target, title: "Bewertung", desc: "Kostenlose Marktanalyse und realistische Wertermittlung Ihrer Immobilie" },
              { icon: Key, title: "Vermietung", desc: "Vermietungsmanagement inkl. Mieterauswahl und Vertragsabwicklung" },
            ].map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${theme.accent}15` }}>
                  <service.icon className="w-8 h-8" style={{ color: theme.accent }} />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm opacity-80">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Unser Team
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">Die Experten für <span className="font-bold">Ihre Immobilie</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className="relative h-80 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4" style={{ color: theme.accent }} />
                    <span className="text-sm font-semibold">{member.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4" style={{ color: theme.accent }} />
                    <span className="text-sm opacity-80">{member.experience} Erfahrung</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4" style={{ color: theme.accent }} />
                    <span className="text-sm font-bold" style={{ color: theme.accent }}>{member.sales} Verkaufsvolumen</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="bewertungen" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Kundenstimmen
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">Was unsere <span className="font-bold">Kunden</span> sagen</h2>
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
                    <p className="text-sm" style={{ color: theme.accent }}>{testimonial.property}</p>
                  </div>
                  <span className="text-sm opacity-60">{testimonial.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Kontakt
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">Lassen Sie uns <span className="font-bold">sprechen</span></h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Kostenlose Beratung</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Vorname *" required />
                  <Input placeholder="Nachname *" required />
                </div>
                <Input type="email" placeholder="E-Mail *" required />
                <Input type="tel" placeholder="Telefon *" required />
                <select className="w-full px-4 py-3 border rounded-lg">
                  <option>Ich möchte...</option>
                  <option>Eine Immobilie kaufen</option>
                  <option>Eine Immobilie verkaufen</option>
                  <option>Beratung zur Bewertung</option>
                  <option>Investment-Beratung</option>
                </select>
                <Textarea placeholder="Ihre Nachricht..." rows={4} />
                <Button type="submit" size="lg" className="w-full rounded-full font-semibold" style={{ backgroundColor: theme.accent }}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Beratung anfragen
                </Button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Kontaktinformationen</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.accent }}>
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Telefon</div>
                      <a href="tel:+498912345678" className="text-lg hover:opacity-80" style={{ color: theme.accent }}>
                        +49 89 123 456 78
                      </a>
                      <p className="text-sm opacity-60">Mo-Fr: 9:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.accent }}>
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">E-Mail</div>
                      <a href="mailto:info@luxuryestate.de" className="hover:opacity-80" style={{ color: theme.accent }}>
                        info@luxuryestate.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.accent }}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Büro München</div>
                      <p className="opacity-80">
                        Maximilianstraße 1<br />
                        80539 München
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-8" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.text} 100%)`, color: "white" }}>
                <Sparkles className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">VIP-Service</h3>
                <p className="mb-4 opacity-90">
                  Exklusiver Zugang zu Off-Market Objekten und persönliche Betreuung
                </p>
                <Button size="lg" className="w-full rounded-full font-semibold" style={{ backgroundColor: theme.accent, color: "white" }}>
                  Mehr erfahren
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: theme.primary, color: "white" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-7 h-7" style={{ color: theme.accent }} />
                <span className="text-xl font-light">LuxuryEstate</span>
              </div>
              <p className="text-sm opacity-80 mb-4">
                Premium Immobilienmakler in München seit 1995
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: theme.accent }}>
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Immobilien</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {["Villen", "Penthäuser", "Häuser", "Lofts", "Gewerbe", "Investment"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:opacity-100 transition flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: theme.accent }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {["Verkauf", "Kauf", "Bewertung", "Vermietung", "Beratung", "Investment"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:opacity-100 transition flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: theme.accent }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-sm opacity-80 mb-4">
                Exklusive Objekte direkt in Ihr Postfach
              </p>
              <div className="flex gap-2">
                <Input type="email" placeholder="Ihre E-Mail" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                <Button style={{ backgroundColor: theme.accent }}>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
              <p>© 2024 LuxuryEstate. Alle Rechte vorbehalten.</p>
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
