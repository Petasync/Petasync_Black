<?php
/**
 * Petasync API v1
 *
 * Alle CRUD-Endpoints für die Admin-Anwendung
 *
 * Ressourcen:
 * - /customers
 * - /inquiries
 * - /appointments
 * - /quotes
 * - /invoices
 * - /jobs
 * - /website-projects
 * - /service-catalog
 * - /settings
 * - /recurring-invoices
 * - /dashboard
 * - /export
 */

require_once __DIR__ . '/lib/Response.php';
require_once __DIR__ . '/lib/Database.php';
require_once __DIR__ . '/lib/Auth.php';
require_once __DIR__ . '/lib/Router.php';

// CORS und Preflight
Response::handlePreflight();

$router = new Router('/api/v1');

// ============================================
// DASHBOARD
// ============================================
$router->get('/dashboard/stats', function () {
    Auth::requireAdmin();

    $stats = Database::queryOne("SELECT * FROM dashboard_stats");
    Response::success($stats);
});

$router->get('/dashboard/monthly-revenue', function () {
    Auth::requireAdmin();

    $data = Database::query("SELECT * FROM monthly_revenue LIMIT 12");
    Response::success($data);
});

$router->get('/dashboard/recent-activity', function () {
    Auth::requireAdmin();

    // Letzte Anfragen
    $inquiries = Database::query(
        "SELECT id, name, email, subject, status, created_at FROM inquiries
         ORDER BY created_at DESC LIMIT 5"
    );

    // Letzte Rechnungen
    $invoices = Database::query(
        "SELECT i.id, i.invoice_number, i.total, i.status, i.created_at,
                c.company_name, c.first_name, c.last_name
         FROM invoices i
         LEFT JOIN customers c ON c.id = i.customer_id
         ORDER BY i.created_at DESC LIMIT 5"
    );

    // Anstehende Termine
    $appointments = Database::query(
        "SELECT a.id, a.title, a.scheduled_at, a.status,
                c.company_name, c.first_name, c.last_name
         FROM appointments a
         LEFT JOIN customers c ON c.id = a.customer_id
         WHERE a.scheduled_at >= CURRENT_DATE
         ORDER BY a.scheduled_at ASC LIMIT 5"
    );

    Response::success([
        'inquiries' => $inquiries,
        'invoices' => $invoices,
        'appointments' => $appointments
    ]);
});

// ============================================
// CUSTOMERS
// ============================================
$router->get('/customers', function () {
    Auth::requireAdmin();

    $search = Router::getQuery('search');
    $type = Router::getQuery('type');
    $page = (int)Router::getQuery('page', 1);
    $limit = (int)Router::getQuery('limit', 50);
    $offset = ($page - 1) * $limit;

    $where = [];
    $params = [];

    if ($search) {
        $where[] = "(company_name ILIKE :search OR last_name ILIKE :search OR email ILIKE :search)";
        $params['search'] = "%$search%";
    }
    if ($type) {
        $where[] = "customer_type = :type";
        $params['type'] = $type;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $total = Database::queryOne("SELECT COUNT(*) as count FROM customers $whereClause", $params)['count'];
    $items = Database::query(
        "SELECT * FROM customers $whereClause ORDER BY created_at DESC LIMIT $limit OFFSET $offset",
        $params
    );

    Response::paginated($items, $total, $page, $limit);
});

$router->get('/customers/{id}', function ($params) {
    Auth::requireAdmin();

    $customer = Database::queryOne("SELECT * FROM customers WHERE id = :id", ['id' => $params['id']]);
    if (!$customer) {
        Response::notFound('Kunde nicht gefunden');
    }

    // Zugehörige Daten laden
    $customer['quotes'] = Database::query(
        "SELECT id, quote_number, status, total, created_at FROM quotes WHERE customer_id = :id ORDER BY created_at DESC",
        ['id' => $params['id']]
    );
    $customer['invoices'] = Database::query(
        "SELECT id, invoice_number, status, total, created_at FROM invoices WHERE customer_id = :id ORDER BY created_at DESC",
        ['id' => $params['id']]
    );
    $customer['jobs'] = Database::query(
        "SELECT id, title, status, created_at FROM jobs WHERE customer_id = :id ORDER BY created_at DESC",
        ['id' => $params['id']]
    );

    Response::success($customer);
});

$router->post('/customers', function () {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    if (empty($body['last_name'])) {
        Response::error('Nachname ist erforderlich', 400);
    }

    // Kundennummer generieren
    $customerNumber = Database::queryOne("SELECT get_next_number('customer') as num")['num'];
    $body['customer_number'] = $customerNumber;

    // Tags als Array formatieren
    if (isset($body['tags']) && is_array($body['tags'])) {
        $body['tags'] = '{' . implode(',', array_map(fn($t) => '"' . addslashes($t) . '"', $body['tags'])) . '}';
    }

    $id = Database::insert('customers', $body);
    $customer = Database::queryOne("SELECT * FROM customers WHERE id = :id", ['id' => $id]);

    Response::success($customer, 'Kunde erstellt', 201);
});

$router->put('/customers/{id}', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    // Tags als Array formatieren
    if (isset($body['tags']) && is_array($body['tags'])) {
        $body['tags'] = '{' . implode(',', array_map(fn($t) => '"' . addslashes($t) . '"', $body['tags'])) . '}';
    }

    Database::update('customers', $params['id'], $body);
    $customer = Database::queryOne("SELECT * FROM customers WHERE id = :id", ['id' => $params['id']]);

    Response::success($customer, 'Kunde aktualisiert');
});

$router->delete('/customers/{id}', function ($params) {
    Auth::requireAdmin();

    Database::delete('customers', $params['id']);
    Response::success(null, 'Kunde gelöscht');
});

