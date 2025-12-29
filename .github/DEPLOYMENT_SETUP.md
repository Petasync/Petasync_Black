# 🔐 GitHub Actions Deployment Setup

Diese Anleitung erklärt, wie du die automatische Deployment-Pipeline zu Hetzner einrichtest.

## 📋 Voraussetzungen

Die Deployment-Pipeline ist bereits als GitHub Actions Workflow konfiguriert (`.github/workflows/deploy-hetzner.yml`).

Du musst nur noch die **GitHub Secrets** einrichten.

---

## 🔑 GitHub Secrets einrichten

GitHub Secrets speichern sensible Daten wie Passwörter **verschlüsselt** und sicher.

### Schritt-für-Schritt Anleitung:

1. **Gehe zu deinem GitHub Repository**

2. **Klicke auf "Settings"** (Einstellungen-Tab oben)

3. **Navigiere zu "Secrets and variables" → "Actions"**

   (Linke Seitenleiste)

4. **Klicke auf "New repository secret"**

5. **Erstelle folgende Secrets:**

   ### 🌐 FTP-Zugangsdaten (3 Secrets):

   | Name | Beschreibung | Beispielwert |
   |------|--------------|--------------|
   | `HETZNER_HOST` | Server IP-Adresse | `78.46.179.7` |
   | `HETZNER_USERNAME` | FTP Benutzername | `petasy` |
   | `HETZNER_PASSWORD` | FTP Passwort | `dein-passwort-hier` |

   ### 🔐 Umgebungsvariablen (.env) (7 Secrets):

   | Name | Beschreibung | Wo finden? |
   |------|--------------|------------|
   | `VITE_SUPABASE_PROJECT_ID` | Supabase Projekt-ID | Supabase Dashboard |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase Anon Key | Supabase Dashboard → Settings → API |
   | `VITE_SUPABASE_URL` | Supabase URL | z.B. `https://xyz.supabase.co` |
   | `VITE_GOOGLE_ANALYTICS_ID` | Google Analytics ID | z.B. `G-XXXXXXXXXX` |
   | `VITE_MICROSOFT_CLARITY_ID` | Microsoft Clarity ID | z.B. `abc123def456` |
   | `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile Key | Cloudflare Dashboard |
   | `VITE_SITE_URL` | Deine Website URL | `https://petasync.de` |

   **Insgesamt: 10 Secrets**

   **Wichtig:** Für jeden Secret:
   - Name GENAU wie in der Tabelle eingeben (Groß-/Kleinschreibung beachten!)
   - Wert aus deiner lokalen `.env` Datei kopieren
   - "Add secret" klicken

   **Tipp:** Öffne deine lokale `.env` Datei und kopiere die Werte von dort!

---

## 🚀 Automatisches Deployment

### Wann wird deployed?

Der Workflow startet automatisch bei:

✅ **Push auf `main` Branch**
```bash
git push origin main
```

✅ **Manueller Trigger**
- Gehe zu "Actions" Tab in GitHub
- Wähle "Deploy to Hetzner"
- Klicke "Run workflow"

### Was passiert beim Deployment?

1. ✅ Code wird ausgecheckt
2. ✅ Node.js wird eingerichtet
3. ✅ Dependencies werden installiert (`npm ci`)
4. ✅ `.env` Datei wird aus Secrets erstellt
5. ✅ Projekt wird gebaut (`npm run build`)
6. ✅ `dist/` und `api/` werden vorbereitet
7. ✅ Upload zu Hetzner via FTP
8. ✅ Deployment Summary

⏱️ **Dauer:** ~2-3 Minuten

---

## 📊 Deployment Status überprüfen

1. Gehe zu **"Actions"** Tab in GitHub
2. Sieh dir die laufenden/vergangenen Workflows an
3. Klicke auf einen Workflow für Details

**Status-Symbole:**
- ✅ Grün = Erfolgreich
- ❌ Rot = Fehler
- 🟡 Gelb = In Arbeit

---

## 🔍 Troubleshooting

### ❌ "Authentication failed"
→ Überprüfe die GitHub Secrets (Username/Password korrekt?)

### ❌ "Connection refused"
→ Überprüfe die Server-IP (`HETZNER_HOST`)

### ❌ "Permission denied"
→ SFTP-Benutzer hat keine Schreibrechte auf dem Server

### ❌ Build-Fehler
→ Überprüfe `npm run build` lokal, ob es funktioniert

---

## 🛡️ Sicherheit

✅ **Passwörter sind NICHT im Code** - nur in verschlüsselten GitHub Secrets

✅ **Secrets sind NICHT in Logs sichtbar** - GitHub zensiert sie automatisch

✅ **Secrets sind nur für Workflows zugänglich** - nicht öffentlich einsehbar

⚠️ **NIEMALS Zugangsdaten in Code committen!**

---

## 🔄 Updates & Änderungen

### Zugangsdaten ändern:
1. Gehe zu "Settings" → "Secrets and variables" → "Actions"
2. Klicke auf den Secret
3. "Update secret"

### Workflow ändern:
- Bearbeite `.github/workflows/deploy-hetzner.yml`
- Commit & Push → Änderungen werden sofort aktiv

---

## 📞 Weitere Hilfe

- **GitHub Actions Logs:** Actions Tab → Workflow auswählen
- **GitHub Secrets Doku:** https://docs.github.com/en/actions/security-guides/encrypted-secrets
- **SFTP-Deploy Action:** https://github.com/wlixcc/SFTP-Deploy-Action

---

**Happy Deploying! 🚀**
