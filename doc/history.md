# Pedagogická a technická historie odborných předmětů (OSS & Programování)

Tento dokument slouží jako **trvalá paměť a přehled probraného učiva**, didaktické struktury a technického stavu kapitol v odborných předmětech portálu IntLab:
- **Operační systémy 1 (OSS 1)** – 1. ročník SŠ
- **Operační systémy 2 (OSS 2)** – 2. ročník SŠ
- **Programování a hry 1 (PRG 1)** – 1. ročník SŠ (Scratch & Herní engine)
- **Programování a hry 2 (PRG 2)** – 2. ročník SŠ (Python & Grafika Tkinter)

> **Pravidlo pro asistenta (AI):**  
> Vždy než začneš tvořit novou lekci, simulátor nebo test, **prostuduj tento soubor**, abys věděl, jaké pojmy a principy již žáci znají, jaké komponenty existují a jak nová témata logicky navazují na předchozí výuku.

---

## 1. Přehled odborných předmětů a routování

| Kód | Předmět | Ročník | Výchozí routa v aplikaci | Registr v kurikulu |
|---|---|---|---|---|
| **OSS 1** | Operační systémy 1 | 1. Ročník SŠ | `/specializovana/operacni-systemy` | `id: 'ops1'` |
| **OSS 2** | Operační systémy 2 | 2. Ročník SŠ | `/specializovana/operacni-systemy-2` | `id: 'ops2'` |
| **PRG 1** | Programování a hry 1 | 1. Ročník SŠ | `/specializovana/programovani` | `id: 'prg1'` |
| **PRG 2** | Programování a hry 2 | 2. Ročník SŠ | `/specializovana/programovani-2` | `id: 'prg2'` |

---

## 2. Detailní stav kapitol – OSS 1 (1. Ročník)

### Blok 1: Úvod do počítače a OS
1. **Instalace OS** (`/specializovana/operacni-systemy/instalace`)
   - **Formát:** Interaktivní simulátor instalace Windows 11 (`Win11InstallSimulator.tsx`).
   - **Didaktika:** Žáci si projdou UEFI volby, rozdělení disku při instalaci, licence a prvotní nastavení.
2. **Základy hardwaru pro OS** (`/specializovana/operacni-systemy/hardware`) – *Podkapitoly:*
   - **2.1 Von Neumannova architektura** (`/hardware/von-neumann`):
     - **Komponenty:** `VonNeumannGame.tsx` + `VonNeumannTheory.tsx`
     - **Obsah:** Přehledový centrální diagram architektury (CPU, ALU, Řadič, RAM, Vstup, Výstup), sběrnice (zjednodušené na datovou a adresní), zřetelné kontrastní popisky spojů, rozbalovací blok Fetch-Decode-Execute cyklu pro pokročilé žáky, interaktivní simulátor krokování instrukce.
   - **2.2 Operační paměť RAM** (`/hardware/ram`):
     - **Komponenta:** `RamSimulatorChapter.tsx`
     - **Obsah:** Adresace paměťových buněk, uložení instrukcí a proměnných v paměti.
   - *Poznámka k návaznosti:* Von Neumann je řazen jako první (teoretický základ), RAM následuje jako detailnější pohled na paměťový subsystém.
3. **Úvod do OS** (`/specializovana/operacni-systemy/uvod`)
   - **Komponenta:** `OsIntroChapter.tsx`
   - **Obsah:** Vrstvený model počítače (společný rámec Operační systém obalující User Space s aplikacemi i Kernel Space s jádrem a ovladači, pod nimi Hardware), základní funkce a role operačního systému.
4. **Architektura OS** (`/specializovana/operacni-systemy/architektura`)
   - **Komponenta:** `OsArchitectureChapter.tsx`
   - **Obsah:** Architektura OS jako stavební plán, spojovací schéma navazující na model z Úvodu (User Space vs. Kernel Space), architektonická otázka umístění modulů, monolitické jádro, mikrojádro, hybridní OS, ovladače zařízení (drivers), hardwarové kruhy (Protection Rings 0-3).

### Příprava a hodnocení 1. bloku:
5. **Procvičování na test 1** (`/specializovana/operacni-systemy/test01-rozbor`)
   - **Komponenty & Architektura:** Modulární struktura v `components/specializovana/operacni-systemy/test01-rozbor/` (`TestReviewQuiz.tsx` a `testReviewData.ts`).
   - **Obsah a didaktika:** 11 interaktivních reflexních otázek typu ABCD pokrývajících 1:1 témata z písemné práce (Hardware, UEFI, zjednodušený Von Neumann s CPU a sdílenou RAM, části programu v RAM, definice OS, 3 patra počítače, typologie OS, OEM licence, Monolit vs. Mikrojádro, Ring 0 vs. Ring 3, volba jádra letadlo vs. TV).
   - **Funkce:** Okamžité vyhodnocení volby, barevná zpětná vazba (zelená/červená), vysvětlující didaktické karty u každé otázky, rychlá skoková lišta 1..11, přepínání mezi krokováním po jedné otázce a zobrazením všech otázek najednou, ukládání stavu do `localStorage`.
6. **Hodnocená práce 01** (`/specializovana/operacni-systemy/test01`)
   - **Komponenta:** `OsSummaryWorksheet.tsx` (obaleno v `TestWorksheetShell`).
   - **Přístupové PINy:** Studentský PIN **`ZAK2026`**, Učitelský PIN **`OS2026`**.
   - **Prověřovaná témata:** Hardware & Von Neumann (CPU, RAM, disk; rozdělení RAM na instrukce a data/proměnné), role kernelu, licence se zvláštním důrazem na vlastnosti OEM licence.

### Blok 2: Evoluce a běh systému
7. **Evoluce OS** (`/specializovana/operacni-systemy/vyvoj`) – `OsEvolutionChapter.tsx`: Historie OS, Unix rodina, DOS, Windows NT, Linux.
8. **Start systému (Boot)** (`/specializovana/operacni-systemy/boot`) – `OsBootChapter.tsx`: BIOS/UEFI, POST test, MBR/GPT bootloader, předání řízení kernelu.
9. **Virtualizace** (`/specializovana/operacni-systemy/virtualizace`) – `VirtualizationChapter.tsx`: Typ 1 a 2 Hypervisory, virtuální stroje vs. kontejnery.

### Blok 3: Souborové systémy a disky
10. **Souborový systém a disky** (`/specializovana/operacni-systemy/souborove-systemy`) – *Podkapitoly:*
   - **FS1 Úvod a architektura** (`/souborove-systemy/uvod`): Role FS, sjednocený vrstvený model OS (User Space -> Syscall -> Kernel Space s FS a ovladačem -> Hardware s mřížkou sektorů), abstrakce souborů a složek.
   - **FS2 Paměťová média** (`/souborove-systemy/media`): Plotnový HDD (stopy, sektory, cylindry) vs. SSD (NAND buňky).
   - **FS3 Dělení disku** (`/souborove-systemy/deleni-disku`): Oddíly, MBR vs. GPT, boot oddíl, svazky.
   - **FS4 Systém souborů (FAT)** (`/souborove-systemy/alokace-fat`): FAT tabulka, klastry, řetězení clusterů, vnitřní fragmentace, smazaná data.
   - **FS5 Fragmentace a údržba** (`/souborove-systemy/fragmentace`): Vnější fragmentace HDD, defragmentace, proč se SSD nedefragmentuje (TRIM), oprava sektorů (`chkdsk`).
   - **FS6 Architektura v praxi** (`/souborove-systemy/cteni-souboru`): Simulace toku dat při čtení (Aplikace -> OS -> FAT -> Čtení klastrů z disku).
   - **FS-ADV Pokročilá témata** (`/souborove-systemy/pokrocile`): Alokační strategie (First Fit, Best Fit, Worst Fit).

