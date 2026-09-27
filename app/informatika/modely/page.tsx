'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import ModelsMenu from '@/components/informatika/models/ModelsMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="modely">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <ModelsMenu onBack={() => router.push('/informatika')}
            onStartGraphs={() => router.push('/informatika/modely/graf-rozvrhu')}
            onStartPathFinding={() => router.push('/informatika/modely/hledani-cesty')}
            onStartBlatov={() => router.push('/informatika/modely/blatov')}
            onStartMST={() => router.push('/informatika/modely/kostra')}
            onStartParallel={() => router.push('/informatika/modely/paralelni-procesy')} />
    </div>
    </ChapterLayout>
  );
}
