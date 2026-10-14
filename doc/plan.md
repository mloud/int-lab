# Plán rozvoje učiva odborných předmětů (OSS & Programování)

Tento dokument slouží jako **pracovní plán a záznamník aktuálně rozpracovaných témat** pro 4 klíčové odborné předměty:
- **Operační systémy 1 (OSS 1)** – 1. ročník SŠ
- **Operační systémy 2 (OSS 2)** – 2. ročník SŠ
- **Programování a hry 1 (PRG 1)** – 1. ročník SŠ
- **Programování a hry 2 (PRG 2)** – 2. ročník SŠ

> **Pravidlo pro asistenta (AI):**  
> Vždy před zahájením práce zkontroluj:
> 1. Co je v sekci **🔥 Aktuálně rozpracováno (In Progress)**.
> 2. Zda nové téma zapadá do plánu a navazuje na to, co je zapsáno v `doc/history.md`.
> 3. Po dokončení úkolu přesuň položku do **✅ Hotovo** a aktualizuj `doc/history.md`.

---

## 🔥 Aktuálně rozpracováno (In Progress)

### 1. Operační systémy 1 (OSS 1 – 1. ročník)
- **Stav výuky:** polovina roku – právě se učí *Struktura disku* (na portálu hotovo). Další na řadě: **Správa souborů a složek** → **Příkazová řádka**.
- **Téma: Procesy** (`/specializovana/operacni-systemy/procesy`) – vytvořeno s předstihem, ve výuce přijde až po dávkových souborech.
  - [x] PR1 Úvod a vznik procesu, PR2 Stavy, PR3 Vlákna, PR-ADV Plánování CPU.
  - [ ] **Doplnit podle sylabu:** virtuální paměť (stránkování, `pagefile.sys`), Správce úloh, programy po spuštění, `tasklist` / `taskkill` (navazuje na CMD).
  - [ ] Provázat s RAM a Von Neumannem (instrukce a data v paměťových buňkách).
  - [ ] Kvíz / minihra na stavy procesu, pracovní list (PID, kód vs. data, vlákna).

### 2. Programování 1 (PRG 1 – 1. ročník)
- **Téma: Blokové programování ve Scratchi & Herní logika**
  - [x] Základní sada témat hotova (Sekvence, Proměnné, Cykly, Podmínky, Podprogramy).
  - [x] Retro projekt Raycaster 3D funkční.
  - [ ] Příprava dalších herních šablon (např. 2D bludiště, sběr mincí, skákačka).

### 3. Programování 2 (PRG 2 – 2. ročník)
- **Téma: Python a grafické aplikace (Tkinter Canvas)**
  - [x] Základní syntaktická a grafická řada 20 kapitol hotova (od printu po funkce `def`).
  - [ ] Revize navigačního rozcestníku a sjednocení podkapitol do přehledného menu.
  - [ ] Přechod na mini-projekty v Pythonu (např. animovaný míček, Pong, vykreslování fraktálů).

### 4. Operační systémy 2 (OSS 2 – 2. ročník)
- **Téma: Bezpečnost Windows 11** (`/specializovana/operacni-systemy-2/bezpecnost`)
  - [x] **BZ1 Úvod do malwaru a principy nákazy** (`/bezpecnost/malware`) – modulární architektura v `malware/` (hotovo).
  - [x] **BZ2 Správa procesů a digitální certifikáty** (`/bezpecnost/procesy-a-certifikaty`) – modulární architektura v `procesy/` (hotovo).
  - [ ] BZ3 Izolace a Sandbox (`/bezpecnost/izolace`) – další na řadě.
  - [ ] BZ4 Konfigurace Antiviru Defender (`/bezpecnost/defender`).
  - [ ] BZ5 Síťový Firewall (`/bezpecnost/firewall`).
  - [ ] BZ6 Šifrování dat a BitLocker (`/bezpecnost/sifrovani`).
  - [ ] BZ7 Účty a UAC (`/bezpecnost/uac`).
  - [ ] BZ8 Mini-CTF závěrečná práce.

### 5. Technický dluh & Refaktoring monolitů (Pravidlo 13 z AGENTS.md)
- [x] **Rozdělení obřích monolitů v Bezpečnosti (OSS 2):**
  - [x] `MalwareDetectionChapter.tsx` (3 492 řádků ➔ orchestrátor 42 řádků + podsložka `malware/` se 7 samostatnými komponentami).
  - [x] `ProcessCertificatesChapter.tsx` (2 457 řádků ➔ orchestrátor 258 řádků + podsložka `procesy/` se 4 samostatnými záložkami).
  - [x] Zavedení pravidla 13 (Modular Code Architecture) do `AGENTS.md`.
