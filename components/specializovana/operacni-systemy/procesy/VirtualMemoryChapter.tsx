'use client';

import React, { useState } from 'react';
import { HardDrive, BookOpen, Layers } from 'lucide-react';
import { FsChapterShell } from '../souborove-systemy/FsShared';
import VirtualMemoryTheoryTab from './pamet/VirtualMemoryTheoryTab';
import VirtualMemorySimulatorTab from './pamet/VirtualMemorySimulatorTab';

interface VirtualMemoryChapterProps {
  onBack: () => void;
}

export default function VirtualMemoryChapter({ onBack }: VirtualMemoryChapterProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'sim'>('theory');

  const tabs = [
    { id: 'theory', label: 'Teorie & Principy', icon: BookOpen },
    { id: 'sim', label: 'Simulátor stránkování & Page Fault', icon: HardDrive },
  ];

  return (
    <FsChapterShell
      chapterNumber={5}
      totalChapters={5}
      title="Virtuální paměť:"
      highlight="Stránkování a odkládání"
      subtitle="Proč systém nespadne při nedostatku RAM, jak jednotka MMU překládá virtuální adresy a co je to odkládací soubor pagefile.sys."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as 'theory' | 'sim')}
      onBack={onBack}
    >
      {activeTab === 'theory' && <VirtualMemoryTheoryTab />}
      {activeTab === 'sim' && <VirtualMemorySimulatorTab />}
    </FsChapterShell>
  );
}
