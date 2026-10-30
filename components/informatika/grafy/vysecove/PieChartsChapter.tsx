'use client';
import React, { useState } from 'react';
import { BookOpen, FileText, PieChart, Activity } from 'lucide-react';
import { FsChapterShell, FsTab } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { PieChartsTheoryTab } from './PieChartsTheoryTab';
import { PieChartsSimulatorTab } from './PieChartsSimulatorTab';
import { PieChartsWorksheetTab } from './PieChartsWorksheetTab';

interface PieChartsChapterProps {
  onBack: () => void;
}

export const PieChartsChapter: React.FC<PieChartsChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('teorie');

  const tabs: FsTab[] = [
    { id: 'teorie', label: 'Teorie', icon: BookOpen },
    { id: 'simulator', label: 'Simulátor', icon: Activity },
    { id: 'list', label: 'Pracovní list', icon: FileText },
  ];

  return (
    <FsChapterShell
      title="Výsečové grafy"
      subtitle="Naučte se zobrazovat části jednoho celku (100 %), číst koláčové i prstencové grafy a vyhnout se optickým klamům."
      icon={<PieChart className="w-8 h-8" />}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
      accentColor="border-amber-500"
    >
      {activeTab === 'teorie' && <PieChartsTheoryTab />}
      {activeTab === 'simulator' && <PieChartsSimulatorTab />}
      {activeTab === 'list' && <PieChartsWorksheetTab />}
    </FsChapterShell>
  );
};

export default PieChartsChapter;

