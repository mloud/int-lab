'use client';
import React, { useState } from 'react';
import { BookOpen, Sparkles, LayoutGrid } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { InformationSystemsDiscoveryTab } from './InformationSystemsDiscoveryTab';
import { InformationSystemsTheoryTab } from './InformationSystemsTheoryTab';
import {
  InformationSystemsActivitiesTab,
  ActivityId,
} from './InformationSystemsActivitiesTab';

interface InformationSystemsChapterProps {
  onBack?: () => void;
}

export const InformationSystemsChapter: React.FC<InformationSystemsChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'diskuze' | 'teorie' | 'aktivity'>('diskuze');
  const [activeActivity, setActiveActivity] = useState<ActivityId>('lunchsys');

  const tabs = [
    { id: 'diskuze', label: 'Řízená diskuze', icon: Sparkles },
    { id: 'teorie', label: 'Přehled teorie', icon: BookOpen },
    { id: 'aktivity', label: 'Aktivity', icon: LayoutGrid },
  ];

  return (
    <FsChapterShell
      title="Informační systémy"
      highlight="a role uživatelů"
      subtitle="Z čeho se skládá informační systém, proč se přihlašujeme a jak fungují role v žákovské knížce."
      onBack={onBack}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as 'diskuze' | 'teorie' | 'aktivity')}
    >
      {activeTab === 'diskuze' && (
        <InformationSystemsDiscoveryTab
          onGoToSimulator={() => {
            setActiveActivity('simulator');
            setActiveTab('aktivity');
          }}
          onGoToTheory={() => setActiveTab('teorie')}
        />
      )}
      {activeTab === 'teorie' && <InformationSystemsTheoryTab />}
      {activeTab === 'aktivity' && (
        <InformationSystemsActivitiesTab
          activeActivity={activeActivity}
          onSelectActivity={setActiveActivity}
        />
      )}
    </FsChapterShell>
  );
};

export default InformationSystemsChapter;
