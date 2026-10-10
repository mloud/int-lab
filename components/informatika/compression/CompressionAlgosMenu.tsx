import React from 'react';
import { ArrowLeft, BoxSelect } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <TechnicalCard
          tag="#huf"
          title="Huffmanovo kódování"
          description="Algoritmus pro optimální bezeztrátovou kompresi dat pomocí frekvenčního binárního stromu."
          icon={BoxSelect}
          gradient="from-emerald-500 to-teal-600"
          actionLabel="Spustit algoritmus"
          onClick={() => onStartHuffman?.()}
        />
      </div>
    </div>
  );
};

export default CompressionAlgosMenu;

