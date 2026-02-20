/**
 * Structured Data Component
 * Adds JSON-LD structured data for better SEO
 * Renders <script> tags directly (no react-helmet-async needed —
 * JSON-LD is valid anywhere in the document, not just <head>).
 */

interface StructuredDataProps {
  type?: 'LocalBusiness' | 'Service' | 'WebPage' | 'Article' | 'FAQPage';
  customData?: Record<string, any>;
}

const BASE_URL = 'https://petasync.de';

export function StructuredData({ type = 'LocalBusiness', customData }: StructuredDataProps) {
  const getStructuredData = () => {

    // Local Business Schema (for homepage and main pages)
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#organization`,
      "name": "Petasync",
      "description": "Professioneller IT-Service für Privat- und Geschäftskunden in Ansbach, Nürnberg und Umgebung. PC-Reparatur, IT-Support, Webdesign und mehr.",
      "url": BASE_URL,
      "telephone": "+491637117198",
      "email": "service@petasync.de",
      "priceRange": "€€",
      "image": `${BASE_URL}/og-image.png`,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/favicon.svg`,
        "width": "512",
        "height": "512"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ansbach",
        "addressRegion": "Bayern",
        "addressCountry": "DE",
        "streetAddress": "Mobil vor Ort"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "49.3006",
        "longitude": "10.5783"
      },
      "areaServed": [
        { "@type": "City", "name": "Ansbach" },
        { "@type": "City", "name": "Oberasbach" },
        { "@type": "City", "name": "Nürnberg" },
        { "@type": "City", "name": "Fürth" },
        { "@type": "City", "name": "Erlangen" },
        { "@type": "City", "name": "Dietenhofen" },
        { "@type": "City", "name": "Neustadt an der Aisch" }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "10:00",
          "closes": "18:00"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "IT Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "PC & Laptop Reparatur",
              "description": "Professionelle Reparatur von Computern und Laptops aller Marken",
              "url": `${BASE_URL}/services/pc-reparatur`
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "29",
              "minPrice": "29",
              "maxPrice": "149",
              "priceCurrency": "EUR"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Leih-PC Service",
              "description": "Kostenloser Leih-PC während der Reparatur",
              "url": `${BASE_URL}/services/leih-pc`
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "0",
              "priceCurrency": "EUR"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Datenrettung",
              "description": "Professionelle Datenrettung von defekten Speichermedien",
              "url": `${BASE_URL}/services/datenrettung`
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "minPrice": "39",
              "maxPrice": "199",
              "priceCurrency": "EUR"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "IT-Sicherheit & Virenentfernung",
              "description": "Virenschutz, Firewall-Setup und Cyber-Schutz",
              "url": `${BASE_URL}/services/it-sicherheit`
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "minPrice": "45",
              "maxPrice": "89",
              "priceCurrency": "EUR"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "PC Reinigung & Wartung",
              "description": "Professionelle PC-Reinigung für bessere Leistung",
              "url": `${BASE_URL}/services/pc-reinigung`
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "minPrice": "25",
              "maxPrice": "69",
              "priceCurrency": "EUR"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Netzwerk & WLAN",
              "description": "Einrichtung und Optimierung von Netzwerken",
              "url": `${BASE_URL}/services/netzwerk`
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "minPrice": "45",
              "priceCurrency": "EUR"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "IT-Support für Unternehmen",
              "description": "Professioneller IT-Support mit Helpdesk",
              "url": `${BASE_URL}/services/it-support`
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "minPrice": "99",
              "priceCurrency": "EUR",
              "unitText": "MONTH"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Webdesign",
              "description": "Moderne, responsive Websites für Unternehmen",
              "url": `${BASE_URL}/websites`
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "minPrice": "490",
              "maxPrice": "3990",
              "priceCurrency": "EUR"
            }
          }
        ]
      }
    };

    // Organization Schema (for brand identity)
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "Petasync",
      "url": BASE_URL,
      "logo": `${BASE_URL}/favicon.svg`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+491637117198",
        "contactType": "customer service",
        "email": "service@petasync.de",
        "areaServed": "DE",
        "availableLanguage": "German"
      }
    };

    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "Petasync - IT-Service & PC-Reparatur Ansbach & Nürnberg",
      "description": "Professioneller IT-Service für Privat- und Geschäftskunden in Ansbach, Nürnberg und Umgebung",
      "publisher": {
        "@id": `${BASE_URL}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/?s={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Breadcrumb Schema (for navigation)
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": BASE_URL
        }
      ]
    };

    switch (type) {
      case 'LocalBusiness':
        return [localBusinessSchema, organizationSchema, websiteSchema];
      case 'Service':
        return [organizationSchema, customData || {}];
      case 'WebPage':
        return [organizationSchema, breadcrumbSchema, customData || {}];
      case 'FAQPage':
        return [organizationSchema, customData || {}];
      default:
        return [localBusinessSchema, organizationSchema];
    }
  };

  const structuredData = getStructuredData();

  return (
    <div data-structured-data style={{display:'none'}}>
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </div>
  );
}
