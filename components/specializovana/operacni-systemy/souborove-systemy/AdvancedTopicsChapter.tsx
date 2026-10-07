'use client';

import React, { useState } from 'react';
import { Database, MonitorPlay, Grid, Play } from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  PracticeLink,
  Callout
} from './FsShared';
import { useRouter } from 'next/navigation';

export default function AdvancedTopicsChapter({ 
  onBack,
  onOpenAllocationGame,
  onOpenClusterSizeGame
}: { 
  onBack: () => void,
  onOpenAllocationGame: () => void,
  onOpenClusterSizeGame: () => void
}) {
  const [activeTab, setActiveTab] = useState('theory');
  const router = useRouter();

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Database },
    { id: 'sim', label: 'Simulace', icon: MonitorPlay },
  ];

  return (
    <FsChapterShell
      chapterNumber={99}
      title="Pokročilá"
      highlight="témata"
      subtitle="Zajímavosti a komplexní principy, které se nevešly do základního kurzu."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && (
        <div className="space-y-12">
          
          <TheoryCard icon={Database} title="Alokační strategie" letter="A" tone="slate">
            <p>
              Když potřebuje operační systém uložit na disk nový soubor, musí najít volné clustery. Pokud je disk částečně zaplněný, vznikají na něm "díry" různých velikostí (např. 2 volné clustery, 5 volných clusterů, 1 volný cluster).
              OS se musí rozhodnout, do které z těchto děr soubor umístí. K tomu používá tři základní strategie.
            </p>

            <div className="mt-8 bg-slate-50 p-6 sm:p-10 rounded-2xl border-2 border-slate-200">
              <div className="max-w-3xl mx-auto space-y-12">
                
                {/* FIRST FIT */}
                <div>
                  <h4 className="font-bold text-slate-800 uppercase mb-4 text-sm tracking-widest">1. First Fit (První vhodná)</h4>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    OS prochází disk od začátku a data zapíše do <strong>úplně první díry</strong>, do které se soubor vejde. Je to nejrychlejší metoda, ale často fragmentuje zbytek disku.
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    {[...Array(8)].map((_, i) => {
                      const isData = i === 0 || i === 4;
                      const isTarget = i === 1 || i === 2; // Zapisujeme 2 clustery
                      const isFree = !isData && !isTarget;
                      
                      let bgClass = isData ? 'bg-slate-300' : isTarget ? 'bg-indigo-500 shadow-md scale-105 z-10' : 'bg-white';
                      let borderClass = isData ? 'border-slate-400' : isTarget ? 'border-indigo-600' : 'border-slate-200';
                      let textTop = isTarget ? 'text-indigo-100' : 'text-slate-400';
                      let content = isData ? 'Data' : isTarget ? 'Zápis' : 'Volno';

                      return (
                        <div key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 relative transition-all ${bgClass} ${borderClass}`}>
                          <div className={`absolute top-1 left-1.5 text-[9px] font-mono opacity-80 ${textTop}`}>#{i}</div>
                          <div className={`text-[10px] font-bold mt-1 ${isTarget ? 'text-white' : 'text-slate-500'}`}>{content}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* BEST FIT */}
                <div>
                  <h4 className="font-bold text-slate-800 uppercase mb-4 text-sm tracking-widest">2. Best Fit (Nejlépe vyhovující)</h4>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    OS projde celý disk, najde všechny volné díry a vybere tu, která je <strong>nejmenší možná, ale soubor se do ní ještě vejde</strong>. Šetří velké prázdné bloky pro velké soubory, ale zanechává za sebou spoustu malinkých (nepoužitelných) děr.
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    {[...Array(8)].map((_, i) => {
                      const isData = i === 0 || i === 4;
                      const isTarget = i === 5 || i === 6; // Díra č. 2 má přesně 3 místa (5,6,7), zatímco první díra má 3 místa (1,2,3). Tedy Best fit by našel tu nejtěsnější. Dáme sem díru 2 místa a 3 místa.
                      // Adjusting to make sense:
                      // Data: [0], Free: [1,2,3,4] (4 slots). Data: [5]. Free: [6,7] (2 slots). Target is 2 slots.
                      const isData2 = i === 0 || i === 5;
                      const isTarget2 = i === 6 || i === 7;
                      const isFree2 = !isData2 && !isTarget2;

                      let bgClass = isData2 ? 'bg-slate-300' : isTarget2 ? 'bg-emerald-500 shadow-md scale-105 z-10' : 'bg-white';
                      let borderClass = isData2 ? 'border-slate-400' : isTarget2 ? 'border-emerald-600' : 'border-slate-200';
                      let textTop = isTarget2 ? 'text-emerald-100' : 'text-slate-400';
                      let content = isData2 ? 'Data' : isTarget2 ? 'Zápis' : 'Volno';

                      return (
                        <div key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 relative transition-all ${bgClass} ${borderClass}`}>
                          <div className={`absolute top-1 left-1.5 text-[9px] font-mono opacity-80 ${textTop}`}>#{i}</div>
                          <div className={`text-[10px] font-bold mt-1 ${isTarget2 ? 'text-white' : 'text-slate-500'}`}>{content}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* WORST FIT */}
                <div>
                  <h4 className="font-bold text-slate-800 uppercase mb-4 text-sm tracking-widest">3. Worst Fit (Nejhůře vyhovující)</h4>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    Opak Best Fitu. OS najde <strong>tu úplně největší možnou díru</strong> na disku a soubor zapíše do ní. Zbytek této velké díry pak zůstane dostatečně velký na to, aby se do něj dal zapsat další užitečný soubor. Nevytváří se tak malinké nevyužitelné mezery.
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    {[...Array(8)].map((_, i) => {
                      // Data: [0], Free: [1,2,3,4] (4 slots). Data: [5]. Free: [6,7] (2 slots).
                      // Target is 2 slots. Worst fit puts it in the biggest hole (1,2,3,4) -> so puts it at 1,2.
                      const isData3 = i === 0 || i === 5;
                      const isTarget3 = i === 1 || i === 2;
                      const isFree3 = !isData3 && !isTarget3;

                      let bgClass = isData3 ? 'bg-slate-300' : isTarget3 ? 'bg-rose-500 shadow-md scale-105 z-10' : 'bg-white';
                      let borderClass = isData3 ? 'border-slate-400' : isTarget3 ? 'border-rose-600' : 'border-slate-200';
                      let textTop = isTarget3 ? 'text-rose-100' : 'text-slate-400';
                      let content = isData3 ? 'Data' : isTarget3 ? 'Zápis' : 'Volno';

                      return (
                        <div key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 relative transition-all ${bgClass} ${borderClass}`}>
                          <div className={`absolute top-1 left-1.5 text-[9px] font-mono opacity-80 ${textTop}`}>#{i}</div>
                          <div className={`text-[10px] font-bold mt-1 ${isTarget3 ? 'text-white' : 'text-slate-500'}`}>{content}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </TheoryCard>

        </div>
      )}

      {activeTab === 'sim' && (
        <div className="space-y-6">
          <PracticeLink 
            tag="HRA" 
            title="Velikost clusteru" 
            desc="Spočítejte si, jak moc plýtváte místem na disku (vnitřní fragmentace)." 
            icon={Grid} 
            tone="purple" 
            onClick={onOpenClusterSizeGame} 
          />
          <PracticeLink 
            tag="SIMULACE" 
            title="Alokační strategie" 
            desc="Vyzkoušejte si First Fit, Best Fit a Worst Fit v praxi." 
            icon={Database} 
            tone="emerald" 
            onClick={onOpenAllocationGame} 
          />
        </div>
      )}
    </FsChapterShell>
  );
}
