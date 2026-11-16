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
    month: 'Září – Listopad',
    topic: '1. Linux: Architektura, instalace a základní správa systému',
    topicHours: 20,
    subtopics: [
      { name: 'Architektura Linuxu, distribuce a instalace serveru bez GUI', hours: 2, note: 'Rozdělení disku na oddíly, odkládací prostor swap a zavaděč GRUB' },
      { name: 'Hierarchie souborového systému FHS a orientace v terminálu', hours: 4, note: 'Standardní struktura složek (/etc, /var, /home), manipulační příkazy CLI a samostatné procvičování v terminálu' },
      { name: 'Uživatelé, skupiny a POSIX oprávnění (chmod, chown, sudo)', hours: 4, note: 'Model vlastník-skupina-ostatní, osmičková notace práv, delegování práv přes sudoers a procvičování řešení typických situací' },
      { name: 'Proudové filtry, roury a textové editory v terminálu', hours: 2, note: 'Přesměrování výstupu, roury |, vyhledávání textu grep a editory nano/vim' },
      { name: 'Správa disků v Linuxu: oddíly, formátování a připojování /etc/fstab', hours: 2, note: 'Nástroje fdisk, mkfs.ext4, mount a trvalé přípojné body' },
      { name: 'Správa procesů a sledování vytížení systému', hours: 2, note: 'Výpis procesů ps, interaktivní monitor htop, priority a ukončování procesů kill' },
      { name: 'Správa software a balíčkovací systém (repozitáře a balíčky)', hours: 2, note: 'Aktualizace indexů balíčků, instalace software a správa knihovních závislostí' },
      { name: 'Systémové služby (systemd démony) a analýza žurnálu logů', hours: 2, note: 'Řízení stavu služeb přes systemctl a vyhodnocování chyb v journalctl' },
    ]
  },
  {
    month: 'Listopad – Leden',
    topic: '2. Linux: Sítě, serverové služby a automatizace v shellu',
    topicHours: 20,
    subtopics: [
      { name: 'Síťová konfigurace v Linuxu a paketový firewall', hours: 2, note: 'Konfigurace síťových rozhraní, diagnostika konektivity a firewallová pravidla UFW' },
      { name: 'Zabezpečená vzdálená správa přes SSH a asymetrické klíče', hours: 2, note: 'Generování páru klíčů, autorizované klíče a zákaz přihlášení heslem správce' },
      { name: 'Webový server: Konfigurace, virtuální hostitelé a oprávnění', hours: 2, note: 'Instalace webové služby, kořenový adresář /var/www/html a VirtualHost' },
      { name: 'Zabezpečení webu certifikátem HTTPS a šifrování provozu', hours: 2, note: 'Nasazení SSL/TLS certifikátů a automatické přesměrování z portu 80 na 443' },
      { name: 'Heterogenní sdílení dat v síti (Linux ↔ Windows)', hours: 2, note: 'Služba Samba, konfigurace sdílených složek, autentizace a mapování z Windows' },
      { name: 'Administrační skriptování v shellu: Proměnné a parametry', hours: 2, note: 'Shebang #!/bin/bash, práva spuštění +x, proměnné a zpracování argumentů $1' },
      { name: 'Administrační skriptování v shellu: Podmínky, cykly a zálohování', hours: 4, note: 'Podmínky if, cykly for, archivace a komprese dat (tar) pro automatické zálohy a samostatné odladění vlastního skriptu' },
      { name: 'Automatické periodické plánování úloh v systému (cron)', hours: 2, note: 'Syntaxe crontab, plánování nočních údržbových a zálohovacích skriptů' },
      { name: 'Komplexní praktická úloha: Správa linuxových služeb a zálohování', hours: 2, note: 'Samostatné nasazení a integrace služeb, testování obnovy dat ze záložního archivu' },
    ]
  },
  {
    month: 'Únor',
    topic: '3. Kybernetická bezpečnost, síťový audit a obrana',
    topicHours: 6,
    subtopics: [
      { name: 'Bezpečnostní průzkum sítě, zranitelnosti (Nmap & CVE) a zákonné meze', hours: 2, note: 'CIA triáda, fáze útoku, skenování portů Nmapem, vyhledání závažnosti v CVE/CVSS a hranice legálního testování' },
      { name: 'Ochrana hesel: hashe, solení a odolnost vůči slovníkovým testům', hours: 2, note: 'Kryptografické hashe, význam soli, ukládání v /etc/shadow, slovníkový test vs. hrubá síla a zásady silných hesel' },
      { name: 'Reakce na bezpečnostní incident a náprava kompromitovaného systému', hours: 2, note: 'Detekce neoprávněné aktivity v logu, zablokování útočníka firewallem a protokol o nápravě' },
    ]
  },
  {
    month: 'Březen – Duben',
    topic: '4. Verzovací systémy, týmová kooperace a správa kódu',
    topicHours: 10,
    subtopics: [
      { name: 'Principy verzování: Tři zóny Gitu a první commit', hours: 2, note: 'Architektura verzovacího systému, pracovní adresář, stage, commit a .gitignore' },
      { name: 'Běžný pracovní cyklus, historie změn a bezpečný návrat (restore)', hours: 2, note: 'Příkazy status, log, diff a vrácení chybné úpravy do stabilního stavu' },
      { name: 'Větvení (Branches), slučování (Merge) a řešení kolizí', hours: 2, note: 'Izolovaný vývoj ve větvích, slučování změn a manuální řešení merge konfliktů v souborech' },
      { name: 'Vzdálené repozitáře a týmová spolupráce (GitHub, Pull Request)', hours: 2, note: 'SSH klíče, synchronizace push/pull, větve a vzájemná revize kódu přes Pull Request' },
      { name: 'Plánování úkolů na týmové nástěnce Kanban a organizace práce', hours: 2, note: 'Řízení práce na nástěnce (GitHub Projects / Issues), rozpad úkolů a týmová komunikace' },
    ]
  },
  {
    month: 'Květen – Červen',
    topic: '5. Závěrečný komplexní projekt a reflexe tříletého kurikula',
    topicHours: 10,
    subtopics: [
      { name: 'Syntéza tříleté výuky: Komparace Windows a Linuxové administrace', hours: 2, note: 'Srovnání administrátorských přístupů a typové souhrnné úlohy ze správy OS a sítí' },
      { name: 'Závěrečný komplexní projekt: Samostatný scénář správy OS a sítí', hours: 6, note: 'Samostatná komplexní laboratorní úloha integrující klientské a serverové služby, zabezpečení a diagnostiku' },
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
