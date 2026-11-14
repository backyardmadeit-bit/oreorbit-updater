"""
OreOrbit readable pages: one page per material, one per site, an index, About and Legal, and a sitemap.

They exist so that search engines, AI assistants and people can read, quote and cite OreOrbit's figures
without running the interactive atlas. The robot rebuilds them every day from the same data the atlas uses.
Pages carry no running scripts of their own: only structured data and one shipped file, library.js.
"""
import datetime as dt
import html
import json
import re

BASE = "https://bohemiadefense.com/atlas/"
PERSON = {"@id": "https://madali.cz/#person", "@type": "Person", "name": "David Madali", "url": "https://madali.cz/"}
ORG = {"@id": "https://bohemiadefense.com/#organization", "@type": "Organization", "name": "Bohemia Defense", "url": "https://bohemiadefense.com/"}
ATLAS = {"@id": "https://bohemiadefense.com/atlas/#oreorbit", "@type": "WebApplication", "name": "OreOrbit", "url": BASE}
SLUG = {"ree": "rare-earths", "ti": "titanium", "w": "tungsten", "sb": "antimony", "ga": "gallium", "ge": "germanium",
        "li": "lithium", "co": "cobalt", "ni": "nickel", "gr": "graphite", "mg": "magnesium", "mn": "manganese"}
COL = {"ree": "#a78bfa", "ti": "#fb923c", "w": "#facc15", "sb": "#a9b8cc", "ga": "#22d3ee", "ge": "#4ade80",
       "li": "#f472b6", "co": "#60a5fa", "ni": "#a3e635", "gr": "#e4e4e7", "mg": "#2dd4bf", "mn": "#e879f9"}
STAGE_NAME = {"mine": "Mining", "refine": "Refining", "part": "Component"}
SITE_STAGE = {"Mine": "mine", "Processing": "processing plant", "Magnets": "magnet factory", "Planned": "planned project"}
MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
BBC = "https://www.bbc.com/zhongwen/articles/cy8gjpe7xp8o/trad"

# Counts in words, computed from reference.json, never typed in (tools/consistency_scan.py checks the rest).
_EN_W = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty".split()
_CS_W = {5: ("pět", "pěti"), 6: ("šest", "šesti"), 7: ("sedm", "sedmi"), 8: ("osm", "osmi"), 9: ("devět", "devíti"), 10: ("deset", "deseti"),
         11: ("jedenáct", "jedenácti"), 12: ("dvanáct", "dvanácti"), 13: ("třináct", "třinácti"), 14: ("čtrnáct", "čtrnácti"),
         15: ("patnáct", "patnácti"), 16: ("šestnáct", "šestnácti"), 17: ("sedmnáct", "sedmnácti"), 18: ("osmnáct", "osmnácti"),
         19: ("devatenáct", "devatenácti"), 20: ("dvacet", "dvaceti")}


def w_en(n):
    """12 -> 'twelve' (digits above twenty)."""
    return _EN_W[n] if 0 <= n < len(_EN_W) else str(n)


def w_cs(n, gen=False):
    """12 -> 'dvanáct'; gen=True -> 'dvanácti' (genitive, dative and locative share it from five up)."""
    return _CS_W[n][1 if gen else 0] if n in _CS_W else str(n)


def _about_counts(ref, cs):
    """The numbers in the About pages' lede and "What it is" list, in the page's language."""
    c = counts(ref)
    if cs:
        rt = ("%s obchodních tras" % w_cs(c["routes"], gen=True)) if c["routes"] else "hlavních obchodních tras"
        return {"n_min": w_cs(c["minerals"], gen=True), "n_cn": w_cs(c["china65"], gen=True), "n_sites": c["sites"], "n_routes": rt}
    rt = ("%s trade routes" % w_en(c["routes"])) if c["routes"] else "the main trade routes"
    return {"n_min": w_en(c["minerals"]), "n_cn": w_en(c["china65"]), "n_sites": c["sites"], "n_routes": rt}


def counts(ref):
    """minerals, sites, routes, and how many minerals have a stage where China holds more than 65 %."""
    mats = ref.get("materials") or {}

    def china65(m):
        st = (mats.get(m) or {}).get("stages") or {}
        return any(isinstance(v, dict) and v.get("who") == "China" and isinstance(v.get("pct"), (int, float)) and v["pct"] > 65 for v in st.values())
    return {"minerals": len(ref["order"]), "sites": len(ref["sites"]), "routes": len(ref.get("routes") or []),
            "china65": sum(1 for m in ref["order"] if china65(m))}


def meta_desc(text, limit=160):
    """The search-result description: whole sentences that fit in `limit` characters (search engines cut longer ones
    mid-word) when they make at least 110 characters; otherwise the text is cut at a word, with an ellipsis.
    og:description keeps the full text."""
    t = " ".join(str(text or "").split())
    if len(t) <= limit:
        return t
    out = ""
    for sent in re.split(r"(?<=[.!?])\s+", t):
        if len(out) + len(sent) + (1 if out else 0) > limit:
            break
        out = (out + " " + sent) if out else sent
    if len(out) >= 110:   # whole sentences, if they say enough
        return out
    cut = t[:limit - 1].rsplit(" ", 1)[0].rstrip(",;:·–-")
    return cut + "…"


def e(x):
    return html.escape(str(x if x is not None else ""), quote=True)


def day(d):
    d = str(d or "")[:10]
    try:
        y, m, dd = int(d[:4]), int(d[5:7]), int(d[8:10])
        return "%d %s %d" % (dd, MON[m - 1], y)
    except (ValueError, IndexError):
        return d


def eur(v):
    v = float(v or 0)
    if v >= 1e9:
        return "€%.1f bn" % (v / 1e9)
    if v >= 1e6:
        return "€%.1f m" % (v / 1e6)
    if v >= 1e3:
        return "€%.0f k" % (v / 1e3)
    return "€%.0f" % v


def spec_txt(sp):
    """'Gallium metal (Ga)' from the atlas's spec record; plain text passes through."""
    if isinstance(sp, dict):
        name, f = sp.get("mineral") or sp.get("name") or "", sp.get("formula") or ""
        return ("%s (%s)" % (name, f) if name and f else name or f).strip()
    return str(sp or "")


def pct_txt(x):
    if not x:
        return ""
    return (">" if x.get("approx") == ">" else "") + "%s%%" % x.get("pct")


def page(path, title, desc, body, ld_extra, today, crumbs=None, lang="en", alt=None):
    url = BASE + path
    ld = {"@context": "https://schema.org", "@graph": [
        dict({"@type": "WebPage", "@id": url + "#page", "url": url, "name": title, "description": desc, "inLanguage": lang,
              "dateModified": today, "isPartOf": {"@id": ATLAS["@id"]}, "author": {"@id": PERSON["@id"]}, "publisher": {"@id": ORG["@id"]}},
             **({"breadcrumb": {"@type": "BreadcrumbList", "itemListElement": [
                 {"@type": "ListItem", "position": i + 1, "name": n, "item": BASE + u} for i, (n, u) in enumerate(crumbs)]}} if crumbs else {})),
        ] + [n for n in (PERSON, ORG, ATLAS) if n["@id"] not in {x.get("@id") for x in ld_extra}] + ld_extra}
    crumb_html = ""
    if crumbs:
        crumb_html = '<nav class="crumbs" aria-label="Breadcrumb">' + " / ".join(
            ('<a href="%s">%s</a>' % (e("../" + u if not u.startswith("p/") else u[2:]), e(n)) if i < len(crumbs) - 1 else e(n))
            for i, (n, u) in enumerate(crumbs)) + "</nav>"
    cs = lang == "cs"
    alt_head = ""
    if alt:
        en_url, cs_url = (BASE + alt, url) if cs else (url, BASE + alt)
        alt_head = '<link rel="alternate" hreflang="en" href="%s">\n<link rel="alternate" hreflang="cs" href="%s">\n<link rel="alternate" hreflang="x-default" href="%s">\n' % (e(en_url), e(cs_url), e(en_url))
    sw = ('<a class="lang" href="%s" hreflang="%s" lang="%s">%s</a>' % (e(alt[2:]), "en" if cs else "cs", "en" if cs else "cs", "English" if cs else "Česky")) if alt else ""
    nav = ('<a href="index.html">Knihovna</a><a href="dependency-index-cs.html">Index</a><a href="services-cs.html">Služby</a><a href="about-cs.html">O projektu</a>%s<a class="cta" href="../?lang=cs">Otevřít atlas</a>' % sw) if cs else \
          ('<a href="index.html">Library</a><a href="dependency-index.html">Index</a><a href="services.html">Services</a><a href="about.html">About</a>%s<a class="cta" href="../">Open the atlas</a>' % sw)
    foot = ('<p>OreOrbit vytváří a provozuje <a href="https://madali.cz/cs/">David Madali</a> v <a href="https://bohemiadefense.com/cs/">Bohemia Defense</a> v Praze. Veřejná data, automaticky obnovovaná každý den. Data k %s.</p>\n  <p><a href="services-cs.html">Služby</a> <a href="about-cs.html">O projektu</a> <a href="legal.html">Právní informace a licence (anglicky)</a> <a href="https://madali.cz/cs/">madali.cz</a> <a href="https://www.linkedin.com/in/davidmadali/">LinkedIn</a></p>\n  <p>David Madali · Bohemia Defense · IČO 22229957</p>' % e(day_cs(today))) if cs else None
    return """<!doctype html>
<html lang="%(lang)s">
<head>
<meta charset="utf-8">
<link rel="icon" href="data:image/svg+xml,%%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none'%%3E%%3Crect width='32' height='32' rx='7' fill='%%23050607'/%%3E%%3Ccircle cx='16' cy='16' r='5.6' stroke='%%23eceee9' stroke-width='2.2'/%%3E%%3Cellipse cx='16' cy='16' rx='13.4' ry='5.1' stroke='%%23eceee9' stroke-width='1.8' transform='rotate(-28 16 16)'/%%3E%%3Ccircle cx='27.7' cy='9.9' r='2.7' fill='%%233ddc97'/%%3E%%3C/svg%%3E">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>%(title)s · OreOrbit</title>
<meta name="description" content="%(desc_meta)s">
<meta name="author" content="David Madali">
<meta name="theme-color" content="#050607">
<link rel="canonical" href="%(url)s">
%(alt)s
<link rel="stylesheet" href="../fonts/fonts.css">
<link rel="stylesheet" href="../library.css">
<meta property="og:type" content="article">
<meta property="og:title" content="%(title)s">
<meta property="og:description" content="%(desc)s">
<meta property="og:url" content="%(url)s">
<meta property="og:image" content="https://bohemiadefense.com/atlas/og-oreorbit-v2.png">
<meta property="og:site_name" content="OreOrbit">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="https://bohemiadefense.com/atlas/og-oreorbit-v2.png">
<script type="application/ld+json">%(ld)s</script>
</head>
<body>
<header class="bar">
  <a class="brand" href="../"><svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><circle cx="14" cy="14" r="4.9" stroke="#eceee9" stroke-width="1.4"/><ellipse cx="14" cy="14" rx="12.2" ry="4.6" stroke="#eceee9" stroke-width="1.1" transform="rotate(-28 14 14)"/><circle cx="24.7" cy="8.4" r="1.8" fill="#3ddc97"/></svg>OreOrbit</a>
  <span class="by">%(by)s <a href="https://bohemiadefense.com/%(bdpath)s">Bohemia Defense</a></span>
  <nav>%(nav)s</nav>
</header>
<main class="doc">
%(crumbs)s
%(body)s
</main>
<footer class="foot">
  %(foot)s
</footer>
<script src="../library.js" defer></script>
</body>
</html>
""" % {"title": e(title), "desc": e(desc), "desc_meta": e(meta_desc(desc)), "url": e(url), "ld": json.dumps(ld, ensure_ascii=False).replace("</", "<\\/"),
       "crumbs": crumb_html, "body": body, "today_txt": e(day(today)), "lang": lang, "alt": alt_head, "nav": nav, "by": "od" if cs else "by", "bdpath": "cs/" if cs else "",
       "foot": foot or ('<p>OreOrbit is built and run by <a href="https://madali.cz/">David Madali</a> at <a href="https://bohemiadefense.com/">Bohemia Defense</a>, Prague. Public data, updated automatically every day. Data as of %s.</p>\n  <p><a href="services.html">Services</a> <a href="about.html">About</a> <a href="legal.html">Imprint, privacy and data licences</a> <a href="https://madali.cz/">madali.cz</a> <a href="https://www.linkedin.com/in/davidmadali/">LinkedIn</a></p>\n  <p>David Madali · Bohemia Defense · IČO 22229957</p>' % e(day(today)))}


def cite_box(title, path, today):
    year = today[:4]
    text = "Madali, D. (%s). %s. OreOrbit, Bohemia Defense. %s%s (data as of %s)." % (year, title, BASE, path, day(today))
    return ('<aside class="cite" aria-labelledby="cite-h"><h2 id="cite-h">Cite this page</h2><p class="cite-text">%s</p>'
            '<button type="button" class="copy" data-copy="%s" hidden>Copy citation</button>'
            '<p class="small">Figures and charts may be quoted and reused with credit to “OreOrbit (Bohemia Defense)” and a link to this page.</p></aside>') % (e(text), e(text))


def stage_chart(m, stages):
    rows = [(k, stages.get(k), stages.get(k + "Note")) for k in ("mine", "refine", "part") if stages.get(k) or stages.get(k + "Note")]
    h = 46 * len(rows) + 10
    out = ['<svg class="chart" viewBox="0 0 640 %d" role="img" aria-label="Top producing country by stage" data-name="oreorbit-%s-stages">' % (h, SLUG[m])]
    for i, (k, x, note) in enumerate(rows):
        y = 10 + i * 46
        out.append('<text x="0" y="%d" class="c-l">%s</text>' % (y + 18, e(STAGE_NAME[k])))
        out.append('<rect x="120" y="%d" width="400" height="22" rx="4" class="c-track"/>' % (y + 2))
        if x:
            w = max(4, 400 * min(100, float(x.get("pct") or 0)) / 100)
            out.append('<rect x="120" y="%d" width="%.1f" height="22" rx="4" fill="%s"/>' % (y + 2, w, COL[m]))
            out.append('<text x="530" y="%d" class="c-v">%s %s</text>' % (y + 18, e(pct_txt(x)), e(x.get("who", ""))))
        else:
            out.append('<text x="130" y="%d" class="c-n">%s</text>' % (y + 18, e(note or "No public figure")))
    out.append("</svg>")
    return "".join(out)


