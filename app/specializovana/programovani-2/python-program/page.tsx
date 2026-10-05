'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonProgramChapter from '@/components/specializovana/programovani-2/PythonProgramChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="První program" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonProgramChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
