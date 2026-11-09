import React from 'react';
import { Cpu, Server, HardDrive, Monitor, Wifi, LayoutDashboard, Gamepad2, Car, Activity, Globe, Refrigerator, Factory, CreditCard } from 'lucide-react';
import { ReviewQuestion } from '@/components/ui/TopicReviewQuiz';

export type Phase = 'builder' | 'crash-test' | 'communication' | 'attack';
export type ArchitectureTarget = 'monolithic' | 'microkernel';

export interface OsModule {
  id: string;
  name: string;
  icon: React.FC<any>;
  core: boolean; // Is it absolutely required in kernel? (e.g. scheduler, ipc)
  alwaysUser?: boolean; // Does it ALWAYS belong in User Space? (e.g. apps, games)
}

export const MODULES: OsModule[] = [
  { id: 'sched', name: 'Plánovač a IPC', icon: Cpu, core: true },
  { id: 'mem', name: 'Základní správa paměti', icon: Server, core: true },
  { id: 'fs', name: 'Souborový systém', icon: HardDrive, core: false },
  { id: 'gpu', name: 'Ovladač grafiky', icon: Monitor, core: false },
  { id: 'net', name: 'Ovladač sítě', icon: Wifi, core: false },
  { id: 'app', name: 'Běžné Programy', icon: LayoutDashboard, core: false, alwaysUser: true },
  { id: 'game', name: 'Hry', icon: Gamepad2, core: false, alwaysUser: true },
];

