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
- **Stav výuky a kurikula:** Portál má kompletně připravenou a provázanou strukturu témat pro celý 1. ročník:
  - [x] 1. polovina: Instalace ➔ Hardware ➔ Architektura ➔ Test 01 ➔ Evoluce ➔ Boot & Virtualizace ➔ Struktura disku.
  - [x] 2. polovina (Struktura, navigace & rozcestníky): Procesy ➔ GUI Win 11 (GUI1–GUI5) ➔ CLI a BAT (CLI1–CLI3, BAT1–BAT2) ➔ Správa uživatelů a NTFS (USR1–USR4) ➔ Správa software (SW1–SW2) ➔ Správa zařízení (DEV) ➔ Plánovač úloh (SCH).
  - [x] **Téma Procesy a paměť (`/specializovana/operacni-systemy-1/procesy`):**
    - [x] PR1: Úvod a vznik procesu (`/procesy/uvod`) – teorie RAM, badatelský list s Task Managerem, CLI `tasklist` a Process Explorerem z Sysinternals.
    - [x] PR2: Střídání procesů (Multitasking) (`/procesy/stridani`) – time-sharing, časová kvanta, registr PC, přepnutí kontextu, interaktivní krokovací simulátor CPU a PCB.
    - [x] PR3: Životní cyklus a stavy (`/procesy/stavy`) – 5 stavů (Běžící, Připravený, Čekající na I/O).
    - [x] PR4: Vlákna (Threads) (`/procesy/vlakna`) – proces vs. vlákno, sdílená paměť, vícevláknový běh.
    - [x] PR5: Virtuální paměť a stránkování (`/procesy/virtualni-pamet`) – MMU, virtuální adresy, stránky a rámce, `pagefile.sys`, simulátor výpadku stránky (Page Fault).
    - [x] PR-ADV: Pokročilá témata (`/procesy/pokrocile`) – algoritmy Round Robin, FIFO, prioritizace a alokátory paměti.
  - [x] Znalostní profil předmětu a vazba na RVP v `doc/curriculum/OSS1.md`.
- **Další krok ve vývoji OSS 1:**
  - Postupné doplňování hloubkových interaktivních simulátorů, kvízů a laboratorních pracovních listů do vytvořených podkapitol (zejména terminálový trenažér CMD, ladicí trenažér .bat skriptů a manipulace s NTFS právy).
  - Příprava závěrečného bloku klientských sítí (Síťové pojmy, SMB sdílení, Wi-Fi a konfigurace routeru).

### 2. Programování 1 (PRG 1 – 1. ročník)
- **Téma: Blokové programování ve Scratchi & Herní logika**
  - [x] Základní sada 5 témat sjednocena (Sekvence ➔ Proměnné ➔ Cykly ➔ Podprogramy ➔ Podmínky jako Lekce 5).
  - [x] Rozšíření a didaktická gradace kapitoly Podmínky (celkem 14 úloh): Úkol 11 (Validátor síly hesla jako vrchol 2. bloku), Úkol 12 (Hádání 1 pokus), Úkol 13 (Hádání v cyklu), Úkol 14 (Bankomat ATM jako syntetický závěr).
  - [x] Retro projekt Raycaster 3D funkční.
  - [ ] Příprava dalších herních šablon (např. 2D bludiště, sběr mincí, skákačka).

### 3. Programování 2 (PRG 2 – 2. ročník)
- **Téma: Python a grafické aplikace (Tkinter Canvas)**
  - [x] Základní syntaktická a grafická řada 20 kapitol hotova (od printu po funkce `def`).
  - [ ] Revize navigačního rozcestníku a sjednocení podkapitol do přehledného menu.
  - [ ] Přechod na mini-projekty v Pythonu (např. animovaný míček, Pong, vykreslování fraktálů).

### 4. Operační systémy 2 (OSS 2 – 2. ročník)
- **Téma: Bezpečnost Windows 11** (`/specializovana/operacni-systemy-1-2/bezpecnost`)
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

