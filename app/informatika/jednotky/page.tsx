'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import DataUnitsMenu from '@/components/informatika/data-units/DataUnitsMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <DataUnitsMenu onBack={() => router.push('/informatika')}
            onStartTheory={() => router.push('/informatika/jednotky/teorie')}
            onStartPractice={() => router.push('/informatika/jednotky/praxe')} />
    </div>
  );
}
