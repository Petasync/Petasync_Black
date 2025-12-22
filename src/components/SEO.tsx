import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  noIndex?: boolean;
}

/**
 * SEO Component for managing document head meta tags
 * Optimized for performance - only updates when props change
 */
export function SEO({
  title,
  description,
  keywords,
  canonical,
  noIndex = false
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update or create meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    // Update or create canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    }

    // Update or create robots meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", noIndex ? "noindex, nofollow" : "index, follow");

    // Open Graph tags for social sharing
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "de_DE" },
    ];

    ogTags.forEach(({ property, content }) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement("meta");
        ogTag.setAttribute("property", property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute("content", content);
    });

    // Cleanup function
    return () => {
      // Optionally clean up meta tags when component unmounts
      // Usually not needed as they get overwritten by next page
    };
  }, [title, description, keywords, canonical, noIndex]);

  return null; // This component doesn't render anything
}

// Pre-defined SEO configurations for common pages
export const seoConfig = {
  home: {
    title: "PetaSync IT-Service | PC Reparatur & IT-Lösungen in Ansbach",
    description: "Ihr lokaler IT-Partner in Ansbach & Nürnberg. PC-Reparatur, Leih-PC Service, Webdesign und IT-Support für Privat- und Geschäftskunden. Kostenlose Diagnose!",
    keywords: "IT-Service Ansbach, PC Reparatur Nürnberg, Computer Hilfe, Webdesign, IT-Support"
  },
  privatkunden: {
    title: "IT-Service für Privatkunden | PC Reparatur & Diagnose | PetaSync",
    description: "PC-Probleme? Wir helfen! Kostenlose Diagnose, PC-Reparatur, Datenrettung, PC-Zusammenbau und Leih-PC Service in Ansbach und Umgebung.",
    keywords: "PC Reparatur privat, Computer Hilfe, Laptop Reparatur, Datenrettung, Virenentfernung"
  },
  geschaeftskunden: {
    title: "IT-Lösungen für Unternehmen | Managed IT & Support | PetaSync",
    description: "Professionelle IT-Betreuung für KMU in Ansbach & Nürnberg. Managed IT, IT-Support, Netzwerke und IT-Sicherheit. Persönlich und zuverlässig.",
    keywords: "IT-Service Unternehmen, Managed IT, IT-Support Business, Netzwerk Einrichtung, IT-Sicherheit"
  },
  websites: {
    title: "Webdesign & Websites | Modern & SEO-optimiert | PetaSync",
    description: "Professionelle Websites für Ihr Unternehmen. Responsive Design, SEO-optimiert, schnelle Ladezeiten. Von der Visitenkarte bis zum Online-Shop.",
    keywords: "Webdesign Ansbach, Website erstellen, Homepage, SEO, Online-Shop"
  },
  kontakt: {
    title: "Kontakt | IT-Service Anfrage | PetaSync Ansbach",
    description: "Kontaktieren Sie uns für IT-Support, PC-Reparatur oder Webdesign. Schnelle Antwort, kostenlose Erstberatung. Tel: +49 163 711 7198",
    keywords: "Kontakt IT-Service, PC Hilfe anfordern, IT Beratung"
  },
  faq: {
    title: "FAQ | Häufige Fragen & PC-Problemlösungen | PetaSync",
    description: "Antworten auf häufige IT-Fragen. PC startet nicht? Schwarzer Bildschirm? Hier finden Sie Lösungen und Tipps für typische Computer-Probleme.",
    keywords: "PC Probleme lösen, Computer FAQ, schwarzer Bildschirm, PC startet nicht, Bluescreen"
  }
};
