# Pracovní plán: Operační systémy 3 (OSS 3)

**Cílový ročník:** 3. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 66 vyučovacích hodin (2 hodiny týdně, 33 týdnů)  
**Výchozí routa v IntLab:** `/specializovana/operacni-systemy-3`  
**Odpovídající profil kurikula:** [`doc/curriculum/OSS3.md`](../curriculum/OSS3.md)

---

## 🎯 Hlavní pedagogický cíl
Převést studenta z prostředí správy grafického Windows do role **správce serverového Linuxu bez GUI (headless), bezpečnostního technika a týmového správce IT**. Student spravuje operační systém čistě přes terminál (SSH), konfiguruje síťové a aplikační služby (webový server, HTTPS, sdílení pro Windows), automatizuje rutiny v Bashi a plánovači cron, ovládá verzovací systém Git a řeší síťové bezpečnostní audity i incidenty (Nmap, audit síly a solení hesel, cvičný bezpečnostní scénář).

---

## 📊 Stav realizace na portálu IntLab (5 ucelených kapitol, 26 osnov, 66 h)

| Kapitola | Tematický celek | Dotace | Stav na portálu | Odkaz na webu |
|:---:|---|:---:|:---:|---|
| **1** | **Správa Linuxu v příkazové řádce** | 20 h | ✅ Hotovo (8 aktivních podkapitol s osnovami) | `/specializovana/operacni-systemy-3/linux` |
| **2** | **Síťové služby a automatizace** | 18 h | ✅ Hotovo (8 aktivních podkapitol s osnovami) | `/specializovana/operacni-systemy-3/sluzby` |
| **3** | **Verzovací systémy a Git** | 8 h | ✅ Hotovo (4 aktivní podkapitoly s osnovami) | `/specializovana/operacni-systemy-3/git` |
| **4** | **Základy kybernetické bezpečnosti** | 6 h | ✅ Hotovo (3 aktivní podkapitoly s osnovami, zkráceno z 12 h) | `/specializovana/operacni-systemy-3/kyberbezpecnost` |
| **5** | **Týmová spolupráce a projekt** | 10 h | ✅ Hotovo (3 aktivní podkapitoly s osnovami) | `/specializovana/operacni-systemy-3/tymova-spoluprace` |
| **–** | **Rezerva a opakování** | 4 h | ✅ Rezerva pro pololetní a závěrečnou klasifikaci | – |
| **Σ** | **Celkem** | **66 h** | **100% soulad s ŠVP InspIS** | |

---

## 🔍 Detailní rozpis kapitol a podtémat (26 karet osnov)

### Kapitola 1: Správa Linuxu v příkazové řádce (`/linux`, 20 h – terminál a POSIX práva po 4 h)
* [x] **LX1 Instalace a distribuce Linuxu** (`/linux/instalace`, 2 h) – Distribuce, disky, GRUB
* [x] **LX2 Navigace a práce se soubory** (`/linux/terminal`, 4 h) – FHS hierarchie, terminál
* [x] **LX3 Práva a oprávnění (POSIX)** (`/linux/prava`, 4 h) – UGO model, chmod, chown, sudo
* [x] **LX4 Textové editory a roury** (`/linux/text-a-roury`, 2 h) – Roury, filtry grep, awk, nano
* [x] **LX5 Správa disků a oddílů** (`/linux/disky`, 2 h) – fdisk, ext4, /etc/fstab
* [x] **LX6 Procesy a monitorování systému** (`/linux/procesy`, 2 h) – ps, htop, kill, priority
* [x] **LX7 Balíčkovací systémy** (`/linux/balicky`, 2 h) – apt, dpkg, repozitáře
* [x] **LX8 Správa systémových služeb a logy** (`/linux/sluzby-a-logy`, 2 h) – systemctl, journalctl

