import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Monitor, Building2, Globe, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface NavigationOption {
  id: string;
  label: string;
  description: string;
  href: string;
}

const step2Options: Record<string, NavigationOption[]> = {
  privat: [
    { id: "pc-kaputt", label: "Mein PC startet nicht / ist kaputt", description: "Reparatur, Diagnose, Fehlerbehebung", href: "/privatkunden#reparatur" },
    { id: "pc-langsam", label: "Mein PC ist langsam", description: "Reinigung, Optimierung, Aufrüstung", href: "/privatkunden#reinigung" },
    { id: "daten", label: "Ich brauche Datensicherung", description: "Datenrettung, Backup, Virenentfernung", href: "/privatkunden#datensicherheit" },
    { id: "neuer-pc", label: "Ich will einen neuen PC", description: "Zusammenbau, Beratung, Installation", href: "/privatkunden#zusammenbau" },
    { id: "wlan", label: "Mein WLAN ist schlecht", description: "Netzwerk-Setup, Router, Mesh-WLAN", href: "/privatkunden#netzwerk" },
  ],
  business: [
    { id: "betreuung", label: "Laufende IT-Betreuung", description: "Monatlicher Support & Monitoring", href: "/geschaeftskunden" },
    { id: "projekt", label: "Einmaliges Projekt", description: "Netzwerk, Cloud, Server-Einrichtung", href: "/geschaeftskunden#zusatzmodule" },
    { id: "beratung", label: "IT-Beratung & Strategie", description: "Digitalisierung, DSGVO, Audit", href: "/kontakt" },
  ],
  website: [
    { id: "einfach", label: "Einfach & günstig", description: "Fertige Vorlage, ab 490€, schnell online", href: "/websites/template" },
    { id: "individuell", label: "Individuell für mein Business", description: "Eigenes Design, CMS, SEO ab 1.990€", href: "/websites/business" },
    { id: "komplex", label: "Komplex mit Shop/Funktionen", description: "E-Commerce, API, ab 3.990€", href: "/websites/enterprise" },
  ],
};

interface DecisionWizardProps {
  trigger?: React.ReactNode;
}

export function DecisionWizard({ trigger }: DecisionWizardProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"privat" | "business" | "website" | null>(null);
  const navigate = useNavigate();

  const reset = () => {
    setStep(1);
    setUserType(null);
  };

  const handleTypeSelect = (type: "privat" | "business" | "website") => {
    setUserType(type);
    setStep(2);
  };

  const handleOptionSelect = (href: string) => {
    setOpen(false);
    reset();
    // Navigate and scroll to hash if present
    const [path, hash] = href.split("#");
    navigate(path);
    if (hash) {
      // Small delay to let the page render before scrolling
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

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
          </DialogTitle>
        </DialogHeader>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 my-4">
          {[1, 2].map((s) => (
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
              { type: "privat" as const, icon: Monitor, label: "Privatperson", desc: "PC-Reparatur, Daten, Sicherheit" },
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

        {/* Step 2: Navigate directly */}
        {step === 2 && userType && (
          <div className="py-4">
            <div className="grid gap-3">
              {step2Options[userType].map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.href)}
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
      </DialogContent>
    </Dialog>
  );
}