### Blok 4: Procesy a správa paměti
10. **Procesy a paměť** (`/specializovana/operacni-systemy/procesy`) – *Podkapitoly:*
    - **PR1 Úvod a vznik procesu** (`/procesy/uvod`): `ProcessIntroChapter.tsx` (Program na disku vs. proces v RAM, identifikace PID, kód a data).
    - **PR2 Životní cyklus a stavy** (`/procesy/stavy`): `ProcessStatesChapter.tsx` (Nový, Běžící / Running, Připravený / Ready, Čekající / Blocked na I/O, Ukončený).
    - **PR3 Vlákna (Threads)** (`/procesy/vlakna`): `ProcessThreadsChapter.tsx` (Proces vs. vlákno, sdílená paměť, moderní vícejádrová CPU).
    - **PR-ADV Pokročilá témata** (`/procesy/pokrocile`): `AdvancedProcessTopicsChapter.tsx` (Plánování CPU: Round Robin, FIFO/FCFS, prioritní plánování, kontextové přepínání).

### Blok 5: Grafické rozhraní Windows 11 (GUI a Průzkumník)
11. **Grafické rozhraní Windows 11** (`/specializovana/operacni-systemy/gui`) – *Podkapitoly:*
    - **GUI1 Anatomie GUI a proces Explorer** (`/gui/anatomie`): Správce oken DWM, kompozice plochy přes GPU, proces `explorer.exe` (plocha, taskbar, okna, správa souborů), praktický restart zamrzlého Průzkumníka v Task Manageru.
    - **GUI2 Průzkumník a hierarchie disku C:** (`/gui/hierarchie`): Stromový model od kořene `C:\`, systémové složky (`Windows`, `System32`, `Program Files`, `ProgramData`, `Users`), uživatelský profil `%USERPROFILE%`, rozdíl mezi virtuální knihovnou a fyzickou diskovou složkou.
    - **GUI3 Práce se soubory, přípony a atributy** (`/gui/soubory-atributy`): Registr přípon a nebezpečí skrytých přípon (např. malware `faktura.pdf.exe`), základní atributy souborů (`R`, `H`, `A`, `S`), zástupce `.lnk` vs. fyzický soubor, asociace aplikací ve Windows.
    - **GUI4 Konfigurace: Nastavení vs. Ovládací panely** (`/gui/konfigurace`): Dvě tváře administrace Win 11 (moderní UWP rozhraní vs. klasické Win32 applety), menu rychlých odkazů `Win+X`, přímé spouštění přes URI (`ms-settings:`) a `.cpl` applety (`sysdm.cpl`, `appwiz.cpl`).
    - **GUI5 Ergonomie a efektivní práce** (`/gui/ergonomie`): Profesionální ovládání přes klávesové zkratky (`Win+E`, `Win+V`, `Alt+Tab`, `Win+L`, `Ctrl+Shift+Esc`), rozložení oken Snap Layouts a Snap Assist, virtuální plochy pro oddělení kontextu, integrace cloudového a lokálního úložiště.

### Blok 6: Příkazová řádka a dávkové soubory (CLI a Automatizace)
12. **Příkazová řádka a dávkové soubory** (`/specializovana/operacni-systemy/prikazova-radka`) – *Podkapitoly:*
    - **CLI1 Orientace v systému a navigace** (`/prikazova-radka/navigace`): Spuštění CMD (práva Správce vs. běžný uživatel), přepínání disků (C:, D:), příkazy `cd` a `dir` (přepínače `/w`, `/p`, `/o:n`), absolutní vs. relativní cesta, význam `.` a `..`, doplňování přes klávesu `Tab`.
    - **CLI2 Správa souborů a složek** (`/prikazova-radka/soubory`): Manipulace se složkami (`mkdir`, `rmdir /s /q`), práce se soubory (`ren`, `del /p /f /q`, `copy`, `move`, `xcopy`), zástupné znaky `*` a `?`, riziko nevratného smazání bez Koše.
    - **CLI3 Roury, filtry a informace o systému** (`/prikazova-radka/proudy-a-filtry`): Výpis stromu `tree /f`, operátory přesměrování `>` a `>>`, roura (pipe `|`), textový filtr `findstr /i`, diagnostika systému `systeminfo` a systémové proměnné (`%USERNAME%`, `%USERPROFILE%`).
    - **BAT1 Dávkové soubory a automatizace** (`/prikazova-radka/davky-zaklad`): Stavba skriptu `.bat`, potlačení echa `@echo off`, komentáře `REM`, zastavení běhu `pause`, interaktivní uživatelský vstup `set /p`, parametry skriptu `%1` až `%*`.
    - **BAT2 Podmínky, skoky a cykly** (`/prikazova-radka/davky-logika`): Podmíněné větvení `if` a `if exist`, návěstí a skoky `goto`, tvorba interaktivního textového menu v CMD, proměnná `%ERRORLEVEL%`, cyklus `for` (číselná řada `for /L` i zpracování souborů).

### Blok 7: Správa uživatelů a oprávnění (Účty, Skupiny a NTFS)
13. **Správa uživatelů a oprávnění** (`/specializovana/operacni-systemy/uzivatele`) – *Podkapitoly:*
    - **USR1 Uživatelské účty a autentizace** (`/uzivatele/ucty-autentizace`): Rozdíl mezi autentizací a autorizací, Místní (lokální) účet vs. Účet Microsoft, Standardní uživatel vs. Správce (Administrator) a princip nejmenších práv (PoLP), vestavěné účty (`Administrator`, `Guest`, `SYSTEM`), správa přes `lusrmgr.msc` a příkaz `net user`.
    - **USR2 Zabezpečení účtů a přihlašování** (`/uzivatele/zabezpeceni-hesla`): Politika hesel (délka, expirace, historie), moderní autentizace přes Windows Hello (vazba PINu na hardwarový TPM 2.0 čip vs. heslo), okamžitý zámek stanice `Win+L`, mechanismus UAC (Secure Desktop), dialog `netplwiz`.
    - **USR3 Uživatelské skupiny a role** (`/uzivatele/skupiny-a-role`): Princip hromadné správy (práva se nepřidělují jednotlivcům, ale skupinám), vestavěné skupiny (`Administrators`, `Users`, `Backup Operators`), tvorba vlastních skupin v `lusrmgr.msc` a CLI `net localgroup` (`/add`, zařazení členů).
    - **USR4 Práva k souborům a složkám (NTFS)** (`/uzivatele/prava-soubory`): Proč NTFS podporuje ACL a FAT ne, základní NTFS oprávnění (Úplné řízení, Změnit, Číst a spouštět, Číst, Zápis), karta Zabezpečení v Průzkumníku, dědičnost (Inheritance), přednost explicitního zákazu (`Deny`), CLI nástroj `icacls`, finální automatizační skript v `.bat` pro hromadné vytvoření třídy a složky.

### Blok 8: Správa aplikačního software
14. **Správa aplikačního software** (`/specializovana/operacni-systemy/software`) – *Podkapitoly:*
    - **SW1 Životní cyklus software a instalátory (EXE vs. MSI)** (`/software/instalatory`): Fáze životního cyklu aplikace (vývoj, instalace, běh, aktualizace, odinstalace), EXE instalátory vs. Windows Installer MSI balíčky, tichá instalace (`/qn`, `/silent`), registrace v systému (Registry, Odinstalovat program).
    - **SW2 Moderní správa software přes balíčkovač Winget** (`/software/winget`): Princip package manageru ve Windows, vyhledávání `winget search`, instalace `winget install`, aktualizace aplikací `winget upgrade --all`, export a import seznamu SW pro rychlé znovunainstalování stanice (`winget export / import`).

### Blok 9: Správa zařízení a ovladače (Drivers)
15. **Správa zařízení a ovladače (Drivers)** (`/specializovana/operacni-systemy/zarizeni`)
    - **Formát:** Přímá lekce (Direct Lesson bez podkapitol, `hasSubchapters: false`).
    - **Obsah:** Komunikace OS s hardwarem přes ovladače (Kernel Ring 0 vs. User Ring 3), Správce zařízení (`devmgmt.msc`), stavy zařízení (žlutý vykřičník, zakázáno, funkční), instalace a aktualizace ovladačů (Windows Update vs. inf soubory), digitální podpis ovladačů (WHQL).

### Blok 10: Plánovač úloh a automatický provoz
16. **Plánovač úloh a automatický provoz** (`/specializovana/operacni-systemy/planovac`)
    - **Formát:** Přímá lekce (Direct Lesson bez podkapitol, `hasSubchapters: false`).
    - **Obsah:** Automatizace údržby a periodických úloh, Správa úloh přes `taskschd.msc`, spouštěče (Triggers – časové, při startu, při přihlášení), akce (Actions – spuštění `.bat` skriptu nebo aplikace), bezpečnostní kontext (běh pod přihlášeným uživatelem vs. pod účtem `SYSTEM` bez nutnosti přihlášení).

---

## 3. Detailní stav kapitol – OSS 2 (2. Ročník)

### Blok 1: Správa dat a zálohování
1. **Zálohování dat** (`/specializovana/operacni-systemy-2/zalohovani`) – *Podkapitoly:*
   - **B1 Úvod do zálohování** (`/zalohovani/uvod`): Význam záloh, pravidlo 3-2-1 (3 kopie, 2 média, 1 offsite).
   - **B2 Manuální záloha** (`/zalohovani/manualni`): Struktura složek, archivace ZIP/TAR, lidský faktor.
   - **B3 Systémové nástroje** (`/zalohovani/system`): Historie souborů Windows, body obnovení (VSS), bitová kopie.
   - **B4 Cloudové zálohy** (`/zalohovani/cloud`): Synchronizace vs. skutečná záloha, riziko zašifrování ransomwarem.
   - **B5 Automatizované zálohování – Cobian Reflector** (`/zalohovani/cobian`):
     - **Komponenta:** `BackupCobianChapter.tsx` (Teorie, Interaktivní simulátor zálohovacích cyklů, Pracovní list s exportem do Wordu).
     - **Pracovní list (7 úkolů):** Úkol 0 (Instalace jako Windows Služba pod systémovým účtem), Úkol 1 (Plná záloha), Úkol 2 (Inkrementální záloha), Úkol 3 (Diferenciální záloha), Úkol 4 (Šifrování AES-256 a komprese ZIP/7z), **Úkol 5 (Podniková síťová záloha na Z:\Zalohy_Projektu\Jmeno_Studenta s plánovačem, denním zápisem schůzek Po/Út/St, středečním exportem videa a simulací havárie s kompletní obnovou projektu)**, Úkol 6 (Reflexe a otázky z praxe), **Úkol 7 (Archivní bit ve Windows)**: Hands-on experiment v GUI Průzkumníka (`Vlastnosti -> Upřesnit -> Soubor je připraven k archivaci`), automatické zapnutí bitu systémem při modifikaci, rozbalovací CMD alternativa (`attrib +/-a`) a návaznost na princip inkrementální zálohy.
### Blok 2: Bezpečnost 1 (Ochrana Windows 11)
2. **Bezpečnost 1** (`/specializovana/operacni-systemy-2/bezpecnost`) – *Podkapitoly:*
   - **BZ1 Úvod do malwaru a principy nákazy** (`/bezpecnost/malware`):
     - **Komponenta & Architektura:** `MalwareDetectionChapter.tsx` (štíhlý orchestrátor ~40 řádků obalený v `FsChapterShell`, 3 záložky: Teorie, Simulátory, Kvíz).
     - **Modulární struktura (`malware/`):**
       - `malwareTypes.ts`: Sdílené typy a metadata pro 6 simulačních modulů.
       - `MalwareTheoryTab.tsx`: Samostatná záložka teorie (Von Neumann, CPU slepé vykonávání instrukcí, Security tokeny, katalog 6 hrozeb).
       - `MalwareSimulatorsTab.tsx`: Centrální přepínač simulačních karet renderující specializované podkomponenty v `malware/simulators/`:
         - `VirusSimulator.tsx`: Krokování instrukcí (Kalkulačka + FORMAT C: /Q).
         - `WormSimulator.tsx`: Simulace síťového červa a autonomního šíření v LAN.
         - `TrojanSimulator.tsx`: Trojský kůň (fasáda vs. dropper & backdoor).
         - `RansomwareSimulator.tsx`: Ransomware a šifrování souborů.
         - `SpywareSimulator.tsx`: Spyware & Keylogger s odposlechem hesel.
         - `HashSimulator.tsx`: Živá laboratoř SHA-256 hashů a VirusTotal.
       - `MalwareQuizTab.tsx`: 5 kontrolních otázek na typologii malwaru a chování CPU.
   - **BZ2 Správa procesů a digitální certifikáty** (`/bezpecnost/procesy-a-certifikaty`):
     - **Komponenta & Architektura:** `ProcessCertificatesChapter.tsx` (štíhlý orchestrátor ~230 řádků obalený v `FsChapterShell`, 4 záložky: Teorie, Simulátory, Praktická laboratoř, Kvíz).
     - **Modulární struktura (`procesy/`):**
       - `processTypes.ts`: Sdílená data pro strom procesů (`PROCESS_TREE_DATA`), původní kód pro Authenticode a typ protokolu.
       - `ProcessTheoryTab.tsx`: Samostatná záložka teorie (prověrky OS při spuštění souboru .exe, anatomie .exe s PE formátem a bezpečnostním blokem Authenticode/certifikátem, 4 indicie forenzní rychlokontroly, seznam procesů a zrádnost jména programu, forenzní arzenál nástrojů).
       - `ProcessSimulatorsTab.tsx`: Interaktivní Sysinternals Process Explorer strom procesů a živý inspektor integrity digitálního podpisu Authenticode s reálným SHA-256.
       - `ProcessLabTab.tsx`: Praktický forenzní protokol ve `WorksheetLayout` s 8 reálnými úlohami (`tasklist`, `resmon.exe`, Excel analýza, Sysinternals, `certutil`, Smart App Control) a exportem do Wordu.
       - `ProcessQuizTab.tsx`: 5 ověřovacích otázek na procesy a certifikáty.
---

## 4. Detailní stav kapitol – Programování 1 (PRG 1 – 1. Ročník)

### Blok 1: Vizuální blokové programování ve Scratchi
- **Routa:** `/specializovana/programovani/scratch`
- **Konstrukce lekcí:** Všechny kapitoly jsou obaleny v `FsChapterShell` s akcentem `accentColor="border-amber-500"`, metodickým přepínačem s PINem a úkoly `TaskCard` v kontejneru `<div className="flex flex-col gap-8">`.
- **Kapitoly:**
  1. **Sekvence a pohyb postav:** Základní příkazy, souřadnice X/Y, krokování a směrování.
     - *Komponenta:* `ScratchSequenceChapter.tsx`
  2. **Proměnné:** Vytvoření proměnné, ukládání skóre, inkrementace, textové zprávy.
     - *Komponenta:* `ScratchVariablesChapter.tsx`
  3. **Cykly a proměnné:** Opakuj N-krát, opakuj stále, řízení proměnnou cyklu.
     - *Komponenta:* `ScratchVariablesLoopsChapter.tsx`
  4. **Podmínky a větvení:** Bloky `když - tak` a `když - tak - jinak`, detekce dotyku barev a kláves.
     - *Komponenta:* `ScratchConditionsChapter.tsx`
  5. **Vlastní bloky (Podprogramy):** Tvorba znovupoužitelných bloků, rozklad problému na podúlohy.
     - *Komponenta:* `ScratchSubprogramsChapter.tsx`

### Blok 2: Herní retro engine
- **3D Raycaster hra** (`/specializovana/programovani/projekty/raycaster`)
  - **Komponenta:** `ScratchRaycasterProject.tsx`
  - **Obsah:** Herní engine ve stylu Wolfenstein 3D, princip vrhání paprsků (raycasting), DDA algoritmus, výpočet vzdálenosti stěn a vykreslování pseudo-3D sloupců na 2D plátně.

---

## 5. Detailní stav kapitol – Programování 2 (PRG 2 – 2. Ročník)

### Blok: Výuka jazyka Python & Grafika v Tkinteru
- **Výchozí routa:** `/specializovana/programovani-2`
- **Koncept výuky:** Přechod od blokového jazyka k textovému kódu v Pythonu s okamžitou grafickou vizualizací v plátně Tkinter Canvas:
  1. **Základy syntaxe a výpisy:** Funkce `print()`, formátování, oddělovače.
     - *Komponenty:* `PythonOutputsChapter.tsx`, `PythonBasicsChapter.tsx`, `PythonProgramChapter.tsx`
  2. **Výrazy a proměnné:** Matematické operace, celočíselné dělení `//` a modulo `%`, přiřazení proměnných.
     - *Komponenty:* `PythonExpressionsChapter.tsx`, `PythonVariablesChapter.tsx`
  3. **Grafické plátno a kreslení tvarů:** Souřadnicový systém Canvas (levý horní roh [0,0]), kreslení obdélníků, čar a práce s barvami.
     - *Komponenty:* `PythonDrawingChapter.tsx`, `PythonColorsChapter.tsx`, `PythonVariablesDrawingChapter.tsx`
  4. **Kruhy, ovály a elipsy:** Metoda `create_oval()`, vazba parametrů na střed a poloměr.
     - *Komponenty:* `PythonEllipsesChapter.tsx`, `PythonOvalsChapter.tsx`
  5. **Texty a interaktivita myší:** Vykreslování textových popisků a události kliknutí myši.
     - *Komponenty:* `PythonTextChapter.tsx`, `PythonTextDrawingChapter.tsx`, `PythonMouseDrawingChapter.tsx`
  6. **Cykly `for` a generování ornamentů:** Použití `range()`, proměnná cyklu jako souřadnice či velikost, opakované kreslení řad tvarů a soustředných kruhů.
     - *Komponenty:* `PythonLoopsChapter.tsx`, `PythonLoopVarChapter.tsx`, `PythonLoopVariableChapter.tsx`, `PythonCirclesLoopsChapter.tsx`
  7. **Podmínky a větvení:** Konstrukce `if`, `elif`, `else`, porovnávací a logické operátory (`and`, `or`, `not`), vnořené větvení pro tvorbu šachovnicových a střídavých vzorů.
     - *Komponenty:* `PythonConditionsChapter.tsx`, `PythonBranchingChapter.tsx`, `PythonNestedBranchingChapter.tsx`
  8. **Náhoda (`random`):** Generování náhodných souřadnic, barev a velikostí objektů (`random.randint()`, `random.choice()`).
     - *Komponenta:* `PythonRandomChapter.tsx`
  9. **Vlastní funkce (Podprogramy):** Klíčové slovo `def`, parametry funkcí, návratové hodnoty, znovupoužitelný kód pro kreslení složitějších objektů (např. domeček, auto).
     - *Komponenty:* `PythonSubroutinesChapter.tsx`, `PythonFunctionsArgsChapter.tsx`

