-- =====================================================
-- PETASYNC DATABASE SCHEMA - HETZNER POSTGRESQL
-- Angepasst von Supabase (ohne auth.users Abhängigkeit)
-- =====================================================

-- Aktiviere UUID Extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUMS für Status-Tracking
-- =====================================================
DO $$ BEGIN
    CREATE TYPE inquiry_status AS ENUM ('neu', 'in_bearbeitung', 'angebot_erstellt', 'beantwortet', 'erledigt', 'archiviert');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE inquiry_priority AS ENUM ('normal', 'hoch', 'dringend');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE inquiry_type AS ENUM ('privat', 'business', 'website');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE appointment_status AS ENUM ('ausstehend', 'bestaetigt', 'abgesagt', 'erledigt');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE quote_status AS ENUM ('entwurf', 'versendet', 'angenommen', 'abgelehnt', 'rechnung_erstellt');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE invoice_status AS ENUM ('entwurf', 'versendet', 'bezahlt', 'ueberfaellig', 'storniert');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('anfrage', 'angebot', 'anzahlung', 'umsetzung', 'review', 'live', 'wartung');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE app_role AS ENUM ('admin', 'user');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =====================================================
-- USERS (ersetzt Supabase auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token TEXT,
    password_reset_token TEXT,
    password_reset_expires TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_password_reset_token ON users(password_reset_token);

-- =====================================================
-- USER ROLES (für Admin-Zugang)
-- =====================================================
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);

-- =====================================================
-- ADMIN PROFILES (für 2FA und Einstellungen)
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT NOT NULL,
    display_name TEXT,
    totp_secret TEXT,
    totp_enabled BOOLEAN DEFAULT FALSE,
    backup_codes TEXT[],
    trusted_devices JSONB DEFAULT '[]'::jsonb,
    last_login TIMESTAMP WITH TIME ZONE,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_profiles_user_id ON admin_profiles(user_id);

-- =====================================================
-- SESSIONS (für JWT Token Management)
-- =====================================================
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    token_hash TEXT NOT NULL,
    refresh_token_hash TEXT,
    user_agent TEXT,
    ip_address TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- =====================================================
-- CUSTOMERS (Kunden)
-- =====================================================
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_number TEXT UNIQUE,
    company_name TEXT,
    first_name TEXT,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    street TEXT,
    zip TEXT,
    city TEXT,
    customer_type inquiry_type DEFAULT 'privat',
    tags TEXT[] DEFAULT '{}',
    notes TEXT,
    total_revenue DECIMAL(12,2) DEFAULT 0,
    inquiry_count INTEGER DEFAULT 0,
    last_inquiry_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customers_customer_number ON customers(customer_number);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- =====================================================
-- INQUIRIES (Anfragen)
-- =====================================================
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    inquiry_type inquiry_type DEFAULT 'privat',
    subject TEXT,
    message TEXT NOT NULL,
    status inquiry_status DEFAULT 'neu',
    priority inquiry_priority DEFAULT 'normal',
    internal_notes TEXT,
    source TEXT DEFAULT 'website',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_customer_id ON inquiries(customer_id);

-- =====================================================
-- APPOINTMENTS (Termine)
-- =====================================================
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    service_type TEXT,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    status appointment_status DEFAULT 'ausstehend',
    location TEXT,
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- =====================================================
-- SERVICE CATALOG (Dienstleistungskatalog)
-- =====================================================
CREATE TABLE IF NOT EXISTS service_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    default_price DECIMAL(10,2),
    unit TEXT DEFAULT 'pauschal',
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- QUOTES (Angebote)
-- =====================================================
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
    status quote_status DEFAULT 'entwurf',
    quote_date DATE NOT NULL DEFAULT CURRENT_DATE,
    valid_until DATE,
    subtotal DECIMAL(12,2) DEFAULT 0,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total DECIMAL(12,2) DEFAULT 0,
    notes TEXT,
    terms TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    accepted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quotes_quote_number ON quotes(quote_number);
CREATE INDEX IF NOT EXISTS idx_quotes_customer_id ON quotes(customer_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);

-- =====================================================
-- QUOTE ITEMS (Angebotspositionen)
-- =====================================================
CREATE TABLE IF NOT EXISTS quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE NOT NULL,
    service_id UUID REFERENCES service_catalog(id) ON DELETE SET NULL,
    position INTEGER DEFAULT 1,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit TEXT DEFAULT 'Stk.',
    unit_price DECIMAL(10,2) NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    total DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quote_items_quote_id ON quote_items(quote_id);

