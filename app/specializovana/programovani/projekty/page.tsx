'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ProgramovaniProjektyMenu from '@/components/specializovana/programovani/ProgramovaniProjektyMenu';

import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  return (
    <CategoryLayout 
      title="Projekty a vývoj her" 
      category="specializovana"
      parent={{ title: 'Programování', path: '/specializovana/programovani' }}
    >
      <ProgramovaniProjektyMenu 
            onBack={() => router.push('/specializovana/programovani')}
            onStartRaycaster={() => router.push('/specializovana/programovani/projekty/raycaster')} />
    </CategoryLayout>
  );
}
