#!/bin/bash
# Script zum Anzeigen der GitHub Secrets aus .env

echo "=================================================="
echo "  GitHub Secrets Setup für Hetzner Deployment"
echo "=================================================="
echo ""
echo "Kopiere diese Werte in GitHub:"
echo "Settings → Secrets and variables → Actions → New repository secret"
echo ""
echo "=================================================="
echo "UMGEBUNGSVARIABLEN (.env)"
echo "=================================================="

if [ ! -f .env ]; then
    echo "❌ FEHLER: .env Datei nicht gefunden!"
    echo "Erstelle eine .env Datei basierend auf .env.example"
    exit 1
fi

# Lese .env und zeige relevante Secrets
while IFS= read -r line; do
    # Skip Kommentare und leere Zeilen
    if [[ "$line" =~ ^#.*$ ]] || [[ -z "$line" ]]; then
        continue
    fi

    # Parse Key=Value
    if [[ "$line" =~ ^([^=]+)=(.*)$ ]]; then
        key="${BASH_REMATCH[1]}"
        value="${BASH_REMATCH[2]}"
        # Entferne Anführungszeichen
        value="${value//\"/}"

        echo "Name:  $key"
        echo "Value: $value"
        echo ""
    fi
done < .env

echo "=================================================="
echo "FTP/SFTP ZUGANGSDATEN (Hetzner)"
echo "=================================================="
echo ""
echo "⚠️  Diese musst du manuell aus Hetzner konsoleH holen:"
echo ""
echo "Name:  FTP_HOST"
echo "Value: petasync.de (oder ftp.petasync.de)"
echo ""
echo "Name:  FTP_USERNAME"
echo "Value: [Dein Hetzner FTP-Username]"
echo ""
echo "Name:  FTP_PASSWORD"
echo "Value: [Dein Hetzner FTP-Passwort]"
echo ""
echo "=================================================="
echo ""
echo "📋 Nächste Schritte:"
echo "1. Gehe zu: https://github.com/Petasync/Petasync_Black/settings/secrets/actions"
echo "2. Klicke auf 'New repository secret'"
echo "3. Trage jeden Secret einzeln ein (Name + Value)"
echo "4. Speichere alle Secrets"
echo "5. Push deine Änderungen → Automatisches Deployment startet!"
echo ""
