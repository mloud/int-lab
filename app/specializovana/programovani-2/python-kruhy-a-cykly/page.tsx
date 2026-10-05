'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonCirclesLoopsChapter from '@/components/specializovana/programovani-2/PythonCirclesLoopsChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Kruhy a cykly" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonCirclesLoopsChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
