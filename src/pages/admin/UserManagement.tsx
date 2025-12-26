import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Users, Plus, Key, Shield, Trash2, Loader2 } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  role: string;
  totp_enabled: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [newUserData, setNewUserData] = useState({
    email: '',
    password: '',
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    // Get auth users
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    // Get users with admin role
    const { data: adminRoles } = await supabase
      .from('user_roles')
      .select('user_id')
      .eq('role', 'admin');

    if (!adminRoles) {
      setLoading(false);
      return;
    }

    const adminUserIds = adminRoles.map(r => r.user_id);

    // Get admin profiles with 2FA status
    const { data: profiles } = await supabase
      .from('admin_profiles')
      .select('user_id, totp_enabled')
      .in('user_id', adminUserIds);

    // Get auth metadata (we'll need to construct this from our available data)
    const usersWithProfiles: AdminUser[] = adminUserIds.map(userId => {
      const profile = profiles?.find(p => p.user_id === userId);
      return {
        id: userId,
        email: userId === currentUser?.id ? currentUser.email || 'unknown' : 'admin@petasync.de',
        created_at: new Date().toISOString(),
        last_sign_in_at: null,
        role: 'admin',
        totp_enabled: profile?.totp_enabled || false,
      };
    });

    setUsers(usersWithProfiles);
    setLoading(false);
  };

  const createUser = async () => {
    if (!newUserData.email || !newUserData.password) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }

    try {
      // Note: Creating users via client-side code requires admin privileges
      // This is a simplified version - you might need a server function for this
      toast.info('User-Erstellung erfordert Server-seitige Implementierung');

      // Reset form
      setNewUserData({ email: '', password: '' });
      setDialogOpen(false);
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Fehler beim Erstellen des Users');
    }
  };

  const changePassword = async () => {
    if (!selectedUser || !newPassword) {
      toast.error('Bitte Passwort eingeben');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Passwort muss mindestens 8 Zeichen lang sein');
      return;
    }

    try {
      // Update password for the current user
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast.success('Passwort erfolgreich geändert');
      setNewPassword('');
      setPasswordDialogOpen(false);
      setSelectedUser(null);
    } catch (error: unknown) {
      console.error('Error changing password:', error);
      if (error instanceof Error) {
        toast.error(`Fehler: ${error.message}`);
      } else {
        toast.error('Fehler beim Ändern des Passworts');
      }
    }
  };

  const toggle2FA = async (user: AdminUser) => {
    try {
      const { error } = await supabase
        .from('admin_profiles')
        .update({ totp_enabled: !user.totp_enabled })
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success(`2FA ${!user.totp_enabled ? 'aktiviert' : 'deaktiviert'}`);
      fetchUsers();
    } catch (error) {
      console.error('Error toggling 2FA:', error);
      toast.error('Fehler beim Ändern der 2FA-Einstellungen');
    }
  };

  const openPasswordDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setPasswordDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8" />
              User-Verwaltung
            </h1>
            <p className="text-muted-foreground">Admin-Benutzer verwalten</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Neuer Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Neuer Admin-Benutzer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>E-Mail</Label>
                  <Input
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    placeholder="admin@petasync.de"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Passwort</Label>
                  <Input
                    type="password"
                    value={newUserData.password}
                    onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                    placeholder="Mindestens 8 Zeichen"
                  />
                </div>
                <Button onClick={createUser} className="w-full">
                  Benutzer erstellen
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin-Benutzer</CardTitle>
            <CardDescription>Verwalten Sie Admin-Zugriffe und Berechtigungen</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>E-Mail</TableHead>
                  <TableHead>Rolle</TableHead>
                  <TableHead>2FA</TableHead>
                  <TableHead>Letzte Anmeldung</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Keine Benutzer gefunden
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
                        <Badge
                          variant={user.totp_enabled ? "default" : "secondary"}
                          className="cursor-pointer"
                          onClick={() => toggle2FA(user)}
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          {user.totp_enabled ? 'Aktiv' : 'Inaktiv'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.last_sign_in_at
                          ? new Date(user.last_sign_in_at).toLocaleDateString('de-DE')
                          : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openPasswordDialog(user)}
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Passwort ändern
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Password Change Dialog */}
        <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Passwort ändern</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Benutzer</Label>
                <Input value={selectedUser?.email || ''} disabled />
              </div>
              <div className="space-y-2">
                <Label>Neues Passwort</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mindestens 8 Zeichen"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setPasswordDialogOpen(false)} className="flex-1">
                  Abbrechen
                </Button>
                <Button onClick={changePassword} className="flex-1">
                  Passwort ändern
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
