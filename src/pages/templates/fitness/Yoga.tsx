import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Calendar, Clock, Users } from "lucide-react";

export default function FitnessYoga() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/templates/fitness" className="text-2xl font-bold text-purple-600">FitLife Studio</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Hauptseite</Button></Link>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold mb-6 text-purple-900">Yoga Kurse</h1>
          <p className="text-xl mb-8 text-gray-600">Finde deine innere Balance und Stärke</p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {icon: Clock, label: "60-90 Min", desc: "Pro Session"},
              {icon: Users, label: "Max. 15", desc: "Teilnehmer"},
              {icon: Calendar, label: "7x/Woche", desc: "Kurse"}
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <item.icon className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                <div className="font-bold text-lg">{item.label}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </div>
            ))}
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-left">
            <h2 className="text-2xl font-bold mb-6">Kurszeiten</h2>
            {["Mo-Fr 06:00 - Morgen Yoga", "Mo-Fr 18:00 - After Work Yoga", "Sa 10:00 - Weekend Flow", "So 09:00 - Yin Yoga"].map((time, i) => (
              <div key={i} className="py-3 border-b last:border-0">{time}</div>
            ))}
          </div>
          <Button size="lg" className="mt-8 bg-purple-600"><Calendar className="mr-2" />Probestunde buchen</Button>
        </div>
      </div>
    </div>
  );
}
