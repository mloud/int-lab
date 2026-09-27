'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import DataUnitsPractice from '@/components/informatika/data-units/DataUnitsPractice';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <DataUnitsPractice onBack={() => router.push('/informatika/jednotky')} />
    </div>
  );
}
