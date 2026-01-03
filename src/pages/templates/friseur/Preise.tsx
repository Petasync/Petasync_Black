import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Scissors, ChevronRight, Calendar, Clock, Euro, Sparkles, Heart, Palette, Crown } from "lucide-react";

const theme = {
  primary: "#FF1493",
  secondary: "#000000",
  accent: "#FFD700",
  background: "#FFF5F8",
  text: "#1A1A1A",
};

const priceCategories = [
  {
    category: "Damenschnitte",
    icon: Scissors,
    services: [
      { name: "Waschen, Schneiden, Föhnen", price: "45€", duration: "45 Min" },
      { name: "Waschen, Schneiden, Styling", price: "55€", duration: "60 Min" },
      { name: "Pony nachschneiden", price: "15€", duration: "15 Min" },
      { name: "Langhaarschnitt (ab Schulter)", price: "55€", duration: "60 Min" },
    ]
  },
  {
    category: "Herrenschnitte",
    icon: Scissors,
    services: [
      { name: "Herrenschnitt Classic", price: "35€", duration: "30 Min" },
      { name: "Herrenschnitt Premium", price: "45€", duration: "45 Min" },
      { name: "Bart trimmen", price: "15€", duration: "15 Min" },
      { name: "Kombi: Schnitt + Bart", price: "45€", duration: "45 Min" },
    ]
  },
  {
    category: "Coloration",
    icon: Palette,
    services: [
      { name: "Ansatzfarbe", price: "55€", duration: "60 Min" },
      { name: "Komplettfarbe", price: "75€", duration: "90 Min" },
      { name: "Tönung", price: "45€", duration: "45 Min" },
      { name: "Grauabdeckung", price: "65€", duration: "60 Min" },
    ]
  },
  {
    category: "Strähnchen & Highlights",
    icon: Sparkles,
    services: [
      { name: "Foliensträhnen", price: "85€", duration: "120 Min" },
      { name: "Balayage", price: "120€", duration: "150 Min" },
      { name: "Ombré", price: "110€", duration: "140 Min" },
      { name: "Highlights Refresh", price: "95€", duration: "90 Min" },
    ]
  },
  {
    category: "Spezial-Treatments",
    icon: Crown,
    services: [
      { name: "Keratin-Glättung", price: "120€", duration: "120 Min" },
      { name: "Dauerwelle", price: "85€", duration: "120 Min" },
      { name: "Olaplex-Behandlung", price: "45€", duration: "30 Min" },
      { name: "Intensivpflege", price: "35€", duration: "30 Min" },
    ]
  },
  {
    category: "Hochzeit & Events",
    icon: Heart,
    services: [
      { name: "Brautfrisur (inkl. Probe)", price: "150€", duration: "120 Min" },
      { name: "Hochsteckfrisur", price: "65€", duration: "60 Min" },
      { name: "Brautstyling Komplett", price: "220€", duration: "180 Min" },
      { name: "Event-Styling", price: "55€", duration: "60 Min" },
    ]
  }
];

export default function FriseurPreise() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/templates/friseur" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
            <Scissors />
            Salon Élégance
          </Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Zur Hauptseite</Button></Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/">Hauptseite</Link><ChevronRight className="w-4 h-4" />
          <Link to="/templates/friseur">Salon</Link><ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Preise</span>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Unsere <span style={{ color: theme.primary }}>Preisliste</span></h1>
            <p className="text-xl text-gray-600">Transparente Preise für erstklassige Leistungen</p>
            <p className="text-sm text-gray-500 mt-4">* Alle Preise verstehen sich inkl. MwSt. Preise können bei besonders langem oder dickem Haar variieren.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {priceCategories.map((category, idx) => (
              <Card key={idx} className="border-pink-100 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20` }}>
                      <category.icon className="w-6 h-6" style={{ color: theme.primary }} />
                    </div>
                    <CardTitle className="text-2xl">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.services.map((service, i) => (
                      <div key={i} className="flex justify-between items-start pb-4 border-b border-pink-100 last:border-0">
                        <div className="flex-1">
                          <div className="font-semibold">{service.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {service.duration}
                          </div>
                        </div>
                        <div className="text-xl font-bold ml-4" style={{ color: theme.primary }}>
                          {service.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: theme.primary }} />
            <h2 className="text-3xl font-bold mb-4">Bereit für Ihren neuen Look?</h2>
            <p className="text-lg mb-6">Buchen Sie jetzt Ihren Termin online oder rufen Sie uns an</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/templates/friseur/buchung">
                <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.primary }}>
                  <Calendar className="mr-2" />
                  Online buchen
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full border-pink-300 text-pink-600">
                0123 456789
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
