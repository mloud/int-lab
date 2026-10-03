'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import OperacniSystemyMenu from '@/components/specializovana/operacni-systemy/OperacniSystemyMenu';

import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  return (
    <CategoryLayout 
      title="Operační systémy" 
      category="specializovana"
      parent={{ title: 'Specializovaná IT', path: '/specializovana' }}
    >
      <OperacniSystemyMenu 
            onBack={() => router.push('/specializovana')}
            onStartOsIntro={() => router.push('/specializovana/operacni-systemy/uvod')}
            onStartOsArchitecture={() => router.push('/specializovana/operacni-systemy/architektura')}
            onStartOsEvolution={() => router.push('/specializovana/operacni-systemy/vyvoj')}
            onStartOsBoot={() => router.push('/specializovana/operacni-systemy/boot')}
            onStartFileSystemsMenu={() => router.push('/specializovana/operacni-systemy/souborove-systemy')}
            onStartWindowsInstall={() => router.push('/specializovana/operacni-systemy/instalace')}
            onStartProcessMemory={() => router.push('/specializovana/operacni-systemy/procesy')}
            onStartHardware={() => router.push('/specializovana/operacni-systemy/hardware')} 
            onStartVirtualization={() => router.push('/specializovana/operacni-systemy/virtualizace')}
            onStartAssessment={() => router.push('/specializovana/operacni-systemy/hodnoceni')} />
    </CategoryLayout>
  );
}