- [ ] **Backlog kandidátů na budoucí dekompozici (zatím nerozdělovat, evidováno):**
  - **Priorita 1 (nad 1 000 řádků):**
    - [ ] `OsArchitectureChapter.tsx` (1 454 řádků, OSS 1) ➔ dekompozice na `architektura/` (`ArchitectureTheoryTab`, `SyscallsSimulator`, `KernelTypesTab`, `ArchitectureQuizTab`).
    - [ ] `WindowsInstallGame.tsx` (1 352 řádků, OSS 1) ➔ dekompozice na `instalace/` (`UefiSetupSimulator`, `DiskPartitionWizard`, `OobeConfigWizard`, `installTypes.ts`).
    - [ ] `ScratchRaycasterProject.tsx` (1 194 řádků, PRG 1) ➔ dekompozice na `raycaster/` (`RaycasterCanvas`, `RaycasterMapEditor`, `raycasterEngine.ts`).
    - [ ] `OsEvolutionChapter.tsx` (1 091 řádků, OSS 1) ➔ dekompozice na `vyvoj/` (`EvolutionTimelineTab`, `FamilyTreeTab`, `evolutionData.ts`).
    - [ ] `HuffmanGame.tsx` (1 024 řádků, INF) ➔ dekompozice na `huffman/` (`HuffmanTreeCanvas`, `HuffmanTable`, `huffmanLogic.ts`).
  - **Priorita 2 (700–1 000 řádků):**
    - [ ] `BarChartsChapter.tsx` (921 řádků, INF grafy)
    - [ ] `VonNeumannGame.tsx` (895 řádků, OSS 1 hardware)
    - [ ] `ScratchConditionsChapter.tsx` (815 řádků, PRG 1)
    - [ ] `FatChapter.tsx` (791 řádků, OSS 1 FS)
    - [ ] `DiskMediaChapter.tsx` (765 řádků, OSS 1 FS)
    - [ ] `BackupCobianChapter.tsx` (740 řádků, OSS 2 zálohování)

---

## 📋 Plánované další kroky (Roadmapa témat)

### Blok OSS 1: Kompletní oficiální plán kurikula (1. ročník)

> **Stav výuky:** Jsme přesně v **polovině**! Téma *Struktura disku* je na portálu plně hotové. Téma *Procesy* je na portálu předpřipraveno.

#### 1. Část: Základy a architektura (✅ Na portálu HOTOVO)
1. [x] **Úvod, Instalace Windows 11:** Požadavky, TPM 2.0, simulátor instalace (`/instalace`).
2. [x] **Základní části PC pro OS:** CPU, RAM, SSD, HDD, sběrnice (`/hardware/von-neumann`, `/hardware/ram`).
3. [x] **Úvod do OS a architektura:** Funkce OS, kernel vs. user space, licence (OEM), typy OS (`/uvod`, `/architektura`).
4. [x] **Procvičování na test 1 & Hodnocená práce 01:** Interaktivní příprava (`/test01-rozbor`), shrnutí hardwaru, architektury a licencí (`/test01`).
5. [x] **Evoluce operačních systémů:** Historie, rodiny OS, Unix/Windows (`/vyvoj`).
6. [x] **Start systému (Boot) a Virtualizace:** UEFI, MBR/GPT, VirtualBox, snapshoty (`/boot`, `/virtualizace`).
7. [x] **Struktura disku z pohledu OS:** Sektor, cluster (alokační jednotka), FAT tabulka, MBR/GPT, fragmentace, formátování (`/souborove-systemy`).

---

#### 2. Část: Správa systému a automatizace (⏳ Následující témata k tvorbě)

8. [ ] **Správa souborů a složek (Průzkumník / GUI):**
   - Hierarchie FS, typy souborů a přípony, asociace aplikací, operace se soubory/složkami, filtrování, řazení, atributy (`R`, `H`, `A`), zástupci (`.lnk`).
   - 🧪 Interaktivní simulátor průzkumníka / filtrování a atributů.
9. [ ] **Příkazová řádka (CMD 1 – Orientace a pohyb):**
   - Spuštění CMD, syntaxe příkazů, orientace v souborovém systému: `cd`, `dir`, `tree`, `mklink`, relativní vs. absolutní cesty, význam `.` a `..`.
   - 🧪 Webový terminálový trenažér CMD (krokování a výzvy).
10. [ ] **Příkazová řádka (CMD 2 – Práce se soubory a složkami):**
   - Manipulace se soubory v CLI: `mkdir`, `rmdir`, `ren`, `del`, `move`, `copy`, `xcopy`.
   - 🧪 Interaktivní výzvy (přesuň, přejmenuj, vytvoř strukturu v terminálu).
11. [ ] **Příkazová řádka (CMD 3 – Správa počítače a roury):**
   - Práce s výstupy a textem: přesměrování (`>`, `>>`), roura (`|`), `findstr`, zjištění stavu PC (`systeminfo`), `echo`, proměnné prostředí (`%PATH%`).
   - 🧪 Simulátor řetězení příkazů přes rouru.
12. [ ] **Dávkové soubory (.BAT 1 – Hromadná správa):**
   - Co je skript `.bat` / `.cmd`, spouštění, hromadné vytváření a úklid složek, komentáře `REM`, vypnutí echa (`@echo off`).
   - 🧪 Editor a krokovací simulátor dávkového souboru.
