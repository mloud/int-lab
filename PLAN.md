# Plán vývoje portálu (IntLab)

Tento dokument slouží jako hlavní rozcestník a to-do list pro náš projekt.

## 📝 Aktuální cíle
- [x] Dokumentace architektury a vize (viz `ARCHITECTURE.md`) ✅

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

