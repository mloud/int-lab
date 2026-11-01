export type QuestionType = 'single' | 'multiple' | 'fill' | 'calc';

export interface ProcessQuestion {
  id: number;
  type: QuestionType;
  category: 'Dělení času na CPU' | 'Principy multitaskingu' | 'Střídání úloh' | 'Režie & Výpočty';
  question: string;
  options?: string[];
  correctIndices?: number[]; // pro single a multiple
  correctAnswers?: string[]; // pro fill a calc (alternativní platné tvary)
  expectedFormat?: string;
  explanation: string;
}

export const PROCESS_SWITCHING_QUESTIONS: ProcessQuestion[] = [
  // 1. Dělení času na CPU
  {
    id: 1,
    type: 'single',
    category: 'Dělení času na CPU',
    question: 'V běžném operačním systému běží na pozadí 200 procesů, ale v počítači je jen jedno aktivní procesorové jádro. Jak systém zajistí, že hudba hraje, stahování běží a myš se plynule hýbe?',
    options: [
      'Procesor komprimuje všechny programy do jednoho obřího souboru a ten spustí najednou.',
      'Procesor bleskově střídá jednotlivé procesy po malých časových kvantech (10–30 ms), což lidské smysly vnímají jako plynulý souběh.',
      'Procesor vykonává instrukce pouze z okna v popředí; všechny ostatní procesy na pozadí jsou dočasně smazány z paměti RAM.',
      'Jedno jádro procesoru ve skutečnosti fyzicky vykonává 200 instrukcí v přesně stejném nanosekundovém okamžiku.'
    ],
    correctIndices: [1],
    explanation: 'Jedno jádro procesoru vykonává v daný okamžik vždy instrukce jen jediného programu. Rychlým střídáním po desítkách milisekund (time-sharing) však vzniká dokonalá iluze souběžného běhu.'
  },
  {
    id: 2,
    type: 'calc',
    category: 'Dělení času na CPU',
    question: 'Operační systém nastavil délku časového kvanta pro každý proces na 20 ms. Kolik takových časových kvant stihne procesor přidělit během 1 sekundy (1 000 ms)?',
    expectedFormat: 'Zadej celé číslo (výpočet podílu)',
    correctAnswers: ['50', '50x', '50krát', '50 krat'],
    explanation: '1 000 ms / 20 ms = 50. Procesor během jedné sekundy stihne vystřídat 50 časových kvant.'
  },
  {
    id: 3,
    type: 'multiple',
    category: 'Dělení času na CPU',
    question: 'Která DVĚ tvrzení o časovém kvantu a střídání úloh jsou pravdivá? (Vyber 2 možnosti)',
    options: [
      'Úloha může procesor opustit dříve, než vyprší její kvantum – typicky když zahájí pomalou I/O operaci (vstup/výstup, např. čeká na zápis souboru na disk nebo stisk klávesy).',
      'Každá úloha musí vždy povinně vyčerpat celých 100 % svého kvanta, i když zrovna nemá co počítat.',
      'Časové kvantum se v moderních klientských OS obvykle pohybuje v řádu desítek milisekund (cca 10–30 ms).',
      'Běžící úloha si sama vteřinovými stopkami měří, kdy má skončit, a operační systém do toho nijak nezasahuje.'
    ],
    correctIndices: [0, 2],
    explanation: 'Úloha se vzdá procesoru dříve, pokud narazí na I/O operaci (Input/Output – vstup a výstup). Jak již víte z fungování souborových systémů, zápis dat do sektorů na disku trvá v porovnání s bleskovým procesorem celou věčnost. Aby procesor zbytečně nečekal na dokončení diskové operace, operační systém proces okamžitě uspí a procesor předá jiné úloze. Standardní délka kvanta pro počítající procesy je 10 až 30 ms.'
  },
  {
    id: 4,
    type: 'calc',
    category: 'Dělení času na CPU',
    question: 'Ve frontě čekají 4 procesy: A, B, C a D. Každému je přiděleno kvantum 15 ms a žádný se nevzdá CPU dříve. Proces A začal běžet v čase t = 0 ms. Za kolik milisekund se proces A dostane podruhé na řadu?',
    expectedFormat: 'Zadej celé číslo v milisekundách',
    correctAnswers: ['60', '60ms', '60 ms'],
    explanation: 'A běží 0–15 ms, B 15–30 ms, C 30–45 ms, D 45–60 ms. Proces A dostane procesor podruhé přesně v čase t = 60 ms (po 4 × 15 ms).'
  },
  {
    id: 5,
    type: 'fill',
    category: 'Dělení času na CPU',
    question: 'Jak se nazývá slavný historický operační systém od Microsoftu, který byl jednoúlohový (neuměl multitasking a vždy v něm mohl běžet nejvýše jeden program)?',
    expectedFormat: 'Zadej zkratku ze 3 písmen',
    correctAnswers: ['dos', 'ms-dos', 'msdos', 'ms dos'],
    explanation: 'MS-DOS (Microsoft Disk Operating System) byl jednoúlohový systém. Před spuštěním jiného programu bylo nutné rozdělanou práci uložit a program ukončit.'
  },

  // 2. Principy multitaskingu
  {
    id: 6,
    type: 'single',
    category: 'Principy multitaskingu',
    question: 'Proč byl kooperativní multitasking (např. ve Windows 3.1 nebo starém Mac OS) tak náchylný k zamrznutí celého počítače?',
    options: [
      'Procesor v té době neuměl počítat záporná čísla.',
      'Systém spoléhal na dobrovolnou spolupráci aplikací – pokud se jeden program zacyklil a nevrátil řízení systému, zamrzl celý počítač.',
      'Operační systém po každých 10 minutách automaticky smazal paměť RAM.',
      'Kooperativní systémy nepodporovaly klávesnici ani myš.'
    ],
    correctIndices: [1],
    explanation: 'V kooperativním multitaskingu záviselo přepnutí na tom, zda program sám dobrovolně vrátil řízení OS. Nekonečný cyklus v jediné aplikaci způsobil pád celého stroje.'
  },
  {
    id: 7,
    type: 'fill',
    category: 'Principy multitaskingu',
    question: 'Jakým odborným přídavným jménem označujeme moderní typ multitaskingu, kdy operační systém pomocí časovače nuceně odebírá procesor běžícímu programu? Doplň slovo: „Jedná se o ______________ multitasking.“',
    expectedFormat: 'Doplň jedno přídavné jméno',
    correctAnswers: ['preemptivní', 'preemptivni'],
    explanation: 'Preemptivní multitasking (z latinského praeemere = vyvlastnit, nuceně odebrat) je režim, kdy operační systém může kdykoliv násilně odebrat procesor běžícímu procesu a předat ho jinému.'
  },
  {
    id: 8,
    type: 'single',
    category: 'Principy multitaskingu',
    question: 'Která součástka základního hardwaru je naprosto nezbytná pro preemptivní multitasking, protože v pravidelných intervalech vysílá signál přerušení a předává řízení jádru OS, aby vybralo další proces?',
    options: [
      'Grafická karta (GPU)',
      'Hardwarový časovač procesoru (Timer / programovatelný čítač přerušení)',
      'Síťová karta (NIC)',
      'Zvukový kodek'
    ],
    correctIndices: [1],
    explanation: 'Hardwarový časovač (Timer) po uplynutí kvanta vyšle elektrický signál přerušení (Interrupt). Procesor okamžitě pozastaví běžící aplikaci a předá řízení jádru OS (plánovači), které uloží stávající stav a vybere další proces k běhu na CPU.'
  },
  {
    id: 9,
    type: 'multiple',
    category: 'Principy multitaskingu',
    question: 'Které DVA zásadní přínosy má preemptivní multitasking v moderních operačních systémech? (Vyber 2 možnosti)',
    options: [
      'Když program totálně zamrzne nebo se zacyklí, systém mu procesor násilně sebere a zbytek PC dál plynule reaguje.',
      'Preemptivní multitasking zcela odstranil potřebu mít v počítači operační paměť RAM.',
      'Uživatel může kdykoliv stisknout Ctrl+Shift+Esc, otevřít Správce úloh a zamrzlou aplikaci bezpečně ukončit.',
      'Programátoři už nemusí do svých programů psát žádné podmínky ani cykly.'
    ],
    correctIndices: [0, 2],
    explanation: 'Díky preempci neztratí systém kontrolu ani při totálním zamrznutí programu – Správce úloh i myš fungují dál a program lze bezpečně odstavit.'
  },
  {
    id: 10,
    type: 'fill',
    category: 'Principy multitaskingu',
    question: 'Jak se nazývá příkaz (systémové volání), kterým se proces v některých jazycích a kooperativních systémech dobrovolně vzdá procesoru ve prospěch jiného programu? (Anglické slovo na 5 písmen: Y _ _ _ D)',
    expectedFormat: 'Zadej anglické slovo na 5 písmen',
    correctAnswers: ['yield', 'YIELD'],
    explanation: 'Příkaz yield (vzdát se, postoupit) slouží k dobrovolnému přenechání zbytku časového kvanta jinému připravenému procesu.'
  },

  // 3. Střídání úloh
  {
    id: 11,
    type: 'single',
    category: 'Střídání úloh',
    question: 'Co přesně označuje pojem kontext procesu v architektuře operačních systémů?',
    options: [
      'Název ikony a umístění zástupce aplikace na ploše.',
      'Výrobce základní desky a datum instalace operačního systému.',
      'Kompletní okamžitý stav procesoru patřící danému programu: obsah registrů CPU, stavové příznaky a hodnota registru PC.',
      'Text licenčního ujednání aplikace.'
    ],
    correctIndices: [2],
    explanation: 'Kontext procesu tvoří kompletní vnitřní stav procesoru (hodnoty v pracovních registrech a čítači PC). Bez jeho uložení by procesor ztratil rozpracovaný výpočet.'
  },
  {
    id: 12,
    type: 'fill',
    category: 'Střídání úloh',
    question: 'Jak se nazývá registr v procesoru (anglicky Program Counter), který drží paměťovou adresu přesně té instrukce v RAM, kterou má procesor v příštím taktu vykonat?',
    expectedFormat: 'Zadej 2písmennou zkratku registru',
    correctAnswers: ['pc', 'PC'],
    explanation: 'Registr PC (Program Counter, česky čítač instrukcí) uchovává adresu příští instrukce v paměti RAM.'
  },
  {
    id: 13,
    type: 'single',
    category: 'Střídání úloh',
    question: 'Co by se stalo, kdyby jádro OS při přepnutí kontextu z Wordu na Spotify zapomnělo uložit hodnotu registru PC (čítače instrukcí) Wordu?',
    options: [
      'Word by se po přepnutí restartoval a začal vykonávat instrukce od úvodní adresy kódu v RAM (0x0000), čímž by se rozepsaný dokument ztratil.',
      'Procesor by po návratu nevěděl, kterou instrukcí v RAM navázat; ztratil by ukazatel v kódu a pokusil by se číst náhodná paměťová data jako instrukce, což vede k okamžitému pádu programu (např. chyba Segmentation fault).',
      'Kód Wordu by pokračoval normálně, protože procesor si rozpracovanou instrukci po návratu dokáže dohledat ze souboru na disku přes virtuální tabulku MFT.',
      'Jádro OS by adresu příští instrukce automaticky obnovilo z mezipaměti L1 cache procesoru, takže by došlo pouze k nepatrnému zpoždění bez jakékoliv chyby.'
    ],
    correctIndices: [1],
    explanation: 'Registr PC (Program Counter) drží paměťovou adresu přesně té instrukce v RAM, kterou má CPU vykonat. Pokud se jeho hodnota při přepnutí neuloží do PCB, procesor nemá tušení, kde v programu skončil. Pokusí se vykonat náhodná data paměti a operační systém aplikaci okamžitě ukončí pro porušení ochrany paměti (pád programu / crash).'
  },
  {
    id: 14,
    type: 'multiple',
    category: 'Střídání úloh',
    question: 'Které DVA kroky provádí jádro operačního systému při přepnutí kontextu mezi procesem 1 a procesem 2? (Vyber 2 možnosti)',
    options: [
      'Uloží aktuální hodnoty registrů CPU (vč. registru PC) procesu 1 do jeho karty PCB 1.',
      'Smaže celý obsah pevného disku pro uvolnění místa.',
      'Z karty PCB 2 načte dříve uložené registry a zapíše je do fyzických registrů procesoru.',
      'Vypne na 5 sekund napájení procesoru.'
    ],
    correctIndices: [0, 2],
    explanation: 'Přepnutí kontextu (Context Switch) se skládá z uložení registrů běžícího procesu do jeho PCB a obnovení registrů nového procesu z jeho PCB do CPU.'
  },
  {
    id: 15,
    type: 'calc',
    category: 'Střídání úloh',
    question: 'Na počítači s 1 procesorem běží současně 5 aktivních procesů, kterým operační systém rovnoměrně rozděluje čas. Během 1 sekundy (1 000 ms) proběhne celkem 50 přepnutí kontextu. Každé jedno přepnutí kontextu trvá jádru OS 0,04 ms (40 mikrosekund).\n\nKolik milisekund (ms) čistého výpočetního času zbude za tuto 1 sekundu průměrně KAŽDÉMU z těchto 5 procesů? (Doporučujeme použít kalkulačku, zadejte přesné číslo na 1 desetinné místo)',
    expectedFormat: 'Zadej číslo v milisekundách s desetinnou tečkou nebo čárkou',
    correctAnswers: ['199.6', '199,6', '199.6 ms', '199,6 ms', '199.6ms', '199,6ms'],
    explanation: '1) Režie přepínání za sekundu: 50 × 0,04 ms = 2,0 ms. 2) Čas, který zbude na samotný výpočet všech aplikací: 1 000 ms - 2,0 ms = 998,0 ms. 3) Průměrný čistý čas pro každý z 5 procesů: 998,0 ms / 5 = 199,6 ms. Každý proces tak dostane za sekundu téměř celou pětinu sekundy reálného výpočetního výkonu.'
  },

  // 4. Režie & Výpočty
  {
    id: 16,
    type: 'fill',
    category: 'Režie & Výpočty',
    question: 'Jak se nazývá datová struktura v paměti jádra OS, která slouží jako „karta procesu“ a uchovává PID, rozsah paměti RAM i zálohu registrů?',
    expectedFormat: 'Zadej zkratku ze 3 písmen',
    correctAnswers: ['pcb', 'PCB'],
    explanation: 'PCB (Process Control Block) je řídicí blok procesu, digitální karta procesu v jádře operačního systému.'
  },
  {
    id: 17,
    type: 'multiple',
    category: 'Režie & Výpočty',
    question: 'Které DVĚ položky jsou nezbytnou součástí karty procesu (PCB)? (Vyber 2 možnosti)',
    options: [
      'Identifikační číslo procesu (PID) a oprávnění uživatele, kterému proces patří.',
      'Heslo k Wi-Fi síti uživatele.',
      'Přidělený paměťový prostor v RAM a záloha registrů CPU (vč. registru PC) při přerušení.',
      'Aktuální teplota procesoru v °C.'
    ],
    correctIndices: [0, 2],
    explanation: 'PCB uchovává identitu procesu (PID, vlastník), vymezenou paměť RAM a zálohu stavu registrů procesoru při přerušení běhu.'
  },
  {
    id: 18,
    type: 'single',
    category: 'Režie & Výpočty',
    question: 'Proč operační systém nemůže nastavit časové kvantum na extrémně malou hodnotu, například 0,0001 ms?',
    options: [
      'Procesor by se kvůli neustálému přepínání extrémně přehříval a spotřebovával příliš mnoho energie.',
      'Procesor by většinu času strávil pouhým ukládáním a načítáním registrů (režií přepínání) místo samotného počítání programů.',
      'Operační paměť RAM by se okamžitě zaplnila, protože každé přepnutí zabere nový paměťový prostor.',
      'Aplikace by se automaticky ukončily, protože by za tak krátký okamžik nestihly uložit rozepsaná data na disk.'
    ],
    correctIndices: [1],
    explanation: 'Samotné přepnutí kontextu (uložení registrů do PCB a načtení nových) trvá procesoru určitý čas (režie / overhead). Pokud by kvantum trvalo jen 0,0001 ms, procesor by 99 % času strávil pouhým ukládáním a načítáním stavu a samotné programy by se vůbec neposouvaly dopředu.'
  },
  {
    id: 19,
    type: 'single',
    category: 'Režie & Výpočty',
    question: 'Co by naopak uživatel pozoroval, kdyby operační systém nastavil časové kvantum na příliš velkou hodnotu, například celou 1 sekundu (1 000 ms)?',
    options: [
      'Procesy by spotřebovávaly mnohonásobně více paměti RAM, protože delší kvantum vyžaduje vytvoření několika kopií registru PC.',
      'Systém by ztratil plynulost – odezva grafického rozhraní (pohyb kurzoru myši a psaní na klávesnici) by drhla a sekala se, protože aplikace v popředí by čekaly celé sekundy, než na ně na CPU přijde řada.',
      'Došlo by k okamžitému pádu jádra OS, protože hardwarový časovač procesoru nedokáže odměřit čas delší než 50 milisekund.',
      'Aplikace by nemohly ukládat soubory na disk, protože diskový řadič vyžaduje přepnutí kontextu každých 20 milisekund.'
    ],
    correctIndices: [1],
    explanation: 'Při 1vteřinovém kvantu by se zcela ztratila iluze plynulého multitaskingu. Kdyby jiný proces počítal náročný kód celou 1 sekundu, reakce na stisk klávesy či pohyb myši by měly znatelné zpoždění, systém by působil zamrzle a trhaně.'
  },
  {
    id: 20,
    type: 'calc',
    category: 'Režie & Výpočty',
    question: 'Časové kvantum trvá 19 ms a samotné přepnutí kontextu (režie jádra) zabere 1 ms (celý cyklus trvá 20 ms). Kolik PROCENT (%) z celkového času procesoru tvoří režie přepínání? (Zadej pouze číslo)',
    expectedFormat: 'Zadej celé číslo bez znaku %',
    correctAnswers: ['5', '5%', '5 %'],
    explanation: '1 ms / 20 ms = 0,05 = 5 %. Režie přepínání v tomto případě spotřebuje 5 % výkonu CPU a 95 % času zbývá na výpočty programů.'
  }
];
