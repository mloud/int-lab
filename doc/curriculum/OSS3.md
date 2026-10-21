# Kurikulární profil předmětu: Operační systémy 3 & Linux (OSS 3)

---

## 1. Identifikace předmětu a časová dotace

| Parametr | Hodnota |
|---|---|
| **Název předmětu** | Operační systémy 3 |
| **Zkratka / Kód** | OSS 3 (`ops3`) |
| **Cílový ročník** | 3. Ročník SŠ (Střední odborná škola) |
| **Obor vzdělání** | 18-20-M/01 Informační technologie |
| **Týdenní hodinová dotace** | 2 hodiny týdně |
| **Celková roční dotace** | 66 vyučovacích hodin (33 týdnů výuky) |
| **Forma výuky** | Praktická administrace Linuxu a kyberbezpečnostní laboratoř (cca 25 % výklad, 75 % praktická cvičení) |
| **Výchozí routa v IntLab** | `/specializovana/operacni-systemy-3` |

---

## 2. Vazba na Rámcový vzdělávací program (RVP 18-20-M/01)

### 2.1 Odborné kompetence a očekávané výstupy RVP
Žák na konci 3. ročníku:
1. **Instaluje a spravuje serverový operační systém Linux** bez grafického rozhraní: volí rozdělení disku, swap a zavaděč systému, orientuje se ve standardní hierarchii souborového systému (FHS) a ovládá správu disků, oddílů a připojování svazků.
2. **Ovládá textové rozhraní (CLI) a nástroje shellu**: naviguje a provádí pokročilé operace se soubory, využívá přesměrování proudů, roury, regulární filtry a terminálové textové editory.
3. **Spravuje uživatele, POSIX oprávnění a systémové služby**: nastavuje přístupová práva UGO v osmičkové i symbolické notaci, deleguje administrátorská práva (sudo), řídí procesy, démony a analyzuje systémové logy.
4. **Zprovozňuje a zabezpečuje síťové služby**: konfiguruje síťová rozhraní a paketový firewall, realizuje šifrovanou vzdálenou správu (SSH s asymetrickými klíči), provozuje webový server se zabezpečením HTTPS a zajišťuje sdílení souborů s klientskými stanicemi Windows (Samba).
5. **Automatizuje správu pomocí skriptů v shellu**: vytváří skripty pro rutinní údržbu a zálohování s využitím proměnných, parametrů, podmínek a cyklů a plánuje jejich automatické spouštění v plánovači cron.
6. **Aplikuje síťovou kybernetickou bezpečnost a etický audit**: orientuje se v právním rámci (trestní zákoník, směrnice NIS 2), provádí průzkum sítě a mapování zranitelností (CVE/CVSS), analyzuje síťový provoz paketovým analyzátorem a testuje odolnost přístupových hesel.
7. **Řeší bezpečnostní incidenty na síti a serverech (Incident Response)**: analyzuje kompromitovaný systém, identifikuje neoprávněnou aktivitu a provádí bezpečnostní nápravu konfigurace a blokování útočníka.
8. **Ovládá pracovní cyklus verzovacího systému (Git)**: rozumí architektuře zón, vytváří revize, větve, slučuje změny, manuálně řeší kolize v kódu a konfiguracích a spolupracuje prostřednictvím vzdálených repozitářů.
9. **Využívá nástroje pro agilní řízení projektů a týmovou komunikaci**: organizuje a koordinuje práci v týmu s využitím agilních nástrojů pro plánování úkolů (Kanban, backlog) a týmovou komunikaci.
10. **Realizuje komplexní týmový infrastrukturní projekt smíšené sítě**: navrhne a zprovozní heterogenní infrastrukturu (Linux servery + Windows klienti), verzuje konfigurace, zabezpečí služby, otestuje odolnost záloh a řešení ústně obhájí.

---

## 3. Školní vzdělávací program (ŠVP)

### 3.1 Cíle předmětu
Předmět završuje tříletou osu výuky operačních systémů. Přináší nezbytnou technologickou polyvalenci správce IT přechodem na **serverovou platformu Linux**, doplňuje verzování v **Gitu**, integruje bezpečnostní návyky do síťové **Kyberbezpečnosti**, zapojuje **nástroje pro agilní plánování a týmovou komunikaci** a završuje studium **týmovým infrastrukturním projektem**.

### 3.2 Profil absolventa předmětu
Absolvent OSS 3 dokáže samostatně:
- Nainstalovat a bezpečně administrovat Linuxový server bez grafického rozhraní (headless) přes šifrovaný terminál SSH.
- Provozovat zabezpečený webový server HTTPS a sdílet podniková data s klientskými Windows přes Sambu.
- Automatizovat správu pomocí vlastních skriptů v shellu a plánovat periodickou údržbu v plánovači cron.
- Provést bezpečnostní audit síťových portů, vyhledat zranitelnosti v databázích CVE a analyzovat síťový provoz.
- Samostatně verzovat konfigurace a skripty v Gitu a spolupracovat prostřednictvím vzdálených repozitářů.
- Organizovat týmovou práci a komunikaci pomocí agilních nástrojů (Kanban, backlog).
- Postavit, zabezpečit a obhájit komplexní smíšenou podnikovou infrastrukturu propojující Linux a Windows.

