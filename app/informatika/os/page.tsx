'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import OsMenu from '@/components/informatika/operacni-systemy/OsMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <OsMenu onBack={() => router.push('/informatika')}
            onStartMatchGame={() => router.push('/informatika/os/match')}
            onStartBootSequence={() => router.push('/informatika/os/boot')}
            onStartFileExtension={() => router.push('/informatika/os/pripony')}
            onStartRamManager={() => router.push('/informatika/os/ram')}
            onStartShortcutNinja={() => router.push('/informatika/os/zkratky')} />
    </div>
    </ChapterLayout>
  );
}
