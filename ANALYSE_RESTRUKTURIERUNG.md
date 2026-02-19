# Petasync Website - Strategische Analyse & Restrukturierung

**Datum:** 19. Februar 2026
**Erstellt von:** Senior UX / Conversion / IT-Business Analyse
**Scope:** Vollstaendige Analyse aller Seiten, Preise, Services, Navigation, CTAs

---

## 1. PROBLEM-ZUSAMMENFASSUNG (Top 10)

| # | Problem | Schwere |
|---|---------|---------|
| 1 | **28+ verschiedene Einzelpreise** ohne klare Zuordnung - Kunden muessen sich durch Service-Seiten klicken, um Preise zu finden | Kritisch |
| 2 | **13 von 16 Preisen sind "ab-Preise"** - Kunden wissen nie, was sie tatsaechlich zahlen | Kritisch |
| 3 | **Webdesign-Pakete OHNE Preise** - 4 Pakete, alle "Anfragen" - maximaler Abbruch-Punkt | Kritisch |
| 4 | **Privat/Geschaeft teilen Services** - Netzwerk, IT-Sicherheit, Diagnose tauchen in beiden Bereichen auf, aber auf unterschiedlichen Detail-Seiten | Hoch |
| 5 | **Zu viele Entscheidungspunkte** - Privatkunden sehen 9 Services, jeder mit 3 Tier-Paketen = 27+ Entscheidungen | Hoch |
| 6 | **Kein Entscheidungs-Wizard** - Keine Hilfestellung "Was brauche ich?" fuer Besucher | Hoch |
| 7 | **CTAs sind generisch und identisch** - 19 CTAs, fast alle fuehren zu /kontakt, kein Unterschied in der Nutzerintention | Mittel |
| 8 | **Templates und Webdesign doppelt navigierbar** - /websites, /services/webdesign, /templates - 3 Einstiegspunkte fuer das gleiche Thema | Mittel |
| 9 | **Keine klare Positionierung** auf der Startseite - "Reparatur, Netzwerk, Webdesign - alles aus einer Hand" klingt nach Bauchladen, nicht nach Spezialist | Mittel |
| 10 | **Hourly Rates neben Paketen** - Verwirrt Kunden, ob sie Paket oder Stunde buchen sollen (z.B. PC-Reinigung: 3 Pakete + 30EUR/h Stundensatz) | Mittel |

---

## 2. ANALYSE A) ANGEBOTSSTRUKTUR

### Aktuelle Situation: 14 Service-Seiten + 4 Website-Pakete + 8 Templates

#### Redundanzen und Ueberschneidungen

| Service | Privat | Geschaeft | Problem |
|---------|--------|-----------|---------|
| Netzwerk & WLAN | Ja (ab 45EUR) | Ja (ab 299EUR) | Gleicher Name, verschiedene Preise, verschiedene Seiten |
| IT-Sicherheit | Ja (ab 45EUR) | Ja (ab 299EUR) | Gleicher Name, verschiedene Leistungen |
| Diagnose | Eigene Seite | In IT-Support enthalten | Unklar fuer Geschaeftskunden |
| Webdesign | /services/webdesign | /websites + 4 Unterseiten | 6 Seiten fuer ein Thema |
| Leih-PC | Eigene Seite + Highlight-Section | Eigene Section auf Geschaeftskunden | Doppelt kommuniziert |
| Hardware | PC-Aufruestung + PC-Zusammenbau | Hardware & Workstations | 3 Seiten fuer Hardware-Themen |

#### Entscheidungsueberforderung (Decision Overload)

- **Privatkunden-Seite:** 9 Service-Karten -> Klick auf eine -> 3 Tier-Pakete + Einzelleistungen + Stundensatz = **bis zu 9 Optionen pro Service**
- **Geschaeftskunden-Seite:** 8 Service-Karten -> Klick -> Teilweise Pakete, teilweise nur "ab-Preise"
- **Website-Seite:** 4 Pakete OHNE Preise + 8 Templates + Service-Beschreibungen

**Ergebnis:** Ein Privatkunde, der "seinen PC reparieren lassen" will, muss:
1. Privatkunden anklicken
2. "PC-Reparatur" finden
3. Zwischen 3 Paketen (29EUR, 49EUR, 59EUR) waehlen
4. ODER eine von 6 Einzelleistungen (ab 35EUR - ab 89EUR) waehlen
5. ODER den Stundensatz (30EUR/h) waehlen
= **10 Optionen** fuer "Ich will meinen PC repariert haben"

### Empfohlene neue Angebotsarchitektur

#### Privatkunden: 3 Hauptkategorien statt 9 Services

| Kategorie | Enthaltene Leistungen | Preisstrategie |
|-----------|----------------------|----------------|
| **PC-Reparatur & Wartung** | Diagnose, Reparatur, Reinigung, Aufruestung | 3 Festpreis-Pakete |
| **Daten & Sicherheit** | Datenrettung, Virenentfernung, Backup, Firewall | 3 Festpreis-Pakete |
| **Neuer PC & Netzwerk** | Zusammenbau, WLAN-Setup, Smart Home | 3 Festpreis-Pakete |

