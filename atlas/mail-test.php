<?php
/* OreOrbit: send both welcome emails to David to check that website email works. Opens with the update key. */
declare(strict_types=1);
header('Content-Type: text/html; charset=utf-8'); header('X-Robots-Tag: noindex, nofollow');
$cfg = @include __DIR__ . '/update-config.php';
$key = isset($_POST['key']) ? (string) $_POST['key'] : '';
$ok = is_array($cfg) && $key !== '' && hash_equals(strtolower((string) $cfg['key_sha256']), hash('sha256', $key));
if (!$ok && $key !== '') { usleep(800000); }   /* a wrong key costs time */
echo '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Email test</title><style>body{background:#050607;color:#eceee9;font:16px/1.6 system-ui;max-width:620px;margin:40px auto;padding:0 20px}input,button{font:inherit;padding:10px 14px;border-radius:999px;border:1px solid #444;background:#111;color:#eee}button{background:#eceee9;color:#050607;font-weight:600}.ok{color:#3ddc97}.bad{color:#f87171}</style><h1>Email test</h1>';
if (!$ok) { echo '<form method="post"><p>Enter the update key (ATLAS_KEY).</p><input type="password" name="key" autofocus> <button>Send test emails</button></form>'; exit; }
require_once __DIR__ . '/mail-lib.php';
$m = @include __DIR__ . '/mail-config.php';
echo '<p>Mailbox: ' . oo_h(is_array($m) ? $m['user'] . ' via ' . $m['host'] . ':' . $m['port'] : 'mail-config.php missing') . (is_array($m) && empty($m['pass']) ? ' <span class="bad">· password not set in mail-config.php</span>' : '') . '</p>';
$a = oo_welcome_brief('david@madali.cz', ['ree', 'ga', 'ge'], false);
$b = oo_welcome_paid('david@madali.cz', ['ree', 'ga', 'ge'], true);
echo '<p class="' . ($a ? 'ok' : 'bad') . '">Free welcome (EN): ' . ($a ? 'sent' : 'FAILED') . '</p><p class="' . ($b ? 'ok' : 'bad') . '">Paid welcome (CS): ' . ($b ? 'sent' : 'FAILED') . '</p>';
echo '<h2>What the mail server answered</h2><pre style="white-space:pre-wrap;font:13px/1.5 Menlo,monospace;color:#c9cdca">' . oo_h(implode("\n", $GLOBALS['OO_MAIL_LOG'] ?? [])) . '</pre>';
echo '<p>Both go to david@madali.cz. Send a screenshot of this page if anything failed.</p>';
