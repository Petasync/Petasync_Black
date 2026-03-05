import { Layout } from "@/components/layout/Layout";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import faqHero from "@/assets/faq-hero.png";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";
import { StructuredData } from "@/components/seo/StructuredData";

const faqCategories = [
  {
    title: "Allgemein",
    questions: [
      {
        question: "In welchem Gebiet sind Sie tätig?",
        answer: "Wir bieten unsere IT-Services in Dietenhofen und der gesamten Region an, inklusive Ansbach, Nürnberg, Neustadt an der Aisch, Oberasbach und weiteren Orten im Umkreis von ca. 50 km. Für Webdesign-Projekte arbeiten wir auch deutschlandweit."
      },
      {
        question: "Bieten Sie auch Hausbesuche an?",
        answer: "Ja! Wir kommen gerne zu Ihnen nach Hause oder in Ihr Büro. Vor-Ort-Service ist einer unserer Kernvorteile – besonders für Kunden, die ihr Gerät nicht transportieren können oder möchten."
      },
      {
        question: "Wie schnell können Sie helfen?",
        answer: "In dringenden Fällen versuchen wir, noch am selben Tag zu helfen. Reguläre Termine können meist innerhalb von 1-3 Werktagen vereinbart werden. Bei akuten Problemen rufen Sie uns einfach an!"
      },
      {
        question: "Wie kann ich Sie am besten erreichen?",
        answer: "Sie erreichen uns telefonisch, per E-Mail, über WhatsApp oder über unser Kontaktformular. Wir antworten in der Regel innerhalb weniger Stunden."
      }
    ]
  },
  {
    title: "Leih-PC Service",
    questions: [
      {
        question: "Was ist der Leih-PC Service?",
        answer: "Unser einzigartiger Service: Wenn Ihr PC zur Reparatur muss, erhalten Sie kostenlos einen Ersatz-PC. So können Sie ohne Unterbrechung weiterarbeiten, während wir Ihr Gerät reparieren."
      },
      {
        question: "Ist der Leih-PC wirklich kostenlos?",
        answer: "Ja, der Leih-PC ist bei Reparaturaufträgen für Privatkunden komplett kostenlos. Sie zahlen nur die eigentliche Reparatur."
      },
      {
        question: "Wie funktioniert die Datenübertragung?",
        answer: "Auf Wunsch übertragen wir Ihre wichtigsten Daten und Programme auf den Leih-PC, sodass Sie sofort weiterarbeiten können. Nach der Reparatur übertragen wir alles zurück."
      },
      {
        question: "Wie lange kann ich den Leih-PC behalten?",
        answer: "So lange Ihr Gerät bei uns in Reparatur ist. Bei längeren Reparaturen halten wir Sie natürlich auf dem Laufenden."
      }
    ]
  },
  {
    title: "PC-Reparatur & Service",
    questions: [
      {
        question: "Welche Geräte reparieren Sie?",
        answer: "Wir reparieren Desktop-PCs, Laptops, Notebooks und auch Mac-Geräte. Von Hardware-Defekten über Software-Probleme bis hin zu Virenentfernung – wir helfen bei allen IT-Problemen."
      },
      {
        question: "Was kostet eine Reparatur?",
        answer: "Die Kosten hängen vom Problem ab. Wir erstellen immer zuerst einen kostenlosen Kostenvoranschlag, bevor wir mit der Reparatur beginnen. So gibt es keine bösen Überraschungen."
      },
      {
        question: "Können Sie auch Daten retten?",
        answer: "Ja, Datenrettung ist eine unserer Spezialitäten. Ob defekte Festplatte, versehentlich gelöschte Dateien oder Systemabsturz – wir versuchen alles, um Ihre Daten zu retten."
      },
      {
        question: "Installieren Sie auch neue Hardware?",
        answer: "Selbstverständlich! Ob neue SSD, mehr RAM, eine neue Grafikkarte oder ein komplettes Upgrade – wir beraten Sie und führen den Einbau fachgerecht durch."
      }
    ]
  },
  {
    title: "Webdesign",
    questions: [
      {
        question: "Was kostet eine professionelle Website?",
        answer: "Die Kosten richten sich nach Umfang und Anforderungen. Eine einfache Unternehmenswebsite beginnt bei wenigen hundert Euro, komplexere Projekte mit Shop-Funktionen kosten entsprechend mehr. Wir erstellen Ihnen gerne ein individuelles Angebot."
      },
      {
        question: "Wie lange dauert die Erstellung einer Website?",
        answer: "Eine Standard-Website ist in 2-4 Wochen fertig. Komplexere Projekte können 6-8 Wochen dauern. Den genauen Zeitplan besprechen wir im Erstgespräch."
      },
      {
        question: "Kann ich die Website selbst bearbeiten?",
        answer: "Ja! Auf Wunsch richten wir ein Content-Management-System (CMS) ein, mit dem Sie Texte und Bilder selbst ändern können. Wir schulen Sie natürlich auch in der Bedienung."
      },
      {
        question: "Kümmern Sie sich auch um Hosting und Domain?",
        answer: "Ja, wir bieten Komplettlösungen an. Wir können Hosting und Domain für Sie einrichten und verwalten, sodass Sie sich um nichts kümmern müssen."
      }
    ]
  },
  {
    title: "Geschäftskunden",
    questions: [
      {
        question: "Bieten Sie auch IT-Support für Unternehmen an?",
        answer: "Ja! Wir bieten maßgeschneiderte IT-Lösungen für Unternehmen jeder Größe. Von der Einrichtung und Wartung Ihrer IT-Infrastruktur bis hin zum regelmäßigen Support."
      },
      {
        question: "Gibt es Wartungsverträge?",
        answer: "Ja, wir bieten flexible Wartungsverträge an. Diese beinhalten regelmäßige Systemchecks, Updates, Backups und priorisierten Support. Die Konditionen passen wir an Ihre Bedürfnisse an."
      },
      {
        question: "Können Sie unser Netzwerk einrichten?",
        answer: "Absolut! Wir planen, installieren und warten Netzwerke für Unternehmen. Von der Verkabelung über WLAN bis hin zu Servern und Firewalls."
      }
    ]
  }
];

export default function FAQ() {
  useSEO(SEO_PAGES.faq);
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();

  // Build FAQ schema from all categories
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(category =>
      category.questions.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  };

  return (
    <Layout>
      <StructuredData type="FAQPage" customData={faqSchemaData} />
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={faqHero}
            alt="Häufig gestellte Fragen zu IT-Services"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        
        {/* 3D Scene */}
        <Suspense fallback={null}>
          <Floating3DScene variant="minimal" className="opacity-40" />
        </Suspense>
        
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div 
          ref={heroRef}
          className={cn(
            "container-tight relative z-10 py-24 transition-all duration-1000",
            heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-6 block">
              Häufig gestellte Fragen
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              Wie können wir{" "}
              <span className="gradient-text">helfen?</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section-padding">
        <div className="container-tight max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sm font-medium">
                  {categoryIndex + 1}
                </span>
                <h2 className="text-2xl font-bold">{category.title}</h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${categoryIndex}-${faqIndex}`}
                    className="border-b border-white/5 last:border-0"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6 text-foreground">
                      <span className="font-medium pr-4">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            
            <div className="relative">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Ihre Frage war nicht dabei?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Kein Problem! Kontaktieren Sie uns direkt – wir helfen Ihnen gerne persönlich weiter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt">
                    Kontakt aufnehmen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                  <a href="https://wa.me/491637117198" target="_blank" rel="noopener noreferrer">
                    WhatsApp schreiben
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
