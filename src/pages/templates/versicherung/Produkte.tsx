import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield, ChevronRight, Heart, Car, Home, Briefcase, Users, Plane,
  CheckCircle2, Star, ArrowRight, Building, Bike, Dog
} from "lucide-react";

const theme = {
  primary: "#0066CC",
  secondary: "#F0F8FF",
  accent: "#00CC66",
  background: "#FFFFFF",
  text: "#1A1A1A",
};

const products = [
  {
    icon: Heart,
    title: "Krankenversicherung",
    subtitle: "Ihr Gesundheitsschutz",
    price: "ab 450€/Monat",
    description: "Umfassender Schutz für Ihre Gesundheit mit freier Arztwahl und schnellen Terminen",
    features: [
      "Freie Arzt- und Krankenhauswahl",
      "Chefarztbehandlung inklusive",
      "Einzelzimmer im Krankenhaus",
      "Zahnersatz bis 90%",
      "Alternative Heilmethoden",
      "Auslandsschutz weltweit"
    ],
    color: "#FF6B6B"
  },
  {
    icon: Car,
    title: "Autoversicherung",
    subtitle: "Sicher unterwegs",
    price: "ab 85€/Monat",
    description: "Optimaler Schutz für Ihr Fahrzeug - von Haftpflicht bis Vollkasko",
    features: [
      "Haftpflicht, Teilkasko oder Vollkasko",
      "Wildschaden-Schutz",
      "Marderbiss-Absicherung",
      "Werkstatt-Service Partner",
      "Rabattschutz optional",
      "24/7 Pannenhilfe inklusive"
    ],
    color: "#4ECDC4"
  },
  {
    icon: Home,
    title: "Hausratversicherung",
    subtitle: "Schutz für Ihr Zuhause",
    price: "ab 120€/Jahr",
    description: "Sichern Sie Ihr Hab und Gut gegen Einbruch, Feuer und Wasserschäden ab",
    features: [
      "Neuwertentschädigung",
      "Fahrraddiebstahl inklusive",
      "Überspannungsschäden",
      "Glasbruch-Versicherung",
      "Elementarschäden optional",
      "Unterversicherungsverzicht"
    ],
    color: "#95E1D3"
  },
  {
    icon: Users,
    title: "Lebensversicherung",
    subtitle: "Für Ihre Liebsten",
    price: "ab 45€/Monat",
    description: "Finanzielle Absicherung Ihrer Familie für alle Lebenslagen",
    features: [
      "Risikolebensversicherung",
      "Kapitallebensversicherung",
      "Flexible Versicherungssumme",
      "Beitragsbefreiung bei Berufsunfähigkeit",
      "Nachversicherungsgarantie",
      "Bis zu 500.000€ Absicherung"
    ],
    color: "#F7DC6F"
  },
  {
    icon: Briefcase,
    title: "Berufsunfähigkeit",
    subtitle: "Ihr Einkommen absichern",
    price: "ab 95€/Monat",
    description: "Schützen Sie Ihre Arbeitskraft - Ihr wichtigstes Kapital",
    features: [
      "Bis zu 80% des Nettoeinkommens",
      "Abstrakte Verweisung ausgeschlossen",
      "Weltweiter Schutz",
      "Nachversicherungsgarantien",
      "Leistung bereits ab 50% BU",
      "Ohne Gesundheitsfragen optional"
    ],
    color: "#A8E6CF"
  },
  {
    icon: Plane,
    title: "Reiseversicherung",
    subtitle: "Sorglos verreisen",
    price: "ab 12€/Jahr",
    description: "Umfassender Schutz für Ihre Urlaube und Geschäftsreisen",
    features: [
      "Reiserücktrittsversicherung",
      "Krankenversicherung Ausland",
      "Reisegepäckversicherung",
      "24h Notfall-Hotline",
      "Pandemie-Schutz",
      "Unbegrenzte Reisen pro Jahr"
    ],
    color: "#FFD3B6"
  },
  {
    icon: Building,
    title: "Wohngebäude",
    subtitle: "Ihr Eigenheim schützen",
    price: "ab 350€/Jahr",
    description: "Rundumschutz für Ihr Haus oder Ihre Eigentumswohnung",
    features: [
      "Feuer, Sturm, Hagel",
      "Leitungswasserschäden",
      "Elementarschäden optional",
      "Photovoltaik-Anlagen",
      "Gleitender Neuwert",
      "Bauherrenhaftpflicht inklusive"
    ],
    color: "#B4A7D6"
  },
  {
    icon: Shield,
    title: "Haftpflichtversicherung",
    subtitle: "Schutz vor Schadenersatz",
    price: "ab 55€/Jahr",
    description: "Unerlässlicher Schutz gegen Schadenersatzansprüche Dritter",
    features: [
      "Bis 50 Mio. € Deckung",
      "Schlüsselverlust",
      "Mietsachschäden",
      "Deliktunfähige Kinder",
      "Gefälligkeitsschäden",
      "Ehrenamtliche Tätigkeiten"
    ],
    color: "#DDA15E"
  },
  {
    icon: Bike,
    title: "E-Bike Versicherung",
    subtitle: "Für Ihr E-Bike",
    price: "ab 8€/Monat",
    description: "Spezieller Schutz für Ihr wertvolles Elektrofahrrad",
    features: [
      "Diebstahlschutz 24/7",
      "Akkuschäden",
      "Elektronikschäden",
      "Unfallschäden",
      "Vandalismus",
      "Weltweiter Schutz"
    ],
    color: "#90BE6D"
  },
  {
    icon: Dog,
    title: "Tierhalter-Haftpflicht",
    subtitle: "Für Haustierbesitzer",
    price: "ab 65€/Jahr",
    description: "Spezielle Haftpflicht für Hunde- und Pferdehalter",
    features: [
      "Bis 15 Mio. € Deckung",
      "Deckung für alle Hunderassen",
      "Mietsachschäden",
      "Gewaltschäden",
      "Sachschäden an fremden Tieren",
      "Forderungsausfalldeckung"
    ],
    color: "#F4A261"
  }
];

