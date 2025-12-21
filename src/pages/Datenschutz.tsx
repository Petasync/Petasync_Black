import { Layout } from "@/components/layout/Layout";
import { Shield } from "lucide-react";

const Datenschutz = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-900/20 via-background to-tech-800/10" />
        
        <div className="container-tight relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Rechtliches
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Datenschutzerklärung
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 pb-20">
        <div className="container-tight max-w-3xl">
          <div className="glass-strong rounded-2xl p-8 md:p-12 space-y-8">

            <div>
              <h2 className="text-xl font-display font-bold mb-4">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Allgemeine Hinweise</h3>
              <p className="text-muted-foreground">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Datenerfassung auf dieser Website</h3>
              <p className="text-muted-foreground">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei 
                kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere 
                Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch 
                unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, 
                Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Wofür nutzen wir Ihre Daten?</strong><br />
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu 
                gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und 
                Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem 
                ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine 
                Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung 
                jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten 
                Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold mb-4">2. Hosting</h2>
              <p className="text-muted-foreground">
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              <h3 className="text-lg font-semibold mt-6 mb-3">Externes Hosting</h3>
              <p className="text-muted-foreground">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser 
                Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei 
                kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, 
                Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über 
                eine Website generiert werden, handeln.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Datenschutz</h3>
              <p className="text-muted-foreground">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den 
                gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
              <p className="text-muted-foreground">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                Petasync IT-Service<br />
                [Ihr Name]<br />
                [Straße und Hausnummer]<br />
                91126 Dietenhofen<br /><br />
                E-Mail: info@petasync.de
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Speicherdauer</h3>
              <p className="text-muted-foreground">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt 
                wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die 
                Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen 
                oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, 
                sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer 
                personenbezogenen Daten haben.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p className="text-muted-foreground">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung 
                möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die 
                Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf 
                unberührt.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
              <p className="text-muted-foreground">
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht 
                bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen 
                Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Recht auf Datenübertragbarkeit</h3>
              <p className="text-muted-foreground">
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in 
                Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten 
                in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Auskunft, Löschung und Berichtigung</h3>
              <p className="text-muted-foreground">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf 
                unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren 
                Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf 
                Berichtigung oder Löschung dieser Daten.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold mb-4">4. Datenerfassung auf dieser Website</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Cookies</h3>
              <p className="text-muted-foreground">
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete 
                und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend 
                für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf 
                Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch 
                gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese 
                selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Kontaktformular</h3>
              <p className="text-muted-foreground">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus 
                dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks 
                Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. 
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Anfrage per E-Mail, Telefon oder WhatsApp</h3>
              <p className="text-muted-foreground">
                Wenn Sie uns per E-Mail, Telefon oder WhatsApp kontaktieren, wird Ihre Anfrage 
                inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum 
                Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold mb-4">5. Analyse-Tools und Werbung</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Google Analytics</h3>
              <p className="text-muted-foreground">
                Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter 
                ist die Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, 
                Irland. Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der 
                Websitebesucher zu analysieren.
                <br /><br />
                Die Nutzung dieses Dienstes erfolgt nur mit Ihrer Einwilligung, die Sie jederzeit 
                widerrufen können.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold mb-4">6. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="text-muted-foreground">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
                Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen 
                Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt 
                und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Datenschutz;
