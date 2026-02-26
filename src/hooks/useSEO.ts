import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
}

const BASE_URL = "https://petasync.de";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;
const BRAND = "Petasync";

/**
 * Sets per-page SEO meta tags: title, description, canonical, Open Graph.
 * Updates document.title and meta tags in <head> on every route change.
 */
export function useSEO(config: SEOConfig) {
  const location = useLocation();

  useEffect(() => {
    // Title
    document.title = config.title;

    // Helper: set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper: set or create a link tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Meta description
    setMeta("name", "description", config.description);

    // Canonical URL
    const canonicalUrl = config.canonical || `${BASE_URL}${location.pathname}`;
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", config.ogTitle || config.title);
    setMeta("property", "og:description", config.ogDescription || config.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", config.ogType || "website");
    setMeta("property", "og:image", config.ogImage || DEFAULT_OG_IMAGE);

    // Twitter Card
    setMeta("name", "twitter:title", config.ogTitle || config.title);
    setMeta("name", "twitter:description", config.ogDescription || config.description);

    // Geo meta tags for local SEO
    setMeta("name", "geo.region", "DE-BY");
    setMeta("name", "geo.placename", "Ansbach");
    setMeta("name", "geo.position", "49.3006;10.5783");
    setMeta("name", "ICBM", "49.3006, 10.5783");

    // Robots
    if (config.noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      // Remove noindex if it was previously set
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta && robotsMeta.getAttribute("content")?.includes("noindex")) {
        robotsMeta.setAttribute("content", "index, follow");
      }
    }
  }, [config.title, config.description, config.canonical, config.ogTitle, config.ogDescription, config.ogType, config.ogImage, config.noindex, location.pathname]);
}

/**
 * Pre-configured SEO data for all pages.
 * Usage: useSEO(SEO_PAGES.homepage) in the page component.
 */
