#!/usr/bin/env python3
"""Build the OreOrbit sales guide: an A4 PDF in English and Czech, to attach to emails.

  python3 docs/sales/build_manual.py              # both PDFs, from the screenshots in docs/sales/img
  python3 docs/sales/build_manual.py --shots      # first take fresh screenshots of the live atlas
  python3 docs/sales/build_manual.py --lang cs --html   # one language; also keep the HTML beside the PDF

Needs Playwright with Chromium: pip install playwright && python3 -m playwright install chromium

Never type a price or a count here. The monitoring price, the Czech crown price and the booking link come
from atlas/config.js; the numbers of minerals, sites and routes, and the tightest stage per mineral, come
from atlas/data/reference.json; mineral colours from atlas/index.html and symbols from atlas/atlas-main.js.
"""
import argparse
import datetime as dt
import html
import json
import re
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
IMG = HERE / "img"
ATLAS = "https://bohemiadefense.com/atlas/"
ATLAS_SHORT = "bohemiadefense.com/atlas"
SITE_SHORT = "bohemiadefense.com"
EMAIL = "madali@bohemiadefense.com"
OUT_NAME = {"en": "OreOrbit-guide-en.pdf", "cs": "OreOrbit-pruvodce-cs.pdf"}
NB = "\u00a0"
JPEG_Q = 80
SITE_SEARCH = "Mittersill"     # the site whose drawer the guide shows
PRODUCT = "drones"             # the quick check the guide shows
MINERAL = "ga"                 # the mineral drawer shown enlarged on the globe page

SIGNET = ('<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#050607"/>'
          '<circle cx="16" cy="16" r="5.6" stroke="#eceee9" stroke-width="2.2"/>'
          '<ellipse cx="16" cy="16" rx="13.4" ry="5.1" stroke="#eceee9" stroke-width="1.8" transform="rotate(-28 16 16)"/>'
          '<circle cx="27.7" cy="9.9" r="2.7" fill="#3ddc97"/></svg>')

