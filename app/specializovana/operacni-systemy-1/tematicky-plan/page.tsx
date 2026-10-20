'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable, { PlanTopic } from '@/components/curriculum/SimplePlanTable';
import { SVP_OSS1_DATA } from '@/registry/curriculum/svpData';

// =========================================================================
// TEMATICKÝ PLÁN: OPERAČNÍ SYSTÉMY 1 (1. ROČNÍK)
// Celkem: 66 hodin (33 týdnů × 2 hodiny týdně)
// Tuto tabulku můžete přímo upravovat podle vašich potřeb.
// =========================================================================

const PLAN_OSS1: PlanTopic[] = [
  {
    month: 'Září',
    topic: 'Úvod do OS a HW pro OS',
    topicHours: 8,
    subtopics: [
      { name: 'Instalace OS Windows 11 do notebooku a simulátoru', hours: 2, note: '' },
      { name: 'Základy hardwaru počítače', hours: 2, note: 'Von Neumannovo schéma' },
      { name: 'Úvod do OS', hours: 1, note: 'Vrstvený model počítače, Funkce OS' },
      { name: 'Evoluce OS', hours: 1, note: 'OS ve VirtualBoxu' },
      { name: 'Architektura OS', hours: 1, note: 'Monolitické vs. hybridní jádro, mikrojádro, ovladače' },
      { name: 'Virtualizace', hours: 1, note: 'VirtualBox' },
    ]
  },
  {
    month: 'Říjen',
    topic: 'Souborový systém a disky',
    topicHours: 10,
    subtopics: [
      { name: 'Úvod do architektury souborového systému', hours: 1, note: 'Úloha OS, sjednocený vrstvený model, disk a sektor' },
      { name: 'Paměťová média', hours: 1, note: 'Princip, rychlost, měření rychlosti' },
      { name: 'Dělení disku', hours: 2, note: 'Logické a fyzické oddíly' },
      { name: 'Systém souborů', hours: 2, note: 'Princip FAT, fragmentace, klastry' },
      { name: 'Systém souborů', hours: 2, note: 'Praktické úlohy' },
      { name: 'Start systému (Boot proces)', hours: 2, note: 'POST test, BIOS vs. UEFI, MBR vs. GPT boot, zavaděč OS' },
    ]
  },
  {
    month: 'Listopad – Prosinec',
    topic: 'Procesy a paměť',
    topicHours: 6,
    subtopics: [
      { name: 'Úvod a vznik procesu', hours: 2, note: 'Program na disku vs. proces v RAM, PID, Správce úloh' },
      { name: 'Střídání procesů', hours: 1, note: 'Iluze současného běhu, časová kvanta' },
      { name: 'Životní cyklus a stavy', hours: 1, note: 'Stavy procesů (Běžící, Připravený, Blokovaný), čekání na I/O' },
      { name: 'Vlákna (Threads)', hours: 1, note: 'Rozdíl mezi procesem a vláknem, sdílená paměť' },
      { name: 'Virtuální paměť a stránkování', hours: 1, note: 'Jednotka MMU, stránkování do pagefile.sys, Page Fault' },
    ]
  },
  {
    month: 'Leden',
    topic: 'Grafické rozhraní Windows 11 (GUI)',
    topicHours: 4,
    subtopics: [
      { name: 'Architektura GUI a proces Explorer', hours: 1, note: 'Desktop Window Manager (dwm.exe), plocha, restart explorer.exe' },
      { name: 'Hierarchie disku C: a systémové složky', hours: 1, note: 'Windows, System32, Program Files, profily v C:\\Users a skrytá AppData' },
      { name: 'Práce se soubory, atributy a konfigurace', hours: 2, note: 'Zástupci .lnk vs. soubory, atributy R, H, S, A, Nastavení vs. Ovládací panely' },
    ]
  },
  {
    month: 'Únor',
    topic: 'Příkazová řádka a dávkové soubory',
    topicHours: 6,
    subtopics: [
      { name: 'Orientace v systému a navigace v CLI', hours: 2, note: 'Běžný uživatel vs. Správce, přepínání disků, dir, cd, cesty, klávesa Tab' },
      { name: 'Správa souborů a složek v CLI', hours: 2, note: 'Příkazy mkdir, rmdir, copy, move, del, zástupné znaky * a ?' },
      { name: 'Roury, přesměrování a filtry', hours: 2, note: 'Přesměrování >, >>, roura |, filtr findstr, příkaz systeminfo' },
    ]
  },
  {
    month: 'Březen',
    topic: 'Správa uživatelů a oprávnění',
    topicHours: 8,
    subtopics: [
      { name: 'Uživatelské účty a autentizace', hours: 2, note: 'Lokální účet vs. Účet Microsoft, Standard vs. Správce, lusrmgr.msc, net user' },
      { name: 'Zabezpečení účtů, hesla a UAC', hours: 2, note: 'Politika hesel, PIN a TPM čip, zámek Win+L, mechanismus UAC' },
      { name: 'Uživatelské skupiny a role', hours: 2, note: 'Význam skupin, Administrators vs. Users, net localgroup' },
      { name: 'Práva k souborům a složkám (NTFS)', hours: 2, note: 'Oprávnění NTFS, karta Zabezpečení, dědičnost práv, Deny, nástroj icacls' },
    ]
  },
  {
    month: 'Duben',
    topic: 'Správa software',
    topicHours: 4,
    subtopics: [
      { name: 'Životní cyklus software a instalátory', hours: 2, note: 'Životní cyklus, umístění na disku, instalátory EXE vs. MSI balíčky, tichá instalace' },
      { name: 'Správa aplikací a balíčkovač Winget', hours: 2, note: 'Instalátory EXE vs. MSI balíčky, tichá instalace, balíčkovač winget' },
    ]
  },
  {
    month: 'Květen',
    topic: 'Správa zařízení a Plánovač úloh',
    topicHours: 4,
    subtopics: [
      { name: 'Správa zařízení a ovladače (Drivers)', hours: 2, note: 'Konzole devmgmt.msc, komunikace v Ring 0, Plug and Play, nástroj pnputil' },
      { name: 'Plánovač úloh a automatický provoz', hours: 2, note: 'Konzole taskschd.msc, spouštěče (triggery), akce, běh pod účtem SYSTEM' },
    ]
  },
  {
    month: 'Květen',
    topic: 'Síťová konfigurace a lokální sítě (LAN)',
    topicHours: 8,
    subtopics: [
      { name: 'Síťové adaptéry, MAC vs. IP a ipconfig', hours: 2, note: 'Fyzická MAC vs. logická IP adresa, maska podsítě, DHCP, příkaz ipconfig' },
      { name: 'Diagnostika spojení a cesta paketu (Ping & Tracert)', hours: 2, note: 'Diagnostický žebříček ping (loopback, brána, DNS), trasování tracert' },
      { name: 'Profily sítě Windows, Wi-Fi a sdílení v LAN', hours: 2, note: 'Profily sítě (Veřejná/Privátní), sdílení v LAN, Wi-Fi standardy' },
      { name: 'Praktické úlohy', hours: 2, note: 'Konfigurace SOHO Wi-Fi routeru, test konektivity v labu' },
    ]
  },
  {
    month: 'Červen',
    topic: 'Závěrečný projekt a hodnocení',
    topicHours: 8,
    subtopics: [
      { name: 'Závěrečný praktický projekt – konfigurace stanice', hours: 2, note: 'Příprava oddílů, instalace, uživatelské účty a NTFS práva' },
      { name: 'Závěrečný praktický projekt – síť a automatizace', hours: 2, note: 'Konfigurace síťového připojení, balíčkovač software, údržbový skript' },
      { name: 'Závěrečný praktický projekt – ladění a testování', hours: 2, note: 'Diagnostika poruch, kontrola funkčnosti, odstranění simulovaných závad' },
      { name: 'Obhajoba projektu a hodnocení ročníku', hours: 2, note: 'Předvedení stanice, reflexe řešení, uzavření známek' },
    ]
  }
];

export default function Page() {
  return (
    <CategoryLayout
      title="Tematický plán: Operační systémy 1"
      category="specializovana"
      parent={{ title: 'Operační systémy 1', path: '/specializovana/operacni-systemy-1' }}
    >
      <SimplePlanTable
        title="Operační systémy 1"
        gradeLabel="1. Ročník SŠ"
        backRoute="/specializovana/operacni-systemy-1"
        topics={PLAN_OSS1}
        svpData={SVP_OSS1_DATA}
      />
    </CategoryLayout>
  );
}