export const SEO_PAGES = {
  homepage: {
    title: `${BRAND} – IT-Service & PC-Reparatur Ansbach & Nürnberg`,
    description: "Professioneller IT-Service in Ansbach & Nürnberg. PC-Reparatur, IT-Support, Webdesign. Kostenloser Leih-PC. Faire Festpreise. Jetzt anfragen!",
  },
  privatkunden: {
    title: `PC-Reparatur & IT-Service für Privatkunden | ${BRAND} Ansbach`,
    description: "PC-Reparatur ab 39€/h. Kostenlose Diagnose bei Reparatur. Leih-PC gratis. Datenrettung, Virenentfernung, WLAN-Setup in Ansbach & Nürnberg.",
  },
  geschaeftskunden: {
    title: `IT-Service für Unternehmen – ${BRAND} Ansbach`,
    description: "Zuverlässige IT-Betreuung für KMU. Managed Services ab 35€/User, IT-Support, Netzwerk & Cloud. Ihr lokaler IT-Partner.",
  },
  websites: {
    title: `Webdesign Ansbach & Nürnberg – ab 490€ | ${BRAND}`,
    description: "Professionelle Websites ab 490€. Template, Starter, Business oder Enterprise. Festpreise, SEO inklusive, mobil-optimiert.",
  },
  kontakt: {
    title: `Kontakt & Termin – ${BRAND} IT-Service`,
    description: "Kontaktieren Sie uns: Tel. 0163 711 7198. Mo-Fr 8-20 Uhr, Sa 10-18 Uhr. Kostenlose Erstberatung. Ansbach & Nürnberg.",
  },
  faq: {
    title: `Häufige Fragen zu IT-Service & Reparatur | ${BRAND}`,
    description: "Antworten auf die häufigsten Fragen: Kosten, Dauer, Leih-PC, Webdesign, Hausbesuche. Alles über unseren IT-Service.",
  },
  impressum: {
    title: `Impressum | ${BRAND}`,
    description: "Impressum und rechtliche Angaben von Petasync IT-Service.",
    noindex: true,
  },
  datenschutz: {
    title: `Datenschutzerklärung | ${BRAND}`,
    description: "Datenschutzerklärung von Petasync IT-Service. Informationen zur Datenverarbeitung.",
    noindex: true,
  },
  // Service pages
  diagnose: {
    title: `Kostenlose PC-Diagnose | ${BRAND} Ansbach`,
    description: "Kostenlose PC-Diagnose bei Reparaturauftrag. Hardware-Check, Software-Analyse, Fehlerprotokoll. Schnell & zuverlässig.",
  },
  pcReinigung: {
    title: `PC Reinigung & Wartung ab 25€ | ${BRAND}`,
    description: "Professionelle PC-Reinigung ab 25€. Staub entfernen, Wärmeleitpaste erneuern, Leistung optimieren. In Ansbach & Umgebung.",
  },
  pcReparatur: {
    title: `PC & Laptop Reparatur Ansbach – ab 29€ | ${BRAND}`,
    description: "Schnelle PC-Reparatur in Ansbach & Umgebung. Festpreise ab 29€. Kostenlose Diagnose bei Auftrag. Leih-PC gratis.",
  },
  datenrettung: {
    title: `Datenrettung Ansbach – Professionell ab 89€ | ${BRAND}`,
    description: "Daten verloren? Professionelle Datenrettung ab 89€. HDD, SSD, USB. Kostenlose Analyse. Schnelle Hilfe in Ansbach & Nürnberg.",
  },
  itSicherheit: {
    title: `Virenentfernung & IT-Sicherheit ab 45€ | ${BRAND}`,
    description: "Virus auf dem PC? Professionelle Virenentfernung ab 45€. Firewall, Antivirus, Backup-Einrichtung. Sofortige Hilfe.",
  },
  pcAufruestung: {
    title: `PC-Aufrüstung & Upgrade ab 25€ | ${BRAND}`,
    description: "SSD, RAM, GPU Upgrade ab 25€ Einbau. Mehr Leistung für Ihren PC. Beratung, Einbau & Test inklusive.",
  },
  netzwerk: {
    title: `Netzwerk & WLAN Einrichtung – ${BRAND} Ansbach`,
    description: "Enterprise-WLAN, VPN, strukturierte Verkabelung. Netzwerk-Setup ab 299€. Professionelle Planung & Installation.",
  },
  pcZusammenbau: {
    title: `Gaming-PC & Workstation Zusammenbau | ${BRAND}`,
    description: "Individueller PC-Zusammenbau ab 69€. Gaming, Office, Workstation. Professionelle Beratung & 12 Monate Garantie.",
  },
  leihPc: {
    title: `Kostenloser Leih-PC bei Reparatur | ${BRAND}`,
    description: "Einzigartiger Service: Kostenloser Leih-PC während Ihrer Reparatur. Keine Ausfallzeit. Daten-Transfer inklusive.",
  },
  itSupport: {
    title: `IT-Support für Unternehmen ab 99€/Monat | ${BRAND}`,
    description: "Professioneller IT-Support mit Helpdesk. Remote & Vor-Ort. SLA bis 2h. Flexibel ab 99€/Monat. Jetzt IT-Check anfragen.",
  },
  itInfrastruktur: {
    title: `IT-Infrastruktur & Managed Services | ${BRAND}`,
    description: "Server, Netzwerk, Cloud für Unternehmen. Managed Workplace ab 35€/User/Monat. Alles aus einer Hand.",
  },
  itBusiness: {
    title: `IT-Lösungen für Unternehmen | ${BRAND} Ansbach`,
    description: "Professionelle IT-Betreuung für Unternehmen. Infrastruktur, Sicherheit, Support & Beratung. Ihr lokaler IT-Partner.",
  },
  beratung: {
    title: `IT-Beratung & Strategie für Unternehmen | ${BRAND}`,
    description: "Strategische IT-Beratung: Digitalisierung, DSGVO, IT-Audit. Workshop 499€/Tag oder 89€/h. Praxisnah & herstellerunabhängig.",
  },
  webdesign: {
    title: `Webdesign & Entwicklung | ${BRAND} Ansbach`,
    description: "Moderne Websites für Unternehmen. Individuelles Design, SEO, CMS. Von der Visitenkarte bis zum Online-Shop.",
  },
  // Website packages
  websiteTemplate: {
    title: `Template-Website ab 490€ – in 5-7 Tagen online | ${BRAND}`,
    description: "Günstige Template-Website ab 490€. Professionelles Design, 5 Seiten, mobil-optimiert. In nur 5-7 Tagen online.",
  },
  websiteStarter: {
    title: `Individuelle Website ab 990€ | ${BRAND}`,
    description: "Ihr maßgeschneiderter Webauftritt ab 990€. Individuelles Design, SEO, 1 Monat Support. Ideal für Selbständige.",
  },
  websiteBusiness: {
    title: `Business-Website mit CMS ab 1.990€ | ${BRAND}`,
    description: "Premium Website ab 1.990€. CMS, Blog, erweiterte SEO, 10 Seiten. 3 Monate Support. Für wachsende Unternehmen.",
  },
  websiteEnterprise: {
    title: `Enterprise-Website & Online-Shop | ${BRAND}`,
    description: "Maßgeschneiderte Weblösungen ab 3.990€. E-Commerce, API, unbegrenzte Seiten. 12 Monate Support.",
  },
  // Templates Showcase
  templatesShowcase: {
    title: `Website-Templates & Branchen-Demos | ${BRAND}`,
    description: "Professionelle Website-Templates für Handwerker, Restaurants, Friseure, Fitness, Immobilien & mehr. Live-Demos ansehen. Ab 490€.",
  },
  // Template Main Pages
  handwerkerTemplate: {
    title: `Handwerker-Website Template – Demo | ${BRAND} Webdesign`,
    description: "Live-Demo: Professionelle Handwerker-Website mit 3D-Effekten, Online-Terminbuchung, Kostenrechner. Für Elektriker, Klempner, Schreiner.",
  },
  versicherungTemplate: {
    title: `Versicherungsberater-Website Template – Demo | ${BRAND}`,
    description: "Live-Demo: Seriöse Versicherungsberater-Website mit Rechner, PDF-Ratgeber, Video-Testimonials. Modern & vertrauensvoll.",
  },
  restaurantTemplate: {
    title: `Restaurant-Website Template – Demo | ${BRAND} Webdesign`,
    description: "Live-Demo: Elegante Restaurant-Website mit Online-Reservierung, Speisekarte, Instagram-Feed. Für Gastronomie & Cafés.",
  },
  fitnessTemplate: {
    title: `Fitness-Studio Website Template – Demo | ${BRAND}`,
    description: "Live-Demo: Energiegeladene Fitness-Website mit Kursplan, Online-Anmeldung, BMI-Rechner. Für Gyms & Personal Trainer.",
  },
  immobilienTemplate: {
    title: `Immobilien-Website Template – Demo | ${BRAND} Webdesign`,
    description: "Live-Demo: Luxuriöse Immobilien-Website mit 3D-Grundriss, Objektsuche, virtuellen Rundgängen. Für Makler & Hausverwaltungen.",
  },
  fotografTemplate: {
    title: `Fotograf-Website Template – Demo | ${BRAND}`,
    description: "Live-Demo: Kreative Fotograf-Website mit Portfolio-Galerie, Lightbox, Buchungssystem. Für Fotografen & Kreative.",
  },
  friseurTemplate: {
    title: `Friseur-Website Template – Demo | ${BRAND} Webdesign`,
    description: "Live-Demo: Stylische Friseur-Website mit Online-Buchung, Galerie, Preisliste. Für Salons & Beauty-Studios.",
  },
  autowerkstattTemplate: {
    title: `Autowerkstatt-Website Template – Demo | ${BRAND}`,
    description: "Live-Demo: Professionelle Autowerkstatt-Website mit Preisrechner, TÜV-Erinnerung, Online-Termin. Für KFZ-Werkstätten.",
  },
} as const;

/**
 * Generate noindex SEO config for template sub-pages (demo content).
 * These pages exist as showcases, not as indexable content.
 */
export function templateSubpageSEO(templateName: string, pageName: string): SEOConfig {
  return {
    title: `${pageName} – ${templateName} Template Demo | ${BRAND}`,
    description: `Demo-Seite: ${pageName} der ${templateName}-Website-Vorlage von ${BRAND} Webdesign.`,
    noindex: true,
  };
}
