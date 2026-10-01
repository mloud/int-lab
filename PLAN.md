# Plán vývoje portálu (IntLab)

Tento dokument slouží jako hlavní rozcestník a to-do list pro náš projekt.

## 📝 Aktuální cíle
- [x] Dokumentace architektury a vize (viz `ARCHITECTURE.md`) ✅

---

## 🛑 ZASTÁVKA — 30. 9. 2026 (kde jsme skončili)

### Co bylo hotovo dnes:
- ✅ Vytvořen kompletní analytický dashboard v `/analytics` (Next.js 15, Recharts v3)
- ✅ 5 stránek: Přehled, Stránky, Geografie, Zařízení, Referrery
- ✅ Cloudflare Web Analytics GraphQL API klient (`lib/cloudflare.ts`)
- ✅ Build lokálně prošel bez chyby (`npm run build` → složka `out`)
- ✅ Dev server funguje na `localhost:3001`
- ✅ GitHub Actions upraven (`paths-ignore: analytics/**`)

### ⚠️ Kde jsme zasekli — Cloudflare Pages deploy:
Uživatel vytvořil projekt v Cloudflare, ale **omylem jako Worker** (sekce `/workers/services/`) místo jako **Pages** projekt.
Chyba: OpenNext adaptér (`@opennextjs/cloudflare`) selhal, protože očekával SSR ale máme statický export.

### 🔜 Zítřejší první úkol:
1. Smazat omylem vytvořený **Worker** `int-lab-analytics` (Danger zone → Delete Worker)
2. Vytvořit správně **Pages** projekt:
   - `dash.cloudflare.com` → Workers & Pages → **Create** → záložka **Pages** → Connect to Git
   - Repozitář: `mloud/int-lab`
   - **Framework preset: None** ← KLÍČOVÉ, nevybírat Next.js!
   - Root directory: `analytics`
   - Build command: `npm run build`
   - Build output directory: `out`
3. Přidat Environment Variables do Pages projektu:
   - `NEXT_PUBLIC_CF_ACCOUNT_ID`
   - `NEXT_PUBLIC_CF_API_TOKEN` (vytvořit na `/profile/api-tokens` → Account Analytics Read)
   - `NEXT_PUBLIC_CF_SITE_TAG` (najít v Analytics → Web Analytics → Manage site)
4. Nastavit Cloudflare Zero Trust Access (GitHub OAuth ochrana adminu)

---

## 🔜 Analytický admin projekt — Zbývá
- [x] Vytvořit složku `/analytics` v repozitáři jako nový Next.js projekt ✅
- [x] Implementovat volání Cloudflare Analytics GraphQL API ✅
- [x] Postavit dashboard (přehled, stránky, geografie, zařízení, referrery) ✅
- [x] Nastavit GitHub Actions pravidlo `paths-ignore: analytics/**` pro hlavní web ✅
- [ ] **ZBÝVÁ: Napojit Cloudflare Pages na repozitář** (Root Directory: `analytics`, Build: `npm run build`, Output: `out`)
- [ ] **ZBÝVÁ: Nastavit Cloudflare Zero Trust Access** — GitHub OAuth pro konkrétní username
- [ ] **ZBÝVÁ: Nastavit `.env.local`** se skutečnými hodnotami pro `NEXT_PUBLIC_CF_ACCOUNT_ID`, `NEXT_PUBLIC_CF_API_TOKEN`, `NEXT_PUBLIC_CF_SITE_TAG`

## ✅ Dokončené úkoly
- [x] Inicializace repozitáře a základní struktura Next.js aplikace
- [x] Základní komponenty (Informatika, Specializovaná část, atd.)
- [x] Finální architektonické rozhodnutí pro admin/analytiku (Cloudflare Pages + Access + GitHub OAuth)
- [x] Analytický dashboard — veškerý kód hotov, build ověřen

## 🚀 Roadmapa (Výhled do budoucna)
- Testování a optimalizace výkonu hlavního webu
- Přidávání dalších vzdělávacích témat a simulací
- Příprava pro plnohodnotné nasazení (deploy) hlavního webu

