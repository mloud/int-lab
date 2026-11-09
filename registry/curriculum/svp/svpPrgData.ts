import { SvpGradeData, SvpSharedInfo } from './svpTypes';

// =========================================================================
// ŠKOLNÍ VZDĚLÁVACÍ PROGRAM (ŠVP) PRO INSPIS – PROGRAMOVÁNÍ A VÝVOJ APLIKACÍ (1.–4. ROČNÍK)
// Obor: 18-20-M/01 Informační technologie
// Celková dotace: 314 hodin (PRG 1: 99 h · PRG 2: 66 h · PRG 3: 99 h · PRG 4: 50 h)
// =========================================================================

export const SVP_PRG_SHARED_INFO: SvpSharedInfo = {
  subjectName: 'Programování a vývoj aplikací',
  fieldCode: '18-20-M/01',
  fieldName: 'Informační technologie',
  evaluation:
    'Kritéria hodnocení vychází z pravidel pro hodnocení výsledků vzdělávání žáků střední odborné školy. ' +
    'Hodnocení je numerické i slovní a probíhá průběžně i po skončení ucelených tematických bloků. ' +
    'Hodnotí se zejména praktické programátorské dovednosti – je systematicky ověřována schopnost analyzovat zadaný problém, ' +
    'navrhnout funkční a efektivní algoritmus, zapsat čitelný kód s dodržením jmenných konvencí, ošetřit mezní stavy a vyhledat ' +
    'a odstranit syntaktické i logické chyby. Úroveň znalostí je zjišťována praktickými úlohami u počítače v integrovaném vývojovém ' +
    'prostředí (IDE), kontrolními programátorskými cvičeními, tvorbou a prezentací dílčích softwarových aplikací, týmovými projekty, ' +
    'prací s technickou dokumentací a verzovacím systémem, teoretickými testy ověřujícími pochopení algoritmických konceptů a závěrečnou ' +
    'ústní obhajobou maturitní práce. Důraz je kladen na čistotu návrhu (Clean Code), modularitu, dekompozici a schopnost obhájit technické řešení.',
  keyCompetencies: [
    {
      title: 'Kompetence k učení',
      description:
        'Žák sleduje a hodnotí vlastní pokrok v osvojování programovacích jazyků a vývojových nástrojů. ' +
        'Učí se pracovat s oficiální technickou dokumentací a manuály, kriticky využívat online informační zdroje a technologie ' +
        'asistovaného vývoje a přistupovat k chybě v programu jako k přirozené součásti procesu ladění a poznávání.'
    },
    {
      title: 'Kompetence k řešení problémů',
      description:
        'Žák analyzuje zadání úlohy, dekomponuje komplexní problém na menší podúlohy, volí odpovídající datové struktury a algoritmy. ' +
        'Učí se systematickému postupu při ladění (debugging), testuje hraniční hodnoty a ověřuje spolehlivost a robustnost softwarového řešení.'
    },
    {
      title: 'Komunikativní kompetence',
      description:
        'Žák formuluje své myšlenky věcně a přesně s využitím odborné IT terminologie v českém i anglickém jazyce. ' +
        'Vede přehlednou technickou dokumentaci (README, komentáře kódu), prezentuje výsledky své práce před třídou a věcně diskutuje ' +
        'v týmu při revizích zdrojového kódu (Code Review).'
    },
    {
      title: 'Digitální kompetence',
      description:
        'Žák efektivně ovládá vývojová prostředí (IDE), verzovací systémy, databázové nástroje a simulační enginy. ' +
        'Důsledně uplatňuje zásady kybernetické bezpečnosti, ochrany dat, bezpečného nakládání s přístupovými údaji a respektuje ' +
        'autorská práva a softwarové licence.'
    },
    {
      title: 'Pracovní a personální kompetence',
      description:
        'Žák dodržuje technologickou kázeň, termíny a zásady týmové spolupráce. Je schopen přijmout roli v projektovém týmu, ' +
        'nést odpovědnost za svěřený modul a přizpůsobovat se agilnímu způsobu plánování a řízení práce (Kanban, Scrum).'
    }
  ],
  crossCuttingThemes: [
    {
      code: 'PT - ČDS',
      name: 'Člověk a digitální svět',
      description:
        'Porozumění principům fungování software, odpovědnost tvůrce digitálního obsahu za spolehlivost a bezpečnost aplikací, ' +
        'ochrana osobních údajů (GDPR v kódu), etika vývoje software a prevence rizik digitálního prostoru.'
    },
    {
      code: 'PT - ČSP',
      name: 'Člověk a svět práce',
      description:
        'Osvojení profesních návyků programátora a softwarového inženýra, práce s moderními nástroji projektového řízení a verzování, ' +
        'týmová kooperace a příprava na uplatnění v technologických firmách i samostatné podnikání v IT.'
    },
    {
      code: 'PT - ODS',
      name: 'Občan v demokratické společnosti',
      description:
        'Dodržování právního rámce duševního vlastnictví, respektování autorského zákona a licenčních podmínek otevřeného (open-source) ' +
        'i proprietárního software.'
    }
  ],
  interdisciplinaryRelations:
    'Předmět přímo aplikuje poznatky z Matematiky (kartézské souřadnice, vektory, výroková logika, množiny a matice) a Databázových ' +
    'systémů (relační model, dotazovací jazyk SQL, který integruje do aplikačního kódu). Vytváří technologické zázemí pro předměty ' +
    'Počítačové sítě a Operační systémy (skriptování, síťová komunikace přes sokety a protokoly HTTP) a tvoří přímou propedeutiku pro předmět ' +
    'Robotika (přenos logiky mikrokontrolérů a senzoriky do fyzických autonomních systémů).'
};

