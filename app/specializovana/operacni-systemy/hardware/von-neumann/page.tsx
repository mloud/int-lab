'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import VonNeumannGame from '@/components/specializovana/operacni-systemy/VonNeumannGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 flex flex-col items-center">
      <VonNeumannGame onBack={() => router.push('/specializovana/operacni-systemy/hardware')} />
    </div>
  );
}
