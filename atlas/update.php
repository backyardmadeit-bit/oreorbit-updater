<?php
/*
 * Critical Minerals from Orbit: receives fresh data from the atlas's scheduled update.
 *
 * Only requests carrying the secret key (header X-Atlas-Key) whose SHA-256 hash is stored in
 * update-config.php are accepted. Only the atlas's own data files and pictures can be written,
 * and only inside this folder. Nothing else on the website can be changed through this file.
 *
 *   GET  update.php            -> what is already here (names, sizes and hashes), so only changes are sent;
 *                                 first removes old pictures nothing uses any more (see prune_images)
 *   POST update.php?f=<path>   -> writes one file; the body is the file itself
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');

function reply(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

$cfg = @include __DIR__ . '/update-config.php';
if (!is_array($cfg) || empty($cfg['key_sha256']) || !is_string($cfg['key_sha256'])) {
    reply(503, ['ok' => false, 'error' => 'not configured']);
}
$key = isset($_SERVER['HTTP_X_ATLAS_KEY']) ? (string)$_SERVER['HTTP_X_ATLAS_KEY'] : '';
if ($key === '' || !hash_equals(strtolower($cfg['key_sha256']), hash('sha256', $key))) {
    usleep(400000);
    reply(403, ['ok' => false, 'error' => 'forbidden']);
}

const MAX_BYTES = 4194304; // 4 MB per file
const ALLOWED = '#^(?:live-data/(?:live/[a-z0-9]{1,32}|meta/status|news|briefs|watch|memory)\.json'
    . '|data/(?:imagery|orbit-extras|timelapse|landsat|emit)\.json'
    . '|data/terrain/[a-z0-9-]{1,48}\.json'
    . '|img/[a-z0-9-]{1,96}\.(?:jpg|png)'
    . '|p/[a-z0-9-]{1,60}\.html|sitemap\.xml)$#';

const PRUNE_AFTER_DAYS = 7;          // an unused picture is kept this long after it was last written
const PRUNE_KEEP = ['og-oreorbit.png']; // never removed, whatever the data files say

/*
 * Removes pictures in img/ that no data file, index.html or index.php mentions any more, once they are
 * at least PRUNE_AFTER_DAYS old, so a picture sent just before the data file that uses it is never
 * touched. Also removes half-written .part files an interrupted upload left behind.
 * It does nothing if it cannot read every file it checks, if data/imagery.json is missing or broken,
 * or if it would remove more than half of the pictures: in those cases something is wrong and keeping
 * files is the safe choice. Returns the paths it removed.
 */
function prune_images(): array
{
    $root = __DIR__;
    $imagery = @file_get_contents($root . '/data/imagery.json');
    $decoded = $imagery === false ? null : json_decode($imagery, true);
    if (!is_array($decoded) || !$decoded) {
        return [];
    }
    $sources = array_merge(
        glob($root . '/data/*.json') ?: [],
        glob($root . '/data/terrain/*.json') ?: [],
        glob($root . '/live-data/*.json') ?: [],
        glob($root . '/live-data/live/*.json') ?: [],
        glob($root . '/live-data/meta/*.json') ?: [],
        glob($root . '/p/*.html') ?: [],
        [$root . '/index.html', $root . '/index.php', $root . '/atlas-v2.js']
    );
    $text = '';
    foreach ($sources as $path) {
        $t = @file_get_contents($path);
        if ($t === false) {
            return [];
        }
        $text .= $t . "\n";
    }

    $now = time();
    $removed = [];
    $pictures = 0;
    $unused = [];
    foreach (@scandir($root . '/img') ?: [] as $name) {
        $path = $root . '/img/' . $name;
        if (!is_file($path) || !preg_match('#^[a-z0-9-]{1,96}\.(?:jpg|png)$#', $name)) {
            continue;
        }
        $pictures++;
        if (in_array($name, PRUNE_KEEP, true) || strpos($text, $name) !== false) {
            continue;
        }
        $mtime = @filemtime($path);
        if ($mtime !== false && $mtime < $now - PRUNE_AFTER_DAYS * 86400) {
            $unused[] = $name;
        }
    }
    if (count($unused) * 2 > $pictures) {
        return [];
    }
    foreach ($unused as $name) {
        if (@unlink($root . '/img/' . $name)) {
            $removed[] = 'img/' . $name;
        }
    }

    foreach (['img', 'data', 'data/terrain', 'live-data', 'live-data/live', 'live-data/meta'] as $dir) {
        foreach (glob($root . '/' . $dir . '/*.part-*') ?: [] as $path) {
            $mtime = @filemtime($path);
            if (is_file($path) && $mtime !== false && $mtime < $now - 3600 && @unlink($path)) {
                $removed[] = $dir . '/' . basename($path);
            }
        }
    }
    return $removed;
}

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';

