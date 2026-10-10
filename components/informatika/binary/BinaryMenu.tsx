import React from 'react';
import { ArrowLeft, Binary, Users, ListOrdered, Table, PlusCircle } from 'lucide-react';
import TechnicalCard from '@/components/ui/TechnicalCard';

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
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-amber-200 mb-8">
          <Binary className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none uppercase">
          Binární <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">čísla</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 mb-12 max-w-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">
          Nauč se kódovat informace pomocí nul a jedniček
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <TechnicalCard
            tag="tea"
            title="Kabinet učitelů"
            description="Logická detektivní úloha: Signalizace přítomnosti v kabinetu pomocí binárních přepínačů."
            icon={Users}
            gradient="from-amber-500 to-orange-500"
            actionLabel="Spustit hru"
            onClick={onStartTeachers}
          />
          <TechnicalCard
            tag="stc"
            title="Desítková na binární"
            description="Interaktivní počítadlo s žáky. Nauč se převádět běžná čísla do dvojkového zápisu."
            icon={ListOrdered}
            gradient="from-blue-500 to-indigo-500"
            actionLabel="Spustit cvičení"
            onClick={onStartCounting}
          />
          <TechnicalCard
            tag="bin"
            title="Binární na desítkovou"
            description="Čtení binárního kódu. Spočítej desítkovou hodnotu z postavených žáků a binárních vah."
            icon={Binary}
            gradient="from-emerald-500 to-teal-500"
            actionLabel="Spustit cvičení"
            onClick={onStartBinaryToDecimal}
          />
          <TechnicalCard
            tag="tru"
            title="Pravdivostní tabulka"
            description="Logická hradla AND, OR a NOT v praxi. Sestav pravdivostní tabulku pro zadané podmínky."
            icon={Table}
            gradient="from-purple-500 to-pink-500"
            actionLabel="Otevřít tabulku"
            onClick={onStartTruthTable}
          />
          <TechnicalCard
            tag="add"
            title="Sčítání binárních čísel"
            description="Binární aritmetika: Nauč se sčítat dvě dvojková čísla pod sebou i s přenosem do vyššího řádu."
            icon={PlusCircle}
            gradient="from-rose-500 to-red-500"
            actionLabel="Spustit sčítačku"
            onClick={onStartAddition}
          />
        </div>
      </div>
    </div>
  );
};

export default BinaryMenu;
