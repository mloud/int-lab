'use client';
import React, { useState } from 'react';
import { BookOpen, Users, Network } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { InformationSystemsTheoryTab } from './InformationSystemsTheoryTab';
import { LibraryDiagramBuilder } from './LibraryDiagramBuilder';
import { GradebookSimulator } from './gradebook/GradebookSimulator';

interface InformationSystemsChapterProps {
  onBack?: () => void;
}

export const InformationSystemsChapter: React.FC<InformationSystemsChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'teorie' | 'knihovna' | 'simulator'>('teorie');

  const tabs = [
    { id: 'teorie', label: 'Teorie a principy', icon: BookOpen },
    { id: 'knihovna', label: 'Diagram knihovny', icon: Network },
    { id: 'simulator', label: 'Žákovská knížka (Bakaláři)', icon: Users },
  ];

  return (
    <FsChapterShell
      title="Informační systémy"
      highlight="a role uživatelů"
      subtitle="Z čeho se skládá informační systém, proč se přihlašujeme a jak fungují role v žákovské knížce."
      onBack={onBack}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={tabId => setActiveTab(tabId as 'teorie' | 'knihovna' | 'simulator')}
    >
      {activeTab === 'teorie' && <InformationSystemsTheoryTab />}
      {activeTab === 'knihovna' && <LibraryDiagramBuilder />}
      {activeTab === 'simulator' && <GradebookSimulator />}
    </FsChapterShell>
  );
};

export default InformationSystemsChapter;
