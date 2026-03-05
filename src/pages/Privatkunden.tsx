import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Monitor, Shield, Wifi, ArrowRight, CheckCircle2, Phone,
  Laptop, Wrench, Cpu, Clock, Star, Users, ChevronDown
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense, useState, useEffect, useCallback } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import privatkundenHero from "@/assets/privatkunden-hero.png";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

/* ─── Scroll-Helper ─── */
function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Entscheidungs-Navigation ─── */
const decisions = [
  { label: "Mein PC startet nicht", target: "reparatur", icon: Monitor },
  { label: "Mein PC ist langsam", target: "reparatur", icon: Clock },
  { label: "Ich brauche Datensicherung", target: "datensicherheit", icon: Shield },
  { label: "Ich will einen neuen PC", target: "zusammenbau", icon: Cpu },
  { label: "Mein WLAN ist schlecht", target: "netzwerk", icon: Wifi },
];

/* ─── Reinigungspakete ─── */
const cleaningPackages = [
  {
    name: "Basic",
    price: "25",
    description: "Außenreinigung & Grundpflege",
    features: [
      "Gehäuse-Außenreinigung",
      "Tastatur & Display reinigen",
      "Staub zugängliche Bereiche",
    ],
  },
  {
    name: "Premium",
    price: "45",
    description: "Komplettreinigung innen & außen",
    features: [
      "Alles aus Basic",
      "Gehäuse öffnen & innen reinigen",
      "Alle Lüfter gründlich reinigen",
      "Staub komplett entfernen",
    ],
    highlight: true,
  },
  {
    name: "Pro",
    price: "69",
    description: "Tiefenreinigung + Optimierung",
    features: [
      "Alles aus Premium",
      "Wärmeleitpaste erneuern",
      "Leistungs-Optimierung",
      "Software-Check & Bereinigung",
    ],
  },
];

/* ─── Daten & Sicherheit ─── */
const securityServices = [
  { name: "Virenentfernung & Bereinigung", price: "45€", description: "Komplettscan, Entfernung, Systemreinigung" },
  { name: "Antivirus + Firewall Setup", price: "29€", description: "Installation, Konfiguration, Aktivierung" },
  { name: "Datenrettung (logisch, bis 500GB)", price: "89€", description: "Gelöschte Dateien, defektes Dateisystem" },
  { name: "Datenrettung (physisch/komplex)", price: "199€", description: "Defekte Festplatte, SSD-Fehler" },
  { name: "Backup-Einrichtung (lokal + Cloud)", price: "45€", description: "Automatisches Backup, Cloud-Sync" },
  { name: "Komplett-Sicherheitspaket", price: "99€", description: "Virenentfernung + AV + Firewall + Backup" },
];

/* ─── PC-Zusammenbau ─── */
const buildServices = [
  { name: "Zusammenbau (nur Arbeit)", price: "69€", description: "Sie liefern Teile, wir bauen zusammen" },
  { name: "Zusammenbau + Windows + Treiber", price: "99€", description: "Zusammenbau, Windows-Installation, alle Treiber" },
  { name: "Komplett-Service", price: "149€", description: "Zusammenbau + Setup + Test + 1h Einweisung" },
];

/* ─── Netzwerk & WLAN ─── */
const networkServices = [
  { name: "WLAN-Check & Optimierung", price: "49€", description: "Analyse, Kanaloptimierung, Reichweite verbessern" },
  { name: "Router-Setup & Konfiguration", price: "49€", description: "Einrichtung, Sicherheit, Gastnetzwerk" },
  { name: "Netzwerk-Einrichtung (bis 5 Geräte)", price: "79€", description: "WLAN + Drucker + Smart-Geräte einbinden" },
  { name: "Netzwerk-Einrichtung (bis 10 Geräte)", price: "129€", description: "Großes Heimnetzwerk, NAS, Medienserver" },
  { name: "Mesh-WLAN Setup", price: "99€ + Hardware", description: "Lückenlose Abdeckung im ganzen Haus" },
];

