'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CompressionGame from '@/components/informatika/compression/CompressionGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <CompressionGame onBack={() => router.push('/informatika/komprese')}
            onStartCustom={() => router.push('/informatika/komprese/hra/vlastni')} />
    </div>
  );
}
