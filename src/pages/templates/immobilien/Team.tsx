import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home, ChevronRight, Award, Phone, Mail, Linkedin, TrendingUp, Users
} from "lucide-react";

const theme = {
  primary: "#2C3E50",
  secondary: "#ECF0F1",
  accent: "#C9B037",
  background: "#FFFFFF",
  text: "#34495E",
};

const team = [
  {
    name: "Dr. Michael Lehmann",
    role: "Geschäftsführer & Gründer",
    specialty: "Luxusimmobilien",
    experience: "25 Jahre",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    sales: "500+ Mio €",
    phone: "+49 89 123 456-10",
    email: "m.lehmann@luxuryestate.de",
    bio: "Pionier im Luxusimmobilienmarkt mit internationaler Erfahrung und einem exklusiven Netzwerk."
  },
  {
    name: "Sandra Weber",
    role: "Senior Maklerin",
    specialty: "Villen & Penthouse",
    experience: "18 Jahre",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    sales: "250+ Mio €",
    phone: "+49 89 123 456-11",
    email: "s.weber@luxuryestate.de",
    bio: "Spezialistin für hochwertige Wohnimmobilien mit Leidenschaft für Design und Architektur."
  },
  {
    name: "Thomas Koch",
    role: "Immobilienexperte",
    specialty: "Gewerbe & Investment",
    experience: "20 Jahre",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop",
    sales: "400+ Mio €",
    phone: "+49 89 123 456-12",
    email: "t.koch@luxuryestate.de",
    bio: "Experte für Gewerbeimmobilien und renditestarke Investment-Objekte."
  },
  {
    name: "Julia Hoffmann",
    role: "Maklerin",
    specialty: "Einfamilienhäuser",
    experience: "12 Jahre",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    sales: "180+ Mio €",
    phone: "+49 89 123 456-13",
    email: "j.hoffmann@luxuryestate.de",
    bio: "Vertrauensvolle Beraterin für Familien auf der Suche nach ihrem Traumhaus."
  },
];

export default function ImmobilienTeam() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b bg-white/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/templates/immobilien" className="flex items-center gap-3">
              <Home className="w-7 h-7" style={{ color: theme.accent }} />
              <div>
                <div className="text-2xl font-light tracking-wide" style={{ color: theme.primary }}>LuxuryEstate</div>
                <div className="text-xs tracking-widest" style={{ color: theme.accent }}>PREMIUM IMMOBILIEN</div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              <Link to="/templates/immobilien" className="text-sm hover:opacity-80 transition">Home</Link>
              <Link to="/templates/immobilien/objekte" className="text-sm hover:opacity-80 transition">Objekte</Link>
              <Link to="/templates/immobilien/3d-rundgang" className="text-sm hover:opacity-80 transition">3D-Rundgang</Link>
              <Link to="/templates/immobilien/verkaufen" className="text-sm hover:opacity-80 transition">Verkaufen</Link>
              <Link to="/templates/immobilien/team" className="text-sm font-semibold" style={{ color: theme.accent }}>Team</Link>
              <Link to="/templates/immobilien/kontakt" className="text-sm hover:opacity-80 transition">Kontakt</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/templates/immobilien" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Unser Team</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: `${theme.accent}20` }}>
              <Users className="w-4 h-4" style={{ color: theme.accent }} />
              <span className="text-sm font-semibold" style={{ color: theme.primary }}>Experten mit Leidenschaft</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light mb-4">
              Ihr <span className="font-bold" style={{ color: theme.accent }}>Dream-Team</span>
            </h1>
            <p className="text-lg opacity-80">
              Erfahrene Makler mit über 1,3 Milliarden Euro Transaktionsvolumen
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "75+", label: "Jahre kombinierte Erfahrung" },
              { number: "1,3 Mrd €", label: "Transaktionsvolumen" },
              { number: "1.200+", label: "Verkaufte Objekte" },
              { number: "98%", label: "Kundenzufriedenheit" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2" style={{ color: theme.accent }}>
                  {stat.number}
                </div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="grid md:grid-cols-5">
                    <div className="md:col-span-2 h-80 md:h-auto">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-2xl mb-2">{member.name}</CardTitle>
                            <p className="text-sm font-semibold" style={{ color: theme.accent }}>
                              {member.role}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 rounded-full hover:bg-gray-100 transition">
                              <Linkedin className="w-5 h-5" style={{ color: theme.primary }} />
                            </button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">{member.bio}</p>

                          <div className="grid grid-cols-2 gap-4 py-4 border-y">
                            <div>
                              <div className="text-xs text-gray-600 mb-1">Spezialisierung</div>
                              <div className="font-semibold text-sm">{member.specialty}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-600 mb-1">Erfahrung</div>
                              <div className="font-semibold text-sm">{member.experience}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="w-4 h-4" style={{ color: theme.accent }} />
                            <span className="font-semibold">Verkaufsvolumen:</span>
                            <span style={{ color: theme.accent }}>{member.sales}</span>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" style={{ color: theme.accent }} />
                              <a href={`tel:${member.phone}`} className="hover:underline">{member.phone}</a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" style={{ color: theme.accent }} />
                              <a href={`mailto:${member.email}`} className="hover:underline">{member.email}</a>
                            </div>
                          </div>

                          <Button className="w-full mt-4" style={{ backgroundColor: theme.primary }}>
                            Termin vereinbaren
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Lernen Sie uns persönlich kennen</h2>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Vereinbaren Sie einen unverbindlichen Beratungstermin mit einem unserer Experten
          </p>
          <Link to="/templates/immobilien/kontakt">
            <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.accent }}>
              Kontakt aufnehmen
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
