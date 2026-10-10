'use client';
import LessonPlaceholderShell from '@/components/curriculum/LessonPlaceholderShell';

export default function Page() {
  return (
    <LessonPlaceholderShell
      title="Neblokující časování"
      subtitle="Měření času v MicroPythonu pomocí ticks_ms()"
      hardware="BBC micro:bit"
      subjectTitle="Robotika 1"
      subjectPath="/specializovana/robotika-3"
      chapterTitle="Architektura MCU"
      chapterPath="/specializovana/robotika-3/mcu"
    />
  );
}
