# Architektura projektu (IntLab)

## 🎯 Hlavní vize a cíle portálu
Naším cílem je **postavit robustní learningový portál pro základní a střední školy (včetně technických)** se zaměřením na předměty kolem informatiky.
- **Kvalita a obsah:** Klademe absolutní důraz na přesnost prezentovaných údajů.
- **Formáty výuky:** Zaměřujeme se na interaktivní *simulace, srozumitelnou teorii, ověření znalostí (kvízy/testy) a praktické listy*.
- **Škálovatelnost:** Portál musí být udržitelný do budoucna. Počítáme s tím, že budeme plynule přidávat desítky dalších témat, takže struktura kódu i dat musí být modulární.

## 🛠 Tech Stack (Aktuální stav)
- **Framework:** Next.js s App Routerem (`/app` adresář)
- **Knihovna a jazyk:** React 19, TypeScript
- **Stylování:** Tailwind CSS, s fontem *Quicksand*
- **Ikony a Animace:** `lucide-react` pro ikonografii, `framer-motion` (a `motion`) pro plynulé interakce a micro-animace.
- **Vyhledávání:** `fuse.js` (fuzzy search)
- **Analytika:** Cloudflare Web Analytics (bez cookies)

## 📂 Struktura projektu
- `/app` - Next.js App Router (hlavní stránky, `layout.tsx`, dynamické a statické routy)
- `/components` - Znovupoužitelné React komponenty (kurikulum, layout, informatika, specializovana, ui)
- `/registry` - Modulární registry škol (`/curriculum/schools/`), kapitol a lekcí (`lessons.ts`)
- `/constants.ts` / `/types.ts` - Centrální definice dat, struktur a TypeScript typů.
- `/doc` - Dokumentace k projektu

## 🖨️ Pracovní listy a testy k tisku
Novou součástí výukového portálu jsou materiály určené pro praktickou výuku a tisk (testy, pracovní listy):
- **Pracovní listy (Worksheets):** Jsou pro žáky **přímo přístupné bez PINu**. Slouží jako interaktivní průvodce laboratorní prací (uložení stavu v `useLocalStorage`, export do Wordu `.doc` a tisk).
- **Hodnocené testy (Tests):** Vyžadují PIN pro studenty (odemčení zadání) a PIN pro učitele (zobrazení vzorového řešení).
- Architektura se spoléhá na CSS media query `@media print`, která skryje postranní menu a všechny digitální prvky (tlačítka pro kontrolu, navigaci).
- Dokumenty (např. `OsSummaryWorksheet.tsx`) se formátují do velikosti A4 (`min-h-[297mm] max-w-[210mm]`).
- Pro žáky jsou vytvořeny pomocné vizuální komponenty, jako např. `Lines` pro psaní textu a `DrawBox` pro náčrty a schémata.
- Z testů a listů k tisku jsou flexibilně odstraňovány interaktivní prvky a metadata.

## 🎓 Didaktický model kurikula a rozbor učiva předmětu
Každý předmět v kurikulu (`SubjectConfig` v `registry/curriculum/types.ts`) může volitelně nést strukturovaný didaktický rozbor (`analysis: SubjectCurriculumAnalysis`):
- **Cíl & Profil výstupu:** `goal` a `targetProfile` definující kompetence a profil absolventa předmětu.
- **Konkrétní výstupy:** `expectedOutcomes: string[]` – explicitní seznam dovedností žáka v praxi.
- **Didaktická gradace (Kroky & Proč):** `steps: Array<{ step, description, why }>` – vysvětlení, jaké kroky po sobě následují a jaké je odborné/pedagogické zdůvodnění tohoto pořadí.
- **HW a SW zázemí:** `hardwareRequirements` a `softwareStack`.
- **Prezentace v UI:** Komponenta `DynamicSubjectHub` tento rozbor automaticky a přehledně zobrazuje pod mřížkou kapitol (včetně sbalování/rozbalování), pokud jsou data v modelu vyplněna. Pokud v modelu chybí, rozbor se nezobrazuje.

## 🔐 Administrátorská část a Správa dat (Plánovaný další krok)
- **Aktuální stav:** Data škol a lekcí jsou definována lokálně v TypeScript registrech (`registry/curriculum/schools/` a `registry/lessons.ts`).
- **Plánovaný přechod (Server & Admin rozhraní):**
  1. **Serverová databáze / API:** Přemístit definice škol, předmětů, kapitol a lekcí na server (např. Cloudflare D1, Supabase nebo serverless API).
  2. **Administrační rozhraní (CMS):** Vybudovat webový admin panel, který umožní učiteli/správci:
     - Přidávat, upravovat a skrývat školy, ročníky, předměty i kapitoly v reálném čase bez zásahu do zdrojového kódu a bez nutnosti rebuildu.
     - Spravovat metadata lekcí, přístupové PINy pro testy a řazení témat.
  3. **Zabezpečení:** Autentizace administrátora přes Cloudflare Access (GitHub OAuth) nebo bezpečný session systém.

## 📊 Analytický admin projekt (FINÁLNÍ ARCHITEKTONICKÉ ROZHODNUTÍ)

### Hosting a deployment
- **Hlavní web (IntLab):** Hostován na **GitHub Pages**, deployment přes GitHub Actions z větve `main`.
- **Admin projekt (Analytika):** Hostován na **Cloudflare Pages** — oddělený projekt ve složce `/analytics` v tomto repozitáři.

### Zabezpečení adminu — Cloudflare Zero Trust (Access)
- Admin nebude veřejně přístupný. Přístup je řízen na **síťové úrovni** přes **Cloudflare Access**.
- Útočník neuvidí ani přihlašovací stránku — Cloudflare zastaví požadavek dříve, než se načte jakýkoli kód.
- **Metoda přihlášení: GitHub OAuth** (jedno kliknutí, žádné heslo, okamžitý přístup přes existující GitHub účet).
- Cloudflare Access pravidlo: povoleno pouze pro konkrétní GitHub username vlastníka projektu.

### Datový tok
1. Návštěvníci hlavního webu jsou pasivně sledováni přes **Cloudflare Web Analytics** (beacon.js, bez cookies).
2. Cloudflare ukládá analytická data (pageviews, zeměpisná data, časy, atp.) na svých serverech.
3. Admin projekt (po přihlášení přes GitHub OAuth) volá **Cloudflare Analytics API** a stahuje tato data.
   - *Poznámka:* Lokálně se API volá napřímo pomocí klíčů z `.env.local`. V produkci na Cloudflare Pages se stará o bezpečné volání bez nutnosti vystavení klíčů proxy ve složce `functions/api/graphql.js`.
4. Data jsou vizualizována v dashboardu (grafy, přehledy, statistiky).

### Proč toto řešení?
- Maximální bezpečnost bez nutnosti psát vlastní autentizační logiku.
- Nulové náklady (Cloudflare free tier pokryje vše pro jednoho uživatele).
- Obě aplikace jsou nezávislé — výpadek nebo změna jedné neovlivní druhou.
- Přirozená integrace: GitHub OAuth + GitHub Pages + Cloudflare jsou vzájemně kompatibilní ekosystémy.

## 🔄 Pravidla pro vývoj
- Všechny nové větší změny nebo cíle se nejprve zaznamenají do `PLAN.md`.
- Při změně technologického stacku nebo složitější logiky se aktualizuje tento soubor.
