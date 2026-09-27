'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ShortcutNinjaGame from '@/components/informatika/operacni-systemy/ShortcutNinjaGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ShortcutNinjaGame onBack={() => router.push('/informatika/os')} />
    </div>
  );
}
