'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonNestedBranchingChapter from '@/components/specializovana/programovani-2/PythonNestedBranchingChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Vnořené větvení" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonNestedBranchingChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
