<?php
require __DIR__.'/env.php';

function db(){
  static $pdo = null;
  if($pdo) return $pdo;
  $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
    env('DB_HOST'), env('DB_PORT'), env('DB_NAME'));
  $pdo = new PDO($dsn, env('DB_USER'), env('DB_PASS'), [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);
  return $pdo;
}

function json_out($data, int $code=200){
  http_response_code($code);
  header('Content-Type: application/json');
  echo json_encode($data, JSON_UNESCAPED_SLASHES);
  exit;
}

function b64url($d){ return rtrim(strtr(base64_encode($d), '+/', '-_'), '=' ); }

function jwt_sign(array $payload){
  $header = ['alg'=>'HS256','typ'=>'JWT'];
  $now = time();
  $payload['iat'] = $payload['iat'] ?? $now;
  $payload['exp'] = $payload['exp'] ?? ($now + 60*60*24);
  $seg = b64url(json_encode($header)) . '.' . b64url(json_encode($payload));
  $sig = hash_hmac('sha256', $seg, env('JWT_SECRET'), true);
  return $seg . '.' . b64url($sig);
}

function jwt_verify(string $jwt){
  $parts = explode('.', $jwt);
  if(count($parts)!==3) return null;
  [$h,$p,$s] = $parts;
  $calc = b64url(hash_hmac('sha256', "$h.$p", env('JWT_SECRET'), true));
  if(!hash_equals($calc, $s)) return null;
  $payload = json_decode(base64_decode(strtr($p, '-_', '+/')), true);
  if(!$payload) return null;
  if(($payload['exp'] ?? 0) < time()) return null;
  return $payload;
}

function auth_user(){
  $hdr = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
  if(!preg_match('/Bearer\s+(.*)/i', $hdr, $m)) return null;
  $payload = jwt_verify(trim($m[1]));
  return $payload;
}

function require_auth($role=null){
  $u = auth_user();
  if(!$u) json_out(['error'=>'unauthorized'], 401);
  if($role && ($u['role'] ?? 'user') !== $role) json_out(['error'=>'forbidden'], 403);
  return $u;
}
