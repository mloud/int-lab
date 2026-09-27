'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ScratchRaycasterProject from '@/components/specializovana/programovani/ScratchRaycasterProject';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ScratchRaycasterProject onBack={() => router.push('/specializovana/programovani/projekty')} />
    </div>
  );
}
