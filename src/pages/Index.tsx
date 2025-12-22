import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { FeaturesShowcase } from "@/components/sections/FeaturesShowcase";
import { WhyUs } from "@/components/sections/WhyUs";
import { LocalSEO } from "@/components/sections/LocalSEO";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <Layout>
      {/* SEO Meta - Local Business Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "PetaSync IT-Service",
          "description": "Professioneller IT-Service für Privat- und Geschäftskunden in Ansbach, Nürnberg, Fürth und Umgebung. PC-Reparatur, Netzwerk, Webdesign.",
          "url": "https://petasync.de",
          "telephone": "+491637117198",
          "email": "service@petasync.de",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Mobil vor Ort",
            "addressLocality": "Ansbach / Oberasbach",
            "addressRegion": "Bayern",
            "addressCountry": "DE"
          },
          "areaServed": [
            { "@type": "City", "name": "Ansbach" },
            { "@type": "City", "name": "Oberasbach" },
            { "@type": "City", "name": "Nürnberg" },
            { "@type": "City", "name": "Fürth" },
            { "@type": "City", "name": "Erlangen" }
          ],
          "priceRange": "€€",
          "openingHours": "Mo-Fr 09:00-19:00"
        })
      }} />

      <Hero />
      <FeaturesShowcase />
      <WhyUs />
      <LocalSEO />
      <CTASection />
    </Layout>
  );
};

export default Index;
