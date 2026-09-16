import React, { useState } from 'react';
import { ArrowLeft, Cpu, MemoryStick, LogIn, LogOut, Play, RotateCcw, CheckCircle2, Calculator, Settings, AlertTriangle } from 'lucide-react';

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

const PROG = ['1: VÝSLEDEK = 5 + 7', '2: PRINT VÝSLEDEK'];

const SIMPLE_STEPS = [
  {
    title: 'Nahrání programu',
    msg: 'Nahráváme program od programátora (např. z disku). Tok probíhá ze vstupu přes procesor do společné paměti.',
    activeArrow: 'in-mem',
    arrowText: 'Nahrávám program...',
    inData: PROG,
    outData: [],
    memProg: [],
    memData: [],
    activeProgLine: -1,
    cpuData: 'Čeká...'
  },
  {
    title: 'Program v paměti připraven',
    msg: 'Paměť nyní drží náš program ve vyhrazené sekci. Můžeme začít s prvním krokem.',
    activeArrow: 'none',
    arrowText: '',
    inData: [],
    outData: [],
    memProg: PROG,
    memData: [],
    activeProgLine: -1,
    cpuData: 'Čeká...'
  },
  {
    title: 'Instrukce 1: Čtení z paměti',
    msg: 'Procesor čte první instrukci ze sekce Program. Čísla 5 a 7 jsou rovnou součástí instrukce.',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Čtu instrukci 1',
    inData: [],
    outData: [],
    memProg: PROG,
    memData: [],
    activeProgLine: 0,
    cpuData: 'Načteno:\n1: VÝSLEDEK = 5 + 7'
  },
  {
    title: 'Zpracování (Výpočet v ALU)',
    msg: 'Procesor má čísla u sebe a ALU (aritmeticko-logická jednotka) je okamžitě sečte.',
    activeArrow: 'cpu-internal',
    arrowText: 'Počítám: 5 + 7',
    inData: [],
    outData: [],
    memProg: PROG,
    memData: [],
    activeProgLine: 0,
    cpuData: 'Výpočet:\n5 + 7 = 12'
  },
  {
    title: 'Zápis výsledku',
    msg: 'Výsledek 12 nesmí zůstat jen v procesoru. Odesílá se do datové sekce paměti.',
    activeArrow: 'cpu-mem-write',
    arrowText: 'Zápis dat: 12',
    inData: [],
    outData: [],
    memProg: PROG,
    memData: ['VÝSLEDEK = 12'],
    activeProgLine: 0,
    cpuData: 'Vykonáno'
  },
  {
    title: 'Instrukce 2: Čtení z paměti',
    msg: 'Procesor se ptá na další instrukci: Vytisknout VÝSLEDEK.',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Čtu instrukci 2',
    inData: [],
    outData: [],
    memProg: PROG,
    memData: ['VÝSLEDEK = 12'],
    activeProgLine: 1,
    cpuData: 'Načteno:\n2: PRINT VÝSLEDEK'
  },
  {
    title: 'Vykonání (Tisk na obrazovku)',
    msg: 'Procesor si vytáhne z paměti hodnotu slova VÝSLEDEK a okamžitě ji posílá přes svoji sběrnici uživateli na výstup.',
    activeArrow: 'cpu-mem-read-data-out',
    arrowText: 'Tisk',
    inData: [],
    outData: ['Obrazovka: 12'],
    memProg: PROG,
    memData: ['VÝSLEDEK = 12'],
    activeProgLine: 1,
    cpuData: 'Hotovo'
  }
];

const BUILDER_MODULES = [
  { id: 'alu', name: 'ALU', icon: Calculator, desc: 'Provádí matematiku a logiku' },
  { id: 'cu', name: 'Řadič (CU)', icon: Settings, desc: 'Řídí tok dat a dekóduje instrukce' },
  { id: 'mem', name: 'Společná Paměť', icon: MemoryStick, desc: 'Obsahuje data I instrukce společně!' },
  { id: 'in', name: 'Vstup', icon: LogIn, desc: 'Čte vstup (klávesnice, disk)' },
  { id: 'out', name: 'Výstup', icon: LogOut, desc: 'Zobrazuje výstup (monitor)' },
];

