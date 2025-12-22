import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Shield, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Verify2FA() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { verify2FA, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (code.length !== 6) {
      setError('Der Code muss 6 Zeichen lang sein');
      return;
    }

    setIsLoading(true);
    const result = await verify2FA(code);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Erfolgreich verifiziert",
        description: "Willkommen im Admin-Bereich!",
      });
      navigate(from);
    } else {
      setError(result.error || 'Verifizierung fehlgeschlagen');
    }
  };

  const handleCancel = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="relative w-full max-w-md">
        <button 
          onClick={handleCancel}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Anmeldung abbrechen
        </button>

        <Card className="border-white/10 bg-card/50 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Zwei-Faktor-Authentifizierung</CardTitle>
            <CardDescription>
              Geben Sie den Code aus Ihrer Authenticator-App ein
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verifizierungscode</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={`text-center text-2xl tracking-widest ${error ? 'border-destructive' : ''}`}
                  autoComplete="one-time-code"
                  disabled={isLoading}
                  maxLength={6}
                />
                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Sie können auch einen Backup-Code verwenden
              </p>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isLoading || code.length < 6}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifizieren...
                  </>
                ) : (
                  'Verifizieren'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
