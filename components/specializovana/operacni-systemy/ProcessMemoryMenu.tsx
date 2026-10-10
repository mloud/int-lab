import React from 'react';
import { ArrowLeft, Cpu, Layers, Activity, ListOrdered } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="stp"
            title="CPU & RAM Krokovač"
            description="Projděte si krok za krokem vykonávání kódu a sledujte plnění paměti."
            icon={ListOrdered}
            gradient="from-indigo-600 to-blue-600"
            actionLabel="Spustit krokovač"
            onClick={onStartMemoryStepper}
            accentCorner={false}
          />

          <TechnicalCard
            tag="mal"
            title="Třídička paměti"
            description="Rozhodněte, co patří na Zásobník, co na Haldu a co do Datového segmentu."
            icon={Layers}
            gradient="from-emerald-500 to-teal-600"
            actionLabel="Spustit hru"
            onClick={onStartMemoryAllocator}
            accentCorner={false}
          />

          <TechnicalCard
            tag="cpu"
            title="Závod procesoru"
            description="Buďte chvíli procesorem a zkuste stíhat cyklus Fetch-Decode-Execute."
            icon={Cpu}
            gradient="from-rose-500 to-red-600"
            actionLabel="Spustit simulátor"
            onClick={onStartCpuCycle}
            accentCorner={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessMemoryMenu;
