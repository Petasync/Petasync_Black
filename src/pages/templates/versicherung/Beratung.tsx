import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Shield, ChevronRight, Calendar, Clock, User, Mail, Phone, MapPin,
  CheckCircle2, MessageSquare, Video, Users, Star, Sparkles
} from "lucide-react";

const theme = {
  primary: "#0066CC",
  secondary: "#F0F8FF",
  accent: "#00CC66",
  background: "#FFFFFF",
  text: "#1A1A1A",
};

const advisors = [
  {
    name: "Dr. Michael Weber",
    role: "Senior Versicherungsberater",
    specialty: "Kranken- & Lebensversicherung",
    experience: "15 Jahre Erfahrung",
    rating: 4.9,
    reviews: 234,
    avatar: "MW",
    availability: ["Mo-Fr: 08:00-18:00", "Sa: 09:00-13:00"]
  },
  {
    name: "Sarah Müller",
    role: "Versicherungsexpertin",
    specialty: "Kfz & Haftpflicht",
    experience: "12 Jahre Erfahrung",
    rating: 4.8,
    reviews: 189,
    avatar: "SM",
    availability: ["Mo-Fr: 09:00-17:00"]
  },
  {
    name: "Thomas Schmidt",
    role: "Finanzberater",
    specialty: "Altersvorsorge & BU",
    experience: "20 Jahre Erfahrung",
    rating: 5.0,
    reviews: 312,
    avatar: "TS",
    availability: ["Mo-Fr: 08:00-20:00", "Sa: 10:00-14:00"]
  },
  {
    name: "Lisa Bauer",
    role: "Versicherungsmaklerin",
    specialty: "Gewerbe & Immobilien",
    experience: "10 Jahre Erfahrung",
    rating: 4.9,
    reviews: 156,
    avatar: "LB",
    availability: ["Mo-Do: 08:00-18:00", "Fr: 08:00-16:00"]
  }
];

const consultationTypes = [
  {
    icon: Video,
    title: "Video-Beratung",
    duration: "30-60 Min",
    description: "Bequem von zu Hause aus - persönliche Beratung per Videocall",
    popular: true
  },
  {
    icon: Phone,
    title: "Telefon-Beratung",
    duration: "20-45 Min",
    description: "Schnelle Klärung Ihrer Fragen am Telefon"
  },
  {
    icon: Users,
    title: "Vor-Ort Termin",
    duration: "60-90 Min",
    description: "Persönliches Treffen in unserer Filiale oder bei Ihnen"
  },
  {
    icon: MessageSquare,
    title: "Chat-Beratung",
    duration: "Live",
    description: "Sofortige Hilfe via Live-Chat mit unseren Experten"
  }
];

