# 🔐 User Management Setup

Die Benutzerverwaltung ist jetzt im Admin-Panel verfügbar!

## ✅ Was wurde implementiert

- **Benutzerverwaltung Seite** unter `/admin/users`
- Neue Admin-Benutzer erstellen
- Passwörter zurücksetzen (ohne E-Mail)
- 2FA aktivieren/deaktivieren
- Benutzer-Übersicht mit Login-Statistiken

## 🚀 Installation (Wichtig!)

### Schritt 1: SQL Funktionen erstellen

**Du musst einmalig die SQL Funktionen in Supabase erstellen!**

1. Gehe zu https://supabase.com/dashboard
2. Öffne dein Projekt: **opikfukjwoiczdwiedtx**
3. Klicke links auf **SQL Editor**
4. Öffne die Datei `supabase/migrations/user_management_functions.sql`
5. Kopiere den **kompletten Inhalt**
6. Füge ihn in den Supabase SQL Editor ein
7. Klicke auf **RUN** (oder Strg+Enter)
8. Warte auf "Success. No rows returned"

### Schritt 2: Website deployen

```bash
# Lokal builden
npm run build

# dist/ Ordner via FileZilla hochladen
# (siehe DEPLOYMENT.md für Details)
```

## 📝 Verwendung

### Im Admin-Panel

1. Gehe zu **Benutzerverwaltung** in der Navigation
2. Klicke **"Neuer Admin"** um einen Benutzer zu erstellen
3. Oder klicke **"Passwort"** bei einem Benutzer um das Passwort zu ändern
4. Toggle **2FA** für zusätzliche Sicherheit

### Fallback: Manuell via SQL

Falls die Buttons nicht funktionieren (SQL-Funktionen nicht ausgeführt):

**Passwort ändern:**
```sql
UPDATE auth.users
SET encrypted_password = crypt('NeuesPasswort123', gen_salt('bf'))
WHERE email = 'admin@petasync.de';
```

**Benutzer erstellen:**
```sql
-- Siehe SQL-Snippet in der User Management Seite
-- oder in den Fehlermeldungen
```

## 🔒 Sicherheit

- Alle Passwörter werden mit bcrypt gehasht
- Mindestlänge: 8 Zeichen
- Account-Sperre nach 5 fehlgeschlagenen Logins
- 2FA-Unterstützung (TOTP)

## ⚠️ Wichtig

**Nach dem SQL ausführen:**
- Die "Neuer Admin" Funktion wird funktionieren
- Die "Passwort ändern" Funktion wird funktionieren
- Vorher zeigen sie SQL-Anweisungen zum manuellen Ausführen

## 🆘 Probleme?

**Fehler: "function does not exist"**
→ SQL-Funktionen noch nicht in Supabase ausgeführt (siehe Schritt 1)

**Benutzer kann sich nicht anmelden**
→ Account möglicherweise gesperrt, SQL ausführen:
```sql
UPDATE admin_profiles
SET failed_login_attempts = 0, locked_until = NULL
WHERE email = 'admin@petasync.de';
```

**Keine Benutzer in der Liste**
→ Prüfe ob `admin_profiles` und `user_roles` Daten haben
