import type { OutlineGroup } from './outlineTypes';

const SUBJECT = 'Operační systémy 3';
const BASE = '/specializovana/operacni-systemy-3';

/** Linux – Instalace a základní správa (20 h) */
export const OSS3_LINUX_SPRAVA: OutlineGroup = {
  chapterId: 'os3-linux',
  chapterTitle: 'Linux: Instalace a správa',
  chapterDescription: 'Základní řemeslo administrátora Linuxu: instalace systému, dělení disku, FHS strom, terminál, práva UGO, disky ext4, procesy, balíčky a systemd.',
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
      title: 'Architektura Linuxu, distribuce a instalace serveru bez GUI',
      hours: '2 h',
      subtitle: 'Volba distribuce, rozdělení disku, swap a zavaděč GRUB.',
      intro: 'Linux začíná rozdělením disku a instalací. Ukážeme si rozdíl mezi distribucemi, vytvoříme kořenový oddíl ext4 a odkládací swap a pochopíme, jak zavaděč GRUB startuje systém bez grafického rozhraní.',
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
      title: 'Hierarchie souborového systému FHS a orientace v terminálu',
      hours: '4 h',
      subtitle: 'Pohyb po jednotném stromu adresářů a práce se soubory v příkazové řádce.',
      intro: 'V Linuxu neexistují písmena disků C: nebo D: – celý systém tvoří jeden strom s kořenem „/“. Naučíme se v něm orientovat a spravovat soubory.',
      topics: [
        'Jeden společný kořen „/“ a hierarchie FHS (Filesystem Hierarchy Standard)',
        'Klíčové systémové adresáře: /etc (konfigurace), /var (logy a weby), /home (uživatelé), /dev (zařízení)',
        'Základní navigace a manipulace: pwd, ls -la, cd, mkdir, cp, mv, rm',
        'Absolutní vs. relativní cesty a zástupné znaky * a ?',
        'Procvičování pro žáky, kteří terminál vidí poprvé: kopírování, přesouvání, mazání a hledání souborů (find) v samostatných úlohách'
      ],
      practice: [
        'Simulace: Terminálový trenažér – navigace ve virtuálním linuxovém stromu',
        'Praxe v OS: Vytvoření adresářové struktury projektu a bezpečný úklid souborů',
        'Druhá dvouhodinovka: samostatné procvičovací úlohy v terminálu s postupným zvyšováním obtížnosti'
      ],
      builds: 'CMD orientace (OSS 1 – CLI1, CLI2).'
    },
    {
      slug: 'prava',
      tag: 'LX3',
      title: 'Uživatelé, skupiny a POSIX oprávnění (chmod, chown, sudo)',
      hours: '4 h',
      subtitle: 'Vlastník, skupina, ostatní (rwx), číselná notace chmod a příkaz sudo.',
      intro: 'Každý soubor a složka v Linuxu má přesně definovaného vlastníka a přístupová práva. Naučíme se je číst, počítat v osmičkové soustavě a bezpečně delegovat práva přes sudo.',
      topics: [
        'Správa účtů a skupin: soubory /etc/passwd, /etc/shadow a /etc/group, příkazy useradd a groupadd',
        'Klasický POSIX model: oprávnění číst (r=4), psát (w=2) a spouštět (x=1) pro User, Group a Others',
        'Změna oprávnění a vlastnictví: symbolický a číselný zápis chmod (např. 755, 644) a chown',
        'Superuživatel root, rizika práce pod rootem a bezpečné použití sudo (/etc/sudoers)',
        'Procvičování řešení typických situací: kdo smí číst, zapisovat a spouštět, oprava chybně nastavených práv'
      ],
      practice: [
        'Simulace: Kalkulačka rwx – interaktivní převodník mezi symbolickým zápisem rwxr-xr-- a číslem 754',
        'Praxe v OS: Zřízení sdílené složky pro skupinu techniků se zakázaným přístupem pro ostatní',
        'Druhá dvouhodinovka: samostatné úlohy na práva a vlastnictví, oprava záměrně rozbitého nastavení'
      ],
      builds: 'Uživatelské účty a skupiny (OSS 1 – USR1, USR3).'
    },
    {
      slug: 'text-a-roury',
      tag: 'LX4',
      title: 'Proudové filtry, roury a textové editory v terminálu',
      hours: '2 h',
      subtitle: 'Prohlížení, filtrování a řetězení příkazů přes rouru | a editory nano/vim.',
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
      slug: 'disky',
      tag: 'LX5',
      title: 'Správa disků v Linuxu: oddíly, formátování a připojování /etc/fstab',
      hours: '2 h',
      subtitle: 'Nástroje fdisk, mkfs.ext4, manuální mount a automatické připojení svazků.',
      intro: 'Správa diskových úložišť v Linuxu vyžaduje pochopení přípojných bodů. Vytvoříme diskové oddíly, zformátujeme je na ext4 a nakonfigurujeme automatické připojení po startu v /etc/fstab.',
      topics: [
        'Identifikace blokových zařízení (/dev/sda, /dev/nvme0n1) a nástroje lsblk, fdisk, blkid',
        'Tvorba souborového systému ext4 pomocí nástroje mkfs.ext4',
        'Přípojné body v souborovém stromu, manuální připojení příkazem mount a odpojení umount',
        'Trvalá konfigurace v souboru /etc/fstab: UUID, přípojný bod, volby mountu a fsck kontrola'
      ],
      practice: [
        'Simulace: Stavba záznamu pro /etc/fstab – správná syntaxe UUID a voleb',
        'Praxe v OS: Připojení druhého virtuálního disku, vytvoření oddílu a trvalé připojení do /data'
      ],
      builds: 'Dělení disků (OSS 1 – FS3).'
    },
    {
      slug: 'procesy',
      tag: 'LX6',
      title: 'Správa procesů a sledování vytížení systému (ps, top, htop, kill)',
      hours: '2 h',
      subtitle: 'Sledování zátěže CPU/RAM, priorit a řízení procesů z textové konzole.',
      intro: 'Procesy a jejich vytížení spravujeme z terminálu: sledujeme spotřebu paměti a procesoru, měníme priority a ukončujeme zamrzlé úlohy signály SIGTERM a SIGKILL.',
      topics: [
        'Procesy v Linuxu: PID, PPID, vlastník procesu, výpis procesů ps aux a interaktivní top / htop',
        'Ukončování procesů a posílání signálů: kill (SIGTERM 15 vs. SIGKILL 9) a pkill',
        'Priority procesů a přeplánování: nice a renice hodnoty (-20 až 19)',
        'Běh procesů na pozadí (&, nohup, bg, fg)'
      ],
      practice: [
        'Simulace: Stopování procesů – vyhledání a bezpečné ukončení nebezpečného procesu',
        'Praxe v OS: Vyhledání procesu zatěžujícího CPU a jeho ukončení příkazem kill'
      ],
      builds: 'Procesy (OSS 1 – PR1–PR3).'
    },
    {
      slug: 'balicky',
      tag: 'LX7',
      title: 'Správa software a balíčkovací systém APT (repozitáře a aktualizace)',
      hours: '2 h',
      subtitle: 'Instalace, aktualizace a správa programů z oficiálních repozitářů.',
      intro: 'V Linuxu se software nestahuje z náhodných webových stránek. Správce balíčků apt stahuje ověřené balíčky z centrálních repozitářů a automaticky vyřeší všechny závislosti.',
      topics: [
        'Princip distribuce software: repozitáře, balíčky .deb a soubor /etc/apt/sources.list',
        'Základní příkazy správce balíčků: apt update (obnova seznamu), apt upgrade, apt install, apt remove',
        'Závislosti mezi balíčky a čištění systému (apt autoremove)',
        'Srovnání s Windows balíčkovačem winget a transakčními instalátory'
      ],
      practice: [
        'Simulace: Strom závislostí – jak správce balíčků dopočítá chybějící knihovny',
        'Praxe v OS: Instalace sady diagnostických nástrojů (htop, curl, net-tools) a aktualizace systému'
      ],
      builds: 'Správa software (OSS 1 – SW1, SW2).'
    },
    {
      slug: 'sluzby-a-logy',
      tag: 'LX8',
      title: 'Systémové služby (systemd) a analýza žurnálu logů (journalctl)',
      hours: '2 h',
      subtitle: 'Architektura řízení démonů přes systemctl a vyhodnocování chyb v žurnálu.',
      intro: 'Služby a démony v moderním Linuxu řídí systém systemd. Naučíme se ovládat jejich stav, povolit spouštění při startu a forenzně číst systémové logy pomocí journalctl.',
      topics: [
        'Architektura systemd a systémové jednotky (.service units)',
        'Příkaz systemctl: start, stop, restart, status, enable (spuštění při bootu), disable',
        'Systémové žurnály systemd a příkaz journalctl (filtrace podle služby -u, priority a času)',
        'Klasické textové logy v adresáři /var/log (auth.log, syslog)'
      ],
      practice: [
        'Simulace: Stopování démona – sledování stavu služby při havárii a restartu',
        'Praxe v OS: Nalezení záznamu o chybě služby v journalctl a konfigurace automatického startu'
      ],
      builds: 'Služby Windows (OSS 2 – PK1), Žurnál událostí (OSS 2 – BZ4).'
    }
  ]
};

