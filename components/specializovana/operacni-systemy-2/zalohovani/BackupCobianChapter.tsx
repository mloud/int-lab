'use client';
import React, { useState } from 'react';
import { BookOpen, FileText, Calculator } from 'lucide-react';
import { FsChapterShell, FsTab } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { CobianTheoryTab } from './cobian/CobianTheoryTab';
import { CobianSimulatorTab } from './cobian/CobianSimulatorTab';
import { CobianWorksheetTab } from './cobian/CobianWorksheetTab';

interface BackupCobianChapterProps {
  onBack: () => void;
}

const BackupCobianChapter: React.FC<BackupCobianChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('teorie');

  const tabs: FsTab[] = [
    { id: 'teorie', label: 'Teorie', icon: BookOpen },
    { id: 'simulace', label: 'Simulátor', icon: Calculator },
    { id: 'list', label: 'Pracovní list', icon: FileText },
  ];

  return (
    <FsChapterShell
      chapterNumber={5}
      totalChapters={5}
      title="Cobian"
      highlight="Reflector"
      subtitle="Zálohovací legenda zdarma pro pokročilé plánování a pochopení typů záloh."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'teorie' && <CobianTheoryTab />}
      {activeTab === 'simulace' && <CobianSimulatorTab />}
      {activeTab === 'list' && <CobianWorksheetTab />}
    </FsChapterShell>
  );
};

export default BackupCobianChapter;
