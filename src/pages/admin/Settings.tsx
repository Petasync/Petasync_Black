import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { settings as settingsApi, migration as migrationApi, upload as uploadApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Loader2, Building2, Hash, FileText, Bell, Save, Palette, Upload, X, Receipt, Database, CheckCircle, AlertCircle } from 'lucide-react';

interface CompanySettings {
  name: string;
  owner: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  tax_number: string;
  iban: string;
  bic: string;
  bank_name: string;
}

interface NumberSettings {
  quote_prefix: string;
  quote_suffix: string;
  quote_counter: number;
  quote_year_reset: boolean;
  invoice_prefix: string;
  invoice_suffix: string;
  invoice_counter: number;
  invoice_year_reset: boolean;
  customer_prefix: string;
  customer_counter: number;
}

interface NotificationSettings {
  email_on_inquiry: boolean;
  email_on_appointment: boolean;
  daily_summary: boolean;
}

interface BrandingSettings {
  logo_url: string;
  logo_icon_url: string;
  primary_color: string;
  secondary_color: string;
  google_review_url: string;
  logo_variant: 'black-white' | 'beige-black' | 'violet-white';
}

interface PaymentMethodsSettings {
  paypal_link: string;
  paypal_enabled: boolean;
  cash_enabled: boolean;
  card_enabled: boolean;
  sepa_enabled: boolean;
  other_methods: string;
}

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [company, setCompany] = useState<CompanySettings>({
    name: '', owner: '', street: '', zip: '', city: '',
    phone: '', email: '', website: '', tax_number: '',
    iban: '', bic: '', bank_name: ''
  });
  const [numbers, setNumbers] = useState<NumberSettings>({
    quote_prefix: 'AG', quote_suffix: '', quote_counter: 1, quote_year_reset: true,
    invoice_prefix: 'RE', invoice_suffix: '', invoice_counter: 1, invoice_year_reset: true,
    customer_prefix: 'KD', customer_counter: 1
  });
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email_on_inquiry: true, email_on_appointment: true, daily_summary: false
  });
  const [branding, setBranding] = useState<BrandingSettings>({
    logo_url: '',
    logo_icon_url: '',
    primary_color: '#8B5CF6',
    secondary_color: '#F5F5DC',
    google_review_url: '',
    logo_variant: 'black-white'
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsSettings>({
    paypal_link: '',
    paypal_enabled: false,
    cash_enabled: true,
    card_enabled: false,
    sepa_enabled: true,
    other_methods: ''
  });
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<{
    table_counts: Record<string, number>;
    has_data: boolean;
  } | null>(null);
  const [runningMigration, setRunningMigration] = useState(false);

  useEffect(() => {
    fetchSettings();
    fetchMigrationStatus();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const response = await settingsApi.getAll();

    if (!response.success) {
      toast({ title: 'Fehler', description: response.error || 'Einstellungen konnten nicht geladen werden', variant: 'destructive' });
    } else if (response.data) {
      const data = response.data as Record<string, unknown>;
      if (data.company) setCompany(data.company as CompanySettings);
      if (data.number_sequences) setNumbers(data.number_sequences as NumberSettings);
      if (data.notifications) setNotifications(data.notifications as NotificationSettings);
      if (data.branding) setBranding(data.branding as BrandingSettings);
      if (data.payment_methods) setPaymentMethods(data.payment_methods as PaymentMethodsSettings);
    }
    setLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveSettings = async (key: string, value: any) => {
    setSaving(true);
    const response = await settingsApi.update(key, value);

    if (!response.success) {
      toast({ title: 'Fehler', description: response.error || 'Speichern fehlgeschlagen', variant: 'destructive' });
    } else {
      toast({ title: 'Einstellungen gespeichert' });
    }
    setSaving(false);
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'icon') => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Fehler',
        description: 'Ungültiger Dateityp. Erlaubt: JPG, PNG, GIF, WebP, SVG',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Fehler',
        description: 'Datei zu groß. Maximal 5MB erlaubt.',
        variant: 'destructive'
      });
      return;
    }

    setUploadingLogo(true);
    toast({ title: 'Uploading...', description: 'Datei wird hochgeladen...' });

    const response = await uploadApi.file(file, type);

    if (response.success && response.data) {
      const newBranding = type === 'logo'
        ? { ...branding, logo_url: response.data.url }
        : { ...branding, logo_icon_url: response.data.url };

      setBranding(newBranding);

      // Auto-save the branding settings
      await saveSettings('branding', newBranding);

      toast({
        title: 'Erfolgreich',
        description: `${type === 'logo' ? 'Logo' : 'Icon'} wurde hochgeladen`
      });
    } else {
      toast({
        title: 'Fehler',
        description: response.error || 'Upload fehlgeschlagen',
        variant: 'destructive'
      });
    }

    setUploadingLogo(false);
    // Reset the input so the same file can be selected again
    event.target.value = '';
  };

  const removeLogo = (type: 'logo' | 'icon') => {
    if (type === 'logo') {
      setBranding({ ...branding, logo_url: '' });
    } else {
      setBranding({ ...branding, logo_icon_url: '' });
    }
  };

  const fetchMigrationStatus = async () => {
    const response = await migrationApi.getStatus();
    if (response.success && response.data) {
      setMigrationStatus(response.data);
    }
  };

  const runMigration = async () => {
    if (!confirm('Möchten Sie wirklich die Daten importieren? Dies kann bestehende Daten überschreiben.')) {
      return;
    }

    setRunningMigration(true);
    toast({ title: 'Migration läuft...', description: 'Bitte warten Sie.' });

    const response = await migrationApi.run();

    if (response.success && response.data) {
      const result = response.data;
      if (result.errors?.length > 0) {
        toast({
          title: 'Migration mit Warnungen',
          description: `${result.statements_executed} Statements ausgeführt, ${result.errors.length} Fehler`,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Migration erfolgreich',
          description: `${result.statements_executed} Statements ausgeführt`
        });
      }
      fetchMigrationStatus();
    } else {
      toast({ title: 'Migration fehlgeschlagen', description: response.error, variant: 'destructive' });
    }

    setRunningMigration(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Einstellungen</h1>
          <p className="text-muted-foreground">Firmendaten und Systemkonfiguration</p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="company">Firmendaten</TabsTrigger>
            <TabsTrigger value="numbers">Nummernkreise</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="payment_methods">Zahlungsmethoden</TabsTrigger>
            <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
            <TabsTrigger value="migration">Daten-Migration</TabsTrigger>
          </TabsList>

          {/* Company Settings */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Firmendaten
                </CardTitle>
                <CardDescription>
                  Diese Daten erscheinen auf Angeboten und Rechnungen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Firmenname</Label>
                    <Input value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} />
                  </div>
                  <div>
                    <Label>Inhaber</Label>
                    <Input value={company.owner} onChange={(e) => setCompany({ ...company, owner: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Straße</Label>
                    <Input value={company.street} onChange={(e) => setCompany({ ...company, street: e.target.value })} />
                  </div>
                  <div>
                    <Label>PLZ</Label>
                    <Input value={company.zip} onChange={(e) => setCompany({ ...company, zip: e.target.value })} />
                  </div>
                  <div>
                    <Label>Ort</Label>
                    <Input value={company.city} onChange={(e) => setCompany({ ...company, city: e.target.value })} />
                  </div>
                  <div>
                    <Label>Telefon</Label>
                    <Input value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} />
                  </div>
                  <div>
                    <Label>E-Mail</Label>
                    <Input value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} />
                  </div>
                  <div>
                    <Label>Website</Label>
                    <Input value={company.website} onChange={(e) => setCompany({ ...company, website: e.target.value })} />
                  </div>
                  <div>
                    <Label>Steuernummer</Label>
                    <Input value={company.tax_number} onChange={(e) => setCompany({ ...company, tax_number: e.target.value })} />
                  </div>
                  <div>
                    <Label>IBAN</Label>
                    <Input value={company.iban} onChange={(e) => setCompany({ ...company, iban: e.target.value })} />
                  </div>
                  <div>
                    <Label>BIC</Label>
                    <Input value={company.bic} onChange={(e) => setCompany({ ...company, bic: e.target.value })} />
                  </div>
                  <div>
                    <Label>Bank</Label>
                    <Input value={company.bank_name} onChange={(e) => setCompany({ ...company, bank_name: e.target.value })} />
                  </div>
                </div>
                <Button onClick={() => saveSettings('company', company)} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  <Save className="h-4 w-4 mr-2" />
                  Speichern
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Number Sequences */}
          <TabsContent value="numbers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Nummernkreise
                </CardTitle>
                <CardDescription>
                  Format und Zählerstand für Angebote, Rechnungen und Kunden
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Angebote</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Präfix</Label>
                      <Input value={numbers.quote_prefix} onChange={(e) => setNumbers({ ...numbers, quote_prefix: e.target.value })} />
                    </div>
                    <div>
                      <Label>Suffix</Label>
                      <Input value={numbers.quote_suffix} onChange={(e) => setNumbers({ ...numbers, quote_suffix: e.target.value })} />
                    </div>
                    <div>
                      <Label>Aktueller Zähler</Label>
                      <Input type="number" value={numbers.quote_counter} onChange={(e) => setNumbers({ ...numbers, quote_counter: parseInt(e.target.value) || 1 })} />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <Switch checked={numbers.quote_year_reset} onCheckedChange={(c) => setNumbers({ ...numbers, quote_year_reset: c })} />
                      <Label>Jahreswechsel-Reset</Label>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nächste Nummer: {numbers.quote_prefix}-{new Date().getFullYear()}-{String(numbers.quote_counter).padStart(4, '0')}{numbers.quote_suffix}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Rechnungen</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Präfix</Label>
                      <Input value={numbers.invoice_prefix} onChange={(e) => setNumbers({ ...numbers, invoice_prefix: e.target.value })} />
                    </div>
                    <div>
                      <Label>Suffix</Label>
                      <Input value={numbers.invoice_suffix} onChange={(e) => setNumbers({ ...numbers, invoice_suffix: e.target.value })} />
                    </div>
                    <div>
                      <Label>Aktueller Zähler</Label>
                      <Input type="number" value={numbers.invoice_counter} onChange={(e) => setNumbers({ ...numbers, invoice_counter: parseInt(e.target.value) || 1 })} />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <Switch checked={numbers.invoice_year_reset} onCheckedChange={(c) => setNumbers({ ...numbers, invoice_year_reset: c })} />
                      <Label>Jahreswechsel-Reset</Label>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nächste Nummer: {numbers.invoice_prefix}-{new Date().getFullYear()}-{String(numbers.invoice_counter).padStart(4, '0')}{numbers.invoice_suffix}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Kunden</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Präfix</Label>
                      <Input value={numbers.customer_prefix} onChange={(e) => setNumbers({ ...numbers, customer_prefix: e.target.value })} />
                    </div>
                    <div>
                      <Label>Aktueller Zähler</Label>
                      <Input type="number" value={numbers.customer_counter} onChange={(e) => setNumbers({ ...numbers, customer_counter: parseInt(e.target.value) || 1 })} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Nächste Nummer: {numbers.customer_prefix}-{String(numbers.customer_counter).padStart(6, '0')}
                  </p>
                </div>

                <Button onClick={() => saveSettings('number_sequences', numbers)} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  <Save className="h-4 w-4 mr-2" />
                  Speichern
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding */}
          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Branding & Logos
                </CardTitle>
                <CardDescription>
                  Logos und Firmenfarben für Rechnungen, Angebote und PDFs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Main Logo */}
                  <div className="space-y-3">
                    <Label>Haupt-Logo (für Rechnungen/PDFs)</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {branding.logo_url ? (
                        <div className="space-y-3">
                          <img
                            src={branding.logo_url}
                            alt="Logo"
                            className="max-h-32 mx-auto object-contain"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeLogo('logo')}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Entfernen
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            accept="image/png,image/svg+xml,image/jpeg"
                            onChange={(e) => handleLogoUpload(e, 'logo')}
                            disabled={uploadingLogo}
                          />
                          <div className="flex flex-col items-center gap-2 py-4">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              {uploadingLogo ? 'Wird hochgeladen...' : 'Klicken zum Hochladen'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, SVG oder JPG (max 5MB)
                            </p>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Icon Logo */}
                  <div className="space-y-3">
                    <Label>Icon-Logo (optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {branding.logo_icon_url ? (
                        <div className="space-y-3">
                          <img
                            src={branding.logo_icon_url}
                            alt="Icon"
                            className="max-h-32 mx-auto object-contain"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeLogo('icon')}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Entfernen
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            accept="image/png,image/svg+xml,image/jpeg"
                            onChange={(e) => handleLogoUpload(e, 'icon')}
                            disabled={uploadingLogo}
                          />
                          <div className="flex flex-col items-center gap-2 py-4">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              {uploadingLogo ? 'Wird hochgeladen...' : 'Klicken zum Hochladen'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, SVG oder JPG (max 5MB)
                            </p>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Logo Variant Selection */}
                <div className="space-y-3">
                  <Label>Logo-Variante</Label>
                  <Select
                    value={branding.logo_variant}
                    onValueChange={(value) => setBranding({ ...branding, logo_variant: value as BrandingSettings['logo_variant'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black-white">Schwarz-Weiß (schwarzer Hintergrund)</SelectItem>
                      <SelectItem value="beige-black">Beige-Schwarz (beiger Hintergrund)</SelectItem>
                      <SelectItem value="violet-white">Violett-Weiß (violetter Hintergrund)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Wählen Sie die Logo-Variante für Rechnungen und PDFs
                  </p>
                </div>

                {/* Colors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primärfarbe</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={branding.primary_color}
                        onChange={(e) => setBranding({ ...branding, primary_color: e.target.value })}
                        className="w-20 h-10 p-1"
                      />
                      <Input
                        value={branding.primary_color}
                        onChange={(e) => setBranding({ ...branding, primary_color: e.target.value })}
                        placeholder="#8B5CF6"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Sekundärfarbe</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={branding.secondary_color}
                        onChange={(e) => setBranding({ ...branding, secondary_color: e.target.value })}
                        className="w-20 h-10 p-1"
                      />
                      <Input
                        value={branding.secondary_color}
                        onChange={(e) => setBranding({ ...branding, secondary_color: e.target.value })}
                        placeholder="#F5F5DC"
                      />
                    </div>
                  </div>
                </div>

                {/* Google Review URL */}
                <div className="space-y-2">
                  <Label>Google Bewertungs-URL</Label>
                  <Input
                    value={branding.google_review_url}
                    onChange={(e) => setBranding({ ...branding, google_review_url: e.target.value })}
                    placeholder="https://g.page/r/..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Diese URL wird als QR-Code auf Rechnungen angezeigt
                  </p>
                </div>

                <Button onClick={() => saveSettings('branding', branding)} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  <Save className="h-4 w-4 mr-2" />
                  Speichern
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods */}
          <TabsContent value="payment_methods">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Zahlungsmethoden
                </CardTitle>
                <CardDescription>
                  Verfügbare Zahlungsmethoden und Links konfigurieren
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* PayPal */}
                  <div className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={paymentMethods.paypal_enabled}
                          onCheckedChange={(c) => setPaymentMethods({ ...paymentMethods, paypal_enabled: c })}
                        />
                        <Label>PayPal aktivieren</Label>
                      </div>
                    </div>
                    {paymentMethods.paypal_enabled && (
                      <div>
                        <Label>PayPal.me Link</Label>
                        <Input
                          value={paymentMethods.paypal_link}
                          onChange={(e) => setPaymentMethods({ ...paymentMethods, paypal_link: e.target.value })}
                          placeholder="paypal.me/petasync"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          z.B. paypal.me/petasync oder vollständige URL
                        </p>
                      </div>
                    )}
                  </div>

                  {/* SEPA / Überweisung */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={paymentMethods.sepa_enabled}
                        onCheckedChange={(c) => setPaymentMethods({ ...paymentMethods, sepa_enabled: c })}
                      />
                      <div>
                        <Label>SEPA / Überweisung aktivieren</Label>
                        <p className="text-xs text-muted-foreground">
                          Verwendet die Bankdaten aus den Firmendaten
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={paymentMethods.cash_enabled}
                        onCheckedChange={(c) => setPaymentMethods({ ...paymentMethods, cash_enabled: c })}
                      />
                      <Label>Barzahlung aktivieren</Label>
                    </div>
                  </div>

                  {/* Kreditkarte */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={paymentMethods.card_enabled}
                        onCheckedChange={(c) => setPaymentMethods({ ...paymentMethods, card_enabled: c })}
                      />
                      <Label>Kartenzahlung aktivieren</Label>
                    </div>
                  </div>

                  {/* Andere Methoden */}
                  <div className="space-y-2">
                    <Label>Weitere Zahlungsmethoden (optional)</Label>
                    <Textarea
                      value={paymentMethods.other_methods}
                      onChange={(e) => setPaymentMethods({ ...paymentMethods, other_methods: e.target.value })}
                      placeholder="z.B. Bitcoin, Kryptowährungen, Ratenzahlung etc."
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      Weitere Zahlungsmethoden, die auf Rechnungen angezeigt werden sollen
                    </p>
                  </div>
                </div>

                <Button onClick={() => saveSettings('payment_methods', paymentMethods)} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  <Save className="h-4 w-4 mr-2" />
                  Speichern
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Benachrichtigungen
                </CardTitle>
                <CardDescription>
                  E-Mail-Benachrichtigungen konfigurieren
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Neue Anfrage</p>
                      <p className="text-sm text-muted-foreground">E-Mail bei neuer Kontaktanfrage</p>
                    </div>
                    <Switch 
                      checked={notifications.email_on_inquiry} 
                      onCheckedChange={(c) => setNotifications({ ...notifications, email_on_inquiry: c })} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Terminbuchung</p>
                      <p className="text-sm text-muted-foreground">E-Mail bei neuer Terminanfrage</p>
                    </div>
                    <Switch 
                      checked={notifications.email_on_appointment} 
                      onCheckedChange={(c) => setNotifications({ ...notifications, email_on_appointment: c })} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Tägliche Zusammenfassung</p>
                      <p className="text-sm text-muted-foreground">Täglicher Bericht per E-Mail</p>
                    </div>
                    <Switch 
                      checked={notifications.daily_summary} 
                      onCheckedChange={(c) => setNotifications({ ...notifications, daily_summary: c })} 
                    />
                  </div>
                </div>

                <Button onClick={() => saveSettings('notifications', notifications)} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  <Save className="h-4 w-4 mr-2" />
                  Speichern
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Migration */}
          <TabsContent value="migration">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Daten-Migration
                </CardTitle>
                <CardDescription>
                  Importieren Sie Daten aus der migration_data.sql Datei
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {migrationStatus && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-lg font-medium">
                      {migrationStatus.has_data ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          Datenbank enthält Daten
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          Datenbank ist leer
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(migrationStatus.table_counts).map(([table, count]) => (
                        <div key={table} className="p-3 rounded-lg bg-muted">
                          <p className="text-sm text-muted-foreground capitalize">{table.replace('_', ' ')}</p>
                          <p className="text-2xl font-bold">{count}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                        <h4 className="font-medium text-amber-800 dark:text-amber-200">Hinweis zur Migration</h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                          Die Migration importiert Daten aus der Datei <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">database/migration_data.sql</code>.
                          Bestehende Einträge mit gleicher ID werden übersprungen (ON CONFLICT DO NOTHING).
                        </p>
                      </div>

                      <Button
                        onClick={runMigration}
                        disabled={runningMigration}
                        variant={migrationStatus.has_data ? "outline" : "default"}
                      >
                        {runningMigration && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                        <Database className="h-4 w-4 mr-2" />
                        {migrationStatus.has_data ? 'Migration erneut ausführen' : 'Daten importieren'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
