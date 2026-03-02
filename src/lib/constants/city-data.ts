import { type LucideIcon, Monitor, Wrench, Shield, Globe, Building2, Laptop, HardDrive, Wifi } from "lucide-react";

export interface CityData {
  slug: string;
  name: string;
  region: string;
  distance: string;
  population: string;
  coordinates: { lat: string; lng: string };
  description: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  localInfo: string;
  services: {
    icon: LucideIcon;
    title: string;
    description: string;
    price: string;
    href: string;
  }[];
  faq: { question: string; answer: string }[];
  nearbyAreas: string[];
}

export const CITY_DATA: Record<string, CityData> = {
  nuernberg: {
    slug: "nuernberg",
    name: "Nürnberg",
    region: "Mittelfranken",
    distance: "~40 km",
    population: "520.000+",
    coordinates: { lat: "49.4521", lng: "11.0767" },
    description:
      "Professioneller IT-Service und PC-Reparatur in Nürnberg. Vor-Ort-Service, Leih-PC kostenlos, faire Festpreise. Ihr lokaler IT-Partner für Privat- und Geschäftskunden in Nürnberg.",
    heroTitle: "IT-Service & PC-Reparatur",
    heroHighlight: "Nürnberg",
    heroSubtitle:
      "Schnelle PC-Hilfe direkt in Nürnberg. Vor-Ort-Reparatur, kostenloser Leih-PC, faire Preise ab 39€/h. Wir sind Ihr lokaler IT-Partner in Nürnberg und Umgebung.",
    localInfo:
      "Als IT-Dienstleister betreuen wir zahlreiche Privat- und Geschäftskunden in Nürnberg – von der Altstadt über Gostenhof bis nach Langwasser. Unser mobiler Service kommt direkt zu Ihnen.",
    services: [
      { icon: Monitor, title: "PC & Laptop Reparatur", description: "Schnelle Reparatur aller Marken. Display, Mainboard, Akku – vor Ort in Nürnberg.", price: "ab 39€/h", href: "/services/pc-reparatur" },
      { icon: Shield, title: "Virenentfernung & IT-Sicherheit", description: "Schadsoftware entfernen, Firewall einrichten, Systeme absichern.", price: "ab 45€", href: "/services/it-sicherheit" },
      { icon: HardDrive, title: "Datenrettung", description: "Professionelle Datenrettung von HDD, SSD und USB-Medien.", price: "ab 89€", href: "/services/datenrettung" },
      { icon: Wifi, title: "Netzwerk & WLAN", description: "WLAN-Optimierung, Router-Setup, Netzwerk-Einrichtung für Nürnberger Haushalte und Unternehmen.", price: "ab 45€", href: "/services/netzwerk" },
      { icon: Building2, title: "IT für Unternehmen", description: "Managed Services, IT-Support und Infrastruktur für Nürnberger Betriebe.", price: "ab 149€/Monat", href: "/geschaeftskunden" },
      { icon: Globe, title: "Webdesign", description: "Professionelle Websites für Nürnberger Unternehmen. SEO inklusive.", price: "ab 490€", href: "/websites" },
    ],
    faq: [
      { question: "Wie schnell sind Sie in Nürnberg vor Ort?", answer: "In der Regel innerhalb von 24 Stunden. Bei Notfällen oft noch am selben Tag. Wir decken ganz Nürnberg und Umgebung ab." },
      { question: "Gibt es einen Aufpreis für den Service in Nürnberg?", answer: "Nein. Anfahrt innerhalb unseres Servicegebiets (50km Radius) ist kostenfrei. Nürnberg liegt voll in unserem Einsatzgebiet." },
      { question: "Kommen Sie auch in Nürnberger Unternehmen?", answer: "Ja, wir betreuen viele Nürnberger KMU mit Managed Services. Vor-Ort-Support, Remote-Hilfe und proaktive IT-Betreuung." },
      { question: "Bekomme ich einen Leih-PC während der Reparatur?", answer: "Ja, kostenlos. Wir stellen Ihnen einen eingerichteten Leih-PC zur Verfügung, damit Sie während der Reparatur weiterarbeiten können." },
    ],
    nearbyAreas: ["Fürth", "Erlangen", "Schwabach", "Oberasbach", "Stein", "Zirndorf"],
  },
  fuerth: {
    slug: "fuerth",
    name: "Fürth",
    region: "Mittelfranken",
    distance: "~35 km",
    population: "130.000+",
    coordinates: { lat: "49.4774", lng: "10.9886" },
    description:
      "IT-Service und PC-Reparatur in Fürth. Schneller Vor-Ort-Service, kostenloser Leih-PC, Festpreise ab 39€/h. Ihr IT-Partner für Fürth und Umgebung.",
    heroTitle: "IT-Service & PC-Reparatur",
    heroHighlight: "Fürth",
    heroSubtitle:
      "Zuverlässiger IT-Service direkt in Fürth. PC-Reparatur vor Ort, Leih-PC gratis, faire Preise. Von der Altstadt bis Stadeln – wir sind für Sie da.",
    localInfo:
      "In Fürth betreuen wir Kunden in allen Stadtteilen – ob Innenstadt, Hardhöhe, Stadeln oder Poppenreuth. Unser mobiler IT-Service kommt direkt zu Ihnen nach Hause oder ins Büro.",
    services: [
      { icon: Monitor, title: "PC & Laptop Reparatur", description: "Reparatur aller Marken direkt in Fürth. Hardware und Software.", price: "ab 39€/h", href: "/services/pc-reparatur" },
      { icon: Shield, title: "IT-Sicherheit", description: "Virenschutz, Firewall, Datensicherung für Fürther Privat- und Geschäftskunden.", price: "ab 45€", href: "/services/it-sicherheit" },
      { icon: HardDrive, title: "Datenrettung", description: "Gelöschte Dateien wiederherstellen. HDD, SSD, USB.", price: "ab 89€", href: "/services/datenrettung" },
      { icon: Wifi, title: "Netzwerk & WLAN", description: "WLAN-Probleme lösen, Netzwerk einrichten – in ganz Fürth.", price: "ab 45€", href: "/services/netzwerk" },
      { icon: Building2, title: "IT für Unternehmen", description: "IT-Betreuung für Fürther Unternehmen. Support, Infrastruktur, Cloud.", price: "ab 149€/Monat", href: "/geschaeftskunden" },
      { icon: Globe, title: "Webdesign", description: "Moderne Websites für Fürther Betriebe mit SEO-Optimierung.", price: "ab 490€", href: "/websites" },
    ],
    faq: [
      { question: "Bieten Sie Vor-Ort-Service in Fürth an?", answer: "Ja, wir kommen direkt zu Ihnen nach Fürth – ob privat oder geschäftlich. Die Anfahrt ist kostenfrei." },
      { question: "Wie schnell können Sie in Fürth helfen?", answer: "In der Regel innerhalb von 24 Stunden, bei dringenden Fällen oft am selben Tag." },
      { question: "Kann ich meinen PC auch zu Ihnen bringen?", answer: "Natürlich. Sie können Ihr Gerät auch bei uns in Ansbach/Oberasbach abgeben. Abhol- und Bringservice ist ebenfalls möglich." },
      { question: "Gibt es den kostenlosen Leih-PC auch für Fürther Kunden?", answer: "Ja. Jeder Kunde in unserem Servicegebiet erhält bei Bedarf einen kostenlosen Leih-PC während der Reparatur." },
    ],
    nearbyAreas: ["Nürnberg", "Erlangen", "Oberasbach", "Zirndorf", "Stein", "Cadolzburg"],
  },
  erlangen: {
    slug: "erlangen",
    name: "Erlangen",
    region: "Mittelfranken",
    distance: "~45 km",
    population: "115.000+",
    coordinates: { lat: "49.5897", lng: "11.0078" },
    description:
      "IT-Service und PC-Reparatur in Erlangen. Universitätsstadt, Siemens-Standort – wir betreuen Privatkunden und Unternehmen. Kostenloser Leih-PC, faire Preise.",
    heroTitle: "IT-Service & PC-Reparatur",
    heroHighlight: "Erlangen",
    heroSubtitle:
      "Professioneller IT-Service in der Universitäts- und Siemens-Stadt Erlangen. PC-Reparatur, IT-Support, Webdesign – mit kostenlosem Leih-PC.",
    localInfo:
      "Erlangen ist bekannt als Wissenschafts- und Technologiestandort. Wir betreuen Kunden vom Röthelheimpark bis Büchenbach, von der Innenstadt bis Tennenlohe – Studierende, Freiberufler und Unternehmen.",
    services: [
      { icon: Monitor, title: "PC & Laptop Reparatur", description: "Reparatur für alle Marken. Ideal für Studierende und Berufstätige in Erlangen.", price: "ab 39€/h", href: "/services/pc-reparatur" },
      { icon: Laptop, title: "Leih-PC Service", description: "Kostenloser Leih-PC während der Reparatur – besonders wichtig für Studium und Home-Office.", price: "0€", href: "/services/leih-pc" },
      { icon: Shield, title: "IT-Sicherheit", description: "Virenschutz und Datensicherung für Erlanger Haushalte und Unternehmen.", price: "ab 45€", href: "/services/it-sicherheit" },
      { icon: Wifi, title: "Netzwerk & WLAN", description: "WLAN-Optimierung in Wohnheimen, Büros und Praxen in Erlangen.", price: "ab 45€", href: "/services/netzwerk" },
      { icon: Building2, title: "IT für Unternehmen", description: "Managed IT-Services für Erlanger Unternehmen und Start-ups.", price: "ab 149€/Monat", href: "/geschaeftskunden" },
      { icon: Globe, title: "Webdesign", description: "Websites für Erlanger Unternehmen, Arztpraxen und Freiberufler.", price: "ab 490€", href: "/websites" },
    ],
    faq: [
      { question: "Gibt es spezielle Angebote für Studierende in Erlangen?", answer: "Ja, wir bieten faire Preise und den kostenlosen Leih-PC – ideal für Studierende der FAU Erlangen-Nürnberg." },
      { question: "Kommen Sie auch direkt an die Uni oder ins Büro?", answer: "Ja, unser mobiler Service kommt überall in Erlangen hin – ob Uni-Campus, Büro oder Privatadresse." },
      { question: "Betreuen Sie auch Erlanger Unternehmen langfristig?", answer: "Ja, mit unseren Managed Services betreuen wir Erlanger KMU mit monatlichem IT-Support, Monitoring und Vor-Ort-Besuchen." },
      { question: "Wie weit ist die Anfahrt von Ansbach nach Erlangen?", answer: "Etwa 45 Minuten. Die Anfahrt ist für Sie kostenfrei. Wir sind regelmäßig in Erlangen vor Ort." },
    ],
    nearbyAreas: ["Nürnberg", "Fürth", "Herzogenaurach", "Forchheim", "Uttenreuth", "Buckenhof"],
  },
  oberasbach: {
    slug: "oberasbach",
    name: "Oberasbach",
    region: "Landkreis Fürth",
    distance: "~5 km",
    population: "18.000+",
    coordinates: { lat: "49.4294", lng: "10.9617" },
    description:
      "IT-Service und PC-Reparatur in Oberasbach. Direkt vor Ort, kürzeste Anfahrt, kostenloser Leih-PC. Ihr IT-Nachbar in Oberasbach.",
    heroTitle: "IT-Service & PC-Reparatur",
    heroHighlight: "Oberasbach",
    heroSubtitle:
      "Ihr IT-Nachbar in Oberasbach. Kürzeste Wege, schnellster Service, kostenloser Leih-PC. PC-Reparatur und IT-Support direkt um die Ecke.",
    localInfo:
      "Oberasbach ist einer unserer Kernstandorte. Als Ihr IT-Nachbar sind wir besonders schnell vor Ort – oft innerhalb einer Stunde. Privat- und Geschäftskunden in Oberasbach profitieren von kurzen Wegen und persönlichem Service.",
    services: [
      { icon: Monitor, title: "PC & Laptop Reparatur", description: "Schnellste Hilfe in Oberasbach. Oft innerhalb einer Stunde vor Ort.", price: "ab 39€/h", href: "/services/pc-reparatur" },
      { icon: Shield, title: "IT-Sicherheit", description: "Virenschutz, Firewall und Datensicherung für Oberasbacher.", price: "ab 45€", href: "/services/it-sicherheit" },
      { icon: Wrench, title: "PC Wartung & Reinigung", description: "Regelmäßige Wartung hält Ihren PC schnell und zuverlässig.", price: "ab 25€", href: "/services/pc-reinigung" },
      { icon: Wifi, title: "Netzwerk & WLAN", description: "WLAN-Probleme lösen, Heimnetzwerk einrichten.", price: "ab 45€", href: "/services/netzwerk" },
      { icon: Building2, title: "IT für Unternehmen", description: "IT-Betreuung für Oberasbacher Betriebe und Selbstständige.", price: "ab 149€/Monat", href: "/geschaeftskunden" },
      { icon: Globe, title: "Webdesign", description: "Websites für lokale Unternehmen in Oberasbach.", price: "ab 490€", href: "/websites" },
    ],
    faq: [
      { question: "Wie schnell sind Sie in Oberasbach?", answer: "Sehr schnell – Oberasbach ist einer unserer Kernstandorte. Oft sind wir innerhalb einer Stunde bei Ihnen." },
      { question: "Kann ich mein Gerät vorbeibringen?", answer: "Ja, gerne. Wir nehmen Geräte in Oberasbach direkt entgegen. Rufen Sie kurz an, damit wir Sie direkt bedienen können." },
      { question: "Betreuen Sie auch kleine Unternehmen in Oberasbach?", answer: "Ja, vom Einzelunternehmer bis zum kleinen Betrieb – wir sind Ihr lokaler IT-Partner." },
    ],
    nearbyAreas: ["Zirndorf", "Fürth", "Stein", "Roßtal", "Cadolzburg", "Ansbach"],
  },
  dietenhofen: {
    slug: "dietenhofen",
    name: "Dietenhofen",
    region: "Landkreis Ansbach",
    distance: "~0 km (Heimatstandort)",
    population: "5.500+",
    coordinates: { lat: "49.3974", lng: "10.6873" },
    description:
      "IT-Service und PC-Reparatur in Dietenhofen – unser Heimatstandort. Schnellster Service, persönliche Betreuung, kostenloser Leih-PC.",
    heroTitle: "IT-Service & PC-Reparatur",
    heroHighlight: "Dietenhofen",
    heroSubtitle:
      "Unser Heimatstandort. Schnellster Service, persönlichste Betreuung, kürzeste Wege. IT-Hilfe direkt aus Dietenhofen.",
    localInfo:
      "Dietenhofen ist unser Heimatstandort – hier hat alles angefangen. Kunden in Dietenhofen und den umliegenden Ortsteilen profitieren von besonders schnellem Service und persönlicher Betreuung.",
    services: [
      { icon: Monitor, title: "PC & Laptop Reparatur", description: "Blitzschnelle Reparatur direkt in Dietenhofen.", price: "ab 39€/h", href: "/services/pc-reparatur" },
      { icon: Shield, title: "IT-Sicherheit", description: "Virenschutz und Datensicherheit für Dietenhofen.", price: "ab 45€", href: "/services/it-sicherheit" },
      { icon: Wrench, title: "PC Wartung", description: "Regelmäßige Pflege für Ihren PC.", price: "ab 25€", href: "/services/pc-reinigung" },
      { icon: Wifi, title: "Netzwerk & WLAN", description: "Internet-Probleme lösen, WLAN optimieren.", price: "ab 45€", href: "/services/netzwerk" },
      { icon: Building2, title: "IT für Unternehmen", description: "IT-Support für lokale Betriebe in Dietenhofen.", price: "ab 149€/Monat", href: "/geschaeftskunden" },
      { icon: Globe, title: "Webdesign", description: "Professionelle Online-Präsenz für Dietenhofer Unternehmen.", price: "ab 490€", href: "/websites" },
    ],
    faq: [
      { question: "Ist Dietenhofen Ihr Hauptstandort?", answer: "Ja, Dietenhofen ist unser Heimatstandort. Hier starten wir täglich – Sie profitieren von den schnellsten Reaktionszeiten." },
      { question: "Betreuen Sie auch die Ortsteile rund um Dietenhofen?", answer: "Ja, wir betreuen alle Ortsteile und Nachbargemeinden wie Heilsbronn, Neuendettelsau und Windsbach." },
    ],
    nearbyAreas: ["Heilsbronn", "Neuendettelsau", "Windsbach", "Ansbach", "Lichtenau", "Petersaurach"],
  },
  "neustadt-aisch": {
    slug: "neustadt-aisch",
    name: "Neustadt an der Aisch",
    region: "Mittelfranken",
    distance: "~25 km",
    population: "13.000+",
    coordinates: { lat: "49.5797", lng: "10.6103" },
    description:
      "IT-Service und PC-Reparatur in Neustadt an der Aisch. Vor-Ort-Service, kostenloser Leih-PC, faire Preise ab 39€/h.",
    heroTitle: "IT-Service & PC-Reparatur",
    heroHighlight: "Neustadt a.d. Aisch",
    heroSubtitle:
      "Zuverlässiger IT-Service in Neustadt an der Aisch. PC-Reparatur, Netzwerk-Setup, Webdesign – mit persönlichem Vor-Ort-Service.",
    localInfo:
      "Als Kreisstadt bietet Neustadt an der Aisch ein vielfältiges Wirtschaftsleben. Wir unterstützen lokale Unternehmen und Privatkunden mit professionellem IT-Service direkt vor Ort.",
    services: [
      { icon: Monitor, title: "PC & Laptop Reparatur", description: "Reparatur aller Marken in Neustadt an der Aisch.", price: "ab 39€/h", href: "/services/pc-reparatur" },
      { icon: Shield, title: "IT-Sicherheit", description: "Schutz vor Viren und Cyber-Bedrohungen.", price: "ab 45€", href: "/services/it-sicherheit" },
      { icon: HardDrive, title: "Datenrettung", description: "Gelöschte oder verlorene Daten retten.", price: "ab 89€", href: "/services/datenrettung" },
      { icon: Wifi, title: "Netzwerk & WLAN", description: "Netzwerk-Einrichtung und WLAN-Optimierung.", price: "ab 45€", href: "/services/netzwerk" },
      { icon: Building2, title: "IT für Unternehmen", description: "IT-Betreuung für Neustädter Betriebe.", price: "ab 149€/Monat", href: "/geschaeftskunden" },
      { icon: Globe, title: "Webdesign", description: "Websites für Unternehmen in Neustadt a.d. Aisch.", price: "ab 490€", href: "/websites" },
    ],
    faq: [
      { question: "Kommen Sie regelmäßig nach Neustadt an der Aisch?", answer: "Ja, Neustadt a.d. Aisch liegt in unserem Kern-Servicegebiet. Wir sind regelmäßig vor Ort – Anfahrt kostenfrei." },
      { question: "Betreuen Sie auch Unternehmen im Landkreis?", answer: "Ja, wir betreuen Unternehmen in Neustadt, Bad Windsheim, Uffenheim und dem gesamten Landkreis." },
    ],
    nearbyAreas: ["Bad Windsheim", "Uffenheim", "Diespeck", "Emskirchen", "Scheinfeld", "Ansbach"],
  },
  schwabach: {
    slug: "schwabach",
    name: "Schwabach",
    region: "Mittelfranken",
    distance: "~30 km",
    population: "42.000+",
    coordinates: { lat: "49.3289", lng: "11.0235" },
    description:
      "IT-Service und PC-Reparatur in Schwabach. Die Goldschlägerstadt verdient goldenen IT-Service. Vor-Ort, kostenloser Leih-PC, faire Preise.",
    heroTitle: "IT-Service & PC-Reparatur",
    heroHighlight: "Schwabach",
    heroSubtitle:
      "Professioneller IT-Service in der Goldschlägerstadt Schwabach. PC-Reparatur, IT-Support, Webdesign – mit persönlichem Service vor Ort.",
    localInfo:
      "Schwabach als kreisfreie Stadt zwischen Nürnberg und Ansbach profitiert von unserer zentralen Lage. Wir betreuen Schwabacher Privatkunden und Unternehmen mit dem gleichen hohen Standard.",
    services: [
      { icon: Monitor, title: "PC & Laptop Reparatur", description: "Schnelle PC-Hilfe in Schwabach. Alle Marken, faire Preise.", price: "ab 39€/h", href: "/services/pc-reparatur" },
      { icon: Shield, title: "IT-Sicherheit", description: "Virenschutz und Datensicherheit für Schwabach.", price: "ab 45€", href: "/services/it-sicherheit" },
      { icon: HardDrive, title: "Datenrettung", description: "Professionelle Datenrettung von allen Medien.", price: "ab 89€", href: "/services/datenrettung" },
      { icon: Wifi, title: "Netzwerk & WLAN", description: "WLAN und Netzwerk-Lösungen für Schwabach.", price: "ab 45€", href: "/services/netzwerk" },
      { icon: Building2, title: "IT für Unternehmen", description: "IT-Betreuung für Schwabacher Betriebe.", price: "ab 149€/Monat", href: "/geschaeftskunden" },
      { icon: Globe, title: "Webdesign", description: "Professionelle Websites für Schwabacher Unternehmen.", price: "ab 490€", href: "/websites" },
    ],
    faq: [
      { question: "Wie weit ist es von Ansbach nach Schwabach?", answer: "Etwa 30 Minuten. Die Anfahrt ist kostenfrei. Schwabach liegt zentral in unserem Servicegebiet." },
      { question: "Bieten Sie auch Express-Service in Schwabach?", answer: "Ja, bei dringenden Fällen sind wir oft noch am selben Tag in Schwabach. Rufen Sie uns einfach an." },
    ],
    nearbyAreas: ["Nürnberg", "Roth", "Rednitzhembach", "Büchenbach", "Wendelstein", "Rohr"],
  },
};

export const ALL_CITIES = Object.values(CITY_DATA);
export const CITY_SLUGS = Object.keys(CITY_DATA);
