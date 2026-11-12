# Aktivní plánovací tabule: Programování a vývoj aplikací 2 (PRG 2 / PVH 2)

**Aktivní předmět:** Programování a hry 2 / Programování a vývoj aplikací 2 (2. ročník SŠ, obor 18-20-M/01 Informační technologie)  
**Celková hodinová dotace:** 66 vyučovacích hodin (2 hodiny týdně, 33 týdnů)  
**Oficiální profil kurikula (ŠVP InspIS):** [`doc/curriculum/PRG_SVP_INSPIS.md`](curriculum/PRG_SVP_INSPIS.md) a [`doc/curriculum/PRG2.md`](curriculum/PRG2.md)  
**Dedikovaný podrobný plán:** [`doc/plans/PLAN_PRG2.md`](plans/PLAN_PRG2.md)  
**Výchozí routa v IntLab:** `/specializovana/programovani-2`

---

## 🎯 Hlavní pedagogický cíl předmětu
Přechod od procedurálního kódu k práci s **datovými kolekcemi** a **objektovému programování** v jazyce **Python**.
Zvládnutí kolekcí a textových řetězců (`list`, `dict`, `tuple`, `set`, `str`), práce se soubory (textové soubory a strukturovaný formát JSON), bezpečné ošetření běhových chyb a výjimek (`try-except`), pochopení objektového myšlení (třídy, instance, atributy, metody `__init__` / `self`) a tvorba desktopových formulářových aplikací s grafickým uživatelským rozhraním (GUI).

---

## 📊 Přehled tematických celků (66 h)

| Blok | Tematický celek | Dotace | Obsah a plánovaná témata | Stav na portálu |
|:---:|---|:---:|---|:---:|
| **1** | **Datové kolekce a zpracování textu v jazyce Python** | **16 h** | • Seznamy (`list`), indexace, délka, procházení cyklem `for`<br>• Operace a metody seznamů (`append`, `insert`, `pop`, `remove`, `sort`)<br>• Vyhledávání, filtrace a agregace (`in`, `min`, `max`, `sum`)<br>• Slovníky (`dict`), neměnné n-tice (`tuple`) a množiny (`set`)<br>• Textové řetězce (`str`) jako kolekce znaků (`strip`, `split`, `in`) – můstek k souborům | 🟡 K vytvoření |
| **2** | **Práce se soubory a ošetření chyb v programu** | **14 h** | • Čtení a zápis textových souborů (`with open(...)`, UTF-8)<br>• Strukturovaná data ve formátu JSON (`json.dump`, `json.load`)<br>• Běhové chyby a bezpečné ošetření výjimek (`try - except`) | 🟡 K vytvoření |
| **3** | **Základy objektově orientovaného programování v jazyce Python** | **16 h** | • Třída jako šablona, instance jako konkrétní objekt<br>• Vnitřní stav a zapouzdření: konstruktor `__init__`, parametr `self` a atributy<br>• Metody instance, jednoduchá dědičnost a polymorfismus (jednotné rozhraní metod)<br>• Seznam instancí a objektové modelování miniprojektu | 🟡 K vytvoření |
| **4** | **Vývoj aplikací s grafickým uživatelským rozhraním (GUI)** | **20 h** | • Okenní architektura, smyčka událostí `mainloop()`<br>• Rozmístění prvků v okně (souřadnicové pozicování `place`)<br>• Komponenty: `Label`, `Button`, `Entry`, `Radiobutton`, `Checkbutton`<br>• Vazba událostí na obslužné funkce, řídicí proměnné `StringVar` a `BooleanVar`<br>• Samostatný projekt desktopové aplikace s grafickým uživatelským rozhraním | 🟡 K vytvoření |
| **Σ** | **Celkem** | **66 h** | **Plně navrženo a harmonizováno s ŠVP InspIS** | |

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj PRG 2)

- [ ] Příprava nových výukových kapitol pro **Blok 1: Datové kolekce v Pythonu** (Seznamy, Slovníky, Zpracování textu).
- [ ] Vytvoření interaktivních cvičení a simulátorů manipulace se seznamy a slovníky v prohlížeči.
- [ ] Zavedení praktických úloh pro práci se soubory (JSON) a bezpečné `try-except` ošetření.
