import React from 'react';
import { ArrowLeft, Cpu, ArrowRight } from 'lucide-react';

interface SpecializovanaMenuProps {
  onBack: () => void;
  onStartOperacniSystemy: () => void;
}

const SpecializovanaMenu: React.FC<SpecializovanaMenuProps> = ({ onBack, onStartOperacniSystemy }) => {
  return (
    <div className="max-w-4xl w-full animate-in fade-in duration-1000 px-4">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na výběr předmětu
        </button>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-20 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Dekorační prvky na pozadí */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative mb-10">
          <div className="w-32 h-32 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-purple-200">
            <Cpu className="w-16 h-16 text-white" />
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Specializovaná
          </span>
          <br/> Informatika
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Odborná témata
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          <button
            onClick={onStartOperacniSystemy}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-purple-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Cpu className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-purple-700">Operační systémy</span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-purple-400" />
          </button>
          
          {/* Prostor pro další předměty v budoucnu */}
          <div className="px-8 py-6 bg-gray-50 border-4 border-gray-100 rounded-[2.5rem] flex items-center justify-center text-gray-400 font-bold uppercase tracking-wider opacity-50 border-dashed">
            Další témata připravujeme...
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializovanaMenu;
