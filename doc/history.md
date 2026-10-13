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
   - **Obsah:** Kernel vs. User space, základní funkce a role operačního systému jako správce hardwaru a abstrakce pro aplikace.
4. **Architektura OS** (`/specializovana/operacni-systemy/architektura`)
   - **Komponenta:** `OsArchitectureChapter.tsx`
   - **Obsah:** Monolitické jádro, mikrojádro, hybridní OS, ovladače zařízení (drivers), systémová volání (syscalls).

### Hodnocení 1. bloku:
5. **Hodnocená práce 01** (`/specializovana/operacni-systemy/test01`)
   - **Komponenta:** `OsSummaryWorksheet.tsx` (obaleno v `TestWorksheetShell`).
   - **Přístupové PINy:** Studentský PIN **`ZAK2026`**, Učitelský PIN **`OS2026`**.
   - **Prověřovaná témata:** Hardware & Von Neumann (CPU, RAM, disk; rozdělení RAM na instrukce a data/proměnné), role kernelu, licence se zvláštním důrazem na vlastnosti OEM licence.

### Blok 2: Evoluce a běh systému
6. **Evoluce OS** (`/specializovana/operacni-systemy/vyvoj`) – `OsEvolutionChapter.tsx`: Historie OS, Unix rodina, DOS, Windows NT, Linux.
7. **Start systému (Boot)** (`/specializovana/operacni-systemy/boot`) – `OsBootChapter.tsx`: BIOS/UEFI, POST test, MBR/GPT bootloader, předání řízení kernelu.
8. **Virtualizace** (`/specializovana/operacni-systemy/virtualizace`) – `VirtualizationChapter.tsx`: Typ 1 a 2 Hypervisory, virtuální stroje vs. kontejnery.

### Blok 3: Souborové systémy a disky
9. **Souborový systém a disky** (`/specializovana/operacni-systemy/souborove-systemy`) – *Podkapitoly:*
   - **FS1 Úvod a architektura** (`/souborove-systemy/uvod`): Role FS, abstrakce souborů a složek.
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

---

## 3. Detailní stav kapitol – OSS 2 (2. Ročník)

### Blok 1: Správa dat a zálohování
1. **Zálohování dat** (`/specializovana/operacni-systemy-2/zalohovani`) – *Podkapitoly:*
   - **B1 Úvod do zálohování** (`/zalohovani/uvod`): Význam záloh, pravidlo 3-2-1 (3 kopie, 2 média, 1 offsite).
   - **B2 Manuální záloha** (`/zalohovani/manualni`): Struktura složek, archivace ZIP/TAR, lidský faktor.
   - **B3 Systémové nástroje** (`/zalohovani/system`): Historie souborů Windows, body obnovení (VSS), bitová kopie.
   - **B4 Cloudové zálohy** (`/zalohovani/cloud`): Synchronizace vs. skutečná záloha, riziko zašifrování ransomwarem.
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
       - `ProcessTheoryTab.tsx`: Samostatná záložka teorie (5 kroků OS, 4 pilíře analýzy, Authenticode, CA, Smart App Control).
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



