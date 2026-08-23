
import React from 'react';
import { ArrowLeft, Sun, Printer, FlaskConical } from 'lucide-react';

interface MixingMenuProps {
  onSelectRGB: () => void;
  onSelectCMYK: () => void;
  onBack: () => void;
}

const MixingMenu: React.FC<MixingMenuProps> = ({ onSelectRGB, onSelectCMYK, onBack }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět
        </button>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-indigo-100 mb-10">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-lg">
            <FlaskConical className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-black text-gray-800 mb-4 tracking-tight uppercase">
          Míchací laboratoř
        </h1>
        <p className="text-gray-500 mb-0 text-xl font-medium">
          Vyber si model a zjisti, jak vznikají barvy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button
          onClick={onSelectRGB}
          className="group bg-white p-10 rounded-[3rem] shadow-md border-2 border-gray-50 hover:border-blue-400 hover:shadow-2xl transition-all flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Sun className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-3xl font-black text-gray-800 mb-2 uppercase tracking-tight">RGB model</h3>
          <p className="text-gray-400 font-bold text-sm mb-6 uppercase tracking-widest">Aditivní (Světlo)</p>
          <p className="text-gray-500 leading-relaxed font-medium">
            Pro monitory, telefony a televize. <br/>
            Mícháním barev vzniká <strong>bílá</strong>.
          </p>
        </button>

        <button
          onClick={onSelectCMYK}
          className="group bg-white p-10 rounded-[3rem] shadow-md border-2 border-gray-50 hover:border-pink-400 hover:shadow-2xl transition-all flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 bg-pink-100 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Printer className="w-10 h-10 text-pink-600" />
          </div>
          <h3 className="text-3xl font-black text-gray-800 mb-2 uppercase tracking-tight">CMYK model</h3>
          <p className="text-gray-400 font-bold text-sm mb-6 uppercase tracking-widest">Subtraktivní (Tisk)</p>
          <p className="text-gray-500 leading-relaxed font-medium">
            Pro tiskárny, barvy a pastelky. <br/>
            Mícháním barev vzniká <strong>černá</strong>.
          </p>
        </button>
      </div>
    </div>
  );
};

export default MixingMenu;