**Leih-PC** bleibt als USP-Banner auf allen Privatkunden-Seiten (kein eigener Service).

#### Geschaeftskunden: 3 Hauptkategorien statt 8 Services

| Kategorie | Enthaltene Leistungen | Preisstrategie |
|-----------|----------------------|----------------|
| **IT-Betreuung** | Support, Helpdesk, Managed Services, Wartung | 3 monatliche Pakete |
| **Infrastruktur & Sicherheit** | Server, Netzwerk, Cloud, Firewall, VPN | Projektbasiert + Managed |
| **Beratung & Strategie** | IT-Strategie, Digitalisierung, DSGVO, Audit | Tagesatz / Projektpreis |

#### Webdesign: Klare 4-Stufen-Trennung (bleibt)

Template -> Starter -> Business -> Enterprise (aber MIT Preisen)

---

## 3. ANALYSE B) PREISSTRUKTUR

### Aktuelle Preistabelle mit Verstaendlichkeitsbewertung

#### Privatkunden-Services

| Service | Preis | Typ | Verstaendlichkeit (1-10) | Problem |
|---------|-------|-----|--------------------------|---------|
| Diagnose Express | Kostenlos | Fest | 9/10 | Gut, aber "bei Auftrag" irritiert |
| Diagnose Standard | 19EUR | Fest | 7/10 | Warum zahlen, wenn Express kostenlos? |
| Diagnose Premium | 39EUR | Fest | 5/10 | Zu viele Diagnose-Stufen |
| PC Reinigung Basis | 25EUR | Fest | 8/10 | OK |
| PC Reinigung Premium | 45EUR | Fest | 7/10 | Namensueberschneidung mit IT-Sicherheit Premium |
| PC Reinigung Wartung | 69EUR | Fest | 6/10 | Ist das Reinigung oder Wartung? |
| PC Reinigung Stunde | 30EUR/h | Stunde | 3/10 | Wann waehlt man Stunde statt Paket? |
| PC Reparatur Basis | 29EUR | Fest | 5/10 | "Basis-Wartung" - ist das Wartung oder Reparatur? |
| PC Reparatur Premium | 49EUR | Fest | 5/10 | "Premium-Wartung" - verwirrend |
| PC Reparatur Neustart | 59EUR | Fest | 6/10 | "Neustart-Paket" - Windows-Reset? |
| Display-Reparatur | ab 59EUR + Teile | Ab-Preis | 3/10 | Endpreis unbekannt |
| Festplatten-Probleme | ab 45EUR + Hardware | Ab-Preis | 2/10 | Doppelte Unklarheit |
| Ueberhitzung | 45EUR | Fest | 8/10 | Einziger klarer Reparaturpreis |
| Akku-Wechsel | ab 35EUR + Akku | Ab-Preis | 3/10 | Gesamtkosten unklar |
| Mainboard-Reparatur | ab 89EUR | Ab-Preis | 3/10 | Kann alles kosten |
| Tastatur-Reparatur | ab 49EUR + Teile | Ab-Preis | 3/10 | Endpreis unbekannt |
| PC Reparatur Stunde | 30EUR/h + Material | Stunde | 2/10 | Voellig unklar |
| Datenrettung Express | 39EUR | Fest | 7/10 | Nur Analyse, keine Rettung |
| Datenrettung Standard | ab 89EUR | Ab-Preis | 4/10 | "Ab" bei Datenrettung = Angst |
| Datenrettung Premium | ab 199EUR | Ab-Preis | 3/10 | Kann sehr teuer werden |
| Backup einrichten | 45EUR | Fest | 8/10 | Klar |
| IT-Sicherheit Basis | 45EUR | Fest | 7/10 | OK |
| IT-Sicherheit Premium | 69EUR | Fest | 6/10 | Namensueberschneidung |
| IT-Sicherheit Paket | 89EUR | Fest | 6/10 | "Sicherheits-Paket" vs "Premium"? |
| Einzeln: Antivirus | 29EUR | Fest | 8/10 | Klar |
| Einzeln: Firewall | 39EUR | Fest | 7/10 | OK |
| Einzeln: Ransomware | ab 149EUR | Ab-Preis | 2/10 | Angst-Preis |
| PC Upgrade Office | ab 249EUR | Ab-Preis | 5/10 | Inkl. Hardware? |
| PC Upgrade Gaming | ab 449EUR | Ab-Preis | 5/10 | Inkl. Hardware? |
| PC Upgrade Premium | ab 699EUR | Ab-Preis | 5/10 | Inkl. Hardware? |
| SSD-Upgrade | 45EUR + SSD | Fest + | 4/10 | Was kostet SSD? |
| RAM-Erweiterung | 25EUR + RAM | Fest + | 4/10 | Was kostet RAM? |
| GPU-Einbau | 29EUR + GPU | Fest + | 4/10 | Was kostet GPU? |
| CPU-Wechsel | 59EUR + CPU | Fest + | 4/10 | Was kostet CPU? |
| PC Zusammenbau Basic | 69EUR | Fest | 8/10 | Klar - nur Arbeit |
| PC Zusammenbau Premium | 99EUR | Fest | 7/10 | Klar |
| PC Zusammenbau Komplett | ab 349EUR | Ab-Preis | 5/10 | Inkl. Hardware? |
| Netzwerk WLAN | ab 45EUR | Ab-Preis | 4/10 | Privat vs Geschaeft unklar |
| Leih-PC | Kostenlos | Fest | 10/10 | Perfekt |

