-- =====================================================
-- User Management Functions for Admin Panel
-- =====================================================
-- Diese Funktionen ermöglichen es dem Admin Panel,
-- neue Admin-Benutzer zu erstellen und Passwörter
-- zurückzusetzen, ohne E-Mails zu versenden.
-- =====================================================

-- Funktion: Admin-Benutzer erstellen
-- Erstellt einen neuen Benutzer, gibt ihm die Admin-Rolle
-- und erstellt ein Admin-Profil
CREATE OR REPLACE FUNCTION create_admin_user(
  user_email TEXT,
  user_password TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id UUID;
  result JSON;
BEGIN
  -- Validierung: E-Mail darf nicht leer sein
  IF user_email IS NULL OR user_email = '' THEN
    RAISE EXCEPTION 'E-Mail ist erforderlich';
  END IF;

  -- Validierung: Passwort muss mindestens 8 Zeichen haben
  IF user_password IS NULL OR LENGTH(user_password) < 8 THEN
    RAISE EXCEPTION 'Passwort muss mindestens 8 Zeichen lang sein';
  END IF;

  -- Prüfe ob E-Mail bereits existiert
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = user_email) THEN
    RAISE EXCEPTION 'Benutzer mit dieser E-Mail existiert bereits';
  END IF;

  -- Erstelle neuen User in auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    user_email,
    crypt(user_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO new_user_id;

  -- Erstelle Admin-Rolle
  INSERT INTO user_roles (user_id, role)
  VALUES (new_user_id, 'admin');

  -- Erstelle Admin-Profil
  INSERT INTO admin_profiles (
    user_id,
    email,
    totp_enabled,
    failed_login_attempts,
    created_at,
    updated_at
  )
  VALUES (
    new_user_id,
    user_email,
    FALSE,
    0,
    NOW(),
    NOW()
  );

  -- Erstelle identity für den User
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
  VALUES (
    gen_random_uuid(),
    new_user_id,
    jsonb_build_object('sub', new_user_id::text, 'email', user_email),
    'email',
    NOW(),
    NOW(),
    NOW()
  );

  result := json_build_object(
    'success', TRUE,
    'user_id', new_user_id,
    'email', user_email
  );

  RETURN result;

EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Fehler beim Erstellen des Benutzers: %', SQLERRM;
END;
$$;

-- Funktion: Passwort zurücksetzen
-- Setzt das Passwort eines Benutzers zurück
-- ohne E-Mail zu versenden
CREATE OR REPLACE FUNCTION reset_user_password(
  user_id UUID,
  new_password TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  -- Validierung: User ID darf nicht NULL sein
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'Benutzer-ID ist erforderlich';
  END IF;

  -- Validierung: Passwort muss mindestens 8 Zeichen haben
  IF new_password IS NULL OR LENGTH(new_password) < 8 THEN
    RAISE EXCEPTION 'Passwort muss mindestens 8 Zeichen lang sein';
  END IF;

  -- Prüfe ob User existiert
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user_id) THEN
    RAISE EXCEPTION 'Benutzer nicht gefunden';
  END IF;

  -- Setze neues Passwort
  UPDATE auth.users
  SET
    encrypted_password = crypt(new_password, gen_salt('bf')),
    updated_at = NOW()
  WHERE id = user_id;

  -- Setze failed_login_attempts zurück (falls gesperrt)
  UPDATE admin_profiles
  SET
    failed_login_attempts = 0,
    locked_until = NULL,
    updated_at = NOW()
  WHERE user_id = user_id;

  result := json_build_object(
    'success', TRUE,
    'user_id', user_id
  );

  RETURN result;

EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Fehler beim Zurücksetzen des Passworts: %', SQLERRM;
END;
$$;

-- Kommentar: Diese Funktionen können nur vom authenticated role ausgeführt werden
COMMENT ON FUNCTION create_admin_user IS 'Erstellt einen neuen Admin-Benutzer mit E-Mail und Passwort';
COMMENT ON FUNCTION reset_user_password IS 'Setzt das Passwort eines Benutzers zurück ohne E-Mail';
