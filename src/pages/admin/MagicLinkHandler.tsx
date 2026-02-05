import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, XCircle, KeyRound } from 'lucide-react';

export default function MagicLinkHandler() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'validating' | 'form' | 'success' | 'error'>('validating');
  const [message, setMessage] = useState('Token wird überprüft...');
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Kein Token gefunden. Der Link ist ungültig oder abgelaufen.');
      return;
    }

    // Token exists, show password reset form
    setStatus('form');
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword || newPassword.length < 8) {
      setError('Das Passwort muss mindestens 8 Zeichen lang sein.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await auth.resetPassword(token!, newPassword);

      if (!response.success) {
        setError(response.error || 'Fehler beim Zurücksetzen des Passworts.');
        setIsLoading(false);
        return;
      }

      setStatus('success');
      setMessage('Passwort erfolgreich geändert! Sie werden zum Login weitergeleitet...');

      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="relative w-full max-w-md">
        {status === 'validating' && (
          <Card className="border-white/10 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
              <CardTitle>Überprüfung</CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
          </Card>
        )}

        {status === 'form' && (
          <Card className="border-white/10 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <KeyRound className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Neues Passwort setzen</CardTitle>
              <CardDescription>
                Geben Sie Ihr neues Passwort ein.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Neues Passwort</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mindestens 8 Zeichen"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Passwort wiederholen"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Wird gespeichert...
                    </>
                  ) : (
                    'Passwort ändern'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {status === 'success' && (
          <Card className="border-white/10 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Passwort geändert</CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
          </Card>
        )}

        {status === 'error' && (
          <Card className="border-white/10 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="text-2xl">Fehler</CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate('/admin/login')} className="w-full">
                Zur Login-Seite
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
