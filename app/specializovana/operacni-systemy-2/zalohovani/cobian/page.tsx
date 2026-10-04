'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BackupCobianChapter from '@/components/specializovana/operacni-systemy-2/zalohovani/BackupCobianChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout 
      title="Zálohování s Cobian Reflector" 
      category="specializovana"
      parent={{ title: 'Zálohování', path: '/specializovana/operacni-systemy-2/zalohovani' }}
    >
      <BackupCobianChapter onBack={() => router.push('/specializovana/operacni-systemy-2/zalohovani')} />
    </CategoryLayout>
  );
}
