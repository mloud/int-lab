import React, { useState } from 'react';
import { ArrowLeft, Cpu, ShieldCheck, HardDrive, Monitor, Bug, AlertTriangle, RefreshCw, Layers, CheckCircle2, Server, Wifi, Gamepad2, LayoutDashboard, BookOpen, ArrowDown, ArrowUp, ArrowRight, Car, Activity, Globe, Refrigerator, Factory, CreditCard, Brain } from 'lucide-react';

interface OsArchitectureChapterProps {
  onBack: () => void;
}

type Phase = 'builder' | 'crash-test' | 'communication' | 'attack';
type ArchitectureTarget = 'monolithic' | 'microkernel';

interface OsModule {
  id: string;
  name: string;
  icon: React.FC<any>;
  core: boolean; // Is it absolutely required in kernel? (e.g. scheduler, ipc)
  alwaysUser?: boolean; // Does it ALWAYS belong in User Space? (e.g. apps, games)
}

const MODULES: OsModule[] = [
  { id: 'sched', name: 'Plánovač a IPC', icon: Cpu, core: true },
  { id: 'mem', name: 'Základní správa paměti', icon: Server, core: true },
  { id: 'fs', name: 'Souborový systém', icon: HardDrive, core: false },
  { id: 'gpu', name: 'Ovladač grafiky', icon: Monitor, core: false },
  { id: 'net', name: 'Ovladač sítě', icon: Wifi, core: false },
  { id: 'app', name: 'Běžné Programy', icon: LayoutDashboard, core: false, alwaysUser: true },
  { id: 'game', name: 'Hry', icon: Gamepad2, core: false, alwaysUser: true },
];

type AnswerType = string | string[] | Record<string, string>;

interface QuizQuestion {
  id: string;
  type: 'single' | 'multi' | 'text' | 'match';
  question: string;
  options?: { id: string; text: string }[];
  matchItems?: { left: string[]; right: string[] };
  correct: AnswerType;
}

const ARCHITECTURE_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'single',
    question: 'Hraješ hru a ta najednou zamrzne a spadne na plochu. Proč nespadl celý operační systém (modrá smrt)?',
    options: [
      { id: 'a', text: 'Hra běžela v Kernel Space, který se po chybě umí sám restartovat.' },
      { id: 'b', text: 'Hra běžela v User Space (Ring 3), který je procesorem izolován od jádra systému. Systém pád ustojí.' },
      { id: 'c', text: 'Operační systémy dnes už nikdy nepadají.' }
    ],
    correct: 'b'
  },
  {
    id: 'q2',
    type: 'single',
    question: 'Co se přesně stane, když ve Windows (monolitické jádro) dojde ke kritické chybě v ovladači grafické karty?',
    options: [
      { id: 'a', text: 'Zkolabuje pouze obrazovka, ale hudba bude hrát dál.' },
      { id: 'b', text: 'Ovladač grafiky se tiše restartuje v pozadí.' },
      { id: 'c', text: 'Dojde k pádu celého operačního systému (Modrá smrt / BSOD), protože ovladače běží ve sdíleném Kernel Space.' }
    ],
    correct: 'c'
  },
  {
    id: 'q3',
    type: 'single',
    question: 'V QNX (mikrojádro v autech) spadne ovladač Bluetooth. Co se stane se systémem ABS (brzdy)?',
    options: [
      { id: 'a', text: 'Vůbec nic. Bluetooth modul je izolovaný v User Space a jádro jej pouze restartuje. Brzdy fungují dál.' },
      { id: 'b', text: 'Auto musí nouzově zastavit a restartovat celý operační systém.' },
      { id: 'c', text: 'Auto začne samovolně brzdit, protože zpráva o chybě zablokuje procesor.' }
    ],
    correct: 'a'
  },
  {
    id: 'q4',
    type: 'text',
    question: 'Jak se anglickým termínem (2 slova) označuje chráněná paměťová oblast s neomezenými oprávněními, kde běží jádro OS?',
    correct: 'kernel space'
  },
  {
    id: 'q5',
    type: 'multi',
    question: 'Které z následujících entit mají obvykle plný přístup do Kernel Space (vyber 2)?',
    options: [
      { id: 'a', text: 'Samotné jádro operačního systému' },
      { id: 'b', text: 'Webový prohlížeč Chrome' },
      { id: 'c', text: 'Ovladač grafické karty (u monolitického jádra)' },
      { id: 'd', text: 'Aplikace Kalkulačka' }
    ],
    correct: ['a', 'c']
  },
  {
    id: 'q6',
    type: 'single',
    question: 'Kdo v počítači fyzicky (hardwarově) brání tomu, aby program z User Space (Ring 3) zapsal data přímo na disk nebo do cizí paměti?',
    options: [
      { id: 'a', text: 'Antivirus' },
      { id: 'b', text: 'Samotný procesor (CPU) pomocí mechanismu ochranných kruhů (Protection Rings)' },
      { id: 'c', text: 'Souborový systém FAT32/NTFS' }
    ],
    correct: 'b'
  },
  {
    id: 'q7',
    type: 'text',
    question: 'Program v User Space zjistí, že potřebuje uložit soubor. Sám k disku nesmí. Jak se jmenuje anglický termín (2 slova) pro mechanismus, kterým o to "poprosí" jádro?',
    correct: 'system call'
  },
  {
    id: 'q8',
    type: 'single',
    question: 'Proč se tvůrci Windows a Linuxu drží převážně "Monolitického jádra", když pád ovladače může shodit celý systém?',
    options: [
      { id: 'a', text: 'Protože je mikrojádro příliš drahé na licencování.' },
      { id: 'b', text: 'Kvůli maximálnímu výkonu. V monolitu moduly komunikují napřímo v Ring 0 bez zdržujícího přepínání kontextu a posílání zpráv.' },
      { id: 'c', text: 'Protože monolitické jádro nelze vůbec zavirovat.' }
    ],
    correct: 'b'
  },
  {
    id: 'q9',
    type: 'single',
    question: 'Pokud chceš postavit absolutně bezpečný systém pro ovládání reaktoru, vybereš mikrojádro. V čem spočívá jeho bezpečí?',
    options: [
      { id: 'a', text: 'Jádro je zašifrované 256bitovým klíčem.' },
      { id: 'b', text: 'Všechny služby, včetně síťových a ovladačů, běží jako "izolované aplikace" v User Space. V Kernel Space je jen minimum kódu.' },
      { id: 'c', text: 'Mikrojádro nepovoluje vůbec žádné aplikace třetích stran.' }
    ],
    correct: 'b'
  },
  {
    id: 'q10',
    type: 'match',
    question: 'Přiřaď správnou vlastnost (výhodu/nevýhodu) k typu jádra:',
    matchItems: {
      left: ['Při chybě v síťovém ovladači spadne celý OS', 'Komunikace je zdržována neustálým posíláním zpráv (IPC)', 'Nejlepší architektura pro těžbu kryptoměn nebo herní výkon', 'Nejlepší architektura pro vesmírnou sondu'],
      right: ['Monolit (Nevýhoda)', 'Mikrojádro (Nevýhoda)', 'Monolit (Výhoda)', 'Mikrojádro (Výhoda)']
    },
    correct: {
      'Při chybě v síťovém ovladači spadne celý OS': 'Monolit (Nevýhoda)',
      'Komunikace je zdržována neustálým posíláním zpráv (IPC)': 'Mikrojádro (Nevýhoda)',
      'Nejlepší architektura pro těžbu kryptoměn nebo herní výkon': 'Monolit (Výhoda)',
      'Nejlepší architektura pro vesmírnou sondu': 'Mikrojádro (Výhoda)'
    }
  },
  {
    id: 'q11',
    type: 'single',
    question: 'Škodlivý kód (Malware) se snaží přečíst hesla, která má v paměti uložená jiný program (např. správce hesel). Co mu v tom zabrání?',
    options: [
      { id: 'a', text: 'Nic, každý program v User Space vidí do paměti ostatních programů.' },
      { id: 'b', text: 'Hardwarová izolace paměti. Procesor povolí programu vidět jen do jeho vlastního přiděleného bloku paměti.' },
      { id: 'c', text: 'Ovladač grafické karty.' }
    ],
    correct: 'b'
  },
  {
    id: 'q12',
    type: 'multi',
    question: 'Které z následujících činností vyžadují přechod z User Space (Ring 3) do Kernel Space (Ring 0) pomocí System Callu? (Vyber 2)',
    options: [
      { id: 'a', text: 'Sečtení dvou velkých čísel v paměti (Kalkulačka)' },
      { id: 'b', text: 'Přečtení souboru tajnosti.txt z pevného disku' },
      { id: 'c', text: 'Změna barvy tlačítka ve hře (interní stav aplikace)' },
      { id: 'd', text: 'Odeslání packetu přes Wi-Fi ovladač na internet' }
    ],
    correct: ['b', 'd']
  },
  {
    id: 'q13',
    type: 'text',
    question: 'Napiš jedno slovo (česky nebo anglicky), jak se jmenuje koncept, při kterém je jádro co nejmenší a většinu práce přenáší na izolované moduly.',
    correct: 'mikrojádro'
  },
  {
    id: 'q14',
    type: 'single',
    question: 'Které "ochranné kruhy" (Protection Rings) se dnes v moderních OS obvykle VŮBEC nepoužívají a zůstávají prázdné?',
    options: [
      { id: 'a', text: 'Ring 0 a Ring 3' },
      { id: 'b', text: 'Ring 1 a Ring 2' },
      { id: 'c', text: 'Žádné nezůstávají prázdné.' }
    ],
    correct: 'b'
  },
  {
    id: 'q15',
    type: 'single',
    question: 'Máš navrhnout systém pro chytré lednice. Chlazení řídí vlastní elektronika, ty děláš jen OS pro dotykový displej. Co zvolíš a proč?',
    options: [
      { id: 'a', text: 'Mikrojádro. Lednice je přeci internet of things (IoT) a musíme garantovat spolehlivost.' },
      { id: 'b', text: 'Monolit (např. Linux). Displej lednice není životně kritický systém, potřebuje hlavně výkon pro animace a videa.' },
      { id: 'c', text: 'Nebudu tam dávat vůbec žádný OS.' }
    ],
    correct: 'b'
  },
  {
    id: 'q16',
    type: 'multi',
    question: 'Proč je vytvoření čistého "Mikrojádra" programátorsky tak těžké a proto se na PC stále používají Monolity? (Vyber 2)',
    options: [
      { id: 'a', text: 'Neustálé posílání zpráv (IPC) mezi izolovanými moduly je složité na vývoj a synchronizaci.' },
      { id: 'b', text: 'Protože do mikrojádra nejdou vůbec programovat hry.' },
      { id: 'c', text: 'Protože procesory Intel a AMD nepodporují User Space.' },
      { id: 'd', text: 'Režie při neustálém přesouvání zpráv snižuje celkový hrubý výkon systému.' }
    ],
    correct: ['a', 'd']
  },
  {
    id: 'q17',
    type: 'match',
    question: 'Srovnej analogii uspořádání pracovníků ve firmě s typem jádra:',
    matchItems: {
      left: ['Všichni sedí v jedné místnosti. Práce jde rychle od ruky. Když ale jeden onemocní (spadne), nakazí celou firmu.', 'Každý sedí v zamčené kanceláři. Pokud jeden onemocní, ostatní jsou v bezpečí. Musí si ale složitě posílat dopisy.'],
      right: ['Monolit (Rychlost vs. Zranitelnost)', 'Mikrojádro (Bezpečí vs. Pomalost)']
    },
    correct: {
      'Všichni sedí v jedné místnosti. Práce jde rychle od ruky. Když ale jeden onemocní (spadne), nakazí celou firmu.': 'Monolit (Rychlost vs. Zranitelnost)',
      'Každý sedí v zamčené kanceláři. Pokud jeden onemocní, ostatní jsou v bezpečí. Musí si ale složitě posílat dopisy.': 'Mikrojádro (Bezpečí vs. Pomalost)'
    }
  },
  {
    id: 'q18',
    type: 'single',
    question: 'Představ si, že by někdo hacknul (nebo úmyslně poškodil) Ovladač Disku. V jakém systému by tento útok kompromitoval rovnou samotné jádro?',
    options: [
      { id: 'a', text: 'V Monolitickém jádře, protože ovladač běží v nejvyšším oprávnění (Ring 0) společně s jádrem.' },
      { id: 'b', text: 'V Mikrojádře, protože ovladač disku je absolutním pánem Ring 3.' }
    ],
    correct: 'a'
  },
  {
    id: 'q19',
    type: 'text',
    question: 'Jaké číslo má ochranný kruh (Protection Ring), ve kterém běží běžné aplikace (Hry, Prohlížeče) a mají zakázáno sahat přímo na hardware?',
    correct: '3'
  },
  {
    id: 'q20',
    type: 'single',
    question: 'Shrnutí: Před sebou máš obří webový e-shop a moderní kardiostimulátor. Jaký je nejlepší návrhový (architektonický) postoj?',
    options: [
      { id: 'a', text: 'Kardiostimulátor = Monolit. E-shop = Mikrojádro.' },
      { id: 'b', text: 'Kardiostimulátor = Mikrojádro (kritičnost vyžaduje maximální izolaci selhání). E-shop = Monolit (potřebujeme extrémní hrubý výkon pro tisíce požadavků).' },
      { id: 'c', text: 'Obě by měly běžet na stejné architektuře.' }
    ],
    correct: 'b'
  }
];

