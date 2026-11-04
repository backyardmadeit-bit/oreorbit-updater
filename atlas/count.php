<?php
/*
 * OreOrbit visitor counter. Adds 1 to a daily total for one named event ("atlas", "qc:drones", "act:mail" ...).
 * Stores no IP address, no cookie, no browser details: only the date, the event name and a number.
 * Bots and automated browsers are not counted. The totals live in stats/, which the web cannot open.
 */
header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: *');
$e = isset($_GET['e']) ? (string)$_GET['e'] : '';
$ua = isset($_SERVER['HTTP_USER_AGENT']) ? strtolower((string)$_SERVER['HTTP_USER_AGENT']) : '';
if (!preg_match('/^[a-z0-9:-]{1,40}$/', $e) || $ua === '' || preg_match('/bot|crawl|spider|slurp|preview|headless|python|curl|wget|monitor/', $ua)) {
    http_response_code(204);
    exit;
}
$dir = __DIR__ . '/stats';
if (!is_dir($dir)) {
    @mkdir($dir, 0755, true);
    @file_put_contents($dir . '/.htaccess', "<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n");
}
$day = gmdate('Y-m-d');
$fh = @fopen($dir . '/' . gmdate('Y-m') . '.json', 'c+');
if ($fh && flock($fh, LOCK_EX)) {
    $raw = stream_get_contents($fh);
    $data = $raw ? json_decode($raw, true) : array();
    if (!is_array($data)) {
        $data = array();
    }
    if (!isset($data[$day]) || !is_array($data[$day])) {
        $data[$day] = array();
    }
    if (isset($data[$day][$e]) || count($data[$day]) < 400) {
        $data[$day][$e] = (isset($data[$day][$e]) ? (int)$data[$day][$e] : 0) + 1;
    }
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($data));
    fflush($fh);
    flock($fh, LOCK_UN);
}
if ($fh) {
    fclose($fh);
}
http_response_code(204);
