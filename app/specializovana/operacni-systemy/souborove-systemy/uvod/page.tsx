'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import FsIntroChapter from '@/components/specializovana/operacni-systemy/souborove-systemy/FsIntroChapter';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os-fs">
      <div className="w-full">
        <FsIntroChapter onBack={() => router.push('/specializovana/operacni-systemy/souborove-systemy')} />
      </div>
    </ChapterLayout>
  );
}
