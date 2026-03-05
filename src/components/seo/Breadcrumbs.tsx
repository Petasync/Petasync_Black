import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BASE_URL = "https://petasync.de";

/** Human-readable labels for URL segments */
const SEGMENT_LABELS: Record<string, string> = {
  services: "Services",
  websites: "Websites",
  templates: "Templates",
  privatkunden: "Privatkunden",
  geschaeftskunden: "Geschäftskunden",
  kontakt: "Kontakt",
  faq: "FAQ",
  impressum: "Impressum",
  datenschutz: "Datenschutz",
  // Service sub-pages
  "pc-reparatur": "PC Reparatur",
  "pc-reinigung": "PC Reinigung",
  "pc-aufruestung": "PC Aufrüstung",
  "pc-zusammenbau": "PC Zusammenbau",
  "leih-pc": "Leih-PC",
  datenrettung: "Datenrettung",
  "it-sicherheit": "IT-Sicherheit",
  netzwerk: "Netzwerk & WLAN",
  "it-business": "IT Business",
  webdesign: "Webdesign",
  "it-infrastruktur": "IT Infrastruktur",
  "it-support": "IT Support",
  beratung: "Beratung",
  diagnose: "Diagnose",
  // Website packages
  template: "Template",
  starter: "Starter",
  business: "Business",
  enterprise: "Enterprise",
  // Template types
  handwerker: "Handwerker",
  versicherung: "Versicherung",
  restaurant: "Restaurant",
  fitness: "Fitness",
  immobilien: "Immobilien",
  fotograf: "Fotograf",
  friseur: "Friseur",
  autowerkstatt: "Autowerkstatt",
};

function getLabel(segment: string): string {
  return SEGMENT_LABELS[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
}

interface BreadcrumbsProps {
  className?: string;
}

export function SEOBreadcrumbs({ className }: BreadcrumbsProps) {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  // Build breadcrumb items with cumulative paths
  const items = segments.map((segment, index) => ({
    label: getLabel(segment),
    path: "/" + segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
  }));

  // Build JSON-LD BreadcrumbList schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: `${BASE_URL}${item.path}`,
      })),
    ],
  };

  return (
    <>
      {/* JSON-LD Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Visible breadcrumb navigation */}
      <Breadcrumb className={className}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.map((item) => (
            <span key={item.path} className="contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.path}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