/* ─── FAQ ─── */
const faqItems = [
  {
    question: "Was kostet eine PC-Reparatur?",
    answer: "Unsere PC-Reparatur kostet 39€ pro Stunde. Die Diagnose ist bei Reparaturauftrag kostenlos. Ohne Auftrag berechnen wir 29€ für die Diagnose. Ersatzteile werden separat nach Kostenvoranschlag berechnet."
  },
  {
    question: "Wie lange dauert eine Reparatur?",
    answer: "Die meisten Software-Reparaturen sind innerhalb von 1-2 Stunden erledigt. Bei Hardware-Defekten hängt es von der Verfügbarkeit der Ersatzteile ab – in der Regel 1-3 Werktage. Während der Reparatur erhalten Sie kostenlos einen Leih-PC."
  },
  {
    question: "Was ist der Leih-PC Service?",
    answer: "Bei jeder Reparatur erhalten Sie kostenlos einen Ersatz-PC, damit Sie ohne Unterbrechung weiterarbeiten können. Auf Wunsch übertragen wir Ihre Daten auf den Leih-PC und nach der Reparatur zurück."
  },
  {
    question: "Machen Sie auch Hausbesuche?",
    answer: "Ja! Wir kommen gerne zu Ihnen nach Hause. Vor-Ort-Service ist einer unserer Kernvorteile – besonders für Kunden, die ihr Gerät nicht transportieren können oder möchten."
  },
  {
    question: "Kostet die Diagnose etwas?",
    answer: "Die Diagnose ist kostenlos, wenn Sie uns anschließend mit der Reparatur beauftragen. Ohne Reparaturauftrag berechnen wir 29€ für die Fehleranalyse."
  },
  {
    question: "Wie funktioniert die Datenrettung?",
    answer: "Wir analysieren zunächst den Schaden – bei logischen Problemen (gelöschte Dateien, Formatierung) kostet die Rettung 89€ für bis zu 500GB. Bei physischen Defekten erstellen wir einen individuellen Kostenvoranschlag."
  },
  {
    question: "Können Sie auch Laptops reparieren?",
    answer: "Ja, wir reparieren Desktop-PCs, Laptops, Notebooks und auch Mac-Geräte. Von Hardware-Defekten über Software-Probleme bis hin zu Virenentfernung – wir helfen bei allen IT-Problemen."
  },
  {
    question: "In welchem Gebiet sind Sie tätig?",
    answer: "Wir bieten unsere Services in Ansbach, Nürnberg, Fürth, Erlangen, Oberasbach, Dietenhofen, Neustadt an der Aisch und der gesamten Region im Umkreis von ca. 50 km an."
  },
];

