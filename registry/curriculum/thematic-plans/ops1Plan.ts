import { ThematicPlan } from './thematicPlanTypes';

export const OPS1_THEMATIC_PLAN: ThematicPlan = {
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
  };
