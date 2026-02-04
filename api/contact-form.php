<?php
/**
 * Kontaktformular API
 *
 * Ersetzt die Supabase Edge Function.
 * - Verifiziert Turnstile Token
 * - Speichert Anfrage in Datenbank
 * - Sendet Emails an Admin und Kunde
 */

require_once __DIR__ . '/lib/Response.php';
require_once __DIR__ . '/lib/Database.php';

// CORS und Preflight
Response::handlePreflight();

// Nur POST erlaubt
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Method not allowed', 405);
}

// JSON Input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    Response::error('Invalid JSON', 400);
}

$name = $input['name'] ?? '';
$email = $input['email'] ?? '';
$phone = $input['phone'] ?? '';
$subject = $input['subject'] ?? '';
$message = $input['message'] ?? '';
$customerType = $input['customerType'] ?? 'privat';
$turnstileToken = $input['turnstileToken'] ?? '';

// Validierung
if (!$name || !$email || !$message) {
    Response::error('Name, Email und Nachricht sind erforderlich', 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    Response::error('Ungültige Email-Adresse', 400);
}

// Turnstile verifizieren (wenn konfiguriert)
if (TURNSTILE_SECRET_KEY && $turnstileToken) {
    $verifyResult = verifyTurnstile($turnstileToken);
    if (!$verifyResult['success']) {
        Response::error('Bot-Schutz Verifizierung fehlgeschlagen', 400);
    }
}

try {
    // Anfrage in Datenbank speichern
    $inquiryType = $customerType === 'geschaeft' ? 'business' : 'privat';

    $inquiryId = Database::insert('inquiries', [
        'name' => $name,
        'email' => $email,
        'phone' => $phone ?: null,
        'inquiry_type' => $inquiryType,
        'subject' => $subject ?: 'Kontaktanfrage',
        'message' => $message,
        'status' => 'neu',
        'priority' => 'normal',
        'source' => 'website'
    ]);

    // Emails senden
    $adminSent = sendAdminEmail($name, $email, $phone, $subject, $message, $customerType);
    $customerSent = sendCustomerEmail($name, $email, $subject, $message, $customerType);

    Response::success([
        'inquiry_id' => $inquiryId,
        'adminEmailSent' => $adminSent,
        'customerEmailSent' => $customerSent
    ], 'Anfrage erfolgreich gesendet');

} catch (Exception $e) {
    if (API_DEBUG) {
        Response::error('Fehler: ' . $e->getMessage(), 500);
    }
    Response::error('Anfrage konnte nicht verarbeitet werden', 500);
}

/**
 * Turnstile Token verifizieren
 */
function verifyTurnstile(string $token): array
{
    $url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    $data = [
        'secret' => TURNSTILE_SECRET_KEY,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
    ];

    $options = [
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/x-www-form-urlencoded',
            'content' => http_build_query($data)
        ]
    ];

    $context = stream_context_create($options);
    $result = @file_get_contents($url, false, $context);

    if ($result === false) {
        return ['success' => false];
    }

    return json_decode($result, true) ?? ['success' => false];
}

/**
 * Email an Admin senden
 */
function sendAdminEmail($name, $email, $phone, $subject, $message, $customerType): bool
{
    $customerTypeName = $customerType === 'geschaeft' ? 'Geschäftskunde' : 'Privatkunde';

    $adminSubject = "Neue Kontaktanfrage: " . ($subject ?: 'Keine Betreff');
    $adminBody = "
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; }
        .header { background: #1a1a1a; color: #fff; padding: 30px; }
        .content { padding: 30px; }
        .row { padding: 10px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #333; }
      </style>
    </head>
    <body>
      <div class='container'>
        <div class='header'>
          <h1 style='margin:0;font-size:20px;'>Neue Kontaktanfrage</h1>
        </div>
        <div class='content'>
          <div class='row'><span class='label'>Name:</span> " . htmlspecialchars($name) . "</div>
          <div class='row'><span class='label'>E-Mail:</span> <a href='mailto:$email'>$email</a></div>
          <div class='row'><span class='label'>Telefon:</span> " . ($phone ?: 'Nicht angegeben') . "</div>
          <div class='row'><span class='label'>Kundentyp:</span> $customerTypeName</div>
          <div class='row'><span class='label'>Betreff:</span> " . htmlspecialchars($subject ?: 'Kein Betreff') . "</div>
          <div class='row'><span class='label'>Nachricht:</span><br><br>" . nl2br(htmlspecialchars($message)) . "</div>
        </div>
      </div>
    </body>
    </html>
    ";

    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: PetaSync Website <noreply@petasync.de>',
        'Reply-To: ' . $name . ' <' . $email . '>',
    ];

    return @mail(ADMIN_EMAIL, $adminSubject, $adminBody, implode("\r\n", $headers));
}

