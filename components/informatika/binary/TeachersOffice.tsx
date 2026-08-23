
import React, { useState } from 'react';
import { ArrowLeft, Lightbulb, User, UserCheck, HelpCircle } from 'lucide-react';

interface TeachersOfficeProps {
  onBack: () => void;
}

const TeachersOffice: React.FC<TeachersOfficeProps> = ({ onBack }) => {
  const [vadizPresent, setVadizPresent] = useState(false);
  const [neumannPresent, setNeumannPresent] = useState(false);

  const combinations = [
    { v: false, n: false, label: 'Oba jsou pryč', binary: '00' },
    { v: true, n: false, label: 'Paní Vádiz je vevnitř, pan Neumann pryč', binary: '10' },
    { v: false, n: true, label: 'Paní Vádiz je pryč, pan Neumann vevnitř', binary: '01' },
    { v: true, n: true, label: 'Oba jsou v kabinetě', binary: '11' },
  ];

  const currentBinary = `${vadizPresent ? '1' : '0'}${neumannPresent ? '1' : '0'}`;
  const currentStatus = combinations.find(c => c.binary === currentBinary);

  return (
    <div className="w-full max-w-4xl flex flex-col gap-8 items-center animate-in fade-in duration-500 pb-20">
      <div className="w-full bg-white p-6 rounded-[2.5rem] shadow-lg border border-gray-100 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-amber-600 transition-colors font-black uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zpět
        </button>
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Kabinet učitelů</h2>
        <div className="w-20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-8">Ovládání přítomnosti</h3>
          
          <div className="flex gap-12 mb-10">
            <div className="flex flex-col items-center gap-4">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all ${vadizPresent ? 'bg-amber-100 shadow-lg shadow-amber-100' : 'bg-gray-100'}`}>
                <User className={`w-12 h-12 ${vadizPresent ? 'text-amber-600' : 'text-gray-400'}`} />
              </div>
              <p className="font-bold text-gray-700">P. Vádiz</p>
              <button 
                onClick={() => setVadizPresent(!vadizPresent)}
                className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${vadizPresent ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {vadizPresent ? 'V kabinetě' : 'Pryč'}
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all ${neumannPresent ? 'bg-blue-100 shadow-lg shadow-blue-100' : 'bg-gray-100'}`}>
                <UserCheck className={`w-12 h-12 ${neumannPresent ? 'text-blue-600' : 'text-gray-400'}`} />
              </div>
              <p className="font-bold text-gray-700">P. Neumann</p>
              <button 
                onClick={() => setNeumannPresent(!neumannPresent)}
                className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${neumannPresent ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {neumannPresent ? 'V kabinetě' : 'Pryč'}
              </button>
            </div>
          </div>

          <div className="w-full p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-4 text-center">Binární kód stavu</p>
            <div className="flex justify-center gap-4">
              <div className={`w-16 h-20 rounded-2xl flex items-center justify-center text-4xl font-black transition-all ${vadizPresent ? 'bg-amber-600 text-white' : 'bg-white text-gray-300 border-2 border-gray-100'}`}>
                {vadizPresent ? '1' : '0'}
              </div>
              <div className={`w-16 h-20 rounded-2xl flex items-center justify-center text-4xl font-black transition-all ${neumannPresent ? 'bg-blue-600 text-white' : 'bg-white text-gray-300 border-2 border-gray-100'}`}>
                {neumannPresent ? '1' : '0'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-8">Signalizace nad dveřmi</h3>
          
          <div className="relative w-full aspect-video bg-gray-900 rounded-[2rem] overflow-hidden flex items-center justify-center border-8 border-gray-800 shadow-inner mb-8">
            <div className="flex gap-16">
              <div className="flex flex-col items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${vadizPresent ? 'bg-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.8)]' : 'bg-gray-800'}`}>
                  <Lightbulb className={`w-8 h-8 ${vadizPresent ? 'text-white' : 'text-gray-700'}`} />
                </div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Vádiz</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${neumannPresent ? 'bg-blue-400 shadow-[0_0_50px_rgba(96,165,250,0.8)]' : 'bg-gray-800'}`}>
                  <Lightbulb className={`w-8 h-8 ${neumannPresent ? 'text-white' : 'text-gray-700'}`} />
                </div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Neumann</p>
              </div>
            </div>
          </div>

          <div className="w-full p-8 bg-amber-50 rounded-[2rem] border border-amber-100 text-center">
            <p className="text-sm font-black text-amber-900 uppercase tracking-tight mb-2">Aktuální situace:</p>
            <p className="text-lg font-bold text-amber-800 leading-tight">{currentStatus?.label}</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <HelpCircle className="w-8 h-8 text-amber-500" />
          <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Všechny možné stavy</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {combinations.map((c) => (
            <div 
              key={c.binary}
              className={`p-4 rounded-2xl border-2 transition-all ${currentBinary === c.binary ? 'border-amber-500 bg-amber-50 scale-105 shadow-lg' : 'border-gray-100 bg-white opacity-60'}`}
            >
              <div className="flex justify-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full ${c.v ? 'bg-amber-400' : 'bg-gray-200'}`}></div>
                <div className={`w-6 h-6 rounded-full ${c.n ? 'bg-blue-400' : 'bg-gray-200'}`}></div>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Kód: {c.binary}</p>
              <p className="text-xs font-bold text-gray-700 leading-tight">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachersOffice;
