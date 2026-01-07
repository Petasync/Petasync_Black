import { Helmet } from 'react-helmet-async';

/**
 * Structured Data Component
 * Adds JSON-LD structured data for better SEO
 */

interface StructuredDataProps {
  type?: 'LocalBusiness' | 'Service' | 'WebPage' | 'Article';
  customData?: Record<string, any>;
}

export function StructuredData({ type = 'LocalBusiness', customData }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = 'https://petasync.de';

    // Local Business Schema (for homepage and main pages)
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#organization`,
      "name": "Petasync",
      "description": "Professioneller IT-Service für Privat- und Geschäftskunden in Ansbach, Nürnberg und Umgebung. PC-Reparatur, IT-Support, Webdesign und mehr.",
      "url": baseUrl,
      "telephone": "+491637117198",
      "email": "service@petasync.de",
      "priceRange": "€€",
      "image": `${baseUrl}/og-image.png`,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.svg`,
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
        {
          "@type": "City",
          "name": "Ansbach"
        },
        {
          "@type": "City",
          "name": "Oberasbach"
        },
        {
          "@type": "City",
          "name": "Nürnberg"
        },
        {
          "@type": "City",
          "name": "Fürth"
        },
        {
          "@type": "City",
          "name": "Erlangen"
        }
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
      "sameAs": [
        // Add social media profiles here when available
        // "https://www.facebook.com/petasync",
        // "https://www.instagram.com/petasync",
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
              "description": "Professionelle Reparatur von Computern und Laptops"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Leih-PC Service",
              "description": "Kostenloser Leih-PC während der Reparatur"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "IT-Sicherheit",
              "description": "Virenschutz, Datensicherung und Cyber-Schutz"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Netzwerk & WLAN",
              "description": "Einrichtung und Optimierung von Heimnetzwerken"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "IT für Unternehmen",
              "description": "Professionelle IT-Infrastruktur und Support"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Webdesign",
              "description": "Moderne, responsive Websites"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "500",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    // Organization Schema (for brand identity)
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "Petasync",
      "url": baseUrl,
      "logo": `${baseUrl}/favicon.svg`,
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
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "Petasync - IT-Service & PC-Reparatur",
      "description": "Professioneller IT-Service für Privat- und Geschäftskunden",
      "publisher": {
        "@id": `${baseUrl}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/?s={search_term_string}`
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
          "item": baseUrl
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
      default:
        return [localBusinessSchema, organizationSchema];
    }
  };

  const structuredData = getStructuredData();

  return (
    <Helmet>
      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