13. [ ] **Dávkové soubory (.BAT 2 – Logika a větvení):**
   - Podmínky `if`, `if exist`, skoky `goto`, návěstí (`:START`), parametry skriptu (`%1`), jednoduchý cyklus `for`.
   - 🧪 Interaktivní ladicí nástroj skriptu.
14. [ ] **Správa procesů a paměti:** *(Na portálu předpřipraveno v `/procesy`, zbývá doplnit:)*
   - Proces, vlákno, PID, program v RAM, **virtuální paměť** (paging, `pagefile.sys`), Správce úloh (Task Manager), programy po spuštění, CLI příkazy `tasklist` a `taskkill`.
   - 🧪 Simulátor Správce úloh a správy procesů.
15. [ ] **Správa uživatelských účtů:**
   - Typy účtů (lokální vs. Microsoft účet, Standard vs. Administrator), autentizace a autorizace, vytváření účtů, profil uživatele, CLI příkaz `net user`.
   - 🧪 Simulátor vytváření účtů a přihlašování.
16. [ ] **Správa uživatelských skupin a oprávnění:**
   - Proč skupiny, vestavěné skupiny (Administrators, Users), CLI příkaz `net localgroup`, základy práv k souborům a složkám (NTFS), CLI příkaz `icacls`.
   - 🧪 Drag & drop správa skupin + kalkulátor základních práv.
17. [ ] **Správa aplikačního software:**
   - Životní cyklus aplikace, instalátory `.msi` vs. `.exe`, zdroje SW, moderní balíčkovač Windows `winget`, verzování a aktualizace.
   - 🧪 Simulátor instalace a balíčkování přes winget.
18. [ ] **Správa zařízení a ovladače:**
   - Periferní zařízení, architektura ovladačů (Drivers), Správce zařízení (`devmgmt.msc`), Plug and Play, řešení konfliktů (vykřičník ve správci).
   - 🧪 Simulátor diagnostiky hardwarových konfliktů.
19. [ ] **Plánovač úloh (Task Scheduler):**
   - Spouštění programů a `.bat` skriptů podle času a událostí, `taskschd.msc`, triggery a akce.
   - 🧪 Simulátor nastavení automatické úlohy.

---

#### 3. Část: Správa síťového připojení Windows 11 (Závěr roku)

20. [ ] **Základní síťové pojmy v OS:**
   - Paket, IP adresa (IPv4 / IPv6), maska sítě, výchozí brána, MAC adresa, DNS, role routeru, příkazy `ipconfig`, `ping`, `tracert`.
   - 🧪 Síťový vizualizér toku paketů a konfigurace adaptéru.
21. [ ] **Síťové služby a sdílení souborů:**
   - Síťové profily (Veřejná vs. Privátní síť a dopad na zjišťování), sdílení složek v síti (SMB), UNC cesta `\\PC\Slozka`, připojení síťového disku (`net use`).
   - 🧪 Simulátor sdílení a připojení síťové jednotky.
22. [ ] **Bezdrátové sítě Wi-Fi:**
   - Standardy 802.11 (Wi-Fi 4/5/6), pásma 2.4 GHz vs. 5 GHz, šíření signálu a rušení, SSID.
23. [ ] **Konfigurace a optimalizace Wi-Fi routeru:**
   - Webová administrace routeru, nastavení WAN/LAN, DHCP server na routeru, zabezpečení WPA2/WPA3 Personal, volba optimálního kanálu.
   - 🧪 Interaktivní webové rozhraní virtuálního routeru.

---

## 🗺️ OSS 2 (2. ročník) – Celoroční plán

**Princip ročníku: „Postav to a zabezpeč to.“** Spirála uvnitř ročníku: nejdřív zabezpečím **jeden lokální PC**, pak ho spravuji, pak propojím do **domény** a nakonec na něm provozuji **služby** – v každém dalším bloku se vrací „🔐 bezpečnostní okénko“.

**Laboratorní prostředí:** Žáci mají Windows 11 **Pro**, jsou **správci**, pracují ve **VirtualBoxu / izolované síti**. Pro AD a služby je potřeba VM s **Windows Server** (Evaluation).
> ⚠️ Windows Sandbox, VBS a HVCI vyžadují Hyper-V – uvnitř VirtualBoxu nemusí fungovat spolehlivě. Sandbox spouštět na hostiteli, nebo pokrýt webovým simulátorem.

**Hodnocení:** Zatím bez testu (rozhodnutí učitele 10/2026). Mini-CTF jako praktická závěrečná práce Bezpečnosti.

| # | Blok | Stav |
|---|---|---|
| 1 | Zálohování (dokončení + praktické příklady) | 🟡 částečně hotovo |
| 2 | Bezpečnost Windows 11 (lokální PC) | ⏭️ další na řadě |
| 3 | Rozšířená správa Windows | ⬜ plán |
| 4 | Active Directory a doména | ⬜ plán |
| 5 | Serverové služby | ⬜ plán |

