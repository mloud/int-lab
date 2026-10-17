import type { OutlineGroup } from './outlineTypes';

const SUBJECT = 'Operační systémy 1';
const BASE = '/specializovana/operacni-systemy-1/gui';

/** Grafické rozhraní Windows 11 (~10 h) – anatomie, souborový strom, atributy, konfigurace a ergonomie. */
export const OSS1_GUI: OutlineGroup = {
  chapterId: 'os-gui',
  chapterTitle: 'Grafické rozhraní Windows 11',
  chapterDescription: 'Anatomie GUI a proces Explorer, hierarchie disku C:, práce se soubory a atributy, konfigurace a ergonomie.',
  chapterTag: 'gui',
  chapterPath: BASE,
  subjectTitle: SUBJECT,
  grade: 1,
  gradeLabel: '1. Ročník',
  thematicBlock: 'Grafické rozhraní a správa souborů',
  icon: 'AppWindow',
  gradient: 'from-purple-600 to-indigo-600',
  items: [
    {
      slug: 'anatomie',
      tag: 'GUI1',
      title: 'Anatomie GUI a proces Explorer',
      hours: '2 h',
      subtitle: 'Desktop Window Manager, hlavní panel, oznamovací oblast a restart zamrzlého GUI.',
      intro: 'Plocha, okna i hlavní panel nejsou kouzlo, ale běžící procesy v User Space. Zjistíme, co dělá proces explorer.exe a jak restartovat zamrzlé rozhraní bez restartu celého PC.',
      topics: [
        'Architektura desktopu: DWM (dwm.exe) a hardwarová akcelerace grafiky',
        'Role procesu explorer.exe (plocha, hlavní panel, okna)',
        'Oznamovací oblast (systémový tray), Rychlé nastavení (Win+A) a Centrum oznámení (Win+N)',
        'Řešení zamrznutí: restart procesu explorer.exe ve Správci úloh a z příkazové řádky'
      ],
      practice: [
        'Simulace: Interaktivní pitevna plochy – sestřelení a oživení procesu explorer.exe',
        'Praxe v OS: Správce úloh – restart procesu Průzkumník Windows a sledování chování plochy'
      ],
      builds: 'Procesy a paměť (PR1 – program vs. proces v RAM).'
    },
    {
      slug: 'hierarchie',
      tag: 'GUI2',
      title: 'Průzkumník a hierarchie disku C:',
      hours: '2 h',
      subtitle: 'Skutečné fyzické cesty na disku vs. virtuální knihovny a zástupci.',
      intro: 'Běžný uživatel vidí „Plochu“ nebo „Stažené soubory“, správce však musí znát přesnou fyzickou strukturu disku C:. Podíváme se pod kapotu adresářového stromu Windows.',
      topics: [
        'Fyzická struktura disku C: (Windows, System32, Program Files vs. Program Files (x86), ProgramData)',
        'Uživatelské profily v C:\\Users\\<Jméno> a skrytá složka AppData (Local vs. Roaming)',
        'Absolutní vs. relativní cesta k souboru',
        'Virtuální zástupci a knihovny vs. skutečné umístění dat na disku'
      ],
      practice: [
        'Simulace: Rentgen disku C: – odhalení fyzického umístění zdánlivě virtuálních složek',
        'Praxe v OS: Otevření skryté složky %appdata% a %localappdata% přes dialog Spustit (Win+R)'
      ],
      builds: 'Souborové systémy a disky (FS1 – stromová hierarchie, FS3 – diskové oddíly).'
    },
    {
      slug: 'soubory-atributy',
      tag: 'GUI3',
      title: 'Práce se soubory, přípony a atributy',
      hours: '2 h',
      subtitle: 'Přípony souborů, asociace aplikací, zástupci .lnk a atributy R, H, A, S.',
      intro: 'Proč je skrytí přípon největší bezpečnostní past a proč zkopírováním zástupce .lnk na flash disk nepřenesete hru? Naučíme se přesně manipulovat se soubory a jejich metadaty.',
      topics: [
        'Přípony souborů a asociace výchozích aplikací v systému',
        'Zástupce (.lnk) vs. skutečný soubor na disku',
        'Výběry a bezpečné operace (Ctrl, Shift, tažení myší na stejný vs. jiný disk)',
        'Souborové atributy: R (jen pro čtení), H (skrytý), A (archivní pro zálohování), S (systémový)'
      ],
      practice: [
        'Simulace: Detektiv souborů – odhalení maskovaných přípon (faktura.pdf.exe) a vlastností zástupců',
        'Praxe v OS: Zobrazení přípon a skrytých souborů, vytvoření zástupce s klávesovou zkratkou a ověření atributů'
      ],
      builds: 'FAT alokace (FS4) a Archivní bit ze zálohování.'
    },
    {
      slug: 'konfigurace',
      tag: 'GUI4',
      title: 'Konfigurace: Nastavení vs. Ovládací panely',
      hours: '2 h',
      subtitle: 'Moderní rozhraní Nastavení, klasické applety .cpl a tajné menu správce Win+X.',
      intro: 'Windows 11 mají dvě tváře konfigurace. Ukážeme si, co řešit v moderním Nastavení, kdy sáhnout po inženýrských Ovládacích panelech a jak bleskově spouštět nástroje přes Win+X a Win+R.',
      topics: [
        'Moderní Nastavení (Win+I) vs. klasické Ovládací panely (control)',
        'Klíčové applety správce: ncpa.cpl (síť), sysdm.cpl (systém), appwiz.cpl (programy), mmsys.cpl (zvuk)',
        'Rychlé menu pokročilých nástrojů: Win+X',
        'Rychlé vyhledávání ve Startu a dialog Spustit (Win+R)'
      ],
      practice: [
        'Simulace: Trenažér správce – rychlá volba správného konfiguračního nástroje pro konkrétní požadavek',
        'Praxe v OS: Bleskové spouštění ovládacích appletů pomocí zkratek a dialogu Spustit'
      ],
      builds: 'Anatomie GUI (GUI1) a příprava na nástroje správce.'
    },
    {
      slug: 'ergonomie',
      tag: 'GUI5',
      title: 'Ergonomie a efektivní práce',
      hours: '2 h',
      subtitle: 'Snap Layouts, virtuální plochy, historie schránky Win+V a zkratky profíků.',
      intro: 'Skutečný IT profesionál nekliká myší tam, kde stačí klávesová zkratka. Naučíme se ovládat okna jako v profesionálním dispečinku pomocí Snap Layouts a virtuálních ploch.',
      topics: [
        'Snap Layouts a Snap Assist (organizace oken na poloviny, třetiny a čtvrtiny pomocí Win + šipky)',
        'Virtuální plochy (Win+Ctrl+D, Win+Ctrl+šipky) pro oddělení pracovních kontextů',
        'Pokročilá schránka: historie schránky (Win+V) a připínání položek',
        'Nástroj Výstřižky (Win+Shift+S) a desatero klíčových klávesových zkratek pro multitasking'
      ],
      practice: [
        'Simulace: Speedrunner klávesových zkratek a rozmisťování oken do mřížky 2×2',
        'Praxe v OS: Uspořádání 4 oken pomocí Win+šipek, aktivace historie schránky a práce na 2 virtuálních plochách'
      ],
      builds: 'Všechny předchozí podkapitoly GUI.'
    }
  ]
};

