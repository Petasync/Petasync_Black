# 🚀 Automatisches Deployment zu Hetzner Webhosting

## Übersicht

Dieses Repository nutzt **GitHub Actions**, um automatisch bei jedem Push auf `main`/`master` zu Hetzner Webhosting zu deployen.

---

## 📋 Setup-Anleitung

### 1. GitHub Secrets konfigurieren

Gehe zu deinem GitHub Repository:
```
Settings → Secrets and variables → Actions → New repository secret
```

Füge folgende **Secrets** hinzu:

#### FTP/SFTP Zugangsdaten (Hetzner)
| Secret Name | Beschreibung | Beispiel |
|------------|--------------|----------|
| `FTP_HOST` | Hetzner FTP Server | `petasync.de` oder `ftp.petasync.de` |
| `FTP_USERNAME` | FTP Benutzername | `u12345678` oder deine Domain |
| `FTP_PASSWORD` | FTP Passwort | Dein Hetzner FTP-Passwort |

#### Umgebungsvariablen (.env Werte)
| Secret Name | Wert aus `.env` |
|------------|----------------|
| `VITE_SUPABASE_PROJECT_ID` | `xfwyckafcayknxwwspfe` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGci...` (aus .env) |
| `VITE_SUPABASE_URL` | `https://xfwyckafcayknxwwspfe.supabase.co` |
| `VITE_GOOGLE_ANALYTICS_ID` | `G-69WXXP8WMT` |
| `VITE_MICROSOFT_CLARITY_ID` | `uhkqz9yead` |
| `VITE_TURNSTILE_SITE_KEY` | `0x4AAAAAAB9QzrJyzroYWiSb` |
| `VITE_SITE_URL` | `https://petasync.de` |

---

### 2. Hetzner FTP Zugangsdaten finden

#### Hetzner Webhosting (konsoleH)
1. Login: https://konsoleh.hetzner.com
2. **Webhosting** → Dein Paket auswählen
3. **FTP-Zugänge** → Zugangsdaten anzeigen

**Typische Daten:**
- **Host**: `petasync.de` oder `ftp.petasync.de`
- **Username**: Dein FTP-User (z.B. `u12345678`)
- **Port**: `21` (FTP/FTPS) oder `22` (SFTP)
- **Protokoll**: `ftps` (empfohlen) oder `ftp`

#### SSH/SFTP verfügbar?
Einige Hetzner Pakete bieten **SSH-Zugang**. Falls ja:
- Ändere in `deploy-hetzner.yml`: `protocol: sftp`
- Port: `22`
- Eventuell SSH-Key statt Passwort nutzen

---

### 3. Server-Verzeichnis anpassen

Öffne `.github/workflows/deploy-hetzner.yml` und passe an:

```yaml
# Zeile ~38: Haupt-Deployment
server-dir: ./ # ← Passe an dein Hetzner Root-Verzeichnis an

# Beispiele:
# /public_html/           (typisch bei Shared Hosting)
# /html/                  (manchmal)
# /www/                   (manchmal)
# /httpdocs/              (Plesk)
```

**Finde dein Verzeichnis:**
1. Verbinde dich per FTP (z.B. FileZilla)
2. Schaue, wo deine Website-Dateien liegen (index.html)
3. Notiere den Pfad

---

### 4. Workflow testen

#### Automatisches Deployment
Einfach Code pushen:
```bash
git add .
git commit -m "Test deployment"
git push origin main
```

GitHub Actions startet automatisch und deployed zu Hetzner!

#### Manuelles Deployment
Im GitHub Repository:
```
Actions → Deploy to Hetzner Webhosting → Run workflow
```

---

## 🔧 Workflow-Konfiguration

### Was passiert beim Deployment?

1. ✅ **Checkout Code** - Repository klonen
2. ✅ **Node.js Setup** - Node 20 installieren
3. ✅ **Dependencies** - `npm ci` ausführen
4. ✅ **Build** - `npm run build` mit .env Variablen
5. ✅ **Deploy Dist** - `dist/` Ordner zu Hetzner hochladen
6. ✅ **Deploy API** - `api/` PHP-Dateien hochladen

### Build Output
- **Frontend**: `dist/` (Vite Build)
- **Backend**: `api/` (PHP-Scripts)

---

## 🛠️ Troubleshooting

### FTP Connection Failed
**Problem**: `Error: Connection closed by server`

**Lösungen:**
1. **Protokoll prüfen**: Nutze `ftps` statt `ftp`
2. **Port prüfen**:
   - FTP/FTPS: Port `21`
   - SFTP: Port `22`
3. **Passwort prüfen**: Keine Leerzeichen/Sonderzeichen in Secrets

### Build Failed
**Problem**: `Module not found` oder `Build failed`

**Lösungen:**
1. Alle `.env` Secrets in GitHub konfiguriert?
2. Lokal testen: `npm run build`

### Wrong Directory
**Problem**: Files deployed, aber Website zeigt nichts

**Lösungen:**
1. `server-dir` in Workflow anpassen (siehe Schritt 3)
2. Per FTP prüfen, wo die Dateien gelandet sind
3. Hetzner erwartet meist `public_html/` oder `/html/`

### API Files Missing
**Problem**: PHP-Scripts funktionieren nicht

**Lösungen:**
1. Prüfe `api/` Ordner auf Hetzner
2. PHP Version prüfen (min. 7.4)
3. Rechte prüfen: `chmod 644` für `.php` Dateien

---

## 📁 Ordnerstruktur nach Deployment

**Auf Hetzner Server:**
```
/public_html/              (oder dein Root)
├── index.html             (Vite Build)
├── assets/
│   ├── index-abc123.js
│   ├── index-xyz789.css
│   └── ...
├── api/
│   ├── contact-email.php
│   └── admin-password-reset.php
└── ...
```

---

## 🔐 Sicherheit

- ✅ **Secrets**: Niemals `.env` oder Credentials in Git committen
- ✅ **FTPS**: Nutze `ftps` statt `ftp` für verschlüsselte Verbindung
- ✅ **SSH-Key**: Bei SFTP SSH-Keys statt Passwort nutzen (optional)
- ✅ **`.gitignore`**: Stellt sicher, dass `.env` ignoriert wird

---

## 🎯 Alternative: Manuelles Deployment

Falls du manuell deployen willst:

### Via FTP (FileZilla)
1. FileZilla öffnen
2. Verbindung zu Hetzner herstellen
3. Lokal: `npm run build`
4. Upload: `dist/*` → Hetzner Root
5. Upload: `api/*` → Hetzner `api/`

### Via Command Line (lftp)
```bash
npm run build

lftp -u username,password ftps://petasync.de <<EOF
mirror -R dist/ /public_html/
mirror -R api/ /public_html/api/
bye
EOF
```

---

## 📞 Support

- **Hetzner Docs**: https://docs.hetzner.com/
- **GitHub Actions**: https://docs.github.com/actions
- **Vite Build**: https://vitejs.dev/guide/build.html

Bei Problemen: Prüfe die **Actions Logs** in GitHub unter `Actions` Tab.