def trade_chart(m, row):
    mo = row.get("monthly") or {}
    cn, ext, frm = mo.get("cn") or [], mo.get("ext") or [], mo.get("from") or ""
    n = min(len(cn), len(ext), 12)
    if not n or not frm:
        return "", None
    cn, ext = cn[-n:], ext[-n:]
    y0, m0 = int(frm[:4]), int(frm[5:7]) + len(mo.get("cn") or []) - n
    labels = []
    for i in range(n):
        mm = m0 + i - 1
        labels.append(MON[mm % 12] + (" " + str(y0 + mm // 12)[2:] if (mm % 12 == 0 or i == 0) else ""))
    top = max(ext) or 1
    W, H, bw = 640, 200, 640 / n
    out = ['<svg class="chart" viewBox="0 0 %d %d" role="img" aria-label="Monthly EU imports from outside the EU, China highlighted" data-name="oreorbit-%s-imports">' % (W, H + 28, SLUG[m])]
    for i in range(n):
        x = i * bw + 6
        th = H * ext[i] / top
        ch = H * cn[i] / top
        out.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="3" class="c-track"/>' % (x, H - th, bw - 12, th))
        out.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="3" fill="%s"/>' % (x, H - ch, bw - 12, ch, COL[m]))
        out.append('<text x="%.1f" y="%d" class="c-x">%s</text>' % (x, H + 20, e(labels[i])))
    out.append("</svg>")
    share = (cn[-1] / ext[-1]) if ext[-1] else None
    mm = m0 + n - 2
    # build 63: one month swings a lot (gallium 7 % in a month against 77 % for the year), so the headline is the 12-month share
    share12 = (sum(cn) / sum(ext)) if n == 12 and sum(ext) else None
    return "".join(out), (share, "%s %d" % (MONTH[mm % 12], y0 + mm // 12), ext[-1], share12)


def material_page(m, ref, live, today):
    R = ref["materials"][m]
    info, stages, worst = R.get("info") or {}, R.get("stages") or {}, R.get("worst") or {}
    name = info.get("name", m)
    slug = SLUG[m]
    path = "p/%s.html" % slug
    wx = worst.get("x") or {}
    lede_fact = ""
    if wx:
        what = (wx.get("what") or STAGE_NAME.get(worst.get("k"), "")).lower()
        lede_fact = "%s produces %s of the world's %s." % (wx.get("who", ""), pct_txt(wx), what)
    sites = [s for s in ref["sites"] if s.get("m") == m]
    trade_rows = (live.get("trade") or {}).get("materials", {}).get(m) or []
    t_svg, t_meta = trade_chart(m, trade_rows[0]) if trade_rows else ("", None)
    dls = [d for d in (R.get("deadlines") or []) if str(d.get("date", "")) >= today]
    news = [x for x in (live.get("news") or []) if isinstance(x, dict) and m in (x.get("materials") or [])][:6]
    title = "%s: who makes %s, and what it means for Europe's defence" % (name, "them" if m == "ree" else "it")   # "Rare earths" is plural
    desc = ("%s %s" % (lede_fact, info.get("uses") or "")).strip()[:300]
    figs = []
    if wx:
        figs.append((pct_txt(wx), "of %s is in %s" % ((wx.get("what") or STAGE_NAME.get(worst.get("k"), "")).lower(), wx.get("who", ""))))
    if t_meta and t_meta[3] is not None:
        figs.append(("%d%%" % round(t_meta[3] * 100), "of EU imports of %s from outside the EU came from China in the 12 months to %s%s" % (
            (trade_rows[0].get("label") or "").lower(), t_meta[1], " (%s alone: %d%%)" % (t_meta[1].split(" ")[0], round(t_meta[0] * 100)) if t_meta[0] is not None else "")))
    elif t_meta and t_meta[0] is not None:
        figs.append(("%d%%" % round(t_meta[0] * 100), "of EU imports of %s from outside the EU came from China in %s" % ((trade_rows[0].get("label") or "").lower(), t_meta[1])))
    figs.append((str(len(sites)), "site%s watched from orbit on OreOrbit" % ("" if len(sites) == 1 else "s")))
    if dls:
        figs.append((day(dls[0]["date"])[:-5], "next deadline: " + dls[0].get("title", "")))
    body = ['<article style="--c:%s">' % COL[m],
            '<p class="kicker"><i></i>%s</p>' % e(" · ".join(x for x in [info.get("group", "Critical raw material"), spec_txt(info.get("spec"))] if x)),
            '<h1>%s</h1>' % e(name),
            '<p class="lede">%s</p>' % e(lede_fact + (" " + info["uses"] if info.get("uses") else "")),
            '<dl class="figs">' + "".join('<div><dt>%s</dt><dd>%s</dd></div>' % (e(a), e(b)) for a, b in figs) + '</dl>',
            '<section><h2>Where it is made</h2>%s<p class="small">Share of world output held by the leading country at each stage. Sources: %s.</p><button type="button" class="dl" hidden>Download chart (SVG)</button></section>' % (
                stage_chart(m, stages), e(", ".join(sorted({(stages.get(k) or {}).get("note", "") for k in ("mine", "refine", "part") if stages.get(k)} - {""})) or "USGS, IEA"))]
    if t_svg:
        body.append('<section><h2>What Europe imports</h2><p>%s</p>%s<p class="small"><span class="key" style="--k:%s"></span>China <span class="key k-rest"></span>everywhere else outside the EU. Monthly value of EU imports, %s. Source: Eurostat Comext.</p><button type="button" class="dl" hidden>Download chart (SVG)</button></section>' % (
            e("In %s, the EU imported %s of %s from outside the EU, %d%% of it from China." % (t_meta[1], eur(t_meta[2]), (trade_rows[0].get("label") or "").lower(), round((t_meta[0] or 0) * 100))), t_svg, COL[m], e(trade_rows[0].get("label") or "")))
    if info.get("europe"):
        body.append('<section><h2>Why it matters for Europe</h2><p>%s</p></section>' % e(info["europe"]))
    if info.get("stats"):
        body.append('<section><h2>Key figures</h2><ul class="stats">%s</ul></section>' % "".join(
            '<li><b>%s</b> %s <span class="src">%s</span></li>' % (e(s.get("num")), e(s.get("what")), e(s.get("src"))) for s in info["stats"]))
    if sites:
        body.append('<section><h2>Sites on the atlas</h2><ul class="sites">%s</ul></section>' % "".join(
            '<li><a href="%s.html">%s</a><span>%s, %s</span></li>' % (e(s["id"]), e(s["name"]), e(SITE_STAGE.get(s.get("stage"), s.get("stage", "")).capitalize()), e(s.get("country", ""))) for s in sites))
    if dls:
        body.append('<section><h2>Coming up</h2><ul class="dates">%s</ul></section>' % "".join(
            '<li><time>%s</time><span>%s%s</span></li>' % (e(day(d["date"])), e(d.get("title", "")),
                                                        (' <a href="%s" rel="noopener">%s</a>' % (e(d["url"]), e(d.get("source") or "Source"))) if str(d.get("url", "")).startswith("https://") else "") for d in dls[:5]))
    opts = []
    sp = R.get("euSp") or {}
    if sp:
        opts.append(("%d EU strategic projects" % sp["n"] if sp.get("n") else "EU strategic projects") + (": " + ", ".join(sp["named"]) if sp.get("named") else ""))
    rir = R.get("rir") or {}
    if rir:
        opts.append("Recycling meets %s of EU demand today, against the EU's 25%% goal for 2030." % (rir.get("txt") or "%s%%" % rir.get("v")))
    online = [s for s in sites if (ref.get("online") or {}).get(s["id"])]
    if online:
        opts.append("New supply on the atlas: " + ", ".join("%s (%s)" % (s["name"], ref["online"][s["id"]]) for s in online))
    if opts:
        body.append('<section><h2>Options for Europe</h2><ul class="plain">%s</ul></section>' % "".join("<li>%s</li>" % e(o) for o in opts))
    if news:
        body.append('<section><h2>Recent news</h2><ul class="news">%s</ul><p class="small">Stories marked “found automatically” were collected automatically and are not yet verified; open the source before quoting them.</p></section>' % "".join(
            '<li><a href="%s" rel="noopener">%s</a><span>%s, %s · %s</span></li>' % (e(x.get("url")), e(x.get("title")), e(x.get("source")), e(day(x.get("date"))),
                                                                              "found automatically" if x.get("auto") else "checked against the source") for x in news))
    qas = []
    src0 = ((info.get("stats") or [{}])[0] or {}).get("src")
    if lede_fact:
        qas.append(("Which country controls %s?" % name.lower(), lede_fact + (" Source: %s." % src0 if src0 else "")))
    if info.get("uses"):
        qas.append(("What is %s used for in defence and space?" % name.lower(), info["uses"]))
    ser = dependency_series(live.get("trade"))
    if ser and m in ser[-1]["per"]:
        qas.append(("How much of the EU's %s imports come from China?" % name.lower(),
                    "In %s, China supplied %d%% of the value of the EU's imports of %s from outside the EU, across the products OreOrbit tracks (Eurostat Comext)." % (month_txt(ser[-1]["month"]), round(ser[-1]["per"][m] * 100), name.lower())))
    if info.get("europe"):
        qas.append(("Can Europe produce %s itself?" % name.lower(), info["europe"]))
    qas.append(("How can a manufacturer check its exposure to %s?" % name.lower(),
                "OreOrbit's free quick check shows which critical minerals a product type depends on (bohemiadefense.com/atlas/#check). A readiness review by Bohemia Defense maps one product line's actual parts in two to three weeks."))
    body.append(qa_section(qas))
    body.append(cite_box(title, path, today))
    body.append('<p class="open"><a class="cta" href="../">See %s on the live atlas</a></p></article>' % e(name.lower()))
    ld = [{"@type": "Article", "@id": BASE + path + "#article", "headline": title, "description": desc, "dateModified": today, "inLanguage": "en",
           "author": {"@id": PERSON["@id"]}, "publisher": {"@id": ORG["@id"]}, "mainEntityOfPage": BASE + path,
           "about": {"@type": "Thing", "name": name}, "isAccessibleForFree": True}, faq_ld(path, qas)]
    return path, page(path, title, desc, "\n".join(body), ld, today, [("Atlas", ""), ("Library", "p/index.html"), (name, path)])


def site_page(s, ref, live, today):
    path = "p/%s.html" % s["id"]
    m = s.get("m")
    mname = ((ref["materials"].get(m) or {}).get("info") or {}).get("name", m)
    stage = SITE_STAGE.get(s.get("stage"), (s.get("stage") or "").lower())
    title = "%s, %s: %s %s seen from orbit" % (s["name"], s.get("country", ""), mname.lower(), stage)
    desc = "%s %s in %s, %s. %s" % (mname, stage, s.get("place", ""), s.get("country", ""), s.get("why", ""))
    im = ((live.get("imagery") or {}).get("sites") or {}).get(s["id"]) or {}
    ox = ((live.get("extras") or {}).get("sites") or {}).get(s["id"]) or {}
    hs = ((live.get("hotspots") or {}).get("sites") or {}).get(s["id"]) or {}
    so = ((live.get("so2") or {}).get("sites") or {}).get(s["id"]) or {}
    cf = ((live.get("conflict") or {}).get("areas") or {}).get(s["id"]) or {}
    online = (ref.get("online") or {}).get(s["id"])
    lat, lng = s.get("lat"), s.get("lng")
    coords = "%.2f° %s, %.2f° %s" % (abs(lat), "N" if lat >= 0 else "S", abs(lng), "E" if lng >= 0 else "W")
    facts = [("Material", mname), ("Stage", stage.capitalize()), ("Place", "%s, %s" % (s.get("place", ""), s.get("country", "")))]
    if s.get("operator"):
        facts.append(("Operator", s["operator"]))
    facts.append(("Coordinates", coords + (" (approximate)" if s.get("approx") else "")))
    if online:
        facts.append(("Expected online", online))
    body = ['<article style="--c:%s">' % COL.get(m, "#eceee9"),
            '<p class="kicker"><i></i><a href="%s.html">%s</a></p>' % (SLUG.get(m, m), e(mname)),
            '<h1>%s</h1>' % e(s["name"]),
            '<p class="lede">%s</p>' % e(s.get("why", "")),
            '<dl class="facts">%s</dl>' % "".join('<div><dt>%s</dt><dd>%s</dd></div>' % (e(a), e(b)) for a, b in facts)]
    if im.get("now"):
        ch = im.get("change") or {}
        cap = "Sentinel-2 true colour, %s, about %s km across." % (day(im.get("nowDate")), im.get("spanKm") or 7)
        if ch.get("lostHa") is not None and ch.get("from"):
            cap += " Vegetation lost since %s: about %d ha." % (day(ch["from"]), ch["lostHa"])
        body.append('<figure class="sat"><img src="../%s" alt="Satellite picture of %s" width="700" height="700" loading="lazy">%s<figcaption>%s Copernicus Sentinel-2 data via Microsoft Planetary Computer.</figcaption></figure>' % (
            e(im["now"]), e(s["name"]), ('<img class="ov" src="../%s" alt="" width="700" height="700" loading="lazy">' % e(ch["file"])) if ch.get("file") else "", e(cap)))
    sig = []
    if hs:
        sig.append(("Heat", "%s of the last 7 days and %s of the last 30 had furnace-hot pixels within 6 km (NASA FIRMS)." % (hs.get("daysHot7", 0), hs.get("daysHot30", 0))))
    h = ox.get("heat") or {}
    if h.get("date"):
        sig.append(("Surface temperature", "Landsat, %s: typical ground %s °C; %s ha more than 8 °C warmer than the land around it; hottest spot %s °C above it." % (
            day(h["date"]), h.get("medianC"), h.get("hotHa"), h.get("maxAnomC"))))
    if so:
        sig.append(("Sulphur dioxide", "%s of %s days seen in the last 60 read above 2 DU within 50 km; highest %s DU." % (so.get("daysAbove2", 0), so.get("daysSeen", 0), so.get("maxDU"))))
    if cf:
        sig.append(("Armed conflict", "%s events within 100 km so far this year, the latest on %s (UCDP)." % (cf.get("n"), day(cf.get("last")))))
    r = ox.get("radar") or {}
    if r.get("date"):
        sig.append(("Radar", "Latest Sentinel-1 radar picture: %s." % day(r["date"])))
    if sig:
        body.append('<section><h2>Seen from orbit</h2><dl class="signals">%s</dl><p class="small">Signals show activity, not output. They are measured automatically and can be affected by weather, terrain and fires.</p></section>' % "".join(
            '<div><dt>%s</dt><dd>%s</dd></div>' % (e(a), e(b)) for a, b in sig))
    if s.get("facts"):
        body.append('<section><h2>Facts</h2><ul class="plain">%s</ul></section>' % "".join("<li>%s</li>" % e(f) for f in s["facts"]))
    body.append(cite_box(title, path, today))
    body.append('<p class="open"><a class="cta" href="../#%s">Open %s on the globe</a></p></article>' % (e(s["id"]), e(s["name"])))
    ld = [{"@type": "Article", "@id": BASE + path + "#article", "headline": title, "description": desc[:300], "dateModified": today, "inLanguage": "en",
           "author": {"@id": PERSON["@id"]}, "publisher": {"@id": ORG["@id"]}, "mainEntityOfPage": BASE + path, "isAccessibleForFree": True,
           "about": {"@type": "Place", "name": s["name"], "address": {"@type": "PostalAddress", "addressRegion": s.get("place", ""), "addressCountry": s.get("country", "")},
                     "geo": {"@type": "GeoCoordinates", "latitude": lat, "longitude": lng}}}]
    if im.get("now"):
        ld[0]["image"] = BASE + im["now"]
    return path, page(path, title, desc[:300], "\n".join(body), ld, today, [("Atlas", ""), ("Library", "p/index.html"), (mname, "p/%s.html" % SLUG.get(m, m)), (s["name"], path)])


def index_page(ref, today):
    path = "p/index.html"
    c = counts(ref)
    title = "The OreOrbit library: %s critical minerals and %d sites" % (w_en(c["minerals"]), c["sites"])
    desc = "Readable, citable pages on the %s critical raw materials behind Europe's defence and the %d mines and plants OreOrbit watches from orbit." % (w_en(c["minerals"]), c["sites"])
    rows = []
    for m in ref["order"]:
        R = ref["materials"][m]
        info, wx = R.get("info") or {}, (R.get("worst") or {}).get("x") or {}
        ss = [s for s in ref["sites"] if s.get("m") == m]
        rows.append('<li style="--c:%s"><a href="%s.html"><i></i>%s</a><span>%s</span><ul>%s</ul></li>' % (
            COL[m], SLUG[m], e(info.get("name", m)), e(("%s %s" % (pct_txt(wx), wx.get("who", ""))) if wx else ""),
            "".join('<li><a href="%s.html">%s</a></li>' % (e(s["id"]), e(s["name"])) for s in ss)))
    body = ('<h1>Library</h1><p class="lede">Every material and every site on OreOrbit as a page you can read, link to and cite. '
            'Rebuilt every day from the same data as the live atlas.</p>'
            '<p class="open"><a class="cta" href="dependency-index.html">OreOrbit Dependency Index: the monthly number</a></p><ul class="lib">%s</ul>') % "".join(rows)
    ld = [{"@type": "CollectionPage", "@id": BASE + path + "#collection", "name": title, "dateModified": today, "author": {"@id": PERSON["@id"]}, "publisher": {"@id": ORG["@id"]}}]
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("Library", path)])


def about_page(ref, cfg, today):
    path = "p/about.html"
    title = "About OreOrbit"
    desc = "OreOrbit is a free, live atlas of the critical raw materials behind Europe's defence and space industries, built by David Madali at Bohemia Defense in Prague."
    mail = cfg.get("contactEmail") or "david@madali.cz"
    body = """<h1>About OreOrbit</h1>
<p class="lede">Europe's defence runs on %(n_min)s minerals, and for %(n_cn)s of them China controls at least one stage of the supply chain. OreOrbit shows where those minerals are mined and refined, how they reach Europe, and what is changing this week, from public data and satellite pictures.</p>
<section><h2>Who is behind it</h2>
<div class="person"><img src="../img/david-madali-founder.jpg" alt="David Madali" width="600" height="750" loading="lazy"><div>
<p><a href="https://madali.cz/"><b>David Madali</b></a> is a Prague-based analyst of the defence industry, critical raw materials and the space economy. He founded <a href="https://bohemiadefense.com/">Bohemia Defense</a> in 2024, an independent analysis project on Europe's defence industry, security and foreign policy, and built OreOrbit in 2026.</p>
<p>BBC News Chinese has quoted him as an analyst (<a href="%(bbc)s" rel="noopener">July 2025</a>). His background is in economics, economic diplomacy at the Czech Ministry of Foreign Affairs and export consulting at CzechTrade, where he set up a cluster of 12 security-industry companies.</p>
<p><a href="https://madali.cz/">madali.cz</a> · <a href="https://www.linkedin.com/in/davidmadali/">LinkedIn</a> · <a href="https://bohemiadefense.com/david-madali/">Founder page</a></p>
</div></div></section>
<section><h2>What it is</h2><ul class="plain">
<li>A live atlas of %(n_sites)d mines, refineries and magnet factories, %(n_routes)s and the chokepoints between them.</li>
<li>Satellite pictures of every site, refreshed weekly: Sentinel-2 photos, ground cleared since 2018, Sentinel-1 radar and Landsat heat maps.</li>
<li>Signals every few hours: heat at the plants, ships at the chokepoints, earthquakes and disaster alerts, conflict near the supply chain.</li>
<li>Monthly EU import data and export-control deadlines, a quick check of what any product depends on, and a weekly brief of what is moving.</li>
<li>For companies: monitoring of the minerals you depend on, and a readiness review of one product line for your board. See <a href="services.html">services</a>.</li>
<li>A <a href="index.html">library</a> of readable pages on every material and site, made to be quoted and cited.</li>
<li>Plain <a href="faq.html">questions and answers</a> on Europe's critical-mineral dependencies, the chokepoints, the EU Critical Raw Materials Act and China's export controls, with current figures.</li>
</ul></section>
<section><h2>How it works</h2>
<p>Everything comes from public sources, named and dated on the page where it is used. An automatic updater collects and processes the data every three hours and rebuilds these pages every day. Stories found automatically are labelled as not checked. OreOrbit shows measurements and the public record; it does not forecast and is not investment or legal advice.</p>
<p>The full list of sources and their licences is on the <a href="legal.html">legal page</a>.</p></section>
<section><h2>Working with us</h2>
<p>OreOrbit is free. For defence and space manufacturers who need a defensible answer, Bohemia Defense offers a fixed-scope supply-chain risk review of one product line, supporting documentation under Article 24 of the EU Critical Raw Materials Act, and ongoing monitoring of the materials, sites and deadlines in your own register.</p>
<p><a class="cta" href="services.html">See services and prices</a> &nbsp; <a href="../oreorbit-sample-assessment.pdf">Read a sample review (PDF)</a></p></section>
<section><h2>How to cite OreOrbit</h2><p class="cite-text">Madali, D. (%(year)s). OreOrbit: critical minerals from orbit. Bohemia Defense. https://bohemiadefense.com/atlas/</p>
<p class="small">Each page in the library has its own citation. Figures and charts may be quoted and reused with credit to “OreOrbit (Bohemia Defense)” and a link.</p></section>""" % dict({"bbc": BBC, "mail": e(mail), "year": today[:4]}, **_about_counts(ref, False))
    ld = [{"@type": "AboutPage", "@id": BASE + path + "#about", "name": title, "description": desc, "dateModified": today, "about": {"@id": ATLAS["@id"]}, "author": {"@id": PERSON["@id"]},
           "mainEntity": {"@id": PERSON["@id"]}}, person_full(), org_full()]
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("About", path)], alt="p/about-cs.html")


def legal_page(cfg, today):
    path = "p/legal.html"
    title = "Imprint, privacy and data licences"
    desc = "Who operates OreOrbit, what it does with your data (nothing leaves your browser), terms of use, and the licences of every data source."
    who = ", ".join(x for x in [cfg.get("company") or "David Madali (Bohemia Defense), natural person registered in the Czech Trade Register", "IČO " + (cfg.get("companyId") or "22229957"), cfg.get("address") or ""] if x)
    mail = cfg.get("contactEmail") or "david@madali.cz"
    src = [("Copernicus Sentinel-1, -2 and -5P data", "European Union, Copernicus programme; free, full and open access with attribution."),
           ("Landsat 8 and 9", "U.S. Geological Survey; public domain."),
           ("NASA FIRMS, GIBS and Worldview imagery", "NASA Earth Science Data and Information System; open data with attribution."),
           ("Copernicus DEM GLO-30", "European Space Agency and Airbus; free use with attribution."),
           ("USGS Mineral Commodity Summaries and earthquake feed", "U.S. Geological Survey; public domain."),
           ("IEA Global Critical Minerals Outlook", "International Energy Agency; figures quoted with attribution."),
           ("Eurostat Comext", "European Commission; reuse allowed with attribution."),
           ("TED, Tenders Electronic Daily", "EU Publications Office; reuse allowed with attribution."),
           ("UCDP Candidate Events Dataset", "Uppsala Conflict Data Program; CC BY 4.0."),
           ("GDACS", "Global Disaster Alert and Coordination System (European Commission and United Nations)."),
           ("IMF PortWatch", "International Monetary Fund and University of Oxford."),
           ("FRED", "Federal Reserve Bank of St. Louis, with the IMF as the source of commodity prices."),
           ]
    body = """<h1>Imprint, privacy and data licences</h1>
<section><h2>Operator</h2><p>%(who)s. Contact: <a href="mailto:%(mail)s">%(mail)s</a>.</p></section>
<section><h2>Privacy</h2><p>OreOrbit uses no cookies and no trackers. It counts page views and button clicks as anonymous daily totals, without storing IP addresses or anything else about visitors, and skips browsers that ask not to be tracked. Your settings (language, sound, chosen materials) stay in your own browser's storage on your device. The only thing ever sent is your email address, and only when you sign up for the Monday brief or monitoring (see below). Like every website, the hosting server keeps standard access logs for security and operation.</p></section>
<section><h2>Email sign-ups</h2><p>If you sign up for the free Monday brief or for monitoring, we process your email address, the minerals you chose, the product you checked (if any) and your language, to send you what you asked for. The legal basis is your consent (Art. 6(1)(a) GDPR), which you can withdraw at any time with the unsubscribe link in every email or by writing to david@madali.cz. We keep this data until you unsubscribe. It is stored on our web hosting (WEDOS Internet, a.s., Czech Republic) and the emails are sent through its mail server; it is never sold or shared. You have the right to access, correct and delete your data and to complain to the Czech Office for Personal Data Protection (ÚOOÚ).</p></section>
<section><h2>Monitoring subscription</h2><p>Monitoring is a monthly subscription, paid by card in advance through Stripe. You can cancel anytime from the billing portal (link in every monitoring email, or <a href="../manage.php">manage your subscription</a>); it then runs to the end of the paid month. Money-back guarantee: if you do not see the value, ask within the first month and we refund your payment in full. Alerts are sent when the atlas next updates, usually within a few hours of a change. One question a month, sent by replying to any monitoring email, is answered by a person within two working days.</p></section>
<section><h2>Terms of use</h2><p>OreOrbit is provided free of charge for information. Data are collected automatically from public sources and can contain errors or delays; stories found automatically are not checked. Nothing here is investment, legal or professional advice. Check the original sources before relying on a figure.</p>
<p>OreOrbit's own text, figures and charts may be quoted and reused with credit to “OreOrbit (Bohemia Defense)” and a link. Third-party data remain under their own licences, listed below.</p></section>
<section><h2>Data sources and licences</h2><dl class="signals">%(src)s</dl></section>""" % {
        "who": e(who), "mail": e(mail), "src": "".join('<div><dt>%s</dt><dd>%s</dd></div>' % (e(a), e(b)) for a, b in src)}
    return path, page(path, title, desc, body, [], today, [("Atlas", ""), ("Legal", path)])


def services_page(cfg, today):
    path = "p/services.html"
    title = "Services: critical raw materials risk review for defence and space manufacturers"
    desc = "Know which of your products stop when a border closes. Free atlas, monitoring of your minerals, and a two-to-three-week readiness review of one product line, by Bohemia Defense with OreOrbit data."
    mail = cfg.get("contactEmail") or "david@madali.cz"
    subj = cfg.get("bookingUrl") or ("mailto:%s?subject=%s" % (mail, "Intro%20call%20about%20a%20raw%20materials%20review"))
    body = """<h1>Know which of your products stop when a border closes.</h1>
<p class="lede">For defence, security and space manufacturers in Central Europe: a two-to-three-week review of one product line's exposure to critical raw materials, built on OreOrbit's live data and signed by an analyst.</p>
<p class="open"><a class="cta" href="%(subj)s">Book a free 30-minute intro call</a> &nbsp; <a href="../oreorbit-sample-assessment.pdf">Read a sample review (PDF, 7 pages)</a></p>
<section><h2>Who it is for</h2><ul class="plain">
<li>Manufacturers and suppliers of ammunition, armoured vehicles, drones, optics, radar and electronics, whose parts depend on minerals refined mostly in China.</li>
<li>Space companies with gallium and germanium in their solar cells and electronics.</li>
<li>Large companies asked to assess their raw-material supply chains under Article 24 of the EU Critical Raw Materials Act, and the suppliers their prime contractors are now questioning.</li>
</ul></section>
<section><h2>What we offer</h2>
<dl class="signals">
<div><dt>1 · Free<br><b>€0</b></dt><dd>The interactive atlas, the quick check for your product, this week's headlines and the live evidence. With your email, also the Monday brief for your minerals and all live-data panels in full. No login.</dd></div>
<div><dt>2 · Monitoring<br><b>€390 / month</b></dt><dd>We watch the minerals you choose, their sites and deadlines around the clock. You hear from us when something changes, and every Monday. Ask us one question a month: a person answers within two working days. Includes a weekly data file for your minerals. Start on the atlas.</dd></div>
<div><dt>3 · Readiness review<br><b>For your board</b></dt><dd>One product line in two to three weeks: the register of every part with a critical raw material and where it comes from, a rating for each part, stress tests against real export controls, the rules that decide who can supply you, and slides for your board. Scope and price are agreed in a free 30-minute intro call.</dd></div>
</dl>
<p class="small">Monitoring starts with your email on the atlas; David replies within one working day with a sample alert for your minerals.</p></section>
<section><h2>How a review runs</h2><ul class="dates">
<li><time>Day 1</time><span>A free 30-minute intro call to agree the product line and the people involved.</span></li>
<li><time>Week 1</time><span>Two working sessions with your engineering and purchasing teams to fill the register, part by part.</span></li>
<li><time>Week 2</time><span>Analysis and stress tests against export controls, chokepoints and sites, using OreOrbit's live data.</span></li>
<li><time>Week 3</time><span>The report and a presentation for management. You keep the register.</span></li>
</ul></section>
<section><h2>Your data</h2><p>Your register stays yours. We sign a non-disclosure agreement on request, the register can be built in your browser so that it never leaves your premises, and nothing about your company is ever published. Anonymised, aggregated figures are only used with your written consent.</p></section>
<section><h2>What it is, and what it is not</h2><p>A review is an independent analysis of supply-chain risk, from public data and the information you provide. It supports the documentation the Critical Raw Materials Act asks for, but it is not legal advice or a certification; confirm your legal obligations with counsel.</p></section>
<section><h2>Who does the work</h2><div class="person"><img src="../img/david-madali-founder.jpg" alt="David Madali" width="600" height="750" loading="lazy"><div>
<p><a href="https://madali.cz/"><b>David Madali</b></a>, founder of <a href="https://bohemiadefense.com/">Bohemia Defense</a> and creator of OreOrbit. An analyst of the defence industry, critical raw materials and the space economy, quoted by BBC News Chinese, with a background in economic diplomacy at the Czech Ministry of Foreign Affairs and export consulting at CzechTrade.</p>
<p><a class="cta" href="%(subj)s">Book a free 30-minute intro call</a></p></div></div></section>""" % {"subj": e(subj)}
    ld = [{"@type": "Service", "@id": BASE + path + "#service", "name": "Critical raw materials supply-chain risk review", "serviceType": "Supply-chain risk assessment",
           "description": desc, "provider": {"@id": ORG["@id"]}, "areaServed": "Europe", "url": BASE + path,
           "offers": [{"@type": "Offer", "name": "OreOrbit atlas and Monday brief", "price": "0", "priceCurrency": "EUR"},
                      {"@type": "Offer", "name": "Monitoring of your minerals", "price": "390", "priceCurrency": "EUR", "priceSpecification": {"@type": "UnitPriceSpecification", "price": 390, "priceCurrency": "EUR", "unitText": "month"}},
                      {"@type": "Offer", "name": "Readiness review, one product line", "description": "Scope and price agreed in a free 30-minute intro call"}]}]
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("Services", path)], alt="p/services-cs.html")


