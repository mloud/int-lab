# Aktivní plánovací tabule: Operační systémy 2 (OSS 2)

**Aktivní předmět:** Operační systémy 2 (2. ročník SŠ)  
**Obor:** 18-20-M/01 Informační technologie  
**Dotace:** 66 h ročně (33 výukových týdnů × 2 h)  
**Cílová stanice:** Windows 11 Pro v podnikovém prostředí  
**Aktuální blok:** Blok 2: Bezpečnost koncových zařízení, inspekce a audit (6.–15. týden, 20 h)  

---

## 🎯 Aktuální úkol: Tvorba hodnoceného testu v sekci Bezpečnost
- **Umístění:** Za kapitolu *Správa procesů a digitální certifikáty* (`/specializovana/operacni-systemy-2/bezpecnost/procesy-a-certifikaty`)
- **Nová podkapitola:** `/specializovana/operacni-systemy-2/bezpecnost/test`
- **Typ:** Písemná práce (`TestWorksheetShell`)
- **PIN studenta:** `ZAK2026` (odemčení zadání)
- **PIN učitele:** `OS2026` (odemčení vzorového řešení)

### Otázky testu:
1. **Typologie a chování malwaru:** Virus vs. Síťový červ vs. Trojský kůň (hostitel, šíření, sociální inženýrství).
2. **Třífázový filtr spuštění ve Windows:** Lokální integrita/podpis (offline/CPU) ➔ Cloudová reputace (SmartScreen) ➔ Antivirový štít a zavedení do RAM (PID).
3. **Forenzní znaky malwaru v OS:** Typosquatting ve jménu, podezřelá cesta (`%TEMP%`, `AppData`), 100% zátěž CPU/RAM, chybějící podpis Verified Signer.
4. **Digitální certifikát (Authenticode):** Analogie voskové pečeti, identita autora + integrita kódu, údaje certifikátu.
5. **Ověření změny obsahu při přenosu:** Kryptografický kontrolní součet SHA-256, porovnání hashe a lavinový efekt.

---

## 📋 Stav realizace
- [x] Didaktický rozbor a formulace otázek schváleny v chatu.
- [x] PINy ověřeny (`ZAK2026` pro studenty, `OS2026` pro učitele).
- [ ] Vytvoření testové komponenty `MalwareProcessTestWorksheet.tsx` s `TestWorksheetShell`.
- [ ] Vytvoření stránky `app/specializovana/operacni-systemy-2/bezpecnost/test/page.tsx`.
- [ ] Registrace kapitoly s `isTest: true` v `registry/curriculum/schools/defaultSchool.ts`.
- [ ] Registrace v `registry/lessons/oss2Lessons.ts`.
- [ ] Zápis do `doc/history.md` a `doc/plans/PLAN_OSS2.md`.
