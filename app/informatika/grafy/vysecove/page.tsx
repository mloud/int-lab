'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PieChartsChapter from '@/components/informatika/grafy/vysecove/PieChartsChapter';

export default function VysecoveGrafyPage() {
  const router = useRouter();

  return (
    <div className="w-full h-full min-h-screen bg-slate-50">
      <PieChartsChapter onBack={() => router.push('/informatika/grafy')} />
    </div>
  );
}