// ============================================
// INQUIRIES
// ============================================
$router->get('/inquiries', function () {
    Auth::requireAdmin();

    $status = Router::getQuery('status');
    $page = (int)Router::getQuery('page', 1);
    $limit = (int)Router::getQuery('limit', 50);
    $offset = ($page - 1) * $limit;

    $where = [];
    $params = [];

    if ($status) {
        $where[] = "status = :status";
        $params['status'] = $status;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $total = Database::queryOne("SELECT COUNT(*) as count FROM inquiries $whereClause", $params)['count'];
    $items = Database::query(
        "SELECT i.*, c.customer_number, c.company_name as customer_company
         FROM inquiries i
         LEFT JOIN customers c ON c.id = i.customer_id
         $whereClause ORDER BY i.created_at DESC LIMIT $limit OFFSET $offset",
        $params
    );

    Response::paginated($items, $total, $page, $limit);
});

$router->get('/inquiries/{id}', function ($params) {
    Auth::requireAdmin();

    $inquiry = Database::queryOne(
        "SELECT i.*, c.customer_number, c.company_name as customer_company
         FROM inquiries i
         LEFT JOIN customers c ON c.id = i.customer_id
         WHERE i.id = :id",
        ['id' => $params['id']]
    );
    if (!$inquiry) {
        Response::notFound('Anfrage nicht gefunden');
    }

    Response::success($inquiry);
});

$router->post('/inquiries', function () {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    if (empty($body['name']) || empty($body['email']) || empty($body['message'])) {
        Response::error('Name, Email und Nachricht sind erforderlich', 400);
    }

    $id = Database::insert('inquiries', $body);
    $inquiry = Database::queryOne("SELECT * FROM inquiries WHERE id = :id", ['id' => $id]);

    Response::success($inquiry, 'Anfrage erstellt', 201);
});

$router->put('/inquiries/{id}', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    Database::update('inquiries', $params['id'], $body);
    $inquiry = Database::queryOne("SELECT * FROM inquiries WHERE id = :id", ['id' => $params['id']]);

    Response::success($inquiry, 'Anfrage aktualisiert');
});

$router->delete('/inquiries/{id}', function ($params) {
    Auth::requireAdmin();

    Database::delete('inquiries', $params['id']);
    Response::success(null, 'Anfrage gelöscht');
});

// ============================================
// APPOINTMENTS
// ============================================
$router->get('/appointments', function () {
    Auth::requireAdmin();

    $from = Router::getQuery('from');
    $to = Router::getQuery('to');
    $status = Router::getQuery('status');

    $where = [];
    $params = [];

    if ($from) {
        $where[] = "scheduled_at >= :from";
        $params['from'] = $from;
    }
    if ($to) {
        $where[] = "scheduled_at <= :to";
        $params['to'] = $to;
    }
    if ($status) {
        $where[] = "status = :status";
        $params['status'] = $status;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $items = Database::query(
        "SELECT a.*, c.company_name, c.first_name, c.last_name, c.phone as customer_phone
         FROM appointments a
         LEFT JOIN customers c ON c.id = a.customer_id
         $whereClause ORDER BY a.scheduled_at ASC",
        $params
    );

    Response::success($items);
});

$router->get('/appointments/{id}', function ($params) {
    Auth::requireAdmin();

    $appointment = Database::queryOne(
        "SELECT a.*, c.company_name, c.first_name, c.last_name
         FROM appointments a
         LEFT JOIN customers c ON c.id = a.customer_id
         WHERE a.id = :id",
        ['id' => $params['id']]
    );
    if (!$appointment) {
        Response::notFound('Termin nicht gefunden');
    }

    Response::success($appointment);
});

$router->post('/appointments', function () {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    if (empty($body['title']) || empty($body['scheduled_at'])) {
        Response::error('Titel und Datum sind erforderlich', 400);
    }

    $id = Database::insert('appointments', $body);
    $appointment = Database::queryOne("SELECT * FROM appointments WHERE id = :id", ['id' => $id]);

    Response::success($appointment, 'Termin erstellt', 201);
});

$router->put('/appointments/{id}', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    Database::update('appointments', $params['id'], $body);
    $appointment = Database::queryOne("SELECT * FROM appointments WHERE id = :id", ['id' => $params['id']]);

    Response::success($appointment, 'Termin aktualisiert');
});

$router->delete('/appointments/{id}', function ($params) {
    Auth::requireAdmin();

    Database::delete('appointments', $params['id']);
    Response::success(null, 'Termin gelöscht');
});

// ============================================
// SERVICE CATALOG
// ============================================
$router->get('/service-catalog', function () {
    Auth::requireAdmin();

    $active = Router::getQuery('active');
    $category = Router::getQuery('category');

    $where = [];
    $params = [];

    if ($active !== null) {
        $where[] = "is_active = :active";
        $params['active'] = $active === 'true';
    }
    if ($category) {
        $where[] = "category = :category";
        $params['category'] = $category;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $items = Database::query("SELECT * FROM service_catalog $whereClause ORDER BY sort_order, name", $params);
    Response::success($items);
});

$router->post('/service-catalog', function () {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    if (empty($body['name'])) {
        Response::error('Name ist erforderlich', 400);
    }

    $id = Database::insert('service_catalog', $body);
    $service = Database::queryOne("SELECT * FROM service_catalog WHERE id = :id", ['id' => $id]);

    Response::success($service, 'Service erstellt', 201);
});

$router->put('/service-catalog/{id}', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    Database::update('service_catalog', $params['id'], $body);
    $service = Database::queryOne("SELECT * FROM service_catalog WHERE id = :id", ['id' => $params['id']]);

    Response::success($service, 'Service aktualisiert');
});

$router->delete('/service-catalog/{id}', function ($params) {
    Auth::requireAdmin();

    Database::delete('service_catalog', $params['id']);
    Response::success(null, 'Service gelöscht');
});

