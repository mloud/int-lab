'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ParallelProcesses from '@/components/informatika/models/ParallelProcesses';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ParallelProcesses onBack={() => router.push('/informatika/modely')} />
    </div>
  );
}
