<?php
/**
 * Database Connection Handler für PostgreSQL
 */

require_once __DIR__ . '/../config.php';

class Database
{
    private static ?PDO $instance = null;

    /**
     * Singleton-Pattern für Datenbankverbindung
     */
    public static function getConnection(): PDO
    {
        if (self::$instance === null) {
            try {
                $dsn = sprintf(
                    "pgsql:host=%s;port=%s;dbname=%s",
                    DB_HOST,
                    DB_PORT,
                    DB_NAME
                );

                self::$instance = new PDO($dsn, DB_USER, DB_PASS, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);

                // Setze Zeitzone
                self::$instance->exec("SET TIME ZONE 'Europe/Berlin'");

            } catch (PDOException $e) {
                if (API_DEBUG) {
                    throw new Exception("Database connection failed: " . $e->getMessage());
                }
                throw new Exception("Database connection failed");
            }
        }

        return self::$instance;
    }

    /**
     * Führt eine SELECT-Query aus und gibt alle Ergebnisse zurück
     */
    public static function query(string $sql, array $params = []): array
    {
        $stmt = self::getConnection()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    /**
     * Führt eine SELECT-Query aus und gibt ein einzelnes Ergebnis zurück
     */
    public static function queryOne(string $sql, array $params = []): ?array
    {
        $stmt = self::getConnection()->prepare($sql);
        $stmt->execute($params);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    /**
     * Führt INSERT/UPDATE/DELETE aus und gibt die Anzahl betroffener Zeilen zurück
     */
    public static function execute(string $sql, array $params = []): int
    {
        $stmt = self::getConnection()->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount();
    }

    /**
     * Fügt einen Datensatz ein und gibt die neue ID zurück
     */
    public static function insert(string $table, array $data): string
    {
        $columns = array_keys($data);
        $placeholders = array_map(fn($col) => ":$col", $columns);

        $sql = sprintf(
            "INSERT INTO %s (%s) VALUES (%s) RETURNING id",
            $table,
            implode(', ', $columns),
            implode(', ', $placeholders)
        );

        $stmt = self::getConnection()->prepare($sql);
        $stmt->execute($data);
        $result = $stmt->fetch();
        return $result['id'];
    }

    /**
     * Aktualisiert einen Datensatz
     */
    public static function update(string $table, string $id, array $data): int
    {
        $sets = array_map(fn($col) => "$col = :$col", array_keys($data));
        $data['id'] = $id;

        $sql = sprintf(
            "UPDATE %s SET %s WHERE id = :id",
            $table,
            implode(', ', $sets)
        );

        return self::execute($sql, $data);
    }

    /**
     * Löscht einen Datensatz
     */
    public static function delete(string $table, string $id): int
    {
        $sql = "DELETE FROM $table WHERE id = :id";
        return self::execute($sql, ['id' => $id]);
    }

    /**
     * Startet eine Transaktion
     */
    public static function beginTransaction(): void
    {
        self::getConnection()->beginTransaction();
    }

    /**
     * Committed eine Transaktion
     */
    public static function commit(): void
    {
        self::getConnection()->commit();
    }

    /**
     * Rollback einer Transaktion
     */
    public static function rollback(): void
    {
        self::getConnection()->rollBack();
    }
}
