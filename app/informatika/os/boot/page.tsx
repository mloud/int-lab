'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BootSequenceGame from '@/components/informatika/operacni-systemy/BootSequenceGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <BootSequenceGame onBack={() => router.push('/informatika/os')} />
    </div>
  );
}
