export interface ThematicSubtopic {
  id: string;
  title: string;
  hours: number;
  type: 'teorie' | 'laborator' | 'projekt' | 'test' | 'kombinovane';
  description: string;
  practice: string;
  route?: string;
}

export interface ThematicBlock {
  id: string;
  order: number;
  month: string;
  monthKey: 'zari' | 'rijen' | 'listopad' | 'prosinec' | 'leden' | 'unor' | 'brezen' | 'duben' | 'kveten' | 'cerven';
  weeks: string;
  title: string;
  hours: number;
  theoryHours: number;
  practiceHours: number;
  description: string;
  rvpCompetence: string;
  subtopics: ThematicSubtopic[];
}

export interface ThematicPlan {
  subjectId: 'ops1' | 'ops2' | 'ops3';
  subjectTitle: string;
  gradeLabel: string;
  grade: number;
  totalHours: number;
  weeksCount: number;
  weeklyHours: number;
  academicYear: string;
  fieldCode: string;
  fieldTitle: string;
  blocks: ThematicBlock[];
}

export const THEMATIC_PLANS: Record<string, ThematicPlan> = {
  ops1: {
    subjectId: 'ops1',
    subjectTitle: 'Operační systémy 1',
    gradeLabel: '1. Ročník SŠ',
    grade: 1,
    totalHours: 66,
    weeksCount: 33,
    weeklyHours: 2,
    academicYear: '2026/2027',
    fieldCode: '18-20-M/01',
    fieldTitle: 'Informační technologie',
    blocks: [
      {
        id: 'oss1-b1',
        order: 1,
        month: 'Září',
        monthKey: 'zari',
        weeks: '1.–4. týden',
        title: 'Architektura počítače a hardware pro operační systémy',
        hours: 8,
        theoryHours: 4,
        practiceHours: 4,
        description: 'Vnitřní fungování počítače z pohledu OS: sběrnice, procesorový instrukční cyklus, adresace RAM a firmware UEFI.',
        rvpCompetence: 'Popíše princip Von Neumannovy architektury, chápe instrukční cyklus CPU a hierarchii pamětí v počítači.',
        subtopics: [
          {
            id: 'oss1-b1-1',
            title: 'Von Neumannova architektura a systémové sběrnice',
            hours: 2,
            type: 'teorie',
            description: 'Struktura počítače podle Johna von Neumanna: ALU, řadič, společná paměť pro program i data, datová a adresní sběrnice.',
            practice: 'Interaktivní schéma přenosu dat po sběrnici v IntLabu a demonstrace v simulátoru.',
            route: '/specializovana/operacni-systemy-1/hardware/von-neumann'
          },
          {
            id: 'oss1-b1-2',
            title: 'Procesor (CPU), registry a instrukční cyklus',
            hours: 2,
            type: 'teorie',
            description: 'Vnitřní stavba CPU, registry (čítač instrukcí PC, akumulátor), cyklus Fetch-Decode-Execute a taktovací frekvence.',
            practice: 'Krokování jednoduchého programu v simulátoru procesoru a sledování změn v registrech.',
            route: '/specializovana/operacni-systemy-1/architektura'
          },
          {
            id: 'oss1-b1-3',
            title: 'Operační paměť RAM a paměťová hierarchie',
            hours: 2,
            type: 'kombinovane',
            description: 'Architektura paměťových buněk DRAM/SRAM, adresace paměťového prostoru, cache L1–L3 a rychlostní propast.',
            practice: 'Praktické zkoumání časování RAM v CPU-Z a výpočet propustnosti dvoukanálového řadiče (Dual-Channel).',
            route: '/specializovana/operacni-systemy-1/hardware/ram'
          },
          {
            id: 'oss1-b1-4',
            title: 'Firmware: UEFI, POST test a Secure Boot',
            hours: 2,
            type: 'laborator',
            description: 'Moderní firmware UEFI, inicializační test POST, konfigurace bootovací priority a Secure Boot.',
            practice: 'Praktická konfigurace nastavení UEFI na školních PC a řešení diagnostických beep kódů.',
            route: '/specializovana/operacni-systemy-1/boot'
          }
        ]
      },
      {
        id: 'oss1-b2',
        order: 2,
        month: 'Říjen',
        monthKey: 'rijen',
        weeks: '5.–8. týden',
        title: 'Evoluce operačních systémů, boot a instalace Windows',
        hours: 8,
        theoryHours: 3,
        practiceHours: 5,
        description: 'Od sálových počítačů a UNIXu k moderním Windows 11. Příprava instalačních médií a čistá instalace stanice.',
        rvpCompetence: 'Zvolí vhodné instalační médium, provede instalaci klientského OS v UEFI režimu a otestuje funkčnost.',
        subtopics: [
          {
            id: 'oss1-b2-1',
            title: 'Historie a evoluce OS (Unix, DOS, NT, Linux)',
            hours: 2,
            type: 'teorie',
            description: 'Vývojové větve moderních operačních systémů, architektura jádra (monolit vs. hybrid), uživatelský vs. jaderný prostor.',
            practice: 'Časová osa vývoje OS v IntLabu a porovnání licenčních modelů (OEM, FPP, Open Source).',
            route: '/specializovana/operacni-systemy-1/vyvoj'
          },
          {
            id: 'oss1-b2-2',
            title: 'Průběh startu systému (Boot proces podrobně)',
            hours: 2,
            type: 'teorie',
            description: 'Fáze startu: Firmware POST ➔ UEFI Boot Manager ➔ Zavaděč Windows Boot Manager ➔ winload.efi ➔ Kernel ntoskrnl.exe.',
            practice: 'Analýza konfigurace bootovacího záznamu pomocí utility bcdedit v příkazovém řádku.',
            route: '/specializovana/operacni-systemy-1/boot'
          },
          {
            id: 'oss1-b2-3',
            title: 'Příprava instalačních médií (Rufus, Ventoy, ISO)',
            hours: 2,
            type: 'laborator',
            description: 'Stahování oficiálních ISO obrazů, tvorba bootovací flashky v nástroji Rufus (volba GPT/UEFI) a multi-boot Ventoy.',
            practice: 'Vytvoření vlastního záchranného USB disku s instalací Windows 11 a live distribucí diagnostických nástrojů.',
            route: '/specializovana/operacni-systemy-1/instalace'
          },
          {
            id: 'oss1-b2-4',
            title: 'Čistá instalace Windows 11 a úvodní nastavení (OOBE)',
            hours: 2,
            type: 'laborator',
            description: 'Průchod instalačním průvodcem, rozdělení disku, OOBE konfigurace a instalace bez online účtu.',
            practice: 'Instalace Windows 11 v interaktivním simulátoru IntLab a následná instalace ve VirtualBoxu.',
            route: '/specializovana/operacni-systemy-1/instalace'
          }
        ]
      },
      {
        id: 'oss1-b3',
        order: 3,
        month: 'Listopad',
        monthKey: 'listopad',
        weeks: '9.–12. týden',
        title: 'Souborové systémy, disková média a diskové oddíly',
        hours: 8,
        theoryHours: 3,
        practiceHours: 5,
        description: 'Magnetická HDD vs. polovodičová SSD, oddíly disku (standard GPT), alokace klastrů ve FAT a NTFS a správa svazků.',
        rvpCompetence: 'Rozděluje disky na oddíly GPT, formátuje svazky do NTFS/FAT32, provádí defragmentaci a kontrolu disku.',
        subtopics: [
          {
            id: 'oss1-b3-1',
            title: 'Paměťová média: HDD (plotny, sektory) vs. SSD (NAND, TRIM)',
            hours: 2,
            type: 'teorie',
            description: 'Geometrie plotnového disku, přístupová doba, NAND flash buňky (SLC/MLC/TLC), řadič SSD a příkaz TRIM proti zpomalování.',
            practice: 'Měření rychlostí v CrystalDiskMark a zjištění zdraví disku přes S.M.A.R.T. data v CrystalDiskInfo.',
            route: '/specializovana/operacni-systemy-1/souborove-systemy/media'
          },
          {
            id: 'oss1-b3-2',
            title: 'Diskové oddíly GPT a souborový systém FAT',
            hours: 2,
            type: 'teorie',
            description: 'Moderní tabulka oddílů GPT s redundancí. Princip alokace ve FAT: boot sektor, FAT tabulka, řetězení klastrů.',
            practice: 'Interaktivní trenažér řetězení klastrů ve FAT tabulce a řešení ztracených alokačních jednotek.',
            route: '/specializovana/operacni-systemy-1/souborove-systemy/struktura'
          },
          {
            id: 'oss1-b3-3',
            title: 'Souborový systém NTFS, klastry a fragmentace',
            hours: 2,
            type: 'kombinovane',
            description: 'Moderní funkce NTFS: tabulka MFT, žurnálování, vnitřní a vnější fragmentace, defragmentace HDD vs. optimalizace SSD.',
            practice: 'Simulátor fragmentace disku v IntLabu a reálná optimalizace disků nástrojem dfrgui ve Windows.',
            route: '/specializovana/operacni-systemy-1/souborove-systemy/alokace'
          },
          {
            id: 'oss1-b3-4',
            title: 'Správa disků v OS, oddíly a základy diskových polí RAID',
            hours: 2,
            type: 'laborator',
            description: 'Konzole Správa disků (diskmgmt.msc), práce v utilitě diskpart, principy diskových polí RAID 0, 1 a 5 (výkon vs. zrcadlení).',
            practice: 'Laboratorní rozdělení virtuálního disku, zmenšení svazku, přiřazení písmene a vytvoření softwarového zrcadla RAID 1.',
            route: '/specializovana/operacni-systemy-1/souborove-systemy/pokrocile'
          }
        ]
      },
      {
        id: 'oss1-b4',
        order: 4,
        month: 'Prosinec',
        monthKey: 'prosinec',
        weeks: '13.–16. týden',
        title: 'Procesy, multitasking, vlákna a správa paměti',
        hours: 8,
        theoryHours: 4,
        practiceHours: 4,
        description: 'Vznik procesu z programu, střídání procesů na CPU, 5 stavů životního cyklu, vlákna a virtuální paměť pagefile.sys.',
        rvpCompetence: 'Analyzuje běžící procesy ve Správci úloh a CLI, vysvětlí multitasking a princip virtuální paměti RAM.',
        subtopics: [
          {
            id: 'oss1-b4-1',
            title: 'Úvod a vznik procesu: Program na disku vs. Proces v RAM',
            hours: 2,
            type: 'kombinovane',
            description: 'Metafora receptu a kuchaře, přidělení PID a rodiče PPID, struktura PCB a paměťová izolace procesů.',
            practice: 'Badatelský list s Task Managerem a CLI utilitou tasklist (filtrace podle paměti).',
            route: '/specializovana/operacni-systemy-1/procesy/uvod'
          },
          {
            id: 'oss1-b4-2',
            title: 'Střídání procesů (Multitasking) a registr PC',
            hours: 2,
            type: 'teorie',
            description: 'Metoda dělení času (time-sharing), časová kvanta (10–30 ms), iluze současného běhu a přepnutí kontextu přes registr PC.',
            practice: 'Interaktivní simulátor přepnutí kontextu na CPU mezi Wordem a Kalkulačkou v IntLabu.',
            route: '/specializovana/operacni-systemy-1/procesy/stridani'
          },
          {
            id: 'oss1-b4-3',
            title: 'Životní cyklus a 5 stavů procesu (Blocked na disku)',
            hours: 2,
            type: 'teorie',
            description: 'Rychlostní propast mezi CPU (nanosekundy) a diskem (milisekundy). Stavy: New, Ready, Running, Blocked a Terminated.',
            practice: 'Trenažér stavového automatu v IntLabu – žák v roli OS obsluhuje přerušení a frontu Ready.',
            route: '/specializovana/operacni-systemy-1/procesy/stavy'
          },
          {
            id: 'oss1-b4-4',
            title: 'Vlákna (Threads) a Virtuální paměť se stránkováním',
            hours: 2,
            type: 'kombinovane',
            description: 'Proces vs. vlákno (sdílená paměť), princip virtuální paměti a odkládání dat na disk (swap).',
            practice: 'Simulátor jednovláknového záseku hry vs. vícevláknové plynulosti a simulátor stránkování RAM v IntLabu.',
            route: '/specializovana/operacni-systemy-1/procesy/vlakna'
          }
        ]
      },
      {
        id: 'oss1-b5',
        order: 5,
        month: 'Leden',
        monthKey: 'leden',
        weeks: '17.–19. týden',
        title: 'Hodnocení 1. pololetí a Grafické rozhraní Windows 11 (GUI)',
        hours: 6,
        theoryHours: 2,
        practiceHours: 4,
        description: 'Ověření znalostí za 1. pololetí a architektura grafického rozhraní: DWM, explorer.exe, systémové složky a atributy souborů.',
        rvpCompetence: 'Prokáže znalosti hardwaru a OS v hodnoceném testu, spravuje systémové složky Windows a atributy souborů.',
        subtopics: [
          {
            id: 'oss1-b5-1',
            title: 'Příprava a Hodnocená práce 1. pololetí (Test 01)',
            hours: 2,
            type: 'test',
            description: 'Písemné a interaktivní ověření znalostí: Von Neumann, firmware UEFI, disky, FAT/NTFS a procesy.',
            practice: 'Vypracování hodnocené práce v modulu Test01 v IntLabu (autentizace PINem) a rozbor chyb.',
            route: '/specializovana/operacni-systemy-1/test01'
          },
          {
            id: 'oss1-b5-2',
            title: 'Architektura GUI: Desktop Window Manager a explorer.exe',
            hours: 2,
            type: 'kombinovane',
            description: 'Kompozice oken přes grafickou kartu (DWM), role shellu explorer.exe, restart havarované plochy z Task Manageru.',
            practice: 'Laboratorní odstřelení a opětovné spuštění explorer.exe z příkazového řádku a analýza paměťových nároků.',
            route: '/specializovana/operacni-systemy-1/gui'
          },
          {
            id: 'oss1-b5-3',
            title: 'Systémový disk C:\, profily uživatelů a atributy souborů',
            hours: 2,
            type: 'laborator',
            description: 'Hierarchie složek: Windows, System32, Program Files, struktura profilu %USERPROFILE%, atributy R, H, S, A.',
            practice: 'Manipulace s atributy souborů v grafice i přes příkaz attrib (odkrytí skrytých a systémových souborů).',
            route: '/specializovana/operacni-systemy-1/gui'
          }
        ]
      },
      {
        id: 'oss1-b6',
        order: 6,
        month: 'Únor',
        monthKey: 'unor',
        weeks: '20.–23. týden',
        title: 'Příkazový řádek (CMD) a tvorba dávkových souborů (.bat)',
        hours: 8,
        theoryHours: 2,
        practiceHours: 6,
        description: 'Správa souborů a složek v CLI, přesměrování a roury, proměnné, parametry a větvení v dávkových skriptech.',
        rvpCompetence: 'Samostatně ovládá příkazový řádek OS, píše a ladí funkční dávkový skript pro automatizovanou údržbu a zálohování.',
        subtopics: [
          {
            id: 'oss1-b6-1',
            title: 'Základní navigace a správa souborů v příkazovém řádku',
            hours: 2,
            type: 'laborator',
            description: 'Spuštění jako Správce, přepínání disků, navigace složkami (cd, dir), relativní a absolutní cesty, zástupné znaky * a ?.',
            practice: 'Praktické cvičení: rychlé vytvoření adresářové struktury firmy a hromadné kopírování souborů v terminálu.',
            route: '/specializovana/operacni-systemy-1/prikazova-radka'
          },
          {
            id: 'oss1-b6-2',
            title: 'Roury, přesměrování vstupů a výstupů a systémové filtry',
            hours: 2,
            type: 'laborator',
            description: 'Přesměrování do souboru (> a >>), proudové předávání dat přes rouru (|), filtry find, findstr a řazení sort.',
            practice: 'Vyfiltrování systémových informací ze systeminfo a export seznamu běžících úloh tasklist do textového reportu.',
            route: '/specializovana/operacni-systemy-1/prikazova-radka'
          },
          {
            id: 'oss1-b6-3',
            title: 'Dávkové soubory (.bat): proměnné, parametry a podmínky',
            hours: 2,
            type: 'laborator',
            description: 'Stavba skriptu: @echo off, proměnné (set /p, set /a), parametry z příkazové řádky (%1), podmínky if a if exist.',
            practice: 'Vytvoření interaktivního instalačního menu pro uživatele s volbou odpovědí Ano/Ne a kontrolou existence souborů.',
            route: '/specializovana/operacni-systemy-1/prikazova-radka'
          },
          {
            id: 'oss1-b6-4',
            title: 'Pokročilé skriptování: cykly for, skoky goto a zálohovací skript',
            hours: 2,
            type: 'projekt',
            description: 'Návěstí a nepodmíněné skoky (goto), průchod soubory přes cyklus for, volání podprogramů (call) a errorlevel.',
            practice: 'Samostatný projekt: Naprogramování automatizovaného zálohovacího skriptu s tvorbou časového razítka a logu.',
            route: '/specializovana/operacni-systemy-1/prikazova-radka'
          }
        ]
      },
      {
        id: 'oss1-b7',
        order: 7,
        month: 'Březen',
        monthKey: 'brezen',
        weeks: '24.–27. týden',
        title: 'Správa uživatelských účtů, skupiny a NTFS oprávnění',
        hours: 8,
        theoryHours: 2,
        practiceHours: 6,
        description: 'Autentizace a autorizace, standardní uživatel vs. administrátor, skupiny, NTFS ACL práva, dědičnost a příkaz icacls.',
        rvpCompetence: 'Nastavuje uživatelské účty a skupiny, konfiguruje přístupová práva NTFS se správným využitím dědičnosti.',
        subtopics: [
          {
            id: 'oss1-b7-1',
            title: 'Lokální uživatelé a vestavěné skupiny (lusrmgr.msc)',
            hours: 2,
            type: 'laborator',
            description: 'Lokální účty vs. účet Microsoft, princip nejmenších práv (PoLP), bezpečnost hesla, správa v GUI i přes net user.',
            practice: 'Založení servisních a uživatelských účtů na stanici, zařazení do skupin a vynucení změny hesla při přihlášení.',
            route: '/specializovana/operacni-systemy-1/uzivatele'
          },
          {
            id: 'oss1-b7-2',
            title: 'Řízení uživatelských účtů (UAC) a bezpečnostní tokeny',
            hours: 2,
            type: 'teorie',
            description: 'Architektura UAC: odfiltrovaný standardní token vs. plný administrátorský token, Secure Desktop, úrovně posuvníku UAC.',
            practice: 'Demonstrace chování UAC při spouštění instalačních programů a diagnostika zablokovaných operací.',
            route: '/specializovana/operacni-systemy-1/uzivatele'
          },
          {
            id: 'oss1-b7-3',
            title: 'NTFS přístupová práva: Seznamy ACL, čtení, zápis a Deny',
            hours: 2,
            type: 'laborator',
            description: 'Základní a rozšířená oprávnění NTFS, karta Zabezpečení, princip dědičnosti práv z nadřazené složky, priorita zákazu Deny.',
            practice: 'Praktické nastavení složky se sdílenými materiály: Učitel má plný zápis, studenti pouze čtení bez možnosti mazání.',
            route: '/specializovana/operacni-systemy-1/uzivatele'
          },
          {
            id: 'oss1-b7-4',
            title: 'Hromadná správa oprávnění v příkazovém řádku (icacls)',
            hours: 2,
            type: 'laborator',
            description: 'Syntaxe nástroje icacls, záloha oprávnění do souboru, hromadné přidělení práv pro celou třídu uživatelů.',
            practice: 'Napsání dávkového skriptu, který automaticky vytvoří 20 osobních složek a každému žákovi nastaví privátní práva.',
            route: '/specializovana/operacni-systemy-1/uzivatele'
          }
        ]
      },
      {
        id: 'oss1-b8',
        order: 8,
        month: 'Duben',
        monthKey: 'duben',
        weeks: '28.–30. týden',
        title: 'Správa zařízení, ovladače, software a Plánovač úloh',
        hours: 6,
        theoryHours: 2,
        practiceHours: 4,
        description: 'Komunikace jádra s hardwarem, Správce zařízení, balíčkovací nástroj Winget a automatizace údržby v Plánovači úloh.',
        rvpCompetence: 'Diagnostikuje a instaluje ovladače hardware, spravuje aplikace přes Winget a nastavuje plánované úlohy údržby.',
        subtopics: [
          {
            id: 'oss1-b8-1',
            title: 'Správce zařízení (devmgmt.msc), ovladače a digitální podpis WHQL',
            hours: 2,
            type: 'laborator',
            description: 'Role ovladačů v jádře (Ring 0), hardwarová ID zařízení (VEN, DEV), instalace přes .inf soubory a řešení konfliktů.',
            practice: 'Diagnostika neznámého zařízení podle Vendor ID na internetu a manuální instalace čistého ovladače.',
            route: '/specializovana/operacni-systemy-1/zarizeni'
          },
          {
            id: 'oss1-b8-2',
            title: 'Správa aplikačního software a balíčkovač Winget',
            hours: 2,
            type: 'laborator',
            description: 'Instalátory EXE vs. MSI, tiché instalace bez dialogů, balíčkovací správce Windows Package Manager (winget search/install).',
            practice: 'Hromadná instalace vývojářského prostředí (VS Code, Git, Chrome) jedním příkazem a tvorba exportního JSON souboru.',
            route: '/specializovana/operacni-systemy-1/software'
          },
          {
            id: 'oss1-b8-3',
            title: 'Plánovač úloh (taskschd.msc) a automatický běh pod SYSTEM',
            hours: 2,
            type: 'laborator',
            description: 'Architektura plánovače: triggery (čas, spuštění, přihlášení), akce (spuštění skriptu) a běh bez přihlášeného uživatele.',
            practice: 'Konfigurace automatické noční údržby a zálohy pomocí dříve napsaného .bat skriptu pod systémovým účtem.',
            route: '/specializovana/operacni-systemy-1/planovac'
          }
        ]
      },
      {
        id: 'oss1-b9',
        order: 9,
        month: 'Květen',
        monthKey: 'kveten',
        weeks: '31.–33. týden',
        title: 'Síťová konfigurace v OS, diagnostika a lokální sítě (LAN)',
        hours: 6,
        theoryHours: 2,
        practiceHours: 4,
        description: 'Síťové adaptéry, IP konfigurace (IPv4, maska, brána, DNS), diagnostické nástroje v CLI a sdílení v lokální síti.',
        rvpCompetence: 'Nakonfiguruje síťové rozhraní stanice, diagnostikuje konektivitu pomocí CLI utilit a nastaví sdílení v LAN.',
        subtopics: [
          {
            id: 'oss1-b9-1',
            title: 'Síťové adaptéry, fyzická MAC vs. logická IP adresa a DHCP',
            hours: 2,
            type: 'kombinovane',
            description: 'Síťová připojení (ncpa.cpl), struktura IPv4 adresy, síťová maska a výchozí brána, dynamické přidělování DHCP vs. statická IP.',
            practice: 'Zjištění a dokumentace kompletní síťové konfigurace pomocí příkazu ipconfig /all a uvolnění adresy (/release, /renew).',
            route: '/specializovana/operacni-systemy-1/site'
          },
          {
            id: 'oss1-b9-2',
            title: 'Diagnostický žebříček konektivity v CLI (ping, tracert, nslookup)',
            hours: 2,
            type: 'laborator',
            description: 'Metodika řešení výpadku sítě krok za krokem: localhost (127.0.0.1) ➔ vlastní IP ➔ výchozí brána ➔ veřejná IP ➔ DNS server.',
            practice: 'Praktické simulace poruch v síti (chybná maska, výpadek brány, nefunkční DNS) a jejich rychlá diagnostika v terminálu.',
            route: '/specializovana/operacni-systemy-1/site'
          },
          {
            id: 'oss1-b9-3',
            title: 'Síťové profily (Privátní vs. Veřejná síť) a sdílení souborů v LAN',
            hours: 2,
            type: 'laborator',
            description: 'Chování firewallu při změně síťového profilu, zjišťování sítě, sdílení složek a tiskáren, Wi-Fi příkazy netsh wlan.',
            practice: 'Zprovoznění sdílené složky mezi dvěma stanicemi v učebně a ověření funkčnosti přes UNC cestu \\\\IP\\share.',
            route: '/specializovana/operacni-systemy-1/site'
          }
        ]
      },
      {
        id: 'oss1-b10',
        order: 10,
        month: 'Červen',
        monthKey: 'cerven',
        weeks: '34.–35. týden',
        title: 'Závěrečný praktický projekt a komplexní hodnocení',
        hours: 6,
        theoryHours: 0,
        practiceHours: 6,
        description: 'Komplexní prověření všech kompetencí správce stanice: čistá instalace, konfigurace oddílů, zabezpečení a údržbový skript.',
        rvpCompetence: 'Samostatně zprovozní a zabezpečí klientský počítač podle specifikovaného zadání a obhájí řešení.',
        subtopics: [
          {
            id: 'oss1-b10-1',
            title: 'Zadání a realizace praktického projektu: Zprovoznění klientského PC',
            hours: 2,
            type: 'projekt',
            description: 'Komplexní úloha: rozdělení disku, vytvoření 3 uživatelských účtů s různými právy a nastavení složek.',
            practice: 'Samostatná praktická práce na přiděleném počítači nebo virtuálním stroji.',
            route: '/specializovana/operacni-systemy-1'
          },
          {
            id: 'oss1-b10-2',
            title: 'Realizace projektu: Skriptování údržby a síťová konfigurace',
            hours: 2,
            type: 'projekt',
            description: 'Doplnění stanice o funkční zálohovací dávkový skript v Plánovači úloh a otestování síťové konektivity a sdílení.',
            practice: 'Dokončení praktické konfigurace a příprava na technické testování.',
            route: '/specializovana/operacni-systemy-1'
          },
          {
            id: 'oss1-b10-3',
            title: 'Obhajoba projektu, rekapitulace ročníku a uzavření klasifikace',
            hours: 2,
            type: 'kombinovane',
            description: 'Předvedení funkčnosti stanice vyučujícímu, řešení simulované závady a rekapitulace látky před postupem do 2. ročníku.',
            practice: 'Prezentace výsledků, závěrečné hodnocení a seznámení s osnovou 2. ročníku (OSS 2).',
            route: '/specializovana/operacni-systemy-1'
          }
        ]
      }
    ]
  },
  ops2: {
    subjectId: 'ops2',
    subjectTitle: 'Operační systémy 2',
    gradeLabel: '2. Ročník SŠ',
    grade: 2,
    totalHours: 66,
    weeksCount: 33,
    weeklyHours: 2,
    academicYear: '2026/2027',
    fieldCode: '18-20-M/01',
    fieldTitle: 'Informační technologie',
    blocks: [
      {
        id: 'oss2-b1',
        order: 1,
        month: 'Září – Říjen',
        monthKey: 'zari',
        weeks: '1.–5. týden',
        title: 'Správa podnikových dat a zálohování',
        hours: 10,
        theoryHours: 2,
        practiceHours: 8,
        description: 'Pravidlo 3-2-1, typy záloh (plná, inkrementální, diferenciální), stínové kopie VSS a automatizované zálohování jako služba.',
        rvpCompetence: 'Navrhuje a realizuje podnikovou strategii zálohování, automatizuje zálohy s šifrováním a ověřuje obnovu dat.',
        subtopics: [
          {
            id: 'oss2-b1-1',
            title: 'Wargame – prověrka administrátorských dovedností z 1. ročníku',
            hours: 2,
            type: 'laborator',
            description: 'Diagnostika sítě, správa přístupových oprávnění NTFS a práce v textovém rozhraní.',
            practice: 'Praktické laboratorní úlohy zaměřené na audit a konfiguraci stanice z 1. ročníku.',
            route: '/specializovana/operacni-systemy-2/zalohovani/uvod'
          },
          {
            id: 'oss2-b1-2',
            title: 'Zásady zálohování, oborové pravidlo 3-2-1 a typy záloh',
            hours: 2,
            type: 'teorie',
            description: 'Plná, přírůstková a rozdílová záloha, archivní atribut a stínové kopie svazku VSS.',
            practice: 'Výpočet objemu záložních dat a návrh zálohovacího plánu pro firmu s denními změnami.',
            route: '/specializovana/operacni-systemy-2/zalohovani/manualni'
          },
          {
            id: 'oss2-b1-3',
            title: 'Skriptovaná synchronizace dat a zrcadlení v CLI',
            hours: 2,
            type: 'laborator',
            description: 'Zrcadlení složek a logování v systémových nástrojích (robocopy).',
            practice: 'Vytvoření synchronizačního skriptu s ošetřením chybových návratových kódů a zápisem do logu.',
            route: '/specializovana/operacni-systemy-2/zalohovani/system'
          },
          {
            id: 'oss2-b1-4',
            title: 'Cloudová synchronizace vs. nezávislá neměnná záloha',
            hours: 2,
            type: 'kombinovane',
            description: 'Rizika synchronizace při napadení ransomwarem, verzování a ochrana proti nechtěnému přepisu.',
            practice: 'Konfigurace verzované synchronizace na cloudové úložiště a simulace obnovy po havárii.',
            route: '/specializovana/operacni-systemy-2/zalohovani/cloud'
          },
          {
            id: 'oss2-b1-5',
            title: 'Automatizované zálohování jako systémová služba s šifrováním',
            hours: 2,
            type: 'laborator',
            description: 'Běh pod systémovým účtem, ochrana záložních archivů šifrováním a heslem, zálohování na síťový disk a test obnovy.',
            practice: 'Kompletní nastavení automatické inkrementální zálohy do šifrovaného archivu s odesláním na síťové úložiště.',
            route: '/specializovana/operacni-systemy-2/zalohovani/cobian'
          }
        ]
      },
      {
        id: 'oss2-b2',
        order: 2,
        month: 'Listopad – Leden',
        monthKey: 'listopad',
        weeks: '6.–15. týden',
        title: 'Bezpečnost koncových zařízení, audit a forenzní analýza',
        hours: 20,
        theoryHours: 6,
        practiceHours: 14,
        description: 'Typologie malwaru, forenzní audit procesů v Process Exploreru, digitální podpisy, Defender, Firewall, BitLocker a Mini-CTF.',
        rvpCompetence: 'Provádí forenzní audit procesů, analyzuje podezřelé chování systému, konfiguruje Defender, Firewall a šifrování BitLocker.',
        subtopics: [
          {
            id: 'oss2-b2-1',
            title: 'Typologie malwaru a proč CPU nepozná zlý úmysl',
            hours: 2,
            type: 'teorie',
            description: 'Slepé vykonávání instrukcí procesorem (Von Neumann), bezpečnostní tokeny, 6 hrozeb: virus, červ, trojan, ransomware, spyware, rootkit.',
            practice: 'Spuštění interaktivních simulátorů chování malwaru v IntLabu (Ransomware, Worm, Trojan Dropper).',
            route: '/specializovana/operacni-systemy-2/bezpecnost/malware'
          },
          {
            id: 'oss2-b2-2',
            title: 'Forenzní analýza procesů a ověřování podpisů Authenticode',
            hours: 2,
            type: 'laborator',
            description: 'Co dělá OS při spuštění .exe: lokální podpis, reputační cloud SmartScreen, antivirový sken. Nástroj Sysinternals Process Explorer.',
            practice: 'Forenzní laboratoř v IntLabu: výpočet hashe certutil, lustrace na VirusTotal.com, analýza stromu procesů a svchost.exe.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/procesy-a-certifikaty'
          },
          {
            id: 'oss2-b2-3',
            title: 'Systémový registr a persistence škodlivého kódu',
            hours: 2,
            type: 'laborator',
            description: 'Hierarchie klíčů HKLM vs. HKCU, soubory úlů (Hives), klíče Run, RunOnce, Winlogon a persistence po startu, export/import dávek .reg.',
            practice: 'Rentgen registru v IntLabu: odhalení podezřelé persistence zapsané škodlivým skriptem a bezpečné odstranění.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/registr'
          },
          {
            id: 'oss2-b2-4',
            title: 'Systémový žurnál událostí a bezpečnostní audit',
            hours: 2,
            type: 'laborator',
            description: 'Architektura Windows Event Log, protokoly Systém, Aplikace, Zabezpečení. Klíčová Event ID (přihlášení 4624, brute-force 4625, smazání logu 1102).',
            practice: 'Vyfiltrování neúspěšných pokusů o přihlášení v Prohlížeči událostí a vytvoření vlastního auditního filtru v IntLabu.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/udalosti'
          },
          {
            id: 'oss2-b2-5',
            title: 'Izolované testovací prostředí (Sandbox) a antivirus',
            hours: 2,
            type: 'laborator',
            description: 'Hyper-V jednorázový kontejner Windows Sandbox, signatury, heuristika, chování programu v paměti a standardní testovací vzorek EICAR.',
            practice: 'Spuštění podezřelého programu v Sandboxu, otestování reakce Defenderu pomocí EICAR a správa výjimek.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/izolace'
          },
          {
            id: 'oss2-b2-6',
            title: 'Paketový firewall na koncovém zařízení',
            hours: 2,
            type: 'laborator',
            description: 'Stavový firewall, příchozí vs. odchozí směr, porty TCP/UDP, propojení portu s PID procesem přes netstat -ano.',
            practice: 'Vytvoření vlastních pravidel ve wf.msc: zablokování odezvy na ping (ICMP) a blokace internetu konkrétní aplikaci.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/firewall'
          },
          {
            id: 'oss2-b2-7',
            title: 'Diskové šifrování BitLocker a TPM čip',
            hours: 2,
            type: 'laborator',
            description: 'Ochrana dat v klidu (Data at Rest), provázání s hardwarem TPM 2.0, záchranný klíč, BitLocker To Go, Controlled Folder Access.',
            practice: 'Zašifrování USB disku pomocí BitLocker To Go, export recovery klíče a konfigurace ochrany složek proti ransomwaru.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/sifrovani'
          },
          {
            id: 'oss2-b2-8',
            title: 'Správa systémových aktualizací a zranitelnosti (0-day)',
            hours: 2,
            type: 'laborator',
            description: 'Princip nejmenších oprávnění, chování tokenů UAC, servisní cykly záplat, 0-day zranitelnosti a hromadný update přes winget.',
            practice: 'Hromadný audit zranitelných verzí softwaru a update systému přes skript winget upgrade --all.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/ucty'
          },
          {
            id: 'oss2-b2-9',
            title: 'Sociální inženýrství, phishing a ochrana identity',
            hours: 2,
            type: 'kombinovane',
            description: 'Metody sociálního inženýrství, rozpoznávání podvodných e-mailů a URL, síla hesel, správce KeePass, vícefaktorové ověřování MFA (FIDO2).',
            practice: 'Analýza podvodného e-mailu v hlavičkách zpráv, kontrola úniku hesel na HaveIBeenPwned a nastavení MFA.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/sit-hesla'
          },
          {
            id: 'oss2-b2-10',
            title: 'Vyšetřování bezpečnostního incidentu (Mini-CTF)',
            hours: 2,
            type: 'projekt',
            description: 'Komplexní scénář napadeného počítače: identifikace anomálie, izolace na firewallu, dohledání škůdce, vyčištění a zpráva.',
            practice: 'Vyšetření fiktivního incidentu a sepsání protokolu o zásahu (Incident Response Report).',
            route: '/specializovana/operacni-systemy-2/bezpecnost/ctf'
          }
        ]
      },
      {
        id: 'oss2-b3',
        order: 3,
        month: 'Únor – Březen',
        monthKey: 'unor',
        weeks: '16.–24. týden',
        title: 'Systémové služby a administrační skriptování (PowerShell)',
        hours: 18,
        theoryHours: 4,
        practiceHours: 14,
        description: 'Konzole MMC, systémové služby na pozadí, objektový PowerShell, administrační skriptování a diagnostické reporty.',
        rvpCompetence: 'Píše administrační skripty v PowerShellu, spravuje systémové služby, konzole MMC a generuje stavové reporty.',
        subtopics: [
          {
            id: 'oss2-b3-1',
            title: 'Systémové služby Windows na pozadí a jejich životní cyklus',
            hours: 4,
            type: 'laborator',
            description: 'Procesy běžící bez interaktivního přihlášení pod účtem SYSTEM, typy spouštění, systémové závislosti, sc.exe a automatický restart po selhání.',
            practice: 'Konfigurace zotavení po selhání služby a správa závislostí v konzoli services.msc.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/sluzby'
          },
          {
            id: 'oss2-b3-2',
            title: 'Konzole správce (MMC) a centrální správa',
            hours: 4,
            type: 'laborator',
            description: 'Architektura snap-inů v mmc.exe, sestavení vlastní administrátorské konzole, autorský vs. uživatelský režim a uložení do souboru .msc.',
            practice: 'Sestavení vlastní diagnostické konzole MojeSprava.msc pro technickou podporu stanic.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/mmc'
          },
          {
            id: 'oss2-b3-3',
            title: 'PowerShell: Objektový shell, syntaxe cmdletů a roury',
            hours: 4,
            type: 'laborator',
            description: 'Rozdíl mezi textovým CMD a objektovým PowerShellem (.NET objekty). Konvence Sloveso-PodstatnéJméno, Get-Command, Get-Help, objektová roura |, Where-Object a Select-Object.',
            practice: 'Filtrování a třídění procesů a služeb podle využití RAM a stavu pomocí Where-Object a Select-Object.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/powershell'
          },
          {
            id: 'oss2-b3-4',
            title: 'Administrační skriptování v PowerShellu (.ps1)',
            hours: 4,
            type: 'laborator',
            description: 'Tvorba administračních skriptů, proměnné, cyklus foreach, podmínky if, práce se soubory, bezpečnostní politika spouštění ExecutionPolicy a podepisování.',
            practice: 'Vytvoření PowerShell skriptu pro kontrolu a automatický restart zamrzlé služby.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/powershell-sprava'
          },
          {
            id: 'oss2-b3-5',
            title: 'Automatizovaný sběr dat a generování stavových reportů',
            hours: 2,
            type: 'laborator',
            description: 'Diagnostika hardware a konfigurace stanice (Get-ComputerInfo, Get-Volume), transformace do HTML/CSV (ConvertTo-Html, Export-Csv) a plánování úloh.',
            practice: 'Vytvoření inspekčního PowerShell skriptu generujícího barevný HTML auditní report o stavu stanice.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/reporty'
          }
        ]
      },
      {
        id: 'oss2-b4',
        order: 4,
        month: 'Duben – Červen',
        monthKey: 'duben',
        weeks: '25.–33. týden',
        title: 'Síťové sdílení prostředků, vzdálená správa a centrální správa v doméně',
        hours: 18,
        theoryHours: 4,
        practiceHours: 14,
        description: 'Sdílení souborů SMB, vzdálená plocha RDP, koncept podnikové domény, připojení stanice Windows 11, GPO restrikce a závěrečný projekt.',
        rvpCompetence: 'Konfiguruje síťové sdílení SMB a RDP, připojuje klientskou stanici do domény Active Directory a aplikuje centrální politiky GPO.',
        subtopics: [
          {
            id: 'oss2-b4-1',
            title: 'Síťové sdílení složek a efektivní přístupová práva (SMB)',
            hours: 4,
            type: 'laborator',
            description: 'Protokol SMB (port 445), UNC cesty \\\\server\\share, kombinovaná práva sdílení vs. NTFS, trvalé mapování síťové jednotky.',
            practice: 'Zřízení sdílené složky s oddělenými právy pro oddělení firmy a její namapování klientům jako síťového disku.',
            route: '/specializovana/operacni-systemy-2/active-directory/smb'
          },
          {
            id: 'oss2-b4-2',
            title: 'Zabezpečená vzdálená správa pracovní plochy (RDP)',
            hours: 2,
            type: 'laborator',
            description: 'Protokol RDP (port 3389), autorizace vzdálených uživatelů, zabezpečení na úrovni sítě NLA a konfigurace firewallu.',
            practice: 'Povolení RDP na klientské stanici, připojení přes mstsc a ověření aktivních terminálových relací.',
            route: '/specializovana/operacni-systemy-2/active-directory/vzdalena-sprava'
          },
          {
            id: 'oss2-b4-3',
            title: 'Koncept podnikové infrastruktury a domény',
            hours: 2,
            type: 'teorie',
            description: 'Pracovní skupina vs. doménové prostředí, centralizovaná autentizace, role DNS a řadiče domény.',
            practice: 'Analýza podnikového schématu a ověření síťové dostupnosti doménových služeb.',
            route: '/specializovana/operacni-systemy-2/active-directory/server-a-domena'
          },
          {
            id: 'oss2-b4-4',
            title: 'Klientská stanice v podnikové doméně a uživatelské profily',
            hours: 4,
            type: 'laborator',
            description: 'Podmínka DNS, proces připojení stanice do domény, profil doménového uživatele na disku klienta.',
            practice: 'Připojení klientské stanice Windows 11 do domény a přihlášení pod doménovým účtem.',
            route: '/specializovana/operacni-systemy-2/active-directory/klient-v-domene'
          },
          {
            id: 'oss2-b4-5',
            title: 'Skupinové politiky (Group Policy – uplatnění na stanici)',
            hours: 4,
            type: 'laborator',
            description: 'Distribuce centrálních nastavení, zákaz výměnných USB disků, bezpečnostní restrikce, příkazy gpupdate a gpresult.',
            practice: 'Ověření uplatnění bezpečnostní GPO politiky zakazující USB disky a kontrola výstupu gpresult /r.',
            route: '/specializovana/operacni-systemy-2/active-directory/gpo'
          },
          {
            id: 'oss2-b4-6',
            title: 'Závěrečný integrující projekt administrace a zabezpečení stanice',
            hours: 2,
            type: 'projekt',
            description: 'Komplexní konfigurace stanice: síť, sdílení, zálohování, doména, GPO restrikce, křížový audit odolnosti a technická obhajoba.',
            practice: 'Samostatné zprovoznění a zabezpečení stanice ve virtuálním prostředí a obhajoba před vyučujícím.',
            route: '/specializovana/operacni-systemy-2/active-directory/zaloha-a-projekt'
          }
        ]
      }
    ]
  },
  ops3: {
    subjectId: 'ops3',
    subjectTitle: 'Operační systémy 3',
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
        id: 'oss3-b1',
        order: 1,
        month: 'Září – Říjen',
        monthKey: 'zari',
        weeks: '1.–8. týden',
        title: 'Linux: Architektura, instalace a základní správa systému',
        hours: 16,
        theoryHours: 4,
        practiceHours: 12,
        description: 'Přechod na open-source: instalace Ubuntu Serveru, hierarchie FHS, POSIX oprávnění, roury, správa disků a fstab, procesy a systemd.',
        rvpCompetence: 'Instaluje a bezpečně administruje Linuxový server přes terminál, spravuje soubory, práva, disky, procesy a systémové démony.',
        subtopics: [
          {
            id: 'oss3-b1-1',
            title: 'Architektura Linuxu, distribuce a instalace serveru bez GUI',
            hours: 2,
            type: 'laborator',
            description: 'Rodiny distribucí (Debian, RedHat), rozdělení disku na ext4 a swap, zavaděč GRUB, instalace headless serveru.',
            practice: 'Instalace čistého Ubuntu Serveru ve VirtualBoxu a první přihlášení do textové konzole.',
            route: '/specializovana/operacni-systemy-3/linux/instalace'
          },
          {
            id: 'oss3-b1-2',
            title: 'Hierarchie souborového systému FHS a orientace v terminálu',
            hours: 2,
            type: 'laborator',
            description: 'Filesystem Hierarchy Standard: význam složek /etc, /var, /home, /bin, /dev, /tmp. Příkazy pwd, cd, ls -la, cp, mv, rm -rf.',
            practice: 'Praktická navigace a tvorba stromové struktury projektu výhradně z příkazové řádky.',
            route: '/specializovana/operacni-systemy-3/linux/terminal'
          },
          {
            id: 'oss3-b1-3',
            title: 'Uživatelé, skupiny a POSIX oprávnění (chmod, chown, sudoers)',
            hours: 2,
            type: 'laborator',
            description: 'Model UGO (User, Group, Others), práva rwx v osmičkové soustavě (755, 644), změna vlastníka chown, bezpečnost přes sudo.',
            practice: 'Zabezpečení adresářů firmy: nastavení restriktivních práv pro skupinu vývojářů a konfigurace souboru /etc/sudoers.',
            route: '/specializovana/operacni-systemy-3/linux/prava'
          },
          {
            id: 'oss3-b1-4',
            title: 'Proudové filtry, roury a textové editory v terminálu',
            hours: 2,
            type: 'laborator',
            description: 'Standardní proudy stdin/stdout/stderr, přesměrování (> a >>), propojování rourou |, regulární výrazy a filtr grep.',
            practice: 'Vyhledávání chyb v systémovém konfiguračním souboru a rychlá editace v textovém editoru nano.',
            route: '/specializovana/operacni-systemy-3/linux/text-a-roury'
          },
          {
            id: 'oss3-b1-5',
            title: 'Správa disků v Linuxu: oddíly, formátování a připojování /etc/fstab',
            hours: 2,
            type: 'laborator',
            description: 'Nástroje fdisk a lsblk, tvorba souborového systému mkfs.ext4, manuální mount a automatické připojení přes /etc/fstab.',
            practice: 'Připojení druhého virtuálního pevného disku a konfigurace jeho permanentního připojení do složky /data.',
            route: '/specializovana/operacni-systemy-3/linux/disky'
          },
          {
            id: 'oss3-b1-6',
            title: 'Správa procesů a sledování vytížení systému (ps, top, htop, kill)',
            hours: 2,
            type: 'laborator',
            description: 'Výpis procesů ps aux, interaktivní monitor htop, signály ukončení (SIGTERM 15, SIGKILL 9), změna priority procesu přes nice.',
            practice: 'Simulace zaseknutého skriptu na pozadí, jeho lokalizace a bezpečné ukončení příkazem kill.',
            route: '/specializovana/operacni-systemy-3/linux/procesy'
          },
          {
            id: 'oss3-b1-7',
            title: 'Správa software a balíčkovací systém APT (repozitáře a aktualizace)',
            hours: 2,
            type: 'laborator',
            description: 'Architektura balíčků .deb, repozitáře v /etc/apt/sources.list, příkazy apt update, apt upgrade, vyhledávání a závislosti.',
            practice: 'Instalace diagnostických balíčků a konfigurace automatických bezpečnostních záplat unattended-upgrades.',
            route: '/specializovana/operacni-systemy-3/linux/balicky'
          },
          {
            id: 'oss3-b1-8',
            title: 'Systémové služby (systemd démony) a analýza logů (journalctl)',
            hours: 2,
            type: 'laborator',
            description: 'Init systém systemd, řízení démonů přes systemctl (start, stop, enable, status), analýza žurnálu přes journalctl -u.',
            practice: 'Vytvoření vlastní systémové služby pro automatické spouštění administračního skriptu po startu serveru.',
            route: '/specializovana/operacni-systemy-3/linux/sluzby-a-logy'
          }
        ]
      },
      {
        id: 'oss3-b2',
        order: 2,
        month: 'Listopad – Prosinec',
        monthKey: 'listopad',
        weeks: '9.–16. týden',
        title: 'Linux: Sítě, serverové služby a automatizace v shellu',
        hours: 16,
        theoryHours: 4,
        practiceHours: 12,
        description: 'Paketový firewall UFW, zabezpečená správa SSH, webový server Apache a HTTPS, sdílení Samba s Windows, programování v Bashi a cron.',
        rvpCompetence: 'Zprovozňuje síťové služby SSH, Apache, HTTPS a Samba, píše skripty v Bashi pro automatizaci a plánuje je v cronu.',
        subtopics: [
          {
            id: 'oss3-b2-1',
            title: 'Síťová konfigurace v Linuxu a paketový firewall UFW',
            hours: 2,
            type: 'laborator',
            description: 'Příkazy ip a, ip route, konfigurace Netplan (/etc/netplan), správa jednoduchého firewallu UFW (ufw allow, enable, status).',
            practice: 'Zabezpečení serveru: povolení pouze SSH a webových portů a zablokování veškerého ostatního příchozího provozu.',
            route: '/specializovana/operacni-systemy-3/sluzby/sit-a-firewall'
          },
          {
            id: 'oss3-b2-2',
            title: 'Zabezpečená vzdálená správa přes SSH a asymetrické klíče',
            hours: 2,
            type: 'laborator',
            description: 'Protokol SSH (port 22), generování klíčů ssh-keygen (Ed25519), konfigurace /etc/ssh/sshd_config a zákaz hesel pro root.',
            practice: 'Bezpečné přihlášení ze stanice Windows na Linuxový server bez zadávání hesla výhradně pomocí privátního klíče.',
            route: '/specializovana/operacni-systemy-3/sluzby/ssh'
          },
          {
            id: 'oss3-b2-3',
            title: 'Webový server Apache: Konfigurace, virtuální hostitelé a oprávnění',
            hours: 2,
            type: 'laborator',
            description: 'Instalace webového serveru Apache2, kořenový adresář /var/www/html, vlastník www-data, tvorba VirtualHostů.',
            practice: 'Zprovoznění webové prezentace a otestování přístupu z klientského prohlížeče v lokální síti.',
            route: '/specializovana/operacni-systemy-3/sluzby/apache'
          },
          {
            id: 'oss3-b2-4',
            title: 'Zabezpečení webu certifikátem HTTPS a šifrování provozu',
            hours: 2,
            type: 'laborator',
            description: 'Proč je HTTP nebezpečné (přenos hesel v otevřeném textu), šifrování TLS/SSL, moduly Apache ssl a nástroj Certbot.',
            practice: 'Konfigurace SSL modulu v Apache a nasazení certifikátu s vynuceným přesměrováním z portu 80 na 443.',
            route: '/specializovana/operacni-systemy-3/sluzby/https'
          },
          {
            id: 'oss3-b2-5',
            title: 'Sdílení dat mezi Linuxem a Windows přes Sambu (smb.conf)',
            hours: 2,
            type: 'laborator',
            description: 'Implementace protokolu SMB na Linuxu, konfigurační soubor /etc/samba/smb.conf, uživatelé smbpasswd, přístupová práva.',
            practice: 'Zprovoznění síťového disku na Linuxu přístupného z Windows Průzkumníka přes adresu \\\\linux-ip\\sdileno.',
            route: '/specializovana/operacni-systemy-3/sluzby/samba'
          },
          {
            id: 'oss3-b2-6',
            title: 'Administrační skriptování v shellu: Proměnné a argumenty ($1, $#)',
            hours: 2,
            type: 'laborator',
            description: 'Základ skriptu: #!/bin/bash, spustitelný příznak chmod +x, proměnné, čtení vstupu read, předávání argumentů z CLI.',
            practice: 'Napsání skriptu pro rychlé vytvoření nového uživatele v Linuxu včetně domovského adresáře a vygenerování hesla.',
            route: '/specializovana/operacni-systemy-3/sluzby/bash-zaklady'
          },
          {
            id: 'oss3-b2-7',
            title: 'Administrační skriptování v shellu: Podmínky, cykly a zálohování (tar)',
            hours: 2,
            type: 'laborator',
            description: 'Podmínky test a [[ ]], porovnávání řetězců a čísel, cykly for a while, archivace dat utilitou tar s kompresí gzip.',
            practice: 'Vytvoření robustního zálohovacího skriptu, který zabalí webové složky, přidá datum a zkontroluje úspěšnost.',
            route: '/specializovana/operacni-systemy-3/sluzby/bash-skripty'
          },
          {
            id: 'oss3-b2-8',
            title: 'Automatické periodické plánování úloh v systému (cron a crontab)',
            hours: 2,
            type: 'laborator',
            description: 'Struktura démonu cron, syntaxe pěti hvězdiček (minuta hodina den měsíc den-v-týdnu), uživatelský vs. systémový crontab.',
            practice: 'Naplánování automatického spouštění zálohovacího Bash skriptu každou noc ve 2:00 ráno a rotace logů.',
            route: '/specializovana/operacni-systemy-3/sluzby/cron'
          }
        ]
      },
      {
        id: 'oss3-b3',
        order: 3,
        month: 'Leden – Únor',
        monthKey: 'leden',
        weeks: '17.–22. týden',
        title: 'Kybernetická bezpečnost, síťový audit a obrana',
        hours: 12,
        theoryHours: 3,
        practiceHours: 9,
        description: 'Právní a etický rámec IT, průzkum sítě Nmapem, analýza paketů ve Wiresharku, ochrana a lámání hesel a CTF cvičení.',
        rvpCompetence: 'Provádí bezpečnostní audit sítě Nmapem, analyzuje síťový provoz ve Wiresharku a testuje odolnost přístupových hesel.',
        subtopics: [
          {
            id: 'oss3-b3-1',
            title: 'Právní a etický rámec: Trestní zákoník, NIS 2 a Cyber Kill Chain',
            hours: 2,
            type: 'teorie',
            description: 'Paragrafy § 230–232 TrZ (neoprávněný přístup k počítačovému systému), směrnice NIS 2, fáze útoku podle Cyber Kill Chain.',
            practice: 'Rozbor reálných soudních kauz a případových studií kybernetických útoků v ČR.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/pravo-a-utok'
          },
          {
            id: 'oss3-b3-2',
            title: 'Bezpečnostní průzkum sítě a mapování zranitelností (Nmap & CVE)',
            hours: 2,
            type: 'laborator',
            description: 'Skenování otevřených portů nástrojem Nmap (-sS, -sV, -O), detekce zranitelných verzí služeb a vyhledávání v databázi CVE.',
            practice: 'Audit přiděleného cvičného serveru: nalezení otevřených portů a identifikace zastaralých služeb.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/osint-nmap'
          },
          {
            id: 'oss3-b3-3',
            title: 'Analýza síťového provozu paketovým analyzátorem (Wireshark)',
            hours: 2,
            type: 'laborator',
            description: 'Odchytávání paketů ve Wiresharku, analýza TCP 3-way handshake, demonstrace úniku hesla v nešifrovaném protokolu (HTTP, FTP, Telnet).',
            practice: 'Odchyt nešifrovaného přihlašovacího požadavku a srovnání se zašifrovanou komunikací přes HTTPS/SSH.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/wireshark'
          },
          {
            id: 'oss3-b3-4',
            title: 'Ochrana autentizace a princip ukládání hesel v operačních systémech',
            hours: 2,
            type: 'laborator',
            description: 'Kryptografické hashovací funkce (SHA-512, bcrypt), význam soli proti duplicitám, ukládání v /etc/shadow a SAM.',
            practice: 'Generování hashů ze zadaného hesla s různou solí a analýza struktury záznamu v /etc/shadow.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/hashe-a-soleni'
          },
          {
            id: 'oss3-b3-5',
            title: 'Audit odolnosti hesel: Slovníkové útoky a testování síly hesel',
            hours: 2,
            type: 'laborator',
            description: 'Metody prolamování hashů: Brute-Force vs. slovníkový útok, slovník RockYou, nástroje John the Ripper a Hashcat.',
            practice: 'Audit slabých hesel ve cvičném seznamu hashů pomocí slovníku RockYou ve virtuální laboratoři.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/slovnikove-utoky'
          },
          {
            id: 'oss3-b3-6',
            title: 'Reakce na bezpečnostní incident a náprava kompromitovaného systému (CTF)',
            hours: 2,
            type: 'projekt',
            description: 'Vyšetřovací scénář na reálném cvičném Linuxovém stroji: nalezení zadních vrátek (backdooru), audit logů a oprava firewallu.',
            practice: 'Samostatné splnění úkolů v cvičném zranitelném kontejneru a získání bezpečnostních FLAGů.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/incident-ctf'
          }
        ]
      },
      {
        id: 'oss3-b4',
        order: 4,
        month: 'Březen – Květen',
        monthKey: 'brezen',
        weeks: '23.–31. týden',
        title: 'Verzovací systémy, týmová kooperace a infrastrukturní projekt',
        hours: 18,
        theoryHours: 4,
        practiceHours: 14,
        description: 'Tři zóny Gitu, větve a řešení konfliktů, GitHub workflow, agilní řízení v Kanbanu a realizace hybridní infrastruktury.',
        rvpCompetence: 'Verzuje zdrojový kód a konfigurace v Gitu, spolupracuje v týmu podle metodiky Kanban a zprovozní komplexní síťovou infrastrukturu.',
        subtopics: [
          {
            id: 'oss3-b4-1',
            title: 'Principy verzování: Tři zóny Gitu a první commit',
            hours: 2,
            type: 'kombinovane',
            description: 'Proč nepoužívat soubory verze_final. Zóny: Working Directory ➔ Staging Area (git add) ➔ Repository (git commit).',
            practice: 'Inicializace lokálního repozitáře git init, nastavení identity a provedení prvního commitu se smysluplnou zprávou.',
            route: '/specializovana/operacni-systemy-3/git/principy'
          },
          {
            id: 'oss3-b4-2',
            title: 'Běžný pracovní cyklus, historie a ignorování souborů (.gitignore)',
            hours: 2,
            type: 'laborator',
            description: 'Příkazy git status, git log --oneline, git diff, obnovení starší verze a ignorování dočasných souborů v .gitignore.',
            practice: 'Praktické sledování historie změn v kódu a správná konfigurace .gitignore pro vynechání hesel a velkých dat.',
            route: '/specializovana/operacni-systemy-3/git/zakladni-cyklus'
          },
          {
            id: 'oss3-b4-3',
            title: 'Větvení (Branches), slučování (Merge) a řešení kolizí',
            hours: 2,
            type: 'laborator',
            description: 'Paralelní vývoj nových funkcí ve větvích, příkazy git branch, git checkout / switch, sloučení větví a řešení merge konfliktů.',
            practice: 'Simulace kolize v kódu: dva žáci upraví stejný řádek skriptu, manuálně vyřeší konflikt a úspěšně provedou merge.',
            route: '/specializovana/operacni-systemy-3/git/vetve'
          },
          {
            id: 'oss3-b4-4',
            title: 'Vzdálené repozitáře a týmový workflow na GitHubu (Push, Pull, PR)',
            hours: 2,
            type: 'laborator',
            description: 'Propojení lokálního repozitáře s GitHubem přes SSH klíč, příkazy git push a git pull, tvorba Pull Requestu a Code Review.',
            practice: 'Týmová spolupráce ve dvojicích: naklonování cizího repozitáře, vytvoření větve, odeslání Pull Requestu a jeho schválení.',
            route: '/specializovana/operacni-systemy-3/git/github'
          },
          {
            id: 'oss3-b4-5',
            title: 'Agilní organizace úkolů (Kanban) a týmová komunikace',
            hours: 2,
            type: 'kombinovane',
            description: 'Principy agilního řízení, backlog, sloupce To Do / In Progress / Done, rozdělení rolí v týmu (správce Linuxu, správce AD, tester).',
            practice: 'Založení týmové nástěnky na GitHub Projects / Trellu a rozpad komplexního zadání na konkrétní tikety.',
            route: '/specializovana/operacni-systemy-3/tymova-spoluprace/kanban'
          },
          {
            id: 'oss3-b4-6',
            title: 'Realizace komplexní podnikové infrastruktury (Linux + Windows + Git)',
            hours: 6,
            type: 'projekt',
            description: 'Komplexní zadání: Windows stanice s doménou, Linuxový server (Apache HTTPS + SSH + Samba) a verzování konfigurací v Gitu.',
            practice: 'Týmová konfigurace serverů ve VirtualBoxu, nastavení firewallů, sdílení dat a zálohování.',
            route: '/specializovana/operacni-systemy-3/tymova-spoluprace/projekt'
          },
          {
            id: 'oss3-b4-7',
            title: 'Křížový bezpečnostní audit, test záloh a ústní obhajoba projektů',
            hours: 2,
            type: 'projekt',
            description: 'Křížový audit: tým A otestuje bezpečnost a zálohy týmu B. Předvedení živého funkčního prostředí a ústní obhajoba.',
            practice: 'Prezentace týmů, hodnocení funkčnosti infrastruktury a technické dokumentace.',
            route: '/specializovana/operacni-systemy-3/tymova-spoluprace/obhajoba'
          }
        ]
      },
      {
        id: 'oss3-b5',
        order: 5,
        month: 'Červen',
        monthKey: 'cerven',
        weeks: '32.–33. týden',
        title: 'Závěrečná reflexe tříletého kurikula a rezerva',
        hours: 4,
        theoryHours: 0,
        practiceHours: 4,
        description: 'Rekapitulace celé osy OSS 1 ➔ OSS 2 ➔ OSS 3, příprava na maturitní témata a rezerva pro školní akce.',
        rvpCompetence: 'Syntetizuje znalosti Windows a Linuxu do uceleného přehledu správy operačních systémů.',
        subtopics: [
          {
            id: 'oss3-b5-1',
            title: 'Syntéza tříleté výuky: Komparace Windows a Linuxové administrace',
            hours: 2,
            type: 'kombinovane',
            description: 'Srovnávací přehled: Registry vs. /etc, Služby vs. systemd, PowerShell vs. Bash, NTFS vs. ext4, Active Directory vs. LDAP.',
            practice: 'Řešení typových maturitních a technických úloh ze správy operačních systémů.',
            route: '/specializovana/operacni-systemy-3'
          },
          {
            id: 'oss3-b5-2',
            title: 'Rezerva pro školní akce a uzavření klasifikace 3. ročníku',
            hours: 2,
            type: 'kombinovane',
            description: 'Časová rezerva na maturity, sportovní a exkurzní dny školy a celkové uzavření klasifikace.',
            practice: 'Zpětná vazba k výuce a představení návazností ve 4. ročníku.',
            route: '/specializovana/operacni-systemy-3'
          }
        ]
      }
    ]
  }
};