/**
 * Bestätigungs-Email an Kunden senden
 */
function sendCustomerEmail($name, $email, $subject, $message, $customerType): bool
{
    $customerTypeName = $customerType === 'geschaeft' ? 'Geschäftskunde' : 'Privatkunde';

    $customerSubject = "Ihre Anfrage bei Petasync" . ($subject ? ": $subject" : "");
    $customerBody = '
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a; color: #ffffff;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%); border-radius: 16px; overflow: hidden; border: 1px solid #2a2a2a;">
              <tr>
                <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #2a2a2a;">
                  <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">PETASYNC</h1>
                  <p style="margin: 8px 0 0; font-size: 14px; color: #888888; letter-spacing: 2px;">IT-SERVICE & SUPPORT</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px; font-size: 24px; color: #ffffff;">Vielen Dank für Ihre Anfrage!</h2>
                  <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                    Hallo ' . htmlspecialchars($name) . ',
                  </p>
                  <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                    wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden –
                    <strong style="color: #ffffff;">in der Regel innerhalb von 24 Stunden</strong>.
                  </p>
                  <table role="presentation" style="width: 100%; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #333333; margin: 30px 0;">
                    <tr>
                      <td style="padding: 25px;">
                        <h3 style="margin: 0 0 20px; font-size: 16px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                          Ihre Anfrage im Überblick
                        </h3>
                        <table role="presentation" style="width: 100%;">
                          <tr>
                            <td style="padding: 8px 0; color: #888888; font-size: 14px; width: 120px;">Kundentyp:</td>
                            <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">' . $customerTypeName . '</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #888888; font-size: 14px;">Betreff:</td>
                            <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">' . htmlspecialchars($subject ?: 'Kontaktanfrage') . '</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #888888; font-size: 14px; vertical-align: top;">Nachricht:</td>
                            <td style="padding: 8px 0; color: #ffffff; font-size: 14px; line-height: 1.5;">' . nl2br(htmlspecialchars($message)) . '</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%); border-radius: 12px; margin: 30px 0;">
                    <tr>
                      <td style="padding: 25px; text-align: center;">
                        <p style="margin: 0 0 15px; font-size: 15px; color: #93c5fd;">
                          <strong>Dringend?</strong> Rufen Sie uns direkt an:
                        </p>
                        <a href="tel:+491637117198" style="display: inline-block; font-size: 22px; font-weight: 700; color: #ffffff; text-decoration: none;">
                          +49 163 711 7198
                        </a>
                        <p style="margin: 10px 0 0; font-size: 13px; color: #64748b;">Mo-Fr: 09:00 - 19:00 Uhr</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px 40px; background-color: #0a0a0a; border-top: 1px solid #2a2a2a;">
                  <table role="presentation" style="width: 100%;">
                    <tr>
                      <td style="text-align: center;">
                        <p style="margin: 0 0 10px; font-size: 14px; color: #ffffff; font-weight: 600;">Petasync</p>
                        <p style="margin: 0 0 5px; font-size: 13px; color: #888888;">IT-Service & PC-Reparatur</p>
                        <p style="margin: 0 0 15px; font-size: 13px; color: #888888;">Ansbach • Nürnberg • Fürth • Erlangen</p>
                        <p style="margin: 0; font-size: 12px; color: #666666;">
                          <a href="mailto:service@petasync.de" style="color: #3b82f6; text-decoration: none;">service@petasync.de</a>
                          &nbsp;•&nbsp;
                          <a href="https://petasync.de" style="color: #3b82f6; text-decoration: none;">petasync.de</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    ';

    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: PetaSync <service@petasync.de>',
    ];

    return @mail($email, $customerSubject, $customerBody, implode("\r\n", $headers));
}
