'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import FutureTechMenu from '@/components/informatika/future-tech/FutureTechMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="budoucnost">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <FutureTechMenu onBack={() => router.push('/informatika')}
            onStartIoT={() => router.push('/informatika/budoucnost/iot')}
            onStartIndustry40={() => router.push('/informatika/budoucnost/prumysl')}
            onStartVR={() => router.push('/informatika/budoucnost/vr')} />
    </div>
    </ChapterLayout>
  );
}
