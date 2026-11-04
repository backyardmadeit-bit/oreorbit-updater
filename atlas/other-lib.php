<?php
/* OreOrbit: "other minerals" a monitoring client may add. The allow-list is data/other-minerals.json, the same file
   the atlas uses for autocomplete and the robot uses for the news questions. Only its ids are ever accepted. */
declare(strict_types=1);

function oo_other_list(): array {
    static $list = null;
    if ($list !== null) { return $list; }
    $list = [];
    $j = json_decode((string) @file_get_contents(__DIR__ . '/data/other-minerals.json'), true);
    foreach ((is_array($j) ? ($j['other'] ?? []) : []) as $o) {
        if (is_array($o) && isset($o['id']) && is_string($o['id']) && preg_match('/^[a-z]{1,4}$/', $o['id'])) { $list[$o['id']] = $o; }
    }
    return $list;
}

/* "cu, sn,xx,cu" -> ['cu', 'sn']: known ids only, no repeats, at most three */
function oo_other_ids(string $raw): array {
    $ok = oo_other_list(); $out = [];
    foreach (explode(',', strtolower($raw)) as $t) {
        $t = trim($t);
        if ($t !== '' && isset($ok[$t]) && !in_array($t, $out, true)) { $out[] = $t; }
    }
    return array_slice($out, 0, 3);
}
