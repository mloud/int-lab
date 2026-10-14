# Kurikulární profil předmětu: Operační systémy 1 (OSS 1)

---

## 1. Identifikace předmětu a časová dotace

| Parametr | Hodnota |
|---|---|
| **Název předmětu** | Operační systémy 1 |
| **Zkratka / Kód** | OSS 1 (`ops1`) |
| **Cílový ročník** | 1. Ročník SŠ (Střední odborná škola) |
| **Obor vzdělání** | 18-20-M/01 Informační technologie |
| **Týdenní hodinová dotace** | 2 hodiny týdně |
| **Celková roční dotace** | 68 vyučovacích hodin (34 týdnů výuky) |
| **Forma výuky** | Teoreticko-praktická (cca 40 % výklad/teorie, 60 % cvičení a práce v labu / VirtualBoxu) |
| **Výchozí routa v IntLab** | `/specializovana/operacni-systemy` |

---

## 2. Vazba na Rámcový vzdělávací program (RVP 18-20-M/01)

### 2.1 Klíčové kompetence
- **Digitální kompetence:** Žák efektivně ovládá operační systém Windows 11 v grafickém i textovém rozhraní, rozumí ukládání dat na médiích, instaluje a aktualizuje software.
- **Kompetence k řešení problémů:** Žák diagnostikuje chybové stavy systému (chybějící ovladače, poškozený souborový systém, zamrznuté procesy) a volí vhodné systémové nástroje k nápravě.
- **Pracovní kompetence:** Žák dodržuje pravidla bezpečnosti práce s daty, zásady zálohování a princip nejmenších nutných oprávnění (PoLP) při správě účtů.

### 2.2 Odborné kompetence a očekávané výstupy RVP
Žák na konci 1. ročníku:
1. **Vysvětlí princip Von Neumannovy architektury** a tok instrukcí a dat mezi procesorem (CPU) a operační pamětí (RAM).
2. **Definuje roli operačního systému** a rozliší uživatelský prostor (User Space / Ring 3) od prostoru jádra (Kernel Space / Ring 0).
3. **Nainstaluje a nakonfiguruje klientský operační systém** (Windows 11) včetně nastavení diskových oddílů (MBR vs. GPT, UEFI boot).
4. **Charakterizuje souborové systémy** (FAT32, NTFS, exFAT), vysvětlí alokaci clusterů, fragmentaci a vliv na výkon médií HDD vs. SSD.
5. **Popíše životní cyklus procesu**, rozpozná stavy procesu (Running, Ready, Blocked) a analyzuje běžící procesy v Task Manageru.
6. **Ovládá rozhraní příkazové řádky (CMD)**, naviguje v souborovém stromu, filtruje data pomocí rour a filtrů (`findstr`).
7. **Píše automatizační dávkové skripty (`.bat`)** s využitím proměnných, větvení (`if`), návěstí (`goto`) a cyklů (`for`).
8. **Spravuje místní uživatelské účty a skupiny**, nastavuje přístupová oprávnění NTFS a chápe význam dědičnosti a explicitního zákazu (Deny).
9. **Instaluje software** pomocí klasických instalátorů (EXE, MSI) i moderního balíčkovače (Winget) a rozumí registraci aplikací v OS.
10. **Diagnostikuje hardware přes Správce zařízení** (`devmgmt.msc`) a konfiguruje automatické spouštění úloh v Plánovači úloh (`taskschd.msc`).

---

## 3. Školní vzdělávací program (ŠVP)

### 3.1 Cíle předmětu
Cílem předmětu je přeměnit pasivního uživatele počítače v **technicky gramotného správce klientské stanice**. Žák pronikne pod povrch grafického rozhraní, pochopí vnitřní spolupráci hardwaru s operačním systémem a osvojí si dovednosti administrace, automatizace a zabezpečení stanice před přechodem do 2. ročníku (OSS 2 – správa podnikových sítí a pokročilá bezpečnost).

