import React from 'react';
import { ArrowLeft, BoxSelect } from 'lucide-react';

interface CompressionAlgosMenuProps {
  onStartHuffman?: () => void;
  onBack: () => void;
}

const CompressionAlgosMenu: React.FC<CompressionAlgosMenuProps> = ({ 
  onStartHuffman,
  onBack 
}) => {
  return (
    <div className="max-w-6xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-emerald-600 transition-colors font-bold uppercase text-sm tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Zpět na úvod
        </button>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-emerald-50 mb-10">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <BoxSelect className="w-12 h-12 text-emerald-600" />
          </div>
        </div>

        <h1 className="text-5xl font-black text-gray-800 mb-4 tracking-tight uppercase">
          Komprese Algoritmy
        </h1>
        <p className="text-gray-500 mb-0 text-xl font-medium">
          Pokročilé metody zmenšování dat
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <button
          onClick={onStartHuffman}
          className="group relative px-6 py-12 bg-white hover:bg-emerald-50 text-emerald-900 font-black rounded-3xl shadow-md transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-6 overflow-hidden border-2 border-gray-100 hover:border-emerald-200"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-3xl font-black text-emerald-600">H</span>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black uppercase tracking-tight">Huffmanovo kódování</h3>
            <p className="text-emerald-500/60 font-bold text-xs uppercase tracking-widest mt-2 leading-relaxed">
              Algoritmus pro optimální kompresi dat
            </p>
          </div>
          <div className="absolute top-4 right-4 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#huf</div>
        </button>
      </div>
    </div>
  );
};

export default CompressionAlgosMenu;
