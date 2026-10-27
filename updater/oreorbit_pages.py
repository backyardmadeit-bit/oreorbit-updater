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
        "li": "lithium", "co": "cobalt", "ni": "nickel", "gr": "graphite"}
COL = {"ree": "#a78bfa", "ti": "#fb923c", "w": "#facc15", "sb": "#a9b8cc", "ga": "#22d3ee", "ge": "#4ade80",
       "li": "#f472b6", "co": "#60a5fa", "ni": "#a3e635", "gr": "#e4e4e7"}
STAGE_NAME = {"mine": "Mining", "refine": "Refining", "part": "Component"}
SITE_STAGE = {"Mine": "mine", "Processing": "processing plant", "Magnets": "magnet factory", "Planned": "planned project"}
MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
BBC = "https://www.bbc.com/zhongwen/articles/cy8gjpe7xp8o/trad"


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
        PERSON, ORG, ATLAS] + ld_extra}
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
    foot = ('<p>OreOrbit vytváří a provozuje <a href="https://madali.cz/cs/">David Madali</a> v <a href="https://bohemiadefense.com/cs/">Bohemia Defense</a> v Praze. Veřejná data, automaticky obnovovaná každý den. Data k %s.</p>\n  <p><a href="services-cs.html">Služby</a> <a href="about-cs.html">O projektu</a> <a href="legal.html">Právní informace a licence (anglicky)</a> <a href="https://madali.cz/cs/">madali.cz</a> <a href="https://www.linkedin.com/in/davidmadali/">LinkedIn</a></p>\n  <p>David Madali · Bohemia Defense · IČO 22229957 · Na Spravedlnosti 2919/2, 530 02 Pardubice</p>' % e(day_cs(today))) if cs else None
    return """<!doctype html>
<html lang="%(lang)s">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>%(title)s · OreOrbit</title>
<meta name="description" content="%(desc)s">
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
<meta property="og:image" content="https://bohemiadefense.com/atlas/img/og-oreorbit.png">
<meta property="og:site_name" content="OreOrbit">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">%(ld)s</script>
</head>
<body>
<header class="bar">
  <a class="brand" href="../"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="12" cy="12" rx="11" ry="3.6" fill="none" stroke="currentColor" stroke-width="1.2" transform="rotate(-24 12 12)"/></svg>OreOrbit</a>
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
""" % {"title": e(title), "desc": e(desc), "url": e(url), "ld": json.dumps(ld, ensure_ascii=False).replace("</", "<\\/"),
       "crumbs": crumb_html, "body": body, "today_txt": e(day(today)), "lang": lang, "alt": alt_head, "nav": nav, "by": "od" if cs else "by", "bdpath": "cs/" if cs else "",
       "foot": foot or ('<p>OreOrbit is built and run by <a href="https://madali.cz/">David Madali</a> at <a href="https://bohemiadefense.com/">Bohemia Defense</a>, Prague. Public data, updated automatically every day. Data as of %s.</p>\n  <p><a href="services.html">Services</a> <a href="about.html">About</a> <a href="legal.html">Imprint, privacy and data licences</a> <a href="https://madali.cz/">madali.cz</a> <a href="https://www.linkedin.com/in/davidmadali/">LinkedIn</a></p>\n  <p>David Madali · Bohemia Defense · IČO 22229957 · Na Spravedlnosti 2919/2, 530 02 Pardubice</p>' % e(day(today)))}


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
    return "".join(out), (share, "%s %d" % (MONTH[mm % 12], y0 + mm // 12), ext[-1])


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
    title = "%s: who makes it, and what it means for Europe's defence" % name
    desc = ("%s %s" % (lede_fact, info.get("uses") or "")).strip()[:300]
    figs = []
    if wx:
        figs.append((pct_txt(wx), "of %s is in %s" % ((wx.get("what") or STAGE_NAME.get(worst.get("k"), "")).lower(), wx.get("who", ""))))
    if t_meta and t_meta[0] is not None:
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
        body.append('<section><h2>Recent news</h2><ul class="news">%s</ul><p class="small">Stories marked “found automatically” come from the GDELT news database and were not checked; open the source before quoting.</p></section>' % "".join(
            '<li><a href="%s" rel="noopener">%s</a><span>%s, %s · %s</span></li>' % (e(x.get("url")), e(x.get("title")), e(x.get("source")), e(day(x.get("date"))),
                                                                              "found automatically" if x.get("auto") else "checked against the source") for x in news))
    body.append(cite_box(title, path, today))
    body.append('<p class="open"><a class="cta" href="../">See %s on the live atlas</a></p></article>' % e(name.lower()))
    ld = [{"@type": "Article", "@id": BASE + path + "#article", "headline": title, "description": desc, "dateModified": today, "inLanguage": "en",
           "author": {"@id": PERSON["@id"]}, "publisher": {"@id": ORG["@id"]}, "mainEntityOfPage": BASE + path,
           "about": {"@type": "Thing", "name": name}, "isAccessibleForFree": True}]
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
    title = "The OreOrbit library: ten critical minerals and 31 sites"
    desc = "Readable, citable pages on the ten critical raw materials behind Europe's defence and the 31 mines and plants OreOrbit watches from orbit."
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
<p class="lede">Europe's defence runs on ten minerals, and for seven of them China controls at least one stage of the supply chain. OreOrbit shows where those minerals are mined and refined, how they reach Europe, and what is changing this week, from public data and satellite pictures.</p>
<section><h2>Who is behind it</h2>
<div class="person"><img src="../img/david-madali.jpg" alt="David Madali" width="600" height="750" loading="lazy"><div>
<p><a href="https://madali.cz/"><b>David Madali</b></a> is a Prague-based analyst of the defence industry, critical raw materials and the space economy. He founded <a href="https://bohemiadefense.com/">Bohemia Defense</a> in 2024, an independent analysis project on Europe's defence industry, security and foreign policy, and built OreOrbit in 2026.</p>
<p>BBC News Chinese has quoted him as an analyst (<a href="%(bbc)s" rel="noopener">July 2025</a>). His background is in economics, economic diplomacy at the Czech Ministry of Foreign Affairs and export consulting at CzechTrade, where he set up a cluster of 12 security-industry companies.</p>
<p><a href="https://madali.cz/">madali.cz</a> · <a href="https://www.linkedin.com/in/davidmadali/">LinkedIn</a> · <a href="https://bohemiadefense.com/david-madali/">Founder page</a></p>
</div></div></section>
<section><h2>What it is</h2><ul class="plain">
<li>A live atlas of 31 mines, refineries and magnet factories, nine trade routes and the chokepoints between them.</li>
<li>Satellite pictures of every site, refreshed weekly: Sentinel-2 photos, ground cleared since 2018, Sentinel-1 radar and Landsat heat maps.</li>
<li>Signals every few hours: heat at the plants, ships at the chokepoints, earthquakes and disaster alerts, conflict near the supply chain.</li>
<li>Monthly EU import data, export-control deadlines, a stress test, and an assessment that runs in your browser and never leaves it.</li>
<li>A <a href="index.html">library</a> of readable pages on every material and site, made to be quoted and cited.</li>
</ul></section>
<section><h2>How it works</h2>
<p>Everything comes from public sources, named and dated on the page where it is used. An automatic updater collects and processes the data every three hours and rebuilds these pages every day. Stories found automatically are labelled as not checked. OreOrbit shows measurements and the public record; it does not forecast and is not investment or legal advice.</p>
<p>The full list of sources and their licences is on the <a href="legal.html">legal page</a>.</p></section>
<section><h2>Working with us</h2>
<p>OreOrbit is free. For defence and space manufacturers who need a defensible answer, Bohemia Defense offers a fixed-scope supply-chain risk review of one product line, supporting documentation under Article 24 of the EU Critical Raw Materials Act, and ongoing monitoring of the materials, sites and deadlines in your own register.</p>
<p><a class="cta" href="services.html">See services and prices</a> &nbsp; <a href="../oreorbit-sample-assessment.pdf">Read a sample review (PDF)</a></p></section>
<section><h2>How to cite OreOrbit</h2><p class="cite-text">Madali, D. (%(year)s). OreOrbit: critical minerals from orbit. Bohemia Defense. https://bohemiadefense.com/atlas/</p>
<p class="small">Each page in the library has its own citation. Figures and charts may be quoted and reused with credit to “OreOrbit (Bohemia Defense)” and a link.</p></section>""" % {"bbc": BBC, "mail": e(mail), "year": today[:4]}
    ld = [{"@type": "AboutPage", "@id": BASE + path + "#about", "name": title, "description": desc, "dateModified": today, "about": {"@id": ATLAS["@id"]}, "author": {"@id": PERSON["@id"]}}]
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("About", path)], alt="p/about-cs.html")


def legal_page(cfg, today):
    path = "p/legal.html"
    title = "Imprint, privacy and data licences"
    desc = "Who operates OreOrbit, what it does with your data (nothing leaves your browser), terms of use, and the licences of every data source."
    who = ", ".join(x for x in [cfg.get("company") or "David Madali (Bohemia Defense), natural person registered in the Czech Trade Register", "IČO " + (cfg.get("companyId") or "22229957"), cfg.get("address") or "Na Spravedlnosti 2919/2, 530 02 Pardubice, Czech Republic"] if x)
    mail = cfg.get("contactEmail") or "david@madali.cz"
    src = [("Copernicus Sentinel-1, -2 and -5P data", "European Union, Copernicus programme; free, full and open access with attribution."),
           ("Landsat 8 and 9", "U.S. Geological Survey; public domain."),
           ("NASA FIRMS, GIBS and Worldview imagery", "NASA Earth Science Data and Information System; open data with attribution."),
           ("Microsoft Planetary Computer and Earth Search (Element 84)", "Catalogues and processing of the satellite data above."),
           ("Copernicus DEM GLO-30", "European Space Agency and Airbus; free use with attribution."),
           ("USGS Mineral Commodity Summaries and earthquake feed", "U.S. Geological Survey; public domain."),
           ("IEA Global Critical Minerals Outlook", "International Energy Agency; figures quoted with attribution."),
           ("Eurostat Comext", "European Commission; reuse allowed with attribution."),
           ("TED, Tenders Electronic Daily", "EU Publications Office; reuse allowed with attribution."),
           ("UCDP Candidate Events Dataset", "Uppsala Conflict Data Program; CC BY 4.0."),
           ("GDACS", "Global Disaster Alert and Coordination System (European Commission and United Nations)."),
           ("IMF PortWatch", "International Monetary Fund and University of Oxford."),
           ("FRED", "Federal Reserve Bank of St. Louis, with the IMF as the source of commodity prices."),
           ("CelesTrak", "Satellite orbital elements."),
           ("AISStream.io", "Live ship positions."),
           ("GDELT Project", "Open news index; headlines link to the original publishers.")]
    body = """<h1>Imprint, privacy and data licences</h1>
<section><h2>Operator</h2><p>%(who)s. Contact: <a href="mailto:%(mail)s">%(mail)s</a>.</p></section>
<section><h2>Privacy</h2><p>OreOrbit uses no cookies, trackers or analytics. Nothing you type is sent anywhere: the assessment register and your settings (language, sound, chosen materials) stay in your own browser's storage on your device. Like every website, the hosting server keeps standard access logs for security and operation.</p></section>
<section><h2>Terms of use</h2><p>OreOrbit is provided free of charge for information. Data are collected automatically from public sources and can contain errors or delays; stories found automatically are not checked. Nothing here is investment, legal or professional advice. Check the original sources before relying on a figure.</p>
<p>OreOrbit's own text, figures and charts may be quoted and reused with credit to “OreOrbit (Bohemia Defense)” and a link. Third-party data remain under their own licences, listed below.</p></section>
<section><h2>Data sources and licences</h2><dl class="signals">%(src)s</dl></section>""" % {
        "who": e(who), "mail": e(mail), "src": "".join('<div><dt>%s</dt><dd>%s</dd></div>' % (e(a), e(b)) for a, b in src)}
    return path, page(path, title, desc, body, [], today, [("Atlas", ""), ("Legal", path)])


def services_page(cfg, today):
    path = "p/services.html"
    title = "Services: critical raw materials risk review for defence and space manufacturers"
    desc = "Know which of your products stop when a border closes. A two-to-three-week review of one product line's exposure to critical raw materials, from €4,900, by Bohemia Defense with OreOrbit data."
    mail = cfg.get("contactEmail") or "david@madali.cz"
    subj = "mailto:%s?subject=%s" % (mail, "Intro%20call%20about%20a%20raw%20materials%20review")
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
<div><dt>OreOrbit<br><b>Free</b></dt><dd>The live atlas, the library of citable pages, the weekly brief and the in-browser assessment, which never sends your data anywhere.</dd></div>
<div><dt>Readiness review<br><b>from €4,900</b></dt><dd>One product line, two to three weeks. You get the register of every part with a critical raw material and where it comes from; a rating for each part; stress tests against real export controls; options for second sources in Europe; a report management can sign, and a board presentation. It supports documentation under Article 24 of the Critical Raw Materials Act.<br><span class="small">Founding clients: the first three reviews cost €2,900, in exchange for a short testimonial and an anonymised case study.</span></dd></div>
<div><dt>Monitoring<br><b>from €390 / month</b></dt><dd>After a review: alerts when anything changes for your materials, sites and deadlines, a short monthly note written and checked by an analyst, and a yearly update of the register.</dd></div>
<div><dt>Briefings<br><b>from €500</b></dt><dd>A briefing for a board, an association or a ministry on critical raw materials and Europe's defence industry.</dd></div>
</dl>
<p class="small">Prices exclude VAT where it applies. Larger product ranges are quoted after the intro call.</p></section>
<section><h2>How a review runs</h2><ul class="dates">
<li><time>Day 1</time><span>A free 30-minute intro call to agree the product line and the people involved.</span></li>
<li><time>Week 1</time><span>Two working sessions with your engineering and purchasing teams to fill the register, part by part.</span></li>
<li><time>Week 2</time><span>Analysis and stress tests against export controls, chokepoints and sites, using OreOrbit's live data.</span></li>
<li><time>Week 3</time><span>The report and a presentation for management. You keep the register.</span></li>
</ul></section>
<section><h2>Your data</h2><p>Your register stays yours. We sign a non-disclosure agreement on request, the register can be built in your browser so that it never leaves your premises, and nothing about your company is ever published. Anonymised, aggregated figures are only used with your written consent.</p></section>
<section><h2>What it is, and what it is not</h2><p>A review is an independent analysis of supply-chain risk, from public data and the information you provide. It supports the documentation the Critical Raw Materials Act asks for, but it is not legal advice or a certification; confirm your legal obligations with counsel.</p></section>
<section><h2>Who does the work</h2><div class="person"><img src="../img/david-madali.jpg" alt="David Madali" width="600" height="750" loading="lazy"><div>
<p><a href="https://madali.cz/"><b>David Madali</b></a>, founder of <a href="https://bohemiadefense.com/">Bohemia Defense</a> and creator of OreOrbit. An analyst of the defence industry, critical raw materials and the space economy, quoted by BBC News Chinese, with a background in economic diplomacy at the Czech Ministry of Foreign Affairs and export consulting at CzechTrade.</p>
<p><a class="cta" href="%(subj)s">Book a free 30-minute intro call</a></p></div></div></section>""" % {"subj": e(subj)}
    ld = [{"@type": "Service", "@id": BASE + path + "#service", "name": "Critical raw materials supply-chain risk review", "serviceType": "Supply-chain risk assessment",
           "description": desc, "provider": {"@id": ORG["@id"]}, "areaServed": "Europe", "url": BASE + path,
           "offers": [{"@type": "Offer", "name": "Readiness review, one product line", "price": "4900", "priceCurrency": "EUR", "priceSpecification": {"@type": "PriceSpecification", "minPrice": 4900, "priceCurrency": "EUR"}},
                      {"@type": "Offer", "name": "Monitoring", "price": "390", "priceCurrency": "EUR", "priceSpecification": {"@type": "UnitPriceSpecification", "price": 390, "priceCurrency": "EUR", "unitText": "month"}},
                      {"@type": "Offer", "name": "Briefing", "price": "500", "priceCurrency": "EUR"}]}]
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("Services", path)], alt="p/services-cs.html")


