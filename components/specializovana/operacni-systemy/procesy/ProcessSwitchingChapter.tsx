'use client';

import React, { useState } from 'react';
import { RefreshCw, Play, BookOpen, Cpu, HelpCircle, ClipboardList } from 'lucide-react';
import { FsChapterShell } from '../souborove-systemy/FsShared';
import ProcessSwitchingTheoryTab from './stridani/ProcessSwitchingTheoryTab';
import ProcessSwitchingSimulatorTab from './stridani/ProcessSwitchingSimulatorTab';
import ProcessSwitchingLabTab from './stridani/ProcessSwitchingLabTab';
import ProcessSwitchingQuestionsTab from './stridani/ProcessSwitchingQuestionsTab';

interface ProcessSwitchingChapterProps {
  onBack: () => void;
}

export default function ProcessSwitchingChapter({ onBack }: ProcessSwitchingChapterProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'sim' | 'lab' | 'questions'>('theory');

  const tabs = [
    { id: 'theory', label: 'Teorie & Principy', icon: BookOpen },
    { id: 'sim', label: 'Simulátor střídání na CPU', icon: Cpu },
    { id: 'lab', label: 'Praktické úlohy', icon: ClipboardList },
    { id: 'questions', label: 'Opakovací otázky', icon: HelpCircle },
  ];

  return (
    <FsChapterShell
      chapterNumber={2}
      totalChapters={5}
      title="Střídání procesů:"
      highlight="Multitasking"
      subtitle="Jak jeden procesor zvládá desítky aplikací naráz, co je to časové kvantum a jak funguje přepnutí kontextu na CPU."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as 'theory' | 'sim' | 'lab' | 'questions')}
      onBack={onBack}
    >
      {activeTab === 'theory' && <ProcessSwitchingTheoryTab />}
      {activeTab === 'sim' && <ProcessSwitchingSimulatorTab />}
      {activeTab === 'lab' && <ProcessSwitchingLabTab />}
      {activeTab === 'questions' && <ProcessSwitchingQuestionsTab />}
    </FsChapterShell>
  );
}