### 3.2 Profil absolventa předmětu
Absolvent OSS 1 dokáže samostatně:
- Zprovoznit a přeinstalovat klientský počítač na platformě Windows 11.
- Vyřešit běžné problémy s ovladači periferií a diskovými svazky.
- Vytvořit bezpečné prostředí pro více uživatelů s oddělenými právy.
- Napsat jednoduchý dávkový skript pro zálohování souborů a údržbu systému.
- Automatizovat rutinní operace přes Plánovač úloh pod systémovým účtem.

---

## 4. Tematický plán předmětu (Rozpis 68 hodin)

| Blok | Tematický celek | Dotace (Teorie / Cvičení) | Konkrétní učivo a činnosti žáka | Vazba na IntLab |
|:---:|---|:---:|---|---|
| **1** | **Architektura počítače a základy OS** | 8 h (4 h / 4 h) | Von Neumannova architektura, CPU cyklus Fetch-Decode-Execute, adresace RAM, vrstvy OS (Hardware -> Kernel Space -> User Space), systémová volání (Syscalls), Rings 0-3, typy jader (Monolit, Mikrojádro, Hybrid). | `/hardware/von-neumann`, `/hardware/ram`, `/uvod`, `/architektura` |
| **2** | **Instalace, boot a virtualizace** | 6 h (2 h / 4 h) | Historie a evoluce OS (Unix, DOS, NT, Linux), BIOS vs. UEFI, POST test, MBR vs. GPT, fázový průběh bootu. Virtualizace (Hypervisor Typ 1 vs. Typ 2, instalace Win 11 ve VirtualBoxu). | `/instalace`, `/vyvoj`, `/boot`, `/virtualizace` |
| **3** | **Souborové systémy a správa disků** | 8 h (3 h / 5 h) | Plotnové HDD vs. SSD (NAND buňky, TRIM), dělení disků a oddíly, souborový systém FAT (FAT tabulka, clustery, řetězení), fragmentace HDD a defragmentace, oprava sektorů `chkdsk`, přehled NTFS a exFAT. | `/souborove-systemy/*` (FS1–FS6) |
| **4** | **Procesy a správa paměti** | 6 h (3 h / 3 h) | Program na disku vs. proces v RAM, identifikátor PID, stavy procesu (Nový, Běžící, Připravený, Blokovaný), plánování CPU (Round Robin, FIFO), vlákna (threads), Task Manager v praxi. | `/procesy/*` (PR1–PR3, ADV) |
| **–** | **Hodnocení 1. pololetí (Test 01)** | 4 h (1 h / 3 h) | Opakování a reflexe otázek ABCD na simulátoru, hodnocená písemná práce (Von Neumann, licence OEM/FPP, Rings, souborové systémy). | `/test01-rozbor`, `/test01` (PINy: `ZAK2026` / `OS2026`) |
| **5** | **Grafické rozhraní Windows 11 (GUI)** | 8 h (2 h / 6 h) | Kompozice plochy přes DWM, proces `explorer.exe` a jeho restart, hierarchie disku `C:\` (`Windows`, `System32`, `Users`, profil `%USERPROFILE%`), atributy souborů (`R`, `H`, `A`, `S`), přípony a jejich zástupci, duální konfigurace (Nastavení vs. Ovládací panely, `.cpl`), ergonomie (Snap, virtuální plochy). | `/gui/*` (GUI1–GUI5) |
| **6** | **Příkazová řádka (CMD) a dávkové soubory** | 12 h (3 h / 9 h) | Práva Správce vs. uživatel, navigace disky (`cd`, `dir`, relativní/absolutní cesty), správa souborů (`mkdir`, `del`, `ren`, `copy`, `move`, `xcopy`), zástupné znaky `*` a `?`, roury (`\|`), filtry (`findstr`), diagnostika `systeminfo`, stavba `.bat` skriptu, `@echo off`, proměnné `set /p`, parametry `%1`, podmínky `if`, skoky `goto`, menu, cykly `for`. | `/prikazova-radka/*` (CLI1–CLI3, BAT1–BAT2) |
| **7** | **Správa uživatelů a oprávnění (Účty, Skupiny, NTFS)** | 8 h (2 h / 6 h) | Autentizace vs. autorizace, lokální účet vs. účet Microsoft, Standardní uživatel vs. Správce, princip PoLP, správa přes `lusrmgr.msc` a `net user`, bezpečnost hesel a TPM čip (Windows Hello), mechanismus UAC, uživatelské skupiny (`net localgroup`), přístupová práva NTFS, karta Zabezpečení, dědičnost a Deny, nástroj `icacls`, hromadný skript třídy. | `/uzivatele/*` (USR1–USR4) |
| **8** | **Správa aplikačního software a Winget** | 4 h (1 h / 3 h) | Životní cyklus software, instalátory EXE vs. Windows Installer MSI, tichá instalace (`/qn`, `/silent`), registrace v registru a Odinstalovat program, balíčkovač Winget (`winget search`, `install`, `upgrade --all`), export a import balíčků. | `/software/*` (SW1–SW2) |
| **9** | **Správa zařízení a ovladače (Drivers)** | 4 h (1 h / 3 h) | Komunikace OS s hardwarem, role ovladačů v jádře (Ring 0), Správce zařízení (`devmgmt.msc`), diagnostika stavů zařízení, instalace přes Windows Update a `.inf` soubory, digitální podpis WHQL, řešení hardwarových konfliktů. | `/zarizeni` |
| **10** | **Plánovač úloh a automatický provoz** | 4 h (1 h / 3 h) | Automatizace údržby stanice, Plánovač úloh (`taskschd.msc`), konfigurace triggerů (čas, spuštění systému, přihlášení), konfigurace akcí (spuštění `.bat` údržby), bezpečnostní kontext (účet `SYSTEM` vs. přihlášený uživatel). | `/planovac` |
| **–** | **Závěrečné hodnocení a rezerva** | 4 h (1 h / 3 h) | Praktické ověření dovedností (rekonfigurace stanice, dávkový skript na míru, nastavení NTFS práv), závěrečná reflexe ročníku. | — |
| **Σ** | **Celkem** | **68 h (24 h T / 44 h C)** | **Pravidelná 2hodinová týdenní dotace** | |

---

## 5. Mezipředmětové vazby a návaznosti

### Vertikální návaznost do dalších ročníků:
- **Návaznost na OSS 2 (2. ročník):**
  - Základy NTFS práv a účtů z OSS 1 jsou v OSS 2 přímo rozšířeny o **Active Directory (AD4)** a centralizovanou doménovou správu.
  - Znalost procesů a systémových složek je v OSS 2 bází pro **analýzu malwaru (BZ1)** a forenzní audit procesů (BZ2).
  - Tvorba dávkových souborů `.bat` přechází v OSS 2 do objektového **PowerShellu**.
- **Návaznost na OSS 3 (3. ročník):**
  - Koncepty příkazové řádky, rour a souborového stromu se aplikují v Linux Bash shellu.

### Horizontální vazby v 1. ročníku:
- **Hardware a číslicová technika:** Fyzická architektura CPU, sběrnic a pamětí RAM/SSD přímo navazuje na témata Von Neumann a média v OSS 1.
- **Programování 1 (PRG 1):** Principy proměnných, větvení a cyklů ze Scratche žáci uplatňují při psaní dávkových souborů `.bat`.

---

## 6. Mapování na portál IntLab

Všechny kapitoly v kurikulu mají odpovídající interaktivní ekvivalent na webu:
- Rozcestník předmětu: [`/specializovana/operacni-systemy`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/app/specializovana/operacni-systemy/page.tsx)
- Jednotné vizuální téma: Fialovo-indigový gradient (`from-purple-600 to-indigo-600`)
- Písemné práce: Modul [`test01`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/app/specializovana/operacni-systemy/test01/page.tsx) se studentským PINem `ZAK2026` a učitelským PINem `OS2026`.
