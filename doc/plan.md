# Aktivní plánovací tabule: Programování a vývoj aplikací 1 (PRG 1)

**Aktivní předmět:** Programování a vývoj aplikací 1 (1. ročník SŠ)  
**Obor:** 18-20-M/01 Informační technologie  
**Dotace:** 99 h ročně (33 výukových týdnů × 3 h)  
**Cílové prostředí:** Scratch 3.0 (Blok 1), Vývojové diagramy (Blok 2), Hardware v blocích (Blok 3), Python s grafikou Tkinter (Blok 4)  
**Aktuální blok:** Blok 1: Vizuální blokové programování ve Scratchi (Lekce 7: Události a zprávy)  
**Odpovídající profil kurikula:** `doc/curriculum/PRG_SVP_INSPIS.md` | **Dedikovaný plán:** `doc/plans/PLAN_PRG1.md`

---

## 🎯 Kontext a témata Bloku 1 (Scratch 3.0):
1. **Lekce 1: Sekvence a krokování:** Základní pohyb, souřadnice X/Y, směry, kreslení perem.
2. **Lekce 2: Proměnné a vstup/výstup:** Číselné a textové proměnné, blok `zeptej se a čekej`, operace s čísly.
3. **Lekce 3: Cykly a opakování:** Počítané cykly `opakuj N-krát`, nekonečné smyčky `opakuj stále`, podmíněné cykly `opakuj dokud nenastane`.
4. **Lekce 4: Vlastní bloky a podprogramy:** Procedury bez parametrů i s parametry, modularizace kódu.
5. **Lekce 5: Podmínky a logické výrazy:** Jednoduché a úplné větvení `když - tak - jinak`, relační operátory `<`, `=`, `>`, logické spojky `a zároveň`, `nebo`, `není pravda že`.
6. **Lekce 6: Seznamy (Listy) a datové struktury:** Dynamické seznamy, indexace prvků, vyhledávání, řazení, inventář.
7. **Lekce 7: Události a zprávy (Klient–Server):** Komunikace mezi postavami, signály 1:1, rozhlas 1:N, synchronní volání `vyšli zprávu a čekej`, základy distribuované architektury.

---

## 📋 Stav kapitoly: Lekce 7 – Události a zprávy
- [x] Vytvořena modulární struktura kapitoly: `ScratchMessagesChapter.tsx` obalená v `FsChapterShell` s akcentem `border-amber-500` a učitelským PINem.
- [x] `MessagesTheorySection.tsx`: Teoretický úvod – rozdíl mezi signálem 1:1, rozhlasem 1:N a synchronizací `vyšli zprávu a čekej`.
- [x] `MessagesTasks1to3.tsx`:
  - Úkol 1: Zvonek u dveří (Signál 1:1 mezi tlačítkem a kocourem).
  - Úkol 2: Rozhlas v domě (Rozeslání 1:N – kocour i pes reagují na stejný zvonek).
  - Úkol 3: Řízený dialog postav (Předávání štafety mezi postavami přes zprávy).
- [x] `MessagesTasks4to6.tsx`:
  - Úkol 4: Synchronní volání – Bezpečné vypnutí OS (Graceful Shutdown přes `vyšli zprávu a čekej`).
  - Úkol 5: Stopky s řízením stavů (Start, Stop, Reset).
  - Úkol 6: Grafická kalkulačka se seznamem (Tlačítka číslic a operací posílají zprávy mozku kalkulačky, vyhodnocení výrazu).
- [x] `MessagesTask7.tsx`:
  - Úkol 7: Analogové hodiny (Taktování zprávami: vteřinová ➔ minutová ➔ hodinová ručička s vylepšením pro plynulý posun).
- [x] `MessagesTask8.tsx`:
  - Úkol 8: Architektura Klient – Server (API a databáze na pozadí: Klient jako UI terminál, Server jako výpočetní backend a mikrodatabáze přes synchronní zprávy s parametry).