export default function VersicherungBeratung() {
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const [selectedType, setSelectedType] = useState("video");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    topic: ""
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/templates/versicherung" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
              <Shield className="inline" />
              SecureLife Versicherungen
            </Link>

            <div className="hidden md:flex gap-6 items-center">
              <Link to="/templates/versicherung" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/templates/versicherung/rechner" className="hover:text-blue-600 transition-colors">Rechner</Link>
              <Link to="/templates/versicherung/produkte" className="hover:text-blue-600 transition-colors">Produkte</Link>
              <Link to="/templates/versicherung/beratung" className="font-semibold" style={{ color: theme.accent }}>Beratung</Link>
              <Button style={{ backgroundColor: theme.primary }}>
                Angebot anfordern
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/templates/versicherung" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Beratung</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white shadow-sm">
              <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
              <span className="text-sm font-semibold">Kostenlose Erstberatung</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Persönliche <span style={{ color: theme.primary }}>Beratung</span>
            </h1>
            <p className="text-lg opacity-80">
              Vereinbaren Sie einen kostenlosen Beratungstermin mit unseren
              Versicherungsexperten - online, telefonisch oder vor Ort
            </p>
          </motion.div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Wählen Sie Ihre Beratungsart</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {consultationTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-xl ${
                    type.popular ? 'ring-2 ring-blue-500 relative' : ''
                  }`}
                  onClick={() => setSelectedType(type.title.toLowerCase().split('-')[0])}
                >
                  {type.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                         style={{ backgroundColor: theme.accent }}>
                      Beliebt
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                         style={{ backgroundColor: `${theme.primary}20` }}>
                      <type.icon className="w-8 h-8" style={{ color: theme.primary }} />
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-sm font-semibold mb-2" style={{ color: theme.primary }}>
                      <Clock className="w-4 h-4 inline mr-1" />
                      {type.duration}
                    </div>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Advisors Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Unsere Berater</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {advisors.map((advisor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-xl ${
                      selectedAdvisor === advisor.name ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedAdvisor(advisor.name)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                             style={{ backgroundColor: theme.primary }}>
                          {advisor.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{advisor.name}</h3>
                          <p className="text-sm text-gray-600">{advisor.role}</p>
                          <p className="text-sm font-semibold mt-1" style={{ color: theme.primary }}>
                            {advisor.specialty}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                            <span>{advisor.experience}</span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {advisor.rating} ({advisor.reviews})
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            {advisor.availability.map((av, idx) => (
                              <div key={idx} className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {av}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl">Termin vereinbaren</CardTitle>
              <p className="text-sm text-gray-600">Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Ihr Name *</label>
                  <Input
                    placeholder="Max Mustermann"
                    className="h-12 bg-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">E-Mail *</label>
                  <Input
                    type="email"
                    placeholder="max@beispiel.de"
                    className="h-12 bg-white"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Telefon *</label>
                  <Input
                    type="tel"
                    placeholder="0123 456789"
                    className="h-12 bg-white"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Wunschthema</label>
                  <Input
                    placeholder="z.B. Krankenversicherung"
                    className="h-12 bg-white"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Wunschdatum *</label>
                  <Input
                    type="date"
                    className="h-12 bg-white"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Wunschzeit *</label>
                  <Input
                    type="time"
                    className="h-12 bg-white"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>

              {selectedAdvisor && (
                <div className="mt-4 p-4 rounded-lg bg-white border border-green-200">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                    <span className="font-semibold">Ausgewählter Berater:</span>
                    <span>{selectedAdvisor}</span>
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 rounded-lg bg-white">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-gray-600">
                    Ich habe die <a href="#" className="underline">Datenschutzerklärung</a> gelesen und
                    stimme der Verarbeitung meiner Daten zu.
                  </span>
                </label>
              </div>

              <Button
                size="lg"
                className="w-full mt-6"
                style={{ backgroundColor: theme.primary }}
              >
                <Calendar className="mr-2" />
                Beratungstermin anfragen
              </Button>

              <p className="text-xs text-center text-gray-500 mt-4">
                * Pflichtfelder • Wir melden uns innerhalb von 24 Stunden bei Ihnen
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Book Consultation */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Warum eine persönliche Beratung?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: User,
                title: "Individuelle Analyse",
                desc: "Wir analysieren Ihre persönliche Situation und finden die optimale Lösung"
              },
              {
                icon: Shield,
                title: "Unabhängige Beratung",
                desc: "Als Versicherungsmakler vergleichen wir alle Anbieter für Sie"
              },
              {
                icon: CheckCircle2,
                title: "Kostenlos & Unverbindlich",
                desc: "Die Erstberatung ist für Sie völlig kostenlos und ohne Verpflichtung"
              }
            ].map((item, idx) => (
              <Card key={idx} className="text-center border-blue-100">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                       style={{ backgroundColor: `${theme.primary}20` }}>
                    <item.icon className="w-6 h-6" style={{ color: theme.primary }} />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-4" style={{ backgroundColor: theme.primary }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-white text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-3" style={{ color: theme.accent }} />
              <div className="font-semibold mb-1">Hotline</div>
              <a href="tel:08001234567" className="text-lg hover:opacity-80 transition">
                0800 123 456 7
              </a>
              <div className="text-xs opacity-70 mt-1">Mo-Fr 08:00-20:00 Uhr</div>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 mb-3" style={{ color: theme.accent }} />
              <div className="font-semibold mb-1">E-Mail</div>
              <a href="mailto:beratung@securelife.de" className="text-lg hover:opacity-80 transition">
                beratung@securelife.de
              </a>
              <div className="text-xs opacity-70 mt-1">Antwort innerhalb 24h</div>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 mb-3" style={{ color: theme.accent }} />
              <div className="font-semibold mb-1">Filialen</div>
              <div className="text-lg">Bundesweit 50+ Standorte</div>
              <div className="text-xs opacity-70 mt-1">Filiale in Ihrer Nähe finden</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
