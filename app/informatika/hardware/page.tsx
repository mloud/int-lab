'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import HardwareMenu from '@/components/informatika/hardware/HardwareMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="hardware">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <HardwareMenu onBack={() => router.push('/informatika')}
            onStartPcBuilder={() => router.push('/informatika/hardware/stavba-pc')}
            onStartDataJourney={() => router.push('/informatika/hardware/cesta-dat')}
            onStartHwSwSorter={() => router.push('/informatika/hardware/trideni')}
            onStartCustomPcBuilder={() => router.push('/informatika/hardware/konfigurator')} />
    </div>
    </ChapterLayout>
  );
}
