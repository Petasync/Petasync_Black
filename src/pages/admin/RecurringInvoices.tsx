import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
  recurringInvoices as recurringApi,
  customers as customersApi,
  serviceCatalog as serviceCatalogApi,
  type RecurringInvoice,
  type Customer,
  type Service,
} from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw, Plus, Trash2, Play, Pause, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

type RecurringInvoiceWithCustomer = RecurringInvoice & {
  company_name?: string;
  first_name?: string;
  last_name?: string;
};

interface ItemForm {
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  discount_percent: number;
  total: number;
  service_id?: string;
}

const intervalLabels: Record<string, string> = {
  monatlich: 'Monatlich',
  vierteljaehrlich: 'Vierteljährlich',
  halbjaehrlich: 'Halbjährlich',
  jaehrlich: 'Jährlich',
};

const statusColors: Record<string, string> = {
  aktiv: 'bg-green-500/20 text-green-400 border-green-500/30',
  pausiert: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  beendet: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export default function RecurringInvoices() {
  const [recurring, setRecurring] = useState<RecurringInvoiceWithCustomer[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<RecurringInvoiceWithCustomer | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customer_id: '',
    title: '',
    description: '',
    interval: 'monatlich' as RecurringInvoice['interval'],
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    notes: '',
    payment_terms: '',
    status: 'aktiv' as RecurringInvoice['status'],
  });

  const [items, setItems] = useState<ItemForm[]>([{
    description: '',
    quantity: 1,
    unit: 'Stk.',
    unit_price: 0,
    discount_percent: 0,
    total: 0,
  }]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [recurringRes, customersRes, servicesRes] = await Promise.all([
      recurringApi.list({ sort: 'next_invoice_date', order: 'asc' }),
      customersApi.list({ sort: 'last_name', order: 'asc' }),
      serviceCatalogApi.list({ is_active: 'true', sort: 'sort_order', order: 'asc' }),
    ]);

    if (recurringRes.success && recurringRes.data) {
      const data = Array.isArray(recurringRes.data) ? recurringRes.data : 'items' in recurringRes.data ? recurringRes.data.items : [];
      setRecurring(data as RecurringInvoiceWithCustomer[]);
    }
    if (customersRes.success && customersRes.data) {
      const data = Array.isArray(customersRes.data) ? customersRes.data : 'items' in customersRes.data ? customersRes.data.items : [];
      setCustomers(data);
    }
    if (servicesRes.success && servicesRes.data) {
      const data = Array.isArray(servicesRes.data) ? servicesRes.data : 'items' in servicesRes.data ? servicesRes.data.items : [];
      setServices(data);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      customer_id: '',
      title: '',
      description: '',
      interval: 'monatlich',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      notes: '',
      payment_terms: '',
      status: 'aktiv',
    });
    setItems([{
      description: '',
      quantity: 1,
      unit: 'Stk.',
      unit_price: 0,
      discount_percent: 0,
      total: 0,
    }]);
    setEditing(null);
  };

  const openEditDialog = async (ri: RecurringInvoiceWithCustomer) => {
    setEditing(ri);
    setFormData({
      customer_id: ri.customer_id || '',
      title: ri.title,
      description: ri.description || '',
      interval: ri.interval,
      start_date: ri.start_date,
      end_date: ri.end_date || '',
      notes: ri.notes || '',
      payment_terms: ri.payment_terms || '',
      status: ri.status,
    });

    // Load items
    const detailRes = await recurringApi.get(ri.id);
    if (detailRes.success && detailRes.data && detailRes.data.items) {
      setItems(detailRes.data.items.map(item => ({
        description: item.description,
        quantity: Number(item.quantity) || 1,
        unit: item.unit || 'Stk.',
        unit_price: Number(item.unit_price),
        discount_percent: Number(item.discount_percent) || 0,
        total: Number(item.total),
        service_id: item.service_id || undefined,
      })));
    }
    setDialogOpen(true);
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

  const updateItem = (index: number, field: keyof ItemForm, value: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    const qty = updated[index].quantity;
    const price = updated[index].unit_price;
    const discount = updated[index].discount_percent;
    updated[index].total = qty * price * (1 - discount / 100);
    setItems(updated);
  };

  const selectService = (index: number, serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      const updated = [...items];
      updated[index] = {
        ...updated[index],
        service_id: serviceId,
        description: service.name + (service.description ? ` - ${service.description}` : ''),
        unit: service.unit || 'Stk.',
        unit_price: Number(service.default_price) || 0,
        total: (updated[index].quantity || 1) * (Number(service.default_price) || 0),
      };
      setItems(updated);
    }
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    return { subtotal, total: subtotal };
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer_id || !formData.title) {
      toast.error('Kunde und Titel sind erforderlich');
      return;
    }

    const { subtotal, total } = calculateTotals();

    const payload = {
      ...formData,
      customer_id: formData.customer_id,
      end_date: formData.end_date || null,
      notes: formData.notes || null,
      payment_terms: formData.payment_terms || null,
      subtotal,
      discount_percent: 0,
      discount_amount: 0,
      total,
      items: items.filter(i => i.description).map((item, index) => ({
        position: index + 1,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unit_price,
        discount_percent: item.discount_percent,
        total: item.total,
        service_id: item.service_id || null,
      })),
    };

    if (editing) {
      const res = await recurringApi.update(editing.id, payload);
      if (!res.success) {
        toast.error(res.error || 'Fehler beim Aktualisieren');
        return;
      }
      toast.success('Abo aktualisiert');
    } else {
      const res = await recurringApi.create(payload);
      if (!res.success) {
        toast.error(res.error || 'Fehler beim Erstellen');
        return;
      }
      toast.success('Abo erstellt');
    }

    setDialogOpen(false);
    resetForm();
    fetchAll();
  };

  const handleGenerate = async (id: string) => {
    setGenerating(id);
    const res = await recurringApi.generate(id);
    if (!res.success) {
      toast.error(res.error || 'Fehler beim Generieren');
    } else {
      toast.success('Rechnung generiert');
      fetchAll();
    }
    setGenerating(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Abo wirklich löschen?')) return;
    const res = await recurringApi.delete(id);
    if (!res.success) {
      toast.error('Fehler beim Löschen');
      return;
    }
    toast.success('Abo gelöscht');
    fetchAll();
  };

  const toggleStatus = async (ri: RecurringInvoiceWithCustomer) => {
    const newStatus = ri.status === 'aktiv' ? 'pausiert' : 'aktiv';
    const res = await recurringApi.update(ri.id, { status: newStatus });
    if (res.success) {
      toast.success(`Status auf "${newStatus}" geändert`);
      fetchAll();
    }
  };

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(v || 0);

  const getCustomerName = (ri: RecurringInvoiceWithCustomer) => {
    if (ri.company_name) return ri.company_name;
    return [ri.first_name, ri.last_name].filter(Boolean).join(' ') || '-';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <RefreshCw className="h-6 w-6" />
              Wiederkehrende Rechnungen
            </h1>
            <p className="text-muted-foreground">Abo-Rechnungen verwalten und automatisch generieren</p>
          </div>
          <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Neues Abo
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titel</TableHead>
                  <TableHead>Kunde</TableHead>
                  <TableHead>Intervall</TableHead>
                  <TableHead>Betrag</TableHead>
                  <TableHead>Nächste Rechnung</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : recurring.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Keine wiederkehrenden Rechnungen vorhanden
                    </TableCell>
                  </TableRow>
                ) : (
                  recurring.map((ri) => (
                    <TableRow key={ri.id}>
                      <TableCell>
                        <button
                          className="font-medium hover:underline text-left"
                          onClick={() => openEditDialog(ri)}
                        >
                          {ri.title}
                        </button>
                        {ri.description && (
                          <p className="text-xs text-muted-foreground">{ri.description}</p>
                        )}
                      </TableCell>
                      <TableCell>{getCustomerName(ri)}</TableCell>
                      <TableCell>{intervalLabels[ri.interval] || ri.interval}</TableCell>
                      <TableCell>{formatCurrency(ri.total)}</TableCell>
                      <TableCell>
                        {ri.next_invoice_date
                          ? format(new Date(ri.next_invoice_date), 'dd.MM.yyyy')
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[ri.status] || ''}>
                          {ri.status === 'aktiv' ? 'Aktiv' : ri.status === 'pausiert' ? 'Pausiert' : 'Beendet'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        {ri.status !== 'beendet' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleGenerate(ri.id)}
                              disabled={generating === ri.id}
                            >
                              {generating === ri.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                'Generieren'
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleStatus(ri)}
                            >
                              {ri.status === 'aktiv' ? (
                                <Pause className="h-3 w-3" />
                              ) : (
                                <Play className="h-3 w-3" />
                              )}
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => handleDelete(ri.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Create/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Abo bearbeiten' : 'Neues Abo'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Titel</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="z.B. Hosting monatlich"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kunde</Label>
                  <Select
                    value={formData.customer_id}
                    onValueChange={(v) => setFormData({ ...formData, customer_id: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kunde wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.first_name} {c.last_name}
                          {c.company_name && ` (${c.company_name})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Beschreibung</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optionale Beschreibung"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Intervall</Label>
                  <Select
                    value={formData.interval}
                    onValueChange={(v) => setFormData({ ...formData, interval: v as RecurringInvoice['interval'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(intervalLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Startdatum</Label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Enddatum (optional)</Label>
                  <Input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>

              {/* Items */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Positionen</CardTitle>
                    <Button type="button" size="sm" onClick={addItem}>
                      <Plus className="h-4 w-4 mr-1" />
                      Position
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-end border-b pb-3">
                      <div className="col-span-12 md:col-span-4 space-y-1">
                        <Label className="text-xs">Beschreibung</Label>
                        <div className="flex gap-2">
                          <Select onValueChange={(v) => selectService(index, v)}>
                            <SelectTrigger className="w-24 text-xs">
                              <SelectValue placeholder="Katalog" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((s) => (
                                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
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
                      <div className="col-span-4 md:col-span-3 space-y-1">
                        <Label className="text-xs">Gesamt</Label>
                        <Input value={item.total.toFixed(2)} readOnly className="bg-muted" />
                      </div>
                      <div className="col-span-1">
                        <Button
                          type="button"
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

              {/* Total */}
              <div className="flex justify-end">
                <div className="w-48">
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Gesamt:</span>
                    <span>{formatCurrency(calculateTotals().total)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Anmerkungen</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Zahlungsbedingungen</Label>
                  <Textarea
                    value={formData.payment_terms}
                    onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Abbrechen
                </Button>
                <Button type="submit">
                  {editing ? 'Speichern' : 'Erstellen'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
