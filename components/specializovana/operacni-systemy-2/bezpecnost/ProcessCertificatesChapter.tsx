'use client';

import React, { useState } from 'react';
import { Layers, Activity, FileText, HelpCircle } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ProcessProtocolState } from './procesy/processTypes';
import {
  EMPTY_PROCESS_PROTOCOL,
  formatProcessProtocolText,
  downloadProcessProtocolWord,
} from './procesy/processExport';
import ProcessTheoryTab from './procesy/ProcessTheoryTab';
import ProcessSimulatorsTab from './procesy/ProcessSimulatorsTab';
import ProcessLabTab from './procesy/ProcessLabTab';
import ProcessQuizTab from './procesy/ProcessQuizTab';

interface ProcessCertificatesChapterProps {
  onBack: () => void;
}

export default function ProcessCertificatesChapter({ onBack }: ProcessCertificatesChapterProps) {
  const [activeTab, setActiveTab] = useLocalStorage<'teorie' | 'simulator' | 'laborator' | 'kviz'>('process_chapter_active_tab', 'teorie');

  const [studentName, setStudentName] = useLocalStorage<string>('process_lab_student_name', '');
  const [checkedTasks, setCheckedTasks] = useLocalStorage<Record<string, boolean>>('process_lab_checked_tasks', {});
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const [protocol, setProtocol] = useLocalStorage<ProcessProtocolState>('process_lab_protocol_answers_v11', EMPTY_PROCESS_PROTOCOL);

  const toggleTask = (taskId: string) => {
    setCheckedTasks({
      ...checkedTasks,
      [taskId]: !checkedTasks[taskId]
    });
  };

  const copyProtocolToClipboard = () => {
    navigator.clipboard.writeText(formatProcessProtocolText(studentName, protocol));
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handleDownloadWord = () => {
    downloadProcessProtocolWord(studentName, protocol);
  };

  const tabs = [
    { id: 'teorie', label: 'Teorie & Schémata', icon: Layers },
    { id: 'simulator', label: 'Interaktivní simulátory', icon: Activity },
    { id: 'laborator', label: 'Praktický list', icon: FileText },
    { id: 'kviz', label: 'Ověřovací kvíz', icon: HelpCircle }
  ];

  return (
    <FsChapterShell
      chapterNumber={2}
      totalChapters={3}
      title="Správa procesů & Certifikáty:"
      highlight="Forenzní analýza v OS"
      subtitle="Navázání na procesy z 1. ročníku: proč pouhý název procesu nestačí, jak fungují digitální podpisy Authenticode a jak vyšetřovat systém."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as any)}
      onBack={onBack}
      accentColor="border-blue-500"
    >
      {activeTab === 'teorie' && <ProcessTheoryTab />}
      {activeTab === 'simulator' && <ProcessSimulatorsTab />}
      {activeTab === 'laborator' && (
        <ProcessLabTab
          studentName={studentName}
          setStudentName={setStudentName}
          checkedTasks={checkedTasks}
          toggleTask={toggleTask}
          protocol={protocol}
          setProtocol={setProtocol}
          copyProtocolToClipboard={copyProtocolToClipboard}
          copiedSuccess={copiedSuccess}
          handleDownloadWord={handleDownloadWord}
        />
      )}
      {activeTab === 'kviz' && <ProcessQuizTab />}
    </FsChapterShell>
  );
}
