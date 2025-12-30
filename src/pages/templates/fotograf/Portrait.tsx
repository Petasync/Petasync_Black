import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, User } from "lucide-react";

export default function FotografPortrait() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/fotograf" className="text-2xl font-bold">PixelPerfect</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Portraitfotografie</h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto">Business Portraits, Bewerbungsfotos, Family Shoots</p>
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <User className="w-16 h-16 mx-auto mb-6 text-gray-700" />
          <div className="text-3xl font-bold mb-2">ab 150€</div>
          <p className="text-gray-600 mb-6">30-60 Min Shooting • 20+ bearbeitete Bilder</p>
          <Button size="lg" className="w-full bg-gray-900">Termin buchen</Button>
        </div>
      </div>
    </div>
  );
}
