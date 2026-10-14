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

/** Pokročilá konfigurace Windows (~5 h) – nástroje, které propojují Bezpečnost a Active Directory. */
export const OSS2_POKROCILA: OutlineGroup = {
  chapterId: 'os2-pokrocila',
  chapterTitle: 'Pokročilá konfigurace Windows',
  chapterDescription: 'Nástroje správce, které propojují zálohování a bezpečnost s Active Directory: konzole, služby, logy, práva a zásady.',
  chapterTag: 'adv',
  chapterPath: `${BASE}/pokrocila-konfigurace`,
  subjectTitle: SUBJECT,
  grade: 2,
  gradeLabel: '2. Ročník',
  thematicBlock: 'Pokročilá konfigurace Windows',
  icon: 'Wrench',
  gradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      slug: 'mmc', tag: 'PK1', title: 'MMC a Správa počítače', hours: '1 h',
      subtitle: 'Jedna konzole, mnoho nástrojů – princip snap-inů.',
      intro: 'Správa počítače, Služby i Správa disků jsou ve skutečnosti stejné okno s různými nástroji. Pochopíme princip a sestavíme si vlastní konzoli.',
      topics: ['Microsoft Management Console a snap-iny', 'Správa počítače jako hotová konzole', 'Vlastní konzole', 'Most k AD: i konzole domény je snap-in'],
      practice: ['Simulace: skládání vlastní konzole ze snap-inů', 'Praxe: vytvoření a uložení vlastní konzole'],
      builds: 'Správa počítače, disků a uživatelů (OSS 1).',
    },
    {
      slug: 'sluzby', tag: 'PK2', title: 'Služby Windows', hours: '1 h',
      subtitle: 'Programy běžící na pozadí: typy spuštění, účty a závislosti.',
      intro: 'Služby poznáme z procesů a Bezpečnosti. Teď se naučíme je spravovat – spouštět, zastavovat a nastavovat, kdy a pod jakým účtem běží.',
      topics: ['Služba vs. běžný program', 'Typ spuštění (automaticky, ručně, zakázáno)', 'Účet služby a závislosti', 'Spuštění a zastavení z konzole a z CMD'],
      practice: ['Simulace: zastav službu a sleduj, co přestane fungovat', 'Praxe: nastavení služby a zjištění její závislosti'],
      builds: 'Správa procesů (OSS 1), BZ2 (svchost a služby).',
    },
    {
      slug: 'udalosti', tag: 'PK3', title: 'Prohlížeč událostí', hours: '1 h',
      subtitle: 'Systémové logy: co se stalo, kdy a proč.',
      intro: 'Windows si zapisuje, co se děje. V logu najdeme příčinu pádu i stopy po neúspěšném přihlášení nebo útoku.',
      topics: ['Protokoly System, Application a Security', 'Úrovně událostí a filtrování', 'Důležitá čísla událostí (např. přihlášení)', 'Audit přihlášení'],
      practice: ['Simulace: najdi stopu útoku v logu', 'Praxe: filtrování událostí o neúspěšném přihlášení'],
      builds: 'BZ4 (Defender) a BZ8 (hesla).',
    },
    {
      slug: 'ntfs', tag: 'PK4', title: 'Pokročilá NTFS oprávnění', hours: '1 h',
      subtitle: 'Dědičnost práv, explicitní vs. zděděná práva a přednost Deny.',
      intro: 'Práva se ve složkách dědí shora dolů. Naučíme se přerušit dědičnost a předvídat výsledek, když si skupiny protiřečí.',
      topics: ['Dědičnost práv ve stromu složek', 'Explicitní vs. zděděná oprávnění', 'Přednost zákazu (Deny)', 'Efektivní oprávnění uživatele'],
      practice: ['Simulace: strom složek s výpočtem efektivních práv', 'Praxe: nastavení práv pomocí grafiky a icacls'],
      builds: 'Skupiny a práva, icacls (OSS 1), UAC (BZ7).',
    },
    {
      slug: 'zasady', tag: 'PK5', title: 'Místní zásady zabezpečení', hours: '1 h',
      subtitle: 'Zásady hesel a zámek účtu na jednom počítači – předobraz skupinových politik.',
      intro: 'To, co v doméně nastavíme jednou pro všechny počítače, jde nastavit i místně. Tato kapitola je most k Group Policy.',
      topics: ['Konzole secpol.msc', 'Zásady hesel a zámek účtu', 'Místní zásady skupiny (gpedit.msc)', 'Zásady zapisují nastavení do registru'],
      practice: ['Simulace: změna zásady a její dopad na přihlášení', 'Praxe: nastavení minimální délky hesla a zámku účtu'],
      builds: 'BZ7 (účty), BZ8 (hesla).',
    },
  ],
};

