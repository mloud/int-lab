'use client';
import LessonPlaceholderShell from '@/components/curriculum/LessonPlaceholderShell';

export default function Page() {
  return (
    <LessonPlaceholderShell
      title="GPIO a digitální signály"
      subtitle="Ovládání vstupů a výstupů"
      hardware="BBC micro:bit"
      subjectTitle="Robotika 1"
      subjectPath="/specializovana/robotika-3"
      chapterTitle="Architektura MCU"
      chapterPath="/specializovana/robotika-3/mcu"
    />
  );
}
