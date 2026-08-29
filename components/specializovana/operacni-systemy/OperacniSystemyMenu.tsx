import React from 'react';
import { ArrowLeft, Cpu, ShieldCheck, HardDrive, Hourglass, MonitorUp } from 'lucide-react';

interface OperacniSystemyMenuProps {
  onBack: () => void;
  onStartFileSystemsMenu: () => void;
  onStartWindowsInstall: () => void;
  onStartProcessMemory: () => void;
}

const OperacniSystemyMenu: React.FC<OperacniSystemyMenuProps> = ({ onBack, onStartFileSystemsMenu, onStartWindowsInstall, onStartProcessMemory }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na výběr předmětu
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center">
        <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <Cpu className="w-10 h-10 text-purple-600 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Operační systémy
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl font-medium">
          Vyberte si téma k procvičování. Začněte se souborovými systémy a zjistěte, jak se data fyzicky zapisují na disk!
        </p>

        {/* Preview of future topics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          <div className="p-6 bg-purple-50/50 rounded-3xl border-2 border-purple-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-purple-50">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <MonitorUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-purple-700 mb-1 uppercase tracking-wider text-sm">Instalace OS</h3>
              <p className="text-xs text-gray-600">Simulátor instalace Windows 11 pro IT techniky.</p>
            </div>
            <button
              onClick={onStartWindowsInstall}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              Spustit simulátor
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#win</div></button>
          </div>
          <div className="p-6 bg-indigo-50/50 rounded-3xl border-2 border-indigo-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-indigo-50">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <Hourglass className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-indigo-700 mb-1 uppercase tracking-wider text-sm">Běh programu</h3>
              <p className="text-xs text-gray-600">Prozkoumejte procesy v paměti RAM a cyklus procesoru.</p>
            </div>
            <button
              onClick={onStartProcessMemory}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              Zobrazit simulátory
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#pmm</div></button>
          </div>

          <div className="p-6 bg-purple-50/50 rounded-3xl border-2 border-purple-200/80 flex flex-col items-center text-center justify-between min-h-[220px] shadow-lg shadow-purple-50">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <HardDrive className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-purple-700 mb-1 uppercase tracking-wider text-sm">Souborové systémy</h3>
              <p className="text-xs text-gray-600">Jak operační systém ukládá data a organizuje složky na disku.</p>
            </div>
            <button
              onClick={onStartFileSystemsMenu}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              Zobrazit úlohy
            <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#fsm</div></button>
          </div>

          <div className="p-6 bg-purple-50/30 rounded-3xl border-2 border-purple-100/50 flex flex-col items-center text-center justify-between min-h-[220px]">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase tracking-wider text-sm">Práva a bezpečnost</h3>
              <p className="text-xs text-gray-500">Správa uživatelů a zabezpečení přístupu k souborům.</p>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 bg-purple-50 px-2.5 py-1 rounded-full mt-4">Připravuje se</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperacniSystemyMenu;
