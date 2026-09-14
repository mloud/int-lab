import React, { useState } from 'react';
import { ArrowLeft, Cpu, MemoryStick, LogIn, LogOut, Play, RotateCcw } from 'lucide-react';

interface VonNeumannGameProps {
  onBack: () => void;
}

type ArrowType = 'none' | 'in-mem' | 'in-cpu' | 'cpu-mem-write' | 'cpu-mem-read' | 'cpu-out' | 'cpu-internal';

interface Step {
  title: string;
  msg: string;
  activeArrow: ArrowType;
  arrowText: string;
  inData: string[];
  outData: (string | number)[];
  cpuAcc: string | number;
  cpuPc: string | number;
  memData: { addr: number; val: string | number }[];
}

const EMPTY_RAM = [
  { addr: 0, val: 0 }, { addr: 1, val: 0 }, { addr: 2, val: 0 }, { addr: 3, val: 0 }, { addr: 4, val: 0 },
  { addr: 10, val: 0 }, { addr: 11, val: 0 }, { addr: 12, val: 0 }
];

const FILLED_RAM = [
  { addr: 0, val: 'LOAD R1, 10' },
  { addr: 1, val: 'ADD R1, 11' },
  { addr: 2, val: 'STORE 12, R1' },
  { addr: 3, val: 'OUT 12' },
  { addr: 4, val: 'HALT' },
  { addr: 10, val: 5 },
  { addr: 11, val: 7 },
  { addr: 12, val: 0 }
];

const RESULT_RAM = [...FILLED_RAM];
RESULT_RAM[7] = { addr: 12, val: 12 };

const STEPS: Step[] = [
  {
    title: 'Počáteční stav',
    msg: 'Paměť je prázdná. Čekáme na spuštění (nahrání) programu ze Vstupu (např. z pevného disku).',
    activeArrow: 'none',
    arrowText: '',
    inData: ['program.exe'],
    outData: [],
    cpuAcc: '---',
    cpuPc: '---',
    memData: EMPTY_RAM
  },
  {
    title: 'Nahrání programu do paměti',
    msg: 'Operační systém přečte program ze Vstupu a nakopíruje jej včetně počátečních dat (5 a 7) do sdílené paměti RAM.',
    activeArrow: 'in-cpu',
    arrowText: 'Načítání: program.exe',
    inData: [],
    outData: [],
    cpuAcc: '---',
    cpuPc: '---',
    memData: FILLED_RAM
  },
  {
    title: 'Program připraven',
    msg: 'Program je kompletně v paměti. Řadič nastaví Čítač instrukcí (PC) na první adresu (0) a je připraven k běhu.',
    activeArrow: 'none',
    arrowText: '',
    inData: [],
    outData: [],
    cpuAcc: '---',
    cpuPc: 0,
    memData: FILLED_RAM
  },
  {
    title: 'Načtení 1. instrukce',
    msg: 'Řadič čte první instrukci z adresy 0. Instrukce říká: "Načti hodnotu z adresy 10 do Registru R1".',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Instrukce: LOAD',
    inData: [],
    outData: [],
    cpuAcc: '---',
    cpuPc: 0,
    memData: FILLED_RAM
  },
  {
    title: 'Vykonání: Načtení dat',
    msg: 'Procesor přečte hodnotu "5" z adresy 10 a uloží ji do Registru.',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Data: 5',
    inData: [],
    outData: [],
    cpuAcc: 5,
    cpuPc: 0,
    memData: FILLED_RAM
  },
  {
    title: 'Načtení 2. instrukce',
    msg: 'Řadič posune čítač a čte další instrukci z adresy 1: "Přičti k Registru R1 hodnotu z adresy 11".',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Instrukce: ADD',
    inData: [],
    outData: [],
    cpuAcc: 5,
    cpuPc: 1,
    memData: FILLED_RAM
  },
  {
    title: 'Vykonání: Výpočet (ALU)',
    msg: 'Procesor načte z paměti číslo "7" a pomocí ALU ho rovnou přičte k 5. Nová hodnota v registru je 12.',
    activeArrow: 'cpu-internal',
    arrowText: 'ALU: 5 + 7',
    inData: [],
    outData: [],
    cpuAcc: 12,
    cpuPc: 1,
    memData: FILLED_RAM
  },
  {
    title: 'Načtení 3. instrukce',
    msg: 'Čítač je na adrese 2. Čte instrukci: "STORE 12, R1" – tj. zapiš obsah registru zpět do paměti na adresu 12.',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Instrukce: STORE',
    inData: [],
    outData: [],
    cpuAcc: 12,
    cpuPc: 2,
    memData: FILLED_RAM
  },
  {
    title: 'Vykonání: Zápis výsledku',
    msg: 'Procesor posílá vypočítanou hodnotu (12) z registru do paměti.',
    activeArrow: 'cpu-mem-write',
    arrowText: 'Zápis: 12',
    inData: [],
    outData: [],
    cpuAcc: 12,
    cpuPc: 2,
    memData: RESULT_RAM
  },
  {
    title: 'Načtení 4. instrukce',
    msg: 'Čítač je na adrese 3. Čte instrukci: "OUT 12" – tj. pošli hodnotu z adresy 12 na výstupní jednotku.',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Instrukce: OUT',
    inData: [],
    outData: [],
    cpuAcc: 12,
    cpuPc: 3,
    memData: RESULT_RAM
  },
  {
    title: 'Vykonání: Zápis na výstup',
    msg: 'Procesor vyžádá data z paměti a odešle je přímo na Výstupní jednotku k zobrazení uživateli.',
    activeArrow: 'cpu-out',
    arrowText: 'Data: 12',
    inData: [],
    outData: [12],
    cpuAcc: 12,
    cpuPc: 3,
    memData: RESULT_RAM
  },
  {
    title: 'Hotovo',
    msg: 'Čítač se posunul na adresu 4. Program přečetl instrukci HALT a ukončil se.',
    activeArrow: 'none',
    arrowText: '',
    inData: [],
    outData: [12],
    cpuAcc: 12,
    cpuPc: '4 (HALT)',
    memData: RESULT_RAM
  }
];

