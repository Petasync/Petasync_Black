import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Phone, Home } from "lucide-react";

export default function AutowerkstattKarosserie() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/autowerkstatt" className="text-2xl font-bold text-red-600">AutoProfi</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-4 bg-gray-900 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Karosserie & Lack</h1>
        <p className="text-xl mb-8">Unfallreparatur • Lackierung • Dellen entfernen</p>
        <div className="text-4xl font-bold text-red-600 mb-8">ab 399€</div>
        <Button size="lg" className="bg-red-600"><Phone className="mr-2" />Gutachten anfordern</Button>
      </div>
    </div>
  );
}
