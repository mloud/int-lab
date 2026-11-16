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
      title: 'Úvod do OS a HW pro OS',
      hours: 8,
      theoryHours: 4,
      practiceHours: 4,
      description: 'Von Neumannovo schéma, procesor a paměť RAM, vrstvy operačního systému, evoluce OS a základy virtualizace.',
      rvpCompetence: 'Popíše princip Von Neumannovy architektury, chápe instrukční cyklus CPU, hierarchii pamětí a roli operačního systému.',
      subtopics: [
        {
          id: 'oss1-b1-1',
          title: 'Instalace OS Windows 11 do notebooku a simulátoru',
          hours: 2,
          type: 'laborator',
          description: 'Příprava média, průchod instalací a základní nastavení klientské stanice.',
          practice: 'Instalace Windows 11 v interaktivním simulátoru IntLab a v prostředí VirtualBox.',
          route: '/specializovana/operacni-systemy-1'
        },
        {
          id: 'oss1-b1-2',
          title: 'Základy hardwaru počítače (Von Neumannovo schéma)',
          hours: 2,
          type: 'teorie',
          description: 'Struktura počítače podle Johna von Neumanna: ALU, řadič, společná paměť pro program i data, systémové sběrnice a instrukční cyklus.',
          practice: 'Interaktivní schéma přenosu dat po sběrnici a simulace toku instrukcí.',
          route: '/specializovana/operacni-systemy-1/hardware/von-neumann'
        },
        {
          id: 'oss1-b1-3',
          title: 'Úvod do OS – vrstvený model a funkce jádra',
          hours: 1,
          type: 'teorie',
          description: 'Vrstvy počítače (Hardware ➔ Jádro OS ➔ Uživatelské rozhraní ➔ Aplikace), oddělení aplikací od jádra a systémová volání.',
          practice: 'Prozkoumání vrstveného modelu v IntLabu.',
          route: '/specializovana/operacni-systemy-1/uvod'
        },
        {
          id: 'oss1-b1-4',
          title: 'Evoluce operačních systémů',
          hours: 1,
          type: 'teorie',
          description: 'Vývojové větve moderních OS (Unix, DOS, Windows NT, Linux) a licenční modely.',
          practice: 'Časová osa evoluce operačních systémů.',
          route: '/specializovana/operacni-systemy-1/vyvoj'
        },
        {
          id: 'oss1-b1-5',
          title: 'Architektura OS (jádra a ovladače)',
          hours: 1,
          type: 'teorie',
          description: 'Monolitické vs. hybridní jádro, mikrojádro a role ovladačů.',
          practice: 'Porovnání architektur v interaktivním diagramu.',
          route: '/specializovana/operacni-systemy-1/architektura'
        },
        {
          id: 'oss1-b1-6',
          title: 'Virtualizace v praxi',
          hours: 1,
          type: 'laborator',
          description: 'Základy virtualizace, hypervizor typu 2, konfigurace virtuálního stroje.',
          practice: 'Zprovoznění a konfigurace virtuálního stroje ve VirtualBoxu.',
          route: '/specializovana/operacni-systemy-1/virtualizace'
        }
      ]
    },
    {
      id: 'oss1-b2',
      order: 2,
      month: 'Říjen',
      monthKey: 'rijen',
      weeks: '5.–9. týden',
      title: 'Souborový systém a disky',
      hours: 10,
      theoryHours: 4,
      practiceHours: 6,
      description: 'Paměťová média HDD a SSD, dělení disků a oddíly GPT/MBR, alokace klastrů ve FAT a NTFS, fragmentace a start systému (Boot).',
      rvpCompetence: 'Rozděluje disky na oddíly, formátuje svazky, vysvětlí alokaci v souborových systémech a popíše fáze bootovacího procesu.',
      subtopics: [
        {
          id: 'oss1-b2-1',
          title: 'Úvod do architektury souborového systému',
          hours: 1,
          type: 'teorie',
          description: 'Role souborového systému v OS, sjednocený vrstvený model, sektor disku a logická alokační jednotka.',
          practice: 'Analýza struktury svazku v simulátoru IntLab.',
          route: '/specializovana/operacni-systemy-1/souborove-systemy'
        },
        {
          id: 'oss1-b2-2',
          title: 'Paměťová média (HDD vs. SSD)',
          hours: 1,
          type: 'teorie',
          description: 'Magnetická HDD vs. polovodičová SSD, princip zápisu, NAND buňky, přístupová doba a příkaz TRIM.',
          practice: 'Měření rychlosti čtení/zápisu v CrystalDiskMark a rozbor S.M.A.R.T. dat.',
          route: '/specializovana/operacni-systemy-1/souborove-systemy/media'
        },
        {
          id: 'oss1-b2-3',
          title: 'Dělení disku (fyzické a logické oddíly)',
          hours: 2,
          type: 'kombinovane',
          description: 'Tabulky oddílů MBR vs. moderní GPT s redundancí, systémový oddíl EFI, zmenšování a zvětšování svazků.',
          practice: 'Správa diskových oddílů v konzoli diskmgmt.msc a utilitě diskpart.',
          route: '/specializovana/operacni-systemy-1/souborove-systemy/struktura'
        },
        {
          id: 'oss1-b2-4',
          title: 'Systém souborů – FAT a fragmentace',
          hours: 2,
          type: 'teorie',
          description: 'Princip alokace ve FAT, řetězení klastrů, vnitřní a vnější fragmentace a defragmentace.',
          practice: 'Interaktivní trenažér alokace klastrů ve FAT tabulce.',
          route: '/specializovana/operacni-systemy-1/souborove-systemy/alokace'
        },
        {
          id: 'oss1-b2-5',
          title: 'Systém souborů – praktické úlohy a NTFS',
          hours: 2,
          type: 'laborator',
          description: 'Vlastnosti souborového systému NTFS: žurnálování, bezpečnost, komprese a správa svazků.',
          practice: 'Praktické formátování svazků, kontrola chyb přes chkdsk a defragmentace.',
          route: '/specializovana/operacni-systemy-1/souborove-systemy/pokrocile'
        },
        {
          id: 'oss1-b2-6',
          title: 'Start systému (Boot proces)',
          hours: 2,
          type: 'kombinovane',
          description: 'Fáze startu: POST test ➔ firmware UEFI ➔ tabulka oddílů GPT ➔ zavaděč OS (Windows Boot Manager / winload.efi) ➔ předání jádru.',
          practice: 'Konfigurace bootovací priority v UEFI a rozbor bootloaderu nástrojem bcdedit.',
          route: '/specializovana/operacni-systemy-1/boot'
        }
      ]
    },
    {
      id: 'oss1-b3',
      order: 3,
      month: 'Listopad – Prosinec',
      monthKey: 'listopad',
      weeks: '10.–12. týden',
      title: 'Procesy a paměť',
      hours: 6,
      theoryHours: 3,
      practiceHours: 3,
      description: 'Program na disku vs. proces v RAM, identifikátor PID, multitasking a střídání procesů, stavy životního cyklu, vlákna a virtuální paměť.',
      rvpCompetence: 'Vysvětlí rozdíl mezi programem a procesem, analyzuje běžící procesy ve Správci úloh a popíše princip virtuální paměti.',
      subtopics: [
        {
          id: 'oss1-b3-1',
          title: 'Úvod a vznik procesu',
          hours: 2,
          type: 'kombinovane',
          description: 'Program na disku vs. proces v RAM, přidělení PID a PPID, paměťová struktura procesu a Správce úloh.',
          practice: 'Badatelská práce se Správcem úloh a nástrojem tasklist v CLI.',
          route: '/specializovana/operacni-systemy-1/procesy/uvod'
        },
        {
          id: 'oss1-b3-2',
          title: 'Střídání procesů (Multitasking)',
          hours: 1,
          type: 'teorie',
          description: 'Časové sdílení procesoru (time-sharing), časová kvanta, iluze současného běhu a přepnutí kontextu.',
          practice: 'Interaktivní simulátor střídání procesů a přepnutí kontextu na CPU.',
          route: '/specializovana/operacni-systemy-1/procesy/stridani'
        },
        {
          id: 'oss1-b3-3',
          title: 'Životní cyklus a stavy procesů',
          hours: 1,
          type: 'teorie',
          description: 'Stavy procesu: Běžící (Running), Připravený (Ready), Blokovaný (Waiting/Blocked při čekání na disk či síť).',
          practice: 'Trenažér stavového diagramu procesů v IntLabu.',
          route: '/specializovana/operacni-systemy-1/procesy/stavy'
        },
        {
          id: 'oss1-b3-4',
          title: 'Vlákna (Threads)',
          hours: 1,
          type: 'kombinovane',
          description: 'Rozdíl mezi procesem a vláknem, sdílená paměťová oblast vláken, vícejádrová CPU a plynulost odezvy.',
          practice: 'Porovnání jednovláknové a vícevláknové aplikace v simulátoru.',
          route: '/specializovana/operacni-systemy-1/procesy/vlakna'
        },
        {
          id: 'oss1-b3-5',
          title: 'Virtuální paměť a stránkování',
          hours: 1,
          type: 'teorie',
          description: 'Princip virtuálního adresního prostoru, stránkování, swap/pagefile.sys a izolace aplikací proti vzájemnému přepsání.',
          practice: 'Interaktivní simulátor stránkování paměti RAM a swapu na disku.',
          route: '/specializovana/operacni-systemy-1/procesy/vlakna'
        }
      ]
    },
    {
      id: 'oss1-b4',
      order: 4,
      month: 'Leden',
      monthKey: 'leden',
      weeks: '13.–14. týden',
      title: 'Grafické rozhraní klientského OS (GUI)',
      hours: 4,
      theoryHours: 1,
      practiceHours: 3,
      description: 'Architektura moderního desktopu, proces explorer.exe a správce oken DWM, hierarchie disku C:, uživatelské profily a atributy souborů.',
      rvpCompetence: 'Orientuje se v systémové struktuře disku C:, spravuje systémové složky a profily a řeší zamrznutí grafického shellu.',
      subtopics: [
        {
          id: 'oss1-b4-1',
          title: 'Architektura GUI a proces Explorer',
          hours: 1,
          type: 'kombinovane',
          description: 'Desktop Window Manager (dwm.exe), grafický shell explorer.exe, plocha, hlavní panel a restart havarované plochy.',
          practice: 'Restart explorer.exe ze Správce úloh a příkazového řádku.',
          route: '/specializovana/operacni-systemy-1/gui'
        },
        {
          id: 'oss1-b4-2',
          title: 'Hierarchie disku C: a systémové složky',
          hours: 1,
          type: 'laborator',
          description: 'Složky Windows, System32, Program Files vs. Program Files (x86), profily v C:\\Users a skrytá data v AppData.',
          practice: 'Analýza struktury disku a odkrytí skrytých a systémových složek.',
          route: '/specializovana/operacni-systemy-1/gui'
        },
        {
          id: 'oss1-b4-3',
          title: 'Práce se soubory, atributy a konfigurace',
          hours: 2,
          type: 'laborator',
          description: 'Zástupci (.lnk) vs. skutečné soubory, souborové atributy R, H, S, A, příkaz attrib a konfigurace v moderním Nastavení vs. Ovládacích panelech.',
          practice: 'Praktická manipulace se souborovými atributy v GUI i v terminálu.',
          route: '/specializovana/operacni-systemy-1/gui'
        }
      ]
    },
    {
      id: 'oss1-b5',
      order: 5,
      month: 'Únor',
      monthKey: 'unor',
      weeks: '15.–17. týden',
      title: 'Příkazová řádka a dávkové soubory',
      hours: 6,
      theoryHours: 2,
      practiceHours: 4,
      description: 'Navigace a orientace v CLI, správa souborů a složek, roury a přesměrování vstupů/výstupů a základy dávkových skriptů (.bat).',
      rvpCompetence: 'Ovládá základní příkazy textového rozhraní OS a sestavuje jednoduché dávkové skripty pro automatizované operace.',
      subtopics: [
        {
          id: 'oss1-b5-1',
          title: 'Orientace v systému a navigace v CLI',
          hours: 2,
          type: 'laborator',
          description: 'Spuštění CLI jako běžný uživatel vs. Správce, přepínání diskových jednotek, dir, cd, relativní a absolutní cesty, doplňování klávesou Tab.',
          practice: 'Rychlá navigace adresářovým stromem a zjištění systémových informací.',
          route: '/specializovana/operacni-systemy-1/prikazova-radka'
        },
        {
          id: 'oss1-b5-2',
          title: 'Správa souborů a složek v CLI',
          hours: 2,
          type: 'laborator',
          description: 'Tvorba a mazání složek (mkdir, rmdir), manipulace se soubory (copy, move, del), zástupné znaky * a ?.',
          practice: 'Rychlé sestavení adresářové struktury projektu a hromadné kopírování souborů v terminálu.',
          route: '/specializovana/operacni-systemy-1/prikazova-radka'
        },
        {
          id: 'oss1-b5-3',
          title: 'Roury, přesměrování a filtry v dávkových souborech',
          hours: 2,
          type: 'laborator',
          description: 'Přesměrování výstupu do souboru (> a >>), proudové předávání přes rouru (|), vyhledávací filtr findstr a základní stavba .bat skriptu.',
          practice: 'Vytvoření údržbového skriptu, který vyexportuje systémové parametry a vyfiltruje běžící úlohy.',
          route: '/specializovana/operacni-systemy-1/prikazova-radka'
        }
      ]
    },
    {
      id: 'oss1-b6',
      order: 6,
      month: 'Březen',
      monthKey: 'brezen',
      weeks: '18.–21. týden',
      title: 'Správa uživatelů a oprávnění',
      hours: 8,
      theoryHours: 2,
      practiceHours: 6,
      description: 'Lokální účty a skupiny, bezpečnost hesel, mechanismus UAC, přístupová práva NTFS, dědičnost a práce s nástrojem icacls.',
      rvpCompetence: 'Vytváří a konfiguruje uživatelské účty a skupiny, nastavuje přístupová práva NTFS a vysvětlí princip dědičnosti.',
      subtopics: [
        {
          id: 'oss1-b6-1',
          title: 'Uživatelské účty a autentizace',
          hours: 2,
          type: 'laborator',
          description: 'Lokální účet vs. účet Microsoft, účet Standard vs. Správce, princip nejmenších nutných práv (PoLP), správa v lusrmgr.msc a net user.',
          practice: 'Založení servisního a uživatelského účtu na stanici a ověření jejich přihlašovacích možností.',
          route: '/specializovana/operacni-systemy-1/uzivatele'
        },
        {
          id: 'oss1-b6-2',
          title: 'Zabezpečení účtů, hesla a UAC',
          hours: 2,
          type: 'teorie',
          description: 'Politika silných hesel, zámek obrazovky Win+L, PIN a TPM čip, bezpečnostní tokeny a mechanismus Řízení uživatelských účtů (UAC).',
          practice: 'Ověření reakcí dialogu UAC při administrátorských zásazích.',
          route: '/specializovana/operacni-systemy-1/uzivatele'
        },
        {
          id: 'oss1-b6-3',
          title: 'Uživatelské skupiny a role',
          hours: 2,
          type: 'laborator',
          description: 'Význam a efektivita skupin, rozdíl mezi Administrators a Users, vestavěné role a správa přes net localgroup.',
          practice: 'Vytvoření pracovní skupiny v systému a hromadné přiřazení uživatelů.',
          route: '/specializovana/operacni-systemy-1/uzivatele'
        },
        {
          id: 'oss1-b6-4',
          title: 'Práva k souborům a složkám (NTFS)',
          hours: 2,
          type: 'laborator',
          description: 'Oprávnění NTFS (Čtení, Zápis, Změna, Úplné řízení), karta Zabezpečení, dědičnost práv, priorita zákazu (Deny) a utilita icacls.',
          practice: 'Nastavení složek se sdílenými výukovými materiály s oddělenými právy učitele a žáků.',
          route: '/specializovana/operacni-systemy-1/uzivatele'
        }
      ]
    },
    {
      id: 'oss1-b7',
      order: 7,
      month: 'Duben',
      monthKey: 'duben',
      weeks: '22.–23. týden',
      title: 'Správa software',
      hours: 4,
      theoryHours: 1,
      practiceHours: 3,
      description: 'Životní cyklus programů v OS, umístění na disku, instalátory EXE a balíčky MSI, tiché instalace a balíčkovací správce Winget.',
      rvpCompetence: 'Instaluje a odinstalovává aplikace, rozlišuje typy instalačních balíčků a spravuje software pomocí balíčkovače Winget.',
      subtopics: [
        {
          id: 'oss1-b7-1',
          title: 'Životní cyklus software a instalátory',
          hours: 2,
          type: 'kombinovane',
          description: 'Životní cyklus aplikace (stažení, instalace, běh, aktualizace, odinstalace), EXE instalátory vs. balíčky MSI, tichá instalace bez dialogů.',
          practice: 'Instalace a čistá odinstalace programů, sledování zbytků v registrech a složce AppData.',
          route: '/specializovana/operacni-systemy-1/software'
        },
        {
          id: 'oss1-b7-2',
          title: 'Správa aplikací a balíčkovač Winget',
          hours: 2,
          type: 'laborator',
          description: 'Moderní správa software z příkazového řádku: Windows Package Manager (winget search, install, upgrade, uninstall).',
          practice: 'Dávková instalace sady vývojářských a kancelářských nástrojů jedním příkazem v CLI.',
          route: '/specializovana/operacni-systemy-1/software'
        }
      ]
    },
    {
      id: 'oss1-b8',
      order: 8,
      month: 'Květen',
      monthKey: 'kveten',
      weeks: '24.–25. týden',
      title: 'Správa zařízení a Plánovač úloh',
      hours: 4,
      theoryHours: 1,
      practiceHours: 3,
      description: 'Komunikace jádra OS s hardwarem, Správce zařízení, instalace a diagnostika ovladačů, automatizace údržby v Plánovači úloh.',
      rvpCompetence: 'Diagnostikuje připojená zařízení ve Správci zařízení, spravuje ovladače a nastavuje automaticky plánované úlohy.',
      subtopics: [
        {
          id: 'oss1-b8-1',
          title: 'Správa zařízení a ovladače (Drivers)',
          hours: 2,
          type: 'laborator',
          description: 'Konzole Správce zařízení (devmgmt.msc), privilegovaný režim jádra pro ovladače, technologie Plug and Play, digitální podpis WHQL a nástroj pnputil.',
          practice: 'Diagnostika chybějícího ovladače podle hardwarového ID a jeho instalace z .inf souboru.',
          route: '/specializovana/operacni-systemy-1/zarizeni'
        },
        {
          id: 'oss1-b8-2',
          title: 'Plánovač úloh a automatický provoz',
          hours: 2,
          type: 'laborator',
          description: 'Konzole taskschd.msc, architektura úloh: spouštěče (triggery – čas, událost, přihlášení), akce (spuštění údržbového skriptu) a automatický běh.',
          practice: 'Vytvoření plánované úlohy pro automatickou týdenní údržbu a zálohování souborů.',
          route: '/specializovana/operacni-systemy-1/planovac'
        }
      ]
    },
    {
      id: 'oss1-b9',
      order: 9,
      month: 'Květen',
      monthKey: 'kveten',
      weeks: '26.–29. týden',
      title: 'Síťová konfigurace a lokální sítě (LAN)',
      hours: 8,
      theoryHours: 2,
      practiceHours: 6,
      description: 'Síťová rozhraní, MAC vs. IP adresa, DHCP a DNS, diagnostický žebříček konektivity (ping, tracert), síťové profily Windows a konfigurace SOHO Wi-Fi routeru.',
      rvpCompetence: 'Nakonfiguruje síťový adaptér v OS, provede diagnostiku spojení v terminálu a nastaví základní parametry lokální sítě a Wi-Fi routeru.',
      subtopics: [
        {
          id: 'oss1-b9-1',
          title: 'Síťové adaptéry, MAC vs. IP a ipconfig',
          hours: 2,
          type: 'kombinovane',
          description: 'Fyzická adresa MAC vs. logická IP adresa, síťová maska a výchozí brána, dynamické přidělování DHCP vs. statická IP, příkaz ipconfig /all.',
          practice: 'Zjištění síťových parametrů stanice v GUI (ncpa.cpl) i přes příkaz ipconfig a test uvolnění/obnovení adresy.',
          route: '/specializovana/operacni-systemy-1/site'
        },
        {
          id: 'oss1-b9-2',
          title: 'Diagnostika spojení a cesta paketu (Ping & Tracert)',
          hours: 2,
          type: 'laborator',
          description: 'Diagnostický žebříček krok za krokem: loopback (127.0.0.1) ➔ vlastní adaptér ➔ výchozí brána ➔ veřejná IP ➔ doménové jméno (DNS test), trasování cesty paketu nástrojem tracert.',
          practice: 'Systematická diagnostika simulovaných výpadků sítě na laboratorních stanicích.',
          route: '/specializovana/operacni-systemy-1/site'
        },
        {
          id: 'oss1-b9-3',
          title: 'Profily sítě Windows, Wi-Fi a sdílení v LAN',
          hours: 2,
          type: 'laborator',
          description: 'Profily sítě (Veřejná vs. Privátní síť), chování brány Windows Firewall, sdílení složek a tiskáren, bezdrátové sítě Wi-Fi standardy WPA2/WPA3.',
          practice: 'Zprovoznění sdílené složky v lokální síti a otestování přístupu přes UNC cestu.',
          route: '/specializovana/operacni-systemy-1/site'
        },
        {
          id: 'oss1-b9-4',
          title: 'Praktické úlohy – konfigurace SOHO Wi-Fi routeru',
          hours: 2,
          type: 'laborator',
          description: 'Příprava domácího routeru, webová administrace, rozhraní WAN vs. LAN, rozsah DHCP serveru, zabezpečení Wi-Fi a Guest síť.',
          practice: 'Kompletní konfigurace bezdrátového přístupového bodu a otestování konektivity klientů.',
          route: '/specializovana/operacni-systemy-1/site'
        }
      ]
    },
    {
      id: 'oss1-b10',
      order: 10,
      month: 'Červen',
      monthKey: 'cerven',
      weeks: '30.–33. týden',
      title: 'Závěrečný projekt a hodnocení',
      hours: 8,
      theoryHours: 0,
      practiceHours: 8,
      description: 'Komplexní praktická aplikace dovedností správce klientské stanice: diskové oddíly, uživatelé a práva, síť a automatizace údržby, diagnostika a obhajoba řešení.',
      rvpCompetence: 'Samostatně zprovozní a zabezpečí klientský počítač podle specifikovaného zadání, diagnostikuje závady a obhájí své technické řešení.',
      subtopics: [
        {
          id: 'oss1-b10-1',
          title: 'Závěrečný praktický projekt – konfigurace stanice',
          hours: 2,
          type: 'projekt',
          description: 'Příprava diskových oddílů, čistá instalace stanice, založení uživatelských účtů a nastavení oprávnění NTFS.',
          practice: 'Samostatná praktická realizace zadané konfigurace na laboratorním počítači.',
          route: '/specializovana/operacni-systemy-1'
        },
        {
          id: 'oss1-b10-2',
          title: 'Závěrečný praktický projekt – síť a automatizace',
          hours: 2,
          type: 'projekt',
          description: 'Nastavení síťového rozhraní, hromadná instalace programů přes Winget a vytvoření dávkového údržbového skriptu v Plánovači úloh.',
          practice: 'Automatizace provozu a otestování síťového sdílení v učebně.',
          route: '/specializovana/operacni-systemy-1'
        },
        {
          id: 'oss1-b10-3',
          title: 'Závěrečný praktický projekt – ladění a testování',
          hours: 2,
          type: 'laborator',
          description: 'Systematická diagnostika závad, kontrola funkčnosti stanice a odstranění simulovaných chyb správce.',
          practice: 'Vyhledání a oprava uměle nasazených konfigurací v systému.',
          route: '/specializovana/operacni-systemy-1'
        },
        {
          id: 'oss1-b10-4',
          title: 'Obhajoba projektu a hodnocení ročníku',
          hours: 2,
          type: 'kombinovane',
          description: 'Prezentace zprovozněného počítače, demonstrace funkčnosti zadaných parametrů, zhodnocení práce a uzavření klasifikace.',
          practice: 'Technická obhajoba před vyučujícím a rekapitulace před postupem do OSS 2.',
          route: '/specializovana/operacni-systemy-1'
        }
      ]
    }
  ]
};
