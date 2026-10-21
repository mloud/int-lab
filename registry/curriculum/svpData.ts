// =========================================================================
// ŠKOLNÍ VZDĚLÁVACÍ PROGRAM (ŠVP) PRO INSPIS – OPERAČNÍ SYSTÉMY (1.–3. ROČNÍK)
// Obor: 18-20-M/01 Informační technologie
// Celková dotace: 198 hodin (OSS 1: 66 h · OSS 2: 66 h · OSS 3: 66 h)
// Formát: Struktura Česká školní inspekce (InspIS ŠVP)
// =========================================================================

export interface SvpOutcomeBlock {
  id: string;
  topic: string;
  outcomes: string[];
  content: string[];
  crossThemes: string[];
  hours: number;
}

export interface SvpGradeData {
  gradeLabel: string;
  gradeCode: string;
  totalHours: number;
  blocks: SvpOutcomeBlock[];
}

export interface SvpSharedInfo {
  subjectName: string;
  fieldCode: string;
  fieldName: string;
  evaluation: string;
  keyCompetencies: {
    title: string;
    description: string;
  }[];
  crossCuttingThemes: {
    code: string;
    name: string;
    description: string;
  }[];
  interdisciplinaryRelations: string;
}

// -------------------------------------------------------------------------
// SPOLEČNÁ ČÁST PŘEDMĚTU PRO INSPIS (Všechny 3 ročníky)
// -------------------------------------------------------------------------
export const SVP_SHARED_INFO: SvpSharedInfo = {
  subjectName: 'Operační systémy',
  fieldCode: '18-20-M/01',
  fieldName: 'Informační technologie',
  evaluation:
    'Kritéria hodnocení vychází z pravidel pro hodnocení výsledků vzdělávání žáků střední školy. ' +
    'Hodnocení je numerické i slovní a probíhá průběžně i po skončení ucelených tematických bloků. ' +
    'Hodnotí se zejména praktické dovednosti – je systematicky ověřováno, zda žáci správně zvládli technologické postupy ' +
    'při instalaci, konfiguraci, zabezpečení a správě operačních systémů. Úroveň znalostí je zjišťována ' +
    'praktickými zkouškami u počítače, vypracováním laboratorních protokolů, ústním i písemným ověřováním. ' +
    'Důraz je kladen na samostatnost při řešení problémů, aktivitu během praktických cvičení, dodržování bezpečnostních ' +
    'zásad (zálohování, ochrana přístupových údajů, PoLP) a schopnost obhájit technické řešení v závěrečném projektu.',
  keyCompetencies: [
    {
      title: 'Kompetence k učení',
      description:
        'Žák je veden k hlubšímu pochopení principů fungování operačních systémů, k samostatnému vyhledávání, ' +
        'třídění a kritickému využívání technických informací a k propojování teoretických poznatků s praktickou administrací. ' +
        'Učí se pracovat s oficiální technickou dokumentací, manuálovými stránkami (man, help) a odbornou literaturou ' +
        'v českém i anglickém jazyce a reflektovat vlastní postupy při řešení zadaných úkolů.'
    },
    {
      title: 'Komunikativní kompetence',
      description:
        'Formuluje své myšlenky a postupy při řešení administrativních a bezpečnostních úloh, přesně využívá ' +
        'odbornou IT terminologii a spolupracuje při týmovém řešení komplexních úkolů. Je veden k srozumitelné ' +
        'prezentaci výsledků své práce, a to jak ústně, tak písemně prostřednictvím technických zpráv, protokolů ' +
        'a tiketů v agilním řízení. Rozumí odbornému textu a chybovým hlášením operačního systému v anglickém jazyce.'
    },
    {
      title: 'Kompetence k řešení problémů',
      description:
        'Žák identifikuje, analyzuje a diagnostikuje chybové a nestandardní stavy operačního systému, aktivních síťových prvků ' +
        'a serverových služeb. Učí se postupovat systematicky podle vrstveného diagnostického modelu, vyhodnocovat logy ' +
        'a systémové žurnály a nést odpovědnost za zvolený postup opravy. Využívá logické myšlení, předešlé zkušenosti ' +
        'a je schopen konstruktivní týmové spolupráce při reakci na bezpečnostní incidenty (Incident Response).'
    },
    {
      title: 'Digitální kompetence',
      description:
        'Rozvíjena prostřednictvím přímé práce s klientskými i serverovými operačními systémy (Windows, Linux), ' +
        'grafickým uživatelským rozhraním i moderními příkazovými shelly (PowerShell, Bash). Žáci efektivně využívají digitální nástroje, ' +
        'chápou jejich vnitřní fungování, důsledně dbají na kybernetickou bezpečnost, ochranu integrity a důvěrnosti dat, ' +
        'šifrování a verzování konfiguračních skriptů.'
    },
    {
      title: 'Pracovní kompetence',
      description:
        'Žák dodržuje technologickou kázeň, bezpečnostní standardy a princip nejmenších nutných oprávnění (PoLP). ' +
        'Učí se efektivně organizovat svou práci v čase, pracovat s verzovacími nástroji a projektovými nástěnkami ' +
        'a je připraven na celoživotní profesní vzdělávání v dynamicky se měnícím oboru správy systémů a sítí.'
    }
  ],
  crossCuttingThemes: [
    {
      code: 'PT - ČDS',
      name: 'Člověk a digitální svět',
      description:
        'Porozumění principům fungování digitálních technologií, kybernetická bezpečnost, ochrana identity a soukromí, ' +
        'šifrování dat, bezpečné chování v síti a etické aspekty práce s daty a softwarem.'
    },
    {
      code: 'PT - ČSP',
      name: 'Člověk a svět práce',
      description:
        'Pěstování profesních návyků systémového administrátora, týmová spolupráce a agilní řízení projektů (Kanban, Git), ' +
        'odpovědnost za svěřenou infrastrukturu a připravenost na profesní uplatnění v IT sektoru.'
    },
    {
      code: 'PT - ODS',
      name: 'Občan v demokratické společnosti',
      description:
        'Dodržování právního rámce v IT (trestní zákoník, autorský zákon, licenční politika, ochrana osobních údajů GDPR ' +
        'a evropská směrnice NIS 2).'
    }
  ],
  interdisciplinaryRelations:
    'Předmět úzce navazuje na výuku Hardwaru a číslicové techniky (fyzická architektura CPU, sběrnic a pamětí). ' +
    'Poskytuje praktickou platformu pro předmět Počítačové sítě (konfigurace adaptérů, IP adresace, směrování, síťové služby) ' +
    'a doplňuje předmět Programování (přenos algoritmického myšlení do skriptování v dávkových souborech, PowerShellu a Bashi).'
};

