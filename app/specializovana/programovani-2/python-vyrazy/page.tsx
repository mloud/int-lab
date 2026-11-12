'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonLoopExpressionsChapter from '@/components/specializovana/programovani-2/PythonLoopExpressionsChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Výrazy v cyklu" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonLoopExpressionsChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
