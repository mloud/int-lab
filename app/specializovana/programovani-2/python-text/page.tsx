'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonTextChapter from '@/components/specializovana/programovani-2/PythonTextChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Kreslení textu" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonTextChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