export const ARCHITECTURE_REVIEW_QUESTIONS: ReviewQuestion[] = [
  {
    id: 1,
    type: 'single',
    category: 'Ochranné kruhy a paměť',
    question: 'Hraješ hru a ta najednou zamrzne a spadne na plochu. Proč nespadl celý operační systém (modrá smrt)?',
    options: [
      'Hra běžela v Kernel Space, který se po chybě umí sám restartovat.',
      'Hra běžela v User Space (Ring 3), který je procesorem izolován od jádra systému. Systém pád ustojí.',
      'Operační systémy dnes už nikdy nepadají.'
    ],
    correctIndices: [1],
    explanation: 'Běžné aplikace a hry běží v neprivilegovaném režimu User Space (Ring 3). Pokud v nich nastane kritická chyba, jádro proces bezpečně ukončí bez ohrožení zbytku systému.'
  },
  {
    id: 2,
    type: 'single',
    category: 'Architektura jádra',
    question: 'Co se přesně stane, když ve Windows (monolitické jádro) dojde ke kritické chybě v ovladači grafické karty?',
    options: [
      'Zkolabuje pouze obrazovka, ale hudba bude hrát dál.',
      'Ovladač grafiky se tiše restartuje v pozadí.',
      'Dojde k pádu celého operačního systému (Modrá smrt / BSOD), protože ovladače běží ve sdíleném Kernel Space.'
    ],
    correctIndices: [2],
    explanation: 'U monolitického/hybridního jádra běží kritické ovladače přímo v Kernel Space (Ring 0). Fatální chyba v ovladači proto může poškodit paměť jádra a vyvolat BSOD.'
  },
  {
    id: 3,
    type: 'single',
    category: 'Architektura jádra',
    question: 'V QNX (mikrojádro v autech) spadne ovladač Bluetooth. Co se stane se systémem ABS (brzdy)?',
    options: [
      'Vůbec nic. Bluetooth modul je izolovaný v User Space a jádro jej pouze restartuje. Brzdy fungují dál.',
      'Auto musí nouzově zastavit a restartovat celý operační systém.',
      'Auto začne samovolně brzdit, protože zpráva o chybě zablokuje procesor.'
    ],
    correctIndices: [0],
    explanation: 'V mikrojádře běží ovladače jako izolované procesy v User Space. Pád Bluetooth ovladače nemá žádný vliv na jádro ani na ostatní služby (jako ABS).'
  },
  {
    id: 4,
    type: 'fill',
    category: 'Ochranné kruhy a paměť',
    question: 'Jak se anglickým termínem (2 slova) označuje chráněná paměťová oblast s neomezenými oprávněními, kde běží jádro OS?',
    correctAnswers: ['kernel space', 'kernelspace', 'jádro', 'jadro'],
    expectedFormat: '2 anglická slova (např. user space)',
    explanation: 'Kernel Space (prostor jádra, Ring 0) je privilegovaná část paměti s plným přístupem k veškerému hardwaru.'
  },
  {
    id: 5,
    type: 'multiple',
    category: 'Ochranné kruhy a paměť',
    question: 'Které z následujících entit mají obvykle plný přístup do Kernel Space (vyber 2)?',
    options: [
      'Samotné jádro operačního systému',
      'Webový prohlížeč Chrome',
      'Ovladač grafické karty (u monolitického jádra)',
      'Aplikace Kalkulačka'
    ],
    correctIndices: [0, 2],
    explanation: 'V Kernel Space běží samotné jádro OS a u monolitických jader také ovladače hardwaru (např. grafické či síťové karty).'
  },
  {
    id: 6,
    type: 'single',
    category: 'Ochranné kruhy a paměť',
    question: 'Kdo v počítači fyzicky (hardwarově) brání tomu, aby program z User Space (Ring 3) zapsal data přímo na disk nebo do cizí paměti?',
    options: [
      'Antivirus',
      'Samotný procesor (CPU) pomocí mechanismu ochranných kruhů (Protection Rings)',
      'Souborový systém FAT32/NTFS'
    ],
    correctIndices: [1],
    explanation: 'Ochranné kruhy (Ring 0 až Ring 3) a jednotka MMU jsou vynucovány přímo v křemíku procesoru (CPU).'
  },
  {
    id: 7,
    type: 'fill',
    category: 'Systémová volání',
    question: 'Program v User Space zjistí, že potřebuje uložit soubor. Sám k disku nesmí. Jak se jmenuje anglický termín (2 slova) pro mechanismus, kterým o to „poprosí“ jádro?',
    correctAnswers: ['system call', 'syscall', 'systémové volání', 'systemove volani'],
    expectedFormat: 'Anglický termín (2 slova)',
    explanation: 'System Call (systémové volání, zkráceně syscall) je oficiální rozhraní, kterým program v User Space žádá jádro o provedení privilegované operace.'
  },
  {
    id: 8,
    type: 'single',
    category: 'Architektura jádra',
    question: 'Proč se tvůrci Windows a Linuxu drží převážně „Monolitického jádra“, když pád ovladače může shodit celý systém?',
    options: [
      'Protože je mikrojádro příliš drahé na licencování.',
      'Kvůli maximálnímu výkonu. V monolitu moduly komunikují napřímo v Ring 0 bez zdržujícího přepínání kontextu a posílání zpráv.',
      'Protože monolitické jádro nelze vůbec zavirovat.'
    ],
    correctIndices: [1],
    explanation: 'V monolitickém jádře spolu všechny subsystémy komunikují přímým voláním funkcí v jedné paměti bez režie IPC zpráv.'
  },
  {
    id: 9,
    type: 'single',
    category: 'Architektura jádra',
    question: 'Pokud chceš postavit absolutně bezpečný systém pro ovládání reaktoru, vybereš mikrojádro. V čem spočívá jeho bezpečí?',
    options: [
      'Jádro je zašifrované 256bitovým klíčem.',
      'Všechny služby, včetně síťových a ovladačů, běží jako „izolované aplikace“ v User Space. V Kernel Space je jen minimum kódu.',
      'Mikrojádro nepovoluje vůbec žádné aplikace třetích stran.'
    ],
    correctIndices: [1],
    explanation: 'Mikrojádro obsahuje jen nejnutnější základ (plánovač, IPC, základní paměť). Všechny ostatní služby běží izolovaně v User Space.'
  },
  {
    id: 10,
    type: 'single',
    category: 'Porovnání architektur',
    question: 'Které tvrzení správně vystihuje hlavní kompromis mezi monolitickým jádrem a mikrojádrem?',
    options: [
      'Monolit nabízí nejvyšší hrubý výkon (ale pád ovladače shodí celý OS), zatímco mikrojádro nabízí špičkovou stabilitu za cenu režie posílání zpráv (IPC).',
      'Mikrojádro je nejrychlejší na hry a těžbu kryptoměn, zatímco monolit se používá jen ve vesmírných sondách.',
      'Monolit i mikrojádro mají identický výkon i bezpečnost.'
    ],
    correctIndices: [0],
    explanation: 'Monolit = rychlost vs. riziko pádu v Ring 0; Mikrojádro = izolace a spolehlivost vs. režie IPC komunikace.'
  },
  {
    id: 11,
    type: 'single',
    category: 'Ochranné kruhy a paměť',
    question: 'Škodlivý kód (Malware) se snaží přečíst hesla, která má v paměti uložená jiný program (např. správce hesel). Co mu v tom zabrání?',
    options: [
      'Nic, každý program v User Space vidí do paměti ostatních programů.',
      'Hardwarová izolace paměti. Procesor povolí programu vidět jen do jeho vlastního přiděleného bloku paměti.',
      'Ovladač grafické karty.'
    ],
    correctIndices: [1],
    explanation: 'Každý proces má svůj vlastní virtuální adresní prostor, který hlídá procesor (MMU) společně s jádrem OS.'
  },
  {
    id: 12,
    type: 'multiple',
    category: 'Systémová volání',
    question: 'Které z následujících činností vyžadují přechod z User Space (Ring 3) do Kernel Space (Ring 0) pomocí System Callu? (Vyber 2)',
    options: [
      'Sečtení dvou velkých čísel v paměti (Kalkulačka)',
      'Přečtení souboru tajnosti.txt z pevného disku',
      'Změna barvy tlačítka ve hře (interní stav aplikace)',
      'Odeslání packetu přes Wi-Fi ovladač na internet'
    ],
    correctIndices: [1, 3],
    explanation: 'Přístup k disku a síťové kartě je komunikace s hardwarem, kterou smí provést pouze jádro na základě System Callu.'
  },
  {
    id: 13,
    type: 'fill',
    category: 'Architektura jádra',
    question: 'Napiš jedno slovo (česky nebo anglicky), jak se jmenuje koncept, při kterém je jádro co nejmenší a většinu práce přenáší na izolované moduly.',
    correctAnswers: ['mikrojádro', 'mikrojadro', 'microkernel', 'mikrokernel'],
    expectedFormat: 'Jedno slovo (např. mikrojádro)',
    explanation: 'Mikrojádro (microkernel) minimalizuje kód běžící v Ring 0 a přesouvá souborový systém i ovladače do User Space.'
  },
  {
    id: 14,
    type: 'single',
    category: 'Ochranné kruhy a paměť',
    question: 'Které „ochranné kruhy“ (Protection Rings) se dnes v moderních OS obvykle VŮBEC nepoužívají a zůstávají prázdné?',
    options: [
      'Ring 0 a Ring 3',
      'Ring 1 a Ring 2',
      'Žádné nezůstávají prázdné.'
    ],
    correctIndices: [1],
    explanation: 'Moderní operační systémy (Windows, Linux, macOS) využívají prakticky pouze Ring 0 (Kernel Space) a Ring 3 (User Space).'
  },
  {
    id: 15,
    type: 'single',
    category: 'Nasazení v praxi',
    question: 'Máš navrhnout systém pro chytré lednice. Chlazení řídí vlastní elektronika, ty děláš jen OS pro dotykový displej. Co zvolíš a proč?',
    options: [
      'Mikrojádro. Lednice je přeci Internet of Things (IoT) a musíme garantovat spolehlivost.',
      'Monolit (např. Linux). Displej lednice není životně kritický systém, potřebuje hlavně výkon pro animace a videa.',
      'Nebudu tam dávat vůbec žádný OS.'
    ],
    correctIndices: [1],
    explanation: 'Dotykový panel řeší multimédia, Wi-Fi a grafiku, kde exceluje Linux (monolit). Samotné chlazení hlídá oddělený mikrokontrolér.'
  },
  {
    id: 16,
    type: 'multiple',
    category: 'Architektura jádra',
    question: 'Proč je vytvoření čistého „Mikrojádra“ programátorsky tak těžké a proto se na PC stále používají Monolity? (Vyber 2)',
    options: [
      'Neustálé posílání zpráv (IPC) mezi izolovanými moduly je složité na vývoj a synchronizaci.',
      'Protože do mikrojádra nejdou vůbec programovat hry.',
      'Protože procesory Intel a AMD nepodporují User Space.',
      'Režie při neustálém přesouvání zpráv snižuje celkový hrubý výkon systému.'
    ],
    correctIndices: [0, 3],
    explanation: 'Meziprocesová komunikace (IPC) přináší vysokou režii přepínání kontextu a složitou synchronizaci mezi desítkami izolovaných serverů.'
  },
  {
    id: 17,
    type: 'single',
    category: 'Porovnání architektur',
    question: 'Která analogie uspořádání pracovníků ve firmě přesně odpovídá Mikrojádru?',
    options: [
      'Všichni sedí v jedné místnosti. Práce jde rychle od ruky, ale když jeden onemocní, nakazí celou firmu.',
      'Každý sedí v zamčené kanceláři. Pokud jeden onemocní, ostatní jsou v bezpečí, ale musí si složitě posílat dopisy přes recepci.',
      'Firma nemá žádné kanceláře a všichni pracují bez pravidel.'
    ],
    correctIndices: [1],
    explanation: 'Zamčené kanceláře představují izolované procesy v User Space a posílání dopisů přes recepci odpovídá IPC komunikaci přes mikrojádro.'
  },
  {
    id: 18,
    type: 'single',
    category: 'Bezpečnost jádra',
    question: 'Představ si, že by někdo hacknul (nebo úmyslně poškodil) Ovladač Disku. V jakém systému by tento útok kompromitoval rovnou samotné jádro?',
    options: [
      'V Monolitickém jádře, protože ovladač běží v nejvyšším oprávnění (Ring 0) společně s jádrem.',
      'V Mikrojádře, protože ovladač disku je absolutním pánem Ring 3.'
    ],
    correctIndices: [0],
    explanation: 'V monolitickém jádře má ovladač disku stejná oprávnění (Ring 0) jako zbytek jádra, takže jeho kompromitace znamená ovládnutí celého OS.'
  },
  {
    id: 19,
    type: 'calc',
    category: 'Ochranné kruhy a paměť',
    question: 'Jaké číslo má ochranný kruh (Protection Ring), ve kterém běží běžné aplikace (Hry, Prohlížeče) a mají zakázáno sahat přímo na hardware?',
    correctAnswers: ['3', 'ring 3'],
    expectedFormat: 'Číslo (0–3)',
    explanation: 'Ring 3 je nejméně privilegovaný ochranný kruh určený pro uživatelské aplikace (User Space).'
  },
  {
    id: 20,
    type: 'single',
    category: 'Nasazení v praxi',
    question: 'Shrnutí: Před sebou máš obří webový e-shop a moderní kardiostimulátor. Jaký je nejlepší návrhový (architektonický) postoj?',
    options: [
      'Kardiostimulátor = Monolit. E-shop = Mikrojádro.',
      'Kardiostimulátor = Mikrojádro (kritičnost vyžaduje maximální izolaci selhání). E-shop = Monolit (potřebujeme extrémní hrubý výkon pro tisíce požadavků).',
      'Obě by měly běžet na stejné architektuře.'
    ],
    correctIndices: [1],
    explanation: 'Životně kritické systémy (kardiostimulátor, letectví, autoprůmysl) volí mikrojádro kvůli izolaci chyb, zatímco datová centra volí monolit (Linux) kvůli propustnosti.'
  }
];