// ============================================
// QUOTES
// ============================================
$router->get('/quotes', function () {
    Auth::requireAdmin();

    $status = Router::getQuery('status');
    $customerId = Router::getQuery('customer_id');
    $page = (int)Router::getQuery('page', 1);
    $limit = (int)Router::getQuery('limit', 50);
    $offset = ($page - 1) * $limit;

    $where = [];
    $params = [];

    if ($status) {
        $where[] = "q.status = :status";
        $params['status'] = $status;
    }
    if ($customerId) {
        $where[] = "q.customer_id = :customer_id";
        $params['customer_id'] = $customerId;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $total = Database::queryOne("SELECT COUNT(*) as count FROM quotes q $whereClause", $params)['count'];
    $items = Database::query(
        "SELECT q.*, c.company_name, c.first_name, c.last_name, c.email as customer_email
         FROM quotes q
         LEFT JOIN customers c ON c.id = q.customer_id
         $whereClause ORDER BY q.created_at DESC LIMIT $limit OFFSET $offset",
        $params
    );

    Response::paginated($items, $total, $page, $limit);
});

$router->get('/quotes/{id}', function ($params) {
    Auth::requireAdmin();

    $quote = Database::queryOne(
        "SELECT q.*, c.company_name, c.first_name, c.last_name, c.email as customer_email,
                c.street, c.zip, c.city, c.phone as customer_phone
         FROM quotes q
         LEFT JOIN customers c ON c.id = q.customer_id
         WHERE q.id = :id",
        ['id' => $params['id']]
    );
    if (!$quote) {
        Response::notFound('Angebot nicht gefunden');
    }

    // Positionen laden
    $quote['items'] = Database::query(
        "SELECT qi.*, sc.name as service_name
         FROM quote_items qi
         LEFT JOIN service_catalog sc ON sc.id = qi.service_id
         WHERE qi.quote_id = :id ORDER BY qi.position",
        ['id' => $params['id']]
    );

    Response::success($quote);
});

$router->post('/quotes', function () {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    // Angebotsnummer generieren
    $quoteNumber = Database::queryOne("SELECT get_next_number('quote') as num")['num'];

    Database::beginTransaction();
    try {
        $quoteData = [
            'quote_number' => $quoteNumber,
            'customer_id' => $body['customer_id'] ?? null,
            'inquiry_id' => $body['inquiry_id'] ?? null,
            'status' => $body['status'] ?? 'entwurf',
            'quote_date' => $body['quote_date'] ?? date('Y-m-d'),
            'valid_until' => $body['valid_until'] ?? null,
            'subtotal' => $body['subtotal'] ?? 0,
            'discount_percent' => $body['discount_percent'] ?? 0,
            'discount_amount' => $body['discount_amount'] ?? 0,
            'total' => $body['total'] ?? 0,
            'notes' => $body['notes'] ?? null,
            'terms' => $body['terms'] ?? null,
        ];

        $quoteId = Database::insert('quotes', $quoteData);

        // Positionen einfügen
        if (!empty($body['items'])) {
            foreach ($body['items'] as $index => $item) {
                Database::insert('quote_items', [
                    'quote_id' => $quoteId,
                    'service_id' => $item['service_id'] ?? null,
                    'position' => $index + 1,
                    'description' => $item['description'],
                    'quantity' => $item['quantity'] ?? 1,
                    'unit' => $item['unit'] ?? 'Stk.',
                    'unit_price' => $item['unit_price'],
                    'discount_percent' => $item['discount_percent'] ?? 0,
                    'total' => $item['total'],
                ]);
            }
        }

        Database::commit();

        $quote = Database::queryOne("SELECT * FROM quotes WHERE id = :id", ['id' => $quoteId]);
        Response::success($quote, 'Angebot erstellt', 201);

    } catch (Exception $e) {
        Database::rollback();
        Response::error('Fehler beim Erstellen: ' . $e->getMessage(), 500);
    }
});

$router->put('/quotes/{id}', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    Database::beginTransaction();
    try {
        // Quote aktualisieren
        $quoteData = array_filter([
            'customer_id' => $body['customer_id'] ?? null,
            'status' => $body['status'] ?? null,
            'quote_date' => $body['quote_date'] ?? null,
            'valid_until' => $body['valid_until'] ?? null,
            'subtotal' => $body['subtotal'] ?? null,
            'discount_percent' => $body['discount_percent'] ?? null,
            'discount_amount' => $body['discount_amount'] ?? null,
            'total' => $body['total'] ?? null,
            'notes' => $body['notes'] ?? null,
            'terms' => $body['terms'] ?? null,
            'sent_at' => $body['sent_at'] ?? null,
            'accepted_at' => $body['accepted_at'] ?? null,
        ], fn($v) => $v !== null);

        if ($quoteData) {
            Database::update('quotes', $params['id'], $quoteData);
        }

        // Positionen aktualisieren (alle löschen und neu erstellen)
        if (isset($body['items'])) {
            Database::execute("DELETE FROM quote_items WHERE quote_id = :id", ['id' => $params['id']]);

            foreach ($body['items'] as $index => $item) {
                Database::insert('quote_items', [
                    'quote_id' => $params['id'],
                    'service_id' => $item['service_id'] ?? null,
                    'position' => $index + 1,
                    'description' => $item['description'],
                    'quantity' => $item['quantity'] ?? 1,
                    'unit' => $item['unit'] ?? 'Stk.',
                    'unit_price' => $item['unit_price'],
                    'discount_percent' => $item['discount_percent'] ?? 0,
                    'total' => $item['total'],
                ]);
            }
        }

        Database::commit();

        $quote = Database::queryOne("SELECT * FROM quotes WHERE id = :id", ['id' => $params['id']]);
        Response::success($quote, 'Angebot aktualisiert');

    } catch (Exception $e) {
        Database::rollback();
        Response::error('Fehler beim Aktualisieren: ' . $e->getMessage(), 500);
    }
});

$router->delete('/quotes/{id}', function ($params) {
    Auth::requireAdmin();

    Database::delete('quotes', $params['id']);
    Response::success(null, 'Angebot gelöscht');
});

// Quote Items (separate endpoint)
$router->get('/quotes/{id}/items', function ($params) {
    Auth::requireAdmin();

    $items = Database::query(
        "SELECT qi.*, sc.name as service_name
         FROM quote_items qi
         LEFT JOIN service_catalog sc ON sc.id = qi.service_id
         WHERE qi.quote_id = :id ORDER BY qi.position",
        ['id' => $params['id']]
    );

    Response::success($items);
});