---

## 6. Didaktické konvence pro odborné předměty

1. **Návaznost mezi ročníky (1. ➔ 2. ročník):**
   - **Programování:** Od blokového programování (Scratch v PRG 1) k reálnému textovému kódu (Python v PRG 2). Principy (proměnná, cyklus, podmínka, podprogram) žáci znají ze Scratche a v Pythonu se soustředí na zápis a syntaxi.
   - **Operační systémy:** V 1. ročníku (OSS 1) žáci poznají základy (Hardware, Kernel, Boot, Disky, Procesy). Ve 2. ročníku (OSS 2) přecházejí do role správce Windows (Zálohování → Bezpečnost → Správa Windows → AD → Serverové služby). Ve 3. ročníku Linux a Kyberbezpečnost (zastřešení).
2. **Konzistence UI a layoutu:**
   - Každá lekce musí mít jednotné barevné akcenty podle předmětu:
     - OSS 1: Fialovo-indigová (`from-purple-600 to-indigo-600`)
     - OSS 2: Modro-azurová (`from-blue-600 to-cyan-600`)
     - PRG 1: Smaragdovo-zelená / Jantarová pro Scratch (`from-emerald-600 to-teal-600` / `border-amber-500`)
     - PRG 2: Jantarovo-oranžová pro Python (`from-amber-500 to-orange-600`)
   - Všechny úkoly obalovat do kontejneru `<div className="flex flex-col gap-8">`.