**Durchschnittliche Verstaendlichkeit Privatkunden: 5.2/10**

#### Geschaeftskunden-Services

| Service | Preis | Typ | Verstaendlichkeit (1-10) |
|---------|-------|-----|--------------------------|
| IT-Support Basic | 99EUR/Monat | Abo | 7/10 |
| IT-Support Business | 199EUR/Monat | Abo | 7/10 |
| IT-Support Premium | 399EUR/Monat | Abo | 7/10 |
| Remote-Support | 50EUR/h | Stunde | 6/10 |
| Vor-Ort-Service | 75EUR/h | Stunde | 6/10 |
| Notfall-Service | 120EUR/h | Stunde | 5/10 |
| Managed Workplace | 35EUR/User/Monat | Abo | 6/10 |
| Managed Server | 149EUR/Server/Monat | Abo | 6/10 |
| Managed Network | 199EUR/Monat | Abo | 6/10 |
| Komplett-Paket 5-10 MA | ab 499EUR/Monat | Ab-Preis | 4/10 |
| Server-Einrichtung | ab 299EUR | Ab-Preis | 4/10 |
| Netzwerk-Installation | ab 399EUR | Ab-Preis | 4/10 |
| Cloud-Migration | ab 599EUR | Ab-Preis | 3/10 |
| Backup-System | ab 199EUR | Ab-Preis | 4/10 |
| Virtualisierung | ab 499EUR | Ab-Preis | 3/10 |
| Storage-Loesungen | ab 299EUR | Ab-Preis | 3/10 |
| Office 365 Migration | 49EUR/User | Fest | 7/10 |
| Cloud-Server Setup | ab 399EUR | Ab-Preis | 3/10 |
| Hybrid-Cloud | ab 999EUR | Ab-Preis | 2/10 |
| WLAN-Setup Paket | 299EUR | Fest | 7/10 |
| Netzwerk-Infrastruktur | 599EUR | Fest | 7/10 |
| Enterprise-Netzwerk | ab 1.299EUR | Ab-Preis | 4/10 |
| IT-Sicherheit | ab 299EUR | Ab-Preis | 3/10 |
| IT-Beratung | 89EUR/h | Stunde | 7/10 |
| IT-Strategie Workshop | 499EUR/Tag | Fest | 8/10 |
| Security-Audit | ab 799EUR | Ab-Preis | 4/10 |
| DSGVO-Beratung | ab 599EUR | Ab-Preis | 4/10 |
| Hardware | ab 69EUR | Ab-Preis | 3/10 |

**Durchschnittliche Verstaendlichkeit Geschaeftskunden: 4.9/10**

#### Website-Pakete

| Paket | Preis | Verstaendlichkeit (1-10) |
|-------|-------|--------------------------|
| Template | Nicht angegeben | 1/10 |
| Starter | Nicht angegeben | 1/10 |
| Business | Nicht angegeben | 1/10 |
| Enterprise | Nicht angegeben | 1/10 |

**Durchschnittliche Verstaendlichkeit Websites: 1/10** - Katastrophal

### Vorschlag: Neue Paketpreise

#### Privatkunden - 3 Pakete pro Kategorie

**Kategorie: PC-Service**

| Paket | Preis | Inklusiv-Leistungen |
|-------|-------|---------------------|
| **Schnell-Check** | 49EUR | Diagnose + Reinigung + Software-Check + Leih-PC |
| **Reparatur Komplett** | 99EUR | Diagnose + Reparatur (Software) + Reinigung + Updates + Leih-PC. Hardware-Teile separat, vorher Kostenvoranschlag |
| **Rundum-Sorglos** | 149EUR | Diagnose + Reparatur + Reinigung + Sicherheits-Setup + Backup + 30 Tage Nachsorge + Leih-PC |

**Kategorie: Daten & Sicherheit**

| Paket | Preis | Inklusiv-Leistungen |
|-------|-------|---------------------|
| **Sicherheits-Basics** | 59EUR | Virenscan + Entfernung + Antivirus + Browser-Sicherheit |
| **Daten-Rettung** | 129EUR | Analyse + Datenrettung (logisch, bis 500GB) + Backup-Einrichtung |
| **Komplett-Schutz** | 199EUR | Alles aus Sicherheit + VPN + Passwort-Manager + Backup + 1h Schulung |

**Kategorie: Neuer PC / Netzwerk**

| Paket | Preis | Inklusiv-Leistungen |
|-------|-------|---------------------|
| **WLAN-Fit** | 79EUR | Router-Check + Optimierung + Sicherheits-Setup |
| **PC nach Mass** | 99EUR Arbeit + Hardware | Beratung + Zusammenbau + Windows + Treiber + Test |
| **Heim-Komplett** | 199EUR + Hardware | PC-Zusammenbau + Netzwerk-Setup + Sicherheit + Einweisung |

