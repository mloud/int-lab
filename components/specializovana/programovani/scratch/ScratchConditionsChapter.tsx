"use client";

import React, { useState } from 'react';
import { Blocks } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { TeacherPinToggle } from './ScratchShared';
import { ConditionsTheorySection } from './conditions/ConditionsTheorySection';
import { ConditionsTasks1to5 } from './conditions/ConditionsTasks1to5';
import { ConditionsTasks6to8 } from './conditions/ConditionsTasks6to8';
import { ConditionsTasks9to10 } from './conditions/ConditionsTasks9to10';
import { ConditionsTasks11to12 } from './conditions/ConditionsTasks11to12';
import { ConditionsTasks13to14 } from './conditions/ConditionsTasks13to14';

export const ScratchConditionsChapter = ({ onBack }: { onBack?: () => void }) => {
  const [teacherMode, setTeacherMode] = useState(false);

  return (
    <FsChapterShell
      title="Podmíněný příkaz (Lekce 5)"
      icon={<Blocks className="w-8 h-8 text-white" />}
      accentColor="border-amber-500"
      onBack={onBack}
    >
      <TeacherPinToggle teacherMode={teacherMode} setTeacherMode={setTeacherMode} />

      <div className="max-w-4xl mx-auto space-y-12 pb-24">
        <ConditionsTheorySection teacherMode={teacherMode} />
        <ConditionsTasks1to5 teacherMode={teacherMode} />
        <ConditionsTasks6to8 teacherMode={teacherMode} />
        <ConditionsTasks9to10 teacherMode={teacherMode} />
        <ConditionsTasks11to12 teacherMode={teacherMode} />
        <ConditionsTasks13to14 teacherMode={teacherMode} />
      </div>
    </FsChapterShell>
  );
};

export default ScratchConditionsChapter;
