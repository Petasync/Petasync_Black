import { useState, useEffect } from 'react';
import {
  quotes as quotesApi,
  customers as customersApi,
  serviceCatalog as serviceCatalogApi,
  settings as settingsApi,
  type Quote,
  type Customer,
  type Service,
} from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, FileDown, Printer, Save } from 'lucide-react';
import { toast } from 'sonner';
import { generateQuotePDF, downloadPDF, printPDF, loadCompanyInfo } from '@/lib/pdf-generator';

interface QuoteEditorProps {
  quote?: Quote | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

interface QuoteItemForm {
  id?: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  discount_percent: number;
  total: number;
  service_id?: string;
}

export function QuoteEditor({ quote, open, onOpenChange, onSave }: QuoteEditorProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<QuoteItemForm[]>([]);
  // Calculate default validity (2 weeks from today)
  const getDefaultValidUntil = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState<{
    customer_id: string;
    quote_number: string;
    quote_date: string;
    valid_until: string;
    discount_percent: number;
    notes: string;
    terms: string;
    status: 'entwurf' | 'versendet' | 'angenommen' | 'abgelehnt' | 'rechnung_erstellt';
  }>({
    customer_id: '',
    quote_number: '',
    quote_date: new Date().toISOString().split('T')[0],
    valid_until: getDefaultValidUntil(),
    discount_percent: 0,
    notes: '',
    terms: '',
    status: 'entwurf',
  });

  useEffect(() => {
    if (open) {
      fetchCustomers();
      fetchServices();
      if (quote) {
        loadQuote(quote);
      } else {
        generateQuoteNumber();
        resetForm();
      }
    }
  }, [open, quote]);

  const fetchCustomers = async () => {
    const response = await customersApi.list({ sort: 'last_name', order: 'asc' });
    if (response.success && response.data) {
      if (Array.isArray(response.data)) {
        setCustomers(response.data);
      } else if ('items' in response.data) {
        setCustomers(response.data.items);
      }
    }
  };

  const fetchServices = async () => {
    const response = await serviceCatalogApi.list({ is_active: 'true', sort: 'sort_order', order: 'asc' });
    if (response.success && response.data) {
      if (Array.isArray(response.data)) {
        setServices(response.data);
      } else if ('items' in response.data) {
        setServices(response.data.items);
      }
    }
  };

  const generateQuoteNumber = async () => {
    const response = await settingsApi.getNextNumber('quote');
    if (response.success && response.data) {
      setFormData(prev => ({ ...prev, quote_number: response.data as string }));
    }
  };

  const loadQuote = async (q: Quote) => {
    setFormData({
      customer_id: q.customer_id || '',
      quote_number: q.quote_number,
      quote_date: q.quote_date,
      valid_until: q.valid_until || '',
      discount_percent: q.discount_percent || 0,
      notes: q.notes || '',
      terms: q.terms || '',
      status: q.status || 'entwurf',
    });

    // Load items via API
    const itemsResponse = await quotesApi.getItems(q.id);

    if (itemsResponse.success && itemsResponse.data) {
      const quoteItems = Array.isArray(itemsResponse.data) ? itemsResponse.data : [];
      setItems(quoteItems.map(item => ({
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
      quote_number: '',
      quote_date: new Date().toISOString().split('T')[0],
      valid_until: getDefaultValidUntil(),
      discount_percent: 0,
      notes: '',
      terms: '',
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

  const updateItem = (index: number, field: keyof QuoteItemForm, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // Recalculate total
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
    if (!formData.quote_number) {
      toast.error('Angebotsnummer erforderlich');
      return;
    }

    if (items.filter(i => i.description).length === 0) {
      toast.error('Mindestens eine Position erforderlich');
      return;
    }

    setLoading(true);
    const { subtotal, discountAmount, total } = calculateTotals();

    const quoteData = {
      customer_id: formData.customer_id || null,
      quote_number: formData.quote_number,
      quote_date: formData.quote_date,
      valid_until: formData.valid_until || null,
      discount_percent: formData.discount_percent,
      discount_amount: discountAmount,
      subtotal,
      total,
      notes: formData.notes || null,
      terms: formData.terms || null,
      status: formData.status,
    };

    try {
      let quoteId: string;

      if (quote) {
        const response = await quotesApi.update(quote.id, quoteData);
        if (!response.success) throw new Error(response.error || 'Update failed');
        quoteId = quote.id;
      } else {
        const response = await quotesApi.create(quoteData);
        if (!response.success || !response.data) throw new Error(response.error || 'Create failed');
        quoteId = response.data.id;
      }

      // Save items via API
      const itemsToSave = items
        .filter(item => item.description)
        .map((item, index) => ({
          position: index + 1,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unit_price: item.unit_price,
          discount_percent: item.discount_percent,
          total: item.total,
          service_id: item.service_id || null,
        }));

      await quotesApi.saveItems(quoteId, itemsToSave);

      toast.success(quote ? 'Angebot aktualisiert' : 'Angebot erstellt');
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
    try {
      toast.info('PDF wird erstellt...');

      const customer = customers.find(c => c.id === formData.customer_id) || null;
      const { subtotal, discountAmount, total } = calculateTotals();

      // Load company info from settings
      const companyInfo = await loadCompanyInfo();

      const quoteForPDF: Quote = {
        id: quote?.id || '',
        quote_number: formData.quote_number,
        quote_date: formData.quote_date,
        valid_until: formData.valid_until || null,
        discount_percent: formData.discount_percent,
        discount_amount: discountAmount,
        subtotal,
        total,
        notes: formData.notes || null,
        terms: formData.terms || null,
        status: formData.status,
        customer_id: formData.customer_id || null,
        inquiry_id: null,
        sent_at: null,
        accepted_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const itemsForPDF = items.filter(i => i.description).map((item, index) => ({
        id: item.id || '',
        quote_id: quote?.id || '',
        position: index + 1,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unit_price,
        discount_percent: item.discount_percent,
        total: item.total,
        service_id: item.service_id || null,
      }));

      const blob = await generateQuotePDF(quoteForPDF, customer, itemsForPDF, companyInfo);
      downloadPDF(blob, `Angebot_${formData.quote_number}.pdf`);
      toast.success('PDF heruntergeladen');
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('PDF konnte nicht erstellt werden. Bitte versuchen Sie es erneut.');
    }
  };

  const { subtotal, discountAmount, total } = calculateTotals();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{quote ? 'Angebot bearbeiten' : 'Neues Angebot'}</DialogTitle>
          <DialogDescription>
            {quote ? 'Bearbeiten Sie die Angebotsdetails und speichern Sie Ihre Änderungen.' : 'Erstellen Sie ein neues Angebot für Ihren Kunden.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Angebotsnummer</Label>
              <Input
                value={formData.quote_number}
                onChange={(e) => setFormData({ ...formData, quote_number: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Datum</Label>
              <Input
                type="date"
                value={formData.quote_date}
                onChange={(e) => setFormData({ ...formData, quote_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Gültig bis</Label>
              <Input
                type="date"
                value={formData.valid_until}
                onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
              />
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
                  <SelectItem value="angenommen">Angenommen</SelectItem>
                  <SelectItem value="abgelehnt">Abgelehnt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Customer Selection */}
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

          {/* Notes */}
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
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDownloadPDF}>
                <FileDown className="h-4 w-4 mr-2" />
                PDF
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
  );
}
