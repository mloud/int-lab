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
    month: 'Září',
    topic: 'Opakování',
    topicHours: 2,
    subtopics: [
      { name: 'Wargame - CTF', hours: 2, note: 'Opakování OS 1' }
    ]
  },
  {
    month: 'Září – Říjen',
    topic: 'Zálohování a ochrana dat',
    topicHours: 10,
    subtopics: [
      { name: 'Typy záloh a principy zálohování', hours: 1, note: 'Pravidlo 3-2-1, plná, inkrementální a diferenciální záloha' },
      { name: 'Manuální záloha, struktura složek', hours: 3, note: 'Zálohování dat pomocí copy, xcopy, robocopy' },
      { name: 'Cloudová synchronizace dat', hours: 2, note: 'Google Drive' },
      { name: 'Automatizované zálohování v Cobian Reflectoru', hours: 4, note: 'Běh jako služba a záloha na síťový disk' },
    ]
  },
  {
    month: 'Listopad – Leden',
    topic: 'Bezpečnost 1: Ochrana Windows 11 a forenzní analýza',
    topicHours: 18,
    subtopics: [
      { name: 'Typologie malwaru a principy nákazy: Proč CPU nepozná zlý úmysl', hours: 2, note: 'Spuštění 6 interaktivních simulátorů' },
      { name: 'Správa procesů, Process Explorer a ověřování podpisů Authenticode', hours: 2, note: 'Forenzní laboratoř a VirusTotal.com' },
      { name: 'Izolované prostředí: Windows Sandbox a skryté spouštění Autoruns', hours: 2, note: 'Audit automatického startu a klíčů Run' },
      { name: 'Antivirový systém Windows Defender a standardní test EICAR', hours: 2, note: 'Signatury, heuristika a CLI v PowerShellu' },
      { name: 'Windows Firewall: porty, protokoly a pravidla ve wf.msc (netstat)', hours: 2, note: 'Blokace pingu a odchozí komunikace aplikací' },
      { name: 'Šifrování disků BitLocker, čip TPM 2.0 a ochrana proti ransomwaru', hours: 2, note: 'Šifrování USB disku a záchranný klíč' },
      { name: 'Správa účtů, UAC v hloubce a hromadné aktualizace winget', hours: 2, note: 'Zabezpečení tokenů a hromadný update' },
      { name: 'Síťová kyberhygiena: Phishing, správci hesel a ověření MFA', hours: 2, note: 'Analýza podvodných e-mailů a HaveIBeenPwned' },
      { name: 'Závěrečná bezpečnostní detektivka (Mini-CTF Incident Response)', hours: 2, note: 'Vyčištění kompromitovaného PC a protokol' },
    ]
  },
  {
    month: 'Únor – Březen',
    topic: 'Pokročilá správa Windows a skriptování v PowerShellu',
    topicHours: 10,
    subtopics: [
      { name: 'Konzole správce (MMC) a systémové služby na pozadí (services.msc)', hours: 2, note: 'Vlastní konzole a restart po chybě' },
      { name: 'PowerShell: Syntaxe, objekty a roury (Where-Object, Select-Object)', hours: 2, note: 'Filtrování a třídění objektů v rourách' },
      { name: 'Automatizace správy v PowerShellu (skripty .ps1 a ExecutionPolicy)', hours: 2, note: 'Tvorba HTML reportu o stavu stanice' },
      { name: 'Systémový registr Windows: Hives, klíče, hodnoty a soubory .reg', hours: 2, note: 'Záloha a hromadné úpravy nastavení OS' },
      { name: 'Prohlížeč událostí (Event Viewer) a auditní bezpečnostní logy', hours: 2, note: 'Sledování neoprávněných pokusů o přihlášení' },
    ]
  },
  {
    month: 'Duben – Květen',
    topic: 'Síťové serverové služby a podniková infrastruktura',
    topicHours: 12,
    subtopics: [
      { name: 'DHCP server: Proces DORA, rozsah Scope a statické rezervace', hours: 2, note: 'Zprovoznění DHCP na serveru ve VirtualBoxu' },
      { name: 'DNS server: Dopředné zóny, záznamy A, CNAME a PTR dotazy', hours: 2, note: 'Tvorba primární doménové zóny a nslookup' },
      { name: 'Souborový server SMB: Sdílené složky, UNC cesty a práva sdílení', hours: 2, note: 'Oddělené firemní složky a mapování disků' },
      { name: 'Vzdálená správa: RDP a OpenSSH na Windows Serveru', hours: 2, note: 'Vzdálená plocha NLA a správa serveru v SSH' },
      { name: 'Webový server IIS: Virtuální adresáře, porty a HTTPS certifikát', hours: 2, note: 'Nasazení intranetu a SSL zabezpečení' },
      { name: 'Databázový server MS SQL Server Express: Instalace a zálohování', hours: 2, note: 'Instalace, port 1433 a záloha do .bak' },
    ]
  },
  {
    month: 'Květen – Červen',
    topic: 'Active Directory, doménová správa a závěrečný projekt',
    topicHours: 14,
    subtopics: [
      { name: 'Úvod do domény: Rozdíl mezi pracovní skupinou a doménou AD', hours: 2, note: 'Centralizovaná databáze objektů a řadič DC' },
      { name: 'Instalace AD DS a povýšení serveru na řadič domény (DC)', hours: 2, note: 'Vytvoření nového doménového lesa a DNS' },
      { name: 'Organizační jednotky (OU) a tvorba doménových uživatelských účtů', hours: 2, note: 'Struktura oddělení firmy a zásady hesel' },
      { name: 'Doménové skupiny a efektivní řízení přístupových práv k datům', hours: 2, note: 'Přiřazení práv ke složkám přes skupiny' },
      { name: 'Připojení klientské stanice Windows 11 do domény', hours: 2, note: 'Konfigurace DNS klienta a doménové přihlášení' },
      { name: 'Skupinové politiky GPO: Centrální konfigurace a restrikce stanic', hours: 2, note: 'Zákaz USB disků a automatické mapování disků' },
      { name: 'Závěrečný integrující projekt: Zprovoznění podnikové infrastruktury', hours: 2, note: 'Předvedení sítě: Server + Klient + GPO' },
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
