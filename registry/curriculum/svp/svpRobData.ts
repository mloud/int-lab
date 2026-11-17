import { SvpGradeData, SvpSharedInfo } from './svpTypes';

// -------------------------------------------------------------------------
// SPOLEČNÁ ČÁST PŘEDMĚTU PRO INSPIS – ROBOTIKA (3. A 4. ROČNÍK)
// -------------------------------------------------------------------------
export const SVP_ROB_SHARED_INFO: SvpSharedInfo = {
  subjectName: 'Robotika a vestavěné systémy',
  fieldCode: '18-20-M/01',
  fieldName: 'Informační technologie',
  evaluation:
    'Hodnocení je praktické a formativní. Hodnotí se funkčnost naprogramovaného embedded kódu, ' +
    'schopnost odladit hardwarové chyby a šum senzorů, robustnost řídicích algoritmů a samostatnost v laboratorních úlohách. ' +
    'Ve vyšším ročníku je hodnocení doplněno o obhajoby inženýrských výzev a týmového maturitního projektu.',
  keyCompetencies: [
    {
      title: 'Kompetence k řešení problémů',
      description:
        'Žák identifikuje fyzikální příčiny chyb (šum senzoru, prokluz kol, kolísání napětí baterie) a navrhuje softwarová kompenzační opatření. ' +
        'Aplikuje deterministické řízení pomocí stavových automatů a spojitou regulaci pro plynulý pohyb po trase. ' +
        'Ve 4. ročníku aplikuje vektorovou matematiku, inverzní kinematiku a počítačové vidění pro koordinovaný pohyb systémů.'
    },
    {
      title: 'Digitální a pracovní kompetence',
      description:
        'Bezpečně pracuje s mechatronickými stavebnicemi, senzory, motory a napájecími akumulátory. ' +
        'Efektivně využívá vývojová prostředí pro vestavné systémy (MicroPython, Python 3, sériová konzole REPL, robotické simulátory).'
    },
    {
      title: 'Komunikativní a kooperativní kompetence',
      description:
        'Efektivně pracuje v interdisciplinárním projektovém týmu, definuje komunikační protokoly a rozhraní modulů. ' +
        'Odborně prezentuje a argumentačně obhajuje své technické řešení před publikem a dodržuje pravidla bezpečnosti práce.'
    }
  ],
  crossCuttingThemes: [
    {
      code: 'PT - ČSP',
      name: 'Člověk a svět práce',
      description: 'Profesní návyky vývojáře vestavných systémů, preciznost zapojení, bezpečnostní normy Průmyslu 4.0 a týmová práce.'
    },
    {
      code: 'PT - ČDS',
      name: 'Člověk a digitální svět',
      description: 'Internet věcí (IoT), telemetrie, bezdrátové přenosy dat, umělá inteligence, počítačové vidění a autonomní logistika.'
    }
  ],
  interdisciplinaryRelations:
    'Předmět úzce propojuje znalosti z Programování (jazyk Python, OOP, algoritmizace), ' +
    'Hardwaru (elektrické obvody, GPIO, logické úrovně, sběrnice I2C), ' +
    'Matematiky a fyziky (goniometrie, vektorová algebra, mechanika, kinematika, elektromagnetismus).'
};

