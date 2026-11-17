'use client';
import LessonPlaceholderShell from '@/components/curriculum/LessonPlaceholderShell';

export default function Page() {
  return (
    <LessonPlaceholderShell
      title="Senzory prostředí a analogový vstup"
      subtitle="Vzorkování teploty, světla a čidel IoT sady přes ADC"
      hardware="micro:bit v2 + IoT sada"
      subjectTitle="Robotika 1"
      subjectPath="/specializovana/robotika-3"
      chapterTitle="Mikrokontroléry a internet věcí (IoT)"
      chapterPath="/specializovana/robotika-3/iot"
    />
  );
}
