'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const VonNeumannGame = dynamic(
  () => import('@/components/specializovana/operacni-systemy/VonNeumannGame'),
  { ssr: false }
);

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 flex flex-col items-center">
      <VonNeumannGame onBack={() => router.push('/specializovana/operacni-systemy-1/hardware')} />
    </div>
  );
}
