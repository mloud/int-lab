import { ThematicPlan } from './thematicPlanTypes';

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
      weeks: '1.–5. týden',
      title: 'Architektura MCU & GPIO',
      hours: 10,
      theoryHours: 3,
      practiceHours: 7,
      description: 'Základy architektury jednočipu ARM Cortex-M4 na BBC micro:bit v2, REPL konzole, GPIO piny, časování ticks_ms() a stavové automaty.',
      rvpCompetence: 'Ovládá práci s mikrokontrolérem v MicroPythonu, zapojuje GPIO periferie a vytváří neblokující řídicí kód.',
      subtopics: [
        {
          id: 'rob3-b1-1',
          title: 'Úvod do architektury MCU: Od PC k mikrokontroléru (micro:bit v2)',
          hours: 2,
          type: 'laborator',
          description: 'Srovnání PC a MCU, paměti Flash vs. RAM, nahrávání firmware, sériová konzole REPL v MicroPythonu.',
          practice: 'Zprovoznění vývojového prostředí, první neblokující program s LED maticí.',
          route: '/specializovana/robotika-3/mcu/uvod'
        },
        {
          id: 'rob3-b1-2',
          title: 'Digitální vstupy a výstupy GPIO: Logické úrovně a tlačítka',
          hours: 2,
          type: 'laborator',
          description: 'Logická 0 a 1 (3.3V), pull-up a pull-down rezistory, ošetření zákmitů kontaktů (debouncing).',
          practice: 'Zapojení externích tlačítek a LED na edge connector micro:bitu.',
          route: '/specializovana/robotika-3/mcu/gpio'
        },
        {
          id: 'rob3-b1-3',
          title: 'Časování bez zpoždění: Funkce ticks_ms() vs. blokující sleep()',
          hours: 2,
          type: 'laborator',
          description: 'Proč je sleep() v robotice nepřípustný, měření uplynulého času přes ticks_ms() a ticks_diff().',
          practice: 'Tvorba neblokujícího programu: současné blikání diodou s různou frekvencí a čtení tlačítek.',
          route: '/specializovana/robotika-3/mcu/casovani'
        },
        {
          id: 'rob3-b1-4',
          title: 'Konečný stavový automat (FSM) v řízení hardware',
          hours: 4,
          type: 'laborator',
          description: 'Koncepce stavového automatu, stavy, přechody a události, implementace přes proměnnou stavu a podmínky v Pythonu.',
          practice: 'Implementace inteligentního semaforu pro chodce s časováním a přechody stavů.',
          route: '/specializovana/robotika-3/mcu/fsm'
        }
      ]
    },
    {
      id: 'rob3-b2',
      order: 2,
      month: 'Říjen – Listopad',
      monthKey: 'rijen',
      weeks: '6.–12. týden',
      title: 'Senzorika, ADC & Sběrnice',
      hours: 14,
      theoryHours: 3,
      practiceHours: 11,
      description: 'Analogové vzorkování ADC, práce se senzorickou sadou IOKit, sběrnice I2C, OLED displej, filtrace šumu a hystereze.',
      rvpCompetence: 'Zpracovává analogové i digitální senzorické signály, filtruje šum a zobrazuje telemetrii.',
      subtopics: [
        {
          id: 'rob3-b2-1',
          title: 'Analogový svět a ADC převodník: Vzorkování napětí a potenciometr',
          hours: 2,
          type: 'laborator',
          description: 'Princip A/D převodníku, 10bitové a 12bitové rozlišení (0–1023), vzorkování napětí z fotorezistoru a potenciometru.',
          practice: 'Kalibrace analogového senzoru osvětlení a přepočet surové hodnoty na luxy.',
          route: '/specializovana/robotika-3/senzory/adc'
        },
        {
          id: 'rob3-b2-2',
          title: 'Sériová sběrnice I2C a OLED displej SSD1306',
          hours: 4,
          type: 'laborator',
          description: 'Protokol I2C (vodiče SDA a SCL, adresa zařízení 0x3C), inicializace a vykreslování textu i grafiky na OLED displej.',
          practice: 'Skenování sběrnice I2C a naprogramování grafického dashboardu se senzory.',
          route: '/specializovana/robotika-3/senzory/i2c-oled'
        },
        {
          id: 'rob3-b2-3',
          title: 'Ultrazvukový dálkoměr a měření vzdálenosti (Sonar)',
          hours: 2,
          type: 'laborator',
          description: 'Šíření zvuku vzduchem, vyslání impulzu Trigger a měření délky odrazu Echo v mikrosekundách.',
          practice: 'Zprovoznění parkovacího asistentu s akustickou a vizuální signalizací.',
          route: '/specializovana/robotika-3/senzory/ultrazvuk'
        },
        {
          id: 'rob3-b2-4',
          title: 'Zpracování signálu: Filtrace šumu a klouzavý průměr',
          hours: 4,
          type: 'laborator',
          description: 'Proč senzory šumí, náhodné špičky, implementace kruhového bufferu a klouzavého průměru (Moving Average).',
          practice: 'Srovnání surového a filtrovaného signálu vzdálenosti na grafickém displeji.',
          route: '/specializovana/robotika-3/senzory/filtrace'
        },
        {
          id: 'rob3-b2-5',
          title: 'Prahování a hystereze v rozhodovací logice',
          hours: 2,
          type: 'laborator',
          description: 'Problém kmitání kolem jedné prahové hodnoty, horní a dolní práh hystereze (Schmittův obvod v kódu).',
          practice: 'Implementace stabilního nočního světla odolného vůči krátkodobému zastínění.',
          route: '/specializovana/robotika-3/senzory/hystereze'
        }
      ]
    },
    {
      id: 'rob3-b3',
      order: 3,
      month: 'Prosinec – Leden',
      monthKey: 'prosinec',
      weeks: '13.–18. týden',
      title: 'Pohony & Diferenciální kinematika (Cutebot)',
      hours: 12,
      theoryHours: 2,
      practiceHours: 10,
      description: 'Řízení stejnosměrných motorů přes H-můstek a PWM, diferenciální kinematika mobilního podvozku Cutebot a kalibrace přímého směru.',
      rvpCompetence: 'Ovládá motory pomocí PWM střídy a řídí pohyb diferenciálního podvozku.',
      subtopics: [
        {
          id: 'rob3-b3-1',
          title: 'DC motory, H-můstek a regulace otáček pomocí PWM',
          hours: 2,
          type: 'laborator',
          description: 'Princip stejnosměrného motoru, H-můstek pro obousměrný chod, PWM střída (0–100 %) pro regulaci rychlosti.',
          practice: 'Ovládání motorů Cutebota přes I2C příkazy s plynulým rozjezdem.',
          route: '/specializovana/robotika-3/cutebot/motory'
        },
        {
          id: 'rob3-b3-2',
          title: 'Kinematika diferenciálního podvozku: Jízda v oblouku a rotace na místě',
          hours: 4,
          type: 'laborator',
          description: 'Vztah mezi rychlostí levého a pravého kola, poloměr zatáčení, otáčení kolem středu robota (protiběžná kola).',
          practice: 'Naprogramování přesného projetí čtverce a osmičky v prostoru učebny.',
          route: '/specializovana/robotika-3/cutebot/kinematika'
        },
        {
          id: 'rob3-b3-3',
          title: 'Kalibrace mechanických nesouměrností a trimování motorů',
          hours: 2,
          type: 'laborator',
          description: 'Proč robot nejezdí rovně (tolerance převodů a motorů), softwarové trimování a kalibrační konstanty.',
          practice: 'Zkalibrování přímého směru Cutebota na dráze 3 metrů.',
          route: '/specializovana/robotika-3/cutebot/kalibrace'
        },
        {
          id: 'rob3-b3-4',
          title: 'Pohybové profily a bezpečné zastavení před překážkou',
          hours: 4,
          type: 'laborator',
          description: 'Integrace ultrazvuku s motory, proporcionální zpomalování podle vzdálenosti překážky.',
          practice: 'Implementace autonomního nouzového brzdění bez nárazu.',
          route: '/specializovana/robotika-3/cutebot/bezpecnost'
        }
      ]
    },
    {
      id: 'rob3-b4',
      order: 4,
      month: 'Únor – Duben',
      monthKey: 'unor',
      weeks: '19.–27. týden',
      title: 'Autonomní navigace & Řízení',
      hours: 18,
      theoryHours: 4,
      practiceHours: 14,
      description: 'Sledování vodicí linie, infračervené odrazové senzory, diskrétní Bang-Bang regulace vs. proporcionální P/PD regulátor a Sumo aréna.',
      rvpCompetence: 'Navrhuje regulační algoritmy pro autonomní navigaci a rozhodovací logiku v aréně.',
      subtopics: [
        {
          id: 'rob3-b4-1',
          title: 'Optické sledování linie: Pole infračervených senzorů a kalibrace prahů',
          hours: 2,
          type: 'laborator',
          description: 'Odrazivost infračerveného světla od černé čáry a bílého podkladu, kalibrace čtecích prahů.',
          practice: 'Otestování čtení senzorů čáry na Cutebotu a zobrazení stavu na LED diodách.',
          route: '/specializovana/robotika-3/navigace/senzory-cary'
        },
        {
          id: 'rob3-b4-2',
          title: 'Diskrétní řízení Bang-Bang a jeho limity (kmitání podvozku)',
          hours: 4,
          type: 'laborator',
          description: 'Dvoustavové skokové řízení (vidím vlevo -> toč vpravo), příčiny kmitání a energetické neefektivity.',
          practice: 'Zprovoznění základního line followera a měření času na cvičné trati.',
          route: '/specializovana/robotika-3/navigace/bang-bang'
        },
        {
          id: 'rob3-b4-3',
          title: 'Proporcionální regulátor (P-regulátor): Výpočet regulační odchylky',
          hours: 4,
          type: 'laborator',
          description: 'Pojem regulační odchylky (Error), konstanta Kp, plynulá úprava rozdílu rychlostí motorů.',
          practice: 'Naladění proporcionálního sledovače linie a eliminace trhavého pohybu.',
          route: '/specializovana/robotika-3/navigace/p-regulator'
        },
        {
          id: 'rob3-b4-4',
          title: 'Derivační složka (PD regulátor) a zvládání ostrých zatáček',
          hours: 4,
          type: 'laborator',
          description: 'Sledování rychlosti změny chyby (derivace), tlumení překmitů a reakce na prudké změny směru.',
          practice: 'Optimalizace projetí náročné tratě s ostrými vlásenkami a pravoúhlými rohy.',
          route: '/specializovana/robotika-3/navigace/pd-regulator'
        },
        {
          id: 'rob3-b4-5',
          title: 'Autonomní Sumo aréna: Vyhledání soupeře a udržení na bojišti',
          hours: 4,
          type: 'projekt',
          description: 'Kombinace detekce bílé hrany dohyo arény a aktivního vyhledávání protivníka sonarem.',
          practice: 'Mini-turnaj v robotickém Sumu: autonomní strategie a spolehlivost algoritmu.',
          route: '/specializovana/robotika-3/navigace/sumo'
        }
      ]
    },
    {
      id: 'rob3-b5',
      order: 5,
      month: 'Květen – Červen',
      monthKey: 'kveten',
      weeks: '28.–33. týden',
      title: 'IoT & Bezdrátová telemetrie',
      hours: 12,
      theoryHours: 2,
      practiceHours: 10,
      description: 'micro:bit Radio 2.4 GHz, parsování paketů, dálkové ovládání akcelerometrem a telemetrický dispečink.',
      rvpCompetence: 'Konfiguruje rádiovou komunikaci, navrhuje komunikační protokoly a realizuje telemetrii.',
      subtopics: [
        {
          id: 'rob3-b5-1',
          title: 'Bezdrátová komunikace na 2.4 GHz: micro:bit Radio a kanály',
          hours: 2,
          type: 'laborator',
          description: 'Rádiové vysílání bez párování, rádiové skupiny (Radio Group), kanály a síla signálu (RSSI).',
          practice: 'Zprovoznění jednoduchého bezdrátového chatu a test dosahu signálu.',
          route: '/specializovana/robotika-3/iot/radio-zaklad'
        },
        {
          id: 'rob3-b5-2',
          title: 'Struktura paketů a telemetrický protokol',
          hours: 4,
          type: 'laborator',
          description: 'Definice vlastního datového paketu (ID odesílatele, typ zprávy, číselná hodnota), parsování řetězců.',
          practice: 'Bezdrátové odesílání telemetrických dat z robota (rychlost, vzdálenost, napětí baterie).',
          route: '/specializovana/robotika-3/iot/pakety'
        },
        {
          id: 'rob3-b5-3',
          title: 'Dálkový ovladač s využitím vestavěného akcelerometru',
          hours: 4,
          type: 'laborator',
          description: 'Čtení náklonu v osách X a Y (Pitch a Roll), mapování sklonu ovladače na rychlost levého a pravého kola.',
          practice: 'Ovládání Cutebota pouhým nakláněním druhého micro:bitu v ruce.',
          route: '/specializovana/robotika-3/iot/ovladac'
        },
        {
          id: 'rob3-b5-4',
          title: 'Závěrečný dispečink a rekapitulace ročníku',
          hours: 2,
          type: 'kombinovane',
          description: 'Centrální dispečerská stanice sledující pohyb více robotů v učebně, hodnocení a uzavření klasifikace.',
          practice: 'Společná jízda flotily robotů řízená z jednoho dispečerského uzlu.',
          route: '/specializovana/robotika-3/iot/dispecink'
        }
      ]
    }
  ]
};

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
      month: 'Září – Říjen',
      monthKey: 'zari',
      weeks: '1.–7. týden',
      title: 'Všesměrová holonomní kinematika (VEX AIM)',
      hours: 14,
      theoryHours: 4,
      practiceHours: 10,
      description: 'Tříkolová všesměrová kinematika (Omni wheels), vektorový rozklad sil a rychlostí, elektromagnet a mechanický kicker.',
      rvpCompetence: 'Aplikuje vektorovou matematiku na všesměrový pohyb a ovládá akční členy v aréně.',
      subtopics: [
        {
          id: 'rob4-b1-1',
          title: 'Holonomní vs. neholonomní podvozky: Princip všesměrových kol Omni',
          hours: 2,
          type: 'laborator',
          description: 'Stupně volnosti v rovině (3-DoF), konstrukce všesměrového kola s příčnými válečky, srovnání s autem a diferenciálním robotem.',
          practice: 'Seznámení s hardwarem VEX AIM, zprovoznění Python API a první pohybové testy.',
          route: '/specializovana/robotika-4/aim-kinematika/uvod'
        },
        {
          id: 'rob4-b1-2',
          title: 'Vektorová matematika: Goniometrický rozklad sil na 3 motory (120°)',
          hours: 4,
          type: 'laborator',
          description: 'Rozklad vektoru rychlosti [Vx, Vy] na jednotlivá kola, úhel kol 120°, matice transformace a nezávislá úhlová rotace w.',
          practice: 'Implementace funkce drive_vector(vx, vy, omega) v Pythonu a jízda v libovolném směru bez natáčení robota.',
          route: '/specializovana/robotika-4/aim-kinematika/vektory'
        },
        {
          id: 'rob4-b1-3',
          title: 'Translace s rotací: Složené trajektorie a plynulé oblouky',
          hours: 4,
          type: 'laborator',
          description: 'Kombinace translačního pohybu a nezávislé rotace, jízda po kružnici s natočením stále k jednomu bodu.',
          practice: 'Naprogramování trajektorie "obíhání cíle" (Orbiting) s neustálým mířením na střed.',
          route: '/specializovana/robotika-4/aim-kinematika/slozeny-pohyb'
        },
        {
          id: 'rob4-b1-4',
          title: 'Akční členy VEX AIM: Elektromagnet a mechanický kicker',
          hours: 4,
          type: 'laborator',
          description: 'Ovládání elektromagnetického držáku herních puků a pružinového odpalovacího mechanismu (kicker).',
          practice: 'Zadání výzvy: autonomní nájezd k puku, uchopení magnetem, odvoz na pozici a přesný odpal do branky.',
          route: '/specializovana/robotika-4/aim-kinematika/akcni-cleny'
        }
      ]
    },
    {
      id: 'rob4-b2',
      order: 2,
      month: 'Listopad – Leden',
      monthKey: 'listopad',
      weeks: '8.–14. týden',
      title: 'Počítačové vidění & AI navigace',
      hours: 14,
      theoryHours: 3,
      practiceHours: 11,
      description: 'Kamera jako inteligentní senzor, barevná segmentace HSV, Visual Servoing a prostorová lokalizace přes AprilTags.',
      rvpCompetence: 'Využívá počítačové vidění pro lokalizaci cílů a realizuje zpětnovazební vizuální navádění.',
      subtopics: [
        {
          id: 'rob4-b2-1',
          title: 'Kamera jako senzor: Zpracování obrazu a barevný prostor HSV',
          hours: 2,
          type: 'laborator',
          description: 'Barevný prostor RGB vs. HSV, odolnost vůči změnám osvětlení, barevné masky a prahování.',
          practice: 'Nastavení AI kamery na detekci barvy herního míčku a výpočet souřadnic jeho středu.',
          route: '/specializovana/robotika-4/aim-vision/hsv'
        },
        {
          id: 'rob4-b2-2',
          title: 'Visual Servoing: Zpětnovazební dojíždění k pohybujícímu se cíli',
          hours: 4,
          type: 'laborator',
          description: 'Princip vizuální zpětné vazby: horizontální odchylka v obraze řídí otáčení, zdánlivá velikost objektu řídí vzdálenost.',
          practice: 'Implementace autonomního sledování míčku: robot neustále udržuje míček ve středu zorného pole a dojíždí k němu.',
          route: '/specializovana/robotika-4/aim-vision/visual-servoing'
        },
        {
          id: 'rob4-b2-3',
          title: 'Prostorové značky AprilTags: 2D poziční kódy a výpočet polohy',
          hours: 4,
          type: 'laborator',
          description: 'Princip pozičních značek AprilTags, detekce rohů, výpočet vzdálenosti v centimetrech a orientace v prostoru.',
          practice: 'Navigace po aréně podle AprilTags umístěných na stěnách: robot přesně ví, kde se nachází.',
          route: '/specializovana/robotika-4/aim-vision/apriltags'
        },
        {
          id: 'rob4-b2-4',
          title: 'Integrovaná herní mise: Vizuální vyhledání, nájezd a skórování',
          hours: 4,
          type: 'projekt',
          description: 'Spojení všesměrového podvozku, AI kamery a AprilTags do jedné komplexní autonomní mise v aréně.',
          practice: 'Závěrečný autonomní turnaj VEX AIM: robot samostatně najde cíl, sebere jej a dopraví do správné zóny.',
          route: '/specializovana/robotika-4/aim-vision/mise'
        }
      ]
    },
    {
      id: 'rob4-b3',
      order: 3,
      month: 'Leden – Březen',
      monthKey: 'leden',
      weeks: '15.–21. týden',
      title: 'Inženýrská mechanika & Smart motory (VEX IQ)',
      hours: 14,
      theoryHours: 4,
      practiceHours: 10,
      description: 'Smart motory s optickými enkodéry, mechanické ozubené převody, točivý moment, odometrie a zdvihací mechanismy.',
      rvpCompetence: 'Navrhuje převodové poměry, využívá enkodéry pro odometrii a konstruuje manipulační mechanismy.',
      subtopics: [
        {
          id: 'rob4-b3-1',
          title: 'Mechanické převody v robotice: Rychlost vs. točivý moment',
          hours: 2,
          type: 'laborator',
          description: 'Čelní ozubená kola, převodový poměr (Gear Ratio), přenos síly, moment zvratu motoru a tření.',
          practice: 'Konstrukce zátěžové převodovky a měření schopnosti utáhnout břemeno při různých převodech.',
          route: '/specializovana/robotika-4/vex-iq/prevody'
        },
        {
          id: 'rob4-b3-2',
          title: 'Smart motory VEX IQ: Optické enkodéry a PID řízení polohy',
          hours: 4,
          type: 'laborator',
          description: 'Zpětná vazba z optického enkodéru, měření úhlu s přesností na desetiny stupně, vnitřní PID smyčka motoru.',
          practice: 'Přesné polohování motoru: otočení ramene o přesně zadaný úhel a udržení polohy pod zátěží.',
          route: '/specializovana/robotika-4/vex-iq/smart-motory'
        },
        {
          id: 'rob4-b3-3',
          title: 'Odometrie a IMU gyroskop: Přesná navigace v souřadnicích',
          hours: 4,
          type: 'laborator',
          description: 'Výpočet ujeté vzdálenosti z počtu otáček kol, kumulativní chyba odometrie (prokluz) a její kompenzace gyroskopem.',
          practice: 'Autonomní projetí zadané polygonální trasy bez vnějších senzorů výhradně pomocí odometrie a IMU.',
          route: '/specializovana/robotika-4/vex-iq/odometrie'
        },
        {
          id: 'rob4-b3-4',
          title: 'Zdvihací mechanismy a robotická chapadla',
          hours: 4,
          type: 'laborator',
          description: 'Mechanika čtyřkloubových mechanismů (paralelogram), nůžkové zdviže a konstrukce uchopovacích kleští.',
          practice: 'Stavba a odladění zvedací věže schopné nabrat a zvednout náklad do výšky 30 cm.',
          route: '/specializovana/robotika-4/vex-iq/mechanismy'
        }
      ]
    },
    {
      id: 'rob4-b4',
      order: 4,
      month: 'Březen – Květen',
      monthKey: 'brezen',
      weeks: '22.–28. týden',
      title: 'Průmyslová robotika & Manipulátory (KUKA EDU)',
      hours: 14,
      theoryHours: 4,
      practiceHours: 10,
      description: '6-DoF kinematika průmyslových ramen, souřadnicové systémy (BASE, TOOL), trajektorie PTP a LIN v simulátoru i na reálném stroji.',
      rvpCompetence: 'Programuje průmyslové robotické rameno v kartézských souřadnicích a ladí manipulační úlohy.',
      subtopics: [
        {
          id: 'rob4-b4-1',
          title: 'Kinematika 6-osého průmyslového ramene: Stupně volnosti a klouby A1–A6',
          hours: 2,
          type: 'kombinovane',
          description: 'Struktura průmyslového robotu, kloubové souřadnice A1 až A6, dopředná a inverzní kinematika, singularita.',
          practice: 'Pohyb ramene v kloubových souřadnicích v simulátoru i ručním ovládáním přes smartPAD.',
          route: '/specializovana/robotika-4/kuka/kinematika'
        },
        {
          id: 'rob4-b4-2',
          title: 'Kartézské souřadnicové systémy: WORLD, BASE a kalibrace TOOL (TCP)',
          hours: 4,
          type: 'laborator',
          description: 'Pohyb v prostoru X, Y, Z a úhlech natočení A, B, C. Kalibrace středu nástroje (Tool Center Point) metodou 4 bodů.',
          practice: 'Kalibrace hrotu chapadla a pohyb v nástrojovém souřadnicovém systému podél nakloněné roviny.',
          route: '/specializovana/robotika-4/kuka/souradnice'
        },
        {
          id: 'rob4-b4-3',
          title: 'Interpolace pohybů: Bod z bodu do bodu (PTP) vs. Lineární pohyb (LIN)',
          hours: 4,
          type: 'laborator',
          description: 'Rozdíl mezi rychlým přesunem PTP a přesnou přímkou LIN, aproximační zóny (vyhlazení přechodu bodů), rychlostní limity.',
          practice: 'Vytvoření trajektorie pro obkreslení složitého tvaru a manipulaci s díly bez kolizí.',
          route: '/specializovana/robotika-4/kuka/trajektorie'
        },
        {
          id: 'rob4-b4-4',
          title: 'Průmyslová úloha Pick & Place a digitální vstupy/výstupy buňky',
          hours: 4,
          type: 'laborator',
          description: 'Logika uchopení a odložení obrobku, synchronizace s dopravníkem přes digitální I/O signály.',
          practice: 'Kompletní odladění cyklu Pick & Place: odebrání dílu ze zásobníku, kontrola a uložení do palety.',
          route: '/specializovana/robotika-4/kuka/realny-robot'
        }
      ]
    },
    {
      id: 'rob4-b5',
      order: 5,
      month: 'Květen – Červen',
      monthKey: 'kveten',
      weeks: '29.–33. týden',
      title: 'Závěrečný komplexní kooperativní projekt',
      hours: 10,
      theoryHours: 1,
      practiceHours: 9,
      description: 'Týmová integrace heterogenního hardwaru: mobilní robot přiváží materiál k průmyslové buňce KUKA, dispečerská koordinace a veřejná obhajoba.',
      rvpCompetence: 'Integruje mobilní a stacionární robotiku do funkční linky a odborně obhájí technické řešení.',
      subtopics: [
        {
          id: 'rob4-b5-1',
          title: 'Architektura kooperativní linky: Rozhraní a komunikační protokol',
          hours: 2,
          type: 'projekt',
          description: 'Definice komunikačního protokolu (MQTT / TCP socket / signály) mezi mobilním robotem a KUKA ramenem.',
          practice: 'Týmové rozdělení rolí a zprovoznění komunikačního handshake.',
          route: '/specializovana/robotika-4/projekt/architektura'
        },
        {
          id: 'rob4-b5-2',
          title: 'Týmová integrace a ladění kooperace v reálném čase',
          hours: 6,
          type: 'projekt',
          description: 'Společné ladění v dílně: autonomní nájezd mobilního robota VEX k buňce, předání obrobku chapadlu KUKA a odvoz hotového výrobku.',
          practice: 'Testování stability cyklu, ošetření chybových stavů a ladění časování.',
          route: '/specializovana/robotika-4/projekt/realizace'
        },
        {
          id: 'rob4-b5-3',
          title: 'Odborná veřejná obhajoba projektu a reflexe',
          hours: 2,
          type: 'projekt',
          description: 'Předvedení živé funkční kooperativní buňky před hodnoticí komisí a třídou, obhajoba technické dokumentace.',
          practice: 'Živá demonstrace funkčního cyklu a ústní zkouška z robotických principů.',
          route: '/specializovana/robotika-4/projekt/obhajoba'
        }
      ]
    }
  ]
};
