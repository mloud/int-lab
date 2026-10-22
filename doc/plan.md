# 📋 Aktivní plán výuky a rozvoje IntLab

Tento dokument slouží jako **hlavní dynamická plánovací tabule**. Vždy zobrazuje **právě aktivní předmět**, na kterém pracujeme, a poskytuje okamžitý přehled jeho úkolů, stavu kapitol a návazností.

> **Pravidlo pro asistenta (AI):**  
> 1. Každý předmět má svůj trvalý dedikovaný plán ve složce [`doc/plans/`](./plans/).
> 2. Kdykoliv přecházíme na práci na jiném předmětu, **asistent automaticky přepne tento soubor (`doc/plan.md`) na daný předmět** a udržuje synchronizovaný příslušný plán v `doc/plans/`.
> 3. Vždy před zahájením a po dokončení práce zkontroluj a aktualizuj stav v `doc/history.md` i v tomto plánu.

---

## 🗂️ Rychlý rozcestník všech předmětů

| Kód předmětu | Název předmětu | Ročník | Dotace | Trvalý plán |
|:---:|---|:---:|:---:|:---:|
| **OSS 1** | Operační systémy 1 | 1. ročník | 66 h (2 h/týden) | [`doc/plans/PLAN_OSS1.md`](./plans/PLAN_OSS1.md) |
| **OSS 2** | Operační systémy 2 | 2. ročník | 66 h (2 h/týden) | [`doc/plans/PLAN_OSS2.md`](./plans/PLAN_OSS2.md) |
| **OSS 3** | Operační systémy 3 & Linux | 3. ročník | 66 h (2 h/týden) | [`doc/plans/PLAN_OSS3.md`](./plans/PLAN_OSS3.md) |
| **PRG 1** | Programování a vývoj her 1 (PVH 1) | 1. ročník | 66 h (2 h/týden) | [`doc/plans/PLAN_PRG1.md`](./plans/PLAN_PRG1.md) *(Aktivní)* |
| **PRG 2** | Programování a vývoj her 2 | 2. ročník | 66 h (2 h/týden) | [`doc/plans/PLAN_PRG2.md`](./plans/PLAN_PRG2.md) |
| **ROB** | Robotika a IoT (ROB 3 & ROB 4) | 3. a 4. roč. | 66 h / ročník | [`doc/plans/PLAN_ROB.md`](./plans/PLAN_ROB.md) |
| **TECH** | Technický dluh & Dekompozice | Vše | – | [`doc/plans/PLAN_REFACTORING.md`](./plans/PLAN_REFACTORING.md) |

---

# 🎯 AKTUÁLNĚ AKTIVNÍ PŘEDMĚT: Programování a vývoj her 1 (PVH 1 / PRG 1)

**Cílový ročník:** 1. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 66–68 vyučovacích hodin (2 hodiny týdně, 33–34 týdnů)  
**Výchozí routa v IntLab:** `/specializovana/programovani`  
**Odpovídající profil kurikula:** [`doc/curriculum/PRG1.md`](./curriculum/PRG1.md)  
**Kompletní archiv plánu předmětu:** [`doc/plans/PLAN_PRG1.md`](./plans/PLAN_PRG1.md)

---

## 🎯 Hlavní pedagogický cíl
Odstranit počáteční bariéru strachu ze syntaxe a textového kódu. Pomocí vizuálního blokového programování (Scratch 3) a herních mechanik si žáci vybudují pevné algoritmické a logické návyky a pochopí fundamentální koncepty (proměnná, cyklus, podmínka, podprogram, detekce kolizí). V závěru ročníku své dovednosti uplatní při pochopení a stavbě komplexního renderovacího algoritmu (**3D Raycaster Herní Engine ve stylu Wolfenstein 3D**), který tvoří přirozený didaktický můstek k textovému programování v Pythonu ve 2. ročníku (PRG 2).

---

## 📊 Přehled bloků a stav realizace na portálu IntLab

| Blok | Tematický celek | Dotace | Stav na portálu | Odkaz na webu |
|:---:|---|:---:|:---:|---|
| **1** | **Algoritmizace a základy Scratche** | 6 h | ✅ Hotovo (prostředí, události, souřadnice, scéna) | `/programovani/scratch` (Lekce 1: Sekvence) |
| **2** | **Proměnné a operátory** | 8 h | ✅ Hotovo (skóre, životy HP, ukládání a modifikace) | `/programovani/scratch` (Lekce 2: Proměnné) |
| **3** | **Cykly a opakování** | 8 h | ✅ Hotovo (opakuj N-krát, proměnná cyklu, geometrie) | `/programovani/scratch` (Lekce 3: Cykly) |
| **4** | **Podprogramy a vlastní bloky** | 8 h | ✅ Hotovo (definice vlastního bloku, parametry, dekompozice) | `/programovani/scratch` (Lekce 4: Podprogramy) |
| **5** | **Podmínky a logické operátory** | 12 h | ✅ Hotovo (14 úloh vč. Validátoru hesla a Bankomatu) | `/programovani/scratch` (Lekce 5: Podmínky) |
| **6** | **Seznamy a práce s daty** | 10 h | ✅ Hotovo (7 gradovaných úloh vč. Inventáře a TOP 3 skóre) | `/programovani/scratch` (Lekce 6: Seznamy) |
| **7** | **Syntetický projekt: 3D Raycaster Herní Engine** | 14 h | ✅ Hotovo (vysílání paprsků, DDA algoritmus, 3D render, map editor) | `/programovani/projekty/raycaster` |
| **Σ** | **Celý školní rok** | **66 h** | **Plně funkční základ** | |

