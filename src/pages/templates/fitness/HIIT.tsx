import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Zap } from "lucide-react";

export default function FitnessHIIT() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/fitness" className="text-2xl font-bold text-purple-600">FitLife</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 text-red-900">HIIT Training</h1>
        <p className="text-xl mb-8">High Intensity Interval Training - Maximale Ergebnisse in kürzester Zeit</p>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <Zap className="w-16 h-16 mx-auto mb-6 text-red-600" />
          <h2 className="text-2xl font-bold mb-4">Kurszeiten</h2>
          <div className="space-y-3 text-left">
            {["Montag 17:00", "Mittwoch 17:00", "Freitag 17:00"].map((t, i) => (
              <div key={i} className="p-4 bg-red-50 rounded-lg font-semibold">{t}</div>
            ))}
          </div>
          <Button size="lg" className="mt-8 bg-red-600">Jetzt anmelden</Button>
        </div>
      </div>
    </div>
  );
}
