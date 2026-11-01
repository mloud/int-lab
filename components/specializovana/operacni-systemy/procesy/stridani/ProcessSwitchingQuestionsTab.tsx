'use client';

import React from 'react';
import { Clock, Layers, Cpu, Sliders } from 'lucide-react';
import TopicReviewQuiz from '@/components/ui/TopicReviewQuiz';
import { PROCESS_SWITCHING_QUESTIONS } from './processSwitchingQuestionsData';

/**
 * Záložka opakovacích otázek pro téma Střídání procesů (OSS 1).
 * Využívá standardizovanou šablonu TopicReviewQuiz.
 */
export default function ProcessSwitchingQuestionsTab() {
  const categoryIcons = {
    'Dělení času na CPU': <Clock className="w-4 h-4 text-indigo-600" />,
    'Principy multitaskingu': <Layers className="w-4 h-4 text-sky-600" />,
    'Střídání úloh': <Cpu className="w-4 h-4 text-emerald-600" />,
    'Režie & Výpočty': <Sliders className="w-4 h-4 text-amber-600" />
  };

  return (
    <TopicReviewQuiz
      storageKey="intlab_process_switching_questions_v1"
      title="Opakovací otázky: Střídání procesů"
      subtitle="Ověřte si pochopení časových kvant, typů multitaskingu, přepnutí kontextu i výpočtů režie na procesoru."
      badgeText="Procvičování znalostí"
      questions={PROCESS_SWITCHING_QUESTIONS}
      categoryIcons={categoryIcons}
    />
  );
}
