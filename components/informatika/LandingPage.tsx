
import React from 'react';
import { Sparkles, ArrowRight, Binary, Shapes, BoxSelect, ArrowLeft, HardDrive, Monitor } from 'lucide-react';

interface LandingPageProps {
  onStartColors: () => void;
  onStartLines: () => void;
  onStartCompression: () => void;
  onStartCompressionFormats: () => void;
  onStartBinary: () => void;
  onStartDataUnits: () => void;
  onStartModels: () => void;
  onStartHardware: () => void;
  onStartOs: () => void;
  onBack: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartColors, onStartLines, onStartCompression, onStartCompressionFormats, onStartBinary, onStartDataUnits, onStartModels, onStartHardware, onStartOs, onBack }) => {
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
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative mb-10">
          <div className="w-32 h-32 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200 animate-bounce-subtle">
            <Binary className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg rotate-12">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        <h1 className="text-6xl sm:text-8xl font-black text-gray-900 mb-6 tracking-tighter leading-none uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Informatika
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.2em]">
          Interaktivní úlohy
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          <button
            onClick={onStartColors}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-blue-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Binary className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-blue-700">Kódování barev</span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-blue-400" />
          </button>

          <button
            onClick={onStartLines}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-indigo-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:-rotate-6 transition-transform">
                <Shapes className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-indigo-700">Obrázek z čar</span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-indigo-400" />
          </button>

          <button
            onClick={onStartCompression}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-emerald-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <BoxSelect className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-emerald-700">Komprese a kontrola</span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-emerald-400" />
          </button>

          <button
            onClick={onStartCompressionFormats}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-orange-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <BoxSelect className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-orange-700">Komprese a formáty souborů</span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-orange-400" />
          </button>

          <button
            onClick={onStartModels}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-purple-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Shapes className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-purple-700">Modely</span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-purple-400" />
          </button>

          <button
            onClick={onStartBinary}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-amber-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Binary className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-amber-700">Binární čísla</span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-amber-400" />
          </button>

          <button
            onClick={onStartDataUnits}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-fuchsia-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-fuchsia-50 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <HardDrive className="w-6 h-6 text-fuchsia-600" />
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-fuchsia-700">Jednotky dat</span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-fuchsia-400" />
          </button>

          <button
            onClick={onStartHardware}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-sky-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <HardDrive className="w-6 h-6 text-sky-600" />
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-sky-700">Součásti počítače</span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-sky-400" />
          </button>

          <button
            onClick={onStartOs}
            className="group relative px-8 py-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between overflow-hidden border-4 border-gray-50 hover:border-slate-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-gray-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-5 relative">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Monitor className="w-6 h-6 text-slate-600" />
              </div>
              <span className="text-lg sm:text-xl uppercase tracking-widest text-slate-700">Operační systémy</span>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative text-slate-400" />
          </button>
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

export default LandingPage;
