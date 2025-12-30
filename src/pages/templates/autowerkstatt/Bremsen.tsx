import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, Phone, ChevronRight, Home } from "lucide-react";

const theme = { primary: "#DC2626" };

export default function AutowerkstattBremsen() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full bg-white/95 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/templates/autowerkstatt" className="text-2xl font-bold" style={{ color: theme.primary }}>AutoProfi</Link>
          <div className="flex gap-4">
            <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Zur Hauptseite</Button></Link>
            <Button style={{ backgroundColor: theme.primary }}>Termin</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-6 text-sm text-gray-600">
        <Link to="/">Hauptseite</Link> <ChevronRight className="w-4 h-4 inline" /> <Link to="/templates/autowerkstatt">Autowerkstatt</Link> <ChevronRight className="w-4 h-4 inline" /> <span className="font-semibold">Bremsen & Fahrwerk</span>
      </div>

      <section className="py-16 px-4 bg-gray-900 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Bremsen & Fahrwerk</h1>
        <p className="text-xl mb-8">Sicherheit für Sie und Ihr Auto</p>
        <div className="text-4xl font-bold mb-8" style={{ color: theme.primary }}>ab 179€</div>
        <Button size="lg" style={{ backgroundColor: theme.primary }}><Phone className="mr-2" />0800 AUTO 123</Button>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl grid md:grid-cols-2 gap-4">
          {["Bremsscheiben", "Bremsbeläge", "Stoßdämpfer", "Spureinstellung"].map(item => (
            <div key={item} className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
              <CheckCircle2 className="w-5 h-5" style={{ color: theme.primary }} />
              <span className="font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
