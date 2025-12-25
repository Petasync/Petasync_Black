import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Users, UserPlus, Key, Shield, ShieldOff, Loader2, Trash2 } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  totp_enabled: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [resetPasswordNew, setResetPasswordNew] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Hole alle Admin-User
      const { data: adminRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      if (rolesError) throw rolesError;

      if (!adminRoles || adminRoles.length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      const userIds = adminRoles.map(r => r.user_id);

      // Hole User-Daten aus auth.users via RPC oder admin API
      // Da wir keinen direkten Zugriff auf auth.users haben, nutzen wir admin_profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('admin_profiles')
        .select('user_id, email, totp_enabled, created_at, last_login')
        .in('user_id', userIds);

      if (profilesError) throw profilesError;

      const usersData: AdminUser[] = profiles?.map(p => ({
        id: p.user_id,
        email: p.email,
        created_at: p.created_at,
        last_sign_in_at: p.last_login,
        totp_enabled: p.totp_enabled || false,
      })) || [];

      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Fehler',
        description: 'Benutzer konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!newUserEmail || !newUserPassword) {
      toast({
        title: 'Fehler',
        description: 'Bitte alle Felder ausfüllen.',
        variant: 'destructive',
      });
      return;
    }

    if (newUserPassword.length < 8) {
      toast({
        title: 'Fehler',
        description: 'Passwort muss mindestens 8 Zeichen lang sein.',
        variant: 'destructive',
      });
      return;
    }

    setIsAddingUser(true);
    try {
      // Erstelle User via SQL
      const { data, error } = await supabase.rpc('create_admin_user', {
        user_email: newUserEmail,
        user_password: newUserPassword,
      });

      if (error) {
        // Fallback: Zeige SQL-Anleitung
        toast({
          title: 'Manuell erstellen',
          description: 'Nutze Supabase SQL Editor mit folgendem Code:',
          variant: 'destructive',
        });
        console.log(`
-- User manuell erstellen:
-- 1. Gehe zu Supabase → SQL Editor
-- 2. Führe aus:

-- Erstelle User (ersetze Passwort!)
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  '${newUserEmail}',
  crypt('${newUserPassword}', gen_salt('bf')),
  now(),
  now(),
  now()
);

-- Hole User ID
SELECT id FROM auth.users WHERE email = '${newUserEmail}';

-- Gib Admin-Rolle (ersetze USER_ID!)
INSERT INTO user_roles (user_id, role)
VALUES ('USER_ID', 'admin');

-- Erstelle Admin-Profil (ersetze USER_ID!)
INSERT INTO admin_profiles (user_id, email, created_at, updated_at)
VALUES ('USER_ID', '${newUserEmail}', now(), now());
        `);
        return;
      }

      toast({
        title: 'Erfolg',
        description: `Benutzer ${newUserEmail} wurde erstellt.`,
      });

      setNewUserEmail('');
      setNewUserPassword('');
      setIsAddUserDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: 'Fehler',
        description: 'Benutzer konnte nicht erstellt werden.',
        variant: 'destructive',
      });
    } finally {
      setIsAddingUser(false);
    }
  };

  const handleResetPassword = async () => {
    if (!selectedUserId || !resetPasswordNew) {
      toast({
        title: 'Fehler',
        description: 'Bitte Passwort eingeben.',
        variant: 'destructive',
      });
      return;
    }

    if (resetPasswordNew.length < 8) {
      toast({
        title: 'Fehler',
        description: 'Passwort muss mindestens 8 Zeichen lang sein.',
        variant: 'destructive',
      });
      return;
    }

    setIsResettingPassword(true);
    try {
      // Setze Passwort via SQL
      const { error } = await supabase.rpc('reset_user_password', {
        user_id: selectedUserId,
        new_password: resetPasswordNew,
      });

      if (error) {
        // Fallback: Zeige SQL
        toast({
          title: 'Manuell zurücksetzen',
          description: 'Nutze Supabase SQL Editor',
          variant: 'destructive',
        });
        console.log(`
-- Passwort manuell zurücksetzen:
UPDATE auth.users
SET encrypted_password = crypt('${resetPasswordNew}', gen_salt('bf'))
WHERE id = '${selectedUserId}';
        `);
        return;
      }

      toast({
        title: 'Erfolg',
        description: 'Passwort wurde geändert.',
      });

      setResetPasswordNew('');
      setSelectedUserId(null);
      setIsResetPasswordDialogOpen(false);
    } catch (error) {
      console.error('Error resetting password:', error);
      toast({
        title: 'Fehler',
        description: 'Passwort konnte nicht geändert werden.',
        variant: 'destructive',
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  const toggle2FA = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('admin_profiles')
        .update({ totp_enabled: !currentStatus })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: `2FA ${!currentStatus ? 'aktiviert' : 'deaktiviert'}.`,
      });

      fetchUsers();
    } catch (error) {
      console.error('Error toggling 2FA:', error);
      toast({
        title: 'Fehler',
        description: '2FA-Status konnte nicht geändert werden.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8" />
              Benutzerverwaltung
            </h1>
            <p className="text-muted-foreground">Verwalte Admin-Benutzer</p>
          </div>

          <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddUserDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Neuer Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Neuen Admin-Benutzer erstellen</DialogTitle>
                <DialogDescription>
                  Erstelle einen neuen Admin-Benutzer mit E-Mail und Passwort.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-email">E-Mail</Label>
                  <Input
                    id="new-email"
                    type="email"
                    placeholder="admin@petasync.de"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Passwort (min. 8 Zeichen)</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Sicheres Passwort"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleAddUser} disabled={isAddingUser}>
                  {isAddingUser ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Erstelle...
                    </>
                  ) : (
                    'Benutzer erstellen'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin-Benutzer</CardTitle>
            <CardDescription>
              Alle Benutzer mit Admin-Berechtigung
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : users.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Keine Admin-Benutzer gefunden
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>E-Mail</TableHead>
                    <TableHead>2FA</TableHead>
                    <TableHead>Erstellt</TableHead>
                    <TableHead>Letzter Login</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        {user.totp_enabled ? (
                          <Badge variant="default" className="gap-1">
                            <Shield className="h-3 w-3" />
                            Aktiv
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <ShieldOff className="h-3 w-3" />
                            Inaktiv
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString('de-DE')
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {user.last_sign_in_at
                          ? new Date(user.last_sign_in_at).toLocaleDateString('de-DE')
                          : 'Noch nie'}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Dialog open={isResetPasswordDialogOpen && selectedUserId === user.id} onOpenChange={setIsResetPasswordDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedUserId(user.id);
                                setResetPasswordEmail(user.email);
                                setIsResetPasswordDialogOpen(true);
                              }}
                            >
                              <Key className="h-4 w-4 mr-1" />
                              Passwort
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Passwort zurücksetzen</DialogTitle>
                              <DialogDescription>
                                Neues Passwort für {resetPasswordEmail}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="new-pass">Neues Passwort (min. 8 Zeichen)</Label>
                                <Input
                                  id="new-pass"
                                  type="password"
                                  placeholder="Neues sicheres Passwort"
                                  value={resetPasswordNew}
                                  onChange={(e) => setResetPasswordNew(e.target.value)}
                                />
                              </div>
                            </div>

                            <DialogFooter>
                              <Button onClick={handleResetPassword} disabled={isResettingPassword}>
                                {isResettingPassword ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Setze zurück...
                                  </>
                                ) : (
                                  'Passwort ändern'
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggle2FA(user.id, user.totp_enabled)}
                        >
                          {user.totp_enabled ? (
                            <>
                              <ShieldOff className="h-4 w-4 mr-1" />
                              2FA aus
                            </>
                          ) : (
                            <>
                              <Shield className="h-4 w-4 mr-1" />
                              2FA an
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardHeader>
            <CardTitle className="text-yellow-600 dark:text-yellow-500">
              💡 Passwort manuell zurücksetzen (SQL)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Falls die Buttons nicht funktionieren, nutze den Supabase SQL Editor:
            </p>
            <code className="block bg-muted p-3 rounded text-xs">
              -- Passwort ändern:<br />
              UPDATE auth.users<br />
              SET encrypted_password = crypt('NeuesPasswort123', gen_salt('bf'))<br />
              WHERE email = 'admin@petasync.de';
            </code>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
