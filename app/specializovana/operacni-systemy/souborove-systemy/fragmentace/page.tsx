'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import FragmentationChapter from '@/components/specializovana/operacni-systemy/souborove-systemy/FragmentationChapter';

const BASE = '/specializovana/operacni-systemy/souborove-systemy';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="fs-frag">
      <FragmentationChapter
        onBack={() => router.push(BASE)}
        onOpenDefragGame={() => router.push(`${BASE}/defrag`)}
        onOpenChkdskGame={() => router.push(`${BASE}/chkdsk`)}
      />
    </ChapterLayout>
  );
}
