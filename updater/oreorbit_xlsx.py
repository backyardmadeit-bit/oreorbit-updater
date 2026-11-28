"""The weekly Excel attachment for paying Monitoring clients, in the brand-book style.

build(...) returns the .xlsx file as bytes. Sheets: overview (China's share of EU imports per mineral as in the Dependency Index,
top suppliers, 12-month trend chart), EU imports by month and product, satellite signals at the sites, the raw data
(the same rows as the CSV attachment) and sources. The robot attaches it next to the CSV; if anything here fails,
the client still gets the CSV (see _data_files in oreorbit_update.py).
"""
import csv
import datetime as dt
import io
import re
from pathlib import Path

import xlsxwriter
from xlsxwriter.utility import xl_col_to_name

COL = {"ree": "#a78bfa", "ti": "#fb923c", "w": "#facc15", "sb": "#a9b8cc", "mg": "#2dd4bf", "mn": "#e879f9", "ga": "#22d3ee",
       "ge": "#4ade80", "li": "#f472b6", "co": "#60a5fa", "ni": "#a3e635", "gr": "#e4e4e7"}
LINE = {"w": "#d4a90a", "sb": "#7f8ea3", "gr": "#9b9ba3"}        # the light mineral colours get a darker line on white
SYM = {"ree": "Nd", "ti": "Ti", "w": "W", "sb": "Sb", "mg": "Mg", "mn": "Mn", "ga": "Ga", "ge": "Ge", "li": "Li", "co": "Co", "ni": "Ni", "gr": "C"}
INK, PAPER, GREEN, GREEN_D, MUT, RULE, CARD, BAND_MUT = "#050607", "#eceee9", "#3ddc97", "#0f6b46", "#5f655d", "#d6d9d2", "#f4f5f2", "#9aa097"
FONT = "Arial"
NB = " "
THIN_EUR = 3_000_000          # under this, a 3-month window is a thin one: shares swing
NM = 12                       # months shown on the overview trend and the imports sheet
LOGO = Path(__file__).resolve().parent / "assets" / "logo-oreorbit-360.png"
STAGE = {"Mine": ("Mine", "Důl"), "Processing": ("Processing", "Zpracování"), "Magnets": ("Magnets", "Výroba magnetů"), "Planned": ("Planned", "Plánovaný projekt")}
MON_CS = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"]
MON_CS_GEN = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"]
MON_CS_S = ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"]
MON_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
EU_CS = {"Austria": "Rakousko", "Belgium": "Belgie", "Czechia": "Česko", "Estonia": "Estonsko", "Finland": "Finsko", "Greece": "Řecko",
         "Portugal": "Portugalsko", "Sweden": "Švédsko"}


def nb(s):
    """Czech typography: non-breaking space after single-letter words and before %, € and p. b."""
    for _ in range(2):
        s = re.sub(r"(^|[\s(„])([vkszaiouVKSZAIOU]) ", "\\1\\2" + NB, s)
    return re.sub(r" (%|€|p\. b\.)", NB + "\\1", s)


