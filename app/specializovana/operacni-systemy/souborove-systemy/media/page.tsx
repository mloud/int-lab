'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import DiskMediaChapter from '@/components/specializovana/operacni-systemy/souborove-systemy/DiskMediaChapter';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="fs-media">
      <DiskMediaChapter onBack={() => router.push('/specializovana/operacni-systemy/souborove-systemy')} />
    </ChapterLayout>
  );
}
