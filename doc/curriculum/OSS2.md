# Kurikulární profil předmětu: Operační systémy 2 (OSS 2)

---

## 1. Identifikace předmětu a časová dotace

| Parametr | Hodnota |
|---|---|
| **Název předmětu** | Operační systémy 2 |
| **Zkratka / Kód** | OSS 2 (`ops2`) |
| **Cílový ročník** | 2. Ročník SŠ (Střední odborná škola) |
| **Obor vzdělání** | 18-20-M/01 Informační technologie |
| **Týdenní hodinová dotace** | 2 hodiny týdně |
| **Celková roční dotace** | 68 vyučovacích hodin (34 týdnů výuky) |
| **Forma výuky** | Praktická administrace a laboratorní cvičení (cca 30 % výklad, 70 % cvičení ve VirtualBoxu a na portálu IntLab) |
| **Výchozí routa v IntLab** | `/specializovana/operacni-systemy-2` |

---

## 2. Vazba na Rámcový vzdělávací program (RVP 18-20-M/01)

### 2.1 Odborné kompetence a očekávané výstupy RVP
Žák na konci 2. ročníku:
1. **Navrhuje a realizuje strategii zálohování** podnikových dat podle pravidla 3-2-1, rozlišuje plnou, inkrementální a diferenciální zálohu, chápe význam archivního bitu a stínových kopií (VSS).
2. **Analyzuje bezpečnostní hrozby a škodlivý kód** (viry, červy, trojské koně, ransomware, spyware), chápe slepé vykonávání instrukcí procesorem a princip bezpečnostních tokenů.
3. **Provádí forenzní audit běžících procesů** pomocí nástrojů Sysinternals (Process Explorer), ověřuje digitální podpisy Authenticode a kontrolní součty SHA-256.
4. **Konfiguruje aktivní bezpečnostní mechanismy Windows 11**: Defender (GUI a CLI), Windows Firewall (filtrace portů a aplikací, sledování spojení `netstat`), diskové šifrování BitLocker s hardwarovým TPM 2.0 čipem.
5. **Aplikuje zásady obhajoby proti sociálnímu inženýrství** a analyzuje phishingové útoky, dešifruje data v CyberChefu a řeší bezpečnostní incidenty (Incident Response).
6. **Ovládá pokročilou správu Windows** pomocí objektového prostředí PowerShell (cmdlety, roury objektů), spravuje systémový registr (`regedit`) a auditní záznamy událostí (Event Viewer).
7. **Instaluje a spravuje doménové prostředí Active Directory (AD DS)**: struktura stromu a lesa, organizační jednotky (OU), doménoví uživatelé a skupiny, strategie AGDLP, doménové skupinové politiky (GPO).
8. **Zprovozňuje a zabezpečuje síťové serverové služby**: sdílení souborů SMB, vzdálenou správu (RDP a SSH), webový server IIS a tiskový server.

---

## 3. Školní vzdělávací program (ŠVP)

### 3.1 Cíle předmětu
Předmět posouvá studenta z role lokálního správce (OSS 1) do role **podnikového administrátora a bezpečnostního technika**. Těžiště výuky leží v zabezpečení klientských stanic, automatizaci přes PowerShell a centrální správě v doméně Active Directory.

### 3.2 Profil absolventa předmětu
Absolvent OSS 2 dokáže samostatně:
- Zabezpečit stanice proti moderním vektorům malwaru a ransomwaru.
- Nakonfigurovat automatické šifrované zálohování stanic a serverů.
- Spravovat uživatele, počítače a skupinové politiky (GPO) v podnikové doméně Active Directory.
- Administrovat stanice na dálku a nasazovat serverové role.

---

## 4. Tematický plán předmětu (Rozpis 68 hodin)

