import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dumbbell, Zap, Users, Target, Trophy, Calendar, PlayCircle, ArrowRight } from "lucide-react";

const theme = {
  primary: "#00FF00",
  secondary: "#000000",
  accent: "#FF00FF",
  background: "#0A0A0A",
  text: "#FFFFFF",
};

const classes = [
  { name: "CrossFit", time: "Mo/Mi/Fr 18:00", intensity: "High" },
  { name: "Yoga", time: "Di/Do 10:00", intensity: "Low" },
  { name: "HIIT", time: "Mo-Fr 19:00", intensity: "Extreme" },
  { name: "Cycling", time: "Di/Do 17:00", intensity: "Medium" },
];

const trainers = [
  { name: "Mike Johnson", specialty: "Strength Training", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop" },
  { name: "Sarah Connor", specialty: "Yoga & Flexibility", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop" },
  { name: "Alex Power", specialty: "HIIT & Cardio", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop" },
];

export default function FitnessTemplate() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/90 border-b" style={{ borderColor: `${theme.primary}50` }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8" style={{ color: theme.primary }} />
            <span className="text-2xl font-bold tracking-wider">POWERZONE</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm uppercase tracking-wide">
            <a href="#classes">Kurse</a>
            <a href="#trainers">Trainer</a>
            <a href="#pricing">Preise</a>
            <Button style={{ backgroundColor: theme.primary, color: theme.background }}>
              <Calendar className="mr-2 h-4 w-4" />
              Probetraining
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop)", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${theme.background}E6 0%, ${theme.secondary}99 100%)` }} />
        </div>

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: theme.primary, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <motion.h1
              className="text-6xl md:text-8xl font-black mb-6 leading-tight uppercase"
              style={{ fontFamily: "'Teko', sans-serif" }}
            >
              <span style={{ color: theme.primary }}>UNLEASH</span><br />YOUR POWER
            </motion.h1>
            <p className="text-xl mb-8">
              Das modernste Fitnessstudio der Stadt. Erreiche deine Ziele mit unseren Experten.
            </p>
            <div className="flex gap-4">
              <Button size="lg" style={{ backgroundColor: theme.primary, color: theme.background }}>
                <Zap className="mr-2" />
                Jetzt starten
              </Button>
              <Button size="lg" variant="outline" className="border-2" style={{ borderColor: theme.accent, color: theme.accent }}>
                <PlayCircle className="mr-2" />
                Virtual Tour
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="classes" className="py-20" style={{ background: `linear-gradient(180deg, ${theme.background} 0%, ${theme.secondary} 100%)` }}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 uppercase" style={{ color: theme.primary }}>Unsere Kurse</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((cls, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${theme.primary}80` }}
                className="p-6 rounded-lg border-2 backdrop-blur-sm cursor-pointer"
                style={{ borderColor: `${theme.primary}40`, background: `${theme.background}80` }}
              >
                <div className="text-4xl font-black mb-2" style={{ color: theme.primary }}>{cls.name}</div>
                <p className="text-sm mb-2 opacity-70">{cls.time}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${theme.accent}30`, color: theme.accent }}>
                  {cls.intensity}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="trainers" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-black text-center mb-16 uppercase" style={{ color: theme.primary }}>Elite Trainer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {trainers.map((trainer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <img src={trainer.image} alt={trainer.name} className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-black">{trainer.name}</h3>
                  <p style={{ color: theme.primary }}>{trainer.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20" style={{ background: `linear-gradient(180deg, ${theme.background} 0%, ${theme.primary}20 100%)` }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-5xl font-black text-center mb-16 uppercase" style={{ color: theme.primary }}>Membership</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "BASIC", price: "29€", features: ["Geräte-Training", "Umkleide & Dusche", "Mo-Fr 6-22 Uhr"] },
              { name: "PRO", price: "49€", features: ["Alle Basic Features", "Alle Kurse", "24/7 Zugang", "Sauna"], highlight: true },
              { name: "ELITE", price: "79€", features: ["Alle Pro Features", "Personal Training", "Ernährungsberatung", "VIP Lounge"] },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className={`p-8 rounded-lg border-2 ${plan.highlight ? 'shadow-2xl' : ''}`}
                style={{
                  borderColor: plan.highlight ? theme.primary : `${theme.primary}40`,
                  backgroundColor: plan.highlight ? `${theme.primary}10` : theme.background,
                }}
              >
                <h3 className="text-3xl font-black mb-2" style={{ color: theme.primary }}>{plan.name}</h3>
                <div className="text-5xl font-black mb-6">
                  {plan.price}<span className="text-2xl opacity-70">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <Zap className="w-4 h-4" style={{ color: theme.primary }} />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" style={{ backgroundColor: plan.highlight ? theme.primary : 'transparent', color: plan.highlight ? theme.background : theme.primary, border: `2px solid ${theme.primary}` }}>
                  Mitglied werden
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t" style={{ borderColor: `${theme.primary}30` }}>
        <div className="container mx-auto px-4 text-center">
          <Dumbbell className="w-8 h-8 mx-auto mb-4" style={{ color: theme.primary }} />
          <p className="text-2xl font-black uppercase mb-6">POWERZONE</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#">Impressum</a>
            <a href="#">Datenschutz</a>
            <a href="#">AGB</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
