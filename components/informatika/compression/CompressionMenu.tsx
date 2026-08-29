
import React from 'react';
import { ArrowLeft, BoxSelect, Image as ImageIcon, CheckCircle, FileText, ShieldCheck } from 'lucide-react';

interface CompressionMenuProps {
  onStartGame: () => void;
  onStartText: () => void;
  onStartChecksum: () => void;
  onBack: () => void;
}

const CompressionMenu: React.FC<CompressionMenuProps> = ({ onStartGame, onStartText, onStartChecksum, onBack }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-emerald-600 transition-colors font-bold uppercase text-sm tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět na úvod
        </button>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-emerald-100 mb-10">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-lg">
            <BoxSelect className="w-16 h-16 text-white" />
          </div>
        </div>

        <h1 className="text-5xl font-black text-gray-800 mb-4 tracking-tight uppercase">
          Komprese a kontrola
        </h1>
        <p className="text-gray-500 mb-0 text-xl font-medium">
          Zjisti, jak počítače šetří místo a ověřují správnost dat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <button
          onClick={onStartText}
          className="group relative px-6 py-10 bg-white hover:bg-blue-50 text-blue-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-blue-200"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <FileText className="w-10 h-10 text-blue-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Komprese textu</h3>
            <p className="text-blue-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Slovníková metoda
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#txc</div></button>

        <button
          onClick={onStartGame}
          className="group relative px-6 py-10 bg-white hover:bg-emerald-50 text-emerald-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-emerald-200"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <ImageIcon className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Komprese obrazu</h3>
            <p className="text-emerald-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Slučování pixelů
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#cpg</div></button>

        <button
          onClick={onStartChecksum}
          className="group relative px-6 py-10 bg-white hover:bg-amber-50 text-amber-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-amber-200"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center group-hover:-rotate-6 transition-transform">
            <ShieldCheck className="w-10 h-10 text-amber-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Kontrola</h3>
            <p className="text-amber-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Kontrolní součet
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#chk</div></button>
      </div>
    </div>
  );
};

export default CompressionMenu;
