#!/bin/bash
# Manuelles Deployment-Script für Hetzner Webhosting

echo "======================================"
echo "  Petasync - Manuelles Deployment"
echo "======================================"
echo ""

# Farben
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# FTP Credentials (aus .env oder hier eintragen)
FTP_HOST="www361.your-server.de"
FTP_USER="petasy"
FTP_PASS="BzquQPL3kFTgj9Nn"

# 1. Build erstellen
echo -e "${YELLOW}[1/3]${NC} Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build successful!${NC}"
echo ""

# 2. Check if lftp is installed
if ! command -v lftp &> /dev/null; then
    echo -e "${YELLOW}⚠ lftp not found. Installing...${NC}"

    # Detect OS and install
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y lftp
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install lftp
    else
        echo -e "${RED}✗ Please install lftp manually${NC}"
        exit 1
    fi
fi

# 3. Upload to Hetzner
echo -e "${YELLOW}[2/3]${NC} Uploading to Hetzner..."

lftp -u "$FTP_USER,$FTP_PASS" "ftp://$FTP_HOST" <<EOF
set ftp:ssl-allow no
set net:timeout 30
set net:max-retries 3
set net:reconnect-interval-base 5

# Upload dist folder
mirror -R --verbose --delete-first dist/ ./

# Upload api folder
mirror -R --verbose api/ ./api/

bye
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}======================================"
    echo -e "  ✓ Deployment successful!"
    echo -e "======================================${NC}"
    echo ""
    echo "Your website is live at: https://petasync.de"
else
    echo -e "${RED}✗ Upload failed!${NC}"
    exit 1
fi