---

## 7. Záznam rozhodnutí a změn (chronologicky)

- **2026-10-12 – OSS 1:** Test 01 upraven (A1, A3, A4 sjednoceno na instrukce & data, B4 zvýrazněna OEM licence). Von Neumann přesunut před RAM, přidána záložka Teorie (`VonNeumannTheory.tsx`).
- **2026-10-12 – Struktura OSS 2 a 3. ročníku (rozhodnutí učitele):**
  - 2. ročník: Zálohování → **Bezpečnost Windows 11 (lokální PC, hned po zálohách)** → Rozšířená správa Windows → AD → Serverové služby. V pozdějších blocích „bezpečnostní okénka“.
  - 3. ročník: Linux + Kyberbezpečnost jako zastřešení (spirála, bez duplicit – viz tabulka v `plan.md`).
  - Bezpečnost vychází z učitelova 8blokového sylabu, zredukováno na BZ1–BZ7; OSINT, právo do hloubky, CVSS a NIST přesunuty do 3. ročníku. NTFS ACL přidány do BZ6.
  - Prostředí: Windows 11 Pro, žáci jsou správci, VirtualBox / izolovaná síť. Zatím bez hodnoceného testu.
  - ~~UAC/NTFS vyřazeno z roadmapy OSS 1~~ → **opraveno učitelem:** OSS 1 dostane kapitolu **Uživatelské účty a skupiny** (lokální účty, skupiny, základní NTFS práva, sdílení složek v síti a mapování síťových disků). OSS 2 (BZ6, AD4, SL2) na ni navazuje pokročilými tématy a základy neopakuje.
  - **Oficiální sylabus OSS 1 (1. ročník):** Portál má plně hotovou 1. polovinu (Instalace → Hardware → Úvod/Architektura → Test 01 → Vývoj → Boot/VirtualBox → **Struktura disku**). 2. polovina postupuje: Správa souborů/složek GUI → Příkazová řádka (CMD 1–3) → Dávkové soubory (.bat) → Procesy & virtuální paměť (na portálu předpřipraveno) → Uživatelské účty & skupiny (icacls) → Správa SW (winget) → Zařízení & ovladače → Plánovač úloh → Síť & Wi-Fi router.
  - **Finální struktura kapitoly Bezpečnost OS (OSS 2 – 8 bloků):** Přijat kompletní 8blokový model: BZ1 (Škodlivý kód & Process Explorer/SHA-256) ➔ BZ2 (Sandbox & Autoruns) ➔ BZ3 (Defender GUI/CLI & EICAR) ➔ BZ4 (Firewall & netstat) ➔ BZ5 (BitLocker, TPM & CFA proti ransomwaru) ➔ BZ6 (UAC, pokročilá práva & winget) ➔ BZ7 (Phishing, hesla & CyberChef) ➔ BZ8 (Mini-CTF Incident Response). Vše s webovými simulátory a laboratorními listy pro VirtualBox. Organizace/Linux/NIS2/CVE posunuty do 3. ročníku.
