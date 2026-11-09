'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const HuffmanGame = dynamic(
  () => import('@/components/informatika/compression/HuffmanGame'),
  { ssr: false }
);

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <HuffmanGame onBack={() => router.push('/informatika/komprese/algoritmy')} />
    </div>
  );
}