Každá podkapitola: `FsChapterShell` se záložkami **Teorie | Simulátor | Laboratoř (pracovní list – `WorksheetLayout`, export do Wordu, bez PINu) | Kvíz**.

---

### Blok 1: Zálohování – dokončení
- [x] B1–B5 hotovo (úvod 3-2-1, manuální, systémové nástroje, cloud, Cobian) – viz `history.md`.
- [ ] Praktické příklady (zadání upřesní učitel), návrh:
  - [ ] Zálohovací skript `robocopy` (`/MIR`, `/XO`, logování) – builder příkazu + pracovní list.
  - [ ] Scénáře obnovy: „smazal jsem soubor“, „zemřel disk“, „ransomware“ – kterou zálohu a jak obnovím.
  - [ ] Výpočet místa a času: plná vs. přírůstková vs. rozdílová záloha za týden.
- **Most do bloku 2:** *„Záloha tě zachrání po útoku – teď se naučíme útoku předejít.“*

---

### Blok 2: Bezpečnost Windows 11 (lokální PC – 8 podkapitol)
**Navazuje na:** procesy a PID, Kernel vs. User space, virtualizace, boot/UEFI/GPT, FAT bez práv (OSS 1); ransomware a 3-2-1 (OSS 2 blok 1).
**Záměrně NEOBSAHUJE (patří do 3. ročníku):** CIA/právo do hloubky, pokročilý útočný OSINT a Google Dorks, CVE/CVSS zranitelnosti organizace, plná metodika NIST, útoky na AD, web (OWASP).
**Kapitola:** `bezpecnost` (`hasSubchapters: true`), nově rozděleno pro zachování středoškolské přístupnosti:

- [x] **BZ1 – Úvod do malwaru a principy nákazy** (`/bezpecnost/malware`) ✅ **HOTOVO V APLIKACI**
  - **Teorie:** Typologie malwaru (virus, červ, trojan, ransomware, spyware, rootkit), model vykonávání v CPU (procesor slepě čte instrukce z RAM bez etického soudu), práva a bezpečnostní tokeny.
  - 🧪 **Simulace 1 (Virus - Kalkulačka):** Krokování pseudoinstrukcí (1..5), injekce `FORMAT C: /Q` na řádek 3, důkaz vykonání příkazu CPU bez vědomí uživatele.
  - 🧪 **Simulace 2 (Síťový červ - 4 počítače na stole):** Scéna školního stolu se 4 počítači v síti: PC 1 (Jakub, nákaza z USB) skenuje okolí, PC 2 (firewall), PC 3 (zranitelný), lavinové šíření na PC 4.
  - 🧪 **Simulace 3 (Trojský kůň - Fasáda vs. Skrytý proces):** Fasáda lákavého programu vs. skrytý proces v OS otevírající komunikační kanál.
  - 🧪 **Simulace 4 (Ransomware - Zamykání souborů a výkupné):** Čitelná složka dokumentů ➔ tichá fáze ➔ šifrování (.LOCKED) ➔ výkupné v Bitcoinech.
  - 🧪 **Simulace 5 (Spyware & Keylogger):** Dynamické zadávání hesla – v aplikaci tečky (`••••••••`), v souboru špiona zachycené stisky v reálném čase.
  - 🧪 **Simulace 6 (Hash laboratoř):** Reálný SHA-256 v prohlížeči (Web Crypto API) s důkazem lavinového efektu a reputační kontrolou na VirusTotalu.
  - 🎯 **Ověřovací kvíz:** Didaktické otázky testující pochopení typů malwaru a chování CPU.