const VonNeumannGame: React.FC<VonNeumannGameProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<'builder' | 'simple-sim' | 'simulator'>('builder');
  
  // Builder state
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [slots, setSlots] = useState<Record<string, string | null>>({
    'cpu-alu': null,
    'cpu-cu': null,
    'memory': null,
    'input': null,
    'output': null
  });

  // Simple simulator state
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

  // Builder handlers
  const unassigned = BUILDER_MODULES.filter(m => !Object.values(slots).includes(m.id));
  const isBuilderComplete = Object.values(slots).every(v => v !== null);
  const isBuilderCorrect = 
    slots['cpu-alu'] === 'alu' && 
    slots['cpu-cu'] === 'cu' && 
    slots['memory'] === 'mem' && 
    slots['input'] === 'in' && 
    slots['output'] === 'out';

  const handleSlotClick = (slotId: string) => {
    if (selectedModule) {
      // Remove from any existing slot first
      const newSlots = { ...slots };
      for (const key in newSlots) {
        if (newSlots[key] === selectedModule) newSlots[key] = null;
      }
      newSlots[slotId] = selectedModule;
      setSlots(newSlots);
      setSelectedModule(null);
    } else if (slots[slotId]) {
      // Return to unassigned
      setSlots({ ...slots, [slotId]: null });
    }
  };

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(prev => prev === moduleId ? null : moduleId);
  };

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
    <div className="max-w-6xl w-full mx-auto animate-in fade-in duration-1000 px-4 py-8 flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight flex items-center gap-3 mb-4">
            <Cpu className="w-8 h-8 text-indigo-600" />
            Von Neumannova architektura
          </h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setPhase('builder')} 
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${phase === 'builder' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50 border-2 border-gray-100'}`}
            >
              1. Skládačka HW
            </button>
            <button 
              onClick={() => setPhase('simple-sim')} 
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${phase === 'simple-sim' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50 border-2 border-gray-100'}`}
            >
              2. Zjednodušený tok
            </button>
            <button 
              onClick={() => setPhase('simulator')} 
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${phase === 'simulator' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50 border-2 border-gray-100'}`}
            >
              3. Pokročilý simulátor
            </button>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-red-200 uppercase tracking-wider text-xs"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      {phase === 'builder' && (
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border-4 border-indigo-100 flex flex-col items-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Skládačka Architektury</h2>
            <p className="text-gray-600 font-medium bg-indigo-50 inline-block px-4 py-2 rounded-xl border border-indigo-200">
              💡 <strong>Úkol:</strong> Vyber modul ze seznamu a klikni na prázdný slot v nákresu pro jeho umístění.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
            {/* Seznam modulů */}
            <div className="lg:w-1/3 bg-gray-50 rounded-3xl p-6 border-2 border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Dostupné Moduly</h3>
              <div className="flex flex-col gap-3 min-h-[300px]">
                {unassigned.map(mod => (
                  <div 
                    key={mod.id} 
                    onClick={() => handleModuleClick(mod.id)}
                    className={`p-4 rounded-xl flex flex-col gap-1 cursor-pointer transition-all border-2 shadow-sm
                      ${selectedModule === mod.id ? 'bg-indigo-100 border-indigo-500 scale-105 ring-4 ring-indigo-200' : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md'}`}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <mod.icon className="w-5 h-5 text-indigo-600" /> {mod.name}
                    </div>
                    <div className="text-xs text-slate-500 font-medium leading-tight">{mod.desc}</div>
                  </div>
                ))}
                {unassigned.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 italic">Vše umístěno</div>
                )}
              </div>
            </div>

            {/* Hrací deska */}
            <div className="lg:w-2/3 bg-slate-100 rounded-3xl p-8 border-4 border-slate-200 relative min-h-[400px] flex flex-col items-center justify-center gap-8 z-0">
              
              {/* Sběrnice (Vizuální dráty na pozadí) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-70" preserveAspectRatio="none">
                <path d="M 20% 70% L 35% 70%" stroke={slots['input'] ? '#4ade80' : '#cbd5e1'} strokeWidth="12" strokeLinecap="round" className="transition-colors duration-500" />
                <path d="M 50% 30% L 50% 50%" stroke={slots['memory'] ? '#60a5fa' : '#cbd5e1'} strokeWidth="12" strokeLinecap="round" className="transition-colors duration-500" />
                <path d="M 65% 70% L 80% 70%" stroke={slots['output'] ? '#fb923c' : '#cbd5e1'} strokeWidth="12" strokeLinecap="round" className="transition-colors duration-500" />
              </svg>

              {/* Top Row: Memory */}
              <div className="flex justify-center w-full">
                <div 
                  onClick={() => handleSlotClick('memory')}
                  className={`w-64 h-32 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative
                    ${slots['memory'] ? 'bg-blue-50 border-blue-400 shadow-lg' : selectedModule ? 'bg-white border-blue-300 hover:bg-blue-50 animate-pulse' : 'bg-white border-slate-300 hover:bg-slate-50'}
                  `}
                >
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Zde leží data i program</span>
                  {slots['memory'] ? (
                    <div className="text-blue-800 font-black text-xl flex flex-col items-center gap-2"><MemoryStick className="w-8 h-8" /> {BUILDER_MODULES.find(m => m.id === slots['memory'])?.name}</div>
                  ) : (
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-sm">Paměť</span>
                  )}
                </div>
              </div>

              {/* Middle Row: In - CPU - Out */}
              <div className="flex justify-between items-center w-full gap-4">
                {/* Input */}
                <div 
                  onClick={() => handleSlotClick('input')}
                  className={`w-32 h-32 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all
                    ${slots['input'] ? 'bg-green-50 border-green-400 shadow-lg' : selectedModule ? 'bg-white border-green-300 hover:bg-green-50 animate-pulse' : 'bg-white border-slate-300 hover:bg-slate-50'}
                  `}
                >
                  {slots['input'] ? (
                    <div className="text-green-800 font-black flex flex-col items-center gap-1 text-center"><LogIn className="w-6 h-6" /> {BUILDER_MODULES.find(m => m.id === slots['input'])?.name}</div>
                  ) : (
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-sm text-center">Vstup</span>
                  )}
                </div>

                {/* CPU */}
                <div className="w-72 bg-slate-200 rounded-3xl p-4 border-4 border-slate-300 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Procesor (CPU)</span>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {/* CU */}
                    <div 
                      onClick={() => handleSlotClick('cpu-cu')}
                      className={`h-24 rounded-xl border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all
                        ${slots['cpu-cu'] ? 'bg-indigo-50 border-indigo-400 shadow-md' : selectedModule ? 'bg-white border-indigo-300 hover:bg-indigo-50 animate-pulse' : 'bg-white border-slate-300 hover:bg-slate-50'}
                      `}
                    >
                      {slots['cpu-cu'] ? (
                        <div className="text-indigo-800 font-black flex flex-col items-center gap-1 text-center text-sm"><Settings className="w-5 h-5" /> {BUILDER_MODULES.find(m => m.id === slots['cpu-cu'])?.name}</div>
                      ) : (
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] text-center">Modul pro<br/>řízení</span>
                      )}
                    </div>
                    {/* ALU */}
                    <div 
                      onClick={() => handleSlotClick('cpu-alu')}
                      className={`h-24 rounded-xl border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all
                        ${slots['cpu-alu'] ? 'bg-purple-50 border-purple-400 shadow-md' : selectedModule ? 'bg-white border-purple-300 hover:bg-purple-50 animate-pulse' : 'bg-white border-slate-300 hover:bg-slate-50'}
                      `}
                    >
                      {slots['cpu-alu'] ? (
                        <div className="text-purple-800 font-black flex flex-col items-center gap-1 text-center text-sm"><Calculator className="w-5 h-5" /> {BUILDER_MODULES.find(m => m.id === slots['cpu-alu'])?.name}</div>
                      ) : (
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] text-center">Modul pro<br/>matematiku</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Output */}
                <div 
                  onClick={() => handleSlotClick('output')}
                  className={`w-32 h-32 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all
                    ${slots['output'] ? 'bg-orange-50 border-orange-400 shadow-lg' : selectedModule ? 'bg-white border-orange-300 hover:bg-orange-50 animate-pulse' : 'bg-white border-slate-300 hover:bg-slate-50'}
                  `}
                >
                  {slots['output'] ? (
                    <div className="text-orange-800 font-black flex flex-col items-center gap-1 text-center"><LogOut className="w-6 h-6" /> {BUILDER_MODULES.find(m => m.id === slots['output'])?.name}</div>
                  ) : (
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-sm text-center">Výstup</span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {isBuilderComplete && (
            <div className={`mt-10 p-6 rounded-2xl max-w-3xl w-full flex items-center justify-between gap-6 border-2 shadow-lg animate-in slide-in-from-bottom-4 ${isBuilderCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
              <div className="flex items-center gap-4">
                {isBuilderCorrect ? <CheckCircle2 className="w-12 h-12 text-green-500 flex-shrink-0" /> : <AlertTriangle className="w-12 h-12 text-red-500 flex-shrink-0" />}
                <div>
                  <h3 className={`font-black text-xl mb-1 uppercase tracking-widest ${isBuilderCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isBuilderCorrect ? 'Skvělá práce!' : 'Něco je špatně!'}
                  </h3>
                  <p className={`text-sm font-medium ${isBuilderCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isBuilderCorrect 
                      ? 'Postavil jsi počítač přesně podle Johna von Neumanna. Největší revolucí bylo uložení dat i programu do jedné sdílené paměti!' 
                      : 'Některé moduly nejsou na svém místě. ALU a Řadič musí být uvnitř procesoru, paměť je oddělená sdílená a vstupy/výstupy patří na kraj.'}
                  </p>
                </div>
              </div>
              
              {isBuilderCorrect && (
                <div className="text-green-700 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                  ✓ Hotovo
                </div>
              )}
            </div>
          )}
        </div>
      )}

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
                  <text x="25%" y="67%" fill="#4f46e5" fontSize="11" md:fontSize="14" fontWeight="bold" textAnchor="middle">{currentSStep.arrowText}</text>
                )}
              </g>

              {/* Šipka CPU -> Output */}
              <g className={`transition-all duration-500 ${activeSArrow === 'cpu-out' || activeSArrow === 'cpu-mem-read-data-out' ? 'opacity-100' : 'opacity-20'}`}>
                <line x1="71%" y1="70%" x2="79%" y2="70%" stroke="#e11d48" strokeWidth="6" strokeDasharray="8 8" className={activeSArrow === 'cpu-out' || activeSArrow === 'cpu-mem-read-data-out' ? 'animate-[dash_1s_linear_infinite]' : ''} />
                <polygon points="79%,70% 77%,68% 77%,72%" fill="#e11d48" />
                {(activeSArrow === 'cpu-out' || activeSArrow === 'cpu-mem-read-data-out') && (
                  <text x="75%" y="67%" fill="#e11d48" fontSize="11" md:fontSize="14" fontWeight="bold" textAnchor="middle">Odesílám: 12</text>
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
        </>
      )}
    </div>
  );
};

export default VonNeumannGame;
