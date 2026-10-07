'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BarChartsChapter from '@/components/informatika/grafy/BarChartsChapter';

export default function Page() {
  const router = useRouter();

  return (
    <div className="w-full h-full min-h-screen bg-slate-50">
      <BarChartsChapter onBack={() => router.push('/informatika')} />
    </div>
  );
}
