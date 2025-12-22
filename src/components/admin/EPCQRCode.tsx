import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Download, Info } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';

interface EPCQRCodeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceNumber: string;
  amount: number;
}

interface CompanyBankInfo {
  name: string;
  iban: string;
  bic: string;
}

const defaultBankInfo: CompanyBankInfo = {
  name: 'ByteSync IT-Service',
  iban: 'DE12345678901234567890',
  bic: 'ABCDEFGH',
};

export function EPCQRCode({ open, onOpenChange, invoiceNumber, amount }: EPCQRCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [bankInfo, setBankInfo] = useState<CompanyBankInfo>(defaultBankInfo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && amount > 0) {
      generateQRCode();
    }
  }, [open, amount, invoiceNumber, bankInfo]);

  const generateEPCData = (): string => {
    // EPC QR Code format (GiroCode) according to European Payments Council standard
    // Format version: 002
    // Character set: 1 = UTF-8
    // Identification: SCT (SEPA Credit Transfer)
    const lines = [
      'BCD',                                    // Service Tag (fixed)
      '002',                                    // Version
      '1',                                      // Character set (1 = UTF-8)
      'SCT',                                    // Identification code
      bankInfo.bic,                             // BIC (8 or 11 characters)
      bankInfo.name.substring(0, 70),           // Beneficiary name (max 70 chars)
      bankInfo.iban.replace(/\s/g, ''),         // IBAN (no spaces)
      `EUR${amount.toFixed(2)}`,                // Amount in EUR
      '',                                       // Purpose (optional, max 4 chars)
      invoiceNumber.substring(0, 35),           // Remittance reference (max 35 chars)
      '',                                       // Remittance text (optional)
      '',                                       // Beneficiary to originator info (optional)
    ];

    return lines.join('\n');
  };

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const epcData = generateEPCData();
      const url = await QRCode.toDataURL(epcData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Fehler beim Generieren des QR-Codes');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = `EPC_QR_${invoiceNumber}.png`;
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR-Code heruntergeladen');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateEPCData());
      toast.success('EPC-Daten kopiert');
    } catch {
      toast.error('Kopieren fehlgeschlagen');
    }
  };

  const formatIBAN = (iban: string): string => {
    return iban.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            EPC QR-Code (GiroCode)
          </DialogTitle>
          <DialogDescription>
            Scannen Sie diesen QR-Code mit Ihrer Banking-App für eine schnelle Überweisung
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bank Info Form */}
          <Card>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label>Empfängername</Label>
                <Input
                  value={bankInfo.name}
                  onChange={(e) => setBankInfo({ ...bankInfo, name: e.target.value })}
                  maxLength={70}
                />
              </div>
              <div className="space-y-2">
                <Label>IBAN</Label>
                <Input
                  value={bankInfo.iban}
                  onChange={(e) => setBankInfo({ ...bankInfo, iban: e.target.value.replace(/\s/g, '') })}
                  placeholder="DE12 3456 7890 1234 5678 90"
                />
              </div>
              <div className="space-y-2">
                <Label>BIC</Label>
                <Input
                  value={bankInfo.bic}
                  onChange={(e) => setBankInfo({ ...bankInfo, bic: e.target.value.toUpperCase() })}
                  maxLength={11}
                  placeholder="ABCDEFGH"
                />
              </div>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <div className="flex flex-col items-center space-y-4">
            {loading ? (
              <div className="w-[300px] h-[300px] bg-muted animate-pulse rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Generiere...</span>
              </div>
            ) : qrCodeUrl ? (
              <div className="bg-white p-4 rounded-lg">
                <img src={qrCodeUrl} alt="EPC QR Code" className="w-[300px] h-[300px]" />
              </div>
            ) : (
              <div className="w-[300px] h-[300px] bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Kein QR-Code verfügbar</span>
              </div>
            )}

            {/* Payment Details */}
            <Card className="w-full">
              <CardContent className="pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Betrag:</span>
                  <span className="font-semibold">{amount.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verwendungszweck:</span>
                  <span className="font-mono">{invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IBAN:</span>
                  <span className="font-mono text-xs">{formatIBAN(bankInfo.iban)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm">
            <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-muted-foreground">
              Der EPC QR-Code (GiroCode) ist ein europäischer Standard für SEPA-Überweisungen. 
              Die meisten deutschen Banking-Apps unterstützen diesen Standard.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={copyToClipboard} className="flex-1">
              <Copy className="h-4 w-4 mr-2" />
              Kopieren
            </Button>
            <Button onClick={handleDownload} disabled={!qrCodeUrl} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
