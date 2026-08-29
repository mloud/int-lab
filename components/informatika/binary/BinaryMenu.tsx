
import React from 'react';
import { ArrowLeft, Binary, Users, ListOrdered, Table, PlusCircle } from 'lucide-react';

interface BinaryMenuProps {
  onStartTeachers: () => void;
  onStartCounting: () => void;
  onStartBinaryToDecimal: () => void;
  onStartTruthTable: () => void;
  onStartAddition: () => void;
  onBack: () => void;
}

const BinaryMenu: React.FC<BinaryMenuProps> = ({ 
  onStartTeachers, 
  onStartCounting, 
  onStartBinaryToDecimal,
  onStartTruthTable, 
  onStartAddition, 
  onBack 
}) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-amber-600 transition-colors font-bold uppercase text-sm tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět na úvod
        </button>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-amber-100 mb-10">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl shadow-lg">
            <Binary className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-black text-gray-800 mb-4 tracking-tight uppercase">
          Binární čísla
        </h1>
        <p className="text-gray-500 mb-0 text-xl font-medium">
          Nauč se kódovat informace pomocí nul a jedniček.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <button
          onClick={onStartTeachers}
          className="group relative px-6 py-10 bg-white hover:bg-amber-50 text-amber-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-amber-200"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <Users className="w-10 h-10 text-amber-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Kabinet učitelů</h3>
            <p className="text-amber-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Signalizace přítomnosti
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#tea</div></button>

        <button
          onClick={onStartCounting}
          className="group relative px-6 py-10 bg-white hover:bg-amber-50 text-amber-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-amber-200"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <ListOrdered className="w-10 h-10 text-amber-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Desítková na binární</h3>
            <p className="text-amber-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Nastav žáky dle čísla
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#stc</div></button>

        <button
          onClick={onStartBinaryToDecimal}
          className="group relative px-6 py-10 bg-white hover:bg-amber-50 text-amber-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-amber-200"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Binary className="w-10 h-10 text-amber-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Binární na desítkovou</h3>
            <p className="text-amber-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Vypočítej číslo dle žáků
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#bin</div></button>

        <button
          onClick={onStartTruthTable}
          className="group relative px-6 py-10 bg-white hover:bg-amber-50 text-amber-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-amber-200"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center group-hover:-rotate-6 transition-transform">
            <Table className="w-10 h-10 text-amber-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Pravdivostní tabulka</h3>
            <p className="text-amber-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Logické podmínky
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#tru</div></button>

        <button
          onClick={onStartAddition}
          className="group relative px-6 py-10 bg-white hover:bg-amber-50 text-amber-900 font-black rounded-[3rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-4 overflow-hidden border-4 border-gray-50 hover:border-amber-200"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center group-hover:-rotate-12 transition-transform">
            <PlusCircle className="w-10 h-10 text-amber-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black uppercase tracking-tight">Sčítání binárních čísel</h3>
            <p className="text-amber-500/60 font-bold text-[10px] uppercase tracking-widest mt-2 leading-relaxed">
              Binární aritmetika
            </p>
          </div>
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#add</div></button>
      </div>
    </div>
  );
};

export default BinaryMenu;
