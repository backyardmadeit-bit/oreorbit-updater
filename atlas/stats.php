<?php
/* Private visitor statistics for OreOrbit, Bohemia Defense and madali.cz. Opens with the same key as update.php. */
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
function h($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
$cfg = @include __DIR__ . '/update-config.php';
$key = isset($_POST['key']) ? (string)$_POST['key'] : '';
$ok = is_array($cfg) && $key !== '' && hash_equals(strtolower($cfg['key_sha256']), hash('sha256', $key));

/* ---- private: the subscribers, one row per address and plan, newest first ---- */
function oo_subs_rows(): array {
  $d = __DIR__ . '/subs'; $rows = [];
  $uns = is_file("$d/unsubscribed.txt") ? array_flip(array_map(fn($l) => strtolower(trim($l)), file("$d/unsubscribed.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [])) : [];
  $pay = is_file("$d/monitoring-active.txt") ? array_flip(array_map(fn($l) => strtolower(trim($l)), file("$d/monitoring-active.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [])) : [];
  if (($f = @fopen("$d/subscribers.csv", 'r'))) {
    while (($r = fgetcsv($f, null, ',', '"', '')) !== false) {
      if (!is_array($r) || count($r) < 6) { continue; }
      [$t, $plan, $email, $mins, $prod, $lang] = $r; $e = strtolower(trim((string) $email));
      if ($e === '') { continue; }
      $status = isset($uns[$e]) ? 'unsubscribed' : ($plan === 'monitoring' ? (isset($pay[$e]) ? 'paying' : 'payment pending') : 'subscribed');
      $rows[$plan . '|' . $e] = ['since' => (string) $t, 'email' => $e, 'plan' => $plan === 'monitoring' ? 'Monitoring' : 'Monday brief', 'minerals' => (string) $mins, 'product' => (string) $prod, 'lang' => (string) $lang, 'status' => $status];
    }
    fclose($f);
  }
  foreach (array_keys($pay) as $e) { if ($e !== '' && !isset($rows['monitoring|' . $e])) { $rows['monitoring|' . $e] = ['since' => '', 'email' => $e, 'plan' => 'Monitoring', 'minerals' => '', 'product' => '', 'lang' => '', 'status' => 'paying']; } }
  $rows = array_values($rows); usort($rows, fn($a, $b) => strcmp($b['since'], $a['since']));
  return $rows;
}
if ($ok && isset($_POST['csv'])) {
  header('Content-Type: text/csv; charset=utf-8');
  header('Content-Disposition: attachment; filename="oreorbit-subscribers-' . gmdate('Y-m-d') . '.csv"');
  $o = fopen('php://output', 'w'); fwrite($o, "\xEF\xBB\xBF");
  fputcsv($o, ['Signed up', 'Email', 'Plan', 'Minerals', 'Product', 'Language', 'Status'], ',', '"', '');
  foreach (oo_subs_rows() as $r) { fputcsv($o, [$r['since'], $r['email'], $r['plan'], $r['minerals'], $r['product'], $r['lang'], $r['status']], ',', '"', ''); }
  exit;
}
echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Visitor statistics</title>';
echo '<style>body{margin:0;padding:32px 20px;background:#050607;color:#eceee9;font:15px/1.5 -apple-system,"Helvetica Neue",Arial,sans-serif}main{max-width:900px;margin:0 auto}h1{font-weight:300;font-size:36px;margin:0 0 6px}h2{font-size:17px;margin:30px 0 8px;color:#a3aaae}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:7px 8px 7px 0;border-bottom:1px solid rgba(236,238,233,.1)}td.n,th.n{text-align:right;font-variant-numeric:tabular-nums}input,button{font:inherit;padding:10px 14px;border-radius:999px;border:1px solid rgba(236,238,233,.3);background:#0b0f12;color:#eceee9}button{background:#eceee9;color:#050607;font-weight:600;cursor:pointer}.dim{color:#697176}</style></head><body><main>';
if (!$ok) {
    echo '<h1>Visitor statistics</h1><p class="dim">Enter the update key (the ATLAS_KEY from GitHub).</p><form method="post"><input type="password" name="key" autocomplete="current-password" autofocus> <button type="submit">Open</button></form>';
    if ($key !== '') {
        echo '<p style="color:#ff8a7d">That key is not right.</p>';
    }
    echo '</main></body></html>';
    exit;
}
$days = array();
foreach (array(gmdate('Y-m'), gmdate('Y-m', strtotime('first day of last month'))) as $m) {
    $f = __DIR__ . '/stats/' . $m . '.json';
    if (is_file($f)) {
        $d = json_decode((string)file_get_contents($f), true);
        if (is_array($d)) {
            $days += $d;
        }
    }
}
krsort($days);
$days = array_slice($days, 0, 30, true);
$tot = array();
$week = array();
$i = 0;
foreach ($days as $d => $c) {
    foreach ($c as $k => $n) {
        $tot[$k] = (isset($tot[$k]) ? $tot[$k] : 0) + (int)$n;
        if ($i < 7) {
            $week[$k] = (isset($week[$k]) ? $week[$k] : 0) + (int)$n;
        }
    }
    $i++;
}
arsort($tot);
$groups = array('Pages' => '/^(atlas|home|madali|lib)/', 'Quick check' => '/^qc:/', 'Actions' => '/^act:/', 'Atlas sections seen' => '/^sec:/', 'Folded sections opened' => '/^open:/');
echo '<h1>Visitor statistics</h1><p class="dim">Daily totals only: no IP addresses, no cookies. Last 30 days, newest first. Times in UTC.</p>';
foreach ($groups as $g => $re) {
    echo '<h2>' . h($g) . '</h2><table><tr><th>What</th><th class="n">Last 7 days</th><th class="n">Last 30 days</th></tr>';
    foreach ($tot as $k => $n) {
        if (preg_match($re, $k)) {
            echo '<tr><td>' . h($k) . '</td><td class="n">' . (isset($week[$k]) ? (int)$week[$k] : 0) . '</td><td class="n">' . (int)$n . '</td></tr>';
        }
    }
    echo '</table>';
}
echo '<h2>Day by day</h2><table><tr><th>Day</th><th class="n">Page views</th><th class="n">Quick checks</th><th class="n">Actions</th></tr>';
foreach ($days as $d => $c) {
    $p = 0; $q = 0; $a = 0;
    foreach ($c as $k => $n) {
        if (preg_match($groups['Pages'], $k)) { $p += (int)$n; } elseif (preg_match($groups['Quick check'], $k)) { $q += (int)$n; } elseif (preg_match($groups['Actions'], $k)) { $a += (int)$n; }
    }
    echo '<tr><td>' . h($d) . '</td><td class="n">' . $p . '</td><td class="n">' . $q . '</td><td class="n">' . $a . '</td></tr>';
}
echo '</table></main></body></html>';
/* ---- private: data freshness (internal only, never linked from the public site) ---- */
function oo_age(int $t): string { $h = (time() - $t) / 3600; return $h < 1 ? round($h * 60) . ' min' : ($h < 48 ? round($h, 1) . ' h' : round($h / 24, 1) . ' d'); }
$checks = [ // file => [label, hours before amber, hours before red]
  'live-data/news.json' => ['News', 12, 36], 'live-data/briefs.json' => ['Monday brief', 192, 240],
  'live-data/live/hotspots.json' => ['Heat at plants', 12, 36], 'live-data/live/conflict.json' => ['Conflict', 200, 400],
  'live-data/live/trade.json' => ['EU imports', 200, 400], 'live-data/live/so2.json' => ['SO₂', 200, 400],
  'data/imagery.json' => ['Satellite pictures', 200, 400], 'p/index.html' => ['Library pages', 30, 72],
];
foreach (glob(__DIR__ . '/live-data/live/*.json') ?: [] as $f) { $k = 'live-data/live/' . basename($f); if (!isset($checks[$k])) { $checks[$k] = [ucfirst(str_replace(['-', '_'], ' ', basename($f, '.json'))), 12, 48]; } }
echo '<h2>Data freshness</h2><p class="dim">Robot last run: ' . htmlspecialchars((string) ($rs['run'] ?? '–')) . '</p><table><tr><th>Feed</th><th class="n">Last update</th><th class="n">Age</th><th>Status</th></tr>';
$rs = is_file(__DIR__ . '/live-data/live/runstatus.json') ? (json_decode((string) file_get_contents(__DIR__ . '/live-data/live/runstatus.json'), true) ?: []) : [];
$src = is_array($rs['sources'] ?? null) ? $rs['sources'] : [];
$feedOf = ['live-data/news.json' => 'news', 'live-data/briefs.json' => 'brief', 'live-data/live/hotspots.json' => 'hotspots', 'live-data/live/conflict.json' => 'conflict', 'live-data/live/trade.json' => 'trade', 'live-data/live/so2.json' => 'so2', 'data/imagery.json' => 'imagery', 'p/index.html' => 'pages'];
foreach ($checks as $f => [$lab, $amber, $red]) {
  $path = __DIR__ . '/' . $f;
  /* the robot skips uploading a file that did not change, so its last good fetch is the true age */
  $fk = $feedOf[$f] ?? basename($f, '.json'); $okAt = isset($src[$fk]['ok']) ? strtotime((string) $src[$fk]['ok']) : false;
  if ($okAt) { $t = $okAt; $h = (time() - $t) / 3600; [$c, $w] = $h < $amber ? ['#3ddc97', 'fresh'] : ($h < $red ? ['#f5c45c', 'late'] : ['#f87171', 'stale']);
    echo '<tr><td>' . htmlspecialchars($lab) . '</td><td class="n">' . date('j M H:i', $t) . '</td><td class="n">' . oo_age($t) . '</td><td style="color:' . $c . '">● ' . $w . '</td></tr>'; continue; }
  if (!is_file($path)) { echo '<tr><td>' . htmlspecialchars($lab) . '</td><td class="n">–</td><td class="n">–</td><td style="color:#f87171">missing</td></tr>'; continue; }
  $t = filemtime($path); $h = (time() - $t) / 3600;
  [$c, $w] = $h < $amber ? ['#3ddc97', 'fresh'] : ($h < $red ? ['#f5c45c', 'late'] : ['#f87171', 'stale']);
  echo '<tr><td>' . htmlspecialchars($lab) . '</td><td class="n">' . date('j M H:i', $t) . '</td><td class="n">' . oo_age($t) . '</td><td style="color:' . $c . '">● ' . $w . '</td></tr>';
}
/* v46: the emails, from the robot's own record of its last mail step */
$ms = is_array($src['mail'] ?? null) ? $src['mail'] : null;
if ($ms) {
  $mf = (int) ($ms['fails'] ?? 0); $mok = isset($ms['ok']) ? strtotime((string) $ms['ok']) : false;
  [$c, $w] = $mf >= 2 ? ['#f87171', 'failing'] : ($mf === 1 ? ['#f5c45c', 'failed once'] : ['#3ddc97', 'ok']);
  echo '<tr><td>Emails</td><td class="n">' . ($mok ? date('j M H:i', $mok) : '–') . '</td><td class="n">' . ($mok ? oo_age($mok) : '–') . '</td><td style="color:' . $c . '" title="' . htmlspecialchars((string) ($ms['status'] ?? '')) . '">● ' . $w . '</td></tr>';
}
echo '</table><p class="dim">Green: on time. Amber: a run was missed. Red: check the robot report on GitHub.</p>';
$sub = __DIR__ . '/subs/subscribers.csv'; $act = __DIR__ . '/subs/monitoring-active.txt';
/* ---- private: did every paying client get their emails? (from the robot's delivery log) ---- */
$st = is_file(__DIR__ . '/subs/state.json') ? (json_decode((string) file_get_contents(__DIR__ . '/subs/state.json'), true) ?: []) : [];
$lg = is_array($st['log'] ?? null) ? $st['log'] : [];
$paying = is_file($act) ? array_values(array_filter(array_map('trim', file($act)))) : [];
echo '<h2>Paying clients: email delivery</h2>';
if (!$paying) { echo '<p class="dim">No paying clients yet.</p>'; }
else {
  echo '<table><tr><th>Client</th><th class="n">Last email</th><th class="n">Type</th><th class="n">In 7 days</th><th>Status</th></tr>';
  $since = gmdate('Y-m-d', time() - 7 * 86400); $late = gmdate('Y-m-d', time() - 8 * 86400);
  foreach ($paying as $e) {
    $e = strtolower($e); $mine = array_values(array_filter($lg, fn($x) => ($x['e'] ?? '') === $e));
    $okd = array_values(array_filter($mine, fn($x) => !empty($x['ok'])));
    $last = $okd ? end($okd) : null;
    $n7 = count(array_filter($okd, fn($x) => substr((string) $x['d'], 0, 10) >= $since));
    $fail = count(array_filter($mine, fn($x) => empty($x['ok']) && substr((string) $x['d'], 0, 10) >= $since));
    $bad = !$last || substr((string) $last['d'], 0, 10) < $late || $fail;
    echo '<tr><td>' . htmlspecialchars($e) . '</td><td class="n">' . ($last ? htmlspecialchars(substr((string) $last['d'], 0, 16)) : 'never') . '</td><td class="n">' . htmlspecialchars((string) ($last['k'] ?? '–')) . '</td><td class="n">' . $n7 . '</td><td style="color:' . ($bad ? '#f87171">● check' . ($fail ? " ($fail failed)" : '') : '#3ddc97">● fine') . '</td></tr>';
  }
  echo '</table><p class="dim">Red: no email in 8 days or a failed send. Every paying client gets at least the Monday edition each week, so red always means something to check.</p>';
}
echo '<h2>Subscribers</h2><p>Monday brief and monitoring sign-ups: ' . (is_file($sub) ? count(file($sub)) : 0) . ' · paying monitoring clients: ' . (is_file($act) ? count(array_filter(file($act, FILE_IGNORE_NEW_LINES))) : 0) . '</p>';
$all = oo_subs_rows();
$col = ['subscribed' => '#3ddc97', 'paying' => '#3ddc97', 'payment pending' => '#f5c45c', 'unsubscribed' => '#868c90'];
echo '<form method="post" style="margin:8px 0 14px"><input type="hidden" name="key" value="' . htmlspecialchars($key) . '"><button name="csv" value="1">Download all as CSV</button></form>';
if (!$all) { echo '<p class="dim">No sign-ups yet.</p>'; }
else {
  echo '<div style="overflow-x:auto"><table><tr><th>Signed up</th><th>Email</th><th>Plan</th><th>Minerals</th><th>Product</th><th>Lang</th><th>Status</th></tr>';
  foreach ($all as $r) {
    echo '<tr><td class="n">' . htmlspecialchars($r['since'] ? substr($r['since'], 0, 10) : '–') . '</td><td><a href="mailto:' . htmlspecialchars($r['email']) . '">' . htmlspecialchars($r['email']) . '</a></td><td>' . htmlspecialchars($r['plan']) . '</td><td>' . htmlspecialchars($r['minerals'] ?: 'all') . '</td><td>' . htmlspecialchars($r['product'] ?: '–') . '</td><td>' . htmlspecialchars($r['lang']) . '</td><td style="color:' . $col[$r['status']] . '">● ' . htmlspecialchars($r['status']) . '</td></tr>';
  }
  echo '</table></div><p class="dim">"Payment pending": signed up for monitoring but has not paid (yet). Worth a short personal email.</p>';
}


