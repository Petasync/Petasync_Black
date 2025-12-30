import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Scissors, ChevronRight, Calendar as CalendarIcon, Clock, User, Mail, Phone,
  CheckCircle2, ArrowRight, Sparkles
} from "lucide-react";

const theme = {
  primary: "#FF1493",
  secondary: "#000000",
  accent: "#FFD700",
  background: "#FFF5F8",
  text: "#1A1A1A",
};

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
];

const stylists = [
  { name: "Sophia Müller", specialty: "Coloration", avatar: "SM" },
  { name: "Elena Schmidt", specialty: "Hochzeit", avatar: "ES" },
  { name: "Laura Weber", specialty: "Schnitt", avatar: "LW" },
  { name: "Marie Fischer", specialty: "Trends", avatar: "MF" }
];

const services = [
  { id: "damenschnitt", name: "Damenschnitt", price: 45, duration: 45 },
  { id: "herrenschnitt", name: "Herrenschnitt", price: 35, duration: 30 },
  { id: "coloration", name: "Coloration", price: 65, duration: 90 },
  { id: "straehnchen", name: "Strähnchen", price: 85, duration: 120 },
  { id: "hochzeit", name: "Hochzeitsfrisur", price: 120, duration: 90 },
  { id: "treatment", name: "Premium Treatment", price: 95, duration: 60 }
];

export default function FriseurOnlineBuchung() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedStylist, setSelectedStylist] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const currentService = services.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/templates/friseur" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
              <Scissors className="inline" />
              Salon Élégance
            </Link>

            <div className="hidden md:flex gap-6 items-center">
              <Link to="/templates/friseur/services" className="hover:text-pink-600 transition-colors">Services</Link>
              <Link to="/templates/friseur/preise" className="hover:text-pink-600 transition-colors">Preise</Link>
              <Link to="/templates/friseur/team" className="hover:text-pink-600 transition-colors">Team</Link>
              <Link to="/templates/friseur/galerie" className="hover:text-pink-600 transition-colors">Galerie</Link>
              <Link to="/templates/friseur/buchung" className="font-semibold" style={{ color: theme.accent }}>Online-Buchung</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/templates/friseur" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Online-Buchung</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white shadow-sm">
              <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
              <span className="text-sm font-semibold">24/7 Online-Buchung</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Termin <span style={{ color: theme.primary }}>buchen</span>
            </h1>
            <p className="text-lg opacity-80">
              In nur 3 Schritten zu Ihrem Wunschtermin - schnell, einfach und bequem
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center">
            {[
              { num: 1, label: "Service & Stylist" },
              { num: 2, label: "Datum & Zeit" },
              { num: 3, label: "Ihre Daten" }
            ].map((s, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s.num
                        ? 'text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    style={step >= s.num ? { backgroundColor: theme.primary } : {}}
                  >
                    {step > s.num ? <CheckCircle2 className="w-6 h-6" /> : s.num}
                  </div>
                  <div className={`text-sm mt-2 font-semibold ${step >= s.num ? '' : 'text-gray-500'}`}>
                    {s.label}
                  </div>
                </div>
                {idx < 2 && (
                  <div className={`h-1 flex-1 mx-4 rounded ${step > s.num ? '' : 'bg-gray-200'}`}
                       style={step > s.num ? { backgroundColor: theme.primary } : {}} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">Wählen Sie Ihren Service</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedService === service.id ? 'ring-2 ring-pink-500 shadow-lg' : ''
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4" />
                            {service.duration} Min
                          </div>
                        </div>
                        <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                          {service.price}€
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">Wählen Sie Ihre Stylistin</h2>
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {stylists.map((stylist, idx) => (
                  <Card
                    key={idx}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedStylist === stylist.name ? 'ring-2 ring-pink-500 shadow-lg' : ''
                    }`}
                    onClick={() => setSelectedStylist(stylist.name)}
                  >
                    <CardContent className="pt-6 text-center">
                      <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                           style={{ backgroundColor: theme.primary }}>
                        {stylist.avatar}
                      </div>
                      <div className="font-semibold">{stylist.name}</div>
                      <div className="text-xs text-gray-600">{stylist.specialty}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full md:w-auto"
                style={{ backgroundColor: theme.primary }}
                disabled={!selectedService || !selectedStylist}
                onClick={() => setStep(2)}
              >
                Weiter <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">Wählen Sie Datum & Uhrzeit</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block font-semibold mb-3">Datum wählen</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="text-lg p-6"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-3">Verfügbare Zeiten</label>
                  <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={selectedTime === time ? "" : "border-pink-200 hover:border-pink-500"}
                        style={selectedTime === time ? { backgroundColor: theme.primary } : {}}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Zurück
                </Button>
                <Button
                  size="lg"
                  style={{ backgroundColor: theme.primary }}
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(3)}
                >
                  Weiter <ArrowRight className="ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Personal Info */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">Ihre Kontaktdaten</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block font-semibold mb-2">Name *</label>
                  <Input placeholder="Ihr vollständiger Name" className="h-12" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">E-Mail *</label>
                  <Input type="email" placeholder="ihre@email.de" className="h-12" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Telefon *</label>
                  <Input type="tel" placeholder="0123 456789" className="h-12" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Anmerkungen</label>
                  <Input placeholder="Besondere Wünsche?" className="h-12" />
                </div>
              </div>

              {/* Summary */}
              <Card className="mb-8 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
                <CardHeader>
                  <CardTitle>Ihre Buchungs-Zusammenfassung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-semibold">{currentService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stylistin:</span>
                    <span className="font-semibold">{selectedStylist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Datum:</span>
                    <span className="font-semibold">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uhrzeit:</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dauer:</span>
                    <span className="font-semibold">{currentService?.duration} Min</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="text-gray-600">Preis:</span>
                    <span className="text-2xl font-bold" style={{ color: theme.primary }}>
                      {currentService?.price}€
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Zurück
                </Button>
                <Button
                  size="lg"
                  style={{ backgroundColor: theme.primary }}
                  className="flex-1"
                >
                  <CheckCircle2 className="mr-2" />
                  Verbindlich buchen
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
