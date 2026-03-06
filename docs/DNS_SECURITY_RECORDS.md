# DNS Security Records für petasync.de

Diese DNS-Records müssen im Cloudflare Dashboard (oder DNS-Provider) manuell angelegt werden.

## 1. DMARC Record

| Feld  | Wert |
|-------|------|
| **Typ**   | TXT |
| **Name**  | `_dmarc` |
| **Inhalt** | `v=DMARC1; p=reject; rua=mailto:master@petasync.de; adkim=s; aspf=s` |
| **TTL**   | Auto |

**Erklärung:**
- `p=reject` – E-Mails die DMARC nicht bestehen werden abgelehnt
- `rua=mailto:...` – Aggregierte Berichte werden an diese Adresse gesendet
- `adkim=s` – Strict DKIM Alignment
- `aspf=s` – Strict SPF Alignment

## 2. SPF Record

| Feld  | Wert |
|-------|------|
| **Typ**   | TXT |
| **Name**  | `@` (Root-Domain) |
| **Inhalt** | `v=spf1 a mx include:_spf.your-server.de ~all` |
| **TTL**   | Auto |

**Erklärung:**
- `a` – Der A-Record der Domain darf E-Mails senden
- `mx` – Die MX-Server dürfen E-Mails senden
- `include:_spf.your-server.de` – Hetzner Mailserver sind autorisiert
- `~all` – Soft-Fail für alle anderen (kann nach Test auf `-all` geändert werden)

> **Wichtig:** Es darf nur EINEN SPF-Record pro Domain geben. Falls bereits ein SPF-Record existiert, diesen bearbeiten statt einen neuen anzulegen.

## Überprüfung

Nach dem Anlegen der Records:

```bash
# DMARC prüfen
dig TXT _dmarc.petasync.de +short

# SPF prüfen
dig TXT petasync.de +short
```

Anschließend den Cloudflare Security Scan erneut ausführen.
