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
| **OSS 1** | Operační systémy 1 | 1. Ročník SŠ | `/specializovana/operacni-systemy-1` | `id: 'ops1'` |
| **OSS 2** | Operační systémy 2 | 2. Ročník SŠ | `/specializovana/operacni-systemy-1-2` | `id: 'ops2'` |
| **PRG 1** | Programování a hry 1 | 1. Ročník SŠ | `/specializovana/programovani` | `id: 'prg1'` |
| **PRG 2** | Programování a hry 2 | 2. Ročník SŠ | `/specializovana/programovani-2` | `id: 'prg2'` |

---

## 2. Detailní stav kapitol – OSS 1 (1. Ročník)

### Blok 1: Úvod do počítače a OS
1. **Instalace OS** (`/specializovana/operacni-systemy-1/instalace`)
   - **Formát:** Interaktivní simulátor instalace Windows 11 (`Win11InstallSimulator.tsx`).
   - **Didaktika:** Žáci si projdou UEFI volby, rozdělení disku při instalaci, licence a prvotní nastavení.
2. **Základy hardwaru pro OS** (`/specializovana/operacni-systemy-1/hardware`) – *Podkapitoly:*
   - **2.1 Von Neumannova architektura** (`/hardware/von-neumann`):
     - **Komponenty:** `VonNeumannGame.tsx` + `VonNeumannTheory.tsx`
     - **Obsah:** Přehledový centrální diagram architektury (CPU, ALU, Řadič, RAM, Vstup, Výstup), sběrnice (zjednodušené na datovou a adresní), zřetelné kontrastní popisky spojů, rozbalovací blok Fetch-Decode-Execute cyklu pro pokročilé žáky, interaktivní simulátor krokování instrukce.
   - **2.2 Operační paměť RAM** (`/hardware/ram`):
     - **Komponenta:** `RamSimulatorChapter.tsx`
     - **Obsah:** Adresace paměťových buněk, uložení instrukcí a proměnných v paměti.
   - *Poznámka k návaznosti:* Von Neumann je řazen jako první (teoretický základ), RAM následuje jako detailnější pohled na paměťový subsystém.
3. **Úvod do OS** (`/specializovana/operacni-systemy-1/uvod`)
   - **Komponenta:** `OsIntroChapter.tsx`
   - **Obsah:** Vrstvený model počítače (společný rámec Operační systém obalující User Space s aplikacemi i Kernel Space s jádrem a ovladači, pod nimi Hardware), základní funkce a role operačního systému.
4. **Architektura OS** (`/specializovana/operacni-systemy-1/architektura`)
   - **Komponenta:** `OsArchitectureChapter.tsx`
   - **Obsah:** Architektura OS jako stavební plán, spojovací schéma navazující na model z Úvodu (User Space vs. Kernel Space), architektonická otázka umístění modulů, monolitické jádro, mikrojádro, hybridní OS, ovladače zařízení (drivers), hardwarové kruhy (Protection Rings 0-3).

### Příprava a hodnocení 1. bloku:
5. **Procvičování na test 1** (`/specializovana/operacni-systemy-1/test01-rozbor`)
   - **Komponenty & Architektura:** Modulární struktura v `components/specializovana/operacni-systemy-1/test01-rozbor/` (`TestReviewQuiz.tsx` a `testReviewData.ts`).
   - **Obsah a didaktika:** 11 interaktivních reflexních otázek typu ABCD pokrývajících 1:1 témata z písemné práce (Hardware, UEFI, zjednodušený Von Neumann s CPU a sdílenou RAM, části programu v RAM, definice OS, 3 patra počítače, typologie OS, OEM licence, Monolit vs. Mikrojádro, Ring 0 vs. Ring 3, volba jádra letadlo vs. TV).
   - **Funkce:** Okamžité vyhodnocení volby, barevná zpětná vazba (zelená/červená), vysvětlující didaktické karty u každé otázky, rychlá skoková lišta 1..11, přepínání mezi krokováním po jedné otázce a zobrazením všech otázek najednou, ukládání stavu do `localStorage`.
6. **Hodnocená práce 01** (`/specializovana/operacni-systemy-1/test01`)
   - **Komponenta:** `OsSummaryWorksheet.tsx` (obaleno v `TestWorksheetShell`).
   - **Přístupové PINy:** Studentský PIN **`ZAK2026`**, Učitelský PIN **`OS2026`**.
   - **Prověřovaná témata:** Hardware & Von Neumann (CPU, RAM, disk; rozdělení RAM na instrukce a data/proměnné), role kernelu, licence se zvláštním důrazem na vlastnosti OEM licence.

### Blok 2: Evoluce a běh systému
7. **Evoluce OS** (`/specializovana/operacni-systemy-1/vyvoj`) – `OsEvolutionChapter.tsx`: Historie OS, Unix rodina, DOS, Windows NT, Linux.
8. **Virtualizace** (`/specializovana/operacni-systemy-1/virtualizace`) – `VirtualizationChapter.tsx`: Typ 1 a 2 Hypervisory, virtuální stroje vs. kontejnery.

