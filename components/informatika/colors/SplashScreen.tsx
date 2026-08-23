
import React from 'react';
import { Palette, Play, BrainCircuit, ArrowLeft } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
  onQuiz: () => void;
  onBack: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter, onQuiz, onBack }) => {
  return (
    <div className="max-w-md w-full animate-in fade-in zoom-in duration-700">
      <div className="flex justify-start mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Hlavní stránka
        </button>
      </div>

      <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl border-4 border-white ring-1 ring-gray-100 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-blue-200 rotate-3">
          <Palette className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-black text-gray-800 mb-2 tracking-tighter uppercase leading-tight">
          Kódování barev
        </h1>
        <p className="text-gray-500 mb-8 font-medium leading-relaxed">
          Staň se mistrem barev a odhal skrytá tajemství digitálního světa.
        </p>

        <div className="w-full flex flex-col gap-4">
          <button
            onClick={onEnter}
            className="group relative w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[2rem] shadow-xl shadow-blue-100 transition-all hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative flex items-center text-md uppercase tracking-widest">
              Malování podle RGB
              <Play className="ml-3 w-5 h-5 fill-current" />
            </span>
          </button>

          <button
            onClick={onQuiz}
            className="group relative w-full py-5 bg-white hover:bg-gray-50 text-blue-600 font-black rounded-[2rem] shadow-lg border-2 border-blue-50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            <span className="flex items-center text-md uppercase tracking-widest">
              Hádání barev
              <BrainCircuit className="ml-3 w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
