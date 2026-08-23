import React from 'react';
import { ArrowLeft, HardDrive, Cpu, Zap, FolderSearch, Wrench } from 'lucide-react';

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
    <div className="max-w-4xl w-full animate-in fade-in duration-1000 px-4">
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
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-sky-500 to-cyan-400 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-sky-200">
            <HardDrive className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600">
            Základy Počítače
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">
          Hardware a struktura paměti
        </p>

        <div className="grid grid-cols-1 gap-6 w-full max-w-2xl">
          <button
            onClick={onStartPcBuilder}
            className="group relative px-6 py-5 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-3xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-start gap-6 overflow-hidden border-4 border-gray-50 hover:border-sky-100"
          >
            <div className="w-14 h-14 bg-sky-50 rounded-2xl flex flex-shrink-0 items-center justify-center group-hover:rotate-6 transition-transform">
              <Cpu className="w-7 h-7 text-sky-600" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-xl uppercase tracking-widest text-sky-800">1. Stavba počítače</h3>
              <p className="text-sm text-gray-500 font-medium mt-1 normal-case tracking-normal">Procesor, RAM, Disky a Grafická karta. Kde mají své místo a co dělají?</p>
            </div>
          </button>

          <button
            onClick={onStartDataJourney}
            className="group relative px-6 py-5 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-3xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-start gap-6 overflow-hidden border-4 border-gray-50 hover:border-amber-100"
          >
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex flex-shrink-0 items-center justify-center group-hover:-rotate-6 transition-transform">
              <Zap className="w-7 h-7 text-amber-500" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-xl uppercase tracking-widest text-amber-700">2. Cesta dat (Výpadek proudu)</h3>
              <p className="text-sm text-gray-500 font-medium mt-1 normal-case tracking-normal">Jaký je rozdíl mezi dočasnou (RAM) a trvalou (Pevný disk) pamětí počítače?</p>
            </div>
          </button>

          <button
            onClick={onStartHwSwSorter}
            className="group relative px-6 py-5 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-3xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-start gap-6 overflow-hidden border-4 border-gray-50 hover:border-teal-100"
          >
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex flex-shrink-0 items-center justify-center group-hover:rotate-6 transition-transform">
              <FolderSearch className="w-7 h-7 text-teal-600" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-xl uppercase tracking-widest text-teal-800">3. HW vs. SW Třídička</h3>
              <p className="text-sm text-gray-500 font-medium mt-1 normal-case tracking-normal">Které díly jdou vzít do ruky, a které jsou jen jedničky a nuly na disku?</p>
            </div>
          </button>

          <button
            onClick={onStartCustomPcBuilder}
            className="group relative px-6 py-5 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-3xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-start gap-6 overflow-hidden border-4 border-gray-50 hover:border-rose-100"
          >
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex flex-shrink-0 items-center justify-center group-hover:rotate-6 transition-transform">
              <Wrench className="w-7 h-7 text-rose-600" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-xl uppercase tracking-widest text-rose-800">4. Stavba na zakázku</h3>
              <p className="text-sm text-gray-500 font-medium mt-1 normal-case tracking-normal">Postav PC podle požadavků zákazníka a rozpočtu.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HardwareMenu;
