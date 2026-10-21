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
  - [x] 1. polovina: Instalace ➔ Hardware ➔ Architektura ➔ Test 01 ➔ Evoluce ➔ Virtualizace ➔ Struktura disku & Boot.
  - [x] 2. polovina (Struktura, navigace & rozcestníky): Procesy ➔ GUI Win 11 (GUI1–GUI5) ➔ CLI a BAT (CLI1–CLI3, BAT1–BAT2) ➔ Správa uživatelů a NTFS (USR1–USR4) ➔ Správa software (SW1–SW2) ➔ Správa zařízení (DEV) ➔ Plánovač úloh (SCH).
  - [x] **Oficiální kurikulum ŠVP pro InspIS a Tematický plán (66 h):**
    - [x] Dvouzáložkový přepínač na portálu: Měsíční plán výuky (66 h) + ŠVP pro InspIS (66 h) pro OSS 1, OSS 2 i OSS 3.
    - [x] Společná charakteristika předmětu v InspIS: pravidla hodnocení žáků, klíčové kompetence, průřezová témata (`PT - ČDS`, `PT - ČSP`, `PT - ODS`).
    - [x] Vyřazení příliš teoretických témat (Round Robin, paměťové alokátory, složitá logika v .bat).
    - [x] Univerzalizace ŠVP OSS 1: vyčištění přílišných technologických specifikací (odstranění konkrétních verzí Win 11, interních názvů konzolí .msc, příkazových přepínačů a CLI výčtů ve prospěch stabilních vzdělávacích cílů).
    - [x] Trvalé uložení referenčního ŠVP SŠ Horažďovice v `doc/curriculum/HORAZDOVICE_SVP_OS.md`.
    - [x] Znalostní profily předmětů a vazba na RVP v `doc/curriculum/OSS1.md`, `OSS2.md`, `OSS3.md` a `SVP_INSPIS.md`.
    - [x] Odstranění legacy technologií MBR a BIOSu z InspIS i tematických plánů (ponechán výhradně standard tabulky oddílů GPT a firmware UEFI).
    - [x] 10. blok (Závěrečný integrující projekt klientské stanice – 8 h): Vytvořen rozcestník `/projekt` i 4 podkapitoly PRJ1–PRJ4 a zařazeno do školního kurikula v `defaultSchool.ts`. 100% soulad webu s ŠVP InspIS.
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
- **Koncepce:** Pokročilá správa a endpoint bezpečnost na **Windows 11 Pro** (66 h / 4 tematické bloky).
- [x] **Oficiální kurikulum ŠVP pro InspIS a Tematický plán (66 h):**
  - [x] 4 ucelené bloky: Správa podnikových dat a zálohování (10 h vč. diagnostického Wargame v září), Bezpečnost koncových zařízení & forenzní audit (20 h), Systémové služby & PowerShell (18 h), Síťové sdílení & centrální správa v doméně (18 h).
  - [x] Zobecněné vzdělávací cíle a výstupy bez brandových fixací pro trvalou inspekční odolnost (přenesení 2 h z opakování do PowerShellu, zjednodušení šifrování záloh na ochranu archivů heslem a šifrováním).
  - [x] Integrováno v `registry/curriculum/svpData.ts`, `doc/curriculum/SVP_INSPIS.md`, `doc/curriculum/OSS2.md` a v tematickém plánu `/specializovana/operacni-systemy-2/tematicky-plan`.
- **Kapitoly na portálu:**
  - [x] **BZ1 Úvod do malwaru a principy nákazy** (`/bezpecnost/malware`) – modulární architektura v `malware/` (hotovo).
  - [x] **BZ2 Správa procesů a digitální certifikáty** (`/bezpecnost/procesy-a-certifikaty`) – modulární architektura v `procesy/` (hotovo).
  - [ ] BZ3 Izolace a Sandbox (`/bezpecnost/izolace`) – další na řadě.
  - [ ] BZ4 Konfigurace Antiviru Defender (`/bezpecnost/defender`).
  - [ ] BZ5 Síťový Firewall (`/bezpecnost/firewall`).
  - [ ] BZ6 Šifrování dat a BitLocker (`/bezpecnost/sifrovani`).
  - [ ] BZ7 Účty a UAC (`/bezpecnost/uac`).
  - [ ] BZ8 Mini-CTF závěrečná práce.

