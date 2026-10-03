# Plán vývoje portálu (IntLab)

Tento dokument slouží jako hlavní rozcestník a to-do list pro náš projekt.

## 📝 Aktuální cíle
- [x] Dokumentace architektury a vize (viz `ARCHITECTURE.md`) ✅

---

## 🛑 ZASTÁVKA — 3. 10. 2026 (Aktuální stav)

### Co bylo dokončeno (Analytika & Bezpečnost):
- ✅ Vytvořen kompletní analytický dashboard v `/analytics`
- ✅ Cloudflare Web Analytics GraphQL API klient opraven (odstraněna nepodporovaná pole `pageLoadTime` a změněno `browserFamily` na `userAgentBrowser`).
- ✅ Lokální proxy pro vývoj obejita přímým voláním na `api.cloudflare.com` za pomoci klíčů z `.env.local`.
- ✅ Vyřešen únik tajemství (`analytics/.dev.vars`) pomocí prepisu Git historie a zabezpečením `.gitignore`.
- ✅ **Úspěšně nasazeno na Cloudflare Pages z větve `main`**. Aplikace živě funguje a načítá data!

### Co bylo dokončeno (Obsah):
- ✅ Vytvořena verze pracovního listu k tisku (A4) pro test z Operačních systémů.
- ✅ Využita architektura s CSS `@media print` a připraveny tiskové komponenty (`Lines`, `DrawBox`).

### 🔜 Další úkol (Zabezpečení):
1. **Nastavit Cloudflare Zero Trust Access** — Ochránit produkční URL Cloudflare Pages pomocí GitHub OAuth, aby se do analytiky dostal pouze oprávněný uživatel (vlastník).

---

## 🔜 Analytický admin projekt — Zbývá
- [x] Vytvořit složku `/analytics` v repozitáři jako nový Next.js projekt ✅
- [x] Implementovat volání Cloudflare Analytics GraphQL API ✅
- [x] Postavit dashboard (přehled, stránky, geografie, zařízení, referrery) ✅
- [x] Nastavit GitHub Actions pravidlo `paths-ignore: analytics/**` pro hlavní web ✅
- [x] Napojit Cloudflare Pages na repozitář (Root Directory: `analytics`, Build: `npm run build`, Output: `out`) ✅
- [x] Nastavit `.env.local` a Cloudflare Pages Variables se skutečnými hodnotami ✅
- [ ] **ZBÝVÁ: Nastavit Cloudflare Zero Trust Access** — GitHub OAuth pro konkrétní username

## ✅ Dokončené úkoly
- [x] Inicializace repozitáře a základní struktura Next.js aplikace
- [x] Základní komponenty (Informatika, Specializovaná část, atd.)
- [x] Finální architektonické rozhodnutí pro admin/analytiku (Cloudflare Pages + Access + GitHub OAuth)
- [x] Analytický dashboard — veškerý kód hotov, build ověřen

## 🚀 Roadmapa (Výhled do budoucna)
- Testování a optimalizace výkonu hlavního webu
- Přidávání dalších vzdělávacích témat a simulací
- Příprava pro plnohodnotné nasazení (deploy) hlavního webu

