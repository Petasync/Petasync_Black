<?php
/**
 * Auth API Endpoints
 *
 * POST /api/auth/login       - Login mit Email/Passwort
 * POST /api/auth/verify-2fa  - 2FA verifizieren
 * POST /api/auth/logout      - Logout
 * POST /api/auth/refresh     - Token erneuern
 * POST /api/auth/forgot-password - Passwort-Reset anfordern
 * POST /api/auth/reset-password  - Passwort zurücksetzen
 * GET  /api/auth/me          - Aktueller User
 */

require_once __DIR__ . '/lib/Response.php';
require_once __DIR__ . '/lib/Auth.php';
require_once __DIR__ . '/lib/Router.php';

// CORS und Preflight
Response::handlePreflight();

$router = new Router('/api/auth');

// ============================================
// POST /login - Login
// ============================================
$router->post('/login', function () {
    $body = Router::getJsonBody();

    if (empty($body['email']) || empty($body['password'])) {
        Response::error('Email und Passwort erforderlich', 400);
    }

    try {
        $result = Auth::login($body['email'], $body['password']);
        Response::success($result);
    } catch (Exception $e) {
        Response::error($e->getMessage(), 401);
    }
});

// ============================================
// POST /verify-2fa - 2FA Code verifizieren
// ============================================
$router->post('/verify-2fa', function () {
    $body = Router::getJsonBody();

    if (empty($body['temp_token']) || empty($body['code'])) {
        Response::error('Token und Code erforderlich', 400);
    }

    try {
        $result = Auth::verify2FA($body['temp_token'], $body['code']);
        Response::success($result);
    } catch (Exception $e) {
        Response::error($e->getMessage(), 401);
    }
});

// ============================================
// POST /logout - Logout
// ============================================
$router->post('/logout', function () {
    Auth::logout();
    Response::success(null, 'Erfolgreich ausgeloggt');
});

// ============================================
// POST /refresh - Token erneuern
// ============================================
$router->post('/refresh', function () {
    $body = Router::getJsonBody();

    if (empty($body['refresh_token'])) {
        Response::error('Refresh Token erforderlich', 400);
    }

    try {
        $result = Auth::refresh($body['refresh_token']);
        Response::success($result);
    } catch (Exception $e) {
        Response::error($e->getMessage(), 401);
    }
});

// ============================================
// POST /forgot-password - Passwort-Reset anfordern
// ============================================
$router->post('/forgot-password', function () {
    $body = Router::getJsonBody();

    if (empty($body['email'])) {
        Response::error('Email erforderlich', 400);
    }

    $token = Auth::requestPasswordReset($body['email']);

    // Hier würde normalerweise eine Email gesendet werden
    // Das machen wir über das bestehende PHP-Mail-System
    if ($token) {
        $resetUrl = (defined('SITE_URL') ? SITE_URL : 'https://petasync.de')
            . "/admin/reset-password?token=$token";

        // Email senden (simplified - in production mit Template)
        $to = $body['email'];
        $subject = "Passwort zurücksetzen - Petasync";
        $message = "Klicken Sie auf folgenden Link um Ihr Passwort zurückzusetzen:\n\n$resetUrl\n\nDieser Link ist 1 Stunde gültig.";
        $headers = "From: Petasync <noreply@petasync.de>";

        @mail($to, $subject, $message, $headers);
    }

    // Aus Sicherheitsgründen immer erfolgreiche Antwort
    Response::success(null, 'Wenn ein Account mit dieser Email existiert, wurde eine Email gesendet.');
});

// ============================================
// POST /reset-password - Passwort zurücksetzen
// ============================================
$router->post('/reset-password', function () {
    $body = Router::getJsonBody();

    if (empty($body['token']) || empty($body['password'])) {
        Response::error('Token und neues Passwort erforderlich', 400);
    }

    if (strlen($body['password']) < 8) {
        Response::error('Passwort muss mindestens 8 Zeichen lang sein', 400);
    }

    try {
        Auth::resetPassword($body['token'], $body['password']);
        Response::success(null, 'Passwort erfolgreich geändert');
    } catch (Exception $e) {
        Response::error($e->getMessage(), 400);
    }
});

// ============================================
// GET /me - Aktueller User
// ============================================
$router->get('/me', function () {
    $user = Auth::requireAuth();
    Response::success([
        'id' => $user['id'],
        'email' => $user['email'],
        'display_name' => $user['display_name'],
        'role' => $user['role'],
        'totp_enabled' => (bool)$user['totp_enabled']
    ]);
});

// ============================================
// POST /change-password - Passwort ändern (eingeloggt)
// ============================================
$router->post('/change-password', function () {
    $user = Auth::requireAuth();
    $body = Router::getJsonBody();

    if (empty($body['current_password']) || empty($body['new_password'])) {
        Response::error('Aktuelles und neues Passwort erforderlich', 400);
    }

    // Aktuelles Passwort prüfen
    $dbUser = Database::queryOne(
        "SELECT password_hash FROM users WHERE id = :id",
        ['id' => $user['id']]
    );

    if (!password_verify($body['current_password'], $dbUser['password_hash'])) {
        Response::error('Aktuelles Passwort ist falsch', 401);
    }

    if (strlen($body['new_password']) < 8) {
        Response::error('Neues Passwort muss mindestens 8 Zeichen lang sein', 400);
    }

    // Neues Passwort setzen
    Database::execute(
        "UPDATE users SET password_hash = :hash WHERE id = :id",
        ['hash' => Auth::hashPassword($body['new_password']), 'id' => $user['id']]
    );

    Response::success(null, 'Passwort erfolgreich geändert');
});

// Router ausführen
$router->dispatch();
