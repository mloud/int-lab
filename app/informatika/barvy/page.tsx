'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ColorsChapter from '@/components/informatika/colors/ColorsChapter';
import ChapterLayout from '@/components/layout/ChapterLayout';

export default function ColorsPage() {
  const router = useRouter();

  return (
    <ChapterLayout chapterId="barvy">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
        <ColorsChapter onBack={() => router.push('/informatika')} />
      </div>
    </ChapterLayout>
  );
}
