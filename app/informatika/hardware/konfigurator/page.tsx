'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PcConfiguratorGame from '@/components/informatika/hardware/PcConfiguratorGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <PcConfiguratorGame onBack={() => router.push('/informatika/hardware')} />
    </div>
  );
}
