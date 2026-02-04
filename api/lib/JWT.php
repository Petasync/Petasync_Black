<?php
/**
 * JWT (JSON Web Token) Handler
 * Einfache Implementation ohne externe Dependencies
 */

require_once __DIR__ . '/../config.php';

class JWT
{
    /**
     * Erstellt einen JWT Token
     */
    public static function create(array $payload, int $expiry = null): string
    {
        $header = [
            'typ' => 'JWT',
            'alg' => 'HS256'
        ];

        $payload['iat'] = time();
        $payload['exp'] = time() + ($expiry ?? JWT_EXPIRY);

        $headerEncoded = self::base64UrlEncode(json_encode($header));
        $payloadEncoded = self::base64UrlEncode(json_encode($payload));

        $signature = hash_hmac(
            'sha256',
            "$headerEncoded.$payloadEncoded",
            JWT_SECRET,
            true
        );
        $signatureEncoded = self::base64UrlEncode($signature);

        return "$headerEncoded.$payloadEncoded.$signatureEncoded";
    }

    /**
     * Verifiziert und dekodiert einen JWT Token
     */
    public static function verify(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$headerEncoded, $payloadEncoded, $signatureEncoded] = $parts;

        // Signatur verifizieren
        $signature = hash_hmac(
            'sha256',
            "$headerEncoded.$payloadEncoded",
            JWT_SECRET,
            true
        );
        $expectedSignature = self::base64UrlEncode($signature);

        if (!hash_equals($expectedSignature, $signatureEncoded)) {
            return null;
        }

        // Payload dekodieren
        $payload = json_decode(self::base64UrlDecode($payloadEncoded), true);
        if (!$payload) {
            return null;
        }

        // Ablaufdatum prüfen
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return null;
        }

        return $payload;
    }

    /**
     * Erstellt einen Refresh Token
     */
    public static function createRefreshToken(string $userId): string
    {
        return self::create(
            ['user_id' => $userId, 'type' => 'refresh'],
            JWT_REFRESH_EXPIRY
        );
    }

    /**
     * Extrahiert den Token aus dem Authorization Header
     */
    public static function getTokenFromHeader(): ?string
    {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

        if (preg_match('/Bearer\s+(.+)$/i', $authHeader, $matches)) {
            return $matches[1];
        }

        return null;
    }

    /**
     * Base64 URL-safe encoding
     */
    private static function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Base64 URL-safe decoding
     */
    private static function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}
