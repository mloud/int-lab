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
| **Celková roční dotace** | 66 vyučovacích hodin (33 týdnů výuky) |
| **Forma výuky** | Praktická administrace a laboratorní cvičení (cca 30 % výklad, 70 % cvičení ve VirtualBoxu a na portálu IntLab) |
| **Výchozí routa v IntLab** | `/specializovana/operacni-systemy-2` |

---

## 2. Vazba na Rámcový vzdělávací program (RVP 18-20-M/01)

### 2.1 Odborné kompetence a očekávané výstupy RVP
Žák na konci 2. ročníku:
1. **Navrhuje a realizuje strategii zálohování** podnikových dat podle oborového pravidla 3-2-1, porovnává plnou, přírůstkovou a rozdílovou zálohu, chápe význam archivního atributu a stínových kopií svazku a konfiguruje automatizované šifrované zálohování na síťová úložiště.
2. **Analyzuje bezpečnostní hrozby a škodlivý kód** (viry, červi, trojské koně, ransomware, spyware), chápe vykonávání instrukcí procesorem a princip uživatelských tokenů oprávnění.
3. **Provádí forenzní audit běžících procesů a systémových komponent** pomocí inspekčních nástrojů, ověřuje digitální certifikáty Authenticode, kontrolní součty a analyzuje mechanismy automatického spouštění aplikací v systémovém registru.
4. **Konfiguruje a audituje bezpečnostní mechanismy klientského operačního systému**: filtruje a interpretuje žurnály událostí v Prohlížeči událostí, konfiguruje pravidla paketového firewallu a monitoruje aktivní síťová spojení stanice.
5. **Aplikuje diskové šifrování s hardwarovou ochranou klíčů** (TPM čip), bezpečně spravuje záchranné obnovovací klíče a analyzuje techniky sociálního inženýrství a phishingu s nasazením MFA.
6. **Řeší bezpečnostní incidenty na koncovém zařízení (Incident Response)**: identifikuje neoprávněnou aktivitu, izoluje systém, provede forenzní vyčištění perzistentní hrozby a zpracuje incident report.
7. **Spravuje systémové služby a automatizuje administraci v PowerShellu**: diagnostikuje stavy služeb na pozadí, ovládá objektový model a roury cmdletů, vytváří administrační skripty (.ps1) s ošetřením politiky spouštění a generuje stavové reporty.
8. **Konfiguruje síťové sdílení prostředků a vzdálenou správu**: nastavuje efektivní kombinovaná oprávnění sdílení (SMB) a souborového systému (NTFS), mapuje síťové jednotky a zabezpečuje vzdálený přístup k ploše (RDP).
9. **Integrovat klientskou stanici do podnikové domény**: rozlišuje pracovní skupinu a doménové prostředí, připojuje klientskou stanici k doméně, vysvětluje roli DNS a doménového řadiče a uplatňuje centrální bezpečnostní a konfigurační politiky (GPO).
10. **Realizuje integrující projekt administrace a zabezpečení klientské stanice**: samostatně zprovozní a zabezpečí stanici v síťovém prostředí a své technické řešení obhájí.

---

## 3. Školní vzdělávací program (ŠVP)

### 3.1 Cíle předmětu
Předmět posouvá studenta z role lokálního správce (OSS 1) do role **pokročilého administrátora klientských systémů (Windows 11 Pro) a bezpečnostního technika**. Těžiště výuky leží v zabezpečení koncových zařízení (endpoint security), forenzní analýze procesů, registru a logů, automatizaci přes objektový shell (PowerShell), síťovém sdílení a integraci klientské stanice do podnikové domény.

### 3.2 Profil absolventa předmětu
Absolvent OSS 2 dokáže samostatně:
- Zabezpečit klientskou stanici proti moderním vektorům malwaru a ransomwaru.
- Provést forenzní audit běžících procesů, perzistentních klíčů v registru a systémových logů.
- Nakonfigurovat automatické šifrované zálohování stanic na síťové úložiště podle pravidla 3-2-1.
- Automatizovat rutinní správu systému pomocí skriptů v PowerShellu a generovat stavové reporty.
- Nastavit sdílení dat v lokální síti s bezpečnou kombinací sdílených a souborových práv.
- Připojit stanici do podnikové domény a aplikovat centrální restrikce a nastavení prostřednictvím skupinových politik (GPO).

---

## 4. Tematický plán předmětu (Rozpis 66 hodin)

| Blok | Tematický celek | Dotace (Teorie / Cvičení) | Konkrétní učivo a laboratorní práce | Vazba na IntLab |
|:---:|---|:---:|---|---|
| **1** | **Správa podnikových dat a zálohování** | 10 h (2 h / 8 h) | Strategie zálohování (pravidlo 3-2-1, typy záloh – plná, přírůstková, rozdílová, archivní atribut, stínové kopie svazku VSS), skriptovaná synchronizace v CLI (`robocopy`), cloudová úložiště vs. neměnná záloha, automatizované zálohování specializovaným softwarem běžícím jako služba, ochrana záložních archivů šifrováním a heslem, obnova dat a tvorba plánu. | `/zalohovani/*` |
| **2** | **Bezpečnost koncových zařízení, audit a forenzní analýza** | 20 h (6 h / 14 h) | Typologie malwaru a principy nákazy, forenzní audit běžících procesů a ověřování Authenticode certifikátů, systémový registr a mechanismy persistence po startu, Prohlížeč událostí a auditní záznamy přihlášení, testování v izolovaném sandboxu a systémový antivirus, paketový firewall koncového zařízení a sledování spojení, diskové šifrování s TPM čipem, správa aktualizací a 0-day zranitelnosti, phishing a ochrana identity (MFA), vyšetřování incidentu (Incident Response). | `/bezpecnost/*` |
| **3** | **Systémové služby a administrační skriptování (PowerShell)** | 18 h (4 h / 14 h) | Systémové služby na pozadí (koncepce, účet SYSTEM, typy spouštění, závislosti a automatický restart), objektový shell PowerShell (syntaxe cmdletů Sloveso-PodstatnéJméno, nápověda, objektová roura `\|`, filtrování `Where-Object` a výběr `Select-Object`), administrační skriptování (.ps1 skripty, proměnné, cykly, politika ExecutionPolicy), automatizace správy registru a komponent skriptem, automatizace sběru diagnostických dat a generování stavových reportů v CSV/HTML. | `/pokrocila-konfigurace/*` |
| **4** | **Síťové sdílení prostředků, vzdálená správa a centrální správa v doméně** | 18 h (4 h / 14 h) | Síťové sdílení složek v LAN (protokol SMB, UNC cesty, kombinovaná práva sdílení a NTFS, mapování síťových jednotek), vzdálená správa pracovní plochy (protokol RDP, autorizace a zabezpečení NLA), koncept podnikové infrastruktury (pracovní skupina vs. doménové prostředí, role DNS a doménového řadiče), klientská stanice v doméně (připojení klienta, doménový uživatelský profil), skupinové politiky (GPO na stanici – zákaz USB, bezpečnost hesel, jednotná konfigurace), závěrečný integrující projekt administrace a zabezpečení stanice a obhajoba. | `/active-directory/*` |
| **Σ** | **Celkem** | **66 h (16 h T / 50 h C)** | **Pravidelná 2hodinová týdenní dotace (33 týdnů × 2 h)** | |


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
