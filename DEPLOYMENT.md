# Deployment Anleitung

Diese Anleitung beschreibt, wie Sie die Petasync-Webseite auf Ihrem eigenen Webserver deployen können.

## Voraussetzungen

- Node.js 18+ und npm
- Webserver (Nginx, Apache, oder Docker)
- SSL-Zertifikat für HTTPS (empfohlen: Let's Encrypt)

## 1. Build erstellen

Erstellen Sie zunächst einen Production Build:

```bash
npm install
npm run build
```

Dies erstellt einen optimierten Build im `dist/` Verzeichnis.

## 2. Deployment-Optionen

### Option A: Nginx (Empfohlen)

1. **Nginx installieren** (falls nicht vorhanden):
```bash
sudo apt update
sudo apt install nginx
```

2. **Build-Dateien kopieren**:
```bash
sudo mkdir -p /var/www/petasync
sudo cp -r dist/* /var/www/petasync/
sudo chown -R www-data:www-data /var/www/petasync
```

3. **Nginx konfigurieren**:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/petasync
sudo ln -s /etc/nginx/sites-available/petasync /etc/nginx/sites-enabled/
```

4. **SSL-Zertifikat einrichten** (mit Let's Encrypt):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

5. **Nginx neu starten**:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Option B: Apache

1. **Apache installieren**:
```bash
sudo apt update
sudo apt install apache2
```

2. **Mod_rewrite aktivieren**:
```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod expires
```

3. **Build-Dateien kopieren**:
```bash
sudo mkdir -p /var/www/petasync
sudo cp -r dist/* /var/www/petasync/
sudo cp .htaccess /var/www/petasync/
sudo chown -R www-data:www-data /var/www/petasync
```

4. **Virtual Host konfigurieren**:
```bash
sudo nano /etc/apache2/sites-available/petasync.conf
```

Fügen Sie folgende Konfiguration ein:
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    ServerAlias www.your-domain.com
    DocumentRoot /var/www/petasync

    <Directory /var/www/petasync>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/petasync-error.log
    CustomLog ${APACHE_LOG_DIR}/petasync-access.log combined
</VirtualHost>
```

5. **Site aktivieren**:
```bash
sudo a2ensite petasync.conf
sudo systemctl restart apache2
```

6. **SSL mit Certbot**:
```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d your-domain.com -d www.your-domain.com
```

### Option C: Docker

1. **Docker und Docker Compose installieren**:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt install docker-compose
```

2. **Container starten**:
```bash
docker-compose up -d
```

3. **Status prüfen**:
```bash
docker-compose ps
docker-compose logs -f
```

4. **SSL-Zertifikate hinzufügen** (optional):
   - Platzieren Sie Ihre SSL-Zertifikate im `ssl/` Verzeichnis
   - Passen Sie die `docker-compose.yml` an, um Port 443 zu verwenden

### Option D: Shared Hosting (cPanel/Plesk)

1. **Build erstellen** (lokal auf Ihrem Computer):
```bash
npm install
npm run build
```

2. **Dateien hochladen**:
   - Laden Sie alle Dateien aus dem `dist/` Verzeichnis in Ihr `public_html/` Verzeichnis hoch
   - Laden Sie die `.htaccess` Datei ebenfalls hoch

3. **Domain konfigurieren**:
   - Stellen Sie sicher, dass Ihre Domain auf das Verzeichnis mit den Dateien zeigt
   - Aktivieren Sie SSL über das cPanel/Plesk Interface

## 3. Umgebungsvariablen

Stellen Sie sicher, dass die `.env` Datei korrekt konfiguriert ist:

```env
VITE_SUPABASE_PROJECT_ID="xfwyckafcayknxwwspfe"
VITE_SUPABASE_PUBLISHABLE_KEY="your-supabase-key"
VITE_SUPABASE_URL="https://xfwyckafcayknxwwspfe.supabase.co"
```

**Wichtig**: Diese Variablen werden während des Builds eingebettet, nicht zur Laufzeit!

## 4. Supabase Backend

Das Backend läuft auf Supabase. Stellen Sie sicher, dass:
- Die Supabase-Konfiguration in `.env` korrekt ist
- Die Datenbank-Tabellen erstellt wurden (siehe `supabase/` Verzeichnis)
- Die RLS (Row Level Security) Policies konfiguriert sind

## 5. Performance-Optimierungen

### Caching
Alle Deployment-Optionen beinhalten bereits:
- Browser-Caching für statische Assets
- Gzip/Brotli Kompression
- Optimierte Cache-Control Headers

### CDN (Optional)
Für bessere Performance weltweit:
- Cloudflare (kostenlos)
- AWS CloudFront
- Vercel Edge Network

## 6. Monitoring und Wartung

### Logs überprüfen

**Nginx:**
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

**Apache:**
```bash
sudo tail -f /var/log/apache2/petasync-access.log
sudo tail -f /var/log/apache2/petasync-error.log
```

**Docker:**
```bash
docker-compose logs -f
```

### Updates deployen

1. Code aktualisieren:
```bash
git pull origin main
```

2. Neu builden:
```bash
npm install
npm run build
```

3. Dateien kopieren:
```bash
# Nginx/Apache
sudo cp -r dist/* /var/www/petasync/

# Docker
docker-compose down
docker-compose build
docker-compose up -d
```

## 7. Sicherheit

- Halten Sie Node.js und npm aktuell
- Aktualisieren Sie regelmäßig Dependencies: `npm audit fix`
- Verwenden Sie immer HTTPS
- Aktivieren Sie Security Headers (bereits in Configs enthalten)
- Sichern Sie regelmäßig Ihre Datenbank

## 8. Troubleshooting

### Routing funktioniert nicht (404 bei Direktaufruf)
- Prüfen Sie, ob `.htaccess` (Apache) oder die Nginx-Konfiguration korrekt ist
- Stellen Sie sicher, dass `mod_rewrite` (Apache) aktiviert ist

### Assets werden nicht geladen
- Prüfen Sie die Browser-Konsole auf CORS-Fehler
- Überprüfen Sie die Dateiberechtigungen: `sudo chown -R www-data:www-data /var/www/petasync`

### Supabase-Verbindung funktioniert nicht
- Überprüfen Sie die `.env` Konfiguration
- Stellen Sie sicher, dass die Supabase-URL erreichbar ist
- Prüfen Sie die Browser-Konsole auf Fehler

## Support

Bei Fragen oder Problemen:
- Überprüfen Sie die Logs
- Konsultieren Sie die Dokumentation Ihres Webservers
- Kontaktieren Sie den Support