/** Linux – Sítě, serverové služby a Bash skripty (18 h) */
export const OSS3_LINUX_SLUZBY: OutlineGroup = {
  chapterId: 'os3-sluzby',
  chapterTitle: 'Linux: Sítě, služby a Bash',
  chapterDescription: 'Pokročilé síťové služby a automatizace: síť a firewall UFW, vzdálená správa SSH, webový server Apache a HTTPS, sdílení Samba s Windows, skriptování v Bashi a plánovač cron.',
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
      slug: 'sit-a-firewall',
      tag: 'LX9',
      title: 'Síťová konfigurace v Linuxu a paketový firewall UFW',
      hours: '2 h',
      subtitle: 'Konfigurace síťových rozhraní, diagnostika konektivity a paketový firewall UFW.',
      intro: 'Server bez správné sítě je odříznutý od světa. Naučíme se konfigurovat síťová rozhraní, diagnostikovat spojení a zabezpečit server stavovým firewallem UFW.',
      topics: [
        'Inspekce a konfigurace sítě v Linuxu: příkaz ip (ip a, ip route) a Netplan konfigurace v /etc/netplan',
        'Diagnostika síťového spojení: ping, traceroute, sledování naslouchajících portů (ss -tulpn)',
        'Jednoduchý paketový firewall UFW (Uncomplicated Firewall): princip stavové filtrace',
        'Správa pravidel: ufw default deny incoming, ufw allow, ufw status numbered a ufw delete'
      ],
      practice: [
        'Simulace: Tvorba pravidel firewallu – povolení pouze nezbytných portů pro server',
        'Praxe v OS: Konfigurace síťového adaptéru a aktivace UFW s povolením pouze SSH a webu'
      ],
      builds: 'Síťové adaptéry (OSS 1 – NET1), Firewall (OSS 2 – BZ6).'
    },
    {
      slug: 'ssh',
      tag: 'LX10',
      title: 'Zabezpečená vzdálená správa přes SSH a asymetrické klíče',
      hours: '2 h',
      subtitle: 'OpenSSH server, autentizace asymetrickým párem klíčů a restrikce hesel.',
      intro: 'Linuxové servery spravujeme výhradně vzdáleně přes šifrovaný protokol SSH. Nastavíme autentizaci asymetrickým párem klíčů bez použití hesel a zabezpečíme server proti brute-force útokům.',
      topics: [
        'Protokol SSH (Secure Shell, port 22) a konfigurace démonu /etc/ssh/sshd_config',
        'Generování asymetrického páru klíčů nástrojem ssh-keygen (algoritmy Ed25519 vs. RSA)',
        'Distribuce veřejného klíče do souboru ~/.ssh/authorized_keys na serveru',
        'Tvrzení konfigurace SSH: zákaz přihlášení uživatele root (PermitRootLogin no) a vypnutí hesel (PasswordAuthentication no)'
      ],
      practice: [
        'Simulace: Výměna SSH klíčů – vizualizace veřejného a privátního klíče při přihlášení',
        'Praxe v OS: Vygenerování klíče ve Windows a bezpečné přihlášení na Linux bez zadávání hesla'
      ],
      builds: 'Vzdálená správa RDP (OSS 2 – AD2).'
    },
    {
      slug: 'apache',
      tag: 'LX11',
      title: 'Webový server Apache: Konfigurace, virtuální hostitelé a oprávnění',
      hours: '2 h',
      subtitle: 'Instalace webové služby Apache2, kořenový adresář a provoz více webů (VirtualHost).',
      intro: 'Většina světového webu běží na Linuxových serverech. Nainstalujeme webový server Apache2, nastavíme kořenové adresáře a vytvoříme virtuální hostitele pro provoz více domén.',
      topics: [
        'Role Apache HTTP Server (balíček apache2) a stav ve službách systemd',
        'Výchozí kořenový adresář /var/www/html a soubor index.html',
        'Vlastnictví a oprávnění webového obsahu (uživatel a skupina www-data)',
        'Konfigurace virtuálních hostitelů (VirtualHost) v /etc/apache2/sites-available a nástroje a2ensite'
      ],
      practice: [
        'Simulace: Směrování HTTP požadavku podle doménového jména (VirtualHost)',
        'Praxe v OS: Zprovoznění webové stránky firmy na Apache a ověření přístupu z klientského PC'
      ],
      builds: 'Sítě v OS (OSS 1).'
    },
    {
      slug: 'https',
      tag: 'LX12',
      title: 'Zabezpečení webu certifikátem HTTPS a šifrování provozu',
      hours: '2 h',
      subtitle: 'Protokol TLS/SSL, nasazení certifikátů a automatizace certifikátů Certbot.',
      intro: 'Nešifrovaný web (HTTP) je dnes bezpečnostní nepřijatelný. Naučíme se nasadit TLS certifikát, zapnout šifrování HTTPS na portu 443 a automaticky přesměrovávat veškerý nechráněný provoz.',
      topics: [
        'Bezpečnostní rizika protokolu HTTP (únik hesel a cookies) vs. šifrovaný HTTPS (port 443)',
        'Princip asymetrického šifrování TLS/SSL a role certifikačních autorit (Let\'s Encrypt)',
        'Povolení SSL modulu v Apache (a2enmod ssl) a konfigurace certifikátů v konfiguračním souboru',
        'Vynucení přesměrování z HTTP na HTTPS a nástroj Certbot pro automatickou obnovu'
      ],
      practice: [
        'Simulace: Rozdíl mezi HTTP a HTTPS – sledování šifrovaných dat v tranzitu',
        'Praxe v OS: Vytvoření samopodepsaného certifikátu a zabezpečení webu Apache šifrováním HTTPS'
      ],
      builds: 'Certifikáty Authenticode (OSS 2 – BZ2), Apache (LX11).'
    },
    {
      slug: 'samba',
      tag: 'LX13',
      title: 'Heterogenní sdílení dat v síti (Linux ↔ Windows přes Sambu)',
      hours: '2 h',
      subtitle: 'Protokol SMB na Linuxu, sdílené složky pro Windows klienty a přístupová práva.',
      intro: 'V moderní podnikové síti Linux a Windows spolupracují. Pomocí služby Samba vytvoříme centrální souborové úložiště na Linuxu, které si uživatelé Windows připojí jako síťový disk.',
      topics: [
        'Protokol SMB/CIFS na Linuxové platformě (balíček samba a služba smbd)',
        'Hlavní konfigurační soubor /etc/samba/smb.conf (sekce sdílení, cesty, práva zápisu, valid users)',
        'Rozdíl mezi linuxovým účtem a heslem pro Sambu (příkaz smbpasswd -a)',
        'Připojení k linuxovému sdílení z klientských Windows (UNC cesta \\\\ip-linuxu\\sdileni a mapování disku Z:)'
      ],
      practice: [
        'Simulace: Dvojí kontrola práv – průchod přes konfiguraci Samby a lokální práva Linuxu',
        'Praxe v OS: Vytvoření sdílené složky na Linuxu a její připojení v Průzkumníku Windows jako síťové jednotky'
      ],
      builds: 'Sdílení SMB na Windows (OSS 2 – AD1).'
    },
    {
      slug: 'bash-zaklady',
      tag: 'LX14',
      title: 'Administrační skriptování v shellu: Proměnné a argumenty ($1, $#)',
      hours: '2 h',
      subtitle: 'Tvorba spustitelných skriptů, shebang hlavička, proměnné a předávání parametrů.',
      intro: 'Opakované rutinní příkazy správce IT automatizuje. Naučíme se psát spustitelné Bash skripty, používat proměnné a zpracovávat parametry z příkazové řádky.',
      topics: [
        'Co je skript a interpret: shebang hlavička #!/bin/bash a spouštění skriptu (./skript.sh)',
        'Nastavení oprávnění pro spuštění (chmod +x skript.sh)',
        'Proměnné v Bashi: definice, syntaxe přiřazení (bez mezer) a čtení hodnoty ($PROMENNA)',
        'Předávání argumentů z příkazové řádky: $0 (jméno), $1, $2, počet $#, návratový kód $?'
      ],
      practice: [
        'Simulace: Krokování shell skriptu – předávání hodnot parametrů do těla programu',
        'Praxe v OS: Vytvoření skriptu pro rychlé vytvoření nového uživatele včetně vygenerování hesla'
      ],
      builds: 'Dávkové soubory (OSS 1 – BAT1), PowerShell (OSS 2 – PK3).'
    },
    {
      slug: 'bash-skripty',
      tag: 'LX15',
      title: 'Administrační skriptování v shellu: Podmínky, cykly a zálohování (tar)',
      hours: '4 h',
      subtitle: 'Podmínky if, cykly for a napsání robustního automatizovaného zálohovacího skriptu.',
      intro: 'Rozšíříme skripty o podmíněné větvení a cykly. Vytvoříme plnohodnotný zálohovací skript, který zkontroluje existenci souborů a zabalí data do archivu tar.gz s časovým razítkem.',
      topics: [
        'Podmíněné větvení v Bashi: syntaxe if [ podmínka ]; then ... else ... fi',
        'Testovací operátory: -f (soubor existuje), -d (složka), -z (prázdný řetězec), -eq, -ne',
        'Cyklus for pro hromadné zpracování souborů a seznamů',
        'Archivace a komprese dat utilitou tar (přepínače -czvf pro gzip) a tvorba časového razítka (date +%Y%m%d)'
      ],
      practice: [
        'Simulace: Ladění chyb v syntaxi Bashe (správné mezery v hranatých závorkách)',
        'Praxe v OS: Naprogramování automatizovaného zálohovacího skriptu pro složku webu s ošetřením chyb',
        'Druhá dvouhodinovka: samostatné dokončení a odladění vlastního skriptu s kontrolou učitele'
      ],
      builds: 'Zálohování (OSS 2 – Blok 1).'
    },
    {
      slug: 'cron',
      tag: 'LX16',
      title: 'Automatické periodické plánování úloh v systému (cron a crontab)',
      hours: '2 h',
      subtitle: 'Syntaxe crontab, plánování nočních záloh a automatická údržba serveru.',
      intro: 'Správce v noci spí, ale server pracuje. Naučíme se plánovat noční zálohy, rotace logů a údržbové skripty pomocí systémového démonu cron.',
      topics: [
        'Architektura plánovače cron a systémový démon crond',
        'Syntaxe crontab (5 polí: minuta, hodina, den v měsíci, měsíc, den v týdnu)',
        'Uživatelský crontab (crontab -e, crontab -l) vs. systémové úlohy v /etc/cron.d/',
        'Přesměrování výstupů naplánovaných úloh do logovacího souboru (> /var/log/zaloha.log 2>&1)'
      ],
      practice: [
        'Simulace: Dešifrování záznamu crontab – určení přesného času spuštění',
        'Praxe v OS: Naplánování automatického spouštění zálohovacího skriptu každou noc ve 02:00'
      ],
      builds: 'Plánovač úloh (OSS 1), Zálohy v Bashi (LX15).'
    }
  ]
};

