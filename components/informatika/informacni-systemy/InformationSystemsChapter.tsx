'use client';
import React, { useState } from 'react';
import { BookOpen, Users, Network, Sparkles, Lightbulb, Table } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { InformationSystemsDiscoveryTab } from './InformationSystemsDiscoveryTab';
import { InformationSystemsTheoryTab } from './InformationSystemsTheoryTab';
import { LibraryDiagramBuilder } from './LibraryDiagramBuilder';
import { LibraryLoansTableTab } from './LibraryLoansTableTab';
import { SmartLightingProjectTab } from './SmartLightingProjectTab';
import { GradebookSimulator } from './gradebook/GradebookSimulator';

interface InformationSystemsChapterProps {
  onBack?: () => void;
}

export const InformationSystemsChapter: React.FC<InformationSystemsChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'diskuze' | 'teorie' | 'knihovna' | 'vypujcky' | 'osvetleni' | 'simulator'>('diskuze');

  const tabs = [
    { id: 'diskuze', label: 'Řízená diskuze', icon: Sparkles },
    { id: 'teorie', label: 'Přehled teorie', icon: BookOpen },
    { id: 'knihovna', label: 'Diagram knihovny', icon: Network },
    { id: 'vypujcky', label: 'Tabulka výpůjček', icon: Table },
    { id: 'osvetleni', label: 'Výzva: Chytré osvětlení', icon: Lightbulb },
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
      onTabChange={tabId => setActiveTab(tabId as 'diskuze' | 'teorie' | 'knihovna' | 'vypujcky' | 'osvetleni' | 'simulator')}
    >
      {activeTab === 'diskuze' && (
        <InformationSystemsDiscoveryTab
          onGoToSimulator={() => setActiveTab('simulator')}
          onGoToTheory={() => setActiveTab('teorie')}
        />
      )}
      {activeTab === 'teorie' && <InformationSystemsTheoryTab />}
      {activeTab === 'knihovna' && <LibraryDiagramBuilder />}
      {activeTab === 'vypujcky' && <LibraryLoansTableTab />}
      {activeTab === 'osvetleni' && <SmartLightingProjectTab />}
      {activeTab === 'simulator' && <GradebookSimulator />}
    </FsChapterShell>
  );
};

export default InformationSystemsChapter;