MON_EN = "January February March April May June July August September October November December".split()
MON_CS = "leden únor březen duben květen červen červenec srpen září říjen listopad prosinec".split()
MON_CS_GEN = "ledna února března dubna května června července srpna září října listopadu prosince".split()
NUM_EN = {9: "nine", 10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen"}
NUM_CS = {9: "devět", 10: "deset", 11: "jedenáct", 12: "dvanáct", 13: "třináct", 14: "čtrnáct", 15: "patnáct"}

WHO_CS = {"China": "Čína", "DR Congo": "DR Kongo", "Indonesia": "Indonésie", "Australia": "Austrálie",
          "South Africa": "Jižní Afrika", "Chile": "Chile", "Gabon": "Gabon", "Brazil": "Brazílie"}
WHAT_CS = {"Sintered magnets": "slinuté magnety", "Titanium sponge": "titanová houba",
           "Primary magnesium metal": "primární hořčík", "Electrolytic manganese metal": "elektrolytický mangan",
           "Primary gallium": "primární galium", "Lithium chemicals": "lithiové chemikálie",
           "Battery-grade graphite": "bateriový grafit"}
KIND = {"mine": ("mining", "těžba"), "refine": ("refining", "zpracování"), "part": ("parts", "díly")}
NOTE_CS = {"Jan": "led.", "Feb": "úno.", "Mar": "bře.", "Apr": "dub.", "May": "kvě.", "Jun": "čvn.", "Jul": "čvc.",
           "Aug": "srp.", "Sep": "zář.", "Oct": "říj.", "Nov": "lis.", "Dec": "pro.", "capacity": "kapacita"}


# ---------------------------------------------------------------- data from the repo

def read_config():
    src = (ROOT / "atlas" / "config.js").read_text(encoding="utf-8")

    def get(key):
        m = re.search(r'\b%s\s*:\s*"([^"]*)"' % key, src)
        if not m or not m.group(1).strip():
            sys.exit("atlas/config.js: %s is missing or empty" % key)
        return m.group(1).strip()
    return {k: get(k) for k in ("monitoringPrice", "monitoringPriceCzk", "bookingUrl", "company", "companyId")}


def read_reference():
    ref = json.loads((ROOT / "atlas" / "data" / "reference.json").read_text(encoding="utf-8"))
    order, mats = ref["order"], ref["materials"]

    def worst(m):
        w = (mats.get(m) or {}).get("worst")
        return w if isinstance(w, dict) and isinstance(w.get("x"), dict) else None

    conc = sum(1 for m in order if worst(m) and isinstance(worst(m)["x"].get("pct"), (int, float)) and worst(m)["x"]["pct"] > 65)
    return {"order": order, "minerals": len(order), "sites": len(ref["sites"]), "routes": len(ref.get("routes") or []),
            "conc": conc, "worst": {m: worst(m) for m in order},
            "name_en": {m: ((mats.get(m) or {}).get("info") or {}).get("name") or m for m in order}}


def read_atlas_tables():
    idx = (ROOT / "atlas" / "index.html").read_text(encoding="utf-8")
    dark_css, _, light_css = idx.partition(".band-light")   # the atlas has one palette for dark and one for light bands
    pal = lambda css: dict(re.findall(r"--([a-z]{1,3}):\s*(#[0-9a-fA-F]{6})", css))
    colours = (pal(dark_css), pal(light_css))
    js = (ROOT / "atlas" / "atlas-main.js").read_text(encoding="utf-8")
    m = re.search(r"const ELEM = \{(.*?)\};", js, re.S)
    symbols = dict(re.findall(r'(\w+):\s*\{\s*s:\s*"([^"]+)"', m.group(1))) if m else {}
    try:
        sys.path.insert(0, str(ROOT / "updater"))
        from oreorbit_pages import MAT_CS  # the library pages' Czech mineral names
    except Exception:
        MAT_CS = {}
    return colours, symbols, MAT_CS


def shots_date():
    try:
        return dt.date.fromisoformat(json.loads((IMG / "shots.json").read_text(encoding="utf-8"))["date"])
    except Exception:
        return dt.date.today()


# ---------------------------------------------------------------- text helpers

def cz(s):
    """Czech typography: a non-breaking space after one-letter words and before % € Kč."""
    s = re.sub(r"(?<![\w<>/=\"&;.-])([ksvzouaiKSVZOUAI]) ", lambda m: m.group(1) + NB, s)
    return re.sub(r"(\d) (%|€|Kč)", lambda m: m.group(1) + NB + m.group(2), s)


def day(d, lang):
    return "%d. %s %d" % (d.day, MON_CS_GEN[d.month - 1], d.year) if lang == "cs" else "%d %s %d" % (d.day, MON_EN[d.month - 1], d.year)


def month(d, lang):
    return "%s %d" % ((MON_CS if lang == "cs" else MON_EN)[d.month - 1], d.year)


def pct(x, lang):
    if x.get("txt"):
        t = x["txt"]
        return t.replace("%", NB + "%") if lang == "cs" else t
    return ("%d" % x["pct"]) + (NB + "%" if lang == "cs" else "%")


def stage_text(w, lang):
    if not w:
        return "Čína vede · světový podíl není veřejný" if lang == "cs" else "China leads · no public world total"
    x, k = w["x"], w.get("k")
    who = WHO_CS.get(x.get("who"), x.get("who")) if lang == "cs" else x.get("who")
    what = x.get("what")
    if what:
        what = WHAT_CS.get(what, what) if lang == "cs" else what[0].lower() + what[1:]
    else:
        what = KIND.get(k, (k, k))[1 if lang == "cs" else 0]
    return '<span class="pct">%s %s</span> · %s' % (pct(x, lang), html.escape(who or ""), html.escape(what or ""))


def note_text(w, lang):
    n = ((w or {}).get("x") or {}).get("note") or ""
    if lang == "cs":
        for a, b in NOTE_CS.items():
            n = re.sub(r"\b%s\b" % a, b, n)
    return html.escape(n)


# ---------------------------------------------------------------- copy

def copy(lang, c, r):
    n_min, n_sites, n_routes, conc = r["minerals"], r["sites"], r["routes"], r["conc"]
    book_short = re.sub(r"^https?://", "", c["bookingUrl"]).rstrip("/")
    if lang == "en":
        twelve = NUM_EN.get(n_min, str(n_min))
        price = "€%s <small>/ month</small>" % c["monitoringPrice"]
        return {
            "title": "OreOrbit: what it is and how to start",
            "foot": "OreOrbit · Bohemia Defense",
            "cover_k": "For defence and space manufacturers",
            "cover_h": "See what your product<br><b>depends on.</b>",
            "cover_lede": "The %s critical minerals behind Europe's defence and space industry: who controls them, and what changes this week." % twelve,
            "proof": ["Open to everyone, no login", "Updated daily", "Quoted by BBC News Chinese"],
            "p2_k": "01 · What OreOrbit is",
            "p2_h": "One map of the minerals<br><b>your products need.</b>",
            "p2_b1": ("OreOrbit is a public atlas of the %d critical minerals behind Europe's defence and space industry. "
                      "It follows %d mines, refineries and plants and %d trade routes in satellite and open data, together with "
                      "the dates that can stop a delivery: export controls, quotas and sourcing rules.") % (n_min, n_sites, n_routes),
            "p2_b2": ("It is made for the people who answer for supply: purchasing, engineering, risk and the board. "
                      "In a minute you see which minerals a product needs, who controls them and what is moving this week."),
            "stats": [(n_min, "critical minerals"), (n_sites, "mines, refineries and plants watched from orbit"),
                      (n_routes, "trade routes and chokepoints"),
                      ("%d of %d" % (conc, n_min), "have a stage where one country holds more than 65%")],
            "table_h": "Where one country holds the most.",
            "th": ["Mineral", "Tightest stage", "", "Source"],
            "p3_k": "02 · The globe",
            "p3_h": "Every site and route,<br><b>seen from orbit.</b>",
            "p3_cap": "Mittersill, Austria, one of the %d sites: operator, coordinates, sources, and satellite pictures from different years side by side." % n_sites,
            "p3_zoom": "Gallium, picked from the bar: its tightest stage and the source.",
            "p3_cols": [("Sites", "Mines, refineries and plants, each with its operator, its sources and the last clear satellite view."),
                        ("Routes and rivers", "Ships through the chokepoints, river levels on the Rhine and the Elbe, and armed conflict near the supply chain."),
                        ("Minerals", "The %s minerals sit along the bottom of the globe. Pick one to see only its sites and its tightest stage." % twelve)],
            "shots_note": "Screenshots from the live atlas, %s. Contains modified Copernicus Sentinel data %d.",
            "p4_k": "03 · Quick check",
            "p4_h": "Pick what you make.<br><b>See what it needs.</b>",
            "p4_lede": ("Drones, ammunition, optics, radar, armoured vehicles, aircraft and space, batteries. For each mineral: what it does "
                        "in the product, the tightest stage, where the EU's imports come from, and a risk level that moves with the news."),
            "p4_cap": "The quick check for drones, %s. High risk means one country controls more than 65%% of a stage and something is moving this week.",
            "p5_k": "04 · This week",
            "p5_h": "What moved,<br><b>and what comes next.</b>",
            "p5_cap": "This week, set to the minerals in drones: the next deadline, the dates after it, and what moved in the news and in satellite data.",
            "p5_side_h": "The evidence behind it.",
            "p5_side": ("Seven live signals from open data and satellites: EU imports, ships through the chokepoints, armed conflict, "
                        "Europe's defence demand, research on alternatives, heat at the plants and sulphur dioxide over smelters. "
                        "Each one opens to the full data."),
            "p6_k": "05 · Plans",
            "p6_h": "Start free. Get alerted.<br><b>Get ready.</b>",
            "plans": [
                {"k": "01 · Free", "pr": "€0", "sub": "Open to everyone, no login.",
                 "li": ["The atlas: every site, route and mineral on the globe.", "The quick check for your product.",
                        "This week: the next deadlines and the news.",
                        "With your email: the Monday brief for your minerals and every live-data panel in full."],
                 "how": "Start: " + ATLAS_SHORT},
                {"k": "02 · Monitoring", "pr": price, "sub": "Pay by card. Cancel anytime.", "on": True,
                 "li": ["We watch your minerals, their sites and deadlines around the clock.",
                        "You hear from us when something changes, and every Monday.",
                        "Ask us one question a month. A person answers within two working days."],
                 "fine": "Includes a weekly data file for your minerals.",
                 "how": "Start: the Monitoring section of the atlas. Choose your minerals and pay by card."},
                {"k": "03 · Readiness review", "pr": "Tailored", "sub": "Scope and price after a free 30-minute call.",
                 "li": ["One product line in two to three weeks.",
                        "Your parts register, and stress tests against real export controls.",
                        "The rules that decide who can supply you.",
                        "Slides your board can sign. Supports Article 24 of the Critical Raw Materials Act."],
                 "how": "Start: a 30-minute call, " + book_short}],
            "alerts_h": "What a monitoring client hears about.",
            "alerts": ["A new export rule, licence decision or major news on one of their minerals, the same day.",
                       "Each deadline 30, 14, 7 and 1 day before it falls.",
                       "A river too low for barges at Kaub, Duisburg or Dresden.",
                       "A plant on their list going quiet or starting up in satellite heat and sulphur dioxide data."],
            "p6_note": "Monitoring can be cancelled anytime. If you do not see the value, we refund you within the first month.",
            "p7_k": "06 · How to start",
            "p7_h": "Start with the quick check.<br><b>It takes a minute.</b>",
            "steps": [("Open the atlas", ATLAS_SHORT + ", no login. Run the quick check for what you make."),
                      ("Get the Monday brief", "Leave your email under This week. Every Monday: the deadlines and news for your minerals."),
                      ("Choose how far to go", "Choose your minerals in the Monitoring section and pay by card, or book a 30-minute call about a readiness review.")],
            "who_p1": ("Founder of Bohemia Defense. A Prague-based analyst of the defence industry, critical raw materials and the "
                       "space economy, and creator of OreOrbit."),
            "who_p2": ("Before Bohemia Defense: economic diplomacy at the Czech Ministry of Foreign Affairs, and export consulting at "
                       "CzechTrade, where he set up an informal cluster of twelve security-industry companies. BBC News Chinese has "
                       "quoted him as an analyst."),
            "ct": ["Email", "Book a call", "Atlas", "Analysis"],
            "book_label": "30 minutes, " + book_short,
            "id_line": "%s · IČO %s" % (c["company"], c["companyId"]),
            "copernicus": "Contains modified Copernicus Sentinel data %d.",
        }
    twelve = NUM_CS.get(n_min, str(n_min))
    czk = c["monitoringPriceCzk"].replace(" ", NB)
    price = "%s%s€ <small>/ měsíc · asi %s%sKč</small>" % (c["monitoringPrice"], NB, czk, NB)
    return {
        "title": "OreOrbit: co to je a jak začít",
        "foot": "OreOrbit · Bohemia Defense",
        "cover_k": "Pro výrobce z obranného a kosmického průmyslu",
        "cover_h": "Zjistěte, na čem<br><b>závisí váš výrobek.</b>",
        "cover_lede": "%s kritických surovin, na kterých stojí evropský obranný a kosmický průmysl: kdo je ovládá a co se tento týden mění." % twelve.capitalize(),
        "proof": ["Pro každého, bez přihlášení", "Aktualizováno denně", "Citováno v BBC News Chinese"],
        "p2_k": "01 · Co je OreOrbit",
        "p2_h": "Jedna mapa surovin,<br><b>které vaše výrobky potřebují.</b>",
        "p2_b1": ("OreOrbit je veřejný atlas %d kritických surovin, na kterých stojí evropský obranný a kosmický průmysl. "
                  "Ze satelitních a otevřených dat sleduje %d dolů, rafinerií a závodů a %d obchodních tras, spolu s termíny, "
                  "které mohou zastavit dodávku: vývozní kontroly, kvóty a pravidla původu.") % (n_min, n_sites, n_routes),
        "p2_b2": ("Je pro lidi, kteří odpovídají za dodávky: nákup, vývoj, řízení rizik a vedení. Za minutu uvidíte, které suroviny "
                  "výrobek potřebuje, kdo je ovládá a co se tento týden hýbe."),
        "stats": [(n_min, "kritických surovin"), (n_sites, "dolů, rafinerií a závodů sledovaných z oběžné dráhy"),
                  (n_routes, "obchodních tras a úzkých hrdel"),
                  ("%d z %d" % (conc, n_min), "má fázi, kde jedna země drží víc než 65 %")],
        "table_h": "Kde má jedna země největší podíl.",
        "th": ["Surovina", "Nejužší místo", "", "Zdroj"],
        "p3_k": "02 · Glóbus",
        "p3_h": "Každá lokalita a trasa,<br><b>viděná z oběžné dráhy.</b>",
        "p3_cap": "Mittersill v Rakousku, jedna ze %d lokalit: provozovatel, souřadnice, zdroje a satelitní snímky z různých let vedle sebe." % n_sites,
        "p3_zoom": "Galium vybrané z lišty: nejužší místo a zdroj.",
        "p3_cols": [("Lokality", "Doly, rafinerie a závody, každý s provozovatelem, zdroji a posledním jasným satelitním snímkem."),
                    ("Trasy a řeky", "Lodě v úzkých hrdlech, hladiny Rýna a Labe a ozbrojené konflikty poblíž dodavatelského řetězce."),
                    ("Suroviny", "%s surovin je ve spodní liště glóbu. Vyberete jednu a uvidíte jen její lokality a nejužší místo." % twelve.capitalize())],
        "shots_note": "Snímky obrazovky z živého atlasu, %s. Obsahuje upravená data Copernicus Sentinel %d.",
        "p4_k": "03 · Rychlá kontrola",
        "p4_h": "Vyberte, co vyrábíte.<br><b>Uvidíte, co to potřebuje.</b>",
        "p4_lede": ("Drony, munice, optika, radary, obrněná vozidla, letectví a kosmonautika, baterie. U každé suroviny: k čemu ve "
                    "výrobku slouží, nejužší místo, odkud EU dováží a míra rizika, která se mění se zprávami."),
        "p4_cap": "Rychlá kontrola pro drony, %s. Vysoké riziko znamená, že jedna země ovládá víc než 65 %% některé fáze a tento týden se něco děje.",
        "p5_k": "04 · Tento týden",
        "p5_h": "Co se pohnulo<br><b>a co přijde.</b>",
        "p5_cap": "Tento týden nastavený na suroviny v dronech: nejbližší termín, data po něm a co se pohnulo ve zprávách a v satelitních datech.",
        "p5_side_h": "Důkazy v pozadí.",
        "p5_side": ("Sedm živých signálů z otevřených a satelitních dat: dovoz do EU, lodě v úzkých hrdlech, ozbrojené konflikty, "
                    "poptávka evropské obrany, výzkum náhrad, teplo v závodech a oxid siřičitý nad hutěmi. Každý se otevře do plných dat."),
        "p6_k": "05 · Plány",
        "p6_h": "Začněte zdarma. Buďte upozorněni.<br><b>Buďte připraveni.</b>",
        "plans": [
            {"k": "01 · Zdarma", "pr": "0" + NB + "€", "sub": "Pro každého, bez přihlášení.",
             "li": ["Atlas: všechny lokality, trasy a suroviny na glóbu.", "Rychlá kontrola pro váš výrobek.",
                    "Tento týden: nejbližší termíny a zprávy.",
                    "S e-mailem: pondělní přehled pro vaše suroviny a všechny panely živých dat v plném rozsahu."],
             "how": "Začátek: " + ATLAS_SHORT},
            {"k": "02 · Monitoring", "pr": price, "sub": "Platba kartou. Zrušíte kdykoli.", "on": True,
             "li": ["Sledujeme vaše suroviny, jejich lokality a termíny nepřetržitě.",
                    "Ozveme se, když se něco změní, a každé pondělí.",
                    "Jednou měsíčně se nás můžete na cokoli zeptat. Odpoví člověk do dvou pracovních dnů."],
             "fine": "Součástí je týdenní datový soubor pro vaše suroviny.",
             "how": "Začátek: sekce Monitoring v atlasu. Vyberete suroviny a zaplatíte kartou."},
            {"k": "03 · Posouzení připravenosti", "pr": "Na míru", "sub": "Rozsah a cena po bezplatném 30minutovém hovoru.",
             "li": ["Jedna výrobní řada za dva až tři týdny.",
                    "Registr vašich dílů a zátěžové testy proti skutečným vývozním kontrolám.",
                    "Pravidla, která rozhodují, kdo vám smí dodávat.",
                    "Podklady, které vedení podepíše. Podporuje článek 24 nařízení o kritických surovinách."],
             "how": "Začátek: 30minutový hovor, " + book_short}],
        "alerts_h": "O čem se klient monitoringu dozví.",
        "alerts": ["Nové vývozní pravidlo, rozhodnutí o licencích nebo důležitá zpráva k jeho surovinám, ještě týž den.",
                   "Každý termín 30, 14, 7 a 1 den předem.",
                   "Řeka příliš nízko pro nákladní lodě v Kaubu, Duisburgu nebo Drážďanech.",
                   "Závod z jeho seznamu, který podle satelitních dat o teple a oxidu siřičitém utichne nebo se rozjede."],
        "p6_note": "Monitoring zrušíte kdykoli. Když nevidíte přínos, do měsíce vám vrátíme peníze.",
        "p7_k": "06 · Jak začít",
        "p7_h": "Začněte rychlou kontrolou.<br><b>Zabere minutu.</b>",
        "steps": [("Otevřete atlas", ATLAS_SHORT + ", bez přihlášení. Spusťte rychlou kontrolu pro to, co vyrábíte."),
                  ("Odebírejte pondělní přehled", "Nechte e-mail v části Tento týden. Každé pondělí termíny a zprávy pro vaše suroviny."),
                  ("Zvolte, jak daleko jít", "V části Monitoring vyberte suroviny a zaplaťte kartou, nebo si domluvte 30minutový hovor o posouzení připravenosti.")],
        "who_p1": ("Zakladatel Bohemia Defense. Pražský analytik obranného průmyslu, kritických surovin a kosmické ekonomiky "
                   "a autor OreOrbit."),
        "who_p2": ("Dříve ekonomická diplomacie na Ministerstvu zahraničních věcí ČR a exportní poradenství v CzechTrade, kde "
                   "založil neformální klastr Chytrá bezpečnost dvanácti firem z bezpečnostního průmyslu. Jako analytika ho "
                   "citovala čínská služba BBC News."),
        "ct": ["E-mail", "Hovor", "Atlas", "Analýzy"],
        "book_label": "30 minut, " + book_short,
        "id_line": "%s · IČO %s" % (c["company"], c["companyId"]),
        "copernicus": "Obsahuje upravená data Copernicus Sentinel %d.",
    }


def czify(obj):
    if isinstance(obj, str):
        return cz(obj)
    if isinstance(obj, list):
        return [czify(x) for x in obj]
    if isinstance(obj, tuple):
        return tuple(czify(x) for x in obj)
    if isinstance(obj, dict):
        return {k: czify(v) for k, v in obj.items()}
    return obj


# ---------------------------------------------------------------- pages

def img(lang, name):
    p = IMG / ("%s-%s.jpg" % (lang, name))
    if not p.exists():
        sys.exit("missing screenshot %s (run with --shots)" % p)
    return p.as_uri()


def top(right=""):
    return ('<div class="top"><div class="brand">%s<b>OreOrbit</b><span>· Bohemia Defense</span></div><div>%s</div></div>'
            % (SIGNET, right))


def foot(left, right):
    return '<div class="foot"><span>%s</span><span>%s</span></div>' % (left, right)


def build_html(lang):
    c, r = read_config(), read_reference()
    (dark, light), symbols, mat_cs = read_atlas_tables()
    t = copy(lang, c, r)
    if lang == "cs":
        t = czify(t)
    sd, today = shots_date(), dt.date.today()
    shots_note = t["shots_note"] % (day(sd, lang), sd.year)
    pages = []

    # 1 cover
    pages.append(
        '<section class="page dark cover">%s<div class="head"><p class="k">%s</p><h1>%s</h1><p class="lede">%s</p></div>'
        '<div class="shot"><img src="%s" alt=""></div><div class="proof">%s</div>%s</section>'
        % (top(), t["cover_k"], t["cover_h"], t["cover_lede"], img(lang, "globe"),
           "".join("<span>%s</span>" % x for x in t["proof"]),
           foot(t["foot"], '<a href="%s">%s</a> · %s' % (ATLAS, ATLAS_SHORT, month(today, lang)))))

    # 2 what it is
    rows = []
    for m in r["order"]:
        w = r["worst"][m]
        name = mat_cs.get(m, r["name_en"][m]) if lang == "cs" else r["name_en"][m]
        width = (w["x"]["pct"] if w and isinstance(w["x"].get("pct"), (int, float)) else 0)
        rows.append('<tr style="--c:%s;--cl:%s"><td class="sym"><i>%s</i></td><td class="nm">%s</td><td class="st">%s</td>'
                    '<td class="bar"><u><s style="width:%d%%"></s></u></td><td class="src">%s</td></tr>'
                    % (dark.get(m, "#eceee9"), light.get(m, dark.get(m, "#13171a")), html.escape(symbols.get(m, m.title())), html.escape(name),
                       stage_text(w, lang), width, note_text(w, lang)))
    th = t["th"]
    pages.append(
        '<section class="page light">%s<div class="head"><p class="k">%s</p><h2>%s</h2></div>'
        '<p class="body">%s</p><p class="body">%s</p>'
        '<div class="stats">%s</div><h3>%s</h3>'
        '<table class="mt"><thead><tr><th></th><th>%s</th><th>%s</th><th>%s</th><th style="text-align:right">%s</th></tr></thead>'
        '<tbody>%s</tbody></table>%s</section>'
        % (top(), t["p2_k"], t["p2_h"], t["p2_b1"], t["p2_b2"],
           "".join("<div><b>%s</b><span>%s</span></div>" % s for s in t["stats"]), t["table_h"],
           th[0], th[1], th[2], th[3], "".join(rows), foot(t["foot"], "02")))

    # 3 globe
    pages.append(
        '<section class="page light">%s<div class="head"><p class="k">%s</p><h2>%s</h2></div>'
        '<div class="shot"><img src="%s" alt=""></div><p class="cap">%s</p>'
        '<div class="zoomrow"><div><div class="shot zoom"><img src="%s" alt=""></div><p class="cap">%s</p></div>'
        '<div class="notes">%s</div></div>%s</section>'
        % (top(), t["p3_k"], t["p3_h"], img(lang, "site"), t["p3_cap"], img(lang, "panel"), t["p3_zoom"],
           "".join("<div><h3>%s</h3><p>%s</p></div>" % x for x in t["p3_cols"]),
           foot(shots_note, "03")))

    # 4 quick check
    pages.append(
        '<section class="page light">%s<div class="head"><p class="k">%s</p><h2>%s</h2><p class="lede">%s</p></div>'
        '<div class="shot"><img src="%s" alt=""></div><p class="cap">%s</p>%s</section>'
        % (top(), t["p4_k"], t["p4_h"], t["p4_lede"], img(lang, "check"), t["p4_cap"] % day(sd, lang),
           foot(t["foot"], "04")))

    # 5 this week
    pages.append(
        '<section class="page light">%s<div class="head"><p class="k">%s</p><h2>%s</h2></div>'
        '<div class="shot"><img src="%s" alt=""></div><p class="cap">%s</p>'
        '<div style="display:grid;grid-template-columns:1.45fr 1fr;gap:7mm;margin-top:6mm;align-items:start">'
        '<div class="shot"><img src="%s" alt=""></div><div><h3>%s</h3><p class="cap" style="margin:0">%s</p></div></div>%s</section>'
        % (top(), t["p5_k"], t["p5_h"], img(lang, "monday"), t["p5_cap"], img(lang, "signals"),
           t["p5_side_h"], t["p5_side"], foot(t["foot"], "05")))

    # 6 plans (dark)
    cols = []
    for p in t["plans"]:
        cols.append('<div class="plan%s"><p class="pk">%s</p><p class="pr">%s</p><p class="ps">%s</p><ul>%s</ul>%s<p class="how">%s</p></div>'
                    % (" on" if p.get("on") else "", p["k"], p["pr"], p["sub"], "".join("<li>%s</li>" % x for x in p["li"]),
                       ('<p class="fine">%s</p>' % p["fine"]) if p.get("fine") else "", p["how"]))
    pages.append(
        '<section class="page dark">%s<div class="head"><p class="k">%s</p><h2>%s</h2></div>'
        '<div class="plans">%s</div><div class="alerts"><h3>%s</h3><ul>%s</ul></div><p class="note">%s</p>%s</section>'
        % (top(), t["p6_k"], t["p6_h"], "".join(cols), t["alerts_h"], "".join("<li>%s</li>" % x for x in t["alerts"]),
           t["p6_note"], foot(t["foot"], "06")))

    # 7 how to start + contact
    ct = t["ct"]
    pages.append(
        '<section class="page light">%s<div class="head"><p class="k">%s</p><h2>%s</h2></div>'
        '<ol class="steps">%s</ol>'
        '<div class="who"><img src="%s" alt="David Madali"><div><h3>David Madali</h3><p>%s</p><p>%s</p></div></div>'
        '<div class="contact">'
        '<div><span class="ck">%s</span><a href="mailto:%s">%s</a></div>'
        '<div><span class="ck">%s</span><a href="%s">%s</a></div>'
        '<div><span class="ck">%s</span><a href="%s">%s</a></div>'
        '<div><span class="ck">%s</span><a href="https://%s/">%s</a></div>'
        '<div class="wide">%s</div></div>%s</section>'
        % (top(), t["p7_k"], t["p7_h"],
           "".join('<li><span class="n">%02d</span><h3>%s</h3><p>%s</p></li>' % (i + 1, a, b) for i, (a, b) in enumerate(t["steps"])),
           (IMG / "david-madali.jpg").as_uri(), t["who_p1"], t["who_p2"],
           ct[0], EMAIL, EMAIL, ct[1], html.escape(c["bookingUrl"]), t["book_label"], ct[2], ATLAS, ATLAS_SHORT,
           ct[3], SITE_SHORT, SITE_SHORT, t["id_line"], foot(t["copernicus"] % sd.year, "07")))

    fonts = (ROOT / "atlas" / "fonts" / "fonts.css").read_text(encoding="utf-8")
    fonts = fonts.replace("url(", "url(" + (ROOT / "atlas" / "fonts").as_uri() + "/")
    css = (HERE / "manual.css").read_text(encoding="utf-8")
    return ('<!doctype html><html lang="%s"><head><meta charset="utf-8"><title>%s</title><style>%s\n%s</style></head><body>%s</body></html>'
            % (lang, t["title"], fonts, css, "".join(pages)))


# ---------------------------------------------------------------- screenshots and PDF

BOX_JS = """([w, t, b]) => {
  const inner = document.querySelector(w), a = document.querySelector(t), z = document.querySelector(b);
  if (!inner || !a || !z) return null;
  const ra = a.getBoundingClientRect(), rz = z.getBoundingClientRect(), ri = inner.getBoundingClientRect();
  const pad = 40, y0 = ra.top + scrollY - pad, y1 = rz.bottom + scrollY + 16;   // tight below: the next block may hold a price
  const x0 = Math.max(0, ri.left - pad), x1 = Math.min(document.documentElement.clientWidth, ri.right + pad);
  return {x: x0, y: y0, width: x1 - x0, height: y1 - y0};
}"""
# name: (box that sets left and right, element at the top, element at the bottom). The quick check starts at the
# product buttons and stops above the plan line; This week stops above the Monday brief sign-up.
CROPS = [("check", "#check .inner", "#check .qc-p", "#check .qc-key"),
         ("monday", "#monday .inner", "#monday .sec-head", "#monday .wk2"),
         ("signals", "#signals .inner", "#signals .sec-head", "#signals .inner")]


def capture(langs):
    from playwright.sync_api import sync_playwright
    args = ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]
    with sync_playwright() as p:
        b = p.chromium.launch(args=args)
        for lang in langs:
            url = ATLAS + ("?lang=cs" if lang == "cs" else "")
            ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1.25)
            pg = ctx.new_page()
            pg.goto(url, wait_until="load", timeout=90000)
            pg.wait_for_timeout(8000)
            pg.evaluate("document.querySelector('#cta-explore').click()")
            pg.wait_for_timeout(8000)
            pg.screenshot(path=str(IMG / ("%s-globe.jpg" % lang)), type="jpeg", quality=JPEG_Q)
            pg.evaluate("document.querySelector('#open-search').click()")
            pg.wait_for_timeout(800)
            pg.fill("#search-input", SITE_SEARCH)
            pg.wait_for_timeout(1000)
            pg.keyboard.press("Enter")
            pg.wait_for_timeout(8000)
            pg.screenshot(path=str(IMG / ("%s-site.jpg" % lang)), type="jpeg", quality=JPEG_Q)
            pg.evaluate("document.querySelector('#filters .el[data-m=\"%s\"]').click()" % MINERAL)
            pg.wait_for_timeout(7000)
            pg.locator("#panel").screenshot(path=str(IMG / ("%s-panel.jpg" % lang)), type="jpeg", quality=JPEG_Q)
            pg.goto(url, wait_until="load", timeout=90000)
            pg.wait_for_timeout(6000)
            pg.add_style_tag(content="#nav{display:none!important}")
            pg.evaluate("document.querySelector('.qc-p[data-p=\"%s\"]').click()" % PRODUCT)
            pg.wait_for_timeout(1500)
            for name, w, a, z in CROPS:
                el = pg.query_selector(a)
                if el:
                    el.scroll_into_view_if_needed()
                    pg.wait_for_timeout(1500)
                box = pg.evaluate(BOX_JS, [w, a, z])
                if not box:
                    sys.exit("screenshot %s: %s or %s not found on the atlas" % (name, a, z))
                pg.screenshot(path=str(IMG / ("%s-%s.jpg" % (lang, name))), type="jpeg", quality=JPEG_Q, full_page=True, clip=box)
            errs = pg.evaluate("(window.ooErrs || []).length")
            print("captured %s (atlas errors: %s)" % (lang, errs))
            ctx.close()
        b.close()
    (IMG / "shots.json").write_text(json.dumps({"date": dt.date.today().isoformat(), "from": ATLAS}) + "\n", encoding="utf-8")


