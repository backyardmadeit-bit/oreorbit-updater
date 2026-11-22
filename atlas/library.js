/* OreOrbit readable pages: copy a citation, download a chart. The pages work without this file. */
(function () {
  function ooHit(e){try{if(navigator.doNotTrack==="1"||navigator.globalPrivacyControl)return;var u="https://bohemiadefense.com/atlas/count.php?e="+encodeURIComponent(e);if(navigator.sendBeacon)navigator.sendBeacon(u);else fetch(u,{method:"POST",mode:"no-cors",keepalive:true});}catch(x){}}
  document.addEventListener("click",function(ev){var a=ev.target.closest&&ev.target.closest("a,button");if(!a)return;var h=a.getAttribute("href")||"";if(/^mailto:/.test(h))ooHit("act:mail");else if(/sample-assessment/.test(h))ooHit("act:sample");else if(/services(-cs)?\.html/.test(h))ooHit("act:services");else if(/linkedin\.com/.test(h))ooHit("act:linkedin");else if(a.id==="nav-tour")ooHit("act:tour");},true);
  var pg = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 34); ooHit("lib:" + (pg || "index"));
  document.querySelectorAll("button.copy").forEach(function (b) {
    b.hidden = false;
    b.addEventListener("click", function () {
      ooHit(/iframe/.test(b.getAttribute("data-copy") || "") ? "act:embed-copy" : "act:copy");
      var t = b.getAttribute("data-copy"), lbl = b.getAttribute("data-label") || "Copy citation", fin = b.getAttribute("data-done") || "Citation copied", done = function () { b.textContent = fin; setTimeout(function () { b.textContent = lbl; }, 2200); };
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, function () {}); else { var a = document.createElement("textarea"); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand("copy"); done(); } catch (e) {} a.remove(); }
    });
  });
  document.querySelectorAll("button.dl").forEach(function (b) {
    if (!b.parentNode.querySelector("svg.chart")) return;
    b.hidden = false;
    b.addEventListener("click", function () {
      ooHit("act:chart-svg");
      var svg = b.parentNode.querySelector("svg.chart"), c = svg.cloneNode(true);
      c.removeAttribute("tabindex");
      c.querySelectorAll(".ix-hover,.ix-hit").forEach(function (n) { n.remove(); });
      c.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      var st = document.createElementNS("http://www.w3.org/2000/svg", "style");
      st.textContent = "text{font:500 14px Helvetica,Arial,sans-serif;fill:#111}.c-l{fill:#555}.c-v{font-weight:700}.c-n{fill:#777;font-size:13px}.c-x{fill:#777;font-size:11px}.c-track{fill:#e8e8e4}";
      c.insertBefore(st, c.firstChild);
      var vb = (c.getAttribute("viewBox") || "0 0 640 200").split(" ");
      var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.setAttribute("x", "0"); t.setAttribute("y", String(+vb[3] - 2)); t.setAttribute("class", "c-x"); t.textContent = "Source: OreOrbit (Bohemia Defense), " + location.href.split("#")[0];
      c.setAttribute("viewBox", vb[0] + " " + vb[1] + " " + vb[2] + " " + (+vb[3] + 18)); t.setAttribute("y", String(+vb[3] + 14));
      c.appendChild(t);
      var blob = new Blob([new XMLSerializer().serializeToString(c)], { type: "image/svg+xml" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = (svg.getAttribute("data-name") || "oreorbit-chart") + ".svg";
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 3000);
    });
  });
  /* Dependency Index: interactive chart (mineral chips, reading on hover, tap or arrow keys) and clickable mineral rows. */
  document.querySelectorAll("figure.ix[data-ix]").forEach(function (fig) {
    var d; try { d = JSON.parse(fig.getAttribute("data-ix")); } catch (x) { return; }
    var cs = d.lang === "cs", n = d.m.length, sel = null, cur = n - 1, NS = "http://www.w3.org/2000/svg";
    var W = 640, H = 220, top = 14, left = 34, chips = fig.querySelector(".ix-chips"), out = fig.querySelector(".ix-read");
    if (n < 2 || !chips || !out) return;
    var pct = function (v) { return v == null ? "–" : (Math.round(v) + (cs ? " %" : "%")); };
    var mon = function (i) { var m = d.m[i]; return d.mon[+m.slice(5, 7) - 1] + " " + m.slice(0, 4); };
    var el = function (t, a, txt) { var x = document.createElementNS(NS, t); for (var k in a) x.setAttribute(k, a[k]); if (txt != null) x.textContent = txt; return x; };
    var lo, hi, X = function (i) { return left + (W - left - 10) * i / (n - 1); }, Y = function (v) { return top + (H - top - 26) * (1 - (v - lo) / ((hi - lo) || 1)); };
    function line(vals, a) { var p = []; vals.forEach(function (v, i) { if (v != null) p.push(X(i).toFixed(1) + "," + Y(v).toFixed(1)); }); if (p.length > 1) { a.points = p.join(" "); a.fill = "none"; return el("polyline", a); } return null; }
    function draw() {
      var old = fig.querySelector("svg.chart"), s = el("svg", { "class": "chart", viewBox: "0 0 " + W + " " + H, role: "img", tabindex: "0", "data-name": old ? old.getAttribute("data-name") : "oreorbit-dependency-index",
        "aria-label": (cs ? "Index závislosti OreOrbit po měsících" : "OreOrbit Dependency Index by month") + (sel ? " · " + d.nm[sel] : "") + (cs ? ". Šipkami vlevo a vpravo procházíte měsíce." : ". Use the left and right arrow keys to move between months.") });
      var shown = d.v.slice(); if (sel) shown = shown.concat(d.per[sel]); else shown = shown.concat(d.m1);
      shown = shown.filter(function (v) { return v != null; });
      lo = Math.max(0, Math.min.apply(null, shown) - 10); hi = Math.min(100, Math.max.apply(null, shown) + 10);
      for (var g = Math.ceil(lo / 10) * 10; g <= hi; g += 10) { s.appendChild(el("line", { x1: left, x2: W - 10, y1: Y(g).toFixed(1), y2: Y(g).toFixed(1), stroke: "rgba(236,238,233,.08)" })); s.appendChild(el("text", { x: 0, y: (Y(g) + 4).toFixed(1), "class": "c-x" }, g + "%")); }
      var a;
      if (!sel && (a = line(d.m1, { stroke: "rgba(236,238,233,.38)", "stroke-width": "1.5", "stroke-dasharray": "2 4", "stroke-linecap": "round", "stroke-linejoin": "round" }))) s.appendChild(a);
      if ((a = line(d.v, { stroke: "#3ddc97", "stroke-width": "2.5", "stroke-linejoin": "round", opacity: sel ? ".45" : "1" }))) s.appendChild(a);
      if (sel && (a = line(d.per[sel], { stroke: d.col[sel], "stroke-width": "2.5", "stroke-linejoin": "round" }))) s.appendChild(a);
      d.m.forEach(function (m, i) { if (/-01$/.test(m) || i === n - 1) s.appendChild(el("text", i === n - 1 ? { x: X(i).toFixed(1), y: H - 6, "class": "c-x", "text-anchor": "end" } : { x: (X(i) - 14).toFixed(1), y: H - 6, "class": "c-x" }, d.ms[+m.slice(5, 7) - 1] + " " + m.slice(2, 4))); });
      s.appendChild(el("g", { "class": "ix-hover" }));
      s.appendChild(el("rect", { "class": "ix-hit", x: left, y: 0, width: W - left, height: H, fill: "transparent" }));
      if (old) old.replaceWith(s); else fig.insertBefore(s, fig.firstChild);
      function at(ev) { var r = s.getBoundingClientRect(), x = (ev.clientX - r.left) * W / r.width; cur = Math.max(0, Math.min(n - 1, Math.round((x - left) / ((W - left - 10) / (n - 1))))); hover(); }
      s.addEventListener("pointermove", at); s.addEventListener("pointerdown", at);
      s.addEventListener("pointerleave", function (ev) { if (ev.pointerType === "mouse") { cur = n - 1; hover(); } });
      s.addEventListener("keydown", function (ev) { var k = ev.key; if (k === "ArrowLeft" || k === "ArrowRight" || k === "Home" || k === "End") { ev.preventDefault(); cur = k === "Home" ? 0 : k === "End" ? n - 1 : Math.max(0, Math.min(n - 1, cur + (k === "ArrowRight" ? 1 : -1))); hover(); } });
      hover();
    }
    function hover() {
      var s = fig.querySelector("svg.chart"), h = s.querySelector(".ix-hover"), x = X(cur).toFixed(1);
      while (h.firstChild) h.removeChild(h.firstChild);
      h.appendChild(el("line", { x1: x, x2: x, y1: top, y2: H - 26, stroke: "rgba(236,238,233,.35)", "stroke-width": "1" }));
      [[d.v[cur], "#3ddc97"], [sel ? d.per[sel][cur] : null, sel ? d.col[sel] : ""]].forEach(function (p) { if (p[0] != null) h.appendChild(el("circle", { cx: x, cy: Y(p[0]).toFixed(1), r: 5, fill: p[1], stroke: "#050607", "stroke-width": "2" })); });
      var t = mon(cur) + ": index " + pct(d.v[cur]);
      if (sel) t = mon(cur) + ": " + d.nm[sel] + " " + pct(d.per[sel][cur]) + (cs ? " z Číny · index " : " from China · index ") + pct(d.v[cur]);
      else if (d.m1[cur] != null) t += (cs ? " · jen tento měsíc " : " · single month ") + pct(d.m1[cur]);
      out.textContent = t;
    }
    function pick(m, src) {
      sel = (m && m !== sel) ? m : null;
      chips.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String((b.getAttribute("data-m") || null) === sel)); });
      document.querySelectorAll("ul.idx li[data-m]").forEach(function (li) { var on = li.getAttribute("data-m") === sel; li.classList.toggle("on", on); li.setAttribute("aria-pressed", String(on)); });
      draw(); ooHit("act:ix-" + (sel || "all"));
      if (src === "row") { var r = fig.getBoundingClientRect(); if (r.top < 0 || r.bottom > innerHeight) fig.scrollIntoView({ behavior: "smooth", block: "center" }); }
    }
    var mk = function (m, label) { var b = document.createElement("button"); b.type = "button"; if (m) { b.setAttribute("data-m", m); b.style.setProperty("--c", d.col[m]); } b.setAttribute("aria-pressed", String(!m)); b.textContent = label; b.addEventListener("click", function () { pick(m, "chip"); }); chips.appendChild(b); };
    mk(null, cs ? "Jen index" : "Index only");
    Object.keys(d.nm).forEach(function (m) { mk(m, d.nm[m]); });
    chips.setAttribute("role", "group"); chips.setAttribute("aria-label", cs ? "Ukázat surovinu v grafu" : "Show a mineral on the chart"); chips.hidden = false;
    document.querySelectorAll("ul.idx li[data-m]").forEach(function (li) {
      li.tabIndex = 0; li.setAttribute("role", "button"); li.setAttribute("aria-pressed", "false"); li.title = cs ? "Ukázat v grafu" : "Show on the chart";
      li.addEventListener("click", function () { pick(li.getAttribute("data-m"), "row"); });
      li.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); pick(li.getAttribute("data-m"), "row"); } });
    });
    draw();
  });
})();