$router->put('/quotes/{id}/items', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    Database::beginTransaction();
    try {
        // Alte Items löschen
        Database::execute("DELETE FROM quote_items WHERE quote_id = :id", ['id' => $params['id']]);

        // Neue Items einfügen
        $items = $body['items'] ?? $body;
        if (is_array($items)) {
            foreach ($items as $index => $item) {
                Database::insert('quote_items', [
                    'quote_id' => $params['id'],
                    'service_id' => $item['service_id'] ?? null,
                    'position' => $item['position'] ?? $index + 1,
                    'description' => $item['description'],
                    'quantity' => $item['quantity'] ?? 1,
                    'unit' => $item['unit'] ?? 'Stk.',
                    'unit_price' => $item['unit_price'],
                    'discount_percent' => $item['discount_percent'] ?? 0,
                    'total' => $item['total'],
                ]);
            }
        }

        Database::commit();

        $savedItems = Database::query(
            "SELECT * FROM quote_items WHERE quote_id = :id ORDER BY position",
            ['id' => $params['id']]
        );
        Response::success($savedItems, 'Positionen gespeichert');

    } catch (Exception $e) {
        Database::rollback();
        Response::error('Fehler beim Speichern: ' . $e->getMessage(), 500);
    }
});

// ============================================
// INVOICES
// ============================================
$router->get('/invoices', function () {
    Auth::requireAdmin();

    $status = Router::getQuery('status');
    $customerId = Router::getQuery('customer_id');
    $page = (int)Router::getQuery('page', 1);
    $limit = (int)Router::getQuery('limit', 50);
    $offset = ($page - 1) * $limit;

    $where = [];
    $params = [];

    if ($status) {
        $where[] = "i.status = :status";
        $params['status'] = $status;
    }
    if ($customerId) {
        $where[] = "i.customer_id = :customer_id";
        $params['customer_id'] = $customerId;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $total = Database::queryOne("SELECT COUNT(*) as count FROM invoices i $whereClause", $params)['count'];
    $items = Database::query(
        "SELECT i.*, c.company_name, c.first_name, c.last_name, c.email as customer_email
         FROM invoices i
         LEFT JOIN customers c ON c.id = i.customer_id
         $whereClause ORDER BY i.created_at DESC LIMIT $limit OFFSET $offset",
        $params
    );

    Response::paginated($items, $total, $page, $limit);
});

$router->get('/invoices/{id}', function ($params) {
    Auth::requireAdmin();

    $invoice = Database::queryOne(
        "SELECT i.*, c.company_name, c.first_name, c.last_name, c.email as customer_email,
                c.street, c.zip, c.city, c.phone as customer_phone
         FROM invoices i
         LEFT JOIN customers c ON c.id = i.customer_id
         WHERE i.id = :id",
        ['id' => $params['id']]
    );
    if (!$invoice) {
        Response::notFound('Rechnung nicht gefunden');
    }

    // Positionen laden
    $invoice['items'] = Database::query(
        "SELECT ii.*, sc.name as service_name
         FROM invoice_items ii
         LEFT JOIN service_catalog sc ON sc.id = ii.service_id
         WHERE ii.invoice_id = :id ORDER BY ii.position",
        ['id' => $params['id']]
    );

    Response::success($invoice);
});

$router->post('/invoices', function () {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    // Rechnungsnummer generieren
    $invoiceNumber = Database::queryOne("SELECT get_next_number('invoice') as num")['num'];

    Database::beginTransaction();
    try {
        $invoiceData = [
            'invoice_number' => $invoiceNumber,
            'customer_id' => $body['customer_id'] ?? null,
            'quote_id' => $body['quote_id'] ?? null,
            'recurring_invoice_id' => $body['recurring_invoice_id'] ?? null,
            'status' => $body['status'] ?? 'entwurf',
            'invoice_date' => $body['invoice_date'] ?? date('Y-m-d'),
            'delivery_date' => $body['delivery_date'] ?? null,
            'due_date' => $body['due_date'] ?? null,
            'subtotal' => $body['subtotal'] ?? 0,
            'discount_percent' => $body['discount_percent'] ?? 0,
            'discount_amount' => $body['discount_amount'] ?? 0,
            'total' => $body['total'] ?? 0,
            'notes' => $body['notes'] ?? null,
            'payment_terms' => $body['payment_terms'] ?? null,
            'payment_method' => $body['payment_method'] ?? null,
        ];

        $invoiceId = Database::insert('invoices', $invoiceData);

        // Positionen einfügen
        if (!empty($body['items'])) {
            foreach ($body['items'] as $index => $item) {
                Database::insert('invoice_items', [
                    'invoice_id' => $invoiceId,
                    'service_id' => $item['service_id'] ?? null,
                    'position' => $index + 1,
                    'description' => $item['description'],
                    'quantity' => $item['quantity'] ?? 1,
                    'unit' => $item['unit'] ?? 'Stk.',
                    'unit_price' => $item['unit_price'],
                    'discount_percent' => $item['discount_percent'] ?? 0,
                    'total' => $item['total'],
                ]);
            }
        }

        // Kunden-Umsatz aktualisieren
        if ($body['customer_id'] && ($body['status'] ?? 'entwurf') === 'bezahlt') {
            Database::execute(
                "UPDATE customers SET total_revenue = total_revenue + :amount WHERE id = :id",
                ['amount' => $body['total'] ?? 0, 'id' => $body['customer_id']]
            );
        }

        Database::commit();

        $invoice = Database::queryOne("SELECT * FROM invoices WHERE id = :id", ['id' => $invoiceId]);
        Response::success($invoice, 'Rechnung erstellt', 201);

    } catch (Exception $e) {
        Database::rollback();
        Response::error('Fehler beim Erstellen: ' . $e->getMessage(), 500);
    }
});

$router->put('/invoices/{id}', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    Database::beginTransaction();
    try {
        // Alte Rechnung für Umsatz-Berechnung holen
        $oldInvoice = Database::queryOne("SELECT * FROM invoices WHERE id = :id", ['id' => $params['id']]);

        $invoiceData = array_filter([
            'customer_id' => $body['customer_id'] ?? null,
            'status' => $body['status'] ?? null,
            'invoice_date' => $body['invoice_date'] ?? null,
            'delivery_date' => $body['delivery_date'] ?? null,
            'due_date' => $body['due_date'] ?? null,
            'subtotal' => $body['subtotal'] ?? null,
            'discount_percent' => $body['discount_percent'] ?? null,
            'discount_amount' => $body['discount_amount'] ?? null,
            'total' => $body['total'] ?? null,
            'notes' => $body['notes'] ?? null,
            'payment_terms' => $body['payment_terms'] ?? null,
            'payment_method' => $body['payment_method'] ?? null,
            'sent_at' => $body['sent_at'] ?? null,
            'paid_at' => $body['paid_at'] ?? null,
            'paid_amount' => $body['paid_amount'] ?? null,
        ], fn($v) => $v !== null);

        if ($invoiceData) {
            Database::update('invoices', $params['id'], $invoiceData);
        }

        // Positionen aktualisieren
        if (isset($body['items'])) {
            Database::execute("DELETE FROM invoice_items WHERE invoice_id = :id", ['id' => $params['id']]);

            foreach ($body['items'] as $index => $item) {
                Database::insert('invoice_items', [
                    'invoice_id' => $params['id'],
                    'service_id' => $item['service_id'] ?? null,
                    'position' => $index + 1,
                    'description' => $item['description'],
                    'quantity' => $item['quantity'] ?? 1,
                    'unit' => $item['unit'] ?? 'Stk.',
                    'unit_price' => $item['unit_price'],
                    'discount_percent' => $item['discount_percent'] ?? 0,
                    'total' => $item['total'],
                ]);
            }
        }

        // Kunden-Umsatz aktualisieren wenn Status auf bezahlt geändert
        $newStatus = $body['status'] ?? $oldInvoice['status'];
        $customerId = $body['customer_id'] ?? $oldInvoice['customer_id'];
        $newTotal = $body['total'] ?? $oldInvoice['total'];

        if ($customerId) {
            // Wenn vorher bezahlt war, Umsatz abziehen
            if ($oldInvoice['status'] === 'bezahlt' && $newStatus !== 'bezahlt') {
                Database::execute(
                    "UPDATE customers SET total_revenue = total_revenue - :amount WHERE id = :id",
                    ['amount' => $oldInvoice['total'], 'id' => $oldInvoice['customer_id']]
                );
            }
            // Wenn jetzt bezahlt, Umsatz hinzufügen
            if ($newStatus === 'bezahlt' && $oldInvoice['status'] !== 'bezahlt') {
                Database::execute(
                    "UPDATE customers SET total_revenue = total_revenue + :amount WHERE id = :id",
                    ['amount' => $newTotal, 'id' => $customerId]
                );
            }
        }

        Database::commit();

        $invoice = Database::queryOne("SELECT * FROM invoices WHERE id = :id", ['id' => $params['id']]);
        Response::success($invoice, 'Rechnung aktualisiert');

    } catch (Exception $e) {
        Database::rollback();
        Response::error('Fehler beim Aktualisieren: ' . $e->getMessage(), 500);
    }
});