-- =====================================================
-- INVOICES (Rechnungen)
-- =====================================================
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    quote_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
    status invoice_status DEFAULT 'entwurf',
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    delivery_date DATE,
    due_date DATE,
    subtotal DECIMAL(12,2) DEFAULT 0,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total DECIMAL(12,2) DEFAULT 0,
    notes TEXT,
    payment_terms TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    paid_at TIMESTAMP WITH TIME ZONE,
    paid_amount DECIMAL(12,2),
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);

-- =====================================================
-- INVOICE ITEMS (Rechnungspositionen)
-- =====================================================
CREATE TABLE IF NOT EXISTS invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE NOT NULL,
    service_id UUID REFERENCES service_catalog(id) ON DELETE SET NULL,
    position INTEGER DEFAULT 1,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit TEXT DEFAULT 'Stk.',
    unit_price DECIMAL(10,2) NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    total DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items(invoice_id);

-- =====================================================
-- JOBS (Aufträge)
-- =====================================================
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    quote_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
    invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'offen',
    scheduled_date DATE,
    completed_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_jobs_customer_id ON jobs(customer_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);

-- =====================================================
-- WEBSITE PROJECTS (Website-Projekte)
-- =====================================================
CREATE TABLE IF NOT EXISTS website_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
    quote_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
    project_name TEXT NOT NULL,
    package_type TEXT,
    budget_range TEXT,
    industry TEXT,
    domain TEXT,
    features TEXT[],
    status project_status DEFAULT 'anfrage',
    checklist JSONB DEFAULT '{}'::jsonb,
    notes TEXT,
    go_live_date DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_website_projects_customer_id ON website_projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_website_projects_status ON website_projects(status);

