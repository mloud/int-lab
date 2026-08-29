import React from 'react';
import { Sparkles, ArrowRight, Binary, Cpu, Laptop } from 'lucide-react';

interface SubjectSelectionProps {
  onSelectInformatika: () => void;
  onSelectSpecializovana: () => void;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  onSelectInformatika,
  onSelectSpecializovana,
}) => {
  return (
    <div className="max-w-4xl w-full animate-in fade-in duration-1000 px-4">
      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-20 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative mb-10">
          <div className="w-32 h-32 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200 animate-bounce-subtle">
            <Laptop className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg rotate-12">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Výukový portál
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Vyberte si předmět
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
          {/* Informatika Card */}
          <button
            onClick={onSelectInformatika}
            className="group relative p-8 bg-white hover:bg-gray-50 text-left rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col justify-between overflow-hidden border-4 border-gray-50 hover:border-blue-100 min-h-[220px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform mb-6">
                <Binary className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-black text-blue-700 uppercase tracking-wider mb-2">
                Obecná informatika
              </h2>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Kódování barev, vektorové kreslení, komprese dat, binární čísla a grafové modely.
              </p>
            </div>
            <div className="flex justify-end w-full mt-4">
              <span className="text-blue-500 font-bold flex items-center gap-1 text-sm uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                Vstoupit <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#inf</div></button>

          {/* Specializovaná informatika Card */}
          <button
            onClick={onSelectSpecializovana}
            className="group relative p-8 bg-white hover:bg-gray-50 text-left rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col justify-between overflow-hidden border-4 border-gray-50 hover:border-purple-100 min-h-[220px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div>
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:-rotate-6 transition-transform mb-6">
                <Cpu className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-black text-purple-700 uppercase tracking-wider mb-2">
                Specializovaná IT
              </h2>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Operační systémy, struktury na disku, simulátory paměti, vnitřní architektura procesoru a další.
              </p>
            </div>
            <div className="flex justify-end w-full mt-4">
              <span className="text-purple-500 font-bold flex items-center gap-1 text-sm uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                Vstoupit <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#spe</div></button>
        </div>
      </div>
      
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SubjectSelection;
