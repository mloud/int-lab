import type { OutlineGroup } from './outlineTypes';

const SUBJECT = 'Operační systémy 2';
const BASE = '/specializovana/operacni-systemy-2';

/**
 * Bezpečnost 1 – pokračování za hotovými BZ1 a BZ2 (ty mají plnou stránku, proto zde nejsou).
 * Pořadí odpovídá učitelově osnově: Sandbox → Antivir → Firewall → Šifrování → Účty → Síť a hesla → CTF.
 */
export const OSS2_BEZPECNOST: OutlineGroup = {
  chapterId: 'os2-bezpecnost',
  chapterTitle: 'Bezpečnost 1',
  chapterDescription: 'Zabezpečení Windows 11, analýza procesů, Sandbox, Defender, Firewall a šifrování.',
  chapterTag: 'sec',
  chapterPath: `${BASE}/bezpecnost`,
  subjectTitle: SUBJECT,
  grade: 2,
  gradeLabel: '2. Ročník',
  thematicBlock: 'Bezpečnost operačních systémů',
  icon: 'ShieldCheck',
  gradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      slug: 'izolace', tag: 'BZ3', order: 3, icon: 'Layers', title: 'Izolované prostředí a Sandbox', hours: '2 h',
      subtitle: 'Bezpečné spuštění podezřelého programu a hledání skrytého spouštění po startu.',
      intro: 'Podezřelý program nemusíme spouštět na vlastním počítači – stačí ho zavřít do izolovaného prostředí. Ukážeme také, kde se škodlivý kód ukrývá, aby se spustil po každém startu.',
      topics: ['Princip izolace a karantény, Windows Sandbox', 'Kde se programy spouští po startu (složka Po spuštění, naplánované úlohy, klíče Run v registru)', 'Nástroj Autoruns', 'Co sandbox neochrání'],
      practice: ['Simulace: Sandbox vs. hostitelský počítač', 'Praxe: test skriptu ve Windows Sandboxu a kontrola spouštění po startu'],
      builds: 'BZ1 a BZ2 (malware, procesy), Virtualizace (OSS 1).',
    },
    {
      slug: 'defender', tag: 'BZ4', order: 4, icon: 'ShieldCheck', title: 'Antivirový systém (Defender)', hours: '2 h',
      subtitle: 'Jak antivir hledá hrozby a jak ho správně nastavit.',
      intro: 'Antivir není jen hledání známých virů. Podíváme se na tři způsoby detekce, ochranu v cloudu a na to, proč jsou výjimky riziko.',
      topics: ['Signatury, heuristika a chování programu', 'Ochrana v reálném čase a cloud', 'Výjimky a jejich rizika', 'Testovací soubor EICAR'],
      practice: ['Simulace: která detekce zachytí jaký typ hrozby', 'Praxe: nastavení Defenderu v grafice a v příkazové řádce, bezpečný test EICAR'],
      builds: 'BZ2 (digitální podpisy, reputace).',
    },
    {
      slug: 'firewall', tag: 'BZ5', order: 5, icon: 'Network', title: 'Firewall ve Windows', hours: '2 h',
      subtitle: 'Pravidla pro příchozí a odchozí komunikaci, porty a protokoly.',
      intro: 'Firewall rozhoduje, které pakety projdou. Naučíme se číst porty, propojit je s procesy a psát vlastní pravidla.',
      topics: ['Stavový firewall, příchozí vs. odchozí směr', 'Porty a protokoly (TCP, UDP, ICMP)', 'Propojení portu s procesem: netstat -ano', 'Vlastní pravidla v konzoli wf.msc'],
      practice: ['Simulace: stavba pravidel a průchod paketů', 'Praxe: zablokování pingu a odchozího programu'],
      builds: 'Síť (OSS 1), BZ1 (síťový červ).',
    },
    {
      slug: 'sifrovani', tag: 'BZ6', order: 6, icon: 'Lock', title: 'Šifrování dat a ochrana proti ransomwaru', hours: '2 h',
      subtitle: 'BitLocker, čip TPM a obrana proti zašifrování souborů.',
      intro: 'Ztracený notebook nesmí znamenat únik dat. Šifrování disku to řeší – a spolu se zálohou chrání i před ransomwarem.',
      topics: ['Ochrana dat v klidu a šifrování disku', 'BitLocker, čip TPM a záchranný klíč', 'Řízený přístup ke složkám', 'Záloha jako poslední obrana'],
      practice: ['Simulace: odcizený disk s BitLockerem a bez něj', 'Praxe: BitLocker To Go na USB a uložení záchranného klíče'],
      builds: 'Zálohování (OSS 2), ransomware v BZ1.',
    },
    {
      slug: 'ucty', tag: 'BZ7', order: 7, icon: 'Cog', title: 'Správa účtů, UAC a aktualizace', hours: '2 h',
      subtitle: 'Princip nejmenších práv, řízení UAC a udržování systému aktuální.',
      intro: 'Většina škod vznikne proto, že program běží s příliš velkými právy. UAC a správné účty to omezují a aktualizace zalepují známé díry.',
      topics: ['Princip nejmenších práv', 'Jak funguje UAC (omezený a plný token)', 'Aktualizace systému a aplikací (winget)', 'Správce vs. standardní uživatel'],
      practice: ['Simulace: jak UAC rozhodne o výzvě', 'Praxe: nastavení UAC a hromadná aktualizace'],
      builds: 'Správa uživatelů a skupin a winget (OSS 1).',
    },
    {
      slug: 'sit-hesla', tag: 'BZ8', order: 8, icon: 'Search', title: 'Síť, hesla a základy etického hackingu', hours: '2 h',
      subtitle: 'Phishing, silná hesla, dvoufázové ověření a první kroky etického hackera.',
      intro: 'Nejslabším článkem bývá člověk. Naučíme se poznat podvodný e-mail, vytvořit odolné heslo a pochopit, jak uvažuje etický hacker.',
      topics: ['Phishing a sociální inženýrství', 'Síla hesla a správce hesel', 'Vícefázové ověření (MFA)', 'Co je etický hacking (úvod)'],
      practice: ['Simulace: rozpoznej podvodný e-mail', 'Praxe: kontrola uniklých hesel a nastavení MFA'],
      builds: 'BZ1 (spyware a keylogger).',
    },
    {
      slug: 'ctf', tag: 'BZ9', order: 9, icon: 'Eye', title: 'Závěrečná detektivka (Mini-CTF)', hours: '2 h',
      subtitle: 'Vyčištění napadeného počítače – postup incident response krok za krokem.',
      intro: 'Na závěr bloku si všechno zopakujeme v praxi. Napadený počítač najdeme, izolujeme, vyčistíme a sepíšeme protokol.',
      topics: ['Postup při incidentu: detekce, izolace, odstranění, čištění', 'Procesy, síť, firewall a spouštění po startu na jednom místě', 'Sepsání protokolu incidentu', 'Spolupráce ve dvojici'],
      practice: ['Simulace: napadený počítač s úkoly (FLAGy)', 'Praxe: vyčištění připraveného virtuálního stroje'],
      builds: 'BZ1 až BZ8.',
    },
  ],
};