$router->delete('/invoices/{id}', function ($params) {
    Auth::requireAdmin();

    Database::delete('invoices', $params['id']);
    Response::success(null, 'Rechnung gelöscht');
});

// Invoice Items (separate endpoint)
$router->get('/invoices/{id}/items', function ($params) {
    Auth::requireAdmin();

    $items = Database::query(
        "SELECT ii.*, sc.name as service_name
         FROM invoice_items ii
         LEFT JOIN service_catalog sc ON sc.id = ii.service_id
         WHERE ii.invoice_id = :id ORDER BY ii.position",
        ['id' => $params['id']]
    );

    Response::success($items);
});

$router->put('/invoices/{id}/items', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    Database::beginTransaction();
    try {
        // Alte Items löschen
        Database::execute("DELETE FROM invoice_items WHERE invoice_id = :id", ['id' => $params['id']]);

        // Neue Items einfügen
        $items = $body['items'] ?? $body;
        if (is_array($items)) {
            foreach ($items as $index => $item) {
                Database::insert('invoice_items', [
                    'invoice_id' => $params['id'],
                    'service_id' => $item['service_id'] ?? null,
                    'position' => $item['position'] ?? $index + 1,
                    'description' => $item['description'],
                    'quantity' => $item['quantity'] ?? 1,
                    'unit' => $item['unit'] ?? 'Stk.',
                    'unit_price' => $item['unit_price'],
                    'discount_percent' => $item['discount_percent'] ?? 0,
                    'total' => $item['total'],
                ]);
            }
        }

        Database::commit();

        $savedItems = Database::query(
            "SELECT * FROM invoice_items WHERE invoice_id = :id ORDER BY position",
            ['id' => $params['id']]
        );
        Response::success($savedItems, 'Positionen gespeichert');

    } catch (Exception $e) {
        Database::rollback();
        Response::error('Fehler beim Speichern: ' . $e->getMessage(), 500);
    }
});

// ============================================
// JOBS
// ============================================
$router->get('/jobs', function () {
    Auth::requireAdmin();

    $status = Router::getQuery('status');
    $customerId = Router::getQuery('customer_id');

    $where = [];
    $params = [];

    if ($status) {
        $where[] = "j.status = :status";
        $params['status'] = $status;
    }
    if ($customerId) {
        $where[] = "j.customer_id = :customer_id";
        $params['customer_id'] = $customerId;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $items = Database::query(
        "SELECT j.*, c.company_name, c.first_name, c.last_name
         FROM jobs j
         LEFT JOIN customers c ON c.id = j.customer_id
         $whereClause ORDER BY j.created_at DESC",
        $params
    );

    Response::success($items);
});

$router->get('/jobs/{id}', function ($params) {
    Auth::requireAdmin();

    $job = Database::queryOne(
        "SELECT j.*, c.company_name, c.first_name, c.last_name,
                q.quote_number, i.invoice_number
         FROM jobs j
         LEFT JOIN customers c ON c.id = j.customer_id
         LEFT JOIN quotes q ON q.id = j.quote_id
         LEFT JOIN invoices i ON i.id = j.invoice_id
         WHERE j.id = :id",
        ['id' => $params['id']]
    );
    if (!$job) {
        Response::notFound('Auftrag nicht gefunden');
    }

    Response::success($job);
});

$router->post('/jobs', function () {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    if (empty($body['title'])) {
        Response::error('Titel ist erforderlich', 400);
    }

    $id = Database::insert('jobs', $body);
    $job = Database::queryOne("SELECT * FROM jobs WHERE id = :id", ['id' => $id]);

    Response::success($job, 'Auftrag erstellt', 201);
});

$router->put('/jobs/{id}', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    Database::update('jobs', $params['id'], $body);
    $job = Database::queryOne("SELECT * FROM jobs WHERE id = :id", ['id' => $params['id']]);

    Response::success($job, 'Auftrag aktualisiert');
});