#### 2. Část: Správa systému a automatizace (✅ Struktura a navigace na portálu HOTOVA)

8. [x] **Správa procesů a paměti:** (`/specializovana/operacni-systemy-1/procesy`)
   - PR1 Úvod a vznik procesu, PR2 Stavy, PR3 Vlákna, PR-ADV Plánování CPU.
   - ⏳ *K doplnění do budoucna:* virtuální paměť (paging, `pagefile.sys`), Správce úloh, `tasklist` / `taskkill`.
9. [x] **Grafické rozhraní Windows 11 (GUI & Průzkumník):** (`/specializovana/operacni-systemy-1/gui`)
   - **GUI1 – Anatomie GUI a proces Explorer:** DWM (Desktop Window Manager), `explorer.exe` (plocha, taskbar, okna), restart procesu v Task Manageru.
   - **GUI2 – Průzkumník a hierarchie disku C::** Stromová struktura, systémové složky (`Windows`, `Program Files`, `Users`), profil `%USERPROFILE%`, knihovny vs. diskové složky.
   - **GUI3 – Práce se soubory, přípony a atributy:** Registr přípon souborů, nebezpečí skrytých přípon, atributy (`R`, `H`, `A`, `S`), zástupce `.lnk` vs. reálný soubor, asociace aplikací.
   - **GUI4 – Konfigurace: Nastavení vs. Ovládací panely:** Duální konfigurace Win 11 (moderní UWP Settings vs. win32 Control Panel), `Win+X` Power Menu, `ms-settings:` URI a `.cpl` applety.
   - **GUI5 – Ergonomie a efektivní práce:** Klávesové zkratky (`Win+E`, `Win+V`, `Alt+Tab`, `Win+L`, `Ctrl+Shift+Esc`), Snap Layouts, virtuální plochy, integrace schránky.
   - *(Všech 5 podkapitol vytvořeno jako přehledové kapitoly s vazbami, připraveno pro plné simulátory a pracovní listy).*

---

#### 3. Část: Příkazová řádka, automatizace a správa (⏳ Následující témata k tvorbě)

12. [x] **Příkazová řádka a dávkové soubory:** (`/specializovana/operacni-systemy-1/prikazova-radka`)
   - **CLI1 – Orientace v systému a navigace:** Spuštění CMD (UAC), přepínání disků, `cd`, `dir` (/w, /p, /o:n), absolutní a relativní cesta, `.` a `..`, doplňování přes Tab.
   - **CLI2 – Správa souborů a složek:** `mkdir`, `rmdir`, `ren`, `del`, `copy`, `move`, `xcopy`, zástupné znaky `*` a `?`, bezpečnost mazání bez Koše.
   - **CLI3 – Roury, filtry a informace o systému:** `tree`, přesměrování `>` a `>>`, roura `|`, vyhledávání `findstr`, `systeminfo`, proměnné `%USERNAME%`, `%USERPROFILE%`.
   - **BAT1 – Dávkové soubory a automatizace:** Stavba `.bat` skriptu, `@echo off`, `REM`, `pause`, proměnné `set /p`, parametry `%1`.
   - **BAT2 – Podmínky, skoky a cykly:** `if`, `if exist`, návěstí a `goto`, stavba textového menu v CMD, `%ERRORLEVEL%`, cyklus `for`.
   - *(Všech 5 podkapitol vytvořeno jako přehledové kapitoly s vazbami, připraveno pro plné simulátory a pracovní listy).*

---

#### 4. Část: Správa systému a automatizace v praxi (⏳ Následující témata k tvorbě)

