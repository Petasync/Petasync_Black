import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ChevronRight, Calendar, Users, Wine, Music } from "lucide-react";

const theme = { primary: "#8B1538", accent: "#D4AF37", background: "#1A1A1A", text: "#F4E4C1" };

export default function RestaurantEvents() {
  const events = [
    { title: "Weinverkostung", date: "Jeden Freitag", time: "19:00 - 22:00 Uhr", price: "85€ p.P.", desc: "5-Gänge-Menü mit korrespondierenden Weinen", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop", icon: Wine },
    { title: "Live Jazz", date: "Jeden Samstag", time: "20:00 - 23:00 Uhr", price: "Kein Aufpreis", desc: "Jazz-Quartett begleitet Ihr Dinner", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&h=400&fit=crop", icon: Music },
    { title: "Chef's Table", date: "Nach Vereinbarung", time: "Ab 18:00 Uhr", price: "ab 250€ p.P.", desc: "Exklusives 8-Gänge-Menü direkt in der Küche", image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&h=400&fit=crop", icon: Users },
    { title: "Kochkurs", date: "1x monatlich", time: "15:00 - 20:00 Uhr", price: "180€ p.P.", desc: "Lernen Sie von unseren Sterneköchen", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop", icon: Calendar }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      <nav className="fixed top-0 w-full backdrop-blur-lg z-50 border-b" style={{ backgroundColor: `${theme.background}f5`, borderColor: `${theme.accent}30` }}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/templates/restaurant" className="text-2xl font-serif" style={{ color: theme.accent }}>La Belle Époque</Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Zur Hauptseite</Button></Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm opacity-60">
          <Link to="/">Hauptseite</Link><ChevronRight className="w-4 h-4" />
          <Link to="/templates/restaurant">Restaurant</Link><ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Events</span>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold mb-4" style={{ color: theme.accent }}>Events & Veranstaltungen</h1>
            <p className="text-xl opacity-80">Erleben Sie besondere kulinarische Momente</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, i) => (
              <div key={i} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition">
                <div className="h-48 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.accent}20` }}>
                      <event.icon className="w-5 h-5" style={{ color: theme.accent }} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold">{event.title}</h3>
                  </div>
                  <p className="opacity-80 mb-4">{event.desc}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="opacity-60">Termin:</span>
                      <span className="font-semibold">{event.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="opacity-60">Zeit:</span>
                      <span className="font-semibold">{event.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="opacity-60">Preis:</span>
                      <span className="font-semibold" style={{ color: theme.accent }}>{event.price}</span>
                    </div>
                  </div>
                  <Button className="w-full" style={{ backgroundColor: theme.primary }}>Jetzt buchen</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: theme.accent }}>Ihr privates Event</h2>
          <p className="text-lg opacity-80 mb-8">
            Planen Sie eine Feier, Firmenveranstaltung oder ein besonderes Dinner?<br/>
            Wir erstellen Ihnen ein maßgeschneidertes Angebot.
          </p>
          <Button size="lg" style={{ backgroundColor: theme.primary }}>Anfrage senden</Button>
        </div>
      </section>
    </div>
  );
}
