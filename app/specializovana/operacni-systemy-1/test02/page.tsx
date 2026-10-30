'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import FsTestWorksheet from '@/components/specializovana/operacni-systemy/FsTestWorksheet';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  
  return (
    <CategoryLayout 
      title="Hodnocená práce: Souborové systémy" 
      category="specializovana"
      parent={{ title: 'Operační systémy 1', path: '/specializovana/operacni-systemy-1' }}
    >
      <FsTestWorksheet onBack={() => router.push('/specializovana/operacni-systemy-1')} />
    </CategoryLayout>
  );
}