### 5. Operační systémy 3 (OSS 3 – 3. ročník)
- **Koncepce:** Serverový Linux, shell automatizace, síťová kyberbezpečnost, Git a agilní týmový projekt (66 h / 5 tematických bloků).
- [x] **Oficiální kurikulum ŠVP pro InspIS a Tematický plán (66 h):**
  - [x] 5 ucelených bloků: Linux správa systému (16 h), Linux sítě, služby & automatizace v shellu (16 h), Kybernetická bezpečnost & síťový audit (12 h), Verzovací systémy, týmová kooperace & infrastrukturní projekt (18 h: Git 6 h + Kanban/komunikace 2 h + projekt 8 h + obhajoba 2 h), Závěrečná reflexe & rezerva (4 h).
  - [x] Zahrnutí verzovacího systému (Git) a nástrojů pro plánování a týmovou komunikaci (Kanban, backlog).
  - [x] Integrováno v `registry/curriculum/svpData.ts`, `doc/curriculum/SVP_INSPIS.md`, `doc/curriculum/OSS3.md` a v tematickém plánu `/specializovana/operacni-systemy-3/tematicky-plan`.

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
6. [x] **Virtualizace:** Typ 1 a 2 Hypervisory, virtuální stroje vs. kontejnery (`/virtualizace`).
7. [x] **Struktura disku a Start systému (Boot) z pohledu OS:** Sektor, cluster (alokační jednotka), FAT tabulka, MBR/GPT, fragmentace, formátování a start systému / Boot (`/souborove-systemy`, `/souborove-systemy/boot`).

---

#### 2. Část: Správa systému a automatizace (✅ Struktura a navigace na portálu HOTOVA)

8. [x] **Správa procesů a paměti:** (`/specializovana/operacni-systemy-1/procesy`)
   - **PR1 – Úvod a vznik procesu:** (`/procesy/uvod`) – Teorie Von Neumann (Instrukce vs. Data), PCB, paměťová izolace; kompletní 7-úlohový badatelský pracovní list (Task Manager, Edge multimédia, CLI `tasklist`, filtrování `gt`/`lt`, dvě instance, Process Explorer strom PPID, program vs. proces v RAM).
   - **PR2 – Střídání procesů (Multitasking):** (`/procesy/stridani`) – Time-sharing, časová kvanta, registr PC, Context Switch, interaktivní krokovací simulátor CPU & PCB.
   - **PR3 – Životní cyklus a stavy:** (`/procesy/stavy`) – 5 stavů procesu (Běžící, Připravený, Čekající na I/O...).
   - **PR4 – Vlákna (Threads):** (`/procesy/vlakna`) – Těžký proces vs. lehká vlákna, sdílená paměť, vícevláknový běh her.
   - **PR5 – Virtuální paměť a stránkování:** (`/procesy/virtualni-pamet`) – Virtuální adresní prostor, MMU, stránky a rámce, `pagefile.sys`, simulátor výpadku stránky (Page Fault).
   - **PR-ADV – Pokročilá témata:** (`/procesy/pokrocile`) – Algoritmy plánování (Round Robin, FIFO), prioritizace procesů.
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

#### 5. Část: Správa síťového připojení a LAN (✅ Struktura a navigace na portálu HOTOVA)