const VonNeumannGame: React.FC<VonNeumannGameProps> = ({ onBack }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentStep = STEPS[stepIdx];
  const isDone = stepIdx === STEPS.length - 1;
  const activeArrow = isAnimating ? currentStep.activeArrow : 'none';

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
  };

  return (
    <div className="max-w-6xl w-full mx-auto animate-in fade-in duration-1000 px-4 py-8 flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight flex items-center gap-3">
          <Cpu className="w-8 h-8 text-indigo-600" />
          Von Neumannova architektura
        </h1>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-red-200 uppercase tracking-wider text-xs"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

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
              <text x="25%" y="67%" fill="#4f46e5" fontSize="11" md:fontSize="14" fontWeight="bold" textAnchor="middle">{currentStep.arrowText}</text>
            )}
          </g>

          {/* Šipka CPU -> Output */}
          <g className={`transition-all duration-500 ${activeArrow === 'cpu-out' ? 'opacity-100' : 'opacity-20'}`}>
            <line x1="71%" y1="70%" x2="79%" y2="70%" stroke="#e11d48" strokeWidth="6" strokeDasharray="8 8" className={activeArrow === 'cpu-out' ? 'animate-[dash_1s_linear_infinite]' : ''} />
            <polygon points="79%,70% 77%,68% 77%,72%" fill="#e11d48" />
            {activeArrow === 'cpu-out' && (
              <text x="75%" y="67%" fill="#e11d48" fontSize="11" md:fontSize="14" fontWeight="bold" textAnchor="middle">{currentStep.arrowText}</text>
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
    </div>
  );
};

export default VonNeumannGame;
