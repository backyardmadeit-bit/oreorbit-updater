# WordPress (bohemiadefense.com): úpravy z 6. 11. 2026

## Nejjednodušší cesta: celý kód úvodní stránky

Obě úvodní stránky jsou v **Elementoru** (EN stránka 5581, CS stránka 6312), kód je ve widgetu **HTML**.

1. Otevři [EN v Elementoru](https://bohemiadefense.com/wp-admin/post.php?post=5581&action=elementor), klikni na widget HTML, v poli s kódem dej Cmd+A a vlož celý obsah souboru [`home-en.html`](home-en.html).
2. Totéž pro [CS v Elementoru](https://bohemiadefense.com/wp-admin/post.php?post=6312&action=elementor) se souborem [`home-cs.html`](home-cs.html).
3. **Aktualizovat**, pak Elementor → Nástroje → Regenerovat soubory a data a W3 Total Cache → Purge All Caches.

Soubory vznikly z kódu, který na webu běžel 6. 11., a obsahují všechny změny níže (texty tarifů, 12 tónů, nový obrázek OreOrbit) a navíc: obrázky v původní podobě (W3 Total Cache je při vykreslení přepisoval na líné načítání), opravené počítání kliků na služby a LinkedIn a v CS „94 % Čína“ s mezerou. Mapa se nemění: všech 14 evropských lokalit z atlasu na ní už je.

Pasáže „najdi a nahraď“ níže platí jen pro ruční úpravu místo vložení celého kódu.

WordPress nemá Claude přístup, proto jsou tu přesné pasáže k ručnímu vložení. Každý text pod „Najdi“ je na stránce právě jednou (ověřeno na živém HTML).

## 0. Obrázek OreOrbit

Nic nedělej. Homepage bere obrázek z `https://madali.cz/oreorbit.jpg`; po merge PR v repu madali.cz se změní sám.

## 1. Stránka `home` (EN): blok Custom HTML

Otevři stránku v editoru, vyber blok Custom HTML (kód stránky), v něm hledej (Cmd+F) a nahrazuj:

**1.** Najdi:

```
With your email, also the Monday brief for your minerals and the full evidence data.
```

Nahraď:

```
With your email, also the Monday brief for your minerals and all live-data panels in full.
```

**2.** Najdi:

```
Deadline reminders 30, 14 and 7 days ahead, and a personal Monday edition for your minerals.
```

Nahraď:

```
A personal Monday edition, deadline reminders 30, 14 and 7 days ahead, alerts when a site for your minerals goes quiet, starts up or shows a sulphur dioxide spike, and every Monday a data file (CSV) with the history behind it.
```

**3.** Najdi:

```
Monitoring starts with your email;
```

Nahraď:

```
Monitoring starts on the atlas: choose your minerals and pay by card;
```

**4.** Najdi:

```
ORDER = ["ree", "ti", "w", "sb", "ga", "ge", "li", "co", "ni", "gr"]
```

Nahraď:

```
ORDER = ["ree", "ti", "w", "sb", "mg", "mn", "ga", "ge", "li", "co", "ni", "gr"]
```

**5.** Najdi:

```
PENT = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22]
```

Nahraď:

```
PENT = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24, 27]
```

## 2. Stránka `cs` (CZ): blok Custom HTML

**1.** Najdi:

```
plná data důkazů.
```

Nahraď:

```
všechny panely živých dat v&nbsp;plném rozsahu.
```

**2.** Najdi:

```
osobní pondělní vydání pro vaše suroviny.
```

Nahraď:

```
osobní pondělní vydání pro vaše suroviny, upozornění, když lokalita vašich surovin ztichne, rozjede se nebo u&nbsp;ní vyskočí oxid siřičitý, a&nbsp;každé pondělí datový soubor (CSV) s&nbsp;historií.
```

**3.** Najdi:

```
Monitoring začíná e-mailem,
```

Nahraď:

```
Monitoring spustíte v&nbsp;atlasu výběrem surovin a&nbsp;platbou kartou,
```

**4.** Najdi:

```
ORDER = ["ree", "ti", "w", "sb", "ga", "ge", "li", "co", "ni", "gr"]
```

Nahraď:

```
ORDER = ["ree", "ti", "w", "sb", "mg", "mn", "ga", "ge", "li", "co", "ni", "gr"]
```

**5.** Najdi:

```
PENT = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22]
```

Nahraď:

```
PENT = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24, 27]
```

`&nbsp;` je úmyslně: je to nedělitelná mezera po jednopísmenném slově.

## 3. Strukturovaná data pro Google (celý web)

Na všech stránkách (home, cs, david-madali, david-madali-cz) je stejný blok `<script type="application/ld+json">`, který uvádí **Monitoring za 390 EUR** a OreOrbit jako atlas **„ten critical minerals“**. Není to Rank Math (ten má `class="rank-math-schema"`); je vložený ručně, nejspíš v pluginu pro kód v hlavičce/patičce (WPCode / Insert Headers and Footers) nebo v nastavení šablony.

1. Najdi ten blok: hledej text `"price": "390"`.
2. Nahraď **celý** blok od `<script type="application/ld+json">` po `</script>` obsahem souboru [`jsonld-sitewide.html`](jsonld-sitewide.html).

Změny v bloku: Monitoring `49` EUR; OreOrbit „twelve critical minerals“; u Readiness review je cena vypuštěná (4 900 € už neplatí, potvrzeno 6. 11.); vypuštěné `alumniOf` (univerzita: pravidlo „never mention the Ing. studies“); do oborů přibyly Magnesium a Manganese.

## 4. Po uložení

- W3 Total Cache → **Performance → Purge All Caches**.
- Napiš Claudovi „zkontroluj WordPress“: stáhne stránky a ověří všechny změny.
- Volitelně: [Rich Results Test](https://search.google.com/test/rich-results) na `https://bohemiadefense.com/`.
