'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import VirtualizationChapter from '@/components/specializovana/operacni-systemy/VirtualizationChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  
  return (
    <CategoryLayout 
      title="Virtualizace" 
      category="specializovana"
      parent={{ title: 'Operační systémy 1', path: '/specializovana/operacni-systemy-1' }}
    >
      <VirtualizationChapter onBack={() => router.push('/specializovana/operacni-systemy-1')} />
    </CategoryLayout>
  );
}
