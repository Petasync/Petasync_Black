import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap, CheckCircle2, ArrowRight, Phone, Mail, Calendar, Shield,
  Clock, Award, ChevronRight, Home, Lightbulb, Plug, Cable
} from "lucide-react";

const theme = {
  primary: "#FF6B35",
  secondary: "#2D3142",
  accent: "#F4B860",
  background: "#F8F9FA",
  text: "#1A1A1A",
};

export default function ElektroInstallationen() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/templates/handwerker" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
              <Zap className="inline" />
              ProBau Handwerk
            </Link>
            <div className="flex gap-4 items-center">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Zur Hauptseite
                </Button>
              </Link>
              <Button style={{ backgroundColor: theme.primary }}>
                Jetzt anfragen
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-900">Hauptseite</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/templates/handwerker" className="hover:text-gray-900">Handwerker</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Elektro-Installationen</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-block px-4 py-2 rounded-full mb-6 text-sm font-semibold" style={{ backgroundColor: `${theme.accent}40`, color: theme.accent }}>
                <Zap className="w-4 h-4 inline mr-2" />
                Elektrotechnik
              </div>
              <h1 className="text-5xl font-bold mb-6 text-white">
                Elektro-Installationen vom Meisterbetrieb
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Professionelle Elektroarbeiten für Neu- und Altbau. Von der einfachen
                Steckdose bis zur kompletten Smarthome-Lösung.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.primary }}>
                  <Calendar className="mr-2" />
                  Termin vereinbaren
                </Button>
                <Button size="lg" variant="outline" className="rounded-full bg-white">
                  <Phone className="mr-2" />
                  0800 123 4567
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <img
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop"
                alt="Elektro-Installationen"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Unsere Leistungen</h2>
            <p className="text-lg text-gray-600">Komplettservice rund um Elektroinstallationen</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Plug, title: "Steckdosen & Lichtschalter", desc: "Neuinstallation und Austausch nach modernsten Standards" },
              { icon: Lightbulb, title: "Beleuchtungskonzepte", desc: "LED-Beleuchtung, Dimmersysteme und Lichtsteuerung" },
              { icon: Cable, title: "Elektroverteilungen", desc: "Installation und Modernisierung von Sicherungskästen" },
              { icon: Zap, title: "Smarthome-Systeme", desc: "KNX, Homematic und andere intelligente Lösungen" },
              { icon: Shield, title: "E-Check & Prüfungen", desc: "Gesetzlich vorgeschriebene Elektroprüfungen" },
              { icon: Award, title: "Photovoltaik-Anlagen", desc: "Installation von Solaranlagen und Wallboxen" }
            ].map((service, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20` }}>
                    <service.icon className="w-7 h-7" style={{ color: theme.primary }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preise */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Transparente Preise</h2>
            <p className="text-lg text-gray-600">Faire Stundensätze ohne versteckte Kosten</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>89€</div>
                <div className="text-sm text-gray-600 mb-4">pro Stunde</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                    <span>Arbeitszeit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                    <span>Anfahrt inklusive*</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                    <span>Material nach Aufwand</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="ring-2 ring-orange-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold text-white" style={{ backgroundColor: theme.primary }}>
                Beliebt
              </div>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>750€</div>
                <div className="text-sm text-gray-600 mb-4">Pauschal</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                    <span>E-Check Wohnung</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                    <span>Bis 100m²</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                    <span>Mit Prüfprotokoll</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>120€</div>
                <div className="text-sm text-gray-600 mb-4">Notdienst Aufschlag</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                    <span>24/7 erreichbar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                    <span>Innerhalb 30-60 Min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                    <span>Plus Arbeitszeit</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-gray-600 text-center mt-6">
            * Anfahrt im Umkreis von 30km inklusive. Alle Preise zzgl. MwSt.
          </p>
        </div>
      </section>

      {/* Vorteile */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Warum ProBau Handwerk?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Meisterbetrieb", desc: "25 Jahre Erfahrung" },
              { icon: Shield, title: "2 Jahre Garantie", desc: "Auf alle Arbeiten" },
              { icon: Clock, title: "Notdienst 24/7", desc: "Schnelle Hilfe" },
              { icon: CheckCircle2, title: "Festpreisgarantie", desc: "Keine Überraschungen" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20` }}>
                  <item.icon className="w-8 h-8" style={{ color: theme.primary }} />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.primary }}>
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Bereit für Ihr Projekt?</h2>
          <p className="text-xl mb-8 opacity-90">
            Kostenloser Kostenvoranschlag innerhalb von 24 Stunden
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="rounded-full bg-white text-gray-900 hover:bg-gray-100">
              <Phone className="mr-2" />
              0800 123 4567
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10">
              <Mail className="mr-2" />
              E-Mail senden
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
