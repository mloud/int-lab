'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import FileSystemsMenu from '@/components/specializovana/operacni-systemy/FileSystemsMenu';

const BASE = '/specializovana/operacni-systemy/souborove-systemy';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os-fs">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
        <FileSystemsMenu
          onBack={() => router.push('/specializovana/operacni-systemy')}
          onStartIntro={() => router.push(`${BASE}/uvod`)}
          onStartMedia={() => router.push(`${BASE}/media`)}
          onStartPartitions={() => router.push(`${BASE}/deleni-disku`)}
          onStartFat={() => router.push(`${BASE}/alokace-fat`)}
          onStartFragmentation={() => router.push(`${BASE}/fragmentace`)}
          onStartFATGame={() => router.push(`${BASE}/fat`)}
          onStartAllocationGame={() => router.push(`${BASE}/alokace`)}
          onStartDefragGame={() => router.push(`${BASE}/defrag`)}
          onStartChkdskGame={() => router.push(`${BASE}/chkdsk`)}
          onStartClusterSizeGame={() => router.push(`${BASE}/velikost-clusteru`)}
        />
      </div>
    </ChapterLayout>
  );
}
