import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { serviceCatalog as serviceCatalogApi, type Service } from '@/lib/api-client';
import { DEFAULT_SERVICES, SERVICE_CATEGORIES } from '@/lib/default-services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Package, Loader2, Download, Search } from 'lucide-react';

export default function AdminServiceCatalog() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unit: 'Stk.',
    default_price: '0',
    category: 'Privatkunden',
    is_active: true,
    sort_order: 100,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const response = await serviceCatalogApi.list({ sort: 'sort_order', order: 'asc' });

    if (!response.success) {
      toast({ title: 'Fehler', description: response.error || 'Laden fehlgeschlagen', variant: 'destructive' });
    } else {
      const data = response.data;
      if (Array.isArray(data)) {
        setServices(data);
      } else if (data && 'items' in data) {
        setServices(data.items);
      } else {
        setServices([]);
      }
    }
    setLoading(false);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      unit: service.unit || 'Stk.',
      default_price: service.default_price?.toString() || '0',
      category: service.category || 'Privatkunden',
      is_active: service.is_active ?? true,
      sort_order: service.sort_order || 100,
    });
    setEditDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      unit: 'Stk.',
      default_price: '0',
      category: 'Privatkunden',
      is_active: true,
      sort_order: 100,
    });
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast({ title: 'Fehler', description: 'Name ist erforderlich', variant: 'destructive' });
      return;
    }

    const serviceData = {
      name: formData.name.trim(),
      description: formData.description.trim() || null,
      unit: formData.unit,
      default_price: parseFloat(formData.default_price) || 0,
      category: formData.category,
      is_active: formData.is_active,
      sort_order: formData.sort_order,
    };

    if (editingService) {
      const response = await serviceCatalogApi.update(editingService.id, serviceData);

      if (!response.success) {
        toast({ title: 'Fehler', description: response.error || 'Aktualisieren fehlgeschlagen', variant: 'destructive' });
      } else {
        toast({ title: 'Erfolg', description: 'Dienstleistung aktualisiert' });
        setEditDialogOpen(false);
        fetchServices();
      }
    } else {
      const response = await serviceCatalogApi.create(serviceData);

      if (!response.success) {
        toast({ title: 'Fehler', description: response.error || 'Erstellen fehlgeschlagen', variant: 'destructive' });
      } else {
        toast({ title: 'Erfolg', description: 'Dienstleistung erstellt' });
        setEditDialogOpen(false);
        fetchServices();
      }
    }
  };

  const handleDelete = async (service: Service) => {
    if (!confirm(`Möchten Sie "${service.name}" wirklich löschen?`)) return;

    const response = await serviceCatalogApi.delete(service.id);

    if (!response.success) {
      toast({ title: 'Fehler', description: response.error || 'Löschen fehlgeschlagen', variant: 'destructive' });
    } else {
      toast({ title: 'Erfolg', description: 'Dienstleistung gelöscht' });
      fetchServices();
    }
  };

  const handleSeedDefaultServices = async () => {
    if (!confirm(`Möchten Sie ${DEFAULT_SERVICES.length} Standard-Dienstleistungen hinzufügen? Bereits vorhandene Einträge mit gleichem Namen werden übersprungen.`)) return;

    setSeeding(true);
    let created = 0;
    let skipped = 0;

    const existingNames = new Set(services.map(s => s.name.toLowerCase().trim()));

    for (const service of DEFAULT_SERVICES) {
      if (existingNames.has(service.name.toLowerCase().trim())) {
        skipped++;
        continue;
      }

      const response = await serviceCatalogApi.create({
        name: service.name,
        description: service.description,
        category: service.category,
        default_price: service.default_price,
        unit: service.unit,
        is_active: service.is_active,
        sort_order: service.sort_order,
      });

      if (response.success) {
        created++;
      }
    }

    toast({
      title: 'Standard-Dienstleistungen geladen',
      description: `${created} erstellt, ${skipped} übersprungen (bereits vorhanden)`,
    });

    setSeeding(false);
    fetchServices();
  };

  const formatCurrency = (amount: number | null) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount || 0);
  };

  // Filter and search
  const filteredServices = services.filter(service => {
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesSearch = !searchQuery ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group by category
  const groupedServices: Record<string, Service[]> = {};
  for (const service of filteredServices) {
    const cat = service.category || 'Sonstiges';
    if (!groupedServices[cat]) groupedServices[cat] = [];
    groupedServices[cat].push(service);
  }

  // Sort categories in defined order
  const categoryOrder = ['Privatkunden', 'Geschäftskunden', 'Webdesign', 'Sonstiges'];
  const sortedCategories = Object.keys(groupedServices).sort((a, b) => {
    const idxA = categoryOrder.indexOf(a);
    const idxB = categoryOrder.indexOf(b);
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dienstleistungen & Artikel</h1>
            <p className="text-muted-foreground mt-2">
              Verwalten Sie vorgefertigte Dienstleistungen und Artikel für Angebote und Rechnungen
            </p>
          </div>
          <div className="flex gap-2">
            {services.length === 0 && (
              <Button variant="outline" onClick={handleSeedDefaultServices} disabled={seeding}>
                {seeding ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                Standard-Katalog laden
              </Button>
            )}
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Neue Dienstleistung
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        {services.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Dienstleistung suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Alle Kategorien" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien ({services.length})</SelectItem>
                {SERVICE_CATEGORIES.map(cat => {
                  const count = services.filter(s => s.category === cat).length;
                  return count > 0 ? (
                    <SelectItem key={cat} value={cat}>{cat} ({count})</SelectItem>
                  ) : null;
                })}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleSeedDefaultServices} disabled={seeding} title="Fehlende Standard-Dienstleistungen nachladen">
              {seeding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            </Button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : services.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Noch keine Dienstleistungen vorhanden</p>
              <p className="text-sm text-muted-foreground mb-4">
                Laden Sie den Standard-Katalog mit {DEFAULT_SERVICES.length} vordefinierten Dienstleistungen oder erstellen Sie einzelne Einträge manuell.
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={handleSeedDefaultServices} disabled={seeding}>
                  {seeding ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                  Standard-Katalog laden ({DEFAULT_SERVICES.length} Einträge)
                </Button>
                <Button onClick={handleCreate} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Manuell erstellen
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : filteredServices.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Keine Dienstleistungen gefunden</p>
              <p className="text-sm text-muted-foreground mt-1">Passen Sie Ihre Suche oder Filter an.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {sortedCategories.map(category => (
              <div key={category}>
                <h2 className="text-xl font-semibold mb-3 text-primary">{category}</h2>
                <div className="grid gap-3">
                  {groupedServices[category].map((service) => (
                    <Card key={service.id} className={!service.is_active ? 'opacity-60' : ''}>
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{service.name}</span>
                              {!service.is_active && (
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">(Inaktiv)</span>
                              )}
                            </div>
                            {service.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                            )}
                            <div className="flex gap-4 mt-2 text-sm">
                              <span className="text-muted-foreground">
                                Preis: <span className="font-medium text-foreground">{formatCurrency(service.default_price)}</span>
                              </span>
                              <span className="text-muted-foreground">
                                Einheit: <span className="font-medium text-foreground">{service.unit || 'Stk.'}</span>
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(service)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(service)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Dienstleistung bearbeiten' : 'Neue Dienstleistung'}
              </DialogTitle>
              <DialogDescription>
                {editingService ? 'Ändern Sie die Details der Dienstleistung.' : 'Erstellen Sie eine neue Dienstleistung für den Katalog.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="z.B. PC-Reparatur, Virenscan, Website-Erstellung"
                />
              </div>

              <div>
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optionale detaillierte Beschreibung"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Kategorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="unit">Einheit</Label>
                  <Select
                    value={formData.unit}
                    onValueChange={(value) => setFormData({ ...formData, unit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Stk.">Stück</SelectItem>
                      <SelectItem value="Std.">Stunde</SelectItem>
                      <SelectItem value="Stunde">Stunde</SelectItem>
                      <SelectItem value="Tag">Tag</SelectItem>
                      <SelectItem value="Monat">Monat</SelectItem>
                      <SelectItem value="pauschal">Pauschal</SelectItem>
                      <SelectItem value="Projekt">Projekt</SelectItem>
                      <SelectItem value="Seite">Seite</SelectItem>
                      <SelectItem value="Dose">Dose</SelectItem>
                      <SelectItem value="User/Monat">User/Monat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Standardpreis (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.default_price}
                    onChange={(e) => setFormData({ ...formData, default_price: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="sort">Sortierung</Label>
                  <Input
                    id="sort"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 100 })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="active">Aktiv</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Abbrechen
                </Button>
                <Button onClick={handleSave}>
                  {editingService ? 'Aktualisieren' : 'Erstellen'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
