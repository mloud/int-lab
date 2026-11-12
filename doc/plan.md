# Aktivní plánovací tabule: Operační systémy 2 (OSS 2)

**Aktivní předmět:** Operační systémy 2 (2. ročník SŠ, obor 18-20-M/01 Informační technologie)  
**Celková hodinová dotace:** 66 hodin (2 hodiny týdně, 33 týdnů)  
**Oficiální profil kurikula:** [`doc/curriculum/OSS2.md`](curriculum/OSS2.md)  
**Dedikovaný podrobný plán:** [`doc/plans/PLAN_OSS2.md`](plans/PLAN_OSS2.md)  
**Výchozí routa v IntLab:** `/specializovana/operacni-systemy-2`

---

## 🎯 Hlavní pedagogický cíl předmětu
Posunout žáka do role **pokročilého administrátora klientských systémů (Windows 11 Pro) a bezpečnostního technika**. Těžiště leží v **zabezpečení koncových stanic (endpoint security)**, forenzní analýze procesů, registru a logů, automatizaci přes PowerShell, síťovém sdílení SMB/RDP a integraci stanice do podnikové domény s aplikací centrálních politik GPO.

> **Koncepční pravidlo:** Předmět NEOBSAHUJE instalaci Windows Serveru, doménového řadiče DC ani IIS/SQL serveru (záměrně vyřazeno). Veškerá výuka probíhá na klientských Windows 11 Pro v podnikové síti.

---

## 📊 Přehled tematických celků (66 h)

| Blok | Měsíce & Týdny | Tematický celek | Dotace | Stav na portálu | Odkaz na webu |
|:---:|:---:|---|:---:|:---:|---|
| **1** | **Září – Říjen** (1.–5. týden) | **Správa podnikových dat a zálohování** | 10 h | ✅ 100% Hotovo (Wargame, 3-2-1, robocopy, cloud, Cobian Reflector, test) | `/zalohovani/*` (B1–B5) |
| **2** | **Říjen – Leden** (6.–15. týden) | **Bezpečnost koncových zařízení, audit a forenzní analýza** | 20 h | 🟡 BZ1–BZ2 plné moduly, BZ3 registr, BZ4–BZ10 osnovy | `/bezpecnost/*` (BZ1–BZ10) |
| **3** | **Únor – Duben** (16.–24. týden) | **Systémové služby a administrační skriptování v PowerShellu** | 18 h | ✅ Osnovy kapitol (služby, MMC, cmdlety, .ps1 skripty, reporty) | `/pokrocila-konfigurace/*` (PK1–PK5) |
| **4** | **Duben – Červen** (25.–33. týden) | **Síťové sdílení prostředků, vzdálená správa a doména** | 18 h | ✅ Osnovy kapitol (SMB, RDP, doména, klient, GPO, projekt) | `/active-directory/*` (AD1–AD6) |

---

## 🛡️ Zaměření na Blok 2: Bezpečnost koncových zařízení (20 h)

- **BZ1 Úvod do malwaru a principy nákazy** (`/bezpecnost/malware`, 2 h) – ✅ Hotovo (interaktivní simulátory viru, červa, trojana, ransomwaru, spywaru a SHA-256 hashů).
- **BZ2 Forenzní analýza procesů a certifikáty Authenticode** (`/bezpecnost/procesy-a-certifikaty`, 2 h) – ✅ Hotovo (Process Explorer, strom procesů, Authenticode PE, protokol ve `WorksheetLayout`).
- **BZ3 Persistence škodlivého kódu a systémový registr** (`/bezpecnost/registr`, 2 h) – 🟡 Rozpracováno / Priorita 1 (interaktivní strom registru, klíče `Run`/`RunOnce`, Startup).
- **BZ4 Systémový žurnál událostí a bezpečnostní audit** (`/bezpecnost/udalosti`, 2 h) – 🟡 Priorita 2 (Event Viewer, filtrace Event ID 4624/4625 pro odhalení útoku).
- **BZ5 Izolované prostředí (Sandbox) a antivirus** (`/bezpecnost/izolace`, 2 h) – Signatury, heuristika, chování v RAM, test EICAR.
- **BZ6 Paketový firewall na koncovém zařízení** (`/bezpecnost/firewall`, 2 h) – Příchozí/odchozí pravidla, sledování spojení netstat.
- **BZ7 Diskové šifrování a TPM čip** (`/bezpecnost/sifrovani`, 2 h) – BitLocker, ochrana klíčů čipem TPM 2.0, obnovovací klíče.
- **BZ8 Správa aktualizací a zranitelnosti (0-day)** (`/bezpecnost/ucty`, 2 h) – Záplaty, servisní cykly, balíčkovač winget.
- **BZ9 Sociální inženýrství, phishing a ochrana identity** (`/bezpecnost/sit-hesla`, 2 h) – Hlavičky podvodných e-mailů, MFA, správci hesel.
- **BZ10 Vyšetřování bezpečnostního incidentu (Mini-CTF)** (`/bezpecnost/ctf`, 2 h) – Detekce hrozby, izolace stanice, odstranění perzistence, zpráva o incidentu.
