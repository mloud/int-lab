'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import FileDeletionGame from '@/components/specializovana/operacni-systemy/souborove-systemy/FileDeletionGame';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="fs-fat">
      <div className="w-full h-full pb-32">
        <FileDeletionGame
          onBack={() => router.push('/specializovana/operacni-systemy/souborove-systemy/alokace-fat')}
        />
      </div>
    </ChapterLayout>
  );
}
