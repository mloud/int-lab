import type { OutlineGroup } from './outlineTypes';

const SUBJECT = 'Operační systémy 3';
const BASE = '/specializovana/operacni-systemy-3';

/** Linux – Instalace a základní správa (~16 h) */
export const OSS3_LINUX_SPRAVA: OutlineGroup = {
  chapterId: 'os3-linux',
  chapterTitle: 'Linux: Instalace a správa',
  chapterDescription: 'Základní řemeslo administrátora Linuxu: instalace systému, dělení disku, FHS strom, terminál, práva UGO, balíčky a systemd.',
  chapterTag: 'lnx',
  chapterPath: `${BASE}/linux`,
  subjectTitle: SUBJECT,
  grade: 3,
  gradeLabel: '3. Ročník',
  thematicBlock: 'Linux – Instalace a správa',
  icon: 'Terminal',
  gradient: 'from-slate-700 to-slate-900',
  items: [
    {
      slug: 'instalace',
      tag: 'LX1',
      title: 'Instalace Linuxu, disky ext4/swap a GRUB',
      hours: '2 h',
      subtitle: 'Volba distribuce, rozdělení disku a bootloader Linuxu.',
      intro: 'Linux začíná rozdělením disku a instalací. Ukážeme si rozdíl mezi distribucemi, vytvoříme kořenový oddíl ext4 a odkládací swap a pochopíme, jak zavaděč GRUB startuje systém.',
      topics: [
        'Výběr distribuce pro servery a desktop (Ubuntu Server, Debian)',
        'Rozdělení disku pro Linux: kořenový oddíl (/) se souborovým systémem ext4 a odkládací oddíl (swap)',
        'Zavaděč systému GRUB (Grand Unified Bootloader), soubor /etc/default/grub a konfigurace dual-bootu',
        'Instalace Ubuntu Serveru do virtuálního stroje VirtualBox bez grafického rozhraní'
      ],
      practice: [
        'Simulace: Rozdělení disku – kalkulace velikosti kořenového a swap oddílu pro server',
        'Praxe v OS: Vlastnoruční instalace Ubuntu Serveru ve VirtualBoxu a první přihlášení'
      ],
      builds: 'Dělení disků (OSS 1 – FS3), Start systému Boot (OSS 1).'
    },
    {
      slug: 'terminal',
      tag: 'LX2',
      title: 'Terminál a souborový strom FHS',
      hours: '2 h',
      subtitle: 'Pohyb po jednotném stromu adresářů a práce se soubory v příkazové řádce.',
      intro: 'V Linuxu neexistují písmena disků C: nebo D: – celý systém tvoří jeden strom s kořenem „/“. Naučíme se v něm orientovat a spravovat soubory.',
      topics: [
        'Jeden společný kořen „/“ a hierarchie FHS (Filesystem Hierarchy Standard)',
        'Klíčové systémové adresáře: /etc (konfigurace), /var (logy a weby), /home (uživatelé), /dev (zařízení)',
        'Základní navigace a manipulace: pwd, ls -la, cd, mkdir, cp, mv, rm',
        'Absolutní vs. relativní cesty a zástupné znaky * a ?'
      ],
      practice: [
        'Simulace: Terminálový trenažér – navigace ve virtuálním linuxovém stromu',
        'Praxe v OS: Vytvoření adresářové struktury projektu a bezpečný úklid souborů'
      ],
      builds: 'CMD orientace (OSS 1 – CLI1, CLI2).'
    },
    {
      slug: 'text-a-roury',
      tag: 'LX3',
      title: 'Textové proudy, filtry a roury',
      hours: '2 h',
      subtitle: 'Prohlížení, filtrování a řetězení příkazů – skutečná síla linuxové konzole.',
      intro: 'V Linuxu je téměř veškerá konfigurace i výstup v textové podobě. Spojováním malých nástrojů pomocí roury dokážeme během sekundy vyřešit složité úkoly.',
      topics: [
        'Prohlížení a stránkování textu: cat, head, tail -f (sledování v reálném čase), less',
        'Přesměrování standardních proudů: stdin, stdout (> a >>), stderr (2>)',
        'Spojování příkazů rourou (|) a filtrovací nástroje grep, sort, uniq, wc',
        'Práce v textovém editoru nano a základy editoru vim'
      ],
      practice: [
        'Simulace: Roury a filtry – poskládání příkazů pro extrakci IP adres z logu',
        'Praxe v OS: Vyfiltrování chybových hlášek z linuxového systémového souboru'
      ],
      builds: 'Roury a filtry (OSS 1 – CLI3).'
    },
    {
      slug: 'prava',
      tag: 'LX4',
      title: 'Uživatelé, skupiny a POSIX oprávnění',
      hours: '3 h',
      subtitle: 'Vlastník, skupina, ostatní (rwx), číselná notace chmod a příkaz sudo.',
      intro: 'Každý soubor a složka v Linuxu má přesně definovaného vlastníka a přístupová práva. Naučíme se je číst, počítat v osmičkové soustavě a bezpečně delegovat práva přes sudo.',
      topics: [
        'Správa účtů a skupin: soubory /etc/passwd, /etc/shadow a /etc/group, příkazy useradd a groupadd',
        'Klasický POSIX model: oprávnění číst (r=4), psát (w=2) a spouštět (x=1) pro User, Group a Others',
        'Změna oprávnění a vlastnictví: symbolický a číselný zápis chmod (např. 755, 644) a chown',
        'Superuživatel root, rizika práce pod rootem a bezpečné použití sudo (/etc/sudoers)'
      ],
      practice: [
        'Simulace: Kalkulačka rwx – interaktivní převodník mezi symbolickým zápisem rwxr-xr-- a číslem 754',
        'Praxe v OS: Zřízení sdílené složky pro skupinu techniků se zakázaným přístupem pro ostatní'
      ],
      builds: 'Uživatelské účty a skupiny (OSS 1 – USR1, USR3).'
    },
    {
      slug: 'balicky',
      tag: 'LX5',
      title: 'Správa software a balíčků (apt)',
      hours: '2 h',
      subtitle: 'Instalace, aktualizace a správa programů z oficiálních repozitářů.',
      intro: 'V Linuxu se software nestahuje z náhodných webových stránek. Správce balíčků apt stahuje ověřené balíčky z centrálních repozitářů a automaticky vyřeší všechny závislosti.',
      topics: [
        'Princip distribuce software: repozitáře, balíčky .deb a soubor /etc/apt/sources.list',
        'Základní příkazy správce balíčků: apt update (obnova seznamu), apt upgrade, apt install, apt remove',
        'Závislosti mezi balíčky a čištění systému (apt autoremove)',
        'Srovnání s Windows balíčkovačem winget a transakčními instalátory MSI'
      ],
      practice: [
        'Simulace: Strom závislostí – jak správce balíčků dopočítá chybějící knihovny',
        'Praxe v OS: Instalace sady diagnostických nástrojů (htop, curl, net-tools) a aktualizace systému'
      ],
      builds: 'Správa aplikačního software a winget (OSS 1 – SW1, SW2).'
    },
    {
      slug: 'procesy-a-sluzby',
      tag: 'LX6',
      title: 'Procesy a systémové služby (systemd)',
      hours: '3 h',
      subtitle: 'Sledování zátěže CPU/RAM a řízení systémových démonů přes systemctl.',
      intro: 'Procesy a služby známe z Windows. V Linuxu je spravujeme z terminálu: sledujeme vytížení zdrojů, ukončujeme zamrzlé úlohy a řídíme démony přes moderní init systém systemd.',
      topics: [
        'Procesy v Linuxu: PID, PPID, vlastník procesu, výpis procesů ps aux a interaktivní top / htop',
        'Ukončování procesů a posílání signálů: kill (SIGTERM 15 vs. SIGKILL 9) a pkill',
        'Architektura systemd a systémové jednotky (.service units)',
        'Příkaz systemctl: start, stop, restart, status, enable (spuštění při bootu), disable'
      ],
      practice: [
        'Simulace: Stopování démona – sledování stavu služby při havárii a restartu',
        'Praxe v OS: Vyhledání procesu zatěžujícího CPU a konfigurace automatického startu služby po startu PC'
      ],
      builds: 'Procesy a střídání (OSS 1 – PR1–PR3), Služby Windows (OSS 2 – PK1).'
    },
    {
      slug: 'logy-a-cron',
      tag: 'LX7',
      title: 'Systémové logy a plánovač cron',
      hours: '2 h',
      subtitle: 'Forenzní čtení žurnálů přes journalctl a periodické spouštění úloh.',
      intro: 'Když se v Linuxu stane chyba, odpověď najdeme v logu. A co se má opakovat každý den o půlnoci, svEqualříme plánovači úloh cron.',
      topics: [
        'Systémové žurnály systemd a příkaz journalctl (filtrace podle služby -u, priority a času -S)',
        'Klasické textové logy v adresáři /var/log (auth.log pro přihlášení, syslog)',
        'Démon crond a formát konfiguračního souboru crontab (5 hvězdiček: min, hod, den, měs, den v týdnu)',
        'Příkazy pro správu plánovače: crontab -e a crontab -l'
      ],
      practice: [
        'Simulace: Dešifrování záznamu crontab – určení, kdy přesně se úloha spustí',
        'Praxe v OS: Nalezení záznamu o restartu služby v journalctl a naplánování automatického skriptu v cronu'
      ],
      builds: 'Plánovač úloh (OSS 1), Prohlížeč událostí Event Viewer (OSS 2 – PK5).'
    }
  ]
};

