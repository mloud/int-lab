import React from 'react';
import { ArrowLeft, Code, FolderOpen } from 'lucide-react';

interface ProgramovaniMenuProps {
  onBack: () => void;
  onStartProjects: () => void;
}

const ProgramovaniMenu: React.FC<ProgramovaniMenuProps> = ({ onBack, onStartProjects }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na výběr předmětu
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <Code className="w-10 h-10 text-emerald-600 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Programování a vývoj her
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl font-medium">
          Vyber si oblast programování nebo si projdi jednotlivé projekty a nauč se vytvářet vlastní aplikace a hry.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Projekty */}
          <div className="relative group p-6 bg-emerald-50/50 rounded-3xl border-2 border-emerald-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-emerald-50">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-emerald-50 transition-colors">#prm</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-emerald-700 mb-1 uppercase tracking-wider text-sm">Projekty</h3>
              <p className="text-xs text-gray-600">Galerie výukových projektů, her a aplikací krok za krokem.</p>
            </div>
            <button
              onClick={onStartProjects}
              className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20"
            >
              Zobrazit projekty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramovaniMenu;
