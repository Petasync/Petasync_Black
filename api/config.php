<?php
/**
 * Petasync API Configuration
 *
 * WICHTIG: Die echten Credentials werden in config.local.php gesetzt,
 * die NICHT im Git-Repository ist. Diese Datei enthält nur Defaults.
 */

// Lade lokale Konfiguration wenn vorhanden (auf dem Server)
$localConfig = __DIR__ . '/config.local.php';
if (file_exists($localConfig)) {
    require_once $localConfig;
}

// Datenbank-Konfiguration (Defaults - werden von config.local.php überschrieben)
if (!defined('DB_HOST')) define('DB_HOST', 'localhost');
if (!defined('DB_NAME')) define('DB_NAME', 'petasy_db1');
if (!defined('DB_USER')) define('DB_USER', 'petasy_1');
if (!defined('DB_PASS')) define('DB_PASS', '');
if (!defined('DB_PORT')) define('DB_PORT', '5432');

// JWT Configuration
if (!defined('JWT_SECRET')) define('JWT_SECRET', 'CHANGE_THIS_IN_PRODUCTION_' . bin2hex(random_bytes(16)));
if (!defined('JWT_EXPIRY')) define('JWT_EXPIRY', 3600); // 1 Stunde
if (!defined('JWT_REFRESH_EXPIRY')) define('JWT_REFRESH_EXPIRY', 604800); // 7 Tage

// API Configuration
if (!defined('API_DEBUG')) define('API_DEBUG', false);
if (!defined('CORS_ALLOWED_ORIGINS')) {
    define('CORS_ALLOWED_ORIGINS', [
        'https://petasync.de',
        'https://www.petasync.de',
        'http://localhost:5173',
        'http://localhost:3000'
    ]);
}

// Turnstile Configuration (für Kontaktformular)
if (!defined('TURNSTILE_SECRET_KEY')) define('TURNSTILE_SECRET_KEY', '');

// Email Configuration
if (!defined('ADMIN_EMAIL')) define('ADMIN_EMAIL', 'service@petasync.de');
