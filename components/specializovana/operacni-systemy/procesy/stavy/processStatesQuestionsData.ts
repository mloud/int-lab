import { ReviewQuestion } from '@/components/ui/TopicReviewQuiz';

export const PROCESS_STATES_QUESTIONS: ReviewQuestion[] = [
  {
    id: 1,
    type: 'single',
    category: 'Rychlostní propast CPU a I/O',
    question: 'Proč procesy v moderním operačním systému tráví většinu své existence čekáním namísto nepřetržitého počítání na procesoru?',
    options: [
      'Protože vstupně-výstupní operace (čtení z disku, sítě, čekání na uživatele) trvají milisekundy, což je pro procesor pracující v nanosekundách obrovská doba čekání.',
      'Protože operační systém úmyslně zpomaluje procesy, aby nedošlo k přehřátí procesoru.',
      'Protože procesor dokáže v jednom okamžiku obsluhovat pouze jeden jediný proces za den.',
      'Protože paměť RAM nedokáže uchovávat instrukce déle než několik mikrosekund.'
    ],
    correctIndices: [0],
    explanation: 'Zatímco CPU provede miliardy instrukcí za sekundu (nanosekundy), mechanické či polovodičové čtení z disku a síťová komunikace trvají celé milisekundy. Kdyby procesor čekal na disk, zahálel by miliony hodin svého virtuálního času.'
  },
  {
    id: 2,
    type: 'single',
    category: 'Vznik procesu (Stav NEW)',
    question: 'V jakém okamžiku přechází program do stavu NEW (Nový / Vytvářený)?',
    options: [
      'Ve zlomku sekundy po požadavku na spuštění (dvojklik, příkaz), kdy OS začíná alokovat PID a číst hlavičku souboru z disku.',
      'Teprve v okamžiku, kdy procesor vykoná první instrukci programu.',
      'V okamžiku, kdy programátor napíše kód v editoru a uloží jej na disk.',
      'Až po dokončení první diskové operace.'
    ],
    correctIndices: [0],
    explanation: 'Stav NEW představuje porodní fázi procesu. Program byl aktivován, OS mu přiřazuje PID a PCB a zavaděč (Loader) připravuje paměť v RAM.'
  },
  {
    id: 3,
    type: 'single',
    category: 'Přechod NEW ➔ READY',
    question: 'Kdy se stav procesu NEW změní na stav READY (Připraven)?',
    options: [
      'Jakmile je kód v RAM, knihovny připojeny, PCB vytvořeno a čítač PC ukazuje na první instrukci programu.',
      'Jakmile uživatel poprvé klikne do okna programu myší.',
      'Až po vypršení prvního časového kvanta procesoru.',
      'Pouze v případě, že má proces nejvyšší prioritu Reálný čas.'
    ],
    correctIndices: [0],
    explanation: 'Přechod do READY nastane ve chvíli, kdy je proces stoprocentně nachystán a schopen okamžitě počítat – zařadí se do fronty připravených úloh.'
  },
  {
    id: 4,
    type: 'single',
    category: 'Rozdíl READY vs. BLOCKED',
    question: 'Jaký je zásadní rozdíl mezi stavem Připraven (Ready) a Blokovaný (Blocked)?',
    options: [
      'Připravený proces MŮŽE ihned počítat a čeká jen na volné CPU, zatímco blokovaný proces NEMŮŽE počítat, protože čeká na data z disku či sítě.',
      'Připravený proces je uložen na pevném disku, zatímco blokovaný proces je v registrech CPU.',
      'Mezi těmito stavy není žádný funkční rozdíl, jde pouze o jiné pojmenování téhož stavu.',
      'Blokovaný proces byl trvale smazán z operační paměti RAM.'
    ],
    correctIndices: [0],
    explanation: 'Připravený proces má v paměti všechna potřebná data a čeká pouze na přidělení CPU. Blokovaný proces čeká na dokončení pomalé I/O operace a CPU by mu v té chvíli bylo k ničemu.'
  },
  {
    id: 5,
    type: 'single',
    category: 'Časové kvantum a multitasking',
    question: 'Co se stane s běžícím procesem (RUNNING), pokud vyprší jeho časové kvantum a program ještě neskončil?',
    options: [
      'Hardwarový časovač vyvolá přerušení, kontext se uloží do PCB a proces se vrátí do stavu READY.',
      'Proces je okamžitě ukončen a odstraněn z operační paměti.',
      'Proces je nuceně přepnut do stavu BLOCKED a musí čekat na zásah uživatele.',
      'Proces pokračuje v běhu na CPU neomezeně dlouho bez ohledu na ostatní.'
    ],
    correctIndices: [0],
    explanation: 'Při time-sharing multitaskingu plánovač spravedlivě střídá úlohy. Vypršení kvanta pouze vrátí proces do fronty READY, aby dostaly šanci i další aplikace.'
  },
  {
    id: 6,
    type: 'single',
    category: 'Dokončení I/O operace',
    question: 'Kam se přesune proces ze stavu BLOCKED v okamžiku, kdy pevný disk konečně dokončí čtení souboru do RAM?',
    options: [
      'Vrací se do fronty READY (Připraven), kde počká, až mu plánovač opět přidělí CPU.',
      'Okamžitě přeruší stávající proces a skočí přímo na CPU (do stavu RUNNING).',
      'Přechází do stavu NEW a celý program začíná běžet znovu od začátku.',
      'Zůstává ve stavu BLOCKED až do ukončení operačního systému.'
    ],
    correctIndices: [0],
    explanation: 'Klíčový didaktický bod: Po dočtení z disku nemůže proces skočit přímo na CPU, protože procesor v daném okamžiku plně obsluhuje jiný program. Zařadí se proto do fronty READY.'
  },
  {
    id: 7,
    type: 'single',
    category: 'Priority procesů',
    question: 'Jak ovlivňuje priorita procesu jeho chování ve stavu READY?',
    options: [
      'Procesy s vyšší prioritou vybírá plánovač z fronty READY přednostně před procesy s nižší prioritou.',
      'Priorita určuje, jakou barvou se vykreslí okno aplikace na monitoru.',
      'Proces s nižší prioritou je automaticky přejmenován na soubor DLL.',
      'Priorita nemá na plánování žádný vliv, procesy se střídají výhradně podle abecedy.'
    ],
    correctIndices: [0],
    explanation: 'Plánovač CPU (Scheduler) prochází frontu READY podle prioritních tříd. Úlohy s vyšší prioritou (např. Správce úloh či audio) dostávají přednost, aby systém nezamrzl.'
  },
  {
    id: 8,
    type: 'single',
    category: 'Chování aplikací (I/O vs. CPU)',
    question: 'Představte si textový editor (Poznámkový blok), do kterého uživatel píše text rychlostí 3 úhozy za sekundu. Kde tento program stráví více než 95 % svého času?',
    options: [
      'Ve stavu BLOCKED (Čekající na stisk další klávesy z klávesnice).',
      'Ve stavu RUNNING (Nepřetržitě zaměstnává jádro procesoru na 100 %).',
      'Ve stavu NEW (Při každém úhozu se program vytváří znovu).',
      'Ve stavu TERMINATED (Po každém písmenu je program z paměti smazán).'
    ],
    correctIndices: [0],
    explanation: 'Mezi dvěma stisky kláves uběhnou stovky milisekund. Pro procesor je to obrovská doba. Textový editor je typický I/O-Bound proces – drtivou většinu času spí ve stavu BLOCKED a na CPU skočí jen na zlomek milisekundy, aby písmeno vykreslil.'
  },
  {
    id: 9,
    type: 'single',
    category: 'Plynulost systému a Priority Boost',
    question: 'Na počítači renderujete náročné 3D video (procesor jede na 100 %). Proč i přesto můžete plynule psát do Wordu a hýbat myší, aniž by kurzor trhal?',
    options: [
      'Protože OS dává procesům probuzeným z I/O (stisk klávesy, pohyb myši) dočasné zvýhodnění v prioritě (Priority Boost) a okamžitě jim na mikrosekundu půjčí CPU.',
      'Protože myš a klávesnice mají vlastní samostatný procesor Intel uvnitř kabelu a nepoužívají procesor v PC.',
      'Protože renderování videa se při pohybu myši automaticky trvale smaže.',
      'Protože Windows neumí vytížit procesor na více než 50 % výkonu.'
    ],
    correctIndices: [0],
    explanation: 'Operační systém ví, že interaktivní procesy (I/O-Bound) potřebují CPU jen na mikrosekundu. Jakmile uživatel pohne myší nebo stiskne klávesu, OS dá těmto úlohám přednost (Priority Boost) před dlouhým renderováním, takže počítač působí dokonale svižně.'
  }
];
