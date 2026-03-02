import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, CheckCircle2, MapPin, Clock, Star, Laptop, ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Suspense, useState } from "react";
import { Floating3DScene } from "@/components/3d/Floating3DScene";
import { useSEO } from "@/hooks/useSEO";
import type { CityData } from "@/lib/constants/city-data";

interface CityLandingPageProps {
  city: CityData;
}

export default function CityLandingPage({ city }: CityLandingPageProps) {
  useSEO({
    title: `IT-Service & PC-Reparatur ${city.name} – ab 39€/h | Petasync`,
    description: city.description,
  });

  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: trustRef, isRevealed: trustRevealed } = useScrollReveal();
  const { ref: faqRef, isRevealed: faqRevealed } = useScrollReveal();
  const { ref: ctaRef, isRevealed: ctaRevealed } = useScrollReveal();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      {/* Structured Data for Local Business + City */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `Petasync IT-Service ${city.name}`,
        description: city.description,
        telephone: "+491637117198",
        email: "service@petasync.de",
        url: `https://petasync.de/standorte/${city.slug}`,
        priceRange: "€€",
        areaServed: {
          "@type": "City",
          name: city.name,
          containedInPlace: { "@type": "State", name: "Bayern" },
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: city.coordinates.lat,
          longitude: city.coordinates.lng,
        },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "20:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "18:00" },
        ],
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: city.faq.map(f => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      })}} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <Suspense fallback={null}>
          <Floating3DScene variant="default" className="opacity-30" />
        </Suspense>
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        <div ref={heroRef} className={cn("container-tight relative z-10 py-32 transition-all duration-1000", heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Start</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">{city.name}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              {city.heroTitle}{" "}
              <span className="gradient-text">{city.heroHighlight}</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              {city.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                <Link to="/kontakt">Jetzt anfragen<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                <a href="tel:+491637117198"><Phone className="mr-2 h-4 w-4" />0163 711 7198</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-y border-white/[0.08]">
        <div ref={trustRef} className={cn("container-tight transition-all duration-1000", trustRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Star className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">5.0</div>
              <div className="text-sm text-muted-foreground">Google-Bewertung</div>
            </div>
            <div className="text-center">
              <Laptop className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">Gratis</div>
              <div className="text-sm text-muted-foreground">Leih-PC Service</div>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{city.distance}</div>
              <div className="text-sm text-muted-foreground">Entfernung</div>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">24h</div>
              <div className="text-sm text-muted-foreground">Reaktionszeit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Info Section */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ihr IT-Partner in{" "}<span className="gradient-text">{city.name}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {city.localInfo}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding relative">
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="container-tight relative">
          <div className="divider-glow mb-16" />
          <div ref={servicesRef} className={cn("transition-all duration-1000", servicesRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">Unsere Services in {city.name}</h2>
              <p className="text-muted-foreground">Alle Leistungen mit kostenloser Anfahrt</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {city.services.map((service, index) => (
                <Link
                  key={service.title}
                  to={service.href}
                  className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all hover:scale-[1.02]"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                    <span className="text-sm text-primary font-medium whitespace-nowrap">{service.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Warum Petasync in{" "}<span className="gradient-text">{city.name}</span>?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wir sind nicht irgendein IT-Service. Wir sind Ihr persönlicher IT-Partner mit echtem Vor-Ort-Service in {city.name} und Umgebung.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Kostenloser Leih-PC während der Reparatur",
                "Faire Festpreise ab 39€/h – keine versteckten Kosten",
                "Kostenlose Anfahrt nach " + city.name,
                "Persönlicher Ansprechpartner",
                "5.0 Google-Bewertung – 100% Kundenzufriedenheit",
                "Mo-Fr 8-20 Uhr, Sa 10-18 Uhr erreichbar",
              ].map((usp, index) => (
                <div key={index} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{usp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {city.faq.length > 0 && (
        <section className="section-padding relative">
          <div className="container-tight">
            <div className="divider-glow mb-16" />
            <div ref={faqRef} className={cn("max-w-3xl mx-auto transition-all duration-1000", faqRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold gradient-text mb-4">Häufige Fragen – {city.name}</h2>
                <p className="text-muted-foreground">Alles über unseren Service in {city.name}</p>
              </div>

              <div className="space-y-4">
                {city.faq.map((item, index) => (
                  <div key={index} className="border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="font-medium text-foreground pr-4">{item.question}</span>
                      <ChevronDown className={cn("w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform", openFaq === index && "rotate-180")} />
                    </button>
                    <div className={cn("overflow-hidden transition-all duration-300", openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                      <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Nearby Areas */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="divider-glow mb-16" />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Auch in der Nähe von {city.name}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {city.nearbyAreas.map((area) => (
                <span key={area} className="text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div ref={ctaRef} className={cn("relative py-16 px-8 md:px-16 rounded-3xl overflow-hidden transition-all duration-1000", ctaRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="relative text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">IT-Hilfe in {city.name} gesucht?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Rufen Sie uns an oder schreiben Sie uns. Wir melden uns schnellstmöglich bei Ihnen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full" asChild>
                  <Link to="/kontakt">Jetzt anfragen<ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/5" asChild>
                  <a href="tel:+491637117198"><Phone className="mr-2 h-4 w-4" />Anrufen</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
