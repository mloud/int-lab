'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable, { PlanTopic } from '@/components/curriculum/SimplePlanTable';
import { SVP_OSS3_DATA } from '@/registry/curriculum/svpData';

// =========================================================================
// TEMATICKÝ PLÁN: OPERAČNÍ SYSTÉMY 3 (3. ROČNÍK)
// Celkem: 66 hodin (33 týdnů × 2 hodiny týdně)
// Tuto tabulku můžete přímo upravovat podle vašich potřeb.
// =========================================================================

const PLAN_OSS3: PlanTopic[] = [
  {
    month: 'Září – Říjen',
    topic: 'Linux: Architektura, instalace a základní správa systému',
    topicHours: 16,
    subtopics: [
      { name: 'Architektura Linuxu, distribuce a instalace Ubuntu Serveru', hours: 2, note: 'Instalace headless serveru ve VirtualBoxu' },
      { name: 'Hierarchie souborového systému FHS a orientace v terminálu', hours: 2, note: 'Složky /etc, /var, /home, příkazy cd, ls, cp, rm' },
      { name: 'Uživatelé, skupiny a POSIX oprávnění (chmod, chown, sudoers)', hours: 2, note: 'Práva rwx v osmičkách (755, 644) a sudo' },
      { name: 'Proudové filtry, roury a textové editory (cat, grep, nano, vim)', hours: 2, note: 'Roury |, přesměrování a práce v nano' },
      { name: 'Správa disků v Linuxu: oddíly, formátování a připojování /etc/fstab', hours: 2, note: 'Nástroje fdisk, mkfs.ext4 a mount' },
      { name: 'Správa procesů a sledování vytížení (ps, top, htop, kill, nice)', hours: 2, note: 'Monitor htop a ukončení procesu přes kill' },
      { name: 'Správa software a balíčkovací systém APT (repozitáře a aktualizace)', hours: 2, note: 'Příkazy apt update, install a závislosti' },
      { name: 'Systémové služby (systemd) a analýza logů (journalctl)', hours: 2, note: 'Řízení démonů přes systemctl a žurnál' },
    ]
  },
  {
    month: 'Listopad – Prosinec',
    topic: 'Linux: Sítě, serverové služby a Bash skriptování',
    topicHours: 16,
    subtopics: [
      { name: 'Vzdálená správa přes SSH: Asymetrické klíče a zabezpečení serveru', hours: 2, note: 'Generování klíčů Ed25519 a zákaz root hesla' },
      { name: 'Síťová konfigurace v Linuxu a paketový firewall UFW', hours: 2, note: 'Konfigurace Netplan a pravidla ufw allow' },
      { name: 'Webový server Apache: Konfigurace, virtuální hostitelé a práva', hours: 2, note: 'Adresář /var/www/html a VirtualHost' },
      { name: 'Zabezpečení webu certifikátem HTTPS (Let\'s Encrypt a Certbot)', hours: 2, note: 'Konfigurace SSL a přesměrování z portu 80' },
      { name: 'Sdílení dat mezi Linuxem a Windows přes Sambu (smb.conf)', hours: 2, note: 'Síťový disk přístupný přes \\\\linux-ip\\sdileno' },
      { name: 'Programování v Bashi: Shebang, proměnné a argumenty ($1, $#)', hours: 2, note: 'Skript pro automatické vytvoření uživatele' },
      { name: 'Pokročilý Bash: Podmínky if, cykly for a zálohovací skript s tarem', hours: 2, note: 'Zálohovací skript s kompresí tar.gz' },
      { name: 'Automatické plánování úloh v Linuxu (Cron a crontab -e)', hours: 2, note: 'Syntaxe 5 hvězdiček a noční zálohy' },
    ]
  },
  {
    month: 'Leden',
    topic: 'Verzovací systém Git a týmová spolupráce na GitHubu',
    topicHours: 8,
    subtopics: [
      { name: 'Principy verzování: Tři zóny Gitu a první commit', hours: 2, note: 'Zóny Working, Staging a Repository' },
      { name: 'Běžný pracovní cyklus, historie a ignorování souborů (.gitignore)', hours: 2, note: 'Příkazy status, log, diff a .gitignore' },
      { name: 'Větvení (Branches), slučování (Merge) a řešení kolizí', hours: 2, note: 'Příkazy branch, merge a manuální řešení konfliktů' },
      { name: 'Vzdálené repozitáře a týmový GitHub workflow (Push, Pull, PR)', hours: 2, note: 'Spolupráce přes Pull Request a Code Review' },
    ]
  },
  {
    month: 'Únor – Březen',
    topic: 'Kybernetická bezpečnost, audit zranitelností a obrana',
    topicHours: 12,
    subtopics: [
      { name: 'Právní a etický rámec: Trestní zákoník, NIS 2 a Cyber Kill Chain', hours: 2, note: 'Paragrafy § 230–232 TrZ a analýza kauz' },
      { name: 'Průzkum sítě a mapování zranitelností (Nmap a CVE databáze)', hours: 2, note: 'Skenování portů a dohledání CVE' },
      { name: 'Analýza síťového provozu ve Wiresharku (Odposlech vs. Šifrování)', hours: 2, note: 'Odchyt nešifrovaného hesla v HTTP' },
      { name: 'Útoky na Windows infrastrukturu a Active Directory (Pass-the-Hash)', hours: 2, note: 'Extrakce hashů z LSASS a obrana' },
      { name: 'Audit odolnosti hesel: Slovníkové útoky a lámání hashů', hours: 2, note: 'Nástroj John the Ripper a slovník RockYou' },
      { name: 'Závěrečné bezpečnostní cvičení: CTF na kompromitovaném Linuxu', hours: 2, note: 'Nalezení zadních vrátek a oprava serveru' },
    ]
  },
  {
    month: 'Duben – Květen',
    topic: 'Týmový infrastrukturní projekt a agilní řízení (Kanban)',
    topicHours: 10,
    subtopics: [
      { name: 'Agilní organizace týmové práce: Metodika Kanban a GitHub Projects', hours: 2, note: 'Nástěnka úkolů, backlog a role v týmu' },
      { name: 'Zadání projektu: Stavba hybridní firemní sítě (Linux + Windows + Git)', hours: 2, note: 'Společný návrh topologie a harmonogramu' },
      { name: 'Realizace projektu I: Konfigurace síťových služeb a serverů v týmu', hours: 2, note: 'Konfigurace serverů ve VirtualBoxu' },
      { name: 'Realizace projektu II: Zabezpečení, zálohování a testování odolnosti', hours: 2, note: 'Křížový bezpečnostní audit mezi týmy' },
      { name: 'Prezentace a technická obhajoba projektů před třídou', hours: 2, note: 'Předvedení živé infrastruktury a hodnocení' },
    ]
  },
  {
    month: 'Červen',
    topic: 'Závěrečná reflexe tříletého kurikula a rezerva',
    topicHours: 4,
    subtopics: [
      { name: 'Syntéza tříleté výuky: Komparace Windows a Linuxové administrace', hours: 2, note: 'Typové maturitní úlohy ze správy OS' },
      { name: 'Rezerva pro školní akce a uzavření klasifikace 3. ročníku', hours: 2, note: 'Zpětná vazba a uzavření známek' },
    ]
  }
];

export default function Page() {
  return (
    <CategoryLayout
      title="Tematický plán: Operační systémy 3"
      category="specializovana"
      parent={{ title: 'Operační systémy 3', path: '/specializovana/operacni-systemy-3' }}
    >
      <SimplePlanTable
        title="Operační systémy 3"
        gradeLabel="3. Ročník SŠ"
        backRoute="/specializovana/operacni-systemy-3"
        topics={PLAN_OSS3}
        svpData={SVP_OSS3_DATA}
      />
    </CategoryLayout>
  );
}