- **2026-10-12 – Implementace BZ1 (Jak poznat škodlivý kód):**
  - Vytvořena úvodní podkapitola Bezpečnosti v OSS 2 (`MalwareDetectionChapter.tsx` na `/specializovana/operacni-systemy-2/bezpecnost/malware`).
  - Didaktické zjednodušení teorie: Procesor slepě vykonává instrukce z paměti RAM a nerozlišuje dobro a zlo, práva určuje bezpečnostní token spouštějícího uživatele. Katalog 6 typů malwaru (virus, červ, trojan, ransomware, spyware, rootkit) + obrana Windows (Authenticode a Smart App Control).
  - **Simulace 1 (Virus - Kalkulačka):** Krokování pseudoinstrukcí číslovaných od 1 (calc.exe). Možnost infikovat kód vložením `FORMAT C: /Q` na řádek 3. CPU vykoná smazání disku a následně dokončí výpočet `10 + 32 = 42`. Uživatel vidí kalkulačku fungovat a netuší, že disk je smazán.
  - **Simulace 2 (Síťový červ - 4 počítače na stole):** Na přání učitele byl switch zcela odstraněn (přílišná složitost). Nahrazeno čistou scénou stolu se 4 počítači v síti LAN: PC 1 (původce nákazy – infikován z USB disku), PC 2 (chráněný stanicí se zapnutým firewallem, dotaz zahodí), PC 3 (zranitelný cíl bez firewallu – PC 1 ho při skenování najde a červ do něj skočí do paměti RAM zcela bez kliknutí uživatele na jakýkoliv soubor), PC 4 (další stanice na stole, cíl řetězového lavinového šíření z nově nakaženého PC 3). Z vizualizace stolu byly na žádost učitele odebrány stylizované klávesnice a odstraněny veškeré fiktivní činnosti žáků (psaní úkolů apod.), aby se simulace soustředila ryze na technickou podstatu OS a síťové chování. Skenování je vysvětleno lidsky jako posílání dotazů a zjišťování dostupnosti („Haló, jsi tam?“).
  - **Simulace 3 (Trojský kůň - Fasáda vs. Skrytý proces):** Realizována interaktivní simulace ve 4 krocích postavená na kontrastu: vlevo lákavá fasáda instalátoru GameBooster (stažení -> uvítací okno -> animovaný progress bar -> úspěšné dokončení), vpravo zjednodušený princip v OS (soubor spí na disku -> uživatel mu dá plnou důvěru a práva -> program potají vybalí a spustí skrytý proces -> skrytý proces otevře komunikační kanál s útočníkem). Vynechán zbytečný technický balast (porty, registry, hex kódy) ve prospěch ryzího didaktického principu a doplněna antická analogie i srovnávací tabulka Virus vs. Červ vs. Trojský kůň.
  - **Simulace 4 (Ransomware - Zamykání souborů a výkupné):** Implementována 4kroková simulace podle varianty A v identickém sjednoceném stylu ovládání:
    - *Krok 1 (Běžný stav):* Čitelná složka `C:\Users\Student\Dokumenty` se soubory (`.docx`, `.xlsx`, `.zip`, `.pptx`), kliknutím lze zobrazit jejich reálný čitelný obsah.
    - *Krok 2 (Tichá fáze):* Uživatel otevřel přílohu `Faktura.pdf.exe`. V pozadí ransomware tiše maže stínové kopie (body obnovení) přes `vssadmin` a generuje symetrický klíč AES-256.
    - *Krok 3 (Šifrování za běhu):* Hromadný přepis souborů na disku. Přípony se mění na `.LOCKED`, ikony dostávají zámek a v živém náhledu se místo textu objeví nečitelná změť zašifrovaných bajtů. Vysvětleno, proč Windows operaci nezastaví (program běží s právy uživatele).
  - **Simulace 5 (Spyware & Keylogger - Odposlech školního přihlašování):** Zjednodušená 4kroková simulace zaměřená čistě na přihlášení do školního portálu EduPortal bez technického žargonu (odstraněny hooky, PID, porty, schránka i platební karta):
    - *Krok 1 (Čekání v ústraní):* Špion tiše vyčkává v paměti RAM na první stisknutí klávesy.
    - *Krok 2 (Dynamický odposlech hesla - Aha-moment):* Žák píše do pole hesla libovolné vlastní heslo. Na obrazovce naskakují černé tečky (`••••••••`), ale v tajném souboru špiona `tajny_zaznam.txt` se v reálném čase zobrazuje přesný čistý text hesla.
    - *Krok 3 (Úspěšné přihlášení do EduPortalu):* Žák se úspěšně přihlásí, vidí své známky a rozvrh a netuší zradu. Špion má záznam (e-mail + heslo) připravený k odeslání.
    - *Krok 4 (Tiché odeslání útočníkovi):* Špion odešle přihlašovací údaje útočníkovi přes internet a místní soubor smaže, aby po sobě nezanechal stopy. Útočník má přístup ke školnímu účtu žáka.
    - *Didaktické shrnutí:* Klíčová záchrana pomocí **2FA / MFA** (bez kódu z mobilu je odposlechnuté heslo k ničemu) a **správců hesel** (automatické vyplnění negeneruje fyzické úhozy kláves).
  - Interaktivní Sysinternals Process Explorer, sledování sítě (resmon), živý SHA-256 hash s VirusTotal reputací, laboratorní protokol a ověřovací kvíz.
- **2026-10-13 – Globální ovládání velikosti písma (Lupa napříč celým portálem):**
  - Vytvořena globální komponenta `GlobalTextZoom.tsx` integrovaná v `app/layout.tsx`.
  - Plovoucí skleněný prvek v pravém dolním rohu (`fixed bottom-4 right-4 z-50`) s ovládáním `[ A- ] Písmo: 100 % [ A+ ]` (rozsah 90 % až 140 % v krocích po 10 %).
  - Nastavení se ukládá do `localStorage` a škáluje kořenový `rem` prvek dokumentu (`document.documentElement.style.fontSize`), takže proporcionálně zvětšuje veškeré texty a karty napříč celým webem (homepage, rozcestníky, teorie, simulace i protokoly) s ohledem na promítání na projektor ve třídě.