// -------------------------------------------------------------------------
// 1. ROČNÍK: PRG 1 – 99 HODIN (3 h týdně)
// -------------------------------------------------------------------------
export const SVP_PRG1_DATA: SvpGradeData = {
  gradeLabel: '1. Ročník',
  gradeCode: 'PRG 1',
  totalHours: 99,
  blocks: [
    {
      id: 'prg1-b1',
      topic: '1. Vizuální blokové programování a herní mechaniky',
      hours: 36,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'využívá základní funkce vývojového prostředí',
        'vytváří herní objekty a scény ve 2D prostředí',
        'používá proměnné a základní operátory',
        'použije řídicí struktury programu (podmínky, cykly)',
        'vytváří vlastní bloky a procedury s parametry',
        'používá seznamy pro ukládání a zpracování dat',
        'synchronizuje objekty pomocí událostních zpráv',
        'dynamicky vytváří herní objekty pomocí klonování'
      ],
      content: [
        'Vývojové prostředí, scéna, herní objekty, souřadnice [X, Y]',
        'Sekvence příkazů, události, řízení pohybu objektů',
        'Proměnné a operátory (počítadlo skóre, atributy stavu)',
        'Podmíněné příkazy (if/else, porovnání, logické spojky)',
        'Cykly (pevný počet kroků, podmíněné opakování, nekonečný cyklus)',
        'Vlastní bloky a podprogramy (předávání parametrů, modularita)',
        'Seznamy a práce s daty (pole hodnot, indexace, vyhledávání, deduplikace)',
        'Událostní zprávy (broadcast, reakce objektů na zprávu)',
        'Klonování objektů (životní cyklus klonu, dynamické vytváření střel a překážek)'
      ]
    },
    {
      id: 'prg1-b2',
      topic: '2. Teorie algoritmizace a vývojové diagramy',
      hours: 9,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'popíše vlastnosti algoritmu (konečnost, jednoznačnost, determinovanost)',
        'zanalyzuje jednoduchou úlohu a algoritmizuje ji',
        'používá normalizované značky vývojových diagramů',
        'čte a analyzuje existující vývojové diagramy',
        'sestaví vývojový diagram pro zadanou úlohu s větvením a cykly'
      ],
      content: [
        'Algoritmus – definice, vlastnosti algoritmu',
        'Vstup – výstup – zpracování',
        'Vývojové diagramy – normalizované značky',
        'Lineární algoritmus (sekvence kroků)',
        'Větvení ve vývojovém diagramu (podmíněný příkaz)',
        'Cykly a opakování ve vývojovém diagramu (počítadlo, podmínka)'
      ]
    },
    {
      id: 'prg1-b3',
      topic: '3. Algoritmizace vestavných systémů a hardware',
      hours: 12,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'popíše architekturu mikrokontroléru a jeho periferie',
        'rozliší digitální a analogové vstupy a výstupy (GPIO)',
        'zpracovává vstupy z tlačítek a fyzických senzorů',
        'řídí zobrazovací a zvukové výstupy mikrokontroléru',
        'aplikuje logiku stavového automatu pro řízení chování zařízení',
        'implementuje bezdrátový přenos dat mezi zařízeními'
      ],
      content: [
        'Architektura mikrokontroléru (PC vs. jednočip, GPIO piny)',
        'Vstupní periferie a čidla (tlačítka, akcelerometr, měření osvětlení a teploty)',
        'Výstupní periferie (LED matice, piezo bzučák, tóny)',
        'Zpracování událostí hardware v reálném čase, neblokující stavová logika',
        'Bezdrátový přenos dat (rádiové pakety, přenos stavových proměnných)'
      ]
    },
    {
      id: 'prg1-b4',
      topic: '4. Přechod k textovému programování a grafické rozhraní v jazyce Python',
      hours: 42,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'orientuje se ve vývojovém prostředí a syntaxi jazyka Python',
        'vytvoří program se vstupem z konzole a formátovaným výstupem',
        'používá základní datové typy a matematické operátory',
        'vytváří grafické objekty na plátně v souřadnicovém systému',
        'aplikuje cyklus for a proměnnou cyklu pro generování mřížek a ornamentů',
        'vytváří větvené programy reagující na stav a polohu objektů',
        'vytváří vlastní funkce s parametry a návratovou hodnotou',
        'obsluhuje události myši a klávesnice pro interakci s uživatelem',
        'vytvoří ucelenou interaktivní 2D aplikaci na plátně'
      ],
      content: [
        'Vývojové prostředí jazyka Python, interpret, syntaxe a odsazování bloků',
        'Vstup a výstup (print, f-strings, input, přetypování int a float)',
        'Datové typy a operátory (aritmetické, celočíselné dělení, modulo)',
        'Grafické plátno (souřadnicový systém, kreslení tvarů, barvy, výplně)',
        'Řídicí struktury (cyklus for, rozsah range, proměnná cyklu jako posun)',
        'Podmíněné větvení (if, elif, else, relační a logické operátory)',
        'Moduly a náhoda (import standardních knihoven, generování náhodných čísel)',
        'Uživatelské funkce (klíčové slovo def, parametry, návratová hodnota return)',
        'Událostmi řízená interaktivita (obsluha událostí myši a klávesnice, tvorba 2D minihry)'
      ]
    }
  ]
};

