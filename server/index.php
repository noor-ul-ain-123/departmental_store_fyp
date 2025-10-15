<?php
declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$base = __DIR__;
$productsFile = $base . '/data/products.json';
$ordersFile = $base . '/data/orders.json';

function loadJson($file) { return json_decode(file_get_contents($file) ?: '[]', true); }
function saveJson($file, $data) { file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT)); }

function readBody() {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

// Route: /api/products, /api/products/{id}
if (preg_match('#^/api/products/?(\d+)?$#', $uri, $m)) {
  $id = $m[1] ?? null;
  $items = loadJson($productsFile);

  if ($method === 'GET') {
    if ($id) {
      foreach ($items as $p) { if ((string)$p['id'] === (string)$id) { echo json_encode($p); exit; } }
      http_response_code(404); echo json_encode(['error'=>'Not found']); exit;
    } else {
      echo json_encode($items); exit;
    }
  }

  if ($method === 'POST') {
    $body = readBody();
    $maxId = 0; foreach ($items as $p) { $maxId = max($maxId, (int)$p['id']); }
    $body['id'] = $maxId + 1;
    $items[] = $body;
    saveJson($productsFile, $items);
    echo json_encode($body); exit;
  }

  if (in_array($method, ['PUT','PATCH'])) {
    if (!$id) { http_response_code(400); echo json_encode(['error'=>'ID required']); exit; }
    $body = readBody();
    $updated = false;
    foreach ($items as &$p) {
      if ((string)$p['id'] === (string)$id) { $p = array_merge($p, $body); $updated = true; break; }
    }
    if (!$updated) { http_response_code(404); echo json_encode(['error'=>'Not found']); exit; }
    saveJson($productsFile, $items);
    echo json_encode(['ok'=>true]); exit;
  }

  if ($method === 'DELETE') {
    if (!$id) { http_response_code(400); echo json_encode(['error'=>'ID required']); exit; }
    $items = array_values(array_filter($items, fn($p) => (string)$p['id'] !== (string)$id));
    saveJson($productsFile, $items);
    echo json_encode(['ok'=>true]); exit;
  }

  http_response_code(405); echo json_encode(['error'=>'Method not allowed']); exit;
}

// Route: /api/orders
if (preg_match('#^/api/orders/?$#', $uri)) {
  $orders = loadJson($ordersFile);
  if ($method === 'GET') {
    echo json_encode($orders); exit;
  }
  if ($method === 'POST') {
    $body = readBody();
    $body['id'] = count($orders) + 1001;
    $body['status'] = $body['status'] ?? 'Pending';
    $body['created_at'] = date('c');
    $orders[] = $body;
    saveJson($ordersFile, $orders);
    echo json_encode($body); exit;
  }
  http_response_code(405); echo json_encode(['error'=>'Method not allowed']); exit;
}

http_response_code(404);
echo json_encode(['error'=>'Unknown route','path'=>$uri]);
