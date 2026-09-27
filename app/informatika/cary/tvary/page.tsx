'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ShapePuzzle from '@/components/informatika/lines/ShapePuzzle';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <ShapePuzzle onBack={() => router.push('/informatika/cary')} />
    </div>
  );
}
