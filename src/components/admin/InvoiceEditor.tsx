import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, FileDown, Save, QrCode, Star } from 'lucide-react';
import { toast } from 'sonner';
import { generateInvoicePDF, downloadPDF, generateEPCQRCode } from '@/lib/pdf-generator';
import { EPCQRCode } from './EPCQRCode';
import { GoogleReviewQRCode } from './GoogleReviewQRCode';
import type { Tables } from '@/integrations/supabase/types';

type Invoice = Tables<'invoices'>;
type InvoiceItem = Tables<'invoice_items'>;
type Customer = Tables<'customers'>;
type ServiceCatalog = Tables<'service_catalog'>;

interface InvoiceEditorProps {
  invoice?: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

interface InvoiceItemForm {
  id?: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  discount_percent: number;
  total: number;
  service_id?: string;
}

export function InvoiceEditor({ invoice, open, onOpenChange, onSave }: InvoiceEditorProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<ServiceCatalog[]>([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<InvoiceItemForm[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showGoogleReviewQR, setShowGoogleReviewQR] = useState(false);
  const [formData, setFormData] = useState<{
    customer_id: string;
    invoice_number: string;
    invoice_date: string;
    delivery_date: string;
    due_date: string;
    discount_percent: number;
    notes: string;
    payment_terms: string;
    payment_method: string;
    status: 'entwurf' | 'versendet' | 'bezahlt' | 'ueberfaellig' | 'storniert';
  }>({
    customer_id: '',
    invoice_number: '',
    invoice_date: new Date().toISOString().split('T')[0],
    delivery_date: '',
    due_date: '',
    discount_percent: 0,
    notes: '',
    payment_terms: '',
    payment_method: '',
    status: 'entwurf',
  });

  useEffect(() => {
    if (open) {
      fetchCustomers();
      fetchServices();
      if (invoice) {
        loadInvoice(invoice);
      } else {
        generateInvoiceNumber();
        resetForm();
      }
    }
  }, [open, invoice]);

  const fetchCustomers = async () => {
    const { data } = await supabase.from('customers').select('*').order('last_name');
    setCustomers(data || []);
  };

  const fetchServices = async () => {
    const { data } = await supabase.from('service_catalog').select('*').eq('is_active', true).order('sort_order');
    setServices(data || []);
  };

  const generateInvoiceNumber = async () => {
    const { data } = await supabase.rpc('get_next_number', { sequence_type: 'invoice' });
    if (data) {
      setFormData(prev => ({ ...prev, invoice_number: data }));
    }
  };

  const loadInvoice = async (inv: Invoice) => {
    setFormData({
      customer_id: inv.customer_id || '',
      invoice_number: inv.invoice_number,
      invoice_date: inv.invoice_date,
      delivery_date: inv.delivery_date || '',
      due_date: inv.due_date || '',
      discount_percent: Number(inv.discount_percent) || 0,
      notes: inv.notes || '',
      payment_terms: inv.payment_terms || '',
      payment_method: inv.payment_method || '',
      status: inv.status || 'entwurf',
    });

    const { data: invoiceItems } = await supabase
      .from('invoice_items')
      .select('*')
      .eq('invoice_id', inv.id)
      .order('position');

    if (invoiceItems) {
      setItems(invoiceItems.map(item => ({
        id: item.id,
        description: item.description,
        quantity: Number(item.quantity) || 1,
        unit: item.unit || 'Stk.',
        unit_price: Number(item.unit_price),
        discount_percent: Number(item.discount_percent) || 0,
        total: Number(item.total),
        service_id: item.service_id || undefined,
      })));
    }
  };

  const resetForm = () => {
    setFormData({
      customer_id: '',
      invoice_number: '',
      invoice_date: new Date().toISOString().split('T')[0],
      delivery_date: '',
      due_date: '',
      discount_percent: 0,
      notes: '',
      payment_terms: '',
      payment_method: '',
      status: 'entwurf',
    });
    setItems([{
      description: '',
      quantity: 1,
      unit: 'Stk.',
      unit_price: 0,
      discount_percent: 0,
      total: 0,
    }]);
  };

  const addItem = () => {
    setItems([...items, {
      description: '',
      quantity: 1,
      unit: 'Stk.',
      unit_price: 0,
      discount_percent: 0,
      total: 0,
    }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItemForm, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    const qty = updatedItems[index].quantity;
    const price = updatedItems[index].unit_price;
    const discount = updatedItems[index].discount_percent;
    updatedItems[index].total = qty * price * (1 - discount / 100);

    setItems(updatedItems);
  };

  const selectService = (index: number, serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      const updatedItems = [...items];
      updatedItems[index] = {
        ...updatedItems[index],
        service_id: serviceId,
        description: service.name + (service.description ? ` - ${service.description}` : ''),
        unit: service.unit || 'Stk.',
        unit_price: Number(service.default_price) || 0,
        total: (updatedItems[index].quantity || 1) * (Number(service.default_price) || 0),
      };
      setItems(updatedItems);
    }
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = subtotal * (formData.discount_percent / 100);
    const total = subtotal - discountAmount;
    return { subtotal, discountAmount, total };
  };

  const handleSave = async () => {
    if (!formData.invoice_number) {
      toast.error('Rechnungsnummer erforderlich');
      return;
    }

    if (items.filter(i => i.description).length === 0) {
      toast.error('Mindestens eine Position erforderlich');
      return;
    }

    setLoading(true);
    const { subtotal, discountAmount, total } = calculateTotals();

    const invoiceData = {
      customer_id: formData.customer_id || null,
      invoice_number: formData.invoice_number,
      invoice_date: formData.invoice_date,
      delivery_date: formData.delivery_date || null,
      due_date: formData.due_date || null,
      discount_percent: formData.discount_percent,
      discount_amount: discountAmount,
      subtotal,
      total,
      notes: formData.notes || null,
      payment_terms: formData.payment_terms || null,
      payment_method: formData.payment_method || null,
      status: formData.status,
    };

    try {
      let invoiceId: string;

      if (invoice) {
        const { error } = await supabase
          .from('invoices')
          .update(invoiceData)
          .eq('id', invoice.id);

        if (error) throw error;
        invoiceId = invoice.id;

        await supabase.from('invoice_items').delete().eq('invoice_id', invoice.id);
      } else {
        const { data, error } = await supabase
          .from('invoices')
          .insert(invoiceData)
          .select()
          .single();

        if (error) throw error;
        invoiceId = data.id;
      }

      const itemsToInsert = items
        .filter(item => item.description)
        .map((item, index) => ({
          invoice_id: invoiceId,
          position: index + 1,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unit_price: item.unit_price,
          discount_percent: item.discount_percent,
          total: item.total,
          service_id: item.service_id || null,
        }));

      const { error: itemsError } = await supabase.from('invoice_items').insert(itemsToInsert);
      if (itemsError) throw itemsError;

      toast.success(invoice ? 'Rechnung aktualisiert' : 'Rechnung erstellt');
      onSave();
      onOpenChange(false);
    } catch (error) {
      toast.error('Fehler beim Speichern');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    const customer = customers.find(c => c.id === formData.customer_id) || null;
    const { subtotal, discountAmount, total } = calculateTotals();

    const invoiceForPDF: Invoice = {
      id: invoice?.id || '',
      invoice_number: formData.invoice_number,
      invoice_date: formData.invoice_date,
      delivery_date: formData.delivery_date || null,
      due_date: formData.due_date || null,
      discount_percent: formData.discount_percent,
      discount_amount: discountAmount,
      subtotal,
      total,
      notes: formData.notes || null,
      payment_terms: formData.payment_terms || null,
      payment_method: formData.payment_method || null,
      status: formData.status,
      customer_id: formData.customer_id || null,
      quote_id: null,
      sent_at: null,
      paid_at: null,
      paid_amount: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const itemsForPDF = items.filter(i => i.description).map((item, index) => ({
      id: item.id || '',
      invoice_id: invoice?.id || '',
      position: index + 1,
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
      unit_price: item.unit_price,
      discount_percent: item.discount_percent,
      total: item.total,
      service_id: item.service_id || null,
      created_at: new Date().toISOString(),
    }));

    const blob = await generateInvoicePDF(invoiceForPDF, customer, itemsForPDF);
    downloadPDF(blob, `Rechnung_${formData.invoice_number}.html`);
    toast.success('PDF heruntergeladen');
  };

  const { subtotal, discountAmount, total } = calculateTotals();

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{invoice ? 'Rechnung bearbeiten' : 'Neue Rechnung'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Rechnungsnummer</Label>
                <Input
                  value={formData.invoice_number}
                  onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Rechnungsdatum</Label>
                <Input
                  type="date"
                  value={formData.invoice_date}
                  onChange={(e) => setFormData({ ...formData, invoice_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Lieferdatum</Label>
                <Input
                  type="date"
                  value={formData.delivery_date}
                  onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Fällig am</Label>
                <Input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kunde</Label>
                <Select
                  value={formData.customer_id}
                  onValueChange={(value) => setFormData({ ...formData, customer_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kunde auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.first_name} {customer.last_name}
                        {customer.company_name && ` (${customer.company_name})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as typeof formData.status })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entwurf">Entwurf</SelectItem>
                    <SelectItem value="versendet">Versendet</SelectItem>
                    <SelectItem value="bezahlt">Bezahlt</SelectItem>
                    <SelectItem value="ueberfaellig">Überfällig</SelectItem>
                    <SelectItem value="storniert">Storniert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Items */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Positionen</CardTitle>
                  <Button size="sm" onClick={addItem} className="gap-1">
                    <Plus className="h-4 w-4" />
                    Position
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end border-b pb-4">
                    <div className="col-span-12 md:col-span-4 space-y-1">
                      <Label className="text-xs">Beschreibung</Label>
                      <div className="flex gap-2">
                        <Select onValueChange={(value) => selectService(index, value)}>
                          <SelectTrigger className="w-24 text-xs">
                            <SelectValue placeholder="Katalog" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          placeholder="Beschreibung"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 md:col-span-1 space-y-1">
                      <Label className="text-xs">Menge</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.5"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-1 space-y-1">
                      <Label className="text-xs">Einheit</Label>
                      <Input
                        value={item.unit}
                        onChange={(e) => updateItem(index, 'unit', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 md:col-span-2 space-y-1">
                      <Label className="text-xs">Einzelpreis</Label>
                      <Input
                        type="number"
                        value={item.unit_price}
                        onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1 space-y-1">
                      <Label className="text-xs">Rabatt %</Label>
                      <Input
                        type="number"
                        value={item.discount_percent}
                        onChange={(e) => updateItem(index, 'discount_percent', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2 space-y-1">
                      <Label className="text-xs">Gesamt</Label>
                      <Input
                        value={item.total.toFixed(2)}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Zwischensumme:</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Rabatt:</span>
                  <Input
                    type="number"
                    value={formData.discount_percent}
                    onChange={(e) => setFormData({ ...formData, discount_percent: parseFloat(e.target.value) || 0 })}
                    className="w-16 h-8 text-sm"
                    min="0"
                    max="100"
                  />
                  <span className="text-sm">%</span>
                  <span className="ml-auto text-sm">-{discountAmount.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Gesamt:</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            {/* Notes & Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Anmerkungen</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Zahlungsbedingungen</Label>
                <Textarea
                  value={formData.payment_terms}
                  onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value })}
                  rows={3}
                  placeholder="z.B. Zahlbar innerhalb 14 Tagen ohne Abzug"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Zahlungsmethode</Label>
              <Select
                value={formData.payment_method}
                onValueChange={(value) => setFormData({ ...formData, payment_method: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Zahlungsmethode wählen (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uberweisung">Überweisung</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="rechnung">Auf Rechnung</SelectItem>
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="kreditkarte">Kreditkarte</SelectItem>
                  <SelectItem value="sepa">SEPA-Lastschrift</SelectItem>
                  <SelectItem value="vorkasse">Vorkasse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4 border-t">
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownloadPDF}>
                  <FileDown className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" onClick={() => setShowQRCode(true)}>
                  <QrCode className="h-4 w-4 mr-2" />
                  EPC QR
                </Button>
                <Button variant="outline" onClick={() => setShowGoogleReviewQR(true)}>
                  <Star className="h-4 w-4 mr-2" />
                  Review QR
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Abbrechen
                </Button>
                <Button onClick={handleSave} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Speichern...' : 'Speichern'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EPCQRCode
        open={showQRCode}
        onOpenChange={setShowQRCode}
        invoiceNumber={formData.invoice_number}
        amount={total}
      />

      <GoogleReviewQRCode
        open={showGoogleReviewQR}
        onOpenChange={setShowGoogleReviewQR}
      />
    </>
  );
}
