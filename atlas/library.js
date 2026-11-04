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
    var svg = b.parentNode.querySelector("svg.chart");
    if (!svg) return;
    b.hidden = false;
    b.addEventListener("click", function () {
      ooHit("act:chart-svg");
      var c = svg.cloneNode(true);
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
})();
