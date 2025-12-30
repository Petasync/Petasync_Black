import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Scissors } from "lucide-react";

export default function FriseurHaarschnitt() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/friseur" className="text-2xl font-bold text-pink-600">Style & Elegance</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 text-purple-900">Haarschnitt</h1>
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            {name: "Damenschnitt", price: "45€", desc: "Inkl. Waschen & Föhnen"},
            {name: "Herrenschnitt", price: "35€", desc: "Inkl. Waschen & Styling"},
            {name: "Kinderschnitt", price: "25€", desc: "Bis 12 Jahre"},
            {name: "Bart-Styling", price: "20€", desc: "Trimmen & Rasieren"}
          ].map((service, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
              <Scissors className="w-10 h-10 mx-auto mb-4 text-pink-600" />
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
              <div className="text-2xl font-bold text-pink-600">{service.price}</div>
            </div>
          ))}
        </div>
        <Button size="lg" className="mt-12 bg-pink-600">Online Buchen</Button>
      </div>
    </div>
  );
}
