'use client';
import React from 'react';
import ChapterLayout from '@/components/layout/ChapterLayout';
import { useRouter } from 'next/navigation';
import FileSystemsMenu from '@/components/specializovana/operacni-systemy/FileSystemsMenu';

export default function Page() {
  const router = useRouter();
  return (
    <ChapterLayout chapterId="os-fs">
      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">
      <FileSystemsMenu onBack={() => router.push('/specializovana/operacni-systemy')}
            onStartFATGame={() => router.push('/specializovana/operacni-systemy/souborove-systemy/fat')}
            onStartAllocationGame={() => router.push('/specializovana/operacni-systemy/souborove-systemy/alokace')}
            onStartDefragGame={() => router.push('/specializovana/operacni-systemy/souborove-systemy/defrag')}
            onStartChkdskGame={() => router.push('/specializovana/operacni-systemy/souborove-systemy/chkdsk')}
            onStartClusterSizeGame={() => router.push('/specializovana/operacni-systemy/souborove-systemy/velikost-clusteru')} />
    </div>
    </ChapterLayout>
  );
}
