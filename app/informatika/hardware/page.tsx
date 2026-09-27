'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import HardwareMenu from '@/components/informatika/hardware/HardwareMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <HardwareMenu onBack={() => router.push('/informatika')}
            onStartPcBuilder={() => router.push('/informatika/hardware/stavba-pc')}
            onStartDataJourney={() => router.push('/informatika/hardware/cesta-dat')}
            onStartHwSwSorter={() => router.push('/informatika/hardware/trideni')}
            onStartCustomPcBuilder={() => router.push('/informatika/hardware/konfigurator')} />
    </div>
  );
}
