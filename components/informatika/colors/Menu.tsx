
import React from 'react';
import { Palette, Rocket, Cat, Monitor, Zap, ArrowLeft } from 'lucide-react';
import { Difficulty } from '../../../types';

interface MenuProps {
  onStart: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStart, onBack }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět na úvod
        </button>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-blue-100 mb-10">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-lg">
            <Palette className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-black text-gray-800 mb-4 tracking-tight uppercase">
          Vyber si úroveň
        </h1>
        <p className="text-gray-500 mb-0 text-xl font-medium">
          Každá úroveň skrývá jiný obrázek k odhalení.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Easy */}
        <button
          onClick={() => onStart('easy')}
          className="group bg-white p-8 rounded-[2.5rem] shadow-md border-2 border-green-50 hover:border-green-400 hover:shadow-xl transition-all flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Rocket className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Raketa</h3>
          <p className="text-green-600 font-bold text-sm mb-4 uppercase tracking-widest flex items-center">
            <Zap className="w-3 h-3 mr-1" /> Snadná
          </p>
          <span className="bg-gray-100 px-4 py-1 rounded-full text-xs font-bold text-gray-500">10 ČÁSTÍ</span>
        </button>

        {/* Medium */}
        <button
          onClick={() => onStart('medium')}
          className="group bg-white p-8 rounded-[2.5rem] shadow-md border-2 border-orange-50 hover:border-orange-400 hover:shadow-xl transition-all flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Cat className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Kočka</h3>
          <p className="text-orange-600 font-bold text-sm mb-4 uppercase tracking-widest flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            <Zap className="w-3 h-3 mr-1" /> Střední
          </p>
          <span className="bg-gray-100 px-4 py-1 rounded-full text-xs font-bold text-gray-500">15 ČÁSTÍ</span>
        </button>

        {/* Hard */}
        <button
          onClick={() => onStart('hard')}
          className="group bg-white p-8 rounded-[2.5rem] shadow-md border-2 border-red-50 hover:border-red-400 hover:shadow-xl transition-all flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Monitor className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Počítač</h3>
          <p className="text-red-600 font-bold text-sm mb-4 uppercase tracking-widest flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            <Zap className="w-3 h-3 mr-1" />
            <Zap className="w-3 h-3 mr-1" /> Těžká
          </p>
          <span className="bg-gray-100 px-4 py-1 rounded-full text-xs font-bold text-gray-500">20 ČÁSTÍ</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
