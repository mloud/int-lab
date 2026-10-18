'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import LineChartsChapter from '@/components/informatika/grafy/spojnicove/LineChartsChapter';

export default function SpojnicoveGrafyPage() {
  const router = useRouter();

  return (
    <div className="w-full h-full min-h-screen bg-slate-50">
      <LineChartsChapter onBack={() => router.push('/informatika/grafy')} />
    </div>
  );
}