/** Linux – Sítě, serverové služby a Bash skripty (~16 h) */
export const OSS3_LINUX_SLUZBY: OutlineGroup = {
  chapterId: 'os3-sluzby',
  chapterTitle: 'Linux: Sítě, služby a Bash',
  chapterDescription: 'Pokročilé síťové služby a automatizace: vzdálená správa SSH, webový server Apache, sdílení Samba s Windows a skriptování v Bashi.',
  chapterTag: 'srv',
  chapterPath: `${BASE}/sluzby`,
  subjectTitle: SUBJECT,
  grade: 3,
  gradeLabel: '3. Ročník',
  thematicBlock: 'Linux – Sítě, služby a Bash',
  icon: 'Server',
  gradient: 'from-slate-700 to-slate-900',
  items: [
    {
      slug: 'sit-a-ssh',
      tag: 'LX8',
      title: 'Sítě, SSH server a firewall',
      hours: '2 h',
      subtitle: 'Konfigurace síťových rozhraní, bezpečný vzdálený přístup a firewall ufw.',
      intro: 'Linuxový server obvykle nemá monitor a stojí v racku. Naučíme se nakonfigurovat síť, bezpečně se připojit přes SSH pomocí klíčů a ochránit systém firewallem ufw.',
      topics: [
        'Inspekce sítě v Linuxu: příkaz ip (ip a, ip route) a ověření spojení (ping, traceroute, ss -tulpn)',
        'Protokol SSH (port 22) a konfigurace OpenSSH serveru (/etc/ssh/sshd_config)',
        'Autentizace asymetrickými klíči: generování klíče ssh-keygen, autorizace v ~/.ssh/authorized_keys',
        'Jednoduchý firewall UFW (Uncomplicated Firewall): ufw enable, ufw allow 22/tcp, ufw status'
      ],
      practice: [
        'Simulace: Výměna SSH klíčů – vizualizace veřejného a privátního klíče při přihlášení',
        'Praxe v OS: Vzdálené přihlášení z Windows přes SSH bez hesla pomocí klíčů a povolení portu v UFW'
      ],
      builds: 'Síťové adaptéry (OSS 1 – NET1), RDP a OpenSSH (OSS 2 – SL4).'
    },
    {
      slug: 'apache',
      tag: 'LX9',
      title: 'Webový server Apache',
      hours: '2 h',
      subtitle: 'Provoz webových stránek na Linuxu: instalace role, kořenový adresář a porty.',
      intro: 'Většina světového webu běží na Linuxových serverech. Nainstalujeme webový server Apache2, vytvoříme uvítací stránku a otevřeme porty pro klienty ze sítě.',
      topics: [
        'Role Apache HTTP Server (balíček apache2) a jeho stav ve službách systemd',
        'Výchozí kořenový adresář /var/www/html a soubor index.html',
        'Vlastnictví a oprávnění webového obsahu (uživatel a skupina www-data)',
        'Konfigurace firewallu UFW pro web (ufw allow 80/tcp a 443/tcp) a otestování z prohlížeče'
      ],
      practice: [
        'Simulace: Průchod HTTP dotazu od klienta k souboru na disku serveru',
        'Praxe v OS: Zprovoznění vlastního webu na Ubuntu Serveru a ověření zobrazení z Windows'
      ],
      builds: 'Webový server IIS (OSS 2 – SL5), DNS (OSS 2 – SL2).'
    },
    {
      slug: 'samba',
      tag: 'LX10',
      title: 'Sdílení souborů Linux ↔ Windows (Samba)',
      hours: '3 h',
      subtitle: 'Propojení dvou světů: protokol SMB na Linuxu a síťový disk ve Windows.',
      intro: 'Jak dostat soubory z linuxového serveru do Windows průzkumníka? Pomocí Samby. Nakonfigurujeme sdílenou složku, nastavíme přístupová práva a namapujeme ji jako síťový disk.',
      topics: [
        'Protokol SMB/CIFS na open-source platformě (balíček samba a služba smbd)',
        'Hlavní konfigurační soubor /etc/samba/smb.conf (definice sdílení, cesty a práva zápisu)',
        'Rozdíl mezi linuxovým účtem a heslem pro Sambu (příkaz smbpasswd -a)',
        'Připojení k linuxovému sdílení z klientských Windows (UNC cesta \\\\ip-linuxu\\sdileni)'
      ],
      practice: [
        'Simulace: Dvojí kontrola práv – průchod přes konfiguraci Samby a lokální práva Linuxu',
        'Praxe v OS: Vytvoření síťové složky na Linuxu a její připojení v Průzkumníku Windows jako disku Z:'
      ],
      builds: 'Souborový server SMB (OSS 2 – SL3).'
    },
    {
      slug: 'bash-zaklady',
      tag: 'LX11',
      title: 'Skriptování v Bashi: Základy a proměnné',
      hours: '3 h',
      subtitle: 'Od příkazů k automatizaci: tvorba spustitelného skriptu, proměnné a argumenty.',
      intro: 'Místo ručního opakování stejných příkazů napíšeme skript. Naučíme se strukturu souboru .sh, shebang hlavičku, spouštění s parametry a práci s proměnnými.',
      topics: [
        'Co je skript a interpret: shebang hlavička #!/bin/bash a spouštění skriptu (./skript.sh)',
        'Nastavení oprávnění pro spuštění (chmod +x skript.sh)',
        'Proměnné v Bashi: definice, čtení hodnoty ($PROMENNA), proměnné prostředí a příkaz read',
        'Předávání argumentů z příkazové řádky: $0 (jméno), $1, $2, počet $#, návratový kód $?'
      ],
      practice: [
        'Simulace: Krokování shell skriptu – předávání hodnot parametrů do těla programu',
        'Praxe v OS: Vytvoření uvítacího a inspekčního skriptu, který vypíše datum, jméno uživatele a volné místo'
      ],
      builds: 'Dávkové soubory (OSS 1 – BAT1), PowerShell (OSS 2 – PK2).'
    },
    {
      slug: 'bash-automatizace',
      tag: 'LX12',
      title: 'Skriptování v Bashi: Podmínky a zálohy',
      hours: '4 h',
      subtitle: 'Logika ve skriptech: podmínky if, cyklus for a automatický zálohovací skript.',
      intro: 'Skutečná síla skriptování se projeví při automatizaci. Vytvoříme plnohodnotný zálohovací skript s podmínkami a cyklem, který zabalí data a naplánujeme ho v cronu.',
      topics: [
        'Podmíněné větvení v Bashi: syntaxe if [ podmínka ]; then ... else ... fi',
        'Testování souborů a čísel: -f (soubor existuje), -d (složka), -eq, -ne, -lt',
        'Cyklus for pro zpracování souborů v adresáři',
        'Komplexní praktický úkol: skript pro archivaci složky do tar.gz a jeho napojení na cron'
      ],
      practice: [
        'Simulace: Ladění chyb v syntaxi Bashe (pozor na mezery v závorkách [ ... ])',
        'Praxe v OS: Vytvoření robustního skriptu na zálohu složky webu s kontrolou existence cíle'
      ],
      builds: 'BAT2 (OSS 1), Plánovač cron (LX7), Zálohování (OSS 2 – Blok 1).'
    },
    {
      slug: 'proverka',
      tag: 'LX13',
      title: 'Praktická prověrka správy Linuxu',
      hours: '2 h',
      subtitle: 'Ověření samostatnosti: zprovoznění služeb, oprávnění a automatizace.',
      intro: 'Praktické ověření znalostí z obou linuxových bloků. Samostatná práce ve virtuálním stroji podle zadání bez nápovědy.',
      topics: [
        'Zadání komplexního scénáře v laboratoři (nový uživatel, adresář, webová stránka, restart služby)',
        'Kontrola funkčnosti sítě a firewallu',
        'Spuštění a ověření zálohovacího skriptu'
      ],
      practice: [
        'Laboratorní samostatná práce: Zprovoznění zadané konfigurace v časovém limitu 90 minut'
      ],
      builds: 'Syntéza témat LX1–LX12.'
    }
  ]
};