/** Active Directory a Windows Server (~16 h) */
export const OSS2_AD: OutlineGroup = {
  chapterId: 'os2-ad',
  chapterTitle: 'Active Directory a doména',
  chapterDescription: 'Windows Server, doména, uživatelé a skupiny, připojení klientů a skupinové politiky.',
  chapterTag: 'ad',
  chapterPath: `${BASE}/active-directory`,
  subjectTitle: SUBJECT,
  grade: 2,
  gradeLabel: '2. Ročník',
  thematicBlock: 'Active Directory a Windows Server',
  icon: 'Network',
  gradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      slug: 'server-a-domena', tag: 'AD1', title: 'Server a doména', hours: '2 h',
      subtitle: 'Proč nestačí lokální účty a co je doména.',
      intro: 'V učebně se hlásíte jedním účtem na libovolném počítači. Za tím stojí doména – centrální evidence uživatelů, na kterou se počítače napojí.',
      topics: ['Lokální pracovní skupina vs. doména', 'Co je server a jak se liší od klienta', 'Role a funkce Windows Serveru', 'Windows Server ve virtuálním stroji'],
      practice: ['Simulace: stejná firma bez domény a s doménou', 'Praxe: první spuštění Windows Serveru a Správce serveru'],
      builds: 'Uživatelé a skupiny (OSS 1), Virtualizace.',
    },
    {
      slug: 'dns-a-radic', tag: 'AD2', title: 'DNS a řadič domény', hours: '3 h',
      subtitle: 'Role AD DS, povýšení na řadič domény a proč AD nefunguje bez DNS.',
      intro: 'Řadič domény je server, který doménu spravuje. Aby ho klienti našli, potřebují DNS – proto se obě role instalují společně.',
      topics: ['Statická IP adresa serveru', 'Instalace role AD DS', 'Povýšení na řadič domény', 'DNS: jak klient najde řadič'],
      practice: ['Simulace: vyhledání řadiče domény pomocí DNS', 'Praxe: vytvoření nové domény v laboratorní síti'],
      builds: 'Základní síťové pojmy a DNS (OSS 1).',
    },
    {
      slug: 'uzivatele-skupiny', tag: 'AD3', title: 'Uživatelé, skupiny a OU', hours: '2 h',
      subtitle: 'Návrh struktury firmy v doméně a správa účtů.',
      intro: 'Stejné účty a skupiny jako na jednom počítači, ale spravované centrálně. Do organizačních jednotek (OU) je uspořádáme jako oddělení firmy.',
      topics: ['Organizační jednotky (OU)', 'Typy skupin a model AGDLP', 'Správa uživatelů v konzoli Uživatelé a počítače AD', 'Reset hesla a zámek účtu'],
      practice: ['Simulace: návrh OU struktury fiktivní firmy', 'Praxe: založení uživatelů a skupin v doméně'],
      builds: 'Uživatelé a skupiny (OSS 1), MMC (PK1).',
    },
    {
      slug: 'klient-v-domene', tag: 'AD4', title: 'Klient v doméně', hours: '2 h',
      subtitle: 'Připojení počítače do domény a přihlášení doménovým účtem.',
      intro: 'Doména dává smysl, až když se k ní připojí počítače. Ukážeme si připojení, doménový profil a nejčastější chyby.',
      topics: ['Připojení Windows 11 do domény', 'Přihlášení doménovým vs. místním účtem', 'Doménový uživatelský profil', 'Nejčastější chyby (DNS, čas, název)'],
      practice: ['Simulace: postup připojení a diagnostika chyb', 'Praxe: připojení klienta do laboratorní domény'],
      builds: 'AD2 (DNS a řadič), AD3 (uživatelé).',
    },
    {
      slug: 'sdileni-a-prava', tag: 'AD5', title: 'Sdílení a práva přes skupiny', hours: '2 h',
      subtitle: 'Doménové sdílené složky a oprávnění pro skupiny, ne pro jednotlivce.',
      intro: 'Přidělovat práva každému zvlášť by bylo nekonečné. V doméně je dáme skupině a uživatele jen přidáváme a odebíráme.',
      topics: ['Sdílené složky na serveru', 'Práva sdílení vs. práva NTFS', 'Přístup přes skupiny (AGDLP)', 'Efektivní oprávnění uživatele'],
      practice: ['Simulace: kalkulačka efektivních práv (sdílení + NTFS + skupiny)', 'Praxe: oddělení firmy a jejich složky'],
      builds: 'Pokročilá NTFS oprávnění (PK4), sdílení (OSS 1).',
    },
    {
      slug: 'gpo', tag: 'AD6', title: 'Group Policy (GPO)', hours: '3 h',
      subtitle: 'Jedno pravidlo pro stovky počítačů: zásady hesel, zákaz USB, mapování disků.',
      intro: 'Skupinové zásady jsou největší síla domény. Nastavíme je jednou na serveru a ve správný okamžik se použijí na všech počítačích.',
      topics: ['Co je GPO a kam se připojuje', 'Pořadí použití a dědičnost zásad', 'Vynucení bezpečnosti: hesla, zákaz USB, firewall', 'Kontrola: gpupdate a gpresult'],
      practice: ['Simulace: která politika vyhraje', 'Praxe: zásada pro mapování disku a zákaz USB'],
      builds: 'Místní zásady zabezpečení (PK5).',
    },
    {
      slug: 'zaloha-a-projekt', tag: 'AD7', title: 'Záloha AD a závěrečný mini projekt', hours: '2 h',
      subtitle: 'Zálohování domény a postavení „firmy se třemi odděleními“.',
      intro: 'Doména je důležitá, proto se zálohuje. Na závěr celého bloku postavíme malou firmu od nuly.',
      topics: ['Co zálohovat u řadiče domény', 'Obnova smazaného objektu', 'Zadání: firma se třemi odděleními', 'Kontrola funkčnosti domény'],
      practice: ['Praxe: mini projekt – OU, uživatelé, skupiny, sdílení a GPO', 'Prezentace a kontrola'],
      builds: 'Zálohování (OSS 2) a celý blok AD.',
    },
  ],
};

