# 🎨 Branding System - Setup Anleitung

## Übersicht

Das Branding-System ermöglicht es dir, Logos und Farben für deine Marke zu verwalten und automatisch in PDFs, E-Mails und auf der Website zu verwenden.

## 🚀 Einrichtung

### 1. Supabase Storage einrichten

**WICHTIG:** Du musst einen Storage-Bucket in Supabase erstellen!

#### Schritte:

1. Gehe zu https://supabase.com/dashboard
2. Öffne dein Projekt: **opikfukjwoiczdwiedtx**
3. Klicke links auf **Storage**
4. Klicke auf **"New bucket"**
5. Benenne den Bucket: `public`
6. **Aktiviere** "Public bucket" (wichtig!)
7. Klicke **Create bucket**

#### Bucket-Einstellungen:
- **Name:** `public`
- **Public:** ✅ Ja (Häkchen setzen!)
- **File size limit:** 5 MB (Standard)
- **Allowed MIME types:** Leer lassen (alle Bilder erlauben)

### 2. Logos hochladen

Nachdem der Storage-Bucket erstellt wurde:

1. Gehe zu **Branding** im Admin-Panel
2. Lade deine Logos hoch:
   - **Haupt-Logo:** Für Rechnungen, PDFs, Header
   - **Logo Icon:** Quadratisch, für Favicons
   - **Logo Dark:** Version für helle Hintergründe
   - **Logo Light:** Weiße Version für dunkle Hintergründe

## 📐 Logo-Formate

### Empfohlene Formate:

**1. SVG (BESTE WAHL!)**
- Skaliert perfekt auf jede Größe
- Kleine Dateigröße
- Keine Qualitätsverluste

**2. PNG**
- Mit transparentem Hintergrund
- Größen: 500px, 1000px breit
- Für Rechnungen und E-Mails

**3. JPG**
- Nur wenn PNG zu groß wird
- Größen: 500px, 1000px breit

### Benötigte Varianten:

#### Haupt-Logo (Horizontal)
```
Dateinamen-Empfehlung:
- logo.svg (Vektor, beste Wahl)
- logo-500.png (500px breit)
- logo-1000.png (1000px breit)
```

**Verwendung:**
- Website Header
- PDF-Rechnungen
- PDF-Angebote
- E-Mail-Signaturen

#### Logo Icon (Quadratisch)
```
Dateinamen-Empfehlung:
- logo-icon.svg
- logo-icon-250.png (250x250px)
- logo-icon-500.png (500x500px)
```

**Verwendung:**
- Favicon
- App-Icons
- Social Media Profilbilder

#### Logo Dark (Für helle Hintergründe)
```
Dateinamen-Empfehlung:
- logo-dark.svg
- logo-dark-500.png
```

#### Logo Light (Für dunkle Hintergründe)
```
Dateinamen-Empfehlung:
- logo-light.svg
- logo-light-500.png
```

### Größenempfehlungen:

| Verwendung | Breite | Format | Transparent |
|------------|--------|--------|-------------|
| Website Header | 500-800px | SVG/PNG | Ja |
| PDF Rechnung | 800-1000px | SVG/PNG | Optional |
| Favicon | 256x256px | PNG | Ja |
| Social Media | 500x500px | PNG | Optional |
| Print | 1600px+ | SVG | Optional |

## 🎨 Farben einrichten

Im Branding-Panel kannst du drei Hauptfarben festlegen:

**1. Primärfarbe**
- Hauptfarbe deiner Marke
- Verwendet für: Buttons, Links, Überschriften
- Beispiel: `#0066cc` (Blau)

**2. Sekundärfarbe**
- Ergänzende Farbe
- Verwendet für: Text, Rahmen, Hintergründe
- Beispiel: `#666666` (Grau)

**3. Akzentfarbe**
- Für Highlights und Call-to-Actions
- Verwendet für: Badges, Warnungen, wichtige Elemente
- Beispiel: `#ff6600` (Orange)

## 📄 Verwendung in PDFs

