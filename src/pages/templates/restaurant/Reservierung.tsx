import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Users, Home, ChevronRight } from "lucide-react";
import { useState } from "react";

const theme = { primary: "#8B1538", accent: "#D4AF37", background: "#1A1A1A", text: "#F4E4C1" };

export default function RestaurantReservierung() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", date: "", time: "", guests: "2", notes: "" });

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
          <span className="font-semibold">Reservierung</span>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif font-bold mb-4" style={{ color: theme.accent }}>Tisch reservieren</h1>
            <p className="text-xl opacity-80">Sichern Sie sich Ihren Platz in unserem Restaurant</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: theme.accent }}>Ihre Reservierung</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold">Name *</label>
                  <Input className="bg-white/10 border-white/20" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold">E-Mail *</label>
                    <Input type="email" className="bg-white/10 border-white/20" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Telefon *</label>
                    <Input type="tel" className="bg-white/10 border-white/20" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold">Datum *</label>
                    <Input type="date" className="bg-white/10 border-white/20" min={new Date().toISOString().split('T')[0]} value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Uhrzeit *</label>
                    <Input type="time" className="bg-white/10 border-white/20" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Anzahl Personen *</label>
                  <select className="w-full p-2 rounded bg-white/10 border border-white/20" value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Personen'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Besondere Wünsche</label>
                  <Textarea className="bg-white/10 border-white/20" rows={3} placeholder="Allergien, besonderer Anlass, etc." value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
                </div>
                <Button className="w-full" size="lg" style={{ backgroundColor: theme.primary }}>Reservierung anfragen</Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-serif font-bold mb-4" style={{ color: theme.accent }}>Öffnungszeiten</h3>
                {[
                  { day: "Dienstag - Freitag", time: "18:00 - 23:00 Uhr" },
                  { day: "Samstag", time: "12:00 - 15:00 & 18:00 - 23:00 Uhr" },
                  { day: "Sonntag", time: "12:00 - 21:00 Uhr" },
                  { day: "Montag", time: "Ruhetag" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-white/10 last:border-0">
                    <span className="font-semibold">{item.day}</span>
                    <span className="opacity-80">{item.time}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-serif font-bold mb-4" style={{ color: theme.accent }}>Wichtige Hinweise</h3>
                <ul className="space-y-2 text-sm opacity-80">
                  <li>• Reservierungen werden innerhalb von 24h bestätigt</li>
                  <li>• Tische werden 15 Min. nach Reservierungszeit freigegeben</li>
                  <li>• Für Gruppen ab 8 Personen kontaktieren Sie uns bitte direkt</li>
                  <li>• Dresscode: Business Casual</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
