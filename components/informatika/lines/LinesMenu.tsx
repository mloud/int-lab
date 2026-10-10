import React from 'react';
import { ArrowLeft, Shapes, PencilRuler, PenTool, Puzzle } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface LinesMenuProps {
  onShapePuzzle: () => void;
  onVectorDrawing: () => void;
  onLineDrawing: () => void;
  onBack: () => void;
}

const LinesMenu: React.FC<LinesMenuProps> = ({ onShapePuzzle, onVectorDrawing, onLineDrawing, onBack }) => {
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
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200 mb-8">
          <Shapes className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          Geometrické <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">kreslení</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">
          Objevuj svět bodů, úseček a skládaček
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="shp"
            title="Skládání tvarů"
            description="Procvič si prostorovou představivost a skládání složitějších geometrických obrazců z prvků."
            icon={Puzzle}
            gradient="from-orange-500 to-amber-500"
            actionLabel="Spustit hru"
            onClick={onShapePuzzle}
          />
          <TechnicalCard
            tag="vec"
            title="Kreslení bodů"
            description="Zadávání samostatných bodů do souřadnicového systému a vektorové kreslení na plátně."
            icon={PencilRuler}
            gradient="from-indigo-500 to-blue-500"
            actionLabel="Spustit kreslení"
            onClick={onVectorDrawing}
          />
          <TechnicalCard
            tag="lnd"
            title="Kreslení úseček"
            description="Spojování zadaných bodů do úseček, polygonů a tvorba vektorových čárových obrázků."
            icon={PenTool}
            gradient="from-purple-500 to-pink-500"
            actionLabel="Spustit kreslení"
            onClick={onLineDrawing}
          />
        </div>
      </div>
    </div>
  );
};

export default LinesMenu;
