import { useState } from "react";
import { Link } from "react-router-dom";
import { Monitor, Building2, Globe, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface WizardResult {
  name: string;
  price: string;
  href: string;
  features: string[];
}

const resultMap: Record<string, WizardResult> = {
  "privat-pc": {
    name: "PC Reparatur Komplett",
    price: "99€",
    href: "/privatkunden",
    features: ["Diagnose & Fehleranalyse", "Software-Reparatur & Updates", "Reinigung & Optimierung", "Kostenloser Leih-PC"],
  },
  "privat-daten": {
    name: "Daten-Rettung",
    price: "129€",
    href: "/privatkunden",
    features: ["Analyse & Datenrettung", "Bis 500 GB", "Backup-Einrichtung", "Datenträger-Prüfung"],
  },
  "privat-netzwerk": {
    name: "PC nach Maß",
    price: "99€ + Hardware",
    href: "/privatkunden",
    features: ["Persönliche Beratung", "Zusammenbau & Installation", "Windows & Treiber", "12 Monate Garantie"],
  },
  "business-betreuung": {
    name: "IT-Betreuung Business",
    price: "349€/Monat",
    href: "/geschaeftskunden",
    features: ["8h Support pro Monat", "Vor-Ort 2x/Monat inkl.", "Server-Monitoring", "4h Reaktionszeit"],
  },
  "business-projekt": {
    name: "Einmalige IT-Projekte",
    price: "ab 490€",
    href: "/geschaeftskunden",
    features: ["Netzwerk-Setup", "Cloud-Migration", "Server-Einrichtung", "Festpreis-Angebot"],
  },
  "business-beratung": {
    name: "IT-Beratung & Strategie",
    price: "Auf Anfrage",
    href: "/kontakt",
    features: ["IT-Strategie Workshop", "Digitalisierungsberatung", "DSGVO-Audit", "Herstellerunabhängig"],
  },
  "website-einfach": {
    name: "Template-Website",
    price: "490€",
    href: "/websites/template",
    features: ["Fertiges Design", "5 Seiten", "Mobil-optimiert", "In 5-7 Tagen online"],
  },
  "website-individuell": {
    name: "Business-Website",
    price: "1.990€",
    href: "/websites/business",
    features: ["Premium-Design", "10 Seiten + CMS", "SEO inklusive", "3 Monate Support"],
  },
  "website-komplex": {
    name: "Enterprise-Website",
    price: "ab 3.990€",
    href: "/websites/enterprise",
    features: ["Komplett individuell", "E-Commerce möglich", "API-Anbindung", "12 Monate Support"],
  },
};

const step2Options = {
  privat: [
    { id: "pc", label: "Mein PC ist langsam oder kaputt", description: "Reparatur, Reinigung, Updates" },
    { id: "daten", label: "Daten verloren oder Virus", description: "Datenrettung, Sicherheit, Backup" },
    { id: "netzwerk", label: "Neuer PC oder WLAN-Problem", description: "Zusammenbau, Netzwerk, Setup" },
  ],
  business: [
    { id: "betreuung", label: "Laufende IT-Betreuung", description: "Monatlicher Support & Monitoring" },
    { id: "projekt", label: "Einmaliges Projekt", description: "Server, Netzwerk, Cloud-Migration" },
    { id: "beratung", label: "IT-Beratung & Strategie", description: "Digitalisierung, DSGVO, Audit" },
  ],
  website: [
    { id: "einfach", label: "Einfach & günstig", description: "Fertige Vorlage, schnell online" },
    { id: "individuell", label: "Individuell für mein Business", description: "Eigenes Design, CMS, SEO" },
    { id: "komplex", label: "Komplex mit Shop/Funktionen", description: "E-Commerce, API, Spezialfunktionen" },
  ],
};

interface DecisionWizardProps {
  trigger?: React.ReactNode;
}

export function DecisionWizard({ trigger }: DecisionWizardProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"privat" | "business" | "website" | null>(null);
  const [choice, setChoice] = useState<string | null>(null);

  const reset = () => {
    setStep(1);
    setUserType(null);
    setChoice(null);
  };

  const handleTypeSelect = (type: "privat" | "business" | "website") => {
    setUserType(type);
    setStep(2);
  };

  const handleChoiceSelect = (id: string) => {
    setChoice(id);
    setStep(3);
  };

  const result = userType && choice ? resultMap[`${userType}-${choice}`] : null;

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full">
            Was brauchen Sie?
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-background border-white/10">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {step === 1 && "Was brauchen Sie?"}
            {step === 2 && userType === "privat" && "Was ist das Problem?"}
            {step === 2 && userType === "business" && "Was brauchen Sie?"}
            {step === 2 && userType === "website" && "Was für eine Website?"}
            {step === 3 && "Unser Vorschlag für Sie"}
          </DialogTitle>
        </DialogHeader>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 my-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 rounded-full transition-all",
                s === step ? "w-8 bg-primary" : s < step ? "w-8 bg-primary/40" : "w-8 bg-white/10"
              )}
            />
          ))}
        </div>

        {/* Step 1: Who are you? */}
        {step === 1 && (
          <div className="grid gap-3 py-4">
            {[
              { type: "privat" as const, icon: Monitor, label: "Privatperson", desc: "PC-Problem, Daten, Sicherheit" },
              { type: "business" as const, icon: Building2, label: "Unternehmen", desc: "IT-Betreuung für Ihre Firma" },
              { type: "website" as const, icon: Globe, label: "Website", desc: "Neue Website für Ihr Business" },
            ].map((option) => (
              <button
                key={option.type}
                onClick={() => handleTypeSelect(option.type)}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <option.icon className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </button>
            ))}
          </div>
        )}

        {/* Step 2: What do you need? */}
        {step === 2 && userType && (
          <div className="py-4">
            <div className="grid gap-3">
              {step2Options[userType].map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleChoiceSelect(option.id)}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-left"
                >
                  <div>
                    <div className="font-semibold text-foreground">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              className="mt-4 text-muted-foreground"
              onClick={() => { setStep(1); setUserType(null); }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && result && (
          <div className="py-4">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-6">
              <h3 className="text-lg font-bold text-foreground mb-1">{result.name}</h3>
              <div className="text-3xl font-bold text-foreground mb-4">{result.price}</div>

              <ul className="space-y-2 mb-6">
                {result.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link to={`/kontakt?service=${encodeURIComponent(result.name)}`}>
                  Jetzt anfragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                className="text-muted-foreground"
                onClick={() => { setStep(2); setChoice(null); }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück
              </Button>

              <Button
                variant="ghost"
                className="text-muted-foreground"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link to={result.href}>
                  Alle Pakete ansehen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