- **2026-10-13 – Rozdělení kapitoly Bezpečnost na BZ1 a BZ2 a didaktické zjednodušení pro SŠ:**
  - Původní obsáhlá kapitola Malware byla po dohodě s vyučujícím rozdělena na dvě samostatné, věkově adekvátní podkapitoly:
    1. **BZ1: Úvod do malwaru a principy nákazy** (`/specializovana/operacni-systemy-2/bezpecnost/malware`) – soustředěno na slepé vykonávání instrukcí procesorem, 6 typů malwaru, interaktivní simulace (Kalkulačka s `FORMAT C:`, Síťový červ bez switche, Trojský kůň, Ransomware, Spyware/EduPortal, SHA-256 hash s lavinovým efektem) a ověřovací kvíz.
    2. **BZ2: Správa procesů a digitální certifikáty** (`/specializovana/operacni-systemy-2/bezpecnost/procesy-a-certifikaty`) – soustředěno na procesní hierarchii, digitální podpisy a forenzní audit systému.
  - **Didaktické zjednodušení teorie pro středoškoláky (2. ročník):**
    - Vynechán zbytečný matematický a kryptografický aparát (asymetrické klíče) i koncept systémových relací (Session / Session 0 / Session 1), který byl ze všech částí kapitoly (teorie, simulátor, protokol i kvíz) zcela odstraněn pro zachování věkové srozumitelnosti.
    - **Úvod teorie přestavěn na 2 zásadní pilíře:**
      1. *Co dělá operační systém při spuštění souboru .exe?* – 5 bezpečnostních filtrů před vstupem do CPU (ověření integrity a podpisu Authenticode, cloudová reputace SmartScreen/SAC, antivirový sken Defenderu v reálném čase, přidělení bezpečnostního tokenu a práv UAC a teprve poté alokace virtuální RAM a přidělení PID).
      2. *Jak udělat rychlou analýzu běžících procesů v systému?* – 4 indikátory nebezpečí (překlepy ve jménu / typosquatting, umístění na disku mimo `System32`, extrémní alokace RAM/CPU přes `MEMUSAGE gt 100000`, chybějící digitální podpis).
    - **Místo rodokmenu rodič-potomek:** Blok 1 se soustředí na **Seznam procesů v systému a zrádnost jména procesu** – proč pouhé jméno nestačí (útočník pojmenuje virus `svchost.exe`, aby splynul s davem 70 poctivých instancí), a srovnání legitimního procesu (`C:\Windows\System32`, podpis Microsoftu, služba v `/svc`) vs. podvrhu (`AppData`, bez podpisu, `N/A`).
    - Digitální podpisy Authenticode vysvětleny pomocí metafory **královské voskové pečeti a úředního notáře**:
      1. *Otisk prstu (SHA-256 hash)* – jedinečný otisk souboru; změna jediné tečky změní celý hash.
      2. *Úřední pečeť (Podpis)* – nerozbitná pečeť výrobce (Microsoft/Google) připevněná k otisku.
      3. *Notář (Certifikační autorita)* – garant pravosti vydavatele.
      - Důkaz nákazy virem: vložením kódu se změní otisk, pečeť se rozbije, Windows zobrazí varování a Smart App Control soubor zablokuje.
  - **Interaktivní simulátory v BZ2:**
    - Simulátor Sysinternals Process Explorer s filtrováním (Všechny, Jen hrozby, Systémové služby), barevnou legendou a VirusTotal reputací.
    - **Authenticode Inspector s čistým textovým editorem (Poznámkový blok):** Plnohodnotné interaktivní okno textového editoru s přímým psaním v reálném čase, tlačítkem `Injektovat virus` a `Obnovit originál` v záhlaví, živým výpočtem SHA-256 hashe na pravém panelu, detekcí rozbití digitální pečeti a simulovaným varováním Windows SmartScreen / Smart App Control.
  - **Praktická laboratoř pro žáky (WorksheetLayout):**
    - 8 samostatných úloh pro Windows 11 výhradně v `cmd.exe` a systémových nástrojích (žádný PowerShell).
    - Úloha 1: Stopování klíčového procesu v CLI (`explorer.exe` – PID, RAM a použitý příkaz; bez relací).
    - Úloha 2: Výpis procesů s pamětí nad 100 MB v CLI (`tasklist /fi "MEMUSAGE gt 100000"`).
    - Úloha 3: Odhalení systémových služeb pod procesy v CLI (`tasklist /svc /fi "IMAGENAME eq svchost.exe"`).
    - Úloha 4: Forenzní export všech procesů do CSV a tabulková analýza anomálií v Excelu (`tasklist /FO CSV > procesy.csv`, kontrola abnormální spotřeby RAM u `svchost.exe`).
    - Úloha 5: Odposlech síťových spojení v `resmon.exe` (TCP spojení, cizí IP a porty).
    - Úloha 6: Inspekce stromu v Sysinternals Process Explorer (Authenticode, VirusTotal).
    - Úloha 7: Výpočet SHA-256 přes `certutil -hashfile` v CMD a ověření na VirusTotal.
    - Úloha 8: Audit Smart App Control (SAC) ve Windows 11.
    - Každá úloha má samostatný kontext "Proč to děláme", rozbalovací nápovědu a přímá vstupní pole s exportem do Wordu (`.doc`) a MS Teams.
    - Úloha 3 a 4 didakticky zjednodušeny pro SŠ s využitím přirovnání „Autobus a cestující“ (`svchost.exe` = autobus, služby = cestující, samostatné programy = `N/A`), doplněn praktický tahák zkratek služeb (`gpsvc`, `ClipSVC`, `Dnscache`, `wuauserv` atd.).

---

## 5. Globální systémová vylepšení portálu IntLab (UX & Použitelnost)
- **Globální plynulé tlačítko „Zpět nahoru“ (`GlobalScrollToTop.tsx`):**
  - Umístěno v kořenovém rozvržení (`app/layout.tsx`) – automaticky funguje na všech současných i nově přidaných stránkách portálu.
  - Aktivuje se při odscrollování o více než 280 px.
  - Obsahuje SVG kruhový ukazatel procentuálního postupu rolování stránky a hladkou animaci návratu nahoru (`window.scrollTo({ top: 0, behavior: 'smooth' })`).
  - Vertikálně srovnáno nad globálním panelem lupy písma (`GlobalTextZoom`).
- **Globální kopírování kódů a CLI příkazů jedním klikem (`GlobalCodeCopy.tsx`):**
  - Implementováno přes delegovaný event listener na úrovni celého dokumentu – automaticky obsluhuje všechny `<code>` a `<pre>` elementy napříč celým webem bez nutnosti manuálních úprav v jednotlivých komponentách.
  - Po kliknutí na libovolný kód (např. `tasklist /FO CSV`, `resmon.exe`, `certutil...`) se obsah okamžitě zkopíruje do schránky (`navigator.clipboard.writeText`).
  - Kliknutý element zeleně problikne (`.intlab-code-copied`) a ve spodní části obrazovky se zobrazí toastová notifikace s ikonou fajfky a náhledem zkopírovaného textu.
