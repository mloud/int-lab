'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import ReadFlowChapter from '@/components/specializovana/operacni-systemy/souborove-systemy/ReadFlowChapter';

export default function Page() {
  const router = useRouter();

  return (
    <ChapterLayout chapterId="os-fs">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh] max-w-6xl mx-auto py-8">
        <ReadFlowChapter 
          onBack={() => router.push('/specializovana/operacni-systemy/souborove-systemy')} 
        />
      </div>
    </ChapterLayout>
  );
}
