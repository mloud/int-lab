'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import DiskPartitionChapter from '@/components/specializovana/operacni-systemy/souborove-systemy/DiskPartitionChapter';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="fs-deleni">
      <DiskPartitionChapter
        onBack={() => router.push('/specializovana/operacni-systemy/souborove-systemy')}
        onOpenBoot={() => router.push('/specializovana/operacni-systemy/boot')}
      />
    </ChapterLayout>
  );
}
