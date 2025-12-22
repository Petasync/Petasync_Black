# Admin-Benutzer in Supabase anlegen

## Schnellanleitung

### Variante 1: Über Supabase Dashboard (Einfach)

#### Schritt 1: Benutzer erstellen
1. Gehe zu: https://supabase.com/dashboard/project/xfwyckafcayknxwwspfe/auth/users
2. Klicke **"Add user"** → **"Create new user"**
3. Gib E-Mail und Passwort ein
4. Klicke **"Create user"**
5. **WICHTIG**: Kopiere die **User ID** (UUID, z.B. `a1b2c3d4-...`)

#### Schritt 2: Admin-Rolle zuweisen
1. Gehe zu: https://supabase.com/dashboard/project/xfwyckafcayknxwwspfe/editor
2. Öffne den **SQL Editor**
3. Führe folgendes SQL aus:

```sql
-- ERSETZE die User ID und E-Mail!
INSERT INTO public.user_roles (user_id, role)
VALUES ('HIER_USER_ID_EINFÜGEN', 'admin');

INSERT INTO public.admin_profiles (user_id, email)
VALUES ('HIER_USER_ID_EINFÜGEN', 'admin@petasync.de');
```

#### Beispiel:
```sql
-- Beispiel mit echter User ID
INSERT INTO public.user_roles (user_id, role)
VALUES ('a1b2c3d4-5678-90ab-cdef-1234567890ab', 'admin');

INSERT INTO public.admin_profiles (user_id, email)
VALUES ('a1b2c3d4-5678-90ab-cdef-1234567890ab', 'admin@petasync.de');
```

---

### Variante 2: Direkt über SQL (Fortgeschritten)

```sql
-- Kompletter Befehl zum Erstellen eines Admin-Benutzers
-- PASSE E-MAIL UND PASSWORT AN!

DO $$
DECLARE
  new_user_id UUID;
  user_email TEXT := 'admin@petasync.de';  -- HIER ANPASSEN
  user_password TEXT := 'DeinSicheresPasswort123!';  -- HIER ANPASSEN
BEGIN
  -- Benutzer in auth.users erstellen
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    confirmation_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    user_email,
    crypt(user_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    ''
  ) RETURNING id INTO new_user_id;

  -- Admin-Rolle zuweisen
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new_user_id, 'admin');

  -- Admin-Profil erstellen
  INSERT INTO public.admin_profiles (user_id, email)
  VALUES (new_user_id, user_email);

  RAISE NOTICE 'Admin-Benutzer erstellt: % (ID: %)', user_email, new_user_id;
END $$;
```

⚠️ **Hinweis**: Variante 2 funktioniert nur, wenn du die Funktion `crypt` verfügbar hast (pgcrypto Extension).

---

### Variante 3: Über die Admin-Oberfläche (Nach erstem Login)

Sobald du dich als Admin angemeldet hast:

1. Gehe zu: **https://deine-domain.de/admin/users**
2. Klicke **"Neuer Benutzer"**
3. Fülle das Formular aus:
   - E-Mail-Adresse
   - Passwort (mindestens 8 Zeichen)
   - Rolle: `admin`
   - Aktiv: ✓
   - 2FA: Optional
4. Klicke **"Erstellen"**

---

## Benutzer verwalten

### Benutzer deaktivieren

```sql
-- Benutzer deaktivieren (kann nicht mehr anmelden)
UPDATE public.admin_profiles
SET locked_until = now() + interval '999 years'
WHERE email = 'benutzer@example.com';
```

### Benutzer aktivieren

```sql
-- Benutzer wieder aktivieren
UPDATE public.admin_profiles
SET locked_until = NULL
WHERE email = 'benutzer@example.com';
```

### Admin-Rolle entfernen

```sql
-- Admin-Rechte entziehen
DELETE FROM public.user_roles
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'benutzer@example.com'
) AND role = 'admin';
```

