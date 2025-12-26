-- =====================================================
-- SQL Statements für neue Features
-- Bitte in Supabase Dashboard → SQL Editor ausführen
-- =====================================================

-- 1. JOBS TABELLE (Auftrags-Dokumentation)
-- =====================================================
-- Hinweis: Tabelle wird NICHT gelöscht, nur IF NOT EXISTS verwendet
-- um vorhandene Daten zu schützen
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'offen' CHECK (status IN ('offen', 'in_arbeit', 'abgeschlossen', 'storniert')),
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('niedrig', 'normal', 'hoch', 'dringend')),
    notes TEXT,
    start_date DATE,
    due_date DATE,
    completed_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS für Jobs Tabelle aktivieren
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Admins können alles mit Jobs machen (erst löschen falls vorhanden)
DROP POLICY IF EXISTS "Admins can manage jobs" ON public.jobs;
CREATE POLICY "Admins can manage jobs" ON public.jobs
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.user_id = auth.uid()
        )
    );

-- Trigger für updated_at (erst löschen falls vorhanden)
DROP TRIGGER IF EXISTS update_jobs_updated_at ON public.jobs;
CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_jobs_customer_id ON public.jobs(customer_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs(created_at DESC);


-- 2. PDF STORAGE BUCKET (für automatische PDF-Speicherung)
-- =====================================================

-- SCHRITT 1: Storage Bucket erstellen (über Supabase UI)
-- WICHTIG: Dies muss über die Supabase UI erstellt werden:
-- 1. Gehe zu Storage → Create new bucket
-- 2. Name: "invoices"
-- 3. Public: false (privat)
-- 4. Danach SCHRITT 2 ausführen (die SQL Statements unten)

-- SCHRITT 2: RLS Policies für invoices bucket (SQL Editor)
DROP POLICY IF EXISTS "Authenticated users can upload invoices" ON storage.objects;
CREATE POLICY "Authenticated users can upload invoices"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'invoices');

DROP POLICY IF EXISTS "Authenticated users can read invoices" ON storage.objects;
CREATE POLICY "Authenticated users can read invoices"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'invoices');

DROP POLICY IF EXISTS "Authenticated users can update invoices" ON storage.objects;
CREATE POLICY "Authenticated users can update invoices"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'invoices');

DROP POLICY IF EXISTS "Authenticated users can delete invoices" ON storage.objects;
CREATE POLICY "Authenticated users can delete invoices"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'invoices');

-- SCHRITT 3: pdf_url Feld zur invoices Tabelle hinzufügen
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS pdf_url TEXT;


-- 3. BRANDING STORAGE BUCKET RLS POLICIES (WICHTIG!)
-- =====================================================
-- Diese Policies sind erforderlich, damit Logo-Upload funktioniert

DROP POLICY IF EXISTS "Allow authenticated uploads to branding" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to branding"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'branding');

DROP POLICY IF EXISTS "Allow public read access to branding" ON storage.objects;
CREATE POLICY "Allow public read access to branding"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'branding');

DROP POLICY IF EXISTS "Allow authenticated updates to branding" ON storage.objects;
CREATE POLICY "Allow authenticated updates to branding"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'branding');

DROP POLICY IF EXISTS "Allow authenticated deletes from branding" ON storage.objects;
CREATE POLICY "Allow authenticated deletes from branding"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'branding');


-- =====================================================
-- FERTIG!
-- =====================================================
-- Nach dem Ausführen dieser SQL-Statements:
-- 1. Neue Funktionen sind verfügbar
-- 2. Logo-Upload sollte funktionieren
-- 3. Jobs können erstellt werden
-- =====================================================
