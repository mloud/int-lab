import { ThematicPlan } from './thematicPlanTypes';

// =========================================================================
// 3. ROČNÍK: ROBOTIKA 1 (ROB 3 – 66 HODIN, 33 TÝDNŮ × 2 H TÝDNĚ)
// 10 tematických celků podle oficiálního ŠVP
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
      month: 'Září',
      monthKey: 'zari',
      weeks: '1. týden',
      title: '1. Úvod do robotiky',
      hours: 2,
      theoryHours: 1,
      practiceHours: 1,
      description: 'Definice robotiky, architektura robotických systémů (řídicí jednotka, senzory, pohony) a bezpečnost práce v laboratoři.',
      rvpCompetence: 'Rozliší typy robotů, popíše základní části systému a dodržuje pravidla bezpečnosti práce.',
      subtopics: [
        {
          id: 'rob3-b1-1',
          title: 'Robotické systémy a bezpečnost práce v laboratoři',
          hours: 2,
          type: 'kombinovane',
          description: 'Úvod do robotiky, typy robotů, základní komponenty (MCU, senzory, akční členy), bezpečnostní pravidla.',
          practice: 'Bezpečnostní instruktáž, prohlídka robotického vybavení laboratoře (micro:bit, Cutebot, KUKA, VEX).',
          route: '/specializovana/robotika-3'
        }
      ]
    },
    {
      id: 'rob3-b2',
      order: 2,
      month: 'Září – Říjen',
      monthKey: 'zari',
      weeks: '2.–7. týden',
      title: '2. Mikrokontroléry a programování robotických systémů',
      hours: 12,
      theoryHours: 3,
      practiceHours: 9,
      description: 'Základy programování mikrokontroléru BBC micro:bit v2 v MicroPythonu, GPIO piny, časování a stavový automat.',
      rvpCompetence: 'Ovládá práci s vývojovým prostředím mikrokontroléru v MicroPythonu a vytváří neblokující řídicí kód.',
      subtopics: [
        {
          id: 'rob3-b2-1',
          title: 'Úvod do MicroPythonu na micro:bit v2 a REPL konzole',
          hours: 2,
          type: 'laborator',
          description: 'Zprovoznění desky micro:bit v2, sériová konzole REPL v Pythonu, první programy s 5x5 LED maticí.',
          practice: 'Nahrání firmware, interaktivní práce v REPL konzoli, ošetření tlačítek A a B v kódu.',
          route: '/specializovana/robotika-3/mcu/uvod'
        },
        {
          id: 'rob3-b2-2',
          title: 'Digitální vstupy a výstupy GPIO',
          hours: 2,
          type: 'laborator',
          description: 'Logické úrovně (0 a 3.3V), pull-up/pull-down rezistory, zapojení externích tlačítek a LED.',
          practice: 'Čtení digitálních pinů, ovládání externích signálních LED a eliminace zákmitů kontaktů (debouncing).',
          route: '/specializovana/robotika-3/mcu/gpio'
        },
        {
          id: 'rob3-b2-3',
          title: 'Časování programu bez zpoždění: ticks_ms() vs. sleep()',
          hours: 4,
          type: 'laborator',
          description: 'Proč je sleep() v robotice nevhodný, neblokující měření uplynulého času přes ticks_ms a ticks_diff.',
          practice: 'Periodická obslužná smyčka – současné blikání LED s různou periodou a nepřetržité čtení tlačítek.',
          route: '/specializovana/robotika-3/mcu/casovani'
        },
        {
          id: 'rob3-b2-4',
          title: 'Konečný stavový automat (FSM) v Pythonu',
          hours: 4,
          type: 'laborator',
          description: 'Koncepce stavového automatu, stavy, přechody a události, deterministické řízení bez zablokování.',
          practice: 'Implementace inteligentního semaforu pro chodce s časováním a přepínáním stavů.',
          route: '/specializovana/robotika-3/mcu/fsm'
        }
      ]
    },
    {
      id: 'rob3-b3',
      order: 3,
      month: 'Říjen – Listopad',
      monthKey: 'rijen',
      weeks: '8.–12. týden',
      title: '3. Senzory a zpracování dat',
      hours: 10,
      theoryHours: 2,
      practiceHours: 8,
      description: 'Práce s analogovými a digitálními senzory, I2C sběrnice, OLED displej a softwarová filtrace šumu.',
      rvpCompetence: 'Připojí a programově obslouží senzory, načte naměřená data a aplikuje softwarovou filtraci šumu.',
      subtopics: [
        {
          id: 'rob3-b3-1',
          title: 'Sériová sběrnice I2C a grafický OLED displej SSD1306',
          hours: 2,
          type: 'laborator',
          description: 'Komunikační protokol I2C (vodiče SDA a SCL), adresace periferií, inicializace OLED displeje.',
          practice: 'Zapojení OLED displeje a výpis telemetrických údajů a grafických ikon v Pythonu.',
          route: '/specializovana/robotika-3/senzory/i2c'
        },
        {
          id: 'rob3-b3-2',
          title: 'Environmentální senzory z IoT sady (teplota, vlhkost, světlo)',
          hours: 4,
          type: 'laborator',
          description: 'Analogové a digitální snímání fyzikálních veličin, A/D převodník a kalibrace jednotek.',
          practice: 'Snímání teploty a intenzity světla, zobrazování naměřených hodnot v reálném čase na displeji.',
          route: '/specializovana/robotika-3/senzory/adc'
        },
        {
          id: 'rob3-b3-3',
          title: 'Fyzikální šum ze senzorů a plovoucí průměr',
          hours: 4,
          type: 'laborator',
          description: 'Proč senzory v reálném světě kmitají, plovoucí průměr (kruhový buffer) a hystereze při spínání.',
          practice: 'Naprogramování digitálního filtru v Pythonu – porovnání surových a vyhlazených dat na grafu.',
          route: '/specializovana/robotika-3/senzory/filtrace'
        }
      ]
    },
    {
      id: 'rob3-b4',
      order: 4,
      month: 'Listopad – Prosinec',
      monthKey: 'listopad',
      weeks: '13.–16. týden',
      title: '4. Řízení motorů a pohyb robotu',
      hours: 8,
      theoryHours: 2,
      practiceHours: 6,
      description: 'Pohony stejnosměrných motorů, PWM regulace, podvozek Cutebot, detekce překážek sonarem a sledování čáry.',
      rvpCompetence: 'Naprogramuje směr a rychlost robotického vozítka, využívá senzory pro detekci překážek a sledování trasy.',
      subtopics: [
        {
          id: 'rob3-b4-1',
          title: 'Řízení DC motorů přes PWM a kalibrace přímé jízdy Cutebota',
          hours: 2,
          type: 'laborator',
          description: 'H-můstek, reverzace otáček, PWM střída, rozdíly mezi motory a trimování přímé jízdy.',
          practice: 'Příkazy CuteBot Python API: rozjezd, plynulé brzdění, otočení na místě a seřízení rovné dráhy.',
          route: '/specializovana/robotika-3/cutebot/motory'
        },
        {
          id: 'rob3-b4-2',
          title: 'Ultrazvukový dálkoměr Sonar a bezpečnostní zónové brzdění',
          hours: 2,
          type: 'laborator',
          description: 'Princip sonaru (Trigger/Echo), měření vzdálenosti v cm, bezpečnostní zóny před překážkou.',
          practice: 'Parkovací asistent: plynulé zpomalování Cutebota před zdí a nouzové zastavení na 10 cm.',
          route: '/specializovana/robotika-3/cutebot/prekazky'
        },
        {
          id: 'rob3-b4-3',
          title: 'Sledování vodicí linie pomocí infračervených senzorů',
          hours: 4,
          type: 'laborator',
          description: 'Odrazové IR senzory, kontrast povrchu, dvoustavové řízení (Bang-Bang) a plynulá korekce.',
          practice: 'Programování autonomního sledování černé čáry na bílém podkladu v aréně.',
          route: '/specializovana/robotika-3/navigace/ir-senzory'
        }
      ]
    },
    {
      id: 'rob3-b5',
      order: 5,
      month: 'Prosinec – Leden',
      monthKey: 'prosinec',
      weeks: '17.–19. týden',
      title: '5. Autonomní robotika',
      hours: 6,
      theoryHours: 1,
      practiceHours: 5,
      description: 'Rozhodovací algoritmy autonomního chování, kombinace senzorů a řešení průjezdu bludištěm.',
      rvpCompetence: 'Navrhne algoritmus autonomního chování a optimalizuje reakci robota na překážky.',
      subtopics: [
        {
          id: 'rob3-b5-1',
          title: 'Rozhodovací logika autonomního robota (FSM v aréně)',
          hours: 2,
          type: 'laborator',
          description: 'Kombinace čidla čáry a sonaru do stavového automatu (hledání trasy vs. reakce na překážku).',
          practice: 'Implementace chování: jeď po čáře, při překážce zastav, objeď ji a vrať se zpět na čáru.',
          route: '/specializovana/robotika-3/navigace/krizovatky'
        },
        {
          id: 'rob3-b5-2',
          title: 'Mise v bludišti a optimalizace autonomního průjezdu',
          hours: 4,
          type: 'laborator',
          description: 'Algoritmy sledování stěny (Right-hand rule), řešení slepých uliček a analýza chyb navigace.',
          practice: 'Soutěžní průjezd neznámým bludištěm z krabic na čas a přesnost bez zásahu obsluhy.',
          route: '/specializovana/robotika-3/cutebot/kinematika'
        }
      ]
    },
    {
      id: 'rob3-b6',
      order: 6,
      month: 'Leden – Únor',
      monthKey: 'leden',
      weeks: '20.–22. týden',
      title: '6. 3D modelování a konstrukce pro robotiku',
      hours: 6,
      theoryHours: 1,
      practiceHours: 5,
      description: 'Základy 3D CAD modelování, příprava tiskových dat v PrusaSliceru a tisk dílů na Prusa MINI.',
      rvpCompetence: 'Vytvoří funkční 3D model dílu, připraví tisková data a ověří montáž dílu na robotu.',
      subtopics: [
        {
          id: 'rob3-b6-1',
          title: 'Návrh konstrukčních prvků v CAD (Tinkercad / Onshape)',
          hours: 2,
          type: 'laborator',
          description: 'Základy parametrického a objemového modelování, technické tolerance pro montáž dílů.',
          practice: 'Návrh vlastního držáku senzoru nebo ochranného nárazníku pro Cutebota.',
          route: '/specializovana/robotika-3/mcu/periferie'
        },
        {
          id: 'rob3-b6-2',
          title: 'Příprava pro 3D tisk a výroba na Prusa MINI',
          hours: 4,
          type: 'laborator',
          description: 'Slicing v PrusaSliceru, volba parametrů tisku (výplň, perimetry, orientace), obsluha tiskárny.',
          practice: 'Vytištění navrženého dílu na Prusa MINI a jeho mechanická montáž na podvozek robota.',
          route: '/specializovana/robotika-3/cutebot/telemetrie'
        }
      ]
    },
    {
      id: 'rob3-b7',
      order: 7,
      month: 'Únor – Březen',
      monthKey: 'unor',
      weeks: '23.–25. týden',
      title: '7. Internet věcí a komunikace robotických zařízení',
      hours: 6,
      theoryHours: 1,
      practiceHours: 5,
      description: 'Bezdrátová rádiová komunikace (micro:bit Radio 2.4 GHz), paketová telemetrie a odesílání do cloudu.',
      rvpCompetence: 'Propojí zařízení bezdrátově, odešle a přijme telemetrická data a vytvoří monitorovací dashboard.',
      subtopics: [
        {
          id: 'rob3-b7-1',
          title: 'Bezdrátová síťová komunikace micro:bit Radio (2.4 GHz)',
          hours: 2,
          type: 'laborator',
          description: 'Paketový rádiový přenos, čísla skupin (group id), formátování dat do řetězců a JSONu.',
          practice: 'Dálkový ovladač – jeden micro:bit v ruce s akcelerometrem řídí pohyb Cutebota na podlaze.',
          route: '/specializovana/robotika-3/iot/radio'
        },
        {
          id: 'rob3-b7-2',
          title: 'M2M telemetrie a odesílání dat do cloudového dashboardu',
          hours: 4,
          type: 'laborator',
          description: 'Strojová komunikace M2M, přenos dat z jedoucího robota na PC základnu a do cloudu (ThingSpeak).',
          practice: 'Vytvoření živého monitorovacího panelu: zobrazení stavu baterie, teploty a ujeté dráhy v PC.',
          route: '/specializovana/robotika-3/iot/ovladani'
        }
      ]
    },
    {
      id: 'rob3-b8',
      order: 8,
      month: 'Březen',
      monthKey: 'brezen',
      weeks: '26.–27. týden',
      title: '8. Robotika a umělá inteligence',
      hours: 4,
      theoryHours: 1,
      practiceHours: 3,
      description: 'Počítačové vidění, kamera SmartLens jako inteligentní senzor a sledování objektů v Pythonu.',
      rvpCompetence: 'Vysvětlí princip počítačového vidění, využije kameru jako senzor a programuje reakci na obraz.',
      subtopics: [
        {
          id: 'rob3-b8-1',
          title: 'SmartLens AI kamera: Detekce barev a obrazových značek',
          hours: 2,
          type: 'laborator',
          description: 'Kamera jako senzor v Pythonu, rozpoznávání barevných karet a čtení 2D značek (AprilTags).',
          practice: 'Robot reaguje na značky: zelená karta = jeď vpřed, červená karta = nouzový stop.',
          route: '/specializovana/robotika-4/aim-vision/barvy'
        },
        {
          id: 'rob3-b8-2',
          title: 'Vizuální sledování pohybujícího se cíle (Ball Tracking)',
          hours: 2,
          type: 'laborator',
          description: 'Vyhodnocení souřadnic středu objektu v zorném poli kamery a dynamické zatáčení robota.',
          practice: 'Autonomní pronásledování: Cutebot sleduje barevný míček kutálející se po podlaze.',
          route: '/specializovana/robotika-4/aim-vision/tracking'
        }
      ]
    },
    {
      id: 'rob3-b9',
      order: 9,
      month: 'Duben – Květen',
      monthKey: 'duben',
      weeks: '28.–32. týden',
      title: '9. Závěrečný robotický projekt',
      hours: 10,
      theoryHours: 1,
      practiceHours: 9,
      description: 'Samostatná týmová realizace uceleného robotického projektu integrujícího hardware, senzory a kód.',
      rvpCompetence: 'Samostatně v týmu navrhne, sestaví a naprogramuje robotické zařízení a vede dokumentaci.',
      subtopics: [
        {
          id: 'rob3-b9-1',
          title: 'Specifikace zadání projektu a návrh architektury',
          hours: 2,
          type: 'projekt',
          description: 'Výběr projektového tématu ve dvojici, definice vstupů/výstupů, návrh stavového automatu.',
          practice: 'Sestavení projektového plánu a příprava vývojového repozitáře kódu.',
          route: '/specializovana/robotika-4/projekt/architektura'
        },
        {
          id: 'rob3-b9-2',
          title: 'Vývoj a integrace hardwaru a softwaru v Pythonu',
          hours: 4,
          type: 'projekt',
          description: 'Programování řídicí logiky, integrace senzorů, zapojení 3D tištěného dílu nebo kamery.',
          practice: 'Vývoj kódu v MicroPythonu a postupné ověřování funkčnosti dílčích částí.',
          route: '/specializovana/robotika-4/projekt/realizace'
        },
        {
          id: 'rob3-b9-3',
          title: 'Testování v aréně, ladění chyb a dokumentace',
          hours: 4,
          type: 'projekt',
          description: 'Zátěžové testy na modelové trati, ošetření nestandardních stavů a tvorba technické zprávy.',
          practice: 'Ladění stability programu a finalizace technické dokumentace projektu.',
          route: '/specializovana/robotika-4/projekt/realizace'
        }
      ]
    },
    {
      id: 'rob3-b10',
      order: 10,
      month: 'Květen – Červen',
      monthKey: 'kveten',
      weeks: '33. týden',
      title: '10. Prezentace a obhajoba projektu',
      hours: 2,
      theoryHours: 0,
      practiceHours: 2,
      description: 'Veřejná prezentace, živá demonstrace funkce robota v aréně a obhajoba před třídou.',
      rvpCompetence: 'Prezentuje vytvořené řešení, obhájí zvolený technický postup a zhodnotí výsledky práce.',
      subtopics: [
        {
          id: 'rob3-b10-1',
          title: 'Živá demonstrace funkčnosti robota a ústní obhajoba',
          hours: 2,
          type: 'projekt',
          description: 'Předvedení autonomního chování v aréně, vysvětlení kódu v Pythonu, diskuse a hodnocení.',
          practice: 'Obhajoba technického řešení před třídou, reflexe silných a slabých stránek projektu.',
          route: '/specializovana/robotika-4/projekt/obhajoba'
        }
      ]
    }
  ]
};

