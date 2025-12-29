import { useState, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dumbbell, Zap, Users, Target, Trophy, Calendar, PlayCircle, ArrowRight, Phone, Mail, MapPin,
  Award, CheckCircle, Star, Menu, X, Clock, Heart, TrendingUp, MessageCircle, Download,
  Activity, Flame, Instagram, Facebook, Youtube, ChevronRight, Sparkles, Crown, Gift
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dumbbell as DumbbellModel, EnergyParticles } from "@/components/3d/FitnessModels";

const theme = {
  primary: "#00FF00",
  secondary: "#000000",
  accent: "#FF00FF",
  background: "#0A0A0A",
  text: "#FFFFFF",
};

const classes = [
  { name: "CrossFit", time: "Mo/Mi/Fr 18:00-19:00", intensity: "High", trainer: "Mike Johnson", spots: 12, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop", calories: "850 kcal" },
  { name: "HIIT", time: "Mo-Fr 06:00-07:00", intensity: "Extreme", trainer: "Alex Power", spots: 15, image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=600&h=400&fit=crop", calories: "950 kcal" },
  { name: "Yoga Flow", time: "Di/Do 10:00-11:00", intensity: "Low", trainer: "Sarah Connor", spots: 20, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop", calories: "250 kcal" },
  { name: "Spinning", time: "Mo/Mi/Fr 19:00-20:00", intensity: "Medium", trainer: "Lisa Strong", spots: 25, image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop", calories: "700 kcal" },
  { name: "Boxing", time: "Di/Do 18:00-19:00", intensity: "High", trainer: "Rocky Steel", spots: 10, image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop", calories: "800 kcal" },
  { name: "Pilates", time: "Mi/Fr 11:00-12:00", intensity: "Low", trainer: "Emma Grace", spots: 15, image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop", calories: "300 kcal" },
];

const trainers = [
  { name: "Mike Johnson", specialty: "CrossFit & Strength", experience: "12 Jahre", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop", certs: ["CrossFit L3", "Nutrition"] },
  { name: "Alex Power", specialty: "HIIT & Conditioning", experience: "10 Jahre", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop", certs: ["NASM CPT", "TRX"] },
  { name: "Sarah Connor", specialty: "Yoga & Mindfulness", experience: "15 Jahre", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop", certs: ["RYT 500", "Meditation"] },
  { name: "Lisa Strong", specialty: "Cycling & Cardio", experience: "8 Jahre", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop", certs: ["Spinning", "Endurance"] },
  { name: "Rocky Steel", specialty: "Boxing & Combat", experience: "14 Jahre", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop", certs: ["Boxing Pro", "Kickboxing"] },
  { name: "Emma Grace", specialty: "Pilates & Recovery", experience: "9 Jahre", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop", certs: ["Pilates Master", "Physiotherapy"] },
];

const testimonials = [
  { name: "Marcus Weber", text: "In 6 Monaten 15kg abgenommen! Die Trainer sind unglaublich motivierend und das Equipment ist top. PowerZone hat mein Leben verändert!", rating: 5, before: "95kg", after: "80kg", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop" },
  { name: "Julia Schmidt", text: "Beste Entscheidung! Die Community ist super und die HIIT-Kurse sind genau mein Ding. Nie wieder normales Fitnessstudio!", rating: 5, before: "Anfänger", after: "6 Monate", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop" },
  { name: "Tom Hoffmann", text: "Professionelles Coaching und moderne Ausstattung. Die Personal Training Sessions haben mir geholfen, meine Ziele zu erreichen.", rating: 5, before: "65kg", after: "75kg", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop" },
  { name: "Sarah Klein", text: "PowerZone ist mehr als ein Gym - es ist eine Familie! Die Yoga-Kurse helfen mir perfekt beim Stressabbau.", rating: 5, before: "Gestresst", after: "Entspannt", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop" },
];

const plans = [
  { name: "Starter", price: "29€", period: "pro Monat", features: ["Zugang zu allen Geräten", "Umkleiden & Duschen", "WLAN", "Getränke-Flatrate"], popular: false, commitment: "12 Monate" },
  { name: "Pro", price: "49€", period: "pro Monat", features: ["Alles aus Starter", "Alle Gruppenkurse", "Sauna & Wellness", "Ernährungsplan", "Fitness-App"], popular: true, commitment: "12 Monate" },
  { name: "Elite", price: "89€", period: "pro Monat", features: ["Alles aus Pro", "4x Personal Training/Monat", "Supplements 20% Rabatt", "Prioritäts-Buchung", "Gast-Pässe (3/Monat)", "Premium Locker"], popular: false, commitment: "12 Monate" },
];

export default function FitnessTemplateExtended() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b" style={{ backgroundColor: `${theme.background}f0`, borderColor: `${theme.primary}50` }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-8 h-8" style={{ color: theme.primary }} />
            <div>
              <div className="text-2xl font-bold tracking-wider">POWERZONE</div>
              <div className="text-xs tracking-widest" style={{ color: theme.accent }}>FITNESS STUDIO</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-wide">
            <a href="#kurse" className="hover:text-primary transition" style={{ color: theme.text }}>Kurse</a>
            <a href="#trainer" className="hover:text-primary transition" style={{ color: theme.text }}>Trainer</a>
            <a href="#preise" className="hover:text-primary transition" style={{ color: theme.text }}>Preise</a>
            <a href="#erfolge" className="hover:text-primary transition" style={{ color: theme.text }}>Erfolge</a>
            <a href="#kontakt" className="hover:text-primary transition" style={{ color: theme.text }}>Kontakt</a>
            <Button className="rounded-full font-bold" style={{ backgroundColor: theme.primary, color: theme.background }}>
              <Calendar className="mr-2 h-4 w-4" />
              GRATIS PROBETRAINING
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: theme.primary }}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="lg:hidden pb-4 space-y-3 px-4">
            {["Kurse", "Trainer", "Preise", "Erfolge", "Kontakt"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm font-medium uppercase" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <Button className="w-full rounded-full font-bold" style={{ backgroundColor: theme.primary, color: theme.background }}>
              GRATIS PROBETRAINING
            </Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <motion.div style={{ opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop')" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${theme.background}f0 0%, ${theme.secondary}cc 100%)` }} />
        </motion.div>

        {/* 3D Scene */}
        <div className="absolute inset-0 opacity-20">
          <Suspense fallback={null}>
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <DumbbellModel />
              <EnergyParticles />
            </Canvas>
          </Suspense>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8" style={{ color: theme.primary }} />
              <span className="text-xl font-bold tracking-wider" style={{ color: theme.accent }}>
                #1 FITNESS STUDIO IN DER STADT
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter" style={{ textShadow: `0 0 20px ${theme.primary}80` }}>
              UNLEASH YOUR<br />
              <span style={{ color: theme.primary }}>POWER</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl">
              Erreiche deine Fitness-Ziele mit modernster Ausstattung,<br />
              Top-Trainern und einer motivierenden Community
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full font-bold text-lg px-8 uppercase" style={{ backgroundColor: theme.primary, color: theme.background }}>
                <Zap className="mr-2 h-5 w-5" />
                Jetzt Starten
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-bold text-lg px-8 uppercase border-2" style={{ borderColor: theme.accent, color: theme.accent }}>
                <PlayCircle className="mr-2 h-5 w-5" />
                Virtual Tour
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">
              {[
                { number: "2000+", label: "Aktive Mitglieder" },
                { number: "50+", label: "Kurse/Woche" },
                { number: "4.9", label: "⭐ Rating" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-black" style={{ color: theme.primary }}>{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12" style={{ backgroundColor: theme.primary, color: theme.background }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Trophy, label: "5 Jahre in Folge Beste Fitness-Studio", value: "Award Winner" },
              { icon: Users, label: "Über 2000 zufriedene Mitglieder", value: "Community" },
              { icon: Dumbbell, label: "500m² Trainingsfläche", value: "Premium Space" },
              { icon: Clock, label: "Mo-So 05:00-24:00 Uhr geöffnet", value: "Flexible Hours" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <item.icon className="w-10 h-10 mx-auto mb-3" />
                <div className="font-bold mb-1">{item.value}</div>
                <div className="text-sm opacity-90">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="kurse" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              UNSER KURSPLAN
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-4">CLASSES THAT<br /><span style={{ color: theme.primary }}>TRANSFORM</span></h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Über 50 Kurse pro Woche von CrossFit bis Yoga
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <img src={cls.image} alt={cls.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  {/* Intensity Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold" style={{
                    backgroundColor: cls.intensity === "Extreme" ? theme.accent : cls.intensity === "High" ? theme.primary : theme.background,
                    color: cls.intensity === "Low" ? theme.primary : theme.background
                  }}>
                    {cls.intensity.toUpperCase()}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-black mb-2">{cls.name}</h3>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {cls.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4" style={{ color: theme.primary }} />
                        {cls.calories}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-80">Trainer: {cls.trainer}</span>
                      <span className="text-xs" style={{ color: theme.primary }}>
                        {cls.spots} Plätze verfügbar
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full font-bold uppercase" style={{ backgroundColor: theme.accent, color: theme.background }}>
              <Download className="mr-2 h-5 w-5" />
              Kompletter Kursplan (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainer" className="py-20" style={{ backgroundColor: `${theme.primary}10` }}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              ELITE COACHES
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-4">MEET YOUR<br /><span style={{ color: theme.primary }}>TRAINERS</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-black mb-1">{trainer.name}</h3>
                    <p className="text-sm mb-2" style={{ color: theme.accent }}>{trainer.specialty}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {trainer.certs.map((cert, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${theme.primary}30`, color: theme.primary }}>
                          {cert}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs opacity-80">{trainer.experience} Erfahrung</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="preise" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              MITGLIEDSCHAFT
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-4">CHOOSE YOUR<br /><span style={{ color: theme.primary }}>PLAN</span></h2>
            <p className="text-lg opacity-80">Keine Aufnahmegebühr • Monatlich kündbar ab dem 13. Monat</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative rounded-2xl p-8 border-2",
                  plan.popular ? "scale-105" : ""
                )}
                style={{
                  backgroundColor: plan.popular ? `${theme.primary}20` : `${theme.background}80`,
                  borderColor: plan.popular ? theme.primary : `${theme.primary}30`
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: theme.accent, color: theme.background }}>
                    BELIEBTESTE
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black mb-4 uppercase">{plan.name}</h3>
                  <div className="flex items-end justify-center gap-2 mb-2">
                    <span className="text-6xl font-black" style={{ color: theme.primary }}>{plan.price}</span>
                  </div>
                  <div className="text-sm opacity-60">{plan.period}</div>
                  <div className="text-xs mt-2 opacity-60">Mindestlaufzeit: {plan.commitment}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: theme.primary }} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full rounded-full font-bold uppercase" style={{ backgroundColor: plan.popular ? theme.primary : theme.accent, color: theme.background }}>
                  Jetzt Anmelden
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm opacity-60 mb-4">Alle Preise inkl. MwSt. • Studenten & Azubis: 15% Rabatt</p>
            <Button size="lg" variant="outline" className="rounded-full font-bold uppercase border-2" style={{ borderColor: theme.primary, color: theme.primary }}>
              Gratis Probetraining vereinbaren
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="erfolge" className="py-20" style={{ backgroundColor: `${theme.primary}10` }}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              ERFOLGSGESCHICHTEN
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-4">REAL RESULTS<br /><span style={{ color: theme.primary }}>REAL PEOPLE</span></h2>
            <div className="flex items-center justify-center gap-2 text-2xl mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-current" style={{ color: theme.primary }} />
              ))}
              <span className="ml-4">4.9 / 5.0</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl p-8 border-2"
                style={{ backgroundColor: `${theme.background}cc`, borderColor: `${theme.primary}30` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: theme.primary }} />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <div className="text-sm opacity-60 flex items-center gap-4 mt-1">
                      <span style={{ color: theme.accent }}>Vorher: {testimonial.before}</span>
                      <ArrowRight className="w-4 h-4" />
                      <span style={{ color: theme.primary }}>Nachher: {testimonial.after}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.accent }}>
              STARTE JETZT
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-4">GRATIS<br /><span style={{ color: theme.primary }}>PROBETRAINING</span></h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl p-8 border-2" style={{ backgroundColor: `${theme.background}cc`, borderColor: `${theme.primary}30` }}>
              <h3 className="text-2xl font-black mb-6 uppercase">Jetzt anmelden</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input placeholder="Vorname *" className="bg-black border-gray-800" required />
                  </div>
                  <div>
                    <Input placeholder="Nachname *" className="bg-black border-gray-800" required />
                  </div>
                </div>
                <Input type="email" placeholder="E-Mail *" className="bg-black border-gray-800" required />
                <Input type="tel" placeholder="Telefon *" className="bg-black border-gray-800" required />
                <select className="w-full px-4 py-3 border rounded-lg bg-black border-gray-800">
                  <option>Wunsch-Kurs auswählen...</option>
                  {classes.map((cls, i) => (
                    <option key={i}>{cls.name}</option>
                  ))}
                </select>
                <Textarea placeholder="Deine Ziele & Fragen..." className="bg-black border-gray-800" rows={4} />
                <Button type="submit" size="lg" className="w-full rounded-full font-bold uppercase" style={{ backgroundColor: theme.primary, color: theme.background }}>
                  <Zap className="mr-2 h-5 w-5" />
                  Gratis Probetraining sichern
                </Button>
                <p className="text-xs opacity-60 text-center">* Keine Verpflichtung • Kostenlos & unverbindlich</p>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div className="rounded-2xl p-8 border-2" style={{ backgroundColor: `${theme.background}cc`, borderColor: `${theme.primary}30` }}>
                <h3 className="text-2xl font-black mb-6 uppercase">Kontakt</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary, color: theme.background }}>
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Telefon</div>
                      <a href="tel:+491234567890" className="text-lg hover:opacity-80" style={{ color: theme.primary }}>
                        +49 123 456 7890
                      </a>
                      <p className="text-sm opacity-60">Mo-So: 05:00 - 24:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary, color: theme.background }}>
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">E-Mail</div>
                      <a href="mailto:info@powerzone.de" className="hover:opacity-80" style={{ color: theme.primary }}>
                        info@powerzone.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.primary, color: theme.background }}>
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Standort</div>
                      <p className="opacity-80">
                        Fitnesstraße 1<br />
                        12345 Berlin<br />
                        Deutschland
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-8 border-2" style={{ backgroundColor: `${theme.background}cc`, borderColor: `${theme.primary}30` }}>
                <h3 className="text-xl font-black mb-4 uppercase">Öffnungszeiten</h3>
                <div className="space-y-3">
                  {[
                    { day: "Montag - Freitag", hours: "05:00 - 24:00" },
                    { day: "Samstag - Sonntag", hours: "06:00 - 23:00" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                      <span className="font-semibold">{schedule.day}</span>
                      <span className="opacity-60">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-8" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`, color: theme.background }}>
                <Gift className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-black mb-2 uppercase">Gutscheine</h3>
                <p className="mb-4 opacity-90">
                  Verschenke Fitness! Ab 30€ verfügbar.
                </p>
                <Button size="lg" className="w-full rounded-full font-bold uppercase" style={{ backgroundColor: theme.background, color: theme.primary }}>
                  Gutschein kaufen
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ borderColor: `${theme.primary}30` }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Dumbbell className="w-8 h-8" style={{ color: theme.primary }} />
                <div>
                  <div className="text-xl font-bold">POWERZONE</div>
                  <div className="text-xs" style={{ color: theme.accent }}>FITNESS STUDIO</div>
                </div>
              </div>
              <p className="text-sm opacity-60 mb-4">
                Dein Premium-Fitness-Studio im Herzen von Berlin seit 2018.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Facebook, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map((social, index) => (
                  <a key={index} href={social.href} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: theme.primary, color: theme.background }}>
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 uppercase">Studio</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {["Kurse", "Personal Training", "Trainer", "Preise", "Ausstattung", "Virtual Tour"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:opacity-100 transition flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: theme.primary }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 uppercase">Service</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {["Über uns", "Erfolgsgeschichten", "App", "Shop", "Blog", "Jobs"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:opacity-100 transition flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: theme.primary }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 uppercase">Newsletter</h4>
              <p className="text-sm opacity-80 mb-4">
                Fitness-Tipps & exklusive Angebote!
              </p>
              <div className="flex gap-2">
                <Input type="email" placeholder="Deine E-Mail" className="bg-white/5 border-gray-800" />
                <Button style={{ backgroundColor: theme.primary, color: theme.background }}>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t pt-8" style={{ borderColor: `${theme.primary}30` }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
              <p>© 2024 PowerZone. Alle Rechte vorbehalten.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:opacity-100 transition">Impressum</a>
                <a href="#" className="hover:opacity-100 transition">Datenschutz</a>
                <a href="#" className="hover:opacity-100 transition">AGB</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
