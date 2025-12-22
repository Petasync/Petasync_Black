-- =====================================================
-- ADMIN SYSTEM DATABASE SCHEMA
-- =====================================================

-- Create ENUMs for status tracking
CREATE TYPE public.inquiry_status AS ENUM ('neu', 'in_bearbeitung', 'angebot_erstellt', 'beantwortet', 'erledigt', 'archiviert');
CREATE TYPE public.inquiry_priority AS ENUM ('normal', 'hoch', 'dringend');
CREATE TYPE public.inquiry_type AS ENUM ('privat', 'business', 'website');
CREATE TYPE public.appointment_status AS ENUM ('ausstehend', 'bestaetigt', 'abgesagt', 'erledigt');
CREATE TYPE public.quote_status AS ENUM ('entwurf', 'versendet', 'angenommen', 'abgelehnt', 'rechnung_erstellt');
CREATE TYPE public.invoice_status AS ENUM ('entwurf', 'versendet', 'bezahlt', 'ueberfaellig', 'storniert');
CREATE TYPE public.project_status AS ENUM ('anfrage', 'angebot', 'anzahlung', 'umsetzung', 'review', 'live', 'wartung');
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- =====================================================
-- USER ROLES (for admin access)
-- =====================================================
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- ADMIN PROFILES (for 2FA and settings)
-- =====================================================
CREATE TABLE public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
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

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view own profile" ON public.admin_profiles
FOR SELECT USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update own profile" ON public.admin_profiles
FOR UPDATE USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- CUSTOMERS
-- =====================================================
CREATE TABLE public.customers (
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

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage customers" ON public.customers
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- INQUIRIES (Anfragen)
-- =====================================================
CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
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

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage inquiries" ON public.inquiries
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Allow anonymous inserts for contact form
CREATE POLICY "Anyone can create inquiries" ON public.inquiries
FOR INSERT WITH CHECK (true);

-- =====================================================
-- APPOINTMENTS (Termine)
-- =====================================================
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    inquiry_id UUID REFERENCES public.inquiries(id) ON DELETE SET NULL,
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

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage appointments" ON public.appointments
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- SERVICE CATALOG
-- =====================================================
CREATE TABLE public.service_catalog (
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

ALTER TABLE public.service_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage catalog" ON public.service_catalog
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- QUOTES (Angebote)
-- =====================================================
CREATE TABLE public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    inquiry_id UUID REFERENCES public.inquiries(id) ON DELETE SET NULL,
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

ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage quotes" ON public.quotes
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- QUOTE LINE ITEMS
-- =====================================================
CREATE TABLE public.quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE NOT NULL,
    service_id UUID REFERENCES public.service_catalog(id) ON DELETE SET NULL,
    position INTEGER DEFAULT 1,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit TEXT DEFAULT 'Stk.',
    unit_price DECIMAL(10,2) NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    total DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage quote items" ON public.quote_items
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- INVOICES (Rechnungen)
-- =====================================================
CREATE TABLE public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
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

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage invoices" ON public.invoices
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- INVOICE LINE ITEMS
-- =====================================================
CREATE TABLE public.invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE NOT NULL,
    service_id UUID REFERENCES public.service_catalog(id) ON DELETE SET NULL,
    position INTEGER DEFAULT 1,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit TEXT DEFAULT 'Stk.',
    unit_price DECIMAL(10,2) NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    total DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage invoice items" ON public.invoice_items
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- WEBSITE PROJECTS
-- =====================================================
CREATE TABLE public.website_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    inquiry_id UUID REFERENCES public.inquiries(id) ON DELETE SET NULL,
    quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
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

ALTER TABLE public.website_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage website projects" ON public.website_projects
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- SETTINGS
-- =====================================================
CREATE TABLE public.admin_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage settings" ON public.admin_settings
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Insert default settings
INSERT INTO public.admin_settings (key, value) VALUES
('company', '{"name": "Petasync", "owner": "", "street": "", "zip": "", "city": "Dietenhofen", "phone": "+49 163 711 7198", "email": "info@petasync.de", "website": "https://petasync.de", "tax_number": "", "iban": "", "bic": "", "bank_name": ""}'::jsonb),
('number_sequences', '{"quote_prefix": "AG", "quote_suffix": "", "quote_counter": 1, "quote_year_reset": true, "invoice_prefix": "RE", "invoice_suffix": "", "invoice_counter": 1, "invoice_year_reset": true, "customer_prefix": "KD", "customer_counter": 1}'::jsonb),
('pdf_templates', '{"quote_header": "", "quote_footer": "Kleinunternehmer gemäß § 19 UStG - keine Ausweisung von Umsatzsteuer.", "invoice_header": "", "invoice_footer": "Kleinunternehmer gemäß § 19 UStG - keine Ausweisung von Umsatzsteuer.", "accent_color": "#3b82f6"}'::jsonb),
('email_templates', '{"quote_subject": "Ihr Angebot {ANGEBOT_NR}", "quote_body": "Sehr geehrte/r {KUNDE_NAME},\n\nanbei erhalten Sie Ihr Angebot.\n\nMit freundlichen Grüßen", "invoice_subject": "Ihre Rechnung {RECHNUNG_NR}", "invoice_body": "Sehr geehrte/r {KUNDE_NAME},\n\nanbei erhalten Sie Ihre Rechnung.\n\nMit freundlichen Grüßen", "reminder_subject": "Zahlungserinnerung {RECHNUNG_NR}", "reminder_body": "Sehr geehrte/r {KUNDE_NAME},\n\nbitte beachten Sie die ausstehende Zahlung.\n\nMit freundlichen Grüßen"}'::jsonb),
('notifications', '{"email_on_inquiry": true, "email_on_appointment": true, "daily_summary": false}'::jsonb);

-- =====================================================
-- NUMBER SEQUENCE FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_next_number(sequence_type TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
    SELECT value INTO settings_record FROM public.admin_settings WHERE key = 'number_sequences';
    
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
    
    -- Increment counter
    IF sequence_type = 'quote' THEN
        settings_record := jsonb_set(settings_record, '{quote_counter}', to_jsonb(counter + 1));
    ELSIF sequence_type = 'invoice' THEN
        settings_record := jsonb_set(settings_record, '{invoice_counter}', to_jsonb(counter + 1));
    ELSIF sequence_type = 'customer' THEN
        settings_record := jsonb_set(settings_record, '{customer_counter}', to_jsonb(counter + 1));
    END IF;
    
    UPDATE public.admin_settings SET value = settings_record, updated_at = now() WHERE key = 'number_sequences';
    
    RETURN new_number;
END;
$$;

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply triggers
CREATE TRIGGER update_admin_profiles_updated_at BEFORE UPDATE ON public.admin_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_service_catalog_updated_at BEFORE UPDATE ON public.service_catalog FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_website_projects_updated_at BEFORE UPDATE ON public.website_projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();