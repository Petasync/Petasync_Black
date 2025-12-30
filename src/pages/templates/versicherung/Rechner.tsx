import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Shield, ChevronRight, Calculator, Users, Heart, Car, Home, Briefcase,
  Euro, CheckCircle2, AlertCircle, TrendingDown
} from "lucide-react";

const theme = {
  primary: "#0066CC",
  secondary: "#F0F8FF",
  accent: "#00CC66",
  background: "#FFFFFF",
  text: "#1A1A1A",
};

const insuranceTypes = {
  kranken: {
    name: "Krankenversicherung",
    icon: Heart,
    baseRate: 450,
    factors: {
      age: { "18-30": 1.0, "31-45": 1.2, "46-60": 1.5, "60+": 2.0 },
      family: { single: 1.0, couple: 1.8, family: 2.5 },
      coverage: { basic: 1.0, comfort: 1.3, premium: 1.6 }
    }
  },
  auto: {
    name: "Autoversicherung",
    icon: Car,
    baseRate: 85,
    factors: {
      age: { "18-25": 2.0, "26-45": 1.0, "46-65": 0.9, "65+": 1.2 },
      type: { klein: 1.0, mittel: 1.3, gross: 1.8, luxury: 2.5 },
      coverage: { haftpflicht: 1.0, teilkasko: 1.5, vollkasko: 2.0 }
    }
  },
  haus: {
    name: "Hausratversicherung",
    icon: Home,
    baseRate: 120,
    factors: {
      size: { "50m2": 1.0, "100m2": 1.5, "150m2": 2.0, "200m2+": 2.5 },
      location: { land: 1.0, stadt: 1.2, grossstadt: 1.4 },
      coverage: { basic: 1.0, erweitert: 1.3, premium: 1.6 }
    }
  },
  leben: {
    name: "Lebensversicherung",
    icon: Users,
    baseRate: 45,
    factors: {
      age: { "18-30": 1.0, "31-45": 1.3, "46-60": 1.8, "60+": 2.5 },
      sum: { "50k": 1.0, "100k": 2.0, "250k": 5.0, "500k": 10.0 },
      term: { "10y": 1.0, "20y": 1.8, "30y": 2.5 }
    }
  }
};

