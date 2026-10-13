'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Activity, 
  FileText, 
  HelpCircle 
} from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ProcessProtocolState } from './procesy/processTypes';
import ProcessTheoryTab from './procesy/ProcessTheoryTab';
import ProcessSimulatorsTab from './procesy/ProcessSimulatorsTab';
import ProcessLabTab from './procesy/ProcessLabTab';
import ProcessQuizTab from './procesy/ProcessQuizTab';

interface ProcessCertificatesChapterProps {
  onBack: () => void;
}

export default function ProcessCertificatesChapter({ onBack }: ProcessCertificatesChapterProps) {
  const [activeTab, setActiveTab] = useState<'teorie' | 'simulator' | 'laborator' | 'kviz'>('teorie');

  // Protokol pro laboratorní práci
  const [studentName, setStudentName] = useLocalStorage<string>('process_lab_student_name', '');
  const [checkedTasks, setCheckedTasks] = useLocalStorage<Record<string, boolean>>('process_lab_checked_tasks', {});
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const [protocol, setProtocol] = useLocalStorage<ProcessProtocolState>('process_lab_protocol_answers', {
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
      {activeTab === 'teorie' && <ProcessTheoryTab />}
      {activeTab === 'simulator' && <ProcessSimulatorsTab />}
      {activeTab === 'laborator' && (
        <ProcessLabTab
          studentName={studentName}
          setStudentName={setStudentName}
          checkedTasks={checkedTasks}
          toggleTask={toggleTask}
          protocol={protocol}
          setProtocol={setProtocol}
          copyProtocolToClipboard={copyProtocolToClipboard}
          copiedSuccess={copiedSuccess}
          handleDownloadWord={handleDownloadWord}
        />
      )}
      {activeTab === 'kviz' && <ProcessQuizTab />}
    </FsChapterShell>
  );
}
