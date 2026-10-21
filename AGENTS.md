<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# IntLab UI & Layout Rules
Vždy dodržuj následující pravidla pro design a rozložení prvků v aplikaci:

1. **Pracovní listy (Worksheets):**
   - Vždy používej šablonu (jako `WorksheetLayout`), `useLocalStorage` pro stav a html bloby/generování pro export do Wordu.
2. **Architekturní diagramy:**
   - Diagramy (zejména ty reprezentující architekturu) by měly být vždy ohraničené a vycentrované (např. `max-w-xl mx-auto`), neměly by se natahovat přes celou obrazovku.
3. **Hlavní stránky a kapitoly (Fixní rámec):**
   - Obsah kapitol a hlavních rozcestníků by měl být vždy obalen fixním "skleněným" bílým rámcem s výrazným zaoblením (typicky `bg-white/80 backdrop-blur-xl rounded-[3rem] border-4 border-white shadow-2xl`). Pokud vytváříš novou kapitolu, použij existující `FsChapterShell` (nebo její obdobu), kde je toto již implementováno.
4. **Tlačítka podkapitol (Karty s tlačítkem):**
   - Tlačítka sloužící jako navigační rozcestníky pro podkapitoly (např. v menu) NESMÍ být široké horizontální panely, na které se kliká celé.
   - VŽDY je formátuj jako **štíhlé vertikální karty** (v gridu `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
   - Karta musí obsahovat centrovanou ikonu, nadpis a popis.
   - Pro samotný přechod musí karta dole obsahovat explicitní akční tlačítko (např. "Otevřít kapitolu").
   - Číslování kapitol (např. 1, 2, 3) umisťuj jako výrazný text do rohu karty (např. levý horní roh) a odděluj je od samotné ikony.
5. **Typografie a velikosti textů:**
   - **Hlavní nadpis (H1):** Vždy používej velikost `text-4xl font-black uppercase tracking-tighter` (např. `text-slate-900`).
   - **Podtitul/úvodní text pod H1:** Používej `text-lg text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed`.
   - **Nadpisy sekcí (H2):** Používej `text-2xl font-black text-slate-800`.
   - **Nadpisy vnořených karet/bloků (H3):** Používej `text-xl font-black` (často v kombinaci s `uppercase tracking-widest` nebo `tracking-tight`).
   - **Běžný text (odstavce, seznamy):** Výkladový text uvnitř karet nedávej do výchozí velikosti, ale VŽDY použij menší font `text-sm` s větším řádkováním, např. `text-sm text-slate-600 leading-relaxed`. Zlepšuje to čitelnost a prémiový vzhled.
6. **Scratch Kapitoly a Úkoly:**
   - Pro Scratch kapitoly vždy používej šablonu (komponentu `FsChapterShell`) s barvou `accentColor="border-amber-500"` a metodickým přepínačem s PINem.
   - Samotné úkoly (komponenta `TaskCard`) VŽDY obaluj do kontejneru `<div className="flex flex-col gap-8">`, aby se karty nedotýkaly a byla mezi nimi konzistentní mezera, přesně jako v lekci 1.
7. **Tvorba Testů a Písemek (PINy) vs. Pracovní listy:**
   - **Hodnocené testy a písemky (Test):** Použij k tomu vždy komponentu `TestWorksheetShell`. VŽDY se předtím zeptej uživatele na to, jaký má být nastaven **přístupový PIN pro studenty** (k odtajnění zadání) a **přístupový PIN pro učitele** (k zobrazení vzorového řešení).
   - **Pracovní listy (Worksheets):** U pracovních listů **NENÍ třeba PIN**! Jsou volně přístupné žákům (např. jako záložka v kapitole s `WorksheetLayout` a exportem do Wordu / tisku).

8. **Šablony Karet v Aplikaci (Hierarchie a Vzhled):**
   - **A. Hlavní rozcestník školy (Homepage):**
     - Komponenta: `SchoolDivisionCard` (`components/ui/SchoolDivisionCard.tsx`).
     - Použití: Výběr hlavní větve na homepage (`Obecná Informatika`, `Specializovaná IT`).
     - Vzhled: Velká reprezentativní karta s gradientem, vodotiskovou ikonou a velkým tlačítkem se šipkou.
   - **B. Karta Předmětu (Subject Card):**
     - Komponenta: `TechnicalCard` (`components/ui/TechnicalCard.tsx`) s `variant="filled"`.
     - Použití: Výběr předmětu (v `DynamicDivisionHub` – OS 1, PRG 1; Informatika 6, 7, 8, 9).
     - Vzhled: Plný barevný gradient pozadí, bílá typografie, bílé akční tlačítko.
     - Pravidlo: **NIKDY nezobrazovat ikonu složky v rohu** (`accentCorner={false}`).
   - **C. Karta Kapitoly s podkapitolami (Chapter Hub):**
     - Komponenta: `TechnicalCard` s `variant="default"` a `accentCorner={true}`.
     - Použití: Témata, která se větví do dalších podkapitol (např. Hardware, Komprese, Souborové systémy).
     - Vzhled: Bílý podklad, `#tag` vpravo nahoře, **minimalistická ikona složky (`Folder`) vlevo nahoře**, gradientní tlačítko "Otevřít kapitolu".
   - **D. Karta Přímé Lekce / Podkapitoly (Direct Lesson):**
     - Komponenta: `TechnicalCard` s `variant="default"` a `accentCorner={false}`.
     - Použití: Karty, které vedou přímo na konkrétní interaktivní lekci / simulátor bez dalšího větvení.
     - Vzhled: Bílý podklad, `#tag` vpravo nahoře, **žádná ikona složky v rohu**.
   - **E. Testové Kapitoly (Test Card):**
     - Komponenta: `TechnicalCard` s `isTest={true}`.
     - Vzhled: Červené/růžové zvýraznění (`border-rose-200`, `#TEST` růžový tag, rose tlačítko a ikona).

9. **Členění podle Ročníků (Grade Sections):**
   - Všechny hlavní přehledy předmětů a témat (např. v `DynamicDivisionHub`) VŽDY děl do sekcí podle ročníků.
   - **Nadpis sekce (H2):** `text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3`.
   - **Barevná pilulka:** `<span className="w-3 h-7 rounded-full bg-[barva]"></span>` před názvem ročníku (např. `6. Třída`, `1. Ročník`).
   - **Grid karet:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full` (nebo 2 sloupce dle počtu karet).

10. **Postup při Přidání Nového Předmětu (Subject Workflow):**
    - **Krok 1 (Kurikulum):** Do definice školy v `registry/curriculum/schools/` (např. `defaultSchool.ts`, `zsSchool.ts`) přidej předmět s ročníkem, ikonou, gradientem a kapitolami do správné divize.
    - **Krok 2 (Routa):** Vytvoř novou stránku v `app/` (např. `app/[divize]/[predmet]/page.tsx`) obalenou v `CategoryLayout`, která renderuje `DynamicSubjectHub`.
    - **Krok 3 (Registry lekcí):** Zaregistruj nový předmět do `registry/lessons.ts` s odpovídající `educationalPath` (`schoolType`, `grade`, `gradeLabel`, `subject`).

11. **Postup při Přidání Nové Kapitoly (Chapter Workflow):**
    - **Krok 1 (Kurikulum & Karta):** V kurikulu školy nastav kapitolu předmětu:
      - Pokud má podkapitoly: nastav `hasSubchapters: true` (a `accentCorner={true}`).
      - Pokud je to přímá lekce: nastav `hasSubchapters: false` (a `accentCorner={false}`).
      - Pokud jde o test/písemku: nastav `isTest: true`.
    - **Krok 2 (Routa):** Vytvoř stránku v `app/.../[kapitola]/page.tsx`.
    - **Krok 3 (Obsah):**
      - Má-li podkapitoly: použij `DynamicSubchapterHub` s definovanými podkapitolami.
      - Jde-li o přímou lekci: použij šablonu obsahu (`FsChapterShell`, `WorksheetLayout` nebo vlastní interaktivní komponentu).
    - **Krok 4 (Registry):** Zapiš lekci do `registry/lessons.ts`.

12. **Správa Historie a Plánu Učiva (OSS 1, OSS 2, OSS 3, PRG 1, PRG 2 Tracking):**
    - Každý odborný předmět má svůj **vlastní dedikovaný plán** ve složce `doc/plans/` (`PLAN_OSS1.md`, `PLAN_OSS2.md`, `PLAN_OSS3.md`, `PLAN_PRG1.md`, `PLAN_PRG2.md`, `PLAN_ROB.md`, `PLAN_REFACTORING.md`).
    - Soubor `doc/plan.md` slouží jako **aktivní plánovací tabule**, která se VŽDY přepne na ten předmět, na kterém se právě pracuje.
    - Vždy před zahájením práce na odborných předmětech **MUSÍŠ nejprve zkontrolovat**:
      - `doc/history.md` – co už je hotové, jaká je struktura existujících kapitol, jaké pojmy žáci znají a jaké didaktické volby byly učiněny.
      - `doc/plan.md` a příslušný soubor v `doc/plans/` – na čem se právě pracuje a jaká je plánovaná návaznost.
    - ZAJISTI, aby každé nové téma logicky a didakticky navazovalo na předchozí probíranou látku (žádné izolované "skoky" v pojmech).
    - Při přechodu na jiný předmět automaticky přepni `doc/plan.md` na daný předmět. Po dokončení práce nebo změně v kurikulu **VŽDY aktualizuj** záznam v `doc/history.md` a uprav stav v dedikovaném plánu v `doc/plans/` i v `doc/plan.md`.

13. **Modulární architektura a zákaz monolitického kódu (Modular Code Architecture):**
    - **Žádné monolity:** VŽDY se vyvaruj psaní obřích monolitických souborů (typicky nad 400–500 řádků).
    - **Dekompozice kapitol:** Každou komplexní kapitolu s více záložkami nebo složitější logikou ihned čleň do dedikované podsložky (např. `procesy/`, `malware/`):
      - **Orchestrátor kapitoly:** Hlavní soubor kapitoly (např. `MalwareDetectionChapter.tsx`) slouží pouze jako štíhlý orchestrátor (~50–200 řádků), který obaluje `FsChapterShell` a přepíná jednotlivé záložky.
      - **Záložky v samostatných souborech:** Každá záložka musí být v samostatné komponentě (např. `*TheoryTab.tsx`, `*SimulatorsTab.tsx`, `*LabTab.tsx`, `*QuizTab.tsx`).
      - **Samostatné simulátory:** Jednotlivé interaktivní simulátory (např. virus, ransomware, Process Explorer) musí mít vlastní izolované komponenty (např. v podsložce `simulators/`) s vlastním lokálním stavem.
      - **Typy a data:** Sdílená rozhraní, datové modely a konstanty umisťuj do samostatného `*Types.ts`.
    - **Udržitelnost:** Kód musí zůstat rozčleněný tak, aby byl v budoucnu snadno upravitelný po malých částech bez rizika poškození okolních funkcí.

14. **Kurikulární znalostní databáze (ŠVP, RVP a Tematické plány):**
    - Ve složce `doc/curriculum/` je vedena trvalá znalostní databáze pro všechny odborné předměty (**OSS 1, OSS 2, OSS 3, PRG 1, PRG 2, ROB 3, ROB 4**) a informatiku ZŠ.
    - Každý předmět má dedikovaný profil (např. `doc/curriculum/OSS1.md`), který obsahuje:
      1. **Identifikaci:** Kód předmětu, ročník, hodinová dotace (týdenní / roční).
      2. **Napojení na RVP:** Kód oboru (např. 18-20-M/01 Informační technologie), klíčové a odborné kompetence, očekávané výstupy RVP.
      3. **Školní vzdělávací program (ŠVP):** Cíle předmětu, profil absolventa, uplatnění v praxi.
      4. **Tematický plán:** Rozpis tematických celků a bloků, hodinová dotace (teorie vs. cvičení/laboratoř), výstupy žáka, hodnocení a testy.
      5. **Mezipředmětové vztahy a didaktická gradace:** Návaznost mezi ročníky (vertikální) a souvisejícími předměty (horizontální).
      6. **Mapování na IntLab:** Seznam odpovídajících kapitol, rout, interaktivních simulátorů a laboratorních protokolů.
    - Kdykoliv uživatel požaduje generování tematického plánu, podkladů pro ŠVP, inspekci, akreditaci nebo globální dotazy napříč předměty, **VŽDY čerpej z `doc/curriculum/`** a při změnách v kurikulu tyto dokumenty aktualizuj.