17. [x] **Síťová konfigurace a lokální sítě (LAN):** (`/specializovana/operacni-systemy-1/site`)
   - **NET1 – Síťové adaptéry, MAC vs. IP a ipconfig:** (`/site/adaptery-a-ip`) – Správce zařízení (`devmgmt.msc`), síťová připojení `ncpa.cpl`, fyzická MAC adresa vs. logická IPv4, maska podsítě, dynamické DHCP vs. statická IP, CLI `ipconfig`, `ipconfig /all`, `/release`, `/renew`.
   - **NET2 – Diagnostika spojení a cesta paketu (Ping & Tracert):** (`/site/diagnostika-a-ping`) – Vrstvený diagnostický žebříček pingu (`127.0.0.1` -> vlastní IP -> brána -> `8.8.8.8` -> DNS doména), RTT zpoždění v ms, ztráta paketů, TTL, trasování cesty `tracert`, diagnostika příčin výpadků.
   - **NET3 – Profily sítě Windows, Wi-Fi a sdílení v LAN:** (`/site/profily-sdileni-wifi`) – Veřejná vs. Privátní síť, chování Windows Firewallu, sdílení složek a tiskáren, Wi-Fi pásma (2.4/5 GHz), SSID beaconing, WPA2-Personal vs. WPA3-SAE, CLI `netsh wlan show interfaces / networks`.
   - **NET4 – Praktická laboratoř: Konfigurace Wi-Fi routeru:** (`/site/router-laborator`) – SOHO Wi-Fi router (4 v 1), hard reset do továrního nastavení, webová administrace, změna hesla správce, DHCP rozsah a statické rezervace, WPA2/WPA3 zabezpečení, izolovaná Guest síť a limity MAC filteringu.
   - *(Všech 4 podkapitol s rozcestníkem vytvořeno dle standardních šablon portálu IntLab).*

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

### Blok 3: Pokročilá konfigurace Windows a PowerShell (10 h)
**Role bloku:** Nástroje administrátora – přechod od klikání k PowerShellu, registr a diagnostika.
- [x] **Přehledové stránky kapitol PK1–PK5 vytvořeny** (v kurikulu i v aplikaci):
  - **PK1 – MMC a Služby Windows:** Princip snap-inů, tvorba vlastní konzole, správa služeb na pozadí pod účtem SYSTEM, typy spouštění, obnova po havárii.
  - **PK2 – PowerShell základy a roury:** Objektový model .NET, syntaxe Sloveso-PodstatnéJméno, cmdlety `Get-Command`/`Get-Help`, roura objektů `|`, filtrace `Where-Object` a `Select-Object`.
  - **PK3 – Automatizace správy v PowerShellu:** Hromadná správa služeb a procesů, práce se soubory, psaní a spouštění skriptů `.ps1`, bezpečnostní politika `ExecutionPolicy`.
  - **PK4 – Systémový registr a řešení chyb:** Účel registru, soubory hives v System32, větve HKLM a HKCU, typy hodnot REG_SZ a REG_DWORD, zálohování a export `.reg`.
  - **PK5 – Prohlížeč událostí a audit (Event Viewer):** Protokoly System, Application a Security, úrovně událostí, klíčová Event ID (4624 login, 4625 brute-force, 6006 vypnutí), tvorba vlastních filtrů.

---

### Blok 4: Síťové serverové služby a infrastruktura (12 h)
**Role bloku:** Základní infrastruktura podnikové sítě – nezbytný základ před instalací domény.
- [x] **Přehledové stránky kapitol SL1–SL6 vytvořeny** (v kurikulu i v aplikaci):
  - **SL1 – DHCP server (Automatická konfigurace sítě):** 4fázový proces DORA, instalace role DHCP Server na Windows Serveru, konfigurace rozsahu (Scope), Lease time a statické rezervace pro tiskárny.
  - **SL2 – DNS server (Překlad jmen a páteř sítě):** Hierarchie DNS, dopředné zóny, záznamy A, CNAME, PTR, diagnostika `nslookup`, vymazání cache `ipconfig /flushdns`, nezbytnost pro Active Directory.
  - **SL3 – Souborový server (SMB):** Protokol SMB, UNC cesty `\\Server\Slozka`, kombinace oprávnění sdílení a NTFS, mapování jednotky `net use`, administrativní sdílení `C$`.
  - **SL4 – Vzdálená správa (RDP a OpenSSH):** Vzdálená plocha RDP na portu 3389, NLA autentizace, OpenSSH Server na Windows, pravidla firewallu pro vzdálený přístup.
  - **SL5 – Webový server (IIS):** Instalace role Web Server IIS, výchozí kořen `C:\inetpub\wwwroot`, vazby portů 80 (HTTP) a 443 (HTTPS), SSL/TLS certifikát.
  - **SL6 – Databázový server (MS SQL Server):** Instalace SQL Server Express, služba MSSQLSERVER a účty služeb, povolení TCP/IP na portu 1433 v SQL Configuration Manageru, Windows Authentication a zálohování do `.bak`.

---

