'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import ProcessMemoryMenu from '@/components/specializovana/operacni-systemy/ProcessMemoryMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os-proc">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <ProcessMemoryMenu onBack={() => router.push('/specializovana/operacni-systemy')}
            onStartMemoryStepper={() => router.push('/specializovana/operacni-systemy/procesy/stepper')}
            onStartMemoryAllocator={() => router.push('/specializovana/operacni-systemy/procesy/allocator')}
            onStartCpuCycle={() => router.push('/specializovana/operacni-systemy/procesy/cpu')} />
    </div>
    </ChapterLayout>
  );
}
