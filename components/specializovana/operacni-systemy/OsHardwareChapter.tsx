import React from 'react';
import { ArrowLeft, HardDrive, Cpu } from 'lucide-react';

interface OsHardwareChapterProps {
  onBack: () => void;
  onStartVonNeumann: () => void;
  onStartRamSimulator: () => void;
}

const OsHardwareChapter: React.FC<OsHardwareChapterProps> = ({ onBack, onStartVonNeumann, onStartRamSimulator }) => {
  return (
    <div className="max-w-4xl w-full animate-in fade-in duration-1000 px-4 text-center flex flex-col items-center">
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na výběr
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-20 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden w-full">
        <div className="w-32 h-32 bg-gradient-to-tr from-slate-600 to-gray-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-slate-200 mb-10">
          <HardDrive className="w-16 h-16 text-white" />
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none uppercase">
          Hardware <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-600">OS</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Architektura a vnitřní fungování počítače
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Von Neumann */}
          <div className="bg-indigo-50 border-2 border-indigo-100 p-8 rounded-3xl flex flex-col items-center text-center justify-between min-h-[300px] shadow-lg shadow-indigo-100/50 hover:shadow-indigo-200/50 transition-all hover:-translate-y-1">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-md text-white font-black text-2xl">
                CPU
              </div>
              <h3 className="font-black text-indigo-800 text-xl mb-3 uppercase tracking-wider">Von Neumannova architektura</h3>
              <p className="text-sm text-indigo-900/80 mb-6 font-medium">Základní princip fungování počítačů. Vyzkoušej si, jak procesor, paměť a sběrnice spolupracují jako jeden tým.</p>
            </div>
            <button
              onClick={onStartVonNeumann}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95 w-full flex items-center justify-center gap-2"
            >
              Spustit simulátor
            </button>
          </div>

          {/* Paměť RAM */}
          <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-3xl flex flex-col items-center text-center justify-between min-h-[300px] shadow-lg shadow-emerald-100/50 hover:shadow-emerald-200/50 transition-all hover:-translate-y-1">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-md text-white font-black text-2xl">
                RAM
              </div>
              <h3 className="font-black text-emerald-800 text-xl mb-3 uppercase tracking-wider">Paměť RAM (Tři úrovně)</h3>
              <p className="text-sm text-emerald-900/80 mb-6 font-medium">Od správy kapacity, přes rozložení kódových a datových segmentů až po skládání vlastního strojového kódu přímo v buňkách paměti.</p>
            </div>
            <button
              onClick={onStartRamSimulator}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95 w-full flex items-center justify-center gap-2"
            >
              Otevřít kapitolu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OsHardwareChapter;
