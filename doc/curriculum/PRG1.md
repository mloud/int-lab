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
| **1** | **Úvod do prostředí Scratch a herní cyklus** | 6 h (1 h / 5 h) | Prostředí Scratch, scéna, souřadnicový systém [X, Y], postavy (sprites), události (`po kliknutí na zelenou vlajku`), pohyb a směrování, plynulý posun, herní smyčka. | `/specializovana/programovani/scratch` (Lekce 1) |
| **2** | **Vzhled, animace a ozvučení** | 6 h (1 h / 5 h) | Kostýmy a fázování pohybu (animace chůze), vrstvení postav, grafické efekty (průhlednost, jas), zvukové stopy a synchronizace dialogů. | Scratch Lekce 2 |
| **3** | **Proměnné a datové struktury ve hře** | 10 h (2 h / 8 h) | Tvorba proměnných, globální vs. lokální proměnná pro postavu, počítadlo skóre, životy (HP), časomíra, manipulace s hodnotou (`změň o`), práce se seznamy (inventář, tabulka rekordů). | Scratch Lekce 3 |
| **4** | **Podmínky, větvení a detekce kolizí** | 10 h (2 h / 8 h) | Podmíněné bloky `když - tak` a `když - tak - jinak`, operátory porovnání (`<`, `=`, `>`) a logické spojky (`a`, `nebo`, `není`), detekce dotyku barev a objektů, fyzika skoku a gravitace. | Scratch Lekce 4 |
| **5** | **Vlastní bloky a procedurální dekompozice** | 8 h (2 h / 6 h) | Klíčový koncept podprogramu (tvorba vlastního bloku), předávání vstupních parametrů, opakovaně použitelný kód, běh bez obnovy obrazovky (zrychlené výpočty). | Scratch Lekce 5 |
| **6** | **Pololetní herní projekt** | 8 h (0 h / 8 h) | Samostatná tvorba kompletní 2D arkádové hry (návrh herního designu, realizace mechanik, testování a ladění chyb, závěrečná prezentace). | Obhajoba projektu |
| **7** | **3D Raycaster Herní Engine (Wolfenstein 3D)** | 16 h (4 h / 12 h) | **Teorie:** Princip vrhání paprsků (raycasting), reprezentace herní mapy v 2D poli, DDA algoritmus (Digital Differential Analyzer).<br>**Matematika:** Výpočet průsečíků s mřížkou, odstranění efektu rybího oka (Fish-eye correction přes kosinus).<br>**Vykreslování:** Přepočet vzdálenosti stěny na výšku sloupce na 2D plátně, stínování podle světových stran.<br>**Hratelnost:** Pohyb hráče v bludišti, rotace pohledu myší/klávesami, kolize se zdmi. | `/specializovana/programovani/projekty/raycaster` |
| **–** | **Závěrečná obhajoba a reflexe** | 4 h (0 h / 4 h) | Prezentace enginu, reflexe algoritmických principů před přechodem na textový Python ve 2. ročníku. | — |
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
