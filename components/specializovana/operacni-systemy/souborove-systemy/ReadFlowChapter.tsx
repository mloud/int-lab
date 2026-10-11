'use client';
import React, { useState } from 'react';
import { Layers, MonitorPlay, ArrowRight, AppWindow, FolderOpen, Table2, Cpu, HardDrive, ArrowDown } from 'lucide-react';
import { FsChapterShell, TheoryCard, Callout } from './FsShared';

interface ReadFlowChapterProps {
  onBack: () => void;
}

export default function ReadFlowChapter({ onBack }: ReadFlowChapterProps) {
  const [activeTab, setActiveTab] = useState('theory');
  const [simStep, setSimStep] = useState(0);

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Layers },
    { id: 'sim', label: 'Simulace', icon: MonitorPlay },
  ];

  const steps = [
    { id: 0, title: '1. Požadavek aplikace', desc: 'Uživatel v textovém editoru otevírá soubor "zprava.txt". Aplikace požádá OS o přístup k datům (volá API funkci pro čtení).', active: 'app' },
    { id: 1, title: '2. Vyhledání v adresáři', desc: 'Modul správy souborů v OS prohledá strukturu složek. Najde záznam "zprava.txt" a zjistí, že soubor začíná na clusteru 2.', active: 'dir' },
    { id: 2, title: '3. Trasování FAT tabulky', desc: 'OS se podívá do FAT tabulky na položku clusteru 2. Ta odkazuje na cluster 3. Položka 3 obsahuje značku EOF. Soubor tedy leží v clusterech 2 a 3. OS pracuje výhradně s clustery!', active: 'fat' },
    { id: 3, title: '4. Překlad v ovladači', desc: 'OS požádá ovladač disku o přečtení clusterů 2 a 3. Teprve ovladač přepočítá clustery na adresy fyzických sektorů (LBA). Např. cluster 2 = sektory 16–23, cluster 3 = sektory 24–31.', active: 'driver' },
    { id: 4, title: '5. Práce hardwaru', desc: 'Elektronika disku přijme požadavek na čtení sektorů 16–31. Přesune hlavičky (nebo adresuje NAND) a načtená data pošle zpět aplikaci.', active: 'disk' }
  ];

  const currentStep = steps[simStep];

  return (
    <FsChapterShell
      chapterNumber={6}
      title="Architektura"
      highlight="v praxi"
      subtitle="Jak spolupracují OS, FAT tabulka a disk při čtení souboru."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && (
        <div className="space-y-12">
          <TheoryCard icon={Layers} title="Celkový pohled na abstrakci" letter="A" tone="indigo">
            <p>
              Zatím jsme se na disk dívali ze dvou úhlů: jako na hromadu sektorů (pohled hardwaru) a jako na strom složek a souborů (pohled uživatele). 
              Úkolem <strong>souborového systému (FS)</strong> v rámci operačního systému je plynule tyto dva světy propojovat.
            </p>
            <p className="mt-4">
              Když jakákoliv aplikace (Word, Hra, Prohlížeč) potřebuje data, vůbec netuší, co je to sektor nebo cluster. Volá pouze jednoduchou systémovou funkci <code>readFile("zprava.txt")</code>. Zbytek složité magie se odehrává v jádře operačního systému a v hardwaru.
            </p>
            <div className="mt-6">
              <Callout kind="key" title="Vrstvení (Abstrakce: OS vs. Hardware)">
                Každá vrstva řeší jen svůj úkol a spoléhá na vrstvu pod sebou. Aplikace zná jen jméno souboru. OS a souborový systém (FAT) pracují výhradně s <strong>clustery</strong>. Teprve ovladač disku přepočítá clustery na fyzické <strong>sektory</strong>. A disk pak sektory fyzicky načte.
              </Callout>
            </div>
          </TheoryCard>

          <TheoryCard icon={ArrowRight} title="Krok za krokem: Čtení souboru" letter="B" tone="emerald">
            <ul className="list-disc list-inside space-y-4">
              <li><strong>Aplikace:</strong> Pošle požadavek na otevření souboru (např. <code>C:\Dokumenty\zprava.txt</code>).</li>
              <li><strong>Adresář (Directory):</strong> Jádro OS najde v datových strukturách složky záznam o tomto souboru. Zjistí metadata (datum, práva) a hlavně <strong>číslo počátečního clusteru</strong> (cluster 2).</li>
              <li><strong>FAT Tabulka (nebo MFT u NTFS):</strong> OS načte mapu alokace. Od počátečního clusteru 2 skáče po odkazech (2 ➔ 3 ➔ EOF). Tím získá kompletní řetězec clusterů souboru.</li>
              <li><strong>Ovladač disku (Driver):</strong> Požadavek na přečtení clusterů 2 a 3 je předán diskovému ovladači. Ten ví, jak převést logický cluster (blok FS) na logické sektory (LBA - Logical Block Addressing, např. cluster 2 na sektory 16–23).</li>
              <li><strong>Firmware disku (Hardware):</strong> Samotný disk (HDD/SSD) dostane požadavek „přečti LBA sektory 16 až 31“. Přeloží to na své vnitřní fyzické adresování (hlava, válec, sektor / NAND blok, stránka) a vrátí data.</li>
            </ul>
          </TheoryCard>
        </div>
      )}

      {activeTab === 'sim' && (
        <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border-2 border-slate-200">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Levé menu - Kroky */}
            <div className="w-full lg:w-1/3 space-y-4">
              <h3 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">Kroky procesu</h3>
              {steps.map((step, idx) => (
                <div 
                  key={step.id} 
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${simStep === idx ? 'bg-white border-purple-500 shadow-md ring-4 ring-purple-50' : simStep > idx ? 'bg-slate-100 border-emerald-300 opacity-70' : 'bg-white border-slate-200 opacity-50'}`}
                  onClick={() => setSimStep(idx)}
                >
                  <h4 className={`font-bold text-sm uppercase tracking-wide mb-1 ${simStep === idx ? 'text-purple-700' : simStep > idx ? 'text-emerald-700' : 'text-slate-500'}`}>{step.title}</h4>
                  {simStep === idx && <p className="text-sm text-slate-600 mt-2">{step.desc}</p>}
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
            <div className="w-full lg:w-2/3 flex flex-col items-center gap-6 bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-inner min-h-[500px] relative">
              
              {/* Spojovací čáry (jen vizuální pozadí) */}
              <div className="absolute inset-0 z-0 pointer-events-none flex flex-col items-center justify-center">
                 <div className="w-1 bg-slate-200 h-full"></div>
              </div>

              {/* 1. Aplikace */}
              <div className={`z-10 w-full max-w-sm p-4 rounded-2xl border-4 transition-all duration-500 flex items-center gap-4 ${currentStep.active === 'app' ? 'bg-sky-50 border-sky-400 scale-105 shadow-xl' : 'bg-white border-slate-200 opacity-60'}`}>
                <div className={`p-3 rounded-xl ${currentStep.active === 'app' ? 'bg-sky-500' : 'bg-slate-200'}`}>
                  <AppWindow className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 uppercase text-sm">Aplikace</h4>
                  <div className="text-xs text-slate-500 font-mono mt-1">readFile("zprava.txt")</div>
                </div>
              </div>

              <ArrowDown className={`z-10 w-6 h-6 transition-colors ${simStep > 0 ? 'text-purple-500' : 'text-slate-300'}`} />

              {/* 2. OS Adresář a FAT (vedle sebe) */}
              <div className="z-10 w-full max-w-lg flex gap-4">
                <div className={`flex-1 p-4 rounded-2xl border-4 transition-all duration-500 flex flex-col items-center text-center ${currentStep.active === 'dir' ? 'bg-purple-50 border-purple-400 scale-105 shadow-xl' : 'bg-white border-slate-200 opacity-60'}`}>
                  <FolderOpen className={`w-8 h-8 mb-2 ${currentStep.active === 'dir' ? 'text-purple-500' : 'text-slate-400'}`} />
                  <h4 className="font-bold text-slate-800 uppercase text-xs">Adresář složky</h4>
                  <div className={`mt-3 text-[10px] w-full text-left p-2.5 rounded-xl bg-white border ${currentStep.active === 'dir' ? 'border-purple-200 shadow-sm' : 'border-slate-100'}`}>
                    <div className="flex justify-between border-b pb-1.5 mb-1.5 font-bold uppercase text-[9px] tracking-wider text-slate-500">
                      <span>Název</span>
                      <span>Start cluster</span>
                    </div>
                    <div className={`flex justify-between items-center py-1 px-1.5 rounded mb-1 ${currentStep.active === 'dir' ? 'text-purple-900 bg-purple-100 font-black' : 'font-medium text-slate-700'}`}>
                      <span>zprava.txt</span>
                      <span className="font-mono bg-purple-200/60 px-1.5 py-0.2 rounded text-[10px]">#2</span>
                    </div>
                    <div className="flex justify-between items-center py-1 px-1.5 text-slate-400">
                      <span>dovolena.jpg</span>
                      <span className="font-mono bg-slate-100 px-1.5 py-0.2 rounded text-[10px]">#7</span>
                    </div>
                  </div>
                </div>

                <div className={`flex-1 p-4 rounded-2xl border-4 transition-all duration-500 flex flex-col items-center text-center ${currentStep.active === 'fat' ? 'bg-indigo-50 border-indigo-400 scale-105 shadow-xl' : 'bg-white border-slate-200 opacity-60'}`}>
                  <Table2 className={`w-8 h-8 mb-2 ${currentStep.active === 'fat' ? 'text-indigo-500' : 'text-slate-400'}`} />
                  <h4 className="font-bold text-slate-800 uppercase text-xs">FAT Tabulka (OS)</h4>
                  <div className={`mt-3 text-[10px] w-full p-2.5 rounded-xl bg-white border ${currentStep.active === 'fat' ? 'border-indigo-200 shadow-sm' : 'border-slate-100'}`}>
                    <div className="grid grid-cols-2 border-b pb-1.5 mb-1.5 font-bold uppercase text-[9px] tracking-wider text-slate-500 text-left">
                      <span>Cluster</span>
                      <span>Další</span>
                    </div>
                    <div className="space-y-1 font-mono text-[10px]">
                      {[
                        { id: 2, next: '3', isTarget: true },
                        { id: 3, next: 'EOF', isTarget: true },
                        { id: 4, next: '0', isTarget: false },
                        { id: 7, next: '8', isTarget: false },
                        { id: 8, next: '14', isTarget: false },
                      ].map((item) => (
                        <div 
                          key={item.id} 
                          className={`grid grid-cols-2 p-1 rounded items-center text-left ${item.isTarget && currentStep.active === 'fat' ? 'bg-indigo-100 text-indigo-900 font-black border border-indigo-200' : 'bg-slate-50 text-slate-500'}`}
                        >
                          <span>#{item.id}</span>
                          <span className={`font-black ${item.isTarget && currentStep.active === 'fat' ? 'text-indigo-800' : 'text-slate-600'}`}>{item.next}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <ArrowDown className={`z-10 w-6 h-6 transition-colors ${simStep > 2 ? 'text-emerald-500' : 'text-slate-300'}`} />

              {/* 3. Ovladač */}
              <div className={`z-10 w-full max-w-sm p-4 rounded-2xl border-4 transition-all duration-500 flex items-center justify-between ${currentStep.active === 'driver' ? 'bg-emerald-50 border-emerald-400 scale-105 shadow-xl' : 'bg-white border-slate-200 opacity-60'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${currentStep.active === 'driver' ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 uppercase text-sm">Ovladač disku</h4>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Přepočet na LBA</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-right text-emerald-800 bg-emerald-100/80 p-2.5 rounded-xl border border-emerald-200 font-bold leading-tight">
                  Cluster 2 → Sektory 16–23<br/>
                  Cluster 3 → Sektory 24–31
                </div>
              </div>

              <ArrowDown className={`z-10 w-6 h-6 transition-colors ${simStep > 3 ? 'text-amber-500' : 'text-slate-300'}`} />

              {/* 4. Disk */}
              <div className={`z-10 w-full max-w-sm p-4 rounded-2xl border-4 transition-all duration-500 flex items-center justify-between ${currentStep.active === 'disk' ? 'bg-slate-800 border-amber-500 scale-105 shadow-xl' : 'bg-slate-100 border-slate-300 opacity-60'}`}>
                <div className="flex items-center gap-3">
                  <HardDrive className={`w-8 h-8 ${currentStep.active === 'disk' ? 'text-amber-400' : 'text-slate-400'}`} />
                  <div>
                    <h4 className={`font-bold uppercase text-sm ${currentStep.active === 'disk' ? 'text-white' : 'text-slate-500'}`}>Hardware Disku</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Fyzické čtení sektorů</span>
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  {[16, 17, 18, 24, 25, 26].map((s, i) => (
                    <div 
                      key={i} 
                      title={`LBA Sektor ${s}`}
                      className={`w-4 h-9 rounded-md flex flex-col items-center justify-center text-[8px] font-mono font-bold transition-all ${currentStep.active === 'disk' ? 'bg-amber-400 text-amber-950 shadow-md animate-pulse' : 'bg-slate-300 text-slate-500'}`} 
                      style={{animationDelay: `${i*120}ms`}}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </FsChapterShell>
  );
}
