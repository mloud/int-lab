# Kurikulární profil předmětu: Operační systémy 3 & Linux (OSS 3)

---

## 1. Identifikace předmětu a časová dotace

| Parametr | Hodnota |
|---|---|
| **Název předmětu** | Operační systémy 3 |
| **Zkratka / Kód** | OSS 3 (`ops3`) |
| **Cílový ročník** | 3. Ročník SŠ (Střední odborná škola) |
| **Obor vzdělání** | 18-20-M/01 Informační technologie |
| **Týdenní hodinová dotace** | 2 hodiny týdně |
| **Celková roční dotace** | 66 vyučovacích hodin (33 týdnů výuky) |
| **Forma výuky** | Praktická administrace Linuxu a kyberbezpečnostní laboratoř (cca 25 % výklad, 75 % praktická cvičení) |
| **Výchozí routa v IntLab** | `/specializovana/operacni-systemy-3` |

---

## 2. Vazba na Rámcový vzdělávací program (RVP 18-20-M/01)

### 2.1 Odborné kompetence a očekávané výstupy RVP
Žák na konci 3. ročníku:
1. **Instaluje a spravuje operační systémy rodiny Linux** (Debian/Ubuntu Server): volí rozdělení disku na ext4 a swap, konfiguruje bootloader GRUB a orientuje se v hierarchii souborového systému FHS (`/etc`, `/var`, `/home`, `/dev`).
2. **Plně ovládá příkazový řádek a nástroje Bashe**: textové editory (nano/vim), proudové filtry (`grep`, `sort`, `uniq`), roury (`|`), přesměrování a proměnné prostředí.
3. **Spravuje uživatele a práva v Linuxu**: model UGO (`rwx`), číselná i symbolická notace `chmod 755/644`, vlastnictví `chown`, `sudo` práva a konfigurace `/etc/sudoers`.
4. **Spravuje procesy a služby přes `systemd`**: nástroje `ps`, `top`/`htop`, řízení démonů přes `systemctl`, plánování úloh přes `cron` a analýza systémových žurnálů `journalctl`.
5. **Zprovozňuje a konfiguruje síťové služby na Linuxu**: bezpečný vzdálený přístup přes SSH a UFW firewall, webový server Apache ve `/var/www/html` a sdílení dat mezi Linuxem a Windows přes Sambu (`smb.conf`).
6. **Automatizuje správu pomocí skriptů v Bashi (`.sh`)**: shebang `#!/bin/bash`, proměnné, argumenty skriptu `$1`, podmínky `if`, cykly `for` a tvorba zálohovacích skriptů.
7. **Používá verzovací systém Git**: pracovní cyklus `status`, `add`, `commit`, větvení `branch`, slučování `merge` a spolupráce na GitHubu přes Pull Requesty.
8. **Aplikuje systémovou a síťovou kyberbezpečnost**: audit portů přes Nmap, vyhledávání zranitelností v CVE/CVSS, analýza provozu ve Wiresharku a reakce na incident (Incident Response).
9. **Realizuje komplexní týmový infrastrukturní projekt**: agilní řízení přes Kanban, nasazení heterogenní sítě (Windows + Linux) a technická obhajoba.

---

## 3. Školní vzdělávací program (ŠVP)

### 3.1 Cíle předmětu
Předmět završuje tříletou osu výuky operačních systémů. Přináší nezbytnou polyvalenci správce IT přechodem na **open-source platformu Linux**, doplňuje verzování v **Gitu**, integruje bezpečnostní návyky do systémové **Kyberbezpečnosti** a završuje studium **týmovým infrastrukturním projektem**.

### 3.2 Profil absolventa předmětu
Absolvent OSS 3 dokáže samostatně:
- Nainstalovat a bezpečně administrovat Linuxový server bez grafického rozhraní (headless) přes SSH.
- Provozovat webový server Apache a sdílet data s klientskými Windows přes Sambu.
- Automatizovat správu pomocí vlastních skriptů v Bashi a plánovat je v cronu.
- Verzovat projekty a konfigurační skripty v Gitu na GitHubu.
- Provést bezpečnostní audit sítě Nmapem a analyzovat pakety ve Wiresharku.
- Spolupracovat v agilním týmu s využitím nástroje Kanban.

---

## 4. Tematický plán předmětu (Rozpis 66 hodin)

