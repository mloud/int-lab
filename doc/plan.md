# Aktivní plánovací tabule: Operační systémy 1 (OSS 1)

**Aktivní předmět:** Operační systémy 1 (1. ročník SŠ, obor 18-20-M/01 Informační technologie)  
**Celková hodinová dotace:** 66 vyučovacích hodin (2 hodiny týdně, 33 týdnů)  
**Oficiální profil kurikula (ŠVP InspIS):** [`doc/curriculum/SVP_INSPIS.md`](curriculum/SVP_INSPIS.md), [`doc/curriculum/OSS1.md`](curriculum/OSS1.md)  
**Dedikovaný podrobný plán:** [`doc/plans/PLAN_OSS1.md`](plans/PLAN_OSS1.md)  
**Výchozí routa v IntLab:** `/specializovana/operacni-systemy-1`

---

## 🎯 Hlavní pedagogický cíl předmětu
Převést žáka z role běžného uživatele PC do role **poučeného lokálního správce klientské stanice**. Žák proniká pod povrch grafického rozhraní, chápe spolupráci CPU a RAM, architekturu hardware, instaluje klientský OS, spravuje disky a oddíly, diagnostikuje procesy, automatizuje správu přes CLI/BAT a bezpečně konfiguruje lokální sítě.

---

## 📊 Přehled tematických celků (66 h) – Synchronizováno s ŠVP InspIS

| Blok | Měsíce & Týdny | Tematický celek | Dotace | Stav na portálu | Odkaz na webu |
|:---:|:---:|---|:---:|:---:|---|
| **1** | **Září** (1.–4. týden) | **Úvod do OS a HW pro OS** | 8 h | ✅ Hotovo (teorie, kvízy, simulátor CPU) | `/hardware/*`, `/architektura`, `/uvod`, `/vyvoj`, `/virtualizace` |
| **2** | **Říjen** (5.–9. týden) | **Souborový systém a disky** | 10 h | ✅ Hotovo (instalace, média, GPT, FAT trenažér, NTFS, boot, test02) | `/souborove-systemy/*`, `/boot`, `/test02` |
| **3** | **Listopad – Prosinec** (10.–12. týden) | **Procesy a paměť** | 6 h | ✅ Hotovo (vznik procesu, multitasking, stavy, vlákna, virtuální paměť) | `/procesy/*` (PR1–PR5) |
| **4** | **Leden** (13.–14. týden) | **Grafické rozhraní klientského OS (GUI)** | 4 h | ✅ Rozcestník & osnovy vytvořeny | `/gui/*` (GUI1–GUI3) |
| **5** | **Únor** (15.–17. týden) | **Příkazová řádka a dávkové soubory** | 6 h | ✅ Rozcestník & osnovy vytvořeny | `/prikazova-radka/*` (CLI1–CLI3, BAT1–BAT2) |
| **6** | **Březen** (18.–21. týden) | **Správa uživatelů a oprávnění** | 8 h | ✅ Rozcestník & osnovy vytvořeny | `/uzivatele/*` (USR1–USR4) |
| **7** | **Duben** (22.–23. týden) | **Správa software** | 4 h | ✅ Rozcestník & osnovy vytvořeny | `/software/*` (SW1–SW2) |
| **8** | **Květen** (24.–25. týden) | **Správa zařízení a Plánovač úloh** | 4 h | ✅ Rozcestník & osnovy vytvořeny | `/zarizeni`, `/planovac` |
| **9** | **Květen** (26.–29. týden) | **Síťová konfigurace a lokální sítě (LAN)** | 8 h | ✅ Rozcestník & osnovy vytvořeny | `/site/*` (NET1–NET4) |
| **10** | **Červen** (30.–33. týden) | **Závěrečný projekt a hodnocení** | 8 h | ✅ Rozcestník & osnovy vytvořeny | `/projekt/*` (PRJ1–PRJ4) |
| **Σ** | **Celý školní rok (33 týdnů)** | **Celkem** | **66 h** | **100% soulad s ŠVP InspIS** | |

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj OSS 1)

- [x] **Kurikulární harmonizace a synchronizace časové dotace na 66 h:**
  - Datový registr `ops1Plan.ts` narovnán ze 72 h (35 týdnů) na přesných 66 h (33 týdnů) v plné shodě s webovou stránkou tematického plánu a ŠVP InspIS.
  - Vyčištěny archaismy a neadekvátní mikrodetaily v osnovách budoucích kapitol (`oss1Outlines.ts`):
    - Režim jádra / Kernel mode namísto Ring 0 vs. Ring 3.
    - Údržbové spouštění na pozadí namísto zdůrazňování účtu SYSTEM v 1. ročníku.
    - Přehledné dávkové skripty s větvením a cykly namísto `goto` a `%ERRORLEVEL%`.
    - Webová konfigurace SOHO routeru namísto hardwarového továrního resetu tlačítkem.
- [ ] **Příprava interaktivních modulů pro 2. pololetí:**
  - CMD emulátor a trenažér navigace v souborovém systému.
  - Trenažér nastavení NTFS oprávnění a matice efektivních práv.
  - Simulátor webového rozhraní domácího Wi-Fi routeru (DHCP, WPA2/WPA3, Guest zóna).
- [ ] **Dekompozice velkých komponent (dle pravidla 13):**
  - `OsArchitectureChapter.tsx` (1 454 řádků) ➔ modularizace do podsložky `architektura/`.
  - `WindowsInstallGame.tsx` (1 352 řádků) ➔ modularizace do podsložky `instalace/`.