// -------------------------------------------------------------------------
// 2. ROČNÍK: PRG 2 – 66 HODIN (2 h týdně)
// -------------------------------------------------------------------------
export const SVP_PRG2_DATA: SvpGradeData = {
  gradeLabel: '2. Ročník',
  gradeCode: 'PRG 2',
  totalHours: 66,
  blocks: [
    {
      id: 'prg2-b1',
      topic: '1. Pokročilé datové struktury a kolekce v jazyce Python',
      hours: 16,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'ukládá data do kolekcí',
        'prochází a zpracovává kolekce',
        'používá pokročilé metody seznamů',
        'aplikuje techniku krájení (slicing) a generátory seznamů (list comprehension)',
        'rozliší měnitelné a neměnné datové typy (tuple)',
        'organizuje data v množinách (set) a odstraňuje duplicity',
        'používá slovníky (dict) pro asociativní ukládání dat'
      ],
      content: [
        'Dynamické seznamy (metody append, insert, pop, sort, vyhledávání)',
        'Krájení dat (slicing, reverzace pole, záporné indexy)',
        'Generátory seznamů (list comprehension, podmíněná filtrace)',
        'Neměnné n-tice (tuple, rozbalování hodnot)',
        'Množiny (set, množinové operace, deduplikace)',
        'Slovníky (dict, klíče a hodnoty, iterace, vnořené slovníky)'
      ]
    },
    {
      id: 'prg2-b2',
      topic: '2. Práce se soubory, perzistence dat (JSON) a ošetření výjimek',
      hours: 14,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'využívá možnosti ukládání dat mimo operační paměť',
        'čte a zapisuje textová data na disk pomocí kontextového manažeru',
        'zpracovává strukturovaná data ve formátu CSV',
        'serializuje a deserializuje data ve formátu JSON',
        'identifikuje syntaktické a běhové chyby v programu',
        'ošetřuje výjimky a zabraňuje pádu aplikace (try - except - finally)'
      ],
      content: [
        'Čtení a zápis textových souborů (with open, kódování UTF-8)',
        'Zpracování tabulkových dat v CSV (knihovna csv, oddělovače)',
        'Hierarchický formát JSON (json.dump, json.load, serializace stavu)',
        'Ošetření výjimek (bloky try, except, finally, standardní výjimky)'
      ]
    },
    {
      id: 'prg2-b3',
      topic: '3. Základy objektově orientovaného programování v jazyce Python',
      hours: 16,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'vysvětlí princip objektově orientovaného programování',
        'definuje pojmy třída, objekt a popíše jejich základní vlastnosti',
        'vytváří třídy a instance objektů',
        'používá konstruktor __init__ a parametr self',
        'definuje atributy a metody třídy',
        'používá zapouzdření dat',
        'navrhne jednoduchý objektový model aplikace',
        'vytváří vztahy mezi objekty (kompozice, základy dědičnosti)'
      ],
      content: [
        'Principy objektově orientovaného programování (abstrakce, zapouzdření)',
        'Definice třídy a vytváření instancí',
        'Konstruktor __init__, parametr self, instanční atributy',
        'Metody instance a chování objektu',
        'Zapouzdření vnitřního stavu (veřejné vs. neveřejné atributy)',
        'Vztahy mezi objekty (kompozice, základy dědičnosti, volání super)'
      ]
    },
    {
      id: 'prg2-b4',
      topic: '4. Vývoj aplikací s grafickým uživatelským rozhraním (GUI)',
      hours: 20,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'popíše architekturu desktopového grafického rozhraní (GUI)',
        'vytvoří hlavní okno aplikace a řídí smyčku událostí',
        'organizuje rozložení prvků pomocí layout manažerů',
        'vytváří formuláře a ovládací prvky uživatelského rozhraní',
        'propojuje grafické rozhraní s programovou logikou',
        'zapouzdří aplikaci GUI do objektové třídy',
        'realizuje samostatný projekt desktopové aplikace s ukládáním do souboru'
      ],
      content: [
        'Okenní architektura, řízení událostmi (Event Loop)',
        'Správci rozložení prvků (layout manažery: mřížka grid, balíčkování pack)',
        'Vizuální komponenty (textová pole, tlačítka, přepínače, seznamy)',
        'Vazba událostí a proměnných na grafické prvky',
        'Objektový návrh GUI aplikace (zapouzdření okna i aplikační logiky)',
        'Samostatný ročníkový projekt desktopové aplikace s perzistencí do JSON'
      ]
    }
  ]
};

