"use client";

import React, { useState } from 'react';
import { Cpu, MemoryStick, LogIn, LogOut, Play, RotateCcw, CheckCircle2, Calculator, Settings, AlertTriangle } from 'lucide-react';
import { BUILDER_MODULES } from './VonNeumannData';

export const VonNeumannBuilderPhase: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [slots, setSlots] = useState<Record<string, string | null>>({
    'cpu-alu': null,
    'cpu-cu': null,
    'memory': null,
    'input': null,
    'output': null
  });

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

  return (
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
  );
};