// -------------------------------------------------------------------------
// 3. ROČNÍK: ROBOTIKA 1 (ROB 3 – 66 HODIN)
// -------------------------------------------------------------------------
export const SVP_ROB3_DATA: SvpGradeData = {
  gradeLabel: '3. Ročník',
  gradeCode: 'ROB 3',
  totalHours: 66,
  blocks: [
    {
      id: 'rob3-b1',
      topic: '1. Architektura MCU a digitální GPIO',
      hours: 10,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'popíše architekturu jednočipového mikrokontroléru a porovná jej s univerzálním počítačem',
        'bezpečně zapojuje periferie na GPIO piny mikrokontroléru',
        'vytváří neblokující řídicí kód v MicroPythonu s využitím časových čítačů namísto blokujících prodlev',
        'navrhuje a implementuje stavové automaty (FSM) pro deterministické řízení logiky vestavného systému'
      ],
      content: [
        'Architektura mikrokontroléru (jádro ARM Cortex-M4, paměť Flash a RAM, taktovací frekvence, spotřeba)',
        'Digitální vstupy a výstupy GPIO (logické úrovně, pull-up / pull-down rezistory, ochrana pinů)',
        'Časování a neblokující architektura (funkce ticks_ms(), periodické obslužné smyčky namísto sleep())',
        'Deterministické řízení (koncept konečného stavového automatu FSM, stavy, přechody a události)'
      ]
    },
    {
      id: 'rob3-b2',
      topic: '2. Senzorika, ADC a sběrnice I2C',
      hours: 14,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'vysvětlí princip převodu spojitého analogového signálu do digitální podoby (ADC převodník)',
        'připojuje a programově obsluhuje senzory fyzikálních veličin na sběrnici I2C',
        'navrhuje algoritmy pro softwarové filtrování šumu a kompenzaci kolísání měřených hodnot',
        'aplikuje hysterezi pro stabilní rozhodování v hraničních stavech'
      ],
      content: [
        'Analogový signál a ADC (vzorkování napětí, rozlišení převodníku, kvantování)',
        'Sériová sběrnice I2C (adresace periferií na sběrnici, vodiče SDA/SCL, čtení registrů senzorů)',
        'Zpracování signálu (šum reálného světa, plovoucí průměr, dolní propust)',
        'Prahování a hystereze (eliminace kmitání stavu na rozhraní prahových hodnot světla a vzdálenosti)'
      ]
    },
    {
      id: 'rob3-b3',
      topic: '3. Pohony a diferenciální kinematika (Cutebot)',
      hours: 12,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'popíše funkci H-můstku a princip pulzně-šířkové modulace (PWM) pro řízení stejnosměrných motorů',
        'ovládá kinematiku dvoukolového diferenciálního podvozku',
        'provádí kalibraci mechanických nesouměrností pohonu pro dosažení přímého směru jízdy',
        'implementuje plynulý rozjezd, brzdění a přesné otáčení na místě'
      ],
      content: [
        'Řízení DC motorů (H-můstek, reverzace chodu, PWM střída a regulace rychlosti otáčení)',
        'Kinematika diferenciálního podvozku (rychlost levého a pravého kola, poloměr zatáčení, otáčení kolem středu)',
        'Hardwarová kalibrace (odchylky převodovek a motorů, trimování rychlostí pro přímou jízdu)',
        'Pohybové profily (proporcionální brzdění před překážkou, bezpečnostní zastavení)'
      ]
    },
    {
      id: 'rob3-b4',
      topic: '4. Autonomní navigace a regulační smyčky',
      hours: 18,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'navrhne algoritmus sledování vodicí linie pomocí pole infračervených odrazových senzorů',
        'porovná a vyhodnotí diskrétní skokové řízení (Bang-Bang) oproti spojité proporcionální regulaci (P/PD)',
        'řeší krizové situace na trase (ztráta linie, pravoúhlé odbočky, křižovatky)',
        'naprogramuje autonomní chování mobilního robota v aréně'
      ],
      content: [
        'Detekce vodicí čáry (reflexní optické senzory, kontrast povrchu, kalibrace černé a bílé)',
        'Regulační algoritmy (diskrétní Bang-Bang regulace vs. spojitý proporcionální P/PD regulátor)',
        'Zpracování regulační odchylky (výpočet chyby vystředění na čáře, dynamická korekce rychlostí motorů)',
        'Řešení křižovatek a rozhodovací logika autonomního robota v aréně (Sumo výzva)'
      ]
    },
    {
      id: 'rob3-b5',
      topic: '5. IoT a bezdrátová telemetrie (micro:bit Radio)',
      hours: 12,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'nakonfiguruje bezdrátovou síťovou komunikaci na frekvenci 2.4 GHz mezi mikrokontroléry',
        'sestavuje a parsuje síťové telemetrické pakety pro přenos dat v reálném čase',
        'vytvoří bezdrátový ovladač mobilního robota s využitím vestavěného akcelerometru',
        'zprovozní monitorovací dispečink zobrazující stav autonomních robotů v síti'
      ],
      content: [
        'Bezdrátový přenos dat (protokol micro:bit Radio, 2.4 GHz kanály, síťové skupiny)',
        'Struktura paketů (hlavička, identifikace odesílatele, datový náklad, parsování příkazů)',
        'Dálkové ovládání a interakce (využití vnitřního akcelerometru a gest pro řízení pohybu)',
        'Telemetrie a dispečink (sběr dat ze senzorů v reálném čase, diagnostika baterie a stavu robotů)'
      ]
    }
  ]
};

