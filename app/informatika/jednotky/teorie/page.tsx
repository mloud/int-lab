'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import DataUnitsTheory from '@/components/informatika/data-units/DataUnitsTheory';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <DataUnitsTheory onBack={() => router.push('/informatika/jednotky')} />
    </div>
  );
}
