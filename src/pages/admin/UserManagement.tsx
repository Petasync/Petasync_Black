import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { auth } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Users, Key, Shield, Loader2 } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  display_name: string;
  role: string;
  totp_enabled: boolean;
}

export default function UserManagement() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    setLoading(true);
    const response = await auth.getMe();

    if (response.success && response.data) {
      setCurrentUser(response.data as AdminUser);
    }
    setLoading(false);
  };

  const changePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Passwort muss mindestens 8 Zeichen lang sein');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwörter stimmen nicht überein');
      return;
    }

    setChangingPassword(true);
    try {
      const response = await auth.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (!response.success) {
        toast.error(response.error || 'Fehler beim Ändern des Passworts');
        return;
      }

      toast.success('Passwort erfolgreich geändert');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordDialogOpen(false);
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Fehler beim Ändern des Passworts');
    } finally {
      setChangingPassword(false);
    }
  };

  const handle2FASetup = () => {
    navigate('/admin/2fa');
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
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin-Benutzer</CardTitle>
            <CardDescription>Aktueller angemeldeter Benutzer</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>E-Mail</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Rolle</TableHead>
                  <TableHead>2FA</TableHead>
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
                ) : !currentUser ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nicht angemeldet
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell className="font-medium">{currentUser.email}</TableCell>
                    <TableCell>{currentUser.display_name || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{currentUser.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={currentUser.totp_enabled ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={handle2FASetup}
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        {currentUser.totp_enabled ? 'Aktiv' : 'Inaktiv'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPasswordDialogOpen(true)}
                      >
                        <Key className="h-4 w-4 mr-2" />
                        Passwort ändern
                      </Button>
                      {!currentUser.totp_enabled && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handle2FASetup}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          2FA aktivieren
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
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
                <Label>Aktuelles Passwort</Label>
                <Input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  placeholder="Aktuelles Passwort"
                />
              </div>
              <div className="space-y-2">
                <Label>Neues Passwort</Label>
                <Input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="Mindestens 8 Zeichen"
                />
              </div>
              <div className="space-y-2">
                <Label>Passwort bestätigen</Label>
                <Input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="Passwort wiederholen"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setPasswordDialogOpen(false)} className="flex-1">
                  Abbrechen
                </Button>
                <Button onClick={changePassword} disabled={changingPassword} className="flex-1">
                  {changingPassword && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
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
