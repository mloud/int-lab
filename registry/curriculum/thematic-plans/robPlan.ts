import { ThematicPlan } from './thematicPlanTypes';

// =========================================================================
// 3. ROČNÍK: ROBOTIKA 1 (ROB 3 – 66 HODIN, 33 TÝDNŮ × 2 H TÝDNĚ)
// 3 ucelené tematické celky
// =========================================================================
export const ROB3_THEMATIC_PLAN: ThematicPlan = {
  subjectId: 'rob3',
  subjectTitle: 'Robotika 1',
  gradeLabel: '3. Ročník SŠ',
  grade: 3,
  totalHours: 66,
  weeksCount: 33,
  weeklyHours: 2,
  academicYear: '2026/2027',
  fieldCode: '18-20-M/01',
  fieldTitle: 'Informační technologie',
  blocks: [
    {
      id: 'rob3-b1',
      order: 1,
      month: 'Září – Říjen',
      monthKey: 'zari',
      weeks: '1.–6. týden',
      title: '1. Mikrokontroléry a internet věcí',
      hours: 12,
      theoryHours: 3,
      practiceHours: 9,
      description: 'Základy programování mikrokontroléru BBC micro:bit v2 v Pythonu, GPIO piny, senzory prostředí, OLED displej a přenos telemetrických dat na web.',
      rvpCompetence: 'Naprogramuje mikrokontrolér v textovém jazyce, zpracuje data ze senzorů a přenese je do webového prostředí.',
      subtopics: [
        {
          id: 'rob3-b1-1',
          title: 'Architektura micro:bit v2, vývojové prostředí v Pythonu',
          hours: 2,
          type: 'kombinovane',
          description: 'Vývojové prostředí, nahrání kódu, 5x5 LED matice, tlačítka A/B v Pythonu.',
          practice: 'Zprovoznění editoru, první skript v Pythonu, reakce na stisk tlačítek.',
          route: '/specializovana/robotika-3/iot/gpio'
        },
        {
          id: 'rob3-b1-2',
          title: 'GPIO piny, digitální výstupy a čtení tlačítek',
          hours: 2,
          type: 'laborator',
          description: 'Logické úrovně 3.3V, vstupy a výstupy, ovládání externích LED a tlačítek.',
          practice: 'Zapojení obvodu na nepájivém poli a softwarové ošetření zámitu tlačítka.',
          route: '/specializovana/robotika-3/iot/gpio'
        },
        {
          id: 'rob3-b1-3',
          title: 'Analogové vstupy a vzorkování senzorů prostředí',
          hours: 2,
          type: 'laborator',
          description: 'A/D převodník, fotorezistor, teplotní čidlo a snímání fyzikálních veličin.',
          practice: 'Kalibrace prahů osvětlení a výpočet reálné teploty v °C.',
          route: '/specializovana/robotika-3/iot/senzory'
        },
        {
          id: 'rob3-b1-4',
          title: 'Zapojení OLED displeje SSD1306 a zobrazení hodnot',
          hours: 2,
          type: 'laborator',
          description: 'Sériová sběrnice I2C, adresace displeje a vykreslování textu i grafiky.',
          practice: 'Vytvoření lokálního stavového dashboardu na OLED displeji.',
          route: '/specializovana/robotika-3/iot/oled'
        },
        {
          id: 'rob3-b1-5',
          title: 'Řízení akčních členů a relé podle limitů senzorů',
          hours: 2,
          type: 'laborator',
          description: 'Spínání zátěže reléovým modulem na základě překročení nastaveného prahu.',
          practice: 'Automatický termostat: sepnutí ventilátoru/indikátoru při překročení limitu.',
          route: '/specializovana/robotika-3/iot/oled'
        },
        {
          id: 'rob3-b1-6',
          title: 'Odesílání telemetrických dat do sítě / webový dashboard',
          hours: 2,
          type: 'laborator',
          description: 'Přenos naměřených údajů přes síťové rozhraní / sériovou linku na webový dashboard.',
          practice: 'Živá vizualizace grafu teploty a vlhkosti ve webovém prohlížeči.',
          route: '/specializovana/robotika-3/iot/web'
        }
      ]
    },
    {
      id: 'rob3-b2',
      order: 2,
      month: 'Listopad – Prosinec',
      monthKey: 'listopad',
      weeks: '7.–12. týden',
      title: '2. Autonomní mobilní podvozky',
      hours: 12,
      theoryHours: 3,
      practiceHours: 9,
      description: 'Řízení pohonů diferenciálního podvozku Cutebot, ultrazvukové měření vzdálenosti, sledování vodicí linie a autonomní chování.',
      rvpCompetence: 'Vytvoří řídicí algoritmy pro autonomní pohyb kolového podvozku, vyhýbání se překážkám a sledování linie.',
      subtopics: [
        {
          id: 'rob3-b2-1',
          title: 'Konstrukce Cutebota a řízení DC motorů v Pythonu',
          hours: 2,
          type: 'laborator',
          description: 'Zapojení mikrokontroléru do podvozku, ovládání motorů a základní manévry.',
          practice: 'Jízda vpřed, vzad a kalibrace přímého směru (motor trim).',
          route: '/specializovana/robotika-3/cutebot/motory'
        },
        {
          id: 'rob3-b2-2',
          title: 'Regulace rychlosti a přesné zatáčení na ploše',
          hours: 2,
          type: 'laborator',
          description: 'PWM střída motorů, plynulé oblouky a otočka na místě.',
          practice: 'Projetí přesného čtverce a osmičky na podlaze učebny.',
          route: '/specializovana/robotika-3/cutebot/motory'
        },
        {
          id: 'rob3-b2-3',
          title: 'Měření vzdálenosti ultrazvukem a bezpečné zastavení',
          hours: 2,
          type: 'laborator',
          description: 'Ultrazvukový senzor Sonar, výpočet vzdálenosti v cm a detekce stěny.',
          practice: 'Parkovací asistent: plynulé zpomalení a zastavení 15 cm před překážkou.',
          route: '/specializovana/robotika-3/cutebot/ultrazvuk'
        },
        {
          id: 'rob3-b2-4',
          title: 'Detekce a objíždění překážek v prostoru',
          hours: 2,
          type: 'laborator',
          description: 'Algoritmus pro detekci překážky, vycouvání a nalezení volného směru.',
          practice: 'Autonomní jízda v místnosti s náhodně rozmístěnými překážkami.',
          route: '/specializovana/robotika-3/cutebot/bludiste'
        },
        {
          id: 'rob3-b2-5',
          title: 'Princip infračervených podvozkových senzorů',
          hours: 2,
          type: 'laborator',
          description: 'Odrazivost IR světla od světlého a tmavého povrchu, kalibrace prahů.',
          practice: 'Testování čtení bílého papíru a černé pásky pod koly.',
          route: '/specializovana/robotika-3/cutebot/cara'
        },
        {
          id: 'rob3-b2-6',
          title: 'Algoritmus sledování černé vodicí linie (Line Tracking)',
          hours: 2,
          type: 'laborator',
          description: 'Stavové řízení pro udržení na černé čáře a zvládnutí ostrých zatáček.',
          practice: 'Kompletní projetí uzavřeného oválu po černé čáře na čas.',
          route: '/specializovana/robotika-3/cutebot/cara'
        }
      ]
    },
    {
      id: 'rob3-b3',
      order: 3,
      month: 'Leden – Červen',
      monthKey: 'leden',
      weeks: '13.–33. týden',
      title: '3. Pokročilá mobilní robotika a počítačové vidění',
      hours: 42,
      theoryHours: 8,
      practiceHours: 34,
      description: 'Kinematika všesměrového podvozku VEX AIM, AI Vision kamera, rozpoznávání AprilTags a herních objektů, magnetická manipulace a autonomní arénová strategie.',
      rvpCompetence: 'Implementuje prvky počítačového vidění, orientaci v prostoru a navrhne autonomní strategii pro robotickou arénu.',
      subtopics: [
        {
          id: 'rob3-b3-1',
          title: 'Seznámení s VEX AIM a prostředí VEXcode Python',
          hours: 2,
          type: 'kombinovane',
          description: 'Architektura VEX AIM, řídicí systém, nahrávání Python skriptů.',
          practice: 'První program, testování motorů a stavové LED.',
          route: '/specializovana/robotika-3/vex-aim/kinematika'
        },
        {
          id: 'rob3-b3-2',
          title: 'Kinematika 3-motorového podvozku a Omni kol',
          hours: 2,
          type: 'laborator',
          description: 'Všesměrová Omni kola, princip holonomního pohybu bez otáčení šasi.',
          practice: 'Jízda kolmo do stran (strafe) a diagonální pohyb po ploše.',
          route: '/specializovana/robotika-3/vex-aim/kinematika'
        },
        {
          id: 'rob3-b3-3',
          title: 'Plynulý všesměrový pohyb a rotace na místě',
          hours: 2,
          type: 'laborator',
          description: 'Kombinace translace a rotace v reálném čase.',
          practice: 'Objíždění překážky v kruhu při stálém čelním pohledu do středu.',
          route: '/specializovana/robotika-3/vex-aim/kinematika'
        },
        {
          id: 'rob3-b3-4',
          title: 'AI Vision kamera: zorné pole a princip detekce scény',
          hours: 2,
          type: 'laborator',
          description: 'Kamera jako senzor, snímková frekvence, rozlišení a zorné pole.',
          practice: 'Živý náhled z kamery a testování detekce v různých světelných podmínkách.',
          route: '/specializovana/robotika-3/vex-aim/kamera'
        },
        {
          id: 'rob3-b3-5',
          title: 'Čtení AprilTags pozičních značek na mantinelech arény',
          hours: 2,
          type: 'laborator',
          description: 'Fiducial značky AprilTags, rozpoznání ID stěny pro prostorovou lokalizaci.',
          practice: 'Detekce značek na obvodu arény a výpis jejich ID na displej.',
          route: '/specializovana/robotika-3/vex-aim/kamera'
        },
        {
          id: 'rob3-b3-6',
          title: 'Určení vzdálenosti od mantinelu a bezpečné manévry',
          hours: 2,
          type: 'laborator',
          description: 'Odhad vzdálenosti podle velikosti značky v obraze a včasný úhyb.',
          practice: 'Automatické přibrzdění a odklon od mantinelu při přiblížení na 20 cm.',
          route: '/specializovana/robotika-3/vex-aim/kamera'
        },
        {
          id: 'rob3-b3-7',
          title: 'Detekce herních sudů a míčků podle barevných podpisů',
          hours: 2,
          type: 'laborator',
          description: 'Konfigurace barevných podpisů (Color Signatures) pro herní prvky.',
          practice: 'Kalibrace kamery na oranžové a modré herní sudy.',
          route: '/specializovana/robotika-3/vex-aim/objekty'
        },
        {
          id: 'rob3-b3-8',
          title: 'Automatické navedení robota k rozpoznanému objektu',
          hours: 2,
          type: 'laborator',
          description: 'Visual tracking: výpočet odchylky středu cíle a plynulé navádění.',
          practice: 'Autonomní dojezd k náhodně položenému hernímu sudu v aréně.',
          route: '/specializovana/robotika-3/vex-aim/objekty'
        },
        {
          id: 'rob3-b3-9',
          title: 'Řízení magnetického záchytu herního předmětu',
          hours: 2,
          type: 'laborator',
          description: 'Aktivace permanentního elektromagnetu na čele pro spolehlivý úchop.',
          practice: 'Nájezd na předmět s kovovým jádrem a jeho bezpečný transport.',
          route: '/specializovana/robotika-3/vex-aim/objekty'
        },
        {
          id: 'rob3-b3-10',
          title: 'Mechanický vykopávač (kicker) a odložení předmětu',
          hours: 2,
          type: 'laborator',
          description: 'Programové spuštění vykopávače pro odhození břemene do cílové branky.',
          practice: 'Přesun sudu k cílové zóně a přesné vystřelení kickerem.',
          route: '/specializovana/robotika-3/vex-aim/kicker'
        },
        {
          id: 'rob3-b3-11',
          title: 'Využití gyroskopu a akcelerometru pro prostorovou stabilitu',
          hours: 2,
          type: 'laborator',
          description: 'Integrovaný gyroskop pro kompenzaci prokluzu kol a akcelerometr.',
          practice: 'Jízda v přesně přímé linii přes celou délku arény bez odchylky kurzu.',
          route: '/specializovana/robotika-3/vex-aim/arena'
        },
        {
          id: 'rob3-b3-12',
          title: 'Algoritmus pro kombinaci detekce mantinelů a objektů',
          hours: 2,
          type: 'laborator',
          description: 'Fúze vizuálních dat: souběžné sledování polohy herních prvků i mantinelů.',
          practice: 'Vyhledávání prvků bez nárazu do stěn arény.',
          route: '/specializovana/robotika-3/vex-aim/arena'
        },
        {
          id: 'rob3-b3-13',
          title: 'Strategie vyhledání, sebrání a transportu puků/sudů',
          hours: 2,
          type: 'laborator',
          description: 'Tvorba herního automatu pro autonomní cyklus sběru a ukládání prvků.',
          practice: 'Testování sběru 3 herních prvků za sebou.',
          route: '/specializovana/robotika-3/vex-aim/arena'
        },
        {
          id: 'rob3-b3-14',
          title: 'Ladění a optimalizace času průjezdu herního pole',
          hours: 2,
          type: 'laborator',
          description: 'Optimalizace rychlosti přesunů a zkrácení doby hledání cílů.',
          practice: 'Časovka v aréně: sebrání a doručení prvků v co nejkratším čase.',
          route: '/specializovana/robotika-3/vex-aim/arena'
        },
        {
          id: 'rob3-b3-15',
          title: 'Komplexní autonomní mise v aréně na čas',
          hours: 6,
          type: 'projekt',
          description: 'Plně autonomní turnajová výzva na hřišti VEX AIM bez zásahu operátora.',
          practice: 'Příprava týmových strategií a ladění spolehlivosti kódu.',
          route: '/specializovana/robotika-3/vex-aim/arena'
        },
        {
          id: 'rob3-b3-16',
          title: 'Soutěžní jízdy a testování spolehlivosti kódu',
          hours: 4,
          type: 'projekt',
          description: 'Měřené soutěžní jízdy robotů, opakovatelnost a vyhodnocení bodů.',
          practice: 'Turnaj v aréně a odstraňování chyb při neočekávaných situacích.',
          route: '/specializovana/robotika-3/vex-aim/arena'
        },
        {
          id: 'rob3-b3-17',
          title: 'Vyhodnocení autonomní strategie a uzavření ročníku',
          hours: 4,
          type: 'kombinovane',
          description: 'Závěrečná reflexe, rozbor strategií jednotlivých týmů a hodnocení.',
          practice: 'Prezentace dosažených výsledků a zhodnocení posunu v programování.',
          route: '/specializovana/robotika-3/vex-aim/arena'
        }
      ]
    }
  ]
};

