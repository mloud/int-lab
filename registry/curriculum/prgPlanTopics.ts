import { PlanTopic } from '@/components/curriculum/SimplePlanTable';

// =========================================================================
// TEMATICKÝ PLÁN: PROGRAMOVÁNÍ A HRY 1 (1. ROČNÍK SŠ)
// Celkem: 99 hodin (33 týdnů × 3 hodiny týdně)
// =========================================================================
export const PLAN_PRG1: PlanTopic[] = [
  {
    month: 'Září – Listopad',
    topic: 'Vizuální blokové programování a herní mechaniky (Scratch)',
    topicHours: 36,
    subtopics: [
      { name: 'Algoritmus, sekvence příkazů a události postavy', hours: 6, note: 'Lekce 1: Přímý pohyb, otočky, souřadnicová síť X/Y' },
      { name: 'Proměnné, datové typy a základní operátory', hours: 6, note: 'Lekce 2: Počítadlo skóre, proměnná jako krabička v paměti' },
      { name: 'Cykly a geometrické obrazce', hours: 6, note: 'Lekce 3: Kreslení perem, proměnná cyklu, úhly a polygonové tvary' },
      { name: 'Vlastní bloky, procedury a dekompozice', hours: 6, note: 'Lekce 4: Procedurální abstrakce a znovupoužitelnost bloků' },
      { name: 'Podmíněné příkazy, větvení a logické operátory', hours: 6, note: 'Lekce 5: Detekce kolizí s hranicí a překážkou, if/else' },
      { name: 'Seznamy, událostní zprávy (broadcast) a klonování', hours: 6, note: 'Lekce 6: Inventář, žebříček skóre, vystřelování klonů projektilů' }
    ]
  },
  {
    month: 'Prosinec',
    topic: 'Teorie algoritmizace a vývojové diagramy',
    topicHours: 9,
    subtopics: [
      { name: 'Pojem algoritmus, jeho vlastnosti a specifikace vstupu a výstupu', hours: 3, note: 'Konečnost, jednoznačnost/determinovanost, hromadnost, rezultativnost' },
      { name: 'Normalizované značky vývojových diagramů a lineární sekvence', hours: 3, note: 'Mezní značky start/stop, vstup/výstup, zpracování/proces, spojky' },
      { name: 'Řídicí algoritmické konstrukce v diagramech (větvení a cykly)', hours: 3, note: 'Rozhodovací blok, větvení jednoduché/vícenásobné, cykly s podmínkou, počítadla' }
    ]
  },
  {
    month: 'Leden',
    topic: 'Algoritmizace vestavných systémů a hardware',
    topicHours: 12,
    subtopics: [
      { name: 'Architektura mikrokontroléru a blokové vývojové prostředí', hours: 3, note: 'Srovnání PC a MCU, nahrávání firmware, nekonečná smyčka loop' },
      { name: 'Práce se vstupy, tlačítka a čidla fyzického světa', hours: 3, note: 'Čtení digitálních tlačítek, akcelerometr, teploměr, fotorezistor' },
      { name: 'Řízení výstupů, zobrazovací matice a zvuková signalizace', hours: 3, note: 'Zobrazení grafiky na LED matici 5x5, tóny a piezo bzučák' },
      { name: 'Bezdrátová komunikace a rádiový přenos proměnných', hours: 3, note: 'Odesílání a příjem paketů na frekvenci 2.4 GHz mezi jednotkami' }
    ]
  },
  {
    month: 'Únor – Červen',
    topic: 'Přechod k textovému programování a grafické rozhraní v jazyce Python',
    topicHours: 42,
    subtopics: [
      { name: 'Příkazový řádek Pythonu, syntaxe a základní vstup/výstup', hours: 4, note: 'Interpret, funkce print(), formátování textu, vstup input()' },
      { name: 'Datové typy, proměnné a matematické výrazy v paměti', hours: 4, note: 'Čísla int/float, řetězce str, přetypování a priority operací' },
      { name: 'Grafické plátno (Canvas) a souřadnicový systém počítače', hours: 6, note: 'Knihovna grafiky, okno aplikace, souřadnice [0, 0] vlevo nahoře' },
      { name: 'Barvy, výplně, kreslení geometrických tvarů a vlajek', hours: 4, note: 'Čáry, obdélníky, polygony, hexadecimální barvy a překrývání vrstev' },
      { name: 'Cyklus for, proměnná cyklu a generování mřížek a ornamentů', hours: 8, note: 'Rozsah range(), proměnná i, krokování posunu, matice dlaždic' },
      { name: 'Podmíněný příkaz if/else, náhodná čísla a větvení v cyklu', hours: 8, note: 'Generátor random, podmínky v cyklu, střídání barev a tvarů' },
      { name: 'Uživatelské funkce s parametry a návratovou hodnotou', hours: 4, note: 'Definice def, předávání argumentů, kreslení složitých razítek' },
      { name: 'Interaktivita: obsluha událostí myši, kliknutí a závěrečná minihra', hours: 4, note: 'Události motion a click, zachycení polohy kurzoru, obhajoba' }
    ]
  }
];

