'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import PythonOvalsChapter from '@/components/specializovana/programovani-2/PythonOvalsChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Elipsy a kruhy" 
      category="specializovana"
      parent={{ title: 'Programování 2', path: '/specializovana/programovani-2' }}
    >
      <PythonOvalsChapter onBack={() => router.push('/specializovana/programovani-2')} />
    </CategoryLayout>
  );
}
