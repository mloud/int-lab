export interface ProcessItem {
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

export const ORIGINAL_AUTHENTICODE_TEXT = `@echo off
rem ========================================================
rem Skolni bezpecnostni aktualizace v1.0
rem Vydavatel: Microsoft Windows Publisher (Certifikovano)
rem ========================================================
echo Overuji integritu systemu...
echo Vsechny bezpecnostni balicky jsou aktualni.
exit /b 0`;

export const PROCESS_TREE_DATA: ProcessItem[] = [
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

export interface ProcessProtocolState {
  // Úloha 1: Smart App Control / SmartScreen
  task1SacStatus: string;

  // Úloha 2: Antivirový štít a signatury
  task2AntivirusStatus: string;
  task2SignatureVersion: string;

  // Úloha 3: Ochrana před ransomwarem (Řízený přístup ke složkám)
  task3RansomwareStatus: string;
  task3ProtectedFolders: string;

  // Úloha 4: Inspekce digitálního podpisu a certifikátu aplikace v GUI (VLC / instalátor)
  task4AppName: string;
  task4SignerSubject: string;
  task4CertificateCA: string;
  task4CertPathStatus: string;

  // Úloha 5: Kontrola integrity a neměnnosti souboru (Hash & Checksum)
  task5FileName: string;
  task5WebHash: string;
  task5LocalHash: string;
  task5HashesMatch: string;

  // Úloha 6: explorer.exe v CLI
  task6ExplorerPid: string;
  task6ExplorerMemory: string;
  task6ExplorerCmd: string;

  // Úloha 7: Procesy nad 100 MB v CLI
  task7MemCmd: string;
  task7TopProcess: string;
  task7TopMemValue: string;

  // Úloha 8: Odposlech v resmon.exe
  task8NetworkProcess: string;
  task8RemoteIp: string;
  task8RemotePort: string;
  task8IpOwner: string;
  task8IsLegitimate: string;

  // Úloha 9: VirusTotal.com cloudová reputace souboru
  task9FileName: string;
  task9VtScore: string;
  task9VtVerdict: string;

  // Úloha 10: Sysinternals Process Explorer & VirusTotal živá analýza
  task10MspaintPid: string;
  task10MspaintSigner: string;
  task10MspaintVtScore: string;
  task10SecondProcessName: string;
  task10SecondProcessSigner: string;
  task10SecondProcessVtScore: string;

  // Úloha 11* (Pokročilé): Systémové služby pod svchost.exe
  task11SvcCmd: string;
  task11SvchostPid: string;
  task11SvcNames: string;
  task11SvcWhyAbused: string;

  // Úloha 12** (Expertní výzva): Vlastní nepodepsaný program
  task12ExpertSignerResult: string;
  task12ExpertSmartScreenReason: string;
}