// -------------------------------------------------------------------------
// 3. ROČNÍK: PRG 3 – 99 HODIN (3 h týdně)
// -------------------------------------------------------------------------
export const SVP_PRG3_DATA: SvpGradeData = {
  gradeLabel: '3. Ročník',
  gradeCode: 'PRG 3',
  totalHours: 99,
  blocks: [
    {
      id: 'prg3-b1',
      topic: '1. Tvorba prostorové scény, prostředí a materiály v enginu Unity',
      hours: 20,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'orientuje se v prostředí herního a simulačního enginu Unity',
        'vysvětlí komponentový princip enginu',
        'vytváří 3D scénu a prostorové uspořádání objektů',
        'aplikuje transformace herních objektů (pozice, rotace, měřítko)',
        'pracuje s kamerou a nastavuje osvětlení scény',
        'vytváří a aplikuje povrchové materiály a textury',
        'využívá připravenou šablonu pro pohyb hráče v prostoru'
      ],
      content: [
        'Editor Unity, struktura projektu, správa aktiv (Project, Hierarchy, Inspector)',
        'Prostorový souřadnicový systém, scéna, hierarchie objektů Parent-Child',
        'Transformace objektů (Transform: pozice, rotace, měřítko)',
        'Tvorba herního prostředí (level design), geometrie scény',
        'Povrchové materiály, barvy, textury, osvětlení a stíny',
        'Využití připravené školní šablony pro řízení postavy a pohyb v prostoru'
      ]
    },
    {
      id: 'prg3-b2',
      topic: '2. Fyzikální model, prostorový zvuk, jednoduché skripty a export na cílová zařízení',
      hours: 25,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'implementuje fyzikální vlastnosti objektů (Rigidbody, gravitace, tření)',
        'definuje kolizní tvary (Colliders) a detekční zóny (Triggers)',
        'propojí herní logiku se skripty z připravené šablony',
        'nastavuje 3D prostorový zvuk se směrovým útlumem',
        'vytváří jednoduché animace spouštěné interakcí hráče',
        'připraví finální sestavení aplikace (Build) pro cílové zařízení'
      ],
      content: [
        'Fyzikální systém (Rigidbody, gravitace, kolize, síly, tření)',
        'Kolizní tvary (Colliders) a detekční zóny (Triggers)',
        'Skriptování interakce hráče s objekty ze školní šablony',
        '3D prostorový zvuk (AudioSource, AudioListener, prostorový útlum)',
        'Animace v prostoru (Animator, stavové přechody, animace objektů)',
        'Sestavení projektu (Build Settings, export pro cílové zařízení)'
      ]
    },
    {
      id: 'prg3-b3',
      topic: '3. Základy síťové komunikace, architektura klient–server a Python backend',
      hours: 24,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'vysvětlí princip fungování a komunikaci architektury klient–server',
        'popíše síťové protokoly a model požadavku a odpovědi (HTTP)',
        'rozliší metody GET a POST a vysvětlí stavové kódy HTTP',
        'vytvoří datově orientovaný webový formulář pro odesílání dat',
        'propojí desktopovou aplikaci se síťovým serverem',
        'vytvoří aplikační backend v jazyce Python (webový mikrorámec)',
        'definuje koncové body (endpointy) a směrování požadavků',
        'zpracovává příchozí data na backendu a generuje odpověď serveru'
      ],
      content: [
        'Architektura klient–server, model Request-Response, síťová komunikace',
        'Protokol HTTP/HTTPS, metody GET a POST, hlavičky, stavové kódy',
        'Formulářové rozhraní (značky form, input, odesílání dat, tabulka záznamů)',
        'Síťové propojení klientské aplikace se serverem',
        'Tvorba backendu v Pythonu (webový mikrorámec, směrování, endpointy)',
        'Zpracování příchozích dat, validace a generování odpovědí'
      ]
    },
    {
      id: 'prg3-b4',
      topic: '4. Opakování jazyka SQL, integrace databáze s Pythonem a REST API',
      hours: 30,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'používá jazyk SQL pro dotazování a manipulaci s daty',
        'formuluje dotazy SELECT s podmínkami, řazením a agregací',
        'provádí datové manipulace pomocí příkazů INSERT, UPDATE, DELETE',
        'připojí databázi k aplikaci v jazyce Python',
        'využívá databázový kurzor pro vykonávání parametrizovaných dotazů',
        'aplikuje zásady zabezpečení proti zranitelnosti SQL injection',
        'transformuje databázové záznamy na datové struktury Pythonu',
        'navrhne a implementuje jednoduché REST API vracející data ve formátu JSON',
        'obslouží webového i desktopového klienta z jednotného serveru'
      ],
      content: [
        'Rekapitulace jazyka SQL (SELECT, WHERE, ORDER BY, GROUP BY)',
        'Datové manipulace v SQL (INSERT, UPDATE, DELETE, transakce)',
        'Integrace databáze s Pythonem (knihovna SQLite, připojení, kurzor)',
        'Bezpečné parametrizované dotazy a prevence SQL injection',
        'Mapování relačních záznamů na slovníky a seznamy v Pythonu',
        'REST API a formát JSON (endpointy, serializace dat)',
        'Vícevrstvá architektura: centrální server obsluhující desktop i web'
      ]
    }
  ]
};

