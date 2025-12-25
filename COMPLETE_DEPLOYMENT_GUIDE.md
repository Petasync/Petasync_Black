# 🚀 Komplette Deployment-Anleitung für Petasync Admin Panel

Diese Anleitung führt dich durch die **erstmalige Einrichtung** des kompletten Admin-Panels.

## 📋 Übersicht

Das Admin-Panel ist jetzt vollständig implementiert mit:
- ✅ Benutzerverwaltung (User Management)
- ✅ Kundenmanagement
- ✅ Anfragen & Termine
- ✅ Angebote & Rechnungen
- ✅ Website-Projekte
- ✅ Einstellungen (Firmendaten, Nummernkreise, Benachrichtigungen)
- ✅ 2FA-Authentifizierung
- ✅ Sicheres Login mit Account-Sperre

## 🗄️ Teil 1: Datenbank Setup (Supabase)

### Schritt 1: Supabase SQL Editor öffnen

1. Gehe zu https://supabase.com/dashboard
2. Wähle dein Projekt: **opikfukjwoiczdwiedtx**
3. Klicke links auf **SQL Editor**

### Schritt 2: Haupt-Schema erstellen

**Wichtig:** Diese Migration muss zuerst ausgeführt werden!

1. Öffne die Datei: `supabase/migrations/20251222130957_ee998d38-d187-497c-995e-a12d8a8068c0.sql`
2. Kopiere den **kompletten Inhalt**
3. Füge ihn in den Supabase SQL Editor ein
4. Klicke auf **RUN** (oder Strg+Enter)
5. Warte auf "Success"

**Was wird erstellt:**
- Alle Tabellen (customers, inquiries, appointments, quotes, invoices, website_projects, admin_settings, etc.)
- ENUMs für Status-Tracking
- RLS (Row Level Security) Policies
- Default-Einstellungen

### Schritt 3: User Management Funktionen erstellen

**Wichtig:** Erst nach Schritt 2 ausführen!

1. Öffne die Datei: `supabase/migrations/user_management_functions.sql`
2. Kopiere den **kompletten Inhalt**
3. Füge ihn in den Supabase SQL Editor ein
4. Klicke auf **RUN** (oder Strg+Enter)
5. Warte auf "Success"

**Was wird erstellt:**
- `create_admin_user(email, password)` Funktion
- `reset_user_password(user_id, new_password)` Funktion

### Schritt 4: Ersten Admin-User erstellen

Jetzt kannst du deinen ersten Admin-User erstellen:

```sql
-- Methode 1: Mit der neuen Funktion (empfohlen)
SELECT create_admin_user('master@petasync.de', 'DeinSicheresPasswort123');

-- Methode 2: Manuell (Fallback)
-- Siehe vorherige Anleitungen in den Commit-Messages
```

## 💻 Teil 2: Frontend Deployment

### Schritt 1: Projekt bauen

Öffne das Terminal in deinem Projekt-Ordner:

```bash
# Dependencies installieren (falls noch nicht geschehen)
npm install

# Projekt bauen
npm run build
```

### Schritt 2: Via FileZilla hochladen

1. **FileZilla öffnen** und verbinden:
   - Host: `www361.your-server.de`
   - Benutzername: `petasy`
   - Passwort: `[DEIN_FTP_PASSWORT]`
   - Port: `21`

2. **dist/ Ordner hochladen**:
   - Navigiere lokal zu `dist/`
   - Wähle **alle Dateien** in `dist/` aus
   - Ziehe sie ins **Root-Verzeichnis** auf dem Server
   - **Vorhandene Dateien überschreiben**

3. **Fertig!**
   - Gehe zu https://petasync.de/admin/login
   - Melde dich mit deinem Admin-Account an

## ✅ Teil 3: Funktionstest

### Admin-Login testen

1. Gehe zu https://petasync.de/admin/login
2. Melde dich mit deiner E-Mail und Passwort an
3. Du solltest zum Dashboard weitergeleitet werden

### Features testen

**Dashboard:**
- ✅ Übersicht sollte leer sein (noch keine Daten)
- ✅ Navigation funktioniert

**Benutzerverwaltung** (`/admin/users`):
- ✅ Tabelle zeigt deinen Admin-Account
- ✅ "Neuer Admin" Button funktioniert
- ✅ "Passwort ändern" funktioniert
- ✅ "2FA an/aus" funktioniert