#### Geschaeftskunden - 3 Hauptpakete

| Paket | Preis | Fuer wen | Inklusiv |
|-------|-------|----------|----------|
| **Starter** | 149EUR/Monat | 1-5 Mitarbeiter | 3h Support/Monat, Remote + Vor-Ort, Monitoring, Leih-PC, Ticket-System |
| **Business** | 349EUR/Monat | 5-15 Mitarbeiter | 8h Support/Monat, Managed Workplace, Backup, Sicherheit, 4h Reaktionszeit |
| **Enterprise** | 699EUR/Monat | 15+ Mitarbeiter | Unlimitierter Support, 24/7, SLA 2h, Dedizierter Ansprechpartner, Quartals-Checks |

**Zusatzmodule** (klar definiert, monatlich zubuchbar):
- Managed Server: +149EUR/Server
- Cloud-Verwaltung: +49EUR/User
- DSGVO-Betreuung: +99EUR/Monat

**Einmalige Projekte** (Festpreise statt ab-Preise):
- Netzwerk-Setup (bis 10 Arbeitsplaetze): 599EUR
- Server-Einrichtung (Standard): 499EUR
- Cloud-Migration (Office 365, bis 10 User): 490EUR
- Security-Audit: 899EUR

#### Website-Pakete (MIT Preisen)

| Paket | Preis | Fuer wen |
|-------|-------|----------|
| **Template** | 490EUR | Wer schnell online sein will. Fertiges Design, Ihre Inhalte, 5 Seiten, 5-7 Tage |
| **Starter** | 990EUR | Selbstaendige & kleine Unternehmen. Individuelles Design, 5 Seiten, 1 Monat Support |
| **Business** | 1.990EUR | Wachsende Unternehmen. Premium Design, 10 Seiten, CMS, Blog, SEO, 3 Monate Support |
| **Enterprise** | ab 3.990EUR | Komplexe Projekte. Unbegrenzt, E-Commerce, API, 12 Monate Support |

> **Hinweis:** Die genannten Website-Preise sind Empfehlungen basierend auf dem lokalen Markt (Ansbach/Nuernberg Region) und typischen Freelancer/Agentur-Raten fuer vergleichbare Leistungen. Die tatsaechlichen Preise muessen an die Kalkulation von Petasync angepasst werden.

---

## 4. ANALYSE C) ZIELGRUPPEN-TRENNUNG

### Aktuelle Bewertung

| Kriterium | Bewertung | Details |
|-----------|-----------|---------|
| Klare Privat/Geschaeft-Trennung | 6/10 | Navigation trennt, aber Service-Seiten mischen |
| Webdesign abgegrenzt | 4/10 | 3 Einstiegspunkte (/websites, /services/webdesign, /templates) |
| Sprache zielgruppengerecht | 7/10 | Privat: "Ihr Zuhause", Geschaeft: "Ihr Unternehmen" |
| Preise zielgruppengerecht | 5/10 | Geschaeftskunden sehen gleiche Services wie Privat |
| Navigation intuitiv | 5/10 | 6 Hauptpunkte + 14 Service-Unterseiten + 4 Website-Unterseiten + 8 Templates |

### Vermischungen

1. `/services/netzwerk` - Fuer wen? Privat (WLAN zuhause) oder Geschaeft (Enterprise-Netzwerk)?
2. `/services/it-sicherheit` - Gleiche Seite fuer Privatperson (Virenentfernung) und Firma (Endpoint-Protection)?
3. `/services/webdesign` - Konkurriert mit `/websites` als Einstiegspunkt
4. Templates erscheinen auf Homepage fuer alle Zielgruppen, sind aber nur fuer Webdesign-Kunden relevant

### Empfohlene Navigationsstruktur

```
HAUPTNAVIGATION (5 Punkte statt 6)

  Start  |  Privatkunden  |  Geschaeftskunden  |  Webdesign  |  Kontakt

PRIVATKUNDEN (Dropdown/Unterseiten):
  - PC-Service (Diagnose, Reparatur, Reinigung, Aufruestung)
  - Daten & Sicherheit (Datenrettung, Virenschutz, Backup)
  - Neuer PC & Netzwerk (Zusammenbau, WLAN-Setup)
  - [Leih-PC Banner auf allen Unterseiten]

GESCHAEFTSKUNDEN (Dropdown/Unterseiten):
  - IT-Betreuung (Support, Managed Services, Helpdesk)
  - Infrastruktur (Server, Netzwerk, Cloud)
  - Beratung (Strategie, DSGVO, Digitalisierung)

WEBDESIGN (Dropdown/Unterseiten):
  - Pakete (Template, Starter, Business, Enterprise)
  - Branchen-Templates (8 Vorschau-Templates)
  - Referenzen (zukuenftig)

KONTAKT:
  - Kontaktformular
  - FAQ (als Accordion auf Kontakt-Seite)
```

