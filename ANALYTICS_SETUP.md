# Analytics Setup Guide - Petasync

Diese Anleitung zeigt dir, wie du **Google Analytics 4** und **Microsoft Clarity** für deine Website einrichtest.

## 🎯 Was ist bereits implementiert?

✅ **Google Analytics 4 (GA4)**
- Automatisches Tracking von Pageviews bei Route-Änderungen (SPA-Support)
- Event-Tracking für wichtige Interaktionen
- Scroll-Depth Tracking (25%, 50%, 75%, 100%)
- Custom Events für Buttons, Formulare, CTAs

✅ **Microsoft Clarity**
- Heatmaps und Session-Aufnahmen
- **SPA-Support**: Seitenwechsel bleiben in derselben Aufnahme!
- Automatische Integration mit GA4

---

## 📋 Schritt 1: Google Analytics 4 einrichten

### 1.1 GA4 Account erstellen

1. Gehe zu [Google Analytics](https://analytics.google.com/)
2. Klicke auf **"Messung starten"** oder **"Admin"**
3. Erstelle ein neues **Property** (z.B. "Petasync Website")
4. Wähle **"Web"** als Plattform
5. Gib deine Website-URL ein: `https://petasync.de`

### 1.2 Measurement ID kopieren

Nach dem Erstellen des Properties bekommst du eine **Measurement ID** im Format:
```
G-XXXXXXXXXX
```

### 1.3 Measurement ID in Code einfügen

**Datei 1: `index.html` (Zeile 13)**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```
Ersetze `G-XXXXXXXXXX` mit deiner echten Measurement ID.

**Datei 2: `src/lib/analytics.ts` (Zeile 9)**
```typescript
export const ANALYTICS_CONFIG = {
  GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX', // Hier deine ID eintragen
  CLARITY_PROJECT_ID: 'XXXXXXXXXX',
};
```

---

## 📋 Schritt 2: Microsoft Clarity einrichten

### 2.1 Clarity Konto erstellen

1. Gehe zu [Microsoft Clarity](https://clarity.microsoft.com/)
2. Melde dich mit deinem Microsoft-Konto an (oder erstelle eins)
3. Klicke auf **"Neues Projekt"**
4. Gib folgende Infos ein:
   - **Name**: Petasync Website
   - **Website URL**: https://petasync.de
   - **Kategorie**: Business Services

### 2.2 Project ID kopieren

Nach dem Erstellen bekommst du eine **Project ID** (z.B. `kxt8h9j2lm`)

### 2.3 Project ID in Code einfügen

**Datei: `src/lib/analytics.ts` (Zeile 10)**
```typescript
export const ANALYTICS_CONFIG = {
  GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX',
  CLARITY_PROJECT_ID: 'kxt8h9j2lm', // Hier deine Clarity ID eintragen
};
```

### 2.4 WICHTIG: SPA-Einstellung in Clarity Dashboard

1. Gehe zu deinem Clarity-Projekt
2. Klicke auf **Settings** → **Setup**
3. Aktiviere die Option: **"Single Page Application (SPA)"**
   - Dies stellt sicher, dass Seitenwechsel in der gleichen Aufnahme bleiben!
   - Ohne diese Einstellung würde bei jedem Seitenwechsel eine neue Session starten

> **Hinweis**: Das Clarity-Script ist bereits so konfiguriert, dass es Seitenwechsel automatisch trackt. Die SPA-Einstellung im Dashboard verstärkt dies nur.

---

## 🧪 Schritt 3: Tracking testen

### 3.1 Entwicklungsumgebung testen

```bash
npm run dev
```

Öffne die Browser-Konsole (F12) und navigiere auf der Website. Du solltest sehen:
```
[Analytics] Page view tracked: /
[Analytics] Event tracked: button_click {...}
```

### 3.2 In GA4 testen (Real-Time)

1. Öffne Google Analytics
2. Gehe zu **Berichte** → **Echtzeit**
3. Navigiere auf deiner Website
4. Du solltest deine Aktivität in Echtzeit sehen!

### 3.3 In Clarity testen

1. Öffne Microsoft Clarity Dashboard
2. Gehe zu **Recordings**
3. Navigiere auf deiner Website
4. Nach ca. 1-2 Minuten solltest du deine Session-Aufnahme sehen
5. **Teste SPA**: Klicke auf verschiedene Seiten - alles sollte in EINER Aufnahme bleiben!

---

## 📊 Was wird automatisch getrackt?

### Pageviews
- ✅ Jeder Seitenwechsel (automatisch via React Router)
- ✅ URL-Parameter und Pfad
- ✅ Seitentitel

### User Engagement
- ✅ WhatsApp Button Clicks
- ✅ Telefonnummer Clicks
- ✅ E-Mail Clicks
- ✅ Scroll Depth (25%, 50%, 75%, 100%)
- ✅ Navigation Clicks

### Custom Events
Die folgenden Funktionen stehen zur Verfügung (siehe `src/lib/analytics.ts`):

```typescript
trackButtonClick(buttonName, location)
trackFormSubmission(formName, success)
trackContactFormSubmit(formType)
trackServiceView(serviceName)
trackTemplateView(templateName)
trackCTAClick(ctaText, ctaLocation)
trackPhoneClick()
trackEmailClick()
trackWhatsAppClick()
trackNavigationClick(linkText, destination)
trackScrollDepth(depth)
trackVideoPlay(videoName)
trackFileDownload(fileName, fileType)
trackExternalLink(url, linkText)
trackError(errorMessage, errorLocation)
trackSearch(searchTerm)
```

---

## 🚀 Weitere Event-Tracking hinzufügen

### Beispiel: Kontaktformular tracken

```typescript
import { trackContactFormSubmit } from '@/lib/analytics';

const handleSubmit = async (data) => {
  try {
    await submitForm(data);
    trackContactFormSubmit('contact'); // Track success
  } catch (error) {
    trackError('Form submission failed');
  }
};
```

### Beispiel: CTA-Button tracken

```typescript
import { trackCTAClick } from '@/lib/analytics';

<Button onClick={() => {
  trackCTAClick('Jetzt anfragen', 'Hero Section');
  navigate('/kontakt');
}}>
  Jetzt anfragen
</Button>
```

### Beispiel: Service-Seite tracken

```typescript
import { trackServiceView } from '@/lib/analytics';

useEffect(() => {
  trackServiceView('PC Reparatur');
}, []);
```

---

## 🔍 Troubleshooting

### GA4 zeigt keine Daten

1. **Measurement ID korrekt?** Prüfe beide Stellen (`index.html` und `analytics.ts`)
2. **Ad-Blocker?** Deaktiviere Ad-Blocker zum Testen
3. **Warte 24-48h** für vollständige Daten (Echtzeit-Ansicht zeigt sofort Daten)

### Clarity zeigt keine Aufnahmen

1. **Project ID korrekt?** Prüfe `analytics.ts`
2. **Cookies erlaubt?** Clarity benötigt Cookies
3. **SPA-Modus aktiviert?** Prüfe Clarity Dashboard Settings
4. **Warte 1-2 Minuten** - Aufnahmen brauchen etwas Zeit zum Hochladen

### Console Errors

Wenn du `gtag is not defined` oder ähnliche Fehler siehst:
1. Prüfe, ob das GA4-Script in `index.html` geladen wird
2. Stelle sicher, dass die IDs korrekt sind
3. Lösche Browser-Cache und lade neu

---

## ✅ Checkliste

- [ ] Google Analytics 4 Property erstellt
- [ ] GA4 Measurement ID in `index.html` eingetragen
- [ ] GA4 Measurement ID in `src/lib/analytics.ts` eingetragen
- [ ] Microsoft Clarity Projekt erstellt
- [ ] Clarity Project ID in `src/lib/analytics.ts` eingetragen
- [ ] **SPA-Modus in Clarity Dashboard aktiviert**
- [ ] In GA4 Echtzeit-Ansicht getestet
- [ ] In Clarity Recordings getestet
- [ ] SPA-Navigation in Clarity getestet (mehrere Seiten, eine Aufnahme)

---

## 📚 Weiterführende Links

- [Google Analytics 4 Dokumentation](https://support.google.com/analytics/answer/9304153)
- [Microsoft Clarity Dokumentation](https://docs.microsoft.com/en-us/clarity/)
- [GA4 Events Best Practices](https://support.google.com/analytics/answer/9267735)

---

## 🎉 Fertig!

Nach dem Setup hast du:
- ✅ Vollständiges Pageview-Tracking (auch bei SPA-Navigation)
- ✅ Detaillierte Event-Tracking für alle wichtigen Interaktionen
- ✅ Session-Aufnahmen und Heatmaps (mit durchgehenden Sessions)
- ✅ Scroll-Depth-Analyse
- ✅ Professionelle Analytics-Infrastruktur

Viel Erfolg mit deiner Analytics-Implementierung! 🚀
