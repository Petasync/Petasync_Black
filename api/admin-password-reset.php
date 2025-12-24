<?php
/**
 * Petasync Admin Password Reset Email Handler
 *
 * Sendet Password-Reset E-Mails an Admins über PHP statt Supabase SMTP
 */

// Allowed origins for CORS
$allowedOrigins = [
    'https://petasync.de',
    'https://www.petasync.de',
    'http://localhost:5173',
    'http://localhost:3000'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Set CORS headers
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header('Access-Control-Allow-Origin: https://petasync.de');
}

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

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

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$email = $input['email'] ?? '';
$resetToken = $input['resetToken'] ?? '';
$resetUrl = $input['resetUrl'] ?? '';

if (!$email || !$resetToken || !$resetUrl) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

// ============================================
// Password-Reset E-Mail
// ============================================
$subject = "Passwort zurücksetzen - Petasync Admin";
$body = '
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
              <p style="margin: 8px 0 0; font-size: 14px; color: #888888; letter-spacing: 2px;">ADMIN BEREICH</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; color: #ffffff;">Passwort zurücksetzen</h2>

              <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                Sie haben eine Anfrage zum Zurücksetzen Ihres Admin-Passworts gestellt.
              </p>

              <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                Klicken Sie auf den folgenden Button, um Ihr Passwort zurückzusetzen:
              </p>

              <!-- Reset Button -->
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td style="text-align: center;">
                    <a href="' . htmlspecialchars($resetUrl) . '" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Passwort zurücksetzen
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 25px 0; font-size: 14px; line-height: 1.6; color: #888888;">
                Oder kopieren Sie diesen Link in Ihren Browser:
              </p>

              <table role="presentation" style="width: 100%; background-color: #1a1a1a; border-radius: 8px; border: 1px solid #333333; margin: 20px 0;">
                <tr>
                  <td style="padding: 15px; word-break: break-all;">
                    <code style="color: #3b82f6; font-size: 13px; font-family: monospace;">' . htmlspecialchars($resetUrl) . '</code>
                  </td>
                </tr>
              </table>

              <!-- Security Notice -->
              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); border-radius: 12px; margin: 30px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px; font-size: 14px; color: #fecaca; font-weight: 600;">
                      ⚠️ Sicherheitshinweis
                    </p>
                    <p style="margin: 0; font-size: 13px; color: #fef2f2; line-height: 1.5;">
                      Dieser Link ist <strong>1 Stunde gültig</strong> und kann nur einmal verwendet werden.<br>
                      Falls Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 25px 0 0; font-size: 14px; line-height: 1.6; color: #888888;">
                Haben Sie Probleme? Kontaktieren Sie den Administrator unter <a href="mailto:service@petasync.de" style="color: #3b82f6; text-decoration: none;">service@petasync.de</a>
              </p>

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

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: Petasync Admin <noreply@petasync.de>',
];

$emailSent = @mail($email, $subject, $body, implode("\r\n", $headers));

// Response
if ($emailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Password reset email sent successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to send email'
    ]);
}
