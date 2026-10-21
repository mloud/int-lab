'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable, { PlanTopic } from '@/components/curriculum/SimplePlanTable';
import { SVP_OSS2_DATA } from '@/registry/curriculum/svpData';

// =========================================================================
// TEMATICKÝ PLÁN: OPERAČNÍ SYSTÉMY 2 (2. ROČNÍK)
// Celkem: 66 hodin (33 týdnů × 2 hodiny týdně)
// Tuto tabulku můžete přímo upravovat podle vašich potřeb.
// =========================================================================

const PLAN_OSS2: PlanTopic[] = [
  {
    month: 'Září – Říjen',
    topic: '1. Správa podnikových dat a zálohování',
    topicHours: 10,
    subtopics: [
      { name: 'Wargame – prověrka administrátorských dovedností z 1. ročníku', hours: 2, note: 'Diagnostika sítě, správa přístupových oprávnění NTFS a práce v textovém rozhraní' },
      { name: 'Zásady zálohování a oborové pravidlo 3-2-1', hours: 2, note: 'Plná, přírůstková a rozdílová záloha, archivní atribut a stínové kopie svazku VSS' },
      { name: 'Skriptovaná synchronizace dat v příkazovém rozhraní', hours: 2, note: 'Zrcadlení složek a logování v systémových nástrojích (robocopy)' },
      { name: 'Cloudová synchronizace vs. nezávislá neměnná záloha', hours: 2, note: 'Rizika synchronizace při napadení ransomwarem a ochrana verzí' },
      { name: 'Automatizované zálohování jako systémová služba', hours: 2, note: 'Běh pod systémovým účtem, ochrana záložních archivů šifrováním a heslem, zálohování na síťový disk a test obnovy' },
    ]
  },
  {
    month: 'Listopad – Leden',
    topic: '2. Bezpečnost koncových zařízení, audit a forenzní analýza',
    topicHours: 20,
    subtopics: [
      { name: 'Typologie malwaru a proč CPU nepozná zlý úmysl', hours: 2, note: '6 hrozeb: virus, červ, trojan, ransomware, spyware; zneužití uživatelských tokenů' },
      { name: 'Forenzní analýza procesů a ověřování podpisů Authenticode', hours: 2, note: 'Procesní stromy, inspekční nástroje, kontrolní součty a reputační cloud' },
      { name: 'Systémový registr a persistence škodlivého kódu', hours: 2, note: 'Hierarchie klíčů pro počítač a uživatele, autorun spouštění po startu, export/import .reg' },
      { name: 'Systémový žurnál událostí a bezpečnostní audit', hours: 2, note: 'Prohlížeč událostí, auditní logy úspěšných a neúspěšných přihlášení, filtrace chyb' },
      { name: 'Izolované testovací prostředí (Sandbox) a systémový antivirus', hours: 2, note: 'Signatury, heuristika, chování programu v paměti a standardní testovací vzorek EICAR' },
      { name: 'Paketový firewall na koncovém zařízení', hours: 2, note: 'Příchozí a odchozí pravidla, filtrace portů a sledování aktivních spojení (netstat)' },
      { name: 'Diskové šifrování a hardwarový bezpečnostní čip TPM', hours: 2, note: 'Šifrování systémového i výměnného disku (BitLocker) a záchranné obnovovací klíče' },
      { name: 'Správa systémových aktualizací a zranitelnosti (0-day)', hours: 2, note: 'Servisní cykly záplat, princip zranitelností nultého dne a hromadná údržba aplikací' },
      { name: 'Sociální inženýrství, phishing a ochrana identity', hours: 2, note: 'Analýza podvodných e-mailů a hlaviček, vícefaktorové ověřování MFA a správci hesel' },
      { name: 'Vyšetřování bezpečnostního incidentu (Mini-CTF)', hours: 2, note: 'Detekce neoprávněné aktivity, izolace stanice, odstranění perzistentní hrozby a incident report' },
    ]
  },
  {
    month: 'Únor – Březen',
    topic: '3. Systémové služby a administrační skriptování (PowerShell)',
    topicHours: 18,
    subtopics: [
      { name: 'Systémové služby Windows na pozadí a jejich životní cyklus', hours: 4, note: 'Účet SYSTEM, typy spouštění, systémové závislosti a automatický restart po selhání' },
      { name: 'Konzole správce (MMC) a centrální diagnostika', hours: 4, note: 'Vlastní konzole snap-inů, řešení pádů služeb a zamrznutí' },
      { name: 'PowerShell: Objektový shell, syntaxe cmdletů a roury', hours: 4, note: 'Syntaxe Sloveso-PodstatnéJméno, Get-Help, předávání objektů rourou, Where-Object a Select-Object' },
      { name: 'Administrační skriptování v PowerShellu (.ps1)', hours: 4, note: 'Proměnné, cykly foreach, bezpečnostní politika ExecutionPolicy, automatizace a správa' },
      { name: 'Automatizovaný sběr dat a generování stavových reportů', hours: 2, note: 'Diagnostika hardware/software stanice a export do formátů CSV a HTML' },
    ]
  },
  {
    month: 'Duben – Červen',
    topic: '4. Síťové sdílení prostředků, vzdálená správa a centrální správa v doméně',
    topicHours: 18,
    subtopics: [
      { name: 'Síťové sdílení složek a efektivní přístupová práva (SMB)', hours: 4, note: 'UNC cesty, kombinovaná práva sdílení a NTFS, mapování síťové jednotky' },
      { name: 'Zabezpečená vzdálená správa pracovní plochy (RDP)', hours: 2, note: 'Autorizace vzdálených uživatelů a zabezpečení na úrovni sítě (NLA)' },
      { name: 'Koncept podnikové infrastruktury a domény', hours: 2, note: 'Pracovní skupina vs. doménové prostředí, centralizovaná autentizace, role DNS a řadiče domény' },
      { name: 'Klientská stanice v podnikové doméně a uživatelské profily', hours: 4, note: 'Připojení klientského PC do domény, profil doménového uživatele, oddělení lokálních a doménových práv' },
      { name: 'Skupinové politiky (Group Policy – uplatnění na stanici)', hours: 4, note: 'Distribuce centrálních nastavení, zákaz výměnných USB disků a bezpečnostní restrikce stanic' },
      { name: 'Závěrečný integrující projekt administrace a zabezpečení stanice', hours: 2, note: 'Komplexní konfigurace, křížový audit odolnosti a technická obhajoba' },
    ]
  }
];

export default function Page() {
  return (
    <CategoryLayout
      title="Tematický plán: Operační systémy 2"
      category="specializovana"
      parent={{ title: 'Operační systémy 2', path: '/specializovana/operacni-systemy-2' }}
    >
      <SimplePlanTable
        title="Operační systémy 2"
        gradeLabel="2. Ročník SŠ"
        backRoute="/specializovana/operacni-systemy-2"
        topics={PLAN_OSS2}
        svpData={SVP_OSS2_DATA}
      />
    </CategoryLayout>
  );
}