def render(langs, out_dir, keep_html):
    from playwright.sync_api import sync_playwright
    out_dir.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p, tempfile.TemporaryDirectory() as td:
        b = p.chromium.launch()
        for lang in langs:
            src = build_html(lang)
            f = (out_dir if keep_html else Path(td)) / ("OreOrbit-guide-%s.html" % lang)
            f.write_text(src, encoding="utf-8")
            pg = b.new_page()
            pg.goto(f.as_uri(), wait_until="load")
            pg.evaluate("document.fonts.ready.then(() => true)")
            over = pg.evaluate("""[...document.querySelectorAll('.page')].map((p, i) => {
                const f = p.querySelector('.foot'), r = p.getBoundingClientRect();
                const below = [...p.children].filter(c => c !== f).some(c => c.getBoundingClientRect().bottom > f.getBoundingClientRect().top + 1);
                return (p.scrollHeight > p.clientHeight + 1 || below) ? i + 1 : 0; }).filter(Boolean)""")
            if over:
                sys.exit("%s: content runs into the footer on page(s) %s" % (lang, over))
            out = out_dir / OUT_NAME[lang]
            pg.pdf(path=str(out), prefer_css_page_size=True, print_background=True)
            pg.close()
            print("wrote %s (%d kB)" % (out.relative_to(ROOT) if out.is_relative_to(ROOT) else out, out.stat().st_size // 1024))
        b.close()


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--lang", choices=["en", "cs"], action="append", help="build one language (default: both)")
    ap.add_argument("--shots", action="store_true", help="take fresh screenshots of the live atlas first")
    ap.add_argument("--html", action="store_true", help="keep the HTML next to the PDF")
    ap.add_argument("--out", default=str(HERE), help="output folder (default: docs/sales)")
    a = ap.parse_args()
    langs = a.lang or ["en", "cs"]
    if a.shots:
        capture(langs)
    render(langs, Path(a.out).resolve(), a.html)


if __name__ == "__main__":
    main()
