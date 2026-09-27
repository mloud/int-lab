'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import MemoryAllocatorGame from '@/components/specializovana/operacni-systemy/MemoryAllocatorGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <MemoryAllocatorGame onBack={() => router.push('/specializovana/operacni-systemy/procesy')} />
    </div>
  );
}