export default function VersicherungProdukte() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/templates/versicherung" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
              <Shield className="inline" />
              SecureLife Versicherungen
            </Link>

            <div className="hidden md:flex gap-6 items-center">
              <Link to="/templates/versicherung" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/templates/versicherung/rechner" className="hover:text-blue-600 transition-colors">Rechner</Link>
              <Link to="/templates/versicherung/produkte" className="font-semibold" style={{ color: theme.accent }}>Produkte</Link>
              <Link to="/templates/versicherung/beratung" className="hover:text-blue-600 transition-colors">Beratung</Link>
              <Button style={{ backgroundColor: theme.primary }}>
                Angebot anfordern
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/templates/versicherung" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Produkte</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white shadow-sm">
              <Star className="w-4 h-4" style={{ color: theme.primary }} />
              <span className="text-sm font-semibold">Ausgezeichneter Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Unsere <span style={{ color: theme.primary }}>Produkte</span>
            </h1>
            <p className="text-lg opacity-80">
              Von Krankenversicherung bis Reiseschutz - wir bieten maßgeschneiderte
              Lösungen für jeden Lebensbereich
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group border-blue-100">
                  <CardHeader>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${product.color}20` }}
                    >
                      <product.icon size={32} style={{ color: product.color }} />
                    </div>
                    <CardTitle className="text-xl">{product.title}</CardTitle>
                    <p className="text-sm font-semibold" style={{ color: theme.primary }}>{product.subtitle}</p>
                    <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 pb-4 border-b border-blue-100">
                      <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                        {product.price}
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: theme.accent }} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                      {product.features.length > 4 && (
                        <div className="text-xs text-gray-500 pl-6">
                          + {product.features.length - 4} weitere Leistungen
                        </div>
                      )}
                    </div>

                    <Button className="w-full" style={{ backgroundColor: theme.primary }}>
                      Mehr erfahren
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.primary }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "500.000+", label: "Zufriedene Kunden" },
              { number: "50+", label: "Jahre Erfahrung" },
              { number: "98%", label: "Weiterempfehlung" },
              { number: "24/7", label: "Kundenservice" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-4xl font-bold mb-2" style={{ color: theme.accent }}>
                  {stat.number}
                </div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">SecureLife vs. traditionelle Versicherer</h2>
            <p className="text-gray-600">Warum sich ein Wechsel zu uns lohnt</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" style={{ color: theme.accent }} />
                  Bei SecureLife
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "✓ Bis zu 25% günstiger",
                  "✓ Monatlich kündbar",
                  "✓ 100% digitale Abwicklung",
                  "✓ Sofortige Deckungszusage",
                  "✓ Keine versteckten Kosten",
                  "✓ 24/7 Online-Service"
                ].map((item, idx) => (
                  <div key={idx} className="text-sm font-medium">{item}</div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Traditionelle Versicherer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-500">
                {[
                  "✗ Höhere Beiträge",
                  "✗ Lange Vertragsbindung",
                  "✗ Papierkram & Wartezeiten",
                  "✗ Bearbeitungszeit bis 2 Wochen",
                  "✗ Intransparente Gebühren",
                  "✗ Begrenzte Öffnungszeiten"
                ].map((item, idx) => (
                  <div key={idx} className="text-sm">{item}</div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit für besseren Schutz?</h2>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Berechnen Sie jetzt Ihren individuellen Beitrag oder vereinbaren Sie
            ein kostenloses Beratungsgespräch
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/templates/versicherung/rechner">
              <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.primary }}>
                Beitrag berechnen
              </Button>
            </Link>
            <Link to="/templates/versicherung/beratung">
              <Button size="lg" variant="outline" className="rounded-full border-blue-300 text-blue-600">
                Beratung buchen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
