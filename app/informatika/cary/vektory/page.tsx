'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import VectorDrawing from '@/components/informatika/lines/VectorDrawing';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <VectorDrawing onBack={() => router.push('/informatika/cary')} mode="points" />
    </div>
  );
}
