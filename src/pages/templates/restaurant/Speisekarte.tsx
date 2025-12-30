import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UtensilsCrossed, ChevronRight, Leaf, Flame, Star, Wine, Coffee, IceCream, Download
} from "lucide-react";

const theme = {
  primary: "#8B1538",
  secondary: "#F4E4C1",
  accent: "#D4AF37",
  background: "#1A1A1A",
  text: "#F4E4C1",
};

const menu = {
  vorspeisen: [
    { name: "Beef Carpaccio", desc: "Hauchdünn geschnitten, Rucola, Parmesan, Trüffelöl", price: "18€", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", tags: ["Signature"] },
    { name: "Gänseleberpastete", desc: "Hausgemacht, Brioche, Feigenconfit", price: "22€", image: "https://images.unsplash.com/photo-1625938145312-c260e5d75e6b?w=400&h=300&fit=crop", tags: ["Premium"] },
    { name: "Jakobsmuscheln", desc: "Safran-Schaum, Perlzwiebeln, Kartoffelpüree", price: "26€", image: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=400&h=300&fit=crop", tags: ["Chef's Special"] },
    { name: "Burrata", desc: "San Marzano Tomaten, Basilikum, Balsamico", price: "16€", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&h=300&fit=crop", tags: ["Vegetarisch"] },
  ],
  hauptgerichte: [
    { name: "Dry Aged Ribeye Steak", desc: "300g, 45 Tage gereift, Café de Paris Butter", price: "52€", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop", tags: ["Signature", "Premium"] },
    { name: "Hummer Thermidor", desc: "Gratiniert, Champagner-Sauce, Trüffel", price: "58€", image: "https://images.unsplash.com/photo-1625937329935-d0cfbd0d3a11?w=400&h=300&fit=crop", tags: ["Premium"] },
    { name: "Lammrücken", desc: "Rosa gebraten, Kräuterkruste, Ratatouille", price: "42€", image: "https://images.unsplash.com/photo-1595777216528-071e0127ccbf?w=400&h=300&fit=crop", tags: ["Chef's Special"] },
    { name: "Rote Bete Risotto", desc: "Ziegenkäse, karamellisierte Walnüsse", price: "28€", image: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=400&h=300&fit=crop", tags: ["Vegetarisch"] },
    { name: "Seeteufel", desc: "Chorizo, weiße Bohnen, Safran", price: "38€", image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=300&fit=crop", tags: [] },
    { name: "Entenbrust", desc: "Orangensauce, Gratin Dauphinois", price: "36€", image: "https://images.unsplash.com/photo-1626200419199-391ae4be7b70?w=400&h=300&fit=crop", tags: [] },
  ],
  desserts: [
    { name: "Crème Brûlée", desc: "Bourbon-Vanille, karamellisierte Kruste", price: "12€", image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop", tags: ["Signature"] },
    { name: "Schokoladen-Fondant", desc: "Flüssiger Kern, Vanilleeis", price: "14€", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop", tags: [] },
    { name: "Tarte Tatin", desc: "Karamellisierte Äpfel, Calvados-Sahne", price: "13€", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop", tags: ["Chef's Special"] },
    { name: "Käseauswahl", desc: "5 französische Käsesorten, Trauben, Nüsse", price: "16€", image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400&h=300&fit=crop", tags: [] },
  ]
};

export default function RestaurantSpeisekarte() {
  const [selectedCategory, setSelectedCategory] = useState("vorspeisen");

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-lg z-50 border-b" style={{ backgroundColor: `${theme.background}f5`, borderColor: `${theme.accent}30` }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/templates/restaurant" className="text-2xl font-serif flex items-center gap-2" style={{ color: theme.accent }}>
              <UtensilsCrossed className="inline" />
              La Belle Époque
            </Link>

            <div className="hidden md:flex gap-6 items-center text-sm">
              <Link to="/templates/restaurant/speisekarte" className="font-semibold" style={{ color: theme.accent }}>Speisekarte</Link>
              <Link to="/templates/restaurant/reservierung" className="hover:opacity-80 transition">Reservierung</Link>
              <Link to="/templates/restaurant/events" className="hover:opacity-80 transition">Events</Link>
              <Link to="/templates/restaurant" className="hover:opacity-80 transition">Über uns</Link>
              <Button style={{ backgroundColor: theme.primary }} className="rounded-full">
                Tisch reservieren
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm opacity-60">
          <Link to="/templates/restaurant" className="hover:opacity-100 transition">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Speisekarte</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, #5A0F21 100%)` }}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border" style={{ borderColor: theme.accent }}>
              <Star className="w-4 h-4" style={{ color: theme.accent }} />
              <span className="text-sm font-serif">Michelin ausgezeichnet</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif mb-4">
              Unsere <span style={{ color: theme.accent }}>Speisekarte</span>
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Genießen Sie französische Haute Cuisine mit regionalen Produkten
              und internationalem Flair
            </p>
            <Button
              variant="outline"
              className="rounded-full border-2"
              style={{ borderColor: theme.accent, color: theme.accent }}
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'data:application/pdf;base64,JVBERi0xLjMKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA2MTIgNzkyXS9Db250ZW50cyA0IDAgUj4+CmVuZG9iago0IDAgb2JqCjw8L0xlbmd0aCA0Nj4+CnN0cmVhbQpCVAovRjEgMjQgVGYKMTAwIDcwMCBUZAooTGEgQmVsbGUgw4lwb3F1ZSAtIFNwZWlzZWthcnRlKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9QYWdlcy9LaWRzWzMgMCBSXS9Db3VudCAxPj4KZW5kb2JqCjUgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9QYWdlcy9LaWRzWzMgMCBSXS9Db3VudCAxL1Jlc291cmNlczw8L1Byb2NTZXRbL1BERi9UZXh0XS9Gb250PDwvRjEgNSAwIFI+Pj4+Pj4KZW5kb2JqCjYgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDIgMCBSPj4KZW5kb2JqCnhyZWYKMCA3CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDI0MiAwMDAwMCBuIAowMDAwMDAwMzcyIDAwMDAwIG4gCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA4NyAwMDAwMCBuIAowMDAwMDAwMjk5IDAwMDAwIG4gCjAwMDAwMDA0NzggMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDcvUm9vdCA2IDAgUj4+CnN0YXJ0eHJlZgo1MjcKJSVFT0YK';
                link.download = 'La_Belle_Epoque_Speisekarte.pdf';
                link.click();
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Speisekarte als PDF
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-transparent border" style={{ borderColor: `${theme.accent}30` }}>
              <TabsTrigger value="vorspeisen" className="data-[state=active]:bg-opacity-20" style={{ color: theme.text }}>
                <Flame className="w-4 h-4 mr-2" />
                Vorspeisen
              </TabsTrigger>
              <TabsTrigger value="hauptgerichte" className="data-[state=active]:bg-opacity-20" style={{ color: theme.text }}>
                <UtensilsCrossed className="w-4 h-4 mr-2" />
                Hauptgerichte
              </TabsTrigger>
              <TabsTrigger value="desserts" className="data-[state=active]:bg-opacity-20" style={{ color: theme.text }}>
                <IceCream className="w-4 h-4 mr-2" />
                Desserts
              </TabsTrigger>
            </TabsList>

            {Object.entries(menu).map(([category, items]) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 gap-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300" style={{ backgroundColor: `${theme.secondary}10`, borderColor: `${theme.accent}30` }}>
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4 flex gap-2">
                            {item.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full text-xs font-semibold"
                                style={{ backgroundColor: theme.accent, color: theme.background }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-serif font-semibold" style={{ color: theme.text }}>
                              {item.name}
                            </h3>
                            <span className="text-2xl font-bold" style={{ color: theme.accent }}>
                              {item.price}
                            </span>
                          </div>
                          <p className="text-sm opacity-80">{item.desc}</p>
                          {item.tags.includes("Vegetarisch") && (
                            <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: theme.accent }}>
                              <Leaf className="w-4 h-4" />
                              Vegetarisch
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Wine Pairing CTA */}
      <section className="py-16 px-4" style={{ background: `linear-gradient(135deg, ${theme.primary}20 0%, ${theme.background} 100%)` }}>
        <div className="container mx-auto max-w-4xl text-center">
          <Wine className="w-16 h-16 mx-auto mb-4" style={{ color: theme.accent }} />
          <h2 className="text-3xl font-serif font-bold mb-4">Weinbegleitung</h2>
          <p className="text-lg mb-8 opacity-80">
            Lassen Sie sich von unserem Sommelier die perfekten Weine zu Ihrem Menü empfehlen.
            Über 300 erlesene Weine aus aller Welt.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/templates/restaurant/reservierung">
              <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.primary }}>
                Tisch reservieren
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full" style={{ borderColor: theme.accent, color: theme.accent }}>
              Weinkarte ansehen
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 px-4 border-t" style={{ borderColor: `${theme.accent}30` }}>
        <div className="container mx-auto text-center text-sm opacity-60">
          <p>Alle Preise verstehen sich inkl. MwSt. • Änderungen vorbehalten</p>
          <p className="mt-2">Allergene und Zusatzstoffe auf Anfrage • Wir beraten Sie gerne</p>
        </div>
      </section>
    </div>
  );
}