const CLI_BASE = '/specializovana/operacni-systemy-1/prikazova-radka';

/** Příkazová řádka a dávkové soubory (~10 h) – navigace, manipulace se soubory, roury, skriptování .bat a logika. */
export const OSS1_CLI: OutlineGroup = {
  chapterId: 'os-cli',
  chapterTitle: 'Příkazová řádka a dávkové soubory',
  chapterDescription: 'Orientace v systému a navigace, správa souborů a složek, roury a filtry, dávkové skripty .bat, podmínky a cykly.',
  chapterTag: 'cmd',
  chapterPath: CLI_BASE,
  subjectTitle: SUBJECT,
  grade: 1,
  gradeLabel: '1. Ročník',
  thematicBlock: 'Příkazová řádka a automatizace',
  icon: 'Terminal',
  gradient: 'from-purple-600 to-indigo-600',
  items: [
    {
      slug: 'navigace',
      tag: 'CLI1',
      title: 'Orientace v systému a navigace',
      hours: '2 h',
      subtitle: 'Spuštění CMD, přepínání disků, příkazy cd a dir, absolutní a relativní cesty.',
      intro: 'Příkazová řádka není strašák, ale nejrychlejší nástroj správce. Místo klikání myší budeme systém procházet bleskově pomocí klávesnice. Naučíme se přepínat disky, listovat adresáři a chápat význam teček . a .. v cestách.',
      topics: [
        'Spuštění CMD: běžný uživatel vs. Správce (UAC a oprávnění)',
        'Přepínání diskových jednotek (C:, D:) a aktuální pracovní adresář (Current Working Directory)',
        'Výpis obsahu: příkaz dir a klíčové přepínače (/w, /p, /o:n, /a)',
        'Pohyb po stromu adresářů: příkaz cd, absolutní vs. relativní cesta',
        'Význam tečky (.) a dvojtečky (..) a efektivní práce s klávesou Tab (automatické doplňování)'
      ],
      practice: [
        'Simulace: Terminálový trenažér – procházení bludištěm složek pouze pomocí cd a dir bez myši',
        'Praxe v OS: Otevření CMD se správcovskými právy a zjištění vlastní polohy v adresářovém stromu'
      ],
      builds: 'Průzkumník a hierarchie disku C: (GUI2 – fyzická struktura složek a stromu).'
    },
    {
      slug: 'soubory',
      tag: 'CLI2',
      title: 'Správa souborů a složek',
      hours: '2 h',
      subtitle: 'Vytváření, přejmenování, mazání, kopírování a zástupné znaky * a ?.',
      intro: 'Když potřebujete vytvořit 20 složek nebo přesunout stovky souborů, myš vás zdrží. V příkazovém řádku zvládnete manipulaci se soubory pomocí několika znaků a hvězdičkových masek.',
      topics: [
        'Vytváření a mazání složek: mkdir (md) a rmdir (rd /s /q)',
        'Přejmenování a mazání souborů: ren (rename) a del (erase /p /f /q)',
        'Kopírování a přesouvání: copy, move a pokročilý xcopy pro stromové kopírování',
        'Hvězdičková konvence (wildcards): význam * a ? pro hromadné operace (např. *.docx, test?.txt)',
        'Bezpečnostní rizika příkazu del a proč v CLI neexistuje Koš (okamžité nevratné smazání)'
      ],
      practice: [
        'Simulace: Třídič dat v terminálu – bleskový úklid rozházených souborů do složek pomocí copy a wildcards',
        'Praxe v OS: Vytvoření testovací struktury projektových složek jedním příkazem a bezpečné promazání'
      ],
      builds: 'Orientace v systému (CLI1) a Práce se soubory a příponami (GUI3).'
    },
    {
      slug: 'proudy-a-filtry',
      tag: 'CLI3',
      title: 'Roury, filtry a informace o systému',
      hours: '2 h',
      subtitle: 'Příkaz tree, přesměrování > a >>, roura |, filtr findstr a zjištění stavu PC.',
      intro: 'Skutečná síla příkazové řádky spočívá v řetězení. Výstup jednoho příkazu pošleme jako vstup do druhého pomocí roury, vyfiltrujeme jen to důležité a výsledek uložíme do textového souboru.',
      topics: [
        'Vizuální strom adresářů: příkaz tree a tree /f',
        'Přesměrování výstupu: operátory > (přepsání) a >> (připojení na konec souboru)',
        'Roura (Pipe |): předání výstupu jednoho příkazu do vstupu dalšího',
        'Vyhledávání a filtrování v textu: příkaz findstr a přepínače (/i pro ignorování velikosti písmen)',
        'Zjištění stavu systému: systeminfo a systémové proměnné (%USERNAME%, %USERPROFILE%, %DATE%)'
      ],
      practice: [
        'Simulace: Instalatér rour – sestavení správného řetězce pro zjištění instalované RAM nebo verze OS',
        'Praxe v OS: Vygenerování kompletního auditu PC (systeminfo) a vyfiltrování modelu procesoru do souboru audit.txt'
      ],
      builds: 'Správa procesů v CLI (tasklist | findstr z BZ2) a správa souborů (CLI2).'
    },
    {
      slug: 'davky-zaklad',
      tag: 'BAT1',
      title: 'Dávkové soubory a automatizace',
      hours: '2 h',
      subtitle: 'Stavba skriptu .bat, vypnutí echa, komentáře REM, parametry %1 a vstupy.',
      intro: 'Už žádné opakované ruční psaní příkazů. Dávkový soubor (.bat) je posloupnost příkazů, kterou systém provede automaticky za vás. Naučíme se psát čisté a přehledné skripty.',
      topics: [
        'Co je dávkový soubor (.bat / .cmd) a jak jej systém vykonává řádek po řádku',
        'Čistota výstupu: potlačení echa příkazů (@echo off), zprávy uživateli (echo) a pozastavení (pause)',
        'Dokumentace skriptu: komentáře REM a ::',
        'Proměnné ve skriptu: zadání hodnoty uživatelem (set /p jmeno=Zadej:) a interní proměnné',
        'Předávání parametrů z příkazové řádky (%1, %2, ... %*)'
      ],
      practice: [
        'Simulace: Editor a krokovací simulátor dávkového souboru s vizualizací vykonávání řádek po řádku',
        'Praxe v OS: Vytvoření vlastního uvítacího a čisticího skriptu zaloha_projektu.bat v Poznámkovém bloku'
      ],
      builds: 'Příkazy pro správu souborů (CLI2) a přesměrování výstupů (CLI3).'
    },
    {
      slug: 'davky-logika',
      tag: 'BAT2',
      title: 'Podmínky, skoky a cykly',
      hours: '2 h',
      subtitle: 'Podmínka if a if exist, skoky goto, návěstí a cyklus for pro hromadné operace.',
      intro: 'Skript, který se umí sám rozhodovat. Naučíme se otestovat existenci souboru, vytvořit interaktivní textové menu se skoky a pomocí cyklu for provést hromadnou operaci se stovkami položek.',
      topics: [
        'Podmíněné větvení: if, if not, if exist a větev else',
        'Návěstí (:START, :KONEC) a nepodmíněný skok goto',
        'Stavba interaktivního textového menu v CMD (volba akce 1, 2, 3)',
        'Návratové kódy programů a proměnná %ERRORLEVEL% (detekce úspěchu/selhání příkazu)',
        'Cyklus for: procházení seznamu souborů a číselná řada for /L %%i in (1,1,10) do ...'
      ],
      practice: [
        'Simulace: Logický labyrint – doplnění správných podmínek if exist do záchranného skriptu',
        'Praxe v OS: Vytvoření skriptu pro hromadné generování složek trida_01 až trida_20 pomocí cyklu for'
      ],
      builds: 'Dávkové soubory (BAT1), most k automatizaci účtů (net user) a Plánovači úloh.'
    }
  ]
};

