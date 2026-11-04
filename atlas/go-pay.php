<?php
/* OreOrbit: "Start monitoring" goes straight to the Stripe payment page.
   The chosen minerals travel with the payment (client_reference_id), so nothing has to be typed twice. */
declare(strict_types=1);
header('X-Robots-Tag: noindex, nofollow'); header('Cache-Control: no-store');
$allowed = ['ree', 'ti', 'w', 'sb', 'ga', 'ge', 'li', 'co', 'ni', 'gr', 'mg', 'mn'];
$mins = array_values(array_intersect(array_map('trim', explode(',', strtolower((string) ($_GET['m'] ?? '')))), $allowed));
$other = substr(trim(preg_replace('/[^a-z0-9 ,\-]/', '', strtolower((string) ($_GET['o'] ?? '')))), 0, 40);
$lang = ($_GET['l'] ?? '') === 'cs' ? 'cs' : 'en';
$pay = @include __DIR__ . '/pay-config.php';
$link = (is_array($pay) && !empty($pay['payment_link']) && str_starts_with((string) $pay['payment_link'], 'https://')) ? (string) $pay['payment_link'] : '';
if ($link === '') { header('Location: ./' . ($lang === 'cs' ? '?lang=cs' : '') . '#teams', true, 302); exit; }
/* minerals | other minerals | language, hex-encoded: Stripe accepts letters and digits there */
$ref = bin2hex(implode(',', $mins) . '|' . $other . '|' . $lang);
header('Location: ' . $link . (str_contains($link, '?') ? '&' : '?') . 'client_reference_id=' . $ref . ($lang === 'cs' ? '&locale=cs' : ''), true, 302);