| Blok | Tematický celek | Dotace (Teorie / Cvičení) | Konkrétní učivo a výstupy žáka | Vazba na IntLab |
|:---:|---|:---:|---|---|
| **1** | **Linux: Instalace a základní správa** | 16 h (4 h / 12 h) | **LX1:** Instalace Linuxu, disky ext4/swap a bootloader GRUB.<br>**LX2:** Terminál a souborový strom FHS (`/etc`, `/var`, `/home`, `pwd`, `cd`, `ls`, `cp`, `mv`, `rm`).<br>**LX3:** Textové proudy, filtry a roury (`cat`, `less`, `>`, `\|`, `grep`, `nano`).<br>**LX4:** Uživatelé, skupiny a POSIX práva (`rwx`, `chmod 755/644`, `chown`, `sudo`).<br>**LX5:** Správa software a balíčků `apt` (repozitáře, `apt update`, `install`, závislosti).<br>**LX6:** Procesy a systémové služby `systemd` (`ps aux`, `htop`, `kill`, `systemctl`).<br>**LX7:** Systémové logy (`journalctl`) a plánovač `cron` (`crontab -e`). | `/linux/*` (LX1–LX7) |
| **2** | **Linux: Sítě, serverové služby a Bash** | 16 h (4 h / 12 h) | **LX8:** Sítě, SSH server a firewall (`ip a`, `ping`, `ssh-keygen`, `ufw`).<br>**LX9:** Webový server Apache (`apache2`, `/var/www/html`, práva www-data, port 80).<br>**LX10:** Sdílení souborů Samba Linux ↔ Windows (`smb.conf`, `smbpasswd`, UNC `\\ip\share`).<br>**LX11:** Skriptování v Bashi: základy (`#!/bin/bash`, `chmod +x`, proměnné, argumenty `$1`).<br>**LX12:** Skriptování v Bashi: podmínky a zálohy (`if`, cyklus `for`, archivace `tar`, cron).<br>**LX13:** Praktická prověrka správy Linuxu (samostatné cvičení v terminálu). | `/sluzby/*` (LX8–LX13) |
| **3** | **Git a verzování kódu** | 8 h (2 h / 6 h) | **GT1:** Proč verzovat a 3 zóny Gitu (Working, Staging, Repository, commit).<br>**GT2:** Základní pracovní cyklus (`status`, `add`, `commit`, `log`, `.gitignore`, `restore`).<br>**GT3:** Větve a řešení konfliktů (`branch`, `merge`, řešení kolizí).<br>**GT4:** Vzdálené repozitáře a GitHub (`clone`, `push`, `pull`, Pull Request). | `/git/*` (GT1–GT4) |
| **4** | **Kybernetická bezpečnost (Systém & Síť)** | 12 h (3 h / 9 h) | **KB1:** Právo v IT (§ 230–232 TrZ), NIS2 přehledně a Kill Chain.<br>**KB2:** Průzkum sítě Nmapem a mapování zranitelností (CVE, CVSS).<br>**KB3:** Analýza síťového provozu ve Wiresharku (TCP handshake, nešifrované heslo vs. HTTPS/SSH).<br>**KB4:** Praktický bezpečnostní incident a reakce (analýza logů, UFW blokování, protokol). | `/kyberbezpecnost/*` (KB1–KB4) |
| **5** | **Týmový projekt a agilní řízení** | 10 h (2 h / 8 h) | **TM1:** Agilní organizace úkolů v Kanbanu (GitHub Projects / Trello, backlog, role).<br>**TM2:** Závěrečný integrující týmový projekt (stavba smíšené sítě Linux + Windows + Git).<br>**TM3:** Prezentace a obhajoby projektů před třídou. | `/tymova-spoluprace/*` (TM1–TM3) |
| **–** | **Rezerva a uzavření klasifikace** | 4 h (0 h / 4 h) | Rezerva na svátky, školní akce, maturity a uzavření známek. | — |
| **Σ** | **Celkem** | **66 h (15 h T / 51 h C)** | **Pravidelná 2hodinová týdenní dotace (33 týdnů × 2 h)** | |

---

## 5. Mezipředmětové vazby

- **Vertikální vstup (z OSS 1 a OSS 2):** Student porovnává koncepty Windows (procesy, služby, práva NTFS, PowerShell) s jejich Linuxovými protějšky (procesy, systemd démony, POSIX práva, Bash). Znalosti z Windows domény a AD DS propojuje se síťovými službami Linuxu (Samba).
- **Horizontální vazba na Počítačové sítě (3. ročník):** Sledování paketů ve Wiresharku, TCP handshake a konfigurace SSH a UFW přímo aplikuje teoretické modely ISO/OSI a TCP/IP.

---

## 6. Mapování na portál IntLab

- Rozcestník: [`/specializovana/operacni-systemy-3`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/app/specializovana/operacni-systemy-3/page.tsx)
- Jednotné vizuální téma: Tmavý břidlicový gradient (`from-slate-700 to-slate-900`)
