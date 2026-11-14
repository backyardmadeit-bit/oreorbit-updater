
(() => {
"use strict";
/* ================= language: English or Czech =================
   The page is written in English. In Czech, every text node and label is
   translated as it appears: exact strings from CS, then the patterns below for
   text that carries live numbers, then Czech number and date formatting. */
const CS = {"Sections": "Sekce", "Loading the globe": "Načítám glóbus", "Data health": "Stav dat", "Is the data fresh?": "Jsou data čerstvá?", "Every feed on this page, when it last arrived and when the next one is due. A feed that fails keeps its last good data on the page, marked with its age.": "Každý zdroj na této stránce: kdy naposledy dorazil a kdy má přijít další. Zdroj, který selže, nechává na stránce poslední dobrá data s uvedeným stářím.", "Time-lapse": "Časosběr", "Minerals": "Minerály", "Fly in": "Vletět", "Sound": "Zvuk", "Since 1986: Landsat 4, 5, 7, 8 and 9 surface reflectance, about one clear picture every four years, through Microsoft Planetary Computer. Minerals: NASA's EMIT imaging spectrometer on the International Space Station, mineral identification at 60 m for bare ground only, with vegetation and water masked using Sentinel-2. It shows minerals at the surface, not ore at depth.": "Od roku 1986: povrchová odrazivost Landsatu 4, 5, 7, 8 a 9, zhruba jeden jasný snímek za čtyři roky, přes Microsoft Planetary Computer. Minerály: zobrazovací spektrometr NASA EMIT na Mezinárodní vesmírné stanici, identifikace minerálů s pixelem 60 m jen na holé zemi, vegetace a voda maskovány Sentinelem-2. Ukazuje minerály na povrchu, ne rudu v hloubce.", "Ships: AIS positions from AISStream.io near chokepoints and ports every three hours, moved on along their reported course and speed for up to an hour; the 3D models are typical of the AIS ship type, not the ship itself. Status trends compare with a weekly snapshot kept every Monday. The Strait of Malacca detour is an atlas estimate from its own sea-lane waypoints.": "Lodě: polohy z AIS od AISStream.io u úžin a přístavů každé tři hodiny, posouvané podle hlášeného kurzu a rychlosti nejvýš hodinu; 3D modely odpovídají typu lodi v AIS, ne konkrétní lodi. Trendy stavu se porovnávají s týdenním snímkem, který se ukládá každé pondělí. Objížďka Malackého průlivu je odhad atlasu z vlastních bodů námořních tras.", "NASA JPL: EMIT mission": "NASA JPL: mise EMIT", "NASA Earthdata: EMIT mineral identification (L2B)": "NASA Earthdata: identifikace minerálů EMIT (L2B)", "Microsoft Planetary Computer: Landsat": "Microsoft Planetary Computer: Landsat", "AISStream.io: live AIS": "AISStream.io: živé AIS", "US EIA: the Strait of Malacca": "US EIA: Malacký průliv", "Forty years of Landsat at every mine, surface minerals from NASA's EMIT, real ships in 3D that keep moving between reports, a sections menu, trend arrows against a weekly memory, a seven-slide Monday board pack built every week, stress tests for several materials and the Strait of Malacca, European capacity against imports, a data health panel, sound, sharper clouds and a new night sky. Fixed: the vegetation-loss maps used the wrong reflectance offset for newer Sentinel-2 scenes.": "Čtyřicet let Landsatu u každého dolu, povrchové minerály z NASA EMIT, skutečné lodě ve 3D, které se pohybují i mezi hlášeními, menu sekcí, šipky trendu proti týdenní paměti, sedmistránkové pondělní podklady sestavované každý týden, zátěžové testy pro více surovin a Malacký průliv, evropská kapacita proti dovozu, panel stavu dat, zvuk, ostřejší mraky a nová noční obloha. Opraveno: mapy úbytku vegetace používaly u novějších snímků Sentinelu-2 špatný posun odrazivosti.", "Pick the materials you answer for. Each one gets a status, what changed in the last seven days and its next deadline, and the whole view turns into a seven-slide board pack, also built for you every Monday morning.": "Vyberte suroviny, za které odpovídáte. Každá dostane stav, přehled změn za posledních sedm dní a nejbližší termín a celý pohled se promění v sedm snímků pro vedení, které se pro vás sestaví i každé pondělí ráno.", "Stop one or several materials, close the Red Sea or the Strait of Malacca, for as long as you choose. See the EU imports at stake, the systems that lose a material, the alternatives that exist today and the deadlines that fall inside the window. No price forecasts.": "Zastavte jednu nebo více surovin, uzavřete Rudé moře nebo Malacký průliv, na tak dlouho, jak zvolíte. Uvidíte ohrožený dovoz do EU, systémy, které o surovinu přijdou, alternativy, které dnes existují, a termíny, které do okna spadnou. Bez předpovědí cen.", "Position approximate. Much of the vegetation lost since 2018 lies on the hills away from the mine workings.": "Poloha přibližná. Velká část úbytku vegetace od roku 2018 leží na kopcích mimo důlní provozy.", "Position approximate. Much of the vegetation lost since 2018 lies on the hills away from the mine workings": "Poloha přibližná. Velká část úbytku vegetace od roku 2018 leží na kopcích mimo důlní provozy", "This week": "Tento týden", "Exposure": "Expozice", "Stress test": "Zátěžový test", "2030 targets": "Cíle 2030", "Present": "Prezentovat", "Your Monday morning.": "Vaše pondělní ráno.", "Pick the materials you answer for. Each one gets a status, what changed in the last seven days and its next deadline, and the whole view turns into a five-slide board pack.": "Vyberte suroviny, za které odpovídáte. Každá dostane stav, přehled změn za posledních sedm dní a nejbližší termín a celý pohled se promění v pět snímků pro vedení.", "Your materials": "Vaše suroviny", "From the mine to the missile.": "Od dolu ke střele.", "Pick a system or paste a parts list. See every stage between the ground and the finished part, how concentrated each one is, and where the chain breaks first.": "Vyberte systém nebo vložte seznam dílů. Uvidíte každou fázi od ložiska po hotový díl, jak je koncentrovaná a kde se řetězec láme nejdřív.", "Mine to missile": "Od dolu ke střele", "Compare two materials": "Porovnat dvě suroviny", "Stress-test the supply.": "Zátěžový test dodávek.", "Combine a stop in supply with a closed Red Sea, for as long as you choose. See the EU imports at stake, the systems that lose a material, the alternatives that exist today and the deadlines that fall inside the window. No price forecasts.": "Zkombinujte zastavení dodávek s uzavřeným Rudým mořem, na tak dlouho, jak zvolíte. Uvidíte ohrožený dovoz do EU, systémy, které o surovinu přijdou, alternativy, které dnes existují, a termíny, které do okna spadnou. Bez předpovědí cen.", "Clouds today": "Dnešní oblačnost", "NASA VIIRS, yesterday. Snow and salt flats show white too": "NASA VIIRS, včera. Bíle se ukazuje i sníh a solné pláně", "Typical sea lanes; dots grow with tonnage, ships are illustrative": "Typické námořní trasy; tečky rostou s tonáží, lodě jsou ilustrační", "Since 2017": "Od roku 2017", "Radar": "Radar", "Heat": "Teplo", "Mine images: Copernicus Sentinel-2, found through Earth Search by Element 84 and Microsoft Planetary Computer, with one clear picture a year since 2017 for the time-lapses. Radar: Sentinel-1, terrain-corrected. Heat: Landsat 8 and 9 surface temperature. Both come through Microsoft Planetary Computer. 3D terrain: Copernicus DEM GLO-30, from TanDEM-X radar data of 2011 to 2015, so it predates recent digging. Globe imagery: NASA Blue Marble and Black Marble; clouds: yesterday's NASA VIIRS true-colour mosaic.": "Snímky dolů: Copernicus Sentinel-2, vyhledané přes Earth Search od Element 84 a Microsoft Planetary Computer, pro časosběry jeden jasný snímek ročně od roku 2017. Radar: Sentinel-1, terénně korigovaný. Teplo: povrchová teplota z Landsatu 8 a 9. Obojí přes Microsoft Planetary Computer. 3D terén: Copernicus DEM GLO-30 z radarových dat TanDEM-X z let 2011 až 2015, takže předchází nedávné těžbě. Snímky glóbu: NASA Blue Marble a Black Marble; mraky: včerejší mozaika NASA VIIRS ve skutečných barvách.", "Heat and gas: NASA VIIRS 375 m thermal anomalies every day and Sentinel-5P sulphur dioxide every week (NOAA-20 OMPS when Sentinel-5P is unavailable), both read from NASA GIBS map tiles. Trade: Eurostat Comext for EU imports, and UN Comtrade for what the United States, Japan, South Korea and India import from China. The stress test scales last year's imports by the months chosen; it does not forecast prices.": "Teplo a plyny: tepelné anomálie NASA VIIRS 375 m denně a oxid siřičitý ze Sentinelu-5P týdně (z družice NOAA-20, když Sentinel-5P není k dispozici), obojí odečtené z mapových dlaždic NASA GIBS. Obchod: Eurostat Comext pro dovoz do EU a UN Comtrade pro to, co USA, Japonsko, Jižní Korea a Indie dovážejí z Číny. Zátěžový test násobí loňský dovoz zvoleným počtem měsíců; ceny nepředpovídá.", "UN Comtrade: monthly trade with China": "UN Comtrade: měsíční obchod s Čínou", "European Commission: CRM study 2023 (recycling rates)": "Evropská komise: studie o kritických surovinách 2023 (míra recyklace)", "EU strategic projects, March 2025": "Strategické projekty EU, březen 2025", "Port Economics: Shanghai to Rotterdam routes": "Port Economics: trasy Šanghaj–Rotterdam", "Microsoft Planetary Computer: Sentinel-1 and Landsat": "Microsoft Planetary Computer: Sentinel-1 a Landsat", "Copernicus DEM GLO-30": "Copernicus DEM GLO-30", "NASA GIBS: VIIRS and TROPOMI layers": "NASA GIBS: vrstvy VIIRS a TROPOMI", "Your Monday morning with a five-slide board pack, mine-to-missile exposure, stress tests, the gap to 2030, compare and presentation modes. From orbit: mine time-lapses since 2017, radar through cloud, heat at the plants, sulphur dioxide over smelters, today's clouds and sharper 3D terrain. Trade: China's exports as the buyers report them, and cargo dots sized by tonnage.": "Pondělní ráno s pěti snímky pro vedení, expozice od dolu ke střele, zátěžové testy, mezera do roku 2030, srovnání a prezentace. Z oběžné dráhy: časosběry dolů od roku 2017, radar skrz mraky, teplo v závodech, oxid siřičitý nad hutěmi, dnešní mraky a ostřejší 3D terén. Obchod: vývoz Číny podle hlášení kupců a tečky nákladu podle tonáže.", "Disruptions": "Výpadky", "Critical Minerals from Orbit": "Kritické suroviny z oběžné dráhy", "Critical Minerals from Orbit, back to the top": "Kritické suroviny z oběžné dráhy, zpět nahoru", "Critical Minerals": "Kritické suroviny", "from Orbit": "z oběžné dráhy", "Atlas": "Atlas", "Quiz": "Kvíz", "Scenarios": "Scénáře", "Briefing": "Přehled", "Chokepoints": "Úzká místa", "Method": "Metodika", "Take the": "Spustit", "tour": "prohlídku", "3D globe of critical-mineral mines, refineries and trade routes. Drag or use the arrow keys to turn it. In the atlas, plus and minus zoom.": "3D glóbus dolů, rafinerií a obchodních tras kritických surovin. Otáčejte jím tažením nebo šipkami. V atlasu přibližujte plusem a minusem.", "Rare earths · mine": "Vzácné zeminy · důl", "Lynas Advanced Materials Plant": "Závod Lynas Advanced Materials", "Rare earths · processing": "Vzácné zeminy · zpracování", "Sillamäe separation plant": "Separační závod Sillamäe", "Narva magnet plant": "Závod na magnety v Narvě", "Rare earths · magnets": "Vzácné zeminy · magnety", "Titanium · mine": "Titan · důl", "Tungsten · mine": "Wolfram · důl", "Ganzhou tungsten district": "Wolframový revír Kan-čou", "Antimony · mine": "Antimon · důl", "Stibnite Gold Project": "Projekt Stibnite Gold", "Antimony · planned": "Antimon · plánováno", "Metlen gallium project": "Galiový projekt Metlen", "Gallium · planned": "Galium · plánováno", "Germanium · processing": "Germanium · zpracování", "Germanium · mine": "Germanium · důl", "Lithium · mine": "Lithium · důl", "Lithium · planned": "Lithium · plánováno", "Cobalt · mine": "Kobalt · důl", "Kokkola cobalt refinery": "Kobaltová rafinerie Kokkola", "Cobalt · processing": "Kobalt · zpracování", "Norilsk": "Norilsk", "Nickel · mine": "Nikl · důl", "Nickel · processing": "Nikl · zpracování", "Graphite · mine": "Grafit · důl", "Graphite · planned": "Grafit · plánováno", "Australian spodumene to China": "Australský spodumen do Číny", "Chilean lithium to China": "Chilské lithium do Číny", "Congolese cobalt to China": "Konžský kobalt do Číny", "Lobito Corridor": "Lobitský koridor", "Indonesian nickel to China": "Indonéský nikl do Číny", "Mount Weld concentrate to Malaysia": "Koncentrát z Mount Weld do Malajsie", "China to Europe via Suez": "Z Číny do Evropy přes Suez", "Red Sea diversion via the Cape": "Objížďka Rudého moře kolem mysu Dobré naděje", "Mozambican graphite to Louisiana": "Mosambický grafit do Louisiany", "Strait of Malacca": "Malacký průliv", "Suez and Bab-el-Mandeb": "Suez a Bab al-Mandab", "Cape of Good Hope": "Mys Dobré naděje", "Supply-chain atlas · 43 sites · 11 trade routes": "Atlas dodavatelského řetězce · 43 lokalit · 11 obchodních tras", "Europe's defence runs on twelve minerals.": "Evropská obrana stojí na dvanácti surovinách.", "Explore the atlas": "Prozkoumat atlas", "Take the tour · 6 stops": "Prohlídka · 6 zastávek", "Back to the overview": "Zpět na přehled", "Overview": "Přehled", "Search mines, elements, systems and routes": "Hledat doly, prvky, systémy a trasy", "Search": "Hledat", "Ask the atlas a question": "Zeptat se atlasu", "Ask": "Zeptat se", "Layers": "Vrstvy", "Sites": "Lokality", "Mines, refineries and magnet plants": "Doly, rafinerie a závody na magnety", "Trade routes and ships": "Obchodní trasy a lodě", "Typical sea lanes; ships are illustrative": "Typické námořní trasy; lodě jsou ilustrační", "Production towers": "Sloupce produkce", "Output by country for the chosen element": "Produkce podle zemí pro zvolený prvek", "Malacca, Suez and the Cape": "Malacký průliv, Suez a mys Dobré naděje", "In the news": "Ve zprávách", "Sites in a story from the last 14 days": "Lokality ze zpráv za posledních 14 dní", "Satellites, live": "Satelity živě", "Real positions from public orbit data": "Skutečné polohy z veřejných dat o drahách", "Ships, live": "Lodě živě", "Real AIS positions near chokepoints and ports": "Skutečné polohy AIS u úzkých míst a přístavů", "Hazards, live": "Rizika živě", "Earthquakes M5+ and UN disaster alerts": "Zemětřesení M5+ a výstrahy OSN před katastrofami", "Live: satellites, hazards and feeds": "Živě: satelity, rizika a zdroje dat", "Live": "Živě", "Switch between real sunlight and even light": "Přepnout mezi skutečným osvětlením a rovnoměrným světlem", "Zoom out": "Oddálit", "Zoom in": "Přiblížit", "Browse by": "Procházet podle", "Elements": "Prvky", "Systems": "Systémy", "Rare earths, 94% CN": "Vzácné zeminy, 94 % CN", "Rare earths": "Vzácné zeminy", "Titanium, 70% CN": "Titan, 70 % CN", "Titanium": "Titan", "Tungsten, 79% CN": "Wolfram, 79 % CN", "Tungsten": "Wolfram", "Antimony, 36% CN": "Antimon, 36 % CN", "Antimony": "Antimon", "Gallium, 98% CN": "Galium, 98 % CN", "Gallium": "Galium", "Germanium, CN leads": "Germanium, vede Čína", "Germanium": "Germanium", "CN leads": "vede Čína", "Lithium, 70% CN": "Lithium, 70 % CN", "Lithium": "Lithium", "Cobalt, >75% CN": "Kobalt, >75 % CN", "Cobalt": "Kobalt", "Nickel, 67% ID": "Nikl, 67 % ID", "Nickel": "Nikl", "Graphite, 94% CN": "Grafit, 94 % CN", "Graphite": "Grafit", "Satellite": "Satelit", "6 materials": "6 surovin", "Drone": "Dron", "AESA radar": "Radar AESA", "1 material": "1 surovina", "Thermal sight": "Termovizní zaměřovač", "2 materials": "2 suroviny", "Ge CN leads": "Ge: vede Čína", "Jet engine": "Proudový motor", "4 materials": "4 suroviny", "Ammunition": "Munice", "Battery pack": "Bateriový modul", "Details": "Detail", "Close details": "Zavřít detail", "View": "Zobrazení", "From orbit": "Z orbitu", "Mine in 3D": "Důl ve 3D", "The ore": "Ruda", "Rotating 3D mineral specimen": "Otáčející se 3D model minerálu", "Drag to compare the older and the newest image": "Táhněte pro porovnání staršího a nejnovějšího snímku", "Change": "Změna", "Guided tour": "Prohlídka s průvodcem", "Exit tour": "Ukončit prohlídku", "Back": "Zpět", "Next": "Další", "Key figures": "Klíčová čísla", "of the world's primary gallium is made in China": "světového primárního galia se vyrábí v Číně", "of sintered rare-earth magnets are made in China": "slinutých magnetů ze vzácných zemin se vyrábí v Číně", "IEA, October 2025": "IEA, říjen 2025", "of battery-grade graphite is made in China": "bateriového grafitu se vyrábí v Číně", "of the world's cobalt is mined in the DR Congo": "světového kobaltu se těží v DR Kongo", "Test your instinct": "Vyzkoušejte svůj odhad", "Guess the share.": "Hádejte podíl.", "Five questions about who controls the supply. Drag to your best guess, then see the real figure and where it comes from.": "Pět otázek o tom, kdo ovládá dodávky. Posuvníkem nastavte svůj odhad a pak uvidíte skutečné číslo i jeho zdroj.", "Question 1 of 5": "Otázka 1 z 5", "What share of the world's primary gallium is made in China?": "Jaký podíl světového primárního galia se vyrábí v Číně?", "Your guess in percent": "Váš odhad v procentech", "Lock in 50%": "Potvrdit 50 %", "Your answers": "Vaše odpovědi", "What if supply stops?": "Co když se dodávky zastaví?", "Pick a disruption. See how much of world supply is at stake, which systems lose a material, and which sources outside that country exist on the atlas today.": "Vyberte výpadek. Uvidíte, jaká část světových dodávek je ohrožena, kterým systémům surovina chybí a jaké zdroje mimo danou zemi atlas dnes ukazuje.", "China stops exporting gallium": "Čína zastaví vývoz galia", "China stops exporting rare-earth magnets": "Čína zastaví vývoz magnetů ze vzácných zemin", "China stops exporting graphite anodes": "Čína zastaví vývoz grafitových anod", "China stops exporting germanium": "Čína zastaví vývoz germania", "China stops exporting tungsten": "Čína zastaví vývoz wolframu", "China stops exporting antimony": "Čína zastaví vývoz antimonu", "The DR Congo halts cobalt exports": "DR Kongo zastaví vývoz kobaltu", "Indonesia cuts nickel ore output": "Indonésie omezí těžbu niklové rudy", "China stops exporting lithium chemicals": "Čína zastaví vývoz lithiových chemikálií", "of the world's primary gallium is made in China.": "světového primárního galia se vyrábí v Číně.", "China put gallium under export licences in August 2023 and banned exports to the US in December 2024. That ban is suspended until 27 November 2026. Licences are still required during the suspension, and China's ban on dual-use exports to US military end users stays in force.": "Čína zavedla na galium vývozní licence v srpnu 2023 a v prosinci 2024 zakázala vývoz do USA. Zákaz je pozastaven do 27. listopadu 2026. I během pozastavení je nutná licence a čínský zákaz vývozu zboží dvojího užití americkým vojenským uživatelům platí dál.", "Systems that lose it": "Systémy, kterým chybí", "Gallium arsenide solar cells": "Solární články z arsenidu galia", "Gallium nitride transmit-receive chips": "Vysílací a přijímací čipy z nitridu galia", "Sources outside China on the atlas": "Zdroje mimo Čínu v atlasu", "Greece · planned": "Řecko · plánováno", "Planned output: Q3 2027": "Plánovaná produkce: Q3 2027", "Trade routes affected": "Dotčené obchodní trasy", "Chinese ports → Rotterdam": "Čínské přístavy → Rotterdam", "Strait of Malacca → Rotterdam": "Malacký průliv → Rotterdam", "Dates to watch": "Data ke sledování", "See it on the globe": "Ukázat na glóbu", "Share card": "Karta ke sdílení", "What moved this week.": "Co se tento týden změnilo.", "Week": "Týden", "Gallium:": "Galium:", "EU policy:": "Politika EU:", "Nickel:": "Nikl:", "US finance:": "Financování v USA:", "Prices:": "Ceny:", "What it means for Europe": "Co to znamená pro Evropu", "Next deadlines": "Nejbližší termíny", "Latest stories": "Nejnovější zprávy", "Against the EU's 2030 targets.": "V porovnání s cíli EU pro rok 2030.", "The Critical Raw Materials Act sets four goals for each strategic raw material. The cap that matters most: no more than 65% of EU supply from any one country outside the EU. Where one country already makes more than 65% of world output at a stage, Europe can only meet it by buying from the rest of the market or building that stage at home.": "Akt o kritických surovinách stanoví pro každou strategickou surovinu čtyři cíle. Nejdůležitější je strop: nejvýše 65 % dodávek EU z jedné země mimo EU. Kde jedna země už dnes vyrábí v některé fázi přes 65 % světové produkce, může ho Evropa splnit jen nákupem od zbytku trhu nebo vybudováním této fáze doma.", "of EU demand mined in the EU": "poptávky EU vytěžené v EU", "processed in the EU": "zpracované v EU", "from recycling": "z recyklace", "at most from one non-EU country": "nejvýše z jedné země mimo EU", "Material": "Surovina", "Mining": "Těžba", "Refining and processing": "Rafinace a zpracování", "EU strategic": "Strategická pro EU", "By-product of alumina refining": "Vedlejší produkt rafinace oxidu hlinitého", "China · Primary gallium · 2025, USGS": "Čína · Primární galium · 2025, USGS", "over 65%": "přes 65 %", "China · 2025, USGS": "Čína · 2025, USGS", "China · Battery-grade graphite · 2025, IEA": "Čína · Bateriový grafit · 2025, IEA", "China · Separation and refining · 2024, IEA": "Čína · Separace a rafinace · 2024, IEA", "Magnets": "Magnety", "China · Sintered magnets · IEA, Oct 2025": "Čína · Slinuté magnety · IEA, říj 2025", "No public figure": "Bez veřejného čísla", "DR Congo · 2025, USGS": "DR Kongo · 2025, USGS", "China · Refined cobalt · 2025, IEA": "Čína · Rafinovaný kobalt · 2025, IEA", "Australia · 2025, USGS": "Austrálie · 2025, USGS", "China · Lithium chemicals · 2025, IEA": "Čína · Lithiové chemikálie · 2025, IEA", "China · Ilmenite and rutile · 2025, USGS": "Čína · Ilmenit a rutil · 2025, USGS", "China · Titanium sponge · 2025, USGS": "Čína · Titanová houba · 2025, USGS", "EU critical": "Kritická pro EU", "Indonesia · 2025, USGS": "Indonésie · 2025, USGS", "Indonesia · Refined nickel · 2024, IEA": "Indonésie · Rafinovaný nikl · 2024, IEA", "By-product of zinc and coal": "Vedlejší produkt zinku a uhlí", "China leads; no public world total": "Vede Čína; světový součet není veřejný", "10 of 12 have a stage where one country makes more than 65% of world output. Bars show the top country's share at each stage; the vertical line marks 65%. Sources: USGS Mineral Commodity Summaries 2026, USGS SIR 2025-5021, IEA Global Critical Minerals Outlook 2026.": "10 z 12 surovin má fázi, kde jedna země vyrábí přes 65 % světové produkce. Pruhy ukazují podíl největší země v každé fázi; svislá čára značí 65 %. Zdroje: USGS Mineral Commodity Summaries 2026, USGS SIR 2025-5021, IEA Global Critical Minerals Outlook 2026.", "Public data, dated and linked.": "Veřejná data, s datem a odkazem.", "How to read it": "Jak číst atlas", "Colour is the material. On the globe, a circle is a mine, a square a processing plant, a diamond a magnet plant and a ring a planned project. Sites marked \"approx.\" sit at the town or district. Trade routes follow typical sea lanes; dashed legs travel by road or rail.": "Barva určuje surovinu. Na glóbu je kruh důl, čtverec zpracovatelský závod, kosočtverec závod na magnety a prstenec plánovaný projekt. Lokality označené „přibl.“ leží v obci nebo okrese. Obchodní trasy vedou po typických námořních cestách; přerušované úseky jsou silnice nebo železnice.", "Shares are the top country's share of world output at each stage. The 3D minerals are stylized models, not scans.": "Podíly ukazují podíl největší země na světové produkci v dané fázi. 3D minerály jsou stylizované modely, ne skeny.", "Sources": "Zdroje", "Council of the EU: Critical Raw Materials Act": "Rada EU: Akt o kritických surovinách", "MERICS: export controls and EU rearmament": "MERICS: vývozní kontroly a evropské zbrojení", "Pillsbury: China's suspended export controls": "Pillsbury: pozastavené čínské vývozní kontroly", "Every site, route and story links its own source": "Každá lokalita, trasa i zpráva má odkaz na vlastní zdroj", "How it stays current": "Jak zůstává aktuální", "Every morning an automated process searches for new stories and deadlines and adds them with their links. Every Monday another writes the brief. Sites light up on the globe when they were in the news in the last 14 days.": "Každé ráno automatický proces vyhledá nové zprávy a termíny a přidá je i s odkazy. Každé pondělí další sestaví přehled. Lokality se na glóbu rozsvítí, když byly za posledních 14 dní ve zprávách.", "Live layer: satellite positions are computed in your browser with the SGP4 model (satellite.js) from CelesTrak orbit data. Earthquakes come from the USGS, disaster alerts from GDACS (UN and European Commission) and weather from Open-Meteo. A scheduled task refreshes them every 3 hours.": "Živá vrstva: polohy satelitů se počítají ve vašem prohlížeči modelem SGP4 (satellite.js) z dat o drahách z CelesTraku. Zemětřesení pocházejí z USGS, výstrahy před katastrofami z GDACS (OSN a Evropská komise) a počasí z Open-Meteo. Naplánovaná úloha je obnovuje každé 3 hodiny.", "Mine images: Copernicus Sentinel-2, found through Earth Search by Element 84 and Microsoft Planetary Computer. 3D terrain: AWS Terrain Tiles, built from SRTM and other public elevation data, so it predates recent digging. Globe imagery: NASA Blue Marble and Black Marble.": "Snímky dolů: Copernicus Sentinel-2, vyhledané přes Earth Search od Element 84 a Microsoft Planetary Computer. 3D terén: AWS Terrain Tiles z dat SRTM a dalších veřejných výškových dat, takže nezachycuje nedávné hloubení. Snímky glóbu: NASA Blue Marble a Black Marble.", "Back to the top": "Zpět nahoru", "Footer": "Zápatí", "A Bohemia Defense project by David Madali · Prague": "Projekt Bohemia Defense, David Madali · Praha", "Public data only. Check the linked source before quoting.": "Jen veřejná data. Před citací si ověřte odkazovaný zdroj.", "Share card preview": "Náhled karty ke sdílení", "Close": "Zavřít", "Download PNG": "Stáhnout PNG", "Ask the atlas": "Zeptejte se atlasu", "The AI agent answers from this atlas and its live feeds, and links what it mentions.": "AI agent odpovídá z dat atlasu a jeho živých zdrojů a odkazuje na to, o čem mluví.", "Which mines are near today's earthquakes or storms?": "Které doly jsou blízko dnešních zemětřesení nebo bouří?", "Where does Europe's gallium come from, and what is changing?": "Odkud bere Evropa galium a co se mění?", "What would closing the Strait of Malacca mean for Europe?": "Co by pro Evropu znamenalo uzavření Malackého průlivu?", "Which satellite photographs Tenke Fungurume next?": "Který satelit vyfotí Tenke Fungurume jako další?", "Your question": "Vaše otázka", "Ask about a mine, a material, a route or today's hazards…": "Zeptejte se na důl, surovinu, trasu nebo dnešní rizika…", "Stop": "Zastavit", "Link to this view": "Odkaz na toto zobrazení", "Copy this link to open the atlas at this view. People need access to the atlas to open it.": "Zkopírujte odkaz, který otevře atlas v tomto zobrazení. Otevřít ho mohou jen lidé s přístupem k atlasu.", "Link": "Odkaz", "Search the atlas": "Hledat v atlasu", "Search mines, elements, systems, routes…": "Hledat doly, prvky, systémy, trasy…", "Results": "Výsledky", "Your guess": "Váš odhad", "Actual": "Skutečnost", "Gallium is a by-product of alumina refining, and almost all primary capacity is in China.": "Galium je vedlejší produkt rafinace oxidu hlinitého a téměř veškerá primární kapacita je v Číně.", "Source: USGS SIR 2025-5021 · 2024": "Zdroj: USGS SIR 2025-5021 · 2024", "Next question": "Další otázka", "of the world's lithium chemicals is made in China.": "světových lithiových chemikálií se vyrábí v Číně.", "China's October 2025 controls on lithium-battery and cathode materials are paused until 10 January 2027.": "Čínské kontroly materiálů pro lithiové baterie a katody z října 2025 jsou pozastaveny do 10. ledna 2027.", "Lithium-ion batteries": "Lithium-iontové baterie", "Battery cells": "Bateriové články", "Electrolyte and cathode": "Elektrolyt a katoda", "Australia · mine": "Austrálie · důl", "Chile · mine": "Chile · důl", "Czechia · planned": "Česko · plánováno", "Planned, no firm date": "Plánováno, bez pevného termínu", "Serbia · planned": "Srbsko · plánováno", "Planned output: 2028 at the earliest": "Plánovaná produkce: nejdříve 2028", "Satellites over the supply chain and hazards near it.": "Satelity nad dodavatelským řetězcem a rizika v jeho blízkosti.", "Satellites tracked live": "Satelity sledované živě", "ESA, for the EU's Copernicus programme": "ESA pro evropský program Copernicus", "290 km swath": "pás 290 km", "NASA and the US Geological Survey": "NASA a Geologická služba USA", "185 km swath": "pás 185 km", "DLR, the German Aerospace Center": "DLR, Německé středisko pro letectví a kosmonautiku", "30 km swath": "pás 30 km", "NASA, on the International Space Station": "NASA, na Mezinárodní vesmírné stanici", "spectrometer": "spektrometr", "Next satellite passes over atlas sites": "Další přelety satelitů nad lokalitami atlasu", "Bab-el-Mandeb": "Bab al-Mandab", "Rotterdam approaches": "Přístupy k Rotterdamu", "Hazards near the supply chain": "Rizika v blízkosti dodavatelského řetězce", "red": "červená", "Feeds": "Zdroje dat", "Satellite orbits": "Dráhy satelitů", "Earthquakes and disaster alerts": "Zemětřesení a výstrahy před katastrofami", "Weather at the sites": "Počasí u lokalit", "Sentinel-2 passes on record": "Zaznamenané přelety Sentinelu-2", "Metal prices": "Ceny kovů", "Ships near chokepoints (AIS)": "Lodě u úzkých míst (AIS)", "A scheduled task refreshes the feeds every 3 hours. Satellite positions and passes are computed live in your browser.": "Naplánovaná úloha obnovuje zdroje každé 3 hodiny. Polohy satelitů a přelety se počítají živě ve vašem prohlížeči.", "Earthquake": "Zemětřesení", "No site on this atlas lies within 800 km.": "Žádná lokalita atlasu neleží blíž než 800 km.", "Trade routes within 400 km": "Obchodní trasy do 400 km", "Morowali, Sulawesi → China": "Morowali, Sulawesi → Čína", "USGS report": "Zpráva USGS", "Copy link": "Kopírovat odkaz", "← Atlas": "← Atlas", "Mine": "Důl", "Inner Mongolia, China": "Vnitřní Mongolsko, Čína", "Bastnäsite": "Bastnäsit", "The main rare-earth ore at Bayan Obo and Mountain Pass. Forms honey-brown hexagonal plates.": "Hlavní ruda vzácných zemin v Bayan Obo a Mountain Pass. Tvoří medově hnědé šestiboké destičky.", "Stylized model · drag to turn": "Stylizovaný model · otáčejte tažením", "The geological anchor of China's dominance in rare earths.": "Geologický základ čínské dominance ve vzácných zeminách.", "World's largest known rare-earth deposit": "Největší známé ložisko vzácných zemin na světě", "Mines here supplied about 45% of global rare-earth output (2005)": "Doly zde dodávaly asi 45 % světové produkce vzácných zemin (2005)", "Also the largest known fluorite deposit": "Zároveň největší známé ložisko fluoritu", "Overcast": "Zataženo", "View from orbit": "Pohled z orbitu", "Google satellite": "Satelitní mapa Google", "Rare earths in one number": "Vzácné zeminy v jednom čísle", "of world rare-earth mine output came from China in 2025 (270,000 of about 390,000 t)": "světové těžby vzácných zemin pocházelo v roce 2025 z Číny (270 000 z asi 390 000 t)", "It starts in the ground": "Začíná to v zemi", "Bayan Obo in Inner Mongolia is the world's largest known rare-earth deposit. In 2025 China mined 69% of the world's rare earths.": "Bayan Obo ve Vnitřním Mongolsku je největší známé ložisko vzácných zemin na světě. V roce 2025 Čína vytěžila 69 % světových vzácných zemin.", "Source: USGS Mineral Commodity Summaries 2025": "Zdroj: USGS Mineral Commodity Summaries 2025", "Next chances to photograph it": "Další příležitosti k vyfocení", "Refining is the real chokepoint": "Skutečné úzké místo je rafinace", "China separates and refines about 91% of the world's rare earths and makes about 94% of sintered magnets. One of the few large refineries outside China is Lynas in Malaysia, fed from Mount Weld in Australia.": "Čína separuje a rafinuje asi 91 % světových vzácných zemin a vyrábí asi 94 % slinutých magnetů. Jednou z mála velkých rafinerií mimo Čínu je Lynas v Malajsii, zásobovaná z Mount Weld v Austrálii.", "Source: IEA, October 2025": "Zdroj: IEA, říjen 2025", "The long road to Europe": "Dlouhá cesta do Evropy", "Magnets and metals sail to Europe through the Strait of Malacca and the Suez Canal. The EU buys 98% of its rare-earth magnets and 77% of its gallium from China.": "Magnety a kovy plují do Evropy Malackým průlivem a Suezským průplavem. EU nakupuje 98 % magnetů ze vzácných zemin a 77 % galia z Číny.", "Source: MERICS 2025; Eurostat via Renewable Matter": "Zdroj: MERICS 2025; Eurostat přes Renewable Matter", "Europe's answer": "Odpověď Evropy", "Neo's plant in Narva, Estonia, is described as Europe's biggest rare-earth magnet factory. It starts at 2,000 t a year and plans to grow beyond 5,000 t.": "Závod společnosti Neo v estonské Narvě je označován za největší evropskou továrnu na magnety ze vzácných zemin. Začíná na 2 000 t ročně a plánuje růst nad 5 000 t.", "Source: Neo Performance Materials, via Metal Powder": "Zdroj: Neo Performance Materials, přes Metal Powder", "Cobalt: mined in Congo, refined in China": "Kobalt: těžený v Kongu, rafinovaný v Číně", "The DR Congo mines 74% of the world's cobalt and supplied 99% of China's cobalt hydroxide imports in early 2025. The US-backed Lobito railway now offers a route west to the Atlantic.": "DR Kongo těží 74 % světového kobaltu a na začátku roku 2025 dodávalo 99 % čínského dovozu hydroxidu kobaltu. Železnice do Lobita podporovaná USA teď nabízí cestu na západ k Atlantiku.", "Source: USGS 2026; Fastmarkets; African Business": "Zdroj: USGS 2026; Fastmarkets; African Business", "Czechia's stake": "Česká stopa", "Europe's largest lithium resource sits on the Czech-German border at Cínovec. It is an EU Strategic Project, planned at about 37,500 t of lithium carbonate equivalent a year.": "Největší evropské ložisko lithia leží na česko-německé hranici na Cínovci. Je to strategický projekt EU s plánovanou kapacitou asi 37 500 t ekvivalentu uhličitanu lithného ročně.", "Source: Mining Technology": "Zdroj: Mining Technology", "Explore on your own": "Prozkoumejte sami", "China": "Čína", "United States": "Spojené státy", "Australia": "Austrálie", "Top country's share at the most concentrated stage": "Podíl největší země v nejkoncentrovanější fázi", "Defence": "Obrana", "Neodymium-iron-boron magnets for electric motors, drones, missile fins and guidance actuators, and aircraft systems.": "Neodymové magnety (NdFeB) pro elektromotory, drony, kormidla raket, naváděcí aktuátory a letecké systémy.", "Who mines it": "Kdo ji těží", "Europe's position": "Postavení Evropy", "Europe mines almost no rare earths. Estonia is the exception on the processing side: separation in Sillamäe and Europe's largest magnet plant in Narva.": "Evropa vzácné zeminy téměř netěží. Výjimkou ve zpracování je Estonsko: separace v Sillamäe a největší evropský závod na magnety v Narvě.", "Sites on the globe": "Lokality na glóbu", "California, United States": "Kalifornie, Spojené státy", "Western Australia, Australia": "Západní Austrálie, Austrálie", "Kuantan, Pahang, Malaysia": "Kuantan, Pahang, Malajsie", "Processing": "Zpracování", "Ida-Viru County, Estonia": "Kraj Ida-Viru, Estonsko", "Mozambique": "Mosambik", "South Africa": "Jihoafrická republika", "Norway": "Norsko", "Canada": "Kanada", "Rutile": "Rutil", "Rutile and ilmenite are the main titanium ores. Tellnes and the Ukrainian sites mine ilmenite; Richards Bay produces both.": "Rutil a ilmenit jsou hlavní titanové rudy. Tellnes a ukrajinské lokality těží ilmenit; Richards Bay produkuje obojí.", "of world titanium sponge output came from China in 2025 (260,000 of about 370,000 t)": "světové produkce titanové houby pocházelo v roce 2025 z Číny (260 000 z asi 370 000 t)", "Airframes, jet engines, armour, and satellite and launcher structures.": "Draky letadel, proudové motory, pancíř a konstrukce satelitů a nosných raket.", "Who mines it (titanium minerals)": "Kdo ho těží (titanové minerály)", "USGS MCS 2026 (titanium minerals) · 2025 · world about 9,800 kt": "USGS MCS 2026 (titanové minerály) · 2025 · svět asi 9 800 kt", "Norway's Tellnes is one of Europe's largest titanium mines. Ukraine's ilmenite deposits at Irshansk and Vilnohirsk are a strategic asset; Irshansk restarted in 2023 after a war-related shutdown.": "Norský Tellnes patří k největším titanovým dolům v Evropě. Ukrajinská ložiska ilmenitu v Irši a Vilnohirsku jsou strategickým aktivem; Irša znovu zahájila provoz v roce 2023 po odstávce kvůli válce.", "Sichuan, China": "S’-čchuan, Čína", "Sokndal, Rogaland, Norway": "Sokndal, Rogaland, Norsko", "Zhytomyr Oblast, Ukraine": "Žytomyrská oblast, Ukrajina", "Dnipropetrovsk Oblast, Ukraine": "Dněpropetrovská oblast, Ukrajina", "KwaZulu-Natal, South Africa": "KwaZulu-Natal, Jihoafrická republika", "Austria": "Rakousko", "Spain": "Španělsko", "Portugal": "Portugalsko", "Scheelite": "Scheelit", "The ore mined at Mittersill. The other main tungsten ore, wolframite, is mined at Panasqueira.": "Ruda těžená v Mittersillu. Druhou hlavní wolframovou rudu, wolframit, těží Panasqueira.", "of world tungsten mine output came from China in 2025 (67,000 of 85,000 t)": "světové těžby wolframu pocházelo v roce 2025 z Číny (67 000 z 85 000 t)", "Armour-piercing penetrators, hard-metal cutting tools for the arms industry, and heat-resistant alloys.": "Průbojné penetrátory, nástroje ze slinutých karbidů pro zbrojní výrobu a žáruvzdorné slitiny.", "Europe mines some tungsten in Austria, Portugal and Spain, far less than it uses. China has required export licences for tungsten since February 2025.": "Evropa těží trochu wolframu v Rakousku, Portugalsku a Španělsku, mnohem méně, než spotřebuje. Čína vyžaduje od února 2025 vývozní licence na wolfram.", "Salzburg, Austria": "Salcbursko, Rakousko", "Covilhã, Portugal": "Covilhã, Portugalsko", "Jiangxi, China": "Ťiang-si, Čína", "Tajikistan": "Tádžikistán", "Russia": "Rusko", "Stibnite": "Antimonit", "The main antimony ore, and the name of Idaho's Stibnite project. Grows in long, striated metallic blades.": "Hlavní ruda antimonu a jméno projektu Stibnite v Idahu. Roste v dlouhých rýhovaných kovových čepelích.", "of world antimony mine output came from China in 2025 (40,000 of about 110,000 t)": "světové těžby antimonu pocházelo v roce 2025 z Číny (40 000 z asi 110 000 t)", "Ammunition primers and tracers, infrared sensors, flame retardants and lead-acid batteries.": "Zápalky a svítící stopovky munice, infračervené senzory, retardéry hoření a olověné akumulátory.", "The EU mines almost no antimony. China put antimony exports under licence in August 2024 and banned exports to the US in December 2024; that ban is suspended until 27 November 2026.": "EU antimon téměř netěží. Čína zavedla na vývoz antimonu licence v srpnu 2024 a v prosinci 2024 zakázala vývoz do USA; zákaz je pozastaven do 27. listopadu 2026.", "Lengshuijiang, Hunan, China": "Leng-šuej-ťiang, Chu-nan, Čína", "Valley County, Idaho, United States": "Valley County, Idaho, Spojené státy", "from 2029": "od 2029", "Electronics": "Elektronika", "Gallium metal": "Kovové galium", "of world primary gallium was produced in China in 2025": "světového primárního galia se v roce 2025 vyrobilo v Číně", "Gallium nitride chips for radar and electronic warfare, and gallium arsenide solar cells for satellites.": "Čipy z nitridu galia pro radary a elektronický boj a solární články z arsenidu galia pro satelity.", "Who makes it": "Kdo ho vyrábí", "USGS SIR 2025-5021 · 2024 · Share of primary gallium; tonnages by country are not published": "USGS SIR 2025-5021 · 2024 · Podíl primárního galia; množství podle zemí nejsou zveřejňována", "Gallium is recovered as a by-product of alumina refining. Metlen's plant in Greece is described by the EIB as Europe's first gallium production investment.": "Galium se získává jako vedlejší produkt rafinace oxidu hlinitého. Závod společnosti Metlen v Řecku označuje EIB za první evropskou investici do výroby galia.", "Agios Nikolaos, Boeotia, Greece": "Agios Nikolaos, Boiótie, Řecko", "from Q3 2027": "od Q3 2027", "Sphalerite": "Sfalerit", "Germanium is recovered mainly from zinc ores like this one and from coal fly ash. Kipushi's zinc ore carries germanium.": "Germanium se získává hlavně ze zinkových rud, jako je tato, a z popílku z uhlí. Zinková ruda z Kipushi obsahuje germanium.", "change in China's germanium metal exports in January–September 2025 against a year earlier (7,520 against 18,787 kg)": "změna čínského vývozu kovového germania v lednu až září 2025 proti předchozímu roku (7 520 proti 18 787 kg)", "Infrared optics for thermal sights and missile seekers, fibre optics, and substrates for satellite solar cells.": "Infračervená optika pro termovizní zaměřovače a hlavice raket, optická vlákna a podložky solárních článků satelitů.", "Belgium's Umicore is one of the largest germanium producers and recyclers outside China. China banned germanium exports to the US in December 2024; that ban is suspended until 27 November 2026.": "Belgický Umicore je jedním z největších výrobců a recyklátorů germania mimo Čínu. Čína v prosinci 2024 zakázala vývoz germania do USA; zákaz je pozastaven do 27. listopadu 2026.", "Antwerp province, Belgium": "Provincie Antverpy, Belgie", "Haut-Katanga, DR Congo": "Horní Katanga, DR Kongo", "Zimbabwe": "Zimbabwe", "Argentina": "Argentina", "Batteries": "Baterie", "Spodumene": "Spodumen", "The hard-rock lithium ore mined at Greenbushes. Cínovec's ore is zinnwaldite, a lithium mica named after the village just over the German border.": "Lithiová ruda z tvrdé horniny těžená v Greenbushes. Cínovecká ruda je cinvaldit, lithná slída pojmenovaná po vesnici hned za německou hranicí.", "of world lithium mine output came from Australia in 2025 (92,000 of about 290,000 t, US excluded)": "světové těžby lithia pocházelo v roce 2025 z Austrálie (92 000 z asi 290 000 t, bez USA)", "Lithium-ion batteries for vehicles, drones, soldier systems and grid storage.": "Lithium-iontové baterie pro vozidla, drony, výstroj vojáků a síťová úložiště.", "Europe has large deposits in Czechia, Serbia, Portugal and Germany but little production so far, and most of the world's lithium chemicals are refined in China.": "Evropa má velká ložiska v Česku, Srbsku, Portugalsku a Německu, ale zatím malou produkci, a většina světových lithiových chemikálií se rafinuje v Číně.", "Antofagasta Region, Chile": "Region Antofagasta, Chile", "Ústí nad Labem Region, Czechia": "Ústecký kraj, Česko", "Planned": "Plánováno", "Loznica, Serbia": "Loznica, Srbsko", "from 2028 at the earliest": "nejdříve od 2028", "DR Congo": "DR Kongo", "Indonesia": "Indonésie", "Cobaltite": "Kobaltin", "A classic cobalt ore. Most Congolese cobalt comes from copper-cobalt ores instead, mined alongside copper.": "Klasická kobaltová ruda. Většina konžského kobaltu však pochází z měďnato-kobaltových rud těžených spolu s mědí.", "of world cobalt mine output came from the DR Congo in 2025 (230,000 of 310,000 t)": "světové těžby kobaltu pocházelo v roce 2025 z DR Konga (230 000 z 310 000 t)", "Superalloys for jet engines, samarium-cobalt magnets for missiles and satellites, and battery cathodes.": "Superslitiny pro proudové motory, samarium-kobaltové magnety pro rakety a satelity a katody baterií.", "Finland is Europe's cobalt hub: Umicore refines it at Kokkola and Terrafame makes cobalt sulphate from its own ore at Sotkamo. China is the world's leading cobalt refiner.": "Finsko je evropským centrem kobaltu: Umicore ho rafinuje v Kokkole a Terrafame vyrábí síran kobaltnatý z vlastní rudy v Sotkamu. Čína je největším rafinérem kobaltu na světě.", "Lualaba, DR Congo": "Lualaba, DR Kongo", "Lualaba, near Kolwezi, DR Congo": "Lualaba, u Kolwezi, DR Kongo", "Central Ostrobothnia, Finland": "Střední Pohjanmaa, Finsko", "Philippines": "Filipíny", "Pentlandite": "Pentlandit", "The main ore at Norilsk. Indonesia's nickel comes mostly from laterite, a weathered red and green soil.": "Hlavní ruda v Norilsku. Indonéský nikl pochází většinou z lateritu, zvětralé červenozelené půdy.", "of world nickel mine output came from Indonesia in 2025 (2.6 of 3.9 Mt)": "světové těžby niklu pocházelo v roce 2025 z Indonésie (2,6 z 3,9 Mt)", "Superalloys for jet engines and turbines, stainless and armour steels, and battery cathodes.": "Superslitiny pro proudové motory a turbíny, nerezové a pancéřové oceli a katody baterií.", "Price": "Cena", "per t": "za t", "IMF via FRED": "MMF přes FRED", "Finland mines and processes nickel for batteries. In October 2026 the EU signed a raw-materials partnership with New Caledonia, a French territory and a major nickel producer.": "Finsko těží a zpracovává nikl pro baterie. V říjnu 2026 EU podepsala surovinové partnerství s Novou Kaledonií, francouzským územím a velkým producentem niklu.", "Krasnoyarsk Krai, Russia": "Krasnojarský kraj, Rusko", "Central Sulawesi, Indonesia": "Střední Sulawesi, Indonésie", "Sotkamo, Kainuu, Finland": "Sotkamo, Kainuu, Finsko", "Madagascar": "Madagaskar", "Soft, black and greasy to the touch. It grows as thin hexagonal flakes that slide over each other.": "Měkký, černý a na dotek mastný. Roste v tenkých šestibokých šupinkách, které po sobě kloužou.", "of world natural graphite output came from China in 2025 (1.4 of about 1.8 Mt)": "světové produkce přírodního grafitu pocházelo v roce 2025 z Číny (1,4 z asi 1,8 Mt)", "Battery anodes, refractories for steelmaking, and nuclear-grade graphite.": "Anody baterií, žáruvzdorné materiály pro výrobu oceli a jaderný grafit.", "Europe mines little graphite. Sweden's Vittangi project aims to turn its own graphite into anode material at Luleå. China has required export licences for some graphite since December 2023.": "Evropa těží málo grafitu. Švédský projekt Vittangi chce z vlastního grafitu vyrábět anodový materiál v Luleå. Čína vyžaduje od prosince 2023 vývozní licence na část grafitu.", "Cabo Delgado, Mozambique": "Cabo Delgado, Mosambik", "Norrbotten, Sweden": "Norrbotten, Švédsko", "from late 2027 at the earliest": "nejdříve od konce roku 2027", "Each system's biggest chokepoint": "Největší úzké místo každého systému", "System": "Systém", "6 tracked materials": "6 sledovaných surovin", "Solar arrays, structure, power and attitude control.": "Solární panely, konstrukce, napájení a řízení polohy.", "Biggest chokepoint: gallium": "Největší úzké místo: galium", "What it depends on": "Na čem závisí", "Germanium wafers under those solar cells": "Germaniové podložky pod těmito solárními články", "Structures and propellant tanks": "Konstrukce a palivové nádrže", "Samarium-cobalt magnets in actuators": "Samarium-kobaltové magnety v aktuátorech", "Rare-earth magnets in motors and actuators": "Magnety ze vzácných zemin v motorech a aktuátorech", "Sources outside China": "Zdroje mimo Čínu", "A small military drone: motors, battery and camera.": "Malý vojenský dron: motory, baterie a kamera.", "Biggest chokepoint: rare earths": "Největší úzké místo: vzácné zeminy", "Magnets and anodes. China makes about 94% of the world's sintered rare-earth magnets, which spin every motor, and 94% of battery-grade graphite for the cells.": "Magnety a anody. Čína vyrábí asi 94 % světových slinutých magnetů ze vzácných zemin, které roztáčejí každý motor, a 94 % bateriového grafitu pro články.", "Neodymium magnets in every motor": "Neodymové magnety v každém motoru", "Battery anode": "Anoda baterie", "Battery cathode": "Katoda baterie", "Thermal-camera lenses": "Čočky termokamer", "1 tracked material": "1 sledovaná surovina", "The active electronically scanned radar of modern fighters, ships and air defence.": "Radar s aktivním elektronickým vychylováním svazku v moderních stíhačkách, lodích a protivzdušné obraně.", "Radars also need copper, tantalum and high-purity silicon, which this atlas does not track.": "Radary potřebují také měď, tantal a vysoce čistý křemík, které tento atlas nesleduje.", "2 tracked materials": "2 sledované suroviny", "Thermal sights, infrared seekers and night-vision cameras.": "Termovizní zaměřovače, infračervené hlavice a kamery nočního vidění.", "Biggest chokepoint: germanium": "Největší úzké místo: germanium", "Germanium. Most infrared lenses are germanium, China is the leading producer, and its ban on germanium exports to the US is suspended only until 27 November 2026.": "Germanium. Většina infračervených čoček je z germania, Čína je největším výrobcem a její zákaz vývozu germania do USA je pozastaven jen do 27. listopadu 2026.", "Infrared lenses and windows": "Infračervené čočky a okna", "Indium antimonide detectors": "Detektory z antimonidu india", "4 tracked materials": "4 sledované suroviny", "Fighter and transport engines and the airframe around them.": "Motory stíhacích a transportních letadel a drak kolem nich.", "Biggest chokepoint: cobalt": "Největší úzké místo: kobalt", "Cobalt and titanium. Over three-quarters of refined cobalt comes from China, and China makes 70% of the world's titanium sponge.": "Kobalt a titan. Přes tři čtvrtiny rafinovaného kobaltu pochází z Číny a Čína vyrábí 70 % světové titanové houby.", "Superalloy turbine blades and discs": "Lopatky a disky turbín ze superslitin", "Superalloys for the hot section": "Superslitiny pro horkou část", "Fan and compressor blades, casings, airframe": "Lopatky ventilátoru a kompresoru, skříně, drak", "Yttrium in thermal-barrier coatings, magnets in actuators": "Yttrium v tepelných bariérových povlacích, magnety v aktuátorech", "Small and medium calibre rounds and armour-piercing ammunition.": "Náboje malé a střední ráže a průbojná munice.", "Biggest chokepoint: antimony": "Největší úzké místo: antimon", "Tungsten and antimony. China mines 79% of the world's tungsten and 36% of its antimony and licenses exports of both; the US only began mining antimony again in 2025.": "Wolfram a antimon. Čína těží 79 % světového wolframu a 36 % antimonu a vývoz obou podmiňuje licencemi; USA začaly antimon znovu těžit až v roce 2025.", "Primers and tracers": "Zápalky a stopovky", "Armour-piercing penetrators": "Průbojné penetrátory", "Steel, copper, brass and explosives are not tracked here.": "Ocel, měď, mosaz a výbušniny zde nesledujeme.", "Lithium-ion packs for vehicles, drones and soldier systems.": "Lithium-iontové sady pro vozidla, drony a výstroj vojáků.", "Biggest chokepoint: graphite": "Největší úzké místo: grafit", "Graphite anodes. About 94% of battery-grade graphite and about 70% of lithium chemicals are made in China.": "Grafitové anody. Asi 94 % bateriového grafitu a asi 70 % lithiových chemikálií se vyrábí v Číně.", "Anode": "Anoda", "Cathode": "Katoda", "California, United States · MP Materials": "Kalifornie, Spojené státy · MP Materials", "America's own rare-earth mine; it stopped selling its output to China in 2025.": "Vlastní americký důl na vzácné zeminy; v roce 2025 přestal prodávat produkci do Číny.", "The only rare-earth mining and processing site in the US": "Jediná lokalita těžby a zpracování vzácných zemin v USA", "The US mined about 51,000 t of rare-earth oxide in 2025 (USGS)": "USA vytěžily v roce 2025 asi 51 000 t oxidů vzácných zemin (USGS)", "JPMorgan helped arrange $1 billion to expand MP's US magnet production (Fortune, Oct 2026)": "JPMorgan pomohl zajistit 1 miliardu dolarů na rozšíření výroby magnetů MP v USA (Fortune, říjen 2026)", "Clear": "Jasno", "Western Australia, Australia · Lynas Rare Earths": "Západní Austrálie, Austrálie · Lynas Rare Earths", "A supply chain built outside China: mined in Australia, refined in Malaysia.": "Dodavatelský řetězec vybudovaný mimo Čínu: těžba v Austrálii, rafinace v Malajsii.", "Mining since 2011 in a 3 km wide carbonatite pipe": "Těžba od roku 2011 v karbonatitovém komínu širokém 3 km", "Australia mined about 29,000 t of rare-earth oxide in 2025 (USGS)": "Austrálie vytěžila v roce 2025 asi 29 000 t oxidů vzácných zemin (USGS)", "Concentrate goes to Lynas's plant in Kuantan, Malaysia": "Koncentrát putuje do závodu Lynas v Kuantanu v Malajsii", "Trade routes from here": "Obchodní trasy odsud", "Lynas plant, Kuantan": "Závod Lynas, Kuantan", "route": "trasa", "Approx.": "Přibl.", "Kuantan, Pahang, Malaysia · Lynas Rare Earths": "Kuantan, Pahang, Malajsie · Lynas Rare Earths", "Refining is the bottleneck in rare earths, and this is one of the few large refineries outside China.": "Rafinace je úzkým hrdlem vzácných zemin a toto je jedna z mála velkých rafinerií mimo Čínu.", "Described as the world's largest rare-earth extraction plant outside China": "Označován za největší závod na zpracování vzácných zemin mimo Čínu", "Target capacity 11,000 t of rare-earth oxides a year; operating since 2012": "Cílová kapacita 11 000 t oxidů vzácných zemin ročně; v provozu od roku 2012", "Licence renewed for ten years in March 2026, without the earlier demand to move cracking and leaching out of Malaysia": "Licence obnovena v březnu 2026 na deset let, bez dřívějšího požadavku přesunout rozklad a loužení z Malajsie", "Ida-Viru County, Estonia · Neo Performance Materials (Silmet)": "Kraj Ida-Viru, Estonsko · Neo Performance Materials (Silmet)", "One of the few rare-earth separation plants in the EU.": "Jeden z mála separačních závodů na vzácné zeminy v EU.", "Former Soviet uranium plant that later moved into niobium, tantalum and rare earths": "Bývalý sovětský uranový závod, který později přešel na niob, tantal a vzácné zeminy", "Produces lanthanum, cerium, praseodymium and neodymium compounds": "Vyrábí sloučeniny lanthanu, ceru, praseodymu a neodymu", "A heavy rare-earth separation unit is being installed": "Instaluje se jednotka na separaci těžkých vzácných zemin", "Ida-Viru County, Estonia · Neo Performance Materials": "Kraj Ida-Viru, Estonsko · Neo Performance Materials", "Europe's attempt to make the magnets itself instead of importing them from Asia.": "Pokus Evropy vyrábět magnety sama místo jejich dovozu z Asie.", "Described as Europe's biggest rare-earth magnet plant, built in about 500 days": "Označován za největší evropský závod na magnety ze vzácných zemin, postavený asi za 500 dní", "First phase: 2,000 t of magnets a year, planned to grow beyond 5,000 t": "První fáze: 2 000 t magnetů ročně, plán růstu nad 5 000 t", "EU co-funding of $16.9 million": "Spolufinancování EU ve výši 16,9 milionu dolarů", "Partly cloudy": "Polojasno", "A cornerstone of China's titanium industry.": "Základní kámen čínského titanového průmyslu.", "Vanadium-titanium magnetite district described as the world's largest titanium resource": "Revír vanad-titanového magnetitu označovaný za největší zdroj titanu na světě", "About 93% of China's titanium reserves (2007)": "Asi 93 % čínských zásob titanu (2007)", "Also holds about 63% of China's vanadium reserves": "Obsahuje také asi 63 % čínských zásob vanadu", "Titanium in one number": "Titan v jednom čísle", "Sokndal, Rogaland, Norway · Titania (Kronos)": "Sokndal, Rogaland, Norsko · Titania (Kronos)", "One of Europe's largest titanium mines and a secure source inside NATO.": "Jeden z největších titanových dolů v Evropě a bezpečný zdroj uvnitř NATO.", "Open-pit ilmenite mine, operating since 1960": "Povrchový důl na ilmenit, v provozu od roku 1960", "Reserves over 300 Mt of ore at about 18% titanium": "Zásoby přes 300 Mt rudy s asi 18 % titanu", "Produced about 580,000 t of ilmenite concentrate in 1999": "V roce 1999 vyprodukoval asi 580 000 t ilmenitového koncentrátu", "Zhytomyr Oblast, Ukraine · UMCC (state-owned)": "Žytomyrská oblast, Ukrajina · UMCC (státní)", "Part of the mineral wealth that makes Ukraine strategic for Europe's defence industry.": "Součást nerostného bohatství, které z Ukrajiny dělá strategického partnera evropského obranného průmyslu.", "Produces ilmenite concentrate, the raw material for titanium": "Vyrábí ilmenitový koncentrát, surovinu pro titan", "Idle from October 2022 because of the war, restarted on 5 July 2023": "Od října 2022 kvůli válce mimo provoz, znovu spuštěn 5. července 2023", "UMCC says it aims to push Russia out of the titanium market": "UMCC uvádí, že chce vytlačit Rusko z trhu s titanem", "Ukraine's second titanium hub, further east and closer to the front line.": "Druhé ukrajinské titanové centrum, dál na východě a blíž frontové linii.", "Together with Irshansk, the centre of Ukraine's titanium ore industry": "Spolu s Iršou centrum ukrajinského průmyslu titanových rud", "KwaZulu-Natal, South Africa · Rio Tinto (74%)": "KwaZulu-Natal, Jihoafrická republika · Rio Tinto (74 %)", "One of the largest titanium feedstock sources outside China.": "Jeden z největších zdrojů titanové suroviny mimo Čínu.", "Mines coastal mineral sands and smelts them into titanium slag of about 85% TiO₂": "Těží pobřežní minerální písky a taví je na titanovou strusku s asi 85 % TiO₂", "Also produces rutile, zircon and pig iron": "Vyrábí také rutil, zirkon a surové železo", "About 5,000 workers (2024)": "Asi 5 000 zaměstnanců (2024)", "Mainly clear": "Převážně jasno", "Salzburg, Austria · Wolfram Bergbau und Hütten": "Salcbursko, Rakousko · Wolfram Bergbau und Hütten", "Europe's main tungsten mine, inside the EU.": "Hlavní evropský wolframový důl, uvnitř EU.", "Largest scheelite deposit in Europe": "Největší ložisko scheelitu v Evropě", "About 500,000 t of ore a year, giving roughly 1,200 t of tungsten oxide (2010–2017 data)": "Asi 500 000 t rudy ročně, z níž je zhruba 1 200 t oxidu wolframu (data 2010–2017)", "Austria mined about 840 t of tungsten in 2025 (USGS)": "Rakousko vytěžilo v roce 2025 asi 840 t wolframu (USGS)", "Tungsten in one number": "Wolfram v jednom čísle", "Sources:": "Zdroje:", "Wikipedia": "Wikipedie", "Covilhã, Portugal · Almonty Industries": "Covilhã, Portugalsko · Almonty Industries", "One of the longest-running tungsten mines in Europe, inside NATO.": "Jeden z nejdéle fungujících wolframových dolů v Evropě, uvnitř NATO.", "Mining licence dated 1896": "Těžební licence z roku 1896", "The workforce peaked at nearly 5,800 in 1943": "Počet zaměstnanců vyvrcholil v roce 1943 na téměř 5 800", "Portugal mined about 700 t of tungsten in 2025 (USGS)": "Portugalsko vytěžilo v roce 2025 asi 700 t wolframu (USGS)", "Shown as a district rather than a single mine: the heart of the supply Western buyers are trying to replace.": "Zobrazeno jako revír, ne jako jeden důl: srdce dodávek, které se západní odběratelé snaží nahradit.", "Long the centre of China's tungsten industry": "Dlouhodobě centrum čínského wolframového průmyslu", "China mined about 67,000 of the world's 85,000 t of tungsten in 2025 (USGS)": "Čína vytěžila v roce 2025 asi 67 000 z 85 000 t světového wolframu (USGS)", "Exports have needed a Chinese licence since February 2025": "Vývoz od února 2025 vyžaduje čínskou licenci", "The historic centre of world antimony.": "Historické centrum světového antimonu.", "World's largest known antimony deposit": "Největší známé ložisko antimonu na světě", "On-site refinery with capacity for 10,000 t of antimony a year": "Rafinerie přímo v lokalitě s kapacitou 10 000 t antimonu ročně", "China mined about 40,000 of the world's 110,000 t of antimony in 2025 (USGS)": "Čína vytěžila v roce 2025 asi 40 000 ze 110 000 t světového antimonu (USGS)", "Antimony in one number": "Antimon v jednom čísle", "Valley County, Idaho, United States · Perpetua Resources": "Valley County, Idaho, Spojené státy · Perpetua Resources", "America's attempt to restart large-scale domestic antimony mining; a small mine in Montana began production in 2025.": "Americký pokus obnovit domácí těžbu antimonu ve velkém; malý důl v Montaně zahájil těžbu v roce 2025.", "Expected to hold the only identified antimony reserve in the US": "Má obsahovat jediné identifikované zásoby antimonu v USA", "Early construction began in 2026; gold and antimony production planned from 2029": "Úvodní stavba začala v roce 2026; těžba zlata a antimonu plánována od roku 2029", "JPMorgan paid $75 million for a 2.7% stake (Fortune, Oct 2026)": "JPMorgan zaplatil 75 milionů dolarů za 2,7% podíl (Fortune, říjen 2026)", "Rain": "Déšť", "Agios Nikolaos, Boeotia, Greece · Metlen (Aluminium of Greece)": "Agios Nikolaos, Boiótie, Řecko · Metlen (Aluminium of Greece)", "Europe's main bet to cut its reliance on Chinese gallium.": "Hlavní sázka Evropy na snížení závislosti na čínském galiu.", "Planned capacity: 50 t of gallium a year, commercial output from Q3 2027": "Plánovaná kapacita: 50 t galia ročně, komerční výroba od Q3 2027", "Selected as a Strategic Project under the EU Critical Raw Materials Act (2025)": "Vybrán jako strategický projekt podle Aktu EU o kritických surovinách (2025)", "EIB approved €90 million, announced 15 January 2026": "EIB schválila 90 milionů eur, oznámeno 15. ledna 2026", "Gallium was about $3,500/kg in October 2026, up from under $500 when Metlen decided to invest": "Galium stálo v říjnu 2026 asi 3 500 $/kg, zatímco když se Metlen rozhodl investovat, bylo pod 500 $", "Gallium in one number": "Galium v jednom čísle", "Antwerp province, Belgium · Umicore": "Provincie Antverpy, Belgie · Umicore", "Europe's main germanium refiner, supplying optics and space solar cells.": "Hlavní evropský rafinér germania, dodává optiku a solární články pro vesmír.", "One of the largest germanium producers and recyclers outside China": "Jeden z největších výrobců a recyklátorů germania mimo Čínu", "More than half its germanium comes from recycled material": "Více než polovina jeho germania pochází z recyklovaného materiálu", "Two germanium projects named EU Strategic Projects in March 2025, one for satellite solar-cell substrates": "Dva germaniové projekty jmenovány v březnu 2025 strategickými projekty EU, jeden na podložky solárních článků pro satelity", "Light drizzle": "Slabé mrholení", "Germanium in one number": "Germanium v jednom čísle", "Haut-Katanga, DR Congo · Ivanhoe Mines (68%), Gécamines (32%)": "Horní Katanga, DR Kongo · Ivanhoe Mines (68 %), Gécamines (32 %)", "A zinc mine whose by-products could include germanium for Western buyers.": "Zinkový důl, jehož vedlejší produkty by mohly zahrnovat germanium pro západní odběratele.", "Zinc ore grading about 35%, among the richest in the world": "Zinková ruda s obsahem asi 35 %, jedna z nejbohatších na světě", "The ore also carries germanium": "Ruda obsahuje také germanium", "Production restarted in June 2024 after more than 30 years on care and maintenance": "Těžba obnovena v červnu 2024 po více než 30 letech v útlumu", "Chinese refineries": "Čínské rafinerie", "Western Australia, Australia · Talison Lithium (Tianqi–IGO 51%, Albemarle 49%)": "Západní Austrálie, Austrálie · Talison Lithium (Tianqi–IGO 51 %, Albemarle 49 %)", "Australia mines more lithium than any other country, but most of its concentrate has been refined in China.": "Austrálie těží více lithia než kterákoli jiná země, ale většina jejího koncentrátu se rafinovala v Číně.", "Described as the largest hard-rock lithium mine in the world": "Označován za největší lithiový důl v tvrdé hornině na světě", "Expansion aims at more than 160,000 t of lithium carbonate equivalent a year": "Rozšíření míří na více než 160 000 t ekvivalentu uhličitanu lithného ročně", "Australia mined about 92,000 t of lithium in 2025 (USGS)": "Austrálie vytěžila v roce 2025 asi 92 000 t lithia (USGS)", "Chinese converters": "Čínské zpracovatelské závody", "Lithium in one number": "Lithium v jednom čísle", "Antofagasta Region, Chile · SQM–Codelco (Nova Andino Litio), Albemarle": "Region Antofagasta, Chile · SQM–Codelco (Nova Andino Litio), Albemarle", "The world's biggest lithium brine operation.": "Největší provoz na těžbu lithia ze solanky na světě.", "Brine evaporation ponds large enough to pick out easily from orbit": "Odpařovací nádrže solanky tak velké, že je z orbitu snadno rozeznáte", "Held about 27% of the world's lithium reserve base (2008 estimate)": "Obsahoval asi 27 % světové zásobní základny lithia (odhad z roku 2008)", "Chile mined about 56,000 t of lithium in 2025, third after Australia and China (USGS)": "Chile vytěžilo v roce 2025 asi 56 000 t lithia, třetí po Austrálii a Číně (USGS)", "Ústí nad Labem Region, Czechia · Geomet (ČEZ group 51%, European Metals 49%)": "Ústecký kraj, Česko · Geomet (skupina ČEZ 51 %, European Metals 49 %)", "Czechia's entry in Europe's lithium race, in the Ore Mountains on the German border.": "Český vstup do evropského závodu o lithium, v Krušných horách na německé hranici.", "Described as Europe's largest lithium resource": "Označován za největší ložisko lithia v Evropě", "EU Strategic Project under the Critical Raw Materials Act (March 2025)": "Strategický projekt EU podle Aktu o kritických surovinách (březen 2025)", "Plans about 37,500 t a year of battery-grade lithium carbonate equivalent, processed at Prunéřov": "Plánuje asi 37 500 t ekvivalentu bateriového uhličitanu lithného ročně se zpracováním v Prunéřově", "Environmental impact documentation published in May 2026": "Dokumentace EIA zveřejněna v květnu 2026", "Light rain": "Slabý déšť", "Loznica, Serbia · Rio Tinto": "Loznica, Srbsko · Rio Tinto", "Potentially one of Europe's biggest lithium sources, and one of its most contested.": "Potenciálně jeden z největších evropských zdrojů lithia a zároveň jeden z nejspornějších.", "Jadarite, a lithium-boron mineral, is known only from here": "Jadarit, lithno-borový minerál, je znám pouze odsud", "Resource of 118 Mt at 1.8% lithium oxide": "Zdroje 118 Mt s 1,8 % oxidu lithného", "Licences revoked in January 2022 after protests; Serbia's Constitutional Court overturned that in July 2024": "Licence zrušeny v lednu 2022 po protestech; srbský Ústavní soud to v červenci 2024 zvrátil", "EU–Serbia raw-materials memorandum signed in July 2024": "Memorandum EU–Srbsko o surovinách podepsáno v červenci 2024", "Lualaba, DR Congo · CMOC (80%), Gécamines (20%)": "Lualaba, DR Kongo · CMOC (80 %), Gécamines (20 %)", "One of the world's largest cobalt producers, owned by a Chinese group.": "Jeden z největších producentů kobaltu na světě, ve vlastnictví čínské skupiny.", "Produced 209,120 t of copper and 18,501 t of cobalt in 2021": "V roce 2021 vyprodukoval 209 120 t mědi a 18 501 t kobaltu", "The DR Congo mined about 230,000 of the world's 310,000 t of cobalt in 2025 (USGS)": "DR Kongo vytěžila v roce 2025 asi 230 000 z 310 000 t světového kobaltu (USGS)", "Cobalt in one number": "Kobalt v jednom čísle", "Elevation is older than the image, so recent pits can look shallower · drag to turn": "Výšková data jsou starší než snímek, takže nové jámy mohou vypadat mělčí · otáčejte tažením", "Co · Batteries": "Co · Baterie", "Element": "Prvek", "Ida-Viru County, Estonia · Rare earths": "Kraj Ida-Viru, Estonsko · Vzácné zeminy", "Site": "Lokalita", "Covilhã, Portugal · Tungsten": "Covilhã, Portugalsko · Wolfram", "Valley County, Idaho, United States · Antimony": "Valley County, Idaho, Spojené státy · Antimon", "Antwerp province, Belgium · Germanium": "Provincie Antverpy, Belgie · Germanium", "Haut-Katanga, DR Congo · Germanium": "Horní Katanga, DR Kongo · Germanium", "Antofagasta Region, Chile · Lithium": "Region Antofagasta, Chile · Lithium", "Lualaba, DR Congo · Cobalt": "Lualaba, DR Kongo · Kobalt", "Lualaba, near Kolwezi, DR Congo · Cobalt": "Lualaba, u Kolwezi, DR Kongo · Kobalt", "Central Ostrobothnia, Finland · Cobalt": "Střední Pohjanmaa, Finsko · Kobalt", "Lualaba, near Kolwezi, DR Congo · Glencore": "Lualaba, u Kolwezi, DR Kongo · Glencore", "A swing producer: when Glencore idled it in 2019, a large share of world cobalt supply went offline.": "Výkyvový producent: když ho Glencore v roce 2019 odstavil, zmizela z trhu velká část světových dodávek kobaltu.", "About 40 km south-east of Kolwezi": "Asi 40 km jihovýchodně od Kolwezi", "Produced 27,300 t of cobalt in 2018": "V roce 2018 vyprodukoval 27 300 t kobaltu", "Idled in late 2019 and restarted at the end of 2021": "Odstaven koncem roku 2019, znovu spuštěn na konci roku 2021", "Port of Lobito, Angola": "Přístav Lobito, Angola", "Central Ostrobothnia, Finland · Umicore": "Střední Pohjanmaa, Finsko · Umicore", "Europe's main cobalt refinery, between Congolese ore and European battery plants.": "Hlavní evropská kobaltová rafinerie, mezi konžskou rudou a evropskými továrnami na baterie.", "Bought by Umicore from Freeport in 2019 for $150 million": "Umicore ji koupil od Freeportu v roce 2019 za 150 milionů dolarů", "Capacity 15,000 t a year; described at the time as the largest cobalt refinery outside China": "Kapacita 15 000 t ročně; tehdy označována za největší kobaltovou rafinerii mimo Čínu", "Krasnoyarsk Krai, Russia · Nornickel": "Krasnojarský kraj, Rusko · Nornickel", "Russia's main source of high-grade nickel and palladium for aerospace alloys.": "Hlavní ruský zdroj vysoce kvalitního niklu a palladia pro letecké slitiny.", "Arctic mining and smelting complex on giant nickel-copper-palladium deposits": "Arktický těžební a hutní komplex na obřích ložiscích niklu, mědi a palladia", "Nornickel is cited at about 20% of world nickel and 35% of palladium": "Nornickel se uvádí s asi 20 % světového niklu a 35 % palladia", "Russia mined about 200,000 t of nickel in 2025 (USGS)": "Rusko vytěžilo v roce 2025 asi 200 000 t niklu (USGS)", "Snow": "Sníh", "Nickel in one number": "Nikl v jednom čísle", "Central Sulawesi, Indonesia · Tsingshan-led industrial park": "Střední Sulawesi, Indonésie · průmyslový park vedený skupinou Tsingshan", "The heart of Indonesia's nickel boom, built largely with Chinese capital.": "Srdce indonéského niklového boomu, postavené převážně z čínského kapitálu.", "About $34.3 billion invested from 2015 to 2024": "V letech 2015 až 2024 investováno asi 34,3 miliardy dolarů", "About 85,000 workers": "Asi 85 000 zaměstnanců", "Runs largely on captive coal power, including about 2 GW of coal plant": "Běží převážně na vlastní uhelné elektrárny, včetně asi 2 GW uhelného výkonu", "Indonesia mined about 2.6 of the world's 3.9 Mt of nickel in 2025 (USGS)": "Indonésie vytěžila v roce 2025 asi 2,6 z 3,9 Mt světového niklu (USGS)", "Sotkamo, Kainuu, Finland · Terrafame (Finnish Minerals Group 56.2%)": "Sotkamo, Kainuu, Finsko · Terrafame (Finnish Minerals Group 56,2 %)", "One of Europe's few mine-to-battery-chemical operations.": "Jeden z mála evropských provozů od dolu až po bateriové chemikálie.", "Mines its own ore and extracts the metals by bioleaching": "Těží vlastní rudu a kovy získává biologickým loužením", "At full capacity makes nickel sulphate for about 1 million EVs and cobalt sulphate for about 300,000": "Při plné kapacitě vyrobí síran nikelnatý asi pro 1 milion elektromobilů a síran kobaltnatý asi pro 300 000", "Every production step happens on one site": "Všechny výrobní kroky probíhají v jedné lokalitě", "Cabo Delgado, Mozambique · Syrah Resources": "Cabo Delgado, Mosambik · Syrah Resources", "One of the few large graphite mines outside China.": "Jeden z mála velkých grafitových dolů mimo Čínu.", "Capacity of about 350,000 t a year of graphite concentrate": "Kapacita asi 350 000 t grafitového koncentrátu ročně", "Feeds Syrah's anode plant in Vidalia, Louisiana": "Zásobuje anodový závod společnosti Syrah ve Vidalii v Louisianě", "Shut from December 2024 after protests; production restarted in June 2025": "Od prosince 2024 uzavřen po protestech; těžba obnovena v červnu 2025", "Mozambique mined about 60,000 t of graphite in 2025 (USGS)": "Mosambik vytěžil v roce 2025 asi 60 000 t grafitu (USGS)", "Syrah's Vidalia anode plant": "Anodový závod Syrah ve Vidalii", "Graphite in one number": "Grafit v jednom čísle", "Norrbotten, Sweden · Talga Group": "Norrbotten, Švédsko · Talga Group", "One of Europe's most advanced plans to make battery anodes from its own graphite.": "Jeden z nejpokročilejších evropských plánů vyrábět anody baterií z vlastního grafitu.", "Graphite mine planned at Vittangi, with an anode refinery at the port of Luleå": "Grafitový důl plánovaný ve Vittangi s anodovou rafinerií v přístavu Luleå", "Designed for 19,500 t a year of battery anode material": "Navrženo na 19 500 t anodového materiálu ročně", "Talga targets a final investment decision in early 2027": "Talga míří ke konečnému investičnímu rozhodnutí na začátku roku 2027", "Trade route": "Obchodní trasa", "Greenbushes, Western Australia → Chinese converters": "Greenbushes, Západní Austrálie → čínské zpracovatelské závody", "In 2022, more than 94% of Australia's lithium exports by value went to China every month. Australia mines more lithium than any other country.": "V roce 2022 šlo každý měsíc přes 94 % hodnoty australského vývozu lithia do Číny. Austrálie těží víc lithia než kterákoli jiná země.", "Carries": "Přepravuje", "Dashed legs travel by road or rail. Sea legs follow typical shipping lanes, not a tracked voyage.": "Přerušované úseky vedou po silnici nebo železnici. Námořní úseky sledují typické lodní trasy, ne sledovanou plavbu.", "Australian Bureau of Statistics": "Australský statistický úřad", "Salar de Atacama → China": "Salar de Atacama → Čína", "About 80% of Chile's lithium carbonate exports went to China in 2024: 192,000 of 241,000 t.": "Asi 80 % chilského vývozu uhličitanu lithného šlo v roce 2024 do Číny: 192 000 z 241 000 t.", "Kolwezi, DR Congo → Chinese refineries": "Kolwezi, DR Kongo → čínské rafinerie", "The DR Congo supplied 99% of China's cobalt hydroxide imports in January–May 2025. Cargoes leave through Durban and Dar es Salaam and take about three months to reach China.": "DR Kongo dodala v lednu až květnu 2025 99 % čínského dovozu hydroxidu kobaltu. Náklady odplouvají přes Durban a Dar es Salaam a do Číny putují asi tři měsíce.", "Passes through": "Prochází", "chokepoint": "úzké místo", "Kolwezi, DR Congo → Port of Lobito, Angola": "Kolwezi, DR Kongo → přístav Lobito, Angola", "A 1,300 km railway from the Congolese and Zambian copperbelt to Angola's Atlantic coast. Kolwezi to Lobito can take six days, against three weeks or more to Durban or Dar es Salaam. The US says it has mobilised close to $6 billion for the corridor.": "Železnice dlouhá 1 300 km z konžského a zambijského měděného pásu k atlantskému pobřeží Angoly. Cesta z Kolwezi do Lobita může trvat šest dní, proti třem a více týdnům do Durbanu nebo Dar es Salaamu. USA uvádějí, že pro koridor mobilizovaly téměř 6 miliard dolarů.", "African Business, June 2026": "African Business, červen 2026", "China bought about 92% of Indonesia's nickel product exports in July 2024. Indonesia mines 67% of the world's nickel.": "Čína koupila v červenci 2024 asi 92 % indonéského vývozu niklových produktů. Indonésie těží 67 % světového niklu.", "Mount Weld, Western Australia → Lynas plant, Kuantan": "Mount Weld, Západní Austrálie → závod Lynas, Kuantan", "Lynas ships rare-earth concentrate from Mount Weld to its plant in Kuantan, Malaysia: one of the few large rare-earth refineries outside China.": "Lynas vozí koncentrát vzácných zemin z Mount Weld do svého závodu v malajském Kuantanu: jedné z mála velkých rafinerií vzácných zemin mimo Čínu.", "The EU imports 98% of its rare-earth magnets from China (MERICS, 2025) and 77% of its gallium (Eurostat, 2025). The shortest sea route runs through the Strait of Malacca and the Suez Canal.": "EU dováží 98 % magnetů ze vzácných zemin z Číny (MERICS, 2025) a 77 % galia (Eurostat, 2025). Nejkratší námořní cesta vede Malackým průlivem a Suezským průplavem.", "Diversion": "Objížďka", "When the Red Sea is unsafe, ships go around Africa instead. Suez Canal transits fell 42% in two months after attacks on shipping began (UNCTAD, January 2024).": "Když je Rudé moře nebezpečné, lodě obeplouvají Afriku. Průjezdy Suezským průplavem klesly za dva měsíce po začátku útoků na lodě o 42 % (UNCTAD, leden 2024).", "UNCTAD via L'Orient Today": "UNCTAD přes L'Orient Today", "Balama, Mozambique → Syrah's Vidalia anode plant": "Balama, Mosambik → anodový závod Syrah ve Vidalii", "Syrah ships graphite from Balama to its 11,250 t-a-year anode material plant in Vidalia, Louisiana, which started production in 2024.": "Syrah vozí grafit z Balamy do svého závodu na anodový materiál ve Vidalii v Louisianě s kapacitou 11 250 t ročně, který zahájil výrobu v roce 2024.", "Chokepoint": "Úzké místo", "About 22–25% of the world's seaborne trade passes through it; about 102,500 ships transited in 2025. Ore and metal from Africa, Indonesia and China to Europe all pass here.": "Prochází jím asi 22–25 % světového námořního obchodu; v roce 2025 jím proplulo asi 102 500 lodí. Ruda a kovy z Afriky, Indonésie a Číny do Evropy procházejí všechny tudy.", "Routes on the atlas": "Trasy v atlasu", "The short route between Asia and Europe. Suez Canal transits fell 42% in two months as ships avoided the Red Sea after attacks began (UNCTAD, January 2024).": "Krátká cesta mezi Asií a Evropou. Průjezdy Suezským průplavem klesly o 42 % za dva měsíce, kdy se lodě po začátku útoků vyhýbaly Rudému moři (UNCTAD, leden 2024).", "The long way round Africa: the diversion route when the Red Sea is closed, and the route for Mozambican graphite heading to the US.": "Dlouhá cesta kolem Afriky: objízdná trasa při uzavření Rudého moře a trasa mosambického grafitu do USA.", "Live position": "Živá poloha", "Latitude": "Zeměpisná šířka", "Longitude": "Zeměpisná délka", "Altitude": "Výška", "Speed": "Rychlost", "Below it": "Pod ním", "Night": "Noc", "Photographs the land in 13 colours at up to 10 m. The mine images in this atlas come from the Sentinel-2 satellites.": "Fotografuje pevninu ve 13 barvách s rozlišením až 10 m. Snímky dolů v tomto atlasu pocházejí ze satelitů Sentinel-2.", "Orbits at 786 km in a polar, sun-synchronous orbit": "Obíhá ve výšce 786 km na polární, slunečně synchronní dráze", "Each pass images a 290 km wide strip at up to 10 m resolution": "Při každém přeletu snímá pás široký 290 km s rozlišením až 10 m", "With two satellites it revisits every point on the equator every five days": "Se dvěma satelity se nad každé místo na rovníku vrací každých pět dní", "Sentinel-2A launched in 2015, 2B in 2017 and 2C in 2024": "Sentinel-2A startoval v roce 2015, 2B v roce 2017 a 2C v roce 2024", "Atlas sites under its camera in the next 48 hours": "Lokality atlasu pod jeho kamerou v příštích 48 hodinách", "Open Copernicus Browser": "Otevřít Copernicus Browser", "Daylight": "Den", "Images the land at 30 m, with thermal bands. The Landsat programme has photographed the same places since 1972.": "Snímkuje pevninu s rozlišením 30 m a s tepelnými pásmy. Program Landsat fotografuje stejná místa od roku 1972.", "USGS: Landsat missions": "USGS: mise Landsat", "A hyperspectral imager that splits light into more than 200 bands, enough to tell minerals apart from orbit. It photographs chosen targets on request.": "Hyperspektrální přístroj, který rozkládá světlo do více než 200 pásem, což stačí k rozlišení minerálů z orbitu. Fotografuje vybrané cíle na vyžádání.", "The space station carries NASA's EMIT imaging spectrometer, which maps the minerals of the world's dry regions.": "Vesmírná stanice nese spektrometr EMIT od NASA, který mapuje minerály suchých oblastí světa.", "2028 at the earliest": "nejdříve 2028", "About 230,000 of 310,000 tonnes. Most of it is then refined in China.": "Asi 230 000 z 310 000 tun. Většina se pak rafinuje v Číně.", "Australia leads mining, but China makes about 70% of the world's lithium chemicals.": "Austrálie vede v těžbě, ale Čína vyrábí asi 70 % světových lithiových chemikálií.", "Battery-grade graphite": "Bateriový grafit", "Belgium": "Belgie", "China has required export licences for tungsten since February 2025. From 1 January 2027, US defence contracts may not use tungsten mined or refined in China.": "Čína vyžaduje od února 2025 vývozní licence na wolfram. Od 1. ledna 2027 nesmí obranné zakázky USA používat wolfram vytěžený nebo rafinovaný v Číně.", "China has required licences for some graphite since December 2023. Its October 2025 controls on anode materials are paused until 10 January 2027.": "Čína vyžaduje od prosince 2023 licence na část grafitu. Její kontroly anodových materiálů z října 2025 jsou pozastaveny do 10. ledna 2027.", "China put antimony under licences in August 2024 and banned exports to the US in December 2024. The US only began mining antimony again in 2025.": "Čína zavedla na antimon licence v srpnu 2024 a v prosinci 2024 zakázala vývoz do USA. USA začaly antimon znovu těžit až v roce 2025.", "China's October 2025 controls on rare-earth magnets, equipment and technology are paused until 10 January 2027. The EU imports 98% of its rare-earth magnets from China.": "Čínské kontroly magnetů ze vzácných zemin, zařízení a technologií z října 2025 jsou pozastaveny do 10. ledna 2027. EU dováží 98 % magnetů ze vzácných zemin z Číny.", "Chinese lithium carbonate futures on 12 October 2026 were about half their May 2026 peak": "Čínské futures na uhličitan lithný byly 12. října 2026 asi na polovině svého vrcholu z května 2026", "Chinese ports": "Čínské přístavy", "Chokepoint: anodes, 94% China": "Úzké místo: anody, 94 % Čína", "Chokepoint: tungsten, 79% China": "Úzké místo: wolfram, 79 % Čína", "Chokepoint: germanium lenses": "Úzké místo: germaniové čočky", "Chokepoint: magnets, 94% China": "Úzké místo: magnety, 94 % Čína", "Chokepoint: refined cobalt, >75% China": "Úzké místo: rafinovaný kobalt, >75 % Čína", "Czechia": "Česko", "Estonia": "Estonsko", "Finland": "Finsko", "Gallium has no ore of its own. It is recovered from alumina refining and sold as a soft, silvery metal that melts at about 30 °C.": "Galium nemá vlastní rudu. Získává se při rafinaci oxidu hlinitého a prodává se jako měkký stříbřitý kov, který taje asi při 30 °C.", "Germanium has needed a Chinese export licence since August 2023, and exports to the US were banned in December 2024 (suspended until 27 November 2026). China's germanium metal exports fell 60% in January–September 2025. Licences are still required during the suspension, and China's ban on dual-use exports to US military end users stays in force.": "Germanium vyžaduje čínskou vývozní licenci od srpna 2023 a vývoz do USA byl v prosinci 2024 zakázán (pozastaveno do 27. listopadu 2026). Čínský vývoz kovového germania klesl v lednu až září 2025 o 60 %. I během pozastavení je nutná licence a čínský zákaz vývozu zboží dvojího užití americkým vojenským uživatelům platí dál.", "Greece": "Řecko", "Ilmenite and rutile": "Ilmenit a rutil", "Indonesia set its 2026 nickel ore quota at 290–300 Mt after an October 2026 revision, against about 320 Mt mined in 2025.": "Indonésie stanovila kvótu těžby niklové rudy na rok 2026 po říjnové revizi na 290–300 Mt, proti asi 320 Mt vytěženým v roce 2025.", "Lithium chemicals": "Lithiové chemikálie", "Malaysia": "Malajsie", "Primary gallium": "Primární galium", "Refined cobalt": "Rafinovaný kobalt", "Refined nickel": "Rafinovaný nikl", "Separation and refining": "Separace a rafinace", "Serbia": "Srbsko", "Share of primary gallium; tonnages by country are not published": "Podíl primárního galia; množství podle zemí nejsou zveřejňována", "Sintered magnets": "Slinuté magnety", "Sweden": "Švédsko", "The DR Congo suspended cobalt exports in February 2025 and replaced the ban with quotas: 87,000 t of cobalt for 2026, plus up to 9,600 t of strategic quota.": "DR Kongo pozastavila vývoz kobaltu v únoru 2025 a zákaz nahradila kvótami: 87 000 t kobaltu na rok 2026 plus až 9 600 t strategické kvóty.", "The first Sentinel-2, launched in 2015 and still flying alongside its successors.": "První Sentinel-2, vypuštěný v roce 2015 a stále v provozu vedle svých nástupců.", "Those magnets go into drones, missiles, fighter jets and electric motors.": "Tyto magnety míří do dronů, raket, stíhaček a elektromotorů.", "Titanium sponge": "Titanová houba", "Ukraine": "Ukrajina", "Up from around 50% two decades ago.": "Před dvaceti lety to bylo kolem 50 %.", "What share of the EU's rare-earth magnet imports comes from China?": "Jaký podíl dovozu magnetů ze vzácných zemin do EU pochází z Číny?", "What share of the world's cobalt is mined in the DR Congo?": "Jaký podíl světového kobaltu se těží v DR Kongo?", "What share of the world's lithium is mined in Australia?": "Jaký podíl světového lithia se těží v Austrálii?", "What share of the world's sintered rare-earth magnets is made in China?": "Jaký podíl světových slinutých magnetů ze vzácných zemin se vyrábí v Číně?", "World total excludes the US": "Světový součet nezahrnuje USA", "from this date, tungsten in US defence contracts may not be mined or refined in China, Russia, North Korea or Iran": "od tohoto data nesmí wolfram v obranných zakázkách USA pocházet z těžby nebo rafinace v Číně, Rusku, Severní Koreji nebo Íránu", "is Indonesia's 2026 nickel ore mining quota after the October 2026 revision, against about 320 Mt mined in 2025": "je indonéská kvóta těžby niklové rudy na rok 2026 po říjnové revizi, proti asi 320 Mt vytěženým v roce 2025", "is the DR Congo's 2026 cobalt export quota, plus up to 9,600 t of strategic quota": "je vývozní kvóta kobaltu DR Kongo na rok 2026, plus až 9 600 t strategické kvóty", "is when China's extended pause on export licences for graphite anode materials is due to end": "je datum, kdy má skončit prodloužená čínská pauza ve vývozních licencích na grafitové anodové materiály", "late 2027 at the earliest": "nejdříve koncem roku 2027", "mine output, 2025": "těžba, 2025", "of EU gallium imports came from China in 2025": "dovozu galia do EU pocházelo v roce 2025 z Číny", "of Umicore's germanium supply comes from recycled material": "germania pro Umicore pochází z recyklovaného materiálu", "is when antimony mining restarted in the United States, at one mine in Montana": "je rok, kdy se v USA obnovila těžba antimonu, v jednom dole v Montaně", "of the world's more than 75 million tonnes of reserves are in China": "z více než 75 milionů tun světových zásob je v Číně", "of titanium sponge was produced worldwide in 2025, up from about 200 kt in 2018": "titanové houby se v roce 2025 vyrobilo celosvětově, proti asi 200 kt v roce 2018", "primary metal, 2025": "primární kov, 2025", "titanium sponge, 2025": "titanová houba, 2025", "Working out which mines it will pass over…": "Zjišťuji, nad kterými doly proletí…", "No atlas site falls inside its swath in daylight in the next 48 hours.": "V příštích 48 hodinách se za denního světla žádná lokalita atlasu nedostane do jeho záběru.", "No orbit data yet": "Zatím bez dat o dráze", "Status": "Stav", "Right now": "Právě teď", "Working them out…": "Počítám…", "None found.": "Nic nenalezeno.", "The hazard feed has not arrived yet.": "Data o rizicích zatím nedorazila.", "waiting": "čeká se", "Ships near chokepoints right now": "Lodě u úzkých míst právě teď", "Working out the next satellite passes…": "Počítám další přelety satelitů…", "Live hazards within 500 km": "Živá rizika do 500 km", "Tropical cyclone": "Tropická cyklóna", "Flood": "Povodeň", "Volcano": "Sopka", "Drought": "Sucho", "Wildfire": "Lesní požár", "Atlas sites within 800 km": "Lokality atlasu do 800 km", "GDACS report": "Zpráva GDACS", "GDACS alert": "Výstraha GDACS", "Cargo ship": "Nákladní loď", "Tanker": "Tanker", "Passenger ship": "Osobní loď", "Fishing vessel": "Rybářské plavidlo", "Tug": "Remorkér", "High-speed craft": "Rychlé plavidlo", "Vessel": "Plavidlo", "AIS position": "Poloha z AIS", "Course": "Kurz", "Destination": "Cíl", "Look it up on MarineTraffic": "Vyhledat na MarineTraffic", "Link copied": "Odkaz zkopírován", "Thinking…": "Přemýšlím…", "Stopped.": "Zastaveno.", "The AI agent is not available for this page on your account.": "AI agent není pro tuto stránku na vašem účtu dostupný.", "Too many questions at once, or your usage limit is reached. Try again later.": "Příliš mnoho otázek najednou, nebo jste vyčerpali limit. Zkuste to později.", "Please sign in to the AI agent again.": "Přihlaste se prosím znovu k AI agentovi.", "The AI agent declined this question. Try asking it differently.": "AI agent na tuto otázku neodpověděl. Zkuste ji položit jinak.", "Something went wrong. Try again.": "Něco se pokazilo. Zkuste to znovu.", "The answer was cut short. Ask for less at a time.": "Odpověď byla useknuta. Ptejte se na méně najednou.", "The AI agent is not available for this page here.": "AI agent zde pro tuto stránku není dostupný.", "Route": "Trasa", "Satellites, hazards and feeds": "Satelity, rizika a zdroje dat", "A question answered by AI agent from this atlas": "Otázka, na kterou odpoví AI agent z tohoto atlasu", "Shipping chokepoint": "Námořní úzké místo", "Fog": "Mlha", "Drizzle": "Mrholení", "Heavy drizzle": "Silné mrholení", "Freezing drizzle": "Mrznoucí mrholení", "Heavy rain": "Silný déšť", "Freezing rain": "Mrznoucí déšť", "Light snow": "Slabé sněžení", "Heavy snow": "Silné sněžení", "Snow grains": "Sněhová zrna", "Rain showers": "Přeháňky", "Violent showers": "Silné přeháňky", "Snow showers": "Sněhové přeháňky", "Thunderstorm": "Bouřka", "Thunderstorm, hail": "Bouřka s krupobitím", "Gebeng industrial estate; the plant is one of its sites and the position is approximate": "Průmyslová zóna Gebeng; závod je jedním z jejích provozů a poloha je přibližná", "The plant stands by the port; position approximate": "Závod stojí u přístavu; poloha je přibližná", "An underground mine, so little of it shows at the surface": "Hlubinný důl, takže na povrchu je z něj vidět jen málo", "A project: mining has not started, so there is no pit to see yet": "Projekt: těžba nezačala, takže zatím není vidět žádná jáma", "Kokkola industrial park; the refinery is one of its plants": "Průmyslový park Kokkola; rafinerie je jedním z jeho závodů", "The city and its industrial areas; the mines and smelters lie around it": "Město a jeho průmyslové areály; doly a hutě leží kolem", "Antimony workings in the hills": "Antimonové doly v kopcích", "Brine evaporation ponds on the salt flat": "Odpařovací nádrže solanky na solné pláni", "The alumina refinery at Agios Nikolaos": "Rafinerie oxidu hlinitého v Agios Nikolaos", "Position approximate": "Poloha je přibližná", "Connecting…": "Připojuji…", "Even light": "Rovnoměrné světlo", "Live sunlight": "Skutečné osvětlení", "Sentinel-2": "Sentinel-2", "Rotterdam": "Rotterdam", "Morowali (IMIP)": "Morowali (IMIP)", "Port of Lobito": "Přístav Lobito", "Port of Bunbury": "Přístav Bunbury", "Suez Canal": "Suezský průplav", "Metal prices by MetalCharts": "Metal prices by MetalCharts", "Bare ground: clearing can't be measured here": "Holá půda: odkrytí zde nelze měřit", "Language": "Jazyk", "Result": "Výsledek", "was your average miss across five questions.": "byla vaše průměrná odchylka v pěti otázkách.", "Share result": "Sdílet výsledek", "Try again": "Zkusit znovu", "No tracked system on the atlas.": "Žádný sledovaný systém v atlasu.", "None on the atlas yet.": "Zatím žádné v atlasu.", "Deadlines and stories load for viewers signed in to the AI agent.": "Termíny a zprávy se načtou po přihlášení k AI agentovi.", "Loading…": "Načítám…", "No upcoming deadlines yet.": "Zatím žádné blížící se termíny.", "No stories yet. The daily update adds new ones each morning.": "Zatím žádné zprávy. Denní aktualizace přidává nové každé ráno.", "A new brief is written every Monday morning from the week's stories.": "Nový přehled se píše každé pondělí ráno ze zpráv daného týdne.", "The 3D globe could not load. The scenarios, briefing and chokepoints below still work.": "3D glóbus se nepodařilo načíst. Scénáře, přehled a úzká místa níže fungují dál.", "This globe needs WebGL, which is turned off in this browser. The sections below still work.": "Glóbus potřebuje WebGL, které je v tomto prohlížeči vypnuté. Sekce níže fungují dál.", "China is the leading producer, but no public world total exists.": "Čína je největším výrobcem, ale veřejný světový součet neexistuje.", "News loads when signed in": "Zprávy se načtou po přihlášení", "News unavailable": "Zprávy nejsou dostupné", "Could not load": "Nepodařilo se načíst", "Show fewer": "Zobrazit méně", "The brief loads for viewers signed in to the AI agent.": "Přehled se načte po přihlášení k AI agentovi.", "No brief yet": "Zatím bez přehledu", "Monday brief": "Pondělní přehled", "Saving files isn't available in this view. Right-click or long-press the image to save it, or take a screenshot.": "Ukládání souborů v tomto zobrazení není dostupné. Obrázek uložte pravým tlačítkem nebo dlouhým stiskem, případně pořiďte snímek obrazovky.", "Card saved": "Karta uložena", "A save prompt is already open. Try again in a moment.": "Dialog pro uložení už je otevřený. Zkuste to za chvíli.", "Saving isn't available here. Right-click or long-press the image to save it.": "Ukládání zde není dostupné. Obrázek uložte pravým tlačítkem nebo dlouhým stiskem.", "Guess the share": "Hádejte podíl", "Five questions on who controls the minerals behind Europe's defence. How close can you get?": "Pět otázek o tom, kdo ovládá suroviny pro evropskou obranu. Jak blízko se trefíte?", "What if": "Co kdyby", "Supply-chain atlas": "Atlas dodavatelského řetězce", "Source": "Zdroj", "For nine of them, China makes more than 65% of world output at one stage or another, and it makes 99% of the world's primary gallium. Follow them from the mine to the refinery to the factory, and see what changes this week.": "U devíti z nich vyrábí Čína v některé fázi víc než 65 % světové produkce a u primárního galia je to 99 %. Sledujte je od dolu přes rafinerii až do továrny a podívejte se, co se tento týden změnilo.", "Gallium. China makes 99% of the world's primary gallium, and the gallium arsenide solar cells that power most satellites sit on germanium wafers, where China is also the leading producer.": "Galium. Čína vyrábí 99 % světového primárního galia a solární články z arsenidu galia, které napájejí většinu satelitů, leží na germaniových podložkách, kde je Čína také největším výrobcem.", "Gallium. Gallium nitride transmit-receive chips are the core of modern radar and electronic warfare, and China makes 99% of the world's primary gallium.": "Galium. Vysílací a přijímací čipy z nitridu galia jsou jádrem moderního radaru a elektronického boje a Čína vyrábí 99 % světového primárního galia.", "Chokepoint: gallium, 99% China": "Úzké místo: galium, 99 % Čína", "Gallium, 99% CN": "Galium, 99 % CN", "Every Monday the atlas puts together a short summary from its own data and the week's headlines: the next deadline, heat at the plants, conflict near the supply chain, tenders, imports and the top stories. It is assembled automatically; no person or AI writes or checks it. The stories below update every few hours.": "Každé pondělí atlas sestaví krátký přehled ze svých vlastních dat a titulků týdne: nejbližší termín, teplo v závodech, konflikty u dodavatelského řetězce, zakázky, dovoz a hlavní zprávy. Sestavuje se automaticky; nikdo, člověk ani AI, ho nepíše ani nekontroluje. Zprávy níže se aktualizují každých pár hodin.", "How stories get here: every few hours the atlas's updater searches open news sources for the twelve materials and adds matching headlines on its own. Those are marked “found automatically, not checked”: no person or AI reads them before they appear. Older stories marked “checked” were read and checked against their source by an automated process.": "Jak se sem zprávy dostanou: aktualizace atlasu každých pár hodin prohledá otevřené zpravodajské zdroje a sama přidá titulky o dvanácti surovinách. Ty jsou označené „nalezeno automaticky, neověřeno“: před zveřejněním je nikdo, člověk ani AI, nečte. Starší zprávy označené „ověřeno“ ověřil automatizovaný proces proti jejich zdroji.", "Your question and the atlas data go to the AI agent under your own claude.ai account and count towards your usage, like any of your AI agent chats. This atlas stores nothing you type, and the conversation is gone when you reload. The AI agent sees only this atlas, not the web, so check the linked sources. Do not paste classified or export-controlled information.": "Vaše otázka a data atlasu jdou AI agentovi pod vaším vlastním účtem claude.ai a čerpají z vašeho limitu jako kterýkoli jiný chat s AI agentem. Atlas nic z toho, co napíšete, neukládá a po obnovení stránky konverzace zmizí. AI agent vidí jen tento atlas, ne web, takže si ověřte odkazované zdroje. Nevkládejte utajované informace ani informace podléhající kontrole vývozu."};
Object.assign(CS, {"Pick the materials you answer for. Each one gets a status, what changed in the last seven days and its next deadline, and the whole view turns into a seven-slide board pack you can download.": "Vyberte suroviny, za které odpovídáte. Každá dostane stav, přehled změn za posledních sedm dní a nejbližší termín a celý pohled se promění v sedm snímků pro vedení ke stažení.", "Live layer: satellite positions are computed in your browser with the SGP4 model (satellite.js) from CelesTrak orbit data. Earthquakes come from the USGS and disaster alerts from GDACS (UN and European Commission). A scheduled task refreshes them every 3 hours.": "Živá vrstva: polohy satelitů se počítají ve vašem prohlížeči modelem SGP4 (satellite.js) z dat o drahách z CelesTraku. Zemětřesení pocházejí z USGS a výstrahy před katastrofami z GDACS (OSN a Evropská komise). Naplánovaná úloha je obnovuje každé 3 hodiny.", "Heat and gas: NASA VIIRS 375 m thermal anomalies every day and Sentinel-5P sulphur dioxide every week (NOAA-20 OMPS when Sentinel-5P is unavailable), both read from NASA GIBS map tiles. Trade: Eurostat Comext for EU imports. The stress test scales last year's imports by the months chosen; it does not forecast prices.": "Teplo a plyny: tepelné anomálie NASA VIIRS 375 m denně a oxid siřičitý ze Sentinelu-5P týdně (z družice NOAA-20, když Sentinel-5P není k dispozici), obojí odečtené z mapových dlaždic NASA GIBS. Obchod: Eurostat Comext pro dovoz do EU. Zátěžový test násobí loňský dovoz zvoleným počtem měsíců; ceny nepředpovídá.", "Copy this link to open the atlas at this view.": "Zkopírujte odkaz, který otevře atlas v tomto zobrazení.", "Landsat imagery courtesy of the U.S. Geological Survey. NASA: EMIT, FIRMS, GIBS, Blue Marble and Black Marble.": "Snímky Landsat s laskavým svolením U.S. Geological Survey. NASA: EMIT, FIRMS, GIBS, Blue Marble a Black Marble.", "Also: Eurostat, TED (EU Publications Office), UCDP (Uppsala University), USGS earthquakes, GDACS, CelesTrak, AISStream.io, WRI Aqueduct, Hansen/UMD/Google/USGS/NASA Global Forest Change, Semantic Scholar and Natural Earth. Every site, route and story links its own source.": "Dále: Eurostat, TED (Úřad pro publikace EU), UCDP (Uppsalská univerzita), zemětřesení USGS, GDACS, CelesTrak, AISStream.io, WRI Aqueduct, Hansen/UMD/Google/USGS/NASA Global Forest Change, Semantic Scholar a Natural Earth. Každá lokalita, trasa a zpráva odkazuje na svůj zdroj.", "Fonts: Hanken Grotesk and DM Mono (SIL Open Font License). Code: three.js, satellite.js and PptxGenJS (MIT licence). This page loads nothing from other websites.": "Písma: Hanken Grotesk a DM Mono (SIL Open Font License). Kód: three.js, satellite.js a PptxGenJS (licence MIT). Stránka nic nenačítá z jiných webů.", "Credits": "Poděkování a zdroje", "Privacy": "Soukromí", "This page sends nothing you type anywhere and uses no cookies, trackers or analytics. It keeps a few settings (language, sound, the materials you pick) in your own browser only. Ask the atlas and reading parts lists with AI agent exist only in the private claude.ai version.": "Tato stránka nikam neposílá nic, co napíšete, a nepoužívá cookies, sledovací kódy ani analytiku. Několik nastavení (jazyk, zvuk, vybrané suroviny) si pamatuje jen ve vašem prohlížeči. Dotazy na atlas a čtení seznamů dílů s AI agentem jsou jen v soukromé verzi na claude.ai."});
Object.assign(CS, {"OreOrbit · Critical minerals from orbit": "OreOrbit · Kritické suroviny z oběžné dráhy", "OreOrbit, back to the top": "OreOrbit, zpět nahoru", "· Critical minerals from orbit": "· Kritické suroviny z oběžné dráhy", "New name: OreOrbit. A public copy now runs on bohemiadefense.com/atlas and updates itself every three hours.": "Nový název: OreOrbit. Veřejná kopie teď běží na bohemiadefense.com/atlas a sama se aktualizuje každé tři hodiny."});
Object.assign(CS, {"Signals": "Signály", "Rules": "Pravidla", "Rules and money": "Pravidla a peníze", "What the open data says now.": "Co teď říkají otevřená data.", "EU import statistics, ship counts at the chokepoints, armed-conflict records, defence tenders and research on substitutes. Each panel names its source and how fresh it is.": "Statistiky dovozu do EU, počty lodí v úzkých místech, záznamy ozbrojených konfliktů, obranné zakázky a výzkum náhrad. Každý panel uvádí zdroj a stáří dat.", "The deadline and the money.": "Termín a peníze.", "A US rule that reaches back to the mine on 1 January 2027, the public money now flowing into supply outside China, and how buyers check where tungsten was smelted.": "Americké pravidlo, které 1. ledna 2027 sáhne až k dolu, veřejné peníze proudící do dodávek mimo Čínu a jak kupci ověřují, kde byl wolfram vytaven.", "Armed conflict": "Ozbrojený konflikt", "UCDP events near sites and Bab-el-Mandeb": "Události UCDP u lokalit a Bab al-Mandabu", "Eurostat Comext: EU imports by origin": "Eurostat Comext: dovoz do EU podle původu", "IMF PortWatch: ship traffic": "IMF PortWatch: lodní provoz", "UCDP: armed-conflict events": "UCDP: události ozbrojených konfliktů", "TED: EU public tenders": "TED: veřejné zakázky EU", "WRI Aqueduct 4.0: water stress": "WRI Aqueduct 4.0: vodní stres", "Hansen/UMD Global Forest Change v1.12": "Hansen/UMD Global Forest Change v1.12", "Semantic Scholar: research counts": "Semantic Scholar: počty výzkumných prací", "Signals: ship counts refresh weekly, EU imports, tenders and conflict records monthly, all through the same scheduled task. Owners, public funding and the US rule are checked by hand and dated. Water stress, tree-cover loss and research counts are fixed snapshots.": "Signály: počty lodí se obnovují týdně, dovoz do EU, zakázky a záznamy konfliktů měsíčně, vše stejnou naplánovanou úlohou. Vlastníky, veřejné financování a americké pravidlo ověřujeme ručně a datujeme. Vodní stres, ztráta porostu a počty prací jsou pevné snímky.", "Changelog": "Historie změn", "Signals and Rules: EU imports by origin, ship traffic, armed conflict, tenders, research on substitutes, the 2027 US rule, public funding, owners, water and forest around each site, reading lenses, a one-page brief, a team watchlist and comments.": "Signály a Pravidla: dovoz do EU podle původu, lodní provoz, ozbrojené konflikty, zakázky, výzkum náhrad, americké pravidlo 2027, veřejné financování, vlastníci, voda a les v okolí lokalit, pohledy pro různé čtenáře, jednostránkový přehled, sledování týmu a komentáře.", "Mine change maps in hectares, weekly new images, hazard alerts by email and push, Ask the atlas, metal prices, Czech version.": "Mapy změn dolů v hektarech, nové snímky každý týden, výstrahy e-mailem a push oznámeními, Zeptej se atlasu, ceny kovů, česká verze.", "Live satellites, hazards, weather and 3D terrain at every mine.": "Živé satelity, hrozby, počasí a 3D terén u každého dolu.", "First version: globe, 31 sites, 9 routes, quiz, scenarios and a daily news wire.": "První verze: glóbus, 31 lokalit, 9 tras, kvíz, scénáře a denní zpravodajství.", "UMCC (NEQSOL Holding since June 2025)": "UMCC (od června 2025 NEQSOL Holding)", "Armed conflict: ": "Ozbrojený konflikt: "});
let LANG = "en";
(function pickLang() {
  let v = null;
  /* build 56: ?lang= wins (index.php already rendered the page in it) and is remembered */
  const q = /[?&]lang=(cs|en)(?:&|$)/.exec(location.search || "");
  if (q) { v = q[1]; try { localStorage.setItem("cma-lang", v); } catch (e) { /* storage blocked */ } }
  if (!v) { try { v = localStorage.getItem("cma-lang"); } catch (e) { v = null; } }
  if (!v) { const m = /(?:^|;)cma-lang=(cs|en)/.exec(window.name || ""); if (m) v = m[1]; }
  LANG = v === "cs" || v === "en" ? v : (/^(cs|sk)\b/i.test(navigator.language || "") ? "cs" : "en");
})();
const ooNb0 = (t) => typeof t !== "string" ? t : t.replace(/(^|[\s\u00a0(„“])([vkszaiouVKSZAIOU]) +(?=\S)/g, "$1$2\u00a0").replace(/(^|[\s\u00a0(„“])([vkszaiouVKSZAIOU]) +(?=\S)/g, "$1$2\u00a0");   /* Czech: no single-letter word at a line end (brand book p. 36) */
const T = (en, cs) => (LANG === "cs" ? ooNb0(cs) : en);
const MON_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MON_CS_GEN = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"];
const MON_CS_NOM = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];
const MON_RX = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
const MON_CS_LOC = ["lednu", "únoru", "březnu", "dubnu", "květnu", "červnu", "červenci", "srpnu", "září", "říjnu", "listopadu", "prosinci"];   /* build 56: "v srpnu 2026" */
/* build 56: Czech "z" or "ze" before a number, by how the number is read ("ze 49 %", "z 59 %") */
const zeZ = (n) => { n = Math.abs(Math.round(+n)); const t = Math.floor(n / 10); return (n < 10 ? [2, 3, 4, 6, 7].includes(n) : n < 20 ? [12, 13, 14, 16, 17].includes(n) : n < 100 ? [2, 3, 4, 6, 7].includes(t) : n < 200) ? "ze" : "z"; };
const csPlural = (n, one, few, many) => (n === 1 ? one : n >= 2 && n <= 4 ? few : many);
const trPiece = (s) => { const k = String(s).trim(); return CS[k] !== undefined ? CS[k] : k; };
const CS_LEVEL = { red: "červená", orange: "oranžová", yellow: "žlutá", green: "zelená" };
const CS_RX = [
  [/^Live sunlight · (\d\d:\d\d) UTC$/, (m, t) => `Skutečné osvětlení · ${t} UTC`],
  [/^Sunlight (\d\d:\d\d) UTC$/, (m, t) => `Osvětlení ${t} UTC`],
  [/^(\d+) near supply chain$/, (m, n) => `${n} ${csPlural(+n, "hrozba", "hrozby", "hrozeb")} u dodavatelského řetězce`],
  [/^in (\d+) days?$/, (m, n) => `za ${n} ${csPlural(+n, "den", "dny", "dní")}`],
  [/^in (\d+ d \d+ h|\d+ h \d+ min|\d+ min \d+ s)$/, (m, x) => `za ${x}`],
  [/^now$/, () => "teď"],
  [/^likely clear · (\d+)% cloud$/, (m, n) => `spíš jasno · oblačnost ${n} %`],
  [/^partly cloudy · (\d+)%$/, (m, n) => `polojasno · ${n} %`],
  [/^likely cloudy · (\d+)%$/, (m, n) => `spíš zataženo · ${n} %`],
  [/^Cloud (\d+)%$/, (m, n) => `Oblačnost ${n} %`],
  [/^Wind (\d+) km\/h$/, (m, n) => `Vítr ${n} km/h`],
  [/^Rain ([\d.]+) mm$/, (m, n) => `Srážky ${n} mm`],
  [/^M(\d+\.\d) · (red|orange|yellow|green)$/, (m, x, l) => `M${x} · ${CS_LEVEL[l]}`],
  [/^Magnitude ([\d.]+) earthquake$/, (m, x) => `Zemětřesení o magnitudě ${x}`],
  [/^Tropical Cyclone (.+)$/, (m, x) => `Tropická cyklóna ${x}`],
  [/^Earthquake in (.+)$/, (m, x) => `Zemětřesení: ${csPlaces(x)}`],
  [/^Flood in (.+)$/, (m, x) => `Povodeň: ${csPlaces(x)}`],
  [/^Forest fires? in (.+)$/, (m, x) => `Lesní požár: ${csPlaces(x)}`],
  [/^Drought in (.+)$/, (m, x) => `Sucho: ${csPlaces(x)}`],
  [/^Depth (\d+) km( · tsunami flag raised)?$/, (m, n, ts) => `Hloubka ${n} km${ts ? " · vyhlášena výstraha před tsunami" : ""}`],
  [/^(red|orange|yellow|green) alert$/, (m, l) => `${CS_LEVEL[l]} výstraha`],
  [/^(\d+) vessels? reporting, (\d+) under way$/, (m, a, b) => `${a} ${csPlural(+a, "plavidlo hlásí", "plavidla hlásí", "plavidel hlásí")} polohu, ${b} v pohybu`],
  [/^(\d+) km from the (.+) route$/, (m, n, r) => `${n} km od trasy ${trPiece(r)}`],
  [/^(\d+) km from (.+)$/, (m, n, s) => `${n} km od lokality ${trPiece(s)}`],
  [/^(\d+) live hazards on the globe: (\d+) earthquakes M5\+ from the past week and (\d+) GDACS alerts\.$/, (m, a, b, c) => `Na glóbu je ${a} živých rizik: ${b} zemětřesení M5+ za poslední týden a ${c} výstrah GDACS.`],
  [/^None of the (\d+) current alerts lies within 500 km of an atlas site or 300 km of a route\.$/, (m, n) => `Žádná z ${n} aktuálních výstrah neleží do 500 km od lokality atlasu ani do 300 km od trasy.`],
  [/^USGS earthquake feed: magnitude 5 and above, past 7 days( · fetched (.+))?\. Distance alone says nothing about damage; read the report\.$/, (m, f, x) => `Zdroj USGS: zemětřesení od magnitudy 5 za posledních 7 dní${f ? ` · načteno ${x}` : ""}. Samotná vzdálenost nic neříká o škodách; přečtěte si zprávu.`],
  [/^GDACS: the Global Disaster Alert and Coordination System of the UN and the European Commission( · fetched (.+))?\. Distance alone says nothing about damage; read the report\.$/, (m, f, x) => `GDACS: globální systém výstrah a koordinace při katastrofách OSN a Evropské komise${f ? ` · načteno ${x}` : ""}. Samotná vzdálenost nic neříká o škodách; přečtěte si zprávu.`],
  [/^Now at the site · Open-Meteo, (.+)$/, (m, x) => `Teď v lokalitě · Open-Meteo, ${x}`],
  [/^(.+) your time · (\d+) km off the track$/, (m, d, n) => `${d} (váš čas) · ${n} km od středu dráhy`],
  [/^Computed in your browser from CelesTrak orbit data \((.+)\)\. A pass means the site is inside the camera's swath in daylight; the mission decides whether it records\.( Cloud is the Open-Meteo forecast for that hour\.)?$/, (m, a, c) => `Vypočteno ve vašem prohlížeči z dat o drahách z CelesTraku (${a}). Přelet znamená, že lokalita je za denního světla v záběru kamery; zda se snímek pořídí, rozhoduje mise.${c ? " Oblačnost je předpověď Open-Meteo na danou hodinu." : ""}`],
  [/^Last Sentinel-2 pass on record: (.+?), (\d+)% cloud over the tile( · last fairly clear tile: (.+?))? · Earth Search$/, (m, d, n, c, cd) => `Poslední zaznamenaný přelet Sentinelu-2: ${d}, oblačnost dlaždice ${n} %${c ? ` · poslední poměrně jasná dlaždice: ${cd}` : ""} · Earth Search`],
  [/^Position computed live in your browser with the SGP4 model from CelesTrak orbit data( dated (.+?))?\. The globe follows the satellite; drag to look around\.$/, (m, f, d) => `Poloha se počítá živě ve vašem prohlížeči modelem SGP4 z dat o drahách z CelesTraku${f ? ` ze dne ${d}` : ""}. Glóbus satelit sleduje; tažením se rozhlédnete.`],
  [/^(.+) seen by Sentinel-2 on (.+)$/, (m, s, d) => `${trPiece(s)} na snímku Sentinel-2 z ${d}`],
  [/^Cleared since (\d{4}): about ([\d,]+) ha$/, (m, y, n) => `Odlesněno či odkryto od ${y}: asi ${n} ha`],
  [/^Vegetation lost since (\d{4}): about ([\d,]+) ha$/, (m, y, n) => `Úbytek vegetace od ${y}: asi ${n} ha`],
  [/^No clearing detected since (\d{4})$/, (m, y) => `Od ${y} nezjištěno žádné odkrytí`],
  [/^Bare ground: clearing can't be measured here$/, () => "Holá půda: odkrytí zde nelze měřit"],
  [/^(.+) in 3D$/, (m, s) => `${trPiece(s)} ve 3D`],
  [/^Real elevation draped with the Sentinel-2 image from (.+), about (\d+) km across\. Height exaggerated ([\d.]+)×\.$/, (m, d, k, x) => `Skutečný terén potažený snímkem Sentinel-2 z ${d}, asi ${k} km napříč. Výška převýšena ${x}×.`],
  [/^Spot, (.+)$/, (m, x) => `Spotová cena, ${x}`],
  [/^Monthly average, (.+?)( ·)?$/, (m, x, d) => `Měsíční průměr, ${x}${d || ""}`],
  [/^([+-]\d+)% since (.+)$/, (m, n, x) => `${n} % od ${x.replace(new RegExp("^" + MON_RX + " (\\d{4})$"), (q, mo, y) => MON_CS_GEN[MON_EN.indexOf(mo)] + " " + y)}`],   // build 56: "od října 2023"
  [/^([+-][\d.]+)% 24 h$/, (m, n) => `${n} % za 24 h`],
  [/^A real position report broadcast by the ship and received by AISStream\.io(, collected (.+))?\. The ship has moved on since\. Not every ship near a chokepoint carries minerals\.$/, (m, f, x) => `Skutečné hlášení polohy, které loď vyslala a zachytil AISStream.io${f ? `, načteno ${x}` : ""}. Loď mezitím plula dál. Ne každá loď u úzkého místa veze suroviny.`],
  [/^Explore (.+)$/, (m, x) => { const t = trPiece(x); return t === x.trim() ? m : `Prozkoumat: ${t}`; }],   // build 56: never half-translate
  [/^The (.+) ore$/, (m, x) => `Ruda: ${trPiece(x.charAt(0).toUpperCase() + x.slice(1)).toLowerCase()}`],
  [/^Biggest chokepoint: (.+)$/, (m, x) => `Největší úzké místo: ${trPiece(x.charAt(0).toUpperCase() + x.slice(1)).toLowerCase()}`],
  [/^Question (\d+) of (\d+)$/, (m, a, b) => `Otázka ${a} ${zeZ(b)} ${b}`],
  [/^Lock in (\d+)%$/, (m, n) => `Potvrdit ${n} %`],
  [/^Show all (\d+) stories$/, (m, n) => `Zobrazit všech ${n} zpráv`],
  [/^Updated daily · (.+)$/, (m, d) => `Aktualizováno denně · ${d}`],
  [/^Updated (.+)$/, (m, d) => `Aktualizováno ${d}`],
  [/^Monday brief · week of (.+)$/, (m, d) => `Pondělní přehled · týden od ${d}`],
  [/^Week of (.+)$/, (m, d) => `Týden od ${d}`],
  [/^Assembled automatically( on (.+))? from stories it read and checked against their sources\. Not reviewed by a person\. Check the linked sources before quoting\.$/, (m, f, d) => `Napsala naplánovaná úloha AI agenta${f ? ` dne ${d}` : ""} ze zpráv, které přečetla a ověřila proti jejich zdrojům. Člověk text nekontroloval. Před citací si ověřte odkazované zdroje.`],
  [/^Verified against (.+) on (.+)$/, (m, src, d) => src === "the source" ? `Ověřeno podle původního zdroje dne ${d}` : `Ověřeno podle zdroje ${src} dne ${d}`],
  [/^(\d+) tracked materials?$/, (m, n) => `${n} ${csPlural(+n, "sledovaná surovina", "sledované suroviny", "sledovaných surovin")}`],
  [/^(\d+) materials?$/, (m, n) => `${n} ${csPlural(+n, "surovina", "suroviny", "surovin")}`],
  [/^(\d+) km swath$/, (m, n) => `pás ${n} km`],
  [/^(.+) · (Rare earths|Titanium|Tungsten|Antimony|Magnesium|Manganese|Gallium|Germanium|Lithium|Cobalt|Nickel|Graphite)$/, (m, a, b) => `${trPiece(a)} · ${trPiece(b)}`],
  [/^(Rare earths|Titanium|Tungsten|Antimony|Magnesium|Manganese|Gallium|Germanium|Lithium|Cobalt|Nickel|Graphite) · (mine|processing|magnets|planned)$/, (m, a, b) => `${trPiece(a)} · ${{ mine: "důl", processing: "zpracování", magnets: "magnety", planned: "plánováno" }[b]}`],
  [/^Source: (.+)$/, (m, x) => `Zdroj: ${x}`],
  [/^(\d+) points$/, (m, n) => `${n} ${csPlural(+n, "bod", "body", "bodů")}`],
  [/^You guessed below the real figure (\d+) times? out of five\.( Supply is even more concentrated than it feels\.)?$/, (m, n, x) => `Pod skutečným číslem jste odhadli ${n}× z pěti.${x ? " Dodávky jsou ještě koncentrovanější, než se zdá." : ""}`],
  [/^Nothing matches "(.*)"\. Try a country, a mine or an element\.$/, (m, q) => `Nic neodpovídá „${q}“. Zkuste zemi, důl nebo prvek.`],
  [/^I missed by (\d+) points on average$/, (m, n) => `Průměrně jsem se spletl o ${n} ${csPlural(+n, "bod", "body", "bodů")}`]
];
function csDates(s) {
  return s
    .replace(new RegExp(`\\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\\d{1,2}) ${MON_RX}, (\\d\\d:\\d\\d)`, "g"), (m, w, d, mo, t) => `${{ Mon: "po", Tue: "út", Wed: "st", Thu: "čt", Fri: "pá", Sat: "so", Sun: "ne" }[w]} ${d}. ${MON_EN.indexOf(mo) + 1}. ${t}`)
    .replace(new RegExp(`\\b(\\d{1,2}) ${MON_RX} (\\d{4})\\b`, "g"), (m, d, mo, y) => `${d}. ${MON_CS_GEN[MON_EN.indexOf(mo)]} ${y}`)
    .replace(new RegExp(`\\b(\\d{1,2}) ${MON_RX}\\b`, "g"), (m, d, mo) => `${d}. ${MON_CS_GEN[MON_EN.indexOf(mo)]}`)
    .replace(new RegExp(`\\b${MON_RX} (\\d{4})\\b`, "g"), (m, mo, y) => `${MON_CS_NOM[MON_EN.indexOf(mo)]} ${y}`);
}
function csNumbers(s) {
  return s
    .replace(/(\d),(\d{3})(?=\D|$)/g, "$1\u00a0$2").replace(/(\d),(\d{3})(?=\D|$)/g, "$1\u00a0$2")
    .replace(/(\d)\.(\d)(?!\d*-\d)/g, "$1,$2")
    .replace(/(\d)%/g, "$1\u00a0%");
}
/* build 56: hero buttons, ask-the-atlas note, operators, sources and funding labels that had no Czech */
Object.assign(CS, {"Check your product in 60 seconds": "Prověřte svůj výrobek za 60 sekund", "Explore the globe": "Prozkoumat glóbus", "Answers come only from this atlas. Check the linked sources before quoting.": "Odpovědi vycházejí jen z tohoto atlasu. Před citováním ověřte odkazované zdroje.", "Geomet (ČEZ group 51%, European Metals 49%)": "Geomet (skupina ČEZ 51 %, European Metals 49 %)", "Tsingshan-led industrial park": "průmyslový park pod vedením Tsingshanu", "USGS MCS 2026 (rare-earth oxide)": "USGS MCS 2026 (oxidy vzácných zemin)", "USGS MCS 2026 (titanium minerals)": "USGS MCS 2026 (titanové minerály)", "US–Ukraine Reconstruction Investment Fund": "Americko-ukrajinský investiční fond pro obnovu", "US Export-Import Bank": "Exportně-importní banka USA", "US DFC and Development Bank of Southern Africa": "Americká agentura DFC a Rozvojová banka jižní Afriky", "European Commission (RESourceEU)": "Evropská komise (RESourceEU)", "European Commission": "Evropská komise", "EU Just Transition Fund, Estonia": "Fond EU pro spravedlivou transformaci, Estonsko", "US Department of Defense": "Ministerstvo obrany USA", "Government of Estonia": "Vláda Estonska", "~$30m": "asi 30 mil. USD", "$2.9bn": "2,9 mld. USD", "$553m + $200m": "553 mil. USD + 200 mil. USD", "€3bn": "3 mld. €", "$400m + $150m loan": "400 mil. USD + úvěr 150 mil. USD", "€22.5bn capex": "investice 22,5 mld. €"});
function trStr(s) { const r = trStr0(s); return (LANG === "cs" && typeof r === "string") ? ooNb0(r) : r; }
function trStr0(s) {
  if (LANG !== "cs" || !s) return s;
  const k = s.replace(/\s+/g, " ").trim();
  if (!k || !/[A-Za-z]/.test(k)) return s.replace(k, csNumbers(k));
  let v = CS[k];
  if (v === undefined) {
    for (const [rx, fn] of CS_RX) { const m = k.match(rx); if (m) { v = fn(...m); break; } }
  }
  if (v === undefined) v = k;
  v = csNumbers(csDates(v));
  if (v === k) return s;
  const lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0];
  return lead + v + trail;
}
const TR_ATTRS = ["aria-label", "title", "placeholder", "alt"];
function trNode(root) {
  if (LANG !== "cs" || !root) return;
  if (root.nodeType === 3) {
    const p = root.parentNode;
    if (p && p.nodeType === 1 && (p.tagName === "SCRIPT" || p.tagName === "STYLE" || p.closest("[data-notr]"))) return;
    const v = trStr(root.nodeValue); if (v !== root.nodeValue) root.nodeValue = v; return;
  }
  if (root.nodeType !== 1 || root.closest("[data-notr]") || root.tagName === "SCRIPT" || root.tagName === "STYLE") return;
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode(n) { return n.nodeType === 1 && (n.tagName === "SCRIPT" || n.tagName === "STYLE" || n.hasAttribute("data-notr")) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; }
  });
  let n = root;
  do {
    if (n.nodeType === 3) { const v = trStr(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; }
    else for (const a of TR_ATTRS) { const x = n.getAttribute(a); if (x) { const v = trStr(x); if (v !== x) n.setAttribute(a, v); } }
  } while ((n = tw.nextNode()));
}
if (LANG === "cs") {
  document.documentElement.lang = "cs";
  try { document.title = trStr(document.title); } catch (e) { /* ignore */ }
  trNode(document.body);
  new MutationObserver((ms) => {
    for (const m of ms) {
      if (m.type === "characterData") trNode(m.target);
      else if (m.type === "attributes") { const x = m.target.getAttribute(m.attributeName); if (x) { const v = trStr(x); if (v !== x) m.target.setAttribute(m.attributeName, v); } }
      else m.addedNodes.forEach(trNode);
    }
  }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: TR_ATTRS });
}
function setLang(l) {
  try { localStorage.setItem("cma-lang", l); } catch (e) { /* storage blocked: window.name keeps it across the reload */ }
  try { window.name = (window.name || "").replace(/(?:^|;)cma-lang=(cs|en)/g, "") + ";cma-lang=" + l; } catch (e) { /* ignore */ }
  if (l === LANG) return;
  /* build 56: go to that language's URL, so index.php renders the opening in it and nothing is half-translated */
  try { const u = new URL(location.href); if (l === "cs") u.searchParams.set("lang", "cs"); else u.searchParams.delete("lang"); if (u.href !== location.href) { location.href = u.href; return; } } catch (e) { /* old browser: reload */ }
  location.reload();
}

/* ================= data ================= */
const GROUPS = [
  { name: "Defence", m: ["ree", "ti", "w", "sb", "mg", "mn"] },
  { name: "Electronics", m: ["ga", "ge"] },
  { name: "Batteries", m: ["li", "co", "ni", "gr"] }
];
const ORDER = GROUPS.flatMap((g) => g.m);

/* bright pin colours for the globe, which is dark in both themes */
const PIN = {
  ree: "#a78bfa", ti: "#fb923c", w: "#facc15", sb: "#a9b8cc",
  ga: "#22d3ee", ge: "#4ade80",
  li: "#f472b6", co: "#60a5fa", ni: "#a3e635", gr: "#e4e4e7",
  mg: "#2dd4bf", mn: "#e879f9"
};

/* v42: Czech for the magnesium and manganese texts */
Object.assign(CS, {"Magnesium": "Hořčík", "Manganese": "Mangan", "primary metal, 2025": "primární kov, 2025", "manganese metal refining": "rafinace kovového manganu", "of world primary magnesium was made in China in 2025 (950 of about 1,100 kt)": "světového primárního hořčíku vyrobila v roce 2025 Čína (950 z asi 1 100 kt)", "of the EU's primary magnesium comes from China; the EU has no smelter of its own": "primárního hořčíku EU pochází z Číny; EU nemá vlastní huť", "Titanium production (the Kroll process), infrared decoy flares, pyrotechnics and light alloys for airframes and armour.": "Výroba titanu (Krollův proces), infračervené klamné cíle, pyrotechnika a lehké slitiny pro letadla a pancéřování.", "The EU has no primary magnesium smelter. The Critical Raw Materials Act lists magnesium as strategic and aims to keep any single supplier below 65% by 2030.": "EU nemá žádnou huť na primární hořčík. Nařízení o kritických surovinách řadí hořčík mezi strategické suroviny a do roku 2030 chce, aby žádný dodavatel nepřesáhl 65 %.", "The rock Chinese smelters heat with ferrosilicon to make most of the world's magnesium. Grows in curved, saddle-shaped crystals.": "Hornina, kterou čínské hutě zahřívají s ferosiliciem a vyrábějí z ní většinu světového hořčíku. Tvoří zakřivené, sedlovité krystaly.", "of world electrolytic manganese metal capacity is in China": "světové kapacity elektrolytického manganu je v Číně", "of world manganese ore came from South Africa in 2025 (7.6 of 20 Mt manganese content)": "světové manganové rudy pocházelo v roce 2025 z Jižní Afriky (7,6 z 20 Mt obsahu manganu)", "Steel for armour, shells and vehicles (about 90% of all manganese) and battery cathodes for drones and soldier power.": "Ocel pro pancéřování, granáty a vozidla (asi 90 % veškerého manganu) a katody baterií pro drony a napájení vojáků.", "Europe has no operating manganese mine. Chvaletice in the Czech Republic, an EU strategic project, plans battery-grade manganese from old tailings, with a feasibility study due in the first half of 2027.": "Evropa nemá žádný činný manganový důl. Chvaletice, strategický projekt EU, chtějí vyrábět mangan pro baterie ze starých kalů; studie proveditelnosti má být hotová v první polovině roku 2027.", "A pink manganese carbonate. Most manganese ore is the black oxide pyrolusite, but rhodochrosite shows the metal's colour.": "Růžový uhličitan manganatý. Většinu manganové rudy tvoří černý oxid pyroluzit, rodochrozit ale ukazuje barvu tohoto kovu.", "Dolomite": "Dolomit", "Rhodochrosite": "Rodochrozit", "Primary magnesium metal": "Primární hořčík", "Ore (manganese content)": "Ruda (obsah manganu)", "Electrolytic manganese metal": "Elektrolytický mangan", "capacity, SMM 2026": "kapacita, SMM 2026", "Primary magnesium metal (smelter production)": "Primární hořčík (výroba hutí)", "Mine output, manganese content": "Těžba, obsah manganu", "Fugu and Yulin smelters": "Hutě Fu-ku a Jü-lin", "Dead Sea Magnesium": "Dead Sea Magnesium", "RIMA magnesium": "Hořčík RIMA", "Solikamsk magnesium works": "Hořčíkové závody Solikamsk", "Ust-Kamenogorsk titanium-magnesium plant": "Titan-hořčíkový závod Ust-Kamenogorsk", "US Magnesium (idle)": "US Magnesium (mimo provoz)", "Kalahari Manganese Field": "Kalaharské manganové pole", "Moanda manganese mine": "Manganový důl Moanda", "Nsuta manganese mine": "Manganový důl Nsuta", "Groote Eylandt": "Groote Eylandt", "Manganese Triangle refineries": "Rafinerie manganového trojúhelníku", "Chvaletice manganese project": "Manganový projekt Chvaletice", "Centre of China's magnesium smelting (the Pidgeon process)": "Centrum čínské výroby hořčíku (Pidgeonův proces)", "China made about 950 of the world's 1,100 kt of primary magnesium in 2025 (USGS)": "Čína vyrobila v roce 2025 asi 950 z 1 100 kt světového primárního hořčíku (USGS)", "Most of the world's magnesium is made here.": "Tady vzniká většina světového hořčíku.", "Electrolytic magnesium from Dead Sea brine": "Elektrolytický hořčík ze solanky Mrtvého moře", "Israel produced about 20 kt of magnesium in 2025 (USGS)": "Izrael vyrobil v roce 2025 asi 20 kt hořčíku (USGS)", "One of the few large smelters outside China.": "Jedna z mála velkých hutí mimo Čínu.", "Brazil produced about 20 kt of magnesium in 2025 (USGS)": "Brazílie vyrobila v roce 2025 asi 20 kt hořčíku (USGS)", "The only primary magnesium in the Americas still running.": "Jediná primární výroba hořčíku v Americe, která ještě běží.", "Russia produced about 60 kt of magnesium in 2025 (USGS)": "Rusko vyrobilo v roce 2025 asi 60 kt hořčíku (USGS)", "Magnesium here also feeds titanium production": "Zdejší hořčík slouží i k výrobě titanu", "Russia is the second producer after China.": "Rusko je druhým výrobcem po Číně.", "Kazakhstan produced about 13 kt of magnesium in 2025 (USGS)": "Kazachstán vyrobil v roce 2025 asi 13 kt hořčíku (USGS)", "Makes magnesium and titanium sponge on one site": "Vyrábí hořčík i titanovou houbu na jednom místě", "Shows how titanium depends on magnesium.": "Ukazuje, jak titan závisí na hořčíku.", "The only US primary magnesium smelter stopped producing in 2022": "Jediná americká huť na primární hořčík přestala vyrábět v roce 2022", "Its operator filed for bankruptcy in September 2025 (USGS)": "Její provozovatel v září 2025 vyhlásil bankrot (USGS)", "Why the West now buys its magnesium from China.": "Proč Západ dnes kupuje hořčík z Číny.", "South Africa mined 7.6 of the world's 20 Mt of manganese in 2025 (USGS)": "Jižní Afrika vytěžila v roce 2025 7,6 z 20 Mt světového manganu (USGS)", "Holds about a third of world reserves": "Má asi třetinu světových zásob", "The largest manganese source on Earth.": "Největší zdroj manganu na Zemi.", "Gabon mined about 5.0 Mt of manganese in 2025, second after South Africa (USGS)": "Gábon vytěžil v roce 2025 asi 5,0 Mt manganu, druhý po Jižní Africe (USGS)", "High-grade ore, shipped through Owendo": "Vysoce kvalitní ruda, vyvážená přes přístav Owendo", "One of the richest manganese deposits.": "Jedno z nejbohatších ložisek manganu.", "Ghana mined about 2.0 Mt of manganese in 2025 (USGS)": "Ghana vytěžila v roce 2025 asi 2,0 Mt manganu (USGS)", "Africa's fast-growing third producer.": "Rychle rostoucí třetí producent Afriky.", "Restarted in May 2025 after a cyclone stopped it in 2024 (USGS)": "Znovu spuštěn v květnu 2025 poté, co ho v roce 2024 zastavil cyklón (USGS)", "Australia mined about 1.6 Mt of manganese in 2025": "Austrálie vytěžila v roce 2025 asi 1,6 Mt manganu", "Shows how one storm can cut supply.": "Ukazuje, jak jediná bouře přeruší dodávky.", "China holds over 95% of world electrolytic manganese metal capacity (SMM)": "Čína má přes 95 % světové kapacity elektrolytického manganu (SMM)", "The cluster spans Guangxi, Guizhou and Hunan": "Oblast zasahuje do provincií Kuang-si, Kuej-čou a Chu-nan", "Where almost all refined manganese is made.": "Tady vzniká téměř všechen rafinovaný mangan.", "Plans battery-grade manganese from old mine tailings": "Chce vyrábět mangan pro baterie ze starých důlních kalů", "EU strategic project; feasibility study due in the first half of 2027": "Strategický projekt EU; studie proveditelnosti v první polovině roku 2027", "Europe's best chance of its own manganese.": "Největší šance Evropy na vlastní mangan.", "South African manganese to China": "Jihoafrický mangan do Číny", "Gabonese manganese to China": "Gabonský mangan do Číny", "Chinese refineries": "Čínské rafinerie", "Moanda, Gabon": "Moanda, Gábon", "South Africa mined 7.6 of the world's 20 Mt of manganese in 2025; most of the ore is refined in China, which holds over 95% of manganese metal capacity.": "Jižní Afrika vytěžila v roce 2025 7,6 z 20 Mt světového manganu; většina rudy se zpracovává v Číně, která má přes 95 % kapacity kovového manganu.", "Gabon mined about 5.0 Mt of manganese in 2025, second after South Africa; the ore leaves by rail to the port of Owendo.": "Gábon vytěžil v roce 2025 asi 5,0 Mt manganu, druhý po Jižní Africe; ruda míří po železnici do přístavu Owendo.", "Magnesium in infrared decoy flares and tracers": "Hořčík v infračervených klamných cílech a svítících nábojích", "Manganese in the steel of shells and casings": "Mangan v oceli granátů a nábojnic", "Manganese in NMC and LMFP cathodes": "Mangan v katodách NMC a LMFP", "Magnesium turns titanium ore into titanium metal": "Hořčík mění titanovou rudu na kovový titan", "Manganese in the battery cathodes": "Mangan v katodách baterií", "Yulin, Shaanxi": "Jü-lin, Šen-si", "Rowley, Utah": "Rowley, Utah", "Hotazel, Northern Cape": "Hotazel, Severní Kapsko", "Songtao, Guizhou": "Sung-tchao, Kuej-čou", "Chvaletice, Pardubice Region": "Chvaletice, Pardubický kraj", "Oskemen": "Öskemen", "Solikamsk, Perm Krai": "Solikamsk, Permský kraj", "Northern Territory": "Severní teritorium", "Bocaiúva, Minas Gerais": "Bocaiúva, Minas Gerais", "Sdom": "Sdom", "Nsuta, Western Region": "Nsuta, Západní region", "Moanda, Haut-Ogooué": "Moanda, Horní Ogooué"});
/* build 56: Czech for the production-table notes and the sites added with magnesium and manganese */
Object.assign(CS, { "China leads refining; no public world total is published": "Čína vede v rafinaci; světový součet není veřejný", "IEA, Oct 2025": "IEA, říjen 2025",
  "Bocaiúva, Minas Gerais, Brazil": "Bocaiúva, Minas Gerais, Brazílie", "Chvaletice, Pardubice Region, Czechia": "Chvaletice, Pardubický kraj, Česko", "Hotazel, Northern Cape, South Africa": "Hotazel, Severní Kapsko, Jihoafrická republika", "Moanda, Haut-Ogooué, Gabon": "Moanda, Horní Ogooué, Gabon", "Northern Territory, Australia": "Severní teritorium, Austrálie", "Nsuta, Western Region, Ghana": "Nsuta, Západní region, Ghana", "Oskemen, Kazakhstan": "Oskemen, Kazachstán", "Rowley, Utah, United States": "Rowley, Utah, Spojené státy", "Sdom, Israel": "Sdom, Izrael", "Solikamsk, Perm Krai, Russia": "Solikamsk, Permský kraj, Rusko", "Songtao, Guizhou, China": "Sung-tchao, Kuej-čou, Čína", "Yulin, Shaanxi, China": "Jü-lin, Šen-si, Čína" });

/* build 57: Czech for the data-audit texts */
Object.assign(CS, {"Rio Tinto put the project on care and maintenance in November 2025, citing slow permitting": "Rio Tinto v listopadu 2025 převedl projekt do útlumu kvůli pomalému povolování", "early 2027": "začátek roku 2027", "Tanzania": "Tanzanie", "EU picks 46 more strategic projects (second call)": "EU vybírá dalších 46 strategických projektů (druhá výzva)", "Talga Vittangi: target final investment decision": "Talga Vittangi: cílové konečné investiční rozhodnutí"});
const MATERIALS = {
  ree: {
    name: "Rare earths", group: "Defence",
    share: { pct: 69, who: "China", what: "mine output, 2025" },
    stats: [
      { num: "69%", what: "of world rare-earth mine output came from China in 2025 (270,000 of about 390,000 t)", src: "USGS MCS 2026" },
      { num: "44 Mt", what: "of the world's more than 75 million tonnes of reserves are in China", src: "USGS MCS 2026" }
    ],
    uses: "Neodymium-iron-boron magnets for electric motors, drones, missile fins and guidance actuators, and aircraft systems.",
    europe: "Europe mines almost no rare earths. Estonia is the exception on the processing side: separation in Sillamäe and Europe's largest magnet plant in Narva.",
    spec: { mineral: "Bastnäsite", formula: "(Ce,La,Nd)CO₃F", note: "The main rare-earth ore at Bayan Obo and Mountain Pass. Forms honey-brown hexagonal plates." }
  },
  ti: {
    name: "Titanium", group: "Defence",
    share: { pct: 70, who: "China", what: "titanium sponge, 2025" },
    stats: [
      { num: "70%", what: "of world titanium sponge output came from China in 2025 (260,000 of about 370,000 t)", src: "USGS MCS 2026" },
      { num: "370 kt", what: "of titanium sponge was produced worldwide in 2025, up from about 200 kt in 2018", src: "USGS MCS 2026; USGS SIR 2025-5021" }
    ],
    uses: "Airframes, jet engines, armour, and satellite and launcher structures.",
    europe: "Norway's Tellnes is one of Europe's largest titanium mines. Ukraine's ilmenite deposits at Irshansk and Vilnohirsk are a strategic asset; Irshansk restarted in 2023 after a war-related shutdown.",
    spec: { mineral: "Rutile", formula: "TiO₂", note: "Rutile and ilmenite are the main titanium ores. Tellnes and the Ukrainian sites mine ilmenite; Richards Bay produces both." }
  },
  w: {
    name: "Tungsten", group: "Defence",
    share: { pct: 79, who: "China", what: "mine output, 2025" },
    stats: [
      { num: "79%", what: "of world tungsten mine output came from China in 2025 (67,000 of 85,000 t)", src: "USGS MCS 2026" },
      { num: "1 Jan 2027", what: "from this date, tungsten in US defence contracts may not be mined or refined in China, Russia, North Korea or Iran", src: "DFARS 252.225-7052, via Crowell & Moring" }
    ],
    uses: "Armour-piercing penetrators, hard-metal cutting tools for the arms industry, and heat-resistant alloys.",
    europe: "Europe mines some tungsten in Austria, Portugal and Spain, far less than it uses. China has required export licences for tungsten since February 2025.",
    spec: { mineral: "Scheelite", formula: "CaWO₄", note: "The ore mined at Mittersill. The other main tungsten ore, wolframite, is mined at Panasqueira." }
  },
  sb: {
    name: "Antimony", group: "Defence",
    share: { pct: 36, who: "China", what: "mine output, 2025" },
    stats: [
      { num: "36%", what: "of world antimony mine output came from China in 2025 (40,000 of about 110,000 t)", src: "USGS MCS 2026" },
      { num: "2025", what: "is when antimony mining restarted in the United States, at one mine in Montana", src: "USGS MCS 2026" }
    ],
    uses: "Ammunition primers and tracers, infrared sensors, flame retardants and lead-acid batteries.",
    europe: "The EU mines almost no antimony. China put antimony exports under licence in August 2024 and banned exports to the US in December 2024; that ban is suspended until 27 November 2026.",
    spec: { mineral: "Stibnite", formula: "Sb₂S₃", note: "The main antimony ore, and the name of Idaho's Stibnite project. Grows in long, striated metallic blades." }
  },
  ga: {
    name: "Gallium", group: "Electronics",
    share: { pct: 99, who: "China", what: "primary metal, 2025" },
    stats: [
      { num: "99%", what: "of world primary gallium was produced in China in 2025", src: "USGS MCS 2026" },
      { num: "77%", what: "of EU gallium imports came from China in 2025", src: "Eurostat, via Renewable Matter" }
    ],
    uses: "Gallium nitride chips for radar and electronic warfare, and gallium arsenide solar cells for satellites.",
    europe: "Gallium is recovered as a by-product of alumina refining. Metlen's plant in Greece is described by the EIB as Europe's first gallium production investment.",
    spec: { mineral: "Gallium metal", formula: "Ga", note: "Gallium has no ore of its own. It is recovered from alumina refining and sold as a soft, silvery metal that melts at about 30 °C." }
  },
  ge: {
    name: "Germanium", group: "Electronics",
    share: null,
    stats: [
      { num: "−60%", what: "change in China's germanium metal exports in January–September 2025 against a year earlier (7,520 against 18,787 kg)", src: "USGS MCS 2026" },
      { num: ">50%", what: "of Umicore's germanium supply comes from recycled material", src: "Umicore, March 2025" }
    ],
    uses: "Infrared optics for thermal sights and missile seekers, fibre optics, and substrates for satellite solar cells.",
    europe: "Belgium's Umicore is one of the largest germanium producers and recyclers outside China. China banned germanium exports to the US in December 2024; that ban is suspended until 27 November 2026.",
    spec: { mineral: "Sphalerite", formula: "(Zn,Fe)S", note: "Germanium is recovered mainly from zinc ores like this one and from coal fly ash. Kipushi's zinc ore carries germanium." }
  },
  li: {
    name: "Lithium", group: "Batteries",
    share: { pct: 32, who: "Australia", what: "mine output, 2025" },
    stats: [
      { num: "32%", what: "of world lithium mine output came from Australia in 2025 (92,000 of about 290,000 t, US excluded)", src: "USGS MCS 2026" },
      { num: "½", what: "Chinese lithium carbonate futures on 12 October 2026 were about half their May 2026 peak", src: "Reuters, via MINING.COM" }
    ],
    uses: "Lithium-ion batteries for vehicles, drones, soldier systems and grid storage.",
    europe: "Europe has large deposits in Czechia, Serbia, Portugal and Germany but little production so far, and most of the world's lithium chemicals are refined in China.",
    spec: { mineral: "Spodumene", formula: "LiAlSi₂O₆", note: "The hard-rock lithium ore mined at Greenbushes. Cínovec's ore is zinnwaldite, a lithium mica named after the village just over the German border." }
  },
  co: {
    name: "Cobalt", group: "Batteries",
    share: { pct: 74, who: "DR Congo", what: "mine output, 2025" },
    stats: [
      { num: "74%", what: "of world cobalt mine output came from the DR Congo in 2025 (230,000 of 310,000 t)", src: "USGS MCS 2026" },
      { num: "87,000 t", what: "is the DR Congo's 2026 cobalt export quota, plus up to 9,600 t of strategic quota", src: "Fastmarkets, August 2026" }
    ],
    uses: "Superalloys for jet engines, samarium-cobalt magnets for missiles and satellites, and battery cathodes.",
    europe: "Finland is Europe's cobalt hub: Umicore refines it at Kokkola and Terrafame makes cobalt sulphate from its own ore at Sotkamo. China is the world's leading cobalt refiner.",
    spec: { mineral: "Cobaltite", formula: "CoAsS", note: "A classic cobalt ore. Most Congolese cobalt comes from copper-cobalt ores instead, mined alongside copper." }
  },
  ni: {
    name: "Nickel", group: "Batteries",
    share: { pct: 67, who: "Indonesia", what: "mine output, 2025" },
    stats: [
      { num: "67%", what: "of world nickel mine output came from Indonesia in 2025 (2.6 of 3.9 Mt)", src: "USGS MCS 2026" },
      { num: "290–300 Mt", what: "is Indonesia's 2026 nickel ore mining quota after the October 2026 revision, against about 320 Mt mined in 2025", src: "ESDM via Indonesia Business Post; Mysteel" }
    ],
    uses: "Superalloys for jet engines and turbines, stainless and armour steels, and battery cathodes.",
    europe: "Finland mines and processes nickel for batteries. In October 2026 the EU signed a raw-materials partnership with New Caledonia, a French territory and a major nickel producer.",
    spec: { mineral: "Pentlandite", formula: "(Fe,Ni)₉S₈", note: "The main ore at Norilsk. Indonesia's nickel comes mostly from laterite, a weathered red and green soil." }
  },
  gr: {
    name: "Graphite", group: "Batteries",
    share: { pct: 78, who: "China", what: "mine output, 2025" },
    stats: [
      { num: "78%", what: "of world natural graphite output came from China in 2025 (1.4 of about 1.8 Mt)", src: "USGS MCS 2026" },
      { num: "10 Jan 2027", what: "is when China's extended pause on export licences for graphite anode materials is due to end", src: "MOFCOM, via SMM" }
    ],
    uses: "Battery anodes, refractories for steelmaking, and nuclear-grade graphite.",
    europe: "Europe mines little graphite. Sweden's Vittangi project aims to turn its own graphite into anode material at Luleå. China has required export licences for some graphite since December 2023.",
    spec: { mineral: "Graphite", formula: "C", note: "Soft, black and greasy to the touch. It grows as thin hexagonal flakes that slide over each other." }
  },
  mg: {
    name: "Magnesium", group: "Defence",
    share: { pct: 86, who: "China", what: "primary metal, 2025" },
    stats: [
      { num: "86%", what: "of world primary magnesium was made in China in 2025 (950 of about 1,100 kt)", src: "USGS MCS 2026" },
      { num: "97%", what: "of the EU's primary magnesium comes from China; the EU has no smelter of its own", src: "SMM, from Eurostat data" }
    ],
    uses: "Titanium production (the Kroll process), infrared decoy flares, pyrotechnics and light alloys for airframes and armour.",
    europe: "The EU has no primary magnesium smelter. The Critical Raw Materials Act lists magnesium as strategic and aims to keep any single supplier below 65% by 2030.",
    spec: { mineral: "Dolomite", formula: "CaMg(CO₃)₂", note: "The rock Chinese smelters heat with ferrosilicon to make most of the world's magnesium. Grows in curved, saddle-shaped crystals." }
  },
  mn: {
    name: "Manganese", group: "Defence",
    share: { pct: 95, who: "China", what: "manganese metal refining" },
    stats: [
      { num: ">95%", what: "of world electrolytic manganese metal capacity is in China", src: "SMM, 2026" },
      { num: "38%", what: "of world manganese ore came from South Africa in 2025 (7.6 of 20 Mt manganese content)", src: "USGS MCS 2026" }
    ],
    uses: "Steel for armour, shells and vehicles (about 90% of all manganese) and battery cathodes for drones and soldier power.",
    europe: "Europe has no operating manganese mine. Chvaletice in the Czech Republic, an EU strategic project, plans battery-grade manganese from old tailings, with a feasibility study due in the first half of 2027.",
    spec: { mineral: "Rhodochrosite", formula: "MnCO₃", note: "A pink manganese carbonate. Most manganese ore is the black oxide pyrolusite, but rhodochrosite shows the metal's colour." }
  }
};

/* top country's share of world output at each stage (proxy for the CRMA 65% cap, which applies to EU supply) */
const STAGES = {
  ree: { mine: { pct: 69, who: "China", note: "2025, USGS" }, refine: { pct: 91, who: "China", what: "Separation and refining", note: "2024, IEA" }, part: { pct: 94, who: "China", what: "Sintered magnets", note: "IEA, Oct 2025" } },
  ti:  { mine: { pct: 33, who: "China", what: "Ilmenite and rutile", note: "2025, USGS" }, refine: { pct: 70, who: "China", what: "Titanium sponge", note: "2025, USGS" } },
  w:   { mine: { pct: 79, who: "China", note: "2025, USGS" }, refine: null },
  sb:  { mine: { pct: 36, who: "China", note: "2025, USGS" }, refine: null },
  ga:  { mine: null, mineNote: "By-product of alumina refining", refine: { pct: 99, who: "China", what: "Primary gallium", note: "2025, USGS" } },
  ge:  { mine: null, mineNote: "By-product of zinc and coal", refine: null, refineNote: "China leads; no public world total" },
  li:  { mine: { pct: 32, who: "Australia", note: "2025, USGS" }, refine: { pct: 70, who: "China", what: "Lithium chemicals", note: "2025, IEA" } },
  co:  { mine: { pct: 74, who: "DR Congo", note: "2025, USGS" }, refine: { pct: 75, txt: ">75%", who: "China", what: "Refined cobalt", note: "2025, IEA" } },
  ni:  { mine: { pct: 67, who: "Indonesia", note: "2025, USGS" }, refine: { pct: 45, txt: "~45%", who: "Indonesia", what: "Refined nickel", note: "2024, IEA" } },
  gr:  { mine: { pct: 78, who: "China", note: "2025, USGS" }, refine: { pct: 94, who: "China", what: "Battery-grade graphite", note: "2025, IEA" } },
  mg: { refine: { pct: 86, who: "China", what: "Primary magnesium metal", note: "2025, USGS" } },
  mn: { mine: { pct: 38, who: "South Africa", what: "Ore (manganese content)", note: "2025, USGS" }, refine: { pct: 95, who: "China", what: "Electrolytic manganese metal", note: "capacity, SMM 2026" } }
};
const STRATEGIC = { ree: true, ti: true, w: true, sb: false, ga: true, ge: true, li: true, co: true, ni: true, gr: true, mg: true, mn: true };
function topStage(m) {
  const s = STAGES[m];
  return [s.mine, s.refine, s.part].filter(Boolean).sort((a, b) => b.pct - a.pct)[0] || null;
}
const pctTxt = (x) => x.txt || `${x.pct}%`;

/* start from a system: which tracked materials it depends on (material level, not a bill of materials) */
const SYSTEMS = {
  satellite: { name: "Satellite", blurb: "Solar arrays, structure, power and attitude control.", choke: "ga",
    chokeText: "Gallium. China makes 99% of the world's primary gallium, and the gallium arsenide solar cells that power most satellites sit on germanium wafers, where China is also the leading producer.",
    chokeShort: "Chokepoint: gallium, 99% China",
    parts: [
      { m: "ga", role: "Gallium arsenide solar cells" },
      { m: "ge", role: "Germanium wafers under those solar cells" },
      { m: "ti", role: "Structures and propellant tanks" },
      { m: "co", role: "Samarium-cobalt magnets in actuators" },
      { m: "ree", role: "Rare-earth magnets in motors and actuators" },
      { m: "li", role: "Lithium-ion batteries" }
    ] },
  drone: { name: "Drone", blurb: "A small military drone: motors, battery and camera.", choke: "ree",
    chokeText: "Magnets and anodes. China makes about 94% of the world's sintered rare-earth magnets, which spin every motor, and 94% of battery-grade graphite for the cells.",
    chokeShort: "Chokepoint: magnets, 94% China",
    parts: [
      { m: "ree", role: "Neodymium magnets in every motor" },
      { m: "li", role: "Battery cells" },
      { m: "gr", role: "Battery anode" },
      { m: "co", role: "Battery cathode" },
      { m: "ni", role: "Battery cathode" },
      { m: "ge", role: "Thermal-camera lenses" }
    ] },
  radar: { name: "AESA radar", blurb: "The active electronically scanned radar of modern fighters, ships and air defence.", choke: "ga",
    chokeText: "Gallium. Gallium nitride transmit-receive chips are the core of modern radar and electronic warfare, and China makes 99% of the world's primary gallium.",
    chokeShort: "Chokepoint: gallium, 99% China",
    note: "Radars also need copper, tantalum and high-purity silicon, which this atlas does not track.",
    parts: [
      { m: "ga", role: "Gallium nitride transmit-receive chips" }
    ] },
  thermal: { name: "Thermal sight", blurb: "Thermal sights, infrared seekers and night-vision cameras.", choke: "ge",
    chokeText: "Germanium. Most infrared lenses are germanium, China is the leading producer, and its ban on germanium exports to the US is suspended only until 27 November 2026.",
    chokeShort: "Chokepoint: germanium lenses",
    parts: [
      { m: "ge", role: "Infrared lenses and windows" },
      { m: "sb", role: "Indium antimonide detectors" }
    ] },
  jet: { name: "Jet engine", blurb: "Fighter and transport engines and the airframe around them.", choke: "co",
    chokeText: "Cobalt and titanium. Over three-quarters of refined cobalt comes from China, and China makes 70% of the world's titanium sponge.",
    chokeShort: "Chokepoint: refined cobalt, >75% China",
    parts: [
      { m: "ni", role: "Superalloy turbine blades and discs" },
      { m: "co", role: "Superalloys for the hot section" },
      { m: "ti", role: "Fan and compressor blades, casings, airframe" },
      { m: "ree", role: "Yttrium in thermal-barrier coatings, magnets in actuators" }
    ] },
  ammo: { name: "Ammunition", blurb: "Small and medium calibre rounds and armour-piercing ammunition.", choke: "w",
    chokeText: "Tungsten and antimony. China mines 79% of the world's tungsten and 36% of its antimony and licenses exports of both; the US only began mining antimony again in 2025.",
    chokeShort: "Chokepoint: tungsten, 79% China",
    note: "Steel, copper, brass and explosives are not tracked here.",
    parts: [
      { m: "sb", role: "Primers and tracers" },
      { m: "w", role: "Armour-piercing penetrators" }
    ] },
  battery: { name: "Battery pack", blurb: "Lithium-ion packs for vehicles, drones and soldier systems.", choke: "gr",
    chokeText: "Graphite anodes. About 94% of battery-grade graphite and about 70% of lithium chemicals are made in China.",
    chokeShort: "Chokepoint: anodes, 94% China",
    parts: [
      { m: "gr", role: "Anode" },
      { m: "li", role: "Electrolyte and cathode" },
      { m: "ni", role: "Cathode" },
      { m: "co", role: "Cathode" }
    ] }
};
SYSTEMS.ammo.parts.push({ m: "mg", role: "Magnesium in infrared decoy flares and tracers" }, { m: "mn", role: "Manganese in the steel of shells and casings" });
SYSTEMS.battery.parts.push({ m: "mn", role: "Manganese in NMC and LMFP cathodes" });
SYSTEMS.jet.parts.push({ m: "mg", role: "Magnesium turns titanium ore into titanium metal" });
SYSTEMS.drone.parts.push({ m: "mn", role: "Manganese in the battery cathodes" });
const SYS_ICON = {
  satellite: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="9" width="6" height="6"/><path d="M2 8h6v8H2zM16 8h6v8h-6zM8 12h1M15 12h1M12 9V5M10 4h4"/></svg>`,
  drone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="5" cy="5" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3"/><rect x="10" y="10" width="4" height="4"/></svg>`,
  radar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 20h16M12 20v-6"/><rect x="5" y="4" width="14" height="10" rx="1"/><path d="M9 4v10M12 4v10M15 4v10"/></svg>`,
  thermal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>`,
  jet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8h13l5 4-5 4H3z"/><path d="M7 8v8M11 8v8"/></svg>`,
  ammo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 21V9c0-3 1.5-5.5 3-7 1.5 1.5 3 4 3 7v12z"/><path d="M9 17h6"/></svg>`,
  battery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="7" width="16" height="10" rx="1"/><path d="M21 10v4M7 10v4M11 10v4"/></svg>`
};

const SITES = [
  /* ---- rare earths ---- */
  { id: "bayan-obo", name: "Bayan Obo", place: "Inner Mongolia", country: "China", lat: 41.8028, lng: 109.9736, m: "ree", stage: "Mine", approx: false,
    operator: null,
    facts: ["World's largest known rare-earth deposit", "Mines here supplied about 45% of global rare-earth output (2005)", "Also the largest known fluorite deposit"],
    why: "The geological anchor of China's dominance in rare earths." },
  { id: "mountain-pass", name: "Mountain Pass", place: "California", country: "United States", lat: 35.47861, lng: -115.5325, m: "ree", stage: "Mine", approx: false,
    operator: "MP Materials",
    facts: ["The only rare-earth mining and processing site in the US", "The US mined about 51,000 t of rare-earth oxide in 2025 (USGS)", "JPMorgan helped arrange $1 billion to expand MP's US magnet production (Fortune, Oct 2026)"],
    why: "America's own rare-earth mine; it stopped selling its output to China in 2025." },
  { id: "mount-weld", name: "Mount Weld", place: "Western Australia", country: "Australia", lat: -28.86, lng: 122.54778, m: "ree", stage: "Mine", approx: false,
    operator: "Lynas Rare Earths",
    facts: ["Mining since 2011 in a 3 km wide carbonatite pipe", "Australia mined about 29,000 t of rare-earth oxide in 2025 (USGS)", "Concentrate goes to Lynas's plant in Kuantan, Malaysia"],
    why: "A supply chain built outside China: mined in Australia, refined in Malaysia." },
  { id: "lynas-kuantan", name: "Lynas Advanced Materials Plant", place: "Kuantan, Pahang", country: "Malaysia", lat: 3.97, lng: 103.38, m: "ree", stage: "Processing", approx: true,
    operator: "Lynas Rare Earths",
    facts: ["Described as the world's largest rare-earth extraction plant outside China", "Target capacity 11,000 t of rare-earth oxides a year; operating since 2012", "Licence renewed for ten years in March 2026, without the earlier demand to move cracking and leaching out of Malaysia"],
    why: "Refining is the bottleneck in rare earths, and this is one of the few large refineries outside China." },
  { id: "sillamae", name: "Sillamäe separation plant", place: "Ida-Viru County", country: "Estonia", lat: 59.39306, lng: 27.77417, m: "ree", stage: "Processing", approx: true,
    operator: "Neo Performance Materials (Silmet)",
    facts: ["Former Soviet uranium plant that later moved into niobium, tantalum and rare earths", "Produces lanthanum, cerium, praseodymium and neodymium compounds", "A heavy rare-earth separation unit is being installed"],
    why: "One of the few rare-earth separation plants in the EU." },
  { id: "narva", name: "Narva magnet plant", place: "Ida-Viru County", country: "Estonia", lat: 59.37583, lng: 28.19611, m: "ree", stage: "Magnets", approx: true,
    operator: "Neo Performance Materials",
    facts: ["Described as Europe's biggest rare-earth magnet plant, built in about 500 days", "First phase: 2,000 t of magnets a year, planned to grow beyond 5,000 t", "EU co-funding of $16.9 million"],
    why: "Europe's attempt to make the magnets itself instead of importing them from Asia." },
  /* ---- titanium ---- */
  { id: "panzhihua", name: "Panzhihua", place: "Sichuan", country: "China", lat: 26.623, lng: 101.7546, m: "ti", stage: "Mine", approx: true,
    operator: null,
    facts: ["Vanadium-titanium magnetite district described as the world's largest titanium resource", "About 93% of China's titanium reserves (2007)", "Also holds about 63% of China's vanadium reserves"],
    why: "A cornerstone of China's titanium industry." },
  { id: "tellnes", name: "Tellnes", place: "Sokndal, Rogaland", country: "Norway", lat: 58.33444, lng: 6.42278, m: "ti", stage: "Mine", approx: false,
    operator: "Titania (Kronos)",
    facts: ["Open-pit ilmenite mine, operating since 1960", "Reserves over 300 Mt of ore at about 18% titanium", "Produced about 580,000 t of ilmenite concentrate in 1999"],
    why: "One of Europe's largest titanium mines and a secure source inside NATO." },
  { id: "irshansk", name: "Irshansk", place: "Zhytomyr Oblast", country: "Ukraine", lat: 50.75139, lng: 28.72111, m: "ti", stage: "Mine", approx: true,
    operator: "UMCC (NEQSOL Holding since June 2025)",
    facts: ["Produces ilmenite concentrate, the raw material for titanium", "Idle from October 2022 because of the war, restarted on 5 July 2023", "UMCC says it aims to push Russia out of the titanium market"],
    why: "Part of the mineral wealth that makes Ukraine strategic for Europe's defence industry." },
  { id: "vilnohirsk", name: "Vilnohirsk", place: "Dnipropetrovsk Oblast", country: "Ukraine", lat: 48.47806, lng: 34.02806, m: "ti", stage: "Mine", approx: true,
    operator: "UMCC (NEQSOL Holding since June 2025)",
    facts: ["Together with Irshansk, the centre of Ukraine's titanium ore industry"],
    why: "Ukraine's second titanium hub, further east and closer to the front line." },
  { id: "richards-bay", name: "Richards Bay Minerals", place: "KwaZulu-Natal", country: "South Africa", lat: -28.70, lng: 32.05, m: "ti", stage: "Mine", approx: true,
    operator: "Rio Tinto (74%)",
    facts: ["Mines coastal mineral sands and smelts them into titanium slag of about 85% TiO₂", "Also produces rutile, zircon and pig iron", "About 5,000 workers (2024)"],
    why: "One of the largest titanium feedstock sources outside China." },
  /* ---- tungsten ---- */
  { id: "mittersill", name: "Mittersill", place: "Salzburg", country: "Austria", lat: 47.22598, lng: 12.48871, m: "w", stage: "Mine", approx: false,
    operator: "Wolfram Bergbau und Hütten",
    facts: ["Largest scheelite deposit in Europe", "About 500,000 t of ore a year, giving roughly 1,200 t of tungsten oxide (2010–2017 data)", "Austria mined about 840 t of tungsten in 2025 (USGS)"],
    why: "Europe's main tungsten mine, inside the EU.",
    src: [{ t: "Wikipedia", u: "https://en.wikipedia.org/wiki/Mittersill_mine" }] },
  { id: "panasqueira", name: "Panasqueira", place: "Covilhã", country: "Portugal", lat: 40.17, lng: -7.75, m: "w", stage: "Mine", approx: true,
    operator: "Almonty Industries",
    facts: ["Mining licence dated 1896", "The workforce peaked at nearly 5,800 in 1943", "Portugal mined about 700 t of tungsten in 2025 (USGS)"],
    why: "One of the longest-running tungsten mines in Europe, inside NATO.",
    src: [{ t: "Almonty", u: "https://almonty.com/?p=1224" }] },
  { id: "ganzhou", name: "Ganzhou tungsten district", place: "Jiangxi", country: "China", lat: 25.83, lng: 114.93, m: "w", stage: "Mine", approx: true,
    operator: null,
    facts: ["Long the centre of China's tungsten industry", "China mined about 67,000 of the world's 85,000 t of tungsten in 2025 (USGS)", "Exports have needed a Chinese licence since February 2025"],
    why: "Shown as a district rather than a single mine: the heart of the supply Western buyers are trying to replace." },
  /* ---- antimony ---- */
  { id: "xikuangshan", name: "Xikuangshan", place: "Lengshuijiang, Hunan", country: "China", lat: 27.7698, lng: 111.494, m: "sb", stage: "Mine", approx: false,
    operator: null,
    facts: ["World's largest known antimony deposit", "On-site refinery with capacity for 10,000 t of antimony a year", "China mined about 40,000 of the world's 110,000 t of antimony in 2025 (USGS)"],
    why: "The historic centre of world antimony.",
    src: [{ t: "Wikipedia", u: "https://en.wikipedia.org/wiki/Xikuangshan_Mine" }] },
  { id: "stibnite", name: "Stibnite Gold Project", place: "Valley County, Idaho", country: "United States", lat: 44.91, lng: -115.33, m: "sb", stage: "Planned", approx: true,
    operator: "Perpetua Resources",
    facts: ["Expected to hold the only identified antimony reserve in the US", "Early construction began in 2026; gold and antimony production planned from 2029", "JPMorgan paid $75 million for a 2.7% stake (Fortune, Oct 2026)"],
    why: "America's attempt to restart large-scale domestic antimony mining; a small mine in Montana began production in 2025.",
    src: [{ t: "North American Mining", u: "https://northamericanmining.com/index.php/2026/06/02/perpetua-resources-ramps-up-activities-at-stibnite/" }, { t: "Fortune", u: "https://fortune.com/2026/10/21/jamie-dimon-jpmorgan-china-critical-minerals-defense" }] },
  /* ---- gallium ---- */
  { id: "metlen-gallium", name: "Metlen gallium project", place: "Agios Nikolaos, Boeotia", country: "Greece", lat: 38.366, lng: 22.687, m: "ga", stage: "Planned", approx: true,
    operator: "Metlen (Aluminium of Greece)",
    facts: ["Planned capacity: 50 t of gallium a year, commercial output from Q3 2027", "Selected as a Strategic Project under the EU Critical Raw Materials Act (2025)", "EIB approved €90 million, announced 15 January 2026", "Gallium was about $3,500/kg in October 2026, up from under $500 when Metlen decided to invest"],
    why: "Europe's main bet to cut its reliance on Chinese gallium.",
    src: [{ t: "EIB", u: "https://www.eib.org/en/press/all/2026-011-eib-backs-europe-s-first-gallium-production-investment-with-eur90-million-financing-to-metlen-in-greece" }, { t: "Investing.com", u: "https://investing.com/news/stock-market-news/metlen-targets-50-tonnes-of-gallium-output-as-prices-soar-4962876" }] },
  /* ---- germanium ---- */
  { id: "umicore-olen", name: "Umicore Olen", place: "Antwerp province", country: "Belgium", lat: 51.17, lng: 4.90, m: "ge", stage: "Processing", approx: true,
    operator: "Umicore",
    facts: ["One of the largest germanium producers and recyclers outside China", "More than half its germanium comes from recycled material", "Two germanium projects named EU Strategic Projects in March 2025, one for satellite solar-cell substrates"],
    why: "Europe's main germanium refiner, supplying optics and space solar cells.",
    src: [{ t: "Umicore", u: "https://www.umicore.com/en/media/newsroom/eu-selection-of-umicore-germanium-projects/" }] },
  { id: "kipushi", name: "Kipushi", place: "Haut-Katanga", country: "DR Congo", lat: -11.76722, lng: 27.23694, m: "ge", stage: "Mine", approx: false,
    operator: "Ivanhoe Mines (68%), Gécamines (32%)",
    facts: ["Zinc ore grading about 35%, among the richest in the world", "The ore also carries germanium", "Production restarted in June 2024 after more than 30 years on care and maintenance"],
    why: "A zinc mine whose by-products could include germanium for Western buyers." },
  /* ---- lithium ---- */
  { id: "greenbushes", name: "Greenbushes", place: "Western Australia", country: "Australia", lat: -33.86, lng: 116.06, m: "li", stage: "Mine", approx: true,
    operator: "Talison Lithium (Tianqi–IGO 51%, Albemarle 49%)",
    facts: ["Described as the largest hard-rock lithium mine in the world", "Expansion aims at more than 160,000 t of lithium carbonate equivalent a year", "Australia mined about 92,000 t of lithium in 2025 (USGS)"],
    why: "Australia mines more lithium than any other country, but most of its concentrate has been refined in China.",
    src: [{ t: "NS Energy", u: "https://www.nsenergybusiness.com/?p=281436" }] },
  { id: "atacama", name: "Salar de Atacama", place: "Antofagasta Region", country: "Chile", lat: -23.474, lng: -68.3526, m: "li", stage: "Mine", approx: true,
    operator: "SQM–Codelco (Nova Andino Litio), Albemarle",
    facts: ["Brine evaporation ponds large enough to pick out easily from orbit", "Held about 27% of the world's lithium reserve base (2008 estimate)", "Chile mined about 56,000 t of lithium in 2025, third after Australia and China (USGS)"],
    why: "The world's biggest lithium brine operation." },
  { id: "cinovec", name: "Cínovec", place: "Ústí nad Labem Region", country: "Czechia", lat: 50.735, lng: 13.795, m: "li", stage: "Planned", approx: true,
    operator: "Geomet (ČEZ group 51%, European Metals 49%)",
    facts: ["Described as Europe's largest lithium resource", "EU Strategic Project under the Critical Raw Materials Act (March 2025)", "Plans about 37,500 t a year of battery-grade lithium carbonate equivalent, processed at Prunéřov", "Environmental impact documentation published in May 2026"],
    why: "Czechia's entry in Europe's lithium race, in the Ore Mountains on the German border.",
    src: [{ t: "Mining Technology", u: "https://www.mining-technology.com/projects/cinovec-lithium-and-tin-project/" }, { t: "ČTK", u: "https://www.ceskenoviny.cz/zpravy/tezbe-lithia-na-cinovci-podle-studie-nestoji-nic-v-ceste-rozhodne-geomet/2762851" }] },
  { id: "jadar", name: "Jadar", place: "Loznica", country: "Serbia", lat: 44.53, lng: 19.22, m: "li", stage: "Planned", approx: true,
    operator: "Rio Tinto",
    facts: ["Jadarite, a lithium-boron mineral, is known only from here", "Resource of 118 Mt at 1.8% lithium oxide", "Licences revoked in January 2022 after protests; Serbia's Constitutional Court overturned that in July 2024", "EU–Serbia raw-materials memorandum signed in July 2024", "Rio Tinto put the project on care and maintenance in November 2025, citing slow permitting"],
    why: "Potentially one of Europe's biggest lithium sources, and one of its most contested." },
  /* ---- cobalt ---- */
  { id: "tenke", name: "Tenke Fungurume", place: "Lualaba", country: "DR Congo", lat: -10.568411, lng: 26.195633, m: "co", stage: "Mine", approx: false,
    operator: "CMOC (80%), Gécamines (20%)",
    facts: ["Produced 209,120 t of copper and 18,501 t of cobalt in 2021", "The DR Congo mined about 230,000 of the world's 310,000 t of cobalt in 2025 (USGS)"],
    why: "One of the world's largest cobalt producers, owned by a Chinese group." },
  { id: "mutanda", name: "Mutanda", place: "Lualaba, near Kolwezi", country: "DR Congo", lat: -10.79, lng: 25.80, m: "co", stage: "Mine", approx: true,
    operator: "Glencore",
    facts: ["About 40 km south-east of Kolwezi", "Produced 27,300 t of cobalt in 2018", "Idled in late 2019 and restarted at the end of 2021"],
    why: "A swing producer: when Glencore idled it in 2019, a large share of world cobalt supply went offline." },
  { id: "kokkola", name: "Kokkola cobalt refinery", place: "Central Ostrobothnia", country: "Finland", lat: 63.85, lng: 23.03, m: "co", stage: "Processing", approx: true,
    operator: "Umicore",
    facts: ["Bought by Umicore from Freeport in 2019 for $150 million", "Capacity 15,000 t a year; described at the time as the largest cobalt refinery outside China"],
    why: "Europe's main cobalt refinery, between Congolese ore and European battery plants.",
    src: [{ t: "The Chemical Engineer", u: "https://www.thechemicalengineer.com/news/umicore-acquires-europe-s-largest-cobalt-refinery/" }] },
  /* ---- nickel ---- */
  { id: "norilsk", name: "Norilsk", place: "Krasnoyarsk Krai", country: "Russia", lat: 69.333, lng: 88.217, m: "ni", stage: "Mine", approx: true,
    operator: "Nornickel",
    facts: ["Arctic mining and smelting complex on giant nickel-copper-palladium deposits", "Nornickel is cited at about 20% of world nickel and 35% of palladium", "Russia mined about 200,000 t of nickel in 2025 (USGS)"],
    why: "Russia's main source of high-grade nickel and palladium for aerospace alloys." },
  { id: "imip", name: "IMIP Morowali", place: "Central Sulawesi", country: "Indonesia", lat: -2.83, lng: 122.16, m: "ni", stage: "Processing", approx: true,
    operator: "Tsingshan-led industrial park",
    facts: ["About $34.3 billion invested from 2015 to 2024", "About 85,000 workers", "Runs largely on captive coal power, including about 2 GW of coal plant", "Indonesia mined about 2.6 of the world's 3.9 Mt of nickel in 2025 (USGS)"],
    why: "The heart of Indonesia's nickel boom, built largely with Chinese capital." },
  { id: "terrafame", name: "Terrafame", place: "Sotkamo, Kainuu", country: "Finland", lat: 63.98, lng: 28.02, m: "ni", stage: "Mine", approx: true,
    operator: "Terrafame (Finnish Minerals Group 56.2%)",
    facts: ["Mines its own ore and extracts the metals by bioleaching", "At full capacity makes nickel sulphate for about 1 million EVs and cobalt sulphate for about 300,000", "Every production step happens on one site"],
    why: "One of Europe's few mine-to-battery-chemical operations.",
    src: [{ t: "Finnish Minerals Group", u: "https://mineralsgroup.fi/business/terrafame.html" }] },
  /* ---- graphite ---- */
  { id: "balama", name: "Balama", place: "Cabo Delgado", country: "Mozambique", lat: -13.313, lng: 38.652, m: "gr", stage: "Mine", approx: true,
    operator: "Syrah Resources",
    facts: ["Capacity of about 350,000 t a year of graphite concentrate", "Feeds Syrah's anode plant in Vidalia, Louisiana", "Shut from December 2024 after protests; production restarted in June 2025", "Mozambique mined about 60,000 t of graphite in 2025 (USGS)"],
    why: "One of the few large graphite mines outside China." },
  { id: "vittangi", name: "Vittangi", place: "Norrbotten", country: "Sweden", lat: 67.68, lng: 21.63, m: "gr", stage: "Planned", approx: true,
    operator: "Talga Group",
    facts: ["Graphite mine planned at Vittangi, with an anode refinery at the port of Luleå", "Designed for 19,500 t a year of battery anode material", "Talga targets a final investment decision in early 2027"],
    why: "One of Europe's most advanced plans to make battery anodes from its own graphite.",
    src: [{ t: "Skillings", u: "https://www.skillings.net/critical-minerals-talga-group-hanwa-offtake-and-2026-outlook/" }] },
  { id: "fugu-mg", name: "Fugu and Yulin smelters", place: "Yulin, Shaanxi", country: "China", lat: 39.03, lng: 111.07, m: "mg", stage: "Processing", approx: true,
    operator: null,
    facts: ["Centre of China's magnesium smelting (the Pidgeon process)", "China made about 950 of the world's 1,100 kt of primary magnesium in 2025 (USGS)"],
    why: "Most of the world's magnesium is made here.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-magnesium-metal.pdf" }] },
  { id: "dsm-mg", name: "Dead Sea Magnesium", place: "Sdom", country: "Israel", lat: 31.03, lng: 35.39, m: "mg", stage: "Processing", approx: true,
    operator: null,
    facts: ["Electrolytic magnesium from Dead Sea brine", "Israel produced about 20 kt of magnesium in 2025 (USGS)"],
    why: "One of the few large smelters outside China.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-magnesium-metal.pdf" }] },
  { id: "rima-mg", name: "RIMA magnesium", place: "Bocaiúva, Minas Gerais", country: "Brazil", lat: -17.11, lng: -43.81, m: "mg", stage: "Processing", approx: true,
    operator: null,
    facts: ["Brazil produced about 20 kt of magnesium in 2025 (USGS)"],
    why: "The only primary magnesium in the Americas still running.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-magnesium-metal.pdf" }] },
  { id: "solikamsk-mg", name: "Solikamsk magnesium works", place: "Solikamsk, Perm Krai", country: "Russia", lat: 59.63, lng: 56.77, m: "mg", stage: "Processing", approx: true,
    operator: null,
    facts: ["Russia produced about 60 kt of magnesium in 2025 (USGS)", "Magnesium here also feeds titanium production"],
    why: "Russia is the second producer after China.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-magnesium-metal.pdf" }] },
  { id: "uktmp-mg", name: "Ust-Kamenogorsk titanium-magnesium plant", place: "Oskemen", country: "Kazakhstan", lat: 49.98, lng: 82.65, m: "mg", stage: "Processing", approx: true,
    operator: null,
    facts: ["Kazakhstan produced about 13 kt of magnesium in 2025 (USGS)", "Makes magnesium and titanium sponge on one site"],
    why: "Shows how titanium depends on magnesium.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-magnesium-metal.pdf" }] },
  { id: "usmag-mg", name: "US Magnesium (idle)", place: "Rowley, Utah", country: "United States", lat: 40.88, lng: -112.74, m: "mg", stage: "Processing", approx: true,
    operator: null,
    facts: ["The only US primary magnesium smelter stopped producing in 2022", "Its operator filed for bankruptcy in September 2025 (USGS)"],
    why: "Why the West now buys its magnesium from China.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-magnesium-metal.pdf" }] },
  { id: "kalahari-mn", name: "Kalahari Manganese Field", place: "Hotazel, Northern Cape", country: "South Africa", lat: -27.2, lng: 22.95, m: "mn", stage: "Mine", approx: true,
    operator: null,
    facts: ["South Africa mined 7.6 of the world's 20 Mt of manganese in 2025 (USGS)", "Holds about a third of world reserves"],
    why: "The largest manganese source on Earth.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-manganese.pdf" }] },
  { id: "moanda-mn", name: "Moanda manganese mine", place: "Moanda, Haut-Ogooué", country: "Gabon", lat: -1.56, lng: 13.27, m: "mn", stage: "Mine", approx: true,
    operator: null,
    facts: ["Gabon mined about 5.0 Mt of manganese in 2025, second after South Africa (USGS)", "High-grade ore, shipped through Owendo"],
    why: "One of the richest manganese deposits.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-manganese.pdf" }] },
  { id: "nsuta-mn", name: "Nsuta manganese mine", place: "Nsuta, Western Region", country: "Ghana", lat: 5.28, lng: -1.97, m: "mn", stage: "Mine", approx: true,
    operator: null,
    facts: ["Ghana mined about 2.0 Mt of manganese in 2025 (USGS)"],
    why: "Africa's fast-growing third producer.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-manganese.pdf" }] },
  { id: "groote-mn", name: "Groote Eylandt", place: "Northern Territory", country: "Australia", lat: -13.97, lng: 136.45, m: "mn", stage: "Mine", approx: true,
    operator: null,
    facts: ["Restarted in May 2025 after a cyclone stopped it in 2024 (USGS)", "Australia mined about 1.6 Mt of manganese in 2025"],
    why: "Shows how one storm can cut supply.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-manganese.pdf" }] },
  { id: "songtao-mn", name: "Manganese Triangle refineries", place: "Songtao, Guizhou", country: "China", lat: 28.17, lng: 109.2, m: "mn", stage: "Processing", approx: true,
    operator: null,
    facts: ["China holds over 95% of world electrolytic manganese metal capacity (SMM)", "The cluster spans Guangxi, Guizhou and Hunan"],
    why: "Where almost all refined manganese is made.",
    src: [{ t: "Shanghai Metals Market", u: "https://news.metal.com/newscontent/103917319-SMM-AnalysisSteel-and-New-Energy-Drive-EMM-Tech-Innovation-Industry-Restructuring" }] },
  { id: "chvaletice-mn", name: "Chvaletice manganese project", place: "Chvaletice, Pardubice Region", country: "Czechia", lat: 50.03, lng: 15.43, m: "mn", stage: "Planned", approx: true,
    operator: "Euro Manganese",
    facts: ["Plans battery-grade manganese from old mine tailings", "EU strategic project; feasibility study due in the first half of 2027"],
    why: "Europe's best chance of its own manganese.",
    src: [{ t: "Euro Manganese", u: "https://www.newsfilecorp.com/release/307057/Euro-Manganese-Updates-on-Progress-Across-Key-Business-Activities" }] }
];

/* ================= helpers ================= */
const $ = (s) => document.querySelector(s);
const esc = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const cssVar = (m) => `var(--${m})`;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const safeUrl = (u) => (typeof u === "string" && /^https:\/\//i.test(u)) ? u : null;
const fmtCoord = (lat, lng) => `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? "E" : "W"}`;
const copernicus = (s) => `https://browser.dataspace.copernicus.eu/?zoom=14&lat=${s.lat}&lng=${s.lng}`;
const gmaps = (s) => `https://www.google.com/maps/@${s.lat},${s.lng},4000m/data=!3m1!1e3`;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function parseDay(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ""));
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : NaN;
}
function fmtDay(iso) {
  const t = parseDay(iso);
  if (isNaN(t)) return "";
  const d = new Date(t);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
function shapeSvg(stage, color) {
  const p = stage === "Processing" ? `<rect x="-4.5" y="-4.5" width="9" height="9" fill="${color}"/>`
    : stage === "Magnets" ? `<path d="M0,-5.5L5.5,0L0,5.5L-5.5,0Z" fill="${color}"/>`
    : stage === "Planned" ? `<circle r="4" fill="none" stroke="${color}" stroke-width="2"/>`
    : `<circle r="5" fill="${color}"/>`;
  return `<svg viewBox="-6 -6 12 12" aria-hidden="true">${p}</svg>`;
}
const SITE_BY_ID = Object.fromEntries(SITES.map((s) => [s.id, s]));

/* ================= trade routes, chokepoints, scenarios, tour ================= */
const SHANGHAI = [31.0, 122.4], ROTTERDAM = [51.95, 4.05], SINGAPORE = [1.2, 104.0];
const ROUTES = [
  { id: "au-li", name: "Australian spodumene to China", m: ["li"], from: "Australia", to: "China", fromLabel: "Greenbushes, Western Australia", toLabel: "Chinese converters",
    legs: [{ land: true, pts: [[-33.86, 116.06], [-33.32, 115.64]] },
           { pts: [[-33.32, 115.64], [-30, 110.6], [-20, 108.8], [-8.75, 115.75], [-3.5, 118.3], [3.5, 118.8], [7.8, 117.2], [14, 115.5], [22, 116.5], SHANGHAI] }],
    fact: "In 2022, more than 94% of Australia's lithium exports by value went to China every month. Australia mines more lithium than any other country.",
    src: [{ t: "Australian Bureau of Statistics", u: "https://www.abs.gov.au/articles/insights-australian-exports-lithium" }], via: [] },
  { id: "cl-li", name: "Chilean lithium to China", m: ["li"], from: "Chile", to: "China", fromLabel: "Salar de Atacama", toLabel: "China",
    legs: [{ land: true, pts: [[-23.5, -68.25], [-23.1, -70.45]] },
           { pts: [[-23.1, -70.45], [-20, -90], [-10, -130], [5, -165], [20, 170], [28, 145], SHANGHAI] }],
    fact: "About 80% of Chile's lithium carbonate exports went to China in 2024: 192,000 of 241,000 t.",
    src: [{ t: "SMM", u: "https://news.metal.com/newscontent/103123739-chiles-lithium-carbonate-exports-declined-slightly-in-december-2024-but-rose-sharply-yoy" }], via: [] },
  { id: "cd-co", name: "Congolese cobalt to China", m: ["co"], from: "DR Congo", to: "China", fromLabel: "Kolwezi, DR Congo", toLabel: "Chinese refineries",
    legs: [{ land: true, pts: [[-10.71, 25.47], [-11.66, 27.48], [-17.8, 31.0], [-26.2, 28.0], [-29.87, 31.03]] },
           { pts: [[-29.87, 31.03], [-31, 40], [-20, 60], [-5, 78], [5.8, 94], [3, 100.6], SINGAPORE, [10, 110], [22, 116.5], SHANGHAI] }],
    fact: "The DR Congo supplied 99% of China's cobalt hydroxide imports in January–May 2025. Cargoes leave through Durban and Dar es Salaam and take about three months to reach China.",
    src: [{ t: "Fastmarkets", u: "https://www.fastmarkets.com/insights/drc-cobalt-export-ban-when-will-market-tightness-hit/" }], via: ["malacca"] },
  { id: "lobito", name: "Lobito Corridor", m: ["co"], from: "DR Congo", to: "Atlantic", fromLabel: "Kolwezi, DR Congo", toLabel: "Port of Lobito, Angola",
    legs: [{ land: true, pts: [[-10.71, 25.47], [-10.7, 22.2], [-11.78, 19.92], [-12.38, 16.93], [-12.77, 15.73], [-12.35, 13.55]] },
           { pts: [[-12.35, 13.55], [-10, 7], [-6, 2]] }],
    fact: "A 1,300 km railway from the Congolese and Zambian copperbelt to Angola's Atlantic coast. Kolwezi to Lobito can take six days, against three weeks or more to Durban or Dar es Salaam. The US says it has mobilised close to $6 billion for the corridor.",
    src: [{ t: "African Business, June 2026", u: "https://african.business/2026/06/resources/lobito-corridor-leads-drc-transport-agenda" }], via: [] },
  { id: "id-ni", name: "Indonesian nickel to China", m: ["ni", "co"], from: "Indonesia", to: "China", fromLabel: "Morowali, Sulawesi", toLabel: "China",
    legs: [{ pts: [[-2.83, 122.16], [-1, 125.2], [4, 126.6], [12, 127.2], [22, 124], SHANGHAI] }],
    fact: "China bought about 92% of Indonesia's nickel product exports in July 2024. Indonesia mines 67% of the world's nickel.",
    src: [{ t: "Yieh", u: "https://www.yieh.com/en/News/indonesia-remains-top-global-nickel-exporter-in-jul-with-china-leading-as-top-buyer/150002" }], via: [] },
  { id: "au-ree", name: "Mount Weld concentrate to Malaysia", m: ["ree"], from: "Australia", to: "Malaysia", fromLabel: "Mount Weld, Western Australia", toLabel: "Lynas plant, Kuantan",
    legs: [{ land: true, pts: [[-28.86, 122.55], [-32.05, 115.74]] },
           { pts: [[-32.05, 115.74], [-28, 111], [-15, 106], [-6.1, 105.8], [-2.2, 106.7], [2, 105.4], [3.97, 103.43]] }],
    fact: "Lynas ships rare-earth concentrate from Mount Weld to its plant in Kuantan, Malaysia: one of the few large rare-earth refineries outside China.",
    src: [], via: [] },
  { id: "cn-eu", name: "China to Europe via Suez", m: ["ree", "ga", "gr", "ge", "w", "sb", "mg"], from: "China", to: "Europe", fromLabel: "Chinese ports", toLabel: "Rotterdam",
    legs: [{ pts: [SHANGHAI, [22, 115.5], [10, 110], SINGAPORE, [3, 100.6], [6, 94], [5.8, 80], [12.3, 52], [12.6, 43.4], [20, 38.6], [27.5, 34], [29.9, 32.6], [33.5, 28], [36, 15], [35.95, -5.6], [38, -10], [44, -9.6], [48.5, -5.5], [50.3, 0.2], ROTTERDAM] }],
    fact: "The EU imports 98% of its rare-earth magnets from China (MERICS, 2025) and 77% of its gallium (Eurostat, 2025). The shortest sea route runs through the Strait of Malacca and the Suez Canal.",
    src: [{ t: "MERICS", u: "https://merics.org/index%2Ephp/de/comment/chinas-export-controls-hit-eu-rearmament-open-strategic-window" }, { t: "Renewable Matter", u: "https://www.renewablematter.eu/en/europe-secure-gallium-supply-metlen" }], via: ["malacca", "suez"] },
  { id: "cn-eu-cape", name: "Red Sea diversion via the Cape", m: ["ree", "ga", "gr", "ge", "w", "sb", "mg"], from: "China", to: "Europe", fromLabel: "Strait of Malacca", toLabel: "Rotterdam", alt: true,
    legs: [{ pts: [[5.8, 80], [-10, 70], [-30, 45], [-36, 20], [-25, 5], [0, -10], [20, -20], [36, -13], [44, -9.6], [48.5, -5.5], [50.3, 0.2], ROTTERDAM] }],
    fact: "When the Red Sea is unsafe, ships go around Africa instead. Suez Canal transits fell 42% in two months after attacks on shipping began (UNCTAD, January 2024).",
    src: [{ t: "UNCTAD via L'Orient Today", u: "https://today.lorientlejour.com/article/1365796/42-percent-drop-in-suez-traffic-following-huthi-attacks-un.html" }], via: ["cape"] },
  { id: "mz-gr", name: "Mozambican graphite to Louisiana", m: ["gr"], from: "Mozambique", to: "United States", fromLabel: "Balama, Mozambique", toLabel: "Syrah's Vidalia anode plant",
    legs: [{ land: true, pts: [[-13.33, 38.6], [-14.54, 40.67]] },
           { pts: [[-14.54, 40.67], [-25, 37], [-35, 22], [-25, 5], [0, -25], [15, -52], [18.2, -65], [22.5, -80], [24, -85.5], [28.8, -89.4]] },
           { land: true, pts: [[28.8, -89.4], [29.95, -90.06], [31.56, -91.43]] }],
    fact: "Syrah ships graphite from Balama to its 11,250 t-a-year anode material plant in Vidalia, Louisiana, which started production in 2024.",
    src: [{ t: "Mining Weekly", u: "https://m.miningweekly.com/article/syrah-starts-aam-production-at-vidalia-2024-02-09" }], via: ["cape"] },
  { id: "za-mn", name: "South African manganese to China", m: ["mn"], from: "South Africa", to: "China", fromLabel: "Kalahari Manganese Field", toLabel: "Chinese refineries",
    legs: [{ land: true, pts: [[-27.2, 22.95], [-28.74, 24.77], [-33.8, 25.66]] },
           { pts: [[-33.8, 25.66], [-35, 30], [-31, 40], [-20, 60], [-5, 78], [5.8, 94], [3, 100.6], SINGAPORE, [10, 110], [17.5, 110.5], [19.5, 108], [21.6, 108.6]] }],
    fact: "South Africa mined 7.6 of the world's 20 Mt of manganese in 2025; most of the ore is refined in China, which holds over 95% of manganese metal capacity.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-manganese.pdf" }, { t: "Shanghai Metals Market", u: "https://news.metal.com/newscontent/103917319-SMM-AnalysisSteel-and-New-Energy-Drive-EMM-Tech-Innovation-Industry-Restructuring" }], via: ["malacca"] },
  { id: "ga-mn", name: "Gabonese manganese to China", m: ["mn"], from: "Gabon", to: "China", fromLabel: "Moanda, Gabon", toLabel: "Chinese refineries",
    legs: [{ land: true, pts: [[-1.56, 13.27], [-0.7, 11.6], [0.29, 9.5]] },
           { pts: [[0.29, 9.5], [-3, 8], [-15, 9], [-30, 13], [-35.5, 19.5], [-35, 30], [-31, 40], [-20, 60], [-5, 78], [5.8, 94], [3, 100.6], SINGAPORE, [10, 110], [17.5, 110.5], [19.5, 108], [21.6, 108.6]] }],
    fact: "Gabon mined about 5.0 Mt of manganese in 2025, second after South Africa; the ore leaves by rail to the port of Owendo.",
    src: [{ t: "USGS Mineral Commodity Summaries 2026", u: "https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-manganese.pdf" }], via: ["malacca"] }
];
const ROUTE_BY_ID = Object.fromEntries(ROUTES.map((r) => [r.id, r]));

const CHOKES = [
  { id: "malacca", name: "Strait of Malacca", lat: 2.6, lng: 101.2,
    fact: "About 22–25% of the world's seaborne trade passes through it; about 102,500 ships transited in 2025. Ore and metal from Africa, Indonesia and China to Europe all pass here.",
    src: [{ t: "Clarksons", u: "https://www.clarksons.com/home/glossary/s/what-is-the-strait-of-malacca/" }], routes: ["cd-co", "cn-eu"] },
  { id: "suez", name: "Suez and Bab-el-Mandeb", lat: 20.5, lng: 38.4,
    fact: "The short route between Asia and Europe. Suez Canal transits fell 42% in two months as ships avoided the Red Sea after attacks began (UNCTAD, January 2024).",
    src: [{ t: "UNCTAD via L'Orient Today", u: "https://today.lorientlejour.com/article/1365796/42-percent-drop-in-suez-traffic-following-huthi-attacks-un.html" }], routes: ["cn-eu"] },
  { id: "cape", name: "Cape of Good Hope", lat: -35.2, lng: 19.5,
    fact: "The long way round Africa: the diversion route when the Red Sea is closed, and the route for Mozambican graphite heading to the US.",
    src: [], routes: ["cn-eu-cape", "mz-gr"] }
];
const CHOKE_BY_ID = Object.fromEntries(CHOKES.map((c) => [c.id, c]));

/* names that tie a news story to a site (for the activity pulses) */
const ALIASES = {
  "bayan-obo": ["Bayan Obo", "Baotou"], "mountain-pass": ["MP Materials", "Mountain Pass"], "mount-weld": ["Mount Weld"],
  "lynas-kuantan": ["Lynas", "Kuantan"], "sillamae": ["Silmet", "Sillamäe", "Sillamae"], "narva": ["Narva", "Neo Performance"],
  "panzhihua": ["Panzhihua"], "tellnes": ["Tellnes", "Kronos"], "irshansk": ["Irshansk"], "vilnohirsk": ["Vilnohirsk"],
  "richards-bay": ["Richards Bay"], "mittersill": ["Mittersill"], "panasqueira": ["Panasqueira", "Almonty"], "ganzhou": ["Ganzhou"],
  "xikuangshan": ["Xikuangshan"], "stibnite": ["Perpetua", "Stibnite"], "metlen-gallium": ["Metlen"], "umicore-olen": ["Umicore"],
  "kipushi": ["Kipushi"], "greenbushes": ["Greenbushes", "Talison"], "atacama": ["Atacama", "SQM", "Codelco"], "cinovec": ["Cínovec", "Cinovec", "Geomet"],
  "jadar": ["Jadar"], "tenke": ["Tenke", "CMOC"], "mutanda": ["Mutanda"], "kokkola": ["Kokkola"], "norilsk": ["Norilsk", "Nornickel"],
  "imip": ["Morowali", "IMIP", "Tsingshan"], "terrafame": ["Terrafame"], "balama": ["Balama", "Syrah"], "vittangi": ["Vittangi", "Talga"]
};
const ONLINE = { "metlen-gallium": "Q3 2027", "stibnite": "2029" };   // build 57: Jadar on care and maintenance since Nov 2025; Vittangi has no start date before its investment decision

const SCENARIOS = [
  { id: "ga", m: "ga", who: "China", stage: "refine", title: "China stops exporting gallium",
    prec: "China put gallium under export licences in August 2023 and banned exports to the US in December 2024. That ban is suspended until 27 November 2026. Licences are still required during the suspension, and China's ban on dual-use exports to US military end users stays in force." },
  { id: "ree", m: "ree", who: "China", stage: "part", title: "China stops exporting rare-earth magnets",
    prec: "China's October 2025 controls on rare-earth magnets, equipment and technology are paused until 10 January 2027. The EU imports 98% of its rare-earth magnets from China." },
  { id: "gr", m: "gr", who: "China", stage: "refine", title: "China stops exporting graphite anodes",
    prec: "China has required licences for some graphite since December 2023. Its October 2025 controls on anode materials are paused until 10 January 2027." },
  { id: "ge", m: "ge", who: "China", stage: null, title: "China stops exporting germanium",
    prec: "Germanium has needed a Chinese export licence since August 2023, and exports to the US were banned in December 2024 (suspended until 27 November 2026). China's germanium metal exports fell 60% in January–September 2025. Licences are still required during the suspension, and China's ban on dual-use exports to US military end users stays in force." },
  { id: "w", m: "w", who: "China", stage: "mine", title: "China stops exporting tungsten",
    prec: "China has required export licences for tungsten since February 2025. From 1 January 2027, US defence contracts may not use tungsten mined or refined in China." },
  { id: "sb", m: "sb", who: "China", stage: "mine", title: "China stops exporting antimony",
    prec: "China put antimony under licences in August 2024 and banned exports to the US in December 2024. The US only began mining antimony again in 2025." },
  { id: "co", m: "co", who: "DR Congo", stage: "mine", title: "The DR Congo halts cobalt exports",
    prec: "The DR Congo suspended cobalt exports in February 2025 and replaced the ban with quotas: 87,000 t of cobalt for 2026, plus up to 9,600 t of strategic quota." },
  { id: "ni", m: "ni", who: "Indonesia", stage: "mine", title: "Indonesia cuts nickel ore output",
    prec: "Indonesia set its 2026 nickel ore quota at 290–300 Mt after an October 2026 revision, against about 320 Mt mined in 2025." },
  { id: "li", m: "li", who: "China", stage: "refine", title: "China stops exporting lithium chemicals",
    prec: "China's October 2025 controls on lithium-battery and cathode materials are paused until 10 January 2027." }
];

const TOUR = [
  { title: "It starts in the ground", site: "bayan-obo", cam: [38, 108, 1.9],
    text: "Bayan Obo in Inner Mongolia is the world's largest known rare-earth deposit. In 2025 China mined 69% of the world's rare earths.",
    src: "USGS Mineral Commodity Summaries 2026" },
  { title: "Refining is the real chokepoint", route: "au-ree", cam: [-14, 113, 2.5],
    text: "China separates and refines about 91% of the world's rare earths and makes about 94% of sintered magnets. One of the few large refineries outside China is Lynas in Malaysia, fed from Mount Weld in Australia.",
    src: "IEA, October 2025" },
  { title: "The long road to Europe", route: "cn-eu", cam: [22, 68, 3.3],
    text: "Magnets and metals sail to Europe through the Strait of Malacca and the Suez Canal. The EU buys 98% of its rare-earth magnets and 77% of its gallium from China.",
    src: "MERICS 2025; Eurostat via Renewable Matter" },
  { title: "Europe's answer", site: "narva", cam: [56, 24, 1.75],
    text: "Neo's plant in Narva, Estonia, is described as Europe's biggest rare-earth magnet factory. It starts at 2,000 t a year and plans to grow beyond 5,000 t.",
    src: "Neo Performance Materials, via Metal Powder" },
  { title: "Cobalt: mined in Congo, refined in China", route: "cd-co", also: "lobito", cam: [-13, 34, 2.6],
    text: "The DR Congo mines 74% of the world's cobalt and supplied 99% of China's cobalt hydroxide imports in early 2025. The US-backed Lobito railway now offers a route west to the Atlantic.",
    src: "USGS 2026; Fastmarkets; African Business" },
  { title: "Czechia's stake", site: "cinovec", cam: [49, 15, 1.7],
    text: "Europe's largest lithium resource sits on the Czech-German border at Cínovec. It is an EU Strategic Project, planned at about 37,500 t of lithium carbonate equivalent a year.",
    src: "Mining Technology" }
];

const STATS = [
  { m: "ga", num: "99%", what: "of the world's primary gallium is made in China", src: "USGS MCS 2026" },
  { m: "ree", num: "94%", what: "of sintered rare-earth magnets are made in China", src: "IEA, October 2025" },
  { m: "gr", num: "94%", what: "of battery-grade graphite is made in China", src: "IEA GCMO 2026" },
  { m: "co", num: "74%", what: "of the world's cobalt is mined in the DR Congo", src: "USGS MCS 2026" }
];

/* production by country (towers on the globe and bars in the drawer) */
const PROD = {
  li: { unit: "t", year: "2025", src: "USGS MCS 2026", world: 290000, note: "World total excludes the US", rows: [["Australia", 92000], ["China", 62000], ["Chile", 56000], ["Zimbabwe", 28000], ["Argentina", 23000]] },
  co: { unit: "t", year: "2025", src: "USGS MCS 2026", world: 310000, rows: [["DR Congo", 230000], ["Indonesia", 44000]] },
  ni: { unit: "t", year: "2025", src: "USGS MCS 2026", world: 3900000, rows: [["Indonesia", 2600000], ["Philippines", 270000], ["Russia", 200000]] },
  gr: { unit: "t", year: "2025", src: "USGS MCS 2026", world: 1800000, rows: [["China", 1400000], ["Madagascar", 80000], ["Tanzania", 75000], ["Brazil", 65000], ["Mozambique", 60000]] },
  w:  { unit: "t", year: "2025", src: "USGS MCS 2026", world: 85000, rows: [["China", 67000], ["Vietnam", 3000], ["Russia", 2000], ["Austria", 840], ["Spain", 800], ["Portugal", 700]] },
  sb: { unit: "t", year: "2025", src: "USGS MCS 2026", world: 110000, rows: [["China", 40000], ["Russia", 32000], ["Tajikistan", 22000]] },
  ree: { unit: "t", year: "2025", src: "USGS MCS 2026 (rare-earth oxide)", world: 390000, rows: [["China", 270000], ["United States", 51000], ["Australia", 29000]] },
  ti: { unit: "kt", year: "2025", src: "USGS MCS 2026 (titanium minerals)", world: 9800, rows: [["China", 3200], ["Mozambique", 1910], ["South Africa", 1400], ["Australia", 980], ["Norway", 390], ["Senegal", 370], ["Canada", 360]] },
  ga: { pctOnly: true, year: "2025", src: "USGS MCS 2026", note: "Share of primary gallium; tonnages by country are not published", rows: [["China", 99]] },
  ge: { qual: true, year: "2025", src: "USGS MCS 2026", note: "China leads refining; no public world total is published", rows: [["China", 1]] },
  mg: { unit: "t", year: "2025", src: "USGS MCS 2026", world: 1100000, note: "Primary magnesium metal (smelter production)", rows: [["China", 950000], ["Russia", 60000], ["Brazil", 20000], ["Israel", 20000], ["Turkey", 15000], ["Kazakhstan", 13000]] },
  mn: { unit: "t", year: "2025", src: "USGS MCS 2026", world: 20000000, note: "Mine output, manganese content", rows: [["South Africa", 7600000], ["Gabon", 5000000], ["Ghana", 2000000], ["Australia", 1600000], ["Brazil", 800000], ["India", 790000], ["China", 700000]] }
};
const CENTROID = {
  "Brazil": [-10, -52], "Israel": [31, 35], "Turkey": [39, 35], "Kazakhstan": [48, 67], "Iran": [32, 54], "Gabon": [-0.8, 11.6], "Ghana": [7.9, -1], "India": [22, 79], "Côte d'Ivoire": [7.5, -5.5],
  "Australia": [-25, 134], "Chile": [-30, -71], "China": [35, 104], "Zimbabwe": [-19, 29.5], "Argentina": [-34, -64],
  "DR Congo": [-3, 23.6], "Indonesia": [-2, 118], "Philippines": [12.5, 122], "Russia": [60, 95], "Madagascar": [-19, 46.7],
  "Mozambique": [-18, 35], "Vietnam": [16, 107.8], "Austria": [47.6, 14.1], "Spain": [40.2, -3.7], "Portugal": [39.6, -8],
  "Tajikistan": [38.9, 71.2], "United States": [39.8, -98.6], "South Africa": [-29, 25], "Norway": [61.4, 8.8],
  "Senegal": [14.5, -14.4], "Canada": [56, -106], "Tanzania": [-6.4, 34.9]
};
const fmtProd = (P, v) => P.qual ? T("leads refining", "vede ve zpracování") : P.pctOnly ? `${v}%` : `${v.toLocaleString("en-US")} ${P.unit}`;
let PRESENTING = false;
/* ================= v13 data: tonnage on the lanes, recycling, projects, deadlines ================= */
/* dots on each trade lane: the tonnage behind it and where the figure comes from */
const ROUTE_T = {
  "au-li": { t: 92000, en: "Australia mined about 92,000 t of lithium in 2025, counted as lithium content (USGS). In 2022 more than 94% of its lithium exports by value went to China (ABS).", cs: "Austrálie v roce 2025 vytěžila asi 92 000 t lithia, počítáno jako obsah lithia (USGS). V roce 2022 šlo přes 94 % jejího vývozu lithia podle hodnoty do Číny (ABS)." },
  "cl-li": { t: 192000, en: "Chile shipped 192,000 t of lithium carbonate to China in 2024 (SMM).", cs: "Chile v roce 2024 odvezlo do Číny 192 000 t uhličitanu lithného (SMM)." },
  "cd-co": { t: 230000, en: "The DR Congo mined about 230,000 t of cobalt in 2025 (USGS) and supplied 99% of China's cobalt hydroxide imports in January–May 2025 (Fastmarkets).", cs: "DR Kongo v roce 2025 vytěžila asi 230 000 t kobaltu (USGS) a v lednu až květnu 2025 dodala 99 % čínského dovozu hydroxidu kobaltu (Fastmarkets)." },
  "id-ni": { t: 2600000, en: "Indonesia mined about 2.6 million t of nickel in 2025; China bought about 92% of its nickel product exports (USGS, Yieh).", cs: "Indonésie v roce 2025 vytěžila asi 2,6 milionu t niklu; Čína koupila asi 92 % jejího vývozu niklových produktů (USGS, Yieh)." },
  "au-ree": { t: 29000, en: "Australia mined about 29,000 t of rare-earth oxide in 2025 (USGS).", cs: "Austrálie v roce 2025 vytěžila asi 29 000 t oxidů vzácných zemin (USGS)." },
  "cn-eu": { t: 140000, en: "About 140,000 t of the tracked products reached the EU from China in 2025: magnets, graphite, rare-earth compounds, gallium, germanium, antimony and tungsten. Estimated from Eurostat, splitting tonnage by China's share of import value.", cs: "Asi 140 000 t sledovaných produktů dorazilo v roce 2025 z Číny do EU: magnety, grafit, sloučeniny vzácných zemin, galium, germanium, antimon a wolfram. Odhad z Eurostatu, tonáž rozdělena podle podílu Číny na hodnotě dovozu." },
  "mz-gr": { t: 60000, en: "Mozambique mined about 60,000 t of graphite in 2025 (USGS).", cs: "Mosambik v roce 2025 vytěžil asi 60 000 t grafitu (USGS)." }
};
/* end-of-life recycling input rate: share of EU demand met from recycled scrap (European Commission, CRM study 2023) */
const EOL_RIR = { ree: { v: 3, txt: "3–4%" }, w: { v: 42 }, sb: { v: 28 }, ga: { v: 0 }, ge: { v: 2 }, li: { v: 0 }, co: { v: 22 }, ni: { v: 16 }, gr: { v: 3 }, ti: { v: 1, note: "titanium metal; the IEEP summary lists 19%" } };
const EOL_SRC = [{ t: "European Commission, Study on the Critical Raw Materials for the EU 2023", u: "https://op.europa.eu/en/publication-detail/-/publication/57318397-fdd4-11ed-a05c-01aa75ed71a1" }, { t: "IEEP, Circularity and the European Critical Raw Materials Act, 2023 (Table 1)", u: "https://ieep.eu/wp-content/uploads/2023/10/Circularity-and-the-European-Critical-Raw-Materials-Act-IEEP-2023-1.pdf" }];
/* EU strategic projects, first selection of 25 March 2025: published counts, or the named projects where no count was published */
const EU_SP = {
  li: { n: 22 }, ni: { n: 12 }, co: { n: 10 }, gr: { n: 11, named: ["Talga Vittangi (Sweden)", "SALROM (Romania)"] }, w: { n: 3, named: ["El Moto (Spain)", "P6 Metals (Spain)"] },
  ree: { named: ["CAREMAG (France, processing)", "Puławy (Poland, processing)", "ReeMAP (Sweden, mine to oxide)", "MagFactory (France, recycling)", "LIFE INSPIREE (Italy, recycling)"] },
  ga: { named: ["Metlen BAUX-EU / GALLANT (Greece)"] },
  ge: { named: ["GePETO (Belgium, processing)", "ReGAIN (Belgium, substitution)"] }
};
if (LANG === "cs") {   /* build 56: country and stage of the named projects in Czech */
  const SP_CS = { Sweden: "Švédsko", Romania: "Rumunsko", Spain: "Španělsko", France: "Francie", Poland: "Polsko", Italy: "Itálie", Greece: "Řecko", Belgium: "Belgie", processing: "zpracování", recycling: "recyklace", "mine to oxide": "od dolu po oxid", substitution: "náhrada" };
  Object.values(EU_SP).forEach((v) => { if (v.named) v.named = v.named.map((x) => x.replace(/\(([^)]+)\)$/, (q, i) => "(" + i.split(", ").map((p) => SP_CS[p] || p).join(", ") + ")")); });
}
const EU_SP_SRC = [{ t: "European Commission via eeNews Europe, 25 March 2025", u: "https://www.eenewseurope.com/en/europe-identifies-47-critical-raw-material-projects/" }, { t: "IEA policy database: Strategic Projects of the CRMA", u: "https://www.iea.org/policies/26758-strategic-projects-of-the-crma" }];
/* milestones on the road to 2030 */
const ROAD = [
  { d: "2025-03-25", en: "EU picks its first 47 strategic projects (€22.5 bn of investment)", cs: "EU vybírá prvních 47 strategických projektů (investice 22,5 mld. €)", m: ["li", "ni", "co", "gr", "w"], kind: "eu" },
  { d: "2025-06-04", en: "13 strategic projects outside the EU", cs: "13 strategických projektů mimo EU", m: ["li", "ni", "co", "gr", "ree"], kind: "eu" },
  { d: "2025-09-19", en: "Neo opens Europe's largest magnet plant in Narva", cs: "Neo otevírá v Narvě největší evropský závod na magnety", m: ["ree"], kind: "on", site: "narva" },
  { d: "2026-05-01", when: "May 2026", en: "Cínovec: environmental impact documentation published", cs: "Cínovec: zveřejněna dokumentace vlivů na životní prostředí", m: ["li"], kind: "step", site: "cinovec" },
  { d: "2026-10-09", en: "EU picks 46 more strategic projects (second call)", cs: "EU vybírá dalších 46 strategických projektů (druhá výzva)", m: ["li", "ni", "co", "mn", "gr"], kind: "eu" },
  { d: "2026-11-27", en: "China's suspended ban on gallium, germanium and antimony exports to the US is due to resume", cs: "Má se obnovit pozastavený čínský zákaz vývozu galia, germania a antimonu do USA", m: ["ga", "ge", "sb"], kind: "risk" },
  { d: "2027-01-01", en: "US defence rule reaches back to the mine for magnets and tungsten", cs: "Americké obranné pravidlo sahá u magnetů a wolframu až k dolu", m: ["ree", "w"], kind: "risk" },
  { d: "2027-01-10", en: "China's extended pause on its October 2025 controls is due to end", cs: "Má skončit prodloužená čínská pauza kontrol z října 2025", m: ["ree", "gr", "li"], kind: "risk" },
  { d: "2027-07-01", when: "Q3 2027", en: "Metlen: first commercial gallium in Greece (50 t a year from 2028)", cs: "Metlen: první komerční galium v Řecku (50 t ročně od roku 2028)", m: ["ga"], kind: "on", site: "metlen-gallium" },
  { d: "2027-03-01", when: "early 2027", en: "Talga Vittangi: target final investment decision", cs: "Talga Vittangi: cílové konečné investiční rozhodnutí", m: ["gr"], kind: "step", site: "vittangi" },
  { d: "2029-06-01", when: "2029", en: "Stibnite antimony, Idaho (US)", cs: "Antimon Stibnite, Idaho (USA)", m: ["sb"], kind: "on", site: "stibnite" },
  { d: "2030-12-31", when: "2030", en: "Critical Raw Materials Act benchmarks: 10% mined, 40% processed, 25% recycled, at most 65% from one country", cs: "Cíle Aktu o kritických surovinách: 10 % těžba, 40 % zpracování, 25 % recyklace, nejvýš 65 % z jedné země", m: [], kind: "eu" }
];
/* deadlines bundled with the page; the daily task adds more to the shared watch list */
const DEADLINES = [
  { date: "2026-11-15", materials: ["ni"], title: "Applications close for Indonesia's 2027 nickel mining quotas", title_cs: "Končí přihlášky k indonéským těžebním kvótám na nikl pro rok 2027", source: "Mysteel", url: "https://www.mysteel.net/news/5143402-flash-indonesias-esdm-says-2027-rkab-evaluation-to-be-faster-nickel-ore-quota-allocation-fairer" },
  { date: "2026-11-27", materials: ["ga", "ge", "sb"], title: "China's suspended ban on gallium, germanium and antimony exports to the US is due to resume", title_cs: "Má se obnovit pozastavený čínský zákaz vývozu galia, germania a antimonu do USA", source: "Pillsbury", url: "https://www.pillsburylaw.com/en/news-and-insights/china-suspends-export-controls-certain-critical-minerals-related-items.html" },
  { date: "2027-01-01", materials: ["w", "ree"], title: "US defence sourcing rule for tungsten and magnets tightens", title_cs: "Zpřísňuje se americké pravidlo pro původ wolframu a magnetů v obranných zakázkách", source: "Crowell & Moring", url: "https://www.crowell.com/en/insights/client-alerts/dod-expands-restrictions-on-supply-chain-for-certain-magnets-tantalum-and-tungsten" },
  { date: "2027-01-10", materials: ["ree", "gr", "li"], title: "China's extended pause on its October 2025 export controls is due to end", title_cs: "Má skončit prodloužená čínská pauza ve vývozních kontrolách z října 2025", source: "Shanghai Metals Market", url: "https://news.metal.com/newscontent/CNTOCBN4QTSC2L3BEOVBYILPAZVOOIHVV6INVPY-china-extends-suspension-of-rare-earth-export-controls-until-january-2027" },
  { date: "2027-01-10", materials: ["ree", "ga", "ge", "sb", "gr"], title: "China's extended trade arrangements with the US run out", title_cs: "Končí prodloužená obchodní ujednání Číny s USA", source: "RAWMATERIALS.net", url: "https://rawmaterials.net/rare-earth-export-controls-china-confirms-extension-of-trade-arrangements-with-u-s/" },
  { date: "2027-07-01", when: "Q3 2027", materials: ["ga"], title: "Metlen's first commercial gallium output in Greece", title_cs: "První komerční výroba galia společnosti Metlen v Řecku", source: "Investing.com", url: "https://investing.com/news/stock-market-news/metlen-targets-50-tonnes-of-gallium-output-as-prices-soar-4962876" }
];
const CC_OF = { "China": "CN", "DR Congo": "CD", "Indonesia": "ID", "Australia": "AU" };
/* Shanghai to Rotterdam at 16 knots: Suez about 10,600 nm and 27 days, the Cape about 13,800 nm and 35 days */
const REDSEA = { suezNm: 10600, capeNm: 13800, suezDays: 27, capeDays: 35, src: { t: "Port Economics, Management and Policy: routing options between Shanghai and Rotterdam", u: "https://porteconomicsmanagement.org/routing-options-shanghai-rotterdam/" } };
/* words in a parts list and the tracked materials they point to */
const PART_KEYS = [
  [/magnet|ndfeb|neodym|dyspros|terbium|rare.?earth|actuator|servo|motor/i, ["ree"]],
  [/smco|samarium/i, ["ree", "co"]],
  [/gan\b|gallium|gaas|mmic|t\/r module|transmit|aesa|radar/i, ["ga"]],
  [/german|infrared|\bir\b|thermal|lens|seeker|night.?vision|flir|solar cell|solar array/i, ["ge"]],
  [/tungsten|wolfram|penetrator|carbide|kinetic|heavy alloy|apfsds/i, ["w"]],
  [/antimon|primer|tracer|insb|flame.?retard/i, ["sb"]],
  [/titan|ti-?6al|airframe|armou?r plate|fan blade/i, ["ti"]],
  [/lithium|li-?ion|battery|cell|lfp|nmc|power pack/i, ["li", "gr"]],
  [/cobalt|superalloy|turbine|hot section/i, ["co", "ni"]],
  [/nickel|inconel|nmc|cathode/i, ["ni"]],
  [/graphite|anode/i, ["gr"]]
];
const SAT_FACTS = {
  name: "Sentinel-2", src: [{ t: "ESA: Sentinel-2 facts and figures", u: "https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-2/Facts_and_figures" }],
  facts: ["Orbits at 786 km in a polar, sun-synchronous orbit", "Each pass images a 290 km wide strip at up to 10 m resolution", "With two satellites it revisits every point on the equator every five days", "Sentinel-2A launched in 2015, 2B in 2017 and 2C in 2024"]
};

/* ---- live layer ---- */
const LIVE_SATS = [
  { id: "s2c", norad: 60989, name: "Sentinel-2C", fam: "s2", swath: 290, img: true, color: "#8ec5ff", owner: "ESA, for the EU's Copernicus programme",
    role: "Photographs the land in 13 colours at up to 10 m. The mine images in this atlas come from the Sentinel-2 satellites." },
  { id: "s2b", norad: 42063, name: "Sentinel-2B", fam: "s2", swath: 290, img: true, color: "#8ec5ff", owner: "ESA, for the EU's Copernicus programme",
    role: "Photographs the land in 13 colours at up to 10 m. The mine images in this atlas come from the Sentinel-2 satellites." },
  { id: "s2a", norad: 40697, name: "Sentinel-2A", fam: "s2", swath: 290, img: true, color: "#8ec5ff", owner: "ESA, for the EU's Copernicus programme",
    role: "The first Sentinel-2, launched in 2015 and still flying alongside its successors." },
  { id: "l9", norad: 49260, name: "Landsat 9", fam: "ls", swath: 185, img: true, color: "#ffd27a", owner: "NASA and the US Geological Survey",
    role: "Images the land at 30 m, with thermal bands. The Landsat programme has photographed the same places since 1972." },
  { id: "l8", norad: 39084, name: "Landsat 8", fam: "ls", swath: 185, img: true, color: "#ffd27a", owner: "NASA and the US Geological Survey",
    role: "Images the land at 30 m, with thermal bands. The Landsat programme has photographed the same places since 1972." },
  { id: "enmap", norad: 52159, name: "EnMAP", fam: "enmap", swath: 30, img: false, color: "#c7a8ff", owner: "DLR, the German Aerospace Center",
    role: "A hyperspectral imager that splits light into more than 200 bands, enough to tell minerals apart from orbit. It photographs chosen targets on request." },
  { id: "iss", norad: 25544, name: "ISS · EMIT", fam: "iss", swath: 0, img: false, color: "#f3f4f4", owner: "NASA, on the International Space Station",
    role: "The space station carries NASA's EMIT imaging spectrometer, which maps the minerals of the world's dry regions." }
];
const SAT_SRC = {
  s2: [{ t: "ESA: Sentinel-2", u: "https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-2/Facts_and_figures" }],
  ls: [{ t: "USGS: Landsat missions", u: "https://www.usgs.gov/landsat-missions" }],
  enmap: [{ t: "EnMAP", u: "https://www.enmap.org/" }],
  iss: [{ t: "NASA JPL: EMIT", u: "https://earth.jpl.nasa.gov/emit/" }]
};
/* orbit data bundled with the page; the live feed replaces it with newer elements */
const ORBIT_SNAPSHOT = {"fetchedAt": "2026-10-23T11:41:00Z", "sats": [{"norad": 39084, "l1": "1 39084U 13008A   26296.16264818  .00000185  00000+0  51212-4 0  9995", "l2": "2 39084  98.2174   4.6858 0001362  91.8570 268.2784 14.57098457716539"}, {"norad": 40697, "l1": "1 40697U 15028A   26296.18662990 -.00000023  00000+0  79635-5 0  9998", "l2": "2 40697  98.5636   9.1663 0001086  96.2332 263.8974 14.30824132592036"}, {"norad": 42063, "l1": "1 42063U 17013A   26295.96974840  .00000019  00000+0  23954-4 0  9994", "l2": "2 42063  98.5743   8.9125 0001125  88.6326 271.4986 14.30814628502911"}, {"norad": 49260, "l1": "1 49260U 21088A   26296.12836762  .00000264  00000+0  68742-4 0  9992", "l2": "2 49260  98.2155   4.6657 0001168  85.5221 274.6110 14.57118475269630"}, {"norad": 60989, "l1": "1 60989U 24157A   26296.21449972  .00000080  00000+0  47252-4 0  9995", "l2": "2 60989  98.5685   9.1564 0000883  86.7612 273.3671 14.30822018111291"}, {"norad": 25544, "l1": "1 25544U 98067A   26295.98338418  .00009682  00000+0  18356-3 0  9998", "l2": "2 25544  51.6334  27.6879 0006864 297.6388  62.3903 15.49006294591569"}, {"norad": 52159, "l1": "1 52159U 22033C   26296.17798019 -.00000133  00000+0 -12348-4 0  9999", "l2": "2 52159  97.9783  16.5823 0001422  90.9991 269.1381 14.74948082245523"}]};
const WMO = { 0: "Clear", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Fog", 48: "Fog", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 56: "Freezing drizzle", 57: "Freezing drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain", 66: "Freezing rain", 67: "Freezing rain", 71: "Light snow", 73: "Snow", 75: "Heavy snow", 77: "Snow grains", 80: "Rain showers", 81: "Rain showers", 82: "Violent showers", 85: "Snow showers", 86: "Snow showers", 95: "Thunderstorm", 96: "Thunderstorm, hail", 99: "Thunderstorm, hail" };
const HZ_TYPE = { EQ: "Earthquake", TC: "Tropical cyclone", FL: "Flood", VO: "Volcano", DR: "Drought", WF: "Wildfire", CF: "Armed conflict" };
const R_E = 6371;

const QUIZ = [
  { q: "What share of the world's primary gallium is made in China?", a: 99, m: "ga", src: "USGS MCS 2026 · 2025 data", exp: "Gallium is a by-product of alumina refining, and almost all primary capacity is in China." },
  { q: "What share of the world's cobalt is mined in the DR Congo?", a: 74, m: "co", src: "USGS MCS 2026 · 2025 data", exp: "About 230,000 of 310,000 tonnes. Most of it is then refined in China." },
  { q: "What share of the world's sintered rare-earth magnets is made in China?", a: 94, m: "ree", src: "IEA · October 2025", exp: "Up from around 50% two decades ago." },
  { q: "What share of the world's lithium is mined in Australia?", a: 32, m: "li", src: "USGS MCS 2026 · 2025 data", exp: "Australia leads mining, but China makes about 70% of the world's lithium chemicals." },
  { q: "What share of the EU's rare-earth magnet imports comes from China?", a: 98, m: "ree", src: "MERICS · October 2025", exp: "Those magnets go into drones, missiles, fighter jets and electric motors." }
];

/* ================= state ================= */
let filter = "all";
let selected = null, selRoute = null, selChoke = null, selSat = false, selHz = null, selLive = false, selShip = null;
let layers = { sites: true, routes: true, choke: true, activity: true, production: true, satellite: true, hazards: true, ships: true, conflict: true, clouds: true };
const LIVE = { orbits: null, hazards: null, conditions: null, scenes: null, prices: null, ships: null, traffic: null, conflict: null, tenders: null, trade: null };
/* small screens: lighter textures and fewer pixels */
const SMALL = Math.min(screen.width || 9999, screen.height || 9999) < 820;
/* v15.6: phones, data-saver browsers and ?lite get a lighter globe: lower resolution, no glow, 30 frames a second while idle */
const LITE = SMALL || /[?&]lite\b/.test(location.search) || !!(navigator.connection && navigator.connection.saveData);
let ORBITS = [], ORBIT_BY_ID = {}, HZ = [], HZ_BY_ID = {};
let NEWS = [], WATCH = [], META = null, BRIEFS = [], briefPick = null;
let wireState = "loading";
let newsAll = false;
let ACTIVE = {};
let tourIdx = -1;
const sysOf = (f) => (typeof f === "string" && f.startsWith("sys:")) ? SYSTEMS[f.slice(4)] || null : null;
const matsOf = (f) => f === "all" ? null : (sysOf(f) ? sysOf(f).parts.map((p) => p.m) : (typeof f === "string" && f.startsWith("pair:")) ? f.slice(5).split("+") : [f]);
const inFilter = (m) => { const ms = matsOf(filter); return !ms || ms.includes(m); };
const isExploring = () => document.body.classList.contains("exploring");

/* ================= element and system tiles ================= */
const ELEM = {
  ree: { s: "Nd", n: 60 }, ti: { s: "Ti", n: 22 }, w: { s: "W", n: 74 }, sb: { s: "Sb", n: 51 },
  ga: { s: "Ga", n: 31 }, ge: { s: "Ge", n: 32 },
  li: { s: "Li", n: 3 }, co: { s: "Co", n: 27 }, ni: { s: "Ni", n: 28 }, gr: { s: "C", n: 6 },
  mg: { s: "Mg", n: 12 }, mn: { s: "Mn", n: 25 }
};
const CC = { "China": "CN", "Australia": "AU", "DR Congo": "CD", "Indonesia": "ID" };
function tileShare(m) {
  const t = topStage(m);
  return t ? `${pctTxt(t)} ${CC[t.who] || t.who}` : "CN leads";
}
const filtersEl = $("#filters"), systemsEl = $("#systems");
filtersEl.innerHTML = ORDER.map((m) => `
  <button class="el filter" data-m="${m}" aria-pressed="false" style="--c:${cssVar(m)}" aria-label="${esc(MATERIALS[m].name)}, ${esc(tileShare(m))}">
    <span class="el-top"><span>${ELEM[m].n}</span><i></i></span>
    <span class="el-s">${ELEM[m].s}</span>
    <span class="el-name">${esc(MATERIALS[m].name)}</span>
    <span class="el-v">${esc(tileShare(m))}</span>
  </button>`).join("");
systemsEl.innerHTML = Object.entries(SYSTEMS).map(([id, s]) => `
  <button class="el sys" data-m="sys:${id}" aria-pressed="false" aria-label="${esc(s.name)}">
    <span class="el-top"><span>${s.parts.length} material${s.parts.length > 1 ? "s" : ""}</span></span>
    ${SYS_ICON[id]}
    <span class="el-name">${esc(s.name)}</span>
    <span class="el-v">${esc(ELEM[s.choke].s)} ${esc(tileShare(s.choke))}</span>
  </button>`).join("");
document.getElementById("dock").addEventListener("click", (e) => {
  const b = e.target.closest(".el");
  if (b) setFilter(b.dataset.m === filter ? "all" : b.dataset.m, true);
});
const tabBtns = document.querySelectorAll(".seg.browse [role=tab]");
function showTab(t) {
  tabBtns.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === t)));
  filtersEl.hidden = t !== "materials";
  systemsEl.hidden = t !== "systems";
  $("#hint-line").textContent = t === "systems" ? "Each system's biggest chokepoint" : "Top country's share at the most concentrated stage";
}
tabBtns.forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));
function paintChips() {
  document.querySelectorAll(".el").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.m === filter)));
  if (sysOf(filter)) showTab("systems"); else if (filter !== "all") showTab("materials");
}

/* ================= globe ================= */
const globe = (function initGlobe() {
  const canvas = $("#globe"), plate = $("#plate"), labelsEl = $("#labels");
  /* v47: a small legend for the rings and markers. It shows while the globe is zoomed out and steps aside when the
     camera comes close, a drawer is open or the tour runs. It can be folded; the choice is remembered. */
  const legendEl = (() => {
    const el = document.createElement("div"); el.className = "glegend glass gl-off"; el.id = "glegend";
    const L = [
      ["#ff5a5a", T("Severe disaster alert", "Závažná výstraha před katastrofou")],
      ["#ff9f43", T("Serious alert, or a river too low or too high", "Vážná výstraha nebo řeka s příliš nízkou či vysokou vodou")],
      ["#ffd166", T("Moderate alert", "Mírná výstraha")],
      ["#f5b14c", T("Earthquake M5+, larger when stronger", "Zemětřesení M5+, větší kruh = silnější")],
      ["#7fd3ff", T("Tropical cyclone", "Tropický cyklon")],
      ["#9fe0b0", T("Other natural hazard: flood, fire, drought, volcano", "Jiný přírodní jev: povodeň, požár, sucho, sopka")],
      ["#d2b0ff", T("Armed conflict, larger when more events", "Ozbrojený konflikt, větší kruh = více událostí")],
      ["#eceee9", T("Chokepoint on a trade route", "Úzké místo na obchodní trase")]
    ];
    let folded = false;
    try { const v = localStorage.getItem("oo-legend"); folded = v ? v === "0" : innerWidth < 520; } catch (e) { folded = innerWidth < 520; }   // open for a first visit, folded on phones
    el.innerHTML = `<button type="button" class="gl-h" aria-expanded="${!folded}">${T("What the rings mean", "Co znamenají kruhy")}<i aria-hidden="true"></i></button>` +
      `<ul class="gl-l">${L.map(([c, t]) => `<li><span class="gl-ring" style="--c:${c}"></span>${t}</li>`).join("")}` +
      `<li><span class="gl-ship"></span>${T("Ship, live position", "Loď, aktuální poloha")}</li>` +
      `<li><span class="gl-pin"></span>${T("Mine or plant: the colour shows the mineral", "Důl nebo závod: barva značí surovinu")}</li></ul>`;
    el.classList.toggle("gl-fold", folded);
    el.querySelector(".gl-h").addEventListener("click", () => {
      folded = !folded; el.classList.toggle("gl-fold", folded); el.querySelector(".gl-h").setAttribute("aria-expanded", String(!folded));
      try { localStorage.setItem("oo-legend", folded ? "0" : "1"); } catch (e) {}
    });
    plate.appendChild(el);
    /* build 62: on phones the legend sits just above the element strip (atlas-v2.css). The strip's height changes with
       the tab, the safe area and the screen, so it is kept on the plate as --dock-h; only the strip's size writes it. */
    const dock = document.getElementById("dock");
    const dockH = () => { if (dock) plate.style.setProperty("--dock-h", dock.offsetHeight + "px"); };
    dockH();
    if (dock && window.ResizeObserver) new ResizeObserver(dockH).observe(dock);
    return el;
  })();
  let legendOn = false;
  const fail = (msg) => {
    const d = document.createElement("div"); d.className = "fallback"; d.textContent = msg;
    plate.appendChild(d); canvas.hidden = true; return null;
  };
  if (!window.THREE) return fail("The 3D globe could not load. The scenarios, briefing and chokepoints below still work.");
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); }
  catch (e) { return fail("This globe needs WebGL, which is turned off in this browser. The sections below still work."); }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, LITE ? 1.25 : 2));
  renderer.setClearColor(0x050607, 1);
  let composer = null, bloomPass = null;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.05, 200);
  let dirty = true, drawnOnce = false;
  /* v15: light for the 3D models. The sun sits where it really is; a soft light from the viewer keeps models on the
     night side readable; a small generated sky gives metal and solar panels something to reflect. */
  const sunLight = new THREE.DirectionalLight(0xfff0d8, 0.5); scene.add(sunLight);
  const viewLight = new THREE.DirectionalLight(0xdce8ff, 0.42); scene.add(viewLight);
  scene.add(new THREE.HemisphereLight(0xd6e4ff, 0x1c2128, 0.28));
  /* a small painted sky cube (no PMREM: its encoding washed models out to white in this three.js version) */
  let envTex = null;
  try {
    const face = (dir) => {
      const c = document.createElement("canvas"); c.width = c.height = 32;
      const x = c.getContext("2d"), im = x.createImageData(32, 32), sun = new THREE.Vector3(0.5, 0.75, 0.45).normalize(), d = new THREE.Vector3();
      for (let j = 0; j < 32; j++) for (let i = 0; i < 32; i++) {
        const u = (i + 0.5) / 16 - 1, v = (j + 0.5) / 16 - 1;
        dir(u, v, d); d.normalize();
        const t = Math.min(1, Math.max(0, (d.y + 0.25) / 1.15)), k = t * t * (3 - 2 * t), sp = Math.pow(Math.max(0, d.dot(sun)), 40);
        const o = (j * 32 + i) * 4;
        im.data[o] = Math.min(255, (0.04 + 0.42 * k + 0.9 * sp) * 255); im.data[o + 1] = Math.min(255, (0.05 + 0.55 * k + 0.82 * sp) * 255);
        im.data[o + 2] = Math.min(255, (0.07 + 0.76 * k + 0.7 * sp) * 255); im.data[o + 3] = 255;
      }
      x.putImageData(im, 0, 0); return c;
    };
    envTex = new THREE.CubeTexture([
      face((u, v, d) => d.set(1, -v, -u)), face((u, v, d) => d.set(-1, -v, u)), face((u, v, d) => d.set(u, 1, v)),
      face((u, v, d) => d.set(u, -1, -v)), face((u, v, d) => d.set(u, -v, 1)), face((u, v, d) => d.set(-u, -v, -1))
    ]);
    envTex.needsUpdate = true;
  } catch (e) { envTex = null; }
  const ll2v = (lat, lng, r) => {
    const la = lat * Math.PI / 180, ph = (lng + 180) * Math.PI / 180;
    return new THREE.Vector3(-Math.cos(ph) * Math.cos(la) * r, Math.sin(la) * r, Math.sin(ph) * Math.cos(la) * r);
  };
  const slerpV = (a, b, t) => {
    const ang = a.angleTo(b);
    if (ang < 1e-6) return a.clone();
    const s = Math.sin(ang);
    return a.clone().multiplyScalar(Math.sin((1 - t) * ang) / s).add(b.clone().multiplyScalar(Math.sin(t * ang) / s));
  };

  /* stars */
  (function stars() {
    /* a richer sky: stars of many brightnesses and tints, and a faint Milky Way band tilted as on the real sky */
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const N1 = SMALL ? 2400 : 4600, N2 = SMALL ? 5000 : 14000, n = N1 + N2, dpr = Math.min(2, window.devicePixelRatio || 1);
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), size = new Float32Array(n);
    const gN = new THREE.Vector3(0.12, 0.46, 0.88).normalize();
    const ax = new THREE.Vector3(1, 0, 0).cross(gN).normalize(), bx = gN.clone().cross(ax).normalize();
    const tint = [[0.72, 0.8, 1.0], [0.88, 0.92, 1.0], [1.0, 1.0, 1.0], [1.0, 0.94, 0.84], [1.0, 0.82, 0.66]];
    const v = new THREE.Vector3();
    for (let i = 0; i < n; i++) {
      if (i < N1) { const u = rnd() * 2 - 1, t = rnd() * Math.PI * 2, r = Math.sqrt(1 - u * u); v.set(r * Math.cos(t), u, r * Math.sin(t)); }
      else {
        const t = rnd() * Math.PI * 2, h = (rnd() + rnd() + rnd() - 1.5) * 0.15 * (1 + 0.7 * Math.max(0, Math.cos(t - 0.6)));
        v.copy(ax).multiplyScalar(Math.cos(t)).addScaledVector(bx, Math.sin(t)).addScaledVector(gN, h).normalize();
      }
      pos[i * 3] = v.x * 60; pos[i * 3 + 1] = v.y * 60; pos[i * 3 + 2] = v.z * 60;
      const br = i < N1 ? Math.pow(rnd(), 3.4) : Math.pow(rnd(), 2.2) * 0.42;
      const c = tint[Math.floor(rnd() * tint.length)], k = 0.22 + 0.78 * br;
      col[i * 3] = c[0] * k; col[i * 3 + 1] = c[1] * k; col[i * 3 + 2] = c[2] * k;
      size[i] = (i < N1 ? 0.9 + 2.8 * br : 0.8 + 1.1 * br) * dpr;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aCol", new THREE.BufferAttribute(col, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    scene.add(new THREE.Points(g, new THREE.ShaderMaterial({
      vertexShader: "attribute vec3 aCol; attribute float aSize; varying vec3 vC; void main() { vC = aCol; gl_PointSize = aSize; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: "varying vec3 vC; void main() { float r = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.05, r); gl_FragColor = vec4(vC * a, 1.0); }",
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    })));
    /* the glow of the band itself */
    const band = new THREE.Mesh(new THREE.SphereGeometry(70, 48, 32), new THREE.ShaderMaterial({
      uniforms: { gN: { value: gN }, ax: { value: ax } },
      vertexShader: "varying vec3 vD; void main() { vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform vec3 gN; uniform vec3 ax; varying vec3 vD;
        float h(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
        void main() {
          float y = dot(vD, gN), core = max(0.0, dot(vD, ax));
          float b = exp(-pow(y / (0.11 + 0.06 * core), 2.0));
          float dust = 0.75 + 0.25 * sin(dot(vD, vec3(23.0, 17.0, 31.0))) * sin(dot(vD, vec3(-13.0, 29.0, 7.0)));
          float lane = 1.0 - 0.45 * exp(-pow(y / 0.025, 2.0)) * core;
          vec3 c = mix(vec3(0.42, 0.5, 0.72), vec3(0.85, 0.74, 0.6), core * 0.7) * b * dust * lane * (0.05 + 0.06 * core);
          gl_FragColor = vec4(c + (h(floor(vD * 900.0)) - 0.5) * 0.004, 1.0);
        }`,
      side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    }));
    scene.add(band);
  })();

  /* earth */
  const uniforms = {
    dayMap: { value: null }, nightMap: { value: null }, specMap: { value: null },
    sunDir: { value: new THREE.Vector3(1, 0, 0) }, even: { value: 0 }, ready: { value: 0 }, nightGain: { value: 1.25 }, cloudMap: { value: null }, cloudOn: { value: 0 },
    dayTexel: { value: new THREE.Vector2(1 / 2048, 1 / 1024) }, sharp: { value: 0.55 }
  };
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv; varying vec3 vN; varying vec3 vP;
      void main() {
        vUv = uv; vN = normalize(mat3(modelMatrix) * normal);
        vec4 wp = modelMatrix * vec4(position, 1.0); vP = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      uniform sampler2D dayMap; uniform sampler2D nightMap; uniform sampler2D specMap; uniform sampler2D cloudMap;
      uniform vec3 sunDir; uniform float even; uniform float ready; uniform float nightGain; uniform float cloudOn;
      uniform vec2 dayTexel; uniform float sharp;
      varying vec2 vUv; varying vec3 vN; varying vec3 vP;
      void main() {
        vec3 n = normalize(vN);
        vec3 v = normalize(cameraPosition - vP);
        vec3 day = texture2D(dayMap, vUv).rgb;
        /* v15: a light unsharp mask, so coastlines and relief stay crisp when the map is magnified */
        vec3 nb = texture2D(dayMap, vUv + vec2(dayTexel.x, 0.0)).rgb + texture2D(dayMap, vUv - vec2(dayTexel.x, 0.0)).rgb
                + texture2D(dayMap, vUv + vec2(0.0, dayTexel.y)).rgb + texture2D(dayMap, vUv - vec2(0.0, dayTexel.y)).rgb;
        day = clamp(day + (day - nb * 0.25) * sharp, 0.0, 1.0);
        vec3 night = texture2D(nightMap, vUv).rgb;
        float water = texture2D(specMap, vUv).r;
        float d = dot(n, sunDir);
        float dayAmt = smoothstep(-0.10, 0.22, d);
        /* cloud shadows: the cloud that shades a point sits a little towards the sun */
        float shadow = 0.0;
        if (cloudOn > 0.001) {
          vec3 east = normalize(vec3(n.z, 0.0, -n.x) + vec3(1e-5, 0.0, 0.0));
          vec3 north = cross(n, east);
          float cl = max(0.2, length(n.xz));
          vec2 off = vec2(dot(sunDir, east) / (6.2832 * cl), dot(sunDir, north) / 3.1416) * 0.009;
          float c = texture2D(cloudMap, vUv + off).r;
          shadow = smoothstep(0.25, 0.95, c) * 0.4 * cloudOn * smoothstep(0.0, 0.3, d) * (1.0 - even);
        }
        vec3 lit = day * (0.16 + 1.08 * max(d, 0.0)) * (1.0 - shadow);
        vec3 dark = day * (0.07 + (1.25 - nightGain) * 0.09) + night * vec3(1.0, 0.8, 0.52) * nightGain;
        vec3 sunCol = mix(dark, lit, dayAmt);
        /* warm light along the day-night line, where sunlight crosses a long path of air */
        float twi = exp(-pow((d - 0.03) / 0.11, 2.0)) * (1.0 - even);
        sunCol = mix(sunCol, sunCol * vec3(1.12, 0.78, 0.6) + day * vec3(0.22, 0.08, 0.02), twi * 0.65);
        vec3 h = normalize(sunDir + v);
        float nh = max(dot(n, h), 0.0);
        float fres = pow(1.0 - max(dot(n, v), 0.0), 5.0);
        sunCol += vec3(1.0, 0.93, 0.8) * (pow(nh, 90.0) * 0.32 + fres * 0.05) * water * dayAmt * (1.0 - shadow);
        vec3 evenCol = day * (0.6 + 0.5 * max(dot(n, v), 0.0));
        vec3 col = mix(sunCol, evenCol, even);
        float rim = pow(1.0 - max(dot(n, v), 0.0), 3.0);
        col += mix(vec3(0.3, 0.55, 1.0), vec3(1.0, 0.55, 0.3), twi * 0.6) * rim * 0.42 * mix(max(dayAmt, 0.15), 1.0, even);
        col = mix(vec3(0.05, 0.08, 0.12) + rim * vec3(0.1, 0.2, 0.35), col, ready);
        gl_FragColor = vec4(col, 1.0);
      }`
  })));
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), new THREE.ShaderMaterial({
    uniforms: { sunDir: uniforms.sunDir, even: uniforms.even },
    vertexShader: `varying vec3 vN; varying vec3 vW; void main() { vN = normalize(normalMatrix * normal); vW = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform vec3 sunDir; uniform float even; varying vec3 vN; varying vec3 vW;
      void main() {
        float i = pow(max(0.72 - dot(vN, vec3(0.0, 0.0, 1.0)), 0.0), 3.2);
        float s = dot(normalize(vW), sunDir);
        float dayG = smoothstep(-0.45, 0.3, s);
        float tw = exp(-pow((s + 0.06) / 0.2, 2.0)) * (1.0 - even);
        vec3 col = mix(vec3(0.12, 0.2, 0.42), vec3(0.33, 0.6, 1.0), dayG) * mix(0.32 + 0.78 * dayG, 1.0, even) + vec3(1.0, 0.48, 0.2) * tw * 0.55;
        gl_FragColor = vec4(col * i, 1.0);
      }`,
    side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
  }));
  atmo.scale.setScalar(1.075);
  scene.add(atmo);

  const loader = new THREE.TextureLoader();
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  let loaded = 0, fadeIn = 0;
  const tex = (url, key) => loader.load(url, (t) => {
    t.anisotropy = aniso; uniforms[key].value = t; loaded++;
    if (key === "dayMap" && t.image && t.image.width) uniforms.dayTexel.value.set(1 / t.image.width, 1 / t.image.height);
    if (loaded === 3) fadeIn = performance.now();
    try { window.dispatchEvent(new CustomEvent("globe-tex", { detail: loaded })); } catch (e) { /* old browsers */ }
    dirty = true;
  });
  /* v15: the 1k maps only on low-memory devices (they were also used on laptops with small screen settings, which
     made the globe blurry); 2k everywhere else; on desktops, sharper day and night maps when the files exist */
  const memGB = navigator.deviceMemory || 8;
  const coarse = !!(window.matchMedia && matchMedia("(pointer: coarse)").matches);
  const tx = (memGB < 3 || Math.min(screen.width || 9999, screen.height || 9999) < 360) ? "-1k" : "";
  /* v15.9: every device starts with the light 1k maps so the globe appears fast; capable screens upgrade to 2k once idle */
  tex("textures/earth-day-1k.jpg", "dayMap");
  tex("textures/earth-night-1k.jpg", "nightMap");
  tex("textures/earth-water-1k.jpg", "specMap");
  const HI_TEX = !tx && !coarse && memGB >= 4 && (renderer.capabilities.maxTextureSize || 0) >= 8192 && !/[?&]lowtex\b/.test(location.search);
  const texRank = {};
  const hiTex = (url, key, rank, fallback) => loader.load(url, (t) => {
    if ((texRank[key] || 0) > rank) { t.dispose(); return; }   // a sharper map already arrived
    texRank[key] = rank;
    t.anisotropy = aniso;
    const old = uniforms[key].value; uniforms[key].value = t; if (old && old !== t) old.dispose();
    if (key === "dayMap" && t.image && t.image.width) { uniforms.dayTexel.value.set(1 / t.image.width, 1 / t.image.height); if (rank >= 3) uniforms.sharp.value = 0.3; }
    dirty = true;
  }, undefined, () => { if (fallback) hiTex(fallback, key, 2); });   // no sharper map on this server: use the 2k one
  const whenIdle = (f, ms) => setTimeout(() => (window.requestIdleCallback || ((g) => g()))(f, { timeout: 2000 }), ms);
  const conn = navigator.connection || {};
  const slowNet = !!conn.saveData || /^(slow-2g|2g|3g)$/.test(conn.effectiveType || "");
  if (!tx && !HI_TEX && !slowNet) window.addEventListener("globe-tex", function up2k(e) {
    if (e.detail !== 3) return;
    window.removeEventListener("globe-tex", up2k);
    const go = () => whenIdle(() => { hiTex("textures/earth-day.jpg", "dayMap", 2); hiTex("textures/earth-night.jpg", "nightMap", 2); hiTex("textures/earth-water.jpg", "specMap", 2); }, 400);
    /* v48: on a phone the sharper maps (about 0.9 MB) wait until the visitor opens the interactive atlas */
    if (!SMALL || document.body.classList.contains("exploring")) { go(); return; }
    const mo = new MutationObserver(() => { if (document.body.classList.contains("exploring")) { mo.disconnect(); go(); } });   // reads body's class only
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  });
  if (HI_TEX) window.addEventListener("globe-tex", function hiOnce(e) {
    if (e.detail !== 3) return;
    window.removeEventListener("globe-tex", hiOnce);
    whenIdle(() => { hiTex("textures/earth-day-hi.jpg", "dayMap", 3, "textures/earth-day.jpg"); hiTex("textures/earth-night-hi.jpg", "nightMap", 3, "textures/earth-night.jpg"); hiTex("textures/earth-water.jpg", "specMap", 2); }, 1200);
  });
  fetch("data/borders.json").then((r) => r.ok ? r.json() : null).then((rings) => {
    if (!Array.isArray(rings)) return;
    const pts = [];
    rings.forEach((ring) => {
      for (let i = 0; i + 3 < ring.length; i += 2) {
        const a = ll2v(ring[i + 1], ring[i], 1.0012), b = ll2v(ring[i + 3], ring[i + 2], 1.0012);
        pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    scene.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xc9d6e6, transparent: true, opacity: 0.16, depthWrite: false })));
    dirty = true;
  }).catch(() => {});

  /* v15 site pins: small lit 3D models that read from above and from the side.
     Mine: a hexagonal crystal. Processing: a plant with a stack. Magnets: a horseshoe magnet. Planned: a glass crystal. */
  const mergeGeo = (list) => {
    const P = [];
    list.forEach((g) => { const ng = g.index ? g.toNonIndexed() : g; P.push(...ng.attributes.position.array); });
    const out = new THREE.BufferGeometry();
    out.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
    out.computeVertexNormals();
    return out;
  };
  const upZ = (g) => { g.rotateX(Math.PI / 2); return g; };
  const crystalGeo = upZ(mergeGeo([
    new THREE.CylinderGeometry(0.0078, 0.0078, 0.013, 6, 1, true).translate(0, 0.0065, 0),
    new THREE.ConeGeometry(0.0078, 0.0095, 6, 1, true).translate(0, 0.013 + 0.00475, 0),
    new THREE.ConeGeometry(0.0078, 0.004, 6, 1, true).rotateX(Math.PI).translate(0, -0.002, 0)
  ]));
  const plantGeo = upZ(mergeGeo([
    new THREE.BoxGeometry(0.017, 0.0105, 0.013).translate(-0.002, 0.00525, 0),
    new THREE.CylinderGeometry(0.0048, 0.0048, 0.0085, 12).translate(-0.0045, 0.0105 + 0.00425, 0),
    new THREE.CylinderGeometry(0.0019, 0.0024, 0.019, 10).translate(0.0058, 0.0095, 0)
  ]));
  const magnetGeo = mergeGeo([
    new THREE.TorusGeometry(0.0074, 0.003, 10, 22, Math.PI),
    new THREE.CylinderGeometry(0.003, 0.003, 0.0075, 12).translate(0.0074, -0.00375, 0),
    new THREE.CylinderGeometry(0.003, 0.003, 0.0075, 12).translate(-0.0074, -0.00375, 0)
  ]);
  const magnetTipGeo = mergeGeo([
    new THREE.CylinderGeometry(0.00305, 0.00305, 0.003, 12).translate(0.0074, -0.009, 0),
    new THREE.CylinderGeometry(0.00305, 0.00305, 0.003, 12).translate(-0.0074, -0.009, 0)
  ]);
  const crystalEdges = new THREE.EdgesGeometry(crystalGeo, 25);
  const stalkGeo = new THREE.CylinderGeometry(0.0011, 0.0011, 1, 8);
  stalkGeo.rotateX(Math.PI / 2); stalkGeo.translate(0, 0, 0.5);
  const stalkMat = new THREE.MeshStandardMaterial({ color: 0xc9d2dc, metalness: 0.85, roughness: 0.3, envMap: envTex });
  const tipMat = new THREE.MeshStandardMaterial({ color: 0xdfe4ea, metalness: 0.9, roughness: 0.25, envMap: envTex });
  const glowTex = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 64;
    const x = c.getContext("2d"), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.35, "rgba(255,255,255,0.45)"); gr.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();
  const discGeo = new THREE.PlaneGeometry(0.03, 0.03);
  const pulseGeo = new THREE.RingGeometry(0.013, 0.0165, 40);
  function pinHead(stage, color) {
    const base = { color, metalness: 0.1, roughness: 0.34, envMap: envTex, envMapIntensity: 0.55, emissive: color, emissiveIntensity: 0.22 };
    if (stage === "Processing") return new THREE.Mesh(plantGeo, new THREE.MeshStandardMaterial(Object.assign(base, { flatShading: true, metalness: 0.35 })));
    if (stage === "Magnets") {
      const h = new THREE.Group();
      h.add(new THREE.Mesh(magnetGeo, new THREE.MeshStandardMaterial(Object.assign(base, { metalness: 0.3, roughness: 0.25 }))), new THREE.Mesh(magnetTipGeo, tipMat));
      h.rotation.x = -0.5; h.position.y = 0;
      const w = new THREE.Group(); w.add(h); return w;
    }
    if (stage === "Planned") {
      const h = new THREE.Group();
      h.add(new THREE.Mesh(crystalGeo, new THREE.MeshStandardMaterial(Object.assign(base, { transparent: true, opacity: 0.32, depthWrite: false, emissiveIntensity: 0.5 }))));
      h.add(new THREE.LineSegments(crystalEdges, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 })));
      return h;
    }
    return new THREE.Mesh(crystalGeo, new THREE.MeshStandardMaterial(Object.assign(base, { flatShading: true })));
  }
  const pins = SITES.map((s) => {
    const p = ll2v(s.lat, s.lng, 1.0005);
    const g = new THREE.Group();
    g.position.copy(p); g.lookAt(p.clone().multiplyScalar(2));
    const color = new THREE.Color(PIN[s.m]);
    const stalk = new THREE.Mesh(stalkGeo, stalkMat); stalk.scale.set(1, 1, 0.026);
    const head = pinHead(s.stage, color);
    head.position.z = s.stage === "Magnets" ? 0.036 : 0.026;
    const disc = new THREE.Mesh(discGeo, new THREE.MeshBasicMaterial({ map: glowTex, color, transparent: true, opacity: 0.6, depthWrite: false }));
    disc.position.z = 0.0004;
    const pulse = new THREE.Mesh(pulseGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
    pulse.position.z = 0.002; pulse.visible = false;
    g.add(stalk, head, disc, pulse);
    scene.add(g);
    const label = document.createElement("div");
    label.className = "pin-label";
    label.style.setProperty("--c", PIN[s.m]);
    label.innerHTML = `${esc(s.name)}<small>${esc(MATERIALS[s.m].name)} · ${esc(s.stage.toLowerCase())}</small>`;
    labelsEl.appendChild(label);
    return { s, g, head, pulse, label, unit: p.clone().normalize(), shown: false };
  });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.022, 0.027, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide }));
  ring.visible = false; scene.add(ring);

  /* trade routes: tubes with flowing dashes */
  const routeVS = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
  const routeFS = `
    uniform vec3 uColor; uniform float uTime; uniform float uDash; uniform float uLand; uniform float uAlpha; uniform float uHi;
    varying vec2 vUv;
    void main() {
      float x = vUv.x * uDash;
      float a;
      if (uLand > 0.5) {
        a = step(0.5, fract(x * 2.2)) * 0.7;
      } else {
        float t = fract(x - uTime * 0.55);
        a = 0.22 + 0.78 * smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.16, 0.42, t));
      }
      gl_FragColor = vec4(uColor * (0.85 + uHi * 0.5), a * uAlpha);
    }`;
  const routeObjs = ROUTES.map((r) => {
    const group = new THREE.Group();
    const mats = [], samples = [], seaCurves = [];
    const color = new THREE.Color(r.m.length > 1 ? "#e9edf1" : PIN[r.m[0]]);
    r.legs.forEach((leg) => {
      const pts = [];
      for (let i = 0; i < leg.pts.length - 1; i++) {
        const a = ll2v(leg.pts[i][0], leg.pts[i][1], 1).normalize(), b = ll2v(leg.pts[i + 1][0], leg.pts[i + 1][1], 1).normalize();
        const n = Math.max(2, Math.ceil(a.angleTo(b) / 0.02));
        for (let k = 0; k < n; k++) pts.push(slerpV(a, b, k / n).multiplyScalar(1.0055));
      }
      const last = leg.pts[leg.pts.length - 1];
      pts.push(ll2v(last[0], last[1], 1.0055));
      const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
      if (!leg.land) seaCurves.push(curve);
      const len = curve.getLength();
      const mat = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: color }, uTime: { value: 0 }, uDash: { value: Math.max(2, len * 7) }, uLand: { value: leg.land ? 1 : 0 }, uAlpha: { value: r.alt ? 0.6 : 1 }, uHi: { value: 0 } },
        vertexShader: routeVS, fragmentShader: routeFS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
      });
      mats.push(mat);
      group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(24, pts.length * 2), leg.land ? 0.0018 : 0.0026, 6, false), mat));
      for (let i = 0; i < pts.length; i += 3) samples.push(pts[i]);
    });
    scene.add(group);
    const label = document.createElement("div");
    label.className = "pin-label route";
    label.textContent = r.name;
    labelsEl.appendChild(label);
    return { r, group, mats, samples, seaCurves, label, mid: samples[Math.floor(samples.length / 2)], shown: false };
  });

  /* illustrative ships on the sea legs: v15 uses the same detailed hulls as the live AIS ships */
  let illusGeo = null;
  const illusMat = new THREE.MeshBasicMaterial({ vertexColors: true });
  const ILLUS_KIND = ["bulk", "container", "bulk", "tanker", "container"];
  function makeShip(i) {
    if (!illusGeo) illusGeo = shipGeoms();
    const g = new THREE.Group();
    const m = new THREE.Mesh(illusGeo[ILLUS_KIND[(i || 0) % ILLUS_KIND.length]], illusMat);
    m.scale.setScalar(0.022);
    g.add(m);
    scene.add(g);
    return g;
  }
  const ships = [];
  routeObjs.forEach((o, ri) => o.seaCurves.forEach((curve, ci) => {
    const len = curve.getLength();
    const n = o.r.alt ? 1 : (len > 1.2 ? 2 : 1);
    for (let k = 0; k < n; k++) ships.push({ o, curve, len, t: ((ri * 0.31 + ci * 0.17 + k / n) % 1), mesh: makeShip(ships.length) });
  }));
  const tmpV = new THREE.Vector3(), tmpT = new THREE.Vector3(), occV = new THREE.Vector3();

  /* live satellites: real positions from public orbit data (TLE), propagated with SGP4 in this browser */
  const satGroup = new THREE.Group(); scene.add(satGroup);
  let satItems = [];
  const TRACK_BACK = 20, TRACK_AHEAD = 95; /* minutes of ground track drawn behind and ahead */
  /* v15 satellite model: gold-foil bus, two solar wings with cells, a dish and the instrument looking down.
     +z points at the Earth (nadir), +y along the track; the wings face away from the Earth so they read from above. */
  const satMats = (() => {
    const cv = document.createElement("canvas"); cv.width = 256; cv.height = 128;
    const x = cv.getContext("2d");
    x.fillStyle = "#0b1736"; x.fillRect(0, 0, 256, 128);
    for (let i = 0; i < 16; i++) for (let j = 0; j < 8; j++) {
      const gr = x.createLinearGradient(i * 16, j * 16, i * 16 + 16, j * 16 + 16);
      gr.addColorStop(0, "#1f3c86"); gr.addColorStop(1, "#142a63");
      x.fillStyle = gr; x.fillRect(i * 16 + 1.5, j * 16 + 1.5, 13, 13);
    }
    x.strokeStyle = "rgba(210,222,240,0.6)"; x.lineWidth = 1.2;
    for (let i = 0; i <= 16; i++) { x.beginPath(); x.moveTo(i * 16, 0); x.lineTo(i * 16, 128); x.stroke(); }
    for (let j = 0; j <= 8; j++) { x.beginPath(); x.moveTo(0, j * 16); x.lineTo(256, j * 16); x.stroke(); }
    const cells = new THREE.CanvasTexture(cv); cells.anisotropy = 4;
    return {
      foil: new THREE.MeshStandardMaterial({ color: 0xd9a441, metalness: 0.92, roughness: 0.36, envMap: envTex, envMapIntensity: 1.0, emissive: 0x2a1e06, emissiveIntensity: 0.5 }),
      panel: new THREE.MeshStandardMaterial({ map: cells, metalness: 0.5, roughness: 0.26, envMap: envTex, envMapIntensity: 1.2, emissive: 0x1a2c5c, emissiveIntensity: 0.55 }),
      back: new THREE.MeshStandardMaterial({ color: 0x9aa3ad, metalness: 0.6, roughness: 0.5, envMap: envTex }),
      dark: new THREE.MeshStandardMaterial({ color: 0x22262c, metalness: 0.4, roughness: 0.55, envMap: envTex }),
      white: new THREE.MeshStandardMaterial({ color: 0xd8dde2, metalness: 0.08, roughness: 0.45, envMap: envTex, envMapIntensity: 0.6, emissive: 0x1e2226, emissiveIntensity: 0.4 }),
      boom: new THREE.MeshStandardMaterial({ color: 0xb8c0c8, metalness: 0.9, roughness: 0.3, envMap: envTex })
    };
  })();
  const satGeo15 = (() => {
    const dishPts = [];
    for (let i = 0; i <= 8; i++) { const r = 0.0052 * i / 8; dishPts.push(new THREE.Vector2(r, 0.0024 * (i / 8) * (i / 8))); }
    const dish = new THREE.LatheGeometry(dishPts, 24); dish.rotateX(Math.PI / 2);
    return {
      bus: new THREE.BoxGeometry(0.011, 0.011, 0.016),
      top: new THREE.BoxGeometry(0.0114, 0.0114, 0.0014),
      instr: new THREE.CylinderGeometry(0.0034, 0.0038, 0.0065, 18).rotateX(Math.PI / 2),
      dish,
      boom: new THREE.CylinderGeometry(0.00055, 0.00055, 0.072, 6).rotateZ(Math.PI / 2),
      wing: new THREE.BoxGeometry(0.027, 0.0135, 0.0006),
      wingBack: new THREE.PlaneGeometry(0.027, 0.0135)
    };
  })();
  function satBody(hex) {
    const g = new THREE.Group(), col = new THREE.Color(hex), G = satGeo15, M = satMats;
    const bus = new THREE.Mesh(G.bus, M.foil);
    const top = new THREE.Mesh(G.top, new THREE.MeshStandardMaterial({ color: col, metalness: 0.2, roughness: 0.4, envMap: envTex, emissive: col, emissiveIntensity: 0.45 }));
    top.position.z = -0.0087;
    const instr = new THREE.Mesh(G.instr, M.dark); instr.position.set(0.0017, 0.0012, 0.0112);
    const dish = new THREE.Mesh(G.dish, M.white); dish.position.set(-0.0028, -0.0024, 0.0082);
    const boom = new THREE.Mesh(G.boom, M.boom);
    const wl = new THREE.Mesh(G.wing, M.panel); wl.position.x = -0.0222;
    const wr = new THREE.Mesh(G.wing, M.panel); wr.position.x = 0.0222;
    const el = new THREE.LineSegments(new THREE.EdgesGeometry(G.wing), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.85 }));
    const er = el.clone(); el.position.copy(wl.position); er.position.copy(wr.position);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 10), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending }));
    g.add(bus, top, instr, dish, boom, wl, wr, el, er, halo);
    return g;
  }
  function trackMaterial(hex) {
    return new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(hex) }, uHi: { value: 0 } },
      vertexShader: "attribute float a; varying float vA; void main() { vA = a; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: "uniform vec3 uColor; uniform float uHi; varying float vA; void main() { gl_FragColor = vec4(uColor, vA * (0.3 + 0.7 * uHi)); }",
      transparent: true, depthWrite: false
    });
  }
  const beamG = new THREE.ConeGeometry(1, 1, 40, 1, true);
  beamG.rotateX(-Math.PI / 2); beamG.translate(0, 0, 0.5);
  function setSats(list) {
    satItems.forEach((it) => { satGroup.remove(it.g, it.track, it.beam); it.track.geometry.dispose(); it.track.material.dispose(); it.label.remove(); });
    satItems = list.map((o) => {
      const g = satBody(o.cfg.color);
      const n = TRACK_BACK + TRACK_AHEAD + 1;
      const tg = new THREE.BufferGeometry();
      tg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
      const al = new Float32Array(n);
      for (let i = 0; i < n; i++) { const m = i - TRACK_BACK; al[i] = m < 0 ? 0.12 + 0.3 * (1 + m / TRACK_BACK) : 0.05 + 0.85 * (1 - m / TRACK_AHEAD); }
      tg.setAttribute("a", new THREE.BufferAttribute(al, 1));
      const track = new THREE.Line(tg, trackMaterial(o.cfg.color));
      track.frustumCulled = false;
      const beam = new THREE.Mesh(beamG, new THREE.MeshBasicMaterial({ color: new THREE.Color(o.cfg.color), transparent: true, opacity: 0.13, depthWrite: false, side: THREE.DoubleSide }));
      beam.visible = false;
      const label = document.createElement("div");
      label.className = "pin-label choke sat";
      label.textContent = o.cfg.name;
      labelsEl.appendChild(label);
      satGroup.add(g, track, beam);
      return { o, g, track, beam, label, shown: false, geo: null, trackAt: 0, pos: new THREE.Vector3() };
    });
    dirty = true;
  }
  function updateSats(nowMs) {
    satItems.forEach((it) => {
      const geo = satGeo(it.o, new Date(nowMs));
      if (!geo) { it.g.visible = false; it.track.visible = false; return; }
      it.g.visible = true; it.track.visible = true;
      it.geo = geo;
      const r = 1 + geo.h / R_E;
      it.pos.copy(ll2v(geo.lat, geo.lng, r));
      const ahead = satGeo(it.o, new Date(nowMs + 8000));
      it.g.position.copy(it.pos);
      if (ahead) it.g.up.copy(ll2v(ahead.lat, ahead.lng, r).sub(it.pos).normalize());
      it.g.lookAt(0, 0, 0);
      it.g.scale.setScalar(Math.max(0.35, Math.min(1.3, (cam.dist - 1) / 2.2)));
      const isSel = selSat === it.o.cfg.id;
      it.track.material.uniforms.uHi.value = isSel ? 1 : 0;
      it.beam.visible = isSel && it.o.cfg.swath > 0;
      if (it.beam.visible) {
        const half = it.o.cfg.swath / 2 / R_E;
        it.beam.position.copy(it.pos); it.beam.up.copy(it.g.up); it.beam.lookAt(0, 0, 0);
        it.beam.scale.set(half, half, geo.h / R_E);
      }
      if (nowMs - it.trackAt > 20000) {
        it.trackAt = nowMs;
        const p = it.track.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
          const gg = satGeo(it.o, new Date(nowMs + (i - TRACK_BACK) * 60000));
          if (gg) { const v = ll2v(gg.lat, gg.lng, 1 + gg.h / R_E); p.setXYZ(i, v.x, v.y, v.z); }
        }
        p.needsUpdate = true;
      }
    });
  }

  /* real ships from AIS, collected by the scheduled task when an AIS key is set */
  const shipLiveGroup = new THREE.Group(); scene.add(shipLiveGroup);
  let shipLive = [];
  const shipLiveG = new THREE.ConeGeometry(0.0042, 0.013, 3);
  shipLiveG.rotateX(Math.PI / 2);
  const shipLiveMat = new THREE.MeshBasicMaterial({ color: 0xe9f6ff });
  function setShipsLive(list) {
    shipLive.forEach((x) => { shipLiveGroup.remove(x.m); x.label.remove(); });
    shipLive = list.map((v) => {
      const unit = ll2v(v.lat, v.lng, 1).normalize();
      const la = v.lat * Math.PI / 180, lo = v.lng * Math.PI / 180, c = (v.cog || 0) * Math.PI / 180;
      const north = new THREE.Vector3(-Math.sin(la) * Math.cos(lo), Math.cos(la), Math.sin(la) * Math.sin(lo));
      const east = new THREE.Vector3(-Math.sin(lo), 0, -Math.cos(lo));
      const dir = north.multiplyScalar(Math.cos(c)).add(east.multiplyScalar(Math.sin(c)));
      const m = new THREE.Mesh(shipLiveG, shipLiveMat);
      m.position.copy(unit).multiplyScalar(1.004);
      m.up.copy(unit);
      m.lookAt(m.position.clone().add(dir));
      const label = document.createElement("div");
      label.className = "pin-label choke ship";
      label.textContent = `${v.name}${v.sog !== null ? ` · ${v.sog.toFixed(0)} kn` : ""}`;
      labelsEl.appendChild(label);
      shipLiveGroup.add(m);
      return { v, m, unit, label, shown: false };
    });
    shipLiveGroup.visible = layers.ships;
    dirty = true;
  }

  /* live hazards: USGS earthquakes and UN/EU GDACS alerts, refreshed by a scheduled task */
  const hzGroup = new THREE.Group(); scene.add(hzGroup);
  let hzItems = [], hzByN = [];
  const hzRingG = new THREE.RingGeometry(0.62, 1, 48), hzDotG = new THREE.CircleGeometry(0.26, 24), cfRingG = new THREE.RingGeometry(0.9, 1, 64), cfDotG = new THREE.CircleGeometry(0.14, 20);
  function setHazards(list) {
    hzItems.forEach((h) => { hzGroup.remove(h.g); h.label.remove(); h.g.children.forEach((c) => c.material.dispose()); });
    hzItems = list.map((h, i) => {
      const unit = ll2v(h.lat, h.lng, 1).normalize();
      const g = new THREE.Group();
      g.position.copy(unit).multiplyScalar(1.0016);
      g.lookAt(unit.clone().multiplyScalar(2));
      const col = new THREE.Color(h.color);
      const mk = (geo, op) => new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, depthWrite: false, side: THREE.DoubleSide }));
      const cf = h.kind === "CF";
      const mkA = (geo, op) => new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
      const ring = cf ? mkA(cfRingG, 0.95) : mk(hzRingG, 0.85), dot = cf ? mkA(cfDotG, 1) : mk(hzDotG, 0.95), wave = cf ? mkA(cfRingG, 0.7) : mk(hzRingG, 0.5);
      const wave2 = cf ? mkA(cfRingG, 0.5) : null;
      g.add(ring, dot, wave);
      if (wave2) g.add(wave2);
      const label = document.createElement("div");
      label.className = "pin-label choke hz" + (h.big ? " hz-big" : "");
      label.textContent = h.short;
      labelsEl.appendChild(label);
      hzGroup.add(g);
      return { h, g, unit, wave, wave2, label, shown: false, ph: (i * 0.29) % 1 };
    });
    hzByN = hzItems.slice().sort((a, b) => (b.h.n || 0) - (a.h.n || 0));   // build 62: labels are placed biggest first
    hzGroup.visible = layers.hazards;
    dirty = true;
  }
  function occluded(p) {
    /* is the straight line from the camera to p blocked by the Earth? */
    const d = occV.copy(p).sub(camera.position);
    const a = d.dot(d), b = 2 * camera.position.dot(d), c = camera.position.dot(camera.position) - 1;
    const disc = b * b - 4 * a * c;
    if (disc < 0) return false;
    const t = (-b - Math.sqrt(disc)) / (2 * a);
    return t > 0 && t < 1;
  }

  /* production towers: hexagonal columns over each producing country */
  const towerGroup = new THREE.Group(); scene.add(towerGroup);
  let towerFor = null, towerItems = [], towerT0 = 0;
  function setTowers(m) {
    if (m === towerFor) return;
    towerFor = m;
    towerItems.forEach((t) => { t.label.remove(); t.g.traverse((x) => { if (x.geometry) x.geometry.dispose(); if (x.material) x.material.dispose(); }); towerGroup.remove(t.g); });
    towerItems = [];
    const P = m ? PROD[m] : null;
    if (!P) return;
    const max = Math.max(...P.rows.map((r) => r[1]));
    const col = new THREE.Color(PIN[m]);
    P.rows.forEach(([country, val]) => {
      const c = CENTROID[country];
      if (!c) return;
      const h = P.qual ? 0.2 : 0.03 + 0.42 * (val / max);   // no published total: a modest tower, no number
      const geom = new THREE.CylinderGeometry(0.022, 0.022, 1, 6);
      geom.rotateX(Math.PI / 2); geom.translate(0, 0, 0.5);
      const mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.42, depthWrite: false }));
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 1 }));
      const g = new THREE.Group();
      const p = ll2v(c[0], c[1], 1.001);
      g.position.copy(p); g.lookAt(p.clone().multiplyScalar(2));
      g.add(mesh, edges);
      g.scale.set(1, 1, 0.0001);
      towerGroup.add(g);
      const share = P.pctOnly ? val : (P.world ? Math.round(val / P.world * 100) : null);
      const label = document.createElement("div");
      label.className = "pin-label tower";
      label.style.setProperty("--c", PIN[m]);
      label.innerHTML = `${esc(country)}<small>${P.qual ? esc(T("leads refining", "vede ve zpracování")) : esc(fmtProd(P, val)) + (share !== null && !P.pctOnly ? ` · ${share}%` : "")}</small>`;
      labelsEl.appendChild(label);
      towerItems.push({ g, h, label, unit: p.clone().normalize(), shown: false });
    });
    towerT0 = performance.now();
  }

  /* chokepoints */
  const chokeObjs = CHOKES.map((c) => {
    const p = ll2v(c.lat, c.lng, 1.002);
    const g = new THREE.Group();
    g.position.copy(p); g.lookAt(p.clone().multiplyScalar(2));
    g.add(new THREE.Mesh(new THREE.RingGeometry(0.02, 0.0235, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide })));
    g.add(new THREE.Mesh(new THREE.CircleGeometry(0.0045, 20), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, depthWrite: false })));
    scene.add(g);
    const label = document.createElement("div");
    label.className = "pin-label choke";
    label.textContent = c.name;
    labelsEl.appendChild(label);
    return { c, g, label, unit: p.clone().normalize(), shown: false };
  });

  /* sun */
  let evenLight = false;
  function subsolar(date) {
    const start = Date.UTC(date.getUTCFullYear(), 0, 0);
    const n = (date.getTime() - start) / 86400000;
    const decl = -23.44 * Math.cos(2 * Math.PI / 365 * (n + 10));
    const B = 2 * Math.PI / 365 * (n - 81);
    const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
    const h = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
    let lng = -15 * (h - 12 + eot / 60);
    lng = ((lng + 540) % 360) - 180;
    return { lat: decl, lng };
  }
  function updateSun() {
    const now = new Date(), ss = subsolar(now);
    uniforms.sunDir.value.copy(ll2v(ss.lat, ss.lng, 1).normalize());
    sunLight.position.copy(uniforms.sunDir.value).multiplyScalar(10);
    sunLight.intensity = evenLight ? 0 : 0.5; viewLight.intensity = evenLight ? 0.68 : 0.42;
    const t = `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")} UTC`;
    $("#sun-text").textContent = evenLight ? "Even light" : `Sunlight ${t}`;
    $("#sun-meta").textContent = `Live sunlight · ${t}`;
    dirty = true;
  }
  updateSun();
  setInterval(updateSun, 30000);
  $("#sun").addEventListener("click", (e) => {
    evenLight = !evenLight;
    e.currentTarget.setAttribute("aria-pressed", String(!evenLight));
    uniforms.even.value = evenLight ? 1 : 0;
    updateSun();
  });

  /* camera */
  const HOME = { lat: 20, lng: 34, dist: 3.75 };
  const cam = { lat: HOME.lat, lng: HOME.lng, dist: HOME.dist };
  let vel = { lat: 0, lng: 0 }, anim = null, lastInteract = 0;
  /* phones (LITE): the globe stays still, one picture redrawn only when something changes, until the visitor
     touches it, explores, takes the tour or picks something. Saves battery and keeps the page responsive. */
  let woke = !LITE;
  ["pointerdown", "wheel", "keydown", "gesturestart"].forEach((ev) => canvas.addEventListener(ev, () => { if (!woke) { woke = true; dirty = true; } }, { passive: true }));
  const clampLat = (v) => Math.max(-80, Math.min(80, v));
  const clampDist = (v) => Math.max(1.28, Math.min(4.8, v));
  function placeCamera() { camera.position.copy(ll2v(cam.lat, cam.lng, cam.dist)); camera.up.set(0, 1, 0); camera.lookAt(0, 0, 0); }
  function flyTo(lat, lng, dist, ms) {
    const dLng = ((lng - cam.lng + 540) % 360) - 180;
    const ang = Math.min(180, Math.hypot(dLng, lat - cam.lat));
    anim = { from: { lat: cam.lat, lng: cam.lng, dist: cam.dist }, to: { lat: clampLat(lat), lng: cam.lng + dLng, dist: clampDist(dist) }, t0: performance.now(), dur: reduceMotion ? 0 : (ms || 1400), arc: ang / 180 * 0.9 };
    vel = { lat: 0, lng: 0 }; dirty = true;
  }
  const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  /* picking */
  const v3 = new THREE.Vector3();
  let W = 1, H = 1, hovered = null;
  const facingUnit = (u) => u.dot(camera.position) > 1.02;
  function project(v) { v3.copy(v).project(camera); return { x: (v3.x + 1) / 2 * W, y: (1 - v3.y) / 2 * H }; }
  function pick(e, radius) {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    let best = null, bestD = radius;
    pins.forEach((p) => {
      if (!p.g.visible || !facingUnit(p.unit)) return;
      p.head.getWorldPosition(v3); const sp = project(v3);
      const d = Math.hypot(sp.x - x, sp.y - y);
      if (d < bestD) { bestD = d; best = { kind: "site", id: p.s.id, ref: p }; }
    });
    chokeObjs.forEach((c) => {
      if (!c.g.visible || !facingUnit(c.unit)) return;
      const sp = project(c.g.position);
      const d = Math.hypot(sp.x - x, sp.y - y);
      if (d < bestD) { bestD = d; best = { kind: "choke", id: c.c.id, ref: c }; }
    });
    if (layers.hazards && hzGroup.visible) hzItems.forEach((h) => {
      if (!facingUnit(h.unit)) return;
      const sp = project(h.g.position);
      const d = Math.hypot(sp.x - x, sp.y - y);
      if (d < bestD) { bestD = d; best = { kind: "hz", id: h.h.id }; }
    });
    if (layers.ships && shipLiveGroup.visible) shipLive.forEach((sv) => {
      if (!facingUnit(sv.unit)) return;
      const sp = project(sv.m.position);
      const d = Math.hypot(sp.x - x, sp.y - y);
      if (d < bestD) { bestD = d; best = { kind: "ship", id: sv.v.id }; }
    });
    if (layers.satellite && satGroup.visible) satItems.forEach((it) => {
      if (!it.g.visible || occluded(it.pos)) return;
      const sp = project(it.pos);
      const d = Math.hypot(sp.x - x, sp.y - y);
      if (d < Math.max(bestD, 20)) { bestD = d; best = { kind: "sat", id: it.o.cfg.id }; }
    });
    if (best) return best;
    let bestR = null, bestRD = radius * 0.7;
    routeObjs.forEach((o) => {
      if (!o.group.visible) return;
      o.samples.forEach((pt) => {
        if (pt.dot(camera.position) < 1.02) return;
        const sp = project(pt);
        const d = Math.hypot(sp.x - x, sp.y - y);
        if (d < bestRD) { bestRD = d; bestR = { kind: "route", id: o.r.id, ref: o }; }
      });
    });
    return bestR;
  }
  function hoverAt(e) {
    const hit = pick(e, 14);
    const key = hit ? hit.kind + ":" + hit.id : null;
    if (key !== (hovered && hovered.key)) { hovered = hit ? Object.assign({ key }, hit) : null; dirty = true; }
    canvas.classList.toggle("over-pin", !!hit);
  }

  /* input */
  const pointers = new Map();
  let drag = null, pinchStart = null, moved = 0;
  const degPerPx = () => 0.13 * (cam.dist - 0.97);
  canvas.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") canvas.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) { drag = { x: e.clientX, y: e.clientY, t: performance.now() }; moved = 0; }
    if (pointers.size === 2) { const [a, b] = [...pointers.values()]; pinchStart = { d: Math.hypot(a.x - b.x, a.y - b.y), dist: cam.dist }; }
    anim = null; lastInteract = performance.now();
  });
  canvas.addEventListener("pointermove", (e) => {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2 && pinchStart) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d > 0) cam.dist = clampDist(pinchStart.dist * pinchStart.d / d);
      moved = 99; dirty = true; return;
    }
    if (drag && pointers.size === 1) {
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      moved += Math.abs(dx) + Math.abs(dy);
      if (moved > 4) canvas.classList.add("dragging");
      const k = degPerPx();
      cam.lng -= dx * k; cam.lat = clampLat(cam.lat + dy * k);
      const now = performance.now(), dt = Math.max(1, now - drag.t);
      vel = { lng: -dx * k / dt * 16, lat: dy * k / dt * 16 };
      drag = { x: e.clientX, y: e.clientY, t: now };
      lastInteract = now; dirty = true; return;
    }
    if (e.pointerType === "mouse") hoverAt(e);
  });
  const endPointer = (e) => {
    const wasClick = drag && moved < 6 && pointers.size === 1;
    const lastMove = drag ? drag.t : 0;
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchStart = null;
    if (pointers.size === 0) {
      canvas.classList.remove("dragging");
      if (wasClick && e.type === "pointerup") {
        const hit = pick(e, e.pointerType === "mouse" ? 16 : 26);
        if (hit && hit.kind === "site") select(hit.id, true);
        else if (hit && hit.kind === "choke") selectChoke(hit.id);
        else if (hit && hit.kind === "route") selectRoute(hit.id);
        else if (hit && hit.kind === "sat") selectSat(hit.id);
        else if (hit && hit.kind === "hz") selectHazard(hit.id);
        else if (hit && hit.kind === "ship") selectShip(hit.id);
      }
      if (performance.now() - lastMove > 80) vel = { lat: 0, lng: 0 };
      drag = null;
    }
  };
  canvas.addEventListener("pointerup", endPointer);
  canvas.addEventListener("pointercancel", endPointer);
  canvas.addEventListener("pointerleave", () => { if (hovered) { hovered = null; canvas.classList.remove("over-pin"); dirty = true; } });
  canvas.addEventListener("wheel", (e) => {
    if (!isExploring()) return; /* on the landing view the wheel scrolls the page */
    e.preventDefault(); anim = null;
    let d = e.deltaY;
    if (e.deltaMode === 1) d *= 33; else if (e.deltaMode === 2) d *= 400;   // lines or pages
    if (e.ctrlKey) d *= 9;                       // a trackpad pinch arrives as tiny ctrl+wheel steps
    else if (Math.abs(d) < 40) d *= 3.2;         // two-finger scrolling: small, frequent steps
    d = Math.max(-240, Math.min(240, d));
    cam.dist = clampDist(cam.dist * Math.exp(d * 0.0012));
    lastInteract = performance.now(); dirty = true;
  }, { passive: false });
  let gestDist = null;   /* Safari: the native pinch gesture */
  canvas.addEventListener("gesturestart", (e) => { if (!isExploring()) return; e.preventDefault(); gestDist = cam.dist; }, { passive: false });
  canvas.addEventListener("gesturechange", (e) => { if (gestDist === null) return; e.preventDefault(); anim = null; cam.dist = clampDist(gestDist / Math.max(0.2, e.scale)); lastInteract = performance.now(); dirty = true; }, { passive: false });
  canvas.addEventListener("gestureend", () => { gestDist = null; });
  canvas.addEventListener("keydown", (e) => {
    const step = 8 * (cam.dist - 0.97) / 2;
    let used = true;
    if (e.key === "ArrowLeft") cam.lng -= step;
    else if (e.key === "ArrowRight") cam.lng += step;
    else if (e.key === "ArrowUp") cam.lat = clampLat(cam.lat + step);
    else if (e.key === "ArrowDown") cam.lat = clampLat(cam.lat - step);
    else if (e.key === "+" || e.key === "=") cam.dist = clampDist(cam.dist / 1.2);
    else if (e.key === "-" || e.key === "_") cam.dist = clampDist(cam.dist * 1.2);
    else used = false;
    if (used) { e.preventDefault(); anim = null; lastInteract = performance.now(); dirty = true; }
  });
  $("#zin").addEventListener("click", () => flyTo(cam.lat, cam.lng, cam.dist / 1.35, 350));
  $("#zout").addEventListener("click", () => flyTo(cam.lat, cam.lng, cam.dist * 1.35, 350));

  /* layout: keep the globe in the free space between nav, dock, drawer and the hero text */
  const offT = { x: 0, y: 0 }, offC = { x: 0, y: 0 }; let offInit = false;
  function resize() {
    const r = plate.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    renderer.setSize(W, H, false);
    if (composer) { composer.setSize(W, H); }
    camera.aspect = W / H;
    camera.fov = W < H ? 46 : 35;
    const ex = isExploring();
    const navH = (document.getElementById("nav") || {}).offsetHeight || 0;
    const dock = document.getElementById("dock");
    const dockH = ex && dock ? dock.offsetHeight + 8 : 0;
    const panelEl = document.getElementById("panel");
    const ps = panelEl ? getComputedStyle(panelEl) : null;
    const floating = ex && ps && ps.position === "absolute" && !panelEl.hidden;
    let ox = floating ? (panelEl.offsetWidth + 24) / 2 : 0;
    let oy = ex ? (dockH - navH) / 2 : 0;
    if (!ex && W >= 1024) ox = -W * 0.16;
    if (!ex && W < 1024) oy = H * 0.2;
    /* v20: the globe glides to its new place (explore, panel, resize) instead of jumping */
    offT.x = ox; offT.y = oy;
    if (!offInit || (typeof reduceMotion !== "undefined" && reduceMotion)) { offC.x = ox; offC.y = oy; offInit = true; }
    camera.setViewOffset(W, H, Math.round(offC.x), Math.round(offC.y), W, H);
    camera.updateProjectionMatrix();
    dirty = true; drawnOnce = false;
  }
  function glideOffset() {
    if (Math.abs(offC.x - offT.x) < 0.5 && Math.abs(offC.y - offT.y) < 0.5) return;
    offC.x += (offT.x - offC.x) * 0.11; offC.y += (offT.y - offC.y) * 0.11;
    if (Math.abs(offC.x - offT.x) < 0.5) offC.x = offT.x;
    if (Math.abs(offC.y - offT.y) < 0.5) offC.y = offT.y;
    camera.setViewOffset(W, H, Math.round(offC.x), Math.round(offC.y), W, H);
    camera.updateProjectionMatrix(); dirty = true;
  }
  new ResizeObserver(resize).observe(plate);
  resize();
  let onScreen = true;
  new IntersectionObserver((en) => { onScreen = en[0].isIntersecting; if (onScreen) dirty = true; }).observe(plate);

  /* loop */
  let selPin = null, hiRoute = null, hiRoute2 = null, last = performance.now();
  const pinScale = () => Math.max(0.16, Math.min(1.5, (cam.dist - 1) / 2));
  function applyVisibility() {
    pins.forEach((p) => { p.g.visible = layers.sites && inFilter(p.s.m); });
    routeObjs.forEach((o) => {
      o.group.visible = layers.routes && (filter === "all" || o.r.m.some(inFilter) || o.r.id === hiRoute || o.r.id === hiRoute2);
      const focus = hiRoute ? (o.r.id === hiRoute || o.r.id === hiRoute2) : true;
      o.mats.forEach((m) => { m.uniforms.uAlpha.value = (o.r.alt ? 0.6 : 1) * (focus ? 1 : 0.22); m.uniforms.uHi.value = hiRoute && focus ? 1 : 0; });
    });
    chokeObjs.forEach((c) => { c.g.visible = layers.choke; });
    satGroup.visible = layers.satellite;
    hzGroup.visible = layers.hazards;
    shipLiveGroup.visible = layers.ships;
    const tm = sysOf(filter) ? sysOf(filter).choke : filter;
    setTowers(layers.production && isExploring() && MATERIALS[tm] && PROD[tm] ? tm : null);
    dirty = true;
  }
  function placeLabel(el, x, y, on) {
    if (on) el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
    else el.style.transform = "translate(-9999px, 0)";
  }
  function updateLabels() {
    const ex = isExploring();
    const lgOn = ex && cam.dist > 1.85 && !document.body.classList.contains("touring") && !!document.getElementById("panel") && document.getElementById("panel").hidden;
    if (lgOn !== legendOn) { legendOn = lgOn; legendEl.classList.toggle("gl-off", !lgOn); }
    towerItems.forEach((t) => {
      const grow = t.g.scale.z / t.h;
      tmpV.copy(t.unit).multiplyScalar(1.001 + t.h * grow);
      let show = grow > 0.6 && !occluded(tmpV) && t.unit.dot(camera.position) > 0.6;
      if (show) { const sp = project(tmpV); placeLabel(t.label, sp.x + 10, sp.y - 16, true); }
      else if (t.shown) placeLabel(t.label, 0, 0, false);
      t.shown = show;
    });
    satItems.forEach((it) => {
      const isHover = hovered && hovered.kind === "sat" && hovered.id === it.o.cfg.id;
      const isSel = selSat === it.o.cfg.id;
      const show = satGroup.visible && it.g.visible && (isSel || isHover || (ex && cam.dist > 2.2)) && !occluded(it.pos);
      if (show) { const sp = project(it.pos); placeLabel(it.label, sp.x + 14, sp.y - 6, true); it.label.classList.toggle("sel", isSel); }
      else if (it.shown) placeLabel(it.label, 0, 0, false);
      it.shown = show;
    });
    const occ = [];   // v45: screen boxes of labels already placed this frame (ships, hazards), which site labels must not cover
    const occupy = (el, x, y) => { if (!el._w) { el._w = el.offsetWidth || 80; el._h = el.offsetHeight || 18; } occ.push([x, y, x + el._w, y + el._h]); };
    let nearShips = null;
    if (shipLiveGroup.visible && isExploring() && cam.dist < 2.2) {
      const cx = innerWidth / 2, cy = innerHeight / 2;
      nearShips = new Set(shipLive.filter((x) => facingUnit(x.unit)).map((x) => { const sp = project(x.m.position); return [x.v.id, (sp.x - cx) ** 2 + (sp.y - cy) ** 2]; }).sort((a, b) => a[1] - b[1]).slice(0, 20).map((a) => a[0]));
    }
    shipLive.forEach((x) => {
      const isHover = hovered && hovered.kind === "ship" && hovered.id === x.v.id;
      const show = shipLiveGroup.visible && (selShip === x.v.id || isHover || (nearShips && nearShips.has(x.v.id))) && facingUnit(x.unit);
      if (show) { const sp = project(x.m.position); placeLabel(x.label, sp.x + 10, sp.y - 8, true); occupy(x.label, sp.x + 10, sp.y - 8); }
      else if (x.shown) placeLabel(x.label, 0, 0, false);
      x.shown = show;
    });
    /* build 62: chokepoint labels go before hazard and site labels, which then keep clear of them. A label whose dot is
       off the screen is hidden, and one that would run off the right edge goes on the left of its dot. */
    chokeObjs.forEach((c) => {
      let show = c.g.visible && (ex || hiRoute) && facingUnit(c.unit);
      if (show) {
        const sp = project(c.g.position), el = c.label;
        if (sp.x < 0 || sp.x > W || sp.y < 0 || sp.y > H) show = false;
        else {
          if (el._t !== el.textContent || !el._w) { el._t = el.textContent; el._w = el.offsetWidth; el._h = el.offsetHeight; }
          const w = el._w || 120, x = sp.x + 14 + w > W - 8 ? sp.x - 14 - w : sp.x + 14, y = sp.y - 8;
          placeLabel(el, x, y, true); occ.push([x, y, x + w, y + (el._h || 20)]);
        }
      }
      if (!show && c.shown) placeLabel(c.label, 0, 0, false);
      c.shown = show;
    });
    /* build 62: hazard labels are placed biggest cluster first, and one that would land on a label already placed, or whose
       dot is off the screen, waits (the selected or hovered one always shows), so nearby conflict clusters no longer print on
       top of each other; near the right edge the label goes on the left of its dot */
    hzByN.forEach((h) => {
      const isHover = !!(hovered && hovered.kind === "hz" && hovered.id === h.h.id), isSel = selHz === h.h.id;
      let show = hzGroup.visible && (isSel || isHover || (ex && cam.dist < 2.3 && h.h.kind !== "CF") || (ex && h.h.kind === "CF" && h.h.big)) && facingUnit(h.unit);
      if (show) {
        const sp = project(h.g.position), el = h.label;
        if (!el._w) { el._w = el.offsetWidth || 80; el._h = el.offsetHeight || 18; }
        const x = sp.x + 12 + el._w > W - 8 ? sp.x - 12 - el._w : sp.x + 12, y = sp.y - 8;
        if (!isSel && !isHover && (sp.x < 0 || sp.x > W || sp.y < 0 || sp.y > H || occ.some((t) => x < t[2] + 4 && x + el._w + 4 > t[0] && y < t[3] + 2 && y + el._h + 2 > t[1]))) show = false;
        else { placeLabel(el, x, y, true); occupy(el, x, y); }
      }
      if (!show && h.shown) placeLabel(h.label, 0, 0, false);
      h.shown = show;
    });
    /* v45: site labels from further out; they are placed in order of priority (selected, hovered, the filtered mineral,
       then nearest the centre of the view) and a label that would overlap one already placed waits until there is room */
    const LABEL_DIST = 2.45, cap = cam.dist > 2.1 ? 10 : cam.dist > 1.75 ? 18 : 60;
    const cand = [];
    pins.forEach((p) => {
      const isSel = p.s.id === selected, isHov = !!(hovered && hovered.kind === "site" && hovered.id === p.s.id);
      let want = p.g.visible && ex && (isSel || isHov || cam.dist < LABEL_DIST) && facingUnit(p.unit);
      let sp = null;
      if (want) { p.head.getWorldPosition(v3); sp = project(v3); want = sp.x > -40 && sp.x < W + 40 && sp.y > -20 && sp.y < H + 20; }
      if (want) cand.push({ p, sp, pri: isSel ? 0 : isHov ? 1 : (filter !== "all" && p.s.m === filter) ? 2 : 3, d: (sp.x - W / 2) ** 2 + (sp.y - H / 2) ** 2 });
      else { if (p.shown) placeLabel(p.label, 0, 0, false); p.shown = false; }
    });
    cand.sort((a, b) => a.pri - b.pri || a.d - b.d);
    const taken = occ.slice(), placed0 = taken.length;
    cand.forEach(({ p, sp, pri }) => {
      if (!p.lw) { p.lw = p.label.offsetWidth || 90; p.lh = p.label.offsetHeight || 18; }
      const r = [sp.x + 10, sp.y - 12, sp.x + 10 + p.lw, sp.y - 12 + p.lh];
      const fits = pri < 2 || (taken.length - placed0 < cap && !taken.some((t) => r[0] < t[2] + 6 && r[2] + 6 > t[0] && r[1] < t[3] + 3 && r[3] + 3 > t[1]));
      if (fits) {
        taken.push(r);
        placeLabel(p.label, r[0], r[1], true); p.label.classList.toggle("sel", p.s.id === selected); p.label.style.zIndex = p.s.id === selected ? 3 : 2;
        p.shown = true;
      } else { if (p.shown) placeLabel(p.label, 0, 0, false); p.shown = false; }
    });
    routeObjs.forEach((o) => {
      const isHover = hovered && hovered.kind === "route" && hovered.id === o.r.id;
      let show = o.group.visible && (o.r.id === hiRoute || isHover) && o.mid && o.mid.dot(camera.position) > 1.02;
      if (show) { const sp = project(o.mid); placeLabel(o.label, sp.x + 10, sp.y + 8, true); }
      else if (o.shown) placeLabel(o.label, 0, 0, false);
      o.shown = show;
    });
  }
  function frame(now) {
    requestAnimationFrame(frame);
    glideOffset();
    if (LITE && drawnOnce && !anim && !drag && now - last < 31) return;     // 30 frames a second while the globe only turns
    const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
    last = now;
    if ((!onScreen || document.hidden) && drawnOnce) return;
    const settling = !!anim || (fadeIn && now - fadeIn < 800) || (towerItems.length && now - towerT0 < 900);
    if (!woke) {
      if (isExploring() || tourIdx >= 0 || PRESENTING || selected || selRoute || selChoke || selHz || selSat) woke = true;
      else if (drawnOnce && !dirty && !settling) return;
    }
    const calmDirty = dirty;
    if (anim) {
      const t = anim.dur ? Math.min(1, (now - anim.t0) / anim.dur) : 1, k = ease(t);
      cam.lat = anim.from.lat + (anim.to.lat - anim.from.lat) * k;
      cam.lng = anim.from.lng + (anim.to.lng - anim.from.lng) * k;
      cam.dist = anim.from.dist + (anim.to.dist - anim.from.dist) * k + Math.sin(Math.PI * t) * anim.arc;
      if (t >= 1) anim = null;
      dirty = true;
    } else if (!drag && (Math.abs(vel.lng) > 0.002 || Math.abs(vel.lat) > 0.002)) {
      cam.lng += vel.lng; cam.lat = clampLat(cam.lat + vel.lat);
      vel.lng *= 0.93; vel.lat *= 0.93; dirty = true;
    } else if (!drag && selSat && now - lastInteract > 2500) {
      const it = satItems.find((x) => x.o.cfg.id === selSat);
      if (it && it.geo) {
        const dl = ((it.geo.lng - cam.lng + 540) % 360) - 180;
        cam.lng += dl * 0.04; cam.lat = clampLat(cam.lat + (it.geo.lat - cam.lat) * 0.04); dirty = true;
      }
    } else if (woke && !drag && !reduceMotion && !introState && !PRESENTING && tourIdx < 0 && !selected && !selRoute && !selChoke && !selHz && now - lastInteract > (isExploring() ? 5000 : 1500)) {
      cam.lng -= dt * (isExploring() ? 2.2 : 3.2); dirty = true;
    }
    if (fadeIn) { const f = Math.min(1, (now - fadeIn) / 700); if (uniforms.ready.value !== f) { uniforms.ready.value = f; dirty = true; } }
    if (layers.routes && !reduceMotion) {
      routeObjs.forEach((o) => o.mats.forEach((m) => { m.uniforms.uTime.value = now / 1000; }));
      dirty = true;
    }
    const sc = pinScale();
    if (selPin) { ring.scale.setScalar(sc * (reduceMotion ? 1 : 1 + 0.25 * Math.sin(now / 260))); dirty = true; }
    if (layers.activity) {
      let any = false;
      pins.forEach((p, i) => {
        const on = !!ACTIVE[p.s.id] && p.g.visible;
        p.pulse.visible = on;
        if (on) {
          any = true;
          const ph = reduceMotion ? 0.4 : ((now / 1700 + i * 0.37) % 1);
          p.pulse.scale.setScalar(1 + ph * 2.4);
          p.pulse.material.opacity = (1 - ph) * 0.95;
        }
      });
      if (any) dirty = true;
    } else pins.forEach((p) => { p.pulse.visible = false; });
    /* ships, satellite and towers move every frame while visible */
    if (layers.routes) {
      ships.forEach((sh) => {
        const vis = sh.o.group.visible;
        sh.mesh.visible = vis;
        if (!vis) return;
        if (!reduceMotion) sh.t = ((sh.t + dt * 0.028 / sh.len) % 1 + 1) % 1;
        sh.curve.getPointAt(sh.t, tmpV);
        sh.curve.getTangentAt(sh.t, tmpT);
        const radial = tmpV.clone().normalize();
        sh.mesh.position.copy(radial).multiplyScalar(1.0065);
        sh.mesh.up.copy(radial);
        sh.mesh.lookAt(sh.mesh.position.clone().add(tmpT));
        sh.mesh.scale.setScalar(Math.max(0.35, Math.min(1.6, (cam.dist - 1) / 1.6)));
      });
      dirty = true;
    } else ships.forEach((sh) => { sh.mesh.visible = false; });
    if (satGroup.visible && satItems.length) { updateSats(Date.now()); dirty = true; }
    if (shipLiveGroup.visible && shipLive.length) {
      const k = Math.max(0.35, Math.min(1.6, (cam.dist - 1) / 1.6));
      shipLive.forEach((x) => x.m.scale.setScalar(k * (selShip === x.v.id ? 1.6 : 1)));
    }
    if (hzGroup.visible && hzItems.length) {
      const k = Math.max(0.45, Math.min(1.6, (cam.dist - 1) / 1.6));
      hzItems.forEach((h) => {
        h.g.scale.setScalar(h.h.r * k * (selHz === h.h.id ? 1.35 : 1));
        const ph = reduceMotion ? 0.5 : ((now / (h.h.pp || 2200) + h.ph) % 1);
        h.wave.scale.setScalar(1 + ph * (h.h.amp || 1.6));
        h.wave.material.opacity = (1 - ph) * (h.h.big ? 0.75 : 0.5);
      });
      dirty = true;
    }
    if (towerItems.length) {
      const k = Math.min(1, (now - towerT0) / 900), e = 1 - Math.pow(1 - k, 3);
      towerItems.forEach((t) => { t.g.scale.z = Math.max(0.0001, t.h * (reduceMotion ? 1 : e)); });
      if (k < 1) dirty = true;
    }
    v13Frame(now, dt);
    v14Frame(now, dt);
    if (!woke && !settling) dirty = calmDirty; /* still globe: draw only what changed outside the animations */
    if (!dirty) return;
    dirty = false;
    placeCamera();
    viewLight.position.copy(camera.position);
    pins.forEach((p) => p.g.scale.setScalar(sc));
    chokeObjs.forEach((c) => c.g.scale.setScalar(Math.max(0.5, Math.min(1.6, sc * 1.1))));
    uniforms.nightGain.value = 0.25 + 1.0 * Math.min(1, Math.max(0, (cam.dist - 1.5) / 1.3));
    if (composer) composer.render(); else renderer.render(scene, camera);
    drawnOnce = true;
    updateLabels();
  }

  /* ---------- v13: clouds today, cargo dots on the lanes, exposure flows, the opening sweep ---------- */
  /* clouds: yesterday's VIIRS true-colour mosaic from NASA GIBS, turned into a cloud mask by the scheduled task */
  const cloudU = { map: uniforms.cloudMap, sunDir: uniforms.sunDir, even: uniforms.even, fade: { value: 0 }, texel: { value: new THREE.Vector2(1 / 1024, 1 / 512) } };
  /* v15: the daily cloud mask is coarse (1024 or 2048 pixels round the world), which made the whole planet look
     blurry when zoomed out. Its edges are now softened and broken up with fixed fine-scale noise, thin cloud is
     more transparent and the tops are shaded by the real sun. */
  const cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(1.0042, 128, 96), new THREE.ShaderMaterial({
    uniforms: cloudU,
    vertexShader: `varying vec2 vUv; varying vec3 vN; varying vec3 vO; void main() { vUv = uv; vO = position; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform sampler2D map; uniform vec3 sunDir; uniform float even; uniform float fade; uniform vec2 texel; varying vec2 vUv; varying vec3 vN; varying vec3 vO;
      float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
      float noise(vec3 x) {
        vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
                   mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);
      }
      float fbm(vec3 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++) { s += a * noise(p); p = p * 2.07 + 1.3; a *= 0.5; } return s; }
      void main() {
        float c = texture2D(map, vUv).r * 0.36
          + (texture2D(map, vUv + vec2(texel.x, 0.0)).r + texture2D(map, vUv - vec2(texel.x, 0.0)).r
           + texture2D(map, vUv + vec2(0.0, texel.y)).r + texture2D(map, vUv - vec2(0.0, texel.y)).r) * 0.16;
        float n1 = fbm(vO * 18.0), n2 = fbm(vO * 52.0 + 7.0);
        float cov = c - 0.2 * (n1 - 0.5) - 0.12 * (n2 - 0.5);
        float a = smoothstep(0.24, 0.92, cov) * (0.5 + 0.5 * smoothstep(0.3, 0.75, n1 * 0.6 + n2 * 0.4 + c * 0.35));
        float d = dot(normalize(vN), sunDir);
        float lit = mix(0.05 + 0.92 * smoothstep(-0.12, 0.35, d), 0.9, even);
        vec3 col = vec3(lit) * (0.86 + 0.14 * n2);
        gl_FragColor = vec4(col, a * fade);
      }`,
    transparent: true, depthWrite: false
  }));
  cloudMesh.visible = false; cloudMesh.renderOrder = 1; scene.add(cloudMesh);
  let cloudSrc = null;
  function setClouds(dataUrl) {
    if (!dataUrl || dataUrl === cloudSrc) return;
    cloudSrc = dataUrl;
    new THREE.TextureLoader().load(dataUrl, (t) => { t.anisotropy = aniso; if (cloudU.map.value) cloudU.map.value.dispose(); cloudU.map.value = t; if (t.image && t.image.width) cloudU.texel.value.set(1 / t.image.width, 1 / t.image.height); dirty = true; });
  }

  /* cargo dots: count grows with the square root of the tonnage behind each lane (ROUTE_T) */
  const dotItems = [];
  let redSea = false;
  routeObjs.forEach((o, ri) => {
    const info = ROUTE_T[o.r.id] || (o.r.id === "cn-eu-cape" ? ROUTE_T["cn-eu"] : null);
    if (!info || !o.seaCurves.length) return;
    const lens = o.seaCurves.map((c) => c.getLength()), total = lens.reduce((a, b) => a + b, 0);
    const n = Math.min(64, Math.round(3 + 4 * Math.sqrt(info.t / 10000)), Math.max(3, Math.round(total / 0.045)));   // tonnage, capped by length
    o.seaCurves.forEach((curve, ci) => {
      const k = Math.max(1, Math.round(n * lens[ci] / total));
      for (let i = 0; i < k; i++) dotItems.push({ o, curve, len: lens[ci], t: (i / k + ri * 0.137) % 1, jit: ((i * 7919) % 13) / 13 - 0.5 });
    });
  });
  const dotPos = new Float32Array(dotItems.length * 3), dotCol = new Float32Array(dotItems.length * 3);
  dotItems.forEach((d, i) => { const c = new THREE.Color(d.o.r.m.length > 1 ? "#e9edf1" : PIN[d.o.r.m[0]]); dotCol.set([c.r, c.g, c.b], i * 3); });
  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
  dotGeo.setAttribute("color", new THREE.BufferAttribute(dotCol, 3));
  const dotTex = (() => { const c = document.createElement("canvas"); c.width = c.height = 32; const x = c.getContext("2d"); const g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, "#fff"); g.addColorStop(0.55, "#fff"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.beginPath(); x.arc(16, 16, 16, 0, Math.PI * 2); x.fill(); return new THREE.CanvasTexture(c); })();
  const dots = new THREE.Points(dotGeo, new THREE.PointsMaterial({ map: dotTex, alphaTest: 0.05, size: 4.2 * Math.min(2, window.devicePixelRatio || 1), sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending }));
  dots.frustumCulled = false; dots.renderOrder = 2; scene.add(dots);
  const tmpN = new THREE.Vector3();
  function updateDots(dt) {
    dots.visible = layers.routes;
    if (!dots.visible) return false;
    const p = dotGeo.attributes.position;
    dotItems.forEach((d, i) => {
      const isCape = d.o.r.id === "cn-eu-cape", isSuez = d.o.r.id === "cn-eu";
      const on = d.o.group.visible && (isCape ? redSea : isSuez ? !redSea : true);
      if (!on) { p.setXYZ(i, 0, 0, 0); return; }
      if (!reduceMotion) d.t = (d.t + dt * 0.03 / d.len) % 1;
      d.curve.getPointAt(d.t, tmpV);
      tmpN.copy(tmpV).normalize().multiplyScalar(1.0068 + d.jit * 0.0012);
      p.setXYZ(i, tmpN.x, tmpN.y, tmpN.z);
    });
    p.needsUpdate = true;
    return true;
  }

  /* exposure flows: raised arcs from the mining country to the refining country to Europe */
  const flowGroup = new THREE.Group(); scene.add(flowGroup);
  let flowItems = [];
  function setFlows(list) {
    flowItems.forEach((f) => { flowGroup.remove(f.mesh, f.dot); f.mesh.geometry.dispose(); f.mesh.material.dispose(); f.label && f.label.remove(); });
    flowItems = (list || []).map((f, i) => {
      const a = ll2v(f.a[0], f.a[1], 1).normalize(), b = ll2v(f.b[0], f.b[1], 1).normalize();
      const ang = a.angleTo(b), lift = 0.03 + 0.22 * ang / Math.PI;
      const pts = [];
      for (let k = 0; k <= 48; k++) { const t = k / 48; pts.push(slerpV(a, b, t).multiplyScalar(1.004 + lift * Math.sin(Math.PI * t))); }
      const curve = new THREE.CatmullRomCurve3(pts);
      const mat = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(f.color) }, uTime: { value: 0 }, uDash: { value: Math.max(3, curve.getLength() * 9) }, uLand: { value: 0 }, uAlpha: { value: 1 }, uHi: { value: f.hi ? 1 : 0.4 } },
        vertexShader: routeVS, fragmentShader: routeFS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, f.hi ? 0.0034 : 0.0024, 6, false), mat);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.0075, 12, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(f.color) }));
      flowGroup.add(mesh, dot);
      let label = null;
      if (f.label) {
        label = document.createElement("div"); label.className = "pin-label tower flow"; label.style.setProperty("--c", f.color);
        label.innerHTML = f.label; labelsEl.appendChild(label);
      }
      return { f, curve, mesh, dot, label, ph: i * 0.23, end: pts[pts.length - 1].clone(), start: pts[0].clone(), shown: false };
    });
    dirty = true;
  }
  function updateFlows(now) {
    if (!flowItems.length) return false;
    flowItems.forEach((it) => {
      it.mesh.material.uniforms.uTime.value = now / 1000;
      const t = reduceMotion ? 0.6 : ((now / 2600 + it.ph) % 1);
      it.curve.getPointAt(t, tmpV); it.dot.position.copy(tmpV);
      if (it.label) {
        const at = it.f.labelAt === "end" ? it.end : it.start;
        const show = at.clone().normalize().dot(camera.position) > 1.02 && !occluded(at);
        if (show) { const sp = project(at); placeLabel(it.label, sp.x + 10, sp.y - 14, true); } else if (it.shown) placeLabel(it.label, 0, 0, false);
        it.shown = show;
      }
    });
    return true;
  }

  /* the opening: a Sentinel-2 swath sweeps over a mine as the camera comes down */
  const sweep = new THREE.Group(); sweep.visible = false; scene.add(sweep);
  const swW = 290 / R_E, swH = swW * 0.42;
  const swMat = new THREE.MeshBasicMaterial({ color: 0x8ec5ff, transparent: true, opacity: 0.0, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
  const swTrailMat = new THREE.MeshBasicMaterial({ color: 0x8ec5ff, transparent: true, opacity: 0.0, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
  const swPlane = new THREE.Mesh(new THREE.PlaneGeometry(swW, swH), swMat);
  const swTrail = new THREE.Mesh(new THREE.PlaneGeometry(swW, 1), swTrailMat);
  const swEdge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(swW, swH)), new THREE.LineBasicMaterial({ color: 0xbfe0ff, transparent: true, opacity: 0 }));
  const swSat = satBody("#8ec5ff"); swSat.scale.setScalar(0.55);
  const swInner = new THREE.Group(); swInner.add(swTrail, swPlane, swEdge, swSat); sweep.add(swInner);
  let introState = null;
  function intro(s, ms) {
    if (!s || reduceMotion) return false;
    const p = ll2v(s.lat, s.lng, 1.0026);
    sweep.position.copy(p);
    sweep.up.copy(ll2v(Math.min(89, s.lat + 1), s.lng, 1).sub(ll2v(s.lat, s.lng, 1)).normalize());
    sweep.lookAt(p.clone().multiplyScalar(2));
    swInner.rotation.z = 0.17; /* sun-synchronous ground tracks run about 10 degrees off north-south */
    sweep.visible = true;
    cam.lat = Math.max(-60, Math.min(70, s.lat + 18)); cam.lng = s.lng + 70; cam.dist = 4.6;
    flyTo(s.lat, s.lng, 1.62, ms || 3200);
    introState = { t0: performance.now(), s, back: false };
    dirty = true;
    return true;
  }
  function stopIntro(goHome) {
    if (!introState) return;
    introState = null; sweep.visible = false; dirty = true;
    if (goHome) flyTo(HOME.lat, HOME.lng, HOME.dist, 2200);
  }
  canvas.addEventListener("pointerdown", () => { if (introState) stopIntro(false); });
  function updateIntro(now) {
    if (!introState) return false;
    const t = (now - introState.t0) / 1000;
    const sw = Math.max(0, Math.min(1, (t - 1.6) / 3.2)); /* sweep runs 1.6 s to 4.8 s */
    const y = 0.11 - sw * 0.22;
    swPlane.position.y = y; swEdge.position.y = y;
    swSat.position.set(0, y + 0.004, 786 / R_E * 0.5);
    const trailLen = Math.max(0.0001, 0.11 - y);
    swTrail.scale.y = trailLen; swTrail.position.y = y + trailLen / 2;
    const vis = t < 1.6 ? t / 1.6 : t > 5.6 ? Math.max(0, 1 - (t - 5.6) / 0.8) : 1;
    swMat.opacity = 0.26 * vis; swTrailMat.opacity = 0.09 * vis; swEdge.material.opacity = 0.9 * vis;
    if (t > 6.6 && !introState.back) { introState.back = true; flyTo(HOME.lat, HOME.lng, HOME.dist, 2600); }
    if (t > 7.0) { introState = null; sweep.visible = false; }
    return true;
  }

  function v13Frame(now, dt) {
    let busy = false;
    cloudMesh.visible = !!(layers.clouds && cloudU.map.value);
    if (cloudMesh.visible) {
      const f = Math.max(0, Math.min(1, (cam.dist - 1.35) / 1.1)) * 0.46;
      if (Math.abs(cloudU.fade.value - f) > 0.002) { cloudU.fade.value = f; busy = true; }
    }
    if (updateDots(dt)) busy = true;
    if (updateFlows(now)) busy = true;
    if (updateIntro(now)) busy = true;
    if (busy) dirty = true;
  }


  /* ================= v14: real ships in 3D, sharper clouds, conflict rings, detours, bloom ================= */
  /* clouds at twice the resolution: four strips of 90 degrees written by the scheduled task */
  const cloudHiCanvas = document.createElement("canvas");
  let cloudHiKey = "";
  function setCloudsHi(parts) {
    if (!Array.isArray(parts) || parts.length < 4) return false;
    const date = parts[0] && parts[0].date;
    if (parts.some((p) => !p || p.date !== date || typeof p.image !== "string" || !p.image.startsWith("data:image/"))) return false;
    const key = date + ":" + parts.map((p) => p.image.length).join(",");
    if (key === cloudHiKey) return true;
    cloudHiKey = key;
    cloudHiCanvas.width = parts[0].W || 2048; cloudHiCanvas.height = parts[0].H || 1024;
    const ctx = cloudHiCanvas.getContext("2d");
    let left = parts.length;
    parts.forEach((p) => {
      const im = new Image();
      im.onload = () => {
        ctx.drawImage(im, p.x, 0, p.w, p.h);
        if (--left > 0) return;
        const t = new THREE.CanvasTexture(cloudHiCanvas);
        t.anisotropy = aniso;
        if (cloudU.map.value) cloudU.map.value.dispose();
        cloudU.map.value = t; cloudU.texel.value.set(1 / cloudHiCanvas.width, 1 / cloudHiCanvas.height); cloudSrc = "hi:" + key; dirty = true;
      };
      im.src = p.image;
    });
    return true;
  }

  /* low-poly ship models, one per kind, with the light baked into vertex colours (the scene has no lights) */
  function shipGeoms() {
    const Ld = new THREE.Vector3(0.35, 0.85, 0.4).normalize();
    const prism = (w, h, z0, l, y0) => {
      const a = [-w / 2, y0, z0], b = [w / 2, y0, z0], c = [0, y0, z0 + l], a2 = [-w / 2, y0 + h, z0], b2 = [w / 2, y0 + h, z0], c2 = [0, y0 + h, z0 + l * 1.08];
      const tri = [a2, c2, b2, a, b, c, a, c, c2, a, c2, a2, b, b2, c2, b, c2, c];
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(tri.flat(), 3));
      return g;
    };
    const box = (w, h, l, x, y, z) => new THREE.BoxGeometry(w, h, l).translate(x, y + h / 2, z).toNonIndexed();
    const build = (parts) => {
      const P = [], C = [];
      parts.forEach(([g, color]) => {
        g.computeVertexNormals();
        const p = g.attributes.position, n = g.attributes.normal, c = new THREE.Color(color);
        for (let i = 0; i < p.count; i++) {
          P.push(p.getX(i), p.getY(i), p.getZ(i));
          const sh = 0.52 + 0.55 * Math.max(0, n.getX(i) * Ld.x + n.getY(i) * Ld.y + n.getZ(i) * Ld.z);
          C.push(Math.min(1, c.r * sh), Math.min(1, c.g * sh), Math.min(1, c.b * sh));
        }
      });
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
      g.setAttribute("color", new THREE.Float32BufferAttribute(C, 3));
      return g;
    };
    const HW = 0.16, HH = 0.055;
    const hull = (col) => [[box(HW, 0.018, 0.86, 0, 0, -0.07), "#8c2d27"], [box(HW, HH - 0.018, 0.86, 0, 0.018, -0.07), col], [prism(HW, HH, 0.36, 0.14, 0), col]];
    const bridge = (z, h, w) => [[box(w || 0.14, h, 0.075, 0, HH, z), "#e9eef3"], [box((w || 0.14) * 0.92, 0.012, 0.06, 0, HH + h, z + 0.004), "#5b6670"], [box(0.03, 0.05, 0.03, 0, HH + h, z - 0.03), "#2b2f33"]];
    const cont = ["#d4574f", "#3b7bd4", "#e9a23b", "#4fa66a", "#9aa4ad", "#e3e6e8", "#7c5cc4"];
    const container = [...hull("#30363d")];
    for (let k = 0; k < 7; k++) {
      const z = -0.27 + k * 0.088;
      container.push([box(0.15, 0.038, 0.08, 0, HH, z), cont[k % cont.length]], [box(0.15, 0.034, 0.08, 0, HH + 0.038, z), cont[(k * 3 + 2) % cont.length]]);
    }
    container.push(...bridge(-0.37, 0.1));
    const bulk = [...hull("#3a4148")];
    for (let k = 0; k < 5; k++) bulk.push([box(0.115, 0.022, 0.092, 0, HH, -0.24 + k * 0.118), "#8a3a2b"]);
    bulk.push(...bridge(-0.41, 0.11));
    const tanker = [...hull("#2f353b"), [box(0.15, 0.006, 0.7, 0, HH, -0.02), "#7a2c27"], [box(0.022, 0.016, 0.66, 0, HH + 0.006, -0.02), "#cdb56f"], [box(0.12, 0.018, 0.03, 0, HH + 0.006, 0.02), "#cdb56f"]];
    tanker.push(...bridge(-0.41, 0.11));
    const general = [...hull("#59636e"), [box(0.13, 0.02, 0.5, 0, HH, 0.02), "#6e4a3a"], [box(0.012, 0.11, 0.012, 0, HH, 0.12), "#d6c36c"], [box(0.012, 0.11, 0.012, 0, HH, -0.08), "#d6c36c"]];
    general.push(...bridge(-0.33, 0.09, 0.12));
    const passenger = [...hull("#e8edf2"), [box(0.14, 0.05, 0.62, 0, HH, -0.06), "#f4f6f8"], [box(0.12, 0.04, 0.48, 0, HH + 0.05, -0.08), "#e9eef3"], [box(0.13, 0.008, 0.6, 0, HH + 0.026, -0.06), "#2d4157"], [box(0.04, 0.05, 0.06, 0, HH + 0.09, -0.2), "#3f6fb0"]];
    return { container: build(container), bulk: build(bulk), tanker: build(tanker), general: build(general), passenger: build(passenger) };
  }
  const SHIP_KIND = (v) => {
    const t = v.type, n = String(v.name || "").toUpperCase();
    if (t >= 80 && t <= 89) return "tanker";
    if (t >= 60 && t <= 69) return "passenger";
    if (/^(MSC|MAERSK|CMA CGM|COSCO|EVER|ONE|HMM|YM|YANG MING|ZIM|HAPAG|OOCL|APL|WAN HAI|EVERGREEN)\b/.test(n)) return "container";
    if (t >= 70 && t <= 79) return v.len && v.len < 120 ? "general" : "bulk";
    return "general";
  };
  let shipGeo = null;
  const shipInst = {}, shipSel = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide }));
  shipSel.visible = false; shipLiveGroup.add(shipSel);
  const wakeMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: "attribute float a; attribute float s; varying float vA; varying float vS; void main() { vA = a; vS = s; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: "uniform float uTime; varying float vA; varying float vS; void main() { float w = 0.72 + 0.28 * sin(vS * 40.0 + uTime * 5.0); gl_FragColor = vec4(vec3(0.72, 0.9, 1.0), vA * w); }",
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  let wake = null;
  const WAKE_N = 7;
  const toRad = Math.PI / 180;
  function destPoint(lat, lng, brg, distKm) {
    const d = distKm / R_E, b = brg * toRad, la = lat * toRad, lo = lng * toRad;
    const la2 = Math.asin(Math.sin(la) * Math.cos(d) + Math.cos(la) * Math.sin(d) * Math.cos(b));
    const lo2 = lo + Math.atan2(Math.sin(b) * Math.sin(d) * Math.cos(la), Math.cos(d) - Math.sin(la) * Math.sin(la2));
    return [la2 / toRad, ((lo2 / toRad + 540) % 360) - 180];
  }
  const parseAis = (t) => {
    if (!t) return NaN;
    const m = /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})(\.\d+)?/.exec(String(t));
    return m ? Date.parse(`${m[1]}T${m[2]}${m[3] ? m[3].slice(0, 4) : ""}Z`) : Date.parse(t);
  };
  const DR_CAP_H = 1;  /* dead reckoning runs for at most an hour after a report, then the ship is held */
  let shipHalo = null, shipMark = null;
  /* v45: a light disc with a dark rim (brand paper on brand black): it reads on dark sea, bright land, ice and cloud alike */
  function shipMarkTex() {
    if (shipMark) return shipMark;
    const c = document.createElement("canvas"); c.width = c.height = 64; const x = c.getContext("2d");
    x.fillStyle = "rgba(5,6,7,0.92)"; x.beginPath(); x.arc(32, 32, 30, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#eceee9"; x.beginPath(); x.arc(32, 32, 19, 0, Math.PI * 2); x.fill();
    shipMark = new THREE.CanvasTexture(c); return shipMark;
  }
  function setShipsLive14(list) {
    if (shipHalo) { shipLiveGroup.remove(shipHalo); shipHalo.geometry.dispose(); shipHalo = null; }
    shipLive.forEach((x) => { x.label.remove(); });
    Object.values(shipInst).forEach((im) => { shipLiveGroup.remove(im); im.dispose && im.dispose(); });
    for (const k in shipInst) delete shipInst[k];
    if (wake) { shipLiveGroup.remove(wake); wake.geometry.dispose(); wake = null; }
    if (!shipGeo) shipGeo = shipGeoms();
    const byKind = {};
    shipLive = list.map((v) => {
      const kind = SHIP_KIND(v);
      const t0 = parseAis(v.t);
      const moving = typeof v.sog === "number" && v.sog >= 0.5 && v.nav !== 1 && v.nav !== 5;
      const label = document.createElement("div");
      label.className = "pin-label choke ship";
      label.textContent = `${v.name}${v.sog !== null && v.sog !== undefined ? ` · ${Number(v.sog).toFixed(0)} kn` : ""}`;
      labelsEl.appendChild(label);
      const x = { v, kind, t0: isNaN(t0) ? Date.now() : t0, moving, m: new THREE.Object3D(), unit: ll2v(v.lat, v.lng, 1).normalize(), est: [v.lat, v.lng], label, shown: false, idx: 0 };
      (byKind[kind] = byKind[kind] || []).push(x);
      return x;
    });
    const mat = new THREE.MeshBasicMaterial({ vertexColors: true });
    Object.entries(byKind).forEach(([k, arr]) => {
      const im = new THREE.InstancedMesh(shipGeo[k], mat, arr.length);
      im.frustumCulled = false; im.renderOrder = 3;   // v45: after the clouds (renderOrder 1), so clouds never hide a ship
      arr.forEach((x, i) => { x.idx = i; x.im = im; });
      shipInst[k] = im; shipLiveGroup.add(im);
    });
    const n = shipLive.length;
    if (n) {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * (WAKE_N - 1) * 2 * 3), 3));
      const a = new Float32Array(n * (WAKE_N - 1) * 2), s = new Float32Array(n * (WAKE_N - 1) * 2);
      for (let i = 0; i < n; i++) for (let k = 0; k < WAKE_N - 1; k++) {
        const o = (i * (WAKE_N - 1) + k) * 2;
        a[o] = 0.5 * (1 - k / (WAKE_N - 1)); a[o + 1] = 0.5 * (1 - (k + 1) / (WAKE_N - 1));
        s[o] = k / (WAKE_N - 1); s[o + 1] = (k + 1) / (WAKE_N - 1);
      }
      g.setAttribute("a", new THREE.BufferAttribute(a, 1));
      g.setAttribute("s", new THREE.BufferAttribute(s, 1));
      wake = new THREE.LineSegments(g, wakeMat); wake.frustumCulled = false; wake.renderOrder = 3;
      shipLiveGroup.add(wake);
    }
    if (n) {
      const hg = new THREE.BufferGeometry(); hg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
      shipHalo = new THREE.Points(hg, new THREE.PointsMaterial({ map: shipMarkTex(), size: 8, sizeAttenuation: false, color: 0xffffff, transparent: true, opacity: 0.95, depthWrite: false, alphaTest: 0.05 }));
      shipHalo.frustumCulled = false; shipHalo.renderOrder = 4; shipLiveGroup.add(shipHalo);   // v45: a neutral, high-contrast marker; size follows the zoom
    }
    shipLiveGroup.visible = layers.ships;
    shipsAt = 0;
    dirty = true;
  }
  const mBasis = new THREE.Matrix4(), vUp = new THREE.Vector3(), vFwd = new THREE.Vector3(), vRight = new THREE.Vector3(), vNorth = new THREE.Vector3(), vEast = new THREE.Vector3();
  let shipsAt = 0, shipFollow = true;
  function headingVecs(lat, lng, brg) {
    const la = lat * toRad, lo = (lng + 180) * toRad, c = brg * toRad;
    /* ll2v uses phi = lng + 180; the tangent towards north and east at that point */
    vUp.copy(ll2v(lat, lng, 1)).normalize();
    vEast.set(Math.sin(lo), 0, Math.cos(lo));
    vNorth.copy(vUp).cross(vEast).normalize();
    vFwd.copy(vNorth).multiplyScalar(Math.cos(c)).addScaledVector(vEast, Math.sin(c)).normalize();
    vRight.copy(vUp).cross(vFwd).normalize();
    return la;
  }
  function updateShips(now) {
    if (!shipLive.length || !shipLiveGroup.visible) return false;
    if (SMALL && now - shipsAt < 90) return true;
    shipsAt = now;
    const k = Math.max(0.3, Math.min(1.6, (cam.dist - 1) / 1.6));
    if (shipHalo) {   // v45: the marker grows as the camera pulls back (the 3D ship gets too small to see) and fades out close in
      const px = Math.max(0, Math.min(9, (cam.dist - 1.3) * 7));
      shipHalo.visible = px >= 2;
      shipHalo.material.size = px * Math.min(2, window.devicePixelRatio || 1);
    }
    const tNow = Date.now();
    const wp = wake ? wake.geometry.attributes.position : null;
    shipLive.forEach((x, i) => {
      const v = x.v;
      let lat = v.lat, lng = v.lng;
      if (x.moving) {
        const h = Math.max(0, Math.min(DR_CAP_H, (tNow - x.t0) / 3.6e6));
        if (h > 0) [lat, lng] = destPoint(v.lat, v.lng, v.cog || 0, v.sog * 1.852 * h);
      }
      x.est = [lat, lng];
      const brg = typeof v.hdg === "number" ? v.hdg : (v.cog || 0);
      headingVecs(lat, lng, brg);
      const sel = selShip === v.id;
      const len = 0.026 * k * (v.len ? Math.max(0.7, Math.min(1.45, Math.sqrt(v.len / 190))) : 0.9) * (sel ? 1.5 : 1);
      x.unit.copy(vUp);
      x.m.position.copy(vUp).multiplyScalar(1.0032);
      if (shipHalo) { const hp = shipHalo.geometry.attributes.position; hp.setXYZ(i, x.m.position.x, x.m.position.y, x.m.position.z); if (i === shipLive.length - 1) hp.needsUpdate = true; }
      mBasis.makeBasis(vRight.clone().multiplyScalar(len), vUp.clone().multiplyScalar(len), vFwd.clone().multiplyScalar(len));
      mBasis.setPosition(x.m.position);
      x.im.setMatrixAt(x.idx, mBasis);
      if (sel) {
        shipSel.visible = true;
        shipSel.position.copy(vUp).multiplyScalar(1.0026);
        shipSel.lookAt(vUp.clone().multiplyScalar(2));
        shipSel.scale.setScalar(len * (0.62 + 0.08 * Math.sin(now / 240)));
      }
      if (wp) {
        const wl = x.moving ? 0.03 * k * Math.max(0.25, Math.min(1.4, (v.sog || 0) / 14)) : 0;
        for (let s = 0; s < WAKE_N - 1; s++) {
          const o = (i * (WAKE_N - 1) + s) * 2;
          const d0 = 0.42 * len + wl * s / (WAKE_N - 1), d1 = 0.42 * len + wl * (s + 1) / (WAKE_N - 1);
          const p0 = vUp.clone().multiplyScalar(1.0026).addScaledVector(vFwd, -d0), p1 = vUp.clone().multiplyScalar(1.0026).addScaledVector(vFwd, -d1);
          wp.setXYZ(o, p0.x, p0.y, p0.z); wp.setXYZ(o + 1, p1.x, p1.y, p1.z);
        }
      }
    });
    if (!shipLive.some((x) => selShip === x.v.id)) shipSel.visible = false;
    Object.values(shipInst).forEach((im) => { im.instanceMatrix.needsUpdate = true; });
    if (wp) wp.needsUpdate = true;
    wakeMat.uniforms.uTime.value = reduceMotion ? 0 : now / 1000;
    return true;
  }
  function followShip(now) {
    if (!selShip || !shipFollow || drag || anim || now - lastInteract < 2500) return false;
    const x = shipLive.find((y) => y.v.id === selShip);
    if (!x) return false;
    const dl = ((x.est[1] - cam.lng + 540) % 360) - 180, da = x.est[0] - cam.lat;
    if (Math.abs(dl) < 0.0005 && Math.abs(da) < 0.0005) return false;
    cam.lng += dl * 0.05; cam.lat = clampLat(cam.lat + da * 0.05);
    return true;
  }
  const shipEst = (id) => { const x = shipLive.find((y) => y.v.id === id); return x ? { lat: x.est[0], lng: x.est[1], t0: x.t0, moving: x.moving, kind: x.kind } : null; };

  /* a dashed detour drawn on the sea (the stress test's Malacca closure) and a closed-strait marker */
  const detourGroup = new THREE.Group(); scene.add(detourGroup);
  let detourItems = [];
  function setDetour(list) {
    detourItems.forEach((d) => { detourGroup.remove(d.mesh); d.mesh.geometry.dispose(); d.mesh.material.dispose(); if (d.x) { detourGroup.remove(d.x); } if (d.label) d.label.remove(); });
    detourItems = (list || []).map((d) => {
      const out = { d };
      if (d.pts && d.pts.length > 1) {
        const pts = [];
        for (let i = 0; i < d.pts.length - 1; i++) {
          const a = ll2v(d.pts[i][0], d.pts[i][1], 1).normalize(), b = ll2v(d.pts[i + 1][0], d.pts[i + 1][1], 1).normalize();
          const n = Math.max(2, Math.round(a.angleTo(b) * 60));
          for (let k = 0; k < n; k++) pts.push(slerpV(a, b, k / n).multiplyScalar(1.0035));
        }
        const last = d.pts[d.pts.length - 1];
        pts.push(ll2v(last[0], last[1], 1).normalize().multiplyScalar(1.0035));
        const curve = new THREE.CatmullRomCurve3(pts);
        const mat = new THREE.ShaderMaterial({
          uniforms: { uColor: { value: new THREE.Color(d.color || "#ffd166") }, uTime: { value: 0 }, uDash: { value: Math.max(3, curve.getLength() * 14) }, uLand: { value: 0 }, uAlpha: { value: 1 }, uHi: { value: 1 } },
          vertexShader: routeVS, fragmentShader: routeFS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
        });
        out.mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.min(400, pts.length * 2), 0.0028, 6, false), mat);
        detourGroup.add(out.mesh);
      }
      if (d.closed) {
        const p = ll2v(d.closed[0], d.closed[1], 1.003), g = new THREE.Group();
        g.position.copy(p); g.lookAt(p.clone().multiplyScalar(2));
        const red = new THREE.MeshBasicMaterial({ color: 0xff5a5a, transparent: true, opacity: 0.95, depthWrite: false, side: THREE.DoubleSide });
        g.add(new THREE.Mesh(new THREE.RingGeometry(0.024, 0.029, 48), red));
        const bar = new THREE.Mesh(new THREE.PlaneGeometry(0.044, 0.006), red); bar.rotation.z = Math.PI / 4;
        const bar2 = bar.clone(); bar2.rotation.z = -Math.PI / 4;
        g.add(bar, bar2);
        out.x = g; detourGroup.add(g);
      }
      if (d.label) {
        out.label = document.createElement("div"); out.label.className = "pin-label tower flow"; out.label.style.setProperty("--c", d.color || "#ffd166");
        out.label.innerHTML = d.label; labelsEl.appendChild(out.label);
        const at = d.labelAt || d.pts[Math.floor(d.pts.length / 2)];
        out.at = ll2v(at[0], at[1], 1.004);
      }
      return out;
    });
    dirty = true;
  }
  function updateDetour(now) {
    if (!detourItems.length) return false;
    detourItems.forEach((o) => {
      if (o.mesh) o.mesh.material.uniforms.uTime.value = now / 1000;
      if (o.x) o.x.scale.setScalar(Math.max(0.5, Math.min(1.6, (cam.dist - 1) / 2)) * (reduceMotion ? 1 : 1 + 0.08 * Math.sin(now / 300)));
      if (o.label) {
        const show = o.at.clone().normalize().dot(camera.position) > 1.02 && !occluded(o.at);
        if (show) { const sp = project(o.at); placeLabel(o.label, sp.x + 10, sp.y - 14, true); } else if (o.shown) placeLabel(o.label, 0, 0, false);
        o.shown = show;
      }
    });
    return true;
  }

  /* glow: a bloom pass on larger screens, loaded only when it can run */
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  }
  if (!LITE && !reduceMotion && !/[?&]nobloom\b/.test(location.search)) {
    (async () => {
      try {
        const B = "vendor/three/examples/js/";
        for (const f of ["shaders/CopyShader.js", "shaders/LuminosityHighPassShader.js", "postprocessing/EffectComposer.js", "postprocessing/RenderPass.js", "postprocessing/ShaderPass.js", "postprocessing/UnrealBloomPass.js"]) await loadScript(B + f);
        if (!THREE.EffectComposer || !THREE.UnrealBloomPass) return;
        let c;
        if (renderer.capabilities.isWebGL2 && THREE.WebGLMultisampleRenderTarget) {
          const pr = renderer.getPixelRatio(), rt = new THREE.WebGLMultisampleRenderTarget(W * pr, H * pr, { format: THREE.RGBAFormat });
          rt.samples = 4;
          c = new THREE.EffectComposer(renderer, rt);
        } else c = new THREE.EffectComposer(renderer);
        c.setPixelRatio(renderer.getPixelRatio());
        c.addPass(new THREE.RenderPass(scene, camera));
        bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(W, H), 0.26, 0.28, 0.93);
        c.addPass(bloomPass);
        c.setSize(W, H);
        composer = c; dirty = true; drawnOnce = false;
      } catch (e) { composer = null; }
    })();
  }

  /* render the view from a given point, for the board pack, and put the camera back */
  function snapshotAt(lat, lng, dist) {
    const keep = { lat: cam.lat, lng: cam.lng, dist: cam.dist };
    cam.lat = lat; cam.lng = lng; cam.dist = clampDist(dist);
    placeCamera();
    if (composer) composer.render(); else renderer.render(scene, camera);
    const url = renderer.domElement.toDataURL("image/jpeg", 0.86);
    cam.lat = keep.lat; cam.lng = keep.lng; cam.dist = keep.dist; dirty = true;
    return url;
  }

  function v14Frame(now, dt) {
    let busy = false;
    uniforms.cloudOn.value = cloudMesh.visible ? cloudU.fade.value / 0.6 : 0;
    if (updateShips(now)) busy = true;
    if (followShip(now)) busy = true;
    if (updateDetour(now)) busy = true;
    if (hzGroup.visible && hzItems.length) hzItems.forEach((h) => {
      if (!h.wave2) return;
      const ph = reduceMotion ? 0.25 : ((now / (h.h.pp || 2200) + h.ph + 0.5) % 1);
      h.wave2.scale.setScalar(1 + ph * (h.h.amp || 1.6));
      h.wave2.material.opacity = (1 - ph) * (h.h.big ? 0.8 : 0.45);
    });
    if (busy) dirty = true;
  }

  placeCamera();
  requestAnimationFrame(frame);

  return {
    applyVisibility,
    showSelected() {
      selPin = pins.find((p) => p.s.id === selected) || null;
      ring.visible = !!selPin;
      if (selPin) { ring.position.copy(selPin.unit.clone().multiplyScalar(1.002)); ring.lookAt(selPin.unit.clone().multiplyScalar(2)); }
      dirty = true;
    },
    highlightRoute(id, id2) { hiRoute = id || null; hiRoute2 = id2 || null; applyVisibility(); },
    flyTo,
    flyToSite(s, d) { flyTo(s.lat, s.lng, d || 1.62); },
    flyToMaterials(ms) {
      const list = SITES.filter((s) => ms.includes(s.m));
      const c = new THREE.Vector3();
      const P = ms.length === 1 && layers.production ? PROD[ms[0]] : null;
      if (P) {
        /* centre on where it is produced, weighted by output, so the tallest towers are in view */
        const pts = P.rows.filter((r) => CENTROID[r[0]]).map((r) => ({ v: ll2v(CENTROID[r[0]][0], CENTROID[r[0]][1], 1), w: Math.sqrt(r[1]) }));
        pts.forEach((p) => c.add(p.v.clone().multiplyScalar(p.w)));
        list.forEach((s) => c.add(ll2v(s.lat, s.lng, 1).multiplyScalar(Math.sqrt(P.rows[0][1]) * 0.15)));
        c.normalize();
        const spread = pts.reduce((mx, p) => Math.max(mx, p.v.angleTo(c)), 0);
        flyTo(Math.asin(c.y) * 180 / Math.PI, ((Math.atan2(c.z, -c.x) * 180 / Math.PI - 180 + 540) % 360) - 180, Math.min(3.9, 2.7 + spread * 0.8));
        return;
      }
      list.forEach((s) => c.add(ll2v(s.lat, s.lng, 1)));
      if (c.length() < 0.25) { flyTo(cam.lat, cam.lng, 3.4); return; }
      c.normalize();
      const lat = Math.asin(c.y) * 180 / Math.PI;
      const lng = Math.atan2(c.z, -c.x) * 180 / Math.PI - 180;
      const spread = list.reduce((mx, s) => Math.max(mx, ll2v(s.lat, s.lng, 1).angleTo(c)), 0);
      flyTo(lat, ((lng + 540) % 360) - 180, 1.9 + spread * 1.35);
    },
    flyToRoute(id) {
      const o = routeObjs.find((x) => x.r.id === id);
      if (!o) return;
      const c = new THREE.Vector3(); o.samples.forEach((p) => c.add(p)); c.normalize();
      const spread = o.samples.reduce((mx, p) => Math.max(mx, p.angleTo(c)), 0);
      flyTo(Math.asin(c.y) * 180 / Math.PI, ((Math.atan2(c.z, -c.x) * 180 / Math.PI - 180 + 540) % 360) - 180, Math.min(4.6, 1.8 + spread * 1.6));
    },
    flyToChoke(c) { flyTo(c.lat, c.lng, 2.2); },
    flyToSat(id) {
      const it = satItems.find((x) => x.o.cfg.id === id);
      const g = it && (it.geo || satGeo(it.o, new Date()));
      if (g) flyTo(g.lat, g.lng, 2.7);
    },
    flyToPoint(lat, lng, d) { flyTo(lat, lng, d || 2.2); },
    setSats,
    setHazards,
    setShipsLive: setShipsLive14, setCloudsHi, setDetour, snapshotAt, shipEst,
    getFollow() { return shipFollow; }, setFollow(v) { shipFollow = !!v; dirty = true; },
    home() { flyTo(HOME.lat, HOME.lng, HOME.dist); },
    relayout() { resize(); },
    snapshot() { placeCamera(); if (composer) composer.render(); else renderer.render(scene, camera); return renderer.domElement; },
    setClouds, setFlows, intro, stopIntro,
    setRedSea(v) { redSea = !!v; dirty = true; }
  };
})();

/* ================= mineral specimens ================= */
/* the specimen viewer starts only when a drawer first needs it */
let specImpl = null;
const specOn = () => specImpl || (specImpl = initSpecimens());
const spec = {
  get mode() { return specImpl ? specImpl.mode : "grid"; },
  get m() { return specImpl ? specImpl.m : null; },
  set(mode, m) { specOn().set(mode, m); },
  setTerrain(...a) { const x = specOn(); if (x.setTerrain) x.setTerrain(...a); }
};
function initSpecimens() {
  const wrap = $("#spec");
  const canvas = $("#spec-canvas");
  const gridEl = $("#spec-grid");
  gridEl.innerHTML = ORDER.map((m) => `<button class="spec-cell" data-m="${m}" aria-label="Explore ${esc(MATERIALS[m].name)}">${esc(MATERIALS[m].name)}</button>`).join("");
  gridEl.addEventListener("click", (e) => { const b = e.target.closest(".spec-cell"); if (b) setFilter(b.dataset.m, true); });
  const api = {
    mode: "grid", m: null,
    set(mode, m) { api.mode = mode; api.m = m || null; wrap.classList.toggle("grid", mode === "grid"); }
  };
  if (!window.THREE) { canvas.hidden = true; return api; }
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
  catch (e) { canvas.hidden = true; return api; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  /* a small studio environment so metals and crystals have something to reflect */
  (function env() {
    const pm = new THREE.PMREMGenerator(renderer);
    const es = new THREE.Scene();
    es.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ color: 0x4a525d, side: THREE.BackSide })));
    const panel = (c, x, y, z, w, h) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
      m.position.set(x, y, z); m.lookAt(0, 0, 0); es.add(m);
    };
    panel(0xffffff, 0, 12, 4, 14, 6);
    panel(0xdde8ff, -12, 4, 6, 6, 10);
    panel(0xfff1dc, 12, 2, -4, 5, 9);
    panel(0x8090a8, 0, -10, 0, 30, 30);
    scene.environment = pm.fromScene(es, 0.02).texture;
    pm.dispose();
  })();
  scene.add(new THREE.HemisphereLight(0xe6eeff, 0x40362c, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 1.7); key.position.set(3, 5, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9cc0ff, 0.8); rim.position.set(-4, 2, -4); scene.add(rim);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);

  /* building blocks */
  const mulberry = (a) => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const col = (hex) => new THREE.Color(hex).convertSRGBToLinear();
  const mat = (hex, o) => new THREE.MeshPhysicalMaterial(Object.assign({ color: col(hex), flatShading: true, roughness: 0.3, metalness: 0 }, o || {}));
  function rock(hex, seed, flat) {
    const g = new THREE.IcosahedronGeometry(1, 2);
    const p = g.attributes.position, v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const n = Math.sin(v.x * 3.1 + seed) * Math.sin(v.y * 2.7 + seed * 1.7) * Math.sin(v.z * 3.4 + seed * 0.6)
        + 0.5 * Math.sin(v.x * 7.3 + v.z * 5.1 + seed);
      v.multiplyScalar(1 + 0.16 * n);
      v.y = Math.max(v.y * 0.62, -(flat || 0.32));
      p.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return new THREE.Mesh(g, mat(hex, { roughness: 0.95 }));
  }
  /* a prism with a pyramidal tip, growing along +y from the origin */
  function prism(sides, r, len, tip, m, twist) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, sides, 1), m);
    body.position.y = len / 2;
    const cap = new THREE.Mesh(new THREE.ConeGeometry(r, tip, sides, 1), m);
    cap.position.y = len + tip / 2;
    g.add(body, cap);
    if (twist) { body.rotation.y = twist; cap.rotation.y = twist; }
    return g;
  }
  /* sit a crystal on the rock's upper surface, leaning outwards */
  function seat(obj, rnd, spread, lift) {
    const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * (spread || 0.55);
    obj.position.set(Math.cos(a) * rr, (lift || 0.38) - rr * 0.35, Math.sin(a) * rr);
    const lean = 0.25 + rr * 0.9;
    obj.rotation.set(Math.sin(a) * lean + (rnd() - 0.5) * 0.4, rnd() * Math.PI, -Math.cos(a) * lean + (rnd() - 0.5) * 0.4);
    return obj;
  }

  const BUILD = {
    ree(rnd) { /* bastnäsite: honey-brown hexagonal tablets */
      const g = new THREE.Group();
      g.add(rock("#6f665b", 1.3));
      const m = mat("#b9792f", { roughness: 0.28, clearcoat: 0.8, clearcoatRoughness: 0.2 });
      for (let i = 0; i < 5; i++) {
        const s = 0.22 + rnd() * 0.22;
        g.add(seat(new THREE.Mesh(new THREE.CylinderGeometry(s, s, s * 0.42, 6), m), rnd, 0.6, 0.42));
      }
      return g;
    },
    ti(rnd) { /* rutile: deep red-brown needles on pale rock */
      const g = new THREE.Group();
      g.add(rock("#bdb5a6", 2.1));
      const m = mat("#7d2412", { roughness: 0.16, metalness: 0.35, clearcoat: 1 });
      for (let i = 0; i < 14; i++) g.add(seat(prism(4, 0.035 + rnd() * 0.03, 0.6 + rnd() * 0.9, 0.08, m, Math.PI / 4), rnd, 0.5, 0.3));
      return g;
    },
    w(rnd) { /* scheelite: orange dipyramids */
      const g = new THREE.Group();
      g.add(rock("#5e5a55", 3.7));
      const m = mat("#e3a35a", { roughness: 0.22, clearcoat: 0.9, transparent: true, opacity: 0.96 });
      [0.55, 0.32, 0.26].forEach((s, i) => {
        const c = new THREE.Mesh(new THREE.OctahedronGeometry(s), m);
        c.scale.set(1, 1.18, 1);
        g.add(seat(c, rnd, i ? 0.6 : 0.15, i ? 0.42 + s * 0.6 : 0.72));
      });
      return g;
    },
    sb(rnd) { /* stibnite: radiating steel-grey blades */
      const g = new THREE.Group();
      g.add(rock("#4b4946", 4.4, 0.95));
      const m = mat("#9aa2ab", { roughness: 0.2, metalness: 0.92 });
      for (let i = 0; i < 18; i++) {
        const p = prism(4, 0.028 + rnd() * 0.025, 1.0 + rnd() * 1.1, 0.07, m, Math.PI / 4);
        p.position.set(0, 0.25, 0);
        const a = rnd() * Math.PI * 2, tilt = 0.15 + rnd() * 0.95;
        p.rotation.set(Math.sin(a) * tilt, rnd() * Math.PI, -Math.cos(a) * tilt);
        g.add(p);
      }
      return g;
    },
    ga(rnd) { /* gallium metal crystals and a molten bead on a dish */
      const g = new THREE.Group();
      const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.0, 0.07, 48), mat("#3a4048", { flatShading: false, roughness: 0.55, metalness: 0.2 }));
      dish.position.y = -0.35;
      g.add(dish);
      const m = mat("#e8ebef", { roughness: 0.16, metalness: 1 });
      [[0, 0, 1.0], [0.36, 0.14, 0.72], [-0.34, 0.2, 0.78], [0.12, -0.34, 0.62], [-0.2, -0.22, 0.5]].forEach(([x, z, s]) => {
        const c = new THREE.Mesh(new THREE.OctahedronGeometry(0.3 * s), m);
        c.scale.set(0.72, 1.9, 0.72);
        c.position.set(x, -0.31 + 0.3 * s * 1.9, z);
        c.rotation.set((rnd() - 0.5) * 0.45, rnd() * Math.PI, (rnd() - 0.5) * 0.45);
        g.add(c);
      });
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 16), mat("#e4e8ec", { flatShading: false, roughness: 0.05, metalness: 1 }));
      bead.scale.set(1.3, 0.35, 1); bead.position.set(0.58, -0.29, -0.3);
      g.add(bead);
      return g;
    },
    ge(rnd) { /* sphalerite: dark resinous tetrahedra */
      const g = new THREE.Group();
      g.add(rock("#7a7268", 5.2));
      const m = mat("#5d230d", { roughness: 0.1, metalness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05 });
      for (let i = 0; i < 9; i++) {
        const s = 0.16 + rnd() * 0.24;
        g.add(seat(new THREE.Mesh(new THREE.TetrahedronGeometry(s), m), rnd, 0.62, 0.38 + s * 0.4));
      }
      return g;
    },
    li(rnd) { /* spodumene: pale pink flattened prisms */
      const g = new THREE.Group();
      g.add(rock("#cfc8ba", 6.6));
      const m = mat("#e2abd0", { roughness: 0.08, clearcoat: 1, transparent: true, opacity: 0.86 });
      [[1.7, 0.2], [1.25, 0.16], [0.95, 0.13]].forEach(([len, r], i) => {
        const p = prism(4, r, len, r * 1.1, m, Math.PI / 4);
        p.scale.set(1, 1, 0.42);
        g.add(seat(p, rnd, i ? 0.5 : 0.12, 0.3));
      });
      return g;
    },
    co(rnd) { /* cobaltite: silvery-pink pyritohedra */
      const g = new THREE.Group();
      g.add(rock("#57534e", 7.7));
      const m = mat("#cec4cb", { roughness: 0.16, metalness: 1 });
      for (let i = 0; i < 6; i++) {
        const s = 0.18 + rnd() * 0.2;
        const c = new THREE.Mesh(new THREE.DodecahedronGeometry(s), m);
        c.scale.set(1, 0.92, 1.06);
        g.add(seat(c, rnd, 0.55, 0.36 + s * 0.5));
      }
      return g;
    },
    ni(rnd) { /* pentlandite: bronze octahedra */
      const g = new THREE.Group();
      g.add(rock("#3f3c39", 8.9));
      const m = mat("#c19b55", { roughness: 0.3, metalness: 0.95 });
      for (let i = 0; i < 7; i++) {
        const s = 0.16 + rnd() * 0.22;
        g.add(seat(new THREE.Mesh(new THREE.OctahedronGeometry(s), m), rnd, 0.6, 0.36 + s * 0.5));
      }
      return g;
    },
    mg(rnd) { /* dolomite: pale, saddle-shaped rhombs on grey rock */
      const g = new THREE.Group();
      g.add(rock("#7d7a74", 6.1));
      const m = mat("#efe3dc", { roughness: 0.34, metalness: 0, clearcoat: 0.4 });
      for (let i = 0; i < 9; i++) {
        const s = 0.2 + rnd() * 0.24, geo = new THREE.BoxGeometry(s, s * 0.85, s);
        geo.applyMatrix4(new THREE.Matrix4().set(1, 0.35, 0, 0, 0, 1, 0, 0, 0, 0.35, 1, 0, 0, 0, 0, 1));
        g.add(seat(new THREE.Mesh(geo, m), rnd, 0.6, 0.42));
      }
      return g;
    },
    mn(rnd) { /* rhodochrosite: pink rhombs on black manganese oxide */
      const g = new THREE.Group();
      g.add(rock("#2a2526", 2.7));
      const m = mat("#e86a8f", { roughness: 0.2, metalness: 0, clearcoat: 0.6 });
      for (let i = 0; i < 7; i++) {
        const s = 0.24 + rnd() * 0.26, geo = new THREE.BoxGeometry(s, s * 0.9, s);
        geo.applyMatrix4(new THREE.Matrix4().set(1, 0.45, 0, 0, 0, 1, 0, 0, 0, 0.45, 1, 0, 0, 0, 0, 1));
        g.add(seat(new THREE.Mesh(geo, m), rnd, 0.55, 0.42));
      }
      return g;
    },
    gr(rnd) { /* graphite: stacked black hexagonal flakes */
      const g = new THREE.Group();
      g.add(rock("#8b867c", 9.4));
      const m = mat("#2d3135", { roughness: 0.38, metalness: 0.6 });
      for (let s = 0; s < 3; s++) {
        const stack = new THREE.Group();
        const n = 6 + Math.floor(rnd() * 5), r0 = 0.25 + rnd() * 0.22;
        for (let i = 0; i < n; i++) {
          const r = r0 * (1 - i * 0.04);
          const f = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.035, 6), m);
          f.position.set((rnd() - 0.5) * 0.04, i * 0.036, (rnd() - 0.5) * 0.04);
          f.rotation.y = (rnd() - 0.5) * 0.15;
          stack.add(f);
        }
        g.add(seat(stack, rnd, s ? 0.55 : 0.1, 0.4));
      }
      return g;
    }
  };

  /* build each specimen and scale them all to the same size */
  const specimens = {};
  ORDER.forEach((m, i) => {
    const g = BUILD[m](mulberry(31 + i * 17));
    const box = new THREE.Box3().setFromObject(g);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const holder = new THREE.Group();
    g.position.sub(center);
    holder.add(g);
    holder.scale.setScalar(2.1 / Math.max(size.x, size.y, size.z));
    holder.visible = false;
    scene.add(holder);
    specimens[m] = holder;
  });
  const showOnly = (m) => { Object.keys(specimens).forEach((k) => { specimens[k].visible = k === m; }); };

  /* drag to turn in single view */
  let rotY = 0.6, rotX = 0.18, vy = 0, idle = 0, dragging = null;
  canvas.addEventListener("pointerdown", (e) => {
    if (api.mode !== "one") return;
    canvas.setPointerCapture(e.pointerId);
    dragging = { x: e.clientX, y: e.clientY };
    idle = performance.now();
    canvas.style.cursor = "grabbing";
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragging.x, dy = e.clientY - dragging.y;
    rotY += dx * 0.012; rotX = Math.max(-0.6, Math.min(0.9, rotX + dy * 0.008));
    vy = dx * 0.012;
    dragging = { x: e.clientX, y: e.clientY };
    idle = performance.now();
  });
  const stop = () => { dragging = null; canvas.style.cursor = ""; };
  canvas.addEventListener("pointerup", stop);
  canvas.addEventListener("pointercancel", stop);

  let W = 1, H = 1, drawnKey = "";
  function resize() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    renderer.setSize(W, H, false);
    drawnKey = "";
  }
  new ResizeObserver(resize).observe(canvas);
  resize();
  let onScreen = true;
  new IntersectionObserver((en) => { onScreen = en[0].isIntersecting; }).observe(canvas);

  function view(x, y, w, h) {
    renderer.setViewport(x, y, w, h);
    renderer.setScissor(x, y, w, h);
    camera.aspect = w / h;
    const fit = 1.25 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / Math.min(1, camera.aspect);
    camera.position.set(0, fit * 0.32, fit);
    camera.lookAt(0, -0.05, 0);
    camera.updateProjectionMatrix();
  }
  let last = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
    last = now;
    if (W < 40 || H < 60) return; /* hidden panel: nothing to draw */
    const viewKey = api.mode + ":" + api.m;
    if ((!onScreen || document.hidden) && drawnKey === viewKey) return;
    drawnKey = viewKey;
    renderer.setScissorTest(false);
    renderer.clear();
    renderer.setScissorTest(true);
    if (api.mode === "grid") {
      const cw = W / 5, ch = H / 2, labelH = 22;
      ORDER.forEach((m, i) => {
        const cx = i % 5, cy = Math.floor(i / 5);
        showOnly(m);
        specimens[m].rotation.set(0.12, (reduceMotion ? 0.6 : now / 2600) + i * 0.7, 0);
        view(cx * cw, (1 - cy) * ch + labelH, cw, ch - labelH);
        renderer.render(scene, camera);
      });
    } else if (api.m) {
      showOnly(api.m);
      if (!dragging) {
        if (Math.abs(vy) > 0.0005) { rotY += vy; vy *= 0.94; }
        else if (!reduceMotion && now - idle > 2500) rotY += dt * 0.35;
      }
      specimens[api.m].rotation.set(rotX, rotY, 0);
      view(0, 0, W, H);
      renderer.render(scene, camera);
    }
    renderer.setScissorTest(false);
  }
  requestAnimationFrame(frame);

  /* a real-terrain block for a mine: heights draped with the satellite image */
  api.setTerrain = (hm, n, texUrl, metersToUnits) => {
    if (specimens.terrain) {
      scene.remove(specimens.terrain);
      specimens.terrain.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) { if (o.material.map) o.material.map.dispose(); o.material.dispose(); } });
    }
    const g = new THREE.PlaneGeometry(2, 2, n - 1, n - 1);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    let mn = Infinity;
    for (let i = 0; i < hm.length; i++) if (hm[i] < mn) mn = hm[i];
    for (let i = 0; i < pos.count; i++) pos.setY(i, (hm[i] - mn) * metersToUnits);
    g.computeVertexNormals();
    const tex = new THREE.TextureLoader().load(texUrl, () => { drawnKey = ""; });
    tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = 4;
    const top = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: tex, roughness: 1, metalness: 0, envMapIntensity: 0.5 }));
    const base = new THREE.Mesh(new THREE.BoxGeometry(2, 0.14, 2), new THREE.MeshStandardMaterial({ color: col("#262b31"), roughness: 1 }));
    base.position.y = -0.07;
    const holder = new THREE.Group();
    const inner = new THREE.Group();
    inner.add(top, base);
    inner.position.y = -0.15;
    holder.add(inner);
    holder.scale.setScalar(1);
    holder.visible = false;
    scene.add(holder);
    specimens.terrain = holder;
    drawnKey = "";
  };
  const baseSet = api.set;
  api.set = (mode, m) => {
    const changed = mode !== api.mode || (m || null) !== api.m;
    baseSet(mode, m);
    if (changed && mode === "one") { rotY = m === "terrain" ? 0.25 : 0.6; rotX = m === "terrain" ? 0.5 : 0.18; vy = 0; idle = performance.now(); }
  };
  return api;
}


/* ================= drawer ================= */
const panelEl = $("#panel"), pHead = $("#p-head"), pBody = $("#p-body"), specCap = $("#spec-cap"), specWrap = $("#spec");
function statBlock(m) {
  const s = MATERIALS[m].stats[0];
  return `<div class="big"><b style="color:${cssVar(m)}">${esc(s.num)}</b><span>${esc(s.what)}</span><small>${esc(s.src)}</small></div>`;
}
function siteRows(list) {
  return `<ul class="list">${list.map((s) => `
    <li><button class="row-btn" data-site="${s.id}">
      ${shapeSvg(s.stage, cssVar(s.m))}
      <span><span class="rb-name">${esc(s.name)}</span>${ACTIVE[s.id] ? `<span class="badge">In the news</span>` : ""}<span class="rb-sub">${esc(s.place)}, ${esc(s.country)}</span></span>
      <small>${esc(ONLINE[s.id] ? `from ${ONLINE[s.id]}` : s.stage)}</small>
    </button></li>`).join("")}</ul>`;
}
function matRows(ms, roles) {
  return `<ul class="list">${ms.map((m, i) => {
    const t = topStage(m);
    return `<li><button class="row-btn" data-mat="${m}">
      <i class="dot" style="background:${cssVar(m)}"></i>
      <span><span class="rb-name">${esc(MATERIALS[m].name)}</span>${roles ? `<span class="rb-sub">${esc(roles[i])}</span>` : ""}</span>
      <small>${t ? `${esc(pctTxt(t))} ${esc(CC[t.who] || t.who)}` : "CN leads"}</small>
    </button></li>`;
  }).join("")}</ul>`;
}
function specCaption(m, lead) {
  const s = MATERIALS[m].spec;
  return `<div>${lead ? `<span class="fine">${esc(lead)}</span><br>` : ""}<strong>${esc(s.mineral)}</strong><span class="formula">${esc(s.formula)}</span></div>
    <span>${esc(s.note)}</span><span class="fine">Stylized model · drag to turn</span>`;
}
const srcLinks = (src) => src && src.length ? `<div class="srcs">Sources: ${src.map((x) => `<a href="${esc(x.u)}" target="_blank" rel="noopener">${esc(x.t)}</a>`).join("")}</div>` : "";
const shareBtn = `<button class="btn ghost small" data-share="1"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 2v8M4.5 5.5L8 2l3.5 3.5M3 10v3h10v-3"/></svg>Share card</button>`;
const miniSlot = (ms) => `<div class="mini" id="mini-wire" data-m="${ms.join(",")}"></div>`;

function prodBlock(m) {
  const P = PROD[m];
  if (!P) return "";
  const max = Math.max(...P.rows.map((r) => r[1]));
  const title = (P.pctOnly || P.qual) ? "Who makes it" : m === "ti" ? "Who mines it (titanium minerals)" : "Who mines it";
  return `<div><h3>${title}</h3><div class="prod">${P.rows.map(([c, v]) => `
    <div class="prod-row"><span>${esc(ctry(c))}</span><span class="tr"><b style="width:${(v / max * 100).toFixed(1)}%;background:${cssVar(m)}"></b></span><span class="v">${esc(fmtProd(P, v))}</span></div>`).join("")}</div>
    <p class="srcs" style="margin-top:10px">${esc(trStr(P.src))} · ${esc(P.year)}${P.world ? T(` · world about ${esc(fmtProd(P, P.world))}`, ` · ve světě celkem asi ${esc(fmtProd(P, P.world))}`) : ""}${P.note ? ` · ${esc(trStr(P.note))}` : ""}</p></div>`;   // build 56: one text node, so the translation pass never matched it
}
/* ================= live layer: orbits, passes, hazards ================= */
function tleValid(l) {
  if (typeof l !== "string" || l.length < 69) return false;
  let sum = 0;
  for (let i = 0; i < 68; i++) { const c = l[i]; if (c >= "0" && c <= "9") sum += +c; else if (c === "-") sum += 1; }
  return sum % 10 === +l[68];
}
function tleEpoch(l1) {
  const yy = +l1.slice(18, 20), doy = parseFloat(l1.slice(20, 32));
  return Date.UTC(yy < 57 ? 2000 + yy : 1900 + yy, 0, 1) + (doy - 1) * 86400000;
}
function satGeo(o, date) {
  if (!window.satellite || !o || !o.satrec) return null;
  let pv;
  try { pv = satellite.propagate(o.satrec, date); } catch (e) { return null; }
  if (!pv || !pv.position || typeof pv.position !== "object") return null;
  const gd = satellite.eciToGeodetic(pv.position, satellite.gstime(date));
  const v = pv.velocity;
  return { lat: gd.latitude * 180 / Math.PI, lng: ((gd.longitude * 180 / Math.PI + 540) % 360) - 180, h: gd.height, speed: v && typeof v === "object" ? Math.hypot(v.x, v.y, v.z) : null };
}
function loadOrbits() {
  if (!window.satellite) return;
  const pool = {};
  [ORBIT_SNAPSHOT, LIVE.orbits].forEach((src) => ((src && Array.isArray(src.sats)) ? src.sats : []).forEach((t) => {
    if (!t || !tleValid(t.l1) || !tleValid(t.l2)) return;
    const norad = +t.norad || +t.l1.slice(2, 7);
    const ep = tleEpoch(t.l1);
    if (!pool[norad] || ep > pool[norad].epoch) pool[norad] = { l1: t.l1, l2: t.l2, epoch: ep };
  }));
  ORBITS = LIVE_SATS.filter((c) => pool[c.norad]).map((c) => {
    let satrec = null;
    try { satrec = satellite.twoline2satrec(pool[c.norad].l1, pool[c.norad].l2); } catch (e) { satrec = null; }
    return satrec && !satrec.error ? { cfg: c, satrec, epoch: pool[c.norad].epoch } : null;
  }).filter(Boolean);
  ORBIT_BY_ID = Object.fromEntries(ORBITS.map((o) => [o.cfg.id, o]));
  if (globe) globe.setSats(ORBITS);
  buildTracks();
}

/* ground tracks for the next six days, one sample a minute, computed in small slices */
const TRACK_STEP = 60000, TRACK_N = 6 * 1440;
let trackCache = {}, trackT0 = 0, tracksReady = false, trackGen = 0, passMemo = {};
function buildTracks() {
  const gen = ++trackGen;
  trackT0 = Math.floor(Date.now() / TRACK_STEP) * TRACK_STEP;
  tracksReady = false; passMemo = {}; trackCache = {};
  const jobs = ORBITS.filter((o) => o.cfg.img);
  jobs.forEach((o) => { trackCache[o.cfg.id] = { lat: new Float32Array(TRACK_N), lng: new Float32Array(TRACK_N), done: 0 }; });
  let ji = 0;
  const work = () => {
    if (gen !== trackGen) return;
    const t0 = performance.now();
    while (ji < jobs.length && performance.now() - t0 < 10) {
      const o = jobs[ji], c = trackCache[o.cfg.id];
      for (let k = 0; k < 300 && c.done < TRACK_N; k++, c.done++) {
        const g = satGeo(o, new Date(trackT0 + c.done * TRACK_STEP));
        c.lat[c.done] = g ? g.lat : NaN; c.lng[c.done] = g ? g.lng : NaN;
      }
      if (c.done >= TRACK_N) ji++;
    }
    if (ji < jobs.length) setTimeout(work, 0);
    else { tracksReady = true; passMemo = {}; refreshLiveViews(); }
  };
  setTimeout(work, 60);
}
setInterval(() => { if (ORBITS.length && Date.now() - trackT0 > 6 * 3600000) buildTracks(); }, 600000);

function gcKm(la1, lo1, la2, lo2) {
  const r = Math.PI / 180, dla = (la2 - la1) * r, dlo = (lo2 - lo1) * r;
  const a = Math.sin(dla / 2) ** 2 + Math.cos(la1 * r) * Math.cos(la2 * r) * Math.sin(dlo / 2) ** 2;
  return 2 * R_E * Math.asin(Math.min(1, Math.sqrt(a)));
}
function subsolarAt(date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const n = (date.getTime() - start) / 86400000;
  const decl = -23.44 * Math.cos(2 * Math.PI / 365 * (n + 10));
  const B = 2 * Math.PI / 365 * (n - 81);
  const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  const h = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  return { lat: decl, lng: ((-15 * (h - 12 + eot / 60)) + 540) % 360 - 180 };
}
function sunElev(lat, lng, t) {
  const ss = subsolarAt(new Date(t));
  return 90 - gcKm(lat, lng, ss.lat, ss.lng) / R_E * 180 / Math.PI;
}
/* times the site sits inside the camera's swath, in daylight, between two moments */
function passesFor(lat, lng, o, fromMs, toMs) {
  const c = trackCache[o.cfg.id];
  if (!c || !o.cfg.swath) return [];
  const half = o.cfg.swath / 2;
  const i0 = Math.max(1, Math.floor((fromMs - trackT0) / TRACK_STEP)), i1 = Math.min(c.done - 2, Math.ceil((toMs - trackT0) / TRACK_STEP));
  const out = [];
  let dPrev = gcKm(lat, lng, c.lat[i0 - 1], c.lng[i0 - 1]), dCur = gcKm(lat, lng, c.lat[i0], c.lng[i0]);
  for (let i = i0; i <= i1; i++) {
    const dNext = gcKm(lat, lng, c.lat[i + 1], c.lng[i + 1]);
    if (dCur <= dPrev && dCur <= dNext && dCur < half + 460) {
      let best = Infinity, bt = 0;
      const tc = trackT0 + i * TRACK_STEP;
      for (let dt = -62000; dt <= 62000; dt += 2000) {
        const g = satGeo(o, new Date(tc + dt));
        if (!g) continue;
        const d = gcKm(lat, lng, g.lat, g.lng);
        if (d < best) { best = d; bt = tc + dt; }
      }
      if (best <= half && bt >= fromMs && bt <= toMs) {
        const g0 = satGeo(o, new Date(bt)), g1 = satGeo(o, new Date(bt + 10000));
        const descending = g0 && g1 && g1.lat < g0.lat;
        if (descending && sunElev(lat, lng, bt) > 5) out.push({ sat: o.cfg, t: bt, d: best });
      }
    }
    dPrev = dCur; dCur = dNext;
  }
  return out;
}
function cloudAt(siteId, t) {
  const c = LIVE.conditions && LIVE.conditions.sites && LIVE.conditions.sites[siteId];
  if (!c || typeof c.fc0 !== "string" || !Array.isArray(c.fc)) return null;
  const t0 = Date.parse(c.fc0.endsWith("Z") ? c.fc0 : c.fc0 + "Z");
  const i = Math.round((t - t0) / 10800000);
  return i >= 0 && i < c.fc.length && typeof c.fc[i] === "number" ? c.fc[i] : null;
}
function nextPassesForSite(s, n) {
  if (!tracksReady) return null;
  const m = passMemo[s.id];
  if (m && Date.now() - m.at < 300000) return m.list.filter((p) => p.t > Date.now() - 60000).slice(0, n);
  const now = Date.now(), list = [];
  ORBITS.filter((o) => o.cfg.img).forEach((o) => passesFor(s.lat, s.lng, o, now, trackT0 + (TRACK_N - 2) * TRACK_STEP).slice(0, 3).forEach((p) => list.push(p)));
  list.sort((a, b) => a.t - b.t);
  list.forEach((p) => { p.cloud = cloudAt(s.id, p.t); });
  passMemo[s.id] = { at: now, list };
  return list.slice(0, n);
}
function satSitePasses(id, hours) {
  const o = ORBIT_BY_ID[id];
  if (!o || !tracksReady || !o.cfg.img) return null;
  const now = Date.now(), out = [];
  SITES.forEach((s) => passesFor(s.lat, s.lng, o, now, now + hours * 3600000).forEach((p) => out.push(Object.assign({ s, cloud: cloudAt(s.id, p.t) }, p))));
  return out.sort((a, b) => a.t - b.t);
}

/* formatting */
function fmtIn(ms) {
  if (ms <= 0) return "now";
  const s = Math.round(ms / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
  if (d) return `in ${d} d ${h} h`;
  if (h) return `in ${h} h ${String(m).padStart(2, "0")} min`;
  return `in ${m} min ${String(sec).padStart(2, "0")} s`;
}
function fmtAgo(ms) {
  if (!isFinite(ms)) return "";
  const m = Math.round(ms / 60000);
  if (m < 1) return T("just now", "právě teď");
  if (m < 60) return T(`${m} min ago`, `před ${m} min`);
  const h = Math.round(m / 60);
  if (h < 48) return T(`${h} h ago`, `před ${h} h`);
  const d = Math.round(h / 24);
  return T(`${d} days ago`, `před ${d} dny`);
}
function fmtLocal(t) { try { return new Date(t).toLocaleString(LANG === "cs" ? "cs-CZ" : "en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); } catch (e) { return new Date(t).toISOString().slice(0, 16).replace("T", " ") + " UTC"; } }
const isoMs = (x) => typeof x === "string" ? Date.parse(/Z$|[+-]\d\d:?\d\d$/.test(x) ? x : x + "Z") : NaN;
function cloudChip(c) {
  if (typeof c !== "number") return "";
  if (c < 30) return `<em class="cc ok">likely clear · ${Math.round(c)}% cloud</em>`;
  if (c < 70) return `<em class="cc">partly cloudy · ${Math.round(c)}%</em>`;
  return `<em class="cc bad">likely cloudy · ${Math.round(c)}%</em>`;
}

/* hazards */
function hazardList() {
  const H = LIVE.hazards;
  if (!H) return [];
  const out = [];
  const quakes = Array.isArray(H.quakes) ? H.quakes : [];
  quakes.forEach((q) => {
    if (typeof q.lat !== "number" || typeof q.lng !== "number" || typeof q.mag !== "number") return;
    out.push({ id: "q-" + String(q.id).replace(/[^\w-]/g, ""), kind: "EQ", src: "USGS", lat: q.lat, lng: q.lng, t: +q.t, mag: q.mag,
      title: `Magnitude ${q.mag.toFixed(1)} earthquake`, place: q.place || "", level: q.alert && q.alert !== "green" ? q.alert : null,
      detail: `Depth ${q.depth} km${q.tsunami ? " · tsunami flag raised" : ""}`, url: safeUrl(q.url), short: `M${q.mag.toFixed(1)}` });
  });
  (Array.isArray(H.alerts) ? H.alerts : []).forEach((a) => {
    if (typeof a.lat !== "number" || typeof a.lng !== "number" || !HZ_TYPE[a.type]) return;
    const t = isoMs(a.to || a.from);
    if (a.type === "EQ") {
      /* the same quake as a USGS record: carry the GDACS alert level onto it */
      const twin = out.find((q) => q.kind === "EQ" && gcKm(q.lat, q.lng, a.lat, a.lng) < 120 && Math.abs(q.t - isoMs(a.from)) < 3600000);
      if (twin) { twin.level = String(a.level || "").toLowerCase() || twin.level; twin.gdacs = safeUrl(a.url); return; }
    }
    out.push({ id: "a-" + String(a.id).replace(/[^\w-]/g, ""), kind: a.type, src: "GDACS", lat: a.lat, lng: a.lng, t,
      title: a.name || HZ_TYPE[a.type], place: a.country || "", level: String(a.level || "").toLowerCase() || null,
      detail: a.severity || "", url: safeUrl(a.url), short: hzShort((a.name || HZ_TYPE[a.type]).replace(/^(Tropical Cyclone|Earthquake in|Flood in|Forest fires? in|Drought in|Volcano)\s*/i, "")) || HZ_TYPE[a.type] });
  });
  out.forEach((h) => {
    h.color = h.level === "red" ? "#ff5a5a" : h.level === "orange" ? "#ff9f43" : h.level === "yellow" ? "#ffd166" : h.kind === "EQ" ? "#f5b14c" : h.kind === "TC" ? "#7fd3ff" : "#9fe0b0";
    const base = h.kind === "EQ" ? 0.009 + Math.max(0, h.mag - 5) * 0.006 : h.kind === "TC" ? 0.02 : 0.013;
    h.r = base * (h.level === "red" ? 1.5 : h.level === "orange" ? 1.25 : 1);
    if (h.kind === "EQ" && h.level) h.short += ` · ${h.level}`;
  });
  /* river gauges on the routes into Central European industry: shown when the water is low or high */
  (Array.isArray(H.rivers) ? H.rivers : []).forEach((r) => {
    if (typeof r.lat !== "number" || typeof r.lng !== "number" || (r.state !== "low" && r.state !== "high")) return;
    const low = r.state === "low";
    out.push({ id: "r-" + String(r.id).replace(/[^\w-]/g, ""), kind: low ? "DR" : "FL", src: "PEGELONLINE", lat: r.lat, lng: r.lng, t: isoMs(r.t) || Date.now(),
      title: T(`${r.river} at ${r.name}: ${r.cm} cm`, `${r.river_cs || r.river}, ${r.name}: ${r.cm} cm`), place: T("Germany", "Německo"), level: "orange",
      detail: low ? T("Low water: barges carry less cargo to Central European industry", "Nízká voda: lodě vezou méně nákladu do středoevropského průmyslu") : T("High water: shipping may be restricted", "Vysoká voda: plavba může být omezená"),
      url: safeUrl(r.url), short: `${r.cm} cm` });
  });
  return out;
}
function sitesNear(lat, lng, km) {
  return SITES.map((s) => ({ s, d: gcKm(lat, lng, s.lat, s.lng) })).filter((x) => x.d <= km).sort((a, b) => a.d - b.d);
}
function routesNear(lat, lng, km) {
  const out = [];
  ROUTES.forEach((r) => {
    let best = Infinity;
    r.legs.forEach((l) => {
      for (let i = 0; i < l.pts.length; i++) {
        const p = l.pts[i], q = l.pts[i + 1] || p;
        for (let k = 0; k <= 10; k++) {
          const la = p[0] + (q[0] - p[0]) * k / 10;
          let dlo = q[1] - p[1]; if (dlo > 180) dlo -= 360; if (dlo < -180) dlo += 360;
          const d = gcKm(lat, lng, la, p[1] + dlo * k / 10);
          if (d < best) best = d;
        }
      }
    });
    if (best <= km) out.push({ r, d: best });
  });
  return out.sort((a, b) => a.d - b.d);
}
function hazardsNearSite(s, km) {
  return HZ.map((h) => ({ h, d: gcKm(s.lat, s.lng, h.lat, h.lng) })).filter((x) => x.d <= km).sort((a, b) => a.d - b.d);
}
const hzRow = (x) => `<li><button class="row-btn" data-hz="${esc(x.h.id)}"><i class="dot" style="background:${x.h.color}"></i><span><span class="rb-name">${esc(x.h.title)}</span><span class="rb-sub">${esc(x.h.place)}${x.h.t ? ` · ${esc(fmtAgo(Date.now() - x.h.t))}` : ""}</span></span><small>${Math.round(x.d)} km</small></button></li>`;

function onLive(k) {
  v13OnLive(k);
  v14OnLive(k);
  if (k === "orbits") loadOrbits();
  if (k === "hazards") {
    HZ = hazardList();
    HZ_BY_ID = Object.fromEntries(HZ.map((h) => [h.id, h]));
    HZ.forEach((h) => { HZ_BY_ID[h.id] = h; });
    CF.forEach((h) => { HZ_BY_ID[h.id] = h; });
    if (globe) globe.setHazards(hzForGlobe());
  }
  if (k === "conflict") onConflict();
  if (k === "trade") renderChokepoints();
  if (["traffic", "conflict", "tenders", "trade"].includes(k)) { renderSignals(); refreshV11Slots(); }
  if (k === "conditions") passMemo = {};
  if (k === "ships") {
    SHIPS = shipList();
    SHIP_BY_ID = Object.fromEntries(SHIPS.map((v) => [v.id, v]));
    $("#lyr-ships").hidden = !SHIPS.length;
    if (globe) globe.setShipsLive(SHIPS);
  }
  if (k === "prices" && !panelEl.hidden && MATERIALS[filter] && !selected && !selRoute && !selChoke && !selSat && !selHz && !selShip && !selLive) {
    const el = $("#price-slot"); if (el) el.innerHTML = priceBlock(filter);
  }
  updateLiveCount();
  refreshLiveViews();
}
function nearSupplyChain() {
  return HZ.map((h) => ({ h, sites: sitesNear(h.lat, h.lng, 500), routes: routesNear(h.lat, h.lng, 300) })).filter((x) => x.sites.length || x.routes.length);
}
function updateLiveCount() {
  const el = $("#live-count");
  if (!el) return;
  const n = HZ.length ? nearSupplyChain().length : 0;
  el.textContent = n ? `${n} near supply chain` : "";
}
function refreshLiveViews() {
  if (panelEl.hidden) return;
  if (selected) { const el = $("#live-site"); if (el) el.innerHTML = liveSiteHtml(SITE_BY_ID[selected]); }
  else if (selSat) renderSatNext(selSat);
  else if (selLive) { const top = panelEl.scrollTop; drawerLive(); panelEl.scrollTop = top; }
  else if (selHz && HZ_BY_ID[selHz]) { const top = panelEl.scrollTop; drawerHazard(selHz); panelEl.scrollTop = top; }
}
setInterval(() => {
  if (panelEl.hidden) return;
  const now = Date.now();
  panelEl.querySelectorAll("time[data-until]").forEach((el) => { el.textContent = fmtIn(+el.dataset.until - now); });
  if (selSat) updateTele();
}, 1000);

/* drawer pieces */
const orbitAge = () => {
  const eps = ORBITS.map((o) => o.epoch);
  return eps.length ? fmtAgo(Date.now() - Math.min(...eps)) : "";
};
const passRow = (p) => `<li><i style="background:${p.sat.color}"></i><span><b>${esc(p.sat.name)}</b><span class="sub">${esc(fmtLocal(p.t))} your time · ${Math.round(p.d)} km off the track</span></span><span class="when"><time data-until="${p.t}">${fmtIn(p.t - Date.now())}</time>${cloudChip(p.cloud)}</span></li>`;
function liveSiteHtml(s) {
  if (!s) return "";
  const parts = [];
  const c = LIVE.conditions && LIVE.conditions.sites && LIVE.conditions.sites[s.id];
  if (c && typeof c.temp === "number") {
    parts.push(`<div class="cond"><b>${Math.round(c.temp)}°C</b><span>${esc(WMO[c.code] || "")}</span><span>Cloud ${Math.round(c.cloud)}%</span><span>Wind ${Math.round(c.wind)} km/h</span>${c.precip ? `<span>Rain ${esc(c.precip)} mm</span>` : ""}<small>Now at the site · Open-Meteo, ${esc(fmtAgo(Date.now() - isoMs(c.t)))}</small></div>`);
  }
  const ps = window.satellite ? nextPassesForSite(s, 4) : [];
  if (ps === null) parts.push(`<p class="srcs">Working out the next satellite passes…</p>`);
  else if (ps.length) {
    parts.push(`<div><h3>Next chances to photograph it</h3><ul class="passes">${ps.map(passRow).join("")}</ul>
      <p class="srcs" style="margin-top:8px">Computed in your browser from CelesTrak orbit data (${esc(orbitAge())}). A pass means the site is inside the camera's swath in daylight; the mission decides whether it records.${LIVE.conditions ? " Cloud is the Open-Meteo forecast for that hour." : ""}</p></div>`);
  }
  const sc = LIVE.scenes && LIVE.scenes.sites && LIVE.scenes.sites[s.id];
  if (sc && sc.date) parts.push(`<p class="srcs">Last Sentinel-2 pass on record: ${esc(fmtLocal(isoMs(sc.date)))}, ${esc(sc.cloud)}% cloud over the tile${sc.clearDate ? ` · last fairly clear tile: ${esc(fmtDay(sc.clearDate))}` : ""} · Earth Search</p>`);
  const hz = hazardsNearSite(s, 500);
  if (hz.length) parts.push(`<div><h3>Live hazards within 500 km</h3><ul class="list">${hz.map(hzRow).join("")}</ul></div>`);
  if (!parts.length) return "";
  return `<div class="live-block"><div class="live-head"><span class="live-dot on"></span>Live</div>${parts.join("")}</div>`;
}
function drawerSat(id) {
  const o = ORBIT_BY_ID[id];
  const c = o ? o.cfg : LIVE_SATS.find((x) => x.id === id) || LIVE_SATS[0];
  pHead.innerHTML = `<div class="kick"><span><i style="background:${c.color}"></i>Satellite</span><span style="color:var(--live)">Live position</span></div><h2>${esc(c.name)}</h2><div class="muted">${esc(c.owner)}</div>`;
  specWrap.hidden = true;
  pBody.innerHTML = `
    <div class="tele" id="tele"></div>
    <p class="note">${esc(c.role)}</p>
    ${c.fam === "s2" ? `<ul class="facts">${SAT_FACTS.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
    ${c.img ? `<div id="sat-next"></div>` : ""}
    <p class="srcs">Position computed live in your browser with the SGP4 model from CelesTrak orbit data${o ? ` dated ${esc(fmtLocal(o.epoch))}` : ""}. The globe follows the satellite; drag to look around.</p>
    <div class="actions"><a class="btn small" href="https://browser.dataspace.copernicus.eu/" target="_blank" rel="noopener">Open Copernicus Browser</a></div>
    ${srcLinks(SAT_SRC[c.fam] || [])}`;
  updateTele();
  renderSatNext(id);
}
function updateTele() {
  const el = document.getElementById("tele");
  if (!el || !selSat) return;
  const g = satGeo(ORBIT_BY_ID[selSat], new Date());
  if (!g) { el.innerHTML = `<div><span>Status</span><b>No orbit data yet</b></div>`; return; }
  const ll = (v, p, n) => `${Math.abs(v).toFixed(2)}° ${v >= 0 ? p : n}`;
  el.innerHTML = `<div><span>Latitude</span><b>${ll(g.lat, "N", "S")}</b></div><div><span>Longitude</span><b>${ll(g.lng, "E", "W")}</b></div><div><span>Altitude</span><b>${Math.round(g.h)} km</b></div><div><span>Speed</span><b>${g.speed ? g.speed.toFixed(2) + " km/s" : "–"}</b></div><div><span>Below it</span><b>${sunElev(g.lat, g.lng, Date.now()) > 0 ? "Daylight" : "Night"}</b></div>`;
}
function renderSatNext(id) {
  const el = document.getElementById("sat-next");
  if (!el) return;
  const list = satSitePasses(id, 48);
  if (list === null) { el.innerHTML = `<p class="srcs">Working out which mines it will pass over…</p>`; return; }
  el.innerHTML = list.length ? `<h3>Atlas sites under its camera in the next 48 hours</h3><ul class="list">${list.slice(0, 8).map((p) => `<li><button class="row-btn" data-site="${p.s.id}"><i class="dot" style="background:${cssVar(p.s.m)}"></i><span><span class="rb-name">${esc(p.s.name)}</span><span class="rb-sub">${esc(fmtLocal(p.t))} · <time data-until="${p.t}">${fmtIn(p.t - Date.now())}</time> ${cloudChip(p.cloud)}</span></span><small>${Math.round(p.d)} km</small></button></li>`).join("")}</ul>`
    : `<p class="srcs">No atlas site falls inside its swath in daylight in the next 48 hours.</p>`;
}
function drawerHazard(id) {
  const h = HZ_BY_ID[id];
  if (!h) { selHz = null; selLive = true; drawerLive(); return; }
  pHead.innerHTML = `<div class="kick"><span><i style="background:${h.color}"></i>${esc(HZ_TYPE[h.kind])}</span>${h.level ? `<span>${esc(h.level)} alert</span>` : ""}<span style="color:var(--live)">Live</span></div><h2>${esc(h.title)}</h2><div class="muted">${esc(h.place)}</div><div class="coord">${fmtCoord(h.lat, h.lng)}${h.t ? ` · ${esc(fmtLocal(h.t))}` : ""}</div>`;
  specWrap.hidden = true;
  const ns = sitesNear(h.lat, h.lng, 800), nr = routesNear(h.lat, h.lng, 400);
  const fetched = LIVE.hazards && LIVE.hazards.fetchedAt ? fmtAgo(Date.now() - isoMs(LIVE.hazards.fetchedAt)) : "";
  pBody.innerHTML = `
    ${h.detail ? `<p class="note">${esc(h.detail)}</p>` : ""}
    ${ns.length ? `<div><h3>Atlas sites within 800 km</h3><ul class="list">${ns.map((x) => `<li><button class="row-btn" data-site="${x.s.id}"><i class="dot" style="background:${cssVar(x.s.m)}"></i><span><span class="rb-name">${esc(x.s.name)}</span><span class="rb-sub">${esc(MATERIALS[x.s.m].name)} · ${esc(x.s.stage)}</span></span><small>${Math.round(x.d)} km</small></button></li>`).join("")}</ul></div>` : `<p class="srcs">No site on this atlas lies within 800 km.</p>`}
    ${nr.length ? `<div><h3>Trade routes within 400 km</h3><ul class="list">${nr.map((x) => `<li><button class="row-btn" data-route="${x.r.id}"><i class="dot" style="background:${cssVar(x.r.m[0])}"></i><span><span class="rb-name">${esc(x.r.name)}</span><span class="rb-sub">${esc(x.r.fromLabel)} → ${esc(x.r.toLabel)}</span></span><small>${Math.round(x.d)} km</small></button></li>`).join("")}</ul></div>` : ""}
    ${h.kind === "CF" ? `<p class="srcs">${T("UCDP Candidate Events Dataset (Uppsala Conflict Data Program): preliminary records of organised violence with at least one death, grouped here by half-degree cell.", "UCDP Candidate Events Dataset (Uppsalský program dat o konfliktech): předběžné záznamy organizovaného násilí s nejméně jedním úmrtím, zde seskupené po půlstupňových buňkách.")}</p>` : `<p class="srcs">${h.src === "USGS" ? "USGS earthquake feed: magnitude 5 and above, past 7 days" : "GDACS: the Global Disaster Alert and Coordination System of the UN and the European Commission"}${fetched ? ` · fetched ${esc(fetched)}` : ""}. Distance alone says nothing about damage; read the report.</p>`}
    <div class="actions">${h.url ? `<a class="btn small" href="${esc(h.url)}" target="_blank" rel="noopener">${h.src} report</a>` : ""}${h.gdacs ? `<a class="btn ghost small" href="${esc(h.gdacs)}" target="_blank" rel="noopener">GDACS alert</a>` : ""}</div>`;
}
function drawerLive() {
  pHead.innerHTML = `<div class="kick"><span style="color:var(--live)">Live</span><span>${esc(new Date().toUTCString().slice(17, 22))} UTC</span></div><h2>Right now</h2><div class="muted">Satellites over the supply chain and hazards near it.</div>`;
  specWrap.hidden = true;
  const near = nearSupplyChain();
  const feeds = [
    ["Satellite orbits", "CelesTrak", ORBITS.length ? Math.min(...ORBITS.map((o) => o.epoch)) : NaN, 3],
    ["Earthquakes and disaster alerts", "USGS · GDACS", LIVE.hazards ? isoMs(LIVE.hazards.fetchedAt) : NaN, 0.5],
    ["Sentinel-2 passes on record", "Earth Search", LIVE.scenes ? isoMs(LIVE.scenes.fetchedAt) : NaN, 0.5],
    ["Metal prices", LIVE.prices ? (LIVE.prices.sources || []).join(" · ") : "FRED", LIVE.prices ? isoMs(LIVE.prices.fetchedAt) : NaN, 2],
    ...(LIVE.ships ? [["Ships near chokepoints (AIS)", "AISStream", isoMs(LIVE.ships.fetchedAt), 0.5]] : []),
    [T("Ship traffic at chokepoints and ports", "Lodní provoz v úzkých místech a přístavech"), "IMF PortWatch", LIVE.traffic ? isoMs(LIVE.traffic.fetchedAt) : NaN, 9],
    [T("Armed-conflict events", "Události ozbrojených konfliktů"), "UCDP", LIVE.conflict ? isoMs(LIVE.conflict.fetchedAt) : NaN, 35],
    [T("EU imports by origin", "Dovoz do EU podle původu"), "Eurostat Comext", LIVE.trade ? isoMs(LIVE.trade.fetchedAt) : NaN, 35],
    [T("EU defence tenders", "Obranné zakázky v EU"), "TED", LIVE.tenders ? isoMs(LIVE.tenders.fetchedAt) : NaN, 35]
  ];
  let upcoming = null;
  if (tracksReady) {
    upcoming = [];
    SITES.forEach((s) => (nextPassesForSite(s, 2) || []).forEach((p) => upcoming.push(Object.assign({ s }, p))));
    upcoming.sort((a, b) => a.t - b.t);
  }
  pBody.innerHTML = `
    <div><h3>Satellites tracked live</h3><ul class="list">${ORBITS.map((o) => `<li><button class="row-btn" data-sat="${o.cfg.id}"><i class="dot" style="background:${o.cfg.color}"></i><span><span class="rb-name">${esc(o.cfg.name)}</span><span class="rb-sub">${esc(o.cfg.owner)}</span></span><small>${o.cfg.swath ? `${o.cfg.swath} km swath` : "spectrometer"}</small></button></li>`).join("")}</ul></div>
    <div><h3>Next satellite passes over atlas sites</h3>${upcoming === null ? `<p class="srcs">Working them out…</p>` : upcoming.length ? `<ul class="list">${upcoming.slice(0, 6).map((p) => `<li><button class="row-btn" data-site="${p.s.id}"><i class="dot" style="background:${p.sat.color}"></i><span><span class="rb-name">${esc(p.s.name)}</span><span class="rb-sub">${esc(p.sat.name)} · <time data-until="${p.t}">${fmtIn(p.t - Date.now())}</time> ${cloudChip(p.cloud)}</span></span><small>${esc(new Date(p.t).toLocaleTimeString(LANG === "cs" ? "cs-CZ" : "en-GB", { hour: "2-digit", minute: "2-digit" }))}</small></button></li>`).join("")}</ul>` : `<p class="srcs">None found.</p>`}</div>
    ${SHIPS.length ? `<div><h3>Ships near chokepoints right now</h3><ul class="list">${Object.entries(SHIPS.reduce((acc, v) => { (acc[v.box || "Other"] = acc[v.box || "Other"] || []).push(v); return acc; }, {})).map(([box, vs]) => `<li><button class="row-btn" data-ship="${vs[0].id}"><i class="dot" style="background:#e9f6ff"></i><span><span class="rb-name">${esc(box)}</span><span class="rb-sub">${vs.length} vessel${vs.length > 1 ? "s" : ""} reporting, ${vs.filter((v) => (v.sog || 0) > 1).length} under way</span></span><small>AIS</small></button></li>`).join("")}</ul></div>` : ""}
    <div><h3>Hazards near the supply chain</h3>${!LIVE.hazards ? `<p class="srcs">The hazard feed has not arrived yet.</p>` : near.length ? `<ul class="list">${near.map((x) => `<li><button class="row-btn" data-hz="${esc(x.h.id)}"><i class="dot" style="background:${x.h.color}"></i><span><span class="rb-name">${esc(x.h.title)}</span><span class="rb-sub">${x.sites.length ? `${Math.round(x.sites[0].d)} km from ${esc(x.sites[0].s.name)}` : `${Math.round(x.routes[0].d)} km from the ${esc(x.routes[0].r.name)} route`}</span></span><small>${esc(x.h.level || x.h.src)}</small></button></li>`).join("")}</ul>` : `<p class="srcs">None of the ${HZ.length} current alerts lies within 500 km of an atlas site or 300 km of a route.</p>`}
      ${LIVE.hazards ? `<p class="srcs" style="margin-top:6px">${HZ.length} live hazards on the globe: ${HZ.filter((h) => h.kind === "EQ").length} earthquakes M5+ from the past week and ${HZ.filter((h) => h.kind !== "EQ").length} GDACS alerts.</p>` : ""}</div>
    ${teamListHtml()}
    <div><h3>Feeds</h3><ul class="feeds">${feeds.map(([n, src, t, staleDays]) => `<li><span>${esc(n)}</span><small class="${isFinite(t) && Date.now() - t > staleDays * 86400000 ? "stale" : ""}">${esc(src)} · ${isFinite(t) ? esc(fmtAgo(Date.now() - t)) : "waiting"}</small></li>`).join("")}</ul>
      <p class="srcs" style="margin-top:8px">A scheduled task refreshes the feeds every 3 hours. Satellite positions and passes are computed live in your browser.</p></div>`;
}

function drawerMaterial(m) {
  const mat = MATERIALS[m];
  const list = SITES.filter((s) => s.m === m);
  pHead.innerHTML = `<div class="kick"><span><i style="background:${cssVar(m)}"></i>${esc(mat.group)}</span><span>${ELEM[m].s} · ${ELEM[m].n}</span></div><h2>${esc(mat.name)}</h2>`;
  specWrap.hidden = false; spec.set("one", m); specCap.innerHTML = specCaption(m);
  pBody.innerHTML = `
    ${statBlock(m)}
    <div id="v11-mat" class="v11-stackcol">${v11MatHtml(m)}</div>
    <p class="note">${esc(mat.uses)}</p>
    <div id="price-slot">${priceBlock(m)}</div>
    ${prodBlock(m)}
    <div><h3>Europe's position</h3><p class="muted">${esc(mat.europe)}</p></div>
    ${miniSlot([m])}
    <div><h3>Sites on the globe</h3>${siteRows(list)}</div>
    <div class="actions">${shareBtn}${starBtn("mat", m)}${commentBtn()}</div>`;
}
function drawerSystem(sys) {
  const ms = sys.parts.map((p) => p.m);
  pHead.innerHTML = `<div class="kick"><span>System</span><span>${ms.length} tracked material${ms.length > 1 ? "s" : ""}</span></div><h2>${esc(sys.name)}</h2><p class="muted">${esc(sys.blurb)}</p>`;
  specWrap.hidden = false; spec.set("one", sys.choke); specCap.innerHTML = specCaption(sys.choke, `Biggest chokepoint: ${MATERIALS[sys.choke].name.toLowerCase()}`);
  const outside = SITES.filter((s) => ms.includes(s.m) && s.country !== "China");
  pBody.innerHTML = `
    <p class="note">${esc(sys.chokeText)}</p>
    <div><h3>What it depends on</h3>${matRows(ms, sys.parts.map((p) => p.role))}${sys.note ? `<p class="srcs" style="margin-top:10px">${esc(sys.note)}</p>` : ""}</div>
    ${miniSlot(ms)}
    <div><h3>Sources outside China</h3>${siteRows(outside)}</div>
    <div class="actions">${shareBtn}</div>`;
}
/* ================= imagery: Sentinel-2 snapshots and terrain published with the page ================= */
let IMG = {};
const vizTabs = $("#viz-tabs"), orbitImg = $("#orbit-img");
let vizMode = "mineral";
fetch("data/imagery.json").then((r) => r.ok ? r.json() : null).then((j) => {
  if (j && j.sites && typeof j.sites === "object") { IMG = j.sites; if (selected) renderDrawer(); }
}).catch(() => {});
function setCompare(v) {
  $("#cmp-then-wrap").style.clipPath = `inset(0 ${100 - v}% 0 0)`;
  $("#cmp-line").style.left = `${v}%`;
}
$("#cmp-range").addEventListener("input", (e) => setCompare(+e.target.value));
let changeOn = true;
$("#cmp-change-btn").addEventListener("click", () => {
  changeOn = !changeOn;
  $("#cmp-change-btn").setAttribute("aria-pressed", String(changeOn));
  $("#cmp-change").hidden = !changeOn;
});
function showViz(mode, s) {
  if (showVizV13(mode, s)) return;
  vizMode = mode;
  vizTabs.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.viz === mode)));
  const im = s && IMG[s.id];
  if (mode === "orbit" && im) {
    specWrap.hidden = true; orbitImg.hidden = false;
    const now = $("#cmp-now"), then = $("#cmp-then");
    now.src = im.now; now.alt = `${s.name} seen by Sentinel-2 on ${fmtDay(im.nowDate)}`;
    const hasThen = !!im.then;
    $("#cmp-then-wrap").hidden = !hasThen; $("#cmp-range").hidden = !hasThen; $("#cmp-line").hidden = !hasThen;
    if (hasThen) { then.src = im.then; then.alt = `${s.name} seen by Sentinel-2 on ${fmtDay(im.thenDate)}`; $("#cmp-range").value = 50; setCompare(50); }
    $("#cmp-tag-then").textContent = hasThen ? fmtDay(im.thenDate) : "";
    $("#cmp-tag-now").textContent = fmtDay(im.nowDate);
    const yrs = [im.thenDate, im.nowDate].filter(Boolean).map((d) => String(d).slice(0, 4));
    const ch = hasThen && im.change && im.change.file ? im.change : null;
    const chImg = $("#cmp-change");
    $("#cmp-tools").hidden = !ch;
    const arid = ch && typeof ch.vegPct === "number" && ch.vegPct < 10;
    if (ch) {
      chImg.src = ch.file;
      chImg.hidden = !changeOn || arid;
      $("#cmp-change-btn").setAttribute("aria-pressed", String(changeOn && !arid));
      $("#cmp-change-btn").disabled = arid;
      $("#cmp-change-label").textContent = arid ? "Bare ground: clearing can't be measured here" : ch.lostHa > 0 ? `Vegetation lost since ${String(ch.from).slice(0, 4)}: about ${ch.lostHa.toLocaleString("en-GB")} ha` : `No clearing detected since ${String(ch.from).slice(0, 4)}`;
    } else chImg.hidden = true;
    const yearsTxt = [...new Set(yrs)].join(T(" and ", " a "));
    const notes = [];
    if (hasThen) notes.push(T("Drag across the image to compare.", "Tažením po snímku porovnáte oba termíny."));
    notes.push(T(`True colour, about ${im.spanKm} km across.`, `Skutečné barvy, asi ${im.spanKm} km napříč.`));
    if (im.note) notes.push(trStr(im.note) + ".");
    if (ch && !arid) notes.push(T(`Pink marks ground where vegetation gave way to bare earth or water between ${fmtDay(ch.from)} and ${fmtDay(ch.to)}, measured from the Sentinel-2 near-infrared and red bands (NDVI). It counts every cause, from digging and building to forestry, fire and drought, and ${ch.validPct}% of the area was clear on both dates.`,
      `Růžově je označena půda, kde vegetaci mezi ${fmtDay(ch.from)} a ${fmtDay(ch.to)} nahradila holá zem nebo voda, změřeno z blízkého infračerveného a červeného pásma Sentinelu-2 (NDVI). Zahrnuje všechny příčiny, od těžby a stavby po lesnictví, požáry a sucho, a v obou termínech bylo bez mraků ${ch.validPct}% plochy.`));
    if (arid) notes.push(T("The ground here was already bare in the older image, so this method cannot measure clearing.", "Půda zde byla holá už na starším snímku, takže tato metoda odkrytí změřit nemůže."));
    notes.push(T(`Contains modified Copernicus Sentinel data ${yearsTxt}.`, `Obsahuje upravená data Copernicus Sentinel ${yearsTxt}.`));
    $("#cmp-note").textContent = notes.join(" ");
    /* v45: how old the last clear view is; when clouds have hidden the site for a month, the radar sees through them */
    let stl = document.getElementById("cmp-stale");
    if (!stl) { stl = document.createElement("p"); stl.id = "cmp-stale"; stl.className = "cmp-stale"; $("#cmp-note").before(stl); }
    const age = im.nowDate ? Math.round((Date.now() - Date.parse(im.nowDate + "T12:00:00Z")) / 864e5) : null;
    const oxr = (OX[s.id] || {}).radar;
    if (age !== null && age > 30) {
      stl.hidden = false;
      stl.innerHTML = `<b>${esc(T("Last clear view: " + fmtDay(im.nowDate) + ".", "Poslední jasný záběr: " + fmtDay(im.nowDate) + "."))}</b> ` +
        esc(T(age + " days ago; clouds have covered the site since.", "Před " + age + " dny; od té doby lokalitu zakrývají mraky.")) +
        (oxr ? ` <button type="button" class="cmp-radar">${esc(T("Radar sees through clouds", "Radar vidí skrz mraky"))} · ${esc(fmtDay(oxr.date))} →</button>` : "");
      const rb = stl.querySelector(".cmp-radar"); if (rb) rb.onclick = () => showViz("radar", s);
    } else if (typeof im.nowClearPct === "number" && im.nowClearPct < 90) {
      stl.hidden = false; stl.textContent = T("Partly cloudy: about " + im.nowClearPct + "% of this view is clear.", "Částečně oblačno: jasných je asi " + im.nowClearPct + " % záběru.");
    } else { stl.hidden = true; stl.textContent = ""; }
  } else if (mode === "terrain" && im && im.terrain) {
    orbitImg.hidden = true; specWrap.hidden = false;
    loadTerrain(s, im);
    specCap.innerHTML = `<div><strong>${esc(s.name)} in 3D</strong></div>
      <span>${T(`Copernicus 30 m elevation draped with the Sentinel-2 image from ${fmtDay(im.nowDate)}, about ${im.spanKm} km across. Height exaggerated ${im.exag || 2}×.`, `Výšky Copernicus 30 m potažené snímkem Sentinelu-2 z ${fmtDay(im.nowDate)}, asi ${im.spanKm} km napříč. Převýšení ${im.exag || 2}×.`)}</span>
      <span class="fine">${T("Elevation from TanDEM-X radar data of 2011 to 2015, older than the image, so recent pits can look shallower · drag to turn", "Výšky z radarových dat TanDEM-X z let 2011 až 2015, starší než snímek, takže nové jámy mohou vypadat mělčí · tažením otočíte")}</span>`;
  } else {
    orbitImg.hidden = true; specWrap.hidden = false;
    spec.set("one", s.m);
    specCap.innerHTML = specCaption(s.m, `The ${MATERIALS[s.m].name.toLowerCase()} ore`);
  }
}
const terrainCache = {};
function loadTerrain(s, im) {
  const apply = (hm) => {
    if (!spec.setTerrain) return;
    spec.setTerrain(hm, im.n, im.now, (im.exag || 2) * 2 / (im.spanKm * 1000));
    spec.set("one", "terrain");
  };
  if (terrainCache[s.id]) { apply(terrainCache[s.id]); return; }
  fetch(im.terrain).then((r) => r.ok ? r.json() : null).then((j) => {
    if (!j || !Array.isArray(j.h) || j.h.length !== im.n * im.n) return;
    const hm = Float32Array.from(j.h, (v) => (+j.base || 0) + v / 10);
    terrainCache[s.id] = hm;
    if (selected === s.id && vizMode === "terrain") apply(hm);
  }).catch(() => {});
}
vizTabs.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-viz]");
  if (b && selected) showViz(b.dataset.viz, SITE_BY_ID[selected]);
});

function drawerSite(s) {
  const mat = MATERIALS[s.m];
  pHead.innerHTML = `
    <button class="back" id="back">← ${sysOf(filter) ? esc(trStr(sysOf(filter).name)) : filter === "all" ? "Atlas" : esc(trStr(mat.name))}</button>
    <div class="kick"><span><i style="background:${cssVar(s.m)}"></i>${esc(mat.name)}</span><span>${esc(s.stage)}</span>${s.approx ? "<span>Approx.</span>" : ""}${ACTIVE[s.id] ? `<span style="color:var(--live)">In the news</span>` : ""}</div>
    <h2>${esc(s.name)}</h2>
    <div class="muted">${esc(trStr(`${s.place}, ${s.country}`))}${s.operator ? ` · ${esc(trStr(s.operator))}` : ""}</div>
    <div class="coord">${fmtCoord(s.lat, s.lng)}</div>`;
  specWrap.hidden = false; spec.set("one", s.m); specCap.innerHTML = specCaption(s.m, `The ${mat.name.toLowerCase()} ore`);
  const im = IMG[s.id];
  vizTabs.hidden = !im;
  vizTabs.querySelector('[data-viz="terrain"]').hidden = !(im && im.terrain);
  if (im) v13Tabs(s);
  if (im) showViz("orbit", s);
  const routes = ROUTES.filter((r) => r.legs.some((l) => l.pts.some((p) => Math.abs(p[0] - s.lat) < 0.6 && Math.abs(p[1] - s.lng) < 0.6)));
  pBody.innerHTML = `
    <p class="note">${esc(s.why)}</p>
    <ul class="facts">${s.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
    <div id="live-site">${liveSiteHtml(s)}</div>
    <div id="v11-site" class="v11-stackcol">${v11SiteHtml(s)}</div>
    ${routes.length ? `<div><h3>Trade routes from here</h3><ul class="list">${routes.map((r) => `<li><button class="row-btn" data-route="${r.id}"><i class="dot" style="background:${cssVar(r.m[0])}"></i><span><span class="rb-name">${esc(r.name)}</span><span class="rb-sub">${esc(r.toLabel)}</span></span><small>route</small></button></li>`).join("")}</ul></div>` : ""}
    <div class="actions">
      <a class="btn small" href="${copernicus(s)}" target="_blank" rel="noopener">View from orbit</a>
      <a class="btn ghost small" href="${gmaps(s)}" target="_blank" rel="noopener">Google satellite</a>
      ${shareBtn}${starBtn("site", s.id)}${commentBtn()}
    </div>
    ${miniSlot([s.m])}
    <div><h3>${esc(T(`${mat.name} in one number`, `${trStr(mat.name)} v jednom čísle`))}</h3>${statBlock(s.m)}</div>
    ${s.src ? srcLinks(s.src.map((x) => ({ t: x.t, u: x.u }))) : ""}`;
  $("#back").addEventListener("click", () => select(null));
}
function drawerRoute(r) {
  pHead.innerHTML = `<div class="kick"><span>Trade route</span>${r.alt ? "<span>Diversion</span>" : ""}</div><h2>${esc(r.name)}</h2><div class="muted">${esc(r.fromLabel)} → ${esc(r.toLabel)}</div>`;
  specWrap.hidden = true;
  const chokes = (r.via || []).map((id) => CHOKE_BY_ID[id]).filter(Boolean);
  pBody.innerHTML = `
    <p class="note">${esc(r.fact)}</p>
    ${routeTonHtml(r)}
    <div><h3>Carries</h3>${matRows(r.m)}</div>
    ${chokes.length ? `<div><h3>Passes through</h3><ul class="list">${chokes.map((c) => `<li><button class="row-btn" data-choke="${c.id}"><i class="dot" style="background:var(--text)"></i><span><span class="rb-name">${esc(c.name)}</span></span><small>chokepoint</small></button></li>`).join("")}</ul></div>` : ""}
    <p class="srcs">Dashed legs travel by road or rail. Sea legs follow typical shipping lanes, not a tracked voyage.</p>
    <div class="actions">${shareBtn}</div>
    ${srcLinks(r.src)}`;
}
function drawerChoke(c) {
  pHead.innerHTML = `<div class="kick"><span>Chokepoint</span></div><h2>${esc(c.name)}</h2><div class="coord">${fmtCoord(c.lat, c.lng)}</div>`;
  specWrap.hidden = true;
  pBody.innerHTML = `
    <p class="note">${esc(c.fact)}</p>
    <div id="v11-choke" class="v11-stackcol">${v11ChokeHtml(c)}</div>
    <div><h3>Routes on the atlas</h3><ul class="list">${c.routes.map((id) => ROUTE_BY_ID[id]).map((r) => `<li><button class="row-btn" data-route="${r.id}"><i class="dot" style="background:${r.m.length > 1 ? "var(--text)" : cssVar(r.m[0])}"></i><span><span class="rb-name">${esc(r.name)}</span><span class="rb-sub">${esc(r.fromLabel)} → ${esc(r.toLabel)}</span></span><small>route</small></button></li>`).join("")}</ul></div>
    <div class="actions">${shareBtn}</div>
    ${srcLinks(c.src)}`;
}
function renderDrawer() {
  let open = true;
  vizTabs.hidden = true; orbitImg.hidden = true;
  showVizV13(null, null);
  if (selected) drawerSite(SITE_BY_ID[selected]);
  else if (selRoute) drawerRoute(ROUTE_BY_ID[selRoute]);
  else if (selChoke) drawerChoke(CHOKE_BY_ID[selChoke]);
  else if (selSat) drawerSat(selSat);
  else if (selHz) drawerHazard(selHz);
  else if (selShip) drawerShip(selShip);
  else if (selLive) drawerLive();
  else if (sysOf(filter)) drawerSystem(sysOf(filter));
  else if (String(filter).startsWith("pair:")) drawerPair(...filter.slice(5).split("+"));
  else if (filter !== "all") drawerMaterial(filter);
  else open = false;
  if (panelEl.hidden === open) { panelEl.hidden = !open; if (globe) globe.relayout(); }
  if (open) {
    panelEl.scrollTop = 0; renderMiniWire();
    if (currentHash()) {
      let act = pBody.querySelector(".actions");
      if (!act) { pBody.insertAdjacentHTML("beforeend", `<div class="actions"></div>`); act = pBody.querySelector(".actions:last-child"); }
      if (act && !act.querySelector("[data-copylink]")) act.insertAdjacentHTML("beforeend", linkBtn);
    }
  }
  syncHash();
}
panelEl.addEventListener("click", (e) => {
  const t = e.target;
  const site = t.closest("[data-site]"); if (site) { select(site.dataset.site, true); return; }
  const mat = t.closest("[data-mat]"); if (mat) { setFilter(mat.dataset.mat, true); return; }
  const route = t.closest("[data-route]"); if (route) { selectRoute(route.dataset.route); return; }
  const choke = t.closest("[data-choke]"); if (choke) { selectChoke(choke.dataset.choke); return; }
  const sat = t.closest("[data-sat]"); if (sat) { selectSat(sat.dataset.sat); return; }
  const hz = t.closest("[data-hz]"); if (hz) { selectHazard(hz.dataset.hz); return; }
  const sh = t.closest("[data-ship]"); if (sh) { selectShip(sh.dataset.ship); return; }
  if (t.closest("[data-copylink]")) { copyLink(); return; }
  const lens = t.closest("[data-lens]");
  if (lens) { lensPick = lens.dataset.lens; try { localStorage.setItem("cma-lens", lensPick); } catch (err) { /* storage blocked */ } const b = document.getElementById("v11-mat"); if (b && MATERIALS[filter]) b.innerHTML = v11MatHtml(filter); return; }
  const op = t.closest("[data-onepager]"); if (op) { downloadOnePager(op.dataset.onepager); return; }
  const st = t.closest("[data-star]"); if (st) { toggleStar(st.dataset.star, st); return; }
  if (t.closest("[data-comment]") && commentsApi) { commentsApi.openComposer({ element: pHead }).catch(() => {}); return; }
  if (t.closest("[data-share]")) shareCurrent();
});
$("#panel-close").addEventListener("click", () => { clearSelection(); setFilter("all", false); });

/* ================= actions ================= */
function enterExplore() {
  if (isExploring()) return;
  document.body.classList.add("exploring");
  onScroll();
  if (globe) { globe.relayout(); globe.applyVisibility(); }
}
function exitExplore() {
  endTour(true);
  clearSelection();
  filter = "all"; paintChips();
  document.body.classList.remove("exploring");
  onScroll();
  if (globe) { globe.applyVisibility(); globe.showSelected(); globe.highlightRoute(null); globe.relayout(); globe.home(); }
  renderDrawer();
}
function clearSelection() { v13Clear(); selected = null; selRoute = null; selChoke = null; selSat = false; selHz = null; selLive = false; selShip = null; if (globe) { globe.showSelected(); globe.highlightRoute(null); } }
function setFilter(m, fly) {
  enterExplore();
  filter = m;
  clearSelection();
  paintChips();
  if (globe) {
    globe.applyVisibility();
    const sy = sysOf(m), cp = sy && PROD[sy.choke] && CENTROID[PROD[sy.choke].rows[0][0]];
    if (fly) { if (m === "all") globe.home(); else if (cp) globe.flyToSite({ lat: cp[0], lng: cp[1] }, 2.05); else globe.flyToMaterials(matsOf(m)); }
    globe.setHazards(hzForGlobe());
  }
  showFocus(m);
  renderDrawer();
}
/* a clear label on the globe: what the camera is showing and why */
function showFocus(m) {
  let el = document.getElementById("oo-focus");
  if (!el) { el = document.createElement("div"); el.id = "oo-focus"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  const sy = sysOf(m);
  if (!m || m === "all" || !isExploring()) { el.hidden = true; return; }
  if (sy) {
    const P = PROD[sy.choke], who = P ? P.rows[0][0] : "";
    el.innerHTML = `<b>${esc(trStr(sy.name))}</b><span>${esc(T("Weakest link", "Nejslabší článek"))}: ${esc(MATERIALS[sy.choke] ? mName(sy.choke) : sy.choke)}${who ? " · " + esc(T(who, trStr(who))) : ""}${P && P.pctOnly ? " " + esc(P.rows[0][1] + " %") : ""}</span><small>${esc(T("The tower shows who makes it; the camera is centred on that country.", "Sloupec ukazuje, kdo ji vyrábí; kamera je nad touto zemí."))}</small>`;
  } else if (MATERIALS[m]) {
    const sites = SITES.filter((s) => [].concat(s.m).includes(m)).length, near = hzForGlobe().length;
    el.innerHTML = `<b>${esc(mName(m))}</b><span>${sites} ${esc(T(sites === 1 ? "site" : "sites", sites === 1 ? "lokalita" : sites < 5 ? "lokality" : "lokalit"))} · ${near} ${esc(T(near === 1 ? "live event nearby" : "live events nearby", csPlural(near, "živá událost poblíž", "živé události poblíž", "živých událostí poblíž")))}</span><small>${esc(T("Showing its sites, trade routes and what is happening around them.", "Zobrazuje lokality, obchodní trasy a co se kolem nich děje."))}</small>`;
  } else { el.hidden = true; return; }
  el.hidden = false;
}
/* with one mineral picked, only the live events near its sites */
function nearFilter(list) {
  if (!MATERIALS[filter]) return list;
  const ss = SITES.filter((s) => [].concat(s.m).includes(filter));
  if (!ss.length) return list;
  return list.filter((h) => ss.some((s) => { const dy = h.lat - s.lat, dx = (h.lng - s.lng) * Math.cos(s.lat * Math.PI / 180); return dx * dx + dy * dy < 81; }));
}
/* v47: picking anything while the guided tour runs ends the tour (silently, keeping the view), because the drawer
   that shows the data is hidden while touring */
function leaveTourForPick() { if (tourIdx >= 0 && !PRESENTING) { endTour(true); if (globe) globe.relayout(); } }
function select(id, fly) {
  leaveTourForPick();
  enterExplore();
  selRoute = null; selChoke = null; selSat = false; selHz = null; selLive = false; selShip = null;
  selected = id;
  if (globe) globe.highlightRoute(null);
  if (id) {
    const s = SITE_BY_ID[id];
    if (!inFilter(s.m)) { filter = s.m; paintChips(); }
    if (globe && fly) globe.flyToSite(s);
  }
  if (globe) { globe.applyVisibility(); globe.showSelected(); }
  renderDrawer();
}
function selectRoute(id) {
  leaveTourForPick();
  enterExplore();
  selected = null; selChoke = null; selSat = false; selHz = null; selLive = false; selShip = null; selRoute = id;
  if (!layers.routes) setLayer("routes", true);
  if (globe) { globe.showSelected(); globe.highlightRoute(id); globe.flyToRoute(id); }
  renderDrawer();
}
function selectSat(id) {
  leaveTourForPick();
  enterExplore();
  selected = null; selRoute = null; selChoke = null; selHz = null; selLive = false; selShip = null; selSat = id || "s2c";
  if (!layers.satellite) setLayer("satellite", true);
  if (globe) { globe.showSelected(); globe.highlightRoute(null); globe.flyToSat(selSat); }
  renderDrawer();
}
function selectHazard(id) {
  leaveTourForPick();
  enterExplore();
  selected = null; selRoute = null; selChoke = null; selSat = false; selLive = false; selShip = null; selHz = id;
  const h = HZ_BY_ID[id];
  if (!layers.hazards) setLayer("hazards", true);
  if (globe) { globe.showSelected(); globe.highlightRoute(null); if (h) globe.flyToPoint(h.lat, h.lng, 2.1); }
  renderDrawer();
}
function selectLive() {
  enterExplore();
  selected = null; selRoute = null; selChoke = null; selSat = false; selHz = null; selShip = null; selLive = true;
  if (globe) { globe.showSelected(); globe.highlightRoute(null); }
  renderDrawer();
}
function selectChoke(id) {
  leaveTourForPick();
  enterExplore();
  selected = null; selRoute = null; selSat = false; selHz = null; selLive = false; selShip = null; selChoke = id;
  const c = CHOKE_BY_ID[id];
  if (globe) { globe.showSelected(); globe.highlightRoute(c.routes[0], c.routes[1]); globe.flyToChoke(c); }
  renderDrawer();
}
function setLayer(k, on) {
  layers[k] = on;
  if (k === "conflict" && globe) globe.setHazards(hzForGlobe());
  document.querySelectorAll(`[data-layer="${k}"]`).forEach((b) => b.setAttribute("aria-pressed", String(on)));
  if (globe) globe.applyVisibility();
}
document.querySelectorAll("[data-layer]").forEach((b) => b.addEventListener("click", () => setLayer(b.dataset.layer, !layers[b.dataset.layer])));
const layersBtn = $("#layers-btn"), layersPop = $("#layers-pop");
layersBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  layersPop.hidden = !layersPop.hidden;
  layersBtn.setAttribute("aria-expanded", String(!layersPop.hidden));
});
document.addEventListener("click", (e) => {
  if (!layersPop.hidden && !e.target.closest(".layers-wrap")) { layersPop.hidden = true; layersBtn.setAttribute("aria-expanded", "false"); }
});
$("#exit-explore").addEventListener("click", exitExplore);
$("#cta-explore").addEventListener("click", () => { enterExplore(); renderDrawer(); });
document.querySelector('.nav-links a[data-explore]').addEventListener("click", () => { enterExplore(); });

/* nav turns solid once the page scrolls */
const navEl = $("#nav");
const onScroll = () => navEl.classList.toggle("solid", window.scrollY > 40 || isExploring());
window.addEventListener("scroll", onScroll, { passive: true });

/* ================= guided tour ================= */
const tourEl = $("#tour-card");
function showTourStep(i) {
  tourIdx = Math.max(0, Math.min(TOUR.length - 1, i));
  const st = TOUR[tourIdx];
  $("#tour-step").textContent = `${String(tourIdx + 1).padStart(2, "0")} / ${String(TOUR.length).padStart(2, "0")}`;
  $("#tour-title").textContent = st.title;
  $("#tour-text").textContent = st.text;
  $("#tour-src").textContent = `Source: ${st.src}`;
  $("#tour-bar").style.width = `${((tourIdx + 1) / TOUR.length) * 100}%`;
  $("#tour-prev").disabled = tourIdx === 0;
  $("#tour-next").textContent = tourIdx === TOUR.length - 1 ? "Explore on your own" : "Next";
  selected = st.site || null; selRoute = null; selChoke = null;
  filter = "all"; paintChips();
  if (globe) {
    globe.applyVisibility();
    globe.showSelected();
    globe.highlightRoute(st.route || null, st.also || null);
    globe.flyTo(st.cam[0], st.cam[1], st.cam[2], 1800);
  }
}
function startTour() {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  enterExplore();
  document.body.classList.add("touring");
  tourEl.hidden = false;
  panelEl.hidden = true;
  if (globe) globe.relayout();
  showTourStep(0);
  $("#tour-next").focus();
}
function endTour(silent) {
  if (tourIdx < 0) return;
  tourIdx = -1;
  tourEl.hidden = true;
  document.body.classList.remove("touring");
  if (!silent) { clearSelection(); filter = "all"; paintChips(); if (globe) { globe.applyVisibility(); globe.relayout(); } renderDrawer(); }
}
$("#cta-tour").addEventListener("click", startTour);
$("#nav-tour").addEventListener("click", startTour);
$("#tour-prev").addEventListener("click", () => showTourStep(tourIdx - 1));
$("#tour-next").addEventListener("click", () => { if (tourIdx >= TOUR.length - 1) endTour(false); else showTourStep(tourIdx + 1); });
$("#tour-exit").addEventListener("click", () => endTour(false));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!searchEl.hidden) { closeSearch(); return; }
    if (!askEl.hidden) { closeAsk(); return; }
    if (!$("#link-modal").hidden) { $("#link-modal").hidden = true; return; }
    if (!layersPop.hidden) { layersPop.hidden = true; layersBtn.setAttribute("aria-expanded", "false"); return; }
    if (!$("#share-modal").hidden) { $("#share-modal").hidden = true; return; }
    if (tourIdx >= 0) { endTour(false); return; }
    if (!panelEl.hidden) { clearSelection(); setFilter("all", false); }
  }
});

/* ================= stats band ================= */
$("#stats").innerHTML = STATS.map((s) => `
  <button class="stat" data-m="${s.m}" style="--c:${cssVar(s.m)}"><b>${esc(s.num)}</b><span>${esc(s.what)}</span><small>${esc(s.src)}</small></button>`).join("");
$("#stats").addEventListener("click", (e) => {
  const b = e.target.closest(".stat");
  if (!b) return;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  setFilter(b.dataset.m, true);
});

/* ================= scenarios ================= */
let scnSel = SCENARIOS[0].id;
const scnList = $("#scn-list"), scnOut = $("#scn-out");
scnList.innerHTML = SCENARIOS.map((sc) => `
  <li><button class="scn-btn" role="tab" data-scn="${sc.id}" aria-selected="false" style="--c:${cssVar(sc.m)}">
    <span class="sym">${ELEM[sc.m].s}</span><span class="scn-t">${esc(sc.title)}</span><small>${sc.stage && STAGES[sc.m][sc.stage] ? esc(pctTxt(STAGES[sc.m][sc.stage])) : "—"}</small>
  </button></li>`).join("");
scnList.addEventListener("click", (e) => { const b = e.target.closest(".scn-btn"); if (b) { scnSel = b.dataset.scn; renderScenario(); } });
function scnPhrase(sc, st) {
  if (sc.stage === "mine") return `of world mine output is in ${sc.who}.`;
  if (sc.stage === "part") return `of the world's ${st.what.toLowerCase()} are made in ${sc.who}.`;
  return `of the world's ${st.what.toLowerCase()} is made in ${sc.who}.`;
}
function renderScenarioV11() {
  const sc = SCENARIOS.find((x) => x.id === scnSel);
  scnList.querySelectorAll(".scn-btn").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.scn === sc.id)));
  const st = sc.stage ? STAGES[sc.m][sc.stage] : null;
  const systems = Object.entries(SYSTEMS).filter(([, s]) => s.parts.some((p) => p.m === sc.m));
  const outside = SITES.filter((s) => s.m === sc.m && s.country !== sc.who);
  const routes = ROUTES.filter((r) => r.m.includes(sc.m) && r.from === sc.who);
  const watch = WATCH.filter((w) => Array.isArray(w.materials) && w.materials.includes(sc.m) && (daysUntil(w.date) === null || daysUntil(w.date) >= 0)).slice(0, 2);
  scnOut.style.setProperty("--c", cssVar(sc.m));
  scnOut.innerHTML = `
    <div class="scn-top">
      <b>${st ? esc(pctTxt(st)) : "?"}</b>
      <p>${st ? `${esc(scnPhrase(sc, st))}<br><small class="mono" style="font-size:11px;color:var(--faint)">${esc(st.note)}</small>` : "China is the leading producer, but no public world total exists."}</p>
    </div>
    <p class="scn-prec">${esc(sc.prec)}</p>
    <div class="scn-grid">
      <div class="scn-col">
        <h3>Systems that lose it</h3>
        ${systems.length ? systems.map(([, s]) => `<div class="scn-item"><b>${esc(s.name)}</b><span>${esc(s.parts.find((p) => p.m === sc.m).role)}</span></div>`).join("") : `<div class="scn-item"><span>No tracked system on the atlas.</span></div>`}
      </div>
      <div class="scn-col">
        <h3>Sources outside ${esc(sc.who)} on the atlas</h3>
        ${outside.length ? outside.map((s) => `<div class="scn-item"><b>${esc(s.name)}</b><span>${esc(s.country)} · ${esc(s.stage.toLowerCase())}</span>${ONLINE[s.id] ? `<span class="tl">Planned output: ${esc(ONLINE[s.id])}</span>` : s.stage === "Planned" ? `<span class="tl">Planned, no firm date</span>` : ""}</div>`).join("") : `<div class="scn-item"><span>None on the atlas yet.</span></div>`}
      </div>
    </div>
    ${routes.length || watch.length ? `<div class="scn-grid">
      ${routes.length ? `<div class="scn-col"><h3>Trade routes affected</h3>${routes.map((r) => `<div class="scn-item"><b>${esc(r.name)}</b><span>${esc(r.fromLabel)} → ${esc(r.toLabel)}</span></div>`).join("")}</div>` : "<div></div>"}
      ${watch.length ? `<div class="scn-col"><h3>Dates to watch</h3>${watch.map((w) => `<div class="scn-item"><b>${esc(w.when || fmtDay(w.date))}</b><span>${esc(w.title)}</span></div>`).join("")}</div>` : ""}
    </div>` : ""}
    <div class="actions"><button class="btn" data-scn-globe="1">See it on the globe</button><button class="btn ghost" data-share="scn">Share card</button></div>`;
}
scnOut.addEventListener("click", (e) => {
  if (e.target.closest("[data-scn-globe]")) {
    const sc = SCENARIOS.find((x) => x.id === scnSel);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    if (ST.stop) setFilter(sc.m, true); else { setFilter("all", false); }
    if (ST.redSea && globe) { globe.setRedSea(true); globe.highlightRoute("cn-eu-cape", "cn-eu"); if (!ST.stop) globe.flyToRoute("cn-eu-cape"); }
  } else if (e.target.closest("[data-share]")) shareScenario();
});
scnList.addEventListener("click", (e) => { if (e.target.closest(".scn-btn")) ST.stop = true; }, true);

/* ================= chokepoints table ================= */
function cpCell(x, fallback) {
  if (!x) return `<span class="cp-cell"><span class="cp-none">${esc(trStr(fallback || "No public figure"))}</span></span>`;
  const over = x.pct > 65;
  return `<span class="cp-cell">
    <span class="cp-bar"><span class="fill" style="width:${x.pct}%;background:var(--cpc);opacity:${over ? 1 : 0.4}"></span><span class="cap"></span></span>
    <span class="cp-val"><b>${esc(pctTxt(x))}</b>${esc(ctry(x.who))}${x.what ? ` · ${esc(trStr(x.what))}` : ""} · ${esc(trStr(x.note))}${over ? `<span class="over-tag">${T("over 65%", "nad 65 %")}</span>` : ""}</span>
  </span>`;
}
function renderChokepointsV11() {
  const rows = ORDER.slice().sort((a, b) => ((topStage(b) || { pct: -1 }).pct) - ((topStage(a) || { pct: -1 }).pct));
  const overCount = ORDER.filter((m) => { const t = topStage(m); return t && t.pct > 65; }).length;
  $("#cp-summary").textContent = `${T(`${overCount} of ${ORDER.length} have a stage where one country makes more than 65% of world output. Bars show the top country's share at each stage; the vertical line marks 65%. Sources: USGS Mineral Commodity Summaries 2026, USGS SIR 2025-5021, IEA Global Critical Minerals Outlook 2026.`, `${overCount} ${zeZ(ORDER.length)} ${ORDER.length} mají fázi, v níž jedna země vyrábí víc než 65 % světové produkce. Pruhy ukazují podíl největší země v každé fázi, svislá čára značí 65 %. Zdroje: USGS Mineral Commodity Summaries 2026, USGS SIR 2025-5021, IEA Global Critical Minerals Outlook 2026.`)}${T(" EU imports: Eurostat Comext, value of imports from outside the EU of the product named, latest full year.", " Dovoz do EU: Eurostat Comext, hodnota dovozu ze zemí mimo EU u uvedeného produktu za poslední celý rok.")}`;
  $("#cp-table").innerHTML = `
    <div class="cp-headrow has-eu" aria-hidden="true"><span>${T("Material", "Surovina")}</span><span>${T("Mining", "Těžba")}</span><span>${T("Refining and processing", "Rafinace a zpracování")}</span><span>${T("EU imports: largest supplier", "Dovoz do EU: největší dodavatel")}</span></div>
    ${rows.map((m) => {
      const s = STAGES[m];
      return `<button class="cp-row has-eu" data-m="${m}" style="--cpc:${cssVar(m)}">
        <span class="cp-name"><span><i class="dot" style="background:${cssVar(m)}"></i>${esc(MATERIALS[m].name)}</span><small>${trStr(STRATEGIC[m] ? "EU strategic" : "EU critical")}</small></span>
        ${cpCell(s.mine, s.mineNote)}
        <span class="cp-cell-wrap">${cpCell(s.refine, s.refineNote)}${s.part ? `<span class="cp-sub">${trStr("Magnets")}</span>${cpCell(s.part)}` : ""}</span>
        ${cpTradeCell(m)}
      </button>`;
    }).join("")}`;
}
$("#cp-table").addEventListener("click", (e) => {
  const r = e.target.closest(".cp-row");
  if (!r) return;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  setFilter(r.dataset.m, true);
});

/* ================= briefing and wire ================= */
const watchEl = $("#watch-list"), newsEl = $("#news-list"), statusEl = $("#wire-status"), liveDot = $("#live-dot");
const newsAllBtn = $("#news-all"), topDot = $("#top-dot"), topStatus = $("#top-status");
newsAllBtn.addEventListener("click", () => { newsAll = !newsAll; renderWire(); });
function mtags(list) {
  return (Array.isArray(list) ? list : []).filter((m) => MATERIALS[m])
    .map((m) => `<button class="mtag" data-m="${m}"><i style="background:${cssVar(m)}"></i>${esc(MATERIALS[m].name)}</button>`).join("");
}
document.addEventListener("click", (e) => {
  const t = e.target.closest(".mtag");
  if (!t) return;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  setFilter(t.dataset.m, true);
});
function daysUntil(iso) {
  const t = parseDay(iso);
  if (isNaN(t)) return null;
  const now = new Date();
  return Math.round((t - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000);
}
// "today", "tomorrow", "in 3 days" / "dnes", "zítra", "za 3 dny" for a whole number of days
const inDays = (n) => (n = n === null || n === undefined || n === "" ? NaN : Number(n), isNaN(n) ? "" : n < 0 ? T("passed", "uplynulo") : n === 0 ? T("today", "dnes") : n === 1 ? T("tomorrow", "zítra") : T("in " + n + " days", "za " + n + " " + csPlural(n, "den", "dny", "dní")));
const touches = (n, ms) => Array.isArray(n.materials) && n.materials.some((x) => ms.includes(x));

function computeActivity() {
  const map = {};
  const now = new Date(), today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  NEWS.forEach((n) => {
    const t = parseDay(n.date);
    if (isNaN(t) || (today - t) / 86400000 > 14) return;
    const ids = new Set(Array.isArray(n.sites) ? n.sites.filter((x) => SITE_BY_ID[x]) : []);
    const text = `${n.title || ""} ${n.summary || ""}`;
    Object.entries(ALIASES).forEach(([id, names]) => { if (names.some((a) => text.includes(a))) ids.add(id); });
    ids.forEach((id) => { if (!map[id] || parseDay(map[id].date) < t) map[id] = n; });
  });
  ACTIVE = map;
}
function renderWire() {
  if (wireState === "off") {
    statusEl.textContent = "";
    topStatus.textContent = "News loads when signed in";
    watchEl.innerHTML = `<li class="empty" style="display:block">Deadlines and stories load for viewers signed in to the AI agent.</li>`;
    newsEl.innerHTML = ""; newsAllBtn.hidden = true;
    renderMiniWire(); return;
  }
  if (wireState === "loading") {
    watchEl.innerHTML = `<li class="empty" style="display:block">Loading…</li>`;
    newsEl.innerHTML = "";
    return;
  }
  const lr = META && META.lastRun ? fmtDay(META.lastRun) : null;
  if (wireState === "error") { topStatus.textContent = "News unavailable"; statusEl.textContent = "Could not load"; }
  else {
    liveDot.classList.add("on"); topDot.classList.add("on");
    statusEl.textContent = lr ? `Updated ${lr}` : "Live";
    topStatus.textContent = `Updated daily${lr ? ` · ${lr}` : ""}`;
  }
  const watch = WATCH.slice().sort((a, b) => (parseDay(a.date) || 0) - (parseDay(b.date) || 0))
    .filter((w) => { const d = daysUntil(w.date); return d === null || d >= -3; }).slice(0, 5);
  watchEl.innerHTML = watch.length ? watch.map((w) => {
    const d = daysUntil(w.date);
    const cd = d === null ? "" : d > 1 ? `in ${d} days` : d === 1 ? "tomorrow" : d === 0 ? "today" : "passed";
    const t = parseDay(w.date), dt = isNaN(t) ? null : new Date(t);
    const big = typeof w.when === "string" && w.when ? esc(w.when) : (dt ? `${dt.getUTCDate()} ${MONTHS[dt.getUTCMonth()]}` : "");
    const url = safeUrl(w.url);
    return `<li>
      <div class="d"><b>${big}</b>${dt && !w.when ? `<span>${dt.getUTCFullYear()}</span>` : ""}${cd ? `<span class="cd">${cd}</span>` : ""}</div>
      <div><div class="t">${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(w.title)}</a>` : esc(w.title)}</div>${w.detail ? `<p>${esc(w.detail)}</p>` : ""}</div>
    </li>`;
  }).join("") : `<li class="empty" style="display:block">No upcoming deadlines yet.</li>`;
  const shown = newsAll ? NEWS : NEWS.slice(0, 5);
  newsAllBtn.hidden = NEWS.length <= 5;
  newsAllBtn.textContent = newsAll ? "Show fewer" : `Show all ${NEWS.length} stories`;
  newsEl.innerHTML = shown.length ? shown.map((n) => {
    const url = safeUrl(n.url);
    const lang = typeof n.lang === "string" && /^[a-z]{2}$/.test(n.lang) ? ` lang="${n.lang}"` : "";
    return `<li>
      <span class="n-meta">${esc(fmtDay(n.date))} · ${esc(n.source || "")}</span>
      ${url ? `<a class="n-title" href="${esc(url)}" target="_blank" rel="noopener"${lang}>${esc(n.title)}</a>` : `<span class="n-title"${lang}>${esc(n.title)}</span>`}
      ${n.summary ? `<p>${esc(n.summary)}</p>` : ""}
      <div class="foot-line">${mtags(n.materials)}${n.auto ? `<span class="n-check n-auto">${esc(T("Found automatically, not yet verified", "Nalezeno automaticky, zatím neověřeno"))}</span>` : n.addedAt ? `<span class="n-check">Verified against ${esc(n.source || "the source")} on ${esc(fmtDay(n.addedAt))}</span>` : ""}</div>
    </li>`;
  }).join("") : `<li class="empty" style="display:block">No stories yet. The daily update adds new ones each morning.</li>`;
  renderMiniWire();
}
function renderMiniWire() {
  const el = document.getElementById("mini-wire");
  if (!el) return;
  const ms = String(el.dataset.m || "").split(",");
  if (wireState !== "ready") { el.innerHTML = ""; return; }
  const items = NEWS.filter((n) => touches(n, ms)).slice(0, 3);
  el.innerHTML = items.length ? `<h3>In the news</h3>` + items.map((n) => {
    const url = safeUrl(n.url);
    return `<div class="mini-item">${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(n.title)}</a>` : esc(n.title)}<span class="meta">${esc(fmtDay(n.date))} · ${esc(n.source || "")}</span></div>`;
  }).join("") : "";
}

const briefBody = $("#brief-body"), briefH = $("#brief-h"), briefEyebrow = $("#brief-eyebrow");
const briefPickWrap = $("#brief-pick-wrap"), briefPickEl = $("#brief-pick"), briefSo = $("#brief-so");
briefPickEl.addEventListener("change", () => { briefPick = briefPickEl.value; renderBrief(); });
function renderBrief() {
  if (wireState === "off") { briefH.textContent = "The brief loads for viewers signed in to the AI agent."; briefBody.innerHTML = ""; briefSo.innerHTML = ""; return; }
  if (wireState === "loading") return;
  if (!BRIEFS.length) { briefH.textContent = "No brief yet"; briefBody.innerHTML = `<p class="empty">A new brief is written every Monday morning from the week's stories.</p>`; briefSo.innerHTML = ""; return; }
  const b = BRIEFS.find((x) => x.id === briefPick) || BRIEFS[0];
  briefPickWrap.hidden = BRIEFS.length < 2;
  briefPickEl.innerHTML = BRIEFS.map((x) => `<option value="${esc(x.id)}"${x === b ? " selected" : ""}>Week of ${esc(fmtDay(x.week || x.id))}</option>`).join("");
  briefEyebrow.textContent = `Monday brief · week of ${fmtDay(b.week || b.id)}`;
  briefH.textContent = b.title || "Monday brief";
  const points = Array.isArray(b.points) ? b.points : [];
  briefBody.innerHTML = `
    ${b.lede ? `<p class="brief-lede">${esc(b.lede)}</p>` : ""}
    <ul class="brief-points" style="margin-top:22px">${points.map((p) => {
      const url = safeUrl(p.url);
      const txt = String(p.text || "");
      const ix = txt.indexOf(":");
      const body = ix > 0 && ix < 24 ? `<b>${esc(txt.slice(0, ix + 1))}</b>${esc(txt.slice(ix + 1))}` : esc(txt);
      return `<li>${body}<div class="foot-line">${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(p.source || "Source")}</a>` : `<span>${esc(p.source || "")}</span>`}${mtags(p.materials)}</div></li>`;
    }).join("")}</ul>
    <p class="foot-line" style="margin-top:14px">${b.auto
      ? esc(T(`Put together automatically on ${fmtDay(b.writtenAt || b.week)} from the atlas's own data and the week's headlines. No person or AI wrote or checked it; open the linked sources before quoting.`, `Sestaveno automaticky ${fmtDay(b.writtenAt || b.week)} z dat atlasu a titulků týdne. Nikdo, člověk ani AI, ho nepsal ani nekontroloval; před citací otevřete odkazované zdroje.`))
      : b.reviewedBy
      ? esc(T(`Reviewed by ${b.reviewedBy}${b.reviewedAt ? ` on ${fmtDay(b.reviewedAt)}` : ""}. Drafted by a scheduled AI agent task from stories it read and checked against their sources.`, `Zkontroloval(a) ${b.reviewedBy}${b.reviewedAt ? ` dne ${fmtDay(b.reviewedAt)}` : ""}. Koncept napsala naplánovaná úloha AI agenta ze zpráv, které přečetla a ověřila proti zdrojům.`))
      : `Written by a scheduled AI agent task${b.writtenAt ? ` on ${esc(fmtDay(b.writtenAt))}` : ""} from stories it read and checked against their sources. Not reviewed by a person. Check the linked sources before quoting.`}</p>`;
  briefSo.innerHTML = b.soWhat ? `<div class="so"><div class="label">What it means for Europe</div><p>${esc(b.soWhat)}</p></div>` : "";
}

async function connectWire() {
  let db = null;
  try { db = (window.claude && typeof window.claude.use === "function") ? await window.claude.use("db") : null; } catch (e) { db = null; }
  if (!db) { wireState = "off"; renderWire(); renderBrief(); return; }
  const csify = (o) => {
    if (LANG !== "cs" || !o || typeof o !== "object") return o;
    Object.keys(o).forEach((k) => { if (k.endsWith("_cs") && o[k] && typeof o[k] === typeof o[k.slice(0, -3)]) o[k.slice(0, -3)] = o[k]; });
    if (Array.isArray(o.points)) o.points.forEach(csify);
    return o;
  };
  const clean = (d) => csify(Object.assign({ id: d.id }, d.data() || {}));
  const fail = () => { if (wireState !== "ready") { wireState = "error"; renderWire(); } };
  try {
    db.collection("news").orderBy("date", "desc").limit(80).onSnapshot((snap) => {
      NEWS = snap.docs.map(clean).filter((n) => typeof n.title === "string" && n.title);
      wireState = "ready";
      computeActivity();
      renderWire(); renderBrief(); renderScenario();
      if (!panelEl.hidden) renderDrawer();
      if (globe) globe.applyVisibility();
    }, fail);
    db.collection("briefs").orderBy("week", "desc").limit(26).onSnapshot((snap) => {
      BRIEFS = snap.docs.map(clean).filter((b) => typeof b.title === "string" && b.title);
      if (wireState === "ready") renderBrief();
    }, () => {});
    db.collection("watch").orderBy("date", "asc").limit(40).onSnapshot((snap) => {
      WATCH = snap.docs.map(clean).filter((w) => typeof w.title === "string" && w.title);
      if (wireState === "ready") { renderWire(); renderScenario(); }
    }, () => {});
    db.doc("meta/status").onSnapshot((d) => { META = d.exists ? d.data() : null; if (wireState === "ready") renderWire(); }, () => {});
    connectTeam(db);
    v14Connect(db);
    const sub = (k) => db.doc("live/" + k).onSnapshot((d) => { LIVE[k] = d.exists ? d.data() : null; onLive(k); }, () => {});
    ["orbits", "hazards", "conditions", "scenes", "prices", "ships", "traffic", "conflict", "tenders", "trade", "clouds", "hotspots", "so2", "cnexports", "history", "runstatus"].forEach(sub);
    /* v48: the four detailed cloud tiles (about 0.5 MB) wait: a few idle seconds on a computer, and on a phone until the
       visitor opens the interactive atlas. Until then the globe shows the base cloud map (clouds.json). */
    if (!LITE) {
      let hiDone = false;
      const loadHiClouds = () => { if (hiDone) return; hiDone = true; ["cloudshi0", "cloudshi1", "cloudshi2", "cloudshi3"].forEach(sub); };
      if (!SMALL) setTimeout(() => (window.requestIdleCallback || ((f) => f()))(loadHiClouds, { timeout: 3000 }), 4000);
      if (isExploring()) loadHiClouds();
      else {
        const mo = new MutationObserver(() => { if (isExploring()) { mo.disconnect(); loadHiClouds(); } });   // watches body's class, never writes it
        mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
      }
    }
  } catch (e) { fail(); }
}

/* ================= share cards ================= */
const toastEl = $("#toast");
function toast(msg) { toastEl.textContent = msg; toastEl.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => { toastEl.hidden = true; }, 2600); }
function wrapText(ctx, text, x, y, maxW, lh, maxLines) {
  const words = String(text).split(/\s+/); let line = "", lines = 0;
  for (let i = 0; i < words.length; i++) {
    const test = line ? line + " " + words[i] : words[i];
    if (ctx.measureText(test).width > maxW && line) {
      if (lines === maxLines - 1) { ctx.fillText(line + "…", x, y); return y + lh; }
      ctx.fillText(line, x, y); line = words[i]; y += lh; lines++;
    } else line = test;
  }
  if (line) { ctx.fillText(line, x, y); y += lh; }
  return y;
}
function buildCard(o) {
  const c = document.createElement("canvas");
  c.width = 1200; c.height = 630;
  const ctx = c.getContext("2d");
  const F = '"Hanken Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif';
  const M = '"DM Mono", ui-monospace, Menlo, monospace';
  ctx.fillStyle = "#050607"; ctx.fillRect(0, 0, 1200, 630);
  const g = globe ? globe.snapshot() : null;
  if (g && g.width > 10) {
    const s = Math.min(g.width, g.height), sx = (g.width - s) / 2, sy = (g.height - s) / 2;
    ctx.drawImage(g, sx, sy, s, s, 560, -15, 660, 660);
    const grad = ctx.createLinearGradient(520, 0, 860, 0);
    grad.addColorStop(0, "rgba(5,6,7,1)"); grad.addColorStop(1, "rgba(5,6,7,0)");
    ctx.fillStyle = grad; ctx.fillRect(520, 0, 340, 630);
  }
  ctx.fillStyle = "#f3f4f4";
  ctx.beginPath(); ctx.arc(76, 72, 9, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#f3f4f4"; ctx.lineWidth = 2;
  ctx.save(); ctx.translate(76, 72); ctx.rotate(-0.49); ctx.beginPath(); ctx.ellipse(0, 0, 22, 8, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  ctx.font = `700 17px ${F}`; ctx.fillText("OREORBIT · CRITICAL MINERALS FROM ORBIT", 112, 78);
  ctx.fillStyle = o.color || "#a3a9ad"; ctx.font = `700 16px ${F}`;
  ctx.fillText(String(o.kicker || "").toUpperCase(), 64, 168);
  ctx.fillStyle = "#f3f4f4"; ctx.font = `500 54px ${F}`;
  let y = wrapText(ctx, o.title, 64, 230, 560, 60, 2);
  if (o.big) {
    ctx.fillStyle = o.color || "#f3f4f4"; ctx.font = `300 132px ${F}`;
    ctx.fillText(o.big, 58, y + 110); y += 140;
  }
  ctx.fillStyle = "#c9cdd0"; ctx.font = `400 24px ${F}`;
  wrapText(ctx, o.text, 64, y + 20, 540, 32, o.big ? 3 : 6);
  ctx.fillStyle = "#697075"; ctx.font = `400 15px ${M}`;
  ctx.fillText(String(o.src || "").slice(0, 70), 64, 582);
  ctx.textAlign = "right"; ctx.fillText(`Bohemia Defense · ${fmtDay(new Date().toISOString().slice(0, 10))}`, 1136, 582); ctx.textAlign = "left";
  return c;
}
function cardForCurrent() {
  if (selected) {
    const s = SITE_BY_ID[selected], st = MATERIALS[s.m].stats[0];
    return { kicker: `${MATERIALS[s.m].name} · ${s.stage}`, title: `${s.name}, ${s.country}`, big: st.num, text: st.what, src: st.src, color: PIN[s.m], name: s.id };
  }
  if (selRoute) { const r = ROUTE_BY_ID[selRoute]; return { kicker: "Trade route", title: r.name, text: r.fact, src: r.src.map((x) => x.t).join(", "), color: r.m.length > 1 ? "#f3f4f4" : PIN[r.m[0]], name: r.id }; }
  if (selChoke) { const c = CHOKE_BY_ID[selChoke]; return { kicker: "Chokepoint", title: c.name, text: c.fact, src: c.src.map((x) => x.t).join(", "), name: c.id }; }
  if (sysOf(filter)) {
    const sys = sysOf(filter), t = topStage(sys.choke);
    return { kicker: "What it depends on", title: sys.name, big: t ? pctTxt(t) : "", text: sys.chokeText, src: "USGS, IEA", color: PIN[sys.choke], name: filter.slice(4) };
  }
  if (filter !== "all") { const st = MATERIALS[filter].stats[0]; return { kicker: MATERIALS[filter].group, title: MATERIALS[filter].name, big: st.num, text: st.what, src: st.src, color: PIN[filter], name: filter }; }
  return { kicker: "Supply-chain atlas", title: "Europe's defence runs on twelve minerals.", text: "Ten of the twelve have a supply stage where one country makes more than 65% of world output.", src: "USGS, IEA", name: "atlas" };
}
let lastCard = null;
async function openShare(o) {
  if (LANG === "cs" && o && typeof o === "object") o = Object.fromEntries(Object.entries(o).map(([k, v]) => [k, typeof v === "string" ? trStr(v) : Array.isArray(v) ? v.map((x) => typeof x === "string" ? trStr(x) : x) : v]));
  const canvas = buildCard(o);
  lastCard = { canvas, filename: `oreorbit-${o.name || "card"}.png` };
  const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
  lastCard.blob = blob;
  const img = $("#share-img");
  if (img.dataset.url) URL.revokeObjectURL(img.dataset.url);
  img.dataset.url = URL.createObjectURL(blob);
  img.src = img.dataset.url;
  $("#share-note").textContent = "1200 × 630, sized for LinkedIn and slides.";
  $("#share-modal").hidden = false;
  $("#share-save").focus();
}
function shareCurrent() { openShare(cardForCurrent()); }
function shareScenario() {
  const sc = SCENARIOS.find((x) => x.id === scnSel), st = sc.stage ? STAGES[sc.m][sc.stage] : null;
  const systems = Object.values(SYSTEMS).filter((s) => s.parts.some((p) => p.m === sc.m)).map((s) => s.name);
  openShare({ kicker: "What if", title: sc.title, big: st ? pctTxt(st) : "", text: st ? `of world supply at that stage is in ${sc.who}.${systems.length ? " Hits: " + systems.join(", ") + "." : ""}` : sc.prec, src: st ? st.note : "USGS", color: PIN[sc.m], name: "what-if-" + sc.id });
}
$("#share-close").addEventListener("click", () => { $("#share-modal").hidden = true; });
$("#share-modal").addEventListener("click", (e) => { if (e.target.id === "share-modal") $("#share-modal").hidden = true; });
$("#share-save").addEventListener("click", async () => {
  if (!lastCard || !lastCard.blob) return;
  let dl = null;
  try { dl = (window.claude && typeof window.claude.use === "function") ? await window.claude.use("downloads") : null; } catch (e) { dl = null; }
  if (!dl) { $("#share-note").textContent = "Saving files isn't available in this view. Right-click or long-press the image to save it, or take a screenshot."; return; }
  try { await dl.save({ filename: lastCard.filename, data: lastCard.blob }); $("#share-modal").hidden = true; toast("Card saved"); }
  catch (err) {
    const code = err && err.code;
    if (code === "declined") return;
    if (code === "rate_limited") { $("#share-note").textContent = "A save prompt is already open. Try again in a moment."; return; }
    $("#share-note").textContent = "Saving isn't available here. Right-click or long-press the image to save it.";
  }
});


/* ================= prices (FRED/IMF monthly; MetalCharts daily when a key is set) ================= */
function fmtMoney(v, unit) {
  if (typeof v !== "number") return "";
  const n = v >= 1000 ? Math.round(v).toLocaleString("en-GB") : v.toLocaleString("en-GB", { maximumFractionDigits: 2 });
  return `$${n}${unit ? ` <small>${esc(String(unit).replace(/^USD\/?/, "per ").replace(/^per $/, ""))}</small>` : ""}`;
}
function sparkSvg(series, color) {
  const vals = series.map((p) => +p[1]).filter((v) => isFinite(v));
  if (vals.length < 3) return "";
  const w = 300, h = 64, pad = 4, mn = Math.min(...vals), mx = Math.max(...vals), span = mx - mn || 1;
  const pts = vals.map((v, i) => `${(pad + i * (w - 2 * pad) / (vals.length - 1)).toFixed(1)},${(h - pad - (v - mn) / span * (h - 2 * pad)).toFixed(1)}`).join(" ");
  const last = pts.split(" ").pop().split(",");
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="${esc(T(`Price over the last ${vals.length} months`, `Cena za ${csPlural(vals.length, "poslední", "poslední", "posledních")} ${vals.length} ${csPlural(vals.length, "měsíc", "měsíce", "měsíců")}`))}">
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.8" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
    <circle cx="${last[0]}" cy="${last[1]}" r="3" fill="${color}"/></svg>`;
}
function priceBlock(m) {
  const P = LIVE.prices && LIVE.prices.items;
  if (!P) return "";
  const rows = [P[m + "_spot"], P[m]].filter((x) => x && typeof x.price === "number");
  if (!rows.length) return "";
  return `<div class="price"><h3>Price</h3>${rows.map((r) => {
    const series = Array.isArray(r.series) ? r.series : [];
    const first = series.length ? series[0] : null;
    const chg = first ? Math.round((r.price / first[1] - 1) * 100) : null;
    return `<div class="price-row">
      <div class="price-top"><b>${fmtMoney(r.price, r.unit)}</b>${typeof r.change24hPct === "number" ? `<span class="${r.change24hPct >= 0 ? "up" : "down"}">${r.change24hPct >= 0 ? "+" : ""}${r.change24hPct.toFixed(1)}% 24 h</span>` : ""}${chg !== null ? `<span>${chg >= 0 ? "+" : ""}${chg}% since ${esc(fmtMonth(first[0]))}</span>` : ""}</div>
      ${series.length ? sparkSvg(series, cssVar(m)) : ""}
      <p class="srcs">${esc(r.label || "")}${r.label ? " · " : ""}${r.freq === "monthly" ? `Monthly average, ${esc(fmtMonth(r.asOf))}` : `Spot, ${esc(fmtAgo(Date.now() - isoMs(r.asOf)))}`} · <a href="${esc(safeUrl(r.url) || "#")}" target="_blank" rel="noopener">${r.source === "MetalCharts" ? "Metal prices by MetalCharts" : esc(r.source)}</a></p>
    </div>`;
  }).join("")}</div>`;
}
function fmtMonth(iso) {
  const t = parseDay(iso);
  if (isNaN(t)) return "";
  const d = new Date(t);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/* ================= real ships (AIS) ================= */
let SHIPS = [], SHIP_BY_ID = {};
const AIS_TYPE = (t) => t >= 70 && t <= 79 ? "Cargo ship" : t >= 80 && t <= 89 ? "Tanker" : t >= 60 && t <= 69 ? "Passenger ship" : t === 30 ? "Fishing vessel" : t === 52 ? "Tug" : t >= 40 && t <= 49 ? "High-speed craft" : "Vessel";
function shipList() {
  const S = LIVE.ships;
  if (!S || !Array.isArray(S.ships)) return [];
  return S.ships.filter((v) => typeof v.lat === "number" && typeof v.lng === "number" && v.mmsi).map((v) => ({
    id: "s" + String(v.mmsi).replace(/\D/g, ""), mmsi: String(v.mmsi).replace(/\D/g, ""), name: String(v.name || "").trim() || `MMSI ${v.mmsi}`,
    lat: v.lat, lng: v.lng, sog: typeof v.sog === "number" ? v.sog : null, cog: typeof v.cog === "number" ? v.cog : 0,
    type: typeof v.type === "number" ? v.type : null, dest: String(v.dest || "").trim(), box: String(v.box || ""), t: v.t,
    len: typeof v.len === "number" ? v.len : null, hdg: typeof v.hdg === "number" ? v.hdg : null, nav: typeof v.nav === "number" ? v.nav : null
  }));
}
function selectShip(id) {
  leaveTourForPick();
  enterExplore();
  selected = null; selRoute = null; selChoke = null; selSat = false; selHz = null; selLive = false; selShip = id;
  const v = SHIP_BY_ID[id];
  if (globe) { globe.showSelected(); globe.highlightRoute(null); if (v) globe.flyToPoint(v.lat, v.lng, 1.7); }
  renderDrawer();
}
function drawerShipV11(id) {
  const v = SHIP_BY_ID[id];
  if (!v) { selShip = null; selLive = true; drawerLive(); return; }
  const fetched = LIVE.ships && LIVE.ships.fetchedAt ? fmtAgo(Date.now() - isoMs(LIVE.ships.fetchedAt)) : "";
  pHead.innerHTML = `<div class="kick"><span>${esc(v.type !== null ? AIS_TYPE(v.type) : "Vessel")}</span><span style="color:var(--live)">AIS position</span></div><h2>${esc(v.name)}</h2><div class="muted">${esc(v.box)}</div><div class="coord">${fmtCoord(v.lat, v.lng)}</div>`;
  specWrap.hidden = true;
  pBody.innerHTML = `
    <div class="tele"><div><span>Speed</span><b>${v.sog !== null ? v.sog.toFixed(1) + " kn" : "–"}</b></div><div><span>Course</span><b>${Math.round(v.cog)}°</b></div><div><span>MMSI</span><b>${esc(v.mmsi)}</b></div>${v.dest ? `<div><span>Destination</span><b>${esc(v.dest)}</b></div>` : ""}</div>
    <p class="srcs">A real position report broadcast by the ship and received by AISStream.io${fetched ? `, collected ${esc(fetched)}` : ""}. The ship has moved on since. Not every ship near a chokepoint carries minerals.</p>
    <div class="actions"><a class="btn small" href="https://www.marinetraffic.com/en/ais/details/ships/mmsi:${esc(v.mmsi)}" target="_blank" rel="noopener">Look it up on MarineTraffic</a></div>`;
}

/* ================= copy a link to the current view ================= */
const ARTIFACT_URL = (window.ATLAS_CONFIG && window.ATLAS_CONFIG.shareUrl) || location.href.split("#")[0];
function currentHash() {
  if (selected) return selected;
  if (selRoute) return selRoute;
  if (selChoke) return selChoke;
  if (selSat) return selSat;
  if (selLive) return "live";
  if (sysOf(filter)) return filter.slice(4);
  if (filter !== "all") return filter;
  return "";
}
function syncHash() {
  const h = currentHash();
  try { history.replaceState(null, "", h ? "#" + h : location.pathname + location.search); } catch (e) { /* sandboxed */ }
}
const linkBtn = `<button class="btn ghost small" data-copylink="1"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6.5 9.5l3-3M7 4.5l1.2-1.2a2.6 2.6 0 013.7 3.7L10.7 8.2M9 11.5l-1.2 1.2a2.6 2.6 0 01-3.7-3.7L5.3 7.8"/></svg>Copy link</button>`;
async function copyLink() {
  const h = currentHash();
  const url = ARTIFACT_URL + (h ? "#" + h : "");
  try {
    await navigator.clipboard.writeText(url);
    toast(T("Link copied", "Odkaz zkopírován"));
  } catch (e) {
    const m = $("#link-modal");
    $("#link-input").value = url;
    m.hidden = false;
    $("#link-input").select();
  }
}
$("#link-close").addEventListener("click", () => { $("#link-modal").hidden = true; });

/* ================= ask the atlas ================= */
const askEl = $("#ask"), askLog = $("#ask-log"), askInput = $("#ask-input"), askSend = $("#ask-send"), askStop = $("#ask-stop");
let askSample, askTurns = [], askCtl = null, askBusy = false;
(async () => {
  try { askSample = (window.claude && typeof window.claude.use === "function") ? await window.claude.use("sample") : null; } catch (e) { askSample = null; }
  $("#open-ask").hidden = !askSample;
  $("#nav-ask").hidden = !askSample;
})();
const ASK_SUGS = LANG === "cs" ? [
  "Které doly jsou blízko dnešních zemětřesení nebo bouří?",
  "Odkud bere Evropa galium a co se mění?",
  "Co by pro Evropu znamenalo uzavření Malackého průlivu?",
  "Který satelit vyfotí Tenke Fungurume jako další?"
] : [
  "Which mines are near today's earthquakes or storms?",
  "Where does Europe's gallium come from, and what is changing?",
  "What would closing the Strait of Malacca mean for Europe?",
  "Which satellite photographs Tenke Fungurume next?"
];
$("#ask-sugs").innerHTML = ASK_SUGS.map((q) => `<button type="button" class="ask-sug">${esc(q)}</button>`).join("");
$("#ask-sugs").addEventListener("click", (e) => { const b = e.target.closest(".ask-sug"); if (b) { askInput.value = b.textContent; askQuestion(); } });
function openAsk() { askEl.hidden = false; setTimeout(() => askInput.focus(), 0); }
function closeAsk() { askEl.hidden = true; }
$("#open-ask").addEventListener("click", openAsk);
$("#ask-close").addEventListener("click", closeAsk);
askEl.addEventListener("click", (e) => {
  if (e.target === askEl) { closeAsk(); return; }
  const r = e.target.closest("[data-askref]");
  if (!r) return;
  const [k, id] = r.dataset.askref.split(":");
  closeAsk();
  if (k === "site" && SITE_BY_ID[id]) select(id, true);
  else if (k === "route" && ROUTE_BY_ID[id]) selectRoute(id);
  else if (k === "choke" && CHOKE_BY_ID[id]) selectChoke(id);
  else if (k === "mat" && MATERIALS[id]) setFilter(id, true);
  else if (k === "sat" && LIVE_SATS.some((c) => c.id === id)) selectSat(id);
});
$("#ask-form").addEventListener("submit", (e) => { e.preventDefault(); askQuestion(); });
askInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); askQuestion(); } });
askStop.addEventListener("click", () => { if (askCtl) askCtl.abort(); });

function askContext() {
  const L = [];
  L.push(`TODAY: ${new Date().toISOString().slice(0, 16)} UTC`);
  L.push("MATERIALS (id | name | top share | key numbers | uses | Europe):");
  ORDER.forEach((m) => {
    const M = MATERIALS[m], P = PROD[m];
    L.push(`${m} | ${M.name} | ${M.share ? `${M.share.pct}% ${M.share.who} (${M.share.what})` : ""} | ${(M.stats || []).map((s) => `${s.num} ${s.what} [${s.src}]`).join("; ")} | ${M.uses} | ${M.europe}${P ? ` | production ${P.year}: ${P.rows.map((r) => `${r[0]} ${P.pctOnly ? r[1] + "%" : r[1] + " " + P.unit}`).join(", ")} [${P.src}]` : ""}`);
  });
  L.push("SITES (id | name | place | material | stage | operator | facts | why):");
  SITES.forEach((s) => L.push(`${s.id} | ${s.name} | ${s.place}, ${s.country} | ${s.m} | ${s.stage}${ONLINE[s.id] ? `, online ${ONLINE[s.id]}` : ""} | ${s.operator || ""} | ${s.facts.join("; ")} | ${s.why}${IMG[s.id] && IMG[s.id].change ? ` | satellite change ${IMG[s.id].change.from}→${IMG[s.id].change.to}: about ${IMG[s.id].change.lostHa} ha of vegetation lost (any cause: mining, building, forestry, fire or drought)` : ""}`));
  L.push("ROUTES (id | name | from → to | materials | fact | via):");
  ROUTES.forEach((r) => L.push(`${r.id} | ${r.name} | ${r.fromLabel} → ${r.toLabel} | ${r.m.join(",")} | ${r.fact} | ${(r.via || []).join(",")}`));
  L.push("CHOKEPOINTS (id | name | fact):");
  CHOKES.forEach((c) => L.push(`${c.id} | ${c.name} | ${c.fact}`));
  L.push("SYSTEMS (what defence and space hardware depends on):");
  Object.values(SYSTEMS).forEach((y) => L.push(`${y.name}: ${y.chokeText} Parts: ${y.parts.map((p) => `${p.m} (${p.role})`).join("; ")}`));
  L.push("WHAT-IF SCENARIOS:");
  SCENARIOS.forEach((x) => L.push(`${x.title}: ${x.prec}`));
  if (NEWS.length) {
    L.push("RECENT NEWS (date | title | source | url | summary):");
    NEWS.slice(0, 30).forEach((n) => L.push(`${n.date} | ${n.title} | ${n.source || ""} | ${n.url || ""} | ${n.summary || ""}`));
  }
  if (WATCH.length) {
    L.push("COMING DATES:");
    WATCH.slice(0, 15).forEach((w) => L.push(`${w.date} | ${w.title} | ${w.detail || ""}`));
  }
  if (HZ.length) {
    L.push(`LIVE HAZARDS near the supply chain (USGS/GDACS, fetched ${LIVE.hazards && LIVE.hazards.fetchedAt}):`);
    const near = nearSupplyChain();
    near.forEach((x) => L.push(`${x.h.title}, ${x.h.place} | ${x.sites.length ? `${Math.round(x.sites[0].d)} km from site ${x.sites[0].s.id}` : `${Math.round(x.routes[0].d)} km from route ${x.routes[0].r.id}`}`));
    if (!near.length) L.push("none within 500 km of a site or 300 km of a route");
  }
  if (tracksReady) {
    L.push("NEXT SATELLITE PASSES over sites (computed from orbit data; a pass is a chance, not a guaranteed image):");
    SITES.forEach((s) => {
      const p = (nextPassesForSite(s, 2) || [])[0];
      if (p) L.push(`${s.id}: ${p.sat.name} at ${new Date(p.t).toISOString().slice(0, 16)} UTC${typeof p.cloud === "number" ? `, forecast cloud ${Math.round(p.cloud)}%` : ""}`);
    });
  }
  if (LIVE.prices && LIVE.prices.items) {
    L.push("PRICES:");
    Object.entries(LIVE.prices.items).forEach(([k, r]) => L.push(`${k}: ${r.price} ${r.unit} (${r.source}, ${r.asOf})`));
  }
  if (ORBITS.length) L.push(`SATELLITES TRACKED (id | name): ${ORBITS.map((o) => `${o.cfg.id} | ${o.cfg.name}`).join("; ")}`);
  L.push(`US RULE: DFARS 252.225-7052 from ${DFARS.date}: NdFeB/SmCo magnets, tungsten and tantalum for US defence contracts may not be mined, refined, separated, melted or produced in ${DFARS.covered.join(", ")}.`);
  L.push("OWNERS (site | owners | owner's home | state):");
  Object.entries(OWN).forEach(([id, o]) => L.push(`${id} | ${o.o.join("; ")} | ${o.home} | ${o.state}${o.note ? " | " + o.note[0] : ""}${o.sanc ? " | " + o.sanc[0] : ""}`));
  L.push("PUBLIC FUNDING (date | who | amount | what):");
  FUNDING.forEach((f) => L.push(`${f.d} | ${f.who} | ${f.amt} | ${f.en} [${f.src.u}]`));
  if (LIVE.trade && LIVE.trade.materials) {
    L.push("EU IMPORTS FROM OUTSIDE THE EU (Eurostat Comext; material | product | year | value EUR | top origins %):");
    Object.entries(LIVE.trade.materials).forEach(([m, rows]) => rows.forEach((r) => { const tp = tradeTop(r); if (tp) L.push(`${m} | ${r.label} | ${tp.y} | ${tp.eur} | ${tp.list.slice(0, 4).map(([cc, v]) => `${cc} ${pctOf(v, tp.eur)}%`).join(", ")}`); }));
  }
  if (LIVE.traffic) {
    L.push("SHIP TRAFFIC (IMF PortWatch; chokepoint | ships a day, 7-day average | change vs a year ago):");
    Object.keys(PW_NAME).forEach((id) => { const st = cpStats(id); if (st) L.push(`${id} | ${Math.round(st.last7)} | ${st.chg == null ? "n/a" : st.chg + "%"} | data to ${st.last}`); });
  }
  if (LIVE.conflict && LIVE.conflict.areas) {
    L.push(`ARMED CONFLICT NEAR THE SUPPLY CHAIN (UCDP candidate events ${LIVE.conflict.from}–${LIVE.conflict.to}; area | events | deaths):`);
    Object.entries(LIVE.conflict.areas).forEach(([w, a]) => L.push(`${w} | ${a.n} | ${a.deaths}`));
  }
  L.push(`DEFENCE DEMAND: SIPRI ${SIPRI.year}: world $${SIPRI.world}bn (+${SIPRI.worldChg}%), Europe $${SIPRI.europe}bn (+${SIPRI.europeChg}%).`);
  L.push("SITE CONTEXT (site | water stress | tree-cover loss 2001-2024 within 5 km, ha):");
  SITES.forEach((x) => { const w = SITE_CTX.water[x.id], f = SITE_CTX.forest[x.id]; if (w || f) L.push(`${x.id} | ${w ? w.label : ""} | ${f ? f.lossHa : ""}`); });
  v14AskLines().forEach((x) => L.push(x));
  const view = selected ? `site ${selected}` : selRoute ? `route ${selRoute}` : selChoke ? `chokepoint ${selChoke}` : selSat ? `satellite ${selSat}` : filter !== "all" ? `filter ${filter}` : "the whole globe";
  L.push(`THE READER IS LOOKING AT: ${view}`);
  return L.join("\n");
}
const ASK_RULES = `You are the guide built into "OreOrbit" (Critical minerals from orbit), an atlas of the mines, refineries, trade routes and chokepoints behind Europe's critical raw materials for defence and space.
Answer the reader's question using ONLY the atlas data below. If the data does not cover it, say so plainly in one sentence and point to what in the atlas comes closest.
- Answer in the language the question is written in.
- Be brief: at most about 160 words, unless the reader asks for detail. Short paragraphs or a few "- " bullets. Use **bold** sparingly.
- Whenever you mention something in the atlas, write it as a link token so the reader can open it: [[site:ID]], [[route:ID]], [[choke:ID]], [[mat:ID]] or [[sat:ID]], with the exact IDs from the data. The page shows the name.
- When you give a number, name its source as given in the data; when a news item has a url, you may link it as [title](url).
- Do not invent numbers, dates or facts. Do not give investment advice. Do not comment on the strategy of individual defence companies.`;

function askRender(text) {
  let h = esc(text);
  const name = (k, id) => k === "site" ? (SITE_BY_ID[id] || {}).name : k === "route" ? (ROUTE_BY_ID[id] || {}).name : k === "choke" ? (CHOKE_BY_ID[id] || {}).name : k === "mat" ? (MATERIALS[id] || {}).name : k === "sat" ? (LIVE_SATS.find((c) => c.id === id) || {}).name : null;
  h = h.replace(/\[\[(site|route|choke|mat|sat):([\w-]+)\]\]/g, (m0, k, id) => { const n = name(k, id); return n ? `<button type="button" class="ask-ref" data-askref="${k}:${id}">${esc(n)}</button>` : ""; });
  h = h.replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, (m0, t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`);
  h = h.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  const blocks = h.split(/\n{2,}/).map((b) => {
    const lines = b.split("\n");
    if (lines.every((l) => /^\s*[-•*]\s+/.test(l))) return `<ul>${lines.map((l) => `<li>${l.replace(/^\s*[-•*]\s+/, "")}</li>`).join("")}</ul>`;
    return `<p>${lines.join("<br>")}</p>`;
  });
  return blocks.join("");
}
async function askQuestion() {
  const q = askInput.value.trim();
  if (!q || askBusy || !askSample) return;
  askBusy = true; askSend.disabled = true; askStop.hidden = false;
  $("#ask-sugs").hidden = true;
  askInput.value = "";
  const qEl = document.createElement("div"); qEl.className = "ask-q"; qEl.textContent = q;
  const aEl = document.createElement("div"); aEl.className = "ask-a thinking"; aEl.textContent = "Thinking…";
  askLog.append(qEl, aEl); aEl.scrollIntoView({ block: "nearest" });
  askTurns.push({ role: "user", content: q });
  const turns = [{ role: "user", content: ASK_RULES + (LANG === "cs" ? "\nThe page is shown in Czech: if the question's language is unclear, answer in Czech." : "") + "\n\nATLAS DATA:\n" + askContext() }, ...askTurns.slice(-7)];
  askCtl = new AbortController();
  try {
    const { text, truncated } = await askSample(turns, { signal: askCtl.signal, cache: false, onText: ({ text }) => { aEl.classList.remove("thinking"); aEl.innerHTML = askRender(text); } });
    aEl.classList.remove("thinking");
    aEl.innerHTML = askRender(text) + (truncated ? `<p class="fine">The answer was cut short. Ask for less at a time.</p>` : "");
    askTurns.push({ role: "assistant", content: text });
  } catch (e) {
    const code = e && e.code;
    askTurns.pop();
    aEl.classList.remove("thinking");
    if (e && e.text) aEl.innerHTML = askRender(e.text);
    else aEl.textContent = "";
    const msg = code === "cancelled" ? "Stopped."
      : code === "not_granted" || code === "sampling_disabled" || code === "not_declared" ? "The AI agent is not available for this page on your account."
      : code === "rate_limited" ? "Too many questions at once, or your usage limit is reached. Try again later."
      : code === "session_expired" ? "Please sign in to the AI agent again."
      : code === "refused" ? "The AI agent declined this question. Try asking it differently."
      : "Something went wrong. Try again.";
    aEl.insertAdjacentHTML("beforeend", `<p class="fine">${esc(msg)}</p>`);
    if (code === "not_granted" || code === "sampling_disabled") { $("#open-ask").hidden = true; $("#nav-ask").hidden = true; }
  } finally {
    askBusy = false; askSend.disabled = false; askStop.hidden = true; askCtl = null;
    aEl.scrollIntoView({ block: "nearest" });
  }
}

/* ================= v11: rules, money and open-data signals ================= */
const nf = (v, d) => (typeof v === "number" && isFinite(v)) ? v.toLocaleString(LANG === "cs" ? "cs-CZ" : "en-GB", { maximumFractionDigits: d == null ? 0 : d, minimumFractionDigits: 0 }) : "–";
function fmtEur(v) {
  if (typeof v !== "number" || !isFinite(v)) return "–";
  if (v >= 1e9) return `€${nf(v / 1e9, 2)} ${T("bn", "mld.")}`;
  if (v >= 1e6) return `€${nf(v / 1e6, v >= 1e8 ? 0 : 1)} ${T("m", "mil.")}`;
  return `€${nf(v / 1e3, 0)} ${T("k", "tis.")}`;
}
const pctOf = (a, b) => b ? Math.round(100 * a / b) : 0;
const daysTo = (iso) => Math.ceil((Date.parse(iso + "T00:00:00Z") - Date.now()) / 86400000);
const MON_SHORT = (ym) => { const [y, m] = String(ym).split("-"); return `${(LANG === "cs" ? ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"] : MONTHS)[+m - 1]} ${String(y).slice(2)}`; };
const monGenYm = (ym) => { const [y, m] = String(ym).split("-"); return `${MON_CS_GEN[+m - 1]} ${y}`; };   /* build 56: "od ledna 2025" */
const COUNTRY_CS = { China: "Čína", "United States": "Spojené státy", Australia: "Austrálie", Malaysia: "Malajsie", Estonia: "Estonsko", Norway: "Norsko", Ukraine: "Ukrajina", "South Africa": "Jihoafrická republika", Austria: "Rakousko", Portugal: "Portugalsko", Greece: "Řecko", Belgium: "Belgie", "DR Congo": "DR Kongo", Chile: "Chile", Czechia: "Česko", Serbia: "Srbsko", Finland: "Finsko", Russia: "Rusko", Indonesia: "Indonésie", Mozambique: "Mosambik", Sweden: "Švédsko", Canada: "Kanada", Azerbaijan: "Ázerbájdžán", Switzerland: "Švýcarsko", "United Kingdom": "Spojené království",
  /* build 56: countries in the production tables and new sites */
  Brazil: "Brazílie", India: "Indie", Spain: "Španělsko", Turkey: "Turecko", Kazakhstan: "Kazachstán", Israel: "Izrael", Philippines: "Filipíny", Madagascar: "Madagaskar", Tajikistan: "Tádžikistán", Vietnam: "Vietnam", Senegal: "Senegal", Gabon: "Gabon", Ghana: "Ghana", Zimbabwe: "Zimbabwe", Argentina: "Argentina" };
const ctry = (c) => LANG === "cs" ? (COUNTRY_CS[c] || c) : c;
/* build 56: English country names from the feeds (GDACS, UCDP) in Czech: COUNTRY_CS first, then the browser's own region names */
let EN_CC = null;
const CC_ALIAS = { "Czech Republic": "CZ", "Democratic Republic of Congo": "CD", "Democratic Republic of the Congo": "CD", "Republic of Congo": "CG", "Ivory Coast": "CI", Turkey: "TR", Russia: "RU", Syria: "SY", Iran: "IR", Laos: "LA", "South Korea": "KR", "North Korea": "KP", Moldova: "MD", Bolivia: "BO", Venezuela: "VE", Tanzania: "TZ", Palestine: "PS", Kosovo: "XK", Myanmar: "MM", Burma: "MM", Macedonia: "MK", "North Macedonia": "MK", Swaziland: "SZ", "Cape Verde": "CV", Brunei: "BN", "East Timor": "TL" };
const CC_CS_FIX = { CD: "DR Kongo", CG: "Kongo", HK: "Hongkong", MO: "Macao", PS: "Palestina", US: "USA", XK: "Kosovo" };
function csCountry(name) {
  if (LANG !== "cs" || !name) return name;
  const k = String(name).replace(/\s*\([^()]*\)$/, "").trim();
  if (COUNTRY_CS[k]) return COUNTRY_CS[k];
  if (!EN_CC) {
    EN_CC = {};
    try { const en = new Intl.DisplayNames(["en"], { type: "region" }), A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; for (const a of A) for (const b of A) { const c = a + b; let n = null; try { n = en.of(c); } catch (e) { n = null; } if (n && n !== c) EN_CC[n.replace(/ & /g, " and ")] = c; } } catch (e) { /* no Intl: names stay English */ }
  }
  const cc = CC_ALIAS[k] || EN_CC[k.replace(/ & /g, " and ")];
  if (!cc) return name;
  if (CC_CS_FIX[cc]) return CC_CS_FIX[cc];
  try { return new Intl.DisplayNames(["cs"], { type: "region" }).of(cc) || name; } catch (e) { return name; }
}
/* build 56: a globe label lists at most three places ("Andorra, Albania, Austria +27"), in Czech when the page is */
function hzShort(x) { const p = String(x || "").split(/,\s*/).filter(Boolean); if (p.length < 2) return LANG === "cs" ? csPlaces(x || "") : x; const t = p.slice(0, 3).join(", "); return (LANG === "cs" ? csPlaces(t) : t) + (p.length > 3 ? " +" + (p.length - 3) : ""); }
/* a GDACS place list ("Andorra, Albania, Czech Republic") in Czech, piece by piece */
function csPlaces(x) { return String(x).split(/,\s*/).map((p) => { const c = csCountry(p.trim()); return c !== p.trim() ? c : trPiece(p); }).join(", "); }
/* UCDP actors: "Government of Russia (Soviet Union)" is the state itself */
function ucdpActor(a) { if (LANG !== "cs") return a; const g = /^Government of (.+)$/.exec(a || ""); return g ? csCountry(g[1]) : a === "Civilians" ? "civilisté" : a; }
const ISO2 = { CN: ["China", "Čína"], US: ["United States", "USA"], GB: ["United Kingdom", "Spojené království"], CH: ["Switzerland", "Švýcarsko"], NO: ["Norway", "Norsko"], JP: ["Japan", "Japonsko"], KR: ["South Korea", "Jižní Korea"], VN: ["Vietnam", "Vietnam"], PH: ["Philippines", "Filipíny"], MY: ["Malaysia", "Malajsie"], TW: ["Taiwan", "Tchaj-wan"], IN: ["India", "Indie"], TR: ["Türkiye", "Turecko"], RU: ["Russia", "Rusko"], KZ: ["Kazakhstan", "Kazachstán"], TJ: ["Tajikistan", "Tádžikistán"], MM: ["Myanmar", "Myanmar"], TH: ["Thailand", "Thajsko"], BO: ["Bolivia", "Bolívie"], ZA: ["South Africa", "Jihoafrická rep."], AU: ["Australia", "Austrálie"], CA: ["Canada", "Kanada"], CL: ["Chile", "Chile"], AR: ["Argentina", "Argentina"], BR: ["Brazil", "Brazílie"], MG: ["Madagascar", "Madagaskar"], SL: ["Sierra Leone", "Sierra Leone"], MN: ["Mongolia", "Mongolsko"], BI: ["Burundi", "Burundi"], RW: ["Rwanda", "Rwanda"], CD: ["DR Congo", "DR Kongo"], ZM: ["Zambia", "Zambie"], MZ: ["Mozambique", "Mosambik"], ID: ["Indonesia", "Indonésie"], UA: ["Ukraine", "Ukrajina"], RS: ["Serbia", "Srbsko"], IL: ["Israel", "Izrael"], AE: ["UAE", "SAE"], SG: ["Singapore", "Singapur"], HK: ["Hong Kong", "Hongkong"], MX: ["Mexico", "Mexiko"], PE: ["Peru", "Peru"], UZ: ["Uzbekistan", "Uzbekistán"], GE: ["Georgia", "Gruzie"], GA: ["Gabon", "Gabon"], AM: ["Armenia", "Arménie"], LA: ["Laos", "Laos"], EG: ["Egypt", "Egypt"], MA: ["Morocco", "Maroko"], NG: ["Nigeria", "Nigérie"], XS: ["Serbia", "Srbsko"] };
const iso2 = (c) => ISO2[c] ? (LANG === "cs" ? ISO2[c][1] : ISO2[c][0]) : c;
/* build 56: "from <country>" in EU import lines. Czech needs the genitive and z/ze, so every ISO2 partner has its phrase; an unknown code falls back to "ze země <name>" */
const ISO2_FROM_CS = { CN: "z Číny", US: "z USA", GB: "ze Spojeného království", CH: "ze Švýcarska", NO: "z Norska", JP: "z Japonska", KR: "z Jižní Koreje", VN: "z Vietnamu", PH: "z Filipín", MY: "z Malajsie", TW: "z Tchaj-wanu", IN: "z Indie", TR: "z Turecka", RU: "z Ruska", KZ: "z Kazachstánu", TJ: "z Tádžikistánu", MM: "z Myanmaru", TH: "z Thajska", BO: "z Bolívie", ZA: "z Jihoafrické republiky", AU: "z Austrálie", CA: "z Kanady", CL: "z Chile", AR: "z Argentiny", BR: "z Brazílie", MG: "z Madagaskaru", SL: "ze Sierry Leone", MN: "z Mongolska", BI: "z Burundi", RW: "ze Rwandy", CD: "z DR Konga", ZM: "ze Zambie", MZ: "z Mosambiku", ID: "z Indonésie", UA: "z Ukrajiny", RS: "ze Srbska", IL: "z Izraele", AE: "ze SAE", SG: "ze Singapuru", HK: "z Hongkongu", MX: "z Mexika", PE: "z Peru", UZ: "z Uzbekistánu", GE: "z Gruzie", AM: "z Arménie", LA: "z Laosu", EG: "z Egypta", MA: "z Maroka", NG: "z Nigérie", GA: "z Gabonu", XS: "ze Srbska" };
const ccName = (c) => { if (ISO2[c]) return iso2(c); try { return new Intl.DisplayNames([LANG === "cs" ? "cs" : "en"], { type: "region" }).of(c) || c; } catch (e) { return c; } };
const fromCc = (c) => LANG === "cs" ? ooNb0(ISO2_FROM_CS[c] || "ze země " + ccName(c)) : "from " + ccName(c);
const AS_OF = "2026-10-23";

/* ---- 1. the US sourcing rule for defence contracts (DFARS 252.225-7052) ---- */
const DFARS = {
  date: "2027-01-01",
  covered: ["China", "Russia", "Iran", "North Korea"],
  mats: { ree: true, w: true },
  src: [
    { t: "DFARS 252.225-7052 (acquisition.gov)", u: "https://acquisition.gov/dfars/252.225-7052-restriction-acquisition-certain-magnets-tantalum-and-tungsten." },
    { t: "Crowell & Moring, June 2024", u: "https://www.crowell.com/en/insights/client-alerts/dod-expands-restrictions-on-supply-chain-for-certain-magnets-tantalum-and-tungsten" }
  ]
};
const dfarsCovered = (s) => DFARS.covered.includes(s.country);
function dfarsSiteHtml(s) {
  if (!DFARS.mats[s.m]) return "";
  const days = daysTo(DFARS.date);
  const bad = dfarsCovered(s);
  return `<div class="v11-card ${bad ? "warn" : "ok"}"><div class="v11-k">${T("US defence rule from 1 January 2027", "Americké pravidlo pro obranné zakázky od 1. ledna 2027")}${days > 0 ? ` · ${inDays(days)}` : ""}</div>
    <p>${bad ? T(`${s.country} is a covered country. From 2027, ${s.m === "ree" ? "rare-earth magnets" : "tungsten"} for US defence contracts may not be mined, refined or made here at any stage.`,
      `${ctry(s.country)} patří mezi vyloučené země. Od roku 2027 se zde ${s.m === "ree" ? "magnety ze vzácných zemin" : "wolfram"} pro americké obranné zakázky nesmí těžit, rafinovat ani vyrábět v žádné fázi.`)
    : T(`Outside the covered countries (China, Russia, Iran, North Korea). Material from here still qualifies only if every other stage of its chain is outside them too.`,
      `Mimo vyloučené země (Čína, Rusko, Írán, Severní Korea). Materiál odsud ale vyhoví jen tehdy, když jsou mimo ně i všechny další fáze řetězce.`)}</p>${srcLinks(DFARS.src)}</div>`;
}

/* ---- 2. who owns each site ---- */
const OWN = {
  "bayan-obo": { o: ["Baogang Group (Baotou Iron and Steel)", "Processing: China Northern Rare Earth, a Baogang subsidiary"], home: "China", state: "yes", src: [{ t: "NS Energy", u: "https://www.nsenergybusiness.com/projects/bayan-obo-rare-earth-mine/" }] },
  "mountain-pass": { o: ["MP Materials (listed in New York)"], home: "United States", state: "partly", note: ["The US Department of Defense became the largest shareholder in July 2025: $400m of preferred stock, a $110/kg price floor for NdPr and a 10-year deal to buy all magnets from a new plant.", "Ministerstvo obrany USA se v červenci 2025 stalo největším akcionářem: prioritní akcie za 400 mil. USD, minimální cena NdPr 110 USD/kg a desetiletý odběr všech magnetů z nového závodu."], src: [{ t: "Mining.com, July 2025", u: "https://www.mining.com/mp-materials-lands-multi-billion-pentagon-deal/" }] },
  "mount-weld": { o: ["Lynas Rare Earths (listed in Sydney)"], home: "Australia", state: "no" },
  "lynas-kuantan": { o: ["Lynas Rare Earths (listed in Sydney)"], home: "Australia", state: "no" },
  "sillamae": { o: ["Neo Performance Materials (listed in Toronto)"], home: "Canada", state: "no" },
  "narva": { o: ["Neo Performance Materials (listed in Toronto)"], home: "Canada", state: "no", note: ["Opened 19 September 2025, built with support from the EU Just Transition Fund, Estonia and the city of Narva.", "Otevřen 19. září 2025, postaven s podporou Fondu EU pro spravedlivou transformaci, Estonska a města Narva."], src: [{ t: "Government of Estonia", u: "https://valitsus.ee/en/news/michal-opening-neos-magnet-plant-future-europes-competitiveness-being-built-ida-viru-county" }] },
  "panzhihua": { o: ["Pangang Group, part of Ansteel"], home: "China", state: "yes" },
  "tellnes": { o: ["Kronos Worldwide (Titania AS)"], home: "United States", state: "no" },
  "irshansk": { o: ["United Mining and Chemical Company (UMCC)", "Owned by NEQSOL Holding since June 2025"], home: "Azerbaijan", state: "no", note: ["Bought at Ukraine's privatisation auction in October 2024 for nearly UAH 4 billion; ownership passed in June 2025.", "Koupeno v ukrajinské privatizační aukci v říjnu 2024 za téměř 4 mld. UAH; vlastnictví přešlo v červnu 2025."], src: [{ t: "Interfax-Ukraine", u: "https://en.interfax.com.ua/news/economic/1201964.html" }] },
  "vilnohirsk": { o: ["United Mining and Chemical Company (UMCC)", "Owned by NEQSOL Holding since June 2025"], home: "Azerbaijan", state: "no", src: [{ t: "Interfax-Ukraine", u: "https://en.interfax.com.ua/news/economic/1201964.html" }] },
  "richards-bay": { o: ["Rio Tinto 74%, South African partners 26%"], home: "United Kingdom", state: "no" },
  "mittersill": { o: ["Wolfram Bergbau und Hütten, part of Sandvik"], home: "Sweden", state: "no" },
  "panasqueira": { o: ["Almonty Industries"], home: "Canada", state: "no" },
  "ganzhou": { o: ["Many mines and smelters run by Chinese companies"], home: "China", state: "mixed" },
  "xikuangshan": { o: ["Hsikwangshan Twinkling Star Antimony and others"], home: "China", state: "unknown" },
  "stibnite": { o: ["Perpetua Resources (listed in New York and Toronto)"], home: "United States", state: "no", note: ["The US Export-Import Bank approved a $2.9bn loan in May 2026 that is expected to fully fund construction.", "Americká Export-Import Bank v květnu 2026 schválila úvěr 2,9 mld. USD, který má plně pokrýt výstavbu."], src: [{ t: "Mining.com, May 2026", u: "https://www.mining.com/perpetua-resources-gets-2-9b-exim-loan-for-stibnite-gold-antimony-project-in-idaho/" }] },
  "metlen-gallium": { o: ["Metlen Energy & Metals"], home: "Greece", state: "no" },
  "umicore-olen": { o: ["Umicore (listed in Brussels)"], home: "Belgium", state: "no" },
  "kipushi": { o: ["Ivanhoe Mines 68%", "Gécamines (DR Congo state) 32%"], home: "Canada", state: "partly", note: ["China's CITIC Metal and Zijin are among Ivanhoe's largest shareholders.", "Mezi největší akcionáře Ivanhoe patří čínské firmy CITIC Metal a Zijin."], src: [{ t: "Mining.com, 2018", u: "https://mining.com/chinas-citic-ivanhoe-mines-top-shareholder-548m-deal/" }] },
  "greenbushes": { o: ["Talison Lithium: Tianqi (China) and IGO (Australia) 51% together", "Albemarle (United States) 49%"], home: "Australia", state: "no" },
  "atacama": { o: ["SQM–Codelco joint venture (Codelco is Chile's state copper company)", "Albemarle"], home: "Chile", state: "partly", note: ["China's Tianqi owns about a fifth of SQM.", "Čínský Tianqi vlastní asi pětinu SQM."] },
  "cinovec": { o: ["Geomet: ČEZ group 51%, European Metals 49%"], home: "Czechia", state: "partly", note: ["The Czech state is ČEZ's majority owner. Named an EU strategic project on 25 March 2025.", "Většinovým vlastníkem ČEZ je český stát. Strategickým projektem EU jmenován 25. března 2025."], src: [{ t: "ČEZ", u: "https://www.cez.cz/sustainability/en/news/lithium-mining-and-processing-in-usti-nad-labem-region-included-among-european-unions-strategic-projects-220497" }] },
  "jadar": { o: ["Rio Tinto"], home: "United Kingdom", state: "no" },
  "tenke": { o: ["CMOC 80%", "Gécamines (DR Congo state) 20%"], home: "China", state: "partly", note: ["CMOC's largest shareholders include Cathay Fortune and the battery maker CATL; the Luoyang city government also holds a stake.", "Mezi největší akcionáře CMOC patří Cathay Fortune a výrobce baterií CATL; podíl má i městská vláda Luoyangu."], src: [{ t: "Wikipedia: CMOC", u: "https://en.wikipedia.org/wiki/CMOC_Group_Limited" }] },
  "mutanda": { o: ["Glencore (listed in London)"], home: "Switzerland", state: "no" },
  "kokkola": { o: ["Umicore (bought from Freeport in 2019)"], home: "Belgium", state: "no" },
  "norilsk": { o: ["Nornickel"], home: "Russia", state: "no", sanc: ["The company itself is not on the US, UK or EU sanctions lists. Its president and largest shareholder, Vladimir Potanin, is under US sanctions since December 2022 and UK sanctions since 2022.", "Samotná firma na sankčních seznamech USA, Británie ani EU není. Její prezident a největší akcionář Vladimir Potanin je od prosince 2022 pod sankcemi USA a od roku 2022 pod sankcemi Británie."], src: [{ t: "Mining.com, Dec 2022", u: "https://www.mining.com/web/nornickel-chief-potanin-faces-u-s-sanctions-wsj/" }, { t: "Mining.com: LME and UK sanctions", u: "https://www.mining.com/web/lme-wont-ban-nornickels-metal-as-russian-firm-isnt-under-uk-sanctions/" }] },
  "imip": { o: ["Tsingshan group (via Shanghai Decent) about 66%", "Bintang Delapan about 34%"], home: "China", state: "no", src: [{ t: "Business & Human Rights Resource Centre", u: "https://business-humanrights.org/en/latest-news/indonesia-morowali-industrial-park-imip-project-profile" }] },
  "terrafame": { o: ["Finnish Minerals Group (Finnish state) 56.2%"], home: "Finland", state: "yes" },
  "balama": { o: ["Syrah Resources (listed in Sydney)"], home: "Australia", state: "no" },
  "vittangi": { o: ["Talga Group (listed in Sydney)"], home: "Australia", state: "no", note: ["Its graphite mine was named an EU strategic project on 25 March 2025.", "Její grafitový důl byl 25. března 2025 jmenován strategickým projektem EU."], src: [{ t: "FNN, March 2025", u: "https://finnewsnetwork.com.au/amp/NewsItem/1212133" }] }
};
const OWN_CS = {
  "Baogang Group (Baotou Iron and Steel)": "Baogang Group (Baotou Iron and Steel)", "Processing: China Northern Rare Earth, a Baogang subsidiary": "Zpracování: China Northern Rare Earth, dceřiná firma Baogangu",
  "MP Materials (listed in New York)": "MP Materials (kótovaná v New Yorku)", "Lynas Rare Earths (listed in Sydney)": "Lynas Rare Earths (kótovaná v Sydney)",
  "Neo Performance Materials (listed in Toronto)": "Neo Performance Materials (kótovaná v Torontu)", "Pangang Group, part of Ansteel": "Pangang Group, součást Ansteel",
  "Owned by NEQSOL Holding since June 2025": "Od června 2025 vlastní NEQSOL Holding", "Rio Tinto 74%, South African partners 26%": "Rio Tinto 74 %, jihoafričtí partneři 26 %",
  "Wolfram Bergbau und Hütten, part of Sandvik": "Wolfram Bergbau und Hütten, součást Sandviku", "Many mines and smelters run by Chinese companies": "Mnoho dolů a hutí čínských firem",
  "Hsikwangshan Twinkling Star Antimony and others": "Hsikwangshan Twinkling Star Antimony a další", "Perpetua Resources (listed in New York and Toronto)": "Perpetua Resources (kótovaná v New Yorku a Torontu)",
  "Umicore (listed in Brussels)": "Umicore (kótovaná v Bruselu)", "Ivanhoe Mines 68%": "Ivanhoe Mines 68 %", "Gécamines (DR Congo state) 32%": "Gécamines (stát DR Kongo) 32 %",
  "Talison Lithium: Tianqi (China) and IGO (Australia) 51% together": "Talison Lithium: Tianqi (Čína) a IGO (Austrálie) společně 51 %", "Albemarle (United States) 49%": "Albemarle (USA) 49 %",
  "SQM–Codelco joint venture (Codelco is Chile's state copper company)": "Společný podnik SQM–Codelco (Codelco je chilská státní měděná firma)",
  "Geomet: ČEZ group 51%, European Metals 49%": "Geomet: skupina ČEZ 51 %, European Metals 49 %", "CMOC 80%": "CMOC 80 %", "Gécamines (DR Congo state) 20%": "Gécamines (stát DR Kongo) 20 %",
  "Glencore (listed in London)": "Glencore (kótovaný v Londýně)", "Umicore (bought from Freeport in 2019)": "Umicore (koupeno od Freeportu v roce 2019)",
  "Tsingshan group (via Shanghai Decent) about 66%": "Skupina Tsingshan (přes Shanghai Decent) asi 66 %", "Bintang Delapan about 34%": "Bintang Delapan asi 34 %",
  "Finnish Minerals Group (Finnish state) 56.2%": "Finnish Minerals Group (finský stát) 56,2 %", "Syrah Resources (listed in Sydney)": "Syrah Resources (kótovaná v Sydney)",
  "Talga Group (listed in Sydney)": "Talga Group (kótovaná v Sydney)"
};
const STATE_TXT = { yes: ["State-owned", "Státní"], partly: ["State stake", "Státní podíl"], no: ["Private or listed", "Soukromá nebo kótovaná"], mixed: ["Mixed", "Smíšené"], unknown: ["Not verified", "Neověřeno"] };
function ownHtml(s) {
  const o = OWN[s.id];
  if (!o) return "";
  const lines = o.o.map((x) => LANG === "cs" ? (OWN_CS[x] || x) : x);
  return `<div class="v11-card"><div class="v11-k">${T("Who owns it", "Kdo to vlastní")}</div>
    <ul class="own">${lines.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
    <div class="chips"><span class="chip">${T("Owner's home", "Domovská země vlastníka")}: ${esc(ctry(o.home))}</span><span class="chip ${o.state === "yes" ? "hi" : ""}">${esc(T(...STATE_TXT[o.state]))}</span>${o.sanc ? `<span class="chip warn">${T("Sanctions: see note", "Sankce: viz poznámka")}</span>` : ""}</div>
    ${o.note ? `<p class="muted">${esc(T(o.note[0], o.note[1]))}</p>` : ""}${o.sanc ? `<p class="muted">${esc(T(o.sanc[0], o.sanc[1]))}</p>` : ""}
    ${o.src ? srcLinks(o.src) : `<div class="srcs">${T("Company reports, as of", "Výroční zprávy firem, stav k")} ${esc(fmtDay(AS_OF))}</div>`}</div>`;
}

/* ---- 3. responsible sourcing (RMI audits) ---- */
const RMAP = {
  mittersill: { en: "Its tungsten refinery is on the RMI list of conformant smelters since 2018; the latest audit ran in July 2025 without findings. The EU recognised the RMI scheme in October 2025.", cs: "Její rafinerie wolframu je od roku 2018 na seznamu RMI jako vyhovující; poslední audit proběhl v červenci 2025 bez nálezů. EU uznala systém RMI v říjnu 2025.", src: [{ t: "WBH OECD Step 5 report 2025", u: "https://www.wolfram.at/siteassets/wbh-oecd-step-5-report-2025.pdf" }] }
};
const RMI_LISTS = [{ t: "RMI tungsten smelter list", u: "https://www.responsiblemineralsinitiative.org/tungsten-smelters-list/" }];
function rmapHtml(s) {
  const r = RMAP[s.id];
  if (!r) return "";
  return `<div class="v11-card ok"><div class="v11-k">${T("Responsible sourcing", "Odpovědné získávání")}</div><p>${esc(T(r.en, r.cs))}</p>${srcLinks(r.src.concat(RMI_LISTS))}</div>`;
}

/* ---- 4. water stress and tree-cover loss around each site (static, see method) ---- */
const SITE_CTX = {"water":{"bayan-obo":{"label":"Arid and Low Water Use","cat":-1,"score":5},"mountain-pass":{"label":"Extremely High (>80%)","cat":4,"score":5},"mount-weld":{"label":"Arid and Low Water Use","cat":-1,"score":5},"lynas-kuantan":{"label":"Low (<10%)","cat":0,"score":0},"sillamae":{"label":"High (40-80%)","cat":3,"score":3.38470988435},"narva":{"label":"Low (<10%)","cat":0,"score":0},"panzhihua":{"label":"Low (<10%)","cat":0,"score":0},"tellnes":{"label":"Low (<10%)","cat":0,"score":0},"irshansk":{"label":"Low (<10%)","cat":0,"score":0},"vilnohirsk":{"label":"Low (<10%)","cat":0,"score":0},"richards-bay":{"label":"Low (<10%)","cat":0,"score":0.77805405747},"mittersill":{"label":"Low (<10%)","cat":0,"score":0.54822069512},"panasqueira":{"label":"Extremely High (>80%)","cat":4,"score":4.04047856011},"ganzhou":{"label":"Low (<10%)","cat":0,"score":0},"xikuangshan":{"label":"Low (<10%)","cat":0,"score":0},"stibnite":{"label":"Low (<10%)","cat":0,"score":0},"metlen-gallium":{"label":"High (40-80%)","cat":3,"score":3.6804102126},"umicore-olen":{"label":"Extremely High (>80%)","cat":4,"score":4.47076568102},"kipushi":{"label":"Low (<10%)","cat":0,"score":0},"greenbushes":{"label":"Low (<10%)","cat":0,"score":0},"atacama":{"label":"Arid and Low Water Use","cat":-1,"score":5},"cinovec":{"label":"Medium - High (20-40%)","cat":2,"score":2.10954083848},"jadar":{"label":"Low (<10%)","cat":0,"score":0},"tenke":{"label":"Low (<10%)","cat":0,"score":0},"mutanda":{"label":"Low (<10%)","cat":0,"score":0},"kokkola":{"label":"Medium - High (20-40%)","cat":2,"score":2.71580218243},"norilsk":{"label":"Low (<10%)","cat":0,"score":0.6312517132},"imip":{"label":"Low (<10%)","cat":0,"score":0},"terrafame":{"label":"Low (<10%)","cat":0,"score":0},"balama":{"label":"Low - Medium (10-20%)","cat":1,"score":1.27864192525},"vittangi":{"label":"Low (<10%)","cat":0,"score":0}},"forest":{"bayan-obo":{"radiusKm":5,"forest2000Ha":0,"areaHa":6045,"lossHa":0,"byYear":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"years":[2001,2024]},"mountain-pass":{"radiusKm":5,"forest2000Ha":0,"areaHa":7854,"lossHa":0,"byYear":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"years":[2001,2024]},"mount-weld":{"radiusKm":5,"forest2000Ha":0,"areaHa":7854,"lossHa":0,"byYear":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"years":[2001,2024]},"lynas-kuantan":{"radiusKm":5,"forest2000Ha":2180,"areaHa":7855,"lossHa":945,"byYear":[3.8,11.8,18.5,64.1,55.4,8.1,5.9,23.1,18.7,38.0,43.3,36.4,14.8,68.6,54.3,183.4,39.9,41.4,65.7,17.3,20.9,26.0,48.8,37.1],"years":[2001,2024]},"sillamae":{"radiusKm":5,"forest2000Ha":2705,"areaHa":7854,"lossHa":543,"byYear":[1.7,5.6,9.3,7.0,8.4,25.1,12.1,8.7,6.9,5.2,5.9,16.8,7.3,11.3,24.4,34.1,18.5,56.7,36.9,34.5,108.0,24.2,52.0,22.2],"years":[2001,2024]},"narva":{"radiusKm":5,"forest2000Ha":2859,"areaHa":7854,"lossHa":86,"byYear":[0.5,1.0,0.2,1.5,2.6,4.8,2.7,2.3,1.1,0.4,1.2,3.0,4.6,1.4,26.7,1.4,4.9,9.8,6.3,1.7,2.1,1.8,3.0,0.8],"years":[2001,2024]},"panzhihua":{"radiusKm":5,"forest2000Ha":1658,"areaHa":7853,"lossHa":25,"byYear":[0.0,0.0,0.3,0.1,0.8,0.6,0.0,0.1,0.7,0.8,0.8,0.4,0.1,0.1,0.0,6.4,6.5,0.0,0.1,3.5,1.8,0.1,2.1,0.0],"years":[2001,2024]},"tellnes":{"radiusKm":5,"forest2000Ha":2661,"areaHa":7854,"lossHa":213,"byYear":[7.0,14.8,56.0,4.7,10.9,12.9,10.1,1.4,1.8,9.2,0.8,0.0,1.2,1.3,1.7,1.5,0.0,1.2,35.3,20.0,11.1,7.3,0.9,1.6],"years":[2001,2024]},"irshansk":{"radiusKm":5,"forest2000Ha":5037,"areaHa":7854,"lossHa":1579,"byYear":[12.5,29.5,38.0,69.0,66.5,50.4,109.9,90.1,46.0,172.3,73.9,84.4,30.4,34.5,60.8,236.6,68.7,39.1,90.7,46.0,31.1,25.8,50.7,22.4],"years":[2001,2024]},"vilnohirsk":{"radiusKm":5,"forest2000Ha":332,"areaHa":7854,"lossHa":4,"byYear":[0.0,0.2,0.1,0.0,0.1,0.5,0.6,0.2,0.2,0.0,0.0,0.0,0.0,0.0,0.0,0.1,0.0,1.7,0.0,0.0,0.0,0.0,0.0,0.0],"years":[2001,2024]},"richards-bay":{"radiusKm":5,"forest2000Ha":5064,"areaHa":7856,"lossHa":4221,"byYear":[311.0,77.3,120.9,570.5,23.2,60.5,492.7,148.9,395.9,56.0,207.4,583.1,261.3,263.6,162.7,155.8,75.7,53.2,38.2,69.6,27.6,41.2,13.0,11.6],"years":[2001,2024]},"mittersill":{"radiusKm":5,"forest2000Ha":4066,"areaHa":7854,"lossHa":322,"byYear":[6.8,2.8,109.9,30.9,26.9,27.9,15.7,41.0,2.1,6.0,2.7,21.2,1.6,2.1,1.1,1.8,3.9,2.7,7.5,2.8,0.5,1.3,1.3,1.9],"years":[2001,2024]},"panasqueira":{"radiusKm":5,"forest2000Ha":5658,"areaHa":7852,"lossHa":2973,"byYear":[143.2,43.6,4.9,45.3,135.9,112.5,31.4,55.9,89.4,123.8,69.5,60.0,79.7,182.4,145.8,265.0,138.6,17.5,40.8,455.2,66.0,179.3,261.1,225.9],"years":[2001,2024]},"ganzhou":{"radiusKm":5,"forest2000Ha":41,"areaHa":7856,"lossHa":7,"byYear":[0.1,0.8,0.1,0.1,0.0,0.0,0.0,0.4,0.0,0.3,0.0,1.0,0.1,0.3,1.3,0.6,1.0,0.1,0.0,0.1,0.0,0.5,0.0,0.1],"years":[2001,2024]},"xikuangshan":{"radiusKm":5,"forest2000Ha":2897,"areaHa":7854,"lossHa":84,"byYear":[0.3,0.3,0.0,2.0,16.7,0.5,1.2,1.0,2.7,0.0,15.6,8.6,0.2,0.0,0.9,2.4,1.1,1.2,1.2,5.2,10.4,6.5,2.5,3.2],"years":[2001,2024]},"stibnite":{"radiusKm":5,"forest2000Ha":6258,"areaHa":7853,"lossHa":3197,"byYear":[757.7,2.6,16.3,43.6,25.6,60.4,1579.0,483.2,22.5,112.5,59.7,7.7,10.8,1.8,0.2,0.0,0.1,0.0,12.6,0.0,0.0,0.6,0.0,0.0],"years":[2001,2024]},"metlen-gallium":{"radiusKm":5,"forest2000Ha":507,"areaHa":7854,"lossHa":217,"byYear":[0.1,0.0,0.0,0.1,0.0,79.2,2.5,0.0,0.0,0.5,0.2,0.2,0.0,0.0,0.0,0.0,0.2,0.1,0.1,0.5,0.0,0.6,124.6,8.0],"years":[2001,2024]},"umicore-olen":{"radiusKm":5,"forest2000Ha":2373,"areaHa":7855,"lossHa":203,"byYear":[0.4,5.0,0.0,0.4,9.7,6.9,3.0,0.2,13.8,26.4,17.8,6.8,2.6,6.8,6.8,3.8,6.5,17.5,12.1,7.1,13.4,5.1,23.1,8.1],"years":[2001,2024]},"kipushi":{"radiusKm":5,"forest2000Ha":395,"areaHa":7854,"lossHa":104,"byYear":[0.3,0.0,0.6,0.3,0.2,0.0,0.9,0.1,0.5,0.0,1.1,2.4,2.2,4.2,2.7,4.9,11.8,14.3,7.7,15.8,7.3,4.1,3.5,18.7],"years":[2001,2024]},"greenbushes":{"radiusKm":5,"forest2000Ha":4934,"areaHa":7853,"lossHa":793,"byYear":[20.6,25.5,4.8,1.2,6.5,40.1,10.3,60.6,95.7,6.6,0.6,9.6,29.7,16.0,1.4,1.4,51.4,29.3,49.5,38.5,60.7,124.8,68.4,39.6],"years":[2001,2024]},"atacama":{"radiusKm":5,"forest2000Ha":0,"areaHa":7854,"lossHa":0,"byYear":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"years":[2001,2024]},"cinovec":{"radiusKm":5,"forest2000Ha":4166,"areaHa":7854,"lossHa":297,"byYear":[0.3,2.4,0.1,8.0,1.9,2.1,7.8,5.1,12.3,2.8,7.1,7.0,5.2,15.9,7.8,10.2,5.8,5.4,33.6,58.8,39.8,16.2,26.2,14.9],"years":[2001,2024]},"jadar":{"radiusKm":5,"forest2000Ha":1889,"areaHa":7855,"lossHa":20,"byYear":[0.2,0.6,0.0,0.8,0.9,0.1,0.0,1.4,0.9,2.8,1.7,0.6,0.0,0.2,0.3,1.8,1.4,0.3,0.6,2.5,0.7,1.0,0.4,0.6],"years":[2001,2024]},"tenke":{"radiusKm":5,"forest2000Ha":4606,"areaHa":7854,"lossHa":1719,"byYear":[0.5,30.1,10.0,1.5,6.0,1.8,24.7,0.0,274.9,100.0,57.0,178.6,23.2,86.7,66.4,69.4,35.7,73.4,117.4,75.2,79.8,201.6,81.4,124.0],"years":[2001,2024]},"mutanda":{"radiusKm":5,"forest2000Ha":6850,"areaHa":7855,"lossHa":2637,"byYear":[0.7,26.8,47.8,0.9,2.1,9.5,4.9,0.0,297.5,50.3,147.7,180.8,151.3,189.1,194.8,119.4,125.6,333.4,190.4,144.3,132.6,70.7,53.2,162.9],"years":[2001,2024]},"kokkola":{"radiusKm":5,"forest2000Ha":2625,"areaHa":7854,"lossHa":485,"byYear":[6.3,16.8,4.0,12.0,25.2,14.1,17.5,6.5,25.4,18.6,12.2,18.8,17.1,14.7,10.5,14.0,63.0,47.5,23.7,14.5,50.5,14.1,17.0,21.4],"years":[2001,2024]},"norilsk":{"radiusKm":5,"forest2000Ha":79,"areaHa":7855,"lossHa":0,"byYear":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.1,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.1,0.0,0.0,0.0],"years":[2001,2024]},"imip":{"radiusKm":5,"forest2000Ha":4553,"areaHa":7856,"lossHa":2895,"byYear":[14.3,31.1,5.0,70.0,0.0,25.2,28.2,11.5,31.4,22.2,27.3,112.4,44.5,353.8,215.8,250.9,195.2,218.3,479.0,161.1,319.9,136.6,84.0,57.0],"years":[2001,2024]},"terrafame":{"radiusKm":5,"forest2000Ha":7156,"areaHa":7855,"lossHa":3658,"byYear":[21.5,26.0,0.1,20.0,10.5,19.4,487.9,428.2,197.0,182.8,153.8,74.9,226.8,323.0,106.0,121.6,193.2,153.0,63.4,48.7,244.1,145.2,278.2,133.2],"years":[2001,2024]},"balama":{"radiusKm":5,"forest2000Ha":870,"areaHa":7855,"lossHa":65,"byYear":[2.1,2.5,2.3,2.1,1.4,6.6,2.0,6.0,16.4,6.7,0.0,1.3,0.3,1.0,1.5,3.8,2.7,0.0,0.2,0.8,1.0,0.0,1.1,3.5],"years":[2001,2024]},"vittangi":{"radiusKm":5,"forest2000Ha":4484,"areaHa":7855,"lossHa":395,"byYear":[0.1,31.6,15.0,15.5,0.7,0.7,18.1,72.6,42.3,20.9,6.4,57.9,2.9,0.5,1.4,2.2,3.6,0.1,0.1,31.1,19.2,33.4,8.6,10.1],"years":[2001,2024]}},"sources":{"water":{"t":"WRI Aqueduct 4.0 baseline water stress (via Resource Watch)","u":"https://www.wri.org/aqueduct"},"forest":{"t":"Hansen/UMD/Google/USGS/NASA Global Forest Change v1.12 (2001-2024), tree cover \u226530% in 2000","u":"https://glad.earthengine.app/view/global-forest-change"}}};
const WATER_CS = { "Low (<10%)": "Nízký (<10 %)", "Low - Medium (10-20%)": "Nízký až střední (10–20 %)", "Medium - High (20-40%)": "Střední až vysoký (20–40 %)", "High (40-80%)": "Vysoký (40–80 %)", "Extremely High (>80%)": "Extrémně vysoký (>80 %)", "Arid and Low Water Use": "Suchá oblast s malou spotřebou vody" };
function lineSvg(series, color, label) {
  const vals = series.map((p) => +p[1]).filter((v) => isFinite(v));
  if (vals.length < 3) return "";
  const w = 300, h = 54, pad = 4, mn = Math.min(...vals), mx = Math.max(...vals), span = mx - mn || 1;
  const pts = vals.map((v, i) => `${(pad + i * (w - 2 * pad) / (vals.length - 1)).toFixed(1)},${(h - pad - (v - mn) / span * (h - 2 * pad)).toFixed(1)}`).join(" ");
  const last = pts.split(" ").pop().split(",");
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="${esc(label || "")}"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.8" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><circle cx="${last[0]}" cy="${last[1]}" r="3" fill="${color}"/></svg>`;
}
function barsSvg(vals, color, labels) {
  const w = 300, h = 46, n = vals.length, mx = Math.max(1, ...vals), bw = w / n;
  return `<svg class="bars" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="${esc(labels || "")}">${vals.map((v, i) => { const bh = Math.max(v > 0 ? 1.5 : 0, (h - 2) * v / mx); return `<rect x="${(i * bw + bw * 0.12).toFixed(1)}" y="${(h - bh).toFixed(1)}" width="${(bw * 0.76).toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}"/>`; }).join("")}</svg>`;
}
function ctxHtml(s) {
  const w = SITE_CTX.water[s.id], f = SITE_CTX.forest[s.id];
  if (!w && !f) return "";
  const parts = [];
  if (w) parts.push(`<div class="v11-row"><span>${T("Water stress", "Vodní stres")}</span><b class="${w.cat >= 3 ? "hi" : ""}">${esc(LANG === "cs" ? (WATER_CS[w.label] || w.label) : w.label)}</b></div>`);
  if (f) {
    if (f.forest2000Ha < 50) parts.push(`<div class="v11-row"><span>${T("Tree cover within 5 km", "Lesní porost do 5 km")}</span><b>${T("almost none in 2000", "v roce 2000 téměř žádný")}</b></div>`);
    else {
      const recent = f.byYear.slice(-5).reduce((a, b) => a + b, 0);
      parts.push(`<div class="v11-row"><span>${T("Tree cover lost within 5 km, 2001–2024", "Ztráta lesního porostu do 5 km, 2001–2024")}</span><b>${nf(f.lossHa)} ha · ${pctOf(f.lossHa, f.forest2000Ha)}%</b></div>
        ${barsSvg(f.byYear, "var(--live)", T("Tree-cover loss by year", "Ztráta porostu po letech"))}
        <div class="bars-ax"><span>2001</span><span>${T(`${nf(recent)} ha in 2020–2024`, `${nf(recent)} ha v letech 2020–2024`)}</span><span>2024</span></div>`);
    }
  }
  return `<div class="v11-card"><div class="v11-k">${T("Around the site", "V okolí")}</div>${parts.join("")}
    <p class="muted">${T("Tree-cover loss counts any cause: mining, logging, plantation harvest or fire. Water stress is the share of available water already used in the river basin.", "Ztráta porostu zahrnuje všechny příčiny: těžbu, kácení, sklizeň plantáží i požáry. Vodní stres je podíl dostupné vody, který se v povodí už spotřebuje.")}</p>
    ${srcLinks([{ t: "WRI Aqueduct 4.0", u: SITE_CTX.sources.water.u }, { t: "Hansen/UMD Global Forest Change v1.12", u: SITE_CTX.sources.forest.u }])}</div>`;
}

/* ---- 5. armed conflict (UCDP candidate events), live doc live/conflict ---- */
const CF_AREA_NAME = { "choke:suez": ["Yemen, within 400 km of Bab-el-Mandeb", "Jemen do 400 km od Bab al-Mandabu"], "choke:malacca": ["Strait of Malacca", "Malacký průliv"], "route:lobito": ["Lobito Corridor, Angola", "Lobitský koridor, Angola"], "route:lobito-cd": ["Copperbelt end of the Lobito Corridor", "Konec Lobitského koridoru v měděném pásu"] };
const cfName = (w) => CF_AREA_NAME[w] ? T(...CF_AREA_NAME[w]) : (SITE_BY_ID[w] ? SITE_BY_ID[w].name : w);
const cfPeriod = () => { const C = LIVE.conflict; return C && C.from ? `${fmtDay(C.from)} – ${fmtDay(C.to)}` : ""; };
const CF_TYPE = { 1: ["state-based", "státní konflikt"], 2: ["non-state", "nestátní konflikt"], 3: ["one-sided, against civilians", "jednostranné násilí proti civilistům"] };
function cfAreaHtml(w, radius) {
  const C = LIVE.conflict;
  const a = C && C.areas && C.areas[w];
  if (!a) return "";
  const months = Object.keys(a.byMonth).sort();
  const types = Object.entries(a.types || {}).sort((x, y) => y[1] - x[1]).map(([k, n]) => LANG === "cs" ? `${(CF_TYPE[k] || [0, "jiné"])[1]}: ${n}` : `${n} ${(CF_TYPE[k] || ["other"])[0]}`).join(LANG === "cs" ? " · " : ", ");   // build 56: Czech reads "státní konflikt: 2"
  const rec = (C.recent || []).filter((e) => e.w === w).slice(0, 3);
  return `<div class="v11-card warn"><div class="v11-k">${T("Armed conflict nearby", "Ozbrojený konflikt v okolí")}</div>
    <div class="v11-big"><b>${nf(a.n)}</b><span>${T(`event${a.n === 1 ? "" : "s"} within ${radius} km, ${cfPeriod()}`, `${a.n === 1 ? "událost" : a.n < 5 ? "události" : "událostí"} do ${radius} km, ${cfPeriod()}`)}</span></div>
    <div class="v11-row"><span>${T("Deaths recorded (best estimate)", "Zaznamenaná úmrtí (nejlepší odhad)")}</span><b>${nf(a.deaths)}</b></div>
    <p class="muted">${esc(types)}</p>
    ${rec.length ? `<ul class="v11-ev">${rec.map((e) => `<li><span>${esc(fmtDay(e.d))}</span>${esc(LANG === "cs" ? String(e.where).replace(/\s+(town|city|village)$/i, "") : e.where)}, ${esc(csCountry(e.country))} · ${esc(ucdpActor(e.a))} – ${esc(ucdpActor(e.b))}${e.deaths ? ` · ${e.deaths} †` : ""}</li>`).join("")}</ul>` : ""}
    <p class="srcs">UCDP Candidate Events · ${T("preliminary, revised monthly", "předběžné, měsíčně revidované")} · <a href="https://ucdp.uu.se/downloads/" target="_blank" rel="noopener">UCDP</a></p></div>`;
}
let CF = [];
function conflictMarkers() {
  const C = LIVE.conflict;
  if (!C || !Array.isArray(C.clusters)) return [];
  const raw = C.clusters.filter((c) => typeof c.lat === "number" && typeof c.lng === "number"), groups = [];
  raw.slice().sort((a, b) => (b.n || 0) - (a.n || 0)).forEach((c) => {
    const g = groups.find((x) => { const dy = x.lat - c.lat, dx = (x.lng - c.lng) * Math.cos(x.lat * Math.PI / 180); return dx * dx + dy * dy < 2.3 * 2.3; });
    if (!g) { groups.push(Object.assign({}, c, { places: [c.where] })); return; }
    const n0 = g.n || 1, n1 = c.n || 1;
    g.lat = (g.lat * n0 + c.lat * n1) / (n0 + n1); g.lng = (g.lng * n0 + c.lng * n1) / (n0 + n1);
    g.n = n0 + n1; g.deaths = (g.deaths || 0) + (c.deaths || 0);
    if (String(c.last) > String(g.last)) g.last = c.last;
    if (c.where && !g.places.includes(c.where)) g.places.push(c.where);
  });
  groups.forEach((g) => { if (g.places.length > 1) g.where = g.places.slice(0, 3).join(", ") + (g.places.length > 3 ? " …" : ""); });
  return groups.map((c, i) => ({
    id: "cf-" + i, kind: "CF", src: "UCDP", lat: c.lat, lng: c.lng, t: parseDay(c.last), n: c.n, deaths: c.deaths, area: c.w,
    title: T(`Armed conflict: ${c.n} event${c.n > 1 ? "s" : ""}`, `Ozbrojený konflikt: ${c.n} událostí`), place: `${c.where}, ${c.country}`,
    detail: T(`${c.n} events and ${c.deaths} deaths recorded nearby, ${cfPeriod()}. Last: ${fmtDay(c.last)}.`, `${c.n} ${csPlural(c.n, "událost", "události", "událostí")} a ${c.deaths} úmrtí v okolí, ${cfPeriod()}. Poslední: ${fmtDay(c.last)}.`),
    url: "https://ucdp.uu.se/", short: `${c.n} ${T(c.n === 1 ? "event" : "events", csPlural(c.n, "událost", "události", "událostí"))}`, color: "#d2b0ff", r: 0.0062 + Math.min(0.026, Math.sqrt(c.n) * 0.0016),
    pp: c.n >= 100 ? 1100 : c.n >= 25 ? 1600 : c.n >= 5 ? 2200 : 3200, amp: c.n >= 100 ? 2.4 : c.n >= 25 ? 2.0 : c.n >= 5 ? 1.6 : 1.1, big: c.n >= 10
  }));
}
const hzForGlobe = () => nearFilter(layers.conflict ? HZ.concat(CF) : HZ);
function onConflict() {
  CF = conflictMarkers();
  CF.forEach((h) => { HZ_BY_ID[h.id] = h; });
  if (globe) globe.setHazards(hzForGlobe());
}

/* ---- 6. ship traffic at chokepoints and ports (IMF PortWatch), live doc live/traffic ---- */
const PW_NAME = { malacca: ["Strait of Malacca", "Malacký průliv"], babelmandeb: ["Bab-el-Mandeb", "Bab al-Mandab"], suez: ["Suez Canal", "Suezský průplav"], cape: ["Cape of Good Hope", "Mys Dobré naděje"] };
const PORT_NAME = { lobito: "Lobito", bunbury: "Bunbury", imip: "IMIP Morowali", kuantan: "Kuantan", "richards-bay": "Richards Bay", nacala: "Nacala", mejillones: "Mejillones", antofagasta: "Antofagasta", esperance: "Esperance", rotterdam: "Rotterdam" };
const PORT_OF = { kipushi: ["lobito"], tenke: ["lobito"], mutanda: ["lobito"], greenbushes: ["bunbury"], imip: ["imip"], "lynas-kuantan": ["kuantan"], "richards-bay": ["richards-bay"], balama: ["nacala"], atacama: ["mejillones", "antofagasta"] };
const CHOKE_PW = { malacca: ["malacca"], suez: ["suez", "babelmandeb"], cape: ["cape"] };
const sum = (a) => a.reduce((x, y) => x + (+y || 0), 0);
function ma(a, k) { const out = []; for (let i = 0; i < a.length; i++) { const s = a.slice(Math.max(0, i - k + 1), i + 1); out.push(sum(s) / s.length); } return out; }
function cpStats(id) {
  const P = LIVE.traffic && LIVE.traffic.chokepoints && LIVE.traffic.chokepoints[id];
  if (!P || !Array.isArray(P.total) || P.total.length < 30) return null;
  const t = P.total, n = t.length;
  const last7 = sum(t.slice(-7)) / 7;
  const prev = n > 371 ? sum(t.slice(n - 372, n - 365)) / 7 : null;
  return { id, last: P.last, last7, prev, chg: prev ? Math.round((last7 / prev - 1) * 100) : null, series: ma(t, 7).slice(-365).map((v, i) => [i, v]) };
}
function portStats(id) {
  const P = LIVE.traffic && LIVE.traffic.ports && LIVE.traffic.ports[id];
  if (!P || !Array.isArray(P.calls) || P.calls.length < 30) return null;
  const c = P.calls, e = P.export || [], n = c.length;
  return { id, name: PORT_NAME[id] || P.name, last: P.last, calls30: sum(c.slice(-30)), prev30: n > 395 ? sum(c.slice(n - 395, n - 365)) : null, exp30: sum(e.slice(-30)) };
}
const chgTxt = (chg) => chg == null ? "" : `<span class="${chg >= 0 ? "up" : "down"}">${chg >= 0 ? "+" : ""}${chg}% ${T("vs a year ago", "proti loňsku")}</span>`;
function cpTrafficHtml(id) {
  const s = cpStats(id);
  if (!s) return "";
  return `<div class="v11-tr"><div class="v11-tr-h"><b>${esc(T(...PW_NAME[id]))}</b>${chgTxt(s.chg)}</div>
    <div class="v11-big"><b>${nf(s.last7, 0)}</b><span>${T("ships a day, 7-day average", "lodí denně, 7denní průměr")}</span></div>
    ${lineSvg(s.series, "var(--live)", T("Ships a day over the past year", "Lodě denně za poslední rok"))}<div class="bars-ax"><span>${T("a year ago", "před rokem")}</span><span>${esc(fmtDay(s.last))}</span></div></div>`;
}
function portRowHtml(id) {
  const p = portStats(id);
  if (!p) return "";
  const chg = p.prev30 ? Math.round((p.calls30 / p.prev30 - 1) * 100) : null;
  return `<div class="v11-row"><span>${esc(p.name)}: ${T("port calls, last 30 days", "zastávky lodí za 30 dní")}</span><b>${nf(p.calls30)}${chg != null ? ` <small class="${chg >= 0 ? "up" : "down"}">${chg >= 0 ? "+" : ""}${chg}%</small>` : ""}</b></div>
    <div class="v11-row"><span>${T("Estimated exports, last 30 days", "Odhadovaný vývoz za 30 dní")}</span><b>${nf(p.exp30 / 1000, 0)} kt</b></div>`;
}
const pwSrc = () => `<p class="srcs">IMF PortWatch (IMF, Oxford, TU Delft) · ${T("vessel counts from satellite AIS", "počty lodí ze satelitního AIS")}${LIVE.traffic ? ` · ${T("data to", "data do")} ${esc(fmtDay((LIVE.traffic.chokepoints.malacca || {}).last))}` : ""} · <a href="https://portwatch.imf.org" target="_blank" rel="noopener">portwatch.imf.org</a></p>`;
function sitePortHtml(s) {
  const ids = PORT_OF[s.id];
  if (!ids || !LIVE.traffic) return "";
  const rows = ids.map(portRowHtml).filter(Boolean);
  if (!rows.length) return "";
  const lob = ids[0] === "lobito";
  return `<div class="v11-card"><div class="v11-k">${lob ? T("Port traffic on the Lobito Corridor", "Provoz v přístavu Lobitského koridoru") : T("Port traffic nearby", "Provoz v blízkém přístavu")}</div>${rows.join("")}${lob ? `<p class="muted">${T("The Lobito Corridor links the Copperbelt to the Atlantic; much of the region's output still leaves through Dar es Salaam and Durban.", "Lobitský koridor spojuje měděný pás s Atlantikem; velká část produkce regionu ale dosud odchází přes Dar es Salaam a Durban.")}</p>` : ""}${pwSrc()}</div>`;
}

/* ---- 7. EU imports by origin (Eurostat Comext), live doc live/trade ---- */
const TRADE_CS = { "Permanent magnets of metal": "Kovové permanentní magnety", "Rare-earth compounds": "Sloučeniny vzácných zemin", "Rare-earth metals": "Kovy vzácných zemin", "Unwrought gallium": "Surové galium", "Unwrought germanium": "Surové germanium", "Unwrought antimony": "Surový antimon", "Antimony oxides": "Oxidy antimonu", "Unwrought tungsten": "Surový wolfram", "Tungsten ores": "Wolframové rudy", "Unwrought titanium (sponge)": "Surový titan (houba)", "Titanium ores": "Titanové rudy", "Lithium carbonate": "Uhličitan lithný", "Lithium oxide and hydroxide": "Oxid a hydroxid lithný", "Cobalt mattes and unwrought cobalt": "Kobaltové kamínky a surový kobalt", "Cobalt oxides and hydroxides": "Oxidy a hydroxidy kobaltu", "Unwrought nickel": "Surový nikl", "Nickel mattes": "Niklové kamínky", "Artificial graphite": "Syntetický grafit", "Natural flake graphite": "Přírodní vločkový grafit",
  /* build 56: magnesium and manganese (added Nov 2026) had no Czech labels */
  "Unwrought magnesium, 99.8% or more": "Neopracovaný hořčík, nejméně 99,8\u00a0%", "Other unwrought magnesium": "Ostatní neopracovaný hořčík", "Manganese metal and articles": "Kovový mangan a\u00a0výrobky z\u00a0něj", "Manganese ores": "Manganové rudy" };
function tradeRows(m) {
  const D = LIVE.trade && LIVE.trade.materials && LIVE.trade.materials[m];
  return Array.isArray(D) ? D : [];
}
const tradeYear = (r) => { const ys = Object.keys(r.years || {}).sort(); return ys.length ? ys[ys.length - 1] : null; };
function tradeTop(r) {
  const y = tradeYear(r);
  if (!y) return null;
  const Y = r.years[y];
  const top = (Y.top || [])[0];
  return top ? { y, cc: top[0], pct: pctOf(top[1], Y.eur), eur: Y.eur, t: Y.t, cn: pctOf(Y.cn, Y.eur), list: Y.top } : null;
}
function tradeBlock(m, compact) {
  const rows = tradeRows(m);
  if (!rows.length) return "";
  return `<div class="v11-card"><div class="v11-k">${T("EU imports from outside the EU", "Dovoz do EU ze zemí mimo EU")}</div>${rows.map((r) => {
    const tp = tradeTop(r);
    if (!tp) return "";
    const lab = LANG === "cs" ? (TRADE_CS[r.label] || r.label) : r.label;
    const mo = r.monthly || {};
    const share = (mo.ext || []).map((v, i) => [i, v ? 100 * (mo.cn[i] || 0) / v : 0]);
    return `<div class="v11-trade"><div class="v11-row"><span><b>${esc(lab)}</b> · ${esc(tp.y)}</span><b>${fmtEur(tp.eur)}${tp.t ? ` · ${nf(tp.t, tp.t < 100 ? 1 : 0)} t` : ""}</b></div>
      <div class="v11-stack">${tp.list.slice(0, 5).map(([cc, v], i) => `<span style="flex:${Math.max(1, v)};background:${cc === "CN" ? "var(--" + m + ")" : "rgba(160,170,175," + (0.55 - i * 0.08) + ")"}" title="${esc(iso2(cc))} ${pctOf(v, tp.eur)}%"></span>`).join("")}<span style="flex:${Math.max(0, tp.eur - sum(tp.list.slice(0, 5).map((x) => x[1])))};background:var(--track)"></span></div>
      <div class="v11-leg">${tp.list.slice(0, compact ? 3 : 5).map(([cc, v]) => `<span><i style="background:${cc === "CN" ? "var(--" + m + ")" : "rgba(160,170,175,.5)"}"></i>${esc(iso2(cc))} ${pctOf(v, tp.eur)}%</span>`).join("")}</div>
      ${!compact && share.length > 5 ? `<div class="v11-row"><span>${T(`China's share by month, ${MON_SHORT(mo.from)} to now`, `Podíl Číny po měsících od ${monGenYm(mo.from)}`)}</span><b>${Math.round(share[share.length - 1][1])}%</b></div>${lineSvg(share, "var(--" + m + ")", T("China's share of EU imports by month", "Podíl Číny na dovozu do EU po měsících"))}` : ""}
      ${tp.pct > 65 ? `<p class="muted">${T(`${iso2(tp.cc)} supplies ${tp.pct}% of these imports, above the 65% the EU aims for by 2030.`, `${iso2(tp.cc)} dodává ${tp.pct} % tohoto dovozu, víc než 65 %, které chce EU do roku 2030.`)}</p>` : ""}</div>`;
  }).join("")}
  <p class="srcs">Eurostat Comext, ${T("value of imports by country of origin", "hodnota dovozu podle země původu")} · ${T("updated", "aktualizace")} ${LIVE.trade ? esc(fmtAgo(Date.now() - isoMs(LIVE.trade.fetchedAt))) : ""} · <a href="https://ec.europa.eu/eurostat/comext/newxtweb/" target="_blank" rel="noopener">Comext</a></p></div>`;
}

/* ---- 8. public money for supply outside China ---- */
const FUNDING = [
  { d: "2026-10-03", m: ["ree"], who: "US–Ukraine Reconstruction Investment Fund", amt: "~$30m", en: "First deal of the fund set up under the April 2025 minerals agreement: BGV Group's rare-earth, uranium, beryllium and zirconium deposits.", cs: "První obchod fondu zřízeného na základě dohody o nerostech z dubna 2025: ložiska vzácných zemin, uranu, berylia a zirkonia firmy BGV Group.", src: { t: "Kitco/Reuters", u: "https://www.kitco.com/news/off-the-wire/2026-10-05/us-ukrainian-investment-fund-seals-first-critical-minerals-deal" } },
  { d: "2026-05-21", m: ["sb"], site: "stibnite", who: "US Export-Import Bank", amt: "$2.9bn", en: "Loan for Perpetua's Stibnite gold-antimony project in Idaho, the only identified US antimony reserve; expected to fully fund construction.", cs: "Úvěr na projekt zlata a antimonu Stibnite firmy Perpetua v Idahu, jedinou známou zásobu antimonu v USA; má plně pokrýt výstavbu.", src: { t: "Mining.com", u: "https://www.mining.com/perpetua-resources-gets-2-9b-exim-loan-for-stibnite-gold-antimony-project-in-idaho/" } },
  { d: "2025-12-18", m: ["co"], site: "kipushi", who: "US DFC and Development Bank of Southern Africa", amt: "$553m + $200m", en: "Loans to the Lobito Atlantic Railway: refurbish the Benguela line and the Lobito minerals port, raising port capacity tenfold to 4.6 Mt.", cs: "Úvěry pro Lobito Atlantic Railway: obnova trati Benguela a minerálního přístavu Lobito, kapacita přístavu vzroste desetkrát na 4,6 mil. t.", src: { t: "Mining Weekly", u: "https://www.miningweekly.com/article/us-agency-consortium-sign-553m-loan-for-angola-railway-revamp-2025-12-18" } },
  { d: "2025-12-03", m: ["ree", "ga", "ge", "w", "sb", "li", "co", "ni", "gr", "ti"], who: "European Commission (RESourceEU)", amt: "€3bn", en: "EU money over 12 months for projects that can supply raw materials quickly, a platform for joint buying, and a coordinated approach to stockpiling.", cs: "Peníze EU na 12 měsíců pro projekty, které mohou suroviny dodat rychle, platforma pro společné nákupy a koordinovaný přístup k zásobám.", src: { t: "European Commission", u: "https://commission.europa.eu/news-and-media/news/new-measures-secure-raw-materials-and-strengthen-eus-economic-security-2025-12-03_en" } },
  { d: "2025-09-19", m: ["ree"], site: "narva", who: "EU Just Transition Fund, Estonia", amt: "", en: "Neo's magnet plant in Narva opens, Europe's largest; built with EU Just Transition Fund support.", cs: "Otevírá se závod na magnety firmy Neo v Narvě, největší v Evropě; postaven s podporou Fondu EU pro spravedlivou transformaci.", src: { t: "Government of Estonia", u: "https://valitsus.ee/en/news/michal-opening-neos-magnet-plant-future-europes-competitiveness-being-built-ida-viru-county" } },
  { d: "2025-07-10", m: ["ree"], site: "mountain-pass", who: "US Department of Defense", amt: "$400m + $150m loan", en: "Equity in MP Materials, a $110/kg floor price for NdPr and a 10-year deal to buy all magnets from a new US plant; banks add $1bn.", cs: "Kapitálový vstup do MP Materials, minimální cena NdPr 110 USD/kg a desetiletý odběr všech magnetů z nového závodu v USA; banky přidávají 1 mld. USD.", src: { t: "Mining.com", u: "https://www.mining.com/mp-materials-lands-multi-billion-pentagon-deal/" } },
  { d: "2025-06-04", m: ["li", "ni", "co", "gr", "ree"], who: "European Commission", amt: "", en: "13 strategic projects outside the EU: ten for battery materials, two for rare earths.", cs: "13 strategických projektů mimo EU: deset pro bateriové suroviny, dva pro vzácné zeminy.", src: { t: "electrive", u: "https://www.electrive.com/2025/06/05/eu-announces-13-critical-raw-materials-projects-in-third-countries" } },
  { d: "2025-03-25", m: ["li", "ni", "gr", "co", "w"], site: "cinovec", who: "European Commission", amt: "€22.5bn capex", en: "First 47 strategic projects in 13 EU countries: 22 lithium, 12 nickel, 11 graphite, 10 cobalt, 3 tungsten. They include Cínovec (lithium) and Talga's graphite mine in Sweden.", cs: "Prvních 47 strategických projektů ve 13 zemích EU: 22 lithium, 12 nikl, 11 grafit, 10 kobalt, 3 wolfram. Patří mezi ně Cínovec (lithium) a grafitový důl Talgy ve Švédsku.", src: { t: "White & Case", u: "https://www.whitecase.com/insight-alert/strategic-projects-eu-list-47-strategic-projects-announced" } }
];
function fundRow(f, compact) {
  return `<li class="fund"><div class="fund-d"><b>${esc(fmtDay(f.d))}</b>${f.amt ? `<span>${esc(f.amt)}</span>` : ""}</div><div><div class="fund-who">${esc(f.who)}</div><p>${esc(T(f.en, f.cs))}</p>
    ${compact ? "" : `<div class="fund-m">${f.m.slice(0, 6).map((m) => `<span><i style="background:var(--${m})"></i>${esc(trStr(MATERIALS[m].name))}</span>`).join("")}${f.m.length > 6 ? `<span>+${f.m.length - 6}</span>` : ""}</div>`}
    <a class="srcs" href="${esc(f.src.u)}" target="_blank" rel="noopener">${esc(f.src.t)}</a></div></li>`;
}

/* ---- 9. demand: EU defence tenders (TED, live doc live/tenders) and SIPRI ---- */
const SIPRI = { year: 2025, world: 2887, worldChg: 2.9, europe: 864, europeChg: 14, burden: 2.5, released: "2026-04-27", u: "https://www.sipri.org/media/press-release/2026/global-military-spending-rise-continues-european-asian-expenditures-surge" };
const TED_NAME = { ammunition: ["Ammunition", "Munice"], explosives: ["Explosives", "Výbušniny"], weapons: ["Weapons, ammunition and parts", "Zbraně, munice a díly"] };
function tendersHtml() {
  const D = LIVE.tenders;
  if (!D || !D.series) return `<p class="srcs">${T("Waiting for the tender feed.", "Čekám na data o zakázkách.")}</p>`;
  const months = D.months || [];
  const full = months.length - 1;
  const half = (a, from, to) => sum(a.slice(from, to));
  return ["ammunition", "explosives"].map((k) => {
    const a = (D.series[k] || []).slice(0, full);
    const last12 = half(a, a.length - 12, a.length), prev12 = half(a, a.length - 24, a.length - 12);
    const chg = prev12 ? Math.round((last12 / prev12 - 1) * 100) : null;
    return `<div class="v11-tr"><div class="v11-tr-h"><b>${esc(T(...TED_NAME[k]))}</b>${chg != null ? `<span class="${chg >= 0 ? "up" : "down"}">${chg >= 0 ? "+" : ""}${chg}% ${T("vs the 12 months before", "proti předchozím 12 měsícům")}</span>` : ""}</div>
      <div class="v11-big"><b>${nf(last12)}</b><span>${T("EU tender notices in the last 12 months", "oznámení o zakázkách v EU za 12 měsíců")}</span></div>
      ${barsSvg(a, "var(--text)", "")}<div class="bars-ax"><span>${esc(MON_SHORT(months[0]))}</span><span>${esc(MON_SHORT(months[full - 1]))}</span></div></div>`;
  }).join("") + `<p class="srcs">TED (Tenders Electronic Daily), ${T("CPV 35330000 ammunition and 24610000 explosives; calls for tender and awards", "CPV 35330000 munice a 24610000 výbušniny; výzvy i zadání")} · <a href="https://ted.europa.eu" target="_blank" rel="noopener">ted.europa.eu</a></p>`;
}

/* ---- 10. research on alternatives (Semantic Scholar counts) ---- */
const RESEARCH = {"source":"Semantic Scholar (Allen Institute for AI), papers matching each query by publication year","u":"https://www.semanticscholar.org","years":[2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025],"series":{"ree":{"q":"\"rare-earth-free\" magnet","label":"Rare-earth-free magnets","n":[60,57,45,54,52,63,47,26,58,56,71]},"co":{"q":"\"cobalt-free\" cathode","label":"Cobalt-free battery cathodes","n":[29,23,15,14,34,62,47,85,107,109,131]},"ni":{"q":"\"lithium iron phosphate\" battery","label":"LFP batteries, which need no nickel or cobalt","n":[181,124,162,178,176,169,194,201,235,394,580]},"li":{"q":"\"sodium-ion\" battery","label":"Sodium-ion batteries, which need no lithium","n":[673,938,1178,1525,1529,1713,1653,1487,1658,2341,3056]},"gr":{"q":"\"silicon anode\"","label":"Silicon anodes, which replace part of the graphite","n":[104,129,113,144,166,153,181,208,228,317,386]},"ge":{"q":"\"chalcogenide glass\" infrared","label":"Chalcogenide glass for infrared optics instead of germanium","n":[74,68,51,76,68,53,51,26,43,45,40]},"sb":{"q":"\"antimony-free\"","label":"Antimony-free alternatives (flame retardants, alloys)","n":[8,3,4,1,2,1,1,1,0,2,0]},"w":{"q":"\"tungsten recycling\"","label":"Tungsten recycling","n":[0,0,2,1,1,1,3,0,1,1,2]},"ga":{"q":"\"gallium recovery\"","label":"Gallium recovery and recycling","n":[5,3,2,3,3,3,3,1,6,10,11]},"ti":{"q":"\"titanium recycling\" | \"titanium scrap\"","label":"Titanium recycling","n":[2,7,2,5,7,4,6,1,5,7,6]}}};
const RESEARCH_CS = { ree: "Magnety bez vzácných zemin", co: "Katody baterií bez kobaltu", ni: "Baterie LFP, které nepotřebují nikl ani kobalt", li: "Sodíkové baterie, které nepotřebují lithium", gr: "Křemíkové anody, které nahrazují část grafitu", ge: "Chalkogenidová skla pro infračervenou optiku místo germania" };
function researchHtml(m, compact) {
  const r = RESEARCH.series[m];
  if (!r || Math.max(...r.n) < 20) return "";
  const n = r.n, first = n.slice(0, 3).reduce((a, b) => a + b, 0) / 3, last = n.slice(-3).reduce((a, b) => a + b, 0) / 3;
  return `<div class="v11-card${compact ? " bare" : ""}">${compact ? "" : `<div class="v11-k">${T("Research on alternatives", "Výzkum náhrad")}</div>`}
    <div class="v11-row"><span>${esc(T(r.label, RESEARCH_CS[m] || r.label))}</span><b>${nf(n[n.length - 1])} ${T("papers in", "prací v roce")} ${RESEARCH.years[RESEARCH.years.length - 1]}</b></div>
    ${barsSvg(n, "var(--" + m + ")", "")}<div class="bars-ax"><span>${RESEARCH.years[0]}</span><span>${last >= first ? "×" + nf(last / Math.max(1, first), 1) : "−" + Math.round(100 - 100 * last / first) + "%"} ${T("vs 2015–17", "proti 2015–17")}</span><span>${RESEARCH.years[RESEARCH.years.length - 1]}</span></div>
    ${compact ? `<p class="srcs">${T("Query", "Dotaz")}: ${esc(r.q)}</p>` : `<p class="srcs">${T("Papers matching", "Práce odpovídající dotazu")} ${esc(r.q)} · Semantic Scholar · ${T("a signal of research activity, not of readiness", "ukazatel výzkumné aktivity, ne připravenosti")}</p>`}</div>`;
}

/* ---- 11. lenses: the same material for an executive, a buyer or a policy reader ---- */
let lensPick = "exec";
try { lensPick = localStorage.getItem("cma-lens") || "exec"; } catch (e) { /* storage blocked */ }
function nearSitesRisk(m) {
  const sites = SITES.filter((s) => s.m === m);
  const hz = []; const cf = [];
  sites.forEach((s) => {
    hazardsNearSite(s, 300).slice(0, 1).forEach((x) => hz.push({ s, x }));
    const a = LIVE.conflict && LIVE.conflict.areas && LIVE.conflict.areas[s.id];
    if (a) cf.push({ s, a });
  });
  return { hz, cf };
}
function watchFor(m) { return (WATCH || []).filter((w) => Array.isArray(w.materials) && w.materials.includes(m) && daysUntil(w.date) >= 0).slice(0, 3); }
function lensHtml(m) {
  const mat = MATERIALS[m], top = topStage(m), rows = tradeRows(m), tt = rows.length ? tradeTop(rows[0]) : null;
  const outside = SITES.filter((s) => s.m === m && s.country !== "China");
  const risk = nearSitesRisk(m), wl = watchFor(m), funds = FUNDING.filter((f) => f.m.includes(m)).slice(0, 2);
  const li = (en, cs) => `<li>${T(en, cs)}</li>`;
  let body = "";
  if (lensPick === "exec") {
    body = `<ul class="lens-list">
      ${top ? li(`<b>${esc(pctTxt(top))}</b> of world ${esc((top.what || "mine output").toLowerCase())} comes from ${esc(top.who)} (${esc(top.note)}).`, `<b>${esc(pctTxt(top))}</b> světové produkce (${esc(top.what ? trStr(top.what).toLowerCase() : "těžba")}) pochází ${esc(CTRY_GEN[top.who] ? ooNb0("z " + CTRY_GEN[top.who]) : "z: " + ctry(top.who))} (${esc(trStr(top.note))}).`) : ""}
      ${tt ? li(`EU imports of ${esc(rows[0].label.toLowerCase())} in ${tt.y}: <b>${fmtEur(tt.eur)}</b>, ${tt.pct}% from ${esc(iso2(tt.cc))}.`, `Dovoz do EU (${esc((TRADE_CS[rows[0].label] || rows[0].label).toLowerCase())}) v roce ${tt.y}: <b>${fmtEur(tt.eur)}</b>, ${tt.pct} % ${esc(fromCc(tt.cc))}.`) : ""}
      ${li(risk.hz.length || risk.cf.length ? `Right now: ${risk.hz.length ? `${risk.hz.length} live hazard${risk.hz.length > 1 ? "s" : ""}` : ""}${risk.hz.length && risk.cf.length ? " and " : ""}${risk.cf.length ? `armed conflict near ${risk.cf.map((x) => esc(x.s.name)).join(", ")}` : ""} near its sites.` : "No live hazard or recorded armed conflict near its sites on this atlas.",
        risk.hz.length || risk.cf.length ? `Právě teď: ${[risk.hz.length ? `${risk.hz.length} ${csPlural(risk.hz.length, "živá hrozba", "živé hrozby", "živých hrozeb")} v blízkosti lokalit` : "", risk.cf.length ? `ozbrojený konflikt u ${risk.cf.length === 1 ? "lokality" : "lokalit"} ${((a) => a.length > 1 ? a.slice(0, -1).join(", ") + " a " + a[a.length - 1] : a[0])(risk.cf.map((x) => esc(x.s.name)))}` : ""].filter(Boolean).join(" a ")}.` : "U lokalit této suroviny v atlasu teď není žádná živá hrozba ani zaznamenaný ozbrojený konflikt.")}
      ${wl.length ? li(`Next date: <b>${esc(fmtDay(wl[0].date))}</b> · ${esc(wl[0].title)}`, `Nejbližší termín: <b>${esc(fmtDay(wl[0].date))}</b> · ${esc(wl[0].title)}`) : ""}
      ${DFARS.mats[m] ? li(`US defence contracts exclude Chinese and Russian ${m === "ree" ? "magnets" : "tungsten"} from mine to product from <b>1 January 2027</b>.`, `Americké obranné zakázky od <b>1. ledna 2027</b> vylučují ${m === "ree" ? "magnety" : "wolfram"} z Číny a Ruska od dolu po výrobek.`) : ""}
    </ul>`;
  } else if (lensPick === "buy") {
    body = `<ol class="lens-list check">
      ${DFARS.mats[m] ? li(`Ask every supplier where the material was mined, refined and made. From 1 January 2027 US defence work cannot use ${m === "ree" ? "magnets" : "tungsten"} from China, Russia, Iran or North Korea at any stage.`, `Zjistěte u každého dodavatele, kde byl materiál vytěžen, rafinován a vyroben. Od 1. ledna 2027 nesmí americké obranné zakázky použít ${m === "ree" ? "magnety" : "wolfram"} z Číny, Ruska, Íránu ani Severní Koreje v žádné fázi.`) : ""}
      ${tt ? li(`Concentration: ${tt.pct}% of EU ${esc(rows[0].label.toLowerCase())} imports come from ${esc(iso2(tt.cc))}${tt.pct > 65 ? ", above the EU's 65% benchmark" : ""}.`, `Koncentrace: ${tt.pct} % dovozu do EU (${esc((TRADE_CS[rows[0].label] || rows[0].label).toLowerCase())}) pochází ${esc(fromCc(tt.cc))}${tt.pct > 65 ? ", nad hranicí 65 %, kterou si EU stanovila" : ""}.`) : ""}
      ${li(`Sources outside China on this atlas: ${outside.length ? outside.map((s) => `<button class="linkbtn" data-site="${s.id}">${esc(s.name)}</button>`).join(", ") : "none yet"}.`, `Zdroje mimo Čínu v tomto atlasu: ${outside.length ? outside.map((s) => `<button class="linkbtn" data-site="${s.id}">${esc(s.name)}</button>`).join(", ") : "zatím žádné"}.`)}
      ${m === "w" ? li(`Check smelters against the <a href="${RMI_LISTS[0].u}" target="_blank" rel="noopener">RMI conformant list</a>; tungsten falls under the EU Conflict Minerals Regulation.`, `Ověřte hutě na <a href="${RMI_LISTS[0].u}" target="_blank" rel="noopener">seznamu RMI</a>; wolfram spadá pod nařízení EU o konfliktních minerálech.`) : ""}
      ${LIVE.prices && LIVE.prices.items && (LIVE.prices.items[m] || LIVE.prices.items[m + "_spot"]) ? li("Price trend: see the price chart below.", "Vývoj ceny: viz graf ceny níže.") : ""}
      ${li("Check owners of key suppliers for state control and sanctions (see each site).", "U klíčových dodavatelů prověřte vlastníky, státní kontrolu a sankce (viz jednotlivé lokality).")}
    </ol>`;
  } else {
    body = `<ul class="lens-list">
      ${li(`EU status: <b>${STRATEGIC[m] ? "strategic" : "critical"} raw material</b> under the Critical Raw Materials Act (2030 benchmarks: 10% mined, 40% processed, 25% recycled in the EU, at most 65% from one non-EU country).`, `Status v EU: <b>${STRATEGIC[m] ? "strategická" : "kritická"} surovina</b> podle zákona o kritických surovinách (cíle 2030: 10 % těžby, 40 % zpracování, 25 % recyklace v EU, nejvýš 65 % z jedné země mimo EU).`)}
      ${wl.map((w) => li(`<b>${esc(fmtDay(w.date))}</b> · ${esc(w.title)}`, `<b>${esc(fmtDay(w.date))}</b> · ${esc(w.title)}`)).join("")}
      ${DFARS.mats[m] ? li("United States: DFARS sourcing ban reaches back to the mine from 1 January 2027.", "USA: zákaz podle DFARS sahá od 1. ledna 2027 až k dolu.") : ""}
      ${funds.map((f) => li(`${esc(fmtDay(f.d))} · ${esc(f.who)}${f.amt ? ` (${esc(f.amt)})` : ""}`, `${esc(fmtDay(f.d))} · ${esc(f.who)}${f.amt ? ` (${esc(f.amt)})` : ""}`)).join("")}
    </ul>`;
  }
  return `<div class="lens"><div class="lens-tabs" role="tablist" aria-label="${T("Read it as", "Číst jako")}">${[["exec", T("Executive", "Vedení")], ["buy", T("Procurement", "Nákup")], ["pol", T("Policy", "Politika")]].map(([k, l]) => `<button role="tab" data-lens="${k}" aria-selected="${lensPick === k}">${l}</button>`).join("")}</div>
    ${body}<div class="lens-act"><button class="btn small" data-onepager="${m}">${T("Download one-page brief", "Stáhnout jednostránkový přehled")}</button></div></div>`;
}

/* one-page brief: a printable HTML file built from what the atlas shows now */
function onePagerHtml(m) {
  const mat = MATERIALS[m], top = topStage(m), rows = tradeRows(m);
  const saved = lensPick, out = [];
  ["exec", "buy", "pol"].forEach((k) => { lensPick = k; const tmp = document.createElement("div"); tmp.innerHTML = lensHtml(m); tmp.querySelector(".lens-tabs").remove(); tmp.querySelector(".lens-act").remove(); out.push(tmp.innerHTML); });
  lensPick = saved;
  const heads = [T("For the executive", "Pro vedení"), T("For procurement", "Pro nákup"), T("For policy", "Pro politiku")];
  const trade = rows.map((r) => { const tp = tradeTop(r); return tp ? `<tr><td>${esc(LANG === "cs" ? (TRADE_CS[r.label] || r.label) : r.label)}</td><td>${tp.y}</td><td>${fmtEur(tp.eur)}</td><td>${tp.list.slice(0, 4).map(([cc, v]) => `${esc(iso2(cc))} ${pctOf(v, tp.eur)}%`).join(", ")}</td></tr>` : ""; }).join("");
  const sites = SITES.filter((s) => s.m === m).map((s) => `<tr><td>${esc(s.name)}</td><td>${esc(ctry(s.country))}</td><td>${esc(trStr(s.stage))}</td><td>${esc(OWN[s.id] ? OWN[s.id].o.map((x) => LANG === "cs" ? (OWN_CS[x] || x) : x).join("; ") : (s.operator || ""))}</td></tr>`).join("");
  const today = new Date().toISOString().slice(0, 10);
  /* build 56: the downloaded page skips the translation pass, so Czech gets "95 %" and "1 200" here (text between tags only, never the CSS) */
  const csTxt = (h) => LANG === "cs" ? h.replace(/(<style[\s\S]*?<\/style>)|>([^<]+)(?=<)/g, (x, st, t) => st || ">" + csNumbers(t)) : h;
  return csTxt(`<!doctype html><html lang="${LANG}"><head><meta charset="utf-8"><title>${esc(trStr(mat.name))} · ${T("one-page brief", "jednostránkový přehled")}</title>
<style>body{font:13px/1.45 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#111;max-width:760px;margin:28px auto;padding:0 20px}h1{font-size:26px;margin:0 0 4px}h2{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#555;margin:20px 0 6px;border-top:1px solid #ddd;padding-top:12px}ul,ol{margin:0;padding-left:18px}li{margin:3px 0}table{border-collapse:collapse;width:100%;font-size:12px}td,th{border-bottom:1px solid #e3e3e3;padding:4px 6px;text-align:left;vertical-align:top}.k{color:#666;font-size:11px}button.linkbtn{all:unset}a{color:#0b57d0}@media print{body{margin:0}}</style></head><body>
<div class="k">OreOrbit · ${esc(LANG === "cs" ? csDates(fmtDay(today)) : fmtDay(today))}</div><h1>${esc(trStr(mat.name))}</h1><p>${esc(trStr(mat.uses))}</p>
${top ? `<p><b>${esc(pctTxt(top))}</b> ${esc(T(`of world output at the most concentrated stage comes from ${top.who}`, `světové produkce v nejkoncentrovanější fázi pochází ${CTRY_GEN[top.who] ? "z " + CTRY_GEN[top.who] : "z: " + ctry(top.who)}`))} (${esc(trStr(top.note))}).</p>` : ""}
${out.map((h, i) => `<h2>${heads[i]}</h2>${h}`).join("")}
${trade ? `<h2>${T("EU imports from outside the EU", "Dovoz do EU ze zemí mimo EU")}</h2><table><tr><th>${T("Product", "Produkt")}</th><th>${T("Year", "Rok")}</th><th>${T("Value", "Hodnota")}</th><th>${T("Top origins", "Hlavní původ")}</th></tr>${trade}</table>` : ""}
<h2>${T("Sites on the atlas", "Lokality v atlasu")}</h2><table><tr><th>${T("Site", "Lokalita")}</th><th>${T("Country", "Země")}</th><th>${T("Stage", "Fáze")}</th><th>${T("Owner", "Vlastník")}</th></tr>${sites}</table>
<h2>${T("Sources", "Zdroje")}</h2><p class="k">USGS Mineral Commodity Summaries 2026; IEA Global Critical Minerals Outlook 2026; Eurostat Comext; DFARS 252.225-7052; UCDP; IMF PortWatch; ${T("company reports. Full links in the atlas.", "výroční zprávy firem. Odkazy najdete v atlasu.")}</p>
<p class="k">${T("Generated from public data. Check the linked source before quoting.", "Sestaveno z veřejných dat. Před citací ověřte uvedený zdroj.")}</p></body></html>`);
}
async function downloadOnePager(m) {
  let dl = null;
  try { dl = window.claude && typeof window.claude.use === "function" ? await window.claude.use("downloads") : null; } catch (e) { dl = null; }
  const html = onePagerHtml(m), name = `${MATERIALS[m].name.toLowerCase().replace(/[^a-z]+/g, "-")}-brief-${new Date().toISOString().slice(0, 10)}.html`;
  if (dl) {
    try { await dl.save({ filename: name, data: new Blob([html], { type: "text/html" }) }); } catch (e) { if (e && e.code !== "declined") toast(T("The download did not start.", "Stahování se nespustilo.")); }
    return;
  }
  const w = window.open("", "_blank");
  if (w) { w.document.write(html); w.document.close(); } else toast(T("Downloads are not available here.", "Stahování tu není k dispozici."));
}

/* ---- 12. team: a shared watchlist and comments ---- */
const TEAM = new Set();
let teamDb = null, teamOk = false;
const starKey = (kind, id) => `${kind}:${id}`;
const starBtn = (kind, id) => teamOk ? `<button class="btn ghost small star" data-star="${starKey(kind, id)}" aria-pressed="${TEAM.has(starKey(kind, id))}"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.6l1.9 4 4.3.5-3.2 3 .9 4.3L8 11.2l-3.9 2.2.9-4.3-3.2-3 4.3-.5z"/></svg>${TEAM.has(starKey(kind, id)) ? T("On team watchlist", "Na sledování týmu") : T("Watch", "Sledovat")}</button>` : "";
let commentsApi = null;
const commentBtn = () => commentsApi ? `<button class="btn ghost small" data-comment="1"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2.5 3h11v7.5H7L4 13v-2.5H2.5z"/></svg>${T("Comment", "Komentovat")}</button>` : "";
async function connectTeam(db) {
  teamDb = db;
  try {
    db.collection("team/watch/items").onSnapshot((snap) => {
      TEAM.clear(); snap.docs.forEach((d) => TEAM.add(d.id)); teamOk = true;
      const act = !panelEl.hidden && pBody.querySelector(".actions");
      const key = selected ? ["site", selected] : (MATERIALS[filter] && !selRoute && !selChoke && !selSat && !selHz && !selShip && !selLive) ? ["mat", filter] : null;
      if (act && key && !act.querySelector("[data-star]")) act.insertAdjacentHTML("beforeend", starBtn(key[0], key[1]));
      document.querySelectorAll("[data-star]").forEach((b) => { const on = TEAM.has(b.dataset.star); b.setAttribute("aria-pressed", String(on)); b.lastChild.textContent = on ? T("On team watchlist", "Na sledování týmu") : T("Watch", "Sledovat"); });
      if (selLive && !panelEl.hidden) refreshLiveViews();
    }, () => { teamOk = false; });
  } catch (e) { teamOk = false; }
  try { commentsApi = window.claude && typeof window.claude.use === "function" ? await window.claude.use("comments") : null; } catch (e) { commentsApi = null; }
}
async function toggleStar(key, btn) {
  if (!teamDb) return;
  const ref = teamDb.collection("team/watch/items").doc(key);
  btn.disabled = true;
  try { if (TEAM.has(key)) await ref.delete(); else await ref.set({ kind: key.split(":")[0], id: key.split(":").slice(1).join(":"), at: new Date().toISOString() }); }
  catch (e) { toast(e && e.code === "not_granted" ? T("Only people the atlas is shared with as contributors can change the watchlist.", "Sledování mohou měnit jen lidé, se kterými je atlas sdílen jako s přispěvateli.") : T("Could not save. Try again.", "Nepodařilo se uložit. Zkuste to znovu.")); }
  btn.disabled = false;
}
function teamListHtml() {
  if (!teamOk) return "";
  const items = [...TEAM].map((k) => { const [kind, id] = [k.split(":")[0], k.split(":").slice(1).join(":")]; return { kind, id }; });
  if (!items.length) return `<div><h3>${T("Team watchlist", "Sledování týmu")}</h3><p class="srcs">${T("Nothing yet. Use Watch on any site or material.", "Zatím nic. U lokality nebo suroviny použijte Sledovat.")}</p></div>`;
  return `<div><h3>${T("Team watchlist", "Sledování týmu")}</h3><ul class="list">${items.map(({ kind, id }) => {
    if (kind === "site" && SITE_BY_ID[id]) {
      const s = SITE_BY_ID[id], hz = hazardsNearSite(s, 500).length, cf = LIVE.conflict && LIVE.conflict.areas && LIVE.conflict.areas[id];
      return `<li><button class="row-btn" data-site="${id}"><i class="dot" style="background:${cssVar(s.m)}"></i><span><span class="rb-name">${esc(s.name)}</span><span class="rb-sub">${hz ? T(`${hz} live hazard${hz > 1 ? "s" : ""} within 500 km`, `${hz} živé hrozby do 500 km`) : T("No live hazard within 500 km", "Žádná živá hrozba do 500 km")}${cf ? ` · ${T("armed conflict nearby", "ozbrojený konflikt poblíž")}` : ""}</span></span><small>${T("site", "lokalita")}</small></button></li>`;
    }
    if (kind === "mat" && MATERIALS[id]) {
      const tt = tradeRows(id).length ? tradeTop(tradeRows(id)[0]) : null;
      return `<li><button class="row-btn" data-mat="${id}"><i class="dot" style="background:${cssVar(id)}"></i><span><span class="rb-name">${esc(trStr(MATERIALS[id].name))}</span><span class="rb-sub">${tt ? T(`EU imports ${tt.y}: ${tt.pct}% ${fromCc(tt.cc)}`, `Dovoz do EU ${tt.y}: ${tt.pct} % ${fromCc(tt.cc)}`) : ""}</span></span><small>${T("material", "surovina")}</small></button></li>`;
    }
    return "";
  }).join("")}</ul></div>`;
}

/* ---- drawer additions ---- */
function v11SiteHtml(s) {
  return [dfarsSiteHtml(s), cfAreaHtml(s.id, s.id === "balama" ? 150 : 100), sitePortHtml(s), ownHtml(s), rmapHtml(s), ctxHtml(s)].join("");
}
function v11MatHtml(m) {
  return [lensHtml(m), tradeBlock(m), researchHtml(m)].join("");
}
function v11ChokeHtml(c) {
  const ids = CHOKE_PW[c.id] || [];
  const tr = ids.map(cpTrafficHtml).filter(Boolean);
  return `${tr.length ? `<div class="v11-card"><div class="v11-k">${T("Ship traffic", "Lodní provoz")}</div>${tr.join("")}${pwSrc()}</div>` : ""}${c.id === "suez" ? cfAreaHtml("choke:suez", 400) : ""}`;
}
function refreshV11Slots() {
  const a = document.getElementById("v11-site"); if (a && selected) a.innerHTML = v11SiteHtml(SITE_BY_ID[selected]);
  const b = document.getElementById("v11-mat"); if (b && MATERIALS[filter]) b.innerHTML = v11MatHtml(filter);
  const c = document.getElementById("v11-choke"); if (c && selChoke) c.innerHTML = v11ChokeHtml(CHOKE_BY_ID[selChoke]);
}

/* ---- the two new page sections ---- */
let sigMat = "ree";
function renderSignalsV11() {
  const el = document.getElementById("sig-body");
  if (!el) return;
  const cps = ["malacca", "babelmandeb", "suez", "cape"].map(cpTrafficHtml).filter(Boolean);
  const C = LIVE.conflict;
  const areas = C && C.areas ? Object.entries(C.areas).sort((a, b) => b[1].n - a[1].n) : [];
  el.innerHTML = `
    <div class="sig-panel sig-wide"><div class="sig-h"><h3>${T("EU imports: where they come from", "Dovoz do EU: odkud pochází")}</h3>
      <div class="sig-tabs" role="tablist">${ORDER.map((m) => `<button role="tab" data-sigm="${m}" aria-selected="${m === sigMat}"><i style="background:var(--${m})"></i>${esc(trStr(MATERIALS[m].name))}</button>`).join("")}</div></div>
      ${LIVE.trade ? tradeBlock(sigMat) : `<p class="srcs">${T("Waiting for the Eurostat feed.", "Čekám na data Eurostatu.")}</p>`}</div>
    <div class="sig-panel"><div class="sig-h"><h3>${T("Ships through the chokepoints", "Lodě přes úzká místa")}</h3></div>${cps.length ? `<div class="sig-grid2">${cps.join("")}</div>${pwSrc()}` : `<p class="srcs">${T("Waiting for the PortWatch feed.", "Čekám na data PortWatch.")}</p>`}</div>
    <div class="sig-panel"><div class="sig-h"><h3>${T("Armed conflict near the supply chain", "Ozbrojený konflikt u dodavatelského řetězce")}</h3></div>
      ${areas.length ? `<ul class="list">${areas.map(([w, a]) => `<li><button class="row-btn" ${SITE_BY_ID[w] ? `data-site="${w}"` : w === "choke:suez" ? `data-choke="suez"` : ""}><i class="dot" style="background:#c79bff"></i><span><span class="rb-name">${esc(cfName(w))}</span><span class="rb-sub">${T(`${nf(a.n)} event${a.n === 1 ? "" : "s"} · ${nf(a.deaths)} death${a.deaths === 1 ? "" : "s"}`, `${nf(a.n)} ${a.n === 1 ? "událost" : a.n < 5 ? "události" : "událostí"} · ${nf(a.deaths)} ${a.deaths === 1 ? "úmrtí" : "úmrtí"}`)}</span></span><small>${esc(fmtDay(a.last))}</small></button></li>`).join("")}</ul>
      <p class="srcs">UCDP ${T("candidate events", "předběžné události")}, ${esc(cfPeriod())} · ${T("within 100 km of a site (150 km at Balama) or 400 km of Bab-el-Mandeb (Yemen only)", "do 100 km od lokality (150 km u Balamy) nebo 400 km od Bab al-Mandabu (jen Jemen)")} · <a href="https://ucdp.uu.se/" target="_blank" rel="noopener">UCDP</a></p>` : `<p class="srcs">${C ? T("No recorded events near the atlas sites.", "U lokalit atlasu nejsou zaznamenány žádné události.") : T("Waiting for the UCDP feed.", "Čekám na data UCDP.")}</p>`}</div>
    <div class="sig-panel"><div class="sig-h"><h3>${T("Europe's defence demand", "Poptávka evropské obrany")}</h3></div>
      <div class="v11-big"><b>$${nf(SIPRI.europe)} ${T("bn", "mld.")}</b><span>${T(`European military spending in ${SIPRI.year}, up ${SIPRI.europeChg}% in real terms. World: $${nf(SIPRI.world)} bn, ${SIPRI.burden}% of GDP, the highest share since 2009.`, `vojenské výdaje Evropy v roce ${SIPRI.year}, reálně +${SIPRI.europeChg} %. Svět: ${nf(SIPRI.world)} mld. USD, ${nf(SIPRI.burden, 1)} % HDP, nejvíc od roku 2009.`)}</span></div>
      <p class="srcs">SIPRI, ${esc(fmtDay(SIPRI.released))} · <a href="${SIPRI.u}" target="_blank" rel="noopener">SIPRI</a></p>
      <div class="v11-row"><span>${T("EU ammunition act (ASAP), March 2024: 31 projects to reach 2 million shells a year by end-2025; about three quarters for powder and explosives", "Akt EU na podporu výroby munice (ASAP), březen 2024: 31 projektů pro 2 miliony granátů ročně do konce roku 2025; asi tři čtvrtiny na prach a výbušniny")}</span><b>€500 ${T("m", "mil.")}</b></div>
      <p class="srcs"><a href="https://sofiaglobe.com/2024/03/15/ec-allocates-500m-euro-to-ramp-up-ammunition-production/" target="_blank" rel="noopener">Sofia Globe / European Commission</a></p>
      ${tendersHtml()}</div>
    <div class="sig-panel"><div class="sig-h"><h3>${T("Research on alternatives", "Výzkum náhrad")}</h3></div><div class="sig-grid2">${["ree", "co", "li", "ni", "gr", "ge"].map((m) => researchHtml(m, true)).join("")}</div>
      <p class="srcs">Semantic Scholar · ${T("papers per year matching each query: a signal of research activity, not of readiness", "práce za rok odpovídající dotazu: ukazatel výzkumné aktivity, ne připravenosti")}</p></div>`;
}
function renderRules() {
  const el = document.getElementById("rules-body");
  if (!el) return;
  const days = daysTo(DFARS.date);
  const ex = SITES.filter((s) => DFARS.mats[s.m] && dfarsCovered(s)), ok = SITES.filter((s) => DFARS.mats[s.m] && !dfarsCovered(s));
  const row = (s) => `<li><button class="row-btn" data-site="${s.id}"><i class="dot" style="background:${cssVar(s.m)}"></i><span><span class="rb-name">${esc(s.name)}</span><span class="rb-sub">${esc(trStr(MATERIALS[s.m].name))} · ${esc(trStr(s.stage))} · ${esc(ctry(s.country))}</span></span></button></li>`;
  el.innerHTML = `
    <div class="rules-grid">
      <div class="dfars"><div class="label">${T("United States · DFARS 252.225-7052", "USA · DFARS 252.225-7052")}</div>
        <div class="count"><b>${days > 0 ? nf(days) : 0}</b><span>${T("days until 1 January 2027", "dní do 1. ledna 2027")}</span></div>
        <p>${T("From that day, rare-earth magnets, tungsten and tantalum in US defence contracts may not be mined, refined, separated, melted or made in China, Russia, Iran or North Korea. Until now the ban started at melting. European suppliers that sell into US programmes need proof of origin back to the mine.", "Od toho dne se magnety ze vzácných zemin, wolfram a tantal v amerických obranných zakázkách nesmí těžit, rafinovat, separovat, tavit ani vyrábět v Číně, Rusku, Íránu či Severní Koreji. Dosud zákaz začínal až tavbou. Evropští dodavatelé amerických programů budou potřebovat doklad o původu až k dolu.")}</p>
        ${srcLinks(DFARS.src)}</div>
      <div><h3>${T("Atlas sites that will not qualify", "Lokality atlasu, které nevyhoví")}</h3><ul class="list">${ex.map(row).join("")}</ul>
        <h3 style="margin-top:22px">${T("Atlas sites outside the covered countries", "Lokality atlasu mimo vyloučené země")}</h3><ul class="list">${ok.map(row).join("")}</ul>
        <p class="srcs">${T("A site outside the covered countries qualifies only if every other stage of its chain does too.", "Lokalita mimo vyloučené země vyhoví jen tehdy, když vyhoví i všechny další fáze řetězce.")}</p></div>
    </div>
    <div class="rules-grid2">
      <div><h3>${T("Who is paying for supply outside China", "Kdo platí za dodávky mimo Čínu")}</h3><ol class="funds">${FUNDING.map((f) => fundRow(f)).join("")}</ol>
        <p class="srcs">${T("Public money, loans and offtake deals announced by governments and the EU. Selected items, as of", "Veřejné peníze, úvěry a odběrové smlouvy oznámené vládami a EU. Výběr, stav k")} ${esc(fmtDay(AS_OF))}.</p></div>
      <div><h3>${T("Responsible sourcing", "Odpovědné získávání surovin")}</h3>
        <p class="muted">${T("Tungsten, tin, tantalum and gold fall under the EU Conflict Minerals Regulation. Buyers check smelters against the Responsible Minerals Initiative (RMI) list of audited facilities; the EU recognised the RMI scheme in October 2025.", "Wolfram, cín, tantal a zlato spadají pod nařízení EU o konfliktních minerálech. Kupci ověřují hutě na seznamu auditovaných provozů Responsible Minerals Initiative (RMI); EU systém RMI uznala v říjnu 2025.")}</p>
        <ul class="list">${Object.keys(RMAP).map((id) => row(SITE_BY_ID[id])).join("")}</ul>
        <p class="srcs">${T("The full RMI list only loads in a browser, so the atlas links to it rather than copying it.", "Úplný seznam RMI se načítá jen v prohlížeči, proto na něj atlas odkazuje, místo aby ho kopíroval.")} <a href="${RMI_LISTS[0].u}" target="_blank" rel="noopener">${T("Open the RMI tungsten list", "Otevřít seznam RMI pro wolfram")}</a></p></div>
    </div>`;
}

/* ---- EU imports column in the chokepoints table ---- */
function cpTradeCell(m) {
  const rows = tradeRows(m);
  const tp = rows.length ? tradeTop(rows[0]) : null;
  if (!tp) return `<span class="cp-cell"><span class="cp-none">${LIVE.trade ? T("No EU import data", "Bez dat o dovozu") : T("Waiting for Eurostat", "Čekám na Eurostat")}</span></span>`;
  const over = tp.pct > 65;
  return `<span class="cp-cell"><span class="cp-bar"><span class="fill" style="width:${tp.pct}%;background:var(--cpc);opacity:${over ? 1 : 0.4}"></span><span class="cap"></span></span>
    <span class="cp-val"><b>${tp.pct}%</b>${esc(iso2(tp.cc))} · ${esc((LANG === "cs" ? (TRADE_CS[rows[0].label] || rows[0].label) : rows[0].label).toLowerCase())} · ${tp.y}${over ? `<span class="over-tag">${T("over 65%", "nad 65 %")}</span>` : ""}</span></span>`;
}

/* ---- events ---- */
document.addEventListener("click", (e) => {
  const sm = e.target.closest("[data-sigm]");
  if (sm) { sigMat = sm.dataset.sigm; renderSignals(); return; }
});

/* ================= search ================= */
const searchEl = $("#search"), searchInput = $("#search-input"), searchList = $("#search-results");
const norm = (t) => String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const SEARCH_INDEX = [
  ...ORDER.map((m) => ({ kind: "Element", title: MATERIALS[m].name, sub: `${ELEM[m].s} · ${MATERIALS[m].group}`, ic: ELEM[m].s, c: cssVar(m), key: `${MATERIALS[m].name} ${ELEM[m].s} ${MATERIALS[m].spec.mineral}`, go: () => setFilter(m, true) })),
  ...Object.entries(SYSTEMS).map(([id, s]) => ({ kind: "System", title: s.name, sub: s.chokeShort, ic: "◎", key: `${s.name} ${s.blurb}`, go: () => setFilter("sys:" + id, true) })),
  ...SITES.map((s) => ({ kind: "Site", title: s.name, sub: `${s.place}, ${s.country} · ${MATERIALS[s.m].name}`, ic: ELEM[s.m].s, c: cssVar(s.m), key: `${s.name} ${s.place} ${s.country} ${s.operator || ""} ${(ALIASES[s.id] || []).join(" ")}`, go: () => select(s.id, true) })),
  ...ROUTES.map((r) => ({ kind: "Route", title: r.name, sub: `${r.fromLabel} → ${r.toLabel}`, ic: "⟶", key: `${r.name} ${r.fromLabel} ${r.toLabel}`, go: () => selectRoute(r.id) })),
  ...CHOKES.map((c) => ({ kind: "Chokepoint", title: c.name, sub: "Shipping chokepoint", ic: "◌", key: c.name, go: () => selectChoke(c.id) })),
  ...LIVE_SATS.map((c) => ({ kind: "Satellite", title: c.name, sub: c.owner, ic: "✦", key: `${c.name} satellite orbit live ${c.fam === "s2" ? "sentinel copernicus" : ""} ${c.fam === "ls" ? "landsat nasa usgs" : ""} ${c.id === "enmap" ? "hyperspectral dlr" : ""} ${c.id === "iss" ? "emit space station" : ""}`, go: () => selectSat(c.id) })),
  { kind: "Live", title: "Right now", sub: "Satellites, hazards and feeds", ic: "●", key: "live now hazards earthquakes cyclones weather feeds ships prices", go: () => selectLive() },
];
let searchHits = [], searchIdx = 0;
function renderSearch() {
  const q = norm(searchInput.value.trim());
  searchHits = (q ? SEARCH_INDEX.filter((it) => norm(it.key + " " + it.title + (LANG === "cs" ? " " + trStr(it.title) + " " + trStr(it.sub) : "")).includes(q)) : SEARCH_INDEX.filter((it) => it.kind === "Element" || it.kind === "System")).slice(0, 12);
  searchIdx = Math.min(searchIdx, Math.max(0, searchHits.length - 1));
  searchList.innerHTML = searchHits.length ? searchHits.map((it, i) => `
    <li class="pal-item" role="option" id="sr-${i}" data-i="${i}" aria-selected="${i === searchIdx}" style="${it.c ? `--c:${it.c}` : ""}">
      <span class="ic">${esc(it.ic)}</span><span><b>${esc(it.title)}</b><span>${esc(it.sub)}</span></span><small>${esc(it.kind)}</small>
    </li>`).join("") : `<li class="pal-empty">Nothing matches "${esc(searchInput.value)}". Try a country, a mine or an element.</li>`;
  searchInput.setAttribute("aria-activedescendant", searchHits.length ? `sr-${searchIdx}` : "");
}
function openSearch() {
  searchEl.hidden = false; searchInput.value = ""; searchIdx = 0; renderSearch();
  searchInput.focus();
}
function closeSearch() { searchEl.hidden = true; }
function goSearch(i) {
  const it = searchHits[i];
  if (!it) return;
  closeSearch();
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  it.go();
}
searchInput.addEventListener("input", () => { searchIdx = 0; renderSearch(); });
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") { e.preventDefault(); searchIdx = Math.min(searchHits.length - 1, searchIdx + 1); renderSearch(); }
  else if (e.key === "ArrowUp") { e.preventDefault(); searchIdx = Math.max(0, searchIdx - 1); renderSearch(); }
  else if (e.key === "Enter") { e.preventDefault(); goSearch(searchIdx); }
  else if (e.key === "Escape") { e.preventDefault(); closeSearch(); }
});
searchList.addEventListener("click", (e) => { const li = e.target.closest(".pal-item"); if (li) goSearch(+li.dataset.i); });
searchEl.addEventListener("click", (e) => { if (e.target === searchEl) closeSearch(); });
$("#open-search").addEventListener("click", openSearch);
document.addEventListener("keydown", (e) => {
  const tag = (e.target && e.target.tagName) || "";
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); searchEl.hidden ? openSearch() : closeSearch(); }
  else if (e.key === "/" && searchEl.hidden && !/INPUT|TEXTAREA|SELECT/.test(tag)) { e.preventDefault(); openSearch(); }
});

/* ================= quiz ================= */
const quizBox = $("#quiz-box");
let qi = 0, qGuesses = [], qRevealed = false, qGuess = 50;
function renderQuiz() {
  const done = qi >= QUIZ.length;
  const side = `<aside class="q-side">
    <div class="label">Your answers</div>
    <ol class="q-list">${QUIZ.map((q, i) => {
      const g = qGuesses[i];
      const cls = i < qGuesses.length ? "done" : i === qi ? "cur" : "";
      return `<li class="${cls}"><span class="n">${String(i + 1).padStart(2, "0")}</span><span>${esc(MATERIALS[q.m].name)}</span><span class="s">${g !== undefined ? `${g}% → ${q.a}%` : "—"}</span></li>`;
    }).join("")}</ol>
  </aside>`;
  if (done) {
    const miss = Math.round(qGuesses.reduce((a, g, i) => a + Math.abs(g - QUIZ[i].a), 0) / QUIZ.length);
    const low = qGuesses.filter((g, i) => g < QUIZ[i].a).length;
    quizBox.innerHTML = `<div>
      <div class="q-step">Result</div>
      <div class="q-score">${miss} points</div>
      <p class="q-text" style="margin-top:14px">was your average miss across five questions.</p>
      <p class="q-exp">You guessed below the real figure ${low} time${low === 1 ? "" : "s"} out of five.${low >= 3 ? " Supply is even more concentrated than it feels." : ""}</p>
      <div class="q-actions"><button class="btn" id="q-share">Share result</button><button class="btn ghost" id="q-again">Try again</button><button class="btn ghost" id="q-globe">Explore the atlas</button></div>
    </div>${side}`;
    $("#q-again").addEventListener("click", () => { qi = 0; qGuesses = []; qRevealed = false; qGuess = 50; renderQuiz(); });
    $("#q-globe").addEventListener("click", () => { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); enterExplore(); renderDrawer(); });
    $("#q-share").addEventListener("click", () => openShare({ kicker: "Guess the share", title: `I missed by ${miss} points on average`, text: "Five questions on who controls the minerals behind Europe's defence. How close can you get?", src: "USGS, IEA, MERICS", name: "quiz" }));
    return;
  }
  const q = QUIZ[qi];
  quizBox.style.setProperty("--c", cssVar(q.m));
  quizBox.innerHTML = `<div>
    <div class="q-step">Question ${qi + 1} of ${QUIZ.length}</div>
    <p class="q-text">${esc(q.q)}</p>
    <div class="q-guess" id="q-guess">${qGuess}%</div>
    <input class="q-range" id="q-range" type="range" min="0" max="100" step="1" value="${qGuess}" aria-label="Your guess in percent" ${qRevealed ? "disabled" : ""}>
    <div class="q-ticks"><span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span></div>
    ${qRevealed ? `<div class="q-res">
      <div class="q-bar"><span>Your guess</span><span class="tr"><b id="q-b1" style="width:0;background:var(--dim)"></b></span><span class="v">${qGuess}%</span></div>
      <div class="q-bar"><span>Actual</span><span class="tr"><b id="q-b2" style="width:0;background:${cssVar(q.m)}"></b></span><span class="v">${q.a}%</span></div>
      <p class="q-exp">${esc(q.exp)}</p>
      <span class="q-src">Source: ${esc(q.src)}</span>
    </div>` : ""}
    <div class="q-actions">${qRevealed
      ? `<button class="btn" id="q-next">${qi === QUIZ.length - 1 ? "See your result" : "Next question"}</button><button class="btn ghost" id="q-see">See it on the globe</button>`
      : `<button class="btn" id="q-lock">Lock in ${qGuess}%</button>`}</div>
  </div>${side}`;
  const range = $("#q-range");
  range.addEventListener("input", () => { qGuess = +range.value; $("#q-guess").textContent = `${qGuess}%`; const l = $("#q-lock"); if (l) l.textContent = `Lock in ${qGuess}%`; });
  if (qRevealed) {
    requestAnimationFrame(() => requestAnimationFrame(() => { $("#q-b1").style.width = `${qGuess}%`; $("#q-b2").style.width = `${q.a}%`; }));
    $("#q-next").addEventListener("click", () => { qi++; qRevealed = false; qGuess = 50; renderQuiz(); });
    $("#q-see").addEventListener("click", () => { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); setFilter(q.m, true); });
  } else {
    $("#q-lock").addEventListener("click", () => { qGuesses[qi] = qGuess; qRevealed = true; renderQuiz(); });
  }
}
renderQuiz();


/* ================= v13: Monday morning, exposure, stress test, 2030 gap, new orbit views ================= */
const PLAY_SVG = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>`;
const PAUSE_SVG = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor"/></svg>`;
const mName = (m) => trStr(MATERIALS[m].name);
const STAGE_TXT = { mine: ["Mining", "Těžba"], refine: ["Refining", "Rafinace"], part: ["Magnets", "Magnety"] };
const stageTxt = (k) => T(STAGE_TXT[k][0], STAGE_TXT[k][1]);
const stageWhat = (k, x) => k === "mine" ? T("mine output", "těžby") : (x && x.what ? trStr(x.what).toLowerCase() : stageTxt(k).toLowerCase());
function chainOf(m) {
  const s = STAGES[m];
  return [["mine", s.mine, s.mineNote], ["refine", s.refine, s.refineNote], s.part ? ["part", s.part, null] : null].filter(Boolean);
}
function worstOf(m) {
  let best = null;
  chainOf(m).forEach(([k, x]) => { if (x && (!best || x.pct > best.x.pct)) best = { k, x, m }; });
  return best;
}
const todayIso = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const addMonths = (iso, n) => { const d = new Date(iso + "T00:00:00Z"); d.setUTCMonth(d.getUTCMonth() + n); return d.toISOString().slice(0, 10); };
const localTitle = (w) => LANG === "cs" && w.title_cs ? w.title_cs : w.title;
function allDeadlines() {
  const seen = new Set(), out = [];
  [...WATCH, ...DEADLINES].forEach((w) => {
    if (!w || !w.date || !w.title) return;
    const k = w.date + "|" + (Array.isArray(w.materials) ? w.materials.slice().sort().join(",") : "");
    if (seen.has(k)) return;
    seen.add(k); out.push(w);
  });
  return out.sort((a, b) => String(a.date).localeCompare(String(b.date)));
}
const deadlinesFor = (m) => allDeadlines().filter((w) => (!m || (Array.isArray(w.materials) && w.materials.includes(m))) && (daysUntil(w.date) === null || daysUntil(w.date) >= 0));
function newsFor(ms, days) {
  const now = new Date(), today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return NEWS.filter((n) => touches(n, ms) && !isNaN(parseDay(n.date)) && (today - parseDay(n.date)) / 86400000 <= days);
}
const hazardsFor = (m) => HZ.length ? nearSupplyChain().filter((x) => x.sites.some((y) => y.s.m === m)) : [];
function conflictFor(m) {
  const A = LIVE.conflict && LIVE.conflict.areas;
  if (!A) return [];
  return SITES.filter((s) => s.m === m && A[s.id] && A[s.id].n > 0);
}
/* red: one country holds more than 65% of a stage AND something is moving (deadline within 45 days, a story this week, a live hazard or recorded conflict near a site); amber: one of the two; green: neither */
function ragFor(m) {
  const w = worstOf(m), conc = !!(w && w.x.pct > 65);
  const dl = deadlinesFor(m)[0], dd = dl ? daysUntil(dl.date) : null;
  const news = newsFor([m], 7).length, hz = hazardsFor(m).length, cf = conflictFor(m);
  const moving = (dd !== null && dd <= 45) || news > 0 || hz > 0 || cf.length > 0;
  const level = conc && moving ? "red" : (conc || moving) ? "amber" : "green";
  const why = [];
  if (conc) why.push(T(`${pctTxt(w.x)} of ${stageWhat(w.k, w.x)} in ${w.x.who}`, `${pctTxt(w.x)} ${stageWhat(w.k, w.x)}: ${ctry(w.x.who)}`));
  if (dd !== null && dd <= 45) why.push(T(`deadline in ${dd} day${dd === 1 ? "" : "s"}`, `termín za ${dd} ${dd === 1 ? "den" : dd < 5 ? "dny" : "dní"}`));
  if (news) why.push(T(`${news} stor${news === 1 ? "y" : "ies"} this week`, `${news} ${news === 1 ? "zpráva" : news < 5 ? "zprávy" : "zpráv"} tento týden`));
  if (hz) why.push(T(`${hz} live hazard${hz === 1 ? "" : "s"} near its sites`, `${hz} ${hz === 1 ? "živá hrozba" : "živé hrozby"} u lokalit`));
  if (cf.length) why.push(T(`armed conflict recorded near ${cf[0].name}`, `ozbrojený konflikt zaznamenaný u lokality ${cf[0].name}`));
  return { level, why, w, dl, dd, news, hz, cf };
}
// build 63: the state is named as a risk level, the same words as the quick check; colour never names a state
const RAG_TXT = { red: ["High risk", "Vysoké riziko"], amber: ["Medium risk", "Střední riziko"], green: ["Low risk", "Nízké riziko"] };
const ragTxt = (l) => T(RAG_TXT[l][0], RAG_TXT[l][1]);
const ccOf = (who) => CC_OF[who] || null;
const CTRY_GEN = { China: "Číny", "DR Congo": "DR Konga", Indonesia: "Indonésie", Australia: "Austrálie", "South Africa": "Jihoafrické republiky", Chile: "Chile", Turkey: "Turecka", Brazil: "Brazílie", Mozambique: "Mosambiku", Russia: "Ruska", "United States": "USA", Gabon: "Gabonu", Kazakhstan: "Kazachstánu", India: "Indie", Norway: "Norska", Tajikistan: "Tádžikistánu", Ukraine: "Ukrajiny", Canada: "Kanady", Malaysia: "Malajsie", Philippines: "Filipín", Madagascar: "Madagaskaru", Senegal: "Senegalu", Vietnam: "Vietnamu" };
const CTRY_ACC = { China: "Čínu", "DR Congo": "DR Kongo", Indonesia: "Indonésii", Australia: "Austrálii" };
const ctryGen = (c) => CTRY_GEN[c] || ctry(c), ctryAcc = (c) => CTRY_ACC[c] || ctry(c);
/* build 56: "in <country>" (Czech locative with v/ve/na); unknown countries fall back to "v zemi <name>" */
const CTRY_LOC = { China: "v Číně", "DR Congo": "v DR Kongu", Indonesia: "v Indonésii", Australia: "v Austrálii", "South Africa": "v Jihoafrické republice", Chile: "v Chile", "United States": "v USA", Russia: "v Rusku", Brazil: "v Brazílii", Mozambique: "v Mosambiku", Turkey: "v Turecku", Kazakhstan: "v Kazachstánu", Gabon: "v Gabonu", India: "v Indii", Norway: "v Norsku", Tajikistan: "v Tádžikistánu", Ukraine: "na Ukrajině", Canada: "v Kanadě", Malaysia: "v Malajsii", Japan: "v Japonsku", Vietnam: "ve Vietnamu", Philippines: "na Filipínách", Madagascar: "na Madagaskaru", Senegal: "v Senegalu", Spain: "ve Španělsku", Sweden: "ve Švédsku", Finland: "ve Finsku", Germany: "v Německu", Austria: "v Rakousku", Portugal: "v Portugalsku", Greece: "v Řecku", Belgium: "v Belgii", Czechia: "v Česku", Serbia: "v Srbsku", Estonia: "v Estonsku", Argentina: "v Argentině", Zimbabwe: "v Zimbabwe", Ghana: "v Ghaně", Israel: "v Izraeli", "United Kingdom": "ve Spojeném království", Switzerland: "ve Švýcarsku", Azerbaijan: "v Ázerbájdžánu", Myanmar: "v Myanmaru", Bolivia: "v Bolívii", Peru: "v Peru", Rwanda: "ve Rwandě", Zambia: "v Zambii" };
const inCtry = (c) => LANG === "cs" ? ooNb0(CTRY_LOC[c] || "v zemi " + ctry(c)) : "in " + c;
function importShare(m) {
  const rows = tradeRows(m);
  const tp = rows.length ? tradeTop(rows[0]) : null;
  return tp ? { tp, label: LANG === "cs" ? (TRADE_CS[rows[0].label] || rows[0].label) : rows[0].label } : null;
}

/* ---------- drawer: time-lapse since 2017, radar and heat ---------- */
let TL = {}, OX = {};
fetch("data/timelapse.json").then((r) => r.ok ? r.json() : null).then((j) => { if (j && j.sites) { TL = j.sites; refreshVizTabs(); } }).catch(() => {});
fetch("data/orbit-extras.json").then((r) => r.ok ? r.json() : null).then((j) => { if (j && j.sites) { OX = j.sites; refreshVizTabs(); } }).catch(() => {});
function v13Tabs(s) {
  const tl = TL[s.id], ox = OX[s.id] || {};
  const hs = LIVE.hotspots && LIVE.hotspots.sites && LIVE.hotspots.sites[s.id];
  const set = (k, on) => { const b = vizTabs.querySelector(`[data-viz="${k}"]`); if (b) b.hidden = !on; };
  set("lapse", !!(tl && Array.isArray(tl.frames) && tl.frames.length > 2));
  set("radar", !!ox.radar);
  set("heat", !!(ox.heat || hs));
  v14Tabs(s);
}
function refreshVizTabs() { if (selected && IMG[selected] && !panelEl.hidden) v13Tabs(SITE_BY_ID[selected]); }
let lapseTimer = null;
function showVizV13(mode, s) {
  const box = document.getElementById("v13-viz");
  clearInterval(lapseTimer); lapseTimer = null;
  if (!box) return false;
  if (!s || !["lapse", "radar", "heat", "minerals"].includes(mode)) { box.hidden = true; box.innerHTML = ""; return false; }
  vizMode = mode;
  vizTabs.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.viz === mode)));
  specWrap.hidden = true; orbitImg.hidden = true; box.hidden = false;
  if (mode === "lapse") renderLapse(box, s); else if (mode === "radar") renderRadar(box, s); else if (mode === "minerals") renderMinerals(box, s); else renderHeat(box, s);
  return true;
}
function renderLapseS2(box, s) {
  const tl = TL[s.id], im = IMG[s.id] || {};
  if (!tl) { box.innerHTML = ""; return; }
  const F = tl.frames, n = F.length;
  let i = n - 1;
  box.innerHTML = `<div class="cmp tl-view"><div class="tl-img" id="tl-img" role="img" aria-label="${esc(T(`${s.name} from orbit, one picture a year`, `${s.name} z oběžné dráhy, jeden snímek ročně`))}" style="background-image:url('${esc(tl.file)}');background-size:${n * 100}% 100%"></div><span class="cmp-tag tl-tag" id="tl-tag" style="left:8px"></span></div>
    <div class="tl-ctl"><button type="button" class="tl-play" id="tl-play" aria-label="${T("Play", "Přehrát")}" aria-pressed="false">${PLAY_SVG}</button>
      <div class="tl-track"><input type="range" id="tl-range" min="0" max="${n - 1}" step="1" value="${n - 1}" aria-label="${T("Year", "Rok")}"><div class="tl-years">${F.map((f) => `<span>${String(f.year).slice(2)}</span>`).join("")}</div></div></div>
    <p class="srcs">${T(`One clear Sentinel-2 picture a year, in the same season, about ${im.spanKm || 7} km across. All frames share one colour stretch, so a change in colour is a change on the ground. Years without a clear picture are left out.`, `Jeden jasný snímek Sentinelu-2 ročně ve stejném ročním období, asi ${im.spanKm || 7} km napříč. Všechny snímky mají stejné barevné roztažení, takže změna barvy je změna na zemi. Roky bez jasného snímku chybí.`)} ${T("Contains modified Copernicus Sentinel data", "Obsahuje upravená data Copernicus Sentinel")} ${F[0].year}–${F[n - 1].year}.</p>`;
  const img = box.querySelector("#tl-img"), tag = box.querySelector("#tl-tag"), range = box.querySelector("#tl-range"), play = box.querySelector("#tl-play");
  const show = (k) => { i = k; img.style.backgroundPosition = `${n > 1 ? (k / (n - 1)) * 100 : 0}% 0`; tag.textContent = fmtDay(F[k].date); range.value = k; };
  const stop = () => { clearInterval(lapseTimer); lapseTimer = null; play.setAttribute("aria-pressed", "false"); play.innerHTML = PLAY_SVG; };
  const start = () => {
    stop(); if (i >= n - 1) show(0);
    play.setAttribute("aria-pressed", "true"); play.innerHTML = PAUSE_SVG;
    lapseTimer = setInterval(() => { if (!img.isConnected || vizMode !== "lapse" || i >= n - 1) { stop(); return; } show(i + 1); }, 800);
  };
  range.addEventListener("input", () => { stop(); show(+range.value); });
  play.addEventListener("click", () => (lapseTimer ? stop() : start()));
  if (reduceMotion) show(n - 1); else start();
}
function renderRadar(box, s) {
  const r = (OX[s.id] || {}).radar, im = IMG[s.id] || {};
  if (!r) { box.innerHTML = ""; return; }
  const pass = r.orbit === "ascending" ? T("ascending (evening)", "vzestupný (večerní)") : r.orbit === "descending" ? T("descending (morning)", "sestupný (ranní)") : "";
  box.innerHTML = `<div class="cmp"><img src="${esc(r.file)}" alt="${esc(T(`${s.name} seen by Sentinel-1 radar on ${fmtDay(r.date)}`, `${s.name} na radarovém snímku Sentinelu-1 z ${fmtDay(r.date)}`))}"><span class="cmp-tag" style="left:8px">${esc(fmtDay(r.date))}${r.platform ? ` · ${esc(String(r.platform).replace("sentinel-", "Sentinel-").toUpperCase().replace("SENTINEL", "Sentinel"))}` : ""}</span></div>
    <p class="muted">${T("Radar sees through cloud, smoke and darkness. Bright: metal roofs, buildings, steep slopes and ships. Dark: water and smooth, flat ground such as tailings ponds.", "Radar vidí skrz mraky, kouř i tmu. Světlé: plechové střechy, budovy, strmé svahy a lodě. Tmavé: voda a hladký rovný povrch, třeba odkaliště.")}</p>
    <p class="srcs">${T(`Sentinel-1, ${pass} pass, VV polarisation, terrain-corrected, about ${im.spanKm || 7} km across. Contains modified Copernicus Sentinel data ${String(r.date).slice(0, 4)}, processed by Microsoft Planetary Computer.`, `Sentinel-1, ${pass} přelet, polarizace VV, terénně korigováno, asi ${im.spanKm || 7} km napříč. Obsahuje upravená data Copernicus Sentinel ${String(r.date).slice(0, 4)}, zpracováno Microsoft Planetary Computer.`)}</p>`;
}
function dayStrip(byDay, days, hot) {
  const out = [];
  const end = new Date(); end.setUTCDate(end.getUTCDate() - 1);
  for (let k = days - 1; k >= 0; k--) {
    const d = new Date(end); d.setUTCDate(end.getUTCDate() - k);
    const iso = d.toISOString().slice(0, 10), v = byDay[iso];
    out.push(`<i class="${v === undefined ? "na" : hot(v) ? "on" : ""}" title="${esc(fmtDay(iso))}"></i>`);
  }
  return `<span class="dstrip">${out.join("")}</span>`;
}
function hotspotHtml(hs, compact) {
  return `<div class="v11-card bare">
    <div class="v11-row"><span>${T("Furnace-hot pixels within 6 km (VIIRS), last 7 days", "Dny s tepelnou anomálií do 6 km (VIIRS), posledních 7 dní")}</span><b class="${hs.daysHot7 ? "hi" : ""}">${T(`${hs.daysHot7} of 7 days`, `${hs.daysHot7} ze 7 dní`)}</b></div>
    ${dayStrip(hs.byDay || {}, 30, (v) => v && (v.px || v.n || 0) > 0)}
    ${compact ? "" : `<p class="srcs">${T("Each square is a day over the last 30; lit when the 375 m thermal-anomaly product flagged a pixel much hotter than its surroundings: a furnace, a flare or a fire. Grey: no data.", "Každý čtverec je den za posledních 30; svítí, když produkt tepelných anomálií 375 m označil pixel mnohem teplejší než okolí: pec, fléru nebo požár. Šedá: bez dat.")}</p>`}
  </div>`;
}
function so2Stats(so) {
  const s = Array.isArray(so.series) ? so.series : [];
  const loc = s.filter((x) => x.ring != null && x.nearMean != null && x.nearMean - x.ring >= 0.5);
  return { seen: s.length, loc: loc.length, peak: loc.length ? Math.max(...loc.map((x) => x.nearMean - x.ring)) : 0, byDay: Object.fromEntries(s.map((x) => [x.d, x])) };
}
function so2SiteHtml(so) {
  const st = so2Stats(so);
  return `<div class="v11-card bare">
    <div class="v11-row"><span>${T(`Sulphur dioxide above the surrounding air (${so2Sat()}), last 60 days`, `Oxid siřičitý nad okolím (${so2Sat()}), posledních 60 dní`)}</span><b class="${st.loc ? "hi" : ""}">${T(`${st.loc} of ${st.seen} days seen`, `${st.loc} ${zeZ(st.seen)} ${st.seen} dní s měřením`)}</b></div>
    ${dayStrip(st.byDay, 60, (x) => x.ring != null && x.nearMean - x.ring >= 0.5)}
    <p class="srcs">${T("Lit: the average within 50 km was at least 0.5 Dobson units above the ring 150–270 km out. Grey: cloud or no picture. Volcanoes and power plants also emit SO2; one day is not evidence.", "Svítí: průměr do 50 km byl aspoň o 0,5 Dobsonovy jednotky vyšší než v prstenci 150–270 km. Šedá: mraky nebo bez snímku. SO2 vypouštějí i sopky a elektrárny; jeden den není důkaz.")}</p>
  </div>`;
}
const steepOf = (s) => !!(IMG[s.id] && IMG[s.id].reliefM >= 600);
function renderHeat(box, s) {
  const h = (OX[s.id] || {}).heat, im = IMG[s.id] || {};
  const hs = LIVE.hotspots && LIVE.hotspots.sites && LIVE.hotspots.sites[s.id];
  const so = LIVE.so2 && LIVE.so2.sites && LIVE.so2.sites[s.id];
  box.innerHTML = `${h ? `<div class="cmp"><img src="${esc(im.now)}" alt=""><img class="heat-ov" src="${esc(h.file)}" alt="${esc(T(`Ground warmer than typical at ${s.name}, Landsat, ${fmtDay(h.date)}`, `Povrch teplejší než obvykle, ${s.name}, Landsat, ${fmtDay(h.date)}`))}"><span class="cmp-tag" style="left:8px">${esc(fmtDay(h.date))} · ${esc(h.time)} UTC</span></div>
    <div class="heat-leg"><span>+4 °C</span><i></i><span>${T("+16 °C and more above the land around it", "+16 °C a víc nad okolní terén")}</span></div>
    <div class="v11-card bare">
      <div class="v11-row"><span>${T("Typical ground in the square", "Běžný povrch ve čtverci")}</span><b>${nf(h.medianC, 1)} °C</b></div>
      ${typeof h.maxAnomC === "number" ? `<div class="v11-row"><span>${T("Hottest spot, above the land around it", "Nejteplejší místo nad okolním terénem")}</span><b class="${h.maxAnomC >= 8 ? "hi" : ""}">+${nf(h.maxAnomC, 1)} °C</b></div>` : ""}
      <div class="v11-row"><span>${T("Ground more than 8 °C hotter than the land around it", "Povrch o víc než 8 °C teplejší než okolní terén")}</span><b>${nf(h.hotHa, h.hotHa < 10 ? 1 : 0)} ha</b></div>
    </div>
    ${steepOf(s) ? `<p class="muted">${T(`Steep ground here, about ${nf(IMG[s.id].reliefM)} m of relief in the square: slopes facing the sun can still show as heat, so read this map with care.`, `Strmý terén, asi ${nf(IMG[s.id].reliefM)} m převýšení ve čtverci: svahy obrácené ke slunci se mohou stále ukazovat jako teplo, takže mapu čtěte opatrně.`)}</p>` : ""}
    <p class="srcs">${T(`Landsat surface temperature from the thermal band (about 100 m), each spot compared with the ground within about 1 km so that sunny slopes do not count, drawn over the Sentinel-2 picture from ${fmtDay(im.nowDate)}. Coloured: at least 4 °C hotter than its surroundings. A daytime pass: dark roofs, slag heaps and fresh tailings can still stand out, so heat is not proof of production.`, `Povrchová teplota z termálního pásma Landsatu (asi 100 m), každé místo porovnané s terénem do vzdálenosti asi 1 km, aby se nepočítaly osluněné svahy, zakreslená do snímku Sentinelu-2 z ${fmtDay(im.nowDate)}. Barevně: aspoň o 4 °C tepleji než okolí. Denní přelet: vyniknout mohou i tmavé střechy, haldy strusky a čerstvá odkaliště, takže teplo není důkaz výroby.`)} USGS / NASA, ${T("via Microsoft Planetary Computer", "přes Microsoft Planetary Computer")}.</p>` : ""}
    ${hs ? hotspotHtml(hs) : ""}
    ${so && so2Stats(so).seen >= 4 ? so2SiteHtml(so) : ""}`;
}

/* ---------- Monday morning ---------- */
let MY = null;
function loadMy() {
  if (MY) return MY;
  let v = null;
  try { v = JSON.parse(localStorage.getItem("cma-mine") || "null"); } catch (e) { v = null; }
  const team = [...TEAM].filter((k) => k.startsWith("mat:")).map((k) => k.slice(4)).filter((m) => MATERIALS[m]);
  MY = Array.isArray(v) && v.filter((m) => MATERIALS[m]).length ? v.filter((m) => MATERIALS[m]) : team.length ? team : ["ree", "ga", "w", "sb", "ti"];
  return MY;
}
function saveMy() { try { localStorage.setItem("cma-mine", JSON.stringify(MY)); } catch (e) { /* storage blocked: kept for this visit */ } }
const monPick = $("#mon-pick"), monBody = $("#mon-body");
monPick.addEventListener("click", (e) => {
  const b = e.target.closest("[data-my]");
  if (!b) return;
  const m = b.dataset.my, my = loadMy();
  if (my.includes(m)) { if (my.length > 1) MY = my.filter((x) => x !== m); } else MY = ORDER.filter((x) => my.includes(x) || x === m);
  saveMy(); renderMonday();
});
/* v36: set the whole selection at once (the quick check uses this), so the atlas redraws once, not chip by chip */
window.ooSetMy = (list) => { const want = ORDER.filter((x) => (list || []).includes(x)); if (!want.length) return; MY = want; saveMy(); renderMonday(); };
function changesForV13(ms) {
  const items = [];
  newsFor(ms, 7).slice(0, 6).forEach((n) => items.push({ kind: "news", d: n.date, html: `${safeUrl(n.url) ? `<a href="${esc(safeUrl(n.url))}" target="_blank" rel="noopener">${esc(n.title)}</a>` : esc(n.title)}<span class="ch-meta">${esc(fmtDay(n.date))}${n.source ? ` · ${esc(n.source)}` : ""}</span>`, text: n.title, src: n.source || "" }));
  if (HZ.length) nearSupplyChain().filter((x) => x.sites.some((y) => ms.includes(y.s.m))).slice(0, 3).forEach((x) => {
    const y = x.sites.find((z) => ms.includes(z.s.m));
    const t = T(`${x.h.title || x.h.short}: ${Math.round(y.d)} km from ${y.s.name}`, `${x.h.title || x.h.short}: ${Math.round(y.d)} km od lokality ${y.s.name}`);
    items.push({ kind: "hazard", html: `<button class="tlink" data-hzgo="${esc(x.h.id)}">${esc(t)}</button><span class="ch-meta">${T("Live hazard", "Živá hrozba")}</span>`, text: t, src: "USGS / GDACS" });
  });
  const C = LIVE.cnexports && LIVE.cnexports.materials;
  if (C) ms.forEach((m) => {
    const M = C[m];
    if (!M) return;
    let best = null;
    M.codes.forEach((rec) => Object.entries(rec.series || {}).forEach(([b, ser]) => {
      if (b === "World") return;
      const st = buyerStats(ser);
      if (!st || st.avg < 2e6 || st.age > 4 || st.chg === null || Math.abs(st.chg) < 40) return;
      if (!best || Math.abs(st.chg) > Math.abs(best.st.chg)) best = { rec, b, st };
    }));
    if (!best) return;
    const lab0 = T(best.rec.label, TRADE_CS[best.rec.label] || best.rec.label), lab = lab0.charAt(0).toLowerCase() + lab0.slice(1);
    const chg = `${best.st.chg > 0 ? "+" : ""}${best.st.chg}`, per = `${perLabel(best.st.first3[0])}–${perLabel(best.st.last[0])}`;
    const adj = BUYER_ADJ[best.b] || [buyerName(best.b), buyerName(best.b)];
    const t = M.basis === "exporter"
      ? T(`Indonesia's exports of ${lab} to ${buyerName(best.b)}, ${per}: ${chg}% against the 12 months before`, `Vývoz Indonésie (${lab}) do země ${buyerName(best.b)}, ${per}: ${chg} % proti předchozím 12 měsícům`)
      : T(`${adj[0]} imports of ${lab} from China, ${per}: ${chg}% against the 12 months before`, `${adj[1].charAt(0).toUpperCase() + adj[1].slice(1)} dovoz z Číny (${lab}), ${per}: ${chg} % proti předchozím 12 měsícům`);
    items.push({ kind: "data", html: `${esc(t)}<span class="ch-meta">${T("UN Comtrade, latest month", "UN Comtrade, poslední měsíc")}</span>`, text: t, src: "UN Comtrade" });
  });
  const H = LIVE.hotspots && LIVE.hotspots.sites;
  if (H) SITES.filter((s) => ms.includes(s.m) && H[s.id] && H[s.id].daysHot7 > 0).slice(0, 3).forEach((s) => {
    const t = T(`${s.name}: furnace-hot pixels on ${H[s.id].daysHot7} of the last 7 days`, `${s.name}: tepelná anomálie v ${H[s.id].daysHot7} ze 7 posledních dní`);
    items.push({ kind: "orbit", html: `<button class="tlink" data-sitego="${s.id}">${esc(t)}</button><span class="ch-meta">VIIRS</span>`, text: t, src: "NASA VIIRS" });
  });
  return items;
}
function renderMondayV13() {
  const my = loadMy();
  monPick.innerHTML = `<span class="mon-pick-l">${T("Your materials", "Vaše suroviny")}</span>` + ORDER.map((m) => `<button type="button" class="chip2" data-my="${m}" aria-pressed="${my.includes(m)}"><i style="background:var(--${m})"></i>${esc(mName(m))}</button>`).join("");
  const R = Object.fromEntries(my.map((m) => [m, ragFor(m)]));
  const counts = { red: 0, amber: 0, green: 0 };
  my.forEach((m) => counts[R[m].level]++);
  const next = allDeadlines().filter((w) => (daysUntil(w.date) === null || daysUntil(w.date) >= 0) && Array.isArray(w.materials) && w.materials.some((m) => my.includes(m)))[0];
  const nd = next ? daysUntil(next.date) : null;
  const changes = changesFor(my);
  const brief = BRIEFS[0];
  monBody.innerHTML = `
    <div class="mon-cards">${my.map((m) => {
      const r = R[m], imp = importShare(m), dl = r.dl;
      return `<button type="button" class="mon-card" data-mat="${m}" style="--c:var(--${m})">
        <span class="mon-top"><span class="mon-name"><i style="background:var(--${m})"></i>${esc(mName(m))}</span><span class="rag ${r.level}">${esc(ragTxt(r.level))}</span></span>
        <span class="mon-big">${r.w ? `<b>${esc(pctTxt(r.w.x))}</b><small>${esc(ctry(r.w.x.who))} · ${esc(stageTxt(r.w.k).toLowerCase())}</small>` : `<b>–</b><small>${T("no public world figure", "bez veřejného světového údaje")}</small>`}</span>
        <span class="mon-why">${r.why.length ? esc(r.why.join(" · ")) : T("Nothing moving this week.", "Tento týden bez pohybu.")}</span>
        <span class="mon-rows">
          <span><em>${T("EU imports", "Dovoz do EU")}</em>${imp ? esc(T(`${imp.tp.pct}% ${fromCc(imp.tp.cc)}, ${imp.tp.y}`, `${imp.tp.pct} % ${fromCc(imp.tp.cc)}, ${imp.tp.y}`)) : esc(LIVE.trade ? T("no data", "bez dat") : T("loading", "načítám"))}</span>
          <span><em>${T("Next", "Další")}</em>${dl ? esc(`${dl.when ? trStr(dl.when) : fmtDay(dl.date)} · ${inDays(daysUntil(dl.date))}`) : T("no dated deadline", "bez data")}</span>
        </span>
      </button>`;
    }).join("")}</div>
    <aside class="mon-side">
      <div class="mon-next">
        <div class="label">${T("Next deadline", "Nejbližší termín")}</div>
        ${next ? `<div class="mon-count"><b>${nd === 0 ? T("Today", "Dnes") : nf(nd)}</b><span>${nd === 0 ? "" : T(nd === 1 ? "day" : "days", nd === 1 ? "den" : nd < 5 ? "dny" : "dní")}</span></div>
          <p>${esc(localTitle(next))}</p><div class="foot-line"><span>${esc(next.when ? trStr(next.when) : fmtDay(next.date))}</span>${mtags(next.materials)}${safeUrl(next.url) ? `<a href="${esc(safeUrl(next.url))}" target="_blank" rel="noopener">${esc(next.source || T("Source", "Zdroj"))}</a>` : ""}</div>` : `<p class="muted">${T("No dated deadline for these materials.", "Pro tyto suroviny není žádný datovaný termín.")}</p>`}
      </div>
      <div>
        <div class="label" style="margin-bottom:10px">${T("What changed in the last 7 days", "Co se změnilo za posledních 7 dní")}</div>
        ${changes.length ? `<ol class="changes">${changes.map((c) => `<li class="ch-${c.kind}">${c.html}</li>`).join("")}</ol>` : `<p class="muted">${wireState === "off" ? T("Stories load for viewers signed in to the AI agent.", "Zprávy se načtou po přihlášení k AI agentovi.") : T("No new stories, hazards or data swings for these materials.", "Pro tyto suroviny žádné nové zprávy, hrozby ani výkyvy v datech.")}</p>`}
        ${brief ? `<p class="mon-brief"><span class="label">${T("This week's brief", "Přehled tohoto týdne")}</span><a href="#briefing">${esc(brief.title)}</a></p>` : ""}
      </div>
      <div class="mon-sum"><span class="rag red">${counts.red}</span><span class="rag amber">${counts.amber}</span><span class="rag green">${counts.green}</span></div>
      <div class="mon-act"><button class="btn" id="mon-pack">${T("Board pack · 5 slides", "Podklady pro vedení · 5 snímků")}</button><button class="btn ghost" id="mon-present">${T("Present", "Prezentovat")}</button></div>
      <p class="srcs">${T("Red: one country makes more than 65% of a stage and something is moving: a deadline within 45 days, a story this week, a live hazard or recorded armed conflict near a site. Amber: only one of the two. Green: neither. A prompt to look, not a forecast.", "Červená: jedna země dělá víc než 65 % některé fáze a něco se děje: termín do 45 dní, zpráva tento týden, živá hrozba nebo zaznamenaný ozbrojený konflikt u lokality. Oranžová: jen jedno z obojího. Zelená: ani jedno. Podnět k pozornosti, ne předpověď.")}</p>
    </aside>`;
}
monBody.addEventListener("click", (e) => {
  const t = e.target;
  if (t.closest("#mon-pack")) { boardPack(t.closest("#mon-pack")); return; }
  if (t.closest("#mon-present")) { startPresent(); return; }
  if (t.closest("a")) return;
  const hz = t.closest("[data-hzgo]"); if (hz) { goGlobe(); selectHazard(hz.dataset.hzgo); return; }
  const sg = t.closest("[data-sitego]"); if (sg) { goGlobe(); select(sg.dataset.sitego, true); return; }
  const c = t.closest(".mon-card"); if (c) { goGlobe(); setFilter(c.dataset.mat, true); }
});
function goGlobe() { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); }

/* ---------- exposure: mine to missile ---------- */
let expSys = "drone", expTab = "chain", customParts = null;
const expChain = $("#exp-chain"), expCompare = $("#exp-compare");
const CUSTOM_DEFAULT = "NdFeB magnets for fin actuators\nGaN power amplifier\nGermanium IR dome\nLi-ion battery pack\nTungsten penetrator";
function parseParts(text) {
  const parts = [], unknown = [];
  String(text || "").split(/[\n;,]+/).map((l) => l.trim()).filter(Boolean).slice(0, 40).forEach((line) => {
    const hit = new Set();
    PART_KEYS.forEach(([rx, ms]) => { if (rx.test(line)) ms.forEach((m) => hit.add(m)); });
    if (!hit.size) { unknown.push(line); return; }
    hit.forEach((m) => { if (!parts.some((p) => p.m === m)) parts.push({ m, role: line }); else { const p = parts.find((q) => q.m === m); if (!p.role.includes(line) && p.role.length < 80) p.role += "; " + line; } });
  });
  return { parts: ORDER.filter((m) => parts.some((p) => p.m === m)).map((m) => parts.find((p) => p.m === m)), unknown };
}
function customSystem(parsed) {
  const worst = parsed.parts.map((p) => worstOf(p.m)).filter(Boolean).sort((a, b) => b.x.pct - a.x.pct)[0];
  const choke = worst ? worst.m : (parsed.parts[0] || { m: "ree" }).m;
  SYSTEMS.custom = {
    name: T("Your parts list", "Váš seznam dílů"), blurb: T("Built from the parts list you pasted.", "Sestaveno z vloženého seznamu dílů."), choke,
    chokeText: worst ? T(`The chain breaks first at ${stageWhat(worst.k, worst.x)} for ${mName(worst.m).toLowerCase()}: ${pctTxt(worst.x)} in ${worst.x.who}.`, `Řetězec se láme nejdřív u ${mName(worst.m).toLowerCase()}: ${stageTxt(worst.k).toLowerCase()}, ${pctTxt(worst.x)} ${inCtry(worst.x.who)}.`) : "",
    chokeShort: "", parts: parsed.parts
  };
  return SYSTEMS.custom;
}
function expScore(parts) {
  const ws = parts.map((p) => worstOf(p.m)).filter(Boolean);
  if (!ws.length) return null;
  return { score: Math.round(ws.reduce((a, w) => a + w.x.pct, 0) / ws.length), worst: ws.slice().sort((a, b) => b.x.pct - a.x.pct)[0], over: ws.filter((w) => w.x.pct > 65).length, n: ws.length, unknown: parts.length - ws.length };
}
function stageCell(m, k, x, note, worst) {
  if (!x) return `<div class="ex-cell none"><span class="ex-st">${esc(stageTxt(k))}</span><span class="ex-none">${esc(note ? trStr(note) : T("No public figure", "Bez veřejného údaje"))}</span></div>`;
  const over = x.pct > 65, isW = worst && worst.m === m && worst.k === k;
  return `<div class="ex-cell${over ? " over" : ""}${isW ? " worst" : ""}" style="--p:${x.pct}%">
    <span class="ex-st">${esc(stageTxt(k))}${isW ? `<em>${T("breaks first", "láme se nejdřív")}</em>` : ""}</span>
    <span class="ex-v"><b>${esc(pctTxt(x))}</b>${esc(ctry(x.who))}</span>
    <span class="ex-bar"><i></i><s></s></span>
    <span class="ex-n">${x.what ? esc(trStr(x.what)) + " · " : ""}${esc(trStr(x.note))}</span>
  </div>`;
}
function renderExposure() {
  const keys = Object.keys(SYSTEMS).filter((k) => k !== "custom");
  let sys, parsed = null;
  if (expSys === "custom") { parsed = parseParts(customParts == null ? CUSTOM_DEFAULT : customParts); sys = customSystem(parsed); }
  else sys = SYSTEMS[expSys];
  const sc = expScore(sys.parts);
  expChain.innerHTML = `
    <div class="ex-pick" role="group" aria-label="${T("System", "Systém")}">${keys.map((k) => `<button type="button" class="ex-sys" data-exsys="${k}" aria-pressed="${k === expSys}">${SYS_ICON[k] || ""}<span>${esc(trStr(SYSTEMS[k].name))}</span></button>`).join("")}
      <button type="button" class="ex-sys" data-exsys="custom" aria-pressed="${expSys === "custom"}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg><span>${T("Parts list", "Seznam dílů")}</span></button></div>
    ${expSys === "custom" ? `<div class="ex-parts"><label for="ex-parts-in" class="label">${T("Paste a bill of materials, one part per line", "Vložte kusovník, jeden díl na řádek")}</label>
      <textarea id="ex-parts-in" rows="5" spellcheck="false">${esc(customParts == null ? CUSTOM_DEFAULT : customParts)}</textarea>
      <p class="srcs">${T("Matched by keywords in this browser; nothing is sent anywhere or stored.", "Párováno podle klíčových slov v tomto prohlížeči; nic se nikam neposílá ani neukládá.")} ${parsed.unknown.length ? T(`Not matched: ${parsed.unknown.slice(0, 6).join(", ")}${parsed.unknown.length > 6 ? "…" : ""}.`, `Nespárováno: ${parsed.unknown.slice(0, 6).join(", ")}${parsed.unknown.length > 6 ? "…" : ""}.`) : ""}</p></div>` : ""}
    ${!sys.parts.length ? `<p class="muted">${T("No tracked material recognised yet. Try words such as magnet, GaN, germanium lens, battery, tungsten or titanium.", "Zatím nebyla rozpoznána žádná sledovaná surovina. Zkuste slova jako magnet, GaN, germaniová čočka, baterie, wolfram nebo titan.")}</p>` : `
    <div class="ex-head">
      <div class="ex-score" style="--c:var(--${sc && sc.worst ? sc.worst.m : "ree"})"><b>${sc ? sc.score : "–"}</b><span>/100</span>
        <p>${T("Concentration score: the average of each material's highest single-country share at any stage.", "Skóre koncentrace: průměr nejvyššího podílu jedné země v kterékoli fázi u každé suroviny.")}${sc && sc.unknown ? T(` ${sc.unknown} material${sc.unknown > 1 ? "s" : ""} without a public figure left out.`, ` Vynecháno ${sc.unknown} bez veřejného údaje.`) : ""}</p></div>
      ${sc ? `<div class="ex-break"><div class="label">${T("Where it breaks first", "Kde se láme nejdřív")}</div>
        <p class="ex-bt"><b style="color:var(--${sc.worst.m})">${esc(mName(sc.worst.m))}</b> · ${esc(stageTxt(sc.worst.k).toLowerCase())}: ${esc(pctTxt(sc.worst.x))} ${esc(inCtry(sc.worst.x.who))}</p>
        <p class="muted">${T(`${sc.over} of ${sc.n} materials have a stage above the 65% the EU wants as a ceiling by 2030.`, `${sc.over} ${zeZ(sc.n)} ${sc.n} surovin má fázi nad 65 %, které chce EU do roku 2030 jako strop.`)} ${esc(trStr(sys.blurb || ""))}</p></div>` : ""}
    </div>
    <div class="ex-table">
      <div class="ex-row ex-hdr" aria-hidden="true"><span>${T("Material and part", "Surovina a díl")}</span><span>${T("Mine", "Důl")}</span><span>${T("Refinery", "Rafinerie")}</span><span>${T("Component", "Komponenta")}</span><span>${esc(trStr(sys.name))}</span></div>
      ${sys.parts.map((p) => {
        const s = STAGES[p.m], w = worstOf(p.m);
        return `<div class="ex-row" style="--c:var(--${p.m})">
          <button type="button" class="ex-mat" data-mat="${p.m}"><i style="background:var(--${p.m})"></i><span><b>${esc(mName(p.m))}</b><small>${esc(trStr(p.role))}</small></span></button>
          ${stageCell(p.m, "mine", s.mine, s.mineNote, sc && sc.worst)}
          ${stageCell(p.m, "refine", s.refine, s.refineNote, sc && sc.worst)}
          ${s.part ? stageCell(p.m, "part", s.part, null, sc && sc.worst) : `<div class="ex-cell none nocomp"><span class="ex-st">${T("Component", "Komponenta")}</span><span class="ex-none">${T("Not tracked at this stage", "V této fázi nesledováno")}</span></div>`}
          <div class="ex-end"><span class="ex-arrow" aria-hidden="true">→</span><span>${w ? (w.x.pct > 65 ? `<span class="over-tag">${T("over 65%", "nad 65 %")}</span>` : `<span class="ok-tag">${T("below 65%", "pod 65 %")}</span>`) : ""}</span></div>
        </div>`;
      }).join("")}
    </div>
    ${sys.note ? `<p class="srcs">${esc(trStr(sys.note))}</p>` : ""}
    <p class="srcs">${T("Top-country share of world output at each stage, not of Europe's own purchases: USGS Mineral Commodity Summaries 2026, IEA Global Critical Minerals Outlook 2026. Material level, not a bill of materials.", "Podíl největší země na světové produkci v každé fázi, ne na nákupech Evropy: USGS Mineral Commodity Summaries 2026, IEA Global Critical Minerals Outlook 2026. Na úrovni surovin, ne kusovníku.")}</p>
    <div class="actions"><button class="btn" data-exglobe="1">${T("Show the flow on the globe", "Ukázat tok na glóbu")}</button>${sc ? `<button class="btn ghost" data-exstress="${sc.worst.m}">${T("Stress-test the weakest link", "Zátěžový test nejslabšího článku")}</button>` : ""}</div>`}`;
  const ta = $("#ex-parts-in");
  if (ta) ta.addEventListener("input", () => { clearTimeout(ta.t); ta.t = setTimeout(() => { customParts = ta.value; const pos = ta.selectionStart; renderExposure(); const n = $("#ex-parts-in"); if (n) { n.focus(); n.setSelectionRange(pos, pos); } }, 500); });
}
function flowsFor(parts) {
  const flows = [], groups = {};
  const EU = ROTTERDAM;
  parts.forEach((p) => { const w = worstOf(p.m); if (w && CENTROID[w.x.who]) (groups[w.x.who] = groups[w.x.who] || []).push({ m: p.m, w }); });
  parts.forEach((p, i) => {
    const s = STAGES[p.m], col = PIN[p.m];
    const j = (i - (parts.length - 1) / 2) * 1.6;
    const at = (who) => CENTROID[who] ? [CENTROID[who][0] + j * 0.6, CENTROID[who][1] + j] : null;
    const mine = s.mine && at(s.mine.who), ref = s.refine && at(s.refine.who);
    const w = worstOf(p.m);
    const g = w && groups[w.x.who], first = g && g[0].m === p.m;
    const lab = first ? `${esc(ctry(w.x.who))}${g.map((x) => `<small>${esc(mName(x.m))} ${esc(pctTxt(x.w.x))} · ${esc(stageTxt(x.w.k).toLowerCase())}</small>`).join("")}` : null;
    const wm = w && w.k === "mine";
    if (mine && ref && s.mine.who !== s.refine.who) {
      flows.push({ a: mine, b: ref, color: col, hi: wm, label: wm ? lab : null });
      flows.push({ a: ref, b: [EU[0] + j * 0.4, EU[1] + j * 0.5], color: col, hi: !wm, label: wm ? null : lab });
    } else if (mine || ref) flows.push({ a: mine || ref, b: [EU[0] + j * 0.4, EU[1] + j * 0.5], color: col, hi: true, label: lab });
  });
  return flows;
}
expChain.addEventListener("click", (e) => {
  const t = e.target;
  const b = t.closest("[data-exsys]"); if (b) { expSys = b.dataset.exsys; renderExposure(); return; }
  const m = t.closest(".ex-mat"); if (m) { goGlobe(); setFilter(m.dataset.mat, true); return; }
  const st = t.closest("[data-exstress]");
  if (st) {
    const sc = SCENARIOS.find((x) => x.m === st.dataset.exstress);
    if (sc) { scnSel = sc.id; ST.stop = true; renderScenario(); }
    { if (window.ooShowTab) window.ooShowTab("bom"); const sc = document.getElementById("scenarios"); if (sc.classList.contains("closed")) { const fb = sc.querySelector(".fold-btn"); if (fb) fb.click(); } sc.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }   // v16.1: open the folded stress test first
    return;
  }
  if (t.closest("[data-exglobe]")) {
    const sys = expSys === "custom" ? SYSTEMS.custom : SYSTEMS[expSys];
    if (!sys || !sys.parts.length) return;
    goGlobe();
    setFilter("sys:" + expSys, false);
    if (globe) { globe.setFlows(flowsFor(sys.parts)); globe.flyTo(38, 62, 3.6, 1600); }
  }
});

/* ---------- compare two materials ---------- */
let cmpA = "ga", cmpB = "ge";
function cmpRows(m) {
  const s = STAGES[m], imp = importShare(m), rows = tradeRows(m);
  const cn = rows.length ? tradeTop(rows[0]) : null;
  return [
    { k: T("Mining: top country", "Těžba: největší země"), v: s.mine ? s.mine.pct : null, t: s.mine ? `${pctTxt(s.mine)} ${ctry(s.mine.who)}` : (s.mineNote ? trStr(s.mineNote) : "–") },
    { k: T("Refining: top country", "Rafinace: největší země"), v: s.refine ? s.refine.pct : null, t: s.refine ? `${pctTxt(s.refine)} ${ctry(s.refine.who)}` : (s.refineNote ? trStr(s.refineNote) : "–") },
    { k: T("EU imports: largest supplier", "Dovoz do EU: největší dodavatel"), v: imp ? imp.tp.pct : null, t: imp ? `${imp.tp.pct}% ${iso2(imp.tp.cc)}` : "–" },
    { k: T("EU imports: China's share", "Dovoz do EU: podíl Číny"), v: cn ? cn.cn : null, t: cn ? `${cn.cn}%` : "–" },
    { k: T("Met from recycling in the EU", "Pokryto recyklací v EU"), v: EOL_RIR[m] ? EOL_RIR[m].v : null, t: EOL_RIR[m] ? (EOL_RIR[m].txt || `${EOL_RIR[m].v}%`) : "–", cap: 25 }
  ];
}
function renderCompare() {
  const opt = (sel) => ORDER.map((m) => `<option value="${m}"${m === sel ? " selected" : ""}>${esc(mName(m))}</option>`).join("");
  const A = cmpRows(cmpA), B = cmpRows(cmpB);
  const sitesN = (m) => SITES.filter((s) => s.m === m).length;
  const sysOfM = (m) => Object.entries(SYSTEMS).filter(([k, s]) => k !== "custom" && s.parts.some((p) => p.m === m)).map(([, s]) => trStr(s.name));
  const sp = (m) => EU_SP[m] ? (EU_SP[m].n ? T(`${EU_SP[m].n} projects`, `${EU_SP[m].n} ${csPlural(EU_SP[m].n, "projekt", "projekty", "projektů")}`) : T(`${EU_SP[m].named.length} named`, `${EU_SP[m].named.length} ${csPlural(EU_SP[m].named.length, "jmenovaný projekt", "jmenované projekty", "jmenovaných projektů")}`)) : T("none listed", "žádné");
  const dl = (m) => { const d = deadlinesFor(m)[0]; return d ? `${d.when ? trStr(d.when) : fmtDay(d.date)}` : "–"; };
  expCompare.innerHTML = `
    <div class="cmp2-pick"><label><span class="sr-only">${T("First material", "První surovina")}</span><select id="cmp-a" style="--c:var(--${cmpA})">${opt(cmpA)}</select></label><span class="cmp2-vs">vs</span><label><span class="sr-only">${T("Second material", "Druhá surovina")}</span><select id="cmp-b">${opt(cmpB)}</select></label></div>
    <div class="cmp2" style="--a:var(--${cmpA});--b:var(--${cmpB})">
      <div class="cmp2-h"><b style="color:var(--${cmpA})">${esc(mName(cmpA))}</b><span></span><b style="color:var(--${cmpB})">${esc(mName(cmpB))}</b></div>
      ${A.map((a, i) => { const b = B[i]; return `<div class="cmp2-row">
        <div class="cmp2-side l"><span class="cmp2-t">${esc(a.t)}</span><span class="cmp2-bar"><i style="width:${a.v == null ? 0 : a.v}%"></i>${a.cap ? `<s style="right:${a.cap}%"></s>` : `<s style="right:65%"></s>`}</span></div>
        <div class="cmp2-k">${esc(a.k)}</div>
        <div class="cmp2-side r"><span class="cmp2-bar"><i style="width:${b.v == null ? 0 : b.v}%"></i>${b.cap ? `<s style="left:${b.cap}%"></s>` : `<s style="left:65%"></s>`}</span><span class="cmp2-t">${esc(b.t)}</span></div>
      </div>`; }).join("")}
      ${[[T("Sites on the atlas", "Lokality v atlasu"), sitesN(cmpA), sitesN(cmpB)], [T("Systems that use it", "Systémy, které ji používají"), sysOfM(cmpA).join(", ") || "–", sysOfM(cmpB).join(", ") || "–"], [T("EU strategic projects", "Strategické projekty EU"), sp(cmpA), sp(cmpB)], [T("Next deadline", "Nejbližší termín"), dl(cmpA), dl(cmpB)]].map(([k, a, b]) => `<div class="cmp2-row txt"><div class="cmp2-side l"><span class="cmp2-t">${esc(a)}</span></div><div class="cmp2-k">${esc(k)}</div><div class="cmp2-side r"><span class="cmp2-t">${esc(b)}</span></div></div>`).join("")}
    </div>
    <p class="srcs">${T("Thin line: the EU's 2030 ceiling of 65% from one country; on the recycling row, the 25% recycling goal. World shares: USGS, IEA. EU imports: Eurostat Comext, latest full year. Recycling: European Commission CRM study 2023.", "Tenká čára: strop EU pro rok 2030, 65 % z jedné země; u recyklace cíl 25 %. Světové podíly: USGS, IEA. Dovoz do EU: Eurostat Comext, poslední celý rok. Recyklace: studie Evropské komise o kritických surovinách 2023.")}</p>
    <div class="actions"><button class="btn" data-cmpglobe="1">${T("Show both on the globe", "Ukázat obě na glóbu")}</button></div>`;
}
expCompare.addEventListener("change", (e) => {
  if (e.target.id === "cmp-a") cmpA = e.target.value;
  if (e.target.id === "cmp-b") cmpB = e.target.value;
  if (cmpA === cmpB) cmpB = ORDER.find((m) => m !== cmpA);
  renderCompare();
});
expCompare.addEventListener("click", (e) => { if (e.target.closest("[data-cmpglobe]")) { goGlobe(); setFilter(`pair:${cmpA}+${cmpB}`, true); } });
document.querySelector("#exposure .tabs2").addEventListener("click", (e) => {
  const b = e.target.closest("[data-exptab]");
  if (!b) return;
  expTab = b.dataset.exptab;
  document.querySelectorAll("#exposure [data-exptab]").forEach((x) => x.setAttribute("aria-selected", String(x.dataset.exptab === expTab)));
  expChain.hidden = expTab !== "chain"; expCompare.hidden = expTab !== "compare";
});
function drawerPair(a, b) {
  pHead.innerHTML = `<div class="kick"><span>${T("Compare", "Srovnání")}</span></div><h2><span style="color:var(--${a})">${esc(mName(a))}</span> <span class="muted">vs</span> <span style="color:var(--${b})">${esc(mName(b))}</span></h2>`;
  specWrap.hidden = true;
  pBody.innerHTML = `<div class="pair-grid"><div><h3>${esc(mName(a))}</h3>${statBlock(a)}</div><div><h3>${esc(mName(b))}</h3>${statBlock(b)}</div></div>
    <div><h3>${T("Sites on the globe", "Lokality na glóbu")}</h3>${siteRows(SITES.filter((s) => s.m === a || s.m === b))}</div>
    <div class="actions"><button class="btn ghost small" data-mat="${a}">${esc(mName(a))}</button><button class="btn ghost small" data-mat="${b}">${esc(mName(b))}</button></div>`;
}

/* ---------- stress test ---------- */
const ST = { stop: true, months: 6, redSea: true };
const PRESETS = [
  { id: "ga-red", m: "ga", stop: true, months: 6, redSea: true, en: "China stops gallium for 6 months and the Red Sea closes", cs: "Čína na 6 měsíců zastaví galium a Rudé moře se uzavře" },
  { id: "ree-3", m: "ree", stop: true, months: 3, redSea: false, en: "China stops rare-earth magnets for 3 months", cs: "Čína na 3 měsíce zastaví magnety ze vzácných zemin" },
  { id: "w-6", m: "w", stop: true, months: 6, redSea: false, en: "China stops tungsten into the US rule of 1 January", cs: "Čína zastaví wolfram těsně před americkým pravidlem k 1. lednu" },
  { id: "co-12", m: "co", stop: true, months: 12, redSea: false, en: "The DR Congo halts cobalt for a year", cs: "DR Kongo na rok zastaví kobalt" },
  { id: "red-6", m: "ree", stop: false, months: 6, redSea: true, en: "Only the Red Sea closes, for 6 months", cs: "Jen Rudé moře se uzavře, na 6 měsíců" }
];
scnSel = "ga";
function stEl(id) { return document.getElementById(id); }
function renderStControlsV13() {
  const box = stEl("st-ctl");
  if (!box) return;
  box.innerHTML = `
    <div class="st-presets">${PRESETS.map((p) => `<button type="button" class="chip2" data-preset="${p.id}" aria-pressed="${p.m === scnSel && p.stop === ST.stop && p.months === ST.months && p.redSea === ST.redSea}">${esc(T(p.en, p.cs))}</button>`).join("")}</div>
    <div class="st-row">
      <label class="st-sw"><input type="checkbox" id="st-stop" ${ST.stop ? "checked" : ""}><span>${T("Supply stop", "Zastavení dodávek")}</span></label>
      <label class="st-sw"><input type="checkbox" id="st-red" ${ST.redSea ? "checked" : ""}><span>${T("Red Sea closed", "Rudé moře uzavřené")}</span></label>
      <label class="st-dur"><span>${T("For", "Na")} <b id="st-mo">${ST.months}</b> ${T(ST.months === 1 ? "month" : "months", ST.months === 1 ? "měsíc" : ST.months < 5 ? "měsíce" : "měsíců")}</span><input type="range" id="st-months" min="1" max="24" step="1" value="${ST.months}" aria-label="${T("Duration in months", "Délka v měsících")}"></label>
    </div>`;
}
document.getElementById("scenarios").addEventListener("change", (e) => {
  if (e.target.id === "st-stop") { ST.stop = e.target.checked; if (!ST.stop && !ST.redSea) { ST.redSea = true; } renderScenario(); }
  if (e.target.id === "st-red") { ST.redSea = e.target.checked; if (!ST.stop && !ST.redSea) { ST.stop = true; } renderScenario(); }
});
document.getElementById("scenarios").addEventListener("input", (e) => {
  if (e.target.id === "st-months") { ST.months = +e.target.value; clearTimeout(ST.t); ST.t = setTimeout(renderScenario, 60); }
});
document.getElementById("scenarios").addEventListener("click", (e) => {
  const p = e.target.closest("[data-preset]");
  if (!p) return;
  const P = PRESETS.find((x) => x.id === p.dataset.preset);
  scnSel = SCENARIOS.find((x) => x.m === P.m).id; ST.stop = P.stop; ST.months = P.months; ST.redSea = P.redSea;
  renderScenario();
});
const LANE = ROUTE_BY_ID["cn-eu"].m;
function stImports(sc, months) {
  const cc = ccOf(sc.who), rows = tradeRows(sc.m);
  return rows.map((r) => {
    const tp = tradeTop(r);
    if (!tp) return null;
    const v = (r.years[tp.y].top || []).find((x) => x[0] === cc);
    const eur = v ? v[1] : 0;
    const Y = r.years[tp.y];
    return { label: LANG === "cs" ? (TRADE_CS[r.label] || r.label) : r.label, y: tp.y, eur, at: eur * months / 12, tAt: Y.t && Y.eur ? Y.t * (eur / Y.eur) * months / 12 : 0, pct: pctOf(eur, tp.eur), others: (r.years[tp.y].top || []).filter((x) => x[0] !== cc).slice(0, 3).map(([c, e]) => ({ c, pct: pctOf(e, tp.eur) })) };
  }).filter(Boolean);
}
function renderScenarioV13() {
  renderStControls();
  const sc = SCENARIOS.find((x) => x.id === scnSel) || SCENARIOS[0];
  scnList.querySelectorAll(".scn-btn").forEach((b) => b.setAttribute("aria-selected", String(ST.stop && b.dataset.scn === sc.id)));
  scnList.classList.toggle("off", !ST.stop);
  const st = sc.stage ? STAGES[sc.m][sc.stage] : null;
  const start = todayIso(), end = addMonths(start, ST.months);
  const mo = ST.months, moTxt = T(`${mo} month${mo === 1 ? "" : "s"}`, `${mo} ${mo === 1 ? "měsíc" : mo < 5 ? "měsíce" : "měsíců"}`);
  const title = ST.stop
    ? T(`${sc.title} for ${moTxt}${ST.redSea ? ", and the Red Sea closes" : ""}.`, `${trStr(sc.title)} na ${moTxt}${ST.redSea ? " a Rudé moře se uzavře" : ""}.`)
    : T(`The Red Sea closes for ${moTxt}.`, `Rudé moře se uzavře na ${moTxt}.`);
  const imp = ST.stop ? stImports(sc, mo) : [];
  const impTot = imp.reduce((a, r) => a + r.at, 0);
  const systems = ST.stop ? Object.entries(SYSTEMS).filter(([k, s]) => k !== "custom" && s.parts.some((p) => p.m === sc.m)) : [];
  const outside = ST.stop ? SITES.filter((s) => s.m === sc.m && s.country !== sc.who) : [];
  const laneMats = ST.redSea ? LANE.filter((m) => !(ST.stop && m === sc.m && sc.who === "China")) : [];
  const mats = ST.stop ? [sc.m, ...laneMats] : LANE;
  const inWin = allDeadlines().filter((w) => w.date >= start && w.date <= end && Array.isArray(w.materials) && w.materials.some((m) => mats.includes(m)));
  const ps = cpStats("babelmandeb") || cpStats("suez");
  const lastPrice = (() => { const P = LIVE.prices && LIVE.prices.items; const r = P && (P[sc.m + "_spot"] || P[sc.m]); return r && typeof r.price === "number" ? r : null; })();
  scnOut.style.setProperty("--c", cssVar(ST.stop ? sc.m : "sb"));
  scnOut.innerHTML = `
    <p class="st-title">${esc(title)}</p>
    ${ST.stop ? `<div class="scn-top">
      <b>${st ? esc(pctTxt(st)) : "?"}</b>
      <p>${st ? `${esc(trStr(scnPhrase(sc, st)))}<br><small class="mono" style="font-size:11px;color:var(--faint)">${esc(st.note)}</small>` : T("China is the leading producer, but no public world total exists.", "Čína je největší výrobce, ale veřejný světový údaj neexistuje.")}</p>
    </div>
    <div class="st-imp">
      <h3>${T("EU imports at stake", "Ohrožený dovoz do EU")}</h3>
      ${imp.length ? `<div class="st-big"><b>${impTot > 0 ? fmtEur(impTot) : "€0"}</b><span>${T(`of direct EU imports from ${sc.who} over ${moTxt}, at the pace of ${imp[0].y}`, `přímého dovozu do EU z ${ctryGen(sc.who)} za ${moTxt}, v tempu roku ${imp[0].y}`)}</span></div>
        ${imp.map((r) => `<div class="v11-row"><span>${esc(r.label)} · ${T(`${r.pct}% of EU imports`, `${r.pct} % dovozu do EU`)}</span><b>${fmtEur(r.at)}${r.tAt >= 0.05 ? ` · ≈${nf(r.tAt, r.tAt < 100 ? 1 : 0)} t` : ""}</b></div>`).join("")}
        ${impTot === 0 || sc.who !== "China" ? `<p class="muted">${T(`Little of this reaches Europe directly from ${sc.who}; most is refined elsewhere first, so the direct figure understates the exposure.`, `Jen málo z toho přichází do Evropy přímo z ${ctryGen(sc.who)}; většina se nejdřív rafinuje jinde, takže přímý údaj expozici podhodnocuje.`)}</p>` : ""}
        <p class="srcs">${T("Eurostat Comext, imports from outside the EU by origin. Tonnes estimated from the value share. Parts and products that contain the material are not counted.", "Eurostat Comext, dovoz ze zemí mimo EU podle původu. Tuny odhadnuty z podílu na hodnotě. Díly a výrobky, které surovinu obsahují, nejsou započteny.")}</p>` : `<p class="srcs">${LIVE.trade ? T("No EU import data for this material.", "Pro tuto surovinu nejsou data o dovozu.") : T("EU import figures load for viewers signed in to the AI agent.", "Údaje o dovozu se načtou po přihlášení k AI agentovi.")}</p>`}
    </div>
    <p class="scn-prec">${esc(trStr(sc.prec))}</p>
    <div class="scn-grid">
      <div class="scn-col">
        <h3>${T("Systems that lose it", "Systémy, které o ni přijdou")}</h3>
        ${systems.length ? systems.map(([, s]) => `<div class="scn-item"><b>${esc(trStr(s.name))}</b><span>${esc(trStr(s.parts.find((p) => p.m === sc.m).role))}</span></div>`).join("") : `<div class="scn-item"><span>${T("No tracked system on the atlas.", "Žádný sledovaný systém v atlasu.")}</span></div>`}
      </div>
      <div class="scn-col">
        <h3>${T(`Alternatives outside ${sc.who}`, `Alternativy mimo ${ctryAcc(sc.who)}`)}</h3>
        ${outside.length ? outside.map((s) => `<div class="scn-item"><b>${esc(s.name)}</b><span>${esc(ctry(s.country))} · ${esc(trStr(s.stage).toLowerCase())}</span>${ONLINE[s.id] ? `<span class="tl">${T("Planned output", "Plánovaná výroba")}: ${esc(trStr(ONLINE[s.id]))}</span>` : s.stage === "Planned" ? `<span class="tl">${T("Planned, no firm date", "Plánováno, bez pevného data")}</span>` : ""}</div>`).join("") : `<div class="scn-item"><span>${T("None on the atlas yet.", "Zatím žádné v atlasu.")}</span></div>`}
        ${imp.length && imp[0].others.length ? `<div class="scn-item"><b>${T("Already selling to the EU", "Už prodávají do EU")}</b><span>${imp[0].others.map((o) => `${esc(iso2(o.c))} ${o.pct}%`).join(" · ")}</span><span class="tl">${esc(imp[0].label)}, ${esc(imp[0].y)}</span></div>` : ""}
      </div>
    </div>` : ""}
    ${ST.redSea ? `<div class="st-red">
      <h3>${T("Red Sea closed", "Rudé moře uzavřené")}</h3>
      <div class="st-big"><b>+${REDSEA.capeDays - REDSEA.suezDays} ${T("days", "dní")}</b><span>${T(`Shanghai to Rotterdam round the Cape: about ${nf(REDSEA.capeNm)} nautical miles and ${REDSEA.capeDays} days, against ${nf(REDSEA.suezNm)} and ${REDSEA.suezDays} through Suez, at 16 knots.`, `Šanghaj–Rotterdam kolem mysu Dobré naděje: asi ${nf(REDSEA.capeNm)} námořních mil a ${REDSEA.capeDays} dní, proti ${nf(REDSEA.suezNm)} a ${REDSEA.suezDays} přes Suez, při 16 uzlech.`)}</span></div>
      <div class="v11-row"><span>${T("Tracked cargo on this lane", "Sledovaný náklad na této trase")}</span><b>${laneMats.map((m) => esc(mName(m))).join(", ") || "–"}</b></div>
      <div class="v11-row"><span>${T("From China to the EU in 2025", "Z Číny do EU v roce 2025")}</span><b>${T("about 140,000 t", "asi 140 000 t")}</b></div>
      ${ps ? `<div class="v11-row"><span>${T(`${PW_NAME[ps.id] ? T(PW_NAME[ps.id][0], PW_NAME[ps.id][1]) : ps.id}: ships a day, last 7 days`, `${PW_NAME[ps.id] ? PW_NAME[ps.id][1] : ps.id}: lodí denně, posledních 7 dní`)}</span><b>${nf(ps.last7, 0)}${ps.chg !== null ? ` · ${ps.chg >= 0 ? "+" : ""}${ps.chg}% ${T("vs a year ago", "proti loňsku")}` : ""}</b></div>` : ""}
      ${ST.stop && sc.who === "China" && LANE.includes(sc.m) ? `<p class="muted">${T(`For ${mName(sc.m).toLowerCase()} the stop matters more than the detour; the detour delays the rest of the lane.`, `U suroviny ${mName(sc.m).toLowerCase()} je zastavení důležitější než objížďka; objížďka zdrží zbytek trasy.`)}</p>` : ""}
      <p class="srcs"><a href="${REDSEA.src.u}" target="_blank" rel="noopener">${esc(REDSEA.src.t)}</a> · IMF PortWatch · ${T("tonnage estimated from Eurostat", "tonáž odhadnuta z Eurostatu")}</p>
    </div>` : ""}
    <div>
      <h3>${T(`Deadlines inside the window, ${fmtDay(start)} to ${fmtDay(end)}`, `Termíny uvnitř okna, ${fmtDay(start)} až ${fmtDay(end)}`)}</h3>
      ${inWin.length ? `<ol class="st-dl">${inWin.map((w) => { const d = daysUntil(w.date); return `<li><span class="mono">${T("day", "den")} ${d}</span><span><b>${esc(w.when ? trStr(w.when) : fmtDay(w.date))}</b> ${esc(localTitle(w))}</span></li>`; }).join("")}</ol>` : `<p class="muted">${T("No dated deadline falls inside this window.", "Do tohoto okna nespadá žádný datovaný termín.")}</p>`}
    </div>
    <p class="st-noprice">${T("No price forecast. Prices answer to stockpiles, contracts and policy in ways this atlas does not model.", "Bez předpovědi cen. Ceny reagují na zásoby, smlouvy a politiku způsobem, který tento atlas nemodeluje.")}${lastPrice ? T(` Last published price: ${fmtMoney(lastPrice.price, lastPrice.unit)}.`, ` Poslední zveřejněná cena: ${fmtMoney(lastPrice.price, lastPrice.unit)}.`) : ""}</p>
    <div class="actions"><button class="btn" data-scn-globe="1">${T("See it on the globe", "Ukázat na glóbu")}</button>${ST.stop ? `<button class="btn ghost" data-share="scn">${T("Share card", "Sdílet kartu")}</button>` : ""}</div>`;
}

/* ---------- 2030 gap tracker ---------- */
function gapHtml() {
  const rows = ORDER.slice().sort((a, b) => ((STRATEGIC[b] ? 1 : 0) - (STRATEGIC[a] ? 1 : 0)) || ((worstOf(b) || { x: { pct: 0 } }).x.pct - (worstOf(a) || { x: { pct: 0 } }).x.pct));
  const bar = (v, cap, over) => `<span class="gp-bar${over ? " over" : ""}"><i style="width:${Math.max(0, Math.min(100, v))}%"></i><s style="left:${cap}%"></s></span>`;
  const now = todayIso(), years = [2025, 2026, 2027, 2028, 2029, 2030];
  const nowY = +now.slice(0, 4);
  return `
    <div class="gap">
      <div class="gap-head"><h3>${T("The gap to 2030, material by material", "Mezera do roku 2030, surovina po surovině")}</h3>
        <p class="muted">${T("Two of the four goals can be measured per material from public data today: the ceiling on one supplier and the share met by recycling. For the 10% mining and 40% processing goals no comparable per-material baseline is published, so the last column shows the projects meant to close them.", "Dva ze čtyř cílů lze dnes z veřejných dat měřit po surovinách: strop pro jednoho dodavatele a podíl pokrytý recyklací. Pro cíle 10 % těžby a 40 % zpracování srovnatelný výchozí stav po surovinách zveřejněn není, proto poslední sloupec ukazuje projekty, které je mají naplnit.")}</p></div>
      <div class="gp-table">
        <div class="gp-row gp-hdr" aria-hidden="true"><span>${T("Material", "Surovina")}</span><span>${T("At most 65% from one country · EU imports, largest supplier", "Nejvýš 65 % z jedné země · dovoz do EU, největší dodavatel")}</span><span>${T("25% from recycling · today", "25 % z recyklace · dnes")}</span><span>${T("EU strategic projects", "Strategické projekty EU")}</span></div>
        ${rows.map((m) => {
          const imp = importShare(m), r = EOL_RIR[m], sp = EU_SP[m];
          return `<div class="gp-row" style="--c:var(--${m})">
            <button type="button" class="gp-name" data-mat="${m}"><i style="background:var(--${m})"></i><span>${esc(mName(m))}<small>${STRATEGIC[m] ? T("EU strategic", "Strategická pro EU") : T("EU critical", "Kritická pro EU")}</small></span></button>
            <span class="gp-cell">${imp ? `${bar(imp.tp.pct, 65, imp.tp.pct > 65)}<span class="gp-v"><b>${imp.tp.pct}%</b>${esc(iso2(imp.tp.cc))} · ${esc(imp.label.toLowerCase())} · ${esc(imp.tp.y)}${imp.tp.pct > 65 ? `<span class="over-tag">${T(`${imp.tp.pct - 65} points over`, `o ${imp.tp.pct - 65} ${csPlural(imp.tp.pct - 65, "bod", "body", "bodů")} nad limitem`)}</span>` : `<span class="ok-tag">${T("within", "v limitu")}</span>`}</span>` : `<span class="cp-none">${LIVE.trade ? T("No EU import data", "Bez dat o dovozu") : T("Waiting for Eurostat", "Čekám na Eurostat")}</span>`}</span>
            <span class="gp-cell">${r ? `${bar(r.v * 2, 50, false)}<span class="gp-v"><b>${esc(r.txt || r.v + "%")}</b>${r.v >= 25 ? `<span class="ok-tag">${T("at or above the goal", "na cíli nebo nad ním")}</span>` : T(`${25 - r.v} points short`, `chybí ${25 - r.v} ${csPlural(25 - r.v, "bod", "body", "bodů")}`)}${r.note ? ` · ${esc(T(r.note, r.note.replace("titanium metal; the IEEP summary lists 19%", "kovový titan; souhrn IEEP uvádí 19 %")))}` : ""}</span>` : `<span class="cp-none">–</span>`}</span>
            <span class="gp-cell gp-sp">${sp ? `${sp.n ? `<b>${sp.n}</b> ${T("projects", csPlural(sp.n, "projekt", "projekty", "projektů"))}` : `<b>${sp.named.length}</b> ${T("named", csPlural(sp.named.length, "jmenovaný", "jmenované", "jmenovaných"))}`}${sp.named ? `<small>${sp.named.map(esc).join(" · ")}</small>` : ""}` : `<span class="cp-none">${T("None in the first selection", "Žádný v prvním výběru")}</span>`}</span>
          </div>`;
        }).join("")}
      </div>
      <p class="cp-foot">${T("Recycling: end-of-life recycling input rate, the share of EU demand met from recycled scrap; light rare earths 3%, heavy 4%.", "Recyklace: podíl poptávky EU pokrytý recyklovaným odpadem (end-of-life recycling input rate); lehké vzácné zeminy 3 %, těžké 4 %.")} ${EOL_SRC.map((x) => `<a href="${x.u}" target="_blank" rel="noopener">${esc(x.t)}</a>`).join(" · ")}. ${T("Projects: first selection of 47, 25 March 2025; counts as published, otherwise the projects named in the list.", "Projekty: první výběr 47 projektů z 25. března 2025; počty podle zveřejnění, jinak jmenovitě uvedené projekty.")} ${EU_SP_SRC.map((x) => `<a href="${x.u}" target="_blank" rel="noopener">${esc(x.t)}</a>`).join(" · ")}. ${T("Permits for strategic projects are capped at 27 months for mines and 15 months for other projects.", "Povolování strategických projektů má strop 27 měsíců u dolů a 15 měsíců u ostatních projektů.")}</p>
      <div class="gap-head" style="margin-top:44px"><h3>${T("The road to 2030", "Cesta k roku 2030")}</h3></div>
      <div class="road">${years.map((y) => {
        const items = ROAD.filter((r) => +r.d.slice(0, 4) === y);
        return `<div class="road-y${y === nowY ? " now" : ""}"><div class="road-yh"><b>${y}</b>${y === nowY ? `<span>${T("today", "dnes")} · ${esc(fmtDay(now))}</span>` : ""}</div>
          <ol>${items.map((r) => `<li class="rk-${r.kind}${r.d < now ? " past" : ""}"><span class="road-d">${esc(r.when ? T(r.when, trStr(r.when)) : fmtDay(r.d))}</span><span class="road-t">${r.site ? `<button class="tlink" data-site="${r.site}">${esc(T(r.en, r.cs))}</button>` : esc(T(r.en, r.cs))}</span><span class="road-m">${r.m.map((m) => `<i style="background:var(--${m})" title="${esc(mName(m))}"></i>`).join("")}</span></li>`).join("")}</ol></div>`;
      }).join("")}</div>
      <p class="cp-foot"><span class="rk-key rk-on"></span>${T("new supply", "nové dodávky")} <span class="rk-key rk-risk"></span>${T("deadline or risk", "termín nebo riziko")} <span class="rk-key rk-eu"></span>${T("EU decision", "rozhodnutí EU")} <span class="rk-key rk-step"></span>${T("permit step", "krok povolování")} · ${T("Dates for new supply are company targets, not commitments.", "Data nových dodávek jsou cíle firem, ne závazky.")}</p>
    </div>`;
}

/* ---------- signals: buyers' imports from China, heat at plants, sulphur dioxide ---------- */
const BUYER = { US: ["United States", "USA"], JP: ["Japan", "Japonsko"], KR: ["South Korea", "Jižní Korea"], IN: ["India", "Indie"], CN: ["China", "Čína"], World: ["World", "Svět"] };
const buyerName = (b) => BUYER[b] ? T(BUYER[b][0], BUYER[b][1]) : b;
Object.assign(TRADE_CS, { "Permanent magnets of metal": TRADE_CS["Permanent magnets of metal"] || "Kovové permanentní magnety", "Gallium, germanium, indium and other minor metals, unwrought (one HS code)": "Galium, germanium, indium a další drobné kovy, neopracované (jeden kód HS)", "Unwrought antimony and powders": "Neopracovaný antimon a prášky", "Antimony oxides": "Oxidy antimonu", "Unwrought tungsten": "Neopracovaný wolfram", "Tungstates": "Wolframany", "Artificial graphite": "Umělý grafit", "Natural graphite, powder or flakes": "Přírodní grafit, prášek nebo vločky", "Lithium oxide and hydroxide": "Oxid a hydroxid lithný", "Lithium carbonate": "Uhličitan lithný", "Cobalt oxides and hydroxides": "Oxidy a hydroxidy kobaltu", "Unwrought titanium (sponge)": "Neopracovaný titan (houba)", "Ferro-nickel": "Feronikl", "Nickel mattes": "Niklový kamínek", "Rare-earth compounds": TRADE_CS["Rare-earth compounds"] || "Sloučeniny vzácných zemin", "Rare-earth metals": TRADE_CS["Rare-earth metals"] || "Kovy vzácných zemin" });
const perLabel = (p) => MON_SHORT(`${String(p).slice(0, 4)}-${String(p).slice(4, 6)}`);
const fmtUsd = (v) => typeof v !== "number" || !isFinite(v) ? "–" : v >= 1e9 ? `$${nf(v / 1e9, 2)} ${T("bn", "mld.")}` : v >= 1e6 ? `$${nf(v / 1e6, v >= 1e8 ? 0 : 1)} ${T("m", "mil.")}` : `$${nf(v / 1e3, 0)} ${T("k", "tis.")}`;
function buyerStats(ser) {
  if (!Array.isArray(ser) || ser.length < 9) return null;
  const s = ser.slice().sort((a, b) => String(a[0]).localeCompare(String(b[0])));
  const last = s[s.length - 1], l3 = s.slice(-3), prev = s.slice(-15, -3);
  const avg = sum(prev.map((x) => x[1])) / prev.length, avg3 = sum(l3.map((x) => x[1])) / l3.length;
  const now = new Date(), age = now.getFullYear() * 12 + now.getMonth() + 1 - (+String(last[0]).slice(0, 4) * 12 + +String(last[0]).slice(4, 6));
  return { last, first3: l3[0], avg, avg3, age, chg: avg > 0 ? Math.round((avg3 / avg - 1) * 100) : null, series: s };
}
const BUYER_ADJ = { US: ["US", "americký"], JP: ["Japanese", "japonský"], KR: ["South Korean", "jihokorejský"], IN: ["Indian", "indický"], CN: ["Chinese", "čínský"] };
let cxMat = "ree";
function cxHtml() {
  const C = LIVE.cnexports && LIVE.cnexports.materials;
  if (!C) return `<p class="srcs">${T("Waiting for the UN Comtrade feed.", "Čekám na data UN Comtrade.")}</p>`;
  const ms = ORDER.filter((m) => C[m]);
  if (!C[cxMat]) cxMat = ms[0];
  const M = C[cxMat];
  return `<div class="sig-tabs" role="tablist">${ms.map((m) => `<button role="tab" data-cxm="${m}" aria-selected="${m === cxMat}"><i style="background:var(--${m})"></i>${esc(mName(m))}</button>`).join("")}</div>
    ${M.codes.map((rec) => {
      const buyers = Object.entries(rec.series).map(([b, ser]) => ({ b, st: buyerStats(ser) })).filter((x) => x.st).sort((a, b) => b.st.avg - a.st.avg);
      if (!buyers.length) return "";
      return `<div class="cx-code"><div class="v11-row"><span><b>${esc(T(rec.label, TRADE_CS[rec.label] || rec.label))}</b> · HS ${esc(rec.code)}</span><b>${M.basis === "exporter" ? T(`${M.reporter}'s exports`, "vývoz Indonésie") : T("imports from China", "dovoz z Číny")}</b></div>
        <div class="cx-grid">${buyers.slice(0, 5).map(({ b, st }) => `<div class="cx-b">
          <div class="cx-bh"><span>${esc(buyerName(b))}</span>${st.chg !== null ? `<span class="${st.chg >= 0 ? "up" : "down"}">${st.chg >= 0 ? "+" : ""}${st.chg}%</span>` : ""}</div>
          ${barsSvg(st.series.slice(-24).map((x) => x[1]), cssVar(cxMat), buyerName(b))}
          <div class="bars-ax"><span>${esc(perLabel(st.series[Math.max(0, st.series.length - 24)][0]))}</span><span>${esc(perLabel(st.last[0]))}: ${fmtUsd(st.last[1])}</span></div>
        </div>`).join("")}</div></div>`;
    }).join("")}
    <p class="srcs">${M.basis === "exporter" ? T("Indonesia's own monthly customs reports.", "Vlastní měsíční celní hlášení Indonésie.") : T("China's own monthly detail is not published through the UN's public service after 2024, so this shows the other side: what the United States, Japan, South Korea and India report importing from China each month.", "Podrobná měsíční data Číny po roce 2024 veřejná služba OSN nezveřejňuje, proto je tu druhá strana: co USA, Japonsko, Jižní Korea a Indie každý měsíc hlásí jako dovoz z Číny.")} ${T("Percent: the last three reported months against the 12 months before them. Countries report with different delays, and the latest months get revised.", "Procenta: poslední tři vykázané měsíce proti 12 měsícům před nimi. Země hlásí s různým zpožděním a poslední měsíce se revidují.")} ${T("Value in US dollars.", "Hodnota v amerických dolarech.")} UN Comtrade · ${LIVE.cnexports.fetchedAt ? esc(fmtAgo(Date.now() - isoMs(LIVE.cnexports.fetchedAt))) : ""}</p>`;
}
function heatPlantsHtml() {
  const H = LIVE.hotspots && LIVE.hotspots.sites;
  const rows = SITES.filter((s) => (H && H[s.id]) || (OX[s.id] && OX[s.id].heat)).map((s) => ({ s, hs: H && H[s.id], h: OX[s.id] && OX[s.id].heat }));
  rows.sort((a, b) => ((b.hs ? b.hs.daysHot30 : 0) - (a.hs ? a.hs.daysHot30 : 0)) || ((b.h ? b.h.hotHa : 0) - (a.h ? a.h.hotHa : 0)));
  const lit = rows.filter((r) => r.hs && r.hs.daysHot30 > 0);
  if (!rows.length) return `<p class="srcs">${T("Waiting for the heat feeds.", "Čekám na tepelná data.")}</p>`;
  return `<ul class="heat-list">${(lit.length ? lit : rows.slice(0, 6)).slice(0, 8).map(({ s, hs, h }) => `<li><button class="row-btn" data-site="${s.id}"><i class="dot" style="background:${cssVar(s.m)}"></i><span><span class="rb-name">${esc(s.name)}</span><span class="rb-sub">${hs ? T(`furnace-hot on ${hs.daysHot7} of the last 7 days`, `tepelná anomálie v ${hs.daysHot7} ze 7 posledních dní`) : ""}${h ? ` · Landsat ${esc(fmtDay(h.date))}: ${steepOf(s) ? T("steep ground, read with care", "strmý terén, číst opatrně") : T(`${nf(h.hotHa, h.hotHa < 10 ? 1 : 0)} ha 8 °C above its surroundings`, `${nf(h.hotHa, h.hotHa < 10 ? 1 : 0)} ha o 8 °C nad okolím`)}` : ""}</span></span></button>${hs ? dayStrip(hs.byDay || {}, 30, (v) => v && (v.px || v.n || 0) > 0) : ""}</li>`).join("")}</ul>
    <p class="srcs">${T(`${lit.length} of ${rows.length} sites showed furnace-level heat in the last 30 days. A lit square is a day when NASA's VIIRS 375 m thermal-anomaly product flagged a pixel within 6 km much hotter than its surroundings: a furnace, a flare or a fire. Clouds hide it; a dark day is not proof of a shutdown.`, `${lit.length} ${zeZ(rows.length)} ${rows.length} lokalit mělo za posledních 30 dní tepelnou anomálii. Rozsvícený čtverec je den, kdy produkt tepelných anomálií VIIRS 375 m od NASA označil pixel do 6 km mnohem teplejší než okolí: pec, fléru nebo požár. Mraky ho skryjí; tmavý den není důkaz odstávky.`)} NASA GIBS / FIRMS</p>`;
}
/* v15: which satellite the sulphur dioxide data came from (the updater records the NASA GIBS layer it used) */
function so2Kind() { const l = (LIVE.so2 && LIVE.so2.layer) || ""; return !l || /TROPOMI|S5P|Sentinel/i.test(l) ? "s5p" : /NOAA20/i.test(l) ? "n20" : /^OMPS/i.test(l) ? "npp" : /^OMI/i.test(l) ? "omi" : "s5p"; }
function so2IsS5P() { return so2Kind() === "s5p"; }
function so2Sat() { return { s5p: "Sentinel-5P", n20: "NOAA-20 OMPS", npp: "Suomi NPP OMPS", omi: "Aura OMI" }[so2Kind()]; }
function so2Long(cs) {
  const k = so2Kind();
  if (k === "s5p") return cs ? "v celém sloupci ze Sentinelu-5P TROPOMI" : "Sentinel-5P TROPOMI total-column";
  const inst = { n20: ["přístroje OMPS na družici NOAA-20", "NOAA-20 OMPS"], npp: ["přístroje OMPS na družici Suomi NPP", "Suomi NPP OMPS"], omi: ["přístroje OMI na družici Aura", "Aura OMI"] }[k];
  return cs ? "v mezní vrstvě atmosféry z " + inst[0] : inst[1] + " planetary-boundary-layer";
}
function so2PanelHtml() {
  const S = LIVE.so2 && LIVE.so2.sites;
  if (!S) return `<p class="srcs">${T("Waiting for the sulphur dioxide feed.", "Čekám na data o oxidu siřičitém.")}</p>`;
  const rows = Object.entries(S).filter(([id]) => SITE_BY_ID[id]).map(([id, so]) => ({ s: SITE_BY_ID[id], so, st: so2Stats(so) })).sort((a, b) => b.st.loc - a.st.loc || b.st.peak - a.st.peak);
  return `<ul class="heat-list">${rows.map(({ s, st }) => `<li><button class="row-btn" data-site="${s.id}"><i class="dot" style="background:${cssVar(s.m)}"></i><span><span class="rb-name">${esc(s.name)}</span><span class="rb-sub">${T(`above the surrounding air on ${st.loc} of ${st.seen} days seen`, `nad okolním vzduchem: ${st.loc} ${zeZ(st.seen)} ${st.seen} dní s měřením`)}${st.loc ? ` · ${T("peak", "maximum")} +${nf(st.peak, 1)} DU` : ""}</span></span></button>${dayStrip(st.byDay, 60, (x) => x.ring != null && x.nearMean - x.ring >= 0.5)}</li>`).join("")}</ul>
    <p class="srcs">${T(`${so2Long(false)} SO2 over the last 60 days, read back from NASA's map colours. Lit: the average within 50 km was at least 0.5 Dobson units above a ring 150–270 km out. Grey: cloud or no usable picture. Volcanoes and power plants also emit SO2, and one day is not evidence.`, `SO2 ${so2Long(true)} za posledních 60 dní, odečteno z barev map NASA. Svítí: průměr do 50 km byl aspoň o 0,5 Dobsonovy jednotky vyšší než v prstenci 150–270 km. Šedá: mraky nebo bez použitelného snímku. SO2 vypouštějí i sopky a elektrárny a jeden den není důkaz.`)}</p>`;
}
function cxPanelHtml() {
  if (window.ATLAS_PUBLIC) return "";
  return `<div class="sig-panel sig-wide" id="cx-panel"><div class="sig-h"><h3>${T("China's exports, seen by the buyers", "Vývoz Číny očima kupců")}</h3></div>${cxHtml()}</div>`;
}
function v13SignalsHtml() {
  return `
    <div class="sig-panel"><div class="sig-h"><h3>${T("Heat at the plants, from orbit", "Teplo v závodech z oběžné dráhy")}</h3></div>${heatPlantsHtml()}</div>
    <div class="sig-panel"><div class="sig-h"><h3>${T("Sulphur dioxide over smelters", "Oxid siřičitý nad hutěmi")}</h3></div>${so2PanelHtml()}</div>`;
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-cxm]");
  if (!b) return;
  cxMat = b.dataset.cxm;
  const p = document.getElementById("cx-panel");
  if (p) p.innerHTML = `<div class="sig-h"><h3>${T("China's exports, seen by the buyers", "Vývoz Číny očima kupců")}</h3></div>${cxHtml()}`;
});

/* ---------- route drawer: what the dots stand for ---------- */
function routeTonHtml(r) {
  const info = ROUTE_T[r.id] || (r.id === "cn-eu-cape" ? ROUTE_T["cn-eu"] : null);
  if (!info) return "";
  return `<div class="v11-card bare"><div class="v11-k">${T("The dots on this lane", "Tečky na této trase")}</div><div class="v11-big"><b>${T(`${nf(info.t)} t`, `${nf(info.t)} t`)}</b><span>${esc(T(info.en, info.cs))}</span></div>
    <p class="srcs">${T("The number of moving dots grows with the square root of the tonnage, so lanes can be compared at a glance. Dots are not individual ships.", "Počet pohyblivých teček roste s odmocninou tonáže, aby šlo trasy porovnat na první pohled. Tečky nejsou jednotlivé lodě.")}${r.id === "cn-eu-cape" ? T(" They move here only while a stress test closes the Red Sea.", " Po této trase se pohybují jen tehdy, když zátěžový test uzavře Rudé moře.") : ""}</p></div>`;
}

/* ---------- board pack: five slides as a PowerPoint file, built in this browser ---------- */
let pptxLib = null;
function loadPptx() {
  if (window.PptxGenJS) return Promise.resolve(window.PptxGenJS);
  if (pptxLib) return pptxLib;
  pptxLib = new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "vendor/pptxgen.bundle.js";
    s.onload = () => (window.PptxGenJS ? res(window.PptxGenJS) : rej(new Error("missing")));
    s.onerror = () => { pptxLib = null; rej(new Error("load")); };
    document.head.appendChild(s);
  });
  return pptxLib;
}
const hex = (c) => String(c).replace("#", "").toUpperCase();
const RAG_HEX = { red: "FF5A5A", amber: "FF9F43", green: "3DDC97" };
const plain = (h) => { const d = document.createElement("div"); d.innerHTML = String(h || ""); return d.textContent || ""; };
function stModelV13() {
  const sc = SCENARIOS.find((x) => x.id === scnSel) || SCENARIOS[0];
  const st = sc.stage ? STAGES[sc.m][sc.stage] : null;
  const start = todayIso(), end = addMonths(start, ST.months), mo = ST.months;
  const moTxt = T(`${mo} month${mo === 1 ? "" : "s"}`, `${mo} ${mo === 1 ? "měsíc" : mo < 5 ? "měsíce" : "měsíců"}`);
  const title = ST.stop ? T(`${sc.title} for ${moTxt}${ST.redSea ? ", and the Red Sea closes" : ""}`, `${trStr(sc.title)} na ${moTxt}${ST.redSea ? " a Rudé moře se uzavře" : ""}`) : T(`The Red Sea closes for ${moTxt}`, `Rudé moře se uzavře na ${moTxt}`);
  const imp = ST.stop ? stImports(sc, mo) : [];
  const laneMats = ST.redSea ? LANE.filter((m) => !(ST.stop && m === sc.m && sc.who === "China")) : [];
  const mats = ST.stop ? [sc.m, ...laneMats] : LANE;
  const lines = [];
  if (ST.stop && imp.length) lines.push(T(`EU imports at stake: ${fmtEur(imp.reduce((a, r) => a + r.at, 0))} of direct imports from ${sc.who} over ${moTxt}, at the ${imp[0].y} pace`, `Ohrožený dovoz do EU: ${fmtEur(imp.reduce((a, r) => a + r.at, 0))} přímého dovozu z ${ctryGen(sc.who)} za ${moTxt}, v tempu roku ${imp[0].y}`));
  if (ST.stop) {
    const sys = Object.entries(SYSTEMS).filter(([k, s]) => k !== "custom" && s.parts.some((p) => p.m === sc.m)).map(([, s]) => trStr(s.name));
    if (sys.length) lines.push(T(`Systems that lose it: ${sys.join(", ")}`, `Systémy, které o ni přijdou: ${sys.join(", ")}`));
    const alt = SITES.filter((s) => s.m === sc.m && s.country !== sc.who).map((s) => `${s.name}${ONLINE[s.id] ? ` (${trStr(ONLINE[s.id])})` : ""}`);
    lines.push(alt.length ? T(`Alternatives on the atlas: ${alt.slice(0, 5).join(", ")}`, `Alternativy v atlasu: ${alt.slice(0, 5).join(", ")}`) : T("No alternative on the atlas yet", "Zatím žádná alternativa v atlasu"));
  }
  if (ST.redSea) lines.push(T(`Red Sea closed: Shanghai to Rotterdam takes about ${REDSEA.capeDays} days round the Cape instead of ${REDSEA.suezDays} through Suez (16 knots)`, `Rudé moře uzavřené: Šanghaj–Rotterdam trvá kolem mysu asi ${REDSEA.capeDays} dní místo ${REDSEA.suezDays} přes Suez (16 uzlů)`));
  allDeadlines().filter((w) => w.date >= start && w.date <= end && Array.isArray(w.materials) && w.materials.some((m) => mats.includes(m))).slice(0, 3)
    .forEach((w) => lines.push(T(`Day ${daysUntil(w.date)}: ${localTitle(w)}`, `Den ${daysUntil(w.date)}: ${localTitle(w)}`)));
  lines.push(T("No price forecast: prices answer to stockpiles, contracts and policy in ways the atlas does not model", "Bez předpovědi cen: ceny reagují na zásoby, smlouvy a politiku způsobem, který atlas nemodeluje"));
  return { sc, st, title, lines, big: ST.stop ? (st ? pctTxt(st) : "?") : `+${REDSEA.capeDays - REDSEA.suezDays} ${T("days", "dní")}`, bigTxt: ST.stop ? (st ? trStr(scnPhrase(sc, st)) : "") : T("Shanghai to Rotterdam round the Cape", "Šanghaj–Rotterdam kolem mysu"), color: ST.stop ? PIN[sc.m] : "#a9b8cc" };
}
async function boardPackV13(btn) {
  const label = btn ? btn.textContent : "";
  if (btn) { btn.disabled = true; btn.textContent = T("Building…", "Sestavuji…"); }
  try {
    const Pptx = await loadPptx();
    const my = loadMy(), date = fmtDay(todayIso()), R = Object.fromEntries(my.map((m) => [m, ragFor(m)]));
    const p = new Pptx();
    /* Czech dates and numbers in every text box and table cell */
    const L = (x) => LANG === "cs" ? csNumbers(csDates(String(x == null ? "" : x))) : String(x == null ? "" : x);
    const addSlide0 = p.addSlide.bind(p);
    p.addSlide = (...a) => {
      const sl = addSlide0(...a), at = sl.addText.bind(sl), tb = sl.addTable.bind(sl);
      sl.addText = (t, o) => at(typeof t === "string" ? L(t) : t.map((r) => Object.assign({}, r, { text: L(r.text) })), o);
      sl.addTable = (rows, o) => tb(rows.map((r) => r.map((c) => typeof c === "string" ? L(c) : Object.assign({}, c, { text: L(c.text) }))), o);
      return sl;
    };
    p.layout = "LAYOUT_WIDE"; p.author = "OreOrbit"; p.company = "Bohemia Defense"; p.title = T("Critical minerals board pack", "Kritické suroviny: podklady pro vedení");
    const F = "Arial", TX = "F3F4F4", DIM = "A3A9AD", FAINT = "697075", LINE = "2A2E31", BG = "050607";
    const foot = (s, n, src) => {
      s.addShape(p.ShapeType.line, { x: 0.6, y: 6.85, w: 12.13, h: 0, line: { color: LINE, width: 0.75 } });
      s.addText(`${T("OreOrbit · Critical minerals from orbit", "OreOrbit · kritické suroviny z oběžné dráhy")} · ${date} · ${src}`, { x: 0.6, y: 6.92, w: 11.2, h: 0.3, fontFace: F, fontSize: 9, color: FAINT, margin: 0 });
      s.addText(`${n} / 5`, { x: 11.9, y: 6.92, w: 0.83, h: 0.3, fontFace: F, fontSize: 9, color: FAINT, align: "right", margin: 0 });
    };
    const head = (s, kick, title) => {
      s.background = { color: BG };
      s.addText(kick.toUpperCase(), { x: 0.6, y: 0.45, w: 12, h: 0.3, fontFace: F, fontSize: 10, bold: true, color: DIM, charSpacing: 3, margin: 0 });
      s.addText(title, { x: 0.6, y: 0.8, w: 12.1, h: 0.8, fontFace: F, fontSize: 30, color: TX, margin: 0 });
    };
    /* 1: cover with the globe */
    const s1 = p.addSlide(); s1.background = { color: BG };
    let img = null;
    try { if (globe) img = globe.snapshot().toDataURL("image/jpeg", 0.86); } catch (e) { img = null; }
    if (img) s1.addImage({ data: img, x: 6.2, y: 0, w: 7.13, h: 7.5, sizing: { type: "cover", w: 7.13, h: 7.5 } });
    s1.addText(T(`BOARD PACK · ${date}`, `PODKLADY PRO VEDENÍ · ${date}`), { x: 0.6, y: 0.6, w: 5.5, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: DIM, charSpacing: 3, margin: 0 });
    s1.addText(T("Critical minerals: where we stand", "Kritické suroviny: kde stojíme"), { x: 0.6, y: 1.6, w: 5.5, h: 2.0, fontFace: F, fontSize: 40, color: TX, valign: "top", margin: 0 });
    s1.addText(my.map((m) => ({ text: `● ${mName(m)}   `, options: { color: hex(PIN[m]) } })), { x: 0.6, y: 3.9, w: 5.5, h: 0.9, fontFace: F, fontSize: 14, margin: 0, valign: "top" });
    const cnt = { red: 0, amber: 0, green: 0 }; my.forEach((m) => cnt[R[m].level]++);
    s1.addText([
      { text: `${cnt.red} ${T("red", "červené")}   `, options: { color: RAG_HEX.red, bold: true } },
      { text: `${cnt.amber} ${T("amber", "oranžové")}   `, options: { color: RAG_HEX.amber, bold: true } },
      { text: `${cnt.green} ${T("green", "zelené")}`, options: { color: RAG_HEX.green, bold: true } }
    ], { x: 0.6, y: 4.9, w: 5.5, h: 0.5, fontFace: F, fontSize: 18, margin: 0 });
    s1.addText(T("Built from public data in the OreOrbit atlas. Status is a prompt to look, not a forecast.", "Sestaveno z veřejných dat atlasu OreOrbit. Stav je podnět k pozornosti, ne předpověď."), { x: 0.6, y: 6.2, w: 5.3, h: 0.7, fontFace: F, fontSize: 10, color: FAINT, margin: 0, valign: "top" });
    /* 2: status table */
    const s2 = p.addSlide(); head(s2, T("Status by material", "Stav podle surovin"), T("Where one country holds the supply, and what is moving", "Kde dodávky drží jedna země a co se děje"));
    const th = (t) => ({ text: t, options: { bold: true, color: DIM, fontSize: 10, fill: { color: "0C0E10" } } });
    const rows2 = [[th(T("Material", "Surovina")), th(T("Status", "Stav")), th(T("Most concentrated stage", "Nejkoncentrovanější fáze")), th(T("EU imports: largest supplier", "Dovoz do EU: největší dodavatel")), th(T("Next deadline", "Nejbližší termín"))]];
    my.forEach((m) => {
      const r = R[m], imp = importShare(m), dl = r.dl;
      rows2.push([
        { text: mName(m), options: { bold: true, color: hex(PIN[m]) } },
        { text: `${ragTxt(r.level)}${r.why.length ? `\n${r.why.join(" · ")}` : ""}`, options: { color: RAG_HEX[r.level], fontSize: 10 } },
        { text: r.w ? `${pctTxt(r.w.x)} ${ctry(r.w.x.who)} · ${stageTxt(r.w.k).toLowerCase()}` : T("no public world figure", "bez veřejného světového údaje") },
        { text: imp ? T(`${imp.tp.pct}% ${iso2(imp.tp.cc)} (${imp.tp.y})`, `${imp.tp.pct} % ${iso2(imp.tp.cc)} (${imp.tp.y})`) : "–" },
        { text: dl ? `${dl.when ? trStr(dl.when) : fmtDay(dl.date)}\n${localTitle(dl)}` : "–", options: { fontSize: 10 } }
      ]);
    });
    s2.addTable(rows2, { x: 0.6, y: 1.85, w: 12.13, colW: [1.7, 3.0, 2.6, 2.2, 2.63], fontFace: F, fontSize: 12, color: TX, valign: "top", border: { type: "solid", pt: 0.5, color: LINE }, fill: { color: BG }, autoPage: false, rowH: 0.42 });
    foot(s2, 2, T("USGS, IEA, Eurostat Comext, atlas watch list", "USGS, IEA, Eurostat Comext, sledované termíny atlasu"));
    /* 3: what changed */
    const s3 = p.addSlide(); head(s3, T("This week", "Tento týden"), T("What changed in the last seven days", "Co se změnilo za posledních sedm dní"));
    const ch = changesFor(my).slice(0, 8);
    s3.addText(ch.length ? ch.map((c) => ({ text: `${c.text}${c.src ? `  (${c.src})` : ""}`, options: { bullet: { indent: 18 }, breakLine: true, paraSpaceAfter: 10 } })) : [{ text: T("No new stories, hazards or data swings for these materials in the last seven days.", "Pro tyto suroviny za posledních sedm dní žádné nové zprávy, hrozby ani výkyvy v datech.") }],
      { x: 0.6, y: 1.85, w: 12.1, h: 4.8, fontFace: F, fontSize: 15, color: TX, valign: "top", margin: 0 });
    foot(s3, 3, T("Atlas news wire, USGS, GDACS, UN Comtrade, NASA VIIRS", "Zpravodajství atlasu, USGS, GDACS, UN Comtrade, NASA VIIRS"));
    /* 4: stress test */
    const sm = stModel();
    const s4 = p.addSlide(); head(s4, T("Stress test", "Zátěžový test"), sm.title);
    s4.addText(sm.big, { x: 0.6, y: 1.9, w: 4.2, h: 1.5, fontFace: F, fontSize: 66, color: hex(sm.color), margin: 0, valign: "top" });
    s4.addText(sm.bigTxt, { x: 0.6, y: 3.45, w: 4.0, h: 1.2, fontFace: F, fontSize: 14, color: DIM, margin: 0, valign: "top" });
    s4.addText(sm.lines.map((t) => ({ text: t, options: { bullet: { indent: 18 }, breakLine: true, paraSpaceAfter: 9 } })), { x: 5.1, y: 1.9, w: 7.6, h: 4.8, fontFace: F, fontSize: 14, color: TX, valign: "top", margin: 0 });
    foot(s4, 4, T("USGS, IEA, Eurostat Comext, Port Economics, IMF PortWatch", "USGS, IEA, Eurostat Comext, Port Economics, IMF PortWatch"));
    /* 5: 2030 gap and deadlines */
    const s5 = p.addSlide(); head(s5, T("2030 targets", "Cíle pro rok 2030"), T("The gap to 2030 and the next deadlines", "Mezera do roku 2030 a nejbližší termíny"));
    const rows5 = [[th(T("Material", "Surovina")), th(T("EU imports: largest supplier (cap 65%)", "Dovoz do EU: největší dodavatel (strop 65 %)")), th(T("Recycled (goal 25%)", "Recyklace (cíl 25 %)")), th(T("EU strategic projects", "Strategické projekty EU"))]];
    my.forEach((m) => {
      const imp = importShare(m), r = EOL_RIR[m], sp = EU_SP[m];
      rows5.push([
        { text: mName(m), options: { bold: true, color: hex(PIN[m]) } },
        { text: imp ? `${imp.tp.pct}% ${iso2(imp.tp.cc)}` : "–", options: { color: imp && imp.tp.pct > 65 ? "FFB36B" : TX } },
        { text: r ? (r.txt || `${r.v}%`) : "–", options: { color: r && r.v >= 25 ? RAG_HEX.green : TX } },
        { text: sp ? (sp.n ? T(`${sp.n} projects`, `${sp.n} ${csPlural(sp.n, "projekt", "projekty", "projektů")}`) : sp.named.join(", ")) : "–", options: { fontSize: 10 } }
      ]);
    });
    s5.addTable(rows5, { x: 0.6, y: 1.85, w: 7.6, colW: [1.6, 2.4, 1.4, 2.2], fontFace: F, fontSize: 12, color: TX, valign: "top", border: { type: "solid", pt: 0.5, color: LINE }, fill: { color: BG }, autoPage: false, rowH: 0.4 });
    const dls = allDeadlines().filter((w) => daysUntil(w.date) === null || daysUntil(w.date) >= 0).slice(0, 6);
    s5.addText(T("NEXT DEADLINES", "NEJBLIŽŠÍ TERMÍNY"), { x: 8.6, y: 1.85, w: 4.1, h: 0.3, fontFace: F, fontSize: 10, bold: true, color: DIM, charSpacing: 3, margin: 0 });
    s5.addText(dls.map((w) => ({ text: `${w.when ? trStr(w.when) : fmtDay(w.date)} · ${daysUntil(w.date)} ${T("days", "dní")}\n`, options: { bold: true, color: TX, breakLine: false } }) ).flatMap((x, i) => [x, { text: `${localTitle(dls[i])}`, options: { color: DIM, breakLine: true, paraSpaceAfter: 8 } }]),
      { x: 8.6, y: 2.25, w: 4.1, h: 4.4, fontFace: F, fontSize: 11, valign: "top", margin: 0 });
    foot(s5, 5, T("Eurostat Comext, European Commission CRM study 2023 and strategic projects 2025, IEEP", "Eurostat Comext, studie Evropské komise 2023 a strategické projekty 2025, IEEP"));
    let blob;
    try { blob = await p.write({ outputType: "blob" }); } catch (e) { blob = await p.write("blob"); }
    const filename = `oreorbit-board-pack-${todayIso()}.pptx`;
    let dl = null;
    try { dl = window.claude && typeof window.claude.use === "function" ? await window.claude.use("downloads") : null; } catch (e) { dl = null; }
    window.__boardPack = blob;
    if (dl) {
      try { await dl.save({ filename, data: blob }); toast(T("Board pack saved", "Podklady uloženy")); }
      catch (e) { if (!e || e.code !== "declined") toast(T("The download did not start.", "Stahování se nespustilo.")); }
    } else {
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
    }
  } catch (e) {
    toast(T("The board pack could not be built here.", "Podklady se tu nepodařilo sestavit."));
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = label; }
  }
}

/* ---------- presentation mode ---------- */
let presI = -1, presSlides = [];
function buildPres() {
  const over = ORDER.filter((m) => { const t = topStage(m); return t && t.pct > 65; }).length;
  const gaImp = importShare("ga"), sc = expScore(SYSTEMS.drone.parts);
  const dls = allDeadlines().filter((w) => daysUntil(w.date) !== null && daysUntil(w.date) >= 0).slice(0, 3);
  const impOver = ORDER.filter((m) => { const i = importShare(m); return i && i.tp.pct > 65; }).length;
  const rec = ORDER.filter((m) => EOL_RIR[m] && EOL_RIR[m].v >= 25).map(mName);
  const reset = () => { clearSelection(); filter = "all"; paintChips(); if (globe) { globe.setFlows([]); globe.setRedSea(false); globe.highlightRoute(null); globe.applyVisibility(); } };
  return [
    { k: T("OreOrbit · critical minerals from orbit", "OreOrbit · kritické suroviny z oběžné dráhy"), h: T("Europe's defence runs on twelve minerals.", "Obrana Evropy stojí na dvanácti surovinách."), big: T(`${over} of ${ORDER.length}`, `${over} z ${ORDER.length}`), bt: T("have a supply stage where one country makes more than 65% of world output.", "má fázi dodávek, ve které jedna země vyrábí víc než 65 % světové produkce."), src: "USGS 2026, IEA 2026", go: () => { reset(); globe && globe.home(); } },
    { k: T("Gallium", "Galium"), h: T("Radar runs on one country's gallium.", "Radary běží na galiu jedné země."), big: "99%", bt: T("of the world's primary gallium is made in China.", "světového primárního galia se vyrábí v Číně."), t: gaImp ? T(`The EU bought ${gaImp.tp.pct}% of its unwrought gallium from ${iso2(gaImp.tp.cc)} in ${gaImp.tp.y}. Gallium nitride chips are the core of modern radar.`, `EU v roce ${gaImp.tp.y} koupila ${gaImp.tp.pct} % neopracovaného galia ze země ${iso2(gaImp.tp.cc)}. Čipy z nitridu galia jsou jádrem moderních radarů.`) : "", src: "USGS MCS 2026, Eurostat", go: () => { reset(); filter = "ga"; paintChips(); globe && (globe.applyVisibility(), globe.flyToMaterials(["ga"])); } },
    { k: T("Magnets", "Magnety"), h: T("Every motor needs a magnet.", "Každý motor potřebuje magnet."), big: "94%", bt: T("of sintered rare-earth magnets are made in China.", "slinutých magnetů ze vzácných zemin se vyrábí v Číně."), t: T("Europe's largest magnet plant opened in Narva, Estonia, in September 2025.", "Největší evropský závod na magnety se otevřel v září 2025 v estonské Narvě."), src: "IEA, October 2025; Government of Estonia", go: () => { reset(); filter = "ree"; paintChips(); globe && (globe.applyVisibility(), globe.flyToMaterials(["ree"])); } },
    { k: T("The sea route", "Námořní trasa"), h: T("If the Red Sea closes, Europe waits.", "Když se uzavře Rudé moře, Evropa čeká."), big: `+${REDSEA.capeDays - REDSEA.suezDays} ${T("days", "dní")}`, bt: T(`Shanghai to Rotterdam round the Cape: about ${REDSEA.capeDays} days instead of ${REDSEA.suezDays}, at 16 knots.`, `Šanghaj–Rotterdam kolem mysu: asi ${REDSEA.capeDays} dní místo ${REDSEA.suezDays}, při 16 uzlech.`), t: T("About 140,000 t of the tracked products reached the EU from China in 2025 (estimate from Eurostat).", "Asi 140 000 t sledovaných produktů dorazilo v roce 2025 z Číny do EU (odhad z Eurostatu)."), src: "Port Economics, Eurostat", go: () => { reset(); globe && (globe.setRedSea(true), globe.highlightRoute("cn-eu-cape", "cn-eu"), globe.flyToRoute("cn-eu-cape")); } },
    { k: T("Cobalt", "Kobalt"), h: T("Mined in Congo, refined in China.", "Těží se v Kongu, rafinuje v Číně."), big: "74%", bt: T("of the world's cobalt is mined in the DR Congo; over 75% of refined cobalt comes from China.", "světového kobaltu se těží v DR Kongu; přes 75 % rafinovaného kobaltu pochází z Číny."), t: T("The US-backed Lobito railway now offers a route west to the Atlantic.", "Železnice Lobito podporovaná USA nabízí cestu na západ k Atlantiku."), src: "USGS 2026, IEA 2026", go: () => { reset(); globe && (globe.highlightRoute("cd-co", "lobito"), globe.flyToRoute("cd-co")); } },
    { k: T("Mine to missile", "Od dolu ke střele"), h: T("A drone touches seven of the twelve.", "Dron se dotýká sedmi z dvanácti."), big: sc ? `${sc.score}/100` : "", bt: T("concentration score: the average of each material's highest single-country share.", "skóre koncentrace: průměr nejvyššího podílu jedné země u každé suroviny."), t: sc ? T(`It breaks first at ${mName(sc.worst.m).toLowerCase()} ${stageTxt(sc.worst.k).toLowerCase()}: ${pctTxt(sc.worst.x)} in ${sc.worst.x.who}.`, `Láme se nejdřív u suroviny ${mName(sc.worst.m).toLowerCase()} (${stageTxt(sc.worst.k).toLowerCase()}): ${pctTxt(sc.worst.x)} ${inCtry(sc.worst.x.who)}.`) : "", src: "USGS, IEA", go: () => { reset(); filter = "sys:drone"; paintChips(); globe && (globe.applyVisibility(), globe.setFlows(flowsFor(SYSTEMS.drone.parts)), globe.flyTo(38, 62, 3.6, 1600)); } },
    { k: T("Deadlines", "Termíny"), h: T("Three dates in the next three months.", "Tři data v příštích třech měsících."), big: dls[0] ? `${daysUntil(dls[0].date)}` : "", bt: dls[0] ? T(`days until ${fmtDay(dls[0].date)}: ${localTitle(dls[0])}.`, `dní do ${fmtDay(dls[0].date)}: ${localTitle(dls[0])}.`) : "", t: dls.slice(1).map((w) => `${fmtDay(w.date)}: ${localTitle(w)}`).join(" · "), src: dls.map((w) => w.source).filter(Boolean).join(", "), go: () => { reset(); globe && globe.flyTo(30, 100, 3.4, 1600); } },
    { k: T("2030", "2030"), h: T("Europe's targets for 2030.", "Cíle Evropy pro rok 2030."), big: "10 · 40 · 25 · 65", bt: T("per cent: mined, processed and recycled in the EU, and the most from any one country.", "procent: těžba, zpracování a recyklace v EU a nejvýš od jedné země."), t: T(`For ${impOver} of the 10, one country still supplies more than 65% of EU imports, and only ${rec.map((x) => x.toLowerCase()).join(" and ")} meet the recycling goal.`, `U ${impOver} z 10 stále dodává jedna země víc než 65 % dovozu do EU a cíl recyklace splňuje jen ${rec.map((x) => x.toLowerCase()).join(" a ")}.`), src: T("European Commission, Eurostat, IEEP", "Evropská komise, Eurostat, IEEP"), go: () => { reset(); globe && globe.flyTo(48, 16, 2.7, 1600); } }
  ];
}
function startPresent() {
  if (!globe) { toast(T("Presenting needs the 3D globe, which is not available here.", "Prezentace potřebuje 3D glóbus, který tu není k dispozici.")); return; }
  window.scrollTo(0, 0);
  if (tourIdx >= 0) endTour(true);
  PRESENTING = true;
  enterExplore();
  document.body.classList.add("presenting", "touring");
  globe.stopIntro && globe.stopIntro(false);
  let el = document.getElementById("pres");
  if (!el) {
    el = document.createElement("div"); el.id = "pres"; el.className = "pres"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", T("Presentation", "Prezentace"));
    el.innerHTML = `<div class="pres-card" aria-live="polite"><div class="pres-k label" id="pres-k"></div><h2 id="pres-h"></h2><div class="pres-big"><b id="pres-big"></b><span id="pres-bt"></span></div><p id="pres-t"></p><p class="pres-src" id="pres-src"></p></div>
      <div class="pres-nav glass"><button type="button" id="pres-prev" aria-label="${T("Previous", "Předchozí")}">←</button><span id="pres-n" class="mono"></span><button type="button" id="pres-next" aria-label="${T("Next", "Další")}">→</button><button type="button" id="pres-exit">${T("Exit", "Konec")}</button></div>`;
    $("#plate").appendChild(el);
    el.querySelector("#pres-prev").addEventListener("click", () => showPres(presI - 1));
    el.querySelector("#pres-next").addEventListener("click", () => showPres(presI + 1));
    el.querySelector("#pres-exit").addEventListener("click", endPresent);
  }
  el.hidden = false;
  presSlides = buildPres();
  try { const r = document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); if (r && r.catch) r.catch(() => {}); } catch (e) { /* full screen not allowed here: the overlay still fills the window */ }
  globe.relayout();
  showPres(0);
  document.addEventListener("keydown", presKey);
}
function presKey(e) {
  if (!PRESENTING) return;
  if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); showPres(presI + 1); }
  else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); showPres(presI - 1); }
  else if (e.key === "Escape") endPresent();
}
function showPres(i) {
  if (i >= presSlides.length) { endPresent(); return; }
  presI = Math.max(0, i);
  const s = presSlides[presI];
  $("#pres-k").textContent = s.k; $("#pres-h").textContent = s.h; $("#pres-big").textContent = s.big || ""; $("#pres-big").classList.toggle("long", String(s.big || "").length > 8); $("#pres-bt").textContent = s.bt || "";
  $("#pres-t").textContent = s.t || ""; $("#pres-t").hidden = !s.t; $("#pres-src").textContent = s.src ? T(`Source: ${s.src}`, `Zdroj: ${s.src}`) : "";
  $("#pres-n").textContent = `${String(presI + 1).padStart(2, "0")} / ${String(presSlides.length).padStart(2, "0")}`;
  $("#pres-prev").disabled = presI === 0;
  try { s.go(); } catch (e) { /* the slide still shows its text */ }
}
function endPresent() {
  if (!PRESENTING) return;
  PRESENTING = false;
  document.removeEventListener("keydown", presKey);
  const el = document.getElementById("pres"); if (el) el.hidden = true;
  document.body.classList.remove("presenting", "touring");
  try { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {}); } catch (e) { /* ignore */ }
  exitExplore();
}
document.addEventListener("fullscreenchange", () => { if (globe) globe.relayout(); });

/* ---------- live feeds added in v13 ---------- */
function v13OnLive(k) {
  if (k === "clouds" && LIVE.clouds && LIVE.clouds.image && globe) {
    applyClouds14();
    const sub = document.getElementById("lyr-clouds-sub");
    if (sub && LIVE.clouds.date) sub.textContent = T(`NASA VIIRS, ${fmtDay(LIVE.clouds.date)}. Snow and salt flats show white too`, `NASA VIIRS, ${fmtDay(LIVE.clouds.date)}. Bíle se ukazuje i sníh a solné pláně`);
  }
  if (k === "hotspots" || k === "so2" || k === "cnexports") renderSignals();
  if (k === "hotspots" || k === "so2") refreshVizTabs();
  if (["trade", "hazards", "conflict", "cnexports", "hotspots"].includes(k)) { clearTimeout(v13OnLive.t); v13OnLive.t = setTimeout(renderMonday, 120); }
  if (k === "trade") { renderScenario(); renderCompare(); if (expTab === "chain") renderExposure(); }
  if (k === "traffic" && ST.redSea) renderScenario();
}
function v13Clear() { if (globe && globe.setFlows) { globe.setFlows([]); globe.setRedSea(false); } }

/* ================= v14: memory, trends, real changes, Monday pack, data health ================= */
let DB14 = null, MEMORY = [], PACKS = {};
const RANK = { green: 0, amber: 1, red: 2 };
const isoDay = (t) => new Date(t).toISOString().slice(0, 10);
function v14Connect(db) {
  DB14 = db;
  try {
    db.collection("memory").orderBy("date", "desc").limit(12).onSnapshot((snap) => {
      MEMORY = snap.docs.map((d) => Object.assign({ id: d.id }, d.data() || {})).filter((x) => x && typeof x.date === "string" && x.mats && typeof x.mats === "object");
      renderMonday(); renderHealth();
    }, () => {});
    ["en", "cs"].forEach((l) => db.doc("packs/" + l).onSnapshot((d) => { PACKS[l] = d.exists ? d.data() : null; renderMonday(); renderHealth(); }, () => {}));
  } catch (e) { /* the page works without memory */ }
}

/* status as it stood `back` days ago, from the dated news, deadlines and hazard history the atlas holds */
function ragAt(m, back) {
  const now = new Date(), today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()), asOf = today - back * 86400000;
  const w = worstOf(m), conc = !!(w && w.x.pct > 65);
  const dl = allDeadlines().filter((x) => Array.isArray(x.materials) && x.materials.includes(m) && parseDay(x.date) >= asOf)[0];
  const dd = dl ? Math.round((parseDay(dl.date) - asOf) / 86400000) : null;
  const news = NEWS.filter((n) => touches(n, [m]) && !isNaN(parseDay(n.date)) && parseDay(n.date) <= asOf && (asOf - parseDay(n.date)) / 86400000 <= 7).length;
  let hz = 0;
  const H = LIVE.history && LIVE.history.days && LIVE.history.days[isoDay(asOf)];
  if (H && Array.isArray(H.nearIds)) hz = HZ.filter((h) => H.nearIds.includes(h.id)).filter((h) => sitesNear(h.lat, h.lng, 500).some((y) => y.s.m === m)).length;
  const cf = conflictFor(m);
  const moving = (dd !== null && dd <= 45) || news > 0 || hz > 0 || cf.length > 0;
  return { level: conc && moving ? "red" : (conc || moving) ? "amber" : "green", news, hz, dd, rebuilt: true };
}
/* last week's status: the newest weekly snapshot at least five days old, else rebuilt for seven days ago */
function lastWeek() {
  const today = parseDay(todayIso());
  const snap = MEMORY.find((x) => (today - parseDay(x.date)) / 86400000 >= 5);
  return snap ? { date: snap.date, mats: snap.mats, rebuilt: false } : null;
}
function trendFor(m, cur) {
  const lw = lastWeek();
  let prev = lw && lw.mats[m] ? lw.mats[m].level : null, date = lw ? lw.date : null, rebuilt = false;
  if (!prev) { prev = ragAt(m, 7).level; date = isoDay(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) - 7 * 86400000); rebuilt = true; }
  if (!RANK.hasOwnProperty(prev)) return null;
  const d = RANK[cur] - RANK[prev];
  return { dir: d > 0 ? "worse" : d < 0 ? "better" : "same", prev, date, rebuilt };
}
function trendHtml(t) {
  if (!t) return "";
  const word = t.dir === "worse" ? T("worse than", "hůř než") : t.dir === "better" ? T("better than", "lépe než") : T("same as", "stejně jako");
  const tip = `${word} ${fmtDay(t.date)} (${ragTxt(t.prev).toLowerCase()})${t.rebuilt ? T(", rebuilt from dated news and deadlines", ", zpětně dopočteno z datovaných zpráv a termínů") : ""}`;
  const ic = t.dir === "worse" ? "▲" : t.dir === "better" ? "▼" : "▬";
  return `<span class="trend ${t.dir}" title="${esc(tip)}" aria-label="${esc(tip)}">${ic}</span>`;
}

/* what changed: status moves, supplier shares month on month, heat week on week, chokepoint traffic */
const MON3 = (i) => T(MONTHS[i], CS_MONTHS_SHORT ? CS_MONTHS_SHORT[i] : MONTHS[i]);
const CS_MONTHS_SHORT = ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"];
function monthLabel(from, k) {
  const y = +from.slice(0, 4), mo = +from.slice(5, 7) - 1 + k;
  return `${MON3(((mo % 12) + 12) % 12)} ${y + Math.floor(mo / 12)}`;
}
function monthLoc(from, k) {   /* build 56: Czech locative, "v srpnu 2026" */
  const y = +from.slice(0, 4), mo = +from.slice(5, 7) - 1 + k;
  return `${MON_CS_LOC[((mo % 12) + 12) % 12]} ${y + Math.floor(mo / 12)}`;
}
function shareMoves(ms) {
  const out = [], M = LIVE.trade && LIVE.trade.materials;
  if (!M) return out;
  ms.forEach((m) => {
    const rows = M[m];
    if (!Array.isArray(rows)) return;
    rows.slice(0, 2).forEach((r) => {
      const mo = r.monthly;
      if (!mo || !Array.isArray(mo.cn) || !Array.isArray(mo.ext) || mo.cn.length < 2) return;
      const n = Math.min(mo.cn.length, mo.ext.length), a = n - 2, b = n - 1;
      if (!(mo.ext[a] > 3e5 && mo.ext[b] > 3e5)) return;
      const s0 = Math.round(mo.cn[a] / mo.ext[a] * 100), s1 = Math.round(mo.cn[b] / mo.ext[b] * 100);
      if (Math.abs(s1 - s0) < 10) return;
      const lab = LANG === "cs" ? (TRADE_CS[r.label] || r.label) : r.label;
      const t = T(`${lab}: China ${s1}% of EU imports in ${monthLabel(mo.from, b)}, ${s1 > s0 ? "up" : "down"} from ${s0}% in ${monthLabel(mo.from, a)}`,
        `${lab}: Čína ${s1} % dovozu do EU v ${monthLoc(mo.from, b)}, ${s1 > s0 ? "nárůst" : "pokles"} ${zeZ(s0)} ${s0} % v ${monthLoc(mo.from, a)}`);
      out.push({ kind: "data", html: `${esc(t)}<span class="ch-meta">Eurostat Comext</span>`, text: t, src: "Eurostat Comext", rank: Math.abs(s1 - s0) });
    });
  });
  return out.sort((x, y) => y.rank - x.rank).slice(0, 3);
}
function heatWeek(id) {
  const H = LIVE.hotspots && LIVE.hotspots.sites && LIVE.hotspots.sites[id];
  if (!H || !H.byDay) return null;
  const today = parseDay(todayIso());
  let w0 = 0, w1 = 0, seen0 = 0, seen1 = 0;
  Object.entries(H.byDay).forEach(([d, v]) => {
    const age = (today - parseDay(d)) / 86400000, hot = (v.n || v.px || 0) > 0;
    if (age >= 1 && age <= 7) { seen0++; if (hot) w0++; } else if (age >= 8 && age <= 14) { seen1++; if (hot) w1++; }
  });
  return seen0 ? { w0, w1: seen1 >= 4 ? w1 : null } : null;
}
function chokeWeek() {
  const out = {};
  ["suez", "cape", "babelmandeb", "malacca"].forEach((id) => {
    const P = LIVE.traffic && LIVE.traffic.chokepoints && LIVE.traffic.chokepoints[id];
    if (!P || !Array.isArray(P.total) || P.total.length < 14) return;
    const t = P.total, n = t.length;
    const a = sum(t.slice(n - 7)) / 7, b = sum(t.slice(n - 14, n - 7)) / 7, y = n > 371 ? sum(t.slice(n - 372, n - 365)) / 7 : null;
    out[id] = { now: a, prev: b, wk: b ? Math.round((a / b - 1) * 100) : null, yr: y ? Math.round((a / y - 1) * 100) : null, last: P.last };
  });
  return out;
}
function changesFor(ms) { return changesFor14(ms); }
function changesFor14(ms) {
  const items = [];
  const lw = lastWeek();
  ms.forEach((m) => {
    const cur = ragFor(m).level, t = trendFor(m, cur);
    if (t && t.dir !== "same") {
      const txt = T(`${mName(m)}: ${ragTxt(t.prev).toLowerCase()} on ${fmtDay(t.date)}, ${ragTxt(cur).toLowerCase()} now`, `${mName(m)}: ${fmtDay(t.date)} ${ragTxt(t.prev).toLowerCase()}, nyní ${ragTxt(cur).toLowerCase()}`);
      items.push({ kind: "status " + t.dir, html: `<span class="ch-st">${trendHtml(t)} ${esc(txt)}</span><span class="ch-meta">${t.rebuilt ? T("Status rebuilt for a week ago", "Stav zpětně dopočten") : T("Weekly snapshot", "Týdenní snímek stavu")}</span>`, text: txt, src: T("atlas status", "stav atlasu") });
    }
  });
  const base = changesForV13(ms).filter((c) => c.kind !== "orbit");
  items.push(...base);
  items.push(...shareMoves(ms));
  SITES.filter((s) => ms.includes(s.m)).forEach((s) => {
    const h = heatWeek(s.id);
    if (!h || (!h.w0 && !h.w1)) return;
    const t = h.w1 === null ? T(`${s.name}: heat detected on ${h.w0} of the last 7 days`, `${s.name}: teplo zachyceno ${h.w0} ze 7 posledních dní`)
      : T(`${s.name}: heat detected on ${h.w0} of the last 7 days (${h.w1} the week before)`, `${s.name}: teplo zachyceno ${h.w0} ze 7 posledních dní (týden předtím ${h.w1})`);
    items.push({ kind: "orbit", html: `<button class="tlink" data-sitego="${s.id}">${esc(t)}</button><span class="ch-meta">NASA VIIRS</span>`, text: t, src: "NASA VIIRS", rank: Math.abs(h.w0 - (h.w1 || 0)) });
  });
  if (ms.some((m) => LANE.includes(m))) {
    const c = chokeWeek();
    if (c.suez && c.cape) {
      const f = (x) => `${nf(x.now, 0)}${x.wk !== null ? ` (${x.wk >= 0 ? "+" : ""}${x.wk}%)` : ""}`;
      const t = T(`Ships a day this week: Suez ${f(c.suez)}, Cape of Good Hope ${f(c.cape)}, against the week before`, `Lodí denně tento týden: Suez ${f(c.suez)}, mys Dobré naděje ${f(c.cape)}, proti minulému týdnu`);
      items.push({ kind: "data", html: `<button class="tlink" data-chokego="suez">${esc(t)}</button><span class="ch-meta">IMF PortWatch</span>`, text: t, src: "IMF PortWatch" });
    }
  }
  return items;
}

/* the Monday panel, with trend arrows and the pack the scheduled task built */
function packMeta() { return PACKS[LANG] || PACKS.en || null; }
function renderMonday() {
  try { window.dispatchEvent(new Event("oo-data")); } catch (e) { /* old browsers */ }
  const my = loadMy();
  monPick.innerHTML = `<span class="mon-pick-l">${T("Your materials", "Vaše suroviny")}</span>` + ORDER.map((m) => `<button type="button" class="chip2" data-my="${m}" aria-pressed="${my.includes(m)}"><i style="background:var(--${m})"></i>${esc(mName(m))}</button>`).join("");
  const R = Object.fromEntries(my.map((m) => [m, ragFor(m)]));
  const counts = { red: 0, amber: 0, green: 0 };
  my.forEach((m) => counts[R[m].level]++);
  const next = allDeadlines().filter((w) => (daysUntil(w.date) === null || daysUntil(w.date) >= 0) && Array.isArray(w.materials) && w.materials.some((m) => my.includes(m)))[0];
  const nd = next ? daysUntil(next.date) : null;
  const changes = changesFor(my);
  const brief = BRIEFS[0];
  const pm = packMeta();
  monBody.innerHTML = `
    <div class="mon-cards">${my.map((m) => {
      const r = R[m], imp = importShare(m), dl = r.dl, tr = trendFor(m, r.level);
      return `<button type="button" class="mon-card" data-mat="${m}" style="--c:var(--${m})">
        <span class="mon-top"><span class="mon-name"><i style="background:var(--${m})"></i>${esc(mName(m))}</span><span class="rag-wrap">${trendHtml(tr)}<span class="rag ${r.level}">${esc(ragTxt(r.level))}</span></span></span>
        <span class="mon-big">${r.w ? `<b data-count>${esc(pctTxt(r.w.x))}</b><small>${esc(ctry(r.w.x.who))} · ${esc(stageTxt(r.w.k).toLowerCase())}</small>` : `<b>–</b><small>${T("no public world figure", "bez veřejného světového údaje")}</small>`}</span>
        <span class="mon-why">${r.why.length ? esc(r.why.join(" · ")) : T("Nothing moving this week.", "Tento týden bez pohybu.")}</span>
        <span class="mon-rows">
          <span><em>${T("EU imports", "Dovoz do EU")}</em>${imp ? esc(T(`${imp.tp.pct}% ${fromCc(imp.tp.cc)}, ${imp.tp.y}`, `${imp.tp.pct} % ${fromCc(imp.tp.cc)}, ${imp.tp.y}`)) : esc(LIVE.trade ? T("no data", "bez dat") : T("loading", "načítám"))}</span>
          <span><em>${T("Next", "Další")}</em>${dl ? esc(`${dl.when ? trStr(dl.when) : fmtDay(dl.date)} · ${inDays(daysUntil(dl.date))}`) : T("no dated deadline", "bez data")}</span>
        </span>
      </button>`;
    }).join("")}</div>
    <aside class="mon-side">
      <div class="mon-next">
        <div class="label">${T("Next deadline", "Nejbližší termín")}</div>
        ${next ? `<div class="mon-count"><b data-count>${nd === 0 ? T("Today", "Dnes") : nf(nd)}</b><span>${nd === 0 ? "" : T(nd === 1 ? "day" : "days", nd === 1 ? "den" : nd < 5 ? "dny" : "dní")}</span></div>
          <p>${esc(localTitle(next))}</p><div class="foot-line"><span>${esc(next.when ? trStr(next.when) : fmtDay(next.date))}</span>${mtags(next.materials)}${safeUrl(next.url) ? `<a href="${esc(safeUrl(next.url))}" target="_blank" rel="noopener">${esc(next.source || T("Source", "Zdroj"))}</a>` : ""}</div>` : `<p class="muted">${T("No dated deadline for these materials.", "Pro tyto suroviny není žádný datovaný termín.")}</p>`}
      </div>
      <div>
        <div class="label" style="margin-bottom:10px">${T("What changed in the last 7 days", "Co se změnilo za posledních 7 dní")}</div>
        ${changes.length ? `<ol class="changes">${changes.slice(0, 9).map((c) => `<li class="ch-${c.kind.split(" ")[0]}">${c.html}</li>`).join("")}</ol>` : `<p class="muted">${wireState === "off" ? T("Stories load for viewers signed in to the AI agent.", "Zprávy se načtou po přihlášení k AI agentovi.") : T("No new stories, hazards or data swings for these materials.", "Pro tyto suroviny žádné nové zprávy, hrozby ani výkyvy v datech.")}</p>`}
        ${brief ? `<p class="mon-brief"><span class="label">${T("This week's brief", "Přehled tohoto týdne")}</span><a href="#briefing">${esc(brief.title)}</a></p>` : ""}
      </div>
      <div class="mon-sum"><span class="rag red">${counts.red}</span><span class="rag amber">${counts.amber}</span><span class="rag green">${counts.green}</span></div>
      <div class="mon-act">${pm ? `<button class="btn" id="mon-dl">${T(`Monday pack · ${fmtDay(pm.date)}`, `Pondělní podklady · ${fmtDay(pm.date)}`)}</button><button class="btn ghost" id="mon-pack">${T("Build a fresh one", "Sestavit nové")}</button>` : `<button class="btn" id="mon-pack">${T("Board pack · 7 slides", "Podklady pro vedení · 7 snímků")}</button>`}<button class="btn ghost" id="mon-present">${T("Present", "Prezentovat")}</button></div>
      ${pm ? `<p class="srcs">${T(`Built by the atlas every Monday morning for ${(pm.mats || []).map((m) => MATERIALS[m] ? mName(m) : m).join(", ") || "the default materials"}; a fresh pack uses the materials you picked here.`, `Atlas je sestavuje každé pondělí ráno pro: ${(pm.mats || []).map((m) => MATERIALS[m] ? mName(m) : m).join(", ") || "výchozí suroviny"}; nové podklady použijí suroviny vybrané zde.`)}</p>` : ""}
      <p class="srcs">${T("Red: one country makes more than 65% of a stage and something is moving: a deadline within 45 days, a story this week, a live hazard or recorded armed conflict near a site. Amber: only one of the two. Green: neither. Arrows compare with last week's snapshot. A prompt to look, not a forecast.", "Červená: jedna země dělá víc než 65 % některé fáze a něco se děje: termín do 45 dní, zpráva tento týden, živá hrozba nebo zaznamenaný ozbrojený konflikt u lokality. Oranžová: jen jedno z obojího. Zelená: ani jedno. Šipky porovnávají se snímkem stavu z minulého týdne. Podnět k pozornosti, ne předpověď.")}</p>
    </aside>`;
  countUps(monBody);
}
async function downloadPack(btn) {
  const pm = packMeta();
  if (!pm || !DB14) return;
  const lang = PACKS[LANG] ? LANG : "en";
  const label = btn ? btn.textContent : "";
  if (btn) { btn.disabled = true; btn.textContent = T("Fetching…", "Načítám…"); }
  try {
    const parts = [];
    for (let i = 0; i < (pm.parts || 0); i++) {
      const d = await DB14.doc(`packs/${lang}-${i}`).get();
      const x = d.exists ? d.data() : null;
      if (!x || typeof x.data !== "string") throw new Error("missing part");
      parts.push(x.data);
    }
    const bin = atob(parts.join("")), u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    const blob = new Blob([u], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
    const filename = pm.filename || `oreorbit-board-pack-${pm.date}.pptx`;
    let dl = null;
    try { dl = await window.claude.use("downloads"); } catch (e) { dl = null; }
    if (dl) {
      try { await dl.save({ filename, data: blob }); toast(T("Board pack saved", "Podklady uloženy")); }
      catch (e) { if (!e || e.code !== "declined") toast(T("The download did not start.", "Stahování se nespustilo.")); }
    } else {
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
    }
  } catch (e) {
    toast(T("The Monday pack could not be fetched; building a fresh one instead.", "Pondělní podklady se nepodařilo načíst; sestavuji nové."));
    boardPack(null);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = label; }
  }
}
monBody.addEventListener("click", (e) => {
  if (e.target.closest("#mon-dl")) { e.stopImmediatePropagation(); downloadPack(e.target.closest("#mon-dl")); return; }
  const ch = e.target.closest("[data-chokego]");
  if (ch) { e.stopImmediatePropagation(); goGlobe(); selectChoke(ch.dataset.chokego); }
}, true);

/* the week's numbers, for the weekly memory the scheduled task keeps */
function atlasSnapshot() {
  const mats = {};
  ORDER.forEach((m) => {
    const r = ragFor(m), imp = importShare(m);
    mats[m] = { level: r.level, pct: r.w ? r.w.x.pct : null, who: r.w ? r.w.x.who : null, stage: r.w ? r.w.k : null, news: r.news, hz: r.hz, cf: r.cf.length, dd: r.dd, imp: imp ? { pct: imp.tp.pct, cc: imp.tp.cc, y: imp.tp.y } : null };
  });
  const hot = {};
  SITES.forEach((s) => { const h = heatWeek(s.id); if (h && h.w0) hot[s.id] = h.w0; });
  const cp = chokeWeek(), ships = LIVE.ships && LIVE.ships.counts ? LIVE.ships.counts : null;
  return { date: todayIso(), made: new Date().toISOString(), mats, hot, cp: Object.fromEntries(Object.entries(cp).map(([k, v]) => [k, Math.round(v.now * 10) / 10])), ships, news: NEWS.length, hazardsNear: HZ.length ? nearSupplyChain().length : 0 };
}
window.__atlasSnapshot = atlasSnapshot;

/* ---------- data health ---------- */
const HEALTH = [
  ["orbits", "Satellite orbits", "Oběžné dráhy družic", 3, "CelesTrak"],
  ["hazards", "Earthquakes and disaster alerts", "Zemětřesení a výstrahy", 3, "USGS, GDACS"],
  ["scenes", "Newest Sentinel-2 passes", "Nejnovější přelety Sentinelu-2", 3, "Earth Search"],
  ["ships", "Ships near chokepoints", "Lodě u úžin", 3, "AISStream.io"],
  ["history", "Daily history", "Denní historie", 3, T("this atlas", "tento atlas")],
  ["hotspots", "Heat at the plants", "Teplo v závodech", 12, "NASA FIRMS"],
  ["clouds", "Clouds", "Oblačnost", 24, "NASA GIBS"],
  ["prices", "Prices", "Ceny", 30, "FRED, IMF"],
  ["traffic", "Chokepoint and port traffic", "Provoz v úžinách a přístavech", 168, "IMF PortWatch"],
  ["conflict", "Armed conflict", "Ozbrojené konflikty", 168, "UCDP"],
  ["tenders", "EU defence tenders", "Obranné zakázky v EU", 168, "TED"],
  ["trade", "EU imports by origin", "Dovoz do EU podle původu", 168, "Eurostat Comext"],
  ["so2", "Sulphur dioxide over smelters", "Oxid siřičitý nad hutěmi", 168, "NASA GIBS"]
];
let FILES14 = {};
["imagery", "orbit-extras", "timelapse", "landsat", "emit"].forEach((k) => {
  fetch(`data/${k}.json`, { cache: "no-store" }).then((r) => r.ok ? r.json() : null).then((j) => { FILES14[k] = j || null; renderHealth(); if (k === "landsat" && j) LS = j.sites || {}; if (k === "emit" && j) { EMIT = j.sites || {}; EMIT_CLASSES = j.classes || []; } refreshVizTabs(); }).catch(() => { FILES14[k] = null; });
});
let LS = {}, EMIT = {}, EMIT_CLASSES = [];
function healthRow(name, src, at, cadH, extra) {
  const age = at ? (Date.now() - at) / 3.6e6 : null;
  const st = extra && extra.failed ? "fail" : age === null ? "none" : age <= cadH * 1.5 + 1 ? "ok" : age <= cadH * 3 + 2 ? "late" : "stale";
  const word = { ok: T("Fresh", "Čerstvé"), late: T("Late", "Opožděné"), stale: T("Stale", "Zastaralé"), fail: T("Failing", "Selhává"), none: T("Not loaded", "Nenačteno") }[st];
  const every = cadH <= 3 ? T("every 3 hours", "každé 3 hodiny") : cadH <= 12 ? T("twice a day", "dvakrát denně") : cadH <= 30 ? T("daily", "denně") : T("weekly", "týdně");
  return { st, html: `<tr class="h-${st}"><td><i class="hdot"></i>${esc(name)}<small>${esc(src)}</small></td><td>${at ? esc(fmtAgo(Date.now() - at)) : "–"}</td><td>${esc(every)}</td><td><span class="hst">${esc(word)}</span>${extra && extra.note ? `<small>${esc(extra.note)}</small>` : ""}</td></tr>` };
}
function renderHealth() {
  const box = document.getElementById("health-body");
  if (!box) return;
  const RS = LIVE.runstatus && LIVE.runstatus.sources || {};
  const rows = HEALTH.map(([k, en, cs, cad, src]) => {
    const d = LIVE[k], at = d && d.fetchedAt ? isoMs(d.fetchedAt) : (RS[k] && RS[k].ok ? isoMs(RS[k].ok) : null);
    const r = RS[k] || {};
    const failed = r.fails >= 2 && String(r.status || "").startsWith("failed");
    return healthRow(T(en, cs), src, at, cad, { failed, note: failed ? T(`last ${r.fails} runs failed`, `posledních ${r.fails} běhů selhalo`) : String(r.status || "").startsWith("skipped: no ") ? T("no key set", "chybí klíč") : "" });
  });
  rows.push(healthRow(T("News wire", "Zpravodajství"), T("GDELT, every 6 hours", "GDELT, každých 6 hodin"), META && META.lastRun ? isoMs(META.lastRun) : (NEWS[0] ? parseDay(NEWS[0].date) : null), 30, {}));
  const fileAt = (k) => FILES14[k] && FILES14[k].generated ? parseDay(FILES14[k].generated) : null;
  rows.push(healthRow(T("Mine pictures (Sentinel-2)", "Snímky dolů (Sentinel-2)"), "Planetary Computer", fileAt("imagery"), 168 + 24, {}));
  rows.push(healthRow(T("Radar and heat pictures", "Radarové a tepelné snímky"), "Planetary Computer", fileAt("orbit-extras"), 168 + 24, {}));
  rows.push(healthRow(T("Weekly status memory", "Týdenní paměť stavu"), T("automatic, weekly", "automaticky, týdně"), MEMORY[0] ? isoMs(MEMORY[0].made || MEMORY[0].date) : null, 168 + 24, {}));
  const n = rows.filter((r) => r.st === "ok").length;
  const run = LIVE.runstatus && LIVE.runstatus.run ? isoMs(LIVE.runstatus.run) : null;
  box.innerHTML = `<div class="health-sum"><b data-count>${n}</b><span>${T(`of ${rows.length} feeds fresh`, `${zeZ(rows.length)} ${rows.length} ${csPlural(rows.length, "zdroje", "zdrojů", "zdrojů")} je čerstvých`)}</span>${run ? `<span class="muted">${T(`Last live run ${fmtAgo(Date.now() - run)}`, `Poslední živý běh ${fmtAgo(Date.now() - run)}`)}</span>` : ""}</div>
    <div class="health-wrap"><table class="health"><thead><tr><th>${T("Feed", "Zdroj")}</th><th>${T("Updated", "Aktualizováno")}</th><th>${T("Expected", "Očekáváno")}</th><th>${T("State", "Stav")}</th></tr></thead><tbody>${rows.map((r) => r.html).join("")}</tbody></table></div>
    <p class="srcs">${T("Fresh: updated within one and a half refresh cycles. Late: within three. A failing feed keeps its last good data on the page, marked with its age.", "Čerstvé: aktualizováno do jednoho a půl obnovovacího cyklu. Opožděné: do tří. Selhávající zdroj nechává na stránce poslední dobrá data s uvedeným stářím.")}</p>`;
  if (wireState === "off") box.querySelector(".health-sum span").textContent = T("Live feeds load for viewers signed in to the AI agent.", "Živé zdroje se načtou po přihlášení k AI agentovi.");
}
setInterval(() => { if (!document.hidden) renderHealth(); }, 60000);

/* numbers that count up the first time they come into view */
const counted = new WeakSet();
function countUps(root) {
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  (root || document).querySelectorAll("[data-count], .stat b").forEach((el) => {
    if (counted.has(el)) return;
    const m = /^([^\d]*)(\d+)(.*)$/.exec(el.textContent.trim());
    if (!m || +m[2] < 3) return;
    counted.add(el);
    const io = new IntersectionObserver((en) => {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      const end = +m[2], t0 = performance.now(), dur = 900;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (el.isConnected) el.textContent = `${m[1]}${v}${m[3]}`;
        if (k < 1 && el.isConnected) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
  });
}

/* ---------- live documents added in v14 ---------- */
function applyClouds14() {
  if (!globe || !LIVE.clouds) return;
  const parts = [0, 1, 2, 3].map((i) => LIVE["cloudshi" + i]);
  const ok = parts.every((p) => p && p.date === LIVE.clouds.date && typeof p.image === "string");
  if (!(ok && globe.setCloudsHi && globe.setCloudsHi(parts)) && LIVE.clouds.image) globe.setClouds(LIVE.clouds.image);
}
function v14OnLive(k) {
  if (k === "clouds" || /^cloudshi\d$/.test(k)) applyClouds14();
  if (k === "history") { clearTimeout(v14OnLive.m); v14OnLive.m = setTimeout(renderMonday, 150); }
  if (k === "ships" && selShip && !panelEl.hidden) renderDrawer();
  clearTimeout(v14OnLive.t); v14OnLive.t = setTimeout(renderHealth, 400);
}

/* ---------- sections menu with reading progress ---------- */
const SECTIONS14 = [["top", "Atlas", "Atlas"], ["check", "Quick check", "Rychlá kontrola"], ["deepdive", "Go deeper", "Do hloubky"], ["trust", "Data & method", "Data a metoda"], ["monday", "This week", "Tento týden"], ["exposure", "The twelve minerals", "Dvanáct surovin"], ["scenarios", "Stress test", "Zátěžový test"], ["assess", "Your parts list", "Vlastní díly"], ["briefing", "Briefing", "Briefing"], ["chokepoints", "2030 targets", "Cíle 2030"], ["signals", "Live evidence", "Živé důkazy"], ["rules", "Rules & funding", "Pravidla a financování"], ["teams", "Monitoring", "Monitoring"], ["quiz", "Quiz", "Kvíz"], ["method", "Method", "Metoda"], ["health", "Data health", "Stav dat"]];
const secBtn = document.getElementById("sec-btn"), secPop = document.getElementById("sec-pop"), secList = document.getElementById("sec-list"), secCur = document.getElementById("sec-cur"), navProg = document.getElementById("nav-prog");
let secNow = "top";
function renderSecList() {
  if (!secList) return;
  secList.innerHTML = SECTIONS14.filter(([id]) => { if (id === "top") return true; const el = document.getElementById(id); return el && !el.hidden && el.offsetParent !== null && !el.classList.contains("joined") && !el.classList.contains("dd-part") && !el.classList.contains("tr-part"); }).map(([id, en, cs], i) => `<li><a href="#${id}" data-sec="${id}" aria-current="${id === secNow ? "true" : "false"}"><span class="sn">${String(i + 1).padStart(2, "0")}</span><span>${esc(T(en, cs))}</span></a></li>`).join("");
  const cur = SECTIONS14.find(([id]) => id === secNow);
  if (secCur && cur) secCur.textContent = T(cur[1], cur[2]);
}
function closeSec() { if (secPop && !secPop.hidden) { secPop.hidden = true; secBtn.setAttribute("aria-expanded", "false"); } }
if (secBtn && secPop) {
  secBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = secPop.hidden;
    secPop.hidden = !open; secBtn.setAttribute("aria-expanded", String(open));
    if (open) { renderSecList(); SND.tick(); const a = secPop.querySelector('[aria-current="true"]') || secPop.querySelector("a"); if (a) a.focus(); }
  });
  secPop.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-sec]");
    if (a && a.dataset.sec === "top") { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); enterExplore(); }
    if (a || e.target.closest("button")) closeSec();
  });
  document.addEventListener("click", (e) => { if (!e.target.closest("#secmenu")) closeSec(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !secPop.hidden) { closeSec(); secBtn.focus(); } });
}
function onScroll14() {
  const h = document.documentElement.scrollHeight - innerHeight;
  if (navProg) navProg.style.transform = `scaleX(${h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0})`;
  let cur = "top", best = -Infinity;
  const JOINED = { briefing: "monday", scenarios: "assess", method: "trust", health: "trust" };   // v19: joined parts count as their section
  for (const [id] of SECTIONS14) {
    if (id === "top") continue;
    const el = document.getElementById(id);
    if (!el || el.hidden || el.offsetParent === null) continue;   // hidden sections never count
    const t = el.getBoundingClientRect().top;
    if (t < innerHeight * 0.42 && t > best) { best = t; cur = JOINED[id] || id; }
  }
  if (cur !== secNow) { secNow = cur; renderSecList(); }
}
addEventListener("scroll", () => { if (!onScroll14.raf) onScroll14.raf = requestAnimationFrame(() => { onScroll14.raf = 0; onScroll14(); }); }, { passive: true });
renderSecList(); onScroll14();

/* ---------- sound, off until asked for ---------- */
const SND = (() => {
  let ctx = null, master = null, ambG = null, noiseBuf = null, on = false, verb = null;
  try { on = localStorage.getItem("cma-sound") === "on"; } catch (e) { on = false; }
  const btn = document.getElementById("nav-sound");
  function ensure() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    /* v17.2: a soft, dark 2.2-second room shared by every sound, the same recipe as the OreOrbit videos */
    try {
      const L = Math.floor(ctx.sampleRate * 2.2), ir = ctx.createBuffer(2, L, ctx.sampleRate);
      for (let c = 0; c < 2; c++) { const ch = ir.getChannelData(c); let lpv = 0; for (let i = 0; i < L; i++) { lpv = 0.82 * lpv + 0.18 * (Math.random() * 2 - 1); ch[i] = lpv * Math.pow(1 - i / L, 2.8) * (i < ctx.sampleRate * 0.012 ? 0 : 1); } }
      verb = ctx.createConvolver(); verb.buffer = ir;
      const vg = ctx.createGain(); vg.gain.value = 0.5; verb.connect(vg); vg.connect(master);
    } catch (e) { verb = null; }
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    let b = 0;
    for (let i = 0; i < d.length; i++) { b = 0.97 * b + 0.03 * (Math.random() * 2 - 1); d[i] = b * 3; }
    /* the room: a low hum of detuned tones and soft filtered noise, breathing slowly */
    ambG = ctx.createGain(); ambG.gain.value = 0.0; ambG.connect(master);
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 420; lp.Q.value = 0.6; lp.connect(ambG);
    [[55, 0.32, "sine"], [82.4, 0.16, "sine"], [110.2, 0.05, "triangle"], [164.8, 0.025, "sine"]].forEach(([f, v, ty]) => {
      const o = ctx.createOscillator(), g = ctx.createGain(); o.type = ty; o.frequency.value = f; o.detune.value = (Math.random() - 0.5) * 8; g.gain.value = v; o.connect(g); g.connect(lp); o.start();
    });
    const n = ctx.createBufferSource(); n.buffer = noiseBuf; n.loop = true;
    const nf2 = ctx.createBiquadFilter(); nf2.type = "lowpass"; nf2.frequency.value = 300;
    const ng = ctx.createGain(); ng.gain.value = 0.5; n.connect(nf2); nf2.connect(ng); ng.connect(ambG); n.start();
    const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 0.06; lg.gain.value = 0.05; lfo.connect(lg); lg.connect(ambG.gain); lfo.start();
    return ctx;
  }
  function setBtn() {
    if (!btn) return;
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? T("Sound on. Turn it off", "Zvuk zapnutý. Vypnout") : T("Sound off. Turn it on", "Zvuk vypnutý. Zapnout"));
    btn.title = on ? T("Sound on", "Zvuk zapnutý") : T("Sound off", "Zvuk vypnutý");
  }
  function apply() {
    if (!on) { if (ctx) { master.gain.setTargetAtTime(0, ctx.currentTime, 0.15); setTimeout(() => { if (!on && ctx) ctx.suspend(); }, 700); } return; }
    if (!ensure()) return;
    ctx.resume();
    master.gain.setTargetAtTime(0.9, ctx.currentTime, 0.3);
    ambG.gain.setTargetAtTime(0.14, ctx.currentTime, 1.2);
  }
  function toggle() {
    on = !on;
    try { localStorage.setItem("cma-sound", on ? "on" : "off"); } catch (e) { /* kept for this visit */ }
    setBtn(); apply();
    if (on) setTimeout(() => blip(520, 780, 0.16, 0.06), 120);
  }
  function out(n, wet) { n.connect(master); if (verb) { const s = ctx.createGain(); s.gain.value = wet == null ? 0.6 : wet; n.connect(s); s.connect(verb); } }
  function env(g, t, a, peak, rel) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + rel); }
  function blip(f0, f1, dur, vol, type) {
    if (!on || !ctx || ctx.state !== "running") return;
    const t = ctx.currentTime, g = ctx.createGain(), lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass"; lpf.frequency.value = 3200; lpf.connect(g);
    [1, 1.0035].forEach((d) => { const o = ctx.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(f0 * d, t); o.frequency.exponentialRampToValueAtTime(f1 * d, t + dur); o.connect(lpf); o.start(t); o.stop(t + dur + 0.7); });
    env(g, t, 0.012, (vol || 0.06) * 0.55, dur + 0.5); out(g, 0.55);
  }
  function chord(fs, vol) {
    if (!on || !ctx || ctx.state !== "running") return;
    fs.forEach((f, i) => { const t = ctx.currentTime + i * 0.07, o = ctx.createOscillator(), g = ctx.createGain(); o.type = "sine"; o.frequency.value = f; env(g, t, 0.02, vol || 0.035, 1.3); o.connect(g); out(g, 0.7); o.start(t); o.stop(t + 1.5); });
  }
  function whoosh(dur) {
    if (!on || !ctx || ctx.state !== "running") return;
    const t = ctx.currentTime, d = dur || 1.4, n = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    n.buffer = noiseBuf; n.loop = true; f.type = "bandpass"; f.Q.value = 0.8;
    f.frequency.setValueAtTime(180, t); f.frequency.exponentialRampToValueAtTime(900, t + d * 0.5); f.frequency.exponentialRampToValueAtTime(160, t + d);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.045, t + d * 0.5); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    n.connect(f); f.connect(g); out(g, 0.8); n.start(t); n.stop(t + d + 0.1);
  }
  function horn() {
    if (!on || !ctx || ctx.state !== "running") return;
    const t = ctx.currentTime, lp = ctx.createBiquadFilter(), g = ctx.createGain();
    lp.type = "lowpass"; lp.frequency.value = 520; env(g, t, 0.06, 0.06, 1.1); lp.connect(g); out(g, 0.7);
    [98, 98.4, 147].forEach((f) => { const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f; o.connect(lp); o.start(t); o.stop(t + 1.3); });
  }
  document.addEventListener("visibilitychange", () => { if (!ctx) return; if (document.hidden) ctx.suspend(); else if (on) ctx.resume(); });
  if (btn) btn.addEventListener("click", toggle);
  setBtn();
  /* browsers start audio only after a click or key press: pick up a saved "on" at the first one */
  if (on) { const go = () => { apply(); removeEventListener("pointerdown", go, true); removeEventListener("keydown", go, true); }; addEventListener("pointerdown", go, true); addEventListener("keydown", go, true); }
  return { get on() { return on; }, toggle, blip, chord, whoosh, horn, tick: () => blip(1300, 1100, 0.04, 0.025, "triangle") };
})();
/* sounds on the main moves; each wraps the existing function and calls it unchanged */
(() => {
  const _select = select; select = function (...a) { SND.blip(660, 990, 0.12, 0.05); return _select.apply(this, a); };
  const _selectShip = selectShip; selectShip = function (...a) { SND.horn(); return _selectShip.apply(this, a); };
  const _selectHazard = selectHazard; selectHazard = function (...a) { SND.blip(220, 140, 0.35, 0.07, "triangle"); return _selectHazard.apply(this, a); };
  const _selectChoke = selectChoke; selectChoke = function (...a) { SND.blip(440, 330, 0.2, 0.05); return _selectChoke.apply(this, a); };
  const _setFilter = setFilter; setFilter = function (...a) { if (a[1]) SND.tick(); return _setFilter.apply(this, a); };
})();

/* ---------- loading screen ---------- */
(() => {
  const el = document.getElementById("loader");
  if (!el) return;
  const bar = document.getElementById("ld-bar");
  let done = false;
  const finish = () => { if (done) return; done = true; el.classList.add("out"); setTimeout(() => el.remove(), 900); };
  if (!globe) { finish(); return; }
  addEventListener("globe-tex", (e) => { const n = e.detail || 0; if (bar) bar.style.transform = `scaleX(${Math.min(1, n / 3)})`; if (n >= 3) setTimeout(finish, 350); });
  setTimeout(finish, 9000);
})();

/* ---------- real ships: drawer with model, dead reckoning and the Cape against Suez ---------- */
const SHIP_KIND_TXT = { container: ["Container ship", "Kontejnerová loď"], bulk: ["Bulk carrier", "Loď na sypký náklad"], tanker: ["Tanker", "Tanker"], passenger: ["Passenger ship", "Osobní loď"], general: ["Vessel", "Plavidlo"] };
const AIS_NAV = { 0: ["under way", "v plavbě"], 1: ["at anchor", "na kotvě"], 5: ["moored", "uvázaná"], 3: ["restricted in manoeuvring", "omezená v manévrování"] };
function cpCompareHtml() {
  const c = chokeWeek();
  if (!c.suez || !c.cape) return "";
  const row = (id, name) => { const x = c[id]; return `<div class="v11-row"><span>${esc(name)}</span><b>${nf(x.now, 0)} ${T("a day", "denně")}${x.wk !== null ? ` · ${x.wk >= 0 ? "+" : ""}${x.wk}% ${T("w/w", "t/t")}` : ""}${x.yr !== null ? ` · ${x.yr >= 0 ? "+" : ""}${x.yr}% ${T("y/y", "r/r")}` : ""}</b></div>`; };
  const ratio = c.suez.now > 0 ? c.cape.now / c.suez.now : null;
  return `<div class="v11-card"><div class="v11-k">${T("Cape against Suez, last 7 days", "Mys proti Suezu, posledních 7 dní")}</div>
    <div class="v11-big"><b>${ratio ? nf(ratio, 1) + "×" : "–"}</b><span>${T("as many ships round the Cape of Good Hope as through the Suez Canal", "tolik lodí kolem mysu Dobré naděje jako Suezským průplavem")}</span></div>
    ${row("suez", T("Suez Canal", "Suezský průplav"))}${row("cape", T("Cape of Good Hope", "Mys Dobré naděje"))}${c.babelmandeb ? row("babelmandeb", "Bab-el-Mandeb") : ""}
    <p class="srcs">IMF PortWatch, ${T("satellite AIS, data to", "satelitní AIS, data do")} ${esc(fmtDay(String(c.suez.last || "").slice(0, 10)))}. ${T("w/w: against the week before; y/y: against the same week a year ago.", "t/t: proti předchozímu týdnu; r/r: proti stejnému týdnu před rokem.")}</p></div>`;
}
function drawerShip(id) {
  const v = SHIP_BY_ID[id];
  if (!v) { selShip = null; selLive = true; drawerLive(); return; }
  const est = globe && globe.shipEst ? globe.shipEst(id) : null;
  const kind = est ? est.kind : "general";
  const ageMs = est ? Date.now() - est.t0 : null;
  const fetched = LIVE.ships && LIVE.ships.fetchedAt ? fmtAgo(Date.now() - isoMs(LIVE.ships.fetchedAt)) : "";
  const area = LIVE.ships && LIVE.ships.counts ? Object.entries(LIVE.ships.counts).find(([k]) => (LIVE.ships.boxes || []).some((b) => b.id === k && b.name === v.box)) : null;
  const nav = AIS_NAV[v.nav];
  pHead.innerHTML = `<div class="kick"><span>${esc(T(...SHIP_KIND_TXT[kind]))}</span><span style="color:var(--live)">${T("AIS position", "Poloha z AIS")}</span></div><h2>${esc(v.name)}</h2><div class="muted">${esc(v.box)}${v.dest ? ` · ${T("bound for", "cíl")} ${esc(v.dest)}` : ""}</div><div class="coord">${fmtCoord(est ? est.lat : v.lat, est ? est.lng : v.lng)}</div>`;
  specWrap.hidden = true;
  pBody.innerHTML = `
    <div class="tele"><div><span>${T("Speed", "Rychlost")}</span><b>${v.sog !== null ? nf(v.sog, 1) + " kn" : "–"}</b></div><div><span>${T("Course", "Kurz")}</span><b>${Math.round(v.cog)}°</b></div><div><span>${T("Length", "Délka")}</span><b>${v.len ? nf(v.len) + " m" : "–"}</b></div><div><span>MMSI</span><b>${esc(v.mmsi)}</b></div>${v.dest ? `<div><span>${T("Destination", "Cíl")}</span><b>${esc(v.dest)}</b></div>` : ""}${nav ? `<div><span>${T("Status", "Stav")}</span><b>${esc(T(nav[0], nav[1]))}</b></div>` : ""}</div>
    <div class="actions"><button class="btn small${globe && globe.getFollow && globe.getFollow() ? "" : " ghost"}" id="ship-follow" aria-pressed="${globe && globe.getFollow && globe.getFollow() ? "true" : "false"}">${T("Follow on the globe", "Sledovat na glóbu")}</button><a class="btn small ghost" href="https://www.marinetraffic.com/en/ais/details/ships/mmsi:${esc(v.mmsi)}" target="_blank" rel="noopener">MarineTraffic</a></div>
    <p class="srcs">${T("A real position report broadcast by the ship and received by AISStream.io", "Skutečné hlášení polohy vysílané lodí a přijaté službou AISStream.io")}${ageMs !== null && isFinite(ageMs) ? ` ${fmtAgo(ageMs)}` : fetched ? ` ${fetched}` : ""}. ${est && est.moving ? T("The globe moves it on along its course and speed for up to an hour after the report, then holds it until the next report.", "Glóbus ji posouvá podle kurzu a rychlosti nejvýš hodinu po hlášení, pak ji drží do dalšího hlášení.") : T("At anchor, moored or barely moving, so the globe keeps it where it reported.", "Na kotvě, uvázaná nebo téměř bez pohybu, takže ji glóbus nechává na nahlášeném místě.")} ${T(`The 3D model shows a typical ${T(...SHIP_KIND_TXT[kind]).toLowerCase()} for its AIS type${v.len ? " and length" : ""}, not this ship.`, `3D model ukazuje typické plavidlo pro jeho typ v AIS${v.len ? " a délku" : ""}, ne tuto loď.`)} ${T("Not every ship near a chokepoint carries minerals.", "Ne každá loď u úžiny veze suroviny.")}</p>
    ${area ? `<div class="v11-row"><span>${T(`Ships heard in ${v.box} in the last listen`, `Lodě zachycené v oblasti ${v.box} při posledním poslechu`)}</span><b>${nf(area[1][0])} · ${nf(area[1][1])} ${T("moving", "v pohybu")}</b></div>` : ""}
    ${/Suez|Said|Mandeb|Cape|Gibraltar|Durban/.test(v.box) ? cpCompareHtml() : ""}`;
  const fb = pBody.querySelector("#ship-follow");
  if (fb) fb.addEventListener("click", () => { const on = !(globe.getFollow && globe.getFollow()); globe.setFollow(on); fb.setAttribute("aria-pressed", String(on)); fb.classList.toggle("ghost", !on); });
}

/* ---------- drawer tabs: icons, forty years of Landsat and minerals from EMIT ---------- */
function v14Tabs(s) {
  const set = (k, on) => { const b = vizTabs.querySelector(`[data-viz="${k}"]`); if (b) b.hidden = !on; };
  const tl = TL[s.id], ls = LS[s.id];
  set("lapse", !!((tl && tl.frames && tl.frames.length > 2) || (ls && ls.frames && ls.frames.length > 3)));
  set("minerals", !!EMIT[s.id]);
}
let lapseSrc = "ls";
function renderLapse(box, s) {
  const tl = TL[s.id], ls = LS[s.id];
  const haveS2 = !!(tl && tl.frames && tl.frames.length > 2), haveLs = !!(ls && ls.frames && ls.frames.length > 3);
  const src = haveLs && (lapseSrc === "ls" || !haveS2) ? "ls" : "s2";
  if (src === "s2") renderLapseS2(box, s); else renderLapseLs(box, s);
  if (haveS2 && haveLs) {
    const seg = document.createElement("div");
    seg.className = "seg-mini"; seg.setAttribute("role", "group"); seg.setAttribute("aria-label", T("Picture source", "Zdroj snímků"));
    seg.innerHTML = `<button type="button" data-lsrc="ls" aria-pressed="${src === "ls"}">${T("Landsat since", "Landsat od")} ${ls.frames[0].year}</button><button type="button" data-lsrc="s2" aria-pressed="${src === "s2"}">${T("Sentinel-2 since", "Sentinel-2 od")} ${tl.frames[0].year}</button>`;
    box.prepend(seg);
    seg.addEventListener("click", (e) => { const b = e.target.closest("[data-lsrc]"); if (!b || b.dataset.lsrc === src) return; lapseSrc = b.dataset.lsrc; clearInterval(lapseTimer); lapseTimer = null; renderLapse(box, s); });
  }
}
function renderLapseLs(box, s) {
  const L = LS[s.id], im = IMG[s.id] || {};
  const F = L.frames, n = F.length;
  let i = n - 1;
  const plat = [...new Set(F.map((f) => String(f.platform || "").replace("landsat-", "")))].join(", ");
  box.innerHTML = `<div class="cmp tl-view"><div class="tl-img" id="tl-img" role="img" aria-label="${esc(T(`${s.name} from Landsat, about every four years since ${F[0].year}`, `${s.name} z Landsatu, zhruba každé čtyři roky od ${F[0].year}`))}" style="background-image:url('${esc(L.file)}');background-size:${n * 100}% 100%"></div><span class="cmp-tag tl-tag" id="tl-tag" style="left:8px"></span><span class="cmp-tag tl-sat" id="tl-sat" style="right:8px"></span></div>
    <div class="tl-ctl"><button type="button" class="tl-play" id="tl-play" aria-label="${T("Play", "Přehrát")}" aria-pressed="false">${PLAY_SVG}</button>
      <div class="tl-track"><input type="range" id="tl-range" min="0" max="${n - 1}" step="1" value="${n - 1}" aria-label="${T("Year", "Rok")}"><div class="tl-years">${F.map((f) => `<span>${String(f.year).slice(2)}</span>`).join("")}</div></div></div>
    <p class="srcs">${T(`${n} clear Landsat pictures from ${F[0].year} to ${F[n - 1].year}, about one every four years in the same season, 30 m pixels, about ${im.spanKm || 7} km across. All frames share one colour stretch, so a change in colour is a change on the ground. Landsat 7 after May 2003 is left out because its scan-line corrector failed.`, `${n} jasných snímků Landsatu z let ${F[0].year} až ${F[n - 1].year}, zhruba jeden za čtyři roky ve stejném ročním období, pixel 30 m, asi ${im.spanKm || 7} km napříč. Všechny snímky mají stejné barevné roztažení, takže změna barvy je změna na zemi. Landsat 7 po květnu 2003 chybí, protože mu selhal korektor řádkování.`)} ${T("Landsat", "Landsat")} ${esc(plat)} · ${T("courtesy of the U.S. Geological Survey", "s laskavým svolením U.S. Geological Survey")}, ${T("via Microsoft Planetary Computer", "přes Microsoft Planetary Computer")}.</p>`;
  const img = box.querySelector("#tl-img"), tag = box.querySelector("#tl-tag"), sat = box.querySelector("#tl-sat"), range = box.querySelector("#tl-range"), play = box.querySelector("#tl-play");
  const show = (k) => { i = k; img.style.backgroundPosition = `${n > 1 ? (k / (n - 1)) * 100 : 0}% 0`; tag.textContent = fmtDay(F[k].date); sat.textContent = `Landsat ${String(F[k].platform || "").replace("landsat-", "")}`; range.value = k; };
  const stop = () => { clearInterval(lapseTimer); lapseTimer = null; play.setAttribute("aria-pressed", "false"); play.innerHTML = PLAY_SVG; };
  const start = () => {
    stop(); if (i >= n - 1) show(0);
    play.setAttribute("aria-pressed", "true"); play.innerHTML = PAUSE_SVG;
    lapseTimer = setInterval(() => { if (!img.isConnected || vizMode !== "lapse" || i >= n - 1) { stop(); return; } show(i + 1); }, 900);
  };
  range.addEventListener("input", () => { stop(); show(+range.value); });
  play.addEventListener("click", () => (lapseTimer ? stop() : start()));
  if (reduceMotion) show(n - 1); else start();
}
const EMIT_TXT = { carbonate: ["Carbonates", "Uhličitany"], clay: ["Clays", "Jíly"], mica: ["White micas", "Světlé slídy"], sulfate: ["Sulphates", "Sírany"], mgoh: ["Mg-OH minerals", "Minerály Mg-OH"], iron: ["Iron oxides", "Oxidy železa"], other: ["Other minerals", "Jiné minerály"] };
const EMIT_EX = { carbonate: ["calcite, dolomite", "kalcit, dolomit"], clay: ["kaolinite, smectite", "kaolinit, smektit"], mica: ["muscovite", "muskovit"], sulfate: ["gypsum, jarosite, alunite", "sádrovec, jarosit, alunit"], mgoh: ["chlorite, epidote, talc", "chlorit, epidot, mastek"], iron: ["hematite, goethite", "hematit, goethit"], other: ["", ""] };
function renderMinerals(box, s) {
  const e = EMIT[s.id], im = IMG[s.id] || {};
  if (!e) { box.innerHTML = ""; return; }
  const col = Object.fromEntries((EMIT_CLASSES || []).map((c) => [c[0], c[2]]));
  box.innerHTML = `<div class="cmp em-view"><img src="${esc(im.now)}" alt=""><img id="em-ov" class="em-ov" src="${esc(e.file)}" alt="${esc(T(`Surface minerals at ${s.name} from NASA EMIT`, `Povrchové minerály v lokalitě ${s.name} z NASA EMIT`))}"><span class="cmp-tag" style="left:8px">EMIT ${esc(fmtDay(e.date))}</span></div>
    <div class="em-ctl"><label><span>${T("Mineral map", "Mapa minerálů")}</span><input type="range" id="em-op" min="0" max="100" value="75" aria-label="${T("Mineral map opacity", "Průhlednost mapy minerálů")}"></label></div>
    <ul class="em-leg">${e.classes.filter(([, p]) => p > 0).map(([k, p]) => `<li><i style="background:${esc(col[k] || "#bec4c8")}"></i><span>${esc(T(...(EMIT_TXT[k] || [k, k])))}<small>${esc(T(...(EMIT_EX[k] || ["", ""])))}</small></span><b>${p}%</b><s style="--w:${Math.max(2, p)}%;--c:${esc(col[k] || "#bec4c8")}"></s></li>`).join("")}</ul>
    <p class="muted em-top">${T("Strongest library matches", "Nejsilnější shody s knihovnou")}: ${e.top.slice(0, 3).map(([n, p]) => `${esc(n)} ${p}%`).join(" · ")}</p>
    <p class="srcs">${T(`NASA's EMIT imaging spectrometer on the International Space Station, ${fmtDay(e.date)}, 60 m pixels, matched against a mineral spectral library (Tetracorder). It maps minerals at the surface, not ore at depth, and only bare ground: ${e.mappedPct}% of the ground clear of vegetation, water and cloud in this square had a confident match. Vegetation and water masked with Sentinel-2 from ${fmtDay(e.maskDate)}. Shares are of matched pixels.`, `Zobrazovací spektrometr NASA EMIT na Mezinárodní vesmírné stanici, ${fmtDay(e.date)}, pixel 60 m, porovnáno se spektrální knihovnou minerálů (Tetracorder). Mapuje minerály na povrchu, ne rudu v hloubce, a jen holou zem: ${e.mappedPct} % země bez vegetace, vody a mraků v tomto čtverci mělo spolehlivou shodu. Vegetace a voda maskovány Sentinelem-2 z ${fmtDay(e.maskDate)}. Podíly jsou ze spárovaných pixelů.`)} <a href="https://earth.jpl.nasa.gov/emit/mission/about" target="_blank" rel="noopener">NASA JPL EMIT</a> · LP DAAC.</p>`;
  const ov = box.querySelector("#em-ov"), op = box.querySelector("#em-op");
  op.addEventListener("input", () => { ov.style.opacity = op.value / 100; });
  ov.style.opacity = 0.75;
}

/* ---------- fly from the globe into a mine ---------- */
let FLY = null;
function flyIntoMine(s) {
  const im = IMG[s.id];
  if (!im || !im.terrain || !window.THREE) return;
  SND.whoosh(1.8);
  if (globe) globe.flyToPoint(s.lat, s.lng, 1.28);
  const plate = document.getElementById("plate");
  let ov = document.getElementById("flyin");
  if (!ov) {
    ov = document.createElement("div"); ov.id = "flyin"; ov.className = "flyin";
    ov.innerHTML = `<canvas id="fly-c" aria-label=""></canvas><div class="fly-hud"><button class="hud-btn glass" id="fly-back"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4"/></svg>${T("Back to the globe", "Zpět na glóbus")}</button><div class="fly-seg glass" id="fly-seg" role="group"></div></div><div class="fly-cap glass" id="fly-cap"></div>`;
    plate.appendChild(ov);
    ov.querySelector("#fly-back").addEventListener("click", () => closeFly());
  }
  const go = () => { ov.hidden = false; requestAnimationFrame(() => ov.classList.add("on")); startFly(ov, s, im); };
  if (reduceMotion) go(); else setTimeout(go, 1300);
}
function closeFly() {
  const ov = document.getElementById("flyin");
  if (!ov) return;
  ov.classList.remove("on");
  if (FLY) { FLY.stop = true; }
  setTimeout(() => { ov.hidden = true; if (FLY) { FLY.dispose(); FLY = null; } }, 500);
  SND.whoosh(1);
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && FLY) closeFly(); });
function startFly(ov, s, im) {
  if (FLY) { FLY.dispose(); FLY = null; }
  const canvas = ov.querySelector("#fly-c");
  canvas.setAttribute("aria-label", T(`${s.name} in 3D: Copernicus elevation draped with Sentinel-2. Drag to turn.`, `${s.name} ve 3D: výšky Copernicus potažené Sentinelem-2. Tažením otočíte.`));
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); } catch (e) { closeFly(); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07090c);
  scene.fog = new THREE.Fog(0x07090c, 6, 14);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 60);
  const ss = (() => { const d = new Date(), st = Date.UTC(d.getUTCFullYear(), 0, 0), n = (d - st) / 864e5; const decl = -23.44 * Math.cos(2 * Math.PI / 365 * (n + 10)); const h = d.getUTCHours() + d.getUTCMinutes() / 60; return { lat: decl, lng: ((-15 * (h - 12)) + 540) % 360 - 180 }; })();
  /* sun direction in the mine's east-north-up frame, kept above the horizon so the relief reads */
  const toR = Math.PI / 180, la = s.lat * toR, lo = s.lng * toR, sla = ss.lat * toR, slo = ss.lng * toR;
  const sx = Math.cos(sla) * Math.sin(slo - lo), sy = Math.cos(la) * Math.sin(sla) - Math.sin(la) * Math.cos(sla) * Math.cos(slo - lo), sz = Math.sin(la) * Math.sin(sla) + Math.cos(la) * Math.cos(sla) * Math.cos(slo - lo);
  const sun = new THREE.Vector3(sx, Math.max(0.35, sz), -sy).normalize();
  scene.add(new THREE.HemisphereLight(0xbfd6ff, 0x2a2118, 0.55));
  const dl = new THREE.DirectionalLight(0xfff1dd, 1.05); dl.position.copy(sun.clone().multiplyScalar(5)); scene.add(dl);
  const n = im.n, size = 4;
  const geo = new THREE.PlaneGeometry(size, size, n - 1, n - 1); geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 1, metalness: 0 });
  const mesh = new THREE.Mesh(geo, mat); scene.add(mesh);
  const skirt = new THREE.Mesh(new THREE.BoxGeometry(size, 0.2, size), new THREE.MeshStandardMaterial({ color: 0x1b1f24, roughness: 1 }));
  skirt.position.y = -0.1; scene.add(skirt);
  const grid = new THREE.GridHelper(14, 28, 0x24303c, 0x141b22); grid.position.y = -0.2; scene.add(grid);
  const texCanvas = document.createElement("canvas"); texCanvas.width = texCanvas.height = 1024;
  const tex = new THREE.CanvasTexture(texCanvas); tex.encoding = THREE.sRGBEncoding; tex.anisotropy = 8;
  mat.map = tex; mat.color.set(0xffffff); mat.needsUpdate = true;
  const layersAvail = [["sat", T("Satellite", "Satelit")]];
  if (EMIT[s.id]) layersAvail.push(["min", T("Minerals", "Minerály")]);
  const ox = OX[s.id] || {};
  if (ox.heat) layersAvail.push(["heat", T("Heat", "Teplo")]);
  if (ox.radar) layersAvail.push(["radar", T("Radar", "Radar")]);
  let layer = "sat";
  const loadImg = (u) => new Promise((res) => { if (!u) return res(null); const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = u; });
  async function paint() {
    const ctx = texCanvas.getContext("2d");
    const base = await loadImg(layer === "radar" ? ox.radar.file : im.now);
    if (base) ctx.drawImage(base, 0, 0, 1024, 1024);
    if (layer === "min" || layer === "heat") {
      const o = await loadImg(layer === "min" ? EMIT[s.id].file : ox.heat.file);
      if (o) { ctx.globalAlpha = layer === "min" ? 0.72 : 1; ctx.imageSmoothingEnabled = layer !== "min"; ctx.drawImage(o, 0, 0, 1024, 1024); ctx.globalAlpha = 1; ctx.imageSmoothingEnabled = true; }
    }
    tex.needsUpdate = true;
  }
  const seg = ov.querySelector("#fly-seg");
  seg.innerHTML = layersAvail.map(([k, t]) => `<button type="button" data-fl="${k}" aria-pressed="${k === layer}">${esc(t)}</button>`).join("");
  seg.onclick = (e) => { const b = e.target.closest("[data-fl]"); if (!b) return; layer = b.dataset.fl; seg.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); paint(); SND.tick(); };
  paint();
  const cap = ov.querySelector("#fly-cap");
  cap.innerHTML = `<b>${esc(s.name)}</b><span>${esc(T(`${im.spanKm || 7} km across · height ×${im.exag || 2} · relief ${nf(im.reliefM || 0)} m`, `${im.spanKm || 7} km napříč · převýšení ×${im.exag || 2} · výškový rozdíl ${nf(im.reliefM || 0)} m`))}</span><small>${esc(T(`Copernicus DEM GLO-30 and Sentinel-2 from ${fmtDay(im.nowDate)}. Light from today's sun.`, `Copernicus DEM GLO-30 a Sentinel-2 z ${fmtDay(im.nowDate)}. Světlo podle dnešního slunce.`))}</small>`;
  const state = { stop: false, yaw: 0.6, pitch: 1.45, dist: 7.2, t0: performance.now(), drag: null, idle: 0 };
  fetch(im.terrain).then((r) => r.ok ? r.json() : null).then((j) => {
    if (!j || !Array.isArray(j.h) || j.h.length !== n * n) return;
    const pos = geo.attributes.position, k = (im.exag || 2) * size / (im.spanKm * 1000);
    let mn = Infinity; for (const v of j.h) if (v < mn) mn = v;
    for (let i = 0; i < pos.count; i++) pos.setY(i, (j.h[i] - mn) / 10 * k);
    geo.computeVertexNormals(); pos.needsUpdate = true;
  }).catch(() => {});
  const resize = () => { const r = ov.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / Math.max(1, r.height); camera.updateProjectionMatrix(); };
  const ro = new ResizeObserver(resize); ro.observe(ov); resize();
  canvas.onpointerdown = (e) => { state.drag = { x: e.clientX, y: e.clientY, yaw: state.yaw, pitch: state.pitch }; canvas.setPointerCapture(e.pointerId); };
  canvas.onpointermove = (e) => { if (!state.drag) return; state.yaw = state.drag.yaw - (e.clientX - state.drag.x) * 0.006; state.pitch = Math.max(0.25, Math.min(1.45, state.drag.pitch + (e.clientY - state.drag.y) * 0.005)); state.idle = performance.now(); };
  canvas.onpointerup = () => { state.drag = null; state.idle = performance.now(); };
  canvas.onwheel = (e) => { e.preventDefault(); state.dist = Math.max(2.6, Math.min(9, state.dist * (e.deltaY > 0 ? 1.08 : 0.93))); state.idle = performance.now(); };
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  function loop(t) {
    if (state.stop) return;
    requestAnimationFrame(loop);
    const k = reduceMotion ? 1 : Math.min(1, (t - state.t0) / 2600), e = ease(k);
    /* start straight down, as the globe left it, then lean into an oblique view */
    if (!state.drag && k >= 1 && t - state.idle > 3000 && !reduceMotion) state.yaw += 0.0012;
    const pitch = k < 1 ? 1.5 - (1.5 - 0.62) * e : state.pitch, dist = k < 1 ? 9 - (9 - 5.4) * e : state.dist;
    if (k < 1) { state.pitch = pitch; state.dist = dist; }
    camera.position.set(Math.cos(state.yaw) * Math.cos(pitch) * dist, Math.sin(pitch) * dist, Math.sin(state.yaw) * Math.cos(pitch) * dist);
    camera.lookAt(0, 0.1, 0);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(loop);
  FLY = { stop: false, dispose() { state.stop = true; ro.disconnect(); geo.dispose(); mat.dispose(); tex.dispose(); renderer.dispose(); } };
  Object.defineProperty(FLY, "stop", { set(v) { state.stop = !!v; }, get() { return state.stop; } });
}

/* ---------- stress test: several materials at once, the Strait of Malacca, capacity against imports ---------- */
ST.extra = []; ST.malacca = false;
PRESETS.push(
  { id: "ga-ge", m: "ga", extra: ["ge"], stop: true, months: 6, redSea: false, malacca: false, en: "China stops gallium and germanium together for 6 months", cs: "Čína na 6 měsíců zastaví galium i germanium" },
  { id: "mal-3", m: "ree", extra: [], stop: false, months: 3, redSea: false, malacca: true, en: "The Strait of Malacca closes for 3 months", cs: "Malacký průliv se na 3 měsíce uzavře" }
);
/* atlas estimate from its own sea-lane waypoints (great-circle legs), 16 knots as for the Red Sea figures */
const MALACCA = {
  lombokNm: 1300, lombokDays: 3.4, sundaNm: 600, sundaDays: 1.5,
  path: [[31, 122.4], [22, 121], [12, 124.5], [5, 120.3], [0, 118.6], [-4, 117.8], [-8.75, 115.75], [-9.5, 112], [-7, 104], [-2, 96], [5.8, 80]],
  src: { u: "https://www.eia.gov/TODAYINENERGY/detail.php?id=32452", t: T("US EIA: the Strait of Malacca, 2017", "US EIA: Malacký průliv, 2017") }
};
/* the strait west of the Malay Peninsula, and the Singapore Strait at its southern end */
const inMalacca = (p) => (p[0] >= 0.8 && p[0] <= 6.5 && p[1] >= 95 && p[1] <= 102.5) || (p[0] >= 0.8 && p[0] <= 2 && p[1] > 102.5 && p[1] <= 104.4);
const MAL_ROUTES = ROUTES.filter((r) => r.legs.some((l) => l.pts.some(inMalacca)));
const CAPACITY = [
  { m: "ree", site: "narva", cap: 2000, codes: ["850511"], unit: ["t of magnets a year", "t magnetů ročně"], state: ["running since September 2025; first phase, planned to grow beyond 5,000 t", "v provozu od září 2025; první fáze, plán růstu nad 5 000 t"] },
  { m: "ga", site: "metlen-gallium", cap: 50, codes: ["81129289"], unit: ["t of gallium a year", "t galia ročně"], state: ["planned, commercial output from Q3 2027", "plánováno, komerční výroba od 3. čtvrtletí 2027"] },
  { m: "li", site: "cinovec", cap: 37500, codes: ["283691", "282520"], unit: ["t of lithium carbonate equivalent a year", "t ekvivalentu uhličitanu lithného ročně"], state: ["planned; EU imports are counted in tonnes of product, so the comparison is rough", "plánováno; dovoz do EU se počítá v tunách produktu, srovnání je tedy hrubé"] }
];
function capacityRows(ms) {
  const M = LIVE.trade && LIVE.trade.materials;
  if (!M) return [];
  return CAPACITY.filter((c) => ms.includes(c.m)).map((c) => {
    const rows = (M[c.m] || []).filter((r) => c.codes.includes(r.code));
    if (!rows.length) return null;
    const years = rows.map((r) => Object.keys(r.years || {}).filter((y) => r.years[y] && r.years[y].t).sort().pop()).filter(Boolean);
    const y = years.sort()[0];
    if (!y) return null;
    const t = rows.reduce((a, r) => a + ((r.years[y] || {}).t || 0), 0);
    if (!t) return null;
    const lab = rows.map((r) => LANG === "cs" ? (TRADE_CS[r.label] || r.label) : r.label).join(T(" and ", " a "));
    return { c, t, y, lab, pct: Math.round(c.cap / t * 100), s: SITE_BY_ID[c.site] };
  }).filter(Boolean);
}
function stMats(sc) { return [sc, ...ST.extra.map((id) => SCENARIOS.find((x) => x.id === id)).filter((x) => x && x.id !== sc.id)]; }
function renderStControls() {
  const box = stEl("st-ctl");
  if (!box) return;
  const sc = SCENARIOS.find((x) => x.id === scnSel) || SCENARIOS[0];
  box.innerHTML = `
    <div class="st-presets">${PRESETS.map((p) => `<button type="button" class="chip2" data-preset="${p.id}" aria-pressed="${p.m === scnSel && p.stop === ST.stop && p.months === ST.months && p.redSea === ST.redSea && !!p.malacca === ST.malacca && (p.extra || []).join() === ST.extra.join()}">${esc(T(p.en, p.cs))}</button>`).join("")}</div>
    <div class="st-row">
      <label class="st-sw"><input type="checkbox" id="st-stop" ${ST.stop ? "checked" : ""}><span>${T("Supply stop", "Zastavení dodávek")}</span></label>
      <label class="st-sw"><input type="checkbox" id="st-red" ${ST.redSea ? "checked" : ""}><span>${T("Red Sea closed", "Rudé moře uzavřené")}</span></label>
      <label class="st-sw"><input type="checkbox" id="st-mal" ${ST.malacca ? "checked" : ""}><span>${T("Strait of Malacca closed", "Malacký průliv uzavřený")}</span></label>
      <label class="st-dur"><span>${T("For", "Na")} <b id="st-mo">${ST.months}</b> ${T(ST.months === 1 ? "month" : "months", ST.months === 1 ? "měsíc" : ST.months < 5 ? "měsíce" : "měsíců")}</span><input type="range" id="st-months" min="1" max="24" step="1" value="${ST.months}" aria-label="${T("Duration in months", "Délka v měsících")}"></label>
    </div>
    ${ST.stop ? `<div class="st-also" role="group" aria-label="${T("Stop more materials at the same time", "Zastavit současně další suroviny")}"><span class="label">${T("At the same time", "Zároveň")}</span>${SCENARIOS.filter((x) => x.id !== sc.id).map((x) => `<button type="button" class="chip2" data-also="${x.id}" aria-pressed="${ST.extra.includes(x.id)}"><i style="background:var(--${x.m})"></i>${esc(mName(x.m))}</button>`).join("")}</div>` : ""}`;
}
document.getElementById("scenarios").addEventListener("change", (e) => {
  const id = e.target.id;
  if (id !== "st-stop" && id !== "st-red" && id !== "st-mal") return;
  e.stopImmediatePropagation();
  if (id === "st-stop") ST.stop = e.target.checked;
  if (id === "st-red") ST.redSea = e.target.checked;
  if (id === "st-mal") ST.malacca = e.target.checked;
  if (!ST.stop && !ST.redSea && !ST.malacca) ST.stop = true;
  renderScenario();
}, true);
document.getElementById("scenarios").addEventListener("click", (e) => {
  const a = e.target.closest("[data-also]");
  if (a) { const id = a.dataset.also; ST.extra = ST.extra.includes(id) ? ST.extra.filter((x) => x !== id) : [...ST.extra, id].slice(-4); renderScenario(); SND.tick(); return; }
  const p = e.target.closest("[data-preset]");
  if (p) { const P = PRESETS.find((x) => x.id === p.dataset.preset); if (P) { ST.extra = (P.extra || []).slice(); ST.malacca = !!P.malacca; } }
}, true);
function renderScenario() {
  renderStControls();
  if (!ST.stop && !ST.redSea && !ST.malacca) ST.stop = true;
  const sc = SCENARIOS.find((x) => x.id === scnSel) || SCENARIOS[0];
  const all = ST.stop ? stMats(sc) : [];
  scnList.querySelectorAll(".scn-btn").forEach((b) => b.setAttribute("aria-selected", String(ST.stop && b.dataset.scn === sc.id)));
  scnList.classList.toggle("off", !ST.stop);
  const start = todayIso(), end = addMonths(start, ST.months);
  const mo = ST.months, moTxt = T(`${mo} month${mo === 1 ? "" : "s"}`, `${mo} ${mo === 1 ? "měsíc" : mo < 5 ? "měsíce" : "měsíců"}`);
  const sea = [ST.redSea ? T("the Red Sea closes", "Rudé moře se uzavře") : null, ST.malacca ? T("the Strait of Malacca closes", "Malacký průliv se uzavře") : null].filter(Boolean);
  const stopTxt = all.length > 1 ? T(`${all[0].who === "China" && all.every((x) => x.who === "China") ? "China stops exporting" : "Supply stops for"} ${all.map((x) => mName(x.m).toLowerCase()).join(", ").replace(/, ([^,]*)$/, " and $1")}`, `${all.every((x) => x.who === "China") ? "Čína zastaví vývoz" : "Zastaví se dodávky"}: ${all.map((x) => mName(x.m).toLowerCase()).join(", ").replace(/, ([^,]*)$/, " a $1")}`) : ST.stop ? T(sc.title, trStr(sc.title)) : "";
  const title = ST.stop ? T(`${stopTxt} for ${moTxt}${sea.length ? ", and " + sea.join(" and ") : ""}.`, `${stopTxt} na ${moTxt}${sea.length ? " a " + sea.join(" a ") : ""}.`)
    : T(`${sea.join(" and ").replace(/^t/, "T")} for ${moTxt}.`, `${sea.join(" a ").replace(/^r/, "R").replace(/^m/, "M")} na ${moTxt}.`);
  const imps = all.map((x) => ({ x, rows: stImports(x, mo) }));
  const impTot = imps.reduce((a, r) => a + r.rows.reduce((b, q) => b + q.at, 0), 0);
  const systems = ST.stop ? Object.entries(SYSTEMS).filter(([k, s]) => k !== "custom" && s.parts.some((p) => all.some((x) => x.m === p.m))) : [];
  const laneMats = ST.redSea || ST.malacca ? LANE.filter((m) => !all.some((x) => x.m === m && x.who === "China")) : [];
  const mats = [...new Set([...all.map((x) => x.m), ...(ST.redSea || ST.malacca ? LANE : [])])];
  const inWin = allDeadlines().filter((w) => w.date >= start && w.date <= end && Array.isArray(w.materials) && w.materials.some((m) => mats.includes(m)));
  const ps = cpStats("babelmandeb") || cpStats("suez"), pm = cpStats("malacca");
  const caps = capacityRows(all.map((x) => x.m));
  scnOut.style.setProperty("--c", cssVar(ST.stop ? sc.m : "sb"));
  const one = (x) => { const st = x.stage ? STAGES[x.m][x.stage] : null; return `<div class="st-mat" style="--c:var(--${x.m})"><b>${st ? esc(pctTxt(st)) : "?"}</b><span><em>${esc(mName(x.m))}</em>${st ? esc(trStr(scnPhrase(x, st))) : T("China is the leading producer, but no public world total exists.", "Čína je největší výrobce, ale veřejný světový údaj neexistuje.")}</span></div>`; };
  scnOut.innerHTML = `
    <p class="st-title">${esc(title)}</p>
    ${ST.stop ? `<div class="st-mats${all.length > 1 ? " multi" : ""}">${all.map(one).join("")}</div>
    <div class="st-imp">
      <h3>${T("EU imports at stake", "Ohrožený dovoz do EU")}</h3>
      ${imps.some((r) => r.rows.length) ? `<div class="st-big"><b>${impTot > 0 ? fmtEur(impTot) : "€0"}</b><span>${T(`of direct EU imports over ${moTxt}, at last year's pace`, `přímého dovozu do EU za ${moTxt}, v loňském tempu`)}</span></div>
        ${imps.map(({ x, rows }) => rows.map((r) => `<div class="v11-row"><span><i class="dot" style="background:var(--${x.m})"></i>${esc(r.label)} · ${T(`${r.pct}% of EU imports from ${x.who}`, `${r.pct} % dovozu do EU z ${ctryGen(x.who)}`)}</span><b>${fmtEur(r.at)}${r.tAt >= 0.05 ? ` · ≈${nf(r.tAt, r.tAt < 100 ? 1 : 0)} t` : ""}</b></div>`).join("")).join("")}
        <p class="srcs">${T("Eurostat Comext, imports from outside the EU by origin. Tonnes estimated from the value share. Parts and products that contain the materials are not counted.", "Eurostat Comext, dovoz ze zemí mimo EU podle původu. Tuny odhadnuty z podílu na hodnotě. Díly a výrobky, které suroviny obsahují, nejsou započteny.")}</p>` : `<p class="srcs">${LIVE.trade ? T("No EU import data for these materials.", "Pro tyto suroviny nejsou data o dovozu.") : T("EU import figures load for viewers signed in to the AI agent.", "Údaje o dovozu se načtou po přihlášení k AI agentovi.")}</p>`}
    </div>
    ${caps.length ? `<div class="st-cap"><h3>${T("European capacity against EU imports", "Evropská kapacita proti dovozu do EU")}</h3>
      ${caps.map((r) => `<div class="cap-row" style="--c:var(--${r.c.m})"><div class="cap-top"><b>${esc(r.s ? r.s.name : r.c.site)}</b><span>${nf(r.c.cap)} ${esc(T(...r.c.unit))}</span></div>
        <div class="cap-bar" role="img" aria-label="${esc(T(`${r.pct}% of EU imports in ${r.y}`, `${r.pct} % dovozu do EU v roce ${r.y}`))}"><i style="width:${Math.min(100, r.pct)}%"></i>${r.pct > 100 ? `<s style="left:${Math.min(100, 10000 / r.pct)}%"></s>` : ""}</div>
        <p><b>${r.pct}%</b> ${esc(T(`of the EU's ${r.y} imports of ${r.lab.toLowerCase()} (${nf(Math.round(r.t))} t)`, `dovozu do EU v roce ${r.y}: ${r.lab.toLowerCase()} (${nf(Math.round(r.t))} t)`))} · <span class="muted">${esc(T(...r.c.state))}</span></p></div>`).join("")}
      <p class="srcs">${T("Capacity as published by the operators and on the atlas site cards; imports from Eurostat Comext. Capacity is a ceiling, not output.", "Kapacita podle provozovatelů a karet lokalit v atlasu; dovoz z Eurostatu Comext. Kapacita je strop, ne výroba.")}</p></div>` : ""}
    <p class="scn-prec">${all.map((x) => esc(trStr(x.prec))).join(" ")}</p>
    <div class="scn-grid">
      <div class="scn-col">
        <h3>${T("Systems that lose them", "Systémy, které o ně přijdou")}</h3>
        ${systems.length ? systems.map(([, s]) => `<div class="scn-item"><b>${esc(trStr(s.name))}</b><span>${s.parts.filter((p) => all.some((x) => x.m === p.m)).map((p) => `${esc(mName(p.m))}: ${esc(trStr(p.role))}`).join(" · ")}</span></div>`).join("") : `<div class="scn-item"><span>${T("No tracked system on the atlas.", "Žádný sledovaný systém v atlasu.")}</span></div>`}
      </div>
      <div class="scn-col">
        <h3>${T("Alternatives on the atlas", "Alternativy v atlasu")}</h3>
        ${all.map((x) => { const out = SITES.filter((s) => s.m === x.m && s.country !== x.who); return out.length ? out.map((s) => `<div class="scn-item"><b>${esc(s.name)}</b><span>${esc(mName(x.m))} · ${esc(ctry(s.country))} · ${esc(trStr(s.stage).toLowerCase())}</span>${ONLINE[s.id] ? `<span class="tl">${T("Planned output", "Plánovaná výroba")}: ${esc(trStr(ONLINE[s.id]))}</span>` : s.stage === "Planned" ? `<span class="tl">${T("Planned, no firm date", "Plánováno, bez pevného data")}</span>` : ""}</div>`).join("") : `<div class="scn-item"><span>${esc(mName(x.m))}: ${T("none on the atlas yet.", "zatím žádná v atlasu.")}</span></div>`; }).join("")}
      </div>
    </div>` : ""}
    ${ST.redSea ? `<div class="st-red">
      <h3>${T("Red Sea closed", "Rudé moře uzavřené")}</h3>
      <div class="st-big"><b>+${REDSEA.capeDays - REDSEA.suezDays} ${T("days", "dní")}</b><span>${T(`Shanghai to Rotterdam round the Cape: about ${nf(REDSEA.capeNm)} nautical miles and ${REDSEA.capeDays} days, against ${nf(REDSEA.suezNm)} and ${REDSEA.suezDays} through Suez, at 16 knots.`, `Šanghaj–Rotterdam kolem mysu Dobré naděje: asi ${nf(REDSEA.capeNm)} námořních mil a ${REDSEA.capeDays} dní, proti ${nf(REDSEA.suezNm)} a ${REDSEA.suezDays} přes Suez, při 16 uzlech.`)}</span></div>
      <div class="v11-row"><span>${T("Tracked cargo on this lane", "Sledovaný náklad na této trase")}</span><b>${laneMats.map((m) => esc(mName(m))).join(", ") || "–"}</b></div>
      <div class="v11-row"><span>${T("From China to the EU in 2025", "Z Číny do EU v roce 2025")}</span><b>${T("about 140,000 t", "asi 140 000 t")}</b></div>
      ${ps ? `<div class="v11-row"><span>${T(`${PW_NAME[ps.id] ? T(PW_NAME[ps.id][0], PW_NAME[ps.id][1]) : ps.id}: ships a day, last 7 days`, `${PW_NAME[ps.id] ? PW_NAME[ps.id][1] : ps.id}: lodí denně, posledních 7 dní`)}</span><b>${nf(ps.last7, 0)}${ps.chg !== null ? ` · ${ps.chg >= 0 ? "+" : ""}${ps.chg}% ${T("vs a year ago", "proti loňsku")}` : ""}</b></div>` : ""}
      ${cpCompareHtml()}
      <p class="srcs"><a href="${REDSEA.src.u}" target="_blank" rel="noopener">${esc(REDSEA.src.t)}</a> · IMF PortWatch · ${T("tonnage estimated from Eurostat", "tonáž odhadnuta z Eurostatu")}</p>
    </div>` : ""}
    ${ST.malacca ? `<div class="st-red st-mal">
      <h3>${T("Strait of Malacca closed", "Malacký průliv uzavřený")}</h3>
      <div class="st-big"><b>+${nf(MALACCA.lombokDays, 1)} ${T("days", "dne")}</b><span>${T(`China to Europe through the Lombok Strait and south of Java: about ${nf(MALACCA.lombokNm)} more nautical miles at 16 knots. Through the shallower Sunda Strait, for ships that fit: about ${nf(MALACCA.sundaNm)} more, ${nf(MALACCA.sundaDays, 1)} days.`, `Z Číny do Evropy Lombockým průlivem a jižně od Jávy: asi o ${nf(MALACCA.lombokNm)} námořních mil víc při 16 uzlech. Mělčím Sundským průlivem, pro lodě, které projedou: asi o ${nf(MALACCA.sundaNm)} víc, ${nf(MALACCA.sundaDays, 1)} dne.`)}</span></div>
      <div class="v11-row wrap"><span>${T("Atlas lanes through the strait", "Trasy atlasu přes průliv")}</span><b>${MAL_ROUTES.map((r) => esc(trStr(r.name))).join(", ")}</b></div>
      ${pm ? `<div class="v11-row"><span>${T("Strait of Malacca: ships a day, last 7 days", "Malacký průliv: lodí denně, posledních 7 dní")}</span><b>${nf(pm.last7, 0)}${pm.chg !== null ? ` · ${pm.chg >= 0 ? "+" : ""}${pm.chg}% ${T("vs a year ago", "proti loňsku")}` : ""}</b></div>` : ""}
      <p class="muted">${T("If the strait were blocked, nearly half of the world's fleet would have to sail round the Indonesian archipelago, through the Lombok or Sunda straits (US EIA).", "Kdyby byl průliv zablokovaný, téměř polovina světové flotily by musela obeplout indonéské souostroví Lombockým nebo Sundským průlivem (US EIA).")}</p>
      <p class="srcs"><a href="${MALACCA.src.u}" target="_blank" rel="noopener">${esc(MALACCA.src.t)}</a> · ${T("extra distance and days: atlas estimate from its own sea-lane waypoints, not a published figure", "delší trasa a dny: odhad atlasu z vlastních bodů námořních tras, ne zveřejněný údaj")} · IMF PortWatch</p>
    </div>` : ""}
    <div>
      <h3>${T(`Deadlines inside the window, ${fmtDay(start)} to ${fmtDay(end)}`, `Termíny uvnitř okna, ${fmtDay(start)} až ${fmtDay(end)}`)}</h3>
      ${inWin.length ? `<ol class="st-dl">${inWin.map((w) => { const d = daysUntil(w.date); return `<li><span class="mono">${T("day", "den")} ${d}</span><span><b>${esc(w.when ? trStr(w.when) : fmtDay(w.date))}</b> ${esc(localTitle(w))}</span></li>`; }).join("")}</ol>` : `<p class="muted">${T("No dated deadline falls inside this window.", "Do tohoto okna nespadá žádný datovaný termín.")}</p>`}
    </div>
    <p class="st-noprice">${T("No price forecast. Prices answer to stockpiles, contracts and policy in ways this atlas does not model.", "Bez předpovědi cen. Ceny reagují na zásoby, smlouvy a politiku způsobem, který tento atlas nemodeluje.")}</p>
    <div class="actions"><button class="btn" data-scn-globe="1">${T("See it on the globe", "Ukázat na glóbu")}</button>${ST.stop ? `<button class="btn ghost" data-share="scn">${T("Share card", "Sdílet kartu")}</button>` : ""}</div>`;
}
/* the globe view of the stress test: the v13 view, plus the Malacca detour */
document.getElementById("scenarios").addEventListener("click", (e) => {
  if (!e.target.closest("[data-scn-globe]") || !globe || !globe.setDetour) return;
  setTimeout(() => {
    globe.setDetour(ST.malacca ? [{ pts: MALACCA.path, color: "#ffd166", closed: [3.2, 100.9], label: T(`Detour via Lombok · +${nf(MALACCA.lombokDays, 1)} days`, `Objížďka přes Lombok · +${nf(MALACCA.lombokDays, 1)} dne`), labelAt: [-9.2, 112] }] : []);
    if (ST.malacca && !ST.redSea && !ST.stop) globe.flyToPoint(2, 108, 2.9);
  }, 30);
});
const _v13Clear = v13Clear;
v13Clear = function () { _v13Clear(); if (globe && globe.setDetour) globe.setDetour([]); };

/* ---------- board pack: seven slides with charts and two globe views ---------- */
function stModel() {
  const sc = SCENARIOS.find((x) => x.id === scnSel) || SCENARIOS[0];
  const all = ST.stop ? stMats(sc) : [];
  const start = todayIso(), end = addMonths(start, ST.months), mo = ST.months;
  const moTxt = T(`${mo} month${mo === 1 ? "" : "s"}`, `${mo} ${mo === 1 ? "měsíc" : mo < 5 ? "měsíce" : "měsíců"}`);
  const title = (scnOut.querySelector(".st-title") || {}).textContent || "";
  const lines = [];
  const imps = all.map((x) => ({ x, rows: stImports(x, mo) }));
  const tot = imps.reduce((a, r) => a + r.rows.reduce((b, q) => b + q.at, 0), 0);
  if (all.length && imps.some((r) => r.rows.length)) lines.push(T(`EU imports at stake: ${fmtEur(tot)} of direct imports over ${moTxt}, at last year's pace`, `Ohrožený dovoz do EU: ${fmtEur(tot)} přímého dovozu za ${moTxt}, v loňském tempu`));
  if (all.length) {
    const sys = Object.entries(SYSTEMS).filter(([k, s]) => k !== "custom" && s.parts.some((p) => all.some((x) => x.m === p.m))).map(([, s]) => trStr(s.name));
    if (sys.length) lines.push(T(`Systems that lose them: ${sys.join(", ")}`, `Systémy, které o ně přijdou: ${sys.join(", ")}`));
    capacityRows(all.map((x) => x.m)).forEach((r) => lines.push(T(`${r.s ? r.s.name : r.c.site}: ${nf(r.c.cap)} ${r.c.unit[0]}, ${r.pct}% of EU imports in ${r.y} (${r.c.state[0]})`, `${r.s ? r.s.name : r.c.site}: ${nf(r.c.cap)} ${r.c.unit[1]}, ${r.pct} % dovozu do EU v roce ${r.y} (${r.c.state[1]})`)));
  }
  if (ST.redSea) lines.push(T(`Red Sea closed: Shanghai to Rotterdam takes about ${REDSEA.capeDays} days round the Cape instead of ${REDSEA.suezDays} through Suez (16 knots)`, `Rudé moře uzavřené: Šanghaj–Rotterdam trvá kolem mysu asi ${REDSEA.capeDays} dní místo ${REDSEA.suezDays} přes Suez (16 uzlů)`));
  if (ST.malacca) lines.push(T(`Strait of Malacca closed: about ${MALACCA.lombokDays} more days from China to Europe via Lombok (atlas estimate)`, `Malacký průliv uzavřený: z Číny do Evropy asi o ${nf(MALACCA.lombokDays, 1)} dne déle přes Lombok (odhad atlasu)`));
  const mats = [...new Set([...all.map((x) => x.m), ...(ST.redSea || ST.malacca ? LANE : [])])];
  allDeadlines().filter((w) => w.date >= start && w.date <= end && Array.isArray(w.materials) && w.materials.some((m) => mats.includes(m))).slice(0, 3)
    .forEach((w) => lines.push(T(`Day ${daysUntil(w.date)}: ${localTitle(w)}`, `Den ${daysUntil(w.date)}: ${localTitle(w)}`)));
  lines.push(T("No price forecast: prices answer to stockpiles, contracts and policy in ways the atlas does not model", "Bez předpovědi cen: ceny reagují na zásoby, smlouvy a politiku způsobem, který atlas nemodeluje"));
  const st = sc.stage ? STAGES[sc.m][sc.stage] : null;
  const big = all.length ? (st ? pctTxt(st) : "?") : ST.redSea ? `+${REDSEA.capeDays - REDSEA.suezDays} ${T("days", "dní")}` : `+${nf(MALACCA.lombokDays, 1)} ${T("days", "dne")}`;
  const bigTxt = all.length ? (st ? trStr(scnPhrase(sc, st)) : "") : ST.redSea ? T("Shanghai to Rotterdam round the Cape", "Šanghaj–Rotterdam kolem mysu") : T("China to Europe via the Lombok Strait", "Z Číny do Evropy Lombockým průlivem");
  return { sc, st, title: title.replace(/\.$/, ""), lines, big, bigTxt, color: all.length ? PIN[sc.m] : "#a9b8cc" };
}
function weeklySeries(id, weeks) {
  const P = LIVE.traffic && LIVE.traffic.chokepoints && LIVE.traffic.chokepoints[id];
  if (!P || !Array.isArray(P.total) || !P.d0) return null;
  const t = P.total, d0 = parseDay(String(P.d0).slice(0, 10)), out = [];
  for (let end = t.length; end >= 7 && out.length < weeks; end -= 7) out.unshift({ d: isoDay(d0 + (end - 1) * 86400000), v: sum(t.slice(end - 7, end)) / 7 });
  return out;
}
async function boardPack(btn, opts) {
  opts = opts || {};
  const label = btn ? btn.textContent : "";
  if (btn) { btn.disabled = true; btn.textContent = T("Building…", "Sestavuji…"); }
  try {
    const Pptx = await loadPptx();
    const my = opts.mats || loadMy(), date = fmtDay(todayIso()), R = Object.fromEntries(my.map((m) => [m, ragFor(m)]));
    const p = new Pptx();
    const L = (x) => LANG === "cs" ? csNumbers(csDates(String(x == null ? "" : x))) : String(x == null ? "" : x);
    const addSlide0 = p.addSlide.bind(p);
    p.addSlide = (...a) => {
      const sl = addSlide0(...a), at = sl.addText.bind(sl), tb = sl.addTable.bind(sl);
      sl.addText = (t, o) => at(typeof t === "string" ? L(t) : t.map((r) => Object.assign({}, r, { text: L(r.text) })), o);
      sl.addTable = (rows, o) => tb(rows.map((r) => r.map((c) => typeof c === "string" ? L(c) : Object.assign({}, c, { text: L(c.text) }))), o);
      return sl;
    };
    const NS = 7;
    p.layout = "LAYOUT_WIDE"; p.author = "OreOrbit"; p.company = "Bohemia Defense"; p.title = T("Critical minerals board pack", "Kritické suroviny: podklady pro vedení");
    const F = "Arial", TX = "F3F4F4", DIM = "A3A9AD", FAINT = "697075", LINE = "2A2E31", BG = "050607";
    const foot = (s, n, src) => {
      s.addShape(p.ShapeType.line, { x: 0.6, y: 6.85, w: 12.13, h: 0, line: { color: LINE, width: 0.75 } });
      s.addText(`${T("OreOrbit · Critical minerals from orbit", "OreOrbit · kritické suroviny z oběžné dráhy")} · ${date} · ${src}`, { x: 0.6, y: 6.92, w: 11.2, h: 0.3, fontFace: F, fontSize: 9, color: FAINT, margin: 0 });
      s.addText(`${n} / ${NS}`, { x: 11.9, y: 6.92, w: 0.83, h: 0.3, fontFace: F, fontSize: 9, color: FAINT, align: "right", margin: 0 });
    };
    const head = (s, kick, title) => {
      s.background = { color: BG };
      s.addText(kick.toUpperCase(), { x: 0.6, y: 0.45, w: 12, h: 0.3, fontFace: F, fontSize: 10, bold: true, color: DIM, charSpacing: 3, margin: 0 });
      s.addText(title, { x: 0.6, y: 0.8, w: 12.1, h: 0.8, fontFace: F, fontSize: 30, color: TX, margin: 0 });
    };
    const th = (t) => ({ text: t, options: { bold: true, color: DIM, fontSize: 10, fill: { color: "0C0E10" } } });
    /* pictures of the globe, scaled down so the file stays small enough to send */
    const shrink = (src, maxW, q) => new Promise((res) => {
      const draw = (el, w0, h0) => { const k = Math.min(1, maxW / w0), c = document.createElement("canvas"); c.width = Math.round(w0 * k); c.height = Math.round(h0 * k); c.getContext("2d").drawImage(el, 0, 0, c.width, c.height); res(c.toDataURL("image/jpeg", q)); };
      if (!src) return res(null);
      if (src instanceof HTMLCanvasElement) return draw(src, src.width, src.height);
      const im = new Image(); im.onload = () => draw(im, im.naturalWidth, im.naturalHeight); im.onerror = () => res(null); im.src = src;
    });
    let img = null, img2 = null;
    try { if (globe) img = await shrink(opts.cover || globe.snapshot(), 1280, 0.8); } catch (e) { img = null; }
    try { if (globe && globe.snapshotAt) img2 = await shrink(globe.snapshotAt(8, 72, 3.1), 1000, 0.8); } catch (e) { img2 = null; }
    /* 1: cover */
    const s1 = p.addSlide(); s1.background = { color: BG };
    if (img) s1.addImage({ data: img, x: 6.2, y: 0, w: 7.13, h: 7.5, sizing: { type: "cover", w: 7.13, h: 7.5 } });
    s1.addText(T(`BOARD PACK · ${date}`, `PODKLADY PRO VEDENÍ · ${date}`), { x: 0.6, y: 0.6, w: 5.5, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: DIM, charSpacing: 3, margin: 0 });
    s1.addText(T("Critical minerals: where we stand", "Kritické suroviny: kde stojíme"), { x: 0.6, y: 1.6, w: 5.5, h: 2.0, fontFace: F, fontSize: 40, color: TX, valign: "top", margin: 0 });
    s1.addText(my.map((m) => ({ text: `● ${mName(m)}   `, options: { color: hex(PIN[m]) } })), { x: 0.6, y: 3.9, w: 5.5, h: 0.9, fontFace: F, fontSize: 14, margin: 0, valign: "top" });
    const cnt = { red: 0, amber: 0, green: 0 }; my.forEach((m) => cnt[R[m].level]++);
    s1.addText([
      { text: `${cnt.red} ${T("red", "červené")}   `, options: { color: RAG_HEX.red, bold: true } },
      { text: `${cnt.amber} ${T("amber", "oranžové")}   `, options: { color: RAG_HEX.amber, bold: true } },
      { text: `${cnt.green} ${T("green", "zelené")}`, options: { color: RAG_HEX.green, bold: true } }
    ], { x: 0.6, y: 4.9, w: 5.5, h: 0.5, fontFace: F, fontSize: 18, margin: 0 });
    s1.addText(T("Built from public data in the OreOrbit atlas. Status is a prompt to look, not a forecast.", "Sestaveno z veřejných dat atlasu OreOrbit. Stav je podnět k pozornosti, ne předpověď."), { x: 0.6, y: 6.2, w: 5.3, h: 0.7, fontFace: F, fontSize: 10, color: FAINT, margin: 0, valign: "top" });
    /* 2: status with the week's trend */
    const s2 = p.addSlide(); head(s2, T("Status by material", "Stav podle surovin"), T("Where one country holds the supply, and what is moving", "Kde dodávky drží jedna země a co se děje"));
    const rows2 = [[th(T("Material", "Surovina")), th(T("Status", "Stav")), th(T("Week", "Týden")), th(T("Most concentrated stage", "Nejkoncentrovanější fáze")), th(T("EU imports: largest supplier", "Dovoz do EU: největší dodavatel")), th(T("Next deadline", "Nejbližší termín"))]];
    my.forEach((m) => {
      const r = R[m], imp = importShare(m), dl = r.dl, t = trendFor(m, r.level);
      rows2.push([
        { text: mName(m), options: { bold: true, color: hex(PIN[m]) } },
        { text: `${ragTxt(r.level)}${r.why.length ? `\n${r.why.join(" · ")}` : ""}`, options: { color: RAG_HEX[r.level], fontSize: 10 } },
        { text: t ? `${t.dir === "worse" ? "▲" : t.dir === "better" ? "▼" : "▬"} ${t.dir === "same" ? T("same", "beze změny") : t.dir === "worse" ? T("worse", "hůř") : T("better", "lépe")}\n${T("from", "z")} ${ragTxt(t.prev).toLowerCase()}` : "–", options: { fontSize: 10, color: t && t.dir === "worse" ? RAG_HEX.red : t && t.dir === "better" ? RAG_HEX.green : DIM } },
        { text: r.w ? `${pctTxt(r.w.x)} ${ctry(r.w.x.who)} · ${stageTxt(r.w.k).toLowerCase()}` : T("no public world figure", "bez veřejného světového údaje") },
        { text: imp ? T(`${imp.tp.pct}% ${iso2(imp.tp.cc)} (${imp.tp.y})`, `${imp.tp.pct} % ${iso2(imp.tp.cc)} (${imp.tp.y})`) : "–" },
        { text: dl ? `${dl.when ? trStr(dl.when) : fmtDay(dl.date)}\n${localTitle(dl)}` : "–", options: { fontSize: 10 } }
      ]);
    });
    s2.addTable(rows2, { x: 0.6, y: 1.85, w: 12.13, colW: [1.6, 2.8, 1.15, 2.3, 2.0, 2.28], fontFace: F, fontSize: 12, color: TX, valign: "top", border: { type: "solid", pt: 0.5, color: LINE }, fill: { color: BG }, autoPage: false, rowH: 0.42 });
    foot(s2, 2, T("USGS, IEA, Eurostat Comext, atlas watch list; trend against last week's snapshot", "USGS, IEA, Eurostat Comext, sledované termíny atlasu; trend proti snímku z minulého týdne"));
    /* 3: what changed */
    const s3 = p.addSlide(); head(s3, T("This week", "Tento týden"), T("What changed in the last seven days", "Co se změnilo za posledních sedm dní"));
    const ch = changesFor(my).slice(0, 8);
    s3.addText(ch.length ? ch.map((c) => ({ text: `${c.text}${c.src ? `  (${c.src})` : ""}`, options: { bullet: { indent: 18 }, breakLine: true, paraSpaceAfter: 10 } })) : [{ text: T("No new stories, hazards or data swings for these materials in the last seven days.", "Pro tyto suroviny za posledních sedm dní žádné nové zprávy, hrozby ani výkyvy v datech.") }],
      { x: 0.6, y: 1.85, w: 12.1, h: 4.8, fontFace: F, fontSize: 15, color: TX, valign: "top", margin: 0 });
    foot(s3, 3, T("Atlas news wire, USGS, GDACS, Eurostat, UN Comtrade, NASA VIIRS, IMF PortWatch", "Zpravodajství atlasu, USGS, GDACS, Eurostat, UN Comtrade, NASA VIIRS, IMF PortWatch"));
    /* 4: concentration chart */
    const s4 = p.addSlide(); head(s4, T("Concentration", "Koncentrace"), T("The largest single-country share at any stage", "Největší podíl jedné země v kterékoli fázi"));
    const conc = my.map((m) => ({ m, w: worstOf(m) })).filter((x) => x.w).sort((a, b) => b.w.x.pct - a.w.x.pct);
    if (conc.length) {
      s4.addChart(p.ChartType.bar, [{ name: T("Share", "Podíl"), labels: conc.map((x) => L(`${mName(x.m)} · ${ctry(x.w.x.who)}`)), values: conc.map((x) => x.w.x.pct) }], {
        x: 0.6, y: 1.8, w: 8.2, h: 4.9, barDir: "bar", chartColors: ["8FB8FF"], catAxisLabelColor: TX, catAxisLabelFontFace: F, catAxisLabelFontSize: 12, valAxisLabelColor: DIM, valAxisLabelFontSize: 10, valAxisMaxVal: 100, valAxisMinVal: 0, valAxisMajorUnit: 25,
        valGridLine: { color: "1E2226", size: 0.5 }, catGridLine: { style: "none" }, showValue: true, dataLabelColor: TX, dataLabelFontSize: 11, dataLabelFormatCode: '0"%"', catAxisOrientation: "maxMin", plotArea: { fill: { color: BG } }, showLegend: false
      });
    }
    s4.addText([
      { text: T("The EU's 2030 benchmark", "Benchmark EU pro rok 2030"), options: { bold: true, color: TX, breakLine: true } },
      { text: T("No more than 65% of any strategic raw material from a single country, at any stage of processing (Critical Raw Materials Act).", "Nejvýše 65 % jakékoli strategické suroviny z jedné země v kterékoli fázi zpracování (akt o kritických surovinách)."), options: { color: DIM, breakLine: true, paraSpaceAfter: 14 } },
      { text: T(`${conc.filter((x) => x.w.x.pct > 65).length} of ${conc.length} materials are above it.`, `${conc.filter((x) => x.w.x.pct > 65).length} ${zeZ(conc.length)} ${conc.length} surovin je nad ním.`), options: { bold: true, color: "FFB36B" } }
    ], { x: 9.2, y: 1.9, w: 3.5, h: 4.6, fontFace: F, fontSize: 13, valign: "top", margin: 0 });
    foot(s4, 4, T("USGS Mineral Commodity Summaries 2026, IEA Global Critical Minerals Outlook 2026", "USGS Mineral Commodity Summaries 2026, IEA Global Critical Minerals Outlook 2026"));
    /* 5: sea lanes, the Cape against Suez */
    const s5 = p.addSlide(); head(s5, T("Sea lanes", "Námořní trasy"), T("Ships a day through Suez and round the Cape", "Lodí denně Suezem a kolem mysu"));
    const sz = weeklySeries("suez", 52), cp = weeklySeries("cape", 52);
    if (sz && cp && sz.length > 8) {
      const n = Math.min(sz.length, cp.length), a = sz.slice(-n), b = cp.slice(-n);
      s5.addChart(p.ChartType.line, [{ name: L(T("Suez Canal", "Suezský průplav")), labels: a.map((x) => L(fmtDay(x.d))), values: a.map((x) => Math.round(x.v * 10) / 10) }, { name: L(T("Cape of Good Hope", "Mys Dobré naděje")), labels: a.map((x) => L(fmtDay(x.d))), values: b.map((x) => Math.round(x.v * 10) / 10) }], {
        x: 0.6, y: 1.8, w: 7.3, h: 4.9, chartColors: ["8FB8FF", "FFB36B"], lineSize: 2, lineDataSymbol: "none", catAxisLabelColor: DIM, catAxisLabelFontSize: 9, catAxisLabelFrequency: 8, valAxisLabelColor: DIM, valAxisLabelFontSize: 10,
        valGridLine: { color: "1E2226", size: 0.5 }, catGridLine: { style: "none" }, showLegend: true, legendPos: "t", legendColor: TX, legendFontSize: 11, plotArea: { fill: { color: BG } }
      });
    } else s5.addText(T("Traffic figures load with the live data.", "Údaje o provozu se načtou s živými daty."), { x: 0.6, y: 2, w: 7, h: 0.5, fontFace: F, fontSize: 14, color: DIM, margin: 0 });
    if (img2) s5.addImage({ data: img2, x: 8.2, y: 1.8, w: 4.53, h: 4.9, sizing: { type: "cover", w: 4.53, h: 4.9 } });
    foot(s5, 5, T("IMF PortWatch, 7-day averages of satellite AIS transits", "IMF PortWatch, sedmidenní průměry průjezdů podle satelitního AIS"));
    /* 6: stress test */
    const sm = stModel();
    const s6 = p.addSlide(); head(s6, T("Stress test", "Zátěžový test"), sm.title);
    s6.addText(sm.big, { x: 0.6, y: 1.9, w: 4.2, h: 1.5, fontFace: F, fontSize: 66, color: hex(sm.color), margin: 0, valign: "top" });
    s6.addText(sm.bigTxt, { x: 0.6, y: 3.45, w: 4.0, h: 1.2, fontFace: F, fontSize: 14, color: DIM, margin: 0, valign: "top" });
    s6.addText(sm.lines.map((t) => ({ text: t, options: { bullet: { indent: 18 }, breakLine: true, paraSpaceAfter: 8 } })), { x: 5.1, y: 1.9, w: 7.6, h: 4.8, fontFace: F, fontSize: 13, color: TX, valign: "top", margin: 0 });
    foot(s6, 6, T("USGS, IEA, Eurostat Comext, Port Economics, US EIA, IMF PortWatch", "USGS, IEA, Eurostat Comext, Port Economics, US EIA, IMF PortWatch"));
    /* 7: 2030 gap and deadlines */
    const s7 = p.addSlide(); head(s7, T("2030 targets", "Cíle pro rok 2030"), T("The gap to 2030 and the next deadlines", "Mezera do roku 2030 a nejbližší termíny"));
    const rows7 = [[th(T("Material", "Surovina")), th(T("EU imports: largest supplier (cap 65%)", "Dovoz do EU: největší dodavatel (strop 65 %)")), th(T("Recycled (goal 25%)", "Recyklace (cíl 25 %)")), th(T("EU strategic projects", "Strategické projekty EU"))]];
    my.forEach((m) => {
      const imp = importShare(m), r = EOL_RIR[m], sp = EU_SP[m];
      rows7.push([
        { text: mName(m), options: { bold: true, color: hex(PIN[m]) } },
        { text: imp ? `${imp.tp.pct}% ${iso2(imp.tp.cc)}` : "–", options: { color: imp && imp.tp.pct > 65 ? "FFB36B" : TX } },
        { text: r ? (r.txt || `${r.v}%`) : "–", options: { color: r && r.v >= 25 ? RAG_HEX.green : TX } },
        { text: sp ? (sp.n ? T(`${sp.n} projects`, `${sp.n} ${csPlural(sp.n, "projekt", "projekty", "projektů")}`) : sp.named.join(", ")) : "–", options: { fontSize: 10 } }
      ]);
    });
    s7.addTable(rows7, { x: 0.6, y: 1.85, w: 7.6, colW: [1.6, 2.4, 1.4, 2.2], fontFace: F, fontSize: 12, color: TX, valign: "top", border: { type: "solid", pt: 0.5, color: LINE }, fill: { color: BG }, autoPage: false, rowH: 0.4 });
    const dls = allDeadlines().filter((w) => daysUntil(w.date) === null || daysUntil(w.date) >= 0).slice(0, 6);
    s7.addText(T("NEXT DEADLINES", "NEJBLIŽŠÍ TERMÍNY"), { x: 8.6, y: 1.85, w: 4.1, h: 0.3, fontFace: F, fontSize: 10, bold: true, color: DIM, charSpacing: 3, margin: 0 });
    s7.addText(dls.map((w) => ({ text: `${w.when ? trStr(w.when) : fmtDay(w.date)} · ${daysUntil(w.date)} ${T("days", "dní")}\n`, options: { bold: true, color: TX, breakLine: false } })).flatMap((x, i) => [x, { text: `${localTitle(dls[i])}`, options: { color: DIM, breakLine: true, paraSpaceAfter: 8 } }]),
      { x: 8.6, y: 2.25, w: 4.1, h: 4.4, fontFace: F, fontSize: 11, valign: "top", margin: 0 });
    foot(s7, 7, T("Eurostat Comext, European Commission CRM study 2023 and strategic projects 2025, IEEP", "Eurostat Comext, studie Evropské komise 2023 a strategické projekty 2025, IEEP"));
    let blob;
    try { blob = await p.write({ outputType: "blob", compression: true }); } catch (e) { blob = await p.write("blob"); }
    window.__boardPack = blob;
    if (opts.returnBlob) return blob;
    const filename = `oreorbit-board-pack-${todayIso()}.pptx`;
    let dl = null;
    try { dl = window.claude && typeof window.claude.use === "function" ? await window.claude.use("downloads") : null; } catch (e) { dl = null; }
    if (dl) {
      try { await dl.save({ filename, data: blob }); toast(T("Board pack saved", "Podklady uloženy")); }
      catch (e) { if (!e || e.code !== "declined") toast(T("The download did not start.", "Stahování se nespustilo.")); }
    } else {
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
    }
  } catch (e) {
    if (opts.returnBlob) throw e;
    toast(T("The board pack could not be built here.", "Podklady se tu nepodařilo sestavit."));
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = label; }
  }
}
/* the Monday scheduled task opens the page headless and calls this to build the pack and the week's snapshot */
window.__mondayPack = async (mats) => {
  if (globe) globe.home && globe.home();
  await new Promise((r) => setTimeout(r, 2600));
  const cover = globe ? globe.snapshot().toDataURL("image/jpeg", 0.86) : null;
  const blob = await boardPack(null, { returnBlob: true, mats: mats && mats.length ? mats : null, cover });
  const u = new Uint8Array(await blob.arrayBuffer());
  let s = "";
  for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
  return { b64: btoa(s), size: u.length, mats: mats && mats.length ? mats : loadMy(), snapshot: atlasSnapshot(), lang: LANG };
};

/* ---------- a pasted parts list, read by Claude ---------- */
let bomClaude = null, bomBusy = false;
async function readPartsWithClaude(btn) {
  const ta = document.getElementById("ex-parts-in");
  const text = ta ? ta.value : (customParts == null ? CUSTOM_DEFAULT : customParts);
  const lines = String(text || "").split(/\n+/).map((l) => l.trim()).filter(Boolean).slice(0, 40);
  if (!askSample || !lines.length || bomBusy) return;
  bomBusy = true;
  const label = btn ? btn.textContent : "";
  if (btn) { btn.disabled = true; btn.textContent = T("The AI agent is reading…", "AI agent čte…"); }
  try {
    const mats = ORDER.map((m) => `${m}: ${MATERIALS[m].name} (${ELEM[m].s}). Used in: ${MATERIALS[m].uses}`).join("\n");
    const prompt = `You map a defence or space bill of materials to the critical raw materials each part depends on.
Only these materials may be named, by id:
${mats}

Rules:
- For each input line, list the material ids the part directly depends on: its main material, a magnet, a semiconductor, a battery chemistry, an alloy. At most 3 ids per line, the most important first.
- Use [] when the line depends on none of the listed materials, or when you cannot tell.
- "why" is at most 12 words, plain English, naming the component that carries the material (for example "NdFeB rotor magnets", "GaN-on-SiC transistor", "tungsten heavy alloy core").
- Do not guess suppliers, quantities or prices.
Reply with only JSON: {"parts":[{"line":"<the line exactly as given>","materials":["ree"],"why":"..."}]}

Parts list, one per line:
${lines.join("\n")}`;
    const res = await askSample.json(prompt, { modelTier: "default", cache: true });
    const got = Array.isArray(res && res.parts) ? res.parts : [];
    const parts = [], unknown = [], why = {};
    got.forEach((r) => {
      const line = String(r && r.line || "").slice(0, 120), ms = Array.isArray(r && r.materials) ? r.materials.filter((m) => MATERIALS[m]).slice(0, 3) : [];
      if (!line) return;
      if (!ms.length) { unknown.push(line); return; }
      ms.forEach((m) => {
        const role = `${line}${r.why ? ` (${String(r.why).slice(0, 80)})` : ""}`;
        const p = parts.find((q) => q.m === m);
        if (!p) parts.push({ m, role }); else if (p.role.length < 140) p.role += "; " + role;
      });
      why[line] = String(r.why || "").slice(0, 80);
    });
    if (!parts.length) throw new Error("empty");
    bomClaude = { text: lines.join("\n"), parsed: { parts: ORDER.filter((m) => parts.some((p) => p.m === m)).map((m) => parts.find((p) => p.m === m)), unknown } };
    customParts = lines.join("\n");
    renderExposure();
  } catch (e) {
    toast(e && e.code === "rate_limited" ? T("The AI agent is busy; try again in a minute.", "AI agent je vytížený; zkuste to za minutu.") : T("The AI agent could not read the list; the keyword match is shown.", "AI agent seznam nepřečetl; zobrazeno párování podle klíčových slov."));
  } finally {
    bomBusy = false;
    if (btn && btn.isConnected) { btn.disabled = false; btn.textContent = label; }
  }
}
const _parseParts = parseParts;
parseParts = function (text) {
  if (bomClaude && String(text || "").split(/\n+/).map((l) => l.trim()).filter(Boolean).slice(0, 40).join("\n") === bomClaude.text) return bomClaude.parsed;
  return _parseParts(text);
};
const _renderExposure = renderExposure;
renderExposure = function () {
  _renderExposure();
  const box = document.querySelector(".ex-parts");
  if (!box) return;
  const usedClaude = bomClaude && (customParts || "").split(/\n+/).map((l) => l.trim()).filter(Boolean).join("\n") === bomClaude.text;
  const p = box.querySelector(".srcs");
  if (p && usedClaude) p.textContent = T("Read automatically from the list above and checked against the atlas materials; edit the list to fall back to keywords. ", "Přečteno automaticky ze seznamu výše a ověřeno proti surovinám atlasu; úpravou seznamu se vrátíte k párování podle klíčových slov. ") + (bomClaude.parsed.unknown.length ? T(`No tracked material: ${bomClaude.parsed.unknown.slice(0, 6).join(", ")}.`, `Bez sledované suroviny: ${bomClaude.parsed.unknown.slice(0, 6).join(", ")}.`) : "");
  if (askSample && !box.querySelector("#ex-claude")) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "btn small" + (usedClaude ? " ghost" : ""); b.id = "ex-claude";
    b.textContent = usedClaude ? T("Read again with AI agent", "Přečíst znovu s AI agentem") : T("Read it with AI agent", "Přečíst s AI agentem");
    b.addEventListener("click", () => readPartsWithClaude(b));
    const note = document.createElement("span"); note.className = "muted ex-claude-note";
    note.textContent = T("Sends the list to the AI agent under your own claude.ai account to match parts the keywords miss. The atlas stores nothing. Do not paste classified, export-controlled or customer-confidential lists.", "Pošle seznam AI agentovi pod vaším vlastním účtem claude.ai, aby spároval díly, které klíčová slova minou. Atlas nic neukládá. Nevkládejte utajované seznamy, seznamy podléhající kontrole vývozu ani důvěrné seznamy zákazníků.");
    const row = document.createElement("div"); row.className = "ex-claude-row"; row.append(b, note);
    box.appendChild(row);
  }
};

/* ---------- Ask the atlas and search know the v13 and v14 data ---------- */
function v14AskLines() {
  const L = [];
  try {
    L.push("WEEKLY STATUS (material | status now | trend vs last week | why):");
    ORDER.forEach((m) => { const r = ragFor(m), t = trendFor(m, r.level); L.push(`${m} | ${r.level} | ${t ? `${t.dir} (was ${t.prev} on ${t.date}${t.rebuilt ? ", rebuilt" : ""})` : "n/a"} | ${r.why.join("; ")}`); });
    const c = chokeWeek();
    if (c.suez && c.cape) L.push(`CAPE VS SUEZ (IMF PortWatch, ships a day, last 7 days): Suez ${c.suez.now.toFixed(1)} (${c.suez.wk}% w/w, ${c.suez.yr}% y/y), Cape ${c.cape.now.toFixed(1)} (${c.cape.wk}% w/w, ${c.cape.yr}% y/y)${c.malacca ? `, Malacca ${c.malacca.now.toFixed(1)}` : ""}`);
    L.push(`STRESS TEST ON THE PAGE: ${(scnOut.querySelector(".st-title") || {}).textContent || ""}`);
    L.push(`MALACCA CLOSURE (atlas estimate from its waypoints): via Lombok about +${MALACCA.lombokNm} nm, +${MALACCA.lombokDays} days at 16 kn; via Sunda about +${MALACCA.sundaNm} nm, +${MALACCA.sundaDays} days. EIA: nearly half the world's fleet would reroute via Lombok or Sunda.`);
    L.push(`RED SEA CLOSURE: Shanghai–Rotterdam ${REDSEA.capeNm} nm / ${REDSEA.capeDays} days via the Cape vs ${REDSEA.suezNm} nm / ${REDSEA.suezDays} days via Suez [${REDSEA.src.t}].`);
    capacityRows(ORDER).forEach((r) => L.push(`CAPACITY: ${r.c.site} ${r.c.cap} ${r.c.unit[0]} = ${r.pct}% of EU ${r.y} imports of ${r.lab} (${Math.round(r.t)} t); ${r.c.state[0]}`));
    L.push("2030 GAP (material | recycled share end-of-life | EU strategic projects):");
    ORDER.forEach((m) => { const r = EOL_RIR[m], sp = EU_SP[m]; L.push(`${m} | ${r ? (r.txt || r.v + "%") : "n/a"} | ${sp ? (sp.n ? sp.n + " projects" : sp.named.join(", ")) : "n/a"}`); });
    Object.entries(EMIT).forEach(([id, e]) => L.push(`EMIT SURFACE MINERALS at site ${id} (${e.date}, 60 m, surface only, ${e.mappedPct}% of bare ground matched): ${e.classes.map(([k, p]) => `${k} ${p}%`).join(", ")}; top matches ${e.top.slice(0, 3).map(([n, p]) => `${n} ${p}%`).join(", ")}`));
    Object.entries(LS).forEach(([id, l]) => L.push(`LANDSAT TIME-LAPSE at site ${id}: ${l.frames.length} frames ${l.frames[0].year}–${l.frames[l.frames.length - 1].year}`));
    if (LIVE.ships && LIVE.ships.counts) L.push(`AIS SHIPS HEARD in the last 90-second listen (area id: seen/moving): ${Object.entries(LIVE.ships.counts).map(([k, v]) => `${k} ${v[0]}/${v[1]}`).join(", ")}; fetched ${LIVE.ships.fetchedAt}`);
    const H = LIVE.hotspots && LIVE.hotspots.sites;
    if (H) L.push(`HEAT AT PLANTS (VIIRS days with detections in the last 7 days): ${Object.entries(H).filter(([, v]) => v.daysHot7).map(([k, v]) => `${k} ${v.daysHot7}`).join(", ") || "none"}`);
    const RS = LIVE.runstatus && LIVE.runstatus.sources;
    if (RS) L.push(`DATA HEALTH: ${Object.entries(RS).map(([k, v]) => `${k} ${String(v.status || "").split(":")[0]}${v.ok ? " (last ok " + v.ok.slice(0, 16) + ")" : ""}`).join("; ")}`);
  } catch (e) { /* never block an answer on these extras */ }
  return L;
}
[
  ["monday", "This week", "Tento týden", "Your materials, red amber green, what changed, Monday board pack", "status trend week changed pack board monday"],
  ["exposure", "Exposure", "Expozice", "From mine to missile, and your own parts list", "exposure parts bill of materials bom system chain"],
  ["scenarios", "Stress test", "Zátěžový test", "Supply stops, the Red Sea and the Strait of Malacca", "stress test scenario what if red sea malacca capacity imports"],
  ["chokepoints", "2030 targets", "Cíle 2030", "The gap to the EU's 2030 benchmarks", "2030 gap recycling strategic projects benchmark target"],
  ["signals", "Signals", "Signály", "Heat at plants, sulphur dioxide, China's exports", "signals heat so2 sulphur exports comtrade"],
  ["health", "Data health", "Stav dat", "Which feeds are fresh, late or failing", "data health feeds status fresh stale failing sources"]
].forEach(([id, en, cs, sub, key]) => SEARCH_INDEX.push({ kind: "Section", title: T(en, cs), sub, ic: "§", key: `${en} ${cs} ${key}`, go: () => setTimeout(() => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }, 60) }));
SEARCH_INDEX.push({ kind: "Live", title: T("Cape against Suez", "Mys proti Suezu"), sub: T("Ships a day this week, IMF PortWatch", "Lodí denně tento týden, IMF PortWatch"), ic: "◌", key: "cape suez ships traffic red sea portwatch week", go: () => selectChoke("suez") });

/* ---------- start ---------- */
renderHealth();
countUps(document.getElementById("stats"));
vizTabs.addEventListener("click", (e) => { const b = e.target.closest("[data-flyin]"); if (b && selected && SITE_BY_ID[selected]) flyIntoMine(SITE_BY_ID[selected]); });
/* automation hook for local checks only: present when the address carries ?debug */
if (/[?&]debug\b/.test(location.search)) window.__dbg = { enterExplore, select: (...a) => select(...a), selectShip: (...a) => selectShip(...a), selectChoke: (...a) => selectChoke(...a), clearSelection, setFilter: (...a) => setFilter(...a), globe: () => globe, ships: () => SHIPS, lang: () => LANG };

/* ---------- start ---------- */
["#monday", "#exposure", "#chokepoints"].forEach((sel) => document.querySelector(sel).addEventListener("click", (e) => {
  const t = e.target.closest("[data-site],[data-mat]");
  if (!t || t.closest(".mon-card") || t.closest(".ex-mat") || t.closest("#cp-table")) return;
  goGlobe();
  if (t.dataset.site) select(t.dataset.site, true); else setFilter(t.dataset.mat, true);
}));
$("#nav-present").addEventListener("click", startPresent);
/* on phones the details sheet is fixed to the screen: hide it while the reader is down in the sections */
try { new IntersectionObserver((en) => document.body.classList.toggle("atlas-off", !en[0].isIntersecting), { threshold: 0.05 }).observe($("#plate")); } catch (e) { /* old browser: the sheet stays */ }
(function openingSweep() {
  if (!globe || reduceMotion || LITE || (location.hash || "").length > 1) return; /* phones: the globe stays still until touched */
  let seen = false;
  try { seen = sessionStorage.getItem("cma-intro") === "1"; sessionStorage.setItem("cma-intro", "1"); } catch (e) { seen = false; }
  if (seen) return;
  setTimeout(() => {
    if (window.scrollY > 60 || isExploring() || PRESENTING) return;
    /* a mine in daylight right now, so the sweep is visible */
    const cands = ["bayan-obo", "mountain-pass", "atacama", "greenbushes", "tenke", "imip", "panasqueira", "cinovec", "norilsk", "kipushi"].map((id) => SITE_BY_ID[id]).filter(Boolean);
    const site = cands.find((x) => sunElev(x.lat, x.lng, Date.now()) > 12) || cands[0];
    if (!globe.intro(site, 3200)) return;
    const cap = document.createElement("div");
    cap.className = "intro-cap"; cap.setAttribute("aria-hidden", "true");
    cap.innerHTML = `<span class="live-dot on"></span>${esc(T(`Illustration: a Sentinel-2 swath, 290 km wide, passing over ${site.name}`, `Ilustrace: pás snímání Sentinelu-2 široký 290 km nad lokalitou ${site.name}`))}`;
    $("#plate").appendChild(cap);
    setTimeout(() => cap.classList.add("on"), 1500);
    setTimeout(() => cap.classList.remove("on"), 6200);
    setTimeout(() => cap.remove(), 7200);
  }, 700);
})();

function renderSignals() {
  renderSignalsV11();
  const el = document.getElementById("sig-body");
  if (!el) return;
  if (el.firstElementChild) el.firstElementChild.insertAdjacentHTML("afterend", cxPanelHtml()); else el.insertAdjacentHTML("beforeend", cxPanelHtml());
  el.insertAdjacentHTML("beforeend", v13SignalsHtml());
}
function renderChokepoints() {
  renderChokepointsV11();
  const g = document.getElementById("gap");
  if (g) g.innerHTML = gapHtml();
}

/* ================= start ================= */
["#signals", "#rules"].forEach((sel) => document.querySelector(sel).addEventListener("click", (e) => {
  const t = e.target.closest("[data-site],[data-choke],[data-mat]");
  if (!t) return;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  if (t.dataset.site) select(t.dataset.site, true); else if (t.dataset.choke) selectChoke(t.dataset.choke); else setFilter(t.dataset.mat, true);
}));
renderSignals();
renderRules();
paintChips();
renderChokepoints();
renderScenario();
renderWire();
renderBrief();
if (globe) globe.applyVisibility();
loadOrbits();
updateLiveCount();
document.querySelectorAll("[data-lang]").forEach((b) => {
  b.setAttribute("aria-pressed", String(b.dataset.lang === LANG));
  b.addEventListener("click", () => setLang(b.dataset.lang));
});
$("#nav-ask").addEventListener("click", () => { enterExplore(); openAsk(); });
$("#live-btn").addEventListener("click", () => { if (selLive) { clearSelection(); setFilter("all", false); } else selectLive(); });
const hash = (location.hash || "").slice(1);
if (hash && SITE_BY_ID[hash]) select(hash, true);
else if (hash && MATERIALS[hash]) setFilter(hash, true);
else if (hash && SYSTEMS[hash]) setFilter("sys:" + hash, true);
else if (hash && ROUTE_BY_ID[hash]) selectRoute(hash);
else if (hash.startsWith("pair:") && hash.slice(5).split("+").every((m) => MATERIALS[m])) setFilter(hash, true);
else if (hash === "present") setTimeout(startPresent, 700);
else if (hash === "tour") startTour();
else if (hash === "live") selectLive();
else if (hash && LIVE_SATS.some((c) => c.id === hash)) selectSat(hash);
else if (hash && CHOKE_BY_ID[hash]) selectChoke(hash);
else if (hash === "ask" && !window.ATLAS_PUBLIC) setTimeout(openAsk, 1200);
onScroll();
renderMonday();
renderExposure();
renderCompare();
connectWire();

/* v15: a read-only bridge for atlas-v2.js (assessment register, teams section). Nothing here changes the atlas. */
window.OO = {
  T, esc, safeUrl, fmtDay, daysUntil, todayIso, toast, cssVar, reduceMotion,
  get LANG() { return LANG; }, get NEWS() { return NEWS; }, get DEADLINES() { return DEADLINES; }, get layers() { return layers; }, setLayer: (k, on) => setLayer(k, on), renderSecList: () => renderSecList(), get SND() { return typeof SND !== "undefined" ? SND : null; },
  SITES, SITE_BY_ID, MATERIALS, STAGES, SYSTEMS, SYS_ICON, ORDER, PIN, SCENARIOS, EU_SP, EOL_RIR, ONLINE, PART_KEYS, STRATEGIC, LIVE,
  worstOf, ragFor, deadlinesFor, newsFor, importShare, mName, stageTxt, stageWhat, ctry, pctTxt, trStr, chainOf, fromCc, inCtry, csPlural, inDays, zeZ,
  showSite(id) { goGlobe(); select(id, true); },
  showMaterial(m) { goGlobe(); setFilter(m, true); },
  showParts(parts, name) {
    if (!parts || !parts.length) return;
    SYSTEMS.custom = { name: name || T("Your register", "Váš registr"), blurb: "", choke: parts[0].m, chokeText: "", chokeShort: "", parts };
    goGlobe(); setFilter("sys:custom", false);
    if (globe) { globe.setFlows(flowsFor(parts)); globe.flyTo(38, 62, 3.6, 1600); }
  },
  async save(filename, data) {
    let dl = null;
    try { dl = window.claude && typeof window.claude.use === "function" ? await window.claude.use("downloads") : null; } catch (e) { dl = null; }
    const blob = data instanceof Blob ? data : new Blob([data], { type: "text/plain;charset=utf-8" });
    if (dl) { await dl.save({ filename, data: blob }); return; }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }
};
try { window.dispatchEvent(new Event("oo-ready")); } catch (e) { /* old browsers */ }

})();
