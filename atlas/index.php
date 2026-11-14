<?php
/*
 * OreOrbit (Critical minerals from orbit): serves index.html with the latest Monday brief and stories
 * written into the page as plain HTML, so search engines, link previews and visitors without JavaScript
 * or WebGL see real content. The data comes from live-data/, which the atlas's scheduled update refreshes.
 * Browsers that run JavaScript hide this block and show the interactive atlas. If anything here fails,
 * the page is served exactly as it is in index.html.
 *
 * Run from the command line (php index.php) it prints the English block, which the build puts into
 * index.html as the fallback for hosts that do not run this file.
 */
declare(strict_types=1);

const OO_BASE = 'https://bohemiadefense.com/atlas/';
const OO_MON_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const OO_MON_CS = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'];

function oo_e($s): string
{
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML5, 'UTF-8');
}

function oo_json(string $rel): array
{
    $t = @file_get_contents(__DIR__ . '/' . $rel);
    if ($t === false) {
        return [];
    }
    $d = json_decode($t, true);
    return is_array($d) ? $d : [];
}

function oo_day($iso, bool $cs): string
{
    if (!is_string($iso) || !preg_match('/^(\d{4})-(\d{2})-(\d{2})/', $iso, $m)) {
        return '';
    }
    $d = (int)$m[3];
    $mo = (int)$m[2] - 1;
    if ($mo < 0 || $mo > 11) {
        return '';
    }
    return $cs ? "$d. " . OO_MON_CS[$mo] . " {$m[1]}" : "$d " . OO_MON_EN[$mo] . " {$m[1]}";
}

function oo_url($u): string
{
    return (is_string($u) && preg_match('#^https://[^\s"<>]+$#', $u)) ? $u : '';
}

function oo_f(array $o, string $k, bool $cs)
{
    if ($cs && isset($o[$k . '_cs']) && $o[$k . '_cs'] !== '' && $o[$k . '_cs'] !== []) {
        return $o[$k . '_cs'];
    }
    return $o[$k] ?? '';
}

