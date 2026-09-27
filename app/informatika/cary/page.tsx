'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import LinesMenu from '@/components/informatika/lines/LinesMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <LinesMenu onBack={() => router.push('/informatika')}
            onShapePuzzle={() => router.push('/informatika/cary/tvary')}
            onVectorDrawing={() => router.push('/informatika/cary/vektory')}
            onLineDrawing={() => router.push('/informatika/cary/cary')} />
    </div>
  );
}
