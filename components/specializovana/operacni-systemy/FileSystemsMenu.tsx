import React from 'react';
import {
  ArrowLeft, HardDrive, Binary, Grid, ArrowUpDown, Search, Calculator,
  Disc3, PieChart, Table2, Wrench, AppWindow, Cpu, Layers, ChevronRight, ArrowDown
} from 'lucide-react';

interface FileSystemsMenuProps {
  onBack: () => void;
  // Podkapitoly (teorie + simulace)
  onStartIntro: () => void;
  onStartMedia: () => void;
  onStartPartitions: () => void;
  onStartFat: () => void;
  onStartFragmentation: () => void;
  onStartReadFlow: () => void;
  // Samostatné procvičovací hry
  onStartFATGame: () => void;
  onStartAllocationGame: () => void;
  onStartDefragGame: () => void;
  onStartChkdskGame: () => void;
  onStartClusterSizeGame: () => void;
}

const FileSystemsMenu: React.FC<FileSystemsMenuProps> = ({
  onBack,
  onStartIntro,
  onStartMedia,
  onStartPartitions,
  onStartFat,
  onStartFragmentation,
  onStartReadFlow,
  onStartFATGame,
  onStartAllocationGame,
  onStartDefragGame,
  onStartChkdskGame,
  onStartClusterSizeGame,
}) => {
  const chapters = [
    {
      n: 1, tag: 'fs1',
      title: 'Úvod a architektura',
      desc: 'K čemu slouží souborový systém a jak si předává data s hardwarem a aplikacemi.',
      icon: Layers,
      gradient: 'from-blue-500 to-indigo-500',
      ring: 'hover:border-blue-200',
      action: onStartIntro,
    },
    {
      n: 2, tag: 'fs2',
      title: 'Paměťová média',
      desc: 'HDD a SSD pod lupou. Plotny, stopy, sektory, NAND paměť a proč je SSD tak rychlé.',
      icon: Disc3,
      gradient: 'from-sky-500 to-cyan-500',
      ring: 'hover:border-sky-200',
      action: onStartMedia,
    },
    {
      n: 3, tag: 'fs3',
      title: 'Dělení disku',
      desc: 'Oddíly a svazky, MBR vs. GPT, formátování a co je na disku potřeba ke startu OS.',
      icon: PieChart,
      gradient: 'from-emerald-500 to-teal-500',
      ring: 'hover:border-emerald-200',
      action: onStartPartitions,
    },
    {
      n: 4, tag: 'fs4',
      title: 'Alokační jednotka a FAT',
      desc: 'Cluster, FAT tabulka, mazání a obnova souborů. Srovnání s NTFS a ext4.',
      icon: Table2,
      gradient: 'from-purple-500 to-fuchsia-500',
      ring: 'hover:border-purple-200',
      action: onStartFat,
    },
    {
      n: 5, tag: 'fs5',
      title: 'Fragmentace a údržba',
      desc: 'Jak vzniká fragmentace, defragmentace vs. TRIM, kontrola disku a vadné sektory.',
      icon: Wrench,
      gradient: 'from-amber-500 to-orange-500',
      ring: 'hover:border-amber-200',
      action: onStartFragmentation,
    },
    {
      n: 6, tag: 'fs6',
      title: 'Architektura v praxi',
      desc: 'Simulace toku dat při čtení souboru. Propojení OS, FAT tabulky a samotného disku.',
      icon: AppWindow,
      gradient: 'from-rose-500 to-red-500',
      ring: 'hover:border-rose-200',
      action: onStartReadFlow,
    },
  ];

  const games = [
    { tag: 'fat', title: 'Základy FAT tabulky', desc: 'Čtení a oprava řetězců ve FAT.', icon: Binary, color: 'text-indigo-600', bg: 'bg-indigo-50', action: onStartFATGame },
    { tag: 'clu', title: 'Velikost clusteru', desc: 'Spočítej plýtvání místem na disku.', icon: Calculator, color: 'text-rose-600', bg: 'bg-rose-50', action: onStartClusterSizeGame },
    { tag: 'alo', title: 'Alokační strategie', desc: 'First Fit, Best Fit a Worst Fit.', icon: Grid, color: 'text-emerald-600', bg: 'bg-emerald-50', action: onStartAllocationGame },
    { tag: 'dfg', title: 'Defragmentace disku', desc: 'Srovnej bloky a zrychli čtení.', icon: ArrowUpDown, color: 'text-amber-600', bg: 'bg-amber-50', action: onStartDefragGame },
    { tag: 'chk', title: 'Detektiv CHKDSK', desc: 'Najdi ztracené a překřížené clustery.', icon: Search, color: 'text-purple-600', bg: 'bg-purple-50', action: onStartChkdskGame },
  ];

  const layers = [
    { label: 'Aplikace', sub: 'Word, hra, prohlížeč… „Ulož dokument.docx“', icon: AppWindow, cls: 'bg-sky-50 border-sky-300 text-sky-900' },
    { label: 'Modul správy souborů (jádro OS)', sub: 'Soubory a složky → čísla clusterů (FAT, NTFS, ext4)', icon: Layers, cls: 'bg-purple-600 border-purple-400 text-white' },
    { label: 'Ovladač disku', sub: 'Clustery → čísla sektorů (LBA)', icon: Cpu, cls: 'bg-indigo-50 border-indigo-300 text-indigo-900' },
    { label: 'Disk (HDD / SSD)', sub: 'Fyzicky zapíše bity do sektorů nebo NAND buněk', icon: HardDrive, cls: 'bg-slate-200 border-slate-300 text-slate-800' },
  ];

  return (
    <div className="max-w-6xl w-full text-center animate-in fade-in duration-500">
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Zpět do menu OS
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-14 rounded-[4rem] shadow-2xl border-4 border-white">
        <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-[2rem] flex items-center justify-center mb-8 mx-auto shadow-xl shadow-purple-200">
          <HardDrive className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-5 tracking-tighter uppercase leading-none">
          Souborový systém <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">a disky</span>
        </h1>
        <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
          V návaznosti na kapitolu Architektura OS se nyní detailně zaměříme na jeden z klíčových subsystémů jádra –
          <strong className="text-purple-700"> modul správy souborů</strong>. Objasníme si principy, pomocí kterých operační systém abstrakcí převádí fyzické bloky dat na strukturovaný systém souborů a složek.
        </p>



        {/* Podkapitoly */}
        <h2 className="text-left text-2xl font-black text-slate-800 mb-6 uppercase tracking-tight">Podkapitoly</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {chapters.map(ch => {
            const Icon = ch.icon;
            return (
              <div
                key={ch.n}
                id={`fs-chapter-${ch.n}`}
                className="relative group p-6 bg-white rounded-3xl border-2 border-slate-100 flex flex-col items-center text-center justify-between min-h-[260px] shadow-md hover:shadow-xl transition-all"
              >
                <div className="absolute top-3 left-4 text-2xl font-black text-slate-200">{ch.n}.</div>
                <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 uppercase tracking-widest shadow-sm z-10">#{ch.tag}</div>
                
                <div className="flex flex-col items-center mt-6 z-10 relative flex-1">
                  <div className={`w-14 h-14 bg-gradient-to-br ${ch.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-all`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-black text-slate-800 mb-2 uppercase tracking-wide text-sm">{ch.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[95%]">{ch.desc}</p>
                </div>
                
                <button
                  onClick={ch.action}
                  className={`mt-5 px-4 py-2.5 bg-gradient-to-r ${ch.gradient} text-white font-bold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 relative z-20 w-full opacity-90 group-hover:opacity-100`}
                >
                  Otevřít kapitolu
                </button>
              </div>
            );
          })}
        </div>

        {/* Procvičovací hry */}
        <h2 className="text-left text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">Procvičovací hry</h2>
        <p className="text-left text-base text-slate-500 mb-6 font-medium">Samostatné úlohy na procvičení – vhodné po probrání kapitol 3 a 4.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {games.map(g => {
            const Icon = g.icon;
            return (
              <button
                key={g.tag}
                onClick={g.action}
                className="group relative p-5 bg-white hover:bg-slate-50 border-4 border-gray-50 hover:border-purple-100 rounded-[2rem] shadow-md hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-left flex flex-col justify-between min-h-[190px]"
              >
                <div>
                  <div className={`w-12 h-12 ${g.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform`}>
                    <Icon className={`w-6 h-6 ${g.color}`} />
                  </div>
                  <h3 className="text-base font-black text-gray-900 mb-1 uppercase tracking-wide leading-tight">{g.title}</h3>
                  <p className="text-sm text-gray-500 font-semibold leading-snug">{g.desc}</p>
                </div>
                <span className="mt-3 text-xs font-black text-purple-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">Spustit ➔</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FileSystemsMenu;
