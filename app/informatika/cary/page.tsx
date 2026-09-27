'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import LinesMenu from '@/components/informatika/lines/LinesMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="cary">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <LinesMenu onBack={() => router.push('/informatika')}
            onShapePuzzle={() => router.push('/informatika/cary/tvary')}
            onVectorDrawing={() => router.push('/informatika/cary/vektory')}
            onLineDrawing={() => router.push('/informatika/cary/cary')} />
    </div>
    </ChapterLayout>
  );
}
