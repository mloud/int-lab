# Kurikulární profil předmětu: Programování a vývoj her 1 (PRG 1)

---

## 1. Identifikace předmětu a časová dotace

| Parametr | Hodnota |
|---|---|
| **Název předmětu** | Programování a hry 1 |
| **Zkratka / Kód** | PRG 1 (`prg1`) |
| **Cílový ročník** | 1. Ročník SŠ (Střední odborná škola) |
| **Obor vzdělání** | 18-20-M/01 Informační technologie |
| **Týdenní hodinová dotace** | 2 hodiny týdně |
| **Celková roční dotace** | 68 vyučovacích hodin (34 týdnů výuky) |
| **Forma výuky** | Praktická vývojářská dílna (cca 20 % výklad principů, 80 % samostatná tvorba a programování) |
| **Výchozí routa v IntLab** | `/specializovana/programovani` |

---

## 2. Vazba na Rámcový vzdělávací program (RVP 18-20-M/01)

### 2.1 Klíčové a odborné kompetence
- **Algoritmizace a dekompozice:** Žák analyzuje problém, rozdělí jej na menší podúlohy (podprogramy) a navrhne správný sled kroků.
- **Práce s daty a řízením toku programu:** Žák správně používá proměnné pro ukládání stavu, podmíněné větvení pro rozhodování a cykly pro opakované činnosti.
- **Kreativní tvorba a matematické modelování:** Žák aplikuje kartézskou soustavu souřadnic, goniometrické funkce a geometrické transformace při tvorbě herních mechanik a 3D grafických simulací.

---

## 3. Školní vzdělávací program (ŠVP)

### 3.1 Cíle předmětu
Odstranit počáteční bariéru strachu ze syntaxe a textového kódu. Pomocí vizuálního blokového programování (Scratch 3) si žáci vybudují pevné algoritmické návyky a pochopí fundamentální koncepty programování. V závěru ročníku své dovednosti uplatní při stavbě komplexního matematicko-herního projektu (3D Raycaster engine ve stylu Wolfenstein 3D).

### 3.2 Profil absolventa předmětu
Absolvent PRG 1 dokáže samostatně:
- Navrhnout a zrealizovat interaktivní 2D aplikaci nebo hru.
- Číst algoritmy, detekovat logické chyby a provádět refaktoring kódu.
- Vytvářet vlastní procedury (bloky) s parametry.
- Chápat principy herního cyklu (Game Loop), detekce kolizí a vykreslování grafiky.

---

## 4. Tematický plán předmětu (Rozpis 68 hodin)

| Blok | Tematický celek | Dotace (Teorie / Cvičení) | Konkrétní učivo a projekty | Vazba na IntLab |
|:---:|---|:---:|---|---|
| **1** | **Úvod do prostředí Scratch a herní cyklus** | 6 h (1 h / 5 h) | Prostředí Scratch, scéna, souřadnicový systém [X, Y], postavy (sprites), události (`po kliknutí na zelenou vlajku`), pohyb a směrování, plynulý posun, herní smyčka. | `/specializovana/programovani/scratch` (Lekce 1: Sekvence) |
| **2** | **Proměnné a herní mechaniky** | 8 h (1 h / 7 h) | Tvorba proměnných, počítadlo skóre, životy (HP), časomíra, ukládání a modifikace hodnoty (`změň o`), operátory. | Scratch Lekce 2: Proměnné |
| **3** | **Cykly a opakování** | 8 h (1 h / 7 h) | Bloky `opakuj N-krát`, `opakuj stále`, proměnná cyklu, geometrické obrazce a kreslení perem. | Scratch Lekce 3: Cykly |
| **4** | **Vlastní bloky a procedurální dekompozice** | 8 h (2 h / 6 h) | Klíčový koncept podprogramu (tvorba vlastního bloku), předávání vstupních parametrů, opakovaně použitelný kód, běh bez obnovy obrazovky. | Scratch Lekce 4: Podprogramy |
| **5** | **Podmínky, větvení a detekce kolizí** | 10 h (2 h / 8 h) | Podmíněné bloky `když - tak` a `když - tak - jinak`, operátory porovnání a logické spojky (`a`, `nebo`, `není`), Validátor síly hesla a Bankomat ATM. | Scratch Lekce 5: Podmínky |
| **6** | **Seznamy a práce s daty ve hře** | 10 h (2 h / 8 h) | Práce se seznamy (pole), indexace od 1, přidávání a mazání položek, automatické posouvání indexů, test přítomnosti `obsahuje?`, traverzování cyklem, žebříček TOP 3 skóre. | Scratch Lekce 6: Seznamy |
| **7** | **3D Raycaster Herní Engine (Wolfenstein 3D)** | 14 h (3 h / 11 h) | **Teorie:** Princip vrhání paprsků (raycasting), reprezentace herní mapy v 2D poli, DDA algoritmus.<br>**Matematika:** Výpočet průsečíků s mřížkou, odstranění rybího oka.<br>**Vykreslování:** Přepočet vzdálenosti na výšku sloupce na 2D plátně.<br>**Hratelnost:** Pohyb hráče v bludišti, kolize se zdmi. | `/specializovana/programovani/projekty/raycaster` |
| **–** | **Závěrečná obhajoba a reflexe** | 4 h (0 h / 4 h) | Prezentace projektů, reflexe algoritmických principů před přechodem na textový Python ve 2. ročníku. | — |
| **Σ** | **Celkem** | **68 h (12 h T / 56 h C)** | **Pravidelná 2hodinová týdenní dotace** | |

---

## 5. Mezipředmětové vazby

- **Matematika:** Kartézské souřadnice, úhly, goniometrie (sinus, kosinus při raycastingu), geometrická symetrie.
- **Fyzika:** Vektory rychlosti, gravitace, setrvačnost, odraz od překážky.
- **Vertikální návaznost na PRG 2:** Znalosti cyklů, proměnných, podmínek a podprogramů jsou přímým můstkem pro výuku jazyka Python.

---

## 6. Mapování na portál IntLab

- Rozcestník: [`/specializovana/programovani`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/app/specializovana/programovani/page.tsx)
- Jednotné vizuální téma: Smaragdovo-zelený gradient (`from-emerald-600 to-teal-600`), akcent Scratche `border-amber-500`.
- Hlavní projekt: [`ScratchRaycasterProject.tsx`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/components/specializovana/programovani/ScratchRaycasterProject.tsx)
