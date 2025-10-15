<?php
declare(strict_types=1);
require __DIR__.'/db.php';

// CORS
header('Access-Control-Allow-Origin: '.env('APP_ALLOWED_ORIGIN', '*'));
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if($_SERVER['REQUEST_METHOD']==='OPTIONS'){ http_response_code(200); exit; }

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

function body(){ $raw = file_get_contents('php://input'); $d = json_decode($raw, true); return is_array($d)?$d:[]; }
function q($key,$def=null){ return $_GET[$key] ?? $def; }

// Auth: register
if($uri==='/api/auth/register' && $method==='POST'){
  $b = body();
  $email = strtolower(trim($b['email'] ?? ''));
  $pass = $b['password'] ?? '';
  $name = trim($b['name'] ?? '');
  if(!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($pass)<6) json_out(['error'=>'invalid_input'], 422);
  $pdo = db();
  $stmt = $pdo->prepare('SELECT id FROM users WHERE email=?');
  $stmt->execute([$email]);
  if($stmt->fetch()) json_out(['error'=>'email_exists'], 409);
  $hash = password_hash($pass, PASSWORD_BCRYPT);
  $pdo->prepare('INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,?)')->execute([$name,$email,$hash,'user']);
  json_out(['ok'=>true], 201);
}

// Auth: login
if($uri==='/api/auth/login' && $method==='POST'){
  $b = body();
  $email = strtolower(trim($b['email'] ?? ''));
  $pass = $b['password'] ?? '';
  $pdo = db();
  $stmt = $pdo->prepare('SELECT id,name,email,role,password_hash FROM users WHERE email=?');
  $stmt->execute([$email]);
  $u = $stmt->fetch();
  if(!$u || !password_verify($pass, $u['password_hash'])) json_out(['error'=>'invalid_credentials'], 401);
  $token = jwt_sign(['sub'=>$u['id'],'email'=>$u['email'],'name'=>$u['name'],'role'=>$u['role']]);
  json_out(['token'=>$token,'user'=>['id'=>$u['id'],'name'=>$u['name'],'email'=>$u['email'],'role'=>$u['role']]]);
}

// /api/me
if($uri==='/api/me' && $method==='GET'){
  $u = require_auth();
  json_out(['user'=>$u]);
}

// Uploads
if($uri==='/api/uploads' && $method==='POST'){
  require_auth('admin');
  $dir = __DIR__ . '/' . env('UPLOAD_DIR','uploads');
  if(!file_exists($dir)) mkdir($dir, 0777, true);
  if(!isset($_FILES['file'])) json_out(['error'=>'file_required'], 400);
  $f = $_FILES['file'];
  if($f['error']!==UPLOAD_ERR_OK) json_out(['error'=>'upload_failed','code'=>$f['error']], 400);
  $ext = pathinfo($f['name'], PATHINFO_EXTENSION);
  $name = bin2hex(random_bytes(8)) . ($ext?('.'.$ext):'');
  $target = $dir . '/' . $name;
  move_uploaded_file($f['tmp_name'], $target);
  $url = env('APP_URL') . '/' . env('UPLOAD_DIR','uploads') . '/' . $name;
  json_out(['url'=>$url], 201);
}

// Products list/search/pagination
if($uri==='/api/products' && $method==='GET'){
  $pdo = db();
  $page = max(1, (int)q('page', 1));
  $size = min(50, max(1, (int)q('page_size', 12)));
  $q = trim((string)q('q',''));
  $cat = trim((string)q('category',''));
  $where = []; $params = [];
  if($q!==''){ $where[] = '(title LIKE ? OR description LIKE ? OR category LIKE ?)'; $params[] = "%$q%"; $params[] = "%$q%"; $params[] = "%$q%"; }
  if($cat!==''){ $where[] = 'category = ?'; $params[] = $cat; }
  $sqlWhere = $where ? ('WHERE '.implode(' AND ', $where)) : '';
  // total with same filters
  $stmtTotal = $pdo->prepare("SELECT COUNT(*) FROM products $sqlWhere");
  $stmtTotal->execute($params);
  $total = (int)$stmtTotal->fetchColumn();
  $stmt = $pdo->prepare("SELECT * FROM products $sqlWhere ORDER BY id DESC LIMIT ? OFFSET ?");
  // Bind dynamic params + pagination
  $i=1;
  foreach($params as $p){ $stmt->bindValue($i++, $p); }
  $stmt->bindValue($i++, $size, PDO::PARAM_INT);
  $stmt->bindValue($i++, ($page-1)*$size, PDO::PARAM_INT);
  $stmt->execute();
  $items = $stmt->fetchAll();
  json_out(['items'=>$items,'page'=>$page,'page_size'=>$size,'total'=>$total]);
}