INDEX_TEN = ("ree", "ti", "w", "sb", "ga", "ge", "li", "co", "ni", "gr")


def dependency_series(trade):
    """The OreOrbit Dependency Index, month by month: China's share of the value of EU imports from outside the EU,
    for each of the ten index materials (all tracked products of a material added up), averaged with equal weight per material."""
    mats = (trade or {}).get("materials") or {}
    per = {}
    for m, rows in mats.items():
        for r in rows:
            mo = r.get("monthly") or {}
            frm, cn, ext = mo.get("from"), mo.get("cn") or [], mo.get("ext") or []
            if not frm:
                continue
            y0, m0 = int(frm[:4]), int(frm[5:7])
            for i in range(min(len(cn), len(ext))):
                k = "%04d-%02d" % (y0 + (m0 - 1 + i) // 12, (m0 - 1 + i) % 12 + 1)
                a = per.setdefault(k, {}).setdefault(m, [0.0, 0.0])
                a[0] += float(cn[i] or 0)
                a[1] += float(ext[i] or 0)
    out = []
    for k in sorted(per):
        every = {m: v[0] / v[1] for m, v in per[k].items() if v[1] > 0}
        shares = {m: x for m, x in every.items() if m in INDEX_TEN}           # the index keeps its original ten, so months stay comparable
        extra = {m: x for m, x in every.items() if m not in INDEX_TEN}       # magnesium, manganese and any later additions
        if len(shares) >= 8:
            out.append({"month": k, "value": sum(shares.values()) / len(shares), "n": len(shares),
                        "over50": sum(1 for x in shares.values() if x > 0.5), "per": shares, **({"extra": extra} if extra else {})})
    return out


def month_txt(k):
    return "%s %s" % (MONTH[int(k[5:7]) - 1], k[:4])


def index_chart(series):
    n = len(series)
    if n < 2:
        return ""
    W, H, top, left = 640, 220, 14, 34
    vals = [x["value"] * 100 for x in series]
    lo, hi = max(0, min(vals) - 10), min(100, max(vals) + 10)
    X = lambda i: left + (W - left - 10) * i / (n - 1)
    Y = lambda v: top + (H - top - 26) * (1 - (v - lo) / (hi - lo or 1))
    out = ['<svg class="chart" viewBox="0 0 %d %d" role="img" aria-label="OreOrbit Dependency Index by month" data-name="oreorbit-dependency-index">' % (W, H)]
    for g in range(int(lo // 10 * 10 + 10), int(hi) + 1, 10):
        out.append('<line x1="%d" x2="%d" y1="%.1f" y2="%.1f" stroke="rgba(236,238,233,.08)"/><text x="0" y="%.1f" class="c-x">%d%%</text>' % (left, W - 10, Y(g), Y(g), Y(g) + 4, g))
    pts = " ".join("%.1f,%.1f" % (X(i), Y(v)) for i, v in enumerate(vals))
    out.append('<polyline points="%s" fill="none" stroke="#3ddc97" stroke-width="2.5" stroke-linejoin="round"/>' % pts)
    out.append('<circle cx="%.1f" cy="%.1f" r="5" fill="#3ddc97"/>' % (X(n - 1), Y(vals[-1])))
    for i, x in enumerate(series):
        if x["month"].endswith("-01") or i == n - 1:
            out.append('<text x="%.1f" y="%d" class="c-x"%s>%s</text>' % (X(i) if i == n - 1 else X(i) - 14, H - 6, ' text-anchor="end"' if i == n - 1 else "", e(MON[int(x["month"][5:7]) - 1] + " " + x["month"][2:4])))
    out.append("</svg>")
    return "".join(out)


def dependency_page(ref, live, today):
    path = "p/dependency-index.html"
    series = dependency_series(live.get("trade"))
    title = "OreOrbit Dependency Index: China's share of Europe's defence-mineral imports"
    if not series:
        return path, page(path, title, "Monthly index of China's share of EU imports of the ten index minerals behind Europe's defence.", "<h1>OreOrbit Dependency Index</h1><p class=\"lede\">The index appears once the monthly trade data is available.</p>", [], today, [("Atlas", ""), ("Library", "p/index.html"), ("Dependency Index", path)])
    last = series[-1]
    v = round(last["value"] * 100)
    prev_m = series[-2] if len(series) > 1 else None
    yago = next((x for x in series if x["month"] == "%04d-%s" % (int(last["month"][:4]) - 1, last["month"][5:])), None)
    d_m = (v - round(prev_m["value"] * 100)) if prev_m else None
    d_y = (v - round(yago["value"] * 100)) if yago else None
    chg = lambda d: (("+%d" % d if d > 0 else "%d" % d) + (" point" if abs(d) == 1 else " points")) if d is not None else "n/a"
    names = {m: ((ref["materials"].get(m) or {}).get("info") or {}).get("name", m) for m in last["per"]}
    quote = "China supplied %d%% of the EU's imports of the ten index minerals behind Europe's defence industry in %s, according to the OreOrbit Dependency Index by Bohemia Defense%s." % (
        v, month_txt(last["month"]), (", %s from %d%% a year earlier" % ("up" if d_y > 0 else "down" if d_y < 0 else "unchanged", round(yago["value"] * 100))) if yago else "")
    desc = quote
    rows = sorted(last["per"].items(), key=lambda kv: -kv[1])
    trs = "".join('<li style="--c:%s"><span>%s</span><span class="pc"><span class="qbar"><span style="width:%.0f%%"></span></span>%d%%%s</span></li>' % (
        COL.get(m, "#eceee9"), e(names[m]), x * 100, round(x * 100),
        ("" if not yago or m not in yago["per"] else ' <em>%s</em>' % e(chg(round(x * 100) - round(yago["per"][m] * 100)).replace(" points", " pts").replace(" point", " pt")))) for m, x in rows)
    body = """<article style="--c:#3ddc97">
<p class="kicker"><i></i>Monthly · Eurostat data for %(month)s</p>
<h1>OreOrbit Dependency Index</h1>
<p class="lede">China's share of what the EU imports from outside the EU across the ten index minerals behind Europe's defence industry. Each mineral counts equally.</p>
<dl class="figs"><div><dt>%(v)d%%</dt><dd>China's share in %(month)s</dd></div><div><dt>%(dm)s</dt><dd>change from the month before</dd></div><div><dt>%(dy)s</dt><dd>change from a year earlier</dd></div><div><dt>%(over)d of %(n)d</dt><dd>minerals where China supplied more than half</dd></div></dl>
<section><h2>Month by month</h2>%(chart)s<p class="small">Equal-weighted average of China's share of the value of extra-EU imports, per mineral. Source: Eurostat Comext, via OreOrbit.</p><button type="button" class="dl" hidden>Download chart (SVG)</button></section>
<section><h2>Quote it</h2><p class="cite-text">%(quote)s</p><button type="button" class="copy" data-copy="%(quote)s" hidden>Copy the sentence</button><p class="small">Journalists and analysts may quote the index and reuse the chart with credit to “OreOrbit Dependency Index (Bohemia Defense)” and a link to this page.</p></section>
<section><h2>By mineral, %(month)s</h2><ul class="idx">%(trs)s</ul><p class="small">China's share of the value of extra-EU imports, all tracked products of each mineral added up; change against the same month a year earlier.</p></section>
<section><h2>How it is made</h2><ul class="plain">
<li>Magnesium and manganese, added in November 2026, are tracked separately so the index stays comparable over time.</li> <li>For each of the ten index minerals, OreOrbit adds up the value of the EU's monthly imports from outside the EU of the products it tracks (for example permanent magnets, rare-earth compounds and metals for rare earths) and takes China's share.</li>
<li>The index is the plain average of the ten shares, so a small but critical mineral such as gallium counts as much as lithium.</li>
<li>Values, not tonnes; imports from outside the EU only. Single months can swing widely when few shipments arrive, so read the trend more than one month.</li>
<li>Updated automatically when Eurostat publishes a new month, usually about six weeks after the month ends.</li></ul></section>
<section><h2>Embed this chart</h2><p>Paste this code into an article or a blog post. The chart updates itself every month and credits OreOrbit.</p>
<p class="cite-text" style="font-family:monospace;font-size:13px;word-break:break-all">%(embed)s</p><button type="button" class="copy" data-copy="%(embed)s" data-label="Copy the embed code" data-done="Embed code copied" hidden>Copy the embed code</button></section>
%(cite)s
<p class="open"><a class="cta" href="../">See the minerals on the live atlas</a></p></article>""" % {
        "embed": e('<iframe src="' + BASE + 'p/embed-index.html" width="100%" height="420" style="border:0;max-width:760px" title="OreOrbit Dependency Index" loading="lazy"></iframe>'),
        "month": e(month_txt(last["month"])), "v": v, "dm": e(chg(d_m)), "dy": e(chg(d_y)), "over": last["over50"], "n": last["n"],
        "chart": index_chart(series), "quote": e(quote), "trs": trs, "cite": cite_box(title, path, today)}
    ld = [{"@type": "Dataset", "@id": BASE + path + "#dataset", "name": "OreOrbit Dependency Index", "description": "Monthly equal-weighted average of China's share of the value of extra-EU imports for the ten index materials used by Europe's defence industry (rare earths, titanium, tungsten, antimony, gallium, germanium, lithium, cobalt, nickel, graphite). Source: Eurostat Comext.",
           "url": BASE + path, "creator": {"@id": PERSON["@id"]}, "publisher": {"@id": ORG["@id"]}, "isAccessibleForFree": True, "dateModified": today,
           "temporalCoverage": "%s/%s" % (series[0]["month"], last["month"]), "variableMeasured": "China's share of extra-EU import value, equal-weighted across the ten index materials",
           "isBasedOn": "https://ec.europa.eu/eurostat/comext/newxtweb/", "keywords": ["critical raw materials", "defence industry", "EU imports", "China", "supply chain"]}]
    return path, page(path, title, desc[:300], body, ld, today, [("Atlas", ""), ("Library", "p/index.html"), ("Dependency Index", path)], alt="p/dependency-index-cs.html")


MON_CS = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"]
MONTH_CS_NOM = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"]
MONTH_CS_LOC = ["lednu", "únoru", "březnu", "dubnu", "květnu", "červnu", "červenci", "srpnu", "září", "říjnu", "listopadu", "prosinci"]
MAT_CS = {"ree": "Vzácné zeminy", "ti": "Titan", "w": "Wolfram", "sb": "Antimon", "ga": "Galium", "ge": "Germanium", "li": "Lithium", "co": "Kobalt", "ni": "Nikl", "gr": "Grafit", "mg": "Hořčík", "mn": "Mangan"}


def day_cs(d):
    d = str(d or "")[:10]
    try:
        return "%d. %s %d" % (int(d[8:10]), MON_CS[int(d[5:7]) - 1], int(d[:4]))
    except (ValueError, IndexError):
        return d


def cite_box_cs(title, path, today):
    text = "Madali, D. (%s). %s. OreOrbit, Bohemia Defense. %s%s (data k %s)." % (today[:4], title, BASE, path, day_cs(today))
    return ('<aside class="cite" aria-labelledby="cite-h"><h2 id="cite-h">Citujte tuto stránku</h2><p class="cite-text">%s</p>'
            '<button type="button" class="copy" data-copy="%s" data-label="Zkopírovat citaci" data-done="Citace zkopírována" hidden>Zkopírovat citaci</button>'
            '<p class="small">Údaje a grafy lze citovat a dále použít s uvedením „OreOrbit (Bohemia Defense)“ a odkazem na tuto stránku.</p></aside>') % (e(text), e(text))


def services_page_cs(cfg, today):
    path = "p/services-cs.html"
    title = "Služby: posouzení rizik kritických surovin pro výrobce obranné a kosmické techniky"
    desc = "Zjistěte, které vaše výrobky se zastaví, když se zavře hranice. Atlas zdarma, monitoring vašich surovin a posouzení připravenosti jedné výrobní řady za dva až tři týdny, od Bohemia Defense s daty OreOrbit."
    mail = cfg.get("contactEmail") or "david@madali.cz"
    subj = cfg.get("bookingUrl") or ("mailto:%s?subject=%s" % (mail, "%C3%9Avodn%C3%AD%20hovor%20k%20posouzen%C3%AD%20surovin"))
    body = """<h1>Zjistěte, které vaše výrobky se zastaví, když se zavře hranice.</h1>
<p class="lede">Pro výrobce obranné, bezpečnostní a kosmické techniky ve střední Evropě: posouzení závislosti jedné výrobní řady na kritických surovinách za dva až tři týdny, postavené na živých datech OreOrbit a podepsané analytikem.</p>
<p class="open"><a class="cta" href="%(subj)s">Domluvit úvodní 30minutový hovor zdarma</a> &nbsp; <a href="../oreorbit-sample-assessment.pdf">Ukázkové posouzení (PDF, 7 stran, anglicky)</a></p>
<section><h2>Pro koho to je</h2><ul class="plain">
<li>Výrobci a dodavatelé munice, obrněných vozidel, dronů, optiky, radarů a elektroniky, jejichž díly závisejí na surovinách zpracovávaných převážně v Číně.</li>
<li>Kosmické firmy s galiem a germaniem v solárních článcích a elektronice.</li>
<li>Velké firmy, které mají podle článku 24 nařízení EU o kritických surovinách posuzovat svůj dodavatelský řetězec, a dodavatelé, na které se teď obracejí jejich hlavní zákazníci.</li>
</ul></section>
<section><h2>Co nabízíme</h2>
<dl class="signals">
<div><dt>1 · Zdarma<br><b>0 €</b></dt><dd>Interaktivní atlas, rychlá kontrola vašeho výrobku, titulky týdne a živé důkazy. S e-mailem navíc pondělní přehled pro vaše suroviny a všechny panely živých dat v plném rozsahu. Bez přihlášení.</dd></div>
<div><dt>2 · Monitoring<br><b>390 € měsíčně</b></dt><dd>Sledujeme suroviny, které si zvolíte, jejich lokality a termíny nepřetržitě. Ozveme se, když se něco změní, a každé pondělí. Jednou měsíčně se nás můžete na cokoli zeptat: odpoví člověk do dvou pracovních dnů. Součástí je týdenní datový soubor pro vaše suroviny. Začnete v atlasu.</dd></div>
<div><dt>3 · Posouzení připravenosti<br><b>Pro vaše vedení</b></dt><dd>Jedna výrobní řada za dva až tři týdny: registr všech dílů s kritickou surovinou a jejich původu, hodnocení každého dílu, zátěžové testy proti skutečným vývozním kontrolám, pravidla, která rozhodují, kdo vám smí dodávat, a podklady pro vedení. Rozsah a cenu domluvíme na úvodním 30minutovém hovoru zdarma.</dd></div>
</dl>
<p class="small">Monitoring začíná e-mailem v atlasu; David se do jednoho pracovního dne ozve s ukázkovým upozorněním pro vaše suroviny.</p></section>
<section><h2>Jak posouzení probíhá</h2><ul class="dates">
<li><time>Den 1</time><span>Úvodní 30minutový hovor zdarma: výrobní řada a lidé, kteří se zapojí.</span></li>
<li><time>Týden 1</time><span>Dvě pracovní setkání s vaší konstrukcí a nákupem, při kterých díl po dílu vyplníme registr.</span></li>
<li><time>Týden 2</time><span>Analýza a zátěžové testy proti vývozním kontrolám, úzkým místům a lokalitám s živými daty OreOrbit.</span></li>
<li><time>Týden 3</time><span>Zpráva a prezentace pro vedení. Registr zůstává vám.</span></li>
</ul></section>
<section><h2>Vaše data</h2><p>Váš registr patří vám. Na požádání podepíšeme dohodu o mlčenlivosti, registr lze vyplnit přímo ve vašem prohlížeči, takže neopustí vaši firmu, a nic o vaší firmě nikdy nezveřejníme. Anonymizované souhrnné údaje použijeme jen s vaším písemným souhlasem.</p></section>
<section><h2>Co to je a co ne</h2><p>Posouzení je nezávislá analýza rizik dodavatelského řetězce z veřejných dat a informací, které nám poskytnete. Slouží jako podklad pro dokumentaci podle nařízení o kritických surovinách, není ale právní radou ani certifikací; své právní povinnosti si ověřte s právníkem.</p></section>
<section><h2>Kdo práci dělá</h2><div class="person"><img src="../img/david-madali-founder.jpg" alt="David Madali" width="600" height="750" loading="lazy"><div>
<p><a href="https://madali.cz/cs/"><b>David Madali</b></a>, zakladatel <a href="https://bohemiadefense.com/cs/">Bohemia Defense</a> a autor OreOrbit. Analytik obranného průmyslu, kritických surovin a kosmické ekonomiky, citovaný čínskou službou BBC News, se zkušenostmi z ekonomické diplomacie na Ministerstvu zahraničních věcí ČR a z exportního poradenství v CzechTrade.</p>
<p><a class="cta" href="%(subj)s">Domluvit úvodní 30minutový hovor zdarma</a></p></div></div></section>""" % {"subj": e(subj)}
    ld = [{"@type": "Service", "@id": BASE + path + "#service", "name": "Posouzení rizik kritických surovin v dodavatelském řetězci", "inLanguage": "cs", "description": desc,
           "provider": {"@id": ORG["@id"]}, "areaServed": "Europe", "url": BASE + path,
           "offers": [{"@type": "Offer", "name": "Atlas OreOrbit a pondělní přehled", "price": "0", "priceCurrency": "EUR"},
                      {"@type": "Offer", "name": "Monitoring vašich surovin", "price": "390", "priceCurrency": "EUR", "priceSpecification": {"@type": "UnitPriceSpecification", "price": 390, "priceCurrency": "EUR", "unitText": "měsíc"}},
                      {"@type": "Offer", "name": "Posouzení připravenosti jedné výrobní řady", "description": "Rozsah a cenu domluvíme na úvodním 30minutovém hovoru zdarma"}]}]
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("Služby", path)], lang="cs", alt="p/services.html")


def about_page_cs(ref, cfg, today):
    path = "p/about-cs.html"
    title = "O projektu OreOrbit"
    desc = "OreOrbit je bezplatný živý atlas kritických surovin, na kterých stojí evropský obranný a kosmický průmysl. Vytvořil ho David Madali v Bohemia Defense v Praze."
    mail = cfg.get("contactEmail") or "david@madali.cz"
    body = """<h1>O projektu OreOrbit</h1>
<p class="lede">Obrana Evropy stojí na %(n_min)s surovinách a u %(n_cn)s z nich ovládá Čína alespoň jednu fázi dodavatelského řetězce. OreOrbit ukazuje, kde se tyto suroviny těží a zpracovávají, jak se dostávají do Evropy a co se tento týden mění, z veřejných dat a satelitních snímků.</p>
<section><h2>Kdo za tím stojí</h2>
<div class="person"><img src="../img/david-madali-founder.jpg" alt="David Madali" width="600" height="750" loading="lazy"><div>
<p><a href="https://madali.cz/cs/"><b>David Madali</b></a> je pražský analytik obranného průmyslu, kritických surovin a kosmické ekonomiky. V roce 2024 založil <a href="https://bohemiadefense.com/cs/">Bohemia Defense</a>, nezávislý analytický projekt o evropském obranném průmyslu, bezpečnosti a zahraniční politice, a v roce 2026 vytvořil OreOrbit.</p>
<p>Jako analytika ho citovala čínská služba BBC News (<a href="%(bbc)s" rel="noopener">červenec 2025</a>). Má zkušenosti z ekonomie, ekonomické diplomacie na Ministerstvu zahraničních věcí ČR a exportního poradenství v CzechTrade, kde založil klastr 12 firem z bezpečnostního průmyslu.</p>
<p><a href="https://madali.cz/cs/">madali.cz</a> · <a href="https://www.linkedin.com/in/davidmadali/">LinkedIn</a> · <a href="https://bohemiadefense.com/david-madali-cz/">Stránka zakladatele</a></p>
</div></div></section>
<section><h2>Co to je</h2><ul class="plain">
<li>Živý atlas %(n_sites)d dolů, rafinerií a továren na magnety, %(n_routes)s a úzkých míst mezi nimi.</li>
<li>Satelitní snímky každé lokality každý týden: fotografie Sentinel-2, odlesněná plocha od roku 2018, radar Sentinel-1 a tepelné mapy Landsat.</li>
<li>Signály každých pár hodin: teplo v závodech, lodě v úžinách, zemětřesení a výstrahy, konflikty u dodavatelského řetězce.</li>
<li>Měsíční data o dovozu do EU a termíny vývozních kontrol, rychlá kontrola toho, na čem závisí jakýkoli výrobek, a týdenní přehled toho, co se mění.</li>
<li>Pro firmy: monitoring surovin, na kterých závisíte, a posouzení připravenosti jedné výrobní řady pro vaše vedení. Viz <a href="services-cs.html">služby</a>.</li>
<li><a href="index.html">Knihovna</a> stránek o každé surovině a lokalitě k citaci (anglicky) a měsíční <a href="dependency-index-cs.html">Index závislosti</a>.</li>
<li><a href="faq-cs.html">Otázky a odpovědi</a> o kritických závislostech Evropy, úzkých místech dopravy, nařízení EU o kritických surovinách a čínských vývozních kontrolách, s aktuálními čísly.</li>
</ul></section>
<section><h2>Jak to funguje</h2>
<p>Všechno pochází z veřejných zdrojů, uvedených a datovaných tam, kde jsou použity. Automatická aktualizace sbírá a zpracovává data každé tři hodiny a stránky obnovuje každý den. Automaticky nalezené zprávy jsou označené jako neověřené. OreOrbit ukazuje měření a veřejné záznamy; nepředpovídá a není investiční ani právní radou.</p>
<p>Úplný seznam zdrojů a jejich licencí je na <a href="legal.html">právní stránce</a> (anglicky).</p></section>
<section><h2>Spolupráce</h2>
<p>OreOrbit je zdarma. Výrobcům obranné a kosmické techniky, kteří potřebují obhajitelnou odpověď, nabízí Bohemia Defense posouzení rizik jedné výrobní řady s pevným rozsahem jako podklad pro článek 24 nařízení EU o kritických surovinách a průběžné sledování surovin, lokalit a termínů z vašeho registru.</p>
<p><a class="cta" href="services-cs.html">Služby a ceny</a> &nbsp; <a href="mailto:%(mail)s?subject=OreOrbit">Napsat na %(mail)s</a></p></section>
<section><h2>Jak OreOrbit citovat</h2><p class="cite-text">Madali, D. (%(year)s). OreOrbit: kritické suroviny z oběžné dráhy. Bohemia Defense. https://bohemiadefense.com/atlas/</p></section>""" % dict({"bbc": BBC, "mail": e(mail), "year": today[:4]}, **_about_counts(ref, True))
    ld = [{"@type": "AboutPage", "@id": BASE + path + "#about", "name": title, "description": desc, "inLanguage": "cs", "dateModified": today, "about": {"@id": ATLAS["@id"]}, "author": {"@id": PERSON["@id"]},
           "mainEntity": {"@id": PERSON["@id"]}}, person_full(cs=True), org_full(cs=True)]
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("O projektu", path)], lang="cs", alt="p/about.html")