const OsArchitectureChapter: React.FC<OsArchitectureChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'practice' | 'use-cases' | 'quiz'>('theory');
  const [phase, setPhase] = useState<Phase>('builder');

  // Quiz State
  const [answers, setAnswers] = useState<Record<string, AnswerType>>({});
  const [evaluated, setEvaluated] = useState(false);
  const [score, setScore] = useState(0);

  const handleSingleSelect = (qId: string, optionId: string) => {
    if (evaluated) return;
    setAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const handleMultiSelect = (qId: string, optionId: string) => {
    if (evaluated) return;
    const current = (answers[qId] as string[]) || [];
    if (current.includes(optionId)) {
      setAnswers(prev => ({ ...prev, [qId]: current.filter(id => id !== optionId) }));
    } else {
      setAnswers(prev => ({ ...prev, [qId]: [...current, optionId] }));
    }
  };

  const handleTextChange = (qId: string, value: string) => {
    if (evaluated) return;
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleMatchChange = (qId: string, leftItem: string, rightItem: string) => {
    if (evaluated) return;
    const current = (answers[qId] as Record<string, string>) || {};
    setAnswers(prev => ({ ...prev, [qId]: { ...current, [leftItem]: rightItem } }));
  };

  const checkAnswer = (q: QuizQuestion, userAns: AnswerType): boolean => {
    if (!userAns) return false;
    
    if (q.type === 'single') {
      return q.correct === userAns;
    }
    if (q.type === 'text') {
      const uText = (userAns as string).toLowerCase().trim();
      const cText = (q.correct as string).toLowerCase().trim();
      if (cText === 'system call' && (uText === 'syscall' || uText === 'systémové volání' || uText === 'systemove volani')) return true;
      if (cText === 'kernel space' && (uText === 'kernelspace' || uText === 'jádro' || uText === 'jadro')) return true;
      if (cText === 'mikrojádro' && (uText === 'microkernel' || uText === 'mikrojadro')) return true;
      
      return uText === cText || uText.replace('-', '') === cText.replace('-', '');
    }
    if (q.type === 'multi') {
      const uArr = [...(userAns as string[])].sort();
      const cArr = [...(q.correct as string[])].sort();
      if (uArr.length !== cArr.length) return false;
      return uArr.every((val, index) => val === cArr[index]);
    }
    if (q.type === 'match') {
      const uDict = userAns as Record<string, string>;
      const cDict = q.correct as Record<string, string>;
      for (const key in cDict) {
        if (uDict[key] !== cDict[key]) return false;
      }
      return Object.keys(uDict).length === Object.keys(cDict).length;
    }
    return false;
  };

  const handleEvaluate = () => {
    let currentScore = 0;
    ARCHITECTURE_QUIZ.forEach(q => {
      if (checkAnswer(q, answers[q.id])) currentScore++;
    });
    setScore(currentScore);
    setEvaluated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Builder State
  const [builderTarget, setBuilderTarget] = useState<ArchitectureTarget>('monolithic');
  const [activeSpace, setActiveSpace] = useState<'user' | 'kernel'>('kernel');
  const [userSpace, setUserSpace] = useState<string[]>([]);
  const [kernelSpace, setKernelSpace] = useState<string[]>([]);
  const [unassigned, setUnassigned] = useState<string[]>(MODULES.map(m => m.id));
  const [builderMessage, setBuilderMessage] = useState<string>('Přesuňte moduly do správných prostorů.');

  // Crash Test State
  const [crashState, setCrashState] = useState<'running' | 'crashed-mono' | 'recovering-micro'>('running');
  const [crashedModule, setCrashedModule] = useState<string | null>(null);

  // Communication State
  const [commState, setCommState] = useState<'idle' | 'syscall-request' | 'syscall-kernel' | 'syscall-driver' | 'syscall-done'>('idle');

  // Attack Simulation State
  const [attackState, setAttackState] = useState<'idle' | 'trying' | 'blocked'>('idle');
  const [attackTarget, setAttackTarget] = useState<'mem' | 'exec' | null>(null);

  // Hybrid Kernel expand
  const [showHybrid, setShowHybrid] = useState(false);

  // Use Cases Minigame State
  const [useCaseIndex, setUseCaseIndex] = useState(0);
  const [useCaseFeedback, setUseCaseFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [useCaseSelected, setUseCaseSelected] = useState<ArchitectureTarget | null>(null);

  const USE_CASES = [
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

  const handleUseCaseAnswer = (answer: ArchitectureTarget) => {
    setUseCaseSelected(answer);
    if (answer === USE_CASES[useCaseIndex].correct) {
      setUseCaseFeedback('correct');
    } else {
      setUseCaseFeedback('wrong');
    }
  };

  const nextUseCase = () => {
    setUseCaseFeedback('idle');
    setUseCaseSelected(null);
    setUseCaseIndex((prev) => (prev + 1) % USE_CASES.length);
  };

  // --- BUILDER LOGIC ---
  const handleMoveModule = (moduleId: string, targetSpace: 'user' | 'kernel' | 'unassigned') => {
    setUserSpace(prev => prev.filter(id => id !== moduleId));
    setKernelSpace(prev => prev.filter(id => id !== moduleId));
    setUnassigned(prev => prev.filter(id => id !== moduleId));

    if (targetSpace === 'user') setUserSpace(prev => [...prev, moduleId]);
    if (targetSpace === 'kernel') setKernelSpace(prev => [...prev, moduleId]);
    if (targetSpace === 'unassigned') setUnassigned(prev => [...prev, moduleId]);
  };

  const checkBuilder = () => {
    if (unassigned.length > 0) {
      setBuilderMessage('Musíš umístit všechny moduly!');
      return;
    }

    if (builderTarget === 'monolithic') {
      const expectedKernel = MODULES.filter(m => !m.alwaysUser).map(m => m.id);
      const expectedUser = MODULES.filter(m => m.alwaysUser).map(m => m.id);

      const isKernelCorrect = expectedKernel.every(id => kernelSpace.includes(id)) && kernelSpace.length === expectedKernel.length;
      const isUserCorrect = expectedUser.every(id => userSpace.includes(id)) && userSpace.length === expectedUser.length;

      if (isKernelCorrect && isUserCorrect) {
        setBuilderMessage('Výborně! Postavil jsi monolitické jádro. Ovladače a služby běží uvnitř, zatímco programy v User Space.');
        setTimeout(() => {
          setBuilderTarget('microkernel');
          setUnassigned(MODULES.map(m => m.id));
          setUserSpace([]);
          setKernelSpace([]);
          setBuilderMessage('Nyní postav Mikrojádro! Ovladače musí ven, v Kernel Space zůstane jen to nejnutnější.');
        }, 4000);
      } else {
        setBuilderMessage('Chyba: V monolitickém jádře patří Ovladače a FS do Kernel Space, ale Hry a Aplikace musí zůstat v User Space!');
      }
    } else {
      // Mikrojádro
      const coreModules = MODULES.filter(m => m.core).map(m => m.id);
      const nonCoreModules = MODULES.filter(m => !m.core).map(m => m.id);

      const kernelHasOnlyCore = kernelSpace.every(id => coreModules.includes(id)) && kernelSpace.length === coreModules.length;
      const userHasNonCore = userSpace.every(id => nonCoreModules.includes(id)) && userSpace.length === nonCoreModules.length;

      if (kernelHasOnlyCore && userHasNonCore) {
        setBuilderMessage('Skvělé! Vytvořil jsi čisté mikrojádro. Ovladače a souborové systémy jsou bezpečně izolované v User Space.');
        setTimeout(() => {
          setPhase('crash-test');
        }, 4000);
      } else {
        setBuilderMessage('Chyba: Mikrojádro má v Kernel Space pouze plánovač a základní paměť. Zbytek musí být v User Space!');
      }
    }
  };

  // --- CRASH TEST LOGIC ---
  const injectBug = (moduleId: string) => {
    setCrashedModule(moduleId);
    setCrashState('crashed-mono');

    setTimeout(() => {
      setCrashState('recovering-micro');
      setTimeout(() => {
        setCrashState('running');
        setCrashedModule(null);
      }, 3000);
    }, 3000);
  };

  // --- COMMUNICATION LOGIC ---
  const advanceCommStep = () => {
    if (commState === 'idle') setCommState('syscall-request');
    else if (commState === 'syscall-request') setCommState('syscall-kernel');
    else if (commState === 'syscall-kernel') setCommState('syscall-driver');
    else if (commState === 'syscall-driver') setCommState('syscall-done');
    else if (commState === 'syscall-done') setCommState('idle');
  };

  // --- ATTACK SIMULATION LOGIC ---
  const handleAttack = (target: 'mem' | 'exec') => {
    setAttackTarget(target);
    setAttackState('trying');
    setTimeout(() => setAttackState('blocked'), 1500);
  };
  const resetAttack = () => { setAttackState('idle'); setAttackTarget(null); };

  // --- RENDER HELPERS ---
  const renderModule = (moduleId: string, onClickAction?: (id: string) => void) => {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod) return null;
    const Icon = mod.icon;
    return (
      <div 
        key={mod.id}
        onClick={() => onClickAction && onClickAction(mod.id)}
        className={`p-3 bg-white rounded-xl shadow-sm border-2 border-gray-100 flex items-center gap-3 ${onClickAction ? 'cursor-pointer hover:border-blue-400 hover:shadow-md transition-all' : ''}`}
      >
        <div className="p-2 bg-gray-100 rounded-lg"><Icon className="w-5 h-5 text-gray-700" /></div>
        <span className="font-bold text-sm text-gray-700">{mod.name}</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl w-full min-h-screen p-4 flex flex-col items-center animate-in fade-in duration-500">
      <div className="w-full flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
      </div>

      <div className="w-full max-w-5xl bg-white p-2 rounded-2xl flex shadow-sm border border-slate-200 mb-6 sticky top-4 z-50 overflow-x-auto">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'theory' ? 'bg-purple-50 text-purple-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <BookOpen className="w-5 h-5" /> Teorie
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'practice' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Cpu className="w-5 h-5" /> Jdeme si to postavit
        </button>
        <button
          onClick={() => setActiveTab('use-cases')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'use-cases' ? 'bg-green-50 text-green-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Gamepad2 className="w-5 h-5" /> Kde se co používá?
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'quiz' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Brain className="w-5 h-5" /> Ověření znalostí
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl w-full rounded-[3rem] shadow-2xl border-4 border-white p-8 sm:p-12 overflow-hidden relative min-h-[600px]">
        
        {activeTab === 'theory' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Architektura Jádra OS</h1>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                Jádro (Kernel) je mozek operačního systému. Může být postaveno jako obří pevnost, kde všichni pracují společně (Monolit), nebo jako malé velitelství, které většinu práce deleguje ven (Mikrojádro).
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
              {/* Kernel Space Info */}
              <div className="bg-slate-100 p-6 rounded-3xl border-2 border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5"><Cpu className="w-32 h-32" /></div>
                <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-widest"><ShieldCheck className="text-slate-600"/> Kernel Space (Jádro)</h3>
                <ul className="text-sm text-slate-700 space-y-3 relative z-10">
                  <li><strong className="text-slate-900 block mb-1">Co to je:</strong> Chráněná část paměti, kde běží jádro OS a ovladače.</li>
                  <li><strong className="text-slate-900 block mb-1">Oprávnění:</strong> Má plný a neomezený přístup k hardwaru a všem paměťovým adresám.</li>
                  <li><strong className="text-red-600 block mb-1">Riziko:</strong> Chyba nebo pád v tomto prostoru obvykle znamená zkolabování celého systému (Modrá smrt / Kernel panic).</li>
                </ul>
              </div>

              {/* User Space Info */}
              <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-200 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5"><LayoutDashboard className="w-32 h-32" /></div>
                <h3 className="text-xl font-black text-blue-800 mb-4 flex items-center gap-2 uppercase tracking-widest"><LayoutDashboard className="text-blue-600"/> User Space (Uživatel)</h3>
                <ul className="text-sm text-blue-800 space-y-3 relative z-10">
                  <li><strong className="text-blue-900 block mb-1">Co to je:</strong> Prostor, kde běží běžné uživatelské aplikace, hry nebo prohlížeče.</li>
                  <li><strong className="text-blue-900 block mb-1">Oprávnění (Klec):</strong> Omezená práva. Aplikace nemůže přistupovat přímo k hardwaru ani do paměti jiných aplikací.</li>
                  <li><strong className="text-blue-900 block mb-1">Komunikace (System Call):</strong> Když program potřebuje hardware (např. uložit soubor), musí požádat jádro pomocí tzv. Systémového volání.</li>
                  <li><strong className="text-green-600 block mb-1">Bezpečnost:</strong> Pokud spadne aplikace v User space, systém to ustojí a program lze jednoduše zavřít.</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Monolithic */}
              <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-200">
                <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
                  <Layers className="w-8 h-8 text-slate-600" /> Monolitické Jádro
                </h2>
                <p className="text-sm text-slate-600 mb-6">Příklad: Linux, Windows, macOS</p>
                
                <div className="border-4 border-dashed border-red-300 rounded-2xl p-4 mb-4 bg-red-50/50">
                  <div className="text-center text-xs font-bold text-red-400 uppercase mb-2">User Space (Uživatelský prostor)</div>
                  <div className="flex justify-center gap-2">
                    <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-sm font-bold text-gray-600">Aplikace</div>
                    <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-sm font-bold text-gray-600">Hry</div>
                  </div>
                </div>

                <div className="border-4 border-slate-300 rounded-2xl p-6 bg-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-slate-300 px-3 py-1 rounded-bl-xl text-xs font-bold text-slate-700 uppercase">Kernel Space</div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2"><Cpu className="w-6 h-6 text-slate-600"/><span className="text-xs font-bold text-center">Plánovač</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2"><HardDrive className="w-6 h-6 text-slate-600"/><span className="text-xs font-bold text-center">Souborový systém</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2"><Monitor className="w-6 h-6 text-slate-600"/><span className="text-xs font-bold text-center">Ovladač Grafiky</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2"><Wifi className="w-6 h-6 text-slate-600"/><span className="text-xs font-bold text-center">Ovladač Sítě</span></div>
                  </div>
                </div>
                <div className="mt-6 text-sm text-slate-600 bg-white p-4 rounded-xl border border-slate-200">
                  <strong className="text-green-600">Výhody:</strong> Extrémně rychlé, moduly spolu komunikují napřímo.<br/>
                  <strong className="text-red-600">Nevýhody:</strong> Pokud spadne jeden ovladač, spadne celý systém (Modrá smrt).
                </div>
              </div>

              {/* Microkernel */}
              <div className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-200">
                <h2 className="text-2xl font-black text-blue-800 mb-2 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-blue-600" /> Mikrojádro
                </h2>
                <p className="text-sm text-blue-600 mb-6">Příklad: QNX (Auta), MINIX, seL4</p>
                
                <div className="border-4 border-dashed border-blue-300 rounded-2xl p-6 mb-4 bg-blue-100/50">
                  <div className="text-center text-xs font-bold text-blue-500 uppercase mb-2">User Space (Uživatelský prostor)</div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2 border-2 border-blue-200"><HardDrive className="w-6 h-6 text-blue-600"/><span className="text-xs font-bold text-center">Souborový systém</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2 border-2 border-blue-200"><Monitor className="w-6 h-6 text-blue-600"/><span className="text-xs font-bold text-center">Ovladač Grafiky</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2 border-2 border-blue-200"><Wifi className="w-6 h-6 text-blue-600"/><span className="text-xs font-bold text-center">Ovladač Sítě</span></div>
                    <div className="p-3 bg-white rounded-xl shadow-sm flex flex-col items-center gap-2 border-2 border-gray-200"><span className="text-xs font-bold text-center">Běžné Aplikace</span></div>
                  </div>
                </div>

                <div className="border-4 border-blue-400 rounded-2xl p-4 bg-blue-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-600 px-3 py-1 rounded-bl-xl text-xs font-bold text-white uppercase">Kernel Space</div>
                  <div className="flex justify-center gap-3 mt-4">
                    <div className="px-4 py-2 bg-white rounded-xl shadow-sm flex items-center gap-2"><Cpu className="w-5 h-5 text-blue-600"/><span className="text-xs font-bold">Základní Plánovač</span></div>
                  </div>
                </div>
                <div className="mt-6 text-sm text-blue-800 bg-white p-4 rounded-xl border border-blue-200">
                  <strong className="text-green-600">Výhody:</strong> Extrémně bezpečné. Pokud spadne ovladač, jen se restartuje bez pádu OS.<br/>
                  <strong className="text-orange-600">Nevýhody:</strong> Pomalejší, protože všechno musí posílat zprávy (IPC) k mikrojádru.
                </div>
              </div>
            </div>

            {/* Hybridní jádro – rozbalovací sekce */}
            <div className="max-w-4xl mx-auto mb-12">
              <button
                onClick={() => setShowHybrid(prev => !prev)}
                className="w-full flex items-center justify-between px-6 py-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Layers className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-black text-purple-800 text-sm uppercase tracking-widest">Rozšíření: Hybridní jádro</div>
                    <div className="text-xs text-purple-500 font-medium">Windows NT, macOS XNU, Android — kde to skutečně běží</div>
                  </div>
                </div>
                <div className={`w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center transition-transform duration-300 ${showHybrid ? 'rotate-180' : ''}`}>
                  <ArrowDown className="w-4 h-4 text-purple-700" />
                </div>
              </button>

              {showHybrid && (
                <div className="mt-2 bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border-2 border-purple-200 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-sm text-purple-800 leading-relaxed mb-6">
                    Hybridní jádro bere <strong>rychlost monolitu</strong> a kombinuje ji s <strong>bezpečností mikrojádra</strong>.
                    Nejpoužívanější ovladače (grafika, sítě) běží přímo v Kernel Space pro maximální výkon, zatímco méně kritické
                    služby mohou být izolovány v User Space. Na rozdíl od čistého monolitu (jako je klasický Linux kernel)
                    přidává hybridní jádro vrstvu abstrakce a selektivní izolaci.
                    <strong> Windows NT, macOS i Android jsou hybridní jádra</strong> — operační systémy, ve kterých
                    žijete každý den, a přesto nejsou ani čistý monolit, ani čisté mikrojádro.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-xs text-amber-800 font-medium">
                    💡 <strong>Proč Linux v monolitu a Android v hybridu?</strong> Android používá Linuxové jádro jako základ,
                    ale přidává nad něj vlastní HAL (Hardware Abstraction Layer) vrstvu a Google Play Services v User Space —
                    to z něj dělá de facto hybridní architekturu, i když základní jádro je stále monolit.
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-2xl border-2 border-purple-100 text-center shadow-sm">
                      <Monitor className="w-7 h-7 text-purple-500 mx-auto mb-2" />
                      <div className="text-xs font-black text-purple-700 uppercase tracking-wide">Windows NT</div>
                      <div className="text-[11px] text-slate-500 mt-1">Hybridní od verze 3.1 (1993)</div>
                      <div className="text-[10px] text-slate-400 mt-1">Mach + vlastní Executive vrstva</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border-2 border-purple-100 text-center shadow-sm">
                      <Cpu className="w-7 h-7 text-purple-500 mx-auto mb-2" />
                      <div className="text-xs font-black text-purple-700 uppercase tracking-wide">macOS (XNU)</div>
                      <div className="text-[11px] text-slate-500 mt-1">Mach mikrojádro + BSD monolit</div>
                      <div className="text-[10px] text-slate-400 mt-1">Nejčistší hybridní architektura</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border-2 border-purple-100 text-center shadow-sm">
                      <Wifi className="w-7 h-7 text-purple-500 mx-auto mb-2" />
                      <div className="text-xs font-black text-purple-700 uppercase tracking-wide">Android (Linux)</div>
                      <div className="text-[11px] text-slate-500 mt-1">Linux kernel + HAL + Binder IPC</div>
                      <div className="text-[10px] text-slate-400 mt-1">Hybridní systémem HAL vrstvy</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ochranné kruhy (Protection Rings) */}
            <div className="bg-white p-8 rounded-3xl border-2 border-indigo-100 shadow-sm mb-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-black text-indigo-900 mb-4 uppercase flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-indigo-500" /> Hardwarové kruhy (Rings)
                </h2>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  To, co software označuje jako <strong>User Space</strong> a <strong>Kernel Space</strong>, ve skutečnosti hlídá fyzicky sám procesor (hardware) pomocí tzv. <strong>Ochranných kruhů (Protection Rings)</strong>.
                </p>
                <ul className="space-y-4 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 font-black rounded-full flex items-center justify-center flex-shrink-0">3</div>
                    <div>
                      <strong className="text-blue-800">Ring 3 (Aplikace)</strong><br/>
                      Procesor dovolí programu použít pouze bezpečné instrukce (sčítání, násobení) a sáhnout jen do vlastní vyhrazené paměti. Pokus o formátování disku procesor zablokuje.
                    </div>
                  </li>
                  <li className="flex gap-3 opacity-60">
                    <div className="w-8 h-8 bg-slate-200 text-slate-500 font-black rounded-full flex items-center justify-center flex-shrink-0">1, 2</div>
                    <div>
                      <strong className="text-slate-600">Ring 1 a 2</strong><br/>
                      Historicky určeno pro ovladače. Dnes se v běžných OS (Windows/Linux) většinou nepoužívají.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-8 h-8 bg-red-100 text-red-700 font-black rounded-full flex items-center justify-center flex-shrink-0">0</div>
                    <div>
                      <strong className="text-red-800">Ring 0 (Jádro OS)</strong><br/>
                      "Božský režim". Procesor odemkne naprosto všechny instrukce a dovolí Jádru přistupovat ke kterémukoliv hardwaru a celé paměti RAM.
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="w-64 h-64 relative flex-shrink-0">
                {/* Ring 3 */}
                <div className="absolute inset-0 bg-blue-50 border-4 border-blue-200 rounded-full flex items-start justify-center pt-2 shadow-inner">
                  <span className="font-black text-blue-800 text-sm">Ring 3</span>
                </div>
                {/* Ring 1 & 2 */}
                <div className="absolute inset-8 bg-slate-50 border-4 border-slate-200 rounded-full flex items-start justify-center pt-3 shadow-inner">
                  <span className="font-black text-slate-400 text-[10px] uppercase">Ring 1, 2 (Prázdné)</span>
                </div>
                {/* Ring 0 */}
                <div className="absolute inset-16 bg-red-50 border-4 border-red-300 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <ShieldCheck className="w-8 h-8 text-red-500 mx-auto mb-1" />
                    <span className="font-black text-red-800 text-lg leading-none">Ring 0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={() => setActiveTab('practice')}
                className="px-8 py-4 bg-gray-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Jdeme si to postavit!
              </button>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="animate-in fade-in duration-500 flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-2 mb-10 bg-slate-50 p-2 rounded-2xl border border-slate-200">
              <button onClick={() => setPhase('builder')} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${phase === 'builder' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>1. Skládačka</button>
              <button onClick={() => setPhase('crash-test')} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${phase === 'crash-test' ? 'bg-red-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>2. Crash Test</button>
              <button onClick={() => setPhase('communication')} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${phase === 'communication' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>3. Paměť</button>
              <button onClick={() => { resetAttack(); setPhase('attack'); }} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${phase === 'attack' ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>🏴‍☠️ 4. Útok</button>
            </div>

            {phase === 'builder' && (
              <div className="animate-in fade-in zoom-in-95 duration-500 w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Stavba OS: <span className={builderTarget === 'monolithic' ? 'text-slate-600' : 'text-blue-600'}>{builderTarget === 'monolithic' ? 'Monolitické Jádro' : 'Mikrojádro'}</span></h1>
              <p className="text-gray-600 font-medium bg-yellow-50 inline-block px-4 py-2 rounded-xl border border-yellow-200">
                💡 <strong>Tip:</strong> Nejprve kliknutím vyber aktivní zónu (červeně/modře orámovanou) a následně klikej na moduly pro jejich přesun. Moduly v zónách se kliknutím vrátí zpět.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              {/* Zdroje */}
              <div className="lg:w-1/3 bg-gray-50 rounded-3xl p-6 border-2 border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Nezařazené moduly</h3>
                <div className="flex flex-col gap-3 min-h-[200px]">
                  {unassigned.map(id => renderModule(id, (modId) => handleMoveModule(modId, activeSpace)))}
                  {unassigned.length === 0 && <div className="text-center text-gray-400 italic py-10">Vše umístěno</div>}
                </div>
              </div>

              {/* Cíle */}
              <div className="lg:w-2/3 flex flex-col gap-6">
                <div 
                  onClick={() => setActiveSpace('user')}
                  className={`rounded-3xl p-6 border-4 cursor-pointer transition-all ${activeSpace === 'user' ? 'bg-red-50/80 border-red-400 shadow-md ring-4 ring-red-100' : 'bg-red-50/30 border-red-200 border-dashed hover:bg-red-50/50'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-sm font-bold uppercase tracking-widest ${activeSpace === 'user' ? 'text-red-600' : 'text-red-400'}`}>User Space (Uživatel) {activeSpace === 'user' && '(Aktivní)'}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 min-h-[100px] p-4 bg-white/50 rounded-2xl">
                    {userSpace.map(id => renderModule(id, (modId) => handleMoveModule(modId, 'unassigned')))}
                    {userSpace.length === 0 && <div className="text-center text-red-300 italic w-full py-4">Zatím prázdné</div>}
                  </div>
                </div>

                <div 
                  onClick={() => setActiveSpace('kernel')}
                  className={`rounded-3xl p-6 border-4 cursor-pointer transition-all ${activeSpace === 'kernel' ? 'bg-slate-100 border-slate-400 shadow-md ring-4 ring-slate-200' : 'bg-slate-50 border-slate-200 border-dashed hover:bg-slate-100'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-sm font-bold uppercase tracking-widest ${activeSpace === 'kernel' ? 'text-slate-700' : 'text-slate-400'}`}>Kernel Space (Jádro) {activeSpace === 'kernel' && '(Aktivní)'}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 min-h-[100px] p-4 bg-white/50 rounded-2xl">
                    {kernelSpace.map(id => renderModule(id, (modId) => handleMoveModule(modId, 'unassigned')))}
                    {kernelSpace.length === 0 && <div className="text-center text-slate-400 italic w-full py-4">Zatím prázdné</div>}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-blue-800 font-bold flex items-center gap-3">
                <div className="p-2 bg-blue-200 rounded-full flex-shrink-0"><AlertTriangle className="w-5 h-5 text-blue-600"/></div>
                <span>{builderMessage}</span>
              </div>
              <button 
                onClick={checkBuilder}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md uppercase tracking-widest transition-transform active:scale-95 whitespace-nowrap"
              >
                Zkontrolovat
              </button>
            </div>
          </div>
        )}

        {phase === 'crash-test' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-center w-full">
            <h1 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Crash Test Simulátor</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Co se stane, když se v ovladači vyskytne fatální chyba (např. dělení nulou)? Vyberte modul a způsobněte chybu!
            </p>

            <div className="flex justify-center flex-wrap gap-4 mb-10">
              <button onClick={() => injectBug('net')} disabled={crashState !== 'running'} className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-bold border-2 border-red-300 rounded-xl flex items-center gap-2 disabled:opacity-50 transition-all active:scale-95">
                <Bug className="w-5 h-5" /> Zničit Síťový ovladač
              </button>
              <button onClick={() => injectBug('gpu')} disabled={crashState !== 'running'} className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-bold border-2 border-red-300 rounded-xl flex items-center gap-2 disabled:opacity-50 transition-all active:scale-95">
                <Bug className="w-5 h-5" /> Zničit Grafický ovladač
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Monolithic crash state */}
              <div className={`p-8 rounded-3xl border-4 transition-all duration-500 ${crashState === 'crashed-mono' ? 'bg-blue-600 border-blue-800' : 'bg-slate-100 border-slate-300'}`}>
                <h2 className={`text-2xl font-black mb-6 uppercase tracking-widest ${crashState === 'crashed-mono' ? 'text-white' : 'text-slate-800'}`}>Monolit</h2>
                
                {crashState === 'crashed-mono' ? (
                  <div className="flex flex-col items-center justify-center h-48 animate-in zoom-in">
                    <AlertTriangle className="w-16 h-16 text-white mb-4 animate-bounce" />
                    <div className="text-white font-mono text-xl text-center">
                      :( KERNEL PANIC<br/>
                      <span className="text-sm font-sans mt-2 block">Systém byl zastaven, aby nedošlo k poškození dat. Ovladač způsobil pád celého jádra.</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 h-48">
                    <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><HardDrive/></div>
                    <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><Cpu/></div>
                    <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><Monitor/></div>
                    <div className="bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200"><Wifi/></div>
                  </div>
                )}
              </div>

              {/* Microkernel crash state */}
              <div className="p-8 rounded-3xl border-4 bg-blue-50 border-blue-200 relative overflow-hidden transition-all duration-500">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-widest text-blue-800">Mikrojádro</h2>
                
                <div className="grid grid-cols-2 gap-4 h-48 relative z-10">
                  <div className="bg-white rounded-xl flex items-center justify-center font-bold text-blue-500 shadow-sm border-2 border-blue-100"><HardDrive/></div>
                  
                  {/* The crashed module */}
                  <div className={`rounded-xl flex items-center justify-center font-bold shadow-sm transition-all duration-300 ${
                    crashState !== 'running' && crashedModule === 'gpu' 
                      ? 'bg-red-500 text-white border-2 border-red-700 animate-pulse' 
                      : 'bg-white text-blue-500 border-2 border-blue-100'
                  }`}>
                    {crashState !== 'running' && crashedModule === 'gpu' ? <RefreshCw className="w-8 h-8 animate-spin" /> : <Monitor/>}
                  </div>
                  
                  <div className={`rounded-xl flex items-center justify-center font-bold shadow-sm transition-all duration-300 ${
                    crashState !== 'running' && crashedModule === 'net' 
                      ? 'bg-red-500 text-white border-2 border-red-700 animate-pulse' 
                      : 'bg-white text-blue-500 border-2 border-blue-100'
                  }`}>
                    {crashState !== 'running' && crashedModule === 'net' ? <RefreshCw className="w-8 h-8 animate-spin" /> : <Wifi/>}
                  </div>

                  <div className="bg-blue-600 rounded-xl flex flex-col items-center justify-center font-bold text-white shadow-sm border-2 border-blue-800">
                    <Cpu className="mb-1"/>
                    <span className="text-[10px] tracking-wider uppercase">Micro-Kernel</span>
                  </div>
                </div>

                {crashState !== 'running' && (
                  <div className="absolute inset-x-0 bottom-2 text-center z-20 animate-in fade-in slide-in-from-bottom-2">
                    {crashState === 'crashed-mono' ? (
                      <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full border border-red-400 shadow-sm inline-flex items-center gap-1 animate-pulse">
                        💥 MONOLIT: Celý systém zkolaboval. Nutný restart!
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-300 shadow-sm inline-flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" /> MIKROJÁDRO: Ovladač restartován za ~2.3s. OS funguje dál! ✓
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 text-center bg-green-50 p-6 rounded-3xl border-2 border-green-200 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-left shadow-sm">
              <CheckCircle2 className="w-16 h-16 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-black text-green-800 text-xl mb-1 uppercase tracking-wider">Shrnutí</h3>
                <p className="text-sm text-green-700 font-medium leading-relaxed">
                  Zatímco u monolitického OS je chyba ovladače fatální a zastaví celý počítač (BSOD), mikrojádro izoluje služby do <strong>User Space</strong>. Když služba selže, jádro ji může jednoduše restartovat bez ovlivnění zbytku systému!
                </p>
              </div>
            </div>

          </div>
        )}

        {phase === 'communication' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 w-full">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Paměť a Komunikace</h1>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                Aplikace mají zakázáno přistupovat do prostoru jádra. Jediná cesta je přes <strong>System Call</strong>.
                Sleduj, jak se přepíná Ring CPU při každém kroku.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start max-w-5xl mx-auto">

              {/* LEVÝ SLOUPEC: Prstencový Ring diagram */}
              <div className="lg:w-56 flex-shrink-0 flex flex-col items-center">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Režim CPU</div>
                <div className="relative w-48 h-48">
                  {/* Ring 3 – vnější */}
                  <div className={`absolute inset-0 rounded-full border-4 flex items-start justify-center pt-1.5 transition-all duration-500 ${
                    commState === 'syscall-kernel' || commState === 'syscall-driver'
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-blue-100 border-blue-400 shadow-lg shadow-blue-100'
                  }`}>
                    <span className={`font-black text-xs transition-colors duration-500 ${
                      commState === 'syscall-kernel' || commState === 'syscall-driver' ? 'text-blue-200' : 'text-blue-800'
                    }`}>Ring 3</span>
                  </div>
                  {/* Ring 1, 2 – prázdné */}
                  <div className="absolute inset-7 rounded-full bg-slate-50 border-4 border-slate-200 flex items-start justify-center pt-2">
                    <span className="font-black text-slate-300 text-[9px] uppercase">1,2 prázd.</span>
                  </div>
                  {/* Ring 0 – vnitřní */}
                  <div className={`absolute inset-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                    commState === 'syscall-kernel' || commState === 'syscall-driver'
                      ? 'bg-red-500 border-4 border-red-700 shadow-lg shadow-red-200'
                      : 'bg-red-50 border-4 border-red-200'
                  }`}>
                    <div className="text-center">
                      <Cpu className={`w-5 h-5 mx-auto transition-colors duration-500 ${
                        commState === 'syscall-kernel' || commState === 'syscall-driver' ? 'text-white animate-pulse' : 'text-red-300'
                      }`} />
                      <span className={`font-black text-xs leading-none transition-colors duration-500 mt-1 block ${
                        commState === 'syscall-kernel' || commState === 'syscall-driver' ? 'text-white' : 'text-red-400'
                      }`}>Ring 0</span>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 text-center px-3 py-2 rounded-xl border-2 text-xs font-bold transition-all duration-500 w-full ${
                  commState === 'syscall-kernel' || commState === 'syscall-driver'
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'bg-blue-50 border-blue-200 text-blue-700'
                }`}>
                  {commState === 'syscall-kernel' || commState === 'syscall-driver'
                    ? '🔴 Ring 0 — Kernel Mode'
                    : '🔵 Ring 3 — User Mode'}
                </div>
              </div>

              {/* PRAVÝ SLOUPEC: Krokování + RAM */}
              <div className="flex-1 min-w-0 flex flex-col gap-4">
                {/* Krokování */}
                <div className="bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-200 shadow-sm">
                  <span className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2 block">Co se děje?</span>
                  <p className="text-sm font-bold text-indigo-900 leading-relaxed min-h-[52px]">
                    {commState === 'idle' && "Hra narazila na checkpoint. Protože běží v Ring 3, nemůže sama ukládat na disk. Odešle System Call k jádru."}
                    {commState === 'syscall-request' && "Hra požádala o uložení. Systém hardwarově přepne CPU do Ring 0, aby OS mohl s diskem manipulovat."}
                    {commState === 'syscall-kernel' && "Jádro přijalo požadavek a zkontrolovalo oprávnění. Předá instrukce ovladači disku."}
                    {commState === 'syscall-driver' && "Ovladač data uložil na SSD. Jádro pošle zprávu o úspěchu zpět do Hra.exe a CPU se uzamkne do Ring 3."}
                    {commState === 'syscall-done' && "Proces kompletní! Celý průchod přes System Call trval jen mikrosekundy."}
                  </p>
                  <button
                    onClick={advanceCommStep}
                    className="mt-3 w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black border-b-4 border-indigo-800 rounded-xl transition-all active:translate-y-1 active:border-b-0 uppercase tracking-widest text-sm shadow-md"
                  >
                    {commState === 'idle' && "Krok 1: Poslat SysCall ↓"}
                    {commState === 'syscall-request' && "Krok 2: Přepnout do Ring 0 🔴"}
                    {commState === 'syscall-kernel' && "Krok 3: Vykonat přes Ovladač →"}
                    {commState === 'syscall-driver' && "Krok 4: Návrat do Ring 3 🔵"}
                    {commState === 'syscall-done' && "↺ Resetovat ukázku"}
                  </button>
                </div>

                {/* RAM diagram – kompaktní */}
                <div className="bg-white rounded-2xl border-4 border-slate-200 overflow-hidden shadow-sm">
                  <div className="bg-slate-200 text-slate-700 px-4 py-1.5 font-black tracking-widest uppercase text-xs text-center">
                    Rozložení v RAM
                  </div>
                  {/* User Space */}
                  <div className="bg-red-50/60 border-b-2 border-dashed border-red-200 px-4 py-3 relative">
                    <div className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-2">User Space — Ring 3</div>
                    <div className="flex gap-2 flex-wrap">
                      <div className={`px-3 py-1.5 bg-white rounded-lg border-2 text-xs font-bold flex items-center gap-1.5 relative transition-all ${
                        commState === 'syscall-request' || commState === 'syscall-done' ? 'border-indigo-400 shadow-md' : 'border-red-200'
                      }`}>
                        <Gamepad2 className="w-3 h-3 text-red-500" /> Hra.exe
                        {commState === 'syscall-request' && <span className="text-indigo-500 text-base animate-bounce ml-1">↓</span>}
                        {commState === 'syscall-done' && <span className="text-green-500 text-base animate-bounce ml-1">↑</span>}
                      </div>
                      <div className="px-3 py-1.5 bg-white rounded-lg border-2 border-slate-100 text-xs font-bold opacity-50 flex items-center gap-1.5">
                        <LayoutDashboard className="w-3 h-3 text-slate-400" /> Prohlížeč
                      </div>
                    </div>
                  </div>
                  {/* Barrier */}
                  <div className={`h-5 flex items-center justify-center transition-colors duration-300 ${
                    commState === 'syscall-request' ? 'bg-indigo-500' : 'bg-slate-400'
                  }`}>
                    <span className="text-white text-[9px] font-black uppercase tracking-widest">Hardwarová bariéra — MPU</span>
                  </div>
                  {/* Kernel Space */}
                  <div className="bg-slate-100 px-4 py-3">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Kernel Space — Ring 0</div>
                    <div className="flex gap-2 flex-wrap">
                      <div className={`px-3 py-1.5 bg-white rounded-lg border-2 text-xs font-bold flex items-center gap-1.5 transition-all ${
                        commState === 'syscall-kernel' || commState === 'syscall-driver' ? 'border-indigo-400 shadow-sm' : 'border-slate-200'
                      }`}>
                        <Cpu className={`w-3 h-3 ${commState === 'syscall-kernel' ? 'text-indigo-500 animate-pulse' : 'text-slate-400'}`} /> Jádro OS
                        {commState === 'syscall-kernel' && <span className="text-[9px] text-indigo-500 font-mono">Ověřuji...</span>}
                      </div>
                      <div className={`px-3 py-1.5 bg-white rounded-lg border-2 text-xs font-bold flex items-center gap-1.5 transition-all ${
                        commState === 'syscall-driver' ? 'border-green-400 shadow-sm' : 'border-slate-200'
                      }`}>
                        <HardDrive className={`w-3 h-3 ${commState === 'syscall-driver' ? 'text-green-500 animate-bounce' : 'text-slate-400'}`} /> Ovladač disku
                        {commState === 'syscall-driver' && <span className="text-[9px] text-green-600 font-mono">Zapisuji...</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {phase === 'attack' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">🏴‍☠️ Eskalace Privilegií</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Jsi škodlivý program (Malware) běžící v <strong>Ring 3 (User Space)</strong>. Zkus se dostat
                do chráněné paměti jádra nebo spustit zakázanou instrukci. Uvidíš, co ti v tom zabrání.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {/* Memory map – stejný vizuální styl jako RAM v sekci Komunikace */}
              <div className="bg-white rounded-2xl border-4 border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-200 text-slate-700 px-4 py-1.5 font-black tracking-widest uppercase text-xs text-center">
                  Rozložení v RAM
                </div>

                {/* User Space */}
                <div className={`border-b-2 border-dashed px-4 py-3 relative transition-all duration-300 ${
                  attackState === 'trying' ? 'bg-yellow-50 border-yellow-400' : 'bg-red-50/60 border-red-200'
                }`}>
                  <div className="flex justify-between text-xs font-mono text-red-400 mb-2 font-bold">
                    <span>Adresa: 11</span><span>Adresa: 100</span>
                  </div>
                  <div className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-2">User Space — Ring 3 (Ty jsi tady)</div>
                  <div className="flex gap-2 flex-wrap">
                    <div className={`px-3 py-1.5 bg-white rounded-lg border-2 text-xs font-bold flex items-center gap-1.5 transition-all ${
                      attackState === 'trying' ? 'border-yellow-400 shadow-md animate-pulse' : 'border-red-200'
                    }`}>
                      <Bug className="w-3 h-3 text-red-500" /> malware.exe ← TY
                    </div>
                    <div className="px-3 py-1.5 bg-white rounded-lg border-2 border-slate-100 text-xs font-bold opacity-60 flex items-center gap-1.5">
                      <LayoutDashboard className="w-3 h-3 text-slate-400" /> notepad.exe
                    </div>
                    <div className="px-3 py-1.5 bg-white rounded-lg border-2 border-slate-100 text-xs font-bold opacity-60 flex items-center gap-1.5">
                      <Monitor className="w-3 h-3 text-slate-400" /> chrome.exe
                    </div>
                  </div>
                </div>

                {/* MPU Barrier */}
                <div className={`h-5 flex items-center justify-center transition-all duration-500 ${
                  attackState === 'trying' ? 'bg-yellow-400 animate-pulse' :
                  attackState === 'blocked' ? 'bg-red-500' : 'bg-slate-400'
                }`}>
                  <span className="text-white text-[9px] font-black uppercase tracking-widest">
                    {attackState === 'trying' ? '⚡ Pokus o průnik...' :
                     attackState === 'blocked' ? '🛡️ MPU zablokovala přístup!' :
                     'Hardwarová bariéra — MPU'}
                  </span>
                </div>

                {/* Kernel Space */}
                <div className={`bg-slate-100 px-4 py-3 transition-all duration-300 ${
                  attackState === 'blocked' ? 'bg-green-50' : ''
                }`}>
                  <div className="flex justify-between text-xs font-mono text-slate-500 mb-2 font-bold">
                    <span>Adresa: 0</span><span>Adresa: 10</span>
                  </div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Kernel Space — Ring 0 (Zakázaná zóna)</div>
                  <div className="flex gap-2 flex-wrap">
                    <div className="px-3 py-1.5 bg-white rounded-lg border-2 border-slate-200 text-xs font-bold flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-slate-400" /> Jádro OS
                    </div>
                    <div className="px-3 py-1.5 bg-white rounded-lg border-2 border-slate-200 text-xs font-bold flex items-center gap-1.5">
                      <HardDrive className="w-3 h-3 text-slate-400" /> Ovladač disku
                    </div>
                  </div>
                </div>
              </div>

              {/* Trying feedback */}
              {attackState === 'trying' && (
                <div className="text-center py-4 animate-in fade-in">
                  <div className="text-4xl mb-2 animate-bounce">⚡</div>
                  <div className="font-black text-yellow-700 uppercase tracking-widest">Probíhá pokus o průnik...</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">
                    {attackTarget === 'mem' ? 'malware.exe → zápis na adresu 5 (Kernel Space)' : 'malware.exe → execute(HLT) — instrukce jen pro Ring 0'}
                  </div>
                </div>
              )}

              {/* Blocked feedback */}
              {attackState === 'blocked' && (
                <div className="bg-red-50 border-4 border-red-400 rounded-3xl p-6 animate-in zoom-in-95 duration-300">
                  <div className="font-mono text-xs text-red-800 bg-black/5 p-4 rounded-xl mb-4 leading-relaxed">
                    <div className="text-red-500 font-black text-sm mb-2">❌ SEGMENTATION FAULT / ACCESS VIOLATION</div>
                    <div>Process: malware.exe (Adresa 15–30) → Ring 3</div>
                    <div>Attempt: {attackTarget === 'mem' ? 'Zápis na adresu 5 (Kernel Space, Ring 0)' : 'Spuštění instrukce HLT — povolena jen v Ring 0'}</div>
                    <div className="text-red-400 mt-1">CPU: Ochranné porušení — Ring 3 nemůže přistoupit do Ring 0</div>
                    <div className="text-green-400 mt-1">→ Proces nuceně ukončen. Systém a ostatní aplikace v pořádku.</div>
                  </div>
                  <p className="text-sm font-medium text-red-700 leading-relaxed">
                    <strong>Procesor (CPU) sám, na čistě hardwarové úrovni,</strong> zachytil pokus o neoprávněný přístup
                    a okamžitě ukončil škodlivý proces. Ne antivirus. Ne Windows Defender. Samotný hardware.
                    Jádro OS a ostatní aplikace pokračují v běhu bez jakéhokoliv výpadku.
                  </p>
                </div>
              )}

              {/* Attack buttons */}
              {attackState === 'idle' && (
                <div className="grid md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4">
                  <button
                    onClick={() => handleAttack('mem')}
                    className="bg-red-50 hover:bg-red-100 border-4 border-red-200 hover:border-red-400 p-6 rounded-3xl transition-all text-left active:scale-95 shadow-sm"
                  >
                    <div className="text-3xl mb-3">💾</div>
                    <div className="font-black text-red-800 uppercase tracking-widest text-sm mb-2">Útok na paměť jádra</div>
                    <div className="text-xs text-red-600 font-medium leading-relaxed">
                      Zkusím zapsat data na adresu 5 v Kernel Space (adresy 0–10), kde leží samotné jádro OS.
                    </div>
                  </button>
                  <button
                    onClick={() => handleAttack('exec')}
                    className="bg-orange-50 hover:bg-orange-100 border-4 border-orange-200 hover:border-orange-400 p-6 rounded-3xl transition-all text-left active:scale-95 shadow-sm"
                  >
                    <div className="text-3xl mb-3">⚡</div>
                    <div className="font-black text-orange-800 uppercase tracking-widest text-sm mb-2">Privilegovaná instrukce</div>
                    <div className="text-xs text-orange-600 font-medium leading-relaxed">
                      Zkusím spustit instrukci HLT (zastav procesor) — dostupná výhradně v Ring 0. Z Ring 3 je zakázána.
                    </div>
                  </button>
                </div>
              )}

              {attackState === 'blocked' && (
                <button onClick={resetAttack} className="w-full py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black uppercase tracking-widest rounded-2xl transition-all border-b-4 border-slate-300">
                  Zkusit znovu
                </button>
              )}
            </div>
          </div>
        )}

        {/* Uzavření activeTab === 'practice' */}
        </div>)}

        {activeTab === 'use-cases' && (
          <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center w-full">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Architekt v praxi</h1>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                Jste hlavní systémový architekt. Ke každému zařízení určete, zda potřebuje spíše maximální výkon (Monolit) nebo absolutní bezpečnost a odolnost proti pádům ovladačů (Mikrojádro).
              </p>
            </div>

            <div className="bg-slate-50 border-4 border-slate-200 rounded-[3rem] p-8 w-full max-w-4xl relative overflow-hidden shadow-inner">
              <div className="absolute top-4 right-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
                Zařízení {useCaseIndex + 1} z {USE_CASES.length}
              </div>
              
              <div className="flex flex-col items-center mt-6 mb-10">
                {React.createElement(USE_CASES[useCaseIndex].icon, { className: "w-24 h-24 text-indigo-600 mb-6 drop-shadow-md" })}
                <h2 className="text-4xl font-black text-slate-800 text-center uppercase tracking-tight">{USE_CASES[useCaseIndex].title}</h2>
              </div>

              {useCaseFeedback === 'idle' ? (
                <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4">
                  <button 
                    onClick={() => handleUseCaseAnswer('monolithic')}
                    className="group bg-white p-6 rounded-3xl border-4 border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all flex flex-col items-center gap-4 active:scale-95"
                  >
                    <Layers className="w-12 h-12 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    <div className="text-xl font-black text-slate-700 uppercase tracking-widest">Monolitické Jádro</div>
                    <div className="text-sm text-slate-500 text-center font-bold">Max. Výkon • Vše na jednom místě</div>
                  </button>

                  <button 
                    onClick={() => handleUseCaseAnswer('microkernel')}
                    className="group bg-white p-6 rounded-3xl border-4 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col items-center gap-4 active:scale-95"
                  >
                    <ShieldCheck className="w-12 h-12 text-blue-400 group-hover:text-blue-600 transition-colors" />
                    <div className="text-xl font-black text-blue-700 uppercase tracking-widest">Mikrojádro</div>
                    <div className="text-sm text-blue-500 text-center font-bold">Max. Bezpečí • Oddělené moduly</div>
                  </button>
                </div>
              ) : (
                <div className={`p-8 rounded-3xl border-4 animate-in zoom-in-95 duration-300 ${useCaseFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                  <div className="flex items-start gap-6">
                    <div className="mt-1 flex-shrink-0">
                      {useCaseFeedback === 'correct' ? (
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                          <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200">
                          <AlertTriangle className="w-10 h-10 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className={`text-2xl font-black uppercase tracking-widest mb-2 ${useCaseFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                        {useCaseFeedback === 'correct' ? 'Správně!' : 'Chyba, zkusíme to jinak...'}
                      </h3>
                      <p className={`text-lg font-medium leading-relaxed mb-6 ${useCaseFeedback === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                        {USE_CASES[useCaseIndex].explanation}
                      </p>
                      
                      <button 
                        onClick={nextUseCase}
                        className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-md ${useCaseFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                      >
                        Další zařízení <ArrowRight className="inline-block w-5 h-5 ml-2 -mt-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 w-full">
            {evaluated && (
              <div className={`p-6 rounded-2xl border-4 flex items-center gap-4 ${score === ARCHITECTURE_QUIZ.length ? 'bg-green-50 border-green-400 text-green-900' : 'bg-red-50 border-red-400 text-red-900'}`}>
                {score === ARCHITECTURE_QUIZ.length ? <CheckCircle2 className="w-12 h-12 flex-shrink-0 text-green-500" /> : <AlertTriangle className="w-12 h-12 flex-shrink-0 text-red-500" />}
                <div>
                  <h3 className="font-black text-xl uppercase mb-1">
                    {score === ARCHITECTURE_QUIZ.length ? 'Úžasný výsledek! Logika vám funguje na jedničku.' : 'Nevadí, chce to jen chvíli přemýšlet!'}
                  </h3>
                  <p className="font-medium text-sm">
                    Tvoje skóre: {score} / {ARCHITECTURE_QUIZ.length}. 
                    {score !== ARCHITECTURE_QUIZ.length && ' Zkus projít chyby, uvědomit si souvislosti a klidně test vyzkoušej znovu.'}
                  </p>
                </div>
              </div>
            )}

            {ARCHITECTURE_QUIZ.map((q, index) => {
              const isCorrect = evaluated ? checkAnswer(q, answers[q.id]) : null;
              return (
                <div key={q.id} className={`bg-white p-6 sm:p-8 rounded-3xl shadow-sm border-2 ${evaluated ? (isCorrect ? 'border-green-300' : 'border-red-300') : 'border-slate-200'}`}>
                  <h3 className="font-bold text-slate-800 text-lg mb-6 flex gap-3">
                    <span className="bg-slate-100 text-slate-500 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">{index + 1}</span>
                    {q.question}
                  </h3>

                  {q.type === 'single' && (
                    <div className="space-y-3 pl-11">
                      {q.options?.map(opt => (
                        <button
                          key={opt.id}
                          disabled={evaluated}
                          onClick={() => handleSingleSelect(q.id, opt.id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-sm
                            ${answers[q.id] === opt.id ? 'border-indigo-500 bg-indigo-50 text-indigo-900' : 'border-slate-200 hover:border-indigo-200 bg-white text-slate-700'}
                            ${evaluated && opt.id === q.correct ? '!border-green-500 !bg-green-50 !text-green-900 ring-2 ring-green-500/50' : ''}
                            ${evaluated && answers[q.id] === opt.id && opt.id !== q.correct ? '!border-red-500 !bg-red-50 !text-red-900 line-through opacity-70' : ''}
                          `}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === 'multi' && (
                    <div className="space-y-3 pl-11">
                      {q.options?.map(opt => {
                        const isSelected = (answers[q.id] as string[] || []).includes(opt.id);
                        const isRightAns = (q.correct as string[]).includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            disabled={evaluated}
                            onClick={() => handleMultiSelect(q.id, opt.id)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-sm flex items-center gap-3
                              ${isSelected ? 'border-indigo-500 bg-indigo-50 text-indigo-900' : 'border-slate-200 hover:border-indigo-200 bg-white text-slate-700'}
                              ${evaluated && isRightAns ? '!border-green-500 !bg-green-50 !text-green-900 ring-2 ring-green-500/50' : ''}
                              ${evaluated && isSelected && !isRightAns ? '!border-red-500 !bg-red-50 !text-red-900 line-through opacity-70' : ''}
                            `}
                          >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'}`}>
                              {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                            </div>
                            {opt.text}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'text' && (
                    <div className="pl-11">
                      <input
                        type="text"
                        disabled={evaluated}
                        value={(answers[q.id] as string) || ''}
                        onChange={(e) => handleTextChange(q.id, e.target.value)}
                        placeholder="Napiš odpověď..."
                        className={`w-full p-4 rounded-xl border-2 outline-none font-bold text-slate-700
                          ${evaluated ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-slate-300 focus:border-indigo-500'}
                        `}
                      />
                      {evaluated && !isCorrect && (
                        <div className="mt-3 text-sm font-bold text-red-600 bg-red-100 px-4 py-2 rounded-lg">
                          Správná odpověď: {q.correct as string}
                        </div>
                      )}
                    </div>
                  )}

                  {q.type === 'match' && (
                    <div className="pl-11 space-y-4">
                      {q.matchItems?.left.map((leftItem, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-center gap-3">
                          <div className="flex-1 bg-slate-100 p-3 rounded-xl border border-slate-200 text-sm font-medium w-full text-center sm:text-left">
                            {leftItem}
                          </div>
                          <select
                            disabled={evaluated}
                            value={((answers[q.id] as Record<string, string>) || {})[leftItem] || ''}
                            onChange={(e) => handleMatchChange(q.id, leftItem, e.target.value)}
                            className={`flex-1 p-3 rounded-xl border-2 outline-none font-bold text-sm w-full
                              ${evaluated ? (((answers[q.id] as Record<string, string>) || {})[leftItem] === (q.correct as Record<string, string>)[leftItem] ? 'border-green-500 bg-green-50 text-green-900' : 'border-red-500 bg-red-50 text-red-900') : 'border-slate-300'}
                            `}
                          >
                            <option value="">-- Vyber --</option>
                            {q.matchItems?.right.map((rItem, j) => (
                              <option key={j} value={rItem}>{rItem}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                      {evaluated && !isCorrect && (
                        <div className="mt-3 text-sm font-bold text-red-600 bg-red-100 px-4 py-2 rounded-lg">
                          Některá přiřazení jsou špatně, prostuduj si znovu typy jader.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {!evaluated ? (
              <button
                onClick={handleEvaluate}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg uppercase tracking-widest rounded-2xl shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all border-b-4 border-indigo-800"
              >
                Vyhodnotit kvíz
              </button>
            ) : (
              <button
                onClick={() => {
                  setAnswers({});
                  setEvaluated(false);
                  setScore(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-lg uppercase tracking-widest rounded-2xl shadow-sm transition-all border-b-4 border-slate-300"
              >
                Zkusit to znovu
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default OsArchitectureChapter;