if ($method === 'GET') {
    $pruned = [];
    try {
        $pruned = prune_images();
    } catch (Throwable $e) {
        $pruned = [];
    }
    $files = [];
    foreach (['live-data/live', 'live-data/meta', 'live-data', 'data', 'data/terrain', 'img', 'p', '.'] as $dir) {
        $abs = __DIR__ . '/' . $dir;
        if (!is_dir($abs)) {
            continue;
        }
        foreach (scandir($abs) ?: [] as $name) {
            $rel = $dir === '.' ? $name : $dir . '/' . $name;
            if (!is_file($abs . '/' . $name) || !preg_match(ALLOWED, $rel)) {
                continue;
            }
            $size = filesize($abs . '/' . $name);
            $files[$rel] = [
                'bytes' => $size,
                'md5' => $size <= MAX_BYTES ? md5_file($abs . '/' . $name) : null,
            ];
        }
    }
    $out = ['ok' => true, 'files' => $files, 'php' => PHP_VERSION];
    if ($pruned) {
        $out['pruned'] = $pruned;
    }
    reply(200, $out);
}

if ($method !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'method not allowed']);
}

$f = isset($_GET['f']) ? (string)$_GET['f'] : '';
if (!preg_match(ALLOWED, $f)) {
    reply(400, ['ok' => false, 'error' => 'file not allowed']);
}
$body = file_get_contents('php://input', false, null, 0, MAX_BYTES + 1);
if ($body === false || $body === '') {
    reply(400, ['ok' => false, 'error' => 'empty body']);
}
if (strlen($body) > MAX_BYTES) {
    reply(413, ['ok' => false, 'error' => 'too large']);
}
$ext = strtolower(pathinfo($f, PATHINFO_EXTENSION));
if ($ext === 'json') {
    json_decode($body);
    if (json_last_error() !== JSON_ERROR_NONE) {
        reply(400, ['ok' => false, 'error' => 'not valid JSON']);
    }
} elseif ($ext === 'png') {
    if (substr($body, 0, 8) !== "\x89PNG\r\n\x1a\n") {
        reply(400, ['ok' => false, 'error' => 'not a PNG']);
    }
} elseif ($ext === 'jpg') {
    if (substr($body, 0, 3) !== "\xFF\xD8\xFF") {
        reply(400, ['ok' => false, 'error' => 'not a JPEG']);
    }
} elseif ($ext === 'html') {
    // the readable pages: plain HTML with structured data only. No scripts that run, no event handlers,
    // no frames or embeds, no javascript: links, no PHP. A leaked key could not be used to plant code.
    $low = strtolower($body);
    if (strncmp(ltrim($low), '<!doctype html', 14) !== 0) {
        reply(400, ['ok' => false, 'error' => 'not an HTML page']);
    }
    $clean = str_replace('<script src="../library.js" defer></script>', '', (string)preg_replace('#<script type="application/ld\+json">.*?</script>#s', '', $low));
    if (strpos($clean, '<script') !== false || strpos($low, '<?') !== false || strpos($low, 'javascript:') !== false
        || preg_match('#<(?:iframe|object|embed|frame|base|meta\s+http-equiv)\b#', $low) || preg_match('#\son[a-z]+\s*=#', $low)) {
        reply(400, ['ok' => false, 'error' => 'page contains something not allowed']);
    }
} elseif ($ext === 'xml') {
    $low = strtolower($body);
    if (strncmp(ltrim($low), '<?xml', 5) !== 0 || strpos($low, '<urlset') === false || strpos($low, '<script') !== false) {
        reply(400, ['ok' => false, 'error' => 'not a sitemap']);
    }
} else {
    reply(400, ['ok' => false, 'error' => 'file not allowed']);
}

$dest = __DIR__ . '/' . $f;
$dir = dirname($dest);
if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
    reply(500, ['ok' => false, 'error' => 'cannot create folder']);
}
$tmp = $dest . '.part-' . bin2hex(random_bytes(4));
if (file_put_contents($tmp, $body, LOCK_EX) === false) {
    reply(500, ['ok' => false, 'error' => 'cannot write']);
}
@chmod($tmp, 0644);
if (!rename($tmp, $dest)) {
    @unlink($tmp);
    reply(500, ['ok' => false, 'error' => 'cannot replace']);
}
reply(200, ['ok' => true, 'file' => $f, 'bytes' => strlen($body), 'md5' => md5($body)]);
