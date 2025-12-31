-- =====================================================
-- PETASYNC SERVICE CATALOG - Vollständige Dienstleistungen & Artikel
-- =====================================================
-- Bitte in Supabase Dashboard → SQL Editor ausführen
-- =====================================================

-- Bestehende Einträge löschen (optional - nur für Neustart)
-- TRUNCATE TABLE public.service_catalog RESTART IDENTITY CASCADE;

-- =====================================================
-- KATEGORIE: PC-REPARATUR & WARTUNG
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
('PC-Diagnose & Fehleranalyse', 'Umfassende Diagnose von Hardware- und Softwareproblemen, inkl. detailliertem Fehlerbericht', 'PC-Reparatur & Wartung', 39.00, 'pauschal', true, 1),
('Viren- & Malware-Entfernung', 'Professionelle Entfernung von Viren, Trojanern und Malware inkl. Sicherheitscheck', 'PC-Reparatur & Wartung', 79.00, 'pauschal', true, 2),
('Windows-Neuinstallation', 'Komplette Neuinstallation von Windows inkl. Treiber und wichtiger Software', 'PC-Reparatur & Wartung', 99.00, 'pauschal', true, 3),
('PC-Reinigung & Wartung', 'Professionelle Innenreinigung, Lüfter-Service und thermische Optimierung', 'PC-Reparatur & Wartung', 59.00, 'pauschal', true, 4),
('Festplatten-Austausch inkl. Datenübertragung', 'Austausch defekter Festplatten mit Datenübertragung auf neue SSD/HDD', 'PC-Reparatur & Wartung', 89.00, 'Stunde', true, 5),
('RAM-Upgrade & Installation', 'Arbeitsspeicher-Erweiterung inkl. Kompatibilitätsprüfung und Installation', 'PC-Reparatur & Wartung', 49.00, 'pauschal', true, 6),
('Grafikkarten-Austausch', 'Installation neuer Grafikkarte inkl. Treiberinstallation und Performance-Test', 'PC-Reparatur & Wartung', 69.00, 'pauschal', true, 7),
('Netzteil-Austausch', 'Wechsel defekter Netzteile inkl. Leistungsberechnung und Verkabelung', 'PC-Reparatur & Wartung', 59.00, 'pauschal', true, 8),
('Mainboard-Reparatur', 'Diagnose und Reparatur von Mainboard-Defekten (nach Aufwand)', 'PC-Reparatur & Wartung', 120.00, 'Stunde', true, 9),
('Laptop-Display-Austausch', 'Austausch defekter Laptop-Displays (Preis exkl. Display)', 'PC-Reparatur & Wartung', 99.00, 'pauschal', true, 10),
('Laptop-Tastatur-Reparatur', 'Reparatur oder Austausch defekter Laptop-Tastaturen', 'PC-Reparatur & Wartung', 79.00, 'pauschal', true, 11),
('Laptop-Akku-Austausch', 'Wechsel verbrauchter Laptop-Akkus (Preis exkl. Akku)', 'PC-Reparatur & Wartung', 49.00, 'pauschal', true, 12),
('BIOS/UEFI-Update & Konfiguration', 'Professionelles BIOS-Update mit Backup und optimalen Einstellungen', 'PC-Reparatur & Wartung', 69.00, 'pauschal', true, 13),
('Lüfter-Austausch & Kühlung-Optimierung', 'Austausch defekter Lüfter und Optimierung der Kühlleistung', 'PC-Reparatur & Wartung', 59.00, 'pauschal', true, 14),
('PC-Komplett-Check', 'Umfassende Systemprüfung inkl. Hardware-Test, Software-Check und Performance-Analyse', 'PC-Reparatur & Wartung', 49.00, 'pauschal', true, 15);

