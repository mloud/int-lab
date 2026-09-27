'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import OperacniSystemyMenu from '@/components/specializovana/operacni-systemy/OperacniSystemyMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <OperacniSystemyMenu onBack={() => router.push('/specializovana')}
            onStartOsIntro={() => router.push('/specializovana/operacni-systemy/uvod')}
            onStartOsArchitecture={() => router.push('/specializovana/operacni-systemy/architektura')}
            onStartOsEvolution={() => router.push('/specializovana/operacni-systemy/vyvoj')}
            onStartOsBoot={() => router.push('/specializovana/operacni-systemy/boot')}
            onStartFileSystemsMenu={() => router.push('/specializovana/operacni-systemy/souborove-systemy')}
            onStartWindowsInstall={() => router.push('/specializovana/operacni-systemy/instalace')}
            onStartProcessMemory={() => router.push('/specializovana/operacni-systemy/procesy')}
            onStartHardware={() => router.push('/specializovana/operacni-systemy/hardware')} />
    </div>
  );
}
