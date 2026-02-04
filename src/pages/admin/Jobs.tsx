import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { jobs as jobsApi, customers as customersApi, type Job, type Customer } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2, Briefcase, Calendar } from 'lucide-react';

// Extended Job type with customer relation
type JobWithCustomer = Job & {
  customer?: Customer;
};

export default function AdminJobs() {
  const [jobs, setJobs] = useState<JobWithCustomer[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobWithCustomer | null>(null);
  const [formData, setFormData] = useState({
    customer_id: '',
    title: '',
    description: '',
    status: 'offen' as string,
    priority: 'normal' as string,
    notes: '',
    start_date: '',
    due_date: '',
  });

  useEffect(() => {
    fetchJobs();
    fetchCustomers();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const response = await jobsApi.list({ sort: 'created_at', order: 'desc' });

    if (!response.success) {
      console.error('Error fetching jobs:', response.error);
      toast({ title: 'Hinweis', description: response.error || 'Jobs konnten nicht geladen werden', variant: 'destructive' });
    } else {
      const data = response.data;
      if (Array.isArray(data)) {
        setJobs(data as JobWithCustomer[]);
      } else if (data && 'items' in data) {
        setJobs(data.items as JobWithCustomer[]);
      } else {
        setJobs([]);
      }
    }
    setLoading(false);
  };

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

  const handleCreate = () => {
    setEditingJob(null);
    setFormData({
      customer_id: '',
      title: '',
      description: '',
      status: 'offen',
      priority: 'normal',
      notes: '',
      start_date: '',
      due_date: '',
    });
    setEditDialogOpen(true);
  };

  const handleEdit = (job: JobWithCustomer) => {
    setEditingJob(job);
    setFormData({
      customer_id: job.customer_id || '',
      title: job.title,
      description: job.description || '',
      status: job.status || 'offen',
      priority: 'normal',
      notes: job.notes || '',
      start_date: job.scheduled_date || '',
      due_date: '',
    });
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast({ title: 'Fehler', description: 'Titel ist erforderlich', variant: 'destructive' });
      return;
    }

    const jobData = {
      customer_id: formData.customer_id || null,
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      status: formData.status,
      notes: formData.notes.trim() || null,
      scheduled_date: formData.start_date || null,
      completed_date: formData.status === 'abgeschlossen' ? new Date().toISOString() : null,
    };

    if (editingJob) {
      const response = await jobsApi.update(editingJob.id, jobData);

      if (!response.success) {
        toast({ title: 'Fehler', description: response.error || 'Speichern fehlgeschlagen', variant: 'destructive' });
      } else {
        toast({ title: 'Erfolg', description: 'Auftrag aktualisiert' });
        setEditDialogOpen(false);
        fetchJobs();
      }
    } else {
      const response = await jobsApi.create(jobData);

      if (!response.success) {
        toast({ title: 'Fehler', description: response.error || 'Erstellen fehlgeschlagen', variant: 'destructive' });
      } else {
        toast({ title: 'Erfolg', description: 'Auftrag erstellt' });
        setEditDialogOpen(false);
        fetchJobs();
      }
    }
  };

  const handleDelete = async (job: JobWithCustomer) => {
    if (!confirm(`Auftrag "${job.title}" wirklich löschen?`)) return;

    const response = await jobsApi.delete(job.id);

    if (!response.success) {
      toast({ title: 'Fehler', description: response.error || 'Löschen fehlgeschlagen', variant: 'destructive' });
    } else {
      toast({ title: 'Erfolg', description: 'Auftrag gelöscht' });
      fetchJobs();
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'abgeschlossen': return 'default';
      case 'in_arbeit': return 'secondary';
      case 'offen': return 'outline';
      case 'storniert': return 'destructive';
      default: return 'outline';
    }
  };

  const getCustomerName = (customer: Customer | undefined) => {
    if (!customer) return 'Kein Kunde';
    if (customer.company_name) return customer.company_name;
    return `${customer.first_name || ''} ${customer.last_name}`.trim();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Auftrags-Dokumentation</h1>
            <p className="text-muted-foreground mt-2">
              Verwalten und dokumentieren Sie Ihre Aufträge und Projekte
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Neuer Auftrag
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : jobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Noch keine Aufträge vorhanden</p>
              <p className="text-sm text-muted-foreground mb-4">
                Hinweis: Falls Sie einen Datenbankfehler sehen, führen Sie bitte die SQL-Statements aus (siehe Deployment-Anleitung)
              </p>
              <Button onClick={handleCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Ersten Auftrag erstellen
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {job.title}
                        <Badge variant={getStatusBadgeVariant(job.status)}>
                          {job.status}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Kunde: {getCustomerName(job.customer)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(job)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(job)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {(job.description || job.scheduled_date || job.completed_date) && (
                  <CardContent>
                    {job.description && (
                      <p className="text-sm mb-2">{job.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {job.scheduled_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Geplant: {new Date(job.scheduled_date).toLocaleDateString('de-DE')}
                        </div>
                      )}
                      {job.completed_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Abgeschlossen: {new Date(job.completed_date).toLocaleDateString('de-DE')}
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingJob ? 'Auftrag bearbeiten' : 'Neuer Auftrag'}</DialogTitle>
              <DialogDescription>
                {editingJob ? 'Bearbeiten Sie die Auftragsdetails und speichern Sie Ihre Änderungen.' : 'Erstellen Sie einen neuen Auftrag für Ihren Kunden.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="z.B. PC-Reparatur für Firma XY"
                />
              </div>

              <div>
                <Label htmlFor="customer">Kunde</Label>
                <Select
                  value={formData.customer_id || 'none'}
                  onValueChange={(value) => setFormData({ ...formData, customer_id: value === 'none' ? null : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kunde auswählen (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Kein Kunde</SelectItem>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {getCustomerName(customer)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detaillierte Beschreibung des Auftrags"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="offen">Offen</SelectItem>
                      <SelectItem value="in_arbeit">In Arbeit</SelectItem>
                      <SelectItem value="abgeschlossen">Abgeschlossen</SelectItem>
                      <SelectItem value="storniert">Storniert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="start_date">Geplantes Datum</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Interne Notizen</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Interne Notizen und Kommentare"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Abbrechen
                </Button>
                <Button onClick={handleSave}>
                  {editingJob ? 'Aktualisieren' : 'Erstellen'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
