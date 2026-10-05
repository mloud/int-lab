'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonBranchingChapter from '@/components/specializovana/programovani-2/PythonBranchingChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Větvení a konstrukce" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonBranchingChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
