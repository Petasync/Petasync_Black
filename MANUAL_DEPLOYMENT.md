# 🚀 Manuelles Deployment zu Hetzner

Da GitHub Actions von Hetzner geblockt werden, hier die **manuelle Deploy-Lösung**:

## 📦 Voraussetzungen

1. **Node.js installiert** (zum Bauen)
2. **LFTP installiert** (zum Hochladen)

### LFTP installieren:

**Linux/WSL:**
```bash
sudo apt-get install lftp
```

**macOS:**
```bash
brew install lftp
```

**Windows:**
- Nutze WSL (Windows Subsystem for Linux)
- Oder FileZilla (siehe unten)

---

## 🚀 Deployment (Kommandozeile)

### Schritt 1: Dependencies installieren
```bash
npm install
```

### Schritt 2: Deploy-Script ausführen
```bash
./scripts/deploy.sh
```

**Das Script:**
1. ✅ Baut dein Projekt (`npm run build`)
2. ✅ Uploaded `dist/` zu Hetzner
3. ✅ Uploaded `api/` zu Hetzner

⏱️ **Dauer:** ~2-5 Minuten

---

## 🖱️ Alternative: FileZilla (GUI)

Falls du lieber ein grafisches Tool nutzt:

### Schritt 1: Build erstellen
```bash
npm run build
```

### Schritt 2: FileZilla Download
https://filezilla-project.org/download.php?type=client

### Schritt 3: Mit Hetzner verbinden

**Verbindungsdaten:**
- **Host:** `www361.your-server.de`
- **Benutzername:** `petasy`
- **Passwort:** `BzquQPL3kFTgj9Nn`
- **Port:** `21`
- **Protokoll:** `FTP - File Transfer Protocol`
- **Verschlüsselung:** `Explizites FTP über TLS erforderlich`

### Schritt 4: Dateien hochladen

**Links (Lokal):**
- Navigiere zu deinem Projekt-Ordner

**Rechts (Server):**
- Das ist dein Hetzner-Server

**Upload:**
1. Wähle **alle Dateien** aus `dist/` (links)
2. Ziehe sie ins **Root-Verzeichnis** auf dem Server (rechts)
3. Wähle **alle Dateien** aus `api/` (links)
4. Ziehe sie in den Ordner `api/` auf dem Server (rechts)

✅ **Fertig!**

---

## 📝 npm Scripts (Alternativ)

Ich habe auch npm scripts erstellt:

```bash
# Build + Deploy in einem Befehl
npm run deploy

# Nur Build
npm run build

# Nur Upload (wenn schon gebaut)
npm run upload
```

---

## ⚠️ Wichtig

**Vor jedem Deployment:**
1. Committe deine Änderungen zu Git
2. Push zu GitHub (als Backup)
3. Dann deploy

**Nach dem Deployment:**
- Teste deine Website: https://petasync.de
- Prüfe ob alles funktioniert

---

## 🔧 Troubleshooting

### "lftp: command not found"
→ LFTP installieren (siehe oben)

### "Connection failed"
→ Prüfe FTP-Zugangsdaten in Hetzner konsoleH

### "Permission denied"
→ Prüfe ob Ordner auf dem Server existieren

---

## 🎯 Empfehlung

**Für den Anfang:** Nutze **FileZilla** (einfacher, visuell)

**Später:** Nutze das **Deploy-Script** (schneller, automatisch)

---

## 📞 Support

Bei Problemen: Prüfe die FTP-Verbindung in FileZilla erst manuell!
