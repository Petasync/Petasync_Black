import { Layout } from "@/components/layout/Layout";
import { Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import datenschutzAbstract from "@/assets/datenschutz-abstract.png";

export default function Datenschutz() {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={datenschutzAbstract}
            alt="Petasync Datenschutz" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        
        {/* 3D Scene */}
        <Suspense fallback={null}>
          <Floating3DScene variant="minimal" className="opacity-30" />
        </Suspense>
        
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-24 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-6 block">
              Rechtliches
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-[1.1]">
              <span className="gradient-text">Datenschutz</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-tight max-w-3xl">
          <div className="space-y-12">

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Allgemeine Hinweise</h3>
              <p className="text-muted-foreground leading-relaxed">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Datenerfassung auf dieser Website</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Wer ist verantwortlich?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                Dessen Kontaktdaten können Sie dem Impressum entnehmen.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong className="text-foreground">Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. 
                Andere Daten werden automatisch beim Besuch der Website erfasst.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong className="text-foreground">Welche Rechte haben Sie?</strong><br />
                Sie haben jederzeit das Recht auf Auskunft, Berichtigung oder Löschung Ihrer Daten.
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">2. Hosting</h2>
              <p className="text-muted-foreground leading-relaxed">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser 
                Website erfasst werden, werden auf den Servern des Hosters gespeichert.
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">3. Verantwortliche Stelle</h2>
              <p className="text-muted-foreground leading-relaxed">
                Petasync IT-Service<br />
                [Ihr Name]<br />
                [Straße und Hausnummer]<br />
                91126 Dietenhofen<br /><br />
                E-Mail: <a href="mailto:service@petasync.de" className="text-primary hover:text-primary/80 transition-colors">service@petasync.de</a>
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">4. Speicherdauer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ihre personenbezogenen Daten verbleiben bei uns, bis der Zweck für die 
                Datenverarbeitung entfällt. Wenn Sie ein Löschersuchen geltend machen, 
                werden Ihre Daten gelöscht.
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">5. Ihre Rechte</h2>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Widerruf der Einwilligung</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Beschwerderecht</h3>
              <p className="text-muted-foreground leading-relaxed">
                Im Falle von Verstößen gegen die DSGVO steht Ihnen ein Beschwerderecht 
                bei einer Aufsichtsbehörde zu.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Datenübertragbarkeit</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sie haben das Recht, Daten in einem gängigen, maschinenlesbaren Format zu erhalten.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Auskunft, Löschung und Berichtigung</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre Daten.
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">6. Datenerfassung auf dieser Website</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                Unsere Website verwendet Cookies. Diese sind kleine Datenpakete, die 
                vorübergehend oder dauerhaft auf Ihrem Gerät gespeichert werden.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Kontaktformular</h3>
              <p className="text-muted-foreground leading-relaxed">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben 
                zwecks Bearbeitung bei uns gespeichert.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">E-Mail, Telefon, WhatsApp</h3>
              <p className="text-muted-foreground leading-relaxed">
                Wenn Sie uns kontaktieren, wird Ihre Anfrage zur Bearbeitung bei uns gespeichert.
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">7. SSL-Verschlüsselung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Diese Seite nutzt SSL- bzw. TLS-Verschlüsselung zum Schutz vertraulicher Inhalte.
              </p>
            </div>

            <div className="divider-glow" />

            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