**Kunden** (`/admin/customers`):
- ✅ Leere Liste (noch keine Kunden)
- ✅ "Neuer Kunde" öffnet Dialog

**Anfragen** (`/admin/inquiries`):
- ✅ Liste zeigt Anfragen vom Kontaktformular

**Termine** (`/admin/appointments`):
- ✅ Kalender-Ansicht oder Liste

**Angebote** (`/admin/quotes`):
- ✅ Leere Liste, "Neues Angebot" funktioniert

**Rechnungen** (`/admin/invoices`):
- ✅ Leere Liste, "Neue Rechnung" funktioniert

**Website-Projekte** (`/admin/website-projects`):
- ✅ Leere Liste, "Neues Projekt" funktioniert

**Einstellungen** (`/admin/settings`):
- ✅ Firmendaten sind vorausgefüllt
- ✅ Nummernkreise zeigen: AG-2025-0001, RE-2025-0001, KD-000001
- ✅ Benachrichtigungen: E-Mail bei Anfrage aktiv

## 🔧 Teil 4: Einstellungen konfigurieren

### Firmendaten eintragen

1. Gehe zu **Einstellungen** → **Firmendaten**
2. Fülle alle Felder aus:
   - Firmenname: Petasync
   - Inhaber: [Dein Name]
   - Adresse, PLZ, Ort
   - Telefon, E-Mail, Website
   - Steuernummer
   - IBAN, BIC, Bank
3. Klicke **Speichern**

### Nummernkreise anpassen

1. Gehe zu **Einstellungen** → **Nummernkreise**
2. Passe Präfixe an (z.B. "PETASYNC-AG" statt "AG")
3. Setze Zähler auf gewünschten Startwert
4. Klicke **Speichern**

## 🆘 Problemlösung

### Fehler: "Permission denied" oder "RLS policy violation"

**Ursache:** RLS-Policies blockieren Zugriff

**Lösung:**
```sql
-- Prüfe ob du Admin-Rolle hast
SELECT * FROM user_roles WHERE user_id = auth.uid();

-- Falls nicht, füge hinzu:
INSERT INTO user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'master@petasync.de'),
  'admin'
);
```

### Fehler: "Table does not exist"

**Ursache:** Haupt-Migration noch nicht ausgeführt

**Lösung:** Gehe zurück zu Teil 1, Schritt 2

### Fehler: "Function does not exist"

**Ursache:** User Management Migration noch nicht ausgeführt

**Lösung:** Gehe zurück zu Teil 1, Schritt 3

### Account ist gesperrt

```sql
UPDATE admin_profiles
SET failed_login_attempts = 0, locked_until = NULL
WHERE email = 'master@petasync.de';
```

### Website zeigt alte Version

**Lösung:** Browser-Cache leeren (Strg+F5 / Cmd+Shift+R)

### FileZilla verbindet nicht

**Lösung:**
- Prüfe FTP-Zugangsdaten in Hetzner konsoleH
- Versuche Port 21 (FTP) oder 22 (SFTP)
- Bei SSL-Warnung: "Immer diesem Zertifikat vertrauen"

## 📊 Nächste Schritte

Nach erfolgreicher Einrichtung kannst du:

1. **Kunden anlegen**: Importiere oder erstelle deine ersten Kunden
2. **Dienste katalogisieren**: Füge Standard-Services hinzu (Settings → Services)
3. **Erstes Angebot erstellen**: Teste den kompletten Workflow
4. **E-Mail-Templates anpassen**: Personalisiere Angebot- und Rechnungs-E-Mails
5. **Logo hochladen**: Füge dein Firmenlogo hinzu (für PDFs)

## 🔐 Sicherheitshinweise

- ✅ Nutze **starke Passwörter** (min. 12 Zeichen)
- ✅ Aktiviere **2FA** für alle Admin-Accounts
- ✅ Ändere das **Master-Passwort** regelmäßig
- ✅ Erstelle **Backups** vor größeren Änderungen
- ✅ Teile **FTP-Zugangsdaten niemals** öffentlich

## 📞 Support

Bei Problemen:
1. Prüfe die Konsole im Browser (F12 → Console)
2. Prüfe Supabase Logs (Dashboard → Logs)
3. Prüfe diese Anleitung nochmal
4. Erstelle ein GitHub Issue mit Screenshots

---

**Viel Erfolg mit deinem neuen Admin-Panel!** 🎉