def dependency_page_cs(ref, live, today):
    path = "p/dependency-index-cs.html"
    series = dependency_series(live.get("trade"))
    title = "Index závislosti OreOrbit: podíl Číny na dovozu surovin pro evropskou obranu"
    if not series:
        return path, page(path, title, "Měsíční index podílu Číny na dovozu deseti surovin indexu do EU.", "<h1>Index závislosti OreOrbit</h1><p class=\"lede\">Index se zobrazí, jakmile budou k dispozici měsíční obchodní data.</p>", [], today, [("Atlas", ""), ("Index závislosti", path)], lang="cs", alt="p/dependency-index.html")
    last = series[-1]
    v = round(last["value"] * 100)
    mi = int(last["month"][5:7]) - 1
    mon_nom, mon_loc = "%s %s" % (MONTH_CS_NOM[mi], last["month"][:4]), "%s %s" % (MONTH_CS_LOC[mi], last["month"][:4])
    prev_m = series[-2] if len(series) > 1 else None
    yago = next((x for x in series if x["month"] == "%04d-%s" % (int(last["month"][:4]) - 1, last["month"][5:])), None)
    def chg(d):
        if d is None:
            return "–"
        w = "bod" if abs(d) == 1 else "body" if 2 <= abs(d) <= 4 else "bodů"
        return ("+%d" % d if d > 0 else "%d" % d) + " " + w
    d_m = (v - round(prev_m["value"] * 100)) if prev_m else None
    d_y = (v - round(yago["value"] * 100)) if yago else None
    quote = "Čína v %s dodala %d %% dovozu deseti surovin indexu, na kterých stojí evropský obranný průmysl, do EU, podle Indexu závislosti OreOrbit od Bohemia Defense%s." % (
        mon_loc, v, ("; před rokem to bylo %d %%" % round(yago["value"] * 100)) if yago else "")
    rows = sorted(last["per"].items(), key=lambda kv: -kv[1])
    trs = "".join('<li style="--c:%s"><span>%s</span><span class="pc"><span class="qbar"><span style="width:%.0f%%"></span></span>%d %%%s</span></li>' % (
        COL.get(m, "#eceee9"), e(MAT_CS.get(m, m)), x * 100, round(x * 100),
        ("" if not yago or m not in yago["per"] else ' <em>%s</em>' % e(chg(round(x * 100) - round(yago["per"][m] * 100))))) for m, x in rows)
    body = """<article style="--c:#3ddc97">
<p class="kicker"><i></i>Měsíčně · data Eurostatu za %(nom)s</p>
<h1>Index závislosti OreOrbit</h1>
<p class="lede">Podíl Číny na tom, co EU dováží ze zemí mimo EU, napříč deseti surovinami indexu, na kterých stojí evropský obranný průmysl. Každá surovina má stejnou váhu.</p>
<dl class="figs"><div><dt>%(v)d %%</dt><dd>podíl Číny, %(nom)s</dd></div><div><dt>%(dm)s</dt><dd>změna proti předchozímu měsíci</dd></div><div><dt>%(dy)s</dt><dd>změna proti stejnému měsíci před rokem</dd></div><div><dt>%(over)d z %(n)d</dt><dd>surovin, u kterých Čína dodala víc než polovinu</dd></div></dl>
<section><h2>Měsíc po měsíci</h2>%(chart)s<p class="small">Průměr podílů Číny na hodnotě dovozu do EU ze zemí mimo EU, se stejnou vahou pro každou surovinu. Zdroj: Eurostat Comext, přes OreOrbit.</p><button type="button" class="dl" data-label="Stáhnout graf (SVG)" hidden>Stáhnout graf (SVG)</button></section>
<section><h2>K citaci</h2><p class="cite-text">%(quote)s</p><button type="button" class="copy" data-copy="%(quote)s" data-label="Zkopírovat větu" data-done="Věta zkopírována" hidden>Zkopírovat větu</button><p class="small">Novináři a analytici mohou index citovat a graf dále použít s uvedením „Index závislosti OreOrbit (Bohemia Defense)“ a odkazem na tuto stránku.</p></section>
<section><h2>Podle surovin, %(nom)s</h2><ul class="idx">%(trs)s</ul><p class="small">Podíl Číny na hodnotě dovozu do EU ze zemí mimo EU, všechny sledované produkty dané suroviny dohromady; změna proti stejnému měsíci před rokem.</p></section>
<section><h2>Jak index vzniká</h2><ul class="plain">
<li>Hořčík a mangan, přidané v listopadu 2026, sledujeme zvlášť, aby index zůstal srovnatelný v čase.</li> <li>U každé z deseti surovin indexu OreOrbit sečte měsíční hodnotu dovozu sledovaných produktů do EU ze zemí mimo EU (například u vzácných zemin permanentní magnety, sloučeniny a kovy) a spočítá podíl Číny.</li>
<li>Index je prostý průměr deseti podílů, takže malá, ale kritická surovina jako galium váží stejně jako lithium.</li>
<li>Hodnoty, ne tuny; jen dovoz ze zemí mimo EU. Jednotlivé měsíce mohou výrazně kolísat, když dorazí málo zásilek, proto čtěte spíš trend.</li>
<li>Obnovuje se automaticky, jakmile Eurostat zveřejní nový měsíc, obvykle zhruba šest týdnů po jeho konci.</li></ul></section>
%(cite)s
<p class="open"><a class="cta" href="../?lang=cs">Suroviny na živém atlasu</a></p></article>""" % {
        "nom": e(mon_nom), "v": v, "dm": e(chg(d_m)), "dy": e(chg(d_y)), "over": last["over50"], "n": last["n"],
        "chart": index_chart(series), "quote": e(quote), "trs": trs, "cite": cite_box_cs(title, path, today)}
    ld = [{"@type": "Dataset", "@id": BASE + path + "#dataset", "name": "Index závislosti OreOrbit", "inLanguage": "cs", "description": quote, "url": BASE + path,
           "creator": {"@id": PERSON["@id"]}, "publisher": {"@id": ORG["@id"]}, "isAccessibleForFree": True, "dateModified": today,
           "temporalCoverage": "%s/%s" % (series[0]["month"], last["month"])}]
    return path, page(path, title, quote[:300], body, ld, today, [("Atlas", ""), ("Knihovna", "p/index.html"), ("Index závislosti", path)], lang="cs", alt="p/dependency-index.html")


