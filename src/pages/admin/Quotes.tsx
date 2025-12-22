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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Search, Plus, Edit, Eye, Loader2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

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
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
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
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Status aktualisiert' });
      fetchQuotes();
    }
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Angebote</h1>
            <p className="text-muted-foreground">Alle Angebote verwalten</p>
          </div>
          <Button asChild>
            <Link to="/admin/quotes/new">
              <Plus className="h-4 w-4 mr-2" />
              Neues Angebot
            </Link>
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
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/quotes/${quote.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/quotes/${quote.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
