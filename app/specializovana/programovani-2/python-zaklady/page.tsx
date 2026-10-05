'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonBasicsChapter from '@/components/specializovana/programovani-2/PythonBasicsChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Základy Pythonu" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonBasicsChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
