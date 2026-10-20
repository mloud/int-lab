// =========================================================================
// ŠKOLNÍ VZDĚLÁVACÍ PROGRAM (ŠVP) PRO INSPIS – OPERAČNÍ SYSTÉMY (1.–3. ROČNÍK)
// Obor: 18-20-M/01 Informační technologie
// Celková dotace: 198 hodin (OSS 1: 66 h · OSS 2: 66 h · OSS 3: 66 h)
// Formát: Struktura Česká školní inspekce (InspIS ŠVP)
// =========================================================================

export interface SvpOutcomeBlock {
  id: string;
  topic: string;
  outcomes: string[];
  content: string[];
  crossThemes: string[];
  hours: number;
}

export interface SvpGradeData {
  gradeLabel: string;
  gradeCode: string;
  totalHours: number;
  blocks: SvpOutcomeBlock[];
}

export interface SvpSharedInfo {
  subjectName: string;
  fieldCode: string;
  fieldName: string;
  evaluation: string;
  keyCompetencies: {
    title: string;
    description: string;
  }[];
  crossCuttingThemes: {
    code: string;
    name: string;
    description: string;
  }[];
  interdisciplinaryRelations: string;
}

// -------------------------------------------------------------------------
// SPOLEČNÁ ČÁST PŘEDMĚTU PRO INSPIS (Všechny 3 ročníky)
// -------------------------------------------------------------------------
export const SVP_SHARED_INFO: SvpSharedInfo = {
  subjectName: 'Operační systémy',
  fieldCode: '18-20-M/01',
  fieldName: 'Informační technologie',
  evaluation:
    'Kritéria hodnocení vychází z pravidel pro hodnocení výsledků vzdělávání žáků střední školy. ' +
    'Hodnocení je numerické i slovní a probíhá průběžně i po skončení ucelených tematických bloků. ' +
    'Hodnotí se zejména praktické dovednosti – je systematicky ověřováno, zda žáci správně zvládli technologické postupy ' +
    'při instalaci, konfiguraci, zabezpečení a správě operačních systémů. Úroveň znalostí je zjišťována ' +
    'praktickými zkouškami u počítače, vypracováním laboratorních protokolů, ústním i písemným ověřováním. ' +
    'Důraz je kladen na samostatnost při řešení problémů, aktivitu během praktických cvičení, dodržování bezpečnostních ' +
    'zásad (zálohování, ochrana přístupových údajů, PoLP) a schopnost obhájit technické řešení v závěrečném projektu.',
  keyCompetencies: [
    {
      title: 'Kompetence k učení',
      description:
        'Žák je veden k hlubšímu pochopení principů fungování operačních systémů, k samostatnému vyhledávání, ' +
        'třídění a kritickému využívání technických informací a k propojování teoretických poznatků s praktickou administrací. ' +
        'Učí se pracovat s oficiální technickou dokumentací, manuálovými stránkami (man, help) a odbornou literaturou ' +
        'v českém i anglickém jazyce a reflektovat vlastní postupy při řešení zadaných úkolů.'
    },
    {
      title: 'Komunikativní kompetence',
      description:
        'Formuluje své myšlenky a postupy při řešení administrativních a bezpečnostních úloh, přesně využívá ' +
        'odbornou IT terminologii a spolupracuje při týmovém řešení komplexních úkolů. Je veden k srozumitelné ' +
        'prezentaci výsledků své práce, a to jak ústně, tak písemně prostřednictvím technických zpráv, protokolů ' +
        'a tiketů v agilním řízení. Rozumí odbornému textu a chybovým hlášením operačního systému v anglickém jazyce.'
    },
    {
      title: 'Kompetence k řešení problémů',
      description:
        'Žák identifikuje, analyzuje a diagnostikuje chybové a nestandardní stavy operačního systému, aktivních síťových prvků ' +
        'a serverových služeb. Učí se postupovat systematicky podle vrstveného diagnostického modelu, vyhodnocovat logy ' +
        'a systémové žurnály a nést odpovědnost za zvolený postup opravy. Využívá logické myšlení, předešlé zkušenosti ' +
        'a je schopen konstruktivní týmové spolupráce při reakci na bezpečnostní incidenty (Incident Response).'
    },
    {
      title: 'Digitální kompetence',
      description:
        'Rozvíjena prostřednictvím přímé práce s klientskými i serverovými operačními systémy (Windows 11, Windows Server, ' +
        'Linux/Ubuntu), grafickým rozhraním i příkazovou řádkou (CMD, PowerShell, Bash). Žáci efektivně využívají digitální nástroje, ' +
        'chápou jejich vnitřní fungování, důsledně dbají na kybernetickou bezpečnost, ochranu integrity a důvěrnosti dat, ' +
        'šifrování a verzování konfiguračních skriptů.'
    },
    {
      title: 'Pracovní kompetence',
      description:
        'Žák dodržuje technologickou kázeň, bezpečnostní standardy a princip nejmenších nutných oprávnění (PoLP). ' +
        'Učí se efektivně organizovat svou práci v čase, pracovat s verzovacími nástroji a projektovými nástěnkami ' +
        'a je připraven na celoživotní profesní vzdělávání v dynamicky se měnícím oboru správy systémů a sítí.'
    }
  ],
  crossCuttingThemes: [
    {
      code: 'PT - ČDS',
      name: 'Člověk a digitální svět',
      description:
        'Porozumění principům fungování digitálních technologií, kybernetická bezpečnost, ochrana identity a soukromí, ' +
        'šifrování dat, bezpečné chování v síti a etické aspekty práce s daty a softwarem.'
    },
    {
      code: 'PT - ČSP',
      name: 'Člověk a svět práce',
      description:
        'Pěstování profesních návyků systémového administrátora, týmová spolupráce a agilní řízení projektů (Kanban, Git), ' +
        'odpovědnost za svěřenou infrastrukturu a připravenost na profesní uplatnění v IT sektoru.'
    },
    {
      code: 'PT - ODS',
      name: 'Občan v demokratické společnosti',
      description:
        'Dodržování právního rámce v IT (trestní zákoník, autorský zákon, licenční politika, ochrana osobních údajů GDPR ' +
        'a evropská směrnice NIS 2).'
    }
  ],
  interdisciplinaryRelations:
    'Předmět úzce navazuje na výuku Hardwaru a číslicové techniky (fyzická architektura CPU, sběrnic a pamětí). ' +
    'Poskytuje praktickou platformu pro předmět Počítačové sítě (konfigurace adaptérů, IP adresace, směrování, síťové služby) ' +
    'a doplňuje předmět Programování (přenos algoritmického myšlení do skriptování v .bat, PowerShellu a Bashi).'
};

