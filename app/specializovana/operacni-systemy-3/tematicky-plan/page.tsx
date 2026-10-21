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
    topic: '1. Linux: Architektura, instalace a základní správa systému',
    topicHours: 16,
    subtopics: [
      { name: 'Architektura Linuxu, distribuce a instalace serveru bez GUI', hours: 2, note: 'Rozdělení disku na oddíly, odkládací prostor swap a zavaděč GRUB' },
      { name: 'Hierarchie souborového systému FHS a orientace v terminálu', hours: 2, note: 'Standardní struktura složek (/etc, /var, /home) a manipulační příkazy CLI' },
      { name: 'Uživatelé, skupiny a POSIX oprávnění (chmod, chown, sudo)', hours: 2, note: 'Model vlastník-skupina-ostatní, osmičková notace práv a delegování práv přes sudoers' },
      { name: 'Proudové filtry, roury a textové editory v terminálu', hours: 2, note: 'Přesměrování výstupu, roury |, vyhledávání textu grep a editory nano/vim' },
      { name: 'Správa disků v Linuxu: oddíly, formátování a připojování /etc/fstab', hours: 2, note: 'Nástroje fdisk, mkfs.ext4, mount a trvalé přípojné body' },
      { name: 'Správa procesů a sledování vytížení systému', hours: 2, note: 'Výpis procesů ps, interaktivní monitor htop, priority a ukončování procesů kill' },
      { name: 'Správa software a balíčkovací systém (repozitáře a balíčky)', hours: 2, note: 'Aktualizace indexů balíčků, instalace software a správa knihovních závislostí' },
      { name: 'Systémové služby (systemd démony) a analýza žurnálu logů', hours: 2, note: 'Řízení stavu služeb přes systemctl a vyhodnocování chyb v journalctl' },
    ]
  },
  {
    month: 'Listopad – Prosinec',
    topic: '2. Linux: Sítě, serverové služby a automatizace v shellu',
    topicHours: 16,
    subtopics: [
      { name: 'Síťová konfigurace v Linuxu a paketový firewall', hours: 2, note: 'Konfigurace síťových rozhraní, diagnostika konektivity a firewallová pravidla UFW' },
      { name: 'Zabezpečená vzdálená správa přes SSH a asymetrické klíče', hours: 2, note: 'Generování páru klíčů, autorizované klíče a zákaz přihlášení heslem správce' },
      { name: 'Webový server: Konfigurace, virtuální hostitelé a oprávnění', hours: 2, note: 'Instalace webové služby, kořenový adresář /var/www/html a VirtualHost' },
      { name: 'Zabezpečení webu certifikátem HTTPS a šifrování provozu', hours: 2, note: 'Nasazení SSL/TLS certifikátů a automatické přesměrování z portu 80 na 443' },
      { name: 'Heterogenní sdílení dat v síti (Linux ↔ Windows)', hours: 2, note: 'Služba Samba, konfigurace sdílených složek, autentizace a mapování z Windows' },
      { name: 'Administrační skriptování v shellu: Proměnné a parametry', hours: 2, note: 'Shebang #!/bin/bash, práva spuštění +x, proměnné a zpracování argumentů $1' },
      { name: 'Administrační skriptování v shellu: Podmínky, cykly a zálohování', hours: 2, note: 'Podmínky if, cykly for, archivace a komprese dat (tar) pro automatické zálohy' },
      { name: 'Automatické periodické plánování úloh v systému (cron)', hours: 2, note: 'Syntaxe crontab, plánování nočních údržbových a zálohovacích skriptů' },
    ]
  },
  {
    month: 'Leden – Únor',
    topic: '3. Kybernetická bezpečnost, síťový audit a obrana',
    topicHours: 12,
    subtopics: [
      { name: 'Právní a etický rámec: Trestní zákoník, NIS 2 a Cyber Kill Chain', hours: 2, note: 'Paragrafy § 230–232 TrZ, mezinárodní směrnice NIS 2 a fáze kybernetického útoku' },
      { name: 'Bezpečnostní průzkum sítě a mapování zranitelností (CVE)', hours: 2, note: 'Skenování síťových portů Nmapem, verze služeb a vyhledání závažnosti v CVSS' },
      { name: 'Analýza síťového provozu paketovým analyzátorem (Wireshark)', hours: 2, note: 'Odposlech síťových paketů, TCP spojení, srovnání HTTP a šifrovaného HTTPS/SSH' },
      { name: 'Ochrana autentizace a princip ukládání hesel v operačních systémech', hours: 2, note: 'Kryptografické hashovací funkce, solení hesel a formáty ukládání hashů' },
      { name: 'Audit odolnosti hesel: Slovníkové útoky a testování síly hesel', hours: 2, note: 'Ověření odolnosti hesel vůči útokům hrubou silou a oborové standardy bezpečnosti' },
      { name: 'Reakce na bezpečnostní incident a náprava kompromitovaného systému (CTF)', hours: 2, note: 'Detekce neoprávněné aktivity v logu, zablokování útočníka firewallem a nápravná opatření' },
    ]
  },
  {
    month: 'Březen – Květen',
    topic: '4. Verzovací systémy, týmová kooperace a infrastrukturní projekt',
    topicHours: 18,
    subtopics: [
      { name: 'Principy verzování: Tři zóny Gitu a tvorba commitů', hours: 2, note: 'Architektura verzovacího systému, pracovní adresář, stage, commit a .gitignore' },
      { name: 'Větvení (Branches), slučování (Merge) a řešení kolizí', hours: 2, note: 'Izolovaný vývoj ve větvích, slučování změn a manuální řešení konfliktů v konfiguracích' },
      { name: 'Vzdálené repozitáře a týmový workflow (Push, Pull, Pull Request)', hours: 2, note: 'Spolupráce přes vzdálený repozitář, proces Pull Requestů a revize kódu' },
      { name: 'Agilní organizace práce, Kanban a týmová komunikace', hours: 2, note: 'Nástěnka úkolů, správa backlogu, rozdělení rolí v týmu a komunikační nástroje' },
      { name: 'Realizace projektu: Návrh infrastruktury a serverové služby', hours: 4, note: 'Týmové zprovoznění linuxových serverů, webu a sdílení dat, verzování konfigurací v Gitu' },
      { name: 'Realizace projektu: Klientská integrace a zabezpečení sítě', hours: 4, note: 'Propojení se stanicemi Windows, nastavení přístupových práv, zálohování a firewall' },
      { name: 'Křížový bezpečnostní audit, test záloh a ústní obhajoba projektu', hours: 2, note: 'Předvedení živé infrastruktury před komisí, kontrola funkčnosti záloh a hodnocení' },
    ]
  },
  {
    month: 'Červen',
    topic: '5. Závěrečná reflexe tříletého kurikula a rezerva',
    topicHours: 4,
    subtopics: [
      { name: 'Syntéza tříleté výuky: Komparace Windows a Linuxové administrace', hours: 2, note: 'Srovnání administrátorských přístupů a typové maturitní úlohy ze správy OS a sítí' },
      { name: 'Rezerva pro školní akce a uzavření klasifikace 3. ročníku', hours: 2, note: 'Zpětná vazba, konzultace a uzavření klasifikace' },
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
