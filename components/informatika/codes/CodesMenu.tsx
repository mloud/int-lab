import React from 'react';
import { ArrowLeft, ArrowRight, ScanLine } from 'lucide-react';

interface CodesMenuProps {
  onStartLaundryGame: () => void;
  onStartEmojiGame: () => void;
  onStartCountryCodesGame: () => void;
  onBack: () => void;
}

const CodesMenu: React.FC<CodesMenuProps> = ({
  onStartLaundryGame,
  onStartEmojiGame,
  onStartCountryCodesGame,
  onBack,
}) => {
  return (
    <div className="max-w-4xl w-full animate-in fade-in duration-1000 px-4">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na výběr tématu
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-20 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Dekorační prvky */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative mb-10">
          <div className="w-32 h-32 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200">
            <ScanLine className="w-16 h-16 text-white" />
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Kódy
          </span>
          <br />kolem nás
        </h1>

        <p className="text-xl sm:text-2xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Výběr aktivity
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
          <button
            onClick={onStartLaundryGame}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-indigo-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <ScanLine className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-indigo-700">
                Prací symboly
              </span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-indigo-400" />
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-indigo-50 transition-colors">
              #lau
            </div>
          </button>

          <button
            onClick={onStartEmojiGame}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-yellow-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center group-hover:-rotate-6 transition-transform">
                <span className="text-2xl">😀</span>
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-yellow-700">
                Smajlíci a emoce
              </span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-yellow-400" />
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-yellow-50 transition-colors">
              #emo
            </div>
          </button>

          <button
            onClick={onStartCountryCodesGame}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-blue-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform text-blue-600 font-black">
                CZ
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-blue-700">
                Kódy států
              </span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-blue-400" />
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">
              #sta
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodesMenu;
