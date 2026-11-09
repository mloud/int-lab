'use client';

import React, { useState } from 'react';
import { Database, Zap, ClipboardList } from 'lucide-react';
import { FsChapterShell } from './FsShared';
import { DiskMediaTheoryTab } from './media/DiskMediaTheoryTab';
import { DiskMediaSimTab } from './media/DiskMediaSimTab';
import { DiskMediaWorksheetTab } from './media/DiskMediaWorksheetTab';

export default function DiskMediaChapter({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('theory');

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Database },
    { id: 'sim', label: 'Simulace', icon: Zap },
    { id: 'worksheet', label: 'Pracovní list', icon: ClipboardList },
  ];

  return (
    <FsChapterShell
      chapterNumber={1}
      title="Paměťová"
      highlight="média"
      subtitle="Kde a jak jsou naše data uložena fyzicky."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && <DiskMediaTheoryTab />}
      {activeTab === 'sim' && <DiskMediaSimTab />}
      {activeTab === 'worksheet' && <DiskMediaWorksheetTab />}
    </FsChapterShell>
  );
}
