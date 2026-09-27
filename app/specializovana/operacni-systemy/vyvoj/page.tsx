'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import OsEvolutionChapter from '@/components/specializovana/operacni-systemy/OsEvolutionChapter';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <OsEvolutionChapter onBack={() => router.push('/specializovana/operacni-systemy')} />
    </div>
  );
}
