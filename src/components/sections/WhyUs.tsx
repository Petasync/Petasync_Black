import { MapPin, Clock, Shield, Users, Zap, HeadphonesIcon } from "lucide-react";

const reasons = [
  {
    icon: MapPin,
    title: "Lokal vor Ort",
    description: "Persönlicher Service in Dietenhofen, Ansbach, Nürnberg und Umgebung – kein anonymes Callcenter.",
  },
  {
    icon: Clock,
    title: "Schnelle Hilfe",
    description: "Kurze Reaktionszeiten und flexible Terminvergabe – weil IT-Probleme nicht warten können.",
  },
  {
    icon: Shield,
    title: "Transparente Preise",
    description: "Keine versteckten Kosten. Sie wissen vorher, was die Reparatur kosten wird.",
  },
  {
    icon: Users,
    title: "Persönliche Beratung",
    description: "Wir erklären verständlich und nehmen uns Zeit für Ihre Fragen – ohne Fachchinesisch.",
  },
  {
    icon: Zap,
    title: "Moderne Lösungen",
    description: "Aktuelle Technologien und bewährte Methoden für nachhaltige IT-Lösungen.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support der bleibt",
    description: "Auch nach der Reparatur sind wir für Sie da – bei Fragen einfach melden.",
  },
];

export function WhyUs() {
  return (
    <section className="section-padding">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Warum Petasync</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6">
            IT-Service mit{" "}
            <span className="gradient-text">Handschlag-Qualität</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Wir sind kein anonymer Großkonzern. Bei uns bekommen Sie echten, 
            persönlichen Service von Menschen, die ihre Arbeit lieben.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group text-center p-6 rounded-2xl hover:bg-muted/50 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <reason.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
