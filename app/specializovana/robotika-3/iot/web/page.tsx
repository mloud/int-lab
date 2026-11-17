'use client';
import LessonPlaceholderShell from '@/components/curriculum/LessonPlaceholderShell';

export default function Page() {
  return (
    <LessonPlaceholderShell
      title="Přenos telemetrie na web"
      subtitle="Odesílání naměřených hodnot do sítě a webová vizualizace"
      hardware="micro:bit v2 + Web Dashboard"
      subjectTitle="Robotika 1"
      subjectPath="/specializovana/robotika-3"
      chapterTitle="Mikrokontroléry a internet věcí (IoT)"
      chapterPath="/specializovana/robotika-3/iot"
    />
  );
}