$router->delete('/jobs/{id}', function ($params) {
    Auth::requireAdmin();

    Database::delete('jobs', $params['id']);
    Response::success(null, 'Auftrag gelöscht');
});

// ============================================
// WEBSITE PROJECTS
// ============================================
$router->get('/website-projects', function () {
    Auth::requireAdmin();

    $status = Router::getQuery('status');

    $where = [];
    $params = [];

    if ($status) {
        $where[] = "wp.status = :status";
        $params['status'] = $status;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $items = Database::query(
        "SELECT wp.*, c.company_name, c.first_name, c.last_name
         FROM website_projects wp
         LEFT JOIN customers c ON c.id = wp.customer_id
         $whereClause ORDER BY wp.created_at DESC",
        $params
    );

    Response::success($items);
});

$router->get('/website-projects/{id}', function ($params) {
    Auth::requireAdmin();

    $project = Database::queryOne(
        "SELECT wp.*, c.company_name, c.first_name, c.last_name, c.email as customer_email
         FROM website_projects wp
         LEFT JOIN customers c ON c.id = wp.customer_id
         WHERE wp.id = :id",
        ['id' => $params['id']]
    );
    if (!$project) {
        Response::notFound('Projekt nicht gefunden');
    }

    Response::success($project);
});

$router->post('/website-projects', function () {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    if (empty($body['project_name'])) {
        Response::error('Projektname ist erforderlich', 400);
    }

    // Features als Array formatieren
    if (isset($body['features']) && is_array($body['features'])) {
        $body['features'] = '{' . implode(',', array_map(fn($f) => '"' . addslashes($f) . '"', $body['features'])) . '}';
    }
    // Checklist als JSON
    if (isset($body['checklist']) && is_array($body['checklist'])) {
        $body['checklist'] = json_encode($body['checklist']);
    }

    $id = Database::insert('website_projects', $body);
    $project = Database::queryOne("SELECT * FROM website_projects WHERE id = :id", ['id' => $id]);

    Response::success($project, 'Projekt erstellt', 201);
});

$router->put('/website-projects/{id}', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    // Features als Array formatieren
    if (isset($body['features']) && is_array($body['features'])) {
        $body['features'] = '{' . implode(',', array_map(fn($f) => '"' . addslashes($f) . '"', $body['features'])) . '}';
    }
    // Checklist als JSON
    if (isset($body['checklist']) && is_array($body['checklist'])) {
        $body['checklist'] = json_encode($body['checklist']);
    }

    Database::update('website_projects', $params['id'], $body);
    $project = Database::queryOne("SELECT * FROM website_projects WHERE id = :id", ['id' => $params['id']]);

    Response::success($project, 'Projekt aktualisiert');
});

$router->delete('/website-projects/{id}', function ($params) {
    Auth::requireAdmin();

    Database::delete('website_projects', $params['id']);
    Response::success(null, 'Projekt gelöscht');
});

// ============================================
// SETTINGS
// ============================================
$router->get('/settings', function () {
    Auth::requireAdmin();

    $items = Database::query("SELECT key, value FROM admin_settings");
    $settings = [];
    foreach ($items as $item) {
        $settings[$item['key']] = json_decode($item['value'], true);
    }

    Response::success($settings);
});

$router->get('/settings/{key}', function ($params) {
    Auth::requireAdmin();

    $setting = Database::queryOne(
        "SELECT value FROM admin_settings WHERE key = :key",
        ['key' => $params['key']]
    );
    if (!$setting) {
        Response::notFound('Einstellung nicht gefunden');
    }

    Response::success(json_decode($setting['value'], true));
});

$router->put('/settings/{key}', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    $exists = Database::queryOne(
        "SELECT id FROM admin_settings WHERE key = :key",
        ['key' => $params['key']]
    );

    if ($exists) {
        Database::execute(
            "UPDATE admin_settings SET value = :value, updated_at = NOW() WHERE key = :key",
            ['value' => json_encode($body), 'key' => $params['key']]
        );
    } else {
        Database::insert('admin_settings', [
            'key' => $params['key'],
            'value' => json_encode($body)
        ]);
    }

    Response::success($body, 'Einstellung gespeichert');
});

// Next number generation
$router->post('/settings/next-number/{type}', function ($params) {
    Auth::requireAdmin();

    $type = $params['type'];
    if (!in_array($type, ['invoice', 'quote', 'customer'])) {
        Response::error('Ungültiger Typ. Erlaubt: invoice, quote, customer', 400);
    }

    $result = Database::queryOne("SELECT get_next_number(:type) as num", ['type' => $type]);
    if (!$result || !$result['num']) {
        Response::error('Fehler beim Generieren der Nummer', 500);
    }

    Response::success($result['num']);
});

