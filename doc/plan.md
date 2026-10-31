# Pracovní plán: Programování a vývoj aplikací 2 (PVH 2 / PRG 2)

**Cílový ročník:** 2. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 66 vyučovacích hodin (2 hodiny týdně, 33 týdnů)  
**Výchozí routa v IntLab:** `/specializovana/programovani-2`  
**Odpovídající profil kurikula (ŠVP InspIS):** [`doc/curriculum/PRG_SVP_INSPIS.md`](../curriculum/PRG_SVP_INSPIS.md)  
**Dedikovaný plán předmětu:** [`doc/plans/PLAN_PRG2.md`](plans/PLAN_PRG2.md)

---

## 🎯 Hlavní pedagogický cíl
Přechod od procedurálního kódu k pokročilému strukturovanému a objektovému programování v jazyce **Python**. Zvládnutí pokročilých kolekcí a datových struktur (slovníky, řezy, list comprehension), perzistence dat a souborových operací (formáty JSON a CSV), robustního ošetření chyb a výjimek (`try-except`), pochopení paradigmatu objektově orientovaného programování (třídy, instance, konstruktory, zapouzdření) a tvorba plnohodnotných okenních desktopových aplikací s grafickým uživatelským rozhraním (GUI).

---

## 📊 Stav realizace na portálu IntLab (Rozpis 66 hodin)

| Blok | Tematický celek | Dotace | Obsah a plánovaná témata | Stav na portálu | Odkaz na webu |
|:---:|---|:---:|---|:---:|---|
| **1** | **Pokročilé datové struktury a kolekce v jazyce Python** | **16 h** | • Seznamy a jejich metody (`append`, `pop`, `insert`, `sort`)<br>• Krájení dat (slicing `[start:stop:step]`, záporné indexy)<br>• Generátory seznamů (list comprehension)<br>• Neměnné n-tice (`tuple`) a množiny (`set` – deduplikace)<br>• Slovníky (`dict`): klíče a hodnoty, vyhledávání, vnořené slovníky | 🟡 K vytvoření | `/specializovana/programovani-2` |
| **2** | **Práce se soubory, perzistence dat (JSON) a ošetření výjimek** | **14 h** | • Čtení a zápis textových souborů (`with open(...)`)<br>• Zpracování tabulkových dat v CSV<br>• Hierarchický výměnný formát JSON (`dump`, `load`)<br>• Ošetření běhových chyb a výjimek (`try - except - finally`) | 🟡 K vytvoření | `/specializovana/programovani-2` |
| **3** | **Základy objektově orientovaného programování v jazyce Python** | **16 h** | • Od procedur k objektům, abstrakce a modelování reality<br>• Třída a instance, konstruktor `__init__`, parametr `self`<br>• Atributy a metody, zapouzdření vnitřního stavu<br>• Skládání objektů (kompozice), základy dědičnosti | 🟡 K vytvoření | `/specializovana/programovani-2` |
| **4** | **Vývoj aplikací s grafickým uživatelským rozhraním (GUI)** | **20 h** | • Okenní architektura, smyčka událostí Event Loop<br>• Layout manažery (mřížka `grid`, balíčkování `pack`)<br>• Widgety: textová pole, tlačítka, přepínače, seznamy<br>• Zapouzdření GUI do objektové třídy<br>• Ucelený ročníkový projekt desktopové aplikace s ukládáním do JSON a obhajobou | 🟡 K vytvoření | `/specializovana/programovani-2` |
| **Σ** | **Celkem** | **66 h** | **Plně navrženo a harmonizováno s ŠVP InspIS** | | |

---

## 🔥 Aktuální úkoly a Backlog (Aktivní vývoj PVH 2 / PRG 2)

- [ ] **Příprava kapitol pro pokročilý Python:**
  - Vytvořit interaktivní vizualizátor řezů řetězců a seznamů (slicing step, záporné indexy).
  - Vytvořit simulátor slovníků (`dict`) – mapování klíč ➔ hodnota, hashování a vnořené struktury.
  - Vytvořit trenažér generátorů seznamů (list comprehension vs. klasický `for` cyklus).
- [ ] **Práce se soubory a JSON:**
  - Simulace čtení a zápisu souborů v sandboxu prohlížeče (formáty `.txt`, `.csv`, `.json`).
  - Ošetření výjimek: interaktivní vizualizace toku programu při pádu (`try-except-finally`).
- [ ] **Objektově orientované programování (OOP):**
  - Třída vs. Instance: vizuální generátor instancí s inspektorem vnitřních proměnných (`self`).
  - Interaktivní návrh třídy (např. Hrdina / Inventář / Bankovní účet) s testem metod.
- [ ] **Okenní aplikace (GUI):**
  - Vizuální návrhář okna s layout manažery (`pack`, `grid`).
  - Závěrečný ročníkový projekt: šablona a metodické zadání pro žáky s exportem do Wordu.
