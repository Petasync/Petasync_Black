import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StructuredData } from "@/components/seo/StructuredData";
import { SEOBreadcrumbs } from "@/components/seo/Breadcrumbs";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData type="LocalBusiness" />
      <ScrollProgress />
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        {!isHomepage && (
          <div className="container-tight pt-4 pb-2">
            <SEOBreadcrumbs />
          </div>
        )}
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
