import React from 'react';
import { ArrowLeft, FileArchive, Settings } from 'lucide-react';

interface CompressionFormatsMenuProps {
  onBack: () => void;
}

const CompressionFormatsMenu: React.FC<CompressionFormatsMenuProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-orange-600 transition-colors font-bold uppercase text-sm tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Zpět na výběr úloh
        </button>
      </div>

      <div className="bg-white p-12 rounded-3xl shadow-xl border-4 border-orange-50">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center">
            <FileArchive className="w-12 h-12 text-orange-600" />
          </div>
        </div>

        <h1 className="text-5xl font-black text-gray-800 mb-4 tracking-tight uppercase">
          Komprese a formáty souborů
        </h1>
        <p className="text-gray-500 mb-12 text-xl font-medium">
          Tato kapitola se aktuálně připravuje.
        </p>

        <div className="flex justify-center">
          <div className="flex items-center text-gray-400 gap-2">
            <Settings className="w-6 h-6 animate-spin" />
            <span className="font-bold">Ve výstavbě</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompressionFormatsMenu;
