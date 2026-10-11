'use client';

import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import ProcessThreadsChapter from '@/components/specializovana/operacni-systemy/procesy/ProcessThreadsChapter';

export default function Page() {
  const router = useRouter();

  return (
    <ChapterLayout chapterId="proc-mem">
      <div className="w-full h-full pb-32">
        <ProcessThreadsChapter 
          onBack={() => router.push('/specializovana/operacni-systemy/procesy')} 
        />
      </div>
    </ChapterLayout>
  );
}
