'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonVariablesChapter from '@/components/specializovana/programovani-2/PythonVariablesChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Proměnné a paměť" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonVariablesChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
