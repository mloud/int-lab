'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonVariablesDrawingChapter from '@/components/specializovana/programovani-2/PythonVariablesDrawingChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Kreslení s proměnnými" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonVariablesDrawingChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
