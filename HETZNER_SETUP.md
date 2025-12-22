# Hetzner Webhosting Setup-Anleitung

## Wichtig zu verstehen

Deine Anwendung besteht aus **zwei Teilen**:

1. **Frontend** (HTML/CSS/JS) → läuft auf Hetzner
2. **Backend/Datenbank** → läuft bereits auf **Supabase** (Cloud)

Du musst **KEINE Datenbank auf Hetzner** installieren! Die Datenbank läuft bereits als Cloud-Service bei Supabase.

---

## Teil 1: Supabase Datenbank einrichten (einmalig)

### Schritt 1: Supabase SQL Editor öffnen

1. Gehe zu: https://supabase.com/dashboard
2. Melde dich an
3. Wähle dein Projekt: `xfwyckafcayknxwwspfe`
4. Klicke links auf **"SQL Editor"**

### Schritt 2: Datenbank-Schema erstellen

1. Klicke auf **"New Query"**
2. Kopiere den **kompletten Inhalt** aus der Datei:
   ```
   supabase/migrations/20251222130957_ee998d38-d187-497c-995e-a12d8a8068c0.sql
   ```
3. Füge ihn in den SQL Editor ein
4. Klicke auf **"Run"** (unten rechts)

Das erstellt automatisch:
- ✅ Alle Tabellen (Kunden, Anfragen, Angebote, Rechnungen, etc.)
- ✅ Benutzer-Rollen-System für Admins
- ✅ Row Level Security (RLS) Policies
- ✅ Standardeinstellungen
- ✅ Automatische Nummernkreise

### Schritt 3: Ersten Admin-Benutzer erstellen

1. Gehe zu: https://supabase.com/dashboard/project/xfwyckafcayknxwwspfe/auth/users
2. Klicke auf **"Add user"** → **"Create new user"**
3. Gib E-Mail und Passwort ein (z.B. admin@petasync.de)
4. Klicke auf **"Create user"**
5. **Kopiere die User ID** (sieht aus wie: `ab123456-7890-...`)

### Schritt 4: Admin-Rolle zuweisen

1. Gehe zurück zum **SQL Editor**
2. Führe folgendes SQL aus (mit deiner User ID):

```sql
-- Ersetze USER_ID_HIER mit deiner kopierten User ID
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HIER', 'admin');

-- Admin Profil erstellen (mit deiner User ID und E-Mail)
INSERT INTO public.admin_profiles (user_id, email)
VALUES ('USER_ID_HIER', 'admin@petasync.de');
```

✅ **Datenbank ist jetzt fertig eingerichtet!**

---

## Teil 2: Frontend auf Hetzner deployen

### Schritt 1: Production Build erstellen (lokal auf deinem PC)

```bash
# Im Projekt-Verzeichnis:
npm install
npm run build
```

Dies erstellt einen `dist/` Ordner mit allen optimierten Dateien.

### Schritt 2: Dateien per FTP hochladen

#### Mit FileZilla (empfohlen):

1. **FileZilla herunterladen**: https://filezilla-project.org/
2. **Verbindung einrichten**:
   - Host: Deine Hetzner FTP-Adresse (z.B. `ftp.your-domain.de`)
   - Benutzername: Dein FTP-Benutzer
   - Passwort: Dein FTP-Passwort
   - Port: 21
3. **Verbinden**
4. **Dateien hochladen**:
   - Navigiere rechts zu deinem `htdocs/` oder `public_html/` Verzeichnis
   - Lösche alle alten Dateien (falls vorhanden)
   - Markiere ALLE Dateien aus dem `dist/` Ordner (links auf deinem PC)
   - Ziehe sie ins rechte Fenster (auf Hetzner)
   - Lade auch die `.htaccess` Datei aus dem Projekt-Root hoch

#### Mit WinSCP:

1. **WinSCP herunterladen**: https://winscp.net/
2. Verbindungsdaten wie bei FileZilla eingeben
3. Dateien aus `dist/` ins Webroot-Verzeichnis kopieren

### Schritt 3: .htaccess Datei hochladen

**Wichtig!** Lade die `.htaccess` Datei in das gleiche Verzeichnis wie die `index.html`:

```
htdocs/
├── .htaccess          ← Diese Datei!
├── index.html
├── assets/
│   ├── index-xyz.js
│   └── index-xyz.css
└── vite.svg
```

Die `.htaccess` sorgt dafür, dass React Router funktioniert.

### Schritt 4: SSL/HTTPS aktivieren

**In Hetzner Konsole (KonsoleH):**

1. Melde dich an: https://konsoleh.hetzner.com/
2. Gehe zu deinem Webhosting-Paket
3. Klicke auf **"SSL/TLS"** oder **"Let's Encrypt"**
4. Aktiviere **"Kostenloses Let's Encrypt Zertifikat"**
5. Warte 5-10 Minuten auf Aktivierung

**Oder in Hetzner Webmail/FTP Admin:**
- Suche nach "SSL" oder "HTTPS" Einstellungen
- Aktiviere automatisches HTTPS-Redirect

---

## Teil 3: Domain-Konfiguration

### DNS Einstellungen prüfen:

Stelle sicher, dass deine Domain auf Hetzner zeigt:

