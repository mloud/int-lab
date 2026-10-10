'use client';
import LessonPlaceholderShell from '@/components/curriculum/LessonPlaceholderShell';

export default function Page() {
  return (
    <LessonPlaceholderShell
      title="Senzorová IoT síť"
      subtitle="Sběr telemetrie z uzlů do centrálního hubu"
      hardware="micro:bit + IOKit"
      subjectTitle="Robotika 1"
      subjectPath="/specializovana/robotika-3"
      chapterTitle="IoT a Telemetrie"
      chapterPath="/specializovana/robotika-3/iot"
    />
  );
}
