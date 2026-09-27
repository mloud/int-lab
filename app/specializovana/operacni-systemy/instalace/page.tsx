'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import WindowsInstallGame from '@/components/specializovana/operacni-systemy/WindowsInstallGame';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os-install">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <WindowsInstallGame onBack={() => router.push('/specializovana/operacni-systemy')} />
    </div>
    </ChapterLayout>
  );
}
