"use client";

import React, { useState } from 'react';
import { Radio } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { TeacherPinToggle } from './ScratchShared';
import { MessagesTheorySection } from './messages/MessagesTheorySection';
import { MessagesTasks1to3 } from './messages/MessagesTasks1to3';
import { MessagesTasks4to6 } from './messages/MessagesTasks4to6';
import { MessagesTask7 } from './messages/MessagesTask7';
import { MessagesTask8 } from './messages/MessagesTask8';

export const ScratchMessagesChapter = ({ onBack }: { onBack?: () => void }) => {
  const [teacherMode, setTeacherMode] = useState(false);

  return (
    <FsChapterShell
      title="Události a zprávy"
      subtitle="Komunikace mezi postavami: signály, paralelní reakce, synchronizace a základy architektury Klient – Server."
      icon={<Radio className="w-8 h-8 text-white" />}
      accentColor="border-amber-500"
      onBack={onBack}
    >
      <TeacherPinToggle teacherMode={teacherMode} setTeacherMode={setTeacherMode} />
      <MessagesTheorySection teacherMode={teacherMode} />
      <div className="flex flex-col gap-8">
        <MessagesTasks1to3 teacherMode={teacherMode} />
        <MessagesTasks4to6 teacherMode={teacherMode} />
        <MessagesTask7 teacherMode={teacherMode} />
        <MessagesTask8 teacherMode={teacherMode} />
      </div>
    </FsChapterShell>
  );
};

export default ScratchMessagesChapter;
