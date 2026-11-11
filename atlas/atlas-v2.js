/* v33: every error on the page is kept (shown with ?debug=1) and counted anonymously */
window.ooErrs = window.ooErrs || [];
window.addEventListener("error", (e) => { const m = String((e && e.message) || "error") + (e && e.filename ? " @" + String(e.filename).split("/").pop() + ":" + e.lineno : ""); window.ooErrs.push(m); try { if (navigator.doNotTrack !== "1" && navigator.sendBeacon) navigator.sendBeacon("https://bohemiadefense.com/atlas/count.php?e=" + encodeURIComponent(("err:" + (document.documentElement.lang || "x") + ":" + m.toLowerCase().replace(/[^a-z0-9]+/g, "-")).slice(0, 40).replace(/-+$/, ""))); } catch (x) {} });
window.addEventListener("unhandledrejection", (e) => { window.ooErrs.push("promise: " + String((e && e.reason && e.reason.message) || e.reason).slice(0, 120)); });
/* OreOrbit v15: your supply chain, assessed.
   A register of products, parts, material origins and stock, rated part by part, stress-tested against real
   export controls and mapped back to the mines and refineries on the atlas. It runs entirely in this browser:
   the register is kept in this browser's local storage and in files the user saves; nothing is sent anywhere.
   Reads the atlas through window.OO, which the main script sets up at the end. */
