import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home, ChevronRight, Maximize, RotateCw, ZoomIn, Layers, Download, Share2
} from "lucide-react";
import { FloorPlanViewer } from "@/components/3d/FloorPlanViewer";

const theme = {
  primary: "#2C3E50",
  secondary: "#ECF0F1",
  accent: "#C9B037",
  background: "#FFFFFF",
  text: "#34495E",
};

export default function Immobilien3DRundgang() {
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
              <Link to="/templates/immobilien/objekte" className="text-sm hover:opacity-80 transition">Objekte</Link>
              <Link to="/templates/immobilien/3d-rundgang" className="text-sm font-semibold" style={{ color: theme.accent }}>3D-Rundgang</Link>
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
          <span className="font-semibold">3D-Grundriss-Viewer</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: `${theme.accent}20` }}>
              <Layers className="w-4 h-4" style={{ color: theme.accent }} />
              <span className="text-sm font-semibold" style={{ color: theme.primary }}>Innovative Technologie</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light mb-4">
              Interaktiver <span className="font-bold" style={{ color: theme.accent }}>3D-Grundriss</span>
            </h1>
            <p className="text-lg opacity-80">
              Erleben Sie Ihre zukünftige Immobilie in beeindruckendem 3D.
              Drehen, zoomen und erkunden Sie jeden Winkel virtuell.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3D Viewer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FloorPlanViewer />
          </motion.div>

          {/* Controls Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mt-8"
          >
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${theme.accent}20` }}>
                  <RotateCw className="w-6 h-6" style={{ color: theme.accent }} />
                </div>
                <h3 className="font-bold mb-2">Drehen</h3>
                <p className="text-sm text-gray-600">
                  Klicken und ziehen Sie, um die Ansicht zu drehen
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${theme.accent}20` }}>
                  <ZoomIn className="w-6 h-6" style={{ color: theme.accent }} />
                </div>
                <h3 className="font-bold mb-2">Zoomen</h3>
                <p className="text-sm text-gray-600">
                  Scrollen Sie, um hinein- oder herauszuzoomen
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${theme.accent}20` }}>
                  <Maximize className="w-6 h-6" style={{ color: theme.accent }} />
                </div>
                <h3 className="font-bold mb-2">Verschieben</h3>
                <p className="text-sm text-gray-600">
                  Rechtsklick + ziehen zum Verschieben
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-4">
              Warum <span className="font-bold" style={{ color: theme.accent }}>3D-Visualisierung?</span>
            </h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Moderne Technologie für ein perfektes Immobilien-Erlebnis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Layers,
                title: "Realistische Darstellung",
                desc: "Maßstabsgetreue 3D-Modelle mit korrekten Proportionen"
              },
              {
                icon: Home,
                title: "Raumgefühl",
                desc: "Verstehen Sie die Raumaufteilung und Größenverhältnisse"
              },
              {
                icon: Maximize,
                title: "Jederzeit verfügbar",
                desc: "Besichtigen Sie die Immobilie von überall aus, 24/7"
              },
              {
                icon: Share2,
                title: "Einfach teilen",
                desc: "Teilen Sie den 3D-Rundgang mit Familie und Freunden"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${theme.accent}15` }}>
                      <feature.icon className="w-8 h-8" style={{ color: theme.accent }} />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Überzeugt?</h2>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Für jede unserer Premium-Immobilien erstellen wir auf Wunsch einen
            individuellen 3D-Rundgang. Kontaktieren Sie uns für mehr Informationen.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/templates/immobilien/objekte">
              <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.primary }}>
                Objekte ansehen
              </Button>
            </Link>
            <Link to="/templates/immobilien/kontakt">
              <Button size="lg" variant="outline" className="rounded-full">
                Beratung anfordern
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
