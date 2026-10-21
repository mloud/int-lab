import type { OutlineGroup } from './outlineTypes';

const SUBJECT = 'Operační systémy 3';
const BASE = '/specializovana/operacni-systemy-3';

/** Linux – Instalace a základní správa (16 h) */
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
      slug: 'prava',
      tag: 'LX3',
      title: 'Uživatelé, skupiny a POSIX oprávnění (chmod, chown, sudo)',
      hours: '2 h',
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

/** Linux – Sítě, serverové služby a Bash skripty (16 h) */
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
      hours: '2 h',
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
        'Praxe v OS: Naprogramování automatizovaného zálohovacího skriptu pro složku webu s ošetřením chyb'
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

/** Git a verzování kódu (8 h) */
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
      title: 'Principy verzování: Tři zóny Gitu a první commit',
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
      title: 'Běžný pracovní cyklus, historie a ignorování souborů (.gitignore)',
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
      title: 'Větvení (Branches), slučování (Merge) a řešení kolizí',
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
      title: 'Vzdálené repozitáře a týmový workflow na GitHubu (Push, Pull, PR)',
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
      builds: 'GT3 (větve), SSH klíče (LX10).'
    }
  ]
};

/** Kybernetická bezpečnost – Systém a Síť (12 h) */
export const OSS3_CYBER: OutlineGroup = {
  chapterId: 'os3-cyber',
  chapterTitle: 'Kybernetická bezpečnost',
  chapterDescription: 'Systémová a síťová bezpečnost: právo a etika v IT, skenování portů Nmapem, analýza provozu ve Wiresharku, ochrana hesel a řešení incidentů.',
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
      slug: 'pravo-a-utok',
      tag: 'KB1',
      title: 'Právní a etický rámec: Trestní zákoník, NIS 2 a Cyber Kill Chain',
      hours: '2 h',
      subtitle: 'Zákonné hranice správce, směrnice NIS 2 a model Kill Chain.',
      intro: 'Správce systému musí vědět, co je legální obrana a co už trestný čin. Představíme si zákonné povinnosti, směrnici NIS 2 a fáze, kterými prochází každý kybernetický útok.',
      topics: [
        'Základní principy bezpečnosti: CIA triáda (Důvěrnost, Integrita, Dostupnost)',
        'Trestní zákoník ČR: § 230–232 (Neoprávněný přístup k počítačovému systému a nosiči informací)',
        'Zákon o kybernetické bezpečnosti a evropská směrnice NIS 2: povinnosti organizací',
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
      title: 'Bezpečnostní průzkum sítě a mapování zranitelností (Nmap & CVE)',
      hours: '2 h',
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
      builds: 'Firewall (OSS 2 – BZ6), Sítě a porty (OSS 1).'
    },
    {
      slug: 'wireshark',
      tag: 'KB3',
      title: 'Analýza síťového provozu paketovým analyzátorem (Wireshark)',
      hours: '2 h',
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
      builds: 'Sítě a diagnostika (OSS 1 – NET1, NET2), Web a SSH (LX10, LX11).'
    },
    {
      slug: 'hashe-a-soleni',
      tag: 'KB4',
      title: 'Ochrana autentizace a princip ukládání hesel v operačních systémech',
      hours: '2 h',
      subtitle: 'Jednosměrné kryptografické hashe, solení hesel a formáty v /etc/shadow a SAM.',
      intro: 'Hesla se v systémech nikdy neukládají v otevřeném textu. Prozkoumáme jednosměrné hashovací funkce (SHA-512, bcrypt), význam kryptografické soli proti duplicitám a formát hashů v Linuxu i Windows.',
      topics: [
        'Princip jednosměrné hashovací funkce (odolnost vůči inverzi a kolizím)',
        'Proč prostý hash nestačí: duhové tabulky (Rainbow Tables) a význam kryptografické soli (Salt)',
        'Ukládání hesel v Linuxu: soubor /etc/shadow a formáty hashů ($6$ pro SHA-512, $y$ pro yescrypt)',
        'Ukládání hesel ve Windows: databáze SAM, doménové NTDS.dit a NTLM hash'
      ],
      practice: [
        'Simulace: Hashovací laboratoř – vygenerování hashe ze zadaného hesla s různou solí',
        'Praxe v OS: Analýza struktury záznamu v souboru /etc/shadow a ověření hashovacího algoritmu'
      ],
      builds: 'Uživatelé a POSIX (LX3), Správa uživatelů (OSS 1 – USR1).'
    },
    {
      slug: 'slovnikove-utoky',
      tag: 'KB5',
      title: 'Audit odolnosti hesel: Slovníkové útoky a testování síly hesel',
      hours: '2 h',
      subtitle: 'Útoky hrubou silou, slovníky RockYou, nástroje John the Ripper a Hashcat.',
      intro: 'Jak útočník prolamuje uniklé databáze hashů? Pomocí slovníkových útoků a hrubé síly. V kontrolovaném laboratorním prostředí otestujeme odolnost hesel a pochopíme, proč je délka hesla důležitější než speciální znaky.',
      topics: [
        'Metody prolamování hashů: útok hrubou silou (Brute-Force) vs. slovníkový útok (Dictionary attack)',
        'Slovníky uniklých hesel (např. wordlist RockYou.txt) a mutační pravidla',
        'Nástroje pro bezpečnostní audit hesel: John the Ripper a Hashcat',
        'Defenzivní opatření: minimální délka hesla, zákaz známých hesel a vícefaktorové ověřování (MFA)'
      ],
      practice: [
        'Simulace: Kalkulátor prolomení hesla – porovnání času prolomení 8místného vs. 15místného hesla',
        'Praxe v OS: Audit cvičného seznamu slabých hashů nástrojem John the Ripper ve virtuální laboratoři'
      ],
      builds: 'Hashe a solení (KB4), Phishing a hesla (OSS 2 – BZ9).'
    },
    {
      slug: 'incident-ctf',
      tag: 'KB6',
      title: 'Reakce na bezpečnostní incident a náprava kompromitovaného systému (CTF)',
      hours: '2 h',
      subtitle: 'Vyšetření napadeného stroje, analýza stop, izolace útočníka a Incident Report.',
      intro: 'Vrchol bezpečnostního bloku. V simulovaném napadeném prostředí studenti v roli obránců odhalí aktivitu útočníka, najdou kompromitované účty, zablokují IP na firewallu a sepíší hlášení.',
      topics: [
        'Metodika reakce na incident (Incident Response): Detekce, Izolace, Odstranění, Obnova, Závěry',
        'Hledání anomálií v logu serveru (neobvyklé časy, opakované neúspěšné pokusy)',
        'Aktivní obrana: okamžité zablokování útočící IP adresy v UFW firewallu',
        'Sepsání formálního protokolu o bezpečnostním zásahu (Incident Response Report)'
      ],
      practice: [
        'Laboratorní cvičení: Záchranná mise na napadeném serveru ve dvojicích a získání bezpečnostních FLAGů',
        'Zpracování závěrečného incident reportu s doporučeními pro zabezpečení'
      ],
      builds: 'Syntéza celé kyberbezpečnosti (KB1–KB5) a systémových logů (LX8).'
    }
  ]
};

