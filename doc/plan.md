# 📋 Aktivní plán výuky a rozvoje IntLab

Tento dokument slouží jako **hlavní dynamická plánovací tabule**. Vždy zobrazuje **právě aktivní předmět**, na kterém pracujeme, a poskytuje okamžitý přehled jeho úkolů, stavu kapitol a návazností.

> **Pravidlo pro asistenta (AI):**  
> 1. Každý předmět má svůj trvalý dedikovaný plán ve složce [`doc/plans/`](./plans/).
> 2. Kdykoliv přecházíme na práci na jiném předmětu, **asistent automaticky přepne tento soubor (`doc/plan.md`) na daný předmět** a udržuje synchronizovaný příslušný plán v `doc/plans/`.
> 3. Vždy před zahájením a po dokončení práce zkontroluj a aktualizuj stav v `doc/history.md` i v tomto plánu.

---

## 🗂️ Rychlý rozcestník všech předmětů

| Kód předmětu | Název předmětu | Ročník | Dotace | Trvalý plán |
|:---:|---|:---:|:---:|:---:|
| **OSS 1** | Operační systémy 1 | 1. ročník | 66 h (2 h/týden) | [`doc/plans/PLAN_OSS1.md`](./plans/PLAN_OSS1.md) |
| **OSS 2** | Operační systémy 2 | 2. ročník | 66 h (2 h/týden) | [`doc/plans/PLAN_OSS2.md`](./plans/PLAN_OSS2.md) *(Aktivní)* |
| **OSS 3** | Operační systémy 3 & Linux | 3. ročník | 66 h (2 h/týden) | [`doc/plans/PLAN_OSS3.md`](./plans/PLAN_OSS3.md) |
| **PRG 1** | Programování a vývoj her 1 | 1. ročník | 66 h (2 h/týden) | [`doc/plans/PLAN_PRG1.md`](./plans/PLAN_PRG1.md) |
| **PRG 2** | Programování a vývoj her 2 | 2. ročník | 66 h (2 h/týden) | [`doc/plans/PLAN_PRG2.md`](./plans/PLAN_PRG2.md) |
| **ROB** | Robotika a IoT (ROB 3 & ROB 4) | 3. a 4. roč. | 66 h / ročník | [`doc/plans/PLAN_ROB.md`](./plans/PLAN_ROB.md) |
| **TECH** | Technický dluh & Dekompozice | Vše | – | [`doc/plans/PLAN_REFACTORING.md`](./plans/PLAN_REFACTORING.md) |

---

# 🎯 AKTUÁLNĚ AKTIVNÍ PŘEDMĚT: Operační systémy 2 (OSS 2)

**Cílový ročník:** 2. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 66 vyučovacích hodin (2 hodiny týdně, 33 týdnů)  
**Výchozí routa v IntLab:** `/specializovana/operacni-systemy-2`  
**Odpovídající profil kurikula:** [`doc/curriculum/OSS2.md`](./curriculum/OSS2.md)  
**Kompletní archiv plánu předmětu:** [`doc/plans/PLAN_OSS2.md`](./plans/PLAN_OSS2.md)

---

## 🎯 Pedagogický cíl
Posunout žáka do role **pokročilého administrátora klientských systémů (Windows 11 Pro) a bezpečnostního technika**. Těžiště výuky leží v zabezpečení koncových zařízení (endpoint security), forenzní analýze procesů, registru a žurnálů událostí, automatizaci přes objektový shell (PowerShell), síťovém sdílení SMB/RDP a integraci klientské stanice do podnikové domény včetně uplatňování centrálních bezpečnostních politik (GPO).

> **Koncepční mantinel:**  
> Předmět **NEOBSAHUJE** instalaci Windows Serveru, doménového řadiče DC, IIS webového serveru ani MS SQL Serveru (tyto role byly záměrně vyřazeny). Veškerá výuka probíhá na klientských Windows 11 Pro a zaměřuje se na správu koncových stanic v podnikovém prostředí.

---

## 📊 Přehled 4 bloků OSS 2 (100% soulad webu a ŠVP InspIS)

| Blok | Měsíce & Týdny | Tematický celek | Dotace | Stav na portálu | Odkaz na webu |
|:---:|:---:|---|:---:|:---:|---|
| **1** | **Září – Říjen** (1.–5. týden) | **Správa podnikových dat a zálohování** | 10 h | ✅ Hotovo (Wargame, pravidlo 3-2-1, robocopy, cloud, Cobian) | `/zalohovani/*` (B1–B5) |
| **2** | **Říjen – Leden** (6.–15. týden) | **Bezpečnost koncových zařízení, audit a forenzní analýza** | 20 h | ✅ 10 podtémat (BZ1 a BZ2 plné moduly, BZ3–BZ10 osnovy) | `/bezpecnost/*` (BZ1–BZ10) |
| **3** | **Únor – Duben** (16.–24. týden) | **Systémové služby a administrační skriptování v PowerShellu** | 18 h | ✅ 5 kapitol s osnovami (služby, MMC, cmdlety, skripty .ps1, reporty) | `/pokrocila-konfigurace/*` (PK1–PK5) |
| **4** | **Duben – Červen** (25.–33. týden) | **Síťové sdílení prostředků, vzdálená správa a doména** | 18 h | ✅ 6 kapitol s osnovami (SMB, RDP, doména, klient, GPO, projekt) | `/active-directory/*` (AD1–AD6) |
| **Σ** | **Celý školní rok (33 týdnů)** | **Celkem** | **66 h** | **100% zrcadlové pokrytí** | |

---

## 🔍 Detailní stav témat OSS 2

