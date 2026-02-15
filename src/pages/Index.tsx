import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { FeaturesShowcase } from "@/components/sections/FeaturesShowcase";
import { TemplatesPromo } from "@/components/sections/TemplatesPromo";
import { WhyUs } from "@/components/sections/WhyUs";
import { LocalSEO } from "@/components/sections/LocalSEO";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturesShowcase />
      <TemplatesPromo />
      <WhyUs />
      <LocalSEO />
      <CTASection />
    </Layout>
  );
};

export default Index;