// -------------------------------------------------------------------------
// 1. ROČNÍK: OPERAČNÍ SYSTÉMY 1 (OSS 1 – 66 HODIN)
// Klientské stanice Windows 11, hardware, disky, procesy, sítě a správa
// -------------------------------------------------------------------------
export const SVP_OSS1_DATA: SvpGradeData = {
  gradeLabel: '1. Ročník',
  gradeCode: 'OSS 1',
  totalHours: 66,
  blocks: [
    {
      id: 'oss1-b1',
      topic: '1. Architektura počítače a základy operačních systémů',
      hours: 8,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'vysvětlí funkci a význam operačního systému a jeho vrstvený model',
        'popíše základní princip Von Neumannovy architektury a tok instrukcí mezi procesorem a pamětí RAM',
        'rozliší privilegovaný režim jádra (Ring 0) od uživatelského prostoru (Ring 3) a objasní roli systémových volání',
        'orientuje se v typech jader operačních systémů a jejich praktickém nasazení',
        'rozliší softwarové licence a zvolí vhodnou licenci s ohledem na způsob využití'
      ],
      content: [
        'Význam a funkce operačního systému, vrstvený model (Hardware ➔ Kernel ➔ User Space)',
        'Architektura hardware z pohledu OS (Von Neumannovo schéma, procesor, operační paměť RAM – data vs. instrukce)',
        'Ochranné kruhy procesoru (Protection Rings), systémová volání (Syscalls) a oddělení aplikací od jádra',
        'Typologie jader (monolitické jádro, hybridní jádro, mikrojádro)',
        'Licenční modely operačních systémů (OEM licence a vazba na hardware, krabicové Retail/FPP licence, multilicence, open-source)'
      ]
    },
    {
      id: 'oss1-b2',
      topic: '2. Souborové systémy, správa disků a start systému',
      hours: 10,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'nainstaluje klientský operační systém a provede jeho počáteční konfiguraci',
        'rozliší paměťová média a porovná jejich parametry z hlediska rychlosti a spolehlivosti',
        'rozdělí pevný disk na oddíly s využitím moderních standardů MBR a GPT',
        'vysvětlí princip alokace dat v souborovém systému FAT, vznik fragmentace a metody údržby disku',
        'rozliší rychlé a úplné formátování disku a popíše proces nevratného mazání dat',
        'popíše jednotlivé fáze startu počítače od zapnutí napájení po předání řízení jádru operačního systému'
      ],
      content: [
        'Instalace operačního systému Windows 11 (systémové požadavky, TPM 2.0, UEFI instalace, simulátor)',
        'Paměťová média (mechanické HDD vs. polovodičové SSD, NAND buňky, měření propustnosti)',
        'Dělení disku (fyzické disky, logické oddíly, tabulky MBR vs. GPT, EFI systémový oddíl)',
        'Souborový systém FAT (FAT tabulka, clustery, řetězení clusterů, vnitřní a vnější fragmentace dat)',
        'Formátování disku (rozdíl mezi rychlým smazáním metadat a přepisem sektorů nulami)',
        'Start systému a Boot proces (inicializace hardware, POST test, firmware BIOS vs. UEFI, MBR/GPT zavaděč OS, předání řízení jádru)'
      ]
    },
    {
      id: 'oss1-b3',
      topic: '3. Procesy a správa operační paměti',
      hours: 6,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'rozliší pasivní program na disku od aktivního procesu v operační paměti RAM',
        'identifikuje procesy v systému pomocí PID a analyzuje jejich hierarchii a spotřebu prostředků',
        'vysvětlí princip multitaskingu a mechanismus střídání procesů na procesoru',
        'popíše životní cyklus procesu a charakterizuje jeho základní stavy',
        'porovná proces a odlehčené vlákno z hlediska sdílení paměťového prostoru',
        'objasní princip virtuální paměti a stránkování pro ochranu integrity systému'
      ],
      content: [
        'Pojem proces (program vs. proces, načtení do RAM, deskriptor PCB, identifikátor PID a rodičovský PPID)',
        'Multitasking a střídání procesů (časová kvanta, registr čítače instrukcí PC, uložení stavu registrů a přepnutí kontextu)',
        'Stavy procesu (Nový, Běžící / Running, Připravený / Ready, Čekající / Blocked na I/O, Ukončený)',
        'Vlákna (proces vs. vlákno, sdílení adresního prostoru, vícevláknové aplikace na vícejádrových CPU)',
        'Virtuální paměť a stránkování (paměťová jednotka MMU, virtuální stránky a fyzické rámce, odkládací soubor pagefile.sys, výpadek stránky Page Fault)'
      ]
    },
    {
      id: 'oss1-b4',
      topic: '4. Grafické uživatelské rozhraní Windows 11 (GUI)',
      hours: 4,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'popíše kompozici grafického rozhraní a restartuje klíčové procesy grafického prostředí',
        'orientuje se v adresářovém stromu systémového disku a struktuře uživatelských profilů',
        'nastavuje základní atributy souborů a asociace aplikací',
        'konfiguruje systém prostřednictvím moderního rozhraní Nastavení i klasických appletů Ovládacích panelů',
        'aplikuje zásady ergonomie a produktivity práce při správě oken a ploch'
      ],
      content: [
        'Architektura GUI (správce oken DWM, proces explorer.exe a řešení jeho zamrznutí)',
        'Hierarchie disku C: (systémové složky Windows, System32, Program Files, struktura profilů v Users)',
        'Práce se soubory a atributy (atributy Jen pro čtení, Skrytý, Systémový, Archivní, zástupci .lnk, registr přípon souborů)',
        'Konfigurace systému (aplikace Nastavení vs. klasické Ovládací panely a spouštění apletů .cpl)',
        'Ergonomie ovládání OS (klávesové zkratky, rozvržení Snap Layouts, virtuální plochy)'
      ]
    },
    {
      id: 'oss1-b5',
      topic: '5. Příkazový řádek (CLI) a dávkové soubory',
      hours: 6,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'ovládá operační systém v textovém rozhraní Příkazového řádku (CMD)',
        'naviguje v adresářové struktuře disku pomocí absolutních i relativních cest',
        'provádí správu souborů a složek pomocí standardních textových příkazů',
        'využívá přesměrování vstupů a výstupů, roury a textové filtry',
        'vytváří jednoduché dávkové skripty (.bat) pro rutinní správu a údržbu stanice'
      ],
      content: [
        'Orientace a navigace v CLI (práva běžného uživatele vs. Správce, přepínání diskových jednotek, příkazy dir, cd, relativní a absolutní cesty)',
        'Správa souborů a složek (příkazy mkdir, rmdir, copy, move, del, využití zástupných znaků * a ?)',
        'Roury a proudové filtry (operátory přesměrování >, >>, roura |, filtr findstr, diagnostický příkaz systeminfo)',
        'Dávkové soubory (.bat) pro automatizaci rutinních úkonů (@echo off, komentáře REM, pozastavení pause, jednoduché proměnné set /p, argumenty %1)'
      ]
    },
    {
      id: 'oss1-b6',
      topic: '6. Správa uživatelů a přístupových oprávnění (NTFS)',
      hours: 8,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'rozliší autentizaci od autorizace a porovná místní účet s online účtem',
        'spravuje uživatelské účty a skupiny podle principu nejmenších nutných oprávnění (PoLP)',
        'aplikuje zásady bezpečnosti hesel, uzamčení stanice a mechanismu Řízení uživatelských účtů (UAC)',
        'nastavuje přístupová oprávnění k souborům a složkám v souborovém systému NTFS',
        'vysvětlí princip dědičnosti oprávnění a prioritu explicitního zákazu (Deny)'
      ],
      content: [
        'Uživatelské účty a autentizace (lokální účet vs. účet Microsoft, Standardní uživatel vs. Správce, systémová konzole lusrmgr.msc, příkaz net user)',
        'Zabezpečení účtů (politika hesel, přihlašovací PIN vázaný na TPM čip, okamžitý zámek Win+L, mechanismus UAC)',
        'Uživatelské skupiny (princip hromadné správy, vestavěné skupiny Administrators a Users, příkaz net localgroup)',
        'Souborová oprávnění NTFS (karta Zabezpečení, základní práva pro čtení a zápis, dědičnost oprávnění, pravidlo explicitního zákazu Deny, nástroj icacls)'
      ]
    },
    {
      id: 'oss1-b7',
      topic: '7. Správa aplikačního software a balíčkovače',
      hours: 4,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'popíše fáze životního cyklu aplikačního software v operačním systému',
        'rozliší standardní formáty instalátorů EXE a MSI balíčků',
        'provede bezobslužnou (tichou) instalaci software',
        'vyhledává, instaluje a hromadně aktualizuje aplikace pomocí moderního správce balíčků'
      ],
      content: [
        'Životní cyklus software (instalace, registrace v systému, spouštění, aktualizace a čistá odinstalace)',
        'Instalátory a balíčky (klasické EXE instalátory vs. balíčky Windows Installer MSI, parametry tiché instalace /qn a /silent)',
        'Správa software přes balíčkovač Winget (vyhledávání aplikací, instalace, hromadný upgrade softwaru na stanici, export a import seznamu balíčků)'
      ]
    },
    {
      id: 'oss1-b8',
      topic: '8. Správa hardware, ovladače a plánování úloh',
      hours: 4,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'diagnostikuje stavy připojených hardwarových komponent v konzoli Správce zařízení',
        'vysvětlí úlohu ovladačů zařízení běžících v jádře operačního systému',
        'instaluje a aktualizuje ovladače a ověřuje jejich digitální podpis',
        'nakonfiguruje automatické spouštění údržbových úloh v Plánovači úloh'
      ],
      content: [
        'Správa zařízení a ovladače (komunikace OS s hardwarem, role ovladačů v Ring 0, konzole devmgmt.msc, stavy zařízení, instalace přes .inf soubory a Windows Update, digitální podpis ovladačů WHQL)',
        'Plánovač úloh (automatizace systémové údržby, konzole taskschd.msc, časové a událostní spouštěče, konfigurace akcí, běh pod systémovým účtem SYSTEM)'
      ]
    },
    {
      id: 'oss1-b9',
      topic: '9. Síťová konfigurace v operačním systému a lokální sítě (LAN)',
      hours: 8,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'rozliší fyzickou MAC adresu od logické IP adresy a nakonfiguruje parametry síťového adaptéru',
        'ověří a diagnostikuje síťové spojení pomocí vrstveného žebříčku diagnostických příkazů',
        'nastaví síťové profily a provede sdílení prostředků v lokální síti',
        'nakonfiguruje a zabezpečí bezdrátovou síť Wi-Fi v prostředí klientského operačního systému',
        'provede základní nastavení parametrů a zabezpečení přístupového bodu / Wi-Fi směrovače'
      ],
      content: [
        'Síťové adaptéry a adresace (fyzické adaptéry Ethernet a Wi-Fi, MAC adresa vs. IPv4 adresa, maska podsítě, dynamické DHCP vs. statická IP, příkaz ipconfig)',
        'Diagnostika síťového spojení (žebříček testu ping – loopback 127.0.0.1, vlastní karta, brána, DNS; sledování trasy paketu tracert)',
        'Síťové profily a sdílení (profil Veřejná vs. Privátní síť, sdílení složek, bezdrátové Wi-Fi sítě, SSID, šifrování WPA2 a WPA3, příkazy netsh wlan)',
        'Praktická konfigurace směrovače (tovární reset, webová administrace SOHO routeru, zabezpečení Wi-Fi, izolovaná síť pro hosty Guest Network)'
      ]
    },
    {
      id: 'oss1-b10',
      topic: '10. Závěrečný integrující projekt klientské stanice',
      hours: 8,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'samostatně zprovozní a nakonfiguruje klientskou stanici od rozdělení disku po zapojení do sítě',
        'vytvoří bezpečné víceuživatelské prostředí s diferencovanými přístupovými právy',
        'automatizuje rutinní údržbu stanice pomocí dávkového skriptu a plánovače úloh',
        'diagnostikuje a odstraní simulované závady na cizí stanici',
        'prezentuje a obhájí zvolené technické řešení před třídou'
      ],
      content: [
        'Komplexní instalace stanice (rozdělení disků, instalace operačního systému, doinstalování ovladačů a základního softwaru balíčkovačem)',
        'Bezpečnostní a uživatelská konfigurace (lokální účty, NTFS práva ke složkám, síťové nastavení a profil sítě)',
        'Automatizace a údržba (vytvoření údržbového .bat skriptu a jeho zařazení do Plánovače úloh)',
        'Křížové testování a diagnostika chyb (simulace závady na disku, síti nebo právech a její systematické odstranění)',
        'Technická dokumentace a ústní obhajoba projektu'
      ]
    }
  ]
};

