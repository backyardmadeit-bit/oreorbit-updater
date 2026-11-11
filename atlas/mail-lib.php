<?php
/* OreOrbit: branded emails sent from the website (welcome emails, payment confirmations). */
declare(strict_types=1);
/* Czech typography: no single-letter word at a line end (text only, tags untouched) */
function oo_nb(string $html): string {
    return preg_replace_callback('/>([^<]+)</u', fn($m) => '>' . preg_replace('/(^|[\s\x{00a0}(„“])([vkszaiouVKSZAIOU]) +(?=\S)/u', '$1$2' . "\u{00a0}", preg_replace('/(^|[\s\x{00a0}(„“])([vkszaiouVKSZAIOU]) +(?=\S)/u', '$1$2' . "\u{00a0}", $m[1])) . '<', $html);
}
function oo_h(string $t): string { return htmlspecialchars($t, ENT_QUOTES, 'UTF-8'); }
function oo_token(string $email): string {
    $cfg = @include __DIR__ . '/update-config.php';
    $k = (is_array($cfg) && !empty($cfg['key_sha256'])) ? strtolower((string) $cfg['key_sha256']) : 'oreorbit';
    return substr(hash_hmac('sha256', strtolower($email), $k), 0, 24);
}
function oo_unsub(string $email): string { return 'https://bohemiadefense.com/atlas/unsubscribe.php?e=' . rawurlencode(strtolower($email)) . '&t=' . oo_token($email); }
/* $blocks: [[heading, [item html, ...]], ...] */
function oo_mail_html(bool $cs, string $kicker, string $title, string $lede, array $blocks, string $ctaLabel, string $ctaUrl, string $email): string {
    $h = oo_mail_html0($cs, $kicker, $title, $lede, $blocks, $ctaLabel, $ctaUrl, $email);
    return $cs ? oo_nb($h) : $h;
}
function oo_mail_html0(bool $cs, string $kicker, string $title, string $lede, array $blocks, string $ctaLabel, string $ctaUrl, string $email): string {
    $rows = '';
    foreach ($blocks as [$head, $items]) {
        if (!$items) { continue; }
        $rows .= '<tr><td style="padding:22px 0 6px;font:12px/1.4 Menlo,Consolas,monospace;color:#5b6267">' . oo_h($head) . '</td></tr>';
        foreach ($items as $it) { $rows .= '<tr><td style="padding:10px 0;border-top:1px solid #e6e8e5;font:15px/1.55 Arial,sans-serif;color:#13171a">' . $it . '</td></tr>'; }
    }
    $dots = '';
    foreach (['#a78bfa','#fb923c','#facc15','#a9b8cc','#22d3ee','#4ade80','#f472b6','#60a5fa','#a3e635','#e4e4e7'] as $c) { $dots .= '<span style="display:inline-block;width:8px;height:8px;border-radius:4px;background:' . $c . ';margin-right:4px"></span>'; }
    return '<!doctype html><html><body style="margin:0;background:#f3f4f1"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f1"><tr><td align="center" style="padding:24px 12px">'
        . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px">'
        . '<tr><td style="background:#050607;border-radius:14px 14px 0 0;padding:24px 28px"><div style="font:600 16px Arial,sans-serif;color:#eceee9">OreOrbit <span style="font-weight:400;color:#a3aaae">· ' . oo_h($cs ? 'Kritické suroviny z oběžné dráhy' : 'Critical minerals from orbit') . '</span></div><div style="margin-top:12px">' . $dots . '</div></td></tr>'
        . '<tr><td style="padding:28px 28px 8px"><p style="margin:0 0 8px;font:12px Menlo,Consolas,monospace;color:#0f6b46">' . oo_h($kicker) . '</p>'
        . '<h1 style="margin:0;font:600 25px/1.25 Arial,sans-serif;color:#050607">' . oo_h($title) . '</h1><p style="margin:12px 0 0;font:15px/1.6 Arial,sans-serif;color:#3b4247">' . $lede . '</p></td></tr>'
        . '<tr><td style="padding:0 28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">' . $rows . '</table></td></tr>'
        . '<tr><td style="padding:26px 28px"><a href="' . oo_h($ctaUrl) . '" style="display:inline-block;background:#050607;color:#eceee9;text-decoration:none;font:600 14px Arial,sans-serif;padding:13px 22px;border-radius:999px">' . oo_h($ctaLabel) . '</a></td></tr>'
        . '<tr><td style="padding:18px 28px 26px;border-top:1px solid #e6e8e5;font:12px/1.6 Arial,sans-serif;color:#868c90">Bohemia Defense · David Madali · IČO 22229957 · <a href="https://bohemiadefense.com/atlas/" style="color:#868c90">bohemiadefense.com/atlas</a><br>'
        . '<a href="' . oo_h(oo_unsub($email)) . '" style="color:#868c90">' . oo_h($cs ? 'Odhlásit odběr' : 'Unsubscribe') . '</a></td></tr></table></td></tr></table></body></html>';
}
/* a small SMTP client. Tries SSL on 465, then STARTTLS on 587; every server reply is logged for the test page */
$GLOBALS['OO_MAIL_LOG'] = [];
function oo_log(string $l): void { $GLOBALS['OO_MAIL_LOG'][] = $l; }
function oo_smtp(string $to, string $raw, array $c, int $port, bool $starttls): bool {
    $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'SNI_enabled' => true]]);
    $addr = ($starttls ? 'tcp://' : 'ssl://') . $c['host'] . ':' . $port;
    $fp = @stream_socket_client($addr, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) { oo_log("$addr: cannot connect ($errno $errstr)"); return false; }
    stream_set_timeout($fp, 20);
    $read = function () use ($fp): string { $out = ''; while (($l = fgets($fp, 1024)) !== false) { $out .= $l; if (strlen($l) < 4 || $l[3] === ' ') { break; } } return $out; };
    $cmd = function (string $c, string $ok, string $show = '') use ($fp, $read, $addr): bool { fwrite($fp, $c . "\r\n"); $r = $read(); $good = str_starts_with($r, $ok); oo_log("$addr " . ($show ?: $c) . ' → ' . trim(substr($r, 0, 120))); return $good; };
    $hello = $read(); oo_log("$addr hello → " . trim(substr($hello, 0, 120)));
    $ok = str_starts_with($hello, '220') && $cmd('EHLO bohemiadefense.com', '250');
    if ($ok && $starttls) {
        $ok = $cmd('STARTTLS', '220') && @stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT);
        if (!$ok) { oo_log("$addr STARTTLS failed"); }
        $ok = $ok && $cmd('EHLO bohemiadefense.com', '250');
    }
    $ok = $ok && $cmd('AUTH LOGIN', '334') && $cmd(base64_encode($c['user']), '334', 'user') && $cmd(base64_encode($c['pass']), '235', 'password')
        && $cmd('MAIL FROM:<' . $c['from'] . '>', '250') && $cmd('RCPT TO:<' . $to . '>', '25', 'RCPT TO') && $cmd('DATA', '354');
    if ($ok) { fwrite($fp, str_replace("\n.", "\n..", $raw) . "\r\n.\r\n"); $r = $read(); $ok = str_starts_with($r, '250'); oo_log("$addr message → " . trim(substr($r, 0, 120))); }
    @fwrite($fp, "QUIT\r\n"); fclose($fp);
    return $ok;
}
function oo_send(string $to, string $subject, string $html, string $replyTo = 'david@madali.cz'): bool {
    $c = @include __DIR__ . '/mail-config.php';
    $from = (is_array($c) && !empty($c['from'])) ? $c['from'] : 'brief@bohemiadefense.com';
    $b = 'oo' . bin2hex(random_bytes(8));
    $text = trim(html_entity_decode(strip_tags(str_replace(['</tr>', '<br>', '</p>'], "\n", $html)), ENT_QUOTES, 'UTF-8'));
    $subj = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $head = 'From: =?UTF-8?B?' . base64_encode('OreOrbit') . "?= <$from>\r\nTo: <$to>\r\nSubject: $subj\r\nDate: " . date('r') . "\r\nMessage-ID: <" . bin2hex(random_bytes(12)) . "@bohemiadefense.com>\r\nReply-To: $replyTo\r\nMIME-Version: 1.0\r\n"
          . 'List-Unsubscribe: <' . oo_unsub($to) . ">\r\nContent-Type: multipart/alternative; boundary=\"$b\"\r\n";
    $body = "--$b\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode(preg_replace("/\n{3,}/", "\n\n", $text)))
          . "--$b\r\nContent-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($html)) . "--$b--";
    if (is_array($c) && !empty($c['pass'])) {
        if (oo_smtp($to, $head . "\r\n" . $body, $c, (int) ($c['port'] ?? 465), false)) { return true; }
        if (oo_smtp($to, $head . "\r\n" . $body, $c, 587, true)) { return true; }
    } else { oo_log('mail-config.php: no password set'); }
    /* last resort: the hosting's own mail function, with the mailbox as the sender */
    $h2 = preg_replace("/^(To|Subject): .*\r\n/m", '', $head);
    $ok = @mail($to, $subj, $body, $h2, '-f' . $from);
    if (!$ok) { $ok = @mail($to, $subj, $body, $h2); }
    oo_log('PHP mail(): ' . ($ok ? 'accepted by the hosting' : 'refused by the hosting'));
    return $ok;
}
/* plain notifications to David, through the same mailbox */
function oo_notify(string $subject, string $text): bool {
    return oo_send('david@madali.cz', $subject, '<pre style="font:14px/1.5 Menlo,Consolas,monospace">' . oo_h($text) . '</pre>', 'david@madali.cz');
}
function oo_min_names(array $mins, bool $cs): string {
    $n = ['ree' => ['Rare earths', 'Vzácné zeminy'], 'ti' => ['Titanium', 'Titan'], 'w' => ['Tungsten', 'Wolfram'], 'sb' => ['Antimony', 'Antimon'], 'ga' => ['Gallium', 'Galium'],
          'ge' => ['Germanium', 'Germanium'], 'li' => ['Lithium', 'Lithium'], 'co' => ['Cobalt', 'Kobalt'], 'ni' => ['Nickel', 'Nikl'], 'gr' => ['Graphite', 'Grafit'], 'mg' => ['Magnesium', 'Hořčík'], 'mn' => ['Manganese', 'Mangan']];
    $out = [];
    foreach ($mins as $m) { if (isset($n[$m])) { $out[] = $n[$m][$cs ? 1 : 0]; } }
    if ($out) { return implode(', ', $out); }
    $k = count($n);   // the number of minerals is counted, never typed in
    $en = [10 => 'ten', 11 => 'eleven', 12 => 'twelve', 13 => 'thirteen', 14 => 'fourteen', 15 => 'fifteen', 16 => 'sixteen'];
    $cz = [10 => 'deset', 11 => 'jedenáct', 12 => 'dvanáct', 13 => 'třináct', 14 => 'čtrnáct', 15 => 'patnáct', 16 => 'šestnáct'];
    return $cs ? 'všech ' . ($cz[$k] ?? (string)$k) . ' surovin' : 'all ' . ($en[$k] ?? (string)$k) . ' minerals';
}
/* the welcome email for the free Monday brief */
function oo_welcome_brief(string $email, array $mins, bool $cs): bool {
    $names = oo_mail_html($cs, $cs ? 'Vítejte · Pondělní přehled' : 'Welcome · The Monday brief',
        $cs ? 'Hotovo. První přehled přijde v pondělí.' : "You're in. Your first brief arrives on Monday.",
        oo_h($cs ? 'Každé pondělí ráno dostanete týden v kritických surovinách pro: ' : 'Every Monday morning you get the week in critical minerals for: ') . '<b>' . oo_h(oo_min_names($mins, $cs)) . '</b>.',
        [[$cs ? 'Co v něm najdete' : "What you'll get", array_map('oo_h', $cs ? ['Nejbližší termíny, které se vašich surovin týkají', 'Co se za týden pohnulo, v titulcích a se zdroji', 'Odkaz na plná data v atlasu'] : ['The next deadlines that affect your minerals', 'What moved this week, in headlines with sources', 'A link to the full data on the atlas'])],
         [$cs ? 'Vaše suroviny' : 'Your minerals', [oo_h($cs ? 'Chcete jiné suroviny? V atlasu v části „Tento týden“ klikněte u pondělního přehledu na „změnit“, vyberte je a přihlaste se znovu stejným e-mailem.' : 'Want different minerals? On the atlas, in “This week”, click “change” next to the Monday brief, pick them and sign up again with the same email.')]],
         [$cs ? 'Mezitím' : 'Meanwhile', [($cs ? 'Zjistěte, na čem závisí váš výrobek: ' : 'See what your product depends on: ') . '<a href="https://bohemiadefense.com/atlas/' . ($cs ? '?lang=cs' : '') . '#check" style="color:#0f6b46">' . oo_h($cs ? 'rychlá kontrola' : 'the quick check') . '</a>']]],
        $cs ? 'Otevřít atlas' : 'Open the atlas', 'https://bohemiadefense.com/atlas/' . ($cs ? '?lang=cs' : ''), $email);
    return oo_send($email, $cs ? 'Vítejte v pondělním přehledu OreOrbit' : 'Welcome to the OreOrbit Monday brief', $names);
}
/* the welcome email after a monitoring payment: personal, warm, a little exclusive */
function oo_welcome_paid(string $email, array $mins, bool $cs): bool {
    $names = oo_h(oo_min_names($mins, $cs));
    $lede = $cs
        ? 'Děkujeme, že jste se k nám přidali. Od dnešního dne patříte k malému okruhu firem, které vidí změny u svých surovin dřív, než dorazí do dodavatelského řetězce. Hlídáme pro vás: <b>' . $names . '</b>.'
        : 'Thank you for joining us. From today you are part of a small circle of companies that see changes to their minerals before they reach the supply chain. We are now watching: <b>' . $names . '</b>.';
    $html = oo_mail_html($cs, $cs ? 'Vítejte v OreOrbit' : 'Welcome to OreOrbit',
        $cs ? 'Vítejte v OreOrbit. Jsme rádi, že jste s námi.' : "Welcome to OreOrbit. We're glad you're here.",
        $lede,
        [[$cs ? 'Co pro vás od dnešního dne děláme' : 'What we do for you, starting today', array_map('oo_h', $cs ? ['Upozornění ještě v den, kdy se u vašich surovin něco změní: vývozní kontroly, výpadky závodů, ceny i zprávy.', 'Každé pondělí osobní vydání jen pro vás: stav vašich surovin, co to znamená a co se blíží, s daty v příloze (CSV).', 'Připomínky termínů 30, 14 a 7 dní předem, abyste nikdy nebyli zaskočeni.', 'Upozornění, když lokalita vašich surovin ztichne, rozjede se nebo u ní vyskočí oxid siřičitý.', 'Jednou měsíčně se nás můžete na cokoli zeptat: stačí odpovědět na kterýkoli náš e-mail. Odpoví člověk do dvou pracovních dnů.'] : ['An alert the moment something changes for your minerals: export controls, plant outages, prices and news.', 'Every Monday a personal edition, just for you: where your minerals stand, what it means and what is coming, with the data attached (CSV).', 'Deadline reminders 30, 14 and 7 days ahead, so nothing catches you off guard.', 'An alert when a site for your minerals goes quiet, starts up or shows a sulphur dioxide spike.', 'One question a month about your minerals or suppliers: reply to any of our emails, and a person answers within two working days.'])],
         [$cs ? 'Vaše suroviny' : 'Your minerals', [($cs ? 'Sledujeme: ' : 'We watch: ') . '<b>' . $names . '</b>. ' . oo_h($cs ? 'Chcete jiné? Stačí odpovědět na tento e-mail a změníme je ještě dnes.' : 'Want different ones? Just reply to this email and we will change them today.')]],
         [$cs ? 'Vaše předplatné' : 'Your subscription', [oo_h($cs ? 'Platbu, faktury i zrušení spravujete sami: ' : 'Manage payment, invoices or cancel yourself: ') . '<a href="https://bohemiadefense.com/atlas/manage.php" style="color:#0f6b46">' . oo_h($cs ? 'spravovat předplatné' : 'manage subscription') . '</a>. ' . oo_h($cs ? 'Nevidíte přínos? Během prvního měsíce vám na požádání vrátíme peníze.' : 'Not seeing the value? Ask within the first month and we refund you in full.')]],
         [$cs ? 'Osobně' : 'Personally', [oo_h($cs ? 'Na tento e-mail odpovídá osobně David Madali, zakladatel. Když budete chtít probrat cokoli kolem vašich surovin nebo dodavatelů, napište nebo si rovnou vyberte termín krátkého hovoru.' : 'David Madali, the founder, answers this email personally. Whenever you want to talk about your minerals or suppliers, write back, or pick a time for a short call.') . '<br><br><b>David Madali</b><br><span style="color:#5b6267">' . oo_h($cs ? 'zakladatel, Bohemia Defense · autor OreOrbit' : 'Founder, Bohemia Defense · Creator of OreOrbit') . '</span>']]],
        $cs ? 'Vybrat termín hovoru' : 'Pick a time to talk', 'https://calendly.com/david-madali/30min', $email);
    return oo_send($email, $cs ? 'Vítejte v OreOrbit, jsme rádi, že jste s námi' : "Welcome to OreOrbit, we're glad you're here", $html);
}
/* remember whom the website welcomed, so the robot only sends the ones that did not go out */
function oo_mark_welcomed(string $email, string $kind): void {
    $d = __DIR__ . '/subs'; if (!is_dir($d)) { @mkdir($d, 0750, true); }
    @file_put_contents($d . '/welcomed.txt', strtolower($email) . '|' . $kind . "\n", FILE_APPEND | LOCK_EX);
}
/* answer the browser at once, then send the emails: the visitor never waits for the mail server */
function oo_reply_now(string $json): void {
    ignore_user_abort(true);
    header('Content-Type: application/json; charset=utf-8');
    header('Content-Length: ' . strlen($json));
    header('Connection: close');
    echo $json;
    while (ob_get_level() > 0) { @ob_end_flush(); }
    @flush();
    if (function_exists('fastcgi_finish_request')) { @fastcgi_finish_request(); }
}
