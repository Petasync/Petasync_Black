import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Camera, Clock, Image } from "lucide-react";

export default function FotografHochzeit() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/fotograf" className="text-2xl font-bold text-gray-900">PixelPerfect</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold mb-8 text-center">Hochzeitsfotografie</h1>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {icon: Clock, title: "Ganztägig", desc: "8-12 Stunden"},
              {icon: Camera, title: "2 Fotografen", desc: "Keine Moment verpassen"},
              {icon: Image, title: "500+ Bilder", desc: "Professionell bearbeitet"}
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
                <item.icon className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Premium Paket</h2>
            <div className="text-5xl font-bold mb-8">ab 2.500€</div>
            <Button size="lg" className="bg-gray-900">Anfrage senden</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
