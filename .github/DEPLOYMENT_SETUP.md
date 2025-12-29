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

5. **Erstelle folgende 3 Secrets:**

   | Name | Beschreibung | Beispielwert |
   |------|--------------|--------------|
   | `HETZNER_HOST` | Server IP-Adresse | `78.46.179.7` |
   | `HETZNER_USERNAME` | SFTP Benutzername | `petasy` |
   | `HETZNER_PASSWORD` | SFTP Passwort | `dein-passwort-hier` |

   **Wichtig:** Für jeden Secret:
   - Name GENAU wie in der Tabelle eingeben (Groß-/Kleinschreibung beachten!)
   - Wert eingeben
   - "Add secret" klicken

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
4. ✅ Projekt wird gebaut (`npm run build`)
5. ✅ `dist/` und `api/` werden vorbereitet
6. ✅ Upload zu Hetzner via SFTP
7. ✅ Deployment Summary

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
