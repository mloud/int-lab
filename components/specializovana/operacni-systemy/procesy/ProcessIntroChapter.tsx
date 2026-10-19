'use client';

import React, { useState } from 'react';
import { Layers, ClipboardList } from 'lucide-react';
import { FsChapterShell } from '../souborove-systemy/FsShared';
import ProcessIntroTheoryTab from './intro/ProcessIntroTheoryTab';
import ProcessIntroWorksheetTab from './intro/ProcessIntroWorksheetTab';

interface ProcessIntroChapterProps {
  onBack: () => void;
}

export default function ProcessIntroChapter({ onBack }: ProcessIntroChapterProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'worksheet'>('theory');

  const tabs = [
    { id: 'theory', label: 'Teorie & Schémata', icon: Layers },
    { id: 'worksheet', label: 'Praktický list: Task Manager & CLI', icon: ClipboardList },
  ];

  return (
    <FsChapterShell
      chapterNumber={1}
      totalChapters={5}
      title="Úvod do procesů:"
      highlight="Vznik a anatomie v RAM"
      subtitle="Od pasivního souboru na disku k živému procesu v paměti RAM, identifikace PID a PPID, struktura PCB a izolace paměti."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as 'theory' | 'worksheet')}
      onBack={onBack}
    >
      {activeTab === 'theory' && <ProcessIntroTheoryTab />}
      {activeTab === 'worksheet' && <ProcessIntroWorksheetTab />}
    </FsChapterShell>
  );
}
