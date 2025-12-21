import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { LeihPCHighlight } from "@/components/sections/LeihPCHighlight";
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
          "name": "Petasync IT-Service",
          "description": "Professioneller IT-Service für Privat- und Geschäftskunden in Dietenhofen, Ansbach, Nürnberg und Umgebung. PC-Reparatur, Netzwerk, Webdesign.",
          "url": "https://petasync.de",
          "telephone": "+4991611234567",
          "email": "info@petasync.de",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dietenhofen",
            "addressRegion": "Bayern",
            "addressCountry": "DE"
          },
          "areaServed": [
            { "@type": "City", "name": "Dietenhofen" },
            { "@type": "City", "name": "Ansbach" },
            { "@type": "City", "name": "Nürnberg" },
            { "@type": "City", "name": "Neustadt an der Aisch" },
            { "@type": "City", "name": "Oberasbach" }
          ],
          "priceRange": "€€",
          "openingHours": "Mo-Fr 09:00-18:00"
        })
      }} />

      <Hero />
      <Services />
      <LeihPCHighlight />
      <WhyUs />
      <LocalSEO />
      <CTASection />
    </Layout>
  );
};

export default Index;