export default function VersicherungRechner() {
  const [selectedType, setSelectedType] = useState<keyof typeof insuranceTypes>("kranken");
  const [factors, setFactors] = useState<Record<string, string>>({});

  const currentInsurance = insuranceTypes[selectedType];

  const calculateMonthlyRate = () => {
    let rate = currentInsurance.baseRate;

    Object.entries(factors).forEach(([key, value]) => {
      const factorValue = currentInsurance.factors[key as keyof typeof currentInsurance.factors]?.[value];
      if (factorValue) {
        rate *= factorValue;
      }
    });

    return Math.round(rate);
  };

  const calculateYearlySavings = () => {
    const ourRate = calculateMonthlyRate();
    const marketAverage = ourRate * 1.25; // 25% higher market average
    return Math.round((marketAverage - ourRate) * 12);
  };

  const monthlyRate = calculateMonthlyRate();
  const yearlySavings = calculateYearlySavings();

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
              <Link to="/templates/versicherung/rechner" className="font-semibold" style={{ color: theme.accent }}>Rechner</Link>
              <Link to="/templates/versicherung/produkte" className="hover:text-blue-600 transition-colors">Produkte</Link>
              <Link to="/templates/versicherung/beratung" className="hover:text-blue-600 transition-colors">Beratung</Link>
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
          <span className="font-semibold">Versicherungsrechner</span>
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
              <Calculator className="w-4 h-4" style={{ color: theme.primary }} />
              <span className="text-sm font-semibold">Kostenlos & unverbindlich</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Versicherungs<span style={{ color: theme.primary }}>rechner</span>
            </h1>
            <p className="text-lg opacity-80">
              Berechnen Sie in wenigen Schritten Ihren persönlichen Versicherungsbeitrag.
              Transparent, fair und individuell.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Insurance Type Selection */}
            <div className="md:col-span-2 space-y-8">
              {/* Type Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" style={{ color: theme.primary }} />
                      Versicherungsart wählen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(insuranceTypes).map(([key, insurance]) => (
                        <Button
                          key={key}
                          variant={selectedType === key ? "default" : "outline"}
                          className={`h-auto py-4 ${selectedType === key ? "" : "border-blue-200"}`}
                          style={selectedType === key ? { backgroundColor: theme.primary } : {}}
                          onClick={() => {
                            setSelectedType(key as keyof typeof insuranceTypes);
                            setFactors({});
                          }}
                        >
                          <div className="text-center">
                            <insurance.icon className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-xs font-semibold">{insurance.name}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Factor Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" style={{ color: theme.primary }} />
                      Ihre Angaben
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Object.entries(currentInsurance.factors).map(([factorKey, factorOptions]) => (
                        <div key={factorKey}>
                          <label className="block font-semibold mb-3 capitalize">
                            {factorKey === "age" ? "Alter" :
                             factorKey === "family" ? "Familienstatus" :
                             factorKey === "coverage" ? "Deckungsumfang" :
                             factorKey === "type" ? "Fahrzeugtyp" :
                             factorKey === "size" ? "Wohnungsgröße" :
                             factorKey === "location" ? "Lage" :
                             factorKey === "sum" ? "Versicherungssumme" :
                             factorKey === "term" ? "Laufzeit" :
                             factorKey}
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {Object.keys(factorOptions).map((option) => (
                              <Button
                                key={option}
                                variant={factors[factorKey] === option ? "default" : "outline"}
                                className={factors[factorKey] === option ? "" : "border-blue-200"}
                                style={factors[factorKey] === option ? { backgroundColor: theme.primary } : {}}
                                onClick={() => setFactors({ ...factors, [factorKey]: option })}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right: Result Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5" style={{ color: theme.primary }} />
                      Ihr Beitrag
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.keys(factors).length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Bitte wählen Sie Ihre Angaben aus</p>
                      </div>
                    ) : Object.keys(factors).length < Object.keys(currentInsurance.factors).length ? (
                      <div className="text-center py-8 text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Bitte vervollständigen Sie alle Angaben</p>
                      </div>
                    ) : (
                      <>
                        <div className="text-center py-6">
                          <div className="text-sm text-gray-600 mb-2">Monatlicher Beitrag</div>
                          <div className="text-5xl font-bold mb-1" style={{ color: theme.primary }}>
                            {monthlyRate}€
                          </div>
                          <div className="text-xs text-gray-500">inkl. Versicherungssteuer</div>
                        </div>

                        <div className="pt-4 border-t border-blue-200">
                          <div className="flex items-center gap-2 mb-2" style={{ color: theme.accent }}>
                            <TrendingDown className="w-4 h-4" />
                            <span className="font-semibold text-sm">Sie sparen jährlich:</span>
                          </div>
                          <div className="text-2xl font-bold" style={{ color: theme.accent }}>
                            {yearlySavings}€
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            gegenüber dem Marktdurchschnitt
                          </p>
                        </div>

                        <div className="pt-4 border-t border-blue-200 space-y-2">
                          <div className="flex items-start gap-2 text-xs text-gray-600">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: theme.accent }} />
                            <span>Sofortiger Versicherungsschutz</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-gray-600">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: theme.accent }} />
                            <span>Monatlich kündbar</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-gray-600">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: theme.accent }} />
                            <span>24/7 Online-Service</span>
                          </div>
                        </div>

                        <Button
                          className="w-full mt-4"
                          size="lg"
                          style={{ backgroundColor: theme.primary }}
                        >
                          Jetzt abschließen
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full"
                        >
                          Beratung vereinbaren
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-6 border-green-300 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: theme.accent }} />
                      <div className="text-sm">
                        <div className="font-semibold mb-1">100% Transparenz</div>
                        <p className="text-gray-600">
                          Keine versteckten Kosten. Sie sehen genau, wofür Sie zahlen.
                          Jederzeit anpassbar.
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
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Warum SecureLife?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingDown, title: "Bis 25% günstiger", desc: "Durch digitale Prozesse sparen wir Kosten und geben diese an Sie weiter" },
              { icon: CheckCircle2, title: "Flexible Laufzeit", desc: "Keine lange Bindung - monatlich kündbar, jederzeit anpassbar" },
              { icon: Shield, title: "Top-Schutz", desc: "Ausgezeichnet von Stiftung Warentest und Finanztest" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
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