# ---------------------------------------------------------------- the weekly LinkedIn cards and the embeddable chart

PRODUCTS = [("Drones", "Drony", {"ree": "motor magnets", "ga": "radio links (GaN)", "gr": "battery anodes", "co": "battery cathodes", "li": "battery cells", "ni": "battery cathodes", "ge": "thermal camera lenses", "mn": "battery cathodes"}),
            ("Ammunition and guided munitions", "Munice a řízená munice", {"sb": "primers and hardened lead", "w": "penetrators and fragmentation", "ree": "fin actuators", "ga": "seekers and fuzes", "mg": "decoy flares and tracers", "mn": "steel shells and casings"}),
            ("Optics and thermal imaging", "Optika a termovize", {"ge": "infrared lenses", "ga": "detectors (GaAs, InGaAs)", "ree": "laser rangefinders"}),
            ("Radar and electronics", "Radary a elektronika", {"ga": "GaN power amplifiers", "ge": "high-frequency chips", "ree": "magnets and garnets", "sb": "infrared detectors"}),
            ("Armoured vehicles", "Obrněná vozidla", {"ti": "armour and structures", "w": "penetrators and tooling", "ni": "armour steel", "ree": "electric drives", "mn": "armour steel", "mg": "light alloy parts"}),
            ("Aircraft and space", "Letectví a kosmonautika", {"ti": "airframes and engines", "ni": "engine superalloys", "co": "engine superalloys", "ree": "actuators", "ga": "solar cells (GaAs)", "ge": "solar-cell substrates", "mg": "titanium metal (Kroll process) and light alloys"}),
            ("Batteries and energy storage", "Baterie a úložiště energie", {"li": "cells", "co": "cathodes", "ni": "cathodes", "gr": "anodes", "mn": "NMC and LMFP cathodes"})]
FONTS_URL = "https://bohemiadefense.com/atlas/fonts/"


def card_doc(inner):
    return ("""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:HG;src:url(%(F)shanken-grotesk-latin-wght-normal.woff2) format("woff2");font-weight:100 900}
@font-face{font-family:DM;src:url(%(F)sdm-mono-latin-400-normal.woff2) format("woff2")}
*{box-sizing:border-box;margin:0;padding:0}body{width:1080px;height:1350px;background:#050607;color:#eceee9;font-family:HG,"Helvetica Neue",Arial,sans-serif;position:relative;overflow:hidden}
.orb{position:absolute;right:-260px;top:-240px;width:760px;height:760px;border-radius:50%%;border:1.5px solid rgba(236,238,233,.08)}
.sat{position:absolute;right:250px;top:96px;width:16px;height:16px;border-radius:50%%;background:#3ddc97;box-shadow:0 0 0 8px rgba(61,220,151,.15)}
.top{position:absolute;left:84px;top:78px;font:500 22px HG}.top span{color:#8d959a;font-weight:400}
.k{position:absolute;left:84px;top:170px;font:400 22px DM,monospace;color:#8d959a}
h1{position:absolute;left:84px;top:215px;width:910px;font-weight:250;font-size:92px;line-height:.98;letter-spacing:-.05em}h1 b{font-weight:500;color:#fff}
.sub{position:absolute;left:84px;width:880px;font-size:32px;line-height:1.3;color:#a3aaae}.sub b{color:#eceee9;font-weight:600}
.foot{position:absolute;left:84px;right:84px;bottom:84px;display:flex;justify-content:space-between;align-items:flex-end;border-top:1.5px solid rgba(236,238,233,.12);padding-top:26px}
.cta{font-size:26px;line-height:1.35}.cta b{display:block;font-weight:600;color:#fff}.cta span{font:400 21px DM,monospace;color:#3ddc97}
.who{text-align:right;font:400 19px DM,monospace;color:#8d959a;line-height:1.6}.who b{font:600 22px HG;color:#eceee9}
.src{position:absolute;left:84px;bottom:36px;font:400 15px DM,monospace;color:#5d6469;white-space:nowrap}
.list{position:absolute;left:84px;right:84px}.r{display:grid;grid-template-columns:400px 1fr;gap:26px;align-items:center;padding:12px 0;border-top:1.5px solid rgba(236,238,233,.10)}
.nm{display:flex;flex-direction:column;gap:2px;padding-left:28px;position:relative}.nm i{position:absolute;left:0;top:10px;width:14px;height:14px;border-radius:50%%}
.nm b{font-size:27px;font-weight:500}.nm span{font:400 17px DM,monospace;color:#8d959a}
.bar{display:flex;align-items:center;gap:20px}.tr{flex:1;height:14px;border-radius:14px;background:rgba(236,238,233,.08);overflow:hidden}.fl{height:100%%;border-radius:14px}
.v{width:190px;font-size:28px;font-weight:600;white-space:nowrap}.v em{display:block;font:400 16px DM,monospace;color:#8d959a;font-style:normal}
.big{position:absolute;left:84px;top:430px;font-weight:200;font-size:300px;line-height:1;letter-spacing:-.06em}
.chart{position:absolute;left:84px;right:84px;top:820px;height:260px}
.main{position:absolute;left:84px;right:84px;top:165px;bottom:230px;display:flex;flex-direction:column;gap:24px}
.main>*{position:static!important;left:auto!important;top:auto!important;width:auto!important}
.main .big{font-size:230px;line-height:.9}.main .chart{height:230px;margin-top:auto}.main .list{margin-top:6px}
</style></head><body><div class="orb"></div><div class="sat"></div>
<div class="top">OreOrbit <span>· by Bohemia Defense</span></div>%(inner)s
<div class="foot"><div class="cta"><b>%(cta)s</b><span>bohemiadefense.com/atlas</span></div><div class="who"><b>David Madali</b><br>Bohemia Defense · Prague</div></div>
</body></html>""" % {"F": FONTS_URL, "inner": inner[0], "cta": inner[1]})


def social_cards(ref, live, today):
    """Three LinkedIn cards for this week, each with an English and a Czech caption."""
    cards = []
    series = dependency_series(live.get("trade"))
    if series:
        last = series[-1]
        v = round(last["value"] * 100)
        yago = next((x for x in series if x["month"] == "%04d-%s" % (int(last["month"][:4]) - 1, last["month"][5:])), None)
        dy = (v - round(yago["value"] * 100)) if yago else None
        svg = index_chart(series).replace('class="chart"', 'style="width:100%;height:100%"').replace('class="c-x"', 'font-size="13" fill="#697176" font-family="DM, monospace"')
        inner = ('<div class="main"><div class="k">OreOrbit Dependency Index · %s</div><h1 style="font-size:74px">China\'s share of Europe\'s <b>defence-mineral imports</b></h1>'
                 '<div class="big">%d%%</div><div class="sub">%s</div><div class="chart">%s</div></div>'
                 '<div class="src">Equal-weighted share of extra-EU import value, ten index minerals · Eurostat Comext via OreOrbit</div>') % (
            month_txt(last["month"]), v, ("<b>%+d points</b> from a year earlier" % dy) if dy is not None else "", svg)
        cards.append({"slug": "index", "title": "Dependency Index, %s" % month_txt(last["month"]), "html": card_doc((inner, "The monthly number, with the method")),
                      "en": "China supplied %d%% of the EU's imports of the ten index minerals behind Europe's defence industry in %s%s.\n\nThat's the OreOrbit Dependency Index: each mineral counts equally, so gallium matters as much as lithium. Full breakdown and method in the first comment.\n\n#CriticalRawMaterials #DefenceIndustry #SupplyChain #Europe" % (
                          v, month_txt(last["month"]), (", %s from %d%% a year earlier" % ("up" if dy > 0 else "down" if dy < 0 else "unchanged", round(yago["value"] * 100))) if yago else ""),
                      "cs": "Čína v %s dodala %d %% dovozu deseti surovin indexu, na kterých stojí evropský obranný průmysl, do EU%s.\n\nTo je Index závislosti OreOrbit: každá surovina má stejnou váhu, takže galium se počítá stejně jako lithium. Rozpad a metodika v prvním komentáři." % (
                          MONTH_CS_LOC[int(last["month"][5:7]) - 1] + " " + last["month"][:4], v, ("; před rokem to bylo %d %%" % round(yago["value"] * 100)) if yago else ""),
                      "link": BASE + "p/dependency-index.html"})
        if yago:
            moves = sorted(((round(last["per"][m] * 100) - round(yago["per"][m] * 100), m) for m in last["per"] if m in yago["per"]), key=lambda t: -abs(t[0]))
            if moves:
                d, m = moves[0]
                nm = ((ref["materials"].get(m) or {}).get("info") or {}).get("name", m)
                a, b = round(yago["per"][m] * 100), round(last["per"][m] * 100)
                inner = ('<div class="main"><div class="k">Biggest move this year · %s</div><h1 style="font-size:80px">%s: China\'s share <b>%s %d points</b> in a year</h1>'
                         '<div class="list">'
                         '<div class="r"><div class="nm"><i style="background:#555"></i><b>%s</b><span>China\'s share of EU imports</span></div><div class="bar"><div class="tr"><div class="fl" style="width:%d%%;background:#6b7277"></div></div><div class="v">%d%%</div></div></div>'
                         '<div class="r"><div class="nm"><i style="background:%s"></i><b>%s</b><span>China\'s share of EU imports</span></div><div class="bar"><div class="tr"><div class="fl" style="width:%d%%;background:%s"></div></div><div class="v">%d%%</div></div></div></div>'
                         '<div class="sub">One month can swing, so read it as a signal, not a verdict. The full monthly series is on OreOrbit.</div></div>'
                         '<div class="src">Share of extra-EU import value · Eurostat Comext via OreOrbit</div>') % (
                    month_txt(last["month"]), nm, "up" if d > 0 else "down", abs(d), month_txt(yago["month"]), a, a, COL.get(m, "#eee"), month_txt(last["month"]), b, COL.get(m, "#eee"), b)
                cards.append({"slug": "mover", "title": "%s, %+d points" % (nm, d), "html": card_doc((inner, "Every mineral, month by month")),
                              "en": "%s: China's share of the EU's imports went from %d%% to %d%% in a year (%s to %s).\n\nWhen one supplier's share moves this much, someone in a European purchasing department either found a second source, or lost one. Monthly data per mineral in the first comment.\n\n#CriticalRawMaterials #SupplyChain #DefenceIndustry" % (
                                  nm, a, b, month_txt(yago["month"]), month_txt(last["month"])),
                              "cs": "%s: podíl Číny na dovozu do EU se za rok změnil z %d %% na %d %%.\n\nKdyž se podíl jednoho dodavatele pohne takhle, někdo v evropském nákupu buď našel druhý zdroj, nebo ho ztratil. Měsíční data v prvním komentáři." % (MAT_CS.get(m, nm), a, b),
                              "link": BASE + "p/dependency-index.html"})
    wk = dt.date.fromisoformat(today).isocalendar()[1]
    pen, pcs, uses = PRODUCTS[wk % len(PRODUCTS)]
    rows, conc, cn = [], 0, 0
    for m in [x for x in ref["order"] if x in uses]:
        x = (ref["materials"][m].get("worst") or {}).get("x") or {}
        pct, who = x.get("pct"), x.get("who", "China")
        if pct and pct > 65:
            conc += 1
            cn += who == "China"
        rows.append('<div class="r"><div class="nm"><i style="background:%s"></i><b>%s</b><span>%s</span></div><div class="bar"><div class="tr"><div class="fl" style="width:%s%%;background:%s"></div></div><div class="v">%s <em>%s</em></div></div></div>' % (
            COL[m], e(ref["materials"][m]["info"]["name"]), e(uses[m]), pct or 0, COL[m], ("%s%%" % pct) if pct else "China", e(who if pct else "leads, no public total")))
    inner = ('<div class="main"><div class="k">Product spotlight</div><h1 style="font-size:%dpx">%s.<br><b>%d critical minerals.</b></h1><div class="sub">For <b>%d of them, one country controls more than 65%%</b> of a key stage%s.</div>'
             '<div class="list">%s</div></div><div class="src">Leading country\'s share at the tightest stage · USGS, IEA via OreOrbit</div>') % (
        84 if len(pen) <= 14 else 70, e(pen), len(rows), conc, (". China in %d" % cn) if cn else "", "".join(rows[:7]))
    cards.append({"slug": "product", "title": pen, "html": card_doc((inner, "Check your own product in 60 seconds")),
                  "en": ("%s depend on %d of the " + w_en(len(ref["order"])) + " critical minerals. For %d of them, one country controls more than 65%% of a key stage%s.\n\nYou can check your own product type in 60 seconds, free, in OreOrbit's quick check (link in the first comment).\n\n#DefenceIndustry #CriticalRawMaterials #SupplyChain") % (
                      pen, len(rows), conc, (", China in %d" % cn) if cn else ""),
                  "cs": ("%s závisí na %d z " + w_cs(len(ref["order"]), gen=True) + " kritických surovin. U %d z nich ovládá jedna země přes 65 %% klíčové fáze%s.\n\nSvůj typ výrobku si prověříte za 60 sekund zdarma v rychlé kontrole OreOrbit (odkaz v prvním komentáři).") % (
                      pcs, len(rows), conc, (", Čína u %d" % cn) if cn else ""),
                  "link": BASE + "#check"})
    return cards


def social_page(cards, files, today):
    """The private page with this week's cards and captions (not in the sitemap, not indexed)."""
    path = "p/social.html"
    items = "".join("""<section><h2>%s</h2><figure class="sat"><img src="../%s" alt="" width="1080" height="1350" loading="lazy" style="max-width:420px"></figure>
<p><a class="cta" href="../%s" download>Download the picture</a></p>
<h3 class="small">English caption</h3><p class="cite-text" style="white-space:pre-line">%s</p><button type="button" class="copy" data-copy="%s" data-label="Copy the English caption" data-done="Copied" hidden>Copy the English caption</button>
<h3 class="small">Czech caption</h3><p class="cite-text" style="white-space:pre-line">%s</p><button type="button" class="copy" data-copy="%s" data-label="Copy the Czech caption" data-done="Copied" hidden>Copy the Czech caption</button>
<p class="small">First comment: %s</p></section>""" % (e(c["title"]), e(f), e(f), e(c["en"]), e(c["en"]), e(c["cs"]), e(c["cs"]), e(c["link"])) for c, f in zip(cards, files))
    body = '<h1>This week on LinkedIn</h1><p class="lede">Three cards drawn from this week\'s data, with captions. Post one, put the link in the first comment, and answer every comment in the first hour.</p>' + items
    html = page(path, "This week's LinkedIn cards", "Private page", body, [], today, [("Atlas", ""), ("LinkedIn cards", path)])
    return path, html.replace('<meta name="author"', '<meta name="robots" content="noindex, nofollow">\n<meta name="author"', 1)


def embed_page(live, today):
    """A minimal page with the index chart, for journalists to embed with an iframe."""
    path = "p/embed-index.html"
    series = dependency_series(live.get("trade"))
    if not series:
        return path, None
    last = series[-1]
    v = round(last["value"] * 100)
    html = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>OreOrbit Dependency Index</title>
