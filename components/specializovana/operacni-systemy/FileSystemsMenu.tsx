import React from 'react';
import { ArrowLeft, HardDrive, Binary, Grid, ArrowUpDown, Search, Calculator } from 'lucide-react';

interface FileSystemsMenuProps {
  onBack: () => void;
  onStartFATGame: () => void;
  onStartAllocationGame: () => void;
  onStartDefragGame: () => void;
  onStartChkdskGame: () => void;
  onStartClusterSizeGame: () => void;
}

const FileSystemsMenu: React.FC<FileSystemsMenuProps> = ({
  onBack,
  onStartFATGame,
  onStartAllocationGame,
  onStartDefragGame,
  onStartChkdskGame,
  onStartClusterSizeGame,
}) => {
  const tasks = [
    {
      title: 'Základy FAT tabulky',
      desc: 'Jak se data spojují za sebe pomocí odkazů. Čtení a oprava řetězců ve FAT.',
      icon: <Binary className="w-7 h-7 text-indigo-600" />,
      bgColor: 'bg-indigo-50',
      borderColor: 'hover:border-indigo-200',
      action: onStartFATGame,
    },
    {
      title: 'Alokační strategie',
      desc: 'First Fit, Best Fit a Worst Fit. Ukládání souborů do mezer na disku.',
      icon: <Grid className="w-7 h-7 text-emerald-600" />,
      bgColor: 'bg-emerald-50',
      borderColor: 'hover:border-emerald-200',
      action: onStartAllocationGame,
    },
    {
      title: 'Defragmentace disku',
      desc: 'Srovnej sektory za sebe, zrychli čtení disku a minimalizuj pohyb čtecí hlavy.',
      icon: <ArrowUpDown className="w-7 h-7 text-amber-600" />,
      bgColor: 'bg-amber-50',
      borderColor: 'hover:border-amber-200',
      action: onStartDefragGame,
    },
    {
      title: 'Detektiv CHKDSK',
      desc: 'Hledej a opravuj zacyklení, ztracené clustery a překřížené soubory.',
      icon: <Search className="w-7 h-7 text-purple-600" />,
      bgColor: 'bg-purple-50',
      borderColor: 'hover:border-purple-200',
      action: onStartChkdskGame,
    },
    {
      title: 'Velikost clusteru',
      desc: 'Interactive vizualizace slack space. Spočítej plýtvání místem na disku.',
      icon: <Calculator className="w-7 h-7 text-rose-600" />,
      bgColor: 'bg-rose-50',
      borderColor: 'hover:border-rose-200',
      action: onStartClusterSizeGame,
    },
  ];

  return (
    <div className="max-w-5xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu OS
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-14 rounded-[4rem] shadow-2xl border-4 border-white">
        <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-inner">
          <HardDrive className="w-10 h-10 text-purple-600 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Souborové systémy
        </h1>
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto font-medium">
          Vyberte si konkrétní praktickou úlohu zaměřenou na ukládání dat, správu volného místa a údržbu souborového systému FAT.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, idx) => (
            <button
              key={idx}
              onClick={task.action}
              className={`group p-6 bg-white hover:bg-slate-50 border-4 border-gray-50 ${task.borderColor} rounded-[2.5rem] shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-left flex flex-col justify-between min-h-[220px]`}
            >
              <div>
                <div className={`w-14 h-14 ${task.bgColor} rounded-2xl flex items-center justify-center mb-5 group-hover:rotate-6 transition-transform`}>
                  {task.icon}
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-wide">
                  {task.title}
                </h3>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  {task.desc}
                </p>
              </div>
              <div className="flex justify-end w-full mt-4">
                <span className="text-xs font-black text-purple-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Spustit ➔
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileSystemsMenu;
