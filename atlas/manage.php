<?php
/* OreOrbit: "manage or cancel your subscription" goes to Stripe's customer portal (set portal_link in pay-config.php). */
declare(strict_types=1);
header('X-Robots-Tag: noindex, nofollow'); header('Cache-Control: no-store');
$pay = @include __DIR__ . '/pay-config.php';
$url = (is_array($pay) && !empty($pay['portal_link']) && str_starts_with((string) $pay['portal_link'], 'https://')) ? (string) $pay['portal_link'] : '';
if ($url !== '') { header('Location: ' . $url, true, 302); exit; }
header('Location: mailto:david@madali.cz?subject=' . rawurlencode('OreOrbit: manage my subscription'), true, 302);