---

## 4. Tematický plán předmětu (Rozpis 66 hodin)

| Blok | Tematický celek | Dotace (Teorie / Cvičení) | Konkrétní učivo a výstupy žáka | Vazba na IntLab |
|:---:|---|:---:|---|---|
| **1** | **Linux: Architektura, instalace a základní správa systému** | 16 h (4 h / 12 h) | Architektura Linuxu a instalace (distribuce, rozdělení disku na oddíly a swap, zavaděč systému, headless server), standardizovaná hierarchie souborového systému FHS, manipulační a navigační příkazy v terminálu, uživatelé a POSIX oprávnění (model UGO, osmičková notace, delegování práv sudo), přesměrování proudů, roury a terminálové editory, správa disků, oddílů a trvalé připojování svazků, sledování procesů a správa démonů přes systemd, balíčkovací systém a aktualizace. | `/linux/*` |
| **2** | **Linux: Sítě, serverové služby a automatizace v shellu** | 16 h (4 h / 12 h) | Síťová konfigurace rozhraní a paketový firewall (UFW), zabezpečená vzdálená správa přes SSH (autentizace asymetrickými klíči, restrikce přihlášení), webový server (virtuální hostitelé, certifikáty pro HTTPS), sdílení souborů v heterogenní síti (Samba – Linux ↔ Windows, UNC cesty, oprávnění), programování skriptů v shellu (proměnné, parametry `$1`, podmínky `if`, cykly `for`), komprese a archivace dat (`tar`), periodické plánování úloh v plánovači cron. | `/sluzby/*` |
| **3** | **Kybernetická bezpečnost, síťový audit a obrana** | 12 h (3 h / 9 h) | Právní a etický rámec (trestní zákoník § 230–232, evropská směrnice NIS 2, fáze kybernetického útoku Cyber Kill Chain), síťový audit a mapování zranitelností (skenování portů, databáze zranitelností CVE a mezinárodní hodnocení CVSS), analýza síťového provozu paketovým analyzátorem (TCP handshake, nešifrovaný vs. šifrovaný provoz), ochrana autentizace a hashování hesel se solí, audit odolnosti hesel (slovníkové útoky), reakce na incident a náprava kompromitovaného systému. | `/kyberbezpecnost/*` |
| **4** | **Verzovací systémy, týmová kooperace a infrastrukturní projekt** | 18 h (4 h / 14 h) | Architektura verzovacích systémů (Git – zóny pracovního prostoru, tvorba revizí a commitů, historie a ignorování souborů), práce s větvemi a řešení konfliktů (izolovaný vývoj, slučování změn merge, ruční řešení kolizí), vzdálené repozitáře a týmové procesy (Pull Requesty, revize změn kódu a konfigurací), agilní nástroje pro plánování úkolů a týmovou komunikaci (metodika Kanban, backlog, rozdělení rolí v týmu), realizace týmové infrastruktury (stavba hybridní firemní sítě Linux + Windows, sdílení dat, web, verzování konfigurací v repozitáři), křížový audit a bezpečnostní testování, technická dokumentace a ústní obhajoba projektu před komisí. | `/git/*`, `/tymova-spoluprace/*` |
| **5** | **Závěrečná reflexe tříletého kurikula a rezerva** | 4 h (1 h / 3 h) | Syntéza a komparace administrátorských přístupů (porovnání klientského Windows a serverového Linuxu, GUI vs. textová konfigurace a skripty, typové maturitní úlohy ze správy OS), časová rezerva na školní akce, maturity a uzavření klasifikace. | — |
| **Σ** | **Celkem** | **66 h (16 h T / 50 h C)** | **Pravidelná 2hodinová týdenní dotace (33 týdnů × 2 h)** | |

---

## 5. Mezipředmětové vazby

- **Vertikální vstup (z OSS 1 a OSS 2):** Student porovnává koncepty Windows (procesy, služby, práva NTFS, PowerShell) s jejich Linuxovými protějšky (procesy, systemd démony, POSIX práva, Bash). Znalosti z Windows domény a AD DS propojuje se síťovými službami Linuxu (Samba).
- **Horizontální vazba na Počítačové sítě (3. ročník):** Sledování paketů ve Wiresharku, TCP handshake a konfigurace SSH a UFW přímo aplikuje teoretické modely ISO/OSI a TCP/IP.

---

## 6. Mapování na portál IntLab

- Rozcestník: [`/specializovana/operacni-systemy-3`](file:///d:/Skola/Vimperk/Aplikace%20Informatika/IntLab/app/specializovana/operacni-systemy-3/page.tsx)
- Jednotné vizuální téma: Tmavý břidlicový gradient (`from-slate-700 to-slate-900`)
