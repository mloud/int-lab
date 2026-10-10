import React from 'react';
import { ArrowLeft, HardDrive, Cpu, Zap, FolderSearch, Wrench } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface HardwareMenuProps {
  onBack: () => void;
  onStartPcBuilder: () => void;
  onStartDataJourney: () => void;
  onStartHwSwSorter: () => void;
  onStartCustomPcBuilder: () => void;
}

const HardwareMenu: React.FC<HardwareMenuProps> = ({ 
  onBack, 
  onStartPcBuilder, 
  onStartDataJourney, 
  onStartHwSwSorter,
  onStartCustomPcBuilder
}) => {
  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-1000 px-4">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-sky-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative mb-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-sky-500 to-cyan-400 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-sky-200">
            <HardDrive className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600">
            Součásti Počítače
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">
          Hardware a struktura paměti
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl">
          <TechnicalCard
            tag="pcb"
            title="Stavba počítače"
            description="Procesor, RAM, Disky a Grafická karta. Kde mají své místo v počítačové skříni a co dělají?"
            icon={Cpu}
            gradient="from-sky-500 to-cyan-500"
            onClick={onStartPcBuilder}
          />
          <TechnicalCard
            tag="dtj"
            title="Cesta dat (Výpadek proudu)"
            description="Jaký je rozdíl mezi dočasnou (RAM) a trvalou (Pevný disk) pamětí počítače při toku dat?"
            icon={Zap}
            gradient="from-amber-500 to-orange-500"
            onClick={onStartDataJourney}
          />
          <TechnicalCard
            tag="hws"
            title="HW vs. SW Třídička"
            description="Které díly jdou vzít do ruky, a které jsou naopak jen jedničky a nuly uložené na disku?"
            icon={FolderSearch}
            gradient="from-teal-500 to-emerald-500"
            onClick={onStartHwSwSorter}
          />
          <TechnicalCard
            tag="pcc"
            title="Stavba na zakázku"
            description="Postav optimální počítačovou sestavu podle požadavků náročného zákazníka a rozpočtu."
            icon={Wrench}
            gradient="from-rose-500 to-pink-500"
            onClick={onStartCustomPcBuilder}
          />
        </div>
      </div>
    </div>
  );
};

export default HardwareMenu;
