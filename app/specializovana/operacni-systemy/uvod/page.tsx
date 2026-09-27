'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import OsIntroChapter from '@/components/specializovana/operacni-systemy/OsIntroChapter';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os-uvod">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <OsIntroChapter onBack={() => router.push('/specializovana/operacni-systemy')} />
    </div>
    </ChapterLayout>
  );
}
