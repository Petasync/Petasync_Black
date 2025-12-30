import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wrench, CheckCircle2, Phone, Mail, Calendar, Shield,
  Clock, Award, ChevronRight, Home, Droplets, Thermometer, Package
} from "lucide-react";

const theme = {
  primary: "#FF6B35",
  secondary: "#2D3142",
  accent: "#F4B860",
  background: "#F8F9FA",
  text: "#1A1A1A",
};

export default function SanitaerHeizung() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/templates/handwerker" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
              <Wrench className="inline" />
              ProBau Handwerk
            </Link>
            <div className="flex gap-4 items-center">
              <Link to="/"><Button variant="outline" size="sm"><Home className="w-4 h-4 mr-2" />Zur Hauptseite</Button></Link>
              <Button style={{ backgroundColor: theme.primary }}>Jetzt anfragen</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-900">Hauptseite</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/templates/handwerker" className="hover:text-gray-900">Handwerker</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Sanitär & Heizung</span>
        </div>
      </div>

      <section className="py-16 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-block px-4 py-2 rounded-full mb-6 text-sm font-semibold" style={{ backgroundColor: `${theme.accent}40`, color: theme.accent }}>
                <Wrench className="w-4 h-4 inline mr-2" />
                Sanitär & Heizungstechnik
              </div>
              <h1 className="text-5xl font-bold mb-6 text-white">Sanitär & Heizung vom Fachbetrieb</h1>
              <p className="text-xl mb-8 text-gray-300">
                Von Rohrinstallation über Badsanierung bis zur modernen Heizungsanlage -
                Ihr Experte für Wasser, Wärme und Wohlbefinden.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="rounded-full" style={{ backgroundColor: theme.primary }}>
                  <Calendar className="mr-2" />Termin vereinbaren
                </Button>
                <Button size="lg" variant="outline" className="rounded-full bg-white">
                  <Phone className="mr-2" />0800 123 4567
                </Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
              <img src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop" alt="Sanitär & Heizung" className="rounded-2xl shadow-2xl w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Unsere Leistungen</h2>
            <p className="text-lg text-gray-600">Komplettlösungen für Sanitär und Heizung</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Droplets, title: "Wasserinstallation", desc: "Leitungsverlegung, Reparaturen, Wasseranschlüsse" },
              { icon: Thermometer, title: "Heizungsinstallation", desc: "Gas, Öl, Wärmepumpe, Fußbodenheizung" },
              { icon: Package, title: "Rohrsanierung", desc: "Rohrbruch, Verstopfung, Kanalreinigung" },
              { icon: Droplets, title: "Badsanierung", desc: "Komplette Badezimmer-Renovierung" },
              { icon: Thermometer, title: "Heizungswartung", desc: "Regelmäßige Wartung für lange Lebensdauer" },
              { icon: Shield, title: "Notdienst", desc: "24/7 bei Wasserrohrbruch und Heizungsausfall" }
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

      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Unsere Preise</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>79€</div>
                <div className="text-sm text-gray-600 mb-4">pro Stunde</div>
                <div className="space-y-2 text-sm">
                  {["Arbeitszeit", "Anfahrt inklusive*", "Material nach Aufwand"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="ring-2 ring-orange-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold text-white" style={{ backgroundColor: theme.primary }}>
                Beliebt
              </div>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>8.500€</div>
                <div className="text-sm text-gray-600 mb-4">Badsanierung</div>
                <div className="space-y-2 text-sm">
                  {["Komplette Sanierung", "Ca. 6-8m²", "Inkl. Material"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>180€</div>
                <div className="text-sm text-gray-600 mb-4">Heizungswartung</div>
                <div className="space-y-2 text-sm">
                  {["Jährliche Wartung", "Inkl. Reinigung", "Mit Protokoll"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" style={{ color: theme.accent }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: theme.primary }}>
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Notdienst 24/7</h2>
          <p className="text-xl mb-8 opacity-90">Rohrbruch? Heizung ausgefallen? Wir sind für Sie da!</p>
          <Button size="lg" className="rounded-full bg-white text-gray-900 hover:bg-gray-100">
            <Phone className="mr-2" />0800 123 4567 - Jetzt anrufen
          </Button>
        </div>
      </section>
    </div>
  );
}