// -------------------------------------------------------------------------
// 1. ROČNÍK: OPERAČNÍ SYSTÉMY 1 (OSS 1 – 66 HODIN)
// Klientské stanice Windows 11, hardware, disky, procesy, sítě a správa
// -------------------------------------------------------------------------
export const SVP_OSS1_DATA: SvpGradeData = {
  gradeLabel: '1. Ročník',
  gradeCode: 'OSS 1',
  totalHours: 66,
  blocks: [
    {
      id: 'oss1-b1',
      topic: '1. Architektura počítače a základy operačních systémů',
      hours: 8,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'vysvětlí funkci a význam operačního systému a jeho vrstvený model',
        'popíše základní princip Von Neumannovy architektury a tok instrukcí mezi procesorem a pamětí RAM',
        'rozliší privilegovaný režim jádra (Ring 0) od uživatelského prostoru (Ring 3) a objasní roli systémových volání',
        'orientuje se v typech jader operačních systémů a jejich praktickém nasazení',
        'rozliší softwarové licence a zvolí vhodnou licenci s ohledem na způsob využití'
      ],
      content: [
        'Význam a funkce operačního systému, vrstvený model (Hardware ➔ Kernel ➔ User Space)',
        'Architektura hardware z pohledu OS (Von Neumannovo schéma, procesor, operační paměť RAM – data vs. instrukce)',
        'Ochranné kruhy procesoru (Protection Rings), systémová volání (Syscalls) a oddělení aplikací od jádra',
        'Typologie jader (monolitické jádro, hybridní jádro, mikrojádro)',
        'Licenční modely operačních systémů (OEM licence, krabicové Retail licence, multilicence, open-source)'
      ]
    },
    {
      id: 'oss1-b2',
      topic: '2. Souborové systémy, správa disků a start systému',
      hours: 10,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'nainstaluje klientský operační systém a provede jeho počáteční konfiguraci',
        'rozliší paměťová média a porovná jejich parametry z hlediska rychlosti a spolehlivosti',
        'rozdělí pevný disk na oddíly s využitím standardu GPT',
        'vysvětlí princip alokace dat v souborovém systému, vznik fragmentace a metody údržby disku',
        'rozliší rychlé a úplné formátování disku a popíše proces nevratného mazání dat',
        'popíše jednotlivé fáze startu počítače od zapnutí napájení po předání řízení jádru operačního systému'
      ],
      content: [
        'Instalace klientského operačního systému (systémové a hardwarové požadavky, proces instalace a prvotní nastavení stanice)',
        'Paměťová média (mechanické disky vs. polovodičová média SSD, měření a porovnání propustnosti)',
        'Dělení disku (fyzické disky, logické oddíly, tabulka oddílů GPT, systémový oddíl)',
        'Architektura souborových systémů (alokační tabulky, clustery, řetězení clusterů, fragmentace dat a údržba disku)',
        'Formátování disku (rozdíl mezi rychlým smazáním metadat a přepisem sektorů nulami)',
        'Start systému a Boot proces (inicializace hardware, POST test, firmware UEFI, zavaděč OS, předání řízení jádru)'
      ]
    },
    {
      id: 'oss1-b3',
      topic: '3. Procesy a správa operační paměti',
      hours: 6,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'rozliší pasivní program na disku od aktivního procesu v operační paměti RAM',
        'identifikuje procesy v systému pomocí PID a analyzuje jejich hierarchii a spotřebu prostředků',
        'vysvětlí princip multitaskingu a mechanismus střídání procesů na procesoru',
        'popíše životní cyklus procesu a charakterizuje jeho základní stavy',
        'porovná proces a odlehčené vlákno z hlediska sdílení paměťového prostoru',
        'objasní princip virtuální paměti a stránkování pro ochranu integrity systému'
      ],
      content: [
        'Pojem proces (program vs. proces, zavedení do RAM, deskriptor procesu PCB, identifikátory PID a PPID)',
        'Multitasking a střídání procesů (časová kvanta, stav procesoru, přepnutí kontextu a plánování)',
        'Stavy procesu (Nový, Běžící / Running, Připravený / Ready, Čekající / Blocked na I/O, Ukončený)',
        'Vlákna (proces vs. vlákno, sdílení adresního prostoru, vícevláknové aplikace)',
        'Virtuální paměť a stránkování (princip virtuální paměti, izolace paměti aplikací, odkládací prostor / swap)'
      ]
    },
    {
      id: 'oss1-b4',
      topic: '4. Grafické uživatelské rozhraní klientského OS (GUI)',
      hours: 4,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'popíše kompozici grafického rozhraní a restartuje klíčové procesy grafického prostředí',
        'orientuje se v adresářovém stromu systémového disku a struktuře uživatelských profilů',
        'nastavuje základní atributy souborů a asociace aplikací k příponám',
        'konfiguruje operační systém prostřednictvím standardních konfiguračních rozhraní a ovládacích nástrojů',
        'aplikuje zásady ergonomie a produktivity práce při správě oken a pracovních ploch'
      ],
      content: [
        'Architektura GUI (správce oken a kompozice plochy, obnova a řešení nestandardních stavů grafického prostředí)',
        'Hierarchie systémového disku (systémové složky, programové soubory, struktura uživatelských profilů a data aplikací)',
        'Práce se soubory a atributy (atributy souborů, zástupci, vazba typů souborů na výchozí aplikace)',
        'Konfigurace operačního systému (správa systémových voleb, centrální konfigurační nástroje a ovládací panely)',
        'Ergonomie a efektivita práce v GUI (klávesové zkratky, organizace oken na obrazovce, virtuální plochy)'
      ]
    },
    {
      id: 'oss1-b5',
      topic: '5. Příkazový řádek (CLI) a dávkové soubory',
      hours: 6,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'ovládá operační systém v textovém rozhraní příkazového řádku',
        'naviguje v adresářové struktuře disku pomocí absolutních i relativních cest',
        'provádí správu souborů a složek pomocí standardních textových příkazů',
        'využívá přesměrování vstupů a výstupů, roury a textové filtry',
        'vytváří jednoduché dávkové skripty pro rutinní správu a údržbu stanice'
      ],
      content: [
        'Orientace a navigace v CLI (uživatelská vs. administrátorská oprávnění, přepínání diskových jednotek, relativní a absolutní cesty)',
        'Správa souborů a složek (příkazy pro práci se soubory a složkami, využití zástupných znaků)',
        'Roury a proudové filtry (přesměrování standardních proudů vstupu a výstupu, zřetězení příkazů, textové filtry a diagnostika)',
        'Tvorba dávkových skriptů pro automatizaci rutinních úkonů a údržbu stanice'
      ]
    },
    {
      id: 'oss1-b6',
      topic: '6. Správa uživatelů a přístupových oprávnění',
      hours: 8,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'rozliší autentizaci od autorizace a porovná místní účet s online účtem',
        'spravuje uživatelské účty a skupiny podle principu nejmenších nutných oprávnění (PoLP)',
        'aplikuje zásady bezpečnosti hesel, uzamčení stanice a mechanismu řízení uživatelských účtů',
        'nastavuje přístupová oprávnění k souborům a složkám v souborovém systému',
        'vysvětlí princip dědičnosti oprávnění a prioritu explicitního zákazu'
      ],
      content: [
        'Uživatelské účty a autentizace (lokální účet vs. centrální/online identita, role standardního uživatele a správce, nástroje pro správu účtů)',
        'Zabezpečení účtů a pracovní stanice (politika hesel, hardwarově vázané ověřování, uzamčení relace, řízení přístupových práv a elevace oprávnění)',
        'Uživatelské skupiny (princip hromadné správy, základní vestavěné skupiny, správa členství ve skupinách)',
        'Souborová přístupová práva (oprávnění souborového systému, řízení přístupu ACL, čtení, zápis, dědičnost a pravidlo explicitního zákazu)'
      ]
    },
    {
      id: 'oss1-b7',
      topic: '7. Správa aplikačního software a balíčkovače',
      hours: 4,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'popíše fáze životního cyklu aplikačního software v operačním systému',
        'rozliší standardní formáty instalátorů a instalačních balíčků',
        'provede bezobslužnou (tichou) instalaci software',
        'vyhledává, instaluje a hromadně aktualizuje aplikace pomocí moderního správce balíčků'
      ],
      content: [
        'Životní cyklus software (instalace, registrace v systému, spouštění, aktualizace a čistá odinstalace)',
        'Instalátory a balíčky (spustitelné instalátory vs. instalační balíčky, princip a parametry bezobslužné tiché instalace)',
        'Správa software prostřednictvím správce balíčků (vyhledávání aplikací, instalace, hromadný upgrade softwaru, export a import konfigurace)'
      ]
    },
    {
      id: 'oss1-b8',
      topic: '8. Správa hardware, ovladače a plánování úloh',
      hours: 4,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'diagnostikuje stavy připojených hardwarových komponent v konzoli správce zařízení',
        'vysvětlí úlohu ovladačů zařízení běžících v jádře operačního systému',
        'instaluje a aktualizuje ovladače a ověřuje jejich digitální podpis',
        'nakonfiguruje automatické spouštění údržbových úloh v plánovači úloh'
      ],
      content: [
        'Správa hardware a ovladače (komunikace OS s perifériemi, role ovladačů v režimu jádra, diagnostika stavů zařízení, instalace, aktualizace a digitální podpis ovladačů)',
        'Plánovač úloh (automatizace systémové údržby, časové a událostní spouštěče, konfigurace akcí, běh pod servisním účtem)'
      ]
    },
    {
      id: 'oss1-b9',
      topic: '9. Síťová konfigurace v operačním systému a lokální sítě (LAN)',
      hours: 8,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'rozliší fyzickou MAC adresu od logické IP adresy a nakonfiguruje parametry síťového adaptéru',
        'ověří a diagnostikuje síťové spojení pomocí diagnostických nástrojů a příkazů',
        'nastaví síťové profily a provede sdílení prostředků v lokální síti',
        'nakonfiguruje a zabezpečí bezdrátovou síť Wi-Fi v prostředí klientského operačního systému',
        'provede základní nastavení parametrů a zabezpečení síťového směrovače / přístupového bodu'
      ],
      content: [
        'Síťové adaptéry a adresace (fyzické adaptéry Ethernet a Wi-Fi, MAC adresa vs. IPv4 adresa, maska podsítě, dynamické přidělování DHCP vs. statická IP konfigurace, nástroje pro zjištění konfigurace)',
        'Diagnostika síťového spojení (ověření lokálního rozhraní, dostupnost výchozí brány a DNS serverů, sledování trasy paketu)',
        'Síťové profily a sdílení (veřejný vs. privátní síťový profil, sdílení složek v LAN, bezdrátové sítě Wi-Fi, SSID, standardy šifrování WPA2 a WPA3)',
        'Praktická konfigurace směrovače (tovární reset, webová administrace SOHO routeru, zabezpečení Wi-Fi, izolovaná síť pro hosty)'
      ]
    },
    {
      id: 'oss1-b10',
      topic: '10. Závěrečný integrující projekt klientské stanice',
      hours: 8,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'samostatně zprovozní a nakonfiguruje klientskou stanici od rozdělení disku po zapojení do sítě',
        'vytvoří bezpečné víceuživatelské prostředí s diferencovanými přístupovými právy',
        'automatizuje rutinní údržbu stanice pomocí dávkového skriptu a plánovače úloh',
        'diagnostikuje a odstraní simulované závady na cizí stanici',
        'prezentuje a obhájí zvolené technické řešení před třídou'
      ],
      content: [
        'Komplexní instalace stanice (rozdělení disků, instalace operačního systému, instalace ovladačů a softwaru správcem balíčků)',
        'Bezpečnostní a uživatelská konfigurace (uživatelské účty, přístupová práva ke složkám, síťové nastavení a profil sítě)',
        'Automatizace a údržba (vytvoření údržbového skriptu a jeho zařazení do plánovače úloh)',
        'Křížové testování a diagnostika chyb (simulace závady na disku, síti nebo právech a její systematické odstranění)',
        'Technická dokumentace a ústní obhajoba projektu'
      ]
    }
  ]
};

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// 2. ROČNÍK: OPERAČNÍ SYSTÉMY 2 (OSS 2 – 66 HODIN)
// Správa podnikových dat, zálohování, bezpečnost koncových zařízení, PowerShell a správa v doméně
// -------------------------------------------------------------------------
export const SVP_OSS2_DATA: SvpGradeData = {
  gradeLabel: '2. Ročník',
  gradeCode: 'OSS 2',
  totalHours: 66,
  blocks: [
    {
      id: 'oss2-b1',
      topic: '1. Správa podnikových dat a zálohování',
      hours: 10,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'navrhne a zdůvodní strategii zálohování dat podle oborového pravidla 3-2-1',
        'porovná plnou, přírůstkovou a rozdílovou zálohu z hlediska časové náročnosti a kapacity úložiště',
        'vysvětlí funkci archivního atributu souborů a stínových kopií svazku',
        'provádí skriptovanou synchronizaci a zrcadlení složek pomocí systémových nástrojů',
        'rozliší cloudovou synchronizaci od nezávislé a neměnné zálohy dat',
        'nakonfiguruje automatizované šifrované zálohování na síťové úložiště s během na pozadí jako systémová služba'
      ],
      content: [
        'Zásady a strategie zálohování (pravidlo 3-2-1, typy záloh – plná, přírůstková/inkrementální, rozdílová/diferenciální, archivní atribut souborů, stínové kopie svazku)',
        'Skriptovaná synchronizace a zrcadlení dat v textovém rozhraní (příkazy pro synchronizaci složek a logování průběhu)',
        'Cloudová úložiště a synchronizace (rozdíl mezi online cloudovým diskem a neměnnou zálohou, rizika synchronizace napadených či zašifrovaných dat)',
        'Automatizované zálohování (využití specializovaného software běžícího na pozadí jako služba, ochrana záložních archivů šifrováním a heslem, plánování zálohovacích úloh)',
        'Testování obnovy dat ze zálohy a tvorba zálohovacího plánu a protokolu'
      ]
    },
    {
      id: 'oss2-b2',
      topic: '2. Bezpečnost koncových zařízení, audit a forenzní analýza',
      hours: 20,
      crossThemes: ['PT - ČDS', 'PT - ODS'],
      outcomes: [
        'charakterizuje hlavní kategorie škodlivého kódu a objasní princip vykonávání instrukcí procesorem bez rozlišení úmyslu',
        'provádí forenzní audit běžících procesů, analyzuje jejich hierarchii a spotřebu systémových prostředků',
        'ověřuje digitální certifikáty spustitelných souborů a integritu dat pomocí kryptografických kontrolních součtů',
        'vyhledává a analyzuje mechanismy automatického spouštění aplikací a záznamy v systémovém registru',
        'vyhledává, filtruje a interpretuje systémové a bezpečnostní záznamy v žurnálu událostí',
        'bezpečně testuje podezřelé soubory v izolovaném prostředí a konfiguruje aktivní systémovou ochranu proti škodlivému kódu',
        'konfiguruje pravidla paketového firewallu pro příchozí i odchozí komunikaci a monitoruje aktivní síťová spojení stanice',
        'aplikuje diskové šifrování s hardwarovou ochranou kryptografických klíčů a bezpečně spravuje obnovovací klíče',
        'analyzuje techniky sociálního inženýrství a phishingu a aplikuje zásady bezpečné správy hesel a vícefaktorového ověřování',
        'vyřeší simulovaný bezpečnostní incident na stanici, provede forenzní analýzu a vypracuje závěrečný incident report'
      ],
      content: [
        'Typologie malwaru a principy nákazy (viry, červi, trojské koně, ransomware, spyware; zneužití uživatelských tokenů, hashovací funkce a online analýza)',
        'Forenzní analýza běžících procesů (nástroje pro inspekci procesů, procesní stromy, skryté procesy, ověřování digitálních certifikátů a integrity)',
        'Systémový registr a persistence útoků (hierarchie klíčů pro počítač a uživatele, klíče pro automatické spouštění po startu, export a import konfigurace)',
        'Systémový žurnál událostí a bezpečnostní audit (architektura systémových protokolů, záznamy o úspěšných a neúspěšných pokusech o přihlášení, filtrace chybových stavů)',
        'Izolované prostředí a systémový antivirus (prostředí sandboxu, signatury, heuristika, standardizované testovací vzorky)',
        'Paketový firewall na koncovém zařízení (filtrace příchozího a odchozího provozu, pravidla pro porty a aplikace, sledování aktivních síťových spojení)',
        'Šifrování disků a hardwarová ochrana klíčů (šifrování systémových i přenosných disků, bezpečnostní čip TPM, správa záchranných klíčů)',
        'Správa systémových aktualizací a zranitelnosti (servisní cykly záplat, princip zranitelností nultého dne 0-day, hromadné aktualizace aplikací)',
        'Sociální inženýrství, phishing a ochrana identity (analýza podvodných e-mailů a hlaviček zpráv, vícefaktorové ověřování MFA, správci hesel)',
        'Vyšetřování bezpečnostního incidentu (detekce neoprávněné aktivity na stanici, izolace systému, odstranění perzistentní hrozby a tvorba protokolu Incident Response)'
      ]
    },
    {
      id: 'oss2-b3',
      topic: '3. Systémové služby a administrační skriptování (PowerShell)',
      hours: 18,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'popíše architekturu a životní cyklus systémových služeb běžících na pozadí operačního systému',
        'diagnostikuje a odstraňuje nestandardní stavy a zamrznutí systémových služeb',
        'ovládá syntaxi a objektový model moderního příkazového shellu',
        'efektivně filtruje, třídí a transformuje systémové objekty v rourách',
        'vytváří přehledné administrační skripty s ošetřením bezpečnostní politiky spouštění',
        'využívá pokročilé skriptovací techniky pro automatizaci správy souborů, registru a komponent stanice',
        'generuje automatizované reporty o stavu hardware, software a konfigurace stanice'
      ],
      content: [
        'Systémové služby na pozadí (koncepce služeb bez interaktivního přihlášení uživatele, systémové běhové účty, typy spouštění služeb, závislosti)',
        'Diagnostika a obnova služeb (řešení chyb a pádů kritických služeb, konfigurace automatického restartu po selhání, nástroje pro správu služeb)',
        'Objektový shell a syntaxe cmdletů (rozdíl mezi textovým a objektovým rozhraním, syntaxe příkazů, nápověda a zjišťování vlastností a metod objektů)',
        'Práce s objektovou rourou (předávání celých datových struktur rourou, výběr vlastností, filtrování podle podmínek a řazení dat)',
        'Administrační skriptování (tvorba skriptů, práce s proměnnými, cykly pro hromadné operace, bezpečnostní zásady a politiky spouštění skriptů)',
        'Automatizovaná správa systému (manipulace s klíči registru, správa oprávnění a systémových komponent skriptem)',
        'Inspekční reporty a stav stanice (automatizovaný sběr diagnostických dat, export stavových reportů do formátů CSV a HTML)'
      ]
    },
    {
      id: 'oss2-b4',
      topic: '4. Síťové sdílení prostředků, vzdálená správa a centrální správa v doméně',
      hours: 18,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'nakonfiguruje sdílení složek v lokální síti a nastaví kombinovaná oprávnění sdílení a souborového systému',
        'připojí síťové úložiště klientské stanici jako trvalou síťovou jednotku',
        'zabezpečí a realizuje vzdálený přístup k pracovní ploše stanice',
        'vysvětlí rozdíl mezi decentralizovanou pracovní skupinou a centralizovanou podnikovou doménou',
        'připojí klientskou stanici do podnikové domény a provede přihlášení doménovým profilem',
        'vysvětlí význam a mechanismus uplatňování centrálních bezpečnostních politik (GPO) na klientské stanici',
        'samostatně integruje a obhájí komplexní konfiguraci a zabezpečení klientské stanice'
      ],
      content: [
        'Sdílení souborů v lokální síti (protokol SMB, síťové cesty UNC, konfigurace oprávnění sdílené složky)',
        'Efektivní přístupová práva (kombinace oprávnění sdílení a souborového systému, pravidlo restriktivnějšího přístupu)',
        'Mapování síťových disků (připojení síťové jednotky v grafickém i textovém rozhraní, trvalé připojení po přihlášení)',
        'Vzdálená správa pracovní plochy (protokol RDP, autorizace vzdálených uživatelů, zabezpečení na úrovni sítě)',
        'Koncept podnikové infrastruktury (pracovní skupina vs. doménové prostředí, centralizovaná autentizace, role doménového řadiče)',
        'Klientská stanice v podnikové doméně (připojení stanice do domény, profil doménového uživatele, oddělení lokálních a doménových práv)',
        'Skupinové politiky na stanici (princip centrální distribuce nastavení a bezpečnostních restrikcí na klientské počítače, zákaz výměnných médií, jednotná konfigurace)',
        'Závěrečný integrující projekt administrace a zabezpečení stanice (komplexní instalace, konfigurace uživatelů, nastavení zálohování, firewallu, auditních pravidel a obhajoba řešení)'
      ]
    }
  ]
};

