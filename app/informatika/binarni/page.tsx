'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import BinaryMenu from '@/components/informatika/binary/BinaryMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="binarni">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <BinaryMenu onBack={() => router.push('/informatika')}
            onStartTeachers={() => router.push('/informatika/binarni/ucitele')}
            onStartCounting={() => router.push('/informatika/binarni/zaci')}
            onStartBinaryToDecimal={() => router.push('/informatika/binarni/prevod')}
            onStartTruthTable={() => router.push('/informatika/binarni/pravdivostni-tabulka')}
            onStartAddition={() => router.push('/informatika/binarni/scitani')} />
    </div>
    </ChapterLayout>
  );
}