/** Git a verzování (~8 h) */
export const OSS3_GIT: OutlineGroup = {
  chapterId: 'os3-git',
  chapterTitle: 'Git a verzování kódu',
  chapterDescription: 'Správa verzí v praxi: repozitář, commity, větvení, slučování a spolupráce na GitHubu.',
  chapterTag: 'git',
  chapterPath: `${BASE}/git`,
  subjectTitle: SUBJECT,
  grade: 3,
  gradeLabel: '3. Ročník',
  thematicBlock: 'Git a verzování kódu',
  icon: 'GitBranch',
  gradient: 'from-slate-700 to-slate-900',
  items: [
    {
      slug: 'principy',
      tag: 'GT1',
      title: 'Proč verzovat a 3 zóny Gitu',
      hours: '2 h',
      subtitle: 'Repozitář, commit a historie změn bez chaosu v kopiích souborů.',
      intro: 'Názvy jako „projekt_final_v2_OPRAVENO.docx“ jsou noční můra. Git zaznamenává celou historii změn jako snímky v čase a umožňuje se kdykoliv vrátit.',
      topics: [
        'Problém ručního verzování kopií souborů a princip verzovacího systému (VCS)',
        'Architektura tří zón v Gitu: Pracovní adresář (Working Tree), Připravená oblast (Staging Area), Místní repozitář (.git)',
        'Pojem commit jako neměnný snímek projektu s autorem a zprávou',
        'Základní konfigurace uživatele: git config --global user.name a user.email'
      ],
      practice: [
        'Simulace: Pohyb souboru mezi třemi oblastmi Gitu (Working -> Staging -> Commit)',
        'Praxe v OS: Inicializace prvního repozitáře git init a uložení prvního commitu'
      ],
      builds: 'Zálohování (OSS 2) – verze vs. záloha.'
    },
    {
      slug: 'zakladni-cyklus',
      tag: 'GT2',
      title: 'Základní pracovní cyklus',
      hours: '2 h',
      subtitle: 'Příkazy status, add, commit, log, ignorování souborů a vrácení změn.',
      intro: 'Běžná práce s Gitem je stále stejný spolehlivý cyklus: upravit kód, zkontrolovat stav, připravit k uložení a potvrdit commit.',
      topics: [
        'Příkazy git status, git add (příprava souborů) a git commit -m "popis"',
        'Prohlížení historie a změn: git log (--oneline, --graph) a git diff',
        'Ignorování nepotřebných souborů: pravidla a syntaxe souboru .gitignore',
        'Záchrana před chybou: vrácení nechtěných změn přes git restore'
      ],
      practice: [
        'Simulace: Odhalení, které soubory patří a nepatří do commitu',
        'Praxe v OS: Správa historie reálného projektu s vyloučením dočasných souborů v .gitignore'
      ],
      builds: 'GT1 (principy Gitu).'
    },
    {
      slug: 'vetve',
      tag: 'GT3',
      title: 'Větve a řešení konfliktů',
      hours: '2 h',
      subtitle: 'Paralelní vývoj ve větvích, slučování merge a ruční řešení kolizí.',
      intro: 'Větve umožňují vyvíjet novou funkci bezpečně stranou bez ohrožení funkčního kódu. Po dokončení větev sloučíme zpět a případný konflikt v kódu vyřešíme.',
      topics: [
        'Význam větví (branches) v týmu a hlavní větev (main / master)',
        'Tvorba a přepínání větví: git branch, git checkout / git switch',
        'Slučování větví: git merge a situace Fast-Forward',
        'Vznik a řešení konfliktu při slučování (Merge Conflict): značky v souboru a potvrzení vyřešení'
      ],
      practice: [
        'Simulace: Vizuální strom větví a simulace kolize dvou úprav na stejném řádku',
        'Praxe v OS: Vytvoření větve, záměrná kolize a její ruční oprava v editoru'
      ],
      builds: 'GT2 (pracovní cyklus).'
    },
    {
      slug: 'github',
      tag: 'GT4',
      title: 'Vzdálené repozitáře a GitHub',
      hours: '2 h',
      subtitle: 'Vzdálená synchronizace (push, pull), spolupráce a Pull Requesty.',
      intro: 'Vzdálený repozitář propojuje členy týmu. Naučíme se odesílat změny na GitHub, stahovat práci kolegů a navrhovat úpravy přes Pull Request.',
      topics: [
        'Vzdálený repozitář (remote origin): git clone, git push, git pull',
        'Služba GitHub: správa projektů, webové rozhraní, README.md a Issues',
        'Bezpečné ověřování: SSH klíče nebo Personal Access Tokeny (PAT)',
        'Pracovní postup týmu: Fork, větev, Pull Request (PR) a code review'
      ],
      practice: [
        'Simulace: Synchronizace mezi dvěma vývojáři – řešení odmítnutého push příkazu',
        'Praxe v OS: Naklonování repozitáře, odeslání větve na GitHub a vytvoření Pull Requestu'
      ],
      builds: 'GT3 (větve), SSH klíče (LX8).'
    }
  ]
};

