import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Wrench, ChevronRight, Car, Calculator, CheckCircle2, Euro, Clock, AlertCircle
} from "lucide-react";

const theme = {
  primary: "#DC2626",
  secondary: "#1F2937",
  accent: "#FBBF24",
  background: "#FFFFFF",
  text: "#111827",
};

const services = {
  inspektion: { name: "Inspektion", basePrice: 149, duration: 120 },
  oelwechsel: { name: "Ölwechsel", basePrice: 79, duration: 30 },
  bremsen: { name: "Bremsenwechsel (vorne)", basePrice: 179, duration: 90 },
  reifen: { name: "Reifenwechsel (4x)", basePrice: 49, duration: 45 },
  klimaservice: { name: "Klimaservice", basePrice: 69, duration: 60 },
  tuev: { name: "TÜV + AU", basePrice: 119, duration: 60 },
  zahnriemen: { name: "Zahnriemenwechsel", basePrice: 599, duration: 240 },
  auspuff: { name: "Auspuff-Reparatur", basePrice: 299, duration: 120 }
};

const carTypes = {
  klein: { label: "Kleinwagen", factor: 1.0 },
  mittel: { label: "Mittelklasse", factor: 1.2 },
  gross: { label: "Oberklasse/SUV", factor: 1.4 },
  transporter: { label: "Transporter", factor: 1.6 }
};

export default function AutowerkstattPreisrechner() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [carType, setCarType] = useState("mittel");
  const [urgency, setUrgency] = useState(false);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    const typeFactor = carTypes[carType as keyof typeof carTypes].factor;
    const urgencyFactor = urgency ? 1.3 : 1.0;

    const total = selectedServices.reduce((sum, serviceId) => {
      const service = services[serviceId as keyof typeof services];
      return sum + (service.basePrice * typeFactor * urgencyFactor);
    }, 0);

    return Math.round(total);
  };

  const calculateDuration = () => {
    return selectedServices.reduce((sum, serviceId) => {
      const service = services[serviceId as keyof typeof services];
      return sum + service.duration;
    }, 0);
  };

  const total = calculateTotal();
  const duration = calculateDuration();

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/templates/autowerkstatt" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
              <Wrench className="inline" />
              Auto-Werkstatt Pro
            </Link>

            <div className="hidden md:flex gap-6 items-center">
              <Link to="/templates/autowerkstatt" className="hover:text-red-600 transition-colors">Home</Link>
              <Link to="/templates/autowerkstatt/services" className="hover:text-red-600 transition-colors">Services</Link>
              <Link to="/templates/autowerkstatt/preisrechner" className="font-semibold" style={{ color: theme.accent }}>Preisrechner</Link>
              <Link to="/templates/autowerkstatt/team" className="hover:text-red-600 transition-colors">Team</Link>
              <Button style={{ backgroundColor: theme.primary }}>
                Termin buchen
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/templates/autowerkstatt" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Preisrechner</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white shadow-sm">
              <Calculator className="w-4 h-4" style={{ color: theme.primary }} />
              <span className="text-sm font-semibold">Kostenlos & unverbindlich</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Preis<span style={{ color: theme.primary }}>rechner</span>
            </h1>
            <p className="text-lg opacity-80">
              Berechnen Sie sofort die Kosten für Ihre Autoreparatur.
              Transparent, fair und ohne versteckte Gebühren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Configuration */}
            <div className="md:col-span-2 space-y-8">
              {/* Car Type */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="w-5 h-5" style={{ color: theme.primary }} />
                      Fahrzeugtyp wählen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(carTypes).map(([id, type]) => (
                        <Button
                          key={id}
                          variant={carType === id ? "default" : "outline"}
                          className={`h-auto py-4 ${carType === id ? "" : "border-red-200"}`}
                          style={carType === id ? { backgroundColor: theme.primary } : {}}
                          onClick={() => setCarType(id)}
                        >
                          <div className="text-center">
                            <Car className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-semibold">{type.label}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="w-5 h-5" style={{ color: theme.primary }} />
                      Services auswählen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {Object.entries(services).map(([id, service]) => (
                        <button
                          key={id}
                          onClick={() => toggleService(id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedServices.includes(id)
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              selectedServices.includes(id)
                                ? 'border-red-500 bg-red-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedServices.includes(id) && (
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold mb-1">{service.name}</div>
                              <div className="text-sm text-gray-600 flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Euro className="w-3 h-3" />
                                  ab {service.basePrice}€
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {service.duration}min
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Urgency */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={urgency}
                        onChange={(e) => setUrgency(e.target.checked)}
                        className="w-5 h-5 accent-red-600"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">Express-Service (+30%)</div>
                        <div className="text-sm text-gray-600">Bevorzugte Bearbeitung innerhalb von 24h</div>
                      </div>
                    </label>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right: Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" style={{ color: theme.primary }} />
                      Kostenschätzung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedServices.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Wählen Sie Services aus</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          {selectedServices.map(id => {
                            const service = services[id as keyof typeof services];
                            const typeFactor = carTypes[carType as keyof typeof carTypes].factor;
                            const price = Math.round(service.basePrice * typeFactor * (urgency ? 1.3 : 1.0));
                            return (
                              <div key={id} className="flex justify-between text-sm">
                                <span>{service.name}</span>
                                <span className="font-semibold">{price}€</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="pt-4 border-t border-red-200 space-y-2">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Fahrzeugtyp:</span>
                            <span>{carTypes[carType as keyof typeof carTypes].label}</span>
                          </div>
                          {urgency && (
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Express-Service:</span>
                              <span>+30%</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Geschätzte Dauer:
                            </span>
                            <span>{Math.ceil(duration / 60)}h {duration % 60}min</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t-2 border-red-300">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Gesamt:</span>
                            <span className="text-3xl font-bold" style={{ color: theme.primary }}>
                              {total}€
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">
                            * Unverbindliche Schätzung inkl. MwSt.
                            <br />Endpreis nach Diagnose
                          </p>
                        </div>

                        <Button
                          className="w-full mt-4"
                          size="lg"
                          style={{ backgroundColor: theme.primary }}
                        >
                          Termin vereinbaren
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full"
                        >
                          Angebot per E-Mail
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-6 border-yellow-300 bg-yellow-50">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: theme.accent }} />
                      <div className="text-sm">
                        <div className="font-semibold mb-1">Kostenlose Diagnose</div>
                        <p className="text-gray-600">
                          Wir erstellen eine kostenlose Diagnose vor jeder Reparatur.
                          Sie erhalten ein verbindliches Angebot.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: Euro, title: "Faire Preise", desc: "Transparente Kalkulation ohne versteckte Kosten" },
              { icon: CheckCircle2, title: "Garantie", desc: "2 Jahre Garantie auf alle Arbeiten" },
              { icon: Clock, title: "Schnell", desc: "Terminvereinbarung innerhalb von 24h" }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20` }}>
                  <item.icon className="w-6 h-6" style={{ color: theme.primary }} />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