### Blok 3: Souborové systémy a disky
9. **Souborový systém a disky** (`/specializovana/operacni-systemy-1/souborove-systemy`) – *Podkapitoly:*
   - **FS1 Úvod a architektura** (`/souborove-systemy/uvod`): Role FS, sjednocený vrstvený model OS (User Space -> Syscall -> Kernel Space s FS a ovladačem -> Hardware s mřížkou sektorů), abstrakce souborů a složek.
   - **FS2 Paměťová média** (`/souborove-systemy/media`): Plotnový HDD (stopy, sektory, cylindry) vs. SSD (NAND buňky).
   - **FS3 Dělení disku** (`/souborove-systemy/deleni-disku`): Oddíly, MBR vs. GPT, boot oddíl, svazky.
   - **FS4 Systém souborů (FAT)** (`/souborove-systemy/alokace-fat`): FAT tabulka, klastry, řetězení clusterů, vnitřní fragmentace, zjednodušená fyzická mřížka (#0 FAT tabulka, #1 Záloha FAT bez rušivých detailů). Interaktivní simulátor `FATGame.tsx` rozdělen do 7 gradovaných úrovní (3x vyhledávání souborů s plným adresářem, 3x zápis a propojování řetězců clusterů, 1x BAD clustery). Součástí je praktický list s novým **Úkolem 4**: instalace `winfr` z Microsoft Store, obnova souboru `hora.jpg` po trvalém smazání `Shift + Delete` (`/regular`) a následně i po Rychlém formátování svazku (`/extensive`), včetně exportu protokolu do Wordu.
   - **FS-FMT Formátování disku** (`/souborove-systemy/formatovani`): Interaktivní trenažér `FormattingGame.tsx` srovnávající Rychlé formátování (pouze okamžitý výmaz FAT tabulky) a Úplné/Pomalé formátování (postupný fyzický přepis všech sektorů/clusterů nulami – Zero-fill) se zpomalenou vizualizací zápisu nul.
   - **FS5 Architektura v praxi** (`/souborove-systemy/cteni-souboru`): Simulace toku dat při čtení (Aplikace -> OS -> FAT -> Čtení klastrů z disku).
   - **FS-ADV Pokročilá témata a údržba disku** (`/souborove-systemy/pokrocile`): Sloučená kapitola obsahující teorii fragmentace a defragmentace (HDD vs. SSD a TRIM), mazání a mýtus o prázdném disku, alokační strategie (First Fit, Best Fit, Worst Fit) a 4 simulátory/hry: Defragmentace disku, Oprava chyb (CHKDSK), Alokační strategie a Velikost clusteru.
   - **FS6 Start systému (Boot)** (`/souborove-systemy/boot`): `OsBootChapter.tsx` – BIOS/UEFI, POST test, MBR/GPT bootloader a předání řízení kernelu (přesunuto z původní samostatné kapitoly na konec bloku disků a oddílů v souladu s tematickým plánem).

### Blok 4: Procesy a správa paměti
10. **Procesy a paměť** (`/specializovana/operacni-systemy-1/procesy`) – *Podkapitoly:*
    - **PR1 Úvod a vznik procesu** (`/procesy/uvod`): Modulární struktura (`ProcessIntroChapter.tsx`, `intro/ProcessIntroTheoryTab.tsx`, `intro/ProcessIntroWorksheetTab.tsx`). Program vs. proces v RAM, identifikace PID a PPID (rodič/potomek), sjednocené schéma paměti RAM z Von Neumannovy architektury, PCB, izolace paměti a ochrana. Integrován interaktivní praktický list s Task Managerem, CLI `tasklist` a Process Explorerem z Sysinternals s exportem do Wordu. V teoretickém bloku paměti procesu sjednocen program (1: VÝSLEDEK = 5 + 7, 2: ULOŽ VÝSLEDEK, 3: PRINT VÝSLEDEK a v datech VÝSLEDEK = 12) v zelených blocích, s explicitním vysvětlením přenosu výsledku z procesoru do RAM.
      - *Didaktická revize listu:* Zadání všech úloh zkrácena a zacílena na středoškolské studenty (vynecháno zbytečné vodění za ruku, odstraněn zbytný rozbalovací blok o architektuře Edge, zkráceny kroky a metodický přehled). Úkoly 1–4 i rozšiřující úkoly 5*–7* formulovány přímočaře (stručný cíl, 2–3 přímé kroky, kompaktní tip). Formulace sjednoceny v UI i v HTML šabloně pro export do Wordu.
    - **PR2 Střídání procesů (Multitasking)** (`/procesy/stridani`): Modulární struktura (`ProcessSwitchingChapter.tsx`, `stridani/`). Time-sharing, časová kvanta (10–30 ms), registr PC (čítač instrukcí), uložení stavu registrů do PCB a přepnutí kontextu (Context Switch). Interaktivní SVG krokovací trenažér střídání Wordu a Kalkulačky na CPU.
    - **PR3 Životní cyklus a stavy** (`/procesy/stavy`): `ProcessStatesChapter.tsx` (Nový, Běžící / Running, Připravený / Ready, Čekající / Blocked na I/O, Ukončený). Rychlostní propast CPU (nanosekundy) vs. disk (milisekundy).
    - **PR4 Vlákna (Threads)** (`/procesy/vlakna`): `ProcessThreadsChapter.tsx` (Těžký proces vs. lehká vlákna, sdílená paměť, vícevláknový běh her, vícejádrová CPU).
    - **PR5 Virtuální paměť a stránkování** (`/procesy/virtualni-pamet`): Modulární struktura (`VirtualMemoryChapter.tsx`, `pamet/`). Proč proces nesmí přímo do fyzické RAM, jednotka MMU a překlad virtuálních adres přes Tabulku stránek, 4kB stránky a rámce, odkládací soubor `pagefile.sys` (Swap) na disku a interaktivní simulátor Page Fault (výpadek stránky).
    - **PR-ADV Pokročilá témata** (`/procesy/pokrocile`): `AdvancedProcessTopicsChapter.tsx` (Plánování CPU: Round Robin, FIFO/FCFS, prioritní plánování, alokátory paměti).

### Blok 5: Grafické rozhraní Windows 11 (GUI a Průzkumník)
11. **Grafické rozhraní Windows 11** (`/specializovana/operacni-systemy-1/gui`) – *Podkapitoly:*
    - **GUI1 Anatomie GUI a proces Explorer** (`/gui/anatomie`): Správce oken DWM, kompozice plochy přes GPU, proces `explorer.exe` (plocha, taskbar, okna, správa souborů), praktický restart zamrzlého Průzkumníka v Task Manageru.
    - **GUI2 Průzkumník a hierarchie disku C:** (`/gui/hierarchie`): Stromový model od kořene `C:\`, systémové složky (`Windows`, `System32`, `Program Files`, `ProgramData`, `Users`), uživatelský profil `%USERPROFILE%`, rozdíl mezi virtuální knihovnou a fyzickou diskovou složkou.
    - **GUI3 Práce se soubory, přípony a atributy** (`/gui/soubory-atributy`): Registr přípon a nebezpečí skrytých přípon (např. malware `faktura.pdf.exe`), základní atributy souborů (`R`, `H`, `A`, `S`), zástupce `.lnk` vs. fyzický soubor, asociace aplikací ve Windows.
    - **GUI4 Konfigurace: Nastavení vs. Ovládací panely** (`/gui/konfigurace`): Dvě tváře administrace Win 11 (moderní UWP rozhraní vs. klasické Win32 applety), menu rychlých odkazů `Win+X`, přímé spouštění přes URI (`ms-settings:`) a `.cpl` applety (`sysdm.cpl`, `appwiz.cpl`).
    - **GUI5 Ergonomie a efektivní práce** (`/gui/ergonomie`): Profesionální ovládání přes klávesové zkratky (`Win+E`, `Win+V`, `Alt+Tab`, `Win+L`, `Ctrl+Shift+Esc`), rozložení oken Snap Layouts a Snap Assist, virtuální plochy pro oddělení kontextu, integrace cloudového a lokálního úložiště.

### Blok 6: Příkazová řádka a dávkové soubory (CLI a Automatizace)
12. **Příkazová řádka a dávkové soubory** (`/specializovana/operacni-systemy-1/prikazova-radka`) – *Podkapitoly:*
    - **CLI1 Orientace v systému a navigace** (`/prikazova-radka/navigace`): Spuštění CMD (práva Správce vs. běžný uživatel), přepínání disků (C:, D:), příkazy `cd` a `dir` (přepínače `/w`, `/p`, `/o:n`), absolutní vs. relativní cesta, význam `.` a `..`, doplňování přes klávesu `Tab`.
    - **CLI2 Správa souborů a složek** (`/prikazova-radka/soubory`): Manipulace se složkami (`mkdir`, `rmdir /s /q`), práce se soubory (`ren`, `del /p /f /q`, `copy`, `move`, `xcopy`), zástupné znaky `*` a `?`, riziko nevratného smazání bez Koše.
    - **CLI3 Roury, filtry a informace o systému** (`/prikazova-radka/proudy-a-filtry`): Výpis stromu `tree /f`, operátory přesměrování `>` a `>>`, roura (pipe `|`), textový filtr `findstr /i`, diagnostika systému `systeminfo` a systémové proměnné (`%USERNAME%`, `%USERPROFILE%`).
    - **BAT1 Dávkové soubory a automatizace** (`/prikazova-radka/davky-zaklad`): Stavba skriptu `.bat`, potlačení echa `@echo off`, komentáře `REM`, zastavení běhu `pause`, interaktivní uživatelský vstup `set /p`, parametry skriptu `%1` až `%*`.
    - **BAT2 Podmínky, skoky a cykly** (`/prikazova-radka/davky-logika`): Podmíněné větvení `if` a `if exist`, návěstí a skoky `goto`, tvorba interaktivního textového menu v CMD, proměnná `%ERRORLEVEL%`, cyklus `for` (číselná řada `for /L` i zpracování souborů).

### Blok 7: Správa uživatelů a oprávnění (Účty, Skupiny a NTFS)
13. **Správa uživatelů a oprávnění** (`/specializovana/operacni-systemy-1/uzivatele`) – *Podkapitoly:*
    - **USR1 Uživatelské účty a autentizace** (`/uzivatele/ucty-autentizace`): Rozdíl mezi autentizací a autorizací, Místní (lokální) účet vs. Účet Microsoft, Standardní uživatel vs. Správce (Administrator) a princip nejmenších práv (PoLP), vestavěné účty (`Administrator`, `Guest`, `SYSTEM`), správa přes `lusrmgr.msc` a příkaz `net user`.
    - **USR2 Zabezpečení účtů a přihlašování** (`/uzivatele/zabezpeceni-hesla`): Politika hesel (délka, expirace, historie), moderní autentizace přes Windows Hello (vazba PINu na hardwarový TPM 2.0 čip vs. heslo), okamžitý zámek stanice `Win+L`, mechanismus UAC (Secure Desktop), dialog `netplwiz`.
    - **USR3 Uživatelské skupiny a role** (`/uzivatele/skupiny-a-role`): Princip hromadné správy (práva se nepřidělují jednotlivcům, ale skupinám), vestavěné skupiny (`Administrators`, `Users`, `Backup Operators`), tvorba vlastních skupin v `lusrmgr.msc` a CLI `net localgroup` (`/add`, zařazení členů).
    - **USR4 Práva k souborům a složkám (NTFS)** (`/uzivatele/prava-soubory`): Proč NTFS podporuje ACL a FAT ne, základní NTFS oprávnění (Úplné řízení, Změnit, Číst a spouštět, Číst, Zápis), karta Zabezpečení v Průzkumníku, dědičnost (Inheritance), přednost explicitního zákazu (`Deny`), CLI nástroj `icacls`, finální automatizační skript v `.bat` pro hromadné vytvoření třídy a složky.

### Blok 8: Správa aplikačního software
14. **Správa aplikačního software** (`/specializovana/operacni-systemy-1/software`) – *Podkapitoly:*
    - **SW1 Životní cyklus software a instalátory (EXE vs. MSI)** (`/software/instalatory`): Fáze životního cyklu aplikace (vývoj, instalace, běh, aktualizace, odinstalace), EXE instalátory vs. Windows Installer MSI balíčky, tichá instalace (`/qn`, `/silent`), registrace v systému (Registry, Odinstalovat program).
    - **SW2 Moderní správa software přes balíčkovač Winget** (`/software/winget`): Princip package manageru ve Windows, vyhledávání `winget search`, instalace `winget install`, aktualizace aplikací `winget upgrade --all`, export a import seznamu SW pro rychlé znovunainstalování stanice (`winget export / import`).

### Blok 9: Správa zařízení a ovladače (Drivers)
15. **Správa zařízení a ovladače (Drivers)** (`/specializovana/operacni-systemy-1/zarizeni`)
    - **Formát:** Přímá lekce (Direct Lesson bez podkapitol, `hasSubchapters: false`).
    - **Obsah:** Komunikace OS s hardwarem přes ovladače (Kernel Ring 0 vs. User Ring 3), Správce zařízení (`devmgmt.msc`), stavy zařízení (žlutý vykřičník, zakázáno, funkční), instalace a aktualizace ovladačů (Windows Update vs. inf soubory), digitální podpis ovladačů (WHQL).

### Blok 10: Plánovač úloh a automatický provoz
16. **Plánovač úloh a automatický provoz** (`/specializovana/operacni-systemy-1/planovac`)
    - **Formát:** Přímá lekce (Direct Lesson bez podkapitol, `hasSubchapters: false`).
    - **Obsah:** Automatizace údržby a periodických úloh, Správa úloh přes `taskschd.msc`, spouštěče (Triggers – časové, při startu, při přihlášení), akce (Actions – spuštění `.bat` skriptu nebo aplikace), bezpečnostní kontext (běh pod přihlášeným uživatelem vs. pod účtem `SYSTEM` bez nutnosti přihlášení).

### Blok 11: Síťová konfigurace a lokální sítě (LAN)
17. **Síťová konfigurace a lokální sítě (LAN)** (`/specializovana/operacni-systemy-1/site`) – *Podkapitoly:*
    - **NET1 Síťové adaptéry, MAC vs. IP a ipconfig** (`/site/adaptery-a-ip`): Správce zařízení (`devmgmt.msc`), síťová připojení `ncpa.cpl`, fyzická MAC adresa (48bit unikátní otisk) vs. logická IPv4 adresa, maska podsítě (oddělení ID sítě a ID stanice), dynamické DHCP vs. statická IP adresa, inspekce adaptérů v CLI (`ipconfig`, `ipconfig /all`, `/release`, `/renew`).
    - **NET2 Diagnostika spojení a cesta paketu (Ping & Tracert)** (`/site/diagnostika-a-ping`): Vrstvený diagnostický žebříček pingu (1. loopback `127.0.0.1` -> 2. vlastní IP -> 3. výchozí brána routeru -> 4. veřejná IP `8.8.8.8` -> 5. DNS doména `seznam.cz`), interpretace doby odezvy (RTT v ms), ztráty paketů a TTL, mapování směrovačů na trase pomocí `tracert`, identifikace výpadků kabelu, brány, DNS a firewallu.
    - **NET3 Profily sítě Windows, Wi-Fi a sdílení v LAN** (`/site/profily-sdileni-wifi`): Rozdíl mezi profilem Veřejná síť (Public - blokování pingů a zjišťování firewallem) a Privátní síť (Private - důvěryhodná LAN), sdílení složek a mapování disků, připojení síťové tiskárny přes SMB a IP, Wi-Fi standardy a pásma 2.4/5 GHz, SSID a šifrování WPA2-Personal vs. WPA3-SAE, inspekce přes `netsh wlan show interfaces / networks`.
    - **NET4 Praktická laboratoř: Konfigurace Wi-Fi routeru** (`/site/router-laborator`): SOHO Wi-Fi router (4 v 1: router, switch, AP, firewall/NAT), fyzické zapojení a hard reset do továrního nastavení, vyhledání IP brány a přihlášení do webového managementu, změna hesla správce, nastavení rozsahu DHCP a statických rezervací, zabezpečení Wi-Fi (WPA2-PSK AES / WPA3), izolovaná síť pro hosty (Guest Network) a limitace MAC filteringu.

---

## 3. Detailní stav kapitol – OSS 2 (2. Ročník)

### Blok 1: Správa dat a zálohování
1. **Zálohování dat** (`/specializovana/operacni-systemy-1-2/zalohovani`) – *Podkapitoly:*
   - **B1 Úvod do zálohování** (`/zalohovani/uvod`): Význam záloh, pravidlo 3-2-1 (3 kopie, 2 média, 1 offsite).
   - **B2 Manuální záloha** (`/zalohovani/manualni`): Struktura složek, archivace ZIP/TAR, lidský faktor.
   - **B3 Systémové nástroje** (`/zalohovani/system`): Historie souborů Windows, body obnovení (VSS), bitová kopie.
   - **B4 Cloudové zálohy** (`/zalohovani/cloud`): Synchronizace vs. skutečná záloha, riziko zašifrování ransomwarem.
   - **B5 Automatizované zálohování – Cobian Reflector** (`/zalohovani/cobian`):
     - **Komponenta:** `BackupCobianChapter.tsx` (Teorie, Interaktivní simulátor zálohovacích cyklů, Pracovní list s exportem do Wordu).
     - **Pracovní list (7 úkolů):** Úkol 0 (Instalace jako Windows Služba pod systémovým účtem), Úkol 1 (Plná záloha), Úkol 2 (Inkrementální záloha), Úkol 3 (Diferenciální záloha), Úkol 4 (Šifrování AES-256 a komprese ZIP/7z), **Úkol 5 (Podniková síťová záloha na Z:\Zalohy_Projektu\Jmeno_Studenta s plánovačem, denním zápisem schůzek Po/Út/St, středečním exportem videa a simulací havárie s kompletní obnovou projektu)**, Úkol 6 (Reflexe a otázky z praxe), **Úkol 7 (Archivní bit ve Windows)**: Hands-on experiment v GUI Průzkumníka (`Vlastnosti -> Upřesnit -> Soubor je připraven k archivaci`), automatické zapnutí bitu systémem při modifikaci, rozbalovací CMD alternativa (`attrib +/-a`) a návaznost na princip inkrementální zálohy.
### Blok 2: Bezpečnost 1 (Ochrana Windows 11)
2. **Bezpečnost 1** (`/specializovana/operacni-systemy-1-2/bezpecnost`) – *Podkapitoly:*
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

### Blok 3: Pokročilá konfigurace Windows a PowerShell
3. **Pokročilá konfigurace Windows a PowerShell** (`/specializovana/operacni-systemy-2/pokrocila-konfigurace`) – *Podkapitoly:*
   - **PK1 Konzole správce (MMC) a Služby Windows** (`/pokrocila-konfigurace/mmc`): Sjednocené rozhraní snap-inů, správa služeb Windows pod účtem SYSTEM, typy spouštění, závislosti a zotavení po chybě (`sc`, `net start/stop`).
   - **PK2 PowerShell: Základy, objekty a roury** (`/pokrocila-konfigurace/powershell`): Objektový model .NET vs. text CMD, syntaxe Sloveso-PodstatnéJméno, cmdlety `Get-Command`, `Get-Help`, `Get-Member`, objektová roura (`|`), filtrace `Where-Object` a `Select-Object`.
   - **PK3 Automatizace správy v PowerShellu** (`/pokrocila-konfigurace/powershell-sprava`): Hromadná správa služeb a procesů, práce se soubory, psaní a spouštění skriptů `.ps1`, bezpečnostní politika `ExecutionPolicy`, export do CSV a HTML.
   - **PK4 Systémový registr a řešení chyb** (`/pokrocila-konfigurace/registry`): Účel registru, hives v `System32\config`, větve HKLM a HKCU, typy hodnot REG_SZ a REG_DWORD, zálohování do `.reg` a obnova po havárii.
   - **PK5 Prohlížeč událostí a audit (Event Viewer)** (`/pokrocila-konfigurace/udalosti`): Protokoly System, Application a Security, úrovně událostí, klíčová Event ID (4624 login, 4625 neúspěšné přihlášení, 6006 vypnutí), tvorba vlastních zobrazení a filtrů.

### Blok 4: Síťové serverové služby a infrastruktura
4. **Síťové serverové služby a infrastruktura** (`/specializovana/operacni-systemy-2/sluzby`) – *Podkapitoly:*
   - **SL1 DHCP server: Automatická konfigurace sítě** (`/sluzby/dhcp`): Proces DORA, instalace role DHCP Server na Windows Serveru, konfigurace rozsahu (Scope), doba zapůjčení (Lease time) a statické rezervace pro tiskárny podle MAC adresy.
   - **SL2 DNS server: Překlad jmen a páteř sítě** (`/sluzby/dns`): Hierarchie DNS, dopředné zóny, klíčové záznamy A, CNAME, PTR, předávání dotazů (Forwarders), diagnostika `nslookup` a `ipconfig /flushdns`, role DNS pro Active Directory.
   - **SL3 Souborový server a síťové disky (SMB)** (`/sluzby/smb`): Protokol SMB, UNC cesty `\\Server\Slozka`, kombinace oprávnění sdílení a NTFS, mapování disku `net use Z:`, skrytá administrativní sdílení (`C$`, `ADMIN$`).
   - **SL4 Vzdálená správa: RDP a OpenSSH** (`/sluzby/vzdalena-sprava`): Protokol RDP na portu 3389, zabezpečení NLA, nástroj `mstsc.exe`, OpenSSH server na Windows, konfigurace Windows Firewallu.
   - **SL5 Webový server (IIS)** (`/sluzby/iis`): Instalace role Web Server IIS, výchozí kořen `C:\inetpub\wwwroot`, vazby portů 80 (HTTP) a 443 (HTTPS), self-signed certifikáty a pravidla firewallu.
   - **SL6 Databázový server (MS SQL Server)** (`/sluzby/sql`): Instalace instance SQL Server Express, role služby MSSQLSERVER a účty služeb, konfigurace sítě přes SQL Server Configuration Manager (TCP/IP port 1433), pravidla firewallu, Windows Authentication a tvorba zálohy do `.bak`.

### Blok 5: Active Directory a centrální správa
5. **Active Directory a centrální správa** (`/specializovana/operacni-systemy-2/active-directory`) – *Podkapitoly:*
   - **AD1 Windows Server a co je doména** (`/active-directory/server-a-domena`): Limity pracovní skupiny, princip centrální domény a AD DS, role řadiče domény (DC), seznámení se Správcem serveru.
   - **AD2 Povýšení na řadič domény (DC)** (`/active-directory/dns-a-radic`): Průvodce povýšením, vytvoření lesa a domény (FQDN), heslo DSRM, vazba na DNS a automatická tvorba SRV záznamů ve složce `_msdcs`.
   - **AD3 Organizační jednotky (OU) a doménové účty** (`/active-directory/uzivatele-skupiny`): Konzole `dsa.msc`, logická struktura firmy do OU, tvorba doménových uživatelů, politika hesel a uzamčení účtu (Account Lockout).
   - **AD4 Skupiny a přístupová práva (Prakticky)** (`/active-directory/sdileni-a-prava`): Praktický model *Uživatel ➔ Bezpečnostní skupina oddělení ➔ Oprávnění na sdílenou složku*, kombinace SMB a NTFS bez zbytečné teorie.
   - **AD5 Připojení klientského PC do domény** (`/active-directory/klient-v-domene`): Konfigurace DNS klienta na DC, dialog připojení stanice do domény, vznik účtu počítače v AD, přihlášení doménovým účtem, doménový uživatelský profil.
   - **AD6 Skupinové politiky (Group Policy – GPO)** (`/active-directory/gpo`): Konzole `gpmc.msc`, rozsah Computer vs. User Configuration, propojení s OU, klíčové politiky (zákaz USB, jednotná tapeta, mapování síťového disku), vynucení `gpupdate /force` a výpis `gpresult /r`.
   - **AD7 Závěrečný integrující projekt: Podniková síť** (`/active-directory/zaloha-a-projekt`): Samostatné zprovoznění malé firmy (Server s DHCP + DNS + AD DS ➔ připojený klient Win 11 ➔ 2 oddělení ➔ zabezpečené síťové složky ➔ funkční GPO restrikce) přesně podle modelu SŠ Horažďovice.

---

## 4. Detailní stav kapitol – Programování 1 (PRG 1 – 1. Ročník)

### Blok 1: Vizuální blokové programování ve Scratchi
- **Routa:** `/specializovana/programovani/scratch`
- **Konstrukce lekcí:** Všechny kapitoly jsou obaleny v `FsChapterShell` s akcentem `accentColor="border-amber-500"`, metodickým přepínačem s PINem a úkoly `TaskCard` v kontejneru `<div className="flex flex-col gap-8">`.
- **Kapitoly:**
  1. **Sekvence a pohyb postav (Lekce 1):** Základní příkazy, souřadnice X/Y, krokování a směrování.
     - *Komponenta:* `ScratchSequenceChapter.tsx`
  2. **Proměnné (Lekce 2):** Vytvoření proměnné, ukládání skóre, inkrementace, textové zprávy.
     - *Komponenta:* `ScratchVariablesChapter.tsx`
  3. **Cykly a proměnné (Lekce 3):** Opakuj N-krát, opakuj stále, řízení proměnnou cyklu.
     - *Komponenta:* `ScratchVariablesLoopsChapter.tsx`
  4. **Vlastní bloky / Podprogramy (Lekce 4):** Tvorba znovupoužitelných bloků, rozklad problému na podúlohy, procedurální dekompozice.
     - *Komponenta:* `ScratchSubprogramsChapter.tsx`
  5. **Podmínky a větvení (Lekce 5):** Neúplná a úplná podmínka (`když` a `když - jinak`), vnořené větvení, logické spojky (`a`, `nebo`, `ne`), operátor modulo (zbytek po dělení), cyklus `opakuj dokud nenastane`. Všech 14 úloh vybaveno kompletními vizuálními vzorovými blokovými skripty v učitelském režimu (`teacherNote`). V závěrečném projektu Bankomat (ATM) je zadání rozfázováno do 3 kroků + 1 bonusu: bezpečné přihlášení s odpočtem pokusů (zbyvajici_pokusy = 3, test odpověď = PIN za cyklem), 2 diagnostická pravidla výběru (zůstatek a limit 3 000 Kč) a volitelné opakování transakcí.
     - *Komponenta:* `ScratchConditionsChapter.tsx`
  6. **Seznamy a pole (Lekce 6):** Práce se seznamy (vkládání, mazání položek, indexace, délka, vyhledávání, analýza a filtrace, vlastní bloky s formálními parametry, deduplikace unikátních čísel). Sada 10 úloh s kompletními vizuálními blokovými řešeními pro učitele chráněnými PINem `1234`.
     - *Komponenta:* `ScratchListsChapter.tsx`

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
  - Vytvořena úvodní podkapitola Bezpečnosti v OSS 2 (`MalwareDetectionChapter.tsx` na `/specializovana/operacni-systemy-1-2/bezpecnost/malware`).
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
    1. **BZ1: Úvod do malwaru a principy nákazy** (`/specializovana/operacni-systemy-1-2/bezpecnost/malware`) – soustředěno na slepé vykonávání instrukcí procesorem, 6 typů malwaru, interaktivní simulace (Kalkulačka s `FORMAT C:`, Síťový červ bez switche, Trojský kůň, Ransomware, Spyware/EduPortal, SHA-256 hash s lavinovým efektem) a ověřovací kvíz.
    2. **BZ2: Správa procesů a digitální certifikáty** (`/specializovana/operacni-systemy-1-2/bezpecnost/procesy-a-certifikaty`) – soustředěno na procesní hierarchii, digitální podpisy a forenzní audit systému.
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
  - **OSS 3 (3. ročník, `/specializovana/operacni-systemy-3`, subjectId: `ops3`, 66 h):**
    - Kompletně přizpůsobeno hodinové dotaci 66 hodin (33 týdnů × 2 h) s pokrytím témat SŠ Horažďovice (Apache, Samba, Bash skripty) a zeštíhlením nepodstatné teorie (vyřazen Ganttův diagram a webové aplikační zranitelnosti):
      1. **Linux: Instalace a správa** (LX1–LX7, 16 h): Instalace & GRUB, Terminál & FHS, Text & roury, Uživatelé & POSIX práva, Balíčky apt, Procesy & systemd, Logy journalctl & cron.
      2. **Linux: Sítě, služby a Bash** (LX8–LX13, 16 h): Sítě & SSH/UFW, Webový server Apache, Sdílení souborů Samba (Linux ↔ Windows), Bash základy & proměnné, Bash podmínky & zálohovací skripty, Praktická prověrka.
      3. **Git a verzování kódu** (GT1–GT4, 8 h): Principy & 3 zóny, Pracovní cyklus add/commit, Větve & merge konflikty, GitHub & pull requesty.
      4. **Kybernetická bezpečnost** (KB1–KB4, 12 h): Právo v IT & Kill Chain, Skenování sítě Nmap & CVE zranitelnosti, Analýza provozu Wireshark (TCP handshake, nešifrovaná hesla), Incident response & obrana (mini-CTF).
      5. **Týmový projekt a agilní řízení** (TM1–TM3, 10 h): Agilní organizace úkolů v Kanbanu (GitHub Projects / Trello), Závěrečný integrující týmový projekt (Linux + Windows + Git + automatizace), Prezentace a obhajoby.
    - 4 hodiny vyčleněny jako rezerva na odpadlé hodiny a uzavření klasifikace.
  - **OSS 2 (2. ročník, rozšíření po Bezpečnosti):**
    - K existujícímu Zálohování (B1–B5) a Bezpečnosti (BZ1–BZ2) byly v kurikulu i routování doplněny přehledové stránky pro zbývající bloky:
      1. **Bezpečnost 1:** BZ3 (Sandbox & Autoruns) až BZ9 (Závěrečná detektivka Mini-CTF).
      2. **Pokročilá konfigurace Windows:** PK1 (MMC a Správa PC), PK2 (Služby Windows), PK3 (Prohlížeč událostí), PK4 (Pokročilá NTFS práva), PK5 (Místní zásady secpol.msc).
      3. **Active Directory a doména:** AD1 (Server a doména), AD2 (DNS a řadič), AD3 (Uživatelé, skupiny, OU), AD4 (Klient v doméně), AD5 (Sdílení a práva přes skupiny), AD6 (Group Policy GPO), AD7 (Záloha AD a mini projekt).
      4. **Serverové služby:** SL1 (SMB sdílení), SL2 (Vzdálená správa RDP/SSH), SL3 (Webový server IIS), SL4 (Tiskový server), SL-V (Volitelné: DHCP, SQL, pošta).
    - Vše plně validováno produkčním sestavením (`npm run build` s 240 předvygenerovanými statickými stránkami bez chyb).
  - **2026-10-14 – Doplnění kapitoly GUI Windows 11 do OSS 1 (1. ročník):**
    - Do kurikula OSS 1 byla za téma *Procesy a paměť* vložena nová přehledová kapitola **Grafické rozhraní Windows 11** (`/specializovana/operacni-systemy-1/gui`) s 5 podkapitolami:
      1. **GUI1: Anatomie GUI a proces Explorer** (`/gui/anatomie`) – role Desktop Window Manageru (DWM), proces `explorer.exe`, kompozice plochy, restart v Task Manageru.
      2. **GUI2: Průzkumník a hierarchie disku C:** (`/gui/hierarchie`) – stromový model, systémové složky (`Windows`, `System32`, `Program Files`, `Users`), profil `%USERPROFILE%`, knihovny vs. fyzické složky.
      3. **GUI3: Práce se soubory, přípony a atributy** (`/gui/soubory-atributy`) – registr přípon souborů, nebezpečí skrytých přípon, atributy (`R`, `H`, `A`, `S`), zástupce `.lnk` vs. cíl, asociace programů.
      4. **GUI4: Konfigurace: Nastavení vs. Ovládací panely** (`/gui/konfigurace`) – duální administrace Win 11, `Win+X` Power Menu, přímé příkazy `ms-settings:` a `.cpl` applety.
      5. **GUI5: Ergonomie a efektivní práce** (`/gui/ergonomie`) – efektivní klávesové zkratky, Snap Layouts / Snap Assist, virtuální plochy a integrace schránky (`Win+V`).
    - Všechny podkapitoly integrovány do `oss1Outlines.ts`, hubu předmětu `ops1` v `defaultSchool.ts`, registru `lessons.ts` a validovány přes produkční `npm run build` (246 statických stránek).
  - **2026-10-14 – Doplnění kapitoly Příkazová řádka a dávkové soubory do OSS 1 (1. ročník):**
    - Do kurikula OSS 1 byla za téma *Grafické rozhraní Windows 11* vložena nová přehledová kapitola **Příkazová řádka a dávkové soubory** (`/specializovana/operacni-systemy-1/prikazova-radka`) s 5 podkapitolami:
      1. **CLI1: Orientace v systému a navigace** (`/prikazova-radka/navigace`) – spuštění CMD, práva Správce, disky C:/D:, příkazy `cd` a `dir`, relativní vs. absolutní cesta, `.` a `..`, klávesa `Tab`.
      2. **CLI2: Správa souborů a složek** (`/prikazova-radka/soubory`) – vytváření a mazání (`mkdir`, `rmdir`), práce se soubory (`ren`, `del`, `copy`, `move`, `xcopy`), zástupné znaky `*` a `?`, nevratnost smazání v CLI.
      3. **CLI3: Roury, filtry a informace o systému** (`/prikazova-radka/proudy-a-filtry`) – strom `tree /f`, přesměrování `>` a `>>`, roura `|`, textový filtr `findstr`, `systeminfo` a systémové proměnné.
      4. **BAT1: Dávkové soubory a automatizace** (`/prikazova-radka/davky-zaklad`) – stavba `.bat` skriptu, `@echo off`, komentáře `REM`, `pause`, vstup od uživatele `set /p`, parametry skriptu `%1` až `%*`.
      5. **BAT2: Podmínky, skoky a cykly** (`/prikazova-radka/davky-logika`) – větvení `if` a `if exist`, návěstí a `goto`, interaktivní menu, `%ERRORLEVEL%`, cyklus `for`.
    - Všechny podkapitoly integrovány do `oss1Outlines.ts`, hubu předmětu `ops1` v `defaultSchool.ts`, registru `lessons.ts` a validovány přes produkční `npm run build` (252 statických stránek).
  - **2026-10-14 – Doplnění kapitoly Správa uživatelů a oprávnění do OSS 1 (1. ročník):**
    - Do kurikula OSS 1 byla za téma *Příkazová řádka a dávkové soubory* vložena nová přehledová kapitola **Správa uživatelů a oprávnění** (`/specializovana/operacni-systemy-1/uzivatele`) se 4 podkapitolami:
      1. **USR1: Uživatelské účty a autentizace** (`/uzivatele/ucty-autentizace`) – autentizace vs. autorizace, lokální vs. Microsoft účet, Standard vs. Administrator, systémové účty, `lusrmgr.msc` a `net user`.
      2. **USR2: Zabezpečení účtů a přihlašování** (`/uzivatele/zabezpeceni-hesla`) – politika hesel, Windows Hello (PIN a TPM 2.0), zámek `Win+L`, UAC (Secure Desktop) a `netplwiz`.
      3. **USR3: Uživatelské skupiny a role** (`/uzivatele/skupiny-a-role`) – hromadná správa, vestavěné skupiny (`Administrators`, `Users`), vlastní skupiny v `lusrmgr.msc` a CLI `net localgroup`.
      4. **USR4: Práva k souborům a složkám (NTFS)** (`/uzivatele/prava-soubory`) – NTFS oprávnění, karta Zabezpečení v Průzkumníku, dědičnost a přednost Deny, CLI `icacls`, hromadný automatizační skript v `.bat`.
    - Všechny podkapitoly integrovány do `oss1Outlines.ts`, hubu předmětu `ops1` v `defaultSchool.ts`, registru `lessons.ts` a validovány přes produkční `npm run build` (257 statických stránek).
  - **2026-10-14 – Doplnění kapitol Správa software, Zařízení a Plánovač úloh do OSS 1 (1. ročník):**
    - Do kurikula OSS 1 byly za téma *Správa uživatelů a oprávnění* přidány 3 nové kapitoly podle Varianty A (jednotný fialový styl OSS 1):
      1. **Správa aplikačního software** (`/specializovana/operacni-systemy-1/software`) – hub se 2 podkapitolami (`hasSubchapters: true`, `accentCorner: true`):
         - **SW1: Životní cyklus software a instalátory (EXE vs. MSI)** (`/software/instalatory`) – životní cyklus aplikace, EXE vs. MSI, tichá instalace, registrace v systému.
         - **SW2: Moderní správa software přes balíčkovač Winget** (`/software/winget`) – moderní balíčkovač, `winget search / install / upgrade`, hromadný export a import software.
      2. **Správa zařízení a ovladače (Drivers)** (`/specializovana/operacni-systemy-1/zarizeni`) – přímá lekce (`hasSubchapters: false`, `accentCorner: false`), Správce zařízení (`devmgmt.msc`), role ovladačů v jádře, digitální podpisy WHQL, řešení konfliktů.
      3. **Plánovač úloh a automatický provoz** (`/specializovana/operacni-systemy-1/planovac`) – přímá lekce (`hasSubchapters: false`, `accentCorner: false`), `taskschd.msc`, plánování spouštění `.bat` zálohovacích a údržbových skriptů, triggery a spouštění pod účtem `SYSTEM`.
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
  - **2026-10-15 – Kompletní registrace všech 20 kapitol Pythonu v PRG 2:**
    - Při dřívější migraci rozcestníků na `DynamicSubjectHub` bylo v `registry/curriculum/schools/defaultSchool.ts` u předmětu `prg2` uvedeno pouze 5 zkušebních kapitol místo celého kurikula.
  - **2026-10-16 – Didaktická zpřesnění a oprava vizuálu v lekci Scratch: Podmínky (PRG 1):**
    - **Oprava vnoření bloků v ukázkách:** V komponentě `ScratchConditionsChapter.tsx` byla opravena ukázka neúplné (`když – tak`) i úplné podmínky (`když – jinak`), aby se příkaz `bublina "Jsem bohatý"` vykresloval uvnitř těla podmínky (čelistí C-bloku), nikoliv v jeho záhlaví.
    - **Rozdělení nápovědy v Úkolu 2 (Je sudé?):** Složený blok byl didakticky rozdělen na dva samostatné nesestavené stavební kameny: operátor zbytku `zbytek [odpověď] děleno (2)` a relační porovnání `< [ ] = (0) >`.
    - **Nový blok v knihovně ScratchBlocks (`ScratchDistanceBlock`):** Do `ScratchBlocks.tsx` přidána komponenta pro blok měření vzdálenosti z kategorie Vnímání (`vzdálenost k [cíl ▼]`).
    - **Otevřený tip pro vlajku Japonska v Úkolu 9:** Nápověda byla upravena na otevřený didaktický podnět (využití další postavy na plátně a bloku `vzdálenost k [ukazateli myši ▼]`) bez přímého prozrazování konkrétních souřadnic, poloměru a kódu, aby žáci samostatně domysleli geometrické řešení.
    - **Vnoření bloků spoj v Úkolu 10 (Malá násobilka):** Přidána otevřená vizuální nápověda vysvětlující obecný princip vnoření jednoho bloku `spoj` do druhého (`spoj jablko (spoj hruška banán)`) a samostatný blok `otázka [ ] a čekej`, bez přímého prozrazování konkrétního výsledného sestavení s proměnnými násobilky.
  - **2026-10-17 – Sjednocení routingu a složky Operační systémy 1 (operacni-systemy-1):**
    - Složka routy `app/specializovana/operacni-systemy` byla přejmenována na `app/specializovana/operacni-systemy-1`, čímž se sjednotila konvence se strukturou 2. ročníku (`operacni-systemy-2`) a 3. ročníku (`operacni-systemy-3`).
    - Byly aktualizovány všechny cesty a routy v kurikulu a registrech:
      - `registry/curriculum/schools/defaultSchool.ts` – cesty předmětu `ops1` a všech jeho kapitol a podkapitol změněny na `/specializovana/operacni-systemy-1/...`
      - `registry/curriculum/outlines/oss1Outlines.ts` – základní bázové cesty (GUI, CLI, USERS, SW, DEVICES, SCHEDULER) nastaveny na `/specializovana/operacni-systemy-1/...`
      - `registry/lessons.ts` – všech 27 záznamů `defaultPath` aktualizováno na `/specializovana/operacni-systemy-1/...`
      - `app/page.tsx` – mapování zkratek `SHORT_LINKS` nasměrováno na novou routu `operacni-systemy-1`
      - Všechny stránky v `app/specializovana/operacni-systemy-1` – aktualizovány odkazy `router.push`, `BASE` konstanty a sjednoceny popisy rodičovského uzlu na `title: 'Operační systémy 1', path: '/specializovana/operacni-systemy-1'`
      - `components/specializovana/operacni-systemy/souborove-systemy/DiskPartitionChapter.tsx` – tlačítko pro spuštění bootovacího simulátoru aktualizováno na novou routu
      - `doc/curriculum/OSS1.md`, `doc/history.md`, `doc/plan.md` – sjednocena dokumentace a záznamy
    - Vše validováno a zkompilováno přes produkční `npm run build` (všech 257 statických stránek vygenerováno bez chyb).
  - **2026-10-17 – Přestavba tématu Grafy v Informatice 9 na kapitolu s podkapitolami:**
    - V kurikulu školy (`defaultSchool.ts` u předmětu `inf-9`) bylo téma **Grafy** povýšeno na hlavní kapitolu (`hasSubchapters: true`, `route: '/informatika/grafy'`).
    - Stávající interaktivní lekce **Sloupcové grafy** byla přesunuta jako první podkapitola (`route: '/informatika/grafy/sloupcove'`, tag `GR1`).
    - Stránka `app/informatika/grafy/page.tsx` byla přestavěna na rozcestník s `CategoryLayout` a `DynamicSubchapterHub` (připraveno pro okamžité doplnění dalších typů grafů).
    - Vytvořena nová stránka `app/informatika/grafy/sloupcove/page.tsx` s obalem a navigací zpět do rozcestníku grafů.
    - Záznam v `registry/lessons.ts` (`grafy-sloupcove`) aktualizován na novou výchozí cestu `/informatika/grafy/sloupcove` a zanořen pod kapitolu Grafy.
    - Validováno přes produkční sestavení `npm run build` (258 statických stránek zkompilováno bez chyb).
  - **2026-10-18 – Vytvoření podkapitoly Spojnicové grafy (Informatika 9):**
    - Do kurikula školy (`defaultSchool.ts` v kapitole `grafy` pro 9. ročník) přidána druhá podkapitola **Spojnicové grafy** (`route: '/informatika/grafy/spojnicove'`, tag `GR2`, ikona `LineChart`, gradient `from-blue-500 to-indigo-600`).
    - Vytvořena nová modulární komponenta v `components/informatika/grafy/spojnicove/`:
      - `lineChartTypes.ts` – datové modely pro 1 a 2 řady a šablony dat.
      - `LineChartsTheoryTab.tsx` – výklad časových řad, sledování trendů, kdy spojnicový graf použít a kdy je to chyba, a interaktivní detektor manipulace s ustřiženou osou Y (přepínač mezi poctivou osou od 0 °C a dramatickým zoomem).
      - `LineChartsSimulatorTab.tsx` – dva živé interaktivní SVG simulátory: 1. Jedna řada s editovatelnou tabulkou, šablonami (teplota, návštěvnost, cena) a přepínačem ořezu osy Y; 2. Porovnání dvou řad s legendou a detekcí bodu křížení.
      - `LineChartsWorksheetTab.tsx` – 4krokový badatelský úkol: Lovci časových dat ➔ Tabulka s chronologickou osou X ➔ Vizualizace a checklist ➔ Analýza trendu a kritické zhodnocení.
    - **Didaktické a vizuální zpřesnění (Křížení křivek & Manipulace s osou Y):**
      - **Jediný a přesný bod křížení:** Opraven diagram křížení trendů – modrá křivka (Kanál A) a fialová přímka (Kanál B) mají striktně jediný průsečík ve Středu na souřadnicích `(160, 55)`. Červený bod `Bod křížení` leží exaktně na tomto průsečíku a osa X obsahuje přehledné dny `Po, Út, St, Čt, Pá`.
      - **Realistický příklad ustřižené osy Y (Trik e-shopu):** Původní příklad nahrazen reálným tématem pro 9. ročník – vývoj ceny herní konzole v e-shopu (12 890 Kč až 13 190 Kč). Při poctivé ose od 0 Kč žáci vidí, že cena je téměř stejná (výkyv jen 2,3 %). Při přepnutí na ustřiženou osu od 12 700 Kč křivka padá přes celou výšku grafu, což demonstruje optickou manipulaci slevami.
    - Úspěšně validováno přes produkční sestavení `npm run build` (všech 259 statických stránek vygenerováno bez chyb).
  - **2026-10-19 – Vytvoření a didaktické doladění kapitoly Úvod do procesů (OSS 1 – 1. ročník):**
    - Vytvořena úvodní lekce tématu Procesy: `/specializovana/operacni-systemy-1/procesy/uvod` (komponenta `ProcessIntroChapter.tsx` a podsložka `intro/`).
    - **Teoretická část (`ProcessIntroTheoryTab.tsx`):**
      - Zavedena vizuální návaznost na kapitolu *Hardware – Von Neumannova architektura*: použita identická struktura a barvy paměťové karty RAM (zelený PCB podklad, zlaté piny, buňky s indexy a obsahem).
      - Všechny adresy paměti převedeny do **desítkového formátu** (Adresa 0, 1, 2... 1048576) pro maximální srozumitelnost v 1. ročníku.
      - V Schématu zrození procesu z disku do RAM je paměť znázorněna čistě s blokem procesu (PID) bez zbytečné vnitřní dekompozice na instrukce a data.
      - Blok izolace procesů a ochrany paměti používá stejnou RAM kartu a demonstruje dynamické přidělování PID i ochranu paměťového prostoru.
    - **Praktický badatelský list (`ProcessIntroWorksheetTab.tsx`):**
      - Přidán přehledový stromový diagram dvou cest správy procesů v OS:
        - **GUI větev:** Správce úloh (`taskmgr`, `Ctrl + Shift + Esc`).
        - **CLI větev:** Příkazový řádek (`tasklist`, nápověda přes `tasklist /?`).
      - Struktura 5 navazujících praktických úkolů:
        - **Úkol 1 (Identifikace procesů a PID):** Zjištění PID vybraných aplikací v GUI i CLI.
        - **Úkol 2 (Dvě instance stejného programu):** Spuštění dvou oken `notepad.exe`, vyhledání jejich PID výhradně v Příkazovém řádku pomocí příkazu `tasklist`, ověření, že systém vytvoří 2 nezávislé procesy s unikátními PID, a zdůvodnění nezávislosti a stability.
        - **Úkol 3 (Filtrování procesů nad 300 MB):** Samostatný úkol na nápovědu `tasklist /?` a parametr `/FI` – vyfiltrování procesů v RAM s operátorem `gt` (`tasklist /FI "MEMUSAGE gt 300000"`), záznam 3 procesů s nejvyšší spotřebou RAM do tabulky a příklad s operátorem `lt`.
        - **Úkol 4 (Program na disku vs. Proces v paměti RAM):** Porovnání velikosti `notepad.exe` na disku s využitím RAM po čistém spuštění a po vložení velkého textu (využití generátoru 1MB textového souboru z textfilegenerator.com; zvětšení datového segmentu vs. neměnnost instrukcí kódu).
        - **Úkol 5 (Rodičovský proces PPID a strom v Process Exploreru):** Využití oficiálního nástroje Microsoft Sysinternals Process Explorer (`procexp.exe`) pro prozkoumání reálného rodokmenu procesů (Process Tree), porovnání rodiče a PPID instance z plochy (`explorer.exe`) a z CMD (`cmd.exe`) s tabulkou a závěrečné 3bodové vysvětlení role rodiče (dědění práv, úklid potomků, návratové kódy).
      - Kompletní export do Wordu (`.doc`) zachovávající všech 5 úkolů, zaškrtnuté checklisty i zadané odpovědi studenta.
  - **2026-10-19 – Rozšíření tématu Procesy o dvě stěžejní kapitoly (PR2 a PR5):**
    - Do kurikula OSS 1 zařazeny dvě nové, plně modulární kapitoly s interaktivními simulátory:
      1. **PR2: Střídání procesů (Multitasking)** (`/specializovana/operacni-systemy-1/procesy/stridani`):
         - Teoretický rozbor časových kvant (Time Slicing), přirovnání k filmovému plátnu (60 FPS), pojem kontext procesu a registr PC.
         - Interaktivní simulátor přepnutí kontextu na CPU: animované propojení CPU, registrů a jádra OS ukládajícího PCB pro Word a Kalkulačku s automatickým přehráváním a krokováním.
      2. **PR5: Virtuální paměť a stránkování** (`/specializovana/operacni-systemy-1/procesy/virtualni-pamet`):
         - Teoretický rozbor jednotky MMU, iluze souvislého adresního prostoru od 0, 4kB stránkování a odkládacího souboru `pagefile.sys`.
         - Interaktivní simulátor překladu adres a výpadku stránky (Page Fault): demonstrace omezené fyzické RAM (2 rámce), mapování přes Tabulku stránek a odkládání nepoužívaných dat do `pagefile.sys` s počítadlem Page Hits / Faults.
    - Přečíslovány návazné kapitoly: Životní cyklus na PR3 a Vlákna na PR4.
  - **2026-10-19 – Bezpečnost OS (OSS 2 – 2. ročník): Úprava teorie digitálních podpisů a integrity:**
    - V kapitole **BZ2: Správa procesů a certifikáty** (`components/specializovana/operacni-systemy-2/bezpecnost/procesy/ProcessTheoryTab.tsx`):
      - Ze 4krokového filtru spouštění souborů byl odebrán krok 4 (Přidělení práv UAC), mřížka sjednocena na 3 kroky (Ověření hashe ➔ Kontrola certifikátu ➔ Omezení spuštění).
      - Původní textové vysvětlení rozbití pečeti bylo nahrazeno **názorným srovnáním dvou procesů/programů vedle sebe**:
        1. **Čistý originál (`kalkulacka.exe`):** Běžné instrukce (`1: VÝPOČET = 5 + 7`, `2: ULOŽ VÝSLEDEK`, `3: VYPÍŠ VÝSLEDEK`) a platný podpis Microsoftu (sekce dat vynechána pro čistotu výkladu kódu). Dole kontrola integrity se shodou hashů (`a7f3b2c1... == a7f3b2c1...`, spuštění povoleno).
        2. **Infikovaný program:** Původní instrukce kalkulačky doplněné o škodlivou instrukci viru (`4: UKRADNI_HESLA_A_ODESLI()`) se starým původním podpisem. Dole kontrola integrity s neshodou hashů (`9e4a8f10... ≠ a7f3b2c1...`, pečeť rozbita, systém program zablokuje lokálně).
      - **Didaktické sjednocení pojmů (Lokální kontrola vs. Cloudová kontrola):**
        - V teorii i simulátoru odstraněny zavádějící formulace, které přisuzovaly detekci rozbité integrity cloudu / SmartScreenu.
        - Zavedeno striktní dělení: **Krok 1: Lokální kontrola integrity & podpisu** (100% offline, provádí CPU přímo na zařízení) ➔ **Krok 2: Cloudová kontrola reputace** (online dotaz, nastupuje pouze tehdy, pokud podpis neselhal) ➔ **Krok 3: Antivirová kontrola** (lokální analýza kódu).
        - V simulátoru rozbité pečeti opraveno hlášení: zablokování provádí lokální kontrola integrity v Kroku 1 bez účasti cloudu.
  - **2026-10-19 – Rozšíření Laboratorního protokolu o inspekci certifikátu aplikace (OSS 2 – 2. ročník):**
    - V kapitole **BZ2: Správa procesů a digitální certifikáty** v záložce *Praktická laboratoř (Protokol)* (`ProcessLabTab.tsx`):
      - Před inspekci v Process Exploreru byla vložena nová **Úloha 5: Inspekce digitálního podpisu a certifikátu aplikace v Průzkumníku Windows (např. `vlc.exe`)**:
        - Žáci vyhledají binární soubor (VLC, Notepad++, Chrome atd.) a ve Vlastnostech prozkoumají záložku Digitální podpisy.
        - Zaznamenávají hlavní údaje certifikátu: Prověřovaný program a cestu, Subjekt (Vystaveno pro), Vystavitele (Certifikační autoritu CA – např. DigiCert/Sectigo), Dobu platnosti (od – do), Algoritmus a kryptografický otisk (Thumbprint hash) a Certifikační cestu (hierarchii řetězce důvěry Root CA ➔ Intermediate CA ➔ program s ověřením hlášení „Tento certifikát je v pořádku“).
      - Následné úlohy byly přečíslovány na **Úlohu 6** (Process Explorer), **Úlohu 7** (certutil SHA-256 a VirusTotal), **Úlohu 8** (Smart App Control) a **Úlohu 9\*\*** (`tasklist /svc`).
      - Synchronizován stav v `processTypes.ts`, ukládání do `localStorage` a exporty (kopírování do schránky i generování Word .doc) v `ProcessCertificatesChapter.tsx`.
    - **Didaktické zkrácení a zjednodušení zadání úloh (SŠ úroveň):**
      - Z celého protokolu (`ProcessLabTab.tsx`) byly odstraněny zdlouhavé textové bloky „Bezpečnostní kontext“, banální kroky (otevírání Win+R, psaní cmd) a rozsáhlé rozbalovací nápovědy.
      - Každá úloha má nyní jednotnou a údernou strukturu: 1 výstižná věta s cílem, 2–3 konkrétní odborné odrážky a kompaktní tip se syntaxí příkazu. Protokol je přehledný, rychlý na čtení a plně odpovídá úrovni 2. ročníku střední školy.
    - **Didaktické zpřesnění zadání a odstranění spoilerů v odpovědních polích:**
      - V Úloze 1 byl odstraněn box s doslovným příkazem `tasklist /fi "IMAGENAME eq explorer.exe"`.
      - V Úloze 2 a 3 bylo zadání upraveno tak, aby nevypisovalo hotové příkazy, ale po vzoru Úlohy 1 naznačovalo parametry (filtr `/FI` s pamětí `MEMUSAGE` a operátorem `gt`, resp. formát výstupu `/FO` a přesměrování `>`).
      - Všechna předvyplněná ukázková textová pole (`placeholder="..."`) byla vyprázdněna (`placeholder=""`), žáci již nemají v polích nápovědy a musí odpovědi vypracovat sami.
    - **Zjednodušení Úlohy 6 (Inspekce certifikátu aplikace) – ponechání 3 klíčových polí:**
      - Z původních polí byly odstraněny zbytečné technické detaily a následně i pole 6.4 (stav podpisu a řetězec důvěry).
      - Ponechány 3 klíčové pilíře uspořádané do čistého 3sloupcového gridu:
        - **6.1 Prověřovaný program a cesta k souboru**
        - **6.2 Vystaveno pro (Subjekt / Vlastník podpisu)**
        - **6.3 Vystavitel certifikátu (Certifikační autorita CA)**
      - Synchronizovány exporty do schránky i do Wordu.
    - **Sjednocení terminologie:**
      - Záložka a dokument přejmenovány z „Praktická laboratoř (Protokol)“ / „Laboratorní protokol“ na jednotný název **„Praktický list“** v souladu se zbytkem kurikula.
    - **Přeuspořádání a didaktická návaznost Úloh 6 a 7 (Process Explorer):**
      - **Úloha 6 (Process Explorer – legitimní VLC):** Nástroj Sysinternals Process Explorer je představen hned v úvodu Úlohy 6 (aktivace *Verify Image Signatures* a *Check VirusTotal.com*). Žáci analyzují legitimní aplikaci VLC (`vlc.exe`), kde zaznamenávají cestu k souboru (6.1), ověřený podpis *Verified Signer* (6.2) a skóre na VirusTotal (6.3).
      - **Úloha 7 (Vlastní nepodepsaný program v Pythonu):** Z této úlohy bylo zcela odstraněno opakování VLC. Úloha se zaměřuje čistě na vytvoření vlastního programu `test_app.py`, kompilaci do `.exe` přes PyInstaller a zjištění stavu chybějícího podpisu `(V subjektu nebyl podpis)` (7.1) a stavu VirusTotal `Unknown` ➔ odeslání k analýze (7.2).
      - Synchronizovány exporty do schránky i do Wordu.

---

## 7. Generování a implementace Tematických plánů (OSS 1, OSS 2, OSS 3)

### Hlavní úpravy a novinky:
1. **Odstranění Didaktického rozboru z OSS 3:**
   - Ze subjektu `ops3` v `defaultSchool.ts` byla odstraněna vlastnost `analysis`. Stránka předmětu OSS 3 je nyní čistá a neobsahuje spodní výkladový rozbor.
2. **Nový centrální registr tematických plánů:**
   - Vytvořen soubor `registry/curriculum/thematicPlans.ts` s kompletní datovou strukturou pro všechny 3 ročníky:
     - **OSS 1 (1. Ročník, 66 h / 33 týdnů):** 10 tematických celků (Hardware, Boot, Souborové systémy, Procesy, Test 01 & GUI, Příkazový řádek & .bat skripty, Uživatelé & NTFS, Správa zařízení & Winget, Sítě v OS, Závěrečný projekt).
     - **OSS 2 (2. Ročník, 66 h / 33 týdnů):** 5 tematických bloků (Zálohování 8 h, Bezpečnost 1 & Forenzní analýza 22 h, Pokročilá správa & PowerShell 10 h, Síťové služby 12 h, Active Directory 14 h).
     - **OSS 3 (3. Ročník, 66 h / 33 týdnů):** 5 tematických bloků (Linux správa 16 h, Linux služby & Bash 16 h, Git 8 h, Kyberbezpečnost 12 h, Týmový projekt 10 h, rezerva 4 h).
   - Každé hlavní téma má pevně alokované hodiny, rozpad na teorii a praxi, vazbu na RVP kompetenci a podrobný seznam podtémat s odhadem hodin (2–4 h), typem výuky a konkrétní praktickou činností žáka.
3. **Decentní kompaktní tlačítko na rozcestníku předmětů:**
   - V komponentě `DynamicSubjectHub.tsx` byl původní velký banner nahrazen **decentním, kompaktním bílým tlačítkem** (ikona kalendáře, text „Tematický plán předmětu“, odznáček „66 h“ a šipka) umístěným čistě pod popisem předmětu a nad gridem kapitol.
4. **Jednoduchá přehledná tabulka (SimplePlanTable):**
   - Vytvořena odlehčená komponenta `SimplePlanTable.tsx` bez filtrů a rozbalovátek – čistá školní HTML tabulka (sloupce: Měsíc, Hlavní téma, Podtéma/Učivo, Hodin, Poznámka) s tiskovým tlačítkem a součtem 66 hodin.
5. **Samostatné a snadno editovatelné stránky v aplikaci:**
   - Každá stránka obsahuje přímo své pole dat `PLAN_OSS1`, `PLAN_OSS2` a `PLAN_OSS3` pro bleskovou ruční editaci v kódu:
     - `/specializovana/operacni-systemy-1/tematicky-plan`
     - `/specializovana/operacni-systemy-2/tematicky-plan`
     - `/specializovana/operacni-systemy-3/tematicky-plan`
6. **Tematický plán OSS 1 (Definitivní verze, přesně 66 h / 33 týdnů):**
   - Na základě didaktického rozvržení učitele a alokace hodin:
     - **Září (8 h):** Úvod do OS a HW pro OS (Instalace OS Win 11 2 h, Von Neumann 2 h, Úvod do OS 1 h, Evoluce 1 h, Architektura OS 1 h, Virtualizace 1 h).
     - **Říjen (10 h):** Souborový systém, disky a start systému (Architektura FS 1 h, Média 1 h, Dělení disku 2 h, FAT a fragmentace 2 h, Praktické úlohy 2 h, Start systému / Boot proces 2 h).
     - **Listopad – Prosinec (6 h):** Procesy a paměť (Úvod a vznik 2 h, Střídání procesů 1 h, Životní cyklus a stavy 1 h, Vlákna 1 h, Virtuální paměť a stránkování 1 h).
     - **Leden (4 h):** Grafické rozhraní Windows 11 – GUI (Architektura GUI a Explorer 1 h, Hierarchie disku C: 1 h, Práce se soubory a konfigurace 2 h). Uzavření 1. pololetí (28 h).
     - **Únor (6 h):** Příkazová řádka a dávkové soubory bez složité logiky (Orientace a navigace 2 h, Správa souborů a složek 2 h, Roury a filtry 2 h).
     - **Březen (8 h):** Správa uživatelů a oprávnění (Účty a autentizace 2 h, Zabezpečení a UAC 2 h, Skupiny a role 2 h, NTFS práva 2 h).
     - **Duben (4 h):** Správa software (Životní cyklus a instalátory 2 h, Aplikace a Winget 2 h).
     - **Květen (4 h):** Správa zařízení a Plánovač úloh (Správce zařízení a ovladače Ring 0 2 h, Plánovač úloh taskschd.msc pod SYSTEM 2 h).
     - **Květen (8 h):** Síťová konfigurace a lokální sítě – LAN (Adaptéry a ipconfig 2 h, Diagnostika ping/tracert 2 h, Profily sítě a Wi-Fi 2 h, Praktické úlohy 2 h).
     - **Červen (8 h):** Závěrečný projekt a hodnocení (Konfigurace stanice 2 h, Síť a automatizace 2 h, Ladění a testování 2 h, Obhajoba projektu a hodnocení 2 h). Celkem = 66 h.
7. **Harmonizace tematického plánu OSS 2 (Září–Červen, 66 h):**
   - Po ruční úpravě Září (2 h: Wargame - CTF jako opakování OS 1) a Září–Říjen (10 h: Zálohování a ochrana dat – typy záloh 1 h, copy/xcopy/robocopy 3 h, cloud Google Drive 2 h, Cobian Reflector 4 h) byl zbytek roku harmonizován na přesných 66 hodin:
     - **Listopad – Leden (18 h):** Bezpečnost 1 (Ochrana Windows 11 a forenzní analýza – 9 podtémat po 2 h: Malware typologie, Process Explorer & Authenticode, Windows Sandbox & Autoruns, Defender & EICAR, Firewall & netstat, BitLocker & TPM 2.0, UAC & winget, Phishing & MFA, Mini-CTF Incident Response). Přesně uzavírá 1. pololetí na 30 hodinách (2 + 10 + 18 h).
     - **Únor – Březen (10 h):** Pokročilá správa Windows a PowerShell (MMC & services.msc, syntaxe a roury objektů, skripty .ps1 a ExecutionPolicy, registr regedit, Event Viewer logy).
     - **Duben – Květen (12 h):** Síťové serverové služby (DHCP DORA/Scope, DNS zóny/A/PTR, SMB sdílení, RDP & SSH, web IIS HTTPS, SQL Server Express .bak).
     - **Květen – Červen (14 h):** Active Directory a centrální správa (AD DS řadič DC, organizační jednotky OU, doménoví uživatelé a skupiny, připojení klienta Win 11, GPO restrikce a mapování, integrující podnikový projekt). 2. pololetí = 36 hodin (10 + 12 + 14 h). Celkem ročník = 66 h.
8. **Přesun kapitoly Start systému (Boot) do Souborového systému a disků:**
   - V souladu s didaktickou návazností (diskové oddíly MBR/GPT ➔ zavaděč a předání řízení kernelu) a tematickým plánem pro říjen byla kapitola `Start systému (Boot)` odebrána ze samostatných kapitol na hlavní stránce OSS 1 a zařazena jako závěrečná podkapitola **FS6** do rozcestníku `Souborový systém a disky` (`/specializovana/operacni-systemy-1/souborove-systemy/boot`).
   - Původní routa `/specializovana/operacni-systemy-1/boot` byla ponechána pro zpětnou kompatibilitu se správnou navigací zpět do souborového systému. Zaktualizovány záznamy v `defaultSchool.ts`, `config/curriculum.ts` i `registry/lessons.ts`.
9. **Implementace Školního vzdělávacího programu (ŠVP) pro InspIS (OSS 1, OSS 2, OSS 3):**
   - Vytvořen oficiální kurikulární datový registr `registry/curriculum/svpData.ts` a souhrnný dokument `doc/curriculum/SVP_INSPIS.md` v přesné 3sloupcové struktuře InspIS ŠVP podle vzoru Horažďovice (*Výsledky vzdělávání Žák:* × *Rozpis učiva s kódy PT* × *Hodinová dotace*).
   - Z obsahu byla důsledně vyřazena příliš teoretická či vysokoškolská témata (plánovací algoritmy CPU Round Robin a FIFO, paměťové alokátory Best/Worst Fit, složitá logika a větvení v `.bat` skriptech, složité podnikové topologie doménových lesů).
   - Vypracována společná část ŠVP pro InspIS: pravidla hodnocení žáků, klíčové kompetence (k učení, komunikativní, k řešení problémů, digitální, pracovní) a průřezová témata (`PT - ČDS`, `PT - ČSP`, `PT - ODS`).
   - Komponenta `SimplePlanTable.tsx` byla rozšířena o čistý dvouzáložkový přepínač (*Měsíční plán výuky 66 h* vs. *ŠVP pro InspIS 66 h*) a specializovanou komponentu `SvpInspisTable.tsx` s rozbalovací společnou charakteristikou, okamžitým kopírováním do schránky pro InspIS a tiskem. Nasazeno na OSS 1, OSS 2 i OSS 3.
10. **Synchronizace kurikulární databáze a trvalé uchování ŠVP SŠ Horažďovice:**
    - Profily `doc/curriculum/OSS1.md` i `doc/curriculum/OSS2.md` byly aktualizovány a sjednoceny na přesnou 66hodinovou roční dotaci s novými tematickými bloky.
    - Vytvořen dedikovaný trvalý referenční dokument `doc/curriculum/HORAZDOVICE_SVP_OS.md` obsahující kompletní doslovné znění ŠVP předmětu Operační systémy ze Střední školy Horažďovice (ŠVP Vývoj aplikací a her, 126 h pro ročníky 1, 3 a 4), detailní srovnávací analýzu s naším IntLabem (198 h) a didaktické postřehy pro další rozvoj oboru.
11. **Univerzalizace ŠVP OSS 1 a odstranění přílišných technologických specifikací:**
    - V oficiálních kurikulárních podkladech (`registry/curriculum/svpData.ts`, `doc/curriculum/OSS1.md`, `doc/curriculum/SVP_INSPIS.md` a na stránce tematického plánu) byly vyčištěny příliš konkrétní, implementační a marketingové pojmy:
      - Odstraněny konkrétní verze OS (např. *Windows 11* v názvu témat a učivu nahrazeno *klientským operačním systémem*).
      - Odstraněny interní názvy konzolí a spustitelných nástrojů (`lusrmgr.msc`, `devmgmt.msc`, `taskschd.msc`, `.cpl`, `.inf`, `net user`, `net localgroup`, `icacls`, `Win+L`, `WHQL`, `DWM`, `explorer.exe`).
      - Nahrazeny konkrétní CLI přepínače a výčty příkazů (`@echo off`, `REM`, `pause`, `set /p`, `%1`, `/qn`, `/silent`, `dir`, `cd`, `mkdir`, `rmdir`, `copy`, `move`, `del`, `ipconfig`, `netsh wlan`) obecnými formulacemi pokrývajícími principy (tvorba dávkových skriptů, přesměrování standardních proudů, tichá instalace, konfigurace síťového adaptéru).
      - Nahrazeny proprietární pojmy a marketingové názvy (`Snap Layouts`, `odkládací soubor pagefile.sys` nahrazen obecným `swap / odkládací prostor`, `Winget` zobecněn na moderního *správce balíčků*).
      - Zjednodušeno téma virtuální paměti (odstraněna jednotka MMU, fyzické rámce a Page Fault – ponechán čistý koncept: *„princip virtuální paměti, izolace paměti aplikací, odkládací prostor / swap“*).
    - Výsledkem je dlouhodobě stabilní, vůči kontrolám ČŠI i inovacím technologií odolné ŠVP, přičemž veškerá detailní praktická výuka v IntLabu zůstává plnohodnotně zachována.
12. **Zobecnění a harmonizace ŠVP pro OSS 2 a OSS 3 (66 h + 66 h):**
    - Na základě srovnání se SŠ Horažďovice a odstranění předimenzovaného učiva byla provedena zásadní strukturální a kurikulární úprava 2. a 3. ročníku:
      - **OSS 2 (2. Ročník SŠ – 66 hodin):**
        - Plně ukotveno na **Windows 11 Pro** (zrušena virtuální instalace plného Windows Serveru, doménového lesa AD DS, SQL Serveru a IIS v 2. ročníku, což zbytečně přetěžovalo školní PC i žáky a duplikovalo linuxové služby).
        - Přerozděleno do **4 ucelených bloků**:
          1. *Správa podnikových dat a zálohování* (10 h – vč. zahajovacího diagnostického Wargame v září; strategie 3-2-1, robocopy, cloud vs. neměnná záloha, ochrana záložních archivů šifrováním a heslem)
          2. *Bezpečnost koncových zařízení, audit a forenzní analýza* (20 h – typologie malwaru, forenzní audit procesů, registr a autorun persistence, žurnál událostí, sandbox a antivirus, firewall, diskové šifrování s TPM, aktualizace a 0-day, phishing a MFA, Mini-CTF Incident Response)
          3. *Systémové služby a administrační skriptování (PowerShell)* (18 h – posíleno o 2 h z opakování; životní cyklus služeb, MMC snap-iny, syntaxe cmdletů, roury objektů, .ps1 skripty a ExecutionPolicy, pokročilá automatizace registru a ACL, generování inspekčních CSV/HTML reportů)
          4. *Síťové sdílení prostředků, vzdálená správa a centrální správa v doméně* (18 h – sdílení složek SMB a kombinovaná práva NTFS, vzdálená plocha RDP, koncept podnikové domény a DNS z pohledu stanice, připojení klienta do domény a profily, uplatnění politik GPO na stanici, závěrečný integrující projekt administrace stanice)
      - **OSS 3 (3. Ročník SŠ – 66 hodin):**
        - Serverové a síťové role soustředěny čistě na platformu **Linux** (žádné duplicity).
        - Přerozděleno do **5 ucelených bloků**:
          1. *Linux: Architektura, instalace a základní správa systému* (16 h – headless server, FHS, POSIX práva UGO a sudo, proudy a roury, disky a fstab, procesy a systemd, repozitáře APT)
          2. *Linux: Sítě, serverové služby a automatizace v shellu* (16 h – síťová rozhraní a UFW firewall, SSH s asymetrickými klíči, webový server HTTPS, sdílení dat Samba pro stanice Windows, skriptování v shellu, komprese a periodické úlohy v plánovači cron)
          3. *Kybernetická bezpečnost, síťový audit a obrana* (12 h – právo v IT, NIS 2 a Kill Chain, audit portů a zranitelností CVE/CVSS, analýza provozu ve Wiresharku, hashování a odolnost hesel, reakce na incident CTF)
          4. *Verzovací systémy, týmová kooperace a infrastrukturní projekt* (18 h – verzování v Gitu 6 h, nástroje pro agilní plánování úkolů Kanban a týmovou komunikaci 2 h, realizace smíšené firemní infrastruktury Linux + Windows 8 h, křížový audit a obhajoba 2 h)
          5. *Závěrečná reflexe tříletého kurikula a rezerva* (4 h – syntéza tříleté výuky, maturitní úlohy a rezerva)
      - **Zobecnění textů a odstranění brandových závislostí:**
        - Stejně jako v OSS 1 byly v oficiálních textech pro ČŠI a InspIS odstraněny konkrétní proprietární názvy nástrojů (Cobian, BitLocker, Process Explorer, EICAR, atd.) a nahrazeny stabilními oborovými pojmy (specializovaný software běžící jako služba, diskové šifrování s hardwarovým modulem, inspekční nástroje procesů, standardizované testovací vzorky).
        - Vše synchronizováno napříč `registry/curriculum/svpData.ts`, `doc/curriculum/SVP_INSPIS.md`, `doc/curriculum/OSS2.md`, `doc/curriculum/OSS3.md` a v tematických plánech `app/specializovana/operacni-systemy-2/tematicky-plan/page.tsx` a `app/specializovana/operacni-systemy-3/tematicky-plan/page.tsx`.
13. **Odstranění legacy technologií MBR a BIOS z kurikula OSS 1:**
    - V souladu s moderními technologickými požadavky klientských systémů (Windows 11 nativně vyžaduje Secure Boot, firmware UEFI a diskovou tabulku GPT) byly z oficiálních kurikulárních dokumentů pro InspIS (`registry/curriculum/svpData.ts`, `doc/curriculum/SVP_INSPIS.md`), tematických plánů OSS 1 (`app/.../operacni-systemy-1/tematicky-plan/page.tsx`, `thematicPlans.ts`), profilu předmětu `doc/curriculum/OSS1.md`, konfigurace školy `defaultSchool.ts` i centrálního registru lekcí `registry/lessons.ts` zcela odstraněny zmínky o zastaralém standardu **MBR** a **legacy BIOSu**.
    - Výuka se soustředí přímo na současný průmyslový standard **tabulky oddílů GPT** (s redundancí, GUID identifikátory a podporou disků nad 2 TB) a **firmware UEFI** (včetně bezpečného startu Secure Boot a EFI systémového oddílu ESP).
14. **Doplnění 10. bloku – Závěrečný integrující projekt klientské stanice (8 h) do OSS 1:**
    - Na základě srovnávací analýzy ŠVP a webu byl vytvořen chybějící 10. blok předmětu Operační systémy 1 pro měsíc červen (8 h).
    - V `registry/curriculum/outlines/oss1Outlines.ts` byla definována skupina `OSS1_PROJECT` (`os-project`) se 4 podkapitolami (PRJ1 Komplexní instalace stanice, PRJ2 Síťové připojení a údržbový skript, PRJ3 Křížové testování a diagnostika, PRJ4 Technická dokumentace a obhajoba).
    - Vytvořena hlavní stránka rozcestníku `app/.../operacni-systemy-1/projekt/page.tsx` a 4 odpovídající podstránky.
    - Karta byla zařazena do kurikula školy v `defaultSchool.ts` a lekce se automaticky propisují do centrálního registru `registry/lessons.ts`.
    - Tím má 1. ročník OSS 1 kompletní 100% zrcadlové pokrytí všech 10 bloků ŠVP a 66 hodin výuky na webu.
15. **Harmonizace webového rozcestníku a témat OSS 2 s 4 schválenými bloky ŠVP (66 h):**
    - **Zachování kapitol:** Kapitoly *Zálohování* (`zalohovani/*`, B1–B5) a *Bezpečnost* (`bezpecnost/*`, BZ1–BZ9) byly ponechány beze změny v plném rozsahu.
    - **Odstranění nepoužitých kapitol:** Smazány zastaralé serverové kapitoly:
      - `app/specializovana/operacni-systemy-2/sluzby/iis/` (webový server IIS – přesunuto na Linux v OSS 3).
      - `app/specializovana/operacni-systemy-2/sluzby/sql/` (databázový server MS SQL Server – přesunuto na Linux v OSS 3).
      - `app/specializovana/operacni-systemy-2/active-directory/dns-a-radic/` (instalace/povýšení Windows Serveru na řadič domény DC).
    - **Sjednocení rozcestníku předmětu na 4 karty:** Předmět OSS 2 má na webu (`defaultSchool.ts`) přesně 4 karty odpovídající 4 blokům ŠVP InspIS:
      1. *Zálohování dat* (10 h, `/zalohovani`)
      2. *Bezpečnost 1* (20 h, `/bezpecnost`)
      3. *Systémové služby a skriptování v PowerShellu* (18 h, `/pokrocila-konfigurace` – MMC 4 h, PowerShell základy a roury 4 h, skripty .ps1 a ExecutionPolicy 4 h, registr 3 h, Prohlížeč událostí a audit 3 h)
      4. *Síťové sdílení a centrální správa v doméně* (18 h, `/active-directory` – SMB sdílení složek a efektivní práva 4 h, vzdálená správa RDP 2 h, koncept podnikové domény 2 h, klientská stanice v doméně a profily 4 h, skupinové politiky GPO 4 h, závěrečný integrující projekt administrace stanice 2 h)
    - **Synchronizace tematického plánu:** V `registry/curriculum/thematicPlans.ts` i `app/specializovana/operacni-systemy-2/tematicky-plan/page.tsx` jsou rozepsány přesně tyto 4 bloky v součtu 66 hodin.
    - Všechny statické stránky (297 rout) se úspěšně překládají v produkčním buildu.

16. **Integrace Registru a Žurnálu událostí do Bloku 2 (Bezpečnost) a vyčištění PowerShellu (OSS 2):**
    - **Začlenění do Bezpečnosti:** V souladu s didaktikou a oficiálním ŠVP InspIS byla témata *Systémový registr a persistence škodlivého kódu* (BZ3) a *Systémový žurnál událostí a bezpečnostní audit* (BZ4) začleněna přímo do Bloku 2: Bezpečnost koncových zařízení, audit a forenzní analýza (`/bezpecnost/`).
    - **10 karet Bloku 2 (20 h):** Blok 2 na webu i v tematickém plánu nyní 1:1 mapuje 10 podtémat (10 × 2 h = 20 h):
      - BZ1: *Typologie malwaru a principy nákazy* (`/bezpecnost/malware`) – 2 h
      - BZ2: *Forenzní analýza procesů a certifikáty Authenticode* (`/bezpecnost/procesy-a-certifikaty`) – 2 h
      - BZ3: *Systémový registr a persistence škodlivého kódu* (`/bezpecnost/registr`) – 2 h
      - BZ4: *Systémový žurnál událostí a bezpečnostní audit* (`/bezpecnost/udalosti`) – 2 h
      - BZ5: *Izolované testovací prostředí (Sandbox) a antivirus* (`/bezpecnost/izolace`) – 2 h
      - BZ6: *Paketový firewall na koncovém zařízení* (`/bezpecnost/firewall`) – 2 h
      - BZ7: *Diskové šifrování BitLocker a TPM čip* (`/bezpecnost/sifrovani`) – 2 h
      - BZ8: *Správa systémových aktualizací a zranitelnosti (0-day)* (`/bezpecnost/ucty`) – 2 h
      - BZ9: *Sociální inženýrství, phishing a ochrana identity* (`/bezpecnost/sit-hesla`) – 2 h
      - BZ10: *Vyšetřování bezpečnostního incidentu (Mini-CTF)* (`/bezpecnost/ctf`) – 2 h
    - **5 karet Bloku 3 (18 h):** Blok 3 (`/pokrocila-konfigurace/`) byl uvolněn od klikání v GUI a soustředí se čistě na služby Windows, konzoli MMC a PowerShell:
      - PK1: *Systémové služby Windows na pozadí a jejich životní cyklus* (`/pokrocila-konfigurace/sluzby`) – 4 h
      - PK2: *Konzole správce (MMC) a centrální správa* (`/pokrocila-konfigurace/mmc`) – 4 h
      - PK3: *PowerShell: Objektový shell, syntaxe cmdletů a roury* (`/pokrocila-konfigurace/powershell`) – 4 h
      - PK4: *Administrační skriptování v PowerShellu (.ps1)* (`/pokrocila-konfigurace/powershell-sprava`) – 4 h
      - PK5: *Automatizovaný sběr dat a generování stavových reportů* (`/pokrocila-konfigurace/reporty`) – 2 h
    - **Odstranění osiřelých rout:** Z `app/.../operacni-systemy-2/` byly smazány osiřelé adresáře `bezpecnost/defender`, `pokrocila-konfigurace/registry`, `pokrocila-konfigurace/udalosti`, `pokrocila-konfigurace/ntfs`, `pokrocila-konfigurace/zasady`, `active-directory/sdileni-a-prava` a `active-directory/uzivatele-skupiny`.
    - **Synchronizace plánů:** Sjednoceno v `thematicPlans.ts`, `PLAN_OSS2` v `app/.../tematicky-plan/page.tsx`, `oss2Outlines.ts` a `defaultSchool.ts`.

17. **Harmonizace kurikula a struktury stránek pro Operační systémy 3 (OSS 3):**
    - **Sjednocení 5 kapitol na webu s ŠVP InspIS a Tematickým plánem (66 h):**
      - **Kapitola 1: Linux: Instalace a správa** (`/linux`, 16 h) – 8 podtémat po 2 h: `instalace` (LX1), `terminal` (LX2), `prava` (LX3), `text-a-roury` (LX4), `disky` (LX5 – oddíly, ext4 a `/etc/fstab`), `procesy` (LX6), `balicky` (LX7), `sluzby-a-logy` (LX8).
      - **Kapitola 2: Linux: Sítě, služby a Bash** (`/sluzby`, 16 h) – 8 podtémat po 2 h: `sit-a-firewall` (LX9), `ssh` (LX10), `apache` (LX11), `https` (LX12 – TLS certifikáty a Certbot), `samba` (LX13), `bash-zaklady` (LX14), `bash-skripty` (LX15), `cron` (LX16 – přesunut z bloku 1).
      - **Kapitola 3: Git a verzování kódu** (`/git`, 8 h) – 4 podtémata po 2 h: `principy` (GT1), `zakladni-cyklus` (GT2), `vetve` (GT3), `github` (GT4).
      - **Kapitola 4: Kybernetická bezpečnost** (`/kyberbezpecnost`, 12 h) – 6 podtémat po 2 h: `pravo-a-utok` (KB1), `osint-nmap` (KB2), `wireshark` (KB3), `hashe-a-soleni` (KB4 – ukládání hesel a sůl), `slovnikove-utoky` (KB5 – slovníkové útoky a RockYou), `incident-ctf` (KB6).
      - **Kapitola 5: Týmový projekt a agilní řízení** (`/tymova-spoluprace`, 10 h) – 3 podtémata: `kanban` (TM1, 2 h), `projekt` (TM2, 6 h), `obhajoba` (TM3, 2 h).
    - **Odstranění osiřelých a duplicitních složek:** Z adresářů OSS 3 byly smazány zastaralé složky `linux/sit-a-ssh`, `linux/uvod`, `linux/procesy-a-sluzby`, `linux/logy-a-cron`, `sluzby/bash-automatizace`, `sluzby/proverka`, `sluzby/sit-a-ssh`, `kyberbezpecnost/ad-utoky`, `kyberbezpecnost/ctf`, `kyberbezpecnost/utocnik-a-pravo`, `kyberbezpecnost/web`, `kyberbezpecnost/zranitelnosti`, `tymova-spoluprace/harmonogram` a `tymova-spoluprace/komunikace`.
    - **Synchronizace centrálního registru:** V `thematicPlans.ts` byly bloky pro `ops3` sjednoceny na 5 bloků a opraveny veškeré routy tak, aby ukazovaly na platné funkční URL.

18. **Audit a vyčištění znalostní databáze pro OSS 2 a OSS 3 (Zákaz starých serverových údajů):**
    - Proveden důkladný audit všech znalostních dokumentů (`doc/curriculum/HORAZDOVICE_SVP_OS.md`, `doc/plan.md`) a odstraněny veškeré zastaralé zmínky o rolích Windows Serveru (instalace DC, povýšení domény, IIS, MS SQL, vzdálený PowerShell Remoting, RSAT a teoretické AGDLP/LSDOU).
    - Tyto dokumenty byly synchronizovány s reálným stavem aplikace: OSS 2 je striktně koncipován jako pokročilá administrace klientských stanic Windows 11 Pro, endpoint bezpečnost a uplatňování doménových politik (GPO na klientovi).
    - Znalostní báze je nyní 100% konsistentní napříč všemi soubory.

19. **Korekce časového harmonogramu měsíců v Tematickém plánu OSS 2:**
    - Opraveny měsíční intervaly u všech 4 bloků OSS 2, aby přesně odpovídaly týdenním dotacím (2 h týdně, 33 týdnů) a kalendářnímu roku:
      - Blok 1 (10 h, 1.–5. týden): **Září – Říjen**
      - Blok 2 (20 h, 6.–15. týden): **Říjen – Leden** (opraveno z chybného *Listopad – Leden*, kde scházel říjen)
      - Blok 3 (18 h, 16.–24. týden): **Únor – Duben** (opraveno z chybného *Únor – Březen*, 18 h zasahuje do dubna)
      - Blok 4 (18 h, 25.–33. týden): **Duben – Červen**
    - Odstraněno duplicitní číslování z názvů témat v `PLAN_OSS2` (komponenta `SimplePlanTable` již automaticky generuje index bloku).
    - Změny sjednoceny v `app/.../operacni-systemy-2/tematicky-plan/page.tsx`, `thematicPlans.ts`, `PLAN_OSS2.md` i `doc/plan.md`.

20. **Vytvoření a rozšíření kapitoly Informační systémy a role uživatelů pro 7. třídu ZŠ (Informatika 7):**
    - **Zařazení:** Předmět *Informatika 7* (`inf-7`), routa `/informatika/informacni-systemy`.
    - **Registrace:** Zaregistrováno v `registry/curriculum/schools/defaultSchool.ts` (7. ročník, tag `#is`, ikona `Database`) a `registry/lessons.ts` (kategorie `informacni-systemy`).
    - **Didaktická stavba teorie (Záložka Teorie):** Sestavena didakticky pro sedmáky dle metodiky:
      - Co je informační systém a jeho 4 pilíře (Hardware, Software, Data/Databáze, Lidé/Uživatelé).
      - Kdo je uživatel a jak ho systém rozezná (osobní smartphone vs. sdílený počítač v učebně, uživatelský účet, profil, autentizace).
      - Proč se vyžaduje uživatelský účet – model školní jídelny (*LunchSys*) s čipem, proces ověření objednávky a zásada minimalizace osobních údajů.
      - Uživatelské role a přístupová práva: podrobná porovnávací tabulka 4 rolí (Žák, Vyučující, Zákonný zástupce, Administrátor).
      - Rozšíření: Státní registr obyvatel a důvody pro nejvyšší stupeň zabezpečení.
      - Interaktivní minikvíz se 4 otázkami pro rychlé ověření znalostí přímo v hodině.
    - **Kompletní didaktický a typografický redesign pro 7. třídu ZŠ (Varianta 3):**
      - Na základě reálného ověření z výuky v 7. třídě byl proveden rozsáhlý redesign zaměřený na odstranění kognitivního přetížení a radikální zvýšení čitelnosti na školních monitorech i projekčním plátně:
        1. **Plošné zvýšení typografie a kontrastu (ZŠ Standard):**
           - Kompletní eliminace drobných písem `text-[10px]`, `text-[11px]` a nevýrazné šedé barvy.
           - Základní texty zvětšeny na `text-base` (16px) a `text-lg` (18px) se sytě kontrastním písmem `text-slate-900`.
           - Tlačítka, přepínače a ovládací prvky dostaly velkorysé paddingy (`py-3 px-5`) a výrazné ikony.
        2. **Interaktivní kroková prezentace teorie (`InformationSystemsTheoryTab.tsx`):**
           - Místo jedné dlouhé nepřehledné skrolovací stránky převedena teorie do 5 přehledných velkých vizuálních karet (1. Co je IS, 2. Jak funguje cyklus, 3. 4 pilíře, 4. Účet a profil, 5. Role a práva).
           - Přidána horní krokovací lišta 1..5 a spodní navigační tlačítka „Předchozí“ a „Další téma“ s možností přepnutí na celkový přehled.
        3. **Zpřehlednění a zvětšení simulátoru žákovské knížky:**
           - V `GradebookTasksPanel.tsx` zvětšeny texty zadání cílů a otázek na `text-lg font-black`, vstupy pro odpovědi a ověřovací tlačítka mají výšku 48px+.
           - V `GradeTable.tsx` i `EditableGradeTable.tsx` zvětšeny známkové dlaždice na `w-10 h-10` s velkými číslicemi, názvy předmětů a průměry jsou tučně a vysoce kontrastní.
           - V `ParentView.tsx` a `TeacherView.tsx` zvětšen přepínač dětí a žáků do podoby velkých reprezentativních tlačítek s třídou a ikonami.
        4. **Vzdušné 2sloupcové rozložení Karty strávníka (`LunchSysSelectionStep.tsx`, `LunchSysFlipCard.tsx`):**
           - Zrušena stísněná 3sloupcová mřížka ve prospěch prostorných 2 sloupců (`grid-cols-1 sm:grid-cols-2`).
           - Zvětšeny rozměry kartiček (`h-48 sm:h-52`), písma nadpisů a zadní vysvětlující texty pro snadné čtení.
        5. **Vyčištění a zvětšení zadání projektových úloh:**
           - Zvětšena písma v zadání `LibraryLoansTableTab.tsx` a `SmartLightingProjectTab.tsx`.
    - **Sjednocení praktických úloh do hlavní záložky „Aktivity“:**
      - Kvůli vysokému počtu položek v hlavní navigační liště byla kapitola zpřehledněna do 3 hlavních záložek:
        1. **Řízená diskuze** (`diskuze`)
        2. **Přehled teorie** (`teorie`)
        3. **Aktivity** (`aktivity`) – samostatný modul `InformationSystemsActivitiesTab.tsx`, který obsahuje přehledný číselný přepínač pro 5 praktických úloh:
           - 1. *Karta strávníka* (3kroková badatelská aktivita)
           - 2. *Diagram knihovny* (interaktivní editor vazeb)
           - 3. *Tabulka výpůjček* (návrh databázových sloupců)
           - 4. *Výzva: Chytré osvětlení* (týmový projekt)
           - 5. *Žákovská knížka* (simulátor rolí a misí)
      - Propojení z řízené diskuze („Vyzkoušet v simulátoru“) automaticky přepne na záložku `Aktivity` a aktivuje přímo *Žákovskou knížku*.
    - **Zjednodušení názvů navigačních tlačítek a záložek:**
      - V souladu s požadavkem na čistý a obecný jazyk byly z tlačítek a záložek odstraněny názvy konkrétních systémů:
        - Záložka `Karta strávníka (LunchSys)` zkrácena na čisté **`Karta strávníka`**.
        - Záložka `Žákovská knížka (Bakaláři)` zkrácena na čisté **`Žákovská knížka`**.
        - Tlačítko přechodu v řízené diskuzi upraveno na **`Vyzkoušet v simulátoru`**.
    - **Záložka Karta strávníka (Školní jídelna a čip):**
      - Třístupňová didaktická aktivita zařazená před diagram knihovny:
        - **Krok 1 (Brainstorming):** Životní situace (pípnutí čipem u výdeje oběda), centrální otázka k zamyšlení bez nápověd a vizuální prázdná karta `[ LUNCHSYS: KARTA UŽIVATELE ]` pro samostatnou úvahu.
        - **Krok 2 (Sestavení karty):** Výběr z 11 kartiček do karty strávníka, žáci čekají na pokyn učitele a až poté kliknou na tlačítko „Vyhodnotit výběr“ (žádný pokus-omyl v průběhu).
        - **Krok 3 (Reflexe a 3D flip kartičky):** Oranžové označení zbytečných údajů (chytáků porušujících ochranu soukromí), plynulé 3D otočení kartičky po kliknutí s podrobným vysvětlením PROČ ANO / PROČ NE (minimalizace údajů, ochrana soukromí / GDPR), tlačítko „Vrátit zpět“ pro vyčištění karty (bez automatického nápovědného spoileru). Ocenění po sestavení optimální karty.
      - **Modulární architektura:** V podsložce `components/informatika/informacni-systemy/lunchsys/` (`LunchSysTypes.ts`, `lunchSysData.ts`, `LunchSysFlipCard.tsx`, `LunchSysBrainstormStep.tsx`, `LunchSysSelectionStep.tsx`, `LunchSysChapterTab.tsx`).
    - **Záložka Projektové zadání (Chytré osvětlení):**
      - Týmová vývojářská úloha pro trojice na papír (návrh technických prvků a pravidel chování chytrého pouličního osvětlení).
    - **Záložka Návrh databáze knihovny:**
      - Čisté zadání na papír / do sešitu bez spoilerů (odebrána dřívější „Banka nabízených sloupců“ s předpřipravenými tlačítky, žáci pracují zcela samostatně).
      - Maximálně čisté zadání na papír bez nápověd a spoilerů (odebrány veškeré dřívější návodné bloky). Náčrt tabulky pro překreslení do sešitu zobrazuje pouze 3 sloupce a tečky `...` naznačující další libovolné sloupce bez prozrazení jejich přesného počtu.
    - **Simulátor žákovské knížky Bakaláři (Záložka Žákovská knížka):**
      - **Autentizace heslem:** Všechny uživatelské účty (žáci, rodiče, učitelé, administrátor) mají nastavena realistická uživatelská jména a hesla. Přihlášení vyžaduje zadání hesla přes modální okno `BakalariPasswordModal`.
      - **Dvourežimový provoz:** Přepínač mezi režimem *Volná práce* (volné zkoumání systému) a *Mise a úkoly* (5 didakticky gradovaných misí pokrývajících role v systému a relace databáze).
      - **Aktivní badatelské mise:**
        1. *Role: Žák* – vyhledat hodnotu Janova nejhoršího průměru (`2` / `2.00`).
        2. *Role: Rodič* – zjistit celkový počet jedniček u dětí paní Krásné (`3`; žák musí sám v systému objevit a zkontrolovat obě své děti).
        3. *Role: Vyučující* – v roli učitele Mgr. Vomáčky zjistit žáka 7.A s nejlepším celkovým průměrem (`Lucie Černá`).
        4. *Role: Administrátor (Zjištění dat)* – zjistit celkový počet evidovaných rodičovských účtů (`3`).
        5. *Role: Administrátor (Akční úkol bez textové odpovědi)* – v sekci Správa uživatelů vytvořit nového zákonného zástupce Petra Svobodu a přiřadit mu dvě děti: Jana Nováka a Adama Svobodu. Systém automaticky detekuje splnění v databázi.
      - **Vyčištění formulářů:** Ze všech vstupních polí pro odpovědi byly odebrány veškeré placeholder texty a nápovědy.
      - **Hesla uživatelů:** Nastavena 8místná hesla s kombinací písmen a číslic (`sova8314`, `luna6429`, `kolo7291`, `most5832`, `javor631`, `perla482`, `cesta915`, `skola394`, `sprav842`).
      - **Rozšíření Správy uživatelů (`UserManagementPanel.tsx`):**
        - Přidáno tlačítko „Upravit děti“ u každého rodiče umožňující kdykoliv dynamicky přiřadit či odebrat žáky v databázi (včetně žáků vytvořených až po založení rodiče).
        - Přidán volitelný výběr rodiče při zakládání nového žáka.
        - Automatické generování přihlašovacích loginů a hesel pro nově vytvořené žáky a rodiče.
    - **Architektura:** Striktně dodrženo Pravidlo 13 (žádný monolit), plně modulární dekompozice v `components/informatika/informacni-systemy/` a podsložce `gradebook/` (`GradebookTasksTypes.ts`, `GradebookTasksData.ts`, `GradebookTasksPanel.tsx`, `BakalariPasswordModal.tsx`, `GradebookSimulator.tsx`).

21. **Vytvoření hodnocené práce (testu) Výpočet kapacity záloh pro OSS 2 (Blok 1):**
    - **Komponenta:** `BackupCapacityTestWorksheet.tsx` (`components/specializovana/operacni-systemy-2/zalohovani/BackupCapacityTestWorksheet.tsx`) postavená na šabloně `TestWorksheetShell`.
    - **Routa:** `/specializovana/operacni-systemy-2/zalohovani/test`.
    - **Přístupové PINy:** Studentský PIN `ZAK2026`, Učitelský PIN `OS2026`.
    - **Obsah zadání (A4 tiskový formát s řešením):**
      - Závazná pravidla a předpoklady (denní večerní zálohování, pondělní plná záloha, souborová úroveň, nepřepisování archivů).
      - Úloha 1: Pouze vznik nových souborů (tabulka výpočtu denních velikostí pro plnou, inkrementální a diferenciální zálohu + celkový objem na disku).
      - Úloha 2: Vznik nových souborů a úprava stávajících (úprava velikosti databáze, nový PDF report, čtvrtek beze změn s nulovým přírůstkem pro inkrementální zálohu).
      - V učitelském režimu kompletní vzorové hodnoty zvýrazněné červeně s podrobným vysvětlením logiky výpočtu.
22. **Přepnutí kontextu na předmět Programování a vývoj her 1 (PVH 1 / PRG 1):**
    - Kontext aktivního vývoje byl přepnut na 1. ročník oboru IT – **Programování a vývoj her 1 (PVH 1 / PRG 1)**.
    - Aktivní plánovací tabule [`doc/plan.md`](./plan.md) byla synchronizována s dedikovaným plánem [`doc/plans/PLAN_PRG1.md`](./plans/PLAN_PRG1.md) a kurikulárním profilem [`doc/curriculum/PRG1.md`](./curriculum/PRG1.md).
    - Zkontrolován stav témat: 5 modulů ve Scratchi (Sekvence, Proměnné, Cykly, Podprogramy, Podmínky se 14 úlohami vč. Bankomatu a Validátoru) a syntetický projekt 3D Raycaster Engine (Wolfenstein 3D).

23. **Vytvoření kapitoly Seznamy (Lekce 6) v předmětu PVH 1 (Scratch):**
    - **Komponenta:** `ScratchListsChapter.tsx` (`components/specializovana/programovani/scratch/ScratchListsChapter.tsx`).
    - **Routa & Navigace:** Zařazeno v rozcestníku Scratche (`/specializovana/programovani/scratch`) na 6. pozici za Podmínky (tag `#scr6`, ikona `ListOrdered`, `onSelectChapter(6)`). Přidána podpora přímého otevření přes query parametr `?lekce=6`.
    - **UI & Layout:** Striktní dodržení Pravidla 6 (`FsChapterShell`, `accentColor="border-amber-500"`, metodický přepínač s PINem `1234` / `OS2026`, úkoly v kontejneru `flex flex-col gap-8`).
    - **Teorie a didaktická struktura:**
      - Rozdíl mezi proměnnou (jedna krabička) a seznamem/polem (pořadač s indexovanými přihrádkami 1..N).
      - Přehled bloků: akční příkazy (`přidej`, `smaž`, `smaž všechno`, `vlož na pozici`), reportéry (`položka`, `délka`, `pozice`) a predikát `obsahuje?`.
    - **8 gradovaných úloh:**
      - Úkol 1: Nákupní seznam a inicializace (`NakupniSeznam.sb3`) – význam `smaž všechno z [nákup]` před startem.
      - Úkol 2: Interaktivní sběr položek do batohu (`BatohHrace.sb3`) – propojení `zeptej se` s ukládáním do seznamu v cyklu.
      - Úkol 3: Použití předmětu a posouvání indexů (`InventarLektvaru.sb3`) – mazání položky 1 a automatický posun prvků.
      - Úkol 4: VIP Vstupní brána (`VipBrana.sb3`) – test přítomnosti položky v seznamu přes `obsahuje?` a větvení `když - tak - jinak`.
      - Úkol 5: Procházení seznamu cyklem s indexem `i` (`CtenarSeznamu.sb3`) – fundamentální vzor traverzování pole.
      - Úkol 6: Zábavná věštírna (`Vestirna.sb3`) – dynamická náhoda `od 1 do délka [seznam]`.
      - Úkol 7: Vrcholový herní projekt – Žebříček TOP 3 nejvyšších skóre (`TopSkore.sb3`) – vkládání na pozici a ořezávání seznamu.
      - **Úkol 8: Seznamy vlastními bloky (`SeznamyLehkePriklady2.sb3`):** Modulární úloha propojující seznamy s procedurami (*Moje bloky*). Rozdělena do 4 samostatných podprogramů: `Naplň seznam`, `Najdi největší číslo`, `Najdi nejmenší číslo`, `Spocitej prumer` a hlavní orchestrátor pod zelenou vlajkou.
      - **Úkol 9: Počet výskytů čísla s parametrem (`PocetVyskytu.sb3`):** Vyhledávací a počítací algoritmus s využitím vlastního bloku se vstupním formálním parametrem `tiskni počet výskytů (hledané číslo)`. Žáci porovnávají prvky seznamu s parametrem, inkrementují čítač a kocour výsledek oznámí bublinou (např. *„Pocet vyskytu cisla 3 je 2“*). Ukazuje čisté volání funkce s argumentem z hlavního scénáře bez vedlejších efektů globálních proměnných.
      - **Úkol 10: Vytvoření unikátního seznamu / Deduplikace (`UnikatniSeznam.sb3`):** Vytvoření množiny unikátních hodnot z původního seznamu `seznam` do `unikatni_seznam`. Rozšíření bloku `Naplň seznam (počet) (max)` o 2 parametry pro garantovaný vznik duplicit (např. 15 prvků s maximem 5), procedurální deduplikace cyklem a testováním `když < ne < [unikatni_seznam] obsahuje (položka (i) z [seznam])? > > tak vlož`. Vizuální diagram převodu přímo v zadání.
    - **Registrace:** Zaregistrováno v `defaultSchool.ts` (subchapters pro `scratch`), v `registry/lessons.ts` (`id: 'scratch-seznamy'`) a v plánech `PLAN_PRG1.md` i `doc/plan.md`.

24. **Návrh a schválení čtyřletého kurikula Programování a vývoj aplikací (PRG 1–4):**
    - **Hodinová dotace:** Zaveden model **3 – 2 – 3 – 2** (PRG 1: 99 h · PRG 2: 66 h · PRG 3: 99 h · PRG 4: 50 h = celkem **314 hodin**).
    - **Oficiální dokument ŠVP InspIS:** Vytvořen oficiální dokument [`doc/curriculum/PRG_SVP_INSPIS.md`](./curriculum/PRG_SVP_INSPIS.md) podle standardu ČŠI InspIS a vzoru SŠ Horažďovice.
    - **Koncepce a didaktická gradace:**
      - **1. ročník (PRG 1 – 99 h):** Vizuální blokové programování ve Scratchi (vč. zpráv a klonování, 36 h) ➔ Teorie algoritmizace a vývojové diagramy (vlastnosti algoritmu, normalizované značky, čtení a tvorba diagramů, 9 h) ➔ Algoritmizace v hardware na mikrokontrolérech (12 h) ➔ Přechod k textovému Pythonu s okamžitou grafickou vizualizací v Canvasu (42 h). 3D Raycaster vyřazen jako volitelný rozšiřující modul.
      - **2. ročník (PRG 2 – 66 h):** Pokročilé datové struktury (slovníky, řezy, list comprehension, 16 h) ➔ Práce se soubory (TXT, CSV, JSON) a ošetření výjimek (14 h) ➔ Základy OOP v Pythonu (třídy, instance, `__init__`, zapouzdření, 16 h) ➔ Vývoj okenních desktopových aplikací s grafickým uživatelským rozhraním GUI (20 h).
      - **3. ročník (PRG 3 – 99 h):** Tvorba prostorové scény, materiálů a osvětlení v simulačním enginu Unity s jednoduchými skripty interakce a fyziky z připravené školní šablony a exportem na cílové zařízení / VR (1. pololetí, 45 h) ➔ Základy síťové komunikace, architektura klient–server v Pythonu, rekapitulace jazyka SQL (známého z Databází) a jeho integrace s Pythonem a REST API (2. pololetí, 54 h).
      - **4. ročník (PRG 4 – 50 h):** Dokončení klient–server architektury o webové klientské rozhraní vedle desktopu, bezpečnost a autentizace uživatelů (hashování hesel, ochrana vstupů, 14 h) ➔ Softwarové inženýrství, testování a týmový Git (12 h) ➔ Závěrečný syntetický maturitní projekt a veřejná obhajoba (24 h).
    - Aktualizovány pracovní plány `PLAN_PRG1.md`, `PLAN_PRG2.md`, `PLAN_PRG3.md`, `PLAN_PRG4.md` i aktivní plánovací tabule `doc/plan.md`.

25. **Implementace akčních tlačítek a tematických plánů předmětů PRG 1–4 (Shodná struktura jako OSS):**
    - **UI & Tlačítka v rozcestnících:**
      - V komponentě `DynamicSubjectHub.tsx` aktivována akční tlačítka **„Tematický plán a ŠVP předmětu“** pro všechny 4 ročníky programování (`prg1`, `prg2`, `prg3`, `prg4`) se zobrazením dynamické hodinové dotace v pilulce (`99 h` pro PRG 1 a 3, `66 h` pro PRG 2, `50 h` pro PRG 4).
      - Do kurikula školy (`registry/curriculum/schools/defaultSchool.ts`) v divizi `specializovana-it` přidány karty a definice předmětů:
        - **PRG 3 (3. ročník):** `route: '/specializovana/programovani-3'`, 99 h, 5 kapitol (3D prostředí v Unity, Fyzika a interakce, Sestavení a HUD, Architektura klient–server, Backend a SQL databáze).
        - **PRG 4 (4. ročník):** `route: '/specializovana/programovani-4'`, 50 h, 4 kapitoly (Webový klient a frontend, Zabezpečení a autentizace, Softwarové inženýrství a Git, Komplexní maturitní projekt).
      - V `registry/curriculum/iconRegistry.ts` doplněny chybějící ikony `Globe`, `Box`, `Gamepad2`.
    - **Tematické plány a ŠVP stránky:**
      - Vytvořen centrální modul `registry/curriculum/prgPlanTopics.ts` obsahující `PlanTopic[]` data pro všechny 4 ročníky v přesném souladu se schválenými dotacemi (99 h, 66 h, 99 h, 50 h).
      - Komponenta `SvpInspisTable.tsx` i `SimplePlanTable.tsx` upraveny pro podporu volitelného `sharedInfo` (`SvpSharedInfo`) a dynamického výpočtu týdenní dotace `weeklyInfo` (99 h ➔ 33 týdnů × 3 h; 50 h ➔ 25 týdnů × 2 h).
      - Vytvořeny plně funkční routy pro všechny ročníky obalené v `CategoryLayout`:
        - `/specializovana/programovani/tematicky-plan`
        - `/specializovana/programovani-2/tematicky-plan`
        - `/specializovana/programovani-3` a `/specializovana/programovani-3/tematicky-plan`
        - `/specializovana/programovani-4` a `/specializovana/programovani-4/tematicky-plan`
    - **Ověření:** Všech 9 souvisejících rout otestováno proti běžícímu vývojovému serveru s návratovým kódem HTTP 200 a ověřením přítomnosti tlačítek i záložek.

26. **Harmonizace ŠVP PRG 1–4 se standardem SŠ Horažďovice (InspIS ČŠI) a didaktická reflexe:**
    - **Uložení originálního ŠVP Horažďovice:** Celé oficiální akreditované PDF kurikulum SŠ Horažďovice (*Vývoj aplikací a her*, 146 stran, 3.6 MB) bylo trvale archivováno v repozitáři v [`doc/curriculum/references/horazdovice_svp_vyvoj_aplikaci_a_her.pdf`](./curriculum/references/horazdovice_svp_vyvoj_aplikaci_a_her.pdf) pro možnost budoucího detailního porovnávání.
    - **Srovnávací analýza větných konstrukcí a technologií:**
      - Zjištěno, že Horažďovice ve svém ŠVP explicitně uvádějí konkrétní jazyky (Lua v 1. roč., PHP, JavaScript, SQL), herní enginy (Unity na 8 místech, Unreal Engine), verzovací nástroje (Git na 11 místech) i frontendové frameworky s možností volby / orientačně (Bootstrap, Tailwind, React, Vue, jQuery).
      - Naše výstupy v PRG 1–4 byly stylisticky sjednoceny s přísným kánonem InspIS ČŠI:
        - Krátké, úderné 1-větné výstupy začínající aktivním slovesem ve 3. os. j. č. přítomného času (`využívá`, `vytváří`, `používá`, `popíše`, `implementuje`, `navrhne`, `spravuje`, `prezentuje a obhájí`).
        - Odstraněna rozvleklá souvětí a akademické kudrlinky.
        - Odstraněno suché trasování proměnných z PRG 1 dle požadavku uživatele.
        - Změny plně propsány do [`doc/curriculum/PRG_SVP_INSPIS.md`](./curriculum/PRG_SVP_INSPIS.md) i do aplikačního registru [`registry/curriculum/svpData.ts`](../registry/curriculum/svpData.ts).
    - **Metodické ukotvení a didaktická reflexe hraničních témat:**
      - **Je toho málo / moc?** Potvrzeno, že model 3-2-3-2 (314 hodin celkem) je přesně na horní hraně reálné kapacity středoškoláka (2 h týdně ve 2. a 4. roč. představují po odečtení svátků, exkurzí a maturit pouze cca 45–55 reálných hodin).
      - **Identifikováno 5 didakticky hraničních témat a navrženo jejich bezpečné zvládnutí:**
        1. *Přechod k OOP a parametr `self` (2. roč.)* – funkční pojetí přes okno Tkinteru / herní postavu namísto abstraktní zoologie.
        2. *Asynchronní událostní smyčka GUI (2. roč.)* – oddělení layoutu od callbacků, analogie recepční.
        3. *Mentální model Klient–Server (3. roč.)* – testování JSONu nejprve přímo v prohlížeči (`localhost:5000/api/...`), teprve pak napojení klienta.
        4. *Kybernetická bezpečnost: Hashování hesel se solí, SQL Injection, XSS (4. roč.)* – pro žáky mimořádně atraktivní praktické téma zvládnutelné za 2–3 hodiny (vyzkoušení útoku `' OR '1'='1` a oprava otazníkem `?`, hashování přes `werkzeug.security` na 2 řádky kódu, automatický auto-escaping šablon).
        5. *Týmový Git a merge konflikty (4. roč.)* – modulární dělení práce (server vs. klient) a využití vizuálního rozhraní (VS Code / GitHub Desktop).
      - **Webový mikrorámec:** Vyjasněna terminologie – odlehčený vývojový server v Pythonu (Flask/FastAPI) o 5 řádcích kódu se zabudovaným HTTP serverem a směrováním.


27. **Přepnutí kontextu na předmět Programování a vývoj aplikací 2 (PVH 2 / PRG 2):**
    - Kontext aktivního vývoje byl přepnut na 2. ročník oboru IT – **Programování a vývoj aplikací 2 (PVH 2 / PRG 2)**.
    - Aktivní plánovací tabule `doc/plan.md` byla aktualizována a nastavena na předmět PRG 2 (66 h / 33 týdnů).
    - Základní témata ročníku: Pokročilé datové struktury a kolekce v Pythonu (16 h), Práce se soubory, perzistence (JSON/CSV) a výjimky (14 h), Základy OOP (16 h), Vývoj aplikací s grafickým rozhraním GUI v Tkinteru (20 h).

28. **Přepnutí kontextu na předmět Operační systémy 1 (OSS 1):**
    - Kontext aktivního vývoje byl přepnut na 1. ročník oboru IT – **Operační systémy 1 (OSS 1)**.
    - Aktivní plánovací tabule `doc/plan.md` byla nastavena na předmět OSS 1 (66 h / 33 týdnů).
    - Výchozí routa: `/specializovana/operacni-systemy-1`.
    - Stav kurikula: Bloky 1–3 (Hardware & architektura, Souborové systémy a boot, Procesy & virtuální paměť) jsou plně hotové; navazují bloky 4–10 (GUI, CLI & BAT, Uživatelé & NTFS, Správa software, Ovladače & Plánovač, Sítě LAN, Závěrečný projekt).

29. **Didaktická a vizuální harmonizace kapitoly PR2 Střídání procesů (Multitasking - OSS 1):**
    - V kapitole **PR2: Střídání procesů (Multitasking)** (`components/specializovana/operacni-systemy/procesy/stridani/ProcessSwitchingTheoryTab.tsx`):
      - Na vrchol teorie nasazena čistá komponenta `DefinitionCard` s etymologií (*multi = mnoho, task = úloha*) a srovnáním s jednoúlohovým MS-DOS.
      - **Blok A (Iluze multitaskingu):** Zobecněn na čisté vysvětlení dělení času (Time-Sharing) a časových kvant (10–30 ms) na jednom procesoru. Odstraněno předčasné označení "Preemptivní multitasking" v tomto bloku i na odznaku schématu, nahrazeno neutrálním *Střídání v čase*.
      - **SVG Schéma střídání úloh:** Vytvořen responzivní SVG diagram bez horizontálního posuvníku s osou $X$ (čas na CPU od $t=0$, šipka doprava) a střídáním úloh Word, Spotify a Prohlížeč přesně podle učebnicového modelu.
      - **Blok B (Kooperativní vs. Preemptivní multitasking):** Vytvořen samostatný blok vysvětlující zásadní rozdíl: dobrovolné vzdávání se CPU (`yield`) u starých systémů (Windows 3.1) vs. nucené odebrání procesoru hardwarovým časovačem (preempce) v moderních OS chránící systém před zamrznutím.
      - **Blok C (Přepnutí kontextu):** Vizuální schéma sjednoceno do **stejného formátu horizontální časové osy jako v Bloku A** (Osa X s časem na CPU, řádky Úloha A a Úloha B). Mezi modrými bloky běhu úloh jsou vloženy žluté přechodové bloky reprezentující okamžik přepnutí kontextu (`1. Uložit do PCB 1 ➔ 2. Načíst z PCB 2`). Tím žák na první pohled vidí přesně ten okamžik na časové ose, kdy se procesor věnuje jádru OS. Doplněny pouze 2 stručné definiční karty pro PCB a Registr PC.
      - Odstraněna zavádějící analogie filmového plátna a veškeré zmínky o vícejádrových CPU pro zachování čistého mentálního modelu 1 CPU pro žáky 1. ročníku SŠ.

30. **Nová interaktivní záložka „Opakovací otázky“ v kapitole PR2 Střídání procesů (OSS 1) & Standardizace TopicReviewQuiz:**
    - Do orchestrátoru kapitoly [`ProcessSwitchingChapter.tsx`](components/specializovana/operacni-systemy/procesy/ProcessSwitchingChapter.tsx) přidána nová třetí záložka:
      `{ id: 'questions', label: 'Opakovací otázky', icon: HelpCircle }`.
    - Vytvořen dedikovaný datový modul [`processSwitchingQuestionsData.ts`](components/specializovana/operacni-systemy/procesy/stridani/processSwitchingQuestionsData.ts) obsahující **20 didakticky propracovaných otázek** rozdělených do 4 tematických bloků:
      1. *Dělení času na CPU* (iluze multitaskingu, výpočet počtu kvant za sekundu $1000/20 = 50$, fronta úloh $4 \times 15 = 60\text{ ms}$, jednoúlohový MS-DOS).
      2. *Principy multitaskingu* (příčiny pádů Windows 3.1, pojem preempce, hardwarový časovač / Timer, příkaz `yield`).
      3. *Střídání úloh* (definice kontextu procesu, registr PC / čítač instrukcí a důsledky jeho ztráty, kroky přepnutí, výpočet čistého CPU času $199{,}6\text{ ms}$).
      4. *Režie & Výpočty* (karta PCB a její obsah, proč kvantum nemůže být $0{,}0001\text{ ms}$ ani $1\,000\text{ ms}$, výpočet procenta režie $1\text{ ms}/20\text{ ms} = 5\,\%$).
    - **Globální šablona `TopicReviewQuiz` ([`components/ui/TopicReviewQuiz.tsx`](components/ui/TopicReviewQuiz.tsx)):**
      - Celá komponenta byla povýšena na univerzální a opakovaně použitelnou šablonu pro jakékoliv budoucí opakovací sekce (zapsáno do pravidla 15 v `AGENTS.md`).
      - Orchestrátor [`ProcessSwitchingQuestionsTab.tsx`](components/specializovana/operacni-systemy/procesy/stridani/ProcessSwitchingQuestionsTab.tsx) byl zredukován na štíhlý ~30řádkový wrapper.
      - **Klíčové vlastnosti šablony:**
        1. *Výhradní čisté krokování:* Žádný matoucí přepínač na „Vše najednou“, žák prochází otázky po jedné. V záhlaví je skoková lišta čísel 1..N.
        2. *Zadání bez spoilerů:* Otázky nemají podnadpisy (`title`), které by prozrazovaly odpověď.
        3. *Dvoutaktní interakční tlačítko:* Po zadání odpovědi je aktivní tlačítko **„Vyhodnotit“** (nebo Enter). Po kliknutí se otázka vyhodnotí, rozbalí se didaktické vysvětlení a tlačítko se změní na zelené **„Další otázka“**. Teprve dalším kliknutím se přechází dál.
        4. *Náhodné míchání odpovědí (Fisher-Yates Shuffle):* Při startu i při každém resetu jsou možnosti otázek (single i multiple choice) náhodně promíchány.
        5. *Závěrečné vyhodnocení s vysokým kontrastem:* Světlá karta s tmavým písmem (`text-slate-900`), celkovým skóre a podrobným rozborem chybně zodpovězených otázek (každá s označením chybné volby žáka ❌, správného řešení ✓ a podrobného vysvětlení 💡). Akce: „Opakovat celé znovu (nové pořadí)“ a „Prohlédnout otázky v testu“.

31. **Didaktická restrukturalizace praktického listu v kapitole Procesy a paměť (OSS 1):**
    - V praktickém laboratorním protokolu [`ProcessIntroWorksheetTab.tsx`](../components/specializovana/operacni-systemy/procesy/intro/ProcessIntroWorksheetTab.tsx) byla provedena zásadní didaktická gradace a úprava úloh dle požadavků z výuky:
      - **Úkol 3 (Zjištění PID v GUI):** Aplikace Poznámkový blok byla nahrazena za **Malování (`mspaint.exe`)** a **Kalkulačku (`calc.exe`)**. Úkol se soustředí výhradně na odečet PID v grafickém rozhraní Správce úloh (záložka *Podrobnosti*). CLI příkaz `tasklist` byl z tohoto úkolu vyčleněn.
      - **Nový Úkol 4 (První seznámení s CLI & tasklist):** Popisuje postup spuštění Příkazového řádku (`Win + R ➔ cmd ➔ tasklist`). Studenti v dlouhém výpisu ručně vyhledají procesy `mspaint.exe` a `CalculatorApp.exe`, zapíší jejich PID a porovnají je s PID z Úkolu 3 v přehledné srovnávací tabulce (samostatné textové otázky 4.1 a 4.2 byly na žádost uživatele vyřazeny, úkol končí přímo vyplněním tabulky).
      - **Nový Úkol 5 (Filtrování podle názvu v CLI - tasklist /FI):** Přidána podrobná nápovědná karta vysvětlující syntaxi přepínače `/FI`, atribut `IMAGENAME`, operátor `eq` a zástupný znak `*`. Studenti filtrují Malování (`tasklist /FI "IMAGENAME eq mspaint.exe"`), zkouší wildcard `m*` a zapisují celkový počet nalezených procesů (nadbytečné pole pro opis příkazu i teoretická otázka na operátor `ne` byly vyřazeny).
      - **Úkol 6 (Samostatné filtrování podle paměti RAM):** Samostatná práce s nápovědou `tasklist /?`. Studenti sami sestaví filtr na procesy nad 300 MB bez napovídajících placeholderů, zapíší top 3 procesy do tabulky a v otázce 6.1 navrhnou příkaz pro procesy pod 10 MB (nápověda operátoru `lt` byla z otázky odstraněna).
      - **Úkol 7* (Dvě instance v RAM — Malování):** Poznámkový blok nahrazen za **Malování (`mspaint.exe`)**. Spuštění 2 oken Malování vedle sebe, ověření jejich samostatných PID přes `tasklist /FI "IMAGENAME eq mspaint.exe"` a didaktické otázky na důvody unikátnosti PID a výhodu paměťové izolace při pádu jedné instance.
      - **Úkol 8* a Úkol 9* (Rozšiřující část pro pokročilé):** Úkoly byly vzájemně prohozeny:
        - **Úkol 8\*** představuje téma *Program na disku vs. Proces v paměti RAM (Instrukce vs. Data)* s měřením velikosti souboru na disku vs. v RAM po čistém spuštění. Nadbytečné stahování 1MB souboru i druhá otázka byly odebrány a otázka 8.1 je přímo položena bez návodné věty v závorce a bez napovídajícího textu v poli pro odpověď.
        - **Úkol 9\*** představuje téma *Rodičovský proces (PPID) a stromová hierarchie v Process Exploreru* s vyhledáním hierarchie rodič–potomek a vysvětlením dědění práv.
      - **100% soulad Word exportu:** Funkce `handleExportWord` byla kompletně synchronizována s novou 9úlohovou strukturou se zpětnou kompatibilitou dříve uložených stavů v `localStorage`.


32. **Přepracování opakovacího kvízu v kapitole Úvod do malwaru a principy nákazy (OSS 2) dle standardu TopicReviewQuiz:**
    - Původní monolitický kvíz [`MalwareQuizTab.tsx`](components/specializovana/operacni-systemy-2/bezpecnost/malware/MalwareQuizTab.tsx) byl kompletně přepracován podle globálního standardu definovaného v pravidle 15 `AGENTS.md`.
    - Vytvořen dedikovaný datový modul [`malwareQuestionsData.ts`](components/specializovana/operacni-systemy-2/bezpecnost/malware/malwareQuestionsData.ts) obsahující **15 didakticky propracovaných otázek** rozdělených do 4 tematických kategorií:
      1. *CPU a princip nákazy* (slepé vykonávání instrukcí procesorem, formát PE a sekce .text/.data, Entry Point a technika Entry Point Hijacking).
      2. *Typy malwaru a šíření* (klíčový rozdíl mezi parazitickým virem a autonomním červem, trojský kůň a jeho charakteristiky, funkce dropperu a payloadu).
      3. *Útoky a techniky* (proč OS nezabrání ransomwaru v šifrování pod právy uživatele, odposlech kláves přes Windows Hook v RAM, neúčinnost maskování tečkami v HTML, role C2 serveru pro botnety).
      4. *Detekce a obrana* (lavinový efekt SHA-256 při změně jediného bajtu, proč Process Explorer vyžaduje administrátorská práva, 2FA ochrana proti odcizení přihlašovacích údajů z keyloggeru, zálohovací pravidlo 3-2-1, princip cloudového multiskeneru VirusTotal).
    - Komponenta [`MalwareQuizTab.tsx`](components/specializovana/operacni-systemy-2/bezpecnost/malware/MalwareQuizTab.tsx) zredukována na štíhlý 28řádkový orchestrátor napojený na `TopicReviewQuiz` s perzistencí do `localStorage` (`intlab_malware_review_quiz_v1`) a ikonami kategorií (`Cpu`, `Network`, `Lock`, `ShieldCheck`).
    - Splňuje všechna kritéria standardu: čisté krokování otázek po jedné se skokovou lištou, zadání bez spoilerů, dvoutaktní tlačítko (Vyhodnotit ➔ Další otázka), Fisher-Yates shuffle možností a závěrečný přehled chyb s vysokým kontrastem.

33. **Didaktická revize a rozšíření praktického laboratorního listu v kapitole Správa procesů a digitální certifikáty (OSS 2):**
    - Praktický list byl reorganizován do čisté posloupnosti 9 základních úloh + 2 v sekci pokročilé/expertní:
      - **Základní část (Úlohy 1–9):**
        - **Úloha 1:** Smart App Control & SmartScreen v GUI Zabezpečení Windows (Fáze 1 před spuštěním).
        - **Úloha 2:** Kontrola antivirového štítu v reálném čase a verze signatur v GUI Zabezpečení Windows (Fáze 2 ochrana).
        - **Úloha 3:** Kontrola ochrany před ransomwarem (Řízený přístup ke složkám – Controlled Folder Access) v GUI Zabezpečení Windows.
        - **Úloha 4 (NOVÉ GUI):** Inspekce digitálního podpisu a certifikátu aplikace v GUI Průzkumníku Windows (Vlastnosti souboru -> Digitální podpisy -> Podrobnosti -> Zobrazit certifikát; prověření staženého instalátoru např. VLC Media Player z videolan.org – Předmět/Subjekt, Vystavitel CA a stav Certifikační cesty).
        - **Úloha 5:** Stopování procesu `explorer.exe` v CLI (PID, RAM, sestavený příkaz bez spoilerů).
        - **Úloha 6:** Filtrování procesů s pamětí nad 100 MB v CLI (největší proces, RAM, sestavený příkaz bez spoilerů).
        - **Úloha 7:** Živý odposlech síťových TCP spojení v `resmon.exe`, zjištění vlastníka vzdálené IP přes Whois/IPinfo.
        - **Úloha 8:** Cloudová reputace a lustrace na VirusTotal.com (představení 70+ multiskeneru, ověření staženého souboru, skóre detekce a zhodnocení).
        - **Úloha 9:** Živá analýza procesů v Sysinternals Process Explorer & VirusTotal (stažení portable `procexp.exe`, zapnutí kontroly VirusTotal a digitálních podpisů v menu Options, analýza běžícího Malování `mspaint.exe` a druhého libovolného procesu dle výběru žáka – PID, Verified Signer a VirusTotal skóre např. 0/76).
      - **Sekce: Pokročilé úlohy & Expertní výzvy:**
        - **Úloha 10\* (Pokročilé):** Mapování systémových služeb pod `svchost.exe` (`tasklist /svc`) a zdůvodnění maskování útočníků.
        - **Úloha 11\*\* (Expertní výzva):** Vytvoření vlastního nepodepsaného programu (Python/utilita) a demonstrace chybějící pečeti Authenticode v Process Exploreru a varování SmartScreenu.
      - **Závěr:** Závěrečná syntéza byla odebrána, list je přímočarý a praktický. Všechny inputy a popisky mají sjednocené výšky a horizontální zarovnání.
    - Aktualizován typový kontrakt `ProcessProtocolState` v [`processTypes.ts`](components/specializovana/operacni-systemy-2/bezpecnost/procesy/processTypes.ts).
    - Export do Wordu (`handleDownloadWord`) i kopírování protokolu do schránky v [`ProcessCertificatesChapter.tsx`](components/specializovana/operacni-systemy-2/bezpecnost/ProcessCertificatesChapter.tsx) jsou 100% synchronizovány s novým 11úlohovým protokolem.


34. **Kompletní architektonický refaktoring, Decoupling a optimalizace výkonu na větvi `refactor2` (Fáze 1–4):**
    - **Fáze 1 (Bundle & Assets):**
      - Sjednoceny animační knihovny: nahrazeny poslední 3 importy `framer-motion` za `motion/react` (`LandingFooter.tsx`, `SubjectSelection.tsx`, `SchoolDivisionCard.tsx`) a odinstalován balíček `framer-motion` z `package.json`.
      - Zkomprimovány 4 největší statické obrázky v `public/` (`disk_geometry.jpg`, `hdd_internals.jpg`, `ssd_internals.jpg`, `isometric_factory.jpg`), úspora **2,6 MB (-81 %)**.
      - Zavedeno dynamické načítání (`next/dynamic`, `ssr: false`) pro 6 těžkých simulátorů a her v `app/` (`ScratchRaycasterProject`, `HuffmanGame`, `VonNeumannGame`, `WindowsInstallGame`, `DefragGame`, `FATGame`).
    - **Fáze 2 (Dekompozice všech 10 UI monolitů nad 1 000 řádků dle Pravidla 13):**
      - `ScratchConditionsChapter.tsx` (1 903 ➔ 43 řádků) + sdílené `ScratchShared.tsx` + 6 modulů v `scratch/conditions/`.
      - `ProcessIntroWorksheetTab.tsx` (1 707 ➔ 105 řádků) + 4 moduly v `procesy/intro/worksheet/`.
      - `OsArchitectureChapter.tsx` (1 633 ➔ 73 řádků) + 5 modulů v `architektura/`.
      - `ProcessLabTab.tsx` (1 430 ➔ 77 řádků) + 3 moduly v `bezpecnost/procesy/lab/`.
      - `WindowsInstallGame.tsx` (1 352 ➔ 128 řádků) + 5 modulů v `instalace/`.
      - `ScratchRaycasterProject.tsx` (1 194 ➔ 64 řádků) + 2 moduly v `raycaster/`.
      - `ScratchListsChapter.tsx` (1 099 ➔ 35 řádků) + 4 moduly v `scratch/lists/`.
      - `OsEvolutionChapter.tsx` (1 091 ➔ 138 řádků) + 3 moduly v `vyvoj/`.
      - `HuffmanGame.tsx` (1 024 ➔ 86 řádků) + 4 moduly v `compression/huffman/`.
      - `FatChapter.tsx` (1 019 ➔ 70 řádků) + 2 moduly v `souborove-systemy/fat/`.
    - **Fáze 3 (Dekompozice 5 středních monolitů 850–1 000 řádků):**
      - `BarChartsChapter.tsx` (921 ➔ 45 řádků) + 3 moduly v `grafy/bar-charts/`.
      - `BackupCobianChapter.tsx` (910 ➔ 47 řádků) + 3 moduly v `zalohovani/cobian/`.
      - `ProcessSimulatorsTab.tsx` (896 ➔ 17 řádků) + 3 izolované simulátory v `bezpecnost/procesy/simulators/`.
      - `VonNeumannGame.tsx` (895 ➔ 81 řádků) + 3 moduly v `von-neumann/`.
      - `PythonLoopChapter.tsx` (892 ➔ 79 řádků) + 3 moduly v `python-loops/`.
    - **Fáze 4 (Centralizace LocalStorage klíčů & TypeScript Audit):**
      - Vytvořen `lib/storageKeys.ts` (`STORAGE_KEYS`) a re-exportován z `hooks/useLocalStorage.ts`.
      - Upraven `tsconfig.json` (vyloučen samostatný podprojekt `analytics`), ověřen nulový počet chyb v `npx tsc --noEmit` i produkční statický export `npm run build`.


35. **Fáze 5–9 refaktoringu (`refactor2`): IntLab UI Stavebnice, nulová duplikace a modularizace registrů:**
    - **Fáze 5 (IntLab UI Stavebnice):** Vytvořeny univerzální stavební bloky `components/ui/ChapterKit.tsx`, `TaskKit.tsx`, `WorksheetKit.tsx`, `SimulatorKit.tsx` a `lib/wordExport.ts`, plus rozšířen typ `Tone` v `FsShared.tsx` na 15 barevných palet.
    - **Fáze 6 (PRG 2 Python & PRG 1 Scratch ➔ `TaskKit`):** Odstraněny lokálně duplikované pomocné komponenty (`TaskCard`, `TeacherNote`, `PythonSnippet`, `CanvasPreview`, `Rect`, `Text`, `PIN`) ze všech 24 Python kapitol a 6 Scratch kapitol a sjednoceny na `TaskKit` a `ScratchShared.tsx`. Dekomponovány `PythonLoopVarChapter.tsx` (534 ➔ 35 řádků) a `ScratchSubprogramsChapter.tsx` (696 ➔ 45 řádků).
    - **Fáze 7 (Pracovní listy & Word exporty ➔ `WorksheetKit` / `lib/wordExport.ts`):** `VirtualizationWorksheetTab.tsx` migrováno na deklarativní `DeclarativeWorksheet` (`WorksheetSchema`) a sjednocen Word export (`downloadWordDoc`) napříč `DiskMediaWorksheetTab`, `FatWorksheetTab`, `OsEvolutionWorksheetTab`, `CobianWorksheetTab`, `DiskPartitionChapter`, `BackupCloudChapter`, `BackupManualChapter`, `BackupSystemChapter` a `ProcessCertificatesChapter` (`procesy/processExport.ts`).
    - **Fáze 8 (Legacy kvízy ➔ `TopicReviewQuiz` & dekompozice 700+ řádků):** `ArchitectureQuizTab.tsx` a `OsIntroQuizTab.tsx` převedeny na standardizovaný `TopicReviewQuiz` (Pravidlo 15). Dekomponovány `OsIntroChapter.tsx` (715 ➔ 35 řádků), `DiskMediaChapter.tsx` (764 ➔ 37 řádků), `OsBootChapter.tsx` (705 ➔ 140 řádků) a `VirtualizationChapter.tsx` (701 ➔ 40 řádků).
    - **Fáze 9 (Modularizace `registry/`):** Rozděleny obří datové soubory `registry/lessons.ts` (3 736 ➔ 33 řádků, 7 modulů v `registry/lessons/`), `registry/curriculum/thematicPlans.ts` (1 206 ➔ 15 řádků, 4 moduly v `registry/curriculum/thematic-plans/`) a `registry/curriculum/svpData.ts` (1 039 ➔ 4 řádky, 3 moduly v `registry/curriculum/svp/`).

36. **Vytvoření a didaktická optimalizace 3. kapitoly bloku Bezpečnost 1 v OSS 2 – BZ3: Persistence škodlivého kódu a systémový registr (`/specializovana/operacni-systemy-2/bezpecnost/registr`):**
    - Kapitola byla povýšena z osnovy na plnohodnotný 4záložkový modul postavený na nových stavebních sadách (`ChapterKit`, `DeclarativeWorksheet`, `TopicReviewQuiz`) a dekomponovaný v podsložce `registr/` (`PersistenceRegistryChapter.tsx`, `persistenceData.ts`, `PersistenceTheoryTab.tsx`, `PersistenceSimulatorsTab.tsx`, `simulators/PersistenceExplorerSim.tsx`).
    - **Didaktická optimalizace na 4 čisté systémové pilíře:**
      - Vyřazena nadbytečná úroveň Zástupců (`.lnk` Hijacking) i podrobné CLI přepínače (`schtasks /query`, `sc query`, `reg query`), aby se žáci neztráceli v syntaxi a soustředili se na čistou podstatu automatického spouštění.
      - **4 klíčová místa v OS:**
        1. *Složka Po spuštění (`shell:startup`)* – souborová úroveň v `%AppData%` po přihlášení (bez UAC).
        2. *Plánovač úloh (`taskschd.msc`)* – spouštění v čase a při událostech (skryté před Správcem úloh).
        3. *Systémové služby (`services.msc`)* – spouštění před přihlášením pod `SYSTEM` (vyžaduje UAC / elevaci).
        4. *Systémový registr (`regedit`)* – hierarchie `HKCU` vs. `HKLM`, klíče `Run` / `RunOnce`.
    - **Interaktivní průvodce / simulátor ([PersistenceExplorerSim.tsx](components/specializovana/operacni-systemy-2/bezpecnost/registr/simulators/PersistenceExplorerSim.tsx)):**
      - Zrušena stará lišta se zabíjením procesů. Místo toho zaveden vizuální průvodce 5 kroky (4 místa v OS + srovnání Správce úloh vs. Sysinternals Autoruns) s tlačítky pro kopírování příkazů do `Win + R`, kontrolním náhledem okna Windows a odškrtáváním splnění na vlastním PC.
    - **Úprava praktického listu (Úkoly 2 a 5 v BZ3):**
      - *Úkol 2 (Plánovač úloh při přihlášení):* Testovací aplikace změněna na `msedge.exe` (úloha `TestEdge`).
      - *Úkol 5 (Registr – Klíč Run):* Vyřazena Část B se zálohou a obnovou přes export do `.reg` souboru. Spouštěným programem v `HKCU\...\Run` je nově **Plánovač úloh (`taskschd.msc`)** (hodnota `TestPlanovac`). Úkol je zjednodušen na čistý zápis do registru, test spuštění po přihlášení a bezpečné smazání hodnoty.
    - **Rozšíření teoretické záložky (Uživatel vs. SYSTEM):** Do `PersistenceTheoryTab.tsx` přidána nová sekce 2 s dvěma velkými přehlednými rámci:
      1. *Účet Uživatele (User)* – běží po přihlášení, interaktivní okna, přístup k vlastním datům (Plocha, Dokumenty), bez systémových zásahů, ochrana přes UAC.
      2. *Účet SYSTEM (LocalSystem)* – běží okamžitě od startu PC před přihlášením na pozadí, neomezená systémová práva, neexistuje UAC blokace; cíl pro stealth a eskalaci malwaru.
    - **Stav před další iterací:** BZ3 kompletně dokončeno včetně Praktického listu (7 úloh), sjednoceného WorksheetLayout/WorksheetKit a commitnuto do větve `dev`.

37. **Přepnutí kontextu na předmět Programování a vývoj her / aplikací 1–4 (PVH / PRG 1–4):**
    - Kontext aktivního vývoje byl přepnut na 4leté kurikulum **Programování a vývoj her / aplikací (PVH / PRG 1–4)** s celkovou dotací 314 hodin (PRG 1: 99 h · PRG 2: 66 h · PRG 3: 99 h · PRG 4: 50 h).
    - Načteny oficiální podklady ŠVP pro Českou školní inspekci (modul InspIS ŠVP) v [`doc/curriculum/PRG_SVP_INSPIS.md`](curriculum/PRG_SVP_INSPIS.md), profily ročníků [`PRG1.md`](curriculum/PRG1.md) a [`PRG2.md`](curriculum/PRG2.md) a dedikované pracovní plány v `doc/plans/` (`PLAN_PRG1.md`, `PLAN_PRG2.md`, `PLAN_PRG3.md`, `PLAN_PRG4.md`).
    - Aktivní plánovací tabule [`doc/plan.md`](plan.md) byla přepnuta na PVH / PRG 1–4 pro další práci na ŠVP a tematických plánech.
    - **Didaktická optimalizace Bloku 3 a 4 v PVH 1 (ŠVP InspIS):**
      - *Blok 3 (Vestavné systémy a hardware):* Z výsledků vzdělávání byly vyřazeny nízkoúrovňové a teoretické koncepty: *„popíše architekturu mikrokontroléru a jeho periferie“*, *„rozliší digitální a analogové vstupy a výstupy (GPIO)“* a *„aplikuje logiku stavového automatu pro řízení chování zařízení“*. Blok byl vyčištěn na ryze algoritmickou práci s periferiemi (tlačítka, senzory, LED matice, zvuk, rádiové pakety).
      - *Blok 4 (Textový Python a Canvas):* Z výsledků vzdělávání byl odebrán bod *„vytvoří ucelenou interaktivní 2D aplikaci na plátně“* a výstup pro cyklus `for` byl zjednodušen na čisté a obecné *„aplikuje cyklus for a proměnnou cyklu pro opakované činnosti“*.
    - **Didaktická přestavba Bloku 1 v PVH 2 (Datové kolekce v jazyce Python – 16 h):**
      - Název změněn z matoucího *„Pokročilé datové struktury...“* na fundamentální **„Datové kolekce v jazyce Python“** (první reálné seznámení žáků s kolekcemi v textovém Pythonu).
      - Odstraněny předčasné syntaktické konstrukce (slicing, list comprehension).
      - Blok byl nově postaven na univerzálních a robustních základech: pojem kolekce, seznamy (`list`), indexace, délka, procházení cyklem, základní operace (`append`, `insert`, `pop`, `remove`, `sort`), vyhledávání a agregace (`in`, `min`, `max`, `sum`) a asociativní slovníky (`dict`), neměnné n-tice (`tuple`) a množiny (`set`).
    - **Optimalizace a zpřehlednění Bloku 2 v PVH 2 (Práce se soubory (JSON) a ošetření chyb v programu – 14 h):**
      - Z názvu i výstupů byl odstraněn akademický balast (*„perzistence dat“*, *„kontextový manažer“*, *„serializuje a deserializuje“*).
      - Vyřazen formát CSV, který přetěžoval časovou dotaci a vnášel syntaktický chaos (oddělovače, český Excel); časová dotace 14 hodin byla soustředěna na praktickou trojici: textové soubory (4 h), strukturovaná data v JSON (6 h) a ošetření běhových chyb `try-except` (4 h).
    - **Didaktická revize Bloku 3 v PVH 2 (Základy OOP v jazyce Python – 16 h):**
      - Vyřazeny složité formální hierarchie dědičnosti (`super()`) a umělé skrývání proměnných; pro 100% pokrytí povinného RVP výstupu však ponechány základy vlastností OOP v praktické a přístupné formě (zapouzdření stavu a metod v objektu, jednoduchý příklad dědičnosti a polymorfní volání společných metod nad seznamem různých objektů) spolu s prací s konstruktorem `__init__`, parametrem `self`, atributy a metodami instance.
    - **Harmonizace Bloku 4 v PVH 2 (Vývoj aplikací s GUI – 20 h) s metodickými materiály (Mgr. Jiří Hejna):**
      - Provedena detailní komparace kurikula ŠVP oproti 6 autorizovaným metodickým listům pro výuku Tkinteru na SŠ (`metodika_1.pdf` až `metodika_6.pdf`).
      - Vyřazeny layout manažery `grid` a `pack`, které v metodikách vůbec nevystupují; rozvržení okna upraveno na souřadnicové pozicování `place(x, y)`.
      - Odstraněn požadavek na objektové zapouzdření GUI do tříd (`class App:`), metodiky pracují čistě procedurálně s obslužnými funkcemi a metodou `.config()`.
      - Odstraněna komponenta `Listbox` a v ŠVP explicitně specifikovány komponenty z metodik: `Label`, `Button`, `Entry`, `Radiobutton`, `Checkbutton` a speciální řídicí proměnné `StringVar` a `BooleanVar`.
      - Závěrečný projekt byl odpojen od ukládání do souboru/JSON i od úzkého označení „kalkulátor“ a byl definován obecně jako **samostatný projekt desktopové aplikace s grafickým uživatelským rozhraním**.
      - Změny plně promítnuty do [`PRG_SVP_INSPIS.md`](curriculum/PRG_SVP_INSPIS.md), [`svpPrgData.ts`](../registry/curriculum/svp/svpPrgData.ts), [`prgPlanTopics.ts`](../registry/curriculum/prgPlanTopics.ts), [`PLAN_PRG2.md`](plans/PLAN_PRG2.md) a [`doc/plan.md`](plan.md).
    - **Didaktické zobecnění Bloku 4 v PVH 3 (Databáze a aplikační rozhraní serveru – 30 h):**
      - Název byl zobecněn z *„Opakování jazyka SQL, integrace databáze s Pythonem a REST API“* na **„Databáze a aplikační rozhraní serveru (API)“**.
      - Odstraněn akademický a mikrodetailní výčet klauzulí SQL (`SELECT, WHERE, ORDER BY, GROUP BY, INSERT, UPDATE, DELETE, transakce`), databázového kurzoru a konkrétních knihoven (SQLite).
      - Blok byl přeformulován na obecné a nadčasové kompetence: provádění základních operací s daty v relační databázi, propojení serverové aplikace s databází, zásady bezpečné komunikace (ochrana před zneužitím vstupů / injekcemi), transformace záznamů do struktur programu a zprostředkování dat klientským aplikacím (web i desktop) přes API.
      - Aktualizováno v ŠVP InspIS, TypeScript datech i tematických plánech.
    - **Didaktická revize Bloku 2 v PVH 4 (Týmová spolupráce a verzování softwaru – 12 h):**
      - Název změněn z akademického *„Softwarové inženýrství, týmová spolupráce a verzovací systémy“* na **„Týmová spolupráce a verzování softwaru“**.
      - Vyřazeny veškeré specifické koncepty a cizí terminologie: `Unit Testing`, `Clean Code`, `refaktoring`, `Kanban`, `Code Review`, `Pull Requesty`.
      - Těžištěm bloku se stala reálná týmová spolupráce žáků v malých týmech (dvojice, trojice) na společné aplikaci: rozdělení rolí a plánování, verzovací repozitář pro sdílení kódu, slučování změn od spolužáků, odhalení a řešení kolizí a dodržování jednotného stylu zápisu kódu.
      - Aktualizováno v ŠVP InspIS, TypeScript strukturách, tematických plánech i v `doc/plan.md`.
    - **Úprava Bloku 3 a Bloku 1 v PVH 4 a Bloku 3 v PVH 3:**
      - Odstraněna svazující vazba na „maturitní projekt / maturitní zkoušku“, blok přejmenován na **„Závěrečný komplexní softwarový projekt a jeho prezentace“**.
      - Výstupy i učivo zobecněny na samostatnou realizaci klientské i serverové části, verzování v Gitu, systematické testování, technickou a uživatelskou dokumentaci a odbornou obhajobu zvolených řešení.
      - V Bloku 3 PVH 3 byl zároveň odstraněn akademický termín `(webový mikrorámec)`.
      - V Bloku 1 PVH 4 byl vyčištěn text od přebytečného žargonu: vyřazen specifický bod *„rozpozná zranitelnosti typu SQL injection a XSS a implementuje obranu“*, závorky `(sanitizace, validace)` i `(sessions, tokeny)` a nahrazeno čistým *„aplikuje zásady bezpečné práce a ošetření uživatelských vstupů“* a *„správa relací a přístupových práv“*.
    - **Celokurikulární audit návaznosti a pokrytí jazyka Python (PVH 1–4 pro ČŠI):**
      - **Sjednocení Kapitoly I (Charakteristika a kompetence):** Z úvodního textu ŠVP a `SVP_PRG_SHARED_INFO` byly odstraněny pozůstatky starých termínů (CSV, perzistence, Clean Code, Code Review, Kanban/Scrum, sokety, maturitní práce) tak, aby úvod plně odpovídal tabulkám osnov pro ČŠI.
      - **Doplnění chybějících pilířů Pythonu:** Do PVH 1 (Blok 4) doplněn podmíněný cyklus **`while`**; do PVH 2 na konec Bloku 1 zařazeny **textové řetězce (`str`)** jako sekvence znaků (`strip`, `split`, `in`) tvořící přirozený můstek k souborům; do PVH 3 (Blok 3) přidáno krátké rozcvičení Pythonu po 1. pololetí s 3D enginem, **instalace externích balíčků (`pip`) a členění projektu do více modulů (`import`)**.
      - **Zobecnění pojmů pro ČŠI:** V PVH 1 přejmenován Blok 1 na **„Vizuální blokové programování“** (bez zmínky konkrétního nástroje Scratch), Blok 2 na **„Základy algoritmizace a vývojové diagramy“**, Blok 3 na **„Programování hardwarových zařízení“** a Blok 4 na **„Základy jazyka Python“**; vyřazena `deduplikace` u seznamů a výstup *„vytváří herní objekty a scény ve 2D prostředí“*; v PVH 2 přejmenován Blok 1 na **„Datové kolekce a zpracování textu v jazyce Python“** a Blok 2 na **„Práce se soubory a ošetření chyb v programu“** (bez pevně svázaného formátu JSON v nadpisu); v PVH 3 (Blok 1–3) přejmenovány bloky na čisté a nadčasové názvy (*„Tvorba prostorové scény ve 3D enginu“*, *„Fyzikální simulace, skriptování a export 3D aplikací“*, *„Architektura klient–server a tvorba serverových aplikací“*) a výsledky zobecněny z *Unity* a C# API (`Rigidbody`, `Colliders`, `Triggers`) na obecný *3D herní a simulační engine*; v PVH 4 přejmenován Blok 1 na **„Webové klientské rozhraní a zabezpečení aplikací“**, sjednoceno `(API)`, zjemněno hashování na *bezpečné jednocestné hashování* a v Bloku 3 nahrazeno nereálné *ladění zátěže*.
      - Kompletně promítnuto do [`PRG_SVP_INSPIS.md`](curriculum/PRG_SVP_INSPIS.md), [`svpPrgData.ts`](../registry/curriculum/svp/svpPrgData.ts), [`prgPlanTopics.ts`](../registry/curriculum/prgPlanTopics.ts), plánů `PLAN_PRG1–4.md` a [`doc/plan.md`](plan.md).

38. **Harmonizace kapitoly Lekce 13: Výrazy v cyklu (`/specializovana/programovani-2/python-vyrazy`) podle oficiálního PDF PRIM:**
    - Routa a registr lekcí (`prg2PythonLessons.ts`) byly přepojeny na komponentu `PythonLoopExpressionsChapter.tsx`, která obsahuje 100% doslovné znění úloh 1 až 9* z tištěného pracovního listu projektu PRIM (`PracL13 - vyrazy v cyklu.pdf`).
    - **Úloha 1 (Druhé mocniny na plátně):** Texty s čísly a mocninami upraveny na korektní středové ukotvení (`align="center"`, `baseline="middle"`), což přesně odpovídá sémantice `canvas.create_text()` v Tkinteru.
    - **Úloha 9* (Vysílač Ještěd):** Geometrický náhled byl opraven z dřívějších 5 pater na všech 6 pater s přesným dosedáním pater na sebe (`y_top = y_bottom - vyska`), tmavým obrysem a šedou výplní přesně podle referenčního obrázku z učebnice.
    - **Oprava Hydration Mismatch (SSR):** V úlohách 4 a 5 (Zlatý poklad) byla nahrazena dynamická generování `Math.random()` deterministickým pseudonáhodným polem velikostí, čímž byl zcela eliminován React hydration error při prvním načtení stránky.


