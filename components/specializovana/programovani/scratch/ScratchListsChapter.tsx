"use client";

import React, { useState } from 'react';
import { ListOrdered } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { TeacherPinToggle } from './ScratchShared';
import { ListsTheorySection } from './lists/ListsTheorySection';
import { ListsTasks1to6 } from './lists/ListsTasks1to6';
import { ListsTasks7to9 } from './lists/ListsTasks7to9';
import { ListsTasks10to11 } from './lists/ListsTasks10to11';

export const ScratchListsChapter = ({ onBack }: { onBack?: () => void }) => {
  const [teacherMode, setTeacherMode] = useState(false);

  return (
    <FsChapterShell
      title="Seznamy a práce s daty (Lekce 6)"
      subtitle="Objev sílu polí a seznamů: jak uložit inventář hráče, nákupní lístek, tabulku nejlepších skóre a jak v datech vyhledávat."
      icon={<ListOrdered className="w-8 h-8 text-white" />}
      accentColor="border-amber-500"
      onBack={onBack}
    >
      <TeacherPinToggle teacherMode={teacherMode} setTeacherMode={setTeacherMode} />
      <ListsTheorySection teacherMode={teacherMode} />
      <div className="flex flex-col gap-8">
        <ListsTasks1to6 teacherMode={teacherMode} />
        <ListsTasks7to9 teacherMode={teacherMode} />
        <ListsTasks10to11 teacherMode={teacherMode} />
      </div>
    </FsChapterShell>
  );
};

export default ScratchListsChapter;