### Neue Seitenhierarchie

```
/                           Startseite
/privatkunden               Uebersicht Privatkunden (3 Kategorien)
/privatkunden/pc-service     PC-Reparatur, Diagnose, Reinigung, Aufruestung
/privatkunden/sicherheit     Datenrettung, Virenschutz, Backup
/privatkunden/netzwerk       WLAN, PC-Zusammenbau, Smart Home
/geschaeftskunden            Uebersicht Geschaeftskunden (3 Pakete)
/geschaeftskunden/betreuung  IT-Support, Managed Services
/geschaeftskunden/infrastruktur  Server, Netzwerk, Cloud
/geschaeftskunden/beratung   IT-Strategie, DSGVO, Audit
/webdesign                   Uebersicht + 4 Pakete mit Preisen
/webdesign/templates         Template-Galerie
/webdesign/templates/:id     Einzelne Template-Vorschau
/kontakt                     Kontakt + FAQ
/impressum                   Impressum
/datenschutz                 Datenschutz
```

**Reduktion:** Von 30+ oeffentlichen Routen auf 15 Hauptrouten.

### Empfohlene Landingpages

| Landingpage | Ziel | Keyword |
|-------------|------|---------|
| /privatkunden/pc-service | Privatkunden mit PC-Problemen | "PC Reparatur Ansbach" |
| /geschaeftskunden | Firmen die IT-Partner suchen | "IT Service Unternehmen Ansbach" |
| /webdesign | Firmen die Website brauchen | "Webdesign Ansbach" |
| /webdesign/templates | Budget-bewusste Kunden | "Guenstige Website erstellen" |

---

## 5. ANALYSE D) CONVERSION-OPTIMIERUNG

### Aktuelle CTA-Analyse

| CTA-Text | Haeufigkeit | Problem |
|----------|-------------|---------|
| "Kontakt" / "Jetzt Kontakt aufnehmen" | 5x | Generisch, kein Versprechen |
| "Termin vereinbaren" | 3x | Besser, aber "Termin" klingt nach Zeitaufwand |
| "Kostenloses Erstgespraech" / "Kostenlose Beratung" | 4x | Gut, aber zu haeufig und identisch |
| "Jetzt anrufen" | 4x | Gut fuer Mobile, aber kein Online-Alternative |
| "Anfragen" (Website-Pakete) | 4x | Schwach - "Anfragen" ist passiv und unverbindlich |
| "WhatsApp schreiben" | 2x | Gut als niedrigschwelliger Kanal |
| "Mehr erfahren" | Mehrfach | Sagt nichts aus |
| "Alle Templates ansehen" | 1x | OK fuer Exploration |

**Hauptproblem:** Fast alle CTAs fuehren zu /kontakt (generisches Formular). Kein Unterschied ob jemand:
- Einen PC reparieren lassen will
- Eine Website braucht
- IT-Support fuer seine Firma sucht

### Neue CTA-Formulierungen

| Kontext | Alter CTA | Neuer CTA | Grund |
|---------|-----------|-----------|-------|
| Privat Hero | "Termin vereinbaren" | "PC-Problem melden" | Niedrigschwelliger, beschreibt Aktion |
| Geschaeft Hero | "Beratungsgespraech vereinbaren" | "IT-Check anfragen (kostenlos)" | Konkretes Angebot statt vager Termin |
| Website-Pakete | "Anfragen" | "Dieses Paket waehlen" | Entscheidung bestaetigen statt fragen |
| Homepage Primary | "Kostenlose Beratung" | "Was brauchen Sie? (30 Sek.)" | Leitet zum Wizard |
| Homepage Secondary | "Fuer Privatkunden" | "Ich bin Privatkunde" | Selbst-Identifikation |
| Service-Seiten | "Mehr erfahren" | "Preise & Pakete sehen" | Verspricht konkreten Wert |
| Bottom CTA ueberall | "Jetzt Kontakt aufnehmen" | "Jetzt unverbindlich anfragen" | "Unverbindlich" reduziert Hemmschwelle |

### Vorschlag: Entscheidungs-Wizard ("Was brauchen Sie?")

**Implementierung als Modal oder eigene Route `/start`**

```
Schritt 1: "Wer sind Sie?"
  [ ] Privatperson
  [ ] Unternehmen
  [ ] Ich brauche eine Website

Schritt 2a (Privatperson): "Was ist Ihr Problem?"
  [ ] Mein PC ist langsam oder kaputt
  [ ] Ich habe Daten verloren
  [ ] Ich brauche einen neuen PC
  [ ] Ich habe ein Virus/Sicherheitsproblem
  [ ] Mein WLAN funktioniert nicht richtig

Schritt 2b (Unternehmen): "Was brauchen Sie?"
  [ ] Laufende IT-Betreuung
  [ ] Einmaliges Projekt (Server, Netzwerk, Cloud)
  [ ] IT-Beratung & Strategie

Schritt 2c (Website): "Was fuer eine Website?"
  [ ] Einfach & guenstig (Template)
  [ ] Individuell fuer mein Business (Starter/Business)
  [ ] Komplex mit Shop/Funktionen (Enterprise)

Schritt 3: Ergebnis
  -> Zeigt passendes Paket + Preis + "Jetzt buchen" Button
  -> Optional: Name + Telefon fuer Rueckruf in 2h
```

