import React, { useState } from 'react';
import { Blocks } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { TeacherPinToggle } from './ScratchShared';
import { SubprogramGraphicsTasks } from './subprograms/SubprogramGraphicsTasks';
import { SubprogramMathTasks } from './subprograms/SubprogramMathTasks';

interface ScratchSubprogramsChapterProps {
  onBack: () => void;
}

const ScratchSubprogramsChapter: React.FC<ScratchSubprogramsChapterProps> = ({ onBack }) => {
  const [teacherMode, setTeacherMode] = useState(false);

  return (
    <FsChapterShell 
      title="Podprogramy (Vlastní bloky)" 
      onBack={onBack}
      accentColor="border-amber-500"
      icon={<Blocks className="w-8 h-8 text-amber-500" />}
    >
      <div className="max-w-4xl mx-auto mb-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 sm:p-8 rounded-r-3xl mb-8">
          <p className="text-amber-900/80 text-sm sm:text-base leading-relaxed font-bold">
            Podprogram je pojmenovaná sekvence příkazů. Je výhodný tam, kde se opakuje volání stejné posloupnosti příkazů, 
            nebo chceme-li si program zpřehlednit rozdělením na menší, smysluplné části. V této lekci se naučíme tvořit 
            vlastní bloky a používat v nich vstupní parametry.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-amber-100/50 text-amber-800 rounded-lg text-sm font-bold">#podprogram</span>
            <span className="px-3 py-1 bg-amber-100/50 text-amber-800 rounded-lg text-sm font-bold">#parametr</span>
            <span className="px-3 py-1 bg-amber-100/50 text-amber-800 rounded-lg text-sm font-bold">#grafická knihovna</span>
          </div>
        </div>
        
        <TeacherPinToggle teacherMode={teacherMode} setTeacherMode={setTeacherMode} />

        <div className="flex flex-col gap-8">
          <SubprogramGraphicsTasks teacherMode={teacherMode} />
          <SubprogramMathTasks teacherMode={teacherMode} />
        </div>
      </div>
    </FsChapterShell>
  );
};

export default ScratchSubprogramsChapter;
