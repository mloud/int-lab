import { ThematicPlan } from './thematicPlanTypes';

export const OPS2_THEMATIC_PLAN: ThematicPlan = {
    subjectId: 'ops2',
    subjectTitle: 'Operační systémy 2',
    gradeLabel: '2. Ročník SŠ',
    grade: 2,
    totalHours: 66,
    weeksCount: 33,
    weeklyHours: 2,
    academicYear: '2026/2027',
    fieldCode: '18-20-M/01',
    fieldTitle: 'Informační technologie',
    blocks: [
      {
        id: 'oss2-b1',
        order: 1,
        month: 'Září – Říjen',
        monthKey: 'zari',
        weeks: '1.–5. týden',
        title: 'Správa podnikových dat a zálohování',
        hours: 10,
        theoryHours: 2,
        practiceHours: 8,
        description: 'Pravidlo 3-2-1, typy záloh (plná, inkrementální, diferenciální), stínové kopie VSS a automatizované zálohování jako služba.',
        rvpCompetence: 'Navrhuje a realizuje podnikovou strategii zálohování, automatizuje zálohy s šifrováním a ověřuje obnovu dat.',
        subtopics: [
          {
            id: 'oss2-b1-1',
            title: 'Wargame – prověrka administrátorských dovedností z 1. ročníku',
            hours: 2,
            type: 'laborator',
            description: 'Diagnostika sítě, správa přístupových oprávnění NTFS a práce v textovém rozhraní.',
            practice: 'Praktické laboratorní úlohy zaměřené na audit a konfiguraci stanice z 1. ročníku.',
            route: '/specializovana/operacni-systemy-2/zalohovani/uvod'
          },
          {
            id: 'oss2-b1-2',
            title: 'Zásady zálohování, oborové pravidlo 3-2-1 a typy záloh',
            hours: 2,
            type: 'teorie',
            description: 'Plná, přírůstková a rozdílová záloha, archivní atribut a stínové kopie svazku VSS.',
            practice: 'Výpočet objemu záložních dat a návrh zálohovacího plánu pro firmu s denními změnami.',
            route: '/specializovana/operacni-systemy-2/zalohovani/manualni'
          },
          {
            id: 'oss2-b1-3',
            title: 'Skriptovaná synchronizace dat a zrcadlení v CLI',
            hours: 2,
            type: 'laborator',
            description: 'Zrcadlení složek a logování v systémových nástrojích (robocopy).',
            practice: 'Vytvoření synchronizačního skriptu s ošetřením chybových návratových kódů a zápisem do logu.',
            route: '/specializovana/operacni-systemy-2/zalohovani/system'
          },
          {
            id: 'oss2-b1-4',
            title: 'Cloudová synchronizace vs. nezávislá neměnná záloha',
            hours: 2,
            type: 'kombinovane',
            description: 'Rizika synchronizace při napadení ransomwarem, verzování a ochrana proti nechtěnému přepisu.',
            practice: 'Konfigurace verzované synchronizace na cloudové úložiště a simulace obnovy po havárii.',
            route: '/specializovana/operacni-systemy-2/zalohovani/cloud'
          },
          {
            id: 'oss2-b1-5',
            title: 'Automatizované zálohování jako systémová služba s šifrováním',
            hours: 2,
            type: 'laborator',
            description: 'Běh pod systémovým účtem, ochrana záložních archivů šifrováním a heslem, zálohování na síťový disk a test obnovy.',
            practice: 'Kompletní nastavení automatické inkrementální zálohy do šifrovaného archivu s odesláním na síťové úložiště.',
            route: '/specializovana/operacni-systemy-2/zalohovani/cobian'
          }
        ]
      },
      {
        id: 'oss2-b2',
        order: 2,
        month: 'Říjen – Leden',
        monthKey: 'rijen',
        weeks: '6.–15. týden',
        title: 'Bezpečnost koncových zařízení, audit a forenzní analýza',
        hours: 20,
        theoryHours: 6,
        practiceHours: 14,
        description: 'Typologie malwaru, forenzní audit procesů v Process Exploreru, digitální podpisy, Defender, Firewall, BitLocker a Mini-CTF.',
        rvpCompetence: 'Provádí forenzní audit procesů, analyzuje podezřelé chování systému, konfiguruje Defender, Firewall a šifrování BitLocker.',
        subtopics: [
          {
            id: 'oss2-b2-1',
            title: 'Typologie malwaru a proč CPU nepozná zlý úmysl',
            hours: 2,
            type: 'teorie',
            description: 'Slepé vykonávání instrukcí procesorem (Von Neumann), bezpečnostní tokeny, 6 hrozeb: virus, červ, trojan, ransomware, spyware, rootkit.',
            practice: 'Spuštění interaktivních simulátorů chování malwaru v IntLabu (Ransomware, Worm, Trojan Dropper).',
            route: '/specializovana/operacni-systemy-2/bezpecnost/malware'
          },
          {
            id: 'oss2-b2-2',
            title: 'Forenzní analýza procesů a ověřování podpisů Authenticode',
            hours: 2,
            type: 'laborator',
            description: 'Co dělá OS při spuštění .exe: lokální podpis, reputační cloud SmartScreen, antivirový sken. Nástroj Sysinternals Process Explorer.',
            practice: 'Forenzní laboratoř v IntLabu: výpočet hashe certutil, lustrace na VirusTotal.com, analýza stromu procesů a svchost.exe.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/procesy-a-certifikaty'
          },
          {
            id: 'oss2-b2-3',
            title: 'Systémový registr a persistence škodlivého kódu',
            hours: 2,
            type: 'laborator',
            description: 'Hierarchie klíčů HKLM vs. HKCU, soubory úlů (Hives), klíče Run, RunOnce, Winlogon a persistence po startu, export/import dávek .reg.',
            practice: 'Rentgen registru v IntLabu: odhalení podezřelé persistence zapsané škodlivým skriptem a bezpečné odstranění.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/registr'
          },
          {
            id: 'oss2-b2-4',
            title: 'Systémový žurnál událostí a bezpečnostní audit',
            hours: 2,
            type: 'laborator',
            description: 'Architektura Windows Event Log, protokoly Systém, Aplikace, Zabezpečení. Klíčová Event ID (přihlášení 4624, brute-force 4625, smazání logu 1102).',
            practice: 'Vyfiltrování neúspěšných pokusů o přihlášení v Prohlížeči událostí a vytvoření vlastního auditního filtru v IntLabu.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/udalosti'
          },
          {
            id: 'oss2-b2-5',
            title: 'Izolované testovací prostředí (Sandbox) a antivirus',
            hours: 2,
            type: 'laborator',
            description: 'Hyper-V jednorázový kontejner Windows Sandbox, signatury, heuristika, chování programu v paměti a standardní testovací vzorek EICAR.',
            practice: 'Spuštění podezřelého programu v Sandboxu, otestování reakce Defenderu pomocí EICAR a správa výjimek.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/izolace'
          },
          {
            id: 'oss2-b2-6',
            title: 'Paketový firewall na koncovém zařízení',
            hours: 2,
            type: 'laborator',
            description: 'Stavový firewall, příchozí vs. odchozí směr, porty TCP/UDP, propojení portu s PID procesem přes netstat -ano.',
            practice: 'Vytvoření vlastních pravidel ve wf.msc: zablokování odezvy na ping (ICMP) a blokace internetu konkrétní aplikaci.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/firewall'
          },
          {
            id: 'oss2-b2-7',
            title: 'Diskové šifrování BitLocker a TPM čip',
            hours: 2,
            type: 'laborator',
            description: 'Ochrana dat v klidu (Data at Rest), provázání s hardwarem TPM 2.0, záchranný klíč, BitLocker To Go, Controlled Folder Access.',
            practice: 'Zašifrování USB disku pomocí BitLocker To Go, export recovery klíče a konfigurace ochrany složek proti ransomwaru.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/sifrovani'
          },
          {
            id: 'oss2-b2-8',
            title: 'Správa systémových aktualizací a zranitelnosti (0-day)',
            hours: 2,
            type: 'laborator',
            description: 'Princip nejmenších oprávnění, chování tokenů UAC, servisní cykly záplat, 0-day zranitelnosti a hromadný update přes winget.',
            practice: 'Hromadný audit zranitelných verzí softwaru a update systému přes skript winget upgrade --all.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/ucty'
          },
          {
            id: 'oss2-b2-9',
            title: 'Sociální inženýrství, phishing a ochrana identity',
            hours: 2,
            type: 'kombinovane',
            description: 'Metody sociálního inženýrství, rozpoznávání podvodných e-mailů a URL, síla hesel, správce KeePass, vícefaktorové ověřování MFA (FIDO2).',
            practice: 'Analýza podvodného e-mailu v hlavičkách zpráv, kontrola úniku hesel na HaveIBeenPwned a nastavení MFA.',
            route: '/specializovana/operacni-systemy-2/bezpecnost/sit-hesla'
          },
          {
            id: 'oss2-b2-10',
            title: 'Vyšetřování bezpečnostního incidentu (Mini-CTF)',
            hours: 2,
            type: 'projekt',
            description: 'Komplexní scénář napadeného počítače: identifikace anomálie, izolace na firewallu, dohledání škůdce, vyčištění a zpráva.',
            practice: 'Vyšetření fiktivního incidentu a sepsání protokolu o zásahu (Incident Response Report).',
            route: '/specializovana/operacni-systemy-2/bezpecnost/ctf'
          }
        ]
      },
      {
        id: 'oss2-b3',
        order: 3,
        month: 'Únor – Duben',
        monthKey: 'unor',
        weeks: '16.–24. týden',
        title: 'Systémové služby a administrační skriptování (PowerShell)',
        hours: 18,
        theoryHours: 4,
        practiceHours: 14,
        description: 'Konzole MMC, systémové služby na pozadí, objektový PowerShell, administrační skriptování a diagnostické reporty.',
        rvpCompetence: 'Píše administrační skripty v PowerShellu, spravuje systémové služby, konzole MMC a generuje stavové reporty.',
        subtopics: [
          {
            id: 'oss2-b3-1',
            title: 'Systémové služby Windows na pozadí a jejich životní cyklus',
            hours: 4,
            type: 'laborator',
            description: 'Procesy běžící bez interaktivního přihlášení pod účtem SYSTEM, typy spouštění, systémové závislosti, sc.exe a automatický restart po selhání.',
            practice: 'Konfigurace zotavení po selhání služby a správa závislostí v konzoli services.msc.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/sluzby'
          },
          {
            id: 'oss2-b3-2',
            title: 'Konzole správce (MMC) a centrální správa',
            hours: 4,
            type: 'laborator',
            description: 'Architektura snap-inů v mmc.exe, sestavení vlastní administrátorské konzole, autorský vs. uživatelský režim a uložení do souboru .msc.',
            practice: 'Sestavení vlastní diagnostické konzole MojeSprava.msc pro technickou podporu stanic.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/mmc'
          },
          {
            id: 'oss2-b3-3',
            title: 'PowerShell: Objektový shell, syntaxe cmdletů a roury',
            hours: 4,
            type: 'laborator',
            description: 'Rozdíl mezi textovým CMD a objektovým PowerShellem (.NET objekty). Konvence Sloveso-PodstatnéJméno, Get-Command, Get-Help, objektová roura |, Where-Object a Select-Object.',
            practice: 'Filtrování a třídění procesů a služeb podle využití RAM a stavu pomocí Where-Object a Select-Object.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/powershell'
          },
          {
            id: 'oss2-b3-4',
            title: 'Administrační skriptování v PowerShellu (.ps1)',
            hours: 4,
            type: 'laborator',
            description: 'Tvorba administračních skriptů, proměnné, cyklus foreach, podmínky if, práce se soubory, bezpečnostní politika spouštění ExecutionPolicy a podepisování.',
            practice: 'Vytvoření PowerShell skriptu pro kontrolu a automatický restart zamrzlé služby.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/powershell-sprava'
          },
          {
            id: 'oss2-b3-5',
            title: 'Automatizovaný sběr dat a generování stavových reportů',
            hours: 2,
            type: 'laborator',
            description: 'Diagnostika hardware a konfigurace stanice (Get-ComputerInfo, Get-Volume), transformace do HTML/CSV (ConvertTo-Html, Export-Csv) a plánování úloh.',
            practice: 'Vytvoření inspekčního PowerShell skriptu generujícího barevný HTML auditní report o stavu stanice.',
            route: '/specializovana/operacni-systemy-2/pokrocila-konfigurace/reporty'
          }
        ]
      },
      {
        id: 'oss2-b4',
        order: 4,
        month: 'Duben – Červen',
        monthKey: 'duben',
        weeks: '25.–33. týden',
        title: 'Síťové sdílení prostředků, vzdálená správa a centrální správa v doméně',
        hours: 18,
        theoryHours: 4,
        practiceHours: 14,
        description: 'Sdílení souborů SMB, vzdálená plocha RDP, koncept podnikové domény, připojení stanice Windows 11, GPO restrikce a závěrečný projekt.',
        rvpCompetence: 'Konfiguruje síťové sdílení SMB a RDP, připojuje klientskou stanici do domény Active Directory a aplikuje centrální politiky GPO.',
        subtopics: [
          {
            id: 'oss2-b4-1',
            title: 'Síťové sdílení složek a efektivní přístupová práva (SMB)',
            hours: 4,
            type: 'laborator',
            description: 'Protokol SMB (port 445), UNC cesty \\\\server\\share, kombinovaná práva sdílení vs. NTFS, trvalé mapování síťové jednotky.',
            practice: 'Zřízení sdílené složky s oddělenými právy pro oddělení firmy a její namapování klientům jako síťového disku.',
            route: '/specializovana/operacni-systemy-2/active-directory/smb'
          },
          {
            id: 'oss2-b4-2',
            title: 'Zabezpečená vzdálená správa pracovní plochy (RDP)',
            hours: 2,
            type: 'laborator',
            description: 'Protokol RDP (port 3389), autorizace vzdálených uživatelů, zabezpečení na úrovni sítě NLA a konfigurace firewallu.',
            practice: 'Povolení RDP na klientské stanici, připojení přes mstsc a ověření aktivních terminálových relací.',
            route: '/specializovana/operacni-systemy-2/active-directory/vzdalena-sprava'
          },
          {
            id: 'oss2-b4-3',
            title: 'Koncept podnikové infrastruktury a domény',
            hours: 2,
            type: 'teorie',
            description: 'Pracovní skupina vs. doménové prostředí, centralizovaná autentizace, role DNS a řadiče domény.',
            practice: 'Analýza podnikového schématu a ověření síťové dostupnosti doménových služeb.',
            route: '/specializovana/operacni-systemy-2/active-directory/server-a-domena'
          },
          {
            id: 'oss2-b4-4',
            title: 'Klientská stanice v podnikové doméně a uživatelské profily',
            hours: 4,
            type: 'laborator',
            description: 'Podmínka DNS, proces připojení stanice do domény, profil doménového uživatele na disku klienta.',
            practice: 'Připojení klientské stanice Windows 11 do domény a přihlášení pod doménovým účtem.',
            route: '/specializovana/operacni-systemy-2/active-directory/klient-v-domene'
          },
          {
            id: 'oss2-b4-5',
            title: 'Skupinové politiky (Group Policy – uplatnění na stanici)',
            hours: 4,
            type: 'laborator',
            description: 'Distribuce centrálních nastavení, zákaz výměnných USB disků, bezpečnostní restrikce, příkazy gpupdate a gpresult.',
            practice: 'Ověření uplatnění bezpečnostní GPO politiky zakazující USB disky a kontrola výstupu gpresult /r.',
            route: '/specializovana/operacni-systemy-2/active-directory/gpo'
          },
          {
            id: 'oss2-b4-6',
            title: 'Závěrečný integrující projekt administrace a zabezpečení stanice',
            hours: 2,
            type: 'projekt',
            description: 'Komplexní konfigurace stanice: síť, sdílení, zálohování, doména, GPO restrikce, křížový audit odolnosti a technická obhajoba.',
            practice: 'Samostatné zprovoznění a zabezpečení stanice ve virtuálním prostředí a obhajoba před vyučujícím.',
            route: '/specializovana/operacni-systemy-2/active-directory/zaloha-a-projekt'
          }
        ]
      }
    ]
  };
