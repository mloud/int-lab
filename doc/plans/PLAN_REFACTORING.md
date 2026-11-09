# Pracovní plán: Architektonický refaktoring, Decoupling & Optimalizace (`refactor2`)

**Aktivní větev:** `refactor2` (založena z `dev`)  
**Dedikovaný plán:** [`doc/plans/PLAN_REFACTORING.md`](plans/PLAN_REFACTORING.md)

---

## 🎯 Cíle refaktoringu (`refactor2`)
1. **Optimalizace odezvy a velikosti bundlu:** Odstranění duplicitních závislostí (`framer-motion` vs. `motion`), komprese velkých statických obrázků a zavedení `next/dynamic` pro těžké interaktivní simulátory.
2. **Dekompozice monolitů (Pravidlo 13):** Rozdělení všech UI souborů přesahujících 700–1 000+ řádků na štíhlé orchestrátory, samostatné záložky a datové soubory.
3. **Decoupling dat a UI:** Oddělení zadání úloh, textů, exportů a simulátorů do samostatných modulů.
4. **Sjednocení správy stavu a typové bezpečnosti:** Standardizace klíčů `useLocalStorage` (`lib/storageKeys.ts`) a vyčištění `npx tsc --noEmit`.

---

## 📋 Fázový harmonogram prací

### Fáze 1: Rychlé výkonnostní výhry (Bundle & Assets) — ✅ HOTOVO
- [x] **1.1 Sjednocení animačních knihoven:** Nahradit 3 zbývající importy `framer-motion` za `motion/react` (`LandingFooter.tsx`, `SubjectSelection.tsx`, `SchoolDivisionCard.tsx`) a odinstalovat `framer-motion` z `package.json`.
- [x] **1.2 Optimalizace velkých obrázků v `public/`:** Zkomprimovat `disk_geometry.jpg`, `hdd_internals.jpg`, `ssd_internals.jpg` a `isometric_factory.jpg` (úspora **2,6 MB / -81 %** velikosti).
- [x] **1.3 Dynamické načítání (`next/dynamic`):** Obalit těžké simulátory a hry v `app/` (`ScratchRaycasterProject`, `HuffmanGame`, `WindowsInstallGame`, `FATGame`, `DefragGame`, `VonNeumannGame`) do lazy-loaded komponent (`ssr: false`).

### Fáze 2: Dekompozice a Decoupling největších monolitů (nad 1 000 řádků) — ✅ HOTOVO
- [x] **2.1 `ScratchConditionsChapter.tsx` (1 903 ➔ 43 řádků – PRG 1):**
  - Vyčleněno sdílené `ScratchShared.tsx` (`TaskCard`, `TeacherNote`, `TeacherPinToggle`) a 6 modulů v `scratch/conditions/` (`ConditionsTheorySection`, `ConditionsTasks1to5`, `ConditionsTasks6to8`, `ConditionsTasks9to10`, `ConditionsTasks11to12`, `ConditionsTasks13to14`).
- [x] **2.2 `ProcessIntroWorksheetTab.tsx` (1 707 ➔ 105 řádků – OSS 1):**
  - Rozděleno do podsložky `procesy/intro/worksheet/` (`ProcessIntroWordExport.ts`, `ProcessIntroTasks1to4.tsx`, `ProcessIntroTasks5to6.tsx`, `ProcessIntroTasks7to9.tsx`).
- [x] **2.3 `OsArchitectureChapter.tsx` (1 633 ➔ 73 řádků – OSS 1):**
  - Rozděleno do podsložky `architektura/` (`OsArchitectureData.ts`, `ArchitectureTheoryTab.tsx`, `ArchitecturePracticeTab.tsx`, `ArchitectureUseCasesTab.tsx`, `ArchitectureQuizTab.tsx`).
