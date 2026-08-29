import React from 'react';
import { ArrowLeft, Monitor, Settings, Power, FileText, Activity, Zap } from 'lucide-react';

interface OsMenuProps {
  onBack: () => void;
  onStartMatchGame: () => void;
  onStartBootSequence: () => void;
  onStartFileExtension: () => void;
  onStartRamManager: () => void;
  onStartShortcutNinja: () => void;
}

const OsMenu: React.FC<OsMenuProps> = ({ onBack, onStartMatchGame, onStartBootSequence, onStartFileExtension, onStartRamManager, onStartShortcutNinja }) => {
  return (
    <div className="max-w-4xl w-full animate-in fade-in duration-1000 px-4">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-20 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-slate-200/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gray-200/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="w-32 h-32 bg-gradient-to-tr from-slate-600 to-gray-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-slate-200 mb-10">
          <Monitor className="w-16 h-16 text-white" />
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none uppercase">
          Operační <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-600">Systémy</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Základy pro běžného uživatele
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Tlačítka na jednotlivé hry */}
          <button
            onClick={onStartMatchGame}
            className="group relative px-8 py-8 bg-white hover:bg-slate-50 text-slate-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-4 overflow-hidden border-4 border-slate-100 hover:border-slate-300"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Monitor className="w-8 h-8 text-slate-600" />
            </div>
            <span className="text-xl uppercase tracking-widest text-slate-700 text-center">Kdo je kdo?<br/><span className="text-sm text-slate-400">Přehled systémů</span></span>
          <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#mat</div></button>

          <button
            onClick={onStartBootSequence}
            className="group relative px-8 py-8 bg-white hover:bg-slate-50 text-slate-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-4 overflow-hidden border-4 border-slate-100 hover:border-slate-300"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Power className="w-8 h-8 text-slate-600" />
            </div>
            <span className="text-xl uppercase tracking-widest text-slate-700 text-center">Start Počítače<br/><span className="text-sm text-slate-400">Bootovací sekvence</span></span>
          <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#boo</div></button>

          <button
            onClick={onStartFileExtension}
            className="group relative px-8 py-8 bg-white hover:bg-slate-50 text-slate-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-4 overflow-hidden border-4 border-slate-100 hover:border-slate-300"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8 text-slate-600" />
            </div>
            <span className="text-xl uppercase tracking-widest text-slate-700 text-center">Detektiv Přípona<br/><span className="text-sm text-slate-400">Jak se otevírají soubory?</span></span>
          <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#ext</div></button>

          <button
            onClick={onStartRamManager}
            className="group relative px-8 py-8 bg-white hover:bg-slate-50 text-slate-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-4 overflow-hidden border-4 border-slate-100 hover:border-slate-300"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-8 h-8 text-slate-600" />
            </div>
            <span className="text-xl uppercase tracking-widest text-slate-700 text-center">Krotitel RAMky<br/><span className="text-sm text-slate-400">Správce úloh a paměť</span></span>
          <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#ram</div></button>

          <button
            onClick={onStartShortcutNinja}
            className="group relative px-8 py-8 bg-white hover:bg-slate-50 text-slate-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-4 overflow-hidden border-4 border-slate-100 hover:border-slate-300"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-slate-600" />
            </div>
            <span className="text-xl uppercase tracking-widest text-slate-700 text-center">Zkratkový Ninja<br/><span className="text-sm text-slate-400">Mistr klávesnice</span></span>
          <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#nin</div></button>
        </div>
      </div>
    </div>
  );
};

export default OsMenu;
