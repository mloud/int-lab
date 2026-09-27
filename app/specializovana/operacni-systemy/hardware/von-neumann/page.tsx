'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import VonNeumannGame from '@/components/specializovana/operacni-systemy/VonNeumannGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <VonNeumannGame onBack={() => router.push('/specializovana/operacni-systemy/hardware')} />
    </div>
  );
}
