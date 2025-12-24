# 🚀 Deployment zu Hetzner mit FileZilla

Einfache Anleitung zum Hochladen deiner Website zu Hetzner.

---

## 📥 Schritt 1: FileZilla installieren

**Download:** https://filezilla-project.org/download.php?type=client

Installiere FileZilla auf deinem Computer.

---

## 🏗️ Schritt 2: Projekt bauen

Öffne das Terminal in deinem Projekt-Ordner und führe aus:

```bash
npm run build
```

⏱️ **Dauert:** ~30 Sekunden

Das erstellt einen `dist/` Ordner mit deiner fertigen Website.

---

## 🔌 Schritt 3: Mit Hetzner verbinden

Öffne FileZilla und trage oben ein:

| Feld | Wert |
|------|------|
| **Host** | `www361.your-server.de` |
| **Benutzername** | `petasy` |
| **Passwort** | `BzquQPL3kFTgj9Nn` |
| **Port** | `21` |

**Klicke auf "Verbinden"** (oder "Quickconnect")

Bei der ersten Verbindung kommt eine Zertifikatswarnung → **"OK" klicken**

---

## 📂 Schritt 4: Dateien hochladen

Jetzt siehst du 4 Bereiche in FileZilla:

```
┌─────────────────┬─────────────────┐
│  Links (PC)     │  Rechts (Server)│
├─────────────────┼─────────────────┤
│  Dateien        │  Dateien        │
└─────────────────┴─────────────────┘
```

### Frontend hochladen:

1. **Links:** Navigiere zu deinem Projekt → `dist/` Ordner
2. **Wähle ALLE Dateien** in `dist/` aus (Strg+A / Cmd+A)
3. **Rechtsklick** → "Upload" (oder einfach nach rechts ziehen)
4. **Ziel:** Root-Verzeichnis auf dem Server (`/`)

### API hochladen:

1. **Links:** Navigiere zu `api/` Ordner
2. **Rechts:** Erstelle Ordner `api/` (falls nicht vorhanden)
   - Rechtsklick → "Verzeichnis erstellen" → Name: `api`
3. **Wähle ALLE Dateien** in `api/` aus
4. **Hochladen** in den `api/` Ordner auf dem Server

---

## ✅ Schritt 5: Testen

Öffne im Browser: **https://petasync.de**

Deine Website sollte jetzt live sein! 🎉

---

## 🔄 Für Updates

Wenn du Code änderst:

1. `npm run build` ausführen
2. Neue `dist/` Dateien hochladen (überschreibt die alten)
3. Bei API-Änderungen: Neue `api/` Dateien hochladen

**Tipp:** Du musst nicht ALLES jedes Mal hochladen, nur die geänderten Dateien!

---

## 🛠️ Tipps

### Dateien vergleichen
FileZilla zeigt dir welche Dateien sich geändert haben:
- **Menü** → **Ansicht** → **Dateivergleich aktivieren**

### Automatisch hochladen
Rechtsklick auf `dist/` → "Upload" → "Überschreiben wenn Datum unterschiedlich"

### Backup
Vor großen Änderungen: Rechtsklick auf Server → "Download" → Backup erstellen

---

## ⚠️ Wichtig

**Nicht hochladen:**
- ❌ `node_modules/` Ordner
- ❌ `.git/` Ordner
- ❌ `.env` Datei

**NUR hochladen:**
- ✅ `dist/` → Server Root
- ✅ `api/` → Server `api/` Ordner

---

## 🆘 Probleme?

### "Verbindung fehlgeschlagen"
→ Prüfe FTP-Zugangsdaten in Hetzner konsoleH

### "Permission denied"
→ Prüfe ob du im richtigen Verzeichnis bist

### "Website zeigt alte Version"
→ Browser-Cache leeren (Strg+F5 / Cmd+Shift+R)

---

## 📞 Hetzner FTP-Daten finden

Falls sich Zugangsdaten ändern:

1. Login: https://konsoleh.hetzner.com
2. **Webhosting** → Dein Paket
3. **FTP-Zugänge** → Daten anzeigen

---

**Viel Erfolg!** 🚀