def dependency_series(trade):
    """The OreOrbit Dependency Index, month by month: China's share of the value of EU imports from outside the EU,
    for each of the ten materials (all tracked products of a material added up), averaged with equal weight per material."""
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
        shares = {m: v[0] / v[1] for m, v in per[k].items() if v[1] > 0}
        if len(shares) >= 8:
            out.append({"month": k, "value": sum(shares.values()) / len(shares), "n": len(shares),
                        "over50": sum(1 for x in shares.values() if x > 0.5), "per": shares})
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
        return path, page(path, title, "Monthly index of China's share of EU imports of the ten critical minerals behind Europe's defence.", "<h1>OreOrbit Dependency Index</h1><p class=\"lede\">The index appears once the monthly trade data is available.</p>", [], today, [("Atlas", ""), ("Library", "p/index.html"), ("Dependency Index", path)])
    last = series[-1]
    v = round(last["value"] * 100)
    prev_m = series[-2] if len(series) > 1 else None
    yago = next((x for x in series if x["month"] == "%04d-%s" % (int(last["month"][:4]) - 1, last["month"][5:])), None)
    d_m = (v - round(prev_m["value"] * 100)) if prev_m else None
    d_y = (v - round(yago["value"] * 100)) if yago else None
    chg = lambda d: (("+%d" % d if d > 0 else "%d" % d) + (" point" if abs(d) == 1 else " points")) if d is not None else "n/a"
    names = {m: ((ref["materials"].get(m) or {}).get("info") or {}).get("name", m) for m in last["per"]}
    quote = "China supplied %d%% of the EU's imports of the ten critical minerals behind Europe's defence industry in %s, according to the OreOrbit Dependency Index by Bohemia Defense%s." % (
        v, month_txt(last["month"]), (", %s from %d%% a year earlier" % ("up" if d_y > 0 else "down" if d_y < 0 else "unchanged", round(yago["value"] * 100))) if yago else "")
    desc = quote
    rows = sorted(last["per"].items(), key=lambda kv: -kv[1])
    trs = "".join('<li style="--c:%s"><span>%s</span><span class="pc"><span class="qbar"><span style="width:%.0f%%"></span></span>%d%%%s</span></li>' % (
        COL.get(m, "#eceee9"), e(names[m]), x * 100, round(x * 100),
        ("" if not yago or m not in yago["per"] else ' <em>%s</em>' % e(chg(round(x * 100) - round(yago["per"][m] * 100)).replace(" points", " pts").replace(" point", " pt")))) for m, x in rows)
    body = """<article style="--c:#3ddc97">
<p class="kicker"><i></i>Monthly · Eurostat data for %(month)s</p>
<h1>OreOrbit Dependency Index</h1>
<p class="lede">China's share of what the EU imports from outside the EU across the ten critical minerals behind Europe's defence industry. Each mineral counts equally.</p>
<dl class="figs"><div><dt>%(v)d%%</dt><dd>China's share in %(month)s</dd></div><div><dt>%(dm)s</dt><dd>change from the month before</dd></div><div><dt>%(dy)s</dt><dd>change from a year earlier</dd></div><div><dt>%(over)d of %(n)d</dt><dd>minerals where China supplied more than half</dd></div></dl>
<section><h2>Month by month</h2>%(chart)s<p class="small">Equal-weighted average of China's share of the value of extra-EU imports, per mineral. Source: Eurostat Comext, via OreOrbit.</p><button type="button" class="dl" hidden>Download chart (SVG)</button></section>
<section><h2>Quote it</h2><p class="cite-text">%(quote)s</p><button type="button" class="copy" data-copy="%(quote)s" hidden>Copy the sentence</button><p class="small">Journalists and analysts may quote the index and reuse the chart with credit to “OreOrbit Dependency Index (Bohemia Defense)” and a link to this page.</p></section>
<section><h2>By mineral, %(month)s</h2><ul class="idx">%(trs)s</ul><p class="small">China's share of the value of extra-EU imports, all tracked products of each mineral added up; change against the same month a year earlier.</p></section>
<section><h2>How it is made</h2><ul class="plain">
<li>For each of the ten minerals, OreOrbit adds up the value of the EU's monthly imports from outside the EU of the products it tracks (for example permanent magnets, rare-earth compounds and metals for rare earths) and takes China's share.</li>
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
    ld = [{"@type": "Dataset", "@id": BASE + path + "#dataset", "name": "OreOrbit Dependency Index", "description": "Monthly equal-weighted average of China's share of the value of extra-EU imports for ten critical raw materials used by Europe's defence industry (rare earths, titanium, tungsten, antimony, gallium, germanium, lithium, cobalt, nickel, graphite). Source: Eurostat Comext.",
           "url": BASE + path, "creator": {"@id": PERSON["@id"]}, "publisher": {"@id": ORG["@id"]}, "isAccessibleForFree": True, "dateModified": today,
           "temporalCoverage": "%s/%s" % (series[0]["month"], last["month"]), "variableMeasured": "China's share of extra-EU import value, equal-weighted across ten materials",
           "isBasedOn": "https://ec.europa.eu/eurostat/comext/newxtweb/", "keywords": ["critical raw materials", "defence industry", "EU imports", "China", "supply chain"]}]
    return path, page(path, title, desc[:300], body, ld, today, [("Atlas", ""), ("Library", "p/index.html"), ("Dependency Index", path)], alt="p/dependency-index-cs.html")


MON_CS = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"]
MONTH_CS_NOM = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"]
MONTH_CS_LOC = ["lednu", "únoru", "březnu", "dubnu", "květnu", "červnu", "červenci", "srpnu", "září", "říjnu", "listopadu", "prosinci"]
MAT_CS = {"ree": "Vzácné zeminy", "ti": "Titan", "w": "Wolfram", "sb": "Antimon", "ga": "Galium", "ge": "Germanium", "li": "Lithium", "co": "Kobalt", "ni": "Nikl", "gr": "Grafit"}


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
    desc = "Zjistěte, které vaše výrobky se zastaví, když se zavře hranice. Posouzení závislosti jedné výrobní řady na kritických surovinách za dva až tři týdny, od 4 900 €, od Bohemia Defense s daty OreOrbit."
    mail = cfg.get("contactEmail") or "david@madali.cz"
    subj = "mailto:%s?subject=%s" % (mail, "%C3%9Avodn%C3%AD%20hovor%20k%20posouzen%C3%AD%20surovin")
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
<div><dt>OreOrbit<br><b>Zdarma</b></dt><dd>Živý atlas, knihovna stránek k citaci, týdenní přehled a posouzení přímo v prohlížeči, které vaše data nikam neodesílá.</dd></div>
<div><dt>Posouzení připravenosti<br><b>od 4 900 €</b></dt><dd>Jedna výrobní řada za dva až tři týdny. Dostanete registr všech dílů s kritickou surovinou a jejich původu, hodnocení každého dílu, zátěžové testy proti skutečným vývozním kontrolám, evropské alternativní zdroje, zprávu, kterou může podepsat vedení, a prezentaci pro vedení. Slouží jako podklad pro článek 24 nařízení o kritických surovinách.<br><span class="small">Zakládající klienti: první tři posouzení za 2 900 € výměnou za krátkou referenci a anonymizovanou případovou studii.</span></dd></div>
<div><dt>Sledování<br><b>od 390 € měsíčně</b></dt><dd>Po posouzení: upozornění na změny u vašich surovin, lokalit a termínů, krátká měsíční zpráva, kterou napíše a zkontroluje analytik, a roční aktualizace registru.</dd></div>
<div><dt>Briefingy<br><b>od 500 €</b></dt><dd>Pro vedení firem, asociace a ministerstva o kritických surovinách a evropském obranném průmyslu.</dd></div>
</dl>
<p class="small">Ceny jsou bez DPH, pokud se uplatňuje. Širší sortiment naceníme po úvodním hovoru.</p></section>
<section><h2>Jak posouzení probíhá</h2><ul class="dates">
<li><time>Den 1</time><span>Úvodní 30minutový hovor zdarma: výrobní řada a lidé, kteří se zapojí.</span></li>
<li><time>Týden 1</time><span>Dvě pracovní setkání s vaší konstrukcí a nákupem, při kterých díl po dílu vyplníme registr.</span></li>
<li><time>Týden 2</time><span>Analýza a zátěžové testy proti vývozním kontrolám, úzkým místům a lokalitám s živými daty OreOrbit.</span></li>
<li><time>Týden 3</time><span>Zpráva a prezentace pro vedení. Registr zůstává vám.</span></li>
</ul></section>
<section><h2>Vaše data</h2><p>Váš registr patří vám. Na požádání podepíšeme dohodu o mlčenlivosti, registr lze vyplnit přímo ve vašem prohlížeči, takže neopustí vaši firmu, a nic o vaší firmě nikdy nezveřejníme. Anonymizované souhrnné údaje použijeme jen s vaším písemným souhlasem.</p></section>
<section><h2>Co to je a co ne</h2><p>Posouzení je nezávislá analýza rizik dodavatelského řetězce z veřejných dat a informací, které nám poskytnete. Slouží jako podklad pro dokumentaci podle nařízení o kritických surovinách, není ale právní radou ani certifikací; své právní povinnosti si ověřte s právníkem.</p></section>
<section><h2>Kdo práci dělá</h2><div class="person"><img src="../img/david-madali.jpg" alt="David Madali" width="600" height="750" loading="lazy"><div>
<p><a href="https://madali.cz/cs/"><b>David Madali</b></a>, zakladatel <a href="https://bohemiadefense.com/cs/">Bohemia Defense</a> a autor OreOrbit. Analytik obranného průmyslu, kritických surovin a kosmické ekonomiky, citovaný čínskou službou BBC News, se zkušenostmi z ekonomické diplomacie na Ministerstvu zahraničních věcí ČR a z exportního poradenství v CzechTrade.</p>
<p><a class="cta" href="%(subj)s">Domluvit úvodní 30minutový hovor zdarma</a></p></div></div></section>""" % {"subj": e(subj)}
    ld = [{"@type": "Service", "@id": BASE + path + "#service", "name": "Posouzení rizik kritických surovin v dodavatelském řetězci", "inLanguage": "cs", "description": desc,
           "provider": {"@id": ORG["@id"]}, "areaServed": "Europe", "url": BASE + path,
           "offers": [{"@type": "Offer", "name": "Posouzení připravenosti", "price": "4900", "priceCurrency": "EUR"}, {"@type": "Offer", "name": "Sledování", "price": "390", "priceCurrency": "EUR"}]}]
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("Služby", path)], lang="cs", alt="p/services.html")


