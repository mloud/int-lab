'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import FatChapter from '@/components/specializovana/operacni-systemy/souborove-systemy/FatChapter';

const BASE = '/specializovana/operacni-systemy/souborove-systemy';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="fs-fat">
      <FatChapter
        onBack={() => router.push(BASE)}
        onOpenFatGame={() => router.push(`${BASE}/fat`)}
        onOpenDeleteGame={() => router.push(`${BASE}/mazani`)}
        onOpenFormatGame={() => router.push(`${BASE}/formatovani`)}
      />
    </ChapterLayout>
  );
}
