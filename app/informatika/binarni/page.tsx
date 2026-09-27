'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BinaryMenu from '@/components/informatika/binary/BinaryMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <BinaryMenu onBack={() => router.push('/informatika')}
            onStartTeachers={() => router.push('/informatika/binarni/ucitele')}
            onStartCounting={() => router.push('/informatika/binarni/zaci')}
            onStartBinaryToDecimal={() => router.push('/informatika/binarni/prevod')}
            onStartTruthTable={() => router.push('/informatika/binarni/pravdivostni-tabulka')}
            onStartAddition={() => router.push('/informatika/binarni/scitani')} />
    </div>
  );
}
