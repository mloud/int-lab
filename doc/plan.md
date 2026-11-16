# Aktivní plánovací tabule: Operační systémy 2 (OSS 2)

**Aktivní předmět:** Operační systémy 2 (2. ročník SŠ, obor 18-20-M/01 Informační technologie)  
**Celková hodinová dotace:** 66 vyučovacích hodin (2 hodiny týdně, 33 týdnů)  
**Oficiální profil kurikula (ŠVP InspIS):** [`doc/curriculum/SVP_INSPIS.md`](curriculum/SVP_INSPIS.md), [`doc/curriculum/OSS2.md`](curriculum/OSS2.md)  
**Dedikovaný podrobný plán:** [`doc/plans/PLAN_OSS2.md`](plans/PLAN_OSS2.md)  
**Výchozí routa v IntLab:** `/specializovana/operacni-systemy-2`

---

## 🎯 Hlavní pedagogický cíl předmětu
Posunout žáka do role **pokročilého administrátora klientských systémů (Windows 11 Pro) a bezpečnostního technika**. Těžiště výuky leží v zabezpečení koncových zařízení (endpoint security), bezpečnostní inspekci procesů, registru a žurnálů událostí, automatizaci přes objektový shell (PowerShell), síťovém sdílení SMB, vzdálené správě RDP a OpenSSH a integraci klientské stanice do podnikové domény včetně uplatňování centrálních bezpečnostních politik (GPO).

---

## 📊 Přehled tematických celků (66 h) – Synchronizováno s ŠVP InspIS

| Blok | Měsíce & Týdny | Tematický celek | Dotace | Stav v kurikulu | Odkaz na webu |
|:---:|:---:|---|:---:|:---:|---|
| **1** | **Září – Říjen** (1.–5. týden) | **Správa podnikových dat a zálohování** | 10 h | ✅ Hotovo (Wargame, pravidlo 3-2-1, robocopy, cloud, Cobian) | `/specializovana/operacni-systemy-2/zalohovani` (B1–B5) |
| **2** | **Říjen – Leden** (6.–15. týden) | **Bezpečnost koncových zařízení, inspekce a audit** | 20 h | ✅ 10 podtémat (BZ1–BZ3 plné moduly, BZ4–BZ10 osnovy vyčištěny od žargonu) | `/specializovana/operacni-systemy-2/bezpecnost` (BZ1–BZ10) |
| **3** | **Únor – Březen** (16.–23. týden) | **Systémové služby a skriptování v PowerShellu** | 16 h | ✅ 5 kapitol s osnovami (služby, MMC 2h, cmdlety, skripty .ps1, reporty) | `/specializovana/operacni-systemy-2/pokrocila-konfigurace` (PK1–PK5) |
| **4** | **Duben – Červen** (24.–33. týden) | **Síťové sdílení prostředků, vzdálená správa a doména** | 20 h | ✅ 7 kapitol s osnovami (SMB, RDP, OpenSSH ve Windows 11, doména, klient, GPO, projekt) | `/specializovana/operacni-systemy-2/active-directory` (AD1–AD7) |
| **Σ** | **Celý školní rok (33 týdnů)** | **Celkem** | **66 h** | **100% soulad a harmonizace ŠVP** | |

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj OSS 2)

- [x] **Kurikulární harmonizace ŠVP OSS 2 a zařazení OpenSSH ve Windows 11 (Varianta B):**
  - Odstraněn korporátní a akademický žargon (forenzní audit, 0-day, Mini-CTF, Incident Response Report, sc.exe, specifika Kerberos).
  - Dotace MMC snížena ze 4 h na 2 h (PK2); uvolněné 2 hodiny alokovány do Bloku 4 pro novou podkapitolu **AD3: Konzolová vzdálená správa přes OpenSSH ve Windows 11**.
  - Synchronizovány soubory `doc/curriculum/OSS2.md`, `doc/curriculum/SVP_INSPIS.md`, `registry/curriculum/svp/svpOssData.ts`, `registry/curriculum/thematic-plans/ops2Plan.ts`, `registry/curriculum/outlines/oss2Outlines.ts` a `app/specializovana/operacni-systemy-2/tematicky-plan/page.tsx`.
  - Vytvořena webová routa `/specializovana/operacni-systemy-2/active-directory/ssh-windows`.
- [ ] **Postupné povyšování outline kapitol na plné interaktivní trenažéry:**
  - Priorita 1: **BZ4 Žurnál událostí** (simulátor Prohlížeče událostí s filtrací Event ID 4624/4625 pro odhalení neoprávněného přihlášení).
  - Priorita 2: **PK3 & PK4 PowerShell trenažér** (cvičné roury `|`, cmdlety `Where-Object` a `Select-Object`, generátor HTML reportů).
  - Priorita 3: **AD3 OpenSSH ve Windows 11** (simulátor instalace volitelné funkce OpenSSH Server, spuštění služby sshd a připojení z Windows Terminalu).
  - Priorita 4: **AD6 Group Policy trenažér** (interaktivní přepínač restrikcí USB a vyhodnocení výsledku `gpresult`).