-- =====================================================
-- ADMIN SETTINGS (Einstellungen)
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Default Settings einfügen (nur wenn noch nicht vorhanden)
INSERT INTO admin_settings (key, value) VALUES
('company', '{"name": "Petasync", "owner": "", "street": "", "zip": "", "city": "Dietenhofen", "phone": "+49 163 711 7198", "email": "info@petasync.de", "website": "https://petasync.de", "tax_number": "", "iban": "", "bic": "", "bank_name": ""}'::jsonb),
('number_sequences', '{"quote_prefix": "AG", "quote_suffix": "", "quote_counter": 1, "quote_year_reset": true, "invoice_prefix": "RE", "invoice_suffix": "", "invoice_counter": 1, "invoice_year_reset": true, "customer_prefix": "KD", "customer_counter": 1}'::jsonb),
('pdf_templates', '{"quote_header": "", "quote_footer": "Kleinunternehmer gemäß § 19 UStG - keine Ausweisung von Umsatzsteuer.", "invoice_header": "", "invoice_footer": "Kleinunternehmer gemäß § 19 UStG - keine Ausweisung von Umsatzsteuer.", "accent_color": "#3b82f6"}'::jsonb),
('email_templates', '{"quote_subject": "Ihr Angebot {ANGEBOT_NR}", "quote_body": "Sehr geehrte/r {KUNDE_NAME},\n\nanbei erhalten Sie Ihr Angebot.\n\nMit freundlichen Grüßen", "invoice_subject": "Ihre Rechnung {RECHNUNG_NR}", "invoice_body": "Sehr geehrte/r {KUNDE_NAME},\n\nanbei erhalten Sie Ihre Rechnung.\n\nMit freundlichen Grüßen", "reminder_subject": "Zahlungserinnerung {RECHNUNG_NR}", "reminder_body": "Sehr geehrte/r {KUNDE_NAME},\n\nbitte beachten Sie die ausstehende Zahlung.\n\nMit freundlichen Grüßen"}'::jsonb),
('notifications', '{"email_on_inquiry": true, "email_on_appointment": true, "daily_summary": false}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Funktion um nächste Nummer zu generieren
CREATE OR REPLACE FUNCTION get_next_number(sequence_type TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    settings_record JSONB;
    prefix TEXT;
    suffix TEXT;
    counter INTEGER;
    year_reset BOOLEAN;
    current_year TEXT;
    new_number TEXT;
BEGIN
    SELECT value INTO settings_record FROM admin_settings WHERE key = 'number_sequences';

    IF sequence_type = 'quote' THEN
        prefix := COALESCE(settings_record->>'quote_prefix', 'AG');
        suffix := COALESCE(settings_record->>'quote_suffix', '');
        counter := COALESCE((settings_record->>'quote_counter')::INTEGER, 1);
        year_reset := COALESCE((settings_record->>'quote_year_reset')::BOOLEAN, true);
    ELSIF sequence_type = 'invoice' THEN
        prefix := COALESCE(settings_record->>'invoice_prefix', 'RE');
        suffix := COALESCE(settings_record->>'invoice_suffix', '');
        counter := COALESCE((settings_record->>'invoice_counter')::INTEGER, 1);
        year_reset := COALESCE((settings_record->>'invoice_year_reset')::BOOLEAN, true);
    ELSIF sequence_type = 'customer' THEN
        prefix := COALESCE(settings_record->>'customer_prefix', 'KD');
        suffix := '';
        counter := COALESCE((settings_record->>'customer_counter')::INTEGER, 1);
        year_reset := false;
    ELSE
        RAISE EXCEPTION 'Unknown sequence type: %', sequence_type;
    END IF;

    current_year := TO_CHAR(CURRENT_DATE, 'YYYY');

    IF year_reset THEN
        new_number := prefix || '-' || current_year || '-' || LPAD(counter::TEXT, 4, '0') || suffix;
    ELSE
        new_number := prefix || '-' || LPAD(counter::TEXT, 6, '0') || suffix;
    END IF;

    -- Counter erhöhen
    IF sequence_type = 'quote' THEN
        settings_record := jsonb_set(settings_record, '{quote_counter}', to_jsonb(counter + 1));
    ELSIF sequence_type = 'invoice' THEN
        settings_record := jsonb_set(settings_record, '{invoice_counter}', to_jsonb(counter + 1));
    ELSIF sequence_type = 'customer' THEN
        settings_record := jsonb_set(settings_record, '{customer_counter}', to_jsonb(counter + 1));
    END IF;

    UPDATE admin_settings SET value = settings_record, updated_at = now() WHERE key = 'number_sequences';

    RETURN new_number;
END;
$$;

-- Funktion um Rolle zu prüfen
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger auf alle relevanten Tabellen anwenden
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_profiles_updated_at ON admin_profiles;
CREATE TRIGGER update_admin_profiles_updated_at BEFORE UPDATE ON admin_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_inquiries_updated_at ON inquiries;
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_service_catalog_updated_at ON service_catalog;
CREATE TRIGGER update_service_catalog_updated_at BEFORE UPDATE ON service_catalog FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_jobs_updated_at ON jobs;
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_website_projects_updated_at ON website_projects;
CREATE TRIGGER update_website_projects_updated_at BEFORE UPDATE ON website_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- CLEANUP FUNCTION für abgelaufene Sessions
-- =====================================================
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM sessions WHERE expires_at < now();
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- RECURRING INVOICES (Wiederkehrende Rechnungen)
-- =====================================================
DO $$ BEGIN
    CREATE TYPE recurring_interval AS ENUM ('monatlich', 'vierteljaehrlich', 'halbjaehrlich', 'jaehrlich');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE recurring_status AS ENUM ('aktiv', 'pausiert', 'beendet');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS recurring_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
    -- Template-Daten
    title TEXT NOT NULL,
    description TEXT,
    subtotal DECIMAL(12,2) DEFAULT 0,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total DECIMAL(12,2) DEFAULT 0,
    notes TEXT,
    payment_terms TEXT,
    -- Wiederholungseinstellungen
    interval recurring_interval NOT NULL DEFAULT 'monatlich',
    start_date DATE NOT NULL,
    end_date DATE, -- NULL = unbegrenzt
    next_invoice_date DATE NOT NULL,
    last_invoice_date DATE,
    -- Status
    status recurring_status DEFAULT 'aktiv',
    invoices_generated INTEGER DEFAULT 0,
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_recurring_invoices_customer_id ON recurring_invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_recurring_invoices_status ON recurring_invoices(status);
CREATE INDEX IF NOT EXISTS idx_recurring_invoices_next_date ON recurring_invoices(next_invoice_date);

-- =====================================================
-- RECURRING INVOICE ITEMS (Positionen für wiederkehrende Rechnungen)
-- =====================================================
CREATE TABLE IF NOT EXISTS recurring_invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recurring_invoice_id UUID REFERENCES recurring_invoices(id) ON DELETE CASCADE NOT NULL,
    service_id UUID REFERENCES service_catalog(id) ON DELETE SET NULL,
    position INTEGER DEFAULT 1,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit TEXT DEFAULT 'Stk.',
    unit_price DECIMAL(10,2) NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    total DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_recurring_invoice_items_recurring_id ON recurring_invoice_items(recurring_invoice_id);

-- Verknüpfung: Welche Rechnungen wurden aus welchem Template generiert
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS recurring_invoice_id UUID REFERENCES recurring_invoices(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_invoices_recurring_id ON invoices(recurring_invoice_id);

-- Trigger für recurring_invoices
DROP TRIGGER IF EXISTS update_recurring_invoices_updated_at ON recurring_invoices;
CREATE TRIGGER update_recurring_invoices_updated_at BEFORE UPDATE ON recurring_invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- FUNKTION: Nächstes Rechnungsdatum berechnen
-- =====================================================
CREATE OR REPLACE FUNCTION calculate_next_invoice_date(
    current_date DATE,
    invoice_interval recurring_interval
)
RETURNS DATE
LANGUAGE plpgsql
AS $$
BEGIN
    CASE invoice_interval
        WHEN 'monatlich' THEN
            RETURN current_date + INTERVAL '1 month';
        WHEN 'vierteljaehrlich' THEN
            RETURN current_date + INTERVAL '3 months';
        WHEN 'halbjaehrlich' THEN
            RETURN current_date + INTERVAL '6 months';
        WHEN 'jaehrlich' THEN
            RETURN current_date + INTERVAL '1 year';
        ELSE
            RETURN current_date + INTERVAL '1 month';
    END CASE;
END;
$$;

-- =====================================================
-- DASHBOARD STATISTICS VIEW
-- =====================================================
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
    -- Anfragen
    (SELECT COUNT(*) FROM inquiries WHERE status = 'neu') as neue_anfragen,
    (SELECT COUNT(*) FROM inquiries WHERE created_at >= date_trunc('month', CURRENT_DATE)) as anfragen_diesen_monat,

    -- Angebote
    (SELECT COUNT(*) FROM quotes WHERE status = 'entwurf') as offene_angebote,
    (SELECT COUNT(*) FROM quotes WHERE status = 'versendet') as versendete_angebote,
    (SELECT COALESCE(SUM(total), 0) FROM quotes WHERE status = 'versendet') as angebotssumme_offen,

    -- Rechnungen
    (SELECT COUNT(*) FROM invoices WHERE status = 'versendet') as offene_rechnungen,
    (SELECT COUNT(*) FROM invoices WHERE status = 'ueberfaellig') as ueberfaellige_rechnungen,
    (SELECT COALESCE(SUM(total), 0) FROM invoices WHERE status IN ('versendet', 'ueberfaellig')) as ausstehende_zahlungen,

    -- Umsatz
    (SELECT COALESCE(SUM(total), 0) FROM invoices WHERE status = 'bezahlt') as gesamtumsatz,
    (SELECT COALESCE(SUM(total), 0) FROM invoices WHERE status = 'bezahlt' AND paid_at >= date_trunc('month', CURRENT_DATE)) as umsatz_diesen_monat,
    (SELECT COALESCE(SUM(total), 0) FROM invoices WHERE status = 'bezahlt' AND paid_at >= date_trunc('year', CURRENT_DATE)) as umsatz_dieses_jahr,

    -- Kunden
    (SELECT COUNT(*) FROM customers) as kunden_gesamt,
    (SELECT COUNT(*) FROM customers WHERE created_at >= date_trunc('month', CURRENT_DATE)) as neue_kunden_diesen_monat,

    -- Termine
    (SELECT COUNT(*) FROM appointments WHERE scheduled_at >= CURRENT_DATE AND status = 'ausstehend') as anstehende_termine,

    -- Jobs
    (SELECT COUNT(*) FROM jobs WHERE status = 'offen') as offene_auftraege,

    -- Wiederkehrende Rechnungen
    (SELECT COUNT(*) FROM recurring_invoices WHERE status = 'aktiv') as aktive_abos,
    (SELECT COALESCE(SUM(total), 0) FROM recurring_invoices WHERE status = 'aktiv') as monatlicher_wiederkehrend;

-- =====================================================
-- MONATLICHE UMSATZ-STATISTIK VIEW
-- =====================================================
CREATE OR REPLACE VIEW monthly_revenue AS
SELECT
    date_trunc('month', paid_at)::DATE as monat,
    COUNT(*) as anzahl_rechnungen,
    SUM(total) as umsatz
FROM invoices
WHERE status = 'bezahlt' AND paid_at IS NOT NULL
GROUP BY date_trunc('month', paid_at)
ORDER BY monat DESC
LIMIT 12;
