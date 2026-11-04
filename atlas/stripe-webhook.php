<?php
/* OreOrbit: Stripe tells us about payments. A paid checkout switches monitoring on (subs/monitoring-active.txt)
   and sends the welcome email; a cancelled subscription switches it off. Every event is checked against the signing secret. */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');
$pay = @include __DIR__ . '/pay-config.php';
$secret = is_array($pay) ? (string) ($pay['webhook_secret'] ?? '') : '';
$payload = (string) file_get_contents('php://input');
$sig = (string) ($_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '');
if ($secret === '' || $payload === '' || $sig === '') { http_response_code(400); echo '{"ok":false}'; exit; }
$t = ''; $v1 = [];
foreach (explode(',', $sig) as $part) { [$k, $v] = array_pad(explode('=', trim($part), 2), 2, ''); if ($k === 't') { $t = $v; } elseif ($k === 'v1') { $v1[] = $v; } }
$expect = hash_hmac('sha256', $t . '.' . $payload, $secret);
$valid = false; foreach ($v1 as $v) { if (hash_equals($expect, $v)) { $valid = true; } }
if (!$valid || abs(time() - (int) $t) > 600) { http_response_code(400); echo '{"ok":false,"error":"signature"}'; exit; }
$ev = json_decode($payload, true);
if (!is_array($ev)) { http_response_code(400); echo '{"ok":false}'; exit; }
require_once __DIR__ . '/mail-lib.php';
$dir = __DIR__ . '/subs';
if (!is_dir($dir)) { @mkdir($dir, 0750, true); }
$act = $dir . '/monitoring-active.txt'; $map = $dir . '/customers.json';
$customers = is_file($map) ? (json_decode((string) file_get_contents($map), true) ?: []) : [];
$active = is_file($act) ? array_values(array_filter(array_map(fn($l) => strtolower(trim($l)), file($act) ?: []))) : [];
$type = (string) ($ev['type'] ?? ''); $o = $ev['data']['object'] ?? [];
$after = [];   // emails go out after Stripe has its answer
/* the minerals and language a person chose on the atlas */
$prefs = function (string $email) use ($dir): array {
    $mins = []; $lang = 'en';
    if (($f = @fopen($dir . '/subscribers.csv', 'r'))) { while (($r = fgetcsv($f, null, ',', '"', '')) !== false) { if (count($r) >= 6 && strtolower(trim((string) $r[2])) === $email) { $mins = array_values(array_filter(explode(' ', (string) $r[3]))); $lang = $r[5]; } } fclose($f); }
    return [$mins, $lang];
};
if ($type === 'checkout.session.completed') {
    $email = strtolower(trim((string) ($o['customer_details']['email'] ?? $o['customer_email'] ?? '')));
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if (!in_array($email, $active, true)) { $active[] = $email; @file_put_contents($act, implode("\n", $active) . "\n", LOCK_EX); }
        if (!empty($o['customer'])) { $customers[(string) $o['customer']] = $email; @file_put_contents($map, json_encode($customers), LOCK_EX); }
        [$mins, $lang] = $prefs($email);
        /* the minerals chosen on the atlas came with the payment: keep them with the client */
        $crid = (string) ($o['client_reference_id'] ?? '');
        if ($crid !== '' && ctype_xdigit($crid) && strlen($crid) % 2 === 0) {
            $parts = explode('|', (string) hex2bin($crid));
            $allowed = ['ree', 'ti', 'w', 'sb', 'ga', 'ge', 'li', 'co', 'ni', 'gr', 'mg', 'mn'];
            $cm = array_values(array_intersect(array_filter(explode(',', $parts[0] ?? '')), $allowed));
            $co = substr(preg_replace('/[^a-z0-9 ,\-]/', '', (string) ($parts[1] ?? '')), 0, 40);
            $cl = ($parts[2] ?? '') === 'cs' ? 'cs' : 'en';
            if ($cm || $co) { $mins = $cm; $lang = $cl; }
            if (($f = @fopen($dir . '/subscribers.csv', 'a'))) { flock($f, LOCK_EX); fputcsv($f, [date('c'), 'monitoring', $email, implode(' ', $mins), '', $lang, $co], ',', '"', ''); flock($f, LOCK_UN); fclose($f); }
        }
        $after[] = function () use ($email, $mins, $lang) { if (oo_welcome_paid($email, $mins, $lang === 'cs')) { oo_mark_welcomed($email, 'paid'); } };
        $after[] = function () use ($email, $mins) { oo_notify('OreOrbit: new paying monitoring client', "Email: $email\nMinerals: " . implode(', ', $mins) . "\nActivated automatically.\n"); };
    }
} elseif ($type === 'customer.subscription.deleted') {
    $email = $customers[(string) ($o['customer'] ?? '')] ?? '';
    if ($email !== '') {
        @file_put_contents($act, implode("\n", array_diff($active, [$email])) . "\n", LOCK_EX);
        $after[] = function () use ($email) { oo_notify('OreOrbit: monitoring cancelled', "Email: $email\nDeactivated automatically.\n"); };
    }
} elseif ($type === 'invoice.payment_failed') {
    $email = $customers[(string) ($o['customer'] ?? '')] ?? (string) ($o['customer_email'] ?? '');
    $after[] = function () use ($email) { oo_notify('OreOrbit: a monitoring payment failed', "Email: $email\nStripe retries automatically; the client stays active until Stripe cancels the subscription.\n"); };
}
oo_reply_now('{"ok":true}');
foreach ($after as $f) { $f(); }
