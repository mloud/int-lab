'use client';
import React, { useState } from 'react';
import { BookOpen, Brain, Monitor } from 'lucide-react';
import { FsChapterShell } from './souborove-systemy/FsShared';
import { OsIntroTheoryTab } from './uvod/OsIntroTheoryTab';
import { OsIntroQuizTab } from './uvod/OsIntroQuizTab';

interface OsIntroChapterProps {
  onBack: () => void;
}

const OsIntroChapter: React.FC<OsIntroChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'quiz'>('theory');

  return (
    <FsChapterShell
      title="Úvod do operačních systémů"
      subtitle="Vrstvený model počítače, klíčové funkce jádra, rozdělení OS a licencování"
      icon={<Monitor className="w-8 h-8 text-sky-600" />}
      onBack={onBack}
      accentColor="sky"
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as 'theory' | 'quiz')}
      tabs={[
        { id: 'theory', label: 'Teorie', icon: BookOpen },
        { id: 'quiz', label: 'Ověření znalostí', icon: Brain },
      ]}
    >
      {activeTab === 'theory' ? <OsIntroTheoryTab /> : <OsIntroQuizTab />}
    </FsChapterShell>
  );
};

export default OsIntroChapter;
