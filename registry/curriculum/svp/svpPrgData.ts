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
    'prezentací a obhajobou projektu. Důraz je kladen na čistotu a čitelnost návrhu, modularitu, dekompozici a schopnost obhájit technické řešení.',
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
        'v týmu při společné práci na zdrojovém kódu.'
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
        'nést odpovědnost za svěřený modul a systematicky plánovat postup práce v týmu.'
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
    'systémů (relační model a práce s databází, kterou integruje do aplikačního kódu). Vytváří technologické zázemí pro předměty ' +
    'Počítačové sítě a Operační systémy (skriptování, síťová komunikace přes protokoly HTTP) a tvoří přímou propedeutiku pro předmět ' +
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
        'Seznamy a práce s daty (pole hodnot, indexace, přidávání, odebírání a vyhledávání)',
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
        'zpracovává vstupy z tlačítek a fyzických senzorů',
        'řídí zobrazovací a zvukové výstupy mikrokontroléru',
        'implementuje bezdrátový přenos dat mezi zařízeními'
      ],
      content: [
        'Blokové vývojové prostředí pro mikrokontrolér',
        'Vstupní periferie a čidla (tlačítka, akcelerometr, měření osvětlení a teploty)',
        'Výstupní periferie (LED matice, piezo bzučák, tóny)',
        'Zpracování událostí hardware v reálném čase',
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
        'aplikuje cykly (for a while) pro opakované činnosti v programu',
        'vytváří větvené programy reagující na stav a polohu objektů',
        'vytváří vlastní funkce s parametry a návratovou hodnotou',
        'obsluhuje události myši a klávesnice pro interakci s uživatelem'
      ],
      content: [
        'Vývojové prostředí jazyka Python, interpret, syntaxe a odsazování bloků',
        'Vstup a výstup (print, f-strings, input, přetypování int a float)',
        'Datové typy a operátory (aritmetické, celočíselné dělení, modulo)',
        'Grafické plátno (souřadnicový systém, kreslení tvarů, barvy, výplně)',
        'Řídicí struktury (cykly for a while, rozsah range, podmínka opakování)',
        'Podmíněné větvení (if, elif, else, relační a logické operátory)',
        'Moduly a náhoda (import standardních knihoven, generování náhodných čísel)',
        'Uživatelské funkce (klíčové slovo def, parametry, návratová hodnota return)',
        'Událostmi řízená interaktivita (obsluha událostí myši a klávesnice, interaktivní aplikace)'
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
      topic: '1. Datové kolekce v jazyce Python',
      hours: 16,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'vysvětlí princip a význam ukládání dat do kolekcí',
        'vytváří a modifikuje seznamy (přidávání, úprava a odebírání prvků)',
        'prochází kolekce pomocí cyklu a zpracovává jednotlivé prvky',
        'vyhledává a filtruje prvky v kolekci podle zadaných kritérií',
        'rozlišuje základní typy kolekcí (seznam, n-tice, množina, slovník)',
        'používá slovníky pro ukládání a organizaci dat pomocí klíčů a hodnot',
        'zpracovává textové řetězce pomocí základních řetězcových operací'
      ],
      content: [
        'Pojem kolekce, rozdíl mezi jednoduchou proměnnou a kolekcí dat',
        'Seznamy (list) – indexace, délka, procházení prvků cyklem',
        'Operace se seznamy (metody append, insert, pop, remove, řazení)',
        'Prohledávání a filtrace dat v seznamu, podmíněný výběr prvků',
        'N-tice (tuple) a množiny (set) – neměnnost, unikátnost a odstranění duplicit',
        'Slovníky (dict) – asociativní ukládání, dvojice klíč–hodnota, strukturované záznamy',
        'Textové řetězce (str) jako kolekce znaků – indexace, délka, oříznutí mezer, dělení a vyhledávání (strip, split, in)'
      ]
    },
    {
      id: 'prg2-b2',
      topic: '2. Práce se soubory (JSON) a ošetření chyb v programu',
      hours: 14,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'vysvětlí význam trvalého ukládání dat mimo operační paměť',
        'čte a zapisuje textová data do souborů na disku',
        'ukládá a načítá strukturovaná data ve formátu JSON',
        'rozpozná syntaktické a běhové chyby v programu',
        'ošetřuje běhové chyby (výjimky) a předchází pádu aplikace'
      ],
      content: [
        'Trvalé ukládání dat na disk, textové soubory (čtení, zápis, kódování UTF-8)',
        'Strukturovaný výměnný formát JSON (ukládání stavu aplikace, konfigurace a herních dat)',
        'Chyby v programu a jejich zachycení (typy chyb, zachycení výjimek, bezpečný běh aplikace)'
      ]
    },
    {
      id: 'prg2-b3',
      topic: '3. Základy objektově orientovaného programování v jazyce Python',
      hours: 16,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'vysvětlí rozdíl mezi procedurálním a objektovým přístupem',
        'navrhne třídu jako šablonu pro modelování reálného objektu',
        'vytváří instance tříd s počátečním stavem (konstruktor)',
        'definuje atributy a metody pro řízení chování objektu',
        'propojuje více instancí a objektů v aplikaci'
      ],
      content: [
        'Objektové myšlení (třída jako šablona, instance jako konkrétní objekt)',
        'Vnitřní stav objektu (atributy, konstruktor __init__, parametr self)',
        'Chování objektu (metody instance, práce s vnitřními daty objektu)',
        'Spolupráce objektů (seznam objektů, předávání objektů mezi funkcemi)'
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
        'organizuje rozložení prvků v okně aplikace pomocí souřadnicového pozicování',
        'vytváří formuláře a ovládací prvky uživatelského rozhraní (nápis, tlačítko, textové pole, přepínače, zaškrtávací pole)',
        'propojuje grafické rozhraní s programovou logikou a proměnnými rozhraní',
        'realizuje samostatný projekt desktopové aplikace s grafickým uživatelským rozhraním'
      ],
      content: [
        'Okenní architektura, řízení událostmi (Event Loop)',
        'Rozmístění prvků v okně aplikace (souřadnicové pozicování place)',
        'Grafické komponenty (nápis Label, tlačítko Button, textové pole Entry, přepínače Radiobutton, zaškrtávací pole Checkbutton)',
        'Vazba událostí a proměnných na grafické prvky (obslužné funkce, parametry StringVar a BooleanVar)',
        'Samostatný projekt desktopové aplikace s grafickým uživatelským rozhraním'
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
      topic: '1. Tvorba prostorové scény, prostředí a materiály ve 3D enginu',
      hours: 20,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'orientuje se v prostředí 3D herního a simulačního enginu',
        'vysvětlí komponentový princip enginu',
        'vytváří 3D scénu a prostorové uspořádání objektů',
        'aplikuje transformace herních objektů (pozice, rotace, měřítko)',
        'pracuje s kamerou a nastavuje osvětlení scény',
        'vytváří a aplikuje povrchové materiály a textury',
        'využívá připravenou šablonu pro pohyb hráče v prostoru'
      ],
      content: [
        'Editor 3D enginu (např. Unity), struktura projektu, správa aktiv (Project, Hierarchy, Inspector)',
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
        'implementuje fyzikální vlastnosti objektů v 3D scéně (gravitace, hmotnost, tření)',
        'definuje kolizní tvary a detekční zóny pro interakci v prostoru',
        'propojí logiku scény se skripty z připravené šablony',
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
        'instaluje externí knihovny v Pythonu a člení aplikaci do více modulů',
        'vytvoří datově orientovaný webový formulář pro odesílání dat',
        'propojí desktopovou aplikaci se síťovým serverem',
        'vytvoří aplikační backend v jazyce Python',
        'definuje koncové body (endpointy) a směrování požadavků',
        'zpracovává příchozí data na backendu a generuje odpověď serveru'
      ],
      content: [
        'Architektura klient–server, model Request-Response, síťová komunikace',
        'Protokol HTTP/HTTPS, metody GET a POST, hlavičky, stavové kódy',
        'Správa externích knihoven (pip) a dělení aplikace do více modulů (import)',
        'Formulářové rozhraní (značky form, input, odesílání dat, tabulka záznamů)',
        'Síťové propojení klientské aplikace se serverem',
        'Tvorba backendu v Pythonu (směrování, obsluha požadavků a endpointy)',
        'Zpracování příchozích dat, validace a generování odpovědí'
      ]
    },
    {
      id: 'prg3-b4',
      topic: '4. Databáze a aplikační rozhraní serveru (API)',
      hours: 30,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'provádí základní operace s daty v relační databázi (čtení, zápis, úprava a mazání dat)',
        'propojí serverovou aplikaci s databázovým úložištěm',
        'uplatňuje zásady bezpečné komunikace aplikace s databází',
        'transformuje databázové záznamy do datových struktur programu',
        'poskytuje data z databáze klientským aplikacím (webovým i desktopovým) prostřednictvím aplikačního rozhraní (API)'
      ],
      content: [
        'Relační databáze v aplikacích (struktura dat, základní databázové operace čtení a zápisu)',
        'Propojení serverové aplikace s databází (navázání spojení, vykonávání příkazů)',
        'Bezpečnost databázové vrstvy (ochrana před neautorizovanou manipulací a zneužitím vstupů)',
        'Zpracování a transformace databázových dat v programu',
        'Aplikační programové rozhraní (API) pro výměnu dat s klientskými aplikacemi (web, desktop)'
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
        'propojí webového klienta s aplikačním rozhraním (API)',
        'sjednotí přístup k centrální databázi z webového i desktopového prostředí',
        'implementuje autentizaci a registraci uživatelů',
        'spravuje uživatelské relace a přístupová práva',
        'používá bezpečné jednocestné hashování pro správu hesel',
        'aplikuje zásady bezpečné práce a ošetření uživatelských vstupů'
      ],
      content: [
        'Vývoj webového klienta (formulářové rozhraní, interakce s API)',
        'Koexistence webového a desktopového klienta nad jednotným backendem',
        'Autentizace a autorizace uživatelů (registrace, přihlášení, správa relací)',
        'Bezpečná správa hesel (hashování se solí, ochrana před útoky)',
        'Ochrana a kontrola uživatelských vstupů na klientu i serveru'
      ]
    },
    {
      id: 'prg4-b2',
      topic: '2. Týmová spolupráce a verzování softwaru',
      hours: 12,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'spolupracuje v malém týmu (dvojice, trojice) na vývoji společného softwarového projektu',
        'rozděluje projekt na dílčí části a koordinuje postup práce se spolužáky',
        'používá verzovací systém pro správu a sdílení zdrojového kódu v týmu',
        'slučuje části kódu od jednotlivých členů týmu a řeší vzniklé kolize',
        'dodržuje zásady čitelnosti a jednotného formátování kódu pro usnadnění týmové práce'
      ],
      content: [
        'Týmová spolupráce při tvorbě softwaru (rozdělení rolí v týmu, plánování a koordinace práce na projektu)',
        'Verzovací systém v týmové praxi (historie změn, sdílení kódu ve společném repozitáři)',
        'Slučování týmové práce a řešení kolizí (práce na oddělených částech, začleňování změn od spolužáků, předcházení a oprava konfliktů v kódu)',
        'Čitelný kód a jednotný styl pro přehlednou spolupráci více vývojářů',
        'Týmový miniprojekt (vývoj aplikace ve dvojicích či trojicích od zadání po funkční celek)'
      ]
    },
    {
      id: 'prg4-b3',
      topic: '3. Závěrečný komplexní softwarový projekt a jeho prezentace',
      hours: 24,
      crossThemes: ['PT - ČSP', 'PT - ČDS', 'PT - ODS'],
      outcomes: [
        'analyzuje zadání a navrhne architekturu komplexního softwarového projektu',
        'samostatně realizuje klientskou i serverovou část aplikace',
        'udržuje verzování projektu v repozitáři v jednotlivých milnících',
        'systematicky testuje software, odstraňuje nalezené chyby a ladí výkon',
        'vytváří ucelenou technickou a uživatelskou dokumentaci projektu',
        'prezentuje a obhájí vlastní projekt a zvolená technická řešení'
      ],
      content: [
        'Zadání a specifikace komplexního projektu (architektura, datový model, API)',
        'Samostatná implementace v projektových milnících s verzováním v Gitu',
        'Testování aplikace, ladění, zabezpečení a ošetření chybových stavů',
        'Tvorba projektové dokumentace (README, technická zpráva, uživatelský návod)',
        'Příprava prezentace a odborná obhajoba projektu'
      ]
    }
  ]
};

