import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { customers, type Customer } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Search, Plus, Edit, Trash2, Loader2, User, Building2, Eye, FileText, Receipt, Briefcase } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type CustomerType = 'privat' | 'business' | 'website';

const emptyCustomer: Partial<Customer> = {
  first_name: '',
  last_name: '',
  company_name: '',
  email: '',
  phone: '',
  street: '',
  zip: '',
  city: '',
  customer_type: 'privat',
  notes: '',
  tags: [],
};

export default function AdminCustomers() {
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Partial<Customer> | null>(null);
  const [saving, setSaving] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [customerQuotes, setCustomerQuotes] = useState<any[]>([]);
  const [customerInvoices, setCustomerInvoices] = useState<any[]>([]);
  const [customerJobs, setCustomerJobs] = useState<any[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    const response = await customers.list();

    if (!response.success) {
      toast({ title: 'Fehler', description: response.error, variant: 'destructive' });
    } else {
      // Handle paginated or direct array response
      const data = Array.isArray(response.data) ? response.data : (response.data as any)?.items || [];
      setCustomerList(data);
    }
    setLoading(false);
  };

  const openNew = () => {
    setEditingCustomer(emptyCustomer);
    setDialogOpen(true);
  };

  const openEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setDialogOpen(true);
  };

  const openView = async (customer: Customer) => {
    setViewingCustomer(customer);
    setViewDialogOpen(true);
    setLoadingDetails(true);

    // Fetch customer details including related data
    const response = await customers.get(customer.id);

    if (response.success && response.data) {
      const data = response.data as any;
      setCustomerQuotes(data.quotes || []);
      setCustomerInvoices(data.invoices || []);
      setCustomerJobs(data.jobs || []);
    }

    setLoadingDetails(false);
  };

  const saveCustomer = async () => {
    if (!editingCustomer?.last_name) {
      toast({ title: 'Fehler', description: 'Nachname ist erforderlich', variant: 'destructive' });
      return;
    }

    setSaving(true);

    const customerData = {
      first_name: editingCustomer.first_name || null,
      last_name: editingCustomer.last_name,
      company_name: editingCustomer.company_name || null,
      email: editingCustomer.email || null,
      phone: editingCustomer.phone || null,
      street: editingCustomer.street || null,
      zip: editingCustomer.zip || null,
      city: editingCustomer.city || null,
      customer_type: editingCustomer.customer_type || 'privat',
      notes: editingCustomer.notes || null,
    };

    if (editingCustomer.id) {
      // Update
      const response = await customers.update(editingCustomer.id, customerData);

      if (!response.success) {
        toast({ title: 'Fehler', description: response.error, variant: 'destructive' });
      } else {
        toast({ title: 'Kunde aktualisiert' });
        fetchCustomers();
        setDialogOpen(false);
      }
    } else {
      // Create
      const response = await customers.create(customerData);

      if (!response.success) {
        toast({ title: 'Fehler', description: response.error, variant: 'destructive' });
      } else {
        toast({ title: 'Kunde erstellt' });
        fetchCustomers();
        setDialogOpen(false);
      }
    }
    setSaving(false);
  };

  const deleteCustomer = async (id: string) => {
    if (!confirm('Kunde wirklich löschen?')) return;

    const response = await customers.delete(id);
    if (!response.success) {
      toast({ title: 'Fehler', description: response.error, variant: 'destructive' });
    } else {
      toast({ title: 'Kunde gelöscht' });
      fetchCustomers();
    }
  };

  const filteredCustomers = customerList.filter((c) => {
    const searchLower = search.toLowerCase();
    return (
      c.last_name?.toLowerCase().includes(searchLower) ||
      c.first_name?.toLowerCase().includes(searchLower) ||
      c.company_name?.toLowerCase().includes(searchLower) ||
      c.email?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Kunden</h1>
            <p className="text-muted-foreground">Kundendatenbank verwalten</p>
          </div>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4 mr-2" />
            Neuer Kunde
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Suchen nach Name, Firma, E-Mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kunde</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Anfragen</TableHead>
                <TableHead>Umsatz</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Keine Kunden gefunden
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {customer.company_name ? (
                            <Building2 className="h-5 w-5 text-primary" />
                          ) : (
                            <User className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {customer.first_name} {customer.last_name}
                          </p>
                          {customer.company_name && (
                            <p className="text-sm text-muted-foreground">{customer.company_name}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {customer.email && <p>{customer.email}</p>}
                        {customer.phone && <p className="text-muted-foreground">{customer.phone}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {customer.customer_type === 'privat' ? 'Privat' :
                         customer.customer_type === 'business' ? 'Business' : 'Website'}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.inquiry_count}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.total_revenue || 0)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openView(customer)} title="Ansehen">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openEdit(customer)} title="Bearbeiten">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteCustomer(customer.id)} title="Löschen">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Edit/Create Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCustomer?.id ? 'Kunde bearbeiten' : 'Neuer Kunde'}
              </DialogTitle>
            </DialogHeader>
            {editingCustomer && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">Vorname</Label>
                    <Input
                      id="first_name"
                      value={editingCustomer.first_name || ''}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, first_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Nachname *</Label>
                    <Input
                      id="last_name"
                      value={editingCustomer.last_name || ''}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, last_name: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company">Firma</Label>
                  <Input
                    id="company"
                    value={editingCustomer.company_name || ''}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, company_name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editingCustomer.email || ''}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      value={editingCustomer.phone || ''}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="street">Straße</Label>
                  <Input
                    id="street"
                    value={editingCustomer.street || ''}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, street: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zip">PLZ</Label>
                    <Input
                      id="zip"
                      value={editingCustomer.zip || ''}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, zip: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Ort</Label>
                    <Input
                      id="city"
                      value={editingCustomer.city || ''}
                      onChange={(e) => setEditingCustomer({ ...editingCustomer, city: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">Kundentyp</Label>
                  <Select
                    value={editingCustomer.customer_type}
                    onValueChange={(value) => setEditingCustomer({ ...editingCustomer, customer_type: value as CustomerType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="privat">Privat</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notizen</Label>
                  <Textarea
                    id="notes"
                    value={editingCustomer.notes || ''}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, notes: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Abbrechen</Button>
              <Button onClick={saveCustomer} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Speichern
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Customer Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Kundendetails</DialogTitle>
            </DialogHeader>
            {viewingCustomer && (
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="quotes">Angebote ({customerQuotes.length})</TabsTrigger>
                  <TabsTrigger value="invoices">Rechnungen ({customerInvoices.length})</TabsTrigger>
                  <TabsTrigger value="jobs">Aufträge ({customerJobs.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {viewingCustomer.company_name ? (
                          <Building2 className="h-5 w-5" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                        {viewingCustomer.first_name} {viewingCustomer.last_name}
                      </CardTitle>
                      {viewingCustomer.company_name && (
                        <CardDescription>{viewingCustomer.company_name}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Kundennummer</p>
                          <p>{viewingCustomer.customer_number || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Kundentyp</p>
                          <Badge variant="outline">
                            {viewingCustomer.customer_type === 'privat' ? 'Privat' :
                             viewingCustomer.customer_type === 'business' ? 'Business' : 'Website'}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">E-Mail</p>
                          <p>{viewingCustomer.email || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Telefon</p>
                          <p>{viewingCustomer.phone || '-'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Adresse</p>
                        <p>
                          {viewingCustomer.street && `${viewingCustomer.street}, `}
                          {viewingCustomer.zip} {viewingCustomer.city || '-'}
                        </p>
                      </div>
                      {viewingCustomer.notes && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Notizen</p>
                          <p className="text-sm whitespace-pre-wrap">{viewingCustomer.notes}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Gesamtumsatz</p>
                          <p className="text-lg font-semibold">
                            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(viewingCustomer.total_revenue || 0)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Anfragen</p>
                          <p className="text-lg font-semibold">{viewingCustomer.inquiry_count}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quotes" className="space-y-4">
                  {loadingDetails ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : customerQuotes.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center text-muted-foreground">
                        Keine Angebote vorhanden
                      </CardContent>
                    </Card>
                  ) : (
                    customerQuotes.map((quote) => (
                      <Card key={quote.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              {quote.quote_number}
                            </CardTitle>
                            <Badge>{quote.status}</Badge>
                          </div>
                          <CardDescription>
                            Datum: {new Date(quote.quote_date || quote.created_at).toLocaleDateString('de-DE')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold">
                            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(quote.total || 0)}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="invoices" className="space-y-4">
                  {loadingDetails ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : customerInvoices.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center text-muted-foreground">
                        Keine Rechnungen vorhanden
                      </CardContent>
                    </Card>
                  ) : (
                    customerInvoices.map((invoice) => (
                      <Card key={invoice.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <Receipt className="h-4 w-4" />
                              {invoice.invoice_number}
                            </CardTitle>
                            <Badge>{invoice.status}</Badge>
                          </div>
                          <CardDescription>
                            Datum: {new Date(invoice.invoice_date || invoice.created_at).toLocaleDateString('de-DE')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold">
                            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(invoice.total || 0)}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="jobs" className="space-y-4">
                  {loadingDetails ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : customerJobs.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center text-muted-foreground">
                        Keine Aufträge vorhanden
                      </CardContent>
                    </Card>
                  ) : (
                    customerJobs.map((job) => (
                      <Card key={job.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              {job.title}
                            </CardTitle>
                            <Badge>{job.status}</Badge>
                          </div>
                          {job.description && (
                            <CardDescription>{job.description}</CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {job.scheduled_date && (
                              <span>Termin: {new Date(job.scheduled_date).toLocaleDateString('de-DE')}</span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Schließen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
