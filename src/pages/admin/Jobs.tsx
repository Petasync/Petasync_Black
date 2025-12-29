import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
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

interface Customer {
  id: string;
  first_name: string | null;
  last_name: string;
  company_name: string | null;
}

interface Job {
  id: string;
  customer_id: string | null;
  title: string;
  description: string | null;
  status: 'offen' | 'in_arbeit' | 'abgeschlossen' | 'storniert';
  priority: 'niedrig' | 'normal' | 'hoch' | 'dringend';
  notes: string | null;
  start_date: string | null;
  due_date: string | null;
  completed_date: string | null;
  created_at: string;
  updated_at: string;
  customer?: Customer;
}

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    customer_id: '',
    title: '',
    description: '',
    status: 'offen' as Job['status'],
    priority: 'normal' as Job['priority'],
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
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        customer:customers(id, first_name, last_name, company_name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      toast({ title: 'Hinweis', description: 'Jobs-Tabelle existiert noch nicht. Bitte SQL ausführen.', variant: 'destructive' });
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  const fetchCustomers = async () => {
    const { data } = await supabase
      .from('customers')
      .select('id, first_name, last_name, company_name')
      .order('last_name');
    setCustomers(data || []);
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

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      customer_id: job.customer_id || '',
      title: job.title,
      description: job.description || '',
      status: job.status,
      priority: job.priority,
      notes: job.notes || '',
      start_date: job.start_date || '',
      due_date: job.due_date || '',
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
      priority: formData.priority,
      notes: formData.notes.trim() || null,
      start_date: formData.start_date || null,
      due_date: formData.due_date || null,
      completed_date: formData.status === 'abgeschlossen' ? new Date().toISOString() : null,
    };

    if (editingJob) {
      const { error } = await supabase
        .from('jobs')
        .update(jobData)
        .eq('id', editingJob.id);

      if (error) {
        toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Erfolg', description: 'Auftrag aktualisiert' });
        setEditDialogOpen(false);
        fetchJobs();
      }
    } else {
      const { error } = await supabase
        .from('jobs')
        .insert([jobData]);

      if (error) {
        toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Erfolg', description: 'Auftrag erstellt' });
        setEditDialogOpen(false);
        fetchJobs();
      }
    }
  };

  const handleDelete = async (job: Job) => {
    if (!confirm(`Auftrag "${job.title}" wirklich löschen?`)) return;

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', job.id);

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Erfolg', description: 'Auftrag gelöscht' });
      fetchJobs();
    }
  };

  const getStatusBadgeVariant = (status: Job['status']) => {
    switch (status) {
      case 'abgeschlossen': return 'default';
      case 'in_arbeit': return 'secondary';
      case 'offen': return 'outline';
      case 'storniert': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityBadgeVariant = (priority: Job['priority']) => {
    switch (priority) {
      case 'dringend': return 'destructive';
      case 'hoch': return 'secondary';
      case 'normal': return 'outline';
      case 'niedrig': return 'outline';
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
                        <Badge variant={getPriorityBadgeVariant(job.priority)}>
                          {job.priority}
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
                {(job.description || job.start_date || job.due_date) && (
                  <CardContent>
                    {job.description && (
                      <p className="text-sm mb-2">{job.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {job.start_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Start: {new Date(job.start_date).toLocaleDateString('de-DE')}
                        </div>
                      )}
                      {job.due_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Fällig: {new Date(job.due_date).toLocaleDateString('de-DE')}
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
                    onValueChange={(value: Job['status']) => setFormData({ ...formData, status: value })}
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
                  <Label htmlFor="priority">Priorität</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: Job['priority']) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="niedrig">Niedrig</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="hoch">Hoch</SelectItem>
                      <SelectItem value="dringend">Dringend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Startdatum</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="due_date">Fälligkeitsdatum</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
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
