# Kurikulární profil předmětu: Programování a vývoj her 2 (PRG 2)

---

## 1. Identifikace předmětu a časová dotace

| Parametr | Hodnota |
|---|---|
| **Název předmětu** | Programování a hry 2 |
| **Zkratka / Kód** | PRG 2 (`prg2`) |
| **Cílový ročník** | 2. Ročník SŠ (Střední odborná škola) |
| **Obor vzdělání** | 18-20-M/01 Informační technologie |
| **Týdenní hodinová dotace** | 2 hodiny týdně |
| **Celková roční dotace** | 68 vyučovacích hodin (34 týdnů výuky) |
| **Forma výuky** | Vývojářská laboratoř v Pythonu s okamžitou grafickou vizualizací v Tkinter Canvas (cca 25 % výklad, 75 % praktické kódování) |
| **Výchozí routa v IntLab** | `/specializovana/programovani-2` |

---

## 2. Vazba na Rámcový vzdělávací program (RVP 18-20-M/01)

### 2.1 Klíčové a odborné kompetence
- **Algoritmizace a textové programování:** Žák zapisuje algoritmy v textovém programovacím jazyce Python 3, dodržuje syntaktická pravidla (odsazení kódu / indentation, jmenné konvence PEP 8).
- **Práce s datovými typy a výrazy:** Žák rozlišuje celá čísla, desetinná čísla, textové řetězce a pravdivostní hodnoty, používá matematické a relační operace.
- **Událostmi řízené programování a GUI:** Žák vytváří grafické rozhraní, propojuje kód s uživatelskými vstupy (myš, klávesnice) a chápe princip smyčky událostí (Event Loop).
- **Strukturování kódu:** Žák rozděluje komplexní programy do vlastních funkcí s parametry a návratovými hodnotami a importuje standardní knihovny.

---

## 3. Školní vzdělávací program (ŠVP)

### 3.1 Cíle předmětu
Umožnit plynulý a bezpečný přechod od blokového programování (Scratch z 1. ročníku) k reálnému průmyslovému programovacímu jazyku Python. Didaktická metoda staví na **okamžité grafické vizualizaci**: každý nový koncept (proměnná, cyklus, podmínka, náhoda, funkce) je ihned demonstrován na kreslení obrazců, generování ornamentů a interaktivních miniher na plátně Tkinter Canvas.

### 3.2 Profil absolventa předmětu
Absolvent PRG 2 dokáže samostatně:
- Napsat a odladit strukturovaný program v Pythonu ve vývojovém prostředí (VS Code / PyCharm / IDLE).
- Algoritmicky generovat složité geometrické a fraktální tvary.
- Zpracovávat události myši a vytvářet interaktivní grafické aplikace.
- Navrhnout a implementovat vlastní funkce s parametry a návratovou hodnotou.

---

## 4. Tematický plán předmětu (Rozpis 68 hodin)

