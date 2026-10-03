# Architektura projektu (IntLab)

## 🎯 Hlavní vize a cíle portálu
Naším cílem je **postavit robustní learningový portál pro základní a střední školy (včetně technických)** se zaměřením na předměty kolem informatiky.
- **Kvalita a obsah:** Klademe absolutní důraz na přesnost prezentovaných údajů.
- **Formáty výuky:** Zaměřujeme se na interaktivní *simulace, srozumitelnou teorii, ověření znalostí (kvízy/testy) a praktické listy*.
- **Škálovatelnost:** Portál musí být udržitelný do budoucna. Počítáme s tím, že budeme plynule přidávat desítky dalších témat, takže struktura kódu i dat musí být modulární.

## 🛠 Tech Stack (Aktuální stav)
- **Framework:** Next.js s App Routerem (`/app` adresář)
- **Knihovna a jazyk:** React 19, TypeScript
- **Stylování:** Tailwind CSS (načítáno přes CDN v `layout.tsx`), s fontem *Quicksand*
- **Ikony a Animace:** `lucide-react` pro ikonografii, `framer-motion` (a `motion`) pro plynulé interakce a micro-animace.
- **Vyhledávání:** `fuse.js` (fuzzy search)
- **Analytika:** Cloudflare Web Analytics (bez cookies)

## 📂 Struktura projektu
- `/app` - Next.js App Router (hlavní stránky, `layout.tsx`, routování)
- `/components` - Znovupoužitelné React komponenty (rozděleno tematicky - informatika, specializovana, apod.)
- `/constants.ts` / `/types.ts` - Centrální definice dat, struktur a TypeScript typů.
- `/doc` - Dokumentace k projektu

## 🖨️ Pracovní listy a testy k tisku
Novou součástí výukového portálu jsou materiály určené primárně pro fyzický tisk (testy, pracovní listy):
- Architektura se spoléhá na CSS media query `@media print`, která skryje postranní menu a všechny digitální prvky (tlačítka pro kontrolu, navigaci).
- Dokumenty (např. `OsSummaryWorksheet.tsx`) se formátují do velikosti A4 (`min-h-[297mm] max-w-[210mm]`).
- Pro žáky jsou vytvořeny pomocné vizuální komponenty, jako např. `Lines` pro psaní textu a `DrawBox` pro náčrty a schémata.
- Z testů a listů k tisku jsou flexibilně odstraňovány interaktivní prvky a metadata.

## 🔐 Administrátorská část a Data
- **Stav:** Databáze v tuto chvíli není potřeba. Veškerý obsah a datové struktury jsou řešeny lokálně (soubory `constants.ts`, komponenty).
- **Budoucí správa dat:** Řeší se přes analytický admin projekt (viz níže).

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
