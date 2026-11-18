# Aktivní plánovací tabule: Operační systémy 1 (OSS 1)

**Aktivní předmět:** Operační systémy 1 (1. ročník SŠ)  
**Obor:** 18-20-M/01 Informační technologie  
**Dotace:** 66 h ročně (33 výukových týdnů × 2 h)  
**Cílová stanice:** Klientská stanice Windows 11 (od uživatele ke správci)  
**Aktuální blok:** Blok 3: Procesy a správa operační paměti (multitasking, stavy procesů, vlákna, virtuální paměť)  
**Odpovídající profil kurikula:** `doc/curriculum/OSS1.md` | **Dedikovaný plán:** `doc/plans/PLAN_OSS1.md`

---

## 🎯 Kontext a témata Bloku 3 (Procesy a paměť):
1. **PR1 Úvod a vznik procesu:** Program na disku (.exe) vs. živý proces v RAM, identifikátor PID, kód vs. data, praktický list Task Manager & CLI.
2. **PR2 Střídání procesů (Multitasking):** Jak jedno jádro CPU zvládá desítky aplikací naráz, časová kvanta (10–30 ms), kontext procesu (čítač PC, registry), režie přepnutí kontextu, interaktivní simulátor na CPU, opakovací otázky.
3. **PR3 Životní cyklus a stavy:** Stavový diagram (New ➔ Ready ➔ Running ➔ Blocked ➔ Terminated), čekání na I/O (disk, klávesnice), interaktivní simulátor stavů.
4. **PR4 Vlákna (Threads):** Rozdíl mezi procesem a vláknem, sdílený paměťový prostor, využití vícejádrových CPU, plynulost UI.
5. **PR5 Virtuální paměť a stránkování:** Izolace adresního prostoru, hardwarová jednotka MMU, stránky a rámce (4 kB), Page Fault a odkládací soubor `pagefile.sys`.

---

## 📋 Stav a připravenost
- [x] Podklady a komponenty pro procesy, multitasking a paměť jsou načteny v paměti asistenta.
- [x] Tabule přepnuta na OSS 1.
- [x] **PR2 Střídání procesů (Multitasking):**
  - [x] Dokončen kompaktní All-in-One simulátor střídání procesů na CPU (`CpuSwitchingSimulator.tsx`).
  - [x] Dokončen zjednodušený praktický laboratorní list: Parametry CPU a reálné měření přepnutí kontextu v `perfmon.exe` s automatickým ukládáním do `localStorage` a exportem do `.doc`.
- [x] **PR3 Životní cyklus a stavy procesů (HOTOVO):**
  - [x] Modularizace kapitoly `ProcessStatesChapter.tsx` (oddělení záložek do podsložky `stavy/` dle Pravidla 13).
  - [x] Interaktivní simulátor životního cyklu a I/O (`ProcessStatesInteractiveSimulator.tsx` s časovou osou 0–75 ms, detailním 2D stavovým diagramem a plynulým krokováním).
  - [x] Standardizovaný opakovací kvíz dle šablony `TopicReviewQuiz` (Pravidlo 15, 9 otázek s Fisher-Yates mícháním, dvoutaktním hodnocením a detailním vysvětlením).
  - [x] Teoretický výklad rychlostní propasti, 5 stavů procesů, vzniku stavu NEW a priorit ve Windows.
  - [x] Praktický laboratorní list & protokol (`ProcessStatesLabTab.tsx`, `worksheet/ProcessStatesTasks.tsx`, `worksheet/ProcessStatesWordExport.ts`, `ProcessStatesTypes.ts`):
    - Úloha 1: Regulérní vypnutí procesu (korektní EXIT, záchyt zprávy, dialog uložení).
    - Úloha 2: Násilné ukončení procesu (tvrdý EXIT, `taskkill /F /IM notepad.exe` vs. Správce úloh, okamžitá ztráta dat v RAM).
    - Úloha 3: Umělé zmrazení procesu do stavu BLOCKED (Process Explorer ➔ Suspend & Resume, 0.0 % CPU, zamrznutí UI).
    - Úloha 4: Důkaz I/O-bound chování (Notepad v klidu 0.0 % CPU – spí v BLOCKED vs. probuzení stiskem klávesy).
    - Úloha 5: Souboj o jádro CPU – vysvětlení pojmu afinita (spřažení na CPU 0), strop 1 plného jádra (~8 % na 12vláknovém CPU) a rozdělení času plánovačem při prioritě Vysoká vs. Nízká.
    - Export do Wordu (`.doc`) a automatické ukládání do `localStorage`.
