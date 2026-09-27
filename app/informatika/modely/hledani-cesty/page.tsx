'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PathFindingTask from '@/components/informatika/models/PathFindingTask';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <PathFindingTask onBack={() => router.push('/informatika/modely')} />
    </div>
  );
}
