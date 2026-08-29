import React from 'react';
import { ArrowLeft, BookOpen, PenTool, Database } from 'lucide-react';

interface DataUnitsMenuProps {
  onStartTheory: () => void;
  onStartPractice: () => void;
  onBack: () => void;
}

const DataUnitsMenu: React.FC<DataUnitsMenuProps> = ({ onStartTheory, onStartPractice, onBack }) => {
  return (
    <div className="max-w-4xl w-full animate-in fade-in duration-500 px-4">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-fuchsia-50 text-gray-700 hover:text-fuchsia-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do hlavní nabídky
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-[3rem] shadow-2xl border-4 border-white mb-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-fuchsia-200">
            <Database className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight uppercase">
          Jednotky dat
        </h1>
        <p className="text-gray-500 mb-0 text-xl font-medium max-w-2xl mx-auto">
          Objev, z čeho se skládají data, jak se měří a nauč se s nimi počítat jako profík.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <button
          onClick={onStartTheory}
          className="group relative px-8 py-10 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-6 overflow-hidden border-4 border-gray-50 hover:border-fuchsia-100 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-20 h-20 bg-fuchsia-50 rounded-2xl flex items-center justify-center group-hover:-rotate-6 transition-transform">
            <BookOpen className="w-10 h-10 text-fuchsia-600" />
          </div>
          <div>
            <span className="text-2xl uppercase tracking-widest text-fuchsia-700 block mb-2">1. Teorie</span>
            <span className="text-sm font-medium text-gray-500 normal-case tracking-normal">Bity, bajty, KB, MB, GB a TB. Kde se s nimi setkáme?</span>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#dut</div></button>

        <button
          onClick={onStartPractice}
          className="group relative px-8 py-10 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-6 overflow-hidden border-4 border-gray-50 hover:border-blue-100 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <PenTool className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <span className="text-2xl uppercase tracking-widest text-blue-700 block mb-2">2. Praxe</span>
            <span className="text-sm font-medium text-gray-500 normal-case tracking-normal">Počítej reálné příklady! Kapacita disku, fotek a videí.</span>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#dup</div></button>
      </div>
    </div>
  );
};

export default DataUnitsMenu;
