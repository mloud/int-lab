'use client';

import React, { useState } from 'react';
import { Layers, Info, Zap, CheckSquare } from 'lucide-react';
import { FsChapterShell } from './souborove-systemy/FsShared';
import { VirtualizationTheoryTab } from './virtualizace/VirtualizationTheoryTab';
import { VirtualizationComparisonTab } from './virtualizace/VirtualizationComparisonTab';
import { VirtualizationWorksheetTab } from './virtualizace/VirtualizationWorksheetTab';

interface VirtualizationChapterProps {
  onBack: () => void;
}

const VirtualizationChapter: React.FC<VirtualizationChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'simulation' | 'worksheet'>('theory');

  return (
    <FsChapterShell
      title="Virtualizace"
      subtitle="Abstrakce hardwarových prostředků, Hypervizory Typu 1 a Typu 2, VirtualBox v praxi"
      icon={<Layers className="w-8 h-8 text-indigo-600" />}
      onBack={onBack}
      accentColor="indigo"
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as 'theory' | 'simulation' | 'worksheet')}
      tabs={[
        { id: 'theory', label: 'Teorie', icon: Info },
        { id: 'simulation', label: 'Typ 1 vs Typ 2', icon: Zap },
        { id: 'worksheet', label: 'Pracovní list', icon: CheckSquare },
      ]}
    >
      {activeTab === 'theory' && <VirtualizationTheoryTab />}
      {activeTab === 'simulation' && <VirtualizationComparisonTab />}
      {activeTab === 'worksheet' && <VirtualizationWorksheetTab />}
    </FsChapterShell>
  );
};

export default VirtualizationChapter;