**Erwarteter Effekt:** 40-60% weniger Abspruenge auf der Startseite, weil Besucher sofort zum passenden Angebot gefuehrt werden.

### Funnel-Struktur

```
AWARENESS (Google/Empfehlung)
    |
    v
HOMEPAGE -> Wizard -> Passendes Paket
    |                      |
    v                      v
Zielgruppen-Seite    Kontaktformular (vorbefuellt)
    |                      |
    v                      v
Service-Detail        Rueckruf / Termin
    |                      |
    v                      v
Kontakt (letzter     Auftrag
Ausweg)
```

**Aktueller Funnel (problematisch):**
```
Homepage -> Privat/Geschaeft -> 8-9 Services -> Service-Detail -> Kontakt
(5 Klicks bis zur Conversion, 2-3 waeren optimal)
```

---

## 6. ANALYSE E) PSYCHOLOGISCHE BEWERTUNG

### Spezialisiert oder beliebig?

**Bewertung: 4/10 - Tendenz "Bauchladen"**

Die Homepage kommuniziert: "Reparatur, Netzwerk, Webdesign - alles aus einer Hand"
- Das ist ein **Generalist-Statement**, kein Spezialist-Statement
- 14 verschiedene Services verstaerken diesen Eindruck
- Die 3D-Animationen und Templates wirken technisch beeindruckend, aber erzeugen den Eindruck einer Design-Agentur, nicht eines IT-Dienstleisters
- Der Leih-PC-Service ist ein **echter Differentiator**, wird aber nicht prominent genug als USP genutzt

**Empfehlung:** Positionierung als "Ihr lokaler IT-Partner" mit klarem Fokus auf:
1. Schnelle Hilfe bei PC-Problemen (Privat)
2. Zuverlaessige IT-Betreuung (Geschaeft)
3. Professionelle Websites (Webdesign)

### Vertrauensaufbau

**Bewertung: 6/10**

| Vertrauenselement | Vorhanden | Bewertung |
|-------------------|-----------|-----------|
| Google-Bewertung (5.0) | Ja | Gut, aber nur als Zahl, keine Zitate |
| "500+ Kunden" | Ja | Gut, aber keine Details |
| Referenzen/Case Studies | Nein | Fehlt komplett |
| Echte Kundenstimmen | Nein | Fehlt komplett |
| Team-Vorstellung | Nein | Fehlt - wer steckt hinter Petasync? |
| Zertifizierungen | Nein | Fehlt |
| "Bekannt aus" / Partner-Logos | Nein | Fehlt |
| Garantie-Versprechen | Teilweise | 12 Monate bei PC-Zusammenbau, sonst nichts |
| Reaktionszeit-Garantie | Nur bei Business | Sollte prominenter sein |

**Kritischer Mangel:** Keine einzige echte Kundenstimme auf der gesamten Website.

### Preispositionierung

**Bewertung: 5/10**

- Privatkunden-Preise sind im mittleren Segment (fair fuer die Region)
- Geschaeftskunden-Preise sind kompetitiv
- Website-Preise FEHLEN komplett = **Vertrauensbruch** ("Die wollen erstmal meine Kontaktdaten, bevor sie mir sagen, was es kostet")
- "ab-Preise" erzeugen Misstrauen ("ab 89EUR koennen auch 500EUR werden")
- Stundensaetze neben Paketen verwirren ("Soll ich das Paket oder die Stunde nehmen?")

### Positionierungsklarheit

**Bewertung: 5/10**

- Lokaler Bezug (Ansbach/Nuernberg) ist gut
- "Alles aus einer Hand" ist eine schwache Positionierung
- Leih-PC-Service ist ein starker Differentiator, wird aber nicht als zentrale Botschaft genutzt
- 8 Branchen-Templates sind beeindruckend, koennen aber den Fokus verwischen

---

## 7. NEUE EMPFOHLENE ANGEBOTSSTRUKTUR (Zusammenfassung)

### 3-Sauelen-Modell

```
         PETASYNC
         /  |  \
        /   |   \
       /    |    \
  PRIVAT  BUSINESS  WEBDESIGN
   |        |         |
   3        3         4
 Pakete   Pakete    Pakete
```

### Privatkunden: 3 Service-Bereiche x 3 Pakete = 9 klare Optionen

**PC-Service:**
- Schnell-Check (49EUR)
- Reparatur Komplett (99EUR)
- Rundum-Sorglos (149EUR)

**Daten & Sicherheit:**
- Sicherheits-Basics (59EUR)
- Daten-Rettung (129EUR)
- Komplett-Schutz (199EUR)

**Neuer PC & Netzwerk:**
- WLAN-Fit (79EUR)
- PC nach Mass (99EUR + Hardware)
- Heim-Komplett (199EUR + Hardware)

### Geschaeftskunden: 3 monatliche Pakete + Zusatzmodule