- [x] **BZ2 – Správa procesů a digitální certifikáty** (`/bezpecnost/procesy-a-certifikaty`) ✅ **HOTOVO V APLIKACI**
  - **Teorie přizpůsobená SŠ (s rozbalovacími rámci):**
    - Co dělá operační systém při spuštění souboru .exe (5 bezpečnostních filtrů před zavedením do CPU).
    - Rychlá forenzní analýza systému (překlepy jmen, umístění na disku, RAM/CPU, chybějící podpis).
    - Seznam procesů a zrádnost jména procesu (proč útočník volí systémová jména jako `svchost.exe`).
    - Digitální podpisy Authenticode a certifikační autority (CA) – metafora voskové pečeti, otisk prstu SHA-256.
    - Reputační obrana (VirusTotal, Smart App Control ve Windows 11).
  - 🧪 **Simulátor Sysinternals Process Explorer:** Seznam procesů, filtrování, barevná legenda, ověřené podpisy a VirusTotal integrace.
  - 🧪 **Authenticode Inspector:** Možnost modifikovat 1 bajt v binárce `notepad.exe` a sledovat selhání ověření integrity v OS.
  - 🖥️ **Praktická laboratoř (WorksheetLayout):** 8 samostatných úloh pro Windows 11 výhradně v `cmd.exe` a systémových nástrojích (žádný PowerShell), s kontextem "Proč to děláme", rozbalovací nápovědou a formulářovými vstupy:
    - *Úloha 1:* Stopování procesu `explorer.exe` v CLI (`tasklist`, filtrace).
    - *Úloha 2:* Výpis procesů s pamětí nad 100 MB v CLI (`tasklist /fi "MEMUSAGE gt 100000"`).
    - *Úloha 3:* Odhalení systémových služeb pod procesy v CLI (`tasklist /svc /fi "IMAGENAME eq svchost.exe"`).
    - *Úloha 4:* Forenzní export všech procesů do CSV a tabulková analýza anomálií v Excelu (`svchost.exe`).
    - *Úloha 5:* Odposlech a audit síťových spojení v `resmon.exe` (Whois/IPinfo, export Edge+Seznam.cz do Excelu, reflexe).
    - *Úloha 6:* Inspekce procesního stromu v Sysinternals Process Explorer (Authenticode, VirusTotal).
    - *Úloha 7:* Výpočet SHA-256 přes `certutil -hashfile notepad.exe SHA256` a VirusTotal.
    - *Úloha 8:* Audit Smart App Control (SAC) ve Windows 11.
    - Export do Wordu (.doc) a schránky pro MS Teams.
  - 🎯 **Ověřovací kvíz:** 5 otázek na procesy, certifikáty, nástroje a SAC.

- [ ] **BZ3 – Izolované prostředí a Sandbox** (`/bezpecnost/izolace`)
  - **Teorie:** Princip izolace a běhu v karanténě, Windows Sandbox (dočasný čistý OS, automatický výmaz po zavření), izolace jádra (HVCI), ochrana LSA (`lsass.exe`), místa perzistence v systému (Run klíče v Registrech, složka Po spuštění, naplánované úlohy).
  - 🧪 **Sandbox vs. Host vizualizér:** bezpečný běh škodlivého skriptu v sandboxu a důkaz neporušenosti hostitele.
  - 🧪 **Autoruns trenažér:** hledání a odstraňování podezřelých záznamů v simulovaných registrech `HKCU\...\Run`.
  - 🖥️ **Lab:** testování `.bat` skriptu ve Windows Sandboxu, hloubková analýza spouštěcích míst přes Sysinternals Autoruns, ukázka Any.run.

- [ ] **BZ3 – Konfigurace Antiviru (Microsoft Defender)** (`/bezpecnost/defender`)
  - **Teorie:** Signatury vs. heuristika vs. behaviorální analýza, cloudová ochrana v reálném čase, služby pod účtem SYSTEM, rozhraní AMSI, rizika výjimek (Exclusions), mezinárodní testovací řetězec EICAR.
  - 🧪 **Trenažér metod detekce:** výběr správného ochranného štítu pro různé scénáře nákazy.
  - 🧪 **PowerShell Defender emulátor:** `Get-MpPreference`, `Add-MpPreference -ExclusionPath`, `Start-MpScan`.
  - 🧪 **EICAR & Event Viewer mini:** simulace záchytu a vytvoření záznamu v logu (Event ID 1116/1117).
  - 🖥️ **Lab (VM):** konfigurace Defenderu přes GUI a PowerShell (`Get-MpComputerStatus`), bezpečný test řetězcem EICAR v Poznámkovém bloku, nalezení události v Prohlížeči událostí (`eventvwr.msc`), naplánování rychlého skenu.

- [ ] **BZ4 – Síťový Firewall ve Windows** (`/bezpecnost/firewall`)
  - **Teorie:** Paketový vs. stavový (stateful) firewall, směr komunikace (Inbound vs. Outbound), výchozí bezpečnostní politika (příchozí blokovat, odchozí povolit), čísla portů a protokoly (TCP/UDP/ICMP, porty 80, 443, 3389, 22), propojení portu s PID procesu (`netstat -ano`).
  - 🧪 **Firewall Packet Router Game:** stavba pravidel (blokuj ICMP ping, zablokuj odchozí `curl.exe`, povol lokální webový port) a animace průchodu/zahození paketů.
  - 🧪 **netstat trenažér:** odhalení neznámého procesu naslouchajícího na portu 4444 spojením portu a PID.
  - 🖥️ **Lab (VM):** pokročilý Windows Firewall (`wf.msc`), pravidlo blokující `ping` (ICMPv4) na sousední VM, zablokování odchozího `curl.exe`, spuštění testovacího webu (`python -m http.server 8080`) a konfigurace pravidla pro sousední VM, test otevřených portů vůči `scanme.nmap.org`.