// =========================================================================
// TEMATICKÝ PLÁN: PROGRAMOVÁNÍ A HRY 2 (2. ROČNÍK SŠ)
// Celkem: 66 hodin (33 týdnů × 2 hodiny týdně)
// =========================================================================
export const PLAN_PRG2: PlanTopic[] = [
  {
    month: 'Září – Listopad',
    topic: 'Pokročilé datové struktury a kolekce v jazyce Python',
    topicHours: 16,
    subtopics: [
      { name: 'Seznamy a jejich metody (append, pop, insert, sort, reverse)', hours: 4, note: 'Dynamická pole, vkládání a odebírání prvků, řazení na místě' },
      { name: 'Indexace a krájení sekvencí (slicing [start:stop:step], záporné indexy)', hours: 4, note: 'Reverzace pole, podsekvence, vyhledávání prvků operátorem in' },
      { name: 'Generátory seznamů (list comprehension) a filtrace dat', hours: 2, note: 'Deklarativní transformace kolekcí, podmíněná filtrace prvků' },
      { name: 'Neměnné n-tice (tuple) a množiny (set – operace, deduplikace)', hours: 2, note: 'Immutabilita, množinové sjednocení, průnik, rozdíl a unikátní hodnoty' },
      { name: 'Slovníky (dict): klíče a hodnoty, operace, iterace a vnořené struktury', hours: 4, note: 'Asociativní pole, metody keys(), values(), items(), JSON struktura' }
    ]
  },
  {
    month: 'Listopad – Leden',
    topic: 'Práce se soubory, perzistence dat (JSON) a ošetření výjimek',
    topicHours: 14,
    subtopics: [
      { name: 'Čtení a zápis textových souborů, kontextový manažer with open(...)', hours: 4, note: 'Režimy čtení r, zápisu w a připojení a, kódování UTF-8' },
      { name: 'Zpracování strukturovaných dat ve formátu CSV', hours: 4, note: 'Knihovna csv, oddělovače polí, čtení do slovníků DictReader' },
      { name: 'Výměnný datový formát JSON (dump, load, dumps, loads)', hours: 3, note: 'Serializace a deserializace hierarchických dat a konfigurací' },
      { name: 'Běhové chyby a ošetření výjimek (try - except - finally)', hours: 3, note: 'FileNotFoundError, ValueError, bezpečné ošetření vstupů od uživatele' }
    ]
  },
  {
    month: 'Únor – Březen',
    topic: 'Základy objektově orientovaného programování v jazyce Python',
    topicHours: 16,
    subtopics: [
      { name: 'Paradigma OOP: abstrakce, modelování reálných entit, třída vs. instance', hours: 4, note: 'Přechod od procedur k objektům s vlastním stavem a chováním' },
      { name: 'Konstruktor __init__, význam parametru self, stav objektu a atributy', hours: 4, note: 'Inicializace nového objektu, vnitřní proměnné instance' },
      { name: 'Metody instance, chování objektu a zapouzdření vnitřních dat', hours: 4, note: 'Volání metod nad instancí, ochrana integrity stavu objektu' },
      { name: 'Skládání objektů (kompozice), vztahy mezi objekty a základy dědičnosti', hours: 4, note: 'Vztah má (has-a) vs. je (is-a), předávání zpráv mezi objekty' }
    ]
  },
  {
    month: 'Duben – Červen',
    topic: 'Vývoj aplikací s grafickým uživatelským rozhraním (GUI)',
    topicHours: 20,
    subtopics: [
      { name: 'Okenní architektura, řízení událostmi (Event-driven) a smyčka událostí', hours: 4, note: 'Hlavní okno aplikace, smyčka mainloop(), reakce na akce uživatele' },
      { name: 'Rozmístění prvků (Layout management: mřížka grid a balíčkování pack)', hours: 4, note: 'Řádky, sloupce, roztažení sticky, vnitřní a vnější okraje padding' },
      { name: 'Základní grafické komponenty: textová pole, tlačítka, přepínače, seznamy', hours: 4, note: 'Widgety Entry, Button, Checkbutton, Listbox, svázání proměnných' },
      { name: 'Zapouzdření grafického rozhraní do objektové třídy a propojení logiky', hours: 4, note: 'Architektura oddělení datového modelu od vizuálního zobrazení' },
      { name: 'Ucelený ročníkový projekt desktopové aplikace s ukládáním a obhajobou', hours: 4, note: 'Správce agendy/úkolů s perzistencí do JSON, prezentace a reflexe' }
    ]
  }
];

