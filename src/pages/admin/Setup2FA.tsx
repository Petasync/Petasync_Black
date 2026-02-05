import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { auth, settings as settingsApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, Copy, RefreshCw, Key, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Setup2FA() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [disableCode, setDisableCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [step, setStep] = useState<'status' | 'setup' | 'verify' | 'backup' | 'disable'>('status');

  useEffect(() => {
    check2FAStatus();
  }, []);

  const check2FAStatus = async () => {
    const response = await auth.getMe();
    if (!response.success) {
      navigate('/admin/login');
      return;
    }

    if (response.data) {
      setTwoFAEnabled(response.data.totp_enabled || false);
    }
    setLoading(false);
  };

  const generateSecret = async () => {
    setSaving(true);
    const response = await auth.setup2FA();

    if (!response.success) {
      toast.error(response.error || 'Fehler beim Generieren des 2FA-Secrets');
      setSaving(false);
      return;
    }

    if (response.data) {
      setSecret(response.data.secret);
      setQrCode(response.data.qr_code);
    }
    setSaving(false);
    setStep('setup');
  };

  const verifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Bitte geben Sie einen 6-stelligen Code ein');
      return;
    }

    setSaving(true);
    const response = await auth.enable2FA(verificationCode);

    if (!response.success) {
      toast.error(response.error || 'Ungültiger Code. Bitte versuchen Sie es erneut.');
      setSaving(false);
      return;
    }

    if (response.data?.backup_codes) {
      setBackupCodes(response.data.backup_codes);
    }

    setTwoFAEnabled(true);
    setShowBackupCodes(true);
    setStep('backup');
    setSaving(false);
    toast.success('2FA erfolgreich aktiviert');
  };

  const disable2FA = async () => {
    if (!disableCode || disableCode.length !== 6) {
      toast.error('Bitte geben Sie einen 6-stelligen Code ein');
      return;
    }

    setSaving(true);
    const response = await auth.disable2FA(disableCode);

    if (!response.success) {
      toast.error(response.error || 'Fehler beim Deaktivieren der 2FA');
      setSaving(false);
      return;
    }

    setTwoFAEnabled(false);
    setSecret('');
    setQrCode('');
    setBackupCodes([]);
    setDisableCode('');
    setStep('status');
    setSaving(false);
    toast.success('2FA deaktiviert');
  };

  const regenerateBackupCodes = async () => {
    setSaving(true);
    const response = await auth.regenerateBackupCodes();

    if (!response.success) {
      toast.error(response.error || 'Fehler beim Generieren neuer Backup-Codes');
      setSaving(false);
      return;
    }

    if (response.data?.backup_codes) {
      setBackupCodes(response.data.backup_codes);
      setShowBackupCodes(true);
    }
    setSaving(false);
    toast.success('Neue Backup-Codes generiert');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('In Zwischenablage kopiert');
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Zwei-Faktor-Authentifizierung</h1>
          <p className="text-muted-foreground">Schützen Sie Ihr Konto mit einem zusätzlichen Sicherheitsfaktor</p>
        </div>

        {step === 'status' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {twoFAEnabled ? (
                    <ShieldCheck className="h-8 w-8 text-green-500" />
                  ) : (
                    <Shield className="h-8 w-8 text-muted-foreground" />
                  )}
                  <div>
                    <CardTitle>2FA Status</CardTitle>
                    <CardDescription>
                      {twoFAEnabled ? '2FA ist aktiviert' : '2FA ist nicht aktiviert'}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={twoFAEnabled ? 'default' : 'secondary'}>
                  {twoFAEnabled ? 'Aktiv' : 'Inaktiv'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {twoFAEnabled ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Ihr Konto ist durch Zwei-Faktor-Authentifizierung geschützt. Bei jedem Login
                    wird ein Code aus Ihrer Authenticator-App benötigt.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={regenerateBackupCodes} disabled={saving}>
                      {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Neue Backup-Codes
                    </Button>
                    <Button variant="destructive" onClick={() => setStep('disable')}>
                      2FA deaktivieren
                    </Button>
                  </div>
                  {showBackupCodes && backupCodes.length > 0 && (
                    <Card className="bg-muted/50">
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          Bewahren Sie diese Codes sicher auf. Jeder Code kann nur einmal verwendet werden.
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {backupCodes.map((code, i) => (
                            <div key={i} className="font-mono text-sm bg-background px-3 py-2 rounded border">
                              {code}
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3"
                          onClick={() => copyToClipboard(backupCodes.join('\n'))}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Alle kopieren
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    Aktivieren Sie 2FA für zusätzliche Sicherheit. Sie benötigen eine Authenticator-App
                    wie Google Authenticator oder Authy.
                  </p>
                  <Button onClick={generateSecret} disabled={saving}>
                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    <Shield className="h-4 w-4 mr-2" />
                    2FA aktivieren
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {step === 'setup' && (
          <Card>
            <CardHeader>
              <CardTitle>Authenticator einrichten</CardTitle>
              <CardDescription>
                Scannen Sie den QR-Code mit Ihrer Authenticator-App
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                {qrCode && (
                  <img src={qrCode} alt="QR Code" className="rounded-lg border p-2 bg-white" />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Oder geben Sie diesen Code manuell ein:
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted px-3 py-2 rounded font-mono text-sm break-all">
                    {secret}
                  </code>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(secret)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button onClick={() => setStep('verify')} className="w-full">
                Weiter
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'verify' && (
          <Card>
            <CardHeader>
              <CardTitle>Code verifizieren</CardTitle>
              <CardDescription>
                Geben Sie den 6-stelligen Code aus Ihrer Authenticator-App ein
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-2xl tracking-widest font-mono"
                maxLength={6}
              />
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('setup')} className="flex-1" disabled={saving}>
                  Zurück
                </Button>
                <Button onClick={verifyAndEnable} className="flex-1" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Aktiviere...
                    </>
                  ) : (
                    'Verifizieren & Aktivieren'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'backup' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-500 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                2FA erfolgreich aktiviert
              </CardTitle>
              <CardDescription>
                Speichern Sie Ihre Backup-Codes an einem sicheren Ort
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Diese Codes können verwendet werden, falls Sie keinen Zugriff auf Ihre Authenticator-App haben.
                Jeder Code funktioniert nur einmal.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {backupCodes.map((code, i) => (
                  <div key={i} className="font-mono text-sm bg-muted px-3 py-2 rounded border">
                    {code}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => copyToClipboard(backupCodes.join('\n'))}>
                  <Copy className="h-4 w-4 mr-2" />
                  Kopieren
                </Button>
                <Button onClick={() => { setStep('status'); setShowBackupCodes(false); }}>
                  Fertig
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'disable' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">2FA deaktivieren</CardTitle>
              <CardDescription>
                Geben Sie zur Bestätigung Ihren aktuellen 2FA-Code ein
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="000000"
                value={disableCode}
                onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-2xl tracking-widest font-mono"
                maxLength={6}
              />
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => { setStep('status'); setDisableCode(''); }} className="flex-1" disabled={saving}>
                  Abbrechen
                </Button>
                <Button variant="destructive" onClick={disable2FA} className="flex-1" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Deaktiviere...
                    </>
                  ) : (
                    '2FA deaktivieren'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
