import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Scissors, ChevronRight, Star, Award, Calendar, Sparkles } from "lucide-react";

const theme = {
  primary: "#FF1493",
  secondary: "#000000",
  accent: "#FFD700",
  background: "#FFF5F8",
  text: "#1A1A1A",
};

const team = [
  {
    name: "Isabella Rossi",
    role: "Salon-Inhaberin & Master Stylistin",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=600&fit=crop",
    experience: "18 Jahre",
    specialties: ["Balayage", "Hochsteckfrisuren", "Brautstyling"],
    description: "Isabella hat in Mailand und Paris studiert und bringt internationale Expertise nach München."
  },
  {
    name: "Sophie Müller",
    role: "Senior Stylistin",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
    experience: "12 Jahre",
    specialties: ["Coloration", "Ombré", "Kreativschnitte"],
    description: "Spezialistin für komplexe Farbarbeiten und kreative Color-Looks."
  },
  {
    name: "Lena Schmidt",
    role: "Stylistin",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop",
    experience: "8 Jahre",
    specialties: ["Kurzhaarschnitte", "Styling", "Trends"],
    description: "Trend-Scout mit Auge für moderne Schnitte und aktuelle Styles."
  },
  {
    name: "Marco Bianchi",
    role: "Master Barber",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
    experience: "15 Jahre",
    specialties: ["Herrenschnitte", "Bartpflege", "Nassrasur"],
    description: "Spezialist für klassische und moderne Herrenschnitte sowie traditionelle Bartpflege."
  },
  {
    name: "Anna Kowalski",
    role: "Coloristin",
    image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=500&h=600&fit=crop",
    experience: "10 Jahre",
    specialties: ["Blondierung", "Grauabdeckung", "Pastelltöne"],
    description: "Farbexpertin mit Zertifizierungen in allen führenden Colorlinien."
  },
  {
    name: "Julia Weber",
    role: "Stylistin & Make-up Artist",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&h=600&fit=crop",
    experience: "6 Jahre",
    specialties: ["Event-Styling", "Make-up", "Hochzeiten"],
    description: "Doppelqualifiziert in Hairstyling und Make-up für perfekte Gesamtlooks."
  }
];

export default function FriseurTeam() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/templates/friseur" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
            <Scissors />
            Salon Élégance
          </Link>
          <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Zur Hauptseite</Button></Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/">Hauptseite</Link><ChevronRight className="w-4 h-4" />
          <Link to="/templates/friseur">Salon</Link><ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Team</span>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white shadow-sm">
              <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
              <span className="text-sm font-semibold">Unser Team</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Leidenschaftliche <span style={{ color: theme.primary }}>Stylisten</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unser Team besteht aus hochqualifizierten Stylisten mit internationaler Erfahrung.
              Jeder bringt seine einzigartige Expertise und Leidenschaft mit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <Card key={idx} className="overflow-hidden border-pink-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: theme.primary }}>
                    <Award className="w-4 h-4" />
                    <span className="font-semibold">{member.experience} Erfahrung</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{member.description}</p>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase">Spezialisierungen:</div>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Buchen Sie Ihren Lieblings-Stylisten</h2>
            <p className="text-lg mb-6 text-gray-600">
              Bei der Online-Buchung können Sie Ihren bevorzugten Stylisten auswählen
            </p>
            <Link to="/templates/friseur/buchung">
              <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.primary }}>
                <Calendar className="mr-2" />
                Jetzt Termin buchen
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: Star, number: "50+", text: "Jahre kombinierte Erfahrung" },
              { icon: Award, number: "20+", text: "Nationale & Internationale Auszeichnungen" },
              { icon: Sparkles, number: "5000+", text: "Zufriedene Kunden jährlich" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-pink-100">
                <stat.icon className="w-10 h-10 mx-auto mb-3" style={{ color: theme.primary }} />
                <div className="text-4xl font-bold mb-2" style={{ color: theme.primary }}>{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