-- =====================================================
-- KATEGORIE: HARDWARE-VERKAUF
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
('SSD 500GB (SATA)', 'Hochwertige SATA SSD mit 500GB Speicher, 5 Jahre Garantie', 'Hardware-Verkauf', 59.00, 'Stück', true, 100),
('SSD 1TB (SATA)', 'Hochwertige SATA SSD mit 1TB Speicher, 5 Jahre Garantie', 'Hardware-Verkauf', 89.00, 'Stück', true, 101),
('SSD 500GB (NVMe M.2)', 'Schnelle NVMe M.2 SSD mit 500GB, bis zu 3500 MB/s', 'Hardware-Verkauf', 69.00, 'Stück', true, 102),
('SSD 1TB (NVMe M.2)', 'Schnelle NVMe M.2 SSD mit 1TB, bis zu 3500 MB/s', 'Hardware-Verkauf', 109.00, 'Stück', true, 103),
('HDD 2TB (3,5" SATA)', 'Festplatte 2TB für Desktop-PCs, 3 Jahre Garantie', 'Hardware-Verkauf', 59.00, 'Stück', true, 104),
('HDD 4TB (3,5" SATA)', 'Festplatte 4TB für Desktop-PCs, 3 Jahre Garantie', 'Hardware-Verkauf', 89.00, 'Stück', true, 105),
('RAM 8GB DDR4 (Desktop)', 'Arbeitsspeicher 8GB DDR4-3200 für Desktop-PCs', 'Hardware-Verkauf', 29.00, 'Stück', true, 106),
('RAM 16GB DDR4 (Desktop)', 'Arbeitsspeicher 16GB DDR4-3200 für Desktop-PCs', 'Hardware-Verkauf', 49.00, 'Stück', true, 107),
('RAM 32GB DDR4 (Desktop Kit)', 'Arbeitsspeicher Kit 32GB (2x16GB) DDR4-3200', 'Hardware-Verkauf', 89.00, 'Stück', true, 108),
('RAM 8GB DDR4 (Laptop)', 'Laptop-Arbeitsspeicher 8GB DDR4-2666 SO-DIMM', 'Hardware-Verkauf', 32.00, 'Stück', true, 109),
('RAM 16GB DDR4 (Laptop)', 'Laptop-Arbeitsspeicher 16GB DDR4-2666 SO-DIMM', 'Hardware-Verkauf', 54.00, 'Stück', true, 110),
('PC-Netzteil 600W (80+ Bronze)', 'Zuverlässiges Netzteil 600W mit 80+ Bronze Zertifikat', 'Hardware-Verkauf', 59.00, 'Stück', true, 111),
('PC-Netzteil 750W (80+ Gold)', 'Hochwertiges Netzteil 750W mit 80+ Gold Zertifikat', 'Hardware-Verkauf', 89.00, 'Stück', true, 112),
('Externe Festplatte 1TB USB 3.0', 'Portable Festplatte 1TB für Backups und Datentransfer', 'Hardware-Verkauf', 49.00, 'Stück', true, 113),
('Externe Festplatte 2TB USB 3.0', 'Portable Festplatte 2TB für Backups und Datentransfer', 'Hardware-Verkauf', 69.00, 'Stück', true, 114),
('USB-Stick 64GB', 'Schneller USB 3.0 Stick mit 64GB Kapazität', 'Hardware-Verkauf', 12.00, 'Stück', true, 115),
('USB-Stick 128GB', 'Schneller USB 3.0 Stick mit 128GB Kapazität', 'Hardware-Verkauf', 19.00, 'Stück', true, 116),
('Tastatur & Maus Set (kabellos)', 'Ergonomisches Funk-Set für den täglichen Einsatz', 'Hardware-Verkauf', 39.00, 'Stück', true, 117),
('Gaming-Maus', 'Präzisions-Gaming-Maus mit RGB-Beleuchtung', 'Hardware-Verkauf', 49.00, 'Stück', true, 118),
('Mechanische Gaming-Tastatur', 'Mechanische Tastatur mit RGB-Beleuchtung', 'Hardware-Verkauf', 89.00, 'Stück', true, 119),
('Webcam Full HD', 'Full HD Webcam mit Mikrofon für Videokonferenzen', 'Hardware-Verkauf', 59.00, 'Stück', true, 120),
('USB-Hub 7-Port', 'Aktiver USB 3.0 Hub mit 7 Ports und Netzteil', 'Hardware-Verkauf', 29.00, 'Stück', true, 121),
('HDMI-Kabel 2m', 'Hochwertiges HDMI 2.0 Kabel, 2 Meter', 'Hardware-Verkauf', 12.00, 'Stück', true, 122),
('DisplayPort-Kabel 2m', 'DisplayPort 1.4 Kabel für hohe Auflösungen', 'Hardware-Verkauf', 15.00, 'Stück', true, 123),
('Netzwerkkabel Cat6 5m', 'Gigabit Ethernet-Kabel Cat6, 5 Meter', 'Hardware-Verkauf', 9.00, 'Stück', true, 124);

