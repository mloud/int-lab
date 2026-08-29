import React from 'react';
import { ArrowLeft, Cpu, Layers, Activity, ListOrdered } from 'lucide-react';

interface ProcessMemoryMenuProps {
  onBack: () => void;
  onStartMemoryStepper: () => void;
  onStartMemoryAllocator: () => void;
  onStartCpuCycle: () => void;
}

const ProcessMemoryMenu: React.FC<ProcessMemoryMenuProps> = ({ 
  onBack, 
  onStartMemoryStepper, 
  onStartMemoryAllocator, 
  onStartCpuCycle 
}) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na Operační systémy
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <Activity className="w-10 h-10 text-indigo-600 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Běh programu v paměti
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl font-medium">
          Vyzkoušejte si, jak procesor čte instrukce a jak operační systém organizuje paměť běžícího procesu (Stack, Heap, Data, Text).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Idea 1: Memory Stepper */}
          <div className="p-6 bg-indigo-50/50 rounded-3xl border-2 border-indigo-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-indigo-50">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <ListOrdered className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-indigo-700 mb-1 uppercase tracking-wider text-sm">CPU & RAM Krokovač</h3>
              <p className="text-xs text-gray-600">Projděte si krok za krokem vykonávání kódu a sledujte plnění paměti.</p>
            </div>
            <button
              onClick={onStartMemoryStepper}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              Spustit krokovač
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#stp</div></button>
          </div>

          {/* Idea 2: Memory Allocator */}
          <div className="p-6 bg-emerald-50/50 rounded-3xl border-2 border-emerald-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-emerald-50">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-emerald-700 mb-1 uppercase tracking-wider text-sm">Třídička paměti</h3>
              <p className="text-xs text-gray-600">Rozhodněte, co patří na Zásobník, co na Haldu a co do Datového segmentu.</p>
            </div>
            <button
              onClick={onStartMemoryAllocator}
              className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              Spustit hru
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#mal</div></button>
          </div>

          {/* Idea 3: CPU Cycle */}
          <div className="p-6 bg-rose-50/50 rounded-3xl border-2 border-rose-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-rose-50">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-rose-700 mb-1 uppercase tracking-wider text-sm">Závod procesoru</h3>
              <p className="text-xs text-gray-600">Buďte chvíli procesorem a zkuste stíhat cyklus Fetch-Decode-Execute.</p>
            </div>
            <button
              onClick={onStartCpuCycle}
              className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              Spustit simulátor
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#cpu</div></button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProcessMemoryMenu;
