'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonColorsChapter from '@/components/specializovana/programovani-2/PythonColorsChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Barvy a Vlajky" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonColorsChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
