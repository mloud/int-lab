'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import OsEvolutionChapter from '@/components/specializovana/operacni-systemy/OsEvolutionChapter';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os-vyvoj">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <OsEvolutionChapter onBack={() => router.push('/specializovana/operacni-systemy')} />
    </div>
    </ChapterLayout>
  );
}
