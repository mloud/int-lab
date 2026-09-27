'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import FileSystemsMenu from '@/components/specializovana/operacni-systemy/FileSystemsMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <FileSystemsMenu onBack={() => router.push('/specializovana/operacni-systemy')}
            onStartFATGame={() => router.push('/specializovana/operacni-systemy/souborove-systemy/fat')}
            onStartAllocationGame={() => router.push('/specializovana/operacni-systemy/souborove-systemy/alokace')}
            onStartDefragGame={() => router.push('/specializovana/operacni-systemy/souborove-systemy/defrag')}
            onStartChkdskGame={() => router.push('/specializovana/operacni-systemy/souborove-systemy/chkdsk')}
            onStartClusterSizeGame={() => router.push('/specializovana/operacni-systemy/souborove-systemy/velikost-clusteru')} />
    </div>
  );
}
