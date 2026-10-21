import type { OutlineGroup } from './outlineTypes';

const SUBJECT = 'Operační systémy 2';
const BASE = '/specializovana/operacni-systemy-2';

/**
 * Bezpečnost 1 – pokračování za hotovými BZ1 a BZ2 (ty mají plnou stránku, proto zde nejsou).
 * Pořadí odpovídá učitelově osnově: Sandbox → Antivir → Firewall → Šifrování → Účty → Síť a hesla → CTF.
 */
/**
 * Bezpečnost 1 – pokračování za hotovými BZ1 a BZ2 (ty mají plnou interaktivní stránku, proto zde nejsou).
 * Pořadí odpovídá osnově: Registr a persistence → Žurnál událostí → Sandbox a Antivir → Firewall → Šifrování → Účty → Síť a hesla → CTF.
 */
export const OSS2_BEZPECNOST: OutlineGroup = {
  chapterId: 'os2-bezpecnost',
  chapterTitle: 'Bezpečnost 1',
  chapterDescription: 'Zabezpečení Windows 11, forenzní analýza procesů, registr, žurnál událostí, Sandbox, Defender, Firewall a šifrování.',
  chapterTag: 'sec',
  chapterPath: `${BASE}/bezpecnost`,
  subjectTitle: SUBJECT,
  grade: 2,
  gradeLabel: '2. Ročník',
  thematicBlock: 'Bezpečnost koncových zařízení, audit a forenzní analýza',
  icon: 'ShieldCheck',
  gradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      slug: 'registr',
      tag: 'BZ3',
      order: 3,
      icon: 'FileCode',
      title: 'Systémový registr a persistence škodlivého kódu',
      hours: '2 h',
      subtitle: 'Hierarchie klíčů pro počítač a uživatele, autorun spouštění po startu a soubory .reg.',
      intro: 'Téměř každý škodlivý kód se potřebuje v systému udržet i po restartu. Prozkoumáme hierarchii registru, klíčové větve HKLM a HKCU a místa, kam útočníci ukrývají mechanismy persistence (klíče Run, RunOnce a úlohy po startu).',
      topics: [
        'Účel a hierarchie registru Windows: soubory úlů (Hives) v System32\\config a uživatelském profilu',
        'Větve HKEY_LOCAL_MACHINE (stroj) vs. HKEY_CURRENT_USER (přihlášený uživatel)',
        'Kde se malware ukrývá po startu: klíče Run, RunOnce, Winlogon a nástroj Sysinternals Autoruns',
        'Datové typy hodnot: REG_SZ (text), REG_DWORD (čísla/přepínače 0/1) a nebezpečné binární payloady',
        'Záloha, export a import konfigurace (.reg soubory pro hromadnou distribuci nastavení i záchranu)'
      ],
      practice: [
        'Simulace: Rentgen registru – odhalení podezřelé persistence zapsané škodlivým skriptem',
        'Praxe v OS: Bezpečný export vybrané větve do .reg, analýza klíčů Run v regedit.exe a odstranění neautorizované položky'
      ],
      builds: 'BZ1 (malware), BZ2 (procesy).'
    },
    {
      slug: 'udalosti',
      tag: 'BZ4',
      order: 4,
      icon: 'Eye',
      title: 'Systémový žurnál událostí a bezpečnostní audit',
      hours: '2 h',
      subtitle: 'Prohlížeč událostí: auditní logy přihlášení, detekce útoků brute-force a filtrace stop.',
      intro: 'Když útočník zkouší prolomit heslo nebo malware selže, zanechá záznam v systémovém žurnálu událostí. Naučíme se číst bezpečnostní protokoly a filtrovat klíčová Event ID pro odhalení incidentu.',
      topics: [
        'Architektura Windows Event Log (služba eventlog) a bezpečnostní audit',
        'Tři základní protokoly: Systém (hardware, ovladače), Aplikace (pády programů), Zabezpečení (audity)',
        'Klíčová Event ID pro bezpečnostního technika: úspěšné přihlášení (4624), neúspěšné přihlášení / brute-force (4625), smazání logu (1102)',
        'Filtrování a tvorba vlastních zobrazení (Custom Views) v eventvwr.msc',
        'Napojení automatické reakce (úlohy v Task Scheduleru) na výskyt konkrétní bezpečnostní události'
      ],
      practice: [
        'Simulace: Stopař incidentů – odhalení pokusu o neoprávněné přihlášení v časové ose logu',
        'Praxe v OS: Vyfiltrování neúspěšných přihlášení v protokolu Zabezpečení a vytvoření vlastního auditního filtru'
      ],
      builds: 'BZ2 (procesy), BZ3 (registr).'
    },
    {
      slug: 'izolace',
      tag: 'BZ5',
      order: 5,
      icon: 'Layers',
      title: 'Izolované testovací prostředí (Sandbox) a antivirus',
      hours: '2 h',
      subtitle: 'Bezpečné spuštění podezřelého programu v Sandboxu a ochrana systémovým antivirem.',
      intro: 'Podezřelý soubor nikdy nespouštíme na ostrém počítači – uzavřeme ho do jednorázového Windows Sandboxu. Seznámíme se s principy detekce antiviru (signatury, heuristika, cloud) a bezpečným testem EICAR.',
      topics: [
        'Princip izolace a karantény: technologie Windows Sandbox (lehký Hyper-V kontejner)',
        'Tři pilíře antivirové detekce: signatury známých hrozeb, heuristika a behaviorální analýza v reálném čase',
        'Cloudová ochrana a reputační cloud Microsoft Defender SmartScreen',
        'Bezpečný testovací soubor EICAR pro ověření funkčnosti antiviru',
        'Správa výjimek a rizik jejich zneužití'
      ],
      practice: [
        'Simulace: Sandbox vs. hostitelský počítač – test zachycení škodlivého chování',
        'Praxe v OS: Otestování reakce Defenderu pomocí řetězce EICAR a konfigurace základních pravidel ochrany'
      ],
      builds: 'BZ1 (malware), BZ2 (Authenticode).'
    },
    {
      slug: 'firewall',
      tag: 'BZ6',
      order: 6,
      icon: 'Network',
      title: 'Paketový firewall na koncovém zařízení',
      hours: '2 h',
      subtitle: 'Pravidla pro příchozí a odchozí komunikaci, porty a sledování aktivních spojení.',
      intro: 'Firewall rozhoduje, které pakety projdou ze sítě do počítače a naopak. Naučíme se číst porty, propojit síťový port s konkrétním procesem a psát vlastní ochranná pravidla.',
      topics: [
        'Stavový paketový firewall, příchozí vs. odchozí směr komunikace',
        'Porty a transportní protokoly (TCP, UDP, ICMP pro ping)',
        'Propojení síťového portu s konkrétním procesem v CLI: příkaz netstat -ano',
        'Tvorba vlastních bezpečnostních pravidel v pokročilé konzoli wf.msc'
      ],
      practice: [
        'Simulace: Stavba pravidel firewallu a průchod síťových paketů',
        'Praxe v OS: Zablokování odezvy na ping (ICMP echo) a zablokování odchozí komunikace vybraného programu'
      ],
      builds: 'Sítě (OSS 1), BZ1 (síťový červ).'
    },
    {
      slug: 'sifrovani',
      tag: 'BZ7',
      order: 7,
      icon: 'Lock',
      title: 'Diskové šifrování BitLocker a TPM čip',
      hours: '2 h',
      subtitle: 'Ochrana dat v klidu: BitLocker, čip TPM 2.0 a obrana proti ransomwaru.',
      intro: 'Odcizený disk nesmí znamenat únik citlivých dat. Šifrování disku pomocí BitLockeru sváže data s bezpečnostním čipem TPM a spolu s ochranou složek brání neautorizovaným zásahům ransomwaru.',
      topics: [
        'Ochrana dat v klidu (Data at Rest) vs. šifrování komunikace v síti',
        'BitLocker, hardwarový bezpečnostní čip TPM 2.0 a generování záchranného obnovovacího klíče',
        'Šifrování výměnných USB disků (BitLocker To Go)',
        'Řízený přístup ke složkám (Controlled Folder Access) jako obrana proti ransomwaru'
      ],
      practice: [
        'Simulace: Odcizený disk s BitLockerem vs. nechráněný disk',
        'Praxe v OS: Zašifrování USB flash disku s exportem záchranného klíče a konfigurace ochrany složek'
      ],
      builds: 'Zálohování (Blok 1), ransomware v BZ1.'
    },
    {
      slug: 'ucty',
      tag: 'BZ8',
      order: 8,
      icon: 'Cog',
      title: 'Správa uživatelských účtů, UAC a aktualizace (0-day)',
      hours: '2 h',
      subtitle: 'Princip nejmenších práv (PoLP), řízení UAC, servisní cykly záplat a hromadná údržba.',
      intro: 'Většina škod vznikne proto, že program běží s právy správce. Mechanismy UAC omezují práva aplikací a pravidelné servisní aktualizace zalepují známé zranitelnosti systému.',
      topics: [
        'Princip nejmenších nutných oprávnění (PoLP) a oddělení správcovských úkonů',
        'Fungování řízení uživatelských účtů UAC (omezený standardní token vs. plný token správce)',
        'Servisní cykly aktualizací, záplaty a princip zranitelností nultého dne (0-day)',
        'Hromadná aktualizace nainstalovaného softwaru přes správce balíčků (winget upgrade --all)'
      ],
      practice: [
        'Simulace: Jak tokeny UAC rozhodují o zobrazení výzvy k povýšení oprávnění',
        'Praxe v OS: Nastavení úrovně UAC a spuštění hromadného bezpečnostního auditu a updatu přes winget'
      ],
      builds: 'Správa uživatelů (OSS 1 – USR1), BZ2 (procesy).'
    },
    {
      slug: 'sit-hesla',
      tag: 'BZ9',
      order: 9,
      icon: 'Search',
      title: 'Sociální inženýrství, phishing a ochrana identity',
      hours: '2 h',
      subtitle: 'Phishing, silná hesla, vícefaktorové ověřování MFA a etický hacking.',
      intro: 'Nejslabším článkem bezpečnosti bývá lidský faktor. Naučíme se rozpoznat podvodný phishingový e-mail v hlavičkách zpráv, vytvářet odolná hesla a zabezpečit identitu vícefaktorovým ověřením.',
      topics: [
        'Metody sociálního inženýrství a analýza podvodných e-mailů (hlavičky, podvržené domény)',
        'Síla hesla, entropie a bezpečné ukládání v offline správcích hesel',
        'Vícefaktorové ověřování (MFA / 2FA): autentizační aplikace vs. hardwarové FIDO2 klíče',
        'Základní principy uvažování etického hackera při obraně podnikové infrastruktury'
      ],
      practice: [
        'Simulace: Forenzní detektiv – rozbor reálného podvodného e-mailu a nalezení podvržené adresy',
        'Praxe v OS: Kontrola kompromitovaných přihlašovacích údajů a konfigurace vícefaktorového ověření'
      ],
      builds: 'BZ1 (spyware a keyloggery).'
    },
    {
      slug: 'ctf',
      tag: 'BZ10',
      order: 10,
      icon: 'Eye',
      title: 'Vyšetřování bezpečnostního incidentu (Mini-CTF)',
      hours: '2 h',
      subtitle: 'Komplexní incident response: detekce, izolace, vyčištění a sepsání Incident Reportu.',
      intro: 'Vyvrcholení celého bezpečnostního bloku. Na připraveném simulovaném systému žák v roli bezpečnostního technika detekuje útok, izoluje stanici na firewallu, dohledá stopy v registru a logu a vypracuje incident report.',
      topics: [
        'Čtyři fáze reakce na incident (Incident Response): Detekce ➔ Izolace ➔ Odstranění ➔ Čištění a obnova',
        'Kombinovaná forenzní analýza: Process Explorer, Registr Run klíče, Event Viewer ID 4625 a Firewall',
        'Sepsání formálního protokolu o bezpečnostním zásahu (Incident Response Report)',
        'Týmová spolupráce při vyšetřování incidentu'
      ],
      practice: [
        'Praktická laboratorní hra (Mini-CTF): Nalezení bezpečnostních flagů na kompromitované stanici',
        'Zpracování a odevzdání protokolu o zásahu a doporučených opatřeních pro vedení firmy'
      ],
      builds: 'Syntéza všech témat BZ1 až BZ9.'
    }
  ]
};

