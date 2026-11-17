import { SvpGradeData, SvpSharedInfo } from './svpTypes';

// -------------------------------------------------------------------------
// SPOLEČNÁ ČÁST PŘEDMĚTU PRO INSPIS – ROBOTIKA (3. A 4. ROČNÍK)
// -------------------------------------------------------------------------
export const SVP_ROB_SHARED_INFO: SvpSharedInfo = {
  subjectName: 'Robotika',
  fieldCode: '18-20-M/01',
  fieldName: 'Informační technologie',
  evaluation:
    'Hodnocení žáka vychází zejména z praktických úloh, funkčnosti vytvořených programů, ' +
    'schopnosti samostatně řešit technický problém, průběžné práce na projektech, kvality technického řešení, ' +
    'schopnosti pracovat v týmu, technické dokumentace projektu a závěrečné prezentace a obhajoby vlastního řešení. ' +
    'Při hodnocení se nezohledňuje pouze konečná funkčnost zařízení, ale také postup řešení, samostatnost, ' +
    'schopnost odhalovat a odstraňovat chyby a schopnost vysvětlit princip vytvořeného řešení.',
  keyCompetencies: [
    {
      title: 'Kompetence k učení',
      description:
        'Žák vyhledává a využívá informace z odborných zdrojů a technické dokumentace; ' +
        'propojuje poznatky z programování, elektrotechniky, matematiky a fyziky; ' +
        'experimentuje a vyhodnocuje výsledky své práce; samostatně získává nové znalosti potřebné k řešení úkolu.'
    },
    {
      title: 'Kompetence k řešení problémů',
      description:
        'Žák analyzuje zadaný problém a stanovuje požadavky na řešení; navrhuje algoritmus a vhodné technické řešení; ' +
        'testuje funkčnost řešení; systematicky vyhledává a odstraňuje chyby; upravuje a optimalizuje vytvořený program nebo konstrukci.'
    },
    {
      title: 'Komunikativní kompetence',
      description:
        'Žák používá odbornou terminologii; pracuje s technickou dokumentací; dokumentuje průběh a výsledky projektu; ' +
        'prezentuje a obhajuje vlastní řešení; reaguje na dotazy a konstruktivně diskutuje o navržených řešeních.'
    },
    {
      title: 'Personální a sociální kompetence',
      description:
        'Žák spolupracuje při řešení týmových projektů; rozděluje si úkoly a přijímá odpovědnost za jejich splnění; ' +
        'respektuje názory ostatních; poskytuje a přijímá zpětnou vazbu; vyhodnocuje vlastní práci a podíl na společném výsledku.'
    },
    {
      title: 'Digitální kompetence',
      description:
        'Žák využívá vývojová prostředí a specializovaný software; pracuje s digitálními daty získanými ze senzorů; ' +
        'využívá síťovou komunikaci a IoT technologie; využívá digitální nástroje pro návrh, programování, testování a dokumentaci; ' +
        'respektuje zásady bezpečného používání propojených zařízení.'
    }
  ],
  crossCuttingThemes: [
    {
      code: 'PT - ČSP',
      name: 'Člověk a svět práce',
      description:
        'Žáci řeší praktické technické problémy, pracují s technickou dokumentací, plánují pracovní postup a získávají zkušenosti s týmovou spoluprací a projektovým řízením.'
    },
    {
      code: 'PT - ČŽP',
      name: 'Člověk a životní prostředí',
      description:
        'Žáci se seznamují s možnostmi využití robotiky při monitorování životního prostředí, automatizaci a efektivním využívání zdrojů. Součástí je odpovědný přístup k elektronickým zařízením.'
    },
    {
      code: 'PT - ODS',
      name: 'Občan v demokratické společnosti',
      description:
        'Žáci diskutují o dopadech automatizace, robotizace a umělé inteligence na společnost, zaměstnanost a každodenní život.'
    },
    {
      code: 'PT - IKT',
      name: 'Informační a komunikační technologie',
      description:
        'Průřezové téma je integrováno v celém předmětu – žáci programují v Pythonu, zpracovávají data, využívají sítě, IoT, digitální nástroje a technologie AI.'
    }
  ],
  interdisciplinaryRelations:
    'Předmět úzce propojuje znalosti z Programování (jazyk Python, algoritmizace, funkce, datové struktury), ' +
    'Hardwaru (mikrokontroléry, senzory, akční členy), Základů elektrotechniky (bezpečné zapojování a napájení), ' +
    'Počítačových sítí (komunikace zařízení, bezdrátový přenos, IoT), Matematiky a fyziky (mechanický pohyb, senzory, měření veličin).'
};

