'use client';

import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  FileCode, 
  MousePointerClick, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowDown, 
  Fingerprint, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Zap,
  Play,
  FileCheck,
  Shield,
  Activity
} from 'lucide-react';
import { ProcessItem, PROCESS_TREE_DATA, ORIGINAL_AUTHENTICODE_TEXT } from './processTypes';

interface FileToLaunch {
  id: string;
  name: string;
  type: string;
  size: string;
  signedBy: string;
  description: string;
  isSignedValid: boolean;
  isReputationGood: boolean;
  isClean: boolean;
  failPhase?: 1 | 2 | 3;
  failReason?: string;
}

const FILES_TO_LAUNCH: FileToLaunch[] = [
  {
    id: 'calc',
    name: 'kalkulacka.exe',
    type: 'Spustitelná aplikace',
    size: '1 420 KB',
    signedBy: 'Microsoft Windows Publisher',
    description: 'Oficiální kalkulačka od Microsoftu s platným podpisem.',
    isSignedValid: true,
    isReputationGood: true,
    isClean: true
  },
  {
    id: 'patcher',
    name: 'patch_hra_crack.exe',
    type: 'Spustitelná aplikace',
    size: '890 KB',
    signedBy: 'Nepodepsáno (Chybí pečeť)',
    description: 'Aktivátor stažený z neznámého fóra bez ověřeného autora.',
    isSignedValid: false,
    isReputationGood: false,
    isClean: false,
    failPhase: 1,
    failReason: 'Lokální kontrola selhala: Soubor nemá platnou pečeť Authenticode.'
  },
    {
    id: 'miner',
    name: 'system_optimizer.exe',
    type: 'Spustitelná aplikace',
    size: '2 100 KB',
    signedBy: 'Neznámý vydavatel',
    description: 'Podepsáno neznámým certifikátem, cloudová služba hlásí nulovou reputaci.',
    isSignedValid: true,
    isReputationGood: false,
    isClean: false,
    failPhase: 2,
    failReason: 'Cloudový filtr (SmartScreen) soubor zablokoval kvůli nulové reputaci.'
  },
  {
    id: 'infected',
    name: 'infected_media_player.exe',
    type: 'Spustitelná aplikace',
    size: '14 800 KB',
    signedBy: 'Certifikát platný (nebo ukradený CA)',
    description: 'Aplikace prošla kontrolou podpisu i reputací, ale uvnitř obsahuje známý škodlivý kód (Trojan.Win32).',
    isSignedValid: true,
    isReputationGood: true,
    isClean: false,
    failPhase: 3,
    failReason: 'Antivirový štít (Microsoft Defender) detekoval známý virus (Trojan.Win32.Injector) a soubor přesunul do karantény.'
  }
];

