import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dumbbell, ChevronRight, Clock, Users, Flame, Zap, Calendar, Target
} from "lucide-react";

const theme = {
  primary: "#00FF00",
  secondary: "#000000",
  accent: "#FF00FF",
  background: "#0A0A0A",
  text: "#FFFFFF",
};

const schedule = {
  montag: [
    { time: "06:00", name: "Morgen Yoga", trainer: "Lisa", level: "Anfänger", duration: 60, spots: 12 },
    { time: "09:00", name: "HIIT Bootcamp", trainer: "Mike", level: "Fortgeschritten", duration: 45, spots: 8 },
    { time: "12:00", name: "Lunch Power", trainer: "Sarah", level: "Alle", duration: 30, spots: 15 },
    { time: "17:00", name: "CrossFit", trainer: "Tom", level: "Fortgeschritten", duration: 60, spots: 10 },
    { time: "19:00", name: "Spinning", trainer: "Anna", level: "Alle", duration: 45, spots: 20 },
  ],
  dienstag: [
    { time: "06:00", name: "Functional Training", trainer: "Mike", level: "Mittel", duration: 60, spots: 12 },
    { time: "10:00", name: "Pilates", trainer: "Lisa", level: "Anfänger", duration: 60, spots: 15 },
    { time: "17:00", name: "Boxing", trainer: "Tom", level: "Alle", duration: 45, spots: 12 },
    { time: "18:00", name: "Zumba", trainer: "Maria", level: "Anfänger", duration: 60, spots: 20 },
    { time: "20:00", name: "Power Lifting", trainer: "Mike", level: "Fortgeschritten", duration: 90, spots: 8 },
  ],
  mittwoch: [
    { time: "06:00", name: "Morgen Yoga", trainer: "Lisa", level: "Anfänger", duration: 60, spots: 12 },
    { time: "09:00", name: "TRX Training", trainer: "Sarah", level: "Mittel", duration: 45, spots: 10 },
    { time: "12:00", name: "Express Cardio", trainer: "Anna", level: "Alle", duration: 30, spots: 15 },
    { time: "17:00", name: "Kettlebell", trainer: "Tom", level: "Mittel", duration: 60, spots: 12 },
    { time: "19:00", name: "Spinning", trainer: "Anna", level: "Alle", duration: 45, spots: 20 },
  ],
  donnerstag: [
    { time: "06:00", name: "HIIT Bootcamp", trainer: "Mike", level: "Fortgeschritten", duration: 45, spots: 8 },
    { time: "10:00", name: "Pilates", trainer: "Lisa", level: "Anfänger", duration: 60, spots: 15 },
    { time: "17:00", name: "CrossFit", trainer: "Tom", level: "Fortgeschritten", duration: 60, spots: 10 },
    { time: "18:00", name: "Dance Cardio", trainer: "Maria", level: "Anfänger", duration: 45, spots: 18 },
    { time: "19:30", name: "Yoga Flow", trainer: "Lisa", level: "Alle", duration: 60, spots: 15 },
  ],
  freitag: [
    { time: "06:00", name: "Functional Training", trainer: "Mike", level: "Mittel", duration: 60, spots: 12 },
    { time: "09:00", name: "Stretch & Mobility", trainer: "Sarah", level: "Alle", duration: 45, spots: 12 },
    { time: "12:00", name: "Lunch Power", trainer: "Sarah", level: "Alle", duration: 30, spots: 15 },
    { time: "17:00", name: "Boxing", trainer: "Tom", level: "Alle", duration: 45, spots: 12 },
    { time: "19:00", name: "Friday Burner", trainer: "Mike", level: "Fortgeschritten", duration: 60, spots: 15 },
  ],
};

const getLevelColor = (level: string) => {
  if (level === "Anfänger") return "#00FF00";
  if (level === "Mittel") return "#FFFF00";
  if (level === "Fortgeschritten") return "#FF00FF";
  return "#FFFFFF";
};

