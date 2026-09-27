'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import OsArchitectureChapter from '@/components/specializovana/operacni-systemy/OsArchitectureChapter';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os-arch">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <OsArchitectureChapter onBack={() => router.push('/specializovana/operacni-systemy')} />
    </div>
    </ChapterLayout>
  );
}
