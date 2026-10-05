'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonSubroutinesChapter from '@/components/specializovana/programovani-2/PythonSubroutinesChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Podprogramy" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonSubroutinesChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
