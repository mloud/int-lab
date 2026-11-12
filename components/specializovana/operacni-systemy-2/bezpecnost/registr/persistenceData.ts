import { WorksheetSchema } from '@/components/ui/WorksheetKit';
import { ReviewQuestion } from '@/components/ui/TopicReviewQuiz';

export const PERSISTENCE_WORKSHEET_SCHEMA: WorksheetSchema = {
  storageKey: 'oss2_bz3_persistence_worksheet_v1',
  title: 'Praktický list: 4 způsoby persistence v OS Windows',
  subject: 'Operační systémy 2 – Bezpečnost 1 (BZ3)',
  fileName: 'Protokol_BZ3_Persistence_A_Registr',
  intro:
    'Využijte znalosti z interaktivního průvodce: otevřete jednotlivá místa automatického spouštění přímo ve vašich Windows, vyzkoušejte si vytvoření testovací persistence a odpovězte na otázky.',
  tasks: [
    {
      id: 'task-1-startup',
      number: '1',
      title: 'Úroveň 1: Složka „Po spuštění“ (Startup Folder)',
      subtitle: 'Ověření spouštění na úrovni souborového systému',
      steps: [
        {
          id: 't1-s1',
          text: 'Otevřete složku Po spuštění pro vašeho aktuálního uživatele a zapište si její skutečnou cestu z adresního řádku Průzkumníku.',
        },
        {
          id: 't1-s2',
          text: 'V této složce vytvořte zástupce (`Nový ➔ Zástupce`) na program `calc.exe` s názvem `TestKalkulacka`.',
        },
        {
          id: 't1-s3',
          text: 'Zkontrolujte záložku `Aplikace po spuštění` ve Správci úloh (`Ctrl + Shift + Esc`) a ověřte, že se zde zástupce objevil.',
        },
        {
          id: 't1-s4',
          text: 'Odhlaste se ze systému Windows a znovu se přihlaste (nebo restartujte PC) – ověřte, že se Kalkulačka po náběhu plochy skutečně sama automaticky spustila.',
        },
        {
          id: 't1-s5',
          text: 'Po ověření testovacího zástupce `TestKalkulacka` ze složky Po spuštění smažte.',
        },
      ],
      questions: [
        {
          id: 'q1-paths',
          type: 'textarea',
          label: '1A. Zapište plnou cestu ke složce Po spuštění na vašem disku. Spustila se Kalkulačka po novém přihlášení? Potřebuje malware k zápisu do této složky práva správce (UAC)?',
          placeholder: 'Cesta na disku: ...\nSpuštění po přihlášení (Ano/Ne): ...\nPotřebuje práva správce (UAC): ...',
        },
      ],
    },
    {
      id: 'task-2-scheduler-logon',
      number: '2',
      title: 'Úroveň 2: Plánovač úloh – Spuštění při přihlášení uživatele',
      subtitle: 'Běžná uživatelská úloha pro interaktivní aplikace s oknem (GUI)',
      steps: [
        {
          id: 't2-s1',
          text: 'Spusťte Plánovač úloh (`taskschd.msc`) a v pravém panelu klikněte na `Vytvořit základní úlohu...`.',
        },
        {
          id: 't2-s2',
          text: 'Pojmenujte úlohu `TestEdge`, jako aktivační událost (Trigger) zvolte `Při přihlášení`, jako akci `Spustit program` a zadejte `msedge.exe`. Úlohu dokončete.',
        },
        {
          id: 't2-s3',
          text: 'V seznamu Knihovny plánovače úloh úlohu `TestEdge` vyhledejte, klikněte na ni a v dolním panelu na záložce `Obecné` zjistěte, pod jakým uživatelským účtem je nastavena a zda je zaškrtnuto spouštění pouze při přihlášeném uživateli.',
        },
        {
          id: 't2-s4',
          text: 'Po ověření testovací úlohu `TestEdge` označte a smažte (klávesa Delete).',
        },
      ],
      questions: [
        {
          id: 'q2-logon-task',
          type: 'textarea',
          label: '2A. Pod jakým uživatelským účtem se úloha TestEdge vytvořila? Vyžadovalo její vytvoření administrátorská práva (potvrzení dialogu UAC)?',
          placeholder: 'Uživatelský účet: ...\nByla nutná práva správce (UAC): ...',
        },
      ],
    },
    {
      id: 'task-3-scheduler-boot',
      number: '3',
      title: 'Úroveň 3: Plánovač úloh – Spuštění při startu počítače pod účtem SYSTEM',
      subtitle: 'Systémová úloha na pozadí před přihlášením s nejvyššími právy',
      steps: [
        {
          id: 't3-s1',
          text: 'V Plánovači úloh v pravém panelu klikněte na `Vytvořit úlohu...` (rozšířené vytvoření).',
        },
        {
          id: 't3-s2',
          text: 'Záložka Obecné: Pojmenujte úlohu `TestBootSystem`, klikněte na tlačítko `Změnit uživatele nebo skupinu...`, do pole napište `SYSTEM` a potvrďte OK.',
        },
        {
          id: 't3-s3',
          text: 'Záložka Aktivační události: Klikněte na `Nová...` a jako zahájení úlohy zvolte `Při spuštění počítače`.',
        },
        {
          id: 't3-s4',
          text: 'Záložka Akce: Klikněte na `Nová...`, akce `Spustit program` a zadejte program na pozadí: `cmd.exe` s argumentem `/c echo start > C:\\Windows\\Temp\\boot_test.log`.',
        },
        {
          id: 't3-s5',
          text: 'Klikněte na OK pro uložení úlohy. Sledujte, zda Windows vyžadovaly práva správce (UAC). Po prohlédnutí úlohu `TestBootSystem` v seznamu smažte (Delete).',
        },
      ],
      questions: [
        {
          id: 'q3-boot-task',
          type: 'textarea',
          label: '3A. Proč úloha nastavená na spuštění „Při startu počítače“ vyžaduje účet SYSTEM (nebo uložení hesla správce)? Proč by u této úlohy nedávalo smysl spouštět program s grafickým oknem (např. Malování)?',
          placeholder: 'Proč SYSTEM / práva: ...\nProč ne program s oknem: ...',
        },
      ],
    },
    {
      id: 'task-4-services',
      number: '4',
      title: 'Úroveň 4: Systémové služby Windows (Inspekce služby Zařazování tisku)',
      subtitle: 'Zjištění účelu služby, účtu pro přihlášení a bezpečnostní zhodnocení',
      steps: [
        {
          id: 't4-s1',
          text: 'Otevřete konzoli Služby (`Win + R ➔ services.msc`).',
        },
        {
          id: 't4-s2',
          text: 'V seznamu vyhledejte službu s názvem `Zařazování tisku` (anglicky `Print Spooler`).',
        },
        {
          id: 't4-s3',
          text: 'Dvojklikem otevřete její Vlastnosti a prozkoumejte text v poli `Popis` na záložce `Obecné` a nastavený účet na záložce `Přihlášení`.',
        },
      ],
      questions: [
        {
          id: 'q4-services-details',
          type: 'textarea',
          label: '4A. Účel služby a uživatelský účet: Co přesně tato služba v operačním systému dělá (vlastními slovy podle pole Popis) a pod jakým účtem je přihlášena (záložka Přihlášení)?',
          placeholder: 'Co služba dělá: ...\nÚčet pro přihlášení: ...',
        },
        {
          id: 'q4-services-security',
          type: 'textarea',
          label: '4B. Bezpečnostní význam: Co znamená tento účet z hlediska oprávnění v systému? Proč by bylo pro útočníka obrovskou výhrou, kdyby jeho škodlivý kód běžel pod tímto účtem, a může si novou službu vytvořit běžný uživatel bez práv správce (UAC)?',
          placeholder: 'Práva účtu v systému: ...\nProč je to cíl pro malware: ...\nVytvoření bez UAC (Ano/Ne): ...',
        },
      ],
    },
    {
      id: 'task-5-registry',
      number: '5',
      title: 'Úroveň 5: Systémový registr (Klíč Run – automatické spuštění)',
      subtitle: 'Zápis programu do uživatelské větve registru HKCU pro automatický start',
      steps: [
        {
          id: 't5-s1',
          text: 'Spusťte Editor registru (`Win + R ➔ regedit`) a přejděte do klíče: `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`.',
        },
        {
          id: 't5-s2',
          text: 'V pravém okně klikněte pravým tlačítkem ➔ `Nový` ➔ `Řetězcová hodnota (REG_SZ)`, pojmenujte ji `TestPlanovac` a jako hodnotu zadejte cestu k Plánovači úloh: `taskschd.msc` (nebo `C:\\Windows\\System32\\taskschd.msc`).',
        },
        {
          id: 't5-s3',
          text: 'Odhlaste se ze systému Windows a znovu se přihlaste (nebo restartujte PC) – ověřte, že se Plánovač úloh po náběhu plochy sám automaticky otevřel.',
        },
        {
          id: 't5-s4',
          text: 'Po ověření se vraťte do `regedit` na klíč `Run`, testovací hodnotu `TestPlanovac` označte a smažte (klávesa Delete), aby se Plánovač nespouštěl při každém startu.',
        },
      ],
      questions: [
        {
          id: 'q5-registry-test',
          type: 'textarea',
          label: '5A. Automatické spuštění přes registr: Zapište celou cestu ke klíči Run v registru. Spustil se Plánovač úloh po novém přihlášení? Vyžadoval zápis do této větve (HKCU) administrátorská práva (potvrzení dialogu UAC)?',
          placeholder: 'Cesta v registru: ...\nSpuštění Plánovače úloh (Ano/Ne): ...\nVyžadovalo UAC: ...',
        },
      ],
    },
    {
      id: 'task-6-autoruns',
      number: '6',
      title: 'Úkol 6: Audit v Sysinternals Autoruns (Rychlé vyšetřování)',
      subtitle: 'Forenzní pohled na všechna místa automatického spouštění najednou',
      steps: [
        {
          id: 't6-s1',
          text: 'Spusťte nástroj `autoruns64.exe` (případně využijte interaktivní náhled ze záložky simulátoru).',
        },
        {
          id: 't6-s2',
          text: 'V horním menu `Options` zaškrtněte `Hide Microsoft Entries` (odfiltruje systémové záznamy Windows) a proklikejte záložky `Logon`, `Scheduled Tasks` a `Services`.',
        },
      ],
      questions: [
        {
          id: 'q6-autoruns-logon',
          type: 'text',
          label: '6A. Která dvě hlavní místa automatického spouštění (která jsme probírali v Úkolu 1 a Úkolu 5) sdružuje záložka Logon v Autoruns?',
          placeholder: 'Např. Složka Po spuštění a Registr Run...',
        },
        {
          id: 'q6-autoruns-taskmgr',
          type: 'text',
          label: '6B. Zobrazuje běžný Správce úloh (záložka Aplikace po spuštění) položky ze záložek Scheduled Tasks a Services? (Napište: Ano / Ne)',
          placeholder: 'Ano / Ne',
        },
        {
          id: 'q6-autoruns-color',
          type: 'text',
          label: '6C. Jakou barvou Autoruns podbarvuje položky, které nemají platný digitální podpis ověřeného vydavatele (nebo soubor na disku chybí)?',
          placeholder: 'Např. Růžová / Žlutá...',
        },
      ],
    },
    {
      id: 'task-7-disable-taskmgr',
      number: '7*',
      bonus: true,
      title: 'Úkol 7* (Pokročilé): Sabotáž obrany – zákaz Správce úloh přes registr',
      subtitle: 'Praktická ukázka, jak malware sváže administrátorovi ruce hodnotou REG_DWORD',
      steps: [
        {
          id: 't7-s1',
          text: 'V Editoru registru (`regedit`) přejděte do klíče: `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies`.',
        },
        {
          id: 't7-s2',
          text: 'Pokud ve složce `Policies` ještě neexistuje podsložka `System`, vytvořte ji: pravým tlačítkem na `Policies` ➔ `Nový` ➔ `Klíč` a pojmenujte ho `System`.',
        },
        {
          id: 't7-s3',
          text: 'Uvnitř klíče `System` klikněte v pravém okně pravým tlačítkem ➔ `Nový` ➔ `Hodnota DWORD (32bitová)`, pojmenujte ji přesně `DisableTaskMgr` a poklepáním nastavte její číselnou hodnotu na `1`.',
        },
        {
          id: 't7-s4',
          text: 'Stiskněte klávesovou zkratku `Ctrl + Shift + Esc` (nebo klikněte pravým na hlavní panel ➔ Správce úloh). Sledujte, jakou chybovou hlášku Windows zobrazí.',
        },
        {
          id: 't7-s5',
          text: 'DŮLEŽITÝ ÚKLID: Vraťte se do `regedit` a hodnotu `DisableTaskMgr` změňte na `0` (nebo ji smažte klávesou Delete). Znovu stiskněte `Ctrl + Shift + Esc` a ověřte, že Správce úloh opět funguje!',
        },
      ],
      questions: [
        {
          id: 'q7-taskmgr-message',
          type: 'textarea',
          label: '7A. Jaké přesné znění chybové hlášky Windows zobrazily po stisku Ctrl + Shift + Esc se zapnutou hodnotou DisableTaskMgr = 1?',
          placeholder: 'Znění chybové zprávy: ...',
        },
        {
          id: 'q7-taskmgr-security',
          type: 'textarea',
          label: '7B. Proč je tato technika pro tvůrce malwaru tak nebezpečně efektivní? Co by běžný uživatel dělal, kdyby mu škodlivý kód takto zablokoval Správce úloh i Editor registru?',
          placeholder: 'Proč to útočník dělá a jaký je dopad na uživatele: ...',
        },
      ],
    },
  ],
};