// =========================================================================
// 4. ROČNÍK: ROBOTIKA 2 (ROB 4 – 66 HODIN, 33 TÝDNŮ × 2 H TÝDNĚ)
// VEX AIM všesměrová aréna, průmyslové rameno KUKA a maturitní projekt
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
      month: 'Září – Prosinec',
      monthKey: 'zari',
      weeks: '1.–14. týden',
      title: '1. Všesměrová mobilní robotika a herní aréna (VEX AIM)',
      hours: 28,
      theoryHours: 6,
      practiceHours: 22,
      description: 'Všesměrový podvozek s 3 Omni koly, VEXcode Python, elektromagnetický manipulátor a týmový turnaj v aréně.',
      rvpCompetence: 'Programuje pohyb všesměrového robotu v Pythonu, ovládá akční členy a tvoří herní strategii.',
      subtopics: [
        {
          id: 'rob4-b1-1',
          title: 'Seznámení s robotem VEX AIM a vývojovým prostředím VEXcode',
          hours: 4,
          type: 'laborator',
          description: 'Architektura VEX AIM, tříkolový všesměrový podvozek, konfigurace Python API.',
          practice: 'Zprovoznění komunikace, základní příkazy pro jízdu vpřed, vzad a rotaci na místě.',
          route: '/specializovana/robotika-4/aim-kinematika/omni'
        },
        {
          id: 'rob4-b1-2',
          title: 'Programování holonomního všesměrového pohybu v Pythonu',
          hours: 8,
          type: 'laborator',
          description: 'Pohyb do stran (strafe) bez natáčení robota, složený pohyb a plynulé trajektorie po hřišti.',
          practice: 'Tvorba funkcí v Pythonu pro jízdu v libovolném směru a vyhýbání se překážkám.',
          route: '/specializovana/robotika-4/aim-kinematika/vektory'
        },
        {
          id: 'rob4-b1-3',
          title: 'Ovládání akčních členů: Elektromagnet na puky a vyhazovač',
          hours: 6,
          type: 'laborator',
          description: 'Zapínání a vypínání elektromagnetu pro sběr puků, mechanický vyhazovač / kicker.',
          practice: 'Úloha: Najet na puk, sepnout magnet, přemístit puk přes hřiště a vystřelit do branky.',
          route: '/specializovana/robotika-4/aim-kinematika/manipulace'
        },
        {
          id: 'rob4-b1-4',
          title: 'Autonomní herní strategie a třídní turnaj v aréně',
          hours: 10,
          type: 'projekt',
          description: 'Taktika sběru puků, obranné a útočné algoritmy, vyhodnocování skóre a času.',
          practice: 'Zápasy dvojic robotů proti sobě na oficiálním hřišti VEX AIM – vyhodnocení vítězného kódu.',
          route: '/specializovana/robotika-4/aim-kinematika/arena'
        }
      ]
    },
    {
      id: 'rob4-b2',
      order: 2,
      month: 'Leden – Únor',
      monthKey: 'leden',
      weeks: '15.–20. týden',
      title: '2. Průmyslová robotika a manipulátory (KUKA)',
      hours: 12,
      theoryHours: 3,
      practiceHours: 9,
      description: 'Bezpečnost u průmyslových strojů, ruční řízení smartPADem, metoda Teach-In a manipulační cyklus Pick & Place.',
      rvpCompetence: 'Bezpečně obsluhuje řídicí panel průmyslového ramene, ukládá body Teach-In a programuje Pick & Place.',
      subtopics: [
        {
          id: 'rob4-b2-1',
          title: 'Průmyslová bezpečnost a seznámení s ramenem KUKA',
          hours: 2,
          type: 'kombinovane',
          description: 'Bezpečnostní normy, funkce E-Stop, souhlasný spínač, struktura 6-osého ramene (klouby A1–A6).',
          practice: 'Bezpečnostní prohlídka robotické buňky a nácvik nouzového zastavení.',
          route: '/specializovana/robotika-4/kuka/realny-robot'
        },
        {
          id: 'rob4-b2-2',
          title: 'Ruční pojezd (Jogging) přes KUKA smartPAD v souřadnicích',
          hours: 2,
          type: 'laborator',
          description: 'Ovládací panel smartPAD, pojezd v kloubových souřadnicích a kartézském systému (WORLD/BASE).',
          practice: 'Každý žák si samostatně vyzkouší ruční navedení ramene do zadaného prostoru.',
          route: '/specializovana/robotika-4/kuka/tcp'
        },
        {
          id: 'rob4-b2-3',
          title: 'Metoda Teach-In: Ukládání bodů a trajektorie PTP vs. LIN',
          hours: 2,
          type: 'laborator',
          description: 'Uložení prostorových bodů, rozdíl mezi pohybem bod-bod (PTP) a přesnou přímkou (LIN).',
          practice: 'Vytvoření jednoduchého programu přejíždějícího mezi 3 referenčními body.',
          route: '/specializovana/robotika-4/kuka/kinematika'
        },
        {
          id: 'rob4-b2-4',
          title: 'Manipulační úloha Pick & Place (přemístění objektu)',
          hours: 4,
          type: 'laborator',
          description: 'Ovládání chapadla ramene, kalibrace výšky úchopu, bezpečné najetí a odjezd z bodu.',
          practice: 'Kompletní cyklus: uchopení kostky ze stojánku, zvednutí, přemístění a položení na cíl.',
          route: '/specializovana/robotika-4/kuka/pick-and-place'
        },
        {
          id: 'rob4-b2-5',
          title: 'Samostatná jízda a ověření bezpečné obsluhy stroje',
          hours: 2,
          type: 'laborator',
          description: 'Ověření samostatnosti při spuštění, kontrole a ukončení programu na fyzickém rameni KUKA.',
          practice: 'Praktická zkouška obsluhy: každý žák předvede bezchybný manipulační cyklus.',
          route: '/specializovana/robotika-4/kuka/realny-robot'
        }
      ]
    },
    {
      id: 'rob4-b3',
      order: 3,
      month: 'Březen – Červen',
      monthKey: 'brezen',
      weeks: '21.–33. týden',
      title: '3. Závěrečný komplexní inženýrský projekt a obhajoba',
      hours: 26,
      theoryHours: 2,
      practiceHours: 24,
      description: 'Samostatná týmová realizace maturitního projektu na libovolné platformě (VEX AIM, KUKA, VEX IQ, Cutebot).',
      rvpCompetence: 'Navrhne a realizuje komplexní inženýrské řešení, zpracuje dokumentaci a ústně obhájí projekt.',
      subtopics: [
        {
          id: 'rob4-b3-1',
          title: 'Volba tématu a zadání inženýrského projektu',
          hours: 2,
          type: 'projekt',
          description: 'Výběr platformy (VEX AIM / KUKA / VEX IQ), analýza požadavků a schválení technického zadání.',
          practice: 'Formulace technické specifikace a harmonogramu prací.',
          route: '/specializovana/robotika-4/projekt/architektura'
        },
        {
          id: 'rob4-b3-2',
          title: 'Vývoj řídicího softwaru a integrace hardwaru',
          hours: 12,
          type: 'projekt',
          description: 'Programování algoritmů v Pythonu, integrace akčních členů a senzoriky, komunikace.',
          practice: 'Praktický vývoj řešení v laboratoři s průběžnými testy funkčnosti.',
          route: '/specializovana/robotika-4/projekt/realizace'
        },
        {
          id: 'rob4-b3-3',
          title: 'Optimalizace spolehlivosti a technická dokumentace',
          hours: 8,
          type: 'projekt',
          description: 'Zátěžové testování, ošetření výpadků a sepsání podrobné technické zprávy.',
          practice: 'Finální ladění v aréně/buňce a kompletace dokumentace projektu.',
          route: '/specializovana/robotika-4/projekt/realizace'
        },
        {
          id: 'rob4-b3-4',
          title: 'Maturitní obhajoba a živá demonstrace projektu',
          hours: 4,
          type: 'projekt',
          description: 'Veřejná prezentace výsledků, živá ukázka funkce zařízení a odborná rozprava.',
          practice: 'Předvedení projektu před zkušební komisí, obhajoba technických rozhodnutí a hodnocení.',
          route: '/specializovana/robotika-4/projekt/obhajoba'
        }
      ]
    }
  ]
};