<meta name="robots" content="noindex"><link rel="canonical" href="%(base)sp/dependency-index.html"><link rel="stylesheet" href="../fonts/fonts.css"><link rel="stylesheet" href="../library.css">
<style>body{margin:0;padding:18px 20px 14px;background:#050607}.e-top{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap}.e-n{font-weight:300;font-size:44px;letter-spacing:-.04em;line-height:1}.e-t{color:#a3aaae;font-size:14px;max-width:46ch}.e-s{margin-top:6px;font-size:12px;color:#697176}.e-s a{color:#a3aaae}</style></head>
<body><div class="e-top"><div class="e-n">%(v)d%%</div><div class="e-t">China's share of EU imports of the ten index minerals behind Europe's defence, %(month)s</div></div>
%(chart)s
<div class="e-s">OreOrbit Dependency Index · Eurostat Comext · <a href="%(base)sp/dependency-index.html" target="_blank" rel="noopener">OreOrbit by Bohemia Defense</a></div><script src="../library.js" defer></script></body></html>
""" % {"base": BASE, "v": v, "month": e(month_txt(last["month"])), "chart": index_chart(series)}
    return path, html


# ---------------------------------------------------------------- v3.9: questions, guides and archives

def qa_section(qas):
    return '<section class="faq"><h2>Key questions</h2>%s</section>' % "".join('<h3>%s</h3><p>%s</p>' % (e(q), e(a)) for q, a in qas)


def faq_ld(path, qas):
    return {"@type": "FAQPage", "@id": BASE + path + "#faq", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in qas]}


def article_ld(path, title, desc, today, published=None, about=None):
    d = {"@type": "Article", "@id": BASE + path + "#article", "headline": title[:110], "description": desc[:300], "dateModified": today, "inLanguage": "en",
         "author": {"@id": PERSON["@id"]}, "publisher": {"@id": ORG["@id"]}, "mainEntityOfPage": BASE + path, "isAccessibleForFree": True}
    if published:
        d["datePublished"] = published
    if about:
        d["about"] = {"@type": "Thing", "name": about}
    return d


def brief_pages(live, today):
    """One dated page per weekly brief, and an archive of them."""
    out, rows = {}, []
    briefs = [b for b in (live.get("briefs") or []) if isinstance(b, dict) and b.get("week")]
    briefs.sort(key=lambda b: b["week"], reverse=True)
    for b in briefs:
        wk = str(b["week"])[:10]
        path = "p/brief-%s.html" % wk
        title = b.get("title") or "The week in data, %s" % day(wk)
        pts = [x for x in (b.get("points") or []) if isinstance(x, dict) and x.get("text")]
        items = "".join('<li style="--c:%s"><span>%s</span>%s</li>' % (COL.get((x.get("materials") or [""])[0], "#3ddc97"), e(x["text"]),
                        (' <a href="%s" rel="noopener">%s</a>' % (e(x["url"]), e(x.get("source") or "Source"))) if str(x.get("url", "")).startswith("https://") else (' <span class="src">%s</span>' % e(x.get("source") or ""))) for x in pts)
        watch = "".join("<li>%s</li>" % e(w) for w in (b.get("watchNext") or []))
        body = ('<article style="--c:#3ddc97"><p class="kicker"><i></i>Weekly brief · week of %s</p><h1>%s</h1><p class="lede">%s</p>'
                '<section><h2>This week</h2><ul class="plain brief">%s</ul></section>%s'
                '<p class="small">Assembled automatically every Monday from OreOrbit\'s own data and the week\'s headlines; no person or AI writes it. Each point links to its source. <a href="briefs.html">All weekly briefs</a></p>%s'
                '<p class="open"><a class="cta" href="../">See this week on the live atlas</a></p></article>') % (
            e(day(wk)), e(title), e(b.get("lede") or ""), items, ('<section><h2>What to watch</h2><ul class="plain">%s</ul></section>' % watch) if watch else "", cite_box(title, path, today))
        desc = ("%s: %s" % (title, b.get("lede") or ""))[:300]
        out[path] = page(path, title, desc, body, [article_ld(path, title, desc, today, wk)], today, [("Atlas", ""), ("Library", "p/index.html"), ("Weekly briefs", "p/briefs.html"), (day(wk), path)])
        rows.append('<li><a href="brief-%s.html">%s</a><span>%s</span></li>' % (wk, e(title), e((b.get("lede") or "")[:160])))
    if rows:
        path = "p/briefs.html"
        title = "Weekly briefs: the week in critical minerals and Europe's defence supply chain"
        body = ('<h1>Weekly briefs</h1><p class="lede">Every Monday OreOrbit assembles a short, dated summary of the week from its own data: deadlines, heat at the plants, conflict near the supply chain, tenders, imports and the top stories.</p>'
                '<ul class="lib">%s</ul>') % "".join(rows)
        out[path] = page(path, title, "Dated weekly summaries of critical minerals and Europe's defence supply chain, from OreOrbit's data.", body,
                         [{"@type": "CollectionPage", "@id": BASE + path + "#page", "name": title, "url": BASE + path, "dateModified": today}], today, [("Atlas", ""), ("Library", "p/index.html"), ("Weekly briefs", path)])
    return out


def index_snapshots(ref, live, today):
    """A permanent page for every month of the Dependency Index, so each figure has a stable address to cite."""
    out = {}
    series = dependency_series(live.get("trade"))
    names = {m: ((ref["materials"].get(m) or {}).get("info") or {}).get("name", m) for m in ref["order"]}
    for i, x in enumerate(series):
        k = x["month"]; v = round(x["value"] * 100)
        path = "p/dependency-index-%s.html" % k
        prev = series[i - 1] if i else None
        yago = next((y for y in series if y["month"] == "%04d-%s" % (int(k[:4]) - 1, k[5:])), None)
        title = "OreOrbit Dependency Index, %s: %d%%" % (month_txt(k), v)
        quote = "China supplied %d%% of the EU's imports of the ten index minerals behind Europe's defence industry in %s, according to the OreOrbit Dependency Index (Bohemia Defense)%s." % (
            v, month_txt(k), (", against %d%% a year earlier" % round(yago["value"] * 100)) if yago else "")
        rows = sorted(x["per"].items(), key=lambda kv: -kv[1])
        lis = "".join('<li style="--c:%s"><span><a href="%s.html">%s</a></span><span class="pc"><span class="qbar"><span style="width:%.0f%%"></span></span>%d%%</span></li>' % (
            COL.get(m, "#eceee9"), SLUG.get(m, m), e(names.get(m, m)), sh * 100, round(sh * 100)) for m, sh in rows)
        nav = []
        if prev:
            nav.append('<a href="dependency-index-%s.html">%s: %d%%</a>' % (prev["month"], e(month_txt(prev["month"])), round(prev["value"] * 100)))
        if i + 1 < len(series):
            nx = series[i + 1]; nav.append('<a href="dependency-index-%s.html">%s: %d%%</a>' % (nx["month"], e(month_txt(nx["month"])), round(nx["value"] * 100)))
        body = ('<article style="--c:#3ddc97"><p class="kicker"><i></i>OreOrbit Dependency Index · monthly snapshot</p><h1>%s: %d%%</h1><p class="lede">%s</p>'
                '<section><h2>By mineral</h2><ul class="idx">%s</ul><p class="small">China\'s share of the value of extra-EU imports, all tracked products per mineral. Source: Eurostat Comext, via OreOrbit.</p></section>'
                '<section><h2>Other months</h2><p class="monthnav">%s</p><p><a href="dependency-index.html">The latest index, method and embeddable chart</a></p></section>%s</article>') % (
            e(month_txt(k)), v, e(quote), lis, " · ".join(nav), cite_box(title, path, today))
        out[path] = page(path, title, quote[:300], body, [article_ld(path, title, quote, today, k + "-15", "OreOrbit Dependency Index")], today,
                         [("Atlas", ""), ("Library", "p/index.html"), ("Dependency Index", "p/dependency-index.html"), (month_txt(k), path)])
    return out, series


SPACE = [("ga", "gallium arsenide solar cells"), ("ge", "substrates for multi-junction solar cells"), ("ree", "magnets in reaction wheels, actuators and motors"),
         ("ti", "structures, fuel tanks and engines"), ("ni", "superalloys for rocket engines"), ("co", "superalloys for rocket engines"), ("li", "satellite batteries")]


def space_page(ref, live, today):
    path = "p/space.html"
    title = "Critical minerals for the space industry: who controls them, and what Europe imports"
    ser = dependency_series(live.get("trade")); last = ser[-1] if ser else None
    names = {m: ((ref["materials"].get(m) or {}).get("info") or {}).get("name", m) for m in ref["order"]}
    rows = []
    for m, use in SPACE:
        wx = ((ref["materials"].get(m) or {}).get("worst") or {}).get("x") or {}
        lead = ("%s %s" % (pct_txt(wx), wx.get("who", ""))) if wx.get("pct") else "China leads"
        imp = ("%d%%" % round(last["per"][m] * 100)) if last and m in last["per"] else "–"
        rows.append('<tr><td><i style="background:%s"></i><a href="%s.html">%s</a></td><td>%s</td><td><b>%s</b></td><td>%s</td></tr>' % (COL.get(m, "#eee"), SLUG[m], e(names[m]), e(use), e(lead), e(imp)))
    ga = (ref["materials"].get("ga") or {}).get("info") or {}
    ga_stat = next((st for st in ga.get("stats") or [] if "primary" in str(st.get("what", ""))), None)
    qas = [("Which critical minerals does the space industry depend on?",
            "Satellites and launchers rely on gallium and germanium for solar cells, rare-earth magnets in reaction wheels, actuators and motors, titanium for structures and fuel tanks, nickel and cobalt superalloys for rocket engines, and lithium for batteries."),
           ("Why is gallium important for satellites?",
            "Gallium arsenide is used in the high-efficiency solar cells that power most satellites." + ((" %s %s (%s)." % (ga_stat.get("num"), ga_stat.get("what"), ga_stat.get("src"))) if ga_stat else ""))]
    if last:
        qas.append(("How dependent is Europe on China for these minerals?",
                    "Across the ten index minerals OreOrbit tracks, China supplied %d%% of the value of the EU's imports from outside the EU in %s (OreOrbit Dependency Index, Eurostat data). The share varies widely by mineral; see the table above." % (round(last["value"] * 100), month_txt(last["month"]))))
    qas.append(("How can a space company check its exposure?",
                "OreOrbit's free quick check includes 'Aircraft and space' as a product type (bohemiadefense.com/atlas/#check). For a specific product line, Bohemia Defense offers a readiness review that maps the actual parts."))
    body = ('<article style="--c:#22d3ee"><p class="kicker"><i></i>Space economy · critical raw materials</p><h1>Critical minerals for the space industry</h1>'
            '<p class="lede">Satellites and launchers depend on a handful of critical minerals, and for several of them one country controls the key stage of supply. Here is which ones, what they are used for, and how much of Europe\'s imports come from China.</p>'
            '<section><h2>What a satellite is made of</h2><table class="tbl"><tr><th>Mineral</th><th>Use in space</th><th>Leading country, tightest stage</th><th>China\'s share of EU imports%s</th></tr>%s</table>'
            '<p class="small">World shares: USGS and IEA via OreOrbit. EU imports: value of imports from outside the EU, Eurostat Comext. Typical uses; individual designs differ.</p></section>%s%s'
            '<p class="open"><a class="cta" href="../#check">Check aircraft and space in 60 seconds</a></p></article>') % (
        (", " + e(month_txt(last["month"]))) if last else "", "".join(rows), qa_section(qas), cite_box(title, path, today))
    desc = "Which critical minerals satellites and launchers depend on, who controls them, and how much of Europe's imports come from China."
    return path, page(path, title, desc, body, [article_ld(path, title, desc, today, about="Critical raw materials in the space industry"), faq_ld(path, qas)], today,
                      [("Atlas", ""), ("Library", "p/index.html"), ("Space", path)])


def crma_page(today):
    path = "p/crma-article-24.html"
    title = "Article 24 of the EU Critical Raw Materials Act: what large manufacturers must do"
    qas = [("What does Article 24 of the Critical Raw Materials Act require?",
            "Large companies that manufacture strategic technologies using strategic raw materials must, at least every three years, carry out a risk assessment of their supply chain: map where the strategic raw materials they use are extracted, processed and recycled, analyse the factors that could affect supply, and assess their vulnerability. If they find significant vulnerabilities, they should work to reduce them, for example by diversifying or substituting."),
           ("Who has to comply?",
            "Large companies that manufacture strategic technologies in the EU using strategic raw materials. Under the original Act, member states had to identify these companies by 24 May 2025. A 2026 amendment proposal would move the identification to the European Commission."),
           ("When did the Critical Raw Materials Act enter into force?", "On 23 May 2024. It lists 34 critical raw materials, 17 of them strategic."),
           ("What is changing in 2026?",
            "The Commission has proposed amendments under which it would identify the large companies itself, and the companies would carry out the risk assessment within months of being informed and at least every three years, including mapping the components that contain strategic raw materials. The European Parliament adopted its position on 20 October 2026; the final text was still being negotiated at the end of October 2026."),
           ("Does it affect suppliers that are not large companies?",
            "Not directly, but large companies need origin and supply information from their suppliers to complete their assessments, so smaller suppliers can expect questions about where their materials come from.")]
    body = ('<article style="--c:#3ddc97"><p class="kicker"><i></i>Explainer · EU law · as of 30 October 2026</p><h1>Article 24 of the Critical Raw Materials Act</h1>'
            '<p class="lede">What the EU asks large manufacturers of strategic technologies to do about their raw-materials supply chains, who it applies to, and what is changing in 2026.</p>%s'
            '<section><h2>Sources</h2><ul class="plain"><li>Regulation (EU) 2024/1252 (Critical Raw Materials Act), in force since 23 May 2024</li><li>Legislative Observatory of the European Parliament: amendments to the Critical Raw Materials Act (2026)</li><li>Council of the EU working documents on Article 24 (2026)</li></ul>'
            '<p class="small">An explainer, not legal advice. Check the current text of the regulation and its amendments with your legal counsel.</p></section>%s'
            '<p class="open"><a class="cta" href="services.html">How a readiness review supports Article 24</a></p></article>') % (qa_section(qas), cite_box(title, path, today))
    desc = "What Article 24 of the EU Critical Raw Materials Act requires from large manufacturers, who it covers, and the 2026 amendments."
    return path, page(path, title, desc, body, [article_ld(path, title, desc, today, about="EU Critical Raw Materials Act"), faq_ld(path, qas)], today,
                      [("Atlas", ""), ("Library", "p/index.html"), ("CRMA Article 24", path)])


def china_controls_page(today):
    path = "p/china-export-controls.html"
    title = "China's export controls on critical minerals: a timeline, and what is paused until when"
    tl = [("Aug 2023", "Gallium and germanium need a Chinese export licence."), ("Sep 2024", "Antimony follows."),
          ("Dec 2024", "China bans exports of gallium, germanium and antimony to the United States."),
          ("Feb 2025", "Tungsten, tellurium, bismuth, molybdenum and indium need export licences."),
          ("Apr 2025", "Seven heavy rare earths, including dysprosium and terbium, need a licence for every export. This was never paused."),
          ("Oct 2025", "A wider package: more rare earths, rare-earth equipment and technology, lithium batteries and graphite anodes, superhard materials, and the 0.1% rule for foreign-made products."),
          ("Nov 2025", "China pauses most of the October 2025 package until 10 November 2026, and suspends the US ban on gallium, germanium and antimony until 27 November 2026."),
          ("Sep 2026", "The wider US–China trade truce is extended to 10 January 2027; the announcement does not mention the rare-earth pause."),
          ("9 Nov 2026", "China extends the pause on the October 2025 package by two months, from 11 November 2026 to 10 January 2027."),
          ("27 Nov 2026", "The suspension of the US ban on gallium, germanium and antimony is due to end."),
          ("10 Jan 2027", "The extended pause on the October 2025 package is due to end, on the same day as the wider US–China trade truce.")]
    qas = [("What is China's 0.1% rule?",
            "A rule announced in October 2025 under which products made anywhere in the world that contain at least 0.1% Chinese-origin rare earths by value would need a Chinese export licence. It is paused until 10 January 2027."),
           ("Which minerals need a Chinese export licence today?",
            "Among others gallium, germanium, antimony, tungsten and seven heavy rare earths including dysprosium and terbium. Licences are decided case by case, for every destination including Europe."),
           ("What happens on 10 January 2027?",
            "China's pause on its October 2025 rare-earth package is due to end. The pause was first set to run until 10 November 2026; on 9 November 2026 China extended it by two months. The wider US–China trade truce runs to the same date. Check OreOrbit's deadline calendar for the latest status.")]
    body = ('<article style="--c:#f5c45c"><p class="kicker"><i></i>Explainer · export controls · as of 10 November 2026</p><h1>China\'s export controls on critical minerals</h1>'
            '<p class="lede">Since 2023, China has put a growing list of critical minerals under export licensing. Here is the timeline, what is paused, and the dates to watch.</p>'
            '<section><h2>Timeline</h2><ul class="dates">%s</ul></section>%s'
            '<section><h2>Sources</h2><ul class="plain"><li>China Ministry of Commerce announcements, including No. 46 (2024), Nos. 55–58, 61, 62 and 70 (2025) and the extension announced on 9 November 2026</li><li>Reporting by Reuters, Bloomberg Government, Fastmarkets, CNBC and Shanghai Metals Market</li></ul>'
            '<p class="small">Export-control decisions change at short notice. This page is updated when they do; dates on the live atlas update automatically.</p></section>%s'
            '<p class="open"><a class="cta" href="../">See the deadlines on the live atlas</a></p></article>') % (
        "".join('<li><time>%s</time><span>%s</span></li>' % (e(d), e(t)) for d, t in tl), qa_section(qas), cite_box(title, path, today))
    desc = "A timeline of China's export controls on gallium, germanium, antimony, tungsten and rare earths, the 0.1% rule, and what is paused until January 2027."
    return path, page(path, title, desc, body, [article_ld(path, title, desc, today, about="China's export controls on critical minerals"), faq_ld(path, qas)], today,
                      [("Atlas", ""), ("Library", "p/index.html"), ("China's export controls", path)])


# What David Madali is an expert on, as linked entities (Wikidata, Wikipedia) so search engines and AI assistants
# can tie the person to the topics. Shared by the About and FAQ pages; the same list is in docs/wordpress/jsonld-sitewide.html,
# atlas/index.html and madali.cz.
KNOWS = [("Critical raw materials", "Q131286239", "Critical_raw_materials"), ("EU Critical Raw Materials Act", "Q133592766", "Critical_Raw_Materials_Act"),
         ("Defence industry", "Q392933", "Arms_industry"), ("Defence industrial base", "Q5251438", "Defense_industrial_base"),
         ("Supply-chain risk management", "Q1114469", "Supply_chain_risk_management"), ("Supply-chain resilience", "Q106087845", "Supply_chain_resilience"),
         ("Export controls", "Q96377540", "Export_control"), ("Economic security", "Q2497445", "Economic_security"),
         ("European strategic autonomy", "Q104535312", "Strategic_autonomy"), ("European Defence Industrial Strategy", "Q125101636", "European_Defence_Industrial_Strategy"),
         ("Geopolitics", "Q159385", "Geopolitics"), ("Rare earths", "Q190444", "Rare-earth_element"), ("Rare-earth magnets", "Q908880", "Neodymium_magnet"),
         ("Gallium", "Q861", "Gallium"), ("Germanium", "Q867", "Germanium"), ("Antimony", "Q1099", "Antimony"), ("Tungsten", "Q743", "Tungsten"),
         ("Titanium", "Q716", "Titanium"), ("Magnesium", "Q660", "Magnesium"), ("Manganese", "Q731", "Manganese"), ("Lithium", "Q568", "Lithium"),
         ("Cobalt", "Q740", "Cobalt"), ("Nickel", "Q744", "Nickel"), ("Graphite", "Q5309", "Graphite"), ("Space economy", "Q2729047", "Space_industry"),
         ("Satellite remote sensing", "Q199687", "Remote_sensing"), ("Open-source intelligence", "Q1059178", "Open-source_intelligence")]
KNOWS_TEXT = ["Critical minerals", "Critical-mineral supply chains", "European security", "Economic diplomacy"]   # no Wikidata item


def knows_ld():
    return [{"@type": "Thing", "name": n, "sameAs": ["https://www.wikidata.org/wiki/" + q, "https://en.wikipedia.org/wiki/" + w]} for n, q, w in KNOWS] + KNOWS_TEXT


def person_full(cs=False):
    """The full Person node (the short PERSON reference is on every page; this one on About and FAQ)."""
    return dict(PERSON, **{
        "givenName": "David", "familyName": "Madali",
        "jobTitle": "Analytik obranného průmyslu, kritických surovin a kosmické ekonomiky; zakladatel Bohemia Defense" if cs else
                    "Analyst of the defence industry, critical raw materials and the space economy; founder of Bohemia Defense",
        "description": "David Madali je pražský analytik obranného průmyslu, kritických surovin a kosmické ekonomiky, zakladatel Bohemia Defense a autor OreOrbit, otevřeného atlasu surovin, na kterých stojí evropská obrana." if cs else
                       "David Madali is a Prague-based analyst of the defence industry, critical raw materials and the space economy, founder of Bohemia Defense and creator of OreOrbit, an open atlas of the minerals behind Europe's defence.",
        "image": "https://bohemiadefense.com/atlas/img/david-madali-founder.jpg",
        "sameAs": ["https://www.linkedin.com/in/davidmadali/", "https://bohemiadefense.com/david-madali/", "https://bohemiadefense.com/david-madali-cz/"],
        "worksFor": {"@id": ORG["@id"]}, "homeLocation": {"@type": "Place", "name": "Prague, Czech Republic"}, "knowsLanguage": ["cs", "en"],
        "knowsAbout": knows_ld(),
        "subjectOf": {"@type": "NewsArticle", "url": BBC, "inLanguage": "zh-Hant", "datePublished": "2025-07",
                      "publisher": {"@type": "Organization", "name": "BBC News Chinese", "url": "https://www.bbc.com/zhongwen"}}})


def org_full(cs=False):
    return dict(ORG, **{
        "description": "Nezávislý analytický projekt o evropském obranném průmyslu, bezpečnosti a kritických surovinách, na kterých stojí; domov atlasu OreOrbit. Provozuje ho David Madali v Praze." if cs else
                       "An independent analysis project on Europe's defence industry, security and the critical raw materials they depend on, and home of the OreOrbit atlas. Run by David Madali in Prague.",
        "foundingDate": "2024-11", "foundingLocation": {"@type": "Place", "name": "Prague, Czech Republic"}, "founder": {"@id": PERSON["@id"]},
        "areaServed": "Europe", "knowsAbout": [n for n, _, _ in KNOWS[:12]]})


WHO_CS = {"China": "Čína", "Indonesia": "Indonésie", "DR Congo": "DR Kongo", "South Africa": "Jihoafrická republika", "Australia": "Austrálie", "Chile": "Chile"}
WHAT_CS = {"Sintered magnets": "výroby spékaných magnetů", "Titanium sponge": "výroby titanové houby", "Primary magnesium metal": "výroby primárního hořčíku",
           "Electrolytic manganese metal": "kapacit elektrolytického manganu", "Primary gallium": "výroby primárního galia", "Lithium chemicals": "výroby lithných chemikálií",
           "Refined cobalt": "rafinace kobaltu", "Battery-grade graphite": "výroby bateriového grafitu", "Separation and refining": "separace a rafinace"}
STAGE_CS_GEN = {"mine": "těžby", "refine": "rafinace", "part": "výroby součástek"}


def _tight(R, m, cs):
    """'China 79% of mining' / 'Čína 79 % těžby': the largest one-country share at the mineral's tightest stage."""
    w = R.get("worst") or {}
    x = w.get("x") or {}
    if not isinstance(x.get("pct"), (int, float)):
        return "Čína vede v rafinaci" if cs else "China leads refining"
    pct = x.get("txt") or pct_txt(x)
    if cs:
        what = WHAT_CS.get(x.get("what")) or STAGE_CS_GEN.get(w.get("k"), "jedné fáze")
        return "%s %s %s" % (WHO_CS.get(x.get("who"), x.get("who")), pct.replace("%", " %"), what)
    what = x.get("what") or STAGE_NAME.get(w.get("k"), "one stage")
    return "%s %s of %s" % (x.get("who"), pct, what[0].lower() + what[1:])


def _upcoming(ref, today, cs, n=5):
    seen, out = set(), []
    for m in ref["order"]:
        for d in (ref["materials"].get(m) or {}).get("deadlines") or []:
            if not isinstance(d, dict) or d.get("id") in seen or str(d.get("date", "")) < today:
                continue
            seen.add(d.get("id"))
            out.append((str(d["date"])[:10], str(d.get("id") or ""), (d.get("title_cs") if cs else None) or d.get("title") or ""))
    out.sort()                                                               # by date, then id: the same items in English and Czech
    return [(day_cs(a) if cs else day(a), t) for a, _, t in out[:n] if t]


def faq_qas(ref, live, cfg, today, cs=False):
    """Questions and answers on Europe's critical-mineral dependencies, OreOrbit, Bohemia Defense and David Madali.
    Every figure is computed from reference.json and the live trade data, so the answers stay true as the data move.
    Returns [(anchor, question, answer, [(link text, href)])]; the answer text is the same on the page and in FAQPage."""
    c = counts(ref)
    mats = ref["materials"]
    nm = (lambda m: MAT_CS.get(m, m).lower()) if cs else (lambda m: ((mats[m].get("info") or {}).get("name") or m).lower())
    conc = [m for m in ref["order"] if isinstance(((mats[m].get("worst") or {}).get("x") or {}).get("pct"), (int, float)) and mats[m]["worst"]["x"]["pct"] > 65]
    none = [m for m in ref["order"] if not (mats[m].get("worst") or {}).get("x")]
    T = lambda m: _tight(mats[m], m, cs)
    allm = ", ".join(nm(m) for m in ref["order"][:-1]) + (" a " if cs else " and ") + nm(ref["order"][-1])
    tight = "; ".join("%s (%s)" % (nm(m), T(m)) for m in conc)
    ser = dependency_series(live.get("trade")) if live else []
    last = ser[-1] if ser else None
    up = _upcoming(ref, today, cs)
    cz = [s for s in ref["sites"] if s.get("country") == "Czechia"]
    price = str(cfg.get("monitoringPrice") or "49").strip()
    nsite, nroute = c["sites"], c["routes"]
    q = []
    if cs:
        n_min, n_conc, n_cn = w_cs(c["minerals"], gen=True), w_cs(len(conc), gen=True), w_cs(c["china65"], gen=True)
        q.append(("zavislosti", "Jaké jsou kritické závislosti evropského obranného průmyslu?",
                  "Evropský obranný průmysl stojí na %s kritických surovinách, které OreOrbit sleduje: %s. U %s z %s drží jedna země víc než 65 %% alespoň jedné fáze světové produkce. To je stejná hranice, kterou nařízení EU o kritických surovinách stanoví pro rok 2030 jako strop závislosti na jedné zemi. Samotná Čína drží víc než 65 %% alespoň jedné fáze u %s z %s. Nejužší místa: %s.%s Podíly podle USGS Mineral Commodity Summaries 2026 a IEA Global Critical Minerals Outlook 2026, zpracoval OreOrbit." % (
                      n_min, allm, n_conc, n_min, n_cn, n_min, tight,
                      "".join(" U suroviny %s chybí veřejný světový údaj o rafinaci; vede Čína." % nm(m) for m in none)),
                  [("Index závislosti OreOrbit", "dependency-index-cs.html")]))
        q.append(("munice", "Na jakých surovinách závisí evropská výroba munice, raket a vojenské elektroniky?",
                  "Munice a pancéřování: wolfram pro průbojná jádra (%s), antimon pro zápalky a svítící střely (%s), mangan pro pancéřovou a dělostřeleckou ocel (%s) a hořčík pro infračervené klamné cíle a výrobu titanu (%s). Rakety a letadla: magnety ze vzácných zemin pro kormidla a akční členy navádění (%s), titan pro draky a motory (%s) a superslitiny kobaltu a niklu pro proudové motory (%s; %s). Senzory a elektronika: čipy z nitridu galia pro radary a elektronický boj (%s) a germaniová infračervená optika pro termovize a hlavice raket (%s). Baterie pro drony, vozidla a vojáky: lithium (%s) a grafitové anody (%s). V závorce je největší podíl jedné země v nejužší fázi dodávek." % (
                      T("w"), T("sb"), T("mn"), T("mg"), T("ree"), T("ti"), T("co"), T("ni"), T("ga"), T("ge"), T("li"), T("gr")), []))
        q.append(("monitoring", "Jak OreOrbit monitoruje úzká hrdla dodavatelských řetězců?",
                  "OreOrbit sleduje %d dolů, rafinerií a továren na magnety a %s, po kterých se %s surovin dostává do Evropy. Každou lokalitu fotografují satelity každý týden: snímky Copernicus Sentinel-2, radar Sentinel-1, který vidí i přes mraky, a tepelné mapy Landsat. Každé tři hodiny automatická aktualizace kontroluje teplo v závodech, lodě v úžinách, zemětřesení a výstrahy před katastrofami u lokalit a ozbrojené konflikty u dodavatelského řetězce. Jednou měsíčně čte statistiky dovozu do EU (Eurostat Comext) pro každou surovinu a vede datovaný kalendář vývozních kontrol a regulačních termínů. Změna, například závod, který přestane hřát, nový termín nebo skok podílu Číny na dovozu, se objeví v atlasu a v pondělním přehledu; klienti monitoringu ji dostanou týž den." % (
                      nsite, "%s obchodních tras" % w_cs(nroute), w_cs(c["minerals"]),), [("Otevřít atlas", "../?lang=cs"), ("O projektu", "about-cs.html")]))
        q.append(("uzka-mista", "Kde jsou úzká místa dopravy kritických surovin do Evropy?",
                  "Velká část těchto surovin se rafinuje v Číně a do Evropy pluje Malackým průlivem a pak Suezským průplavem a Bab al-Mandabem, což je nejkratší cesta, nebo kolem mysu Dobré naděje, když není Rudé moře bezpečné. Po začátku útoků na lodě klesl provoz v Suezském průplavu za dva měsíce o 42 %% (UNCTAD, leden 2024). Suroviny pro rafinace putují nejdřív opačně: konžský kobalt, jihoafrická a gabonská manganová ruda a indonéský nikl míří do čínských rafinerií, většina z nich Malackým průlivem. Hlavní alternativou podporovanou Západem je Lobitský koridor, 1 300 km dlouhá železnice z měděného pásu Konga a Zambie do angolského přístavu Lobito. OreOrbit sleduje %s a lodě v každé úžině." % (
                      "%s obchodních tras" % w_cs(nroute),), [("Otevřít atlas", "../?lang=cs")]))
        q.append(("crma", "Co požaduje nařízení EU o kritických surovinách (CRMA) a jaké má cíle pro rok 2030?",
                  "Nařízení (EU) 2024/1252 platí od 23. května 2024 a uvádí 34 kritických surovin, z toho 17 strategických. Do roku 2030 má EU těžit alespoň 10 %, zpracovávat alespoň 40 % a recyklovat alespoň 25 % své roční spotřeby strategických surovin a žádnou strategickou surovinu nemá v žádné fázi zpracování odebírat z víc než 65 % od jedné třetí země. Všechny suroviny OreOrbit kromě antimonu jsou na seznamu strategických surovin (v jakostech, které nařízení uvádí, například lithium pro baterie nebo vzácné zeminy pro magnety); antimon je kritický. Článek 24 ukládá velkým výrobcům strategických technologií alespoň jednou za tři roky posoudit rizika svého dodavatelského řetězce surovin. EU vybrala prvních 47 strategických projektů 25. března 2025, 13 projektů mimo EU 4. června 2025 a dalších 46 strategických projektů ve druhé výzvě 9. října 2026.", [("Článek 24 (anglicky)", "crma-article-24.html")]))
        cn = "Čína od roku 2023 vyžaduje vývozní licence na galium a germanium (srpen 2023), antimon (září 2024), wolfram a čtyři další kovy (únor 2025) a sedm těžkých vzácných zemin včetně dysprosia a terbia (duben 2025, nikdy nepozastaveno). Širší balík z října 2025 (další vzácné zeminy, zařízení a technologie pro jejich zpracování, lithiové baterie, grafitové anody a pravidlo 0,1 % pro výrobky vyrobené mimo Čínu) Čína v listopadu 2025 pozastavila a 9. listopadu 2026 pauzu prodloužila do 10. ledna 2027. O licencích se rozhoduje případ od případu, i pro evropské odběratele."
        if up:
            cn += " Nejbližší termíny v kalendáři OreOrbit: " + "; ".join("%s: %s" % (a, t) for a, t in up) + "."
        q.append(("cina", "Které čínské vývozní kontroly dopadají na Evropu a co je pozastaveno?", cn, [("Časová osa (anglicky)", "china-export-controls.html")]))
        if last:
            mi = int(last["month"][5:7]) - 1
            q.append(("index", "Co je Index závislosti OreOrbit?",
                      "Index závislosti OreOrbit je měsíční podíl Číny na hodnotě dovozu deseti surovin indexu do EU ze zemí mimo EU (vzácné zeminy, titan, wolfram, antimon, galium, germanium, lithium, kobalt, nikl a grafit), každá surovina má stejnou váhu. Počítá se z dat Eurostat Comext. V %s %s byl %d %%. Hořčík a mangan OreOrbit sleduje zvlášť." % (
                          MONTH_CS_LOC[mi], last["month"][:4], round(last["value"] * 100)), [("Index závislosti", "dependency-index-cs.html")]))
        if cz:
            czs = {"cinovec": "Cínovec v Krušných horách (lithium; Geomet, skupina ČEZ 51 %, European Metals 49 %) je popisován jako největší evropské ložisko lithia, v březnu 2025 se stal strategickým projektem EU a má ročně vyrábět asi 37 500 t ekvivalentu uhličitanu lithného pro baterie se zpracováním v Prunéřově",
                   "chvaletice-mn": "Chvaletice (mangan; Euro Manganese) chtějí vyrábět bateriový mangan ze starých odkališť, jsou strategickým projektem EU a studie proveditelnosti má být hotová v první polovině roku 2027"}
            parts = [czs.get(s["id"]) or "%s (%s)" % (s.get("name"), nm(s.get("m"))) for s in cz]
            q.append(("cesko", "Jakou roli má Česko v evropských kritických surovinách?",
                      "Z %d lokalit, které OreOrbit sleduje, jsou v Česku tyto: %s. Surovinovou politiku státu má na starosti Ministerstvo průmyslu a obchodu (MPO). Čeští výrobci munice, obrněných vozidel, radarů a optiky závisí na stejných surovinách jako zbytek evropského obranného průmyslu, hlavně na wolframu, antimonu, manganové oceli, galiu a germaniu." % (
                          nsite, "; ".join(parts)), [(s.get("name"), s["id"] + ".html") for s in cz]))
        q.append(("posouzeni", "Jak může výrobce posoudit svou expozici, například kvůli článku 24?",
                  "Prvním krokem je bezplatná rychlá kontrola v atlasu: zvolíte typ výrobku a za minutu uvidíte, na kterých surovinách závisí a kde jsou rizika. Monitoring za %s € měsíčně hlídá vámi zvolené suroviny, jejich lokality a termíny, posílá upozornění týž den, osobní pondělní vydání s datovým souborem a jednou měsíčně odpoví na vaši otázku člověk do dvou pracovních dnů. Posouzení připravenosti jedné výrobní řady pro vedení firmy (registr dílů s kritickými surovinami, zátěžové testy proti skutečným vývozním kontrolám a podklad pro článek 24) je na míru: rozsah a cenu domluvíme na úvodním 30minutovém hovoru zdarma." % price,
                  [("Služby", "services-cs.html"), ("Rychlá kontrola", "../?lang=cs#check")]))
        q.append(("david-madali", "Kdo je David Madali?",
                  "David Madali je pražský analytik obranného průmyslu, kritických surovin a kosmické ekonomiky. V roce 2024 založil Bohemia Defense a v roce 2026 vytvořil OreOrbit. Jako analytika ho v červenci 2025 citovala čínská služba BBC News. Má zkušenosti z ekonomie, ekonomické diplomacie na Ministerstvu zahraničních věcí ČR a exportního poradenství v CzechTrade, kde založil klastr 12 firem z bezpečnostního průmyslu. Osobní stránka je madali.cz.",
                  [("madali.cz", "https://madali.cz/cs/"), ("LinkedIn", "https://www.linkedin.com/in/davidmadali/")]))
        q.append(("bohemia-defense", "Co je Bohemia Defense?",
                  "Bohemia Defense je nezávislý analytický projekt o evropském obranném průmyslu, bezpečnosti a zahraniční politice, který v listopadu 2024 v Praze založil David Madali. Publikuje případové studie o NATO, Ukrajině, Africe, evropském obranném průmyslu a kritických surovinách, provozuje atlas OreOrbit a nabízí výrobcům obranné a kosmické techniky posouzení rizik dodavatelského řetězce. Bohemia Defense je značka, ne společnost; provozovatelem je David Madali, fyzická osoba podnikající, IČO 22229957.",
                  [("bohemiadefense.com", "https://bohemiadefense.com/cs/")]))
        q.append(("data", "Jak často se data obnovují a jak je citovat?",
                  "Automatická aktualizace sbírá data každé tři hodiny, satelitní snímky každý týden, dovozní statistiky každý měsíc a stránky knihovny se přestavují každý den. Každý údaj má u sebe zdroj a datum. Údaje a grafy lze citovat s uvedením „OreOrbit (Bohemia Defense)“ a odkazem; každá stránka knihovny má vlastní citaci.", [("Právní informace a zdroje (anglicky)", "legal.html")]))
        return q
    n_min, n_conc, n_cn = w_en(c["minerals"]), w_en(len(conc)), w_en(c["china65"])
    q.append(("dependencies", "What are the critical dependencies of Europe's defence industry?",
              "Europe's defence industry depends on %s critical raw materials that OreOrbit tracks: %s. For %s of the %s, one country holds more than 65%% of at least one stage of world supply. That is the same threshold the EU Critical Raw Materials Act sets as its 2030 ceiling for reliance on a single country. China alone holds more than 65%% of at least one stage for %s of the %s. The tightest stages are: %s.%s Shares from the USGS Mineral Commodity Summaries 2026 and the IEA Global Critical Minerals Outlook 2026, compiled by OreOrbit." % (
                  n_min, allm, n_conc, n_min, n_cn, n_min, tight,
                  "".join(" %s has no published world total for refining; China leads." % nm(m).capitalize() for m in none)),
              [("OreOrbit Dependency Index", "dependency-index.html"), ("The library", "index.html")]))
    q.append(("ammunition", "Which minerals do European ammunition, missiles and military electronics depend on?",
              "Ammunition and armour: tungsten for armour-piercing penetrators (%s), antimony for primers and tracers (%s), manganese for armour and shell steel (%s), and magnesium for infrared decoy flares and for making titanium (%s). Missiles and aircraft: rare-earth magnets for fins and guidance actuators (%s), titanium for airframes and engines (%s), and cobalt and nickel superalloys for jet engines (%s; %s). Sensors and electronics: gallium nitride chips for radar and electronic warfare (%s) and germanium infrared optics for thermal sights and missile seekers (%s). Batteries for drones, vehicles and soldiers: lithium (%s) and graphite anodes (%s). Figures in brackets are the largest single-country share at the tightest stage of supply." % (
                  T("w"), T("sb"), T("mn"), T("mg"), T("ree"), T("ti"), T("co"), T("ni"), T("ga"), T("ge"), T("li"), T("gr")),
              [("Tungsten", "tungsten.html"), ("Antimony", "antimony.html"), ("Gallium", "gallium.html")]))
    q.append(("monitoring", "How does OreOrbit monitor supply-chain bottlenecks?",
              "OreOrbit watches %d mines, refineries and magnet plants and the %s that carry the %s minerals towards Europe. Every site is photographed by satellite every week: Copernicus Sentinel-2 pictures, Sentinel-1 radar that sees through cloud, and Landsat heat maps. Every three hours an automatic updater checks heat at the plants, ships at the chokepoints, earthquakes and disaster alerts near the sites, and armed conflict near the supply chain. Every month it reads EU import statistics (Eurostat Comext) for each mineral, and it keeps a dated calendar of export-control and policy deadlines. A change, such as a plant going quiet, a new deadline or a jump in China's share of imports, shows on the atlas and in the Monday brief; monitoring clients hear about it the same day." % (
                  nsite, "%s trade routes" % w_en(nroute), w_en(c["minerals"])), [("Open the atlas", "../"), ("About OreOrbit", "about.html")]))
    q.append(("chokepoints", "Where are the chokepoints in Europe's critical-mineral supply?",
              "Much of the supply is refined in China and shipped to Europe through the Strait of Malacca and then the Suez Canal and Bab-el-Mandeb, the shortest route, or around the Cape of Good Hope when the Red Sea is unsafe. Suez Canal transits fell 42%% in two months after attacks on shipping began (UNCTAD, January 2024). Raw materials travel the other way first: Congolese cobalt, South African and Gabonese manganese ore and Indonesian nickel go to Chinese refineries, most of them through the Strait of Malacca. The Lobito Corridor, a 1,300 km railway from the Congolese and Zambian copperbelt to Angola's Atlantic port of Lobito, is the main Western-backed alternative. OreOrbit tracks %s and the ships at each chokepoint." % (
                  "%s trade routes" % w_en(nroute)), [("Open the atlas", "../")]))
    q.append(("crma", "What does the EU Critical Raw Materials Act require, and what are its 2030 benchmarks?",
              "Regulation (EU) 2024/1252 has been in force since 23 May 2024. It lists 34 critical raw materials, 17 of them strategic. By 2030 the EU should extract at least 10%, process at least 40% and recycle at least 25% of its annual consumption of strategic raw materials, and rely on a single third country for no more than 65% of any strategic raw material at any stage of processing. All of OreOrbit's minerals except antimony are on the strategic list (in the grades it names, such as battery-grade lithium and rare earths for magnets); antimony is critical. Article 24 asks large manufacturers of strategic technologies to assess the risks in their raw-material supply chains at least every three years. The EU selected its first 47 strategic projects on 25 March 2025, 13 projects outside the EU on 4 June 2025 and 46 more strategic projects in a second call on 9 October 2026.",
              [("Article 24 explained", "crma-article-24.html")]))
    cn = "Since 2023 China has required export licences for gallium and germanium (August 2023), antimony (September 2024), tungsten and four other metals (February 2025) and seven heavy rare earths including dysprosium and terbium (April 2025, never paused). Its wider October 2025 package (more rare earths, rare-earth equipment and technology, lithium batteries, graphite anodes and the 0.1% rule for products made outside China) was paused in November 2025; on 9 November 2026 China extended the pause to 10 January 2027. Licences are decided case by case, including for European buyers."
    if up:
        cn += " Next dates on OreOrbit's calendar: " + "; ".join("%s: %s" % (a, t) for a, t in up) + "."
    q.append(("china", "Which Chinese export controls affect Europe, and what is paused?", cn, [("China's export controls: timeline", "china-export-controls.html")]))
    if last:
        q.append(("index", "What is the OreOrbit Dependency Index?",
                  "The OreOrbit Dependency Index is China's monthly share of the value of the EU's imports from outside the EU of the ten index minerals (rare earths, titanium, tungsten, antimony, gallium, germanium, lithium, cobalt, nickel and graphite), each mineral weighted equally, from Eurostat Comext data. In %s it was %d%%. Magnesium and manganese are tracked separately." % (
                      month_txt(last["month"]), round(last["value"] * 100)), [("Dependency Index", "dependency-index.html")]))
    if cz:
        low1 = lambda t: t[0].lower() + t[1:] if len(t) > 1 and t[1].islower() else t
        parts = ["%s (%s, operated by %s): %s" % (s.get("name"), nm(s.get("m")), (s.get("operator") or "not published").replace(" (", ", ").replace(")", ""),
                                                  "; ".join(low1(f) for f in s.get("facts") or [])) for s in cz]
        q.append(("czechia", "What is the Czech Republic's role in Europe's critical raw materials?",
                  "Of the %d sites OreOrbit watches, these are in Czechia: %s. The Czech Ministry of Industry and Trade (MPO) is responsible for the country's raw-materials policy. Czech makers of ammunition, armoured vehicles, radar and optics depend on the same minerals as the rest of Europe's defence industry, above all tungsten, antimony, manganese steel, gallium and germanium." % (
                      nsite, ". ".join(parts)), [(s.get("name"), s["id"] + ".html") for s in cz]))
    q.append(("exposure", "How can a manufacturer check its exposure, for example for Article 24?",
              "Start with the free quick check on the atlas: choose a product type and see in a minute which minerals it depends on and where the risks are. Monitoring (€%s a month) watches the minerals you choose, their sites and deadlines, and sends same-day alerts, a personal Monday edition with a data file, and one question a month answered by a person within two working days. A readiness review of one product line for your board (a register of every part with a critical raw material, stress tests against real export controls, and documentation for Article 24) is tailored: scope and price are agreed in a free 30-minute intro call." % price,
              [("Services", "services.html"), ("Quick check", "../#check")]))
    q.append(("david-madali", "Who is David Madali?",
              "David Madali is a Prague-based analyst of the defence industry, critical raw materials and the space economy. He founded Bohemia Defense in 2024 and built OreOrbit in 2026. BBC News Chinese quoted him as an analyst in July 2025. His background is in economics, economic diplomacy at the Czech Ministry of Foreign Affairs and export consulting at CzechTrade, where he set up a cluster of 12 security-industry companies. His personal site is madali.cz.",
              [("madali.cz", "https://madali.cz/"), ("LinkedIn", "https://www.linkedin.com/in/davidmadali/")]))
    q.append(("bohemia-defense", "What is Bohemia Defense?",
              "Bohemia Defense is an independent analysis project on Europe's defence industry, security and foreign policy, founded in Prague in November 2024 by David Madali. It publishes case studies on NATO, Ukraine, Africa, the European defence industry and critical raw materials, runs the OreOrbit atlas, and offers supply-chain risk reviews to defence and space manufacturers. Bohemia Defense is a brand, not a company; it is operated by David Madali as a sole trader, IČO 22229957.",
              [("bohemiadefense.com", "https://bohemiadefense.com/")]))
    q.append(("data", "How often is the data updated, and how should it be cited?",
              "An automatic updater collects data every three hours, satellite pictures every week and import statistics every month, and the library pages are rebuilt every day. Every figure carries its source and date. Figures and charts may be quoted with credit to “OreOrbit (Bohemia Defense)” and a link; every library page has its own citation.", [("Legal page and sources", "legal.html")]))
    return q


def _faq_body(qs, cs, title, lede, kicker):
    toc = "".join('<li><a href="#%s">%s</a></li>' % (a, e(qq)) for a, qq, _, _ in qs)
    secs = "".join('<section class="faq" id="%s" style="scroll-margin-top:76px"><h2>%s</h2><p>%s</p>%s</section>' % (
        a, e(qq), e(aa), ('<p class="small">%s</p>' % " · ".join('<a href="%s">%s</a>' % (e(h), e(t)) for t, h in links)) if links else "")
        for a, qq, aa, links in qs)
    return ('<article style="--c:#3ddc97"><p class="kicker"><i></i>%s</p><h1>%s</h1><p class="lede">%s</p>'
            '<nav aria-label="%s"><ul class="plain">%s</ul></nav>%s') % (e(kicker), e(title), e(lede), "Otázky" if cs else "Questions", toc, secs)


def faq_page(ref, live, cfg, today):
    path = "p/faq.html"
    title = "Critical raw materials and Europe's defence: questions and answers"
    desc = "Europe's critical-mineral dependencies, the chokepoints, the EU Critical Raw Materials Act, China's export controls, and how OreOrbit monitors the supply chain, answered with current data."
    qs = faq_qas(ref, live, cfg, today)
    body = _faq_body(qs, False, title, "Plain answers on the minerals behind Europe's defence, written for buyers, analysts and journalists. The figures are computed from OreOrbit's data and update every day.",
                     "Questions and answers · as of %s" % day(today)) + cite_box(title, path, today) + '<p class="open"><a class="cta" href="../">Open the live atlas</a></p></article>'
    qa = [(qq, aa) for _, qq, aa, _ in qs]
    ld = [article_ld(path, title, desc, today, about="Critical raw materials for Europe's defence industry"), faq_ld(path, qa), person_full(), org_full()]
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("Library", "p/index.html"), ("Questions and answers", path)], alt="p/faq-cs.html")


