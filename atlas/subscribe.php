<?php
/* OreOrbit sign-ups: the free Monday brief and paid monitoring.
   Stores each sign-up in subs/subscribers.csv (not reachable from the web) and emails David. */
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }
$in = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($in)) { $in = $_POST; }
if (!empty($in['website'])) { echo '{"ok":true}'; exit; }               // a robot filled the hidden field
$email = trim((string) ($in['email'] ?? ''));
if (strlen($email) > 200 || !filter_var($email, FILTER_VALIDATE_EMAIL)) { http_response_code(400); echo '{"ok":false,"error":"email"}'; exit; }
if (empty($in['consent'])) { http_response_code(400); echo '{"ok":false,"error":"consent"}'; exit; }
$plan = in_array(($in['plan'] ?? ''), ['brief', 'monitoring'], true) ? $in['plan'] : 'brief';
$mins = [];
foreach ((array) ($in['minerals'] ?? []) as $m) { if (is_string($m) && preg_match('/^[a-z]{1,4}$/', $m)) { $mins[] = $m; } }
$mins = array_slice(array_values(array_unique($mins)), 0, 10);
$product = substr(preg_replace('/[^a-z]/', '', (string) ($in['product'] ?? '')), 0, 20);
$lang = (($in['lang'] ?? 'en') === 'cs') ? 'cs' : 'en';
$dir = __DIR__ . '/subs';
if (!is_dir($dir)) { @mkdir($dir, 0750, true); }
if (!is_file($dir . '/.htaccess')) { @file_put_contents($dir . '/.htaccess', "<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n"); }
/* at most 5 sign-ups an hour from one address; nothing about the address itself is kept */
$key = substr(hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . date('Y-m-d-H')), 0, 16);
$rl = $dir . '/rl-' . $key;
$n = is_file($rl) ? (int) file_get_contents($rl) : 0;
if ($n >= 5) { http_response_code(429); echo '{"ok":false,"error":"busy"}'; exit; }
@file_put_contents($rl, (string) ($n + 1));
foreach (glob($dir . '/rl-*') ?: [] as $old) { if (filemtime($old) < time() - 86400) { @unlink($old); } }
$other = preg_replace('/[^\p{L}0-9 ,.\-]/u', '', mb_substr(trim((string) ($in['other'] ?? '')), 0, 80));
$row = [date('c'), $plan, $email, implode(' ', $mins), $product, $lang, $other];
$f = @fopen($dir . '/subscribers.csv', 'a');
if ($f) { flock($f, LOCK_EX); fputcsv($f, $row, ',', '"', ''); flock($f, LOCK_UN); fclose($f); }
/* someone who unsubscribed earlier and signs up again is welcome back */
$uf = $dir . '/unsubscribed.txt';
if (is_file($uf)) {
    $keep = array_filter(file($uf, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [], fn($l) => strtolower(trim($l)) !== strtolower($email));
    @file_put_contents($uf, $keep ? implode("\n", $keep) . "\n" : '', LOCK_EX);
}
$body = "Plan: $plan\nEmail: $email\nMinerals: " . implode(', ', $mins) . "\nProduct: $product\nLanguage: $lang\nTime: " . date('c') . "\n";
require_once __DIR__ . '/mail-lib.php';
$subject = 'OreOrbit: new ' . ($plan === 'monitoring' ? 'monitoring request' : 'Monday brief sign-up');
if ($plan === 'brief') {
    oo_reply_now('{"ok":true}');
    if (oo_welcome_brief($email, $mins, $lang === 'cs')) { oo_mark_welcomed($email, 'brief'); }
    oo_notify($subject, $body);
    exit;
}
$pay = @include __DIR__ . '/pay-config.php';
$link = (is_array($pay) && !empty($pay['payment_link']) && str_starts_with((string) $pay['payment_link'], 'https://')) ? (string) $pay['payment_link'] : '';
if ($link !== '') {
    $ref = substr(hash('sha256', strtolower($email)), 0, 32);
    $url = $link . (str_contains($link, '?') ? '&' : '?') . 'prefilled_email=' . rawurlencode($email) . '&client_reference_id=' . $ref . ($lang === 'cs' ? '&locale=cs' : '');
    oo_reply_now(json_encode(['ok' => true, 'pay' => $url]));
} else {
    oo_reply_now('{"ok":true}');
}
oo_notify($subject . ($link !== '' ? ' (sent to payment)' : ''), $body);
