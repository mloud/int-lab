'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonLoopVarChapter from '@/components/specializovana/programovani-2/PythonLoopVarChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Proměnná cyklu" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonLoopVarChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
