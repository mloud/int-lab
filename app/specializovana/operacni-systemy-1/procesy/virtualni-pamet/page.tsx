'use client';

import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import VirtualMemoryChapter from '@/components/specializovana/operacni-systemy/procesy/VirtualMemoryChapter';

export default function Page() {
  const router = useRouter();

  return (
    <ChapterLayout chapterId="proc-mem">
      <div className="w-full h-full pb-32">
        <VirtualMemoryChapter 
          onBack={() => router.push('/specializovana/operacni-systemy-1/procesy')} 
        />
      </div>
    </ChapterLayout>
  );
}