- [x] **2.4 `ProcessLabTab.tsx` (1 430 ➔ 77 řádků – OSS 2):**
  - Vyčleněny laboratorní úlohy do `bezpecnost/procesy/lab/` (`ProcessLabTasks1to5.tsx`, `ProcessLabTasks6to9.tsx`, `ProcessLabTasks10to13.tsx`).
- [x] **2.5 `WindowsInstallGame.tsx` (1 352 ➔ 128 řádků – OSS 1):**
  - Rozděleno do podsložky `instalace/` (`WindowsInstallShared.tsx`, `WindowsInstallTheoryTab.tsx`, `WindowsInstallSimPart1.tsx`, `WindowsInstallSimPart2.tsx`, `WindowsInstallSimPart3.tsx`).
- [x] **2.6 `ScratchRaycasterProject.tsx` (1 194 ➔ 64 řádků – PRG 1):**
  - Rozděleno do podsložky `raycaster/` (`RaycasterIntroAndPhases1to3.tsx`, `RaycasterPhases4to7AndMilestones.tsx`).
- [x] **2.7 `ScratchListsChapter.tsx` (1 099 ➔ 35 řádků – PRG 1):**
  - Vyčleněna teorie a 11 úloh do podsložky `scratch/lists/` (`ListsTheorySection.tsx`, `ListsTasks1to6.tsx`, `ListsTasks7to9.tsx`, `ListsTasks10to11.tsx`).
- [x] **2.8 `OsEvolutionChapter.tsx` (1 091 ➔ 138 řádků – OSS 1):**
  - Rozděleno do podsložky `vyvoj/` (`OsEvolutionData.tsx`, `MarketStatsView.tsx`, `OsEvolutionWorksheetTab.tsx`).
- [x] **2.9 `HuffmanGame.tsx` (1 024 ➔ 86 řádků – INF) & `FatChapter.tsx` (1 019 ➔ 70 řádků – OSS 1):**
  - `HuffmanGame.tsx` rozděleno do `compression/huffman/` (`HuffmanTheorySection`, `HuffmanEncodingDemo`, `HuffmanDecodingDemo`, `HuffmanPracticeSection`).
  - `FatChapter.tsx` rozděleno do `souborove-systemy/fat/` (`FatTheoryTab`, `FatWorksheetTab`).

### Fáze 3: Dekompozice středních monolitů (850–1 000 řádků) — ✅ HOTOVO
- [x] **`BarChartsChapter.tsx` (921 ➔ 45 řádků – INF):** Rozděleno do `grafy/bar-charts/` (`BarChartsTheoryTab`, `BarChartsSimulatorTab`, `BarChartsWorksheetTab`).
- [x] **`BackupCobianChapter.tsx` (910 ➔ 47 řádků – OSS 2):** Rozděleno do `zalohovani/cobian/` (`CobianTheoryTab`, `CobianSimulatorTab`, `CobianWorksheetTab`).
- [x] **`ProcessSimulatorsTab.tsx` (896 ➔ 17 řádků – OSS 2):** Rozděleno do `bezpecnost/procesy/simulators/` (`FileLaunchSimulator`, `AuthenticodeHashSimulator`, `ProcessExplorerSimulator`).
- [x] **`VonNeumannGame.tsx` (895 ➔ 81 řádků – OSS 1):** Rozděleno do `von-neumann/` (`VonNeumannData.ts`, `VonNeumannBuilderPhase.tsx`, `VonNeumannSimPhases.tsx`).
- [x] **`PythonLoopChapter.tsx` (892 ➔ 79 řádků – PRG 2):** Rozděleno do `python-loops/` (`PythonLoopShared.tsx`, `PythonLoopTasks1to8.tsx`, `PythonLoopTasks9to15.tsx`).

### Fáze 4: Sjednocení LocalStorage klíčů a TypeScript kontroly — ✅ HOTOVO
- [x] **4.1 Centrální helper pro `useLocalStorage` klíče:** Vytvořen `lib/storageKeys.ts` (`STORAGE_KEYS`) a re-exportován z `hooks/useLocalStorage.ts`.
- [x] **4.2 Audit a oprava `npx tsc --noEmit` chyb:** Opravena izolace podprojektu `analytics` v `tsconfig.json` a ověřen čistý průchod `npx tsc --noEmit` (exit code 0) i `npm run build` (299 statických stránek).

