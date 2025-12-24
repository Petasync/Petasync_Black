# 🚀 Deployment Anleitung

## Automatisches Deployment zu Hetzner Webhosting

Dieses Projekt deployt automatisch bei jedem Push auf `main` oder `master` zu Hetzner.

---

## ⚡ Quick Start

### 1. GitHub Secrets einrichten
Alle benötigten Secrets findest du in `.github/HETZNER_SECRETS.md`

**Wichtig**: Diese Datei ist lokal und NICHT in Git. Sie enthält deine Zugangsdaten.

### 2. Secrets in GitHub eintragen
```
https://github.com/Petasync/Petasync_Black/settings/secrets/actions
```

Trage alle 11 Secrets ein:
- 3x FTP-Zugangsdaten (Host, Username, Password)
- 8x Umgebungsvariablen (aus .env)

### 3. Server-Verzeichnis anpassen
Bearbeite `.github/workflows/deploy-hetzner.yml`:

```yaml
server-dir: ./ # ← Hier dein Hetzner Root-Verzeichnis eintragen
```

**Typische Werte:**
- `./` - Direkt im Root (bei Hetzner meist richtig)
- `/public_html/` - Standard Webhosting
- `/html/` - Alternative
- `/httpdocs/` - Plesk

**Wie finde ich den richtigen Pfad?**
1. Per FTP verbinden (FileZilla o.ä.)
2. Schauen wo die index.html Datei liegt
3. Diesen Pfad verwenden

### 4. Code pushen
```bash
git add .
git commit -m "Setup automatic deployment"
git push origin main
```

→ GitHub Actions startet automatisch!

---

## 📊 Deployment Status prüfen

Nach dem Push:
1. Gehe zu GitHub → **Actions** Tab
2. Sieh dir den laufenden Workflow an
3. Prüfe Logs bei Fehlern

---

## 🛠️ Manuelles Deployment

Falls du manuell deployen willst:

### Via GitHub Actions UI
```
Actions → Deploy to Hetzner Webhosting → Run workflow
```

### Via Kommandozeile
```bash
# 1. Build erstellen
npm run build

# 2. Per FTP hochladen (FileZilla o.ä.)
# Lokal: dist/* → Hetzner: /
# Lokal: api/* → Hetzner: /api/
```

---

## 🔧 Troubleshooting

### Deployment schlägt fehl
- Secrets korrekt eingetragen?
- FTP-Zugangsdaten testen (FileZilla)
- Logs in GitHub Actions prüfen

### Website zeigt nichts
- `server-dir` korrekt?
- Dateien auf Hetzner per FTP prüfen

### PHP-Scripts funktionieren nicht
- `api/` Ordner hochgeladen?
- PHP Version ≥ 7.4?

---

## 📁 Was wird deployed?

- **Frontend**: `dist/` → Hetzner Root
- **Backend**: `api/` → Hetzner `/api/`

---

## 📚 Weitere Infos

Detaillierte Anleitung: `.github/DEPLOYMENT_SETUP.md`

Bei Problemen: GitHub Actions Logs checken!
