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
  taskSeznamIp?: string;
  taskSeznamOwner?: string;
  taskSeznamAiPrompt?: string;
  taskSeznamIdentifiedWebs?: string;
  taskSeznamReflection?: string;
  task5BulkMethod?: string;
  task5SuspiciousReflection?: string;
  task5Process?: string;
  task5RemoteIp?: string;
  task5RemotePort?: string;
  task5IpType?: string;
  task6VlcSigner?: string;
  task6VlcScore?: string;
  task6PySigner?: string;
  task6PyScore?: string;
  task6ExplorerSigner?: string;
  task6SvchostScore?: string;
  task6PinkMeaning?: string;
  task6PurpleMeaning?: string;
  task6BonusApp?: string;
  task7Hash: string;
  task7VtScore: string;
  task8SacStatus: string;
  task8SacReason: string;
  taskCertProgram?: string;
  taskCertSubject?: string;
  taskCertIssuer?: string;
  taskCertValidity?: string;
  taskCertAlgorithm?: string;
  taskCertChainStatus?: string;
  qVirusWorm: string;
  qRunAsAdmin: string;
}
