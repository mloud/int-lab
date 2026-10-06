'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ProgramovaniMenu from '@/components/specializovana/programovani/ProgramovaniMenu';

import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  return (
    <CategoryLayout 
      title="Programování" 
      category="specializovana"
      parent={{ title: 'Specializovaná IT', path: '/specializovana' }}
    >
      <ProgramovaniMenu 
            onBack={() => router.push('/specializovana')}
            onStartProjects={() => router.push('/specializovana/programovani/projekty')}
            onStartScratch={() => router.push('/specializovana/programovani/scratch')} />
    </CategoryLayout>
  );
}