export default function ProcessSimulatorsTab() {
  // Stav pro Simulátor spuštění souboru (Průzkumník -> Fáze 1, 2, 3)
  const [selectedFileId, setSelectedFileId] = useState<string>('calc');
  const [executionPhase, setExecutionPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);

  // Stav pro Process Explorer simulátor
  const [selectedProcess, setSelectedProcess] = useState<ProcessItem>(PROCESS_TREE_DATA[1]);
  const [processFilter, setProcessFilter] = useState<'all' | 'malicious' | 'services'>('all');

  // Stav pro textový editor & Authenticode simulátor
  const [editorText, setEditorText] = useState<string>(ORIGINAL_AUTHENTICODE_TEXT);
  const [originalHash, setOriginalHash] = useState<string>('');
  const [currentHash, setCurrentHash] = useState<string>('');
  const [isComputingHash, setIsComputingHash] = useState<boolean>(false);

  // Inicializace výchozího hashe
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

  // Živý výpočet SHA-256 hashe
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

  // Efekt automatického krokování fází 1 -> 2 -> 3
  useEffect(() => {
    if (!isAutoRunning) return;

    const activeFile = FILES_TO_LAUNCH.find(f => f.id === selectedFileId) || FILES_TO_LAUNCH[0];

    if (executionPhase === 1) {
      const timer = setTimeout(() => {
        if (activeFile.failPhase === 1) {
          setIsAutoRunning(false);
        } else {
          setExecutionPhase(2);
        }
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (executionPhase === 2) {
      const timer = setTimeout(() => {
        if (activeFile.failPhase === 2) {
          setIsAutoRunning(false);
        } else {
          setExecutionPhase(3);
        }
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (executionPhase === 3) {
      const timer = setTimeout(() => {
        if (activeFile.failPhase === 3) {
          setIsAutoRunning(false);
        } else {
          setExecutionPhase(4); // Úspěšně v RAM
          setIsAutoRunning(false);
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [executionPhase, isAutoRunning, selectedFileId]);

  const handleLaunchFile = (fileId: string) => {
    setSelectedFileId(fileId);
    setExecutionPhase(1);
    setIsAutoRunning(true);
  };

  const handleResetLaunch = () => {
    setExecutionPhase(0);
    setIsAutoRunning(false);
  };

  const activeFile = FILES_TO_LAUNCH.find(f => f.id === selectedFileId) || FILES_TO_LAUNCH[0];

  const filteredProcesses = PROCESS_TREE_DATA.filter(p => {
    if (processFilter === 'malicious') return p.isMalicious;
    if (processFilter === 'services') return p.typeColor === 'service';
    return true;
  });

  const isSignatureValid = originalHash !== '' && currentHash === originalHash;
  const textLineCount = editorText.split('\n').length;
  const textCharCount = editorText.length;
  const textByteSize = new TextEncoder().encode(editorText).length;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* =========================================================================
          NOVÝ SIMULÁTOR 1: SPOUŠTĚNÍ SOUBORU Z PRŮZKUMNÍKA & 3 FÁZE PROVĚRKY
          ========================================================================= */}
      <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">
                1. Simulátor: Co se děje v systému při spuštění souboru (Dvojklik)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Dvakrát klikněte na soubor v Průzkumníku a sledujte, jak Windows postupně prověřuje Fázi 1, 2 a 3.
              </p>
            </div>
          </div>

          {executionPhase > 0 && (
            <button
              type="button"
              onClick={handleResetLaunch}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 self-start sm:self-auto shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              Resetovat spuštění
            </button>
          )}
        </div>

        {/* 2 PANELY VEDLE SEBE: PRŮZKUMNÍK SOUBORŮ (VLEVO) + TŘÍFÁZOVÝ FILTR (VPRAVO) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEVÝ PANEL: OKNO PRŮZKUMNÍKA SOUBORŮ (EXPLORER.EXE) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-slate-200 shadow-md overflow-hidden flex flex-col">
            
            {/* Záhlaví okna Průzkumníka */}
            <div className="bg-slate-100 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 min-w-0">
                <Folder className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span className="font-mono text-xs font-bold text-slate-700 truncate">
                  C:\Users\Student\Downloads
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 pl-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              </div>
            </div>

            {/* Instrukční pruh */}
            <div className="p-2.5 bg-blue-50/70 border-b border-blue-100 text-[11px] text-blue-900 font-medium flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Dvojklikem spusťte soubor nebo vyberte tlačítkem „Spustit“:</span>
            </div>

            {/* Seznam souborů ke spuštění */}
            <div className="divide-y divide-slate-100">
              {FILES_TO_LAUNCH.map(file => {
                const isSelected = selectedFileId === file.id;

                return (
                  <div
                    key={file.id}
                    onDoubleClick={() => handleLaunchFile(file.id)}
                    onClick={() => {
                      setSelectedFileId(file.id);
                      if (executionPhase === 0) setExecutionPhase(0);
                    }}
                    className={`p-3 transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                      isSelected ? 'bg-blue-50/80 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`p-2 rounded-xl shrink-0 ${
                        file.id === 'calc' 
                          ? 'bg-blue-100 text-blue-700' 
                          : file.id === 'patcher' ? 'bg-rose-100 text-rose-700' : file.id === 'infected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        <FileCode className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-xs font-bold text-slate-800 truncate flex items-center gap-1.5">
                          {file.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {file.size} • {file.signedBy}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunchFile(file.id);
                      }}
                      className={`px-2.5 py-1.5 rounded-xl font-bold text-[10px] flex items-center gap-1 shrink-0 transition-all cursor-pointer uppercase tracking-wider ${
                        isSelected && executionPhase > 0
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Spustit
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Popis vybraného souboru dole */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block text-[10px] uppercase tracking-wider">
                Popis zkoumaného programu:
              </span>
              <p>{activeFile.description}</p>
            </div>

          </div>

          {/* PRAVÝ PANEL: TŘÍFÁZOVÝ BEZPEČNOSTNÍ FILTR S DYNAMICKÝM STAVEM */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Hlavní stavový řádek */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  executionPhase === 0 
                    ? 'bg-slate-500' 
                    : executionPhase === 4 
                      ? 'bg-emerald-400 animate-pulse' 
                      : activeFile.failPhase && executionPhase >= activeFile.failPhase 
                        ? 'bg-rose-500 animate-ping' 
                        : 'bg-blue-400 animate-pulse'
                }`} />
                <span className="font-mono text-slate-300">
                  {executionPhase === 0 && 'Čekání na spuštění souboru (Dvojklik vlevo)...'}
                  {executionPhase === 1 && `Fáze 1: CPU počítá hash a ověřuje pečeť ${activeFile.name}...`}
                  {executionPhase === 2 && `Fáze 2: Dotaz do cloudu na reputaci souboru...`}
                  {executionPhase === 3 && `Fáze 3: Antivirový štít provádí sken kódu v reálném čase...`}
                  {executionPhase === 4 && `🚀 Hotovo: V paměti RAM byl vytvořen běžící proces!`}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                {executionPhase === 0 ? 'Připraveno' : `Fáze ${executionPhase}/3`}
              </span>
            </div>

            {/* 3 FÁZE V ŘADĚ S DYNAMICKÝMI RÁMEČKY A ŠIPKAMI */}
            <div className="space-y-3">
              
              {/* FÁZE 1 */}
              <div className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                executionPhase < 1 
                  ? 'bg-slate-50/60 border-slate-200 opacity-60' 
                  : executionPhase === 1 && activeFile.failPhase === 1 
                    ? 'bg-rose-50 border-rose-400 shadow-sm' 
                    : executionPhase >= 1 && activeFile.isSignedValid 
                      ? 'bg-emerald-50/70 border-emerald-400 shadow-xs' 
                      : 'bg-blue-50/80 border-blue-400 shadow-sm'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-black text-slate-900">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <Fingerprint className="w-4 h-4 text-blue-600" />
                    <span>Lokální kontrola integrity &amp; podpisu (Offline CPU)</span>
                  </div>
                  {executionPhase >= 1 && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                      activeFile.failPhase === 1 ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900'
                    }`}>
                      {activeFile.failPhase === 1 ? 'Chyba podpisu ✕' : 'Pečeť platí ✓'}
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Procesor spočte kontrolní otisk kódu a ověří digitální podpis na konci souboru.
                </p>
                {executionPhase >= 1 && activeFile.failPhase === 1 && (
                  <div className="p-2 bg-rose-100 rounded-xl text-rose-900 font-bold text-[11px]">
                    ⛔ <strong>Zastaveno:</strong> {activeFile.failReason}
                  </div>
                )}
              </div>

              {/* Šipka 1 -> 2 */}
              <div className="flex justify-center text-slate-300">
                <ArrowDown className={`w-4 h-4 ${executionPhase >= 1 && !activeFile.failPhase ? 'text-indigo-500 animate-pulse' : 'text-slate-300'}`} />
              </div>

              {/* FÁZE 2 */}
              <div className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                executionPhase < 2 
                  ? 'bg-slate-50/60 border-slate-200 opacity-60' 
                  : executionPhase === 2 && activeFile.failPhase === 2 
                    ? 'bg-rose-50 border-rose-400 shadow-sm' 
                    : executionPhase >= 2 && activeFile.isReputationGood 
                      ? 'bg-emerald-50/70 border-emerald-400 shadow-xs' 
                      : 'bg-indigo-50/80 border-indigo-400 shadow-sm'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-black text-slate-900">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                      2
                    </span>
                    <ShieldAlert className="w-4 h-4 text-indigo-600" />
                    <span>Cloudová prověrka reputace (SmartScreen)</span>
                  </div>
                  {executionPhase >= 2 && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                      activeFile.failPhase === 2 ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900'
                    }`}>
                      {activeFile.failPhase === 2 ? 'Špatná reputace ✕' : 'Důvěryhodné ✓'}
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Systém se dotáže cloudové reputační sítě na známý výskyt souboru mezi uživateli.
                </p>
                {executionPhase >= 2 && activeFile.failPhase === 2 && (
                  <div className="p-2 bg-rose-100 rounded-xl text-rose-900 font-bold text-[11px]">
                    ⛔ <strong>Zastaveno:</strong> {activeFile.failReason}
                  </div>
                )}
              </div>

              {/* Šipka 2 -> 3 */}
              <div className="flex justify-center text-slate-300">
                <ArrowDown className={`w-4 h-4 ${executionPhase >= 2 && !activeFile.failPhase ? 'text-emerald-500 animate-pulse' : 'text-slate-300'}`} />
              </div>

              {/* FÁZE 3 */}
              <div className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                executionPhase < 3 
                  ? 'bg-slate-50/60 border-slate-200 opacity-60' 
                  : executionPhase === 3 && activeFile.failPhase === 3 
                    ? 'bg-rose-50 border-rose-400 shadow-sm' 
                    : executionPhase >= 3 && activeFile.isClean 
                      ? 'bg-emerald-50/70 border-emerald-400 shadow-xs' 
                      : 'bg-emerald-50/80 border-emerald-400 shadow-sm'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-black text-slate-900">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                      3
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Antivirový štít (Sken signatur v reálném čase)</span>
                  </div>
                  {executionPhase >= 3 && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                      activeFile.failPhase === 3 ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900'
                    }`}>
                      {activeFile.failPhase === 3 ? 'Detekován malware ✕' : 'Kód čistý ✓'}
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Antivirus zkontroluje kód souboru proti databázi známých vzorců škodlivého kódu.
                </p>
                {executionPhase >= 3 && activeFile.failPhase === 3 && (
                  <div className="p-2 bg-rose-100 rounded-xl text-rose-900 font-bold text-[11px]">
                    ⛔ <strong>Zastaveno:</strong> {activeFile.failReason}
                  </div>
                )}
              </div>

            </div>

            {/* ZÁVĚREČNÝ VÝSLEDEK (PO PŘEKONÁNÍ VŠECH 3 FÁZÍ) */}
            {executionPhase === 4 && (
              <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-lg space-y-2 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                    ÚSPĚŠNÉ SPUŠTĚNÍ: PROCES BĚŽÍ V PAMĚTI RAM!
                  </span>
                  <span className="font-mono text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
                    PID: 4892
                  </span>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Soubor prošel všemi 3 filtry. Zavaděč OS alokoval paměť v RAM, vystavil identifikační číslo PID a procesor začal vykonávat instrukce programu.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* =========================================================================
          SIMULÁTOR 2: TEXTOVÝ EDITOR & KONTROLA DIGITÁLNÍ PEČETI
          ========================================================================= */}
      <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">
                2. Simulátor: Co se stane, když útočník modifikuje podepsaný soubor?
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Zkoušejte psát přímo do textového editoru. Systém okamžitě reaguje a ukazuje stav digitální pečeti.
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

            {/* Živý otisk spočtený procesorem přímo pod souborem */}
            <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 text-[11px] font-mono space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
                  Aktuální otisk obsahu souboru (počítá CPU):
                </span>
                <span className={`font-bold ${isSignatureValid ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
                  {isSignatureValid ? '✓ Odpovídá pečeti' : '✕ ROZBITÝ OTISK (KÓD ZMĚNĚN)'}
                </span>
              </div>
              <div className={`p-2 rounded-lg border text-xs break-all transition-all ${
                isSignatureValid 
                  ? 'bg-slate-900 border-slate-700 text-slate-300' 
                  : 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold shadow-xs'
              }`}>
                {currentHash || 'Načítám otisk...'}
              </div>
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

          {/* PRAVÝ SLOUPEC: JEDINÁ PŘEHLEDNÁ KARTA DIGITÁLNÍ PEČETI (CERTIFIKÁT AUTORA) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Stav podpisu v systému */}
            {isSignatureValid ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                  <div className="flex items-center gap-2 font-black text-sm text-emerald-900">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    DIGITÁLNÍ PEČEŤ (CERTIFIKÁT)
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 text-[10px] font-black uppercase">
                    Platný podpis ✓
                  </span>
                </div>

                {/* Vizuální digitální pečeť s autorem a otiskem */}
                <div className="p-3 bg-white/95 rounded-xl border border-emerald-300 text-xs space-y-2.5 font-sans">
                  <div>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">
                      Autor a vydavatel pečeti:
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-emerald-900 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Microsoft Windows Publisher</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-2">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">
                      Otisk souboru v pečeti autora (SHA-256):
                    </span>
                    <div className="mt-1 font-mono text-[11px] bg-emerald-50/70 p-2 rounded-lg border border-emerald-200 text-emerald-800 break-all select-all font-bold">
                      {originalHash || 'Načítám...'}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-900 font-bold flex items-center justify-between pt-0.5">
                  <span>Kontrola Windows:</span>
                  <span className="text-emerald-700 font-mono">NEPORUŠENO ✅ Spuštění OK</span>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-400 text-rose-950 space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                  <div className="flex items-center gap-2 font-black text-sm text-rose-900">
                    <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 animate-pulse" />
                    DIGITÁLNÍ PEČEŤ (CERTIFIKÁT)
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-900 text-[10px] font-black uppercase">
                    Pečeť rozbita ✕
                  </span>
                </div>

                {/* Vizuální digitální pečeť s autorem a neplatným otiskem */}
                <div className="p-3 bg-white/95 rounded-xl border border-rose-300 text-xs space-y-2.5 font-sans">
                  <div>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">
                      Původní autor pečeti:
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-rose-900 font-bold text-xs">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Microsoft Windows Publisher <span className="text-rose-600 font-normal">(Podpis neplatí!)</span></span>
                    </div>
                  </div>

                  <div className="border-t border-rose-100 pt-2">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">
                      Původní otisk uzamčený v pečeti:
                    </span>
                    <div className="mt-1 font-mono text-[11px] bg-rose-50/70 p-2 rounded-lg border border-rose-200 text-rose-800 break-all select-all font-bold line-through opacity-70">
                      {originalHash || 'Načítám...'}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-rose-900 font-bold flex items-center justify-between pt-0.5">
                  <span>Kontrola Windows:</span>
                  <span className="text-rose-700 font-mono">ROZBITO ❌ ZABLOKOVÁNO</span>
                </div>
              </div>
            )}

            {/* Stručná didaktická pointa dole */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Proč útočník pečeť neobnoví?
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                K vytvoření platné pečeti Microsoftu je nutný tajný <strong>privátní klíč</strong>. Útočník může kód upravit, ale nedokáže k němu vytvořit pravou pečeť.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          SIMULÁTOR 3: INTERAKTIVNÍ PROCESS EXPLORER
          ========================================================================= */}
      <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Activity className="w-6 h-6 text-indigo-600" />
              3. Simulátor: Sysinternals Process Explorer
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Klikněte na proces v seznamu a analyzujte jeho rodiče, digitální podpis, VirusTotal skóre a síťové spojení.
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

    </div>
  );
}
