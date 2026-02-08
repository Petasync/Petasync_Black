import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { quotes as quotesApi, customers as customersApi, invoices as invoicesApi, jobs as jobsApi, settings as settingsApi, type Quote as ApiQuote, type Customer } from '@/lib/api-client';
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
import { Search, Plus, Edit, Loader2, FileText, MoreVertical, FileCheck, Briefcase, FileDown } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { QuoteEditor } from '@/components/admin/QuoteEditor';
import { generateQuotePDF, downloadPDF, loadCompanyInfo } from '@/lib/pdf-generator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type QuoteStatus = ApiQuote['status'];

// Extended Quote type with customer relation
type Quote = ApiQuote & {
  // Customer data comes directly on quote from JOIN
  company_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  customer_email?: string | null;
  // Deprecated - keep for backwards compat
  customers?: {
    first_name: string | null;
    last_name: string;
    company_name: string | null;
  } | null;
};

const statusLabels: Record<QuoteStatus, string> = {
  entwurf: 'Entwurf',
  versendet: 'Versendet',
  angenommen: 'Angenommen',
  abgelehnt: 'Abgelehnt',
  rechnung_erstellt: 'Rechnung erstellt',
};

const statusColors: Record<QuoteStatus, string> = {
  entwurf: 'bg-gray-500/20 text-gray-400',
  versendet: 'bg-blue-500/20 text-blue-400',
  angenommen: 'bg-green-500/20 text-green-400',
  abgelehnt: 'bg-red-500/20 text-red-400',
  rechnung_erstellt: 'bg-purple-500/20 text-purple-400',
};

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<ApiQuote | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    const response = await quotesApi.list({ sort: 'created_at', order: 'desc' });

    if (!response.success) {
      toast.error(response.error || 'Angebote konnten nicht geladen werden');
    } else {
      const data = response.data;
      if (Array.isArray(data)) {
        setQuotes(data as Quote[]);
      } else if (data && 'items' in data) {
        setQuotes(data.items as Quote[]);
      } else {
        setQuotes([]);
      }
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: QuoteStatus) => {
    const response = await quotesApi.update(id, { status });

    if (!response.success) {
      toast.error(response.error || 'Fehler beim Aktualisieren');
    } else {
      toast.success('Status aktualisiert');
      fetchQuotes();
    }
  };

  const openEditor = (quote?: Quote) => {
    setEditingQuote(quote ? quote as ApiQuote : null);
    setEditorOpen(true);
  };

  const filteredQuotes = quotes.filter((quote) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      quote.quote_number.toLowerCase().includes(searchLower) ||
      quote.last_name?.toLowerCase().includes(searchLower) ||
      quote.first_name?.toLowerCase().includes(searchLower) ||
      quote.company_name?.toLowerCase().includes(searchLower) ||
      quote.customers?.last_name?.toLowerCase().includes(searchLower) ||
      quote.customers?.company_name?.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getCustomerName = (quote: Quote) => {
    // Handle direct properties from API JOIN (new format)
    if (quote.company_name) return quote.company_name;
    if (quote.first_name || quote.last_name) {
      return `${quote.first_name || ''} ${quote.last_name || ''}`.trim();
    }
    // Handle nested customers object (old format / backwards compat)
    if (quote.customers) {
      if (quote.customers.company_name) return quote.customers.company_name;
      return `${quote.customers.first_name || ''} ${quote.customers.last_name}`.trim();
    }
    // No customer
    if (!quote.customer_id) return 'Kein Kunde';
    return 'Kunde nicht gefunden';
  };

  const convertToInvoice = async (quote: Quote) => {
    if (!confirm(`Angebot ${quote.quote_number} in Rechnung umwandeln?`)) return;

    try {
      // Get quote with items
      const quoteResponse = await quotesApi.get(quote.id);
      if (!quoteResponse.success) throw new Error('Angebot konnte nicht geladen werden');

      const quoteData = quoteResponse.data as ApiQuote;
      const quoteItems = quoteData.items || [];

      // Get next invoice number from settings
      const settingsResponse = await settingsApi.get<{ invoice_prefix?: string; invoice_suffix?: string; invoice_counter?: number }>('number_sequences');
      const numbers = settingsResponse.data || {};
      const invoiceNumber = `${numbers.invoice_prefix || 'RE'}-${new Date().getFullYear()}-${String(numbers.invoice_counter || 1).padStart(4, '0')}${numbers.invoice_suffix || ''}`;

      // Create invoice with items
      const invoiceResponse = await invoicesApi.create({
        invoice_number: invoiceNumber,
        customer_id: quote.customer_id,
        quote_id: quote.id,
        invoice_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'entwurf',
        subtotal: quote.subtotal,
        discount_percent: quote.discount_percent,
        discount_amount: quote.discount_amount,
        total: quote.total,
        notes: `Erstellt aus Angebot ${quote.quote_number}`,
        items: quoteItems.map(item => ({
          service_id: item.service_id,
          position: item.position,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unit_price: item.unit_price,
          discount_percent: item.discount_percent,
          total: item.total
        }))
      });

      if (!invoiceResponse.success) throw new Error(invoiceResponse.error || 'Rechnung konnte nicht erstellt werden');

      // Update invoice counter
      await settingsApi.update('number_sequences', {
        ...numbers,
        invoice_counter: (numbers.invoice_counter || 1) + 1
      });

      // Update quote status
      await updateStatus(quote.id, 'rechnung_erstellt');

      toast.success(`Rechnung ${invoiceNumber} erfolgreich erstellt`);
      fetchQuotes();
    } catch (error: any) {
      console.error('Error converting to invoice:', error);
      toast.error(error.message || 'Fehler beim Erstellen der Rechnung');
    }
  };

  const handleDownloadPDF = async (quote: Quote) => {
    try {
      // Load quote with items
      const quoteResponse = await quotesApi.get(quote.id);
      if (!quoteResponse.success) throw new Error('Angebot konnte nicht geladen werden');
      const quoteData = quoteResponse.data as ApiQuote;

      // Load customer data
      let customer = null;
      if (quote.customer_id) {
        const customerResponse = await customersApi.get(quote.customer_id);
        if (customerResponse.success) {
          customer = customerResponse.data;
        }
      }

      // Load company info
      const companyInfo = await loadCompanyInfo();

      // Generate PDF
      const blob = await generateQuotePDF(
        quoteData as any,
        customer as any,
        quoteData.items || [],
        companyInfo
      );

      downloadPDF(blob, `Angebot_${quote.quote_number}.pdf`);
      toast.success('PDF heruntergeladen');
    } catch (error: any) {
      console.error('Error generating PDF:', error);
      toast.error('Fehler beim Erstellen des PDFs');
    }
  };

  const convertToJob = async (quote: Quote) => {
    if (!confirm(`Auftrag aus Angebot ${quote.quote_number} erstellen?`)) return;

    try {
      // Get quote with items for description
      const quoteResponse = await quotesApi.get(quote.id);
      if (!quoteResponse.success) throw new Error('Angebot konnte nicht geladen werden');
      const quoteData = quoteResponse.data as ApiQuote;
      const quoteItems = quoteData.items || [];

      const description = quoteItems.map(item =>
        `${item.description} (${item.quantity} ${item.unit || 'Stk.'})`
      ).join('\n') || '';

      // Create job
      const jobResponse = await jobsApi.create({
        customer_id: quote.customer_id,
        quote_id: quote.id,
        title: `Auftrag aus Angebot ${quote.quote_number}`,
        description,
        status: 'offen',
        notes: `Erstellt aus Angebot ${quote.quote_number}\nGesamtwert: ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(quote.total)}`,
        scheduled_date: new Date().toISOString().split('T')[0]
      });

      if (!jobResponse.success) throw new Error(jobResponse.error || 'Auftrag konnte nicht erstellt werden');

      toast.success('Auftrag erfolgreich erstellt');
      fetchQuotes();
    } catch (error: any) {
      console.error('Error converting to job:', error);
      toast.error(error.message || 'Fehler beim Erstellen des Auftrags');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Angebote</h1>
            <p className="text-muted-foreground">Alle Angebote verwalten</p>
          </div>
          <Button onClick={() => openEditor()}>
            <Plus className="h-4 w-4 mr-2" />
            Neues Angebot
          </Button>
        </div>

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
                <TableHead>Gültig bis</TableHead>
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
              ) : filteredQuotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Keine Angebote gefunden
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {quote.quote_number}
                      </div>
                    </TableCell>
                    <TableCell>{getCustomerName(quote)}</TableCell>
                    <TableCell>
                      {format(new Date(quote.quote_date), 'dd.MM.yyyy', { locale: de })}
                    </TableCell>
                    <TableCell>
                      {quote.valid_until 
                        ? format(new Date(quote.valid_until), 'dd.MM.yyyy', { locale: de })
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={quote.status}
                        onValueChange={(value) => updateStatus(quote.id, value as QuoteStatus)}
                      >
                        <SelectTrigger className={`w-[160px] ${statusColors[quote.status]}`}>
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
                      {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(quote.total)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditor(quote)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Bearbeiten
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadPDF(quote)}>
                            <FileDown className="h-4 w-4 mr-2" />
                            PDF herunterladen
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => convertToInvoice(quote)}>
                            <FileCheck className="h-4 w-4 mr-2" />
                            In Rechnung umwandeln
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => convertToJob(quote)}>
                            <Briefcase className="h-4 w-4 mr-2" />
                            Als Auftrag erstellen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <QuoteEditor
          quote={editingQuote}
          open={editorOpen}
          onOpenChange={setEditorOpen}
          onSave={fetchQuotes}
        />
      </div>
    </AdminLayout>
  );
}