def about_page_cs(cfg, today):
    path = "p/about-cs.html"
    title = "O projektu OreOrbit"
    desc = "OreOrbit je bezplatný živý atlas kritických surovin, na kterých stojí evropský obranný a kosmický průmysl. Vytvořil ho David Madali v Bohemia Defense v Praze."
    mail = cfg.get("contactEmail") or "david@madali.cz"
    body = """<h1>O projektu OreOrbit</h1>
<p class="lede">Obrana Evropy stojí na deseti surovinách a u sedmi z nich ovládá Čína alespoň jednu fázi dodavatelského řetězce. OreOrbit ukazuje, kde se tyto suroviny těží a zpracovávají, jak se dostávají do Evropy a co se tento týden mění, z veřejných dat a satelitních snímků.</p>
<section><h2>Kdo za tím stojí</h2>
<div class="person"><img src="../img/david-madali.jpg" alt="David Madali" width="600" height="750" loading="lazy"><div>
<p><a href="https://madali.cz/cs/"><b>David Madali</b></a> je pražský analytik obranného průmyslu, kritických surovin a kosmické ekonomiky. V roce 2024 založil <a href="https://bohemiadefense.com/cs/">Bohemia Defense</a>, nezávislý analytický projekt o evropském obranném průmyslu, bezpečnosti a zahraniční politice, a v roce 2026 vytvořil OreOrbit.</p>
<p>Jako analytika ho citovala čínská služba BBC News (<a href="%(bbc)s" rel="noopener">červenec 2025</a>). Má zkušenosti z ekonomie, ekonomické diplomacie na Ministerstvu zahraničních věcí ČR a exportního poradenství v CzechTrade, kde založil klastr 12 firem z bezpečnostního průmyslu.</p>
<p><a href="https://madali.cz/cs/">madali.cz</a> · <a href="https://www.linkedin.com/in/davidmadali/">LinkedIn</a> · <a href="https://bohemiadefense.com/david-madali-cz/">Stránka zakladatele</a></p>
</div></div></section>
<section><h2>Co to je</h2><ul class="plain">
<li>Živý atlas 31 dolů, rafinerií a továren na magnety, devíti obchodních tras a úzkých míst mezi nimi.</li>
<li>Satelitní snímky každé lokality každý týden: fotografie Sentinel-2, odlesněná plocha od roku 2018, radar Sentinel-1 a tepelné mapy Landsat.</li>
<li>Signály každých pár hodin: teplo v závodech, lodě v úžinách, zemětřesení a výstrahy, konflikty u dodavatelského řetězce.</li>
<li>Měsíční data o dovozu do EU, termíny vývozních kontrol, zátěžový test a posouzení, které běží ve vašem prohlížeči a nikam neodchází.</li>
<li><a href="index.html">Knihovna</a> stránek o každé surovině a lokalitě k citaci (anglicky) a měsíční <a href="dependency-index-cs.html">Index závislosti</a>.</li>
</ul></section>
<section><h2>Jak to funguje</h2>
<p>Všechno pochází z veřejných zdrojů, uvedených a datovaných tam, kde jsou použity. Automatická aktualizace sbírá a zpracovává data každé tři hodiny a stránky obnovuje každý den. Automaticky nalezené zprávy jsou označené jako neověřené. OreOrbit ukazuje měření a veřejné záznamy; nepředpovídá a není investiční ani právní radou.</p>
<p>Úplný seznam zdrojů a jejich licencí je na <a href="legal.html">právní stránce</a> (anglicky).</p></section>
<section><h2>Spolupráce</h2>
<p>OreOrbit je zdarma. Výrobcům obranné a kosmické techniky, kteří potřebují obhajitelnou odpověď, nabízí Bohemia Defense posouzení rizik jedné výrobní řady s pevným rozsahem jako podklad pro článek 24 nařízení EU o kritických surovinách a průběžné sledování surovin, lokalit a termínů z vašeho registru.</p>
<p><a class="cta" href="services-cs.html">Služby a ceny</a> &nbsp; <a href="mailto:%(mail)s?subject=OreOrbit">Napsat na %(mail)s</a></p></section>
<section><h2>Jak OreOrbit citovat</h2><p class="cite-text">Madali, D. (%(year)s). OreOrbit: kritické suroviny z oběžné dráhy. Bohemia Defense. https://bohemiadefense.com/atlas/</p></section>""" % {"bbc": BBC, "mail": e(mail), "year": today[:4]}
    ld = [{"@type": "AboutPage", "@id": BASE + path + "#about", "name": title, "description": desc, "inLanguage": "cs", "dateModified": today, "about": {"@id": ATLAS["@id"]}, "author": {"@id": PERSON["@id"]}}]
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("O projektu", path)], lang="cs", alt="p/about.html")


