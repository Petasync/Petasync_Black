import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { invoices as invoicesApi, customers as customersApi, type Invoice as ApiInvoice, type Customer } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Search, Plus, Edit, Loader2, Receipt, AlertCircle, Download } from 'lucide-react';
import { format, isPast, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import { InvoiceEditor } from '@/components/admin/InvoiceEditor';
import { generateInvoicePDF, downloadPDF, loadCompanyInfo } from '@/lib/pdf-generator';

type InvoiceStatus = ApiInvoice['status'];

// Extended Invoice type with customer relation
type Invoice = ApiInvoice & {
  customers?: {
    first_name: string | null;
    last_name: string;
    company_name: string | null;
  } | null;
};

const statusLabels: Record<InvoiceStatus, string> = {
  entwurf: 'Entwurf',
  versendet: 'Versendet',
  bezahlt: 'Bezahlt',
  ueberfaellig: 'Überfällig',
  storniert: 'Storniert',
};

const statusColors: Record<InvoiceStatus, string> = {
  entwurf: 'bg-gray-500/20 text-gray-400',
  versendet: 'bg-blue-500/20 text-blue-400',
  bezahlt: 'bg-green-500/20 text-green-400',
  ueberfaellig: 'bg-red-500/20 text-red-400',
  storniert: 'bg-gray-500/20 text-gray-500',
};

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<ApiInvoice | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    const response = await invoicesApi.list({ sort: 'created_at', order: 'desc' });

    if (!response.success) {
      toast.error(response.error || 'Rechnungen konnten nicht geladen werden');
    } else {
      let data: Invoice[] = [];
      if (Array.isArray(response.data)) {
        data = response.data as Invoice[];
      } else if (response.data && 'items' in response.data) {
        data = response.data.items as Invoice[];
      }

      // Check for overdue invoices
      const updated = data.map((inv) => {
        if (inv.status === 'versendet' && inv.due_date && isPast(parseISO(inv.due_date))) {
          return { ...inv, status: 'ueberfaellig' as InvoiceStatus };
        }
        return inv;
      });
      setInvoices(updated);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: InvoiceStatus) => {
    const updates: Partial<ApiInvoice> = { status };
    if (status === 'bezahlt') {
      updates.paid_at = new Date().toISOString();
    }

    const response = await invoicesApi.update(id, updates);

    if (!response.success) {
      toast.error(response.error || 'Fehler beim Aktualisieren');
    } else {
      toast.success('Status aktualisiert');
      fetchInvoices();
    }
  };

  const openEditor = (invoice?: Invoice) => {
    setEditingInvoice(invoice ? invoice as ApiInvoice : null);
    setEditorOpen(true);
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
      invoice.customers?.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.customers?.company_name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getCustomerName = (invoice: Invoice) => {
    if (!invoice.customers) return 'Kein Kunde';
    if (invoice.customers.company_name) return invoice.customers.company_name;
    return `${invoice.customers.first_name || ''} ${invoice.customers.last_name}`.trim();
  };

  const handleDownloadPDF = async (invoice: Invoice) => {
    try {
      toast.info('PDF wird generiert...');

      // Fetch full invoice data with items
      const invoiceResponse = await invoicesApi.get(invoice.id);
      if (!invoiceResponse.success) throw new Error('Rechnung konnte nicht geladen werden');
      const fullInvoice = invoiceResponse.data as ApiInvoice;

      let customer = null;
      if (invoice.customer_id) {
        const customerResponse = await customersApi.get(invoice.customer_id);
        if (customerResponse.success) {
          customer = customerResponse.data;
        }
      }

      // Load company info
      const companyInfo = await loadCompanyInfo();

      // Generate PDF
      const blob = await generateInvoicePDF(fullInvoice as any, customer as any, fullInvoice.items || [], companyInfo);
      downloadPDF(blob, `Rechnung_${invoice.invoice_number}.pdf`);
      toast.success('PDF heruntergeladen');
    } catch (error: any) {
      console.error('Error downloading PDF:', error);
      toast.error('Fehler beim Herunterladen der PDF');
    }
  };

  const unpaidTotal = invoices
    .filter((i) => i.status === 'versendet' || i.status === 'ueberfaellig')
    .reduce((sum, i) => sum + i.total, 0);

  const overdueCount = invoices.filter((i) => i.status === 'ueberfaellig').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Rechnungen</h1>
            <p className="text-muted-foreground">Alle Rechnungen verwalten</p>
          </div>
          <Button onClick={() => openEditor()}>
            <Plus className="h-4 w-4 mr-2" />
            Neue Rechnung
          </Button>
        </div>

        {/* Stats */}
        {(unpaidTotal > 0 || overdueCount > 0) && (
          <div className="flex gap-4">
            {unpaidTotal > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-400">
                <Receipt className="h-4 w-4" />
                <span>Offen: {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(unpaidTotal)}</span>
              </div>
            )}
            {overdueCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span>{overdueCount} überfällig</span>
              </div>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Suchen nach Nummer, Kunde..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              {Object.entries(statusLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nummer</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Fällig</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Betrag</TableHead>
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
              ) : filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Keine Rechnungen gefunden
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-muted-foreground" />
                        {invoice.invoice_number}
                      </div>
                    </TableCell>
                    <TableCell>{getCustomerName(invoice)}</TableCell>
                    <TableCell>
                      {format(new Date(invoice.invoice_date), 'dd.MM.yyyy', { locale: de })}
                    </TableCell>
                    <TableCell>
                      {invoice.due_date 
                        ? format(new Date(invoice.due_date), 'dd.MM.yyyy', { locale: de })
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={invoice.status}
                        onValueChange={(value) => updateStatus(invoice.id, value as InvoiceStatus)}
                      >
                        <SelectTrigger className={`w-[140px] ${statusColors[invoice.status]}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(invoice.total)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadPDF(invoice)}
                        title="PDF herunterladen"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openEditor(invoice)} title="Bearbeiten">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <InvoiceEditor
          invoice={editingInvoice}
          open={editorOpen}
          onOpenChange={setEditorOpen}
          onSave={fetchInvoices}
        />
      </div>
    </AdminLayout>
  );
}
