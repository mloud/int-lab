'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonLoopChapter from '@/components/specializovana/programovani-2/PythonLoopChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Program s opakováním" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonLoopChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