def faq_page_cs(ref, live, cfg, today):
    path = "p/faq-cs.html"
    title = "Kritické suroviny a evropská obrana: otázky a odpovědi"
    desc = "Na čem závisí evropský obranný průmysl, kde jsou úzká místa, co požaduje nařízení EU o kritických surovinách, čínské vývozní kontroly a jak OreOrbit hlídá dodavatelský řetězec, s aktuálními daty."
    qs = faq_qas(ref, live, cfg, today, cs=True)
    body = _faq_body(qs, True, title, "Věcné odpovědi o surovinách, na kterých stojí evropská obrana, pro nákupčí, analytiky a novináře. Čísla se počítají z dat OreOrbit a obnovují se každý den.",
                     "Otázky a odpovědi · data k %s" % day_cs(today)) + cite_box_cs(title, path, today) + '<p class="open"><a class="cta" href="../?lang=cs">Otevřít živý atlas</a></p></article>'
    qa = [(qq, aa) for _, qq, aa, _ in qs]
    art = dict(article_ld(path, title, desc, today, about="Kritické suroviny pro evropský obranný průmysl"), inLanguage="cs")
    fq = dict(faq_ld(path, qa), inLanguage="cs")
    return path, page(path, title, desc, body, [art, fq, person_full(cs=True), org_full(cs=True)], today,
                      [("Atlas", ""), ("Knihovna", "p/index.html"), ("Otázky a odpovědi", path)], lang="cs", alt="p/faq.html")