13. [x] **Správa uživatelů a oprávnění:** (`/specializovana/operacni-systemy-1/uzivatele`)
   - **USR1 – Uživatelské účty a autentizace:** Autentizace vs. autorizace, lokální účet vs. Účet Microsoft, Standard vs. Správce (PoLP), systémové účty, `lusrmgr.msc` a `net user`.
   - **USR2 – Zabezpečení účtů a přihlašování:** Politika hesel, Windows Hello (PIN svázaný s TPM 2.0), zámek `Win+L`, UAC (Secure Desktop) a `netplwiz`.
   - **USR3 – Uživatelské skupiny a role:** Proč skupiny, vestavěné skupiny (`Administrators`, `Users`), tvorba vlastních skupin v `lusrmgr.msc` a CLI `net localgroup`.
   - **USR4 – Práva k souborům a složkám (NTFS):** NTFS práva vs. FAT, dědičnost (Inheritance), přednost Deny, karta Zabezpečení v GUI, CLI `icacls`, finální automatizační skript v `.bat`.
   - *(Všech 4 podkapitol vytvořeno jako přehledové kapitoly s vazbami, připraveno pro plné simulátory a pracovní listy).*

14. [x] **Správa aplikačního software:** (`/specializovana/operacni-systemy-1/software`)
   - **SW1 – Životní cyklus software a instalátory (EXE vs. MSI):** Životní cyklus, umístění na disku (`Program Files`, `AppData`), registr Windows (`regedit`), parametry tiché instalace, transakční balíčky `.msi` a `msiexec`.
   - **SW2 – Moderní správa software přes balíčkovač Winget:** Repozitář Microsoftu, `winget search`, `winget install --silent`, `winget list`, hromadná aktualizace `winget upgrade --all`, bezobslužný instalační skript `post-install.bat`.
   - *(Vytvořeno jako kapitola se 2 podkapitolami s vazbami).*

15. [x] **Správa zařízení a ovladače (Drivers):** (`/specializovana/operacni-systemy-1/zarizeni`)
   - Architektura ovladačů (Ring 0), Plug and Play (PnP), Hardware ID (VID/PID), digitální podpisy WHQL, Správce zařízení (`devmgmt.msc`), řešení konfliktů (Kód 28), správa tiskáren a tiskové fronty (`spoolsv.exe`), záloha a export ovladačů přes `pnputil`.
   - *(Vytvořeno jako přímá přehledová kapitola).*

16. [x] **Plánovač úloh a automatický provoz:** (`/specializovana/operacni-systemy-1/planovac`)
   - Autonomní provoz OS 24/7, struktura úlohy v `taskschd.msc`, Spouštěče (triggery – čas, událost, přihlášení, start PC), Akce (spuštění `.bat` skriptu), běh pod účtem `SYSTEM` bez nutnosti přihlášení, správa přes CLI `schtasks`.
   - *(Vytvořeno jako přímá přehledová kapitola).*

---

#### 5. Část: Správa síťového připojení Windows 11 (Závěr roku)

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

### Blok 3: Pokročilá konfigurace Windows (nástroje správce – 5 h)
**Role bloku:** Most propojující Bezpečnost s Active Directory.
- [x] **Přehledové stránky kapitol PK1–PK5 vytvořeny** (v kurikulu i v aplikaci):
  - **PK1 – MMC a Správa počítače:** Princip snap-inů, tvorba vlastní konzole, most k AD konzolím.
  - **PK2 – Služby Windows:** Typy spuštění (auto/manual/disabled), účty služeb, závislosti.
  - **PK3 – Prohlížeč událostí:** Protokoly System/Application/Security, filtrace, audit přihlášení (4624/4625).
  - **PK4 – Pokročilá NTFS oprávnění:** Dědičnost práv, explicitní vs. zděděná, přednost Deny, kalkulátor efektivních práv.
  - **PK5 – Místní zásady zabezpečení (`secpol.msc`):** Zásady hesel a zámek účtu na lokálním PC (předobraz GPO).

---

