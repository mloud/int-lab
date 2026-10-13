'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Activity, 
  FileText, 
  HelpCircle, 
  Terminal, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Lock, 
  Key, 
  Cpu, 
  Network, 
  FileCheck, 
  ChevronDown, 
  Search, 
  CheckSquare, 
  Square, 
  Copy, 
  ShieldAlert, 
  Sparkles,
  Server,
  Fingerprint,
  RotateCcw,
  FileCode,
  Edit3,
  Minimize2,
  Square as SquareIcon,
  X,
  Zap,
  Shield
} from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ProcessCertificatesChapterProps {
  onBack: () => void;
}

// Výchozí originální text podepsaného souboru (Poznámkový blok)
const ORIGINAL_AUTHENTICODE_TEXT = `@echo off
rem ========================================================
rem Skolni bezpecnostni aktualizace v1.0
rem Vydavatel: Microsoft Windows Publisher (Certifikovano)
rem ========================================================
echo Overuji integritu systemu...
echo Vsechny bezpecnostni balicky jsou aktualni.
exit /b 0`;


// Simulovaná data procesního stromu pro Process Explorer
interface ProcessItem {
  pid: number;
  name: string;
  path: string;
  signer: string;
  isSignedValid: boolean;
  parentName: string;
  parentPid: number;
  cpu: number;
  hash: string;
  cmdline: string;
  isMalicious: boolean;
  typeColor: 'service' | 'user' | 'system' | 'packed' | 'suspicious';
  colorLabel: string;
  virusTotalScore: string;
  networkRemote: string;
  explanation: string;
}

const PROCESS_TREE_DATA: ProcessItem[] = [
  {
    pid: 720,
    name: 'services.exe',
    path: 'C:\\Windows\\System32\\services.exe',
    signer: 'Microsoft Windows Publisher',
    isSignedValid: true,
    parentName: 'wininit.exe',
    parentPid: 612,
    cpu: 0.1,
    hash: '4a8b72f10d938217bb3a0194821a8f9492194918204918204918290384918291',
    cmdline: 'C:\\Windows\\System32\\services.exe',
    isMalicious: false,
    typeColor: 'service',
    colorLabel: 'Růžová: Správce systémových služeb',
    virusTotalScore: '0/75',
    networkRemote: 'Žádné aktivní síťové spojení',
    explanation: 'Legitimní správce služeb Windows (Service Control Manager) běžící pod systémovým účtem SYSTEM.'
  },
  {
    pid: 1104,
    name: 'svchost.exe',
    path: 'C:\\Windows\\System32\\svchost.exe',
    signer: 'Microsoft Windows Publisher',
    isSignedValid: true,
    parentName: 'services.exe',
    parentPid: 720,
    cpu: 0.2,
    hash: '8f19284910293849102938491029384910293849102938491029384910293849',
    cmdline: 'C:\\Windows\\System32\\svchost.exe -k DcomLaunch',
    isMalicious: false,
    typeColor: 'service',
    colorLabel: 'Růžová: Legitimní systémová služba',
    virusTotalScore: '0/75',
    networkRemote: '127.0.0.1:49153 (LISTENING)',
    explanation: 'Legitimní hostitelský proces pro služby Windows. Podpis je platný a cesta je System32.'
  },
  {
    pid: 2940,
    name: 'explorer.exe',
    path: 'C:\\Windows\\explorer.exe',
    signer: 'Microsoft Windows Publisher',
    isSignedValid: true,
    parentName: 'userinit.exe',
    parentPid: 2810,
    cpu: 0.5,
    hash: '9021849102938491029384910293849102938491029384910293849102938491',
    cmdline: 'C:\\Windows\\explorer.exe',
    isMalicious: false,
    typeColor: 'user',
    colorLabel: 'Modrá: Uživatelské prostředí plochy',
    virusTotalScore: '0/75',
    networkRemote: 'Žádné aktivní síťové spojení',
    explanation: 'Průzkumník Windows a grafické uživatelské rozhraní plochy uživatele.'
  },
  {
    pid: 3420,
    name: 'scvhost.exe',
    path: 'C:\\Users\\Student\\AppData\\Roaming\\update\\scvhost.exe',
    signer: 'Neznámý vydavatel (Nepodepsáno)',
    isSignedValid: false,
    parentName: 'explorer.exe',
    parentPid: 2940,
    cpu: 1.8,
    hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    cmdline: 'C:\\Users\\Student\\AppData\\Roaming\\update\\scvhost.exe --silent',
    isMalicious: true,
    typeColor: 'suspicious',
    colorLabel: 'Červená: Podezřelý proces (překlep v názvu)',
    virusTotalScore: '56/74',
    networkRemote: '91.240.118.12:8080 (SYN_SENT)',
    explanation: 'HROZBA: Typo-squatting název "scvhost" místo "svchost". Běží ze složky AppData, nemá digitální podpis a navazuje TCP spojení do ciziny!'
  },
  {
    pid: 4188,
    name: 'svchost.exe',
    path: 'C:\\Temp\\svchost.exe',
    signer: 'Podvržený certifikát (Neplatný)',
    isSignedValid: false,
    parentName: 'cmd.exe',
    parentPid: 3820,
    cpu: 3.2,
    hash: 'c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7',
    cmdline: 'C:\\Temp\\svchost.exe -connect 185.190.22.4:4444',
    isMalicious: true,
    typeColor: 'packed',
    colorLabel: 'Fialová: Zkomprimovaný / Balený kód (UPX)',
    virusTotalScore: '63/74',
    networkRemote: '185.190.22.4:4444 (ESTABLISHED)',
    explanation: 'HROZBA: Falešný svchost maskovaný v C:\\Temp spuštěný z cmd.exe! Je balený packerem (fialová barva) a drží otevřený reverzní shell na portu 4444.'
  },
  {
    pid: 5120,
    name: 'WINWORD.EXE',
    path: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE',
    signer: 'Microsoft Corporation',
    isSignedValid: true,
    parentName: 'explorer.exe',
    parentPid: 2940,
    cpu: 0.1,
    hash: '7721839182938192839182938192839182938192839182938192839182938192',
    cmdline: '"C:\\Program Files\\...\\WINWORD.EXE" "C:\\Users\\Student\\Downloads\\Faktura.docm"',
    isMalicious: false,
    typeColor: 'user',
    colorLabel: 'Modrá: Kancelářská aplikace',
    virusTotalScore: '0/75',
    networkRemote: 'Žádné aktivní síťové spojení',
    explanation: 'Legitimní a podepsaný Microsoft Word. Otevřel však soubor s makry (.docm), který může spustit podvržený kód.'
  },
  {
    pid: 6044,
    name: 'powershell.exe',
    path: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
    signer: 'Microsoft Windows Publisher',
    isSignedValid: true,
    parentName: 'WINWORD.EXE',
    parentPid: 5120,
    cpu: 2.1,
    hash: '2849182940192849102938491029384910293849102938491029384910293849',
    cmdline: 'powershell.exe -windowstyle hidden -enc aWV4IChOZXctT2JqZWN0IE5ldC5XZWJDbGllbnQpLi4u',
    isMalicious: true,
    typeColor: 'suspicious',
    colorLabel: 'Červená: Zneužití nástroje (Living off the Land)',
    virusTotalScore: '51/74',
    networkRemote: '104.21.48.1:443 (ESTABLISHED)',
    explanation: 'HROZBA: Zneužití legitimního systémového nástroje. Ačkoliv je PowerShell podepsán Microsoftem, jeho rodičem je Word (WINWORD.EXE), což značí škodlivé makro stahující payload!'
  }
];