// -------------------------------------------------------------------------
// 2. ROČNÍK: OPERAČNÍ SYSTÉMY 2 (OSS 2 – 66 HODIN)
// Správa podnikových dat, zálohování, bezpečnost, PowerShell, servery a Active Directory
// -------------------------------------------------------------------------
export const SVP_OSS2_DATA: SvpGradeData = {
  gradeLabel: '2. Ročník',
  gradeCode: 'OSS 2',
  totalHours: 66,
  blocks: [
    {
      id: 'oss2-b1',
      topic: '1. Diagnostická prověrka a opakování administrace',
      hours: 2,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'samostatně analyzuje zadaný systémový stav a vyřeší administrátorské úlohy klientského operačního systému'
      ],
      content: [
        'Praktické ověření znalostí z 1. ročníku (diagnostika sítě, správa uživatelských práv NTFS, práce v CLI)'
      ]
    },
    {
      id: 'oss2-b2',
      topic: '2. Správa podnikových dat a zálohování',
      hours: 10,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'navrhne strategii zálohování podle oborového pravidla 3-2-1',
        'porovná plnou, inkrementální a diferenciální zálohu z hlediska rychlosti a nároků na úložiště',
        'vysvětlí funkci archivního bitu a stínových kopií svazku (VSS)',
        'provádí skriptované zálohování pomocí systémových nástrojů příkazového řádku',
        'rozliší cloudovou synchronizaci od nezávislé zálohy dat',
        'nakonfiguruje automatizované šifrované zálohování na síťové úložiště ve specializovaném software'
      ],
      content: [
        'Zásady a strategie zálohování (pravidlo 3-2-1, typy záloh – plná, přírůstková/inkrementální, rozdílová/diferenciální, archivní bit souborů)',
        'Zálohování pomocí CLI (příkazy xcopy a robocopy pro synchronizaci zrcadel složek)',
        'Cloudová úložiště a synchronizace (rozdíl mezi cloudovým diskem a neměnnou zálohou, riziko synchronizace zašifrovaných dat ransomwarem)',
        'Automatizované zálohování (instalace a běh aplikace Cobian Reflector jako služby Windows pod systémovým účtem, šifrování záloh AES, plánovač úloh)'
      ]
    },
    {
      id: 'oss2-b3',
      topic: '3. Bezpečnost operačního systému a forenzní analýza',
      hours: 18,
      crossThemes: ['PT - ČDS', 'PT - ODS'],
      outcomes: [
        'charakterizuje typy škodlivého kódu a objasní způsob vykonávání instrukcí procesorem',
        'provádí audit běžících procesů pomocí pokročilých forenzních nástrojů',
        'ověřuje digitální podpisy spustitelných souborů a kontrolní součty SHA-256',
        'konfiguruje a testuje vestavěnou antivirovou ochranu a izolované prostředí sandboxu',
        'nastavuje pravidla paketového firewallu pro příchozí i odchozí komunikaci a monitoruje otevřené porty',
        'aplikuje diskové šifrování s vazbou na hardwarový čip TPM',
        'rozpozná techniky sociálního inženýrství, phishingu a navrhne opatření pro ochranu hesel',
        'vyřeší simulovaný bezpečnostní incident a provede forenzní vyčištění kompromitované stanice'
      ],
      content: [
        'Typologie malwaru (viry, červi, trojské koně, ransomware, spyware; zneužití tokenů oprávnění, hashovací funkce a online skenery)',
        'Forenzní analýza procesů (nástroj Sysinternals Process Explorer, strom procesů, digitální certifikáty Authenticode, autorun klíče v registru)',
        'Izolace a antivirus (Windows Sandbox, antivirový systém Windows Defender, signatury, heuristika, standardní testovací vzorek EICAR)',
        'Paketový firewall operačního systému (konzole wf.msc, příchozí a odchozí pravidla, filtrace portů a aplikací, sledování spojení netstat)',
        'Šifrování dat a BitLocker (šifrování systémového i výměnného disku, bezpečnostní čip TPM 2.0, záchranný obnovovací klíč)',
        'Správa účtů a bezpečnost autentizace (mechanismus UAC a Secure Desktop, vícefaktorové ověřování MFA, správci hesel, phishing a rozbor podvodných zpráv)',
        'Reakce na bezpečnostní incidenty (detekce neoprávněné aktivity, izolace stanice, odstranění hrozby, závěrečný protokol Incident Response)'
      ]
    },
    {
      id: 'oss2-b4',
      topic: '4. Pokročilá správa Windows a skriptování v PowerShellu',
      hours: 10,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'vytváří přizpůsobené konzoly pro správu systému a řídí běh systémových služeb',
        'ovládá syntaxi a objektové roury prostředí PowerShell',
        'filtruje a třídí systémové objekty v rourách',
        'vytváří jednoduché administrační skripty (.ps1) s ohledem na zásady spouštění ExecutionPolicy',
        'orientuje se ve struktuře systémového registru Windows a provádí zálohu a import klíčů',
        'vyhledává a analyzuje systémové a bezpečnostní záznamy v Prohlížeči událostí'
      ],
      content: [
        'Konzola pro správu (MMC) a systémové služby (konfigurace snap-inů, typy spouštění služeb, běhové účty, automatický restart po selhání)',
        'Objektový shell PowerShell (syntaxe cmdletů Sloveso-PodstatnéJméno, nápověda Get-Help, předávání objektů rourou, filtrování Where-Object a výběr vlastností Select-Object)',
        'Automatizace v PowerShellu (tvorba skriptů .ps1, politika spouštění ExecutionPolicy, generování zpráv o stavu stanice)',
        'Systémový registr Windows (struktura hives HKLM a HKCU, klíče, hodnoty, zálohování a hromadné úpravy přes soubory .reg)',
        'Prohlížeč událostí a audit (Event Viewer, protokoly Application, System a Security, klíčové ID událostí úspěšného a neúspěšného přihlášení, filtry)'
      ]
    },
    {
      id: 'oss2-b5',
      topic: '5. Síťové serverové služby a podniková infrastruktura',
      hours: 12,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'nainstaluje a nakonfiguruje službu pro automatické přidělování síťových adres (DHCP)',
        'vytváří a spravuje zóny a záznamy pro překlad doménových jmen (DNS)',
        'nakonfiguruje souborový server SMB a nastaví sdílené složky s kombinovanými právy',
        'realizuje zabezpečenou vzdálenou správu serveru přes grafické i textové rozhraní',
        'zprovozní webový server a zabezpečí webovou službu šifrováním HTTPS',
        'nainstaluje instanci databázového serveru a provede zálohování databáze'
      ],
      content: [
        'Služba DHCP (fáze procesu DORA, konfigurace rozsahu Scope, zápůjční doba Lease time, statické rezervace adres pro tiskárny a servery)',
        'Služba DNS (hierarchie doménových jmen, dopředné zóny, záznamy typu A, CNAME, PTR, diagnostika nslookup)',
        'Souborový server SMB (vytvoření sdílení, UNC cesty, rozdíl mezi oprávněním sdílení a oprávněním NTFS, mapování disku příkazem net use)',
        'Vzdálená správa (Vzdálená plocha RDP s ověřením na úrovni sítě NLA, bezpečný terminál OpenSSH pro správu Windows Serveru)',
        'Webový server IIS (instalace role, kořenový adresář webu, vazby portů 80 a 443, nasazení certifikátu pro šifrovaný protokol HTTPS)',
        'Databázový server SQL Server Express (instalace instance, firewallové pravidlo portu 1433, ověřování uživatelů, záloha databáze do souboru .bak)'
      ]
    },
    {
      id: 'oss2-b6',
      topic: '6. Active Directory, doménová správa a závěrečný projekt',
      hours: 14,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'vysvětlí princip centralizované správy sítě a rozdíl mezi pracovní skupinou a doménou',
        'nainstaluje doménovou službu Active Directory a povýší server na řadič domény (DC)',
        'navrhne organizační strukturu společnosti a vytvoří organizační jednotky, uživatelské účty a skupiny',
        'připojí klientskou stanici Windows 11 do podnikové domény',
        'nakonfiguruje centrální bezpečnostní a uživatelská pravidla prostřednictvím Skupinových politik (GPO)',
        'samostatně realizuje a obhájí komplexní projekt podnikové síťové infrastruktury'
      ],
      content: [
        'Úvod do domény Active Directory (pracovní skupina vs. doména, řadič domény DC, databáze objektů)',
        'Instalace a konfigurace AD DS (instalace role, vytvoření nového doménového lesa, provázání s DNS serverem)',
        'Organizační jednotky a doménové účty (struktura firmy v OU, hromadná správa, doménové zásady hesel)',
        'Doménové skupiny a řízení přístupu (bezpečnostní skupiny, model přiřazení práv ke sdíleným složkám přes skupiny)',
        'Připojení klienta do domény (nastavení síťového DNS klienta, připojení Windows 11, přihlášení doménovým profilem)',
        'Skupinové politiky GPO (centrální správa nastavení stanic, zákaz používání výměnných USB disků, automatické mapování síťových jednotek)',
        'Závěrečný integrující projekt (kompletní zprovoznění malé podnikové sítě: Server DC + DHCP/DNS + Klientská stanice + GPO, prezentace a obhajoba)'
      ]
    }
  ]
};

