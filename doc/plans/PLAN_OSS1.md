# Pracovní plán: Operační systémy 1 (OSS 1)

**Cílový ročník:** 1. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 66 vyučovacích hodin (2 hodiny týdně, 33 týdnů)  
**Výchozí routa v IntLab:** `/specializovana/operacni-systemy-1`  
**Odpovídající profil kurikula:** [`doc/curriculum/OSS1.md`](../curriculum/OSS1.md)

---

## 🎯 Hlavní pedagogický cíl
Převést žáka z role běžného uživatele PC do role **poučeného lokálního správce klientské stanice**. Žák proniká pod povrch grafického rozhraní, chápe spolupráci CPU a RAM, architekturu hardware, instaluje klientský OS, spravuje disky a oddíly, diagnostikuje procesy, automatizuje správu přes CLI/BAT a bezpečně konfiguruje lokální sítě.

---

## 📊 Stav realizace na portálu IntLab

| Blok | Tematický celek | Dotace | Stav na portálu | Odkaz na webu |
|:---:|---|:---:|:---:|---|
| **1** | Architektura počítače a základy OS | 8 h | ✅ Hotovo (teorie, kvízy, simulátor CPU) | `/hardware/*`, `/architektura` |
| **2** | Souborové systémy, disky a start systému | 10 h | ✅ Hotovo (simulátor instalace, FAT trenažér, boot) | `/instalace`, `/souborove-systemy/*` |
| **3** | Procesy a správa operační paměti | 6 h | ✅ Hotovo (multitasking, stavy, virtuální paměť) | `/procesy/*` (PR1–PR5) |
| **4** | Grafické uživatelské rozhraní (GUI) | 4 h | ✅ Rozcestník & osnovy vytvořeny | `/gui/*` (GUI1–GUI5) |
| **5** | Příkazový řádek (CLI) a dávkové soubory | 6 h | ✅ Rozcestník & osnovy vytvořeny | `/prikazova-radka/*` (CLI1–CLI3, BAT1–BAT2) |
| **6** | Správa uživatelů a přístupových práv | 8 h | ✅ Rozcestník & osnovy vytvořeny | `/uzivatele/*` (USR1–USR4) |
| **7** | Správa aplikačního software a balíčkovače | 4 h | ✅ Rozcestník & osnovy vytvořeny | `/software/*` (SW1–SW2) |
| **8** | Správa hardware, ovladače a plánovač | 4 h | ✅ Rozcestník & osnovy vytvořeny | `/zarizeni`, `/planovac` |
| **9** | Síťová konfigurace a lokální sítě (LAN) | 8 h | ✅ Rozcestník & osnovy vytvořeny | `/site/*` (NET1–NET4) |
| **10** | Závěrečný integrující projekt stanice | 8 h | ✅ Rozcestník & osnovy vytvořeny | `/projekt/*` (PRJ1–PRJ4) |
| **Σ** | **Celkem** | **66 h** | **100% soulad s ŠVP InspIS** | |

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj)

- [ ] **Příkazový řádek (CLI) a BAT skriptování:**
  - Vytvořit interaktivní emulátor konzole CMD v prohlížeči pro bezpečný nácvik příkazů (`cd`, `dir`, `mkdir`, `tree`).
  - Vytvořit krokovač dávkového souboru `.bat` s vizualizací proměnných a podmínek `if`.
- [ ] **Správa uživatelů a NTFS práv:**
  - Doplnit interaktivní matici efektivních práv (vlastník, zděděná práva vs. explicitní Deny).
  - Připravit badatelský pracovní list s exportem do Wordu pro laboratorní cvičení.
- [ ] **Síťová konfigurace a Wi-Fi router:**
  - Vytvořit interaktivní simulátor webové administrace SOHO routeru (nastavení DHCP rozsahu, WPA2/WPA3 a Guest Wi-Fi).
- [ ] **Dekompozice velkých komponent (dle pravidla 13):**
  - `OsArchitectureChapter.tsx` (1 454 řádků) ➔ modularizace do podsložky `architektura/`.
  - `WindowsInstallGame.tsx` (1 352 řádků) ➔ modularizace do podsložky `instalace/`.
