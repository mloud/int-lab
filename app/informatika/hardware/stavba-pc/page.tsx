'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PcBuilderGame from '@/components/informatika/hardware/PcBuilderGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <PcBuilderGame onBack={() => router.push('/informatika/hardware')} />
    </div>
  );
}
