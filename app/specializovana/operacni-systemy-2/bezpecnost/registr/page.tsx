'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PersistenceRegistryChapter from '@/components/specializovana/operacni-systemy-2/bezpecnost/PersistenceRegistryChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function PersistenceRegistryPage() {
  const router = useRouter();

  return (
    <CategoryLayout
      title="Persistence škodlivého kódu a systémový registr"
      category="specializovana"
      parent={{ title: 'Bezpečnost 1', path: '/specializovana/operacni-systemy-2/bezpecnost' }}
    >
      <PersistenceRegistryChapter onBack={() => router.push('/specializovana/operacni-systemy-2/bezpecnost')} />
    </CategoryLayout>
  );
}
