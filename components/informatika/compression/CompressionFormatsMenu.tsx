import React from 'react';
import { ArrowLeft, FileArchive, Settings, FileText, Image as ImageIcon, Zap, Layers } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

interface CompressionFormatsMenuProps {
  onStartImageCompression?: () => void;
  onStartRle?: () => void;
  onStartSize?: () => void;
  onStartJpeg?: () => void;
  onStartText?: () => void;
  onBack: () => void;
}

const CompressionFormatsMenu: React.FC<CompressionFormatsMenuProps> = ({ 
  onStartImageCompression, 
  onStartRle,
  onStartSize,
  onStartJpeg,
  onStartText,
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
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-orange-200 mb-8">
          <FileArchive className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          Komprese <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">(pokročilejší)</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">
          Jak se kódují a zmenšují obrázky a texty?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="img"
            title="Kódování obrazu"
            description="Pixely, rastrová mřížka, bitová hloubka a výpočet velikosti nekomprimovaného obrázku."
            icon={ImageIcon}
            gradient="from-blue-500 to-indigo-500"
            onClick={onStartImageCompression || (() => {})}
          />
          <TechnicalCard
            tag="rle"
            title="RLE Komprese"
            description="Běhové kódování (Run-Length Encoding) – bezeztrátová metoda zmenšení opakujících se dat."
            icon={Layers}
            gradient="from-emerald-500 to-teal-500"
            onClick={onStartRle || (() => {})}
          />
          <TechnicalCard
            tag="ims"
            title="Výpočty velikosti"
            description="Kolik místa soubor zabere na disku? Převody jednotek a praktické výpočty kapacit."
            icon={Settings}
            gradient="from-amber-500 to-orange-500"
            onClick={onStartSize || (() => {})}
          />
          <TechnicalCard
            tag="jpg"
            title="Simulace komprese"
            description="Ztrátová komprese JPEG v reálném čase. Vyzkoušej, kde lidské oko ještě nepozná ztrátu detailů."
            icon={Zap}
            gradient="from-purple-500 to-pink-500"
            onClick={onStartJpeg || (() => {})}
          />
          <TechnicalCard
            tag="txt"
            title="Krokovaná komprese"
            description="Podívej se krok za krokem, jak se z textového řetězce stane binární kód a jak se zmenší."
            icon={FileText}
            gradient="from-sky-500 to-blue-600"
            onClick={onStartText || (() => {})}
          />
        </div>
      </div>
    </div>
  );
};

export default CompressionFormatsMenu;
