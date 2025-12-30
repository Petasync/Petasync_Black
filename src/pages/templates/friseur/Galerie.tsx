import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Scissors, ChevronRight, X, Calendar, Sparkles } from "lucide-react";

const theme = {
  primary: "#FF1493",
  secondary: "#000000",
  accent: "#FFD700",
  background: "#FFF5F8",
  text: "#1A1A1A",
};

const categories = ["Alle", "Damen", "Herren", "Coloration", "Hochzeit", "Special"];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=800&fit=crop", category: "Damen", title: "Moderner Bob" },
  { src: "https://images.unsplash.com/photo-1595475884562-073c5e0044a3?w=600&h=800&fit=crop", category: "Herren", title: "Fade Cut" },
  { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&h=800&fit=crop", category: "Coloration", title: "Balayage" },
  { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=800&fit=crop", category: "Hochzeit", title: "Brautfrisur" },
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=800&fit=crop", category: "Damen", title: "Pixie Cut" },
  { src: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=600&h=800&fit=crop", category: "Herren", title: "Undercut" },
  { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=800&fit=crop", category: "Coloration", title: "Ombré" },
  { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=800&fit=crop", category: "Hochzeit", title: "Hochsteckfrisur" },
  { src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=800&fit=crop", category: "Damen", title: "Layered Cut" },
  { src: "https://images.unsplash.com/photo-1622296089863-eb7ef24f7ebd?w=600&h=800&fit=crop", category: "Coloration", title: "Platinum Blonde" },
  { src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&h=800&fit=crop", category: "Special", title: "Kreativ-Styling" },
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=800&fit=crop", category: "Damen", title: "Beach Waves" },
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=800&fit=crop", category: "Herren", title: "Pompadour" },
  { src: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=800&fit=crop", category: "Coloration", title: "Rose Gold" },
  { src: "https://images.unsplash.com/photo-1549236177-24d9d578db37?w=600&h=800&fit=crop", category: "Hochzeit", title: "Vintage Waves" },
  { src: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=600&h=800&fit=crop", category: "Special", title: "Fantasy Color" },
];

export default function FriseurGalerie() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === "Alle"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

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
          <span className="font-semibold">Galerie</span>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white shadow-sm">
              <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
              <span className="text-sm font-semibold">Unsere Arbeiten</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Unsere <span style={{ color: theme.primary }}>Galerie</span>
            </h1>
            <p className="text-xl text-gray-600">
              Lassen Sie sich von unseren neuesten Kreationen inspirieren
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
                style={selectedCategory === category ? { backgroundColor: theme.primary } : { borderColor: theme.primary, color: theme.primary }}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, idx) => (
              <div
                key={idx}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
                onClick={() => setLightboxImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="font-bold text-lg">{image.title}</div>
                    <div className="text-xs opacity-80">{image.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Bereit für Ihre Transformation?</h2>
            <p className="text-lg mb-6 text-gray-600">
              Buchen Sie jetzt Ihren Termin und lassen Sie sich von unserem Team verwöhnen
            </p>
            <Link to="/templates/friseur/buchung">
              <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.primary }}>
                <Calendar className="mr-2" />
                Jetzt Termin buchen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-pink-400 transition"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-10 h-10" />
          </button>
          <img
            src={lightboxImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
