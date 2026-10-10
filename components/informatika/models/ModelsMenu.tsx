import React from 'react';
import { ArrowLeft, Share2, Network, Map, GitFork } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface ModelsMenuProps {
  onStartGraphs: () => void;
  onStartPathFinding: () => void;
  onStartBlatov: () => void;
  onStartMST: () => void;
  onStartParallel: () => void;
  onBack: () => void;
}

const ModelsMenu: React.FC<ModelsMenuProps> = ({ 
  onStartGraphs, 
  onStartPathFinding, 
  onStartBlatov, 
  onStartMST, 
  onStartParallel, 
  onBack 
}) => {
  return (
    <div className="max-w-6xl w-full animate-in fade-in duration-500 px-4">
      <div className="flex justify-start mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center text-center relative overflow-hidden mb-10">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-purple-200 mb-8">
          <Share2 className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          Modely <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">a sítě</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">
          Zkoumej, jak zjednodušit a modelovat reálný svět
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="tim"
            title="Jízdní řád"
            description="Ohodnocené grafy a kolize: Vytvoř optimální model rozvrhu a vyřeš časové konflikty."
            icon={Network}
            gradient="from-purple-500 to-indigo-500"
            onClick={onStartGraphs}
          />
          <TechnicalCard
            tag="pat"
            title="Hledání tras"
            description="Algoritmy hledání cest: Najdi nejkratší spojení mezi uzly v síti (Dijkstrův princip)."
            icon={Share2}
            gradient="from-blue-500 to-cyan-500"
            onClick={onStartPathFinding}
          />
          <TechnicalCard
            tag="bla"
            title="Blátov"
            description="Klasický problém mostů a cest: Eulerovský tah jedním tahem bez opakování hran."
            icon={Map}
            gradient="from-amber-500 to-orange-500"
            onClick={onStartBlatov}
          />
          <TechnicalCard
            tag="mst"
            title="Minimální kostra"
            description="Nejlevnější propojení měst a sítí: Hledání minimální kostry grafu bez cyklů."
            icon={Network}
            gradient="from-emerald-500 to-teal-500"
            onClick={onStartMST}
          />
          <TechnicalCard
            tag="par"
            title="Paralelní procesy"
            description="Petriho sítě: Modelování současně běžících procesů, front a synchronizace úloh."
            icon={GitFork}
            gradient="from-rose-500 to-pink-500"
            onClick={onStartParallel}
          />
        </div>
      </div>
    </div>
  );
};

export default ModelsMenu;