// =========================================================================
// TEMATICKÝ PLÁN: PROGRAMOVÁNÍ A HRY 3 (3. ROČNÍK SŠ)
// Celkem: 99 hodin (33 týdnů × 3 hodiny týdně)
// =========================================================================
export const PLAN_PRG3: PlanTopic[] = [
  {
    month: 'Září – Říjen',
    topic: 'Tvorba prostorové scény, prostředí a materiály v enginu Unity',
    topicHours: 20,
    subtopics: [
      { name: 'Seznámení s editorem Unity, struktura projektu, správa aktiv a scéna', hours: 4, note: 'Pohled Scene, Game, Hierarchy, Project a Inspector' },
      { name: 'Prostorový souřadnicový systém X/Y/Z, hierarchie objektů Parent-Child', hours: 4, note: 'Globální vs. lokální prostor, vnořování komponent a objektů' },
      { name: 'Transformace herních objektů (pozice, rotace, měřítko) a kamera', hours: 4, note: 'Komponenta Transform, zorné pole kamery Field of View' },
      { name: 'Návrh a stavba prostorového levelu: geometrie, zdi, podlahy, překážky', hours: 4, note: 'Primitivní tělesa, modularita prostoru, level design' },
      { name: 'Povrchové materiály, barvy, textury, osvětlení scény a vrhání stínů', hours: 4, note: 'Materiály PBR, směrové světlo Directional Light, bodová světla' }
    ]
  },
  {
    month: 'Listopad – Leden',
    topic: 'Fyzikální model, prostorový zvuk, jednoduché skripty a export',
    topicHours: 25,
    subtopics: [
      { name: 'Fyzikální simulace: komponenta Rigidbody, gravitace, hmotnost a tření', hours: 5, note: 'Výpočet dynamiky těles fyzikálním enginem, kinetická energie' },
      { name: 'Kolizní tvary (Colliders) a detekční zóny (Triggers) pro spouštění akcí', hours: 5, note: 'Box/Sphere Collider, události OnCollisionEnter a OnTriggerEnter' },
      { name: 'Jednoduché skripty interakce ze šablony: sebrání předmětu, rozsvícení, dveře', hours: 6, note: 'Předpřipravené skripty, změna stavu objektu při interakci hráče' },
      { name: '3D prostorový zvuk: AudioSource, AudioListener a směrový útlum zvuku', hours: 3, note: 'Nastavení prostorového zvuku (Spatial Blend 3D, dosah a útlum)' },
      { name: 'Jednoduché animace a stavové přechody spouštěné interakcí hráče', hours: 3, note: 'Pohyb plošiny, rotace sbíratelného předmětu, vizuální odezva' },
      { name: 'Sestavení spustitelné aplikace (Build) a volitelný test na cílovém zařízení', hours: 3, note: 'Build Settings, samostatná binárka pro PC / volitelně VR brýle' }
    ]
  },
  {
    month: 'Únor – Březen',
    topic: 'Základy síťové komunikace, architektura klient–server a Python backend',
    topicHours: 24,
    subtopics: [
      { name: 'Architektura klient–server, síťové protokoly a komunikace přes HTTP', hours: 4, note: 'Role klienta a serveru, model Request-Response, IP a porty' },
      { name: 'Metody GET a POST, stavové kódy HTTP a struktura síťového požadavku/odpovědi', hours: 4, note: 'Kódy 200 OK, 404 Not Found, 500 Error, hlavičky požadavku' },
      { name: 'Sémantický web zaměřený na data: formuláře, vstupní pole a tabulky', hours: 4, note: 'Struktura značek <form>, <input>, odesílání dat na server' },
      { name: 'Napojení desktopové aplikace z 2. ročníku na síťovou komunikaci se serverem', hours: 4, note: 'Odeslání požadavku z desktopového rozhraní a přijetí odpovědi' },
      { name: 'Tvorba aplikačního backendu v jazyce Python (webový mikrorámec) a endpointy', hours: 4, note: 'Instalace mikrorámce, směrování dekorátory @app.route, endpointy' },
      { name: 'Zpracování dat odeslaných z formuláře na backendu a generování odpovědi', hours: 4, note: 'Čtení dat z těla požadavku, validační logika a renderování výsledku' }
    ]
  },
  {
    month: 'Duben – Červen',
    topic: 'Opakování jazyka SQL, integrace databáze s Pythonem a REST API',
    topicHours: 30,
    subtopics: [
      { name: 'Rekapitulace jazyka SQL: dotazy SELECT s podmínkami, řazením a agregací', hours: 5, note: 'Zopakování syntaktických konstrukcí SQL z předmětu Databáze' },
      { name: 'Datové manipulace SQL: příkazy INSERT, UPDATE, DELETE a integrita dat', hours: 5, note: 'Vkládání záznamů, modifikace, mazání dat a primární klíče' },
      { name: 'Připojení Pythonu k databázi SQLite, databázový kurzor a vykonávání dotazů', hours: 5, note: 'Knihovna sqlite3, otevření spojení, cursor.execute(), commit()' },
      { name: 'Bezpečné parametrizované dotazy a prevence zranitelností SQL injection', hours: 5, note: 'Zástupné symboly ?, oddělení SQL příkazů od uživatelských dat' },
      { name: 'Mapování databázových řádků na datové struktury Pythonu (slovníky a seznamy)', hours: 5, note: 'fetchall(), transformace n-tic na asociativní kolekce' },
      { name: 'Návrh a implementace REST API: serializace do JSON pro desktop i web', hours: 5, note: 'Endpointy API vracící JSON data pro různé typy klientských aplikací' }
    ]
  }
];

