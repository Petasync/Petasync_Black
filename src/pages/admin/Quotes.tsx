import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
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
import type { Tables } from '@/integrations/supabase/types';
import { generateQuotePDF, downloadPDF, loadCompanyInfo } from '@/lib/pdf-generator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type QuoteStatus = 'entwurf' | 'versendet' | 'angenommen' | 'abgelehnt' | 'rechnung_erstellt';

interface Quote {
  id: string;
  quote_number: string;
  customer_id: string | null;
  status: QuoteStatus;
  quote_date: string;
  valid_until: string | null;
  total: number;
  created_at: string;
  customers?: {
    first_name: string | null;
    last_name: string;
    company_name: string | null;
  } | null;
}

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
  const [editingQuote, setEditingQuote] = useState<Tables<'quotes'> | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quotes')
      .select(`
        *,
        customers (
          first_name,
          last_name,
          company_name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setQuotes(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: QuoteStatus) => {
    const { error } = await supabase
      .from('quotes')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Status aktualisiert');
      fetchQuotes();
    }
  };

  const openEditor = (quote?: Quote) => {
    setEditingQuote(quote ? quote as Tables<'quotes'> : null);
    setEditorOpen(true);
  };

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.quote_number.toLowerCase().includes(search.toLowerCase()) ||
      quote.customers?.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      quote.customers?.company_name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getCustomerName = (quote: Quote) => {
    if (!quote.customers) return 'Kein Kunde';
    if (quote.customers.company_name) return quote.customers.company_name;
    return `${quote.customers.first_name || ''} ${quote.customers.last_name}`.trim();
  };

  const convertToInvoice = async (quote: Quote) => {
    if (!confirm(`Angebot ${quote.quote_number} in Rechnung umwandeln?`)) return;

    try {
      // Get quote items
      const { data: quoteItems, error: itemsError } = await supabase
        .from('quote_items')
        .select('*')
        .eq('quote_id', quote.id);

      if (itemsError) throw itemsError;

      // Get next invoice number
      const { data: settings } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'number_sequences')
        .single();

      const numbers = settings?.value as any;
      const invoiceNumber = `${numbers?.invoice_prefix || 'RE'}-${new Date().getFullYear()}-${String(numbers?.invoice_counter || 1).padStart(4, '0')}${numbers?.invoice_suffix || ''}`;

      // Create invoice
      const { data: newInvoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          invoice_number: invoiceNumber,
          customer_id: quote.customer_id,
          invoice_date: new Date().toISOString().split('T')[0],
          due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'offen',
          subtotal: quote.total,
          tax_rate: 19,
          tax_amount: quote.total * 0.19,
          total: quote.total * 1.19,
          notes: `Erstellt aus Angebot ${quote.quote_number}`,
          payment_methods: 'Überweisung'
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Copy quote items to invoice items
      if (quoteItems && quoteItems.length > 0) {
        const invoiceItems = quoteItems.map(item => ({
          invoice_id: newInvoice.id,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total: item.total,
          unit: item.unit
        }));

        const { error: itemsInsertError } = await supabase
          .from('invoice_items')
          .insert(invoiceItems);

        if (itemsInsertError) throw itemsInsertError;
      }

      // Update invoice counter
      await supabase
        .from('admin_settings')
        .update({
          value: {
            ...numbers,
            invoice_counter: (numbers?.invoice_counter || 1) + 1
          }
        })
        .eq('key', 'number_sequences');

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
      // Load quote items
      const { data: quoteItems, error: itemsError } = await supabase
        .from('quote_items')
        .select('*')
        .eq('quote_id', quote.id)
        .order('position');

      if (itemsError) throw itemsError;

      // Load customer data
      let customer = null;
      if (quote.customer_id) {
        const { data: customerData } = await supabase
          .from('customers')
          .select('*')
          .eq('id', quote.customer_id)
          .single();
        customer = customerData;
      }

      // Load company info
      const companyInfo = await loadCompanyInfo();

      // Generate PDF
      const blob = await generateQuotePDF(
        quote as Tables<'quotes'>,
        customer,
        quoteItems || [],
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
      // Get quote items for description
      const { data: quoteItems } = await supabase
        .from('quote_items')
        .select('*')
        .eq('quote_id', quote.id);

      const description = quoteItems?.map(item =>
        `${item.description} (${item.quantity} ${item.unit || 'Stk.'})`
      ).join('\n') || '';

      // Create job
      const { error: jobError } = await supabase
        .from('jobs')
        .insert({
          customer_id: quote.customer_id,
          title: `Auftrag aus Angebot ${quote.quote_number}`,
          description,
          status: 'offen',
          priority: 'normal',
          notes: `Erstellt aus Angebot ${quote.quote_number}\nGesamtwert: ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(quote.total)}`,
          start_date: new Date().toISOString().split('T')[0]
        });

      if (jobError) throw jobError;

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