// Products CRUD
if(preg_match('#^/api/products/(\d+)$#', $uri, $m)){
  $id = (int)$m[1];
  $pdo = db();
  if($method==='GET'){
    $stmt = $pdo->prepare('SELECT * FROM products WHERE id=?');
    $stmt->execute([$id]);
    $p = $stmt->fetch();
    if(!$p) json_out(['error'=>'not_found'], 404);
    json_out($p);
  }
  if($method==='PUT' || $method==='PATCH'){
    require_auth('admin');
    $b = body();
    $fields = ['title','category','price','rating','image','description'];
    $sets=[]; $vals=[];
    foreach($fields as $f){ if(isset($b[$f])){ $sets[]="$f=?"; $vals[]=$b[$f]; } }
    if(!$sets) json_out(['error'=>'no_changes'], 422);
    $vals[] = $id;
    $stmt = $pdo->prepare('UPDATE products SET '.implode(',', $sets).' WHERE id=?');
    $stmt->execute($vals);
    json_out(['ok'=>true]);
  }
  if($method==='DELETE'){
    require_auth('admin');
    $pdo->prepare('DELETE FROM products WHERE id=?')->execute([$id]);
    json_out(['ok'=>true]);
  }
}

if($uri==='/api/products' && $method==='POST'){
  require_auth('admin');
  $b = body();
  $pdo = db();
  $stmt = $pdo->prepare('INSERT INTO products(title,category,price,rating,image,description) VALUES(?,?,?,?,?,?)');
  $stmt->execute([$b['title']??'', $b['category']??'', (float)($b['price']??0), (float)($b['rating']??0), $b['image']??'', $b['description']??'']);
  $id = (int)$pdo->lastInsertId();
  json_out(['id'=>$id], 201);
}

// Orders
if($uri==='/api/orders' && $method==='POST'){
  $u = require_auth();
  $b = body();
  $items = is_array($b['items'] ?? null) ? $b['items'] : [];
  // Validate non-empty cart and totals
  $derived = 0.0;
  foreach($items as $it){
    $qty = (int)($it['qty'] ?? 0);
    $price = (float)($it['price'] ?? 0);
    if($qty < 1 || $price < 0){ continue; }
    $derived += ($qty * $price);
  }
  $clientTotal = (float)($b['total'] ?? 0);
  if(count($items)===0 || $derived <= 0 || $clientTotal <= 0){ json_out(['error'=>'empty_or_invalid_cart'], 422); }

  $pdo = db();
  $stmt = $pdo->prepare('INSERT INTO orders(user_id,total,status,created_at) VALUES(?,?,?,NOW())');
  $stmt->execute([$u['sub'], $derived, 'Pending']);
  $orderId = (int)$pdo->lastInsertId();
  foreach($items as $it){
    $pdo->prepare('INSERT INTO order_items(order_id,product_id,qty,price) VALUES(?,?,?,?)')
        ->execute([$orderId, (int)$it['id'], (int)$it['qty'], (float)$it['price']]);
  }
  json_out(['id'=>$orderId,'status'=>'Pending','total'=>$derived], 201);
}

if($uri==='/api/orders' && $method==='GET'){
  require_auth('admin');
  $pdo = db();
  $rows = $pdo->query('SELECT id,user_id,total,status,created_at FROM orders ORDER BY id DESC LIMIT 200')->fetchAll();
  json_out($rows);
}

// Customer: my orders list
if($uri==='/api/my/orders' && $method==='GET'){
  $u = require_auth();
  $pdo = db();
  $stmt = $pdo->prepare('SELECT id,total,status,created_at FROM orders WHERE user_id=? ORDER BY id DESC LIMIT 200');
  $stmt->execute([$u['sub']]);
  $rows = $stmt->fetchAll();
  json_out($rows);
}

// Customer: my order details
if(preg_match('#^/api/my/orders/(\d+)$#', $uri, $m) && $method==='GET'){
  $u = require_auth();
  $id = (int)$m[1];
  $pdo = db();
  $stmt = $pdo->prepare('SELECT id,user_id,total,status,created_at FROM orders WHERE id=? AND user_id=?');
  $stmt->execute([$id, $u['sub']]);
  $order = $stmt->fetch();
  if(!$order) json_out(['error'=>'not_found'], 404);
  $items = $pdo->prepare('SELECT oi.product_id as id, p.title, p.image, oi.qty, oi.price FROM order_items oi JOIN products p ON p.id=oi.product_id WHERE oi.order_id=?');
  $items->execute([$id]);
  $order['items'] = $items->fetchAll();
  json_out($order);
}

http_response_code(404);
json_out(['error'=>'unknown_route','path'=>$uri], 404);
