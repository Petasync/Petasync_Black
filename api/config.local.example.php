<?php
/**
 * Lokale Konfiguration für Petasync API
 *
 * ANLEITUNG:
 * 1. Kopiere diese Datei zu: config.local.php
 * 2. Trage die echten Werte ein
 * 3. config.local.php wird NICHT committed (ist in .gitignore)
 *
 * Auf dem Hetzner Server:
 * Diese Datei muss manuell auf den Server hochgeladen werden
 * nach: /public_html/api/config.local.php
 */

// Hetzner PostgreSQL Datenbank
define('DB_HOST', 'khxv.your-database.de');
define('DB_NAME', 'petasy_db1');
define('DB_USER', 'petasy_1');
define('DB_PASS', 'DEIN_PASSWORT_HIER');
define('DB_PORT', '5432');

// JWT Secret - generiere einen sicheren Wert!
// Zum Generieren: php -r "echo bin2hex(random_bytes(32));"
define('JWT_SECRET', 'GENERIERE_EINEN_SICHEREN_32_BYTE_HEX_STRING');

// Debug-Modus (false für Production!)
define('API_DEBUG', false);

// Turnstile Secret Key (von Cloudflare Dashboard)
define('TURNSTILE_SECRET_KEY', 'DEIN_TURNSTILE_SECRET');
