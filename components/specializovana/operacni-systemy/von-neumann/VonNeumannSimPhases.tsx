"use client";

import React, { useState } from 'react';
import { Cpu, MemoryStick, LogIn, LogOut, Play, RotateCcw, CheckCircle2, Calculator, Settings, AlertTriangle } from 'lucide-react';
import { STEPS, SIMPLE_STEPS } from './VonNeumannData';

export const VonNeumannSimPhases: React.FC<{ phase: 'simple-sim' | 'simulator' }> = ({ phase }) => {
  const [sStepIdx, setSStepIdx] = useState(0);
  const [isSAnimating, setIsSAnimating] = useState(false);
  const currentSStep = SIMPLE_STEPS[sStepIdx];
  const isSDone = sStepIdx === SIMPLE_STEPS.length - 1;
  const activeSArrow = isSAnimating ? currentSStep.activeArrow : 'none';

  // Advanced Simulator state
  const [stepIdx, setStepIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentStep = STEPS[stepIdx];
  const isDone = stepIdx === STEPS.length - 1;
  const activeArrow = isAnimating ? currentStep.activeArrow : 'none';

  const handleSNext = () => {
    if (isSDone || isSAnimating) return;
    setSStepIdx(s => s + 1);
    setIsSAnimating(true);
    setTimeout(() => {
      setIsSAnimating(false);
    }, 1500);
  };

  const handleNext = () => {
    if (isDone || isAnimating) return;
    setStepIdx(s => s + 1);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  const handleReset = () => {
    setStepIdx(0);
    setIsAnimating(false);
    setSStepIdx(0);
    setIsSAnimating(false);
  };

  return (
    <>
      {phase === 'simple-sim' && (
        <>
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-100 mb-6 z-20">
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-black text-indigo-800 uppercase text-sm tracking-widest">{currentSStep.title}</h3>
              <p className="text-indigo-900 font-medium">{currentSStep.msg}</p>
            </div>
          </div>

          {/* Simple Simulator Canvas */}
          <div className="relative w-full h-[650px] md:h-[550px] bg-slate-50 border-4 border-slate-200 rounded-3xl p-8 overflow-hidden">
            
            <button
              onClick={handleSNext}
              disabled={isSDone || isSAnimating}
              className="absolute top-6 right-6 z-30 flex-shrink-0 flex items-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-lg border-2 border-indigo-400"
            >
              {isSDone ? 'Dokončeno' : isSAnimating ? 'Pracuji...' : 'Další krok'} <Play className="w-5 h-5" />
            </button>

            {/* SVG Šipky (Sběrnice) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
              {/* Šipka Input -> MEM */}
              <g className={`transition-all duration-500 ${activeSArrow === 'in-mem' ? 'opacity-100' : 'opacity-20'}`}>
                <line x1="21%" y1="70%" x2="29%" y2="70%" stroke="#4f46e5" strokeWidth="6" strokeDasharray="8 8" className={activeSArrow === 'in-mem' ? 'animate-[dash_1s_linear_infinite]' : ''} />
                <polygon points="29%,70% 27%,68% 27%,72%" fill="#4f46e5" />
                {activeSArrow === 'in-mem' && (
                  <text x="25%" y="67%" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle">{currentSStep.arrowText}</text>
                )}
              </g>

              {/* Šipka CPU -> Output */}
              <g className={`transition-all duration-500 ${activeSArrow === 'cpu-out' || activeSArrow === 'cpu-mem-read-data-out' ? 'opacity-100' : 'opacity-20'}`}>
                <line x1="71%" y1="70%" x2="79%" y2="70%" stroke="#e11d48" strokeWidth="6" strokeDasharray="8 8" className={activeSArrow === 'cpu-out' || activeSArrow === 'cpu-mem-read-data-out' ? 'animate-[dash_1s_linear_infinite]' : ''} />
                <polygon points="79%,70% 77%,68% 77%,72%" fill="#e11d48" />
                {(activeSArrow === 'cpu-out' || activeSArrow === 'cpu-mem-read-data-out') && (
                  <text x="75%" y="67%" fill="#e11d48" fontSize="11" fontWeight="bold" textAnchor="middle">Odesílám: 12</text>
                )}
              </g>

              {/* Write CPU -> MEM (Data) */}
              <g className={`transition-all duration-500 ${activeSArrow === 'cpu-mem-write' ? 'opacity-100' : 'opacity-20'}`}>
                <line x1="56%" y1="50%" x2="56%" y2="30%" stroke="#16a34a" strokeWidth="6" strokeDasharray="8 8" className={activeSArrow === 'cpu-mem-write' ? 'animate-[dash_1s_linear_infinite]' : ''} />
                <polygon points="56%,30% 54%,33% 58%,33%" fill="#16a34a" />
                {activeSArrow === 'cpu-mem-write' && (
                  <text x="58%" y="40%" fill="#16a34a" fontSize="14" fontWeight="bold" textAnchor="start">{currentSStep.arrowText}</text>
                )}
              </g>

              {/* Read MEM (Data) -> CPU */}
              <g className={`transition-all duration-500 ${activeSArrow === 'cpu-mem-read-data' || activeSArrow === 'cpu-mem-read-data-out' ? 'opacity-100' : 'opacity-20'}`}>
                <line x1="53%" y1="30%" x2="53%" y2="50%" stroke="#0284c7" strokeWidth="6" strokeDasharray="8 8" className={activeSArrow === 'cpu-mem-read-data' || activeSArrow === 'cpu-mem-read-data-out' ? 'animate-[dash_1s_linear_infinite]' : ''} />
                <polygon points="53%,50% 51%,47% 55%,47%" fill="#0284c7" />
                {(activeSArrow === 'cpu-mem-read-data' || activeSArrow === 'cpu-mem-read-data-out') && (
                  <text x="51%" y="40%" fill="#0284c7" fontSize="14" fontWeight="bold" textAnchor="end">Čtu data: 12</text>
                )}
              </g>

              {/* Read MEM (Prog) -> CPU */}
              <g className={`transition-all duration-500 ${activeSArrow === 'cpu-mem-read' ? 'opacity-100' : 'opacity-20'}`}>
                <line x1="43%" y1="30%" x2="43%" y2="50%" stroke="#0284c7" strokeWidth="6" strokeDasharray="8 8" className={activeSArrow === 'cpu-mem-read' ? 'animate-[dash_1s_linear_infinite]' : ''} />
                <polygon points="43%,50% 41%,47% 45%,47%" fill="#0284c7" />
                {activeSArrow === 'cpu-mem-read' && (
                  <text x="41%" y="40%" fill="#0284c7" fontSize="14" fontWeight="bold" textAnchor="end">{currentSStep.arrowText}</text>
                )}
              </g>
            </svg>

            <style>{`
              @keyframes dash {
                to { stroke-dashoffset: -16; }
              }
              @keyframes dash-reverse {
                to { stroke-dashoffset: 16; }
              }
            `}</style>

            {/* --- Zjednodušené Komponenty --- */}
            
            {/* Zjednodušená Paměť */}
            <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[80%] md:w-[65%] lg:w-[45%] bg-blue-50 border-4 border-blue-200 rounded-3xl p-4 shadow-xl z-20 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-3 bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100">
                <MemoryStick className="w-5 h-5 text-blue-600" />
                <span className="font-black text-blue-800 uppercase tracking-widest text-sm">Paměť (RAM)</span>
              </div>
              
              <div className="w-full flex gap-4 text-xs lg:text-sm">
                {/* Sekce Programu */}
                <div className="flex-1 bg-white rounded-xl border-2 border-blue-100 p-3 flex flex-col shadow-inner min-h-[120px]">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b pb-1">Sekce: Program</span>
                   {currentSStep.memProg.length === 0 ? (
                     <div className="flex items-center justify-center h-full text-slate-300 font-bold italic">Prázdná</div>
                   ) : (
                     <div className="flex flex-col gap-1 font-mono">
                       {currentSStep.memProg.map((line, idx) => (
                         <div key={idx} className={`px-2 py-1 rounded transition-colors ${currentSStep.activeProgLine === idx ? 'bg-yellow-200 text-yellow-900 font-bold shadow-sm' : 'text-slate-600'}`}>
                           {line}
                         </div>
                       ))}
                     </div>
                   )}
                </div>

                {/* Sekce Dat */}
                <div className="flex-1 bg-white rounded-xl border-2 border-blue-100 p-3 flex flex-col shadow-inner min-h-[120px]">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b pb-1">Sekce: Data</span>
                   {currentSStep.memData.length === 0 ? (
                     <div className="flex items-center justify-center h-full text-slate-300 font-bold italic">Prázdná</div>
                   ) : (
                     <div className="flex flex-col gap-1 font-mono font-bold text-blue-700">
                       {currentSStep.memData.map((d, idx) => (
                         <div key={idx} className="animate-in fade-in slide-in-from-left-2 px-2 py-1 bg-blue-50 rounded border border-blue-100">{d}</div>
                       ))}
                     </div>
                   )}
                </div>
              </div>
            </div>

            {/* Vstup */}
            <div className="absolute bottom-[20%] left-0 w-[20%] bg-green-50 border-4 border-green-200 rounded-3xl p-2 sm:p-4 shadow-xl z-20 flex flex-col items-center">
              <div className="flex flex-col items-center gap-1 mb-4 bg-white px-3 py-2 rounded-xl shadow-sm border border-green-100 w-full text-center">
                <LogIn className="w-6 h-6 text-green-600" />
                <span className="font-black text-green-800 uppercase tracking-widest text-[10px] md:text-xs">Vstup</span>
              </div>
              <div className="flex flex-col gap-1 w-full items-start">
                 {currentSStep.inData.length === 0 && <span className="text-slate-400 text-xs italic mx-auto">Odesláno</span>}
                 {currentSStep.inData.map((d, i) => (
                    <div key={i} className="bg-green-600 text-white font-mono font-bold py-1 px-2 rounded shadow-sm text-[10px] md:text-xs w-full text-left truncate">{d}</div>
                 ))}
              </div>
            </div>

            {/* Zjednodušený CPU */}
            <div className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[50%] md:w-[40%] bg-slate-100 border-4 ${activeSArrow === 'cpu-internal' ? 'border-yellow-400 shadow-yellow-200 shadow-2xl' : 'border-slate-300 shadow-xl'} rounded-3xl p-6 z-20 flex flex-col items-center transition-all duration-500`}>
              <div className="flex items-center gap-2 mb-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 w-full justify-center relative overflow-hidden">
                 {activeSArrow === 'cpu-internal' && <div className="absolute inset-0 bg-yellow-100 opacity-50 animate-pulse"></div>}
                <Cpu className="w-8 h-8 text-slate-700 relative z-10" />
                <span className="font-black text-slate-800 uppercase tracking-widest text-sm relative z-10">Procesor (CPU)</span>
              </div>
              <div className="w-full bg-white rounded-xl border-2 border-slate-200 p-4 flex flex-col items-center justify-center min-h-[90px]">
                 <span className={`font-mono font-bold text-sm text-center whitespace-pre-line ${currentSStep.cpuData === 'Čeká...' ? 'text-slate-400' : 'text-purple-700'}`}>
                   {currentSStep.cpuData}
                 </span>
              </div>
            </div>

            {/* Výstup */}
            <div className="absolute bottom-[20%] right-0 w-[20%] bg-orange-50 border-4 border-orange-200 rounded-3xl p-2 sm:p-4 shadow-xl z-20 flex flex-col items-center">
              <div className="flex flex-col items-center gap-1 mb-4 bg-white px-3 py-2 rounded-xl shadow-sm border border-orange-100 w-full text-center">
                <LogOut className="w-6 h-6 text-orange-600" />
                <span className="font-black text-orange-800 uppercase tracking-widest text-[10px] md:text-xs">Výstup</span>
              </div>
              <div className="flex flex-col gap-2 w-full items-center">
                 {currentSStep.outData.length === 0 && <span className="text-slate-400 text-xs italic">Čeká se...</span>}
                 {currentSStep.outData.map((d, i) => (
                    <div key={i} className="bg-orange-600 text-white font-black py-2 px-4 rounded shadow-md animate-in zoom-in w-full text-center">{d}</div>
                 ))}
              </div>
            </div>

          </div>
        </>
      )}

      {phase === 'simulator' && (
        <>
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-100 mb-6 z-20">
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-black text-indigo-800 uppercase text-sm tracking-widest">{currentStep.title}</h3>
              <p className="text-indigo-900 font-medium">{currentStep.msg}</p>
            </div>
          </div>

      {/* Simulator Canvas */}
      <div className="relative w-full h-[750px] md:h-[650px] bg-slate-50 border-4 border-slate-200 rounded-3xl p-8 overflow-hidden">
        
        {/* Tlačítko Další Krok přímo ve schématu */}
        <button
          onClick={handleNext}
          disabled={isDone || isAnimating}
          className="absolute top-6 right-6 z-30 flex-shrink-0 flex items-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-lg border-2 border-indigo-400"
        >
          {isDone ? 'Dokončeno' : isAnimating ? 'Pracuji...' : 'Další krok'} <Play className="w-5 h-5" />
        </button>

        {/* SVG Šipky (Sběrnice) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
          {/* Šipka Input -> CPU */}
          <g className={`transition-all duration-500 ${activeArrow === 'in-cpu' || activeArrow === 'in-mem' ? 'opacity-100' : 'opacity-20'}`}>
            <line x1="21%" y1="70%" x2="29%" y2="70%" stroke="#4f46e5" strokeWidth="6" strokeDasharray="8 8" className={activeArrow === 'in-cpu' || activeArrow === 'in-mem' ? 'animate-[dash_1s_linear_infinite]' : ''} />
            <polygon points="29%,70% 27%,68% 27%,72%" fill="#4f46e5" />
            {(activeArrow === 'in-cpu' || activeArrow === 'in-mem') && (
              <text x="25%" y="67%" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle">{currentStep.arrowText}</text>
            )}
          </g>

          {/* Šipka CPU -> Output */}
          <g className={`transition-all duration-500 ${activeArrow === 'cpu-out' ? 'opacity-100' : 'opacity-20'}`}>
            <line x1="71%" y1="70%" x2="79%" y2="70%" stroke="#e11d48" strokeWidth="6" strokeDasharray="8 8" className={activeArrow === 'cpu-out' ? 'animate-[dash_1s_linear_infinite]' : ''} />
            <polygon points="79%,70% 77%,68% 77%,72%" fill="#e11d48" />
            {activeArrow === 'cpu-out' && (
              <text x="75%" y="67%" fill="#e11d48" fontSize="11" fontWeight="bold" textAnchor="middle">{currentStep.arrowText}</text>
            )}
          </g>

          {/* Write CPU -> MEM */}
          <g className={`transition-all duration-500 ${activeArrow === 'cpu-mem-write' ? 'opacity-100' : 'opacity-20'}`}>
            <line x1="53%" y1="50%" x2="53%" y2="30%" stroke="#16a34a" strokeWidth="6" strokeDasharray="8 8" className={activeArrow === 'cpu-mem-write' ? 'animate-[dash-reverse_1s_linear_infinite]' : ''} />
            <polygon points="53%,30% 51%,33% 55%,33%" fill="#16a34a" />
            {activeArrow === 'cpu-mem-write' && (
              <text x="56%" y="40%" fill="#16a34a" fontSize="14" fontWeight="bold" textAnchor="start">{currentStep.arrowText}</text>
            )}
          </g>

          {/* Read MEM -> CPU */}
          <g className={`transition-all duration-500 ${activeArrow === 'cpu-mem-read' ? 'opacity-100' : 'opacity-20'}`}>
            <line x1="47%" y1="30%" x2="47%" y2="50%" stroke="#0284c7" strokeWidth="6" strokeDasharray="8 8" className={activeArrow === 'cpu-mem-read' ? 'animate-[dash_1s_linear_infinite]' : ''} />
            <polygon points="47%,50% 45%,47% 49%,47%" fill="#0284c7" />
            {activeArrow === 'cpu-mem-read' && (
              <text x="44%" y="40%" fill="#0284c7" fontSize="14" fontWeight="bold" textAnchor="end">{currentStep.arrowText}</text>
            )}
          </g>

        </svg>

        <style>{`
          @keyframes dash {
            to { stroke-dashoffset: -16; }
          }
          @keyframes dash-reverse {
            to { stroke-dashoffset: 16; }
          }
        `}</style>

        {/* --- Komponenty Architektury --- */}
        
        {/* Paměť (Top Center) */}
        <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] lg:w-[50%] bg-blue-50 border-4 border-blue-200 rounded-3xl p-4 shadow-xl z-20 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2 bg-white px-4 py-1 rounded-full shadow-sm border border-blue-100">
            <MemoryStick className="w-5 h-5 text-blue-600" />
            <span className="font-black text-blue-800 uppercase tracking-widest text-sm">Společná paměť RAM</span>
          </div>
          <div className="w-full bg-white rounded-xl border border-blue-100 p-2 text-xs flex gap-4 overflow-hidden min-h-[140px]">
             {/* Instrukce */}
             <div className="flex-1 overflow-y-auto pr-2 border-r border-slate-100">
                <div className="font-bold text-slate-400 mb-1 border-b text-center pb-1">Instrukce</div>
                {currentStep.memData.filter(m => typeof m.val === 'string' || (m.addr >= 0 && m.addr <= 4)).map(m => (
                  <div key={m.addr} className={`flex justify-between font-mono py-0.5 border-b border-slate-50 ${currentStep.cpuPc === m.addr ? 'bg-indigo-100 font-bold' : ''}`}>
                     <span className="text-slate-400">{m.addr}</span>
                     <span className="font-bold text-slate-700">{m.val === 0 ? '---' : m.val}</span>
                  </div>
                ))}
             </div>
             {/* Data */}
             <div className="flex-1 overflow-y-auto">
                <div className="font-bold text-slate-400 mb-1 border-b text-center pb-1">Data</div>
                {currentStep.memData.filter(m => m.addr >= 10).map(m => (
                  <div key={m.addr} className={`flex justify-between font-mono py-0.5 border-b border-slate-50 ${m.val !== 0 ? 'bg-yellow-50 font-black' : ''}`}>
                     <span className="text-slate-400">{m.addr}</span>
                     <span className={m.val !== 0 ? 'text-indigo-600' : 'text-slate-400'}>{m.val === 0 && currentStep.activeArrow === 'none' && stepIdx === 0 ? '---' : m.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Vstup (Bottom Left) */}
        <div className="absolute bottom-[20%] left-0 w-[20%] bg-green-50 border-4 border-green-200 rounded-3xl p-2 sm:p-4 shadow-xl z-20 flex flex-col items-center">
          <div className="flex flex-col items-center gap-1 mb-4 bg-white px-3 py-2 rounded-xl shadow-sm border border-green-100 w-full text-center">
            <LogIn className="w-6 h-6 text-green-600" />
            <span className="font-black text-green-800 uppercase tracking-widest text-[10px] md:text-xs">Vstup</span>
          </div>
          <div className="flex flex-col gap-2 w-full items-center">
             {currentStep.inData.length === 0 && <span className="text-slate-400 text-xs italic">Prázdný</span>}
             {currentStep.inData.map((d, i) => (
                <div key={i} className="bg-green-600 text-white font-black py-1 px-4 rounded shadow-md text-xs truncate w-full text-center">{d}</div>
             ))}
          </div>
        </div>

        {/* CPU (Bottom Center) */}
        <div className={`absolute bottom-[5%] md:bottom-[10%] left-1/2 -translate-x-1/2 w-[40%] bg-slate-100 border-4 ${activeArrow === 'cpu-internal' ? 'border-yellow-400 shadow-yellow-200 shadow-2xl' : 'border-slate-300 shadow-xl'} rounded-3xl p-2 sm:p-4 z-20 flex flex-col items-center transition-all duration-500`}>
          <div className="flex items-center gap-2 mb-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 w-full justify-center relative overflow-hidden">
             {activeArrow === 'cpu-internal' && <div className="absolute inset-0 bg-yellow-100 opacity-50 animate-pulse"></div>}
            <Cpu className="w-8 h-8 text-slate-700 relative z-10" />
            <span className="font-black text-slate-800 uppercase tracking-widest text-sm relative z-10">Procesor (CPU)</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full relative z-10">
            {/* Řadič (CU) */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-3 flex flex-col items-center">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase mb-2 text-center">Řadič (CU)</span>
              <div className="w-full bg-slate-50 rounded border border-slate-100 flex flex-col items-center p-2 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Čítač instrukcí (PC)</span>
                <span className="font-mono font-black text-indigo-700 text-lg mt-1">{currentStep.cpuPc}</span>
              </div>
            </div>
            
            {/* ALU a Registr */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-3 flex flex-col items-center">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase mb-2 text-center">ALU & Registr</span>
              <div className="w-full bg-slate-50 rounded border border-slate-100 flex flex-col items-center p-2 text-center h-full justify-center">
                <span className="font-mono font-black text-purple-700 text-2xl">
                  {currentStep.cpuAcc}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Výstup (Bottom Right) */}
        <div className="absolute bottom-[20%] right-0 w-[20%] bg-orange-50 border-4 border-orange-200 rounded-3xl p-2 sm:p-4 shadow-xl z-20 flex flex-col items-center">
          <div className="flex flex-col items-center gap-1 mb-4 bg-white px-3 py-2 rounded-xl shadow-sm border border-orange-100 w-full text-center">
            <LogOut className="w-6 h-6 text-orange-600" />
            <span className="font-black text-orange-800 uppercase tracking-widest text-[10px] md:text-xs">Výstup</span>
          </div>
          <div className="flex flex-col gap-2 w-full items-center">
             {currentStep.outData.length === 0 && <span className="text-slate-400 text-xs italic">Čeká se...</span>}
             {currentStep.outData.map((d, i) => (
                <div key={i} className="bg-orange-600 text-white font-black py-1 px-4 rounded shadow-md animate-in zoom-in w-full text-center">{d}</div>
             ))}
          </div>
        </div>

        </div>
        </>
      )}
    </>
  );
};
