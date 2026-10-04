'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import OperacniSystemy2Menu from '@/components/specializovana/operacni-systemy-2/OperacniSystemy2Menu';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  
  return (
    <CategoryLayout 
      title="Operační systémy 2" 
      category="specializovana"
      parent={{ title: 'Specializovaná IT', path: '/specializovana' }}
    >
      <OperacniSystemy2Menu 
            onBack={() => router.push('/specializovana')}
            onStartBackup={() => router.push('/specializovana/operacni-systemy-2/zalohovani')}
      />
    </CategoryLayout>
  );
}