### Fáze 5: IntLab UI Stavebnice (`components/ui/`) — ✅ HOTOVO
- [x] **`ChapterKit.tsx`** – re-export `FsShared` (`ChapterShell`, `TheoryCard`, `Callout`, `TermCard`, `PracticeLink`, `RevealQuestions`) + nové `TermGrid`, `ComparisonGrid`, `StepFlow`, `renderInline`.
- [x] **`TaskKit.tsx`** – `useTeacherMode`, `TeacherPinBar`, `TeacherNote`, `TaskCard` (tone, storageKey), `DeclarativeTaskList`, `CodeSnippet`, `CanvasPreview`/`CanvasRect`/`CanvasText`.
- [x] **`WorksheetKit.tsx` + `lib/wordExport.ts`** – `DeclarativeWorksheet`: jedno schéma ➔ web i Word (.doc), auto-ukládání, bez PINu (Pravidlo 7).
- [x] **`SimulatorKit.tsx`** – `SimStepperBar`, `OsWindowFrame`, `StatProgressBar`.

### Fáze 6: Migrace PRG 2 Python (24 kapitol) + PRG 1 Scratch (6 kapitol) na `TaskKit` — ✅ HOTOVO
- [x] **6.1 PRG 2 Python (všech 24 kapitol):** Odstraněny lokální duplikáty `TaskCard`, `TeacherNote`, `PythonSnippet`, `CanvasPreview`, `Rect`, `Text`, `PIN` a nahrazeny sdíleným `TaskKit` (`useTeacherMode`, `TeacherPinBar`, `createTaskKit`, `CodeSnippet`, `CanvasPreview`, `CanvasRect`, `CanvasText`).
- [x] **6.2 Dekompozice `PythonLoopVarChapter.tsx` (534 ➔ 35 řádků):** Rozděleno do `python-loop-var/PythonLoopVarTasks1to6.tsx` a `PythonLoopVarTasks7to13.tsx`.
- [x] **6.3 PRG 1 Scratch (`ScratchShared.tsx` + 6 kapitol):** `ScratchShared.tsx` deleguje na `TaskKit` a poskytuje sdílené helpery (`AvailableBlocks`, `CanvasPreview`, `Line`, `CirclePath`). `ScratchSubprogramsChapter.tsx` (696 ➔ 45 řádků) rozděleno do `scratch/subprograms/SubprogramGraphicsTasks.tsx` a `SubprogramMathTasks.tsx`.

### Fáze 7: Sjednocení pracovních listů a Word exportů (`WorksheetKit` + `lib/wordExport.ts`) — ✅ HOTOVO
- [x] **`VirtualizationWorksheetTab.tsx`:** Migrováno na plně deklarativní `DeclarativeWorksheet` (`WorksheetSchema`).
- [x] **Sjednocení Word exportů (`downloadWordDoc`):** Odstraněn duplicitní Blob/URL/DOM boilerplate v `DiskMediaWorksheetTab.tsx`, `FatWorksheetTab.tsx`, `OsEvolutionWorksheetTab.tsx`, `CobianWorksheetTab.tsx`, `DiskPartitionChapter.tsx`, `BackupCloudChapter.tsx`, `BackupManualChapter.tsx`, `BackupSystemChapter.tsx` a `ProcessCertificatesChapter.tsx` (export vyčleněn do `bezpecnost/procesy/processExport.ts`).

