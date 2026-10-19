'use client';

import React, { useState } from 'react';
import { RefreshCw, Play, BookOpen, Cpu } from 'lucide-react';
import { FsChapterShell } from '../souborove-systemy/FsShared';
import ProcessSwitchingTheoryTab from './stridani/ProcessSwitchingTheoryTab';
import ProcessSwitchingSimulatorTab from './stridani/ProcessSwitchingSimulatorTab';

interface ProcessSwitchingChapterProps {
  onBack: () => void;
}

export default function ProcessSwitchingChapter({ onBack }: ProcessSwitchingChapterProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'sim'>('theory');

  const tabs = [
    { id: 'theory', label: 'Teorie & Principy', icon: BookOpen },
    { id: 'sim', label: 'Simulátor střídání na CPU', icon: Cpu },
  ];

  return (
    <FsChapterShell
      chapterNumber={2}
      totalChapters={5}
      title="Střídání procesů:"
      highlight="Multitasking & Registr PC"
      subtitle="Jak jeden procesor zvládá desítky aplikací naráz, co je to časové kvantum a jak funguje přepnutí kontextu na CPU."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as 'theory' | 'sim')}
      onBack={onBack}
    >
      {activeTab === 'theory' && <ProcessSwitchingTheoryTab />}
      {activeTab === 'sim' && <ProcessSwitchingSimulatorTab />}
    </FsChapterShell>
  );
}