/** Kybernetická bezpečnost – Systém a Síť (~12 h) */
export const OSS3_CYBER: OutlineGroup = {
  chapterId: 'os3-cyber',
  chapterTitle: 'Kybernetická bezpečnost',
  chapterDescription: 'Systémová a síťová bezpečnost: právo a etika v IT, skenování portů Nmapem, analýza provozu ve Wiresharku a řešení incidentů.',
  chapterTag: 'cyb',
  chapterPath: `${BASE}/kyberbezpecnost`,
  subjectTitle: SUBJECT,
  grade: 3,
  gradeLabel: '3. Ročník',
  thematicBlock: 'Kybernetická bezpečnost',
  icon: 'ShieldCheck',
  gradient: 'from-slate-700 to-slate-900',
  items: [
    {
      slug: 'pravo-a-utok',
      tag: 'KB1',
      title: 'Právo v IT, NIS2 a fáze útoku',
      hours: '2 h',
      subtitle: 'Zákonné hranice správce, směrnice NIS2 a model Kill Chain.',
      intro: 'Správce systému musí vědět, co je legální obrana a co už trestný čin. Představíme si zákonné povinnosti, směrnici NIS2 a fáze, kterými prochází každý kybernetický útok.',
      topics: [
        'Základní principy bezpečnosti: CIA triáda (Důvěrnost, Integrita, Dostupnost)',
        'Trestní zákoník ČR: § 230–232 (Neoprávněný přístup k počítačovému systému a nosiči informací)',
        'Zákon o kybernetické bezpečnosti a evropská směrnice NIS2: povinnosti organizací',
        'Životní cyklus útoku: model Cyber Kill Chain (Průzkum, Zbraně, Doručení, Průnik, Řízení)'
      ],
      practice: [
        'Simulace: Právní kvíz – posouzení reálných situací (port scan, test hesel, zodpovědné nahlášení)',
        'Praxe: Rozbor reálného kybernetického incidentu a identifikace fází útoku'
      ],
      builds: 'Malware a bezpečnost (OSS 2 – Blok 2).'
    },
    {
      slug: 'osint-nmap',
      tag: 'KB2',
      title: 'Průzkum sítě a mapování zranitelností (Nmap & CVE)',
      hours: '3 h',
      subtitle: 'Skenování otevřených portů v laboratoři a vyhledání známých chyb v CVE.',
      intro: 'Každý útok i bezpečnostní audit začíná průzkumem. V izolované síti si vyzkoušíme nástroj Nmap pro odhalení otevřených portů a dohledáme známé zranitelnosti v databázi CVE.',
      topics: [
        'Pasivní průzkum (OSINT základy): co o síti prozradí veřejné zdroje',
        'Aktivní skenování nástrojem Nmap: TCP SYN sken (-sS), detekce verzí (-sV), detekce OS (-O)',
        'Vyhodnocení otevřených portů a zbytečně běžících služeb (zmenšení útočné plochy)',
        'Databáze zranitelností CVE (Common Vulnerabilities and Exposures) a kalkulátor závažnosti CVSS'
      ],
      practice: [
        'Simulace: Interaktivní Nmap – interpretace výstupu skenu a identifikace zranitelné služby',
        'Praxe v OS: Provedení auditního skenu virtuálního serveru Nmapem a dohledání CVE záznamu'
      ],
      builds: 'Firewall (OSS 2), Sítě a porty (OSS 1).'
    },
    {
      slug: 'wireshark',
      tag: 'KB3',
      title: 'Analýza síťového provozu (Wireshark)',
      hours: '3 h',
      subtitle: 'Zachytávání paketů v LAN, sestavení TCP spojení a rizika nešifrovaných protokolů.',
      intro: 'Síťový kabel nepřenáší jen data, ale i tajemství, pokud nejsou šifrovaná. V nástroji Wireshark odchytíme pakety, zanalyzujeme TCP handshake a uvidíme, proč je nešifrované heslo v síti snadnou kořistí.',
      topics: [
        'Architektura síťového analyzátoru (Sniffer) a režim síťové karty (Promiscuous mode)',
        'Sledování navázání spojení: 3fázový TCP handshake (SYN, SYN-ACK, ACK)',
        'Důkaz zranitelnosti: odposlech nešifrovaného přihlašování v protokolech HTTP, FTP a Telnet',
        'Obrana šifrováním: proč v zachyceném HTTPS a SSH provozu útočník vidí jen náhodný šum'
      ],
      practice: [
        'Simulace: Rozebrání paketu – vyhledání uživatelského jména v těle HTTP POST požadavku',
        'Praxe v OS: Spuštění Wiresharku v laboratorní síti, zachycení vlastního přihlášení a filtrace provozu'
      ],
      builds: 'Sítě a diagnostika (OSS 1 – NET1, NET2), Web a SSH (SL4, SL5).'
    },
    {
      slug: 'incident-ctf',
      tag: 'KB4',
      title: 'Praktický bezpečnostní incident a reakce',
      hours: '4 h',
      subtitle: 'Týmové cvičení: detekce útoku, analýza stop, izolace a sepsání protokolu.',
      intro: 'Vrchol bezpečnostního bloku. V simulovaném napadeném prostředí studenti v roli obránců odhalí aktivitu útočníka, najdou kompromitované účty, zablokují IP na firewallu a sepíší hlášení.',
      topics: [
        'Metodika reakce na incident (Incident Response): Detekce, Izolace, Odstranění, Obnova, Závěry',
        'Hledání anomálií v logu serveru (neobvyklé časy, opakované neúspěšné pokusy)',
        'Aktivní obrana: okamžité zablokování útočící IP adresy v UFW / iptables',
        'Sepsání incidentního protokolu pro vedení společnosti'
      ],
      practice: [
        'Laboratorní cvičení: Záchranná mise na napadeném serveru ve dvojicích a obhajoba protokolu'
      ],
      builds: 'Syntéza celé kyberbezpečnosti a logování.'
    }
  ]
};