-- =====================================================
-- KATEGORIE: SOFTWARE & LIZENZEN
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
('Windows 11 Pro Lizenz', 'Vollversion Windows 11 Professional (OEM)', 'Software & Lizenzen', 149.00, 'Stück', true, 200),
('Windows 11 Home Lizenz', 'Vollversion Windows 11 Home (OEM)', 'Software & Lizenzen', 119.00, 'Stück', true, 201),
('Microsoft Office 2021 Home & Business', 'Office 2021 mit Word, Excel, PowerPoint, Outlook', 'Software & Lizenzen', 249.00, 'Stück', true, 202),
('Microsoft Office 365 Personal (1 Jahr)', 'Office 365 für 1 Benutzer inkl. 1TB OneDrive', 'Software & Lizenzen', 69.00, 'Jahr', true, 203),
('Microsoft Office 365 Family (1 Jahr)', 'Office 365 für bis zu 6 Benutzer inkl. 1TB OneDrive pro Person', 'Software & Lizenzen', 99.00, 'Jahr', true, 204),
('Antivirus-Software (1 Jahr, 1 Gerät)', 'Premium-Virenschutz inkl. Firewall und Ransomware-Schutz', 'Software & Lizenzen', 39.00, 'Jahr', true, 205),
('Antivirus-Software (1 Jahr, 5 Geräte)', 'Premium-Virenschutz für bis zu 5 Geräte', 'Software & Lizenzen', 69.00, 'Jahr', true, 206),
('Adobe Creative Cloud Foto-Abo (1 Jahr)', 'Photoshop & Lightroom inkl. 20GB Cloud-Speicher', 'Software & Lizenzen', 139.00, 'Jahr', true, 207),
('Backup-Software Professional', 'Professionelle Backup-Lösung mit Cloud-Integration', 'Software & Lizenzen', 49.00, 'Lizenz', true, 208),
('PDF-Editor Pro Lizenz', 'Professioneller PDF-Editor zum Erstellen und Bearbeiten', 'Software & Lizenzen', 89.00, 'Lizenz', true, 209);

-- =====================================================
-- KATEGORIE: WEBDESIGN & DEVELOPMENT
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
('Landing Page (responsiv)', 'Moderne Landingpage mit 1-3 Sektionen, SEO-optimiert, inkl. Kontaktformular', 'Webdesign & Development', 599.00, 'Projekt', true, 300),
('Business Website (bis 5 Seiten)', 'Professionelle Website mit bis zu 5 Unterseiten, responsiv und SEO-optimiert', 'Webdesign & Development', 1299.00, 'Projekt', true, 301),
('Business Website (bis 10 Seiten)', 'Umfangreiche Website mit bis zu 10 Unterseiten, CMS-Integration', 'Webdesign & Development', 2299.00, 'Projekt', true, 302),
('Online-Shop (Basis)', 'E-Commerce Shop mit bis zu 50 Produkten, Warenkorb und Bezahlung', 'Webdesign & Development', 2999.00, 'Projekt', true, 303),
('Online-Shop (Professional)', 'Professioneller Shop mit unbegrenzten Produkten, erweitertem Design', 'Webdesign & Development', 4999.00, 'Projekt', true, 304),
('WordPress-Website (Standard)', 'WordPress-Website mit Premium-Theme und Basis-Plugins', 'Webdesign & Development', 999.00, 'Projekt', true, 305),
('WordPress-Website (Premium)', 'Premium WordPress-Website mit Custom-Design und erweiterten Funktionen', 'Webdesign & Development', 1999.00, 'Projekt', true, 306),
('Logo-Design', 'Professionelles Logo-Design mit 3 Entwürfen und Revisionen', 'Webdesign & Development', 299.00, 'Projekt', true, 307),
('Corporate Design-Paket', 'Komplettes Corporate Design inkl. Logo, Farbschema, Schriften', 'Webdesign & Development', 899.00, 'Projekt', true, 308),
('SEO-Optimierung (Basis)', 'On-Page SEO mit Keyword-Recherche und Meta-Tags', 'Webdesign & Development', 399.00, 'Projekt', true, 309),
('SEO-Optimierung (Professional)', 'Umfassendes SEO inkl. Content-Optimierung und Backlink-Aufbau', 'Webdesign & Development', 999.00, 'Monat', true, 310),
('Website-Wartung (monatlich)', 'Monatliche Updates, Backups, Sicherheits-Checks und Support', 'Webdesign & Development', 79.00, 'Monat', true, 311),
('Google My Business Einrichtung', 'Professionelle Einrichtung und Optimierung Ihres Google-Profils', 'Webdesign & Development', 149.00, 'pauschal', true, 312),
('Social Media Integration', 'Integration von Social Media Feeds und Share-Buttons', 'Webdesign & Development', 199.00, 'Projekt', true, 313),
('Newsletter-System Einrichtung', 'Einrichtung von Newsletter-Software inkl. Template-Design', 'Webdesign & Development', 299.00, 'Projekt', true, 314),
('Website-Migration', 'Umzug Ihrer bestehenden Website auf neuen Server/Hoster', 'Webdesign & Development', 249.00, 'Projekt', true, 315),
('SSL-Zertifikat Einrichtung', 'Installation und Konfiguration von SSL-Zertifikaten', 'Webdesign & Development', 49.00, 'pauschal', true, 316),
('Datenschutz & Impressum', 'Rechtskonforme Erstellung von Datenschutzerklärung und Impressum', 'Webdesign & Development', 99.00, 'pauschal', true, 317);

