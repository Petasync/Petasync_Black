import { Link } from "react-router-dom";
import { Monitor, CheckCircle2, ArrowRight, Clock, Laptop, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Clock,
    title: "Keine Ausfallzeit",
    description: "Arbeiten Sie nahtlos weiter während wir Ihren PC reparieren",
  },
  {
    icon: Laptop,
    title: "Vorkonfiguriert",
    description: "Sofort einsatzbereit mit allen wichtigen Programmen",
  },
  {
    icon: Shield,
    title: "Kostenlos inklusive",
    description: "Bei jeder Reparatur ab 2 Werktagen Dauer",
  },
];

export function LeihPCHighlight() {
  return (
    <section id="leih-pc" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container-tight relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main Visual */}
              <div className="absolute inset-0 rounded-3xl gradient-bg opacity-10" />
              <div className="absolute inset-4 glass-strong rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto rounded-2xl gradient-bg flex items-center justify-center mb-6 tech-glow">
                    <Monitor className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">Leih-PC</h3>
                  <p className="text-muted-foreground">Ihr Ersatzgerät</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 glass rounded-xl p-4 shadow-tech-md animate-float">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <div className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 shadow-tech-md animate-float" style={{ animationDelay: "1s" }}>
                <span className="text-sm font-medium">Sofort verfügbar</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <Monitor className="w-4 h-4" />
                Unser Alleinstellungsmerkmal
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
                Weiterarbeiten mit unserem{" "}
                <span className="gradient-text">Leih-PC Service</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ihr Computer ist zur Reparatur – aber Ihre Arbeit muss weitergehen? 
                Kein Problem! Mit unserem einzigartigen Leih-PC Service überbrücken 
                Sie die Reparaturzeit ohne Produktivitätsverlust.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="gradient-bg border-0 hover:opacity-90">
                <Link to="/kontakt">
                  Leih-PC anfragen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/privatkunden">
                  Alle Privatkundenservices
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
