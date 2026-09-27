'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import MemoryStepperGame from '@/components/specializovana/operacni-systemy/MemoryStepperGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <MemoryStepperGame onBack={() => router.push('/specializovana/operacni-systemy/procesy')} />
    </div>
  );
}
