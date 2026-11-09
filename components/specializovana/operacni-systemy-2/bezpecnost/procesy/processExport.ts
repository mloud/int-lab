import { downloadWordDoc } from '@/lib/wordExport';
import { ProcessProtocolState } from './processTypes';

export const EMPTY_PROCESS_PROTOCOL: ProcessProtocolState = {
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
  task9WinscpVtScore: '',
  task9WinscpVerdict: '',
  task9NotepadVtScore: '',
  task9NotepadVerdict: '',
  task10MspaintPid: '',
  task10MspaintSigner: '',
  task10MspaintVtScore: '',
  task10SecondProcessName: '',
  task10SecondProcessSigner: '',
  task10SecondProcessVtScore: '',
  task11OriginalCertStatus: '',
  task11ModifiedString: '',
  task11ModifiedCertStatus: '',
  task11WhyInvalid: '',
  task12SvcCmd: '',
  task12SvchostPid: '',
  task12SvcNames: '',
  task12SvcWhyAbused: '',
  task13ExpertSignerResult: '',
  task13ExpertSmartScreenReason: ''
};

export function formatProcessProtocolText(studentName: string, protocol: ProcessProtocolState): string {
  return `=== PRAKTICKÝ LIST: SPRÁVA PROCESŮ A DIGITÁLNÍ CERTIFIKÁTY ===
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

[Úloha 9: Cloudová reputace na VirusTotal.com (WinSCP & notepad.exe)]
- WinSCP skóre detekce: ${protocol.task9WinscpVtScore || '-'}
- WinSCP zhodnocení: ${protocol.task9WinscpVerdict || '-'}
- notepad.exe skóre detekce: ${protocol.task9NotepadVtScore || '-'}
- notepad.exe zhodnocení: ${protocol.task9NotepadVerdict || '-'}

[Úloha 10: Živá analýza procesů v Sysinternals Process Explorer & VirusTotal]
- Malování (mspaint.exe) PID: ${protocol.task10MspaintPid || '-'}
- Malování Verified Signer: ${protocol.task10MspaintSigner || '-'}
- Malování VirusTotal skóre: ${protocol.task10MspaintVtScore || '-'}
- 2. vybraný proces: ${protocol.task10SecondProcessName || '-'}
- 2. proces Verified Signer: ${protocol.task10SecondProcessSigner || '-'}
- 2. proces VirusTotal skóre: ${protocol.task10SecondProcessVtScore || '-'}

[Úloha 11*: Simulace modifikace binárního kódu v HxD a porušení certifikátu]
- Původní stav podpisu vlc.exe: ${protocol.task11OriginalCertStatus || '-'}
- Změněný textový řetězec: ${protocol.task11ModifiedString || '-'}
- Stav podpisu po editaci v HxD: ${protocol.task11ModifiedCertStatus || '-'}
- Proč systém podpis odmítl: ${protocol.task11WhyInvalid || '-'}

[Úloha 12*: Služby pod svchost.exe (tasklist /svc)]
- Použitý příkaz: ${protocol.task12SvcCmd || '-'}
- Vybrané PID svchost.exe: ${protocol.task12SvchostPid || '-'}
- Běžící služby: ${protocol.task12SvcNames || '-'}
- Důvod maskování malwaru za svchost: ${protocol.task12SvcWhyAbused || '-'}

[Úloha 13**: Expertní výzva – Vlastní nepodepsaný program]
- Stav podpisu v Process Exploreru: ${protocol.task13ExpertSignerResult || '-'}
- Proč SmartScreen program zablokuje: ${protocol.task13ExpertSmartScreenReason || '-'}
`;
}

export function downloadProcessProtocolWord(studentName: string, protocol: ProcessProtocolState): void {
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

        <h2>Úloha 9: Cloudová reputace na VirusTotal.com (WinSCP &amp; notepad.exe)</h2>
        <div class="item"><span class="label">WinSCP skóre detekce:</span> <span class="val">${protocol.task9WinscpVtScore || '-'}</span></div>
        <div class="item"><span class="label">WinSCP zhodnocení:</span> <span class="val">${protocol.task9WinscpVerdict || '-'}</span></div>
        <div class="item"><span class="label">notepad.exe skóre detekce:</span> <span class="val">${protocol.task9NotepadVtScore || '-'}</span></div>
        <div class="item"><span class="label">notepad.exe zhodnocení:</span> <span class="val">${protocol.task9NotepadVerdict || '-'}</span></div>

        <h2>Úloha 10: Živá analýza procesů v Sysinternals Process Explorer &amp; VirusTotal</h2>
        <div class="item"><span class="label">Malování (mspaint.exe) PID:</span> <span class="val">${protocol.task10MspaintPid || '-'}</span></div>
        <div class="item"><span class="label">Malování Verified Signer:</span> <span class="val">${protocol.task10MspaintSigner || '-'}</span></div>
        <div class="item"><span class="label">Malování VirusTotal skóre:</span> <span class="val">${protocol.task10MspaintVtScore || '-'}</span></div>
        <div class="item"><span class="label">2. vybraný proces:</span> <span class="val">${protocol.task10SecondProcessName || '-'}</span></div>
        <div class="item"><span class="label">2. proces Verified Signer:</span> <span class="val">${protocol.task10SecondProcessSigner || '-'}</span></div>
        <div class="item"><span class="label">2. proces VirusTotal skóre:</span> <span class="val">${protocol.task10SecondProcessVtScore || '-'}</span></div>

        <h2>Úloha 11*: Simulace modifikace binárního kódu v HxD a porušení certifikátu</h2>
        <div class="item"><span class="label">Původní stav podpisu vlc.exe:</span> <span class="val">${protocol.task11OriginalCertStatus || '-'}</span></div>
        <div class="item"><span class="label">Změněný textový řetězec:</span> <span class="val">${protocol.task11ModifiedString || '-'}</span></div>
        <div class="item"><span class="label">Stav podpisu po editaci v HxD:</span> <span class="val">${protocol.task11ModifiedCertStatus || '-'}</span></div>
        <div class="item"><span class="label">Proč systém podpis odmítl:</span> <span class="val">${protocol.task11WhyInvalid || '-'}</span></div>

        <h2>Úloha 12*: Mapování systémových služeb pod svchost.exe (tasklist /svc)</h2>
        <div class="item"><span class="label">Použitý příkaz:</span> <span class="val">${protocol.task12SvcCmd || '-'}</span></div>
        <div class="item"><span class="label">Zkoumané PID svchost.exe:</span> <span class="val">${protocol.task12SvchostPid || '-'}</span></div>
        <div class="item"><span class="label">Služby běžící pod tímto PID:</span> <span class="val">${protocol.task12SvcNames || '-'}</span></div>
        <div class="item"><span class="label">Důvod maskování útočníků za svchost:</span> <span class="val">${protocol.task12SvcWhyAbused || '-'}</span></div>

        <h2>Úloha 13**: Expertní výzva – Vytvoření a analýza vlastního nepodepsaného programu</h2>
        <div class="item"><span class="label">Verified Signer vlastního programu:</span> <span class="val">${protocol.task13ExpertSignerResult || '-'}</span></div>
        <div class="item"><span class="label">Důvod zablokování filtrem SmartScreen:</span> <span class="val">${protocol.task13ExpertSmartScreenReason || '-'}</span></div>
      </body>
      </html>
    `;

  downloadWordDoc(content, 'Protokol_SpravaProcesu', studentName);
}

