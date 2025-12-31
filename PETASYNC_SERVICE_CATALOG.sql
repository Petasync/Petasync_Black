-- =====================================================
-- PETASYNC SERVICE CATALOG - Echte Dienstleistungen von der Website
-- =====================================================
-- Bitte in Supabase Dashboard → SQL Editor ausführen
-- =====================================================

-- Bestehende Einträge löschen (falls vorhanden)
TRUNCATE TABLE public.service_catalog RESTART IDENTITY CASCADE;

-- =====================================================
-- PRIVATKUNDEN - DIENSTLEISTUNGEN
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
-- Diagnose
('Diagnose & Fehleranalyse', 'Professionelle Fehleranalyse Ihres Computers – wir finden das Problem schnell und zuverlässig. Inkl. Hardware-Check, Software-Analyse und Fehlerprotokoll.', 'Privatkunden', 0.00, 'pauschal', true, 1),

-- PC Reinigung
('PC Reinigung', 'Professionelle Reinigung für bessere Leistung und längere Lebensdauer. Ihr PC wird wieder leise und kühl. Inkl. Innen- & Außenreinigung, Lüfter-Wartung, Wärmeleitpaste erneuern.', 'Privatkunden', 25.00, 'pauschal', true, 2),

-- PC & Laptop Reparatur
('PC Reparatur', 'Schnelle Diagnose und professionelle Reparatur aller gängigen Marken und Modelle. Display-Austausch, Tastatur-Reparatur, Akku-Wechsel, Mainboard-Reparatur.', 'Privatkunden', 29.00, 'pauschal', true, 3),
('Laptop Reparatur', 'Professionelle Laptop-Reparatur: Display-Austausch, Tastatur-Reparatur, Akku-Wechsel, Mainboard-Reparatur.', 'Privatkunden', 39.00, 'pauschal', true, 4),

-- Datenrettung
('Datenrettung', 'Professionelle Wiederherstellung Ihrer wertvollen Daten von defekten Speichermedien. Festplatten-Recovery, SSD-Datenrettung, USB-Stick Rettung.', 'Privatkunden', 89.00, 'pauschal', true, 5),

-- IT-Sicherheit & Virenentfernung
('IT-Sicherheit & Virenentfernung', 'Gründliche Entfernung von Schadsoftware und Einrichtung eines effektiven Schutzes. Malware-Entfernung, Ransomware-Hilfe, Antivirus-Setup, Firewall-Konfiguration.', 'Privatkunden', 45.00, 'pauschal', true, 6),

-- PC-Aufrüstung
('PC-Aufrüstung', 'Mehr Leistung für Ihren Computer durch gezielte Hardware-Upgrades. SSD-Upgrade, RAM-Erweiterung, Grafikkarten-Einbau, CPU-Wechsel.', 'Privatkunden', 25.00, 'Stunde', true, 7),
('SSD-Upgrade', 'Austausch Ihrer alten Festplatte gegen eine schnelle SSD inkl. Datenübertragung.', 'Privatkunden', 49.00, 'pauschal', true, 8),
('RAM-Erweiterung', 'Aufrüstung des Arbeitsspeichers für bessere Performance (exkl. Hardware).', 'Privatkunden', 29.00, 'pauschal', true, 9),
('Grafikkarten-Einbau', 'Installation einer neuen Grafikkarte inkl. Treiberinstallation (exkl. Hardware).', 'Privatkunden', 39.00, 'pauschal', true, 10),

-- Netzwerk & WLAN
('Netzwerk & WLAN Einrichtung', 'Einrichtung und Optimierung Ihres Heimnetzwerks für beste Verbindung. Router-Setup, WLAN-Optimierung, Netzwerk-Sicherheit.', 'Privatkunden', 45.00, 'pauschal', true, 11),
('WLAN-Optimierung', 'Verbesserung Ihrer WLAN-Reichweite und -Geschwindigkeit.', 'Privatkunden', 39.00, 'pauschal', true, 12),

-- PC Zusammenbau
('PC Zusammenbau', 'Wir bauen Ihren Wunsch-PC nach Ihren Anforderungen zusammen – ob Gaming, Office oder Workstation. Individuelle Konfiguration, Windows-Installation, 12 Monate Garantie.', 'Privatkunden', 69.00, 'pauschal', true, 13),

-- Leih-PC Service
('Leih-PC Service', 'Während Ihr Gerät repariert wird, arbeiten Sie einfach mit unserem Leihgerät weiter. Kostenloser Leih-PC, Datenübertragung, keine Ausfallzeit.', 'Privatkunden', 0.00, 'pauschal', true, 14);

-- =====================================================
-- GESCHÄFTSKUNDEN - DIENSTLEISTUNGEN
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
-- IT-Support & Helpdesk
('IT-Support Remote', 'Zuverlässiger IT-Support per Fernwartung für Ihr Unternehmen.', 'Geschäftskunden', 50.00, 'Stunde', true, 100),
('IT-Support Vor-Ort', 'Zuverlässiger IT-Support direkt vor Ort bei Ihnen im Unternehmen.', 'Geschäftskunden', 75.00, 'Stunde', true, 101),
('IT-Support Flatrate', 'Support-Flatrate: Unlimitierter Support für eine monatliche Pauschale.', 'Geschäftskunden', 99.00, 'Monat', true, 102),

