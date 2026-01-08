# Performance Optimierungen - Petasync Website

## 🚨 Wichtig: Schwarzer Bildschirm beheben

Wenn die Website schwarz bleibt oder nicht lädt:

### Sofortlösung:
1. **Besuchen Sie**: `https://ihre-domain.de/clear-cache.html`
2. Klicken Sie auf "Cache Komplett Leeren"
3. Die Seite lädt sich automatisch neu

### Alternative Methoden:

#### Methode 1: Hard Refresh
- **Windows/Linux**: `Strg + Shift + R` oder `Strg + F5`
- **Mac**: `Cmd + Shift + R`

#### Methode 2: Browser Cache manuell leeren
- **Chrome**: Einstellungen → Datenschutz → Browserdaten löschen
- **Firefox**: Einstellungen → Datenschutz → Daten löschen
- **Safari**: Einstellungen → Datenschutz → Website-Daten verwalten

#### Methode 3: Inkognito-Modus
- Öffnen Sie die Website im Inkognito-/Privat-Modus
- Wenn es funktioniert, liegt es am Cache

## 📊 Performance Score Erwartungen

### Aktuelle Scores:
- **Desktop**: ~73 (Ziel: 85+)
- **Mobile**: ~43 (Ziel: 70+)

### Warum nicht 90+?
Das Hauptproblem ist die **3D-Szene (Three.js)**:
- 810 KB JavaScript nur für 3D
- Blockiert den initialen Ladevorgang
- Besonders auf Mobilgeräten langsam

### Empfehlungen für 90+ Score:

#### Option 1: 3D-Szene entfernen (einfach)
Ersetzen Sie die 3D-Hero-Section durch:
- Statisches Bild
- CSS-Animationen
- Lottie-Animationen (viel kleiner)

#### Option 2: 3D nur für Desktop (mittel)
```tsx
// In Hero.tsx
const Hero3DSceneLazy = lazy(() => {
  if (window.innerWidth < 768) {
    return Promise.resolve({ default: () => null }); // Kein 3D auf Mobile
  }
  return import("@/components/3d/Hero3DScene").then(module => ({
    default: module.Hero3DScene
  }));
});
```

#### Option 3: Bild als Fallback bis Interaktion
- Zeige Placeholder-Bild
- Lade 3D erst nach User-Scroll oder Click

## 🎯 Implementierte Optimierungen

### ✅ Was funktioniert:

1. **Route-Based Code Splitting**
   - Alle Routen laden on-demand
   - Initial Bundle: ~360 KB statt ~2 MB

2. **Vendor Chunk Splitting**
   - React: 160 KB
   - Three.js: 810 KB (nur bei Bedarf)
   - UI Components: 90 KB

3. **Image Optimization**
   - 70% Dateigrößen-Reduktion
   - Automatisch bei jedem Build
   - PNG: 85% Qualität

4. **HTTP/2 & Caching**
   - Brotli/GZIP Kompression
   - Aggressive Caching für Fonts/Images
   - Kein Cache für HTML (verhindert schwarzen Bildschirm)

5. **PWA (Service Worker)**
   - Intelligentes Caching
   - User-kontrollierte Updates (`registerType: 'prompt'`)
   - Kein aggressives Auto-Caching mehr

6. **Error Boundaries**
   - Zeigt Fehlerseite statt schwarzem Bildschirm
   - Button zum Cache-Leeren
   - Bessere User Experience

### ⚠️ Bekannte Einschränkungen:

1. **Three.js Bundle zu groß**
   - 810 KB minimiert
   - Blockiert FCP/LCP
   - Lösung: Siehe Empfehlungen oben

2. **Mobile Performance**
   - 3D-Rendering sehr langsam auf Mobilgeräten
   - TBT: 1,100ms auf Mobile
   - Empfehlung: 3D nur für Desktop

3. **First Load**
   - Erste Ladezeit: ~4-7 Sekunden
   - Nach Cache: <1 Sekunde
   - Problem: Initial Load zu langsam

## 🔧 Wartung & Deployment

### Build Command:
```bash
npm run build
```

### Build Output verstehen:
```
dist/assets/js/react-vendor-[hash].js     160 KB  // React Core
dist/assets/js/three-vendor-[hash].js     810 KB  // 3D Library (Problem!)
dist/assets/js/ui-vendor-[hash].js         90 KB  // UI Components
dist/assets/js/Index-[hash].js            ~15 KB  // Homepage
```

### Nach Deployment:
1. Besuchen Sie `https://ihre-domain.de/clear-cache.html`
2. Leeren Sie den Cache
3. Testen Sie PageSpeed erneut

### Cache-Strategie:
- **HTML**: Kein Cache (immer frisch)
- **JS/CSS**: 1 Monat (hash-basiert)
- **Images**: 1 Jahr (immutable)
- **Fonts**: 30 Tage (StaleWhileRevalidate)

## 📈 Performance Monitoring

### Tools zum Testen:
1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **WebPageTest**: https://www.webpagetest.org/
3. **Chrome DevTools**: Lighthouse Tab

### Was zu überwachen:
- **FCP** (First Contentful Paint): <1.8s
- **LCP** (Largest Contentful Paint): <2.5s
- **TBT** (Total Blocking Time): <200ms
- **CLS** (Cumulative Layout Shift): <0.1

### Aktuelle Werte:
- **Desktop FCP**: 0.9s ✅
- **Desktop LCP**: 1.6s ✅
- **Mobile FCP**: 4.3s ❌
- **Mobile LCP**: 7.0s ❌
- **Mobile TBT**: 1,100ms ❌

## 🚀 Schnelle Verbesserungen

### Sofort umsetzbar:

1. **3D nur für Desktop zeigen**
   ```tsx
   {window.innerWidth >= 768 && <Hero3DSceneLazy />}
   ```

2. **Placeholder Bild statt 3D**
   ```tsx
   <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
   ```

3. **Fonts lokal hosten**
   - Download Google Fonts
   - Speichern in `/public/fonts/`
   - Schneller als Google CDN

4. **Critical CSS inline**
   - Extrahiere CSS für Above-the-Fold
   - Inline in `<head>`
   - Rest async laden

## 📞 Support

Bei Fragen oder Problemen:
1. Besuchen Sie `/clear-cache.html`
2. Hard Refresh: Strg+Shift+R
3. Inkognito-Modus testen
4. Browser-Cache leeren

## 🎨 CDN Setup (Optional)

Für Cloudflare CDN:

1. Öffnen Sie `vite.config.ts`
2. Ändern Sie Zeile 11:
   ```typescript
   base: mode === 'production' ? 'https://cdn.petasync.de/' : '/',
   ```
3. Rebuild und Deploy

### CDN Vorteile:
- Assets näher beim User
- Schnellere Ladezeiten
- Automatisches Caching
- DDoS-Schutz

---

**Letzte Aktualisierung**: Januar 2026
**Build**: Production optimiert mit Vite 5.4.19