### Blok 4: Active Directory a doména (16 h)
**Role bloku:** Přechod od správy jednoho PC k centrální správě celé sítě / firmy.
- [x] **Přehledové stránky kapitol AD1–AD7 vytvořeny** (v kurikulu i v aplikaci):
  - **AD1 – Server a doména:** Lokální pracovní skupina vs. doména, role Windows Serveru.
  - **AD2 – DNS a řadič domény:** Instalace role AD DS, povýšení na DC, DNS jako nutná jmenná služba.
  - **AD3 – Uživatelé, skupiny a OU:** Organizační jednotky, typy skupin, model AGDLP, konzole ADUC.
  - **AD4 – Klient v doméně:** Připojení Windows 11 do domény, doménový profil, časté chyby (DNS/čas).
  - **AD5 – Sdílení a práva přes skupiny:** Sdílení na serveru, kombinace práv sdílení a NTFS přes doménové skupiny.
  - **AD6 – Group Policy (GPO):** Aplikace zásad LSDOU, dědičnost, vynucení hesel, zákaz USB, mapování disků, `gpupdate` / `gpresult`.
  - **AD7 – Záloha AD a závěrečný mini projekt:** Záloha řadiče, obnova smazaného objektu, samostatný projekt „Firma se třemi odděleními“.

---

### Blok 5: Serverové služby (Windows Server – 9 h)
**Role bloku:** Jednotný vzorec klient-server aplikovaný na klíčové služby.
- [x] **Přehledové stránky kapitol SL1–SL4 a SL-V vytvořeny** (v kurikulu i v aplikaci):
  - **SL1 – Souborový server (SMB):** Vzorec služby (server, port 445, firewall, práva, klient), mapování disků.
  - **SL2 – Vzdálená správa (RDP a SSH):** Vzdálená plocha, OpenSSH Server, přihlášení klíčem, zabezpečení portů.
  - **SL3 – Webový server (IIS):** Instalace role IIS, weby, bindings (IP/port/header), HTTPS certifikát, porty 80/443.
  - **SL4 – Tiskový server:** Sdílení tiskárny, ovladače, oprávnění pro skupiny, distribuce klientům.
  - **SL-V – Volitelné služby:** DHCP, databázový server, poštovní server (rezerva dle časových možností).

---

## 🔭 Výhled: 3. ročník – Operační systémy 3 (OSS 3)
**Princip ročníku:** z role *správce Windows* do role *správce Linuxu* a *bezpečnostního analytika organizace*, doplněné o verzování v Gitu a týmovou spolupráci v projektech.

- **Předmět:** `Operační systémy 3` (`/specializovana/operacni-systemy-1-3`, subjectId: `ops3`) – integrován do 3. ročníku kurikula.
- **Rozpad témat:**
  1. **Linux (~24 h):** LX1 (Distribuce & instalace), LX2 (Terminál & FS strom), LX3 (Text & roury), LX4 (Uživatelé & rwx), LX5 (Balíčky apt), LX6 (Procesy & systemd), LX7 (Logy & cron), LX8 (Síť & SSH).
  2. **Git a verzování (~8 h):** GT1 (Principy & 3 zóny), GT2 (Základní cyklus add/commit), GT3 (Větve & merge konflikty), GT4 (GitHub & pull requesty).
  3. **Kyberbezpečnost (~20 h):** KB1 (Útočník & právo NIS2/TrZ), KB2 (Průzkum OSINT & Nmap v laboratoři), KB3 (Zranitelnosti CVE & CVSS), KB4 (Bezpečnost webu & OWASP), KB5 (Útoky na AD & logy), KB6 (Závěrečné CTF: Red vs. Blue).
  4. **Týmová spolupráce a nástroje (~10 h):** TM1 (Kanban & Scrum), TM2 (Harmonogram & Ganttův diagram), TM3 (Komunikační nástroje & Teams/Slack), TM4 (Závěrečný týmový projekt).
- [x] **Všech 22 kapitol a podkapitol OSS 3 vytvořeno v kurikulu i routování s přehledovými stránkami.**

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
