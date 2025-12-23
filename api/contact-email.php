<?php
/**
 * Petasync Contact Form Email Handler
 *
 * Dieses Script auf deinem Hetzner-Server ablegen (z.B. https://petasync.de/api/contact-email.php)
 * Dann in Supabase Edge Function Secrets: API_EMAIL_URL = https://petasync.de/api/contact-email.php
 *                                         API_EMAIL_SECRET = [ein geheimes Passwort]
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Secret');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Verify API secret
$apiSecret = $_SERVER['HTTP_X_API_SECRET'] ?? '';
$expectedSecret = 'DEIN_GEHEIMES_PASSWORT_HIER_AENDERN'; // <-- Ändere das!

if ($apiSecret !== $expectedSecret) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$name = $input['name'] ?? '';
$email = $input['email'] ?? '';
$phone = $input['phone'] ?? '';
$subject = $input['subject'] ?? '';
$message = $input['message'] ?? '';
$customerType = $input['customerType'] ?? 'privat';

if (!$name || !$email || !$subject || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$customerTypeName = $customerType === 'geschaeft' ? 'Geschäftskunde' : 'Privatkunde';

// ============================================
// 1. E-Mail an Petasync (Admin-Benachrichtigung)
// ============================================
$adminSubject = "Neue Kontaktanfrage: $subject";
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
      <div class='row'><span class='label'>Name:</span> $name</div>
      <div class='row'><span class='label'>E-Mail:</span> <a href='mailto:$email'>$email</a></div>
      <div class='row'><span class='label'>Telefon:</span> " . ($phone ?: 'Nicht angegeben') . "</div>
      <div class='row'><span class='label'>Kundentyp:</span> $customerTypeName</div>
      <div class='row'><span class='label'>Betreff:</span> $subject</div>
      <div class='row'><span class='label'>Nachricht:</span><br><br>" . nl2br(htmlspecialchars($message)) . "</div>
    </div>
  </div>
</body>
</html>
";

$adminHeaders = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: PetaSync Website <noreply@petasync.de>',
    'Reply-To: ' . $name . ' <' . $email . '>',
];

$adminSent = @mail('service@petasync.de', $adminSubject, $adminBody, implode("\r\n", $adminHeaders));

// ============================================
// 2. Bestätigungs-E-Mail an Kunden
// ============================================
$customerSubject = "Ihre Anfrage bei Petasync: $subject";
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

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #2a2a2a;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">PETASYNC</h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #888888; letter-spacing: 2px;">IT-SERVICE & SUPPORT</p>
            </td>
          </tr>

          <!-- Content -->
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

              <!-- Summary -->
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
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">' . htmlspecialchars($subject) . '</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px; vertical-align: top;">Nachricht:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; line-height: 1.5;">' . nl2br(htmlspecialchars($message)) . '</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <h3 style="margin: 30px 0 20px; font-size: 18px; color: #ffffff;">So geht es weiter:</h3>

              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation">
                      <tr>
                        <td style="width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: bold; font-size: 14px;">1</span>
                        </td>
                        <td style="padding-left: 16px; color: #cccccc; font-size: 15px;">
                          Wir prüfen Ihre Anfrage und analysieren Ihr Anliegen
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation">
                      <tr>
                        <td style="width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: bold; font-size: 14px;">2</span>
                        </td>
                        <td style="padding-left: 16px; color: #cccccc; font-size: 15px;">
                          Wir melden uns per E-Mail oder Telefon bei Ihnen
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation">
                      <tr>
                        <td style="width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: bold; font-size: 14px;">3</span>
                        </td>
                        <td style="padding-left: 16px; color: #cccccc; font-size: 15px;">
                          Gemeinsam finden wir die beste Lösung für Sie
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Urgent -->
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

          <!-- Footer -->
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

$customerHeaders = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: PetaSync <service@petasync.de>',
];

$customerSent = @mail($email, $customerSubject, $customerBody, implode("\r\n", $customerHeaders));

// Response
echo json_encode([
    'success' => true,
    'adminEmailSent' => $adminSent,
    'customerEmailSent' => $customerSent,
]);
