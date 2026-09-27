'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import DataUnitsMenu from '@/components/informatika/data-units/DataUnitsMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="jednotky">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <DataUnitsMenu onBack={() => router.push('/informatika')}
            onStartTheory={() => router.push('/informatika/jednotky/teorie')}
            onStartPractice={() => router.push('/informatika/jednotky/praxe')} />
    </div>
    </ChapterLayout>
  );
}
