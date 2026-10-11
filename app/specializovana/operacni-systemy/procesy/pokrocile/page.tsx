'use client';

import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import AdvancedProcessTopicsChapter from '@/components/specializovana/operacni-systemy/procesy/AdvancedProcessTopicsChapter';

export default function Page() {
  const router = useRouter();

  return (
    <ChapterLayout chapterId="proc-mem">
      <div className="w-full h-full pb-32">
        <AdvancedProcessTopicsChapter 
          onBack={() => router.push('/specializovana/operacni-systemy/procesy')} 
          onOpenCpuGame={() => router.push('/specializovana/operacni-systemy/procesy/cpu')}
          onOpenAllocatorGame={() => router.push('/specializovana/operacni-systemy/procesy/allocator')}
          onOpenStepperGame={() => router.push('/specializovana/operacni-systemy/procesy/stepper')}
        />
      </div>
    </ChapterLayout>
  );
}
