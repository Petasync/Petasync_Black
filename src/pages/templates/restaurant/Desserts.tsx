import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function RestaurantDesserts() {
  return (
    <div className="min-h-screen bg-amber-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/restaurant" className="text-2xl font-bold text-amber-700">La Bella Vista</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold mb-12 text-amber-900">Desserts</h1>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {name: "Tiramisu", desc: "Hausgemacht nach Originalrezept", price: "9€"},
              {name: "Panna Cotta", desc: "Mit Beerenkompott", price: "8€"},
              {name: "Tartufo Nero", desc: "Schokoladen-Eis-Trüffel", price: "10€"},
              {name: "Cannoli Siciliani", desc: "Gefüllt mit Ricotta-Creme", price: "11€"}
            ].map((d, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold text-amber-900 mb-2">{d.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{d.desc}</p>
                <span className="text-lg font-bold text-amber-700">{d.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
