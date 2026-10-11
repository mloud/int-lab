'use client';

import React, { useState } from 'react';
import { Database, MonitorPlay, Cpu, Layers, GitCommit } from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  PracticeLink,
  Callout
} from '../souborove-systemy/FsShared';
import { useRouter } from 'next/navigation';

export default function AdvancedProcessTopicsChapter({ 
  onBack,
  onOpenCpuGame,
  onOpenAllocatorGame,
  onOpenStepperGame
}: { 
  onBack: () => void,
  onOpenCpuGame: () => void,
  onOpenAllocatorGame: () => void,
  onOpenStepperGame: () => void
}) {
  const [activeTab, setActiveTab] = useState('theory');
  const router = useRouter();

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Database },
    { id: 'sim', label: 'Simulace & Hry', icon: MonitorPlay },
  ];

  return (
    <FsChapterShell
      chapterNumber={99}
      title="Pokročilá témata:"
      highlight="Plánování a paměť"
      subtitle="Komplexní koncepty plánování úloh procesoru, alokace paměťových bloků a krokování instrukcí."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && (
        <div className="space-y-12">
          
          <TheoryCard icon={Cpu} title="Plánování procesoru (CPU Scheduling)" letter="A" tone="indigo">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Když je v systému více připravených procesů než jader CPU, musí operační systém rozhodnout, 
              kterému procesu a na jak dlouho přidělí výpočetní čas procesoru. Tuto roli plní <strong>plánovač (scheduler)</strong>.
            </p>

            <div className="mt-8 bg-slate-50 p-6 sm:p-10 rounded-2xl border-2 border-slate-200 space-y-8">
              <div>
                <h4 className="font-bold text-slate-800 uppercase mb-2 text-sm tracking-widest">
                  1. FIFO / FCFS (First Come, First Served)
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Procesy jsou obsluhovány přesně v tom pořadí, v jakém dorazily do fronty. Nevýhodou je tzv. <strong>konvojový efekt</strong> – 
                  pokud první proces trvá velmi dlouho, všechny krátké procesy za ním musí čekat.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase mb-2 text-sm tracking-widest">
                  2. Round Robin (Časová kvanta)
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Základ preemptivního multitaskingu v moderních desktopových OS. Každý proces dostane pevný časový úsek (např. 10 ms). 
                  Když čas vyprší, procesor je mu odebrán a předán dalšímu procesu v kruhové frontě.
                </p>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard icon={Layers} title="Alokace a fragmentace paměti" letter="B" tone="emerald">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Při spouštění a ukončování programů vznikají v paměti RAM volné díry různé velikosti.
              Alokátor paměti používá strategie jako <strong>First Fit</strong> (první volný blok), <strong>Best Fit</strong> (nejmenší vyhovující) 
              nebo <strong>Worst Fit</strong>, aby procesům zajistil souvislý prostor.
            </p>

            <Callout kind="info" title="Proč se tím zabýváme v pokročilých tématech?">
              Tyto algoritmy představují univerzitní základ teorie operačních systémů. Pro běžné pochopení 
              toho, jak OS funguje, však plně postačuje princip střídání procesů pomocí registru PC z 1. kapitoly.
            </Callout>
          </TheoryCard>

        </div>
      )}

      {activeTab === 'sim' && (
        <div className="space-y-6">
          <PracticeLink 
            tag="SIMULÁTOR" 
            title="Instrukční cyklus CPU (Fetch-Decode-Execute)" 
            desc="Krokování instrukcí LOAD, ADD, STORE v procesoru a sledování registrů." 
            icon={Cpu} 
            tone="indigo" 
            onClick={onOpenCpuGame} 
          />
          <PracticeLink 
            tag="SIMULACE" 
            title="Alokátor paměti (First Fit / Best Fit)" 
            desc="Vyzkoušejte si přidělování bloků paměti RAM a řešení fragmentace." 
            icon={Layers} 
            tone="emerald" 
            onClick={onOpenAllocatorGame} 
          />
          <PracticeLink 
            tag="KROKOVÁNÍ" 
            title="Krokování běhu programu a zásobník" 
            desc="Sledujte volání funkcí, Stack Frame a změny v paměti při vykonávání kódu." 
            icon={GitCommit} 
            tone="purple" 
            onClick={onOpenStepperGame} 
          />
        </div>
      )}
    </FsChapterShell>
  );
}
