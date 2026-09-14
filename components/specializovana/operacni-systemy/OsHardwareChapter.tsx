import React from 'react';
import { ArrowLeft, HardDrive } from 'lucide-react';

interface OsHardwareChapterProps {
  onBack: () => void;
}

const OsHardwareChapter: React.FC<OsHardwareChapterProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl w-full animate-in fade-in duration-1000 px-4">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na výběr
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-20 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        <div className="w-32 h-32 bg-gradient-to-tr from-slate-600 to-gray-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-slate-200 mb-10">
          <HardDrive className="w-16 h-16 text-white" />
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none uppercase">
          Hardware <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-600">OS</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Tato kapitola je zatím prázdná
        </p>

        <div className="p-8 bg-slate-50 rounded-3xl border-2 border-slate-100 w-full max-w-2xl">
          <p className="text-slate-600">
            Obsah pro téma Hardware v operačních systémech se připravuje.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OsHardwareChapter;
