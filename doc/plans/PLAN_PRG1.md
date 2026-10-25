# Pracovní plán: Programování a vývoj aplikací 1 (PRG 1)

**Cílový ročník:** 1. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 99 vyučovacích hodin (3 hodiny týdně, 33 týdnů)  
**Výchozí routa v IntLab:** `/specializovana/programovani`  
**Odpovídající profil kurikula (ŠVP InspIS):** [`doc/curriculum/PRG_SVP_INSPIS.md`](../curriculum/PRG_SVP_INSPIS.md)

---

## 🎯 Hlavní pedagogický cíl
Srovnat výchozí úroveň studentů z různých ZŠ pomocí vizuálního blokového programování a herních mechanik, formálně ukotvit teorii algoritmizace a vývojové diagramy, ověřit chování algoritmů na reálném hardware (mikrokontroléry) a plynule přejít k textovému programovacímu jazyku **Python** s okamžitou vizuální odezvou na grafickém plátně (Canvas).

---

## 📊 Stav realizace na portálu IntLab (Rozpis 99 hodin)

| Blok | Tematický celek | Dotace | Stav na portálu | Odkaz na webu |
|:---:|---|:---:|:---:|---|
| **1** | **Vizuální blokové programování a herní mechaniky** *(Září – Listopad)* | **36 h** | ✅ Hotovo (Lekce 1–6 ve Scratchi)<br>• Lekce 1: Sekvence (6 h)<br>• Lekce 2: Proměnné (6 h)<br>• Lekce 3: Cykly (6 h)<br>• Lekce 4: Podprogramy (6 h)<br>• Lekce 5: Podmínky (6 h)<br>• Lekce 6: Seznamy, zprávy a klonování (6 h) | `/specializovana/programovani/scratch` |
| **2** | **Teorie algoritmizace a vývojové diagramy** *(Prosinec)* | **9 h** | 🟡 K vytvoření (vlastnosti algoritmu, normalizované značky, čtení a tvorba vývojových diagramů, větvení a cykly) | `/specializovana/programovani/algoritmy` |
| **3** | **Algoritmizace vestavných systémů a hardware** *(Leden)* | **12 h** | 🟡 K vytvoření (blokové programování mikrokontroléru, vstupy a čidla, výstupy a matice LED, rádiový přenos proměnných) | `/specializovana/programovani/hardware` |
| **4** | **Přechod k textovému programování a grafické rozhraní v jazyce Python** *(Únor – Červen)* | **42 h** | ✅ Hotovo (přesun stávající řady 20 lekcí grafického Pythonu z 2. ročníku)<br>• Syntaxe, I/O, proměnné (8 h)<br>• Kreslení na Canvas, barvy, geometrie (10 h)<br>• Cykly `for`, proměnná cyklu a mřížky (10 h)<br>• Větvení `if/else`, náhoda, funkce s parametry (8 h)<br>• Interaktivita myší a závěrečná minihra (6 h) | `/specializovana/programovani-2/` ➔ přesun do `/programovani/python/` |
| **Σ** | **Celkem** | **99 h** | **Plně navrženo a harmonizováno** | |

*(Poznámka: Projekt 3D Raycaster Engine ve Scratchi je evidován jako volitelný rozšiřující modul pro nadané žáky).*

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj PRG 1)

- [ ] **Doplnění herních konceptů do Scratche:**
  - Doplnit do lekce 6 téma **událostních zpráv (`broadcast`)** a **klonování postav** (vytváření střel a překážek).
- [ ] **Příprava Bloku 2: Teorie algoritmizace a vývojové diagramy (9 h):**
  - Tvorba interaktivní kapitoly s výukovými kartami značek a trasovacím trenažérem.
- [ ] **Příprava Bloku 3: Mikrokontroléry v blocích (12 h):**
  - Interaktivní simulátor mikrokontroléru přímo na webu s exportem kódu.
- [ ] **Dekompozice komponent (Pravidlo 13):**
  - `ScratchConditionsChapter.tsx` (1 910 řádků) ➔ modularizace na samostatné podsložky a úlohy.