// -------------------------------------------------------------------------
// 3. ROČNÍK: OPERAČNÍ SYSTÉMY 3 (OSS 3 – 66 HODIN)
// Linux, serverové služby, Bash, verzování v Gitu, kyberbezpečnost a týmový projekt
// -------------------------------------------------------------------------
export const SVP_OSS3_DATA: SvpGradeData = {
  gradeLabel: '3. Ročník',
  gradeCode: 'OSS 3',
  totalHours: 66,
  blocks: [
    {
      id: 'oss3-b1',
      topic: '1. Linux: Architektura, instalace a základní správa systému',
      hours: 16,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'vybere vhodnou distribuci Linuxu a provede instalaci serverového operačního systému bez grafického rozhraní',
        'orientuje se ve standardní hierarchii souborového systému Linuxu (FHS)',
        'provádí základní i pokročilé operace se soubory a složkami v textovém rozhraní (CLI)',
        'spravuje uživatelské účty a nastavuje přístupová práva POSIX (UGO) v osmičkové i symbolické notaci',
        'pracuje s textovými proudy, rourami, regulárními filtry a editory',
        'spravuje diskové oddíly a připojování svazků do souborového stromu',
        'monitoruje a řídí běžící procesy a systémové démony přes systemd',
        'instaluje a aktualizuje software pomocí balíčkovacího systému APT'
      ],
      content: [
        'Architektura Linuxu a instalace (distribuce Debian/Ubuntu, rozdělení disku na oddíly ext4 a swap, zavaděč GRUB, instalace headless serveru)',
        'Souborový systém FHS a terminál (hierarchie složek /etc, /var, /home, /dev; navigační a manipulační příkazy pwd, cd, ls, cp, mv, rm)',
        'Uživatelé a POSIX oprávnění (model vlastník-skupina-ostatní, osmičková notace chmod 755/644, změna vlastníka chown, práva správce sudo a /etc/sudoers)',
        'Textové proudy a editory (přesměrování výstupu, roury |, proudový filtr grep, práce v textových editorech nano a vim)',
        'Správa disků (oddíly fdisk, formátování mkfs.ext4, připojování mount a trvalý zápis v konfiguračním souboru /etc/fstab)',
        'Správa procesů (výpis ps, interaktivní monitory top a htop, ukončování procesů kill)',
        'Balíčkovací systém APT (repozitáře, aktualizace indexů apt update, instalace balíčků a řešení závislostí)',
        'Systémové služby systemd a logování (řízení démonů systemctl, analýza žurnálu událostí journalctl)'
      ]
    },
    {
      id: 'oss3-b2',
      topic: '2. Linux: Sítě, serverové služby a Bash skriptování',
      hours: 16,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'nakonfiguruje síťové rozhraní Linuxu a zabezpečí server pomocí paketového firewallu',
        'zprovozní zabezpečenou vzdálenou správu přes SSH pomocí asymetrických klíčů a zamezí neoprávněnému přístupu',
        'nainstaluje a nakonfiguruje webový server Apache a zabezpečí přenos dat certifikátem HTTPS',
        'zajistí heterogenní sdílení souborů mezi Linuxem a stanicemi Windows pomocí služby Samba',
        'píše skripty v Bashi pro automatizaci administrátorských úkonů a zálohování',
        'nastaví automatické periodické spouštění úloh pomocí plánovače cron'
      ],
      content: [
        'Síťová konfigurace a firewall (konfigurace rozhraní ip a, diagnostika, paketový firewall UFW a povolování portů)',
        'Zabezpečená vzdálená správa SSH (konfigurace démona, autentizace párem asymetrických klíčů Ed25519, zákaz přihlášení heslem)',
        'Webový server Apache (instalace webserveru, struktura webového kořene /var/www/html, virtuální hostitelé VirtualHost, nasazení SSL certifikátu)',
        'Heterogenní sdílení souborů Samba (konfigurace smb.conf, sdílené adresáře, mapování z Windows přes UNC cesty)',
        'Programování v Bashi (shebang #!/bin/bash, proměnné, argumenty skriptu $1, podmíněné větvení if, cykly for)',
        'Automatizace údržby a zálohování (komprese a archivace nástrojem tar, automatické plánování úloh v cronu a syntaxe crontab)'
      ]
    },
    {
      id: 'oss3-b3',
      topic: '3. Verzovací systém Git a spolupráce na GitHubu',
      hours: 8,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'vysvětlí význam verzování a popíše architekturu třístupňového pracovního prostoru Gitu',
        'samostatně ovládá základní pracovní cyklus verzování konfiguračních skriptů a dokumentace',
        'vytváří větve, slučuje změny a manuálně řeší kolize při sloučení',
        'spolupracuje na projektu prostřednictvím vzdáleného repozitáře na GitHubu s využitím Pull Requestů'
      ],
      content: [
        'Architektura verzovacího systému Git (tři zóny – Working Directory, Staging Area, Repository, tvorba revizí commit)',
        'Základní pracovní cyklus (příkazy git status, add, commit, log, porovnání změn diff, ignorování souborů .gitignore)',
        'Práce s větvemi (tvorba větví git branch, přepínání checkout/switch, sloučení merge, detekce a ruční řešení konfliktů)',
        'Vzdálené repozitáře a týmová spolupráce (klonování repozitáře clone, odesílání změn push, stahování pull, týmový proces Pull Request a revize kódu)'
      ]
    },
    {
      id: 'oss3-b4',
      topic: '4. Kybernetická bezpečnost, audit zranitelností a obrana',
      hours: 12,
      crossThemes: ['PT - ČDS', 'PT - ODS'],
      outcomes: [
        'orientuje se v právním rámci kybernetické bezpečnosti v ČR a zásadách směrnice NIS 2',
        'provede bezpečnostní průzkum sítě a identifikuje otevřené síťové porty a verze služeb',
        'vyhledá zjištěné zranitelnosti ve veřejných databázích a vyhodnotí jejich závažnost',
        'analyzuje nešifrovaný a šifrovaný síťový provoz pomocí analyzátoru paketů',
        'vysvětlí princip ukládání přístupových hesel a otestuje jejich odolnost vůči slovníkovým útokům',
        'provede bezpečnostní nápravu a odstraní zranitelnost na kompromitovaném systému'
      ],
      content: [
        'Právní rámec a metodika (trestní zákoník § 230–232 neoprávněný přístup k počítačovému systému, směrnice NIS 2, fáze kybernetického útoku Cyber Kill Chain)',
        'Síťový audit a skenování (skenování portů nástrojem Nmap, databáze zranitelností CVE a mezinárodní skórovací systém zranitelností CVSS)',
        'Analýza síťového provozu (odposlech síťových paketů ve Wiresharku, analýza TCP handshake, srovnání nešifrovaného HTTP provozu s šifrovaným HTTPS a SSH)',
        'Ochrana hesel a autentizace (ukládání hesel ve formě kryptografických hashů, slovníkové útoky a lámání hesel, zásady volby silných hesel)',
        'Reakce na incident a náprava (analýza kompromitovaného systému, zablokování útočníka firewallem, oprava chybné konfigurace)'
      ]
    },
    {
      id: 'oss3-b5',
      topic: '5. Týmový infrastrukturní projekt a agilní řízení (Kanban)',
      hours: 10,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'organizuje práci týmu s využitím agilní metodiky Kanban a nástěnky úkolů',
        'navrhne a zprovozní komplexní smíšenou infrastrukturu propojující Linux a Windows',
        'zabezpečí síťové služby, otestuje jejich odolnost a provede zálohování',
        'obhájí technické řešení infrastruktury a zpracuje přehlednou technickou dokumentaci'
      ],
      content: [
        'Agilní organizace práce (metodika Kanban, nástěnka úkolů, backlog, rozdělení rolí v týmu)',
        'Realizace podnikové infrastruktury (propojení linuxových a windows serverů, sdílení dat přes Sambu, webový intranet, správa uživatelů a verzování v Gitu)',
        'Testování a zabezpečení (křížový audit mezi týmy, test odolnosti sítě a funkčnosti záloh)',
        'Technická dokumentace a ústní obhajoba projektu před odbornou komisí'
      ]
    },
    {
      id: 'oss3-b6',
      topic: '6. Závěrečná reflexe tříletého kurikula a rezerva',
      hours: 4,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'syntetizuje poznatky tříleté výuky operačních systémů a porovná administraci platforem Windows a Linux',
        'samostatně vyřeší typové komplexní maturitní úlohy ze správy operačních systémů a sítí'
      ],
      content: [
        'Srovnání administrátorských přístupů (komparace Windows Server vs. Linux, konfigurace přes GUI vs. konfigurační soubory a skripty)',
        'Časová rezerva (prostor pro řešení individuálních dotazů, školní akce, uzavření klasifikace)'
      ]
    }
  ]
};