function oo_static(bool $cs): string
{
    $T = function (string $en, string $csText) use ($cs) { return $cs ? $csText : $en; };
    $briefs = array_values(array_filter(oo_json('live-data/briefs.json'), function ($b) {
        return is_array($b) && !empty($b['title']);
    }));
    usort($briefs, function ($a, $b) { return strcmp((string)($b['week'] ?? $b['id'] ?? ''), (string)($a['week'] ?? $a['id'] ?? '')); });
    $news = array_values(array_filter(oo_json('live-data/news.json'), function ($n) {
        return is_array($n) && !empty($n['title']);
    }));
    usort($news, function ($a, $b) { return strcmp((string)($b['date'] ?? ''), (string)($a['date'] ?? '')); });

    $h = [];
    $h[] = '<div class="oo-static" id="oo-static">';
    $h[] = '<p class="oo-brand"><b>OreOrbit</b> · ' . oo_e($T('Critical minerals from orbit', 'Kritické suroviny z oběžné dráhy')) . '</p>';
    $h[] = '<h2 class="oo-h1">' . oo_e($T("Europe's defence runs on twelve minerals.", 'Obrana Evropy stojí na dvanácti surovinách.')) . '</h2>';
    $h[] = '<p class="oo-lede">' . oo_e($T(
        "For nine of them, China makes more than 65% of world output at one stage or another, and it makes 99% of the world's primary gallium (USGS, 2026).",
        'U devíti z nich vyrábí Čína v některé fázi víc než 65 % světové produkce a u primárního galia je to 99 % (USGS, 2026).')) . '</p>';
    $h[] = '<p class="oo-ten">' . oo_e($T(
        'Rare earths · Titanium · Tungsten · Antimony · Magnesium · Manganese · Gallium · Germanium · Lithium · Cobalt · Nickel · Graphite',
        'Vzácné zeminy · Titan · Wolfram · Antimon · Hořčík · Mangan · Galium · Germanium · Lithium · Kobalt · Nikl · Grafit')) . '</p>';
    $h[] = '<p class="oo-note">' . oo_e($T(
        'OreOrbit is a free atlas of the mines, refineries, sea routes and chokepoints behind these materials, with a Monday brief and an in-browser supply-chain assessment for strategy and supply-chain teams in European defence and space. The interactive globe needs JavaScript and WebGL; the latest brief and stories are below as plain text.',
        'OreOrbit je bezplatný atlas dolů, rafinerií, námořních tras a úzkých míst, na kterých tyto suroviny stojí, s pondělním přehledem a posouzením dodavatelského řetězce v prohlížeči pro strategické týmy a týmy dodavatelských řetězců v evropské obraně a kosmonautice. Interaktivní glóbus potřebuje JavaScript a WebGL; nejnovější přehled a zprávy jsou níže jako prostý text.')) . '</p>';

    if ($briefs) {
        $b = $briefs[0];
        $h[] = '<section class="oo-brief" aria-label="' . oo_e($T('Monday brief', 'Pondělní přehled')) . '">';
        $h[] = '<p class="oo-kicker">' . oo_e($T('Monday brief · week of ', 'Pondělní přehled · týden od ') . oo_day($b['week'] ?? $b['id'] ?? '', $cs)) . '</p>';
        $h[] = '<h2>' . oo_e(oo_f($b, 'title', $cs)) . '</h2>';
        if (oo_f($b, 'lede', $cs) !== '') {
            $h[] = '<p>' . oo_e(oo_f($b, 'lede', $cs)) . '</p>';
        }
        $pts = is_array($b['points'] ?? null) ? $b['points'] : [];
        if ($pts) {
            $h[] = '<ul>';
            foreach ($pts as $p) {
                if (!is_array($p)) {
                    continue;
                }
                $u = oo_url($p['url'] ?? '');
                $src = oo_e($p['source'] ?? '');
                $h[] = '<li>' . oo_e(oo_f($p, 'text', $cs)) . ' <span class="oo-src">'
                    . ($u ? '<a href="' . oo_e($u) . '" rel="noopener">' . $src . '</a>' : $src) . '</span></li>';
            }
            $h[] = '</ul>';
        }
        if (oo_f($b, 'soWhat', $cs) !== '') {
            $h[] = '<h3>' . oo_e($T('What it means for Europe', 'Co to znamená pro Evropu')) . '</h3><p>' . oo_e(oo_f($b, 'soWhat', $cs)) . '</p>';
        }
        $wn = oo_f($b, 'watchNext', $cs);
        if (is_array($wn) && $wn) {
            $h[] = '<h3>' . oo_e($T('Watch next', 'Co sledovat dál')) . '</h3><ul>';
            foreach ($wn as $w) {
                $h[] = '<li>' . oo_e($w) . '</li>';
            }
            $h[] = '</ul>';
        }
        $h[] = '<p class="oo-prov">' . oo_e(!empty($b['auto']) ? $T(
            'Put together automatically on ' . oo_day($b['writtenAt'] ?? ($b['week'] ?? ''), false) . ' from the atlas\'s own data and the week\'s headlines. No person or AI wrote or checked it; open the linked sources before quoting.',
            'Sestaveno automaticky ' . oo_day($b['writtenAt'] ?? ($b['week'] ?? ''), true) . ' z dat atlasu a titulků týdne. Nikdo, člověk ani AI, ho nepsal ani nekontroloval; před citací otevřete odkazované zdroje.') : $T(
            'Assembled automatically' . (!empty($b['writtenAt']) ? ' on ' . oo_day($b['writtenAt'], false) : '') . ' from stories it read and checked against their sources. Not reviewed by a person. Check the linked sources before quoting.',
            'Sestaveno automaticky' . (!empty($b['writtenAt']) ? ' dne ' . oo_day($b['writtenAt'], true) : '') . ' ze zpráv, které přečetla a ověřila proti jejich zdrojům. Člověk text nekontroloval. Před citací si ověřte odkazované zdroje.')) . '</p>';
        $h[] = '</section>';
    }

    if ($news) {
        $h[] = '<section class="oo-news" aria-label="' . oo_e($T('Latest stories', 'Nejnovější zprávy')) . '">';
        $h[] = '<h2>' . oo_e($T('Latest stories', 'Nejnovější zprávy')) . '</h2><ol>';
        foreach (array_slice($news, 0, 8) as $n) {
            $u = oo_url($n['url'] ?? '');
            $srcName = is_string($n['source'] ?? null) ? trim($n['source']) : '';
            $title = oo_e(oo_f($n, 'title', $cs));
            $lang = (isset($n['lang']) && is_string($n['lang']) && preg_match('/^[a-z]{2}$/', $n['lang'])) ? ' lang="' . $n['lang'] . '"' : '';
            $h[] = '<li><span class="oo-meta">' . oo_e(oo_day($n['date'] ?? '', $cs)) . ' · ' . oo_e($srcName) . '</span> '
                . ($u ? '<a href="' . oo_e($u) . '" rel="noopener"' . $lang . '>' . $title . '</a>' : '<span' . $lang . '>' . $title . '</span>')
                . (oo_f($n, 'summary', $cs) !== '' ? '<br>' . oo_e(oo_f($n, 'summary', $cs)) : '')
                . (!empty($n['auto']) ? '<br><span class="oo-check">' . oo_e($T('Found automatically, not yet verified', 'Nalezeno automaticky, zatím neověřeno')) . '</span>'
                  : (!empty($n['addedAt']) ? '<br><span class="oo-check">' . oo_e($T(
                    'Verified against ' . ($srcName !== '' ? $srcName : 'the source') . ' on ' . oo_day($n['addedAt'], false),
                    ($srcName !== '' ? 'Ověřeno podle zdroje ' . $srcName : 'Ověřeno podle původního zdroje')
                        . ' dne ' . oo_day($n['addedAt'], true))) . '</span>' : ''))
                . '</li>';
        }
        $h[] = '</ol>';
        $h[] = '<p class="oo-prov">' . oo_e($T(
            'How stories get here: every few hours the atlas\'s updater searches open news sources for the twelve materials and adds matching headlines on its own. Those are marked “found automatically, not checked”: no person or AI reads them before they appear. Older stories marked “checked” were read and checked against their source by an automated process.',
            'Jak se sem zprávy dostanou: aktualizace atlasu každých pár hodin prohledá otevřené zpravodajské zdroje a sama přidá titulky o dvanácti surovinách. Ty jsou označené „nalezeno automaticky, neověřeno“: před zveřejněním je nikdo, člověk ani AI, nečte. Starší zprávy označené „ověřeno“ ověřil automatizovaný proces proti jejich zdroji.')) . '</p>';
        $h[] = '</section>';
    }

    $h[] = '<p class="oo-author"><b>' . oo_e($T('About the author.', 'O autorovi.')) . '</b> ' . oo_e($T(
        'David Madali is a Prague-based analyst of the defence industry, critical raw materials and the space economy, founder of Bohemia Defense and creator of OreOrbit, an open atlas of the minerals behind Europe\'s defence. Quoted by BBC News as an analyst.',
        'David Madali je pražský analytik obranného průmyslu, kritických surovin a kosmické ekonomiky, zakladatel Bohemia Defense a autor OreOrbit, otevřeného atlasu surovin, na kterých stojí evropská obrana. Jako analytika ho citovala BBC News.'))
        . ' <a href="https://madali.cz/" rel="me noopener">madali.cz</a> · <a href="https://www.linkedin.com/in/davidmadali/" rel="me noopener">LinkedIn</a> · <a href="https://bohemiadefense.com/" rel="noopener">Bohemia Defense</a> · <a href="https://www.bbc.com/zhongwen/articles/cy8gjpe7xp8o/trad" rel="noopener">BBC News</a></p>';
    $lib = ['rare-earths' => 'Rare earths', 'titanium' => 'Titanium', 'tungsten' => 'Tungsten', 'antimony' => 'Antimony', 'magnesium' => 'Magnesium',
            'manganese' => 'Manganese', 'gallium' => 'Gallium', 'germanium' => 'Germanium', 'lithium' => 'Lithium', 'cobalt' => 'Cobalt', 'nickel' => 'Nickel',
            'graphite' => 'Graphite'];
    $links = [];
    foreach ($lib as $slug => $label) {
        $links[] = '<a href="p/' . $slug . '.html">' . oo_e($label) . '</a>';
    }
    $h[] = '<p class="oo-lib"><b>' . oo_e($T('Library:', 'Knihovna:')) . '</b> ' . implode(' · ', $links)
        . ' · <a href="p/index.html">' . oo_e($T('all materials and sites', 'všechny suroviny a lokality')) . '</a> · <a href="p/about.html">' . oo_e($T('About', 'O projektu')) . '</a> · <a href="p/legal.html">' . oo_e($T('Imprint and licences', 'Právní informace')) . '</a></p>';
    $h[] = '<p class="oo-foot">' . oo_e($T(
        'A Bohemia Defense project by David Madali · Prague. Public data only. Privacy: no cookies or trackers; your email is sent only when you sign up.',
        'Projekt Bohemia Defense, David Madali · Praha. Jen veřejná data. Soukromí: žádné cookies ani sledování; e-mail se odešle, jen když se přihlásíte.'))
        . ' <a href="' . oo_e(OO_BASE . ($cs ? '' : '?lang=cs')) . '">' . ($cs ? 'English' : 'Česky') . '</a></p>';
    $h[] = '</div>';
    return implode("\n", $h);
}

