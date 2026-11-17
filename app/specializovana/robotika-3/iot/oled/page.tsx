'use client';
import LessonPlaceholderShell from '@/components/curriculum/LessonPlaceholderShell';

export default function Page() {
  return (
    <LessonPlaceholderShell
      title="OLED displej a stavové hlášení"
      subtitle="Zobrazení naměřených dat na displeji SSD1306 a řízení relé"
      hardware="OLED SSD1306 (I2C) + Relé"
      subjectTitle="Robotika 1"
      subjectPath="/specializovana/robotika-3"
      chapterTitle="Mikrokontroléry a internet věcí (IoT)"
      chapterPath="/specializovana/robotika-3/iot"
    />
  );
}