- [ ] **BZ5 – Šifrování dat a obrana proti ransomwaru** (`/bezpecnost/sifrovani`)
  - **Teorie:** Ochrana dat v klidu (Data at Rest – krádež notebooku), šifrování celého disku (BitLocker), hardwarový čip TPM 2.0 a měřený start systému, 48místný záchranný klíč (Recovery Key), ochrana proti ransomwaru ve Windows 11: Řízený přístup ke složkám (Controlled Folder Access), automatické zálohy přes `robocopy` (propojení s blokem 1).
  - 🧪 **Krádež disku:** srovnání nešifrovaného disku (okamžité čtení) a BitLockeru (vyžadován klíč).
  - 🧪 **TPM řetězec startu:** vizualizace integrity UEFI ➔ TPM ➔ start OS (změna bootloaderu vyvolá požadavek na záchranný klíč).
  - 🧪 **Ransomware vs. Controlled Folder Access:** simulace pokusu o zašifrování dokumentů a zablokování nepovolené aplikace.
  - 🖥️ **Lab (VM):** zašifrování virtuálního VHD svazku / USB pomocí BitLocker To Go, záloha záchranného klíče, zapnutí Controlled Folder Access, zálohovací skript přes `robocopy` (`/MIR /XO /LOG`).

- [ ] **BZ6 – Správa účtů, UAC a aktualizace** (`/bezpecnost/ucty`)
  - **Navazuje na:** kapitolu Uživatelské účty a skupiny z OSS 1 – účty, skupiny a základy NTFS už znají!
  - **Teorie:** Princip nejmenších privilegií (PoLP), mechanismus UAC (rozdělení tokenu na omezený a plný, Secure Desktop bránící podvržení kliknutí), pokročilá práva NTFS (přerušení dědičnosti, explicitní Deny má přednost, vlastnictví Take Ownership, příkaz `icacls`), patch management a hromadná aktualizace přes balíčkovač `winget`.
  - 🧪 **UAC Decision simulátor:** akce uživatele ➔ vyhodnocení tokenu a typu dialogu (tichý průchod / UAC potvrzení / heslo správce).
  - 🧪 **NTFS Conflict Solver:** pokročilé řešení kolizí skupinových oprávnění a dědičnosti.
  - 🧪 **winget terminál:** nácvik příkazů auditu a aktualizace (`winget list`, `winget upgrade --all`).
  - 🖥️ **Lab (VM):** nastavení úrovní UAC, běh terminálu s právy uživatele vs. správce, správa ACL přes `icacls`, hromadná aktualizace systému v CLI (`winget upgrade --all`).

- [ ] **BZ7 – Bezpečnost na síti, hesla a OSINT** (`/bezpecnost/sit-hesla`)
  - **Teorie:** Lidský faktor a sociální inženýrství, rozpoznání phishingu (podvržené domény, naléhavost, nebezpečné přílohy), síla a entropie hesla (délka vs. složitost), dvoufaktorové ověření (MFA), databáze uniklých přihlašovacích údajů (HaveIBeenPwned a princip k-anonymity), analýza a deobfuskace skriptů v nástroji CyberChef (Base64, Hex).
  - 🧪 **Phishing Inbox Detektiv:** interaktivní vyšetřování 8 reálných podvodných e-mailů s odhalováním red flags.
  - 🧪 **Password Entropy Tester:** výpočet entropie hesel v bitech a odhad času prolomení hrubou silou.
  - 🧪 **CyberChef Mini:** vestavěný deobfuskátor v prohlížeči (převod Base64 powershell payloadu do čitelného kódu).
  - 🖥️ **Lab (Web & VM):** ověření e-mailu na HaveIBeenPwned.com, dekódování vzorového řetězce v online CyberChef, audit zabezpečení prohlížeče (DoH, cookies, certifikáty).

- [ ] **BZ8 – Závěrečná detektivka (Mini-CTF Incident Response)** (`/bezpecnost/ctf`)
  - **Teorie:** Metodika zásahu při incidentu (Detekce ➔ Izolace sítě ➔ Odstranění škůdce ➔ Čištění perzistence ➔ Protokol).
  - 🧪 **Simulovaný napadený počítač:** komplexní trenažér integrující všechny nástroje (Správce úloh, netstat, Firewall, Autoruns, Event Viewer).
    - **Úkoly / FLAGy:**
      - *FLAG 1:* Nalezení PID a názvu podvrženého běžícího procesu komunikujícího ven.
      - *FLAG 2:* Zjištění IP adresy a portu řídicího C2 serveru.
      - *FLAG 3:* Vytvoření odchozího blokovacího pravidla na firewallu.
      - *FLAG 4:* Nalezení a odstranění perzistentního záznamu v Autoruns registrech.
      - *Vzorové řešení pro učitele:* Zpřístupněno pod učitelským PINem (`OS2026`).
  - 🖥️ **Lab (Týmová VM):** reálné vyčištění připraveného napadeného virtuálního počítače ve dvojicích a sepsání protokolu incidentu.

**Technické pořadí realizace:** sdílené komponenty (`WinWindow`, `TerminalEmulator`, `ProcessTable`, `EventViewerMini`, `FirewallRuleTable`, `AutorunsList`) ➔ BZ1 ➔ … ➔ BZ8.

---

