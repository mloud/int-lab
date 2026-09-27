'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import OsHardwareChapter from '@/components/specializovana/operacni-systemy/OsHardwareChapter';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os-hw">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <OsHardwareChapter onBack={() => router.push('/specializovana/operacni-systemy')}
            onStartVonNeumann={() => router.push('/specializovana/operacni-systemy/hardware/von-neumann')}
            onStartRamSimulator={() => router.push('/specializovana/operacni-systemy/hardware/ram')} />
    </div>
    </ChapterLayout>
  );
}
