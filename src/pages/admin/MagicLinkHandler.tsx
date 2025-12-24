import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function MagicLinkHandler() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Verarbeite Magic Link...');

  useEffect(() => {
    const handleMagicLink = async () => {
      try {
        // Parse URL hash parameters
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (!accessToken || !refreshToken) {
          setStatus('error');
          setMessage('Ungültiger Magic Link. Token fehlen.');
          return;
        }

        // Set the session using the tokens
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          setStatus('error');
          setMessage(`Fehler beim Einloggen: ${error.message}`);
          return;
        }

        if (data.session) {
          setStatus('success');
          setMessage('Erfolgreich eingeloggt! Weiterleitung...');

          // Redirect to admin dashboard after 1 second
          setTimeout(() => {
            navigate('/admin');
          }, 1000);
        } else {
          setStatus('error');
          setMessage('Keine Session erstellt. Bitte versuche es erneut.');
        }
      } catch (err) {
        setStatus('error');
        setMessage(`Unerwarteter Fehler: ${err instanceof Error ? err.message : 'Unbekannter Fehler'}`);
      }
    };

    handleMagicLink();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Magic Link Authentifizierung</CardTitle>
          <CardDescription>
            {status === 'processing' && 'Dein Login wird verarbeitet...'}
            {status === 'success' && 'Login erfolgreich!'}
            {status === 'error' && 'Es ist ein Fehler aufgetreten'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            {status === 'processing' && (
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            )}

            {status === 'success' && (
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            )}

            <p className="text-center text-sm text-gray-600">{message}</p>

            {status === 'error' && (
              <button
                onClick={() => navigate('/admin/login')}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Zur Login-Seite
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
