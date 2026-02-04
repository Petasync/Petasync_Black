<?php
/**
 * API Response Handler
 * Einheitliche JSON-Responses und CORS-Handling
 */

require_once __DIR__ . '/../config.php';

class Response
{
    /**
     * Setzt CORS Headers
     */
    public static function setCorsHeaders(): void
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $allowedOrigins = CORS_ALLOWED_ORIGINS;

        if (in_array($origin, $allowedOrigins)) {
            header("Access-Control-Allow-Origin: $origin");
        } else {
            header('Access-Control-Allow-Origin: https://petasync.de');
        }

        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }

    /**
     * Behandelt OPTIONS Preflight-Requests
     */
    public static function handlePreflight(): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            self::setCorsHeaders();
            http_response_code(200);
            exit;
        }
    }

    /**
     * Sendet eine erfolgreiche Response
     */
    public static function success($data = null, string $message = null, int $code = 200): void
    {
        self::setCorsHeaders();
        http_response_code($code);

        $response = ['success' => true];
        if ($data !== null) {
            $response['data'] = $data;
        }
        if ($message !== null) {
            $response['message'] = $message;
        }

        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Sendet eine Fehler-Response
     */
    public static function error(string $message, int $code = 400, array $details = null): void
    {
        self::setCorsHeaders();
        http_response_code($code);

        $response = [
            'success' => false,
            'error' => $message
        ];
        if ($details !== null && API_DEBUG) {
            $response['details'] = $details;
        }

        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * 401 Unauthorized
     */
    public static function unauthorized(string $message = 'Unauthorized'): void
    {
        self::error($message, 401);
    }

    /**
     * 403 Forbidden
     */
    public static function forbidden(string $message = 'Forbidden'): void
    {
        self::error($message, 403);
    }

    /**
     * 404 Not Found
     */
    public static function notFound(string $message = 'Not found'): void
    {
        self::error($message, 404);
    }

    /**
     * 500 Internal Server Error
     */
    public static function serverError(string $message = 'Internal server error'): void
    {
        self::error($message, 500);
    }

    /**
     * Sendet eine paginierte Response
     */
    public static function paginated(array $items, int $total, int $page, int $limit): void
    {
        self::success([
            'items' => $items,
            'pagination' => [
                'total' => $total,
                'page' => $page,
                'limit' => $limit,
                'pages' => ceil($total / $limit)
            ]
        ]);
    }
}
