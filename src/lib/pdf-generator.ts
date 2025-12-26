import type { Tables } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';

type Quote = Tables<'quotes'>;
type Invoice = Tables<'invoices'>;
type Customer = Tables<'customers'>;
type QuoteItem = Tables<'quote_items'>;
type InvoiceItem = Tables<'invoice_items'>;

interface CompanyInfo {
  name: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  taxId?: string;
  bankName?: string;
  iban?: string;
  bic?: string;
  logoUrl?: string;
  googleReviewUrl?: string;
}

const defaultCompanyInfo: CompanyInfo = {
  name: 'ByteSync IT-Service',
  street: 'Musterstraße 123',
  zip: '12345',
  city: 'Musterstadt',
  phone: '+49 123 456789',
  email: 'info@bytesync.de',
  website: 'www.bytesync.de',
  taxId: 'DE123456789',
  bankName: 'Musterbank',
  iban: 'DE12 3456 7890 1234 5678 90',
  bic: 'ABCDEFGH',
};

// Load company info from admin settings
export const loadCompanyInfo = async (): Promise<CompanyInfo> => {
  // Load both company and branding settings
  const { data, error } = await supabase
    .from('admin_settings')
    .select('key, value')
    .in('key', ['company', 'branding']);

  if (error || !data) {
    console.warn('Could not load settings, using defaults');
    return defaultCompanyInfo;
  }

  const companyData = data.find(s => s.key === 'company')?.value as any;
  const brandingData = data.find(s => s.key === 'branding')?.value as any;

  return {
    name: companyData?.name || defaultCompanyInfo.name,
    street: companyData?.street || defaultCompanyInfo.street,
    zip: companyData?.zip || defaultCompanyInfo.zip,
    city: companyData?.city || defaultCompanyInfo.city,
    phone: companyData?.phone || defaultCompanyInfo.phone,
    email: companyData?.email || defaultCompanyInfo.email,
    website: companyData?.website || defaultCompanyInfo.website,
    taxId: companyData?.tax_number || defaultCompanyInfo.taxId,
    bankName: companyData?.bank_name || defaultCompanyInfo.bankName,
    iban: companyData?.iban || defaultCompanyInfo.iban,
    bic: companyData?.bic || defaultCompanyInfo.bic,
    logoUrl: brandingData?.logo_url,
    googleReviewUrl: brandingData?.google_review_url,
  };
};

const formatCurrency = (amount: number | null): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount || 0);
};

const formatDate = (date: string | null): string => {
  if (!date) return '';
  return new Intl.DateTimeFormat('de-DE').format(new Date(date));
};

