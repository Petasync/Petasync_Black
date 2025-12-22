import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, MapPin, Plus, Search, User } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';
import type { Tables } from '@/integrations/supabase/types';

type Appointment = Tables<'appointments'>;
type Customer = Tables<'customers'>;

const statusColors: Record<string, string> = {
  ausstehend: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  bestaetigt: 'bg-green-500/20 text-green-400 border-green-500/30',
  abgesagt: 'bg-red-500/20 text-red-400 border-red-500/30',
  erledigt: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const statusLabels: Record<string, string> = {
  ausstehend: 'Ausstehend',
  bestaetigt: 'Bestätigt',
  abgesagt: 'Abgesagt',
  erledigt: 'Erledigt',
};

export default function Appointments() {
  const [appointments, setAppointments] = useState<(Appointment & { customer?: Customer })[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    scheduled_at: string;
    duration_minutes: number;
    location: string;
    customer_id: string;
    status: 'ausstehend' | 'bestaetigt' | 'abgesagt' | 'erledigt';
    notes: string;
  }>({
    title: '',
    description: '',
    scheduled_at: '',
    duration_minutes: 60,
    location: '',
    customer_id: '',
    status: 'ausstehend',
    notes: '',
  });

  useEffect(() => {
    fetchAppointments();
    fetchCustomers();
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, customer:customers(*)')
      .order('scheduled_at', { ascending: true });

    if (error) {
      toast.error('Fehler beim Laden der Termine');
      return;
    }

    setAppointments(data || []);
    setLoading(false);
  };

  const fetchCustomers = async () => {
    const { data } = await supabase.from('customers').select('*').order('last_name');
    setCustomers(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const appointmentData = {
      ...formData,
      customer_id: formData.customer_id || null,
    };

    if (editingAppointment) {
      const { error } = await supabase
        .from('appointments')
        .update(appointmentData)
        .eq('id', editingAppointment.id);

      if (error) {
        toast.error('Fehler beim Aktualisieren');
        return;
      }
      toast.success('Termin aktualisiert');
    } else {
      const { error } = await supabase.from('appointments').insert(appointmentData);

      if (error) {
        toast.error('Fehler beim Erstellen');
        return;
      }
      toast.success('Termin erstellt');
    }

    setDialogOpen(false);
    resetForm();
    fetchAppointments();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      scheduled_at: '',
      duration_minutes: 60,
      location: '',
      customer_id: '',
      status: 'ausstehend',
      notes: '',
    });
    setEditingAppointment(null);
  };

  const openEditDialog = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      title: appointment.title,
      description: appointment.description || '',
      scheduled_at: appointment.scheduled_at ? format(new Date(appointment.scheduled_at), "yyyy-MM-dd'T'HH:mm") : '',
      duration_minutes: appointment.duration_minutes || 60,
      location: appointment.location || '',
      customer_id: appointment.customer_id || '',
      status: appointment.status || 'ausstehend',
      notes: appointment.notes || '',
    });
    setDialogOpen(true);
  };

  const updateStatus = async (id: string, status: 'ausstehend' | 'bestaetigt' | 'abgesagt' | 'erledigt') => {
    const { error } = await supabase.from('appointments').update({ status }).eq('id', id);
    if (error) {
      toast.error('Fehler beim Aktualisieren');
      return;
    }
    toast.success('Status aktualisiert');
    fetchAppointments();
  };

  const filteredAppointments = appointments.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.customer?.last_name?.toLowerCase().includes(search.toLowerCase())
  );

  const upcomingAppointments = filteredAppointments.filter(
    (a) => new Date(a.scheduled_at) >= new Date() && a.status !== 'abgesagt' && a.status !== 'erledigt'
  );
  const pastAppointments = filteredAppointments.filter(
    (a) => new Date(a.scheduled_at) < new Date() || a.status === 'abgesagt' || a.status === 'erledigt'
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Termine</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Kundentermine</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Neuer Termin
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingAppointment ? 'Termin bearbeiten' : 'Neuer Termin'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Titel"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Beschreibung"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="datetime-local"
                    value={formData.scheduled_at}
                    onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Dauer (Min.)"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                  />
                </div>
                <Input
                  placeholder="Ort"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <Select
                  value={formData.customer_id}
                  onValueChange={(value) => setFormData({ ...formData, customer_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kunde auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.first_name} {customer.last_name}
                        {customer.company_name && ` (${customer.company_name})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as 'ausstehend' | 'bestaetigt' | 'abgesagt' | 'erledigt' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Notizen"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
                <Button type="submit" className="w-full">
                  {editingAppointment ? 'Speichern' : 'Erstellen'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Termine durchsuchen..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Laden...</div>
        ) : (
          <div className="space-y-8">
            {upcomingAppointments.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Anstehende Termine</h2>
                <div className="grid gap-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => openEditDialog(appointment)}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-foreground">{appointment.title}</h3>
                              <Badge className={statusColors[appointment.status || 'ausstehend']}>
                                {statusLabels[appointment.status || 'ausstehend']}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {format(new Date(appointment.scheduled_at), 'dd. MMMM yyyy', { locale: de })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {format(new Date(appointment.scheduled_at), 'HH:mm')} Uhr
                                {appointment.duration_minutes && ` (${appointment.duration_minutes} Min.)`}
                              </span>
                              {appointment.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {appointment.location}
                                </span>
                              )}
                              {appointment.customer && (
                                <span className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {appointment.customer.first_name} {appointment.customer.last_name}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button size="sm" variant="outline" onClick={() => updateStatus(appointment.id, 'bestaetigt')}>
                              Bestätigen
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => updateStatus(appointment.id, 'erledigt')}>
                              Erledigt
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {pastAppointments.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-muted-foreground">Vergangene Termine</h2>
                <div className="grid gap-4 opacity-70">
                  {pastAppointments.slice(0, 10).map((appointment) => (
                    <Card key={appointment.id} className="cursor-pointer" onClick={() => openEditDialog(appointment)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <h3 className="font-medium text-foreground">{appointment.title}</h3>
                            <Badge className={statusColors[appointment.status || 'ausstehend']}>
                              {statusLabels[appointment.status || 'ausstehend']}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(appointment.scheduled_at), 'dd.MM.yyyy HH:mm')}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {filteredAppointments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Keine Termine gefunden
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