/** Systémové služby a skriptování v PowerShellu (18 h) – správa služeb na pozadí, konzole MMC a administrační skriptování. */
export const OSS2_POKROCILA: OutlineGroup = {
  chapterId: 'os2-pokrocila',
  chapterTitle: 'Systémové služby a skriptování v PowerShellu',
  chapterDescription: 'Nástroje správce: konzole MMC, služby na pozadí, skriptování v PowerShellu a automatizované reporty.',
  chapterTag: 'adv',
  chapterPath: `${BASE}/pokrocila-konfigurace`,
  subjectTitle: SUBJECT,
  grade: 2,
  gradeLabel: '2. Ročník',
  thematicBlock: 'Systémové služby a administrační skriptování (PowerShell)',
  icon: 'Wrench',
  gradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      slug: 'sluzby',
      tag: 'PK1',
      title: 'Systémové služby Windows na pozadí a jejich životní cyklus',
      hours: '4 h',
      subtitle: 'Koncepce procesů bez interaktivního přihlášení běžících pod účtem SYSTEM.',
      intro: 'Systémové služby tvoří páteř operačního systému. Běží nezávisle na tom, zda je uživatel přihlášen. Naučíme se typy spouštění, účty služeb, řešení závislostí a konfiguraci automatického zotavení po selhání.',
      topics: [
        'Služby Windows vs. běžné interaktivní aplikace (běh na pozadí bez nutnosti GUI)',
        'Systémové běžící účty: NT AUTHORITY\\SYSTEM, Local Service a Network Service',
        'Typy spouštění: Automaticky, Ručně (Manual), Zakázáno (Disabled) a automaticky se zpožděním',
        'Řešení závislostí služeb a konfigurace automatického restartu po selhání',
        'Správa služeb z příkazového řádku: příkazy net start/stop a utilita sc.exe'
      ],
      practice: [
        'Simulace: Trenažér závislostí služeb – co nastane při výpadku závislé síťové komponenty',
        'Praxe v OS: Rekonfigurace služby na automatický restart po selhání a kontrola spuštění v services.msc'
      ],
      builds: 'Procesy (OSS 1), BZ2 (svchost.exe a služby).'
    },
    {
      slug: 'mmc',
      tag: 'PK2',
      title: 'Konzole správce (MMC) a centrální správa',
      hours: '4 h',
      subtitle: 'Sjednocené rozhraní snap-inů: sestavení vlastní administrátorské konzole na míru.',
      intro: 'Profesionální správce nepotřebuje otevírat deset samostatných oken. Pomocí Microsoft Management Console (MMC) si poskládá vlastní modulární pracovní nástroj.',
      topics: [
        'Architektura Microsoft Management Console (mmc.exe) a princip rozšiřujících modulů (Snap-inů)',
        'Základní snap-iny pro správce: Služby, Správa počítače, Prohlížeč událostí, Místní zásady',
        'Režimy konzole: Autorský režim vs. Uživatelský režim s omezeným přístupem',
        'Uložení vlastní konzole do souboru .msc pro rychlou rutinní administraci stanice'
      ],
      practice: [
        'Simulace: Sestavování vlastní konzole pro technickou podporu stanic',
        'Praxe v OS: Vytvoření administrátorské konzole MojeSprava.msc obsahující vybrané diagnostické nástroje'
      ],
      builds: 'Služby Windows (PK1).'
    },
    {
      slug: 'powershell',
      tag: 'PK3',
      title: 'PowerShell: Objektový shell, syntaxe cmdletů a roury',
      hours: '4 h',
      subtitle: 'Moderní příkazová řádka správce: konec prostého textu, nástup objektů a roury |.',
      intro: 'Zatímco staré CMD předávalo pouze textové řádky, PowerShell pracuje se skutečnými .NET objekty. Naučíme se syntaxi Sloveso-PodstatnéJméno, zjišťování nápovědy a magickou rouru objektů.',
      topics: [
        'Proč PowerShell nahradil CMD: objektový model .NET vs. prostý textový proud',
        'Syntaxe cmdletů: Sloveso-PodstatnéJméno (Verb-Noun, např. Get-Service, Stop-Process)',
        'Tři zlaté cmdlety správce: Get-Command, Get-Help (-Full, -Examples) a Get-Member',
        'Objektová roura (Pipeline |): předávání celých vlastností objektu bez nutnosti parsování textu',
        'Filtrování a výběr dat: cmdlety Where-Object a Select-Object'
      ],
      practice: [
        'Simulace: Pipeline Explorer – sledování transformace a filtrace systémových objektů v rouře',
        'Praxe v OS: Vyhledání běžících procesů s vysokou spotřebou RAM a jejich naformátování do tabulky v PowerShellu'
      ],
      builds: 'Příkazová řádka CMD (OSS 1).'
    },
    {
      slug: 'powershell-sprava',
      tag: 'PK4',
      title: 'Administrační skriptování v PowerShellu (.ps1)',
      hours: '4 h',
      subtitle: 'Tvorba skriptů, proměnné, cykly, bezpečnostní politika ExecutionPolicy a podepisování.',
      intro: 'Jak správce ušetří hodiny rutinního klikání? Napíše si skript. Naučíme se hromadně spravovat služby, řešit bezpečnostní politiku ExecutionPolicy a vytvářet autonomní skripty.',
      topics: [
        'Hromadná správa: Start-Service, Stop-Service s využitím roury',
        'Práce se souborovým systémem: Get-ChildItem, Copy-Item, Remove-Item a zástupné znaky',
        'Tvorba skriptů .ps1: proměnné ($), cykly (foreach), podmínky (if) a předávání parametrů',
        'Bezpečnostní politika ExecutionPolicy: Restricted vs. RemoteSigned a zásady podepisování skriptů'
      ],
      practice: [
        'Simulace: Inspekční skript – automatická kontrola stavu kritických služeb',
        'Praxe v OS: Vytvoření skriptu pro kontrolu a automatický restart zamrzlé služby'
      ],
      builds: 'PowerShell základy (PK3) a Dávkové soubory (OSS 1 – BAT1).'
    },
    {
      slug: 'reporty',
      tag: 'PK5',
      title: 'Automatizovaný sběr dat a generování stavových reportů',
      hours: '2 h',
      subtitle: 'Diagnostika hardware a konfigurace stanice s exportem do formátů CSV a HTML.',
      intro: 'Správce musí mít přehled o stavu svěřených počítačů. Vytvoříme skript, který získá informace o disku, paměti RAM a běžících službách a automaticky vygeneruje HTML auditní report.',
      topics: [
        'Cmdlety pro zjištění stavu systému: Get-ComputerInfo, Get-Volume, Get-Process',
        'Transformace datových objektů do formátovaných výstupů: ConvertTo-Html, Export-Csv',
        'Stylování vygenerovaného HTML reportu pomocí CSS hlavičky',
        'Automatizace spouštění inspekčního skriptu přes Plánovač úloh (Task Scheduler)'
      ],
      practice: [
        'Simulace: Reportér stavu – sestavení přehledného manažerského reportu',
        'Praxe v OS: Vytvoření inspekčního PowerShell skriptu generujícího barevný HTML auditní report o stavu stanice'
      ],
      builds: 'PowerShell skripty (PK4).'
    }
  ]
};

