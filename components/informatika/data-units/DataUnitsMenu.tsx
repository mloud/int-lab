import React from 'react';
import { ArrowLeft, BookOpen, PenTool, Database } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface DataUnitsMenuProps {
  onStartTheory: () => void;
  onStartPractice: () => void;
  onBack: () => void;
}

const DataUnitsMenu: React.FC<DataUnitsMenuProps> = ({ onStartTheory, onStartPractice, onBack }) => {
  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-500 px-4">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-fuchsia-50 text-gray-700 hover:text-fuchsia-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden mb-10">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-fuchsia-500 to-purple-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-fuchsia-200 mb-8">
          <Database className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          Jednotky <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600">dat</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">
          Objev, z čeho se skládají data, jak se měří a jak s nimi počítat
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          <TechnicalCard
            tag="dut"
            title="Teorie"
            description="Bity, bajty a předpony KB, MB, GB a TB. Kde se s nimi setkáváme a jak funguje převodní koeficient 1024."
            icon={BookOpen}
            gradient="from-fuchsia-500 to-purple-600"
            actionLabel="Otevřít teorii"
            onClick={onStartTheory}
          />
          <TechnicalCard
            tag="dup"
            title="Praxe a výpočty"
            description="Počítej reálné příklady ze života: Kapacita flash disku, kolik se vejde fotek, písniček a rychlost stahování."
            icon={PenTool}
            gradient="from-blue-500 to-cyan-500"
            actionLabel="Spustit výpočty"
            onClick={onStartPractice}
          />
        </div>
      </div>
    </div>
  );
};

export default DataUnitsMenu;