// -------------------------------------------------------------------------
// 3. ROČNÍK: ROBOTIKA 1 (ROB 3 – 66 HODIN)
// Přesně 10 tematických celků podle oficiálního ŠVP
// -------------------------------------------------------------------------
export const SVP_ROB3_DATA: SvpGradeData = {
  gradeLabel: '3. Ročník',
  gradeCode: 'ROB 3',
  totalHours: 66,
  blocks: [
    {
      id: 'rob3-b1',
      topic: '1. Úvod do robotiky',
      hours: 2,
      crossThemes: ['PT - ČSP', 'PT - ODS'],
      outcomes: [
        'vysvětlí pojem robotika a uvede oblasti jejího využití v praxi',
        'rozliší základní typy robotů a jejich architekturu',
        'popíše funkci základních částí robotického systému (řídicí jednotka, senzory, akční členy)',
        'rozliší autonomní a dálkově řízený systém',
        'dodržuje zásady bezpečné práce v robotické laboratoři'
      ],
      content: [
        'Robotika a její využití v průmyslu, službách, dopravě a domácnosti',
        'Typy robotických systémů (mobilní, manipulátory, servisní)',
        'Základní komponenty robotu (mikrokontrolér, napájení, snímače, pohony)',
        'Bezpečnostní pravidla a prevence rizik při práci s roboty'
      ]
    },
    {
      id: 'rob3-b2',
      topic: '2. Mikrokontroléry a programování robotických systémů',
      hours: 12,
      crossThemes: ['PT - IKT', 'PT - ČSP'],
      outcomes: [
        'pracuje s vývojovým prostředím mikrokontroléru v jazyce MicroPython',
        'vytvoří, upraví a nahraje program do jednočipového mikrokontroléru BBC micro:bit v2',
        'využívá proměnné, podmínky, cykly a funkce pro řízení hardware',
        'pracuje s knihovnami pro obsluhu periferií a neblokující časování',
        'využívá digitální a analogové vstupy a výstupy (GPIO)',
        'vyhledává a odstraňuje chyby programu pomocí sériové konzole REPL',
        'vytvoří jednoduchý konečný stavový automat v Pythonu'
      ],
      content: [
        'Architektura mikrokontroléru BBC micro:bit v2 (ARM procesor, paměť, GPIO)',
        'Vývojové prostředí pro MicroPython a práce se sériovou REPL konzolí',
        'Algoritmické struktury v hardware (podmínky, smyčky, funkce, ošetření vstupů)',
        'Časování bez blokování programu (funkce ticks_ms vs. sleep)',
        'Koncept a praktická implementace stavového automatu'
      ]
    },
    {
      id: 'rob3-b3',
      topic: '3. Senzory a zpracování dat',
      hours: 10,
      crossThemes: ['PT - IKT', 'PT - ČŽP'],
      outcomes: [
        'vysvětlí princip funkce vybraných digitálních a analogových senzorů',
        'připojí a programově obslouží senzor přes sběrnici I2C a GPIO piny',
        'načte a zpracuje naměřené fyzikální hodnoty v reálném čase',
        'vyhodnotí získaná data a zobrazí je na grafickém OLED displeji',
        'využije více senzorů současně a vytvoří program reagující na naměřené hodnoty',
        'odhalí fyzikální chyby a šum měření a aplikuje softwarovou filtraci (plovoucí průměr)'
      ],
      content: [
        'Senzory v robotice (analogové vs. digitální rozhraní, A/D převodník)',
        'Senzorika prostředí z IoT sady (teplota, vlhkost, osvětlení, půdní vlhkost)',
        'Sériová sběrnice I2C a grafický OLED displej SSD1306',
        'Ultrazvukový dálkoměr (Sonar) a optické infračervené senzory',
        'Zpracování signálu (filtrace šumu, klouzavý průměr, hystereze)'
      ]
    },
    {
      id: 'rob3-b4',
      topic: '4. Řízení motorů a pohyb robotu',
      hours: 8,
      crossThemes: ['PT - IKT', 'PT - ČSP'],
      outcomes: [
        'vysvětlí princip řízení stejnosměrných motorů a funkci H-můstku',
        'naprogramuje směr a rychlost otáčení motorů pomocí pulzně-šířkové modulace (PWM)',
        'vytvoří řídicí algoritmus pro dvoukolové robotické vozítko Cutebot',
        'využije ultrazvukový senzor pro včasnou detekci překážky a bezpečné zastavení',
        'vytvoří program pro plynulé sledování vyznačené trasy podle infračervených senzorů',
        'optimalizuje algoritmus pohybu a provede kalibraci trimu motorů pro přímou jízdu'
      ],
      content: [
        'Pohony v robotice (DC motory, H-můstek, PWM regulace výkonu)',
        'Diferenciální kinematika robotického vozítka Cutebot',
        'Měření vzdálenosti sonarem a zónové bezpečnostní brzdění',
        'Sledování černé vodicí linie na bílém podkladu (dvoustavové řízení a plynulá korekce)'
      ]
    },
    {
      id: 'rob3-b5',
      topic: '5. Autonomní robotika',
      hours: 6,
      crossThemes: ['PT - IKT', 'PT - ČSP'],
      outcomes: [
        'vysvětlí princip autonomního řízení v cyklu vstup – zpracování – rozhodnutí – výstup',
        'navrhne a v Pythonu implementuje rozhodovací algoritmus autonomního chování',
        'kombinuje údaje z více senzorů (čára, ultrazvuk, nárazník)',
        'vytvoří program, který umožní robotu samostatně reagovat na překážky a řešit bludiště',
        'testuje a optimalizuje chování robotu v testovací aréně',
        'analyzuje chyby autonomního systému při ztrátě vodicí linie nebo kontaktu s mantinelem'
      ],
      content: [
        'Koncepce autonomního agenta (reaktivní chování vs. plánování trasy)',
        'Rozhodovací logika a stavový automat v autonomním pohybu',
        'Navigační strategie: sledování stěny, vyhýbání se překážce, řešení bludiště',
        'Testování a ladění spolehlivosti kódu v modelové aréně'
      ]
    },
    {
      id: 'rob3-b6',
      topic: '6. 3D modelování a konstrukce pro robotiku',
      hours: 6,
      crossThemes: ['PT - ČSP', 'PT - IKT'],
      outcomes: [
        'vytvoří jednoduchý 3D model funkčního konstrukčního dílu v CAD nástroji',
        'přizpůsobí rozměry a tolerance součástky konkrétnímu robotickému zařízení',
        'připraví model pro 3D tisk (slicing, nastavení vrstev a výplně v PrusaSliceru)',
        'vytiskne součástku na 3D tiskárně Prusa MINI a ověří její mechanickou funkčnost',
        'upraví návrh podle výsledků praktického testování na robotu'
      ],
      content: [
        'Základy 3D modelování pro technickou praxi (Tinkercad / Onshape)',
        'Konstrukční díly v robotice (držáky senzorů, nárazníky, kryty baterií, adaptéry)',
        'Technologie 3D tisku FDM/FFF, volba materiálu (PLA/PETG), orientace modelu na podložce',
        'Příprava tiskových dat (G-code) a obsluha 3D tiskárny Prusa MINI'
      ]
    },
    {
      id: 'rob3-b7',
      topic: '7. Internet věcí a komunikace robotických zařízení',
      hours: 6,
      crossThemes: ['PT - IKT', 'PT - ČDS'],
      outcomes: [
        'vysvětlí princip internetu věcí (IoT) a strojové komunikace (M2M)',
        'propojí mikrokontroléry v bezdrátové síti na frekvenci 2.4 GHz (micro:bit Radio)',
        'sestaví, odešle a na přijímací straně zpracuje strukturovaný datový paket (telemetrie)',
        'vytvoří jednoduchý systém vzdáleného monitorování stavu robota nebo prostředí',
        'odešle naměřená data přes Wi-Fi do cloudového rozhraní (ThingSpeak / dashboard)',
        'uvede základní bezpečnostní rizika IoT zařízení a zásady jejich zabezpečení'
      ],
      content: [
        'Architektura IoT systémů (senzory, brána, cloud, klientská aplikace)',
        'Bezdrátový rádiový přenos (micro:bit Radio kanály, skupiny, struktura paketu)',
        'Vzdálená telemetrie: přenos údajů z jedoucího Cutebota do stacionární základny',
        'Cloudové vizualizační nástroje a kybernetická bezpečnost propojených zařízení'
      ]
    },
    {
      id: 'rob3-b8',
      topic: '8. Robotika a umělá inteligence',
      hours: 4,
      crossThemes: ['PT - IKT', 'PT - ODS'],
      outcomes: [
        'uvede reálné příklady využití umělé inteligence v moderní robotice',
        'vysvětlí základní princip počítačového vidění a fungování inteligentní kamery jako senzoru',
        'využije kameru SmartLens jako zdroj dat pro řízení robota v MicroPythonu',
        'pracuje s praktickou ukázkou rozpoznávání barevných objektů a obrazových značek',
        'diskutuje technické možnosti, limity a etické otázky nasazení AI v autonomních systémech'
      ],
      content: [
        'Umělá inteligence a strojové vidění v robotických systémech',
        'Chytrá kamera SmartLens (zorné pole, snímková frekvence, detekční algoritmy)',
        'Praktické úlohy: Color Tracking (reakce na barevné karty) a sledování objektu',
        'Možnosti a limity AI, spolehlivost rozpoznávání při měnících se světelných podmínkách'
      ]
    },
    {
      id: 'rob3-b9',
      topic: '9. Závěrečný robotický projekt',
      hours: 10,
      crossThemes: ['PT - ČSP', 'PT - IKT'],
      outcomes: [
        'analyzuje zadaný technický problém a stanoví požadavky na robotické řešení',
        'navrhne algoritmus a architekturu řídicího programu v Pythonu',
        'samostatně nebo v týmu sestaví, propojí a naprogramuje funkční robotické zařízení',
        'integruje senzory, pohony a případně 3D tištěný konstrukční díl, IoT či AI kameru',
        'systematicky testuje, odlaďuje a optimalizuje vytvořené řešení v modelové situaci',
        'vede přehlednou technickou dokumentaci projektu'
      ],
      content: [
        'Projektové řízení v technické praxi: od specifikace požadavků k realizaci',
        'Samostatná týmová práce na komplexní robotické úloze',
        'Integrace hardwarových a softwarových komponent do jednoho celku',
        'Testování mezních stavů, ladění chyb a tvorba technické zprávy'
      ]
    },
    {
      id: 'rob3-b10',
      topic: '10. Prezentace a obhajoba projektu',
      hours: 2,
      crossThemes: ['PT - ČSP', 'PT - IKT'],
      outcomes: [
        'veřejně prezentuje a prakticky předvede vytvořené robotické řešení před třídou',
        'srozumitelně vysvětlí princip fungování řídicího programu v Pythonu',
        'odborně a věcně obhájí zvolený technický postup',
        'konstruktivně reaguje na dotazy vyučujícího a spolužáků',
        'zhodnotí vlastní práci, týmovou spolupráci a navrhne možnosti dalšího rozvoje projektu'
      ],
      content: [
        'Techniky prezentace technických projektů a živá demonstrace zařízení',
        'Strukturovaná odborná obhajoba technického řešení',
        'Zpětná vazba, reflexe inženýrské práce a vyhodnocení výsledků'
      ]
    }
  ]
};

