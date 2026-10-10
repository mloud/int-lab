import React from 'react';
import { ArrowLeft, Monitor, Power, FileText, Activity, Zap } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface OsMenuProps {
  onBack: () => void;
  onStartMatchGame: () => void;
  onStartBootSequence: () => void;
  onStartFileExtension: () => void;
  onStartRamManager: () => void;
  onStartShortcutNinja: () => void;
}

const OsMenu: React.FC<OsMenuProps> = ({ 
  onBack, 
  onStartMatchGame, 
  onStartBootSequence, 
  onStartFileExtension, 
  onStartRamManager, 
  onStartShortcutNinja 
}) => {
  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-1000 px-4">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-slate-200/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gray-200/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-slate-600 to-gray-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-slate-200 mb-8">
          <Monitor className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          Operační <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-600">Systémy</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Základy pro běžného uživatele
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="mat"
            title="Kdo je kdo?"
            description="Přehled a porovnání nejrozšířenějších systémů (Windows, Linux, macOS, Android, iOS)."
            icon={Monitor}
            gradient="from-slate-600 to-gray-700"
            onClick={onStartMatchGame}
          />
          <TechnicalCard
            tag="boo"
            title="Start Počítače"
            description="Co se děje po stisknutí tlačítka napájení? Bootovací proces od BIOSu/UEFI po plochu."
            icon={Power}
            gradient="from-blue-600 to-indigo-600"
            onClick={onStartBootSequence}
          />
          <TechnicalCard
            tag="ext"
            title="Detektiv Přípona"
            description="Jak operační systém pozná, v čem soubor otevřít? Přípony .exe, .docx, .png a jejich asociace."
            icon={FileText}
            gradient="from-emerald-600 to-teal-600"
            onClick={onStartFileExtension}
          />
          <TechnicalCard
            tag="ram"
            title="Krotitel RAMky"
            description="Správce úloh v praxi. Sleduj běžící procesy, zátěž procesoru a hospodaření s pamětí RAM."
            icon={Activity}
            gradient="from-purple-600 to-pink-600"
            onClick={onStartRamManager}
          />
          <TechnicalCard
            tag="nin"
            title="Zkratkový Ninja"
            description="Staň se mistrem klávesnice. Důležité klávesové zkratky, které ti ušetří hodiny práce."
            icon={Zap}
            gradient="from-amber-500 to-orange-500"
            onClick={onStartShortcutNinja}
          />
        </div>
      </div>
    </div>
  );
};

export default OsMenu;
