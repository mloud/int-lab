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
        month: 'Září – Listopad',
        monthKey: 'zari',
        weeks: '1.–10. týden',
        title: 'Linux: Architektura, instalace a základní správa systému',
        hours: 20,
        theoryHours: 4,
        practiceHours: 16,
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
            hours: 4,
            type: 'laborator',
            description: 'Filesystem Hierarchy Standard: význam složek /etc, /var, /home, /bin, /dev, /tmp. Příkazy pwd, cd, ls -la, cp, mv, rm -rf.',
            practice: 'Praktická navigace a tvorba stromové struktury projektu výhradně z příkazové řádky.',
            route: '/specializovana/operacni-systemy-3/linux/terminal'
          },
          {
            id: 'oss3-b1-3',
            title: 'Uživatelé, skupiny a POSIX oprávnění (chmod, chown, sudoers)',
            hours: 4,
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
        month: 'Listopad – Leden',
        monthKey: 'listopad',
        weeks: '11.–20. týden',
        title: 'Linux: Sítě, serverové služby a automatizace v shellu',
        hours: 20,
        theoryHours: 4,
        practiceHours: 16,
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
            hours: 4,
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
          },
          {
            id: 'oss3-b2-9',
            title: 'Komplexní praktická úloha: Správa linuxových služeb a automatizované zálohování',
            hours: 2,
            type: 'laborator',
            description: 'Samostatné nasazení a propojení webové služby, sdíleného adresáře Samba a automatizovaného zálohovacího skriptu s kontrolou integrity.',
            practice: 'Ověření plné funkčnosti služeb a otestování obnovy smazaných dat ze záložního archivu vytvořeného cronem.',
            route: '/specializovana/operacni-systemy-3/sluzby'
          }
        ]
      },
      {
        id: 'oss3-b3',
        order: 3,
        month: 'Únor',
        monthKey: 'unor',
        weeks: '21.–23. týden',
        title: 'Kybernetická bezpečnost, síťový audit a obrana',
        hours: 6,
        theoryHours: 1,
        practiceHours: 5,
        description: 'Základy: průzkum sítě Nmapem a zranitelnosti CVE se zákonnými mezemi, ochrana a testování hesel a řešení bezpečnostního incidentu.',
        rvpCompetence: 'Provádí základní bezpečnostní audit sítě, vysvětlí ochranu hesel pomocí hashů a soli a reaguje na bezpečnostní incident.',
        subtopics: [
          {
            id: 'oss3-b3-1',
            title: 'Bezpečnostní průzkum sítě, zranitelnosti (Nmap & CVE) a zákonné meze',
            hours: 2,
            type: 'laborator',
            description: 'CIA triáda, fáze útoku, zákonné meze testování, skenování portů nástrojem Nmap (-sS, -sV, -O) a vyhledávání v databázi CVE.',
            practice: 'Audit přiděleného cvičného serveru: nalezení otevřených portů a identifikace zastaralých služeb.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/osint-nmap'
          },
          {
            id: 'oss3-b3-2',
            title: 'Ochrana hesel: hashe, solení a odolnost vůči slovníkovým testům',
            hours: 2,
            type: 'laborator',
            description: 'Hashovací funkce, význam soli, ukládání v /etc/shadow a SAM, slovníkový test vs. hrubá síla a zásady silných hesel.',
            practice: 'Analýza záznamu v /etc/shadow a audit slabých hesel ve cvičném seznamu hashů ve virtuální laboratoři.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/hashe-a-soleni'
          },
          {
            id: 'oss3-b3-3',
            title: 'Reakce na bezpečnostní incident a náprava kompromitovaného systému',
            hours: 2,
            type: 'projekt',
            description: 'Vyšetřovací scénář na cvičném Linuxovém stroji: nalezení stop útočníka, audit logů a zablokování na firewallu.',
            practice: 'Samostatné splnění úkolů v cvičném kontejneru a sepsání protokolu o zásahu.',
            route: '/specializovana/operacni-systemy-3/kyberbezpecnost/incident-ctf'
          }
        ]
      },
      {
        id: 'oss3-b4',
        order: 4,
        month: 'Březen – Duben',
        monthKey: 'brezen',
        weeks: '24.–29. týden',
        title: 'Verzovací systémy, týmová kooperace a správa kódu',
        hours: 12,
        theoryHours: 3,
        practiceHours: 9,
        description: 'Tři zóny Gitu, větve a řešení konfliktů na Python projektu, týmová spolupráce na GitHubu s issues a týmovou nástěnkou Kanban.',
        rvpCompetence: 'Verzuje správcovské skripty v Gitu, spolupracuje v týmu přes vzdálené repozitáře a týmovou nástěnku Kanban.',
        subtopics: [
          {
            id: 'oss3-b4-1',
            title: 'Principy verzování: Tři zóny Gitu a první commit na Python projektu',
            hours: 2,
            type: 'kombinovane',
            description: 'Proč nepoužívat soubory verze_final. Zóny: Working Directory ➔ Staging Area (git add) ➔ Repository (git commit). Konfigurace .gitignore pro Python.',
            practice: 'Inicializace lokálního repozitáře git init na správcovském Python skriptu, vyloučení __pycache__ v .gitignore a první commit.',
            route: '/specializovana/operacni-systemy-3/git/principy'
          },
          {
            id: 'oss3-b4-2',
            title: 'Běžný pracovní cyklus, historie změn a bezpečný návrat (restore)',
            hours: 2,
            type: 'laborator',
            description: 'Příkazy git status, git log --oneline, git diff, porovnání změn v kódu a bezpečné vrácení úprav.',
            practice: 'Praktické sledování vývoje skriptu, zkoumání rozdílů a vrácení chybné úpravy do funkčního stavu.',
            route: '/specializovana/operacni-systemy-3/git/zakladni-cyklus'
          },
          {
            id: 'oss3-b4-3',
            title: 'Větvení (Branches), slučování (Merge) a řešení kolizí v kódu',
            hours: 2,
            type: 'laborator',
            description: 'Paralelní vývoj nových funkcí ve větvích (feature branch), sloučení větví a ruční řešení merge konfliktů v Python skriptu.',
            practice: 'Simulace kolize: dva žáci upraví stejnou část skriptu, manuálně vyřeší konflikt a úspěšně provedou merge.',
            route: '/specializovana/operacni-systemy-3/git/vetve'
          },
          {
            id: 'oss3-b4-4',
            title: 'Vzdálené repozitáře a týmová spolupráce (GitHub, SSH klíče, Pull Request)',
            hours: 2,
            type: 'laborator',
            description: 'Propojení lokálního repozitáře se vzdáleným přes SSH klíč, příkazy git push a git pull, tvorba pull requestů a vzájemné code review.',
            practice: 'Týmová spolupráce: naklonování repozitáře spolužáka, vytvoření feature větve, push a vytvoření pull requestu.',
            route: '/specializovana/operacni-systemy-3/git/github'
          },
          {
            id: 'oss3-b4-5',
            title: 'Plánování úkolů na týmové nástěnce Kanban a realizace miniprojektu',
            hours: 2,
            type: 'projekt',
            description: 'Nástěnka Kanban (GitHub Projects / Issues), sloupce Backlog ➔ In Progress ➔ Done. Vývoj týmového administračního nástroje (např. Server Health Monitor).',
            practice: 'Rozpad zadání na tikety v GitHub Projects, implementace skriptu a jeho nasazení na cvičný Linuxový server.',
            route: '/specializovana/operacni-systemy-3/tymova-spoluprace/kanban'
          },
          {
            id: 'oss3-b4-6',
            title: 'Revize historie commitů, technická dokumentace (README) a obhajoba',
            hours: 2,
            type: 'projekt',
            description: 'Závěrečná kontrola kvality repozitáře: formát commit zpráv, přehlednost větvení (git log --graph), technický návod README.md a ústní obhajoba řešení.',
            practice: 'Předvedení funkčního nasazeného skriptu na serveru a obhajoba historie commitů před vyučujícím.',
            route: '/specializovana/operacni-systemy-3/tymova-spoluprace/obhajoba'
          }
        ]
      },
      {
        id: 'oss3-b5',
        order: 5,
        month: 'Květen – Červen',
        monthKey: 'kveten',
        weeks: '30.–33. týden',
        title: 'Závěrečná reflexe tříletého kurikula, komplexní projekt a rezerva',
        hours: 8,
        theoryHours: 2,
        practiceHours: 6,
        description: 'Rekapitulace celé osy OSS 1 ➔ OSS 2 ➔ OSS 3, samostatný komplexní praktický projekt správy systémů a časová rezerva pro školní akce.',
        rvpCompetence: 'Syntetizuje znalosti Windows a Linuxu do uceleného přehledu správy operačních systémů.',
        subtopics: [
          {
            id: 'oss3-b5-1',
            title: 'Syntéza tříleté výuky: Komparace Windows a Linuxové administrace',
            hours: 2,
            type: 'kombinovane',
            description: 'Srovnávací přehled: Registry vs. /etc, Služby vs. systemd, PowerShell vs. Bash, NTFS vs. ext4, Active Directory vs. LDAP.',
            practice: 'Řešení typových srovnávacích a architektonických úloh ze správy operačních systémů.',
            route: '/specializovana/operacni-systemy-3'
          },
          {
            id: 'oss3-b5-2',
            title: 'Závěrečný komplexní projekt: Samostatný scénář správy systémů a sítí',
            hours: 4,
            type: 'laborator',
            description: 'Samostatná komplexní laboratorní úloha: instalace, konfigurace klientských a serverových služeb, nastavení zabezpečení a diagnostika.',
            practice: 'Vypracování komplexního praktického zadání, diagnostika chybového stavu a sepsání technického protokolu.',
            route: '/specializovana/operacni-systemy-3'
          },
          {
            id: 'oss3-b5-3',
            title: 'Rezerva pro školní akce a uzavření klasifikace 3. ročníku',
            hours: 2,
            type: 'kombinovane',
            description: 'Časová rezerva na sportovní a exkurzní dny školy, konzultace a celkové uzavření klasifikace.',
            practice: 'Zpětná vazba k výuce a představení návazností ve 4. ročníku.',
            route: '/specializovana/operacni-systemy-3'
          }
        ]
      }
    ]
  };
