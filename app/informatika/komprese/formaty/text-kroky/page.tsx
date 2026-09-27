'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import TextCompressionStepByStep from '@/components/informatika/compression/TextCompressionStepByStep';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <TextCompressionStepByStep onBack={() => router.push('/informatika/komprese/formaty')} />
    </div>
  );
}
