import React from 'react';
import { ArrowLeft, Cpu, ArrowRight, Code } from 'lucide-react';

interface SpecializovanaMenuProps {
  onBack: () => void;
  onStartOperacniSystemy: () => void;
  onStartProgramming: () => void;
}

const SpecializovanaMenu: React.FC<SpecializovanaMenuProps> = ({ onBack, onStartOperacniSystemy, onStartProgramming }) => {
  return (
    <div className="max-w-4xl w-full animate-in fade-in duration-1000 px-4">
      
      
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-5xl">
          <button
            onClick={onStartOperacniSystemy}
            className="group relative px-4 sm:px-6 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-purple-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 sm:gap-4 relative w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform shrink-0">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <span className="text-sm sm:text-base lg:text-sm xl:text-base uppercase tracking-normal text-purple-700 text-left leading-tight break-words flex-1">Operační<br/>systémy 1</span>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative text-purple-400 shrink-0 ml-2" />
          <div className="absolute top-2 right-2 text-[9px] font-mono font-bold text-gray-400 bg-white/80 px-1.5 py-0.5 rounded border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-purple-50 transition-colors">#ops1</div></button>

          <button
            onClick={() => {}}
            className="group relative px-4 sm:px-6 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-blue-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 sm:gap-4 relative w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform shrink-0">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <span className="text-sm sm:text-base lg:text-sm xl:text-base uppercase tracking-normal text-blue-700 text-left leading-tight break-words flex-1">Operační<br/>systémy 2</span>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative text-blue-400 shrink-0 ml-2" />
          <div className="absolute top-2 right-2 text-[9px] font-mono font-bold text-gray-400 bg-white/80 px-1.5 py-0.5 rounded border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#ops2</div></button>
          
          <button
            onClick={onStartProgramming}
            className="group relative px-4 sm:px-6 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-emerald-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 sm:gap-4 relative w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform shrink-0">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              </div>
              <span className="text-sm sm:text-base lg:text-sm xl:text-base uppercase tracking-normal text-emerald-700 text-left leading-tight break-words flex-1">Programování<br/><span className="text-xs sm:text-sm text-emerald-500">a vývoj her</span></span>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative text-emerald-400 shrink-0 ml-2" />
            <div className="absolute top-2 right-2 text-[9px] font-mono font-bold text-gray-400 bg-white/80 px-1.5 py-0.5 rounded border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-emerald-50 transition-colors">#prg</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecializovanaMenu;
