import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Loader2, Building2, Hash, FileText, Mail, Bell, Save } from 'lucide-react';

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

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('admin_settings')
      .select('key, value');

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } else if (data) {
      data.forEach((setting) => {
        if (setting.key === 'company') setCompany(setting.value as unknown as CompanySettings);
        if (setting.key === 'number_sequences') setNumbers(setting.value as unknown as NumberSettings);
        if (setting.key === 'notifications') setNotifications(setting.value as unknown as NotificationSettings);
      });
    }
    setLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveSettings = async (key: string, value: any) => {
    setSaving(true);
    const { error } = await supabase
      .from('admin_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key);

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Einstellungen gespeichert' });
    }
    setSaving(false);
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
          <TabsList>
            <TabsTrigger value="company">Firmendaten</TabsTrigger>
            <TabsTrigger value="numbers">Nummernkreise</TabsTrigger>
            <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
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
        </Tabs>
      </div>
    </AdminLayout>
  );
}
