"use client";

import React, { useState } from 'react';
import { Cpu, BookOpen, RotateCcw } from 'lucide-react';
import { FsChapterShell, FsTab } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import VonNeumannTheory from './VonNeumannTheory';
import { VonNeumannBuilderPhase } from './von-neumann/VonNeumannBuilderPhase';
import { VonNeumannSimPhases } from './von-neumann/VonNeumannSimPhases';

interface VonNeumannGameProps {
  onBack: () => void;
}

const TABS: FsTab[] = [
  { id: 'teorie', label: 'Teorie & Princip', icon: BookOpen },
  { id: 'simulace', label: 'Interaktivní simulátor', icon: Cpu },
];

const VonNeumannGame: React.FC<VonNeumannGameProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'teorie' | 'simulace'>('teorie');
  const [phase, setPhase] = useState<'builder' | 'simple-sim' | 'simulator'>('builder');
  const [simResetKey, setSimResetKey] = useState(0);

  const handleReset = () => setSimResetKey(k => k + 1);

  return (
    <FsChapterShell
      title="Von Neumannova"
      highlight="architektura"
      subtitle="Základní koncepční model moderních počítačů: procesor s řadičem a ALU, společná paměť a systém sběrnic."
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as 'teorie' | 'simulace')}
      onBack={onBack}
    >
      {activeTab === 'teorie' && <VonNeumannTheory />}

      {activeTab === 'simulace' && (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 mr-2">Režim simulace:</span>
              <button 
                onClick={() => setPhase('builder')} 
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${phase === 'builder' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
              >
                1. Skládačka HW
              </button>
              <button 
                onClick={() => setPhase('simple-sim')} 
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${phase === 'simple-sim' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
              >
                2. Zjednodušený tok
              </button>
              <button 
                onClick={() => setPhase('simulator')} 
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${phase === 'simulator' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
              >
                3. Pokročilý simulátor
              </button>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 uppercase tracking-wider text-xs transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset simulace
            </button>
          </div>

          {phase === 'builder' && (
            <VonNeumannBuilderPhase key={simResetKey} onComplete={() => setPhase('simple-sim')} />
          )}
          {(phase === 'simple-sim' || phase === 'simulator') && (
            <VonNeumannSimPhases key={simResetKey} phase={phase} />
          )}
        </div>
      )}
    </FsChapterShell>
  );
};

export default VonNeumannGame;
