import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { Schnellwahl } from "@/components/sections/Schnellwahl";
import { FeaturesShowcase } from "@/components/sections/FeaturesShowcase";
import { WhyUs } from "@/components/sections/WhyUs";
import { LocalSEO } from "@/components/sections/LocalSEO";
import { CTASection } from "@/components/sections/CTASection";
import { useSEO, SEO_PAGES } from "@/hooks/useSEO";

const Index = () => {
  useSEO(SEO_PAGES.homepage);

  return (
    <Layout>
      <Hero />
      <Schnellwahl />
      <FeaturesShowcase />
      <WhyUs />
      <LocalSEO />
      <CTASection />
    </Layout>
  );
};

export default Index;