const USERS_BASE = '/specializovana/operacni-systemy-1/uzivatele';

/** Správa uživatelů, skupin a oprávnění (~8 h) – autentizace, zabezpečení a hesla, skupiny a NTFS práva. */
export const OSS1_USERS: OutlineGroup = {
  chapterId: 'os-users',
  chapterTitle: 'Správa uživatelů a oprávnění',
  chapterDescription: 'Autentizace a autorizace, lokální a MS účty, zabezpečení a hesla, správa skupin a NTFS oprávnění k datům.',
  chapterTag: 'users',
  chapterPath: USERS_BASE,
  subjectTitle: SUBJECT,
  grade: 1,
  gradeLabel: '1. Ročník',
  thematicBlock: 'Správa uživatelů a zabezpečení dat',
  icon: 'Users',
  gradient: 'from-purple-600 to-indigo-600',
  items: [
    {
      slug: 'ucty-autentizace',
      tag: 'USR1',
      title: 'Uživatelské účty a autentizace',
      hours: '2 h',
      subtitle: 'Autentizace vs. autorizace, lokální účet vs. Účet Microsoft, Standard vs. Správce.',
      intro: 'Kdo jsi a jak to operačnímu systému dokážeš? Naučíme se rozdíl mezi ověřením identity (autentizací) a přidělením pravomocí (autorizací), srovnáme výhody lokálních a online účtů a prozkoumáme správcovskou konzoli lusrmgr.msc i příkaz net user.',
      topics: [
        'Autentizace (kdo jsi) vs. Autorizace (co smíš dělat v systému)',
        'Typy účtů: Místní (lokální) účet vs. Účet Microsoft (výhody, nevýhody a ochrana soukromí)',
        'Úrovně oprávnění: Standardní uživatel vs. Správce (Administrator) a princip nejmenších práv (PoLP)',
        'Vestavěné systémové účty: Administrator (proč je v základu zakázaný), Guest a SYSTEM',
        'Nástroje správy: moderní Nastavení vs. profesionální konzole lusrmgr.msc a rychlý výpis net user'
      ],
      practice: [
        'Simulace: Trenažér rolí – rozpoznání, které operace vyžadují práva správce a které zvládne standardní uživatel',
        'Praxe v OS: Vytvoření lokálního účtu bez online účtu Microsoft a kontrola uživatelského profilu v C:\\Users'
      ],
      builds: 'Příkazová řádka (CLI1 a CLI2) a Anatomie GUI (GUI1).'
    },
    {
      slug: 'zabezpeceni-hesla',
      tag: 'USR2',
      title: 'Zabezpečení účtů a přihlašování',
      hours: '2 h',
      subtitle: 'Politika hesel, Windows Hello a TPM, zámek stanice Win+L a mechanismus UAC.',
      intro: 'Jak chránit účet před zneužitím spolužákem nebo útočníkem? Prozkoumáme pravidla bezpečných hesel, fungování PINu s vazbou na TPM čip (Windows Hello) a mechanismus Řízení uživatelských účtů (UAC).',
      topics: [
        'Zásady tvorby a expirace hesel (délka, komplexita, zákaz opakování)',
        'Moderní přihlašování: Windows Hello (PIN svázaný s TPM 2.0 čipem vs. heslo přenášené sítí, biometrie)',
        'Zabezpečení stanice při odchodu: bleskový zámek Win+L a časový limit nečinnosti',
        'Mechanismus UAC (User Account Control): bezpečný desktop (Secure Desktop) a ochrana před tichým spuštěním malware',
        'Správa hesel v lusrmgr.msc (vynucení změny hesla při prvním přihlášení) a dialog netplwiz'
      ],
      practice: [
        'Simulace: Testovač síly hesel a simulátor reakce UAC na různé typy systémových zásahů',
        'Praxe v OS: Nastavení expirace a pravidel pro heslo uživatele přes lusrmgr.msc a příkaz net user'
      ],
      builds: 'Uživatelské účty (USR1) a TPM čip z instalace OS.'
    },
    {
      slug: 'skupiny-a-role',
      tag: 'USR3',
      title: 'Uživatelské skupiny a role',
      hours: '2 h',
      subtitle: 'Proč skupiny existují, vestavěné skupiny Administrators/Users a hromadná správa.',
      intro: 'Správce nikdy nepřiděluje práva třiceti jednotlivcům zvlášť. Vytvoří skupinu, nastaví pravidla jednou a uživatele do ní pouze zařadí. Naučíme se spravovat skupiny v GUI i bleskově v příkazovém řádku.',
      topics: [
        'Proč používáme skupiny: princip hromadné správy a eliminace lidských chyb',
        'Vestavěné skupiny Windows: Administrators, Users, Backup Operators, Remote Desktop Users',
        'Tvorba vlastních skupin (např. Studenti, Ucitele, Vedeni) a správa členství',
        'Správa skupin v grafické konzoli lusrmgr.msc',
        'Správa skupin v CLI: příkaz net localgroup (/add, výpis členů, přiřazení uživatele)'
      ],
      practice: [
        'Simulace: Třídič oprávnění – zařazení zaměstnanců fiktivní firmy do správných systémových skupin',
        'Praxe v OS: Vytvoření skupiny Studenti a přidání nového uživatele jak v lusrmgr.msc, tak v CLI'
      ],
      builds: 'Uživatelské účty (USR1) a Příkazová řádka (CLI2).'
    },
    {
      slug: 'prava-soubory',
      tag: 'USR4',
      title: 'Práva k souborům a složkám (NTFS)',
      hours: '2 h',
      subtitle: 'Oprávnění NTFS, čtení/zápis/spuštění, dědičnost práv a automatizace přes icacls a .bat.',
      intro: 'Konečně propojíme souborový systém s uživateli. Nastavíme přesná NTFS oprávnění k projektovým složkám, pochopíme dědičnost od disku C:\\ a napíšeme skript, který vygeneruje odevzdávací složku pro celou třídu.',
      topics: [
        'Proč NTFS podporuje práva a FAT32 nikoliv (přístupové seznamy ACL a tokeny)',
        'Základní NTFS oprávnění: Úplné řízení (Full Control), Změnit (Modify), Číst a spouštět, Číst, Zapisovat',
        'Karta Zabezpečení (Security) ve vlastnostech složky v Průzkumníku',
        'Dědičnost oprávnění (Inheritance), její přerušení a přednost zákazu (Deny má přednost před Allow)',
        'Zjištění a nastavení práv v CLI: nástroj icacls',
        'Finální automatizace: hromadný .bat skript pro vytvoření skupiny, studentů a nastavení práv složky'
      ],
      practice: [
        'Simulace: Kalkulátor efektivních práv – vyhodnocení konfliktu mezi členstvím ve skupinách a zákazem Deny',
        'Praxe v OS: Vytvoření odevzdávací složky C:\\Odevzdani s právem zápisu pro Studenty a uzamčení proti mazání'
      ],
      builds: 'Uživatelské skupiny (USR3), Souborové systémy (FS4) a Dávkové skripty (BAT2).'
    }
  ]
};

