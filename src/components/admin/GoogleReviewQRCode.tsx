import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import QRCode from 'qrcode';
import { Copy, Download, Star } from 'lucide-react';

interface GoogleReviewQRCodeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GoogleReviewQRCode({ open, onOpenChange }: GoogleReviewQRCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [reviewUrl, setReviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchGoogleReviewUrl();
    }
  }, [open]);

  const fetchGoogleReviewUrl = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'google_review_url')
        .single();

      if (error) {
        // Keine URL gespeichert, verwende Standard-Hinweis
        setReviewUrl('');
        return;
      }

      const url = data.value as { url: string };
      if (url && url.url) {
        setReviewUrl(url.url);
        generateQRCode(url.url);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Google Review URL:', error);
    }
  };

  const generateQRCode = async (url: string) => {
    if (!url) return;

    setLoading(true);
    try {
      const qrUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Fehler beim Erstellen des QR-Codes:', error);
      toast.error('QR-Code konnte nicht erstellt werden');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUrl = async () => {
    if (!reviewUrl) {
      toast.error('Bitte geben Sie eine Google Review URL ein');
      return;
    }

    setLoading(true);
    try {
      // Prüfe ob Eintrag existiert
      const { data: existing } = await supabase
        .from('admin_settings')
        .select('id')
        .eq('key', 'google_review_url')
        .single();

      if (existing) {
        // Update
        const { error } = await supabase
          .from('admin_settings')
          .update({ value: { url: reviewUrl } })
          .eq('key', 'google_review_url');

        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('admin_settings')
          .insert({ key: 'google_review_url', value: { url: reviewUrl } });

        if (error) throw error;
      }

      toast.success('Google Review URL gespeichert');
      generateQRCode(reviewUrl);
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      toast.error('URL konnte nicht gespeichert werden');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (reviewUrl) {
      navigator.clipboard.writeText(reviewUrl);
      toast.success('URL kopiert');
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'Google-Review-QR-Code.png';
    link.click();
    toast.success('QR-Code heruntergeladen');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Google Review QR-Code
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Google Review URL</Label>
            <div className="flex gap-2">
              <Input
                value={reviewUrl}
                onChange={(e) => setReviewUrl(e.target.value)}
                placeholder="https://g.page/r/..."
              />
              <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!reviewUrl}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              So findest du deine Google Review URL:
              <br />
              1. Öffne Google Maps
              <br />
              2. Suche dein Unternehmen
              <br />
              3. Klicke auf "Teilen" → "Link kopieren"
              <br />
              4. Füge den Link hier ein
            </p>
          </div>

          <Button onClick={handleSaveUrl} disabled={loading || !reviewUrl} className="w-full">
            {loading ? 'Speichern...' : 'URL speichern & QR-Code generieren'}
          </Button>

          {qrCodeUrl && (
            <Card className="p-4 space-y-4">
              <div className="flex justify-center">
                <img src={qrCodeUrl} alt="Google Review QR Code" className="rounded" />
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Scannen Sie diesen QR-Code, um eine Google-Bewertung abzugeben
              </div>
              <Button variant="outline" onClick={downloadQRCode} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                QR-Code herunterladen
              </Button>
            </Card>
          )}

          {!reviewUrl && (
            <Card className="p-4 bg-yellow-500/10 border-yellow-500/20">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tipp:</strong> Dieser QR-Code wird auf Rechnungen gedruckt, damit Kunden
                einfach eine Google-Bewertung hinterlassen können.
              </p>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
