'use client';
import LessonPlaceholderShell from '@/components/curriculum/LessonPlaceholderShell';

export default function Page() {
  return (
    <LessonPlaceholderShell
      title="Ověření na fyzickém robotu KUKA"
      subtitle="Nahrání odzkoušeného kódu ze simulátoru v režimu T1"
      hardware="KUKA EDU Robot"
      subjectTitle="Robotika 2"
      subjectPath="/specializovana/robotika-4"
      chapterTitle="KUKA EDU Robotika"
      chapterPath="/specializovana/robotika-4/kuka"
    />
  );
}
