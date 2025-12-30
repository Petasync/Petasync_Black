import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, CheckCircle2, Phone, Calendar, ChevronRight, Home } from "lucide-react";

const theme = { primary: "#DC2626", secondary: "#1F2937", accent: "#FBBF24" };

export default function AutowerkstattMotor() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/templates/autowerkstatt" className="text-2xl font-bold" style={{ color: theme.primary }}>AutoProfi Werkstatt</Link>
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
          <span className="font-semibold">Motor & Getriebe</span>
        </div>
      </div>

      <section className="py-16 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Motor & Getriebe</h1>
          <p className="text-xl mb-8">Professionelle Reparatur und Überholung mit Garantie</p>
          <Button size="lg" style={{ backgroundColor: theme.primary }}><Calendar className="mr-2" />Diagnose-Termin buchen</Button>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-4xl font-bold mb-2" style={{ color: theme.primary }}>ab 299€</div>
          <p className="text-gray-600 mb-8">Inkl. Fehlerdiagnose • Dauer variabel</p>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {["Fehlerdiagnose", "Motor-Reparatur", "Getriebe-Service", "2 Jahre Garantie"].map((item, i) => (
              <Card key={i}><CardContent className="pt-6 text-center"><CheckCircle2 className="w-8 h-8 mx-auto mb-2" style={{ color: theme.accent }} /><p className="font-semibold">{item}</p></CardContent></Card>
            ))}
          </div>
          <Button size="lg" style={{ backgroundColor: theme.primary }}><Phone className="mr-2" />Kostenlose Beratung</Button>
        </div>
      </section>
    </div>
  );
}