### Fáze 8: Převod legacy kvízů na `TopicReviewQuiz` & dekompozice kapitol 700+ řádků — ✅ HOTOVO
- [x] **`ArchitectureQuizTab.tsx` (227 ➔ 15 řádků) + `OsArchitectureData.ts`:** Převedeno na standardizovaný `TopicReviewQuiz` (Pravidlo 15).
- [x] **`OsIntroChapter.tsx` (715 ➔ 35 řádků):** Obaleno v `FsChapterShell` a rozděleno do `uvod/OsIntroTheoryTab.tsx` a `uvod/OsIntroQuizTab.tsx` (`TopicReviewQuiz`).
- [x] **`DiskMediaChapter.tsx` (764 ➔ 37 řádků):** Rozděleno do `souborove-systemy/media/` (`DiskMediaTheoryTab.tsx`, `DiskMediaSimTab.tsx`, `DiskMediaWorksheetTab.tsx`).
- [x] **`OsBootChapter.tsx` (705 ➔ 140 řádků):** Rozděleno do `boot/` (`BootData.ts`, `UefiSimulator.tsx`, `BootSequenceBuilder.tsx`).
- [x] **`VirtualizationChapter.tsx` (701 ➔ 40 řádků):** Rozděleno do `virtualizace/` (`VirtualizationTheoryTab.tsx`, `VirtualizationComparisonTab.tsx`, `VirtualizationWorksheetTab.tsx`).

### Fáze 9: Modularizace `registry/` — ✅ HOTOVO
- [x] **`registry/lessons.ts` (3 736 ➔ 33 řádků):** Rozděleno podle předmětů a ročníků do `registry/lessons/` (`zs6to8Lessons.ts`, `zs9Lessons.ts`, `oss1Lessons.ts`, `oss2Lessons.ts`, `prg1ScratchLessons.ts`, `prg2PythonLessons.ts`, `advancedLessons.ts`).
- [x] **`registry/curriculum/thematicPlans.ts` (1 206 ➔ 15 řádků):** Rozděleno do `registry/curriculum/thematic-plans/` (`thematicPlanTypes.ts`, `ops1Plan.ts`, `ops2Plan.ts`, `ops3Plan.ts`).
- [x] **`registry/curriculum/svpData.ts` (1 039 ➔ 4 řádky):** Rozděleno do `registry/curriculum/svp/` (`svpTypes.ts`, `svpOssData.ts`, `svpPrgData.ts`).

---

## 🧭 Architektonická paměť & Kde příště navázat (Fáze 10+: Decoupling dat a logiky)

### 1. Aktuální stav oddělení dat (obsahu) od UI po předmětech
- **`registry/` (Kurikulum, ŠVP, Tematické plány, Lekce):** **100 % odděleno** v čistých datových souborech.
- **Opakovací kvízy (`TopicReviewQuiz`):** **100 % odděleno** – kvízové otázky jsou v čistých datových polích `ReviewQuestion[]`.
- **SŠ OSS 1 & OSS 2:**
  - Kvízy, osnovy, `OsArchitectureData.ts`, `BootData.ts`, `VonNeumannData.ts`, `OsEvolutionData.tsx` a `VirtualizationWorksheetTab.tsx` (`DeclarativeWorksheet`) mají data již čistě oddělená.
  - Zbývající pracovní listy (`FatWorksheetTab`, `CobianWorksheetTab`, `OsEvolutionWorksheetTab`, `DiskMediaWorksheetTab`, `DiskPartitionChapter`, `BackupCloudChapter`, `BackupManualChapter`, `BackupSystemChapter`) používají sdílený `WorksheetLayout` + `downloadWordDoc`, ale texty otázek mají zatím v JSX a duplicitně v HTML šabloně pro Word.
- **SŠ PRG 1 (Scratch – 6 kapitol) & PRG 2 (Python – 24 kapitol):**
  - **Logika je 100% sjednocená** na `components/ui/TaskKit.tsx` a `ScratchShared.tsx` (nulová duplikace `TaskCard`, `TeacherNote`, `CodeSnippet`, `CanvasPreview`, `PIN`).
  - Samotné texty zadání úloh a učitelských metodik jsou zatím zapsané jako `<TaskCard>...</TaskCard>` v JSX místo datových polí `TaskItem[]` pro `<DeclarativeTaskList />`.
