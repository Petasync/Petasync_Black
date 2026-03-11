<?php
/**
 * Account Unlock Script
 *
 * Verwendung auf dem Server:
 *   php /var/www/petasync.de/api/unlock-account.php master@petasync.de
 *
 * Setzt failed_login_attempts auf 0 und entfernt die Sperre.
 */

if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    echo json_encode(['error' => 'CLI only']);
    exit(1);
}

if ($argc < 2) {
    echo "Verwendung: php unlock-account.php <email>\n";
    exit(1);
}

$email = $argv[1];

require_once __DIR__ . '/lib/Database.php';

$user = Database::queryOne(
    "SELECT u.id, u.email, up.failed_login_attempts, up.locked_until
     FROM users u
     LEFT JOIN admin_profiles up ON up.user_id = u.id
     WHERE LOWER(u.email) = LOWER(:email)",
    ['email' => $email]
);

if (!$user) {
    echo "FEHLER: Kein User mit E-Mail '$email' gefunden.\n";
    exit(1);
}

echo "User gefunden: {$user['email']} (ID: {$user['id']})\n";
echo "  Failed attempts: " . ($user['failed_login_attempts'] ?? 0) . "\n";
echo "  Locked until:    " . ($user['locked_until'] ?? 'nicht gesperrt') . "\n";

Database::execute(
    "UPDATE admin_profiles SET failed_login_attempts = 0, locked_until = NULL WHERE user_id = :id",
    ['id' => $user['id']]
);

echo "\nAccount entsperrt! Login-Versuche zurückgesetzt.\n";