-- =====================================================
-- KATEGORIE: IT-SUPPORT & BERATUNG
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
('IT-Support Stundensatz (vor Ort)', 'Professioneller IT-Support direkt bei Ihnen vor Ort', 'IT-Support & Beratung', 89.00, 'Stunde', true, 400),
('IT-Support Stundensatz (Remote)', 'IT-Support per Fernwartung (TeamViewer, AnyDesk)', 'IT-Support & Beratung', 69.00, 'Stunde', true, 401),
('IT-Beratung & Konzeption', 'Strategische IT-Beratung und Lösungskonzeption', 'IT-Support & Beratung', 120.00, 'Stunde', true, 402),
('PC-Einrichtung für Neukauf', 'Komplette Einrichtung neuer PCs/Laptops inkl. Software-Installation', 'IT-Support & Beratung', 99.00, 'pauschal', true, 403),
('Smartphone/Tablet-Einrichtung', 'Einrichtung und Konfiguration von mobilen Geräten', 'IT-Support & Beratung', 49.00, 'pauschal', true, 404),
('E-Mail-Konto Einrichtung', 'Professionelle Einrichtung von E-Mail-Konten (pro Account)', 'IT-Support & Beratung', 29.00, 'Stück', true, 405),
('Cloud-Speicher Einrichtung', 'Einrichtung von OneDrive, Google Drive, Dropbox etc.', 'IT-Support & Beratung', 39.00, 'pauschal', true, 406),
('Drucker-Installation & Konfiguration', 'Installation und Einrichtung von Druckern im Netzwerk', 'IT-Support & Beratung', 59.00, 'pauschal', true, 407),
('Software-Installation (Standard)', 'Installation von Standard-Software (Office, Browser, etc.)', 'IT-Support & Beratung', 29.00, 'Stunde', true, 408),
('Software-Installation (Komplex)', 'Installation komplexer Fachanwendungen mit Konfiguration', 'IT-Support & Beratung', 69.00, 'Stunde', true, 409),
('Datenübertragung zwischen Geräten', 'Transfer von Daten zwischen altem und neuem Gerät', 'IT-Support & Beratung', 69.00, 'pauschal', true, 410),
('IT-Schulung (Einzelperson)', 'Individuelle Schulung zu PC, Software oder Internet', 'IT-Support & Beratung', 79.00, 'Stunde', true, 411),
('IT-Schulung (Gruppe bis 5 Pers.)', 'Gruppen-Schulung für bis zu 5 Personen', 'IT-Support & Beratung', 149.00, 'Stunde', true, 412),
('PC-Kaufberatung', 'Ausführliche Beratung zum optimalen PC/Laptop-Kauf', 'IT-Support & Beratung', 49.00, 'pauschal', true, 413),
('Smart Home Beratung', 'Beratung zu Smart Home Lösungen und Kompatibilität', 'IT-Support & Beratung', 89.00, 'Stunde', true, 414);