const SW_BASE = '/specializovana/operacni-systemy-1/software';

/** Správa aplikačního software (~4 h) – životní cyklus, instalátory EXE vs. MSI, registry a balíčkovač winget. */
export const OSS1_SOFTWARE: OutlineGroup = {
  chapterId: 'os-software',
  chapterTitle: 'Správa aplikačního software',
  chapterDescription: 'Životní cyklus software, instalátory EXE a MSI, registr Windows a moderní balíčkovač Winget.',
  chapterTag: 'app',
  chapterPath: SW_BASE,
  subjectTitle: SUBJECT,
  grade: 1,
  gradeLabel: '1. Ročník',
  thematicBlock: 'Správa software a automatizace',
  icon: 'Package',
  gradient: 'from-purple-600 to-indigo-600',
  items: [
    {
      slug: 'instalatory',
      tag: 'SW1',
      title: 'Životní cyklus software a instalátory (EXE vs. MSI)',
      hours: '2 h',
      subtitle: 'Životní cyklus, umístění na disku, registr Windows, instalátory .exe vs. balíčky .msi.',
      intro: 'Jak se program dostane do systému a co po sobě zanechá? Prozkoumáme životní cyklus software, rozdíl mezi Program Files a uživatelským profilem AppData, záznamy v registru Windows i výhody transakčních .msi balíčků s tichou instalací msiexec.',
      topics: [
        'Životní cyklus aplikace: zdroj ➔ instalace ➔ konfigurace ➔ aktualizace ➔ odinstalace',
        'Kam se software instaluje: Program Files (64-bit), Program Files x86 (32-bit) a AppData\\Programs',
        'Registr Windows (regedit): HKLM a HKCU, odkud systém čte seznam nainstalovaných programů',
        'Typy instalátorů: .exe (vlastní instalátory a tiché přepínače /S, /q) vs. .msi (Windows Installer, rollback, msiexec)',
        'Přenosné aplikace (Portable) – běh bez instalace a beze stop v registru'
      ],
      practice: [
        'Simulace: Rentgen instalace – co všechno v systému instalátor vytvoří (soubory, registry, zástupce)',
        'Praxe v OS: Tichá bezobslužná instalace balíčku .msi z příkazové řádky pomocí msiexec /i /qn'
      ],
      builds: 'Příkazová řádka (CLI2) a Průzkumník a hierarchie C: (GUI2).'
    },
    {
      slug: 'winget',
      tag: 'SW2',
      title: 'Moderní správa software přes balíčkovač Winget',
      hours: '2 h',
      subtitle: 'Windows Package Manager, vyhledávání, bezobslužná instalace a dávkový post-install skript.',
      intro: 'Konec ručního klikání a stahování instalátorů z pochybných webů. S balíčkovačem Winget nainstalujeme, zaktualizujeme i odinstalujeme libovolný software jedním příkazem přímo z ověřeného repozitáře.',
      topics: [
        'Proč používat balíčkovače: inspirace ze světa Linuxu (apt), bezpečnost a kontrola hashů',
        'Příkaz winget search a vyhledání jedinečného ID balíčku (např. VideoLAN.VLC)',
        'Instalace a odinstalace: winget install <ID> --silent a winget uninstall',
        'Audit a hromadná aktualizace: winget list a bleskový upgrade celého PC přes winget upgrade --all',
        'Automatizace přípravy nového PC: tvorba dávkového skriptu post-install.bat'
      ],
      practice: [
        'Simulace: Trenažér balíčkovače – sestavení správného příkazu pro bezobslužnou instalaci a aktualizaci',
        'Praxe v OS: Vytvoření vlastního dávkového skriptu v Poznámkovém bloku pro hromadnou instalaci 4 aplikací'
      ],
      builds: 'Instalátory EXE vs. MSI (SW1) a Dávkové soubory (BAT1).'
    }
  ]
};

