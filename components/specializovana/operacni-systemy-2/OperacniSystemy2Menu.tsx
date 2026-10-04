import React from 'react';
import { ArrowLeft, Cpu, Save } from 'lucide-react';

interface OperacniSystemy2MenuProps {
  onBack: () => void;
  onStartBackup: () => void;
}

const OperacniSystemy2Menu: React.FC<OperacniSystemy2MenuProps> = ({ onBack, onStartBackup }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center">
        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <Cpu className="w-10 h-10 text-blue-600 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Operační systémy 2
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl font-medium">
          Pokračování do hlubší správy OS a údržby dat.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {/* Karta 1: Zálohování */}
          <div className="relative group p-6 bg-purple-50/50 rounded-3xl border-2 border-purple-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-purple-50">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-purple-50 transition-colors">#zal</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <Save className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-purple-700 mb-1 uppercase tracking-wider text-sm">Zálohování</h3>
              <p className="text-xs text-gray-600">Principy, typy záloh a ochrana dat v operačním systému.</p>
            </div>
            <button
              onClick={onStartBackup}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20"
            >
              Otevřít kapitolu
            </button>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="mt-16 flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold uppercase tracking-widest text-sm transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Zpět na výběr tématu
        </button>
      </div>
    </div>
  );
};

export default OperacniSystemy2Menu;
