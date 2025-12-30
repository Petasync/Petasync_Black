import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, ChevronRight, Heart, Download, Share2, ZoomIn, X } from "lucide-react";

const theme = {
  primary: "#000000",
  secondary: "#FFFFFF",
  accent: "#FFD700",
  background: "#FAFAFA",
  text: "#1A1A1A",
};

const portfolioImages = {
  hochzeit: [
    { id: 1, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop", title: "Romantische Zeremonie", likes: 234 },
    { id: 2, url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=1200&fit=crop", title: "Emotionale Momente", likes: 189 },
    { id: 3, url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=1200&fit=crop", title: "Traumhafte Details", likes: 312 },
    { id: 4, url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1200&fit=crop", title: "Unvergessliche Feier", likes: 267 },
    { id: 5, url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1200&fit=crop", title: "Brautpaar Shooting", likes: 298 },
    { id: 6, url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1200&fit=crop", title: "Hochzeitsdetails", likes: 156 },
  ],
  portrait: [
    { id: 7, url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1200&fit=crop", title: "Business Portraits", likes: 201 },
    { id: 8, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop", title: "Fashion Shooting", likes: 423 },
    { id: 9, url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop", title: "Charakterporträts", likes: 178 },
    { id: 10, url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop", title: "Lifestyle Shots", likes: 345 },
    { id: 11, url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1200&fit=crop", title: "Outdoor Portrait", likes: 267 },
    { id: 12, url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1200&fit=crop", title: "Studio Portrait", likes: 234 },
  ],
  events: [
    { id: 13, url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=1200&fit=crop", title: "Firmenevents", likes: 156 },
    { id: 14, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1200&fit=crop", title: "Konzerte", likes: 289 },
    { id: 15, url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=1200&fit=crop", title: "Konferenzen", likes: 134 },
    { id: 16, url: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&h=1200&fit=crop", title: "Partys", likes: 198 },
    { id: 17, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1200&fit=crop", title: "Networking Event", likes: 167 },
    { id: 18, url: "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?w=800&h=1200&fit=crop", title: "Gala Abend", likes: 245 },
  ],
};

export default function FotografPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState<"hochzeit" | "portrait" | "events">("hochzeit");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const categories = [
    { id: "hochzeit" as const, label: "Hochzeit", count: portfolioImages.hochzeit.length },
    { id: "portrait" as const, label: "Portrait", count: portfolioImages.portrait.length },
    { id: "events" as const, label: "Events", count: portfolioImages.events.length },
  ];

  const currentImages = portfolioImages[selectedCategory];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b" style={{ backgroundColor: `${theme.secondary}f5` }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/templates/fotograf" className="flex items-center gap-3">
            <Camera className="w-8 h-8" style={{ color: theme.primary }} />
            <div>
              <div className="text-2xl font-light">LensArt</div>
              <div className="text-xs tracking-widest" style={{ color: theme.accent }}>PHOTOGRAPHY</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm">
            <Link to="/templates/fotograf/portfolio" className="font-semibold" style={{ color: theme.accent }}>Portfolio</Link>
            <Link to="/templates/fotograf" className="hover:opacity-80 transition">Home</Link>
            <Link to="/templates/fotograf/pakete" className="hover:opacity-80 transition">Pakete</Link>
            <Button className="rounded-full font-semibold" style={{ backgroundColor: theme.primary, color: theme.secondary }}>
              Booking anfragen
            </Button>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/templates/fotograf" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Portfolio</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-light mb-4">
              Meine <span className="font-bold italic">Arbeit</span>
            </h1>
            <p className="text-lg opacity-80">
              Jedes Bild erzählt eine einzigartige Geschichte
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto">
          <div className="flex justify-center gap-4">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                style={selectedCategory === cat.id ? { backgroundColor: theme.primary, color: theme.secondary } : {}}
                className="rounded-full"
              >
                {cat.label}
                <span className="ml-2 opacity-60">({cat.count})</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer bg-black"
                onClick={() => setLightboxImage(image.id)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-75"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
                    <div className="flex items-center justify-between text-white/80 text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{image.likes}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <img
            src={currentImages.find(img => img.id === lightboxImage)?.url}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit für Ihr Shooting?</h2>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam Ihre besonderen Momente festhalten
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/templates/fotograf/pakete">
              <Button size="lg" className="rounded-full font-bold" style={{ backgroundColor: theme.primary, color: theme.secondary }}>
                Pakete ansehen
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full font-bold">
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
