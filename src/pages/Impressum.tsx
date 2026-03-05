import { Layout } from "@/components/layout/Layout";
import { FileText } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import legalAbstract from "@/assets/legal-abstract.png";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";

export default function Impressum() {
  useSEO(SEO_PAGES.impressum);
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={legalAbstract}
            alt="Petasync Impressum"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        
        {/* 3D Scene */}
        <Suspense fallback={null}>
          <Floating3DScene variant="minimal" className="opacity-30" />
        </Suspense>
        
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
        
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
              <span className="gradient-text">Impressum</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-tight max-w-3xl">
          <div className="space-y-12">
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">Angaben gemäß § 5 TMG</h2>
              <p className="text-muted-foreground leading-relaxed">
                Petasync IT-Service<br />
                Phillip Scheiderer<br />
                Neudorf 14<br />
                90599 Dietenhofen
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">Kontakt</h2>
              <p className="text-muted-foreground leading-relaxed">
                Telefon: +49 163 711 7198<br />
                E-Mail: <a href="mailto:service@petasync.de" className="text-primary hover:text-primary/80 transition-colors">service@petasync.de</a>
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">Umsatzsteuer-ID</h2>
              <p className="text-muted-foreground leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE49032654873
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">Berufsbezeichnung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Berufsbezeichnung: IT-Dienstleister<br />
                Verliehen in: Deutschland
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">EU-Streitschlichtung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br /><br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">Verbraucherstreitbeilegung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">Haftung für Inhalte</h2>
              <p className="text-muted-foreground leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                Tätigkeit hinweisen.
                <br /><br />
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
                erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">Haftung für Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                Seiten verantwortlich.
                <br /><br />
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete 
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
              </p>
            </div>

            <div className="divider-glow" />

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">Urheberrecht</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
