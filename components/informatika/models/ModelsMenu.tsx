
import React from 'react';
import { ArrowLeft, Share2, Network, ArrowRight, Map } from 'lucide-react';

interface ModelsMenuProps {
  onStartGraphs: () => void;
  onStartPathFinding: () => void;
  onStartBlatov: () => void;
  onStartMST: () => void;
  onStartParallel: () => void;
  onBack: () => void;
}

const ModelsMenu: React.FC<ModelsMenuProps> = ({ onStartGraphs, onStartPathFinding, onStartBlatov, onStartMST, onStartParallel, onBack }) => {
  return (
    <div className="max-w-6xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-purple-600 transition-colors font-bold uppercase text-sm tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět na úvod
        </button>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-purple-100 mb-10 max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-lg">
            <Share2 className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-black text-gray-800 mb-4 tracking-tight uppercase">
          Modely
        </h1>
        <p className="text-gray-500 mb-0 text-xl font-medium">
          Zkoumej, jak zjednodušit a modelovat reálný svět.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <button
          onClick={onStartGraphs}
          className="group relative px-6 py-10 bg-white hover:bg-purple-50 text-purple-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-purple-200"
        >
          <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <Network className="w-10 h-10 text-purple-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Jízdní řád</h3>
            <p className="text-purple-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Ohodnocené grafy
            </p>
          </div>
          <ArrowRight className="absolute bottom-6 right-6 w-6 h-6 text-purple-300 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onStartPathFinding}
          className="group relative px-6 py-10 bg-white hover:bg-purple-50 text-purple-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-purple-200"
        >
          <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Share2 className="w-10 h-10 text-purple-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Hledání tras</h3>
            <p className="text-purple-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Všechny cesty v grafu
            </p>
          </div>
          <ArrowRight className="absolute bottom-6 right-6 w-6 h-6 text-purple-300 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onStartBlatov}
          className="group relative px-6 py-10 bg-white hover:bg-purple-50 text-purple-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-purple-200"
        >
          <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center group-hover:rotate-[-6deg] transition-transform">
            <Map className="w-10 h-10 text-purple-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Blátov</h3>
            <p className="text-purple-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Kostra grafu
            </p>
          </div>
          <ArrowRight className="absolute bottom-6 right-6 w-6 h-6 text-purple-300 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onStartMST}
          className="group relative px-6 py-10 bg-white hover:bg-purple-50 text-purple-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-purple-200"
        >
          <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <Network className="w-10 h-10 text-purple-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Minimální kostra</h3>
            <p className="text-purple-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Nejlevnější propojení
            </p>
          </div>
          <ArrowRight className="absolute bottom-6 right-6 w-6 h-6 text-purple-300 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onStartParallel}
          className="group relative px-6 py-10 bg-white hover:bg-purple-50 text-purple-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-purple-200"
        >
          <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center group-hover:rotate-[-6deg] transition-transform">
            <Share2 className="w-10 h-10 text-purple-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Paralelní procesy</h3>
            <p className="text-purple-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Petriho sítě
            </p>
          </div>
          <ArrowRight className="absolute bottom-6 right-6 w-6 h-6 text-purple-300 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ModelsMenu;
