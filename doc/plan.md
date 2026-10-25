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
| **PRG 1** | Programování a vývoj aplikací 1 | 1. ročník | 99 h (3 h/týden) | [`doc/plans/PLAN_PRG1.md`](./plans/PLAN_PRG1.md) *(Aktivní)* |
| **PRG 2** | Programování a vývoj aplikací 2 | 2. ročník | 66 h (2 h/týden) | [`doc/plans/PLAN_PRG2.md`](./plans/PLAN_PRG2.md) |
| **PRG 3** | Programování a vývoj aplikací 3 | 3. ročník | 99 h (3 h/týden) | [`doc/plans/PLAN_PRG3.md`](./plans/PLAN_PRG3.md) |
| **PRG 4** | Programování a vývoj aplikací 4 | 4. ročník | 50 h (2 h/týden) | [`doc/plans/PLAN_PRG4.md`](./plans/PLAN_PRG4.md) |
| **ROB** | Robotika a IoT (ROB 3 & ROB 4) | 3. a 4. roč. | 66 h / ročník | [`doc/plans/PLAN_ROB.md`](./plans/PLAN_ROB.md) |
| **TECH** | Technický dluh & Dekompozice | Vše | – | [`doc/plans/PLAN_REFACTORING.md`](./plans/PLAN_REFACTORING.md) |

---

# 🎯 AKTUÁLNĚ AKTIVNÍ PŘEDMĚT: Programování a vývoj aplikací 1 (PRG 1)

**Cílový ročník:** 1. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 99 vyučovacích hodin (3 hodiny týdně, 33 týdnů)  
**Výchozí routa v IntLab:** `/specializovana/programovani`  
**Odpovídající profil kurikula (ŠVP InspIS):** [`doc/curriculum/PRG_SVP_INSPIS.md`](./curriculum/PRG_SVP_INSPIS.md)  
**Kompletní archiv plánu předmětu:** [`doc/plans/PLAN_PRG1.md`](./plans/PLAN_PRG1.md)

---

## 🎯 Hlavní pedagogický cíl
Srovnat výchozí úroveň studentů z různých ZŠ pomocí vizuálního blokového programování a herních mechanik, formálně ukotvit teorii algoritmizace a vývojové diagramy, ověřit chování algoritmů na reálném hardware (mikrokontroléry) a plynule přejít k textovému programovacímu jazyku **Python** s okamžitou vizuální odezvou na grafickém plátně (Canvas).

---

## 📊 Přehled bloků a stav realizace na portálu IntLab (99 hodin)

| Blok | Tematický celek | Dotace | Stav na portálu | Odkaz na webu |
|:---:|---|:---:|:---:|---|
| **1** | **Vizuální blokové programování a herní mechaniky** *(Září – Listopad)* | 36 h | ✅ Hotovo (Lekce 1–6 ve Scratchi)<br>• Lekce 1: Sekvence (6 h)<br>• Lekce 2: Proměnné (6 h)<br>• Lekce 3: Cykly (6 h)<br>• Lekce 4: Podprogramy (6 h)<br>• Lekce 5: Podmínky (6 h)<br>• Lekce 6: Seznamy, zprávy a klonování (6 h) | `/specializovana/programovani/scratch` |
| **2** | **Teorie algoritmizace a vývojové diagramy** *(Prosinec)* | 9 h | 🟡 K vytvoření (vlastnosti algoritmu, normalizované značky, čtení a tvorba vývojových diagramů, větvení a cykly) | `/specializovana/programovani/algoritmy` |
| **3** | **Algoritmizace vestavných systémů a hardware** *(Leden)* | 12 h | 🟡 K vytvoření (blokové programování mikrokontroléru, vstupy a čidla, výstupy a LED, rádio) | `/specializovana/programovani/hardware` |
| **4** | **Přechod k textovému programování a grafické rozhraní v jazyce Python** *(Únor – Červen)* | 42 h | ✅ Hotovo (stávající řada 20 lekcí grafického Pythonu z 2. ročníku)<br>• Syntaxe, I/O, proměnné (8 h)<br>• Kreslení na Canvas, barvy, geometrie (10 h)<br>• Cykly `for`, proměnná cyklu a mřížky (10 h)<br>• Větvení `if/else`, náhoda, funkce s parametry (8 h)<br>• Interaktivita myší a 2D minihra (6 h) | `/specializovana/programovani-2/` |
| **Σ** | **Celý školní rok** | **99 h** | **Plně navrženo a harmonizováno** | |

*(Poznámka: 3D Raycaster Engine ve Scratchi je volitelný rozšiřující modul).*

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj PRG 1)
- [ ] Doplnit do lekce 6 téma **událostních zpráv (`broadcast`)** a **klonování postav** (střely, překážky).
- [ ] Vytvořit kapitolu Teorie algoritmizace a vývojové diagramy (9 h).
- [ ] Vytvořit modul Mikrokontroléry v blocích (12 h).
- [ ] Dekompozice `ScratchConditionsChapter.tsx` (1 910 řádků) dle Pravidla 13.
