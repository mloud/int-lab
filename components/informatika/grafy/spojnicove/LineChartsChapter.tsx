'use client';
import React, { useState } from 'react';
import { BookOpen, FileText, LineChart, Activity } from 'lucide-react';
import { FsChapterShell, FsTab } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { LineChartsTheoryTab } from './LineChartsTheoryTab';
import { LineChartsSimulatorTab } from './LineChartsSimulatorTab';
import { LineChartsWorksheetTab } from './LineChartsWorksheetTab';

interface LineChartsChapterProps {
  onBack: () => void;
}

export const LineChartsChapter: React.FC<LineChartsChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('teorie');

  const tabs: FsTab[] = [
    { id: 'teorie', label: 'Teorie', icon: BookOpen },
    { id: 'simulator', label: 'Simulátor', icon: Activity },
    { id: 'list', label: 'Pracovní list', icon: FileText },
  ];

  return (
    <FsChapterShell
      title="Spojnicové grafy"
      subtitle="Naučte se číst časové řady, sledovat trendy a odhalit manipulace měřítkem."
      icon={<LineChart className="w-8 h-8" />}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
      accentColor="border-blue-500"
    >
      {activeTab === 'teorie' && <LineChartsTheoryTab />}
      {activeTab === 'simulator' && <LineChartsSimulatorTab />}
      {activeTab === 'list' && <LineChartsWorksheetTab />}
    </FsChapterShell>
  );
};

export default LineChartsChapter;
