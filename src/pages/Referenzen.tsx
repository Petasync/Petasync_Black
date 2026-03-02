import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Star, Building2, User, Globe, Shield, Wrench, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";

const caseStudies = [
  {
    icon: Building2,
    category: "Managed Services",
    title: "Anwaltskanzlei in Nürnberg",
    challenge: "Veraltete IT-Infrastruktur, häufige Ausfälle, keine regelmäßigen Backups. Die Kanzlei verlor Arbeitszeit durch IT-Probleme.",
    solution: "Komplette IT-Modernisierung: Neue Server-Infrastruktur, automatisierte Backups, Managed Services mit monatlichem Vor-Ort-Support.",
    result: "98% weniger IT-Ausfälle, automatisierte Datensicherung, fester monatlicher IT-Ansprechpartner.",
    quote: "Seit Petasync unsere IT betreut, können wir uns auf unsere Arbeit konzentrieren statt auf IT-Probleme.",
  },
  {
    icon: Wrench,
    category: "PC-Reparatur",
    challenge: "Laptop einer Studentin in Erlangen fiel aus – mitten in der Prüfungsphase. Mainboard-Defekt, dringende Datenrettung nötig.",
    title: "Studentin in Erlangen",
    solution: "Sofort-Diagnose, kostenloser Leih-PC am selben Tag bereitgestellt. Datenrettung innerhalb von 48h, Mainboard-Reparatur in 5 Tagen.",
    result: "Alle Daten gerettet, Prüfungen mit Leih-PC ohne Unterbrechung geschrieben. Laptop nach 5 Tagen wie neu.",
    quote: "Der kostenlose Leih-PC hat mich gerettet. Ohne ihn hätte ich meine Prüfungen verpasst.",
  },
  {
    icon: Globe,
    category: "Webdesign",
    title: "Handwerksbetrieb in Ansbach",
    challenge: "Keine Online-Präsenz, alle Aufträge nur über Mundpropaganda. Potenzielle Kunden fanden den Betrieb nicht über Google.",
    solution: "Professionelle Website mit SEO-Optimierung, Google Business Profil eingerichtet, lokale Suchmaschinenoptimierung.",
    result: "Nach 3 Monaten: 40% mehr Anfragen über die Website. Seite 1 bei Google für relevante lokale Suchbegriffe.",
    quote: "Innerhalb von 3 Monaten kamen mehr Anfragen über die Website als über alle anderen Wege zusammen.",
  },
  {
    icon: Shield,
    category: "IT-Sicherheit",
    title: "Steuerkanzlei in Fürth",
    challenge: "Ransomware-Angriff verschlüsselte alle Mandantendaten. Kein funktionierendes Backup vorhanden. Existenzbedrohende Situation.",
    solution: "Notfall-Einsatz: Systemanalyse, Datenrettung von teilweise beschädigten Festplatten, Neuaufbau der IT-Infrastruktur mit Sicherheitskonzept.",
    result: "95% der Daten wiederhergestellt. Neues Sicherheitskonzept mit automatisiertem Offsite-Backup und Managed Security.",
    quote: "Petasync hat uns aus einer existenzbedrohenden Lage gerettet. Seitdem sind wir bestens geschützt.",
  },
];

const testimonials = [
  {
    text: "Schnell, fair und kompetent. Der kostenlose Leih-PC ist ein geniales Konzept. Klare Empfehlung!",
    author: "M. Schmidt",
    location: "Ansbach",
    rating: 5,
  },
  {
    text: "Endlich ein IT-Service der ehrlich ist. Keine versteckten Kosten, immer erreichbar. Top!",
    author: "K. Wagner",
    location: "Nürnberg",
    rating: 5,
  },
  {
    text: "Unsere Firmen-IT läuft seit der Umstellung auf Managed Services problemlos. Absolut empfehlenswert.",
    author: "T. Müller",
    location: "Fürth",
    rating: 5,
  },
  {
    text: "Die Website die Petasync für uns erstellt hat, bringt uns jeden Monat neue Kunden. Beste Investition.",
    author: "S. Weber",
    location: "Erlangen",
    rating: 5,
  },
];

export default function Referenzen() {
  useSEO({
    title: "Referenzen & Kundenstimmen | Petasync IT-Service",
    description: "Echte Erfolgsgeschichten unserer Kunden. Von der Notfall-Datenrettung bis zur IT-Modernisierung – erfahren Sie, wie wir helfen.",
  });

  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: casesRef, isRevealed: casesRevealed } = useScrollReveal();
  const { ref: testimonialsRef, isRevealed: testimonialsRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div ref={heroRef} className={cn("container-tight relative z-10 transition-all duration-1000", heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              <span className="gradient-text">Referenzen</span>{" "}& Kundenstimmen
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Echte Geschichten, echte Ergebnisse. Erfahren Sie, wie wir unseren Kunden helfen – vom Notfall bis zur langfristigen IT-Partnerschaft.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div ref={casesRef} className={cn("transition-all duration-1000", casesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Erfolgsgeschichten</h2>
              <p className="text-muted-foreground">Wie wir unseren Kunden konkret geholfen haben</p>
            </div>

            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <div key={index} className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <study.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{study.category}</span>
                      <h3 className="text-2xl font-bold text-foreground mt-2">{study.title}</h3>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <p className="text-sm font-semibold text-primary mb-2">Herausforderung</p>
                      <p className="text-muted-foreground text-sm">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary mb-2">Lösung</p>
                      <p className="text-muted-foreground text-sm">{study.solution}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary mb-2">Ergebnis</p>
                      <p className="text-muted-foreground text-sm">{study.result}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-start gap-3">
                      <Quote className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-foreground italic">{study.quote}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div ref={testimonialsRef} className={cn("transition-all duration-1000", testimonialsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Kundenstimmen</h2>
              <p className="text-muted-foreground">Was unsere Kunden über uns sagen</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-medium">{testimonial.author}</span>
                    <span className="text-muted-foreground">– {testimonial.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="relative text-center">
              <Star className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Werden Sie unsere nächste Erfolgsgeschichte</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Egal ob PC-Problem, IT-Projekt oder Website – wir freuen uns auf Sie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt">Jetzt anfragen<ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                  <a href="tel:+491637117198"><Phone className="mr-2 h-4 w-4" />Anrufen</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
