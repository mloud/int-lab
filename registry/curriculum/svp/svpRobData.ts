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
// 3 ucelené technologicky neutrální tematické celky
// -------------------------------------------------------------------------
export const SVP_ROB3_DATA: SvpGradeData = {
  gradeLabel: '3. Ročník',
  gradeCode: 'ROB 3',
  totalHours: 66,
  blocks: [
    {
      id: 'rob3-b1',
      topic: '1. Mikrokontroléry a internet věcí',
      hours: 12,
      crossThemes: ['PT - IKT', 'PT - ČSP', 'PT - ČŽP'],
      outcomes: [
        'vytvoří a odladí program pro čtení digitálních i analogových senzorů v textovém programovacím jazyce',
        'zobrazí naměřené údaje a stavové ikony na lokálním displeji',
        'ovládá spínací a akční prvky v závislosti na hodnotách ze senzorů',
        'zajistí přenos telemetrických dat a jejich zobrazení ve webovém rozhraní'
      ],
      content: [
        'Architektura výukového mikrokontroléru, vývojové prostředí, textový programovací jazyk (Python)',
        'Vstupně-výstupní piny (GPIO), digitální a analogové signály, PWM regulace',
        'Snímání fyzikálních veličin prostředí (teplota, osvětlení, vlhkost, stavová tlačítka)',
        'Zobrazovací a akční členy (displej, relé, akustická signalizace)',
        'Síťová komunikace, základy IoT, přenos naměřených dat do webového prostředí a jejich vizualizace'
      ]
    },
    {
      id: 'rob3-b2',
      topic: '2. Autonomní mobilní podvozky',
      hours: 12,
      crossThemes: ['PT - IKT', 'PT - ČSP'],
      outcomes: [
        'programově řídí rychlost a směr pohybu kolového podvozku',
        'naprogramuje bezpečné zastavení před překážkou ve stanovené vzdálenosti',
        'vytvoří stabilní program pro sledování vodicí linie na podkladu',
        'navrhne a otestuje autonomní průjezd podvozku vymezenou trasou'
      ],
      content: [
        'Mobilní podvozek s diferenciálním řízením, princip regulace rychlosti a směru',
        'Bezkontaktní měření vzdálenosti a detekce překážek',
        'Optické senzory pro detekci podkladu a sledování vyznačené trasy',
        'Algoritmy autonomního pohybu: reaktivní chování, stavové řízení, řešení jednoduchých překážkových situací'
      ]
    },
    {
      id: 'rob3-b3',
      topic: '3. Pokročilá mobilní robotika a počítačové vidění',
      hours: 42,
      crossThemes: ['PT - IKT', 'PT - ČSP', 'PT - ODS'],
      outcomes: [
        'programově řídí pohyb robotické platformy a provádí přesné prostorové manévry',
        'využije kameru a algoritmy počítačového vidění pro detekci orientačních značek v prostoru',
        'naprogramuje vyhledání barevného objektu a samostatné navedení robota k němu',
        'implementuje algoritmus pro záchyt objektu a jeho přemístění do cílové oblasti',
        'navrhne, odladí a otestuje autonomní strategii pro řešení komplexní arénové výzvy'
      ],
      content: [
        'Řízení a kinematika pohybu mobilní platformy, udržení kurzu a manévrování v ploše',
        'Počítačové vidění v mobilní robotice: kamera jako senzor, snímání a analýza scény v reálném čase',
        'Detekce optických pozičních značek pro prostorovou lokalizaci a orientaci',
        'Rozpoznávání herních a pracovních objektů podle barevných a tvarových příznaků',
        'Inerciální senzory (gyroskop, akcelerometr) pro sledování pohybu a prostorovou stabilitu',
        'Interakce s objekty na ploše: vyhledání cíle, záchyt a transport do určené zóny',
        'Autonomní strategie a řešení komplexních úloh v aréně na čas'
      ]
    }
  ]
};