// -------------------------------------------------------------------------
// 4. ROČNÍK: ROBOTIKA 2 (ROB 4 – 66 HODIN)
// Všesměrová aréna VEX AIM, průmyslové rameno KUKA a maturitní projekt
// -------------------------------------------------------------------------
export const SVP_ROB4_DATA: SvpGradeData = {
  gradeLabel: '4. Ročník',
  gradeCode: 'ROB 4',
  totalHours: 66,
  blocks: [
    {
      id: 'rob4-b1',
      topic: '1. Všesměrová mobilní robotika a herní aréna (VEX AIM)',
      hours: 28,
      crossThemes: ['PT - IKT', 'PT - ČSP'],
      outcomes: [
        'popíše mechanický princip všesměrových kol (Omni wheels) a výhody holonomního podvozku',
        'programuje pohyb robotu VEX AIM v libovolném směru roviny v prostředí VEXcode Python',
        'ovládá elektromagnetický akční člen pro manipulaci s herními puky a mechanický vyhazovač',
        'využívá senzory pro orientaci na soutěžním hřišti a vyhledání herních prvků',
        'navrhne a odladí autonomní herní a taktickou strategii v reálném čase',
        'efektivně spolupracuje v týmu během třídního turnaje v robotické aréně'
      ],
      content: [
        'Konstrukce tříkolového všesměrového podvozku VEX AIM a vlastnosti Omni kol',
        'Programování holonomního pohybu v Pythonu (nezávislá translace a rotace)',
        'Ovládání akčních členů v aréně (elektromagnet, mechanický vyhazovač / kicker)',
        'Senzorická orientace na hřišti, vyhledávání puků a navigace k brance',
        'Autonomní herní strategie a týmový turnaj dvojic na soutěžním hřišti'
      ]
    },
    {
      id: 'rob4-b2',
      topic: '2. Průmyslová robotika a manipulátory (KUKA)',
      hours: 12,
      crossThemes: ['PT - ČSP', 'PT - IKT'],
      outcomes: [
        'striktně dodržuje bezpečnostní předpisy pro práci s průmyslovými roboty a zná funkci E-Stop tlačítka',
        'bezpečně obsluhuje ruční ovládací panel průmyslového ramene (Teach Pendant / smartPAD)',
        'manuálně navádí 6-osé rameno KUKA v kloubových i kartézských souřadnicích (WORLD, BASE, TOOL)',
        'ukládá referenční prostorové body metodou Teach-In a definuje trajektorie PTP a LIN',
        'vytvoří a odladí manipulační cyklus Pick & Place pro přemístění a paletizaci objektů',
        'samostatně spustí, zkontroluje a bezpečně zastaví naprogramovaný cyklus ramene'
      ],
      content: [
        'Bezpečnostní normy v průmyslové automatizaci (ochranný prostor, souhlasný spínač, E-Stop)',
        'Kinematika 6-osého ramene KUKA (stupně volnosti A1–A6, pracovní dosah)',
        'Ovládání přes KUKA smartPAD: ruční pojezd (Jogging) v souřadnicích WORLD a BASE',
        'Metoda Teach-In: záznam bodů, trajektorie z bodu do bodu (PTP) a po přímce (LIN)',
        'Úloha Pick & Place: kalibrace chapadla, uchopení kostky, přemístění a přesné uložení',
        'Praktické ověření samostatné bezpečné obsluhy každým žákem'
      ]
    },
    {
      id: 'rob4-b3',
      topic: '3. Závěrečný komplexní inženýrský projekt a obhajoba',
      hours: 26,
      crossThemes: ['PT - ČSP', 'PT - IKT'],
      outcomes: [
        'samostatně nebo v týmu analyzuje technický problém a navrhne komplexní inženýrské řešení',
        'vybere a efektivně využije vhodný hardware z výuky (VEX AIM, KUKA, VEX IQ, IoT/Cutebot)',
        'vyvine, otestuje a odladí řídicí software v Pythonu s důrazem na spolehlivost a ošetření chyb',
        'zpracuje kompletní technickou dokumentaci včetně schématu zapojení a popisu kódu',
        'veřejně prezentuje a obhájí realizované dílo před maturitní komisí a třídou',
        'věcně argumentuje a prokáže hluboké porozumění zvolenému technickému postupu'
      ],
      content: [
        'Formulace inženýrského zadání projektu a stanovení milníků realizace',
        'Samostatný vývoj softwaru v Pythonu a integrace hardwarových komponent',
        'Testování spolehlivosti systému, ladění hraničních stavů a ošetření výpadků',
        'Zpracování technické zprávy a uživatelské dokumentace',
        'Příprava prezentačních podkladů a demonstrace funkčního zařízení',
        'Ústní obhajoba projektu a odborná diskuse před zkušební komisí'
      ]
    }
  ]
};