// -------------------------------------------------------------------------
// 4. ROČNÍK: ROBOTIKA 2 (ROB 4 – 66 HODIN)
// -------------------------------------------------------------------------
export const SVP_ROB4_DATA: SvpGradeData = {
  gradeLabel: '4. Ročník',
  gradeCode: 'ROB 4',
  totalHours: 66,
  blocks: [
    {
      id: 'rob4-b1',
      topic: '1. Všesměrová holonomní kinematika (VEX AIM)',
      hours: 14,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'vysvětlí princip a výhody holonomního (všesměrového) pohybu oproti podvozkům neholonomním',
        'provádí goniometrický rozklad sil a rychlostí pro řízení 3-kolového všesměrového podvozku (Omni wheels)',
        'programuje autonomní pohybové trajektorie v rovině s nezávislou orientací podvozku',
        'ovládá elektromagnetické a mechanické akční členy mobilního robota'
      ],
      content: [
        'Holonomní kinematika (omni-directional kola, srovnání s diferenciálním podvozkem)',
        'Vektorová matematika podvozku (goniometrický rozklad rychlostí na 3 motory pod úhlem 120°, nezávislá translace a rotace)',
        'Autonomní trajektorie (plynulé najíždění na souřadnice, vyhýbání se překážkám bez nutnosti otáčení)',
        'Akční členy v aréně (ovládání elektromagnetu pro manipulaci s objekty, mechanický vyhazovač/kicker)'
      ]
    },
    {
      id: 'rob4-b2',
      topic: '2. Počítačové vidění a AI navigace',
      hours: 14,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'integruje AI kameru jako senzor pro lokalizaci objektů v zorném poli',
        'aplikuje techniky počítačového vidění pro barevnou segmentaci a detekci tvarů',
        'využívá 2D poziční značky (AprilTags) pro přesné prostorové určení polohy robota v aréně',
        'implementuje algoritmy vizuálního navádění (Visual Servoing) pro sledování a dojíždění k pohybujícím se cílům'
      ],
      content: [
        'Architektura vizuálního senzoru (kamera jako inteligentní senzor, zorné pole, snímková frekvence)',
        'Barevná segmentace a klasifikace (barevné prostory HSV, prahování, nalezení těžiště objektu)',
        'Poziční značky AprilTags (princip 2D kódů, dekódování ID značky, výpočet vzdálenosti a úhlu natočení)',
        'Visual Servoing a herní strategie (algoritmy zpětnovazebního dojíždění k objektu, rozhodovací logika v reálném čase)'
      ]
    },
    {
      id: 'rob4-b3',
      topic: '3. Inženýrská mechanika a Smart motory (VEX IQ)',
      hours: 14,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'navrhuje mechanické ozubené převody pro optimalizaci rychlosti a točivého momentu',
        'využívá optické enkodéry Smart motorů pro odometrii a přesné odměřování ujeté vzdálenosti',
        'integruje vestavěný IMU gyroskop pro kompenzaci prokluzu kol a stabilizaci orientace',
        'konstruuje a programuje víceosé zdvihací a manipulační mechanismy'
      ],
      content: [
        'Mechanické převody v robotice (převodový poměr, točivý moment vs. úhlová rychlost, tření)',
        'Smart motory a enkodéry (měření úhlu natočení, odometrie, PID regulace polohy motoru)',
        'IMU jednotka a gyroskop (fúze dat, měření úhlové rychlosti, eliminace driftu podvozku)',
        'Zdvihací mechanismy (paralelogram, nůžkový mechanismus, lineární vedení a chapadla)'
      ]
    },
    {
      id: 'rob4-b4',
      topic: '4. Průmyslová robotika a manipulátory (KUKA EDU)',
      hours: 14,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'popíše kinematickou strukturu 6-osého průmyslového robotického ramene (6-DoF)',
        'orientuje se v souřadnicových systémech průmyslových manipulátorů (WORLD, BASE, TOOL / TCP)',
        'definuje a porovnává trajektorie pohybu z bodu do bodu (PTP) a lineární pohyby (LIN)',
        'vytváří, simuluje a ladí manipulační úlohy (Pick & Place) v robotickém simulátoru s následným přenosem na fyzický stroj'
      ],
      content: [
        'Kinematika 6-DoF ramen (stupně volnosti, dopředná a inverzní kinematika, singulární polohy)',
        'Kartézské souřadnicové systémy (bázový systém BASE, nástrojový systém TOOL/TCP, kalibrace hrotu nástroje)',
        'Řízení pohybu (interpolace PTP vs. lineární LIN, aproximace bodů, rychlostní a zrychlovací rampy)',
        'Offline programování a simulace (virtuální buňka v simulátoru, detekce kolizí, nahrání kódu do reálného KUKA kontroléru)'
      ]
    },
    {
      id: 'rob4-b5',
      topic: '5. Závěrečný komplexní kooperativní projekt',
      hours: 10,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'navrhne systémovou architekturu komplexní kooperativní výrobní linky',
        'integruje různorodý hardware (mobilní podvozky, senzorické stanice, průmyslové rameno) přes společné komunikační rozhraní',
        'provádí systematickou diagnostiku chybových stavů a ladění celku v reálném čase',
        'prezentuje a odborně obhájí realizované technické řešení'
      ],
      content: [
        'Návrh systémové architektury (specifikace rozhraní mezi mobilním robotem, KUKA ramenem a dispečinkem)',
        'Týmová integrace a ladění (koordinace předávání materiálu mezi mobilním robotem a manipulátorem)',
        'Zabezpečení buňky a ošetření chyb (nouzové zastavení, obnovení po výpadku, diagnostika)',
        'Technická dokumentace a odborná ústní obhajoba projektu'
      ]
    }
  ]
};