export default function FitnessKursplan() {
  const [selectedDay, setSelectedDay] = useState("montag");

  const days = [
    { id: "montag", label: "Montag" },
    { id: "dienstag", label: "Dienstag" },
    { id: "mittwoch", label: "Mittwoch" },
    { id: "donnerstag", label: "Donnerstag" },
    { id: "freitag", label: "Freitag" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-lg z-50 border-b" style={{ backgroundColor: `${theme.background}f5`, borderColor: `${theme.primary}30` }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/templates/fitness" className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.primary }}>
              <Dumbbell className="inline" />
              NEON FITNESS
            </Link>

            <div className="hidden md:flex gap-6 items-center text-sm">
              <Link to="/templates/fitness/kursplan" className="font-semibold" style={{ color: theme.accent }}>Kursplan</Link>
              <Link to="/templates/fitness/mitgliedschaft" className="hover:opacity-80 transition">Mitgliedschaft</Link>
              <Link to="/templates/fitness/transformationen" className="hover:opacity-80 transition">Erfolge</Link>
              <Link to="/templates/fitness" className="hover:opacity-80 transition">Home</Link>
              <Button style={{ backgroundColor: theme.primary, color: theme.secondary }}>
                Probetraining
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex items-center gap-2 text-sm opacity-60">
          <Link to="/templates/fitness" className="hover:opacity-100 transition">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">Kursplan</span>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4" style={{ background: `linear-gradient(135deg, ${theme.primary}20 0%, ${theme.accent}20 100%)` }}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border" style={{ borderColor: theme.primary }}>
              <Calendar className="w-4 h-4" style={{ color: theme.primary }} />
              <span className="text-sm font-semibold">50+ Kurse pro Woche</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Dein <span style={{ color: theme.primary }}>Kursplan</span>
            </h1>
            <p className="text-lg opacity-80">
              Von Yoga bis HIIT - finde den perfekten Kurs für dein Workout
            </p>
          </motion.div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-12 bg-transparent border" style={{ borderColor: `${theme.primary}30` }}>
              {days.map(day => (
                <TabsTrigger
                  key={day.id}
                  value={day.id}
                  className="data-[state=active]:text-black"
                  style={{ color: theme.text }}
                >
                  {day.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(schedule).map(([day, classes]) => (
              <TabsContent key={day} value={day}>
                <div className="space-y-4">
                  {classes.map((cls, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden group hover:shadow-2xl transition-all border" style={{ backgroundColor: `${theme.secondary}`, borderColor: `${theme.primary}30` }}>
                        <div className="grid md:grid-cols-12 items-center">
                          {/* Time */}
                          <div className="md:col-span-2 p-6 text-center border-r" style={{ borderColor: `${theme.primary}30` }}>
                            <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: theme.primary }} />
                            <div className="text-2xl font-bold" style={{ color: theme.primary }}>{cls.time}</div>
                            <div className="text-xs opacity-60">{cls.duration} Min</div>
                          </div>

                          {/* Course Info */}
                          <div className="md:col-span-6 p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${theme.primary}20` }}>
                                <Flame className="w-6 h-6" style={{ color: theme.primary }} />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold mb-1">{cls.name}</h3>
                                <div className="flex flex-wrap gap-3 text-sm opacity-80">
                                  <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    Trainer: {cls.trainer}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Target className="w-4 h-4" />
                                    {cls.spots} Plätze
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Level & Action */}
                          <div className="md:col-span-4 p-6 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="px-3 py-1 rounded-full text-xs font-bold"
                                style={{
                                  backgroundColor: `${getLevelColor(cls.level)}20`,
                                  color: getLevelColor(cls.level)
                                }}
                              >
                                {cls.level}
                              </div>
                            </div>
                            <Button
                              style={{ backgroundColor: theme.primary, color: theme.secondary }}
                              className="font-bold"
                            >
                              Buchen
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Legend */}
      <section className="py-8 px-4 border-t" style={{ borderColor: `${theme.primary}30` }}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `${getLevelColor("Anfänger")}` }} />
              <span className="opacity-80">Anfänger</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `${getLevelColor("Mittel")}` }} />
              <span className="opacity-80">Mittel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `${getLevelColor("Fortgeschritten")}` }} />
              <span className="opacity-80">Fortgeschritten</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `${getLevelColor("Alle")}` }} />
              <span className="opacity-80">Alle Level</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ background: `linear-gradient(135deg, ${theme.primary}10 0%, ${theme.accent}10 100%)` }}>
        <div className="container mx-auto text-center">
          <Zap className="w-16 h-16 mx-auto mb-4" style={{ color: theme.accent }} />
          <h2 className="text-3xl font-bold mb-4">Bereit loszulegen?</h2>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Sichere dir jetzt dein kostenloses Probetraining und teste alle Kurse!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/templates/fitness/mitgliedschaft">
              <Button size="lg" className="rounded-full font-bold" style={{ backgroundColor: theme.primary, color: theme.secondary }}>
                Mitglied werden
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full font-bold" style={{ borderColor: theme.primary, color: theme.primary }}>
              Probetraining buchen
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