- Starter (149EUR/Monat fuer 1-5 MA)
- Business (349EUR/Monat fuer 5-15 MA)
- Enterprise (699EUR/Monat fuer 15+ MA)

### Webdesign: 4 Stufen mit klaren Preisen

- Template (490EUR)
- Starter (990EUR)
- Business (1.990EUR)
- Enterprise (ab 3.990EUR)

---

## 8. BEISPIEL-STARTSEITENSTRUKTUR

### Optimierter Aufbau

```
SECTION 1: HERO
- Headline: "IT-Probleme? Wir loesen das."
- Sub: "PC-Reparatur, IT-Betreuung & Webdesign - Ihr lokaler Partner in Ansbach & Nuernberg"
- USP-Leiste: "Kostenloser Leih-PC | Festpreise | Vor-Ort in 24h"
- CTA Primary: "Was brauchen Sie?" (oeffnet Wizard)
- CTA Secondary: "Sofort anrufen: 0163 711 7198"
- Trust: "5.0 Google | 500+ Kunden | Seit [Jahr]"

SECTION 2: WIZARD / SCHNELLWAHL (NEU)
- 3 grosse Karten:
  [Privatkunde]     [Unternehmen]     [Website]
  "PC kaputt?"      "IT laeuft        "Online
                     nicht rund?"      praesent?"
  -> /privatkunden   -> /geschaeft     -> /webdesign

SECTION 3: TOP-PAKETE (NEU - statt Feature-Showcase)
- "Unsere beliebtesten Pakete"
- 3 Karten nebeneinander:
  [PC Reparatur     [IT-Betreuung     [Business
   Komplett 99EUR]   ab 149EUR/Mon]    Website 1.990EUR]
- Jeweils 3-4 Bullet Points + CTA

SECTION 4: VERTRAUEN (erweitert)
- "Warum Petasync?"
- Leih-PC USP gross dargestellt
- 2-3 echte Kundenstimmen (Google-Bewertungen einbinden)
- Zahlen: 500+ Kunden, 5.0 Google, 24h Express, X Jahre Erfahrung

SECTION 5: SO FUNKTIONIERT'S
- 3 Schritte: Problem melden -> Diagnose (kostenlos) -> Loesung
- Einfach, visuell, vertrauensbildend

SECTION 6: LOKALER BEZUG
- "IT-Service in Ihrer Naehe"
- Karte mit Einzugsgebiet
- Staedteliste

SECTION 7: FINAL CTA
- "Bereit? Melden Sie sich - wir kuemmern uns um den Rest."
- Telefon | WhatsApp | Kontaktformular
- "Kostenlose Erstberatung - garantiert unverbindlich"
```

---

## 9. KLARE TO-DO-LISTE ZUR UMSETZUNG

### Phase 1: Quick Wins (Hoechste Prioritaet)

| # | Aufgabe | Auswirkung |
|---|---------|-----------|
| 1.1 | **Preise auf Website-Pakete setzen** - Template: 490EUR, Starter: 990EUR, Business: 1.990EUR, Enterprise: ab 3.990EUR | Conversion-Killer #1 behoben |
| 1.2 | **CTA-Texte aendern** - "Anfragen" -> "Dieses Paket waehlen", "Mehr erfahren" -> "Preise sehen" | Sofortige Conversion-Verbesserung |
| 1.3 | **Stundensaetze von Privatkunden-Seiten entfernen** - Nur Pakete zeigen | Weniger Verwirrung |
| 1.4 | **"ab" reduzieren** - Wo moeglich Festpreise oder Preisspannen ("89-149EUR") statt "ab 89EUR" | Mehr Vertrauen |
| 1.5 | **FAQ auf Kontakt-Seite integrieren** - Separate FAQ-Seite aufloesen | Ein Navigationspunkt weniger |

### Phase 2: Strukturelle Aenderungen

| # | Aufgabe | Auswirkung |
|---|---------|-----------|
| 2.1 | **Privatkunden-Services auf 3 Kategorien reduzieren** - 9 Service-Cards -> 3 Kategorie-Cards mit je 3 Paketen | Klare Entscheidungslogik |
| 2.2 | **Geschaeftskunden-Services auf 3 Pakete + Module umstellen** | Vergleichbarkeit, schnellere Entscheidung |
| 2.3 | **/services/webdesign mit /websites zusammenlegen** | Keine doppelte Navigation |
| 2.4 | **Navigation auf 5 Punkte reduzieren** (Start, Privat, Geschaeft, Webdesign, Kontakt) | Klarere Orientierung |
| 2.5 | **Entscheidungs-Wizard implementieren** | Conversion-Boost |

### Phase 3: Vertrauensaufbau

| # | Aufgabe | Auswirkung |
|---|---------|-----------|
| 3.1 | **Google-Bewertungen einbinden** (als Zitate, nicht nur Zahl) | Social Proof |
| 3.2 | **Team-Seite / "Ueber uns" erstellen** | Persoenlichkeit, Vertrauen |
| 3.3 | **Referenzen / Case Studies hinzufuegen** (auch nur 2-3) | Glaubwuerdigkeit |
| 3.4 | **Garantie-Versprechen formulieren** ("Festpreis-Garantie", "Zufriedenheitsgarantie") | Risiko-Reduktion |

