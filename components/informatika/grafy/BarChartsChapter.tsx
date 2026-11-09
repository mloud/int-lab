'use client';
import React, { useState } from 'react';
import { BookOpen, FileText, BarChart3, Activity } from 'lucide-react';
import { FsChapterShell, FsTab } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { BarChartsTheoryTab } from './bar-charts/BarChartsTheoryTab';
import { BarChartsSimulatorTab } from './bar-charts/BarChartsSimulatorTab';
import { BarChartsWorksheetTab } from './bar-charts/BarChartsWorksheetTab';

interface BarChartsChapterProps {
  onBack: () => void;
}

const BarChartsChapter: React.FC<BarChartsChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('teorie');

  const tabs: FsTab[] = [
    { id: 'teorie', label: 'Teorie', icon: BookOpen },
    { id: 'simulator', label: 'Simulátor', icon: Activity },
    { id: 'list', label: 'Pracovní list', icon: FileText },
  ];

  return (
    <FsChapterShell
      title="Sloupcové grafy"
      subtitle="Naučte se pracovat s normálními a skládanými sloupcovými grafy."
      icon={<BarChart3 className="w-8 h-8" />}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
      accentColor="border-emerald-500"
    >
      {activeTab === 'teorie' && <BarChartsTheoryTab />}
      {activeTab === 'simulator' && <BarChartsSimulatorTab />}
      {activeTab === 'list' && <BarChartsWorksheetTab />}
    </FsChapterShell>
  );
};

export default BarChartsChapter;
