import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
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
import { Search, Plus, Edit, Trash2, Loader2, User, Building2 } from 'lucide-react';

type CustomerType = 'privat' | 'business' | 'website';

interface Customer {
  id: string;
  customer_number: string | null;
  company_name: string | null;
  first_name: string | null;
  last_name: string;
  email: string | null;
  phone: string | null;
  street: string | null;
  zip: string | null;
  city: string | null;
  customer_type: CustomerType;
  tags: string[];
  notes: string | null;
  total_revenue: number;
  inquiry_count: number;
  created_at: string;
}

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
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Partial<Customer> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } else {
      setCustomers(data || []);
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

  const saveCustomer = async () => {
    if (!editingCustomer?.last_name) {
      toast({ title: 'Fehler', description: 'Nachname ist erforderlich', variant: 'destructive' });
      return;
    }

    setSaving(true);
    
    if (editingCustomer.id) {
      // Update
      const { error } = await supabase
        .from('customers')
        .update({
          first_name: editingCustomer.first_name,
          last_name: editingCustomer.last_name,
          company_name: editingCustomer.company_name,
          email: editingCustomer.email,
          phone: editingCustomer.phone,
          street: editingCustomer.street,
          zip: editingCustomer.zip,
          city: editingCustomer.city,
          customer_type: editingCustomer.customer_type,
          notes: editingCustomer.notes,
        })
        .eq('id', editingCustomer.id);

      if (error) {
        toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Kunde aktualisiert' });
        fetchCustomers();
        setDialogOpen(false);
      }
    } else {
      // Create
      const { error } = await supabase
        .from('customers')
        .insert({
          first_name: editingCustomer.first_name,
          last_name: editingCustomer.last_name,
          company_name: editingCustomer.company_name,
          email: editingCustomer.email,
          phone: editingCustomer.phone,
          street: editingCustomer.street,
          zip: editingCustomer.zip,
          city: editingCustomer.city,
          customer_type: editingCustomer.customer_type,
          notes: editingCustomer.notes,
        });

      if (error) {
        toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
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
    
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Kunde gelöscht' });
      fetchCustomers();
    }
  };

  const filteredCustomers = customers.filter((c) => {
    const searchLower = search.toLowerCase();
    return (
      c.last_name.toLowerCase().includes(searchLower) ||
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
                      {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.total_revenue)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(customer)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteCustomer(customer.id)}>
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
      </div>
    </AdminLayout>
  );
}
