'use client';

import React from 'react';
import { Layers, Activity, FileText, HelpCircle } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DeclarativeWorksheet } from '@/components/ui/WorksheetKit';
import TopicReviewQuiz from '@/components/ui/TopicReviewQuiz';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import PersistenceTheoryTab from './registr/PersistenceTheoryTab';
import PersistenceSimulatorsTab from './registr/PersistenceSimulatorsTab';
import { PERSISTENCE_WORKSHEET_SCHEMA, PERSISTENCE_QUIZ_QUESTIONS } from './registr/persistenceData';

interface PersistenceRegistryChapterProps {
  onBack: () => void;
}

export default function PersistenceRegistryChapter({ onBack }: PersistenceRegistryChapterProps) {
  const [activeTab, setActiveTab] = useLocalStorage<'teorie' | 'simulator' | 'laborator' | 'kviz'>(
    'persistence_chapter_active_tab',
    'teorie'
  );

  const tabs = [
    { id: 'teorie', label: 'Teorie & Přehled', icon: Layers },
    { id: 'simulator', label: 'Interaktivní simulátory', icon: Activity },
    { id: 'laborator', label: 'Praktický list', icon: FileText },
    { id: 'kviz', label: 'Ověřovací kvíz', icon: HelpCircle },
  ];

  return (
    <FsChapterShell
      chapterNumber={3}
      totalChapters={3}
      title="Persistence škodlivého kódu:"
      highlight="Automatické spouštění & Registr"
      subtitle="Jak malware přežije restart počítače: od složky Po spuštění, zástupců a Plánovače úloh až po systémové služby, registr a forenzní audit v Autoruns."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as any)}
      onBack={onBack}
      accentColor="border-blue-500"
    >
      {activeTab === 'teorie' && <PersistenceTheoryTab />}
      {activeTab === 'simulator' && <PersistenceSimulatorsTab />}
      {activeTab === 'laborator' && <DeclarativeWorksheet schema={PERSISTENCE_WORKSHEET_SCHEMA} />}
      {activeTab === 'kviz' && (
        <TopicReviewQuiz
          storageKey={STORAGE_KEYS.quiz('oss2-bezp-persistence')}
          title="Ověřovací kvíz: Persistence a systémový registr"
          subtitle="Ověřte si znalosti 5 způsobů automatického spouštění, oprávnění UAC a forenzního čištění."
          questions={PERSISTENCE_QUIZ_QUESTIONS}
        />
      )}
    </FsChapterShell>
  );
}