export const generateQuotePDF = async (
  quote: Quote,
  customer: Customer | null,
  items: QuoteItem[],
  companyInfo: CompanyInfo = defaultCompanyInfo
): Promise<Blob> => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 10pt; line-height: 1.4; color: #333; }
        .container { max-width: 210mm; margin: 0 auto; padding: 20mm; }
        .header { display: flex; justify-content: space-between; margin-bottom: 30px; align-items: flex-start; }
        .logo { font-size: 24pt; font-weight: bold; color: #0066cc; }
        .logo img { max-height: 80px; max-width: 250px; object-fit: contain; }
        .company-info { text-align: right; font-size: 9pt; color: #666; }
        .addresses { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .sender-line { font-size: 7pt; color: #999; margin-bottom: 5px; }
        .recipient { min-height: 100px; }
        .document-info { text-align: right; }
        .document-title { font-size: 18pt; font-weight: bold; margin-bottom: 20px; }
        .info-table { width: 100%; margin-bottom: 20px; }
        .info-table td { padding: 3px 0; }
        .info-table .label { color: #666; width: 120px; }
        table.items { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        table.items th { background: #f5f5f5; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; font-weight: 600; }
        table.items td { padding: 10px; border-bottom: 1px solid #eee; }
        table.items .number { text-align: right; }
        .totals { margin-left: auto; width: 250px; }
        .totals table { width: 100%; }
        .totals td { padding: 5px 0; }
        .totals .total { font-weight: bold; font-size: 12pt; border-top: 2px solid #333; }
        .notes { margin-top: 30px; padding: 15px; background: #f9f9f9; border-radius: 5px; }
        .notes h4 { margin-bottom: 10px; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 8pt; color: #666; }
        .footer-columns { display: flex; justify-content: space-between; }
        .validity { margin-top: 20px; padding: 10px; background: #fff3cd; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">${companyInfo.logoUrl ? `<img src="${companyInfo.logoUrl}" alt="Logo" />` : companyInfo.name}</div>
          <div class="company-info">
            ${companyInfo.street}<br>
            ${companyInfo.zip} ${companyInfo.city}<br>
            Tel: ${companyInfo.phone}<br>
            ${companyInfo.email}
          </div>
        </div>

        <div class="addresses">
          <div class="recipient">
            <div class="sender-line">${companyInfo.name} · ${companyInfo.street} · ${companyInfo.zip} ${companyInfo.city}</div>
            ${customer ? `
              ${customer.company_name ? `<strong>${customer.company_name}</strong><br>` : ''}
              ${customer.first_name || ''} ${customer.last_name}<br>
              ${customer.street || ''}<br>
              ${customer.zip || ''} ${customer.city || ''}
            ` : 'Kunde nicht angegeben'}
          </div>
          <div class="document-info">
            <table class="info-table">
              <tr><td class="label">Angebot Nr.:</td><td><strong>${quote.quote_number}</strong></td></tr>
              <tr><td class="label">Datum:</td><td>${formatDate(quote.quote_date)}</td></tr>
              ${quote.valid_until ? `<tr><td class="label">Gültig bis:</td><td>${formatDate(quote.valid_until)}</td></tr>` : ''}
            </table>
          </div>
        </div>

        <div class="document-title">Angebot</div>

        <table class="items">
          <thead>
            <tr>
              <th style="width: 40px">Pos.</th>
              <th>Beschreibung</th>
              <th class="number" style="width: 60px">Menge</th>
              <th class="number" style="width: 100px">Einzelpreis</th>
              <th class="number" style="width: 100px">Gesamt</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item, i) => `
              <tr>
                <td>${item.position || i + 1}</td>
                <td>${item.description}</td>
                <td class="number">${item.quantity} ${item.unit || 'Stk.'}</td>
                <td class="number">${formatCurrency(item.unit_price)}</td>
                <td class="number">${formatCurrency(item.total)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <table>
            <tr><td>Zwischensumme:</td><td class="number">${formatCurrency(quote.subtotal)}</td></tr>
            ${quote.discount_percent ? `<tr><td>Rabatt (${quote.discount_percent}%):</td><td class="number">-${formatCurrency(quote.discount_amount)}</td></tr>` : ''}
            <tr class="total"><td>Gesamtbetrag:</td><td class="number">${formatCurrency(quote.total)}</td></tr>
          </table>
        </div>

        ${quote.valid_until ? `
          <div class="validity">
            <strong>Hinweis:</strong> Dieses Angebot ist gültig bis zum ${formatDate(quote.valid_until)}.
          </div>
        ` : ''}

        ${quote.notes ? `
          <div class="notes">
            <h4>Anmerkungen</h4>
            <p>${quote.notes}</p>
          </div>
        ` : ''}

        ${quote.terms ? `
          <div class="notes">
            <h4>Zahlungsbedingungen</h4>
            <p>${quote.terms}</p>
          </div>
        ` : ''}

        <div class="footer">
          <div class="footer-columns">
            <div>
              ${companyInfo.name}<br>
              ${companyInfo.street}<br>
              ${companyInfo.zip} ${companyInfo.city}
            </div>
            <div>
              Tel: ${companyInfo.phone}<br>
              E-Mail: ${companyInfo.email}<br>
              Web: ${companyInfo.website}
            </div>
            <div>
              ${companyInfo.taxId ? `USt-IdNr.: ${companyInfo.taxId}<br>` : ''}
              ${companyInfo.bankName ? `Bank: ${companyInfo.bankName}<br>` : ''}
              ${companyInfo.iban ? `IBAN: ${companyInfo.iban}` : ''}
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return new Blob([htmlContent], { type: 'text/html' });
};

export const generateInvoicePDF = async (
  invoice: Invoice,
  customer: Customer | null,
  items: InvoiceItem[],
  companyInfo: CompanyInfo = defaultCompanyInfo
): Promise<Blob> => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 10pt; line-height: 1.4; color: #333; }
        .container { max-width: 210mm; margin: 0 auto; padding: 20mm; }
        .header { display: flex; justify-content: space-between; margin-bottom: 30px; align-items: flex-start; }
        .logo { font-size: 24pt; font-weight: bold; color: #0066cc; }
        .logo img { max-height: 80px; max-width: 250px; object-fit: contain; }
        .company-info { text-align: right; font-size: 9pt; color: #666; }
        .addresses { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .sender-line { font-size: 7pt; color: #999; margin-bottom: 5px; }
        .recipient { min-height: 100px; }
        .document-info { text-align: right; }
        .document-title { font-size: 18pt; font-weight: bold; margin-bottom: 20px; }
        .info-table { width: 100%; margin-bottom: 20px; }
        .info-table td { padding: 3px 0; }
        .info-table .label { color: #666; width: 120px; }
        table.items { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        table.items th { background: #f5f5f5; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; font-weight: 600; }
        table.items td { padding: 10px; border-bottom: 1px solid #eee; }
        table.items .number { text-align: right; }
        .totals { margin-left: auto; width: 250px; }
        .totals table { width: 100%; }
        .totals td { padding: 5px 0; }
        .totals .total { font-weight: bold; font-size: 12pt; border-top: 2px solid #333; }
        .payment-info { margin-top: 30px; padding: 15px; background: #e8f4fd; border-radius: 5px; }
        .payment-info h4 { margin-bottom: 10px; color: #0066cc; }
        .notes { margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; }
        .notes h4 { margin-bottom: 10px; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 8pt; color: #666; }
        .footer-columns { display: flex; justify-content: space-between; }
        .qr-placeholder { width: 100px; height: 100px; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center; font-size: 8pt; color: #999; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">${companyInfo.logoUrl ? `<img src="${companyInfo.logoUrl}" alt="Logo" />` : companyInfo.name}</div>
          <div class="company-info">
            ${companyInfo.street}<br>
            ${companyInfo.zip} ${companyInfo.city}<br>
            Tel: ${companyInfo.phone}<br>
            ${companyInfo.email}
          </div>
        </div>

        <div class="addresses">
          <div class="recipient">
            <div class="sender-line">${companyInfo.name} · ${companyInfo.street} · ${companyInfo.zip} ${companyInfo.city}</div>
            ${customer ? `
              ${customer.company_name ? `<strong>${customer.company_name}</strong><br>` : ''}
              ${customer.first_name || ''} ${customer.last_name}<br>
              ${customer.street || ''}<br>
              ${customer.zip || ''} ${customer.city || ''}
            ` : 'Kunde nicht angegeben'}
          </div>
          <div class="document-info">
            <table class="info-table">
              <tr><td class="label">Rechnung Nr.:</td><td><strong>${invoice.invoice_number}</strong></td></tr>
              <tr><td class="label">Rechnungsdatum:</td><td>${formatDate(invoice.invoice_date)}</td></tr>
              ${invoice.delivery_date ? `<tr><td class="label">Lieferdatum:</td><td>${formatDate(invoice.delivery_date)}</td></tr>` : ''}
              ${invoice.due_date ? `<tr><td class="label">Fällig am:</td><td>${formatDate(invoice.due_date)}</td></tr>` : ''}
            </table>
          </div>
        </div>

        <div class="document-title">Rechnung</div>

        <table class="items">
          <thead>
            <tr>
              <th style="width: 40px">Pos.</th>
              <th>Beschreibung</th>
              <th class="number" style="width: 60px">Menge</th>
              <th class="number" style="width: 100px">Einzelpreis</th>
              <th class="number" style="width: 100px">Gesamt</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item, i) => `
              <tr>
                <td>${item.position || i + 1}</td>
                <td>${item.description}</td>
                <td class="number">${item.quantity} ${item.unit || 'Stk.'}</td>
                <td class="number">${formatCurrency(item.unit_price)}</td>
                <td class="number">${formatCurrency(item.total)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <table>
            <tr><td>Zwischensumme:</td><td class="number">${formatCurrency(invoice.subtotal)}</td></tr>
            ${invoice.discount_percent ? `<tr><td>Rabatt (${invoice.discount_percent}%):</td><td class="number">-${formatCurrency(invoice.discount_amount)}</td></tr>` : ''}
            <tr class="total"><td>Rechnungsbetrag:</td><td class="number">${formatCurrency(invoice.total)}</td></tr>
          </table>
        </div>

        <div class="payment-info">
          <h4>Zahlungsinformationen</h4>
          <p>
            Bitte zahlen Sie den Betrag von <strong>${formatCurrency(invoice.total)}</strong>
            ${invoice.due_date ? `bis zum <strong>${formatDate(invoice.due_date)}</strong>` : ''}.
          </p>
          <p style="margin-top: 10px;"><strong>Akzeptierte Zahlungsmethoden:</strong> ${invoice.payment_methods || 'Überweisung'}</p>
          ${(invoice.payment_methods || '').includes('Überweisung') || (invoice.payment_methods || '').includes('SEPA') ? `
          <p style="margin-top: 10px;">
            <strong>Bankverbindung:</strong><br>
            ${companyInfo.bankName}<br>
            IBAN: ${companyInfo.iban}<br>
            BIC: ${companyInfo.bic}<br>
            Verwendungszweck: ${invoice.invoice_number}
          </p>
          ` : ''}
        </div>

        ${invoice.notes ? `
          <div class="notes">
            <h4>Anmerkungen</h4>
            <p>${invoice.notes}</p>
          </div>
        ` : ''}

        <!-- QR Codes Section -->
        <div style="display: flex; gap: 20px; margin-top: 30px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
          <!-- EPC QR Code (GiroCode für Banking) -->
          <div style="flex: 1; text-align: center;">
            <h4 style="margin-bottom: 10px; font-size: 11pt;">Zahlung per QR-Code</h4>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(generateEPCQRCode(invoice, companyInfo))}"
                 alt="EPC QR Code"
                 style="width: 150px; height: 150px; margin: 0 auto;"/>
            <p style="font-size: 8pt; color: #666; margin-top: 5px;">Scannen zum Bezahlen</p>
          </div>

          <!-- Google Review QR Code (falls vorhanden) -->
          ${companyInfo.googleReviewUrl ? `
          <div style="flex: 1; text-align: center;">
            <h4 style="margin-bottom: 10px; font-size: 11pt;">Bewerten Sie uns!</h4>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(companyInfo.googleReviewUrl)}"
                 alt="Google Review QR Code"
                 style="width: 150px; height: 150px; margin: 0 auto;"/>
            <p style="font-size: 8pt; color: #666; margin-top: 5px;">Google Bewertung</p>
          </div>
          ` : ''}
        </div>

        <div class="footer">
          <div class="footer-columns">
            <div>
              ${companyInfo.name}<br>
              ${companyInfo.street}<br>
              ${companyInfo.zip} ${companyInfo.city}
            </div>
            <div>
              Tel: ${companyInfo.phone}<br>
              E-Mail: ${companyInfo.email}<br>
              Web: ${companyInfo.website}
            </div>
            <div>
              ${companyInfo.taxId ? `USt-IdNr.: ${companyInfo.taxId}<br>` : ''}
              ${companyInfo.bankName ? `Bank: ${companyInfo.bankName}<br>` : ''}
              ${companyInfo.iban ? `IBAN: ${companyInfo.iban}` : ''}
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return new Blob([htmlContent], { type: 'text/html' });
};

export const generateEPCQRCode = (
  invoice: Invoice,
  companyInfo: CompanyInfo = defaultCompanyInfo
): string => {
  // EPC QR Code format (GiroCode)
  const epcData = [
    'BCD',                           // Service Tag
    '002',                           // Version
    '1',                             // Character set (UTF-8)
    'SCT',                           // Identification
    companyInfo.bic || '',           // BIC
    companyInfo.name,                // Beneficiary name
    companyInfo.iban?.replace(/\s/g, '') || '', // IBAN
    `EUR${(invoice.total || 0).toFixed(2)}`,    // Amount
    '',                              // Purpose (optional)
    invoice.invoice_number,          // Reference
    '',                              // Text (optional)
    '',                              // Information (optional)
  ].join('\n');

  return epcData;
};

export const downloadPDF = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const printPDF = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  }
};