/** Pokročilá konfigurace Windows a PowerShell (~8 h) – nástroje správce, služby na pozadí, skriptování, registr a logy. */
export const OSS2_POKROCILA: OutlineGroup = {
  chapterId: 'os2-pokrocila',
  chapterTitle: 'Pokročilá konfigurace Windows a PowerShell',
  chapterDescription: 'Nástroje správce: konzole MMC, služby na pozadí, skriptování v PowerShellu, registr a Prohlížeč událostí.',
  chapterTag: 'adv',
  chapterPath: `${BASE}/pokrocila-konfigurace`,
  subjectTitle: SUBJECT,
  grade: 2,
  gradeLabel: '2. Ročník',
  thematicBlock: 'Pokročilá konfigurace Windows a PowerShell',
  icon: 'Wrench',
  gradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      slug: 'mmc',
      tag: 'PK1',
      title: 'Konzole správce (MMC) a Služby Windows',
      hours: '2 h',
      subtitle: 'Sjednocené rozhraní snap-inů a správa procesů běžících na pozadí pod účtem SYSTEM.',
      intro: 'Správce nepotřebuje deset různých oken. Ukážeme si, jak funguje Microsoft Management Console (MMC), jak si poskládat vlastní nástroj a jak ovládat služby Windows (typy spouštění, účty a závislosti).',
      topics: [
        'Microsoft Management Console (MMC) a princip rozšiřujících modulů (Snap-inů)',
        'Služby Windows vs. běžné programy (spuštění bez přihlášeného uživatele pod účtem SYSTEM)',
        'Typy spouštění služeb: Automaticky, Ručně, Zakázáno a zpožděné spuštění',
        'Řešení závislostí služeb a obnova po chybě (Restart servisu, spuštění skriptu)',
        'Správa služeb z příkazového řádku: příkazy net start/stop a sc config'
      ],
      practice: [
        'Simulace: Trenažér závislostí služeb – co se stane, když vypadne závislá síťová služba',
        'Praxe v OS: Sestavení vlastní konzole správce v mmc.exe a rekonfigurace služby na automatický restart po selhání'
      ],
      builds: 'Procesy (OSS 1), BZ2 (svchost.exe a služby).'
    },
    {
      slug: 'powershell',
      tag: 'PK2',
      title: 'PowerShell: Základy, objekty a roury',
      hours: '2 h',
      subtitle: 'Moderní příkazová řádka správce: konec prostého textu, nástup objektů a cmdletů.',
      intro: 'Zatímco staré CMD posílalo jen text, PowerShell předává skutečné strukturované objekty. Naučíme se syntaxi Sloveso-PodstatnéJméno, vyhledávání nápovědy a magickou rouru objektů.',
      topics: [
        'Proč PowerShell nahradil CMD: objektový model .NET vs. prostý textový proud',
        'Syntaxe cmdletů: Sloveso-PodstatnéJméno (Verb-Noun, např. Get-Service, Stop-Process)',
        'Tři zlaté cmdlety správce: Get-Command, Get-Help (-Full, -Examples) a Get-Member',
        'Objektová roura (Pipeline |): předávání celých vlastností objektu bez složitého parsování',
        'Filtrování a výběr dat: cmdlety Where-Object a Select-Object'
      ],
      practice: [
        'Simulace: Pipeline Explorer – sledování, jak se objekt procesů filtruje a transformuje v rouře',
        'Praxe v OS: Vyhledání běžících procesů s vysokou spotřebou RAM a jejich zformátování do tabulky přes PowerShell'
      ],
      builds: 'Příkazová řádka CMD (OSS 1 – roury a filtry).'
    },
    {
      slug: 'powershell-sprava',
      tag: 'PK3',
      title: 'Automatizace správy v PowerShellu',
      hours: '2 h',
      subtitle: 'Správa systému, hromadné operace, skripty .ps1 a bezpečnostní politika ExecutionPolicy.',
      intro: 'Jak admin ušetří hodiny klikání? Napíše si PowerShell skript. Naučíme se hromadně spravovat služby a soubory, řešit politiku ExecutionPolicy a vytvářet autonomní skripty.',
      topics: [
        'Hromadná správa: Start-Service, Stop-Service, Restart-Service s využitím roury',
        'Práce se souborovým systémem: Get-ChildItem, Copy-Item, Remove-Item a zástupné znaky',
        'Tvorba a spouštění skriptů .ps1: proměnné ($), cykly (foreach) a předávání parametrů',
        'Bezpečnostní politika ExecutionPolicy: Restricted vs. RemoteSigned a podepisování skriptů',
        'Export reportů do formátu CSV a HTML (Export-Csv, ConvertTo-Html)'
      ],
      practice: [
        'Simulace: Inspekční skript – automatická kontrola stavu kritických služeb',
        'Praxe v OS: Vytvoření skriptu pro kontrolu a automatický restart zamrzlé služby s exportem do HTML reportu'
      ],
      builds: 'PowerShell základy (PK2) a Dávkové soubory (BAT1).'
    },
    {
      slug: 'registry',
      tag: 'PK4',
      title: 'Systémový registr a řešení chyb',
      hours: '2 h',
      subtitle: 'Srdce konfigurace Windows: větve registru, klíče, hodnoty a záchrana systému.',
      intro: 'Téměř každé nastavení ve Windows končí zápisem do registru. Naučíme se bezpečně navigovat v regedit.exe, chápat rozdíl mezi nastavením počítače a uživatele a zálohovat klíče do .reg souborů.',
      topics: [
        'Účel a hierarchie registru Windows: soubory úlů (Hives) v System32\\config a profilu',
        'Pět hlavních větví: HKEY_LOCAL_MACHINE (stroj), HKEY_CURRENT_USER (uživatel), HKCR, HKU, HKCC',
        'Datové typy hodnot: REG_SZ (text), REG_DWORD (číslo/přepínač 0/1), REG_BINARY',
        'Záloha, export a import registru (.reg soubory pro hromadnou distribuci nastavení)',
        'Odstraňování chyb: vyčištění položek po havárii a oprava nechtěných asociací souborů'
      ],
      practice: [
        'Simulace: Rentgen registru – odhalení, který klíč v registru se mění při přepnutí volby v Nastavení',
        'Praxe v OS: Export vybrané větve do souboru .reg, bezpečná úprava hodnoty DWORD a opětovný import'
      ],
      builds: 'Hierarchie disku C: (OSS 1), Bezpečnost (BZ3 – položky po startu v Run).'
    },
    {
      slug: 'udalosti',
      tag: 'PK5',
      title: 'Prohlížeč událostí a audit (Event Viewer)',
      hours: '2 h',
      subtitle: 'Forenzní čtení logů: co se v systému stalo, kdy k tomu došlo a jak najít příčinu chyby.',
      intro: 'Když systém padá nebo se někdo pokouší prolomit heslo, nezanechá zprávu na ploše, ale záznam v Prohlížeči událostí. Naučíme se číst protokoly a filtrovat klíčová Event ID.',
      topics: [
        'Role systémového logování v podniku: architektura Windows Event Log (služba eventlog)',
        'Tři základní protokoly: Systém (hardware, ovladače), Aplikace (pády programů), Zabezpečení (audity)',
        'Úrovně událostí: Informace, Upozornění, Chyba, Kritická událost',
        'Klíčová Event ID pro správce: úspěšné přihlášení (4624), neúspěšný pokus / brute-force (4625), vypnutí (6006)',
        'Tvorba vlastních filtrů a zobrazení (Custom Views) a napojení úlohy na konkrétní událost'
      ],
      practice: [
        'Simulace: Stopař incidentů – odhalení pokusu o neoprávněné přihlášení v časové ose logu',
        'Praxe v OS: Vyfiltrování neúspěšných přihlášení v protokolu Zabezpečení a uložení filtru do vlastní konzole'
      ],
      builds: 'Zabezpečení účtů (OSS 1/2), MMC (PK1).'
    }
  ]
};

