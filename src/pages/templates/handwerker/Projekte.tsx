import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, ChevronRight, MapPin, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

const theme = {
  primary: "#FF6B35",
  secondary: "#2D3142",
  accent: "#F4B860",
  background: "#FFFFFF",
  text: "#1A1A1A",
};

const projects = [
  {
    title: "Badezimmer-Komplettsanierung",
    category: "Sanitär",
    location: "München-Schwabing",
    date: "Dezember 2024",
    duration: "3 Wochen",
    before: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
    description: "Komplette Renovierung mit modernen Fliesen, neuer Dusche und Fußbodenheizung",
    services: ["Fliesenarbeiten", "Sanitärinstallation", "Elektrik"],
  },
  {
    title: "Küchen-Neuinstallation",
    category: "Schreiner",
    location: "Nürnberg-Zentrum",
    date: "November 2024",
    duration: "2 Wochen",
    before: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop",
    description: "Maßgeschreinerte Einbauküche mit hochwertigen Materialien",
    services: ["Schreinerarbeiten", "Elektroinstallation", "Wasseranschluss"],
  },
  {
    title: "Elektriker-Notdienst Bürogebäude",
    category: "Elektrik",
    location: "Fürth-Innenstadt",
    date: "Oktober 2024",
    duration: "2 Tage",
    before: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop",
    description: "Notfall-Reparatur der Elektrik und Installation neuer Verteiler",
    services: ["24/7 Notdienst", "Fehlerdiagnose", "Neuverkabelung"],
  },
  {
    title: "Parkett-Verlegung Altbau",
    category: "Boden",
    location: "Erlangen-Altstadt",
    date: "September 2024",
    duration: "1 Woche",
    before: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&h=400&fit=crop",
    description: "Hochwertiges Eichenparkett im historischen Altbau verlegt",
    services: ["Bodenverlegung", "Schleifen", "Versiegelung"],
  },
  {
    title: "Heizungs-Modernisierung",
    category: "Heizung",
    location: "Ansbach",
    date: "August 2024",
    duration: "4 Tage",
    before: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&h=400&fit=crop",
    description: "Austausch alter Gasheizung gegen moderne Wärmepumpe",
    services: ["Heizungsinstallation", "Demontage", "Inbetriebnahme"],
  },
  {
    title: "Fassaden-Dämmung Einfamilienhaus",
    category: "Fassade",
    location: "Oberasbach",
    date: "Juli 2024",
    duration: "3 Wochen",
    before: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop",
    description: "Energetische Sanierung mit Vollwärmeschutz und neuem Putz",
    services: ["Dämmung", "Putzarbeiten", "Gerüstbau"],
  },
];

export default function HandwerkerProjekte() {
  const [filter, setFilter] = useState("alle");

  const categories = ["alle", "Sanitär", "Elektrik", "Schreiner", "Boden", "Heizung", "Fassade"];
  const filteredProjects = filter === "alle" ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/templates/handwerker" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
              <Wrench className="inline" />
              Meisterbetrieb Schmidt
            </Link>

            <div className="hidden md:flex gap-6 items-center">
              <Link to="/templates/handwerker/projekte" className="font-semibold" style={{ color: theme.accent }}>Projekte</Link>
              <Link to="/templates/handwerker" className="hover:opacity-80 transition">Home</Link>
              <Link to="/templates/handwerker/notdienst" className="hover:opacity-80 transition">Notdienst</Link>
              <Button style={{ backgroundColor: theme.primary }}>
                Anfrage stellen
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/templates/handwerker" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Referenzen</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Unsere <span style={{ color: theme.primary }}>Referenzen</span>
            </h1>
            <p className="text-lg opacity-80">
              Überzeugen Sie sich von unserer Qualität - über 500 zufriedene Kunden in der Region
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                style={filter === cat ? { backgroundColor: theme.primary } : {}}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  {/* Before/After Images */}
                  <div className="grid grid-cols-2 h-64">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.before}
                        alt="Vorher"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-bold">
                        Vorher
                      </div>
                    </div>
                    <div className="relative overflow-hidden">
                      <img
                        src={project.after}
                        alt="Nachher"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-bold" style={{ backgroundColor: theme.primary }}>
                        Nachher
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${theme.accent}30`, color: theme.primary }}>
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.date}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" style={{ color: theme.primary }} />
                        {project.location}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">Dauer:</span> {project.duration}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-sm font-semibold mb-2">Leistungen:</div>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((service, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs">
                            <CheckCircle2 className="w-3 h-3" style={{ color: theme.accent }} />
                            {service}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full mt-6" variant="outline" style={{ borderColor: theme.primary, color: theme.primary }}>
                      Details ansehen
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
      <section className="py-16 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "500+", label: "Projekte abgeschlossen" },
              { number: "25+", label: "Jahre Erfahrung" },
              { number: "98%", label: "Kundenzufriedenheit" },
              { number: "24/7", label: "Notdienst verfügbar" }
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

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ihr Projekt wartet!</h2>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam Ihre Pläne verwirklichen. Kostenlose Beratung und Angebot.
          </p>
          <Button size="lg" className="rounded-full font-bold" style={{ backgroundColor: theme.primary }}>
            Jetzt Anfrage stellen
          </Button>
        </div>
      </section>
    </div>
  );
}
