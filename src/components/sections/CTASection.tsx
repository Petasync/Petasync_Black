import { Link } from "react-router-dom";
import { ArrowRight, Phone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-95" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container-tight relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
            Bereit für IT ohne Kopfschmerzen?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            Lassen Sie uns gemeinsam Ihre IT-Herausforderungen lösen. 
            Kostenlose Erstberatung – unverbindlich und ohne Risiko.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-base"
            >
              <Link to="/kontakt">
                <Phone className="w-5 h-5 mr-2" />
                Jetzt Kontakt aufnehmen
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/30 text-primary-foreground hover:bg-white/10 h-14 px-8 text-base"
            >
              <Link to="/privatkunden#leih-pc">
                <Monitor className="w-5 h-5 mr-2" />
                Leih-PC Service
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-primary-foreground/60">
            ✓ Kostenlose Beratung &nbsp;&nbsp; ✓ Transparente Preise &nbsp;&nbsp; ✓ Vor-Ort-Service
          </p>
        </div>
      </div>
    </section>
  );
}
