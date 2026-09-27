'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import OsBootChapter from '@/components/specializovana/operacni-systemy/OsBootChapter';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os-boot">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <OsBootChapter onBack={() => router.push('/specializovana/operacni-systemy')} />
    </div>
    </ChapterLayout>
  );
}
