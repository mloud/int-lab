'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ClusterSizeGame from '@/components/specializovana/operacni-systemy/ClusterSizeGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ClusterSizeGame onBack={() => router.push('/specializovana/operacni-systemy/souborove-systemy')} />
    </div>
  );
}
