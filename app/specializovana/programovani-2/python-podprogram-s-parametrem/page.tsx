'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonFunctionsArgsChapter from '@/components/specializovana/programovani-2/PythonFunctionsArgsChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Podprogram s parametrem" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonFunctionsArgsChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