---

## 🔍 Detailní stav témat a komponent v PRG 1

### Scratch modul (`/specializovana/programovani/scratch`)
* [x] **Lekce 1: Sekvence & Algoritmus** (`ScratchSequenceChapter.tsx`) – základy pohybu kocoura, sekvence bloků.
* [x] **Lekce 2: Proměnné & Operátory** (`ScratchVariablesChapter.tsx`) – ukládání a modifikace hodnot, skóre, životy.
* [x] **Lekce 3: Cykly** (`ScratchVariablesLoopsChapter.tsx`) – proměnná cyklu, krokování, kreslení geometrie perem.
* [x] **Lekce 4: Podprogramy** (`ScratchSubprogramsChapter.tsx`) – tvorba vlastních bloků, procedurální dekompozice a parametry.
* [x] **Lekce 5: Podmínky** (`ScratchConditionsChapter.tsx`) – 14 gradovaných úloh:
  * *Úkoly 1–5:* Neúplná podmínka `když - tak`, číselné porovnání, detekce okrajů.
  * *Úkoly 6–12:* Úplná podmínka `když - tak - jinak`, sudé/liché, kreslení vlajek, malá násobilka, **Validátor hesla** (`ValidatorHesla.sb3`), jednorázové hádání čísla.
  * *Úkoly 13–14:* Cyklus s podmínkou `opakuj dokud nenastane`, vylepšené hádání čísla, **Bankomat ATM s bezpečnostním trezorem** (`Bankomat.sb3`).
* [x] **Lekce 6: Seznamy & Práce s daty** (`ScratchListsChapter.tsx`) – 10 gradovaných úloh:
  * *Úkol 1:* Nákupní seznam a inicializace (`NakupniSeznam.sb3`).
  * *Úkol 2:* Interaktivní dotazy a sběr položek do batohu (`BatohHrace.sb3`).
  * *Úkol 3:* Použití předmětu, mazání a automatické posouvání indexů (`InventarLektvaru.sb3`).
  * *Úkol 4:* VIP Vstupní brána a test přítomnosti `obsahuje?` (`VipBrana.sb3`).
  * *Úkol 5:* Procházení seznamu cyklem s indexem `i` – traverzování pole (`CtenarSeznamu.sb3`).
  * *Úkol 6:* Zábavná věštírna – náhodný výběr položky od 1 do délky (`Vestirna.sb3`).
  * *Úkol 7:* Vrcholový herní projekt – Žebříček TOP 3 nejvyšších skóre (`TopSkore.sb3`).
  * *Úkol 8:* Modulární projekt – Seznamy vlastními bloky (`SeznamyLehkePriklady2.sb3`) se 4 procedurami (`Naplň seznam`, `Najdi největší číslo`, `Najdi nejmenší číslo`, `Spocitej prumer`).
  * *Úkol 9:* Hledání a filtrování – Počet výskytů čísla s parametrem (`PocetVyskytu.sb3`) s vlastním blokem `tiskni počet výskytů (hledané číslo)`.
  * *Úkol 10:* Deduplikace a množiny – Vytvoření unikátního seznamu (`UnikatniSeznam.sb3`) s bloky `Naplň seznam (počet) (max)` a `Vytvoř unikátní seznam`.

### Syntetický herní projekt (`/specializovana/programovani/projekty/raycaster`)
* [x] **3D Raycaster Engine (Wolfenstein 3D)** (`ScratchRaycasterProject.tsx`) – 2D plánek a raycasting, DDA algoritmus, přepočet vzdálenosti paprsku na výšku sloupce na 2D plátně, korekce rybího oka (Fish-eye), interaktivní mapa, pohyb hráče.

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj PRG 1)
- [ ] **Příprava nových herních projektů a šablon ve Scratchi:**
  - Šablona 1: 2D Bludiště s kolizemi se zdí a sběrem předmětů.
  - Šablona 2: Plošinovka (skákačka) s gravitací a skokem postavičky.
  - Šablona 3: Hra pro dva hráče u jedné klávesnice (Pong / Souboj tanků).
- [ ] **Dekompozice rozsáhlých komponent (Pravidlo 13):**
  - `ScratchRaycasterProject.tsx` (1 194 řádků) ➔ rozdělení na samostatné moduly (`RaycasterCanvas`, `RaycasterMapEditor`, `raycasterEngine.ts`).
  - `ScratchConditionsChapter.tsx` (815 řádků) ➔ dekompozice úloh a záložek.
- [ ] **Příprava testových / hodnotících materiálů:**
  - Založení testového archu nebo písemné práce prověřující pochopení algoritmických struktur (Sekvence, Cyklus, Podmínka, Proměnná) v šabloně `TestWorksheetShell`.