/** Verzovací systémy, týmová kooperace a správa kódu (8 h v Gitu + 2 h v týmové spolupráci) */
export const OSS3_GIT: OutlineGroup = {
  chapterId: 'os3-git',
  chapterTitle: 'Git a verzování kódu',
  chapterDescription: 'Správa verzí v praxi: repozitář, commity, větve, GitHub a týmová spolupráce.',
  chapterTag: 'git',
  chapterPath: `${BASE}/git`,
  subjectTitle: SUBJECT,
  grade: 3,
  gradeLabel: '3. Ročník',
  thematicBlock: 'Verzovací systémy, týmová kooperace a správa kódu',
  icon: 'GitBranch',
  gradient: 'from-slate-700 to-slate-900',
  items: [
    {
      slug: 'principy',
      tag: 'GT1',
      title: 'Principy verzování: Tři zóny Gitu a první commit',
      hours: '2 h',
      subtitle: 'Repozitář, commit a historie změn bez chaosu v kopiích souborů.',
      intro: 'Názvy jako „soubor_final_v2_OPRAVENO.txt“ jsou noční můra. Git zaznamenává celou historii změn jako snímky v čase a umožňuje se kdykoliv vrátit.',
      topics: [
        'Problém ručního verzování kopií souborů a princip verzovacího systému (VCS)',
        'Architektura tří zón v Gitu: Pracovní adresář (Working Tree), Připravená oblast (Staging Area), Místní repozitář (.git)',
        'Pojem commit jako neměnný snímek projektu s autorem a zprávou',
        'Ignorování souborů v souboru .gitignore (dočasné soubory, privátní klíče)',
        'Základní konfigurace identity uživatele: git config --global user.name a user.email'
      ],
      practice: [
        'Simulace: Pohyb souboru mezi třemi oblastmi Gitu (Working -> Staging -> Commit)',
        'Praxe v OS: Inicializace prvního repozitáře git init na cvičném projektu a uložení commitu'
      ],
      builds: 'Zálohování (OSS 2) – verze vs. záloha.'
    },
    {
      slug: 'zakladni-cyklus',
      tag: 'GT2',
      title: 'Běžný pracovní cyklus, historie změn a bezpečný návrat (restore)',
      hours: '2 h',
      subtitle: 'Příkazy status, add, commit, log, porovnání diff a vrácení chybné úpravy.',
      intro: 'Běžná práce s Gitem je stále stejný spolehlivý cyklus: upravit soubor, zkontrolovat stav, připravit k uložení a potvrdit commit.',
      topics: [
        'Příkazy git status, git add (příprava souborů) a git commit -m "popis"',
        'Prohlížení historie a změn: git log (--oneline, --graph) a git diff',
        'Bezpečný návrat: zrušení neuložených úprav přes git restore a kontrola čistého stavu',
        'Dodržování konvencí commit zpráv (imperativ, stručný popis změny)'
      ],
      practice: [
        'Simulace: Odhalení, které soubory patří a nepatří do commitu',
        'Praxe v OS: Správa historie revizí, sledování diffu a vrácení chybného řádku'
      ],
      builds: 'GT1 (principy Gitu).'
    },
    {
      slug: 'vetve',
      tag: 'GT3',
      title: 'Větvení (Branches), slučování (Merge) a řešení kolizí',
      hours: '2 h',
      subtitle: 'Paralelní vývoj nových funkcí ve větvích a ruční řešení merge konfliktů.',
      intro: 'Větve umožňují vyvíjet novou konfiguraci bezpečně stranou bez ohrožení funkčního stavu. Po dokončení větev sloučíme zpět a případný konflikt vyřešíme.',
      topics: [
        'Význam větví (branches) v týmu a hlavní větev (main)',
        'Tvorba a přepínání větví: git branch, git checkout / git switch, princip feature branches',
        'Slučování větví: git merge a situace Fast-Forward',
        'Vznik a řešení konfliktu při slučování (Merge Conflict): značky v souboru a potvrzení vyřešení'
      ],
      practice: [
        'Simulace: Vizuální strom větví a simulace kolize dvou úprav na stejném řádku',
        'Praxe v OS: Vytvoření větve, záměrná kolize v souboru a její ruční oprava v editoru'
      ],
      builds: 'GT2 (pracovní cyklus).'
    },
    {
      slug: 'github',
      tag: 'GT4',
      title: 'Vzdálené repozitáře a týmová spolupráce (GitHub, SSH klíče, Pull Request)',
      hours: '2 h',
      subtitle: 'Vzdálená synchronizace (push, pull), spolupráce a revize přes Pull Request.',
      intro: 'Vzdálený repozitář propojuje členy týmu. Naučíme se odesílat změny do repozitáře, stahovat práci kolegů a bezpečně revidovat změny.',
      topics: [
        'Vzdálený repozitář (remote origin): git clone, git push, git pull',
        'Služba GitHub: propojení přes SSH klíče (navázání na SSH z Bloku 2)',
        'Pracovní postup týmu: klonování, větve, odeslání feature větve a vytvoření Pull Requestu',
        'Vzájemné code review: komentování změn na GitHubu a schválení sloučení'
      ],
      practice: [
        'Simulace: Synchronizace mezi dvěma vývojáři – řešení odmítnutého push příkazu',
        'Praxe v OS: Naklonování repozitáře, odeslání větve a vzájemná revize se spolužákem přes Pull Request'
      ],
      builds: 'GT3 (větve), SSH klíče (LX10).'
    }
  ]
};