**A-Record:**
```
@ → [Hetzner Server IP]
www → [Hetzner Server IP]
```

Diese Einstellungen machst du bei deinem Domain-Anbieter (z.B. Hetzner, Namecheap, GoDaddy).

---

## Teil 4: Testen

1. **Öffne deine Website**: https://deine-domain.de
2. **Teste Admin-Login**: https://deine-domain.de/admin/login
   - E-Mail: deine-admin@email.de
   - Passwort: dein-passwort
3. **Teste Kontaktformular** auf der Homepage

### Wenn Admin-Login nicht funktioniert:

1. Prüfe Browser-Konsole (F12):
   - Gibt es CORS-Fehler?
   - Sind Supabase-Anfragen erfolgreich?

2. Prüfe Supabase Dashboard:
   - Gehe zu: Authentication → Policies
   - Sind RLS Policies aktiviert?

3. Prüfe Admin-Rolle:
```sql
-- Im Supabase SQL Editor:
SELECT * FROM public.user_roles WHERE role = 'admin';
SELECT * FROM public.admin_profiles;
```

---

## Teil 5: Updates deployen

Wenn du Änderungen machst:

1. **Lokal builden**:
```bash
npm run build
```

2. **Neue Dateien hochladen**:
   - Lösche alte Dateien auf Hetzner
   - Lade neue Dateien aus `dist/` hoch
   - **Wichtig**: Behalte die `.htaccess`!

---

## Dateistruktur auf Hetzner

So sollte es auf deinem Hetzner Webspace aussehen:

```
htdocs/  (oder public_html/)
├── .htaccess                    ← Wichtig!
├── index.html
├── vite.svg
└── assets/
    ├── index-[hash].js          ← React App
    ├── index-[hash].css         ← Styles
    └── [weitere assets]
```

**NICHT hochladen:**
- `node_modules/`
- `src/`
- `package.json`
- `.env` (Variablen sind bereits im Build eingebettet)

---

## Troubleshooting

### Problem: Weiße Seite / Nichts wird angezeigt

**Lösung 1: Browser-Konsole prüfen (F12)**
- Siehst du 404-Fehler für JS/CSS Dateien?
- Dann stimmt der Pfad nicht → Prüfe ob `.htaccess` hochgeladen ist

**Lösung 2: Basis-URL prüfen**
- Läuft die Seite in einem Unterverzeichnis? (z.B. `domain.de/petasync/`)
- Dann musst du in `vite.config.ts` die `base` Option setzen:
```typescript
export default defineConfig({
  base: '/petasync/',  // Wenn in Unterverzeichnis
  // ...
})
```

### Problem: Login funktioniert nicht

**Lösung:**
1. Prüfe Supabase URL in `.env` (vor dem Build!)
2. Prüfe ob Admin-Rolle in Supabase gesetzt ist
3. Prüfe Browser-Konsole auf Fehler

### Problem: Routing funktioniert nicht (404 bei Reload)

**Lösung:**
- `.htaccess` fehlt oder ist nicht aktiv
- Prüfe ob `mod_rewrite` bei Hetzner aktiviert ist (sollte Standard sein)

### Problem: Admin-Bereich zeigt "Keine Berechtigung"

**Lösung:**
```sql
-- Im Supabase SQL Editor prüfen:
SELECT u.email, ur.role
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id;

-- Falls keine Rolle: Admin-Rolle hinzufügen
INSERT INTO public.user_roles (user_id, role)
VALUES ('DEINE_USER_ID', 'admin');
```

---

## Wichtige Hinweise

### Kosten:
- **Hetzner Webhosting**: ~5€/Monat (für Frontend)
- **Supabase**: Kostenlos bis 500MB Datenbank & 2GB Storage
- **SSL-Zertifikat**: Kostenlos (Let's Encrypt)

### Performance:
- Alle Assets werden gecacht (1 Jahr)
- Gzip-Kompression ist aktiviert
- Code ist minifiziert und optimiert

### Sicherheit:
- HTTPS ist Pflicht (Let's Encrypt)
- Supabase hat Row Level Security (RLS)
- Admin-Bereich ist geschützt
- 2-Faktor-Authentifizierung verfügbar

---

## Support

Bei Problemen:
1. Prüfe Browser-Konsole (F12)
2. Prüfe Hetzner Server-Logs
3. Prüfe Supabase Logs im Dashboard
4. Kontaktiere Hetzner Support für Server-Probleme

---

## Checkliste für Go-Live

- [ ] Supabase Datenbank erstellt (SQL ausgeführt)
- [ ] Admin-Benutzer angelegt
- [ ] Admin-Rolle zugewiesen
- [ ] Production Build erstellt (`npm run build`)
- [ ] Alle Dateien aus `dist/` hochgeladen
- [ ] `.htaccess` hochgeladen
- [ ] SSL/HTTPS aktiviert
- [ ] Domain zeigt auf Hetzner
- [ ] Website öffnet sich korrekt
- [ ] Admin-Login funktioniert
- [ ] Kontaktformular funktioniert
- [ ] Alle Seiten erreichbar (Routing funktioniert)

✅ **Fertig! Deine Webseite ist live!**
