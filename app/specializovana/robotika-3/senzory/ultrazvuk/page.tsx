'use client';
import LessonPlaceholderShell from '@/components/curriculum/LessonPlaceholderShell';

export default function Page() {
  return (
    <LessonPlaceholderShell
      title="Ultrazvukový senzor vzdálenosti"
      subtitle="Měření doby letu impulsu Time-of-Flight"
      hardware="micro:bit + IOKit"
      subjectTitle="Robotika 1"
      subjectPath="/specializovana/robotika-3"
      chapterTitle="Senzory a sběrnice"
      chapterPath="/specializovana/robotika-3/senzory"
    />
  );
}
