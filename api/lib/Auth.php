<?php
/**
 * Authentication Handler
 * Login, Logout, Session-Management, 2FA
 */

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/JWT.php';
require_once __DIR__ . '/Response.php';

class Auth
{
    private const MAX_FAILED_ATTEMPTS = 5;
    private const LOCKOUT_MINUTES = 15;

    /**
     * Holt den aktuell eingeloggten User aus dem JWT
     */
    public static function getCurrentUser(): ?array
    {
        $token = JWT::getTokenFromHeader();
        if (!$token) {
            return null;
        }

        $payload = JWT::verify($token);
        if (!$payload || !isset($payload['user_id'])) {
            return null;
        }

        // User aus DB holen
        $user = Database::queryOne(
            "SELECT u.*, up.totp_enabled, up.display_name, ur.role
             FROM users u
             LEFT JOIN admin_profiles up ON up.user_id = u.id
             LEFT JOIN user_roles ur ON ur.user_id = u.id
             WHERE u.id = :id",
            ['id' => $payload['user_id']]
        );

        return $user;
    }

    /**
     * Prüft ob der aktuelle User eingeloggt ist
     */
    public static function requireAuth(): array
    {
        $user = self::getCurrentUser();
        if (!$user) {
            Response::unauthorized('Nicht eingeloggt');
        }
        return $user;
    }

    /**
     * Prüft ob der aktuelle User Admin ist
     */
    public static function requireAdmin(): array
    {
        $user = self::requireAuth();
        if ($user['role'] !== 'admin') {
            Response::forbidden('Keine Admin-Berechtigung');
        }
        return $user;
    }

    /**
     * Login mit Email und Passwort
     */
    public static function login(string $email, string $password): array
    {
        // User suchen
        $user = Database::queryOne(
            "SELECT u.*, up.totp_enabled, up.totp_secret, up.failed_login_attempts,
                    up.locked_until, up.display_name, ur.role
             FROM users u
             LEFT JOIN admin_profiles up ON up.user_id = u.id
             LEFT JOIN user_roles ur ON ur.user_id = u.id
             WHERE LOWER(u.email) = LOWER(:email)",
            ['email' => $email]
        );

        if (!$user) {
            throw new Exception('Ungültige Anmeldedaten');
        }

        // Account gesperrt?
        if ($user['locked_until'] && strtotime($user['locked_until']) > time()) {
            $remaining = ceil((strtotime($user['locked_until']) - time()) / 60);
            throw new Exception("Account gesperrt. Versuche es in $remaining Minuten erneut.");
        }

        // Passwort prüfen
        if (!password_verify($password, $user['password_hash'])) {
            self::incrementFailedAttempts($user['id']);
            throw new Exception('Ungültige Anmeldedaten');
        }

        // 2FA aktiviert?
        if ($user['totp_enabled']) {
            // Temporärer Token für 2FA-Schritt
            $tempToken = JWT::create(
                ['user_id' => $user['id'], 'type' => '2fa_pending'],
                300 // 5 Minuten gültig
            );
            return [
                'requires_2fa' => true,
                'temp_token' => $tempToken
            ];
        }

        // Login erfolgreich - Session erstellen
        return self::createSession($user);
    }

    /**
     * 2FA verifizieren und Login abschließen
     */
    public static function verify2FA(string $tempToken, string $code): array
    {
        $payload = JWT::verify($tempToken);
        if (!$payload || $payload['type'] !== '2fa_pending') {
            throw new Exception('Ungültiger oder abgelaufener Token');
        }

        $user = Database::queryOne(
            "SELECT u.*, up.totp_secret, up.backup_codes, up.display_name, ur.role
             FROM users u
             LEFT JOIN admin_profiles up ON up.user_id = u.id
             LEFT JOIN user_roles ur ON ur.user_id = u.id
             WHERE u.id = :id",
            ['id' => $payload['user_id']]
        );

        if (!$user) {
            throw new Exception('User nicht gefunden');
        }

        // TOTP-Code prüfen
        if (!self::verifyTOTP($user['totp_secret'], $code)) {
            // Backup-Code prüfen
            $backupCodes = json_decode($user['backup_codes'] ?? '[]', true);
            $codeIndex = array_search($code, $backupCodes);

            if ($codeIndex === false) {
                self::incrementFailedAttempts($user['id']);
                throw new Exception('Ungültiger Code');
            }

            // Backup-Code verbrauchen
            unset($backupCodes[$codeIndex]);
            Database::execute(
                "UPDATE admin_profiles SET backup_codes = :codes WHERE user_id = :user_id",
                ['codes' => json_encode(array_values($backupCodes)), 'user_id' => $user['id']]
            );
        }

        return self::createSession($user);
    }