def dependency_page_cs(ref, live, today):
    path = "p/dependency-index-cs.html"
    series = dependency_series(live.get("trade"))
    title = "Index závislosti OreOrbit: podíl Číny na dovozu surovin pro evropskou obranu"
    if not series:
        return path, page(path, title, "Měsíční index podílu Číny na dovozu deseti kritických surovin do EU.", "<h1>Index závislosti OreOrbit</h1><p class=\"lede\">Index se zobrazí, jakmile budou k dispozici měsíční obchodní data.</p>", [], today, [("Atlas", ""), ("Index závislosti", path)], lang="cs", alt="p/dependency-index.html")
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
    quote = "Čína v %s dodala %d %% dovozu deseti kritických surovin, na kterých stojí evropský obranný průmysl, do EU, podle Indexu závislosti OreOrbit od Bohemia Defense%s." % (
        mon_loc, v, ("; před rokem to bylo %d %%" % round(yago["value"] * 100)) if yago else "")
    rows = sorted(last["per"].items(), key=lambda kv: -kv[1])
    trs = "".join('<li style="--c:%s"><span>%s</span><span class="pc"><span class="qbar"><span style="width:%.0f%%"></span></span>%d %%%s</span></li>' % (
        COL.get(m, "#eceee9"), e(MAT_CS.get(m, m)), x * 100, round(x * 100),
        ("" if not yago or m not in yago["per"] else ' <em>%s</em>' % e(chg(round(x * 100) - round(yago["per"][m] * 100))))) for m, x in rows)
    body = """<article style="--c:#3ddc97">
<p class="kicker"><i></i>Měsíčně · data Eurostatu za %(nom)s</p>
<h1>Index závislosti OreOrbit</h1>
<p class="lede">Podíl Číny na tom, co EU dováží ze zemí mimo EU, napříč deseti kritickými surovinami, na kterých stojí evropský obranný průmysl. Každá surovina má stejnou váhu.</p>
<dl class="figs"><div><dt>%(v)d %%</dt><dd>podíl Číny, %(nom)s</dd></div><div><dt>%(dm)s</dt><dd>změna proti předchozímu měsíci</dd></div><div><dt>%(dy)s</dt><dd>změna proti stejnému měsíci před rokem</dd></div><div><dt>%(over)d z %(n)d</dt><dd>surovin, u kterých Čína dodala víc než polovinu</dd></div></dl>
<section><h2>Měsíc po měsíci</h2>%(chart)s<p class="small">Průměr podílů Číny na hodnotě dovozu do EU ze zemí mimo EU, se stejnou vahou pro každou surovinu. Zdroj: Eurostat Comext, přes OreOrbit.</p><button type="button" class="dl" data-label="Stáhnout graf (SVG)" hidden>Stáhnout graf (SVG)</button></section>
<section><h2>K citaci</h2><p class="cite-text">%(quote)s</p><button type="button" class="copy" data-copy="%(quote)s" data-label="Zkopírovat větu" data-done="Věta zkopírována" hidden>Zkopírovat větu</button><p class="small">Novináři a analytici mohou index citovat a graf dále použít s uvedením „Index závislosti OreOrbit (Bohemia Defense)“ a odkazem na tuto stránku.</p></section>
<section><h2>Podle surovin, %(nom)s</h2><ul class="idx">%(trs)s</ul><p class="small">Podíl Číny na hodnotě dovozu do EU ze zemí mimo EU, všechny sledované produkty dané suroviny dohromady; změna proti stejnému měsíci před rokem.</p></section>
<section><h2>Jak index vzniká</h2><ul class="plain">
<li>U každé z deseti surovin OreOrbit sečte měsíční hodnotu dovozu sledovaných produktů do EU ze zemí mimo EU (například u vzácných zemin permanentní magnety, sloučeniny a kovy) a spočítá podíl Číny.</li>
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

PRODUCTS = [("Drones", "Drony", {"ree": "motor magnets", "ga": "radio links (GaN)", "gr": "battery anodes", "co": "battery cathodes", "li": "battery cells", "ni": "battery cathodes", "ge": "thermal camera lenses"}),
            ("Ammunition and guided munitions", "Munice a řízená munice", {"sb": "primers and hardened lead", "w": "penetrators and fragmentation", "ree": "fin actuators", "ga": "seekers and fuzes"}),
            ("Optics and thermal imaging", "Optika a termovize", {"ge": "infrared lenses", "ga": "detectors (GaAs, InGaAs)", "ree": "laser rangefinders"}),
            ("Radar and electronics", "Radary a elektronika", {"ga": "GaN power amplifiers", "ge": "high-frequency chips", "ree": "magnets and garnets", "sb": "infrared detectors"}),
            ("Armoured vehicles", "Obrněná vozidla", {"ti": "armour and structures", "w": "penetrators and tooling", "ni": "armour steel", "ree": "electric drives"}),
            ("Aircraft and space", "Letectví a kosmonautika", {"ti": "airframes and engines", "ni": "engine superalloys", "co": "engine superalloys", "ree": "actuators", "ga": "solar cells (GaAs)", "ge": "solar-cell substrates"}),
            ("Batteries and energy storage", "Baterie a úložiště energie", {"li": "cells", "co": "cathodes", "ni": "cathodes", "gr": "anodes"})]
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
                 '<div class="src">Equal-weighted share of extra-EU import value, ten minerals · Eurostat Comext via OreOrbit</div>') % (
            month_txt(last["month"]), v, ("<b>%+d points</b> from a year earlier" % dy) if dy is not None else "", svg)
        cards.append({"slug": "index", "title": "Dependency Index, %s" % month_txt(last["month"]), "html": card_doc((inner, "The monthly number, with the method")),
                      "en": "China supplied %d%% of the EU's imports of the ten critical minerals behind Europe's defence industry in %s%s.\n\nThat's the OreOrbit Dependency Index: each mineral counts equally, so gallium matters as much as lithium. Full breakdown and method in the first comment.\n\n#CriticalRawMaterials #DefenceIndustry #SupplyChain #Europe" % (
                          v, month_txt(last["month"]), (", %s from %d%% a year earlier" % ("up" if dy > 0 else "down" if dy < 0 else "unchanged", round(yago["value"] * 100))) if yago else ""),
                      "cs": "Čína v %s dodala %d %% dovozu deseti kritických surovin, na kterých stojí evropský obranný průmysl, do EU%s.\n\nTo je Index závislosti OreOrbit: každá surovina má stejnou váhu, takže galium se počítá stejně jako lithium. Rozpad a metodika v prvním komentáři." % (
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
                  "en": "%s depend on %d of the ten critical minerals. For %d of them, one country controls more than 65%% of a key stage%s.\n\nYou can check your own product type in 60 seconds, free, in OreOrbit's quick check (link in the first comment).\n\n#DefenceIndustry #CriticalRawMaterials #SupplyChain" % (
                      pen, len(rows), conc, (", China in %d" % cn) if cn else ""),
                  "cs": "%s závisí na %d z deseti kritických surovin. U %d z nich ovládá jedna země přes 65 %% klíčové fáze%s.\n\nSvůj typ výrobku si prověříte za 60 sekund zdarma v rychlé kontrole OreOrbit (odkaz v prvním komentáři)." % (
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
<body><div class="e-top"><div class="e-n">%(v)d%%</div><div class="e-t">China's share of EU imports of the ten critical minerals behind Europe's defence, %(month)s</div></div>
%(chart)s
<div class="e-s">OreOrbit Dependency Index · Eurostat Comext · <a href="%(base)sp/dependency-index.html" target="_blank" rel="noopener">OreOrbit by Bohemia Defense</a></div></body></html>
""" % {"base": BASE, "v": v, "month": e(month_txt(last["month"])), "chart": index_chart(series)}
    return path, html


def sitemap(paths, today):
    urls = [BASE] + [BASE + p for p in paths]
    return ('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + "".join("<url><loc>%s</loc><lastmod>%s</lastmod></url>\n" % (e(u), today) for u in urls) + "</urlset>\n")


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
    for fn in (lambda: index_page(ref, today), lambda: dependency_page(ref, live, today), lambda: dependency_page_cs(ref, live, today), lambda: services_page_cs(cfg, today), lambda: about_page_cs(cfg, today), lambda: services_page(cfg, today), lambda: about_page(ref, cfg, today), lambda: legal_page(cfg, today)):
        p, h = fn()
        out[p] = h
    ep, eh = embed_page(live, today)
    if eh:
        out[ep] = eh
    out["sitemap.xml"] = sitemap(sorted(k for k in out.keys() if k not in ("p/embed-index.html",)), today)
    return out
