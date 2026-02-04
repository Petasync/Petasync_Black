import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { inquiries as inquiriesApi, type Inquiry } from '@/lib/api-client';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Search, Filter, Plus, Eye, Loader2, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

type InquiryStatus = Inquiry['status'];
type InquiryPriority = Inquiry['priority'];
type InquiryType = Inquiry['inquiry_type'];

const statusLabels: Record<InquiryStatus, string> = {
  neu: 'Neu',
  in_bearbeitung: 'In Bearbeitung',
  angebot_erstellt: 'Angebot erstellt',
  beantwortet: 'Beantwortet',
  erledigt: 'Erledigt',
  archiviert: 'Archiviert',
};

const statusColors: Record<InquiryStatus, string> = {
  neu: 'bg-blue-500/20 text-blue-400',
  in_bearbeitung: 'bg-yellow-500/20 text-yellow-400',
  angebot_erstellt: 'bg-purple-500/20 text-purple-400',
  beantwortet: 'bg-green-500/20 text-green-400',
  erledigt: 'bg-gray-500/20 text-gray-400',
  archiviert: 'bg-gray-500/20 text-gray-500',
};

const priorityLabels: Record<InquiryPriority, string> = {
  normal: 'Normal',
  hoch: 'Hoch',
  dringend: 'Dringend',
};

const priorityColors: Record<InquiryPriority, string> = {
  normal: 'bg-gray-500/20 text-gray-400',
  hoch: 'bg-orange-500/20 text-orange-400',
  dringend: 'bg-red-500/20 text-red-400',
};

const typeLabels: Record<InquiryType, string> = {
  privat: 'Privat',
  business: 'Business',
  website: 'Website',
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const response = await inquiriesApi.list({ sort: 'created_at', order: 'desc' });

    if (!response.success) {
      toast({ title: 'Fehler', description: response.error || 'Anfragen konnten nicht geladen werden', variant: 'destructive' });
    } else {
      const data = response.data;
      if (Array.isArray(data)) {
        setInquiries(data);
      } else if (data && 'items' in data) {
        setInquiries(data.items);
      } else {
        setInquiries([]);
      }
    }
    setLoading(false);
  };

  const updateInquiry = async (id: string, updates: Partial<Inquiry>) => {
    setSaving(true);
    const response = await inquiriesApi.update(id, updates);

    if (!response.success) {
      toast({ title: 'Fehler', description: response.error || 'Speichern fehlgeschlagen', variant: 'destructive' });
    } else {
      toast({ title: 'Gespeichert' });
      fetchInquiries();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, ...updates });
      }
    }
    setSaving(false);
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openDetail = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setNotes(inquiry.internal_notes || '');
    setDialogOpen(true);
  };

  const saveNotes = async () => {
    if (!selectedInquiry) return;
    await updateInquiry(selectedInquiry.id, { internal_notes: notes });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Anfragen</h1>
            <p className="text-muted-foreground">Alle Kontaktanfragen verwalten</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Suchen nach Name, E-Mail, Inhalt..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
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
                <TableHead>Datum</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Bereich</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priorität</TableHead>
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
              ) : filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Keine Anfragen gefunden
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="text-sm">
                      {format(new Date(inquiry.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{inquiry.name}</p>
                        <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{typeLabels[inquiry.inquiry_type]}</Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={inquiry.status}
                        onValueChange={(value) => updateInquiry(inquiry.id, { status: value as InquiryStatus })}
                      >
                        <SelectTrigger className={`w-[150px] ${statusColors[inquiry.status]}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={inquiry.priority}
                        onValueChange={(value) => updateInquiry(inquiry.id, { priority: value as InquiryPriority })}
                      >
                        <SelectTrigger className={`w-[120px] ${priorityColors[inquiry.priority]}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(priorityLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openDetail(inquiry)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Detail Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Anfrage Details</DialogTitle>
            </DialogHeader>
            {selectedInquiry && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="font-medium">{selectedInquiry.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Datum</Label>
                    <p>{format(new Date(selectedInquiry.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${selectedInquiry.email}`} className="text-primary hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                  {selectedInquiry.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${selectedInquiry.phone}`} className="text-primary hover:underline">
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-muted-foreground">Nachricht</Label>
                  <p className="mt-1 p-3 bg-muted/50 rounded-lg whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>

                <div>
                  <Label htmlFor="notes">Interne Notizen</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notizen hinzufügen..."
                    className="mt-1"
                    rows={4}
                  />
                  <Button onClick={saveNotes} disabled={saving} className="mt-2">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Notizen speichern
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
