'use client';
import React from 'react';
import { Repeat, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { useTeacherMode, TeacherPinBar } from '@/components/ui/TaskKit';
import { PythonLoopTasks1to8 } from './python-loops/PythonLoopTasks1to8';
import { PythonLoopTasks9to15 } from './python-loops/PythonLoopTasks9to15';

interface PythonLoopChapterProps {
  onBack: () => void;
}

const PythonLoopChapter: React.FC<PythonLoopChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();

  return (
    <FsChapterShell
      title="Program s opakováním"
      subtitle="Lekce 11 – Programování v jazyce Python pro střední školy"
      icon={<Repeat className="w-8 h-8 text-rose-600" />}
      onBack={onBack}
      accentColor="rose"
      tabs={[{ id: 'lekce', label: 'Lekce 11', icon: Code }]}
    >
      <TeacherPinBar state={teacher} tone="rose" />

      <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-12">
        <PythonLoopTasks1to8 teacherMode={teacher.teacherMode} />
        <PythonLoopTasks9to15 teacherMode={teacher.teacherMode} />
      </div>
    </FsChapterShell>
  );
};

export default PythonLoopChapter;