// -------------------------------------------------------------------------
// 3. ROČNÍK: OPERAČNÍ SYSTÉMY 3 (OSS 3 – 66 HODIN)
// Linux, serverové služby, Bash, verzování v Gitu, kyberbezpečnost a týmový projekt
// -------------------------------------------------------------------------
export const SVP_OSS3_DATA: SvpGradeData = {
  gradeLabel: '3. Ročník',
  gradeCode: 'OSS 3',
  totalHours: 66,
  blocks: [
    {
      id: 'oss3-b1',
      topic: '1. Linux: Architektura, instalace a základní správa systému',
      hours: 16,
      crossThemes: ['PT - ČDS'],
      outcomes: [
        'vybere vhodnou distribuci Linuxu a provede instalaci serverového operačního systému bez grafického rozhraní',
        'orientuje se ve standardní hierarchii souborového systému Linuxu (FHS)',
        'provádí základní i pokročilé operace se soubory a složkami v textovém rozhraní (CLI)',
        'spravuje uživatelské účty a nastavuje přístupová práva POSIX (UGO) v osmičkové i symbolické notaci',
        'pracuje s textovými proudy, rourami, regulárními filtry a editory',
        'spravuje diskové oddíly a připojování svazků do souborového stromu',
        'monitoruje a řídí běžící procesy a systémové démony',
        'instaluje a aktualizuje software pomocí balíčkovacího systému'
      ],
      content: [
        'Architektura Linuxu a instalace (význam distribucí, rozdělení disku na oddíly a odkládací prostor swap, zavaděč systému, instalace serveru bez grafického rozhraní)',
        'Souborový systém FHS a terminál (standardizovaná hierarchie složek, navigační a manipulační příkazy v textovém prostředí)',
        'Uživatelé a POSIX oprávnění (model vlastník-skupina-ostatní, osmičková notace práv, změna vlastníka a skupiny, delegování administrátorských práv)',
        'Textové proudy a editory (přesměrování výstupu, proudové roury, regulární filtry a vyhledávání textu, práce v terminálových textových editorech)',
        'Správa disků a souborových systémů (tvorba oddílů, formátování svazků, přípojné body a trvalá konfigurace připojování svazků)',
        'Správa procesů (sledování běžících úloh, interaktivní systémové monitory, řízení priorit a ukončování procesů)',
        'Správa software a balíčků (repozitáře aplikací, aktualizace indexů, instalace software a řešení knihovních závislostí)',
        'Systémové služby a logování (architektura řízení démonů, správa stavu služeb, analýza žurnálu systémových událostí)'
      ]
    },
    {
      id: 'oss3-b2',
      topic: '2. Linux: Sítě, serverové služby a automatizace v shellu',
      hours: 16,
      crossThemes: ['PT - ČDS', 'PT - ČSP'],
      outcomes: [
        'nakonfiguruje síťové rozhraní serveru a zabezpečí systém pomocí paketového firewallu',
        'zprovozní zabezpečenou vzdálenou správu přes šifrovaný terminál s autentizací asymetrickými klíči',
        'nainstaluje a nakonfiguruje webový server a zabezpečí přenos dat šifrováním HTTPS',
        'zajistí heterogenní sdílení souborů mezi servery a klientskými stanicemi Windows',
        'píše skripty v shellu pro automatizaci administrátorských úkonů a zálohování',
        'nastaví automatické periodické spouštění úloh pomocí plánovače'
      ],
      content: [
        'Síťová konfigurace a paketový firewall (konfigurace síťových rozhraní, diagnostika konektivity, paketový firewall a pravidla pro povolování portů)',
        'Zabezpečená vzdálená správa (konfigurace šifrovaného vzdáleného terminálu SSH, autentizace párem asymetrických klíčů, restrikce přihlášení administrátora)',
        'Webový server (instalace webové služby, kořenový adresář, virtuální hostitelé, nasazení bezpečnostních certifikátů pro šifrovaný protokol HTTPS)',
        'Heterogenní sdílení souborů v síti (služba sdílení dat, konfigurace sdílených adresářů, autentizace a mapování z klientských systémů)',
        'Administrační skriptování v shellu (struktura skriptu, řízení práv spuštění, proměnné, parametry z příkazové řádky, podmíněné větvení a cykly)',
        'Automatizace údržby a periodické plánování (komprese a archivace dat, automatické plánování pravidelných úloh v plánovači cron)'
      ]
    },
    {
      id: 'oss3-b3',
      topic: '3. Kybernetická bezpečnost, síťový audit a obrana',
      hours: 12,
      crossThemes: ['PT - ČDS', 'PT - ODS'],
      outcomes: [
        'orientuje se v právním rámci kybernetické bezpečnosti v ČR a zásadách mezinárodních směrnic (NIS 2)',
        'provede bezpečnostní průzkum sítě a identifikuje otevřené síťové porty a verze běžících služeb',
        'vyhledá zjištěné zranitelnosti ve veřejných databázích (CVE) a vyhodnotí jejich závažnost (CVSS)',
        'analyzuje nešifrovaný a šifrovaný síťový provoz pomocí analyzátoru paketů',
        'vysvětlí princip ukládání přístupových hesel ve formě hashů a otestuje jejich odolnost vůči slovníkovým útokům',
        'provede bezpečnostní nápravu a odstraní zranitelnost na kompromitovaném systému'
      ],
      content: [
        'Právní a etický rámec (trestní zákoník – neoprávněný přístup k počítačovému systému, směrnice NIS 2, fáze kybernetického útoku Cyber Kill Chain)',
        'Síťový audit a mapování zranitelností (skenování síťových portů, detekce verzí služeb, práce s mezinárodními databázemi zranitelností CVE a hodnocení rizik CVSS)',
        'Analýza síťového provozu (odposlech a filtrace síťových paketů, analýza spojení, srovnání nešifrovaných protokolů se šifrovanými tunely)',
        'Ochrana hesel a autentizace (ukládání hesel ve formě kryptografických hashů se solí, slovníkové útoky a testování síly hesel)',
        'Reakce na incident a náprava (analýza kompromitovaného systému, identifikace neoprávněné aktivity, zablokování útočníka firewallem a oprava konfigurace)'
      ]
    },
    {
      id: 'oss3-b4',
      topic: '4. Verzovací systémy, týmová kooperace a infrastrukturní projekt',
      hours: 18,
      crossThemes: ['PT - ČSP', 'PT - ČDS'],
      outcomes: [
        'vysvětlí význam verzování a samostatně ovládá pracovní cyklus verzovacího systému (Git)',
        'vytváří větve, slučuje změny a řeší kolize v kódu a konfiguračních souborech',
        'spolupracuje na projektu prostřednictvím vzdálených repozitářů s využitím týmových procesů',
        'organizuje a řídí práci v týmu s využitím agilních nástrojů pro plánování úkolů (Kanban) a týmovou komunikaci',
        'navrhne a zprovozní komplexní smíšenou infrastrukturu propojující servery a klientské stanice',
        'zabezpečí síťové služby, otestuje funkčnost záloh a obhájí technické řešení infrastruktury před odbornou komisí'
      ],
      content: [
        'Architektura verzovacích systémů (tři zóny pracovního prostoru, tvorba revizí a commitů, historie a ignorování souborů)',
        'Práce s větvemi a řešení konfliktů (izolovaný vývoj ve větvích, slučování změn, detekce a manuální řešení kolizí)',
        'Vzdálené repozitáře a týmová spolupráce (synchronizace se vzdáleným repozitářem, proces Pull Requestů, revize změn kódu a konfigurací)',
        'Nástroje pro agilní plánování úkolů (Kanban), týmovou komunikaci a koordinaci projektu (nástěnka úkolů, backlog, rozdělení rolí v týmu)',
        'Realizace podnikové infrastruktury (propojení linuxových serverů a stanic Windows, sdílení dat, webové služby, centrální správa a verzování konfigurací v repozitáři)',
        'Křížové testování a bezpečnostní audit (ověření odolnosti sítě, kontrola funkčnosti záloh a systémových logů)',
        'Zpracování technické dokumentace a ústní obhajoba projektu'
      ]
    },
    {
      id: 'oss3-b5',
      topic: '5. Závěrečná reflexe tříletého kurikula a rezerva',
      hours: 4,
      crossThemes: ['PT - ČSP'],
      outcomes: [
        'syntetizuje poznatky tříleté výuky operačních systémů a porovná administraci platforem Windows a Linux',
        'samostatně vyřeší typové komplexní maturitní úlohy ze správy operačních systémů a sítí'
      ],
      content: [
        'Komparace administrátorských přístupů (srovnání platforem Windows a Linux, správa přes grafické rozhraní vs. konfigurační soubory a skripty)',
        'Časová rezerva (prostor pro řešení individuálních dotazů, školní akce, uzavření klasifikace)'
      ]
    }
  ]
};
