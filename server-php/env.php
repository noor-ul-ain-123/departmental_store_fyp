<?php
function env(string $key, $default=null){
  static $loaded = false;
  static $map = [];
  if(!$loaded){
    $path = __DIR__ . '/.env';
    if(!file_exists($path)) $path = __DIR__ . '/.env.example';
    if(file_exists($path)){
      foreach(file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line){
        if(strpos(trim($line), '#')===0) continue;
        [$k,$v] = array_pad(explode('=', $line, 2), 2, '');
        $map[trim($k)] = trim($v);
      }
    }
    $loaded = true;
  }
  return $map[$key] ?? $default;
}