/** Kybernetická bezpečnost – Systém a Síť (6 h) */
export const OSS3_CYBER: OutlineGroup = {
  chapterId: 'os3-cyber',
  chapterTitle: 'Kybernetická bezpečnost',
  chapterDescription: 'Základy systémové a síťové bezpečnosti: průzkum sítě a zranitelnosti, ochrana hesel a řešení incidentů.',
  chapterTag: 'cyb',
  chapterPath: `${BASE}/kyberbezpecnost`,
  subjectTitle: SUBJECT,
  grade: 3,
  gradeLabel: '3. Ročník',
  thematicBlock: 'Kybernetická bezpečnost, síťový audit a obrana',
  icon: 'ShieldCheck',
  gradient: 'from-slate-700 to-slate-900',
  items: [
    {
      slug: 'osint-nmap',
      tag: 'KB1',
      title: 'Bezpečnostní průzkum sítě, zranitelnosti (Nmap & CVE) a zákonné meze',
      hours: '2 h',
      subtitle: 'Skenování otevřených portů v laboratoři, vyhledání známých chyb v CVE a hranice toho, co je legální.',
      intro: 'Každý útok i bezpečnostní audit začíná průzkumem. V izolované síti si vyzkoušíme nástroj Nmap pro odhalení otevřených portů, dohledáme známé zranitelnosti v databázi CVE a řekneme si, kdy je skenování cizí sítě trestné.',
      topics: [
        'Základní principy bezpečnosti: CIA triáda (Důvěrnost, Integrita, Dostupnost) a stručně fáze kybernetického útoku',
        'Zákonné meze: skenování a testování pouze s povolením, základní pojem neoprávněného přístupu k počítačovému systému (trestní zákoník)',
        'Aktivní skenování nástrojem Nmap: TCP SYN sken (-sS), detekce verzí (-sV), detekce OS (-O)',
        'Vyhodnocení otevřených portů a zbytečně běžících služeb (zmenšení útočné plochy)',
        'Databáze zranitelností CVE (Common Vulnerabilities and Exposures) a kalkulátor závažnosti CVSS'
      ],
      practice: [
        'Simulace: Interaktivní Nmap – interpretace výstupu skenu a identifikace zranitelné služby',
        'Praxe v OS: Provedení auditního skenu virtuálního serveru Nmapem a dohledání CVE záznamu'
      ],
      builds: 'Firewall (OSS 2 – BZ6), Sítě a porty (OSS 1).'
    },
    {
      slug: 'hashe-a-soleni',
      tag: 'KB2',
      title: 'Ochrana hesel: hashe, solení a odolnost vůči slovníkovým testům',
      hours: '2 h',
      subtitle: 'Jednosměrné hashe, sůl, formát /etc/shadow a kontrolovaný test síly hesel.',
      intro: 'Hesla se v systémech nikdy neukládají v otevřeném textu. Prozkoumáme jednosměrné hashovací funkce, význam kryptografické soli a v kontrolovaném laboratorním prostředí ověříme, proč slabá hesla padnou během několika sekund.',
      topics: [
        'Princip jednosměrné hashovací funkce a proč prostý hash nestačí (duhové tabulky)',
        'Význam kryptografické soli (Salt) a odolnost moderních algoritmů',
        'Ukládání hesel v Linuxu: soubor /etc/shadow a formáty hashů ($6$ pro SHA-512, $y$ pro yescrypt); ve Windows databáze SAM',
        'Test síly hesel: slovníkový test vs. hrubá síla (Brute-Force), slovník RockYou.txt',
        'Defenzivní opatření: minimální délka hesla, politika hesel a vícefaktorové ověřování (MFA)'
      ],
      practice: [
        'Simulace: Hashovací laboratoř a kalkulátor prolomení hesla – porovnání 8místného vs. 15místného hesla',
        'Praxe v OS: Analýza záznamu v /etc/shadow a bezpečnostní audit cvičného seznamu slabých hashů'
      ],
      builds: 'Uživatelé a POSIX (LX3), Správa uživatelů (OSS 1 – USR1), Webový klient a hesla (OSS 2 – BZ9).'
    },
    {
      slug: 'incident-ctf',
      tag: 'KB3',
      title: 'Reakce na bezpečnostní incident a náprava kompromitovaného systému',
      hours: '2 h',
      subtitle: 'Vyšetření napadeného stroje, analýza stop, izolace útočníka a protokol o zásahu.',
      intro: 'Vrchol bezpečnostního bloku. V simulovaném napadeném prostředí studenti v roli obránců odhalí aktivitu útočníka, najdou kompromitované účty, zablokují IP na firewallu a sepíší technický protokol o nápravě.',
      topics: [
        'Metodika reakce na incident: Detekce, Izolace, Odstranění škůdce, Obnova provozu a Závěry',
        'Hledání anomálií v logu serveru (neobvyklé časy, opakované neúspěšné pokusy)',
        'Aktivní obrana: okamžité zablokování útočící IP adresy v UFW firewallu',
        'Sepsání technického protokolu o bezpečnostním zásahu a nápravná opatření'
      ],
      practice: [
        'Laboratorní cvičení: Záchranná mise na napadeném serveru ve dvojicích a nalezení bezpečnostních stop',
        'Zpracování závěrečného protokolu o zásahu s doporučeními pro zabezpečení'
      ],
      builds: 'Syntéza kyberbezpečnosti (KB1–KB2) a systémových logů (LX8).'
    }
  ]
};

