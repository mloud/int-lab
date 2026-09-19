import React from 'react';
import { ArrowLeft, FileArchive, Settings, FileText, Image as ImageIcon } from 'lucide-react';

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
    <div className="max-w-6xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-orange-600 transition-colors font-bold uppercase text-sm tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Zpět na úvod
        </button>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-orange-50 mb-10">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center">
            <FileArchive className="w-12 h-12 text-orange-600" />
          </div>
        </div>

        <h1 className="text-5xl font-black text-gray-800 mb-4 tracking-tight uppercase">
          Komprese (pokročilejší)
        </h1>
        <p className="text-gray-500 mb-0 text-xl font-medium">
          Jak se kódují a zmenšují obrázky a texty?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* Sekce: Komprese obrazu */}
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border-4 border-emerald-50 flex flex-col gap-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-black text-emerald-900 uppercase tracking-tight">Komprese obrazu</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={onStartImageCompression}
              className="group relative px-4 py-8 bg-white hover:bg-blue-50 text-blue-900 font-black rounded-3xl shadow-md transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-3 overflow-hidden border-2 border-gray-100 hover:border-blue-200"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <span className="text-2xl font-black text-blue-600">1</span>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-black uppercase tracking-tight">Kódování obrazu</h3>
                <p className="text-blue-500/60 font-bold text-[9px] uppercase tracking-widest mt-1 leading-relaxed">
                  Pixely a bity
                </p>
              </div>
            <div className="absolute top-2 right-2 text-[10px] font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#img</div></button>

            <button
              onClick={onStartRle}
              className="group relative px-4 py-8 bg-white hover:bg-emerald-50 text-emerald-900 font-black rounded-3xl shadow-md transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-3 overflow-hidden border-2 border-gray-100 hover:border-emerald-200"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <span className="text-2xl font-black text-emerald-600">2</span>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-black uppercase tracking-tight">RLE Komprese</h3>
                <p className="text-emerald-500/60 font-bold text-[9px] uppercase tracking-widest mt-1 leading-relaxed">
                  Bezeztrátová komprese
                </p>
              </div>
            <div className="absolute top-2 right-2 text-[10px] font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#rle</div></button>

            <button
              onClick={onStartSize}
              className="group relative px-4 py-8 bg-white hover:bg-amber-50 text-amber-900 font-black rounded-3xl shadow-md transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-3 overflow-hidden border-2 border-gray-100 hover:border-amber-200"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <span className="text-2xl font-black text-amber-600">3</span>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-black uppercase tracking-tight">Výpočty velikosti</h3>
                <p className="text-amber-500/60 font-bold text-[9px] uppercase tracking-widest mt-1 leading-relaxed">
                  Kolik místa zabere?
                </p>
              </div>
            <div className="absolute top-2 right-2 text-[10px] font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#ims</div></button>

            <button
              onClick={onStartJpeg}
              className="group relative px-4 py-8 bg-white hover:bg-purple-50 text-purple-900 font-black rounded-3xl shadow-md transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-3 overflow-hidden border-2 border-gray-100 hover:border-purple-200"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <span className="text-2xl font-black text-purple-600">4</span>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-black uppercase tracking-tight">Simulace komprese</h3>
                <p className="text-purple-500/60 font-bold text-[9px] uppercase tracking-widest mt-1 leading-relaxed">
                  Ztrátová vs. Bezeztrátová
                </p>
              </div>
            <div className="absolute top-2 right-2 text-[10px] font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#comp</div></button>
          </div>
        </div>

        {/* Sekce: Komprese textu */}
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border-4 border-blue-50 flex flex-col gap-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tight">Komprese textu</h2>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-4 h-full">
            <button
              onClick={onStartText}
              className="group relative px-6 py-12 bg-white hover:bg-blue-50 text-blue-900 font-black rounded-3xl shadow-md transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-6 overflow-hidden border-2 border-gray-100 hover:border-blue-200 h-full justify-center"
            >
              <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <FileText className="w-12 h-12 text-blue-600" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black uppercase tracking-tight">Slovníková metoda</h3>
                <p className="text-blue-500/60 font-bold text-xs uppercase tracking-widest mt-2 leading-relaxed max-w-xs mx-auto">
                  Vyzkoušejte si, jak lze text zkrátit nahrazením opakujících se slov pomocí kódů.
                </p>
              </div>
            <div className="absolute top-4 right-4 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#txc</div></button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompressionFormatsMenu;
