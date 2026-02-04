import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { serviceCatalog as serviceCatalogApi, type Service } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Package, Loader2 } from 'lucide-react';

export default function AdminServiceCatalog() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unit: 'Stk.',
    default_price: '0',
    category: 'Dienstleistung',
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
      category: service.category || 'Dienstleistung',
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
      category: 'Dienstleistung',
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
      // Update
      const response = await serviceCatalogApi.update(editingService.id, serviceData);

      if (!response.success) {
        toast({ title: 'Fehler', description: response.error || 'Aktualisieren fehlgeschlagen', variant: 'destructive' });
      } else {
        toast({ title: 'Erfolg', description: 'Dienstleistung aktualisiert' });
        setEditDialogOpen(false);
        fetchServices();
      }
    } else {
      // Create
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

  const formatCurrency = (amount: number | null) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount || 0);
  };

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
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Neue Dienstleistung
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : services.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Noch keine Dienstleistungen vorhanden</p>
              <Button onClick={handleCreate} variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Erste Dienstleistung erstellen
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {services.map((service) => (
              <Card key={service.id} className={!service.is_active ? 'opacity-60' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {service.name}
                        {!service.is_active && (
                          <span className="text-xs font-normal text-muted-foreground">(Inaktiv)</span>
                        )}
                      </CardTitle>
                      {service.description && (
                        <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
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
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Typ:</span>{' '}
                      <span className="font-medium">{service.category || 'Keine'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Einheit:</span>{' '}
                      <span className="font-medium">{service.unit || 'Stk.'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Preis:</span>{' '}
                      <span className="font-medium">{formatCurrency(service.default_price)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Dienstleistung bearbeiten' : 'Neue Dienstleistung'}
              </DialogTitle>
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
                  <Label htmlFor="category">Typ</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dienstleistung">Dienstleistung</SelectItem>
                      <SelectItem value="Artikel">Artikel</SelectItem>
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
                      <SelectItem value="Tag">Tag</SelectItem>
                      <SelectItem value="Monat">Monat</SelectItem>
                      <SelectItem value="Pauschal">Pauschal</SelectItem>
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
