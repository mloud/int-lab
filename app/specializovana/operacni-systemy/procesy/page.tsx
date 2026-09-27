'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ProcessMemoryMenu from '@/components/specializovana/operacni-systemy/ProcessMemoryMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ProcessMemoryMenu onBack={() => router.push('/specializovana/operacni-systemy')}
            onStartMemoryStepper={() => router.push('/specializovana/operacni-systemy/procesy/stepper')}
            onStartMemoryAllocator={() => router.push('/specializovana/operacni-systemy/procesy/allocator')}
            onStartCpuCycle={() => router.push('/specializovana/operacni-systemy/procesy/cpu')} />
    </div>
  );
}