def sitemap(paths, today):
    urls = [BASE] + [BASE + p for p in paths]
    return ('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + "".join("<url><loc>%s</loc><lastmod>%s</lastmod></url>\n" % (e(u), today) for u in urls) + "</urlset>\n")


def _nb_cs(html):
    """Czech typography: no single-letter word (v, k, s, z, a, i, o, u) left at the end of a line. Text only, never tags or scripts."""
    out, pos = [], 0
    for m in re.finditer(r'(<script\b.*?</script>|<style\b.*?</style>|<[^>]+>)', html, re.S | re.I):
        seg = html[pos:m.start()]
        for _ in range(2): seg = re.sub(r'(^|[\s\u00a0(„“])([vkszaiouVKSZAIOU]) +(?=\S)', '\\1\\2\u00a0', seg)   # twice: "a v", "a z"
        out.append(seg); out.append(m.group(0)); pos = m.end()
    seg = html[pos:]
    for _ in range(2): seg = re.sub(r'(^|[\s\u00a0(„“])([vkszaiouVKSZAIOU]) +(?=\S)', '\\1\\2\u00a0', seg)
    out.append(seg)
    return "".join(out)


def build(ref, live, cfg, today):
    """Returns {path: text} for every page and the sitemap."""
    out = {}
    for m in ref["order"]:
        p, h = material_page(m, ref, live, today)
        out[p] = h
    for s in ref["sites"]:
        if not re.match(r"^[a-z0-9-]{1,60}$", s.get("id", "")):
            continue
        p, h = site_page(s, ref, live, today)
        out[p] = h
    for fn in (lambda: index_page(ref, today), lambda: dependency_page(ref, live, today), lambda: dependency_page_cs(ref, live, today), lambda: services_page_cs(cfg, today), lambda: about_page_cs(ref, cfg, today), lambda: services_page(cfg, today), lambda: about_page(ref, cfg, today), lambda: legal_page(cfg, today)):
        p, h = fn()
        out[p] = h
    out.update(brief_pages(live, today))
    snaps, ser = index_snapshots(ref, live, today)
    out.update(snaps)
    if ser and "p/dependency-index.html" in out:
        months = " · ".join('<a href="dependency-index-%s.html">%s: %d%%</a>' % (x["month"], e(month_txt(x["month"])), round(x["value"] * 100)) for x in reversed(ser))
        out["p/dependency-index.html"] = out["p/dependency-index.html"].replace('<aside class="cite"', '<section><h2>Every month</h2><p class="monthnav">%s</p></section><aside class="cite"' % months, 1)
    for fn in (lambda: space_page(ref, live, today), lambda: crma_page(today), lambda: china_controls_page(today), lambda: faq_page(ref, live, cfg, today), lambda: faq_page_cs(ref, live, cfg, today)):
        try:
            pth, html = fn()
            out[pth] = html
        except Exception as ex:
            print("page failed:", ex)
    if "p/index.html" in out:
        guides = ('<section class="guides"><h2>Guides and archives</h2><ul class="lib">'
                  '<li><a href="faq.html">Questions and answers</a><span>Europe\'s dependencies, chokepoints, the CRMA and China\'s controls, with current data (<a href="faq-cs.html" hreflang="cs" lang="cs">česky</a>)</span></li>'
                  '<li><a href="space.html">Critical minerals for the space industry</a><span>Satellites, launchers and the minerals they need</span></li>'
                  '<li><a href="crma-article-24.html">Article 24 of the Critical Raw Materials Act</a><span>What large manufacturers must do, and the 2026 changes</span></li>'
                  '<li><a href="china-export-controls.html">China\'s export controls on critical minerals</a><span>Timeline, the 0.1% rule and what is paused until January 2027</span></li>'
                  '<li><a href="briefs.html">Weekly briefs</a><span>Every Monday, the week in data</span></li>'
                  '<li><a href="dependency-index.html">OreOrbit Dependency Index</a><span>The monthly number, with every month on its own page</span></li></ul></section>')
        out["p/index.html"] = out["p/index.html"].replace('<ul class="lib">', guides + '<h2>Materials and sites</h2><ul class="lib">', 1)
    price = str(cfg.get("monitoringPrice") or "49").strip()
    for k in ("p/services.html", "p/services-cs.html", "p/about.html", "p/about-cs.html"):
        if k in out:
            h = out[k].replace("€390 / month", "€%s / month" % price).replace("390 € měsíčně", "%s € měsíčně" % price)
            h = h.replace('"price": "390"', '"price": "%s"' % price).replace('"price": 390', '"price": %s' % price)
            h = h.replace("Monitoring starts with your email on the atlas; David replies within one working day with a sample alert for your minerals.", "Monitoring starts on the atlas: choose your minerals, pay by card, and it runs from the same day. Cancel anytime. Not seeing the value? Ask within the first month and we refund you in full.")
            h = h.replace("Monitoring začíná e-mailem v atlasu; David se do jednoho pracovního dne ozve s ukázkovým upozorněním pro vaše suroviny.", "Monitoring spustíte v atlasu: zvolíte suroviny, zaplatíte kartou a běží ještě týž den. Zrušit ho můžete kdykoli. Nevidíte přínos? Během prvního měsíce vám na požádání vrátíme peníze.")
            out[k] = h
    czk = str(cfg.get("monitoringPriceCzk") or "1 200").strip()
    for k in list(out):
        if k.endswith("-cs.html"):
            h = out[k].replace("%s € měsíčně" % price, "%s € měsíčně (asi %s Kč)" % (price, czk)) if czk else out[k]
            out[k] = _nb_cs(h)
    ep, eh = embed_page(live, today)
    if eh:
        out[ep] = eh
    out["sitemap.xml"] = sitemap(sorted(k for k in out.keys() if k not in ("p/embed-index.html",)), today)
    return out