-- =====================================================
-- KATEGORIE: NETZWERK & SERVER
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
('WLAN-Router Einrichtung', 'Professionelle Konfiguration von WLAN-Routern inkl. Sicherheit', 'Netzwerk & Server', 79.00, 'pauschal', true, 500),
('Heimnetzwerk-Optimierung', 'Analyse und Optimierung bestehender Heimnetzwerke', 'Netzwerk & Server', 99.00, 'pauschal', true, 501),
('WLAN-Reichweiten-Erweiterung', 'Installation und Konfiguration von WLAN-Repeatern/Mesh', 'Netzwerk & Server', 89.00, 'pauschal', true, 502),
('Netzwerk-Installation (klein)', 'Verkabelung und Einrichtung kleiner Netzwerke (bis 5 Geräte)', 'Netzwerk & Server', 299.00, 'Projekt', true, 503),
('Netzwerk-Installation (mittel)', 'Verkabelung und Einrichtung mittlerer Netzwerke (bis 15 Geräte)', 'Netzwerk & Server', 799.00, 'Projekt', true, 504),
('Netzwerksicherheit-Audit', 'Umfassende Prüfung der Netzwerksicherheit mit Bericht', 'Netzwerk & Server', 299.00, 'Projekt', true, 505),
('Firewall-Konfiguration', 'Einrichtung und Konfiguration professioneller Firewalls', 'Netzwerk & Server', 249.00, 'Projekt', true, 506),
('VPN-Einrichtung (Remote Access)', 'Sichere VPN-Verbindung für Home-Office', 'Netzwerk & Server', 149.00, 'Projekt', true, 507),
('NAS-Server Einrichtung', 'Konfiguration von Network Attached Storage inkl. Backup', 'Netzwerk & Server', 199.00, 'pauschal', true, 508),
('Server-Installation (Windows)', 'Installation und Basis-Konfiguration Windows Server', 'Netzwerk & Server', 499.00, 'Projekt', true, 509),
('Server-Installation (Linux)', 'Installation und Basis-Konfiguration Linux Server', 'Netzwerk & Server', 449.00, 'Projekt', true, 510),
('Active Directory Einrichtung', 'Einrichtung von Active Directory für Unternehmen', 'Netzwerk & Server', 899.00, 'Projekt', true, 511),
('Netzwerk-Verkabelung (pro Dose)', 'Professionelle Verlegung von Netzwerkkabeln', 'Netzwerk & Server', 79.00, 'Stück', true, 512),
('Switch-Installation & Konfiguration', 'Installation und Konfiguration von Netzwerk-Switches', 'Netzwerk & Server', 149.00, 'Projekt', true, 513);

-- =====================================================
-- KATEGORIE: DATENRETTUNG & BACKUP
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
('Datenrettung (einfach)', 'Wiederherstellung gelöschter Dateien von funktionierenden Datenträgern', 'Datenrettung & Backup', 149.00, 'pauschal', true, 600),
('Datenrettung (mittel)', 'Rettung von Daten bei logischen Fehlern und Dateisystem-Problemen', 'Datenrettung & Backup', 299.00, 'pauschal', true, 601),
('Datenrettung (komplex)', 'Professionelle Datenrettung bei physischen Schäden (Preis nach Aufwand)', 'Datenrettung & Backup', 499.00, 'Projekt', true, 602),
('Backup-Konzept Erstellung', 'Individuelle Backup-Strategie für Privat oder Unternehmen', 'Datenrettung & Backup', 199.00, 'Projekt', true, 603),
('Backup-System Einrichtung (lokal)', 'Einrichtung automatischer Backups auf externe Festplatte/NAS', 'Datenrettung & Backup', 99.00, 'pauschal', true, 604),
('Backup-System Einrichtung (Cloud)', 'Einrichtung automatischer Cloud-Backups', 'Datenrettung & Backup', 129.00, 'pauschal', true, 605),
('Daten-Migration auf neue Festplatte', 'Komplette Übertragung aller Daten inkl. System auf neues Laufwerk', 'Datenrettung & Backup', 89.00, 'pauschal', true, 606),
('Festplatten-Vernichtung (DSGVO)', 'Sichere und DSGVO-konforme Vernichtung von Datenträgern', 'Datenrettung & Backup', 29.00, 'Stück', true, 607),
('Daten-Löschung (sicher)', 'Mehrfaches Überschreiben für sichere Datenlöschung', 'Datenrettung & Backup', 49.00, 'pauschal', true, 608);

