'use client';
import LessonPlaceholderShell from '@/components/curriculum/LessonPlaceholderShell';

export default function Page() {
  return (
    <LessonPlaceholderShell
      title="GPIO a digitální signály"
      subtitle="Ovládání pinů, čtení tlačítek a logické úrovně v Pythonu"
      hardware="micro:bit v2"
      subjectTitle="Robotika 1"
      subjectPath="/specializovana/robotika-3"
      chapterTitle="Mikrokontroléry a internet věcí (IoT)"
      chapterPath="/specializovana/robotika-3/iot"
    />
  );
}
