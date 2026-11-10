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
      { name: 'Blokové vývojové prostředí pro mikrokontrolér', hours: 3, note: 'Příprava prostředí, nahrávání firmware, nekonečná smyčka loop' },
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
      { name: 'Cykly for a while, proměnná cyklu a opakované činnosti', hours: 8, note: 'Rozsah range(), cyklus while s podmínkou, proměnná i, krokování a opakování' },
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
    topic: 'Datové kolekce v jazyce Python',
    topicHours: 16,
    subtopics: [
      { name: 'Pojem kolekce, základy seznamů (list), indexace a délka len', hours: 3, note: 'Ukládání více hodnot, indexy od 0, přístup k prvkům, procházení cyklem for' },
      { name: 'Operace se seznamy a manipulace s prvky (append, insert, pop, remove, sort)', hours: 3, note: 'Přidávání na konec/index, mazání prvků, řazení na místě a reverse' },
      { name: 'Vyhledávání, filtrace a agregace v seznamech (in, min, max, sum)', hours: 3, note: 'Test přítomnosti prvku, výběr prvků splňujících podmínku, součty a průměry' },
      { name: 'Slovníky (dict), neměnné n-tice (tuple) a množiny (set)', hours: 4, note: 'Dvojice klíč : hodnota, asociativní pole, neměnnost tuple a deduplikace set' },
      { name: 'Textové řetězce (str) jako kolekce znaků a příprava na práci se soubory', hours: 3, note: 'Indexace znaků, délka len(), oříznutí strip(), dělení split() a hledání v textu' }
    ]
  },
  {
    month: 'Listopad – Leden',
    topic: 'Práce se soubory (JSON) a ošetření chyb v programu',
    topicHours: 14,
    subtopics: [
      { name: 'Čtení a zápis textových souborů (with open, UTF-8)', hours: 4, note: 'Režimy čtení r, zápisu w a připojení a, kódování UTF-8, procházení po řádcích' },
      { name: 'Ukládání strukturovaných dat ve formátu JSON (dump, load)', hours: 6, note: 'Mapování slovníků a seznamů na JSON soubory, ukládání stavu aplikace a herních dat' },
      { name: 'Běhové chyby a ošetření výjimek (try - except)', hours: 4, note: 'FileNotFoundError, ValueError, bezpečné ošetření vstupů od uživatele a prevence pádu' }
    ]
  },
  {
    month: 'Únor – Březen',
    topic: 'Základy objektově orientovaného programování v jazyce Python',
    topicHours: 16,
    subtopics: [
      { name: 'Od procedur k objektům: třída jako šablona, instance jako konkrétní objekt', hours: 4, note: 'Pojem třída a instance, konstruktor __init__, parametr self a atributy' },
      { name: 'Metody instance a chování objektu', hours: 4, note: 'Volání metod nad instancí, změna vnitřního stavu, textová reprezentace __str__' },
      { name: 'Seznam instancí a hromadná práce s objekty', hours: 4, note: 'Ukládání objektů do seznamu, procházení cyklem for, vyhledávání a filtrace objektů' },
      { name: 'Objektové modelování jednoduché aplikace', hours: 4, note: 'Samostatná konzolová miniaplikace (Evidence / Správce úkolů) jako můstek ke GUI' }
    ]
  },
  {
    month: 'Duben – Červen',
    topic: 'Vývoj aplikací s grafickým uživatelským rozhraním (GUI)',
    topicHours: 20,
    subtopics: [
      { name: 'Okenní architektura, řízení událostmi (Event Loop) a smyčka událostí', hours: 4, note: 'Hlavní okno aplikace Tk(), geometrie okna, smyčka mainloop(), reakce na akce uživatele' },
      { name: 'Základní komponenty a souřadnicové pozicování', hours: 4, note: 'Nápis Label, tlačítko Button, pozicování place(x, y), obslužné funkce a metoda config()' },
      { name: 'Zpracování uživatelského vstupu a formulářové výpočty', hours: 4, note: 'Textové pole Entry, čtení hodnot metodou get(), přetypování vstupů a zobrazení výsledku' },
      { name: 'Výběrové komponenty a řídicí proměnné rozhraní', hours: 4, note: 'Přepínače Radiobutton, zaškrtávací pole Checkbutton, proměnné StringVar a BooleanVar' },
      { name: 'Samostatný projekt desktopové aplikace s grafickým uživatelským rozhraním', hours: 4, note: 'Návrh okenního rozhraní, propojení logiky komponent, prezentace a reflexe' }
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
    topic: 'Tvorba prostorové scény, prostředí a materiály ve 3D enginu',
    topicHours: 20,
    subtopics: [
      { name: 'Seznámení s editorem 3D enginu (např. Unity), struktura projektu a scéna', hours: 4, note: 'Pohled Scene, Game, Hierarchy, Project a Inspector' },
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
      { name: 'Architektura klient–server, síťové protokoly a komunikace přes HTTP', hours: 3, note: 'Role klienta a serveru, model Request-Response, IP a porty' },
      { name: 'Metody GET a POST, stavové kódy HTTP a struktura síťového požadavku/odpovědi', hours: 3, note: 'Kódy 200 OK, 404 Not Found, 500 Error, hlavičky požadavku' },
      { name: 'Návrat k Pythonu, instalace externích knihoven (pip) a modularita kódu', hours: 4, note: 'Zopakování základů Pythonu po 3D scéně, správa balíčků pip, dělení do více modulů (import)' },
      { name: 'Sémantický web zaměřený na data: formuláře, vstupní pole a tabulky', hours: 3, note: 'Struktura značek <form>, <input>, odesílání dat na server' },
      { name: 'Tvorba aplikačního backendu v jazyce Python, směrování a endpointy', hours: 4, note: 'Tvorba serveru (Flask), směrování dekorátory @app.route, obsluha koncových bodů' },
      { name: 'Zpracování dat odeslaných z formuláře na backendu a generování odpovědi', hours: 4, note: 'Čtení dat z těla požadavku, kontrola vstupů a generování odpovědi' },
      { name: 'Napojení desktopové aplikace z 2. ročníku na síťovou komunikaci se serverem', hours: 3, note: 'Odeslání požadavku z desktopového rozhraní a přijetí odpovědi' }
    ]
  },
  {
    month: 'Duben – Červen',
    topic: 'Databáze a aplikační rozhraní serveru (API)',
    topicHours: 30,
    subtopics: [
      { name: 'Relační databáze a základní operace s daty', hours: 5, note: 'Struktura tabulek, primární klíče, čtení, vkládání a úprava záznamů' },
      { name: 'Propojení aplikace s databází a provádění dotazů', hours: 5, note: 'Navázání databázového spojení, provádění příkazů z programovacího jazyka' },
      { name: 'Bezpečná práce s databází a ochrana před zneužitím vstupů', hours: 5, note: 'Parametrizované dotazy, oddělení příkazů od uživatelských dat' },
      { name: 'Zpracování a transformace databázových dat v programu', hours: 5, note: 'Převod databázových záznamů do struktur aplikace (seznamy, asociativní pole)' },
      { name: 'Tvorba aplikačního rozhraní (API) pro výměnu dat', hours: 5, note: 'Strukturovaná výměna dat (formát JSON), koncové body serveru' },
      { name: 'Integrace klientských aplikací (web a desktop) přes API', hours: 5, note: 'Konzumace aplikačního rozhraní více klientskými platformami' }
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
      { name: 'Dokončení webového klienta: interaktivní formulářové rozhraní pro vkládání dat', hours: 3, note: 'Dynamická webová stránka konzumující API ze 3. ročníku' },
      { name: 'Koexistence klientů: webové rozhraní a desktopová aplikace nad společným backendem', hours: 3, note: 'Jeden centrální server obsluhující různé klientské platformy' },
      { name: 'Uživatelská autentizace: registrace, přihlášení a správa relací', hours: 3, note: 'Rozpoznání přihlášeného uživatele a stavové sezení' },
      { name: 'Bezpečná správa hesel: bezpečné jednocestné hashování a ochrana před útoky', hours: 3, note: 'Hashování se solí (werkzeug / pbkdf2), princip nečitelnosti hesla v DB' },
      { name: 'Ochrana a kontrola uživatelských vstupů', hours: 2, note: 'Kontrola a ošetření dat na straně klienta i serveru' }
    ]
  },
  {
    month: 'Listopad – Leden',
    topic: 'Týmová spolupráce a verzování softwaru',
    topicHours: 12,
    subtopics: [
      { name: 'Organizace práce v týmu a verzovací systém', hours: 3, note: 'Rozdělení projektu na úkoly, založení týmového repozitáře' },
      { name: 'Sdílení a synchronizace kódu v týmu', hours: 3, note: 'Práce na oddělených částech kódu, nahrávání a stahování změn' },
      { name: 'Slučování týmové práce a řešení kolizí', hours: 3, note: 'Začlenění změn od spolužáků, odhalení a oprava konfliktů v kódu' },
      { name: 'Týmový miniprojekt: společný vývoj aplikace', hours: 3, note: 'Praktická tvorba aplikace ve dvojicích či trojicích, předvedení výsledku' }
    ]
  },
  {
    month: 'Únor – Duben',
    topic: 'Závěrečný komplexní softwarový projekt a jeho prezentace',
    topicHours: 24,
    subtopics: [
      { name: 'Zadání a architektura komplexního projektu: výběr domény a návrh API', hours: 4, note: 'Specifikace požadavků, diagram databáze, časový harmonogram' },
      { name: 'Realizace klientské i serverové vrstvy projektu s verzováním v Gitu', hours: 8, note: 'Pravidelné commity, kontrolní milníky a průběžné konzultace' },
      { name: 'Testování aplikace, ladění, zabezpečení a ošetření chybových stavů', hours: 4, note: 'Ověření všech uživatelských scénářů, ošetření výjimek a ladění' },
      { name: 'Zpracování technické a uživatelské dokumentace projektu', hours: 4, note: 'Struktura technické zprávy, návod k instalaci a spuštění' },
      { name: 'Příprava odborné prezentace a veřejná obhajoba projektu', hours: 4, note: 'Prezentace výsledků, demonstrace funkčnosti a obhajoba řešení' }
    ]
  }
];
