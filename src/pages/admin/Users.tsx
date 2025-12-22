import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Loader2, UserPlus, Edit, Trash2, Key, Shield, Mail } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface AdminUser {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  two_factor_enabled: boolean;
  created_at: string;
  last_login?: string;
}

export default function AdminUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin',
    is_active: true,
    two_factor_enabled: false
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      toast({
        title: 'Fehler beim Laden der Benutzer',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: formData.role
          }
        }
      });

      if (authError) throw authError;

      // Create admin user record
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({
          id: authData.user?.id,
          email: formData.email,
          role: formData.role,
          is_active: formData.is_active,
          two_factor_enabled: formData.two_factor_enabled
        });

      if (insertError) throw insertError;

      toast({
        title: 'Benutzer erfolgreich erstellt',
        description: `Der Benutzer ${formData.email} wurde angelegt.`
      });

      setIsCreateDialogOpen(false);
      setFormData({
        email: '',
        password: '',
        role: 'admin',
        is_active: true,
        two_factor_enabled: false
      });
      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Fehler beim Erstellen des Benutzers',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      const { error } = await supabase
        .from('admin_users')
        .update({
          role: formData.role,
          is_active: formData.is_active,
          two_factor_enabled: formData.two_factor_enabled
        })
        .eq('id', selectedUser.id);

      if (error) throw error;

      toast({
        title: 'Benutzer aktualisiert',
        description: 'Die Änderungen wurden gespeichert.'
      });

      setIsEditDialogOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Fehler beim Aktualisieren',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Möchten Sie diesen Benutzer wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Benutzer gelöscht',
        description: 'Der Benutzer wurde erfolgreich entfernt.'
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Fehler beim Löschen',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`
      });

      if (error) throw error;

      toast({
        title: 'Passwort-Reset E-Mail gesendet',
        description: `Eine E-Mail wurde an ${email} gesendet.`
      });
    } catch (error: any) {
      toast({
        title: 'Fehler beim Senden der E-Mail',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const openEditDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      password: '',
      role: user.role,
      is_active: user.is_active,
      two_factor_enabled: user.two_factor_enabled
    });
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Benutzerverwaltung</h1>
            <p className="text-muted-foreground">Admin-Benutzer verwalten und neue anlegen</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Neuer Benutzer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Neuen Admin-Benutzer erstellen</DialogTitle>
                <DialogDescription>
                  Geben Sie die Daten für den neuen Administrator ein
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">E-Mail-Adresse</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="admin@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Passwort</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Mindestens 8 Zeichen"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Rolle</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="admin"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="active">Aktiv</Label>
                  <Switch
                    id="active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="2fa">2-Faktor-Authentifizierung</Label>
                  <Switch
                    id="2fa"
                    checked={formData.two_factor_enabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, two_factor_enabled: checked })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Abbrechen
                </Button>
                <Button onClick={handleCreateUser}>Erstellen</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Alle Benutzer
            </CardTitle>
            <CardDescription>
              Übersicht über alle Admin-Benutzer im System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>E-Mail</TableHead>
                  <TableHead>Rolle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>2FA</TableHead>
                  <TableHead>Erstellt am</TableHead>
                  <TableHead>Letzter Login</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      Keine Benutzer vorhanden
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.is_active ? 'default' : 'secondary'}>
                          {user.is_active ? 'Aktiv' : 'Inaktiv'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.two_factor_enabled ? (
                          <Badge variant="default" className="bg-green-600">Aktiviert</Badge>
                        ) : (
                          <Badge variant="secondary">Deaktiviert</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString('de-DE')}
                      </TableCell>
                      <TableCell>
                        {user.last_login
                          ? new Date(user.last_login).toLocaleDateString('de-DE')
                          : 'Noch nie'
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResetPassword(user.email)}
                          >
                            <Key className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Benutzer bearbeiten</DialogTitle>
              <DialogDescription>
                Bearbeiten Sie die Einstellungen für {selectedUser?.email}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-email">E-Mail-Adresse</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="edit-role">Rolle</Label>
                <Input
                  id="edit-role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="edit-active">Aktiv</Label>
                <Switch
                  id="edit-active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="edit-2fa">2-Faktor-Authentifizierung</Label>
                <Switch
                  id="edit-2fa"
                  checked={formData.two_factor_enabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, two_factor_enabled: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleUpdateUser}>Speichern</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