export const PERSISTENCE_QUIZ_QUESTIONS: ReviewQuestion[] = [
  {
    id: 1,
    type: 'single',
    category: 'Princip persistence',
    question: 'Proč potřebuje většina malwaru (např. spyware nebo backdoor) v operačním systému získat tzv. persistenci?',
    options: [
      'Protože operační paměť RAM se při vypnutí nebo restartu počítače vymaže a bez automatického spuštění by malware po restartu nebyl aktivní.',
      'Protože bez zápisu do registru nedokáže proces v operační paměti vůbec komunikovat s procesorem (CPU).',
      'Protože Windows automaticky mažou složku Stažené soubory každých 24 hodin.',
      'Protože persistence automaticky opatří škodlivý soubor platným digitálním certifikátem.',
    ],
    correctIndices: [0],
    explanation:
      'Běžící program žije v paměti RAM, která je volatilní. Po restartu PC paměť RAM ztratí veškerý obsah, takže malware musí zajistit, aby ho OS po startu znovu načetl z disku.',
  },
  {
    id: 2,
    type: 'single',
    category: 'Oprávnění a UAC',
    question: 'Která z následujících metod persistence VYŽADUJE práva administrátora (potvrzení UAC)?',
    options: [
      'Vytvoření nové systémové služby Windows (Services) nebo zápis do větve HKEY_LOCAL_MACHINE (HKLM).',
      'Vložení zástupce do uživatelské složky Po spuštění (shell:startup).',
      'Zápis klíče do uživatelské větve registru HKEY_CURRENT_USER (HKCU\\...\\Run).',
      'Vytvoření běžné uživatelské úlohy v Plánovači úloh spouštěné při přihlášení daného uživatele.',
    ],
    correctIndices: [0],
    explanation:
      'Systémové služby a větev HKLM ovlivňují celý počítač a všechny uživatele, proto do nich smí zapisovat pouze proces s právy správce (Admin / UAC).',
  },
  {
    id: 3,
    type: 'single',
    category: 'Složka Po spuštění',
    question: 'Jakým rychlým příkazem v dialogu Spustit (Win + R) otevřete složku „Po spuštění“ pouze pro aktuálně přihlášeného uživatele?',
    options: ['shell:startup', 'shell:common startup', 'msconfig /startup', 'regedit /startup'],
    correctIndices: [0],
    explanation:
      'Příkaz shell:startup otevře složku Startup v profilu přihlášeného uživatele (%AppData%). Příkaz shell:common startup otevírá celosystémovou složku v C:\\ProgramData.',
  },
  {
    id: 4,
    type: 'single',
    category: 'Správce úloh vs. Autoruns',
    question: 'Proč běžný Správce úloh (záložka „Aplikace po spuštění“) NESTAČÍ k odhalení všech typů persistence?',
    options: [
      'Protože zobrazuje jen složku Po spuštění a základní klíče Run, ale vůbec neukazuje Plánovač úloh ani Systémové služby.',
      'Protože Správce úloh zobrazuje pouze programy podepsané společností Microsoft.',
      'Protože Správce úloh nedokáže číst větev HKEY_CURRENT_USER.',
      'Protože záložka Aplikace po spuštění se vymaže při každém restartu počítače.',
    ],
    correctIndices: [0],
    explanation:
      'Správce úloh kontroluje jen Složku Po spuštění a základní klíče Run. Úlohy v Plánovači úloh i systémové služby odhalí až specializovaný nástroj Sysinternals Autoruns.',
  },
  {
    id: 5,
    type: 'single',
    category: 'Časová osa startu',
    question: 'Který typ persistence se spouští NEJDŘÍVE – ještě předtím, než se k počítači přihlásí jakýkoliv uživatel?',
    options: [
      'Systémová služba Windows (Windows Service) s typem spouštění Automaticky.',
      'Zástupce ve složce shell:startup.',
      'Klíč v registru HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run.',
      'Položka v klíči HKEY_CURRENT_USER\\...\\RunOnce.',
    ],
    correctIndices: [0],
    explanation:
      'Systémové služby startuje jádro OS při samotném bootu počítače na pozadí (pod účtem SYSTEM), ještě než se vůbec objeví přihlašovací obrazovka uživatele.',
  },
  {
    id: 6,
    type: 'single',
    category: 'Plánovač úloh',
    question: 'Ve Správci úloh ukončíte podezřelý proces miner.exe, ale za 5 minut se proces sám znovu objeví (i bez restartu PC). Který mechanismus persistence ho nejpravděpodobněji oživuje?',
    options: [
      'Pravidelná úloha v Plánovači úloh (Task Scheduler) nastavená na opakovaný časový interval.',
      'Položka v registru RunOnce.',
      'Zástupce ve složce shell:startup.',
      'Statická knihovna DLL ve složce System32.',
    ],
    correctIndices: [0],
    explanation:
      'Složka Startup i klíče Run/RunOnce se vykonávají pouze při přihlášení uživatele. Opakované spouštění za běhu systému (např. každých 5 minut) typicky zajišťuje Plánovač úloh.',
  },
  {
    id: 7,
    type: 'single',
    category: 'Systémový registr',
    question: 'Jaký je rozdíl mezi klíčem Run a klíčem RunOnce v systémovém registru Windows?',
    options: [
      'Položky v Run se spouštějí při každém přihlášení, zatímco položky v RunOnce se spustí pouze jednou při nejbližším přihlášení a poté se samy smažou.',
      'Klíč Run funguje jen pro běžné uživatele, zatímco RunOnce funguje pouze pro účet Administrator.',
      'Klíč RunOnce spouští programy v nouzovém režimu (Safe Mode), zatímco Run v běžném režimu.',
      'Mezi klíči není žádný rozdíl, jde jen o starší a novější název.',
    ],
    correctIndices: [0],
    explanation:
      'RunOnce slouží legitimně např. k dokončení instalace po restartu – program se po přihlášení spustí jedinkrát a systém záznam z RunOnce automaticky odstraní.',
  },
  {
    id: 8,
    type: 'single',
    category: 'Nástroje OS',
    question: 'Jakými příkazy v dialogu Spustit (Win + R) otevřete Plánovač úloh, Systémové služby a Editor registru?',
    options: [
      'taskschd.msc (Plánovač úloh), services.msc (Služby), regedit (Editor registru).',
      'scheduler.exe (Plánovač úloh), srv.msc (Služby), registry.msc (Editor registru).',
      'cron.msc (Plánovač úloh), daemons.msc (Služby), reg.exe (Editor registru).',
      'msconfig (Plánovač úloh), taskmgr (Služby), cmd (Editor registru).',
    ],
    correctIndices: [0],
    explanation:
      'Standardní konzole ve Windows se spouštějí přes taskschd.msc (Plánovač úloh), services.msc (Služby) a regedit / regedit.exe (Editor registru).',
  },
  {
    id: 9,
    type: 'single',
    category: 'Postup likvidace',
    question: 'Jaký je správný profesionální postup odstranění běžícího malwaru, který si v paměti aktivně hlídá a obnovuje svůj záznam v registru?',
    options: [
      '1. Pozastavit proces (Suspend) ➔ 2. Smazat záznam persistence (Autoruns / Registr) ➔ 3. Ukončit proces (Kill) a smazat soubor z disku.',
      '1. Smazat soubor na disku ➔ 2. Restartovat počítač ➔ 3. Smazat registr.',
      '1. Ukončit proces (Kill) ➔ 2. Restartovat počítač ➔ 3. Zkontrolovat složku Po spuštění.',
      'Stačí smazat klíč v registru, běžící proces v paměti RAM se tím automaticky ukončí sám.',
    ],
    correctIndices: [0],
    explanation:
      'Pokud proces nejprve jen zmrazíte (Suspend), nemůže reagovat a obnovit smazaný klíč v registru. Poté klidně vyčistíte persistenci a nakonec proces ukončíte a smažete z disku.',
  },
  {
    id: 10,
    type: 'fill',
    category: 'Sysinternals',
    question: 'Jak se jmenuje specializovaný nástroj ze sady Microsoft Sysinternals, který na jednom místě zobrazí všechny automaticky spouštěné programy (Logon, Plánovač úloh, Služby, Ovladače)? (Napište jednoslovný název nástroje)',
    correctAnswers: ['Autoruns', 'autoruns', 'autoruns.exe', 'autoruns64.exe', 'Autoruns64'],
    expectedFormat: 'Jednoslovný název nástroje (např. Autoruns)',
    explanation:
      'Nástroj Sysinternals Autoruns (autoruns.exe / autoruns64.exe) je zlatým standardem pro forenzní kontrolu všech míst automatického spouštění ve Windows.',
  },
];