- **ZŠ Informatika (6.–9. třída):**
  - Monolity (`HuffmanGame`, `BarChartsChapter`, `VonNeumannGame`) jsou rozdělené do podsložek, ale texty teorie a levely her jsou z většiny uvnitř `.tsx` souborů.

### 2. Dohodnutá architektonická pravidla pro budoucí Decoupling (proč netrhat vše naslepo)
Při budoucím oddělování obsahu od UI **VŽDY dodržuj tyto 3 zásady**, aby AI modely při úpravě UI nepřehlédly přetékání textu nebo rozbitý layout:
1. **Kolokace dat u kapitoly/předmětu (vzor `VonNeumannData.ts` / `OsArchitectureData.ts`):**
   - Datové soubory (`*Data.ts`, `*Worksheet.ts`, `*Quiz.ts`) nechávej přímo u příslušné kapitoly nebo v podsložce `content/` daného předmětu, aby měl UI model při práci na komponentě vždy na očích i reálnou délku textů a počet položek.
2. **Rozlišení „Pružný obsah“ vs. „Geometrické popisky simulátorů“:**
   - **Vyčlenit do čistých dat (`*Data.ts` / `WorksheetSchema` / `TaskItem[]`):** Pružné kontejnery, kde délka textu nerozbije layout – odstavce teorie (`TheoryCard`, `Callout`), zadání úloh (`TaskCard`), pracovní listy (`DeclarativeWorksheet`), kvízy (`TopicReviewQuiz`) a seznamy vstupních scénářů/levelů pro simulátory.
   - **Ponechat přímo v `*Simulator.tsx` (nebo v těsně přilehlém `*SimData.ts` s JSDoc limitem `maxChars`):** Krátké štítky uvnitř SVG/Canvas diagramů s pevnou šířkou (`w-28`, souřadnice sběrnic) a živé stavové hlášky závislé na posuvnících simulátoru.
3. **Samoopravné mřížky a limity délky:**
   - U mřížek (`TermGrid`, `ComparisonGrid`) volit počet sloupců dynamicky podle `items.length` (2 nebo 4 položky ➔ 2 sloupce, 3 nebo 6 položek ➔ 3 sloupce).

### 3. Připravený backlog pro příští architektonické kolo (Fáze 10)
Pokud uživatel v budoucnu požádá o pokračování v oddělování dat od logiky, navážeme přesně těmito kroky:
- [ ] **10.1 Převod 8 zbývajících pracovních listů v OSS 1 a OSS 2 na `DeclarativeWorksheet` (`WorksheetSchema`):** `FatWorksheetTab`, `CobianWorksheetTab`, `OsEvolutionWorksheetTab`, `DiskMediaWorksheetTab`, `DiskPartitionChapter`, `BackupCloudChapter`, `BackupManualChapter`, `BackupSystemChapter` (odstranění ručních HTML šablon pro Word – 1 datové schéma = web i Word).
- [ ] **10.2 Vyčlenění zadání úloh v PRG 1 (Scratch) a PRG 2 (Python) do `*Data.ts` (`TaskItem[]` + `DeclarativeTaskList`):** S využitím `visualSlot` pro nákresy plátna (`CanvasPreview`).
- [ ] **10.3 Vyčlenění levelů a zadání her v ZŠ Informatika (6.–9. třída) do `*Data.ts`:** Šifry, Kódy, Binární soustava, Grafy, Komprese, Modely, Stavba PC.

---

## 🏆 Již dokončený refaktoring z minula
1. **`MalwareDetectionChapter.tsx` (OSS 2):** 3 492 řádků ➔ orchestrátor 42 řádků + 7 komponent v `malware/`.
2. **`ProcessCertificatesChapter.tsx` (OSS 2):** 2 457 řádků ➔ orchestrátor 258 řádků + 4 záložky v `procesy/`.
