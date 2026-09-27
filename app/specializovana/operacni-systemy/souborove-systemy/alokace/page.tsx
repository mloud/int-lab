'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import AllocationGame from '@/components/specializovana/operacni-systemy/AllocationGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <AllocationGame onBack={() => router.push('/specializovana/operacni-systemy/souborove-systemy')} />
    </div>
  );
}