/** Týmový projekt a agilní řízení (~10 h) */
export const OSS3_TEAM: OutlineGroup = {
  chapterId: 'os3-tym',
  chapterTitle: 'Týmový projekt a agilní řízení',
  chapterDescription: 'Agilní organizace úkolů v Kanbanu, komplexní ročníkový infrastrukturní projekt a jeho obhajoba.',
  chapterTag: 'tym',
  chapterPath: `${BASE}/tymova-spoluprace`,
  subjectTitle: SUBJECT,
  grade: 3,
  gradeLabel: '3. Ročník',
  thematicBlock: 'Týmový projekt a agilní řízení',
  icon: 'FolderKanban',
  gradient: 'from-slate-700 to-slate-900',
  items: [
    {
      slug: 'kanban',
      tag: 'TM1',
      title: 'Agilní organizace úkolů (Kanban)',
      hours: '2 h',
      subtitle: 'Přehledné řízení práce v týmu: tabule Kanban, backlog a stavy úkolů.',
      intro: 'Úspěch v IT závisí na schopnosti domluvit se a zorganizovat práci. Naučíme se používat nástroj Kanban pro rozdělení úkolů v týmu a sledování postupu.',
      topics: [
        'Principy agilního řízení: proč se vyhnout chaotické práci a jak rozdělit projekt na etapy',
        'Nástroj Kanban: sloupce Backlog (zásobník), To Do, In Progress, Review a Done',
        'Práce s úkoly v digitálních nástrojích (GitHub Projects, Trello)',
        'Rozdělení rolí a odpovědností v 2–3členném týmu'
      ],
      practice: [
        'Simulace: Týmová tabule – přesun úkolu fázemi a řešení přetížení člena týmu',
        'Praxe v OS: Vytvoření společné projektové tabule na GitHub Projects a založení úkolů'
      ],
      builds: 'GitHub Issues a PR (GT4).'
    },
    {
      slug: 'projekt',
      tag: 'TM2',
      title: 'Závěrečný integrující týmový projekt',
      hours: '6 h',
      subtitle: 'Samostatná stavba smíšené podnikové infrastruktury (Linux + Windows).',
      intro: 'Vyvrcholení tříletého studia operačních systémů. Týmy studentů dostanou zadání reálné firmy a musí samostatně postavit a zabezpečit celou infrastrukturu.',
      topics: [
        'Komplexní zadání infrastruktury fiktivní organizace (požadavky na servery, stanice, sdílení a bezpečnost)',
        'Realizace Linuxového serveru: zprovoznění Apache intranetu, Samba sdílení s Windows a zálohovacího Bash skriptu',
        'Propojení s Windows stanicemi a doménou z 2. ročníku',
        'Zabezpečení celé infrastruktury firewallem a ověření logování'
      ],
      practice: [
        'Týmová laboratorní práce: Třítýdenní realizace komplexního projektu v laboratoři'
      ],
      builds: 'Syntéza všech odborných předmětů OSS 1, OSS 2 a OSS 3.'
    },
    {
      slug: 'obhajoba',
      tag: 'TM3',
      title: 'Prezentace a obhajoby projektů',
      hours: '2 h',
      subtitle: 'Demonstrace funkčního řešení, technická argumentace a zpětná vazba.',
      intro: 'Být skvělý technik nestačí – musíte umět své řešení předvést a obhájit. Každý tým představí funkční infrastrukturu a odpoví na otázky.',
      topics: [
        'Příprava technické prezentace a demonstrace funkčního systému',
        'Obhajoba architektonických rozhodnutí (proč Samba, jak je nastaven firewall, jak funguje záloha)',
        'Reflexe týmové spolupráce a technická zpětná vazba od učitele a spolužáků'
      ],
      practice: [
        'Živá demonstrace řešení před třídou a technická obhajoba'
      ],
      builds: 'TM1, TM2 a celý ročník OSS 3.'
    }
  ]
};

export const OSS3_GROUPS: OutlineGroup[] = [
  OSS3_LINUX_SPRAVA,
  OSS3_LINUX_SLUZBY,
  OSS3_GIT,
  OSS3_CYBER,
  OSS3_TEAM
];
