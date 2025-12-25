# Supabase SQL Migrations

Diese SQL-Dateien müssen im **Supabase SQL Editor** ausgeführt werden, damit die Admin-Panel Funktionen korrekt funktionieren.

## 🚀 Anleitung

### 1. Supabase SQL Editor öffnen
1. Gehe zu https://supabase.com/dashboard
2. Wähle dein Projekt: **opikfukjwoiczdwiedtx**
3. Klicke links auf **SQL Editor**

### 2. SQL Migration ausführen

#### User Management Funktionen
**Datei:** `user_management_functions.sql`

Diese Migration erstellt zwei wichtige Funktionen:
- `create_admin_user(email, password)` - Erstellt neue Admin-Benutzer
- `reset_user_password(user_id, new_password)` - Setzt Passwörter zurück

**So ausführen:**
1. Öffne die Datei `user_management_functions.sql`
2. Kopiere den kompletten Inhalt
3. Füge ihn in den Supabase SQL Editor ein
4. Klicke auf **RUN** (oder Strg+Enter)
5. Warte auf "Success. No rows returned"

### 3. Funktionen testen

Nach dem Ausführen der Migration kannst du die Funktionen testen:

```sql
-- Neuen Admin-Benutzer erstellen
SELECT create_admin_user('test@petasync.de', 'TestPassword123');

-- Passwort zurücksetzen (ersetze USER_ID mit tatsächlicher ID)
SELECT reset_user_password('USER_ID_HIER', 'NeuesPasswort123');
```

## 🔒 Sicherheit

Diese Funktionen sind mit `SECURITY DEFINER` markiert, was bedeutet:
- Sie laufen mit erhöhten Rechten
- Sie können direkt auf `auth.users` zugreifen
- Sie sind nur für authentifizierte Admins gedacht

## 📝 Hinweise

- Die Funktionen validieren E-Mail und Passwort
- Passwörter müssen mindestens 8 Zeichen lang sein
- E-Mails müssen eindeutig sein
- Bei Passwort-Reset wird auch der Account entsperrt (failed_login_attempts = 0)

## ⚠️ Fehlerbehebung

**Fehler: "permission denied"**
→ Du musst als Service Role angemeldet sein oder die RLS-Policies anpassen

**Fehler: "function already exists"**
→ Die Funktion wurde bereits erstellt. Nutze `CREATE OR REPLACE FUNCTION` (ist schon im Code)

**Fehler: "column does not exist"**
→ Prüfe ob die Tabellen `admin_profiles` und `user_roles` existieren
