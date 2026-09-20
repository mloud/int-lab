import React from 'react';
import { Sparkles, ArrowRight, Binary, Cpu } from 'lucide-react';

interface SubjectSelectionProps {
  onSelectInformatika: () => void;
  onSelectSpecializovana: () => void;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({
  onSelectInformatika,
  onSelectSpecializovana,
}) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-12 flex flex-col items-center justify-center animate-in fade-in duration-1000">
      
      {/* Decorative Light Background Orbs */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-purple-400/20 rounded-full blur-[100px] pointer-events-none translate-x-1/4 translate-y-1/4"></div>
      
      <div className="relative z-10 w-full flex flex-col items-center">
        
        <div className="mb-16 flex flex-col items-center text-center animate-in slide-in-from-top-8 duration-1000">
          <div className="inline-flex items-center justify-center p-4 bg-white/60 rounded-3xl border border-white/80 backdrop-blur-xl mb-8 shadow-xl">
            <Sparkles className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 mb-6 tracking-tighter uppercase drop-shadow-sm">
            Interaktivní Lab
          </h1>
          <p className="text-xl sm:text-2xl text-gray-500 font-black tracking-[0.3em] uppercase">
            Vyberte studijní obor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Informatika Card */}
          <button
            onClick={onSelectInformatika}
            className="group relative text-left outline-none animate-in slide-in-from-bottom-8 duration-1000 delay-100"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative h-full w-full bg-white/80 backdrop-blur-2xl p-10 sm:p-12 rounded-[3rem] overflow-hidden border-2 border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_60px_rgb(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col">
              
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                <Binary className="w-64 h-64 text-blue-600" />
              </div>
              
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-sm border border-blue-100">
                <Binary className="w-10 h-10" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-6 uppercase tracking-wide">
                Obecná informatika
              </h2>
              <p className="text-gray-500 font-medium text-lg leading-relaxed mb-12 relative z-10 flex-1">
                Kódování barev, vektorové kreslení, komprese dat, binární čísla a grafové modely.
              </p>
              
              <div className="flex items-center gap-3 text-blue-600 font-bold uppercase tracking-widest text-sm group-hover:text-blue-500 transition-colors">
                Vstoupit do laboratoře <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
              </div>
            </div>
          </button>

          {/* Specializovana Card */}
          <button
            onClick={onSelectSpecializovana}
            className="group relative text-left outline-none animate-in slide-in-from-bottom-8 duration-1000 delay-200"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-400 to-purple-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative h-full w-full bg-white/80 backdrop-blur-2xl p-10 sm:p-12 rounded-[3rem] overflow-hidden border-2 border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_60px_rgb(168,85,247,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col">
              
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                <Cpu className="w-64 h-64 text-purple-600" />
              </div>
              
              <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 shadow-sm border border-purple-100">
                <Cpu className="w-10 h-10" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-6 uppercase tracking-wide">
                Specializovaná IT
              </h2>
              <p className="text-gray-500 font-medium text-lg leading-relaxed mb-12 relative z-10 flex-1">
                Operační systémy, struktury na disku, simulátory paměti a vnitřní architektura procesoru.
              </p>
              
              <div className="flex items-center gap-3 text-purple-600 font-bold uppercase tracking-widest text-sm group-hover:text-purple-500 transition-colors">
                Vstoupit do laboratoře <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;
