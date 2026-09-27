'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import CompressionMenu from '@/components/informatika/compression/CompressionMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="komprese">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <CompressionMenu onBack={() => router.push('/informatika')}
            onStartGame={() => router.push('/informatika/komprese/hra')}
            onStartText={() => router.push('/informatika/komprese/text')}
            onStartChecksum={() => router.push('/informatika/komprese/kontrolni-soucet')} />
    </div>
    </ChapterLayout>
  );
}
