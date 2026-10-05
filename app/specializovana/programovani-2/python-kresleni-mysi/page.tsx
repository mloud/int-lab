'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonMouseDrawingChapter from '@/components/specializovana/programovani-2/PythonMouseDrawingChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Kreslení myší" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonMouseDrawingChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