### Blok 1: Správa podnikových dat a zálohování (10 h)
* [x] **B1 Úvod do zálohování a pravidlo 3-2-1** (`/zalohovani/uvod`, 2 h)
* [x] **B2 Manuální záloha a robocopy** (`/zalohovani/manualni`, 2 h)
* [x] **B3 Systémové nástroje ve Windows a stínové kopie VSS** (`/zalohovani/system`, 2 h)
* [x] **B4 Cloudová synchronizace vs. nezávislá neměnná záloha** (`/zalohovani/cloud`, 2 h)
* [x] **B5 Automatizované zálohování službou (Cobian Reflector)** (`/zalohovani/cobian`, 2 h)
* [x] **Hodnocená práce: Výpočet kapacity záloh** (`/zalohovani/test`, PINy: `ZAK2026` / `OS2026`)

### Blok 2: Bezpečnost koncových zařízení, audit a forenzní analýza (20 h)
* [x] **BZ1 Úvod do malwaru a principy nákazy** (`/bezpecnost/malware`, 2 h) – *Plně interaktivní modul (`malware/`)*
* [x] **BZ2 Forenzní analýza procesů a certifikáty Authenticode** (`/bezpecnost/procesy-a-certifikaty`, 2 h) – *Plně interaktivní modul (`procesy/`)*
* [x] **BZ3 Systémový registr a persistence škodlivého kódu** (`/bezpecnost/registr`, 2 h) – *Hierarchie HKLM/HKCU, autorun klíče Run/RunOnce, export/import .reg*
* [x] **BZ4 Systémový žurnál událostí a bezpečnostní audit** (`/bezpecnost/udalosti`, 2 h) – *Event Viewer, logy přihlášení Event ID 4624/4625, filtrace*
* [x] **BZ5 Izolované prostředí (Sandbox) a antivirus** (`/bezpecnost/izolace`, 2 h) – *Signatury, heuristika, chování v RAM, test EICAR*
* [x] **BZ6 Paketový firewall na koncovém zařízení** (`/bezpecnost/firewall`, 2 h) – *Příchozí/odchozí pravidla, sledování spojení netstat*
* [x] **BZ7 Diskové šifrování a TPM čip** (`/bezpecnost/sifrovani`, 2 h) – *BitLocker, ochrana klíčů čipem TPM 2.0, obnovovací klíče*
* [x] **BZ8 Správa aktualizací a zranitelnosti (0-day)** (`/bezpecnost/ucty`, 2 h) – *Záplaty, servisní cykly, balíčkovač winget*
* [x] **BZ9 Sociální inženýrství, phishing a ochrana identity** (`/bezpecnost/sit-hesla`, 2 h) – *Hlavičky podvodných e-mailů, MFA, správci hesel*
* [x] **BZ10 Vyšetřování bezpečnostního incidentu (Mini-CTF)** (`/bezpecnost/ctf`, 2 h) – *Detekce hrozby, izolace stanice, odstranění perzistence, zpráva o incidentu*

### Blok 3: Systémové služby a skriptování v PowerShellu (18 h)
* [x] **PK1 Systémové služby Windows na pozadí** (`/pokrocila-konfigurace/sluzby`, 4 h) – *Účet SYSTEM, typy spouštění, závislosti a obnova*
* [x] **PK2 Konzole správce (MMC) a centrální diagnostika** (`/pokrocila-konfigurace/mmc`, 4 h) – *Vlastní snap-iny, řešení pádů a zamrznutí*
* [x] **PK3 PowerShell: Objektový shell, syntaxe cmdletů a roury** (`/pokrocila-konfigurace/powershell`, 4 h) – *Sloveso-PodstatnéJméno, roura `\|`, Where-Object, Select-Object*
* [x] **PK4 Administrační skriptování v PowerShellu (.ps1)** (`/pokrocila-konfigurace/powershell-sprava`, 4 h) – *Proměnné, cykly foreach, politika ExecutionPolicy, skripty*
* [x] **PK5 Automatizovaný sběr dat a generování reportů** (`/pokrocila-konfigurace/reporty`, 2 h) – *Diagnostika hardware/software a export do formátů CSV a HTML*

### Blok 4: Síťové sdílení prostředků, vzdálená správa a doména (18 h)
* [x] **AD1 Síťové sdílení složek a efektivní práva (SMB)** (`/active-directory/smb`, 4 h) – *UNC cesty, kombinovaná práva sdílení a NTFS, mapování jednotky*
* [x] **AD2 Zabezpečená vzdálená správa plochy (RDP)** (`/active-directory/vzdalena-sprava`, 2 h) – *mstsc.exe, port 3389, autorizace Remote Desktop Users, NLA*
* [x] **AD3 Koncept podnikové infrastruktury a domény** (`/active-directory/server-a-domena`, 2 h) – *Pracovní skupina vs. doména, role DC a DNS, Kerberos*
* [x] **AD4 Klientská stanice v podnikové doméně a profily** (`/active-directory/klient-v-domene`, 4 h) – *Konfigurace DNS, připojení stanice k doméně, profil DOMENA\\uzivatel*
* [x] **AD5 Skupinové politiky (GPO – uplatnění na stanici)** (`/active-directory/gpo`, 4 h) – *Centrální distribuce nastavení, zákaz USB, gpupdate /force, gpresult /r*
* [x] **AD6 Závěrečný integrující projekt administrace stanice** (`/active-directory/zaloha-a-projekt`, 2 h) – *Komplexní konfigurace stanice a obhajoba*

---

## 🔥 Bezprostřední další kroky pro OSS 2
- [ ] Vytvoření interaktivního trenažéru pro **BZ3 Systémový registr** (vizualizace persistence a klíčů `Run`).
- [ ] Vytvoření interaktivního trenažéru pro **BZ4 Žurnál událostí** (filtr Event ID 4624/4625).
- [ ] Vytvoření cvičného prostředí pro PowerShell roury v **PK3**.
