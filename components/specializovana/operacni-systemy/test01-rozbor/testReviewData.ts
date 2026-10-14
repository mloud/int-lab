export interface QuizQuestion {
  id: number;
  part: string; // 'Část A — Hardware' | 'Část B — Operační systémy'
  testRef: string; // 'Otázka A1 z písemky'
  title: string;
  question: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctIndex: number;
  explanation: string;
}

export const TEST_REVIEW_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    part: 'Část A — Hardware',
    testRef: 'Otázka A1 z písemky',
    title: 'Hardware: RAM vs. Pevný disk',
    question: 'Jaký je zásadní rozdíl mezi operační pamětí RAM a pevným diskem (SSD/HDD)?',
    options: [
      { letter: 'A', text: 'RAM je levnější a slouží k dlouhodobé archivaci velkých souborů.' },
      { letter: 'B', text: 'RAM je rychlé dočasné úložiště pro běžící programy, které se po vypnutí PC smaže, zatímco disk uchovává data trvale i bez napájení.' },
      { letter: 'C', text: 'Na disku běží instrukce přímo pro procesor, do RAM se ukládá pouze textový výstup monitoru.' },
      { letter: 'D', text: 'Mezi RAM a diskem není technický rozdíl, liší se pouze tvarem konektoru.' },
    ],
    correctIndex: 1,
    explanation: 'RAM (Random Access Memory) je volatilní (energeticky závislá) – slouží jako okamžitá pracovní plocha pro procesor. Disk (SSD/HDD) je nevolatilní – slouží k trvalému uložení OS, programů a souborů i po vypnutí počítače.',
  },
  {
    id: 2,
    part: 'Část A — Hardware',
    testRef: 'Otázka A2 z písemky',
    title: 'Firmware: Účel a umístění UEFI',
    question: 'Co je to UEFI a kde se v počítači fyzicky nachází?',
    options: [
      { letter: 'A', text: 'Je to program v cloudu Microsoftu, který se stahuje přes Wi-Fi při každém zapnutí PC.' },
      { letter: 'B', text: 'Je to ovladač grafické karty uložený v kořenovém adresáři disku C:\\.' },
      { letter: 'C', text: 'Je to základní firmware uložený na flash paměťovém čipu na základní desce; inicializuje hardware a zavádí operační systém (OS) do paměti.' },
      { letter: 'D', text: 'Je to součást procesoru pro ukládání hesel.' },
    ],
    correctIndex: 2,
    explanation: 'UEFI je základní firmware uložený přímo v čipu na základní desce. Po stisku tlačítka napájení zkontroluje hardware a zavede operační systém z disku do operační paměti RAM.',
  },
  {
    id: 3,
    part: 'Část A — Hardware',
    testRef: 'Otázka A3 z písemky',
    title: 'Von Neumannova architektura',
    question: 'Které tvrzení o základních blocích Von Neumannovy architektury je pravdivé?',
    options: [
      { letter: 'A', text: 'Procesor (CPU) vykonává instrukce a řídí počítač, přičemž instrukce i data jsou uloženy společně v jedné operační paměti (RAM).' },
      { letter: 'B', text: 'Instrukce programu a uživatelská data musí být uloženy ve dvou fyzicky zcela oddělených pamětech.' },
      { letter: 'C', text: 'Procesor slouží pouze k chlazení počítače a nemá přístup k paměti RAM.' },
      { letter: 'D', text: 'Vstupní zařízení posílá data rovnou na monitor a procesor se do zpracování vůbec nezapojuje.' },
    ],
    correctIndex: 0,
    explanation: 'Základními bloky jsou Procesor (CPU), Operační paměť (RAM), Vstupní a Výstupní zařízení. Zásadním principem Von Neumanna je, že instrukce programu i zpracovávaná data jsou uloženy společně v jedné operační paměti.',
  },
  {
    id: 4,
    part: 'Část A — Hardware',
    testRef: 'Otázka A4 z písemky',
    title: 'Paměť RAM: Části spuštěného programu',
    question: 'Do jakých dvou základních částí je v paměti RAM rozdělen každý běžící program?',
    options: [
      { letter: 'A', text: 'Na část pro Windows a část pro Linux.' },
      { letter: 'B', text: 'Na Instrukce (kód příkazů – CO se má dělat) a Data (hodnoty a proměnné – S ČÍM se pracuje).' },
      { letter: 'C', text: 'Na textové soubory a obrázky na ploše.' },
      { letter: 'D', text: 'Na registry procesoru a záložní kopii na flash disku.' },
    ],
    correctIndex: 1,
    explanation: 'Procesor potřebuje vědět, co má vykonat (kód/instrukce programu), a zároveň potřebuje prostor, kde má uložené proměnné a číselné hodnoty (data), se kterými výpočet pracuje.',
  },
  {
    id: 5,
    part: 'Část B — Operační systémy',
    testRef: 'Otázka B1 z písemky',
    title: 'Definice a životní cyklus operačního systému',
    question: 'Co je operační systém a kdy je v počítači aktivní?',
    options: [
      { letter: 'A', text: 'Je to volitelná aplikace jako Word, spouští se pouze při kliknutí na ikonu a po dokončení práce se zavře.' },
      { letter: 'B', text: 'Je to základní systémový software vytvářející rozhraní mezi hardwarem a aplikacemi; zavádí se při startu PC a běží nepřetržitě až do vypnutí.' },
      { letter: 'C', text: 'Je to antivirus chránící počítač před smazáním disku, aktivní je pouze při připojení k internetu.' },
      { letter: 'D', text: 'Je to programové vybavení v procesoru, které nelze přeinstalovat ani aktualizovat.' },
    ],
    correctIndex: 1,
    explanation: 'Operační systém je nezbytný prostředník (abstrakční vrstva). Běží na pozadí po celou dobu chodu počítače a stará se o správu procesoru, paměti RAM, souborů i připojených periferií.',
  },
  {
    id: 6,
    part: 'Část B — Operační systémy',
    testRef: 'Otázka B2 z písemky',
    title: 'Třípatrový vrstvený model počítače',
    question: 'Představte si počítač jako dům o třech patrech (vrstvách). Jak jdou správně za sebou odspodu nahoru?',
    options: [
      { letter: 'A', text: '1. Aplikační software ➔ 2. Hardware ➔ 3. Operační systém' },
      { letter: 'B', text: '1. Operační systém ➔ 2. Hardware ➔ 3. Uživatel' },
      { letter: 'C', text: '1. Hardware (fyzické součástky) ➔ 2. Operační systém (správce) ➔ 3. Aplikační software (programy pro uživatele)' },
      { letter: 'D', text: '1. Internet ➔ 2. Monitor ➔ 3. Klávesnice' },
    ],
    correctIndex: 2,
    explanation: 'Úplně dole leží fyzické železo (Hardware). Nad ním sedí Operační systém, který hardware ovládá a poskytuje jednotné prostředí. Nahoře běží Aplikační software (Word, prohlížeč, hry), který s hardwarem komunikuje právě skrz OS.',
  },
  {
    id: 7,
    part: 'Část B — Operační systémy',
    testRef: 'Otázka B3 z písemky',
    title: 'Typologie OS dle určení',
    question: 'Která z následujících trojic správně přiřazuje typ operačního systému ke konkrétnímu zařízení?',
    options: [
      { letter: 'A', text: 'Desktopový: chytré hodinky | Mobilní: herní server | Serverový: kalkulačka' },
      { letter: 'B', text: 'Desktopový: notebook / PC | Mobilní: chytrý telefon / tablet | Serverový / Vestavěný: webový server v datacentru / router' },
      { letter: 'C', text: 'Síťový: flash disk | Kancelářský: myš | Domácí: monitor' },
      { letter: 'D', text: 'Všechna zařízení na světě dnes používají identický desktopový operační systém bez rozdílu.' },
    ],
    correctIndex: 1,
    explanation: 'OS dělíme podle účelu: Desktopové (zaměřené na interaktivitu a GUI pro jednoho uživatele), Mobilní (optimalizované na dotyk a úsporu baterie) a Serverové/Embedded (optimalizované na non-stop provoz, síťové služby a vysokou zátěž bez nutnosti monitoru).',
  },
  {
    id: 8,
    part: 'Část B — Operační systémy',
    testRef: 'Otázka B4 z písemky',
    title: 'Licence: Případová studie OEM licence',
    question: 'Jan si koupil počítač s předinstalovaným Windows s OEM licencí. Po roce daroval původní PC kamarádovi a postavil si zcela nový počítač z jiných komponent. Na nový PC zadal licenční klíč ze starého PC. Zachoval se v souladu s licenční smlouvou?',
    options: [
      { letter: 'A', text: 'Ano, protože licenci jednou zaplatil, může ji libovolně přenášet na jakýkoliv svůj další počítač.' },
      { letter: 'B', text: 'Ano, ale pouze v případě, že nový počítač má stejnou značku procesoru.' },
      { letter: 'C', text: 'Ne. OEM licence je nevratně svázána s původním hardwarem (základní deskou), na kterém byla poprvé aktivována, a je nepřenosná.' },
      { letter: 'D', text: 'Ne, protože Windows se nesmí darovat kamarádovi.' },
    ],
    correctIndex: 2,
    explanation: 'OEM (Original Equipment Manufacturer) je licence, která je nevratně vázána na konkrétní hardware (základní desku). Je nepřenosná. Pro přenositelnost na jiný nový PC by Jan musel zakoupit dražší přenositelnou licenci (Retail). Původní PC s OEM licencí může legálně dál používat kamarád.',
  },
  {
    id: 9,
    part: 'Část B — Operační systémy',
    testRef: 'Otázka B5 b, c z písemky',
    title: 'Architektura: Monolitické jádro vs. Mikrojádro',
    question: 'Jaký je hlavní technický rozdíl mezi monolitickým jádrem a mikrojádrem?',
    options: [
      { letter: 'A', text: 'Monolitické jádro funguje pouze na telefonech, mikrojádro na superpočítačích.' },
      { letter: 'B', text: 'V monolitickém jádře běží většina služeb a ovladačů společně v privilegovaném režimu jádra (Kernel Space), zatímco mikrojádro nechává v jádře jen minimum a ovladače spouští jako izolované procesy v User Space.' },
      { letter: 'C', text: 'Mikrojádro nepodporuje připojení myši ani klávesnice.' },
      { letter: 'D', text: 'V monolitickém jádře nemůže nikdy dojít k pádu systému (modré smrti).' },
    ],
    correctIndex: 1,
    explanation: 'Monolit má vše v jednom prostoru – je proto velmi rychlý, ale chyba v jednom ovladači způsobí pád celého OS. Mikrojádro klade důraz na izolaci: v jádře běží jen plánovač a správa paměti, ovladače běží v uživatelském prostoru a komunikují posíláním zpráv (IPC).',
  },
  {
    id: 10,
    part: 'Část B — Operační systémy',
    testRef: 'Otázka B5 d z písemky',
    title: 'Hardwarové ochranné kruhy (Protection Rings)',
    question: 'K čemu slouží hardwarové ochranné kruhy (Protection Rings) procesoru a čemu mají zabránit?',
    options: [
      { letter: 'A', text: 'Zabraňují přehřátí procesoru při hraní náročných 3D her.' },
      { letter: 'B', text: 'Slouží k zálohování smazaných souborů do koše.' },
      { letter: 'C', text: 'Oddělují privilegovaný kód jádra OS (Ring 0) od běžných aplikací (Ring 3), aby chybující nebo zákeřný program nemohl přímo manipulovat s cizí pamětí nebo ničit hardware.' },
      { letter: 'D', text: 'Slouží k šifrování hesel na sociálních sítích.' },
    ],
    correctIndex: 2,
    explanation: 'CPU hlídá oprávnění na hardwarové úrovni. Běžné uživatelské aplikace běží v neprivilegovaném Ring 3. Pokud chtějí sáhnout na disk, síť nebo přidělit paměť, nemohou to udělat přímo, ale musí požádat jádro OS v Ring 0 přes tzv. systémové volání (Syscall).',
  },
  {
    id: 11,
    part: 'Část B — Operační systémy',
    testRef: 'Otázka B6 z písemky',
    title: 'Výběr jádra v praxi: Letadlo vs. Smart TV',
    question: 'Jaké jádro zvolíte pro řídicí systém dopravního letadla a jaké pro chytrou 4K televizi s hrami?',
    options: [
      { letter: 'A', text: 'Letadlo: Mikrojádro (prioritou je maximální stabilita a izolace chyb) | Televize: Monolitické jádro (prioritou je vysoký grafický výkon a nízká latence).' },
      { letter: 'B', text: 'Letadlo: Monolitické jádro (aby letělo co nejrychleji) | Televize: Mikrojádro (aby se televize nikdy nevypnula).' },
      { letter: 'C', text: 'Pro obě situace se musí použít výhradně DOS, protože moderní jádra jsou nespolehlivá.' },
      { letter: 'D', text: 'Letadlo žádný operační systém nepotřebuje, ovládá se přímo mechanickými lanky.' },
    ],
    correctIndex: 0,
    explanation: 'U letadla (např. systém QNX s mikrojádrem) výpadek senzoru nesmí shodit zbytek systému – služba se v tichosti restartuje. U Smart TV (např. Android/Linux s monolitem) chceme plynulé 4K HDR video a rychlou odezvu grafiky bez latence předávání zpráv.',
  },
];
