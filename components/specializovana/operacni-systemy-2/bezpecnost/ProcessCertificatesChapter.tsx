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
  const [activeTab, setActiveTab] = useLocalStorage<'teorie' | 'simulator' | 'laborator' | 'kviz'>('process_chapter_active_tab', 'teorie');

  // Protokol pro laboratorní práci
  const [studentName, setStudentName] = useLocalStorage<string>('process_lab_student_name', '');
  const [checkedTasks, setCheckedTasks] = useLocalStorage<Record<string, boolean>>('process_lab_checked_tasks', {});
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const [protocol, setProtocol] = useLocalStorage<ProcessProtocolState>('process_lab_protocol_answers_v9', {
    task1SacStatus: '',
    task2AntivirusStatus: '',
    task2SignatureVersion: '',
    task3RansomwareStatus: '',
    task3ProtectedFolders: '',
    task4AppName: '',
    task4SignerSubject: '',
    task4CertificateCA: '',
    task4CertPathStatus: '',
    task5FileName: '',
    task5WebHash: '',
    task5LocalHash: '',
    task5HashesMatch: '',
    task6ExplorerPid: '',
    task6ExplorerMemory: '',
    task6ExplorerCmd: '',
    task7MemCmd: '',
    task7TopProcess: '',
    task7TopMemValue: '',
    task8NetworkProcess: '',
    task8RemoteIp: '',
    task8RemotePort: '',
    task8IpOwner: '',
    task8IsLegitimate: '',
    task9FileName: '',
    task9VtScore: '',
    task9VtVerdict: '',
    task10MspaintPid: '',
    task10MspaintSigner: '',
    task10MspaintVtScore: '',
    task10SecondProcessName: '',
    task10SecondProcessSigner: '',
    task10SecondProcessVtScore: '',
    task11SvcCmd: '',
    task11SvchostPid: '',
    task11SvcNames: '',
    task11SvcWhyAbused: '',
    task12ExpertSignerResult: '',
    task12ExpertSmartScreenReason: ''
  });

  const toggleTask = (taskId: string) => {
    setCheckedTasks({
      ...checkedTasks,
      [taskId]: !checkedTasks[taskId]
    });
  };

  const copyProtocolToClipboard = () => {
    const text = `=== PRAKTICKÝ LIST: SPRÁVA PROCESŮ A DIGITÁLNÍ CERTIFIKÁTY ===
Jméno studenta: ${studentName || 'Neuvedeno'}
Datum vypracování: ${new Date().toLocaleDateString('cs-CZ')}

[Úloha 1: Smart App Control & SmartScreen]
- Stav funkce na PC: ${protocol.task1SacStatus || '-'}

[Úloha 2: Kontrola antivirového štítu a signatur]
- Stav ochrany v reálném čase: ${protocol.task2AntivirusStatus || '-'}
- Verze signatur / definic: ${protocol.task2SignatureVersion || '-'}

[Úloha 3: Ochrana před ransomwarem]
- Stav funkce Řízený přístup ke složkám: ${protocol.task3RansomwareStatus || '-'}
- Chráněné složky: ${protocol.task3ProtectedFolders || '-'}

[Úloha 4: Inspekce digitálního podpisu a certifikátu aplikace v GUI]
- Prověřovaný program / instalátor: ${protocol.task4AppName || '-'}
- Vystaveno pro (Předmět): ${protocol.task4SignerSubject || '-'}
- Vystavitel certifikátu (CA): ${protocol.task4CertificateCA || '-'}
- Stav v Certifikační cestě: ${protocol.task4CertPathStatus || '-'}

[Úloha 5: Kontrola integrity a neměnnosti souboru (Hash vs. Checksum z webu)]
- Prověřovaný soubor: ${protocol.task5FileName || '-'}
- Kontrolní hash uvedený na webu: ${protocol.task5WebHash || '-'}
- Vypočítaný lokální SHA-256 hash (certutil): ${protocol.task5LocalHash || '-'}
- Shodují se hashe?: ${protocol.task5HashesMatch || '-'}

[Úloha 6: Stopování explorer.exe v CLI (cmd.exe)]
- PID: ${protocol.task6ExplorerPid || '-'}
- Využití paměti RAM: ${protocol.task6ExplorerMemory || '-'}
- Použitý příkaz: ${protocol.task6ExplorerCmd || '-'}

[Úloha 7: Výpis procesů s pamětí nad 100 MB v CLI]
- Použitý příkaz: ${protocol.task7MemCmd || '-'}
- Proces s největší RAM nad 100 MB: ${protocol.task7TopProcess || '-'}
- Zjištěná paměť: ${protocol.task7TopMemValue || '-'}

[Úloha 8: Odposlech síťových spojení (resmon.exe)]
- Sledovaný proces: ${protocol.task8NetworkProcess || '-'}
- Vzdálená IP adresa a port: ${protocol.task8RemoteIp || '-'}
- Vlastník IP (IPinfo/Whois): ${protocol.task8IpOwner || '-'}
- Legitimita spojení: ${protocol.task8IsLegitimate || '-'}

[Úloha 9: Cloudová reputace a lustrace na VirusTotal.com]
- Prověřovaný soubor: ${protocol.task9FileName || '-'}
- VirusTotal skóre: ${protocol.task9VtScore || '-'}
- Zhodnocení bezpečnosti: ${protocol.task9VtVerdict || '-'}

[Úloha 10: Živá analýza procesů v Sysinternals Process Explorer & VirusTotal]
- Malování (mspaint.exe) PID: ${protocol.task10MspaintPid || '-'}
- Malování Verified Signer: ${protocol.task10MspaintSigner || '-'}
- Malování VirusTotal skóre: ${protocol.task10MspaintVtScore || '-'}
- 2. vybraný proces: ${protocol.task10SecondProcessName || '-'}
- 2. proces Verified Signer: ${protocol.task10SecondProcessSigner || '-'}
- 2. proces VirusTotal skóre: ${protocol.task10SecondProcessVtScore || '-'}

[Úloha 11*: Služby pod svchost.exe (tasklist /svc)]
- Použitý příkaz: ${protocol.task11SvcCmd || '-'}
- Vybrané PID svchost.exe: ${protocol.task11SvchostPid || '-'}
- Běžící služby: ${protocol.task11SvcNames || '-'}
- Důvod maskování malwaru za svchost: ${protocol.task11SvcWhyAbused || '-'}

[Úloha 12**: Expertní výzva – Vlastní nepodepsaný program]
- Stav podpisu v Process Exploreru: ${protocol.task12ExpertSignerResult || '-'}
- Proč SmartScreen program zablokuje: ${protocol.task12ExpertSmartScreenReason || '-'}
`;
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handleDownloadWord = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Praktický list - Správa procesů a certifikáty</title>
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
        <h1>Praktický list: Správa procesů a digitální certifikáty v OS</h1>
        <div class="meta">
          <strong>Student:</strong> ${studentName || 'Neuvedeno'}<br/>
          <strong>Předmět:</strong> Operační systémy 2 (2. Ročník SŠ)<br/>
          <strong>Datum:</strong> ${new Date().toLocaleDateString('cs-CZ')}
        </div>

        <h2>Úloha 1: Aktivní obranný val OS – Smart App Control & SmartScreen</h2>
        <div class="item"><span class="label">Stav funkce na PC:</span> <span class="val">${protocol.task1SacStatus || '-'}</span></div>

        <h2>Úloha 2: Kontrola antivirového štítu v reálném čase a signatur</h2>
        <div class="item"><span class="label">Stav ochrany v reálném čase:</span> <span class="val">${protocol.task2AntivirusStatus || '-'}</span></div>
        <div class="item"><span class="label">Verze virových signatur / definic:</span> <span class="val">${protocol.task2SignatureVersion || '-'}</span></div>

        <h2>Úloha 3: Kontrola ochrany před ransomwarem (Řízený přístup ke složkám)</h2>
        <div class="item"><span class="label">Stav funkce:</span> <span class="val">${protocol.task3RansomwareStatus || '-'}</span></div>
        <div class="item"><span class="label">Chráněné složky:</span> <span class="val">${protocol.task3ProtectedFolders || '-'}</span></div>

        <h2>Úloha 4: Inspekce digitálního podpisu a certifikátu aplikace v GUI</h2>
        <div class="item"><span class="label">Prověřovaný program / instalátor:</span> <span class="val">${protocol.task4AppName || '-'}</span></div>
        <div class="item"><span class="label">Vystaveno pro (Předmět):</span> <span class="val">${protocol.task4SignerSubject || '-'}</span></div>
        <div class="item"><span class="label">Vystavitel certifikátu (CA):</span> <span class="val">${protocol.task4CertificateCA || '-'}</span></div>
        <div class="item"><span class="label">Stav v Certifikační cestě:</span> <span class="val">${protocol.task4CertPathStatus || '-'}</span></div>

        <h2>Úloha 5: Kontrola integrity a neměnnosti souboru (Hash vs. Checksum z webu)</h2>
        <div class="item"><span class="label">Prověřovaný soubor:</span> <span class="val">${protocol.task5FileName || '-'}</span></div>
        <div class="item"><span class="label">Kontrolní hash uvedený na webu:</span> <span class="val">${protocol.task5WebHash || '-'}</span></div>
        <div class="item"><span class="label">Vypočítaný lokální hash (certutil):</span> <span class="val">${protocol.task5LocalHash || '-'}</span></div>
        <div class="item"><span class="label">Shodují se hashe?:</span> <span class="val">${protocol.task5HashesMatch || '-'}</span></div>

        <h2>Úloha 6: Stopování klíčového procesu v CLI (cmd.exe)</h2>
        <div class="item"><span class="label">Sledovaný proces:</span> explorer.exe</div>
        <div class="item"><span class="label">Zjištěné PID:</span> <span class="val">${protocol.task6ExplorerPid || '-'}</span></div>
        <div class="item"><span class="label">Využití paměti RAM:</span> <span class="val">${protocol.task6ExplorerMemory || '-'}</span></div>
        <div class="item"><span class="label">Použitý příkaz:</span> <span class="val">${protocol.task6ExplorerCmd || '-'}</span></div>

        <h2>Úloha 7: Výpis procesů s pamětí nad 100 MB v CLI (cmd.exe)</h2>
        <div class="item"><span class="label">Příkaz pro filtrování:</span> <span class="val">${protocol.task7MemCmd || '-'}</span></div>
        <div class="item"><span class="label">Proces s největší RAM nad 100 MB:</span> <span class="val">${protocol.task7TopProcess || '-'}</span></div>
        <div class="item"><span class="label">Zjištěná paměť:</span> <span class="val">${protocol.task7TopMemValue || '-'}</span></div>

        <h2>Úloha 8: Odposlech síťových spojení procesu naživo (resmon.exe)</h2>
        <div class="item"><span class="label">Sledovaný proces:</span> <span class="val">${protocol.task8NetworkProcess || '-'}</span></div>
        <div class="item"><span class="label">Vzdálená IP adresa a port:</span> <span class="val">${protocol.task8RemoteIp || '-'}</span></div>
        <div class="item"><span class="label">Vlastník IP adresy (IPinfo/Whois):</span> <span class="val">${protocol.task8IpOwner || '-'}</span></div>
        <div class="item"><span class="label">Zhodnocení legitimity:</span> <span class="val">${protocol.task8IsLegitimate || '-'}</span></div>

        <h2>Úloha 9: Cloudová reputace a lustrace na VirusTotal.com</h2>
        <div class="item"><span class="label">Prověřovaný soubor:</span> <span class="val">${protocol.task9FileName || '-'}</span></div>
        <div class="item"><span class="label">VirusTotal skóre detekce:</span> <span class="val">${protocol.task9VtScore || '-'}</span></div>
        <div class="item"><span class="label">Zhodnocení bezpečnosti:</span> <span class="val">${protocol.task9VtVerdict || '-'}</span></div>

        <h2>Úloha 10: Živá analýza procesů v Sysinternals Process Explorer &amp; VirusTotal</h2>
        <div class="item"><span class="label">Malování (mspaint.exe) PID:</span> <span class="val">${protocol.task10MspaintPid || '-'}</span></div>
        <div class="item"><span class="label">Malování Verified Signer:</span> <span class="val">${protocol.task10MspaintSigner || '-'}</span></div>
        <div class="item"><span class="label">Malování VirusTotal skóre:</span> <span class="val">${protocol.task10MspaintVtScore || '-'}</span></div>
        <div class="item"><span class="label">2. vybraný proces:</span> <span class="val">${protocol.task10SecondProcessName || '-'}</span></div>
        <div class="item"><span class="label">2. proces Verified Signer:</span> <span class="val">${protocol.task10SecondProcessSigner || '-'}</span></div>
        <div class="item"><span class="label">2. proces VirusTotal skóre:</span> <span class="val">${protocol.task10SecondProcessVtScore || '-'}</span></div>

        <h2>Úloha 11*: Mapování systémových služeb pod svchost.exe (tasklist /svc)</h2>
        <div class="item"><span class="label">Použitý příkaz:</span> <span class="val">${protocol.task11SvcCmd || '-'}</span></div>
        <div class="item"><span class="label">Zkoumané PID svchost.exe:</span> <span class="val">${protocol.task11SvchostPid || '-'}</span></div>
        <div class="item"><span class="label">Služby běžící pod tímto PID:</span> <span class="val">${protocol.task11SvcNames || '-'}</span></div>
        <div class="item"><span class="label">Důvod maskování útočníků za svchost:</span> <span class="val">${protocol.task11SvcWhyAbused || '-'}</span></div>

        <h2>Úloha 12**: Expertní výzva – Vytvoření a analýza vlastního nepodepsaného programu</h2>
        <div class="item"><span class="label">Verified Signer vlastního programu:</span> <span class="val">${protocol.task12ExpertSignerResult || '-'}</span></div>
        <div class="item"><span class="label">Důvod zablokování filtrem SmartScreen:</span> <span class="val">${protocol.task12ExpertSmartScreenReason || '-'}</span></div>
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
    { id: 'laborator', label: 'Praktický list', icon: FileText },
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
