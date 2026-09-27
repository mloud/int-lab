'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import OsHardwareChapter from '@/components/specializovana/operacni-systemy/OsHardwareChapter';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <OsHardwareChapter onBack={() => router.push('/specializovana/operacni-systemy')}
            onStartVonNeumann={() => router.push('/specializovana/operacni-systemy/hardware/von-neumann')}
            onStartRamSimulator={() => router.push('/specializovana/operacni-systemy/hardware/ram')} />
    </div>
  );
}
