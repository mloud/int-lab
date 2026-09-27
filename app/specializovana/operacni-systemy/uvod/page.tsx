'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import OsIntroChapter from '@/components/specializovana/operacni-systemy/OsIntroChapter';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <OsIntroChapter onBack={() => router.push('/specializovana/operacni-systemy')} />
    </div>
  );
}
