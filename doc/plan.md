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

### Otázky testu (6 úloh, celkem 22 bodů):
1. **Typologie a chování malwaru (5 b):** Virus vs. Síťový červ vs. Trojský kůň (hostitel, šíření, sociální inženýrství).
2. **Třífázový filtr spuštění ve Windows (4 b):** Lokální integrita/podpis (offline/CPU) ➔ Cloudová reputace (SmartScreen) ➔ Antivirový štít a zavedení do RAM (PID).
3. **Forenzní znaky malwaru v OS (4 b):** Typosquatting ve jménu, podezřelá cesta (`%TEMP%`, `AppData`), 100% zátěž CPU/RAM, chybějící podpis Verified Signer.
4. **Certifikát spustitelného souboru (3 b):** Co je certifikát, jaké konkrétní údaje obsahuje (autor, autorita, platnost, klíč/podpis) a co značí jeho neexistence (neznamená automaticky malware, ale neověřený původ).
5. **Kryptografický hash (otisk) souboru (3 b):** Co je hash souboru (jednosměrný matematický otisk pevné délky, lavinový efekt) a k čemu se používá (kontrola integrity, antivirové databáze / VirusTotal, digitální podpisy).
6. **Ověření změny obsahu při přenosu souboru po síti (3 b):** Praktický postup bez spoileru v zadání – student musí sám odvodit a popsat kontrolu integrity pomocí hashe (SHA-256), porovnání referenčního a lokálně vypočteného hashe (např. CertUtil) a roli lavinového efektu.

---

## 📋 Stav realizace
- [x] Didaktický rozbor a formulace otázek schváleny v chatu.
- [x] PINy nastaveny (`ZAK2026` pro studenty, `OS2026` pro učitele).
- [x] Vytvoření testové komponenty `MalwareProcessTestWorksheet.tsx` s `TestWorksheetShell`.
- [x] Vytvoření stránky `app/specializovana/operacni-systemy-2/bezpecnost/test/page.tsx`.
- [x] Registrace kapitoly s `isTest: true` v `registry/curriculum/schools/defaultSchool.ts`.
- [x] Registrace v `registry/lessons/oss2Lessons.ts`.
- [x] Zápis do `doc/history.md` a `doc/plans/PLAN_OSS2.md`.
