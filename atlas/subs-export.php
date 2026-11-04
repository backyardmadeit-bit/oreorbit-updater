<?php
/* OreOrbit: the subscriber list for the update robot only (same secret key as update.php).
   GET  -> active subscribers (without anyone who unsubscribed), the paid monitoring list and the robot's sending state
   POST ?state=1 -> the robot saves its sending state (which brief went out, which alerts were sent) */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
$cfg = @include __DIR__ . '/update-config.php';
if (!is_array($cfg) || empty($cfg['key_sha256']) || !is_string($cfg['key_sha256'])) { http_response_code(503); echo '{"ok":false}'; exit; }
$key = isset($_SERVER['HTTP_X_ATLAS_KEY']) ? (string) $_SERVER['HTTP_X_ATLAS_KEY'] : '';
if ($key === '' || !hash_equals(strtolower($cfg['key_sha256']), hash('sha256', $key))) { usleep(400000); http_response_code(403); echo '{"ok":false}'; exit; }
$dir = __DIR__ . '/subs';
if (!is_dir($dir)) { @mkdir($dir, 0750, true); }
if (!is_file($dir . '/.htaccess')) { @file_put_contents($dir . '/.htaccess', "<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n"); }
if (isset($_GET['state'])) {
    $j = json_decode((string) file_get_contents('php://input'), true);
    if (!is_array($j)) { http_response_code(400); echo '{"ok":false}'; exit; }
    @file_put_contents($dir . '/state.json', json_encode($j, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
    echo '{"ok":true}'; exit;
}
$secret = strtolower($cfg['key_sha256']);
$unsub = [];
if (is_file($dir . '/unsubscribed.txt')) { foreach (file($dir . '/unsubscribed.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $l) { $unsub[strtolower(trim($l))] = true; } }
$subs = [];
if (($f = @fopen($dir . '/subscribers.csv', 'r'))) {
    while (($r = fgetcsv($f, null, ',', '"', '')) !== false) {
        if (!is_array($r) || count($r) < 6) { continue; }
        [$t, $plan, $email, $mins, $prod, $lang] = $r;
        $e = strtolower(trim((string) $email));
        if ($e === '' || isset($unsub[$e])) { continue; }
        $subs[$plan . '|' . $e] = ['email' => $e, 'plan' => $plan, 'minerals' => array_values(array_filter(explode(' ', (string) $mins))),
                                   'product' => $prod, 'lang' => $lang, 'other' => (string) ($r[6] ?? ''), 'since' => $t, 'token' => substr(hash_hmac('sha256', $e, $secret), 0, 24)];
    }
    fclose($f);
}
/* paid monitoring: one email per line in subs/monitoring-active.txt, added by David once a client has paid */
$active = [];
if (is_file($dir . '/monitoring-active.txt')) {
    foreach (file($dir . '/monitoring-active.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $l) {
        $l = strtolower(trim($l));
        if ($l !== '' && $l[0] !== '#' && !isset($unsub[$l])) { $active[] = $l; }
    }
}
$state = is_file($dir . '/state.json') ? json_decode((string) file_get_contents($dir . '/state.json'), true) : null;
$wf = __DIR__ . '/subs/welcomed.txt';
$welcomed = is_file($wf) ? array_values(array_filter(array_map('trim', file($wf) ?: []))) : [];
echo json_encode(['ok' => true, 'subs' => array_values($subs), 'active' => $active, 'welcomed' => $welcomed, 'state' => is_array($state) ? $state : new stdClass()], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