export default function ProcessCertificatesChapter({ onBack }: ProcessCertificatesChapterProps) {
  const [activeTab, setActiveTab] = useState<'teorie' | 'simulator' | 'laborator' | 'kviz'>('teorie');

  // Interaktivní stav pro Process Explorer simulátor
  const [selectedProcess, setSelectedProcess] = useState<ProcessItem>(PROCESS_TREE_DATA[1]);
  const [processFilter, setProcessFilter] = useState<'all' | 'malicious' | 'services'>('all');

  // Interaktivní stav pro textový editor & Authenticode simulátor
  const [editorText, setEditorText] = useState<string>(ORIGINAL_AUTHENTICODE_TEXT);
  const [originalHash, setOriginalHash] = useState<string>('');
  const [currentHash, setCurrentHash] = useState<string>('');
  const [isComputingHash, setIsComputingHash] = useState<boolean>(false);

  // Inicializace výchozího hashe originálního souboru
  useEffect(() => {
    async function initOriginalHash() {
      const encoder = new TextEncoder();
      const data = encoder.encode(ORIGINAL_AUTHENTICODE_TEXT);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setOriginalHash(hashHex);
    }
    initOriginalHash();
  }, []);

  // Živý výpočet SHA-256 hashe při každé změně textu v editoru
  useEffect(() => {
    let cancelled = false;
    async function computeLiveHash() {
      setIsComputingHash(true);
      const encoder = new TextEncoder();
      const data = encoder.encode(editorText);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      if (!cancelled) {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setCurrentHash(hashHex);
        setIsComputingHash(false);
      }
    }
    computeLiveHash();
    return () => {
      cancelled = true;
    };
  }, [editorText]);

  // Protokol pro laboratorní práci (WorksheetLayout)
  const [studentName, setStudentName] = useLocalStorage<string>('process_lab_student_name', '');
  const [checkedTasks, setCheckedTasks] = useLocalStorage<Record<string, boolean>>('process_lab_checked_tasks', {});
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const [protocol, setProtocol] = useLocalStorage<{
    task1Pid: string;
    task1Memory: string;
    task1Cmd: string;
    task2MemCmd: string;
    task2TopProcess: string;
    task2TopMemValue: string;
    task3SvcCmd: string;
    task3SvchostPid: string;
    task3SvcNames: string;
    task4ExportCmd: string;
    task4TopRamProcess: string;
    task4SvchostCount: string;
    task4SvchostAnomaly: string;
    task5ChromeIp: string;
    task5IpOwner: string;
    task5BulkMethod: string;
    task5SuspiciousReflection: string;
    task5Process?: string;
    task5RemoteIp?: string;
    task5RemotePort?: string;
    task5IpType?: string;
    task6ExplorerSigner: string;
    task6SvchostScore: string;
    task6PinkMeaning: string;
    task6PurpleMeaning: string;
    task6BonusApp: string;
    task7Hash: string;
    task7VtScore: string;
    task8SacStatus: string;
    task8SacReason: string;
    qVirusWorm: string;
    qRunAsAdmin: string;
  }>('process_lab_protocol_answers', {
    task1Pid: '',
    task1Memory: '',
    task1Cmd: '',
    task2MemCmd: '',
    task2TopProcess: '',
    task2TopMemValue: '',
    task3SvcCmd: '',
    task3SvchostPid: '',
    task3SvcNames: '',
    task4ExportCmd: '',
    task4TopRamProcess: '',
    task4SvchostCount: '',
    task4SvchostAnomaly: '',
    task5ChromeIp: '',
    task5IpOwner: '',
    task5BulkMethod: '',
    task5SuspiciousReflection: '',
    task5Process: '',
    task5RemoteIp: '',
    task5RemotePort: '',
    task5IpType: '',
    task6ExplorerSigner: '',
    task6SvchostScore: '',
    task6PinkMeaning: '',
    task6PurpleMeaning: '',
    task6BonusApp: '',
    task7Hash: '',
    task7VtScore: '',
    task8SacStatus: '',
    task8SacReason: '',
    qVirusWorm: '',
    qRunAsAdmin: ''
  });

  // Kvíz stav
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const toggleTask = (taskId: string) => {
    setCheckedTasks({
      ...checkedTasks,
      [taskId]: !checkedTasks[taskId]
    });
  };

  const copyProtocolToClipboard = () => {
    const text = `=== LABORATORNÍ PROTOKOL: SPRÁVA PROCESŮ A DIGITÁLNÍ CERTIFIKÁTY ===
Jméno studenta: ${studentName || 'Neuvedeno'}
Datum vypracování: ${new Date().toLocaleDateString('cs-CZ')}

[Úloha 1: Stopování klíčového procesu v CLI (cmd.exe)]
- Sledovaný proces: explorer.exe
- PID: ${protocol.task1Pid || '-'}
- Využití paměti: ${protocol.task1Memory || '-'}
- Použitý příkaz: ${protocol.task1Cmd || '-'}

[Úloha 2: Výpis procesů s pamětí nad 100 MB v CLI (cmd.exe)]
- Použitý příkaz: ${protocol.task2MemCmd || '-'}
- Proces s největší RAM nad 100 MB: ${protocol.task2TopProcess || '-'}
- Zjištěná paměť: ${protocol.task2TopMemValue || '-'}

[Úloha 3: Odhalení systémových služeb pod procesy (tasklist /svc)]
- Použitý příkaz: ${protocol.task3SvcCmd || '-'}
- Vybrané PID svchost.exe: ${protocol.task3SvchostPid || '-'}
- Běžící systémové služby: ${protocol.task3SvcNames || '-'}

[Úloha 4: Forenzní export do CSV a tabulková analýza v Excelu]
- Příkaz pro export: ${protocol.task4ExportCmd || '-'}
- Proces s největší RAM: ${protocol.task4TopRamProcess || '-'}
- Počet instancí svchost.exe: ${protocol.task4SvchostCount || '-'}
- Audit anomálií procesů: ${protocol.task4SvchostAnomaly || '-'}

[Úloha 5: Odposlech a audit síťových spojení (resmon.exe)]
- Odchozí IP adresa (Chrome): ${protocol.task5ChromeIp || protocol.task5RemoteIp || '-'}
- Ověřený vlastník / organizace (IPinfo/Whois): ${protocol.task5IpOwner || '-'}
- Hromadné prověření IP adres (Excel): ${protocol.task5BulkMethod || '-'}
- Úvaha – podezřelé weby v síťové telemetrii: ${protocol.task5SuspiciousReflection || '-'}

[Úloha 6: Inspekce stromu v Sysinternals Process Explorer]
- Ověřený podpis explorer.exe: ${protocol.task6ExplorerSigner || '-'}
- VirusTotal skóre svchost.exe: ${protocol.task6SvchostScore || '-'}
- Význam růžové barvy: ${protocol.task6PinkMeaning || '-'}
- Význam fialové barvy: ${protocol.task6PurpleMeaning || '-'}
- Kontrolovaná aplikace: ${protocol.task6BonusApp || '-'}

[Úloha 7: Výpočet SHA-256 v CMD (certutil) a VirusTotal]
- Vypočtený hash notepad.exe: ${protocol.task7Hash || '-'}
- Skóre VirusTotal: ${protocol.task7VtScore || '-'}

[Úloha 8: Aktivní ochrana – Smart App Control (Windows 11)]
- Stav SAC na PC: ${protocol.task8SacStatus || '-'}
- Proč je účinnější než signatury: ${protocol.task8SacReason || '-'}

[Závěrečná reflexe]
1. Proč malware volí název svchost.exe a jak ho odhalit: ${protocol.qVirusWorm || '-'}
2. Proč spouštět diagnostické nástroje jako Správce: ${protocol.qRunAsAdmin || '-'}
`;
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handleDownloadWord = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Laboratorní protokol - Správa procesů a certifikáty</title>
      <style>
        body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.4; color: #1e293b; }
        h1 { color: #0284c7; font-size: 18pt; border-bottom: 2pt solid #0284c7; padding-bottom: 4pt; }
        h2 { color: #0369a1; font-size: 13pt; margin-top: 14pt; border-bottom: 1pt solid #cbd5e1; padding-bottom: 2pt; }
        .meta { background-color: #f0f9ff; border: 1pt solid #bae6fd; padding: 8pt; margin-bottom: 12pt; }
        .item { margin-bottom: 6pt; }
        .label { font-weight: bold; color: #334155; }
        .val { color: #0f172a; font-family: Consolas, monospace; }
        .qa { background-color: #f8fafc; border-left: 3pt solid #0284c7; padding: 6pt 10pt; margin: 8pt 0; }
      </style>
      </head>
      <body>
        <h1>Laboratorní protokol: Správa procesů a digitální certifikáty v OS</h1>
        <div class="meta">
          <strong>Student:</strong> ${studentName || 'Neuvedeno'}<br/>
          <strong>Předmět:</strong> Operační systémy 2 (2. Ročník SŠ)<br/>
          <strong>Datum:</strong> ${new Date().toLocaleDateString('cs-CZ')}
        </div>

        <h2>Úloha 1: Stopování klíčového procesu v CLI (cmd.exe)</h2>
        <div class="item"><span class="label">Sledovaný proces:</span> explorer.exe</div>
        <div class="item"><span class="label">Zjištěné PID:</span> <span class="val">${protocol.task1Pid || '-'}</span></div>
        <div class="item"><span class="label">Využití paměti:</span> <span class="val">${protocol.task1Memory || '-'}</span></div>
        <div class="item"><span class="label">Příkaz v CMD:</span> <span class="val">${protocol.task1Cmd || '-'}</span></div>

        <h2>Úloha 2: Výpis procesů s pamětí nad 100 MB (cmd.exe)</h2>
        <div class="item"><span class="label">Příkaz pro filtrování paměti:</span> <span class="val">${protocol.task2MemCmd || '-'}</span></div>
        <div class="item"><span class="label">Proces s největší RAM nad 100 MB:</span> <span class="val">${protocol.task2TopProcess || '-'}</span></div>
        <div class="item"><span class="label">Využití paměti tohoto procesu:</span> <span class="val">${protocol.task2TopMemValue || '-'}</span></div>

        <h2>Úloha 3: Odhalení systémových služeb pod procesy (tasklist /svc)</h2>
        <div class="item"><span class="label">Příkaz pro zjištění služeb:</span> <span class="val">${protocol.task3SvcCmd || '-'}</span></div>
        <div class="item"><span class="label">Prověřované PID svchost.exe:</span> <span class="val">${protocol.task3SvchostPid || '-'}</span></div>
        <div class="item"><span class="label">Služby běžící pod tímto PID:</span> <span class="val">${protocol.task3SvcNames || '-'}</span></div>

        <h2>Úloha 4: Forenzní export do CSV a tabulková analýza v Excelu</h2>
        <div class="item"><span class="label">Příkaz pro export:</span> <span class="val">${protocol.task4ExportCmd || '-'}</span></div>
        <div class="item"><span class="label">Proces s největší RAM v tabulce:</span> <span class="val">${protocol.task4TopRamProcess || '-'}</span></div>
        <div class="item"><span class="label">Počet instancí svchost.exe:</span> <span class="val">${protocol.task4SvchostCount || '-'}</span></div>
        <div class="item"><span class="label">Audit anomálií procesů:</span> <span class="val">${protocol.task4SvchostAnomaly || '-'}</span></div>

        <h2>Úloha 5: Odposlech a audit síťových spojení (resmon.exe)</h2>
        <div class="item"><span class="label">Odchozí IP adresa (Chrome):</span> <span class="val">${protocol.task5ChromeIp || protocol.task5RemoteIp || '-'}</span></div>
        <div class="item"><span class="label">Ověřený vlastník / organizace:</span> <span class="val">${protocol.task5IpOwner || '-'}</span></div>
        <div class="item"><span class="label">Hromadné ověření IP v tabulce:</span> <span class="val">${protocol.task5BulkMethod || '-'}</span></div>
        <div class="item"><span class="label">Úvaha – podezřelé weby v telemetrii:</span> <span class="val">${protocol.task5SuspiciousReflection || '-'}</span></div>

        <h2>Úloha 6: Inspekce stromu v Sysinternals Process Explorer</h2>
        <div class="item"><span class="label">Ověřený podpis explorer.exe:</span> <span class="val">${protocol.task6ExplorerSigner || '-'}</span></div>
        <div class="item"><span class="label">VirusTotal skóre svchost.exe:</span> <span class="val">${protocol.task6SvchostScore || '-'}</span></div>
        <div class="item"><span class="label">Význam růžové barvy:</span> <span class="val">${protocol.task6PinkMeaning || '-'}</span></div>
        <div class="item"><span class="label">Význam fialové barvy:</span> <span class="val">${protocol.task6PurpleMeaning || '-'}</span></div>
        <div class="item"><span class="label">Zkontrolovaná aplikace:</span> <span class="val">${protocol.task6BonusApp || '-'}</span></div>

        <h2>Úloha 7: Výpočet SHA-256 v CMD (certutil) a VirusTotal</h2>
        <div class="item"><span class="label">SHA-256 hash notepad.exe:</span> <span class="val">${protocol.task7Hash || '-'}</span></div>
        <div class="item"><span class="label">Reputace na VirusTotal.com:</span> <span class="val">${protocol.task7VtScore || '-'}</span></div>

        <h2>Úloha 8: Aktivní ochrana – Smart App Control (Windows 11)</h2>
        <div class="item"><span class="label">Stav funkce na PC:</span> <span class="val">${protocol.task8SacStatus || '-'}</span></div>
        <div class="item"><span class="label">Zdůvodnění účinnosti:</span> <span class="val">${protocol.task8SacReason || '-'}</span></div>

        <h2>Závěrečná reflexe</h2>
        <div class="qa">
          <strong>1. Proč malware volí název svchost.exe a jak ho odhalit:</strong><br/>
          ${protocol.qVirusWorm || 'Neuvedeno'}
        </div>
        <div class="qa">
          <strong>2. Proč je nutné spouštět diagnostické nástroje jako Správce:</strong><br/>
          ${protocol.qRunAsAdmin || 'Neuvedeno'}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Protokol_SpravaProcesu_${studentName.replace(/\s+/g, '_') || 'student'}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'teorie', label: 'Teorie & Schémata', icon: Layers },
    { id: 'simulator', label: 'Interaktivní simulátory', icon: Activity },
    { id: 'laborator', label: 'Praktická laboratoř (Protokol)', icon: FileText },
    { id: 'kviz', label: 'Ověřovací kvíz', icon: HelpCircle }
  ];

  const filteredProcesses = PROCESS_TREE_DATA.filter(p => {
    if (processFilter === 'malicious') return p.isMalicious;
    if (processFilter === 'services') return p.typeColor === 'service';
    return true;
  });

  return (
    <FsChapterShell
      chapterNumber={2}
      totalChapters={2}
      title="Správa procesů & Certifikáty:"
      highlight="Forenzní analýza v OS"
      subtitle="Navázání na procesy z 1. ročníku: proč pouhý název procesu nestačí, jak fungují digitální podpisy Authenticode a jak vyšetřovat systém."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as any)}
      onBack={onBack}
      accentColor="border-blue-500"
    >
      {/* =========================================================================
          ZÁLOŽKA 1: VÝKLADOVÁ TEORIE S ROZBALOVÁTKY PRO SŠ
          ========================================================================= */}
      {activeTab === 'teorie' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          
          {/* Úvodní navázání na 1. ročník */}
          <div className="p-6 bg-blue-50/80 rounded-3xl border-2 border-blue-200/80 space-y-3">
            <div className="flex items-center gap-2.5 text-blue-900 font-black text-sm uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Navázání na 1. ročník (Co už známe z OSS 1):
            </div>
            <p className="text-sm text-blue-950 leading-relaxed">
              V 1. ročníku jsme zjistili, že <strong>program na disku</strong> je pouhý pasivní soubor bajtů. 
              Teprve když ho operační systém zavede do <strong>paměti RAM</strong> a přidělí mu číselný identifikátor <strong>PID</strong>, 
              vznikne živý <strong>proces</strong>, jehož instrukce vykonává procesor přes čítač PC.
            </p>
          </div>

          {/* =========================================================================
              KLÍČOVÝ BOD 1: CO DĚLÁ OPERAČNÍ SYSTÉM PŘI SPUŠTĚNÍ SOUBORU .EXE?
              ========================================================================= */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-50/90 via-blue-50/60 to-white rounded-[2.5rem] border-2 border-indigo-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-sm">
                <Zap className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  Co dělá operační systém při spuštění souboru .exe?
                </h3>
                <p className="text-xs text-indigo-700 font-semibold">
                  Jaké analýzy a prověrky Windows provede předtím, než pustí cizí kód do procesoru
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Když uživatel dvakrát klikne na program nebo ho spustí z terminálu, Windows ho <strong>nepustí okamžitě do procesoru</strong>! 
              V moderním operačním systému proběhne během zlomku sekundy bezpečnostní řetězec prověrek:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-2xs space-y-2">
                <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center text-xs">
                  1
                </div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Fingerprint className="w-4 h-4 text-blue-600" /> Integrita & Podpis
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Systém spočítá hash souboru a zkontroluje digitální podpis (Authenticode). Zjistí: <em>Kdo je vydavatel a nezměnil někdo po cestě ani jediný bajt?</em>
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-2xs space-y-2">
                <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-xs">
                  2
                </div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <ShieldAlert className="w-4 h-4 text-indigo-600" /> Cloudová reputace
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Ochrana SmartScreen a Smart App Control kontaktuje cloud Microsoftu: <em>Známe tento program? Běží na milionech PC, nebo byl vytvořen před minutou?</em>
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-2xs space-y-2">
                <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 font-black flex items-center justify-center text-xs">
                  3
                </div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Shield className="w-4 h-4 text-purple-600" /> Antivirová kontrola
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Windows Defender v reálném čase proskenuje kód a hlavičky PE (Portable Executable) na přítomnost známých signatur malwaru a škodlivých skriptů.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-2xs space-y-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-xs">
                  4
                </div>
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Lock className="w-4 h-4 text-emerald-600" /> Přidělení práv (UAC)
                </div>
                <p className="text-slate-600 leading-relaxed">
                  OS přiřadí procesu bezpečnostní token. Bude mít běžná práva uživatele, nebo žádá správcovský zásah a vyvolá UAC potvrzovací okno?
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-100/70 rounded-2xl border border-indigo-200 text-xs text-indigo-950 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0" />
              <span><strong>Výsledek:</strong> Teprve když soubor projde těmito filtry, zavaděč OS (Loader) alokuje virtuální paměť v RAM, přidělí mu číselné <strong>PID</strong> a CPU začne vykonávat instrukce.</span>
            </div>
          </div>

          {/* =========================================================================
              KLÍČOVÝ BOD 2: JAK UDĚLAT RYCHLOU ANALÝZU SYSTÉMU NA SPUŠTĚNÉ PROCESY?
              ========================================================================= */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 font-black text-base flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  Jak udělat rychlou analýzu systému na spuštěné procesy?
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Forenzní rychlokontrola běžícího počítače: na jaké 4 indicie se správce okamžitě zaměří
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Máte podezření, že je počítač infikován nebo se chová divně? Když otevřete seznam procesů, nehledejte naslepo. 
              Sledujte tyto <strong>4 klíčové znaky nebezpečí</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <FileText className="w-4 h-4 text-blue-600" /> 1. Překlep ve jménu
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Útočníci spoléhají na lidskou nepozornost (tzv. typosquatting): napodobují systémové názvy, např. <code className="font-mono bg-slate-200/80 px-1 rounded">scvhost.exe</code>, <code className="font-mono bg-slate-200/80 px-1 rounded">svch0st.exe</code> (s nulou) nebo <code className="font-mono bg-slate-200/80 px-1 rounded">explorerr.exe</code>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Layers className="w-4 h-4 text-indigo-600" /> 2. Kde program bydlí
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Pravé systémové procesy Windows sídlí výhradně v <code className="font-mono bg-slate-200/80 px-1 rounded">C:\Windows\System32</code>. Pokud proces běží ze složky <em>Stažené soubory</em> nebo <em>C:\Temp</em>, je to vetřelec!
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Cpu className="w-4 h-4 text-purple-600" /> 3. Extrémní RAM a CPU
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Těžební malware (miner) nebo ransomware vytíží procesor na 100 % nebo alokuje stovky megabajtů RAM. Příkaz <code className="font-mono bg-slate-200/80 px-1 rounded">tasklist /fi "MEMUSAGE gt 100000"</code> je ihned odhalí.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 4. Chybějící podpis
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Běžící proces bez platného digitálního podpisu od Microsoftu či známého výrobce (Verified Signer) je v moderním systému vždy vysoce podezřelý.
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================================
              BLOK 1: SEZNAM PROCESŮ V SYSTÉMU A PROČ JE JMÉNO PROCESU TAK DŮLEŽITÉ
              ========================================================================= */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-black text-base flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  Seznam procesů v systému: Proč je jméno procesu tak důležité a zrádné?
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  V systému běží stovky procesů najednou – jak se v nich vyznat a proč pouhé jméno nestačí
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              V každém okamžiku běží v operačním systému Windows 200 až 300 procesů najednou. 
              Všechny jsou zapsány v jednom globálním <strong>seznamu procesů</strong>. 
              Každý řádek obsahuje <strong>Jméno programu</strong> (Image Name), unikátní <strong>PID</strong> a <strong>Využití paměti</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Legitimní systémový proces (Příklad)
                </div>
                <div className="font-mono text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                  <div><strong>Název:</strong> svchost.exe</div>
                  <div><strong>Cesta na disku:</strong> C:\Windows\System32\svchost.exe</div>
                  <div><strong>Digitální podpis:</strong> Microsoft Windows Publisher (Platný)</div>
                  <div><strong>Běžící služba:</strong> Dnscache (překlad doménových jmen)</div>
                </div>
                <p className="text-xs text-emerald-900 font-medium">
                  Poctivý systémový proces: Správný název, sídlo v System32, platná pečeť a reálná služba.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" /> Maskovaný virus (Příklad podvrhu)
                </div>
                <div className="font-mono text-xs text-slate-700 bg-white p-3 rounded-xl border border-rose-200 space-y-1">
                  <div><strong>Název:</strong> svchost.exe <span className="text-rose-600 font-bold">(vypadá stejně!)</span></div>
                  <div><strong>Cesta na disku:</strong> C:\Users\Student\AppData\svchost.exe</div>
                  <div><strong>Digitální podpis:</strong> Žádný (Nepodepsáno)</div>
                  <div><strong>Běžící služba:</strong> N/A (žádná služba)</div>
                </div>
                <p className="text-xs text-rose-900 font-medium">
                  Hrozba: Jméno je identické, ale sídlí v uživatelském profilu, chybí podpis a neveze žádnou službu!
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5 leading-relaxed">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                💡 Zlaté pravidlo správce: Jméno procesu je jen textový štítek!
              </div>
              <p>
                Kdyby útočník pojmenoval svůj program <code>trojan.exe</code>, každý správce ho hned ukončí. 
                Proto ho útočník pojmenuje <code>svchost.exe</code>, aby splynul s davem dalších 70 stejných procesů. 
                Proto se nikdy nespokojíme jen se jménem, ale vždy prověřujeme <strong>kde na disku soubor leží</strong>, <strong>jaké služby veze</strong> a <strong>zda má platný digitální podpis</strong>.
              </p>
            </div>
          </div>

          {/* BLOK 2: DIGITÁLNÍ PODPISY (AUTHENTICODE) A CERTIFIKÁTY */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-black text-base flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  Digitální podpisy (Authenticode): Otisk prstu a úřední pečeť
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Jak Windows pozná, že program skutečně vyrobil Microsoft a cestou ho nikdo neupravil?
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Představte si <strong>dopis s královskou voskovou pečetí ověřený státním notářem</strong>. 
              Dokud je pečeť neporušená, víte, že dopis napsal král a po cestě z něj nikdo nevytrhl ani písmeno. 
              V počítačovém světě se tato pečeť jmenuje <strong>Digitální podpis (Microsoft Authenticode)</strong>.
            </p>

            {/* 3 kroky bez kryptografických rovnic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  <Fingerprint className="w-4 h-4" />
                </div>
                <h4 className="font-black text-sm text-blue-950">1. Otisk prstu (Hash)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Každý soubor má jedinečný 64znakový kód (SHA-256). Když v programu změníte jedinou tečku, otisk se totálně změní (lavinový efekt).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h4 className="font-black text-sm text-indigo-950">2. Úřední pečeť (Podpis)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Autor (např. Microsoft nebo Google) vezme tento otisk a připevní k souboru svou nerozbitnou digitální pečeť.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-black text-sm text-emerald-950">3. Notář (Certifikát)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Nezávislá autorita (notář) v přiloženém certifikátu potvrdí: <em>„Ano, zaručuji, že tato pečeť skutečně patří Microsoftu.“</em>
                </p>
              </div>
            </div>

            {/* Co se stane při nákaze virem */}
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-2 leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Co se stane, když do podepsaného programu vleze virus?
              </div>
              <p>
                Virus přidá do programu svůj škodlivý kód ➔ tím se <strong>změní otisk souboru</strong> ➔ původní pečeť k novému otisku nepasuje a rozbije se ➔ 
                Windows okamžitě zobrazí varování <strong>„Neznámý vydavatel / Integrita souboru byla porušena“</strong> a chytrá ochrana Smart App Control spuštění zablokuje!
              </p>
            </div>
          </div>

          {/* BLOK 3: DIAGNOSTICKÉ NÁSTROJE VE WINDOWS */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 font-black text-base flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  Forenzní arzenál správce: Nástroje pro odhalení anomálií
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Přehled nástrojů, které použijeme v dnešní praktické laboratoři
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-blue-600" /> tasklist v CMD
                </div>
                <p className="text-slate-600">
                  Základní terminálový příkaz pro okamžitý výpis procesů, PID a paměti. Lze filtrovat (<code className="font-mono">/FI</code>) nebo exportovat do CSV (<code className="font-mono">/FO CSV</code>).
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Network className="w-4 h-4 text-emerald-600" /> resmon.exe
                </div>
                <p className="text-slate-600">
                  Sledování prostředků: Odhalí, jaký proces posílá data po síti, na jaké cizí IP adresy a na které porty (detekce spywaru a C2 serverů).
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-indigo-600" /> Process Explorer
                </div>
                <p className="text-slate-600">
                  Pokročilý nástroj od Microsoft Sysinternals: Zobrazuje strom procesů, ověřuje podpisy Authenticode a integruje reputaci z VirusTotal.com.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" /> Smart App Control
                </div>
                <p className="text-slate-600">
                  Aktivní cloudový filtr ve Windows 11: Zabrání spuštění nepodepsaných nebo neznámých programů ještě dříve, než se dostanou do RAM.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          ZÁLOŽKA 2: INTERAKTIVNÍ SIMULÁTORY (PROCESS EXPLORER & AUTHENTICODE INSPECTOR)
          ========================================================================= */}
      {activeTab === 'simulator' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          
          {/* SIMULÁTOR A: INTERAKTIVNÍ PROCESS EXPLORER */}
          <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-indigo-600" />
                  Simulátor: Sysinternals Process Explorer
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Klikněte na proces a analyzujte jeho rodiče, digitální podpis, VirusTotal skóre a síťové spojení.
                </p>
              </div>

              {/* Filtry */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setProcessFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    processFilter === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Všechny ({PROCESS_TREE_DATA.length})
                </button>
                <button
                  type="button"
                  onClick={() => setProcessFilter('malicious')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    processFilter === 'malicious' ? 'bg-rose-600 text-white shadow-xs' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  Jen hrozby
                </button>
                <button
                  type="button"
                  onClick={() => setProcessFilter('services')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    processFilter === 'services' ? 'bg-purple-600 text-white shadow-xs' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  }`}
                >
                  Systémové služby
                </button>
              </div>
            </div>

            {/* Tabulka procesů + detail v gridu */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Seznam procesů (7 sloupců) */}
              <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-3 border border-slate-800 text-xs font-mono overflow-x-auto">
                <div className="grid grid-cols-12 gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider pb-2 border-b border-slate-800 px-2">
                  <div className="col-span-5">Proces (Název)</div>
                  <div className="col-span-2 text-right">PID</div>
                  <div className="col-span-2 text-right">CPU %</div>
                  <div className="col-span-3 text-right">VirusTotal</div>
                </div>

                <div className="space-y-1 mt-1">
                  {filteredProcesses.map((proc) => {
                    const isSelected = selectedProcess.pid === proc.pid;
                    let rowBg = 'hover:bg-slate-800/80 text-slate-200';
                    if (proc.typeColor === 'service') rowBg = 'text-pink-300 hover:bg-pink-950/30';
                    if (proc.typeColor === 'packed') rowBg = 'text-purple-300 hover:bg-purple-950/30';
                    if (proc.isMalicious) rowBg = 'text-rose-400 hover:bg-rose-950/40';

                    return (
                      <div
                        key={proc.pid}
                        onClick={() => setSelectedProcess(proc)}
                        className={`grid grid-cols-12 gap-2 px-2 py-2 rounded-xl cursor-pointer transition-all items-center ${
                          isSelected ? 'bg-indigo-600/40 border border-indigo-400/80 shadow-xs' : rowBg
                        }`}
                      >
                        <div className="col-span-5 flex items-center gap-1.5 truncate font-bold">
                          {proc.parentPid === 720 || proc.parentPid === 5120 ? (
                            <span className="text-slate-500 text-[10px]">└──</span>
                          ) : null}
                          <span className="truncate">{proc.name}</span>
                        </div>
                        <div className="col-span-2 text-right text-slate-400">{proc.pid}</div>
                        <div className="col-span-2 text-right text-slate-400">{proc.cpu}%</div>
                        <div className="col-span-3 text-right">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            proc.virusTotalScore === '0/75' 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}>
                            {proc.virusTotalScore}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Karta detailu vybraného procesu (5 sloupců) */}
              <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 text-xs">
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <h4 className="font-mono font-black text-base text-slate-900">{selectedProcess.name}</h4>
                    <span className="text-[11px] text-slate-500 font-mono">PID: {selectedProcess.pid}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    selectedProcess.isMalicious ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {selectedProcess.isMalicious ? 'Škodlivá aktivita' : 'Legitimní proces'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Cesta k souboru (Path):</span>
                    <span className="font-mono text-slate-800 break-all bg-white p-1.5 rounded border border-slate-200 block text-[11px]">
                      {selectedProcess.path}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Digitální podpis (Signer):</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {selectedProcess.isSignedValid ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span className={`font-bold ${selectedProcess.isSignedValid ? 'text-emerald-800' : 'text-rose-700'}`}>
                        {selectedProcess.signer}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Rodičovský proces:</span>
                      <span className="font-mono font-bold text-slate-700">{selectedProcess.parentName} ({selectedProcess.parentPid})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">VirusTotal detekce:</span>
                      <span className="font-mono font-bold text-slate-700">{selectedProcess.virusTotalScore}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Síťová aktivita:</span>
                    <span className="font-mono text-slate-800 text-[11px] block">{selectedProcess.networkRemote}</span>
                  </div>

                  <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200/80 text-blue-950 text-[11px] leading-relaxed">
                    <strong>Forenzní zjištění:</strong> {selectedProcess.explanation}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SIMULÁTOR B: TEXTOVÝ EDITOR & ŽIVÝ SHA-256 HASH (AUTHENTICODE DETEKTOR) */}
          {(() => {
            const isSignatureValid = originalHash !== '' && currentHash === originalHash;
            const textLineCount = editorText.split('\n').length;
            const textCharCount = editorText.length;
            const textByteSize = new TextEncoder().encode(editorText).length;

            return (
              <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-800">
                        Laboratoř: Co se stane, když útočník modifikuje podepsaný soubor?
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Zkoušejte psát přímo do textového editoru. Vpravo se v reálném čase počítá nový SHA-256 hash a systém okamžitě ověřuje platnost digitální pečeti.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (!editorText.includes('del /f /q')) {
                          setEditorText(prev => prev.replace('exit /b 0', 'del /f /q C:\\Windows\\data.txt\nexit /b 0'));
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-rose-200 shadow-xs"
                      title="Vloží škodlivý příkaz před ukončení programu"
                    >
                      ☣️ Injektovat virus
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorText(ORIGINAL_AUTHENTICODE_TEXT)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      Obnovit originál
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* LEVÝ SLOUPEC: OKNO TEXTOVÉHO EDITORU (POZNÁMKOVÝ BLOK) */}
                  <div className="lg:col-span-7 bg-slate-900 rounded-2xl border-2 border-slate-800 shadow-xl overflow-hidden flex flex-col">
                    
                    {/* Lišta okna (Titlebar) */}
                    <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between select-none">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="font-mono text-xs font-bold text-slate-200 truncate">
                          aktualizace_systemu.bat – Poznámkový blok
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                          isSignatureValid 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/80' 
                            : 'bg-rose-950 text-rose-300 border border-rose-700/80 animate-pulse'
                        }`}>
                          {isSignatureValid ? 'Podepsáno' : 'Pečeť rozbita!'}
                        </span>
                      </div>
                      
                      {/* Tlačítka okna */}
                      <div className="flex items-center gap-2 shrink-0 pl-2">
                        <button type="button" aria-label="Minimalizovat" className="w-3 h-3 rounded-full bg-slate-600 hover:bg-slate-500 transition-colors" />
                        <button type="button" aria-label="Maximalizovat" className="w-3 h-3 rounded-full bg-slate-600 hover:bg-slate-500 transition-colors" />
                        <button type="button" aria-label="Zavřít" className="w-3 h-3 rounded-full bg-rose-600/80 hover:bg-rose-500 transition-colors" />
                      </div>
                    </div>

                    {/* Nabídka editoru (Menu bar) */}
                    <div className="bg-slate-800/60 px-4 py-1 border-b border-slate-800 text-[11px] text-slate-400 flex items-center gap-4 select-none">
                      <span className="hover:text-slate-200 cursor-default">Soubor</span>
                      <span className="hover:text-slate-200 cursor-default">Úpravy</span>
                      <span className="hover:text-slate-200 cursor-default">Formát</span>
                      <span className="hover:text-slate-200 cursor-default">Zobrazit</span>
                      <span className="hover:text-slate-200 cursor-default">Nápověda</span>
                    </div>

                    {/* Vlastní editovatelná plocha */}
                    <div className="relative">
                      <textarea
                        value={editorText}
                        onChange={(e) => setEditorText(e.target.value)}
                        placeholder="Sem můžete psát libovolný text nebo kód programu..."
                        spellCheck={false}
                        className="w-full h-64 p-4 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-indigo-600/50 block"
                      />
                    </div>

                    {/* Stavový řádek okna */}
                    <div className="bg-slate-900 px-4 py-1.5 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-between select-none">
                      <div className="flex items-center gap-3">
                        <span>Řádků: {textLineCount}</span>
                        <span>Znaků: {textCharCount}</span>
                        <span>Velikost: {textByteSize} B</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <span>UTF-8</span>
                        <span>Windows (CRLF)</span>
                      </div>
                    </div>

                  </div>

                  {/* PRAVÝ SLOUPEC: ŽIVÝ HASH & KONTROLA AUTHENTICODE PEČETI */}
                  <div className="lg:col-span-5 space-y-4">
                    
                    {/* 1. Živý SHA-256 hash */}
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                          <Fingerprint className="w-4 h-4 text-cyan-400" />
                          Aktuální živý hash (SHA-256):
                        </span>
                      </div>

                      <div className={`p-3 rounded-xl border font-mono text-xs break-all leading-relaxed transition-all ${
                        isSignatureValid 
                          ? 'bg-emerald-950/60 border-emerald-700/80 text-emerald-400' 
                          : 'bg-rose-950/70 border-rose-600 text-rose-300 font-bold shadow-xs'
                      }`}>
                        {currentHash || '0000000000000000000000000000000000000000000000000000000000000000'}
                      </div>
                      
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>Délka: 64 znaků (256 bitů)</span>
                        <span className={isSignatureValid ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          {isSignatureValid ? '✓ Shoduje se s pečetí' : '✕ Hash byl pozměněn!'}
                        </span>
                      </div>
                    </div>

                    {/* 2. Původní otisk v pečeti certifikátu */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
                          <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                          Originální otisk v digitální pečeti Microsoftu:
                        </span>
                      </div>

                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 font-mono text-[11px] text-slate-600 break-all select-all">
                        {originalHash || 'Načítám originální otisk...'}
                      </div>
                      
                      <p className="text-[10px] text-slate-500 leading-tight">
                        Tento otisk autor uzamkl v certifikátu při vydání. Útočník ho nemůže přepsat bez privátního klíče Microsoftu.
                      </p>
                    </div>

                    {/* 3. Vyhodnocení integrity v systému Windows */}
                    {isSignatureValid ? (
                      <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-2">
                        <div className="flex items-center gap-2 font-black text-sm text-emerald-900">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          DIGITÁLNÍ PEČEŤ JE 100% NEPORUŠENÁ
                        </div>
                        <p className="text-xs text-emerald-800 leading-relaxed">
                          Živý hash přesně odpovídá otisku v certifikátu. Systém Windows garantuje, že program skutečně vytvořil vydavatel a nikdo ho nepozměnil.
                        </p>
                        <div className="pt-1 flex items-center gap-2 text-[11px] font-bold text-emerald-900">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          Smart App Control: Spuštění povoleno bez varování
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-2.5">
                        <div className="flex items-center gap-2 font-black text-sm text-rose-900">
                          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 animate-bounce" />
                          DIGITÁLNÍ PEČEŤ BYLA ROZBITA!
                        </div>
                        <p className="text-xs text-rose-800 leading-relaxed">
                          Změna jediného znaku vyvolala lavinový efekt. Živý hash se neshoduje s pečetí v certifikátu.
                        </p>
                        
                        {/* Simulované varování Windows SmartScreen */}
                        <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs shadow-xs space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-rose-900 text-[11px]">
                            <Shield className="w-3.5 h-3.5 text-rose-600" />
                            Reakce Windows (Smart App Control & SmartScreen):
                          </div>
                          <div className="text-[11px] text-slate-700 bg-rose-50/50 p-2 rounded border border-rose-100 font-medium">
                            ⚠️ <strong>„Systém Windows ochránil váš počítač:</strong> Spuštění aplikace bylo zablokováno. Integrita souboru byla porušena nebo je vydavatel neznámý.“
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 4. Didaktické shrnutí (Aha-moment pro studenta) */}
                    <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200/80 text-xs text-blue-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-blue-900 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        Proč útočník nemůže pečeť zfalšovat?
                      </div>
                      <p className="text-[11px] text-blue-900/90 leading-relaxed">
                        I kdyby útočník nový hash spočítal, nemůže k němu vyrobit platný digitální podpis Microsoftu. K tomu je potřeba tajný <strong>privátní klíč</strong>, který zná pouze autor software.
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            );
          })()}


        </div>
      )}

      {/* =========================================================================
          ZÁLOŽKA 3: PRAKTICKÁ LABORATOŘ (PROTOKOL VE WORKSHEET LAYOUT)
          ========================================================================= */}
      {activeTab === 'laborator' && (
        <WorksheetLayout
          title="Laboratorní protokol: Správa procesů a digitální certifikáty v OS"
          studentName={studentName}
          onStudentNameChange={setStudentName}
          onDownload={handleDownloadWord}
        >
          <div className="space-y-8">

            {/* Úvodní kontext praktické práce */}
            <div className="p-5 bg-blue-50/70 rounded-3xl border border-blue-200 text-xs text-blue-950 space-y-2 leading-relaxed">
              <div className="font-bold text-sm text-blue-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-600" /> Forenzní vyšetřování ve Windows 11 Pro / VirtualBoxu
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-blue-200/70 text-blue-900">
                  Splněno úloh: {Object.values(checkedTasks).filter(Boolean).length} / 8
                </span>
              </div>
              <p>
                Každá úloha představuje <strong>reálný bezpečnostní incident nebo vyšetřovací postup</strong>, který správci a bezpečnostní analytici provádějí při podezření na infekci. 
                Všechny úlohy řešte v <strong>Příkazovém řádku (cmd.exe)</strong>, vestavěných systémových diagnostických nástrojích nebo v Excelu. 
                Odpovědi vyplňujte přímo do formulářových polí u konkrétní úlohy. Po dokončení si dole stáhněte vyplněný protokol ve Wordu (.doc).
              </p>
            </div>

            {/* =========================================================================
                ÚLOHA 1: STOPOVÁNÍ KLÍČOVÉHO PROCESU V CLI (cmd.exe)
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task1'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task1'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 1: Stopování klíčového procesu v CLI (cmd.exe)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Opakování příkazu tasklist a rychlé filtrování specifických procesů v terminálu
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task1')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task1'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task1'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Představte si situaci: Uživatel hlásí zamrznutí počítače a Správce úloh (Task Manager) nelze otevřít, protože ho malware zablokoval nebo systém nereaguje na klávesové zkratky. 
                  Správce se musí připojit přes vzdálenou textovou konzoli nebo spustit <strong>Příkazový řádek (cmd.exe)</strong> a bleskově zjistit stav klíčových součástí Windows – v tomto případě procesu <strong>explorer.exe</strong>, který řídí plochu, hlavní panel a okna.
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Stiskněte klávesovou zkratku <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded font-mono">Win + R</kbd>, napište <code>cmd</code> a stiskněte Enter.</li>
                  <li>Využijte známý příkaz <code>tasklist</code> k nalezení běžícího procesu <strong>explorer.exe</strong>.</li>
                  <li>Pokud je seznam příliš dlouhý, prozkoumejte možnosti filtrování výstupu přímo podle názvu obrazu bez nutnosti ručního procházení stovek řádků.</li>
                  <li>Opište zjištěné PID, využití paměti a použitý příkaz do formuláře níže.</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Jak najít přepínače příkazu tasklist v CMD?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>V Příkazovém řádku zadejte <code>tasklist /?</code>. V nápovědě vyhledejte parametr pro filtrování (<code>/FI</code>).</p>
                  <p>Všimněte si, jak se zadává podmínka pro název procesu (ImageName eq ...) – porovnání probíhá s uvozovkami.</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 1 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištěné údaje o procesu explorer.exe:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Identifikátor PID:</label>
                    <input
                      type="text"
                      value={protocol.task1Pid}
                      onChange={(e) => setProtocol({ ...protocol, task1Pid: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Využití paměti (K):</label>
                    <input
                      type="text"
                      value={protocol.task1Memory}
                      onChange={(e) => setProtocol({ ...protocol, task1Memory: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Přesný příkaz v CMD:</label>
                    <input
                      type="text"
                      value={protocol.task1Cmd}
                      onChange={(e) => setProtocol({ ...protocol, task1Cmd: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 2: VÝPIS PROCESŮ S PAMĚTÍ NAD 100 MB V CLI (cmd.exe)
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task2'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task2'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 2: Výpis procesů spotřebovávajících více než 100 MB RAM (cmd.exe)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Filtrování procesů podle alokované operační paměti a odhalení podezřelých konzumentů RAM
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task2')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task2'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task2'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Když je počítač napaden těžebním malwarem (cryptominerem), ransomwarem připravujícím šifrovací klíče nebo programem s paměťovým únikem (memory leak), 
                  tento proces začne spotřebovávat obrovské množství operační paměti RAM. Běžný seznam stovek procesů je nepřehledný, ale správce dokáže pomocí filtru 
                  <code>tasklist /fi</code> okamžitě vypsat pouze ty procesy, které překračují stanovenou hranici (např. 100 MB).
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>V Příkazovém řádku (cmd.exe) využijte příkaz <code>tasklist</code> s filtrem na využití paměti (<code>MEMUSAGE</code>).</li>
                  <li>Nastavte podmínku na hodnotu větší než 100 MB (pozor: systém očekává hodnotu v kilobajtech, tedy <strong>100 000 KB</strong>).</li>
                  <li>Zkontrolujte vypsané procesy a najděte ten, který ve vašem systému alokuje nejvíce paměti.</li>
                  <li>Vyplňte použitý příkaz a zjištěné hodnoty do formuláře níže.</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Jak zapsat podmínku pro paměť větší než 100 MB?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>Operátor <strong>větší než</strong> se v příkazu tasklist zapisuje zkratkou <code>gt</code> (greater than).</p>
                  <p>Příkaz zadejte takto: <code>tasklist /fi "MEMUSAGE gt 100000"</code></p>
                  <p>Pokud chcete obráceně vypsat menší procesy, použije se <code>lt</code> (less than) nebo pro přesnou shodu <code>eq</code>.</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 2 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištěná data o procesech nad 100 MB RAM:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Použitý příkaz v CMD:</label>
                    <input
                      type="text"
                      value={protocol.task2MemCmd}
                      onChange={(e) => setProtocol({ ...protocol, task2MemCmd: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Největší proces nad 100 MB:</label>
                    <input
                      type="text"
                      value={protocol.task2TopProcess}
                      onChange={(e) => setProtocol({ ...protocol, task2TopProcess: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Využití paměti tohoto procesu:</label>
                    <input
                      type="text"
                      value={protocol.task2TopMemValue}
                      onChange={(e) => setProtocol({ ...protocol, task2TopMemValue: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 3: ODHALENÍ SYSTÉMOVÝCH SLUŽEB POD PROCESY (tasklist /svc)
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task3'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task3'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 3: Odhalení skrytých systémových služeb pod procesy (tasklist /svc)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Mapování konkrétních služeb Windows na PID procesů svchost.exe přímo v příkazovém řádku
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task3')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task3'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task3'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-2 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Přirovnání: Autobus a cestující):
                </div>
                <p>
                  Představte si <strong>svchost.exe</strong> jako <strong>autobus</strong>. Sám o sobě nic nedělá – je to jen schránka, která veze skutečné pracovníky: systémové služby Windows (např. Windows Update, správce sítě, zvuk).
                </p>
                <p>
                  Když v CMD napíšete obyčejný <code>tasklist</code>, vidíte jen desítky stejných bílých autobusů se zatmavenými skly. Nevíte, co kdo veze, a útočníci se za název <code>svchost.exe</code> rádi maskují. 
                  Přepínač <code>/svc</code> funguje jako <strong>policejní rentgen</strong>: nahlédne dovnitř autobusu a ke každému číslu PID vypíše přesný seznam běžících služeb!
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>V Příkazovém řádku (cmd.exe) spusťte příkaz <code>tasklist /svc</code>.</li>
                  <li>
                    Všimněte si sloupce <strong>Služby (Services)</strong>: u běžných aplikací (např. <code>chrome.exe</code>) je napsáno <code>N/A</code> (Not Applicable – jsou to samostatné programy, nevezou žádnou službu).
                  </li>
                  <li>
                    Filtrem si nechte vypsat pouze autobusy: <code>tasklist /svc /fi "IMAGENAME eq svchost.exe"</code>.
                  </li>
                  <li>Vyberte libovolný řádek <code>svchost.exe</code>, zapište jeho PID a zkratku služby, kterou veze (např. <code>gpsvc</code>, <code>ClipSVC</code>, <code>Dnscache</code>).</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda &amp; Tahák: Co znamenají zkratky služeb a hodnota N/A?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-2 pt-2 border-t border-amber-200/60">
                  <p><strong>Příkaz pro vyfiltrování pouze svchostů:</strong> <code>tasklist /svc /fi "IMAGENAME eq svchost.exe"</code></p>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-amber-300/60 space-y-1 font-mono text-[11px]">
                    <div>• <strong>N/A</strong> = Not Applicable (běžný program jako Chrome nebo Kalkulačka, neběží jako služba)</div>
                    <div>• <strong>gpsvc</strong> = Group Policy Client (Zásady skupiny – školní/firemní pravidla a omezení PC)</div>
                    <div>• <strong>ClipSVC</strong> = Client License Service (licence aplikací a Microsoft Store)</div>
                    <div>• <strong>Dnscache</strong> = DNS klient (překlad webových domén jako seznam.cz na IP adresy)</div>
                    <div>• <strong>wuauserv</strong> = Windows Update (stahování a instalace oprav systému)</div>
                    <div>• <strong>LanmanWorkstation</strong> = síťová služba pro připojování ke sdíleným složkám</div>
                    <div>• <strong>NcdAutoSetup</strong> = automatické hledání a připojení zařízení v síti (tiskárny, TV)</div>
                  </div>
                  <p className="text-rose-900 font-semibold">
                    ⚠️ <strong>Kdy zpozornět:</strong> Kdyby proces <code>svchost.exe</code> měl ve sloupci Služby napsáno <code>N/A</code> (tedy prázdný autobus bez služby), nebo měl neznámou službu z podivné složky, jedná se o maskovaný virus!
                  </p>
                </div>
              </details>

              {/* Formulářová pole úlohy 3 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištění z mapování služeb na procesy:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Použitý příkaz v CMD:</label>
                    <input
                      type="text"
                      value={protocol.task3SvcCmd}
                      onChange={(e) => setProtocol({ ...protocol, task3SvcCmd: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Zvolené PID procesu svchost:</label>
                    <input
                      type="text"
                      value={protocol.task3SvchostPid}
                      onChange={(e) => setProtocol({ ...protocol, task3SvchostPid: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Běžící systémové služby v tomto PID:</label>
                    <input
                      type="text"
                      value={protocol.task3SvcNames}
                      onChange={(e) => setProtocol({ ...protocol, task3SvcNames: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 4: FORENZNÍ EXPORT DO CSV A TABULKOVÁ ANALÝZA ANOMÁLIÍ
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task4'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task4'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 4: Forenzní export do CSV a tabulková analýza anomálií
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Přesměrování výstupu do souboru a hloubková prověrka instancí svchost.exe v Excelu
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task4')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task4'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task4'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Ve Windows běží současně 200 až 300 procesů. Číst je očima v černém okně terminálu je nepřehledné a zdlouhavé. 
                  Pokud se ale data vyexportují do Excelu, můžete procesy okamžitě seřadit podle spotřeby paměti, spočítat výskyty a odhalit anomálie. 
                  Útočník se rád maskuje za <code>svchost.exe</code>, protože doufá, že mezi desítkami instancí zanikne. 
                  V tabulce ale ihned spatříte, zda některý <code>svchost.exe</code> nemá neobvykle vysokou spotřebu paměti nebo nevybočuje z normálu.
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>V Příkazovém řádku (cmd.exe) vyexportujte seznam všech běžících procesů do formátu CSV (např. do souboru <code>procesy.csv</code> na plochu).</li>
                  <li>Otevřete vygenerovaný CSV soubor v <strong>Microsoft Excelu</strong> (nebo LibreOffice Calc).</li>
                  <li>Seřaďte data podle sloupce <strong>Využití paměti</strong> od největšího po nejmenší a identifikujte nejnáročnější proces v PC.</li>
                  <li>Pomocí filtru nebo vyhledávání zjistěte, kolikrát přesně se v seznamu vyskytuje proces <code>svchost.exe</code>.</li>
                  <li>Zkontrolujte, zda žádná instance <code>svchost.exe</code> nevykazuje abnormálně vysokou paměť RAM (např. stovky MB), což by značilo únik paměti nebo maskovaný virus.</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Jak vyexportovat výstup do CSV a přesměrovat do souboru?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>Bude třeba použít parametr <code>/FO CSV</code> a přesměrovat výstup do souboru.</p>
                  <p>K dohledání konkrétního postupu a operátoru pro přesměrování můžete použít jakýkoliv zdroj informací (nápovědu <code>tasklist /?</code>, internet či dokumentaci).</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 4 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Výsledky forenzní tabulkové analýzy:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Příkaz pro export do CSV:</label>
                    <input
                      type="text"
                      value={protocol.task4ExportCmd}
                      onChange={(e) => setProtocol({ ...protocol, task4ExportCmd: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Proces s největší RAM:</label>
                    <input
                      type="text"
                      value={protocol.task4TopRamProcess}
                      onChange={(e) => setProtocol({ ...protocol, task4TopRamProcess: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Počet instancí svchost.exe:</label>
                    <input
                      type="text"
                      value={protocol.task4SvchostCount}
                      onChange={(e) => setProtocol({ ...protocol, task4SvchostCount: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Audit anomálií procesů:</label>
                    <input
                      type="text"
                      value={protocol.task4SvchostAnomaly}
                      onChange={(e) => setProtocol({ ...protocol, task4SvchostAnomaly: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 5: ODPOSLECH A AUDIT SÍŤOVÝCH SPOJENÍ V RESMON.EXE
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task5'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task5'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 5: Odposlech a audit síťových spojení v Sledování prostředků (resmon.exe)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Ověření odchozích IP adres, hromadná analýza v tabulce a rozpoznání podezřelých serverů
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task5')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task5'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task5'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Spyware, trojské koně a keyloggery mají po infikování stroje společný cíl: odeslat ukradená data útočníkovi na řídicí server (C2 – Command and Control server). 
                  Podobně i pochybné či zavirované webové stránky otevírají na pozadí desítky skrytých spojení na cizí servery a reklamní trackery po celém světě. 
                  Nástroj <strong>resmon.exe</strong> umožňuje v reálném čase sledovat, které procesy otevírají odchozí spojení a s jakými konkrétními IP adresami komunikují.
                </p>
              </div>

              {/* Postup práce rozdělený na 3 kroky */}
              <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce (3 vyšetřovací kroky):</div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1.5">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-black">1</span>
                    Krok 1: Prověření jednoho odchozího spojení (Google Chrome)
                  </div>
                  <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-600">
                    <li>Spusťte nástroj <strong>Sledování prostředků</strong> (stiskněte <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Win + R</kbd> a zadejte <code>resmon.exe</code>).</li>
                    <li>Přejděte na záložku <strong>Síť (Network)</strong> a rozbalte sekci <strong>Připojení TCP (TCP Connections)</strong>.</li>
                    <li>Najděte proces prohlížeče (např. <code>chrome.exe</code>) s aktivním spojením a opište jednu z jeho cílových IP adres ze sloupce <strong>Vzdálená adresa (Remote Address)</strong>.</li>
                    <li>Tuto IP adresu prověřte na webové službě pro IP reputaci a Whois (např. <a href="https://ipinfo.io" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">IPinfo.io</a>, <a href="https://whois.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">Whois.com</a> nebo <a href="https://www.virustotal.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">VirusTotal.com</a>) a zjistěte, zda patří legitimní společnosti (např. Google LLC, Cloudflare, Akamai).</li>
                  </ol>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1.5">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-black">2</span>
                    Krok 2: Hromadný export spojení (Edge + Seznam.cz) do tabulky v Excelu
                  </div>
                  <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-600">
                    <li>Spusťte prohlížeč <strong>Microsoft Edge</strong> a otevřete stránku <code>seznam.cz</code>.</li>
                    <li>V <code>resmon.exe</code> v sekci Připojení TCP vyhledejte procesy <code>msedge.exe</code>.</li>
                    <li>Označte všechny řádky spojení procesu Edge (klikněte na první, podržte Shift a klikněte na poslední) a zkopírujte je zkratkou <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Ctrl + C</kbd>.</li>
                    <li>Otevřete tabulkový editor (Excel nebo LibreOffice Calc) a vložte data zkratkou <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Ctrl + V</kbd> – data se přehledně vloží do jednotlivých sloupců tabulky.</li>
                    <li>V tabulce vyberte sloupec se vzdálenými IP adresami a zjistěte/navrhněte způsob, jak tyto IP adresy hromadně prověřit (např. hromadný online Whois nástroj nebo kontrola příslušnosti k doménám Seznamu a CDN).</li>
                  </ol>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1.5">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-black">3</span>
                    Krok 3: Zamyslení – jak odhalit podezřelé stránky v síťové telemetrii
                  </div>
                  <p className="text-slate-600 pl-1">
                    Zamyslete se: jaká webová stránka (např. neoficiální stahovací portál, warez, pirátský streaming s agresivními skripty nebo phishing) by po otevření vyvolala podezřelá spojení? 
                    Jak by se taková podezřelá telemetrie v resmonu a v tabulce projevila oproti návštěvě běžného Seznamu?
                  </p>
                </div>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Webové služby pro prověření IP adres a doplňující informace o síťových portech</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-2 pt-2 border-t border-amber-200/60">
                  <p>• <strong>Kde prověřit jednu IP adresu:</strong> Služby <a href="https://ipinfo.io" target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold">ipinfo.io</a> nebo <a href="https://whois.com" target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold">whois.com</a> po zadání IP adresy vypíšou název organizace (ASN), zemi registrace a poskytovatele hostingu.</p>
                  <p>• <strong>Hromadné ověření (Bulk Lookup):</strong> Pro prověření desítek IP adres najednou lze v prohlížeči vyhledat online nástroje typu <em>„Bulk IP lookup“</em> (např. WhatIsMyIPAddress Bulk IP Lookup, IPVoid nebo AbuseIPDB), do kterých lze vložit celý sloupec adres najednou.</p>
                  <p>• <strong>Doplňující informace o síťových portech:</strong> Běžný webový provoz využívá porty <strong>80</strong> (nešifrovaný HTTP) a <strong>443</strong> (šifrovaný HTTPS). Pokud proces otevírá nestandardní vysoké porty (např. 4444, 1337) na neznámé zahraniční IP adresy, je to typický varovný signál škodlivé komunikace či reverzního shellu.</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 5 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištěná síťová telemetrie a záznam zjištění:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">1. Odchozí IP adresa procesu Chrome (z resmon.exe):</label>
                    <input
                      type="text"
                      value={protocol.task5ChromeIp || ''}
                      onChange={(e) => setProtocol({ ...protocol, task5ChromeIp: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">1. Legitimní organizace / vlastník této IP (z IPinfo / Whois):</label>
                    <input
                      type="text"
                      value={protocol.task5IpOwner || ''}
                      onChange={(e) => setProtocol({ ...protocol, task5IpOwner: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">2. Jak lze sloupce IP adres ze Seznam.cz v tabulce hromadně prověřit?:</label>
                    <input
                      type="text"
                      value={protocol.task5BulkMethod || ''}
                      onChange={(e) => setProtocol({ ...protocol, task5BulkMethod: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">3. Zamyslení: Který web by otevřel podezřelá spojení a jak je poznat?:</label>
                    <textarea
                      rows={2}
                      value={protocol.task5SuspiciousReflection || ''}
                      onChange={(e) => setProtocol({ ...protocol, task5SuspiciousReflection: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 6: INSPEKCE STROMU V PROCESS EXPLORERU
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task6'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    6
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task6'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 6: Inspekce procesního stromu v Sysinternals Process Explorer
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Ověřování digitálních podpisů Authenticode a cloudová detekce VirusTotal
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task6')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task6'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task6'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Sysinternals Process Explorer je zlatý standard každého vyšetřovatele kybernetických incidentů. 
                  Umožňuje okamžitě ověřit, zda je proces kryptograficky podepsán vydavatelem (Authenticode podpis od Microsoftu) 
                  a jediným kliknutím zkontrolovat hash běžícího binárního souboru v databázi více než 70 antivirových enginů VirusTotal. 
                  Barevné kódování navíc vizuálně odděluje systémové služby od běžných programů.
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Otevřete <strong>Process Explorer</strong> jako Správce (Run as Administrator) na školním PC nebo v simulátoru na záložce 2.</li>
                  <li>Zapněte volbu <strong>Options ➔ Verify Image Signatures</strong> a <strong>Check VirusTotal.com</strong>.</li>
                  <li>Ověřte sloupec <strong>Verified Signer</strong> u procesu <code>explorer.exe</code>.</li>
                  <li>Zkontrolujte VirusTotal skóre u libovolné instance <code>svchost.exe</code>.</li>
                  <li>V menu <strong>Options ➔ Configure Colors</strong> zjistěte, co značí růžové a fialové zvýraznění řádků.</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Proč Process Explorer zobrazuje některé řádky fialově?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>Fialová barva (Packed Images) indikuje, že spustitelný soubor byl zkomprimován nebo zašifrován packerem (např. UPX). Autoři malwaru packery běžně používají k tomu, aby skryli svůj kód před antivirovými skenery.</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 6 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištění z Process Exploreru:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Ověřený podpis explorer.exe:</label>
                    <input
                      type="text"
                      value={protocol.task6ExplorerSigner}
                      onChange={(e) => setProtocol({ ...protocol, task6ExplorerSigner: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">VirusTotal skóre svchost:</label>
                    <input
                      type="text"
                      value={protocol.task6SvchostScore}
                      onChange={(e) => setProtocol({ ...protocol, task6SvchostScore: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Význam růžové barvy:</label>
                    <input
                      type="text"
                      value={protocol.task6PinkMeaning}
                      onChange={(e) => setProtocol({ ...protocol, task6PinkMeaning: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Význam fialové barvy:</label>
                    <input
                      type="text"
                      value={protocol.task6PurpleMeaning}
                      onChange={(e) => setProtocol({ ...protocol, task6PurpleMeaning: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Další prověřená aplikace:</label>
                    <input
                      type="text"
                      value={protocol.task6BonusApp}
                      onChange={(e) => setProtocol({ ...protocol, task6BonusApp: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 7: VÝPOČET KRYPTOGRAFICKÉHO HASHU V CMD (certutil)
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task7'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    7
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task7'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 7: Výpočet kryptografického hashe v CMD (certutil) a lustrace na VirusTotal.com
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Ověření integrity souboru notepad.exe přes 64znakový SHA-256 otisk
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task7')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task7'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task7'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Když bezpečnostní analytik zkoumá podezřelý soubor, nesmí ho bezmyšlenkovitě nahrávat na veřejný internet, protože by mohl vyzradit citlivá firemní data. 
                  Místo toho z něj přímo v Příkazovém řádku spočítá <strong>kryptografický otisk (SHA-256 hash)</strong>. 
                  Tento 64znakový kód pak vyhledá v globální databázi VirusTotal. Pokud stejný soubor už někdo ve světě viděl, VirusTotal okamžitě vrátí jeho historii, jméno autora a bezpečnostní hodnocení.
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>V Příkazovém řádku (cmd.exe) spočítejte SHA-256 hash systémového souboru <code>C:\Windows\System32\notepad.exe</code> pomocí vestavěného nástroje <code>certutil</code>.</li>
                  <li>Zkopírujte vypsaný 64znakový hexadecimální řetězec.</li>
                  <li>Přejděte na web <a href="https://www.virustotal.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline">VirusTotal.com</a>, přepněte na záložku <strong>Search</strong> a hash vložte.</li>
                  <li>Zkontrolujte výsledek reputační analýzy (kolik bezpečnostních enginů hlásí čistý soubor).</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Jak funguje vestavěný příkaz certutil v CMD?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>Nástroj <code>certutil</code> je přímo součástí všech instalací Windows (není třeba nic stahovat ani otevírat PowerShell).</p>
                  <p>Příkaz <code>certutil -hashfile &lt;cesta_k_souboru&gt; SHA256</code> vypíše přesný 64znakový kontrolní součet na druhém řádku výstupu.</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 7 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Výsledky hashovací analýzy:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Vypočtený SHA-256 hash (notepad.exe):</label>
                    <input
                      type="text"
                      value={protocol.task7Hash}
                      onChange={(e) => setProtocol({ ...protocol, task7Hash: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Výsledek reputace na VirusTotal.com:</label>
                    <input
                      type="text"
                      value={protocol.task7VtScore}
                      onChange={(e) => setProtocol({ ...protocol, task7VtScore: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ÚLOHA 8: SMART APP CONTROL (SAC) V ZABEZPEČENÍ WINDOWS
                ========================================================================= */}
            <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-5 ${
              checkedTasks['task8'] ? 'bg-emerald-50/40 border-emerald-400' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    8
                  </span>
                  <div>
                    <h3 className={`text-base font-black ${checkedTasks['task8'] ? 'text-emerald-950' : 'text-slate-800'}`}>
                      Úloha 8: Aktivní obranný val Windows 11 – Smart App Control (SAC)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Ochrana před spuštěním neznámých programů v paměti RAM
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask('task8')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    checkedTasks['task8'] 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {checkedTasks['task8'] ? (
                    <><CheckSquare className="w-4 h-4 text-emerald-600" /> Splněno</>
                  ) : (
                    <><Square className="w-4 h-4 text-slate-400" /> Označit jako splněné</>
                  )}
                </button>
              </div>

              {/* Proč to děláme */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Bezpečnostní kontext (Proč to děláme):
                </div>
                <p>
                  Klasické antiviry reagovaly až se zpožděním na známé signatury. Moderní Windows 11 obsahuje vrstvu Smart App Control, která funguje jako přísný vyhazovač u dveří do paměti RAM: nepodepsané nebo zcela neznámé programy bez reputace zablokuje <strong>ještě dříve, než jejich instrukce procesor vůbec začne vykonávat</strong>.
                </p>
              </div>

              {/* Postup práce */}
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Postup práce:</div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Otevřete <strong>Zabezpečení Windows</strong> (vyhledejte ve Startu nebo klikněte na ikonu štítu u hodin).</li>
                  <li>Přejděte do sekce <strong>Řízení aplikací a prohlížečů</strong>.</li>
                  <li>Otevřete <strong>Nastavení funkce Smart App Control</strong> a zjistěte její aktuální stav.</li>
                </ol>
              </div>

              {/* Rozbalovací nápověda */}
              <details className="text-xs bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 cursor-pointer group">
                <summary className="font-bold text-amber-900 flex items-center gap-1.5 list-none">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nápověda: Jaké 3 stavy může funkce Smart App Control mít?</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2.5 text-amber-950 font-normal leading-relaxed space-y-1.5 pt-2 border-t border-amber-200/60">
                  <p>• <strong>Zapnuto:</strong> Blokuje nedůvěryhodné aplikace v reálném čase.</p>
                  <p>• <strong>Hodnocení (Evaluation):</strong> Windows tiše monitoruje aplikace v pozadí, aniž by je blokoval, a zjišťuje, zda jste vhodný kandidát pro zapnutí bez falešných poplachů.</p>
                  <p>• <strong>Vypnuto:</strong> Funkce je neaktivní (pokud byla jednou vypnuta, lze ji znovu zapnout pouze čistou reinstalací Windows z důvodu bezpečnosti integrity).</p>
                </div>
              </details>

              {/* Formulářová pole úlohy 8 */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Zjištění o funkci Smart App Control:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Stav funkce Smart App Control na vašem PC:</label>
                    <input
                      type="text"
                      value={protocol.task8SacStatus}
                      onChange={(e) => setProtocol({ ...protocol, task8SacStatus: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Proč je tato ochrana účinnější než pouhé čekání na virus?:</label>
                    <input
                      type="text"
                      value={protocol.task8SacReason}
                      onChange={(e) => setProtocol({ ...protocol, task8SacReason: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================
                ZÁVĚREČNÝ ZÁZNAM ZJIŠTĚNÍ A EXPORT
                ========================================================================= */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <Info className="w-5 h-5 text-indigo-600" />
                    Závěrečný záznam zjištění a kontrolní otázky
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Shrňte výsledky svého vyšetřování a odpovězte na teoretické otázky před odevzdáním.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyProtocolToClipboard}
                  className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-indigo-200"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{copiedSuccess ? 'Zkopírováno!' : 'Kopírovat pro Teams'}</span>
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1 leading-relaxed">
                    1. Proč se malware nejčastěji maskuje právě pod název svchost.exe a podle jakých indicií (překlep ve jménu, cesta na disku, chybějící služba v /svc) ho spolehlivě odhalíte?
                  </label>
                  <textarea
                    rows={2}
                    value={protocol.qVirusWorm}
                    onChange={(e) => setProtocol({ ...protocol, qVirusWorm: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1 leading-relaxed">
                    2. Proč je nutné spouštět diagnostické nástroje (Process Explorer, Příkazový řádek) jako Správce (Run as Administrator)?
                  </label>
                  <textarea
                    rows={2}
                    value={protocol.qRunAsAdmin}
                    onChange={(e) => setProtocol({ ...protocol, qRunAsAdmin: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

          </div>
        </WorksheetLayout>
      )}

      {/* =========================================================================
          ZÁLOŽKA 4: OVĚŘOVACÍ KVÍZ
          ========================================================================= */}
      {activeTab === 'kviz' && (
        <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
          <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Ověřovací kvíz: Správa procesů a certifikáty</h2>
            <p className="text-sm text-slate-500 mb-6">Vyberte správné odpovědi a ověřte si své znalosti ze všech okruhů kapitoly.</p>

            {/* Otázka 1: Rodičovský proces svchost.exe */}
            <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h4 className="text-sm font-black text-slate-800 mb-3">
                1. Kdo je legitimním rodičovským procesem (Parent Process) pro systémové instance svchost.exe?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 0, text: 'explorer.exe (Průzkumník plochy)' },
                  { id: 1, text: 'services.exe (Správce systémových služeb)' },
                  { id: 2, text: 'cmd.exe (Příkazový řádek)' },
                  { id: 3, text: 'WINWORD.EXE (Microsoft Word)' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, 1: opt.id })}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                      quizAnswers[1] === opt.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {quizSubmitted && opt.id === 1 && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Otázka 2: Digitální podpis Authenticode */}
            <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h4 className="text-sm font-black text-slate-800 mb-3">
                2. Co se stane s digitálním podpisem Authenticode, pokud útočník v programu změní jediný bajt?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 0, text: 'Nic, digitální podpis platí dál, dokud nevyprší datum certifikátu.' },
                  { id: 1, text: 'Systém nově spočte SHA-256 hash, zjistí nesoulad s podpisem a označí integritu za porušenou.' },
                  { id: 2, text: 'Windows automaticky chybějící bajt opraví ze zálohy.' },
                  { id: 3, text: 'Podpis se automaticky přelicencuje na útočníka.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, 2: opt.id })}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                      quizAnswers[2] === opt.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {quizSubmitted && opt.id === 1 && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Otázka 3: Fialové zvýraznění v Process Exploreru */}
            <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h4 className="text-sm font-black text-slate-800 mb-3">
                3. Co v nástroji Sysinternals Process Explorer indikuje fialová barva řádku (Packed Images)?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 0, text: 'Proces je zkomprimován nebo zašifrován packerem (častá technika malwaru pro maskování kódu).' },
                  { id: 1, text: 'Proces běží v grafickém prostředí DirectX.' },
                  { id: 2, text: 'Proces právě využívá více než 90 % kapacity CPU.' },
                  { id: 3, text: 'Proces je systémová služba Windows běžící pod účtem SYSTEM.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, 3: opt.id })}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                      quizAnswers[3] === opt.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {quizSubmitted && opt.id === 0 && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Otázka 4: Příkaz pro SHA-256 hash v CMD */}
            <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h4 className="text-sm font-black text-slate-800 mb-3">
                4. Jakým nativním příkazem v Příkazovém řádku (cmd.exe) spočítáme SHA-256 hash souboru bez PowerShellu?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 0, text: 'md5sum soubor.exe' },
                  { id: 1, text: 'certutil -hashfile soubor.exe SHA256' },
                  { id: 2, text: 'tasklist /HASH soubor.exe' },
                  { id: 3, text: 'format /SHA256 soubor.exe' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, 4: opt.id })}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                      quizAnswers[4] === opt.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {quizSubmitted && opt.id === 1 && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Otázka 5: Smart App Control */}
            <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h4 className="text-sm font-black text-slate-800 mb-3">
                5. V čem spočívá hlavní výhoda funkce Smart App Control ve Windows 11 oproti klasickému antiviru?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 0, text: 'Automaticky restartuje počítač každých 60 minut.' },
                  { id: 1, text: 'Blokuje neznámé a nepodepsané programy proaktivně ještě před zavedením instrukcí do paměti RAM.' },
                  { id: 2, text: 'Odpojuje počítač od elektrické sítě při přepětí.' },
                  { id: 3, text: 'Maže dočasné soubory v koši po každém vypnutí.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQuizAnswers({ ...quizAnswers, 5: opt.id })}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                      quizAnswers[5] === opt.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {quizSubmitted && opt.id === 1 && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setQuizSubmitted(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all cursor-pointer shadow-md shadow-blue-600/20"
              >
                Vyhodnotit kvíz
              </button>

              {quizSubmitted && (
                <div className="font-bold text-sm text-slate-800">
                  Výsledek:{' '}
                  <span className="text-blue-600">
                    {[
                      quizAnswers[1] === 1,
                      quizAnswers[2] === 1,
                      quizAnswers[3] === 0,
                      quizAnswers[4] === 1,
                      quizAnswers[5] === 1
                    ].filter(Boolean).length}{' '}
                    / 5 správně
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </FsChapterShell>
  );
}