(function () {
  "use strict";
  const O = window.OO;
  if (!O) return;
  const CFG = window.ATLAS_CONFIG || {};
  const T = O.T, esc = O.esc, CS = O.LANG === "cs";
  const $ = (s, r) => (r || document).querySelector(s);
  const root = $("#as-root"), tmRoot = $("#tm-root");

  /* ---------- texts on the page that the main script's dictionary does not know ---------- */
  function localiseStatic() {
    if (!CS) return;
    const set = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };
    set("#assess .sec-head .label", "Posouzení");
    set("#as-h", "Váš dodavatelský řetězec, posouzený.");
    set("#assess .sec-head p", "Zapište výrobky, které vyrábíte, a díly, ve kterých je těchto dvanáct surovin, odkud pocházejí a na kolik týdnů máte zásoby. Dostanete hodnocení rizika každého dílu, zátěžový test proti skutečným vývozním kontrolám a mapování, které můžete předložit vedení. Vychází z posouzení rizik dodavatelského řetězce, které Akt o kritických surovinách EU ukládá velkým výrobcům strategických technologií každé tři roky. Všechno zůstává v tomto prohlížeči.");
    set("#teams .sec-head .label", "Pro týmy");
    set("#tm-h", "Předložte to vedení.");
    set("#teams .sec-head p", "OreOrbit je zdarma. Výrobcům v obraně a kosmonautice, kteří potřebují odpověď, za kterou se dá ručit, nabízíme i přímou spolupráci s jejich týmem.");
    set("#cta-assess", "Posoudit váš řetězec");
    set("#oo-priv", "Registr posouzení zůstává jen v tomto prohlížeči a nikam se neposílá.");
    const hp = $("#hero-copy p");
    if (hp) hp.textContent = "U devíti z nich vyrábí Čína v některé fázi víc než 65 % světové produkce a u primárního galia je to 99 %. Sledujte je od dolu přes rafinerii až do továrny, podívejte se, co se tento týden změnilo, a vyzkoušejte proti nim vlastní seznam dílů přímo v prohlížeči.";
    document.querySelectorAll('.foot-links a[href="#assess"]').forEach((a) => { a.textContent = "Posouzení"; });
    document.querySelectorAll('.foot-links a[href="#teams"]').forEach((a) => { a.textContent = "Pro týmy"; });
    const cl = $(".changelog li span");
    if (cl && /^Version 15/.test(cl.textContent)) cl.textContent = "Verze 15. Váš dodavatelský řetězec, posouzený: registr výrobků, dílů, původu a zásob s hodnocením rizika každého dílu, zátěžový test, který ukáže, které díly dojdou a kdy, mapování podle surovin s aktivitou lokalit viděnou z oběžné dráhy a zpráva ke stažení nebo tisku. Vše zůstává ve vašem prohlížeči. Na glóbu: osvětlené 3D modely dolů, závodů, výroben magnetů a družic, ostřejší mapy Země na noteboocích, jemnější oblačnost a stejně podrobné lodě na všech obchodních trasách. Nově sekce pro týmy.";
  }

  /* ---------- recognising materials in a part description ---------- */
  const KEYS = [
    [/ndfeb|nd-?fe-?b|neodym|dyspros|terbium|praseodym|rare.?earth|vzácn|\bree\b|magnet|actuator|aktu[aá]tor|servo|bldc|brushless|motor|yttri|\bysz\b|thermal.?barrier/i, ["ree"]],
    [/smco|sm2co17|samari/i, ["ree", "co"]],
    [/\bgan\b|gallium|galium|gaas|mmic|\bt\/r\b|\btrm\b|transmit.?receive|aesa|radar|power amplifier|\bhpa\b|\bsspa\b/i, ["ga"]],
    [/german|infrared|infračerv|\bir\b|mwir|lwir|thermal (?:sight|camera|imager)|termoviz|lens|čočk|ir (?:dome|window)|seeker|night.?vision|noční vid|flir|fib(?:re|er) optic/i, ["ge"]],
    [/solar (?:cell|array|panel)|soláru|solární|triple.?junction/i, ["ga", "ge"]],
    [/tungsten|wolfram|penetrator|carbide|karbid|wc-?co|heavy alloy|těžká slitina|apfsds|fragment/i, ["w"]],
    [/antimon|primer|zápalk|tracer|svítivk|insb|flame.?retard|percussion/i, ["sb"]],
    [/titan|ti-?6al|\bti64\b|airframe|drak letadla|armou?r plate|pancéř|fan blade|compressor blade|pressure vessel|propellant tank|nádrž/i, ["ti"]],
    [/lithium|li-?ion|lipo|li-?po|batter|bateri|akumul|\blfp\b|power pack/i, ["li", "gr"]],
    [/\bnmc\b|\bnca\b|cathode|katod/i, ["ni", "co"]],
    [/superalloy|superslitin|turbine|turbín|hot section/i, ["co", "ni"]],
    [/cobalt|kobalt|stellite/i, ["co"]],
    [/nickel|nikl|inconel|hastelloy|waspaloy|monel/i, ["ni"]],
    [/graphite|grafit|anode|anod/i, ["gr"]]
  ];
  function detect(text) {
    const hit = new Set();
    KEYS.forEach(([rx, ms]) => { if (rx.test(text)) ms.forEach((m) => hit.add(m)); });
    if (!hit.size && Array.isArray(O.PART_KEYS)) O.PART_KEYS.forEach(([rx, ms]) => { if (rx.test(text)) ms.forEach((m) => hit.add(m)); });
    return O.ORDER.filter((m) => hit.has(m));
  }

  /* ---------- countries ---------- */
  const C_ALIAS = {
    cn: "China", prc: "China", china: "China", "čína": "China", cina: "China", "people's republic of china": "China",
    cd: "DR Congo", drc: "DR Congo", "dr congo": "DR Congo", congo: "DR Congo", "dem. rep. congo": "DR Congo", "dr kongo": "DR Congo", kongo: "DR Congo",
    id: "Indonesia", indonesia: "Indonesia", "indonésie": "Indonesia",
    au: "Australia", australia: "Australia", "austrálie": "Australia",
    us: "United States", usa: "United States", "united states": "United States", "spojené státy": "United States", usa_: "United States",
    cz: "Czechia", czechia: "Czechia", "czech republic": "Czechia", "česko": "Czechia", "čr": "Czechia",
    de: "Germany", germany: "Germany", "německo": "Germany", fr: "France", france: "France", "francie": "France",
    nl: "Netherlands", netherlands: "Netherlands", "nizozemsko": "Netherlands", at: "Austria", austria: "Austria", "rakousko": "Austria",
    kr: "South Korea", "south korea": "South Korea", korea: "South Korea", "jižní korea": "South Korea", jp: "Japan", japan: "Japan", "japonsko": "Japan",
    pl: "Poland", poland: "Poland", "polsko": "Poland", se: "Sweden", sweden: "Sweden", "švédsko": "Sweden", no: "Norway", norway: "Norway", "norsko": "Norway",
    ee: "Estonia", estonia: "Estonia", "estonsko": "Estonia", be: "Belgium", belgium: "Belgium", "belgie": "Belgium", uk: "United Kingdom", gb: "United Kingdom", "united kingdom": "United Kingdom",
    ca: "Canada", canada: "Canada", "kanada": "Canada", cl: "Chile", chile: "Chile", my: "Malaysia", malaysia: "Malaysia", "malajsie": "Malaysia",
    za: "South Africa", "south africa": "South Africa", "jar": "South Africa", in: "India", india: "India", "indie": "India", ru: "Russia", russia: "Russia", "rusko": "Russia",
    ua: "Ukraine", ukraine: "Ukraine", "ukrajina": "Ukraine", tw: "Taiwan", taiwan: "Taiwan", "tchaj-wan": "Taiwan", vn: "Vietnam", vietnam: "Vietnam",
    ch: "Switzerland", switzerland: "Switzerland", "švýcarsko": "Switzerland", it: "Italy", italy: "Italy", "itálie": "Italy", es: "Spain", spain: "Spain", "španělsko": "Spain",
    fi: "Finland", finland: "Finland", "finsko": "Finland", br: "Brazil", brazil: "Brazil", "brazílie": "Brazil", kz: "Kazakhstan", kazakhstan: "Kazakhstan"
  };
  const COUNTRY_LIST = ["China", "DR Congo", "Indonesia", "Australia", "United States", "Czechia", "Germany", "France", "Netherlands", "Austria", "Belgium", "Sweden", "Norway", "Finland", "Poland", "Estonia", "Italy", "Spain", "United Kingdom", "Switzerland", "Japan", "South Korea", "Taiwan", "Malaysia", "Vietnam", "India", "Canada", "Chile", "Brazil", "South Africa", "Kazakhstan", "Ukraine", "Russia"];
  function normC(s) {
    const t = String(s || "").trim();
    if (!t || /^(unknown|neznám[áý]?|n\/?a|-|–|\?)$/i.test(t)) return "";
    return C_ALIAS[t.toLowerCase()] || t.charAt(0).toUpperCase() + t.slice(1);
  }
  const cName = (c) => (c ? O.ctry(c) : "");
  const so2Sat = () => { const l = (O.LIVE.so2 && O.LIVE.so2.layer) || ""; return !l || /TROPOMI|S5P|Sentinel/i.test(l) ? "Sentinel-5P" : /NOAA20/i.test(l) ? "NOAA-20 OMPS" : /^OMPS/i.test(l) ? "Suomi NPP OMPS" : /^OMI/i.test(l) ? "Aura OMI" : "Sentinel-5P"; };

  /* ---------- the register ---------- */
  const KEY = "oo-register-v1";
  let reg = { org: "", items: [] };
  let uid = 1;
  const newId = () => "p" + Date.now().toString(36) + (uid++);
  function load() {
    try { const t = localStorage.getItem(KEY); if (t) reg = sanitise(JSON.parse(t)); } catch (e) { /* storage blocked or bad data: start empty */ }
  }
  function store() { try { localStorage.setItem(KEY, JSON.stringify(reg)); } catch (e) { /* storage blocked: the register lives until the page closes */ } }
  function sanitise(d) {
    const out = { org: "", items: [] };
    if (!d || typeof d !== "object") return out;
    out.org = String(d.org || "").slice(0, 120);
    (Array.isArray(d.items) ? d.items : []).slice(0, 400).forEach((x) => {
      if (!x || typeof x !== "object") return;
      const mats = Array.isArray(x.mats) ? x.mats.filter((m) => O.MATERIALS[m]) : [];
      const st = x.stock === null || x.stock === "" || x.stock === undefined ? null : Number(x.stock);
      out.items.push({
        id: String(x.id || newId()).slice(0, 40), prog: String(x.prog || "").slice(0, 80), part: String(x.part || "").slice(0, 140),
        mats, country: normC(x.country).slice(0, 60), stock: st === null || isNaN(st) ? null : Math.max(0, Math.min(520, Math.round(st))),
        second: x.second === true
      });
    });
    return out;
  }
  const detectRow = (part, prog) => { const d = detect(String(part || "")); return d.length ? d : detect(String(prog || "")); };
  function addRow(prog, part, country, stock, second, mats) {
    reg.items.push({ id: newId(), prog: String(prog || "").trim().slice(0, 80), part: String(part || "").trim().slice(0, 140), mats: mats || detectRow(part, prog), country: normC(country), stock: stock === null || stock === undefined || stock === "" || isNaN(Number(stock)) ? null : Math.max(0, Math.min(520, Math.round(Number(stock)))), second: !!second });
  }

  const EXAMPLE_EN = [
    ["155 mm ammunition", "Percussion primer (antimony sulphide)", "China", 10, false],
    ["155 mm ammunition", "Tungsten heavy-alloy fragments", "Austria", 20, true],
    ["Small drone", "NdFeB magnets for the four motors", "China", 6, false],
    ["Small drone", "Li-ion battery cells (NMC)", "South Korea", 12, false],
    ["Small drone", "Germanium IR lens for the camera", "", null, false],
    ["Counter-drone radar", "GaN power amplifier MMIC", "Netherlands", 26, false],
    ["Counter-drone radar", "Samarium-cobalt actuator magnets", "", 30, true],
    ["Small satellite", "Triple-junction solar cells (GaAs on Ge)", "Germany", 40, false],
    ["Small satellite", "Ti-6Al-4V propellant tank", "France", 16, true]
  ];
  const EXAMPLE_CS = [
    ["Munice 155 mm", "Zápalka (sulfid antimonitý)", "China", 10, false],
    ["Munice 155 mm", "Fragmenty z těžké slitiny wolframu", "Austria", 20, true],
    ["Malý dron", "Magnety NdFeB pro čtyři motory", "China", 6, false],
    ["Malý dron", "Li-ion bateriové články (NMC)", "South Korea", 12, false],
    ["Malý dron", "Germaniová IR čočka kamery", "", null, false],
    ["Protidronový radar", "GaN výkonový zesilovač MMIC", "Netherlands", 26, false],
    ["Protidronový radar", "Samarium-kobaltové magnety aktuátorů", "", 30, true],
    ["Malá družice", "Trojpřechodové solární články (GaAs na Ge)", "Germany", 40, false],
    ["Malá družice", "Palivová nádrž z Ti-6Al-4V", "France", 16, true]
  ];

  /* ---------- reading a pasted list (from Excel, a CSV or plain lines) ---------- */
  const HDR = { prog: /product|programme|program|system|výrob|systém/i, part: /part|component|item|díl|komponent|položk/i, country: /country|origin|země|původ/i, stock: /stock|week|cover|zásob|týdn/i, second: /second|alternat|dual|druhý|záložn/i, supplier: /supplier|vendor|dodavatel/i };
  function parsePaste(text) {
    const lines = String(text || "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean).slice(0, 300);
    if (!lines.length) return 0;
    const sep = lines.some((l) => l.includes("\t")) ? "\t" : lines.some((l) => l.includes(";")) ? ";" : lines.every((l) => (l.match(/,/g) || []).length >= 2) ? "," : null;
    const cells = (l) => sep ? l.split(sep).map((c) => c.trim().replace(/^"|"$/g, "")) : [l];
    let map = null, start = 0;
    const first = cells(lines[0]);
    if (sep && first.some((c) => HDR.part.test(c))) {
      map = {};
      first.forEach((c, i) => { Object.entries(HDR).forEach(([k, rx]) => { if (map[k] === undefined && rx.test(c)) map[k] = i; }); });
      start = 1;
    }
    let n = 0;
    lines.slice(start).forEach((l) => {
      const c = cells(l);
      let prog, part, country, stock, second;
      if (map) {
        prog = c[map.prog]; part = c[map.part]; country = c[map.country]; stock = c[map.stock]; second = c[map.second];
        if (map.supplier !== undefined && c[map.supplier] && part) part = `${part} (${c[map.supplier]})`;
      } else if (c.length >= 2) { [prog, part, country, stock, second] = c; }
      else { part = c[0]; prog = T("Unassigned", "Nezařazeno"); }
      if (!part) return;
      const st = stock === undefined || stock === "" ? null : parseFloat(String(stock).replace(",", "."));
      addRow(prog || T("Unassigned", "Nezařazeno"), part, country, isNaN(st) ? null : st, /^(y|yes|ano|a|true|1|x)$/i.test(String(second || "").trim()));
      n++;
    });
    return n;
  }

  /* ---------- rating a part ---------- */
  const LV = { high: [T("High", "Vysoké"), "high"], med: [T("Medium", "Střední"), "med"], low: [T("Low", "Nízké"), "low"], none: [T("No material", "Bez suroviny"), "none"] };
  const plural = (n, en1, enN, cs1, cs24, cs5) => T(n === 1 ? en1 : enN, n === 1 ? cs1 : n >= 2 && n <= 4 ? cs24 : cs5);
  function rateMat(it, m) {
    const w = O.worstOf(m), rag = O.ragFor(m), why = [];
    let pts = 0;
    if (!w) { pts += 1; why.push(T(`${O.mName(m)}: no public world share for the most concentrated stage`, `${O.mName(m)}: pro nejkoncentrovanější fázi chybí veřejný světový podíl`)); }
    else {
      const p = w.x.pct;
      const c = p >= 90 ? 3 : p > 65 ? 2 : p > 40 ? 1 : 0;
      pts += c;
      if (c) why.push(T(`${w.x.who} makes ${O.pctTxt(w.x)} of world ${O.stageWhat(w.k, w.x)} (${O.mName(m).toLowerCase()})`, `${O.mName(m)}: ${O.pctTxt(w.x)} ${O.stageWhat(w.k, w.x)} je v zemi ${O.ctry(w.x.who)}`));
    }
    if (w && it.country && it.country === w.x.who) { pts += 2; why.push(T(`You buy it from ${w.x.who}, the dominant country`, `Kupujete ji ze země ${O.ctry(w.x.who)}, která trh ovládá`)); }
    else if (!it.country) { pts += 1; why.push(T("Origin not recorded", "Původ není uveden")); }
    if (!it.second) { pts += 1; why.push(T("No second source recorded", "Druhý zdroj není uveden")); }
    if (it.stock === null) { pts += 1; why.push(T("Stock cover not recorded", "Zásoby nejsou uvedeny")); }
    else if (it.stock < 8) { pts += 2; why.push(T(`Only ${it.stock} weeks of stock`, `Zásoby jen na ${it.stock} ${plural(it.stock, "", "", "týden", "týdny", "týdnů")}`)); }
    else if (it.stock < 26) { pts += 1; why.push(T(`${it.stock} weeks of stock, under six months`, `Zásoby na ${it.stock} týdnů, méně než půl roku`)); }
    const dd = rag.dd, moving = (dd !== null && dd >= 0 && dd <= 45) || rag.news > 0 || rag.hz > 0 || (rag.cf && rag.cf.length > 0);
    if (moving) {
      pts += 1;
      if (dd !== null && dd <= 45 && rag.dl) why.push(T(`Deadline in ${dd} days: ${rag.dl.title}`, `Termín za ${dd} ${plural(dd, "", "", "den", "dny", "dní")}: ${rag.dl.title_cs || rag.dl.title}`));
      else if (rag.news) why.push(T(`${rag.news} ${rag.news === 1 ? "story" : "stories"} about it this week`, `${rag.news} ${plural(rag.news, "", "", "zpráva", "zprávy", "zpráv")} tento týden`));
      else why.push(T("A live hazard or armed conflict near one of its sites", "Živá hrozba nebo ozbrojený konflikt u některé z lokalit"));
    }
    return { m, w, rag, pts, why };
  }
  function rate(it) {
    if (!it.mats.length) return { level: "none", score: 0, why: [T("Pick the material this part carries", "Vyberte surovinu, kterou díl obsahuje")], mats: [], top: null };
    const mats = it.mats.map((m) => rateMat(it, m)).sort((a, b) => b.pts - a.pts);
    const top = mats[0], score = top.pts;
    return { level: score >= 6 ? "high" : score >= 3 ? "med" : "low", score, why: top.why, mats, top };
  }

  /* ---------- stress test ---------- */
  let scnId = null, weeks = 26, tab = "risks";
  const regMats = () => O.ORDER.filter((m) => reg.items.some((it) => it.mats.includes(m)));
  function pickScenario() {
    const ms = regMats();
    if (scnId && O.SCENARIOS.some((s) => s.id === scnId)) return;
    const cands = O.SCENARIOS.filter((s) => ms.includes(s.m));
    const dl = (s) => { const d = O.deadlinesFor(s.m)[0]; const n = d ? O.daysUntil(d.date) : null; return n === null ? 9999 : n; };
    cands.sort((a, b) => dl(a) - dl(b));
    scnId = (cands[0] || O.SCENARIOS[0]).id;
  }
  function stress() {
    pickScenario();
    const sc = O.SCENARIOS.find((s) => s.id === scnId) || O.SCENARIOS[0];
    const rows = reg.items.filter((it) => it.mats.includes(sc.m)).map((it) => {
      const kind = it.country === sc.who ? "direct" : !it.country ? "likely" : "indirect";
      const status = kind === "indirect" ? "check" : it.stock === null ? "unknown" : it.stock >= weeks ? "covered" : "short";
      return { it, kind, status, gap: it.stock === null ? null : Math.max(0, weeks - it.stock) };
    });
    const ord = { short: 0, unknown: 1, check: 2, covered: 3 };
    rows.sort((a, b) => ord[a.status] - ord[b.status] || (a.it.stock ?? 999) - (b.it.stock ?? 999));
    return { sc, rows };
  }

  /* ---------- rendering ---------- */
  const lvBadge = (r) => `<span class="as-lv lv-${r.level}" title="${esc(T("Score", "Skóre"))} ${r.score}/9">${esc(LV[r.level][0])}${r.level !== "none" ? `<b>${r.score}</b>` : ""}</span>`;
  const chip = (m, removable) => `<span class="as-chip" style="--c:var(--${m})"><i></i>${esc(O.mName(m))}${removable ? `<button type="button" data-mt="${m}" aria-label="${esc(T(`Remove ${O.mName(m)}`, `Odebrat ${O.mName(m)}`))}">×</button>` : ""}</span>`;
  const fmtW = (n) => n === null ? "–" : T(`${n} wk`, `${n} t.`);

  function rowHtml(it) {
    const r = rate(it);
    const left = O.ORDER.filter((m) => !it.mats.includes(m));
    return `<div class="as-row" role="row" data-id="${esc(it.id)}">
      <label class="as-f f-prog"><span>${T("Product", "Výrobek")}</span><input class="as-in" data-f="prog" value="${esc(it.prog)}" maxlength="80"></label>
      <label class="as-f f-part"><span>${T("Part", "Díl")}</span><input class="as-in" data-f="part" value="${esc(it.part)}" maxlength="140"></label>
      <div class="as-f f-mats"><span>${T("Materials", "Suroviny")}</span><div class="as-mats">${it.mats.map((m) => chip(m, true)).join("")}${left.length ? `<select class="as-add" data-addmat aria-label="${esc(T("Add a material", "Přidat surovinu"))}"><option value="">+</option>${left.map((m) => `<option value="${m}">${esc(O.mName(m))}</option>`).join("")}</select>` : ""}</div></div>
      <label class="as-f f-ctry"><span>${T("Material from", "Surovina z")}</span><input class="as-in" data-f="country" list="as-countries" value="${esc(cName(it.country))}" placeholder="${esc(T("Unknown", "Neznámo"))}" maxlength="60"></label>
      <label class="as-f f-stock"><span>${T("Stock, weeks", "Zásoby, týdny")}</span><input class="as-in" data-f="stock" type="number" min="0" max="520" step="1" inputmode="numeric" value="${it.stock === null ? "" : it.stock}" placeholder="–"></label>
      <label class="as-f f-second"><span>${T("Second source", "Druhý zdroj")}</span><span class="as-chk"><input type="checkbox" data-f="second"${it.second ? " checked" : ""}><em>${T("Qualified", "Ověřený")}</em></span></label>
      <div class="as-f f-risk"><span>${T("Risk", "Riziko")}</span><span class="as-risk">${lvBadge(r)}</span></div>
      <button type="button" class="as-x" data-del aria-label="${esc(T("Remove this part", "Odebrat tento díl"))}">×</button>
    </div>`;
  }

  function summaryHtml() {
    const items = reg.items, rated = items.map((it) => ({ it, r: rate(it) }));
    const prods = new Set(items.map((it) => it.prog.trim().toLowerCase()).filter(Boolean)).size, ms = regMats();
    const cnt = { high: 0, med: 0, low: 0, none: 0 };
    rated.forEach(({ r }) => { cnt[r.level]++; });
    const top = rated.filter((x) => x.r.level !== "none").sort((a, b) => b.r.score - a.r.score).slice(0, 3);
    const dls = ms.map((m) => O.deadlinesFor(m)[0]).filter(Boolean).sort((a, b) => String(a.date).localeCompare(String(b.date)));
    const next = dls[0], nd = next ? O.daysUntil(next.date) : null;
    const tot = Math.max(1, items.length);
    return `<div class="as-k"><div><b>${items.length}</b><span>${plural(items.length, "part", "parts", "díl", "díly", "dílů")}</span></div><div><b>${prods}</b><span>${plural(prods, "product", "products", "výrobek", "výrobky", "výrobků")}</span></div><div><b>${ms.length}</b><span>${T("of 12 materials", "z 12 surovin")}</span></div></div>
      <div class="as-dist" role="img" aria-label="${esc(T(`${cnt.high} high, ${cnt.med} medium, ${cnt.low} low`, `${cnt.high} vysoké, ${cnt.med} střední, ${cnt.low} nízké`))}">${["high", "med", "low", "none"].map((k) => cnt[k] ? `<i class="lv-${k}" style="flex:${cnt[k] / tot}"></i>` : "").join("")}</div>
      <div class="as-dl">${["high", "med", "low"].map((k) => `<span class="lv-${k}"><i></i>${cnt[k]} ${esc(LV[k][0].toLowerCase())}</span>`).join("")}</div>
      ${top.length ? `<div class="label as-sl">${T("Act on first", "Řešit nejdřív")}</div><ol class="as-top">${top.map(({ it, r }) => `<li><span class="as-tn">${esc(it.part || T("Unnamed part", "Díl bez názvu"))}</span><span class="as-tp">${esc(it.prog)}</span>${lvBadge(r)}<span class="as-tw">${esc(r.why[0] || "")}</span></li>`).join("")}</ol>` : ""}
      ${next ? `<div class="as-next"><div class="label">${T("Next deadline on your list", "Nejbližší termín pro váš seznam")}</div><p><b>${esc(O.fmtDay(next.date))}</b>${nd !== null ? ` · ${T(`in ${nd} days`, `za ${nd} ${plural(nd, "", "", "den", "dny", "dní")}`)}` : ""}<br>${esc(CS && next.title_cs ? next.title_cs : next.title)}</p></div>` : ""}
      <div class="as-acts2"><button type="button" class="btn small" data-as="report">${T("Download the assessment", "Stáhnout posouzení")}</button><button type="button" class="btn ghost small" data-as="print">${T("Print", "Tisk")}</button><button type="button" class="btn ghost small" data-as="globe">${T("Show on the globe", "Ukázat na glóbu")}</button></div>`;
  }

  function risksHtml() {
    const rated = reg.items.map((it) => ({ it, r: rate(it) })).sort((a, b) => b.r.score - a.r.score);
    return `<ol class="as-risks">${rated.map(({ it, r }) => `<li class="lv-${r.level}">
      <div class="as-rh">${lvBadge(r)}<span class="as-tn">${esc(it.part || T("Unnamed part", "Díl bez názvu"))}</span><span class="as-tp">${esc(it.prog)}</span><span class="as-rm">${it.mats.map((m) => chip(m, false)).join("")}</span></div>
      <ul class="as-why">${r.why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>
      ${r.mats.length > 1 ? `<p class="srcs">${T("Rated on its most exposed material", "Hodnoceno podle nejexponovanější suroviny")}: ${esc(O.mName(r.top.m))}. ${T("Others", "Další")}: ${r.mats.slice(1).map((x) => `${esc(O.mName(x.m))} ${x.pts}/9`).join(", ")}</p>` : ""}
    </li>`).join("")}</ol>
    <p class="srcs">${T("Score out of 9, from the part's most exposed material: concentration at the most concentrated stage (up to 3), buying from that dominant country (2) or not knowing the origin (1), no second source (1), stock under 8 weeks (2) or under 26 weeks or not recorded (1), and a deadline within 45 days, a story this week or a live hazard near a site (1). High is 6 or more, medium 3 to 5. A rule of thumb to rank your list, not a forecast.", "Skóre z 9 podle nejexponovanější suroviny dílu: koncentrace v nejkoncentrovanější fázi (až 3), nákup přímo z dominantní země (2) nebo neznámý původ (1), bez druhého zdroje (1), zásoby pod 8 týdnů (2) nebo pod 26 týdnů či neuvedené (1) a termín do 45 dnů, zpráva tento týden nebo živá hrozba u lokality (1). Vysoké je 6 a víc, střední 3 až 5. Pravidlo pro seřazení seznamu, ne předpověď.")}</p>`;
  }

  function stressHtml() {
    pickScenario();
    const ms = regMats();
    const { sc, rows } = stress();
    const span = Math.max(52, weeks);
    const short = rows.filter((r) => r.status === "short"), first = short.length ? Math.min(...short.map((r) => r.it.stock)) : null;
    const KIND = { direct: T("Direct", "Přímo"), likely: T("Origin unknown", "Původ neznámý"), indirect: T("Bought elsewhere", "Nakoupeno jinde") };
    const STAT = (r) => r.status === "short" ? T(`Runs out in week ${r.it.stock}, ${r.gap} weeks short`, `Dojde v ${r.it.stock}. týdnu, chybí ${r.gap} ${plural(r.gap, "", "", "týden", "týdny", "týdnů")}`)
      : r.status === "covered" ? T("Covered for the whole window", "Pokryto po celé období")
      : r.status === "unknown" ? T("Stock not recorded", "Zásoby nejsou uvedeny")
      : T(`Check whether your supplier's own material comes from ${sc.who}`, `Ověřte, zda surovina vašeho dodavatele nepochází ze země ${O.ctry(sc.who)}`);
    return `<div class="as-st">
      <div class="as-stc">
        <label><span class="label">${T("Disruption", "Výpadek")}</span><select id="as-scn">${O.SCENARIOS.map((s) => `<option value="${esc(s.id)}"${s.id === sc.id ? " selected" : ""}${ms.includes(s.m) ? "" : " disabled"}>${esc(O.trStr(s.title))}</option>`).join("")}</select></label>
        <label class="as-wk"><span class="label">${T("For", "Na")} <b id="as-wk-v">${weeks}</b> ${T("weeks", "týdnů")}</span><input type="range" id="as-weeks" min="4" max="52" step="1" value="${weeks}"></label>
      </div>
      <p class="as-prec">${esc(O.trStr(sc.prec))}</p>
      ${rows.length ? `<p class="as-sum1">${short.length ? T(`${short.length} of ${rows.length} parts run out before the ${weeks} weeks are over. The first goes in week ${first}.`, `${short.length} z ${rows.length} dílů dojde dřív, než ${weeks} týdnů uplyne. První v ${first}. týdnu.`) : T(`None of the ${rows.length} parts with recorded stock runs out within ${weeks} weeks.`, `Žádný z ${rows.length} dílů s uvedenými zásobami za ${weeks} týdnů nedojde.`)}</p>
      <div class="as-runs" style="--span:${span}">
        <div class="as-axis" aria-hidden="true"><span>0</span><span style="left:${weeks / span * 100}%">${weeks} ${T("wk", "t.")}</span><span style="left:100%">${span}</span></div>
        ${rows.map((r) => `<div class="as-run st-${r.status}">
          <div class="as-rl"><span class="as-tn">${esc(r.it.part)}</span><span class="as-tp">${esc(r.it.prog)} · ${esc(KIND[r.kind])}${r.it.second ? ` · ${T("second source", "druhý zdroj")}` : ""}</span></div>
          <div class="as-runbar" aria-hidden="true"><s style="width:${weeks / span * 100}%"></s>${r.it.stock !== null && r.status !== "check" ? `<i style="width:${Math.min(r.it.stock, span) / span * 100}%"></i>` : ""}</div>
          <div class="as-rs">${esc(STAT(r))}</div>
        </div>`).join("")}
      </div>` : `<p class="muted">${T("No part on your list carries this material.", "Žádný díl ve vašem seznamu tuto surovinu neobsahuje.")}</p>`}
      <p class="srcs">${T("The bar is your stock in weeks; the shaded band is the disruption. Parts you buy from another country are not given a runway: the material inside them may still come from the country that stops.", "Pruh ukazuje zásoby v týdnech, podbarvené pole výpadek. Díly kupované z jiné země nemají vypočtenou výdrž: surovina v nich může i tak pocházet ze země, která dodávky zastaví.")}</p>
    </div>`;
  }

  function act(id) {
    const L = O.LIVE || {};
    const H = L.hotspots && L.hotspots.sites && L.hotspots.sites[id];
    const S = L.so2 && L.so2.sites && L.so2.sites[id];
    const C = L.scenes && L.scenes.sites && L.scenes.sites[id];
    return { h7: H ? H.daysHot7 : null, h30: H ? H.daysHot30 : null, so2: S ? S.daysAbove2 : null, so2n: S ? S.daysSeen : null, clear: C ? C.clearDate : null };
  }
  function mappingHtml() {
    const ms = regMats();
    if (!ms.length) return `<p class="muted">${T("Add parts to see where their materials are mined and refined.", "Přidejte díly a uvidíte, kde se jejich suroviny těží a zpracovávají.")}</p>`;
    return `<div class="as-map">${ms.map((m) => {
      const uses = reg.items.filter((it) => it.mats.includes(m));
      const chain = O.chainOf(m);
      const sites = O.SITES.filter((s) => s.m === m);
      const sp = O.EU_SP[m], rr = O.EOL_RIR[m], dl = O.deadlinesFor(m)[0];
      const online = sites.filter((s) => O.ONLINE[s.id]);
      return `<article class="as-mm" style="--c:var(--${m})">
        <header><button type="button" class="as-mh" data-mat="${m}"><i></i>${esc(O.mName(m))}</button><span class="as-tp">${uses.length} ${plural(uses.length, "part", "parts", "díl", "díly", "dílů")}: ${esc(uses.slice(0, 3).map((u) => u.part).join(", "))}${uses.length > 3 ? "…" : ""}</span></header>
        <div class="as-chain">${chain.map(([k, x, note]) => `<div class="${x && x.pct > 65 ? "over" : ""}"><span class="label">${esc(O.stageTxt(k))}</span>${x ? `<b>${esc(O.pctTxt(x))}</b><span>${esc(O.ctry(x.who))}</span>` : `<span class="muted">${esc(note ? O.trStr(note) : T("No public figure", "Bez veřejného údaje"))}</span>`}</div>`).join("")}</div>
        ${sites.length ? `<div class="label as-sl">${T("Sites on the atlas, seen from orbit", "Lokality v atlasu, viděné z oběžné dráhy")}</div>
        <ul class="as-sites">${sites.map((s) => { const a = act(s.id); return `<li><button type="button" class="as-site" data-site="${esc(s.id)}"><span class="as-tn">${esc(s.name)}</span><span class="as-tp">${esc(O.ctry(s.country))} · ${esc(O.trStr(s.stage))}${O.ONLINE[s.id] ? ` · ${T("online", "v provozu")} ${esc(O.trStr(O.ONLINE[s.id]))}` : ""}</span></button>
          <span class="as-sig">${a.h7 !== null ? `<span title="${esc(T("Days with furnace-hot pixels within 6 km (VIIRS), last 7 and 30 days", "Dny s pixely horkými jako pec do 6 km (VIIRS), posledních 7 a 30 dní"))}" class="${a.h7 ? "on" : ""}">${T("heat", "teplo")} ${a.h7}/7 · ${a.h30}/30</span>` : ""}${a.so2 !== null ? `<span title="${esc(T(`Days with SO₂ above 2 DU within 50 km (${so2Sat()})`, `Dny s SO₂ nad 2 DU do 50 km (${so2Sat()})`))}" class="${a.so2 ? "on" : ""}">SO₂ ${a.so2}/${a.so2n}</span>` : ""}${a.clear ? `<span title="${esc(T("Latest clear Sentinel-2 image", "Poslední jasný snímek Sentinel-2"))}">${T("clear", "jasno")} ${esc(O.fmtDay(a.clear))}</span>` : ""}</span></li>`; }).join("")}</ul>` : ""}
        <div class="label as-sl">${T("Options to consider", "Možnosti k posouzení")}</div>
        <ul class="as-opt">
          ${sp ? `<li>${sp.n ? T(`${sp.n} EU strategic projects`, `${sp.n} strategických projektů EU`) : T("EU strategic projects", "Strategické projekty EU")}${sp.named ? `: ${esc(sp.named.join(", "))}` : ""}</li>` : `<li>${T("No EU strategic project listed yet", "Zatím bez strategického projektu EU")}</li>`}
          ${rr ? `<li>${T(`Recycling meets ${rr.txt || rr.v + "%"} of EU demand today, against a 25% goal`, `Recyklace dnes pokrývá ${rr.txt || rr.v + " %"} poptávky EU, cíl je 25 %`)}</li>` : ""}
          ${online.length ? `<li>${T("New supply on the atlas", "Nové zdroje v atlasu")}: ${online.map((s) => `${esc(s.name)} (${esc(O.trStr(O.ONLINE[s.id]))})`).join(", ")}</li>` : ""}
          ${(() => { const w = O.worstOf(m); return sites.some((s) => !w || s.country !== w.x.who); })() ? `<li>${T("Qualify a second source at a site outside the dominant country", "Ověřte druhý zdroj v lokalitě mimo dominantní zemi")}</li>` : ""}
          ${dl ? `<li>${T("Next deadline", "Nejbližší termín")}: ${esc(O.fmtDay(dl.date))} · ${esc(CS && dl.title_cs ? dl.title_cs : dl.title)}</li>` : ""}
        </ul>
      </article>`;
    }).join("")}</div>
    <p class="srcs">${T(`World shares: USGS Mineral Commodity Summaries, IEA Global Critical Minerals Outlook. Heat: NASA VIIRS thermal anomalies. SO₂: ${so2Sat()} via NASA. Images: Sentinel-2. Signals show activity, not output.`, `Světové podíly: USGS Mineral Commodity Summaries, IEA Global Critical Minerals Outlook. Teplo: tepelné anomálie NASA VIIRS. SO₂: ${so2Sat()} přes NASA. Snímky: Sentinel-2. Signály ukazují aktivitu, ne objem výroby.`)}</p>`;
  }

  function tabHtml() { return tab === "stress" ? stressHtml() : tab === "map" ? mappingHtml() : risksHtml(); }

  function render() {
    if (!root) return;
    const sysKeys = Object.keys(O.SYSTEMS).filter((k) => k !== "custom");
    root.innerHTML = `
      <div class="as-bar">
        <label class="as-org"><span class="label">${T("Organisation on the report", "Organizace ve zprávě")}</span><input id="as-org" value="${esc(reg.org)}" maxlength="120" placeholder="${esc(T("Your company", "Vaše firma"))}"></label>
        <div class="as-acts">
          <button type="button" class="btn small" data-as="example">${T("Load an example", "Načíst příklad")}</button>
          <select id="as-sys" aria-label="${esc(T("Add parts from a system", "Přidat díly ze systému"))}"><option value="">${T("Add from a system…", "Přidat ze systému…")}</option>${sysKeys.map((k) => `<option value="${k}">${esc(O.trStr(O.SYSTEMS[k].name))}</option>`).join("")}</select>
          <button type="button" class="btn ghost small" data-as="paste" aria-expanded="false" aria-controls="as-paste">${T("Paste a list", "Vložit seznam")}</button>
          <button type="button" class="btn ghost small" data-as="add">${T("Add a part", "Přidat díl")}</button>
        </div>
        <div class="as-file">
          <button type="button" class="linkbtn" data-as="savefile">${T("Save file", "Uložit soubor")}</button>
          <button type="button" class="linkbtn" data-as="openfile">${T("Open file", "Otevřít soubor")}</button>
          <button type="button" class="linkbtn" data-as="clear">${T("Clear", "Vymazat")}</button>
          <input type="file" id="as-file" accept=".json,application/json" hidden>
        </div>
      </div>
      <div class="as-paste" id="as-paste" hidden>
        <label for="as-paste-in" class="label">${T("Paste rows from Excel or a CSV: product, part, material from (country), stock in weeks, second source (yes/no). A header row is recognised; one part per line also works.", "Vložte řádky z Excelu nebo CSV: výrobek, díl, surovina z (země), zásoby v týdnech, druhý zdroj (ano/ne). Řádek se záhlavím se rozpozná; stačí i jeden díl na řádek.")}</label>
        <textarea id="as-paste-in" rows="6" spellcheck="false" placeholder="${esc(T("Small drone\tNdFeB motor magnets\tChina\t6\tno", "Malý dron\tMagnety NdFeB do motorů\tČína\t6\tne"))}"></textarea>
        <div class="as-acts"><button type="button" class="btn small" data-as="pasteadd">${T("Add these rows", "Přidat řádky")}</button><button type="button" class="btn ghost small" data-as="pastecancel">${T("Cancel", "Zrušit")}</button></div>
      </div>
      <datalist id="as-countries">${COUNTRY_LIST.map((c) => `<option value="${esc(cName(c))}"></option>`).join("")}</datalist>
      ${reg.items.length ? `<div class="as-table" role="table" aria-label="${esc(T("Your register", "Váš registr"))}">${reg.items.map(rowHtml).join("")}</div>
      <div class="as-grid">
        <div class="as-views">
          <div class="tabs2 as-tabs" role="tablist" aria-label="${esc(T("Assessment view", "Pohled"))}">
            ${[["risks", T("Risks", "Rizika")], ["stress", T("Stress test", "Zátěžový test")], ["map", T("Mapping", "Mapování")]].map(([k, l]) => `<button role="tab" data-astab="${k}" aria-selected="${tab === k}">${l}</button>`).join("")}
          </div>
          <div class="as-tab" id="as-tab" role="tabpanel">${tabHtml()}</div>
        </div>
        <aside class="as-sum" id="as-sum" aria-live="polite">${summaryHtml()}</aside>
      </div>` : `<div class="as-empty">
        <p>${T("Start with an example, add the parts of a typical system, or paste your own list. Nothing leaves this browser.", "Začněte příkladem, přidejte díly typického systému nebo vložte vlastní seznam. Nic neopustí tento prohlížeč.")}</p>
        <p class="srcs">${T("The register is saved in this browser's storage on this device. Use Save file to keep a copy or move it to another computer.", "Registr se ukládá v úložišti tohoto prohlížeče na tomto zařízení. Kopii si uložte tlačítkem Uložit soubor.")}</p>
      </div>`}`;
  }
  function renderDerived() {
    if (!root || !reg.items.length) return;
    reg.items.forEach((it) => { const el = root.querySelector(`.as-row[data-id="${CSS.escape(it.id)}"] .as-risk`); if (el) el.innerHTML = lvBadge(rate(it)); });
    const sum = $("#as-sum"); if (sum) sum.innerHTML = summaryHtml();
    const tb = $("#as-tab"); if (tb) tb.innerHTML = tabHtml();
  }

  /* ---------- the report ---------- */
  function reportHtml() {
    const now = new Date(), day = O.fmtDay(O.todayIso());
    const rated = reg.items.map((it) => ({ it, r: rate(it) })).sort((a, b) => b.r.score - a.r.score);
    const cnt = { high: 0, med: 0, low: 0, none: 0 }; rated.forEach(({ r }) => cnt[r.level]++);
    const { sc, rows } = stress();
    const ms = regMats();
    const e = esc;
    const css = `body{font:14px/1.55 "Hanken Grotesk",Helvetica,Arial,sans-serif;color:#111;max-width:900px;margin:40px auto;padding:0 24px}h1{font-size:30px;line-height:1.1;margin:0 0 6px;font-weight:600;letter-spacing:-.02em}h2{font-size:18px;margin:34px 0 10px;border-bottom:1px solid #ccc;padding-bottom:6px}h3{font-size:15px;margin:20px 0 6px}table{width:100%;border-collapse:collapse;font-size:12.5px}th,td{text-align:left;vertical-align:top;padding:6px 8px;border-bottom:1px solid #e3e3e3}th{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#555}.lv{font-weight:700}.high{color:#b42318}.med{color:#b54708}.low{color:#067647}.meta{color:#555;font-size:12.5px}.small{font-size:11.5px;color:#555}ul{padding-left:18px;margin:4px 0}@media print{body{margin:0;max-width:none}h2{break-after:avoid}tr{break-inside:avoid}}`;
    return `<!doctype html><html lang="${CS ? "cs" : "en"}"><head><meta charset="utf-8"><title>${e(T("Critical raw materials: supply-chain risk assessment", "Kritické suroviny: posouzení rizik dodavatelského řetězce"))}${reg.org ? " · " + e(reg.org) : ""}</title><style>${css}</style></head><body>
      <p class="meta">OreOrbit · ${e(T("Critical minerals from orbit", "Kritické suroviny z oběžné dráhy"))}</p>
      <h1>${e(T("Critical raw materials: supply-chain risk assessment", "Kritické suroviny: posouzení rizik dodavatelského řetězce"))}</h1>
      <p class="meta">${reg.org ? e(reg.org) + " · " : ""}${e(T("Prepared on", "Připraveno"))} ${e(day)} · ${rated.length} ${e(plural(rated.length, "part", "parts", "díl", "díly", "dílů"))} · ${ms.length} ${e(T("of the 12 tracked materials", "z 12 sledovaných surovin"))}</p>
      <h2>${e(T("Summary", "Shrnutí"))}</h2>
      <p>${e(T(`${cnt.high} parts rated high, ${cnt.med} medium and ${cnt.low} low.`, `Vysoké riziko: ${cnt.high} dílů, střední: ${cnt.med}, nízké: ${cnt.low}.`))} ${rows.length ? e(T(`If "${sc.title}" lasted ${weeks} weeks, ${rows.filter((r) => r.status === "short").length} of the ${rows.length} parts that carry ${O.mName(sc.m).toLowerCase()} would run out before it ended.`, `Kdyby výpadek „${O.trStr(sc.title)}“ trval ${weeks} týdnů, ${rows.filter((r) => r.status === "short").length} z ${rows.length} dílů obsahujících surovinu ${O.mName(sc.m).toLowerCase()} by došlo dřív, než skončí.`)) : ""}</p>
      ${rated.filter((x) => x.r.level === "high").length ? `<h3>${e(T("Act on first", "Řešit nejdřív"))}</h3><ul>${rated.filter((x) => x.r.level === "high").map(({ it, r }) => `<li><b>${e(it.part)}</b> (${e(it.prog)}): ${e(r.why.join("; "))}</li>`).join("")}</ul>` : ""}
      <h2>${e(T("1. Register and risk rating", "1. Registr a hodnocení rizika"))}</h2>
      <table><thead><tr><th>${e(T("Product", "Výrobek"))}</th><th>${e(T("Part", "Díl"))}</th><th>${e(T("Materials", "Suroviny"))}</th><th>${e(T("Material from", "Surovina z"))}</th><th>${e(T("Stock", "Zásoby"))}</th><th>${e(T("Second source", "Druhý zdroj"))}</th><th>${e(T("Risk", "Riziko"))}</th><th>${e(T("Why", "Proč"))}</th></tr></thead><tbody>
      ${rated.map(({ it, r }) => `<tr><td>${e(it.prog)}</td><td>${e(it.part)}</td><td>${e(it.mats.map(O.mName).join(", ") || "–")}</td><td>${e(cName(it.country) || T("Unknown", "Neznámo"))}</td><td>${e(fmtW(it.stock))}</td><td>${it.second ? e(T("Yes", "Ano")) : e(T("No", "Ne"))}</td><td class="lv ${r.level}">${e(LV[r.level][0])}${r.level !== "none" ? ` ${r.score}/9` : ""}</td><td><ul>${r.why.map((w) => `<li>${e(w)}</li>`).join("")}</ul></td></tr>`).join("")}
      </tbody></table>
      <h2>${e(T("2. Where the materials are extracted and processed", "2. Kde se suroviny těží a zpracovávají"))}</h2>
      <table><thead><tr><th>${e(T("Material", "Surovina"))}</th><th>${e(T("Mining", "Těžba"))}</th><th>${e(T("Refining", "Rafinace"))}</th><th>${e(T("Component", "Komponenta"))}</th><th>${e(T("Sites on the atlas", "Lokality v atlasu"))}</th></tr></thead><tbody>
      ${ms.map((m) => { const s = O.STAGES[m], cell = (x, n) => x ? `${e(O.pctTxt(x))} ${e(O.ctry(x.who))}` : e(n ? O.trStr(n) : "–"); return `<tr><td><b>${e(O.mName(m))}</b></td><td>${cell(s.mine, s.mineNote)}</td><td>${cell(s.refine, s.refineNote)}</td><td>${cell(s.part, null)}</td><td>${e(O.SITES.filter((x) => x.m === m).map((x) => `${x.name} (${O.ctry(x.country)})`).join(", ") || "–")}</td></tr>`; }).join("")}
      </tbody></table>
      <p class="small">${e(T("Top-country share of world output at each stage (USGS Mineral Commodity Summaries 2025 and 2026, IEA Global Critical Minerals Outlook 2025). This maps the material, not your suppliers' own sourcing; confirm the latter with them.", "Podíl největší země na světové produkci v každé fázi (USGS Mineral Commodity Summaries 2025 a 2026, IEA Global Critical Minerals Outlook 2025). Mapuje surovinu, ne vlastní nákupy vašich dodavatelů; ty si ověřte u nich."))}</p>
      <h2>${e(T("3. Stress test", "3. Zátěžový test"))}: ${e(O.trStr(sc.title))}, ${weeks} ${e(T("weeks", "týdnů"))}</h2>
      <p class="small">${e(O.trStr(sc.prec))}</p>
      ${rows.length ? `<table><thead><tr><th>${e(T("Part", "Díl"))}</th><th>${e(T("Product", "Výrobek"))}</th><th>${e(T("Stock", "Zásoby"))}</th><th>${e(T("Result", "Výsledek"))}</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${e(r.it.part)}</td><td>${e(r.it.prog)}</td><td>${e(fmtW(r.it.stock))}</td><td>${r.status === "short" ? `<span class="high">${e(T(`Runs out in week ${r.it.stock}`, `Dojde v ${r.it.stock}. týdnu`))}</span>` : r.status === "covered" ? e(T("Covered", "Pokryto")) : r.status === "unknown" ? e(T("Stock not recorded", "Zásoby neuvedeny")) : e(T("Bought elsewhere: check upstream origin", "Nakoupeno jinde: ověřte původ suroviny"))}</td></tr>`).join("")}</tbody></table>` : `<p>${e(T("No part on the list carries this material.", "Žádný díl v seznamu tuto surovinu neobsahuje."))}</p>`}
      <h2>${e(T("4. Options to consider", "4. Možnosti k posouzení"))}</h2>
      <ul>${ms.map((m) => { const sp = O.EU_SP[m], rr = O.EOL_RIR[m], dl = O.deadlinesFor(m)[0]; const bits = []; if (sp) bits.push(sp.n ? T(`${sp.n} EU strategic projects`, `${sp.n} strategických projektů EU`) + (sp.named ? `: ${sp.named.join(", ")}` : "") : T("EU strategic projects", "Strategické projekty EU") + (sp.named ? `: ${sp.named.join(", ")}` : "")); if (rr) bits.push(T(`recycling meets ${rr.txt || rr.v + "%"} of EU demand`, `recyklace pokrývá ${rr.txt || rr.v + " %"} poptávky EU`)); if (dl) bits.push(T(`next deadline ${O.fmtDay(dl.date)}: ${dl.title}`, `nejbližší termín ${O.fmtDay(dl.date)}: ${dl.title_cs || dl.title}`)); return `<li><b>${e(O.mName(m))}</b>: ${e(bits.join("; ") || "–")}</li>`; }).join("")}</ul>
      <h2>${e(T("Method and limits", "Metoda a omezení"))}</h2>
      <p class="small">${e(T("Each part is scored out of 9 on its most exposed material: concentration at the most concentrated stage (up to 3), buying from that dominant country (2) or an unknown origin (1), no second source (1), stock under 8 weeks (2) or under 26 weeks or unrecorded (1), and a deadline within 45 days, a story this week or a live hazard near a site (1). High is 6 or more. The register was entered by the organisation named above and was not checked by OreOrbit. Public data only; not legal advice. Article 24 of Regulation (EU) 2024/1252 and its pending amendments set the formal requirements for the companies they cover.", "Každý díl má skóre z 9 podle nejexponovanější suroviny: koncentrace v nejkoncentrovanější fázi (až 3), nákup přímo z dominantní země (2) nebo neznámý původ (1), bez druhého zdroje (1), zásoby pod 8 týdnů (2) nebo pod 26 týdnů či neuvedené (1) a termín do 45 dnů, zpráva tento týden nebo živá hrozba u lokality (1). Vysoké je 6 a víc. Registr zadala výše uvedená organizace a OreOrbit ho neověřoval. Jen veřejná data; nejde o právní radu. Formální požadavky pro dotčené firmy stanoví článek 24 nařízení (EU) 2024/1252 a jeho připravované změny."))}</p>
      <p class="small">${e(T("Generated", "Vytvořeno"))} ${e(now.toISOString().slice(0, 16).replace("T", " "))} UTC · bohemiadefense.com/atlas</p>
    </body></html>`;
  }

  /* ---------- events ---------- */
  let saveT = 0;
  const changed = (full) => { store(); if (full) render(); else renderDerived(); };
  function itemOf(el) { const row = el.closest(".as-row"); return row ? reg.items.find((x) => x.id === row.dataset.id) : null; }
  if (root) {
    root.addEventListener("click", async (e) => {
      const t = e.target;
      const a = t.closest("[data-as]");
      if (a) {
        const k = a.dataset.as;
        if (k === "example") {
          if (reg.items.length && !confirm(T("Replace your register with the example?", "Nahradit váš registr příkladem?"))) return;
          reg.items = []; (CS ? EXAMPLE_CS : EXAMPLE_EN).forEach((r) => addRow(...r)); if (!reg.org) reg.org = T("Example manufacturer", "Vzorový výrobce");
          scnId = null; changed(true); O.toast(T("Example loaded", "Příklad načten")); return;
        }
        if (k === "paste") { const p = $("#as-paste"); p.hidden = !p.hidden; a.setAttribute("aria-expanded", String(!p.hidden)); if (!p.hidden) $("#as-paste-in").focus(); return; }
        if (k === "pastecancel") { $("#as-paste").hidden = true; return; }
        if (k === "pasteadd") { const n = parsePaste($("#as-paste-in").value); if (n) { changed(true); O.toast(T(`${n} rows added`, `Přidáno řádků: ${n}`)); } else O.toast(T("No rows recognised", "Žádné řádky nerozpoznány")); return; }
        if (k === "add") { addRow(reg.items.length ? reg.items[reg.items.length - 1].prog : T("Product", "Výrobek"), "", "", null, false, []); changed(true); const rows = root.querySelectorAll(".as-row"); const last = rows[rows.length - 1]; if (last) last.querySelector('[data-f="part"]').focus(); return; }
        if (k === "clear") { if (reg.items.length && confirm(T("Clear the whole register from this browser?", "Vymazat celý registr z tohoto prohlížeče?"))) { reg = { org: "", items: [] }; scnId = null; changed(true); } return; }
        if (k === "savefile") { await O.save(`oreorbit-register-${O.todayIso()}.json`, new Blob([JSON.stringify({ app: "OreOrbit", version: 1, saved: new Date().toISOString(), org: reg.org, items: reg.items }, null, 2)], { type: "application/json" })); return; }
        if (k === "openfile") { $("#as-file").click(); return; }
        if (k === "report") { try { await O.save(`oreorbit-assessment-${O.todayIso()}.html`, new Blob([reportHtml()], { type: "text/html;charset=utf-8" })); O.toast(T("Assessment saved", "Posouzení uloženo")); } catch (err) { if (!err || err.code !== "declined") O.toast(T("The download did not start.", "Stahování se nespustilo.")); } return; }
        if (k === "print") {
          const f = document.createElement("iframe"); f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0"; f.setAttribute("aria-hidden", "true");
          f.onload = () => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (err) { O.toast(T("Printing is blocked here; download the assessment instead.", "Tisk je zde blokovaný; stáhněte si posouzení.")); } setTimeout(() => f.remove(), 60000); };
          f.srcdoc = reportHtml(); document.body.appendChild(f); return;
        }
        if (k === "globe") { const ms = regMats(); O.showParts(ms.map((m) => ({ m, role: reg.items.filter((it) => it.mats.includes(m)).map((it) => it.part).slice(0, 3).join("; ") })), T("Your register", "Váš registr")); return; }
      }
      const mt = t.closest("[data-mt]"); if (mt) { const it = itemOf(mt); if (it) { it.mats = it.mats.filter((m) => m !== mt.dataset.mt); changed(true); } return; }
      if (t.closest("[data-del]")) { const it = itemOf(t); if (it) { reg.items = reg.items.filter((x) => x !== it); changed(true); } return; }
      const tb = t.closest("[data-astab]"); if (tb) { tab = tb.dataset.astab; root.querySelectorAll("[data-astab]").forEach((b) => b.setAttribute("aria-selected", String(b === tb))); $("#as-tab").innerHTML = tabHtml(); return; }
      const st = t.closest("[data-site]"); if (st) { O.showSite(st.dataset.site); return; }
      const mm = t.closest("[data-mat]"); if (mm) { O.showMaterial(mm.dataset.mat); }
    });
    root.addEventListener("change", (e) => {
      const t = e.target;
      if (t.id === "as-org") { reg.org = t.value.trim().slice(0, 120); store(); return; }
      if (t.id === "as-sys") { const s = O.SYSTEMS[t.value]; if (s) { s.parts.forEach((p) => addRow(O.trStr(s.name), O.trStr(p.role), "", null, false, [p.m])); changed(true); } return; }
      if (t.id === "as-scn") { scnId = t.value; $("#as-tab").innerHTML = tabHtml(); return; }
      if (t.id === "as-file") {
        const f = t.files && t.files[0]; if (!f) return;
        const rd = new FileReader();
        rd.onload = () => { try { const d = sanitise(JSON.parse(String(rd.result))); if (!d.items.length) throw new Error("empty"); reg = d; scnId = null; changed(true); O.toast(T(`${d.items.length} parts loaded`, `Načteno dílů: ${d.items.length}`)); } catch (err) { O.toast(T("That file is not an OreOrbit register.", "Tento soubor není registr OreOrbit.")); } t.value = ""; };
        rd.readAsText(f); return;
      }
      if (t.matches("[data-addmat]")) { const it = itemOf(t); if (it && t.value && !it.mats.includes(t.value)) { it.mats = O.ORDER.filter((m) => m === t.value || it.mats.includes(m)); changed(true); } return; }
      const f = t.dataset && t.dataset.f; if (!f) return;
      const it = itemOf(t); if (!it) return;
      if (f === "second") it.second = t.checked;
      else if (f === "stock") { const v = parseFloat(t.value); it.stock = t.value === "" || isNaN(v) ? null : Math.max(0, Math.min(520, Math.round(v))); }
      else if (f === "country") it.country = normC(t.value);
      else if (f === "part") { const before = it.part; it.part = t.value.trim().slice(0, 140); if (!it.mats.length || (before === "" && it.part)) { const d = detectRow(it.part, it.prog); if (d.length) { it.mats = d; changed(true); return; } } }
      else if (f === "prog") it.prog = t.value.trim().slice(0, 80);
      changed(false);
    });
    root.addEventListener("input", (e) => {
      if (e.target.id === "as-weeks") {
        weeks = +e.target.value; const v = $("#as-wk-v"); if (v) v.textContent = weeks;
        clearTimeout(saveT); saveT = setTimeout(() => { const tb = $("#as-tab"); if (!tb) return; const pos = e.target.value; tb.innerHTML = tabHtml(); const r = $("#as-weeks"); if (r) { r.value = pos; r.focus(); } }, 120);
      }
    });
  }
  let dataT = 0;
  window.addEventListener("oo-data", () => { clearTimeout(dataT); dataT = setTimeout(renderDerived, 400); });

  /* ---------- for teams ---------- */
  function renderTeams() {
    if (!tmRoot) return;
    const MP = String((window.ATLAS_CONFIG || {}).monitoringPrice || "49").trim();   /* build 55: the price comes from config.js, never typed */
    const mail = typeof CFG.contactEmail === "string" && /^[^@\s<>"]+@[^@\s<>"]+\.[a-z]{2,}$/i.test(CFG.contactEmail) ? CFG.contactEmail : "";
    const book = O.safeUrl(CFG.bookingUrl), sign = O.safeUrl(CFG.briefSignupUrl);
    const subj = encodeURIComponent(T("Article 24 readiness review", "Posouzení podle článku 24"));
    tmRoot.innerHTML = `<div class="tm">
      <dl class="tm-offers">
        <div class="tm-o"><dt><span class="tm-n">${T("Free", "Zdarma")}</span>${T("The atlas, the assessment and the Monday brief", "Atlas, posouzení a pondělní přehled")}</dt>
          <dd>${T("Everything on this page, from public data that is dated and linked, updated every day. The assessment runs in your browser and your register never leaves it.", "Vše na této stránce z veřejných, datovaných a odkazovaných dat, aktualizované každý den. Posouzení běží ve vašem prohlížeči a registr ho nikdy neopustí.")}</dd>
          <dd><a href="p/index.html">${T("Browse the library: every material and site as a page you can read and cite", "Projděte knihovnu: každá surovina a lokalita jako stránka k citaci")}</a></dd>
          ${sign ? `<dd><a class="btn ghost small" href="${esc(sign)}" target="_blank" rel="noopener">${T("Get the Monday brief by email", "Pondělní přehled e-mailem")}</a></dd>` : ""}</div>
        <div class="tm-o"><dt><span class="tm-n">${T("Tailored", "Na míru")}</span>${T("Article 24 readiness review", "Připravenost na článek 24")}</dt>
          <dd>${T("One product line, worked through with your engineers and buyers: the parts and suppliers behind it, where their materials are mined and refined, the stock you hold and what each export control would do to it. You get an assessment your board can sign, and a named analyst checks every figure in it.", "Jedna výrobní řada, prošlá s vašimi konstruktéry a nákupčími: díly a dodavatelé, kde se jejich suroviny těží a zpracovávají, jaké máte zásoby a co by s nimi udělala každá vývozní kontrola. Dostanete posouzení, které může vedení podepsat, a každý údaj v něm zkontroluje jmenovaný analytik.")}</dd>
          <dd><a href="oreorbit-sample-assessment.pdf">${T("Read a sample review (PDF, 7 pages)", "Ukázkové posouzení (PDF, 7 stran, anglicky)")}</a> · <a href="${O.LANG === "cs" ? "p/services-cs.html" : "p/services.html"}">${T("Services and prices", "Služby a ceny")}</a></dd></div>
        <div class="tm-o"><dt><span class="tm-n">${T("€" + MP + " a month", MP + " € měsíčně")}</span>${T("Monitoring for your register", "Sledování pro váš registr")}</dt>
          <dd>${T("We watch your minerals, their sites and deadlines around the clock. You hear from us when something changes, and every Monday. Ask us one question a month: a person answers within two working days.", "Sledujeme vaše suroviny, jejich lokality a termíny nepřetržitě. Ozveme se, když se něco změní, a každé pondělí. Jednou měsíčně se nás můžete na cokoli zeptat: odpoví člověk do dvou pracovních dnů.")}</dd></div>
      </dl>
      <div class="tm-side">
        <div class="label">${T("How a review runs", "Jak probíhá posouzení")}</div>
        <ol class="tm-steps">
          <li><b>${T("Map", "Mapování")}</b><span>${T("We fill the register with your team, part by part, in a working session.", "Registr vyplníme s vaším týmem díl po dílu na pracovním setkání.")}</span></li>
          <li><b>${T("Test", "Test")}</b><span>${T("We run every relevant export control and chokepoint against your stock.", "Proti vašim zásobám projdeme všechny relevantní vývozní kontroly a úzká místa.")}</span></li>
          <li><b>${T("Check", "Kontrola")}</b><span>${T("An analyst verifies the figures and sources, and signs the report.", "Analytik ověří údaje a zdroje a zprávu podepíše.")}</span></li>
          <li><b>${T("Hand over", "Předání")}</b><span>${T("You keep the register, the report and the board slides.", "Registr, zpráva i podklady pro vedení zůstávají vám.")}</span></li>
        </ol>
        ${mail || book ? `<div class="tm-cta">${mail ? `<a class="btn" href="mailto:${esc(mail)}?subject=${subj}">${T("Write to us", "Napište nám")}</a>` : ""}${book ? `<a class="btn ghost" href="${esc(book)}" target="_blank" rel="noopener">${T("Book a call", "Domluvit hovor")}</a>` : ""}</div>` : ""}
        <div class="tm-author" id="author">
          <img src="img/david-madali.jpg" alt="David Madali" width="120" height="150" loading="lazy">
          <div>
            <div class="label">${T("Who is behind OreOrbit", "Kdo stojí za OreOrbit")}</div>
            <h3>David Madali</h3>
            <p>${T("A Prague-based analyst of the defence industry, critical raw materials and the space economy, founder of Bohemia Defense and creator of OreOrbit.", "Pražský analytik obranného průmyslu, kritických surovin a kosmické ekonomiky, zakladatel Bohemia Defense a autor OreOrbit.")}</p>
            <p class="tm-cred">${T("Quoted by BBC News as an analyst. Background in economic diplomacy at the Czech Ministry of Foreign Affairs and in export consulting at CzechTrade, where he set up the “Chytrá bezpečnost” (Smart Security) cluster of 12 security-industry companies. Economist (University of Economics and Management, Prague), with EUSPA training in space technologies and building a space business.", "Jako analytika ho citovala BBC News. Zkušenosti z ekonomické diplomacie na Ministerstvu zahraničních věcí ČR a z exportního poradenství v CzechTrade, kde založil klastr „Chytrá bezpečnost“ dvanácti firem z bezpečnostního průmyslu. Ekonom (VŠEM Praha) s kurzy EUSPA o kosmických technologiích a budování kosmického byznysu.")}</p>
            <p class="tm-links"><a href="https://madali.cz/" target="_blank" rel="me noopener">madali.cz</a><a href="https://www.linkedin.com/in/davidmadali/" target="_blank" rel="me noopener">LinkedIn</a><a href="https://bohemiadefense.com/" target="_blank" rel="noopener">Bohemia Defense</a><a href="https://www.bbc.com/zhongwen/articles/cy8gjpe7xp8o/trad" target="_blank" rel="noopener" title="${esc(T("BBC News Chinese, July 2025", "BBC News, čínská služba, červenec 2025"))}">BBC News</a></p>
          </div>
        </div>
      </div>
    </div>`;
  }
  function renderImprint() {
    const el = $("#oo-imprint"); if (!el) return;
    const bits = [CFG.company, CFG.companyId ? `${T("Company ID", "IČO")} ${CFG.companyId}` : "", CFG.address].map((x) => String(x || "").trim()).filter(Boolean);
    const mail = typeof CFG.contactEmail === "string" && /^[^@\s<>"]+@[^@\s<>"]+\.[a-z]{2,}$/i.test(CFG.contactEmail) ? CFG.contactEmail : "";
    if (!bits.length && !mail) return;
    el.innerHTML = `${esc(bits.join(", "))}${mail ? `${bits.length ? " · " : ""}<a href="mailto:${esc(mail)}">${esc(mail)}</a>` : ""}`;
    el.hidden = false;
  }


  /* ---------- v15.3: links from the atlas to its readable, citable pages ---------- */
  function libraryLinks() {
    const foot = document.querySelector(".foot-links");
    if (foot && !foot.querySelector('a[href="p/index.html"]')) {
      [["p/index.html", T("Library", "Knihovna")], ["p/about.html", T("About OreOrbit", "O projektu")], ["p/legal.html", T("Imprint and licences", "Právní informace")]].forEach(([h, l]) => {
        const x = document.createElement("a"); x.href = h; x.textContent = l; foot.appendChild(x);
      });
    }
    const drawer = document.querySelector(".drawer");
    if (!drawer || !window.MutationObserver) return;
    const names = new Map(O.SITES.map((s) => [s.name, s.id]));
    let busy = false;
    const mark = () => {
      if (busy) return;
      const h = drawer.querySelector("h2, h3");
      const id = h && names.get(h.textContent.trim());
      const have = drawer.querySelector("a.pg-link");
      if (!id) { if (have) have.remove(); return; }
      if (have && have.dataset.id === id) return;
      busy = true;
      if (have) have.remove();
      const x = document.createElement("a");
      x.className = "pg-link"; x.dataset.id = id; x.href = "p/" + id + ".html";
      x.textContent = T("Read and cite this site's page", "Stránka lokality k citaci (anglicky)");
      h.insertAdjacentElement("afterend", x);
      busy = false;
    };
    new MutationObserver(mark).observe(drawer, { childList: true, subtree: true });
    mark();
  }
  libraryLinks();


  /* ---------- v15.4: the 60-second quick check; the quiz is retired ---------- */
  function quickCheck() {
    const quiz = document.getElementById("quiz");
    if (quiz) quiz.remove();
    document.querySelectorAll('a[href="#quiz"], option[value="#quiz"], [data-sec="quiz"]').forEach((x) => x.remove());
    const before = document.getElementById("monday");
    if (!before || document.getElementById("check")) return;
    const P = [
      ["drones", T("Drones", "Drony"), { ree: T("motor magnets", "magnety motorů"), li: T("battery cells", "bateriové články"), gr: T("battery anodes", "anody baterií"), co: T("battery cathodes", "katody baterií"), ni: T("battery cathodes", "katody baterií"), ga: T("radio links (GaN)", "rádiová spojení (GaN)"), ge: T("thermal camera lenses", "čočky termokamer") , mn: T("battery cathodes", "katody baterií") }],
      ["ammo", T("Ammunition and guided munitions", "Munice a řízená munice"), { sb: T("primers and hardened lead", "zápalky a tvrzené olovo"), w: T("penetrators and fragmentation", "penetrátory a střepinové účinky"), ree: T("fin actuators of guided rounds", "akční členy kormidel řízené munice"), ga: T("seekers and fuzes (GaN, GaAs)", "hlavice navádění a zapalovače (GaN, GaAs)") , mg: T("decoy flares and tracers", "klamné cíle a svítící náboje"), mn: T("steel shells and casings", "ocelové granáty a nábojnice") }],
      ["optics", T("Optics and thermal imaging", "Optika a termovize"), { ge: T("infrared lenses and windows", "infračervené čočky a okna"), ga: T("detectors (GaAs, InGaAs)", "detektory (GaAs, InGaAs)"), ree: T("laser rangefinders (Nd:YAG)", "laserové dálkoměry (Nd:YAG)") }],
      ["radar", T("Radar and electronics", "Radary a elektronika"), { ga: T("GaN power amplifiers", "výkonové zesilovače GaN"), ge: T("high-frequency chips", "vysokofrekvenční čipy"), ree: T("magnets and microwave garnets", "magnety a mikrovlnné granáty"), sb: T("infrared detectors (InSb)", "infračervené detektory (InSb)") }],
      ["vehicles", T("Armoured vehicles", "Obrněná vozidla"), { ti: T("armour and structures", "pancéřování a konstrukce"), w: T("penetrators and tooling", "penetrátory a nástroje"), ni: T("armour steel", "pancéřová ocel"), ree: T("electric drives and turrets", "elektrické pohony a věže") , mn: T("armour steel", "pancéřová ocel"), mg: T("light alloy parts", "díly z lehkých slitin") }],
      ["aero", T("Aircraft and space", "Letectví a kosmonautika"), { ti: T("airframes and engines", "draky a motory"), ni: T("engine superalloys", "superslitiny motorů"), co: T("engine superalloys", "superslitiny motorů"), ree: T("actuators and motors", "akční členy a motory"), ga: T("solar cells (GaAs)", "solární články (GaAs)"), ge: T("solar-cell substrates", "podložky solárních článků") , mg: T("titanium metal (Kroll process) and light alloys", "výroba titanu (Krollův proces) a lehké slitiny") }],
      ["batteries", T("Batteries and energy storage", "Baterie a úložiště energie"), { li: T("cells", "články"), co: T("cathodes", "katody"), ni: T("cathodes", "katody"), gr: T("anodes", "anody") , mn: T("NMC and LMFP cathodes", "katody NMC a LMFP") }],
    ];
    window.ooQC = {}; P.forEach((p) => { window.ooQC[p[0]] = { name: p[1], mins: Object.keys(p[2]) }; });   // v24: shared with This week and the sign-up forms
    const LV = { red: [T("High risk", "Vysoké riziko"), "qc-red"], amber: [T("Medium risk", "Střední riziko"), "qc-amber"], green: [T("Low risk", "Nízké riziko"), "qc-green"] };   // v47: "Watch" read as ambiguous to a first user
    const sec = document.createElement("section");
    sec.className = "section"; sec.id = "check"; sec.setAttribute("aria-labelledby", "check-h");
    sec.innerHTML = `<div class="inner">
      <div class="sec-head"><div class="label">${T("Quick check", "Rychlá kontrola")}</div><div>
        <h2 id="check-h">${T("What does your product depend on?", "Na čem závisí váš výrobek?")}</h2>
        <p>${T("Pick what you make. In one click: which of the twelve minerals it typically needs, who controls them, how much of Europe's imports come from China, and the next deadline that could hit it.", "Vyberte, co vyrábíte. Jedním kliknutím uvidíte, kterou z dvanácti surovin takový výrobek obvykle potřebuje, kdo ji ovládá, kolik evropského dovozu pochází z Číny a nejbližší termín, který ho může zasáhnout.")}</p></div></div>
      <div class="qc-prods" role="group" aria-label="${esc(T("What you make", "Co vyrábíte"))}">${P.map((p) => `<button type="button" class="qc-p" data-p="${p[0]}" aria-pressed="false">${esc(p[1])}</button>`).join("")}</div>
      <div class="qc-out" aria-live="polite"></div>
      <p class="qc-note">${T("Typical uses in such products; your own parts may differ. A readiness review maps your actual parts and suppliers.", "Typické použití v takových výrobcích; vaše díly se mohou lišit. Posouzení připravenosti zmapuje vaše skutečné díly a dodavatele.")}</p>
    </div>`;
    before.parentNode.insertBefore(sec, before);
    const nav = document.querySelector(".nav-links");
    if (nav && !nav.querySelector('a[href="#check"]')) { const x = document.createElement("a"); x.href = "#check"; x.textContent = T("Quick check", "Rychlá kontrola"); nav.insertBefore(x, nav.firstChild); }
    const out = sec.querySelector(".qc-out");
    const PENT = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24, 27];   // v47: one note per mineral in ORDER (12); with ten, nickel and graphite were silent
    const imTxt = (tp) => `${tp.pct}${O.LANG === "cs" ? "\u00a0%" : "%"} ${O.fromCc(tp.cc)}`;   // build 56: "24 % z USA", "32 % z Norska" (was the nominative after "z")
    const stg = (w) => (w.x.what ? O.trStr(w.x.what) : O.stageTxt(w.k) || "").toLowerCase();   // build 56: the tightest stage in the page language; x.what is English in STAGES, its Czech is in CS
    let current = "drones", last = null;
    function printResult() {
      if (!last) return;
      ooHit("act:qc-pdf");
      const day = O.fmtDay(new Date().toISOString().slice(0, 10)), strip = (h) => { const d = document.createElement("div"); d.innerHTML = h; return d.textContent; };
      const rows = last.rows.map((r) => `<tr><td><i style="background:${r.color}"></i><b>${esc(r.name)}</b><br><span>${esc(r.use)}</span></td><td><b>${esc(r.share)}</b><div class="bar"><div style="width:${r.pct || 0}%;background:${r.color}"></div></div></td><td>${esc(r.imp)}</td><td>${esc(r.lv)}</td></tr>`).join("");
      const html = `<!doctype html><html lang="${O.LANG === "cs" ? "cs" : "en"}"><head><meta charset="utf-8"><title>OreOrbit quick check: ${esc(last.name)}</title><style>
        @page{size:A4;margin:16mm}*{box-sizing:border-box}body{margin:0;font:10.5pt/1.5 "Hanken Grotesk",Helvetica,Arial,sans-serif;color:#15181b;-webkit-print-color-adjust:exact;print-color-adjust:exact}
        .top{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #dfe2e4;padding-bottom:4mm;margin-bottom:8mm;font-size:9pt;color:#5b6267}
        .top b{color:#15181b;font-size:11pt}h1{font-weight:300;font-size:26pt;letter-spacing:-.03em;line-height:1.05;margin:0 0 4mm}
        .sum{font-size:13pt;line-height:1.45;margin:0 0 3mm}.dl{color:#5b6267;margin:0 0 6mm}.dl b{color:#15181b}
        table{width:100%;border-collapse:collapse}th{text-align:left;font-size:8.5pt;color:#5b6267;font-weight:600;border-bottom:1px solid #c9cdd0;padding:2mm 2mm 2mm 0}
        td{border-bottom:1px solid #e6e8e9;padding:2.6mm 2mm 2.6mm 0;vertical-align:top}td span{color:#5b6267;font-size:9pt}td i{display:inline-block;width:2.6mm;height:2.6mm;border-radius:50%;margin-right:1.6mm}
        .bar{height:2mm;border-radius:2mm;background:#eef0f1;margin-top:1.4mm;overflow:hidden}.bar div{height:100%}
        .next{margin-top:8mm;padding:5mm 6mm;border-radius:3mm;background:#050607;color:#eceee9}.next b{color:#fff}.next a{color:#3ddc97;text-decoration:none}
        .note{margin-top:5mm;font-size:8.5pt;color:#6b7277}</style></head><body>
        <div class="top"><span><b>OreOrbit</b> · ${T("by Bohemia Defense", "od Bohemia Defense")}</span><span>${T("Quick check", "Rychlá kontrola")} · ${esc(day)}</span></div>
        <h1>${esc(last.name)}</h1><p class="sum">${esc(strip(last.sum))}</p>
        ${last.dl ? `<p class="dl">${T("Next deadline", "Nejbližší termín")}: <b>${esc(last.dl[0])}</b> · ${esc(last.dl[1])}</p>` : ""}
        <table><tr><th>${T("Mineral and use", "Surovina a použití")}</th><th>${T("Leading country, tightest stage", "Vedoucí země, nejužší fáze")}</th><th>${T("EU imports", "Dovoz do EU")}</th><th>${T("Level", "Úroveň")}</th></tr>${rows}</table>
        <div class="next"><b>${T("Want this for your actual parts list?", "Chcete to pro váš skutečný seznam dílů?")}</b> ${T("A readiness review maps one product line in two to three weeks; scope and price are agreed in a free 30-minute call.", "Posouzení připravenosti zmapuje jednu výrobní řadu za dva až tři týdny; rozsah a cenu domluvíme na úvodním 30minutovém hovoru zdarma.")}<br>
        David Madali · Bohemia Defense · <a href="mailto:david@madali.cz">david@madali.cz</a> · bohemiadefense.com/atlas</div>
        <p class="note">${T("Typical uses in such products; your own parts may differ. Shares: USGS and IEA; EU imports: Eurostat Comext; via OreOrbit. Not investment or legal advice.", "Typické použití v takových výrobcích; vaše díly se mohou lišit. Podíly: USGS a IEA; dovoz do EU: Eurostat Comext; přes OreOrbit. Nejde o investiční ani právní radu.")}</p>
        <script>window.onload=function(){setTimeout(function(){window.print()},300)}<\/script></body></html>`;
      const w = window.open(URL.createObjectURL(new Blob([html], { type: "text/html" })), "_blank");
      if (!w) alert(T("Please allow pop-ups to download the PDF.", "Pro stažení PDF povolte vyskakovací okna."));
      try { if (O.SND && O.SND.on) O.SND.tick(); } catch (e) {}
    }
    const snd = () => { try { return O.SND && O.SND.on ? O.SND : null; } catch (e) { return null; } };
    function render(id, quiet) {
      if (!quiet) { window.ooProduct = id; try { document.dispatchEvent(new CustomEvent("oo-qc", { detail: id })); } catch (e) {} }
      const p = P.find((x) => x[0] === id); if (!p) return;
      current = id;
      sec.querySelectorAll(".qc-p").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.p === id)));
      const ms = O.ORDER.filter((m) => p[2][m]);
      let conc = 0, cn = 0, next = null;
      const rows = ms.map((m) => {
        const w = O.worstOf(m), x = w && w.x, rag = O.ragFor(m) || {}, lv = LV[rag.level] || null, imp = O.importShare(m);
        if (x && x.pct > 65) { conc++; if (x.who === "China") cn++; }
        (O.deadlinesFor(m) || []).forEach((d) => { if (O.daysUntil(d.date) >= 0 && (!next || d.date < next.date)) next = d; });
        const share = x ? `<b>${esc(O.pctTxt(x))} ${esc(O.ctry(x.who))}</b> <span>${esc(stg(w))}</span>` : `<b>${T("China leads", "Vede Čína")}</b> <span>${T("no public world total", "veřejný světový údaj neexistuje")}</span>`;
        const im = imp && imp.tp ? `${esc(imTxt(imp.tp))} <span>(${esc(imp.tp.y || "")})</span>` : "–";
        return `<button type="button" class="qc-row" data-m="${m}" style="--c:${O.cssVar(m)}" title="${esc(T("Show on the globe", "Ukázat na glóbu"))}">
          <span class="qc-name"><i></i>${esc(O.mName(m))}<small>${esc(p[2][m])}</small></span>
          <span class="qc-share">${share}<span class="qc-bar"><span style="width:${x ? Math.min(100, x.pct) : 0}%"></span></span></span>
          <span class="qc-imp"><small>${T("EU imports", "Dovoz do EU")}</small>${im}</span>
          <span class="qc-lv">${lv ? `<em class="${lv[1]}" title="${esc((rag.why || []).join(" · ") || T("Nothing unusual this week", "Tento týden nic neobvyklého"))}">${lv[0]}</em>` : ""}</span></button>`;
      }).join("");
      const sum = T(`${p[1]} typically depend on <b>${ms.length} of the twelve</b> critical minerals. For <b>${conc}</b> of them one country controls more than 65% of a stage${cn ? `, China in ${cn}` : ""}.`,
                    `${p[1]} obvykle závisí na <b>${ms.length} z dvanácti</b> kritických surovin. U <b>${conc}</b> z nich ovládá jedna země přes 65 % některé fáze${cn ? `, Čína u ${cn}` : ""}.`);
      const dl = next ? `<p class="qc-dl"><span>${T("Next deadline", "Nejbližší termín")}</span> <b>${esc(O.fmtDay(next.date))}</b> · ${esc(O.LANG === "cs" && next.title_cs ? next.title_cs : next.title)}</p>` : "";
      last = { id, name: p[1], sum, dl: next ? [O.fmtDay(next.date), O.LANG === "cs" && next.title_cs ? next.title_cs : next.title] : null,
        rows: ms.map((m) => { const w = O.worstOf(m), x = w && w.x, rag = O.ragFor(m) || {}, imp = O.importShare(m);
          let col = O.cssVar(m);
          const vm = /^var\((--[^),]+)/.exec(col || "");
          if (vm) col = getComputedStyle(document.documentElement).getPropertyValue(vm[1]).trim() || getComputedStyle(document.body).getPropertyValue(vm[1]).trim() || "#9aa1a5";
          return { m, name: O.mName(m), use: p[2][m], color: col, pct: x ? x.pct : null,
            share: x ? `${O.pctTxt(x)} ${O.ctry(x.who)}` : T("China leads (no public world total)", "Vede Čína (veřejný světový údaj neexistuje)"),
            imp: imp && imp.tp ? `${imTxt(imp.tp)} (${imp.tp.y || ""})` : "–", lv: (LV[rag.level] || [""])[0] }; }) };
      // v43 funnel: 1. monitoring for exactly these minerals, 2. the full review, 3. a call (as a text link)
      const C43 = window.ATLAS_CONFIG || {}, PR43 = String(C43.monitoringPrice || "49").trim();
      const BK43 = O.safeUrl ? (O.safeUrl(C43.bookingUrl) || "mailto:david@madali.cz") : (C43.bookingUrl || "mailto:david@madali.cz");
      const n43 = ms.length, csW = n43 >= 2 && n43 <= 4 ? "tyto " + n43 + " suroviny" : "těchto " + n43 + " surovin";
      const lvKey = `<p class="qc-key">${esc(T("High risk: one country controls more than 65% of a stage and something is moving this week (a deadline within 45 days, news, or a hazard or conflict near a site). Medium risk: only one of the two. Low risk: neither.", "Vysoké riziko: jedna země ovládá přes 65 % některé fáze a zároveň se tento týden něco děje (termín do 45 dní, zprávy, hrozba nebo konflikt u lokality). Střední riziko: platí jen jedno z toho. Nízké riziko: ani jedno."))}</p>`;
      out.innerHTML = `<p class="qc-sum">${sum}</p>${dl}<div class="qc-rows">${rows}</div>${lvKey}
        <div class="qc-ctas"><a class="btn qc-mon" href="#teams">${esc(T("Get alerts for these " + n43 + " minerals", "Hlídat " + csW))}</a><a class="btn ghost" href="${O.LANG === "cs" ? "p/services-cs.html" : "p/services.html"}">${T("Full review of your product line", "Plné posouzení vaší výrobní řady")}</a><button type="button" class="btn ghost qc-pdf">${T("Download my result (PDF)", "Stáhnout výsledek (PDF)")}</button></div>
        <p class="qc-cta-note">${esc(T("Monitoring: an email the same day something changes for these minerals, €" + PR43 + " a month, cancel anytime.", "Monitoring: e-mail ještě týž den, kdy se u těchto surovin něco změní, " + PR43 + " € měsíčně, zrušíte kdykoli."))} ${esc(T("Not sure yet?", "Ještě si nejste jistí?"))} <a href="${esc(BK43)}" target="_blank" rel="noopener">${esc(T("Book a 30-minute call", "Domluvte si 30minutový hovor"))}</a></p>`;
      out.querySelector(".qc-pdf").addEventListener("click", printResult);
      out.querySelector(".qc-mon").addEventListener("click", (ev) => {
        ev.preventDefault();
        ooHit("act:qc-mon");
        try { const s = snd(); if (s) s.tick(); } catch (e) {}
        if (window.ooMonSet) window.ooMonSet(ms);   // the plan's "Watch:" line takes exactly this product's minerals
        const col = document.querySelector("#teams .pl3-b"), card = col || document.querySelector("#teams .pl3") || document.getElementById("teams");
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "start" });   // the monitoring card's top, below the fixed header (scroll-margin in CSS)
          if (col) { col.classList.remove("qc-hl"); void col.offsetWidth; col.classList.add("qc-hl"); setTimeout(() => col.classList.remove("qc-hl"), 2600); }
          const pay = document.querySelector("#teams .pl3-pay"); if (pay) setTimeout(() => { try { pay.focus({ preventScroll: true }); } catch (e) {} }, 700);
        }
        try { history.replaceState(null, "", "#teams"); } catch (e) {}
      });
      out.querySelectorAll(".qc-row").forEach((r) => r.addEventListener("click", () => { const s = snd(); if (s) s.tick(); O.showMaterial(r.dataset.m); }));
      const s = quiet ? null : snd();
      if (s) ms.forEach((m, i) => setTimeout(() => { const f = 330 * Math.pow(2, (PENT[O.ORDER.indexOf(m)] ?? 0) / 12); s.blip(f, f, 0.16, 0.035, "triangle"); }, 90 * i));
    }
    sec.querySelectorAll(".qc-p").forEach((b) => b.addEventListener("click", () => { render(b.dataset.p); ooHit("qc:" + b.dataset.p); }));
    render("drones", true);
    // the trade data arrives after the page: draw again once it is there, and when the section comes into view
    [3000, 9000].forEach((t) => setTimeout(() => render(current, true), t));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => { if (es.some((x) => x.isIntersecting)) render(current, true); }, { threshold: 0.15 });
      io.observe(sec);
    }
  }
  /* v15.9: anonymous daily counts (no cookies, no IP addresses) */
  /* v34: the atlas can rebuild the chip row, so it is always looked up afresh, never kept */
  const PK = () => document.getElementById("mon-pick");
  /* react only to the chips themselves: a chip pressed, or a new chip row put in place (never to other text in the section, so no loops) */
  const isPick = (n) => n && n.nodeType === 1 && (n.id === "mon-pick" || !!n.closest("#mon-pick") || !!(n.querySelector && n.querySelector("#mon-pick")));
  const watchPick = (fn) => {
    const sec = document.getElementById("monday") || document.body; let q = 0;
    new MutationObserver((recs) => {
      const hit = recs.some((r) => r.type === "attributes" ? isPick(r.target) : (isPick(r.target) || [...r.addedNodes].some(isPick) || [...r.removedNodes].some((n) => n.nodeType === 1 && (n.id === "mon-pick" || (n.querySelector && n.querySelector("#mon-pick"))))));
      if (hit && !q) q = requestAnimationFrame(() => { q = 0; fn(); });
    }).observe(sec, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-pressed"] });
  };
  function ooHit(e){try{if(navigator.doNotTrack==="1"||navigator.globalPrivacyControl)return;var u="https://bohemiadefense.com/atlas/count.php?e="+encodeURIComponent(e);if(navigator.sendBeacon)navigator.sendBeacon(u);else fetch(u,{method:"POST",mode:"no-cors",keepalive:true});}catch(x){}}
  document.addEventListener("click",function(ev){var a=ev.target.closest&&ev.target.closest("a,button");if(!a)return;var h=a.getAttribute("href")||"";if(/^mailto:/.test(h))ooHit("act:mail");else if(/sample-assessment/.test(h))ooHit("act:sample");else if(/services(-cs)?\.html/.test(h))ooHit("act:services");else if(/linkedin\.com/.test(h))ooHit("act:linkedin");else if(a.id==="nav-tour")ooHit("act:tour");},true);
  ooHit(O.LANG === "cs" ? "atlas:cs" : "atlas:en");
  try { quickCheck(); } catch (e) { /* the atlas works without it */ }


  /* ---------- v15.5: one story instead of thirteen equal sections ---------- */
  function restructure() {
    const ORDER = ["check", "monday", "briefing", "signals", "teams", "trust", "method", "health", "assess", "scenarios", "rules", "exposure", "chokepoints"];   // v24
    const FOLD = {
      scenarios: [T("Stop a material or close a sea route, and see which systems lose it, what Europe imports and which deadlines fall inside the window.", "Zastavte surovinu nebo uzavřete námořní trasu a uvidíte, které systémy ji ztratí, co Evropa dováží a které termíny spadají do zvoleného období.")],
      rules: [T("The US rule that bars Chinese magnets and tungsten from defence supply from 1 January 2027, which atlas sites would not qualify, who is paying for supply outside China, and responsible-sourcing rules.", "Americké pravidlo, které od 1. ledna 2027 vylučuje čínské magnety a wolfram z obranných dodávek, které lokality atlasu nevyhoví, kdo platí za dodávky mimo Čínu, a pravidla odpovědného získávání surovin.")],
    };
    const first = document.getElementById("check");
    if (!first) return;
    const parent = first.parentNode;
    let prev = first;
    ORDER.slice(1).forEach((id) => { const el = document.getElementById(id); if (el && el.parentNode === parent) { prev.after(el); prev = el; } });
    // folded sections: header and one line, the rest one click away
    const open = (sec, yes) => {
      sec.classList.toggle("closed", !yes);
      const b = sec.querySelector(".fold-btn"); if (b) { b.setAttribute("aria-expanded", String(yes)); b.textContent = yes ? T("Hide", "Skrýt") : T("Show", "Zobrazit"); }
      if (yes) setTimeout(() => window.dispatchEvent(new Event("resize")), 60);
    };
    Object.keys(FOLD).forEach((id) => {
      const sec = document.getElementById(id); if (!sec || sec.querySelector(".fold-bar")) return;
      const head = sec.querySelector(".sec-head"); if (!head) return;
      const bar = document.createElement("div"); bar.className = "fold-bar";
      bar.innerHTML = `<p>${esc(FOLD[id][0])}</p><button type="button" class="fold-btn" aria-expanded="false" aria-controls="${id}">${T("Show", "Zobrazit")}</button>`;
      head.after(bar);
      sec.classList.add("fold", "closed");
      bar.querySelector(".fold-btn").addEventListener("click", () => { const yes = sec.classList.contains("closed"); open(sec, yes); try { if (O.SND && O.SND.on) O.SND.tick(); } catch (e) {} });
    });
    const openFor = (hash) => { const id = (hash || "").replace("#", ""); const sec = FOLD[id] && document.getElementById(id); if (sec && sec.classList.contains("closed")) open(sec, true); };
    openFor(location.hash);
    window.addEventListener("hashchange", () => openFor(location.hash));
    document.addEventListener("click", (ev) => { const a = ev.target.closest && ev.target.closest('a[href^="#"]'); if (a) openFor(a.getAttribute("href")); }, true);
    // the navigation follows the chapters
    const nav = document.querySelector(".nav-links");
    const CH = [["#check", T("Quick check", "Rychlá kontrola")], ["#monday", T("This week", "Tento týden")], ["#signals", T("Evidence", "Důkazy")], ["#teams", T("Monitoring", "Monitoring")]];
    if (nav) {
      nav.querySelectorAll("a:not([data-explore])").forEach((a) => a.remove());
      CH.forEach(([h, l], i) => { const a = document.createElement("a"); a.href = h; a.textContent = l; a.className = "ch-link" + (i > 1 ? " ch-more" : ""); nav.appendChild(a); });
    }
    // the Sections menu in the same order
    const list = document.getElementById("sec-list");
    const sortList = () => {
      if (!list) return;
      list.querySelectorAll('a[href="#briefing"], a[href="#scenarios"], a[href="#chokepoints"]').forEach((a) => { const li = a.closest("li"); if (li) li.remove(); });
      const items = [...list.children];
      const pos = (li) => { const a = li.querySelector("a[href^='#']"); const i = a ? ORDER.indexOf(a.getAttribute("href").slice(1)) : -1; return i < 0 ? (a && a.getAttribute("href") === "#top" ? -1 : 99) : i; };
      if (!list.querySelector('a[href="#check"]')) {
        const tpl = list.querySelector('a[href="#monday"]');
        if (tpl) {
          const li = tpl.closest("li").cloneNode(true), a = li.querySelector("a");
          a.href = "#check"; a.setAttribute("data-sec", "check"); a.setAttribute("aria-current", "false");
          const spans = a.querySelectorAll("span"); if (spans[1]) spans[1].textContent = T("Quick check", "Rychlá kontrola");
          list.appendChild(li); items.push(li);
        }
      }
      items.sort((x, y) => pos(x) - pos(y)).forEach((li) => list.appendChild(li));
      let n = 0;
      [...list.children].forEach((li) => { const sn = li.querySelector(".sn"); if (sn) sn.textContent = String(++n).padStart(2, "0"); });
    };
    sortList();
    if (list && window.MutationObserver) { let busy = false; new MutationObserver(() => { if (busy) return; busy = true; sortList(); setTimeout(() => { busy = false; }, 50); }).observe(list, { childList: true }); }
    // a plain-language line under each signal
    const MEAN = [
      [/^EU imports|^Dovoz do EU/i, T("If one country supplies most of a product, a single licensing decision there can stop European factories. Shares above 50% deserve a second source.", "Když většinu výrobku dodává jedna země, jediné rozhodnutí o licencích tam může zastavit evropské továrny. Podíly nad 50 % si zaslouží druhý zdroj.")],
      [/^Ships|^Lodě/i, T("Fewer ships through Bab-el-Mandeb or Malacca mean longer routes around Africa: two to three extra weeks and higher freight costs for anything coming from Asia.", "Méně lodí přes Bab al-Mandab nebo Malacký průliv znamená delší trasy kolem Afriky: o dva až tři týdny déle a vyšší přepravné u všeho z Asie.")],
      [/^Armed conflict|^Ozbrojen/i, T("Fighting near a mine or a route raises the risk of stoppages and the cost of insurance. It does not by itself mean output has stopped.", "Boje poblíž dolu nebo trasy zvyšují riziko výpadků a cenu pojištění. Samy o sobě neznamenají, že se výroba zastavila.")],
      [/^Europe's defence demand|^Poptávka/i, T("More tenders for weapons and ammunition mean more demand for the same scarce minerals, and longer delivery times from suppliers.", "Více zakázek na zbraně a munici znamená vyšší poptávku po stejných vzácných surovinách a delší dodací lhůty.")],
      [/^Research|^Výzkum/i, T("More research on substitutes shows Europe looking for a way around a dependency. It takes years before it changes supply.", "Více výzkumu náhrad ukazuje, že Evropa hledá cestu, jak závislost obejít. Než to změní dodávky, trvá to roky.")],
      [/^Heat|^Teplo/i, T("Furnace-hot pixels at a smelter or refinery usually mean it is running. Weeks without heat can mean a stoppage, or simply clouds.", "Pixely horké jako pec u huti nebo rafinerie obvykle znamenají, že běží. Týdny bez tepla mohou znamenat odstávku, nebo jen mraky.")],
      [/^Sulphur|^Oxid siřičitý/i, T("Sulphur dioxide over a smelter tracks how hard it is working: a sudden drop can be a slowdown, a rise a ramp-up.", "Oxid siřičitý nad hutí ukazuje, jak naplno pracuje: náhlý pokles může být útlum, nárůst rozjezd výroby.")],
    ];
    const sig = document.getElementById("signals");
    const mark = () => {
      if (!sig) return;
      sig.querySelectorAll("h3").forEach((h) => {
        if (h.nextElementSibling && h.nextElementSibling.classList.contains("sig-mean")) return;
        const hit = MEAN.find(([re]) => re.test(h.textContent.trim()));
        if (!hit) return;
        const p = document.createElement("p"); p.className = "sig-mean";
        p.innerHTML = `<b>${T("What it means", "Co to znamená")}</b> ${esc(hit[1])}`;
        h.after(p);
      });
    };
    mark();
    if (sig && window.MutationObserver) { let t = 0; new MutationObserver(() => { clearTimeout(t); t = setTimeout(mark, 120); }).observe(sig, { childList: true, subtree: true }); }
  }
  try { restructure(); } catch (e) { /* the atlas works without it */ }


  /* ---------- v16: three sections become one story each; 2030 targets retired; sections are counted ---------- */
  function mergeSections() {
    const cp = document.getElementById("chokepoints");
    if (cp) { cp.hidden = true; cp.style.display = "none"; }
    document.querySelectorAll('a[href="#chokepoints"]').forEach((a) => { const li = a.closest("li"); if (li) li.remove(); else a.remove(); });
    const join = (mainId, subId) => {
      const m = document.getElementById(mainId), s = document.getElementById(subId);
      if (!m || !s) return;
      if (m.nextElementSibling !== s) m.after(s);
      m.classList.add("has-joined"); s.classList.add("joined");
      if (m.classList.contains("band-light")) s.classList.add("band-light");
    };
    join("monday", "briefing");
    join("assess", "scenarios");
    // anonymous counts: which sections people actually see, and which folded ones they open
    const seen = {};
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((x) => {
        const id = x.target.id;
        if (x.isIntersecting && !seen[id]) { seen[id] = 1; ooHit("sec:" + id); io.unobserve(x.target); }
      }), { threshold: 0.3 });
      document.querySelectorAll("section.section[id]").forEach((s) => { if (!s.hidden && s.id !== "chokepoints") io.observe(s); });
    }
    document.addEventListener("click", (ev) => {
      const b = ev.target.closest && ev.target.closest(".fold-btn");
      if (b && b.getAttribute("aria-expanded") === "false") ooHit("open:" + (b.getAttribute("aria-controls") || "unknown"));
    }, true);
  }
  try { mergeSections(); } catch (e) { /* the atlas works without it */ }


  /* ---------- v17: a clearer first minute: one main action, plain names, a three-step guide, a calmer globe ---------- */
  function clarity() {
    // 1. one main action in the opening screen
    const cta = document.querySelector(".hero-cta"), ex = document.getElementById("cta-explore"), as = document.getElementById("cta-assess");
    if (cta && !document.getElementById("cta-check")) {
      const a = document.createElement("a");
      a.id = "cta-check"; a.className = "btn"; a.href = "#check";
      a.innerHTML = esc(T("Check your product in 60 seconds", "Prověřte svůj výrobek za 60 sekund")) + ' <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
      cta.insertBefore(a, cta.firstChild);
      if (ex) { ex.classList.add("ghost"); ex.childNodes[0].textContent = T("Explore the globe ", "Prozkoumat glóbus "); }
      if (as) { as.hidden = true; as.style.display = "none"; }
    }
    // 2. plain names for the sections
    const name = (id, label, h2) => {
      const s = document.getElementById(id); if (!s) return;
      const l = s.querySelector(".sec-head .label"); if (l && label) l.textContent = label;
      const h = s.querySelector(".sec-head h2"); if (h && h2) h.textContent = h2;
    };
    name("monday", T("This week", "Tento týden"), T("What's moving this week.", "Co se tento týden hýbe."));
    name("exposure", T("The twelve minerals", "Dvanáct surovin"));
    name("signals", T("Live evidence", "Živé důkazy"));
    name("rules", T("Deadlines and EU funding", "Termíny a peníze EU"));
    name("teams", T("Work with us", "Spolupráce"));
    name("assess", T("Your parts list", "Vlastní díly"));
    // 3. a three-step guide right under the opening screen
    const check = document.getElementById("check");
    if (check && !document.querySelector(".steps-band")) {
      const band = document.createElement("div");
      band.className = "steps-band";
      band.setAttribute("aria-label", T("How to use the atlas", "Jak atlas používat"));
      const step = (n, href, t, s) => `<a href="${href}"><b>${n}</b><span>${esc(t)}<small>${esc(s)}</small></span></a>`;
      band.innerHTML = '<div class="inner">' +
        step(1, "#check", T("Check your product", "Prověřte svůj výrobek"), T("Which minerals it depends on, in 60 seconds", "Na kterých surovinách závisí, za 60 sekund")) +
        step(2, "#monday", T("See what's moving this week", "Podívejte se, co se tento týden hýbe"), T("Status, deadlines and this week's changes", "Stav, termíny a změny tohoto týdne")) +
        step(3, "#assess", T("Test your own parts list", "Otestujte vlastní seznam dílů"), T("A risk rating per part, in your browser", "Hodnocení rizika pro každý díl, ve vašem prohlížeči")) + '</div>';
      check.parentNode.insertBefore(band, check);
      band.querySelectorAll("a").forEach((a, i) => a.addEventListener("click", () => ooHit("act:step" + (i + 1))));
    }
    // 4. a calmer globe: the busy layers appear when someone explores
    if (O.layers && typeof O.setLayer === "function") {
      const layers = O.layers, setLayer = O.setLayer;
      const BUSY = ["satellite", "hazards", "ships", "conflict", "activity"];
      const saved = {}; BUSY.forEach((k) => { saved[k] = layers[k] !== false; });
      let exploring = null;
      const sync = () => {
        const on = document.body.classList.contains("exploring");
        if (on === exploring) return;
        if (on) BUSY.forEach((k) => setLayer(k, saved[k]));
        else { if (exploring) BUSY.forEach((k) => { saved[k] = !!layers[k]; }); BUSY.forEach((k) => setLayer(k, false)); }
        exploring = on;
      };
      new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ["class"] });
      sync();
    }
  }
  try { clarity(); } catch (e) { /* the atlas works without it */ }


  /* ---------- v17.1: "This week" is one section with two tabs: your minerals, and all of Europe ---------- */
  function weekTabs() {
    const mon = document.getElementById("monday"), bri = document.getElementById("briefing");
    const inner = mon && mon.querySelector(".inner");
    if (!inner || !bri) return;
    bri.classList.add("tabbed");
    let cur = "mine";
    const parts = () => [...inner.children].filter((el) => !el.classList.contains("sec-head") && !el.classList.contains("wk-tabs") && !el.classList.contains("wk-cap"));
    const show = (t, user) => {
      cur = t;
      parts().forEach((el) => el.classList.toggle("wk-hide", t !== "mine"));
      const p = mon.querySelector(".sec-head p"); if (p) p.classList.toggle("wk-hide", t !== "mine");
      bri.classList.toggle("wk-off", t !== "all");
      inner.querySelectorAll(".wk-tabs button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.t === t)));
      if (user && t === "all") ooHit("act:tab-all");
      if (t === "all") setTimeout(() => window.dispatchEvent(new Event("resize")), 60);
    };
    const build = () => {
      if (inner.querySelector(".wk-tabs")) return;
      const bar = document.createElement("div");
      bar.className = "wk-tabs"; bar.setAttribute("role", "tablist");
      bar.innerHTML = `<button type="button" role="tab" data-t="mine" aria-selected="true">${esc(T("Your minerals", "Vaše suroviny"))}</button><button type="button" role="tab" data-t="all" aria-selected="false">${esc(T("All of Europe", "Celá Evropa"))}</button>`;
      const head = inner.querySelector(".sec-head");
      if (head) head.after(bar); else inner.insertBefore(bar, inner.firstChild);
      bar.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { show(b.dataset.t, true); try { if (O.SND && O.SND.on) O.SND.tick(); } catch (e) {} }));
      show(cur);
    };
    build();
    // the atlas redraws parts of this section; keep the tabs and the current choice
    if (window.MutationObserver) new MutationObserver(() => { build(); show(cur); }).observe(inner, { childList: true });
    // links to the brief switch to its tab
    const goAll = () => { show("all", true); mon.scrollIntoView({ behavior: "smooth" }); };
    document.addEventListener("click", (ev) => {
      const a = ev.target.closest && ev.target.closest('a[href="#briefing"]');
      if (a) { ev.preventDefault(); goAll(); }
    }, true);
    if (location.hash === "#briefing") goAll();
  }
  try { weekTabs(); } catch (e) { /* the atlas works without it */ }


  /* ---------- v18: four blocks: product pick in the hero, one deep-dive tool, deadlines, work with us + data and method ---------- */
  function fourBlocks() {
    const $i = (x) => document.getElementById(x);
    const check = $i("check"); if (!check) return;
    document.querySelectorAll("section.stats").forEach((s) => { s.style.display = "none"; });   // the same figures appear in the quick check
    // v19: the opening keeps one main button; the extra line above the headline stays out
    const h1x = document.querySelector("#hero-copy h1"), over = h1x && h1x.previousElementSibling;
    if (over && over.classList.contains("label")) { over.hidden = true; over.style.display = "none"; }
    if (h1x && h1x.nextElementSibling && h1x.nextElementSibling.tagName === "P") h1x.nextElementSibling.textContent = T("See what your product depends on, who controls it, and what is moving this week.", "Zjistěte, na čem váš výrobek závisí, kdo to ovládá a co se tento týden hýbe.");
    // shared: a block header with tabs
    const block = (id, label, h2, p, tabs, cls) => {
      const s = document.createElement("section"); s.className = "section " + cls; s.id = id;
      s.innerHTML = `<div class="inner"><div class="sec-head"><div class="label">${esc(label)}</div><div><h2>${esc(h2)}</h2><p>${esc(p)}</p></div></div><div class="dd-tabs" role="tablist">${tabs.map(([k, l]) => `<button type="button" role="tab" data-t="${k}" aria-selected="false">${esc(l)}</button>`).join("")}</div></div>`;
      return s;
    };
    const place = (head, ids, cls) => { let prev = head; ids.forEach((x) => { const el = $i(x); if (el) { prev.after(el); prev = el; el.classList.add(cls); } }); };
    // v19: the supply-chain view overlapped with "Your parts list" and the quick check; it stays out of the page (its detail lives on the library pages)
    const ex = $i("exposure"); if (ex) { ex.hidden = true; ex.style.display = "none"; }
    window.ooShowTab = () => {};
    // 3. deadlines stay on their own (rules), 4. work with us, then one data-and-method block
    const teams = $i("teams");
    const TR = { method: "method", health: "health" };
    const tr = block("trust", T("Data and method", "Data a metoda"), T("How we know.", "Jak to víme."),
      T("Where every figure comes from, what it can and cannot tell you, and how fresh each source is.", "Odkud každé číslo pochází, co z něj lze a nelze vyčíst a jak čerstvý je každý zdroj."),
      [["method", T("Method", "Metoda")], ["health", T("Data health", "Stav dat")]], "tr-head");
    if (teams) { teams.after(tr); place(tr, ["method", "health"], "tr-part"); }
    let trCur = null;
    const showTR = (t, user) => {
      trCur = (trCur === t && user) ? null : t;   // a second click on the open tab folds it again
      Object.keys(TR).forEach((k) => { const el = $i(TR[k]); if (el) el.classList.toggle("tr-off", k !== trCur); });
      tr.querySelectorAll(".dd-tabs button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.t === trCur)));
      if (user && trCur) ooHit("open:" + TR[trCur]);
      setTimeout(() => window.dispatchEvent(new Event("resize")), 60);
    };
    tr.querySelectorAll(".dd-tabs button").forEach((b) => b.addEventListener("click", () => showTR(b.dataset.t, true)));
    Object.values(TR).forEach((x) => { const el = $i(x); if (el) el.classList.add("tr-off"); });
    // links into the parts open the right tab
    const MAP = { method: "method", health: "health" };
    const route = (id) => { const r = MAP[id]; if (r && trCur !== r) showTR(r); };
    document.addEventListener("click", (ev) => { const a = ev.target.closest && ev.target.closest('a[href^="#"]'); if (a) route(a.getAttribute("href").slice(1)); }, true);
    route(location.hash.slice(1));
    // the three-step guide follows the four blocks
    const band = document.querySelector(".steps-band .inner");
    if (band) {
      const step = (n, href, t, s) => `<a href="${href}"><b>${n}</b><span>${esc(t)}<small>${esc(s)}</small></span></a>`;
      band.innerHTML = step(1, "#check", T("Check your product", "Prověřte svůj výrobek"), T("Which minerals it depends on, in 60 seconds", "Na kterých surovinách závisí, za 60 sekund")) +
        step(2, "#monday", T("See what's moving this week", "Podívejte se, co se tento týden hýbe"), T("Status, deadlines and this week's changes", "Stav, termíny a změny tohoto týdne")) +
        step(3, "#assess", T("Test your own parts list", "Otestujte vlastní seznam dílů"), T("A risk rating per part, in your browser", "Hodnocení rizika pro každý díl, ve vašem prohlížeči"));
      band.querySelectorAll("a").forEach((a, i) => a.addEventListener("click", () => ooHit("act:step" + (i + 1))));
    }
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { ooHit("sec:" + x.target.id); io.unobserve(x.target); } }), { threshold: 0.3 });
      io.observe(tr);
    }
  }
  try { fourBlocks(); } catch (e) { /* the atlas works without it */ }
  try { if (O.renderSecList) O.renderSecList(); } catch (e) { /* the menu redraws on the next scroll anyway */ }

  /* ---------- v19: light motion in the brand style: section headings rise into view (CSS only, no motion if the visitor asks for less) ---------- */
  function motion() {
    if (!("IntersectionObserver" in window) || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    if (navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|inspectiontool|headless/i.test(navigator.userAgent || "")) return;   // robots always see everything at once
    const els = [...document.querySelectorAll(".section .sec-head, .steps-band a, .fold-bar")];
    const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { const t = x.target; t.classList.add("oo-in"); io.unobserve(t); setTimeout(() => t.classList.remove("oo-rise"), 1200); } }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    els.forEach((el, k) => { if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("oo-rise"); el.style.transitionDelay = (el.closest(".steps-band") ? (k % 3) * 80 : 0) + "ms"; io.observe(el); } });
    const wk = document.querySelector("#monday .sec-head .label"); if (wk) wk.classList.add("oo-live");
  }


  /* ---------- v20: simpler This week, evidence tiles, an easy parts-list start, a new Work with us, clear rules ---------- */
  function v20() {
    const $i = (x) => document.getElementById(x);
    const toggleBtn = (cls, onTxt, offTxt) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "oo-more " + cls; b.textContent = onTxt;
      b.addEventListener("click", () => { const on = document.body.classList.toggle("oo-detail-week"); document.querySelectorAll(".oo-more.wk").forEach((x) => { x.textContent = on ? offTxt : onTxt; }); if (on) ooHit("act:week-details"); });
      return b;
    };
    // 3. This week: one caption in the same place for both tabs, a simple view first, details on request
    const mon = $i("monday"), inner = mon && mon.querySelector(".inner");
    if (inner && !inner.querySelector(".wk-cap")) {
      const cap = document.createElement("p"); cap.className = "wk-cap";
      const CAP = { mine: T("Pick the minerals you answer for. Each gets a status, this week's changes and its next deadline.", "Vyberte suroviny, za které odpovídáte. Každá dostane stav, změny tohoto týdne a nejbližší termín."),
                    all: T("The week across Europe, assembled every Monday from OreOrbit's own data and the week's headlines.", "Týden v celé Evropě, sestavený každé pondělí z dat OreOrbit a hlavních zpráv týdne.") };
      const setCap = () => { const sel = inner.querySelector('.wk-tabs button[aria-selected="true"]'); cap.textContent = CAP[(sel && sel.dataset.t) || "mine"]; };
      const tabs = inner.querySelector(".wk-tabs"); if (tabs) tabs.after(cap);
      setCap(); inner.addEventListener("click", (e) => { if (e.target.closest(".wk-tabs button")) setTimeout(setCap, 0); });
      const body = $i("mon-body"); if (body) body.after(toggleBtn("wk", T("Show all details", "Zobrazit všechny podrobnosti"), T("Show less", "Zobrazit méně")));
      const brf = document.querySelector("#briefing .brf"); if (brf) brf.after(toggleBtn("wk", T("Show all details", "Zobrazit všechny podrobnosti"), T("Show less", "Zobrazit méně")));
    }
    // 7. Live evidence: seven short tiles; a click opens the full panel
    const sig = $i("signals"), sb = $i("sig-body");
    if (sig && sb && !sig.querySelector(".sig-tiles")) {
      const COLS = ["#a78bfa", "#22d3ee", "#f87171", "#3ddc97", "#f5c45c", "#fb923c", "#a3aaae"];
      const panels = [...sb.querySelectorAll(":scope > .sig-panel")];
      const live = () => [...sb.querySelectorAll(":scope > .sig-panel")];
      let openK = -1;
      const grid = document.createElement("div"); grid.className = "sig-tiles";
      panels.forEach((p, k) => {
        const h = p.querySelector(".sig-h"); if (!h) return;
        const tEl = h.querySelector("h3, h4, strong, b") || h.firstElementChild;
        const title = (tEl ? tEl.textContent : "").trim();
        let mean = (h.textContent.split(/What it means|Co to znamená/i)[1] || "").trim();
        if (mean.length > 150) { const cut = mean.slice(0, 150); mean = cut.slice(0, Math.max(cut.lastIndexOf(". ") + 1, cut.lastIndexOf(" "))) + (cut.lastIndexOf(". ") > 60 ? "" : "…"); }
        const b = document.createElement("button"); b.type = "button"; b.className = "sig-tile"; b.style.setProperty("--c", COLS[k % COLS.length]); b.setAttribute("aria-expanded", "false");
        b.innerHTML = `<span class="st-dot"></span><b>${esc(title)}</b><span>${esc(mean)}</span><em>${esc(T("Open the data", "Otevřít data"))}</em>`;
        b.addEventListener("click", () => {
          const ps = live(), cur = ps[k]; if (!cur) return;
          const open = openK !== k;
          ps.forEach((x) => x.classList.remove("sig-show")); grid.querySelectorAll(".sig-tile").forEach((x) => x.setAttribute("aria-expanded", "false"));
          openK = open ? k : -1;
          if (open) { cur.classList.add("sig-show"); b.setAttribute("aria-expanded", "true"); ooHit("open:signal-" + k); setTimeout(() => { window.dispatchEvent(new Event("resize")); cur.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 60); }
        });
        grid.appendChild(b);
      });
      sb.before(grid); sb.classList.add("sig-tiled");
      new MutationObserver(() => { sb.classList.add("sig-tiled"); const ps = live(); if (openK >= 0 && ps[openK] && !ps[openK].classList.contains("sig-show")) ps[openK].classList.add("sig-show"); }).observe(sb, { childList: true });
    }
    // 4. Your parts list: three big ways to start while the list is empty
    const as = $i("assess"), root = $i("as-root");
    if (as && root && !as.querySelector(".as-start")) {
      const sel = () => $i("as-sys");
      const sysHTML = () => (sel() ? [...sel().options].filter((o) => o.value) : []).map((o) => `<button type="button" data-v="${esc(o.value)}">${esc(o.textContent)}</button>`).join("");
      const exBtn = () => [...root.querySelectorAll("button")].find((b) => /example|příklad/i.test(b.textContent));
      const st = document.createElement("div"); st.className = "as-start";
      st.innerHTML = `<div class="as-card"><span class="as-n">1</span><b>${esc(T("Start from a typical system", "Začněte typickým systémem"))}</b><span>${esc(T("One click adds its usual parts and materials. Then adjust suppliers and stock.", "Jedno kliknutí přidá jeho obvyklé díly a suroviny. Pak upravíte dodavatele a zásoby."))}</span><div class="as-sys">${sysHTML()}</div></div>` +
        `<button type="button" class="as-card as-go" data-go="paste"><span class="as-n">2</span><b>${esc(T("Paste from Excel", "Vložte z Excelu"))}</b><span>${esc(T("Copy your rows: product, part, material, supplier country, weeks of stock.", "Zkopírujte řádky: výrobek, díl, surovina, země dodavatele, týdny zásob."))}</span><em>${esc(T("Open the paste box", "Otevřít pole pro vložení"))}</em></button>` +
        `<button type="button" class="as-card as-go" data-go="example"><span class="as-n">3</span><b>${esc(T("Try an example", "Vyzkoušejte příklad"))}</b><span>${esc(T("See a finished register for a small drone maker, then replace it with your own.", "Podívejte se na hotový registr malého výrobce dronů a pak ho nahraďte svým."))}</span><em>${esc(T("Load the example", "Načíst příklad"))}</em></button>`;
      const byHand = document.createElement("p"); byHand.className = "as-hand";
      byHand.innerHTML = `<button type="button">${esc(T("or add a part by hand", "nebo přidejte díl ručně"))}</button>`;
      st.appendChild(byHand);
      byHand.querySelector("button").addEventListener("click", () => { const ab = [...root.querySelectorAll("button")].find((x) => /add a part|přidat díl/i.test(x.textContent)); if (ab) ab.click(); ooHit("act:as-hand"); });
      root.before(st);
      const sysBox = st.querySelector(".as-sys");
      sysBox.addEventListener("click", (ev) => { const b = ev.target.closest("button[data-v]"), s = sel(); if (b && s) { s.value = b.dataset.v; s.dispatchEvent(new Event("change", { bubbles: true })); ooHit("act:as-system"); } });
      const fill = () => { const h = sysHTML(); if (h && sysBox.innerHTML !== h) sysBox.innerHTML = h; };
      st.querySelector('[data-go="example"]').addEventListener("click", () => { const eb = exBtn(); if (eb) eb.click(); ooHit("act:as-example"); });
      st.querySelector('[data-go="paste"]').addEventListener("click", () => {
        const pb = $i("as-paste"); if (!pb) return; pb.hidden = false; pb.style.display = "";
        const ta = $i("as-paste-in"); if (ta) { ta.focus(); ta.scrollIntoView({ behavior: "smooth", block: "center" }); } ooHit("act:as-paste");
      });
      const sync = () => { as.classList.toggle("as-has", !root.querySelector(".as-empty")); fill(); };
      new MutationObserver(sync).observe(root, { childList: true, subtree: true }); sync();
    }
    // 5. Work with us, in the language of the LinkedIn banner: dots, light type with a bold line, mineral colours, an orbit
    const snd = (big) => { try { if (O.SND && O.SND.on) { if (big && O.SND.chord) O.SND.chord([523.25, 659.25, 783.99], 0.03); else if (O.SND.tick) O.SND.tick(); } } catch (e) {} };
    const tm = $i("tm-root"), teams = $i("teams");
    if (tm && teams && !tm.querySelector(".wx")) {
      const h2 = teams.querySelector(".sec-head h2"), hp = teams.querySelector(".sec-head p");
      if (h2) h2.innerHTML = esc(T("From a free check", "Od bezplatné kontroly")) + "<br><b>" + esc(T("to a signed review.", "k podepsanému posouzení.")) + "</b>";
      if (hp) hp.textContent = T("The atlas stays free. When your board needs an answer it can defend, we work with your team directly.", "Atlas zůstává zdarma. Když vaše vedení potřebuje odpověď, kterou obhájí, pracujeme přímo s vaším týmem.");
      teams.classList.add("wx-sec");
      const ask = (s) => "mailto:david@madali.cz?subject=" + encodeURIComponent(s);
      const MP = String((window.ATLAS_CONFIG || {}).monitoringPrice || "49").trim();   /* build 55: the price comes from config.js, never typed */
      const card = (feat, name, price, sub, text, items, link, label) => `<article class="wx-card${feat ? " feat" : ""}">${feat ? `<span class="wx-badge"><i></i>${esc(T("Founding clients", "Zakládající klienti"))}</span>` : ""}<p class="wx-name">${esc(name)}</p><p class="wx-price">${price}</p><p class="wx-sub">${sub ? esc(sub) : "&nbsp;"}</p><div class="wx-text"><p>${esc(text)}</p>${items ? `<ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</div><a class="wx-ask" href="${link}">${esc(label)} <span aria-hidden="true">→</span></a></article>`;
      const steps = [[T("Map", "Mapa"), T("We fill the register with your team, part by part.", "S vaším týmem vyplníme registr, díl po dílu.")],
                     [T("Test", "Test"), T("Every export control and chokepoint against your stock.", "Každá vývozní kontrola a úžina proti vašim zásobám.")],
                     [T("Check", "Kontrola"), T("An analyst verifies the sources and signs the report.", "Analytik ověří zdroje a podepíše zprávu.")],
                     [T("Hand over", "Předání"), T("The register, the report and the board slides are yours.", "Registr, zpráva i podklady pro vedení jsou vaše.")]];
      const DOTS = ["#a78bfa", "#fb923c", "#facc15", "#a9b8cc", "#2dd4bf", "#e879f9", "#22d3ee", "#4ade80", "#f472b6", "#60a5fa", "#a3e635", "#e4e4e7"];   /* the twelve mineral colours (brand book p. 17) */
      const box = document.createElement("div"); box.className = "wx";
      box.innerHTML =
        `<p class="wx-free"><i></i><b>${esc(T("Free", "Zdarma"))}</b> · ${esc(T("the atlas · the quick check · the weekly brief · your parts list · no login", "atlas · rychlá kontrola · týdenní přehled · váš seznam dílů · bez přihlášení"))}</p>` +
        `<div class="wx-row">` +
        card(true, T("Readiness review", "Posouzení připravenosti"), esc(T("Tailored", "Na míru")), T("Scope and price after a free 30-minute call", "Rozsah a cenu domluvíme na hovoru zdarma"),
             T("One product line: its parts, suppliers, origins and stock, tested against every export control that could hit it.", "Jedna výrobní řada: díly, dodavatelé, původ a zásoby, prověřené proti každé vývozní kontrole, která ji může zasáhnout."),
             [T("Two to three weeks", "Dva až tři týdny"), T("Two working sessions of your time", "Dvě pracovní schůzky"), T("Ready for your board and CRMA Article 24", "Pro vedení i článek 24 CRMA")],
             ask(T("OreOrbit readiness review", "OreOrbit: posouzení připravenosti")), T("Ask about a review", "Zeptat se na posouzení")) +
        card(false, T("Monitoring", "Monitoring"), esc(T("€" + MP, MP + " €")) + `<small>${esc(T(" / month", " / měsíc"))}</small>`, "",
             T("Alerts on your materials, sites and deadlines, and one question a month answered within two working days.", "Upozornění na vaše suroviny, lokality a termíny a jednou měsíčně odpověď na vaši otázku do dvou pracovních dnů."), null,
             ask(T("OreOrbit monitoring", "OreOrbit: monitoring")), T("Ask about monitoring", "Zeptat se na monitoring")) +
        card(false, T("Briefings", "Briefingy"), esc(T("Tailored", "Na míru")), "",
             T("For boards, associations and ministries: what is moving, and what it means for you.", "Pro vedení, asociace a ministerstva: co se hýbe a co to pro vás znamená."), null,
             ask(T("OreOrbit briefing", "OreOrbit: briefing")), T("Ask about a briefing", "Zeptat se na briefing")) +
        `</div>` +
        `<div class="wx-steps"><p class="wx-k">${esc(T("How a review runs", "Jak posouzení probíhá"))}</p><ol>${steps.map(([a, b], k) => `<li style="--k:${k}"><span>${String(k + 1).padStart(2, "0")}</span><b>${esc(a)}</b><p>${esc(b)}</p></li>`).join("")}</ol></div>` +
        `<div class="wx-band"><div class="wx-who"><span class="wx-pin"><img src="img/david-madali-pr.jpg" alt="David Madali" loading="lazy" decoding="async" width="104" height="104"></span><div>` +
          `<p class="wx-k">${esc(T("Who you work with · Prague", "S kým spolupracujete · Praha"))}</p><b class="wx-nm">David Madali</b>` +
          `<p>${esc(T("Analyst of the defence industry, critical raw materials and the space economy. Creator of OreOrbit, quoted by BBC News.", "Analytik obranného průmyslu, kritických surovin a kosmické ekonomiky. Autor OreOrbit, citovaný BBC News."))}</p>` +
          `<p class="wx-dots">${DOTS.map((c) => `<i style="--c:${c}"></i>`).join("")}<span><a href="https://bohemiadefense.com"><b>Bohemia Defense</b></a> · <a href="./">OreOrbit</a> · <a href="https://madali.cz" rel="author">madali.cz</a></span></p></div></div>` +
          `<div class="wx-act"><p class="wx-big">${esc(T("Start with a", "Začněte"))} <b>${esc(T("free 30-minute call.", "bezplatným 30minutovým hovorem."))}</b></p><p>${esc(T("We pick one product line and the people for two working sessions.", "Vybereme jednu výrobní řadu a lidi na dvě pracovní schůzky."))}</p>` +
          `<div class="wx-btns"><a class="btn" href="${ask(T("OreOrbit readiness review: intro call", "OreOrbit: úvodní hovor"))}">${esc(T("Book an intro call", "Domluvit hovor"))}</a><a class="btn ghost" href="oreorbit-sample-assessment.pdf">${esc(T("Sample review", "Ukázkové posouzení"))}</a><a class="btn ghost" href="p/services.html">${esc(T("All services", "Všechny služby"))}</a></div></div></div>` +
        `<p class="wx-vat">${esc(T("Prices exclude VAT where it applies.", "Ceny jsou bez DPH, pokud se uplatňuje."))}</p>`;
      tm.appendChild(box);
      new MutationObserver(() => { if (!tm.contains(box)) tm.appendChild(box); }).observe(tm, { childList: true });
      box.addEventListener("click", (ev) => {
        const a = ev.target.closest("a"); if (!a) return;
        const big = a.classList.contains("btn") && !a.classList.contains("ghost");
        snd(big); ooHit(big ? "act:call" : a.classList.contains("wx-ask") ? "act:ask" : /sample/.test(a.href) ? "act:sample" : "act:services");
      });
      const st = box.querySelector(".wx-steps");
      if ("IntersectionObserver" in window) { const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("oo-in"); io.unobserve(x.target); } }), { threshold: 0.3 }); io.observe(st); }
      else st.classList.add("oo-in");
    }
    // sound: a soft tick for the new interactive parts (only when the visitor switched sound on)
    document.addEventListener("click", (ev) => { if (ev.target.closest(".sig-tile, .as-card, .as-sys button, .oo-more, .wk-tabs button, .dd-tabs button")) snd(false); }, true);
    // 8. Rules: a heading that says what the section is for
    const rh = document.querySelector("#rules .sec-head h2"); if (rh) rh.textContent = T("The rules that decide who can supply you.", "Pravidla, která rozhodují, kdo vám smí dodávat.");
    const rl = document.querySelector("#rules .sec-head .label"); if (rl) rl.textContent = T("Rules and funding", "Pravidla a financování");
    if (CS) document.title = "OreOrbit · Atlas kritických surovin pro evropskou obranu | Bohemia Defense";
    try { if (O.renderSecList) O.renderSecList(); } catch (e) {}
  }
  try { v20(); } catch (e) { /* the atlas works without it */ }



  /* ---------- v22: one brand identity: dark throughout, banner-style headings, dotted texture, a live line in the opening, a brief card that is never empty ---------- */
  function v22() {
    const $i = (x) => document.getElementById(x);
    // dark throughout, like Bohemia Defense, madali.cz and the banner
    const undark = () => document.querySelectorAll("section.band-light").forEach((s) => s.classList.remove("band-light"));
    undark(); setTimeout(undark, 1500);
    // headings: light type with a bold second line
    const H = { check: [T("What does your product", "Na čem váš výrobek"), T("depend on?", "závisí?")],
                monday: [T("What's moving", "Co se tento týden"), T("this week.", "hýbe.")],
                signals: [T("What the open data", "Co říkají otevřená data"), T("says now.", "právě teď.")],
                assess: [T("Your supply chain,", "Váš dodavatelský řetězec,"), T("assessed.", "posouzený.")],
                rules: [T("The rules that decide", "Pravidla, která rozhodují,"), T("who can supply you.", "kdo vám smí dodávat.")],
                trust: [T("How we", "Jak to"), T("know.", "víme.")],
                scenarios: [T("Stress-test", "Zátěžový test"), T("the supply.", "dodávek.")] };
    Object.keys(H).forEach((id) => { const h = document.querySelector("#" + id + " .sec-head h2"); if (h) h.innerHTML = esc(H[id][0]) + "<br><b>" + esc(H[id][1]) + "</b>"; });
    // the dotted texture of the banner behind every section
    document.querySelectorAll("section.section[id]").forEach((s) => { if (s.id !== "teams" && !s.querySelector(":scope > .oo-tex")) { const t = document.createElement("div"); t.className = "oo-tex"; t.setAttribute("aria-hidden", "true"); s.insertBefore(t, s.firstChild); } });
    // a live line under the opening buttons: the next deadline
    const cta = document.querySelector(".hero-cta");
    if (cta && !document.querySelector(".hero-next")) {
      const a = document.createElement("a"); a.className = "hero-next"; a.href = "#monday";
      cta.after(a);
      const fill = () => {
        const nx = document.querySelector("#mon-body .mon-next"); if (!nx) return;
        const n = (nx.querySelector(".mon-count") || {}).textContent || "", p = (nx.querySelector("p") || {}).textContent || "";
        const days = (n.match(/\d+/) || [])[0]; if (!days || !p) return;
        const html = `<i></i><span class="hn-k">${esc(T("Next deadline", "Nejbližší termín"))}</span><span class="hn-d">${esc(T("in " + days + " days", "za " + days + " dní"))}</span><span class="hn-t">${esc(p.trim())}</span><span class="hn-a" aria-hidden="true">→</span>`;
        if (a.innerHTML !== html) a.innerHTML = html;
      };
      fill(); const mb = $i("mon-body"); if (mb) new MutationObserver(fill).observe(mb, { childList: true, subtree: true });
      a.addEventListener("click", () => ooHit("act:hero-next"));
    }
    // All of Europe: when a week has no written comment, its first card shows the week's main points instead of staying empty
    const fillBrief = () => {
      const so = $i("brief-so"); if (!so) return;
      let card = $i("oo-brief-pts");
      const own = card ? card.textContent : "";
      const txt = so.textContent.replace(own, "").replace(/What it means for Europe|Co to znamená pro Evropu/gi, "").trim();
      if (txt.length > 20) { if (card) card.remove(); so.classList.remove("oo-so-empty"); return; }
      const clean = (el) => { const c = el.cloneNode(true); c.querySelectorAll("a, small, time, .src, .srcs, [class*=tag], [class*=chip], [class*=pill], span[class], i").forEach((x) => x.remove()); let t = c.textContent.replace(/\s+/g, " ").trim(); if (t.length > 190) t = t.slice(0, t.lastIndexOf(" ", 185)) + "…"; return t; };
      let list = [...document.querySelectorAll("#brief-body li")].map(clean).filter((t) => t.length > 10).slice(0, 4);
      if (!list.length) list = [...document.querySelectorAll("#brief-body p")].map(clean).filter((t) => t.length > 30).slice(0, 3);
      if (!list.length) return;
      const html = `<p class="oo-bp-l">${esc(T("This week in brief", "Tento týden v kostce"))}</p><ul>${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
      so.classList.add("oo-so-empty");
      if (!card) { card = document.createElement("div"); card.id = "oo-brief-pts"; so.appendChild(card); }
      if (card.innerHTML !== html) card.innerHTML = html;
    };
    let pend = 0; const bf = $i("briefing");
    if (bf) new MutationObserver(() => { if (!pend) pend = setTimeout(() => { pend = 0; fillBrief(); }, 60); }).observe(bf, { childList: true, subtree: true, characterData: true });
    fillBrief();
  }
  try { v22(); } catch (e) { /* the atlas works without it */ }



  /* ---------- v23: fewer things at once. One This week view (your minerals filter everything), a calmer opening, short introductions ---------- */
  function v23() {
    const $i = (x) => document.getElementById(x);
    const snd = () => { try { if (O.SND && O.SND.on && O.SND.tick) O.SND.tick(); } catch (e) {} };
    // short introductions: one or two sentences
    const P = { check: T("Pick what you make. See which minerals it needs, who controls them and what could hit it next.", "Vyberte, co vyrábíte. Uvidíte, které suroviny potřebuje, kdo je ovládá a co ho může zasáhnout."),
                signals: T("Seven live signals from open data and satellites. Open any of them for the full data.", "Sedm živých signálů z otevřených dat a satelitů. Každý otevřete pro plná data."),
                assess: T("Add the parts you make and where they come from. Each part gets a risk rating you can take to your board. Nothing leaves your browser.", "Přidejte díly, které vyrábíte, a odkud pocházejí. Každý díl dostane hodnocení rizika pro vaše vedení. Nic neopustí váš prohlížeč."),
                rules: T("Who may supply you is changing. These are the rules and the dates that decide it.", "Kdo vám smí dodávat, se mění. Tady jsou pravidla a termíny, které o tom rozhodují.") };
    Object.keys(P).forEach((id) => { const p = document.querySelector("#" + id + " .sec-head p"); if (p) p.textContent = P[id]; });
    // the header shows Quick check again once the opening screen has scrolled away
    const hero = document.querySelector(".hero");
    if (hero && "IntersectionObserver" in window) new IntersectionObserver((es) => document.body.classList.toggle("oo-past-hero", !es[0].isIntersecting), { threshold: 0, rootMargin: "-80px 0px 0px 0px" }).observe(hero);
    // This week: one view. The mineral chips filter everything below; no tabs, no paragraphs
    const mon = $i("monday"), inner = mon && mon.querySelector(".inner"), pick = $i("mon-pick");
    if (!inner || !pick || inner.querySelector(".wk2")) return;
    mon.classList.add("wk2-on");
    const NAMES = { ree: [T("Rare earths", "Vzácné zeminy"), /rare.?earth|magnet|neodym|dyspros|terbium|yttrium/i], ti: [T("Titanium", "Titan"), /titan/i], w: [T("Tungsten", "Wolfram"), /tungsten|wolfram/i],
                    sb: [T("Antimony", "Antimon"), /antimon/i], ga: [T("Gallium", "Galium"), /gallium|galium/i], ge: [T("Germanium", "Germanium"), /germanium/i], li: [T("Lithium", "Lithium"), /lithium/i],
                    co: [T("Cobalt", "Kobalt"), /cobalt|kobalt/i], ni: [T("Nickel", "Nikl"), /nickel|nikl/i], gr: [T("Graphite", "Grafit"), /graphite|grafit/i] };
    const guess = (t) => Object.keys(NAMES).filter((k) => NAMES[k][1].test(t || ""));
    const first = (t) => { const s = (t || "").replace(/\s+/g, " ").trim(); const k = s.search(/\.\s/); let o = k > 40 && k < 170 ? s.slice(0, k + 1) : s; if (o.length > 170) o = o.slice(0, o.lastIndexOf(" ", 165)) + "…"; return o; };
    const dot = (ms) => (ms.length ? ms.slice(0, 3) : ["none"]).map((m) => `<i style="background:${m === "none" ? "rgba(236,238,233,.35)" : "var(--" + m + ")"}"></i>`).join("");
    const cap = document.createElement("p"); cap.className = "wk2-cap";
    const all = document.createElement("button"); all.type = "button"; all.className = "chip2 wk2-all"; all.textContent = T("All of Europe", "Celá Evropa");
    const row = document.createElement("div"); row.className = "wk2-pickrow";
    pick.before(cap); cap.after(row); row.appendChild(all); row.appendChild(pick);
    const box = document.createElement("div"); box.className = "wk2";
    row.after(box);
    document.addEventListener("click", (ev) => { if (!ev.target.closest("#monday .wk2-all")) return;
      const keys = [...PK().querySelectorAll(".chip2[data-my]")].map((b) => b.dataset.my);
      if (window.ooSetMinerals) window.ooSetMinerals(keys);
      else { let n = 0; const step = () => { const c = PK().querySelector('.chip2[data-my]:not([aria-pressed="true"])'); if (!c || n++ > 12) return; c.click(); setTimeout(step, 40); }; step(); }
      snd(); ooHit("act:wk-all");
    });
    let sig = "";
    let lastBox = null, lastFeed = [];
    const render = () => {
      const capE = document.querySelector("#monday .wk2-cap") || cap, boxE = document.querySelector("#monday .wk2") || box, allE = document.querySelector("#monday .wk2-all") || all;
      if (boxE !== lastBox) { sig = ""; lastBox = boxE; }
      const sel = [...PK().querySelectorAll('.chip2[data-my][aria-pressed="true"]')].map((b) => b.dataset.my);
      const inSel = (ms) => !sel.length || !ms.length || ms.some((m) => sel.includes(m));
      const total = PK().querySelectorAll(".chip2[data-my]").length, isAll = !sel.length || sel.length === total;
      allE.setAttribute("aria-pressed", String(isAll));
      const nm = sel.map((m) => { const c = PK().querySelector('.chip2[data-my="' + m + '"]'); return c ? c.textContent.trim() : m; }).join(", ");
      const prod = window.ooProduct && window.ooQC && window.ooQC[window.ooProduct];
      const same = prod && prod.mins.length === sel.length && prod.mins.every((m) => sel.includes(m));
      const txt = isAll ? T("Showing all twelve minerals across Europe. Tap one to focus on the minerals you answer for.", "Zobrazeno všech dvanáct surovin v celé Evropě. Klepnutím se zaměříte na ty, za které odpovídáte.")
                : same ? T("Showing the " + sel.length + (sel.length === 1 ? " mineral" : " minerals") + " in " + prod.name.toLowerCase() + ": " + nm + ".", prod.name + ": " + sel.length + " " + (sel.length === 1 ? "surovina" : sel.length < 5 ? "suroviny" : "surovin") + " – " + nm + ".")
                : T("Showing your " + sel.length + (sel.length === 1 ? " mineral" : " minerals") + ": " + nm + ". Tap a mineral to add or remove it.", "Sledujete " + sel.length + " " + (sel.length === 1 ? "surovinu" : sel.length < 5 ? "suroviny" : "surovin") + ": " + nm + ". Klepnutím je přidáte nebo odeberete.");
      if (capE.textContent !== txt) { capE.textContent = txt; capE.classList.remove("wk2-flash"); void capE.offsetWidth; capE.classList.add("wk2-flash"); }
      window.ooWeekCap = txt;
      // status of the selected minerals, one row
      const cards = [...document.querySelectorAll("#mon-body .mon-card[data-mat]")].filter((c) => !sel.length || sel.includes(c.dataset.mat));
      const status = cards.map((c) => { const rag = c.querySelector(".rag"); const r = rag ? (rag.className.match(/red|amber|green/) || ["none"])[0] : "none";
        return `<span class="wk2-st" title="${esc((c.querySelector(".mon-why") || {}).textContent || "")}"><i style="background:var(--${c.dataset.mat})"></i>${esc((c.querySelector(".mon-name") || {}).textContent || "")}<b>${esc((c.querySelector(".mon-big b") || {}).textContent || "")}</b><em class="r-${r}">${esc(rag ? rag.textContent : "")}</em></span>`; }).join("");
      const W = window.ooWeekData ? window.ooWeekData(sel) : { nx: null, later: [], feed: [] };
      const nx = W.nx, later = W.later, feed = W.feed;
      const html = `<div class="wk2-status">${status}</div>` +
        `<div class="wk2-grid"><div class="wk2-dl">${nx ? `<p class="wk2-k">${esc(T("Next deadline", "Nejbližší termín"))}</p><p class="wk2-big">${esc(nx.cd || nx.d)}</p><a class="wk2-dlt" href="${esc(nx.href)}" target="_blank" rel="noopener">${esc(nx.t)}</a><p class="wk2-date">${esc(nx.d.trim())}</p>` +
          (later.length ? `<ul class="wk2-later">${later.map((x) => `<li><span>${esc(x.d.trim())}</span><a href="${esc(x.href)}" target="_blank" rel="noopener">${esc(x.t)}</a></li>`).join("")}</ul>` : "") : ""}</div>` +
        `<div class="wk2-feed"><p class="wk2-k">${esc(T("What moved this week", "Co se tento týden pohnulo"))}</p><ul>${feed.map((x, k) => `<li><span class="wk2-d">${dot(x.ms)}</span>${x.href ? `<a href="${esc(x.href)}" target="_blank" rel="noopener">${esc(x.t)}</a>` : `<button type="button" data-k="${k}">${esc(x.t)}</button>`}<small>${esc(x.meta)}</small></li>`).join("") || `<li class="wk2-none">${esc(T("Nothing new for these minerals this week.", "Pro tyto suroviny tento týden nic nového."))}</li>`}</ul></div></div>` +
        `<div class="wk2-foot"><button type="button" class="btn small" data-act="pack">${esc(T("Board pack · 7 slides", "Podklady pro vedení · 7 snímků"))}</button><a class="wk2-arch" href="p/briefs.html">${esc(T("All weekly briefs", "Všechny týdenní přehledy"))} →</a></div>`;
      if (html !== sig || boxE.innerHTML.length < 20) { sig = html; boxE.innerHTML = html; }
      lastFeed = feed;
      const s2 = document.querySelector(".steps-band a:nth-child(2) small");
      if (s2 && nx && nx.cd) s2.textContent = T("Next deadline " + nx.cd, "Nejbližší termín " + nx.cd.replace(/^in /, "za ").replace(/days?$/, "dní"));
    };
    document.addEventListener("click", (ev) => {
      if (!ev.target.closest("#monday .wk2")) return;
      const b = ev.target.closest("button[data-k]"); if (b) { const it = lastFeed[+b.dataset.k]; if (it && it.go) it.go.click(); snd(); return; }
      const p = ev.target.closest('[data-act="pack"]'); if (p) { const o = $i("mon-pack"); if (o) o.click(); ooHit("act:pack"); return; }
      if (ev.target.closest("a")) { snd(); ooHit("act:wk-item"); }
    });
    let t = 0; const later = () => { clearTimeout(t); t = setTimeout(render, 80); };
    let lastSel = "";
    window.ooWeekRender = render;
    setInterval(() => {
      const pk = PK(); if (!pk) return;
      const s = [...pk.querySelectorAll('.chip2[data-my][aria-pressed="true"]')].map((x) => x.dataset.my).join(",");
      const capE = document.querySelector("#monday .wk2-cap");
      if (s !== lastSel || (capE && window.ooWeekCap && capE.textContent !== window.ooWeekCap) || (document.querySelector("#monday .wk2") || {}).childElementCount === 0) { lastSel = s; render(); }
    }, 150);
    /* right after any click that can change the selection, draw at once (the check above is only the safety net) */
    document.addEventListener("click", (ev) => {
      if (!ev.target.closest("#mon-pick .chip2, .wk2-all, .qc-p") || window.ooSyncing) return;   // during a product switch, draw once at the end
      render(); setTimeout(render, 40);   // at once, in the same moment as the click; once more after the atlas has redrawn
    });
    [$i("mon-body"), $i("briefing")].forEach((el) => { if (el) new MutationObserver(later).observe(el, { childList: true, subtree: true }); }); watchPick(later);
    window.ooWeekRender = render;
    render();
  }
  try { v23(); } catch (e) { /* the atlas works without it */ }



  /* ---------- v24: a lean free atlas that leads to monitoring and a review ---------- */
  function v24() {
    const $i = (x) => document.getElementById(x);
    const snd = () => { try { if (O.SND && O.SND.on && O.SND.tick) O.SND.tick(); } catch (e) {} };
    // 1. the opening speaks about the visitor's product
    const h1 = document.querySelector(".hero-copy h1");
    if (h1) h1.innerHTML = esc(T("See what your product", "Zjistěte, na čem váš výrobek")) + "<br><b>" + esc(T("depends on.", "závisí.")) + "</b>";
    const lede = h1 && h1.nextElementSibling;
    if (lede && lede.tagName === "P") lede.textContent = T("The twelve critical minerals behind Europe's defence and space industry: who controls them, and what changes this week.", "Dvanáct kritických surovin, na kterých stojí evropský obranný a kosmický průmysl: kdo je ovládá a co se tento týden mění.");
    // the header lines up with the page: logo, menu and buttons on the content's edges
    const nav = $i("nav");
    const align = () => {
      const ref = document.querySelector(".hero-copy h1") || document.querySelector(".section .inner"), brand = $i("brand-link");
      if (!nav || !ref || !brand) return;
      const x = Math.max(16, Math.round(ref.getBoundingClientRect().left));
      nav.style.paddingLeft = x + "px"; nav.style.paddingRight = x + "px";
      const off = Math.round(brand.getBoundingClientRect().left) - x;   // the logo's own inner margin
      if (off) nav.style.paddingLeft = Math.max(8, x - off) + "px";
    };
    align(); addEventListener("resize", align);
    // 4-6. the parts list, the stress test and the rules belong to the paid review, not the free atlas
    ["assess", "scenarios", "rules"].forEach((id) => { const s = $i(id); if (s) { s.hidden = true; s.style.display = "none"; } });
    document.querySelectorAll('a[href="#assess"], a[href="#scenarios"], a[href="#rules"]').forEach((a) => { if (!a.closest(".steps-band")) { const li = a.closest("li"); if (li && li.closest("#sec-list")) li.remove(); } });
    const band = document.querySelector(".steps-band .inner a:nth-child(3)");
    if (band) { band.href = "#teams"; const sp = band.querySelector("span"); if (sp) sp.innerHTML = esc(T("Get alerts for your minerals", "Upozornění na vaše suroviny")) + "<small>" + esc(T("Monitoring by email", "Monitoring e-mailem")) + "</small>"; }
    // the quick check no longer points to the parts list, which is now part of the paid review
    const tidyQC = () => {
      document.querySelectorAll('#check a[href="#assess"], #check button[data-go="assess"]').forEach((x) => { x.hidden = true; x.style.display = "none"; });
      document.querySelectorAll("#check p").forEach((p) => {
        if (/assessment further down|posouzení níže|níže prověří/i.test(p.textContent)) p.textContent = T("Typical uses in such products; your own parts may differ. A readiness review checks your actual parts.", "Typické použití v takových výrobcích; vaše díly se mohou lišit. Posouzení připravenosti prověří vaše skutečné díly.");
      });
    };
    tidyQC(); const qcRoot = $i("check"); if (qcRoot) new MutationObserver(tidyQC).observe(qcRoot, { childList: true, subtree: true });
    // 3. picking a product in the quick check sets This week to that product's minerals
    const pick = $i("mon-pick");
    let syncId = 0;
    const setMinerals = (want) => {   // one chip at a time, and only after the atlas has really redrawn the last one
      if (!PK() || !want || !want.length) return;
      if (window.ooSetMy) {   // one step: the atlas takes the whole selection and redraws once
        ++syncId; window.ooSyncing = false;
        window.ooSetMy(want);
        if (window.ooWeekRender) { window.ooWeekRender(); setTimeout(window.ooWeekRender, 30); }
        return;
      }
      const id = ++syncId, t0 = Date.now(); window.ooSyncing = true;
      const on = (k) => { const b = PK().querySelector('.chip2[data-my="' + k + '"]'); return !!b && b.getAttribute("aria-pressed") === "true"; };
      const step = () => {
        if (id !== syncId) return;
        if (Date.now() - t0 > 6000) { window.ooSyncing = false; return; }
        const chips = [...PK().querySelectorAll(".chip2[data-my]")];
        const c = chips.find((b) => !on(b.dataset.my) && want.includes(b.dataset.my)) || chips.find((b) => on(b.dataset.my) && !want.includes(b.dataset.my));
        if (!c) { window.ooSyncing = false; if (window.ooWeekRender) window.ooWeekRender(); return; }
        const k = c.dataset.my, before = on(k);
        c.click();
        const wait = (n) => { if (id !== syncId) return; if (on(k) !== before || n > 60) { setTimeout(step, 0); return; } setTimeout(() => wait(n + 1), 15); };
        wait(0);
      };
      step();
    };
    window.ooSetMinerals = setMinerals;
    const chk = $i("check"), cin = chk && chk.querySelector(".inner");
    let follow = null;
    document.addEventListener("oo-qc", (ev) => {
      const q = window.ooQC && window.ooQC[ev.detail]; if (!q) return;
      setMinerals(q.mins);
      if (cin) {
        if (!follow) { follow = document.createElement("a"); follow.className = "qc-follow"; follow.href = "#monday"; cin.appendChild(follow); follow.addEventListener("click", () => ooHit("act:qc-follow")); }
        follow.innerHTML = `<i></i><span>${esc(T("This week now follows the " + q.mins.length + " minerals in " + q.name.toLowerCase() + ".", "Sekce Tento týden teď sleduje " + q.mins.length + " surovin pro " + q.name.toLowerCase() + "."))}</span><b>${esc(T("See what is moving", "Co se hýbe"))} →</b>`;
      }
    });
    // the sign-up forms: the free Monday brief and paid monitoring
    const selMins = () => PK() ? [...PK().querySelectorAll('.chip2[data-my][aria-pressed="true"]')].map((b) => b.dataset.my) : [];
    const minNames = () => { const n = selMins().map((m) => { const c = PK().querySelector('.chip2[data-my="' + m + '"]'); return c ? c.textContent.trim() : m; }); return n.length ? n.join(", ") : T("all twelve minerals", "všech dvanáct surovin"); };
    const form = (plan, btn, cons) => `<form class="oo-sub" data-plan="${plan}" novalidate><div class="oo-sub-row"><input type="email" name="email" required autocomplete="email" placeholder="${esc(T("Work email", "Pracovní e-mail"))}" aria-label="${esc(T("Work email", "Pracovní e-mail"))}"><button type="submit" class="btn">${esc(btn)}</button></div><input class="oo-hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><p class="oo-cons"><span>${esc(cons)} <a href="https://bohemiadefense.com/legal/" target="_blank" rel="noopener">${esc(T("Privacy", "Ochrana údajů"))}</a></span></p><p class="oo-msg" role="status" aria-live="polite"></p></form>`;
    document.addEventListener("submit", async (ev) => {
      const f = ev.target.closest && ev.target.closest(".oo-sub"); if (!f) return;
      ev.preventDefault();
      const msg = f.querySelector(".oo-msg"), em = f.querySelector('input[name="email"]');
      if (!em.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value)) { msg.textContent = T("Please enter a valid email.", "Zadejte prosím platný e-mail."); msg.className = "oo-msg err"; em.focus(); return; }
      const b = f.querySelector('button[type="submit"]'); b.disabled = true; msg.textContent = T("Sending…", "Odesílám…"); msg.className = "oo-msg";
      try {
        const r = await fetch("subscribe.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: em.value.trim(), consent: true, plan: f.dataset.plan, minerals: (f.closest(".wk3") && window.ooBriefMins) ? window.ooBriefMins() : (f.closest(".pl3-y") && window.ooMonMins) ? window.ooMonMins() : selMins(), other: (f.closest(".pl3-y") && window.ooMonOther) ? window.ooMonOther() : "", product: window.ooProduct || "", lang: CS ? "cs" : "en", website: f.querySelector(".oo-hp").value }) });
        const j = await r.json().catch(() => ({}));
        if (!r.ok || !j.ok) throw new Error("x");
        if (j.pay && /^https:\/\//.test(j.pay)) { msg.className = "oo-msg ok"; msg.textContent = T("Taking you to the secure payment page…", "Přesměrování na zabezpečenou platební stránku…"); ooHit("act:to-pay"); setTimeout(() => { location.href = j.pay; }, 700); return; }
        f.classList.add("done"); ooHit("act:sub-" + f.dataset.plan);
        try { document.dispatchEvent(new CustomEvent("oo-sub-ok", { detail: { plan: f.dataset.plan, form: f } })); } catch (e) {}
        try { if (O.SND && O.SND.on && O.SND.chord) O.SND.chord([523.25, 659.25, 783.99], 0.03); } catch (e) {}
        msg.className = "oo-msg ok";
        msg.textContent = f.dataset.plan === "monitoring" ? T("Thank you. David will reply within one working day with a sample alert for your minerals and the terms.", "Děkujeme. David se do jednoho pracovního dne ozve s ukázkovým upozorněním pro vaše suroviny a podmínkami.")
                                                          : T("You're in. The Monday brief for your minerals arrives next Monday.", "Hotovo. Pondělní přehled pro vaše suroviny přijde příští pondělí.");
      } catch (e) { msg.className = "oo-msg err"; msg.textContent = T("Sorry, that didn't go through. Please write to david@madali.cz.", "Omlouváme se, nepodařilo se to odeslat. Napište prosím na david@madali.cz."); }
      b.disabled = false;
    });
    // This week: the free Monday brief, by email
    const wk = document.querySelector(".wk2");
    if (wk && !document.querySelector(".wk2-sub")) {
      const w = document.createElement("div"); w.className = "wk2-sub";
      w.innerHTML = `<div><b>${esc(T("Get this every Monday, free.", "Dostávejte to každé pondělí, zdarma."))}</b><span class="wk2-sub-m"></span></div>` + form("brief", T("Subscribe", "Odebírat"), T("We'll send the Monday brief to this address. Unsubscribe any time.", "Na tuto adresu vám budeme posílat pondělní přehled. Odhlásit se můžete kdykoli."));
      wk.after(w);
    }
    // 7. services: free atlas → monitoring (email) → readiness review (intro call, no price)
    const row = document.querySelector(".wx-row");
    const MP = String((window.ATLAS_CONFIG || {}).monitoringPrice || "49").trim();   /* build 55: the price comes from config.js, never typed */
    if (row && !row.querySelector(".wx-mon")) {
      const fr = document.querySelector(".wx-free");
      if (fr) fr.innerHTML = `<i></i><b>${esc(T("Free", "Zdarma"))}</b> · ${esc(T("the atlas · the quick check · this week's headlines · the live evidence · no login", "atlas · rychlá kontrola · titulky týdne · živé důkazy · bez přihlášení"))}`;
      row.classList.add("wx-two");
      row.innerHTML =
        `<article class="wx-card feat wx-mon"><span class="wx-badge"><i></i>${esc(T("For your minerals", "Pro vaše suroviny"))}</span><p class="wx-name">${esc(T("Monitoring", "Monitoring"))}</p><p class="wx-price">${esc(T("€" + MP, MP + " €"))}<small>${esc(T(" / month", " / měsíc"))}</small></p>` +
        `<p class="wx-sub">${esc(T("Your minerals: ", "Vaše suroviny: "))}<span class="wx-mins"></span> · <a href="#monday">${esc(T("change", "změnit"))}</a></p>` +
        `<div class="wx-text"><p>${esc(T("We watch your minerals, their sites and deadlines around the clock. You hear from us when something changes, and every Monday. Ask us one question a month: a person answers within two working days.", "Sledujeme vaše suroviny, jejich lokality a termíny nepřetržitě. Ozveme se, když se něco změní, a každé pondělí. Jednou měsíčně se nás můžete na cokoli zeptat: odpoví člověk do dvou pracovních dnů."))}</p></div>` +
        form("monitoring", T("Start monitoring", "Spustit monitoring"), T("We'll use this address to contact you about monitoring.", "Tuto adresu použijeme, abychom vás kontaktovali kvůli monitoringu.")) + `</article>` +
        `<article class="wx-card wx-rev"><p class="wx-name">${esc(T("Readiness review", "Posouzení připravenosti"))}</p><p class="wx-price wx-price-t">${esc(T("For your board", "Pro vaše vedení"))}</p><p class="wx-sub">${esc(T("CRMA Article 24 · two to three weeks", "Článek 24 CRMA · dva až tři týdny"))}</p>` +
        `<div class="wx-text"><p>${esc(T("One product line, its parts, suppliers, origins and stock, tested against every export control and chokepoint. Signed by an analyst.", "Jedna výrobní řada, její díly, dodavatelé, původ a zásoby, prověřené proti každé vývozní kontrole a úžině. Podepsané analytikem."))}</p>` +
        `<ul><li>${esc(T("Your parts-list register", "Registr vašich dílů"))}</li><li>${esc(T("Stress tests against real export controls", "Zátěžové testy proti skutečným vývozním kontrolám"))}</li><li>${esc(T("The rules that decide who can supply you", "Pravidla, která rozhodují, kdo vám smí dodávat"))}</li><li>${esc(T("Slides for your board", "Podklady pro vedení"))}</li></ul></div>` +
        `<a class="btn wx-call" href="#wx-band">${esc(T("Book a 30-minute intro call", "Domluvit 30minutový hovor"))} →</a></article>`;
      const bandEl = document.querySelector(".wx-band"); if (bandEl) bandEl.id = "wx-band";
      row.querySelector(".wx-call").addEventListener("click", () => { snd(); ooHit("act:review-call"); });
    }
    const minsOut = () => { const t = minNames(); document.querySelectorAll(".wx-mins, .wk2-sub-m").forEach((e) => { e.textContent = e.classList.contains("wk2-sub-m") ? " " + T("For: ", "Pro: ") + t : t; }); };
    minsOut(); watchPick(minsOut);
    const th = document.querySelector("#teams .sec-head h2"); if (th) th.innerHTML = esc(T("From a free atlas", "Od bezplatného atlasu")) + "<br><b>" + esc(T("to alerts for your minerals.", "k upozorněním na vaše suroviny.")) + "</b>";
    const tp = document.querySelector("#teams .sec-head p"); if (tp) tp.textContent = T("The atlas stays free. Monitoring alerts you the same day something changes for your minerals. A review takes one product line to your board.", "Atlas zůstává zdarma. Monitoring vám řekne, kdy se u vašich surovin něco změní. Posouzení připraví jednu výrobní řadu pro vaše vedení.");
    const tl = document.querySelector("#teams .sec-head .label"); if (tl) tl.textContent = T("Monitoring and review", "Monitoring a posouzení");
    try { if (O.renderSecList) O.renderSecList(); } catch (e) {}
  }
  try { v24(); } catch (e) { /* the atlas works without it */ }



  /* ---------- v25: three plans, This week from the data itself, the full evidence for an email, a booking link ---------- */
  function v25() {
    const $i = (x) => document.getElementById(x);
    const C = window.ATLAS_CONFIG || {};
    const BOOK = (C.bookingUrl || "").trim() || ("mailto:david@madali.cz?subject=" + encodeURIComponent(T("OreOrbit: intro call", "OreOrbit: úvodní hovor")));
    const ext = /^https?:/.test(BOOK);
    const snd = () => { try { if (O.SND && O.SND.on && O.SND.tick) O.SND.tick(); } catch (e) {} };
    const MON = CS ? ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = (iso) => { const d = new Date(iso + "T12:00:00Z"); return isNaN(d) ? iso : (CS ? d.getUTCDate() + ". " + (d.getUTCMonth() + 1) + ". " + d.getUTCFullYear() : d.getUTCDate() + " " + MON[d.getUTCMonth()] + " " + d.getUTCFullYear()); };
    const t0 = new Date(); t0.setHours(0, 0, 0, 0);
    const left = (iso) => Math.round((new Date(iso + "T00:00:00") - t0) / 86400000);
    const inTxt = (n) => n === 0 ? T("today", "dnes") : n === 1 ? T("tomorrow", "zítra") : T("in " + n + " days", "za " + n + " dní");
    /* This week: deadlines, the latest brief and the news straight from the data */
    let BRIEF = null;
    fetch((C.dataBase || "live-data/") + "briefs.json", { cache: "no-store" }).then((r) => r.ok ? r.json() : null).then((b) => { if (Array.isArray(b) && b.length) { BRIEF = b.slice().sort((x, y) => String(y.week).localeCompare(String(x.week)))[0]; } if (typeof window.ooWeekRender === "function") window.ooWeekRender(); }).catch(() => {});
    window.ooWeekData = (sel) => {
      const inSel = (ms) => !sel.length || !ms || !ms.length || ms.some((m) => sel.includes(m));
      const today = t0.toISOString().slice(0, 10);
      const dls = (O.DEADLINES || []).filter((d) => d && d.date && left(d.date) >= 0).sort((a, b) => a.date.localeCompare(b.date))
        .map((d) => ({ t: (CS && d.title_cs) || d.title, href: d.url || "", d: day(d.date), cd: inTxt(left(d.date)), ms: d.materials || [] }));
      let mine = dls.filter((x) => inSel(x.ms)); if (!mine.length) mine = dls;
      const items = [];
      const first = (s) => { s = String(s || "").replace(/\s+/g, " ").trim(); const k = s.search(/\.\s/); let o = k > 40 && k < 170 ? s.slice(0, k + 1) : s; if (o.length > 170) o = o.slice(0, o.lastIndexOf(" ", 165)) + "…"; return o; };
      ((BRIEF && BRIEF.points) || []).forEach((p) => { const tx = first((CS && p.text_cs) || p.text || ""); if (tx) items.push({ t: tx, ms: p.materials || [], href: p.url || "", meta: p.source || "" }); });
      const news = (O.NEWS || []).slice().sort((a, b) => String(b.addedAt || b.date).localeCompare(String(a.addedAt || a.date)));
      news.forEach((n) => { const tt = (CS && n.title_cs) || n.title; if (tt) items.push({ t: tt, ms: n.materials || [], href: n.url || "", meta: day(n.date || n.addedAt) + " · " + (n.source || "") }); });
      const seen = {}; const uniq = items.filter((x) => !seen[x.t] && (seen[x.t] = 1));
      const all10 = !sel.length || sel.length >= 10;
      const mineFeed = uniq.filter((x) => x.ms && x.ms.length && x.ms.some((m) => sel.includes(m)));
      const general = uniq.filter((x) => !x.ms || !x.ms.length);
      const feed = all10 ? uniq.slice(0, 5) : mineFeed.slice(0, 5).concat(general.slice(0, mineFeed.length >= 5 ? 0 : 1)).slice(0, 5);
      return { nx: mine[0], later: mine.slice(1, 3), feed, week: BRIEF && BRIEF.week };
    };
    /* the free brief and monitoring, told apart in one line */
    const sub = document.querySelector(".wk2-sub > div:first-child");
    if (sub && !sub.querySelector(".wk2-diff")) { const p = document.createElement("span"); p.className = "wk2-diff"; p.textContent = T("Free: one summary every Monday, the same for everyone. Monitoring: a same-day alert when something changes for your minerals.", "Zdarma: jeden souhrn každé pondělí, stejný pro všechny. Monitoring: upozornění ještě v den, kdy se u vašich surovin něco změní."); sub.appendChild(p); }
    /* Live evidence: the seven tiles stay free; the full data opens with an email (free) */
    const grid = document.querySelector(".sig-tiles");
    const unlocked = () => { try { return localStorage.getItem("oo-unlocked") === "1"; } catch (e) { return false; } };
    if (grid && !document.querySelector(".sig-gate")) {
      const gate = document.createElement("div"); gate.className = "sig-gate"; gate.hidden = true;
      gate.innerHTML = `<div><b>${esc(T("Open the full data, free.", "Otevřete plná data, zdarma."))}</b><span>${esc(T("Leave your email once and every panel opens. You also get the Monday brief; unsubscribe any time.", "Zadejte jednou e-mail a otevřou se všechny panely. Dostanete i pondělní přehled; odhlásit se můžete kdykoli."))}</span></div>` +
        `<form class="oo-sub" data-plan="brief" novalidate><div class="oo-sub-row"><input type="email" name="email" required autocomplete="email" placeholder="${esc(T("Work email", "Pracovní e-mail"))}" aria-label="${esc(T("Work email", "Pracovní e-mail"))}"><button type="submit" class="btn">${esc(T("Open the data", "Otevřít data"))}</button></div><input class="oo-hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><p class="oo-cons"><span>${esc(T("We'll send the Monday brief to this address. Unsubscribe any time.", "Na tuto adresu vám budeme posílat pondělní přehled. Odhlásit se můžete kdykoli."))} <a href="https://bohemiadefense.com/legal/" target="_blank" rel="noopener">${esc(T("Privacy", "Ochrana údajů"))}</a></span></p><p class="oo-msg" role="status" aria-live="polite"></p></form>`;
      grid.after(gate);
      let want = null;
      grid.addEventListener("click", (ev) => {
        const tile = ev.target.closest(".sig-tile"); if (!tile || unlocked()) return;
        ev.stopPropagation(); ev.preventDefault();
        want = tile; gate.hidden = false; gate.scrollIntoView({ behavior: "smooth", block: "center" });
        const em = gate.querySelector('input[type="email"]'); if (em) setTimeout(() => em.focus({ preventScroll: true }), 350);
        ooHit("act:gate"); snd();
      }, true);
      document.addEventListener("oo-sub-ok", (ev) => {
        try { localStorage.setItem("oo-unlocked", "1"); } catch (e) {}
        if (ev.detail && ev.detail.form && gate.contains(ev.detail.form)) { setTimeout(() => { gate.hidden = true; if (want) want.click(); }, 900); }
      });
    }
    /* three plans: free, monitoring, readiness review */
    const row = document.querySelector(".wx-row");
    if (row && !row.querySelector(".wx-free-card")) {
      const mon = row.querySelector(".wx-mon"), rev = row.querySelector(".wx-rev");
      const free = document.createElement("article"); free.className = "wx-card wx-free-card";
      free.innerHTML = `<p class="wx-name">${esc(T("Free", "Zdarma"))}</p><p class="wx-price">€0</p><p class="wx-sub">${esc(T("Open to everyone · no login", "Pro každého · bez přihlášení"))}</p>` +
        `<div class="wx-text"><p>${esc(T("Explore the atlas and see what your product depends on.", "Prozkoumejte atlas a zjistěte, na čem váš výrobek závisí."))}</p><ul><li>${esc(T("The interactive atlas and the quick check", "Interaktivní atlas a rychlá kontrola"))}</li><li>${esc(T("This week's headlines", "Titulky tohoto týdne"))}</li><li>${esc(T("With your email: the Monday brief and all live data", "S e-mailem: pondělní přehled a všechna živá data"))}</li></ul></div>` +
        `<a class="wx-ask" href="#monday">${esc(T("Get the free Monday brief", "Pondělní přehled zdarma"))} <span aria-hidden="true">→</span></a>`;
      row.insertBefore(free, row.firstChild);
      row.classList.remove("wx-two"); row.classList.add("wx-three");
      if (mon) {
        const txt = mon.querySelector(".wx-text");
        if (txt) txt.innerHTML = `<p>${esc(T("A same-day alert when something changes for your minerals, so you hear it before your suppliers call.", "Upozornění ještě v den, kdy se u vašich surovin něco změní, abyste to věděli dřív, než vám zavolají dodavatelé."))}</p><ul><li>${esc(T("Export controls, plant outages and prices", "Vývozní kontroly, výpadky závodů a ceny"))}</li><li>${esc(T("Deadline reminders 30, 14 and 7 days ahead", "Připomínky termínů 30, 14 a 7 dní předem"))}</li><li>${esc(T("One question a month, answered by a person within two working days", "Jednou měsíčně odpověď na vaši otázku, od člověka do dvou pracovních dnů"))}</li></ul>`;
      }
      if (rev) { const call = rev.querySelector(".wx-call"); if (call) { call.href = BOOK; if (ext) { call.target = "_blank"; call.rel = "noopener"; } } }
      document.querySelectorAll(".wx-steps, .wx-vat").forEach((e) => e.remove());
      const bandBtn = document.querySelector(".wx-btns .btn:not(.ghost)"); if (bandBtn) { bandBtn.href = BOOK; bandBtn.textContent = T("Book a 30-minute intro call", "Domluvit 30minutový hovor"); if (ext) { bandBtn.target = "_blank"; bandBtn.rel = "noopener"; } }
      const th = document.querySelector("#teams .sec-head h2"); if (th) th.innerHTML = esc(T("Start free.", "Začněte zdarma.")) + "<br><b>" + esc(T("Get alerted. Get ready.", "Buďte upozorněni. Buďte připraveni.")) + "</b>";
      const tp = document.querySelector("#teams .sec-head p"); if (tp) tp.textContent = T("Three levels: the free atlas, monitoring for your minerals, and a readiness review for your board.", "Tři úrovně: atlas zdarma, monitoring vašich surovin a posouzení připravenosti pro vaše vedení.");
      const tl = document.querySelector("#teams .sec-head .label"); if (tl) tl.textContent = T("Plans", "Úrovně");
      const fr = document.querySelector(".wx-free"); if (fr) fr.remove();
    }
  }
  try { v25(); } catch (e) { /* the atlas works without it */ }
  try { if (window.ooWeekRender) window.ooWeekRender(); } catch (e) {}



  /* ---------- v26: a clean plans table, icons on the evidence tiles ---------- */
  function v26() {
    const $i = (x) => document.getElementById(x);
    const C = window.ATLAS_CONFIG || {};
    const BOOK = (C.bookingUrl || "").trim() || "mailto:david@madali.cz";
    const snd = () => { try { if (O.SND && O.SND.on && O.SND.tick) O.SND.tick(); } catch (e) {} };
    const ICON = [[/import|dovoz/i, '<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>'],
                  [/ship|chokepoint|lod|úžin/i, '<path d="M3 15l2 5h14l2-5H3z"/><path d="M6 15V9h12v6"/><path d="M12 9V4"/><path d="M9 6h6"/>'],
                  [/conflict|konflikt/i, '<circle cx="12" cy="12" r="8"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><circle cx="12" cy="12" r="2"/>'],
                  [/demand|tender|poptáv|zakázk/i, '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>'],
                  [/research|výzkum|alternativ/i, '<path d="M9 3h6"/><path d="M10 3v6L4.2 18.6A1.6 1.6 0 0 0 5.6 21h12.8a1.6 1.6 0 0 0 1.4-2.4L14 9V3"/><path d="M7 15h10"/>'],
                  [/heat|tepl/i, '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 1.6 1 2.5 2 3 .5-3-1-5.5.5-8z"/>'],
                  [/sulphur|sulfur|SO2|SO₂|síř/i, '<path d="M7 17h10a4 4 0 0 0 0-8 6 6 0 0 0-11.5 1.5A3.5 3.5 0 0 0 7 17z"/><path d="M9 21h6"/>']];
    document.querySelectorAll(".sig-tile").forEach((t) => {
      if (t.querySelector(".st-ic")) return;
      const title = (t.querySelector("b") || {}).textContent || "";
      const hit = ICON.find(([re]) => re.test(title));
      const ic = document.createElement("span"); ic.className = "st-ic"; ic.setAttribute("aria-hidden", "true");
      ic.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${hit ? hit[1] : '<circle cx="12" cy="12" r="4"/>'}</svg>`;
      const d = t.querySelector(".st-dot"); if (d) d.replaceWith(ic); else t.prepend(ic);
    });
    /* plans: three equal cards, a checklist each, buttons on one line; the monitoring form opens on demand */
    const row = document.querySelector(".wx-row");
    if (!row || row.classList.contains("pl-row")) return;
    const MP = String((window.ATLAS_CONFIG || {}).monitoringPrice || "49").trim();   /* build 55: the price comes from config.js, never typed */
    const chk = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l3 3 6-7"/></svg>';
    const list = (xs) => `<ul class="pl-list">${xs.map((x) => `<li><i>${chk}</i>${esc(x)}</li>`).join("")}</ul>`;
    const formHTML = (row.querySelector('.oo-sub[data-plan="monitoring"]') || {}).outerHTML || "";
    row.className = "pl-row";
    row.innerHTML =
      `<article class="pl-card"><p class="pl-k">01 · ${esc(T("Free", "Zdarma"))}</p><p class="pl-price">€0</p><p class="pl-sub">${esc(T("Open to everyone, no login", "Pro každého, bez přihlášení"))}</p>` +
        list([T("The interactive atlas", "Interaktivní atlas"), T("The quick check for your product", "Rychlá kontrola vašeho výrobku"), T("This week's headlines", "Titulky tohoto týdne"), T("With your email: the Monday brief and all live data", "S e-mailem: pondělní přehled a všechna živá data")]) +
        `<button type="button" class="btn ghost pl-cta" data-go="brief">${esc(T("Get the free Monday brief", "Pondělní přehled zdarma"))}</button></article>` +
      `<article class="pl-card pl-feat"><span class="pl-badge"><i></i>${esc(T("For your minerals", "Pro vaše suroviny"))}</span><p class="pl-k">02 · ${esc(T("Monitoring", "Monitoring"))}</p><p class="pl-price">${esc(T("€" + MP, MP + " €"))}<small>${esc(T(" / month", " / měsíc"))}</small></p><p class="pl-sub">${esc(T("Cancel anytime", "Zrušíte kdykoli"))}</p>` +
        list([T("A same-day alert when something changes for your minerals", "Upozornění ještě v den, kdy se u vašich surovin něco změní"), T("Export controls, plant outages, prices and news", "Vývozní kontroly, výpadky závodů, ceny a zprávy"), T("Deadline reminders 30, 14 and 7 days ahead", "Připomínky termínů 30, 14 a 7 dní předem"), T("One question a month, answered by a person within two working days", "Jednou měsíčně odpověď na vaši otázku, od člověka do dvou pracovních dnů")]) +
        `<button type="button" class="btn pl-cta" data-go="mon">${esc(T("Start monitoring", "Spustit monitoring"))}</button></article>` +
      `<article class="pl-card"><p class="pl-k">03 · ${esc(T("Readiness review", "Posouzení připravenosti"))}</p><p class="pl-price pl-price-t">${esc(T("Tailored", "Na míru"))}</p><p class="pl-sub">${esc(T("Scope and price after a free 30-minute call", "Rozsah a cena po bezplatném 30minutovém hovoru"))}</p>` +
        list([T("One product line in two to three weeks", "Jedna výrobní řada za dva až tři týdny"), T("Your parts register and stress tests", "Registr dílů a zátěžové testy"), T("The rules that decide who can supply you", "Pravidla, která rozhodují, kdo vám smí dodávat"), T("Slides for your board, CRMA Article 24", "Podklady pro vedení, článek 24 CRMA")]) +
        `<a class="btn ghost pl-cta" href="${esc(BOOK)}"${/^https?:/.test(BOOK) ? ' target="_blank" rel="noopener"' : ""}>${esc(T("Book a 30-minute intro call", "Domluvit 30minutový hovor"))}</a></article>`;
    const panel = document.createElement("div"); panel.className = "pl-form"; panel.hidden = true;
    panel.innerHTML = `<div><b>${esc(T("Start monitoring", "Spustit monitoring"))}</b><span>${esc(T("For: ", "Pro: "))}<span class="wx-mins"></span> · <a href="#monday">${esc(T("change minerals", "změnit suroviny"))}</a></span><span class="pl-note">${esc(T("David replies within one working day with a sample alert for your minerals and the terms.", "David se do jednoho pracovního dne ozve s ukázkovým upozorněním pro vaše suroviny a podmínkami."))}</span></div>${formHTML}`;
    row.after(panel);
    const mins = () => { const p = $i("mon-pick"); const n = p ? [...p.querySelectorAll('.chip2[data-my][aria-pressed="true"]')].map((b) => b.textContent.trim()) : []; panel.querySelector(".wx-mins").textContent = n.length ? n.join(", ") : T("all twelve minerals", "všech dvanáct surovin"); };
    mins(); const pk = $i("mon-pick"); if (pk) watchPick(mins);
    row.addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-go]"); if (!b) return;
      snd();
      if (b.dataset.go === "mon") { panel.hidden = !panel.hidden; if (!panel.hidden) { ooHit("act:plan-mon"); setTimeout(() => { panel.scrollIntoView({ behavior: "smooth", block: "center" }); const em = panel.querySelector('input[type="email"]'); if (em) em.focus({ preventScroll: true }); }, 60); } }
      if (b.dataset.go === "brief") { ooHit("act:plan-brief"); const w = document.querySelector(".wk2-sub"); if (w) { w.scrollIntoView({ behavior: "smooth", block: "center" }); const em = w.querySelector('input[type="email"]'); if (em) setTimeout(() => em.focus({ preventScroll: true }), 500); } }
    });
    row.querySelector('a.pl-cta').addEventListener("click", () => { snd(); ooHit("act:review-call"); });
  }
  try { v26(); } catch (e) { /* the atlas works without it */ }



  /* ---------- v27: an editorial plans table with one row of actions, a quieter page, payment confirmation ---------- */
  function v27() {
    const $i = (x) => document.getElementById(x);
    const C = window.ATLAS_CONFIG || {};
    const BOOK = (C.bookingUrl || "").trim() || "mailto:david@madali.cz";
    const ext = /^https?:/.test(BOOK) ? ' target="_blank" rel="noopener"' : "";
    const PRICE = String(C.monitoringPrice || "49").trim();
    const snd = (big) => { try { if (O.SND && O.SND.on) { if (big && O.SND.chord) O.SND.chord([523.25, 659.25, 783.99], 0.03); else if (O.SND.tick) O.SND.tick(); } } catch (e) {} };
    const cons = (txt) => `<p class="oo-cons"><span>${esc(txt)} <a href="https://bohemiadefense.com/legal/" target="_blank" rel="noopener">${esc(T("Privacy", "Ochrana údajů"))}</a></span></p>`;
    const form = (plan, btn, consTxt) => `<form class="oo-sub" data-plan="${plan}" novalidate><div class="oo-sub-row"><input type="email" name="email" required autocomplete="email" placeholder="${esc(T("Work email", "Pracovní e-mail"))}" aria-label="${esc(T("Work email", "Pracovní e-mail"))}"><button type="submit" class="btn">${esc(btn)}</button></div><input class="oo-hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">${cons(consTxt)}<p class="oo-msg" role="status" aria-live="polite"></p></form>`;
    /* plans: three columns, thin rules, one aligned row of actions */
    const row = document.querySelector(".pl-row, .wx-row");
    if (row && !row.classList.contains("pl3")) {
      const li = (xs) => `<ul class="pl3-list">${xs.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
      row.className = "pl3";
      row.innerHTML =
        `<div class="pl3-col pl3-a"><p class="pl3-k">01 · ${esc(T("Free", "Zdarma"))}</p><p class="pl3-price">€0</p><p class="pl3-sub">${esc(T("Open to everyone, no login.", "Pro každého, bez přihlášení."))}</p>` +
          li([T("The interactive atlas", "Interaktivní atlas"), T("The quick check for your product", "Rychlá kontrola vašeho výrobku"), T("This week's headlines", "Titulky tohoto týdne"), T("The Monday brief by email", "Pondělní přehled e-mailem")]) + `</div>` +
        `<div class="pl3-col pl3-b"><p class="pl3-k">02 · ${esc(T("Monitoring", "Monitoring"))}</p><p class="pl3-price">${esc(CS ? PRICE + " €" : "€" + PRICE)}<small>${esc(T(" / month", " / měsíc"))}${CS && C.monitoringPriceCzk ? esc(" · asi " + C.monitoringPriceCzk + " Kč") : ""}</small></p><p class="pl3-sub">${esc(T("Pay by card. Cancel anytime.", "Platba kartou. Zrušíte kdykoli.")) }</p>` +
          li([T("We watch your minerals, their sites and deadlines around the clock.", "Sledujeme vaše suroviny, jejich lokality a termíny nepřetržitě."), T("You hear from us when something changes, and every Monday.", "Ozveme se, když se něco změní, a každé pondělí."), T("Ask us one question a month. A person answers within two working days.", "Jednou měsíčně se nás můžete na cokoli zeptat. Odpoví člověk do dvou pracovních dnů.")]) + `<p class="pl3-fine">${esc(T("Includes a weekly data file for your minerals.", "Součástí je týdenní datový soubor pro vaše suroviny."))}</p></div>` +
        `<div class="pl3-col pl3-c"><p class="pl3-k">03 · ${esc(T("Readiness review", "Posouzení připravenosti"))}</p><p class="pl3-price">${esc(T("Tailored", "Na míru"))}</p><p class="pl3-sub">${esc(T("Scope and price after a free 30-minute call.", "Rozsah a cena po bezplatném 30minutovém hovoru."))}</p>` +
          li([T("One product line in two to three weeks", "Jedna výrobní řada za dva až tři týdny"), T("Your parts register and stress tests", "Registr dílů a zátěžové testy"), T("The rules that decide who can supply you", "Pravidla, která rozhodují, kdo vám smí dodávat"), T("Slides for your board, CRMA Article 24", "Podklady pro vedení, článek 24 CRMA")]) + `</div>` +
        `<div class="pl3-act pl3-x"><button type="button" class="btn ghost" data-go="brief">${esc(T("Get the free Monday brief", "Pondělní přehled zdarma"))}</button></div>` +
        `<div class="pl3-act pl3-y">${form("monitoring", T("Start monitoring", "Spustit monitoring"), T("We'll use this address for your alerts and the payment.", "Tuto adresu použijeme pro vaše upozornění a platbu."))}</div>` +
        `<div class="pl3-act pl3-z"><a class="btn ghost" href="${esc(BOOK)}"${ext}>${esc(T("Book a 30-minute intro call", "Domluvit 30minutový hovor"))}</a></div>`;
      document.querySelectorAll(".pl-form").forEach((e) => e.remove());
      row.addEventListener("click", (ev) => {
        const b = ev.target.closest('[data-go="brief"]');
        if (b) { snd(); ooHit("act:plan-brief"); const w = document.querySelector(".wk3, .wk2-sub"); if (w) { w.scrollIntoView({ behavior: "smooth", block: "center" }); const em = w.querySelector('input[type="email"]'); if (em) setTimeout(() => em.focus({ preventScroll: true }), 500); } }
        if (ev.target.closest(".pl3-z a")) { snd(); ooHit("act:review-call"); }
      });
    }
    /* the founder card: one clear button to the calendar */
    const bb = document.querySelector(".wx-btns .btn:not(.ghost)");
    if (bb) { bb.href = BOOK; bb.textContent = T("Pick a date", "Vybrat termín"); if (ext) { bb.target = "_blank"; bb.rel = "noopener"; } }
    /* headings: shorter, tighter */
    const tr = document.querySelector("#trust .sec-head h2"); if (tr) tr.innerHTML = esc(T("How we", "Jak to")) + " <b>" + esc(T("know.", "víme.")) + "</b>";
    /* the method stays short; the detailed know-how and the data-health panel are not public */
    ["method", "health"].forEach((id) => { const s = $i(id); if (s) { s.hidden = true; s.style.display = "none"; } });
    const trs = $i("trust");
    if (trs) {
      trs.querySelectorAll(".dd-tabs").forEach((e) => e.remove());
      const p = trs.querySelector(".sec-head p");
      if (p) p.textContent = T("Every figure comes from public data, satellite imagery or verified news, and shows its date. Licensed data are credited on the legal page.", "Každé číslo pochází z veřejných dat, satelitních snímků nebo ověřených zpráv a uvádí své datum. Licencovaná data uvádíme na právní stránce.");
      if (p && !trs.querySelector(".tr-legal")) { const a = document.createElement("a"); a.className = "tr-legal"; a.href = "p/legal.html"; a.textContent = T("Data credits and terms", "Zdroje dat a podmínky") + " →"; p.after(a); }
    }
    /* the Sections menu: no "Present" entry */
    const menu = $i("sec-list");
    const dropPresent = () => { if (menu) menu.querySelectorAll("li").forEach((li) => { if (/Present|Prezent|full screen|celá obrazovka/i.test(li.textContent)) li.remove(); }); };
    dropPresent(); if (menu) new MutationObserver(dropPresent).observe(menu, { childList: true });
    /* the Monday brief sign-up, redesigned: a quiet editorial strip */
    const old = document.querySelector(".wk2-sub");
    if (old && !document.querySelector(".wk3")) {
      const w = document.createElement("div"); w.className = "wk3";
      w.innerHTML = `<div class="wk3-l"><p class="wk3-k"><i></i>${esc(T("The Monday brief", "Pondělní přehled"))}</p><p class="wk3-h">${esc(T("Get this every Monday,", "Dostávejte to každé pondělí,"))} <b>${esc(T("free.", "zdarma."))}</b></p><p class="wk3-m">${esc(T("For: ", "Pro: "))}<span class="wk2-sub-m"></span></p></div>` +
        `<div class="wk3-r">${form("brief", T("Subscribe", "Odebírat"), T("We'll send the Monday brief to this address. Unsubscribe any time.", "Na tuto adresu vám budeme posílat pondělní přehled. Odhlásit se můžete kdykoli."))}<p class="wk3-d">${esc(T("Monitoring goes further: a same-day alert when something changes for your minerals.", "Monitoring jde dál: upozornění ještě v den, kdy se u vašich surovin něco změní."))} <a href="#teams">${esc(T("See plans", "Úrovně"))} →</a></p></div>`;
      old.replaceWith(w);
      const upd = () => { const pk = $i("mon-pick"); const n = pk ? [...pk.querySelectorAll('.chip2[data-my][aria-pressed="true"]')].map((b) => b.textContent.trim()) : []; const sp = w.querySelector(".wk2-sub-m"); if (sp) sp.textContent = n.length ? n.join(", ") : T("all twelve minerals", "všech dvanáct surovin"); };
      upd(); const pk = $i("mon-pick"); if (pk) watchPick(upd);
    }
    /* back from payment: a clear confirmation */
    if (/[?&]paid=1/.test(location.search)) {
      const m = document.createElement("div"); m.className = "oo-paid"; m.setAttribute("role", "status");
      m.innerHTML = `<i></i><div><b>${esc(T("Payment received. Welcome to OreOrbit monitoring.", "Platba přijata. Vítejte v monitoringu OreOrbit."))}</b><span>${esc(T("A welcome email is on its way; your first alert or Monday edition follows automatically.", "Uvítací e-mail je na cestě; první upozornění nebo pondělní vydání přijde automaticky."))}</span></div><button type="button" aria-label="Close">×</button>`;
      document.body.appendChild(m); m.querySelector("button").addEventListener("click", () => m.remove()); snd(true); ooHit("act:paid");
    }
    if (CS) {
      const fl = document.querySelector(".foot-links");
      if (fl) { const L = ["Atlas", "Rychlá kontrola", "Tento týden", "Živé důkazy", "Monitoring", "Knihovna", "Služby", "Zdroje dat a podmínky"]; fl.querySelectorAll("a").forEach((x, k) => { if (L[k]) x.textContent = L[k]; }); const sv = fl.querySelector('a[href="p/services.html"]'); if (sv) sv.href = "p/services-cs.html"; }
      const pv = $i("oo-priv-2"); if (pv) pv.textContent = "Žádné cookies, sledování ani reklama. Vaše nastavení (jazyk, zvuk, vybrané suroviny) zůstávají ve vašem prohlížeči. Odesílá se jen váš e-mail, a to jen když se přihlásíte k pondělnímu přehledu nebo k monitoringu.";
      const cr = $i("oo-cred"); if (cr) cr.innerHTML = 'Ostatní otevřená data uvádíme na stránce <a href="p/legal.html">zdroje dat a podmínky</a>; každá lokalita, trasa a zpráva odkazuje na svůj zdroj.';
    }
    try { if (O.renderSecList) O.renderSecList(); } catch (e) {}
  }
  try { v27(); } catch (e) { /* the atlas works without it */ }



  /* ---------- v28: professional icons, a separate mineral choice for the Monday brief, natural Czech ---------- */
  function v28() {
    const $i = (x) => document.getElementById(x);
    const pr = $i("nav-present"); if (pr) pr.remove();   // no "Present" button anywhere
    /* the original offer block (old prices, old photo) leaves the page entirely, so search engines never read it */
    const purge = () => document.querySelectorAll("#tm-root > .tm, .wx-vat, .wx-steps, .pl-form").forEach((e) => e.remove());
    purge(); const tmr = $i("tm-root"); if (tmr) new MutationObserver(purge).observe(tmr, { childList: true });
    const snd = () => { try { if (O.SND && O.SND.on && O.SND.tick) O.SND.tick(); } catch (e) {} };
    /* icons: one consistent line set (Lucide, ISC licence), neutral, no colour blobs */
    const L = [[/import|dovoz/i, '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/>'],
               [/ship|chokepoint|lod|úžin/i, '<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>'],
               [/conflict|konflikt/i, '<circle cx="12" cy="12" r="10"/><path d="M22 12h-4M6 12H2M12 6V2M12 22v-4"/>'],
               [/demand|tender|poptáv|zakázk/i, '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>'],
               [/research|výzkum|alternativ/i, '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>'],
               [/heat|tepl/i, '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>'],
               [/sulphur|sulfur|SO2|SO₂|síř/i, '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>']];
    document.querySelectorAll(".sig-tile").forEach((t) => {
      const title = (t.querySelector("b") || {}).textContent || "", hit = L.find(([re]) => re.test(title));
      let ic = t.querySelector(".st-ic"); if (!ic) { ic = document.createElement("span"); ic.className = "st-ic"; ic.setAttribute("aria-hidden", "true"); const d = t.querySelector(".st-dot"); if (d) d.replaceWith(ic); else t.prepend(ic); }
      ic.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${hit ? hit[1] : '<circle cx="12" cy="12" r="9"/>'}</svg>`;
    });
    /* the Monday brief: follows the quick check by default, with its own simple choice */
    const w = document.querySelector(".wk3"), pk = $i("mon-pick");
    if (w && pk && !w.querySelector(".wk3-pick")) {
      const keys = () => [...(PK() || pk).querySelectorAll(".chip2[data-my]")].map((b) => [b.dataset.my, b.textContent.trim()]);
      let own = null;   // null: follow the page's selection
      const cur = () => own || [...(PK() || pk).querySelectorAll('.chip2[data-my][aria-pressed="true"]')].map((b) => b.dataset.my);
      window.ooBriefMins = () => cur();
      const m = w.querySelector(".wk3-m");
      const box = document.createElement("div"); box.className = "wk3-pick"; box.hidden = true;
      m.after(box);
      const draw = () => {
        const sel = cur(), K = keys(), names = K.filter(([k]) => sel.includes(k)).map(([, n]) => n);
        m.innerHTML = `${esc(T("For: ", "Pro: "))}<span>${esc(names.length ? names.join(", ") : T("all twelve minerals", "všech dvanáct surovin"))}</span> · <button type="button" class="wk3-ch">${esc(box.hidden ? T("change", "změnit") : T("done", "hotovo"))}</button>${own ? ` · <button type="button" class="wk3-rs">${esc(T("follow my product", "podle výrobku"))}</button>` : ""}`;
        box.innerHTML = K.map(([k, n]) => `<button type="button" data-k="${k}" aria-pressed="${sel.includes(k)}">${esc(n)}</button>`).join("");
      };
      w.addEventListener("click", (ev) => {
        if (ev.target.closest(".wk3-ch")) { box.hidden = !box.hidden; snd(); draw(); return; }
        if (ev.target.closest(".wk3-rs")) { own = null; snd(); draw(); return; }
        const b = ev.target.closest(".wk3-pick button[data-k]"); if (!b) return;
        const s = new Set(cur()); s.has(b.dataset.k) ? s.delete(b.dataset.k) : s.add(b.dataset.k);
        own = [...s]; snd(); draw(); ooHit("act:brief-pick");
      });
      draw(); watchPick(() => { if (!own) draw(); });
    }
    /* natural Czech on the landing page */
    if (CS) {
      const set = (sel, html) => { const e = document.querySelector(sel); if (e) e.innerHTML = html; };
      set(".hero-copy h1", "Zjistěte, na čem<br><b>závisí váš výrobek.</b>");
      set("#monday .sec-head h2", "Co se tento týden<br><b>děje.</b>");
      set("#teams .sec-head h2", "Začněte zdarma.<br><b>Buďte o krok napřed.</b>");
      set("#signals .sec-head p", "Sedm živých signálů z otevřených dat a družic. Kliknutím zobrazíte plná data.");
      const st = document.querySelectorAll(".steps-band .inner a");
      const S = [["Prověřte svůj výrobek", "Za minutu zjistíte, na čem závisí"], ["Co se tento týden děje", null], ["Upozornění na vaše suroviny", "Monitoring e-mailem"]];
      st.forEach((a, k) => { const sp = a.querySelector("span"); if (!sp || !S[k]) return; const sm = sp.querySelector("small"); const keep = sm ? sm.textContent : ""; sp.innerHTML = esc(S[k][0]) + "<small>" + esc(S[k][1] || keep) + "</small>"; });
    }
  }
  try { v28(); } catch (e) { /* the atlas works without it */ }



  /* ---------- v29: the opening text stays new in Czech, a mineral choice for monitoring ---------- */
  function v29() {
    const $i = (x) => document.getElementById(x);
    const snd = () => { try { if (O.SND && O.SND.on && O.SND.tick) O.SND.tick(); } catch (e) {} };
    /* 2. the atlas translates the opening after load; mark it as final and keep it */
    const h1 = document.querySelector(".hero-copy h1"), lede = h1 && h1.nextElementSibling;
    const H = CS ? "Zjistěte, na čem<br><b>závisí váš výrobek.</b>" : esc(T("See what your product", "")) + "<br><b>" + esc(T("depends on.", "")) + "</b>";
    const P = T("The twelve critical minerals behind Europe's defence and space industry: who controls them, and what changes this week.", "Dvanáct kritických surovin, na kterých stojí evropský obranný a kosmický průmysl: kdo je ovládá a co se tento týden mění.");
    const Hc = (() => { const t = document.createElement("div"); t.innerHTML = H; return t.innerHTML; })();
    const keep = () => { if (h1 && h1.innerHTML !== Hc) h1.innerHTML = Hc; if (lede && lede.tagName === "P" && lede.textContent !== P) lede.textContent = P; };
    [h1, lede].forEach((e) => { if (e) { e.setAttribute("data-notr", ""); new MutationObserver(keep).observe(e, { childList: true, characterData: true, subtree: true }); } });
    keep();
    /* 6. monitoring: which minerals to watch, chosen right in the plan */
    const cell = document.querySelector(".pl3-y"), pk = $i("mon-pick");
    if (cell && pk && !cell.querySelector(".mon-for")) {
      let own = null;
      const keys = () => [...(PK() || pk).querySelectorAll(".chip2[data-my]")].map((b) => [b.dataset.my, b.textContent.trim()]);
      const cur = () => own || [...(PK() || pk).querySelectorAll('.chip2[data-my][aria-pressed="true"]')].map((b) => b.dataset.my);
      window.ooMonMins = () => cur();
      window.ooMonDraw = () => draw();
      window.ooMonSet = (list, keepOpen) => { const k = keys().map(([x]) => x), want = k.filter((x) => (list || []).includes(x)); if (!want.length) return; own = want; if (!keepOpen) box.hidden = true; draw(); };   // v43: set from the quick check
      const line = document.createElement("p"); line.className = "wk3-m mon-for";
      const box = document.createElement("div"); box.className = "wk3-pick"; box.hidden = true;
      const form = cell.querySelector(".oo-sub"); cell.insertBefore(line, form); cell.insertBefore(box, form);
      const draw = () => {
        const sel = cur(), names = keys().filter(([k]) => sel.includes(k)).map(([, n]) => n);
        const oth = window.ooMonOtherNames ? window.ooMonOtherNames() : [];
        line.innerHTML = `${esc(T("Watch: ", "Hlídat: "))}<span>${esc((names.length ? names.join(", ") : T("all twelve minerals", "všech dvanáct surovin")) + (oth.length ? " + " + oth.join(", ") : ""))}</span> · <button type="button" class="wk3-ch">${esc(box.hidden ? T("change", "změnit") : T("done", "hotovo"))}</button>`;
        box.innerHTML = keys().map(([k, n]) => `<button type="button" data-k="${k}" aria-pressed="${sel.includes(k)}">${esc(n)}</button>`).join("");
      };
      document.addEventListener("click", (ev) => {
        if (!ev.target.closest(".pl3")) return;
        if (ev.target.closest(".mon-for .wk3-ch")) { box.hidden = !box.hidden; snd(); draw(); return; }
        const b = ev.target.closest(".wk3-pick button[data-k]"); if (!b || !box.contains(b)) return;
        const s = new Set(cur()); s.has(b.dataset.k) ? s.delete(b.dataset.k) : s.add(b.dataset.k);
        own = [...s]; snd(); draw(); ooHit("act:mon-pick");
      });
      draw(); watchPick(() => { if (!own) draw(); });
    }
  }
  try { v29(); } catch (e) { /* the atlas works without it */ }



  /* ---------- v30: "something else" in the quick check, a build number for checking deploys ---------- */
  function v30() {
    const box = document.querySelector("#check .qc-prods");
    if (box && !box.querySelector(".qc-other")) {
      const b = document.createElement("button"); b.type = "button"; b.className = "qc-p qc-other";
      b.textContent = T("Something else", "Něco jiného");
      box.appendChild(b);
      b.addEventListener("click", () => {
        const out = document.querySelector(".qc-out, #qc-out");
        if (out) out.innerHTML = `<div class="qc-else"><p class="qc-else-h">${esc(T("Not on the list? Two quick ways.", "Váš výrobek tu není? Dvě rychlé cesty."))}</p>` +
          `<p>${esc(T("1. Pick the minerals your product contains in “This week” below; everything on the page follows your choice.", "1. Vyberte níže v části „Tento týden“ suroviny, které váš výrobek obsahuje; celá stránka se řídí vaším výběrem."))}</p>` +
          `<p>${esc(T("2. Not sure what is inside it? In a free 30-minute call we map your product's minerals with you.", "2. Nevíte, co v něm je? Na bezplatném 30minutovém hovoru vám suroviny výrobku zmapujeme."))}</p>` +
          `<div class="qc-else-b"><a class="btn" href="#monday">${esc(T("Pick minerals", "Vybrat suroviny"))}</a><a class="btn ghost" href="${esc(((window.ATLAS_CONFIG || {}).bookingUrl) || "mailto:david@madali.cz")}" target="_blank" rel="noopener">${esc(T("Book a 30-minute call", "Domluvit 30minutový hovor"))}</a></div></div>`;
        box.querySelectorAll(".qc-p").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        ooHit("act:qc-other");
      });
    }
    const foot = document.querySelector(".oo-foot, footer .foot-links");
    if (foot && !document.querySelector(".oo-build")) { const s = document.createElement("span"); s.className = "oo-build"; s.textContent = "build 56"; (document.querySelector("footer") || document.body).appendChild(s); }
  }
  try { v30(); } catch (e) { /* the atlas works without it */ }



  /* ---------- v31: pin the new texts so the atlas's later translation pass cannot bring back old ones ---------- */
  function v31() {
    const pinned = new Map();
    /* the browser's own serialisation is stored, so a pinned text never looks "changed" to itself (no loops) */
    const nbT = (t) => t.replace(/(^|[\s\u00a0(„“])([vkszaiouVKSZAIOU]) +(?=\S)/g, "$1$2\u00a0").replace(/(^|[\s\u00a0(„“])([vkszaiouVKSZAIOU]) +(?=\S)/g, "$1$2\u00a0");
    const nbH = (h) => CS ? (">" + h).replace(/>([^<]+)/g, (m, t) => ">" + nbT(t)).slice(1) : h;   /* Czech spaces in pinned texts too */
    const canon = (html) => { const t = document.createElement("div"); t.innerHTML = nbH(html); return t.innerHTML; };
    const pin = (el, html) => { if (!el) return; el.setAttribute("data-notr", ""); const c = canon(html); pinned.set(el, c); if (el.innerHTML !== c) el.innerHTML = c; };
    let busy = false;
    const guard = () => { if (busy) return; busy = true; try { pinned.forEach((c, el) => { if (el.isConnected && el.innerHTML !== c) el.innerHTML = c; }); } finally { busy = false; } };
    const q = (s) => document.querySelector(s), qa = (s) => [...document.querySelectorAll(s)];
    const head = (id, label, h2, p) => { const s = document.getElementById(id); if (!s) return; pin(s.querySelector(".sec-head .label"), esc(label)); pin(s.querySelector(".sec-head h2"), h2); if (p !== null) pin(s.querySelector(".sec-head p"), esc(p)); };
    const apply = () => {
      pin(q(".hero-copy h1"), CS ? "Zjistěte, na čem<br><b>závisí váš výrobek.</b>" : "See what your product<br><b>depends on.</b>");
      const h1 = q(".hero-copy h1"); if (h1 && h1.nextElementSibling && h1.nextElementSibling.tagName === "P") pin(h1.nextElementSibling, esc(T("The twelve critical minerals behind Europe's defence and space industry: who controls them, and what changes this week.", "Dvanáct kritických surovin, na kterých stojí evropský obranný a kosmický průmysl: kdo je ovládá a co se tento týden mění.")));
      head("check", T("Quick check", "Rychlá kontrola"), T("What does your product<br><b>depend on?</b>", "Na čem váš výrobek<br><b>závisí?</b>"), T("Pick what you make. See which minerals it needs, who controls them and what could hit it next.", "Vyberte, co vyrábíte. Uvidíte, které suroviny potřebuje, kdo je ovládá a co ho může zasáhnout."));
      head("monday", T("This week", "Tento týden"), T("What's moving<br><b>this week.</b>", "Co se tento týden<br><b>děje.</b>"), null);
      head("signals", T("Live evidence", "Živá data"), T("What the open data<br><b>says now.</b>", "Co říkají otevřená data<br><b>právě teď.</b>"), T("Seven live signals from open data and satellites. Open any of them for the full data.", "Sedm živých signálů z otevřených dat a družic. Kliknutím zobrazíte plná data."));
      head("teams", T("Plans", "Ceník"), T("Start free.<br><b>Get alerted. Get ready.</b>", "Začněte zdarma.<br><b>Buďte o krok napřed.</b>"), T("Three levels: the free atlas, monitoring for your minerals, and a readiness review for your board.", "Tři úrovně: atlas zdarma, monitoring vašich surovin a posouzení připravenosti pro vaše vedení."));
      head("trust", T("Data & method", "Data a metoda"), T("How we <b>know.</b>", "Jak to <b>víme.</b>"), T("Every figure comes from public data, satellite imagery or verified news, and shows its date. Licensed data are credited on the legal page.", "Každé číslo pochází z veřejných dat, družicových snímků nebo ověřených zpráv a má uvedené datum. Licencovaná data uvádíme na právní stránce."));
      pin(q(".wk3-h"), CS ? "Každé pondělí do e-mailu, <b>zdarma.</b>" : "Get this every Monday, <b>free.</b>");
      const d = q(".wk3-d"); if (d) pin(d, CS ? 'Chcete o změnách vědět hned? Monitoring vás upozorní ještě týž den. <a href="#teams">Ceník →</a>' : 'Want to know the same day? Monitoring alerts you when something changes for your minerals. <a href="#teams">See plans →</a>');
      if (CS) {
        const TT = [[/dovoz|import/i, "Dovoz do EU: odkud pochází"], [/lod|ship/i, "Lodní doprava úžinami"], [/konflikt|conflict/i, "Konflikty u dodavatelských řetězců"], [/poptáv|demand/i, "Poptávka evropské obrany"], [/výzkum|research/i, "Výzkum náhrad"], [/tepl|heat/i, "Provoz závodů z družic"], [/síř|sulph/i, "Oxid siřičitý nad hutěmi"]];
        qa(".sig-tile b").forEach((b) => { const hit = TT.find(([re]) => re.test(b.textContent)); if (hit) pin(b, esc(hit[1])); });
      }
    };
    apply();
    new MutationObserver(guard).observe(document.body, { childList: true, subtree: true, characterData: true });
    [800, 2500, 6000].forEach((t) => setTimeout(() => { apply(); guard(); }, t));
  }
  try { v31(); } catch (e) { /* the atlas works without it */ }
  try { const p = document.getElementById("oo-pub"); if (p && CS) p.textContent = "Jen veřejná data. Před citací ověřte uvedený zdroj."; document.querySelectorAll("#oo-imprint").forEach((e) => e.remove()); } catch (e) {}



  /* ---------- v33: a diagnostic panel (?debug=1) ---------- */
  function v33() {
    if (!/[?&]debug/.test(location.search)) return;
    const box = document.createElement("pre"); box.id = "oo-debug";
    box.style.cssText = "position:fixed;left:12px;bottom:12px;z-index:99;max-width:min(560px,calc(100vw - 24px));max-height:46vh;overflow:auto;margin:0;padding:12px 14px;border-radius:12px;background:rgba(0,0,0,.88);border:1px solid #3ddc97;color:#d6dad7;font:12px/1.5 Menlo,monospace;white-space:pre-wrap";
    document.body.appendChild(box);
    const tick = () => {
      const pk = document.getElementById("mon-pick");
      const on = pk ? [...pk.querySelectorAll('.chip2[aria-pressed="true"]')].map((b) => b.dataset.my).join(",") : "no chips";
      box.textContent = ["build 56 · " + (CS ? "cs" : "en") + " · " + location.pathname + location.search,
        "product: " + (window.ooProduct || "–") + " · sync: " + (typeof window.ooSetMinerals) + " · week: " + (typeof window.ooWeekData),
        "chips on: " + on,
        "caption: " + ((document.querySelector(".wk2-cap") || {}).textContent || "–").slice(0, 90),
        "first story: " + ((document.querySelector(".wk2-feed li") || {}).textContent || "–").slice(0, 70),
        "errors (" + window.ooErrs.length + "): " + (window.ooErrs.slice(-6).join(" | ") || "none")].join("\n");
    };
    tick(); setInterval(tick, 1000);
  }
  try { v33(); } catch (e) { window.ooErrs.push("v33: " + e.message); }



  /* ---------- v37: layers panel, the monitoring row aligned, the Monday brief on a grid ---------- */
  function v37() {
    /* the ship layer in Czech */
    const sh = document.querySelector("#lyr-ships small");
    if (sh && CS) { const t = "Skutečné hlášení lodí ve 3D, posunuté podle kurzu a rychlosti"; sh.setAttribute("data-notr", ""); sh.textContent = t; new MutationObserver(() => { if (sh.textContent !== t) sh.textContent = t; }).observe(sh, { childList: true, characterData: true, subtree: true }); }
    /* monitoring: "Watch: …" belongs to the column, so the three plan buttons stay on one line */
    const col = document.querySelector(".pl3-b"), forL = document.querySelector(".pl3-y .mon-for"), pick = document.querySelector(".pl3-y .wk3-pick");
    if (col && forL) { col.appendChild(forL); if (pick) col.appendChild(pick); }
  }
  try { v37(); } catch (e) { window.ooErrs && window.ooErrs.push("v37: " + e.message); }



  /* ---------- v38: money-back guarantee, manage or cancel, any other mineral ---------- */
  function v38() {
    const row = document.querySelector(".pl3");
    if (row && !document.querySelector(".pl3-guar")) {
      const g = document.createElement("div"); g.className = "pl3-guar";
      g.innerHTML = `<p><b>${esc(T("Money-back guarantee.", "Garance vrácení peněz."))}</b> ${esc(T("Not seeing the value? Ask within the first month and we refund you in full.", "Nevidíte přínos? Napište nám během prvního měsíce a vrátíme vám peníze."))}</p>` +
        `<p class="pl3-man">${esc(T("Already a client?", "Už jste klient?"))} <a href="manage.php">${esc(T("Manage or cancel your subscription", "Spravovat nebo zrušit předplatné"))} →</a></p>`;
      row.after(g);
    }
    /* v44: minerals beyond the tracked ones, from an allow-list (data/other-minerals.json, the same file go-pay.php
       and the robot read): autocomplete, up to three chips, an inline error for anything not on the list */
    const col = document.querySelector(".pl3-b"), forL = col && col.querySelector(".mon-for");
    if (col && forL && !col.querySelector(".mon-other")) {
      const w = document.createElement("div"); w.className = "mon-other";
      w.innerHTML = `<label for="mo-in">${esc(T("Other minerals (optional, up to three)", "Další suroviny (nepovinné, nejvýš tři)"))}</label>` +
        `<div class="mo-box"><span class="mo-chips"></span><input id="mo-in" type="text" maxlength="40" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="mo-list" placeholder="${esc(T("e.g. copper, tin, niobium", "např. měď, cín, niob"))}"><div class="mo-list" id="mo-list" role="listbox" hidden></div></div>` +
        `<p class="mo-msg" role="status" aria-live="polite"></p>`;
      const pk = col.querySelector(".wk3-pick"); (pk || forL).after(w);
      const inp = w.querySelector("input"), chips = w.querySelector(".mo-chips"), list = w.querySelector(".mo-list"), msg = w.querySelector(".mo-msg");
      let LIST = null, MAX = 3, TRK = {}, chosen = [], opts = [], act = -1;
      const norm = (x) => String(x || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
      const nm = (o) => (CS ? o.cs : o.en);
      const keysOf = (o) => [o.id, o.en, o.cs].concat(o.aka || []).map(norm);
      const trName = (k) => { try { return O.mName(k); } catch (e) { return k; } };
      fetch("data/other-minerals.json?v=1").then((r) => r.json()).then((j) => {
        LIST = Array.isArray(j.other) ? j.other : []; MAX = j.max || 3;
        Object.keys(j.tracked || {}).forEach((k) => (j.tracked[k] || []).concat([k]).forEach((a) => { TRK[norm(a)] = k; }));
      }).catch(() => { LIST = []; });
      const say = (t, bad) => { msg.textContent = t || ""; msg.classList.toggle("bad", !!bad); inp.setAttribute("aria-invalid", bad ? "true" : "false"); };
      const redraw = () => {
        chips.innerHTML = chosen.map((id) => { const o = LIST.find((x) => x.id === id); return o ? `<button type="button" class="mo-chip" data-id="${id}" aria-label="${esc(T("Remove ", "Odebrat ") + nm(o))}">${esc(nm(o))}<i aria-hidden="true">×</i></button>` : ""; }).join("");
        inp.placeholder = chosen.length >= MAX ? "" : T("e.g. copper, tin, niobium", "např. měď, cín, niob");
        if (window.ooMonDraw) window.ooMonDraw();
      };
      const close = () => { list.hidden = true; inp.setAttribute("aria-expanded", "false"); inp.removeAttribute("aria-activedescendant"); opts = []; act = -1; };
      const open = () => {
        const n = norm(inp.value); opts = [];
        if (n.length >= 2 && LIST) {
          const hit = (k) => k.startsWith(n) || (n.length >= 3 && k.includes(n));
          const seen = new Set();
          Object.keys(TRK).forEach((a) => { const k = TRK[a]; if (hit(a) && !seen.has(k)) { seen.add(k); opts.push({ tracked: k }); } });
          LIST.forEach((o) => { if (!chosen.includes(o.id) && keysOf(o).some(hit)) opts.push({ o }); });
          opts = opts.slice(0, 7);
        }
        if (!opts.length) { close(); return; }
        act = 0;
        list.innerHTML = opts.map((x, i) => `<div role="option" id="mo-o${i}" class="mo-opt" data-i="${i}" aria-selected="${i === act}">${x.o ? esc(nm(x.o)) : esc(trName(x.tracked)) + ` <small>${esc(T("already tracked", "už sledujeme"))}</small>`}</div>`).join("");
        list.hidden = false; inp.setAttribute("aria-expanded", "true"); inp.setAttribute("aria-activedescendant", "mo-o0");
      };
      const mark = () => list.querySelectorAll(".mo-opt").forEach((el, i) => { el.setAttribute("aria-selected", String(i === act)); if (i === act) inp.setAttribute("aria-activedescendant", el.id); });
      const addTracked = (k) => {
        const cur = window.ooMonMins ? window.ooMonMins() : [];
        if (window.ooMonSet) window.ooMonSet(cur.includes(k) ? cur : cur.concat([k]), true);   // the picker stays open while typing
        say(T("Monitoring always covers " + trName(k) + ". Added to your selection above.", "Surovinu „" + trName(k) + "“ monitoring sleduje vždy. Přidali jsme ji do vašeho výběru výše."));
      };
      const take = (x) => {
        inp.value = ""; close();
        if (x.tracked) { addTracked(x.tracked); return true; }
        if (chosen.includes(x.o.id)) { say(""); return true; }
        if (chosen.length >= MAX) { say(T("Up to three other minerals. Remove one first.", "Nejvýš tři další suroviny. Nejdřív jednu odeberte."), true); return false; }
        chosen.push(x.o.id); redraw(); say(""); ooHit("act:mon-other"); return true;
      };
      const unknown = (t) => say(T("We do not cover “" + t + "” yet. Pick one from the list, or write to david@madali.cz and we will look at it.",
                                  "„" + t + "“ zatím nesledujeme. Vyberte surovinu ze seznamu, nebo napište na david@madali.cz a podíváme se na to."), true);
      const resolve = (t) => { const n = norm(t); if (!n) return null; if (TRK[n]) return { tracked: TRK[n] }; const o = (LIST || []).find((x) => keysOf(x).includes(n)); return o ? { o } : null; };
      /* commits what is typed; false (and an error under the field) when something is not on the list */
      const commit = () => {
        const parts = inp.value.split(/[,;]+/).map((x) => x.trim()).filter(Boolean);
        if (!parts.length) { inp.value = ""; return true; }
        const bad = [];
        parts.forEach((t) => { const r = resolve(t); if (!r) bad.push(t); else if (!take(r)) bad.push(t); });
        if (bad.length) { inp.value = bad.join(", "); if (!msg.classList.contains("bad")) unknown(bad[0]); return false; }
        return true;
      };
      inp.addEventListener("input", () => { if (msg.classList.contains("bad")) say(""); if (/[,;]/.test(inp.value)) { commit(); return; } open(); });
      inp.addEventListener("keydown", (ev) => {
        if (ev.key === "ArrowDown" && opts.length) { ev.preventDefault(); act = (act + 1) % opts.length; mark(); }
        else if (ev.key === "ArrowUp" && opts.length) { ev.preventDefault(); act = (act - 1 + opts.length) % opts.length; mark(); }
        else if (ev.key === "Enter") { ev.preventDefault(); if (!list.hidden && opts[act]) take(opts[act]); else commit(); }
        else if (ev.key === "Escape") { close(); }
        else if (ev.key === "Backspace" && !inp.value && chosen.length) { chosen.pop(); redraw(); }
      });
      inp.addEventListener("blur", () => setTimeout(() => { if (!w.contains(document.activeElement)) { close(); if (inp.value.trim()) commit(); } }, 150));
      list.addEventListener("mousedown", (ev) => { const el = ev.target.closest(".mo-opt"); if (!el) return; ev.preventDefault(); take(opts[+el.dataset.i]); inp.focus(); });
      chips.addEventListener("click", (ev) => { const b = ev.target.closest(".mo-chip"); if (!b) return; chosen = chosen.filter((x) => x !== b.dataset.id); redraw(); say(""); inp.focus(); });
      window.ooMonOther = () => chosen.join(",");
      window.ooMonOtherNames = () => chosen.map((id) => { const o = (LIST || []).find((x) => x.id === id); return o ? nm(o) : id; });
      /* before payment: anything still typed must be on the list; the field opens and explains if not */
      window.ooMonOtherCheck = () => {
        if (!inp.value.trim()) return true;
        if (commit()) return true;
        const box = col.querySelector(".wk3-pick"); if (box && box.hidden) { const ch = col.querySelector(".mon-for .wk3-ch"); if (ch) ch.click(); }
        setTimeout(() => { try { inp.focus(); w.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {} }, 60);
        return false;
      };
    }
  }
  try { v38(); } catch (e) { window.ooErrs && window.ooErrs.push("v38: " + e.message); }



  /* ---------- v41: monitoring in one click — straight to payment, minerals travel with it ---------- */
  function v41() {
    const cell = document.querySelector(".pl3-y");
    if (!cell || cell.querySelector(".pl3-pay")) return;
    cell.querySelectorAll(".oo-sub").forEach((f) => f.remove());
    const b = document.createElement("a"); b.className = "btn pl3-pay"; b.href = "go-pay.php"; b.textContent = T("Start monitoring", "Spustit monitoring");
    const note = document.createElement("p"); note.className = "pl3-paynote";
    note.innerHTML = `${esc(T("Secure payment by Stripe. Cancel anytime.", "Zabezpečená platba přes Stripe. Zrušíte kdykoli."))} <a href="https://bohemiadefense.com/legal/" target="_blank" rel="noopener">${esc(T("Privacy", "Ochrana údajů"))}</a>`;
    cell.append(b, note);
    b.addEventListener("click", (ev) => {
      ev.preventDefault();
      if (window.ooMonOtherCheck && !window.ooMonOtherCheck()) { ooHit("act:mon-other-bad"); return; }
      const mins = (window.ooMonMins ? window.ooMonMins() : []).join(",");
      const other = window.ooMonOther ? window.ooMonOther() : "";
      ooHit("act:to-pay");
      try { if (O.SND && O.SND.on && O.SND.tick) O.SND.tick(); } catch (e) {}
      location.href = "go-pay.php?m=" + encodeURIComponent(mins) + "&o=" + encodeURIComponent(other) + "&l=" + (CS ? "cs" : "en");
    });
  }
  try { v41(); } catch (e) { window.ooErrs && window.ooErrs.push("v41: " + e.message); }

  try { motion(); } catch (e) { /* the atlas works without it */ }


  /* ---------- v15.7: quick check in the header, the Dependency Index in the opening screen ---------- */
  function headerAndBadge() {
    const tour = document.getElementById("nav-tour");
    if (tour && !document.getElementById("nav-check")) {
      const a = document.createElement("a"); a.id = "nav-check"; a.className = "btn small"; a.href = "#check"; a.textContent = T("Quick check", "Rychlá kontrola");
      tour.before(a); tour.hidden = false; tour.style.display = ""; tour.textContent = T("Take the tour", "Prohlídka");
      const list = document.getElementById("sec-list"), tpl = list && list.querySelector("li");
      if (tpl && !list.querySelector("a[data-tour]")) {
        const li = tpl.cloneNode(true), x = li.querySelector("a"), sp = x.querySelectorAll("span");
        x.href = "#tour"; x.setAttribute("data-tour", "1"); x.removeAttribute("data-sec"); x.setAttribute("aria-current", "false");
        const pres = document.getElementById("nav-present");
        if (sp[1]) sp[1].textContent = T("Present (full screen)", "Prezentace (celá obrazovka)");
        if (pres) { pres.hidden = true; pres.style.display = "none"; x.addEventListener("click", (ev) => { ev.preventDefault(); pres.click(); }); } else li.hidden = true;
        list.appendChild(li);
      }
    }
    const copy = document.getElementById("hero-copy");
    if (!copy) return;
    /* the page carries an invisible badge (.idx-wait) that keeps its place, so filling it moves nothing */
    let badge = copy.querySelector(".idx-badge");
    if (!badge) { badge = document.createElement("a"); badge.className = "idx-badge"; badge.href = "p/dependency-index.html"; badge.hidden = true; copy.insertBefore(badge, copy.firstChild); }
    const calc = () => {
      const mats = (O.LIVE.trade && O.LIVE.trade.materials) || null; if (!mats) return false;
      const per = {};
      Object.keys(mats).forEach((m) => (mats[m] || []).forEach((r) => {
        const mo = r.monthly || {}, f = mo.from, cn = mo.cn || [], ext = mo.ext || []; if (!f) return;
        const y0 = +f.slice(0, 4), m0 = +f.slice(5, 7);
        for (let i = 0; i < Math.min(cn.length, ext.length); i++) {
          const k = (y0 + Math.floor((m0 - 1 + i) / 12)) + "-" + String(((m0 - 1 + i) % 12) + 1).padStart(2, "0");
          const a = ((per[k] = per[k] || {})[m] = per[k][m] || [0, 0]); a[0] += +cn[i] || 0; a[1] += +ext[i] || 0;
        }
      }));
      const ks = Object.keys(per).sort().filter((k) => Object.values(per[k]).filter((v) => v[1] > 0).length >= 8);
      if (!ks.length) return false;
      const k = ks[ks.length - 1], sh = Object.values(per[k]).filter((v) => v[1] > 0).map((v) => v[0] / v[1]);
      const v = Math.round(100 * sh.reduce((a, b) => a + b, 0) / sh.length);
      const mon = new Date(+k.slice(0, 4), +k.slice(5, 7) - 1, 15).toLocaleDateString(O.LANG === "cs" ? "cs-CZ" : "en-GB", { month: "short", year: "numeric" });
      badge.innerHTML = `<i></i>${T("Dependency Index", "Index závislosti")} <b>${v}%</b> <span>· ${esc(T("China's share of EU imports", "podíl Číny na dovozu do EU"))} · ${esc(mon)}</span>`;
      badge.hidden = false; badge.classList.remove("idx-wait"); badge.removeAttribute("aria-hidden"); badge.removeAttribute("tabindex"); return true;
    };
    let n = 0; const t = setInterval(() => { if (calc() || ++n > 30) clearInterval(t); }, 1000); calc();
  }
  try { headerAndBadge(); } catch (e) { /* the atlas works without it */ }


  /* ---------- v15.8: a calmer site panel: four views up front, the rest under "More" ---------- */
  function simplifyPanel() {
    const drawer = document.querySelector(".drawer");
    if (!drawer || !window.MutationObserver) return;
    const FOLD = /time-?lapse|časosběr|^minerals|minerál|the\s+ore|^ruda/i;        // folded by name, in English and Czech
    let busy = false;
    const apply = () => {
      if (busy) return;
      const tabs = [...drawer.querySelectorAll('[role="tab"]')];
      if (tabs.length < 6) return;
      const row = tabs[0].parentNode;
      busy = true;
      row.dataset.simple = "1";
      tabs.forEach((t) => { const name = (t.getAttribute("aria-label") || t.textContent || "").trim(); const f = FOLD.test(name) && t.getAttribute("aria-selected") !== "true"; if (f !== t.classList.contains("vt-folded")) t.classList.toggle("vt-folded", f); });
      if (!row.querySelector(".vt-more")) {
        const more = document.createElement("button");
        more.type = "button"; more.className = "vt-more"; more.setAttribute("aria-expanded", "false");
        more.textContent = T("More", "Další");
        more.title = T("Time-lapse, minerals and the ore", "Časosběr, minerály a ruda");
        more.addEventListener("click", (ev) => {
          ev.stopPropagation();
          const open = row.classList.toggle("vt-open");
          more.setAttribute("aria-expanded", String(open)); more.textContent = open ? T("Less", "Méně") : T("More", "Další");
          try { if (O.SND && O.SND.on) O.SND.tick(); } catch (e) {}
        });
        const fly = row.querySelector(".vt-fly");
        if (fly) fly.before(more); else row.appendChild(more);
      }
      busy = false;
    };
    new MutationObserver(() => setTimeout(apply, 30)).observe(drawer, { childList: true, subtree: true });
    apply();
  }
  try { simplifyPanel(); } catch (e) { /* the atlas works without it */ }

  localiseStatic();
  load();
  render();
  renderTeams();
  renderImprint();
})();