### Phase 4: Homepage-Optimierung

| # | Aufgabe | Auswirkung |
|---|---------|-----------|
| 4.1 | **Hero-Text aendern** - Weg von "alles aus einer Hand", hin zu Problem-Loesung | Klarere Positionierung |
| 4.2 | **Schnellwahl-Section implementieren** (3 Karten: Privat/Geschaeft/Web) | Sofortige Orientierung |
| 4.3 | **Top-Pakete Section** statt Feature-Showcase | Direkte Conversion-Moeglichkeit |
| 4.4 | **Templates-Promo von Homepage reduzieren** - Nur unter Webdesign relevant | Fokus auf Kernbotschaft |

---

## 10. PRIORISIERUNG

### Sofort aendern (diese Woche)

1. **Website-Pakete: Preise hinzufuegen** -> Groesster Conversion-Hebel
2. **CTA-Texte ueberarbeiten** -> 30 Minuten Arbeit, sofortiger Effekt
3. **Stundensaetze von Privatkunden entfernen** -> Weniger Verwirrung

### Kurzfristig (1-2 Wochen)

4. **Privatkunden: 9 Services -> 3 Kategorien** mit je 3 Paketen
5. **Navigation vereinfachen** (6 -> 5 Punkte, FAQ integrieren)
6. **"ab-Preise" durch Festpreise oder Spannen ersetzen**

### Mittelfristig (3-4 Wochen)

7. **Entscheidungs-Wizard bauen**
8. **Homepage umstrukturieren** (Hero + Schnellwahl + Pakete + Vertrauen)
9. **Geschaeftskunden: 3 klare monatliche Pakete**

### Langfristig (1-2 Monate)

10. **Google-Bewertungen & Testimonials integrieren**
11. **Routing-Struktur vereinfachen** (30 -> 15 Routen)
12. **Team/Ueber-uns-Seite erstellen**

---

## 11. OPTIONALES 3-STUFEN-PREISMODELL

### Privatkunden

| | Basic | Standard | Premium |
|---|-------|----------|---------|
| **PC-Service** | Schnell-Check 49EUR | Reparatur 99EUR | Rundum-Sorglos 149EUR |
| **Sicherheit** | Basics 59EUR | Datenrettung 129EUR | Komplett-Schutz 199EUR |
| **Setup** | WLAN-Fit 79EUR | PC nach Mass 99EUR+ | Heim-Komplett 199EUR+ |

### Geschaeftskunden

| | Starter | Business | Enterprise |
|---|---------|----------|------------|
| **Preis** | 149EUR/Monat | 349EUR/Monat | 699EUR/Monat |
| **Mitarbeiter** | 1-5 | 5-15 | 15+ |
| **Support-Stunden** | 3h/Monat | 8h/Monat | Unlimitiert |
| **Reaktionszeit** | 24h | 4h | 2h (SLA) |
| **Remote** | Ja | Ja | Ja |
| **Vor-Ort** | Nach Bedarf | Inklusive | Inklusive |
| **Monitoring** | Basis | Erweitert | 24/7 |
| **Leih-PC** | Ja | Ja | Ja |
| **Managed Workplace** | - | 35EUR/User zzgl. | Inklusive |
| **Dedizierter Kontakt** | - | - | Ja |

### Webdesign

| | Template | Starter | Business | Enterprise |
|---|----------|---------|----------|------------|
| **Preis** | 490EUR | 990EUR | 1.990EUR | ab 3.990EUR |
| **Design** | Vorlage | Individuell | Premium | Komplett individuell |
| **Seiten** | 5 | 5 | 10 | Unbegrenzt |
| **CMS** | - | - | Ja | Ja |
| **Blog** | - | - | Ja | Ja |
| **SEO** | Basis | Basis | Erweitert | Premium |
| **Support** | - | 1 Monat | 3 Monate | 12 Monate |
| **E-Commerce** | - | - | - | Moeglich |
| **Lieferzeit** | 5-7 Tage | 2-3 Wochen | 4-6 Wochen | Nach Aufwand |

---

## FAZIT

Die Website von Petasync hat eine **solide technische Basis** (React, 3D-Animationen, responsive Design) und bietet **echten Mehrwert** (Leih-PC, lokaler Service, breites Portfolio). Das Hauptproblem ist nicht das Angebot selbst, sondern dessen **Praesentation und Strukturierung**.

Die drei wichtigsten Hebel fuer sofortige Verbesserung:

1. **Preise auf Webdesign-Pakete** - Aktuell der groesste Conversion-Killer
2. **Services buendeln** - Von 14 Einzelseiten auf 6-9 klare Kategorien
3. **Entscheidungshilfe bieten** - Wizard statt "suchen Sie sich was aus"

Die vorgeschlagene Restrukturierung reduziert die Komplexitaet um ca. 60% bei gleichem Leistungsumfang. Der Kunde sieht weniger, versteht mehr und entscheidet schneller.
