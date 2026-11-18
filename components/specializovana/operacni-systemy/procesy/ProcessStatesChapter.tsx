'use client';

import React, { useState } from 'react';
import { Activity, Play, HelpCircle, ClipboardList } from 'lucide-react';
import { FsChapterShell } from '../souborove-systemy/FsShared';
import ProcessStatesTheoryTab from './stavy/ProcessStatesTheoryTab';
import ProcessStatesSimulatorTab from './stavy/ProcessStatesSimulatorTab';
import ProcessStatesQuestionsTab from './stavy/ProcessStatesQuestionsTab';
import ProcessStatesLabTab from './stavy/ProcessStatesLabTab';

interface ProcessStatesChapterProps {
  onBack: () => void;
}

export default function ProcessStatesChapter({ onBack }: ProcessStatesChapterProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'sim' | 'questions' | 'lab'>('theory');

  const tabs = [
    { id: 'theory', label: 'Teorie & Principy', icon: Activity },
    { id: 'sim', label: 'Simulátor životního cyklu a I/O', icon: Play },
    { id: 'questions', label: 'Opakovací otázky', icon: HelpCircle },
    { id: 'lab', label: 'Praktické úkoly & Protokol', icon: ClipboardList },
  ];

  return (
    <FsChapterShell
      chapterNumber={3}
      totalChapters={5}
      title="Životní cyklus a stavy:"
      highlight="Stavový diagram procesu"
      subtitle="Proč proces většinu času nepočítá na CPU, co se děje při čekání na disk a jak funguje 5 základních stavů."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as 'theory' | 'sim' | 'questions' | 'lab')}
      onBack={onBack}
    >
      {activeTab === 'theory' && <ProcessStatesTheoryTab />}
      {activeTab === 'sim' && <ProcessStatesSimulatorTab />}
      {activeTab === 'questions' && <ProcessStatesQuestionsTab />}
      {activeTab === 'lab' && <ProcessStatesLabTab />}
    </FsChapterShell>
  );
}
