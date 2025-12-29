import { useState, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UtensilsCrossed, Wine, Clock, MapPin, Phone, Star, Calendar, ChefHat, Award,
  Instagram, Facebook, Youtube, Mail, Menu, X, ArrowRight, Users, Heart,
  Sparkles, Gift, Music, Camera, ChevronRight, MessageCircle, Download,
  HelpCircle, CheckCircle, Leaf, Crown, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FoodPlate, WineGlass } from "@/components/3d/RestaurantModels";

const theme = {
  primary: "#8B1538",
  secondary: "#F4E4C1",
  accent: "#D4AF37",
  background: "#1A1A1A",
  text: "#F8F8F8",
};

const menuItems = {
  vorspeisen: [
    { name: "Carpaccio vom Kobe-Rind", desc: "Mit Rucola, Parmesan und Trüffelöl", price: "24€", image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&h=300&fit=crop" },
    { name: "Burrata di Bufala", desc: "Auf Tomaten-Tatar mit Basilikum-Pesto", price: "18€", image: "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=400&h=300&fit=crop" },
    { name: "Gänsestopfleber", desc: "Mit Feigen-Chutney und Brioche", price: "32€", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
    { name: "Vitello Tonnato", desc: "Klassisch mit Thunfisch-Kapern-Sauce", price: "22€", image: "https://images.unsplash.com/photo-1626777056046-e8f58c53c443?w=400&h=300&fit=crop" },
  ],
  hauptgerichte: [
    { name: "Dry Aged Ribeye Steak", desc: "400g Premium-Rind, 45 Tage gereift, Rotwein-Jus", price: "58€", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop" },
    { name: "Bretonischer Hummer", desc: "Ganze Languste gegrillt mit Kräuterbutter", price: "68€", image: "https://images.unsplash.com/photo-1559737558-2f5a70c4e0a5?w=400&h=300&fit=crop" },
    { name: "Wolfsbarsch im Salzmantel", desc: "Mit mediterranem Gemüse und Zitronenbutter", price: "42€", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop" },
    { name: "Tagliatelle al Tartufo", desc: "Hausgemachte Pasta mit weißem Trüffel", price: "48€", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop" },
    { name: "Lammrücken sous-vide", desc: "Rosa gegart mit Kräuterkruste und Jus", price: "46€", image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&h=300&fit=crop" },
    { name: "Vegetarisches Degustationsmenü", desc: "5-Gang-Menü mit saisonalen Produkten", price: "65€", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop" },
  ],
  desserts: [
    { name: "Tiramisu", desc: "Nach Originalrezept mit Mascarpone", price: "14€", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" },
    { name: "Crème Brûlée", desc: "Mit Vanille aus Madagaskar", price: "12€", image: "https://images.unsplash.com/photo-1589227365533-cee630daf356?w=400&h=300&fit=crop" },
    { name: "Schokoladen-Soufflé", desc: "Mit flüssigem Kern und Vanilleeis", price: "16€", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop" },
    { name: "Panna Cotta", desc: "Mit Beerensauce und Minze", price: "11€", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=300&fit=crop" },
  ],
};

const wineSelection = [
  { name: "Château Margaux 2015", type: "Bordeaux, Frankreich", price: "420€", glass: "65€" },
  { name: "Barolo Riserva 2012", type: "Piemont, Italien", price: "185€", glass: "32€" },
  { name: "Dom Pérignon 2010", type: "Champagner, Frankreich", price: "350€", glass: "55€" },
  { name: "Sassicaia 2016", type: "Toskana, Italien", price: "280€", glass: "45€" },
];

const team = [
  { name: "Chef Vincent Dubois", role: "Küchenchef & Inhaber", specialty: "Französische Haute Cuisine", experience: "Michelin-Sterne Koch", image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=500&fit=crop", stars: 2 },
  { name: "Maria Rossi", role: "Sous Chef", specialty: "Italienische Küche", experience: "15 Jahre", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop", stars: 0 },
  { name: "Hans Schmidt", role: "Patissier", specialty: "Desserts & Gebäck", experience: "20 Jahre", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop", stars: 0 },
  { name: "Sophie Laurent", role: "Sommelier", specialty: "Weinberatung", experience: "Master Sommelier", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop", stars: 0 },
];

const testimonials = [
  { name: "Marcus Werner", role: "Food Critic", text: "Ein außergewöhnliches kulinarisches Erlebnis! Chef Vincent zaubert Meisterwerke auf den Teller. Die Kombination aus Aromen ist perfekt ausbalanciert.", rating: 5, date: "Januar 2024", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop" },
  { name: "Julia & Thomas", role: "Hochzeitsgäste", text: "Unsere Hochzeit wurde zu einem unvergesslichen Event. Das Team hat jeden Wunsch erfüllt und das Menü war phänomenal!", rating: 5, date: "Dezember 2023", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=200&fit=crop" },
  { name: "Dr. Anna Schmidt", role: "Stammgast", text: "Seit Jahren mein Lieblingsrestaurant. Die Qualität ist konstant auf höchstem Niveau. Besonders der Weinberatung durch Sophie ist erstklassig!", rating: 5, date: "seit 2019", image: "https://images.unsplash.com/photo-1559737558-2f5a70c4e0a5?w=300&h=200&fit=crop" },
  { name: "Peter Hoffmann", role: "Geschäftsessen", text: "Perfekt für Business-Dinner. Diskretes Ambiente, exzellenter Service und hervorragende Küche. Unsere Kunden sind stets begeistert.", rating: 5, date: "November 2023", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=300&h=200&fit=crop" },
];

const faqs = [
  { question: "Muss ich reservieren?", answer: "Ja, wir empfehlen dringend eine Reservierung, besonders am Wochenende und für größere Gruppen. Sie können online, telefonisch oder per E-Mail reservieren." },
  { question: "Gibt es vegetarische/vegane Optionen?", answer: "Selbstverständlich! Wir bieten ein komplettes vegetarisches Degustationsmenü an. Vegane Gerichte bereiten wir auf Anfrage gerne zu. Bitte informieren Sie uns bei der Reservierung." },
  { question: "Welche Kleiderordnung gilt?", answer: "Wir empfehlen Smart Casual bis Elegant. Sakko für Herren ist willkommen, aber nicht verpflichtend. Shorts und Sportbekleidung sind nicht gestattet." },
  { question: "Bieten Sie auch Catering an?", answer: "Ja, wir bieten Full-Service Catering für Events ab 20 Personen an. Kontaktieren Sie uns für ein individuelles Angebot." },
  { question: "Gibt es Parkmöglichkeiten?", answer: "Wir bieten Valet-Parking-Service an. Alternativ gibt es ein öffentliches Parkhaus 2 Minuten entfernt." },
  { question: "Können wir den Privatraum mieten?", answer: "Ja, unser Privatraum bietet Platz für bis zu 30 Personen und kann für geschlossene Gesellschaften, Firmenfeiern oder private Events gemietet werden." },
];

const events = [
  { title: "Wine & Dine Abend", date: "Jeden 1. Freitag", desc: "5-Gang-Menü mit Weinbegleitung durch unseren Sommelier", price: "95€", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop" },
  { title: "Truffle Season Special", date: "Oktober - Dezember", desc: "Exklusive Trüffel-Kreationen aus Alba und Périgord", price: "ab 120€", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop" },
  { title: "Chef's Table Experience", date: "Nach Vereinbarung", desc: "Privates 7-Gang-Menü mit dem Küchenchef", price: "200€", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop" },
];

export default function RestaurantTemplateExtended() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"vorspeisen" | "hauptgerichte" | "desserts">("hauptgerichte");
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 px-4 py-4 backdrop-blur-lg border-b"
        style={{
          backgroundColor: `${theme.background}e6`,
          borderColor: `${theme.primary}40`,
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8" style={{ color: theme.accent }} />
            <div>
              <div className="text-2xl font-serif font-bold" style={{ color: theme.secondary }}>
                La Maison
              </div>
              <div className="text-xs tracking-widest" style={{ color: theme.accent }}>
                FINE DINING
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#menu" className="text-sm font-medium hover:opacity-80 transition" style={{ color: theme.secondary }}>Menu</a>
            <a href="#weine" className="text-sm font-medium hover:opacity-80 transition" style={{ color: theme.secondary }}>Weinkarte</a>
            <a href="#team" className="text-sm font-medium hover:opacity-80 transition" style={{ color: theme.secondary }}>Team</a>
            <a href="#events" className="text-sm font-medium hover:opacity-80 transition" style={{ color: theme.secondary }}>Events</a>
            <a href="#bewertungen" className="text-sm font-medium hover:opacity-80 transition" style={{ color: theme.secondary }}>Bewertungen</a>
            <a href="#kontakt" className="text-sm font-medium hover:opacity-80 transition" style={{ color: theme.secondary }}>Kontakt</a>
            <Button className="rounded-full font-bold" style={{ backgroundColor: theme.primary, color: theme.text }}>
              <Calendar className="mr-2 h-4 w-4" />
              Jetzt Reservieren
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: theme.accent }}
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
            {["Menu", "Weinkarte", "Team", "Events", "Bewertungen", "Kontakt"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-sm font-medium hover:opacity-80 transition"
                style={{ color: theme.secondary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="w-full rounded-full font-bold" style={{ backgroundColor: theme.primary }}>
              Jetzt Reservieren
            </Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section with 3D */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${theme.background}ee 0%, ${theme.primary}cc 100%)`,
            }}
          />
        </motion.div>

        {/* 3D Scene */}
        <div className="absolute inset-0 z-0 opacity-10">
          <Suspense fallback={null}>
            <Canvas>
              <ambientLight intensity={0.3} />
              <directionalLight position={[10, 10, 5]} />
              <FoodPlate />
              <WineGlass />
            </Canvas>
          </Suspense>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(2)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-current" style={{ color: theme.accent }} />
                ))}
              </div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: `${theme.accent}30`, color: theme.accent }}>
                <Award className="inline w-4 h-4 mr-2" />
                2 Michelin Sterne • Guide Michelin 2024
              </span>
            </motion.div>

            <h1
              className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight"
              style={{ color: theme.secondary }}
            >
              LA MAISON
            </h1>

            <p className="text-xl md:text-3xl mb-4 font-light" style={{ color: theme.secondary }}>
              Französische Haute Cuisine
            </p>

            <p className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              Erleben Sie kulinarische Meisterwerke in elegantem Ambiente.<br />
              Eine Reise für alle Sinne.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full font-bold text-lg px-8"
                style={{ backgroundColor: theme.primary, color: theme.text }}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Tisch Reservieren
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full font-bold text-lg px-8 border-2"
                style={{ borderColor: theme.secondary, color: theme.secondary }}
              >
                <Download className="mr-2 h-5 w-5" />
                Menükarte (PDF)
              </Button>
            </div>

            {/* Info Badges */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-80">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5" style={{ color: theme.accent }} />
                <span className="text-sm">Michelin-Stern Koch</span>
              </div>
              <div className="flex items-center gap-2">
                <Wine className="w-5 h-5" style={{ color: theme.accent }} />
                <span className="text-sm">500+ Premium Weine</span>
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
            className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
            style={{ borderColor: theme.secondary }}
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full"
              style={{ backgroundColor: theme.secondary }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Signature Section */}
      <section className="py-20" style={{ backgroundColor: theme.primary }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6" style={{ color: theme.accent }} />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: theme.secondary }}>
              "Kochen ist eine Kunst, Essen ist ein Erlebnis"
            </h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Chef Vincent Dubois kombiniert traditionelle französische Kochtechniken mit modernen Einflüssen.
              Jedes Gericht wird mit Leidenschaft und Präzision zubereitet – für Momente, die Sie nie vergessen werden.
            </p>
            <div className="mt-8">
              <img
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=200&h=80&fit=crop"
                alt="Chef Signature"
                className="mx-auto opacity-60"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Unsere Karte
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: theme.secondary }}>
              Kulinarische Meisterwerke
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Entdecken Sie unsere sorgfältig kuratierten Gerichte aus erlesenen Zutaten
            </p>
          </motion.div>

          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)} className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-transparent gap-4">
              <TabsTrigger
                value="vorspeisen"
                className="rounded-full data-[state=active]:bg-primary"
                style={{ color: theme.secondary }}
              >
                Vorspeisen
              </TabsTrigger>
              <TabsTrigger
                value="hauptgerichte"
                className="rounded-full data-[state=active]:bg-primary"
                style={{ color: theme.secondary }}
              >
                Hauptgerichte
              </TabsTrigger>
              <TabsTrigger
                value="desserts"
                className="rounded-full data-[state=active]:bg-primary"
                style={{ color: theme.secondary }}
              >
                Desserts
              </TabsTrigger>
            </TabsList>

            {(Object.keys(menuItems) as Array<keyof typeof menuItems>).map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 gap-6">
                  {menuItems[category].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
                    >
                      <div className="flex gap-6 p-6">
                        <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-serif font-bold" style={{ color: theme.secondary }}>
                              {item.name}
                            </h3>
                            <span className="text-xl font-bold flex-shrink-0 ml-4" style={{ color: theme.accent }}>
                              {item.price}
                            </span>
                          </div>
                          <p className="text-sm opacity-80">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="rounded-full font-bold" style={{ borderColor: theme.accent, color: theme.accent }}>
              <Download className="mr-2 h-5 w-5" />
              Komplette Karte herunterladen
            </Button>
          </div>
        </div>
      </section>

      {/* Wine Section */}
      <section id="weine" className="py-20" style={{ backgroundColor: `${theme.primary}20` }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Wine className="w-12 h-12 mx-auto mb-4" style={{ color: theme.accent }} />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: theme.secondary }}>
              Exquisite Weinkarte
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Über 500 erlesene Weine aus den besten Anbaugebieten der Welt
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {wineSelection.map((wine, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border-l-4"
                  style={{ borderColor: theme.accent }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-bold mb-1" style={{ color: theme.secondary }}>
                        {wine.name}
                      </h3>
                      <p className="text-sm opacity-80">{wine.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold mb-1" style={{ color: theme.accent }}>
                        {wine.price}
                      </div>
                      <div className="text-sm opacity-80">Glas: {wine.glass}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm opacity-80 mb-4">
                Lassen Sie sich von unserem Master Sommelier Sophie Laurent beraten
              </p>
              <Button size="lg" className="rounded-full font-bold" style={{ backgroundColor: theme.primary }}>
                <Wine className="mr-2 h-5 w-5" />
                Komplette Weinkarte ansehen
              </Button>
            </div>
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
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Unser Team
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: theme.secondary }}>
              Die Künstler hinter den Kulissen
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {member.stars > 0 && (
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(member.stars)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" style={{ color: theme.accent }} />
                        ))}
                      </div>
                    )}
                    <h3 className="text-2xl font-serif font-bold mb-1" style={{ color: theme.secondary }}>
                      {member.name}
                    </h3>
                    <p className="text-sm opacity-90">{member.role}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm" style={{ color: theme.accent }}>{member.specialty}</p>
                  <p className="text-xs opacity-60 mt-1">{member.experience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20" style={{ backgroundColor: `${theme.primary}20` }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Events & Specials
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: theme.secondary }}>
              Besondere Erlebnisse
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs font-bold mb-2" style={{ color: theme.accent }}>
                      {event.date}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold mb-3" style={{ color: theme.secondary }}>
                    {event.title}
                  </h3>
                  <p className="text-sm opacity-80 mb-4">{event.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold" style={{ color: theme.accent }}>
                      {event.price}
                    </span>
                    <Button size="sm" variant="ghost" style={{ color: theme.accent }}>
                      Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Gästestimmen
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: theme.secondary }}>
              Unsere Gäste lieben uns
            </h2>
            <div className="flex items-center justify-center gap-2 text-2xl">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-current" style={{ color: theme.accent }} />
              ))}
              <span className="ml-4 opacity-80">4.9 / 5.0</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: theme.accent }} />
                  ))}
                </div>
                <p className="text-lg mb-6 italic opacity-90">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold" style={{ color: theme.secondary }}>{testimonial.name}</h4>
                    <p className="text-sm opacity-60">{testimonial.role}</p>
                  </div>
                  <span className="text-sm opacity-60">{testimonial.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="rounded-full font-bold" style={{ borderColor: theme.accent, color: theme.accent }}>
              <Star className="mr-2 h-5 w-5" />
              Alle 487 Bewertungen lesen
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ backgroundColor: `${theme.primary}20` }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Häufige Fragen
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: theme.secondary }}>
              Gut zu wissen
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left font-bold hover:no-underline py-6" style={{ color: theme.secondary }}>
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: theme.accent }} />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-8 opacity-80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact/Reservation */}
      <section id="kontakt" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              Reservierung
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: theme.secondary }}>
              Sichern Sie sich Ihren Tisch
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Reservation Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-serif font-bold mb-6" style={{ color: theme.secondary }}>
                Online Reservieren
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Vorname *</label>
                    <Input placeholder="Max" className="bg-black/40 border-gray-700" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nachname *</label>
                    <Input placeholder="Mustermann" className="bg-black/40 border-gray-700" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">E-Mail *</label>
                  <Input type="email" placeholder="max@beispiel.de" className="bg-black/40 border-gray-700" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Telefon *</label>
                  <Input type="tel" placeholder="+49 123 456789" className="bg-black/40 border-gray-700" required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Datum *</label>
                    <Input type="date" className="bg-black/40 border-gray-700" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Uhrzeit *</label>
                    <select className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-black/40">
                      <option>18:00</option>
                      <option>18:30</option>
                      <option>19:00</option>
                      <option>19:30</option>
                      <option>20:00</option>
                      <option>20:30</option>
                      <option>21:00</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Anzahl Personen *</label>
                  <select className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-black/40">
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1}>{i + 1} {i === 0 ? "Person" : "Personen"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Besondere Wünsche</label>
                  <Textarea
                    placeholder="Allergien, besondere Anlässe, etc..."
                    className="bg-black/40 border-gray-700"
                    rows={3}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full font-bold"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Jetzt Reservieren
                </Button>
                <p className="text-xs opacity-60 text-center">
                  * Pflichtfelder | Reservierungen werden innerhalb 2h bestätigt
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
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-serif font-bold mb-6" style={{ color: theme.secondary }}>
                  Kontakt
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary }}>
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Telefon</div>
                      <a href="tel:+491234567890" className="text-lg hover:opacity-80" style={{ color: theme.accent }}>
                        +49 30 123 456 78
                      </a>
                      <p className="text-sm opacity-60">Di-Sa: 12:00 - 22:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary }}>
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">E-Mail</div>
                      <a href="mailto:reservation@lamaison.de" className="hover:opacity-80" style={{ color: theme.accent }}>
                        reservation@lamaison.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary }}>
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Adresse</div>
                      <p className="opacity-80">
                        Gourmetstraße 1<br />
                        10117 Berlin<br />
                        Deutschland
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-serif font-bold mb-4" style={{ color: theme.secondary }}>
                  Öffnungszeiten
                </h3>
                <div className="space-y-3">
                  {[
                    { day: "Dienstag - Samstag", hours: "18:00 - 23:00 Uhr" },
                    { day: "Sonntag & Montag", hours: "Ruhetag" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
                      <span className="font-semibold">{schedule.day}</span>
                      <span className="opacity-60">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-8">
                <Gift className="w-12 h-12 mb-4" style={{ color: theme.accent }} />
                <h3 className="text-2xl font-serif font-bold mb-2">Gutscheine</h3>
                <p className="mb-4 opacity-90">
                  Verschenken Sie unvergessliche kulinarische Momente!
                </p>
                <Button
                  size="lg"
                  className="w-full rounded-full font-bold"
                  style={{ backgroundColor: theme.accent, color: theme.background }}
                >
                  <Gift className="mr-2 h-5 w-5" />
                  Gutschein kaufen
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ borderColor: `${theme.primary}40` }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8" style={{ color: theme.accent }} />
                <div>
                  <div className="text-xl font-serif font-bold" style={{ color: theme.secondary }}>
                    La Maison
                  </div>
                  <div className="text-xs" style={{ color: theme.accent }}>
                    FINE DINING
                  </div>
                </div>
              </div>
              <p className="text-sm opacity-60 mb-4">
                Exquisite französische Küche im Herzen von Berlin seit 1995.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Facebook, href: "#" },
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
              <h4 className="font-bold mb-4" style={{ color: theme.secondary }}>Restaurant</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {["Menükarte", "Weinkarte", "Unser Team", "Events", "Privatraum", "Gutscheine"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:opacity-100 transition flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: theme.accent }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="font-bold mb-4" style={{ color: theme.secondary }}>Information</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {["Über uns", "Presse", "Karriere", "Hygiene", "Nachhaltigkeit", "Partner"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:opacity-100 transition flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: theme.accent }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold mb-4" style={{ color: theme.secondary }}>Newsletter</h4>
              <p className="text-sm opacity-80 mb-4">
                Exklusive Events & Angebote direkt in Ihr Postfach
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Ihre E-Mail"
                  className="bg-white/5 border-gray-700"
                />
                <Button style={{ backgroundColor: theme.primary }}>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t pt-8" style={{ borderColor: `${theme.primary}40` }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
              <p>© 2024 La Maison. Alle Rechte vorbehalten.</p>
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
