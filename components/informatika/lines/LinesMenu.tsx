
import React from 'react';
import { ArrowLeft, Shapes, PencilRuler, PenTool, Puzzle } from 'lucide-react';

interface LinesMenuProps {
  onShapePuzzle: () => void;
  onVectorDrawing: () => void;
  onLineDrawing: () => void;
  onBack: () => void;
}

const LinesMenu: React.FC<LinesMenuProps> = ({ onShapePuzzle, onVectorDrawing, onLineDrawing, onBack }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-indigo-600 transition-colors font-bold uppercase text-sm tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět na úvod
        </button>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-indigo-100 mb-10">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-lg">
            <Shapes className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-black text-gray-800 mb-4 tracking-tight uppercase">
          Geometrické kreslení
        </h1>
        <p className="text-gray-500 mb-0 text-xl font-medium">
          Objevuj svět bodů, úseček a skládaček.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        <button
          onClick={onShapePuzzle}
          className="group relative px-8 py-10 bg-white hover:bg-orange-50 text-orange-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-orange-200"
        >
          <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Puzzle className="w-10 h-10 text-orange-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Skládání tvarů</h3>
            <p className="text-orange-500/60 font-bold text-[10px] uppercase tracking-widest mt-1">Skládání obrazců z prvků</p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#shp</div></button>

        <button
          onClick={onVectorDrawing}
          className="group relative px-8 py-10 bg-white hover:bg-indigo-50 text-indigo-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-indigo-200"
        >
          <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <PencilRuler className="w-10 h-10 text-indigo-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Kreslení bodů</h3>
            <p className="text-indigo-500/60 font-bold text-[10px] uppercase tracking-widest mt-1">Zadávání samostatných bodů</p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#vec</div></button>

        <button
          onClick={onLineDrawing}
          className="group relative px-8 py-10 bg-white hover:bg-purple-50 text-purple-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-purple-200"
        >
          <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center group-hover:-rotate-12 transition-transform">
            <PenTool className="w-10 h-10 text-purple-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Kreslení úseček</h3>
            <p className="text-purple-500/60 font-bold text-[10px] uppercase tracking-widest mt-1">Body spojené do úseček</p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#lnd</div></button>
      </div>
    </div>
  );
};

export default LinesMenu;
