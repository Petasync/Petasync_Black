# Petasync Logos

Dieses Verzeichnis enthält alle Logo-Varianten für das Petasync-Projekt.

## Übersicht der Logo-Dateien

### React-Komponente (Empfohlen)
- **`Logo.tsx`** (in `src/components/ui/`) - Flexible React-Komponente mit `currentColor` Support
  - Automatische Dark/Light Mode Anpassung
  - Varianten: `icon`, `wordmark`, `horizontal`, `full`

### SVG-Dateien

#### Icon-Only (Symbol)
- `petasync-icon-dark.svg` - Nur das P-Symbol, weiß
- `petasync-icon-light.svg` - Nur das P-Symbol, schwarz

#### Horizontal (Logo + Text nebeneinander)
- `petasync-horizontal-dark.svg` - Symbol + Text, weiß
- `petasync-horizontal-light.svg` - Symbol + Text, schwarz

#### Full (Logo + Text untereinander)
- `petasync-full-dark.svg` - Symbol + Text vertikal, weiß
- `petasync-full-light.svg` - Symbol + Text vertikal, schwarz

### Public Assets
- `/public/logo.svg` - Hauptlogo (light)
- `/public/icon.svg` - Quadratisches Icon für Favicons/PWA

## Verwendung

### In React Komponenten
```tsx
import { Logo } from "@/components/ui/Logo";

// Horizontal (Standard)
<Logo variant="horizontal" />

// Nur Icon
<Logo variant="icon" iconClassName="w-12 h-auto" />

// Nur Text
<Logo variant="wordmark" />

// Full (vertikal)
<Logo variant="full" />

// Mit Custom Styling
<Logo
  variant="horizontal"
  className="hover:opacity-80"
  iconClassName="w-8 h-auto"
  textClassName="text-2xl"
/>
```

### Direkt als SVG
```tsx
import LogoIcon from "@/assets/logos/petasync-icon-light.svg";

<img src={LogoIcon} alt="Petasync" className="w-12 h-auto" />
```

## Logo-Konzept

Das Petasync-Logo besteht aus:
- **P-Symbol**: Drei abgerundete Formen, die ein "P" bilden
- **Sync-Kreis**: Kreis in der Mitte symbolisiert "Synchronisation"
- **Schrift**: Fette Sans-Serif für "PETASYNC"

Das Design vermittelt:
- Modernität & Technologie
- Synchronisation & Datenfluss
- Professionalität & Zuverlässigkeit

## Farben

- **Light Mode**: `#000000` (Schwarz)
- **Dark Mode**: `#FFFFFF` (Weiß)
- **Sync-Kreis**: Halbtransparent (15-25% Opacity)

## Best Practices

- ✅ Logo-Komponente nutzen für automatische Theme-Anpassung
- ✅ SVG für beste Skalierbarkeit
- ✅ Mindestgröße: Icon 24px, Horizontal 120px
- ✅ Ausreichend Whitespace um das Logo
- ❌ Logo nicht verzerren oder verformen
- ❌ Logo-Farben nicht ändern (außer Dark/Light)
- ❌ Keine zusätzlichen Schatten oder Effekte
