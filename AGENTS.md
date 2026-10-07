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
7. **Tvorba Testů a Pracovních listů:**
   - Kdykoli přidáváš nový test nebo pracovní list pro žáky, použij k tomu vždy univerzální komponentu `TestWorksheetShell`.
   - VŽDY se předtím zeptej uživatele na to, jaký má být nastaven **přístupový PIN pro studenty** (k odtajnění zadání) a **přístupový PIN pro učitele** (k zobrazení vzorového řešení).
