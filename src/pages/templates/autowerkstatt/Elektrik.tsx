import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Phone, ChevronRight, Home, Battery, Lightbulb, Cpu } from "lucide-react";

export default function AutowerkstattElektrik() {
  const theme = { primary: "#DC2626" };
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/autowerkstatt" className="text-2xl font-bold" style={{ color: theme.primary }}>AutoProfi</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-4 bg-gray-900 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Elektrik & Elektronik</h1>
        <p className="text-xl mb-8">Moderne Fahrzeugelektronik - Diagnose & Reparatur</p>
        <div className="text-4xl font-bold" style={{ color: theme.primary }}>ab 89€</div>
      </div>
      <div className="container mx-auto px-4 py-16 max-w-3xl grid md:grid-cols-3 gap-6">
        {[{icon: Cpu, title: "Fehlerdiagnose"}, {icon: Battery, title: "Batterietest"}, {icon: Lightbulb, title: "Lichteinstellung"}].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
            <s.icon className="w-12 h-12 mx-auto mb-4" style={{ color: theme.primary }} />
            <h3 className="font-bold">{s.title}</h3>
          </div>
        ))}
      </div>
      <div className="text-center pb-16">
        <Button size="lg" style={{ backgroundColor: theme.primary }}><Phone className="mr-2" />0800 AUTO 123</Button>
      </div>
    </div>
  );
}
