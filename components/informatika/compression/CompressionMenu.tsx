import React from 'react';
import { ArrowLeft, BoxSelect, Image as ImageIcon, FileText, ShieldCheck } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface CompressionMenuProps {
  onStartGame: () => void;
  onStartText: () => void;
  onStartChecksum: () => void;
  onBack: () => void;
}

const CompressionMenu: React.FC<CompressionMenuProps> = ({ onStartGame, onStartText, onStartChecksum, onBack }) => {
  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-500 px-4">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden mb-10">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-200 mb-8">
          <BoxSelect className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          Komprese <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">(jednoduše)</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">
          Zjisti, jak počítače šetří místo a ověřují správnost dat
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="txc"
            title="Komprese textu"
            description="Slovníková metoda: Nahrazování často opakovaných slov a frází kratšími symboly."
            icon={FileText}
            gradient="from-blue-500 to-indigo-500"
            actionLabel="Spustit cvičení"
            onClick={onStartText}
          />
          <TechnicalCard
            tag="cpg"
            title="Komprese obrazu"
            description="Interaktivní slučování pixelů stejné barvy a sledování, jak se zmenšuje velikost obrázku."
            icon={ImageIcon}
            gradient="from-emerald-500 to-teal-500"
            actionLabel="Spustit hru"
            onClick={onStartGame}
          />
          <TechnicalCard
            tag="chk"
            title="Kontrolní součet"
            description="Jak počítač odhalí chybu při přenosu? Jednoduchý kontrolní součet a parita v praxi."
            icon={ShieldCheck}
            gradient="from-amber-500 to-orange-500"
            actionLabel="Spustit kontrolu"
            onClick={onStartChecksum}
          />
        </div>
      </div>
    </div>
  );
};

export default CompressionMenu;
