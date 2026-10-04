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
    { id: 0, title: '1. Požadavek aplikace', desc: 'Uživatel v textovém editoru otevírá soubor "tajnosti.txt". Aplikace požádá OS o přístup k datům (volá API funkci pro čtení).', active: 'app' },
    { id: 1, title: '2. Vyhledání v adresáři', desc: 'Modul správy souborů v OS prohledá strukturu složek. Najde záznam "tajnosti.txt" a zjistí, že soubor začíná na clusteru 5.', active: 'dir' },
    { id: 2, title: '3. Trasování FAT tabulky', desc: 'OS se podívá do FAT tabulky na položku 5. Ta ukazuje na 6. Položka 6 obsahuje značku EOF. Soubor tedy leží v clusterech 5 a 6.', active: 'fat' },
    { id: 3, title: '4. Překlad v ovladači', desc: 'OS požádá ovladač disku o přečtení clusterů 5 a 6. Ovladač přepočítá clustery na adresy fyzických sektorů (LBA). Např. cluster 5 = sektory 40-47.', active: 'driver' },
    { id: 4, title: '5. Práce hardwaru', desc: 'Elektronika disku přijme požadavek na čtení sektorů 40-55. Přesune hlavičky (nebo adresuje NAND) a načtená data pošle zpět aplikaci.', active: 'disk' }
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
              Když jakákoliv aplikace (Word, Hra, Prohlížeč) potřebuje data, vůbec netuší, co je to sektor nebo cluster. Volá pouze jednoduchou systémovou funkci <code>readFile("tajnosti.txt")</code>. Zbytek složité magie se odehrává v jádře operačního systému a v hardwaru.
            </p>
            <div className="mt-6">
              <Callout kind="key" title="Vrstvení (Abstrakce)">
                Každá vrstva řeší jen svůj úkol a spoléhá na vrstvu pod sebou. Aplikace zná jen jméno souboru. OS převede jméno na clustery (pomocí složek a FAT). Ovladač převede clustery na sektory. Disk převede sektory na magnetické stopy nebo buňky flash paměti.
              </Callout>
            </div>
          </TheoryCard>

          <TheoryCard icon={ArrowRight} title="Krok za krokem: Čtení souboru" letter="B" tone="emerald">
            <ul className="list-disc list-inside space-y-4">
              <li><strong>Aplikace:</strong> Pošle požadavek na otevření souboru (např. <code>C:\Dokumenty\tajnosti.txt</code>).</li>
              <li><strong>Adresář (Directory):</strong> Jádro OS najde v datových strukturách záznam o tomto souboru. Zjistí metadata (datum, práva) a hlavně <strong>číslo počátečního clusteru</strong>.</li>
              <li><strong>FAT Tabulka (nebo MFT u NTFS):</strong> OS načte mapu disku. Od počátečního clusteru "skáče" po odkazech až na konec souboru (EOF). Tím získá seznam všech potřebných clusterů.</li>
              <li><strong>Ovladač disku (Driver):</strong> Požadavek na přečtení seznamu clusterů je předán ovladači. Ten ví, jak je disk velký a jak převést logický cluster (blok FS) na logické sektory (LBA - Logical Block Addressing).</li>
              <li><strong>Firmware disku (Hardware):</strong> Samotný disk (HDD/SSD) dostane požadavek "přečti LBA sektory 1000 až 1015". Přeloží to na své vnitřní fyzické adresování (hlava, válec, sektor / NAND blok, stránka) a vrátí data.</li>
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
                  <div className="text-xs text-slate-500 font-mono mt-1">readFile("tajnosti.txt")</div>
                </div>
              </div>

              <ArrowDown className={`z-10 w-6 h-6 transition-colors ${simStep > 0 ? 'text-purple-500' : 'text-slate-300'}`} />

              {/* 2. OS Adresář a FAT (vedle sebe) */}
              <div className="z-10 w-full max-w-md flex gap-4">
                <div className={`flex-1 p-4 rounded-2xl border-4 transition-all duration-500 flex flex-col items-center text-center ${currentStep.active === 'dir' ? 'bg-purple-50 border-purple-400 scale-105 shadow-xl' : 'bg-white border-slate-200 opacity-60'}`}>
                  <FolderOpen className={`w-8 h-8 mb-2 ${currentStep.active === 'dir' ? 'text-purple-500' : 'text-slate-400'}`} />
                  <h4 className="font-bold text-slate-800 uppercase text-xs">Adresář složky</h4>
                  <div className={`mt-3 text-[10px] w-full text-left p-2 rounded bg-white border ${currentStep.active === 'dir' ? 'border-purple-200' : 'border-slate-100'}`}>
                    <div className="flex justify-between border-b pb-1 mb-1 font-bold"><span>Název</span><span>Start</span></div>
                    <div className="flex justify-between text-slate-400"><span>fotka.jpg</span><span>2</span></div>
                    <div className={`flex justify-between font-bold ${currentStep.active === 'dir' ? 'text-purple-700 bg-purple-100 px-1' : ''}`}><span>tajnosti.txt</span><span>5</span></div>
                  </div>
                </div>

                <div className={`flex-1 p-4 rounded-2xl border-4 transition-all duration-500 flex flex-col items-center text-center ${currentStep.active === 'fat' ? 'bg-indigo-50 border-indigo-400 scale-105 shadow-xl' : 'bg-white border-slate-200 opacity-60'}`}>
                  <Table2 className={`w-8 h-8 mb-2 ${currentStep.active === 'fat' ? 'text-indigo-500' : 'text-slate-400'}`} />
                  <h4 className="font-bold text-slate-800 uppercase text-xs">FAT Tabulka</h4>
                  <div className={`mt-3 text-[10px] w-full p-2 rounded bg-white border grid grid-cols-2 gap-1 text-center font-mono ${currentStep.active === 'fat' ? 'border-indigo-200' : 'border-slate-100'}`}>
                    <div className="bg-slate-100 rounded">[2] 3</div>
                    <div className="bg-slate-100 rounded">[3] EOF</div>
                    <div className="bg-slate-100 rounded">[4] 0</div>
                    <div className={`rounded font-bold ${currentStep.active === 'fat' ? 'bg-indigo-200 text-indigo-900' : 'bg-slate-100'}`}>[5] 6</div>
                    <div className={`rounded font-bold ${currentStep.active === 'fat' ? 'bg-indigo-200 text-indigo-900' : 'bg-slate-100'}`}>[6] EOF</div>
                    <div className="bg-slate-100 rounded">[7] 0</div>
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
                  </div>
                </div>
                <div className="text-[10px] font-mono text-right text-emerald-700 bg-emerald-100 p-2 rounded-lg border border-emerald-200">
                  Cluster 5 → Sectors 40-47<br/>
                  Cluster 6 → Sectors 48-55
                </div>
              </div>

              <ArrowDown className={`z-10 w-6 h-6 transition-colors ${simStep > 3 ? 'text-amber-500' : 'text-slate-300'}`} />

              {/* 4. Disk */}
              <div className={`z-10 w-full max-w-sm p-4 rounded-2xl border-4 transition-all duration-500 flex items-center justify-between ${currentStep.active === 'disk' ? 'bg-slate-800 border-amber-500 scale-105 shadow-xl' : 'bg-slate-100 border-slate-300 opacity-60'}`}>
                <div className="flex items-center gap-3">
                  <HardDrive className={`w-8 h-8 ${currentStep.active === 'disk' ? 'text-amber-400' : 'text-slate-400'}`} />
                  <div>
                    <h4 className={`font-bold uppercase text-sm ${currentStep.active === 'disk' ? 'text-white' : 'text-slate-500'}`}>Hardware Disku</h4>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[40,41,42,48,49,50].map((s, i) => (
                    <div key={i} className={`w-3 h-8 rounded-sm ${currentStep.active === 'disk' ? 'bg-amber-400 animate-pulse' : 'bg-slate-300'}`} style={{animationDelay: `${i*100}ms`}}></div>
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