### Kapitola 2: Síťové služby a automatizace (`/sluzby`, 18 h – skriptování se zálohou 4 h)
* [x] **LX9 Síťová konfigurace a firewall** (`/sluzby/sit-a-firewall`, 2 h) – ip, ufw, porty
* [x] **LX10 Vzdálená správa přes SSH a klíče** (`/sluzby/ssh`, 2 h) – sshd, asymetrické klíče, port 22
* [x] **LX11 Webový server Apache** (`/sluzby/apache`, 2 h) – virtual hosts, document root
* [x] **LX12 HTTPS a TLS certifikáty** (`/sluzby/https`, 2 h) – Certbot, Let's Encrypt, SSL/TLS
* [x] **LX13 Souborový server Samba** (`/sluzby/samba`, 2 h) – sdílení pro stanice Windows
* [x] **LX14 Bash skriptování – základy** (`/sluzby/bash-zaklady`, 2 h) – shebang, proměnné, parametry
* [x] **LX15 Bash skriptování – cykly a praktické skripty** (`/sluzby/bash-skripty`, 4 h) – cykly for/while, zálohovací skript
* [x] **LX16 Automatizace úloh pomocí Cronu** (`/sluzby/cron`, 2 h) – crontab, periodické zálohování

### Kapitola 3: Verzovací systémy a Git (`/git`, 8 h)
* [x] **GT1 Principy verzování a instalace Gitu** (`/git/principy`, 2 h) – 3 zóny, git init
* [x] **GT2 Základní cyklus (add, commit, status)** (`/git/zakladni-cyklus`, 2 h) – snapshoty, log
* [x] **GT3 Větvení a slučování** (`/git/vetve`, 2 h) – git branch, merge, řešení konfliktů
* [x] **GT4 Vzdálené repozitáře a týmová spolupráce** (`/git/github`, 2 h) – push, pull, revize změn

### Kapitola 4: Základy kybernetické bezpečnosti (`/kyberbezpecnost`, 6 h – zkráceno z 12 h)
* [x] **KB1 Průzkum sítě, zranitelnosti a zákonné meze** (`/kyberbezpecnost/osint-nmap`, 2 h) – Nmap, CVE/CVSS, zákonné meze testování
* [x] **KB2 Ochrana hesel: hashe, solení a slovníkové testy** (`/kyberbezpecnost/hashe-a-soleni`, 2 h) – /etc/shadow, sůl, síla hesel
* [x] **KB3 Reakce na incident a náprava** (`/kyberbezpecnost/incident-ctf`, 2 h) – vyšetřování, odstranění hrozby, náprava
* ~~Vyřazeno pro nedostatek času: právní rámec a NIS 2 jako samostatné téma, analýza provozu ve Wiresharku, samostatný audit hesel~~ (hodiny přesunuty do Linuxu)

### Kapitola 5: Týmová spolupráce a projekt (`/tymova-spoluprace`, 10 h)
* [x] **TM1 Plánování úkolů na týmové nástěnce** (`/tymova-spoluprace/kanban`, 2 h) – rozdělení rolí, sledování stavu prací
* [x] **TM2 Týmový projekt – implementace a integrace** (`/tymova-spoluprace/projekt`, 6 h) – propojení Linux + Win + Git + sítě
* [x] **TM3 Prezentace projektu a obhajoba** (`/tymova-spoluprace/obhajoba`, 2 h) – technická prezentace a obhajoba před třídou

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj)

- [ ] **Interaktivní simulátory pro OSS 3:**
  - Vytvořit terminálový trenažér Linuxového shellu (nácvik navigace, práv `chmod 755` a textových filtrů `grep`/`awk`).
  - Vytvořit interaktivní stromový vizualizátor větví v Gitu (`branch`, `commit`, `merge`).
  - Vytvořit interaktivní simulátor Nmap skenu (interpretace otevřených portů a CVE).
- [ ] **Laboratorní šablony úkolů:**
  - Příprava pracovních listů s exportem do Wordu pro laboratorní cvičení ve VirtualBoxu.