// =========================================================================
// TEMATICKÝ PLÁN: PROGRAMOVÁNÍ A HRY 4 (4. ROČNÍK SŠ)
// Celkem: 50 hodin (25 týdnů × 2 hodiny týdně)
// =========================================================================
export const PLAN_PRG4: PlanTopic[] = [
  {
    month: 'Září – Listopad',
    topic: 'Bezpečnost aplikačních systémů, autentizace a webové klientské rozhraní',
    topicHours: 14,
    subtopics: [
      { name: 'Dokončení webového klienta: interaktivní formulářové rozhraní pro vkládání dat', hours: 3, note: 'Dynamická webová stránka konzumující REST API z 3. ročníku' },
      { name: 'Koexistence klientů: webové rozhraní a desktopová aplikace nad společným backendem', hours: 3, note: 'Jeden centrální server obsluhující různé klientské platformy' },
      { name: 'Uživatelská autentizace: registrace, přihlášení a správa relací (sessions)', hours: 3, note: 'Rozpoznání přihlášeného uživatele, stavové sezení a tokeny' },
      { name: 'Bezpečná správa hesel: jednocestné hashování se solí a ochrana před útoky', hours: 3, note: 'Algoritmy bcrypt/pbkdf2, princip nesledovatelnosti hesla v DB' },
      { name: 'Ochrana vstupů a sanitizace: obrana proti zranitelnostem typu XSS a injektování', hours: 2, note: 'Validace na straně klienta i serveru, escapování výstupu' }
    ]
  },
  {
    month: 'Listopad – Leden',
    topic: 'Softwarové inženýrství, týmová spolupráce a verzovací systémy',
    topicHours: 12,
    subtopics: [
      { name: 'Principy čistého kódu (Clean Code), čitelnost, refaktoring a architektura', hours: 3, note: 'Pojmenování entit, redukce duplicit DRY, dekompozice modulů' },
      { name: 'Automatizované testování software: jednotkové testy (Unit Testing) a ladění', hours: 3, note: 'Testovací rámec unittest/pytest, assert testy, hraniční stavy' },
      { name: 'Týmová práce s verzovacím systémem Git: větvení, slučování a konflikty', hours: 3, note: 'Příkazy branch, checkout, merge, řešení textových konfliktů' },
      { name: 'Vzdálené repozitáře, revize kódu (Code Review) a agilní řízení úkolů', hours: 3, note: 'Pull requesty, komentování změn v týmu, nástěnka Kanban' }
    ]
  },
  {
    month: 'Únor – Duben',
    topic: 'Závěrečný komplexní maturitní projekt a veřejná obhajoba',
    topicHours: 24,
    subtopics: [
      { name: 'Zadání a architektura maturitního projektu: výběr domény a návrh API', hours: 4, note: 'Specifikace požadavků, diagram databáze, časový harmonogram' },
      { name: 'Realizace klientské i serverové vrstvy projektu s verzováním v Gitu', hours: 8, note: 'Pravidelné commity, kontrolní milníky a průběžné konzultace' },
      { name: 'Testování, ladění zátěže, zabezpečení a ošetření chybových stavů', hours: 4, note: 'Ověření všech uživatelských scénářů, ošetření výjimek a zátěž' },
      { name: 'Zpracování technické a uživatelské dokumentace projektu', hours: 4, note: 'Struktura technické zprávy, návod k instalaci a spuštění' },
      { name: 'Příprava odborné prezentace a simulovaná veřejná obhajoba před komisí', hours: 4, note: 'Obhajoba architektonických rozhodnutí a demonstrace funkčnosti' }
    ]
  }
];