/** Týmová organizace práce a Kanban (2 h) */
export const OSS3_TEAM: OutlineGroup = {
  chapterId: 'os3-tym',
  chapterTitle: 'Týmová organizace práce a Kanban',
  chapterDescription: 'Agilní řízení úkolů na Kanban nástěnce (GitHub Projects / Issues), rozpad práce a týmové role.',
  chapterTag: 'tym',
  chapterPath: `${BASE}/tymova-spoluprace`,
  subjectTitle: SUBJECT,
  grade: 3,
  gradeLabel: '3. Ročník',
  thematicBlock: 'Verzovací systémy, týmová kooperace a správa kódu',
  icon: 'FolderKanban',
  gradient: 'from-slate-700 to-slate-900',
  items: [
    {
      slug: 'kanban',
      tag: 'TM1',
      title: 'Plánování úkolů na týmové nástěnce Kanban a organizace práce',
      hours: '2 h',
      subtitle: 'Řízení práce na nástěnce (GitHub Projects / Issues), rozpad úkolů a týmová komunikace.',
      intro: 'Úspěch v IT závisí na schopnosti zorganizovat práci. Naučíme se používat týmovou nástěnku Kanban pro rozdělení úkolů v týmu a sledování postupu.',
      topics: [
        'Principy přehledného řízení úkolů v týmu: sloupce Backlog ➔ To Do ➔ In Progress ➔ Done',
        'GitHub Issues a propojení tiketů s commity a pull requesty (např. "Fix #1")',
        'Rozpad cvičného zadání na dílčí tikety v digitálních nástrojích (GitHub Projects, Trello)',
        'Rozdělení rolí a odpovědností ve dvojici či trojici'
      ],
      practice: [
        'Simulace: Týmová tabule – přesun úkolu fázemi a vazba commitu na issue tiket',
        'Praxe v OS: Založení GitHub Projects tabule, rozpad úkolů na issues a týmová koordinace'
      ],
      builds: 'GitHub a revize (GT4).'
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