### Blok 3: Rozšířená správa Windows
**Navazuje na:** PowerShell minimum a Event Viewer z Bezpečnosti, procesy a služby (OSS 1).
- [ ] **SP1 – PowerShell do hloubky:** cmdlety, Verb-Noun, pipeline a objekty, `Get-Help`, proměnné, skripty `.ps1`, Execution Policy.
  - 🧪 PowerShell emulátor s úlohami (pipeline `Get-Process | Sort | Select`).
- [ ] **SP2 – Služby Windows:** `services.msc`, `Get-Service`, typy spuštění, účty služeb (LocalSystem, NetworkService), závislosti.
  - 🧪 Simulátor služeb (zastav službu → co přestane fungovat).
- [ ] **SP3 – Plánovač úloh:** triggery, akce, spuštění pod jiným účtem – napojení na zálohovací skript z bloku 1.
- [ ] **SP4 – Události a logy (Event Viewer do hloubky):** protokoly System / Application / Security, úrovně, filtry, vlastní zobrazení, klíčová ID (4624, 4625, 4720, 7045), audit policy.
  - 🧪 Log Detective (brute force = řada 4625 → 4624 → nová služba 7045).
  - 🔐 *Bezpečnostní okénko:* jak poznat útok z logů.
- [ ] **SP5 – Vzdálená správa:** RDP, OpenSSH Server ve Windows, přihlášení klíčem (`ssh-keygen`), WinRM / PowerShell Remoting (`Enter-PSSession`).
  - 🧪 Simulátor SSH klíčů (veřejný × soukromý klíč – navazuje na asymetrii z BZ5).

---

### Blok 4: Active Directory a doména
**Navazuje na:** lokální účty a NTFS (BZ6), PowerShell a vzdálená správa (blok 3).
- [ ] **AD1 – Workgroup × doména:** proč centrální správa, DC, Windows Server ve VM, role a funkce.
- [ ] **AD2 – Instalace a povýšení DC:** AD DS, DNS jako základ domény (proč AD bez DNS nefunguje).
  - 🧪 Simulátor vyhledání DC přes DNS (SRV záznamy).
- [ ] **AD3 – Uživatelé, skupiny, OU:** struktura OU, typy a rozsahy skupin, model AGDLP, správa přes `Active Directory Users and Computers` i PowerShell (`New-ADUser`).
  - 🧪 Drag & drop návrh OU struktury fiktivní firmy.
- [ ] **AD4 – Připojení PC do domény, profily, sdílené složky:** z lokálního sdílení (OSS 1) na doménové – práva přes doménové skupiny (AGDLP), mapování disků přes GPO, cestovní profily.
  - 🧪 Kalkulačka efektivních práv (share + NTFS + vnořené skupiny) – rozšíření NTFS Labu z OSS 1 a BZ6.
- [ ] **AD5 – Group Policy (GPO):** pořadí aplikace LSDOU, dědičnost, `gpupdate` / `gpresult`.
  - 🔐 *Bezpečnostní okénko:* zásady hesel a uzamčení účtu, vynucení Defenderu, BitLockeru a firewallu přes GPO, zakázání USB.
  - 🧪 GPO simulátor (která politika vyhraje).

---

### Blok 5: Serverové služby (Windows Server)
**Navazuje na:** doména a DNS (blok 4), firewall a porty (BZ4), služby (SP2), zálohování (blok 1).
- [ ] **SL1 – DNS a DHCP:** typy záznamů (A, CNAME, MX, SRV), zóny, DHCP rozsahy a rezervace, DORA proces.
  - 🧪 DHCP DORA animace, DNS resolver krok za krokem.
- [ ] **SL2 – Souborový server (SMB):** navazuje na sdílení z OSS 1 – nově kvóty, stínové kopie (VSS – navazuje na zálohování), Access-Based Enumeration, DFS (přehledově).
- [ ] **SL3 – Webový server (IIS):** instalace role, weby, bindings (IP / port / host header), virtuální adresáře, aplikační pooly, logy IIS.
  - 🔐 *Bezpečnostní okénko:* HTTPS a certifikát (self-signed), pravidlo firewallu 80/443, minimální oprávnění app poolu.
  - 🧪 Simulátor HTTP požadavku (DNS → TCP → HTTP → odpověď, stavové kódy).
- [ ] **SL4 – Databázový server (SQL Server Express + SSMS):** instance, režimy autentizace (Windows × SQL), databáze, tabulky, základní SQL (`SELECT`, `INSERT`), loginy × uživatelé × role.
  - 🔐 *Bezpečnostní okénko:* port 1433 jen z interní sítě, zálohování databáze (`BACKUP DATABASE`) – navazuje na blok 1.
  - 🧪 SQL pískoviště v prohlížeči.
- [ ] **SL5 – Poštovní server:** SMTP / IMAP / POP3, MX záznam, poštovní klient, cesta e-mailu (MUA → MTA → MDA).
  - 🔐 *Bezpečnostní okénko:* SPF / DKIM / DMARC (proč phishing z BZ6 může projít).
  - 🧪 Animace cesty e-mailu + analýza hlaviček e-mailu.
  - *Software upřesnit* (např. hMailServer / MailEnable ve VM).