| Blok | Tematický celek | Dotace (Teorie / Cvičení) | Konkrétní učivo a laboratorní práce | Vazba na IntLab |
|:---:|---|:---:|---|---|
| **1** | **Správa dat a zálohování** | 8 h (2 h / 6 h) | Pravidlo 3-2-1, typy záloh (plná, inkrementální, diferenciální), archivní bit (`attrib +/-a`), stínové kopie (VSS), cloudové zálohy vs. synchronizace. Automatizace v Cobian Reflector (instalace jako služba, šifrování AES-256, plánovač). | `/zalohovani/*` (B1–B5, protokol s exportem do Wordu) |
| **2** | **Bezpečnost 1: Ochrana Windows 11 (8 podkapitol)** | 22 h (6 h / 16 h) | **BZ1:** Úvod do malwaru, CPU princip, 6 hrozeb, simulátory (Kalkulačka, Červ, Trojan, Ransomware, Spyware, SHA-256 hash).<br>**BZ2:** Správa procesů, Sysinternals Process Explorer, digitální podpisy Authenticode, autorun.<br>**BZ3:** Windows Defender (GUI/CLI), EICAR test.<br>**BZ4:** Firewall & sítě, porty, `netstat`, odchozí/příchozí pravidla.<br>**BZ5:** BitLocker, TPM 2.0 čip, Controlled Folder Access proti ransomwaru.<br>**BZ6:** UAC v hloubce, Secure Desktop, pokročilá práva.<br>**BZ7:** Phishing, analýza hlaviček, hesla a CyberChef.<br>**BZ8:** Mini-CTF Incident Response (analýza kompromitovaného PC). | `/bezpecnost/*` (BZ1–BZ8) |
| **3** | **Rozšířená správa Windows** | 10 h (3 h / 7 h) | **PK1:** PowerShell základy (cmdlety `Get-Command`, `Get-Help`, objekty vs. text, roura `\|`).<br>**PK2:** PowerShell správa (práce se službami `Get-Service`, disky, skriptování `.ps1`).<br>**PK3:** Systémový registr (`regedit`, hives `HKLM`, `HKCU`, klíče a hodnoty, záloha `.reg`).<br>**PK4:** Audit a Event Viewer (protokoly událostí Security, System, Application, filtrace incidentů). | `/pokrocila-konfigurace/*` (PK1–PK4) |
| **4** | **Active Directory (Centrální správa)** | 14 h (4 h / 10 h) | **AD1:** Úvod do AD DS (doména, řadič DC, strom, les, DNS závislost).<br>**AD2:** Organizační jednotky (OU) a doménové účty.<br>**AD3:** Skupiny a role, strategie AGDLP (Account -> Global -> Domain Local -> Permission).<br>**AD4:** Skupinové politiky (GPO) – vynucování nastavení plochy, omezení USB, mapování disků.<br>**AD5:** Bezpečnost domény (autentizace Kerberos, uzamčení účtů, delegace správy). | `/active-directory/*` (AD1–AD5) |
| **5** | **Serverové služby (Infrastruktura)** | 10 h (3 h / 7 h) | **SL1:** Souborový server a sdílení SMB (sdílené složky, oprávnění sdílení vs. NTFS).<br>**SL2:** Vzdálená správa (RDP port 3389, OpenSSH server na Windows).<br>**SL3:** Webový server IIS (instalace role, webové kořeny, vazba portů).<br>**SL4:** Tiskový server (Print Server role, fronty, ovladače).<br>**SL-V:** Volitelné / rozšiřující služby (DHCP, databáze). | `/sluzby/*` (SL1–SL4, SL-V) |
| **–** | **Závěrečné hodnocení a laboratorní projekt** | 4 h (0 h / 4 h) | Komplexní obhajoba v labu: Konfigurace bezpečné stanice v doméně, GPO restrikce, zálohovací úloha a simulace odhalení malwaru. | — |
| **Σ** | **Celkem** | **68 h (18 h T / 50 h C)** | **Pravidelná 2hodinová týdenní dotace** | |

---

## 5. Mezipředmětové vazby

- **Vertikální vstup (z OSS 1):** Žáci plynule navazují na znalost instalace OS, diskových oddílů, procesů a lokálních účtů z 1. ročníku.
- **Vertikální výstup (do OSS 3):** Znalost bezpečnostních konceptů a incident response se ve 3. ročníku integruje do uceleného kurikula Kybernetické bezpečnosti a přechází na platformu Linux.
- **Horizontální vazba:** 
  - **Počítačové sítě (2. ročník):** IP adresace, masky, porty a DNS jsou klíčové pro porozumění Firewallu, Active Directory a službám SMB/RDP.
  - **Programování 2 (PRG 2):** Algoritmické myšlení z Pythonu pomáhá při psaní administračních skriptů v PowerShellu.

---

## 6. Mapování na portál IntLab

- Rozcestník předmětu: [`/specializovana/operacni-systemy-2`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/app/specializovana/operacni-systemy-2/page.tsx)
- Jednotné vizuální téma: Modro-azurový gradient (`from-blue-600 to-cyan-600`)
- Moduly a simulace:
  - BZ1: [`MalwareDetectionChapter.tsx`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/components/specializovana/operacni-systemy-2/bezpecnost/MalwareDetectionChapter.tsx)
  - BZ2: [`ProcessCertificatesChapter.tsx`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/components/specializovana/operacni-systemy-2/bezpecnost/ProcessCertificatesChapter.tsx)
  - B5: [`BackupCobianChapter.tsx`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/components/specializovana/operacni-systemy-2/zalohovani/BackupCobianChapter.tsx)
