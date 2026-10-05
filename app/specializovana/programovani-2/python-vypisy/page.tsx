'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonOutputsChapter from '@/components/specializovana/programovani-2/PythonOutputsChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Proměnné a výpisy" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonOutputsChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
