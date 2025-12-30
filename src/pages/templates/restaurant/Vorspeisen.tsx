import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ChevronRight, UtensilsCrossed } from "lucide-react";

export default function RestaurantVorspeisen() {
  return (
    <div className="min-h-screen bg-amber-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/restaurant" className="text-2xl font-bold text-amber-700">La Bella Vista</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 pt-24 pb-6 text-sm">
        <Link to="/">Hauptseite</Link> <ChevronRight className="w-4 h-4 inline" /> <Link to="/templates/restaurant">Restaurant</Link> <ChevronRight className="w-4 h-4 inline" /> Vorspeisen
      </div>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold mb-8 text-center text-amber-900">Vorspeisen</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {name: "Beef Carpaccio", desc: "Hauchdünn geschnittenes Rinderfilet mit Rucola und Parmesan", price: "18€"},
              {name: "Burrata Salat", desc: "Cremige Burrata auf Rucola mit Kirschtomaten", price: "16€"},
              {name: "Vitello Tonnato", desc: "Kalbfleisch in Thunfischcreme", price: "19€"},
              {name: "Antipasti Misti", desc: "Gemischte italienische Vorspeisen für 2 Personen", price: "28€"}
            ].map((dish, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-amber-900">{dish.name}</h3>
                  <span className="text-xl font-bold text-amber-700">{dish.price}</span>
                </div>
                <p className="text-gray-600">{dish.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
