'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import DataJourneyGame from '@/components/informatika/hardware/DataJourneyGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <DataJourneyGame onBack={() => router.push('/informatika/hardware')} />
    </div>
  );
}
