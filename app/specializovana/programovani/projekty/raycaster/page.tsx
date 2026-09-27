'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ScratchRaycasterProject from '@/components/specializovana/programovani/ScratchRaycasterProject';

import ChapterLayout from '@/components/layout/ChapterLayout';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="prog-raycaster">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
        <ScratchRaycasterProject onBack={() => router.push('/specializovana/programovani/projekty')} />
      </div>
    </ChapterLayout>
  );
}
