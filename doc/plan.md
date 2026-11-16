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

| Blok | Tematický celek | Dotace | Stav v kurikulu | Odkaz na webu |
|:---:|---|:---:|:---:|---|
| **1** | Architektura počítače a základy OS | 8 h | ✅ Vyčištěno od mikro-detailů (Ring 0/3 ➔ privilegovaný/neprivilegovaný režim, moderní licence) | `/specializovana/operacni-systemy-1/architektura` |
| **2** | Souborové systémy, disky a start systému | 10 h | ✅ Harmonizováno (bezpečné mazání HDD vs. SSD, moderní tabulky oddílů UEFI) | `/specializovana/operacni-systemy-1/souborove-systemy` |
| **3** | Procesy a správa operační paměti | 6 h | ✅ Didakticky vyváženo (zobecnění PCB/vláken na význam pro vícejádrová CPU) | `/specializovana/operacni-systemy-1/procesy` |
| **4** | Grafické uživatelské rozhraní (GUI) | 4 h | ✅ Hotovo | `/specializovana/operacni-systemy-1/gui` |
| **5** | Příkazový řádek (CLI) a dávkové soubory | 6 h | ✅ Hotovo | `/specializovana/operacni-systemy-1/prikazova-radka` |
| **6** | Správa uživatelů a přístupových práv | 8 h | ✅ Vyváženo pro 1. ročník (základy autentizace a PoLP) | `/specializovana/operacni-systemy-1/uzivatele` |
| **7** | Správa aplikačního software a balíčkovače | 4 h | ✅ Zjednodušeno (vyřazen manifest export/import ➔ správa z CLI) | `/specializovana/operacni-systemy-1/software` |
| **8** | Správa hardware, ovladače a plánovač | 4 h | ✅ Zjednodušeno (vyřazen servisní účet ➔ naplánované akce) | `/specializovana/operacni-systemy-1/zarizeni` |
| **9** | Síťová konfigurace a lokální sítě (LAN) | 8 h | ✅ Harmonizováno (vyřazen tovární reset routeru ➔ Wi-Fi a Guest síť) | `/specializovana/operacni-systemy-1/site` |
| **10** | Závěrečný integrující projekt stanice | 8 h | ✅ Hotovo | `/specializovana/operacni-systemy-1` |
| **Σ** | **Celkem** | **66 h** | **100% soulad a harmonizace ŠVP** | |

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj OSS 1)

- [x] **Kurikulární harmonizace a zjednodušení ŠVP OSS 1:**
  - Odstraněny příliš akademické a mikro-specifické požadavky (Ring 0/Ring 3, přepis nulami u SSD, vysokoškolský PCB a sdílení adresního prostoru vláken, archaické cykly v BAT, exporty manifestů balíčkovače, spouštění úloh pod SYSTEM, fyzický reset routeru).
  - Synchronizovány soubory `doc/curriculum/OSS1.md`, `doc/curriculum/SVP_INSPIS.md`, `registry/curriculum/svp/svpOssData.ts` a `registry/curriculum/thematic-plans/ops1Plan.ts`.
- [ ] **Příkazový řádek (CLI) a BAT skriptování:**
  - Vytvořit interaktivní emulátor konzole CMD v prohlížeči pro bezpečný nácvik příkazů (`cd`, `dir`, `mkdir`, `tree`).
  - Vytvořit krokovač dávkového souboru `.bat` s vizualizací proměnných a podmínek `if`.
- [ ] **Správa uživatelů a NTFS práv:**
  - Doplnit interaktivní matici efektivních práv (vlastník, zděděná práva vs. explicitní Deny).
- [ ] **Síťová konfigurace a Wi-Fi router:**
  - Vytvořit interaktivní simulátor webové administrace SOHO routeru (nastavení DHCP rozsahu, WPA2/WPA3 a Guest Wi-Fi).
