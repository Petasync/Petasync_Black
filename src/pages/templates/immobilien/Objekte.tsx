import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home, Search, MapPin, Bed, Bath, Square, Heart, Filter,
  ArrowLeft, TrendingUp, Euro, Building2, ChevronRight
} from "lucide-react";

const theme = {
  primary: "#2C3E50",
  secondary: "#ECF0F1",
  accent: "#C9B037",
  background: "#FFFFFF",
  text: "#34495E",
};

const allProperties = [
  { id: 1, title: "Luxusvilla am See", type: "Villa", price: "2.450.000 €", beds: 6, baths: 4, sqm: 380, location: "Starnberg", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop", features: ["Pool", "Seeblick", "Garten"], status: "Neu" },
  { id: 2, title: "Penthouse City", type: "Penthouse", price: "1.890.000 €", beds: 4, baths: 3, sqm: 220, location: "München", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop", features: ["Dachterrasse", "Panorama", "Luxus"], status: "Exklusiv" },
  { id: 3, title: "Moderne Stadtvilla", type: "Villa", price: "1.650.000 €", beds: 5, baths: 3, sqm: 280, location: "Grünwald", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop", features: ["Neubau", "Smart Home", "Garage"] },
  { id: 4, title: "Einfamilienhaus", type: "Haus", price: "850.000 €", beds: 4, baths: 2, sqm: 180, location: "Pasing", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop", features: ["Garten", "Ruhig", "Familie"] },
  { id: 5, title: "Design Loft", type: "Loft", price: "720.000 €", beds: 2, baths: 2, sqm: 140, location: "Schwabing", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop", features: ["Industrial", "Zentral", "Modern"] },
  { id: 6, title: "Chalet Alpen", type: "Chalet", price: "3.200.000 €", beds: 7, baths: 5, sqm: 450, location: "Garmisch", image: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=600&h=400&fit=crop", features: ["Bergblick", "Sauna", "Luxus"], status: "Premium" },
  { id: 7, title: "Seevilla Tegernsee", type: "Villa", price: "4.200.000 €", beds: 8, baths: 6, sqm: 520, location: "Tegernsee", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop", features: ["Privater Seezugang", "Pool", "Bootshaus"], status: "Premium" },
  { id: 8, title: "Penthouse Maximilianstraße", type: "Penthouse", price: "5.800.000 €", beds: 5, baths: 4, sqm: 350, location: "München Zentrum", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop", features: ["360° Terrasse", "Luxusausstattung", "Concierge"], status: "Exklusiv" },
  { id: 9, title: "Landhaus Chiemgau", type: "Landhaus", price: "1.150.000 €", beds: 6, baths: 3, sqm: 320, location: "Chiemgau", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop", features: ["Großer Garten", "Ruhig", "Renoviert"] },
  { id: 10, title: "Stadthaus Altstadt", type: "Haus", price: "980.000 €", beds: 4, baths: 2, sqm: 160, location: "Regensburg", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop", features: ["Denkmalschutz", "Zentral", "Charme"] },
  { id: 11, title: "Neubau-Wohnung", type: "Wohnung", price: "580.000 €", beds: 3, baths: 2, sqm: 95, location: "Nürnberg", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop", features: ["Erstbezug", "Balkon", "TG-Stellplatz"], status: "Neu" },
  { id: 12, title: "Bauernhaus Allgäu", type: "Bauernhaus", price: "1.380.000 €", beds: 7, baths: 4, sqm: 380, location: "Allgäu", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop", features: ["Bergblick", "Großes Grundstück", "Scheune"] },
];

export default function ImmobilienObjekte() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("alle");
  const [priceRange, setPriceRange] = useState("alle");

  const filteredProperties = allProperties.filter(prop => {
    const matchesSearch = prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prop.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "alle" || prop.type === selectedType;

    let matchesPrice = true;
    if (priceRange === "unter500k") matchesPrice = parseInt(prop.price.replace(/[^0-9]/g, "")) < 500000;
    if (priceRange === "500k-1m") {
      const price = parseInt(prop.price.replace(/[^0-9]/g, ""));
      matchesPrice = price >= 500000 && price < 1000000;
    }
    if (priceRange === "1m-2m") {
      const price = parseInt(prop.price.replace(/[^0-9]/g, ""));
      matchesPrice = price >= 1000000 && price < 2000000;
    }
    if (priceRange === "ueber2m") matchesPrice = parseInt(prop.price.replace(/[^0-9]/g, "")) >= 2000000;

    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b bg-white/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/templates/immobilien" className="flex items-center gap-3">
              <Home className="w-7 h-7" style={{ color: theme.accent }} />
              <div>
                <div className="text-2xl font-light tracking-wide" style={{ color: theme.primary }}>LuxuryEstate</div>
                <div className="text-xs tracking-widest" style={{ color: theme.accent }}>PREMIUM IMMOBILIEN</div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              <Link to="/templates/immobilien" className="text-sm hover:opacity-80 transition">Home</Link>
              <Link to="/templates/immobilien/objekte" className="text-sm font-semibold" style={{ color: theme.accent }}>Objekte</Link>
              <Link to="/templates/immobilien/3d-rundgang" className="text-sm hover:opacity-80 transition">3D-Rundgang</Link>
              <Link to="/templates/immobilien/verkaufen" className="text-sm hover:opacity-80 transition">Verkaufen</Link>
              <Link to="/templates/immobilien/team" className="text-sm hover:opacity-80 transition">Team</Link>
              <Link to="/templates/immobilien/kontakt" className="text-sm hover:opacity-80 transition">Kontakt</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/templates/immobilien" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Alle Objekte</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-light mb-4">
              Unsere <span className="font-bold" style={{ color: theme.accent }}>Immobilien</span>
            </h1>
            <p className="text-lg opacity-80">
              {filteredProperties.length} exklusive Objekte in besten Lagen
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Suche nach Ort oder Titel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="alle">Alle Objekttypen</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Haus">Haus</option>
              <option value="Loft">Loft</option>
              <option value="Chalet">Chalet</option>
              <option value="Wohnung">Wohnung</option>
              <option value="Landhaus">Landhaus</option>
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="alle">Alle Preisklassen</option>
              <option value="unter500k">Unter 500.000 €</option>
              <option value="500k-1m">500.000 - 1 Mio €</option>
              <option value="1m-2m">1 - 2 Mio €</option>
              <option value="ueber2m">Über 2 Mio €</option>
            </select>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {property.status && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold" style={{ backgroundColor: theme.accent }}>
                        {property.status}
                      </div>
                    )}
                    <button className="absolute top-4 left-4 p-2 rounded-full bg-white/90 hover:bg-white transition">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: `${theme.accent}20`, color: theme.primary }}>
                        {property.type}
                      </span>
                      <span className="text-2xl font-bold" style={{ color: theme.accent }}>
                        {property.price}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{property.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
                      <div className="text-center">
                        <Bed className="w-5 h-5 mx-auto mb-1" style={{ color: theme.accent }} />
                        <div className="text-sm font-semibold">{property.beds}</div>
                        <div className="text-xs text-gray-600">Zimmer</div>
                      </div>
                      <div className="text-center">
                        <Bath className="w-5 h-5 mx-auto mb-1" style={{ color: theme.accent }} />
                        <div className="text-sm font-semibold">{property.baths}</div>
                        <div className="text-xs text-gray-600">Bäder</div>
                      </div>
                      <div className="text-center">
                        <Square className="w-5 h-5 mx-auto mb-1" style={{ color: theme.accent }} />
                        <div className="text-sm font-semibold">{property.sqm}</div>
                        <div className="text-xs text-gray-600">m²</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.map((feature, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-full bg-gray-100">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Button className="w-full" style={{ backgroundColor: theme.primary }}>
                      Details ansehen
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-20">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold mb-2">Keine Objekte gefunden</h3>
              <p className="text-gray-600">Bitte passen Sie Ihre Suchkriterien an</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Nicht das Richtige gefunden?</h2>
          <p className="text-lg mb-6 opacity-80">
            Wir haben Zugang zu exklusiven Off-Market Objekten
          </p>
          <Link to="/templates/immobilien/kontakt">
            <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.accent }}>
              Jetzt beraten lassen
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
