'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonRandomChapter from '@/components/specializovana/programovani-2/PythonRandomChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Náhoda" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonRandomChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
