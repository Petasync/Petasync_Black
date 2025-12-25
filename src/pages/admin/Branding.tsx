import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Image as ImageIcon, Palette, FileText, Eye, Save, Trash2 } from 'lucide-react';

interface BrandingSettings {
  logo_url?: string;
  logo_icon_url?: string;
  logo_dark_url?: string;
  logo_light_url?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  font_family?: string;
}

export default function AdminBranding() {
  const [settings, setSettings] = useState<BrandingSettings>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBrandingSettings();
  }, []);

  const fetchBrandingSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'branding')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data && data.value) {
        setSettings(data.value as BrandingSettings);
      }
    } catch (error) {
      console.error('Error fetching branding settings:', error);
    }
  };

  const saveBrandingSettings = async () => {
    setLoading(true);
    try {
      const { data: existing } = await supabase
        .from('admin_settings')
        .select('id')
        .eq('key', 'branding')
        .single();

      if (existing) {
        const { error } = await supabase
          .from('admin_settings')
          .update({ value: settings })
          .eq('key', 'branding');

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('admin_settings')
          .insert({ key: 'branding', value: settings });

        if (error) throw error;
      }

      toast.success('Branding-Einstellungen gespeichert');
    } catch (error) {
      console.error('Error saving branding:', error);
      toast.error('Fehler beim Speichern');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, type: keyof BrandingSettings) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toast.error('Ungültiger Dateityp. Bitte PNG, JPG oder SVG verwenden.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Datei zu groß. Maximal 5 MB erlaubt.');
      return;
    }

    setUploading(true);

    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      const filePath = `branding/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

      // Update settings
      setSettings({ ...settings, [type]: urlData.publicUrl });
      toast.success('Logo hochgeladen');
    } catch (error: any) {
      console.error('Error uploading file:', error);

      // Check if storage bucket exists, if not provide helpful message
      if (error.message?.includes('not found')) {
        toast.error('Storage-Bucket nicht gefunden. Bitte erstelle einen "public" Bucket in Supabase Storage.');
      } else {
        toast.error('Fehler beim Hochladen: ' + error.message);
      }
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (type: keyof BrandingSettings) => {
    setSettings({ ...settings, [type]: undefined });
    toast.success('Logo entfernt');
  };

  const LogoUploadCard = ({
    title,
    description,
    type,
    recommendedSize,
  }: {
    title: string;
    description: string;
    type: keyof BrandingSettings;
    recommendedSize: string;
  }) => {
    const imageUrl = settings[type];

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            {imageUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="max-h-32 max-w-full object-contain"
                  />
                </div>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(imageUrl, '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ansehen
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeImage(type)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Entfernen
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  {recommendedSize}
                </p>
                <Label htmlFor={`upload-${type}`} className="cursor-pointer">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    <Upload className="h-4 w-4" />
                    Logo hochladen
                  </div>
                  <Input
                    id={`upload-${type}`}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, type);
                    }}
                    disabled={uploading}
                  />
                </Label>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Branding</h1>
            <p className="text-muted-foreground">
              Passe das Erscheinungsbild deiner Marke an
            </p>
          </div>
          <Button onClick={saveBrandingSettings} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Speichern...' : 'Speichern'}
          </Button>
        </div>

        <Tabs defaultValue="logos" className="space-y-6">
          <TabsList>
            <TabsTrigger value="logos">
              <ImageIcon className="h-4 w-4 mr-2" />
              Logos
            </TabsTrigger>
            <TabsTrigger value="colors">
              <Palette className="h-4 w-4 mr-2" />
              Farben
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-2" />
              Vorschau
            </TabsTrigger>
          </TabsList>

          {/* Logos Tab */}
          <TabsContent value="logos" className="space-y-6">
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="pt-6">
                <div className="flex gap-4 items-start">
                  <FileText className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="font-medium">📐 Empfohlene Logo-Formate:</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• <strong>SVG</strong> - Vektorformat, beste Qualität (empfohlen)</li>
                      <li>• <strong>PNG</strong> - Mit transparentem Hintergrund</li>
                      <li>• <strong>JPG</strong> - Falls PNG zu groß ist</li>
                    </ul>
                    <p className="font-medium mt-4">📏 Größenempfehlungen:</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• <strong>Haupt-Logo:</strong> 500-1000px breit</li>
                      <li>• <strong>Icon:</strong> 250-500px (quadratisch)</li>
                      <li>• <strong>Maximale Dateigröße:</strong> 5 MB</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <LogoUploadCard
                title="Haupt-Logo"
                description="Wird auf Rechnungen, Angeboten und im Website-Header verwendet"
                type="logo_url"
                recommendedSize="Empfohlen: 500-1000px breit, PNG/SVG"
              />

              <LogoUploadCard
                title="Logo Icon"
                description="Quadratisches Logo für Favicons und App-Icons"
                type="logo_icon_url"
                recommendedSize="Empfohlen: 250x250px oder 500x500px, PNG/SVG"
              />

              <LogoUploadCard
                title="Logo (Dunkel)"
                description="Version für helle Hintergründe"
                type="logo_dark_url"
                recommendedSize="Empfohlen: 500-1000px breit, PNG/SVG"
              />

              <LogoUploadCard
                title="Logo (Hell)"
                description="Weiße Version für dunkle Hintergründe"
                type="logo_light_url"
                recommendedSize="Empfohlen: 500-1000px breit, PNG/SVG"
              />
            </div>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Primärfarbe</CardTitle>
                  <CardDescription>Hauptfarbe deiner Marke</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <Input
                      type="color"
                      value={settings.primary_color || '#0066cc'}
                      onChange={(e) =>
                        setSettings({ ...settings, primary_color: e.target.value })
                      }
                      className="w-20 h-20 cursor-pointer"
                    />
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={settings.primary_color || '#0066cc'}
                        onChange={(e) =>
                          setSettings({ ...settings, primary_color: e.target.value })
                        }
                        placeholder="#0066cc"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Verwendet für: Buttons, Links, Überschriften
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Sekundärfarbe</CardTitle>
                  <CardDescription>Ergänzende Farbe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <Input
                      type="color"
                      value={settings.secondary_color || '#666666'}
                      onChange={(e) =>
                        setSettings({ ...settings, secondary_color: e.target.value })
                      }
                      className="w-20 h-20 cursor-pointer"
                    />
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={settings.secondary_color || '#666666'}
                        onChange={(e) =>
                          setSettings({ ...settings, secondary_color: e.target.value })
                        }
                        placeholder="#666666"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Verwendet für: Text, Rahmen, Hintergründe
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Akzentfarbe</CardTitle>
                  <CardDescription>Für Highlights und Warnungen</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <Input
                      type="color"
                      value={settings.accent_color || '#ff6600'}
                      onChange={(e) =>
                        setSettings({ ...settings, accent_color: e.target.value })
                      }
                      className="w-20 h-20 cursor-pointer"
                    />
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={settings.accent_color || '#ff6600'}
                        onChange={(e) =>
                          setSettings({ ...settings, accent_color: e.target.value })
                        }
                        placeholder="#ff6600"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Verwendet für: Call-to-Actions, Badges
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vorschau: PDF Rechnung</CardTitle>
                <CardDescription>
                  So erscheint dein Logo auf Rechnungen und Angeboten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-8 bg-white text-black">
                  {/* PDF Header Simulation */}
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      {settings.logo_url ? (
                        <img
                          src={settings.logo_url}
                          alt="Logo"
                          className="max-h-16 max-w-[200px]"
                        />
                      ) : (
                        <div className="text-2xl font-bold" style={{ color: settings.primary_color || '#0066cc' }}>
                          Petasync
                        </div>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>Musterstraße 123</p>
                      <p>12345 Musterstadt</p>
                      <p>Tel: +49 123 456789</p>
                      <p>info@petasync.de</p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h2 className="text-2xl font-bold mb-4">Rechnung</h2>
                    <div className="text-sm text-gray-600">
                      <p>Rechnungsnummer: RE-2025-0001</p>
                      <p>Rechnungsdatum: {new Date().toLocaleDateString('de-DE')}</p>
                    </div>
                  </div>

                  <div className="mt-8 text-sm text-gray-500">
                    <p>Dies ist eine Vorschau, wie dein Logo auf PDFs erscheint.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Farbpalette Vorschau</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div
                      className="w-full h-24 rounded-lg mb-2"
                      style={{ backgroundColor: settings.primary_color || '#0066cc' }}
                    />
                    <p className="text-sm font-medium">Primär</p>
                    <p className="text-xs text-muted-foreground">
                      {settings.primary_color || '#0066cc'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-full h-24 rounded-lg mb-2"
                      style={{ backgroundColor: settings.secondary_color || '#666666' }}
                    />
                    <p className="text-sm font-medium">Sekundär</p>
                    <p className="text-xs text-muted-foreground">
                      {settings.secondary_color || '#666666'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-full h-24 rounded-lg mb-2"
                      style={{ backgroundColor: settings.accent_color || '#ff6600' }}
                    />
                    <p className="text-sm font-medium">Akzent</p>
                    <p className="text-xs text-muted-foreground">
                      {settings.accent_color || '#ff6600'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