/** Síťové serverové služby a infrastruktura (~12 h) – DHCP, DNS, SMB sdílení, RDP, webový server IIS a databázový SQL server. */
export const OSS2_SLUZBY: OutlineGroup = {
  chapterId: 'os2-sluzby',
  chapterTitle: 'Síťové serverové služby a infrastruktura',
  chapterDescription: 'Základní infrastruktura podnikové sítě: automatická konfigurace DHCP, překlad jmen DNS, sdílení SMB, RDP, webový server IIS a databázový server SQL.',
  chapterTag: 'srv',
  chapterPath: `${BASE}/sluzby`,
  subjectTitle: SUBJECT,
  grade: 2,
  gradeLabel: '2. Ročník',
  thematicBlock: 'Serverové služby a infrastruktura',
  icon: 'Database',
  gradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      slug: 'dhcp',
      tag: 'SL1',
      title: 'DHCP server: Automatická konfigurace sítě',
      hours: '2 h',
      subtitle: 'Centrální správa IP adres: rozsah, zapůjčení, vyloučení a statické rezervace pro tiskárny.',
      intro: 'Ručně zadávat IP adresu do stovek počítačů je noční můra. Zprovozníme roli DHCP Server na Windows Serveru, definujeme rozsah přidělovaných adres a nastavíme pevnou rezervaci pro tiskárnu podle její MAC adresy.',
      topics: [
        'Princip protokolu DHCP: 4fázový proces DORA (Discover, Offer, Request, Acknowledge)',
        'Instalace role DHCP Server ve Správci serveru na Windows Serveru',
        'Vytvoření a autorizace rozsahu (Scope): rozsah IP, maska sítě, výchozí brána a DNS servery',
        'Doba zapůjčení (Lease Duration) a proces obnovy zapůjčení (Renew)',
        'Rezervace IP adres podle MAC adresy pro stálé síťové prvky (tiskárny, servery, kamery)'
      ],
      practice: [
        'Simulace: Provoz DHCP – sledování toku zpráv DORA mezi klientem a serverem při zapnutí PC',
        'Praxe v OS: Konfigurace nového rozsahu DHCP ve virtuálním serveru a ověření převzetí údajů klientem přes ipconfig /renew'
      ],
      builds: 'Síťové adaptéry a IP (OSS 1 – NET1), Služby Windows (PK1).'
    },
    {
      slug: 'dns',
      tag: 'SL2',
      title: 'DNS server: Překlad jmen a páteř sítě',
      hours: '2 h',
      subtitle: 'Telefonní seznam sítě: dopředné zóny, A záznamy, rekurze a nutná podmínka pro doménu.',
      intro: 'Lidé si pamatují názvy, počítače rozumí IP adresám. Zprovozníme roli DNS Serveru, vytvoříme podnikovou doménovou zónu a pochopíme, proč bez funkčního DNS serveru nemůže fungovat ani Active Directory.',
      topics: [
        'Hierarchie doménového systému DNS: kořenové servery (Root), TLD (.cz, .com) a autoritativní servery',
        'Instalace role DNS Server a konfigurace Dopředné zóny vyhledávání (Forward Lookup Zone)',
        'Základní typy DNS záznamů: A (převod jména na IPv4), CNAME (alias), PTR (reverzní překlad), MX (pošta)',
        'Předávání dotazů (Forwarders) do veřejného internetu (např. na 8.8.8.8 nebo 1.1.1.1)',
        'Diagnostika a testování překladu jmen v příkazovém řádku: nástroj nslookup a vymazání mezipaměti ipconfig /flushdns'
      ],
      practice: [
        'Simulace: Tok DNS dotazu – rekurzivní vs. iterativní dotazování při zadání webové adresy',
        'Praxe v OS: Vytvoření vlastní zóny na serveru, přidání A záznamu pro intranetový server a ověření přes nslookup'
      ],
      builds: 'Diagnostika konektivity a sítě (OSS 1 – NET2), DHCP server (SL1).'
    },
    {
      slug: 'smb',
      tag: 'SL3',
      title: 'Souborový server a síťové disky (SMB)',
      hours: '2 h',
      subtitle: 'Centrální datové úložiště: sdílení složek, oprávnění a automatické připojení diskové jednotky.',
      intro: 'Místo posílání souborů e-mailem vytvoříme centrální souborový server. Nastavíme sdílené složky pro jednotlivá oddělení a namapujeme je klientům jako síťové disky.',
      topics: [
        'Protokol SMB (Server Message Block) a princip souborového serveru',
        'Zápis síťové cesty UNC (Universal Naming Convention): \\\\Server\\SdilenyProstredek',
        'Dvojí brána zabezpečení: Oprávnění ke sdílení (Share Permissions) vs. NTFS oprávnění k souborům',
        'Mapování síťového disku na písmeno (Z:) v GUI a přes příkazový řádek (net use Z: \\\\server\\slozka)',
        'Skrytá administrativní sdílení (C$, ADMIN$, IPC$)'
      ],
      practice: [
        'Simulace: Vyhodnocení přístupu – průchod uživatele přes bránu sdílení a bránu NTFS práv',
        'Praxe v OS: Zřízení sdílené složky s omezením zápisu na Windows Serveru a její namapování na klientovi'
      ],
      builds: 'Oprávnění NTFS (OSS 1 – USR4), Síťové profily (OSS 1 – NET3).'
    },
    {
      slug: 'vzdalena-sprava',
      tag: 'SL4',
      title: 'Vzdálená správa: RDP a OpenSSH',
      hours: '2 h',
      subtitle: 'Správa serveru z tepla kanceláře: Vzdálená plocha RDP, správa portu 3389 a OpenSSH.',
      intro: 'K serveru do chladné serverovny se fyzicky nechodí. Naučíme se konfigurovat zabezpečený vzdálený přístup přes grafické rozhraní RDP i moderní textový OpenSSH server.',
      topics: [
        'Protokol RDP (Remote Desktop Protocol) a port 3389: povolení přístupu, oprávnění a limity relací',
        'Bezpečnostní rizika RDP: brute-force útoky z internetu, NLA (Network Level Authentication) a nutnost VPN',
        'Nástroj Připojení k vzdálené ploše (mstsc.exe) a jeho pokročilé volby (sdílení disků, schránky, tiskáren)',
        'OpenSSH server na platformě Windows: instalace volitelné funkce a správa přes port 22',
        'Konfigurace Windows Firewallu pro vzdálený přístup'
      ],
      practice: [
        'Simulace: Zabezpečení RDP brány – nastavení NLA a pravidla firewallu pro vybraný rozsah IP adres',
        'Praxe v OS: Povolení RDP na serveru, vzdálené připojení z klientské stanice přes mstsc a ověření otevřených relací'
      ],
      builds: 'Firewall (BZ5), Sítě (OSS 1).'
    },
    {
      slug: 'iis',
      tag: 'SL5',
      title: 'Webový server (IIS)',
      hours: '2 h',
      subtitle: 'Publikování intranetových stránek: instalace web serveru, porty 80 a 443 a certifikáty HTTPS.',
      intro: 'Webový server je klasická síťová služba. Nainstalujeme Microsoft IIS, umístíme vlastní HTML stránku do kořenového adresáře a zabezpečíme ji šifrovaným protokolem HTTPS.',
      topics: [
        'Role Internet Information Services (IIS) a výchozí kořenový adresář C:\\inetpub\\wwwroot',
        'Vazby webu (Bindings): kombinace IP adresy, portu (80 pro HTTP, 443 pro HTTPS) a názvu hostitele',
        'Protokol HTTPS: role digitálního certifikátu serveru (vlastnoručně podepsaný / Self-signed vs. CA)',
        'Pravidla firewallu pro webový provoz a testování dostupnosti z klientské stanice',
        'Základní diagnostika webu: protokoly v C:\\inetpub\\logs\\LogFiles a stavové kódy (200, 403, 404, 500)'
      ],
      practice: [
        'Simulace: Požadavek klienta – cesta paketu od zadání doménového jména po vrácení HTML kódu ze serveru',
        'Praxe v OS: Instalace role IIS na serveru, vytvoření vlastní uvítací stránky a její otevření z klienta přes prohlížeč'
      ],
      builds: 'DNS server (SL2), Firewall (BZ5), Certifikáty (BZ2).'
    },
    {
      slug: 'sql',
      tag: 'SL6',
      title: 'Databázový server (MS SQL Server)',
      hours: '2 h',
      subtitle: 'Správa databázového enginu z pohledu správce OS: instalace instance, síťový port 1433, autentizace a zálohování.',
      intro: 'Provoz podnikových systémů a webových aplikací stojí na databázích. Z pohledu správce operačního systému se naučíme nainstalovat instanci MS SQL Serveru, nakonfigurovat službu pod dedikovaným účtem, povolit TCP/IP komunikaci na portu 1433, nastavit Firewall a vytvořit zálohu (.bak).',
      topics: [
        'Role databázového serveru v OS: relační databáze (RDBMS), datové soubory (.mdf) a transakční logy (.ldf) na disku',
        'Instalace MS SQL Server Express / Developer: pojmenovaná instance (SQLEXPRESS) vs. výchozí instance, systémový účet služby',
        'Správce konfigurace sítě (SQL Server Configuration Manager): protokol TCP/IP a výchozí port 1433',
        'Režimy ověřování: Windows Authentication (integrované účty OS a domény) vs. Mixed Mode (účet sa)',
        'Pravidla Windows Firewallu pro port 1433 a vzdálené připojení klientských aplikací',
        'Správa a diagnostika přes SSMS / Azure Data Studio: připojení k instanci a vytvoření konzistentní zálohy do souboru .bak'
      ],
      practice: [
        'Simulace: Port a služba – diagnostika chybějící konektivity k SQL (ověření běhu služby MSSQLSERVER vs. blokovaný port 1433 na firewallu)',
        'Praxe v OS: Instalace SQL Server Express, povolení protokolu TCP/IP, otevření portu 1433 ve Windows Firewallu a vytvoření zálohy testovací databáze do souboru .bak'
      ],
      builds: 'Služby Windows (PK1), Firewall (BZ5), Webový server IIS (SL5), Zálohování (Blok 1).'
    }
  ]
};

