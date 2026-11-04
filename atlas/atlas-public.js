/* Public copy of Critical Minerals from Orbit.
   The claude.ai version keeps its live data in an Artifact database. This copy reads the same
   documents from JSON files next to the page (live-data/), which the scheduled update refreshes.
   Everything here is read-only: nothing a visitor does is sent anywhere. */
(function () {
  "use strict";
  window.ATLAS_PUBLIC = true;
  var CFG = window.ATLAS_CONFIG || {};
  var BASE = CFG.dataBase || "live-data/";
  var EVERY = Math.max(2, +CFG.refreshMinutes || 10) * 60000;

  // ?lang=cs or ?lang=en picks the language (for a Czech and an English page on the same site)
  try {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "cs" || q === "en") {
      try { localStorage.setItem("cma-lang", q); } catch (e) { /* storage blocked */ }
      try { window.name = (window.name || "").replace(/(?:^|;)cma-lang=(cs|en)/g, "") + ";cma-lang=" + q; } catch (e) { /* ignore */ }
    }
  } catch (e) { /* old browser */ }

  // documents this copy never has (weather, UN Comtrade, the ship cache and the private board packs)
  var ABSENT = /^(live\/(conditions|cnexports|shipcache)|packs\/.*|team\/.*|data\/users\/.*)$/;
  var COLLECTIONS = /^(news|briefs|watch|memory)$/;

  function fileUrl(path) { return BASE + path + ".json?v=" + Math.floor(Date.now() / EVERY); }
  function load(path) {
    if (ABSENT.test(path)) return Promise.resolve(null);
    return fetch(fileUrl(path), { cache: "no-cache" }).then(function (r) {
      if (r.status === 404) return null;
      if (!r.ok) throw Object.assign(new Error("HTTP " + r.status), { code: "unavailable" });
      return r.text();
    });
  }
  function parse(t) { if (t == null) return null; try { return JSON.parse(t); } catch (e) { return null; } }
  function copy(o) { return o == null ? undefined : JSON.parse(JSON.stringify(o)); }
  function readOnly() { return Promise.reject(Object.assign(new Error("This public copy of the atlas is read-only."), { code: "not_granted" })); }

  var pollers = [];
  setInterval(function () { if (!document.hidden) pollers.forEach(function (p) { p(); }); }, EVERY);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && Date.now() - (window.__atlasLastPoll || 0) > EVERY) pollers.forEach(function (p) { p(); });
  });

  function snapDoc(id, obj) { return { id: id, exists: obj != null, data: function () { return copy(obj); } }; }
  function watch(path, onText, onError) {
    var last, stopped = false;
    function run() {
      window.__atlasLastPoll = Date.now();
      load(path).then(function (t) {
        if (stopped || t === last) return;
        last = t;
        onText(t);
      }).catch(function (e) { if (last === undefined && onError) onError(e); });
    }
    run();
    pollers.push(run);
    return function () { stopped = true; };
  }

  function doc(path) {
    var id = path.split("/").pop();
    return {
      id: id,
      get: function () { return load(path).then(function (t) { return snapDoc(id, parse(t)); }); },
      onSnapshot: function (cb, err) { return watch(path, function (t) { cb(snapDoc(id, parse(t))); }, err); },
      set: readOnly, update: readOnly, delete: readOnly
    };
  }

  function collection(name) {
    var order = null, dir = "asc", lim = null;
    function shape(t) {
      var arr = parse(t);
      if (!Array.isArray(arr)) arr = [];
      arr = arr.filter(function (x) { return x && typeof x === "object" && x.id; });
      if (order) arr.sort(function (a, b) { var x = a[order], y = b[order]; return (x < y ? -1 : x > y ? 1 : 0) * (dir === "desc" ? -1 : 1); });
      if (lim) arr = arr.slice(0, lim);
      var docs = arr.map(function (x) { return { id: String(x.id), exists: true, data: function () { return copy(x); } }; });
      return { docs: docs, size: docs.length, empty: !docs.length };
    }
    var api = {
      orderBy: function (f, d) { order = f; dir = d || "asc"; return api; },
      limit: function (n) { lim = n; return api; },
      where: function () { return api; },
      doc: function (id) { return doc(name + "/" + id); },
      get: function () { return COLLECTIONS.test(name) ? load(name).then(shape) : readOnly(); },
      onSnapshot: function (cb, err) {
        if (!COLLECTIONS.test(name)) {
          // the team watchlist and anything else private: not part of the public copy
          setTimeout(function () { if (err) err(Object.assign(new Error("not in the public copy"), { code: "not_granted" })); }, 0);
          return function () {};
        }
        return watch(name, function (t) { cb(shape(t)); }, err);
      }
    };
    return api;
  }

  var db = { doc: doc, collection: collection };

  // files the page offers (share cards, one-page briefs, slides) are saved with an ordinary browser download
  var downloads = {
    save: function (o) {
      return new Promise(function (resolve, reject) {
        try {
          var blob = o.data instanceof Blob ? o.data : new Blob([o.data]);
          var href = URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = href; a.download = o.filename || "download"; a.rel = "noopener"; a.style.display = "none";
          document.body.appendChild(a); a.click();
          setTimeout(function () { URL.revokeObjectURL(href); a.remove(); }, 5000);
          resolve({ status: "saved" });
        } catch (e) { reject(Object.assign(e, { code: "failed" })); }
      });
    }
  };

  // Claude (Ask the atlas, reading parts lists) and comments exist only in the claude.ai version
  window.claude = {
    use: function (name) { return Promise.resolve(name === "db" ? db : name === "downloads" ? downloads : null); }
  };
})();