// -------------------------------------------------------------------------
// 4. ROČNÍK: PRG 4 – 50 HODIN (2 h týdně, zkrácený ročník)
// -------------------------------------------------------------------------
export const SVP_PRG4_DATA: SvpGradeData = {
  gradeLabel: '4. Ročník',
  gradeCode: 'PRG 4',
  totalHours: 50,
  blocks: [
    {
      id: 'prg4-b1',
      topic: '1. Bezpečnost aplikačních systémů, autentizace a webové klientské rozhraní',
      hours: 14,
      crossThemes: ['PT - ČDS', 'PT - ODS'],
      outcomes: [
        'vytváří interaktivní webové klientské rozhraní pro vkládání a správu dat',
        'propojí webového klienta s aplikačním rozhraním (REST API)',
        'sjednotí přístup k centrální databázi z webového i desktopového prostředí',
        'implementuje autentizaci a registraci uživatelů',
        'spravuje uživatelské relace (sessions, tokeny) a přístupová práva',
        'používá kryptografické hashování se solí pro bezpečnou správu hesel',
        'aplikuje zásady bezpečné práce a ošetření vstupů (sanitizace, validace)',
        'rozpozná zranitelnosti typu SQL injection a XSS a implementuje obranu'
      ],
      content: [
        'Vývoj webového klienta (formulářové rozhraní, interakce s API)',
        'Koexistence webového a desktopového klienta nad jednotným backendem',
        'Autentizace a autorizace uživatelů (registrace, přihlášení, správa relací)',
        'Bezpečná správa hesel (hashování se solí, ochrana před útoky)',
        'Ochrana vstupů (sanitizace, validace dat na klientu i serveru, obrana proti XSS)'
      ]
    },
    {
      id: 'prg4-b2',
      topic: '2. Softwarové inženýrství, týmová spolupráce a verzovací systémy',
      hours: 12,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'uplatňuje zásady čistého kódu (Clean Code) a modularitu softwaru',
        'provádí refaktoring a optimalizaci zdrojového kódu',
        'sestaví testovací scénáře a píše jednotkové testy (Unit Testing)',
        'pracuje v týmu pomocí verzovacího systému Git',
        'využívá větvení (branching), slučování (merge) a řeší konflikty',
        'pracuje se vzdáleným repozitářem a účastní se revizí kódu (Code Review)',
        'organizuje práci v týmu pomocí nástrojů pro správu úkolů (Kanban)'
      ],
      content: [
        'Zásady čistého kódu (Clean Code, čitelnost, refaktoring, modularita)',
        'Testování softwaru (testovací scénáře, jednotkové testy, hledání chyb)',
        'Týmový verzovací systém Git (větve, merge, řešení konfliktů)',
        'Vzdálené repozitáře, Pull Requesty, Code Review',
        'Agilní řízení projektu (nástěnka Kanban, správa úkolů a chyb)'
      ]
    },
    {
      id: 'prg4-b3',
      topic: '3. Závěrečný komplexní maturitní projekt a veřejná obhajoba',
      hours: 24,
      crossThemes: ['PT - ČSP', 'PT - ČDS', 'PT - ODS'],
      outcomes: [
        'analyzuje zadání a navrhne architekturu maturitního projektu',
        'samostatně realizuje klientskou i serverovou část aplikace',
        'udržuje verzování projektu v repozitáři v jednotlivých milnících',
        'systematicky testuje software, odstraňuje nalezené chyby a ladí výkon',
        'vytváří ucelenou technickou a uživatelskou dokumentaci projektu',
        'prezentuje a obhájí vlastní projekt před zkušební komisí',
        'reflektuje zvolená technická řešení a reaguje na odborné dotazy'
      ],
      content: [
        'Zadání a specifikace maturitního projektu (architektura, datový model, API)',
        'Samostatná implementace v projektových milnících s verzováním v Gitu',
        'Testování, ladění zátěže, zabezpečení a ošetření chybových stavů',
        'Tvorba projektové dokumentace (README, technická zpráva, uživatelský návod)',
        'Příprava prezentace a veřejná odborná obhajoba před maturitní komisí'
      ]
    }
  ]
};

