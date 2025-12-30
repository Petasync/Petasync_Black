import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gauge, Phone, Home, CheckCircle2 } from "lucide-react";

export default function AutowerkstattTUV() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/autowerkstatt" className="text-2xl font-bold text-red-600">AutoProfi</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-4 bg-gray-900 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">TÜV & AU</h1>
        <p className="text-xl mb-8">Hauptuntersuchung & Abgasuntersuchung</p>
        <div className="text-4xl font-bold text-red-600 mb-8">139€</div>
        <p className="mb-8">Inkl. Vor-TÜV Check • Bei uns TÜV-Prüfstelle vor Ort!</p>
        <Button size="lg" className="bg-red-600"><Phone className="mr-2" />Termin buchen</Button>
      </div>
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6">Inklusivleistungen</h2>
          {["Vor-TÜV Inspektion", "TÜV Hauptuntersuchung", "Abgasuntersuchung (AU)", "Mängelbeseitigung möglich"].map(item => (
            <div key={item} className="flex items-center gap-3 py-3 border-b last:border-0">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
