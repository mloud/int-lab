'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonDrawingChapter from '@/components/specializovana/programovani-2/PythonDrawingChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Kreslení v Tkinter" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonDrawingChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