-- =====================================================
-- KATEGORIE: GESCHÄFTSKUNDEN-SERVICES
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
('IT-Wartungsvertrag (5 PCs)', 'Monatliche Wartung inkl. Updates, Sicherheit und Support', 'Geschäftskunden-Services', 199.00, 'Monat', true, 700),
('IT-Wartungsvertrag (10 PCs)', 'Monatliche Wartung inkl. Updates, Sicherheit und Support', 'Geschäftskunden-Services', 349.00, 'Monat', true, 701),
('IT-Wartungsvertrag (20 PCs)', 'Monatliche Wartung inkl. Updates, Sicherheit und Support', 'Geschäftskunden-Services', 599.00, 'Monat', true, 702),
('Managed Services (Full IT-Betreuung)', 'Komplette IT-Betreuung inkl. Server, Netzwerk, Support (Preis nach Vereinbarung)', 'Geschäftskunden-Services', 999.00, 'Monat', true, 703),
('IT-Notfall-Support (24/7)', 'Bereitschaftsdienst für kritische IT-Probleme', 'Geschäftskunden-Services', 299.00, 'Monat', true, 704),
('Arbeitsplatz-PC-Installation', 'Komplette Einrichtung von Büro-Arbeitsplätzen inkl. Netzwerk', 'Geschäftskunden-Services', 149.00, 'Stück', true, 705),
('Server-Wartung (monatlich)', 'Monatliche Wartung, Updates und Überwachung von Servern', 'Geschäftskunden-Services', 249.00, 'Monat', true, 706),
('IT-Sicherheitskonzept', 'Erstellung eines umfassenden IT-Sicherheitskonzepts', 'Geschäftskunden-Services', 999.00, 'Projekt', true, 707),
('DSGVO-Beratung IT', 'IT-seitige Beratung zur DSGVO-Konformität', 'Geschäftskunden-Services', 399.00, 'Projekt', true, 708),
('IT-Inventarisierung', 'Erfassung und Dokumentation aller IT-Systeme', 'Geschäftskunden-Services', 299.00, 'Projekt', true, 709),
('Software-Lizenzmanagement', 'Verwaltung und Optimierung von Software-Lizenzen', 'Geschäftskunden-Services', 199.00, 'Monat', true, 710);

-- =====================================================
-- KATEGORIE: SONSTIGES
-- =====================================================

INSERT INTO public.service_catalog (name, description, category, default_price, unit, is_active, sort_order) VALUES
('Anfahrtspauschale Ansbach', 'Anfahrt innerhalb Ansbach', 'Sonstiges', 0.00, 'pauschal', true, 800),
('Anfahrtspauschale Nürnberg', 'Anfahrt innerhalb Nürnberg', 'Sonstiges', 19.00, 'pauschal', true, 801),
('Anfahrtspauschale Umkreis 25km', 'Anfahrt im Umkreis von 25km', 'Sonstiges', 29.00, 'pauschal', true, 802),
('Anfahrtspauschale Umkreis 50km', 'Anfahrt im Umkreis von 50km', 'Sonstiges', 49.00, 'pauschal', true, 803),
('Express-Service (24h)', 'Bevorzugte Bearbeitung innerhalb 24 Stunden', 'Sonstiges', 49.00, 'pauschal', true, 804),
('Express-Service (Same-Day)', 'Bearbeitung am selben Tag', 'Sonstiges', 99.00, 'pauschal', true, 805),
('Abholung & Rückbringung', 'Kostenlose Abholung und Rückbringung innerhalb Ansbach', 'Sonstiges', 0.00, 'pauschal', true, 806),
('Entsorgung Alt-Hardware (DSGVO)', 'DSGVO-konforme Entsorgung alter IT-Geräte', 'Sonstiges', 19.00, 'Stück', true, 807),
('Notfall-Diagnose (Sofort)', 'Sofortige Diagnose bei dringenden Problemen', 'Sonstiges', 69.00, 'pauschal', true, 808);

-- =====================================================
-- FERTIG!
-- =====================================================
-- Insgesamt wurden über 100 Dienstleistungen und Artikel eingefügt
-- Kategorien:
-- - PC-Reparatur & Wartung (15 Einträge)
-- - Hardware-Verkauf (24 Einträge)
-- - Software & Lizenzen (10 Einträge)
-- - Webdesign & Development (18 Einträge)
-- - IT-Support & Beratung (15 Einträge)
-- - Netzwerk & Server (14 Einträge)
-- - Datenrettung & Backup (9 Einträge)
-- - Geschäftskunden-Services (11 Einträge)
-- - Sonstiges (9 Einträge)
-- =====================================================