/** Síťové sdílení a centrální správa v doméně (18 h) – sdílení SMB, RDP, doména, připojení stanice, GPO a projekt. */
export const OSS2_AD: OutlineGroup = {
  chapterId: 'os2-ad',
  chapterTitle: 'Síťové sdílení a centrální správa v doméně',
  chapterDescription: 'Sdílení prostředků SMB, vzdálená správa RDP, připojení klienta do domény, uplatnění politik GPO a závěrečný projekt.',
  chapterTag: 'dom',
  chapterPath: `${BASE}/active-directory`,
  subjectTitle: SUBJECT,
  grade: 2,
  gradeLabel: '2. Ročník',
  thematicBlock: 'Síťové sdílení prostředků, vzdálená správa a centrální správa v doméně',
  icon: 'Network',
  gradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      slug: 'smb',
      tag: 'AD1',
      title: 'Síťové sdílení složek a efektivní přístupová práva (SMB)',
      hours: '4 h',
      subtitle: 'Centrální datové úložiště: sdílení složek, oprávnění a automatické připojení diskové jednotky.',
      intro: 'Místo posílání souborů e-mailem vytvoříme centrální sdílené úložiště. Nastavíme sdílené složky pro jednotlivá oddělení, vyladíme kombinaci práv a namapujeme je klientům jako síťové disky.',
      topics: [
        'Protokol SMB (Server Message Block) a princip souborového serveru',
        'Zápis síťové cesty UNC (Universal Naming Convention): \\\\Server\\SdilenyProstredek',
        'Dvojí brána zabezpečení: Oprávnění ke sdílení (Share Permissions) vs. NTFS oprávnění k souborům',
        'Mapování síťového disku na písmeno (Z:) v GUI a přes příkazový řádek (net use Z: \\\\server\\slozka)',
        'Skrytá administrativní sdílení (C$, ADMIN$, IPC$)'
      ],
      practice: [
        'Simulace: Vyhodnocení přístupu – průchod uživatele přes bránu sdílení a bránu NTFS práv',
        'Praxe v OS: Zřízení sdílené složky s omezením zápisu a její namapování na klientovi jako trvalé diskové jednotky'
      ],
      builds: 'Oprávnění NTFS (OSS 1 – USR4), Síťové profily (OSS 1 – NET3).'
    },
    {
      slug: 'vzdalena-sprava',
      tag: 'AD2',
      title: 'Zabezpečená vzdálená správa pracovní plochy (RDP)',
      hours: '2 h',
      subtitle: 'Správa klientské stanice na dálku: Vzdálená plocha RDP, správa portu 3389 a zabezpečení NLA.',
      intro: 'K počítačům uživatelů není třeba běhat osobně. Naučíme se konfigurovat zabezpečený vzdálený přístup přes grafické rozhraní RDP a porozumíme bezpečnostnímu ověřování NLA.',
      topics: [
        'Protokol RDP (Remote Desktop Protocol) a port 3389: povolení přístupu, oprávnění a limity relací',
        'Bezpečnostní rizika RDP: brute-force útoky z internetu, NLA (Network Level Authentication) a nutnost VPN',
        'Nástroj Připojení k vzdálené ploše (mstsc.exe) a jeho pokročilé volby (sdílení disků, schránky, tiskáren)',
        'Konfigurace Windows Firewallu pro vzdálený přístup a autorizace uživatelů ve skupině Remote Desktop Users'
      ],
      practice: [
        'Simulace: Zabezpečení RDP brány – nastavení NLA a pravidla firewallu pro autorizované uživatele',
        'Praxe v OS: Povolení RDP na klientské stanici, vzdálené připojení přes mstsc a ověření aktivních relací'
      ],
      builds: 'Firewall (BZ5), Sítě (OSS 1).'
    },
    {
      slug: 'server-a-domena',
      tag: 'AD3',
      title: 'Koncept podnikové infrastruktury a domény',
      hours: '2 h',
      subtitle: 'Rozdíl mezi decentralizovanou pracovní skupinou a podnikovou doménou Active Directory.',
      intro: 'V pracovní skupině musíte každého uživatele zakládat na každém počítači zvlášť. V doméně existuje jedna centrální databáze na řadiči domény. Představíme si koncept Active Directory a architekturu klient-server.',
      topics: [
        'Limity Peer-to-Peer sítě (Pracovní skupina) při více než 5 počítačích',
        'Koncept podnikové domény: centrální adresářová služba Active Directory Domain Services (AD DS)',
        'Role řadiče domény (Domain Controller - DC) a centrální autentizace (Kerberos)',
        'Předpoklady pro doménovou komunikaci: správná konfigurace DNS pro vyhledání domény'
      ],
      practice: [
        'Simulace: Pracovní skupina vs. Doména – srovnání počtu kroků při změně hesla na 20 počítačích',
        'Praxe v OS: Analýza doménové architektury a ověření síťové dostupnosti doménových služeb'
      ],
      builds: 'Sdílení SMB (AD1), Síťové adaptéry (OSS 1 – NET1).'
    },
    {
      slug: 'klient-v-domene',
      tag: 'AD4',
      title: 'Klientská stanice v podnikové doméně a uživatelské profily',
      hours: '4 h',
      subtitle: 'Kouzlo jednotného přihlášení: konfigurace DNS klienta, vstup do domény a síťový profil.',
      intro: 'Doména začne fungovat ve chvíli, kdy k ní připojíme běžný klientský počítač. Nastavíme Windows 11, propojíme je s řadičem a poprvé se přihlásíme doménovým účtem s vlastním profilem.',
      topics: [
        'Podmínka #1 pro připojení klienta: nastavení DNS klienta na IP adresu řadiče domény',
        'Připojení stanice do domény v Nastavení systému (dialog Vlastnosti systému ➔ Změnit doménu)',
        'Účet počítače (Computer Account) v Active Directory a jeho vztah k heslu stanice',
        'Přihlašovací obrazovka: přihlášení do domény (DOMENA\\uzivatel) vs. přihlášení k místnímu PC (.\\uzivatel)',
        'Vznik doménového uživatelského profilu na disku klienta (C:\\Users\\uzivatel.DOMENA)'
      ],
      practice: [
        'Simulace: Diagnostika selhání – 3 nejčastější důvody, proč stanice nenajde doménu (špatné DNS, čas, název)',
        'Praxe v OS: Připojení virtuálního klienta Windows 11 do domény a přihlášení pod doménovým uživatelem'
      ],
      builds: 'Koncept domény (AD3), DNS (OSS 1), Síťové adaptéry (OSS 1 – NET1).'
    },
    {
      slug: 'gpo',
      tag: 'AD5',
      title: 'Skupinové politiky (Group Policy – uplatnění na stanici)',
      hours: '4 h',
      subtitle: 'Jeden příkaz vládne všem: centrální zákaz USB, bezpečnost hesel, jednotná plocha a mapování disků.',
      intro: 'Jak přinutit stovky počítačů ve firmě, aby měly stejné pozadí, zablokované flash disky a automaticky připojený síťový disk Z:? Pomocí Group Policy. Centrální politika se automaticky vnutí všem stanicím v síti.',
      topics: [
        'Co je Group Policy Object (GPO) a jak se zásady aplikují na klientské počítače',
        'Rozsah zásad: Konfigurace počítače (platí pro stanici) vs. Konfigurace uživatele',
        'Klíčová praktická nastavení: zákaz USB disků, jednotná tapeta, zákaz Ovládacích panelů, mapování disku',
        'Vynucení a ověření zásad na klientovi: příkazy gpupdate /force a výpis aplikovaných politik gpresult /r'
      ],
      practice: [
        'Simulace: Která politika vyhraje? – sledování konfliktu politik a pořadí uplatňování',
        'Praxe v OS: Ověření uplatnění bezpečnostní GPO politiky pro zákaz USB a kontrola výstupu gpresult /r'
      ],
      builds: 'Klientská stanice v doméně (AD4), Sdílení SMB (AD1).'
    },
    {
      slug: 'zaloha-a-projekt',
      tag: 'AD6',
      title: 'Závěrečný integrující projekt administrace stanice',
      hours: '2 h',
      subtitle: 'Komplexní konfigurace stanice: síť, sdílení, zálohování, doména, GPO restrikce a obhajoba.',
      intro: 'Vrchol celého 2. ročníku. Postavíme a nakonfigurujeme kompletní klientskou stanici Windows 11 v podnikovém prostředí, integrujeme bezpečnostní a zálohovací mechanismy a své řešení obhájíme.',
      topics: [
        'Zadání komplexní konfigurace: firemní stanice v podnikové síti',
        'Krok 1: Klientská stanice a síť – ověření adresace a konektivity',
        'Krok 2: Připojení do domény – autentizace a profil uživatele',
        'Krok 3: Sdílená data – zřízení a připojení síťových disků SMB s přesnými právy',
        'Krok 4: Skupinové politiky (GPO) – ověření restrikcí USB disků a aplikovaných pravidel',
        'Krok 5: Zálohování a bezpečnost – kontrola šifrování, firewallu a zálohovacího skriptu'
      ],
      practice: [
        'Praktický laboratorní projekt: Samostatné zprovoznění a zabezpečení stanice ve virtuálním prostředí',
        'Akceptační test: Učitel provede auditní kontrolu (login uživatele, ověření práv na složku, pokus o vložení USB, výpis gpresult)'
      ],
      builds: 'Syntéza všech témat OSS 2: Zálohování (Blok 1), Bezpečnost (Blok 2), PowerShell (Blok 3) a Síťové sdílení a doména (Blok 4).'
    }
  ]
};

export const OSS2_GROUPS: OutlineGroup[] = [
  OSS2_BEZPECNOST,
  OSS2_POKROCILA,
  OSS2_AD
];
