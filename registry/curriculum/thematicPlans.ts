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
        description: 'Vnitřní fungování počítače z pohledu OS: sběrnice, procesorový instrukční cyklus, adresace RAM a BIOS/UEFI.',
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
            title: 'Firmware: BIOS, UEFI, POST test a Secure Boot',
            hours: 2,
            type: 'laborator',
            description: 'Rozdíl mezi legacy BIOS a moderním UEFI, inicializační test POST, konfigurace bootovací priority a Secure Boot.',
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
        description: 'Magnetická HDD vs. polovodičová SSD, oddíly MBR/GPT, alokace klastrů ve FAT a NTFS a správa svazků.',
        rvpCompetence: 'Rozděluje disky na oddíly GPT/MBR, formátuje svazky do NTFS/FAT32, provádí defragmentaci a kontrolu disku.',
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
            title: 'Diskové oddíly MBR vs. GPT a souborový systém FAT',
            hours: 2,
            type: 'teorie',
            description: 'Tabulka oddílů MBR (limit 2 TB) vs. moderní GPT s redundancí. Princip alokace ve FAT: boot sektor, FAT tabulka, řetězení klastrů.',
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
            description: 'Proces vs. vlákno (sdílená paměť), jednotka MMU, stránkování do pagefile.sys a výpadek stránky (Page Fault).',
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
            description: 'Písemné a interaktivní ověření znalostí: Von Neumann, BIOS/UEFI, disky, FAT/NTFS a procesy.',
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
        weeks: '1.–4. týden',
        title: 'Správa podnikových dat a zálohování (Backup)',
        hours: 8,
        theoryHours: 2,
        practiceHours: 6,
        description: 'Pravidlo 3-2-1, typy záloh (plná, inkrementální, diferenciální), stínové kopie VSS a automatizace v Cobian Reflector.',
        rvpCompetence: 'Navrhuje a realizuje podnikovou strategii zálohování, automatizuje zálohy s šifrováním AES-256 a ověřuje obnovu dat.',
        subtopics: [
          {
            id: 'oss2-b1-1',
            title: 'Význam záloh, pravidlo 3-2-1 a typy záloh (Plná, Inkrementální, Diferenciální)',
            hours: 2,
            type: 'teorie',
            description: 'Základní principy ochrany dat, pravidlo 3 kopií na 2 médiích z toho 1 mimo lokalitu. Srovnání časové náročnosti a obnovy.',
            practice: 'Výpočet objemu záložních dat a návrh zálohovacího plánu pro firmu s denními změnami.',
            route: '/specializovana/operacni-systemy-2/zalohovani/uvod'
          },
          {
            id: 'oss2-b1-2',
            title: 'Manuální záloha, struktura složek a archivní bit (attrib +a / -a)',
            hours: 2,
            type: 'laborator',
            description: 'Mechanismus archivního bitu v souborovém systému, jak zálohovací software pozná změněný soubor od minulé zálohy.',
            practice: 'Praktický test v CLI: simulace inkrementální zálohy sledováním a resetováním archivního bitu.',
            route: '/specializovana/operacni-systemy-2/zalohovani/manualni'
          },
          {
            id: 'oss2-b1-3',
            title: 'Systémové nástroje Windows: Historie souborů a Stínové kopie (VSS)',
            hours: 2,
            type: 'laborator',
            description: 'Volume Shadow Copy Service (VSS), zálohování otevřených souborů za běhu, konfigurace Historie souborů na externí disk.',
            practice: 'Aktivace stínových kopií svazku, úmyslné poškození dokumentu a obnova předchozí verze ze stínové kopie.',
            route: '/specializovana/operacni-systemy-2/zalohovani/system'
          },
          {
            id: 'oss2-b1-4',
            title: 'Automatizované zálohování: Cobian Reflector, AES-256 a cloud',
            hours: 2,
            type: 'laborator',
            description: 'Instalace a běh Cobian Reflectoru jako systémové služby na pozadí, šifrování záloh silnou šifrou AES-256 a plánovač.',
            practice: 'Kompletní nastavení automatické inkrementální zálohy účetních dat do šifrovaného archivu s odesláním na síťové úložiště.',
            route: '/specializovana/operacni-systemy-2/zalohovani/cobian'
          }
        ]
      },
      {
        id: 'oss2-b2',
        order: 2,
        month: 'Listopad – Leden',
        monthKey: 'listopad',
        weeks: '5.–15. týden',
        title: 'Bezpečnost 1: Ochrana Windows 11 a forenzní analýza',
        hours: 22,
        theoryHours: 6,
        practiceHours: 16,
        description: 'Typologie malwaru, forenzní audit procesů v Process Exploreru, digitální podpisy, Defender, Firewall, BitLocker a Mini-CTF.',
        rvpCompetence: 'Provádí forenzní audit procesů, analyzuje podezřelé chování systému, konfiguruje Defender, Firewall a šifrování BitLocker.',
        subtopics: [
          {
            id: 'oss2-b2-1',
            title: 'Úvod do malwaru a principy nákazy: Proč CPU nepozná zlý úmysl',
            hours: 2,
            type: 'teorie',
            description: 'Slepé vykonávání instrukcí procesorem (Von Neumann), bezpečnostní tokeny, 6 hrozeb: virus, červ, trojan, ransomware, spyware, rootkit.',
            practice: 'Spuštění 6 interaktivních simulátorů chování malwaru v IntLabu (Ransomware, Worm, Trojan Dropper).',
            route: '/specializovana/operacni-systemy-2/bezpecnost/malware'
          },
          {
            id: 'oss2-b2-2',
            title: 'Správa procesů, Process Explorer a ověřování podpisů Authenticode',
            hours: 4,
            type: 'laborator',
            description: 'Co dělá OS při spuštění .exe: lokální podpis, reputační cloud SmartScreen, antivirový sken. Nástroj Sysinternals Process Explorer.',
            practice: 'Forenzní laboratoř v IntLabu: výpočet hashe certutil, lustrace na VirusTotal.com, analýza stromu procesů a svchost.exe.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/procesy-a-certifikaty'
          },
          {
            id: 'oss2-b2-3',
            title: 'Izolované prostředí: Windows Sandbox a skryté spouštění Autoruns',
            hours: 2,
            type: 'laborator',
            description: 'Hyper-V jednorázový kontejner Windows Sandbox, perzistence malwaru: složka Po spuštění, Task Scheduler, klíče Run v registru.',
            practice: 'Spuštění podezřelého programu v Sandboxu a audit automaticky spouštěných aplikací přes Sysinternals Autoruns.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/izolace'
          },
          {
            id: 'oss2-b2-4',
            title: 'Antivirový systém Windows Defender a standardní test EICAR',
            hours: 2,
            type: 'kombinovane',
            description: 'Tři pilíře detekce: signatury, heuristika a behaviorální analýza v reálném čase. Cloudová ochrana, správa z PowerShellu.',
            practice: 'Bezpečné otestování reakce Defenderu pomocí testovacího řetězce EICAR a konfigurace výjimek v CLI.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/defender'
          },
          {
            id: 'oss2-b2-5',
            title: 'Windows Firewall: porty, protokoly a pravidla ve wf.msc',
            hours: 3,
            type: 'laborator',
            description: 'Stavový firewall, příchozí vs. odchozí směr, porty TCP/UDP, propojení portu s PID procesem přes netstat -ano.',
            practice: 'Vytvoření vlastních pokročilých pravidel ve wf.msc: zablokování odezvy na ping (ICMP) a blokace internetu konkrétní aplikaci.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/firewall'
          },
          {
            id: 'oss2-b2-6',
            title: 'Šifrování disků BitLocker, čip TPM 2.0 a ochrana složek',
            hours: 3,
            type: 'laborator',
            description: 'Ochrana dat v klidu (Data at Rest), provázání s hardwarem TPM 2.0, záchranný klíč, BitLocker To Go, Controlled Folder Access.',
            practice: 'Zašifrování USB disku pomocí BitLocker To Go, export recovery klíče a konfigurace ochrany složek proti ransomwaru.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/sifrovani'
          },
          {
            id: 'oss2-b2-7',
            title: 'Správa účtů, UAC v hloubce a hromadné aktualizace winget',
            hours: 2,
            type: 'laborator',
            description: 'Princip nejmenších oprávnění, chování tokenů UAC, zalepování zranitelností pravidelnými aktualizacemi aplikací.',
            practice: 'Hromadný audit zranitelných verzí softwaru a update systému přes skript winget upgrade --all.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/ucty'
          },
          {
            id: 'oss2-b2-8',
            title: 'Síťová kyberhygiena: Phishing, správci hesel a vícefázové ověření (MFA)',
            hours: 2,
            type: 'kombinovane',
            description: 'Metody sociálního inženýrství, rozpoznávání podvodných e-mailů a URL, síla hesel, správce KeePass, FIDO2 klíče.',
            practice: 'Analýza podvodného e-mailu v hlavičkách zpráv, kontrola úniku hesel na HaveIBeenPwned a nastavení MFA.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/sit-hesla'
          },
          {
            id: 'oss2-b2-9',
            title: 'Závěrečná bezpečnostní detektivka (Mini-CTF Incident Response)',
            hours: 2,
            type: 'projekt',
            description: 'Komplexní scénář napadeného počítače: identifikace anomálie, izolace na firewallu, dohledání škůdce, vyčištění a zpráva.',
            practice: 'Samostatná nebo párová práce: vyšetření fiktivního incidentu a sepsání protokolu o zásahu.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/ctf'
          }
        ]
      },
      {
        id: 'oss2-b3',
        order: 3,
        month: 'Únor – Březen',
        monthKey: 'unor',
        weeks: '16.–20. týden',
        title: 'Pokročilá správa Windows a skriptování v PowerShellu',
        hours: 10,
        theoryHours: 3,
        practiceHours: 7,
        description: 'Konzole MMC, systémové služby na pozadí, objektový PowerShell, úpravy systémového registru a audit v Prohlížeči událostí.',
        rvpCompetence: 'Píše administrační skripty v PowerShellu, spravuje systémové služby, registr Windows a analyzuje logy v Event Vieweru.',
        subtopics: [
          {
            id: 'oss2-b3-1',
            title: 'Konzole správce (MMC) a systémové služby na pozadí (services.msc)',
            hours: 2,
            type: 'laborator',
            description: 'Architektura snap-inů v mmc.exe, procesy běžící bez přihlášení pod účtem SYSTEM, typy spouštění, závislosti a zotavení po chybě.',
            practice: 'Sestavení vlastní administrátorské konzole a konfigurace automatického restartu služby po selhání.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/mmc'
          },
          {
            id: 'oss2-b3-2',
            title: 'PowerShell: Syntaxe, objekty a roury (Where-Object, Select-Object)',
            hours: 2,
            type: 'laborator',
            description: 'Rozdíl mezi textovým CMD a objektovým PowerShellem. Konvence Sloveso-PodstatnéJméno, Get-Command, Get-Help, roura objektů |.',
            practice: 'Filtrování a třídění procesů a služeb podle využití RAM a stavu pomocí Where-Object a Select-Object.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/powershell'
          },
          {
            id: 'oss2-b3-3',
            title: 'Automatizace správy v PowerShellu (skripty .ps1 a ExecutionPolicy)',
            hours: 2,
            type: 'laborator',
            description: 'Tvorba administračních skriptů, proměnné, pole, cyklus foreach, bezpečnostní politika spouštění skriptů ExecutionPolicy.',
            practice: 'Vytvoření PowerShell skriptu, který vygeneruje HTML report o stavu disku, běžících službách a volné RAM stanice.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/skriptovani'
          },
          {
            id: 'oss2-b3-4',
            title: 'Systémový registr Windows: Hives, klíče, hodnoty a soubory .reg',
            hours: 2,
            type: 'laborator',
            description: 'Hierarchie registru (HKLM, HKCU), typy hodnot (REG_SZ, REG_DWORD), zálohování a import konfiguračních dávek .reg.',
            practice: 'Praktická úprava chování Průzkumníka Windows (vynucení zobrazování přípon a skrytých souborů pro všechny uživatele).',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/registr'
          },
          {
            id: 'oss2-b3-5',
            title: 'Prohlížeč událostí (Event Viewer) a auditní bezpečnostní logy',
            hours: 2,
            type: 'laborator',
            description: 'Protokoly Systém, Aplikace, Zabezpečení. Klíčová Event ID (4624 úspěšné přihlášení, 4625 neúspěšné přihlášení, 1102 smazání logu).',
            practice: 'Sestavení vlastního zobrazení pro sledování neoprávněných pokusů o prolomení hesla v systému.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/udalosti'
          }
        ]
      },
      {
        id: 'oss2-b4',
        order: 4,
        month: 'Duben – Květen',
        monthKey: 'duben',
        weeks: '21.–26. týden',
        title: 'Síťové serverové služby a podniková infrastruktura',
        hours: 12,
        theoryHours: 4,
        practiceHours: 8,
        description: 'Zprovoznění a správa klíčových síťových rolí: DHCP, DNS, souborový server SMB, vzdálená správa RDP/SSH, web IIS a SQL server.',
        rvpCompetence: 'Instaluje a konfiguruje síťové serverové role DHCP, DNS, SMB a IIS, zprovozňuje zabezpečenou vzdálenou správu.',
        subtopics: [
          {
            id: 'oss2-b4-1',
            title: 'DHCP server: Proces DORA, rozsah Scope a statické rezervace',
            hours: 2,
            type: 'laborator',
            description: '4 kroky přidělení IP: Discover, Offer, Request, Acknowledge (UDP 67/68), doba zápůjčky Lease time, rezervace MAC pro tiskárny.',
            practice: 'Konfigurace DHCP oboru na Windows Serveru ve VirtualBoxu a ověření převzetí konfigurace klientem Windows 11.',
            route: '/specializovana/operacni-systemy-2/sluzby/dhcp'
          },
          {
            id: 'oss2-b4-2',
            title: 'DNS server: Dopředné zóny, záznamy A, CNAME a PTR dotazy',
            hours: 2,
            type: 'laborator',
            description: 'Hierarchický systém doménových jmen, autoritativní servery, primární zóna, směrování záznamů a diagnostika přes nslookup.',
            practice: 'Vytvoření vlastní lokální doménové zóny firma.local a registrace záznamů pro server a síťové tiskárny.',
            route: '/specializovana/operacni-systemy-2/sluzby/dns'
          },
          {
            id: 'oss2-b4-3',
            title: 'Souborový server SMB: Sdílené složky, UNC cesty a práva sdílení',
            hours: 2,
            type: 'laborator',
            description: 'Protokol SMB (port 445), UNC formát \\\\server\\share, matice kombinace oprávnění sdílení vs. lokální NTFS práva.',
            practice: 'Vytvoření oddělených firemních složek (Vedení, Obchod, Veřejné) a mapování síťových disků pomocí net use.',
            route: '/specializovana/operacni-systemy-2/sluzby/smb'
          },
          {
            id: 'oss2-b4-4',
            title: 'Vzdálená správa: RDP a OpenSSH na Windows Serveru',
            hours: 2,
            type: 'laborator',
            description: 'Protokol vzdálené plochy RDP (port 3389), zabezpečení NLA, terminálové relace, instalace OpenSSH serveru pro správu v CLI.',
            practice: 'Vzdálené připojení k serveru bez fyzického přístupu přes RDP klienta a spuštění údržby přes SSH konzoli.',
            route: '/specializovana/operacni-systemy-2/sluzby/vzdalena-sprava'
          },
          {
            id: 'oss2-b4-5',
            title: 'Webový server IIS: Virtuální adresáře, porty a HTTPS certifikát',
            hours: 2,
            type: 'laborator',
            description: 'Internet Information Services (IIS), wwwroot, vazby (bindings) na porty 80 a 443, vygenerování a nasazení SSL certifikátu.',
            practice: 'Zprovoznění interního podnikového intranetu a ověření zabezpečeného šifrovaného přístupu přes HTTPS v prohlížeči.',
            route: '/specializovana/operacni-systemy-2/sluzby/iis'
          },
          {
            id: 'oss2-b4-6',
            title: 'Databázový server MS SQL Server Express: Instalace a zálohování',
            hours: 2,
            type: 'laborator',
            description: 'Instalace databázového enginu, služba MSSQLSERVER, síťový port 1433 a firewall, Windows Authentication, záloha do .bak.',
            practice: 'Instalace instance MS SQL Express, vytvoření cvičné databáze v SSMS a provedení automatické zálohy.',
            route: '/specializovana/operacni-systemy-2/sluzby/sql-server'
          }
        ]
      },
      {
        id: 'oss2-b5',
        order: 5,
        month: 'Červen',
        monthKey: 'cerven',
        weeks: '27.–33. týden',
        title: 'Active Directory, doménová správa a závěrečný projekt',
        hours: 14,
        theoryHours: 4,
        practiceHours: 10,
        description: 'Pracovní skupina vs. doména, instalace AD DS, řadič DC, uživatelé a skupiny, připojení klientů, GPO politiky a projekt.',
        rvpCompetence: 'Instaluje doménový řadič Active Directory, spravuje uživatele a organizační jednotky, aplikuje skupinové politiky GPO.',
        subtopics: [
          {
            id: 'oss2-b5-1',
            title: 'Úvod do domény: Rozdíl mezi pracovní skupinou a doménou Active Directory',
            hours: 2,
            type: 'teorie',
            description: 'Limity decentralizované pracovní skupiny (desítky různých hesel), centralizovaná databáze objektů AD DS, řadič domény (DC).',
            practice: 'Analýza podnikového schématu a návrh hierarchie domény pro středně velkou firmu.',
            route: '/specializovana/operacni-systemy-2/active-directory/uvod'
          },
          {
            id: 'oss2-b5-2',
            title: 'Instalace AD DS a povýšení serveru na řadič domény (DC)',
            hours: 2,
            type: 'laborator',
            description: 'Přidání role Active Directory Domain Services, vytvoření nového doménového lesa (forest), integrace se službou DNS.',
            practice: 'Praktické povýšení Windows Serveru na řadič domény skola.local a kontrola SRV záznamů v DNS.',
            route: '/specializovana/operacni-systemy-2/active-directory/povyšení'
          },
          {
            id: 'oss2-b5-3',
            title: 'Organizační jednotky (OU) a tvorba doménových uživatelských účtů',
            hours: 2,
            type: 'laborator',
            description: 'Konzole Active Directory – uživatelé a počítače (dsa.msc), stromová struktura oddělení (OU), tvorba účtů a zásady hesel.',
            practice: 'Vytvoření organizační struktury firmy (Vedení, Obchod, IT) a hromadný import uživatelů přes PowerShell.',
            route: '/specializovana/operacni-systemy-2/active-directory/ucty'
          },
          {
            id: 'oss2-b5-4',
            title: 'Doménové skupiny a efektivní řízení přístupových práv k datům',
            hours: 2,
            type: 'laborator',
            description: 'Typy skupin (Zabezpečení vs. Distribuce), srozumitelný model: Uživatel ➔ Člen skupiny ➔ Práva na sdílené složce.',
            practice: 'Přiřazení přístupů k projektovým složkám výhradně prostřednictvím doménových skupin zabezpečení.',
            route: '/specializovana/operacni-systemy-2/active-directory/skupiny'
          },
          {
            id: 'oss2-b5-5',
            title: 'Připojení klientské stanice Windows 11 do domény',
            hours: 2,
            type: 'laborator',
            description: 'Nezbytná podmínka správné DNS adresy na klientovi, proces připojení do domény, vytvoření doménového profilu uživatele.',
            practice: 'Připojení virtuálního klienta Windows 11 do domény skola.local a přihlášení doménovým účtem.',
            route: '/specializovana/operacni-systemy-2/active-directory/klient'
          },
          {
            id: 'oss2-b5-6',
            title: 'Skupinové politiky GPO: Centrální konfigurace a restrikce stanic',
            hours: 2,
            type: 'laborator',
            description: 'Group Policy Management (gpmc.msc), linkování politik na OU, zákaz USB disků, automatické namapování disku a tapeta.',
            practice: 'Vytvoření a vynucení bezpečnostní politiky zakazující spouštění neautorizovaných flash disků pro studenty.',
            route: '/specializovana/operacni-systemy-2/active-directory/gpo'
          },
          {
            id: 'oss2-b5-7',
            title: 'Závěrečný integrující projekt: Zprovoznění podnikové infrastruktury',
            hours: 2,
            type: 'projekt',
            description: 'Komplexní syntéza 2. ročníku: Server s DHCP + DNS + AD + klientská stanice Windows 11 s aplikovanou GPO a zálohou.',
            practice: 'Samostatné předvedení plně funkční podnikové sítě a obhajoba před vyučujícím.',
            route: '/specializovana/operacni-systemy-2/active-directory/projekt'
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
        description: 'Přechod na open-source: instalace Ubuntu Serveru, hierarchie FHS, POSIX oprávnění, roury, disky ext4, procesy a systemd.',
        rvpCompetence: 'Instaluje a bezpečně administruje Linuxový server přes terminál, spravuje soubory, práva, procesy a systémové démony.',
        subtopics: [
          {
            id: 'oss3-b1-1',
            title: 'Architektura Linuxu, distribuce a instalace Ubuntu Serveru',
            hours: 2,
            type: 'laborator',
            description: 'Rodiny distribucí (Debian, RedHat), rozdělení disku na ext4 a swap, zavaděč GRUB, instalace headless serveru.',
            practice: 'Instalace čistého Ubuntu Serveru ve VirtualBoxu a první přihlášení do textové konzole.',
            route: '/specializovana/operacni-systemy-3/linux-sprava/instalace'
          },
          {
            id: 'oss3-b1-2',
            title: 'Hierarchie souborového systému FHS a orientace v terminálu',
            hours: 2,
            type: 'laborator',
            description: 'Filesystem Hierarchy Standard: význam složek /etc, /var, /home, /bin, /dev, /tmp. Příkazy pwd, cd, ls -la, cp, mv, rm -rf.',
            practice: 'Praktická navigace a tvorba stromové struktury projektu výhradně z příkazové řádky.',
            route: '/specializovana/operacni-systemy-3/linux-sprava/souborovy-system'
          },
          {
            id: 'oss3-b1-3',
            title: 'Uživatelé, skupiny a POSIX oprávnění (chmod, chown, sudoers)',
            hours: 2,
            type: 'laborator',
            description: 'Model UGO (User, Group, Others), práva rwx v osmičkové soustavě (755, 644), změna vlastníka chown, bezpečnost přes sudo.',
            practice: 'Zabezpečení adresářů firmy: nastavení restriktivních práv pro skupinu vývojářů a konfigurace souboru /etc/sudoers.',
            route: '/specializovana/operacni-systemy-3/linux-sprava/prava'
          },
          {
            id: 'oss3-b1-4',
            title: 'Proudové filtry, roury a textové editory (cat, grep, nano, vim)',
            hours: 2,
            type: 'laborator',
            description: 'Standardní proudy stdin/stdout/stderr, přesměrování (> a >>), propojování rourou |, regulární výrazy a filtr grep.',
            practice: 'Vyhledávání chyb v systémovém konfiguračním souboru a rychlá editace v textovém editoru nano.',
            route: '/specializovana/operacni-systemy-3/linux-sprava/proudy-editory'
          },
          {
            id: 'oss3-b1-5',
            title: 'Správa disků v Linuxu: oddíly, formátování a připojování /etc/fstab',
            hours: 2,
            type: 'laborator',
            description: 'Nástroje fdisk a lsblk, tvorba souborového systému mkfs.ext4, manuální mount a automatické připojení přes /etc/fstab.',
            practice: 'Připojení druhého virtuálního pevného disku a konfigurace jeho permanentního připojení do složky /data.',
            route: '/specializovana/operacni-systemy-3/linux-sprava/disky'
          },
          {
            id: 'oss3-b1-6',
            title: 'Správa procesů a sledování vytížení (ps, top, htop, kill, nice)',
            hours: 2,
            type: 'laborator',
            description: 'Výpis procesů ps aux, interaktivní monitor htop, signály ukončení (SIGTERM 15, SIGKILL 9), změna priority procesu přes nice.',
            practice: 'Simulace zaseknutého skriptu na pozadí, jeho lokalizace a bezpečné ukončení příkazem kill.',
            route: '/specializovana/operacni-systemy-3/linux-sprava/procesy'
          },
          {
            id: 'oss3-b1-7',
            title: 'Správa software a balíčkovací systém APT (repozitáře a aktualizace)',
            hours: 2,
            type: 'laborator',
            description: 'Architektura balíčků .deb, repozitáře v /etc/apt/sources.list, příkazy apt update, apt upgrade, vyhledávání a závislosti.',
            practice: 'Instalace diagnostických balíčků a konfigurace automatických bezpečnostních záplat unattended-upgrades.',
            route: '/specializovana/operacni-systemy-3/linux-sprava/balicky'
          },
          {
            id: 'oss3-b1-8',
            title: 'Systémové služby (systemd) a analýza logů (journalctl)',
            hours: 2,
            type: 'laborator',
            description: 'Init systém systemd, řízení démonů přes systemctl (start, stop, enable, status), analýza žurnálu přes journalctl -u.',
            practice: 'Vytvoření vlastní systémové služby pro automatické spouštění administračního Python skriptu po startu serveru.',
            route: '/specializovana/operacni-systemy-3/linux-sprava/sluzby-logy'
          }
        ]
      },
      {
        id: 'oss3-b2',
        order: 2,
        month: 'Listopad – Prosinec',
        monthKey: 'listopad',
        weeks: '9.–16. týden',
        title: 'Linux: Sítě, serverové služby a Bash skriptování',
        hours: 16,
        theoryHours: 4,
        practiceHours: 12,
        description: 'Zabezpečená správa přes SSH, firewall UFW, web Apache s HTTPS, sdílení Samba s Windows, programování v Bashi a plánovač Cron.',
        rvpCompetence: 'Zprovozňuje síťové služby SSH, Apache a Samba, píše skripty v Bashi pro automatizaci a plánuje je v cronu.',
        subtopics: [
          {
            id: 'oss3-b2-1',
            title: 'Vzdálená správa přes SSH: Asymetrické klíče a zabezpečení serveru',
            hours: 2,
            type: 'laborator',
            description: 'Protokol SSH (port 22), generování klíčů ssh-keygen (Ed25519), konfigurace /etc/ssh/sshd_config a zákaz hesel pro root.',
            practice: 'Bezpečné přihlášení ze stanice Windows na Linuxový server bez zadávání hesla výhradně pomocí privátního klíče.',
            route: '/specializovana/operacni-systemy-3/linux-sluzby/ssh'
          },
          {
            id: 'oss3-b2-2',
            title: 'Síťová konfigurace v Linuxu a paketový firewall UFW',
            hours: 2,
            type: 'laborator',
            description: 'Příkazy ip a, ip route, konfigurace Netplan (/etc/netplan), správa jednoduchého firewallu UFW (ufw allow, enable, status).',
            practice: 'Zabezpečení serveru: povolení pouze SSH a webových portů a zablokování veškerého ostatního příchozího provozu.',
            route: '/specializovana/operacni-systemy-3/linux-sluzby/sit-firewall'
          },
          {
            id: 'oss3-b2-3',
            title: 'Webový server Apache: Konfigurace, virtuální hostitelé a oprávnění',
            hours: 2,
            type: 'laborator',
            description: 'Instalace webového serveru Apache2, kořenový adresář /var/www/html, vlastník www-data, tvorba VirtualHostů.',
            practice: 'Zprovoznění webové prezentace a otestování přístupu z klientského prohlížeče v lokální síti.',
            route: '/specializovana/operacni-systemy-3/linux-sluzby/apache'
          },
          {
            id: 'oss3-b2-4',
            title: 'Zabezpečení webu certifikátem HTTPS (Let\'s Encrypt a Certbot)',
            hours: 2,
            type: 'laborator',
            description: 'Proč je HTTP nebezpečné (přenos hesel v otevřeném textu), šifrování TLS/SSL, automatizace certifikátů přes nástroj Certbot.',
            practice: 'Konfigurace SSL modulu v Apache a nasazení certifikátu s vynuceným přesměrováním z portu 80 na 443.',
            route: '/specializovana/operacni-systemy-3/linux-sluzby/https'
          },
          {
            id: 'oss3-b2-5',
            title: 'Sdílení dat mezi Linuxem a Windows přes Sambu (smb.conf)',
            hours: 2,
            type: 'laborator',
            description: 'Implementace protokolu SMB na Linuxu, konfigurační soubor /etc/samba/smb.conf, uživatelé smbpasswd, přístupová práva.',
            practice: 'Zprovoznění síťového disku na Linuxu přístupného z Windows Průzkumníka přes adresu \\\\linux-ip\\sdileno.',
            route: '/specializovana/operacni-systemy-3/linux-sluzby/samba'
          },
          {
            id: 'oss3-b2-6',
            title: 'Programování v Bashi: Shebang, proměnné a argumenty ($1, $#)',
            hours: 2,
            type: 'laborator',
            description: 'Základ skriptu: #!/bin/bash, spustitelný příznak chmod +x, proměnné, čtení vstupu read, předávání argumentů z CLI.',
            practice: 'Napsání skriptu pro rychlé vytvoření nového uživatele v Linuxu včetně domovského adresáře a vygenerování hesla.',
            route: '/specializovana/operacni-systemy-3/linux-sluzby/bash-zaklady'
          },
          {
            id: 'oss3-b2-7',
            title: 'Pokročilý Bash: Podmínky if, cykly for a zálohovací skript s tarem',
            hours: 2,
            type: 'laborator',
            description: 'Podmínky test a [[ ]], porovnávání řetězců a čísel, cykly for a while, archivace dat utilitou tar s kompresí gzip.',
            practice: 'Vytvoření robustního zálohovacího skriptu, který zabalí webové složky, přidá datum a zkontroluje úspěšnost.',
            route: '/specializovana/operacni-systemy-3/linux-sluzby/bash-pokrocily'
          },
          {
            id: 'oss3-b2-8',
            title: 'Automatické plánování úloh v Linuxu (Cron a crontab -e)',
            hours: 2,
            type: 'laborator',
            description: 'Struktura démonu cron, syntaxe pěti hvězdiček (minuta hodina den měsíc den-v-týdnu), uživatelský vs. systémový crontab.',
            practice: 'Naplánování automatického spouštění zálohovacího Bash skriptu každou noc ve 2:00 ráno a rotace logů.',
            route: '/specializovana/operacni-systemy-3/linux-sluzby/cron'
          }
        ]
      },
      {
        id: 'oss3-b3',
        order: 3,
        month: 'Leden',
        monthKey: 'leden',
        weeks: '17.–20. týden',
        title: 'Verzovací systém Git a týmová spolupráce na GitHubu',
        hours: 8,
        theoryHours: 2,
        practiceHours: 6,
        description: 'Tři zóny Gitu, commitování, větve, řešení konfliktů, vzdálené repozitáře a spolupráce přes Pull Requesty.',
        rvpCompetence: 'Verzuje zdrojový kód a konfigurační skripty v Gitu, spravuje větve a spolupracuje na repozitáři na GitHubu.',
        subtopics: [
          {
            id: 'oss3-b3-1',
            title: 'Principy verzování: Tři zóny Gitu a první commit',
            hours: 2,
            type: 'kombinovane',
            description: 'Proč nepoužívat soubory verze_final_opravdu.txt. Zóny: Working Directory ➔ Staging Area (git add) ➔ Repository (git commit).',
            practice: 'Inicializace lokálního repozitáře git init, nastavení identity a provedení prvního commitu se smysluplnou zprávou.',
            route: '/specializovana/operacni-systemy-3/git/principy'
          },
          {
            id: 'oss3-b3-2',
            title: 'Běžný pracovní cyklus, historie a ignorování souborů (.gitignore)',
            hours: 2,
            type: 'laborator',
            description: 'Příkazy git status, git log --oneline, git diff, obnovení starší verze a ignorování dočasných souborů v .gitignore.',
            practice: 'Praktické sledování historie změn v kódu a správná konfigurace .gitignore pro vynechání hesel a velkých dat.',
            route: '/specializovana/operacni-systemy-3/git/cyklus'
          },
          {
            id: 'oss3-b3-3',
            title: 'Větvení (Branches), slučování (Merge) a řešení kolizí',
            hours: 2,
            type: 'laborator',
            description: 'Paralelní vývoj nových funkcí ve větvích, příkazy git branch, git checkout / switch, sloučení větví a řešení merge konfliktů.',
            practice: 'Simulace kolize v kódu: dva žáci upraví stejný řádek skriptu, manuálně vyřeší konflikt a úspěšně provedou merge.',
            route: '/specializovana/operacni-systemy-3/git/vetve'
          },
          {
            id: 'oss3-b3-4',
            title: 'Vzdálené repozitáře a týmový GitHub workflow (Push, Pull, PR)',
            hours: 2,
            type: 'laborator',
            description: 'Propojení lokálního repozitáře s GitHubem přes SSH klíč, příkazy git push a git pull, tvorba Pull Requestu a Code Review.',
            practice: 'Týmová spolupráce ve dvojicích: naklonování cizího repozitáře, vytvoření větve, odeslání Pull Requestu a jeho schválení.',
            route: '/specializovana/operacni-systemy-3/git/github'
          }
        ]
      },
      {
        id: 'oss3-b4',
        order: 4,
        month: 'Únor – Březen',
        monthKey: 'unor',
        weeks: '21.–26. týden',
        title: 'Kybernetická bezpečnost, audit zranitelností a obrana',
        hours: 12,
        theoryHours: 3,
        practiceHours: 9,
        description: 'Právní a etický rámec IT, průzkum sítě Nmapem, analýza paketů ve Wiresharku, audit hesel a praktické závěrečné CTF.',
        rvpCompetence: 'Provádí bezpečnostní audit sítě Nmapem, analyzuje síťový provoz ve Wiresharku a navrhuje protiopatření proti útokům.',
        subtopics: [
          {
            id: 'oss3-b4-1',
            title: 'Právní a etický rámec: Trestní zákoník, NIS 2 a Cyber Kill Chain',
            hours: 2,
            type: 'teorie',
            description: 'Paragrafy § 230–232 TrZ (neoprávněný přístup k počítačovému systému), směrnice NIS 2, fáze útoku podle Cyber Kill Chain.',
            practice: 'Rozbor reálných soudních kauz a případových studií kybernetických útoků v ČR.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/pravo'
          },
          {
            id: 'oss3-b4-2',
            title: 'Průzkum sítě a mapování zranitelností (Nmap a CVE/CVSS databáze)',
            hours: 2,
            type: 'laborator',
            description: 'Skenování otevřených portů nástrojem Nmap (-sS, -sV, -O), detekce zranitelných verzí služeb a vyhledávání v databázi CVE.',
            practice: 'Audit přiděleného cvičného serveru: nalezení otevřených portů a identifikace zastaralých služeb.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/nmap'
          },
          {
            id: 'oss3-b4-3',
            title: 'Analýza síťového provozu ve Wiresharku (Odposlech vs. Šifrování)',
            hours: 2,
            type: 'laborator',
            description: 'Odchytávání paketů ve Wiresharku, analýza TCP 3-way handshake, demonstrace úniku hesla v nešifrovaném protokolu (HTTP, FTP, Telnet).',
            practice: 'Odchyt nešifrovaného přihlašovacího požadavku a srovnání se zašifrovanou komunikací přes HTTPS/SSH.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/wireshark'
          },
          {
            id: 'oss3-b4-4',
            title: 'Útoky na Windows infrastrukturu a Active Directory (Pass-the-Hash)',
            hours: 2,
            type: 'teorie',
            description: 'Jak útočník postupuje po prolomení stanice: laterální pohyb po síti, extrakce hashů hesel z paměti LSASS a útok Pass-the-Hash.',
            practice: 'Ukázka obranných mechanismů Windows 11: Credential Guard a omezení lokálních administrátorských účtů.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/ad-utoky'
          },
          {
            id: 'oss3-b4-5',
            title: 'Audit odolnosti hesel: Slovníkové útoky a lámání hashů',
            hours: 2,
            type: 'laborator',
            description: 'Kryptografické hashovací funkce (MD5, SHA, NTLM), princip slovníkového útoku, nástroje John the Ripper a Hashcat.',
            practice: 'Audit slabých hesel ve cvičném seznamu hashů pomocí slovníku RockYou a demonstrace významu délky hesla.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/hesla'
          },
          {
            id: 'oss3-b4-6',
            title: 'Závěrečné bezpečnostní cvičení: CTF na kompromitovaném Linuxu',
            hours: 2,
            type: 'projekt',
            description: 'Vyšetřovací scénář na reálném cvičném Linuxovém stroji: nalezení zadních vrátek (backdooru), audit logů a oprava firewallu.',
            practice: 'Samostatné splnění úkolů v cvičném zranitelném kontejneru a získání bezpečnostních FLAGů.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/ctf'
          }
        ]
      },
      {
        id: 'oss3-b5',
        order: 5,
        month: 'Duben – Květen',
        monthKey: 'duben',
        weeks: '27.–31. týden',
        title: 'Týmový infrastrukturní projekt a agilní řízení (Kanban)',
        hours: 10,
        theoryHours: 2,
        practiceHours: 8,
        description: 'Agilní spolupráce ve 3–4členných týmech: zadání hybridní podnikové infrastruktury (Linux + Windows + Git), realizace a obhajoby.',
        rvpCompetence: 'Pracuje v týmu podle agilních metodik, navrhne a zprovozní komplexní smíšenou infrastrukturu a obhájí ji.',
        subtopics: [
          {
            id: 'oss3-b5-1',
            title: 'Agilní organizace týmové práce: Metodika Kanban a GitHub Projects',
            hours: 2,
            type: 'kombinovane',
            description: 'Principy agilního řízení, backlog, sloupce To Do / In Progress / Done, rozdělení rolí v týmu (správce Linuxu, správce AD, tester).',
            practice: 'Založení týmové nástěnky na GitHub Projects / Trellu a rozpad komplexního zadání na konkrétní tikety.',
            route: '/specializovana/operacni-systemy-3/tymova-spoluprace/kanban'
          },
          {
            id: 'oss3-b5-2',
            title: 'Zadání projektu: Stavba hybridní firemní sítě (Linux + Windows + Git)',
            hours: 2,
            type: 'projekt',
            description: 'Komplexní zadání: Windows Server (AD DS + DNS) pro klientské stanice, Linuxový server (Apache + SSH + UFW) a Git repozitář.',
            practice: 'Společný návrh IP adresního plánu, firewallových politik a harmonogramu realizace v týmu.',
            route: '/specializovana/operacni-systemy-3/tymova-spoluprace/zadani'
          },
          {
            id: 'oss3-b5-3',
            title: 'Realizace projektu I: Konfigurace síťových služeb a serverů v týmu',
            hours: 2,
            type: 'projekt',
            description: 'Praktické zprovozňování serverových rolí, řešení síťového propojení a verzování administračních skriptů v týmovém repozitáři.',
            practice: 'Týmová konfigurace serverů ve VirtualBoxu a synchronizace konfiguračních dávek přes Git.',
            route: '/specializovana/operacni-systemy-3/tymova-spoluprace/realizace-1'
          },
          {
            id: 'oss3-b5-4',
            title: 'Realizace projektu II: Zabezpečení, zálohování a testování odolnosti',
            hours: 2,
            type: 'projekt',
            description: 'Zabezpečení celé infrastruktury: nastavení firewallů, implementace automatických záloh v cronu a audit zranitelností Nmapem.',
            practice: 'Křížové testování: tým A provede bezpečnostní audit infrastruktury týmu B a předá report nalezených chyb.',
            route: '/specializovana/operacni-systemy-3/tymova-spoluprace/realizace-2'
          },
          {
            id: 'oss3-b5-5',
            title: 'Prezentace a technická obhajoba projektů před třídou',
            hours: 2,
            type: 'projekt',
            description: 'Předvedení živého funkčního prostředí, obhajoba architektonických rozhodnutí a odpovědi na technické otázky vyučujícího.',
            practice: 'Prezentace týmů, hodnocení funkčnosti a technické dokumentace.',
            route: '/specializovana/operacni-systemy-3/tymova-spoluprace/obhajoba'
          }
        ]
      },
      {
        id: 'oss3-b6',
        order: 6,
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
            id: 'oss3-b6-1',
            title: 'Syntéza tříleté výuky: Komparace Windows a Linuxové administrace',
            hours: 2,
            type: 'kombinovane',
            description: 'Srovnávací přehled: Registry vs. /etc, Služby vs. systemd, PowerShell vs. Bash, NTFS vs. ext4, Active Directory vs. LDAP.',
            practice: 'Řešení typových maturitních a technických úloh ze správy operačních systémů.',
            route: '/specializovana/operacni-systemy-3'
          },
          {
            id: 'oss3-b6-2',
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