### Passwort zurücksetzen

**Über Supabase Dashboard:**
1. Gehe zu: Auth → Users
2. Klicke auf den Benutzer
3. Klicke **"Send password recovery"**
4. Benutzer erhält E-Mail mit Reset-Link

**Oder über Admin-Oberfläche:**
1. Gehe zu `/admin/users`
2. Klicke auf das Schlüssel-Symbol beim Benutzer
3. E-Mail wird automatisch gesendet

---

## Alle Admin-Benutzer anzeigen

```sql
-- Zeige alle Admins mit Details
SELECT
  u.email,
  u.created_at as "Erstellt am",
  ap.last_login as "Letzter Login",
  ap.totp_enabled as "2FA aktiv",
  CASE WHEN ap.locked_until > now() THEN 'Gesperrt' ELSE 'Aktiv' END as Status
FROM auth.users u
INNER JOIN public.user_roles ur ON u.id = ur.user_id
LEFT JOIN public.admin_profiles ap ON u.id = ap.user_id
WHERE ur.role = 'admin'
ORDER BY u.created_at DESC;
```

---

## Wichtige Sicherheitshinweise

### Starke Passwörter verwenden:
- Mindestens 12 Zeichen
- Groß- und Kleinbuchstaben
- Zahlen und Sonderzeichen
- Beispiel: `P3t@sync!2024#Admin`

### 2-Faktor-Authentifizierung aktivieren:
1. Als Admin anmelden
2. Gehe zu `/admin/2fa-setup`
3. QR-Code mit Authenticator-App scannen (Google Authenticator, Authy)
4. Code eingeben und bestätigen

### Regelmäßige Überprüfung:
```sql
-- Zeige letzte Login-Aktivitäten
SELECT
  u.email,
  ap.last_login,
  ap.failed_login_attempts,
  ap.locked_until
FROM auth.users u
LEFT JOIN public.admin_profiles ap ON u.id = ap.user_id
INNER JOIN public.user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin'
ORDER BY ap.last_login DESC;
```

---

## Troubleshooting

### Problem: "Keine Berechtigung" beim Login

**Prüfen ob Admin-Rolle existiert:**
```sql
SELECT * FROM public.user_roles
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'deine@email.de');
```

**Falls leer → Rolle hinzufügen:**
```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'deine@email.de';
```

### Problem: Benutzer kann sich nicht anmelden

**Prüfe ob E-Mail bestätigt ist:**
```sql
SELECT email, email_confirmed_at
FROM auth.users
WHERE email = 'deine@email.de';
```

**Falls NULL → E-Mail bestätigen:**
```sql
UPDATE auth.users
SET email_confirmed_at = now()
WHERE email = 'deine@email.de';
```

### Problem: "Account gesperrt"

```sql
-- Sperre aufheben
UPDATE public.admin_profiles
SET locked_until = NULL,
    failed_login_attempts = 0
WHERE email = 'deine@email.de';
```

---

## Standardbenutzer für Tests

Zum Testen kannst du einen Test-Admin anlegen:

```sql
-- Test-Admin erstellen (NUR FÜR ENTWICKLUNG!)
-- E-Mail: test@petasync.de
-- Passwort: Test123456!

-- In Production: ANDEREN BENUTZER MIT SICHEREM PASSWORT ERSTELLEN!
```

⚠️ **WICHTIG**: Lösche Test-Benutzer vor Go-Live!

---

## Checkliste für Production

- [ ] Mindestens einen Admin-Benutzer angelegt
- [ ] Starkes Passwort verwendet (12+ Zeichen)
- [ ] Admin-Rolle korrekt zugewiesen
- [ ] Admin-Profil erstellt
- [ ] Login getestet
- [ ] 2FA aktiviert (empfohlen)
- [ ] Test-Benutzer gelöscht
- [ ] Backup der Admin-E-Mails gespeichert

✅ **Admin-Bereich ist einsatzbereit!**