export const USE_CASES = [
  {
    id: 'pc',
    title: 'Herní Počítač / Notebook',
    icon: Monitor,
    correct: 'monolithic',
    explanation: 'Nejde o kritický systém. Když vám při hraní spadne hra nebo zamrzne operační systém (Modrá smrt), je to k vzteku, ale nikomu nehrozí nebezpečí. Prioritou je zde maximální grafický a výpočetní výkon (který monolit poskytuje nejlépe).'
  },
  {
    id: 'car',
    title: 'Chytré auto (Asistenční systémy)',
    icon: Car,
    correct: 'microkernel',
    explanation: 'Extrémně kritický systém. Kdyby chyba v přehrávači hudby (infotainmentu) způsobila pád celého operačního systému v autě jedoucím 130 km/h, následky by byly fatální. Mikrojádro (např. QNX) tyto moduly striktně odděluje od řídících systémů.'
  },
  {
    id: 'pacemaker',
    title: 'Kardiostimulátor',
    icon: Activity,
    correct: 'microkernel',
    explanation: 'Kritický systém. Zařízení udržuje člověka naživu. Uvnitř běží různé služby: např. kritická pro hlídání srdečního rytmu a méně kritická pro Bluetooth odesílání dat lékaři. Kdyby v Bluetooth modulu nastala chyba, mikrojádro jej okamžitě restartuje, aniž by to jakkoliv ohrozilo modul řídící srdce.'
  },
  {
    id: 'server',
    title: 'Webový Server (E-shop)',
    icon: Globe,
    correct: 'monolithic',
    explanation: 'Nejde o život ohrožující systém. Pokud spadne webový server, nenačte se stránka. To sice stojí peníze, ale nikoho to neohrožuje na životě. Prioritou je obsloužit miliony uživatelů co nejrychleji, k čemuž je monolit (např. Linux) díky absenci zdržující interní komunikace ideální.'
  },
  {
    id: 'fridge',
    title: 'Chytrá lednice',
    icon: Refrigerator,
    correct: 'monolithic',
    explanation: 'Monolit (Linux). Ve dveřích lednice běží upravený Linux (Tizen, webOS), který řeší YouTube, Wi-Fi a dotykový displej – to vyžaduje spoustu ovladačů a výpočetního výkonu. Klíčový detail: samotné chlazení řídí zcela nezávislý fyzický čip (MCU), který o Linuxu vůbec neví. Pád displeje tedy jídlo nezkazí, takže plná izolace mikrojádrem by přinesla jen zbytečnou složitost bez reálného přínosu.'
  },
  {
    id: 'robot',
    title: 'Průmyslový robot v továrně',
    icon: Factory,
    correct: 'microkernel',
    explanation: 'Kritický systém. Robotické rameno váží tunu a pohybuje se obrovskou rychlostí. Kdyby se zasekl operační systém, mohlo by někoho zranit nebo zničit linku. Mikrojádro se postará o to, aby služba pro bezpečný pohyb měla vždy absolutní prioritu a nedala se shodit např. chybou síťového ovladače.'
  },
  {
    id: 'atm',
    title: 'Bankomat',
    icon: CreditCard,
    correct: 'monolithic',
    explanation: 'Nejde o fyzicky kritický systém. Uvnitř většinou běží obyčejné Windows. I když je bezpečnost peněz důležitá (tu řeší šifrování na úrovni aplikací), pád operačního systému znamená jen to, že bankomat přestane fungovat a musí se restartovat. Nikoho to na životě neohrozí.'
  }
];
