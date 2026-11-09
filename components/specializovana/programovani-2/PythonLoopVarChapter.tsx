'use client';
import React from 'react';
import { Calculator, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { useTeacherMode, TeacherPinBar } from '@/components/ui/TaskKit';
import { PythonLoopVarTasks1to6 } from './python-loop-var/PythonLoopVarTasks1to6';
import { PythonLoopVarTasks7to13 } from './python-loop-var/PythonLoopVarTasks7to13';

interface PythonLoopVarChapterProps {
  onBack: () => void;
}

const PythonLoopVarChapter: React.FC<PythonLoopVarChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();

  return (
    <FsChapterShell
      title="Proměnná cyklu"
      subtitle="Programování v jazyce Python pro střední školy (Lekce 12)"
      icon={<Calculator className="w-8 h-8 text-violet-600" />}
      onBack={onBack}
      accentColor="violet"
      tabs={[{ id: 'lekce', label: '12. lekce', icon: Code }]}
    >
      <TeacherPinBar tone="violet" state={teacher} />

      <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-12">
        <PythonLoopVarTasks1to6 teacherMode={teacher.teacherMode} />
        <PythonLoopVarTasks7to13 teacherMode={teacher.teacherMode} />
      </div>
    </FsChapterShell>
  );
};

export default PythonLoopVarChapter;
