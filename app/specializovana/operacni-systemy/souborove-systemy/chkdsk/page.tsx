'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ChkdskGame from '@/components/specializovana/operacni-systemy/ChkdskGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ChkdskGame onBack={() => router.push('/specializovana/operacni-systemy/souborove-systemy')} />
    </div>
  );
}
