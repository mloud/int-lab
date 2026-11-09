import { ThematicPlan } from './thematicPlanTypes';

export const OPS3_THEMATIC_PLAN: ThematicPlan = {
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
  };