/** Serverové služby (~9 h) */
export const OSS2_SLUZBY: OutlineGroup = {
  chapterId: 'os2-sluzby',
  chapterTitle: 'Serverové služby',
  chapterDescription: 'Sdílení souborů, vzdálená správa, webový server a tisk – stále stejný vzorec klient–server.',
  chapterTag: 'srv',
  chapterPath: `${BASE}/sluzby`,
  subjectTitle: SUBJECT,
  grade: 2,
  gradeLabel: '2. Ročník',
  thematicBlock: 'Serverové služby',
  icon: 'Database',
  gradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      slug: 'smb', tag: 'SL1', title: 'Sdílení souborů a síťový disk (SMB)', hours: '3 h',
      subtitle: 'Souborový server, práva a připojení síťové jednotky.',
      intro: 'Všechny serverové služby fungují podobně: server poslouchá na portu, klient se připojí. Souborový server je nejznámější příklad.',
      topics: ['Vzorec služby: server, port, firewall, práva, klient', 'Protokol SMB a UNC cesty', 'Práva sdílení a NTFS', 'Připojení síťového disku (net use)'],
      practice: ['Simulace: klient a server – kdo se k čemu dostane', 'Praxe: souborový server a síťové disky pro oddělení'],
      builds: 'Sdílení v síti (OSS 1), AD5 (práva přes skupiny).',
    },
    {
      slug: 'vzdalena-sprava', tag: 'SL2', title: 'Vzdálená správa: RDP a SSH', hours: '2 h',
      subtitle: 'Správa serveru bez fyzické přítomnosti u něj.',
      intro: 'Server obvykle stojí v jiné místnosti. Naučíme se připojit pomocí vzdálené plochy i příkazové řádky a zabezpečit takový přístup.',
      topics: ['Vzdálená plocha (RDP) a její zabezpečení', 'OpenSSH ve Windows a přihlášení klíčem', 'Pravidlo firewallu pro vzdálený přístup', 'Rizika veřejně dostupného RDP'],
      practice: ['Simulace: spojení klienta a serveru krok za krokem', 'Praxe: připojení k serveru přes RDP a SSH'],
      builds: 'SL1 (vzorec služby), BZ5 (firewall).',
    },
    {
      slug: 'iis', tag: 'SL3', title: 'Webový server (IIS)', hours: '3 h',
      subtitle: 'Instalace webového serveru, web, adresy a HTTPS.',
      intro: 'Webový server je služba jako každá jiná. Nainstalujeme ho, publikujeme stránku a zabezpečíme ji certifikátem.',
      topics: ['Role IIS a výchozí web', 'Vazby: adresa, port a název', 'Certifikát a HTTPS', 'Pravidla firewallu pro porty 80 a 443'],
      practice: ['Simulace: cesta požadavku (DNS, spojení, odpověď)', 'Praxe: publikování vlastní stránky a zapnutí HTTPS'],
      builds: 'SL1 (vzorec služby), AD2 (DNS), BZ5 (firewall).',
    },
    {
      slug: 'tisk', tag: 'SL4', title: 'Tiskový server', hours: '1 h',
      subtitle: 'Sdílená tiskárna pro celé oddělení.',
      intro: 'Tiskárna je z pohledu serveru další sdílený prostředek. Nastavíme ji jednou a klienti ji dostanou automaticky.',
      topics: ['Role tiskového serveru', 'Sdílení tiskárny a ovladače', 'Práva pro skupiny', 'Přidání tiskárny klientům (např. přes GPO)'],
      practice: ['Simulace: fronta tisku a práva', 'Praxe: sdílená tiskárna pro oddělení'],
      builds: 'SL1 (sdílení), AD6 (GPO).',
    },
    {
      slug: 'volitelne', tag: 'SL-V', order: 'V', icon: 'Layers', title: 'Volitelné: DHCP, databáze a e-mail', hours: 'dle času',
      subtitle: 'Rozšíření pro případ, že zbude čas: další běžné serverové služby.',
      intro: 'Pokud na hodiny zbude čas, vyzkoušíme další služby ze stejného vzorce – automatické přidělování adres, databázi nebo poštovní server.',
      topics: ['DHCP: přidělování adres a rezervace', 'Databázový server (základní práce)', 'Poštovní server a cesta e-mailu (SMTP, IMAP)', 'Stejný vzorec služby jako u SL1 až SL4'],
      practice: ['Simulace: přidělení adresy klientovi', 'Praxe: vybraná služba podle zájmu a času'],
      builds: 'SL1 až SL4.',
    },
  ],
};

export const OSS2_GROUPS: OutlineGroup[] = [OSS2_BEZPECNOST, OSS2_POKROCILA, OSS2_AD, OSS2_SLUZBY];
