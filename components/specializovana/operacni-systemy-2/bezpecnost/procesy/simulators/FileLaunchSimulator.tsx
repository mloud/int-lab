'use client';
import React, { useState, useEffect } from 'react';
import {
  Folder, FileCode, MousePointerClick, RotateCcw, CheckCircle2,
  XCircle, ArrowRight, ArrowDown, Fingerprint, ShieldAlert,
  ShieldCheck, Sparkles, Cpu, Zap, Play, FileCheck, Shield, Activity
} from 'lucide-react';

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

export const FileLaunchSimulator: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>('calc');
  const [executionPhase, setExecutionPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);

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

  return (
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
  );
};
