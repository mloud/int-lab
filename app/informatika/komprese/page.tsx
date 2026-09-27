'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CompressionMenu from '@/components/informatika/compression/CompressionMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <CompressionMenu onBack={() => router.push('/informatika')}
            onStartGame={() => router.push('/informatika/komprese/hra')}
            onStartText={() => router.push('/informatika/komprese/text')}
            onStartChecksum={() => router.push('/informatika/komprese/kontrolni-soucet')} />
    </div>
  );
}
