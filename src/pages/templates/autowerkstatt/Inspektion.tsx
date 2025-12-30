import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, CheckCircle2, Phone, Calendar, ChevronRight, Home } from "lucide-react";

const theme = { primary: "#DC2626", secondary: "#1F2937", accent: "#FBBF24" };

export default function AutowerkstattInspektion() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/templates/autowerkstatt" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
            <Wrench />AutoProfi Werkstatt
          </Link>
          <div className="flex gap-4">
            <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Zur Hauptseite</Button></Link>
            <Button style={{ backgroundColor: theme.primary }}>Termin buchen</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/">Hauptseite</Link><ChevronRight className="w-4 h-4" />
          <Link to="/templates/autowerkstatt">Autowerkstatt</Link><ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Inspektion & Wartung</span>
        </div>
      </div>

      <section className="py-16 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Inspektion & Wartung</h1>
          <p className="text-xl mb-8">Regelmäßige Checks nach Herstellervorgaben für maximale Fahrzeugsicherheit</p>
          <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.primary }}>
            <Calendar className="mr-2" />Jetzt Termin vereinbaren
          </Button>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {["Ölwechsel", "Filterwechsel (Luft, Öl, Kraftstoff)", "Bremsencheck", "Flüssigkeiten auffüllen", "Beleuchtung prüfen", "Reifen & Reifendruck"].map((item, i) => (
              <Card key={i}>
                <CardContent className="pt-6 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: theme.accent }} />
                  <span>{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" style={{ color: theme.primary }}>ab 149€</div>
            <p className="text-gray-600 mb-8">Dauer: 2-3 Stunden • Inkl. Material</p>
            <Button size="lg" style={{ backgroundColor: theme.primary }}><Phone className="mr-2" />0800 AUTO 123</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
