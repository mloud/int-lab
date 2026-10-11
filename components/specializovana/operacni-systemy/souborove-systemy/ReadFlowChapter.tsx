'use client';
import React, { useState } from 'react';
import { 
  Layers, 
  MonitorPlay, 
  AppWindow, 
  FolderOpen, 
  Table2, 
  Cpu, 
  HardDrive, 
  ArrowDown,
  Boxes,
  FileText
} from 'lucide-react';
import { FsChapterShell } from './FsShared';

interface ReadFlowChapterProps {
  onBack: () => void;
}

export default function ReadFlowChapter({ onBack }: ReadFlowChapterProps) {
  const [activeTab, setActiveTab] = useState('theory');
  const [simStep, setSimStep] = useState(0);

  const tabs = [
    { id: 'theory', label: 'Architektura (Schéma)', icon: Layers },
    { id: 'sim', label: 'Simulace v praxi', icon: MonitorPlay },
  ];

  const fatSimulationRows = [
    { cluster: 0, next: '0', isFile: false },
    { cluster: 1, next: '0', isFile: false },
    { cluster: 2, next: '3', isFile: true },
    { cluster: 3, next: '7', isFile: true },
    { cluster: 4, next: '0', isFile: false },
    { cluster: 5, next: '0', isFile: false },
    { cluster: 6, next: '0', isFile: false },
    { cluster: 7, next: 'EOF', isFile: true },
  ];

  const steps = [
    { 
      id: 0, 
      title: '1. Požadavek aplikace', 
      desc: 'Uživatel otevírá soubor "zprava.txt". Aplikace netuší nic o clusterech ani sektorech – pošle jádru systému volání readFile("zprava.txt").', 
      active: 'app' 
    },
    { 
      id: 1, 
      title: '2. Vyhledání v adresáři', 
      desc: 'Správce souborů v OS vyhledá v adresáři záznam "zprava.txt" a zjistí číslo počáteční alokační jednotky: Start Cluster #2.', 
      active: 'dir' 
    },
    { 
      id: 2, 
      title: '3. Trasování FAT tabulky', 
      desc: 'OS projde FAT tabulku od clusteru #2: z #2 ➔ odkaz na #3 ➔ odkaz na #7 ➔ EOF. Soubor zabírá přesně 3 alokační jednotky (clustery 2, 3 a 7).', 
      active: 'fat' 
    },
    { 
      id: 3, 
      title: '4. Překlad v ovladači', 
      desc: 'OS předá ovladači disku požadavek na clustery 2, 3 a 7. Ovladač zná sjednocenou velikost (1 alok. jednotka = 1 sektor) a přeloží je na LBA sektory #2, #3 a #7.', 
      active: 'driver' 
    },
    { 
      id: 4, 
      title: '5. Čtení na disku', 
      desc: 'Řadič disku fyzicky načte přesně 3 sektory (#2, #3, #7) z plotny/paměti disku a surová data vrátí zpět přes ovladač a jádro do aplikace.', 
      active: 'disk' 
    }
  ];

  const currentStep = steps[simStep];

  return (
    <FsChapterShell
      chapterNumber={6}
      title="Architektura"
      highlight="v praxi"
      subtitle="Překlad od názvu souboru přes FAT tabulku a ovladač až k sektorům na disku."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {/* ZÁLOŽKA 1: GRAFICKÉ VRSTVENATÉ SCHÉMA OS */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          <div className="w-full max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border-2 border-indigo-100 shadow-sm relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 bg-indigo-600 px-4 py-2 rounded-bl-xl text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Layers className="w-3.5 h-3.5" /> Vrstevnaté schéma OS
            </div>

            {/* 1. VRSTVA: USER SPACE */}
            <div className="border-4 border-dashed border-sky-300 rounded-2xl p-4 mb-3 bg-sky-50/50 mt-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black text-sky-600 uppercase tracking-wider">User Space (Ring 3)</span>
                <span className="text-[10px] bg-sky-200/70 text-sky-900 font-bold px-2 py-0.5 rounded-full">Uživatelská vrstva</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-sky-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-500 rounded-lg text-white">
                    <AppWindow className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase text-slate-800">Aplikace (Textový editor)</div>
                    <div className="text-[11px] text-slate-500 font-medium">Nezná clustery ani sektory, zná jen jméno souboru</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-black bg-sky-100 text-sky-800 px-2.5 py-1 rounded-md border border-sky-300">
                  readFile("zprava.txt")
                </span>
              </div>
            </div>

            {/* Šipka přechodu: Systémové volání */}
            <div className="flex items-center justify-center gap-2 my-2 text-slate-400">
              <ArrowDown className="w-4 h-4 text-purple-500 animate-bounce" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
                Systémové volání (System Call: read)
              </span>
              <ArrowDown className="w-4 h-4 text-purple-500 animate-bounce" />
            </div>

            {/* 2. VRSTVA: KERNEL SPACE - SOUBOROVÝ SYSTÉM */}
            <div className="border-4 border-purple-300 rounded-2xl p-4 mb-3 bg-purple-50/40 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-black text-purple-700 uppercase tracking-wider">Kernel Space (Ring 0)</span>
                <span className="text-[10px] bg-purple-200 text-purple-900 font-bold px-2 py-0.5 rounded-full">Souborový systém OS (FAT)</span>
              </div>

              {/* Dva bloky: Adresář a FAT tabulka */}
              <div className="space-y-3">
                {/* A. Adresář složky */}
                <div className="bg-white rounded-xl p-3 border border-purple-200 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FolderOpen className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-slate-800">1. Adresář složky:</span>
                  </div>
                  <div className="text-[11px] font-mono text-purple-900 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                    "zprava.txt" ➔ Start Cluster <strong>#2</strong>
                  </div>
                </div>

                {/* B. FAT Tabulka (Překlad) */}
                <div className="bg-white rounded-xl p-3 border border-purple-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Table2 className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-bold text-slate-800">2. Překlad ve FAT tabulce (Řetězení):</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">Řetězec clusterů</span>
                  </div>

                  {/* Vizuální schéma řetězení clusterů */}
                  <div className="flex items-center justify-center gap-2 py-1.5 px-2 bg-indigo-50/70 rounded-lg border border-indigo-200 text-xs font-mono">
                    <span className="bg-sky-200 text-sky-950 px-2 py-0.5 rounded font-black border border-sky-300">Cluster #2</span>
                    <span className="text-indigo-400 font-bold">➔</span>
                    <span className="bg-sky-200 text-sky-950 px-2 py-0.5 rounded font-black border border-sky-300">Cluster #3</span>
                    <span className="text-indigo-400 font-bold">➔</span>
                    <span className="bg-sky-200 text-sky-950 px-2 py-0.5 rounded font-black border border-sky-300">Cluster #7</span>
                    <span className="text-indigo-400 font-bold">➔</span>
                    <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-black border border-rose-200">EOF</span>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-600 flex items-center justify-between">
                    <span className="flex items-center gap-1 font-semibold text-purple-800">
                      <Boxes className="w-3.5 h-3.5" /> Alokační jednotka:
                    </span>
                    <span>Soubor zabírá celkem <strong>3 clustery</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Šipka přechodu: Požadavek na ovladač */}
            <div className="flex items-center justify-center gap-2 my-2 text-slate-400">
              <ArrowDown className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Požadavek na clustery: #2, #3, #7
              </span>
              <ArrowDown className="w-4 h-4 text-emerald-500" />
            </div>

            {/* 3. VRSTVA: KERNEL SPACE - OVLADAČ DISKU */}
            <div className="border-4 border-emerald-300 rounded-2xl p-4 mb-3 bg-emerald-50/40 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wider">Kernel Space (Ring 0)</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-950 font-bold px-2 py-0.5 rounded-full">Ovladač disku (Device Driver)</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-emerald-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 rounded-lg text-white">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase text-slate-800">Překlad cluster ➔ sektor</div>
                    <div className="text-[11px] text-slate-500">1 alok. jednotka = 1 sektor (4 KB)</div>
                  </div>
                </div>
                <div className="text-[11px] font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-1 rounded border border-emerald-300 text-right leading-tight">
                  Clustery 2, 3, 7 ➔ LBA Sektory 2, 3, 7
                </div>
              </div>
            </div>

            {/* Šipka přechodu: I/O Sběrnice */}
            <div className="flex items-center justify-center gap-2 my-2 text-slate-400">
              <ArrowDown className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                I/O příkaz: Přečti LBA sektory #2, #3, #7
              </span>
              <ArrowDown className="w-4 h-4 text-amber-500" />
            </div>

            {/* 4. VRSTVA: HARDWARE DISKU */}
            <div className="border-4 border-slate-300 rounded-2xl p-4 bg-slate-100 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider">Hardware</span>
                <span className="text-[10px] bg-slate-300 text-slate-800 font-bold px-2 py-0.5 rounded-full">Pevný disk (HDD / SSD)</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3 text-slate-800">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-slate-600" />
                    <span className="text-xs font-black">Plotna / Čipy disku:</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Fyzické čtení 3 sektorů
                  </span>
                </div>

                {/* Mřížka fyzických sektorů na disku */}
                <div className="flex flex-wrap justify-center gap-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => {
                    const isRead = s === 2 || s === 3 || s === 7;
                    return (
                      <div
                        key={s}
                        className={`w-9 h-9 flex flex-col items-center justify-center rounded-lg text-[10px] font-mono font-bold border transition-all ${
                          isRead
                            ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-sm ring-2 ring-amber-200 scale-105'
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                      >
                        <span>#{s}</span>
                        {isRead && <span className="text-[7px] font-black uppercase">SEKTOR</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="text-center text-xs text-slate-600 font-medium mt-3">
                  Disk fyzicky přečte přesně <strong className="text-amber-800">3 sektory (#2, #3, #7)</strong> a pošle data zpět aplikaci.
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ZÁLOŽKA 2: INTERAKTIVNÍ SIMULACE */}
      {activeTab === 'sim' && (
        <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border-2 border-slate-200">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Levé menu - Kroky */}
            <div className="w-full lg:w-1/3 space-y-4">
              <h3 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">Kroky procesu</h3>
              {steps.map((step, idx) => (
                <div 
                  key={step.id} 
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    simStep === idx 
                      ? 'bg-white border-purple-500 shadow-md ring-4 ring-purple-50' 
                      : simStep > idx 
                        ? 'bg-slate-100 border-emerald-300 opacity-70' 
                        : 'bg-white border-slate-200 opacity-50'
                  }`}
                  onClick={() => setSimStep(idx)}
                >
                  <h4 className={`font-bold text-sm uppercase tracking-wide mb-1 ${
                    simStep === idx ? 'text-purple-700' : simStep > idx ? 'text-emerald-700' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </h4>
                  {simStep === idx && <p className="text-sm text-slate-600 mt-2 leading-relaxed">{step.desc}</p>}
                </div>
              ))}

              <div className="pt-6 flex justify-between items-center border-t border-slate-200">
                <button 
                  onClick={() => setSimStep(Math.max(0, simStep - 1))}
                  disabled={simStep === 0}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg disabled:opacity-30 transition-all text-sm uppercase tracking-wider"
                >
                  Předchozí
                </button>
                <button 
                  onClick={() => setSimStep(Math.min(steps.length - 1, simStep + 1))}
                  disabled={simStep === steps.length - 1}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg disabled:opacity-30 transition-all text-sm uppercase tracking-wider"
                >
                  Další krok
                </button>
              </div>
            </div>

            {/* Pravá část - Interaktivní vizualizace */}
            <div className="w-full lg:w-2/3 flex flex-col items-center gap-6 bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-100 shadow-inner min-h-[500px] relative">
              
              {/* Spojovací čára na pozadí */}
              <div className="absolute inset-0 z-0 pointer-events-none flex flex-col items-center justify-center">
                 <div className="w-1 bg-slate-200 h-full"></div>
              </div>

              {/* 1. Aplikace */}
              <div className={`z-10 w-full max-w-md p-4 rounded-2xl border-4 transition-all duration-500 flex items-center gap-4 ${
                currentStep.active === 'app' ? 'bg-sky-50 border-sky-400 scale-105 shadow-xl' : 'bg-white border-slate-200 opacity-60'
              }`}>
                <div className={`p-3 rounded-xl ${currentStep.active === 'app' ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  <AppWindow className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 uppercase text-xs">Uživatelská Aplikace</h4>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">User Space</span>
                  </div>
                  <div className="text-xs text-slate-700 font-mono mt-1 font-bold bg-white px-2 py-1 rounded border border-slate-200">
                    readFile("zprava.txt")
                  </div>
                </div>
              </div>

              <ArrowDown className={`z-10 w-5 h-5 transition-colors ${simStep > 0 ? 'text-purple-500' : 'text-slate-300'}`} />

              {/* 2. OS Adresář a FAT (vedle sebe) */}
              <div className="z-10 w-full max-w-lg flex flex-col sm:flex-row gap-4">
                {/* Adresář složky */}
                <div className={`sm:w-1/2 p-4 rounded-2xl border-4 transition-all duration-500 flex flex-col ${
                  currentStep.active === 'dir' ? 'bg-purple-50 border-purple-400 scale-105 shadow-xl' : 'bg-white border-slate-200 opacity-60'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <FolderOpen className={`w-5 h-5 ${currentStep.active === 'dir' ? 'text-purple-600' : 'text-slate-400'}`} />
                    <h4 className="font-bold text-slate-800 uppercase text-xs">Adresář složky</h4>
                  </div>
                  <div className={`text-[10px] w-full p-2.5 rounded-xl bg-white border ${
                    currentStep.active === 'dir' ? 'border-purple-200 shadow-xs' : 'border-slate-100'
                  }`}>
                    <div className="flex justify-between border-b pb-1.5 mb-1.5 font-bold uppercase text-[9px] tracking-wider text-slate-500">
                      <span>Název</span>
                      <span>Start cluster</span>
                    </div>
                    <div className={`flex justify-between items-center py-1 px-1.5 rounded mb-1 ${
                      currentStep.active === 'dir' ? 'text-purple-900 bg-purple-100 font-black' : 'font-medium text-slate-700'
                    }`}>
                      <span>zprava.txt</span>
                      <span className="font-mono bg-purple-200 text-purple-950 px-1.5 py-0.5 rounded text-[10px] font-bold">#2</span>
                    </div>
                    <div className="flex justify-between items-center py-1 px-1.5 text-slate-400">
                      <span>foto.jpg</span>
                      <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">#5</span>
                    </div>
                  </div>
                </div>

                {/* FAT Tabulka - vizuálně shodná s FatChapter teorií */}
                <div className={`sm:w-1/2 bg-white border-4 rounded-2xl p-4 shadow-sm transition-all duration-500 flex flex-col ${
                  currentStep.active === 'fat' ? 'border-sky-400 bg-sky-50/30 scale-105 shadow-xl' : 'border-slate-200 opacity-60'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-800 uppercase text-xs flex items-center gap-1.5">
                      <Table2 className="w-4 h-4 text-slate-500" /> FAT Tabulka
                    </h4>
                    <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">
                      Index ➔ Odkaz
                    </span>
                  </div>

                  {/* Názvy sloupců (Hlavička tabulky přesně jako ve FatChapter) */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-100 p-2 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-700 mb-2">
                    <div className="pl-1">Číslo clusteru</div>
                    <div className="pl-1">Následující</div>
                  </div>

                  {/* Řádky tabulky */}
                  <div className="space-y-1 font-mono text-xs max-h-[170px] overflow-y-auto pr-1">
                    {fatSimulationRows.map((row) => {
                      const isFile = row.isFile;
                      const isHighlight = isFile && currentStep.active === 'fat';

                      return (
                        <div
                          key={row.cluster}
                          className={`grid grid-cols-2 gap-2 p-1 rounded-lg border text-xs transition-colors items-center ${
                            isHighlight
                              ? 'bg-sky-50/90 border-sky-300 text-sky-900 font-bold ring-2 ring-sky-100 shadow-xs'
                              : isFile
                                ? 'bg-sky-50/60 border-sky-200 text-sky-900 font-bold'
                                : 'bg-slate-50/40 border-slate-100 text-slate-400'
                          }`}
                        >
                          {/* 1. Sloupec: Číslo clusteru */}
                          <div className="flex items-center gap-1 pl-1">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                isFile
                                  ? 'bg-sky-200 text-sky-950'
                                  : 'bg-slate-200/80 text-slate-600'
                              }`}
                            >
                              #{row.cluster}
                            </span>
                            {isFile && (
                              <span className="text-[9px] font-sans font-medium text-sky-700 truncate">
                                (zprava)
                              </span>
                            )}
                          </div>

                          {/* 2. Sloupec: Následující cluster */}
                          <div className="flex items-center gap-1 pl-1">
                            <span
                              className={`px-1.5 py-0.5 rounded font-black text-[10px] ${
                                isFile
                                  ? 'bg-white border border-sky-300 text-sky-700 shadow-xs'
                                  : 'text-slate-400'
                              }`}
                            >
                              {row.next}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <ArrowDown className={`z-10 w-5 h-5 transition-colors ${simStep > 2 ? 'text-emerald-500' : 'text-slate-300'}`} />

              {/* 3. Ovladač disku */}
              <div className={`z-10 w-full max-w-md p-4 rounded-2xl border-4 transition-all duration-500 flex items-center justify-between ${
                currentStep.active === 'driver' ? 'bg-emerald-50 border-emerald-400 scale-105 shadow-xl' : 'bg-white border-slate-200 opacity-60'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${currentStep.active === 'driver' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 uppercase text-xs">Ovladač disku</h4>
                    <span className="text-[10px] text-slate-500 font-bold">1 cluster = 1 sektor (4 KB)</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-right text-emerald-900 bg-emerald-100 p-2.5 rounded-xl border border-emerald-200 font-bold leading-tight">
                  Cluster 2 ➔ Sektor #2<br/>
                  Cluster 3 ➔ Sektor #3<br/>
                  Cluster 7 ➔ Sektor #7
                </div>
              </div>

              <ArrowDown className={`z-10 w-5 h-5 transition-colors ${simStep > 3 ? 'text-amber-500' : 'text-slate-300'}`} />

              {/* 4. Hardware disku (Čtení 3 sektorů) */}
              <div className={`z-10 w-full max-w-md p-4 rounded-2xl border-4 transition-all duration-500 flex flex-col gap-3 ${
                currentStep.active === 'disk' ? 'bg-slate-900 border-amber-500 scale-105 shadow-xl' : 'bg-slate-100 border-slate-300 opacity-60'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HardDrive className={`w-7 h-7 ${currentStep.active === 'disk' ? 'text-amber-400' : 'text-slate-400'}`} />
                    <div>
                      <h4 className={`font-bold uppercase text-xs ${currentStep.active === 'disk' ? 'text-white' : 'text-slate-600'}`}>
                        Hardware Disku
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">Fyzické čtení 3 sektorů</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    currentStep.active === 'disk' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-slate-200 text-slate-500'
                  }`}>
                    Sektory #2, #3, #7
                  </span>
                </div>

                {/* Sektory na disku */}
                <div className="flex justify-between items-center gap-1.5 bg-black/30 p-2 rounded-xl">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => {
                    const isTarget = s === 2 || s === 3 || s === 7;
                    return (
                      <div 
                        key={s} 
                        title={`Sektor #${s}`}
                        className={`flex-1 h-10 rounded-lg flex flex-col items-center justify-center text-[10px] font-mono font-bold transition-all ${
                          isTarget && currentStep.active === 'disk' 
                            ? 'bg-amber-400 text-amber-950 shadow-md ring-2 ring-amber-300 scale-105 animate-pulse' 
                            : isTarget
                              ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                              : 'bg-slate-800 text-slate-600'
                        }`} 
                      >
                        <span>#{s}</span>
                        {isTarget && <span className="text-[7px] uppercase font-black">ČTI</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </FsChapterShell>
  );
}

