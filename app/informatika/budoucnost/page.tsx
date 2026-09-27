'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import FutureTechMenu from '@/components/informatika/future-tech/FutureTechMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <FutureTechMenu onBack={() => router.push('/informatika')}
            onStartIoT={() => router.push('/informatika/budoucnost/iot')}
            onStartIndustry40={() => router.push('/informatika/budoucnost/prumysl')} />
    </div>
  );
}