/** Active Directory a centrální správa (~14 h) – doména, řadič DC, uživatelé, skupiny, připojení klientů, GPO a projekt. */
export const OSS2_AD: OutlineGroup = {
  chapterId: 'os2-ad',
  chapterTitle: 'Active Directory a centrální správa',
  chapterDescription: 'Podniková doména: řadič domény, organizační jednotky, uživatelé a skupiny, připojení stanic, skupinové politiky GPO a závěrečný projekt.',
  chapterTag: 'ad',
  chapterPath: `${BASE}/active-directory`,
  subjectTitle: SUBJECT,
  grade: 2,
  gradeLabel: '2. Ročník',
  thematicBlock: 'Active Directory a centrální správa',
  icon: 'Network',
  gradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      slug: 'server-a-domena',
      tag: 'AD1',
      title: 'Windows Server a co je doména',
      hours: '2 h',
      subtitle: 'Rozdíl mezi pracovní skupinou a podnikovou doménou, architektura klient-server.',
      intro: 'V pracovní skupině musíte každého uživatele zakládat na každém počítači zvlášť. V doméně existuje jedna centrální databáze na řadiči domény. Představíme si koncept Active Directory a rozhraní Windows Serveru.',
      topics: [
        'Limity Peer-to-Peer sítě (Pracovní skupina) při více než 5 počítačích',
        'Koncept podnikové domény: centrální adresářová služba Active Directory Domain Services (AD DS)',
        'Role řadiče domény (Domain Controller - DC) a replikace databáze NTDS.dit',
        'Rozhraní Windows Serveru a práce v konzoli Správce serveru (Server Manager)',
        'Předpoklady pro instalaci domény: pevná statická IP adresa a funkční DNS'
      ],
      practice: [
        'Simulace: Pracovní skupina vs. Doména – srovnání počtu kroků při změně hesla na 20 počítačích',
        'Praxe v OS: Prvotní seznámení se Správcem serveru, ověření statické IP adresy a instalace role AD DS'
      ],
      builds: 'Základní síťové služby (SL1, SL2), Konzole MMC (PK1).'
    },
    {
      slug: 'dns-a-radic',
      tag: 'AD2',
      title: 'Povýšení na řadič domény (DC)',
      hours: '2 h',
      subtitle: 'Zrození domény: povýšení serveru, vytvoření lesa a automatická registrace SRV záznamů v DNS.',
      intro: 'Nainstalovat roli nestačí, server musíme povýšit na řadič domény. Projdeme průvodcem vytvoření nového doménového lesa (např. firma.local) a ukážeme si, jak si řadič vytvoří v DNS své vlastní záznamy.',
      topics: [
        'Proces povýšení serveru na řadič domény (Promote to Domain Controller)',
        'Pojmy strom a les (Forest Root Domain) – volba doménového jména (FQDN, např. korporace.local)',
        'Heslo pro režim obnovení adresářových služeb (DSRM password)',
        'Vazba na DNS: záznamy typu SRV (Service Location) ve složce _msdcs (vyhledání Netlogon a Kerberos)',
        'Struktura databáze Active Directory: soubor ntds.dit a složka SYSVOL'
      ],
      practice: [
        'Simulace: DNS detektiv – odhalení chybějícího SRV záznamu, který brání přihlášení do domény',
        'Praxe v OS: Povýšení Windows Serveru na řadič nové domény a kontrola vygenerovaných DNS zón'
      ],
      builds: 'DNS server (SL2), Server a doména (AD1).'
    },
    {
      slug: 'uzivatele-skupiny',
      tag: 'AD3',
      title: 'Organizační jednotky (OU) a doménové účty',
      hours: '2 h',
      subtitle: 'Zrcadlo struktury podniku: tvorba oddělení (OU), doménových uživatelů a zásady hesel.',
      intro: 'V doméně spravujeme stovky lidí. Uspořádáme je do Organizačních jednotek (OU) kopírujících oddělení firmy a založíme doménové uživatele, kteří se přihlásí k jakémukoliv počítači v podniku.',
      topics: [
        'Konzole Uživatelé a počítače služby Active Directory (dsa.msc)',
        'Organizační jednotky (Organizational Units - OU): logické kontejnery pro aplikaci politik a delegaci správy',
        'Rozdíl mezi složkami (Containers např. Users, Computers) a Organizačními jednotkami (OU)',
        'Tvorba doménového účtu: uživatelské jméno (UPN login), doménové heslo, změna hesla při prvním přihlášení',
        'Zásady uzamčení účtu při opakovaném zadání chybného hesla (Account Lockout)'
      ],
      practice: [
        'Simulace: Návrh struktury firmy – vytvoření stromu OU pro střední firmu (Vedení, Obchod, IT, Výroba)',
        'Praxe v OS: Založení organizačních jednotek a hromadné vytvoření uživatelů daného oddělení'
      ],
      builds: 'Správa uživatelů (OSS 1 – USR1), Konzole MMC (PK1).'
    },
    {
      slug: 'sdileni-a-prava',
      tag: 'AD4',
      title: 'Skupiny a přístupová práva (Prakticky)',
      hours: '2 h',
      subtitle: 'Srozumitelná správa oprávnění: Uživatel ➔ Skupina ➔ Práva na sdílenou složku bez složité teorie.',
      intro: 'Zapomeňme na složité teoretické modely. V praxi se práva nikdy nedávají jednotlivcům: vytvoříme skupinu pro oddělení, přidáme do ní zaměstnance a skupině přiřadíme přístup k datům.',
      topics: [
        'Proč se práva v doméně NIKDY nepřiřazují přímo uživatelům (princip udržitelnosti správy)',
        'Typy skupin v doméně: Zabezpečení (Security Groups pro přidělování práv) vs. Distribuce (Distribution)',
        'Praktický model správy: Uživatel je členem skupiny oddělení (např. Skupina-Uctarna), skupina má práva ke složce',
        'Kombinace doménových skupin se sdílením SMB a právy NTFS na serveru',
        'Ověření efektivních přístupových práv uživatele v záložce Zabezpečení'
      ],
      practice: [
        'Simulace: Matice oprávnění – nastavení přístupu pro nového zaměstnance pouhým přidáním do správné skupiny',
        'Praxe v OS: Vytvoření bezpečnostních skupin pro oddělení firmy a nastavení přístupu ke sdíleným datům'
      ],
      builds: 'Souborový server SMB (SL3), Oprávnění NTFS (OSS 1 – USR4).'
    },
    {
      slug: 'klient-v-domene',
      tag: 'AD5',
      title: 'Připojení klientského PC do domény',
      hours: '2 h',
      subtitle: 'Kouzlo jednotného přihlášení: konfigurace DNS klienta, vstup do domény a síťový profil.',
      intro: 'Doména začne fungovat až ve chvíli, kdy k ní připojíme běžný počítač žáka. Nastavíme klientské Windows 11, propojíme je s řadičem a poprvé se přihlásíme doménovým účtem.',
      topics: [
        'Podmínka #1 pro připojení klienta: nastavení DNS klienta na IP adresu řadiče domény',
        'Připojení stanice do domény v Nastavení systému (dialog Vlastnosti systému ➔ Změnit doménu)',
        'Účet počítače (Computer Account) v Active Directory a jeho vztah k heslu stanice',
        'Přihlašovací obrazovka: přihlášení do domény (DOMENA\\uzivatel) vs. přihlášení k místnímu PC (.\\uzivatel)',
        'Vznik doménového uživatelského profilu na disku klienta (C:\\Users\\uzivatel.DOMENA)'
      ],
      practice: [
        'Simulace: Diagnostika selhání – 3 nejčastější důvody, proč stanice nenajde doménu (špatné DNS, čas, název)',
        'Praxe v OS: Připojení virtuálního klienta Windows 11 do vytvořené domény a přihlášení pod vytvořeným uživatelem'
      ],
      builds: 'Instalace řadiče (AD2), DNS (SL2), Síťové adaptéry (OSS 1 – NET1).'
    },
    {
      slug: 'gpo',
      tag: 'AD6',
      title: 'Skupinové politiky (Group Policy – GPO)',
      hours: '2 h',
      subtitle: 'Jeden příkaz vládne všem: centrální zákaz USB, bezpečnost hesel, jednotná plocha a mapování disků.',
      intro: 'Jak přinutit 200 počítačů ve firmě, aby měly stejné pozadí, zablokované flash disky a automaticky připojený síťový disk Z:? Pomocí Group Policy. Nastavíme politiku jednou na serveru a systém ji automaticky vnutí všem stanicím.',
      topics: [
        'Co je Group Policy Object (GPO) a konzole Správa zásad skupiny (gpmc.msc)',
        'Rozsah zásad: Konfigurace počítače (platí pro stanici) vs. Konfigurace uživatele',
        'Propojení zásad s Organizačními jednotkami (OU Link) a pořadí aplikace politik (LSDOU)',
        'Klíčová praktická nastavení: zákaz USB disků, jednotná tapeta, zákaz Ovládacích panelů, mapování disku',
        'Vynucení a ověření zásad na klientovi: příkazy gpupdate /force a výpis aplikovaných politik gpresult /r'
      ],
      practice: [
        'Simulace: Která politika vyhraje? – sledování konfliktu dvou politik s různou prioritou',
        'Praxe v OS: Vytvoření a aplikace GPO politiky pro zákaz USB a automatické připojení síťového disku oddělení'
      ],
      builds: 'Organizační jednotky OU (AD3), Sdílení a SMB (SL3), Místní zásady (PK1).'
    },
    {
      slug: 'zaloha-a-projekt',
      tag: 'AD7',
      title: 'Závěrečný integrující projekt: Podniková síť',
      hours: '3 h',
      subtitle: 'Malá firma od A do Z: Server s DHCP, DNS a doménou, klient, dvě oddělení a funkční GPO restrikce.',
      intro: 'Vrchol celého 2. ročníku. Přesně podle vzoru zkoušek na SŠ Horažďovice postavíme kompletní fungující podnikovou infrastrukturu od nuly a ověříme její bezpečnost a funkčnost.',
      topics: [
        'Zadání komplexní infrastruktury: fiktivní firma „TechCorp s.r.o.“ s ředitelstvím a obchodem',
        'Krok 1: Serverové služby – statická IP, aktivní DHCP pro stanice, funkční DNS zóna',
        'Krok 2: Doména Active Directory – řadič domény, vytvoření OU struktury, založení uživatelů a skupin',
        'Krok 3: Sdílená data – zřízení oddělených síťových složek pro Vedení a Obchod s přesnými právy',
        'Krok 4: Skupinové politiky (GPO) – zákaz USB disků a automatické namapování disku Z: pro příslušné oddělení',
        'Krok 5: Klientská stanice – připojení klienta přes DHCP a DNS do domény, ověření přihlášení a funkčnosti omezení'
      ],
      practice: [
        'Praktický laboratorní projekt: Samostatné zprovoznění celé infrastruktury ve dvojicích ve virtuálním prostředí',
        'Akceptační test: Učitel provede auditní kontrolu (login uživatele, ověření práv na složku, pokus o vložení USB, výpis gpresult)'
      ],
      builds: 'Syntéza všech témat OSS 2: Zálohování (B1-B5), Bezpečnost (BZ1-BZ9), Pokročilá správa (PK1-PK5), Služby (SL1-SL5) a AD (AD1-AD6).'
    }
  ]
};

export const OSS2_GROUPS: OutlineGroup[] = [
  OSS2_BEZPECNOST,
  OSS2_POKROCILA,
  OSS2_SLUZBY,
  OSS2_AD
];
