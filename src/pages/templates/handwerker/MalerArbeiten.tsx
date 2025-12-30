import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drill, CheckCircle2, Phone, Calendar, ChevronRight, Home,
  Paintbrush, Palette, Pipette, Sparkles
} from "lucide-react";

const theme = {
  primary: "#FF6B35",
  secondary: "#2D3142",
  accent: "#F4B860",
  background: "#F8F9FA",
  text: "#1A1A1A",
};

export default function MalerArbeiten() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/templates/handwerker" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
              <Drill className="inline" />ProBau Handwerk
            </Link>
            <div className="flex gap-4 items-center">
              <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Zur Hauptseite</Button></Link>
              <Button style={{ backgroundColor: theme.primary }}>Jetzt anfragen</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/">Hauptseite</Link><ChevronRight className="w-4 h-4" />
          <Link to="/templates/handwerker">Handwerker</Link><ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Maler-Arbeiten</span>
        </div>
      </div>

      <section className="py-16 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-5xl font-bold mb-6 text-white">Maler-Arbeiten in Top-Qualität</h1>
              <p className="text-xl mb-8 text-gray-300">
                Innen- und Außenanstriche, Tapezierarbeiten und Fassadengestaltung vom Meisterbetrieb.
              </p>
              <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.primary }}>
                <Calendar className="mr-2" />Farbberatung buchen
              </Button>
            </motion.div>
            <img src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=600&fit=crop" alt="Maler" className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Unsere Leistungen</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Paintbrush, title: "Innenanstrich", desc: "Wände, Decken, Türen" },
              { icon: Palette, title: "Außenanstrich", desc: "Fassaden-Gestaltung" },
              { icon: Pipette, title: "Tapezieren", desc: "Moderne Wandgestaltung" },
              { icon: Sparkles, title: "Spezialarbeiten", desc: "Spachteltechnik, Lacke" }
            ].map((s, i) => (
              <Card key={i}>
                <CardContent className="pt-6 text-center">
                  <s.icon className="w-12 h-12 mx-auto mb-4" style={{ color: theme.primary }} />
                  <h3 className="font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ab 49€/Stunde</h2>
          <p className="text-gray-600 mb-8">Inklusive Farbe • Kostenlose Farbberatung</p>
          <Button size="lg" style={{ backgroundColor: theme.primary }}>
            <Phone className="mr-2" />Angebot anfordern
          </Button>
        </div>
      </section>
    </div>
  );
}