const DEV_BASE = '/specializovana/operacni-systemy-1/zarizeni';

/** Správa zařízení a ovladače (~2 h) – architektura ovladačů, Plug and Play, Správce zařízení, tiskárny a pnputil. */
export const OSS1_DEVICES: OutlineGroup = {
  chapterId: 'os-devices',
  chapterTitle: 'Správa zařízení a ovladače',
  chapterDescription: 'Architektura ovladačů (Drivers), Plug and Play, Správce zařízení, tiskárny a nástroj pnputil.',
  chapterTag: 'dev',
  chapterPath: DEV_BASE,
  subjectTitle: SUBJECT,
  grade: 1,
  gradeLabel: '1. Ročník',
  thematicBlock: 'Hardware, periférie a ovladače',
  icon: 'Cpu',
  gradient: 'from-purple-600 to-indigo-600',
  items: [
    {
      slug: 'ovladace',
      tag: 'DEV',
      title: 'Správa zařízení a ovladače (Drivers)',
      hours: '2 h',
      subtitle: 'Architektura ovladačů, Plug and Play, Správce zařízení, tiskárny a záloha přes pnputil.',
      intro: 'Jak operační systém komunikuje s fyzickým hardwarem? Ovladač funguje jako tlumočník běžící v jádře systému (Ring 0). Naučíme se diagnostikovat hardwarové konflikty ve Správci zařízení, spravovat tiskové fronty a zálohovat ovladače přes pnputil.',
      topics: [
        'Architektura ovladačů (Drivers): proč ovladač běží v Ring 0 a proč 64-bit Windows vyžaduje digitální podpis (WHQL)',
        'Mechanismus Plug and Play (PnP) a identifikace hardwaru (Hardware ID: Vendor ID VID a Product ID PID)',
        'Diagnostika ve Správci zařízení (devmgmt.msc): funkční stav, žlutý vykřičník (Kód 28), zakázané zařízení',
        'Správa tiskáren a tisková fronta: tiskový spooler (spoolsv.exe) a řešení zaseknutých tiskových úloh',
        'Správa a zálohování ovladačů v CLI: nástroj pnputil (/enum-drivers, export ovladačů ze systému)'
      ],
      practice: [
        'Simulace: Diagnostická ambulance – odhalení chybějícího ovladače podle VID/PID a uvolnění zaseknuté tiskárny',
        'Praxe v OS: Inspekce zařízení ve Správci zařízení a export ovladačů do záložní složky pomocí pnputil'
      ],
      builds: 'Architektura OS (kruhy Ring 0 vs. Ring 3) a Základy hardwaru (Von Neumann).'
    }
  ]
};

