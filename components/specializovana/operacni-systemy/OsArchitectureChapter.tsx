"use client";

import React, { useState } from 'react';
import { ArrowLeft, Cpu, Gamepad2, BookOpen, Brain } from 'lucide-react';
import { Phase } from './architektura/OsArchitectureData';
import { ArchitectureTheoryTab } from './architektura/ArchitectureTheoryTab';
import { ArchitecturePracticeTab } from './architektura/ArchitecturePracticeTab';
import { ArchitectureUseCasesTab } from './architektura/ArchitectureUseCasesTab';
import { ArchitectureQuizTab } from './architektura/ArchitectureQuizTab';

interface OsArchitectureChapterProps {
  onBack: () => void;
}

const OsArchitectureChapter: React.FC<OsArchitectureChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'practice' | 'use-cases' | 'quiz'>('theory');
  const [phase, setPhase] = useState<Phase>('builder');

  return (
    <div className="max-w-6xl w-full min-h-screen p-4 flex flex-col items-center animate-in fade-in duration-500">
      <div className="w-full flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 border-2 border-gray-100 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
      </div>

      <div className="w-full max-w-5xl bg-white p-2 rounded-2xl flex shadow-sm border border-slate-200 mb-6 sticky top-4 z-50 overflow-x-auto">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'theory' ? 'bg-purple-50 text-purple-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <BookOpen className="w-5 h-5" /> Teorie
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'practice' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Cpu className="w-5 h-5" /> Jdeme si to postavit
        </button>
        <button
          onClick={() => setActiveTab('use-cases')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'use-cases' ? 'bg-green-50 text-green-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Gamepad2 className="w-5 h-5" /> Kde se co používá?
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2 ${activeTab === 'quiz' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Brain className="w-5 h-5" /> Ověření znalostí
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl w-full rounded-[3rem] shadow-2xl border-4 border-white p-8 sm:p-12 overflow-hidden relative min-h-[600px]">

        {activeTab === 'theory' && (
          <ArchitectureTheoryTab onGoToPractice={() => setActiveTab('practice')} />
        )}
        {activeTab === 'practice' && (
          <ArchitecturePracticeTab phase={phase} setPhase={setPhase} />
        )}
        {activeTab === 'use-cases' && (
          <ArchitectureUseCasesTab />
        )}
        {activeTab === 'quiz' && (
          <ArchitectureQuizTab />
        )}
      </div>
    </div>
  );
};

export default OsArchitectureChapter;
