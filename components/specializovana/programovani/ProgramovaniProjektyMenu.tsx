import React from 'react';
import { ArrowLeft, Box, Gamepad2 } from 'lucide-react';

interface ProgramovaniProjektyMenuProps {
  onBack: () => void;
  onStartRaycaster: () => void;
}

const ProgramovaniProjektyMenu: React.FC<ProgramovaniProjektyMenuProps> = ({ onBack, onStartRaycaster }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na Programování
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center">
        <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <Gamepad2 className="w-10 h-10 text-teal-600 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Projekty
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl font-medium">
          Tvoř vlastní hry a aplikace krok za krokem a nauč se tak logicky uvažovat.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Projekt 1 */}
          <div className="relative group p-6 bg-teal-50/50 rounded-3xl border-2 border-teal-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-teal-50">
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-teal-50 transition-colors">#ray</div>
            <div className="flex flex-col items-center mt-4">
              <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <Box className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-teal-700 mb-1 uppercase tracking-wider text-sm">2.5D Raycaster ve Scratchi</h3>
              <p className="text-xs text-gray-600">Tvorba vlastního "Wolfenstein 3D" enginu v prostředí Scratch.</p>
            </div>
            <button
              onClick={onStartRaycaster}
              className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20"
            >
              Spustit projekt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramovaniProjektyMenu;