- [ ] **SL6 – Závěrečný projekt ročníku:** mini-firma ve VirtualBoxu – DC + DNS + DHCP + web + SQL + záloha, zabezpečená podle bloku 2 (firewall, GPO, BitLocker).

---

## 🔭 Výhled: 3. ročník – Linux a Kyberbezpečnost
**Princip ročníku:** z role *správce Windows* do role *správce Linuxu* a *bezpečnostního analytika organizace*. Stejné pojmy jako ve 2. ročníku o úroveň výš (spirála) – **neduplikovat**, vždy odkázat na 2. ročník.

### Část A – Linux (protějšek Windows z 2. ročníku)
- CLI a souborový systém (FHS), práce s textem (`grep`, `pipe`).
- Uživatelé, skupiny, oprávnění `rwx`, `chmod`/`chown`, `sudo` – **srovnání s NTFS a UAC**.
- Balíčky (`apt`) – srovnání s `winget`.
- Služby a systemd (`systemctl`) – srovnání se `services.msc`.
- Logy: `journalctl`, `/var/log` – srovnání s Event Viewerem.
- SSH hardening (`sshd_config`, zákaz root loginu, fail2ban) – navazuje na SSH ve Windows.
- Firewall `ufw` / `iptables` – srovnání s `wf.msc`.
- Web (Apache/Nginx), databáze (MariaDB) – srovnání s IIS a SQL Serverem.

### Část B – Kyberbezpečnost (zastřešení Windows + Linux)
1. Myšlení útočníka: CIA triáda do hloubky, kill chain, MITRE ATT&CK, typy útočníků.
2. Právo a etika: zákon o kybernetické bezpečnosti (NIS2), NÚKIB, GDPR, § 230–232 TrZ, responsible disclosure.
3. Průzkum: OSINT, Google Dorks, Shodan, Nmap (jen izolovaná síť).
4. Zranitelnosti: CVE, CVSS, NVD, skenery (OpenVAS), řízení záplat v organizaci.
5. Bezpečnost webu: OWASP Top 10, SQL injection a XSS – **útok na vlastní IIS/SQL z 2. ročníku** (DVWA ve VirtualBoxu).
6. Kryptografie v praxi: PKI, certifikační autority, TLS, Wireshark, MITM.
7. Útoky na AD a obrana (password spraying, Kerberos – koncepčně) – navazuje na AD z 2. ročníku.
8. Centrální logování a SIEM (Windows + Linux).
9. Incident response podle NIST v plné šíři, forenzika.
10. Velké Red vs. Blue CTF na smíšené síti (Windows + Linux).

### Tabulka anti-duplicity (2. ročník → 3. ročník)
| Téma | 2. ročník | 3. ročník |
|---|---|---|
| SSH | OpenSSH ve Windows, klíče | Hardening `sshd`, fail2ban |
| Logy | Event Viewer (1 PC) | `journalctl`, SIEM |
| Oprávnění | NTFS pokročilé, UAC, AD skupiny (základy účtů, NTFS a sdílení už v **OSS 1**) | `rwx`, `sudo` |
| AD | Správa, GPO | Útoky a obrana |
| Web / SQL | Provoz, HTTPS | OWASP útoky |
| Malware / IR | Mini-CTF na 1 PC | Kill chain, NIST, Red vs. Blue |
| Právo | Pravidla laboratoře | NIS2, GDPR, TrZ |
| Phishing | Uživatel pozná podvod | Sociální inženýrství, kampaně, SPF/DKIM v praxi |

### Blok PRG 1: Následující témata
- [ ] **Algoritmizace a herní mechaniky ve Scratchi:**
  - Fyzika skoku a gravitace.
  - Kolize s překážkami a bodovací systém.
  - Klony postav pro generování nepřátel nebo střel.

### Blok PRG 2: Následující témata
- [ ] **Objektově orientované programování (OOP) v Pythonu:**
  - Třídy a objekty (`class`, `self`, `__init__`).
  - Atributy a metody na praktických příkladech.
- [ ] **Tvorba her v Pythonu (Pygame / Tkinter animace):**
  - Herní smyčka (Game loop), aktualizace stavu a překreslování.
  - Časovače (`after()` v Tkinteru).

---

## 📌 Didaktická pravidla při přidávání nového tématu
1. **Ověření návaznosti:** Každé téma musí navazovat na předchozí probíranou látku (žádné izolované skoky v pojmech).
2. **Konzistentní struktura:**
   - Teoretický úvod se srozumitelnou metaforou ze života.
   - Vizuální schéma / diagram (vycentrovaný dle pravidel z `AGENTS.md`).
   - Interaktivní simulátor, krokování kódu nebo praktické úlohy.
   - Závěrečný kontrolní kvíz nebo pracovní list.
3. **Záznam:** Po realizaci ihned aktualizovat `doc/history.md` a upravit `doc/plan.md`.
