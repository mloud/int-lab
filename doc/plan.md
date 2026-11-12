# Aktivní plánovací tabule: Programování a vývoj aplikací 1 (PRG 1 / PVH 1)

**Aktivní předmět:** Programování a hry 1 / Programování a vývoj aplikací 1 (1. ročník SŠ, obor 18-20-M/01 Informační technologie)  
**Celková hodinová dotace:** 99 vyučovacích hodin (3 hodiny týdně, 33 týdnů)  
**Oficiální profil kurikula (ŠVP InspIS):** [`doc/curriculum/PRG_SVP_INSPIS.md`](curriculum/PRG_SVP_INSPIS.md) a [`doc/plans/PLAN_PRG1.md`](plans/PLAN_PRG1.md)  
**Dedikovaný podrobný plán:** [`doc/plans/PLAN_PRG1.md`](plans/PLAN_PRG1.md)  
**Výchozí routa v IntLab:** `/specializovana/programovani` (Scratch rozcestník: `/specializovana/programovani/scratch`)

---

## 🎯 Hlavní pedagogický cíl předmětu
Srovnat výchozí úroveň studentů z různých ZŠ pomocí **vizuálního blokového programování (Scratch)**, formálně ukotvit teorii **algoritmizace a vývojových diagramů**, ověřit chování algoritmů na reálném **hardware (mikrokontroléry)** a plynule přejít k textovému programovacímu jazyku **Python** s okamžitou vizuální odezvou na grafickém plátně (Canvas).

---

## 📊 Přehled tematických celků (99 h)

| Blok | Měsíce & Týdny | Tematický celek | Dotace | Stav na portálu | Odkaz na webu |
|:---:|:---:|---|:---:|:---:|---|
| **1** | **Září – Listopad** (1.–12. týden) | **Vizuální blokové programování (Scratch)** | **36 h** | ✅ Hotovo (Lekce 1–6 ve Scratchi)<br>• Lekce 1: Sekvence (6 h)<br>• Lekce 2: Proměnné (6 h)<br>• Lekce 3: Cykly (6 h)<br>• Lekce 4: Podprogramy (6 h)<br>• Lekce 5: Podmínky (6 h)<br>• Lekce 6: Seznamy, zprávy a klonování (6 h) | `/specializovana/programovani/scratch` |
| **2** | **Prosinec** (13.–15. týden) | **Základy algoritmizace a vývojové diagramy** | **9 h** | 🟡 K vytvoření (vlastnosti algoritmu, normalizované značky, čtení a tvorba vývojových diagramů, větvení a cykly) | `/specializovana/programovani/algoritmy` |
| **3** | **Leden** (16.–19. týden) | **Programování hardwarových zařízení** | **12 h** | 🟡 K vytvoření (programování mikrokontroléru, vstupy a čidla, výstupy a matice LED, rádiový přenos proměnných) | `/specializovana/programovani/hardware` |
| **4** | **Únor – Červen** (20.–33. týden) | **Základy jazyka Python** | **42 h** | ✅ Hotovo (přesun stávající řady 20 lekcí grafického Pythonu z 2. ročníku)<br>• Syntaxe, I/O, proměnné (8 h)<br>• Kreslení na Canvas, barvy, geometrie (10 h)<br>• Cykly `for` a `while`, proměnná cyklu (10 h)<br>• Větvení `if/else`, náhoda, funkce s parametry (8 h)<br>• Interaktivita myší a závěrečná minihra (6 h) | `/specializovana/programovani-2/` ➔ přesun do `/programovani/python/` |
| **Σ** | **Celkem** | | **99 h** | **Plně navrženo a harmonizováno** | |

---

## 🐱 Přehled stávajících lekcí ve Scratchi (Blok 1 – 36 h)

1. **Lekce 1: Sekvence a krokování** (`ScratchSequenceChapter.tsx`)
2. **Lekce 2: Proměnné a práce s daty** (`ScratchVariablesChapter.tsx`)
3. **Lekce 3: Cykly a opakování** (`ScratchVariablesLoopsChapter.tsx`)
4. **Lekce 4: Vlastní bloky a podprogramy** (`ScratchSubprogramsChapter.tsx`)
5. **Lekce 5: Podmínky a větvení** (`ScratchConditionsChapter.tsx`, dekomponováno v `scratch/conditions/`)
6. **Lekce 6: Seznamy, zprávy a události** (`ScratchListsChapter.tsx`, dekomponováno v `scratch/lists/`)
*Volitelný rozšiřující modul:* 3D Raycaster Engine (`ScratchRaycasterProject.tsx` v `raycaster/`)

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj PVH 1 – Scratch)

- [ ] Kontrola a harmonizace lekcí Scratche s metodickými materiály a PDF podklady.
- [ ] Doplnění / rozšíření úloh na **zprávy (`broadcast`)** a **klonování postav** v Lekci 6 (nebo nová herní lekce).
- [ ] Příprava návazného Bloku 2: Teorie algoritmizace a vývojové diagramy.