// ============================================
// RECURRING INVOICES
// ============================================
$router->get('/recurring-invoices', function () {
    Auth::requireAdmin();

    $status = Router::getQuery('status');

    $where = [];
    $params = [];

    if ($status) {
        $where[] = "ri.status = :status";
        $params['status'] = $status;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $items = Database::query(
        "SELECT ri.*, c.company_name, c.first_name, c.last_name
         FROM recurring_invoices ri
         LEFT JOIN customers c ON c.id = ri.customer_id
         $whereClause ORDER BY ri.next_invoice_date ASC",
        $params
    );

    Response::success($items);
});

$router->get('/recurring-invoices/{id}', function ($params) {
    Auth::requireAdmin();

    $recurring = Database::queryOne(
        "SELECT ri.*, c.company_name, c.first_name, c.last_name, c.email as customer_email
         FROM recurring_invoices ri
         LEFT JOIN customers c ON c.id = ri.customer_id
         WHERE ri.id = :id",
        ['id' => $params['id']]
    );
    if (!$recurring) {
        Response::notFound('Wiederkehrende Rechnung nicht gefunden');
    }

    // Positionen laden
    $recurring['items'] = Database::query(
        "SELECT rii.*, sc.name as service_name
         FROM recurring_invoice_items rii
         LEFT JOIN service_catalog sc ON sc.id = rii.service_id
         WHERE rii.recurring_invoice_id = :id ORDER BY rii.position",
        ['id' => $params['id']]
    );

    // Generierte Rechnungen laden
    $recurring['generated_invoices'] = Database::query(
        "SELECT id, invoice_number, status, total, invoice_date
         FROM invoices WHERE recurring_invoice_id = :id ORDER BY invoice_date DESC",
        ['id' => $params['id']]
    );

    Response::success($recurring);
});

$router->post('/recurring-invoices', function () {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    if (empty($body['customer_id']) || empty($body['title']) || empty($body['start_date'])) {
        Response::error('Kunde, Titel und Startdatum sind erforderlich', 400);
    }

    Database::beginTransaction();
    try {
        $recurringData = [
            'customer_id' => $body['customer_id'],
            'title' => $body['title'],
            'description' => $body['description'] ?? null,
            'subtotal' => $body['subtotal'] ?? 0,
            'discount_percent' => $body['discount_percent'] ?? 0,
            'discount_amount' => $body['discount_amount'] ?? 0,
            'total' => $body['total'] ?? 0,
            'notes' => $body['notes'] ?? null,
            'payment_terms' => $body['payment_terms'] ?? null,
            'interval' => $body['interval'] ?? 'monatlich',
            'start_date' => $body['start_date'],
            'end_date' => $body['end_date'] ?? null,
            'next_invoice_date' => $body['start_date'],
            'status' => $body['status'] ?? 'aktiv',
        ];

        $recurringId = Database::insert('recurring_invoices', $recurringData);

        // Positionen einfügen
        if (!empty($body['items'])) {
            foreach ($body['items'] as $index => $item) {
                Database::insert('recurring_invoice_items', [
                    'recurring_invoice_id' => $recurringId,
                    'service_id' => $item['service_id'] ?? null,
                    'position' => $index + 1,
                    'description' => $item['description'],
                    'quantity' => $item['quantity'] ?? 1,
                    'unit' => $item['unit'] ?? 'Stk.',
                    'unit_price' => $item['unit_price'],
                    'discount_percent' => $item['discount_percent'] ?? 0,
                    'total' => $item['total'],
                ]);
            }
        }

        Database::commit();

        $recurring = Database::queryOne("SELECT * FROM recurring_invoices WHERE id = :id", ['id' => $recurringId]);
        Response::success($recurring, 'Wiederkehrende Rechnung erstellt', 201);

    } catch (Exception $e) {
        Database::rollback();
        Response::error('Fehler beim Erstellen: ' . $e->getMessage(), 500);
    }
});

$router->put('/recurring-invoices/{id}', function ($params) {
    Auth::requireAdmin();
    $body = Router::getJsonBody();

    Database::beginTransaction();
    try {
        $recurringData = array_filter([
            'title' => $body['title'] ?? null,
            'description' => $body['description'] ?? null,
            'subtotal' => $body['subtotal'] ?? null,
            'discount_percent' => $body['discount_percent'] ?? null,
            'discount_amount' => $body['discount_amount'] ?? null,
            'total' => $body['total'] ?? null,
            'notes' => $body['notes'] ?? null,
            'payment_terms' => $body['payment_terms'] ?? null,
            'interval' => $body['interval'] ?? null,
            'end_date' => $body['end_date'] ?? null,
            'next_invoice_date' => $body['next_invoice_date'] ?? null,
            'status' => $body['status'] ?? null,
        ], fn($v) => $v !== null);

        if ($recurringData) {
            Database::update('recurring_invoices', $params['id'], $recurringData);
        }

        // Positionen aktualisieren
        if (isset($body['items'])) {
            Database::execute("DELETE FROM recurring_invoice_items WHERE recurring_invoice_id = :id", ['id' => $params['id']]);

            foreach ($body['items'] as $index => $item) {
                Database::insert('recurring_invoice_items', [
                    'recurring_invoice_id' => $params['id'],
                    'service_id' => $item['service_id'] ?? null,
                    'position' => $index + 1,
                    'description' => $item['description'],
                    'quantity' => $item['quantity'] ?? 1,
                    'unit' => $item['unit'] ?? 'Stk.',
                    'unit_price' => $item['unit_price'],
                    'discount_percent' => $item['discount_percent'] ?? 0,
                    'total' => $item['total'],
                ]);
            }
        }

        Database::commit();

        $recurring = Database::queryOne("SELECT * FROM recurring_invoices WHERE id = :id", ['id' => $params['id']]);
        Response::success($recurring, 'Wiederkehrende Rechnung aktualisiert');

    } catch (Exception $e) {
        Database::rollback();
        Response::error('Fehler beim Aktualisieren: ' . $e->getMessage(), 500);
    }
});

$router->delete('/recurring-invoices/{id}', function ($params) {
    Auth::requireAdmin();

    Database::delete('recurring_invoices', $params['id']);
    Response::success(null, 'Wiederkehrende Rechnung gelöscht');
});

// Rechnung aus Template generieren
$router->post('/recurring-invoices/{id}/generate', function ($params) {
    Auth::requireAdmin();

    $recurring = Database::queryOne(
        "SELECT * FROM recurring_invoices WHERE id = :id",
        ['id' => $params['id']]
    );
    if (!$recurring) {
        Response::notFound('Wiederkehrende Rechnung nicht gefunden');
    }

    Database::beginTransaction();
    try {
        // Rechnungsnummer generieren
        $invoiceNumber = Database::queryOne("SELECT get_next_number('invoice') as num")['num'];

        // Rechnung erstellen
        $invoiceId = Database::insert('invoices', [
            'invoice_number' => $invoiceNumber,
            'customer_id' => $recurring['customer_id'],
            'recurring_invoice_id' => $recurring['id'],
            'status' => 'entwurf',
            'invoice_date' => date('Y-m-d'),
            'subtotal' => $recurring['subtotal'],
            'discount_percent' => $recurring['discount_percent'],
            'discount_amount' => $recurring['discount_amount'],
            'total' => $recurring['total'],
            'notes' => $recurring['notes'],
            'payment_terms' => $recurring['payment_terms'],
        ]);

        // Positionen kopieren
        $items = Database::query(
            "SELECT * FROM recurring_invoice_items WHERE recurring_invoice_id = :id",
            ['id' => $params['id']]
        );
        foreach ($items as $item) {
            Database::insert('invoice_items', [
                'invoice_id' => $invoiceId,
                'service_id' => $item['service_id'],
                'position' => $item['position'],
                'description' => $item['description'],
                'quantity' => $item['quantity'],
                'unit' => $item['unit'],
                'unit_price' => $item['unit_price'],
                'discount_percent' => $item['discount_percent'],
                'total' => $item['total'],
            ]);
        }

        // Nächstes Datum berechnen und aktualisieren
        $nextDate = Database::queryOne(
            "SELECT calculate_next_invoice_date(:date, :interval) as next_date",
            ['date' => date('Y-m-d'), 'interval' => $recurring['interval']]
        )['next_date'];

        Database::execute(
            "UPDATE recurring_invoices
             SET next_invoice_date = :next_date,
                 last_invoice_date = CURRENT_DATE,
                 invoices_generated = invoices_generated + 1
             WHERE id = :id",
            ['next_date' => $nextDate, 'id' => $params['id']]
        );

        // Prüfen ob Enddatum erreicht
        if ($recurring['end_date'] && $nextDate > $recurring['end_date']) {
            Database::execute(
                "UPDATE recurring_invoices SET status = 'beendet' WHERE id = :id",
                ['id' => $params['id']]
            );
        }

        Database::commit();

        $invoice = Database::queryOne("SELECT * FROM invoices WHERE id = :id", ['id' => $invoiceId]);
        Response::success($invoice, 'Rechnung generiert');

    } catch (Exception $e) {
        Database::rollback();
        Response::error('Fehler beim Generieren: ' . $e->getMessage(), 500);
    }
});

// ============================================
// CSV EXPORT
// ============================================
$router->get('/export/invoices', function () {
    Auth::requireAdmin();

    $from = Router::getQuery('from');
    $to = Router::getQuery('to');
    $status = Router::getQuery('status');

    $where = [];
    $params = [];

    if ($from) {
        $where[] = "i.invoice_date >= :from";
        $params['from'] = $from;
    }
    if ($to) {
        $where[] = "i.invoice_date <= :to";
        $params['to'] = $to;
    }
    if ($status) {
        $where[] = "i.status = :status";
        $params['status'] = $status;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $invoices = Database::query(
        "SELECT i.invoice_number, i.invoice_date, i.due_date, i.status,
                i.subtotal, i.discount_amount, i.total, i.paid_at, i.payment_method,
                c.customer_number, c.company_name, c.first_name, c.last_name, c.email
         FROM invoices i
         LEFT JOIN customers c ON c.id = i.customer_id
         $whereClause ORDER BY i.invoice_date DESC",
        $params
    );

    // CSV erstellen
    $csv = "Rechnungsnummer;Datum;Fällig;Status;Netto;Rabatt;Brutto;Bezahlt am;Zahlungsart;Kundennummer;Firma;Vorname;Nachname;Email\n";

    foreach ($invoices as $inv) {
        $csv .= implode(';', [
            $inv['invoice_number'],
            $inv['invoice_date'],
            $inv['due_date'] ?? '',
            $inv['status'],
            number_format($inv['subtotal'], 2, ',', ''),
            number_format($inv['discount_amount'], 2, ',', ''),
            number_format($inv['total'], 2, ',', ''),
            $inv['paid_at'] ?? '',
            $inv['payment_method'] ?? '',
            $inv['customer_number'] ?? '',
            $inv['company_name'] ?? '',
            $inv['first_name'] ?? '',
            $inv['last_name'] ?? '',
            $inv['email'] ?? '',
        ]) . "\n";
    }

    // CSV Header setzen
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="rechnungen_export_' . date('Y-m-d') . '.csv"');
    echo "\xEF\xBB\xBF"; // UTF-8 BOM für Excel
    echo $csv;
    exit;
});

$router->get('/export/customers', function () {
    Auth::requireAdmin();

    $customers = Database::query(
        "SELECT customer_number, company_name, first_name, last_name, email, phone,
                street, zip, city, customer_type, total_revenue, created_at
         FROM customers ORDER BY created_at DESC"
    );

    $csv = "Kundennummer;Firma;Vorname;Nachname;Email;Telefon;Straße;PLZ;Ort;Typ;Umsatz;Erstellt\n";

    foreach ($customers as $c) {
        $csv .= implode(';', [
            $c['customer_number'] ?? '',
            $c['company_name'] ?? '',
            $c['first_name'] ?? '',
            $c['last_name'] ?? '',
            $c['email'] ?? '',
            $c['phone'] ?? '',
            $c['street'] ?? '',
            $c['zip'] ?? '',
            $c['city'] ?? '',
            $c['customer_type'] ?? '',
            number_format($c['total_revenue'] ?? 0, 2, ',', ''),
            $c['created_at'],
        ]) . "\n";
    }

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="kunden_export_' . date('Y-m-d') . '.csv"');
    echo "\xEF\xBB\xBF";
    echo $csv;
    exit;
});

// User Management (Admin Profiles)
$router->get('/users', function () {
    Auth::requireAdmin();

    $users = Database::query(
        "SELECT u.id, u.email, u.created_at,
                ur.role, ap.display_name, ap.totp_enabled, ap.last_login
         FROM users u
         LEFT JOIN user_roles ur ON ur.user_id = u.id
         LEFT JOIN admin_profiles ap ON ap.user_id = u.id
         ORDER BY u.created_at DESC"
    );

    Response::success($users);
});

// Router ausführen
$router->dispatch();
