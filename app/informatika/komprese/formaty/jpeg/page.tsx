'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import JpegSimGame from '@/components/informatika/compression/JpegSimGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <JpegSimGame onBack={() => router.push('/informatika/komprese/formaty')} />
    </div>
  );
}