/** Týmový projekt a agilní řízení (10 h) */
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
      title: 'Agilní organizace úkolů (Kanban) a týmová komunikace',
      hours: '2 h',
      subtitle: 'Přehledné řízení práce v týmu: tabule Kanban, backlog a stavy úkolů.',
      intro: 'Úspěch v IT závisí na schopnosti domluvit se a zorganizovat práci. Naučíme se používat nástroj Kanban pro rozdělení úkolů v týmu a sledování postupu.',
      topics: [
        'Principy agilního řízení: proč se vyhnout chaotické práci a jak rozdělit projekt na etapy',
        'Nástroj Kanban: sloupce Backlog (zásobník), To Do, In Progress, Review a Done',
        'Práce s úkoly v digitálních nástrojích (GitHub Projects, Trello)',
        'Rozdělení rolí a odpovědností v 2–3členném týmu (správce Linuxu, správce Windows/AD, tester/dokumentarista)'
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
      title: 'Realizace komplexní podnikové infrastruktury (Linux + Windows + Git)',
      hours: '6 h',
      subtitle: 'Samostatná stavba smíšené podnikové infrastruktury v laboratoři.',
      intro: 'Vyvrcholení tříletého studia operačních systémů. Týmy studentů dostanou zadání reálné firmy a musí samostatně postavit a zabezpečit celou infrastrukturu.',
      topics: [
        'Komplexní zadání infrastruktury fiktivní organizace (požadavky na servery, stanice, sdílení a bezpečnost)',
        'Realizace Linuxového serveru: zprovoznění Apache intranetu, Samba sdílení s Windows a zálohovacího Bash skriptu',
        'Propojení s Windows stanicemi a doménou z 2. ročníku',
        'Zabezpečení celé infrastruktury firewallem, ověření logování a verzování konfiguračních dávek v Gitu'
      ],
      practice: [
        'Týmová laboratorní práce: Třítýdenní realizace komplexního projektu v laboratoři'
      ],
      builds: 'Syntéza všech odborných předmětů OSS 1, OSS 2 a OSS 3.'
    },
    {
      slug: 'obhajoba',
      tag: 'TM3',
      title: 'Křížový bezpečnostní audit, test záloh a ústní obhajoba projektů',
      hours: '2 h',
      subtitle: 'Demonstrace funkčního řešení, technická argumentace a zpětná vazba.',
      intro: 'Být skvělý technik nestačí – musíte umět své řešení předvést a obhájit. Každý tým představí funkční infrastrukturu a odpoví na otázky.',
      topics: [
        'Příprava technické prezentace a demonstrace funkčního systému před komisí',
        'Křížové testování záloh a odolnosti: tým A prověří bezpečnost infrastruktury týmu B',
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