/* ─── FAQ Schema ─── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function Privatkunden() {
  useSEO(SEO_PAGES.privatkunden);

  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: decisionRef, isRevealed: decisionRevealed } = useScrollReveal();
  const { ref: repairRef, isRevealed: repairRevealed } = useScrollReveal();
  const { ref: cleaningRef, isRevealed: cleaningRevealed } = useScrollReveal();
  const { ref: securityRef, isRevealed: securityRevealed } = useScrollReveal();
  const { ref: buildRef, isRevealed: buildRevealed } = useScrollReveal();
  const { ref: networkRef, isRevealed: networkRevealed } = useScrollReveal();
  const { ref: trustRef, isRevealed: trustRevealed } = useScrollReveal();
  const { ref: faqRef, isRevealed: faqRevealed } = useScrollReveal();

  /* Sticky CTA – sichtbar nach Hero-Scroll */
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = useCallback((id: string) => scrollToSection(id), []);

  return (
    <Layout>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={privatkundenHero}
            alt="PC-Reparatur & IT-Service für Privatkunden"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>

        <Suspense fallback={null}>
          <Floating3DScene variant="default" className="opacity-40" />
        </Suspense>

        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-32 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-6 block">
              Für Privatpersonen
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              PC-Reparatur &{" "}
              <span className="gradient-text">IT-Service</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Transparent. Fair. Lokal in Ansbach & Nürnberg.
            </p>

            {/* USP-Leiste */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["39€/h Reparatur", "Kostenlose Diagnose", "Leih-PC gratis"].map((usp) => (
                <span
                  key={usp}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {usp}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Problem melden
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="tel:+491637117198">
                  <Phone className="mr-2 h-4 w-4" />
                  Sofort anrufen
                </a>
              </Button>
            </div>

            {/* Trust-Indikatoren */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                5.0 Google
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                500+ Kunden
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. ENTSCHEIDUNGS-NAVIGATION ─── */}
      <section className="section-padding relative">
        <div className="container-tight relative">
          <div className="divider-glow mb-16" />

          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Was trifft auf Sie zu?
            </h2>
            <p className="text-muted-foreground">
              Klicken Sie auf Ihr Problem – wir zeigen Ihnen die passende Lösung.
            </p>
          </div>

          <div
            ref={decisionRef}
            className={cn(
              "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 transition-all duration-1000",
              decisionRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {decisions.map((d) => (
              <button
                key={d.label}
                onClick={() => handleScrollTo(d.target)}
                className="group p-5 rounded-2xl border border-white/5 hover:border-primary/30 bg-gradient-to-br from-white/[0.02] to-transparent transition-all hover:scale-[1.02] text-left"
              >
                <d.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground block">{d.label}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground mt-2 group-hover:translate-y-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. PC-REPARATUR (Stundenmodell) ─── */}
      <section id="reparatur" className="section-padding relative scroll-mt-24">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />

        <div className="container-tight relative">
          <div className="divider-glow mb-16" />

          <div
            ref={repairRef}
            className={cn(
              "transition-all duration-1000",
              repairRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="mb-12 text-center">
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Reparatur
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
                PC-Reparatur
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Egal ob Hardware- oder Software-Problem – wir reparieren PCs, Laptops und Notebooks.
              </p>
            </div>

            {/* Preis-Hero */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative rounded-2xl p-8 md:p-12 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 text-center">
                <div className="mb-6">
                  <span className="text-6xl font-bold text-foreground">39€</span>
                  <span className="text-2xl text-muted-foreground ml-2">/ Stunde</span>
                </div>
                <p className="text-lg text-foreground mb-8">
                  Transparent. Fair. Ohne Überraschungen.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 text-left mb-8">
                  {[
                    "Diagnose kostenlos bei Reparatur",
                    "29€ wenn nur Diagnose (ohne Auftrag)",
                    "Ersatzteile separat (nach Kostenvoranschlag)",
                    "Kostenloser Leih-PC während Reparatur",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt?service=PC-Reparatur">
                    Reparatur anfragen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Was ist inklusive / Was kostet extra */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Was ist inklusive?
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Fehleranalyse & Diagnose",
                    "Software-Reparatur & Neuinstallation",
                    "Treiber & Windows-Updates",
                    "Datenübertragung auf Leih-PC",
                    "Reinigung bei längeren Aufträgen",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-muted-foreground" />
                  Was kostet extra?
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Hardware & Ersatzteile (nach Kostenvoranschlag)",
                    "Datenrettung bei physischem Festplattendefekt",
                    "Spezial-Lötarbeiten (Mainboard, BGA)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-center text-xs text-muted-foreground/60">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. REINIGUNGSPAKETE ─── */}
      <section id="reinigung" className="section-padding relative scroll-mt-24">
        <div className="container-tight relative">
          <div className="divider-glow mb-16" />

          <div className="mb-12 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Reinigung
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
              Reinigungspakete
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Regelmäßige Reinigung verlängert die Lebensdauer und verbessert die Leistung Ihres PCs.
            </p>
          </div>

          <div
            ref={cleaningRef}
            className={cn(
              "grid md:grid-cols-3 gap-6 transition-all duration-1000",
              cleaningRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {cleaningPackages.map((pkg, index) => (
              <div
                key={index}
                className={cn(
                  "relative rounded-2xl p-8 transition-all hover:scale-[1.02]",
                  pkg.highlight
                    ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30"
                    : "bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10"
                )}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1 rounded-full bg-primary text-primary-foreground">
                    Beliebt
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{pkg.price}€</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full rounded-full",
                    pkg.highlight
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-white/10 text-foreground hover:bg-white/20"
                  )}
                  asChild
                >
                  <Link to={`/kontakt?service=${encodeURIComponent(`Reinigung ${pkg.name}`)}`}>
                    {pkg.name} buchen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. DATEN & SICHERHEIT ─── */}
      <section id="datensicherheit" className="section-padding relative scroll-mt-24">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />

        <div className="container-tight relative">
          <div className="divider-glow mb-16" />

          <div className="mb-12 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Sicherheit
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
              Daten & Sicherheit
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Festpreise pro Leistung – Sie wissen vorher genau, was es kostet.
            </p>
          </div>

          <div
            ref={securityRef}
            className={cn(
              "grid md:grid-cols-2 gap-4 max-w-4xl mx-auto transition-all duration-1000",
              securityRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {securityServices.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5 rounded-xl border border-white/5 hover:border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent transition-all group"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">{service.name}</h3>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-lg font-bold text-foreground">{service.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
              <Link to="/kontakt?service=Daten-Sicherheit">
                Jetzt absichern
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 6. PC-ZUSAMMENBAU ─── */}
      <section id="zusammenbau" className="section-padding relative scroll-mt-24">
        <div className="container-tight relative">
          <div className="divider-glow mb-16" />

          <div className="mb-12 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Zusammenbau
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
              PC-Zusammenbau
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ihr Wunsch-PC – professionell gebaut, getestet und eingerichtet.
            </p>
          </div>

          <div
            ref={buildRef}
            className={cn(
              "grid md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000",
              buildRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {buildServices.map((service, index) => (
              <div
                key={index}
                className={cn(
                  "relative rounded-2xl p-8 transition-all hover:scale-[1.02]",
                  index === 1
                    ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30"
                    : "bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10"
                )}
              >
                {index === 1 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1 rounded-full bg-primary text-primary-foreground">
                    Beliebt
                  </span>
                )}

                <h3 className="text-lg font-bold text-foreground mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <span className="text-3xl font-bold text-foreground block mb-6">{service.price}</span>

                <Button
                  className={cn(
                    "w-full rounded-full",
                    index === 1
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-white/10 text-foreground hover:bg-white/20"
                  )}
                  asChild
                >
                  <Link to={`/kontakt?service=${encodeURIComponent(service.name)}`}>
                    Anfragen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Hardware-Beratung inklusive – wir helfen Ihnen, die richtigen Komponenten zu wählen.
            <br />12 Monate Garantie auf den Zusammenbau.
          </p>
        </div>
      </section>

      {/* ─── 7. NETZWERK & WLAN ─── */}
      <section id="netzwerk" className="section-padding relative scroll-mt-24">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />

        <div className="container-tight relative">
          <div className="divider-glow mb-16" />

          <div className="mb-12 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Netzwerk
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
              Netzwerk & WLAN
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stabiles Internet in jedem Raum – professionell eingerichtet und gesichert.
            </p>
          </div>

          <div
            ref={networkRef}
            className={cn(
              "grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto transition-all duration-1000",
              networkRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {networkServices.map((service, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/5 hover:border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent transition-all"
              >
                <h3 className="text-sm font-semibold text-foreground mb-1">{service.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{service.description}</p>
                <span className="text-xl font-bold text-foreground">{service.price}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
              <Link to="/kontakt?service=Netzwerk-WLAN">
                Netzwerk-Beratung anfragen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 8. VERTRAUENS-ELEMENTE ─── */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-tight relative">
          <div className="divider-glow mb-16" />

          <div
            ref={trustRef}
            className={cn(
              "transition-all duration-1000",
              trustRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="mb-12 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Warum Kunden uns{" "}
                <span className="gradient-text">vertrauen</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Star, value: "5.0", label: "Google Bewertung" },
                { icon: Users, value: "500+", label: "Zufriedene Kunden" },
                { icon: Clock, value: "24h", label: "Express-Service" },
                { icon: Laptop, value: "0€", label: "Leih-PC bei Reparatur" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <stat.icon className={cn("w-8 h-8 mx-auto mb-3", i === 0 ? "text-yellow-500" : "text-primary")} />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Garantie-Versprechen */}
            <div className="max-w-3xl mx-auto">
              <div className="p-8 rounded-2xl border border-primary/20 bg-primary/5 text-center">
                <h3 className="text-xl font-bold text-foreground mb-4">Unser Versprechen</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    "Keine versteckten Kosten – Sie zahlen nur, was vereinbart ist",
                    "Kostenvoranschlag vor jeder Hardware-Reparatur",
                    "Kostenloser Leih-PC bei jeder Reparatur",
                  ].map((promise, i) => (
                    <div key={i} className="flex items-start gap-2 text-left">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{promise}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. FAQ ─── */}
      <section id="faq" className="section-padding relative scroll-mt-24">
        <div className="container-tight relative">
          <div className="divider-glow mb-16" />

          <div className="mb-12 text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
              Häufige Fragen
            </h2>
          </div>

          <div
            ref={faqRef}
            className={cn(
              "max-w-3xl mx-auto transition-all duration-1000",
              faqRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-white/5 rounded-xl px-6 bg-white/[0.02] data-[state=open]:border-white/10"
                >
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ─── 10. FINALER CONVERSION-BLOCK ─── */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-20" />

          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              PC-Problem? Wir kümmern uns darum.
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Schildern Sie uns Ihr Problem – wir finden die Lösung. Diagnose bei Reparatur kostenlos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">
                  Problem melden
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="tel:+491637117198">
                  <Phone className="mr-2 h-4 w-4" />
                  Jetzt anrufen
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="https://wa.me/491637117198" target="_blank" rel="noopener noreferrer">
                  WhatsApp schreiben
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for sticky CTA on mobile */}
      <div className="h-16 lg:hidden" />

      {/* ─── STICKY CTA (Mobile) ─── */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300 bg-background/95 backdrop-blur-lg border-t border-white/10 p-3",
          showStickyCTA ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
      >
        <div className="flex gap-2 max-w-lg mx-auto">
          <Button className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-full text-sm" asChild>
            <Link to="/kontakt">
              Jetzt anfragen
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/5 px-4" asChild>
            <a href="tel:+491637117198">
              <Phone className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
