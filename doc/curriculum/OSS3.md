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
| **Celková roční dotace** | 68 vyučovacích hodin (34 týdnů výuky) |
| **Forma výuky** | Praktická administrace Linuxu a kyberbezpečnostní laboratoř (cca 25 % výklad, 75 % praktická cvičení) |
| **Výchozí routa v IntLab** | `/specializovana/operacni-systemy-3` |

---

## 2. Vazba na Rámcový vzdělávací program (RVP 18-20-M/01)

### 2.1 Odborné kompetence a očekávané výstupy RVP
Žák na konci 3. ročníku:
1. **Instaluje a spravuje operační systémy rodiny Linux** (Debian/Ubuntu, RHEL/Rocky), orientuje se v hierarchii souborového systému FHS (`/etc`, `/var`, `/home`, `/dev`).
2. **Plně ovládá příkazový řádek Bash**: textové editory (nano/vim), proudové filtry (`grep`, `sed`, `awk`), roury, přesměrování a proměnné prostředí.
3. **Spravuje uživatele a práva v Linuxu**: model UGO (`rwx`), číselná i symbolická notace `chmod`, vlastnictví `chown`, `sudo` práva a konfigurace `/etc/sudoers`.
4. **Spravuje procesy a služby přes `systemd`**: nástroje `ps`, `top`/`htop`, řízení démonů přes `systemctl`, plánování úloh přes `cron` a analýza systémových žurnálů `journalctl`.
5. **Konfiguruje síťová rozhraní a bezpečný vzdálený přístup**: správa SSH serveru, autentizace asymetrickými SSH klíči, SCP/SFTP přenosy, základní firewall `ufw` / `nftables`.
6. **Aplikuje komplexní principy kybernetické bezpečnosti**: mapování zranitelností (CVE, CVSS), skenování sítě (Nmap), síťová analýza (Wireshark), bezpečné heslové politiky a základy legislativy (zákon o kybernetické bezpečnosti / NIS2).
7. **Pracuje v týmu podle agilních metodik**: verzovací systém Git, větvení (Git branching), nástroje Kanban a realizace komplexního ročníkového IT projektu.

---

## 3. Školní vzdělávací program (ŠVP)

### 3.1 Cíle předmětu
Předmět završuje tříletou osu výuky operačních systémů. Přináší nezbytnou polyvalenci správce IT přechodem na **open-source platformu Linux**, integruje bezpečnostní návyky do komplexního rámce **Kyberbezpečnosti** a rozvíjí měkké i technické dovednosti **týmového řízení projektů**.

### 3.2 Profil absolventa předmětu
Absolvent OSS 3 dokáže samostatně:
- Nainstalovat a bezpečně administrovat Linuxový server bez grafického rozhraní (headless) přes SSH.
- Automatizovat úkoly v shellu Bash a plánovat jejich spouštění.
- Analyzovat síťový provoz na přítomnost anomálií a útoků.
- Spolupracovat v týmu s využitím verzovacího systému Git a nástrojů Kanban.

---

## 4. Tematický plán předmětu (Rozpis 68 hodin)

| Blok | Tematický celek | Dotace (Teorie / Cvičení) | Konkrétní učivo a výstupy žáka | Vazba na IntLab |
|:---:|---|:---:|---|---|
| **1** | **Linux: Úvod, FHS a orientace v terminálu** | 6 h (2 h / 4 h) | Historie Unixu/Linuxu, distribuce (Debian vs. RHEL), souborový strom FHS, navigace (`cd`, `ls -la`), manipulace se soubory (`cp`, `mv`, `rm`), zobrazení obsahu (`cat`, `less`), editory nano a vim. | `/linux/uvod`, `/linux/terminal` |
| **2** | **Linux: Textové filtry a roury v Bashi** | 6 h (1 h / 5 h) | Roury `\|`, přesměrování standardních proudů `stdin`, `stdout`, `stderr` (`>`, `>>`, `2>`), filtry `grep`, `sort`, `uniq`, `wc`, `cut`, `head`, `tail`. | `/linux/text-a-roury` |
| **3** | **Linux: Uživatelé, skupiny a práva (POSIX)** | 8 h (2 h / 6 h) | Soubory `/etc/passwd`, `/etc/shadow`, `/etc/group`, správa účtů (`useradd`, `groupadd`), oprávnění čtení/zápis/spuštění (rwx) pro vlastník/skupina/ostatní, příkazy `chmod` a `chown`, práva roota a `sudo`. | `/linux/prava` |
| **4** | **Linux: Balíčky, repozitáře a software** | 6 h (1 h / 5 h) | Správa balíčků v Debianu (`apt update`, `install`, `remove`), PPA repozitáře, balíčky `.deb`, kompilace ze zdrojových kódů (`tar`, `make`). | `/linux/balicky` |
| **5** | **Linux: Procesy, služby (systemd) a plánovač cron** | 8 h (2 h / 6 h) | Správa procesů (`ps aux`, `top`, `kill`, `pkill`), `systemd` architektura, řízení služeb (`systemctl start/stop/enable/status`), plánování periodických úloh `cron` a `crontab -e`, logování přes `journalctl`. | `/linux/procesy-a-sluzby`, `/linux/logy-a-cron` |
| **6** | **Linux: Sítě, SSH server a bezpečný přenos** | 8 h (2 h / 6 h) | Konfigurace síťových karet (`ip a`, `ping`, `traceroute`), instalace OpenSSH serveru, generování klíčů `ssh-keygen`, bezheslové přihlašování přes public key, přenos souborů přes `scp` a `sftp`, firewall `ufw`. | `/linux/sit-a-ssh` |
| **7** | **Kybernetická bezpečnost (Zastřešení)** | 14 h (4 h / 10 h) | Analýza zranitelností (CVE, CWE, CVSS kalkulátor), průzkum sítě a portů (Nmap), zachytávání paketů (Wireshark – TCP handshake, nešifrovaný HTTP vs. HTTPS), hardening systému, základy NIS2 a zákonné povinnosti správce. | `/bezpecnost/*` |
| **8** | **Týmová spolupráce, Git a ročníkový projekt** | 12 h (2 h / 10 h) | Verzovací systém Git (`clone`, `add`, `commit`, `push`, `pull`, větve `branch` a `merge`), řešení konfliktů, agilní řízení Kanban (Trello/GitHub Projects), realizace komplexního týmového IT projektu a jeho obhajoba. | `/tymova-spoluprace/*` |
| **Σ** | **Celkem** | **68 h (16 h T / 52 h C)** | **Pravidelná 2hodinová týdenní dotace** | |

---

## 5. Mezipředmětové vazby

- **Vertikální vstup (z OSS 1 a OSS 2):** Student porovnává koncepty Windows (procesy, služby, práva NTFS, PowerShell) s jejich Linuxovými protějšky (procesy, systemd démony, POSIX práva, Bash).
- **Horizontální vazba na Počítačové sítě (3. ročník):** Sledování paketů ve Wiresharku a konfigurace SSH a UFW přímo aplikuje teoretické modely ISO/OSI a TCP/IP.

---

## 6. Mapování na portál IntLab

- Rozcestník: [`/specializovana/operacni-systemy-3`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/app/specializovana/operacni-systemy-3/page.tsx)
- Jednotné vizuální téma: Tmavý břidlicový gradient (`from-slate-700 to-slate-900`)
- Všechny moduly pro Linux, Kyberbezpečnost a Týmovou spolupráci.