Sobald du ein Logo hochgeladen hast, wird es automatisch verwendet in:

- **Rechnungen:** Logo im Header
- **Angeboten:** Logo im Header
- **E-Mails:** Logo in der Signatur (zukünftig)

### Beispiel: PDF-Rechnung mit Logo

```
┌─────────────────────────────────────┐
│  [DEIN LOGO]       Firmendaten      │
│                    Adresse          │
│                    Telefon          │
├─────────────────────────────────────┤
│  Rechnung RE-2025-0001              │
│  ...                                │
└─────────────────────────────────────┘
```

## 🔧 Technische Details

### Storage-Pfad
Hochgeladene Logos werden gespeichert unter:
```
supabase/storage/public/branding/
  ├── logo_url-1234567890.png
  ├── logo_icon_url-1234567890.png
  ├── logo_dark_url-1234567890.svg
  └── logo_light_url-1234567890.png
```

### Dateigrößen-Limit
- **Maximal:** 5 MB pro Datei
- **Empfohlen:** < 500 KB für schnelles Laden

### Unterstützte Formate
- `.png` - PNG (empfohlen für Transparenz)
- `.jpg` / `.jpeg` - JPEG
- `.svg` - Vektorformat (beste Qualität)

## ⚠️ Fehlerbehebung

### Fehler: "Storage-Bucket nicht gefunden"

**Ursache:** Der `public` Bucket existiert noch nicht in Supabase

**Lösung:**
1. Gehe zu Supabase Dashboard → Storage
2. Erstelle einen neuen Bucket namens `public`
3. Aktiviere "Public bucket"
4. Versuche den Upload erneut

### Fehler: "Datei zu groß"

**Ursache:** Datei ist größer als 5 MB

**Lösung:**
- Komprimiere das Bild (z.B. mit TinyPNG.com)
- Verwende SVG statt PNG/JPG
- Reduziere die Bildgröße (z.B. 1000px statt 2000px)

### Logo wird nicht in PDFs angezeigt

**Ursache:** Logo noch nicht gespeichert

**Lösung:**
1. Gehe zu Branding
2. Lade Logo hoch
3. Klicke **"Speichern"** Button oben rechts
4. Erstelle eine neue Rechnung

### Logo-URL ist ungültig

**Ursache:** Bucket ist nicht öffentlich

**Lösung:**
1. Supabase Dashboard → Storage → `public`
2. Klicke auf Bucket-Einstellungen
3. Aktiviere "Public bucket"
4. Speichern

## 💡 Best Practices

### Logo-Erstellung

**✅ DO:**
- Verwende Vektorformate (SVG) wenn möglich
- Erstelle transparente PNGs für Flexibilität
- Halte Logos einfach und klar
- Teste Logos auf verschiedenen Hintergründen
- Verwende konsistente Farben

**❌ DON'T:**
- Keine zu komplexen Logos
- Vermeide sehr kleine Schriftarten
- Keine zu vielen Farben
- Vermeide JPG mit komplexen Hintergründen

### Farbwahl

**Tipps:**
- Nutze Online-Tools wie [Coolors.co](https://coolors.co)
- Achte auf guten Kontrast (WCAG 2.0 AA)
- Teste Farben auf verschiedenen Bildschirmen
- Dokumentiere Farbwerte (Hex-Codes)

## 📱 Zusätzliche Verwendung

Das Branding wird zukünftig auch verwendet für:

- ✅ Website-Header und Footer
- ✅ E-Mail-Templates
- ✅ Social Media Posts (Export)
- ✅ Visitenkarten-Generator
- ✅ Briefpapier-Templates

## 🔗 Nützliche Links

- **TinyPNG:** https://tinypng.com (Bildkomprimierung)
- **Coolors:** https://coolors.co (Farbpaletten)
- **SVG Optimizer:** https://jakearchibald.github.io/svgomg
- **Supabase Storage Docs:** https://supabase.com/docs/guides/storage

---

**Entwickelt für Petasync | Version 1.0**
