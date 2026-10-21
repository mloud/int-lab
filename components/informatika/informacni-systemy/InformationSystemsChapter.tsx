'use client';
import React, { useState } from 'react';
import { BookOpen, Users, Database } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { InformationSystemsTheoryTab } from './InformationSystemsTheoryTab';
import { GradebookSimulator } from './gradebook/GradebookSimulator';

interface InformationSystemsChapterProps {
  onBack?: () => void;
}

export const InformationSystemsChapter: React.FC<InformationSystemsChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'teorie' | 'simulator'>('teorie');

  const tabs = [
    { id: 'teorie', label: 'Teorie a principy', icon: BookOpen },
    { id: 'simulator', label: 'Simulátor žákovské knížky', icon: Users },
  ];

  return (
    <FsChapterShell
      title="Informační systémy"
      highlight="a role uživatelů"
      subtitle="Co je informační systém, z čeho se skládá, jak rozeznává uživatele a jak fungují přístupová práva v reálné žákovské knížce pro 7. ročník."
      onBack={onBack}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={tabId => setActiveTab(tabId as 'teorie' | 'simulator')}
    >
      {activeTab === 'teorie' && <InformationSystemsTheoryTab />}
      {activeTab === 'simulator' && <GradebookSimulator />}
    </FsChapterShell>
  );
};

export default InformationSystemsChapter;
