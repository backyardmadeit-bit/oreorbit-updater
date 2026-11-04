<?php
/* OreOrbit: one-click unsubscribe from every email (the Monday brief and monitoring alerts). */
declare(strict_types=1);
header('Content-Type: text/html; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');
$cfg = @include __DIR__ . '/update-config.php';
$e = strtolower(trim((string) ($_GET['e'] ?? '')));
$t = (string) ($_GET['t'] ?? '');
$ok = is_array($cfg) && !empty($cfg['key_sha256']) && filter_var($e, FILTER_VALIDATE_EMAIL)
      && hash_equals(substr(hash_hmac('sha256', $e, strtolower((string) $cfg['key_sha256'])), 0, 24), $t);
if ($ok) {
    $dir = __DIR__ . '/subs';
    if (!is_dir($dir)) { @mkdir($dir, 0750, true); }
    @file_put_contents($dir . '/unsubscribed.txt', $e . "\n", FILE_APPEND | LOCK_EX);
}
$h = $ok ? 'You are unsubscribed. · Odhlášení proběhlo.' : 'This link does not work. · Tento odkaz nefunguje.';
$p = $ok ? 'You will not get any more emails from OreOrbit. You can sign up again on the atlas any time.<br>Od OreOrbit už vám nepřijdou žádné e-maily. Kdykoli se můžete znovu přihlásit v atlasu.'
         : 'Please write to david@madali.cz and we will unsubscribe you by hand.<br>Napište prosím na david@madali.cz a odhlásíme vás ručně.';
echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>OreOrbit</title>'
   . '<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#050607;color:#eceee9;font:16px/1.6 system-ui,sans-serif}main{max-width:560px;padding:32px}h1{font-weight:500;font-size:26px}a{color:#3ddc97}</style></head>'
   . '<body><main><h1>' . $h . '</h1><p>' . $p . '</p><p><a href="./">OreOrbit · bohemiadefense.com/atlas</a></p></main></body></html>';