### Blok 5: Active Directory a centrální správa (14 h)
**Role bloku:** Přechod od správy jednoho PC k centrální správě celé podnikové sítě.
- [x] **Přehledové stránky kapitol AD1–AD7 vytvořeny** (v kurikulu i v aplikaci):
  - **AD1 – Windows Server a co je doména:** Limity pracovní skupiny, princip domény a AD DS, role řadiče domény (DC), prostředí Správce serveru.
  - **AD2 – Povýšení na řadič domény (DC):** Průvodce povýšením, vytvoření lesa a domény (FQDN), heslo DSRM, vazba na DNS a automatická tvorba SRV záznamů ve složce `_msdcs`.
  - **AD3 – Organizační jednotky (OU) a doménové účty:** Konzole `dsa.msc`, logická struktura firmy do OU, tvorba doménových uživatelů, politika hesel a uzamčení účtu (Account Lockout).
  - **AD4 – Skupiny a přístupová práva (Prakticky):** Srozumitelný model *Uživatel ➔ Skupina ➔ Práva na sdílení* (bez teoretického AGDLP), efektivní přístup k datům oddělení.
  - **AD5 – Připojení klienta Windows 11 do domény:** Konfigurace DNS klienta na DC, dialog připojení stanice do domény, přihlášení doménovým účtem, doménový uživatelský profil.
  - **AD6 – Group Policy (GPO):** Aplikace zásad na OU, zákaz USB flash disků, jednotná tapeta plochy, automatické připojení síťového disku oddělení, `gpupdate /force` a `gpresult /r`.
  - **AD7 – Závěrečný integrující projekt: Podniková síť:** Samostatné zprovoznění malé firmy (Server s DHCP + DNS + AD ➔ připojený klient ➔ 2 oddělení ➔ zabezpečené složky ➔ funkční GPO restrikce) přesně dle modelu SŠ Horažďovice.

---

## 🔭 Výhled: 3. ročník – Operační systémy 3 (OSS 3)
**Princip ročníku:** z role *správce Windows* do role *správce Linuxu* a *bezpečnostního analytika organizace*, doplněné o verzování v Gitu a týmovou spolupráci v projektech.

- **Předmět:** `Operační systémy 3` (`/specializovana/operacni-systemy-3`, subjectId: `ops3`, 66 h) – integrován do 3. ročníku kurikula.
- **Rozpad témat (Celkem 66 h = 33 týdnů × 2 h):**
  1. **Linux – Instalace a základní správa (16 h):** LX1 (Instalace, disky ext4/swap a GRUB), LX2 (Terminál & FHS strom), LX3 (Text & roury), LX4 (Uživatelé & POSIX práva), LX5 (Balíčky apt), LX6 (Procesy & systemd), LX7 (Logy journalctl & cron).
  2. **Linux – Sítě, serverové služby a Bash (16 h):** LX8 (Sítě & SSH/UFW), LX9 (Webový server Apache), LX10 (Sdílení souborů Samba Linux ↔ Windows), LX11 (Bash základy, shebang & proměnné), LX12 (Bash podmínky & zálohovací skript), LX13 (Praktická prověrka správy Linuxu).
  3. **Git a verzování kódu (8 h):** GT1 (Principy & 3 zóny), GT2 (Základní cyklus add/commit), GT3 (Větve & merge konflikty), GT4 (GitHub & pull requesty).
  4. **Kybernetická bezpečnost (12 h):** KB1 (Právo v IT & Kill Chain), KB2 (Skenování sítě Nmap & CVE zranitelnosti), KB3 (Analýza síťového provozu Wireshark – TCP handshake, nešifrovaná hesla), KB4 (Praktický bezpečnostní incident a reakce).
  5. **Týmový projekt a agilní řízení (10 h):** TM1 (Agilní organizace úkolů v Kanbanu – GitHub Projects / Trello), TM2 (Závěrečný integrující týmový projekt – Linux + Windows + Git + automatizace), TM3 (Prezentace a obhajoby).
- **Rezerva na svátky a uzavření klasifikace:** 4 h.
- [x] **Všech 5 hlavních kapitol a 20 podkapitol OSS 3 vytvořeno v kurikulu, routování i v aplikaci s přehledovými stránkami.**

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
