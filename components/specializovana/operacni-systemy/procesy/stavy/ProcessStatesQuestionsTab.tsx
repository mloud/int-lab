'use client';

import React from 'react';
import TopicReviewQuiz from '@/components/ui/TopicReviewQuiz';
import { PROCESS_STATES_QUESTIONS } from './processStatesQuestionsData';

export default function ProcessStatesQuestionsTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono font-bold uppercase text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
          Ověření znalostí
        </span>
        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
          Procvičování: Životní cyklus a stavy procesů
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Otestujte si pochopení přechodů mezi 5 základními stavy procesu, vlivu I/O operací a priority plánování. Otázky se náhodně míchají.
        </p>
      </div>

      <TopicReviewQuiz
        storageKey="intlab_process_states_quiz"
        title="Opakovací test: Životní cyklus a stavy procesů"
        badgeText="7 otázek"
        questions={PROCESS_STATES_QUESTIONS}
      />
    </div>
  );
}
