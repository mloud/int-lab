import React from 'react';
import { Cpu, Code } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface SpecializovanaMenuProps {
  onBack: () => void;
  onStartOperacniSystemy: () => void;
  onStartOperacniSystemy2: () => void;
  onStartProgramming: () => void;
  onStartProgramming2: () => void;
}

const SpecializovanaMenu: React.FC<SpecializovanaMenuProps> = ({ onBack, onStartOperacniSystemy, onStartOperacniSystemy2, onStartProgramming, onStartProgramming2 }) => {
  return (
    <div className="max-w-5xl w-full animate-in fade-in duration-1000 px-4">
      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Dekorační prvky na pozadí */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative mb-8">
          <div className="w-28 h-28 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-purple-200">
            <Cpu className="w-14 h-14 text-white" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Specializovaná
          </span>
          <br/> Informatika
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Odborná témata a laboratorní předměty
        </p>

        {/* 1. ROČNÍK */}
        <div className="w-full mb-10 max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
            <span className="w-3 h-7 rounded-full bg-purple-600"></span> 1. Ročník
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full justify-items-center">
            <TechnicalCard
              tag="ops1"
              title="Operační systémy 1"
              description="Základy architektury OS, bootování, simulátory a souborové systémy."
              icon={Cpu}
              gradient="from-purple-600 to-indigo-600"
              actionLabel="Otevřít předmět"
              onClick={onStartOperacniSystemy}
              accentCorner={false}
              variant="filled"
            />

            <TechnicalCard
              tag="prg1"
              title="Programování a hry 1"
              description="Základy algoritmizace, vizuální blokový jazyk Scratch a herní projekty."
              icon={Code}
              gradient="from-emerald-600 to-teal-600"
              actionLabel="Otevřít předmět"
              onClick={onStartProgramming}
              accentCorner={false}
              variant="filled"
            />
          </div>
        </div>

        {/* 2. ROČNÍK */}
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-left mb-6 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
            <span className="w-3 h-7 rounded-full bg-pink-600"></span> 2. Ročník
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full justify-items-center">
            <TechnicalCard
              tag="ops2"
              title="Operační systémy 2"
              description="Pokročilá správa, zálohování dat, cloudové technologie a údržba."
              icon={Cpu}
              gradient="from-blue-600 to-cyan-600"
              actionLabel="Otevřít předmět"
              onClick={onStartOperacniSystemy2}
              accentCorner={false}
              variant="filled"
            />

            <TechnicalCard
              tag="prg2"
              title="Programování a hry 2"
              description="Výuka programovacího jazyka Python, grafika v Tkinter a interaktivní úlohy."
              icon={Code}
              gradient="from-amber-500 to-orange-600"
              actionLabel="Otevřít předmět"
              onClick={onStartProgramming2}
              accentCorner={false}
              variant="filled"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializovanaMenu;
