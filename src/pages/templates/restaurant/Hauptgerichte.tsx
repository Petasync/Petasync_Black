import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ChevronRight } from "lucide-react";

export default function RestaurantHauptgerichte() {
  return (
    <div className="min-h-screen bg-amber-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/restaurant" className="text-2xl font-bold text-amber-700">La Bella Vista</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold mb-12 text-center text-amber-900">Hauptgerichte</h1>
          <div className="space-y-6">
            {[
              {name: "Osso Buco", desc: "Geschmorte Kalbshaxe mit Safranrisotto", price: "32€", tag: "Signature"},
              {name: "Bistecca Fiorentina", desc: "T-Bone Steak vom Grill (500g)", price: "48€", tag: "Premium"},
              {name: "Spaghetti Carbonara", desc: "Klassisch mit Guanciale und Ei", price: "18€"},
              {name: "Branzino", desc: "Wolfsbarsch im Salzmantel", price: "36€"}
            ].map((dish, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-amber-900 mb-2">{dish.name} {dish.tag && <span className="text-sm bg-amber-600 text-white px-3 py-1 rounded-full ml-2">{dish.tag}</span>}</h3>
                    <p className="text-gray-600">{dish.desc}</p>
                  </div>
                  <span className="text-2xl font-bold text-amber-700">{dish.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
