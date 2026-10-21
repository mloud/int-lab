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
| **Celková roční dotace** | 66 vyučovacích hodin (33 týdnů výuky) |
| **Forma výuky** | Teoreticko-praktická (cca 40 % výklad/teorie, 60 % cvičení a práce v labu / VirtualBoxu) |
| **Výchozí routa v IntLab** | `/specializovana/operacni-systemy-1` |

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
3. **Nainstaluje a nakonfiguruje klientský operační systém** (Windows 11) včetně nastavení diskových oddílů (tabulka oddílů GPT, UEFI boot).
4. **Charakterizuje souborové systémy** (FAT32, NTFS, exFAT), vysvětlí alokaci clusterů, fragmentaci a vliv na výkon médií HDD vs. SSD.
5. **Popíše životní cyklus procesu**, rozpozná stavy procesu (Running, Ready, Blocked) a analyzuje běžící procesy v Task Manageru.
6. **Ovládá rozhraní příkazové řádky (CMD)**, naviguje v souborovém stromu, filtruje data pomocí rour a filtrů (`findstr`).
7. **Píše automatizační dávkové skripty (`.bat`)** s využitím proměnných, větvení (`if`), návěstí (`goto`) a cyklů (`for`).
8. **Spravuje místní uživatelské účty a skupiny**, nastavuje přístupová oprávnění NTFS a chápe význam dědičnosti a explicitního zákazu (Deny).
9. **Instaluje software** pomocí klasických instalátorů (EXE, MSI) i moderního balíčkovače (Winget) a rozumí registraci aplikací v OS.
10. **Diagnostikuje hardware přes Správce zařízení** (`devmgmt.msc`) a konfiguruje automatické spouštění úloh v Plánovači úloh (`taskschd.msc`).
11. **Nakonfiguruje a otestuje síťové připojení stanice v LAN**, rozliší MAC a IP adresu, provede diagnostiku pomocí `ipconfig`, `ping` a `tracert`, nastaví síťové profily a provede základní konfiguraci SOHO Wi-Fi routeru.

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

## 4. Tematický plán předmětu (Rozpis 66 hodin)

| Blok | Tematický celek | Dotace (Teorie / Cvičení) | Konkrétní učivo a činnosti žáka | Vazba na IntLab |
|:---:|---|:---:|---|---|
| **1** | **Architektura počítače a základy OS** | 8 h (3 h / 5 h) | Von Neumannova architektura, procesor a paměť RAM (instrukce vs. data), vrstvy OS (Hardware -> Kernel Space -> User Space), systémová volání (Syscalls), Rings 0-3, typy jader (Monolit, Mikrojádro, Hybrid), licence (OEM, Retail). | `/hardware/von-neumann`, `/hardware/ram`, `/uvod`, `/architektura` |
| **2** | **Souborové systémy, správa disků a Boot** | 10 h (3 h / 7 h) | Paměťová média (HDD vs. SSD, propustnost), dělení disků a oddíly (tabulka oddílů GPT, systémový oddíl), architektura souborových systémů (alokační tabulky, clustery, řetězení, fragmentace), formátování (rychlé vs. přepis nulami), Start systému a Boot proces (POST test, firmware UEFI, zavaděč OS, předání řízení jádru). | `/souborove-systemy/*` (FS1–FS6, `/souborove-systemy/boot`) |
| **3** | **Procesy a správa paměti** | 6 h (2 h / 4 h) | Program na disku vs. proces v RAM, identifikátory PID a PPID, střídání procesů (multitasking, časová kvanta, stav CPU, přepnutí kontextu), stavy procesu (Běžící, Připravený, Čekající na I/O), vlákna (threads), virtuální paměť a stránkování (princip virtuální paměti, swap / odkládací prostor, izolace aplikací). | `/procesy/*` (PR1–PR5) |
| **4** | **Grafické rozhraní klientského OS (GUI)** | 4 h (1 h / 3 h) | Kompozice plochy a správce oken, řešení zamrznutí prostředí, hierarchie systémového disku (systémové složky, profily v Users), atributy souborů, registrace přípon a výchozí aplikace, konfigurační nástroje OS, ergonomie (organizace oken, virtuální plochy). | `/gui/*` (GUI1–GUI5) |
| **5** | **Příkazový řádek (CLI) a dávkové soubory** | 6 h (2 h / 4 h) | Uživatelská vs. administrátorská práva, navigace v adresářovém stromu (relativní/absolutní cesty), správa souborů a složek, zástupné znaky, přesměrování I/O, roury, textové filtry, diagnostika stanice, tvorba dávkových skriptů pro automatizaci rutinních úkonů. | `/prikazova-radka/*` (CLI1–CLI3, BAT1–BAT2) |
| **6** | **Správa uživatelů a přístupových oprávnění** | 8 h (2 h / 6 h) | Autentizace vs. autorizace, lokální účet vs. centrální/online identita, role standardního uživatele a správce, princip PoLP, bezpečnost hesel a hardwarově vázané ověřování, mechanismus elevace práv, uživatelské skupiny a role, souborová přístupová práva (ACL), dědičnost a pravidlo explicitního zákazu. | `/uzivatele/*` (USR1–USR4) |
| **7** | **Správa aplikačního software a balíčkovače** | 4 h (1 h / 3 h) | Životní cyklus software, instalační formáty a balíčky, princip tiché bezobslužné instalace, registrace aplikací a čistá odinstalace, moderní správa software přes správce balíčků (vyhledávání, instalace, hromadné aktualizace). | `/software/*` (SW1–SW2) |
| **8** | **Správa zařízení a Plánovač úloh** | 4 h (1 h / 3 h) | Komunikace OS s perifériemi, role ovladačů v režimu jádra, diagnostika stavů zařízení, instalace a digitální podpis ovladačů, automatizace údržby v Plánovači úloh (časové a událostní spouštěče, servisní účty). | `/zarizeni`, `/planovac` |
| **9** | **Síťová konfigurace a lokální sítě (LAN)** | 8 h (2 h / 6 h) | Fyzické adaptéry Ethernet a Wi-Fi, MAC adresa vs. logická IPv4, maska podsítě, DHCP vs. statická IP konfigurace, diagnostika konektivity a sledování trasy paketu, síťové profily (Veřejná vs. Privátní), sdílení v LAN, Wi-Fi standardy a šifrování WPA2/WPA3, konfigurace SOHO směrovače. | `/site/*` (NET1–NET4) |
| **10** | **Závěrečný integrující projekt stanice a hodnocení** | 8 h (1 h / 7 h) | Samostatné zprovoznění klientské stanice od rozdělení disku a instalace OS, instalace ovladačů a softwaru správcem balíčků, konfigurace uživatelů a přístupových práv, tvorba údržbového skriptu, křížová diagnostika chyb a obhajoba projektu. | Projektový blok |
| **Σ** | **Celkem** | **66 h (19 h T / 47 h C)** | **Pravidelná 2hodinová týdenní dotace (33 týdnů × 2 h)** | |


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
- Rozcestník předmětu: [`/specializovana/operacni-systemy-1`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/app/specializovana/operacni-systemy-1/page.tsx)
- Jednotné vizuální téma: Fialovo-indigový gradient (`from-purple-600 to-indigo-600`)
- Písemné práce: Modul [`test01`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/app/specializovana/operacni-systemy-1/test01/page.tsx) se studentským PINem `ZAK2026` a učitelským PINem `OS2026`.
