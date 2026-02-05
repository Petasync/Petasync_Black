import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { websiteProjects as projectsApi, customers as customersApi, type WebsiteProject, type Customer } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Globe, Plus, Search, Calendar, Building2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

type WebsiteProjectWithCustomer = WebsiteProject & { customer?: Customer };

const statusColors: Record<string, string> = {
  anfrage: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  angebot: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  anzahlung: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  umsetzung: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  review: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  live: 'bg-green-500/20 text-green-400 border-green-500/30',
  wartung: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

const statusLabels: Record<string, string> = {
  anfrage: 'Anfrage',
  angebot: 'Angebot',
  anzahlung: 'Anzahlung',
  umsetzung: 'Umsetzung',
  review: 'Review',
  live: 'Live',
  wartung: 'Wartung',
};

const statusProgress: Record<string, number> = {
  anfrage: 10,
  angebot: 20,
  anzahlung: 30,
  umsetzung: 60,
  review: 80,
  live: 100,
  wartung: 100,
};

const packageTypes = ['Template', 'Starter', 'Business', 'Enterprise'];

export default function WebsiteProjects() {
  const [projects, setProjects] = useState<WebsiteProjectWithCustomer[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<WebsiteProjectWithCustomer | null>(null);
  const [formData, setFormData] = useState<{
    project_name: string;
    customer_id: string;
    package_type: string;
    domain: string;
    industry: string;
    budget_range: string;
    status: 'anfrage' | 'angebot' | 'anzahlung' | 'umsetzung' | 'review' | 'live' | 'wartung';
    go_live_date: string;
    notes: string;
    features: string[];
  }>({
    project_name: '',
    customer_id: '',
    package_type: '',
    domain: '',
    industry: '',
    budget_range: '',
    status: 'anfrage',
    go_live_date: '',
    notes: '',
    features: [],
  });

  useEffect(() => {
    fetchProjects();
    fetchCustomers();
  }, []);

  const fetchProjects = async () => {
    const response = await projectsApi.list({ sort: 'created_at', order: 'desc' });

    if (!response.success) {
      toast.error('Fehler beim Laden der Projekte');
      setLoading(false);
      return;
    }

    const data = response.data;
    if (Array.isArray(data)) {
      setProjects(data as WebsiteProjectWithCustomer[]);
    } else if (data && 'items' in data) {
      setProjects(data.items as WebsiteProjectWithCustomer[]);
    } else {
      setProjects([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      customer_id: formData.customer_id || null,
      go_live_date: formData.go_live_date || null,
    };

    if (editingProject) {
      const response = await projectsApi.update(editingProject.id, projectData);

      if (!response.success) {
        toast.error('Fehler beim Aktualisieren');
        return;
      }
      toast.success('Projekt aktualisiert');
    } else {
      const response = await projectsApi.create(projectData);

      if (!response.success) {
        toast.error('Fehler beim Erstellen');
        return;
      }
      toast.success('Projekt erstellt');
    }

    setDialogOpen(false);
    resetForm();
    fetchProjects();
  };

  const resetForm = () => {
    setFormData({
      project_name: '',
      customer_id: '',
      package_type: '',
      domain: '',
      industry: '',
      budget_range: '',
      status: 'anfrage',
      go_live_date: '',
      notes: '',
      features: [],
    });
    setEditingProject(null);
  };

  const openEditDialog = (project: WebsiteProjectWithCustomer) => {
    setEditingProject(project);
    setFormData({
      project_name: project.project_name,
      customer_id: project.customer_id || '',
      package_type: project.package_type || '',
      domain: project.domain || '',
      industry: project.industry || '',
      budget_range: project.budget_range || '',
      status: (project.status as 'anfrage' | 'angebot' | 'anzahlung' | 'umsetzung' | 'review' | 'live' | 'wartung') || 'anfrage',
      go_live_date: project.go_live_date || '',
      notes: project.notes || '',
      features: project.features || [],
    });
    setDialogOpen(true);
  };

  const updateStatus = async (id: string, status: 'anfrage' | 'angebot' | 'anzahlung' | 'umsetzung' | 'review' | 'live' | 'wartung') => {
    const response = await projectsApi.update(id, { status });
    if (!response.success) {
      toast.error('Fehler beim Aktualisieren');
      return;
    }
    toast.success('Status aktualisiert');
    fetchProjects();
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.project_name.toLowerCase().includes(search.toLowerCase()) ||
      p.domain?.toLowerCase().includes(search.toLowerCase()) ||
      p.customer?.last_name?.toLowerCase().includes(search.toLowerCase())
  );

  const activeProjects = filteredProjects.filter((p) => p.status !== 'live' && p.status !== 'wartung');
  const completedProjects = filteredProjects.filter((p) => p.status === 'live' || p.status === 'wartung');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Website-Projekte</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Webdesign-Projekte</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Neues Projekt
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Projekt bearbeiten' : 'Neues Projekt'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Projektname"
                  value={formData.project_name}
                  onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                  required
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
                  value={formData.package_type}
                  onValueChange={(value) => setFormData({ ...formData, package_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Paket auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Domain (z.B. example.de)"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                />
                <Input
                  placeholder="Branche"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                />
                <Input
                  placeholder="Budget-Rahmen"
                  value={formData.budget_range}
                  onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                />
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as 'anfrage' | 'angebot' | 'anzahlung' | 'umsetzung' | 'review' | 'live' | 'wartung' })}
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
                <Input
                  type="date"
                  placeholder="Geplantes Go-Live"
                  value={formData.go_live_date}
                  onChange={(e) => setFormData({ ...formData, go_live_date: e.target.value })}
                />
                <Textarea
                  placeholder="Notizen"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
                <Button type="submit" className="w-full">
                  {editingProject ? 'Speichern' : 'Erstellen'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Projekte durchsuchen..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Laden...</div>
        ) : (
          <div className="space-y-8">
            {activeProjects.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Aktive Projekte</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {activeProjects.map((project) => (
                    <Card key={project.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => openEditDialog(project)}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{project.project_name}</CardTitle>
                            {project.customer && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {project.customer.first_name} {project.customer.last_name}
                              </p>
                            )}
                          </div>
                          <Badge className={statusColors[project.status || 'anfrage']}>
                            {statusLabels[project.status || 'anfrage']}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Fortschritt</span>
                            <span>{statusProgress[project.status || 'anfrage']}%</span>
                          </div>
                          <Progress value={statusProgress[project.status || 'anfrage']} className="h-2" />
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          {project.domain && (
                            <span className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {project.domain}
                            </span>
                          )}
                          {project.package_type && (
                            <Badge variant="outline" className="text-xs">{project.package_type}</Badge>
                          )}
                          {project.go_live_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(project.go_live_date), 'dd.MM.yyyy')}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                          <Select
                            value={project.status || 'anfrage'}
                            onValueChange={(value) => updateStatus(project.id, value as 'anfrage' | 'angebot' | 'anzahlung' | 'umsetzung' | 'review' | 'live' | 'wartung')}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusLabels).map(([value, label]) => (
                                <SelectItem key={value} value={value}>{label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {completedProjects.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-muted-foreground">Abgeschlossene Projekte</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 opacity-70">
                  {completedProjects.map((project) => (
                    <Card key={project.id} className="cursor-pointer" onClick={() => openEditDialog(project)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">{project.project_name}</h3>
                            {project.domain && (
                              <p className="text-sm text-muted-foreground">{project.domain}</p>
                            )}
                          </div>
                          <Badge className={statusColors[project.status || 'live']}>
                            {statusLabels[project.status || 'live']}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Keine Projekte gefunden
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
