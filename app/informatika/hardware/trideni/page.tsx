'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import HwSwSorterGame from '@/components/informatika/hardware/HwSwSorterGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <HwSwSorterGame onBack={() => router.push('/informatika/hardware')} />
    </div>
  );
}
