<?php
/**
 * Simple PHP Router
 */

class Router
{
    private array $routes = [];
    private string $basePath;

    public function __construct(string $basePath = '/api')
    {
        $this->basePath = $basePath;
    }

    /**
     * Registriert eine Route
     */
    public function add(string $method, string $path, callable $handler): void
    {
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'handler' => $handler
        ];
    }

    /**
     * GET Route
     */
    public function get(string $path, callable $handler): void
    {
        $this->add('GET', $path, $handler);
    }

    /**
     * POST Route
     */
    public function post(string $path, callable $handler): void
    {
        $this->add('POST', $path, $handler);
    }

    /**
     * PUT Route
     */
    public function put(string $path, callable $handler): void
    {
        $this->add('PUT', $path, $handler);
    }

    /**
     * DELETE Route
     */
    public function delete(string $path, callable $handler): void
    {
        $this->add('DELETE', $path, $handler);
    }

    /**
     * PATCH Route
     */
    public function patch(string $path, callable $handler): void
    {
        $this->add('PATCH', $path, $handler);
    }

    /**
     * Verarbeitet den Request
     */
    public function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // Entferne Basis-Pfad
        if (strpos($uri, $this->basePath) === 0) {
            $uri = substr($uri, strlen($this->basePath));
        }

        // Entferne trailing slash
        $uri = rtrim($uri, '/');
        if ($uri === '') {
            $uri = '/';
        }

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) {
                continue;
            }

            $params = $this->matchRoute($route['path'], $uri);
            if ($params !== false) {
                call_user_func($route['handler'], $params);
                return;
            }
        }

        // Keine Route gefunden
        Response::notFound('Endpoint nicht gefunden');
    }

    /**
     * Prüft ob eine Route matcht und extrahiert Parameter
     */
    private function matchRoute(string $routePath, string $uri): array|false
    {
        // Konvertiere Route-Pattern zu Regex
        // z.B. /users/{id} wird zu /users/([^/]+)
        $pattern = preg_replace('/\{([^}]+)\}/', '([^/]+)', $routePath);
        $pattern = '#^' . $pattern . '$#';

        if (preg_match($pattern, $uri, $matches)) {
            // Extrahiere Parameter-Namen aus Route
            preg_match_all('/\{([^}]+)\}/', $routePath, $paramNames);

            $params = [];
            foreach ($paramNames[1] as $index => $name) {
                $params[$name] = $matches[$index + 1] ?? null;
            }

            return $params;
        }

        return false;
    }

    /**
     * Holt den Request-Body als Array
     */
    public static function getJsonBody(): array
    {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        return $data ?? [];
    }

    /**
     * Holt einen Query-Parameter
     */
    public static function getQuery(string $key, $default = null)
    {
        return $_GET[$key] ?? $default;
    }

    /**
     * Holt mehrere Query-Parameter
     */
    public static function getQueryParams(): array
    {
        return $_GET;
    }
}
