'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import SpecializovanaMenu from '@/components/specializovana/SpecializovanaMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <SpecializovanaMenu onBack={() => router.push('/')}
            onStartOperacniSystemy={() => router.push('/specializovana/operacni-systemy')}
            onStartProgramming={() => router.push('/specializovana/programovani')} />
    </div>
  );
}