// -------------------------------------------------------------------------
// 4. ROČNÍK: ROBOTIKA 2 (ROB 4 – 66 HODIN)
// 3 ucelené technologicky neutrální tematické celky
// -------------------------------------------------------------------------
export const SVP_ROB4_DATA: SvpGradeData = {
  gradeLabel: '4. Ročník',
  gradeCode: 'ROB 4',
  totalHours: 66,
  blocks: [
    {
      id: 'rob4-b1',
      topic: '1. Robotické mechanismy a manipulační technika',
      hours: 28,
      crossThemes: ['PT - IKT', 'PT - ČSP'],
      outcomes: [
        'navrhne funkční mechanické uspořádání robotického ramene nebo manipulátoru',
        'naprogramuje přesné polohování motorů s využitím zpětné vazby',
        'implementuje sekvenci pro bezpečné uchopení, přemístění a odložení břemene',
        'zkombinuje senzory pro autonomní manipulaci a třídění objektů v prostoru'
      ],
      content: [
        'Mechanické konstrukce v robotice: převody, pákové mechanismy, stabilita konstrukce',
        'Inteligentní servopohony s polohovou zpětnou vazbou a čtením provozních veličin (úhel, moment)',
        'Návrh a programování víceosých ramen a úchopových hlavic (chapadla, kleště)',
        'Prostorová senzorika: přesné měření vzdáleností laserovými senzory, optická detekce přítomnosti a barvy břemene',
        'Algoritmy manipulace: uchopení, zvednutí, přemístění na cílové souřadnice a uvolnění břemene'
      ]
    },
    {
      id: 'rob4-b2',
      topic: '2. Průmyslová robotika a víceosé manipulátory',
      hours: 12,
      crossThemes: ['PT - ČSP', 'PT - IKT'],
      outcomes: [
        'vysvětlí a striktně dodržuje zásady bezpečného provozu průmyslového robotického pracoviště',
        'manuálně navádí rameno manipulátoru pomocí ovládacího panelu v osách i kartézském prostoru',
        'definuje a uloží prostorové body manipulační trajektorie metodou Teach-In',
        'sestaví a otestuje automatizovaný cyklus přemístění součástky mezi pracovními pozicemi'
      ],
      content: [
        'Průmyslové robotické systémy: bezpečnost provozu, ochranné zóny a obvody nouzového zastavení (E-STOP)',
        'Kinematika 6-osého kloubového manipulátoru, stupně volnosti, pracovní obálka',
        'Obslužný terminál (panel ručního navádění), ruční pojezd v kloubových osách',
        'Kartézské souřadnicové systémy (bázový a nástrojový systém WORLD a TOOL)',
        'Programování trajektorií metodou Teach-In: bod-bod (PTP) a lineární pohyb (LIN)',
        'Realizace průmyslového cyklu manipulace s materiálem (Pick & Place)'
      ]
    },
    {
      id: 'rob4-b3',
      topic: '3. Projekt',
      hours: 26,
      crossThemes: ['PT - ČSP', 'PT - IKT'],
      outcomes: [
        'samostatně nebo v týmu zrealizuje ucelené robotické nebo automatizační zařízení',
        'aplikuje osvojené programátorské dovednosti při řešení reálného technického problému',
        'vede přehlednou technickou dokumentaci a zdůvodní zvolená řešení',
        'srozumitelně prezentuje a prakticky obhájí své dílo před publikem'
      ],
      content: [
        'Stanovení technických požadavků, dekompozice zadání a harmonogram realizace',
        'Samostatná nebo týmová práce: volba technologické platformy a hardwaru',
        'Vývoj a ladění řídicího softwaru v textovém programovacím jazyce Python',
        'Systémová integrace mechanických, elektronických a softwarových prvků',
        'Testování za mezních podmínek, optimalizace a odstraňování chyb',
        'Zpracování technické zprávy a uživatelské dokumentace',
        'Veřejná prezentace, praktická funkční demonstrace a obhajoba výsledku'
      ]
    }
  ]
};
