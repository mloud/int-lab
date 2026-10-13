'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Search, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Edit3, 
  Minimize2, 
  Square as SquareIcon, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  FileCode,
  Shield,
  Zap,
  FileCheck,
  Fingerprint,
  ShieldAlert
} from 'lucide-react';
import { ProcessItem, PROCESS_TREE_DATA, ORIGINAL_AUTHENTICODE_TEXT } from './processTypes';

export default function ProcessSimulatorsTab() {
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

  const filteredProcesses = PROCESS_TREE_DATA.filter(p => {
    if (processFilter === 'malicious') return p.isMalicious;
    if (processFilter === 'services') return p.typeColor === 'service';
    return true;
  });

  return (
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
  );
}
