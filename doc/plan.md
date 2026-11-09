# Pracovní plán: Architektonický refaktoring, Decoupling & Optimalizace (`refactor2`)

**Aktivní větev:** `refactor2` (založena z `dev`)  
**Dedikovaný plán:** [`doc/plans/PLAN_REFACTORING.md`](plans/PLAN_REFACTORING.md)

---

## 📋 Přehled splněných fází (`refactor2`)

- [x] **Fáze 1: Rychlé výkonnostní výhry (Bundle & Assets)**
  - Sjednocení `framer-motion` ➔ `motion/react` a odinstalace `framer-motion`.
  - Komprese 4 největších `.jpg` v `public/` (-2,6 MB / -81 %).
  - Zavedení `next/dynamic` (`ssr: false`) pro 6 těžkých simulátorů a her.
- [x] **Fáze 2: Dekompozice všech UI monolitů nad 1 000 řádků (10 kapitol/her)**
  - `ScratchConditionsChapter.tsx` (1 903 ➔ 43 řádků)
  - `ProcessIntroWorksheetTab.tsx` (1 707 ➔ 105 řádků)
  - `OsArchitectureChapter.tsx` (1 633 ➔ 73 řádků)
  - `ProcessLabTab.tsx` (1 430 ➔ 77 řádků)
  - `WindowsInstallGame.tsx` (1 352 ➔ 128 řádků)
  - `ScratchRaycasterProject.tsx` (1 194 ➔ 64 řádků)
  - `ScratchListsChapter.tsx` (1 099 ➔ 35 řádků)
  - `OsEvolutionChapter.tsx` (1 091 ➔ 138 řádků)
  - `HuffmanGame.tsx` (1 024 ➔ 86 řádků)
  - `FatChapter.tsx` (1 019 ➔ 70 řádků)
- [x] **Fáze 3: Dekompozice středních monolitů (850–1 000 řádků, 5 kapitol/her)**
  - `BarChartsChapter.tsx` (921 ➔ 45 řádků)
  - `BackupCobianChapter.tsx` (910 ➔ 47 řádků)
  - `ProcessSimulatorsTab.tsx` (896 ➔ 17 řádků)
  - `VonNeumannGame.tsx` (895 ➔ 81 řádků)
  - `PythonLoopChapter.tsx` (892 ➔ 79 řádků)
- [x] **Fáze 4: Sjednocení LocalStorage klíčů (`lib/storageKeys.ts`) a čistý `npx tsc --noEmit` + `npm run build`**
- [x] **Fáze 5: IntLab UI Stavebnice (`ChapterKit`, `TaskKit`, `WorksheetKit`, `SimulatorKit`, `lib/wordExport.ts`)**
- [x] **Fáze 6: Migrace všech 24 kapitol PRG 2 (Python) a 6 kapitol PRG 1 (Scratch) na `TaskKit` (nulová duplikace)**
- [x] **Fáze 7: Sjednocení pracovních listů a Word exportů (`WorksheetKit` + `downloadWordDoc`)**
- [x] **Fáze 8: Převod zbylých kvízů na `TopicReviewQuiz` a dekompozice kapitol 700+ řádků (`OsIntroChapter`, `DiskMediaChapter`, `OsBootChapter`, `VirtualizationChapter`)**
- [x] **Fáze 9: Modularizace `registry/lessons.ts`, `registry/curriculum/thematicPlans.ts` a `registry/curriculum/svpData.ts` podle předmětů**

---

## 🔖 Kde příště navázat (Fáze 10 – Volitelný hloubkový decoupling obsahu)
Veškeré závěry z brainstormingu (kolokace dat u kapitol, rozlišení pružného obsahu vs. pevné geometrie v simulátorech a seznam kandidátů pro převod na `DeclarativeWorksheet` / `DeclarativeTaskList`) jsou podrobně uloženy v [`doc/plans/PLAN_REFACTORING.md`](plans/PLAN_REFACTORING.md).
