# Pracovní plán: Programování a vývoj her 1 (PRG 1)

**Cílový ročník:** 1. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 66 vyučovacích hodin (2 hodiny týdně, 33 týdnů)  
**Výchozí routa v IntLab:** `/specializovana/programovani`  
**Odpovídající profil kurikula:** [`doc/curriculum/PRG1.md`](../curriculum/PRG1.md)

---

## 🎯 Hlavní pedagogický cíl
Rozvinout algoritmické a logické myšlení studentů prostřednictvím vizuálního blokového programování (Scratch) a herních mechanik, s vyvrcholením v pochopení 3D renderovacího algoritmu (Raycasting Engine ve stylu Wolfenstein 3D).

---

## 📊 Stav realizace na portálu IntLab

| Blok | Tematický celek | Dotace | Stav na portálu | Odkaz na webu |
|:---:|---|:---:|:---:|---|
| **1** | **Algoritmizace a základy Scratche** | 6 h | ✅ Hotovo (prostředí, události, souřadnice) | `/programovani/scratch` (Lekce 1: Sekvence) |
| **2** | **Proměnné a operátory** | 8 h | ✅ Hotovo (skóre, životy, ukládání a modifikace) | `/programovani/scratch` (Lekce 2: Proměnné) |
| **3** | **Cykly a opakování** | 8 h | ✅ Hotovo (opakuj N-krát, proměnná cyklu, geometrie) | `/programovani/scratch` (Lekce 3: Cykly) |
| **4** | **Podprogramy a vlastní bloky** | 8 h | ✅ Hotovo (definice vlastního bloku, parametry) | `/programovani/scratch` (Lekce 4: Podprogramy) |
| **5** | **Podmínky a logické operátory** | 12 h | ✅ Hotovo (14 úloh vč. Validátoru hesla a Bankomatu) | `/programovani/scratch` (Lekce 5: Podmínky) |
| **6** | **Seznamy a práce s daty** | 10 h | ✅ Hotovo (10 úloh vč. deduplikace, vlastních bloků a TOP 3 skóre) | `/programovani/scratch` (Lekce 6: Seznamy) |
| **7** | **Syntetický projekt: Raycaster 3D Engine** | 14 h | ✅ Hotovo (vysílání paprsků, DDA algoritmus, 3D render) | `/programovani/projekty/raycaster` |
| **Σ** | **Celkem** | **66 h** | **Plně funkční** | |

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj)

- [ ] **Příprava nových herních projektů ve Scratchi:**
  - Šablona 1: 2D Bludiště s kolizemi se zdí a sběrem mincí.
  - Šablona 2: Skákačka (plošinovka) s gravitací a skokem postavičky.
  - Šablona 3: Hra pro dva hráče u jedné klávesnice (Pong / Tanky).
- [ ] **Dekompozice komponent (Pravidlo 13):**
  - `ScratchRaycasterProject.tsx` (1 194 řádků) ➔ modularizace na `raycaster/` (`RaycasterCanvas`, `RaycasterMapEditor`, `raycasterEngine.ts`).
  - `ScratchConditionsChapter.tsx` (815 řádků) ➔ modularizace úkolů a záložek.