def months(f, n):
    y, m = int(f[:4]), int(f[5:7])
    return ["%d-%02d" % (y + (m - 1 + i) // 12, (m - 1 + i) % 12 + 1) for i in range(n)]


def _num(x):
    try:
        f = float(x)
        return int(f) if f.is_integer() and "." not in str(x) else f
    except (TypeError, ValueError):
        return x


def aggregate(trade, mins):
    """Per mineral: monthly extra-EU and China values summed over its products, the 3-month window, top suppliers, rolling share."""
    agg = {}
    for m in mins:
        rows = [r for r in trade.get(m) or [] if (r.get("monthly") or {}).get("from") and (r["monthly"].get("ext") or [])]
        if not rows:
            continue
        keys = sorted({k for r in rows for k in months(r["monthly"]["from"], len(r["monthly"]["ext"]))})
        ks = months(keys[0], int(keys[-1][:4]) * 12 + int(keys[-1][5:7]) - int(keys[0][:4]) * 12 - int(keys[0][5:7]) + 1)
        n, ix = len(ks), {k: i for i, k in enumerate(ks)}
        ext, cn, by = [0.0] * n, [0.0] * n, {}
        for r in rows:
            mo = r["monthly"]
            rk = months(mo["from"], len(mo["ext"]))
            for j, k in enumerate(rk):
                ext[ix[k]] += mo["ext"][j] or 0
                cn[ix[k]] += ((mo.get("cn") or [])[j:j + 1] or [0])[0] or 0
            for p, v in (mo.get("by") or {}).items():
                acc = by.setdefault(p, [0.0] * n)
                for j, x in enumerate(v[:len(rk)]):
                    acc[ix[rk[j]]] += x or 0
        e3, c3, e3p, c3p = sum(ext[-3:]), sum(cn[-3:]), sum(ext[-6:-3]), sum(cn[-6:-3])
        top = sorted(((p, sum(v[-3:]) / e3) for p, v in by.items() if e3 and sum(v[-3:]) > 0), key=lambda x: -x[1])[:3]
        roll = []
        for i in range(n):
            se = sum(ext[max(0, i - 2):i + 1])
            roll.append(sum(cn[max(0, i - 2):i + 1]) / se if se else None)
        agg[m] = dict(rows=rows, ks=ks, ext=ext, cn=cn, e3=e3, c3=c3, s3=c3 / e3 if e3 else None,
                      s3p=c3p / e3p if e3p else None, top=top, roll=dict(zip(ks, roll)), thin=e3 < THIN_EUR)
    return agg


def build(trade, hs_file, so_file, sites, mins, lang, week, csv_text, mat_name, trade_cs, cc_en, cc_cs, logo_path=LOGO, dep=None):
    """The workbook as bytes. trade = trade.json "materials"; hs_file / so_file = hotspots.json / so2.json; sites = config sites;
    mins = the client's minerals (empty: all); week = the edition's Monday (ISO date); csv_text = the CSV attachment;
    dep = oreorbit_pages.dependency_series(...): when given, China's share, its change and trend are the index numbers, so the
    workbook says what the email, the atlas and the library pages say."""
    CS = lang == "cs"
    MINS = [m for m in (mins or list(mat_name)) if m in mat_name]
    wk = dt.date.fromisoformat(str(week)[:10])
    en_cc = {v: k for k, v in cc_en.items()}

    def T(cs, en):
        return nb(cs) if CS else en

    def mname(m):
        return mat_name[m][1 if CS else 0]

    def plabel(r):
        lab = r.get("label") or ""
        if not CS:
            return lab
        t = trade_cs.get(lab, lab)
        return t[:1].upper() + t[1:]

    def cname(cc):
        return (cc_cs if CS else cc_en).get(cc, cc)

    def ctry(name):
        cc = en_cc.get(name)
        return cname(cc) if cc else (EU_CS.get(name, name) if CS else name)

    def mlabel(k, gen=False):
        y, m = int(k[:4]), int(k[5:7])
        return "%s %d" % ((MON_CS_GEN if gen else MON_CS)[m - 1], y) if CS else "%s %d" % (MON_EN[m - 1], y)

    def mshort(k):
        m = int(k[5:7])
        return "%s ’%s" % (MON_CS_S[m - 1] if CS else MON_EN[m - 1][:3], k[2:4])

    def pct(x):
        return ("%.0f" % (100 * x)) + (NB + "%" if CS else "%")

    agg = aggregate(trade, MINS)
    AM = [m for m in MINS if m in agg]                     # minerals with trade data, in the client's order
    last = max(v["ks"][-1] for v in agg.values()) if agg else None
    KS = []
    if last:
        y, mm = int(last[:4]), int(last[5:7])
        first = "%d-%02d" % (y + (mm - NM) // 12, (mm - NM) % 12 + 1)
        KS = months(first, NM)                              # the last 12 months, the same for every mineral
    DEP = [x for x in (dep or []) if x.get("month")]
    ilast = last
    if DEP:
        DI = {x["month"]: x for x in DEP}

        def ish(rec, m):
            v = ((rec or {}).get("per") or {}).get(m)
            return ((rec or {}).get("extra") or {}).get(m) if v is None else v
        dl, dp = DEP[-1], (DEP[-4] if len(DEP) >= 4 else None)
        ilast = dl["month"]
        for m in AM:
            w = int((dl.get("win") or {}).get(m) or 3)
            agg[m].update(s3=ish(dl, m), s3p=ish(dp, m), win=w, thin=w > 3, roll={k: ish(DI.get(k), m) for k in KS})

    buf = io.BytesIO()
    wb = xlsxwriter.Workbook(buf, {"in_memory": True})
    wb.set_properties({"title": T("OreOrbit · týdenní data", "OreOrbit · weekly data"), "author": "Bohemia Defense", "company": "Bohemia Defense"})
    wb.set_size(1500, 1000)

    def F(**k):
        base = {"font_name": FONT, "font_size": 10, "font_color": INK, "valign": "vcenter"}
        base.update(k)
        return wb.add_format(base)

    band = F(bg_color=INK, font_color=PAPER)
    band_t = F(bg_color=INK, font_color=PAPER, font_size=18)
    band_s = F(bg_color=INK, font_color=BAND_MUT, font_size=10)
    band_r = F(bg_color=INK, font_color=GREEN, font_size=9, align="right")
    band_rs = F(bg_color=INK, font_color=BAND_MUT, font_size=9, align="right")
    h_lead = F(font_size=13, text_wrap=True, valign="top")
    lab = F(font_size=9, font_color=MUT)
    th = F(bold=True, font_size=9, bg_color=PAPER, bottom=1, bottom_color=INK, text_wrap=True, valign="bottom")
    th_r = F(bold=True, font_size=9, bg_color=PAPER, bottom=1, bottom_color=INK, text_wrap=True, valign="bottom", align="right")
    td = F(bottom=1, bottom_color=RULE)
    td_b = F(bottom=1, bottom_color=RULE, bold=True)
    td_m = F(bottom=1, bottom_color=RULE, font_color=MUT, font_size=9, text_wrap=True)
    td_eur = F(bottom=1, bottom_color=RULE, num_format=('#,##0.0,,"%smil.%s€"' % (NB, NB)) if CS else '"€"#,##0.0,,"m"')
    td_k = F(bottom=1, bottom_color=RULE, num_format="#,##0,")
    td_pct = F(bottom=1, bottom_color=RULE, num_format=('0"%s"%%' % NB) if CS else "0%", bold=True)
    td_pct1 = F(bottom=1, bottom_color=RULE, num_format=('0.0"%s"%%' % NB) if CS else "0.0%")
    td_pp = F(bottom=1, bottom_color=RULE, font_color=MUT,
              num_format=('+0" p. b.";−0" p. b.";0" p. b."'.replace(" ", NB)) if CS else '+0" pp";−0" pp";0" pp"')
    note = F(font_size=9, font_color=MUT, text_wrap=True, valign="top")
    foot = F(font_size=8, font_color=MUT)
    link = F(font_size=9, font_color=GREEN_D, underline=1)
    sec = F(bold=True, font_size=10, bottom=1, bottom_color=INK)
    chip = {m: F(bg_color=COL.get(m, MUT), bottom=1, bottom_color=RULE) for m in MINS}
    grp = {m: F(bold=True, bg_color=CARD, top=1, top_color=INK) for m in MINS}
    grp_chip = {m: F(bg_color=COL.get(m, MUT), top=1, top_color=INK) for m in MINS}
    logo = Path(logo_path).read_bytes() if logo_path and Path(logo_path).is_file() else None

    def header(ws, ncol, title, sub, tcol=4):
        ws.hide_gridlines(2)
        for r, h in ((0, 14), (1, 30), (2, 18), (3, 14)):
            ws.set_row(r, h, band)
        if logo:
            ws.insert_image(1, 1, "logo.png", {"image_data": io.BytesIO(logo), "x_scale": 0.5, "y_scale": 0.5, "y_offset": 2, "object_position": 3})
        else:
            ws.write(1, 1, "OreOrbit", F(bg_color=INK, font_color=PAPER, font_size=14, bold=True))
        ws.write(1, tcol, title, band_t)
        ws.write(2, tcol, sub, band_s)
        ws.write(1, ncol - 1, T("Týdenní data", "Weekly data"), band_r)
        ws.write(2, ncol - 1, T("týden od %d. %d. %d" % (wk.day, wk.month, wk.year), "week of %d %s %d" % (wk.day, MON_EN[wk.month - 1], wk.year)), band_rs)

    def footer(ws, r):
        ws.write(r, 1, T("David Madali · Bohemia Defense · IČO 22229957 · bohemiadefense.com/atlas · Data pro vaši interní potřebu.",
                         "David Madali · Bohemia Defense · IČO 22229957 · bohemiadefense.com/atlas · Data for your internal use."), foot)

    def page(ws, tall=False):
        ws.set_landscape(); ws.set_paper(9); ws.set_margins(0.4, 0.4, 0.4, 0.4)
        ws.fit_to_pages(1, 0 if tall else 1)

    ser = None
    ser_row = [0]

    def series(vals):
        """A row on the hidden _series sheet (sparklines and the chart read from it); returns its 0-based row."""
        nonlocal ser
        if ser is None:
            ser = wb.add_worksheet("_series"); ser.hide()
        r = ser_row[0]; ser_row[0] += 1
        ser.write_row(r, 0, vals)
        return r

    win_txt = T("3 měsíce do %s" % mlabel(ilast, True), "3 months to %s" % mlabel(ilast)) if ilast else ""

    # ---------- sheet 1: overview ----------
    ws = wb.add_worksheet(T("Přehled", "Overview"))
    ws.set_column(0, 0, 2); ws.set_column(1, 1, 1.3); ws.set_column(2, 2, 18); ws.set_column(3, 6, 13); ws.set_column(7, 7, 11)
    ws.set_column(8, 8, 40); ws.set_column(9, 9, 16)
    header(ws, 10, T("Dovoz vašich surovin do EU.", "EU imports of your minerals."),
           T("Suroviny: ", "Minerals: ") + ", ".join(mname(m) for m in MINS)
           + ((" · " + T("data Eurostatu do %s" % mlabel(last, True), "Eurostat data to %s" % mlabel(last))) if last else ""))
    nr = 8
    if AM:
        ch = sorted(((m, agg[m]["s3"] - agg[m]["s3p"]) for m in AM if agg[m]["s3"] is not None and agg[m]["s3p"] is not None and (DEP or not agg[m]["thin"])),
                    key=lambda x: -abs(x[1]))
        if ch and abs(ch[0][1]) >= 0.02:
            m, d = ch[0]
            lead = T("%s: podíl Číny na dovozu do EU %s z %s na %s (%s proti předchozím třem)." % (mname(m), "klesl" if d < 0 else "stoupl", pct(agg[m]["s3p"]), pct(agg[m]["s3"]), win_txt),
                     "%s: China's share of EU imports %s from %s to %s (%s against the three before)." % (mname(m), "fell" if d < 0 else "rose", pct(agg[m]["s3p"]), pct(agg[m]["s3"]), win_txt))
        else:
            lead = T("Podíly Číny se u vašich surovin za posledních %s výrazně nezměnily." % win_txt, "China's shares for your minerals did not change much over the %s." % win_txt)
        ws.set_row(5, 36); ws.merge_range(5, 1, 5, 9, lead, h_lead)
        if DEP:
            ws.write(6, 1, T("Podíl Číny jako v Indexu závislosti: klíčové produkty, okno %s (při malém objemu delší). Sloupce dovozu sčítají všechny sledované produkty za 3 měsíce do %s." % (win_txt, mlabel(last, True)),
                             "China's share as in the Dependency Index: key products, window %s (longer where trade is thin). The import columns add up all tracked products, 3 months to %s." % (win_txt, mlabel(last))), lab)
        else:
            ws.write(6, 1, T("Okno: %s. Hodnota dovozu z celního původu mimo EU. Pruh ukazuje podíl Číny." % win_txt,
                             "Window: %s. Value of imports by customs origin outside the EU. The bar shows China's share." % win_txt), lab)
        r0 = 8
        ws.set_row(r0, 30)
        heads = [T("Surovina", "Mineral"), T("Dovoz mimo EU, všechny produkty", "Extra-EU imports, all products"), T("Z Číny, všechny produkty", "From China, all products"),
                 T("Podíl Číny (index)", "China's share (index)") if DEP else T("Podíl Číny", "China's share"),
                 T("O 3 měsíce dříve", "3 months earlier") if DEP else T("Předchozí 3 měsíce", "Previous 3 months"), T("Změna", "Change"), (T("Největší dodavatelé, všechny produkty", "Biggest suppliers, all products") if DEP else T("Největší dodavatelé (podíl na hodnotě)", "Biggest suppliers (share of value)")),
                 T("Trend podílu Číny, 12 měsíců", "China's share, 12-month trend")]
        ws.write(r0, 1, "", th)
        for i, h in enumerate(heads):
            ws.write(r0, 2 + i, h, th_r if 1 <= i <= 5 else th)
        r = r0 + 1
        srows = {}
        for m in AM:
            v = agg[m]
            ws.set_row(r, 24)
            ws.write(r, 1, "", chip[m])
            ws.write(r, 2, "%s  %s" % (SYM.get(m, m), mname(m)), td_b)
            ws.write_number(r, 3, v["e3"], td_eur); ws.write_number(r, 4, v["c3"], td_eur)
            ws.write_number(r, 5, v["s3"] or 0, td_pct)
            if v["s3p"] is not None:
                ws.write_number(r, 6, v["s3p"], td_pct1)
                ws.write_number(r, 7, round(100 * ((v["s3"] or 0) - v["s3p"])), td_pp)
            else:
                ws.write(r, 6, "", td); ws.write(r, 7, "", td)
            tops = ", ".join("%s %s" % (cname(p), pct(s)) for p, s in v["top"])
            if v["thin"] and v.get("win"):
                tops += T(" · delší okno (%d měsíců), malý objem obchodu" % v["win"], " · %d-month window, thin trade" % v["win"])
            elif v["thin"]:
                tops += T(" · nízký objem, podíly kolísají", " · thin month, shares swing")
            ws.write(r, 8, tops, td_m)
            ws.write(r, 9, "", td)
            srows[m] = series([v["roll"].get(k) if v["roll"].get(k) is not None else "" for k in KS])
            ws.add_sparkline(r, 9, {"range": "_series!A%d:%s%d" % (srows[m] + 1, xl_col_to_name(len(KS) - 1), srows[m] + 1),
                                    "series_color": INK, "last_point": True, "last_color": GREEN_D, "min": 0, "max": 1, "weight": 1.25})
            r += 1
        ws.conditional_format(r0 + 1, 5, r - 1, 5, {"type": "data_bar", "bar_color": "#b9c2b5", "bar_solid": True, "min_type": "num", "min_value": 0,
                                                    "max_type": "num", "max_value": 1, "bar_no_border": True, "data_bar_2010": True})
        crow = r + 2
        ws.write(crow, 1, T("Podíl Číny na dovozu do EU podle Indexu závislosti, po měsících", "China's share of EU imports in the Dependency Index, month by month") if DEP else
                 T("Podíl Číny na dovozu do EU, klouzavé tříměsíční okno", "China's share of EU imports, rolling 3-month window"), sec)
        for c in range(2, 10):
            ws.write(crow, c, "", sec)
        cat = series([mshort(k) for k in KS])
        chart = wb.add_chart({"type": "line"})
        for m in AM:
            chart.add_series({"name": "%s %s" % (SYM.get(m, m), mname(m)), "categories": ["_series", cat, 0, cat, len(KS) - 1],
                              "values": ["_series", srows[m], 0, srows[m], len(KS) - 1],
                              "line": {"color": LINE.get(m, COL.get(m, INK)), "width": 2.25}, "smooth": False})
        chart.show_blanks_as("gap")
        chart.set_y_axis({"min": 0, "max": 1, "num_format": "0%", "major_gridlines": {"visible": True, "line": {"color": RULE, "width": 0.5}},
                          "line": {"none": True}, "num_font": {"name": FONT, "size": 8, "color": MUT}})
        chart.set_x_axis({"num_font": {"name": FONT, "size": 8, "color": MUT}, "line": {"color": INK, "width": 0.75}, "major_tick_mark": "none"})
        chart.set_legend({"position": "bottom", "font": {"name": FONT, "size": 9, "color": INK}})
        chart.set_chartarea({"border": {"none": True}}); chart.set_plotarea({"border": {"none": True}})
        chart.set_size({"width": 1010, "height": 300})
        ws.insert_chart(crow + 1, 1, chart, {"x_offset": 2, "y_offset": 6})
        nr = crow + 17
        ws.merge_range(nr, 1, nr + 1, 9, T("Jak číst: podíl je hodnota dovozu z Číny dělená hodnotou veškerého dovozu klíčových produktů dané suroviny z celního původu mimo EU. Měří přímý dovoz, ne těžbu ani rafinaci, takže zboží zpracované jinde se počítá zemi, odkud bylo dovezeno. Podrobná data po měsících a produktech jsou na dalších listech.",
                                           "How to read it: the share is the value of imports from China divided by the value of all imports of that mineral's key products by customs origin outside the EU. It measures direct imports, not mining or refining, so material processed elsewhere counts for the country it was shipped from. Monthly data by product is on the next sheets."), note)
        nr += 3
    else:
        ws.set_row(5, 36)
        ws.merge_range(5, 1, 5, 9, T("Pro vaše suroviny zatím nemáme data o dovozu do EU. Satelitní signály u lokalit jsou na listu Lokality.",
                                     "We have no EU import data for your minerals yet. Satellite signals at the sites are on the Sites sheet."), h_lead)
    ws.write_url(nr, 1, "https://bohemiadefense.com/atlas/p/dependency-index%s.html" % ("-cs" if CS else ""), link,
                 T("Index závislosti a metodika na webu", "Dependency Index and method on the web"))
    footer(ws, nr + 2)
    page(ws); ws.activate()

    # ---------- sheet 2: EU imports by month ----------
    if AM:
        w2 = wb.add_worksheet(T("Dovoz do EU", "EU imports"))
        nm = len(KS)
        w2.set_column(0, 0, 2); w2.set_column(1, 1, 1.3); w2.set_column(2, 2, 34); w2.set_column(3, 3, 16); w2.set_column(4, 4, 12); w2.set_column(5, 4 + nm, 9)
        header(w2, 5 + nm, T("Dovoz do EU po měsících a produktech.", "EU imports by month and product."),
               T("Eurostat Comext · tisíce eur · posledních 12 měsíců", "Eurostat Comext · thousand euros · last 12 months"))
        hr = 5
        w2.set_row(hr, 30)
        w2.write(hr, 1, "", th)
        for c, h in enumerate([T("Produkt (kód KN)", "Product (CN code)"), T("Ukazatel", "Measure"), T("Trend", "Trend")]):
            w2.write(hr, 2 + c, h, th)
        for i, k in enumerate(KS):
            w2.write(hr, 5 + i, mshort(k), th_r)
        w2.freeze_panes(hr + 1, 5)
        r = hr + 1
        qname = "'%s'" % w2.name
        for m in AM:
            w2.write(r, 1, "", grp_chip[m]); w2.write(r, 2, "%s  %s" % (SYM.get(m, m), mname(m)), grp[m])
            for c in range(3, 5 + nm):
                w2.write(r, c, "", grp[m])
            r += 1
            for row in agg[m]["rows"]:
                mo = row["monthly"]
                rk = months(mo["from"], len(mo["ext"]))
                e_by, c_by = dict(zip(rk, mo["ext"])), dict(zip(rk, mo.get("cn") or []))
                ext = [e_by.get(k) for k in KS]
                cn = [c_by.get(k) for k in KS]
                shr = [(c / e) if (e and c is not None) else None for c, e in zip(cn, ext)]
                for n_, (kind, vals, fmt) in enumerate(((T("Mimo EU", "Extra-EU"), ext, td_k), (T("Z Číny", "From China"), cn, td_k),
                                                        (T("Podíl Číny", "China's share"), shr, td_pct1))):
                    w2.write(r, 1, "", chip[m])
                    w2.write(r, 2, "%s (%s)" % (plabel(row), row.get("code") or "") if n_ == 0 else "", td)
                    w2.write(r, 3, kind, td_m)
                    w2.write(r, 4, "", td)
                    for i, x in enumerate(vals):
                        if x is None:
                            w2.write(r, 5 + i, "", td)
                        else:
                            w2.write_number(r, 5 + i, x, fmt)
                    w2.add_sparkline(r, 4, {"range": "%s!F%d:%s%d" % (qname, r + 1, xl_col_to_name(4 + nm), r + 1),
                                            "series_color": "#8a9187" if fmt is td_k else INK, "type": "column" if fmt is td_k else "line", "weight": 1})
                    r += 1
        since = min(agg[m]["ks"][0] for m in AM)[:4]
        w2.merge_range(r + 1, 2, r + 2, 4 + nm, T("Hodnoty v tisících eur. Prázdné pole u podílu: v daném měsíci žádný dovoz. Data Eurostatu přicházejí se zpožděním asi 7 týdnů. Celá řada od roku %s je na listu Data (tabulka)." % since,
                                                  "Values in thousand euros. Empty share cell: no imports that month. Eurostat data arrives about 7 weeks late. The full series from %s is on the Data (table) sheet." % since), note)
        footer(w2, r + 4)
        page(w2, tall=True); w2.repeat_rows(hr)

    # ---------- sheet 3: sites ----------
    w3 = wb.add_worksheet(T("Lokality", "Sites"))
    w3.set_column(0, 0, 2); w3.set_column(1, 1, 1.3); w3.set_column(2, 2, 30); w3.set_column(3, 4, 16); w3.set_column(5, 7, 12); w3.set_column(8, 8, 22)
    w3.set_column(9, 11, 12)
    header(w3, 12, T("Satelitní signály u vašich lokalit.", "Satellite signals at your sites."),
           T("Teplo: NASA FIRMS · SO2: NOAA-20 OMPS · posledních 30 dní", "Heat: NASA FIRMS · SO2: NOAA-20 OMPS · last 30 days"))
    hr = 5
    w3.set_row(hr, 42)
    heads = [T("Lokalita", "Site"), T("Země", "Country"), T("Fáze", "Stage"), T("Horké pixely, 30 dní", "Hot pixels, 30 days"), T("Dny s teplem", "Days with heat"),
             T("Max. výkon požáru (MW)", "Max fire power (MW)"), T("Teplo po dnech", "Heat by day"), T("SO2 max. (DU)", "SO2 max (DU)"),
             T("Dny nad 2 DU", "Days above 2 DU"), T("Snímků SO2", "SO2 readings")]
    w3.write(hr, 1, "", th)
    for i, h in enumerate(heads):
        w3.write(hr, 2 + i, h, th_r if i in (3, 4, 5, 7, 8, 9) else th)
    hs, so = (hs_file or {}).get("sites") or {}, (so_file or {}).get("sites") or {}
    r = hr + 1
    for m in MINS:
        for s in [s for s in sites if s.get("m") == m]:
            days = sorted(((hs.get(s["id"]) or {}).get("byDay") or {}).items())[-30:]
            px = [d.get("n", d.get("px", 0)) or 0 for _, d in days]
            frp = [d.get("frp", 0) or 0 for _, d in days]
            sx = so.get(s["id"]) or {}
            w3.set_row(r, 22)
            w3.write(r, 1, "", chip[m])
            w3.write(r, 2, s.get("name") or s["id"], td_b); w3.write(r, 3, ctry(s.get("country") or ""), td)
            w3.write(r, 4, STAGE.get(s.get("stage"), (s.get("stage") or "",) * 2)[1 if CS else 0], td)
            w3.write_number(r, 5, sum(px), td); w3.write_number(r, 6, sum(1 for x in px if x), td)
            w3.write(r, 7, round(max(frp), 1) if frp else "", td)
            w3.write(r, 8, "", td)
            sr = series(px or [0])
            w3.add_sparkline(r, 8, {"range": "_series!A%d:%s%d" % (sr + 1, xl_col_to_name(max(len(px), 1) - 1), sr + 1),
                                    "type": "column", "series_color": "#b7522e", "min": 0})
            for c, key in ((9, "maxDU"), (10, "daysAbove2"), (11, "daysSeen")):
                val = sx.get(key)
                w3.write_number(r, c, val, td) if isinstance(val, (int, float)) else w3.write(r, c, "", td)
            r += 1
    w3.merge_range(r + 1, 2, r + 3, 11, T("Horký pixel je místo, kde satelit zachytil teplo nad okolím (pec, hořák, požár). U zpracovatelských závodů znamená stálé teplo provoz a náhlé ticho odstávku. SO2 v Dobsonových jednotkách (DU) nad 2 ukazuje zvýšené emise v okruhu %d km. Prázdné pole: lokalita se zatím nesleduje nebo nebyl čistý snímek." % ((so_file or {}).get("radiusKm") or 50),
                                          "A hot pixel is where the satellite saw heat above the surroundings (furnace, flare, fire). At processing plants steady heat means operation and sudden quiet a shutdown. SO2 above 2 Dobson units (DU) means raised emissions within %d km. Empty cell: the site is not tracked yet or there was no clear reading." % ((so_file or {}).get("radiusKm") or 50)), note)
    footer(w3, r + 5)
    page(w3, tall=True)

    # ---------- sheet 4: raw data, the same rows as the CSV ----------
    w4 = wb.add_worksheet(T("Data (tabulka)", "Data (table)"))
    rd = list(csv.reader(io.StringIO((csv_text or "").lstrip("﻿"))))
    cols = rd[0] if rd else ["section", "mineral", "item", "date", "metric", "value", "unit", "source"]
    rows = [[_num(x) if i == 5 else x for i, x in enumerate(row)] for row in rd[1:] if len(row) == len(cols)]
    if rows:
        w4.add_table(0, 0, len(rows), len(cols) - 1, {"data": rows, "columns": [{"header": c} for c in cols], "style": "Table Style Light 1", "name": "OreOrbitData"})
    else:
        w4.write_row(0, 0, cols, th)
    w4.set_column(0, 1, 13); w4.set_column(2, 2, 46); w4.set_column(3, 3, 11); w4.set_column(4, 4, 22); w4.set_column(5, 5, 14); w4.set_column(6, 6, 9)
    w4.set_column(7, 7, 26)
    w4.freeze_panes(1, 0); w4.set_landscape(); w4.fit_to_pages(1, 0); w4.set_paper(9); w4.repeat_rows(0)
    w4.set_header('&L&"Arial"&8OreOrbit · %s&R&"Arial"&8&P / &N' % T("týdenní data", "weekly data"))

    # ---------- sheet 5: sources ----------
    w5 = wb.add_worksheet(T("Zdroje", "Sources"))
    w5.set_column(0, 0, 2); w5.set_column(1, 1, 1.3); w5.set_column(2, 2, 26); w5.set_column(3, 3, 56); w5.set_column(4, 4, 30)
    header(w5, 5, T("Zdroje a poznámky.", "Sources and notes."), T("Odkud data jsou a jak je číst", "Where the data comes from and how to read it"), tcol=3)
    src = [(T("Dovoz do EU", "EU imports"), T("Eurostat Comext, měsíční data podle kódů KN, celní původ mimo EU. © Evropská unie.",
                                              "Eurostat Comext, monthly data by CN code, customs origin outside the EU. © European Union.")),
           (T("Teplo u lokalit", "Heat at sites"), T("NASA FIRMS (VIIRS), denní horké pixely v okruhu kolem lokality.",
                                                    "NASA FIRMS (VIIRS), daily hot pixels within a radius of the site.")),
           ("SO2", T("NOAA-20 OMPS přes NASA GIBS, oxid siřičitý v mezní vrstvě.", "NOAA-20 OMPS via NASA GIBS, sulphur dioxide in the boundary layer.")),
           (T("Vaše otázka", "Your question"), T("Jednou měsíčně se nás můžete na cokoli zeptat: stačí odpovědět na kterýkoli e-mail Monitoringu. Odpoví člověk do dvou pracovních dnů.",
                                                 "One question a month: reply to any Monitoring email, and a person answers within two working days.")),
           ("Atlas", "bohemiadefense.com/atlas")]
    w5.set_row(5, 22)
    w5.write(5, 2, T("Téma", "Topic"), th); w5.merge_range(5, 3, 5, 4, T("Zdroj", "Source"), th)
    for i, (k, v) in enumerate(src):
        w5.set_row(6 + i, 30); w5.write(6 + i, 2, k, td_b); w5.merge_range(6 + i, 3, 6 + i, 4, v, td_m)
    footer(w5, 13)
    page(w5)

    wb.close()
    return buf.getvalue()
