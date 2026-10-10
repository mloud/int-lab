import React from 'react';
import { ArrowLeft, Cpu, Save } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="zal"
            title="Zálohování"
            description="Principy, typy záloh a ochrana dat v operačním systému. Manuální i cloudové nástroje."
            icon={Save}
            gradient="from-purple-600 to-indigo-600"
            actionLabel="Otevřít kapitolu"
            onClick={onStartBackup}
            accentCorner={true}
          />
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