-- Managed Services
('Managed Services (5 User)', 'Komplette IT-Betreuung als monatliche Flatrate für bis zu 5 Benutzer. PC-Verwaltung, Server-Monitoring, Proaktive Wartung.', 'Geschäftskunden', 175.00, 'Monat', true, 103),
('Managed Services (10 User)', 'Komplette IT-Betreuung als monatliche Flatrate für bis zu 10 Benutzer.', 'Geschäftskunden', 350.00, 'Monat', true, 104),
('Managed Services (20 User)', 'Komplette IT-Betreuung als monatliche Flatrate für bis zu 20 Benutzer.', 'Geschäftskunden', 700.00, 'Monat', true, 105),
('Managed Services Pro User', 'Preis pro zusätzlichem Benutzer bei Managed Services.', 'Geschäftskunden', 35.00, 'User/Monat', true, 106),

-- IT-Infrastruktur
('IT-Infrastruktur Setup', 'Server, Netzwerk und Cloud-Lösungen für Ihr Unternehmen. Server-Setup, Netzwerk-Konfiguration, Cloud-Migration.', 'Geschäftskunden', 299.00, 'Projekt', true, 107),
('Server-Installation', 'Installation und Konfiguration von Windows/Linux Servern.', 'Geschäftskunden', 499.00, 'Projekt', true, 108),
('Netzwerk-Installation', 'Planung und Einrichtung von Unternehmensnetzwerken.', 'Geschäftskunden', 399.00, 'Projekt', true, 109),

-- IT-Sicherheit
('IT-Sicherheit Audit', 'Umfassender Schutz für Ihre Unternehmensdaten und Systeme. Firewall-Setup, Security-Audit, Endpoint-Protection.', 'Geschäftskunden', 299.00, 'Projekt', true, 110),
('Firewall-Einrichtung', 'Installation und Konfiguration professioneller Firewalls.', 'Geschäftskunden', 249.00, 'Projekt', true, 111),
('Security-Audit', 'Umfassende Prüfung Ihrer IT-Sicherheit mit Bericht und Handlungsempfehlungen.', 'Geschäftskunden', 399.00, 'Projekt', true, 112),

-- Cloud-Services
('Office 365 Setup', 'Einrichtung von Microsoft Office 365 inkl. E-Mail-Migration und Benutzer-Setup.', 'Geschäftskunden', 199.00, 'Projekt', true, 113),
('Office 365 Lizenz', 'Microsoft Office 365 Business Lizenz pro Benutzer (monatlich).', 'Geschäftskunden', 12.00, 'User/Monat', true, 114),
('Cloud-Server Setup', 'Einrichtung von Cloud-Servern (Azure, AWS, etc.).', 'Geschäftskunden', 399.00, 'Projekt', true, 115),
('Cloud-Backup Einrichtung', 'Automatische Cloud-Backup-Lösung für Ihre Unternehmensdaten.', 'Geschäftskunden', 149.00, 'Projekt', true, 116),

-- Netzwerk & WLAN (Business)
('Enterprise WLAN Setup', 'Enterprise-Netzwerke, VPN und strukturierte Verkabelung. WLAN-Setup, VPN-Lösungen, Verkabelung.', 'Geschäftskunden', 299.00, 'Projekt', true, 117),
('VPN-Einrichtung', 'Sichere VPN-Verbindung für Home-Office und Außendienstmitarbeiter.', 'Geschäftskunden', 199.00, 'Projekt', true, 118),
('Netzwerk-Verkabelung', 'Professionelle strukturierte Verkabelung (Cat6/Cat7) inkl. Patchpanel.', 'Geschäftskunden', 79.00, 'Dose', true, 119),

-- IT-Beratung
('IT-Beratung', 'Strategische IT-Beratung für Digitalisierung und Optimierung. IT-Strategie, Digitalisierung, DSGVO-Beratung.', 'Geschäftskunden', 89.00, 'Stunde', true, 120),
('DSGVO IT-Beratung', 'IT-seitige Beratung zur DSGVO-Konformität Ihrer Systeme.', 'Geschäftskunden', 399.00, 'Projekt', true, 121),

-- Hardware & Workstations
('Business-PC Setup', 'Business-PCs, Laptops und Workstations inkl. Setup. Volumen-Rabatte, Windows Pro, Installation inklusive.', 'Geschäftskunden', 69.00, 'Stück', true, 122),
('Arbeitsplatz-Einrichtung', 'Komplette Einrichtung eines Büro-Arbeitsplatzes inkl. PC, Peripherie und Software.', 'Geschäftskunden', 149.00, 'Stück', true, 123);

