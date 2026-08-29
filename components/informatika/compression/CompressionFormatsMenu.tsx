import React from 'react';
import { ArrowLeft, FileArchive, Settings } from 'lucide-react';

interface CompressionFormatsMenuProps {
  onStartImageCompression?: () => void;
  onStartRle?: () => void;
  onStartSize?: () => void;
  onStartJpeg?: () => void;
  onBack: () => void;
}

const CompressionFormatsMenu: React.FC<CompressionFormatsMenuProps> = ({ 
  onStartImageCompression, 
  onStartRle,
  onStartSize,
  onStartJpeg,
  onBack 
}) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
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
          Komprese a formáty souborů
        </h1>
        <p className="text-gray-500 mb-0 text-xl font-medium">
          Jak se kódují a zmenšují obrázky? (Další formáty připravujeme)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          onClick={onStartImageCompression}
          className="group relative px-6 py-10 bg-white hover:bg-blue-50 text-blue-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-blue-200"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-3xl font-black text-blue-600">1</span>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Kódování obrazu</h3>
            <p className="text-blue-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Pixely a bity
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#img</div></button>

        <button
          onClick={onStartRle}
          className="group relative px-6 py-10 bg-white hover:bg-emerald-50 text-emerald-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-emerald-200"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-3xl font-black text-emerald-600">2</span>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">RLE Komprese</h3>
            <p className="text-emerald-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Bezeztrátová komprese
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#rle</div></button>

        <button
          onClick={onStartSize}
          className="group relative px-6 py-10 bg-white hover:bg-amber-50 text-amber-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-amber-200"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-3xl font-black text-amber-600">3</span>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Výpočty velikosti</h3>
            <p className="text-amber-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Kolik místa zabere?
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#ims</div></button>

        <button
          onClick={onStartJpeg}
          className="group relative px-6 py-10 bg-white hover:bg-purple-50 text-purple-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-purple-200"
        >
          <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-3xl font-black text-purple-600">4</span>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">JPEG Simulace</h3>
            <p className="text-purple-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Ztrátová komprese
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#jpg</div></button>
      </div>
    </div>
  );
};

export default CompressionFormatsMenu;