if (PHP_SAPI === 'cli') {
    echo oo_static(false);
    exit;
}

$page = @file_get_contents(__DIR__ . '/index.html');
if ($page === false) {
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'OreOrbit is temporarily unavailable.';
    exit;
}
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');
try {
    $cs = isset($_GET['lang']) && $_GET['lang'] === 'cs';
    $block = oo_static($cs);
    $a = strpos($page, '<!--OO-STATIC-->');
    $z = strpos($page, '<!--/OO-STATIC-->');
    if ($block !== '' && $a !== false && $z !== false && $z > $a) {
        $page = substr($page, 0, $a + 16) . $block . substr($page, $z);
    }
    if ($cs) {
        $swap = [
            '<html lang="en">' => '<html lang="cs">',
            '<link rel="canonical" href="' . OO_BASE . '">' => '<link rel="canonical" href="' . OO_BASE . '?lang=cs">',
            '<meta property="og:url" content="' . OO_BASE . '">' => '<meta property="og:url" content="' . OO_BASE . '?lang=cs">',
            '<meta property="og:locale" content="en_GB">' => '<meta property="og:locale" content="cs_CZ">',
            '<meta property="og:locale:alternate" content="cs_CZ">' => '<meta property="og:locale:alternate" content="en_GB">',
            // the opening in Czech already on the server, as the atlas ends up showing it, so nothing changes after load
            '<link rel="preload" href="fonts/hanken-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>' => '<link rel="preload" href="fonts/hanken-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>' . "\n" . '<link rel="preload" href="fonts/hanken-grotesk-latin-ext-wght-normal.woff2" as="font" type="font/woff2" crossorigin>',
            'Dependency Index <b>&nbsp;</b> <span>· China\'s share of EU imports</span>' => 'Index závislosti <b>&nbsp;</b> <span>· podíl Číny na dovozu do EU</span>',
            '<h1 data-notr>See what your product<br><b>depends on.</b></h1>' => '<h1 data-notr>Zjistěte, na čem<br><b>závisí váš výrobek.</b></h1>',
            '<p data-notr>The twelve critical minerals behind Europe\'s defence and space industry: who controls them, and what changes this week.</p>' => '<p data-notr>Dvanáct kritických surovin, na kterých stojí evropský obranný a&nbsp;kosmický průmysl: kdo je ovládá a&nbsp;co se tento týden mění.</p>',
            '>Check your product in 60 seconds <svg' => '>Prověřte svůj výrobek za 60 sekund <svg',
            '>Explore the globe <svg' => '>Prozkoumat glóbus <svg',
            '>Assess your supply chain</a>' => '>Posoudit dodavatelský řetězec</a>',
            '>Take the tour · 6 stops</button>' => '>Prohlídka · 6 zastávek</button>',
        ];
        foreach ($swap as $from => $to) {
            $i = strpos($page, $from);
            if ($i !== false) {
                $page = substr_replace($page, $to, $i, strlen($from));
            }
        }
        // The description and image text are matched by tag, not by their English wording, so they keep
        // switching to Czech however the build writes the English text (e.g. ' or &apos;).
        $desc_cs = oo_e('Živý atlas dolů, rafinerií, námořních tras a úzkých míst za dvanácti surovinami, na kterých stojí obrana Evropy, s pondělním přehledem. Čína vyrábí 99 % světového primárního galia.');
        $alt_cs = oo_e('OreOrbit: Obrana Evropy stojí na dvanácti surovinách. Země z oběžné dráhy při východu slunce.');
        $tags = [
            '#<meta name="description" content="[^"]*">#' => '<meta name="description" content="' . $desc_cs . '">',
            '#<meta property="og:description" content="[^"]*">#' => '<meta property="og:description" content="' . $desc_cs . '">',
            '#<meta property="og:image:alt" content="[^"]*">#' => '<meta property="og:image:alt" content="' . $alt_cs . '">',
            '#<title>[^<]*</title>#' => '<title>OreOrbit · Atlas kritických surovin pro evropskou obranu | Bohemia Defense</title>',
            '#<meta property="og:title" content="[^"]*">#' => '<meta property="og:title" content="OreOrbit · Kritické suroviny z oběžné dráhy">',
            '#<meta name="twitter:title" content="[^"]*">#' => '<meta name="twitter:title" content="OreOrbit · Kritické suroviny z oběžné dráhy">',
        ];
        foreach ($tags as $re => $to) {
            $out = preg_replace_callback($re, function () use ($to) { return $to; }, $page, 1);
            if (is_string($out)) {
                $page = $out;
            }
        }
    }
} catch (Throwable $e) {
    // serve the page as it is
}
echo $page;
