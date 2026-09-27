'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import OperacniSystemyMenu from '@/components/specializovana/operacni-systemy/OperacniSystemyMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="spec-os">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <OperacniSystemyMenu onBack={() => router.push('/specializovana')}
            onStartOsIntro={() => router.push('/specializovana/operacni-systemy/uvod')}
            onStartOsArchitecture={() => router.push('/specializovana/operacni-systemy/architektura')}
            onStartOsEvolution={() => router.push('/specializovana/operacni-systemy/vyvoj')}
            onStartOsBoot={() => router.push('/specializovana/operacni-systemy/boot')}
            onStartFileSystemsMenu={() => router.push('/specializovana/operacni-systemy/souborove-systemy')}
            onStartWindowsInstall={() => router.push('/specializovana/operacni-systemy/instalace')}
            onStartProcessMemory={() => router.push('/specializovana/operacni-systemy/procesy')}
            onStartHardware={() => router.push('/specializovana/operacni-systemy/hardware')} />
    </div>
    </ChapterLayout>
  );
}
