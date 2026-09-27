'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CompressionFormatsMenu from '@/components/informatika/compression/CompressionFormatsMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <CompressionFormatsMenu onBack={() => router.push('/informatika')}
            onStartImageCompression={() => router.push('/informatika/komprese/formaty/obrazek')}
            onStartRle={() => router.push('/informatika/komprese/formaty/rle')}
            onStartSize={() => router.push('/informatika/komprese/formaty/velikost')}
            onStartJpeg={() => router.push('/informatika/komprese/formaty/jpeg')}
            onStartText={() => router.push('/informatika/komprese/formaty/text-kroky')} />
    </div>
  );
}