-- =====================================================
-- WEBSITE-PAKETE
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
-- Template
('Website Template', 'Schnell & günstig: Professionelles Design auf Basis bewährter Templates. Fertige Design-Vorlage, Ihre Texte & Bilder, bis zu 5 Seiten, Mobile-optimiert, Kontaktformular, SSL-Zertifikat. Live in 5-7 Tagen!', 'Webdesign', 599.00, 'Projekt', true, 200),

-- Starter
('Website Starter', 'Ideal für Selbstständige und kleine Unternehmen. Individuelles Design, bis zu 5 Seiten, Responsive Design, Kontaktformular, Basis SEO, 1 Monat Support.', 'Webdesign', 999.00, 'Projekt', true, 201),

-- Business
('Website Business', 'Für wachsende Unternehmen mit mehr Anforderungen. Premium Design, bis zu 10 Seiten, CMS (Content Management), Erweiterte SEO, Google Analytics, Blog-Funktion, 3 Monate Support.', 'Webdesign', 1999.00, 'Projekt', true, 202),

-- Enterprise
('Website Enterprise', 'Individuelle Lösungen für anspruchsvolle Projekte. Komplett individuell, Unbegrenzte Seiten, E-Commerce möglich, Premium SEO Paket, Performance-Optimierung, API-Integrationen, 12 Monate Support.', 'Webdesign', 4999.00, 'Projekt', true, 203),

-- Zusatzleistungen Webdesign
('SEO-Optimierung Basis', 'Basis SEO-Optimierung: Meta-Tags, Seitentitel, lokale SEO.', 'Webdesign', 199.00, 'Projekt', true, 204),
('SEO-Optimierung Premium', 'Umfassende SEO-Optimierung inkl. Content-Strategie und Backlink-Aufbau.', 'Webdesign', 499.00, 'Monat', true, 205),
('Website-Wartung', 'Monatliche Wartung, Updates, Backups und Sicherheits-Checks.', 'Webdesign', 79.00, 'Monat', true, 206),
('Logo-Design', 'Professionelles Logo-Design mit 3 Entwürfen.', 'Webdesign', 299.00, 'Projekt', true, 207),
('Content-Erstellung', 'Professionelle Texterstellung für Ihre Website (pro Seite).', 'Webdesign', 99.00, 'Seite', true, 208),
('Foto-Shooting', 'Professionelles Foto-Shooting für Ihre Website (halber Tag).', 'Webdesign', 399.00, 'pauschal', true, 209),
('Google My Business Setup', 'Professionelle Einrichtung und Optimierung Ihres Google My Business Profils.', 'Webdesign', 149.00, 'Projekt', true, 210),
('SSL-Zertifikat Einrichtung', 'Installation und Konfiguration von SSL-Zertifikaten.', 'Webdesign', 49.00, 'Projekt', true, 211),
('Website-Migration', 'Umzug Ihrer Website auf einen neuen Server/Hoster.', 'Webdesign', 249.00, 'Projekt', true, 212);

-- =====================================================
-- SONSTIGES / ZUSATZLEISTUNGEN
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
-- Anfahrtspauschalen
('Anfahrt Ansbach', 'Anfahrtspauschale innerhalb Ansbach (kostenlos).', 'Sonstiges', 0.00, 'pauschal', true, 300),
('Anfahrt Nürnberg', 'Anfahrtspauschale innerhalb Nürnberg.', 'Sonstiges', 15.00, 'pauschal', true, 301),
('Anfahrt bis 25km', 'Anfahrtspauschale im Umkreis von 25km.', 'Sonstiges', 25.00, 'pauschal', true, 302),
('Anfahrt bis 50km', 'Anfahrtspauschale im Umkreis von 50km.', 'Sonstiges', 45.00, 'pauschal', true, 303),

-- Express-Services
('Express-Service 24h', 'Bevorzugte Bearbeitung innerhalb 24 Stunden.', 'Sonstiges', 49.00, 'pauschal', true, 304),
('Express-Service Same-Day', 'Bearbeitung am selben Tag (nach Verfügbarkeit).', 'Sonstiges', 99.00, 'pauschal', true, 305),

-- Weitere Services
('Abholung & Lieferung', 'Kostenlose Abholung und Rücklieferung innerhalb Ansbach.', 'Sonstiges', 0.00, 'pauschal', true, 306),
('Datenübertragung', 'Übertragung Ihrer Daten von altem auf neues Gerät.', 'Sonstiges', 39.00, 'pauschal', true, 307),
('Software-Installation', 'Installation von Standard-Software (Office, Browser, etc.).', 'Sonstiges', 29.00, 'Stunde', true, 308),
('Schulung & Einweisung', 'Individuelle Schulung zur PC-Bedienung oder Software (pro Stunde).', 'Sonstiges', 69.00, 'Stunde', true, 309);

-- =====================================================
-- FERTIG!
-- =====================================================
-- Insgesamt 61 echte Dienstleistungen von der Petasync-Website
-- Kategorien:
-- - Privatkunden (14 Services)
-- - Geschäftskunden (24 Services)
-- - Webdesign (13 Services)
-- - Sonstiges (10 Services)
-- =====================================================
