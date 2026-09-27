'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import OsMatchGame from '@/components/informatika/operacni-systemy/OsMatchGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <OsMatchGame onBack={() => router.push('/informatika/os')} />
    </div>
  );
}