| Blok | Tematický celek | Dotace (Teorie / Cvičení) | Konkrétní učivo a výstupy žáka | Vazba na IntLab |
|:---:|---|:---:|---|---|
| **1** | **Syntaxe Pythonu, výpisy a vstup** | 4 h (1 h / 3 h) | Funkce `print()`, formátování řetězců (f-strings), parametr `sep` a `end`, komentáře `#`, vstup z konzole `input()`, typová konverze `int()` a `float()`. | `/python-vypisy`, `/python-zaklady`, `/python-program` |
| **2** | **Výrazy, operátory a proměnné** | 6 h (2 h / 4 h) | Aritmetické operace (`+`, `-`, `*`, `/`), celočíselné dělení `//` a modulo `%` (aplikace pro sudá/lichá čísla a mřížky), přiřazovací operátory, proměnné a dynamické typování. | `/python-vyrazy`, `/python-promenne` |
| **3** | **Grafické plátno Canvas a kreslení** | 8 h (2 h / 6 h) | Knihovna Tkinter, komponenta Canvas, souřadnicový systém (počátek [0,0] vlevo nahoře), metoda `create_rectangle()`, `create_line()`, parametry `fill`, `outline`, `width`. Proměnné pro posun tvaru. | `/python-kresleni`, `/python-barvy`, `/python-kresleni-s-promennymi` |
| **4** | **Kruhy, ovály a elipsy** | 6 h (1 h / 5 h) | Metoda `create_oval()`, vazba mezi opsaným obdélníkem, středem `[x, y]` a poloměrem `r`, kreslení terčů a geometrických mandal. | `/python-elipsy` |
| **5** | **Texty a interaktivita myší** | 6 h (1 h / 5 h) | Vykreslování textu `create_text()`, fonty a zarovnání `anchor`. Události myši: vazba `canvas.bind("<Button-1>", klik)`, čtení souřadnic `event.x`, `event.y`, kreslicí tabulka myší. | `/python-text`, `/python-kresleni-mysi` |
| **6** | **Cykly `for` a generování ornamentů** | 10 h (2 h / 8 h) | Konstrukce `for i in range(n)`, varianty `range(start, stop, step)`, proměnná cyklu jako souřadnice či velikost, řady tvarů, mřížky dlaždic, soustředné kruhy. | `/python-cyklus`, `/python-promenna-cyklu`, `/python-kruhy-a-cykly` |
| **7** | **Podmínky a větvení v grafice** | 10 h (2 h / 8 h) | Větvení `if`, `elif`, `else`, operátory porovnání, logické operátory `and`, `or`, `not`, střídavé barvení (využití modula `i % 2 == 0`), šachovnice, vnořené větvení pro složité rastrové vzory. | `/python-vetveni`, `/python-vetveni-a-konstrukce`, `/python-vnorene-vetveni` |
| **8** | **Náhoda a generativní grafika** | 6 h (1 h / 5 h) | Modul `random`, funkce `random.randint()`, `random.choice()`, náhodné hvězdné nebe, procedurální generování městečka s okny, simulace házení kostkou. | `/python-nahoda` |
| **9** | **Vlastní funkce a podprogramy** | 8 h (2 h / 6 h) | Klíčové slovo `def`, parametry funkce (souřadnice, velikost, barva), návratové hodnoty `return`, znovupoužitelný kód pro kreslení složitých objektů (domeček, auto, postavička). | `/python-podprogramy`, `/python-podprogram-s-parametrem` |
| **–** | **Závěrečný projekt v Tkinteru a obhajoba** | 4 h (0 h / 4 h) | Samostatný grafický projekt (interaktivní generátor vzorů, mini-hra s myší nebo simulátor), prezentace a zhodnocení kódu. | — |
| **Σ** | **Celkem** | **68 h (14 h T / 54 h C)** | **Pravidelná 2hodinová týdenní dotace** | |

---

## 5. Mezipředmětové vazby

- **Vertikální vstup (z PRG 1):** Žáci již znají koncepty algoritmu, větvení a cyklu ze Scratche a soustředí se na čistou syntaxi Pythonu bez přetížení logikou.
- **Vertikální výstup (do 3. a 4. ročníku):** Python tvoří základ pro skriptování v Linuxu (OSS 3), analýzu dat, práci s API, IoT na mikrokontrolérech a robotiku.
- **Horizontální vazba na OSS 2:** Skriptovací koncepty proměnných a cyklů usnadňují pochopení administračních skriptů v PowerShellu.

---

## 6. Mapování na portál IntLab

- Rozcestník: [`/specializovana/programovani-2`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/app/specializovana/programovani-2/page.tsx)
- Jednotné vizuální téma: Jantarovo-oranžový gradient (`from-amber-500 to-orange-600`)
- Implementované kapitoly v `components/specializovana/programovani-2/`:
  - `PythonOutputsChapter.tsx`, `PythonBasicsChapter.tsx`, `PythonProgramChapter.tsx`
  - `PythonExpressionsChapter.tsx`, `PythonVariablesChapter.tsx`
  - `PythonDrawingChapter.tsx`, `PythonColorsChapter.tsx`, `PythonVariablesDrawingChapter.tsx`
  - `PythonEllipsesChapter.tsx`, `PythonTextChapter.tsx`, `PythonMouseDrawingChapter.tsx`
  - `PythonLoopsChapter.tsx`, `PythonLoopVarChapter.tsx`, `PythonCirclesLoopsChapter.tsx`
  - `PythonConditionsChapter.tsx`, `PythonBranchingChapter.tsx`, `PythonNestedBranchingChapter.tsx`
  - `PythonRandomChapter.tsx`, `PythonSubroutinesChapter.tsx`, `PythonFunctionsArgsChapter.tsx`