const SCH_BASE = '/specializovana/operacni-systemy-1/planovac';

/** Plánovač úloh a automatický provoz (~2 h) – konzole taskschd.msc, spouštěče, akce, kontext SYSTEM a schtasks. */
export const OSS1_SCHEDULER: OutlineGroup = {
  chapterId: 'os-scheduler',
  chapterTitle: 'Plánovač úloh a automatický provoz',
  chapterDescription: 'Konzole taskschd.msc, spouštěče (triggery), akce, běh pod účtem SYSTEM a příkaz schtasks.',
  chapterTag: 'plan',
  chapterPath: SCH_BASE,
  subjectTitle: SUBJECT,
  grade: 1,
  gradeLabel: '1. Ročník',
  thematicBlock: 'Automatizace a provoz systému',
  icon: 'Clock',
  gradient: 'from-purple-600 to-indigo-600',
  items: [
    {
      slug: 'ulohy',
      tag: 'SCH',
      title: 'Plánovač úloh a automatický provoz',
      hours: '2 h',
      subtitle: 'Konzole taskschd.msc, spouštěče (triggery), akce, běh pod účtem SYSTEM a příkaz schtasks.',
      intro: 'Systém administrátora musí fungovat autonomně 24/7. V Plánovači úloh propojíme všechny dosavadní znalosti: vytvoříme naplánovanou úlohu, která bude spouštět náš vlastní .bat skript pod účtem SYSTEM bez nutnosti přihlášení uživatele.',
      topics: [
        'Role Plánovače úloh v OS: rozdíl mezi interaktivním spuštěním uživatelem a autonomním během na pozadí',
        'Struktura úlohy: Spouštěč / Trigger (čas, událost, přihlášení, start PC) a Akce / Action (program, .bat skript)',
        'Podmínky a nastavení: běh pouze při napájení ze sítě, probuzení PC ze spánku, restart při selhání',
        'Bezpečnostní kontext: běh s právy přihlášeného uživatele vs. běh pod účtem SYSTEM bez nutnosti přihlášení',
        'Správa úloh v příkazovém řádku: nástroj schtasks (/create, /run, /query, /delete)'
      ],
      practice: [
        'Simulace: Architekt automatizace – nastavení správné kombinace triggeru, akce a bezpečnostního kontextu',
        'Praxe v OS: Vytvoření naplánované úlohy pro pravidelné spouštění zálohovacího skriptu každý pátek v konzoli taskschd.msc'
      ],
      builds: 'Dávkové soubory (BAT1), Správa uživatelů (USR1 – účet SYSTEM) a Správa software (SW2 – winget upgrade).'
    }
  ]
};

export const OSS1_GROUPS: OutlineGroup[] = [
  OSS1_GUI,
  OSS1_CLI,
  OSS1_USERS,
  OSS1_SOFTWARE,
  OSS1_DEVICES,
  OSS1_SCHEDULER
];
