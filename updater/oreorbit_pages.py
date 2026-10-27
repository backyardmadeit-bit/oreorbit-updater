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


def page(path, title, desc, body, ld_extra, today, crumbs=None):
    url = BASE + path
    ld = {"@context": "https://schema.org", "@graph": [
        dict({"@type": "WebPage", "@id": url + "#page", "url": url, "name": title, "description": desc, "inLanguage": "en",
              "dateModified": today, "isPartOf": {"@id": ATLAS["@id"]}, "author": {"@id": PERSON["@id"]}, "publisher": {"@id": ORG["@id"]}},
             **({"breadcrumb": {"@type": "BreadcrumbList", "itemListElement": [
                 {"@type": "ListItem", "position": i + 1, "name": n, "item": BASE + u} for i, (n, u) in enumerate(crumbs)]}} if crumbs else {})),
        PERSON, ORG, ATLAS] + ld_extra}
    crumb_html = ""
    if crumbs:
        crumb_html = '<nav class="crumbs" aria-label="Breadcrumb">' + " / ".join(
            ('<a href="%s">%s</a>' % (e("../" + u if not u.startswith("p/") else u[2:]), e(n)) if i < len(crumbs) - 1 else e(n))
            for i, (n, u) in enumerate(crumbs)) + "</nav>"
    return """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>%(title)s · OreOrbit</title>
<meta name="description" content="%(desc)s">
<meta name="author" content="David Madali">
<meta name="theme-color" content="#050607">
<link rel="canonical" href="%(url)s">
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
  <span class="by">by <a href="https://bohemiadefense.com/">Bohemia Defense</a></span>
  <nav><a href="index.html">Library</a><a href="services.html">Services</a><a href="about.html">About</a><a class="cta" href="../">Open the atlas</a></nav>
</header>
<main class="doc">
%(crumbs)s
%(body)s
</main>
<footer class="foot">
  <p>OreOrbit is built and run by <a href="https://madali.cz/">David Madali</a> at <a href="https://bohemiadefense.com/">Bohemia Defense</a>, Prague. Public data, updated automatically every day. Data as of %(today_txt)s.</p>
  <p><a href="services.html">Services</a> <a href="about.html">About</a> <a href="legal.html">Imprint, privacy and data licences</a> <a href="https://madali.cz/">madali.cz</a> <a href="https://www.linkedin.com/in/davidmadali/">LinkedIn</a></p>
</footer>
<script src="../library.js" defer></script>
</body>
</html>
""" % {"title": e(title), "desc": e(desc), "url": e(url), "ld": json.dumps(ld, ensure_ascii=False).replace("</", "<\\/"),
       "crumbs": crumb_html, "body": body, "today_txt": e(day(today))}


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
            'Rebuilt every day from the same data as the live atlas.</p><ul class="lib">%s</ul>') % "".join(rows)
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
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("About", path)])


def legal_page(cfg, today):
    path = "p/legal.html"
    title = "Imprint, privacy and data licences"
    desc = "Who operates OreOrbit, what it does with your data (nothing leaves your browser), terms of use, and the licences of every data source."
    who = ", ".join(x for x in [cfg.get("company") or "David Madali (Bohemia Defense)", ("IČO " + cfg["companyId"]) if cfg.get("companyId") else "", cfg.get("address") or "Prague, Czech Republic"] if x)
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
    return path, page(path, title, desc, body, ld, today, [("Atlas", ""), ("Services", path)])


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
    for fn in (lambda: index_page(ref, today), lambda: services_page(cfg, today), lambda: about_page(ref, cfg, today), lambda: legal_page(cfg, today)):
        p, h = fn()
        out[p] = h
    out["sitemap.xml"] = sitemap(sorted(out.keys()), today)
    return out