// =========================================================================
// 4. ROČNÍK: ROBOTIKA 2 (ROB 4 – 66 HODIN, 33 TÝDNŮ × 2 H TÝDNĚ)
// 3 ucelené tematické celky
// =========================================================================
export const ROB4_THEMATIC_PLAN: ThematicPlan = {
  subjectId: 'rob4',
  subjectTitle: 'Robotika 2',
  gradeLabel: '4. Ročník SŠ',
  grade: 4,
  totalHours: 66,
  weeksCount: 33,
  weeklyHours: 2,
  academicYear: '2026/2027',
  fieldCode: '18-20-M/01',
  fieldTitle: 'Informační technologie',
  blocks: [
    {
      id: 'rob4-b1',
      order: 1,
      month: 'Září – Leden',
      monthKey: 'zari',
      weeks: '1.–14. týden',
      title: '1. Robotické mechanismy a manipulační technika',
      hours: 28,
      theoryHours: 6,
      practiceHours: 22,
      description: 'Konstrukce robotických mechanismů, Smart Motory VEX IQ s polohovou zpětnou vazbou, laserové dálkoměry ToF, motorizovaná chapadla a prostorová manipulace.',
      rvpCompetence: 'Sestaví a naprogramuje motorizované manipulační mechanismy pro bezpečné přemístění břemen v prostoru.',
      subtopics: [
        {
          id: 'rob4-b1-1',
          title: 'Architektura VEX IQ Brain 2nd Gen a Smart Motory',
          hours: 2,
          type: 'kombinovane',
          description: 'Mozek VEX IQ, Smart Porty, baterie a propojení s VEXcode Python.',
          practice: 'Zprovoznění komunikačního rozhraní a nahrání testovacího skriptu.',
          route: '/specializovana/robotika-4/vex-iq/motory'
        },
        {
          id: 'rob4-b1-2',
          title: 'Sestavení základní mechaniky a převodových poměrů',
          hours: 2,
          type: 'laborator',
          description: 'Stavba podvozku a převodových mechanismů, vztah otáček a síly.',
          practice: 'Konstrukce ozubených převodů do rychlosti a do síly.',
          route: '/specializovana/robotika-4/vex-iq/motory'
        },
        {
          id: 'rob4-b1-3',
          title: 'Programování motorů s využitím enkodérů (úhel, otáčky)',
          hours: 2,
          type: 'laborator',
          description: 'Metody spin_for, otáčení o přesný úhel ve stupních a čtení zátěže.',
          practice: 'Přesné polohování nápravy s kontrolou zastavení na značce.',
          route: '/specializovana/robotika-4/vex-iq/motory'
        },
        {
          id: 'rob4-b1-4',
          title: 'Přesný pojezd a měření ujeté dráhy v milimetrech',
          hours: 2,
          type: 'laborator',
          description: 'Objekt Drivetrain, jízda na přesnou vzdálenost v mm a otáčení o stupně.',
          practice: 'Projetí vyznačeného polygonu s minimální odchylkou.',
          route: '/specializovana/robotika-4/vex-iq/motory'
        },
        {
          id: 'rob4-b1-5',
          title: 'Laserový dálkoměr ToF: měření vzdálenosti a velikosti',
          hours: 2,
          type: 'laborator',
          description: 'Class 1 laserový senzor vzdálenosti, měření 20-2000 mm a odhad velikosti.',
          practice: 'Klasifikace břemen na small/medium/large a bezpečný příjezd.',
          route: '/specializovana/robotika-4/vex-iq/senzory'
        },
        {
          id: 'rob4-b1-6',
          title: 'Optický senzor barev a detekce předmětů',
          hours: 2,
          type: 'laborator',
          description: 'Optický senzor VEX IQ, odstín (hue) a detekce přiblížení břemene.',
          practice: 'Rozpoznání barvy herní kostky před zahájením manipulace.',
          route: '/specializovana/robotika-4/vex-iq/senzory'
        },
        {
          id: 'rob4-b1-7',
          title: 'Konstrukce motorizovaného chapadla (Clawbot)',
          hours: 2,
          type: 'laborator',
          description: 'Mechanismus kleští a ramínka pro úchop herní kostky.',
          practice: 'Montáž a mechanické seřízení stisku kleští.',
          route: '/specializovana/robotika-4/vex-iq/chapadlo'
        },
        {
          id: 'rob4-b1-8',
          title: 'Programování úchopu a zdvihu břemene v prostoru',
          hours: 2,
          type: 'laborator',
          description: 'Synchronizace motoru pojezdu a zvedacího ramene pro stabilní transport.',
          practice: 'Plynulý zdvih kostky bez převrácení podvozku.',
          route: '/specializovana/robotika-4/vex-iq/chapadlo'
        },
        {
          id: 'rob4-b1-9',
          title: 'Přesun břemene z bodu A do bodu B na zadanou vzdálenost',
          hours: 4,
          type: 'laborator',
          description: 'Autonomní cyklus: dojezd k předmětu, sevření kleští, odvoz a uložení.',
          practice: 'Automatizované přemístění nákladu mezi dvěma stanovišti.',
          route: '/specializovana/robotika-4/vex-iq/manipulace'
        },
        {
          id: 'rob4-b1-10',
          title: 'Třídění předmětů podle barev a velikosti',
          hours: 4,
          type: 'laborator',
          description: 'Senzorické třídění kostek do různých zón podle naměřených dat.',
          practice: 'Autonomní rozdělení červených a modrých kostek do skladových boxů.',
          route: '/specializovana/robotika-4/vex-iq/manipulace'
        },
        {
          id: 'rob4-b1-11',
          title: 'Řešení komplexní manipulační úlohy v týmu',
          hours: 4,
          type: 'laborator',
          description: 'Týmová výzva: vyčištění herního pole od rozesetých břemen na čas.',
          practice: 'Soutěž týmů v efektivitě manipulace a spolehlivosti úchopu.',
          route: '/specializovana/robotika-4/vex-iq/manipulace'
        }
      ]
    },
    {
      id: 'rob4-b2',
      order: 2,
      month: 'Únor – Březen',
      monthKey: 'unor',
      weeks: '15.–20. týden',
      title: '2. Průmyslová robotika a víceosé manipulátory',
      hours: 12,
      theoryHours: 3,
      practiceHours: 9,
      description: 'Bezpečnost průmyslových pracovišť, 6-osé rameno KUKA, obsluha ovládacího panelu smartPAD, kartézské souřadnice, Teach-In body a Pick & Place cyklus.',
      rvpCompetence: 'Objasní principy průmyslové robotiky, bezpečně navede manipulátor a naprogramuje manipulační cyklus.',
      subtopics: [
        {
          id: 'rob4-b2-1',
          title: 'Bezpečnost práce, ochranné zóny a nouzové zastavení E-STOP',
          hours: 2,
          type: 'kombinovane',
          description: 'Zásady bezpečnosti u průmyslových manipulátorů, souhlasný spínač, E-Stop okruhy.',
          practice: 'Praktické vyzkoušení bezpečnostních prvků a zastavení stroje.',
          route: '/specializovana/robotika-4/kuka/bezpecnost'
        },
        {
          id: 'rob4-b2-2',
          title: 'smartPAD ovládací panel a Jogging v osách A1–A6',
          hours: 2,
          type: 'laborator',
          description: 'Ruční pojezd jednotlivými rotačními osami ramene, regulace rychlosti.',
          practice: 'Individuální nácvik bezpečného pojezdu v kloubových osách A1–A6.',
          route: '/specializovana/robotika-4/kuka/smartpad'
        },
        {
          id: 'rob4-b2-3',
          title: 'Kartézské souřadné systémy WORLD a TOOL',
          hours: 2,
          type: 'laborator',
          description: 'Pohyb v prostoru X, Y, Z, bázový systém WORLD a nástrojový bod TOOL.',
          practice: 'Pojezd ramenem podél kartézských os rovnoběžně s pracovní deskou.',
          route: '/specializovana/robotika-4/kuka/souradnice'
        },
        {
          id: 'rob4-b2-4',
          title: 'Ukládání bodů metodou Teach-In a pohyby PTP a LIN',
          hours: 2,
          type: 'laborator',
          description: 'Záznam prostorových bodů, bod-bod (PTP) a lineární pohyb (LIN).',
          practice: 'Naučení 4 bodů prostorové trajektorie a jejich automatické projetí.',
          route: '/specializovana/robotika-4/kuka/teachin'
        },
        {
          id: 'rob4-b2-5',
          title: 'Sestavení manipulačního cyklu Pick & Place',
          hours: 2,
          type: 'laborator',
          description: 'Sestavení kompletního programu přemístění součástky z pozice A do pozice B.',
          practice: 'Uchopení součástky, bezpečný přejezd a uložení na cílovou paletku.',
          route: '/specializovana/robotika-4/kuka/pickplace'
        },
        {
          id: 'rob4-b2-6',
          title: 'Samostatné zvládnutí a odzkoušení celého cyklu',
          hours: 2,
          type: 'laborator',
          description: 'Ověření samostatné bezpečné obsluhy každým žákem a ladění trajektorie.',
          practice: 'Praktické přezkoušení: samostatné najetí a spuštění cyklu Pick & Place.',
          route: '/specializovana/robotika-4/kuka/pickplace'
        }
      ]
    },
    {
      id: 'rob4-b3',
      order: 3,
      month: 'Duben – Červen',
      monthKey: 'duben',
      weeks: '21.–33. týden',
      title: '3. Projekt',
      hours: 26,
      theoryHours: 2,
      practiceHours: 24,
      description: 'Samostatná nebo týmová realizace komplexního robotického nebo automatizačního zařízení na zvolené platformě a závěrečná obhajoba.',
      rvpCompetence: 'Samostatně nebo v týmu zrealizuje a odborně obhájí ucelený inženýrský projekt.',
      subtopics: [
        {
          id: 'rob4-b3-1',
          title: 'Volba zadání, analýza problému a rozvržení etap',
          hours: 4,
          type: 'projekt',
          description: 'Výběr technologické platformy, specifikace požadavků a plán milníků.',
          practice: 'Konzultace zadání projektu a sestavení úvodního technického návrhu.',
          route: '/specializovana/robotika-4/projekt/zadani'
        },
        {
          id: 'rob4-b3-2',
          title: 'Týmový vývoj a programování řídicího systému v Pythonu',
          hours: 8,
          type: 'projekt',
          description: 'Stavba konstrukce nebo buňky, vývoj řídicího softwaru v Pythonu.',
          practice: 'Programování algoritmů, obsluha senzorů a řízení pohonů.',
          route: '/specializovana/robotika-4/projekt/vyvoj'
        },
        {
          id: 'rob4-b3-3',
          title: 'Systémová integrace senzorů, pohonů a testování',
          hours: 6,
          type: 'projekt',
          description: 'Propojení celého systému, testování mezních stavů a ladění chyb.',
          practice: 'Zátěžové testování, optimalizace chování a ošetření výjimek.',
          route: '/specializovana/robotika-4/projekt/testovani'
        },
        {
          id: 'rob4-b3-4',
          title: 'Dokončení, optimalizace a příprava demonstrace',
          hours: 4,
          type: 'projekt',
          description: 'Optimalizace funkčnosti celého zařízení, finální ladění algoritmů a příprava na předvedení.',
          practice: 'Komplexní zkouška chování zařízení a příprava praktického předvedení.',
          route: '/specializovana/robotika-4/projekt/obhajoba'
        },
        {
          id: 'rob4-b3-5',
          title: 'Závěrečná veřejná prezentace a praktická obhajoba',
          hours: 4,
          type: 'kombinovane',
          description: 'Živá demonstrace funkčnosti projektu, odborná obhajoba a hodnocení.',
          practice: 'Prezentace před komisí a spolužáky, praktická ukázka a diskuse.',
          route: '/specializovana/robotika-4/projekt/obhajoba'
        }
      ]
    }
  ]
};