- **2026-10-14 – Založení předmětu Operační systémy 3 (OSS 3) a rozšíření OSS 2:**
  - **Architektura přehledových kapitol (High-level overview):**
    - Vytvořena škálovatelná infrastruktura přehledových kapitol v `registry/curriculum/outlines/` (`outlineTypes.ts`, `oss2Outlines.ts`, `oss3Outlines.ts`, `index.ts`), která slouží jako jediný zdroj pravdy (SSOT) pro karty v kurikulu, přehledové stránky i centrální registr lekcí (`lessons.ts`).
    - Vytvořena sdílená komponenta `ChapterOutlinePage.tsx` v souladu s design systémem IntLab (`FsChapterShell` styl s fixním bílým skleněným rámcem, kartami Teorie vs. Simulace a praxe, vazbou „Navazuje na“ a odznaky).
  - **OSS 3 (3. ročník, `/specializovana/operacni-systemy-3`, subjectId: `ops3`):**
    - Vytvořena stránka předmětu s didaktickým rozborem a 4 hlavními kapitolami:
      1. **Linux** (LX1–LX8, ~24 h): Distribuce, Terminál & souborový systém, Text & roury, Uživatelé & oprávnění rwx, Balíčky apt, Procesy & systemd, Logy & cron, Síť & SSH.
      2. **Git a verzování** (GT1–GT4, ~8 h): Principy & 3 zóny, Základní cyklus add/commit, Větve & merge, GitHub & pull requesty.
      3. **Kyberbezpečnost** (KB1–KB6, ~20 h): Myšlení útočníka & právo, Průzkum OSINT & Nmap v laboratoři, Zranitelnosti CVE/CVSS, Bezpečnost webu OWASP, Útoky na AD & logy, Závěrečné CTF: Red vs. Blue.
      4. **Týmová spolupráce a nástroje** (TM1–TM4, ~10 h): Kanban & Scrum, Harmonogram & Ganttův diagram, Komunikační nástroje, Závěrečný týmový projekt.
    - Všech 22 podkapitol má funkční přehledové stránky se stručným didaktickým výkladem, co se v nich bude učit.
  - **OSS 2 (2. ročník, rozšíření po Bezpečnosti):**
    - K existujícímu Zálohování (B1–B5) a Bezpečnosti (BZ1–BZ2) byly v kurikulu i routování doplněny přehledové stránky pro zbývající bloky:
      1. **Bezpečnost 1:** BZ3 (Sandbox & Autoruns) až BZ9 (Závěrečná detektivka Mini-CTF).
      2. **Pokročilá konfigurace Windows:** PK1 (MMC a Správa PC), PK2 (Služby Windows), PK3 (Prohlížeč událostí), PK4 (Pokročilá NTFS práva), PK5 (Místní zásady secpol.msc).
      3. **Active Directory a doména:** AD1 (Server a doména), AD2 (DNS a řadič), AD3 (Uživatelé, skupiny, OU), AD4 (Klient v doméně), AD5 (Sdílení a práva přes skupiny), AD6 (Group Policy GPO), AD7 (Záloha AD a mini projekt).
      4. **Serverové služby:** SL1 (SMB sdílení), SL2 (Vzdálená správa RDP/SSH), SL3 (Webový server IIS), SL4 (Tiskový server), SL-V (Volitelné: DHCP, SQL, pošta).
    - Vše plně validováno produkčním sestavením (`npm run build` s 240 předvygenerovanými statickými stránkami bez chyb).
  - **2026-10-14 – Doplnění kapitoly GUI Windows 11 do OSS 1 (1. ročník):**
    - Do kurikula OSS 1 byla za téma *Procesy a paměť* vložena nová přehledová kapitola **Grafické rozhraní Windows 11** (`/specializovana/operacni-systemy/gui`) s 5 podkapitolami:
      1. **GUI1: Anatomie GUI a proces Explorer** (`/gui/anatomie`) – role Desktop Window Manageru (DWM), proces `explorer.exe`, kompozice plochy, restart v Task Manageru.
      2. **GUI2: Průzkumník a hierarchie disku C:** (`/gui/hierarchie`) – stromový model, systémové složky (`Windows`, `System32`, `Program Files`, `Users`), profil `%USERPROFILE%`, knihovny vs. fyzické složky.
      3. **GUI3: Práce se soubory, přípony a atributy** (`/gui/soubory-atributy`) – registr přípon souborů, nebezpečí skrytých přípon, atributy (`R`, `H`, `A`, `S`), zástupce `.lnk` vs. cíl, asociace programů.
      4. **GUI4: Konfigurace: Nastavení vs. Ovládací panely** (`/gui/konfigurace`) – duální administrace Win 11, `Win+X` Power Menu, přímé příkazy `ms-settings:` a `.cpl` applety.
      5. **GUI5: Ergonomie a efektivní práce** (`/gui/ergonomie`) – efektivní klávesové zkratky, Snap Layouts / Snap Assist, virtuální plochy a integrace schránky (`Win+V`).
    - Všechny podkapitoly integrovány do `oss1Outlines.ts`, hubu předmětu `ops1` v `defaultSchool.ts`, registru `lessons.ts` a validovány přes produkční `npm run build` (246 statických stránek).
  - **2026-10-14 – Doplnění kapitoly Příkazová řádka a dávkové soubory do OSS 1 (1. ročník):**
    - Do kurikula OSS 1 byla za téma *Grafické rozhraní Windows 11* vložena nová přehledová kapitola **Příkazová řádka a dávkové soubory** (`/specializovana/operacni-systemy/prikazova-radka`) s 5 podkapitolami:
      1. **CLI1: Orientace v systému a navigace** (`/prikazova-radka/navigace`) – spuštění CMD, práva Správce, disky C:/D:, příkazy `cd` a `dir`, relativní vs. absolutní cesta, `.` a `..`, klávesa `Tab`.
      2. **CLI2: Správa souborů a složek** (`/prikazova-radka/soubory`) – vytváření a mazání (`mkdir`, `rmdir`), práce se soubory (`ren`, `del`, `copy`, `move`, `xcopy`), zástupné znaky `*` a `?`, nevratnost smazání v CLI.
      3. **CLI3: Roury, filtry a informace o systému** (`/prikazova-radka/proudy-a-filtry`) – strom `tree /f`, přesměrování `>` a `>>`, roura `|`, textový filtr `findstr`, `systeminfo` a systémové proměnné.
      4. **BAT1: Dávkové soubory a automatizace** (`/prikazova-radka/davky-zaklad`) – stavba `.bat` skriptu, `@echo off`, komentáře `REM`, `pause`, vstup od uživatele `set /p`, parametry skriptu `%1` až `%*`.
      5. **BAT2: Podmínky, skoky a cykly** (`/prikazova-radka/davky-logika`) – větvení `if` a `if exist`, návěstí a `goto`, interaktivní menu, `%ERRORLEVEL%`, cyklus `for`.
    - Všechny podkapitoly integrovány do `oss1Outlines.ts`, hubu předmětu `ops1` v `defaultSchool.ts`, registru `lessons.ts` a validovány přes produkční `npm run build` (252 statických stránek).
  - **2026-10-14 – Doplnění kapitoly Správa uživatelů a oprávnění do OSS 1 (1. ročník):**
    - Do kurikula OSS 1 byla za téma *Příkazová řádka a dávkové soubory* vložena nová přehledová kapitola **Správa uživatelů a oprávnění** (`/specializovana/operacni-systemy/uzivatele`) se 4 podkapitolami:
      1. **USR1: Uživatelské účty a autentizace** (`/uzivatele/ucty-autentizace`) – autentizace vs. autorizace, lokální vs. Microsoft účet, Standard vs. Administrator, systémové účty, `lusrmgr.msc` a `net user`.
      2. **USR2: Zabezpečení účtů a přihlašování** (`/uzivatele/zabezpeceni-hesla`) – politika hesel, Windows Hello (PIN a TPM 2.0), zámek `Win+L`, UAC (Secure Desktop) a `netplwiz`.
      3. **USR3: Uživatelské skupiny a role** (`/uzivatele/skupiny-a-role`) – hromadná správa, vestavěné skupiny (`Administrators`, `Users`), vlastní skupiny v `lusrmgr.msc` a CLI `net localgroup`.
      4. **USR4: Práva k souborům a složkám (NTFS)** (`/uzivatele/prava-soubory`) – NTFS oprávnění, karta Zabezpečení v Průzkumníku, dědičnost a přednost Deny, CLI `icacls`, hromadný automatizační skript v `.bat`.
    - Všechny podkapitoly integrovány do `oss1Outlines.ts`, hubu předmětu `ops1` v `defaultSchool.ts`, registru `lessons.ts` a validovány přes produkční `npm run build` (257 statických stránek).
  - **2026-10-14 – Doplnění kapitol Správa software, Zařízení a Plánovač úloh do OSS 1 (1. ročník):**
    - Do kurikula OSS 1 byly za téma *Správa uživatelů a oprávnění* přidány 3 nové kapitoly podle Varianty A (jednotný fialový styl OSS 1):
      1. **Správa aplikačního software** (`/specializovana/operacni-systemy/software`) – hub se 2 podkapitolami (`hasSubchapters: true`, `accentCorner: true`):
         - **SW1: Životní cyklus software a instalátory (EXE vs. MSI)** (`/software/instalatory`) – životní cyklus aplikace, EXE vs. MSI, tichá instalace, registrace v systému.
         - **SW2: Moderní správa software přes balíčkovač Winget** (`/software/winget`) – moderní balíčkovač, `winget search / install / upgrade`, hromadný export a import software.
      2. **Správa zařízení a ovladače (Drivers)** (`/specializovana/operacni-systemy/zarizeni`) – přímá lekce (`hasSubchapters: false`, `accentCorner: false`), Správce zařízení (`devmgmt.msc`), role ovladačů v jádře, digitální podpisy WHQL, řešení konfliktů.
      3. **Plánovač úloh a automatický provoz** (`/specializovana/operacni-systemy/planovac`) – přímá lekce (`hasSubchapters: false`, `accentCorner: false`), `taskschd.msc`, plánování spouštění `.bat` zálohovacích a údržbových skriptů, triggery a spouštění pod účtem `SYSTEM`.
    - Přizpůsobena komponenta `ChapterOutlinePage` pro podporu přímých lekcí s návratovou cestou do hubu OSS 1 (`parent` prop).
  - **2026-10-14 – Didaktické zpřesnění BZ2 (Anatomie .EXE souboru a Authenticode):**
  - **2026-10-15 – Sjednocení číslování lekcí Scratche a rozšíření kapitoly Podmínky (PRG 1 – 1. ročník):**
    - **Sjednocení číslování v menu a kurikulu:** Kapitola Podmínky byla v rozcestníku (`app/specializovana/programovani/scratch/page.tsx`), v záhlaví komponenty (`ScratchConditionsChapter.tsx`) i v registru (`registry/lessons.ts`) sjednocena jako **Lekce 5** (tag `scr5`, `#sc5`). Byla odstraněna nesrovnalost (dříve chybějící 5 a skok rovnou na lekci 6). Nyní posloupnost lekcí tvoří logickou řadu: Lekce 1: Sekvence ➔ Lekce 2: Proměnné ➔ Lekce 3: Cykly ➔ Lekce 4: Podprogramy ➔ Lekce 5: Podmínky.
    - **Didaktická gradace a uspořádání 14 úloh v lekci Podmínky:**
      - *1. Blok (Neúplná podmínka když–tak):* Úkoly 1–5 (číslo > 100, sudost, uložení vstupu do proměnné, pohyb a okraje x, y, Pac-Man efekt).
      - *2. Blok (Úplná podmínka když–jinak):* Úkoly 6–12:
        - Úkol 6: Sudé/liché
        - Úkol 7: Porovnání dvou čísel (vnořené podmínky pro shodu)
        - Úkoly 8–9: Geometrie a kreslení perem (Polsko, Francie, Německo, Japonsko)
        - Úkol 10: Malá násobilka (10 otázek, počítadlo bodů, třístupňové známkování)
        - **Úkol 11: Validátor síly hesla (`ValidatorHesla.sb3`):** Vrchol 2. bloku – žáci aplikují princip bodování a třístupňového větvení z násobilky na analýzu řetězce (operátory `délka`, `obsahuje`, složená negace `ne (heslo = ... nebo ...)`), bez nutnosti cyklu.
        - **Úkol 12: Hádání čísla (1 pokus):** Jednoduchá jednorázová příprava (didaktický můstek) před přechodem na cykly.
      - *3. Blok (Cyklus s podmínkou `opakuj dokud nenastane`):* Úkoly 13–14:
        - **Úkol 13: Hádání čísla vylepšené (`HadaniCisla2.sb3`):** Rozšíření Úkolu 12 o cyklus `opakuj dokud nenastane`, počítadlo pokusů a nápovědu větší/menší.
        - **Úkol 14: Bankomat (ATM) a bezpečnostní trezor (`Bankomat.sb3`):** Závěrečný syntetický projekt propojující cyklus s podmínkou (ochrana PINu, max 3 pokusy), 3 bezpečnostní kontroly před výběrem (zůstatek, bankovky přes modulo 100, jednorázový limit) a operátory `a`. Obsahuje bonusovou výzvu: na konci každého výběru (ať už úspěšného, či neúspěšného) se bankomat vždy zeptá, zda si uživatel přeje pokračovat (ano/ne) – při "ano" se volba částky a kontrola pravidel opakuje v cyklu s novým zůstatkem, jinak se proces korektně ukončí s poděkováním a výzvou k odebrání karty.
  - **2026-10-15 – Zpřesnění Úkolu 5 v kapitole Zálohování Cobian (OSS 2 – 2. ročník):**
    - Cíl zálohy na síťovém disku upřesněn na formát `Z:\Zalohy_Projektu\Jmeno_Studenta` (každý student má vlastní složku se svým jménem).
    - Zavedena realistická simulace vícedenního zápisu ze schůzek do souboru `zapis_ze_schuzky.txt`:
      - **Pondělí:** Vytvoření souboru se záznamem za pondělí + velký 20MB soubor `video_master.raw` přes `fsutil` ➔ první Plná záloha.
      - **Úterý:** Přidání nového řádku zápisu za úterý ➔ Inkrementální záloha (přenos pouze několika bajtů textu, 20MB video se nepřenáší).
      - **Středa:** Přidání nového řádku zápisu za středu + vytvoření velkého 10MB souboru `export_v1.mp4` přes `fsutil` ➔ Inkrementální záloha (přenos 10 MB exportu a upraveného zápisu).
    - **Simulace havárie a obnova (Disaster Recovery):** Do zadání přidán krok E – žáci kompletně smažou `C:\Firemni_Projekt` ze svého disku a následně jej ze síťového disku zrekonstruují (Plná záloha z pondělí ➔ Inkrement z úterý ➔ Inkrement ze středy) s ověřením, že v obnoveném textovém souboru jsou všechny 3 dny (Po, Út, St) a jsou přítomny oba videosoubory. Formulář i export do Wordu byly rozšířeny o středeční log a záznam z obnovy.







