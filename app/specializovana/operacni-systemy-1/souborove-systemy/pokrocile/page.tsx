'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import AdvancedTopicsChapter from '@/components/specializovana/operacni-systemy/souborove-systemy/AdvancedTopicsChapter';

export default function Page() {
  const router = useRouter();

  return (
    <ChapterLayout chapterId="os-fs">
      <div className="w-full h-full pb-32">
        <AdvancedTopicsChapter 
          onBack={() => router.push('/specializovana/operacni-systemy-1/souborove-systemy')} 
          onOpenAllocationGame={() => router.push('/specializovana/operacni-systemy-1/souborove-systemy/alokace')}
          onOpenClusterSizeGame={() => router.push('/specializovana/operacni-systemy-1/souborove-systemy/velikost-clusteru')}
        />
      </div>
    </ChapterLayout>
  );
}
