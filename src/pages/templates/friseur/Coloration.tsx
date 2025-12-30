import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Palette } from "lucide-react";

export default function FriseurColoration() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/friseur" className="text-2xl font-bold text-pink-600">Style & Elegance</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-8 text-purple-900">Coloration</h1>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {name: "Komplett-Färbung", price: "ab 65€"},
              {name: "Balayage", price: "ab 95€"},
              {name: "Highlights", price: "ab 75€"},
              {name: "Tönung", price: "ab 45€"},
              {name: "Ombre", price: "ab 85€"},
              {name: "Grauabdeckung", price: "ab 55€"}
            ].map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <Palette className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h3 className="font-bold mb-2">{service.name}</h3>
                <div className="text-xl font-bold text-pink-600">{service.price}</div>
              </div>
            ))}
          </div>
          <Button size="lg" className="mt-12 bg-purple-600">Beratungstermin</Button>
        </div>
      </div>
    </div>
  );
}