    /**
     * Erstellt eine neue Session und gibt Tokens zurück
     */
    private static function createSession(array $user): array
    {
        // Failed attempts zurücksetzen
        Database::execute(
            "UPDATE admin_profiles SET failed_login_attempts = 0, locked_until = NULL, last_login = NOW()
             WHERE user_id = :user_id",
            ['user_id' => $user['id']]
        );

        // Access Token erstellen
        $accessToken = JWT::create([
            'user_id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
            'type' => 'access'
        ]);

        // Refresh Token erstellen
        $refreshToken = JWT::createRefreshToken($user['id']);

        // Session in DB speichern
        Database::insert('sessions', [
            'user_id' => $user['id'],
            'token_hash' => hash('sha256', $accessToken),
            'refresh_token_hash' => hash('sha256', $refreshToken),
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
            'expires_at' => date('Y-m-d H:i:s', time() + JWT_REFRESH_EXPIRY)
        ]);

        return [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'expires_in' => JWT_EXPIRY,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'display_name' => $user['display_name'],
                'role' => $user['role']
            ]
        ];
    }

    /**
     * Logout - Session löschen
     */
    public static function logout(): void
    {
        $token = JWT::getTokenFromHeader();
        if ($token) {
            Database::execute(
                "DELETE FROM sessions WHERE token_hash = :hash",
                ['hash' => hash('sha256', $token)]
            );
        }
    }

    /**
     * Access Token erneuern mit Refresh Token
     */
    public static function refresh(string $refreshToken): array
    {
        $payload = JWT::verify($refreshToken);
        if (!$payload || $payload['type'] !== 'refresh') {
            throw new Exception('Ungültiger Refresh Token');
        }

        // Session in DB prüfen
        $session = Database::queryOne(
            "SELECT s.*, u.email, ur.role, up.display_name
             FROM sessions s
             JOIN users u ON u.id = s.user_id
             LEFT JOIN user_roles ur ON ur.user_id = s.user_id
             LEFT JOIN admin_profiles up ON up.user_id = s.user_id
             WHERE s.refresh_token_hash = :hash AND s.expires_at > NOW()",
            ['hash' => hash('sha256', $refreshToken)]
        );

        if (!$session) {
            throw new Exception('Session abgelaufen');
        }

        // Neuen Access Token erstellen
        $accessToken = JWT::create([
            'user_id' => $session['user_id'],
            'email' => $session['email'],
            'role' => $session['role'],
            'type' => 'access'
        ]);

        // Token-Hash in Session aktualisieren
        Database::execute(
            "UPDATE sessions SET token_hash = :hash WHERE id = :id",
            ['hash' => hash('sha256', $accessToken), 'id' => $session['id']]
        );

        return [
            'access_token' => $accessToken,
            'expires_in' => JWT_EXPIRY
        ];
    }

    /**
     * Passwort-Reset anfordern
     */
    public static function requestPasswordReset(string $email): void
    {
        $user = Database::queryOne(
            "SELECT id, email FROM users WHERE LOWER(email) = LOWER(:email)",
            ['email' => $email]
        );

        // Auch wenn User nicht existiert, geben wir keine Info preis
        if (!$user) {
            return;
        }

        // Reset-Token generieren
        $token = bin2hex(random_bytes(32));
        $expires = date('Y-m-d H:i:s', time() + 3600); // 1 Stunde gültig

        Database::execute(
            "UPDATE users SET password_reset_token = :token, password_reset_expires = :expires WHERE id = :id",
            ['token' => hash('sha256', $token), 'expires' => $expires, 'id' => $user['id']]
        );

        // Email senden (wird in der API-Route gemacht)
        return $token;
    }

    /**
     * Passwort zurücksetzen
     */
    public static function resetPassword(string $token, string $newPassword): void
    {
        $user = Database::queryOne(
            "SELECT id FROM users
             WHERE password_reset_token = :token AND password_reset_expires > NOW()",
            ['token' => hash('sha256', $token)]
        );

        if (!$user) {
            throw new Exception('Ungültiger oder abgelaufener Link');
        }

        // Neues Passwort setzen
        Database::execute(
            "UPDATE users SET password_hash = :hash, password_reset_token = NULL, password_reset_expires = NULL
             WHERE id = :id",
            ['hash' => password_hash($newPassword, PASSWORD_DEFAULT), 'id' => $user['id']]
        );

        // Alle Sessions löschen
        Database::execute("DELETE FROM sessions WHERE user_id = :id", ['id' => $user['id']]);
    }

    /**
     * Passwort hashen
     */
    public static function hashPassword(string $password): string
    {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    /**
     * TOTP-Code verifizieren (Google Authenticator kompatibel)
     */
    private static function verifyTOTP(string $secret, string $code, int $window = 1): bool
    {
        $timestamp = floor(time() / 30);

        for ($i = -$window; $i <= $window; $i++) {
            $expectedCode = self::generateTOTP($secret, $timestamp + $i);
            if (hash_equals($expectedCode, $code)) {
                return true;
            }
        }

        return false;
    }

    /**
     * TOTP-Code generieren
     */
    private static function generateTOTP(string $secret, int $timestamp): string
    {
        $secretKey = self::base32Decode($secret);
        $time = pack('N*', 0, $timestamp);
        $hash = hash_hmac('sha1', $time, $secretKey, true);
        $offset = ord($hash[19]) & 0x0F;
        $code = (
            ((ord($hash[$offset]) & 0x7F) << 24) |
            ((ord($hash[$offset + 1]) & 0xFF) << 16) |
            ((ord($hash[$offset + 2]) & 0xFF) << 8) |
            (ord($hash[$offset + 3]) & 0xFF)
        ) % 1000000;

        return str_pad($code, 6, '0', STR_PAD_LEFT);
    }

    /**
     * Base32 dekodieren
     */
    private static function base32Decode(string $input): string
    {
        $map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        $input = strtoupper($input);
        $input = str_replace('=', '', $input);

        $buffer = 0;
        $bufferLength = 0;
        $output = '';

        for ($i = 0; $i < strlen($input); $i++) {
            $buffer = ($buffer << 5) | strpos($map, $input[$i]);
            $bufferLength += 5;

            if ($bufferLength >= 8) {
                $bufferLength -= 8;
                $output .= chr(($buffer >> $bufferLength) & 0xFF);
            }
        }

        return $output;
    }

    /**
     * Failed Login Attempts erhöhen
     */
    private static function incrementFailedAttempts(string $userId): void
    {
        $profile = Database::queryOne(
            "SELECT failed_login_attempts FROM admin_profiles WHERE user_id = :id",
            ['id' => $userId]
        );

        $attempts = ($profile['failed_login_attempts'] ?? 0) + 1;
        $lockUntil = null;

        if ($attempts >= self::MAX_FAILED_ATTEMPTS) {
            $lockUntil = date('Y-m-d H:i:s', time() + (self::LOCKOUT_MINUTES * 60));
        }

        Database::execute(
            "UPDATE admin_profiles SET failed_login_attempts = :attempts, locked_until = :lock WHERE user_id = :id",
            ['attempts' => $attempts, 'lock' => $lockUntil, 'id' => $userId]
        );
    }
}
