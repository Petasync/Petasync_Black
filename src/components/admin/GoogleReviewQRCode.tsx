import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { settings } from '@/lib/api-client';

interface GoogleReviewQRCodeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GoogleReviewQRCode({ open, onOpenChange }: GoogleReviewQRCodeProps) {
  const [reviewUrl, setReviewUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      fetchReviewUrl();
    }
  }, [open]);

  const fetchReviewUrl = async () => {
    setLoading(true);
    const response = await settings.get<Record<string, unknown>>('branding');

    if (response.success && response.data && typeof response.data === 'object' && 'google_review_url' in response.data) {
      setReviewUrl(response.data.google_review_url as string || '');
    }
    setLoading(false);
  };

  const downloadQRCode = () => {
    const svg = document.getElementById('google-review-qr');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 512;
    canvas.height = 512;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'google-review-qr.png';
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Google Bewertungs-QR Code</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">Laden...</div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!reviewUrl) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Google Bewertungs-QR Code</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Keine Google Bewertungs-URL hinterlegt
            </p>
            <p className="text-sm text-muted-foreground">
              Bitte gehen Sie zu Einstellungen → Branding und fügen Sie Ihre Google Bewertungs-URL hinzu.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Google Bewertungs-QR Code</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center p-6 bg-white rounded-lg">
            <QRCodeSVG
              id="google-review-qr"
              value={reviewUrl}
              size={256}
              level="H"
              includeMargin
            />
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Kunden können diesen QR-Code scannen, um eine Google-Bewertung abzugeben
            </p>
            <p className="text-xs text-muted-foreground break-all">
              {reviewUrl}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(reviewUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Link öffnen
            </Button>
            <Button
              className="flex-1"
              onClick={downloadQRCode}
            >
              <Download className="h-4 w-4 mr-2" />
              QR-Code speichern
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
