'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import MalwareProcessTestWorksheet from '@/components/specializovana/operacni-systemy-2/bezpecnost/MalwareProcessTestWorksheet';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function MalwareProcessTestPage() {
  const router = useRouter();

  return (
    <CategoryLayout
      title="Písemná práce: Malware a správa procesů"
      category="specializovana"
      parent={{ title: 'Bezpečnost 1', path: '/specializovana/operacni-systemy-2/bezpecnost' }}
    >
      <MalwareProcessTestWorksheet onBack={() => router.push('/specializovana/operacni-systemy-2/bezpecnost')} />
    </CategoryLayout>
  );
}
